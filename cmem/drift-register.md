# drift-register.md — contradictions found 2026-09-20 (and 2026-10-22, last section)

**2026-11-19:** 37 closed or retired rows moved out; the full register as it stood is in
[archive/drift-register-to-2026-11-19.md](archive/drift-register-to-2026-11-19.md). The rows below were not marked closed there
and are RE-VERIFIED before anyone acts on them — most date from 2026-09-20.

Every row is a claim read from a sibling's memory that disagrees with another claim, with the code,
or with a sibling. **None was fixed today**; the closing action is the "reconcile" trigger: measure,
fix in the owning repo, record the commit here, then delete the row. Severity: 🔴 misleads a session
into wrong work · 🟡 stale but harmless · ⚪ style.

## Workspace-wide

Rows marked **DECIDED** have an owner decision (2026-09-20, [goals.md](goals.md) § 3); what remains
is the edit in the owning repo, listed in [open-work.md](open-work.md).

- W1
  - sev: 🔴
  - where: every repo vs session harness
  - contradiction: Owner hard rules (scripts in the repo language's own mechanism, else Bun — 2026-10-22;
    Deno-only before; no heredocs, Write/Edit for content, Grep/Read over shell) vs the harness instruction to
    prefer Bash/heredocs. binaryang says the owner rule outranks the session and to say so.
  - measurement that closes it: **DECIDED**: workspace-wide, loaders included. Record the override in each
    pointer file.
- W2
  - sev: 🔴
  - where: wasmrt, wazmrt vs wasmtk, binaryang
  - contradiction: Pointer-file policy: wasmtk gitignored 4.7 KB pointer; wasmrt 48 KB tracked with a 300-line
    status narrative; wazmrt none; loaders tracked and stale.
  - measurement that closes it: **DECIDED**: one policy, binaryang's; each repo conforms in a docs commit
    under its own git rules.
- W3
  - sev: 🔴
  - where: wasmrt INDEX 141 KB, wazmrt INDEX 182 KB
  - contradiction: Both say "keep files small, one-line pointers"; both carry 500–800 lines of dated state
    above the policy.
  - measurement that closes it: **DECIDED** (same policy): move state to `open-work.md`; summarize with commit
    pointers.
- W4
  - sev: 🟡
  - where: wasmtk best-practices
  - contradiction: Attributes "CPU time before theorising", "reachable before bisecting", "background suite
    kills the shell" to `[wazmrt]`; wazmrt has no such rules.
  - measurement that closes it: Retag `[wasmtk]`.
- W5
  - sev: 🟡
  - where: binaryang + wasmtk + this file
  - contradiction: The nine-item USED-not-NAMED checklist exists in three copies "so neither side has to
    remember it alone"; three copies drift.
  - measurement that closes it: **DECIDED**: canonical here, duplicated in every repo under a "copied from …
    on <date>" stamp; changes are made here and re-copied.
- W6
  - sev: 🔴
  - where: versioning (see layout-and-packaging)
  - contradiction: wasmtk: numbers carry NO compatibility meaning; binaryang: removing an export is breaking →
    minor; wazmrt: breaking → major immediately. Consumers' carets see all three the same way.
  - measurement that closes it: **DECIDED**: plain SemVer 2.0.0 everywhere — no cap, no carry; major = break.
    Retire every cap-at-9 rule and odometer bump script; give binaryang's bump a minor mode.
- W7
  - sev: 🟡
  - where: loaders -c, -go, -dotnet workflows
  - contradiction: Use third-party `uses:` while js/jvm/py/rs/dart say the org forbids it; -dotnet reportedly
    published through `NuGet/login@v1`.
  - measurement that closes it: Check the org Actions policy once; record the answer in
    `-js/cmem/overview.md`.
- W8
  - sev: 🟡
  - where: attribution line
  - contradiction: wasmtk `workflow.md` hard-codes `Co-Authored-By: Claude Opus 5 (1M context)`; the session
    supplies a different model string.
  - measurement that closes it: Rule: "the line the session supplies".
