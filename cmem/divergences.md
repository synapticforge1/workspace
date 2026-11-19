# divergences.md — the cross-project divergence register

🔒 **Owner, 2026-09-20: this memory holds the reins on divergence between projects**, so that a
difference between two repos does not become a long-term problem that never needed solving. The
rule is binaryang's, lifted one level: **a difference between two repos is not done until it has a
row here with a class.** "Both work" is not a class.

This file is the one memory that a session in ANY repo may write to (the sibling-boundary rule
covers repos, not this ledger). A row is filed by whoever finds the difference, in the same session,
with what was measured and what was not. Closing a row means the class's exit condition was met and
the commit that met it is named.

## Classes

- COMPETE
  - meaning: Deliberately separate implementations; the difference IS the point (size, speed, design).
  - exit condition: Never closes. But observable BEHAVIOUR must agree: a behaviour difference under COMPETE is
    a DEFECT row.
- CONTRACT
  - meaning: Separate implementations that must behave identically, kept so by a written contract AND a check
    that runs both.
  - exit condition: Closes only if the surface is retired. A contract with no running check is a preference.
- CONVERGE
  - meaning: The same thing implemented twice where one should exist. Owner names the survivor and the target
    date.
  - exit condition: The second implementation is deleted; `git show` pointer recorded.
- DEFINITION
  - meaning: Code cannot be shared across languages, but the DEFINITION can: one generated table or schema
    from which each language's copy is produced.
  - exit condition: Every consumer's copy is generated, and a check proves it matches the source.
- DEFECT
  - meaning: An unintended difference. Open until fixed; kept as history with the commit.
  - exit condition: Fixed, pinned by a test in the repo that was wrong.
- DESIGN
  - meaning: Different on purpose, reason recorded, both stay.
  - exit condition: Never closes; re-decided only by the owner. Read before "matching the sibling".

🔒 **Standing DESIGN principle (owner, 2026-09-20): binaryang has a mandate for fidelity of WAT to
and from wasm unless an optimization pass has been made.** Where binaryang preserves more than an
oracle does (wasm-tools may not share the mandate), that is a plus-side divergence in favour of
fidelity — class DESIGN, never DEFECT. The runtimes and wasmtk's producers have no such mandate;
for them the outside reader's canonical encoding is the target. A row that pits binaryang's extra
fidelity against another tool's bytes is resolved on the CONSUMER side (what a pin or a comparison
hashes), not by removing the fidelity.

Every row: id · what is implemented where · class · measured or UNMEASURED · what closes it.
Numbers carry dates; a row's premise is re-derived before acting on it.

## Where the rows are

- [divergences-toolchain.md](divergences-toolchain.md): the IR and the text / binary toolchain (I rows)
- [divergences-interfaces.md](divergences-interfaces.md): conformance and corpora (C), interfaces (S)
- [divergences-process.md](divergences-process.md): process and memory (P)
- [shared-definitions.md](shared-definitions.md): the shared definitions D1 / D2 / D3
- Converged rows: [archive/divergences-to-2026-11-19.md](archive/divergences-to-2026-11-19.md)

## Rules for this register

- **File before you finish.** A session that finds a cross-repo difference files the row in the
  same session, class UNMEASURED if that is the truth, and points at it from its own repo's memory.
- **Measure before you class.** A row's premise is not evidence (binaryang A1 was filed DEFECT and
  was DESIGN). COMPETE rows still require behaviour agreement; a behaviour difference is always a
  DEFECT row of its own.
- **Read DESIGN rows before "matching the sibling".** A faithful copy can silently undo a decision.
- **A row without an exit condition is a note, not a row.**
- **Closing a row names the commit** in the repo that changed, and the row stays as one line of
  history with the `git show` pointer.
