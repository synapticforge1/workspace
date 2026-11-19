# review-process.md — the review standard (final, 2026-11-17)

🔒 **Owner, 2026-11-17: "Review standard — final."** Every rule below records a decision the owner
made on 2026-11-17. This file is that document, kept in its words; it **replaces** the 2026-11-12 /
11-13 standard (S3D-derived, letter H35: three nested tiers, seven security surfaces, 3–4 reviewers
per round) and binaryang's trial rules (letter H36). Letter **H37** sends it to every project.
What differs per project is a **slot** each repo fills in its own `cmem/review-process.md` (§ 12).

## Summary

Every release passes **five required reviews in a fixed order (basic, hardening, licensing,
security, privacy), after an optional efficiency review.** Each review has a closed item list and
ends through one fix-and-verify loop. Three changes from the previous standard:

- **Two new classes.** Licensing and privacy become reviews of their own. Privacy leaves the
  security review, and licence reading leaves its dependency item.
- **No shared items.** Each item belongs to exactly one class, and a boundary rule decides where a
  finding goes.
- **A loop that converges.** After the first review, each re-review reads only the previous
  findings and the fix changes, so every round is smaller than the one before.

## 1. The classes and their order

Asking for a review runs all five required classes, each with its own agent. The main agent then
fixes the findings one class at a time, in this order. Publishing happens only after every required
class is cleared.

| Order | Class | Required | The one question it answers |
| --- | --- | --- | --- |
| First, when run | Efficiency review | Optional | Is speed and memory use on normal input optimal? |
| 1 | Basic review | Yes | Do planned inputs give the right output? |
| 2 | Hardening review | Yes | Does unplanned input or environment fail loudly and safely? |
| 3 | Licensing review | Yes | May we ship everything in this release, and have we met each licence's terms? |
| 4 | Security review | Yes | Can someone gain control or data through the code, dependencies, repository or release path? |
| 5 | Privacy review | Yes | Does the repository, package or running tool expose facts about the creator or the user? |

Licensing fixes come before security and privacy fixes, so the security and privacy re-reviews read
any dependency that was replaced for licence reasons.

**The owner's words:** "review" runs all five required classes. "basic review", "hardening
review", "licensing review", "security review", "privacy review" and "efficiency review" each run
the same loop (§ 9) for that class alone.

## 2. Boundary rules

A finding belongs to exactly one class. These rules decide which one.

- **Basic or hardening.** Input the specification covers belongs to basic. Input outside the
  specification belongs to hardening.
- **Hardening or security.** Ask what the worst case gives an attacker. Control or data (code runs,
  a write lands outside the output, a credential leaks, the repository or release path is taken
  over) is security. A crash, hang, wrong output or memory exhaustion is hardening.
- **Security or privacy.** Credentials that grant access (tokens, keys) are security. Personal and
  machine facts are privacy.
- **Security or licensing.** Pins, lockfiles, install scripts, known vulnerabilities and provenance
  are security. What a licence permits and requires is licensing.
- **Hardening or efficiency.** Whether memory and time are bounded on unplanned input is hardening.
  What they cost on normal input is efficiency.

A reviewer who sees a finding that belongs to another class records it under that class in the
issues file and does not pursue it.

## 3. Efficiency review (optional, runs first)

Optional for every release and never blocks one. When it runs, it runs BEFORE the five required
reviews and checks speed and memory use on normal input.

- **Targeted tests after every efficiency fix.** Optimizations are the changes most likely to
  remove a bounds check or change a result.
- **The required reviews follow.** Because efficiency runs first, the five required reviews read
  the optimized code, and no second full review is needed.

## 4. Basic review (1)

Planned inputs give the right output. Its items:

- **Reference results hold.** Corpus and suite counts are unchanged, and any change is a finding
  until explained.
- **Silent-wrong output.** Valid output that differs from the specified semantics, a tool reporting
  success on wrong output, or a golden file that recorded a failure as the expected result.
- **Docs match behavior.** Every documented command, flag and API does what the README and help
  text say.
