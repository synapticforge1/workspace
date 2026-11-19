# best-practices.md — the rules paid for, compiled across the siblings

METHOD, not findings. Each rule: one bold sentence, the incident that bought it (one clause), and
the origin tag. **★ = convergent**: two or more repos derived it without reading each other; both
origin stories are the evidence. `[a → b]` = imported from a into b. Section numbers are stable;
append with the next free number, never reuse one. Compiled 2026-09-20; citations name the sibling
file and heading so the full incident can be read there.

Index: §1 Evidence and measurement · §2 Gates and tests · §3 Producer/consumer pairs and oracles ·
§4 Where defects hide · §5 Investigating · §6 Recording and claims · §7 Tooling that lies ·
§8 Working across repos.

Sections 5 to 8 are in [best-practices-5-8.md](best-practices-5-8.md) (split 2026-11-19 for the 25 KB limit; no rule
changed, every number the same). A reference to "best-practices 7.21" means rule 7.21 there.

## §1 Evidence and measurement

- **1.1 ★ An exit code is not evidence; diff the OUTPUT counts, per file.** Exit-0 runs silently
  dropped passes in four repos; binaryen-ts's serious defects were valid wasm with the wrong value;
  wabt-ts's `wat2wasm` silently deleted an instruction. [wabt-ts + binaryen-ts + wazmrt + wasmtk + wasmrt]
- **1.2 ★ A green suite is evidence about the tests, not the code.** The fuzzer had zero `makeLoad`
  / `makeBreak`; `deno test tests/` collected 513 of 908 and exited 0. [binaryen-ts + wabt-ts]
- **1.3 ★ Re-derive before quoting any number; a count in prose is a dated claim.** Counts were
  cited eight days stale; artifacts doubled while "smallest binary" was the goal; three commit
  messages contradicted their own diffs. [every repo]
- **1.4 ★ When the corpus can move, the denominator is a measurement, and a comparison must print
  it.** The failure total matched on both sides by coincidence after +4 files; four totals were
  computed over zero modules because `--enable-all` is not a `wasm-opt` flag. [wasmrt + binaryang]
- **1.5 Skips are not passes: read the skip column to RANK, the failure column to FIX, and the
  file-error count before calling "0 / 0" complete.** `i31.wast` 0/6/66; a `ref_null` skip fix moved
  the corpus +9,264; "0 failed / 0 skipped" hid files that never loaded. [wazmrt → wasmtk + wasmrt]
- **1.6 A parse-success count is an upper bound, and a fixed failure can unmask another — diff
  per-file outcomes, not totals.** 230 parse-clean vs 180 engine-valid; a memo key regressed
  `imports.wast` while the target files improved. [wabt-ts + wazmrt + binaryang]
- **1.7 Measure the artifact the consumer uses.** Every recorded size figure was for an artifact
  rsxtk does not link; the shipped cdylib was 2.6× the measured one until the `rlib` was found
  defeating LTO. [wasmrt]
- **1.8 A size measurement cannot answer a correctness question; an invalid module has a size
  too.** [binaryang]
- **1.9 Benchmarks: interleave A/B/A, measure the floor first, report the difference not the ratio,
  name the configuration including WHERE, and never pick the favourable run.** A sequential A/B on a
  loaded machine is not a measurement; the rlib embeds paths so size varies by directory. [wasmrt + wazmrt]
- **1.10 A comparison is evidence, never a target; a bake-off row is value + date + configuration
  and is never DONE.** Never quote a competitor's number as yours. [wasmrt + wazmrt]
- **1.11 ★ Validate the harness against a known positive; an extreme number is evidence about the
  harness, and a broken harness can score BETTER.** 1937/1937 failing; give it an input it must
  fail on. [wabt-ts + binaryen-ts]
- **1.12 Coverage of inputs is a separate axis from strictness of comparison; the proposals your
  corpus lacks are your blind spot.** A 421-file byte-identical baseline was unchanged by six
  defects because the corpus had no ref types; no atomics in 257 files hid two bugs. [binaryang → wasmtk; wabt-ts]
- **1.13 A gate is evidence about what it REACHES — before trusting it for a feature, find an input
  in it that has the feature.** No corpus module had a `(start …)`, so dropping the start function
  left both direct gates green. [binaryang + wasmrt]
