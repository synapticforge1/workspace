// I7 measurement: assemble every .wat under wasmtk/tests with seven assemblers; compare digests,
// sections, and bodies-with-custom-sections-stripped. Writes results.json and prints a summary.
// Run: bun measure.ts [sample] [outdir]
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The workspace root is two levels up from this script; no machine path is written here.
const ROOT = resolve(import.meta.dir, "../../..").replace(/\\/g, "/");
const SAMPLE = Number(process.argv[2] ?? "0"); // 0 = all files
const OUT = `${import.meta.dir}/${process.argv[3] ?? "out"}/`;

const TOOLS: Record<string, { cwd?: string; cmd: (i: string, o: string) => string[] }> = {
  wasmtools: { cmd: (i, o) => ["wasm-tools", "parse", i, "-o", o] },
  // wabt and binaryang default to a narrower feature set than wasm-tools and the runtimes; without
  // --enable-all they refuse tags and typed references (I16; binaryang since its 2026-09-20 run).
  wabt: { cmd: (i, o) => ["wat2wasm", "--enable-all", i, "-o", o] },
  wabtnames: { cmd: (i, o) => ["wat2wasm", "--enable-all", "--debug-names", i, "-o", o] },
  wasmrt: { cmd: (i, o) => [`${ROOT}/wasmrt/target/release/wasmrt.exe`, "wat", i, "-o", o] },
  wazmrt: { cmd: (i, o) => [`${ROOT}/wazmrt/zig-out/bin/wazmrt.exe`, "wat", i, "-o", o] },
  // binaryang runs on Bun since its B1–B7 migration; Bun and Deno gave identical bytes on 21 of 21
  // sampled files on 2026-10-22 (the full run of that date used `deno run`).
  binaryang: {
    cwd: `${ROOT}/binaryang`,
    cmd: (i, o) => ["bun", "main.ts", "wat2wasm", "--enable-all", i, "-o", o],
  },
  binaryangNT: {
    cwd: `${ROOT}/binaryang`,
    cmd: (i, o) => ["bun", "main.ts", "wat2wasm", "--enable-all", i, "-o", o, "--no-text-form"],
  },
};

function walk(dir: string, acc: string[]): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory() && e.name !== "node_modules") walk(p, acc);
    else if (e.isFile() && e.name.endsWith(".wat")) acc.push(p);
  }
  return acc;
}

function leb(b: Uint8Array, at: number): [number, number] {
  let r = 0, s = 0, i = at;
  for (;;) {
    const c = b[i++];
    r |= (c & 0x7f) << s;
    if (!(c & 0x80)) break;
    s += 7;
  }
  return [r >>> 0, i];
}

const NAMES = ["custom", "type", "import", "func", "table", "memory", "global", "export", "start", "elem", "code", "data", "datacount", "tag"];
function sections(b: Uint8Array): { list: string[]; stripped: Uint8Array } {
  const list: string[] = [];
  const keep: Uint8Array[] = [b.subarray(0, 8)];
  let i = 8;
  while (i < b.length) {
    const id = b[i];
    const [size, p] = leb(b, i + 1);
    const end = p + size;
    if (id === 0) {
      const [nlen, q] = leb(b, p);
      list.push("custom:" + new TextDecoder().decode(b.subarray(q, q + nlen)));
    } else {
      list.push(NAMES[id] ?? `id${id}`);
      keep.push(b.subarray(i, end));
    }
    i = end;
  }
  const total = keep.reduce((n, k) => n + k.length, 0);
  const s = new Uint8Array(total);
  let o = 0;
  for (const k of keep) { s.set(k, o); o += k.length; }
  return { list, stripped: s };
}

async function sha(b: Uint8Array): Promise<string> {
  return Buffer.from(await crypto.subtle.digest("SHA-256", b)).toString("hex");
}

