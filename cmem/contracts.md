# contracts.md — what crosses repo boundaries

Each contract names its owner (the repo that holds the pen), its consumers, and where the
authoritative text lives. Compiled 2026-09-20.

## 1. WIT naming and the Canonical ABI (owner: wasmtk; consumers: all ten loaders)

Authoritative: `universalWasmLoader-js/SPEC.md` 3.0.0 (+ §10, 2026-06-15), `VISION.md`,
`PORT_PROMPT.md`; the emitting code is `wasmtk/src/wasic.ts` (`toKebabCase`) and `src/bindgen.ts`.

- **Three names per function, and the invariant every port has been bitten by:**

  | form       | example       | used for                                              |
  | ---------- | ------------- | ----------------------------------------------------- |
  | kebab      | `is-positive` | WIT source identity                                   |
  | camelCase  | `isPositive`  | **the actual WASM export name** (bindgen camelizes)   |
  | idiomatic  | `is_positive` | the language's public API key (snake in Rust/Python)  |

  Never look up an export by kebab or snake. Imports: `env-mul` → WASM key `env_mul`, user
  callback key `envMul`. The kebab round trip is LOSSY for capital-heavy names (`parseHTML` →
  `parse-html` → `parseHtml`), so generated loaders resolve exports at load time by kebab-normalised
  comparison.
- **ABI auto-detected, never exposed**: `cabi_realloc` exported → Canonical; `__malloc` → legacy
  wasic. String params: `cabi_realloc(0,0,1,len)` → write → `(ptr,len)`. **String returns (3.0.0,
  breaking vs 2.x)**: callee-allocated `[ptr,len]` pair, read little-endian, **copy out before**
  calling `cabi_post_<camelName>(retArea)` when exported. Bool `0/1` in, `!= 0` out.
- **§10 producer model**: call `_initialize` once if exported; always attach a minimal WASI-P1 shim;
  never feed `_start` command modules to a loader; unbound non-WASI imports become traps/no-ops.
- **Host imports read memory at call time** from the caller context; never pre-capture.
- **Zero configuration**: path + flat camelCase callbacks; `@N` version pin = integer checked
  against an exported i32 `version` global; `createSingleton` / `InstancePool` minimal signatures.
- **Output is a P1 core module + sidecar `.wit`, not a component**; P2 producer PARKED until
  browsers load components natively. Cross-language MERGE is impossible except allocation-free
  leaves; cross-language inclusion = `instance` behind WIT.
- **Fixtures** `math_50` / `booleans_50` / `strings_50` / `imports_50` (+ `init_check`, `wasi_io_50`)
  are byte-identical in c/dotnet/go/js/rs/jvm; **dart's differ (3 of 4), jvm's `imports_50.wit`
  differs, py uses its own** — see [drift-register.md](drift-register.md).

## 2. The backend pin (owner: binaryang; consumer: wasmtk)

- wasmtk imports `jsr:@jrmarcum/binaryang@1.13.0` on `/compat/wabt`, `/compat/binaryen` (alias
  `binaryen-backend`) and `/wasm-validate`, exact, one version (wasmtk `deno.json:44-47`,
  `406b173a2d6`, 2026-10-20; binaryang's latest is 1.14.0, 2026-10-22, letter § 40 to wasmtk drafted
  in binaryang, unsent). wasmtk PARSES binaryang's output text, so a caret let 1.4.0 in by
  `--reload` and 156 files went off baseline.
- binaryang publishes to TWO registries since 1.13.x: JSR `@jrmarcum/binaryang` (source of truth)
  and npm `@synapticforge1/binaryang`, both with provenance from 1.13.3.
- binaryang's `compat/` facades mirror `npm:wabt` and `npm:binaryen` so wasmtk changes one import
  line; `/compat/*` and `/interop/*` are the only places bare upstream names may appear.
- Co-development: wasmtk's gitignored `upstream/binaryang` clone builds as `wasmtk-upstream`, never
  `wasmtk`; a result from it is never evidence for a decision. Bug reports live at
  `wasmtk/scripts/binaryang-report.md`; binaryang answers through `cmem/handoffs.md`.
- **Release arming is one-directional**: the 2026-09-20 pause on binaryang's parser-leniency fixes
  ended with binaryang 1.6.0–1.8.1 (2026-09-28/30); wasmtk has since moved its pin seven times.
  binaryang's rule is that a bump is never incidental. 🔒 Owner 2026-09-20: each repo releases on its own milestones when its
  QA/QC gates pass, even when the milestone exists because the other repo needs it — so wasmtk's
  need creates a binaryang milestone, and binaryang's gate decides the date.
