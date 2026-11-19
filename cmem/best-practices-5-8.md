# best-practices-5-8.md: the rules paid for, sections 5 to 8

Last verified: 2026-11-19. The second half of [best-practices.md](best-practices.md) (sections 1 to 4, and the
method: what a rule is, what ★ means, how numbers are kept). Split by section for the 25 KB limit;
no rule was changed and every number is the same.

## §5 Investigating

- **5.1 ★ Prove, do not assume: prove the REASON, not just the answer; UNVERIFIED is a legitimate
  status.** Four read-not-verify claims were wrong when run; a `--features` alias rationale was
  right by luck. [wazmrt + wasmrt]
- **5.2 ★ Identify the LAYER before naming a cause; the stage that REPORTS a failure is usually
  not the stage that caused it; finding a real defect at a layer is not evidence it causes your
  symptom — vary one thing.** "Memory-grow ordering" was decoder reordering; a symptom caused by the
  development drive's FILESYSTEM (exFAT) was diagnosed wrong three times. [wazmrt + binaryen-ts + wasmtk + wasmrt]
- **5.3 A hang is a measurement — read CPU time before theorising; check the suspect is REACHABLE
  from the failing input before bisecting; when a text-parsing fix leaves the symptom, grep for
  siblings and make the empty grep the acceptance criterion.** 1,146 s CPU meant spinning;
  `grep -c 'try\|catch'` = 0 cleared the fresh migration; three regexes fixed, three more in two
  other files. [wasmtk]
- **5.4 Stop reasoning about the code and run the oracle.** Twelve review passes versus the
  thirteenth that ran the testsuite. [wazmrt]
- **5.5 A grep for the names you expect finds the code you expected to exist, not the code that is
  there; the standing question is "where is this construct USED, not where is it NAMED?"** Nine-item
  checklist: which set the number came from (declared / asserted / consumed); blocked-by vs
  contains; has the binding constraint moved to us; reported shape vs actual precondition; green
  because it works or because never exercised; does my measurement see a known positive; am I
  proving DEAD from an input that could not show it alive; does my probe reimplement something the
  codebase exports; is the distribution suspicious (all one bucket, round zero, total = input count).
  "Not detectable by being careful — by being enumerable." [binaryang + wasmtk; wazmrt analogue]
- **5.6 Before fixing a hypothesis, TEST it; there may be two upstreams — probe both before
  attributing a difference.** "Fidelity binds" was false. [binaryang]
- **5.7 Before scoping a track, grep for the thing you are about to build; a recorded decision may
  be a no-op — verifying the premise of an option is not verifying the option.** The "refresh the
  vendored snapshot" fix could not be executed: the snapshot already was upstream. [wazmrt + wasmrt]
- **5.8 When two paths to the same action disagree, the difference is a FACT — look it up;
  obtaining the error message IS the work; one controlled pair beats weeks of correlation; identity
  is a hidden variable in CI.** `actorNotScopeMember`: the bot is not a JSR scope member. [binaryang + wabt-ts]
- **5.9 A stated constraint is worth probing, not agreeing with.** The owner's sharing constraint
  implied three properties; the third had shipped broken that morning. [wasmrt]
- **5.10 Measure severity, never inherit it; rank silent above loud; re-verifying a finding is not
  re-ranking it.** A silent start-section drop was ranked sixth and was the worst. [wabt-ts]
- **5.11 Check whether "dead" code is a missing CALL; check whether a corpus you own carries an
  answer key you are discarding.** `materializeFakeGlobals`; `assert_malformed` expected texts
  unread all campaign. [binaryen-ts + wabt-ts]
- **5.12 Hardening is a lens, not a task; two empty passes in a row mean the axis list is stale,
  not that the code is clean; "we fuzzed it" is a claim about one property.** [wabt-ts]
- **5.13 An unearned fix is a worse trade than the doubt.** No SIMD loads added "for robustness". [wabt-ts]

## §6 Recording and claims

- **6.1 ★ A written result is a CLAIM: a commit message, a status line, a doc of a safety guard, a
  contract row verified by reading. Compare it to the artifact; put a pin where the tool enforces
  it.** `8d9ba0cb9` (was `b8fafaa3f` before binaryang's 2026-10-23 purge; corrected here 2026-10-26, ledger
  C8) said "pin to 132" and left 116; prose has no failure mode. [binaryang + wabt-ts + wasmrt]
- **6.2 ★ Write down the thing you only said out loud; write the negatives (what was varied, what
  held fixed), the calibration, and what you did NOT check; distinguish clean / measured /
  UNMEASURED.** Knowledge that exists only in a conversation is operationally identical to
  knowledge nobody has. [wabt-ts + binaryang]
- **6.3 ★ Record findings that were WRONG so they are not fixed again; a retraction re-checks the
  REASONING, not the requirement; a correction is a dated claim too; a reopen condition is not
  self-checking.** [wazmrt + wasmtk + binaryen-ts + wabt-ts]