// Tools echo the absolute input path in their messages; the recorded reason must not carry it.
const ROOT_BACKSLASH = ROOT.replace(/\//g, "\\");
function scrub(s: string): string {
  return s.replaceAll(ROOT, "<workspace>").replaceAll(ROOT_BACKSLASH, "<workspace>");
}

async function run(tool: string, input: string, out: string): Promise<{ ok: boolean; err: string }> {
  const t = TOOLS[tool];
  const argv = t.cmd(input, out);
  try {
    const c = Bun.spawn(argv, { cwd: t.cwd, stdout: "ignore", stderr: "pipe", signal: AbortSignal.timeout(60_000) });
    const [code, stderr] = await Promise.all([c.exited, new Response(c.stderr).text()]);
    return { ok: code === 0, err: scrub(stderr.split("\n")[0]).slice(0, 160) };
  } catch (e) {
    return { ok: false, err: scrub(String(e)).slice(0, 160) };
  }
}

mkdirSync(OUT, { recursive: true });
let files = walk(`${ROOT}/wasmtk/tests`, []).sort();
if (SAMPLE > 0) files = files.filter((_, i) => i % Math.ceil(files.length / SAMPLE) === 0);
console.log(`files: ${files.length}`);

// Most of the corpus is gitignored build output of wasmtk's tests, so a count means nothing without
// the wasmtk commit and the exact file list it was taken over (drift-register X5).
const head = Bun.spawnSync(["git", "-C", `${ROOT}/wasmtk`, "rev-parse", "--short=11", "HEAD"]).stdout.toString().trim();
const listSha = Buffer.from(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(files.join("\n")))).toString("hex");
writeFileSync(`${OUT}corpus.json`, JSON.stringify({ date: new Date().toISOString(), wasmtkHead: head, files: files.length, listSha256: listSha }, null, 1));
console.log(`corpus: wasmtk ${head}, file-list sha256 ${listSha.slice(0, 16)}`);

type Res = { ok: boolean; err?: string; sha?: string; body?: string; sections?: string[]; size?: number };
const results: Record<string, Record<string, Res>> = {};
let n = 0;
for (const f of files) {
  const rel = f.slice(ROOT.length + 1);
  results[rel] = {};
  for (const tool of Object.keys(TOOLS)) {
    const out = `${OUT}${tool}-${n}.wasm`;
    rmSync(out, { force: true });
    const r = await run(tool, f, out);
    if (!r.ok) { results[rel][tool] = { ok: false, err: r.err }; continue; }
    let bytes: Uint8Array;
    try { bytes = readFileSync(out); } catch { results[rel][tool] = { ok: false, err: "exit 0 but no output file" }; continue; }
    const s = sections(bytes);
    results[rel][tool] = { ok: true, sha: await sha(bytes), body: await sha(s.stripped), sections: s.list, size: bytes.length };
  }
  n++;
  if (n % 25 === 0) console.log(`  ${n}/${files.length}`);
}
writeFileSync(`${OUT}results.json`,JSON.stringify(results, null, 1));

// ---- summary ----
const tools = Object.keys(TOOLS);
console.log("\n== assembled OK per tool ==");
for (const t of tools) {
  const ok = files.filter((f) => results[f.slice(ROOT.length + 1)][t].ok).length;
  console.log(`${t.padEnd(12)} ${ok}/${files.length}`);
}
console.log("\n== custom sections written (count of files carrying each), per tool ==");
for (const t of tools) {
  const c: Record<string, number> = {};
  let dc = 0;
  for (const f of files) {
    const r = results[f.slice(ROOT.length + 1)][t];
    if (!r.ok) continue;
    for (const s of r.sections!) { if (s.startsWith("custom:")) c[s] = (c[s] ?? 0) + 1; if (s === "datacount") dc++; }
  }
  console.log(`${t.padEnd(12)} ${JSON.stringify(c)} datacount:${dc}`);
}
console.log("\n== pairwise: files where BOTH assembled → identical bytes / identical body (custom stripped) / bodies differ ==");
for (let a = 0; a < tools.length; a++) {
  for (let b = a + 1; b < tools.length; b++) {
    let both = 0, same = 0, body = 0, diff = 0;
    for (const f of files) {
      const ra = results[f.slice(ROOT.length + 1)][tools[a]], rb = results[f.slice(ROOT.length + 1)][tools[b]];
      if (!ra.ok || !rb.ok) continue;
      both++;
      if (ra.sha === rb.sha) same++;
      else if (ra.body === rb.body) body++;
      else diff++;
    }
    console.log(`${tools[a].padEnd(12)} vs ${tools[b].padEnd(12)} both=${String(both).padStart(3)}  bytes=${String(same).padStart(3)}  body-only=${String(body).padStart(3)}  bodies-differ=${String(diff).padStart(3)}`);
  }
}
console.log("\n== refusals (tool: count, first reasons) ==");
for (const t of tools) {
  const errs: Record<string, number> = {};
  for (const f of files) { const r = results[f.slice(ROOT.length + 1)][t]; if (!r.ok) errs[r.err ?? "?"] = (errs[r.err ?? "?"] ?? 0) + 1; }
  const top = Object.entries(errs).sort((x, y) => y[1] - x[1]).slice(0, 4);
  if (top.length) console.log(`${t}: ${top.map(([e, c]) => `${c}× ${e}`).join(" | ")}`);
}
