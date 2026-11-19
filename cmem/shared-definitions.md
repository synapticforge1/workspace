# shared-definitions.md: the shared definitions D1 / D2 / D3 (owner, 2026-09-20)

Split from divergences.md on 2026-11-19 (memory-guide.md); converged rows are in
[archive/divergences-to-2026-11-19.md](archive/divergences-to-2026-11-19.md). Classes and rules: [divergences.md](divergences.md).

## The shared definitions — 🔒 decided (owner, 2026-09-20)

**The data trees are different per language and stay that way. What is shared is the DEFINITION,
and it must be complementarily the same across languages. binaryang is the source, because it has
the most integration experience with this already.** This is the workspace's "common IR".

- D1
  - definition: **Opcode + immediate table**: for every instruction, its binary encoding (prefix + opcode),
    text mnemonic(s) including legal shorthands, immediate list and encoding of each, operand/result stack
    signature, the feature that gates it, and the spec section.
  - replaces the hand-kept copies in: binaryang's wabt-ts table (+ `gen_simd_opcode_table.ts`), wasmrt
    `opcode` (`Op`/`Imm`/`Instr`), wazmrt `opcode.zig`; wasmtk where it names opcodes.
- D2
  - definition: **Feature / proposal list**: canonical name, CLI spelling, the spec-testsuite directories it
    gates, which proposal snapshots must NOT receive it (the `threads/` rule), and the date it entered the
    list.
  - replaces the hand-kept copies in: binaryang features, wasmrt `Feature` ×3 spellings, wazmrt
    `features.zig`, wasmtk's per-file feature sets, the runtime contract's `--features` row.
- D3
  - definition: **Verdict vocabulary**: the malformed / invalid / unsupported / trap classes, and for each the
    canonical reason key a runner reports, so the four `.wast` runners' results compare by string equality.
  - replaces the hand-kept copies in: each runner's own message strings; binaryang's "two verdicts" rule;
    wasmrt's `Err(Unsupported*)` shapes.

**How it stays the same (the mechanism; every step is a check, not a habit):**

1. **One source file per definition, in binaryang**, machine-readable (JSON), with a schema, a
   content hash, and a version stamp. binaryang's own TS table is the FIRST generated consumer, so
   the source is exercised by the repo that owns it.
2. **Every other repo GENERATES its copy** (a Rust module, a Zig file, a TS module) with a script in
   that repo that reads the source and writes the copy, and **commits the copy** so a clone builds
   without binaryang present. The copy's header carries the source hash and date.
3. **A check in every consumer's gate regenerates and diffs**: copy ≠ regenerated ⇒ fail. That is
   the "one authoritative enumeration" rule made to hold across languages.
4. **Change flows source → copies, never the other way.** A runtime that needs a new opcode files a
   row here and a letter to binaryang; the source changes; the copies regenerate. Editing a copy by
   hand is a DEFECT.
5. **Delivery is a pull.** binaryang publishes the source (a `./definitions` subpath on JSR is the
   natural surface; the raw files in its repo are the fallback); consumers fetch at a pinned hash.
   Nothing is written into a sibling from binaryang.
6. **The definitions are a surface** under the compatibility gate: removing or renaming an entry is
   a major for binaryang; adding is a minor.

**Exit conditions rewritten by this decision**: I5 closes when the three opcode tables are generated
from D1 and each repo's diff check has been inverted once; I6 when the three feature lists and
wasmtk's runner read D2; C1's comparison table is built on D3; I2's three parsers cite D1's
mnemonic and immediate columns by name.

**First step (binaryang, letter H9)**: produce D1's schema and populate it from the wabt-ts table;
prove it by regenerating binaryang's own table from it and diffing zero. Then D2 from its feature
flags plus wasmtk's per-file sets. D3 last — it needs one runner comparison (C1) to name the
classes that actually occur.
