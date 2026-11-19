# working-rules.md — the common floor for every increment

Compiled 2026-09-20 from binaryang `working-rules.md`, wasmtk `workflow.md` + INDEX, wasmrt and
wazmrt INDEX policy + `design-decisions.md`, wabt-ts / binaryen-ts INDEX, and the loader INDEX files.
**A repo's own rules govern inside that repo.** Where repos disagree, the disagreement is named here
and the recommended floor is stated; the owner decides whether to unify
([goals.md](goals.md) § "Questions to settle").

## The role of a session in the workspace folder

- 🔒 A session here is the reviewer, reporter and communicator of issues between the projects
  (owner, 2026-09-20). It does not develop any project.
- Cross-project differences go in [divergences.md](divergences.md) with a class.
- What a project must know goes in [letters/](letters/) as a letter that project's own session pulls.
- Measurement scripts live in `../tools/`.
- Nothing is written into a project from here, unless the owner directs that specific write.
- Since 2026-11-19 the workspace memory is its own git repository, `synapticforge1/workspace` (PUBLIC),
  beside the projects: `cmem/`, `tools/` and the pointer `CLAUDE.md`. The owner's "commit" and "push"
  apply to it like any project; `cmem/local/` is gitignored and never leaves this machine.
- It is public: nothing goes into a tracked file that the privacy rule forbids, and nothing about
  the private project (LeptonPad) beyond what the owner accepts as public.
- Until 2026-11-19 the root `CLAUDE.md` carried a digest of these rules; it is now a pointer
  (memory-guide.md), and the digest is in [archive/CLAUDE-to-2026-11-19.md](archive/CLAUDE-to-2026-11-19.md).

## Git

- **Never commit to a repo from a session working in another repo.** Read freely, write never.
  Owner-directed exceptions are logged with the date in BOTH repos' memory.
- **Messages go through a file**: `git commit -F <file>` / `git merge --no-ff -F <file>`, the file
  written with `Write`. Never a heredoc, never a double-quoted `-m` (backticks ran as command
  substitution in a merge message). `-F -` does not read stdin on this machine.
- **End every message with the attribution line the session supplies.** The model name changes
  between sessions; do not hard-code one in a repo rule (wasmtk `workflow.md` does).
- **Prefer a new commit over `--amend`.** Never `git checkout <file>` to drop a probe — it destroys
  everything uncommitted in that file (wasmrt lost a finished implementation). Copy aside instead.
  Do not `git stash` across an autocrlf boundary (a 47-line diff became 1,649).
- **Commit granularity is decided before you edit**; hunk staging is unavailable here, and a broken
  bisect point is worse than a coarse one.
- **Nothing is pushed, tagged or published unless the owner says so.**
- **Force-pushing a rewritten `v*` tag RE-RUNS a tag-triggered publish workflow** (loader-dart,
  2026-10-26: three runs after its H19 tag moves; each stopped at "version exists", so harmless
  there). Before moving tags: read what the publish workflow does when the registry refuses a
  duplicate (`--skip-duplicate` or a tolerant step would run on to later steps), and expect
  GitHub to refuse the move outright under an immutable release (binaryen-ts, 34 tags).
- **The manifest version line stays at the released version.** In every Deno repo the version line
  ARMS a release (`auto-tag` publishes when `v<version>` has no tag). Never bump in the change that
  merges; one action must not do two things when only one is reversible.
- **Version numbers mean one thing everywhere** (🔒 owner 2026-09-20): Semantic Versioning 2.0.0.
  Patch = fixes only; minor = backward-compatible additions (patch resets); major = anything
  breaking (minor and patch reset). Components are unbounded; nothing ever carries. The major is
  the break signal; the README Breaking Changes table is the migration guide.
- **A bump is gated, never judged** (🔒 owner 2026-09-20): the bump script diffs the committed
  surface snapshot, prints the floor (patch / minor / major) with the symbols that set it, and
  refuses a lower bump; CI repeats the check on the tag; the previous tag's tests and every known
  consumer's suite run against the new source before a patch or minor publishes; removals are
  deprecated for one minor first; re-baselines are their own commit. Full text:
  [layout-and-packaging.md](layout-and-packaging.md) § "The compatibility gate".
- **A repo releases on its own milestones when its QA/QC gates pass** (🔒 owner 2026-09-20), even
  when the milestone exists because a sibling needs it. A sibling's need creates a milestone; it
  never shortens the gate.
- **A re-baseline goes in its own commit** with the reason in the message.
- **Docs and memory land in the same commit as the code they describe.** "A doc pass scheduled after
  the release is a doc pass that does not happen."
- Branching — the repos disagree, and each has a reason:
  - binaryang: branch → commit → `merge --no-ff` to `main`, always, docs included (history was
    rewritten once to make it uniform).
  - wasmtk: branch only when a test FAILS and needs a `src/` fix; a clean batch commits to `main`.
  - wasmrt, wazmrt: single `main`, direct commits, one release commit carries code + bump + docs.
  - **Floor:** follow the repo's rule; in a repo with no rule, branch → gate → `merge --no-ff`.

