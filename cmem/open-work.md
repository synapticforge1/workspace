# open-work.md — what is outstanding across the workspace

Only open items. Each points at its owner repo's record. Closed items leave this file; their record
stays in the owning repo. Created 2026-09-20; owner decisions of the same date folded in.

## Owner actions

Measured 2026-11-24. Earlier closed and decided items: [archive/open-work-to-2026-11-20.md](archive/open-work-to-2026-11-20.md).

- **Unpushed, yours to push:** binaryang branch `fixes-batch` 65 commits ahead of `origin/main`;
  wasmrt 4; zilc 2 (and 5 files uncommitted, work in progress); LeptonPad `dev` 2; wazmrt 1;
  wasmtk branch `feat/number-model-2026-11-20` 1; this workspace repo 1, plus answers that project
  sessions wrote into `letters/` and left uncommitted.
- **Uncommitted in the projects:** loader-dotnet 1 (the "Owner commands" section, since
  2026-11-10); loader-js 1; binaryang 1.
- **The ten loaders have had no session since 2026-11-12.** Waiting there: the review standard
  (H37), the memory guide (H38), the testing tiers (H40), the new letter format and location (H41,
  H42), the scratch rule (H43), and wasmtk's new fixtures stamp after its third history rewrite
  (C49 — loader-js first, then the nine ports).
- **Test machines** (H37): an x86_64 Mac with Parallels 26 and an arm64 Mac with Parallels 27.
  Until then a release states what it was tested on and lists the rest as `pending`.
- **The Linux distro list** for `linux-x64`: at least one glibc 2.28 distro (a RHEL 8 rebuild)
  and one Alpine for the musl build (platforms.md).
- **wasmtk:** H6.5b consumer suites — only your go-ahead is left; decisions N1, N3, N4 of the
  number model (its branch `feat/number-model-2026-11-20` is in progress).
- **Loaders:** send loader-dart's GitHub Support letter (its `cmem/open-work.md`); the Zigistry
  topic for loader-zig (a web-UI item).
- **H19:** only the GitHub Support requests for old commits served by hash — wasmtk (now three
  rewrites), wazmrt, loader-dotnet and zilc have theirs drafted; zailc's is open; binaryang's can
  name both purges.
- **zail and wasic: one definition of TypeScript-syntax semantics, or two?** (divergence I17,
  2026-11-07) zail's grammar is now TypeScript's syntax; wasmtk's `wasic` compiles TypeScript too.
  Both chose `number` = f64; integers, indexes, division and strings are chosen separately. Shared
  → a DEFINITION row with one owner; separate → DESIGN, recorded in both.
- **binaryang's two owner rules of 2026-10-28 — workspace-wide or binaryang's own?** (a) "A change
  that needs an ignore statement is not a fix" — recorded here as best-practices 4.23 (not 🔒);
  (b) the numeric-ID register with its spec-overlap list (`../../binaryang/cmem/working-rules.md:250`)
  — it matters wherever IDs cross a boundary (wasmtk, the runtimes, the loaders). If either binds
  every repo, it goes in `working-rules.md` with a 🔒 and a letter.
