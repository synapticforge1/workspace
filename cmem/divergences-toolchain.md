# divergences-toolchain.md: the IR and the text / binary toolchain (I rows)

Split from divergences.md on 2026-11-19 (memory-guide.md); converged rows are in
[archive/divergences-to-2026-11-19.md](archive/divergences-to-2026-11-19.md). Classes and rules: [divergences.md](divergences.md).

## The IR and the text/binary toolchain

- I1
  - the same thing, implemented in: **The IR inside binaryang**: wabt-ts tree + binaryen-ts tree → "one tree,
    two verb sets, one front end" (readers and writers shared; features separate)
  - class: CONVERGE
  - state (2026-09-20): S1–S7 done, bridge deleted 2026-09-18, one-front-end stages 0–1 done, stage 2 at R15
    (broken WIP on `wip/r15-tree-pass`); stages 3–5 open. Indicator: 56 colliding exported type names.
  - closes with: Stage 5 done: one decoder, one writer, internal `parseWat` retired —
    `binaryang/cmem/ir-convergence.md`.
- I2
  - the same thing, implemented in: **WAT text parser / assembler**: binaryang (wabt-ts front end), wasmrt
    `sexpr`+`wat`, wazmrt `sexpr`+`wat`, lisp-wat_interpreter (own), wasmtk (regexes over WAT text in
    `wasmmerge`/`wasmbundle`/`wasic`), rsxtk (third-party `wat` crate)
  - class: DESIGN + DEFINITION
  - state (2026-09-20): Three first-party parsers in three languages by design (runtimes must read `.wat`
    natively, owner 2026-07-02). wazmrt's `emitter-diff.mjs` over 2,141 spec modules: 2,121 agree with wasmrt,
    20 documented legal shorthands ("compare against 20, not 0"). wasmtk's regexes broke on a backend change
    once (never require a bracketing you did not emit).
  - closes with: DEFINITION: one grammar/production list the three parsers cite by name (see D1). **wasmtk: 🔒
    CONVERGE (owner, 2026-09-20)** — the regex-over-WAT text in `wasmmerge` / `wasmbundle` / `wasic` gives way
    to binaryang's parser **when binaryang has converged sufficiently** (trigger: one-front-end stage 5 — one
    decoder, one writer, internal `parseWat` retired, I1). Until then wasmtk's "never require a bracketing you
    did not emit" invariant stands; after, it retires with the regexes. **2026-10-22: the trigger FIRED** —
    binaryang stage 5 landed 2026-09-28 (`824a4b435`, `parseWat` deleted); wasmtk has not scheduled the move
    (it is fixing compiler bugs first, owner 2026-10-22).
- I3
  - the same thing, implemented in: **Binary decoder**: binaryang (two, converging under I1), wasmrt
    `module`/`opcode`, wazmrt `Reader`/`Module`/`opcode`
  - class: DESIGN + DEFINITION
  - state (2026-09-20): Each has paid separately for "one reader per grammar production" and "a value read and
    discarded is a decision". wasmrt's day-5 review found eight decoder defects the suite could not see;
    wazmrt's equivalents UNMEASURED.
  - closes with: D1 (shared opcode/immediate table); a differential decode over the spec corpus + `wasm-tools
    smith` output across all three, run as a gate somewhere.
- I4
  - the same thing, implemented in: **Validator**: binaryang (wabt-ts), wasmrt `validate`, wazmrt `validate`
  - class: DESIGN
  - state (2026-09-20): wasmrt's day-6 review found eight, two of them wrong answers that EXECUTED (reftype
    read as valtype; table64 index truncation). Whether wazmrt or binaryang share either: UNMEASURED.
  - closes with: Run wasmrt's three committed sweeps (`feature-gate-sweep`, `index-type-sweep`,
    `differential-fuzz`) against the other two; file DEFECT rows for what differs.
