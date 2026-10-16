export interface Entry {
  name: string;
  comment: string;
}

export interface Participant {
  name: string;
  count: number;
}

// Aceita "Nome", "Nome: comentário", "Nome | comentário" ou "Nome - comentário".
// O hífen só separa quando cercado de espaços, para preservar nomes como "Ana-Maria".
const SEPARATOR = /^(.+?)(?:\s*[:|]\s*|\s+-\s+)(.*)$/;

export function parseEntries(text: string): Entry[] {
  const entries: Entry[] = [];
  for (const raw of text.replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const match = line.match(SEPARATOR);
    const name = (match ? match[1] : line).trim();
    if (!name) continue;
    entries.push({ name, comment: match ? match[2].trim() : "" });
  }
  return entries;
}

export function groupParticipants(entries: Entry[]): Participant[] {
  const map = new Map<string, Participant>();
  for (const { name } of entries) {
    const key = name.toLocaleLowerCase("pt-BR");
    const current = map.get(key);
    if (current) current.count++;
    else map.set(key, { name, count: 1 });
  }
  return [...map.values()];
}