- **1.14 A metric that counts one direction is blind to the other, structurally; each metric was
  blind to bugs the others caught.** Validator agreement counted false rejects only; twelve false
  accepts sat under seven green metrics until a hand-built INVALID corpus. [wabt-ts]
- **1.15 A logged cost, a scope note, and a predicted fix cost are hypotheses; re-measure before
  paying.** "L, lifetime redesign" was a `;` loop; `br_table` logged 161 delivered 6. [wasmrt + wasmtk]
- **1.16 A pinned or documented count must RATCHET, not cap.** Stale `TupleExtract` entry;
  `PHANTOM_BUDGET` in the operators gate. [binaryang]
- **1.17 Pass every tool's configuration explicitly in a cross-tool comparison; a default is a
  moving part.** Between two parity runs binaryang's `wat2wasm` narrowed to upstream's default
  features (refused 93/605), and upstream wabt's `--enable-all` turned on compact imports (bodies
  "differ" on 514/597) — both read as findings until diagnosed. Fingerprint the input set too: the
  corpus was mostly gitignored build output and grew 532 → 605 unannounced. [workspace, 2026-10-22]

## §2 Gates and tests

- **2.1 ★ A new test that has never failed has not been shown to test anything: invert it and
  watch it fail for the RIGHT reason.** A baseline probe appended a WAT comment and could not fire;
  deleting the release guard left twelve tests green; a mutant caught by a different check is a bad
  mutant. [wazmrt + wabt-ts + binaryen-ts + binaryang + wasmtk]
- **2.2 An inversion that does not compile is indistinguishable from one nothing caught; confirm
  the mutation applied, target mutants by content not line number, commit before mutating.** A
  `perl` no-op and six CRLF no-ops passed as "mutation survived"; `sed '972s/…/'` matched nothing.
  [wazmrt + wasmrt + binaryang]
- **2.3 ★ A gate that cannot fail is decoration; a gate with no trigger, a goal with no gate, a
  gate that only prints, and a property asserted in a doc comment are all preferences.** `| tail`
  swallowed the oracle monitor's status; `check-bridge-corpus.ts` exited 0 either way; "exhaustive
  over `Op`" ended in `_ => return None` and shipped four ungated ops. [wazmrt + wasmrt + binaryang]
- **2.4 ★ The local gate must BE CI's gate: read the steps from the workflow file.** 65 unpushed
  commits were red by CI's standard; `tasks.md` went binary to grep from NUL bytes because the
  hygiene gate was scoped to what the compiler reads, not what the workflow reads. [binaryang + wabt-ts]
- **2.5 Run gates in dependency order and record why.** The engine cross-check before the corpus
  was regenerated reported "0 regressed, 8 improved"; the real answer was 10. [wasmtk]
- **2.6 Design the gate so an IMPROVEMENT also fails; a KNOWN_* or baseline list asserting a thing
  stays broken inverts its purpose once fixed; never green-wash a gap — a well-argued baseline entry
  is still an entry.** Files pinned at exact counts; "IMPROVED — re-record" is a failure. [wasmtk + wazmrt + binaryang]
- **2.7 A test for a fix is coverage only when it fails without the fix, on the BOUNDARY; narrowing
  a component makes its old tests vacuous — re-invert them all.** Four fixtures were normalised by
  `wasm2wat --fold` before reaching the parser; five of seven memory64 cases were off the boundary.
  [binaryang]
- **2.8 Test the configuration you ship; a gate that exists only as a build flag is not a gate.**
  `ReleaseSmall` ships with safety checks off, so `test-shipped` exists. [wazmrt]
- **2.9 A feature gate is a track deliverable, applied at EVERY entry point; enumerate the entry
  points in a table.** `WideArithmetic` reached the Rust enum but not `wasmrt_feature_t`; table64
  was gated at one entry point of two, twice. [wasmrt]
- **2.10 Parsing a flag proves it was ACCEPTED, not APPLIED: test the spellings and the paths.**
  `--verify enforce` was accepted and dropped in two spellings; `--features` was honoured by one CLI
  path of three. [wasmrt]
