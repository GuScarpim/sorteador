import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import multer from "multer";
import { groupParticipants, parseEntries } from "./parser";
import { drawWinner } from "./draw";

const MAX_BYTES = 1024 * 1024;
const MIN_PARTICIPANTS = 2;

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_BYTES } });

function load(req: Request) {
  const file = req.file;
  if (!file) throw new HttpError(400, "Envie um arquivo .txt no campo 'file'.");
  if (!file.originalname.toLowerCase().endsWith(".txt")) {
    throw new HttpError(400, "Somente arquivos .txt são aceitos.");
  }
  const entries = parseEntries(file.buffer.toString("utf-8"));
  const participants = groupParticipants(entries);
  if (participants.length < MIN_PARTICIPANTS) {
    throw new HttpError(422, `A lista precisa ter pelo menos ${MIN_PARTICIPANTS} nomes.`);
  }
  return { entries, participants };
}

export function createApp() {
  const app = express();
  app.use(cors());

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.post("/api/participants", upload.single("file"), (req, res) => {
    const { entries, participants } = load(req);
    const total = entries.length;
    res.json({
      total,
      unique: participants.length,
      participants: participants
        .map((p) => ({ ...p, chance: p.count / total }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "pt-BR")),
    });
  });

  // `excluded` (JSON array ou campo repetido) lista nomes já sorteados a ignorar.
  app.post("/api/draw", upload.single("file"), (req, res) => {
    const { participants } = load(req);
    const raw = req.body?.excluded;
    let excluded: string[] = [];
    if (typeof raw === "string" && raw.trim()) {
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.some((n) => typeof n !== "string")) throw 0;
        excluded = parsed;
      } catch {
        throw new HttpError(400, "'excluded' deve ser um array JSON de nomes.");
      }
    }
    try {
      res.json(drawWinner(participants, excluded));
    } catch (e) {
      throw new HttpError(409, (e as Error).message);
    }
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof multer.MulterError) {
      const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
      const message = err.code === "LIMIT_FILE_SIZE" ? "O arquivo excede 1 MB." : err.message;
      return res.status(status).json({ error: message });
    }
    if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: "Erro interno." });
  });

  return app;
}