- **6.4 "Update the project memory" means AUDIT for stale live claims; when two files disagree,
  measure — do not pick the newer.** [wazmrt → wasmtk + wasmrt]
- **6.5 A backlog decays silently: sweep HEADINGS as well as bullets, re-derive open items from the
  file, and never batch-close stale rows — a shared provenance is not a shared verdict.** [wasmtk + wazmrt]
- **6.6 A summary without a commit pointer is a loss; correct while summarizing; check, do not
  assert, that nothing was dropped — and invert that check.** [binaryang]
- **6.7 Record a negative as a CONDITIONAL with a trigger ("the day X, these become exposed");
  record a partial fix as partial, loudly; name the blast radius of a guarantee you cannot meet.**
  [binaryang + wasmtk]
- **6.8 Name WHO is blocked and on WHAT — a coupling does not block both parties.** "1.5.0 cannot
  ship alone" was wrong in direction. [binaryen-ts]
- **6.9 Notate the INTENT of a membership invariant at the section: what joining asserts, what
  breaks each direction, which gate catches it.** [wabt-ts]
- **6.10 "Accepted" is a weaker claim than "honoured": a feature whose job is to put a fact in the
  output must read the output back.** [wazmrt]
- **6.11 Decide by the worst condition: find the worst case on each side and let the binding one
  control; when neither binds, say so and let cost decide.** [binaryang]

## §7 Tooling that lies

- **7.1 ★ Do not author file CONTENT through a shell heredoc; scripts go in files, always; commit
  messages through `-F <file>`.** Four corruption modes (escapes eaten, long commands truncated,
  backticks substituted, `$$` templates), five corruptions including a NUL byte in `.gitattributes`;
  broken five times by the rule's own author. [binaryang + wasmtk + wazmrt + wasmrt]
- **7.2 ★ When the exit code IS the measurement, do not pipe.** `deno fmt --check | tail -1`
  committed a failing check; `| tail -20` swallowed the oracle monitor. [wasmtk + wasmrt + wabt-ts]
- **7.3 ★ A change that silently does nothing is indistinguishable from one that worked: prefer
  "fail if absent" over "act if present"; edit scripts assert each match exactly once; read back;
  omission is not reset.** Seven no-ops in one register (replace without asserting the target, an
  omitted workspace key, a `--dry-run` that bumped). [binaryang + wazmrt + wasmrt]
- **7.4 A cached read reports a false ABSENCE; only a fresh cache proves a dependency chain;
  `--reload` does not invalidate a resolved version.** JSR provenance read null for minutes on an
  attested release; v1.2.4 orphaned tag. [wasmtk + binaryang + wabt-ts]
- **7.5 Never build an exact-match string out of rendered output.** [binaryang]
- **7.6 ★ Line endings: pin in `.gitattributes` wildcard-first; measure with a positive control;
  never fix with `git config`; test inputs whose bytes feed a digest are never whitespace-trimmed.**
  `grep -c '\r'`=140, `grep -c $'\r'`=0, `grep -cU $'\r'`=184 on the same file. [wasmtk + binaryang + wazmrt + wasmrt]
- **7.7 Prefer a wildcard-plus-exceptions default and a self-discovering list to a hand-maintained
  one; `deno task test` enumerating directories BY NAME will not run a new directory.** [binaryang → wasmtk]
- **7.8 Import the helper, do not reimplement it — otherwise you are testing the copy.** A copied
  `decodeWatString` reported "1268 parse-fail, 0 flips". [wasmtk]
- **7.9 Stopping a background suite kills the shell, not its children.** An orphaned `deno` at 98%
  CPU thirty minutes later. [wasmtk]
- **7.10 A caret plus a lockfile is not a pin: COMPATIBILITY ranges belong in the lockfile,
  CORRECTNESS pins in the specifier — what a `--reload` would do is the test.** `^1.3.5` let 1.4.0
  in and 156 files went off baseline. [wabt-ts + wasmtk]
- **7.11 Never run `publish` locally (provenance exists only in Actions and cannot be retrofitted);
  never bump in the change that merges; know which action is irreversible; a tag publishes from
  ANY branch; a published version is immutable.** binaryen-ts 1.0.0–1.0.9 have no provenance;
  "Check OIDC availability" gave ten releases of false assurance. [binaryang + wabt-ts + wasmtk + loaders]
- **7.12 A documented command can go wrong WITHOUT CHANGING when the question moves under it;
  when you write a command to see past a known false alarm, break something and confirm it still
  fires.** [wabt-ts]
- **7.13 A formatter's scope is a decision: never format `cmem/`, never format compiler inputs;
  explicit workspace overrides must be written as `false`, because omitting inherits.** [binaryang + wasmtk + binaryen-ts]
- **7.14 Prove an option DEAD only against the input that flows through the path.** `inlineExport:
  false` looked inert on two of three inputs; removing it broke thirteen consumers. [wasmtk]