- (Closed 2026-10-23: rsxtk's `Cargo.toml` maintainer email is allowed — rsxtk publishes to
  crates.io, 34 versions; the earlier "publishes nowhere" was this memory's error.)
- **Personal drive paths already on GitHub** (letter H18; decided 2026-10-22: purge history in
  every repo). **✅ Done 2026-10-30** — H18 closed: every repo purged, binaryang's binary blobs
  included; the GitHub Support requests (above) are what is left.
  **Binaries carry paths too** (binaryang's `.wasm` benchmarks, wasmtk's `fib-zig_mod.wasm`
  DWARF) — the scan rule includes them (working-rules § Records).
- (Closed 2026-10-26 evening: 🔒 "the maintainer address can carry to every repo" — one committed
  `cmem/` note naming the maintainer contact is allowed everywhere; working-rules § Records; H28.)
- (Closed 2026-10-28: **the repos added 2026-10-26 are under the floor** — letter H26 closed by
  the workspace after verifying each answer: pull lines, ★ blocks, path tests, X10/X11/X12/X14/X17
  closed, every repo on one exFAT recipe (H16 closed, P7 converged), pushes done. Left in their own
  rows: zilc's INDEX 11.5 KB (X15); zailc's record of the zilc/zailc re-split (C22/C24).)
- Remaining interop §5 calls: spelling adoption deadline, per-kind exit-code table. (The attribution
  of wasmrt commit `c9c447f3` — `7ce0dcd2` before its rewrite — was confirmed by the owner
  2026-09-20, wazmrt `interop.md:1207`.)

## Conformance to the decided memory policy (one docs commit per repo, under its own git rules)

Policy: [memory-conventions.md](archive/memory-conventions-to-2026-11-19.md). Each item = cut the pointer to ≤ 5 KB, INDEX
to one line per file, status narrative to `open-work.md`, summaries with commit pointers, and the
★ block copied into `best-practices.md` under a dated stamp.

- (wasmrt ✅ 2026-10-26: pointer 3.9 KB, INDEX 7.3 KB, R1–R9 closed — letter H2, verified.)
- (wazmrt ✅ 2026-10-23: INDEX 192 KB → 10.9 KB, state in `open-work.md`, Z1–Z6 closed — letter H3.)
- **LeptonPad** (INDEX ✅ 8.9 KB, measured 2026-10-28): `known-issues.md` (its roadmap 21).
  **zilc**: INDEX 44 → **11.5 KB** (2026-10-27, `2c7faf0`), still just over. (zailc ✅ 5.7 KB,
  S3D ✅ 5.6 KB, 2026-10-28.) X15.
- **wasmtk**: retag the three rules (W4). (T1–T11 done, `c557c890db3`, 2026-09-28.)
- **versioning → SemVer in every repo** (🔒 2026-09-20): wasmtk `scripts/bump.ts` — remove
  `MAX_COMPONENT = 9` and the carry, accept `patch|minor|major`, reset lower components; retire
  the "versions carry no compatibility meaning" bullet in `design-decisions.md`. binaryang
  `scripts/release/bump_version.ts` — remove the sub-version cap, add a minor mode; retire the
  "capped at 9" line in `publishing.md`. ~~wazmrt: retire the odometer~~ ✅ 2026-10-23 (`6c055eb`:
  `releasing.md` § "THE NUMBER" is SemVer 2.0.0; the odometer marked retired); ~~wasmrt `releasing.md`
  — retire "patch stays single-digit"~~ ✅ 2026-10-24 (retired by H6; `releasing.md:81` keeps it as
  history, verified 2026-10-26); ~~zailc "capped at 9"~~ ✅ 2026-10-27 (`9a83dfd`, in `bump.ts` too; X10). Loaders'
  bump scripts already edit a plain SemVer line (2026-09-20 they were all `bump.sh`; by
  2026-10-22 -c is `bump.ts`, -dart `.dart`, -v `.vsh`, and -rs/-py/-jvm `.sh` are being ported, H15). Keep the README Breaking Changes table everywhere.
- **the compatibility gate, per repo** (🔒 2026-09-20; [layout-and-packaging.md](layout-and-packaging.md)
  § "The compatibility gate"). Nothing below exists yet unless stated; each repo proves its gate
  fails on purpose before trusting it.
  - **binaryang**: `scripts/api-surface.ts` → commit `api-surface.json` from the `exports` map +
    `deno doc --json`; `bump_version.ts` diffs it and prints the floor; CI step on the tag; run the
    previous tag's `tests/` against new `src/`; wasmtk's suite against the unpublished build is the
    consumer check (wasmtk's `upstream/` setup already does it from the other side — make it a
    named step in `publishing.md`). Existing: byte baseline, `direct-behaviour`, `version_sync.test.ts`.
  - **wasmtk**: same surface tool (16 entrypoints); `bump.ts` gains the floor check; consumers =
    the ten loaders' fixture suites (regenerate fixtures with the unpublished build, run each
    loader's tests) and LeptonPad. Existing: `deno doc --json` parsing, per-file wast baseline.
  - **wasmrt ✅ 2026-10-26 (verified)**: `surface/released.txt` / `current.txt` (227 KB each),
    `scripts/surface.ts --check` in the gate, floor PATCH since 2.0.0; carry-forward S1/S2 (H23).
    Still to add: consumers = rsxtk (once switched), the interop contract rows.
  - **wazmrt ✅ 2026-10-23** (`6c055eb`): `zig build surface` (`tools/surface.zig`) diffs the
    committed `tools/surface/released.txt` against `current.txt` (184 surface lines), prints the
    floor and refuses a bump below it; runs inside `test`; inverted, every mutant red for its own
    reason (`testing.md:160`). Also existing: `capi-smoke` from the header, `abi_version`, exact
    size ceilings, empty conformance baseline.
  - **loaders (ten) — ✅ nine done by 2026-10-26 night** (surface snapshot + floor + previous-tag
    tests + SPEC assertion, each inverted on scratch clones: -js, -c, -dart, -dotnet, -zig, -py, -v,
    -jvm, -rs with `cargo semver-checks`); **-go** gates on `go vet` + `go test` only.
  - **rsxtk**: `cargo semver-checks` is moot until a `pub` API exists (binary crate); the surface is
    the CLI — golden `--help` plus the smoke set in `testing.md`; needs a test suite first.
- **binaryang**: B1–B7; the nine-item checklist points here (W5).
- **loaders (ten)** — ✅ 2026-10-26 night: L1 (-go tracks `cmem/`), L2 (-jvm, -rs), L3 (one set
  everywhere), L4, L6 (groupId decided), L7, L8 closed; L5 (-py submodule pin) remains; `-go` vision
  line (T10) unmeasured.
- ~~wabt-ts: `STALE-SNAPSHOT.md` (P3)~~ moot — retired and removed 2026-10-26.
- (rsxtk ✅: memory committed 2026-10-20, `de62a6d`.)

## Cross-repo threads

- **binaryang → wasmtk** (state 2026-10-26): wasmtk pins **2.2.0**, binaryang is at **2.2.1**;
  § 41 SENT 2026-10-23 (C1 closed), wasmtk's two letters back SENT 2026-10-26 (C12, open — the
  `Module._inner` + `bundle()` contract question); `wasmbundle` now runs on binaryang's `bundle()`
  (H11 closed); I2's trigger (stage 5) has FIRED (2026-09-28) — wasmtk's WAT regexes may now give
  way to binaryang's parser, still not scheduled in wasmtk; the owner's number-type direction
  (2026-10-26) changes wasic's subset and so I11's `ts2wasm` bar (wasmtk W10) —
  `binaryang/cmem/open-work.md`, `wasmtk/cmem/next-work.md`.
  Cadence rule: binaryang releases when its own gate passes; the milestone exists because wasmtk needs it.