- **Parallel code paths.** Logic implemented twice gets the same fix in both places.
- **In-spec boundaries.** Numeric conversions, overflow, integer division, and empty, single and
  maximum values of documented ranges.
- **Documented errors.** The right diagnostic, location and exit code.
- **Stubs and leftovers.** Placeholder returns, workarounds, dead code.
- **Test adequacy.** Each fix has a test that fails without it, and tests assert results, not just
  that the code ran.
- **Unintended API breaks** against the last release.
- **Cross-implementation agreement.** The same input gives the same result across implementations
  of one interface (the universal loaders; wazmrt and wasmrt).

## 5. Hardening review (2)

Unplanned input and environments fail loudly and safely. Its items:

- **Malformed, truncated or oversized input** gives a named, located refusal, never a crash, stack
  trace, hang or guessed result.
- **Out-of-spec values.** Null, negative, NaN and infinity, deep nesting, non-UTF-8, BOM, CRLF, and
  Unicode, spaced or over-long paths.
- **Resource bounds.** A time limit on every subprocess and network request, a recursion depth
  limit, and allocation caps where an input length field drives the size.
- **Memory behavior.** Leaks, unbounded growth over long runs, and ownership and lifetime across
  FFI. A finding that turns out to be a corrupting write is recorded under security.
- **Failure atomicity.** A failed or interrupted run leaves no half-written output, deletes
  nothing, cleans up its temp files, and never overwrites an input.
- **Environment matrix.** Each OS, filesystem quirks (exFAT, case-insensitivity), runtime versions,
  the installed package as a user gets it, a missing toolchain, no network, a read-only directory,
  a full disk.
- **Concurrency.** Parallel invocations, and shared cache or temp collisions.
- **Error handling.** Swallowed errors, catch-alls, unchecked return codes, a zero exit code on
  failure.
- **Fuzzing** of each binary and text parser.

## 6. Licensing review (3)

Everything in the release may be shipped, and each licence's terms are met. Its items:

- **Inventory.** Every direct and transitive dependency from the lockfile, plus vendored code, test
  corpora, bundled binaries, fonts, images and copied snippets.
- **Licence read from the source.** Taken from the installed package itself and recorded as an SPDX
  identifier, since registry metadata can be wrong.
- **Compatibility.** Each licence is compatible with the project's own and with how the code is
  distributed. A copyleft dependency that is bundled or linked is a different case from one used
  only at build or test time.
- **Obligations met.** Attribution and notice files are complete, required licence texts ship
  inside the published package, and modifications are stated where the licence asks for it.
- **Derived and ported code.** Upstream headers and notices are retained, and the project's changes
  are marked.
- **Nothing unlicensed.** No dependency without a licence, and no code of unknown origin.
- **The project's own licence is consistent.** The licence file, the manifest field and the file
  headers agree in the repository and in every published package.
- **Redistribution rights for non-code content.** Test suites, samples, and any standards text or
  tables.
- **Changes since the last release.** New dependencies, and existing ones whose licence changed
  with a version bump.

If this review replaces a dependency, the targeted tests after the licensing fixes include every
suite that dependency reaches. Compatibility questions on unusual licences need a legal opinion;
this review does not replace one.

## 7. Security review (4)

Whether someone can gain control or data through the code, its dependencies, the repository or the
release path. Its items:

- **Untrusted input runs and loads nothing it was not asked to.** No execution during compile, no
  load triggered by an import, a path or an environment variable inside a module, and no injection
  into subprocess arguments.
- **Path containment.** Traversal, symlink following, writes outside the requested output, and
  archive extraction escaping its folder.
- **Sandbox boundary (runtimes).** Guest memory bounds checked on every host call, pointer and
  length validation, overflow in the bounds arithmetic, indirect-call type checks, and WASI
  confinement (preopens, path escape, environment not inherited).
- **Exploitable memory corruption.** Out-of-bounds read or write, use-after-free, and type
  confusion in unsafe, FFI, Zig and C code.
