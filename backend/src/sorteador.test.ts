import test from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import { groupParticipants, parseEntries } from "./parser";
import { drawWinner } from "./draw";
import { createApp } from "./app";

test("parser aceita nomes simples, comentários e linhas vazias", () => {
  const entries = parseEntries("\uFEFFAna Lima\n\nBruno: oi\r\nana lima | outro\nAna-Maria\nDiego - top\n");
  assert.deepEqual(entries.map((e) => e.name), ["Ana Lima", "Bruno", "ana lima", "Ana-Maria", "Diego"]);
  const grouped = groupParticipants(entries);
  assert.deepEqual(grouped.find((p) => p.name === "Ana Lima"), { name: "Ana Lima", count: 2 });
});

test("sorteio é ponderado e respeita exclusões", () => {
  const people = [{ name: "A", count: 3 }, { name: "B", count: 1 }];
  assert.equal(drawWinner(people, [], () => 2).name, "A");
  assert.equal(drawWinner(people, [], () => 3).name, "B");
  assert.equal(drawWinner(people, ["a"]).name, "B");
  assert.throws(() => drawWinner(people, ["A", "B"]));
});

test("API: participants e draw", async () => {
  const server = createApp().listen(0);
  const base = `http://localhost:${(server.address() as AddressInfo).port}/api`;
  const form = (text: string, name = "l.txt") => {
    const f = new FormData();
    f.append("file", new Blob([text]), name);
    return f;
  };
  try {
    let r = await fetch(`${base}/participants`, { method: "POST", body: form("A\nA\nB\n") });
    const body = await r.json();
    assert.equal(r.status, 200);
    assert.equal(body.total, 3);
    assert.equal(body.participants[0].name, "A");

    const f = form("A\nB\n");
    f.append("excluded", JSON.stringify(["A"]));
    r = await fetch(`${base}/draw`, { method: "POST", body: f });
    assert.equal((await r.json()).name, "B");

    r = await fetch(`${base}/draw`, { method: "POST", body: form("A\n") });
    assert.equal(r.status, 422);
    r = await fetch(`${base}/draw`, { method: "POST", body: form("A\nB", "x.csv") });
    assert.equal(r.status, 400);
    r = await fetch(`${base}/draw`, { method: "POST" });
    assert.equal(r.status, 400);
  } finally {
    server.close();
  }
});