- **wasmrt ↔ wazmrt** (state 2026-10-26): mirror byte-identical through **v40**; **v41 pending**
  wasmrt's mirror (C7); lockstep ENDED at v33 (owner 2026-10-23); both released a major since
  2026-10-22 (wasmrt 2.0.0, wazmrt 5.0.0); wazmrt's I8 fix `852ff84` unreleased; regime B has
  never run — `wazmrt/cmem/interop.md`.
- **Cross-repo lessons with ONE instance so far (a second makes them ★; until then adopted-with-tag
  by whoever wants them):** (a) wasmtk W11 — a golden snapshot must not freeze a checkout's
  absolute path (the folder rename made 9 entries "diverge"); (b) rsxtk R.4 — on this MinGW
  toolchain two release builds of the same Rust source differ only in PE `TimeDateStamp` +
  `CheckSum`; mask them before calling binaries "the same" (wasmrt may want it); (c) wazmrt §3 —
  an agreement with an oracle is dated by the oracle's VERSION (I8: wasm-tools 1.259 → 1.262);
  (d) binaryang + wasmtk, the same day — a text scan (`-I`) misses paths inside committed
  BINARIES (DWARF, debug info): now a floor rule, working-rules § Records; (e) -dart — `git describe`
  abbreviates to a clone-dependent length, so a stamp is COPIED, never regenerated and compared
  (S4); (f) -jvm + -rs — `grep … | head | sed` under `set -o pipefail` exits silently when the line
  is missing (two `bump.sh` had it; the ports print the message); (g) -dotnet — after a purge,
  `gc --prune=now` leaves a stale `commit-graph` that makes `gc` / `fsck` fail until it is deleted and
  rewritten (`local/environment.md`); (h) -zig — a test runner that owns stdout hangs on a WASI
  `fd_write` test when the loader's WASI context inherits it; run such suites as a plain step.