- I5
  - the same thing, implemented in: **Opcode table**: binaryang (wabt-ts table + `gen_simd_opcode_table.ts`),
    wasmrt `opcode` (`Op` u16, `Op::ALL` pinned by count), wazmrt `opcode.zig`
  - class: DEFINITION
  - state (2026-09-20): Three hand-maintained tables. wasmrt found 20 unassigned SIMD sub-opcodes accepted and
    eight saturating-truncation opcodes emitted as illegal bytes; each table's holes are its own. UNMEASURED
    whether the three agree on membership. **wazmrt MEASURED 2026-10-23 (letter H10, from the wazmrt
    session):** against a generated copy of D1 (binaryang 1.15.0, 582, hash-verified), wazmrt's decoder knows
    exactly D1's opcodes in both directions, every D1 mnemonic assembles to D1's encoding, and every default
    alignment is D1's natural width. Both are tests on wazmrt's `zig build test`, each inverted. The hand
    tables are not yet REPLACED by the copy (stage B).
  - closes with: D1.
- I6
  - the same thing, implemented in: **Feature / proposal flag list**: binaryang features, wasmrt `Feature`
    (18, spelled three times, header-parsed test), wazmrt `features.zig`, wasmtk's runner per-file feature
    sets
  - class: DEFINITION + CONTRACT
  - state (2026-09-20): wasmrt: 15 members had none of three new proposals until X3 made the gate a track
    deliverable; gated at one entry point of two, four times. Names across the three repos UNMEASURED.
    `--features` spelling is in the runtime contract. **wazmrt MEASURED 2026-10-23 (letter H10): the
    vocabularies differ BY DESIGN.** D2 (binaryang 1.15.0) is 22 wabt-style names (`mutableGlobals`,
    `annotations`, `codeMetadata`, `compactImports`; no `floats`, `gc-types`, `legacy-exceptions`,
    `bulk-memory-opt`, `call-indirect-overlong`). wazmrt's 25 bits follow wasm-tools' vocabulary AND semantics
    (🔒 owner 2026-09-21, contract v30). So D1's `feature` column also disagrees with wazmrt's gating on
    purpose: under wasm-tools, `memory.copy` is `bulk-memory-opt` where D1 says `bulkMemory`, legacy `try` is
    `legacy-exceptions` where D1 says `exceptions`, and float ops are `floats` where D1 says core. 🗓️ OWNER:
    "a check that each repo's list equals D2" cannot hold without reopening the 2026-09-21 decision. The
    alternatives: D2 grows wasm-tools' names (a letter to binaryang), or the row becomes DESIGN with a
    mapping. 🔒 **DECIDED, owner 2026-10-23: "we need to align with binaryang not wasm-tools."** The
    2026-09-21 wasm-tools decision is reversed, and D2 is the vocabulary. wazmrt's change is breaking
    (`--features` names, the C ABI feature enum, contract v30's row, which binds wasmrt too), so its shape
    (drop or alias the wasm-tools-only names; timing against binaryang FL1) is being scoped with the owner in
    wazmrt `cmem/open-work.md`.
  - closes with: D2 (one feature-name list); a check that each repo's list equals it; the runtimes' CLI
    spellings via the contract. | D2 (one feature-name list); a check that each repo's list equals it; the
    runtimes' CLI spellings via the contract.
- I7
  - the same thing, implemented in: **Name section emission** across the three assemblers
  - class: DEFECT → **CLOSED between the runtimes; OPEN between runtimes and binaryang**
  - state (2026-09-20): ⚠️ This row was first filed from wasmrt's record, which was stale: wazmrt closed Z4 on
    2026-09-20 (contract v22, `1bfdc6f5`; three causes — name section, data-count rule, import interning
    order; 954/954 digests agree), and wasmrt's copy is ⏳ pending mirror. **Measured here 2026-09-20 over 532
    `.wat` files (528 assembled by all three)**: wasmrt = wazmrt **528/528 byte-identical**. All three emit
    `name`; the runtimes follow wasm-tools' shape (omit the section when nothing is bound: 525/528; only named
    locals; no import params), binaryang follows upstream wabt's (`--debug-names` shape, section always:
    528/528; every function listed) PLUS labels and GC field names (its N2 FEATURE). Result: binaryang's
    `name` section differs from wasm-tools' on 478/528 files and from the runtimes' on the same. Scripts:
    `tools/assembler-parity/`. **Re-measured 2026-10-22** (605 files at wasmtk `a9df1a0b38a`, all tools
    `--enable-all`): the runtimes are NO LONGER identical to each other — wazmrt = wasm-tools byte for byte
    603/603, wasmrt differs (I12–I14 — **fixed by wasmrt 2026-10-23, its own `scripts/body-parity.ts` 603/603,
    H13 closed 2026-10-26; the workspace harness holds a STALE wasmrt build, so I12–I14 close here only after
    a re-run of `measure.ts` with a rebuilt wasmrt**); binaryang writes `name` on 603/603 vs wasm-tools 600,
    with the same 3 identifier-less files as before; binaryang bodies = wasm-tools 603/603. 🔒 **Owner,
    2026-09-20: binaryang has a MANDATE for fidelity of WAT to and from wasm unless an optimization pass has
    been made.** wasm-tools may not share it; where binaryang carries more than wasm-tools, that is a
    plus-side divergence in favour of fidelity, not a defect. So binaryang's shape is **DESIGN** (its N1/N2/G4
    decisions stand); the runtimes are executors with no fidelity mandate and correctly follow wasm-tools.
    Precision: wasm-tools DOES write labels and field names (binaryang measured 406/406 label parity
    2026-09-11); the residual gap is G4 (field names inside `rec` groups, which functions the local subsection
    lists) plus wabt's always-write-the-section habit.
  - closes with: The row is not "who conforms" but **how a `.wat` pin stays portable between a fidelity tool
    and two executors**. 🗓️ OWNER, with a recommendation: define the `.wat` pin digest over the module with
    custom sections STRIPPED (the body all three will share once I12–I14 close), or over `.wasm` bytes only;
    either keeps binaryang's fidelity extras and the runtimes' portability. The interop contract's "hash the
    assembled bytes" row would change to "hash the assembled body".
