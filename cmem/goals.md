# goals.md — what the ecosystem is trying to be, and what is still undecided

Compiled 2026-09-20 from `wasmtk/cmem/vision.md`, `wasmrt/cmem/vision.md`, `wazmrt/cmem/vision.md`,
`binaryang/cmem/project.md` + `ir-convergence.md`, `universalWasmLoader-js/VISION.md`, and the owner
directives quoted in each. The first section is what the memories SAY; the second is what I read
between them; the third is the list to talk through.

## 1. The recorded goals

- **The thesis** (wasmtk vision): WASM is the universal binary, WIT the universal contract, the
  Canonical ABI the transport; TypeScript is the reference implementation ("TypeScript as a DLL":
  `.wasm` library + `.wit` header + `.bindings.ts` import library); no lock-in; progressive porting.
- **One toolchain, first-party end to end**: `wasic` compiles TS → WAT; binaryang assembles,
  validates, optimizes; a first-party runtime executes; ten loaders consume from any language;
  rsxtk does the same for Rust scripts. Third-party engines (wasmtime, wasmer, wazero, Chicory,
  V8) are oracles and stopgaps, not the destination.
- **binaryang**: one tree with two verb sets — a fidelity phase (wabt-ts ops, text ↔ binary
  round-trip, byte-identity with upstream where DESIGN rows do not say otherwise) and an
  optimization phase (binaryen-ts passes) — sharing one front end (readers and writers), with the
  bridge gone (done 2026-09-18) and the second decoder/writer/`parseWat` retired (stages 3–5,
  open). Classified divergences, never silent ones. Consumers change one import line.
- **wasmtk**: every suite green on every engine it targets; the spec corpus as the conformance
  floor with the 100 pinned GC/ref-type failures worked down; Zig/Rust producers gaining test
  suites; `wasic` decomposed from a 19.7K-line monolith without changing a byte of output;
  Stage 3–5 orchestration (`wasmtk build/compose/setup/port`, pixi) still ahead.
- **wasmrt and wazmrt**: each "complete on its own terms" at zero failed / zero skipped / zero
  unrun; then hardening → bug hunt → optimization → security review; swappable CLI and security
  surfaces (the interop contract); the smallest and fastest binary wins the slot in wasmtk, rsxtk
  and the loaders. Security model: authority (WASI sandbox, symlinks denied by default) and
  authenticity (content-addressed pin DB, root-owned, fail-closed; signatures design-only).
- **Loaders**: SPEC 3.0.0 + §10 implemented in ten languages; JS is the reference; zero
  configuration; typed-interface generation where the language allows; token-free publishing.
- **Memory**: `cmem/` as the single, portable home; small pointer files; method separated from
  findings; git as the archive.

- **🔒 Standing goal added by the owner, 2026-09-20 — a common IR and no unintended divergence
  between projects.** Inside binaryang the common IR is the convergence already under way (one
  tree, two verb sets, one front end). Across languages the IR cannot be one tree, so "common"
  means one DEFINITION: one opcode and immediate table, one feature-name list, one error
  vocabulary, from which each language's copy is generated and checked. Everything else two repos
  both implement is either a contract with a running check, a deliberate competition whose
  behaviour must still agree, or a defect. The ledger for all of it is
  [divergences.md](divergences.md); this workspace memory holds the reins, and the workspace
  session is the reviewer, reporter and communicator of these issues to the repos
  ([handoffs.md](handoffs.md)), so that each repo stays on task and the common goals are produced.

## 2. What the memories say when read together

- **The competition slot does not exist yet.** Both runtimes are optimizing for a consumer that
  still runs on wasmtime/wazero/host engines. The cheapest real signal is one integration: wasmrt
  linked into rsxtk (the rlib rsxtk would use has never been measured), or either runtime in
  wasmtk's `dync_cross_runtime` gate. Until one of those runs, "fast and small are the gate" is a
  gate without a trigger — the rule the runtimes themselves wrote.