## The gate

- **The local gate must BE CI's gate.** Read the steps from `.github/workflows/*.yml`, not from
  memory of them; run them on the COMMITTED tree, AFTER the last edit, reading every step's exit
  code. Where a step's verdict is its output rather than its exit code, run it as CI does and read
  the output. (The example once given here — binaryang's `check-naming.sh` always exiting 0 — is
  retired: since `f6592bd86`, 2026-09-29, it is `scripts/check-naming.ts`, run as `bun run naming`,
  and exits 1 on a violation. Corrected 2026-10-22 on binaryang's report.)
- **Diff the OUTPUT, not the exit code.** Compare pass/fail/skip counts per file against the recorded
  baseline. An exit-0 run has silently dropped passes in four repos.
- **Gate order is load-bearing** where one gate grades what another regenerates (wasmtk:
  `wasi_tests` → `engine_cross_check` → `wast_tests`). Record the order with the reason.
- **A CHANGE triggers the gate, not a batch.** No `src/` edit and no bug means the phase filter is
  the whole gate. When a bug is found or fixed, run the ENTIRE suite set; skip a suite only when the
  impact map proves it out of reach.
- **Reinstall before testing** when suites invoke a globally installed binary (`deno task install`;
  never hand-write the install line — `--allow-ffi` is required).
- **Rebuild the unmodified commit before debugging a toolchain failure.** Three red Go suites were a
  toolchain version, not the change.
- **Invert every new test or gate**: break the thing on purpose and watch it fail for the RIGHT
  reason; confirm the mutation applied; a mutant caught by a different check is a bad mutant.
- **A gate that compiles is not a gate that runs**; a gate is evidence only about what it REACHES.
  Before trusting a gate for a feature, find an input in it that has the feature.
- **A test task alone is not a gate** where it skips type-checking (`deno task test --no-check`
  then; `bun test` never type-checks); use the check + test pair (binaryang: `bun check` + test).
- **Never lift a safety measure on an unpublished sibling build's word.** Wait for a pinnable version,
  re-run your gate.

## Tooling

The Tooling rules 1–14 (scripts, heredocs, `gh`, Bun versions, releases, the owner's words, reviews,
project memory) are in [tooling-rules.md](tooling-rules.md). A reference to "working-rules.md § Tooling
rule N" means rule N there.

## Sibling boundaries

- **Never write into a sibling repo.** Draft the note in your own `handoffs.md`-equivalent and hand
  it to the owner to send. Fixes land in the repo that owns the file. During a merge or a
  coordination this is the first habit to erode.
- **Verify a sibling from a scratch COPY** (`deno` writes `deno.lock` wherever it runs; `cargo` and
  `zig` need their caches on NTFS).
- **A sibling may vendor YOUR source** (wasmtk carries `upstream/binaryang/`). Exclude vendor
  directories before measuring "what does the consumer use".
- **A claim about another project's code is a hypothesis until you grep their source.** Hand over
  the CHECK, not the conclusion. Correct your own record before the other side plans against it.
- **Reports about a sibling go to the owner**, never into the sibling's memory.
- **The predecessors are RETIRED** (wabt-ts, binaryen-ts; frozen 2026-09-02, 🔒 removed 2026-10-26:
  local folders deleted from the workspace, the GitHub repos deleted by the owner, every JSR
  version yanked — owner; 1.5.1 too, measured by binaryang from JSR's API 2026-10-28, both
  packages archived; an exact-version import still downloads). Their full histories survive as bundles in binaryang's
  private `cmem/local/predecessors/`; their curated memory is binaryang's `cmem/wabt-ts.md` and
  `cmem/binaryen-ts.md`. Nothing cites them as a live location any more. **The oracle is
  retired** (wasmrt must not read wazmrt for design; behavioural measurement is always allowed;
  reading for a contract row is required).

## Records

- **Every upstream difference gets a classified row** (FEATURE / DESIGN / ORACLE GAP / DEFECT)
  before the work is called done. Read DESIGN rows before porting a pass or "matching upstream".
- **A recorded count is a claim**: re-derive, then make it ratchet so it cannot silently go stale.
- **A commit message is a claim**: check the effect with `git show <sha> -- <path>`.
- **A row's premise is not evidence**: re-derive it before acting on the row.
- **Owner calls stay owner calls.** Where a record says 🗓️ OWNER or "future discussion", gather the
  evidence and stop.
- 🔒 **No secrets or personal information are ever made public** (owner, 2026-10-22). Everything
  committed is public, `cmem/` included — committing `cmem/` is the open-book policy and is fine
  **as long as it displays no secrets**. Never in a committed file, a commit message, a published
  package, an issue, a PR or an artifact:
  - **secrets** — tokens and PATs (`ghp_…`, `github_pat_…`, `npm_…`, PyPI/NuGet/crates/JSR keys),
    passwords, private keys and signing keys (`*.snk`, `*.pem`, `*.p12`), `.env` contents, OIDC or
    session cookies;
  - **personal information** — email addresses, phone numbers, postal addresses, machine names,
    private account names, and **personal drive paths** (🔒 owner clarification, 2026-10-22): ANY
    absolute path on the owner's own machines — not only those carrying a user name
    (`C:\Users\<name>\…`) but also project and tool locations such as `D:\Programs\…`, `J:\…`,
    scoop or AppData install paths. Committed files use paths **relative to the repo** (or to a
    sibling, `../../wasmtk/…`), an environment variable, or a placeholder (`<repo-root>`,
    `<scratchpad>`); the real absolute path lives only in the gitignored `cmem/local/`.
    **The test is "is it machine-specific?", not "is it absolute?"** (owner, 2026-10-23, recorded
    in wazmrt `working-rules.md:186-188`): a CONVENTION path that names nothing about one machine
    and works on any comparable host is fine in a committed file — e.g. `C:\zig-cache\wazmrt` as a
    `ZIG_LOCAL_CACHE_DIR` on any Windows host with an NTFS `C:`. A path that records this owner's
    layout is not: a user profile, `D:\Programs\…`, a `J:` drive, a scoop or AppData install, a
    scratchpad or session id. The scan below finds CANDIDATES; each hit is judged by that test. Tool
    settings that record paths (`.claude/settings.local.json`, IDE workspace files) are never
    tracked. Scan: `git grep -I -n -i -E '[A-Za-z]:[\\/]+(Programs|Users|scoop|tools)[\\/]|/[a-z]/(Programs|Users)/'`
    (2026-10-22 it found 18 public files in 5 repos — letter H18). **Scan BINARIES too** (2026-10-26,
    binaryang and wasmtk the same day): `-I` skips them, and committed `.wasm` / object files
    carried the owner's profile, scoop and project paths in DWARF / debug info (binaryang's five
    `benches/**/*.wasm`, wasmtk's `fib-zig_mod.wasm`) through every earlier scan. Run the pattern
    with `-a` as well (or over every blob of every ref before a purge: `git rev-list --objects
    --all | git cat-file --batch-check`, then `grep -a` each blob), and strip debug sections from
    fixtures that do not need them.
  **The one exception — a maintainer contact email for a published package** (owner, 2026-10-23):
  a project that publishes to a language package registry may carry ONE contact email for its
  maintainer, in the manifest's maintainer/author field that the registry reads (e.g.
  `pyproject.toml` `authors`/`maintainers` for PyPI, the POM `<developers>` entry for Maven
  Central, `vcpkg.json` `maintainers`, `package.json` `author` for npm, `Cargo.toml` `authors`
  for crates.io) and so in the published package's metadata, **and as the git commit
  author/committer address** (🔒 owner, 2026-10-26: "the email exception is the maintainer email
  address, which is the official exception" — it is the ONE exception, and it covers commits too).
  **and — 🔒 owner, 2026-10-26 ("the maintainer address can carry to every repo") — in ONE place
  in the repo's committed `cmem/` where it names the maintainer contact** (a collaboration or
  overview note, as LeptonPad's `cmem/collaboration.md` does), whether or not the project publishes
  anywhere. Nowhere else: not repeated through `cmem/`, not in README text, issues, scripts or
  this workspace memory. *(History: 2026-10-23 manifest field only; 2026-10-26 morning commits
  too; 2026-10-26 evening the LeptonPad ruling, then generalized by the owner the same evening.)* The address is the owner's choice and is not repeated in
  memory. The H19 history purges leave these manifest fields as they are (a tagged tree stays
  byte-identical anyway). Measured 2026-10-23: present in loader-py and loader-jvm (both publish:
  allowed) and in rsxtk's `Cargo.toml` (rsxtk publishes to crates.io as `rsxtk` — allowed;
  corrected 2026-10-23 from "publishes nowhere").
  Already-public identifiers are fine: the GitHub org/user in a repo URL, registry scopes and
  package coordinates (`@jrmarcum`, `io.github.jrmarcum`), commit authorship git records anyway.
  Where private facts must be kept, they go in the repo's **gitignored** `cmem/local/` (and the
  `.gitignore` line is checked with `git check-ignore -v` before the first write), or nowhere.
  **Commit metadata:** the author/committer address may be the maintainer contact email (the
  exception above, 🔒 owner 2026-10-26) or the GitHub noreply address — either is fine, and no
  `user.email` change is required. *(Superseded wording, 2026-10-22 → 2026-10-26: "noreply only",
  with wasmrt waived on 2026-10-23 — wasmrt `cmem/roadmap.md:246-253`; that waiver is now simply the
  rule. The five repos that rewrote their history to noreply in that window — -dotnet, rsxtk,
  wazmrt, wasmtk, -c — leave it as it is.)* The address itself is still not written into `cmem/` or
  this memory — call it "the maintainer address". 🔒 **History is purged of personal information**
  (owner, 2026-10-22: "a necessary thing for security"; letter H19) — since 2026-10-26 that means
  drive paths and any other personal fact, NOT the commit address.
  **Before committing memory, scan the diff** for the patterns above; a secret that reached a
  remote is ROTATED, not just deleted — history and caches keep it (py rotated one).