- **2.11 An invalid-module test must be invalid for exactly one reason; a negative assertion
  satisfied by the WRONG error, or by the wrong STAGE, is a false pass.** wasmtk's single `catch`
  let encoder errors satisfy `assert_malformed`; a stranded immediate byte was `0x0B` = `end`, so
  the benign input reported "no defect" in the same words as a correct implementation. [wasmrt + wazmrt + binaryang]
- **2.12 Documentation of a safety guard is a test case, not prose: test where the guard must NOT
  fire, gate the CALL SITE, and extract import-time decisions so they can be tested.** wabt-ts's
  publishing doc claimed a dirty-tree guard for four releases that had none. [wabt-ts]
- **2.13 A blanket skip is not a neutral placeholder — it insures the code it covers.** [wasmrt]
- **2.14 Fuzz the published surface (it needs no oracle); a differential fuzz reaches what the
  suite structurally cannot; set the outside reader's feature list to OURS.** ~102/585 crashes on
  the public API; three of eight validator findings came from sweeps, not reading. [wabt-ts + wasmrt]
- **2.15 Sweep the axis, not the arm: when the input space is small, enumerate it, with a control
  arm.** All 64 one-byte value-type encodings found three defects; twenty unassigned SIMD
  sub-opcodes were accepted ("a ceiling is not membership"). [wasmrt]
- **2.16 ★ A change's own new surface is the one place the audit that produced it will not look —
  re-run the governing audit against the new members before landing.** The `--update-baseline` path
  OOMed; the day's own suites passed throughout six silent CLI regressions. [wazmrt + wasmrt + wasmtk]
- **2.17 A guard is only as wide as the axis it varies; write down what it varies and what it holds
  fixed.** `named_refs` varied position and missed operand. [wabt-ts]
- **2.18 A wall-clock assertion in a parallel runner measures the machine; a feature flag is part
  of a test's input; two-instance rule for anything touching pooled resources.** [wasmrt]

## §3 Producer/consumer pairs and oracles

- **3.1 ★ A round trip proves agreement with yourself; when a bug is visible only to a third party
  the test has to BE a third party — hand the bytes to an outside reader as a GATE, not a habit.**
  Legacy EH: wabt-ts parsed it, V8 ran it, wasi 417/417 green, wasmtime rejected all ten modules;
  `(ref any)` emitted as an internal tag byte and `try_table`'s label off by one in assembler,
  validator and interpreter alike — wasmtime refused both in one afternoon. [wazmrt + binaryen-ts + wabt-ts + wasmrt + wasmtk]
- **3.2 ★ Agreement between components that learned the convention from each other is not
  evidence, and there can be three.** Decoder and encoder shared a catch-depth off-by-one; every
  round trip was byte-identical and green. [binaryen-ts + wabt-ts + wazmrt + wasmrt]
- **3.3 ★ Producer/consumer pairs are the recurring blind spot; fix the gap, not a post-process
  workaround, and pin both directions.** T13.22 cancelling off-by-ones across a repo boundary,
  invisible for four releases; fixing one direction turned silent accept into loud reject. [binaryang + wazmrt + wabt-ts]
- **3.4 Our assembler is not an oracle for our decoder; a decoder rule with no matching emitter rule
  hides itself; the emitter reconstructs from a SUBSET of the parser's facts — for every field the
  parser records, ask whether the emitter reads it.** Eight emitter-gap instances in wasmrt, three
  where its output was not WebAssembly. [wazmrt + wasmrt]
- **3.5 A synthetic internal tag placed in a real encoding space will eventually mean something
  else; reserve internal tags OUTSIDE the format's space.** `0x62` became the Exact prefix. [wazmrt + wasmrt]
- **3.6 When the emitter is the suspect, compare the SOURCE across engines, never the suspect's
  output.** The first cross-check against wasmtime agreed because it was handed our bytes. [wasmrt]
- **3.7 Ask all the engines and know which PATH you invoked — cite the subcommand, not the tool;
  rank oracles by what they can see; an oracle can pass vacuously; a rejection may be an engine
  limit, not a spec limit.** `wazmrt <m> <export>` does not validate; strip 272/272 with nothing to
  strip; V8 gating a proposal off is not an oracle. [wabt-ts + wasmrt + binaryang]