- **Deno exit**: wasmtk `deno-exit-plan.md` P0–P4 (product) open after P5 (scripts, 2026-10-21);
  stale-record cleanup per letter H15.
- **runtimes → wasmtk corpus**: the two runtimes' vendored-patch views of `proposals/threads/`
  differ; re-check after the next testsuite sync — `wasmtk/cmem/testing.md`.
- **runtimes → rsxtk + wasmtk (the slot, decided)**: measure the `wasmrt-core` rlib rsxtk would
  link (never measured); add a first-party runtime to wasmtk's `dync_cross_runtime` RUNTIMES;
  same-machine bake-off vs wasm3 / WAMR / each other — `wasmrt/cmem/roadmap.md` T11,
  `wazmrt/cmem/vision.md`. Loaders only after issues found here are identified.
- **wasmtk → loaders**: ✅ 2026-10-26 — tests in -v and -zig, -rs published (0.2.0), one fixture set
  in all ten (L3/S4). Next: wasmtk's H6.5b run (owner), then the ports answer H29.
- **LeptonPad → wasmtk**: ✅ LeptonPad pinned `jsr:@jrmarcum/wasmtk@2.0.3` (`797a351`, 2026-10-26;
  unpinned it was already resolving 3.0.0). Open: wasmtk's H6.5b consumer suites add LeptonPad's
  `build:wasm` before the next 3.x (divergence S7).
- **zilc ⇄ zailc** (🔒 re-split by the owner 2026-10-27, C22/C24; `projects.md`): the pure-Zig
  build of Fil-C on Linux is now zilc's — it took yolo musl's shared half itself on 0.687 (C25),
  the step zailc had paused at; zailc keeps departures, the zail language, newer Zig and every
  other platform. ~~Open: zailc records the re-split~~ — **answered 2026-11-05** (`84ea70b`,
  unpushed: steps 2–3 headed "moved to zilc"); zilc verifies C22–C25 once zailc's `main` is pushed.
  Then refined the same day (C28): zailc is a clean slate in Zig 0.17.1 reading zilc as its corpus. Bun port merged (X14 ✅). The two share the `~/zilc-work` /
  `~/zailc-work` WSL trees.
  **Zig versions:** ~~zailc moves 0.15.2 → 0.17.0 once cross-platform~~ (2026-10-27, superseded) —
  🔒 owner 2026-11-05: **zailc's base target is Zig 0.17.1**, the move starting with its first
  nightly (local `main`, unpushed); every Zig move waits for that version's ZLS release. Relevant to every Zig
  repo here (zilc, wazmrt, loader-zig): **Zig 0.17.0 bundles LLVM 22.1.8 with LLVM's loop
  vectorization DISABLED** (miscompilation workaround, llvm/llvm-project#186922; Zig's release
  notes: 0.18.0 with LLVM 23 restores it) — speed comparisons across a 0.17.0 move are not
  like-for-like. **Host, measured 2026-11-05: the `zig` on PATH is now 0.17.1** (0.16.0 before);
  wazmrt is still on 0.16.0 and cannot re-run `test-safe` / `test-shipped` on it until it migrates
  (owner: "we will start that later"); zilc / zailc use the pinned 0.15.2 off PATH, unaffected.
  loader-zig's toolchain on 0.17.1 is UNMEASURED.
- **lisp-wat_interpreter → binaryang**: before development starts, measure whether binaryang's
  ported `Precompute` / constant-folding passes already fold pure-math, non-recursive subtrees
  (grep `binaryang/src/binaryen-ts/passes/`, one input); then scope the pre-computation stage.

## Divergence register — measurements to take ([divergences.md](divergences.md))

- 🔒 DECIDED: D1/D2/D3 proceed with binaryang as the source (letters H9, H10). Sequence: D1 schema
  + population + self-regeneration proof in binaryang → runtimes and wasmtk generate their copies
  with a diff check → D2 → C1 comparison → D3.
- 🔒 DECIDED: wasmtk's WAT regexes give way to binaryang's parser at binaryang's one-front-end
  stage 5 (I2); wasmtk files an offload inventory, one row per candidate with its trigger (I10, H11).
- 🔒 DECIDED: `wasic` becomes binaryang's `./ts2wasm` when mature and is retired from wasmtk
  (I11, H12). 🗓️ OWNER: confirm or amend the four-part maturity bar proposed on I11.
