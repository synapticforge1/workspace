// Hypothesis test: the ONLY body difference between the runtimes and wasm-tools is the local
// declaration vector (one entry per local vs runs of same-type locals). Re-encode every function
// body's locals as maximal runs, drop custom sections, and compare the result to wasm-tools' body.
// Run: bun normalize.ts [outdir]
import { readFileSync } from "node:fs";

const DIR = `${import.meta.dir}/${process.argv[2] ?? "full"}/`;
const results = JSON.parse(readFileSync(`${DIR}results.json`, "utf8")) as Record<string, Record<string, { ok: boolean; body?: string }>>;
const files = Object.keys(results);

function readLeb(b: Uint8Array, at: number): [number, number] {
  let r = 0, s = 0, i = at;
  for (;;) { const c = b[i++]; r |= (c & 0x7f) << s; if (!(c & 0x80)) break; s += 7; }
  return [r >>> 0, i];
}
function leb(n: number): number[] {
  const out: number[] = [];
  do { let c = n & 0x7f; n >>>= 7; if (n !== 0) c |= 0x80; out.push(c); } while (n !== 0);
  return out;
}
function cat(parts: (Uint8Array | number[])[]): Uint8Array {
  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total); let o = 0;
  for (const p of parts) { out.set(p instanceof Uint8Array ? p : Uint8Array.from(p), o); o += p.length; }
  return out;
}
// value types may be multi-byte (ref types: 0x63/0x64 + heaptype); compare by byte string.
function readValType(b: Uint8Array, at: number): [string, number] {
  const t = b[at];
  if (t === 0x63 || t === 0x64) { // (ref null ht) / (ref ht): heaptype is s33 LEB
    let i = at + 1; for (;;) { const c = b[i++]; if (!(c & 0x80)) break; }
    return [Array.from(b.subarray(at, i)).map((x) => x.toString(16)).join(" "), i];
  }
  return [t.toString(16), at + 1];
}
function regroupBody(body: Uint8Array): Uint8Array {
  let [n, i] = readLeb(body, 0);
  const runs: { count: number; type: string }[] = [];
  for (let k = 0; k < n; k++) {
    const [count, p] = readLeb(body, i);
    const [type, q] = readValType(body, p);
    i = q;
    const last = runs[runs.length - 1];
    if (last && last.type === type) last.count += count; else runs.push({ count, type });
  }
  const rest = body.subarray(i);
  const enc: number[] = [...leb(runs.length)];
  for (const r of runs) { enc.push(...leb(r.count)); enc.push(...r.type.split(" ").map((h) => parseInt(h, 16))); }
  return cat([enc, rest]);
}
function normalize(b: Uint8Array): Uint8Array {
  const parts: (Uint8Array | number[])[] = [b.subarray(0, 8)];
  let i = 8;
  while (i < b.length) {
    const id = b[i];
    const [size, p] = readLeb(b, i + 1);
    const end = p + size;
    if (id === 0) { i = end; continue; }
    if (id !== 10) { parts.push(b.subarray(i, end)); i = end; continue; }
    // code section: regroup each body
    const [count, q] = readLeb(b, p);
    let j = q;
    const bodies: Uint8Array[] = [];
    for (let k = 0; k < count; k++) {
      const [bsize, r] = readLeb(b, j);
      const nb = regroupBody(b.subarray(r, r + bsize));
      bodies.push(cat([leb(nb.length), nb]));
      j = r + bsize;
    }
    const payload = cat([leb(count), ...bodies]);
    parts.push([10, ...leb(payload.length)], payload);
    i = end;
  }
  return cat(parts);
}
async function sha(b: Uint8Array) { return Buffer.from(await crypto.subtle.digest("SHA-256", b)).toString("hex"); }

let both = 0, already = 0, fixed = 0, still = 0;
const stillFiles: string[] = [];
for (let n = 0; n < files.length; n++) {
  const r = results[files[n]];
  if (!r.wasmtools.ok || !r.wasmrt.ok) continue;
  both++;
  if (r.wasmtools.body === r.wasmrt.body) { already++; continue; }
  const rt = readFileSync(`${DIR}wasmrt-${n}.wasm`);
  const norm = await sha(normalize(rt));
  if (norm === r.wasmtools.body) fixed++; else { still++; stillFiles.push(files[n]); }
}
console.log(`both assembled: ${both}`);
console.log(`bodies already identical: ${already}`);
console.log(`identical after regrouping the runtimes' locals: ${fixed}`);
console.log(`still different (other causes): ${still}`);
for (const f of stillFiles.slice(0, 15)) console.log("  " + f);