- I12
  - the same thing, implemented in: **Local-declaration encoding**: the runtimes write one `(count=1, type)`
    entry per local; wasm-tools, upstream wabt and binaryang compress consecutive same-type locals into runs
    (`01 03 7f` vs `03 01 7f 01 7f 01 7f`)
  - class: DEFECT — **CLOSED in wazmrt** (`9aee871d1`, 2026-09-21); **OPEN in wasmrt**
  - state (2026-09-20): **2026-10-22** (605 files, wasmtk `a9df1a0b38a`): wazmrt bodies = wasm-tools 603/603;
    wasmrt differs on **539/603**, regrouping its locals fixes **533**; wasmrt output +1.71 % (92,545 B over
    5,399,030; the % fell with the corpus mix, not a wasmrt change — no engine commit since 2026-09-20).
    Measured 2026-09-20: module bodies (custom sections stripped) differ between the runtimes and wasm-tools
    on **464/528** files; regrouping the runtimes' locals makes **460** of them byte-identical. Cost: the
    runtimes' output is **+3.01 %** (138,727 B over 4,615,999) larger than wasm-tools' over the corpus. Valid
    encoding, identical semantics, invisible to `wasm-tools print` — which is why four green gates in three
    repos never saw it. wazmrt's Z4 gate was digest equality with wasmrt, so it converged on wasmrt's
    encoding, not the canonical one (best-practices 3.2).
  - closes with: Both runtimes emit runs; proposed gate = bodies byte-identical to `wasm-tools parse` output
    with customs stripped, over the corpus, inverted once. ⏸️ Owner 2026-09-20: the body rule is decided only
    AFTER binaryang's fidelity divergence from wasm-tools is measured section by section
    ([open-work.md](open-work.md)); the letter (H13) stands as information, not as an instruction to change.
- I13
  - the same thing, implemented in: **Export order**: the runtimes emit exports grouped by kind (functions
    first, then memories …); the source, wasm-tools, wabt and binaryang keep source order
  - class: DEFECT — CLOSED in wazmrt (`9aee871d1`); OPEN in wasmrt
  - state (2026-09-20): 2026-10-22: wasmrt still on the same 2 files. Measured 2026-09-20: 2/528 corpus files
    (`sieveOfEratosthenes_wat_mod.wat`, `memory-multiple.wat`) — the only ones whose source lists a memory
    export before a function export. Not cosmetic: `WebAssembly.Module.exports()` and every loader's export
    listing return section order.
  - closes with: Emit in source order; gate as I12. Letter H13.