- binaryang's deprecations still pending for wasmtk to absorb: `./binary` and `./encoder` subpaths
  unpublished at the next bump (decided), `MinifyImportsAndExports` opt-in only, export names
  inviolable.

## 3. The spec testsuite corpus (owner: wasmtk; consumers: wasmrt, wazmrt, binaryang)

- Vendored verbatim at `wasmtk/tests/module/wasm_wast/testsuite-main/`, synced 2026-08-20 to
  `65a43d2e…`; re-sync = tarball + `cp -r` + measure PER FILE; `proposals/threads/` is frozen
  upstream, not stale here.
- Runtimes reference it by absolute path, read-only (the path is a machine fact → `local/`).
  binaryang rebuilds a per-session scratch copy (`spec:prepare`).
- **Vendored patch**: two owner-directed `;; ⚠️ VENDORED PATCH` blocks in
  `proposals/threads/{imports,memory}.wast` (3 × "multiple tables", 3 × "i32 constant out of range"),
  designed to be overwritten by the next sync; the 5 × "multiple memories" were RESTORED because the
  live proposal carries them, and wasmrt answers them by running `proposals/threads/` with
  multi-memory OFF ("a snapshot must not be given features that postdate it"). **Re-check after
  every sync. The two runtimes' corpora differ by this patch today.**
- Per-file feature sets (`wast::features_for_script`) because core and proposal `br_on_cast.wast`
  contradict each other.
- Baselines: wasmtk `tests/wast_baseline.json` — **288 files, 64,506 passing, 0 failures, 16
  skipped, 0 files pinned** ("ALL CLEAN", wasmtk `testing.md:829`, 2026-09-30; the 100 pinned
  GC/ref-type failures of 2026-09-20 are gone); wasmrt and wazmrt at zero failed / zero skipped / zero unrun with an
  EMPTY baseline file.

## 4. Runtime interop (owner: wazmrt holds the pen; party: wasmrt)