- **Native library loading (loaders).** Search-path hijacking, and integrity checks and TLS
  verification on anything downloaded.
- **Dependencies.** Exact pins, a committed lockfile, install and build scripts, known
  vulnerabilities, and provenance of vendored code. Licences are not read here.
- **Release path.** Publishing only from CI, actions pinned by commit hash, minimal token scopes,
  attestation read back, and no workflow that interpolates untrusted pull-request or issue fields
  or checks out untrusted code with secrets available.
- **Repository settings.** For the repository being released only: branch and tag protection, who
  holds write and admin, deploy keys, webhooks and installed apps, secret scanning with push
  protection, dependency alerts, and Actions permissions. Organization-level settings are out of
  scope.
- **Credentials.** No token or key in the tree, the history, CI logs or the package.

## 8. Privacy review (5)

Whether the repository, the package or the running tool exposes facts about the creator or the
user. Two halves.

**Creator side** (what the repository and package reveal about the author and the author's
machine):

- **Machine paths in text.** Drive, home, WSL and MSYS forms, including JSON-escaped ones.
- **Machine paths in binaries.** Debug sections, panic paths, source maps, embedded build paths.
- **Personal identifiers.** Emails beyond the one maintainer exception, phone numbers, usernames,
  hostnames, internal IPs, OneDrive or company folder names.
- **Commit metadata.** Author, committer and tagger addresses, and commit messages.
- **Local files never tracked.** `.claude/`, editor settings, `.env`, `cmem/local/`.
- **Fixtures, goldens and samples.** No frozen machine path and no real client or project data.
- **Asset metadata.** EXIF and document author fields.
- **Scope.** Every blob on every ref, the built package as published, CI logs, and release notes.

**User side** (what the running tool does with facts about the person using it):

- **Unrequested network traffic.** Telemetry, update checks, fetches. Any that exists is disclosed
  and opt-in.
- **What the tool embeds in its output.** The user's paths, username, hostname or environment
  written into generated modules, debug sections or reports.
- **Errors, logs and crash output.** Whether they include file contents or environment values.
- **Environment access.** The tool reads only the variables and files it needs, and a guest sees
  only what was passed to it.
- **Caches and temp files.** Where they live, what is kept, when they are removed.
- **Third-party data.** For tools that process other people's files: redaction is complete, data
  stays local, nothing is retained.
- **A stated policy.** The docs say what is collected, even when the answer is nothing.

The creator-side scan runs again on the final commit and the built package immediately before
publishing, so that later fixes cannot reintroduce a leak.

## 9. The fix-and-verify loop

Asking for a review runs one loop across all five required classes, and it ends at the first
re-review that reports nothing.

1. **First review.** The classes are reviewed one at a time, in class order, each by its own agent
   using that class's item list, over the full scope since the last release. Each agent reports its
   findings to the main agent. Each later agent is given the items already reported, so that it
   does not report them again.
2. **Triage.** The main agent verifies each finding and decides whether it is a real issue or
   intended design. A rejection as intended design cites the record that says so, and where no
   record exists the question goes to the owner. Every rejected finding is recorded with its
   explanation.
3. **Fix.** The main agent fixes all accepted findings of one class together, then moves to the
   next class, in class order, until every class is fixed. After each class's fixes it runs
   targeted tests: the tests those changes reach, plus the new test written for each fix. It may
   also fix sibling instances of a finding, including ones that fall in another class.
4. **Re-review.** After all classes are fixed and their targeted tests pass, a new agent per class
   receives each original issue, the main agent's fix and its reasoning. It receives these for
   every class. It checks that each issue was valid and confirms each fix by a run. Its scope is
   the fix changes plus any untouched code those changes affect.
5. **Stop or repeat.** If the re-review reports findings, steps 2 to 4 repeat on them and on the
   new changes. When it reports nothing in any class, the full test suite runs once on every
   supported platform. If the suite passes, the review is complete. A failure is a finding: it goes
   back to step 3, and its fix is re-reviewed.