- I14
  - the same thing, implemented in: **Implicit type interning order** (second instance): a tag's implicit
    `(func)` type and a block's implicit multi-value type land in swapped indices between the runtimes and
    wasm-tools
  - class: DEFECT — CLOSED in wazmrt (`9aee871d1`: types interned function by function); OPEN in wasmrt
  - state (2026-09-20): 2026-10-22: wasmrt on **4** files — the 2 below plus `15_FinallyOnEveryExit.wat`,
    `24_NullableStringFields.wat` (multi-value `(result i32 i32)` interned last instead of at first use;
    `tools/assembler-parity/diag-new2-2026-10-22.out`). Measured 2026-09-20: 2/528 files (`15_Exceptions.wat`,
    `15_TestCase1-NestedEscalation.wat`), types 13 and 14 swapped. Same class as wazmrt's Z4 cause 3 (imports
    vs tags), a different pair. Semantically identical, byte-different.
  - closes with: Intern in wasm-tools' order for every implicit-type site (a table of sites, not a fix per
    site); gate as I12. Letter H13.
- I15
  - the same thing, implemented in: **`binaryang.text-form` custom section** written by binaryang's `wat2wasm`
    by default (S7 per-instruction text form for fidelity); `--no-text-form` gives "upstream wat2wasm bytes
    exactly"
  - class: DESIGN (🔒 the fidelity mandate, owner 2026-09-20)
  - state (2026-09-20): **2026-10-22**: on **225/603** files, +23,952 B over 3,463,986 (**+0.7 %**, down from
    +1.6 %). Measured 2026-09-20: present on **190/528** files, +52,958 B over 3,213,463 (+1.6 %). No other
    assembler writes it; it is the one fidelity fact (folded vs linear spelling per instruction) no other tool
    preserves, so it is the clearest plus-side divergence. A pin computed from binaryang's default bytes
    differs from the runtimes' on those 190 files even once I12–I14 close.
  - closes with: Keep it. Portability is solved on the pin side (I7's recommendation: digest the body, not the
    bytes), not by turning fidelity off. 🗓️ OWNER confirms; `--no-text-form` stays as the "upstream bytes
    exactly" mode for comparisons.
- I16
  - the same thing, implemented in: **The workspace harness itself**: upstream `wat2wasm` 1.0.41 was run
    without `--enable-all`, so it refused 33 files (21 "tag not allowed", 8 GC) the others accept.
    **2026-10-22: binaryang too** — its `wat2wasm` validates against upstream's DEFAULT features since 1.8.0
    (`9c540fa92`, DG5, by design), so a default run refused 93/605.
  - class: ORACLE GAP (mine) — fixed in the harness 2026-10-22
  - state (2026-09-20): `measure.ts` now passes `--enable-all` to wabt and binaryang. Then: binaryang 603/603
    (bodies = wasm-tools); wabt 597/605 (6 GC refusals), but its bodies differ from wasm-tools on **514/597**
    because `--enable-all` turns on the **compact-imports** encoding (import section `00 7f` form, e.g. 0x46 →
    0x32 bytes) — an oracle artifact, not a finding.
  - closes with: wasm-tools stays the body oracle. Compare wabt with `--enable-all --disable-compact-imports`
    if its body column is ever needed (flag spelling UNVERIFIED). Default-features run kept in
    `full-defaults-2026-10-22*`.
- I10
  - the same thing, implemented in: **What wasmtk's main program does that a sibling could own**: WAT text
    handling (I2); `wasmmerge` (binaryen has `wasm-merge`; binaryen-ts scoped it OUT "→ wasmtk bundler" — a
    DESIGN row on their side that this decision may re-open); validation before assembly; the `.wast` runner
    (C1); the WASI/engine shims in `rt.ts`
  - class: CONVERGE (principle)
  - state (2026-09-20): 🔒 Owner 2026-09-20: "anything wasmtk can offload in the main program will ultimately
    be a benefit." Inventory UNMEASURED; the `wasic-modularization-plan.md` decomposition is the in-repo half
    of the same intent.
  - closes with: wasmtk files the inventory (letter H11); each candidate becomes its own row with a trigger;
    nothing moves before its trigger (binaryang convergence, a runtime slot, a published subpath).