Authoritative: `wazmrt/cmem/interop.md` (CONTRACT VERSION **31**, 2026-10-23 — v31 only remaps wasmrt's commit ids after its history rewrite, no row changes meaning; v30 2026-09-21); wasmrt's copy at
v10, twenty versions ⏳ PENDING MIRROR (re-read 2026-10-22; wasmrt has made no engine change since
2026-09-20). 🔒 Owner 2026-09-21 (wazmrt `interop.md:242,268`): the lockstep point moved from 1.0.0
to **wasmrt reaching 1.0.1**. Kept byte-identical on both sides in principle; neither side writes the
other's copy, so a mismatch is an in-flight state.

- **In scope**: CLI options (run modes, flag names/shapes/defaults, exit codes) and security checks
  (pin mechanism + on-disk DB, WASI rights model, resource ceilings). Owner: "If our CLI options are
  the same they are swappable. If our security checks are the same they are also swappable."
- **Out of scope**: C ABI (deliberately different names), internals, **performance and size (what
  they compete on)**, conformance internals, output text — except Z3: no output line may call a
  module valid unless it validated.
- **Status vocabulary**: ✅ AGREED (with evidence) · ⏳ PENDING MIRROR · ⬜ UNVERIFIED · ⚠️ divergent ·
  📎 annex. A disagreement is an observation until traced. Rows are verified by RUNNING both
  binaries, never by reading.
- **Agreed**: both program names kept, everything after the name in sync; run modes additive, each
  accepts the other's spelling (`run`/`wasi`/`wat`/`wast` + bare-path forms); named modes never fall
  back; `-h`/`-v` first arg only; exit 1 for every host failure and trap; unknown flag in a host
  position → `unknown flag`, rc 1; no "looks like" heuristic (owner); after the module path a
  single-dash token is the guest's; `--features <list>` before the module; validity claims match the
  verdict; hash the in-memory bytes about to run, `.wat` hashes the assembled bytes, `.wast` gated;
  pin DB `/etc/wasmtk/pins` · `C:\ProgramData\wasmtk\pins` with per-runtime fallback and a loud
  warning, one hex SHA-256 per line, `# mode: off|warn|enforce`, root-owned, fail-closed; nine-row
  `decide()` matrix; `--dir` separators `:` and `::`; rights `PATH_SYMLINK` bit 24 in the write
  mask, `--dir` = ALL & !PATH_SYMLINK, no implicit cwd; ceilings 1 GiB memory, 1<<27 table elements,
  depth 512, 1<<30 iterations (one back-edge or one tail-call hop).
- **Open** (§5 in wazmrt's copy): who adopts whose spelling by when; the per-kind exit-code table;
  attribution of wasmrt commit `c9c447f3` (`7ce0dcd2` before wasmrt's 2026-10-23 history rewrite; confirmed by the owner 2026-09-20); keygen/sign deferred; one coordination session at a time
  (decided 2026-09-20); regime B has never run.
- 🔒 **Owner 2026-09-20, to be handed to both runtimes (not written into their trees from here):**
  any error in the syntax of options or commands THROWS AN ERROR; no attempt to interpret a
  mistyped option or command. That closes two §5 rows in favour of erroring — the `--dir`
  drive-letter heuristic is retired (it is a "looks like"), and a misplaced position-restricted flag
  is an error (H7 stands). Also: **the two runtimes move in lockstep at 1.0.0 and beyond**; each
  release is preceded by a coordination pass and the contract mirror, so as many issues as possible
  are caught in both before either moves.
- **Known non-portable**: `.wat` pin digests differ 529/535 because wasmrt emits a `name` section
  and wazmrt does not; `.wasm` digests agree. Handed over as Z4.

## 5. Runtime → consumer surfaces (owners: wasmrt, wazmrt; consumers: rsxtk, wasmtk, loaders)

- **rsxtk** takes wasmrt by default through the native `wasmrt-core` rlib (owner); replaces
  `wasmtime` 40 + `wasmtime-wasi`; `wat`/`wasmprinter`/`walrus` stay (toolkit scope). The rlib has
  never been measured; `.cwasm` will not be the default. Nothing in rsxtk records this.
- **wasmtk** has no runtime slot today (executes through `WebAssembly.instantiate`); cheapest
  foothold is the `dync_cross_runtime` RUNTIMES list.
- **Loaders** link the C ABI (`wasmrt.h` / `wazmrt.h`) if at all; today they use `wasmtime_*`
  directly. The C ABI is a per-runtime surface, not a shared contract.
- **Contest criteria** (owner 2026-08-11): smallest and fastest binary, measured same-machine,
  interleaved, in the shipped configuration, against wasm3 / WAMR / each other / wasmtime with its
  fast-start configs included; conformance at zero / zero / zero as the floor.
- 🔒 **Where the slot is (owner 2026-09-20)**: **rsxtk and wasmtk both receive the runtime slot
  first**, for speed of executing wasm binaries during development. The universalWasmLoader
  integration follows once the issues that surface there, if any, are identified. So the first
  real measurements are rsxtk on the native `wasmrt-core` rlib and a runtime in wasmtk's
  `dync_cross_runtime` gate.

## 6. Divergence classification (owner: binaryang; recommended everywhere an upstream exists)

| class      | meaning                                          | what to do                                              |
| ---------- | ------------------------------------------------ | ------------------------------------------------------- |
| FEATURE    | we support what upstream does not                | test against the spec                                   |
| DESIGN     | different on purpose, reason recorded            | keep unless re-decided; never port upstream over it     |
| ORACLE GAP | upstream cannot judge                            | name the authority used instead                         |
| DEFECT     | ours, open until fixed, then kept as history     | pin with upstream's bytes                               |

"A difference is not done until it has a row with a class. 'Valid either way' is not a class."
Malformed and invalid are two verdicts, per oracle, per row.

## 7. Oracles and what each can judge (installed versions in `local/environment.md`)

| oracle                 | judges                                                                   | cannot judge                                  |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| upstream wabt          | text ↔ binary fidelity, `wast2json`                                      | GC text, label and field names                |
| upstream binaryen      | optimizer output, `wasm-as`/`wasm-dis`                                   | `.wast`                                       |
| wasm-tools             | encoding + validity incl. GC text, `json-from-wast`, `smith` for fuzzing | execution                                     |
| wasmtime               | validity AND WASI behaviour — the authority for both                     | custom-descriptors (48 has none)              |
| wasmer, wazero, V8     | engine cross-check; V8 gating a proposal off is not an oracle            | why two engines agree                         |
| the sibling runtime    | a differential check with no privileged oracle (observation ≠ diagnosis) | anything the two learned from each other      |
