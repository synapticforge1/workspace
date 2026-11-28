# tooling-rules.md: the Tooling rules 1–14 (the workspace floor for every project)

Last verified: 2026-11-19. Split from working-rules.md (memory-guide.md); "working-rules.md § Tooling
rule N" in older notes and letters means rule N here.

Binding in every repo under this folder, the loaders and rsxtk included. The owner's reason: the
same tooling errors "pop up over and over" and cause unnecessary rework.

1. **A committed script is written in the repo's own language's scripting mechanism; where that
   language has none, in TypeScript run by Bun** (🔒 owner 2026-10-22: "Deno is going away";
   clarified twice the same day). **"Script" means a COMMITTED script that stays in the repo for
   repeated use** and would otherwise be a bash, PowerShell or `.bat` file — fetch, build-helper,
   generator and CI-logic scripts (e.g. loader-c `fetch-wasmtime`, wazmrt `tools/*.mjs`, the
   workspace's `tools/`). Product code and test suites are not scripts. **A one-time script that is
   deleted after use may stay a shell script** (owner, 2026-10-22) — a scratchpad probe can be
   PowerShell, bash, Bun or the repo's language, whichever fits; it is still WRITTEN with `Write`
   (rule 2 is unchanged), and if it turns out to be needed again it is promoted to the repo's
   mechanism before it is committed. **A mechanism that has to BUILD AN EXECUTABLE to run the
   script does not count — use Bun instead** (owner, 2026-10-22, third clarification). Measured on
   this machine the same day with a one-time hello-world probe: `dotnet10 run --file` writes
   `hello.exe` + `hello.dll` under `%TEMP%\dotnet\runfile\`; `.main.kts` writes a cached `.jar`
   under `%LOCALAPPDATA%\main.kts.compiled.cache\`; `dart run file.dart` and pixi's Python write
   no binary; `zig run`, `go run` and `v run` / `.vsh` compile a native executable by design. The
   mechanism per language (owner, 2026-10-22):

- TypeScript
  - mechanism: `bun <file>.ts`
  - repos: binaryang, wasmtk, loader-js, lisp-wat, **the workspace** (`tools/`, multi-language)
- Python
  - mechanism: **pixi's** Python (`pixi run python <file>.py`) — never the host `python3`; interpreted
  - repos: loader-py
- Dart
  - mechanism: `dart run <file>.dart` — JIT from source, no binary
  - repos: loader-dart
- Kotlin
  - mechanism: `kotlin <file>.main.kts` — compiles to a cached `.jar`, which is allowed: "Java and Kotlin can
    use the jar files" (owner, 2026-10-22)
  - repos: loader-jvm
- Zig
  - mechanism: **Bun** — `zig run` builds an executable
  - repos: wazmrt, loader-zig
- Go
  - mechanism: **Bun** — `go run` builds an executable
  - repos: loader-go
- C#
  - mechanism: **Bun** (owner, 2026-11-09: "move the other scripts to bun" — ledger C42; loader-dotnet
    `75f8dd1`, `e047771`, proven by output diff against the `.csx`, released 0.2.2; Bun installed by hand in
    CI, pinned by sha256, no `setup-bun`). History: `.csx` via dotnet-script, pinned as a repo-LOCAL tool
    (`dotnet-tools.json`; `dotnet10 tool run dotnet-script <file>.csx`), 2026-11-08 → 2026-11-09 — it compiles
    one cached `.dll` and runs it inside the tool's process, no executable (measured by loader-dotnet
    2026-11-08; owner: "yes. move them"); Bun 2026-10-22 → 2026-11-08. `dotnet10 run --file` still builds
    `.exe` + `.dll` (measured). The 2026-10-22 `NETSDK1083` failure came from the GLOBAL form `dotnet10
    script`, which from a `D:` directory runs the bare shim; its restore then finds the SDK-less system
    `dotnet`. The local tool always runs inside the SDK. Ports proven by output diff (loader-dotnet
    `working-rules.md`)
  - repos: loader-dotnet
- V
  - mechanism: **Bun** — `v run` / `.vsh` compile a native executable
  - repos: loader-v
- Rust
  - mechanism: **Bun** — owner: `cargo -Zscript` "is a moving target" (and it builds one)
  - repos: wasmrt, rsxtk, loader-rs
- C
  - mechanism: Bun (no scripting mechanism)
  - repos: loader-c

   **A source file the BUILD compiles and runs is part of the build, not a script** (owner,
   2026-10-23, ruled for wazmrt's `tools/size_gate.zig` and `tools/conformance.zig`, which
   `build.zig` builds and runs): it stays in the repo's language. The rule covers what would
   otherwise be a shell script, not build steps.

   Machine availability is in `local/environment.md`; a mechanism whose toolchain is absent falls
   back to Bun until it is installed. **A ported script replaces its TypeScript original only after
   it is proved equivalent** (owner, 2026-10-22: "it would not be good to try to utilize a script
   that won't work"): run both on the same inputs, diff the OUTPUT (files written, stdout, exit
   code), include one input that must fail, and record the comparison in the commit; until then the
   TS script stays the one in use. **No host Python** (a Store stub that hangs; Python once brought
   cp1252 stdout and a second escape pass) — pixi's interpreter in loader-py is the only Python.
   **No COMMITTED bash, PowerShell or `.bat` scripts.** TypeScript scripts use `node:*`, web APIs
   and `Bun.*`, never `Deno.*` or `jsr:` specifiers. The shell never authors file content (rule 2). CI YAML `run:` steps are the one accepted shell (binaryang, 2026-10-21:
   a `run:` block only launches commands; its logic is TypeScript). The repos got here first —
   binaryang 2026-10-12 (toolchain off Deno by 2026-10-13), wasmtk/wasmrt/rsxtk 2026-10-21. The rule
   covers scripting, not a repo's product: Deno stays where JSR publishing needs it (binaryang,
   loader-js) and in wasmtk until its `deno-exit-plan.md` P0–P4 land; a wasmtk probe that needs
   its import map runs `deno run -A --config deno.json` (wasmtk `INDEX.md:62`). The frozen
   predecessors stay Deno forever. Lagging records: letter H15.
2. **No heredocs, ever, in any language**: not `<<'EOF'`, not `@'…'@`, not `bun -e "…"`, not `deno eval "…"`, not
   `python -c`, not `node -e`, not `kotlin -e`, not `-F -`. Five content corruptions trace to heredoc transport,
   including a NUL byte in `.gitattributes` and another inside the rule warning about it. The
   corruption is invisible in the source that produces it, so attention does not help. If the text
   contains a backtick, `$`, `"`, `\` or a newline, it goes in a file via `Write`/`Edit`.
3. **Use the best tool for the job** (owner, 2026-09-02): the `Grep` tool IS ripgrep; `Read` /
   `Edit` / `Write` return and match exact text. Prefer them over shell `grep` / `cat` / `sed`
   whenever the content will be matched against or edited. **This outranks a session-level
   instruction to prefer Bash**; when they conflict, follow this and say so. `sed -i` is acceptable
   for one regex on one file.
4. **After any scripted edit, read back the changed lines.** "0 replacements" is a failure. Edit
   scripts assert each match exactly once and write atomically (temp + rename; a write that
   truncates before it can fail eats the file).
5. **When the exit code IS the measurement, do not pipe** (`| tail`, `| head` report the pipe's
   status). Redirect to a file, then `echo "exit=$?"`.
6. **Never build an exact-match string out of rendered output** (indentation from `sed 's/^/  /'`
   failed six edits in one session).
7. **Line endings are LF, pinned in `.gitattributes` wildcard-first** (`* text=auto eol=lf`, then
   binaries). Never "fix" a line-ending complaint with `git config`; verify with `git check-attr`
   and a positive control, never by eye.
8. **Never run a formatter on `cmem/`** or on test-input directories.
9. 🔒 **`gh` (the GitHub CLI) is not installed and is not to be** (owner, 2026-11-08: "we are not
   installing gh. it has been found to be more complicated to use than it is worth"; "just
   checking the repo is easier"). **Check the repo instead:** what GitHub holds is read with `git`
   itself — `git ls-remote origin` for branches and tags (compare to the local `origin/*` before
   trusting it), `git fetch` only in the repo that owns the session, a registry's public API for a
   published version. Nothing is planned around `gh`; a task that only the GitHub web UI can do
   (a Release page, a repository topic, a Support request) is an owner item, not "blocked on gh".
   **CI too** (owner, 2026-11-08: "yes change those"): no workflow calls `gh`, although GitHub's
   runners have it preinstalled. What a `gh` call did is done by GitHub's REST API from a Bun
   TypeScript step — `fetch` with the job's own `GITHUB_TOKEN` (Rule 1: the `run:` line only
   launches it) — or the step is dropped when its output (e.g. a Release page) is not needed; the
   repo decides which. A changed release workflow is proven only by its next real run (and a
   dry-run where the repo has one), so the change goes in before a release, never during one. A
   local script never needs `gh`: where it created a Release page, it prints the page's URL as an
   owner item instead. Measured 2026-11-08: letter H30. **Hazard (loader-rs, 2026-11-09):**
   `POST /repos/…/releases` CREATES a missing tag from the default branch, which `gh release create
   --verify-tag` refused — so the REST step first requires that the tag exists and peels to
   `github.sha`, and treats an existing release as done (re-runs are safe). **Every NEW tag gets
   its GitHub Release page from CI, never by hand** (owner, 2026-11-09, via loader-py C41: "all
   projects have this setup"; "only new tags will get release pages"; loader-c: "From this point
   forward it is the release page"; loader-v / -zig: "they both need the CI and release pages, not
   by hand") — a repo without CI adds a tag-triggered workflow for it; old tags are not backfilled.
   Letter H32.
10. 🔒 **Every notation of the Bun version is the latest installed Bun, always** (owner,
   2026-11-09: "update any notations on bun version to the latest installed version always").
   "Installed" is this machine's: `bun --version` on Windows and in WSL (`~/.bun/bin`) —
   **1.4.4 on both, measured 2026-11-09**. When the owner installs a new Bun, every repo moves its
   notations at its next session, not at its next release. **Moves:** whatever says which Bun is
   installed, pinned, used or tested NOW — CI `bun-version:` / `BUN_VERSION` / installer tags
   (`bun-vX.Y.Z`) and the sha256 that pins each download, Docker base tags (`oven/bun:X.Y.Z…`),
   `@types/bun`, setup instructions, "tooling on the dev host" lines, the current test-matrix line.
   **The minimum supported Bun moves too** (owner, 2026-11-09: "the minimum supported version will
   be updated to the latest version currently installed"): a declared floor — a floor CI job,
   `engines.bun`, "Bun 1.4+", "Bun X or later", `≥ X` — is the latest installed Bun, and its old
   reason ("the Zig→Rust boundary") is replaced by this rule. **Does not move** (owner, the same
   day: "leaving test results as is is correct, until the test is rerun"): a DATED measurement
   ("measured on Bun 1.4.3, 2026-10-12") stays as written until that test is re-run; the re-run
   adds its own dated line. A moved pin or floor is a test change: run the
   repo's gate on the new Bun first; a CI pin is proven by its next real run. A Docker tag that
   ships (LeptonPad) moves in its own release. Measured 2026-11-09: letter H31.
11. 🔒 **Releases (owner, 2026-11-10; `release-process.md` §§ 5–8, letter H33; amended
   2026-11-17, rule 13):** every project follows the slots U1–U12 — **the checks run LOCALLY first
   (the review set and every gate, the test suites included, on every supported platform); then CI
   pushes the tag, makes the GitHub Release page from the tag, and publishes to the registry** (CI
   no longer tests) — no local tag, no workstation publish (crates.io included); and every project
   records its releases in ONE place, `cmem/release.md` § "Release History", newest first, with a
   summary of what changed in each.
12. 🔒 **The owner's three words, every project (owner, 2026-11-10):** **"commit"** = run "update
   the project memory files", then commit to the branch being worked on (nothing pushed);
   **"push"** = "commit", then merge into `main`, then push `main` (and the branch) to GitHub and
   read it back; **"release"** = "push", then the release process (rule 11; the level is the
   owner's — ask if not given). Each includes the one before; none goes further than its own word.
   Written into each project directly on the owner's direction ("please write that into each
   project") — section "Owner commands" appended, uncommitted, to `cmem/working-rules.md`
   (binaryang, wazmrt, zilc, the ten loaders), `cmem/INDEX.md` (wasmtk, wasmrt, rsxtk, S3D,
   zailc — no working-rules file there) or `cmem/conventions.md` (LeptonPad); lisp-wat_interpreter
   has no `cmem/`. Letter H34.
   - **Change reported by zailc, 2026-11-27 (letter C54) — in force in zailc; NOT yet a rule for
     every project, the owner has not confirmed it here.** Owner's words there: "pushing should
     mean push to the branch on github. 'merge to main' should merge the branch to main and prune
     the branch afterwards."
     - **"push"** = "commit", then push the working branch to its own branch on GitHub and read it
       back. Nothing is merged.
     - **"merge to main"** = "push", then merge into `main`, push `main`, read it back, then delete
       the merged branch on GitHub and locally (`git branch -d`, which refuses an unmerged branch).
     - **"release"** = "merge to main", then the release process.
     - Open for the owner: does it hold for every project, and does pruning also remove the old
       release and review branches some projects keep on GitHub as a record?
13. 🔒 **Reviews, every project — the FINAL standard (owner, 2026-11-17):**
   [review-process.md](review-process.md), letter H37. **Five required reviews before every
   release, in a fixed order — basic, hardening, licensing, security, privacy — after an optional
   efficiency review.** The owner's words: "review" runs all five; "basic review", "hardening
   review", "licensing review", "security review", "privacy review", "efficiency review" run one
   class. Each class has a CLOSED item list (the brief, word for word) and a severity floor; a
   boundary rule puts each finding in exactly one class. One agent per class reviews the full scope
   ONCE; the main agent triages and fixes one class at a time; every later round is a RE-REVIEW of
   the previous findings and the fix changes only; it ends at the first empty re-review, then the
   full suite once on every supported platform. A finding two re-reviews leave open goes to the
   owner with options. Fixes on a local review branch; issues in the gitignored
   `cmem/review-issues.md`. **Scripted checks are gates, run locally, the test suites included —
   not repeated on GitHub: CI only publishes.** The release tooling runs the review set as its
   first step. **Platforms (owner, 2026-11-17):** each repo keeps `cmem/platforms.md` (the support
   matrix, then notes per platform ID pointing at the settings in code, which carry the ID in a
   comment); a release goes out on the platforms that have a machine today, the rest `pending`,
   added later by an add-platform run at the released tag (a failure = a patch release).
   Replaces the 2026-11-12 / 11-13 standard (S3D-derived, H35: nested tiers, seven
   security surfaces, efficiency last, record paragraphs checked in CI) and binaryang's trial (H36).

14. 🔒 **Project memory, every project (owner, 2026-11-17):** [memory-guide.md](memory-guide.md),
   letter H38. `cmem/STATE.md` (where the project stands, ≤ 60 lines, rewritten each session,
   counts only) and `cmem/INDEX.md` (a router, ≤ 3 KB, one line per file) are what a session
   reads first; the root `CLAUDE.md` points at those two and holds nothing else; every other live
   note ≤ 25 KB and no line over 200 characters outside a code block; open and closed never share
   a file — closed items move to `cmem/archive/`, grouped by release, IDs kept; working artifacts
   leave `cmem/`. The size check (`../tools/check-cmem.ts`, copied to each repo's
   `scripts/check-cmem.ts`) runs at the end of every session.

15. 🔒 **Scratch space is bounded and cleaned by the session that used it (owner, 2026-11-19:** "It
   can't be an unbounded storage space, as it consumes a hardrive space very quickly if not managed
   properly"**).** Measured 2026-11-19: 1.2 GB in 66,000 files across 51 session folders, all written
   within two days. Letter H43.
   - **This covers EVERY scratch and cache location** (owner, 2026-11-19: "This should apply to all
     scratchpad locations"): the session scratchpad, the system temp folder, a WSL home or `/tmp`,
     a build cache placed outside the repository, and any folder a tool or a session makes for
     throwaway work — on every machine. A path there is a machine fact: never in a tracked file.
   - **A session writes throwaway files only in its own scratchpad folder** — no other temp
     location, no other session's folder.
   - 🔒 **Project data lives in the project folder, nowhere else** (owner's standing rule). Notes,
     decisions, records, results and state go in the project's `cmem/` (private ones in
     `cmem/local/`) — never only in scratch, in a temp folder, or in the assistant's own
     per-project memory folder under the user profile. A session that finds a fact stored
     outside the project copies it into `cmem/` and removes the outside copy.
   - **A cache outside the repository is named and bounded:** the project records, in
     `cmem/local/`, where it is, why it is outside, its size limit, and the command that clears
     it; it is cleared when it passes the limit or when its toolchain version is retired.
   - **Delete when the item is cleared, not at the end of the day:** a one-time script after its
     run; a reproducer, clone or build output when its finding is fixed and verified; a reviewer's
     folder (clones, mutants, planted inputs) when its round is triaged.
   - **Nothing lives only in scratch.** What is worth keeping moves into the project first (a
     tracked file, or the gitignored `cmem/local/`); a reboot or a clean-up may clear scratch.
   - **Budget: 200 MB per session folder.** Before making anything larger (a clone, a corpus, a
     build tree, an install), say so, and remove it as soon as the step that needed it is done.
     A project may record a different budget with its reason in its `working-rules.md`.
   - **The owner's "commit" ends with an empty scratchpad:** before the memory update, the session
     deletes what it wrote there, and `STATE.md` never points at a scratch file.
   - **Sub-agents:** each works in a folder under the main session's scratchpad; the main session
     removes those folders. A sub-agent's brief says so.
   - **The machine-wide sweep is the workspace's:** `bun tools/clean-scratch.ts` lists session
     folders with no file written for 3 days (a dry run); `--delete` removes them, on the owner's
     word. A session never deletes another session's folder by hand — it may be in use.