- **The pipeline's critical path is release cadence, not code.** wasmtk is paused on binaryang
  publishing; binaryang's rule is that a bump is never incidental and its auto-tag cannot publish
  without a `RELEASE_PAT` the owner agreed to create. Two owner actions unblock the whole
  TS pillar. *(2026-10-22: resolved — binaryang pushes its own tag, `RELEASE_PAT` closed as not
  needed 2026-09-29, nine minors shipped since; the critical path is now wasmtk's compiler audit.)*
- **The predecessors' memory was summarized well; the runtimes' memory is now the largest
  unsummarized mass** (3 MB across wasmrt and wazmrt), and it is drifting in exactly the ways their
  own §1 rules warn about. The cleanup policy binaryang wrote on 2026-09-14 is ready to apply there.
- **Three ideas of what a version number means** coexist in repos that consume each other.
- **The loaders are done as a proof and thin as products**: six built-but-unpublished or
  never-published, two with no tests, fixtures no longer byte-identical, a `-go` engine choice that
  reversed an owner decision on a benchmark. They are also the only place the runtimes could land
  behind a C ABI, and today they call `wasmtime_*` directly.
- **rsxtk is load-bearing and memory-less**: wasmtk delegates all Rust producing to it, wasmrt is
  to become its engine, and it records neither.
- **The method corpus is the real shared asset.** About 300 rules across the siblings collapse to
  the ~130 in [best-practices.md](best-practices.md); 28 are convergent (★), found independently by
  two or more repos (an earlier draft of this line said 22 — counted, not estimated, on 2026-09-20). That convergence is the strongest evidence the rules generalize, and the reason
  a workspace-level file is worth keeping.

## 3. Decisions (owner, 2026-09-20) — the eleven questions, answered

Each item keeps the question for the record and states the decision as a 🔒 rule. The actions they
imply are in [open-work.md](open-work.md).

1. **Memory layout** — 🔒 One unified policy for every repo: gitignored pointer `CLAUDE.md` ≤ 5 KB,
   committed `cmem/` with a one-line-per-file INDEX, and **binaryang's cleanup policy is the
   standard** ("working memory, not an archive; git is the archive"; summaries carry commit
   pointers; decisions, DESIGN rows, lessons, triggers and baselines are kept in full). Applies to
   wasmrt, wazmrt, the loaders and rsxtk. Full statement: [memory-conventions.md](archive/memory-conventions-to-2026-11-19.md).
2. **Versioning** — 🔒 Plain Semantic Versioning 2.0.0 in every repo: patch for fixes, minor for
   backward-compatible additions, major for breaks; components unbounded; no carry, ever. Decided
   after two odometer drafts the same day (single-digit, then two-digit with carry), retired
   because a carry-major reads as a break to every caret consumer, and because SemVer is what
   JSR, crates.io, npm, pub.dev, NuGet, Go and Zig all require — "it pulls all of the repos
   together". The major is the break signal; the README Breaking Changes table is the migration
   guide. Retires binaryang's "export removal is a minor" and every cap-at-9 rule.
   Table in [layout-and-packaging.md](layout-and-packaging.md).
   **Addendum, same day — 🔒 the compatibility gate**: backward compatibility is achieved by a
   gate on every bump mechanism, not by judgment: a committed, tool-generated surface snapshot;
   a diff that computes the minimum bump and a script that refuses less; CI re-checking on the
   tag; the previous tag's tests and each consumer's suite run against the new source; deprecate
   before remove; re-baseline in its own commit. Six rules in
   [layout-and-packaging.md](layout-and-packaging.md) § "The compatibility gate".
3. **Release cadence** — 🔒 Each repo releases on its own milestones, when its quality-assurance and
   quality-control gates are satisfied, even when the milestone exists because another repo needs
   it. A sibling's need can create a milestone; it cannot shorten the gate. wasmtk's pause on
   binaryang is therefore the correct posture. (`RELEASE_PAT`, then the one mechanical blocker, was
   closed as not needed 2026-09-29.)
4. **The runtime slot** — 🔒 rsxtk and wasmtk both receive the runtime slot first, for speed of
   executing wasm binaries during development. The universalWasmLoader integration follows once
   the issues that surface there (if any) are identified. The contest is measured where the slot
   is: rsxtk on the native rlib, wasmtk in its cross-runtime gate.
5. **wasmrt and wazmrt** — 🔒 They move in lockstep at 1.0.0 and beyond (**amended 2026-09-21**:
   lockstep from wasmrt reaching 1.0.1 — wazmrt `interop.md:242,268`; wazmrt shipped 1.0.2/1.0.3). The goal before each
   release is to catch as many issues as possible in BOTH; a release of one is preceded by a
   coordination pass and the contract mirror, so neither ships behaviour the other has not seen.
6. **CLI syntax** — 🔒 Any error in the syntax of options or commands throws an error. No attempt
   to interpret a mistyped option or command. This settles the interop contract's open rows in
   favour of erroring: no "looks like" heuristics of any kind (the `--dir` drive-letter heuristic is
   retired), a misplaced position-restricted flag is an error. To be handed to both runtimes
   through the owner, never written into their trees from here.
7. **The loaders** — 🔒 All ten need real tests in the end (v and zig included). **wazero is the
   default engine for `-go`** because it is native Go; the earlier wasmtime-go directive is retired.
8. **rsxtk and lisp-wat_interpreter** — 🔒 rsxtk gets a `cmem/` (it was the first project and never
   had one); created 2026-09-20, committed 2026-10-20 (`de62a6d`, post-purge). lisp-wat_interpreter is a WAT command-line runner /
   REPL in the style of a Scheme interpreter, intended as a **pre-computation stage**: fold compute
   trees whose branches are pure math without recursion, ahead of binaryang's optimization. Not yet
   developed; the owner does not believe binaryang performs this on its own today. ⚠️ Before
   building it, measure whether binaryang's ported binaryen passes (`Precompute` / constant
   folding) already cover the pure-math case; that is a grep of `binaryang/src/binaryen-ts/passes/`
   and one input, not a belief.