- **3.8 ★ A stale vendored snapshot is indistinguishable from live data without recorded
  provenance: stamp source + date in the change that creates it, and never let a check read an
  artifact it did not just produce.** A 2020 `proposals/threads/` snapshot was filed against us; a
  frozen 272-file copy filed seven "invalid" modules that run clean; a size gate read yesterday's
  artifact. [wabt-ts + wasmtk + wasmrt + wazmrt]
- **3.9 A proposal snapshot must not be given features that POSTDATE it.** Five "multiple memories"
  assertions in `proposals/threads/` are correct with multi-memory OFF; wasmtime fails the same way
  with it on. [wasmrt]
- **3.10 ★ A claim about another project's code is a hypothesis until you grep their source; a
  stated BENEFIT is a hypothesis about someone else's code.** "wabt-ts accepts try_table" (the
  writer could not encode it); the wasm-c-api "drop-in" payoff never existed — the loaders use
  `wasmtime_*`. [wasmtk + wasmrt + wazmrt]
- **3.11 Hand over the CHECK, not the conclusion; the result gets attributed to whichever property
  was in view.** Seven instances, every one caught by the other party, none by its author; the
  `(ref $T)` shape was really "struct type ∧ no shared signature". [binaryang → wasmtk]
- **3.12 Every upstream difference gets a classified row — FEATURE, DESIGN, ORACLE GAP, DEFECT —
  before the work is called done; read DESIGN rows before porting a pass, because a faithful port
  silently undoes them; "valid either way" is not a class.** [binaryang]
- **3.13 The code being replaced is not the specification of the replacement; agreement with it
  proves agreement, not correctness.** The bridge copied wrong `delegate` scoping. [binaryang]
- **3.14 "wasmtime's SHAPE, our code": adopt architecture, transcribe nothing; the compliance test is
  that the borrow visibly diverges where our constraints differ.** [wasmrt + wazmrt]
- **3.15 A vocabulary must be checked against the SPEC, not the other half of the repo.** `ext` /
  `noext` instead of `extern`. [binaryang]
- **3.16 Classify a difference by its PROVENANCE before explaining it; check whether the port kept
  upstream's DEFAULT.** A round-trip score summed our-own-output and crafted bytes and hid a 3.2%
  size defect. [wabt-ts]
- **3.17 A flag copied from upstream's recipe means what it does to upstream's INPUTS; reproduce the
  effect, not the spelling.** musl's `--exclude-libs=ALL` hides only libgcc because musl links its
  objects loose; a link that takes yolo musl as an archive must say `--exclude-libs=libyolort.a`
  (with `ALL`, 8 exports went missing). [zilc W-11, 2026-10-27; ledger C25]

## §4 Where defects hide

- **4.1 ★ One authoritative enumeration; a second copy drifts into silence; one reader per grammar
  production, and a production has more than one site.** `deepCopy` covered 29 of 79 kinds; the heap
  type table existed three times; a private `skip_const_expr` refused two valid modules; reftype was
  read as valtype at the table-type site for the project's whole life. [binaryen-ts + wabt-ts + wasmrt + wazmrt]
- **4.2 ★ A value read and discarded is a decision; a wrong decode made harmless by a guard in
  another file is a load-bearing coincidence.** `r.readU32(); // table index`; three reserved bytes;
  `br_on_cast` flags, the elemkind byte, element flags `8`. [binaryen-ts + wabt-ts + wasmrt]
- **4.3 ★ Silent-wrong output is the worst class and where every serious defect has been: ask "what
  would a wrong answer look like?" first, and prefer a hard error over a stub.** A feature can be
  decoded, validated, printed and never execute (the start function, five releases). [wasmrt + wasmtk + wabt-ts]
- **4.4 Make the defect UNREPRESENTABLE, and find where by its compensating mechanism; a
  placeholder must not be representable as real data — put the sentinel in the TYPE.**
  `{params:[],results:[]}` filler became wrong-arity `call_indirect`; nine grep-able tells listed
  in binaryang. [binaryang + binaryen-ts]
- **4.5 Close the shape, not the arm; test the matrix, not the instance; grep for the failure your
  own comments describe.** A region-body bug was fixed four times as one-offs. [binaryen-ts]
- **4.6 Changing a field has eight failure modes the compiler cannot see**: reference `===`,
  `${obj}` → `[object Object]`, casts, conditional spread bypassing excess-property checks, the field
  name as a string, a widened union arm, an added kind vs private switches, a numeric enum accepting
  the number it replaced. Grep the patterns; give every union arm a constructor. [binaryang]