Asking for a single class, such as a security review, runs the same loop for that class alone.

**The release tooling runs the review set as its first step.** If nothing comes back, the release
proceeds. If anything comes back, the loop runs until a re-review is empty, and the release
proceeds then.

Three rules keep the loop from running without end:

- **A re-review is not a second first review.** It reads the fix changes and the code they affect.
  It does not read the whole scope again.
- **Missed findings.** A valid problem that a re-reviewer reports and the first review missed goes
  back into the fixes for its class.
- **Twice-failed findings.** A finding that two consecutive re-reviews report as not closed goes to
  another new agent, which presents the owner with options for how to proceed. That finding waits
  for the owner's decision while the rest of the review continues.

## 10. Rules for briefs, findings and gates

These rules keep each review inside its class.

- **The brief is fixed.** A reviewer's brief is the class's item list, word for word, as a closed
  list: report only findings under these items. The main agent adds the scope and nothing else.
- **What counts as a finding.** It has a reproducing run or a concrete failure scenario, it belongs
  to the class under review, and it reaches that class's severity floor (§ 11).
- **What a re-reviewer receives.** The original issue, the main agent's fix and its reasoning. It
  still confirms the fix by a run and does not rely on the explanation alone.
- **Rejected findings are explained.** The issues file lists every finding the main agent rejected,
  with the reason.
- **Sibling instances.** When fixing a finding, the main agent may fix other instances of the same
  kind of problem, including ones that fall in another class. Those changes are re-reviewed like
  any other fix.
- **Review branch.** Fixes are made on a local review branch, which is merged to `main` once the
  review is complete. Issues are tracked in **`cmem/review-issues.md`, which is gitignored in every
  repository**, so they never reach GitHub and need no purge. Open issues in existing ledgers move
  to that file, and rows already fixed stay where they are.
- **Scripted checks are gates, not reviews.** The privacy and credential scan, the vulnerability
  check, the licence inventory against an allowlist, the reference suites and the API surface check
  run as scripts. Reviewers get only what needs judgment. **Every gate, the test suites included,
  runs locally and is not repeated on GitHub.**
- **Review tooling is outside release reviews.** Gate scripts and review records are not reviewed
  on each release.
- **A reviewing agent never commits, pushes or releases.**

## 11. Severity floors

A finding counts only if it reaches its class's floor, and the common floor is correct output.
Three outcomes rank worse than wrong output and always count: an attacker gains control or data, a
user's data is destroyed, or something is published that cannot be taken back (a personal fact, a
credential, or content the project has no right to ship).

- Basic
  - Counts as a finding: A planned input gives wrong output, a tool reports success on wrong output, or the
    docs state something false
  - Below the floor: Style, naming, refactoring, clearer wording
- Hardening
  - Counts as a finding: An unplanned input or environment gives wrong output without an error, destroys or
    half-writes data, hangs, grows without bound, or crashes without a named error
  - Below the floor: The wording of an error message, and environments outside the project's matrix
- Licensing
  - Counts as a finding: Something shipped that the project has no right to ship, or a licence obligation not
    met in the published package
  - Below the floor: Formatting differences in headers and notices that do not misstate a licence
- Security
  - Counts as a finding: A reachable path by which an attacker gains control or data, with the input and the
    gain named
  - Below the floor: Extra safeguards with no reachable path behind them
- Privacy
  - Counts as a finding: A real personal or machine fact in anything public or published, or the tool sending
    or embedding user facts without being asked
  - Below the floor: Synthetic examples, and the one allowed maintainer address
- Efficiency
  - Counts as a finding: A measured cost on normal input that a specific change reduces
  - Below the floor: Suggestions with no measurement

## 12. Platform notation, and each project's slots

Every project tracks its platforms with the same six IDs: **`win-x64`, `win-arm64`, `mac-x64`,
`mac-arm64`, `linux-x64`, `linux-arm64`.** Toolchains spell the two architectures differently
(aarch64 and arm64 are the same, as are x86_64, amd64 and x64), so the IDs use one spelling and
each project records its own toolchain's target name beside them.