- I11
  - the same thing, implemented in: **TypeScript ⇄ wasm**: wasmtk `wasic` (TS → WAT, 19.7K-line monolith, the
    centre of wasmtk's development) and binaryang's `wasm2ts` (wasm → TS, a stub, blocked on wasmtk)
  - class: CONVERGE
  - state (2026-09-20): 🔒 Owner 2026-09-20: wasmtk's TS-to-WAT feature "will be a part of the binaryang
    wasm2ts feature once the wasmtk part is sufficiently capable and less buggy." Read as: binaryang becomes
    the home of the TS ⇄ wasm pair; `wasic` is the forward half and matures in wasmtk FIRST. wabt-ts's
    original vision said the same ("compile pure-compute wasmtk modules to WebAssembly, using `wasm2ts` output
    as the TypeScript-side integration layer").
  - closes with: Trigger, measurable, 🗓️ OWNER sets the bar: (a) `wasic-modularization-plan.md` complete — a
    monolith is moved as modules, not as a file; (b) every wasic suite green on every engine in the
    cross-check gate; (c) no open `compiler-bugs.md` entry of the silent-wrong class; (d) binaryang's one
    front end done (I1), since wasic emits what that front end reads. Then wasic's code becomes binaryang's
    **`./ts2wasm`** (beside `./wasm2ts`), and **`wasic` is retired from wasmtk** — wasmtk's `wasic` command
    calls binaryang's `ts2wasm` the way it already calls `compat/wabt` and `compat/binaryen`. 🔒 Owner
    2026-09-20: "ts2wasm in binaryang taking the place of wasic in wasmtk and therefore offloading that part
    also." **⏸️ The scope of `ts2wasm` + `wasm2ts` is deliberately NOT written yet** (owner: "a whole scope to
    be developed … forthcoming once binaryang and wasmtk are more stable"). Nobody drafts it before the owner
    opens it; what exists until then is the direction above, the reserved subpath, and the maturity bar.
    Stability, as their own memories define it: binaryang's one front end done and its open defects closed;
    wasmtk unpaused, modularization done, suites green on every engine.
- I17
  - the same thing, implemented in: **TypeScript-syntax source, two compilers**: wasmtk `wasic` (TS → WAT /
    wasm; to become binaryang's `./ts2wasm`, I11) and zailc's **zail** (🔒 owner 2026-11-05: "zail
    grammar/syntax will be typescript syntax"; compiled by Zig to Fil-C-safe native code, WebAssembly a LATER
    target after its five stages)
  - class: UNMEASURED
  - state (2026-09-20): (filed 2026-11-05 from zailc's `design-decisions.md`, local `main` `f951159`,
    unpushed) Both pick a numeric model for the same syntax, independently: wasmtk 🔒 2026-10-26 `number` =
    f64, `bigint` = i64, integers by inference only, no type hints; zail 2026-10-27 `number` = f64, i64
    indexes, its own division operators. Strings: zail immutable through a builder (🗓️ open there). They
    agree on `number` today; nothing ties the rest. Not one implementation forked — two front ends for the
    owner's one syntax.
  - closes with: 🗓️ OWNER: do zail and wasic share ONE definition of the TS subset's semantics (numbers,
    integers, indexes, division, strings)? Yes → a DEFINITION row with one owner and copies diff-checked (as
    D1–D3); no → DESIGN, the reason recorded in both repos. Until then each records the other's choice before
    changing its own.
- I9
  - the same thing, implemented in: **Constant folding / pre-computation**: binaryang's ported binaryen passes
    (`Precompute` and kin, if ported), the planned lisp-wat_interpreter pre-computation stage
  - class: CONVERGE (planned)
  - state (2026-09-20): Owner intends lisp-wat as a pre-pass that folds pure-math, non-recursive subtrees
    before binaryang. Whether binaryang already does this: UNMEASURED — one grep of
    `binaryang/src/binaryen-ts/passes/` and one input.
  - closes with: Measurement first; then either "binaryang does it, lisp-wat is a REPL only" or a defined
    hand-off format between them.