- **4.7 Let the COMPILER name the sites, know where it stops, and trial blast radius rather than
  grep it.** grep said 20 vs 67, the trial said 10 vs 133; a local alias hid a factory from search;
  widening `u32` to `u64` compiles at every call site. [binaryang + wasmrt]
- **4.8 A shared `case` label asserts its members are interchangeable; read a partial switch's
  `default` DIRECTION before its case count; an unused parameter in a family of parallel handlers
  is a missing check — enumerate the signature.** `data.drop` in an arity-1 group deleted an
  instruction; `offset` fixed in ten handlers, `is64` left in two. [wabt-ts]
- **4.9 Parallel code paths: a fix applied to one is usually needed in the other.** `wasic.ts` and
  `console_log.ts` each own a binary-operator loop and string handling. [wasmtk]
- **4.10 A guard computed and never consulted, a guard one call level away from the iteration it
  guards, and a guard covering the cases its author was debugging are all no check.** A sandbox
  escape sat behind `final_is_symlink`, read by nothing but a test. [wasmrt + wazmrt]
- **4.11 An encoder must never REPAIR invalid input; fix the contract at the boundary; an API fails
  in ONE shape.** `>>> 0` as a range check moved the error downstream. [wabt-ts]
- **4.12 Never require a bracketing you did not emit.** Six regexes hard-coding wabt's folded
  `(i32.const N)` silently matched nothing on the new backend, disabled data relocation and seated
  the heap inside static data — a HANG, not an error. [wasmtk]
- **4.13 An asymmetry between layers is a bug, not a style difference; prefer one guard on a shared
  predicate over N copies.** `Table::is64` recorded for import matching, read by nothing on the
  execution path: `call_indirect` at 2^32 called slot 0. [wasmrt]
- **4.14 A refusing bug is cheap to live with and therefore cheap to not notice; look in files that
  have sat at a few failures for a long time.** [wasmrt]
- **4.15 A conformance suite checks RESULTS; some features are about RESOURCES — write the property
  test at a million frames and mutation-verify it.** A fake `return_call_ref` scored 40/7. [wasmrt]
- **4.16 ★ A rationale expires; the code it justified does not: a comment justifying a deviation
  names the authority it defers to; "by design" and "out of scope" age badly by definition; a stale
  rationale is worse than none.** "Mirroring the oracle" survived the oracle's retirement five weeks;
  the `import.meta.main` ban's reason expired while the rule stayed right for another reason.
  [wasmrt + wazmrt + binaryang]
- **4.17 A defensive branch carrying a defect number is evidence; discrimination does not disappear,
  it MOVES.** Removing a `resolveRef` regex broke 310/421. [binaryang]
- **4.18 An entity reached across a link has an IDENTITY and its index is not it; an imported global
  is shared, not copied.** Tag 0 caught tag 0 across a link. [wazmrt + wasmrt]
- **4.19 An encoding chosen to make EXECUTION agree can erase the distinction VALIDATION runs on —
  ask what it erases.** [wazmrt]
- **4.20 A wrapper that satisfies the type checker is not evidence the value survived; fix at the
  source and count the wraps.** `BigInt(bigintOffsetToNumber(…))` preserved truncation. [binaryang]
- **4.21 Which direction to err in is a property of the CONSEQUENCE, not a house style; tightening
  what the grammar permits is the same error as accepting what it forbids — quote the production.**
  [wasmrt]
- **4.22 A library must reject a module, never abort the embedder; decode must be total; anything
  keyed by an attacker-controlled count is O(n log n).** 128k exports took 11.9 s in an O(n²)
  uniqueness check. [wasmrt]
- **4.23 A change that needs an ignore statement is not a fix.** No `biome-ignore`, `@ts-ignore`,
  `eslint-disable` or other suppression to get a change past lint or the type checker: change the
  design, or leave the item OPEN and give the owner the options with their costs. A test's
  `@ts-expect-error` asserting an unrepresentable state is an assertion, not a suppression.
  binaryang reverted the one that was made. [binaryang, owner 2026-10-28: "if it needs an ignore
  statement it is not a fix"; whether it binds every repo is an owner call — `open-work.md`]