- ⏸️ NOT YET, by owner direction: the `ts2wasm` + `wasm2ts` scope. Opened by the owner once
  binaryang and wasmtk are more stable. Until then no repo drafts it.
- ✅ RE-MEASURED 2026-10-22 (I7, I12–I16; `tools/assembler-parity/full-2026-10-22.out`; 605
  files at wasmtk `a9df1a0b38a`, `--enable-all`): **wazmrt = wasm-tools byte for byte 603/603**
  (H13 fixed); **wasmrt bodies differed on 539/603** then — **fixed by wasmrt 2026-10-23
  (`scripts/body-parity.ts` 603/603; H13 closed 2026-10-26)**; binaryang bodies = wasm-tools
  603/603, custom sections differ by design (H14). ⏳ **Next workspace measurement: rebuild wasmrt
  (the harness holds a stale build, per wasmrt) and re-run `measure.ts` at wasmtk's post-purge HEAD
  to close I12–I14 here.** (2026-09-20: runtimes identical to each other 528/528, both 464/528 off
  wasm-tools.) **I8 CLOSED 2026-10-26**: all four assemblers agree on wasm-tools 1.262; wazmrt was
  the outlier, fixed `852ff84`.
- Harness lesson (I16, X5): two of the seven assemblers silently narrowed their default feature
  set or encoding between runs; pass the feature set explicitly, and fingerprint the corpus.
- 🔒 DECIDED (owner 2026-09-20): binaryang's fidelity mandate (WAT ⇄ wasm unless optimized) makes
  its name-section shape and `text-form` section DESIGN, not defects; both stay (I7, I15).
- 🗓️ OWNER (I7 recommendation): make `.wat` pins portable across a fidelity tool and two
  executors by digesting the module BODY (custom sections stripped) rather than the raw bytes, or
  by pinning `.wasm` only. Changes one row of the runtime interop contract ("hash the assembled
  bytes" → "hash the assembled body").
- ⏸️ NEXT MEASUREMENT, owner-sequenced 2026-09-20 ("for another day"): before any body rule is
  adopted, **measure where binaryang diverges from wasm-tools for fidelity's sake** — every
  section, every subsection, on the same 528 files — so the fidelity extras are enumerated (name
  subsections, text-form, custom placement, anything else) and separated from what is merely
  different. THEN compare the runtimes against that and decide the body rule (I12–I14). The
  parity scripts in `tools/assembler-parity/` are the starting point; add a per-section diff.
- Measure: I5 opcode-table membership across binaryang / wasmrt / wazmrt; I6 feature-name lists;
  I8 `@custom "name"` through all three; I9 whether binaryang's ported passes already fold
  pure-math subtrees; C1 the four-runner per-file comparison on one corpus SHA; S2 unknown-flag and
  mistyped-command behaviour in binaryang's and wasmtk's `main.ts` and rsxtk.
- Run wasmrt's three sweeps (`feature-gate-sweep`, `index-type-sweep`, `differential-fuzz`)
  against wazmrt and binaryang (I3, I4); file DEFECT rows for every difference.
- S4: regenerate all loader fixtures from one `wasmtk modc` run; stamp; commit identical bytes.
- C2: one threads patch in wasmtk that both runtimes read.

## Workspace memory

- Work the [drift-register.md](drift-register.md) rows through the "reconcile" trigger, 🔴 first;
  DECIDED rows need only the edit.
- (Done 2026-10-26: `local/environment.md` carries the new workspace root, the testsuite path and
  the `safe.directory` resolution.)
- **Ledger hygiene**: rows C3–C6, C8, C10 carry the workspace's answers and wait for their creators
  to close; H5, H8, H12 wait on the remaining recipients. Re-read `workspace-correspondence.md`
  before the next sweep — repo sessions write to it concurrently.
- **Session bootstrap is over budget** (measured 2026-10-27): `cmem/INDEX.md` + `../CLAUDE.md`
  ≈ 16 KB against INDEX policy's "about 10 KB", after the index's narrative moved to
  [handoffs.md](handoffs.md) § "Refresh history". Most of the rest is the root pointer's 🔒 owner
  text and its "What is here" table (which repeats [projects.md](projects.md)) — 🗓️ OWNER: trim the
  pointer, or raise the budget.
