# divergences-interfaces.md: conformance and corpora (C rows); interfaces consumers see (S rows)

Split from divergences.md on 2026-11-19 (memory-guide.md); converged rows are in
[archive/divergences-to-2026-11-19.md](archive/divergences-to-2026-11-19.md). Classes and rules: [divergences.md](divergences.md).

## Conformance and corpora

- C1
  - the same thing, implemented in: **`.wast` spec runner**: wasmtk `src/wast.ts`, binaryang spec harness,
    wasmrt `wast`, wazmrt `wast`
  - class: DESIGN
  - state (2026-09-20): Four runners over one corpus. Known reasons they disagree: per-file feature sets
    (wasmrt, because core and proposal `br_on_cast.wast` contradict); wasmtk's `constType()` marshalling gaps
    (+123 assertions once fixed); a single `catch` once satisfied `assert_malformed` from the wrong stage.
    **wazmrt, found 2026-10-23 (letter H10): its runner does not check the trap TEXT.** `assert_trap` passes
    on any genuine runtime trap (`wast.zig` `isRuntimeTrap`), so a wrong-class trap scores as a pass, and
    wazmrt's pass counts are not comparable with a class-checking runner's. Adopting D3 (trap error → class
    key, expected text → class by D3's prefix rule) closes it. It makes the runner stricter, so it waits for
    the owner's go-ahead and a conformance run. ✅ **wazmrt adopted D3 the same day (owner: "start checking
    against binaryang's trap classes").** The first class-checked run read 64,050 / 42 failed: two wrong-trap
    defects in wazmrt (out-of-range truncation trapped as "invalid conversion" instead of "integer overflow",
    35; `ref.get_desc` on a null object trapped as "null descriptor reference" instead of "null reference",
    7), both fixed, back to 288 / 64,092 / 0 / 0 class-checked. ⏳ For binaryang, from wazmrt: a D3 class for
    "expected shared memory" (`atomic.wait` on a non-shared memory, which the spec corpus never asserts).
  - closes with: A per-file comparison table of the four runners' pass/fail/skip on the same corpus SHA, kept
    as a bake-off row; every cell that differs gets a row here.
- C2
  - the same thing, implemented in: **The vendored spec corpus**: wasmtk owns it (SHA `65a43d2e…`,
    2026-08-20); runtimes reference by path; binaryang rebuilds a scratch copy
  - class: CONTRACT
  - state (2026-09-20): Two owner-directed `VENDORED PATCH` blocks in `proposals/threads/`; wasmrt drafted
    four, wasmtk committed two; the runtimes' effective corpora DIFFER by the other two. Designed to be
    overwritten by the next sync.
  - closes with: One patch, in wasmtk, that both runtimes read; re-check after every sync; the "multiple
    memories" question answered by wasmrt's per-snapshot feature rule (multi-memory OFF for `threads/`).
- C3
  - the same thing, implemented in: **Conformance floors**: runtimes at 0 failed / 0 skipped / 0 unrun with an
    EMPTY baseline; wasmtk at 100 pinned GC/ref-type failures across 15 files
  - class: DESIGN
  - state (2026-09-20): Different roles: wasmtk is a producer whose runner marshals through V8; the runtimes
    execute. The 100 are real gaps, visible not masked.
  - closes with: Never closes; the 100 shrink by wasmtk work; a new pinned failure in wasmtk that a runtime
    passes is a C1 row.
- C4
  - the same thing, implemented in: **Independent oracles**: wabt 1.0.41, binaryen 132, wasm-tools 1.259,
    wasmtime 48, wasmer, wazero, V8 — used by every repo with its own recipe
  - class: DEFINITION
  - state (2026-09-20): Each repo records what its oracles can and cannot judge; the table is duplicated in
    three memories. wasmrt's "outside reader is a GATE" (`wat-corpus.ts` ends at `wasm-tools validate`) is the
    strongest form.
  - closes with: The oracle table in [contracts.md](contracts.md) § 7 is canonical; each repo's copy stamped
    from it.

## Interfaces consumers see

- S1
  - the same thing, implemented in: **Runtime CLI + security checks**: wasmrt, wazmrt
  - class: CONTRACT
  - state (2026-09-20): `interop.md` v31 (wazmrt, 2026-10-23) vs v10 (wasmrt), 21 versions pending mirror
    (re-read 2026-10-23); byte-compare gate cannot pass while the copies differ; regime B never ran. 🔒
    2026-09-20: any syntax error throws; 🔒 2026-09-21: lockstep from wasmrt 1.0.1.
  - closes with: The mirror; the check run at each release; the §5 owner calls closed.
- S2
  - the same thing, implemented in: **CLI error behaviour in every repo**: binaryang `main.ts` (7 commands),
    wasmtk `main.ts`, rsxtk (`clap`), the runtimes
  - class: CONTRACT (new)
  - state (2026-09-20): 🔒 Owner 2026-09-20: "an error in syntax of the CLI options or commands throws an
    error; we do not want to attempt to interpret mistyped options/commands." Stated for the runtimes; applies
    to every CLI here. UNMEASURED outside the runtimes (`clap` errors by default; Deno dispatchers
    hand-parse).
  - closes with: A negative test per CLI: an unknown flag and a mistyped command each exit non-zero with an
    error, no fallback.
- S3
  - the same thing, implemented in: **C ABI**: `wasmrt.h` (74 fns, `wasmrt_*`), `wazmrt.h` (77 fns,
    `wazmrt_*`, ABI 2)
  - class: DESIGN
  - state (2026-09-20): Deliberately different names (owner); both wasmtime-SHAPED; loaders today call
    `wasmtime_*` directly, so neither is consumed yet.
  - closes with: Never closes. A loader adopting one must not be written against the other's shape.
- S4
  - the same thing, implemented in: **Canonical ABI + WIT naming**: wasmtk `wasic`/`bindgen` (producer) vs ten
    loader ports (consumers) under `-js/SPEC.md` 3.0.0
  - class: CONTRACT
  - state (2026-09-20): **2026-10-26 (night), measured here: ALL TEN ports hold one fixture set — 11
    `.wasm`/`.wit` files, one SHA-256 set digest `ff3b3ad8b004`, stamped from wasmtk `4a5c3cf668d` by
    loader-js `36aa661` and COPIED (not regenerated: `git describe`'s abbreviation length is clone-dependent,
    -dart found) into -c, -dart, -dotnet, -go, -jvm, -py, -rs, -v, -zig, each with a test that refuses a
    changed or unlisted file.** -jvm dropped its local SPEC copy for a link to -js's; -py pins -js as a
    submodule (at `d9f6860`, stale but SPEC 3.0.0 + §10). Before: dart differed in 3 of 4 `.wasm`, jvm in 7 of
    11 files (not 1 — its own count), py shipped its own; -rs's vendored `abi.js` was 2.x (now fast-forwarded
    to -js `bcab4b4`). `cabi_post` wording difference UNMEASURED still.
  - closes with: Bytes: ✅ closed 2026-10-26. Open: one SPEC text linked everywhere (UNMEASURED in -c, -go,
    -rs, -v, -zig, -dotnet, -dart), and the `cabi_post` wording.