- **7.15 A `.gitignore` pattern is anchored or it is a wildcard.** Unanchored `wabt-ts/` inherited
  from binaryen-ts would have matched half the merged tree. [binaryang]
- **7.16 "Not installed" is a claim about every binary of that name, not the first on PATH.** The
  workspace recorded ".NET: no SDK" from `C:\Program Files\dotnet\dotnet.exe`; the SDK 10.0.402 was
  the scoop `dotnet10` shim, already in use by loader-dotnet. `Get-Command <name> -All`, the
  repo's own memory, and the owner's alias name before writing an absence. [workspace, 2026-10-22]
- **7.17 An absence claimed from a grep must be re-run by someone else before it is recorded; a
  short token needs word boundaries.** loader-dotnet recorded `git grep -i 'deno|bun|node|npx'`
  as "matches nothing"; re-run, `bun` hit `ubuntu-latest`. The conclusion survived, the claim did
  not. Use `\bbun\b`, and paste the command with its output. [loader-dotnet + workspace, 2026-10-22]
- **7.18 A history scan that reports each commit's FIRST hit undercounts what a purge must remove;
  scan every blob and list the distinct tokens.** zilc saw 1 path per commit; the blob scan found
  3 distinct tokens in 63 blobs, one user-named. [zilc, 2026-10-27; ledger C23]
- **7.19 Never run a check and the action it guards in one command line.** A chained `git commit`
  ran past its own failed check. Run the check, read its exit code, then act. [zilc, 2026-10-27;
  ledger C23]
- **7.20 A config key's name is not what it does — trace a run.** zilc's two `maintenance.*` keys
  ran an extra `commit-graph` task under git 2.54's new default strategy. [zilc, 2026-10-27;
  ledger C23]
- **7.21 Every network fetch in a script carries its own time limit, request to last byte.** A
  library default is not one: loader-dotnet's `runtimes.csx` hung over 15 minutes on Microsoft's
  release index past .NET HttpClient's 100 s default; in CI that holds a runner to the 6-hour job
  limit. Invert it with an unroutable address and a short limit. [loader-dotnet, 2026-11-09;
  ledger C40]
- **7.22 Rehearse a changed release job with its exact commands, in a fresh folder laid out as the
  runner's, before it lands.** "Re-run failed jobs" runs the TAG's workflow, so a release-job bug
  costs a version (binaryang spent 3.0.0 and 3.0.1 on npm). npm, measured: `npm pack
  --pack-destination <dir>` does not create `<dir>` (ENOENT); `npm publish dir/name.tgz` is read
  as a GitHub shorthand — give `./…` or an absolute path; OIDC trusted publishing and provenance
  work from a tarball (npm 11). [binaryang, 2026-11-09; ledger C43]

## §8 Working across repos

- **8.1 ★ Read freely, write never: nothing is written into a sibling's tree — not its source, not
  its `cmem/`, not its copy of the contract — unless the owner directs that write, and then it is
  logged in both memories.** Two destructive overwrites on 2026-08-19; a commit that laundered
  authorship. [wasmrt + wazmrt + binaryang + wabt-ts]
- **8.2 Draft handoffs in your own memory and hand over the CHECK; a skip never re-announces
  itself; "contains" is not "blocked by"; scratch-level observations do not belong in cross-repo
  messages.** [binaryang]
- **8.3 A contract is kept byte-identical on both sides; a version mismatch is an in-flight state,
  not a disagreement; a disagreement is an observation until traced; rows are verified by RUNNING
  both binaries.** [wazmrt + wasmrt]
- **8.4 A sibling may vendor your source — exclude vendor directories before measuring; verify a
  sibling from a scratch copy.** A measurement nearly forced a needless major version. [binaryang]
- **8.5 Two verdicts, not one: malformed and invalid are separate answers, per oracle, per row.**
  [binaryang]
- **8.6 Review someone else's codebase with the metric you built for your own.** binaryen-ts was
  reviewed without the decode→encode round trip and the wrong-bytes count was wrong three times.
  [wabt-ts]
- **8.7 A gate you PORT must be re-proved to fail; a gate that has to be remembered is not
  enforcement.** [wasmrt + wazmrt]
- **8.8 A rule in a wing file is not enforced at the code sites it governs; a rule that does not
  survive a clone is not a project rule.** [binaryang]
- **8.9 A cross-repo layer goes stale faster than the repos it describes; refresh it from their
  git logs, not from itself.** In one month binaryang shipped nine minors and left Deno, wazmrt
  closed a letter, wasmtk moved its pin seven times — and the workspace was the last to adopt the
  Bun rule, then mislabelled binaryang "still Deno" from its own stale map. [workspace, 2026-10-22]
- **8.10 A provenance stamp must name a commit a consumer can FETCH.** loader-js stamped its
  reference fixtures from wasmtk `f50c8e4`, which lived only in this machine's clone (131 commits
  unpushed); loader-dart adopted the set, loader-c refused it as unpinnable. Check
  `git branch -r --contains <sha>` (or a tag) before stamping. [loader-c, 2026-10-22]
