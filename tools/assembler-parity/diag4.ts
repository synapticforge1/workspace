// Diagnose the four files whose bodies still differ after regrouping locals: text diff first,
// then section headers and the first differing disassembly lines.
// Run: bun diag4.ts [corpus-relative .wat ...]   (no arguments = the four files of 2026-09-20)
import { readFileSync } from "node:fs";

const DIR = `${import.meta.dir}/full/`;
const results = JSON.parse(readFileSync(`${DIR}results.json`, "utf8")) as Record<string, unknown>;
const files = Object.keys(results);
const targets = process.argv.length > 2 ? process.argv.slice(2) : [
  "wasmtk/tests/module/wasm_mod/sieveOfEratosthenes_wat_mod.wat",
  "wasmtk/tests/module/wasm_wast/wasm-wat-samples-main/wasm-wat-samples-main/memory-multiple/memory-multiple.wat",
  "wasmtk/tests/wasi/wasm_wasi/15_Exceptions.wat",
  "wasmtk/tests/wasi/wasm_wasi/15_TestCase1-NestedEscalation.wat",
];
async function out(cmd: string[]): Promise<string> {
  const r = Bun.spawn(cmd, { stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr] = await Promise.all([new Response(r.stdout).text(), new Response(r.stderr).text()]);
  return stdout + stderr;
}
function firstDiff(a: string, b: string, ctx = 3): string {
  const la = a.split("\n"), lb = b.split("\n");
  for (let i = 0; i < Math.max(la.length, lb.length); i++) {
    if (la[i] !== lb[i]) {
      const s = Math.max(0, i - ctx);
      return `  wasm-tools:\n${la.slice(s, i + ctx + 1).map((l) => "    " + l).join("\n")}\n  wasmrt:\n${lb.slice(s, i + ctx + 1).map((l) => "    " + l).join("\n")}`;
    }
  }
  return "  (identical)";
}
for (const t of targets) {
  const n = files.indexOf(t);
  console.log(`\n=== ${t.replace("wasmtk/tests/", "")} (index ${n}) ===`);
  const a = `${DIR}wasmtools-${n}.wasm`, b = `${DIR}wasmrt-${n}.wasm`;
  const pa = await out(["wasm-tools", "print", a]), pb = await out(["wasm-tools", "print", b]);
  console.log("-- wasm-tools print, first difference:");
  console.log(firstDiff(pa, pb));
  const ha = await out(["wasm-objdump", "-h", a]), hb = await out(["wasm-objdump", "-h", b]);
  console.log("-- section headers, first difference:");
  console.log(firstDiff(ha.split("\n").slice(3).join("\n"), hb.split("\n").slice(3).join("\n"), 1));
  if (pa === pb) {
    const da = await out(["wasm-objdump", "-d", a]), db = await out(["wasm-objdump", "-d", b]);
    console.log("-- disassembly, first difference:");
    console.log(firstDiff(da.split("\n").slice(3).join("\n"), db.split("\n").slice(3).join("\n"), 2));
  }
}