9. **Predecessors** — 🔒 wabt-ts and binaryen-ts are reference only, not developed, **not deleted**.
   The nested clones inside wabt-ts stay; they get a stale-snapshot marker rather than removal.
10. **Tooling rules** — 🔒 The hard rules apply workspace-wide, every repo including the loaders:
    committed, repeated-use scripts in the repo language's own scripting mechanism, else
    Bun/TypeScript — one-time deleted scripts may stay shell; a mechanism that builds an executable
    does not count, a JVM `.jar` is allowed (🔒 2026-10-22: so pixi Python, `dart run` and Kotlin
    `.main.kts` qualify; Zig, Go, V, Rust, C and C# use Bun (C# was `.csx` 2026-11-08 → 11-09, C42); a port proves equivalence against its TS original before use — working-rules § Tooling
    rule 1; Deno before 2026-10-12/22), no heredocs, dedicated tools over shell for content, and the
    override of a session's Bash-first default stated once in writing. Reason in the owner's words:
    the same errors "pop up over and over" and cause rework.
11. **Where the convergent rules live** — 🔒 Here, canonically, AND duplicated in every repo, so
    that each repo can be investigated on its own by anyone wanting to use the tools — **open-book
    philosophy**, with the sole exception of personal information, secret keys and passwords, which
    are a security matter and never travel. (🔒 Restated 2026-10-22: "as long as we are not
    displaying secrets in cmem, [committing it] is fine. No secrets or personal information shall
    be made public." — working-rules § Records.) Mechanism: each repo's `best-practices.md` carries the
    ★ block with a "copied from workspace cmem on <date>" stamp; a change here is re-copied, never
    edited in place downstream.
12. **The common IR across languages** (added 2026-09-20) — 🔒 The data trees are different per
    language and stay so. What is shared is the DEFINITION — opcode + immediate table (D1),
    feature list (D2), verdict vocabulary (D3) — and it must be complementarily the same across
    languages: one source, generated copies, a diff check in every consumer's gate. **binaryang is
    the source**, because it has the most integration experience with this already. Mechanism and
    first step in [divergences.md](divergences.md) § "The shared definitions". ✅ Source side
    shipped: binaryang `./definitions` (D1–D3) in 1.9.0, 2026-10-08; consumer copies (H10) not yet.
13. **wasmtk offloads to its siblings** (added 2026-09-20) — 🔒 wasmtk's regex-over-WAT text gives
    way to binaryang's parser when binaryang has converged sufficiently (trigger: one front end,
    stage 5), and more generally "anything wasmtk can offload in the main program will ultimately
    be a benefit". Each candidate is a divergence row with a trigger; nothing moves before its
    trigger. wasmtk files the inventory (letter H11). Rows I2 and I10. 2026-10-22: the stage-5
    trigger fired 2026-09-28; the inventory exists (`wasmtk/cmem/offload-inventory.md`); 🔒 owner
    2026-10-06: `wasmbundle` becomes binaryang's `wasm-bundle`. Nothing has moved yet.
14. **`ts2wasm` in binaryang replaces `wasic` in wasmtk** (added 2026-09-20) — 🔒 wasmtk's
    TypeScript-to-WAT feature becomes binaryang's `ts2wasm`, beside `wasm2ts`, once the wasmtk
    part is sufficiently capable and less buggy; `wasic` is then retired from wasmtk, which calls
    binaryang's `ts2wasm` as it calls the other compat subpaths — "offloading that part also".
    It matures in wasmtk first and moves as modules after the modularization plan, not as a
    monolith. The bar is the owner's; a measurable proposal is on row I11. **⏸️ The full scope of
    `ts2wasm` and `wasm2ts` is a forthcoming piece of work the owner will open once binaryang and
    wasmtk are more stable; it is not to be drafted before then.**
15. **binaryang's fidelity mandate** (added 2026-09-20) — 🔒 binaryang preserves WAT to and from
    wasm with fidelity unless an optimization pass has been made. wasm-tools may not share that
    mandate; where binaryang carries more than an oracle, that is a plus-side divergence in favour
    of fidelity, class DESIGN. The runtimes and producers have no such mandate and target the
    outside reader's canonical encoding. Consequence: portability across the two is solved on the
    consumer side (what a pin hashes), never by removing fidelity. Rows I7, I15 in
    [divergences.md](divergences.md).