- W9
  - sev: ⚪
  - where: glyphs
  - contradiction: No sibling defines a legend; usage differs (🔁 = "repeat across codebases" in wabt-ts,
    "superseded" in wasmtk).
  - measurement that closes it: Adopt the legend in memory-conventions.md.

## binaryang

## wasmtk

✅ **T1–T11 closed** by wasmtk `c557c890db3` (2026-09-28), letter H4; spot-checked 2026-10-22: T1
(`design-decisions.md:1293-1300` keeps PT1M, matching `deno.json:62`), T6 (`capabilities.md:99-101`
says `deno task install`, `--allow-ffi` required). Rows deleted 2026-10-22 (this folder has no git
history, so the old rows survive only as this list):
T1 PT1H/PT1M, T2 stale backends, T3 vision repo list, T4 `.wast` pinning, T5 `deno fmt` trap,
T6 install line, T7 counts, T8 pin history, T9 `--lang`, T10 `-go` engine, T11 vendored rule.

## wasmrt

✅ **R1–R9 closed 2026-10-26** (letter H2; wasmrt `2ee6628` = `origin/main`), each measured here by
an independent check: R1 `CLAUDE.md` 3,882 B, a tracked pointer (INDEX 7,297 B, `open-work.md`
4,964 B); R2 no § number repeats inside wasmrt's own scheme (the ★ block's `§1`–`§8` group headings
are a second scheme, not duplicates); R3 README has no "oracle" / "99.4" text; R4, R6 survive only
as dated history (`architecture.md:45` "was a doc-comment stub", `roadmap.md:277` lists them as
handled; `design-decisions.md:389` "was never used"); R5, R7, R9 quoted text gone from `cmem/`; R8
`loaders.md:99` counts 75 functions from `surface/current.txt` (2026-10-24). Rows deleted (this
folder has no git history, so they survive only as this list): R1 pointer 48 KB, R2 duplicated §,
R3 oracle claims, R4 `pin` stub, R5 clear-out, R6 invariants, R7 contract-version step, R8 counts,
R9 threads patch.

## wazmrt

## Loaders, rsxtk, lisp-wat

- L5
  - sev: 🟡
  - where: -rs `upstream/` snapshot; -py submodule
  - contradiction: Vendored `abi.js` was 2.x code under a hand-bumped 3.0.0 SPEC. **2026-10-26: -rs
    fast-forwarded its gitignored `upstream/` to -js `bcab4b4` (1.1.2); -py's submodule is pinned at -js
    `d9f6860` (`v1.0.8-2`) — SPEC 3.0.0 + §10, so correct but stale.**
  - closes with: -py re-pins at the next -js release; then delete.
- L10| 🟡
  - sev: lisp-wat_interpreter
  - where: No manifest, license file, memory or reference from any sibling; README ticks
    `br_table`/`call_indirect` as done and lists them as TODO.
  - contradiction: **DECIDED**: kept as a future pre-computation stage for binaryang; gets memory when
    development starts. Check binaryang's `Precompute` coverage first.

## Found 2026-10-22 (read-only sweep of every repo; the Bun move and the month since 2026-09-20)

