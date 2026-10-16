import { randomInt } from "node:crypto";
import type { Participant } from "./parser";

export interface Winner {
  name: string;
  count: number;
  chance: number;
}

// Sorteio ponderado: cada comentário é um bilhete.
export function drawWinner(
  participants: Participant[],
  excluded: string[] = [],
  rand: (max: number) => number = randomInt,
): Winner {
  const blocked = new Set(excluded.map((n) => n.toLocaleLowerCase("pt-BR")));
  const pool = participants.filter((p) => !blocked.has(p.name.toLocaleLowerCase("pt-BR")));
  const total = pool.reduce((sum, p) => sum + p.count, 0);
  if (total === 0) throw new Error("Não há participantes disponíveis para sortear.");

  let pick = rand(total);
  for (const p of pool) {
    if (pick < p.count) return { name: p.name, count: p.count, chance: p.count / total };
    pick -= p.count;
  }
  throw new Error("Falha ao sortear.");
}
