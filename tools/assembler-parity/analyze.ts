// Secondary questions over the full run: which files get a name section from binaryang but not
// from wasm-tools; why upstream wabt refuses 33 files the others accept; sizes of the text-form cost.
// Run: bun analyze.ts [outdir]
import { readFileSync } from "node:fs";

const DIR = `${import.meta.dir}/${process.argv[2] ?? "full"}/`;
type R = { ok: boolean; err?: string; sections?: string[]; size?: number; sha?: string };
const results = JSON.parse(readFileSync(`${DIR}results.json`, "utf8")) as Record<string, Record<string, R>>;

console.log("== name section: binaryang writes one, wasm-tools does not ==");
for (const [f, r] of Object.entries(results)) {
  if (r.wasmtools.ok && r.binaryangNT.ok) {
    const a = r.wasmtools.sections!.includes("custom:name"), b = r.binaryangNT.sections!.includes("custom:name");
    if (a !== b) console.log(`  ${f}  wasm-tools:${a} binaryang:${b} wasmrt:${r.wasmrt.sections?.includes("custom:name")}`);
  }
}
console.log("\n== upstream wabt 1.0.41 refusals where wasm-tools accepts (grouped by first error words) ==");
const groups: Record<string, string[]> = {};
for (const [f, r] of Object.entries(results)) {
  if (!r.wabt.ok && r.wasmtools.ok) {
    const key = (r.wabt.err ?? "?").replace(/^.*?error: /, "").slice(0, 70);
    (groups[key] ??= []).push(f.replace(/^wasmtk\/tests\//, ""));
  }
}
for (const [k, v] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) console.log(`  ${v.length}× ${k}\n      e.g. ${v[0]}`);

console.log("\n== binaryang text-form custom section: bytes it adds over --no-text-form ==");
let n = 0, extra = 0, base = 0;
for (const r of Object.values(results)) {
  if (r.binaryang.ok && r.binaryangNT.ok && r.binaryang.sha !== r.binaryangNT.sha) { n++; extra += r.binaryang.size! - r.binaryangNT.size!; base += r.binaryangNT.size!; }
}
console.log(`  files carrying it: ${n}; extra bytes: ${extra} over ${base} (${(100 * extra / base).toFixed(1)}%)`);

console.log("\n== size: runtimes' output vs wasm-tools, summed over files both assembled ==");
let rt = 0, wt = 0, k = 0;
for (const r of Object.values(results)) { if (r.wasmtools.ok && r.wasmrt.ok) { rt += r.wasmrt.size!; wt += r.wasmtools.size!; k++; } }
console.log(`  ${k} files: wasmrt ${rt} B, wasm-tools ${wt} B, delta ${rt - wt} B (${(100 * (rt - wt) / wt).toFixed(2)}%)`);