- X9
  - sev: 🔴
  - where: wazmrt, wasmtk, wasmrt, binaryang, loader-dart (`origin/main`)
  - contradiction: Personal drive paths public in 18 tracked files, incl. wazmrt's tracked
    `.claude/settings.local.json` (user-named paths) and wasmtk's 7 `*_host.ts` with `file:///D:/…` imports
    (non-portable too; generated by `tests/bindgen_tests.ts`).
  - closes with: Letter H18 (files) + H19 (history purge, decided 2026-10-22). **2026-10-26:** done in wasmtk
    (pushed, purged twice — the second for a BINARY's debug paths), wazmrt, wasmrt, rsxtk, loader-c,
    loader-dotnet, binaryen-ts (34 immutable tags excepted, owner: leave); binaryang's text history clean on
    every public ref, but **five committed `.wasm` benchmarks carried paths in DWARF** (fixed at HEAD
    `b52551f37 (was 9e44e5af9)`; the old blobs = owner's second purge); **loader-dart ✅ night 2026-10-26 (HEAD
    clean, history purged and force-pushed, 0 path commits on any ref — measured); still open: LeptonPad
    (local rewrite awaiting the owner's force-push), zailc, zilc (X11), binaryang's old blobs (owner)**.
    Lesson, now in working-rules § Records: scan binaries too (`-a`); `-I` skipped every one of these.
- X7
  - sev: 🟡
  - where: five other repos' memories (2026-10-12/21)
  - contradiction: Recorded "Bun only" before the owner's same-day clarification that a language's own
    mechanism comes first — true for TS/Rust/C repos, now incomplete for Zig, Python, Kotlin, C#, Go loaders.
  - closes with: Letter H15 (per-repo table).
- X4
  - sev: 🟡
  - where: wasmtk `next-work.md:8-37` (W1–W3)
  - contradiction: wasmtk logs the WORKSPACE as lagging on Bun (on hold). This side was fixed 2026-10-22.
  - closes with: wasmtk closes W1–W3 on reading H15.
- X5
  - sev: 🟡
  - where: this folder's `tools/assembler-parity/` vs the corpus
  - contradiction: The "corpus" is mostly gitignored build OUTPUT: 95 of 605 `.wat` under `wasmtk/tests` are
    tracked; +73 since 2026-09-20 are `wasi/wasm_wasi` outputs of new `.ts` tests. A parity count without the
    wasmtk SHA and the file list is not reproducible.
  - closes with: Record wasmtk HEAD + a file-list hash with every run (measure.ts).
- X19
  - sev: 🟡
  - where: `projects.md` (frozen pair) vs GitHub
  - contradiction: The map said wabt-ts and binaryen-ts "stay under `jrmarcum`"; GitHub answers 301 →
    `synapticforge1/wabt-ts`, `synapticforge1/binaryen-ts` (measured 2026-10-26); both clones' `origin` still
    name the old owner; binaryen-ts was purged and pushed the same day (H19), wabt-ts untouched (47 packs,
    seven orphan `.idx`).
  - closes with: ✅ map fixed 2026-10-26; then MOOT the same evening — the owner retired both repos (folders
    removed, GitHub repos deleted, JSR yanked to 1.5.1; letter H28). Delete at the next reconcile.

## Found 2026-10-26 (the five repos added to the workspace: LeptonPad, S3D-ReportCompiler, ub-cosmic, zailc, zilc)

Read-only sweep; letter H26 carries the asks. Severity as above.

- X15
  - sev: 🟡
  - where: (2026-10-28, `git cat-file -s origin/main:cmem/INDEX.md`: LeptonPad 8.9 KB, zailc 5.7 KB, S3D 5.6
    KB — done; **zilc 11.5 KB still over**, and LeptonPad's `known-issues.md` its own roadmap 21.) Was:
    LeptonPad INDEX 63.7 KB (+ `known-issues.md` 103 KB); zilc INDEX 44 KB; zailc INDEX 12.5 KB with ~110
    lines of state above the policy; S3D gitignored `CLAUDE.md` 7.4 KB with a status table
  - contradiction: Each says "keep files small, one line per file"; bootstrap floor is ~10 KB and the status
    line lives once (memory-conventions § The two layers).
  - closes with: Each repo's conformance commit (P3).
- X16
  - sev: 🟡
  - where: LeptonPad `cmem/collaboration.md:3`; ub-cosmic `artifacthub-repo.yml:6`
  - contradiction: The owner's address in a committed file vs the Records rule (manifest field of a registry,
    or commits, only). ub-cosmic's is a registry-read field (Artifact Hub `owners`); LeptonPad publishes
    nowhere.
  - closes with: 🗓️ OWNER rules both (H26). LeptonPad ruled ALLOWED 2026-10-26; ub-cosmic part MOOT — repo
    deleted 2026-10-27.