🔒 **Amended by the owner, 2026-11-17 ("I agree"): each project keeps ONE file, `cmem/platforms.md`**
— the **support matrix** at its top, as a Markdown table with one row per platform ID, and the
platform notes under it (below). The environment-matrix slot of its `review-process.md` is a
one-line pointer to that file, so there is one copy.

- Platform
  - What it holds: One of the six IDs
- Status
  - What it holds: `shipped` (a build is published and tested natively), `tested` (tested here, no
    platform-specific build published), `emulated` (the x86_64 build is tested under the OS's emulation),
    `pending` (supported, not yet verified for the current release — no test machine yet, or its add-platform
    run has not happened) or `none` (not supported, with a one-line reason)
- Target name
  - What it holds: The exact name the project's toolchain uses, such as `aarch64-unknown-linux-gnu` for Rust
    or `linux/arm64` for Go
- Tested on
  - What it holds: A role only: dev machine, Intel Mac, arm64 Mac, or a Parallels guest on one of them.
    Machine names and paths stay in `cmem/local/`

The test machines give six native combinations: the Intel Mac with Parallels 26 covers the x86_64
versions of macOS, Windows and Linux, and the arm64 Mac with Parallels 27 covers the arm64
versions. Projects with further axes, such as runtime versions, list those in a second table in
the same slot.

When the final full-suite run passes, each platform gets one result line: the version, the commit
tested, the date, the platform ID and the suite counts. These lines hold no issues, and each test
machine commits its own line to the local review branch — **in that release's entry in
`cmem/release.md`** ("Platforms verified").

**The platform rules the owner added after 2026-11-17** — what `cmem/platforms.md` holds, the
interim "Tested on" rule, the three testing tiers, the host module, releasing now and adding
platforms later — are in the workspace's [platforms.md](platforms.md).

**Each project's slot file** (`cmem/review-process.md`) holds: its private-data paths; its
reference results; its support matrix and platform notes (`cmem/platforms.md` — a one-line pointer here); **where its licence inventory and notices live;
which of its outputs can carry user facts**; its gate scripts; and anything in the item lists that
does not apply to it, with the reason.

## 13. What this replaces, and the work to put it into effect

What each rule of the previous standard became is in
[archive/review-standard-what-it-replaced-2026-11-17.md](archive/review-standard-what-it-replaced-2026-11-17.md).

**Work, per repository (each repo's own session; letter H37):**

- [ ] **Slot file.** Rewrite `cmem/review-process.md` from this standard; add the two new slots.
- [ ] **Issues file.** Add `cmem/review-issues.md` to `.gitignore`; the privacy gate checks that it
  is untracked.
- [ ] **Existing ledgers.** Move OPEN issues from tracked ledgers into the new file; rows already
  fixed stay where they are.
- [ ] **Release tooling.** Replace the check for security and hardening record paragraphs with a
  run of the review set.
- [ ] **GitHub workflows.** Remove the test steps (the 14 repositories that run them), so that CI
  only publishes.
- [ ] **Platforms file.** Create `cmem/platforms.md`: the support matrix as a Markdown table, then
  the platform notes; tag each platform-specific setting in code with its platform ID.

**Owner's:** the two test machines for every platform — an x86_64 Mac with Parallels 26 (x86_64
Windows and Linux guests) and an arm64 Mac with Parallels 27 (arm64 guests).

**Workspace note — what this changes in `release-process.md`** (owner's order of 2026-11-10, "CI to
check first, then push the tag …"): the checks now run LOCALLY, as the release tooling's first
step (the review set and every gate, on every supported platform); CI no longer tests. CI keeps
what belongs to publishing: tag = manifest version and "is this a new version", the tag, the page,
the publish, skip-if-published and the registry read-back. See release-process.md § 5, U1 / U5. 🔒 **Confirmed
by the owner, 2026-11-17:** "your read is correct on the local review and the CI steps. We want the CI to
verify the version, then tag, create the release page and publish, and skip any version already published."