- S5
  - the same thing, implemented in: **WASI preview-1 implementations**: wasmrt `wasi` (sandbox, contract §3),
    wazmrt `wasi`, five hand-rolled loader shims (js, dart, rs, and the SPEC §10 minimum), rsxtk via
    `wasmtime-wasi`
  - class: CONTRACT (runtimes) / DESIGN (loaders)
  - state (2026-09-20): Runtime sandbox semantics are in the contract (rights, symlinks, ceilings). Loader
    shims implement SPEC §10's minimum only. wasmrt's review found a sandbox escape and three guest-sized
    allocations; wazmrt's equivalents UNMEASURED.
  - closes with: Runtimes: contract §3 rows verified by running. Loaders: SPEC §10 conformance test per port.
- S6
  - the same thing, implemented in: **Pin digests**: wasmrt `pin` (own SHA-256, load-once type), wazmrt `pin`
    + `sign`
  - class: CONTRACT
  - state (2026-09-20): Agreed: hash the in-memory bytes about to run; `.wast` gated; DB path and format
    agreed. `.wat` digests differ (I7).
  - closes with: I7.
- S7
  - the same thing, implemented in: **wasmtk as a build dependency**: LeptonPad `package.json` `build:wasm`
    (`deno run … jsr:@jrmarcum/wasmtk modc`) vs wasmtk's release line (2.0.3 published; next 3.0.0, three
    breaking items)
  - class: CONTRACT
  - state (2026-09-20): (2026-10-26) **UNPINNED**: the specifier carried no version and ran with `--no-lock`;
    wasmtk 3.0.0 had already shipped (2026-10-24), and LeptonPad measured that unpinned it was resolving 3.0.0
    (the solver differed by 181 B, a `__heap_ptr` export). **LeptonPad pinned `@2.0.3` the same evening
    (`797a351`): it rebuilds the committed `dist/solver.wasm` byte for byte.** wasmtk's H6.5b consumer check
    names LeptonPad but has never run against it.
  - closes with: LeptonPad's side closed (`797a351`). Open: wasmtk's compatibility gate runs LeptonPad's
    `build:wasm` as a consumer suite before its next 3.x (H6.5b, owner go-ahead).

