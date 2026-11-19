// clean-scratch.ts — report, and on request remove, stale session scratch folders on this machine.
// Run:  bun tools/clean-scratch.ts [--days N] [--root <dir>] [--delete]
// Default: a DRY RUN that lists what is stale. Nothing is removed without --delete.
// A session folder is stale when no file in it was written for N days (default 3).
// The scratch root is <user profile>/Temp/claude unless --root or CLAUDE_SCRATCH_ROOT says otherwise.
// Layout: <root>/<project key>/<session id>/…  — only whole session folders are removed. No dependencies.
import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (name: string) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const days = Number(flag("--days") ?? 3);
const doDelete = args.includes("--delete");
const root = flag("--root") ?? process.env.CLAUDE_SCRATCH_ROOT ??
  join(process.env.USERPROFILE ?? process.env.HOME ?? "", "Temp", "claude");

if (!Number.isFinite(days) || days < 1) { console.error("clean-scratch: --days must be 1 or more"); process.exit(1); }
if (!existsSync(root)) { console.error("clean-scratch: no scratch root found"); process.exit(1); }

const dirs = (d: string): string[] => {
  try { return readdirSync(d).filter((n) => { try { return statSync(join(d, n)).isDirectory(); } catch { return false; } }); }
  catch { return []; }
};
function measure(dir: string): { bytes: number; files: number; newest: number } {
  let bytes = 0, files = 0, newest = 0;
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop()!;
    let names: string[] = [];
    try { names = readdirSync(d); } catch { continue; }
    for (const n of names) {
      let s; try { s = statSync(join(d, n)); } catch { continue; }
      if (s.isDirectory()) stack.push(join(d, n));
      else { bytes += s.size; files++; if (s.mtimeMs > newest) newest = s.mtimeMs; }
    }
  }
  return { bytes, files, newest };
}
const MB = (n: number) => (n / 1048576).toFixed(1);
const now = Date.now();
let total = 0, staleBytes = 0, staleCount = 0, kept = 0, removed = 0, failed = 0;

for (const project of dirs(root)) {
  for (const session of dirs(join(root, project))) {
    const path = join(root, project, session);
    const m = measure(path);
    total += m.bytes;
    const age = m.newest ? (now - m.newest) / 86400000 : (now - statSync(path).mtimeMs) / 86400000;
    if (age < days) { kept++; continue; }
    staleCount++; staleBytes += m.bytes;
    // The session id is shown shortened; the full path is never printed.
    const label = `${project.slice(0, 8)}/${session.slice(0, 8)}  ${MB(m.bytes)} MB  ${m.files} files  idle ${age.toFixed(1)} days`;
    if (!doDelete) { console.log(`stale   ${label}`); continue; }
    try { rmSync(path, { recursive: true, force: true }); removed++; console.log(`removed ${label}`); }
    catch { failed++; console.log(`FAILED  ${label} (in use?)`); }
  }
}
console.log(`clean-scratch: ${MB(total)} MB in all; ${staleCount} session folders idle ${days}+ days hold ${MB(staleBytes)} MB; ${kept} active kept` +
  (doDelete ? `; removed ${removed}, failed ${failed}` : "; dry run — add --delete to remove them"));
process.exit(failed ? 1 : 0);
