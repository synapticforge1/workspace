# handoffs.md — letters from the workspace to the repos

🔒 **Role (owner, 2026-09-20): the workspace session is the reviewer, the reporter and the
communicator of issues arising between projects, so that each repo stays on task and the common
goals are produced.** Repo sessions do the work inside their repo; this session watches across them,
files what diverges ([divergences.md](divergences.md)) and what drifts
([drift-register.md](drift-register.md)), and tells each repo what it needs to know.

## The mechanism (a pull, never a push)

- A finding for a repo is written here as a **letter**: dated, addressed to one repo, stating the
  observation, the measurement behind it (or UNMEASURED), the row it comes from, and what the repo
  is asked to do. Scratch-level observations do not become letters; hand over the CHECK, not the
  conclusion.
- **Nothing is written into a sibling repo from here.** Each repo's pointer `CLAUDE.md` carries
  one line: *"At session start, read `../cmem/handoffs.md` for letters addressed to this repo."*
  (Two levels up for the loaders; at the top of `cmem/INDEX.md` in binaryang and wazmrt, which
  have no pointer.) ✅ Present in all fifteen repos since 2026-09-20 (owner-directed write, the one
  exception to the rule above, logged here). The repo session reads its letters, acts under its own
  rules, and records the outcome in its own memory.
- A letter is closed here when the repo session's commit is named, or the owner closes it.
- **A new letter takes the next number AFTER re-reading this table** (`grep '^| H'`), immediately
  before writing it: more than one session writes here, and on 2026-10-24 two letters were both
  filed as H23 (the second is now H24). A letter's number never changes once a repo cites it; when
  two clash, the one already cited keeps it.
- The owner is the second channel: a letter that needs a decision is marked 🗓️ OWNER and waits.
- **Every letter, and every repo → repo or repo → workspace item, has one row in
  [workspace-correspondence.md](workspace-correspondence.md)** (from, to, subject, open/closed) —
  the index all repos coordinate from (owner, 2026-10-26). Any project adds rows; **the creator
  of an item verifies and closes it** (the recipient writes its answer and commit into the row);
  **every project reads the ledger before starting new work** so no open item is overtaken.

## The review cadence

- **After any repo's release or merge to `main`**: re-read that repo's `open-work` / `next-work`
  and `unreleased`, refresh its row in [projects.md](projects.md), check every divergence row that
  names it.
- **Before any repo's release**: the compatibility gate ran (surface diff, previous-tag tests,
  consumers' suites), the contract mirror is current (runtimes), the divergence rows it touches
  are classed.
- **On "update the project memory" in the workspace**: sweep every repo's index for new numbers,
  new decisions, new rules; refresh this layer; file letters for anything a repo does not yet know.

### Refresh history (moved from INDEX.md 2026-10-27 — the index holds no status narrative)

**Written 2026-09-20** from a full read of every sibling's `cmem/` and `CLAUDE.md` (the reports are
summarized in [drift-register.md](drift-register.md)). Every number in these files carries that date
unless it names another. **Refreshed 2026-10-22** by a read-only sweep of every repo plus a full
assembler-parity run: projects, contracts, letters, open-work, divergences I7/I12–I16/S1, drift X1–X8;
then the owner's per-language scripts rule (working-rules § Tooling 1) and the morning's loader
commits (H6/H7 in -c, -dart; the unpushed wasmtk stamp); then the exFAT fixes into
`local/environment.md` (letter H16) and H15's closes and amendment (P6 measurement). **Extended
2026-10-26** to the five repos added to the workspace — LeptonPad, S3D-ReportCompiler, ub-cosmic,
zailc, zilc (read-only sweep; projects rows, drift X10–X18, divergences S7/P7/P8, letter H26) —
and the owner's correspondence ledger opened the same day. **Refreshed again the same evening**
("update the workspace items to match with all of the changes"): every repo's git state re-read,
the four repo notes verified by independent checks, six letters closed (H1, H2, H11, H13, H21,
H23), R1–R9 / Z7 / X6 / I8 closed, projects rows for binaryang 2.2.1, wasmtk 3.0.0, wasmrt 2.0.0,
wazmrt 5.0.0, the frozen pair's move and binaryen-ts's purge, LeptonPad's answer; ★ 6.1's commit
id fixed (C8) — § "Status sweep 2026-10-26" below. **Night, the loaders' day:** one
fixture set in all ten ports (digest measured), six loader releases read back, gates in nine, the
five loader notes answered, H7/H17/H24 closed, letter H29 and row S10 filed, loader-go named the
laggard. The folder is now `synapticforge1`
(was `wasmExamples`; 🔒 the ★ stamp now reads `synapticforge1/cmem/best-practices.md` — letter
H27 asks the nine repos with a block to re-stamp and lists the ten prose references to fix; X18).
**Compliance pass 2026-10-27** and **status sweep 2026-10-28** — the first entries under § Letters.

## Letters

**Three testing tiers, 2026-11-19** (owner: "This limits the added testing for each to what is
required"): tier 1 per engine (the TypeScript projects; loader-dart, -jvm, -go), tier 2 one platform
plus an install-and-run smoke check (loader-py, -dotnet, -rs — a native wasmtime under pure code),
tier 3 the full matrix (the native projects; loader-c, -v, -zig). The host module is `host.ts`
(confirmed), and loader-js joined letter H39. **Letter H40** to the nine other loaders.

**Platform testing trimmed for the TypeScript projects, 2026-11-19** (owner: "that way we do not over
test something"): per engine for what they compute, one `host` module per project for every OS call,
an on-demand self-check in it, OS testing only of `host` and only when it changes, a `runtime` matrix
status. In workspace `platforms.md` and `review-process.md` § 12; **letter H39** to binaryang, wasmtk,
S3D and LeptonPad. Also since 2026-11-17: the interim "Tested on" rule (no release waits on an
untested platform), the glibc 2.28 baseline with a musl build for Alpine, 64-bit only.

**The project memory guide adopted, 2026-11-17** (owner's document, pasted to the workspace with its
size check): `memory-guide.md` in the owner's words, the script as `../tools/check-cmem.ts` (run here
on every working tree — it agrees with the owner's table for 15 of 18; S3D, zilc and wasmtk read
higher with their unpushed / uncommitted notes), Tooling rule 14, the root pointer, **letter H38** to
the 18 repositories. Three questions left with the owner: the ★ best-practices copies, LeptonPad,
and the workspace's own `cmem/` (327 problems; the ledger alone is 506 KB).

**The final review standard adopted, 2026-11-17** (owner's document "Review standard — final", pasted to
the workspace): `review-process.md` rewritten from it in the owner's words — five required reviews
(basic, hardening, licensing, security, privacy) after an optional efficiency review, closed item
lists, boundary rules, severity floors, one fix-and-verify loop, the gitignored issues file, gates
and tests local, CI only publishes, six platform IDs. Folded into `working-rules.md` (Tooling rules
11 and 13), `release-process.md` § 5 (U1, U5: the checks move from CI to the local review set) and
the root pointer. **Letter H37** filed to every project with the six per-repo work items; **H35 and
H36 closed as superseded.** Owner's own item: the two test machines.

**Letter H36 filed, 2026-11-15** (owner: binaryang's reviews keep expanding; "just the recommended
for now"): focused single-class review runs, sent to binaryang for its TRIAL only — a frozen class
card, one hunt round, at most two fix-check rounds, two-list reviewer reports, limits on the main
session, nesting as a queue. `review-process.md` is NOT changed; three edits to it (§ 1.4's "axes
earlier rounds did not cover", the brief's "not exhaustive", the stop rule) wait for the owner's
fine tuning.

**"commit" 2026-11-12, 13:15** (owner): the workspace memory re-checked against every repo — nothing
moved since the 13:06 sweep; the H35 work (review standard) is recorded. The workspace folder is
not a git repository, so "commit" here ends at the memory update; nothing to commit, nothing pushed.

**Memory update 2026-11-12, 13:06** (owner: "update"; every repo re-read, each new tag's tagger and
page through the REST API, every registry read): **twelve projects released in the owner's order
since 2026-11-10** — binaryang 3.0.3 / 3.0.4, S3D 1.4.0 / 1.5.0, loader-js 2.0.3, rsxtk 0.5.2,
loader-rs 1.0.5, loader-py 2.0.6 (2.0.4 tagged and paged but never published — the order's cost,
fixed in 2.0.5), loader-jvm 0.4.3, loader-dart 0.3.3 (pub.dev OIDC), loader-go v0.3.5, loader-v
2.0.4, loader-zig 2.1.2, LeptonPad v2.15.6 / v2.15.7 — every public tag and page by
`github-actions[bot]`; a CI-made tag publishes to JSR (U6's question answered). **H30:** wasmtk done
(13 / 14; zailc left). **H33 / H34:** fourteen repos carry both on `origin/main`; wasmrt, wazmrt,
zilc, zailc, loader-dotnet not yet. **C45** (wasmtk: no `release/<tag>` branch) answered by -js and
-jvm, folded into U7. **C46** (S3D: its review process for every project) — not yet acted on.

**Release processes made semi-uniform, 2026-11-10** (owner: "write up each projects release
process. we need it to be semi-uniform"; answers C44): every releasing repo's workflows, scripts
and release records read at `origin/main` (zailc at local `main`) in one fixed schema;
`release-process.md` gains § 5 (U1–U12), § 6 (per ecosystem), § 7 (one card per project with its
"To converge"), § 8 (D1–D3 for the owner). Letter **H33** filed. Most common gaps: no guarded
release script or two pushes / `tag -f` (13 repos), provenance not read back fatally in CI (all
but binaryang, loader-js, wasmtk), unpinned actions or tools (wasmtk, wasmrt, S3D's Bun, loader-c,
zailc); wasmrt publishes from the workstation; loader-py keeps a local publish path.

**Memory update 2026-11-10, 09:47** (owner: "update the project memory files"; every repo re-read,
each new release on its registry and its Release page through the public REST API): **released
since yesterday noon** — binaryang **3.0.2** (a major; JSR + npm), wasmrt 2.0.1, rsxtk 0.5.1 (its
first CI release), LeptonPad 2.15.4, loader-go v0.3.3, -jvm 0.4.2, -py 2.0.3,
-rs 1.0.4, -dotnet 0.2.3 — every new page by `github-actions[bot]`; loader-js wrote `SPEC.md`
**4.0.1** (a § 11.1 clarification, from C35). **Closed by the workspace:** H8 (wasmrt's side
verified), H27 and H28 (rsxtk, the last addressee), drift X18. **H30:** binaryang and wasmrt done —
twelve of fourteen; wasmtk done locally (unpushed), zailc open. **H31:** binaryang (floor 1.4.4 too)
and LeptonPad done; zailc, zilc behind. **H32:** rsxtk joined; wazmrt, zilc, zailc to add the job;
wasmtk's is unpushed. **Closed by their creators:** C4, C8, C19, C33, C35, C40, C41, C42. **New:**
C43 (binaryang → wasmtk, npm traps → `best-practices.md` 7.22, answered), **C44 (binaryang asks the
workspace to extend `release-process.md` to every language — not yet done)**. Unchanged: wazmrt,
zilc, zailc, loader-c, -dart, -v, -zig.

**Update check 2026-11-09, 12:28** (owner: "update"): **released, each new Release page read
through the REST API (all `github-actions[bot]`):** loader-c 2.1.1, -v 2.0.2, -zig 2.1.1 (their
first CI-made pages; -v and -zig have CI now), -go 0.3.2, -js 2.0.2, -dart 0.3.2, -dotnet 0.2.2.
**S3D pushed** (0 ahead, `dbd1fa8`) with H30 done and H32's recipe (`0156918`). **H30:** ten of
fourteen done; open binaryang, wasmtk, wasmrt, zailc. **H31:** loader-c and loader-js verified;
behind binaryang, zailc, LeptonPad, zilc. **H32:** seven loaders measured on GitHub; wazmrt, rsxtk,
zilc, zailc to add the job. **C42 (loader-dotnet):** owner moved its scripts back to Bun — verified
and folded into the Tooling table, `CLAUDE.md`, `goals.md`, P6. Unchanged: binaryang, wasmtk,
wasmrt, wazmrt, rsxtk, LeptonPad, zilc, zailc, -jvm, -py, -rs.

**Update check 2026-11-09, 10:35** (owner: "check for updates"): **moved —** seven loaders
released overnight-to-morning, each read on its registry and its new GitHub Release page read
through the public REST API (all by `github-actions[bot]`): -go v0.3.1, -js 2.0.1, -jvm 0.4.1, -py
2.0.2, -rs 1.0.3, -dotnet 0.2.1, -dart 0.3.1; loader-c recorded H30 (`ba94aa7`); S3D one more
task-18 commit (13 unpushed). **H30:** 0 `gh` calls now in -go, -js, -jvm, -py, -dotnet, -dart too
(nine loaders done); open: binaryang, wasmtk, wasmrt, S3D, zailc. **H31:** -dart, -go, -dotnet,
-jvm, -rs, -py verified (record-only); loader-js moved its pins to 1.4.4 without answering yet;
behind: binaryang, zailc, loader-c, LeptonPad, zilc (uncommitted fix). **New rows:** C40
(loader-dotnet: answered, verified; its fetch-time-limit finding → `best-practices.md` 7.21), C41
(loader-py, carrying the owner's "all projects have this setup" for CI-made Release pages) → **letter
H32** filed, three owner questions in `open-work.md`. C31 closed by loader-dart. Unchanged:
binaryang, wasmtk, wasmrt, wazmrt, rsxtk, LeptonPad, zilc, zailc, -v, -zig.

**Memory update 2026-11-09** (owner: "update the project memory files and make a note for all of
the projects to update any notations on bun version to the latest installed version always"; every
repo re-read): **filed letter H31** (Bun notations = the latest installed Bun, 1.4.4 on both hosts;
Tooling rule 10; per-repo lines measured) and its ledger row. **H30 re-grepped at every
`origin/main`** (each = GitHub, `ls-remote`): **0 `gh` calls in loader-rs, loader-v, loader-zig —
verified, those three done** (loader-rs 1.0.2's GitHub Release made by its REST script, read back
through the API; loader-v 2.0.1 and loader-zig 2.1.0 cut by their new `release.ts`). ⚠️ **Correction
to H30:** its "no `gh` found in … loader-v" was wrong — `scripts/release.ts:117`–`:124` ran it
(found by loader-v; fixed in 2.0.1). Still calling `gh`: binaryang, wasmtk, wasmrt, S3D, zailc,
loader-go, -js, -jvm, -dotnet, -dart, -py (wasmtk's other hit is the vendored spec corpus's own
upstream workflow, `tests/module/wasm_wast/testsuite-main/.github/` — not wasmtk's CI, not counted).
loader-rs's hazard (the REST create makes a missing tag) is now in Tooling rule 9. **Released since
last night:** loader-rs 1.0.2 (crates.io), loader-v 2.0.1, loader-zig 2.1.0 (both took loader-c
2.1.0's `uwl_err`); C38 and C39 closed by loader-v. S3D: 12 unpushed, 4 uncommitted (its task 18).
Unchanged: wasmtk, wasmrt, wazmrt, rsxtk, zilc, zailc (24 unpushed), binaryang (9), LeptonPad,
loader-go, -js, -jvm, -py, -c, -dotnet, -dart.

**Memory update 2026-11-08, night** (owner: "update the project memory files, then list any open
items"): **SPEC 4.0.0 day.** The owner decided H29's SPEC question on 2026-11-07; loader-js
released `SPEC.md` 4.0.0 as 2.0.0 and asked the nine ports to re-align (C29); by tonight all ten
are released on it — measured: every `origin/main` = GitHub (`ls-remote`), every tag on GitHub,
each declares 4.0.0, registries read back (JSR + npm -js 2.0.0, PyPI 2.0.0, crates.io 1.0.1,
Maven Central 0.4.0, NuGet 0.2.0, pub.dev 0.3.0, Go proxy v0.3.0; -c, -v, -zig tagged 2.0.0).
loader-zig moved to Zig 0.17.1 and pushed everything; loader-jvm purged its history (H19 — the
2026-10-26 "no purge needed" had missed it; every branch / tag tip clean today); loader-go came
under the floor. **Closed by the workspace:** H15, H22, H25 (loader-go the last addressee), H29.
**Narrowed:** H6 → wasmtk H6.5b only; H27, H28 → rsxtk only; H19 → the GitHub Support requests.
**Answered (creators close):** C31 (-dart), C35 (-go), C36 (-jvm, its pre-purge ids translated
through its map), C37 (-zig), C38 (-v). **Divergences:** S8, S9, S10 CONVERGED by SPEC 4.0.0 (S9's
residue is C39). **Also recorded:** the owner's C# tooling change (`.csx` via a repo-local
dotnet-script — made in `working-rules.md` / `CLAUDE.md` by loader-dotnet, owner-directed, C32);
S3D 1.3.0 (9 unpushed); zilc's sarcasm port (11 uncommitted). Unchanged: binaryang (9 unpushed),
wasmtk, wasmrt, wazmrt, rsxtk, zailc (24 unpushed), LeptonPad.

**Update check 2026-11-07** (owner: "check for updates"; every repo and the ledger read since the
2026-11-05 evening update): **moved —** zailc (24 commits, ALL unpushed: the clean slate in Zig
0.17.1 with zilc as its corpus, first release 0.0.1 / nightly, TypeScript syntax, libc, stages,
memory model; answered C22–C25 and filed **C28** to zilc), zilc (libc++ / libc++abi in `zig build`,
a sarcasm port begun; pushed), S3D (**1.2.0** 2026-11-06, zip input, two full reviews; JSR + npm
read), binaryang (9 unpushed: `wasm-objdump -x`, CL12 DESIGN). Unchanged: everything else.
**Filed:** divergence **I17** (zail and wasic both compile TypeScript syntax — UNMEASURED, an owner
question). **Updated:** `projects.md` (zailc, zilc, S3D, binaryang rows; the zilc ⇄ zailc line),
the root pointer's zailc role, `open-work.md`, `local/environment.md`. No row for the workspace to
close: C22–C25 and C28 are zilc's and zailc's.

**Memory update 2026-11-05, evening** (owner: "update the project memory files, then list any
open items"; every repo's state re-read): `projects.md` rows for binaryang (R15 record, 4
unpushed), wasmtk (`upstream:link` fixed, re-clone), wazmrt (WIP landed: the exFAT test skips
fixed; still on Zig 0.16.0), S3D (1.1.6, 1.1.7), zilc (Zig-built patched clang, Fil-C without
GCC, parity; 7 uncommitted), LeptonPad (2.15.3); `open-work.md` unpushed list and the host Zig
(**0.17.1 on PATH now**, measured); `local/environment.md` toolchain lines. No ledger cell changed.

**Open-item review 2026-11-05** (owner: "review any open items and close them if they have been
responded to"; only rows the workspace CREATED can be closed here — the ledger rule):
- **No ledger cell was written by any repo since 2026-10-30.** Repos moved since: S3D (1.1.6,
  1.1.7), zilc (Zig-built patched clang, GCC-free chain, parity records; 7 files uncommitted),
  LeptonPad (2.15.2, 2.15.3; local `dev` 2 ahead). Unchanged: every other repo.
- **Closed: H20** — its last parts measured (S3D's releases from the org on JSR and npm; loader-py's
  Trusted Publisher record). **Answered, creator to close: C19** (LeptonPad) — verified; one stale
  pre-purge LeptonPad id found in `projects.md` and translated.
- **Still open, waiting on a repo that has not moved:** H10, H12 (wasmtk); H15, H22, H25 (loader-go
  only); H27, H28 (rsxtk, loader-go); H29 (the loaders); H19 (only the owner's GitHub Support
  requests). Rows the workspace already answered, waiting for their creators to close: C10, C14–C18
  (wasmtk and five loaders), C23–C25 (zilc), C26 (binaryang). Waiting on zailc: C22, C24.
- ⚠️ **Correction, same evening:** this review MISSED H5, H6 and H8 — its row filter expected one
  space after the id and the oldest rows are written `| H5  |`. Re-run with `^\|\s*([CH]\d+)\s*\|`.

**Ledger update 2026-11-05, evening** (owner: "update the workspace correspondence"): the ledger
was written at 17:10 by repo sessions after the review above — **closed by their creators, today:**
C3 (binaryang), C10, C11, C12 (wasmtk), C26 (binaryang — wasmtk re-cloned `upstream/binaryang`,
`e24d885d`; wazmrt translated its two ids, `cb7e7c4`). **Closed by the workspace:** H5 (B1–B6
read at binaryang `origin/main`; B7's corrected letter sent 2026-10-23; drift B1–B7 ✅). **H6
narrowed:** S3D's CI now repeats the gate on the tag; open: wasmtk H6.5b (owner) and loader-go.
**H8** stays open (wasmrt's sweeps; wasmrt unchanged since 2026-10-27). Nothing else answered: H10
and H12 are untouched by wasmtk's memory update today.

**Re-review of the five creator-closed rows, 2026-11-05** (owner: "rereview and check on the C3,
C10, C11, C12, and C26 statuses"). Each was closed by its creator (binaryang: C3, C26; wasmtk: C10,
C11, C12), as the ledger rule requires. Every closing claim re-derived here, read-only; each repo's
local `origin/main` first matched against GitHub with `git ls-remote` (13 repos, all equal), so no
fetch was needed. **All five stand.**
- **C3:** binaryang `cmem/best-practices.md:140` cites `8d9ba0cb9 (was b8fafaa3f …)`, which is on
  `origin/main` ("pin npm:binaryen to 132", 2026-09-12). Residue, not a reopen: binaryang
  `cmem/open-work.md:76`, inside its dated 2026-10-26 state paragraph, still says it is "waiting on
  the workspace" for that 6.1 change — stale since the re-copy; binaryang's to tidy.
- **C10:** H11 `closed`; H22's wasmtk ✅ `4084d37c8b2` in this file; W10 / W11 in `open-work.md`
  (L126, L134); `projects.md` wasmtk row at 3.0.0; `4a5c3cf668d` is on wasmtk `origin/main`.
- **C11:** nine loaders' `fixtures.json` on `origin/main` carry the full `4a5c3cf668da2c5c…`; the
  replaced ids `84b3e180eba` / `951fd35a` survive only in four old → new chains (-c `handoffs.md:21`,
  `overview.md:223`; -dotnet `overview.md:104`; -dart `testing.md:25`) — as the row says; no other
  repo quotes them. **loader-zig** (not named in the close, and it quotes no wasmtk id on GitHub):
  its stamped fixtures exist only in its 3 UNPUSHED commits — `origin/main` has no `fixtures.json`.
- **C12:** `97c2c0375` and the fix `12e6c042d` are ancestors of binaryang `origin/main`, and tag
  `v2.2.2` contains the fix; `tests/wabt-ts/validator/delegate_depth.test.ts` exists;
  `api-surface.json` lists `Module._inner`, `Module.emitBinary`, `bundle`; `cmem/bundle.md:127`
  records the address-0 hazard.
- **C26:** `wasmtk/upstream/binaryang` HEAD `62b546e2a` (= binaryang `origin/main`), `4fa777a5c`
  an ancestor, `dad09b225` absent, origin the org URL, gitignored by wasmtk. A scan of every tracked
  file in wasmtk and wazmrt at `origin/main` against the map's 383 old ids: wasmtk 1 hit (its own
  note that `dad09b225` is gone), wazmrt 4 (each `new (was old)`, or its record of the
  translation). `c5ab570c3`, `3a2b4e475`, `bc97aa573`, `4fa777a5c` resolve with the expected
  subjects.
**Status sweep 2026-10-30** (owner: "update workspace and project memory files" — the workspace
layer; repo memories are their own sessions' to update. Every repo's git state read since the
2026-10-28 sweep, the ledger's new rows and answer cells read, answers to workspace letters
verified at `origin/main`; nothing written into any repo):
- **Moved:** binaryang (78 commits: **2.2.2 published** 2026-10-28, its **second history
  rewrite** — C26 — Bun B8, code-lens passes, two owner rules), S3D (64: **1.1.0–1.1.5**, now on
  **npm** too by OIDC, `deno.json` gone, C27), LeptonPad (70: **2.13.1 → 2.15.1**, billing work in test mode, the Demo, rounding rules). Uncommitted work in progress: zilc (9 files), wazmrt (10,
  unchanged), LeptonPad (2). Unchanged: wasmtk, wasmrt, rsxtk, zailc, all ten loaders.
- **C26 answered (binaryang → the workspace):** 86 binaryang ids quoted across 5 workspace files
  translated through binaryang's machine-local map to `new (was old)`, by a one-time Bun script
  (dry run, then apply; atomic writes; deleted). binaryang's 28-id table in this file and S3D's
  three pairs in the ledger kept as written (the script skips the old side of any `→` pair).
  ⚠️ Every binaryang id written in this layer BEFORE today's sweep that dates from 2026-10-13 on
  was stale until now — the 2026-10-28 sweep's own ids included.
- **Closed:** H18 (every addressee clean with `-a`; binaryang's blobs purged — all 16 historical
  `benches/**/*.wasm` blobs read). **Narrowed:** H19 (only the GitHub Support requests), H28
  (LeptonPad, binaryang, S3D recorded; open rsxtk, loader-go).
- **Recorded:** binaryang's owner rule "a change that needs an ignore statement is not a fix" as
  best-practices 4.23; whether it and the numeric-ID register bind every repo — owner question in
  `open-work.md`. S3D's npm package and releases in `projects.md` and the root pointer.
- **Not answered yet:** zailc on C22/C24 (no commit since 2026-10-27); wazmrt on C26; **wasmtk on
  C26** — its `upstream/binaryang` HEAD `dad09b225` is a pre-rewrite id (now `4fa777a5c`), so the
  clone still carries the old history (measured read-only).

**Status sweep 2026-10-28** (owner: "update the workspace memory files"; every repo's git state
read — HEAD, upstream, dirty files, tags, commits since 2026-10-27 — the ledger's new rows and
answer cells read, and each answer to a workspace letter VERIFIED in the repo at `origin/main`
before closing; nothing written into any repo):
- **Moved since the 2026-10-26 night sweep:** binaryang (C12 `delegate` fix `12e6c042d (was 0beb14642)`, C21
  traps `54cc098ea (was 899b3fa5d)`; 2 unpushed: the predecessors' yank record), wasmtk `67686067`, wasmrt
  `36091ab` (interop v41 mirrored), wazmrt `826cb8c` (+10 uncommitted files, its WIP), LeptonPad
  (**2.13.0 live**, security hardening, work on `dev`), S3D (toolchain on Bun,
  `2a59c08`), zailc (28 commits: floor, purge, gate, zail-language and Zig-path decisions), zilc
  (35: floor, purge, **`v0.15.2-0.687.1` released**, the pure-Zig track, new role). Unchanged:
  rsxtk and all ten loaders (loader-zig still 3 unpushed).
- **Correction:** the predecessors' JSR versions are ALL yanked, 1.5.1 included (binaryang
  `dd56376bd (was 3e0f7bc1a)`, from JSR's API) — root pointer, `working-rules.md`, `projects.md`, `open-work.md`
  fixed; the ledger's H28 cell carries the correction (letter text left as written).
- **Closed by the workspace:** H26 and H16 (ledger + here); drift X10, X11, X12, X14, X17;
  divergence P7 CONVERGED (one exFAT recipe, 19 of 19). Narrowed: X15 (zilc INDEX 11.5 KB only),
  X18 (rsxtk's stamp only), H15 / H22 (loader-go only), H27 (rsxtk), H19 (owner items only).
- **zilc's rows answered:** C23 (three method lessons) and C25 (one) ADOPTED as best-practices
  7.18–7.20 and 3.17; C24's role re-split written into `projects.md` and the root pointer. zailc
  has not yet recorded C22/C24 (measured).
- **Judged candidates, for the record:** path-scan hits in zailc, zilc, S3D, wasmrt, wasmtk at
  `origin/main` are all placeholders or rule text; wasmtk's two committed `.sh` are inside
  vendored upstream corpora; S3D's `Deno.` hits are comments.

**Compliance pass 2026-10-27** (owner: "review the workspace rules and bring this repo into
compliance" — the workspace layer itself; no repo was written, no letter needed):
- `tools/assembler-parity/` outputs (`*.out`, both `results.json`) carried the old workspace root
  342 times — the assemblers echo the absolute input path in stderr, which `measure.ts` recorded in
  `err`. Redacted to `<workspace>` by a one-time Bun script (counted before and after, written
  atomically, deleted); a rescan of `tools/` read as text AND binary finds 0; both JSON files parse.
  `measure.ts` now scrubs the workspace root (both slash forms) from every recorded message.
- `INDEX.md`: refresh narrative moved to § "Refresh history" above; the scope count re-derived
  (it said eighteen / thirteen; measured 19 git repos present + the `.git`-less lisp-wat folder,
  21 projects recorded) and ub-cosmic's missing folder raised as an owner action
  ([open-work.md](open-work.md)). Bootstrap still ≈ 16 KB — owner action, same file.
- 🔒 **Owner answer, same day: ub-cosmic was "deleted from here and the repo"** — REMOVED. Marked in
  the root pointer, INDEX scope (now twenty projects), `projects.md` (both rows, last state kept),
  `local/environment.md`; X13 closed moot; the ub-cosmic parts of X11, X12, X16, X17, P7 and of
  letters H16, H22, H26, H28 closed moot (letter bodies left as written). Nobody consumed it, so no
  letter. Outside the repo and unmeasured: GHCR images and the Artifact Hub listing — the owner's.
- `cmem/` and `../CLAUDE.md` scanned for drive / profile paths, emails and token prefixes: every
  hit is rule text with placeholders (`<name>`, `…`) or a convention path — clean.
- Not touched, for the owner: three files at the workspace root outside `cmem/` / `tools/` —
  `s3d-lock-before.json` (an npm lockfile of `compiled-reports`, 2026-08-08) and two saved-web-page
  PDFs. Not a rule breach (the folder is never published) but not workspace memory either.

**Status sweep 2026-10-26, night — the loaders' day** (owner: "update the workspace with the
latest project updates"; every repo's git state re-read, every loader's fixture set hashed, every
registry read back; the five loader notes C14–C18 answered in their ledger cells):

- **All ten loaders now carry ONE fixture set, byte for byte** — 11 `.wasm`/`.wit` files, one
  SHA-256 set digest `ff3b3ad8b004` in every port (measured here from each repo's working tree),
  stamped from wasmtk `4a5c3cf668d` (`synapticforge1/wasmtk`): **H7, X8, L3, S4's byte half and
  C13 are CLOSED.** Also measured: `maintenance.strategy gc` in all ten (H16's loader half closed);
  the ★ block with the canonical stamp in nine (-go has none); the path test in nine (-go has none);
  `.claude/` tracked nowhere (H25 (b) closed); loader-dart `CLAUDE.md` clean at HEAD and its
  history purged and force-pushed (H18/H19 for -dart closed); no `github.com/jrmarcum/` link left
  in -js, -jvm, -rs, -dart, -dotnet, -py, -v, -zig (-c: 2 history lines; -go: 6, all the
  deliberate record of its v0.1.0 module path under the old owner, which Go's proxy keeps — not
  stale). Also measured: `fixtures.json` itself is one blob in all ten ports.
- **Released today, read back from the registries:** loader-js **1.1.2** (JSR + npm; the HTTP-error
  fix), loader-rs **0.2.0** (crates.io; first release through its gate), loader-py **1.1.1** (PyPI;
  its memory still says "not yet on PyPI" — it is), loader-jvm **0.2.0, 0.2.1, 0.3.0** (Maven
  Central `<latest>` 0.3.0; publishing now automatic; raw-mode and timeout fixes), loader-c
  **1.1.1** (tag; vcpkg registry files in-repo), loader-v **1.1.1** (VPM, install-verified).
  Unchanged: -dart 0.2.1, -dotnet 0.1.1, -go v0.2.0, -zig 1.0.0 (**3 commits unpushed** — the gate,
  the tests, the ★/privacy record; push = owner).
- **Compatibility gates (H6)** now exist and were inverted in -zig, -py, -v, -jvm, -rs (new today)
  and -c, -js, -dart, -dotnet (before); -go gates on `go vet` + `go test` only (no surface diff —
  UNMEASURED whether one is planned). H6's loader half is done but -go; H6.5b's four waits are
  down to ONE: the owner's go-ahead (fixtures re-stamped, -v and -zig suites exist).
- **loader-go is the laggard:** `cmem/` tracked again (L1 ✅), fixtures + SPEC §10 tests (`d03da9c`),
  but no ★ block, no privacy rule / path test, no H28 record, no surface gate — H6, H22,
  H24/H27/C8, H28 all open for it alone among the loaders.
- **Cross-port behaviour findings the loaders surfaced today — filed as rows and one letter (H29):**
  (1) HTTP-error masking on the `.wasm` fetch (-js fixed `64551fa`; -jvm fixed `462119d`; -dart
  never had it; -dotnet's `.wasm` fetch throws; -py/-c/-go/-rs/-v/-zig UNMEASURED) and the `.wit`
  fallback on a 500 / timeout (SPEC §63 says fall back on "cannot be fetched" — -jvm reads that as
  the spec; -dotnet and -py flag it) — S10; (2) -v's S8 (typed call vs export type) and S9 (missing
  host callback → 0), with -jvm's raw-mode f64-as-bit-pattern defect (fixed in 0.3.0) in S8's class;
  (3) -jvm's HTTP client had no timeout (fixed 0.3.0); (4) `git describe` abbreviation length is
  clone-dependent, so ports COPY the stamp (-dart); (5) force-pushing a rewritten `v*` tag RE-RUNS a
  tag-triggered publish workflow (-dart, three runs; harmless there) — now a floor note in
  working-rules § Git; (6) after a purge, a stale `commit-graph` makes `gc`/`fsck` fail until
  rewritten (-dotnet, C16) — in `local/environment.md`; (7) `grep | head | sed` under `pipefail`
  exits silently when the line is missing (-jvm, -rs `bump.sh`); (8) a git worktree in `%TEMP%` from
  an exFAT repo hits "dubious ownership" (the gitdir stays on exFAT) — use a full clone (-jvm).
- **Owner rulings relayed by the loaders today, now in the record:** 🔒 Bun stands for Safari
  (-js browser matrix); 🔒 -jvm's groupId `io.github.jrmarcum` and package name STAY (Central
  Portal namespace is account-bound; L6 decided); 🔒 -jvm publishes automatically after the tag.
- **Corrections to the loaders' claims (measured):** -py's "v1.1.1 not yet on PyPI" is stale
  (PyPI serves 1.1.1); -jvm's C18 (6) "repo1 serves only 0.1.2" is stale (`<latest>` 0.3.0).
- **Unchanged since the evening sweep:** binaryang (2 unpushed), wasmtk, wasmrt, wazmrt, rsxtk,
  LeptonPad (rewrite awaiting the force-push); S3D, ub-cosmic, zailc, zilc still have not pulled
  H26.

**Status sweep 2026-10-26, evening** (owner: "update the workspace items to match with all of the
changes that have occurred"; every repo's git state read, the four repo notes below verified by
four independent read-only checks, the ledger's answer cells read; supersedes the 2026-10-22 sweep
where they differ — the row's status cell names the commit):

- **Closed today, creator-verified:** H1 (wazmrt `ba205dea7`; wasmrt's mirror is byte-identical to
  wazmrt's v40, which holds the rows), H2 (wasmrt: pointer 3.9 KB, INDEX 7.3 KB, `open-work.md`
  5.0 KB; no duplicated § number; README has no oracle / 99.4 % claim; R4/R6 survive only as
  dated history; R5/R7/R9 text gone — drift R1–R9 closed), H11 (wasmtk's `wasmbundle` runs on
  binaryang's `bundle()`, `d65f4c64377`; binaryang shipped `wasm-bundle` in 1.10.0), H13 (wasmrt
  `scripts/body-parity.ts`, 603/603, `interop.md:556`), H21 (wazmrt v31 `0327fea`; wasmrt mirrored
  through v40 — SHA-256 equal to wazmrt `bd97ae2`), H23 (wasmrt `scripts/carry-forward.ts`,
  `behaviour-s2.ts`, `tests/behaviour.rs` exist).
- **Verified from the notes, still open elsewhere:** H5 (`526d447da (was 8bc2efa1a)` on binaryang `origin/main`),
  H8 (wazmrt; binaryang I5/I6/I8; wasmrt I8 on 1.262 — wasmrt's I3/I4 sweeps against the other
  two unrecorded), H12 (binaryang `a272482ff (was d494438e3)` reserves `./ts2wasm`; wasmtk round 3 NOT converged),
  H16 (wasmtk 1 pack, wazmrt 1 / 2.50 MiB, binaryang 2, rsxtk 1; binaryen-ts 1 / 144.6 MiB after
  its gc; **open: the eight loaders, S3D, ub-cosmic, zailc; LeptonPad and zilc on their own
  recipes, P7**), H17 (wasmtk clean; part 3 open in -js, -jvm, -rs; -c has it uncommitted),
  H18/H19 (wasmtk purged TWICE, the second for one binary's DWARF, 2026-10-26, map
  `history-purge-2026-10-26.md`; binaryang's text history clean on every public ref, the 4
  path-bearing commits unreachable from any ref, 398 local branches deleted — but five committed
  `benches/**/*.wasm` carried paths in debug info, fixed at HEAD `b52551f37 (was 9e44e5af9)`, the old blobs are
  the owner's second-purge call; binaryen-ts purged and pushed, 34 of 39 tags refused — immutable
  GitHub Releases — owner: leave it; **open: loader-dart `CLAUDE.md:27` (still the real path at
  HEAD, measured), LeptonPad (local `main` is a rewrite: 0 path commits on it, 3 on `origin/main`,
  279 ahead / 278 behind — the force-push is the owner's, roadmap 19), zailc, zilc**), H20
  (wasmtk 3.0.0 from `synapticforge1` with provenance 2026-10-24; binaryang `fa5437d34 (was 299dd6c9b)`; wasmrt
  `releasing.md:241`; -py 1.1.0 published from the org), H22 (binaryang `407082a7b (was ade20a346)`, wasmrt
  `design-decisions.md:189` dated 2026-10-24, rsxtk `INDEX.md:19-20`, wasmtk `4084d37c8b2`,
  LeptonPad `797a351`, wazmrt; **open: the ten loaders — -c uncommitted — S3D, ub-cosmic, zailc,
  zilc**), H24 (wasmrt `a9c5870`, binaryang `87ad3a848 (was df4c7ffea)`, wazmrt `462e0e8`, wasmtk `4084d37c8b2`,
  rsxtk by its verbatim re-copy; -c uncommitted; **open: -dotnet, -dart, -js**), H25 (§3(d) rsxtk
  ✅; §3(a) binaryang re-scoped as above; **(b) loader-jvm still tracks `.claude/settings.local.json`,
  (c) loader-dart `CLAUDE.md:27` still the real path — both measured 2026-10-26**), H26 (LeptonPad
  answered in `797a351`: pull line, ★ block 28/28, path test, `build:wasm` pinned `@2.0.3`, origin
  reset, INDEX 63.7 → 8.0 KB; owner ruling relayed: its `collaboration.md` address is allowed as the
  maintainer contact; **S3D, ub-cosmic, zailc, zilc have not pulled it**), H27 (binaryang
  `fa5437d34 (was 299dd6c9b)`, wasmtk `4084d37c8b2`, LeptonPad `797a351`; -c uncommitted; others open), C8 (the
  canonical ★ 6.1 now cites `8d9ba0cb9`, fixed here 2026-10-26 — every copy re-copies once more:
  binaryang `:140`, wasmrt `:2005`, wazmrt `:1974`, wasmtk, rsxtk still quote `b8fafaa3f`).
- **Corrections to the notes (measured):** wasmrt's three byte sizes are larger than it wrote
  (3,882 / 7,297 / 4,964); its H22 record is dated 2026-10-24, not 2026-10-26; its "single-digit"
  grep hits one line of retired history (`releasing.md:81`); its mirror is at v40 while wazmrt is
  at **v41** (C7 open). binaryang: `95b03dd5b (was e72da9b5e)` is 33 commits behind today's `origin/main`
  `a69ad2ec4 (was 28632405a)`; it is at **2.2.1** (released 2026-10-26, 29 tags) with 2 unpushed commits
  (`2325cf4a4 (was 04f31c916)`: the predecessors' GitHub repos mirrored before deletion). rsxtk: all verified
  (35 crates.io versions; only its item 3 open).
- **The wasmtk relay (C10, from `next-work.md` W6–W12):** H6.5b waits on the owner's go-ahead,
  loader-js's re-stamp from **`4a5c3cf668d`** (X8's target moved with the second purge), and
  suites for -v / -zig; H10 not started; the owner's number-type direction (2026-10-26: `number` =
  f64, no hints, no wasMath) changes wasic's subset and so I11's bar; W11's method note (golden
  snapshots must not freeze a checkout's absolute path) is logged in `open-work.md` § lessons.
- **Repos that moved and did not say so here:** wabt-ts and binaryen-ts both answer 301 → `synapticforge1/…`
  (measured 2026-10-26); binaryen-ts's `origin` and wabt-ts's `origin` still name `jrmarcum`.
  wabt-ts: 47 packs and seven orphan `.idx` files, untouched (owner call stands).
- **The eight loaders have pulled nothing since 2026-10-22** except -dotnet (its `open-work.md`
  trimmed, GitHub Support request prepared) and -c (four files uncommitted: README, ★ stamp,
  `overview.md`, `working-rules.md`); -py and -rs each hold one unpushed docs commit; -rs has a
  5-line uncommitted `CLAUDE.md` change; -go and -js have an untracked `.claude/` (fine).

**Status sweep 2026-10-22** (read-only, every repo's memory + git log; the row's status cell is
authoritative only where it names a commit; superseded above where they differ):

- **H1** — wazmrt addressed (`ba205dea7`, contract v28; lockstep point moved to wasmrt 1.0.1);
  wasmrt has not recorded it. **H2** — wasmrt not started. **H3** — ✅ **CLOSED 2026-10-23** after
  the re-read (wazmrt `3fe416f12`; at `origin/main` `1e37ec0`): `INDEX.md` 192 KB → 10.9 KB, state
  in a 5.6 KB `open-work.md`; wazmrt's own `cmem/probes/h3-check.ts` against the pre-cut INDEX
  `3f1bfbc1d` PASSES (25 cited hashes all resolve — via its H19 map — and are still cited; no broken
  link; no missing section) and its `--invert` run DETECTS the sabotage. Drift Z1, Z2, Z4, Z5, Z6
  verified clean (remaining hits are dated history); the Z3 remnant (`licensing.md`'s present-tense
  wasm-c-api install) fixed in `4fd923b`, pushed 2026-10-23 — all six Z rows closed.
- **H5** — binaryang: nothing found (the provenance note is still a draft at `publishing.md:259-264`).
- **H6** — wasmtk mostly done (H6.1–H6.4, H6.5a, H6.6; H6.5b consumer suites waits on the owner);
  loader-js done (2026-10-12); **loader-c done** (`7b7be45`, gate `0f9b6e3`, 2026-10-22);
  **loader-dart done** (`36378fd`, first real run at 0.2.1); **loader-dotnet ✅ closed** (`51c447f`,
  ported to Bun in `0874746`, API declared with PublicApiAnalyzers; first gated release 0.1.1 on
  nuget.org 2026-10-22; post-purge hashes — the old→new map is in its `cmem/overview.md:204-228`); **wazmrt ✅ closed 2026-10-23**
  (`98d9313`: the workspace's 28 ★ rules copied verbatim as `best-practices.md` §7 under a dated
  stamp — 28 = 28, counted here; `6c055eb`: SemVer 2.0.0 replaces the odometer, which `releasing.md`
  marks retired, and the compatibility gate `zig build surface` (`tools/surface.zig`, committed
  `released.txt` / `current.txt` snapshots) runs inside `test`, refuses a bump below its floor —
  184 surface lines, floor patch — and was inverted, "every mutant red for its own reason"; both on
  GitHub `main`, verified). binaryang, wasmrt, rsxtk, other loaders: not found.
- **H7** — loader-js done its side (fixtures from wasmtk `f50c8e4`, stamped). **loader-dart
  adopted them** byte for byte (`bc53669`, 2026-10-22, with a publish-blocking check). **loader-c
  DEFERRED** (`6db2bc3`, owner decision): `f50c8e4` is on no wasmtk remote branch or tag —
  **verified here 2026-10-22: it is on wasmtk's local `main` only, which is 131 commits ahead of
  `origin/main` (`jrmarcum/wasmtk`)** — so the stamp is not pinnable until wasmtk pushes/releases.
  **2026-10-23:** wasmtk moved to `synapticforge1/wasmtk` and purged its history locally (H19), so
  `f50c8e4` no longer exists on any local ref either; the stamp must be REDONE from a pushed,
  post-purge commit once the owner force-pushes wasmtk.
  **loader-dotnet ✅ closed**: fixtures = the stamped set (verified here: 12/12 files
  byte-identical to -js `tests/`), SPEC §10 tested, and `cmem/` tracked again (`7b08f43`, L1).
  Other ports not started. -go still ignores `cmem/` — 🔒 **owner, 2026-10-22:
  un-ignoring it is fine as long as no secrets or personal information are displayed**
  (working-rules § Records; both scanned clean here: no tokens, user paths, emails or `*.snk`;
  keep a gitignored `cmem/local/` for anything private); -rs IS published (0.1.1), its
  `abi.js` is still 2.x; -v, -zig no tests. loader-c also closed L2 (`6ca86e9`).
- **H8** — wazmrt done (`5f82c94bf`, `b783e6920`, `3f1bfbc1d`: I5 = 44 wasm-tools-only opcodes, not
  nine); wasmrt, binaryang not started.
- **H10** — unblocked by H9; wazmrt waiting; wasmtk queued after its compiler bugs; wasmrt silent.
- **H11** — wasmtk answered (`offload-inventory.md`); owner 2026-10-06: `wasmbundle` becomes
  binaryang's `wasm-bundle` (nothing moved yet).
- **H12** — wasmtk Phase 0a done, 0b audit in progress; binaryang has not reserved `./ts2wasm`.
- **H14** — informational; nothing to do, nothing recorded.
- **H15** — closed for loader-c; amended twice the same day: from -dotnet's measurement of all 12
  non-TS repos (`divergences.md` § "P6 measurement"), then by the owner's "builds an executable →
  Bun" clarification. Now: -rs (2 `.sh`), -py (6 `.sh`/`.nu` → pixi), -v (4 `.vsh` → Bun) and wazmrt
  (3 `.mjs` off Deno → Bun) and -jvm (1 `.sh` → `.main.kts`, `.jar` allowed) have ports; -dotnet reopened, record-only;
  -zig, -go, -dart record-only / conform.
- **H16** — set in binaryang, wasmtk, wasmrt, wazmrt, rsxtk, loader-c, loader-zig (measured
  2026-10-26); **open in loader-go, -js, -jvm, -py, -rs, -dotnet, -dart, -v** (H25 §2).
- **H18 / H19** — **loader-dotnet ✅ done under the wider path definition** (second purge,
  2026-10-22; verified here over EVERY ref: no author/committer address but noreply, no
  `.claude/` tracked, no real drive path in any commit — the only pattern hits are the rule's own
  prefixes in `cmem/working-rules.md` and a synthetic `D:\\r` string in `scripts/compat.ts`).
  Tags rewritten with trees byte-identical (`v0.1.0` → `d990087`, `v0.1.1` → `7451a46`); both
  nuget.org packages now name commits the repo no longer has (immutable). Everyone else open.
- **H20** — new; nuget.org's trusted-publishing policy broke on the transfer (loader-dotnet).
- **Review 2026-10-26 (H25)** — H18/H19 done: wasmtk, wazmrt, wasmrt, rsxtk, loader-c, loader-dotnet;
  **path purge still needed: binaryang, loader-dart** only — 🔒 the owner ruled the same day that the
  maintainer address on commits is allowed, so the seven other loaders need no purge (the eight
  loaders have still not pulled H18/H19/H22 at all). H22 recorded: binaryang, wasmtk, wasmrt, wazmrt only.
  H17 part 3 (stale `jrmarcum/wasmtk` links): loader-js, -jvm, -rs, -c. wasmtk's push unblocks X8.
- **Notes from binaryang, 2026-10-26 — for the workspace to VERIFY and fold in** (written by the
  binaryang session, owner: "make notations for the workspace to review and update for all items";
  nothing in the table below was edited — close or correct rows after your own check). binaryang
  records each letter in `../binaryang/cmem/handoffs.md` § "Letters addressed to binaryang".
  - **H24 ✅ for binaryang** — `ea2e6b063 (was cda28e0d0)`, merged `87ad3a848 (was df4c7ffea)`; **pushed 2026-10-26** (owner: "push")
    with H22's and the two D3-notice commits — `origin/main` = local `main` = `95b03dd5b (was e72da9b5e)`, read
    back after a fetch. No publish: `jsr.json` says 2.2.0 and `v2.2.0` already exists on GitHub. Check: a one-time script compared all 28 ★ rules, this file against
    binaryang's copy, by number and normalized text — 5.2 the only difference before, 0 after.
  - **H25 §3(a) — measured, does not hold for the PUBLIC history.** `git log -G` with binaryang's
    scan pattern over `origin/*` plus all 28 tags, every file: 0 commits; `git grep` on HEAD: 0. The
    4 path-bearing commits found (`b472b4aa4`, `c1c24c9d3`, `df3659840`, `07823a430`, 2026-09-03 →
    09-14) are reachable ONLY from local branches that were never pushed (e.g. `cmem-consolidation`,
    `backup-before-rewrite`); H19's purge rewrote the public refs only, by the owner's scope
    ("only public facing items"), and left the 372 local branches. So **no binaryang force-push is
    pending**; whether to delete or rewrite those local branches is the owner's call. Re-scope the
    row and `open-work.md` § Owner actions ("Force-pushes still to approve: binaryang and
    loader-dart") to loader-dart only, after your own run.
  - **H22 / H25 §3(d) ✅ for binaryang 2026-10-26** — `407082a7b (was ade20a346)`, merged `95b03dd5b (was e72da9b5e)`, pushed
    2026-10-26 (on GitHub `main`). Before it, the 2026-10-26 review's "H22 recorded: binaryang" did not hold:
    binaryang's privacy rule said "no absolute path on the owner's machines", with no
    "machine-specific?" test and no convention-path allowance. Now `../binaryang/cmem/working-rules.md`
    § Records states the test, the not-public / fine lists, tool settings never tracked, a scan
    hit judged as a candidate, and the maintainer-address exception including commits (owner,
    2026-10-26); § Git notes binaryang keeps noreply. Record-only: HEAD's scan is empty. Check:
    grep `machine-specific` in `../binaryang/cmem/working-rules.md`.
  - **Already done in binaryang, still shown open or "not started" in the 2026-10-22 sweep**:
    H5 (`526d447da (was 8bc2efa1a)`, 2026-10-23; B7 REVERSED after measuring — the corrected note went out as
    binaryang's letter § 41); H6 (SemVer bump 2026-10-22; ★ block and memory layout 2026-10-23;
    the compatibility gate 2026-10-23, `../binaryang/cmem/publishing.md` § "The compatibility
    gate"); H8 binaryang's part (2026-10-23: I5 closed, 582 = the runtimes' 582; I6 one defect,
    FL1, since CLOSED — see below; I8 measured); H12 (`a272482ff (was d494438e3)`, `./ts2wasm` reserved);
    H15 (recorded, nothing to port, 2026-10-22); H16 (set — `maintenance.strategy gc`, 2 packs,
    re-read 2026-10-26); H18 (2026-10-22) and H19 (pushed 2026-10-23, 24 refs, tag map in
    `../binaryang/cmem/publishing.md` § "The history purge"). H9 and H14 need nothing.
  - **H21's standing list of rewritten repos omits binaryang.** Its old → new map: tag by tag in
    `../binaryang/cmem/publishing.md` § "The history purge"; the full map is machine-local.
  - **H11** — "`wasmbundle` becomes binaryang's `wasm-bundle` (nothing moved yet)": binaryang's
    side SHIPPED in 1.10.0 (2026-10-09, binaryang letter § 27); wasmtk's switch is wasmtk's.
  - **`open-work.md` § Cross-repo threads, "binaryang → wasmtk"** is stale: binaryang is at
    **2.2.0** (2026-10-24), and its § 40 was never sent — folded into § 41, SENT 2026-10-23.
  - **Divergences.** I6's row describes D2 at 1.15.0; binaryang's FL1 (`sat-float-to-int`) is
    CLOSED — `saturating-float-to-int` is the only spelling since 2.0.0. **I8**: binaryang
    measured = wasm-tools 1.262 byte for byte (one name section, the hand-written one), which
    differs from wazmrt's 2026-09-21 record against wasm-tools 1.259 (both sections) — the runtimes
    need a re-run on 1.262 (`../binaryang/cmem/handoffs.md`, the H8 entry). D3: the owner
    declined the "expected shared memory" class, 2026-10-24 — D3 stays testsuite messages only.
  - **Replies binaryang awaits are in the siblings' memory, not yet relayed** (binaryang letter
    § 44, matrices on 2.2.0): wazmrt 4.0.0 — 2,352 / 0 differ vs binaryang 2.2.0
    (`../wazmrt/cmem/open-work.md`, "DONE 2026-10-24, once binaryang 2.2.0 shipped"); wasmrt
    1.0.0 — 0 of 6,860 after one wasmrt fix (`../wasmrt/cmem/known-issues.md`). Neither reports a
    binaryang defect. ⚠️ wasmrt's `known-issues.md` § "D2's TYPE RULE" still calls § 44 "drafted,
    not yet sent"; binaryang's record says SENT by the owner 2026-10-24.
  - **Added later on 2026-10-26** (owner: "fix items for binaryang, update the stale item, then
    correct the notations for the workspace to review"; binaryang docs commit `fa5437d34 (was 299dd6c9b)`, merge
    `6c0f9d11f (was 293e7f401)`; ✅ **everything in this block is PUSHED** — binaryang `origin/main` =
    `a18a55f89 (was 3dafd3551)`, read back after a fetch, owner: "commit and push"; no tag, `jsr.json` still
    2.2.0, so no publish; the commits named "NOT pushed" below are on GitHub now):
    - **H25 §3(a) SETTLED for binaryang's text history** (owner: "delete the never-pushed local
      branches if they are now irrelevant"): 398 local branches deleted, `wip/r15-tree-pass` kept
      and re-parented (`91dfb6cc2`); every deleted tip is in the pre-purge bundle. Check:
      `git branch` lists `main` and `wip/r15-tree-pass`; `git log --branches --tags
      --remotes=origin -G <scan pattern>` finds 0 commits. `open-work.md` § Owner actions
      ("Force-pushes still to approve: binaryang and loader-dart") was wrong for binaryang's TEXT
      — but see the next bullet.
    - **⚠️ NEW — H18 / H25 §3(a) REOPENED for binaryang: five committed BINARIES carry personal
      paths, at HEAD and on `origin/main`.** `git grep -c -a` (binaries included):
      `benches/browser-opt/modules/{rust-debug,zig-debug,zig-releasefast}.wasm` (public since
      `22ecb4ab2 (was f9b74f213)`, 2026-10-13) and `modules64/{rust-release-wasm64,zig-releasefast-wasm64}.wasm`
      (`2ea5da23a (was 4dcb140e3)`, 2026-10-22) embed, in DWARF and panic-location strings, the owner's user
      profile (199 hits: the scoop toolchain, AppData) and the project tree under the old folder
      name. Every scan so far — binaryang's rule (`git grep -I`), H18's, H25's, the H19 purge
      (`git log -G`) — skips binary files, so "HEAD is clean" / "0 commits" held for text only.
      Not shipped (`jsr.json` excludes `benches/**`; npm ships `dist/`). Not a one-line fix: they
      are the optimizer's six baseline inputs and four tests' fixtures (one catalogue is generated
      from their bytes), so a rebuild with remapped paths moves every baseline. 🗓️ OWNER:
      `../binaryang/cmem/open-work.md` 44 (options a / b). **For the workspace:** re-run H18 / H19
      / H25 scans with `-a` (binaries) in every repo — wasmtk, the loaders and the runtimes commit
      compiler output too; binaryang's rule now carries the binary scan (`working-rules.md`
      § Records). A cross-repo lesson candidate: *a text scan is evidence about text files; a
      compiler's debug build embeds the build machine's paths.*
      **✅ FIXED at HEAD the same day** (owner: "lets fix 44"; binaryang `b52551f37 (was 9e44e5af9)`, merge
      `5991cd830 (was a5542219c)`, NOT pushed): the Rust modules rebuilt with every prefix remapped
      (`--remap-path-prefix` + `-Ztranslate-remapped-path-to-local-path=no`), the Zig modules'
      `.debug_*` sections removed byte for byte, `build.ts` scanning its outputs and failing on a
      hit; whole-tree binary-aware scan empty; full suite 6,336 / 0; the optimizer baseline
      re-derived with a positive control (six -Oz 138,410 vs upstream 137,621, +0.57%, gap
      unchanged). Check: `git grep -c -a -i -E '[A-Za-z]:[\\/]+(Programs|Users|scoop|tools)[\\/]'`
      in binaryang → nothing. **🗓️ OWNER, still open:** the old blobs sit in public history from
      `22ecb4ab2 (was f9b74f213)` / `2ea5da23a (was 4dcb140e3)` — a second H19 purge (paths only, every ref) and a force-push, or
      accept. Found on the way, for the owner: binaryang's `wasm-strip` re-encodes the sections it
      keeps where upstream wabt copies them verbatim (`../binaryang/cmem/open-work.md` 45,
      divergences ST1). Later the same day (`bc5560b27 (was 48aa4a1d6)`, merge `1a0a0c1c8 (was 15fef9e78)`): the purge is now
      binaryang's **open-work 46** (🗓️ OWNER: a second H19 purge of the five blobs over every
      ref and tag from `v1.13.0`, force-push, then the GitHub Support request — or close as
      accepted); and 45 is MEASURED — 14 of 18 modules differ from upstream `wasm-strip`,
      encoding only (same printed text, padded LEBs → minimal), recommendation DEFECT, the
      owner decides. ✅ **Decided DEFECT by the owner and FIXED the same day** (binaryang
      `1a4b06f43 (was e948e84db)`, unreleased, not pushed): `wasm-strip` decodes, then copies every kept byte —
      its output equals upstream wabt 1.0.41's by hash; full gate 29 / 29. Siblings: none calls
      it; anyone who stripped `-s <some>` from a relocatable or DWARF-bearing module with an
      earlier binaryang should re-strip from the original.
      ✅ **RELEASED as `binaryang@2.2.1`, 2026-10-26** (owner: "we should bump and release the
      fix for wasm-strip"): JSR Rekor `3490805794`, npm SLSA provenance, GitHub Release `v2.2.1`;
      from both registries the published `wasm-strip` writes upstream wabt's bytes exactly. A
      patch, nothing removed or renamed; consumers pinned at 2.2.0 (wasmtk) need nothing unless
      they strip. Record: `../binaryang/cmem/publishing.md` § "2.2.1".
    - **The predecessors' local checkouts — binaryang took over what it lacked (2026-10-26;
      owner: "We need to pull in what we currently do not have. I will be deleting that repo").**
      The upstream binaryen and wabt reference clones now live in binaryang's gitignored
      `upstream/`; each predecessor's original-id history (every branch and tag) is kept in
      verified git bundles, and their local notes archives byte for byte, in binaryang's private
      `cmem/local/` (`../binaryang/cmem/project.md` § "The predecessors' local checkouts").
      **For the workspace:** `projects.md` and the root pointer list wabt-ts / binaryen-ts as
      FROZEN siblings; once the owner deletes the checkouts, those rows describe repos that are
      only on GitHub. The JSR packages `@jrmarcum/wabt-ts` / `@jrmarcum/binaryen-ts` name the
      GitHub repos in their provenance, so deleting the GITHUB repos (not only the local
      checkouts) is a separate decision the owner should make knowingly. **🔒 DECIDED, owner
      2026-10-26: "Yes both the local folders and the github repos."** Before it, binaryang
      mirrored both GitHub repos into verified bundles (34 binaryen-ts GitHub tags named
      commits the local checkout did not have — the ones JSR's provenance names; now kept).
      Neither had releases, issues or PRs; no binaryang file links to them; binaryang's local
      remotes to them are removed. **For the workspace and every sibling:** after the deletion,
      `../wabt-ts` and `../binaryen-ts` are gone — `projects.md`, the root pointer's table, the
      safe-directory notes and any sibling that reads those folders (wasmtk's old
      `upstream/` links, the workspace's `tools/` corpus) should drop or redirect them;
      binaryang's `upstream/` now holds the two upstream reference clones.
      **Correction for the workspace's own files (binaryang, 2026-10-28, measured):** EVERY JSR
      version of both packages is yanked, **1.5.1 included** — `@jrmarcum/binaryen-ts` 39 of 39,
      `@jrmarcum/wabt-ts` 32 of 32, `latestVersion` null, both archived (JSR's API, cache-busted;
      the owner: "binaryen-ts is no longer live with accessible versions"). The root pointer
      ("JSR versions other than 1.5.1 yanked") and `open-work.md:22` ("except 1.5.1") say
      otherwise; an exact-version import still downloads, as JSR documents for yanked versions.
    - **H27 ✅ for binaryang** (`fa5437d34 (was 299dd6c9b)`): both stamps in `../binaryang/cmem/best-practices.md`
      read `Copied from synapticforge1/cmem/best-practices.md …`; the ★ block re-dated 2026-10-26
      after a one-time script compared all 28 rules by number and normalized text (28 = 28, 0
      differences); the § 5.5 nine questions re-read against the canonical prose, equal; the four
      prose lines (`testing.md:111,624`, `binaryen-ts.md:505`, `wabt-ts.md:922`) now sibling-relative.
      Check: `git grep -I wasmExamples` in binaryang → 0 (the `-a` hits are the finding above).
    - **H20 ✅ record-only for binaryang** (`fa5437d34 (was 299dd6c9b)`): `../binaryang/cmem/publishing.md` § "The
      move to `synapticforge`", last paragraph — JSR linked by repository id (followed the transfer
      and the rename after re-linking), npm's trusted publisher created under the org after the
      move, nine releases since on both; whether npm pins owner / repo ids: not measured.
    - **I8 — closed for all four assemblers on wasm-tools 1.262** (wazmrt's note above, its fix
      `852ff84`); binaryang's H8 entry corrected (it said "wazmrt's re-run is still open").
      Suggest `divergences.md` I8 → closed.
    - **C1 and C2 CLOSED by binaryang as their creator** (ledger rows updated): C2 from § 45; C1
      re-derived from wasmtk's record (2.2.0 pinned 2026-10-24, `upstream/binaryang` re-cloned,
      provenance correction recorded; its reply on 1.15.0 / 1.16.1 is drafted in
      `../wasmtk/scripts/binaryang-report.md` for the owner to send).
    - **Still waiting on the workspace:** ★ 6.1's id (C8) — binaryang re-copies and re-stamps when
      the canonical text changes; `open-work.md` § Cross-repo threads "binaryang → wasmtk" (1.14.0,
      § 40) still stale.
    - **C26 — binaryang's SECOND history rewrite (2026-10-28; owner: "fix item 46").** Five
      committed benchmark modules carried this machine's paths in their DWARF and Rust panic
      strings, public from 2026-10-13; the first purge's scans (`git grep -I`, `git log -G`) skip
      binaries. Every blob reachable from GitHub's refs was scanned byte for byte (104,719): those
      five were the only binaries with a machine path. In each, every machine-specific path
      PREFIX was replaced by a same-length label — code, offsets and lengths untouched, each
      module's `run(300)` equal before and after on V8 — and the history rewritten: **383
      commits from 2026-10-13 on have new ids** (12,755 earlier ones kept theirs), 14 tags
      moved (`v1.12.1` … `v2.2.1`), force-pushed 2026-10-28 with a lease per ref; GitHub's refs
      read back equal; a scan of everything they reach finds no binary with a machine path. No
      publish ran for the moved tags. **For wasmtk:** re-clone `upstream/binaryang` (the old
      clone carries the old history; never push from it). **For anyone quoting a binaryang id:**
      the 28 ids the workspace's, wazmrt's and S3D's memories quote, old → new: `04f31c916` →
      `2325cf4a4`, `0beb14642` → `12e6c042d`, `130b2faa9` → `5bac71de1`, `148454906` →
      `f828f6303`, `15fef9e78` → `1a0a0c1c8`, `28632405a` → `a69ad2ec4`, `293e7f401` →
      `6c0f9d11f`, `299dd6c9b` → `fa5437d34`, `3dafd3551` → `a18a55f89`, `3e0f7bc1a` →
      `dd56376bd`, `48aa4a1d6` → `bc5560b27`, `4a829d216` → `3a2b4e475`, `4dcb140e3` →
      `2ea5da23a`, `899b3fa5d` → `54cc098ea`, `8bc2efa1a` → `526d447da`, `9e44e5af9` →
      `b52551f37`, `a3d338e8e` → `97c2c0375`, `a5542219c` → `5991cd830`, `a846dc68f` →
      `39c127def`, `ade20a346` → `407082a7b`, `af08bf069` → `1c49d6d03`, `cda28e0d0` →
      `ea2e6b063`, `d494438e3` → `a272482ff`, `df4c7ffea` → `87ad3a848`, `e72da9b5e` →
      `95b03dd5b`, `e948e84db` → `1a4b06f43`, `f9b74f213` → `22ecb4ab2`, `fa00de253` →
      `c5ab570c3`. The tag map: `../binaryang/cmem/publishing.md` § "The second purge". The JSR
      and npm provenance of released versions keeps naming the OLD ids. 🗓️ OWNER: one GitHub
      Support request can cover both purges' old commits.
    - **C9 — to EVERY repo under the workspace folder, and 🗓️ OWNER (owner, 2026-10-26: "add this
      as a correspondence notation for the other repos to do also").** The workspace folder was
      renamed (`wasmExamples` → `synapticforge1`), but git's `safe.directory` entries were not:
      measured 2026-10-26 in binaryang, the SYSTEM config (the Git install's `etc/gitconfig`,
      the one `local/environment.md` says these entries go in) lists five repos — binaryen-ts,
      wasmtk, binaryang, wazmrt, wasmrt — under the OLD folder only, and the global config has
      no entry for the new one. The drive is exFAT and records no ownership, so **git refuses
      every command in a repo at its new path** ("detected dubious ownership"), including the
      `git ls-files` inside a test script (binaryang's `bun run test` ended with "no tracked
      test files" after the tests had run). A session that commits, merges or runs a gate in any
      of these repos is affected; the lowercase / uppercase drive spelling makes no difference.
      **For the owner (the config write):** one entry per repo —
      `git config --system --add safe.directory <workspace>/<repo>` — or one for all:
      `git config --system --add safe.directory "<workspace>/*"`; the old entries match nothing
      and may be unset. This also answers `open-work.md` § Owner actions' "system or global?"
      row if the system file is kept. **For each repo's session, until then:** run git with
      `-c safe.directory='*'`, or put `GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=safe.directory
      GIT_CONFIG_VALUE_0='*'` in the environment of any script that calls git (a read-only
      override, no config write); record the fact in your PRIVATE `cmem/local/environment.md`
      only (the paths are machine-specific — the rule, H22), as binaryang did 2026-10-26.
      Check: `git status` in the repo with no override prints no "dubious ownership" error.
      Answer in your row's "full text" cell; binaryang verifies and closes.
- **Notes from rsxtk, 2026-10-26 — for the workspace to VERIFY and clear** (written by the rsxtk
  session, owner: "fix the open items, then update notations for the workspace to review and
  clear"; nothing in the table below was edited). rsxtk commits, all **pushed 2026-10-26** on the
  owner's word: `cf98ecd` (path test, ★ re-copy), `aef343e` (memory audit), `bae61ee`
  (`.gitattributes` + renormalize), `07b4b13` (item 9 closed), `a557b7c` (R.4) — local `main` =
  `origin/main` = **`a557b7c`**, read back with `git ls-remote`. rsxtk records each
  letter in `../rsxtk/cmem/overview.md` § "Where it sits in the workspace".
  - **H25 §3(d) / H22 ✅ for rsxtk** — the path test is in `../rsxtk/cmem/INDEX.md` § Policy (rsxtk
    has no `working-rules.md`; its INDEX Policy plays that role): "machine-specific?, not
    absolute?", the not-public / fine lists, convention paths, `.claude/` never tracked, a scan hit
    is a candidate, and the maintainer-address exception covering commits (owner, 2026-10-26) —
    rsxtk keeps noreply. Check: grep `machine-specific` in that file. The diff's one scan hit is
    the rule's own example prefixes (the same class as wasmrt's).
  - **H6 (★ block) — rsxtk's 2026-09-20 copy was ABRIDGED, not verbatim**: bold sentences cut short,
    most incidents dropped; 12 of 28 bold sentences differed from the canonical text (1.11, 3.1,
    3.8, 4.3, 4.16, 5.2, 6.1, 6.2, 6.3, 7.3, 7.6, 8.1). Re-copied verbatim under a 2026-10-26 stamp.
    Check: a one-time Bun script compared the 28 by number and normalized bold text — 12 before, 0
    after — and the extracted full bullets, 97 lines, diff empty. This also satisfies H24 for rsxtk
    (H24 did not name rsxtk; its old copy had no 5.2 incident). ⚠️ The "28 = 28" counts used to
    close H6 elsewhere are counts, not text — an abridged copy passes them; worth a text
    comparison in the other repos before closing on a count. H6's SemVer gate stays moot for rsxtk
    (`open-work.md` here: no `pub` API).
  - **⚠️ Canonical ★ 6.1 quotes a pre-purge binaryang id**: `b8fafaa3f` ("build: pin npm:binaryen
    to 132 …", 2026-09-12) exists only on binaryang's never-pushed local branches; on
    `origin/main` the same subject is **`8d9ba0cb9`** (measured 2026-10-26, `git log origin/main
    --grep`). H21's standing rule applies to this file: update `best-practices.md` § 6.1, then the
    repos re-copy (rsxtk's copy keeps the canonical text and notes the mismatch in its stamp).
  - **Item 4 of the review (★ 7.6 line endings) ✅ closed 2026-10-26** (owner: "proceed with item
    9"): `bae61ee` adds `.gitattributes` (`* text=auto eol=lf`, `*.png binary`) and renormalizes
    the five CRLF files; with `--ignore-cr-at-eol` its diff is `.gitattributes` alone. Gate on the
    committed tree: release build 0, clippy 0 warnings, 41/41 tests. Memory in `07b4b13`; pushed.
    Check: `git ls-files --eol` in rsxtk shows no `crlf`.
    **Cross-repo lesson, for best-practices if it holds elsewhere:** on this machine's MinGW
    toolchain two release builds of the SAME Rust source differ (PE `TimeDateStamp` 0x88 and
    `CheckSum` 0xd8 — the only differing bytes of 13.8 MB, measured); a whole-file hash is not a
    "same binary" check. Mask those two fields and show the same-source control first
    (`../rsxtk/cmem/testing.md` § Comparing binaries; rule `../rsxtk/cmem/best-practices.md` R.4).
    wasmrt (also Rust on Windows) may want it; UNMEASURED there. wazmrt's carry-forward (H23)
    already rebuilt tags to "release exe sizes byte for byte" — size, not bytes, so it is not
    contradicted.
  - **Already done in rsxtk, verified 2026-10-26**: H15, H16 (1 pack), H17 (no stale links), H19,
    H20 (n/a, recorded in `overview.md` § Hosting).
  - **For the workspace to update in its own files, after its own check** (rsxtk edited none of
    them):
    1. **Table status cells**: H25 — add "rsxtk ✅ §3(d) `cf98ecd`"; H22 — add "rsxtk ✅ `cf98ecd`";
       H6 — add "rsxtk ★ block re-copied verbatim `cf98ecd`"; H24 — rsxtk n/a (not addressed),
       satisfied by the re-copy; H19 — "34 versions" → 35 (crates.io, after 0.5.0).
    2. **Status sweep bullets above the table**: H6's "binaryang, wasmrt, rsxtk, other loaders: not
       found" → rsxtk done; the 2026-10-26 review's "(d) … recorded nowhere in rsxtk" → recorded.
    3. **`projects.md`**: `:117-118` "Nothing inside rsxtk records either fact" — rsxtk records both
       (`overview.md` § "Where it sits", `design-decisions.md:59`); rsxtk's row may add HEAD
       `a557b7c` and "`.gitattributes` since 2026-10-26".
    4. **`best-practices.md` § 6.1**: the binaryang id (`b8fafaa3f` → `8d9ba0cb9`, above); then the
       copies re-copy.
    5. **`open-work.md`**: rsxtk's only open item is its 3 (the wasmrt switch).
- **Notes from wasmrt, 2026-10-26 — for the workspace to VERIFY and fold in** (written by the wasmrt
  session, owner: "make notations for the workspace to review and update their information
  correctly"; nothing in the table below was edited — close or correct rows after your own check).
  wasmrt's authoritative list is `../wasmrt/cmem/open-work.md` § State. wasmrt is at **2.0.0**
  (released 2026-10-24, tag `v2.0.0` = `1715139`, on crates.io). Docs commits `cd8081f` (the fixes
  below) and `2ee6628` (memory update) were **pushed 2026-10-26** (owner: "commit and push"):
  local `main` = `origin/main` = `2ee6628`, read back after a fetch.
  - **The wasmrt rows below are behind.** wasmrt records H1, H2, H6, H8, H10 (steps 1–2), H13,
    H15, H16, H18–H24 as done on its side; H25 addresses nothing to it. Re-checked here today:
    - **H2 / drift R1–R9, W2, W3** — `CLAUDE.md` 3,827 B, `cmem/INDEX.md` 7,283 B, `open-work.md`
      4,297 B (`wc -c`). R2: no duplicated § heading remains. R3: README has no oracle / 99.4 %
      claim, `Cargo.toml` says 2.0.0. R4, R6: the old text survives only as dated history
      (`roadmap.md:28`, `architecture.md:45`, `design-decisions.md:416` 🔁). R5, R7, R9: the quoted
      text is gone from INDEX. R8: `loaders.md:99` counts the header at 75 functions. Close the rows,
      and `open-work.md` § "Conformance to the decided memory policy", the wasmrt bullet.
    - **H13, and `open-work.md` § Divergence register "wasmrt bodies differ on 539/603"** — fixed
      2026-10-23: bodies = `wasm-tools parse` on 603/603 (`../wasmrt/scripts/body-parity.ts`),
      `wasmrt pin` = `wazmrt pin` on 603/603 `.wat` and 584/584 `.wasm`
      (`../wasmrt/cmem/interop.md:556`). ⚠️ wasmrt's H8 record (`roadmap.md`, I7) says **the
      workspace harness runs a STALE wasmrt build** — rebuild before re-running
      `../tools/assembler-parity/measure.ts`, or it will show the old 539.
    - **H21, and `open-work.md` § Cross-repo threads "wasmrt ↔ wazmrt"** — the mirror is at
      **v40**, byte-identical to wazmrt `bd97ae2`, not "v11–v31 pending"; **release lockstep ENDED
      at v33** (owner, 2026-10-23), so "lockstep at wasmrt 1.0.1" is retired; "no engine commit
      since 2026-09-20" no longer holds (1.0.0 and 2.0.0 shipped since).
    - **`open-work.md` § Owner actions, first bullet** (hand the CLI decision + lockstep to wasmrt)
      — done on wasmrt's side (H1 in its closed list; the contract rows are mirrored). Check:
      `../wasmrt/cmem/interop.md` §2.4a and §1e.
    - **`open-work.md` § compatibility gate, wasmrt** — exists: `surface/released.txt` /
      `current.txt`, `surface.ts --check` in the gate, floor PATCH since 2.0.0. The SemVer item's
      "patch stays single-digit" is gone from wasmrt's `releasing.md` (grep finds nothing).
    - **H20** recorded at `../wasmrt/cmem/releasing.md:241`; **H22** at
      `../wasmrt/cmem/design-decisions.md:189` (it also allows the commit address, owner
      2026-10-26); **H23** done (`scripts/carry-forward.ts`, `scripts/behaviour-s2.ts`,
      `crates/wasmrt-core/tests/behaviour.rs`).
    - **X6** — conformance re-measured 2026-10-24: 64,603 / 0 / 0 over 288 files.
  - **H24 ✅ for wasmrt** (`a9c5870`, already in the row). Since `cd8081f` wasmrt cites it as
    **H24** in the five places it had said "H23"; the carry-forward H23 citations are unchanged.
    **Text, not count (rsxtk's point above), measured 2026-10-26:** a one-time Bun script compared
    the 28 ★ bullets by number and full whitespace-normalized text, this file against wasmrt's
    marked block — **0 differences**; inverted (one word added to 6.1 in a copy) it reports
    `DIFF 6.1`. So wasmrt's copy is exact, **including 6.1's pre-purge binaryang id `b8fafaa3f`**
    (rsxtk's note) — fix the canonical 6.1 and wasmrt re-copies it; it does not edit it in place.
  - **binaryang's two notes about wasmrt, both handled:** (1) § 44 "drafted, not yet sent" corrected
    to "sent by the owner 2026-10-24" (`cd8081f`). (2) **I8 on wasm-tools 1.262, measured
    2026-10-26:** `wasm-tools 1.262.0 parse` of the unit test's source gives exactly the test's
    expected bytes (one `name` section, the annotation's), and `cargo test -p wasmrt-core --lib
    an_annotated_name_section_is_the_only_name_section` passes. wasmrt is on 1.262 for I8; the
    re-run binaryang asks for is still wazmrt's.
- **Notes from wazmrt, 2026-10-26 — for the workspace to VERIFY and clear** (written by the wazmrt
  session, owner: "fix the items for wazmrt then make notations for the workspace to review and
  clear from their list"; nothing in the table below was edited — close or correct rows after your
  own check). wazmrt commits `852ff84` (the fix) and `0edbc5c` (memory) were **pushed 2026-10-26**
  on the owner's word: local `main` = `origin/main` = **`0edbc5c`**, read back after a fetch.
  wazmrt's authoritative list is `../wazmrt/cmem/open-work.md`.
  - **I8 on wasm-tools 1.262 — the re-run binaryang and wasmrt asked for — DONE, and it was a
    wazmrt DEFECT, now fixed** (`852ff84`; unreleased, on `main`; the next release takes it as a
    patch, S1 +0 −0). wasm-tools 1.259 wrote both `name` sections and wazmrt matched it
    (2026-09-21); 1.262 writes only the hand-written one, as wasmrt and binaryang do, so wazmrt was
    the one outlier of four. Measured with `../wazmrt/cmem/probes/four-assemblers.ts` on the two
    `h8-fixtures/` plus five variants (anchors `before code` / `before first`, two annotations,
    `@name`, and `"names"`, which is not it): before, wazmrt ≠ wasm-tools on the five that name
    anything; after, all seven equal wasm-tools on wazmrt, wasmrt (`2ee6628`, built in a scratch
    target) and binaryang 2.2.0 (except binaryang's own `name` shape on `"names"`, I7 DESIGN), and
    `wazmrt pin` = `wasmrt pin` on the fixture. Unit test inverted (red in both test binaries with
    the guard off). Full gate on the committed tree, NTFS cwd: test 842/842, test-safe /
    test-shipped 840/840, security 3/3, conformance 288 / 64,092 / 0 / 0 (S2 vs 5.0.0: 0 regressed),
    features, capi-smoke, size exact (lib +34 B by attribution). ⚠️ This also closed a §3.1 pin gap
    nobody had seen: since wasmrt's I8 change (2026-10-23), a `.wat` with the annotation pinned
    differently on the two runtimes; the 603/603 parity could not show it (no corpus file has one).
    **Suggested for `divergences.md` I8**: DEFECT (probable) → closed; all four agree on 1.262.
  - **Contract v41** (record-only, `0edbc5c`): the I8 pin parity, and **every version through v40 is
    mirrored** — the two `interop.md` copies' SHA-256 were equal on 2026-10-26. v41 is pending
    wasmrt's mirror. wazmrt's own stale "v39 / v40 pending mirror" lines are fixed.
  - **H6 / H24 — text, not count (rsxtk's point), measured for wazmrt 2026-10-26:** a one-time Bun
    script compared the 28 ★ bullets by number and whitespace-normalized full text, this workspace's
    `best-practices.md` against wazmrt's §7 — **0 differences**; inverted (one word of 6.1 changed in
    a copy) it reports `DIFF 6.1`. So wazmrt's copy is exact, including 6.1's pre-purge binaryang id
    `b8fafaa3f`; wazmrt re-copies when the canonical 6.1 is fixed (→ `8d9ba0cb9`).
  - **For the workspace to update in its own files, after its own check** (wazmrt edited none of
    them):
    1. **Table status cells**: **H24** — add "wazmrt ✅ `462e0e8` (2026-10-24), text-identical,
       verified 2026-10-26"; **H16** — the cell's closing "wasmtk, wazmrt and the loaders except
       -zig open" contradicts its own "wazmrt ✅ 2026-10-23": drop wazmrt (re-checked today:
       `maintenance.strategy gc`, 1 pack / 2.50 MiB); **H21** — "Open: wasmrt mirrors v31 with the
       rest of v11–v31" → closed, the copies were identical through v40; **H1** and **H8** —
       wazmrt's side done long since (`ba205dea7`; `5f82c94bf`, `b783e6920`, `3f1bfbc1d`), and
       wasmrt now records its side (its notes above), so both may close; **H8 I8** — add "wazmrt
       re-run on 1.262 ✅ `852ff84`"; **H13** — "wasmrt open, untouched" is stale (wasmrt's notes).
    2. **`open-work.md`**: `:15` "wazmrt: tag 1.0.2 / 1.0.3 … untagged by design" — every release
       `v1.0.1`–`v5.0.0` is tagged on `synapticforge1/wazmrt` (`git tag`); `:100` "mirror contract
       v11–v31 into wasmrt; lockstep …" — mirrored through v40, lockstep ended at v33.
    3. **`projects.md`**: wazmrt's row may take **5.0.0** (released 2026-10-24) and HEAD `0edbc5c`.
    4. **Cross-repo lesson, for best-practices if it holds elsewhere** (wazmrt
       `best-practices.md` §3, 2026-10-26): *an agreement with an oracle is dated by the oracle's
       VERSION; when the oracle upgrades, the agreement is a hypothesis again* — I8 and the
       relaxed-SIMD float gating (`interop.md`'s "Oracle drift" note) are two instances of
       1.259 → 1.262.
- **Notes from universalWasmLoader-js, 2026-10-26 — for the workspace to VERIFY and close** (written
  by the loader-js session, owner: "fix the open items, then make notations for the workspace to
  verify"; no status cell edited — answers are in the ledger rows' "full text" cells). One commit,
  **`36aa661`**, merged `--no-ff` as **`16f75de`** on loader-js `main`; **pushed 2026-10-26** with
  everything below (owner: "push and release the next version"), and **released as 1.1.2** — see
  the last bullet. loader-js's list:
  `../universalWasmLoader/universalWasmLoader-js/cmem/open-work.md`.
  - **H7 / X8 / C11 — fixtures re-stamped from `4a5c3cf668d`.** Check: `tests/fixtures.json:5-7`
    = `synapticforge1/wasmtk`, `4a5c3cf668da2c5c6e2cde444851773b5d4f4a08`, `v2.0.3-64-g4a5c3cf`;
    `git -C ../wasmtk branch -r --contains 4a5c3cf668d` lists `origin/main`. Rebuilt from a FRESH
    GitHub clone (needs `core.longpaths true`), checked out clean at that commit; its five source
    blob ids equal the old stamp's, its commit date equals `f50c8e4`'s; **all ten `.wasm` / `.wit`
    came out byte-identical** — `git show 36aa661 --stat` shows no fixture binary changed, only
    `fixtures.json` (3 lines) and the script's URL. So for the ports (-dart, -dotnet, and -c, which
    deferred on X8): the `files` hashes they verify are UNCHANGED; only `generator` moved — they
    copy the new `fixtures.json`. This also satisfies wasmtk's H6.5b wait "loader-js's re-stamp"
    once pushed. It is also the answer to loader-c's **C13** (filed while this session worked; its
    proof — every `files` sha256 unchanged — holds).
  - **H17 (3):** `git grep jrmarcum/wasmtk` in loader-js → no hits (was `VISION.md:4`,
    `scripts/regen-fixtures.ts:80`, `tests/fixtures.json:5`).
  - **H24 + C8 + H27 — ★ re-copied, text-checked.** `cmem/best-practices.md:19` carries exactly
    `Copied from synapticforge1/cmem/best-practices.md on 2026-10-26`. A one-time Bun script
    compared all ★ bullets by number + whitespace-normalized text against this folder's
    `best-practices.md`: HEAD before = 28 / 28, **2 differences (5.2, 6.1)**; after = **0**;
    inverted (one word of 5.1 changed) = 1 difference, `5.1`. C8's creators (rsxtk, wasmrt) may
    count -js as re-copied.
  - **H22 / H25 (d) / H28 — recorded** in `cmem/working-rules.md` § "No secrets or personal
    information": the path test, the secrets rule, the maintainer contact rule (-js keeps the
    address ONLY on commits: `jsr.json` and the generated npm manifest carry none), scans with `-a`.
    Scan of HEAD, text AND binaries (`git grep -a` for the drive / profile / AppData patterns):
    0 hits. `.claude/settings.local.json` gitignored (H25 (b)'s lesson, pre-emptive; nothing was
    tracked).
  - **H16 — set.** `git gc --prune=now`, `fsck` clean, `maintenance.strategy gc`: 2 packs + 75
    loose → **1 pack / 207 KiB**, 0 loose (`git config --local --get maintenance.strategy` = `gc`).
    Recorded in the private `cmem/local/environment.md`.
  - **H20 — recorded** (`cmem/overview.md` § Where it lives): JSR 1.1.1 (rekorLogId
    `3367515417`) and npm 1.1.1 (SLSA v1) were both published FROM the org repo on 2026-10-21, after
    the move; the npm trusted publisher was created after the move. UNMEASURED: whether either
    registry pins numeric owner/repo IDs (no UI shows them) — matters only on another transfer.
  - **The pull line** (`open-work.md` § Owner actions, the ledger's "pull line" rule): loader-js's
    `CLAUDE.md` now reads `workspace-correspondence.md` first, then `handoffs.md` — done in-repo on
    the owner's word in this session.
  - **Runtimes, measured 2026-10-26 (owner asked):** Bun 1.4.4 24/24; Node 22.23.3 / 24.21.0 /
    26.12.0 24/24 each; Deno 2.9.8 24/24 steps; and — new — a **real browser run**: the unbundled
    `tests/loader.test.js` in headless Chrome 156, Edge 156, Firefox 158 and Firefox ESR 153 (scoop)
    (import-map shims for `node:test` / `node:assert/strict`, fixtures over http) **24/24 each**,
    inverted with a 404 on `math_50.wasm` → exactly its 8 tests red in each. 🔒 Owner, 2026-10-26:
    **Bun stands for Safari** (JavaScriptCore). Not yet a committed gate (loader-js open-work); the
    memory commit for this bullet is `21996d3`.
  - **A finding the inversion surfaced — FIXED in loader-js, for the ports to check too:** the old
    `instantiateWasm` swallowed every `instantiateStreaming` error and re-fetched without checking
    `res.ok`, so an HTTP 404 surfaced as an engine's empty-module error (V8, Gecko and JSC each
    worded it differently; silent-fall-through class, ★ 4.3), and a compile/link error cost a second
    download. **Fixed 2026-10-26 (owner: "fix the bug you found"), `64551fa`, merge `848747c`,
    local, NOT pushed, unreleased (a patch; `surface --check` unchanged):** one fetch, `!res.ok`
    throws `wasmImport: HTTP <status> for <url>`, streaming only for `application/wasm`, no catch;
    4 new tests on a local `node:http` server (28 tests; `test:deno` gains
    `--allow-net=127.0.0.1`), inverted against the old loader (3 red for the right reasons); every
    CI gate step green incl. `compat`; four browsers 24/24 with the new 404 message. Suggested: the
    nine ports, which follow -js's load path, check their own http fetch for the same masking (a
    request counter on a local server finds it) — the workspace decides whether that is a letter.
    **Released as 1.1.2, 2026-10-26:** `Release v1.1.2` `7b62387` (gated bump: floor patch,
    v1.1.1's tests 24/24, surface current), tag `v1.1.2`; publish run 40380578962 green (verify →
    JSR ∥ npm → GitHub Release — the first full run of loader-js's one-run design); read back
    independently: JSR rekorLogId `3493886393`, latest 1.1.2, score 100; npm latest 1.1.2, SLSA v1
    provenance, its 11 files byte-identical to the tag; a fresh `npm install` on Node 24 reports a
    404 as `wasmImport: HTTP 404 Not Found for <url>`. loader-js `origin/main` = `bcab4b4` (the
    release record), local = remote. The ports' fixture copies are unaffected (no fixture changed).
- **Notes from universalWasmLoader-js, 2026-11-07 — for the workspace to VERIFY and close**
  (written by the loader-js session; owner: "review workspace for items needing this project's
  attention and make the requested fixes and report back to the workspace to close the issues
  found"; no status cell flipped except C14, which loader-js created). Commits on loader-js local
  `main`: **`39eacc1`** (surface re-baseline alone), **`e621a79`** (behaviour), merge **`bb21168`**
  — **pushed and RELEASED as 2.0.0 the same day** (the owner bumped `jsr.json`, then "tag it
  first": `Release v2.0.0` `1169ab9` = tag `v2.0.0`; publish run 42394507328 green; JSR rekorLogId
  3742189142, npm SLSA v1; `origin/main` `59ad77c`). Answers: ledger H29 (loader-js cell), C29
  (new), C14 (closed).
  - **Found pending for loader-js:** H29 only (to the ports, -js as SPEC owner); C14's workspace
    answer (verified, closed). Every other open row naming -js already holds its answer.
  - **H29, measured on 1.1.2 BEFORE any change** (scratch probe: a local `node:http` server with
    404 / 500 / stall routes and a request counter; Bun 1.4.4 and Node 24 identical): `.wasm`
    404 / 500 → one request, status named; **stalled server → hang**; `.wit` 500 → raw, silently;
    **malformed `.wit` → empty typed proxy** (new finding: `parseWit` never threw — an empty world
    for garbage, a dropped parameter for a missing comma, `s32` for any unknown type); raw
    `multiply` = 10; typed calls coerced; `imports_50` without callbacks → 0. **Check:** run the
    loader at `bcab4b4` (1.1.2) with the same routes.
  - **The owner's SPEC decisions (2026-11-07), as written into `-js/SPEC.md` 4.0.0:** § 2 absent
    (ENOENT / 404 / 410) = raw, every other `.wit` failure throws; § 2 strict parsing (grammar);
    § 4 typed-call argument checks + every WIT import needs a callback, refused at load; § 11 a
    30 s per-fetch limit + `{ timeoutMs, signal }`; § 8 "Refusals" (the cross-port check list);
    § 7 item 8. **Check:** `git -C ../universalWasmLoader/universalWasmLoader-js show e621a79 --stat`
    and `grep -n "4.0.0" SPEC.md` there; `api-surface.json` 12 symbols, `"spec": "4.0.0"`.
  - **Proof:** tests 28 → 63; the new suite against the 1.1.2 loader (`git archive v1.1.2` +
    today's `tests/`) → 31 pass / 32 fail, exactly the new negative tests; every CI gate step green;
    `bun run compat` → floor **major**, v1.1.2's tests 28 / 28 on the new code; Node 22 / 24 / 26
    and Deno 63 / 63 (`test:deno` gains `--allow-write=.test-tmp`, a gitignored folder); four
    headless browsers 49 / 49 (the 14 `node:http`-dependent tests skipped in a page).
  - **Suggested for the workspace's own files (after your check):** `divergences.md` S8 / S9 /
    S10 resolution cells → "SPEC 4.0.0 decided (owner, 2026-11-07); -js implemented `e621a79`;
    ports via C29"; `projects.md` loader-js row → SPEC **4.0.0** owner, 2.0.0 unreleased on `main`.
    ~~One item for the owner: a host callback's RETURN value is not checked (`undefined` → `0`).~~
    **Fixed the same day** (owner: "fix the last item on the callback return values"): **`6b09b37`**,
    merge **`cfd621b`**, released in 2.0.0 — SPEC 4.0.0 § 4 now requires the return value to
    match the WIT result (a `TypeError` otherwise; void ignores it; a Promise is refused; a
    `string`-result import is refused at load); § 8 "Refusals" has the cases. Measured first: seven
    wrong returns silent, only `bigint` refused (by the engine). Tests 73; the 9 new red against
    `e621a79`. **Check:** `git -C ../universalWasmLoader/universalWasmLoader-js show 6b09b37 --stat`;
    C29's item (3) now carries the rule to the ports. Local = `origin/main` (`59ad77c`).
- **Notes from universalWasmLoader-dart, 2026-10-26 — for the workspace to VERIFY and close**
  (written by the loader-dart session; owner: "make the notations so that the workspace can see the
  items already done, perform H19 and C11/H7 and C8"). Commits `b8eebec`, `61a097f`, `0bcd2e9`;
  **force-pushed 2026-10-26** (owner: "try the force push"; `origin/main` = `0bcd2e9`, read back;
  then `5d69813` and `bf049de` pushed, `origin/main` = `bf049de`; the pre-purge bundle deleted; the GitHub Support letter is drafted in loader-dart `cmem/open-work.md` for the owner to send). Each item's answer is in its ledger row; ledger row C15.
  - **H19 purged and force-pushed** (`main` + 3 tags with leases, all accepted; the three re-run
    publish jobs failed at "Publish to pub.dev" with "Create GitHub Release" skipped — measured,
    pub.dev unchanged; see the H19 row). Measured first: every tree of all 19
    commits with `git grep -a`, every commit and tag message → one leak, `CLAUDE.md`'s
    `safe.directory` example in all 19 commits (two variants). Rewritten blob-only, verified pair by
    pair; map `../universalWasmLoader/universalWasmLoader-dart/cmem/history-map-2026-10-26.md`.
    **The workspace quotes two loader-dart OLD ids** (measured 2026-10-26, outside this note):
    `36378fd` → `41b9fda` (this file's H6 sweep bullet) and `bc53669` → `c7b37f6` (the H7 sweep
    bullet; `projects.md:89`); history, resolvable through the map (H21's form) — `projects.md`'s
    may want the new id. ⚠️ **For every repo with a tag-triggered publish:**
    force-pushing a rewritten `v*` tag RE-RUNS the publish workflow (measured here: three runs);
    a registry that refuses an existing version stops it before any release step, but a workflow
    whose publish step tolerates duplicates (`--skip-duplicate`, etc.) would go on to its later
    steps — check yours before moving tags. GitHub may also refuse the move outright under an
    immutable release (binaryen-ts, H19 row).
  - **H7 / C11: a reproducibility finding for the ports and for any byte-identity check.** Rebuilt
    independently at `4a5c3cf668d` (10/10 files identical to the stamp, inverted), the stamp our
    script wrote differed from `-js` `36aa661`'s in `generator.describe` only: `g4a5c3cf6` vs
    `g4a5c3cf` — `git describe` abbreviates to a length that depends on the clone. So the field is
    not reproducible; the ports must COPY `-js`'s `fixtures.json`, not regenerate it (loader-dart
    then did copy it, `61a097f`). Candidate drift-register note; -dotnet has not re-copied yet
    (H7 row).
  - **C8 / H24 / H27** ★ re-copied (5.2, 6.1) and re-stamped; text check 2 → 0 over 28 = 28,
    inverted. **H22 / H28** recorded in `cmem/working-rules.md` § Privacy. **H16** set. **H15**,
    **H20**: record-only (Dart scripts; pub.dev via a credentials secret, not OIDC).
  - **loader-js's masked-HTTP-error question: loader-dart does NOT share it** (read, not run):
    `lib/src/loader.dart:49-54` fetches once, throws `wasmImport: failed to fetch "<url>" (HTTP <n>)`
    on `!res.ok`, then `WebAssembly.instantiate` on the buffer — no `instantiateStreaming`, no catch,
    no re-fetch. The optional `.wit` fetch (`:96-101`) swallows errors by design (no WIT → raw path).
  - **The pull line — done, `0bcd2e9`** (owner: "fix the handoff notation"): loader-dart's
    `CLAUDE.md:7` now reads `workspace-correspondence.md` first, then `handoffs.md` (as its
    `cmem/INDEX.md` and `working-rules.md` do).
- **Notes from universalWasmLoader-dart, 2026-11-07 — for the workspace to VERIFY and close**
  (written by the loader-dart session; owner: "review workspace for items needing this project's
  attention and make the requested fixes and report back"). Commits `aa1af8d` (surface re-baseline
  alone), `5e24ae3` (the code), `cf1dad3` (memory). **Then, same day, on the owner's word ("yes
  release as 0.3.0"; "I agree with splitting into two jobs"):** `cb7bc26` (the two-job
  `publish.yml`) and `1fe255f` (the bump, tag `v0.3.0`) were pushed. Run 42436175882 was green;
  pub.dev serves 0.3.0; the release record `4b951ae` = `origin/main`. Ledger row C31; answers in
  rows C29, C30, H29.
  - **C29 → SPEC 4.0.0, all five items.** The § 8 Refusals table is a test, row by row, in
    `dart test -p chrome` (9 → 37 tests, all green, Dart 3.13.7). The http rows run against a local
    server that the suite starts with `spawnHybridUri` (`test/support/http_server.dart`; it counts
    requests, so "one request per file" and "the `.wasm` is never fetched" are checked from its
    counts). Inverted: the 14 non-http refusal tests are red on 0.2.1's `lib/`; a mutant with the
    `.wit`-500 fallback and no timer turns exactly the 3 matching http tests red. Dart's error
    types: `StateError` (HTTP / network, a WIT export the module lacks), `FormatException` (a `.wit`
    that does not parse), `ArgumentError` (missing callbacks, a wrong callback result or a `Future`,
    a wrong typed-call argument), `UnsupportedError` (an import with a `string` result),
    `TimeoutException` (the limit). Options are `LoadOptions({timeout = 30 s, cancel})`, with
    `timeout: null` for no limit and a Dart `LoadCancelToken` instead of an `AbortSignal`, so the
    future native backend can take the same API. **Version decision: 0.3.0.** The gate's floor is
    major (SPEC 3 → 4 and three changed signatures), and the pre-1.0 Rule 6 minor carries a
    Breaking Changes row. v0.2.1's own tests are 9/9 on the new code. Fixtures unchanged, 12/12.
    Released 2026-11-07 (see above).
  - **Two silent-wrong defects found while porting, beyond the letter** (candidates for other
    ports): (a) **a `.wasm` URL with a query or fragment** (`mod.wasm?v=1`): the old
    `replaceFirst(r'\.wasm$')` did not match, so the loader fetched the `.wasm` ITSELF as the `.wit`.
    Under 4.0.0's strict parsing that would have become a loud parse error instead of raw mode. Now
    the `.wit` URL is built from the path, with the query and fragment dropped (SPEC § 2), and a
    path not ending in `.wasm` has no `.wit`. (b) **`s64` never worked on the web.** Dart's `int` went in as a
    JS number, which an i64 parameter refuses. It now crosses as a JS `BigInt` and returns a Dart
    `BigInt`, tested with a hand-built `add64` module (no fixture uses s64). Ports that run on a JS
    engine may want to check (b).
  - **H29 / C15 correction:** the 2026-10-26 note above said the `.wit` fetch "swallows errors by
    design". Under 4.0.0 that was the S10 `.wit` half (a 500 → raw, silently), now fixed. The
    `.wasm` error text also changed, to `wasmImport: HTTP <n> for <url>` (the -js form).
  - **C30 (record-only), reasoned, not measured:** loader-dart's `publish.yml` has no
    `id-token: write` (it publishes with a credentials file) and no `concurrency:`, so (1) and (2) do
    not apply as written, and (3) does not apply (no Bun). **The same hazard, in this repo's own form:**
    one job runs third-party package code (`pub get`, `analyze`, `test`, the gate) and then writes
    `PUB_DEV_CREDENTIALS` to disk. **Fixed the same day on the owner's go-ahead (`cb7bc26`):** a
    `checks` job (read-only token, no secret) and a `publish` job (SDK and `gh` only, credentials
    removed afterwards, both jobs asserting the tag is still at `github.sha`). It needs no `uses:`
    step, so it fits the `run:`-only policy. First run green (0.3.0). Other credentials-file
    publishers may have the same shape.
- **Notes from universalWasmLoader-dart, 2026-11-09 — for the workspace to VERIFY** (owner: "review
  workspace for items needing this project's attention and make the requested fixes"). Commits
  `a3fd3c1` (workflow + `scripts/ci_release.dart`) and `5b31d52` (memory), **pushed 2026-11-09**
  with `328a17e` (memory) and `58286a0` (a script comment re-worded so H30's re-grep is clean);
  `origin/main` = `58286a0` (`ls-remote`). Answers are in rows H30, H31 and C34. C31 is closed
  (creator).
  - **H30:** the CLI call is replaced by a REST call from a **Dart** script, not a Bun step. Rule 1
    allows the repo's language, and a Bun download would add a second runtime and an H31 pin to the
    credentials job. For workspace rule 9's wording: "a Bun TypeScript step" may want "or the repo's
    own scripting language" beside it.
  - **For any port that runs a script inside its publish job** (C30's rule): run it from OUTSIDE the
    package (`$RUNNER_TEMP`) with core-library imports only. Then `dart run` / the language's runner
    resolves no dependencies and loads no package code.
  - **C34 (1)'s analogue for every registry that refuses a re-upload** (pub.dev, crates.io, PyPI,
    Maven Central, npm): if a step after the upload fails, a re-run stops at "version exists"
    forever, unless the publish step first asks the registry and skips. Measured here on
    2026-10-26 (the H19 tag re-runs); fixed in `a3fd3c1`. loader-rs fixed the same with C30.

- **Notes from universalWasmLoader-dotnet, 2026-11-07 — for the workspace to VERIFY and close**
  (written by the loader-dotnet session; owner: "review workspace for items needing this project's
  attention and make the requested fixes and report back to the workspace to close the issues
  found"). Commits on local `main`, **not pushed or released** (`origin/main` = `957b2c2`,
  `main` ahead 3): **`d5b50c1`** (surface re-baseline alone), **`9e131b2`** (behaviour + tests),
  `bfa7c53` (memory). Ledger row C32; answers in rows C29, C30, H29; C16 closed (its creator).
  - **Found pending for loader-dotnet:** C29 (SPEC 4.0.0), C30 (record-only), H29 (this port's
    remaining halves), C16's workspace answer (to close). C31's two defects were checked here too.
  - **C29 → SPEC 4.0.0, all five items**; the details are in the C29 cell. The § 8 Refusals table
    is a test, row by row (`tests/RefusalTests.cs`, 50 cases). The http rows run against
    `tests/TestHttpServer.cs`, a `TcpListener` on 127.0.0.1 that answers a fixed status, or stalls,
    and counts requests per path. **Inverted:** the new suite on the 3.0.0 behaviour gives 16
    passed / 43 failed, exactly the new negatives; on `9e131b2`, 59/59. **Version decision: 0.2.0**
    (gate floor major; pre-1.0 Rule 6 minor; Breaking Changes row). **Check:**
    `git -C universalWasmLoader/universalWasmLoader-dotnet show 9e131b2 --stat`, then
    `dotnet10 build tests --no-incremental` and `dotnet10 test tests --no-build` there.
  - **Port-specific readings of 4.0.0 (for -js as SPEC owner to accept or correct):** (a) "never
    coerced" is EXACT .NET type: `3` (an `int`) is refused for an `f64` parameter, and an `int` for
    `s64`. (b) A callback is checked by its delegate's STATIC signature at load (parameter and
    result types, `Task` / `ValueTask` refused); only a parameter or result typed `object` is
    checked by value when called. SPEC § 4 says the wrong return is raised "when WASM calls the
    import", so the static half refuses earlier than the letter, with the same information.
    (c) § 11.4: `Load` / `CreateSingleton` / `InstancePool` are file-only, so they take no options
    (n/a, as loader-c reasoned).
  - **Beyond the letter:** a host callback's own exception used to reach `Call` as a Wasmtime trap
    with only its message. A small carrier (`HostFault`) now rethrows the original exception
    (tested). The `.wasm` fetch keeps its query (`mod.wasm?v=1`); only the `.wit` URL drops it.
  - **C31's defects, checked here:** (a) `.wasm?query`: PRESENT in 3.0.0 (the `.wit` URL was the
    whole URL + `.wit`), fixed and tested. (b) `s64` on the web: n/a (Wasmtime is native).
  - **C30, reasoned, not measured:** (1) applies to -dotnet's one-job `publish.yml` (OIDC + test /
    build / gate / pack in the same job; actions pinned by tag). The proposed split is an owner
    item (-dotnet `cmem/open-work.md`), not changed today. (2) and (3) do not apply.
  - **Two method notes for other .NET or HttpClient users:** (1) `HttpClient`'s default
    `Timeout` is 100 s, so a port that "has no time limit" may in fact have an undocumented one. Set
    `Timeout = InfiniteTimeSpan` and limit each fetch with a linked `CancellationTokenSource`, or
    the two limits race. (2) `dotnet test` refuses `--no-incremental` (MSB1001). On exFAT (best
    practice L4), build with `--no-incremental` first, then `dotnet test --no-build`.
  - **Suggested for the workspace's own files (after your check):** `divergences.md` S8 / S9 / S10
    resolution cells → "-dotnet: SPEC 4.0.0, `9e131b2`, in 0.2.0"; `projects.md` loader-dotnet
    row → SPEC 4.0.0, 0.2.0 tagged (nuget.org: 0.1.1 until the Release is published).
  - **Update, same day (owner: "yes release 0.2.0. yes on C30"):** `338e003` (two-job
    `publish.yml`, every `uses:` hash-pinned, also in `validate.yml`) and `93cb185` (bump → 0.2.0,
    tag `v0.2.0`) pushed; `origin/main` = `v0.2.0` = `93cb185` (`ls-remote`). The GitHub Release,
    which is the nuget.org publish, is the owner's web-UI step (`gh` is not installed). One risk
    for that first run: if the org's Actions allow-list names `NuGet/login@v1` by tag, the
    hash-pinned step makes the run end in `startup_failure`, with nothing published. Fix the
    policy, then re-run; a re-run reads the workflow at the tagged commit.

- **Notes from universalWasmLoader-go, 2026-11-08 — for the workspace (and loader-js for C29) to
  VERIFY and close** (written by the loader-go session; owner: "review workspace for items needing
  this project's attention and make the requested fixes and report back to the workspace to close
  the issues found"). Commits on local `main`, **not pushed, tagged or released** (`origin/main` =
  `844f812`): **`1ee9771`** (SPEC 4.0.0 behaviour + tests), **`928d1df`** (the compatibility
  gate), `fd5582f` (memory), merge `eb5007f`. Ledger row C35; answers in the cells of H6, H15,
  H22, H25, H28, H29, C29, C30.
  - **Found open for loader-go:** H6 (★ block, surface gate), H15 / H22 / H25 §3(d) / H28
    (record-only), H29 (checks), C29 (SPEC 4.0.0), C30 (record-only). loader-go was the laggard
    the 2026-10-26 night review named; with these answers no row lists it as un-started.
  - **H29, measured on v0.2.0 before any change** (details in the H29 cell): five of the defect
    classes the other ports found were present here too — no fetch time limit, the silent `.wit`
    500 → raw fallback, loader-dart's `.wasm?query` defect (the `.wasm` fetched a second time as
    its `.wit`), -jvm's raw f64-as-bit-pattern, and silent zeros for missing callbacks — plus
    coercing typed calls and a `u32` `.wit` read as `s32`. All fixed in `1ee9771` and tested.
  - **Port-specific readings of 4.0.0 (for -js to accept or correct):** (a) `s32` / `s64` accept
    ANY Go integer kind, range-checked (an untyped constant is an `int`); `f32` / `f64` accept only
    floating kinds (-dotnet likewise refuses `3` for `f64`). (b) A callback is checked by its
    STATIC signature at load (as -dotnet); only an `any` result is checked by value when called.
    Go has no Promise — a CHANNEL result stands in for it and is refused. (c) **§11.1 divergence:**
    Go's zero-value `LoadOptions{}` means the 30 s default, so a zero limit is not an error here
    (negative is; `NoTimeout` = no limit). Cancellation is the `ctx`. (d) §11.4 n/a: the singleton
    and pool are file-only (as -c and -dotnet).
  - **H6's gate, a Go shape other ports might reuse:** the surface is produced by a Go TEST
    (`internal/apisurface`, go/ast), not a script, so it needs no executable-building runner. The
    Bun gate reads an OLD tag's surface by running the CURRENT test against a `git archive` of the
    tag, so v0.2.0 (which predates the gate) still has a floor. Inverted in six cases (the C35 /
    H6 cells). ★ block first copy, stamped 2026-11-08, 28 = 28.
  - **Two method notes (this repo's best-practices L1 / L2):** (1) a test server that ignores the
    query cannot see a defect in the query — the `.wit`-URL mutant survived until the route
    refused any query; (2) a time-limit test needs its own watchdog, or a "no limit" mutant hangs
    the suite (it ran into `go test`'s 10-minute default) instead of failing it.
  - **C30, reasoned, not measured:** no `id-token: write`, but one job holds a `contents: write`
    token while running third-party code. The split is an owner item (loader-go
    `cmem/open-work.md`), not changed today.
  - **Suggested for the workspace's own files (after your check):** `divergences.md` S8 / S9 / S10
    resolution cells → "-go: SPEC 4.0.0, `1ee9771`, not yet released (v0.3.0 planned)";
    `projects.md` loader-go row → SPEC 4.0.0 on local `main`, ★ block + gate present; the
    2026-10-26 "laggard" line is superseded.
  - **Update, same day — owner: "yes release 0.3.0. yes split the release workflow. for item 3:
    adjust for go".** RELEASED **v0.3.0**: `faf46bb` = annotated tag `v0.3.0` = `origin/main`;
    CI run 42508941015 green (`checks` and `release`); GitHub Release with its notes;
    `proxy.golang.org` lists v0.3.0. The workflow split (C30) is `2ff71ef`: two jobs and NO
    `uses:` steps (Go and Bun pinned by version + sha256). `12e3fb4` fixed a latent notes-step bug
    (a dynamic awk regex gawk reads as a bracket expression). **§11.1:** Go keeps `LoadOptions{}`
    = the 30 s default by the owner's ruling. Suggested `projects.md` row: loader-go v0.3.0,
    SPEC 4.0.0.
- **Notes from universalWasmLoader-py, 2026-11-08 — for the workspace (and loader-js for C29) to
  VERIFY and close** (written by the loader-py session; owner: "review workspace for items
  needing this project's attention and make the requested fixes and report back to the workspace
  to close the issues found"). Local `main` **`f3051f3`** (merge of `568f7f3`, `bb7feb6`,
  `d53abf5`), **NOT bumped, pushed, tagged or published** (`origin/main` = `389a460`). Answers
  are in ledger rows C29, C30 and C34; C17 is closed (its creator).
  - **Found pending for loader-py:** C29 (the SPEC 4.0.0 re-alignment: no answer yet), C30 and
    C34 (record-only), and C17's "creator closes". H6, H15, H22, H28 and the rest already hold
    -py's answers. H29's -py half is now C29's answer.
  - **C29 done:** all five items, (5) n/a (local files only, as -c). § 8 Refusals: every non-http
    row is a test; tests 34 → 91, gate green. Inverted: the new suite on v1.1.1's src gives 57
    failed / 34 passed. Floor **major**, so the version decision is **2.0.0**. One port note for
    -js: `f32` / `f64` refuse a Python `int` (the "floating type" reading, as -dotnet / -jvm /
    -go). **Check:** `git -C universalWasmLoader/universalWasmLoader-py show bb7feb6 --stat`,
    then `pixi run gate` there.
  - **Two findings beyond the letter, both fixed in `bb7feb6`:** raw mode linked a stub returning
    `0` for any import with no callback (`_make_noop`, S9's class outside WIT); a string with no
    `memory` / `cabi_realloc` passed through silently. Also fixed: a non-`.wasm` path no longer
    looks for a companion (`Path.with_suffix` made `math.bin` read `math.wit`).
  - **Measured for the workspace's records:** PyPI serves ONLY `1.1.1` (2026-10-26 20:23 UTC);
    `1.0.0`, `1.0.1` and `1.1.0` answer **404** on the per-version JSON API, and no note in this
    workspace records their removal (🗓️ OWNER: confirm). -py's submodule is at -js `v2.0.0`
    (`1169ab9`), so drift L5's "stale" wording can go. Suggested `projects.md` -py row: SPEC
    4.0.0 on local `main` (2.0.0 pending the owner), PyPI 1.1.1 only, submodule current.
  - **Owner items recorded in loader-py `cmem/open-work.md`:** C30 (1) applies as written
    (`publish.yml` is one job holding `id-token: write` that also installs and runs unpinned
    third-party code; the token is in the clone URL); the C34 PyPI analogue; `InstancePool`
    default `size=2` against SPEC § 6.2's 4.
  - **One method lesson (candidate for the drift register):** a previous tag's test module that
    imports a private helper makes Rule 3 report EVERY test as regressed after a rename (one
    pytest collection error aborts the session). The fix is to import internals inside the test.
  - **Update, same day — owner: "yes C30 applies here. yes 1.1.1 is the only one on pypi. yes
    change the instance pool. yes release 2.0.0".** `InstancePool` size 4 (`93cc2f3`); the C30
    two-job workflow (`ae51e95`); PyPI's 1.1.1-only state is intended. **2.0.0 TAGGED and
    PUSHED:** `v2.0.0` = `main` = `21e680a` (read back); not yet on PyPI (Actions-tab run, owner).
    The tag was moved once, from `13f125a` to `21e680a`, on the owner's word, before anything had
    used it.
  - ⚠️ **For every port whose gate stamps the Breaking row at bump time (candidate drift
    item):** -py's `compat.py --release` (loader-dart's design, ported) looked for
    `| _next release_ |` on the TAGGED commit, but the bump had already stamped it to `| v<x> |`,
    so a MAJOR could never pass bump → tag → CI. It surfaced only on -py's first real major
    (fixed `238afa0`; the 2026-10-26 inversion had tagged an unstamped tree). The pre-1.0 ports
    released minors, so their Rule 4 may never have run on a tag. **Check:** after a real `bump
    major` in a scratch clone, tag it and run your `--release` / CI compat step. Expect pass with
    the stamped row and refusal with no row.
  - **Update, same day:** **2.0.0 PUBLISHED** (owner's run 42517168769, green; PyPI latest 2.0.0).
    Then, on the owner's choices, on local `main` `82f78c8`, NOT pushed:
    - per-file idempotent upload (`eff40fa`);
    - a `ci.yml` gate on every push / PR, and `publish.yml` on `v*` tag push, both pixi-locked
      (pixi 0.84.1 by sha256) (`4548c34`).

    loader-py's `cmem/open-work.md` is empty. ⚠️ **For every port whose publish checks "already
    on the registry" by VERSION:** a version with one of its files uploaded passes that check.
    -py's local `publish.py` reported a half-published version as success. A per-file check
    closes it (PyPI's per-version JSON lists the files). Suggested `projects.md` -py row: PyPI
    2.0.0, SPEC 4.0.0, CI on push / PR.
  - **Update 2026-11-09 — H30 done and pushed, H31 recorded; RELEASED 2.0.1** (owner: "update the
    project memory files, commit, push then release"; answers in the H30 / H31 rows; `origin/main`
    = `330b1fc`). ⚠️ **A finding for every port that publishes from a GitHub environment:**
    -py's memory and workflow comments said its `pypi` environment made every publish wait for the
    owner's approval (the 2026-06-19 hardening). Measured on 2.0.1's tag-triggered run
    42642679890: `publish` started **4 s** after `checks`, so the environment has NO required
    reviewer, and with publish-on-tag a tag push now uploads to PyPI with no approval. Corrected in
    -py's memory and comments; re-adding a reviewer is a web-UI OWNER item (-py `cmem/open-work.md`).
    **Check for your own repo:** in a past tag run, compare the publish job's `created_at` with the
    previous job's `completed_at` (the public Actions API needs no token); a gap of seconds means no
    approval step, whatever your memory says. Suggested `projects.md` -py row: PyPI 2.0.1.
  - **Update, same day — RELEASED 2.0.2 with a CI-made GitHub Release page**, and **new ledger row
    C41** (owner: "the release page should be referred back to the workspace to insure that all
    projects have this setup"). `publish.yml`'s third job `release` created Release `v2.0.2`
    (run 42644832218, `github-actions[bot]`; tag unmoved). C41 holds the setup, its safety order,
    and a measured survey of all repos. Without CI-made pages: wazmrt, zilc, zailc, rsxtk,
    loader-c, -v, -zig; LeptonPad and lisp-wat_interpreter could not be read. Asked of the
    workspace: a letter to those repos, and the owner's calls on -c's "the tag is the release" and
    on backfilling old tags. Suggested `projects.md` -py row: PyPI 2.0.2, Release pages from CI.
- **Notes from universalWasmLoader-zig, 2026-11-08 — for the workspace (and loader-js for C29) to
  VERIFY and close** (written by the loader-zig session; owner: "update this project to version
  0.17.1 of zig. review workspace for items needing this project's attention and make the
  requested fixes and report back to the workspace to close the issues found"). Local `main`
  **`e0b884b`**, **NOT bumped, pushed, tagged or released**; `origin/main` = `34050e1` (ahead 9,
  incl. the 2026-10-26 `541a02e` / `7cbe498` / `e4f026a`, which were never pushed either). Answers
  in ledger rows C29 and H29; row C37 indexes these notes.
  - **Found open for loader-zig:** C29 (SPEC 4.0.0: no answer), H29 (no -zig answer), and the
    `open-work.md` line "loader-zig's toolchain on 0.17.1 is UNMEASURED". H6, H7, H15, H22, H24,
    H25, H27, H28 already hold -zig answers; H16 lists -zig as not needing it; C30 / C34 n/a (no
    GitHub Actions workflow in this repo; Zigistry is a repo topic, no publish token).
  - **Zig 0.17.1, MEASURED (for `open-work.md` § Zig versions):** done, `f417f71` + re-baseline
    `cbd5d8f`. Five removed APIs, each moved to its 0.17 form: `@cImport` → `b.addTranslateC`
    (module import `"c"`); `b.args` → `Run.addPassthruArgs()`; `Run.addPathDir` → the run's env map
    (`getEnvMap` + `setEnvironmentVariable("PATH", …)`); `b.pathFromRoot` → `b.root.joinString`;
    `@typeInfo` records → `field_names` / `field_types`, `decl_names`, `param_types`, `attrs`,
    `error_names`, `field_values`. `minimum_zig_version = "0.17.1"`. Results identical to 0.16.0:
    11/11, the three adder lines. ⚠️ **For wazmrt's later move (and zailc):** these five will bite
    any `build.zig` / reflection code; also **code after a comptime-known `return` is analyzed in
    0.17**, so a trailing `@compileError` fires (loader-zig best-practices L3). Every Zig move
    "waits for that version's ZLS release" (open-work); this one was the owner's direct request.
  - **Gate consequence, a hazard for any repo whose gate builds an OLD tag with TODAY's
    toolchain:** after a toolchain move the old tag may not build at all — `v1.0.0`'s `src/` uses
    `@cImport`. Fixed in `scripts/compat.ts`: a tag's committed `api-surface.txt` is used when it
    has one (the release gate guarantees it was fresh there); a tag with none that does not build
    gets floor **major**, with the compiler's error as the reason. Also the translated header's
    namespace (`cimport.` / `universal_wasm_loader.`) had leaked into 66 surface lines; now keyed
    `c.` (inverted with a scratch tag: snapshot path → floor patch; v1.0.0 → major, reason named).
  - **C29 done** (`3db7d4a` behaviour + tests, `8eae638` surface re-baseline alone, `e0b884b`
    memory): the vendored header is loader-c **v2.0.0**'s byte for byte (sha256 `5ffa482d…`), so
    items 1–4 come from -c; (5) n/a (local files only, as -c). The binding: argument kinds BY ZIG
    TYPE (`i32` = s32, `i64` = s64, `f32`, `f64`, `bool`, `[]const u8`; an integer literal s32 if
    it fits, a float literal f64; other types a compile error) — the C API has no signature
    introspection, so the type is the kind; `call(T)` refuses another result kind (S8);
    `Module.importWith(path, callbacks)` (SPEC §7.1's `hostCallbacks`, missing from the Zig API
    until now); `uwl.lastError()` keeps the C message (it was freed unread: no Zig caller could see
    what any refusal named). Tests 11 → 21, all §8 non-http rows. Inverted four ways (the C29 cell).
    Floor **major** → **version decision 2.0.0**; push and release are the owner's.
  - **Defect found beyond the letter:** every `uwl_str` argument copy LEAKED (built per call,
    never freed) since v1.0.0; fixed in `3db7d4a`. Ports wrapping -c's `uwl_str` should check.
  - **Port readings for -js to accept or correct:** (a) an `i64` is never sent for `s32`, even when
    the value fits (stricter than -go's range-checked "any integer"; the same as -dotnet's exact
    type); (b) an integer literal for an `s64` parameter goes as s32 and is refused (write
    `@as(i64, 5)`) — no fixture has an `s64` or `f32` parameter, so §8 cannot see it; (c)
    `call(void, …)` refuses a non-void result, where -c's `uwl_call_void` discards it.
  - **Suggested for the workspace's own files (after your check):** `divergences.md` S8 / S9 / S10
    resolution cells → "-zig: SPEC 4.0.0, `3db7d4a`, not yet released (2.0.0 decided)";
    `projects.md` loader-zig row → SPEC 4.0.0, Zig 0.17.1, on local `main`; `open-work.md`
    "loader-zig's toolchain on 0.17.1 is UNMEASURED" → measured, `f417f71`.
  - **Update, same day (owner: "add a test for the limitation … I agree that next version would
    be 2.0.0"):** reading (b) is now TESTED, `a85d1b6` (local `main`, ahead 10, not pushed). No
    stamped fixture has an `s64` or `f32` parameter, so two tests write a hand-assembled 70-byte
    module (`sum(i64,i64)->i64`, `half(f32)->f32`, bytes inline) + `.wit` as scratch files: the
    literal is refused naming the parameter and type, the `@as` forms compute. 23/23. Inverted
    four ways; one mutant (a runtime `f64` narrowed to `f32`) was caught ONLY by the new test. ⚠️
    **For every port: §8 has no `s64` or `f32` parameter, so a port can narrow or widen those
    kinds and still pass §8** — loader-js may want such a fixture in the stamped set (wasmtk would
    generate it; nothing here regenerates fixtures). 2.0.0 is the owner's agreed version; the bump
    waits for the owner's word.
  - **Update, later the same day: RELEASED 2.0.0** (row C29 cell). **Second pass (owner: "review
    workspace for items needing this project's attention and make the requested fixes and report
    back to the workspace to close the issues found"):** found H30 (change), C39 (record-only)
    and my own C37 (creator closes). Local `main` **`3192a67`**, **NOT pushed** (`origin/main` =
    `9abda3f`, ahead 4).
    - **H30 done, `1f9ff65`:** `release.ts` reads branch + tag back with `ls-remote` and prints
      the Release page as an owner item; `publish.ts` changes nothing, reads topics from the
      public REST API, and prints the topic step as an owner item (GitHub, 2026-11-08: topics
      none). Rehearsed against a scratch bare remote, inverted (details in the H30 cell).
    - **C39 taken, `d4b785f` + `14d1fad`:** header = loader-c v2.1.0; two tests (a failing result
      import; a failing VOID import in a hand-assembled module stops the WASM). Inverted with the
      trampoline check disabled → exactly those two red. Floor minor → **2.1.0 decided**, not
      bumped. ⚠️ **First real Rule 3 run here:** v2.0.0's own suite, unmodified, green on the new
      src; any port whose last tag predates its suite has never had this check run either.
    - **C37 NOT closed:** `open-work.md:183` still says "loader-zig's toolchain on 0.17.1 is
      UNMEASURED", and the five 0.17 breaks are not beside wazmrt's note (the C37 cell has the
      close condition).
    - **For the workspace:** H30's "measured … loader-zig — `scripts/publish.ts:25`, `:77`–`:78`"
      also missed `release.ts:110`–`:117` (`gh release view` / `create`); both are gone in
      `1f9ff65`. Verify with `git grep -n -w gh origin/main -- scripts` after the push.
- **Notes from universalWasmLoader-v, 2026-11-08 — for the workspace (and loader-js for C29) to
  VERIFY and close** (written by the loader-v session; owner: "review workspace for items needing
  this project's attention and make the requested fixes and report back to the workspace to close
  the issues found"). Local `main` **`a2a49b9`**, **NOT bumped, pushed, tagged or released**;
  `origin/main` = `b12c584` (ahead 4). Answers in ledger rows C29 and H29; row C38 indexes these.
  - **Found open for loader-v:** C29 (SPEC 4.0.0: no answer). H6, H15, H22, H25, H28 and H29 (S8,
    S9) already hold -v answers; H19 / H27 do not list -v as open; C30 / C34 n/a (no GitHub
    Actions workflow; VPM resolves from the repo, no token).
  - **C29 done** (`74d61c3` behaviour + tests + docs, `8f63370` surface re-baseline alone, `1e37929`
    memory, merge `a2a49b9`): the vendored header is loader-c **v2.0.0**'s byte for byte (sha256
    `5ffa482d…`, the same as loader-zig's copy), so items 1–3 come from -c; (5) n/a. The binding:
    `call_*` refuse another result kind (S8), `call_f32` / `call_void` added; `imports_50` refused
    at load (S9; V has no callback API). Tests 42 → 70 asserts, inverted two ways (the C29 cell).
    Floor **major** → **version decision 2.0.0**; bump, push and release are the owner's.
  - **Toolchain hazard, for any repo that runs V through `zig cc`:** after the move to Zig 0.17.1
    the V gate was RED at an unchanged `main` — Zig 0.17's clang makes
    `-Wincompatible-pointer-types` an ERROR (0.16.0 warned), and V 0.5.2's own `builtin` passes
    `&u32` to `WriteConsoleW`'s `LPDWORD` (32-bit unsigned both, LLP64). Fixed in loader-v's
    `scripts/zigcc.v` with `-Wno-error=incompatible-pointer-types` (still a warning). Also: a
    gitignored, already-built `zigcc.exe` is NOT rebuilt by `test.ts` / `release.ts` (they build
    it only when missing), so a clone with a stale binary keeps the old behaviour until it is deleted.
  - **Port readings for -js to accept or correct:** (a) the string-result-import row of § 8 can
    only report the missing callback here (-c checks missing callbacks first and V passes none);
    it still names `env-mul` before any `.wasm` is read; (b) `call_void` DISCARDS a non-void result,
    as -c's `uwl_call_void` (loader-zig's `call(void, …)` refuses it); (c) loader-zig's `uwl_str`
    argument leak does not apply here: the shim frees each string argument after `uwl_call`
    (`uwl/uwl_shim.c:36-37`).
  - **Suggested for the workspace's own files (after your check):** `divergences.md` S8 / S9
    resolution cells → "-v: SPEC 4.0.0, `74d61c3`, not yet released (2.0.0 decided)";
    `projects.md` loader-v row → SPEC 4.0.0 on local `main`.
  - **Update, same day (owner: "yes we want to add the host callback feature"): host callbacks
    added**, `2daacfd` (behaviour + tests + docs) + `08218e7` (surface re-baseline alone, 18 → 27
    symbols, additions only), merge `8cf51f8` (local `main`, ahead 7, NOT pushed). API:
    `import_module_with(path, map[string]HostFn)`, `type HostFn = fn (args []Arg) !Arg`,
    `Arg.as_i32 … as_str`, `nothing()`. So the C29 callback rows are no longer n/a: § 8 `imports_50`
    gives 12.0 / 17; only `envMul` names `envAdd`; six wrong result kinds are refused; the
    string-result row reports its own refusal. Tests 70 → 87 asserts, inverted two ways. Still
    2.0.0. The one thing V cannot do over the C API is the subject of **letter C39 (to loader-c)**,
    below.
  - **Update, same day: RELEASED 2.0.0** (owner: "update the project memory files, commit, push
    then bump and release"). Tag `v2.0.0` (`538c053`) → `3cfce9a`; release record `0d81e4a` =
    `origin/main` (`ls-remote`); a VPM install gives 2.0.0 at `3cfce9a`. No GitHub Release (`gh`
    not installed). The bump came BEFORE the push, deliberately: report-mode `compat.ts` was red
    (v1.1.1's intended-break test) and a red step means no push; `compat.ts --release` on the
    bumped commit was the green gate. **Suggested for the workspace's own files (after your
    check):** `projects.md` loader-v row → 2.0.0, SPEC 4.0.0, released 2026-11-08; S8 / S9
    resolution cells → "-v: SPEC 4.0.0, released in 2.0.0".
- **Letter C39, 2026-11-08 — from universalWasmLoader-v to universalWasmLoader-c: a host callback
  needs a way to FAIL** (found while adding V host callbacks on loader-c v2.0.0's header; MEASURED
  in loader-v only — re-derive before acting).
  - **The gap:** `uwl_host_fn_t` returns a `uwl_val_t`, and nothing else. A callback that cannot
    produce its value has two options. For an import WITH a result, it can return a wrong kind
    (e.g. `uwl_void()`), and `uwl__import_trampoline` traps with "returned no value (void);
    expected …", a message that hides the callback's own reason. For a VOID import there is no
    option at all: `f->has_result` is false, so the value is ignored, no trap is raised, and the
    WASM after the import runs on. SPEC 4.0.0 § 4 says a callback's failure "reaches the caller of
    the export that called it" (-js: the thrown error; -dotnet: "a callback's own exception now
    reaches `Call`'s caller unchanged"); a C or C-wrapping port cannot meet that for void imports
    without leaving the WASM running.
  - **What loader-v does meanwhile** (`uwl/uwl.v` `host_dispatch` / `invoke`): it records the V
    error per module, returns `uwl_void()` (which traps a result import), and reports
    `host callback <name> failed: <msg>` in place of the trap's text. After a void import, the WASM
    finishes and only then does the call fail. Tested on a hand-assembled module whose `run` calls
    the void import `ping`.
  - **Asked (your design, your call):** a way for a callback to make the trampoline TRAP with the
    callback's message, for every import, void included. For example: a `UWL_ERR`-style result kind
    whose `str` is the message (the trampoline returns `uwl__trap_fmt("host callback %s (WIT import
    \"%s\") failed: %s", …)`); or a `uwl_host_fail(ctx, msg)` the callback calls before returning.
    Either is an ADDITION to the C surface (a minor). Ports that vendor the header (-v, -zig) would
    take it on their next re-vendor. loader-zig wraps the same header, so the same gap applies there.
  - **Check:** in loader-v, `test_a_void_import_callback_runs_and_its_error_still_fails_the_call`
    (`tests/uwl_test.v`), and the trampoline in `universal_wasm_loader.h` (v2.0.0) lines 980–1011.
  - **✅ Closed 2026-11-09 by loader-v (the creator)**: loader-c answered with `uwl_err` /
    `UWL_ERR` in 2.1.0 (re-derived: `v2.1.0^{}` = `edc6993` on its `origin`). loader-v took it in
    `ea08973`. The test is now `test_a_void_import_callback_error_stops_the_wasm_at_the_import`:
    a second void import `after` stays uncalled.
- **Notes from universalWasmLoader-v, 2026-11-09 — for the workspace to VERIFY** (written by the
  loader-v session; owner: "review workspace for items needing this project's attention and make
  the requested fixes and report back to the workspace to close the issues found"). Local `main`
  **`5bef88a`**, **NOT pushed** (`origin/main` = `0d81e4a`, ahead 6).
  - **Found for loader-v:** H30 (no `gh`; record, and a change the letter did not list) and C39's
    answer from loader-c (2.1.0). Everything else addressed to -v holds an answer or is closed.
  - **H30 — a measurement correction for the letter:** "no `gh` found in … loader-v" was wrong.
    `origin/main`'s `scripts/release.ts:117`–`:124` ran `gh release view` / `create` (skipped when
    missing). Fixed: the Release page is printed as an `OWNER:` item with its pre-filled
    `releases/new` link; `bump-version.ts`'s two "creates the GitHub Release" lines are re-worded.
    `git grep -n -w gh main -- scripts` → 0 hits. Details in the H30 cell.
  - **C39 — taken and closed** (above). One choice for other wrappers to know: loader-v kept its
    2.0.0 message text (`host callback <name> failed: <msg>`) instead of passing wasmtime's
    multi-line trap text through. v2.0.0's suite pins the text, and the compatibility gate's Rule 3
    turned the change red, so keeping it makes this a PATCH (floor patch; v2.0.0's 87 asserts green
    on the new code). **Version decision: 2.0.1**; bump, push and release are the owner's.
  - **Suggested for the workspace's own files (after your check):** `projects.md` loader-v row →
    "2.0.1 released 2026-11-09 (SPEC 4.0.0, loader-c 2.1.0 header)".
  - **Update, same day (owner: "go"): PUSHED and RELEASED as 2.0.1.** Tag `v2.0.1` (`ef2299a`) →
    `03307ac`; release record `9902d83` = `origin/main` (`ls-remote`); a VPM install gives 2.0.1
    at `03307ac`. `git grep -n -w gh origin/main -- scripts` → 0 hits. Release page: owner item
    (`https://github.com/synapticforge1/universalWasmLoader-v/releases/new?tag=v2.0.1`) —
    superseded the same day: no page for old tags (owner, H32).
  - **Later the same day (H31, H32; owner chose "tag-triggered workflow" and "no backfill" before
    H32 was filed, matching it):** local `main` **`068eeff`**, NOT pushed. A CI release workflow
    (`checks` on windows-latest + `release` → `scripts/github-release.ts`), pinned Bun / Zig / V,
    `fetch-wasmtime.ts` sha256-pinned with time limits, `release.ts` reads the push back. Details
    and proofs in the H32 and H31 cells. **Two method lessons for every repo:** (1) on Windows,
    `sha256sum <path>` may prefix its line with `\` (an escaped path), so `cut -c1-64` silently
    drops the last digit; hash from stdin (`sha256sum < file`). A local rehearsal of the CI job
    with the pinned zips caught it. (2) A `git stash` round-trip on the exFAT checkout hit
    `Permission denied` on a new directory, and the `git stash drop` that followed dropped
    uncommitted work. It was recovered from `git fsck --no-reflog --unreachable`. Commit to a
    branch and clone the commit instead.
- **Notes from universalWasmLoader-v, 2026-11-10 — H33 / H34 answered** (row cells), local `main`
  `34c1214`, NOT pushed. Three lessons for other repos:
  - **VPM installs `main`, not the tag** (a scratch `v install` gave `v2.0.2-2-gbb6363f`). So for
    VPM, `main` is a release channel and H33's "CI checks first" can only confirm after a push —
    the local gate before every push is the guard. Any git-registry repo should measure what its
    registry actually serves (loader-zig's `zig fetch` takes a tag URL, so it may differ).
  - **On Windows, `process.env.PATH = …` in Bun does not reach a child process** (the variable is
    `Path`): pass the child an explicit `env: { ...process.env, PATH: … }`. loader-v's release gate
    had silently depended on a stray gitignored `wasmtime.dll`; a clean-clone rehearsal exposed it.
  - **Rehearse a workflow step from its EXACT text**: parse the YAML with `Bun.YAML.parse`, write
    the step's `run:` to a file, and run it on scratch remotes. That found an empty `grep` under
    `set -euo pipefail` killing the "is this a release?" step when a repo has no tags.

| id  | date       | to        | subject                                                                                                   | status |
| --- | ---------- | --------- | --------------------------------------------------------------------------------------------------------- | ------ |
| H1  | 2026-09-20 | wasmrt, wazmrt | 🔒 Owner decisions: any CLI syntax error throws, no interpretation of mistyped input (retires the `--dir` drive-letter heuristic; H7 is an error); lockstep at 1.0.0+, coordination pass + contract mirror before either releases. Record in your `interop.md`; close §5 rows 10 and 12. | ✅ closed 2026-10-26 — wazmrt `ba205dea7` (v28); wasmrt's copy byte-identical to wazmrt's v40 (`bd97ae2`), verified by SHA-256 |
| H2  | 2026-09-20 | wasmrt    | Memory conformance: cut `CLAUDE.md` to a pointer (48 KB tracked today); INDEX narrative → `open-work.md`; renumber the duplicated `§3.11 §3.12 §1.7 §4.4 §4.5`; README/CHANGELOG/roadmap "reflect a shipped stage" before 1.0.0 (drift-register R1–R9). Policy: `../cmem/memory-conventions.md`. | ✅ closed 2026-10-26 — wasmrt `2ee6628`: `CLAUDE.md` 3,882 B (tracked, a pointer), INDEX 7,297 B, `open-work.md` 4,964 B; no duplicated § number; README clean; R1–R9 closed in the drift register |
| H3  | 2026-09-20 | wazmrt    | Memory conformance: INDEX 182 KB → state in `open-work.md`; one number one place (three binary sizes, three test counts on one date); summarize retained reversals (drift-register Z1–Z6). | ✅ closed 2026-10-23 (re-read + `h3-check.ts` pass and inversion; the last Z row, Z3, closed by `4fd923b`, verified on GitHub `main`). |
| H4  | 2026-09-20 | wasmtk    | Two misleading bullets first: `design-decisions.md` `PT1H` vs `PT1M` (T1); `capabilities.md` hand-written `deno install` without `--allow-ffi` (T6). Then T2–T11. Retag three rules `[wasmtk]` (W4). | ✅ closed 2026-10-22 — wasmtk `c557c890db3` (2026-09-28, T1–T11) |
| H5  | 2026-09-20 | binaryang | B1–B7; the nine-item checklist is canonical in `../cmem/best-practices.md` §5.5 (W5); the wasmtk provenance hypothesis your measurements refute (B7) — you drafted a note, send it. | ✅ closed 2026-11-05 — B1–B6 verified at binaryang `origin/main` (`526d447da (was 8bc2efa1a)`); B7 reversed after measuring, the corrected § 41 letter sent 2026-10-23; drift B1–B7 ✅ |
| H6  | 2026-09-20 | every repo | 🔒 SemVer 2.0.0 with the compatibility gate on every bump script; the ★ rules block copied into your `best-practices.md` under a dated stamp; memory layout per `../cmem/memory-conventions.md`; tooling hard rules workspace-wide. Per-repo list: `../cmem/open-work.md`. | **Night 2026-10-26: gates inverted and in use in -zig, -py, -v, -jvm, -rs (new), -c, -js, -dart, -dotnet; ★ block in nine loaders; memory layout L2 done in -jvm, -rs. Open: -go (no surface gate, no block); H6.5b = the owner's go-ahead only; binaryang's gate per its record** |
| H7  | 2026-09-20 | universalWasmLoader-* | Fixtures: dart's 3 of 4 `.wasm` differ, jvm's `imports_50.wit` differs, py ships its own — regenerate from one `wasmtk modc` run (S4). -go and -dotnet: un-ignore `cmem/` (L1; 🔒 confirmed 2026-10-22 — fine while it displays no secrets or personal information; scan before the first commit). -rs: `overview.md` says published, it is not (L4); vendored `abi.js` is 2.x (L5). Tests for -v and -zig; wazero stays for -go. | ✅ closed 2026-10-26 (night) — one stamped set (wasmtk `4a5c3cf668d`, loader-js `36aa661`) in ALL TEN ports, 11 files each, one SHA-256 set digest `ff3b3ad8b004` measured here; -go and -dotnet track `cmem/` (L1); -rs's `overview.md` and `upstream/` current; -v (`tests/uwl_test.v`, 42 asserts) and -zig (`zig build test`, 11 tests) have suites; wazero stays |
| H8  | 2026-09-20 | wasmrt, wazmrt, binaryang | Divergence measurements requested: I5 opcode-table membership, I6 feature-name lists, I7 `name` section on `.wat` assembly (🗓️ OWNER rule pending), I8 `@custom "name"` through all three. wasmrt's three sweeps against the other two (I3, I4). | ✅ closed 2026-11-10 — wasmrt's side verified (ledger H8) |
| H9  | 2026-09-20 | binaryang | 🔒 You are the SOURCE of the shared definitions (`../cmem/divergences.md` § "The shared definitions"). First step: D1's schema + population from the wabt-ts opcode table, proved by regenerating your own table and diffing zero; publish as a `./definitions` subpath (a new export = minor). Then D2 from your feature flags + wasmtk's per-file sets. D3 after C1. Each is a surface under the compatibility gate. Also: your one-front-end stage 5 is now the TRIGGER for wasmtk to drop its WAT regexes in favour of your parser (I2) — say in `unreleased.md` when it lands. | ✅ closed 2026-10-22 — `./definitions` shipped in 1.9.0 (2026-10-08; D1 `db153a5cc`, D2/D3 `3c76184d0`); stage 5 landed 2026-09-28 (`824a4b435`) |
| H10 | 2026-09-20 | wasmrt, wazmrt, wasmtk | 🔒 Your opcode table, feature list and (later) verdict strings become GENERATED copies of binaryang's D1/D2/D3: a script in your repo reads the pinned source and writes the copy; the copy is committed with the source hash; your gate regenerates and diffs. Hand-editing a copy is a DEFECT. Do not start before H9 lands its schema; do file now any entry your table has that you suspect the source lacks. | open |
| H11 | 2026-09-20 | wasmtk    | 🔒 Owner: your regex-over-WAT text (`wasmmerge`, `wasmbundle`, `wasic`) gives way to binaryang's parser when binaryang's one-front-end work reaches stage 5 (`../cmem/divergences.md` I2); and "anything wasmtk can offload in the main program will ultimately be a benefit" (I10). Asked now: an INVENTORY of what `main.ts` + `src/` does that binaryang, a runtime, or a loader could own, each with the trigger that would let it move — no moves yet. Note binaryen-ts's old DESIGN row scoping `wasm-merge` to you. | ✅ closed 2026-10-26 — inventory answered (`offload-inventory.md`); `wasmbundle` runs on binaryang's `bundle()` since wasmtk `d65f4c64377` (binaryang's `wasm-bundle` shipped in 1.10.0). What remains (exact relocation, offload #1 for the wasic MERGE path) is wasmtk's own list |
| H12 | 2026-09-20 | wasmtk, binaryang | 🔒 Owner: `wasic` (TS → WAT) will become part of binaryang's `wasm2ts` feature once it is "sufficiently capable and less buggy" (I11). wasmtk: this raises the priority of `wasic-modularization-plan.md` — a monolith moves as modules; keep `compiler-bugs.md` classifying every entry as silent-wrong or loud, since the silent-wrong count is part of the proposed bar. binaryang: the subpath is decided — **`./ts2wasm`** beside `./wasm2ts`; reserve it in the exports map plan (a new export = minor); no code yet. wasmtk: `wasic` is retired when `ts2wasm` lands, so design the modularization so each module's seam is the one a future `ts2wasm` import crosses. **Both: do NOT scope `ts2wasm` / `wasm2ts` — the owner opens that scope once both repos are more stable.** | open |
| H13 | 2026-09-20 | wasmrt, wazmrt | **Three body-encoding divergences from wasm-tools, measured over 532 `.wat` files in wasmtk's tree** (`../cmem/divergences.md` I12–I14): (1) locals written one entry per local instead of runs — 464/528 bodies differ, 460 fixed by regrouping alone, +3.01 % bytes; (2) exports emitted grouped by kind instead of source order — 2 files, visible through `WebAssembly.Module.exports()`; (3) a tag's implicit `(func)` type and a multi-value block type interned in swapped order — 2 files, the same class as Z4 cause 3. You are byte-identical to EACH OTHER on 528/528, which is how these hid: the Z4 gate compared you to each other. **The check, not the conclusion**: assemble the corpus with `wasm-tools parse`, strip custom sections from both outputs, compare bodies byte for byte; expect 64/528 today. Scripts: `../tools/assembler-parity/measure.ts` and `normalize.ts`. Invert by breaking one fix. wasmrt: also mirror wazmrt's v22 Z4 close into your `interop.md` (H1). | wazmrt ✅ closed 2026-10-22 (`9aee871d1`; re-measured here 603/603 identical to wasm-tools) · **wasmrt ✅ closed 2026-10-26** (fixed 2026-10-23: `scripts/body-parity.ts`, bodies = `wasm-tools parse` 603/603, `interop.md:556`; verified the files and lines exist). ⚠️ The workspace harness still holds a stale wasmrt build — rebuild before `measure.ts` |
| H14 | 2026-09-20 | binaryang | **Two custom-section differences from the runtimes and wasm-tools** (I7, I15): your `name` section follows wabt's shape plus labels/fields (a recorded decision) and is always written (3 identifier-less files get a 10-byte section wasm-tools omits); your CLI writes `binaryang.text-form` by default on 190/528 files (+1.6 %). Your module BODIES match wasm-tools on 528/528 — nothing to fix there. 🔒 Owner, same day: **your fidelity mandate (WAT ⇄ wasm, unless optimized) stands; these extras are DESIGN, a plus-side divergence — keep them.** Nothing to change. The open question is on the PIN side (digest the body, not the bytes — I7); you may be asked for a "canonical body" helper (`wasm-strip`-equivalent applied before hashing) once the owner decides. The check: `../tools/assembler-parity/measure.ts`. | open |
| H15 | 2026-10-22 | every repo except wabt-ts / binaryen-ts | 🔒 Owner, 2026-10-22: **a COMMITTED script that stays in the repo for repeated use (anything that would otherwise be a shell script — not product code, not tests) is written in your language's own scripting mechanism; where there is none, TypeScript run by Bun. **A mechanism that has to BUILD AN EXECUTABLE to run the script does not count — use Bun** (owner, third clarification, 2026-10-22; measured: `dotnet10 run --file` writes an `.exe` + `.dll`; `zig run`, `go run`, `v run` build native executables; pixi's Python, `dart run` and Kotlin `.main.kts` qualify — the owner allows a JVM `.jar`: "Java and Kotlin can use the jar files"). A one-time script deleted after use may stay a shell script** (still written with `Write`, never a heredoc; promote it before committing it). Deno stays only where JSR publishing needs it. Table + reasons: `../cmem/working-rules.md` § Tooling rule 1. **A port replaces its TS original only after it is PROVED equivalent** — same inputs, diff the output (files, stdout, exit code), one input that must fail, comparison recorded in the commit; until then the TS script stays in use. Per repo (**amended 2026-10-22** from -dotnet's P6 measurement, `divergences.md` § "P6 measurement", verified here with `git ls-files`): **Bun (record the rule; nothing to port)** — binaryang, wasmtk, loader-js, wasmrt, rsxtk, loader-c. **loader-rs → Bun: port `scripts/bump.sh` and `scripts/release.sh`** to TypeScript under the proof rule (the first version of this letter wrongly said "nothing to port"). **wazmrt → Bun** (revised: `zig run` builds an executable): `working-rules.md:87-93` still says "Deno is the default"; move `tools/{phases,bakeoff,emitter-diff}.mjs` from `deno run` to Bun (TypeScript or plain `.mjs` under Bun) under the proof rule; your two `tools/*.zig` are build tools invoked by `build.zig` — say in your memory whether you count them as scripts, and the owner decides (`examples/deno_ffi_capi.mjs` and `vision.md:97-138`'s Deno FFI path are product questions — leave them to the owner). **loader-zig → Bun — already conforms** (scripts on Bun since 2026-10-21; revised: no `zig run` port). **loader-py → pixi's Python** (never host `python3`): port `scripts/{bump-version,publish,release}.{sh,nu}` (six committed files; Nushell is a shell for this rule). **loader-jvm → `.main.kts`** (owner: the cached `.jar` is fine on the JVM): port `scripts/bump.sh` under the proof rule; `gradlew.bat` is Gradle's generated wrapper, not a script. **loader-dotnet → Bun (REOPENED, revised)**: C# file-based apps build `hello.exe` + `hello.dll` (measured), so your recorded "C# has it, so Bun is not used here" no longer holds — record that committed scripts would be TypeScript on Bun; nothing to port (you commit none); scratchpad probes stay your choice (a one-time `.cs` is fine — the rule governs committed scripts). `.csx` (dotnet-script, not installed here) would compile to a cached `.dll`; the owner's `.jar` allowance names Java and Kotlin only, so C# stays on Bun unless the owner extends it. **loader-go → Bun** (revised: `go run` builds an executable); record only. **loader-v → Bun (revised)**: `v run` / `.vsh` compile a native executable, so your 4 committed `scripts/*.vsh` move to TypeScript on Bun under the proof rule — the `.vsh` stay in use until each port is proved. **loader-dart → already conforms** (`dart run` builds no binary, measured); record the rule. Stale lines seen in the sweep, check before editing: binaryang `bun-migration.md:3-5`, `working-rules.md:34,46-47,58` (post-B7); loader-v `cmem/INDEX.md:18,27` (old "Deno/TypeScript" rule); loader-jvm `overview.md:172`, loader-rs `overview.md:155` (-js's retired `deno task bump`/`publish`). wasmtk: this also closes your W1–W3. | **loader-dotnet ✅ closed again 2026-10-22** (reopened by the "builds an executable" clarification, then recorded: its `working-rules.md` says C# falls back to Bun; its one committed script, `scripts/compat.ts`, runs on Bun — verified at `origin/main` `a7b0a10`) · **wazmrt ✅ closed 2026-10-23** (`d445fbd`: Bun for every script `build.zig` runs, FFI demo on `bun:ffi` by owner direction; `1e37ec0`: all 25 probes on Bun, proven against the Deno originals; 🔒 owner: the two `tools/*.zig` that `build.zig` builds are build steps, not scripts — verified at `origin/main` `1e37ec0`) · **rsxtk ✅ closed 2026-10-23** (`e7e29de`, on `origin/main`: workspace script + privacy rules adopted; Rust → Bun; it commits no scripts — verified with `git ls-files`) · **loader-c ✅ closed** (`ebcced1`, `0271ef3`; `overview.md:209`) · **night 2026-10-26: -py ✅ ported to pixi Python (`7b7a282`…`ada5c2e`, 24-case proof), -v ✅ ported to Bun (`e760e1f`, 42-case proof), -jvm ✅ `.main.kts` (`4cd10f6`), -rs ✅ Bun (`70cc2da`, 14 cases), -dart ✅ conforms, -zig ✅ conforms** · open: -go (record), S3D and zilc (owner questions, H26) · **✅ CLOSED 2026-11-08** — S3D and zilc answered 2026-10-27/28; loader-go recorded `fd5582f` (verified on `origin/main`) |
| H40 | 2026-11-19 | loader-dart, -jvm, -go (tier 1); loader-py, -dotnet, -rs (tier 2); loader-c, -v, -zig (tier 3, record) | 🔒 **Owner, 2026-11-19: "I agree. This limits the added testing for each to what is required."** Three testing tiers, decided by the ENGINE under a project (read from your manifests 2026-11-19); full text: workspace `platforms.md` § "Three testing tiers". **Tier 1 — per engine: loader-dart** (web-first, only `web`: the browser's engine), **loader-jvm** (Chicory, pure Java), **loader-go** (wazero, pure Go, no cgo) — with the TypeScript projects of letter H39. Run your suite once per engine on one machine; put every OS call (files, paths, network, processes, environment) in ONE host module named your language's way — `host.dart`, `Host.kt`, `host.go` — with a gate that fails when any other file calls those APIs, and an on-demand self-check in it; OS-specific testing concerns that module alone, and only when it or the pinned runtime changes. loader-go: wazero's code generation differs for x64 and arm64, so one run per processor type when an arm64 machine is at hand — not one per OS. **Tier 2 — one platform plus a smoke check: loader-py** (`wasmtime` wheels), **loader-dotnet** (`Wasmtime` NuGet), **loader-rs** (`wasmtime` crate). Your own code has nothing OS-specific, but your engine is a native library per platform: run the full suite on one platform, and on each other platform an install-and-run SMOKE check (install as a user does, load one module, call one export); a platform where the engine's library is not available is `none` in your matrix, with that reason. **Tier 3 — the full matrix: loader-c, loader-v, loader-zig** (you link wasmtime's C library and are built per platform) — record only: nothing changes for you. **For all:** nothing waits on a later platform (H37's "Tested on" rule); what was not run is `pending`; record your tier at the top of your `cmem/platforms.md`. Answer with your commits (tier 1: the module, the gate, the self-check; tier 2: the smoke check; every tier: the matrix). | open |
| H39 | 2026-11-19 | binaryang, wasmtk, S3D-ReportCompiler, LeptonPad, universalWasmLoader-js | 🔒 **Owner, 2026-11-19: "Let's make the changes for the typescript projects I noted, that way we do not over test something."** Full text: workspace `platforms.md` § "The TypeScript projects". **(1) Test what you compute per ENGINE, on one machine** — V8 (Node, Deno), JavaScriptCore (Bun); LeptonPad: the browser engines — not per platform, and no separate arm64 run: the runtimes hide the OS and the CPU for pure TypeScript, and a `.wasm` module is the same bytes everywhere. **(2) One module named `host`** (owner: "one module named the same per project … all of the OS/platform specifics lives in one place"): every call that touches the system — opening and writing files (never over an input, never half-written), temp files, paths, environment, starting other programs — goes through it; add a scripted gate that fails when any file outside `host` imports the runtime's file, path or process APIs. **(3) An on-demand self-check in `host`** (owner): `--self-check` tries `host`'s operations on the machine it runs on and reports what fails; only when asked, and it cleans up after itself. **(4) OS-specific testing concerns `host` alone:** its tests run on an OS when that machine is at hand and again only when `host` or the pinned runtime changes; a release that changed neither carries the last result forward; nothing waits for it (H37's "Tested on" rule) — an OS not yet run is `pending`, and the tool is checked there when it is met, by the self-check. **(5) Your matrix** (`cmem/platforms.md`) uses a sixth status, `runtime`, for a platform covered by the runtime and by `host`'s result for its OS (your arm64 rows). **Per project:** **binaryang** — the library per engine; the CLI's file and path handling is `host`. **wasmtk** — files and the compilers you start are `host`; your existing I/O layer is the start of it. **S3D-ReportCompiler** — `host` is reading the input and writing the output (your in-memory zip reader is not OS-dependent); while a report can still go to Chrome that route stays OS-dependent and is tested on each OS you claim for it; once the native renderer with its bundled fonts draws everything, compare the reference reports' digests across OSes. **LeptonPad** — the app per browser engine; its server side runs on Linux only. Moving calls into `host` is a refactor: do it under your gate, with the reference results unchanged. Answer with your commits (the module, the gate, the self-check, the matrix). · **🔒 Confirmed by the owner, 2026-11-19: "yes for host.ts, and yes for loader-js."** The module is the file `host.ts` in each project. **universalWasmLoader-js is added to this letter:** the loader's logic is tested per engine (the engine's own WebAssembly runs the module); reading a `.wasm` / `.wit` from disk or over the network is `host.ts` | open |
| H38 | 2026-11-17 | the 18 active repositories (LeptonPad pending the owner's answer) | 🔒 **Owner, 2026-11-17: "Project memory guide (cmem)".** `../cmem/memory-guide.md` is the owner's document in its words; read it — this is the summary. **Why:** a session should learn where the project stands from one small file and open anything else only when its task needs it (measured 2026-11-17: four projects hold 1.2–1.8 MB of notes; single files of 356–384 KB; wasmtk's INDEX 34 KB; about 2,600 lines over 200 characters). **Layout:** root `CLAUDE.md` (untracked) points at `cmem/STATE.md` and `cmem/INDEX.md` and holds nothing else; `STATE.md` — where the project stands now (template in the guide; headings `## Now`, `## Review`, `## Next`, `## Waiting on owner` required; rewritten, never appended; counts only, no issue content, no machine facts); `INDEX.md` — a router, one line per file saying WHEN to read it, each under 120 characters, no rules or history; `working-rules.md` (the rules, present tense); `open-work.md` (OPEN items only); `design-decisions.md` (decisions and how a rule changed); `review-process.md`; topic files, one subject each (`platforms.md`, `release.md`, testing, architecture …); `review-issues.md` (gitignored); **`cmem/archive/`** — closed items and superseded notes, grouped by release, IDs kept, read by nobody unless asked; `cmem/local/`. Working artifacts (probe outputs, review mutants) leave `cmem/` for a folder of their own. **Limits, held by the size check:** INDEX.md 3 KB; STATE.md 60 lines; any other live note 25 KB; any line outside a code block 200 characters; `archive/` and `local/` unlimited; a project may record a different value with its reason in `working-rules.md`. **Writing rules:** one subject per file with a summary and a last-verified date at the top; one fact per line; a stable ID on every tracked item; the rule, not its history; open and closed never share a file; link, do not restate. **Session routine:** start — STATE.md, INDEX.md, your workspace correspondence rows, then only the topic files STATE's "Read next" or the task names; end — rewrite STATE.md, move closed items to `archive/`, record decisions and rules, run the size check and fix what it reports. A reviewer gets its brief and STATE.md and does not browse `cmem`; any other sub-agent gets the exact files the main agent picked from the index. **Migrate, in this order** (steps 1–3 give most of the saving, one session): (1) write STATE.md; (2) cut INDEX.md to a router — its rules to `working-rules.md`, its history to `design-decisions.md`; (3) point `CLAUDE.md` at the two files; (4) move closed items to `cmem/archive/` (open review issues go to `review-issues.md`, not the archive); (5) split files still over 25 KB; (6) wrap or split lines over 200 characters; (7) copy `../tools/check-cmem.ts` to `scripts/check-cmem.ts` (Bun; no dependencies; `--summary` for counts) and run it at the end of every session. **Where you stand** (the owner's table, in the guide; re-run it on your own tree): every repo lacks STATE.md and has an INDEX over 3 KB; files over 25 KB / lines over 200 — wasmtk 16 / 721, binaryang 19 / 582, wazmrt 11 / 362, wasmrt 9 / 278, zilc 8 / 211, S3D 5 / 143, zailc 2 / 126, the loaders and rsxtk 0–1 / 3–51 (those can pass in one session). Where two projects hold the same file (`interop.md` in wazmrt and wasmrt) both copies stay; name one owner. **Held for the owner's answer:** your ★ best-practices copy (leave it as it is until decided — do not delete or split it). Answer with your commit per migration step and your check's summary line; the workspace re-runs the check on your `origin/main` and closes per repo. | open |
| H37 | 2026-11-17 | every project (lisp-wat_interpreter excepted) | 🔒 **Owner, 2026-11-17: "Review standard — final."** `../cmem/review-process.md` is rewritten from the owner's document, in its words; it REPLACES the 2026-11-12 / 11-13 standard (letter H35: nested tiers, seven security surfaces, 3–4 reviewers a round, efficiency last, the two record paragraphs checked by the release script and CI) and binaryang's trial rules (letter H36). **Read the file; this is the summary.** **Five required reviews before every release, in a fixed order — basic, hardening, licensing, security, privacy — after an optional efficiency review** (§ 1). The owner's words: "review" runs all five; "basic review", "hardening review", "licensing review", "security review", "privacy review", "efficiency review" run one class. Each class answers ONE question, has a CLOSED item list (§§ 3–8) and a severity floor (§ 11); boundary rules put a finding in exactly one class (§ 2), and a reviewer who meets another class's finding records it under that class and does not pursue it. **The loop (§ 9):** (1) first review — one agent per class, in class order, the full scope since the last release, each later agent given what is already reported; (2) the main agent triages — a rejection as intended design cites its record or goes to the owner, and is recorded; (3) it fixes ALL accepted findings of one class together, then the next class, targeted tests after each; (4) a NEW agent per class re-reviews — the original issues, the fixes and the reasoning, confirmed by a run, scope = the fix changes and the code they affect, never the whole scope again; (5) the first empty re-review ends it, then the full suite ONCE on every supported platform. A finding two consecutive re-reviews leave open goes to a new agent that gives the owner options. **Briefs and gates (§ 10):** the brief is the class's item list word for word plus the scope, nothing else; fixes on a local review branch, merged to `main` when the review completes; issues in **`cmem/review-issues.md`, gitignored**; scripted checks (privacy and credential scan, vulnerability check, licence inventory against an allowlist, reference suites, API surface) are GATES, not reviews, and **every gate, the test suites included, runs locally and is not repeated on GitHub — CI only publishes**; a reviewing agent never commits, pushes or releases. **Platforms (§ 12):** six IDs — `win-x64`, `win-arm64`, `mac-x64`, `mac-arm64`, `linux-x64`, `linux-arm64` — and a support-matrix table (Platform, Status `shipped` / `tested` / `emulated` / `none`, Target name, Tested on — a role only) in your slot file. **Do, in your own repo (§ 13):** (a) rewrite your `cmem/review-process.md` slot file from the standard, with the two new slots (where your licence inventory and notices live; which of your outputs can carry user facts) and your support matrix; (b) add `cmem/review-issues.md` to `.gitignore`, and have your privacy gate check it is untracked; (c) move OPEN issues from tracked ledgers into it (rows already fixed stay); (d) in your release script, replace the check for the security and hardening record paragraphs with a run of the review set as its first step; (e) remove the TEST steps from your GitHub workflows so CI only publishes — keeping what belongs to publishing (tag = manifest version, is-this-a-release, the tag, the page, the publish, skip-if-published, the registry read-back; `release-process.md` § 5 U1 / U5 as amended); (f) update your "Owner commands" section to the seven review words. A CHANGED release job is rehearsed before it lands and never lands mid-release (best-practices 7.22). The two test machines (an x86_64 Mac with Parallels 26, an arm64 Mac with Parallels 27) are the owner's; until a platform's machine exists, your matrix says what was tested where. Write your commits into your ledger row; the workspace reads them on `origin/main` and closes per repo. · 🔒 **Confirmed by the owner, 2026-11-17:** "your read is correct on the local review and the CI steps. We want the CI to verify the version, then tag, create the release page and publish, and skip any version already published." So work item (e) stands as written: the tests leave CI; CI verifies the version, tags, makes the page, publishes (reading the registry back), and skips a version already published · **🔒 Two amendments, owner 2026-11-17 ("I agree"; `review-process.md` § 12):** **(1) `cmem/platforms.md`, one per repo** — the support matrix moves there (your `review-process.md` slot becomes a one-line pointer), followed by a section per platform ID only where there is something to say: the quirk, the setting that handles it, where it lives in the code, why. Settings stay in code and build files; each platform-specific setting carries a comment with its platform ID so a search finds them and a gate can check notes against code. Open platform issues go in the gitignored `cmem/review-issues.md`, tagged with the ID; a fixed issue's lesson moves into `platforms.md`; per-release result lines go in that release's `cmem/release.md` entry; machine names stay in `cmem/local/`; facts common to every project are in the workspace's `platforms.md`. **(2) Release now, add platforms later** — a release goes out once the reviews are clean and the full suite passes on every platform that has a machine today; the page, the release entry and the matrix list those as verified and the rest as `pending` (a new status). When a machine exists, an ADD-PLATFORM step runs the full suite on that platform at the released tag, appends its result line to the entry and the page, and attaches that platform's build if you ship one per platform — the one case that writes to an existing Release page (append only, tag unmoved). A failure there is a finding and reaches users as a patch release. Work item (g): create `cmem/platforms.md` and tag your platform-specific settings · **🔒 Linux, owner 2026-11-17 (workspace `platforms.md`):** `linux-x64` is one ID with a DISTRO axis — the dev machine's WSL proves Ubuntu only ("the one in wsl is ubuntu only"); a series of distros is trialled as Parallels guests on the Intel Mac; list the distros you were tested on in the second table of your `cmem/platforms.md`, and name the distro in each `linux-x64` result line. **The Linux baseline is every distro version in STANDARD vendor support today, 64-bit only** (owner: "The idea is to cover all of the version still in support to date"; "alpine is on the list and musl will be used for it"; "we are on 64 bit only"): **glibc 2.28** (RHEL 8 and its rebuilds, in support to 2029-05-31, are the oldest — the owner's first figure, 2.34, would have left them out); every Linux build you ship that links glibc targets 2.28 (Zig `-target …-linux-gnu.2.28`; Rust / C against a 2.28 sysroot), a gate reads the binary's highest required `GLIBC_` version and fails above 2.28; **a second, musl build for Alpine**; a pure-source artifact records that it is unaffected; no 32-bit build is made or claimed · **🔒 For now, owner 2026-11-19:** "provide a 'tested on ?? OS and ?? platform' for now until a release is made for all others. I do not want to hinder development by waiting on the other testing. At least for now." So: no release waits on a platform that has no test run; every release carries a `Tested on: <OS and version> (<platform ID>)` line per platform actually run (the distro named for Linux) — on the Release page, in the `cmem/release.md` entry and in the README — and claims nothing for the others (`pending` in your matrix; "other platforms: not yet tested" on the page). The others are added later by the add-platform step | open |
| H36 | 2026-11-15 | **binaryang** (for its trial; NOT yet the workspace standard) | **Owner, 2026-11-15, to the workspace:** binaryang's reviews "get stuck in the reviews that it keeps expanding … dial in the rules so that it maintains a focused review run that does not expand past the initial scope of the review, either by the main model or the reviewers … always focused on one code error class and not multiple"; then "just the recommended for now please. we are still trying to refine the rules and speed up the review process that is currently in a seemingly endless cycle." **This letter is that recommendation, for your trial beside your six ON-TRIAL rules (`cmem/working-rules.md`); the workspace standard (`../cmem/review-process.md`) is unchanged until the owner's fine tuning.** **Why it expands (read in your records, 2026-11-15):** (1) the standard's § 1.4 briefs each round "on axes earlier rounds did not cover" — an instruction to widen; (2) "stop when a round finds nothing" is applied to an OPEN hunt by fresh reviewers told to find defects, which is almost never empty (your "review" ran 9 rounds; security round 3's class 1 ran 16 retests); (3) nesting makes each round multi-class — round 4's frozen scope still held (A) + (B) + (R1) + (R2) over every file and returned 16 findings in four-plus classes; (4) "fixed as its class" let the class's definition widen (shared subtrees → all data → output size → wrong results), and fixes grew into design work (new gates, `readBinary`'s `validate`). **The rules to try:** **R1 — one run = ONE class, on a CARD frozen before any reviewer launches** (the owner reads it first): the class in one sentence; a MEMBERSHIP TEST ("a finding belongs only if …"); the files / entries in scope; the depth; what is explicitly OUT; the budget. A definition that needs "and" / "or" between different kinds of defect is two cards. A changed card is a closed run and a new one. **R2 — two kinds of round.** HUNT, once only, never repeated in a run: every member of the class inside the card. FIX-CHECK, at most TWO rounds: reviewers get the list of fixes and answer three questions per fix — does it hold, did it break anything, is it complete for the finding it answers; they do NOT hunt, and every item they return names the fix it concerns. A non-empty second fix-check ends the run: the leftover list goes to the owner — no third round. **R3 — the reviewer reports two lists:** IN-CLASS findings, each quoting the membership test it meets and carrying a reproducing RUN; OUT-OF-CLASS observations, one line each, not investigated, at most about five. A finding only reasoned, never run, goes on the second list. The brief's "ATTACK (not exhaustive)" becomes the exhaustive list for this run, and never ends "anything else in the class". **R4 — the main session:** does not edit the card after launch; does not verify, fix or re-brief on the out-of-class list — it goes to the backlog word for word, and the OWNER picks the next class from it; "fixed as its class" = every member found INSIDE the card, never a wider definition; a fix that needs new design (an option, a gate, a public-surface change) is not made in the run — the minimal fix goes in, the design item goes to the backlog; documentation wording is corrected without another round. **R5 — nesting is a QUEUE, not a wider round** (the owner's nesting stands): a tier is an ordered list of single-class runs — the review's classes, then the security review's, then the hardening review's — each on its own card; the tier is done when every class on its list is closed. Fix your class list up front (your (A), (B), (R1), (R2) and H-2 … H-6 are natural cards, each split until it passes R1's "one membership test"). **What to record for the fine tuning:** per run, the card, the hunt's count, each fix-check's count, the out-of-class count, wall time, and whether the budget ended it. Answer in your ledger row with how the first two runs went; the owner decides what reaches the workspace standard. **🔒 Addendum, owner 2026-11-15 — what each review looks for (the goal every card of that review must serve; a card outside its review's goal is not opened in it):** **"review"** — "code correctness, presence of work arounds, and patches that should be final fixes, and result fidelity based upon the corpus." **"security review"** — "whether or not there are any attack surfaces that would let an attacker take control of our code or the repo." **"hardening review"** — "weak code that can easilly be broken by changes in other code sections." **"efficiency review"** — "whether or not the code is as efficient as it can be for speed of execution and memory usage after all the other checks have been satisfied." Natural cards under R1: review → (1) correctness, (2) workarounds and patches where the final fix belongs, (3) fidelity against the corpus; security → (A) control of the code, (B) control of the repo; hardening → fragile code, cut by the coupling it depends on (e.g. hidden assumptions about another module's output, order or invariants; duplicated constants and tables that must agree; behaviour held only by convention, not by a type, a check or a test); efficiency → speed, then memory, each measured. ⚠️ **This hardening goal differs from your 2026-11-15 re-scope** ("robustness — crashes, depth, memory, cost — is the HARDENING review's") and from the workspace standard's § 4 (environments, failure paths, limits): under the owner's four goals, robustness against malformed or oversized input had no stated home (asked of the owner by the workspace, 2026-11-15). **🔒 ANSWERED, owner 2026-11-15: "robustness as you define it would break weak code, so it would go in the hardening class."** So the hardening review looks for WEAK CODE, by what breaks it: (1) changes in other code sections (fragile coupling), and (2) malformed or oversized input — crashes, hangs, nesting depth, memory and cost. Your re-scope stands, and **H-2 … H-6 ARE hardening cards** — each opened under R1 (one membership test, scope, depth, out-list and budget frozen first), one run at a time. | ✅ closed 2026-11-17 by the workspace — SUPERSEDED by the owner's final standard (H37) before the trial's results came in |
| H35 | 2026-11-12 | every project (lisp-wat_interpreter excepted) | 🔒 **Owner, 2026-11-12: "accept the review process and make it a standard for all projects. each project may have differing individual issues, but the overall process should be the same."** The process is S3D-ReportCompiler's (ledger C46), now `../cmem/review-process.md` — the same in every project. **Three more owner words**, beside "commit" / "push" / "release": **"review"** (a targeted agent code review — § 2), **"security review"** (§ 3: seven surfaces), **"hardening review"** (§ 4: seven axes). **The floor (§ 1):** fresh reviewers given the CODE, not your conclusions; one per area, 3–4 per round, scopes not overlapping, read-only, own scratch folder, no private data; a finding carries file:line, a concrete scenario, run-or-reasoned, MEASURED severity (silent wrong output > crash > loud refusal > cosmetic), confidence, and what was found sound; each finding re-verified by a run before any change, fixed as its CLASS, with a test that fails without the fix (inverted; a mutant per part); your reference results re-run after each group; rounds on the fixes, briefed fresh, **until a round's reviewers find nothing — then the review stops**; the owner decides scope and order; a review never commits, pushes or releases. **🔒 A security review and a hardening review are REQUIRED before every release**, each run to its empty round on everything since the last release, and recorded in that release's entry in `cmem/release.md` BEFORE the bump (release-process.md U1). **Do:** (1) add the three words to your "Owner commands" section (H34) pointing at the workspace file; (2) fill YOUR slots (§ 7): private-data paths, your worst silent case, your reference results, your CI matrix, your seven security surfaces, your environment matrix, your findings ledger and work record — in `cmem/review-process.md` or a section of your rules; (3) make "release" check that the entry records both reviews. Reference: S3D's own `cmem/review-process.md` (on its local `main` until the owner's "push"). Write your commit into your ledger row; the workspace reads it on `origin/main` and closes per repo. **➕ Addendum 2026-11-13 (owner, in binaryang's session): a FOURTH word, "efficiency review" — OPTIONAL, never required for a release** ("add it as an optional check instead of a required check prior to release"), and run only AFTER the security review AND the hardening review, whose checks it must never weaken. Findings are MEASURED (a number before and after, dated); a round is empty when it finds no regression against the last release past your threshold and no measured hot spot past your threshold with a fix shown to work. `../cmem/review-process.md` § 8 (seven lenses), § 0, § 7 item 4. **Do (4):** add "efficiency review" beside the three words, and name your benchmarks and thresholds; "release" must NOT require it. A project that already answered H35 adds (4) to its row when it next works. **➕ Addendum 2 (2026-11-13, owner, in binaryang's session): the tiers NEST** — "The 'security review' should also include the regular 'review'. the 'hardening review' should include the regular 'review' plus the 'security review' also." So each round of a "security review" also briefs a code (correctness) reviewer, and each round of a "hardening review" briefs reviewers for all three layers; a round is empty only when every layer's reviewers find nothing (`../cmem/review-process.md` § 0, §§ 3–4). **Do (5):** say so beside the review words in your rules. **➕ Addendum 3 (2026-11-13, owner, in binaryang's session): ONE CLASS AT A TIME** — "fix one class of error at a time and retest for that class of error then once cleared of that error type move to the next error class"; "it should go into the workspace rule". A round's findings are grouped into classes; each is fixed, then retested for that class alone by fresh reviewers until a round finds none of it, then the next class (`../cmem/review-process.md` § 1.3). **Do (6):** add it beside (5). | ✅ closed 2026-11-17 by the workspace — SUPERSEDED by the owner's final standard (H37) |
| H34 | 2026-11-10 | every project (lisp-wat_interpreter has no `cmem/`) | 🔒 **Owner, 2026-11-10: the three words.** "when I say 'commit' each project should run 'update the project memory files' then commit to the branch being worked on. when I say 'push' each project should perform the 'commit' command then merge to main. when I say release each project should perform the 'push' command and perform the release process. please write that into each project." Asked the same day: "push" also pushes `main` to GitHub (owner: "Merge and push to GitHub"); the workspace's write is left uncommitted (owner). **Written into your tree by the workspace on that direction** — a section "Owner commands: "commit", "push", "release"" appended (19 lines, nothing else changed) to `cmem/working-rules.md` (binaryang, wazmrt, zilc, the ten loaders), `cmem/INDEX.md` (wasmtk, wasmrt, rsxtk, S3D-ReportCompiler, zailc) or `cmem/conventions.md` (LeptonPad). **Do:** read it (`git diff cmem/`); move it where your own layout wants it if you like, keeping the words; it is committed by your next "commit". Workspace: `cmem/working-rules.md` Tooling rule 12. | open |
| H33 | 2026-11-10 | every repo that releases (lisp-wat_interpreter excepted) | 🔒 **Owner, 2026-11-10: "write up each projects release process. we need it to be semi-uniform."** (Answers binaryang's C44.) `../cmem/release-process.md` now has **§ 5 the uniform shape** — twelve slots U1–U12 every project fills in this order and under these names (U1 the go and an explicit level, no default; U2 merge first, the bump its own commit by the tooling; U3 the bump tool: clean tree with untracked counted, surface floor, previous-release tests; U4 one guarded release script, ONE atomic push `git push --atomic origin main vX.Y.Z`, `ls-remote` read-back, never `tag -f` / a forced tag push; U5 a token-less `checks` job; U6 `publish` with only the credential, installing nothing, skip-if-published; U7 provenance or its nearest equivalent read back and FATAL; U8 `release` in H32's order after the registry serves; U9 actions by commit hash or no `uses:`, tools by version + sha256, per-tag never-cancelled concurrency; U10 install as a user; U11 record newest first; U12 re-run failed jobs, never a new or moved tag), **§ 6 per ecosystem** (JSR + npm, crates.io, PyPI, NuGet, Maven Central, pub.dev, Go proxy, git-tag registries, no registry: the credential, the read-back, the floor tool, the reference repo), **§ 7 one card per project, measured 2026-11-10 at `origin/main`: what meets § 5 and YOUR "To converge" list**, § 8 three owner decisions (D1 git-tag ecosystems' exception to rule 3; D2 crates.io off the workstation and onto trusted publishing; D3 one record place). **Do:** read your card; record the shape in your `cmem/`; converge slot by slot under your own gate, a CHANGED release job rehearsed before it lands (best-practices 7.22) and landed before a release, never during one; where a slot cannot apply, record why. Write each commit into your ledger row; the workspace re-reads your tree and closes per repo. **🔒 Addendum, owner's decisions the same day (`release-process.md` § 8):** **D1, every project — the order is "CI to check first, then push the tag, and then create the release page from the tag, then publish the package to the registry"**: your release script pushes `main` only (no local tag, ever); CI runs `checks` on that commit, and only when green, for a new version, CI creates the tag (U6), then the page from the tag (U7), then publishes and reads back (U8) — in ONE run (`needs:` / `workflow_call`), since a `GITHUB_TOKEN` tag push starts no new run. JSR repos: re-measure binaryang's "a bot-pushed tag cannot publish to JSR" under this order before relying on it. git-tag ecosystems: CI's tag is the publish. **D2:** crates.io publishes from CI only (wasmrt: off the workstation), all three crates via trusted publishing. **D3:** every project records releases in ONE place, **`cmem/release.md` § "Release History", newest first, each version with a summary of what changed** — move your existing release records there and leave a pointer. | open |
| H32 | 2026-11-09 | every repo that tags releases (record); **change:** wazmrt, rsxtk, zilc, zailc (at its first tag), loader-c (a `release` job), loader-v and loader-zig (a tag-triggered CI workflow + `release` job — owner, 2026-11-09); LeptonPad (measure yourself) | 🔒 **Owner, 2026-11-09 (through loader-py, ledger C41): "the release page should be referred back to the workspace to insure that all projects have this setup."** Every tagged release gets its GitHub Release page made BY CI — never by hand, never by `gh` (H30, Tooling rule 9). **The setup** (loader-py's, measured on its 2.0.2, run 42644832218; the same order already runs in -rs, -dart, -go, -jvm, -dotnet, -js, each in its own language): a `release` job after the registry upload (`needs:` it), `contents: write` only, no checkout of package code beside the write token (C30); a script (repo language, else Bun) calls the REST API with `GITHUB_TOKEN`. **Order — keep it:** (1) the tag exists on GitHub and peels (annotated tags followed) to `github.sha`, because `POST /releases` CREATES a missing tag (loader-rs's hazard); (2) a Release already there = done, no write (re-runs safe); (3) `POST` with `generate_release_notes` (a registry link on top if you publish to one), then read it back and re-check the tag. Every network call has its own time limit (`best-practices.md` 7.21). Mock-API tests plus an inversion (loader-py `tests/test_github_release.py`: 9 cases, 2 mutants); measured on GitHub only by the next real tag run. **Survey (loader-py, public REST API, 2026-11-09: tags / pages / pages by `github-actions[bot]`):** have it — binaryang 30/29/29, wasmtk 78/72/38, wasmrt 19/10/10, S3D 13/13/13, -dart 5/5/5, -dotnet 4/2/2, -go 4/4/4, -js 13/11/10, -jvm 8/5/5, -rs 6/6/6, -py 7/1/1 (binaryang, wasmtk, wasmrt and S3D still make theirs with `gh` — H30 changes HOW, keep the page). **No CI-made page: wazmrt 10/0/0, rsxtk 2/1/0 (one manual page), zilc 2/0/0, zailc no tags yet** — add the job. **Owner's answers, 2026-11-09:** (a) loader-c (6/0/0, "the tag is the release") — **"yes. From this point forward it is the release page"**: from its next tag on, loader-c's release IS its CI-made Release page; add the `release` job to `vcpkg-release.yml` (or a sibling workflow) after the registry step. (b) loader-v (4/0/0) and loader-zig (3/0/0) — **"they both need the CI and release pages, not by hand"**: each adds a tag-triggered GitHub Actions workflow that runs its release checks and then the `release` job; `release.ts` stops printing the page as an owner item once that job lands (it still pushes the tag and reads it back). ~~(c) backfill old tags' pages?~~ **DECIDED — owner, 2026-11-09: "only new tags will get release pages."** No backfill: no web-UI pages for old tags, no one-off workflow; a tag without a page stays without one. The job serves every tag cut after it lands. **LeptonPad, lisp-wat_interpreter:** 404 without a token (private/absent) — LeptonPad measures its own. Record the rule; add the job under your gate before a release, never during one; write your commit and the first page's `author.login` into your ledger row. | open |
| H31 | 2026-11-09 | every repo (record); **change:** binaryang, zailc, loader-js, loader-c, LeptonPad (pins); binaryang, zilc (one current-tense line each) | 🔒 **Owner, 2026-11-09: "update any notations on bun version to the latest installed version always."** The latest installed Bun is this machine's: **1.4.4 on Windows (scoop) and in WSL (`~/.bun/bin`), `bun --version` measured 2026-11-09** (the owner installed it on Windows today; WSL moved 2026-11-07, C33). **Standing rule:** when the owner installs a newer Bun, each repo moves its notations at its NEXT SESSION — check `bun --version` (both hosts if you run in WSL) before you write a Bun version. **What moves:** everything that says which Bun is installed, pinned, used or tested NOW — CI `bun-version:` / `BUN_VERSION` / installer tags (`bun-vX.Y.Z`) and the sha256 that pins each download (take it from Bun's `SHASUMS256.txt`), Docker base tags, `@types/bun`, setup instructions, "tooling on the dev host" lines, the current test-matrix line. **The minimum supported Bun moves too — owner, 2026-11-09: "the minimum supported version will be updated to the latest version currently installed."** A floor CI job, `engines.bun`, "Bun 1.4+", "Bun X or later", `≥ X` all become the latest installed Bun; this rule replaces a floor's old reason. **What does not move — owner, the same day: "leaving test results as is is correct, until the test is rerun."** A DATED measurement ("measured on Bun 1.4.3, 2026-10-12") stays as written until that test is re-run; the re-run adds its own dated line. A moved pin or floor is a test change: run your gate on the new Bun first; a CI pin is proven by its next real run. **Measured 2026-11-09 at each tracked tree (`git grep -i bun`, version-shaped), what is behind 1.4.4:** **binaryang** — `bun-version: '1.4.3'` at `.github/workflows/auto-tag.yml:75`, `ci.yml:40`, `:158`, `:195`, `publish.yml:79`, `:175`; `cmem/bun-migration.md:698` "`bun` 1.4.3 is installed" (current tense). **binaryang's Bun FLOOR 1.4.0 → 1.4.4** (the one repo with a declared Bun floor job): `ci.yml:219`–`:221` (job "Bun 1.4.0 (floor)"), `main.ts:9` "Bun 1.4+", `README.md:407`–`:408` (the floor's Zig→Rust reason), `cmem/project.md:58`, `:66`, `:74`, `cmem/testing.md:408`, `cmem/jsr-deno-exit-guide.md:306` "pin Bun ≥ 1.4.3"; once the floor equals the pin, whether the floor job still earns its place is yours. **LeptonPad's floor 1.4.3 → 1.4.4:** `readme.md:21` "Bun 1.4.3 or later", `cmem/build-and-deploy.md:13` and `cmem/bun-migration.md:133` "Bun ≥ 1.4.3". A raised floor reaches your users: say it in the release that carries it, under your own version rule. **zailc** — `auto-tag.yml:45`/`:48`, `ci.yml:39`/`:42`, `publish.yml:46`/`:49` (step name and pin), `tools/package.json:9` `"@types/bun": "1.4.3"` (C33 asked the same; unpushed `main` may differ — re-grep). **loader-js** — installer `bash -s "bun-v1.4.3"` at `ci.yml:41`, `:146`, `publish.yml:85`, `:142`, `:235`; matrix entry `ci.yml:130` "Bun 1.4.3". **loader-c** — `vcpkg-release.yml:54`, `:73` `bun-version: 1.4.3`. **LeptonPad** — its container base image and its record `cmem/build-and-deploy.md:180` (a shipped image: its own release, as your `bun-migration.md:92` says). **zilc** — `cmem/open-work.md:417` still opens "Bun 1.4.3 in WSL"; `tools/README.md:23`–`:25` and `roadmap.md:190` say 1.4.4 in your working tree but 1.4.3 at `HEAD` (uncommitted — commit them). **Already 1.4.4:** wasmtk, wasmrt, S3D-ReportCompiler, loader-go, loader-rs, loader-py, loader-v. **No Bun version written:** wazmrt, rsxtk, loader-jvm, loader-dotnet, loader-dart, loader-zig. No other declared Bun floor was found (`git grep` for `≥` / `>=` / `+` / "or later" / "floor" / `engines` beside a Bun version, at `HEAD`); re-check your own manifests. The many dated "measured on Bun 1.4.3 / 1.3.14" lines in binaryang, wasmtk, wasmrt, S3D, loader-js stay until those tests are re-run. Full text: `../cmem/working-rules.md` § Tooling rule 10. Record the rule in your own memory, move your lines under your own gate, write your commit into your ledger row. | open |
| H30 | 2026-11-08 | every repo (record-only) | 🔒 **Owner, 2026-11-08: `gh` (the GitHub CLI) is not installed and will not be** — "it has been found to be more complicated to use than it is worth"; "just checking the repo is easier". **Check the repo instead:** read what GitHub holds with `git` itself — `git ls-remote origin` for branches and tags, compared with your local `origin/*`; `git fetch` in your own repo; a registry's public API for a published version. Do not plan work around `gh`, and do not record an item as "blocked on gh" or "`gh` absent": a task only GitHub's web UI can do (a Release page, a repository topic, a Support request) is an OWNER item — write it as one. **CI too — owner, the same day: "yes change those".** No workflow calls `gh`, even though GitHub's runners preinstall it. Replace each call with GitHub's REST API from a Bun TypeScript step — `fetch` with the job's own `GITHUB_TOKEN` (`run:` only launches it, Tooling rule 1) — or drop the step if its output is not needed; your choice, recorded. A release workflow change is proven only by its next real run (and your dry-run, if you have one): land it BEFORE a release, never mid-release, and keep the step's permissions as narrow as today. A local script must not need `gh` either; where it made a Release page, print the page's URL as an owner item. **Measured 2026-11-08 at each `origin/main` (`git grep`), what each of you has to change:** **binaryang** — `auto-tag.yml:113` `gh workflow run publish.yml` (the dispatch), `publish.yml:136` `gh release create`. **wasmtk** — `publish.yml:69` `gh release create`. **wasmrt** — `release.yml:85` `gh release create`. **S3D-ReportCompiler** — `publish.yml:69`, `:79`, `:102`, `:117` `gh api` (the tag's commit, the release branch, the compare with `main`, CI's run for the SHA) and `:660` / `:664` `gh release view` / `create`; your tests pin the spelling (`tests/build.test.ts:4684`, `:4774`). **zailc** — `publish.yml:138`, `:141` `gh release create` (unpushed `main` may differ — re-grep). **loader-go** — `release.yml:153`–`:156` `gh release view` / `edit` / `create`. **loader-js** — `publish.yml:349`. **loader-jvm** — `publish.yml:149` `gh api …/git/refs`, `:154` `gh release create`. **loader-rs** — `publish.yml:161`, `:164`. **loader-dotnet** — `publish.yml:166`. **loader-dart** — `publish.yml:166`. **loader-py** — `scripts/release.py:122` tells the user to run `gh`. **loader-zig** — `scripts/publish.ts:25`, `:77`–`:78` REFUSE to run without an authenticated `gh`. No `gh` found in wazmrt, rsxtk, LeptonPad, zilc, loader-c, loader-v. Full text: `../cmem/working-rules.md` § Tooling rule 9. Record the rule in your own memory, re-word any "`gh` absent" note, make the change under your own gate, and write your commit into your ledger row. ⚠️ **Correction 2026-11-09:** loader-v DID call `gh` (`scripts/release.ts:117`–`:124`); the measurement above missed it. | open — ✅ verified (0 `gh` calls at `origin/main`): loader-rs, -v, -zig, -go, -js, -jvm, -py, -dotnet, -dart, S3D-ReportCompiler, binaryang, wasmrt; pending: wasmtk (done locally, unpushed), zailc |
| H29 | 2026-10-26 | **the ten universalWasmLoader ports** (and -js as SPEC owner; 🗓️ OWNER for the one SPEC decision) | **Three behaviour checks across the ports, found by the ports themselves today — run the CHECK, record the result in your memory, write the commit into your row of `../cmem/workspace-correspondence.md`.** Rows: `../cmem/divergences.md` S8, S9, S10. **(1) S10 — HTTP errors on the `.wasm` fetch must not be masked, and fetches must time out.** -js found its `instantiateStreaming` catch + re-fetch turned a 404 into an engine's "empty module" error (fixed `64551fa`, 1.1.2: one fetch, `!res.ok` → `wasmImport: HTTP <status> for <url>`); -jvm had the same on `.wasm` (fixed `462119d`, 0.2.1) and NO timeout at all (fixed 0.3.0: 10 s connect / 30 s response, owner's values); -dart never masked it; -dotnet's `.wasm` fetch throws on non-success. **Check** (ports that fetch over HTTP — -c via its header? -go, -rs, -v, -zig, -py if any path fetches): serve `math_50.wasm` from a local server with a request counter; load a URL that answers 404 and one that answers 500: expect ONE request and an error naming the HTTP status; then a server that never answers: expect a timeout, not a hang. **(2) S10's second half is a SPEC decision, not a port bug — 🗓️ OWNER with -js:** SPEC 3.0.0 §63 says a `.wit` that "cannot be fetched (e.g. 404 or network error)" → raw exports, so -jvm, -dotnet (`TryFetchWit` catches everything) and -py (`except Exception: wit = None` on an EXISTING `.wit`) all fall back silently on a 500 / timeout / parse error. Decide once, in `-js/SPEC.md`: does only a 404 mean "no `.wit`", with every other failure an error? Until decided, record which behaviour your port has. **(3) S8 — a typed call whose result type does not match the export, and raw mode's encoding.** -v measured `call_str` on an `s32` export → `''`, `call_i32` on an `f64` export → `0` (★ 4.3 class); -jvm's raw mode (no `.wit`) returned f64 results as their BIT PATTERNS and turned a `String` arg into `0` from 0.1.0 to 0.2.1 — encoding by the host value's type instead of the export's wasm signature (fixed 0.3.0). **Check:** remove `math_50.wit`, call `multiply(2.5, 4.0)` raw: expect `10.0`; call a typed accessor with the wrong kind: expect an error, never a silent zero or empty string. **(4) S9 — a WIT import with no host callback:** the C header returns 0 for a missing callback (`universal_wasm_loader.h:666-669`) and so does `abi.js`; -v measured `imports_50` loads with no callbacks and `scale` / `combine` return 0. **Check:** load `imports_50` with no host functions: does it load, and what do the exports return? Record; the owner / -js classify (SPEC §4 is silent). **Already answered:** -js (1), -jvm (1), (3) raw half, -dart (1), -dotnet (1) `.wasm` half, -v (3), (4). Nothing is written into your tree from here. | ✅ closed 2026-11-08 — every port answered; the owner decided SPEC 4.0.0 (2026-11-07); all ten ports released on it (ledger H29 cell) |
| H28 | 2026-10-26 | every repo (record-only; nothing to rewrite unless you cite the two retired repos as a live location) | 🔒 **Two owner decisions, 2026-10-26 evening.** **(1) The maintainer address can carry to every repo:** besides the registry manifest field and the commit author/committer address, ONE committed `cmem/` note that names the maintainer contact (a collaboration or overview note, as LeptonPad's `cmem/collaboration.md`) may carry it — whether or not the project publishes. Nowhere else; not repeated. Full text: `../cmem/working-rules.md` § Records. A record-only change: a repo that already keeps the address only in its manifest or commits changes nothing. **(2) wabt-ts and binaryen-ts are RETIRED:** removed from the workspace folder (done 2026-10-26, after every local and GitHub ref of both was checked against binaryang's bundles — `../binaryang/cmem/local/predecessors/`, private: `*-all-refs.bundle`, `github-*-mirror.bundle`, 39 tags each, two nested-clone tars, the notes archives); the GitHub repos `synapticforge1/wabt-ts` and `synapticforge1/binaryen-ts` are deleted by the owner; on JSR every version of `@jrmarcum/wabt-ts` (32) and `@jrmarcum/binaryen-ts` (39) except **1.5.1** is yanked by the owner. What that means for you, measured here 2026-10-26: **no tracked file in any repo links either GitHub repo; no manifest or lock pins either JSR package** (`git grep` over every repo's `*.json`, `*.lock`, `*.toml`); the only sibling-relative paths into the two folders are history lines in binaryang's `cmem/` (its `tests/**` `../../wabt-ts/wasmtk/…` URLs resolve INSIDE binaryang). So: do not cite `../wabt-ts/…` or `../binaryen-ts/…` as a location again; their curated memory is binaryang's `cmem/wabt-ts.md` and `cmem/binaryen-ts.md`, the wings `git show 9758fc736:cmem/<wing>/` in binaryang, the histories the bundles. A consumer of 1.5.1 keeps working; its provenance will point at a deleted repository (JSR keeps the attestation). binaryang: your mirror commit `2325cf4a4 (was 04f31c916)` is unpushed — the push is the owner's. wasmtk: `cmem/legacy-claude-archive.md` and the H18 record mention the pair as history — leave them. The workspace's own `layout-and-packaging.md` nested-clone line and `projects.md` rows are updated. | ✅ closed 2026-11-10 — rsxtk recorded (`0b1d968`), the last addressee (ledger H28) |
| H27 | 2026-10-26 | the nine repos with a ★ block: **wasmtk, rsxtk, universalWasmLoader-c, -dart, -dotnet, -js** (old folder name in the stamp), **binaryang, wasmrt** (relative-path stamp), **wazmrt** (own wording); and the eight repos with a prose reference to the old folder | 🔒 **Owner, 2026-10-26: the workspace folder is `synapticforge1` (it was `wasmExamples`), and the ★ stamp is to be up to date.** New canonical stamp, exact: **`Copied from synapticforge1/cmem/best-practices.md on <date>`** (`../cmem/memory-conventions.md` § Open book). Measured here 2026-10-26 with `git grep -i 'copied from .*best-practices'` and `git grep wasmExamples` over every repo. **(1) Re-stamp** at your next re-copy of the block — most of you owe one anyway (H24's rule 5.2, and ★ 6.1's commit id once the canonical text is fixed, C8): wasmtk `cmem/best-practices.md:728`, rsxtk `:11`, loader-c `:29`, -dart `:27`, -dotnet `:33`, -js `:19` carry `wasmExamples/cmem/best-practices.md`; binaryang `:46` (`../../cmem/best-practices.md`, and `:575` for § 5.5) and wasmrt `:1906` (`../cmem/best-practices.md`) carry a relative path, which never went stale but is not the one wording — change it to the canonical string when you next re-copy; wazmrt: your § 7 stamp matched neither pattern — check its wording yourself and align it. A text check of the 28 ★ bullets (number + normalized text, as rsxtk, wasmrt and wazmrt did on 2026-10-26) is the proof; re-date the stamp. **(2) Prose that names the old folder as a LOCATION** (drift X18) — replace with a sibling-relative path (`../<repo>/…`) or a placeholder: binaryang `cmem/testing.md:111,624`, `cmem/binaryen-ts.md:505`, `cmem/wabt-ts.md:922`; wazmrt `cmem/testing.md:75`; wasmrt `docs/port/06-build-docs-licensing.md:3`; LeptonPad `cmem/collaboration.md:85`, `cmem/design-decisions.md:73`, `cmem/bun-migration.md:15`; zilc `cmem/upstream.md:127`. The hits that embed the old folder inside a full drive path (ub-cosmic, zailc, zilc, loader-dart) are H18/H26 items, not this letter. Nothing executes on the stamp; this is record hygiene, so bundle it with your next memory commit — no separate push. Write your commit into your row of `../cmem/workspace-correspondence.md`; the workspace verifies and closes. | ✅ closed 2026-11-10 — rsxtk re-stamped (`0b1d968`), the last addressee (ledger H27) |
| H26 | 2026-10-26 | **LeptonPad, S3D-ReportCompiler, ub-cosmic, zailc, zilc** (the five repos added to the workspace) | 🔒 **Welcome to the review: you are now under the workspace floor (`../cmem/working-rules.md`, `memory-conventions.md`, `best-practices.md`), and this is what the 2026-10-26 read-only sweep found.** Measured here with `git grep` at HEAD, `git config --local`, `count-objects`, `git log --all` for the key files, the GitHub API, and a read of each `cmem/`; nothing was written into your tree. Index of every open item: `../cmem/workspace-correspondence.md`. **Common to all five:** (1) **none carries the pull line** ("At session start, read `../cmem/handoffs.md` …") — the owner adds it as on 2026-09-20 (🗓️ `open-work.md` § Owner actions); until then read `../cmem/workspace-correspondence.md` yourself at session start. (2) **None has the ★ block** — copy `../cmem/best-practices.md`'s 28 ★ rules VERBATIM under a `Copied from wasmExamples/cmem/best-practices.md on <date>` stamp (the stamp text keeps the old folder name; the folder is `synapticforge1` now), and compare TEXT, not count (H6, H24). (3) **None records the privacy rule's path test** (H22: "machine-specific?", not "absolute?"). (4) **Personal drive paths at HEAD** (H18; zailc, zilc, ub-cosmic and S3D are PUBLIC): zailc `cmem/oracle.md:31`, `cmem/releasing.md:7`, **`cmem/workarounds.md:289,292` — a USER-NAMED `C:/Users/<name>/…` path, the strongest class**; zilc `cmem/INDEX.md:11`; ub-cosmic `cmem/overview.md:79`; S3D `cmem/roadmap.md:430`; LeptonPad `cmem/known-issues.md:253` (an elided `safe.directory` entry that still names the drive and the project tree; LeptonPad is private). Fix at HEAD with relative paths or placeholders; then measure your own history over EVERY ref and purge under H19 (paths only — the maintainer address on commits is allowed, owner 2026-10-26); record the old → new map. (5) **H16, the exFAT `.git` fix:** S3D, ub-cosmic and zailc have NO `maintenance.*` config (1 pack each today — set `git config --local maintenance.strategy gc` now, before it grows); LeptonPad uses `gc.auto=0` + `maintenance.auto=false` (1 pack) and zilc `maintenance.geometric-repack.enabled=false` + `maintenance.gc.enabled=true` (3 packs, 1 prune-packable) — three recipes for one symptom (divergence P7): say in your memory which failure yours answered, so the owner can pick one. (6) **The org move:** GitHub answers 301 for `jrmarcum/{S3D-ReportCompiler, ub-cosmic, zilc}` → `synapticforge1/…`, but **`origin` still names the old URL in those three** (zailc's is right; LeptonPad is private and unverifiable from here — its own § 44 says moved 2026-10-22). Stale links at HEAD: zilc `cmem/INDEX.md:37,114`, `cmem/releasing.md:5`, **`cmem/upstream.md:102,114` (the URL upstream maintainers are given)**; S3D `README.md:236`, `cmem/INDEX.md:71`; ub-cosmic `cmem/overview.md:10`; and **ub-cosmic's image names** `ghcr.io/jrmarcum/ub-cosmic[-nvidia]:latest` in `README.md:79`, `BUILDING.md:14,15,24`, `disk_config/iso.toml`, `cmem/` ×6 — **UNMEASURED whether GHCR still serves the old name after the transfer**; check `skopeo inspect docker://ghcr.io/<owner>/ub-cosmic:latest` under BOTH owners before any user runs `bootc switch`, and whether the daily `build.yml` publishes under the new owner. **Per repo. LeptonPad:** `cmem/collaboration.md:3` holds the owner's personal address in a committed file — the rule allows it in a registry manifest field and on commits only, and you publish to no registry (🗓️ OWNER; the repo is private today, the rule says "committed file"); `package.json` `build:wasm` pulls **`jsr:@jrmarcum/wasmtk` UNPINNED with `--no-lock`** — wasmtk's next release is **3.0.0 with three breaking items**, so pin a version (divergence S7; wasmtk's H6.5b consumer check names you); memory bootstrap 65 KB (INDEX 63.7 KB, `known-issues.md` 103 KB) vs the ~10 KB floor (W3-class; state in one place, one-line pointers); your Bun-only task-script rule (2026-10-22) conforms to H15; `.env*` never tracked (verified over history), `*.zone` ignored. **S3D-ReportCompiler:** your five `scripts/*.ts` run under `deno run` with Deno APIs; H15 keeps Deno only where JSR publishing needs it — 🗓️ OWNER whether they port to Bun (`deno publish` is invoked either way; your `practices.md` § 15 exempts them today); gitignored `CLAUDE.md` 7.4 KB with a status table (floor ~5 KB; the status line lives once, in `roadmap.md`); one unpushed commit `48ae20d` (push is the owner's); the JSR package's GitHub link may still name the old owner (owner, as wasmtk's was). **ub-cosmic:** `artifacthub-repo.yml:6` carries the owner's address — Artifact Hub reads its `owners` field, so this looks like the manifest exception (🗓️ OWNER confirm; the verified-publisher claim may also need the org); `build_files/build.sh` runs inside the image build and the two scripts under `system_files/` ship inside the image — that reads as "part of the build / the product, not a script" (the owner's wazmrt `tools/*.zig` ruling, working-rules § Tooling 1) — record it so; `Justfile` recipes are shell — same question, 🗓️ OWNER; `cosign.key` never tracked (verified over history; `cosign.pub` is). **zailc:** `cmem/releasing.md:44` "Sub-version capped at 9 (binaryang's rule)" — the owner retired every cap on 2026-09-20 (drift W6 DECIDED: SemVer 2.0.0, components unbounded; binaryang's own cap line is slated for retirement) — drop it before your first bump; your WSL-only rule (SentinelOne quarantines Fil-C/cosmo output on the host) is now in the workspace's machine file; 23 local branches kept by design, noted. **zilc:** your version scheme `<Zig>-<Fil-C>.<n>` / "no 1.0, ever" is the owner's 2026-10-05 call and STAYS (divergence P8, DESIGN — nobody "fixes" it to SemVer); `tools/p1/setup-wsl.sh` is your one committed shell script and it INSTALLS Bun, so a Bun port cannot bootstrap itself — 🗓️ OWNER (an exception, or a Windows-side Bun script that drives `wsl.exe`); the Bun port sits on branch `bun-port` (1 commit past `main`; `main` 10 past `origin/main`; nothing pushed) while `cmem/INDEX.md` on that branch describes it as done — merging and pushing are the owner's call, and `origin/main`'s INDEX still says Deno; INDEX 44 KB with ~400 lines of dated state (W3-class); `tests/basics/README.md:20-21` and the NOTICE files link `jrmarcum/BasicsOfCoding*` — not checked whether those moved. **Answer in your own memory**, then write the commit into your row of `../cmem/workspace-correspondence.md` as the answer — the workspace, as the creator, verifies and closes it (owner, 2026-10-26). | **LeptonPad ✅ answered 2026-10-26, `797a351`** (verified: `origin` reset, `build:wasm` pinned `@2.0.3`, INDEX 8.0 KB, ★ copy, path test; owner ruling relayed: its `collaboration.md` address is the allowed maintainer contact; local `main` is a path-free rewrite awaiting the owner's force-push; host check and `known-issues.md` size still its own). **S3D, ub-cosmic, zailc, zilc: not pulled** (no commit since 2026-10-22) · S3D and zailc have since answered (ledger H26 cell) · **ub-cosmic removed 2026-10-27** (owner: folder and GitHub repo deleted) — its part is moot · **✅ CLOSED 2026-10-28** — zailc, zilc answered 2026-10-27; every answer verified (ledger H26 cell) |
| H25 | 2026-10-26 | **binaryang, rsxtk, every universalWasmLoader-\*** (wasmtk, wazmrt, wasmrt: nothing to do) | 🔒 **Owner review, 2026-10-26: the org move, the exFAT `.git` fix and the privacy rules — who still has what to do.** Measured here on 2026-10-26 (`origin` URL, `git grep` over every ref, `git config`, `count-objects`, each repo's `cmem/`), not read from earlier status cells. **(1) The move to `synapticforge1`: every repo's `origin` is there and every repo's memory records it — nobody is unaware.** What remains is STALE LINKS to siblings (H17 part 3): **loader-js** `VISION.md:4`, `scripts/regen-fixtures.ts:80`; **loader-jvm** `VISION.md:4`, `cmem/overview.md:46`; **loader-rs** `README.md:6,249,251`; **loader-c** `README.md:4` — all `github.com/jrmarcum/wasmtk` → `synapticforge1/wasmtk` (GitHub redirects today; do not rely on it). The `fixtures.json:5` stamps in -js/-dotnet/-dart change at the H7 re-stamp, which is **now unblocked: wasmtk's purged history is on its `origin`** (local = `origin/main`, 2026-10-26) — loader-js re-stamps from a pushed commit, then the ports copy (drift X8). **(2) H16, the exFAT `.git` fix (`git config --local maintenance.strategy gc`, after a `gc --prune=now`): NOT SET in loader-go, -js, -jvm, -py, -rs, -dotnet, -dart, -v.** Packs are 0–2 today, so nothing has grown yet — set it now, before it does; it is per clone. Set in binaryang, wasmtk, wasmrt, wazmrt, rsxtk, -c, -zig. **(3) Privacy.** (a) **History purge (H19), revised 2026-10-26: the maintainer address on commits is ALLOWED (owner), so a purge is needed only where drive paths sit in history — two repos:** **binaryang** (6 historical commits carry drive paths in `cmem/testing.md`, `working-rules.md`, `open-work.md`, `scripts/spec-prepare.ts`, `CLAUDE.md`; HEAD is clean; rewrite paths only — upstream wabt/binaryen history untouched) and **loader-dart** (`CLAUDE.md` with the real workspace path, in history and at HEAD). **loader-go, -js, -jvm, -py, -rs, -v, -zig: NO purge needed** — no drive path in any commit of any ref (measured 2026-10-26); their only finding was the address, which is now permitted. Template and hazards: H19; maps so far: -dotnet, rsxtk, wasmrt, wazmrt, wasmtk. ⚠️ **The eight loaders' memories mention none of H18, H19 or H22 — they have not pulled these letters at all**; binaryang has (5 mentions) but has not started. (b) **loader-jvm tracks `.claude/settings.local.json`** — per-machine tool settings; untrack and gitignore it (no path in it today, but the rule says never tracked). (c) **loader-dart `CLAUDE.md:27` still carries the real workspace path** at HEAD (H18) — fix it before the purge so the purge removes what the tip no longer has. (d) **The path-rule intent (H22, "machine-specific?, not absolute?") is recorded nowhere in rsxtk or any of the ten loaders.** Record it in your `working-rules.md`. **Fully compliant today:** wasmtk, wazmrt, wasmrt (its one scan hit is the rule's own example text); loader-c and -dotnet lack only (d); loader-go, -js, -jvm, -py, -rs, -v, -zig lack (d) and, for -jvm, (b). **Scan false positive, for the record:** wasmtk's history scan hits 18 files under `node_modules/.deno/@jsr+std__path@…/` in old commits — the std path library's own `C:\Users\…` test strings, third-party, not personal; HEAD has no `node_modules`. **Nothing to push/force-push without the owner;** loader-py and -rs each hold one unpushed docs commit (2026-10-21). | **2026-10-26 evening: rsxtk ✅ §3(d) `cf98ecd`; binaryang §3(a) re-scoped — public text history clean (0 commits on `origin/*` + tags), 398 never-pushed branches deleted, no force-push pending for TEXT; reopened for five committed binaries (H18), HEAD fixed `b52551f37 (was 9e44e5af9)`, old blobs = owner. **Night: (b) ✅ -jvm `7da1658`; (c) ✅ -dart (purged + force-pushed); (d) ✅ and §2 ✅ in nine loaders; §1 ✅ -js, -jvm, -rs, -c. OPEN for loader-go only: §3(d) (no privacy rule; its `jrmarcum/` mentions are module-path history, fine) — and the owner's calls (binaryang's old blobs; LeptonPad's force-push)** · **✅ CLOSED 2026-11-08** — loader-go §3(d) `fd5582f` verified; both owner calls settled (C26, C19) |
| H24 | 2026-10-24 | wasmrt, and the seven repos whose copy of the ★ block has the old wording: binaryang, wazmrt, wasmtk, universalWasmLoader-{dotnet,c,dart,js} | ⚠️ **Renumbered 2026-10-24: this letter was first filed as a SECOND "H23"**, clashing with the 2026-10-23 behaviour carry-forward letter H23 to wasmrt below, which keeps its number (wazmrt and wasmrt cite it in 8+ places). Where wasmrt's memory cites "H23" for the rule 5.2 re-copy — `best-practices.md:1904` ("letters H6, H23") and `open-work.md:18` ("H23 (both)") — it means **this letter, H24**. **Canonical ★ rule 5.2 changed — re-copy it** (policy: a change to the workspace ★ block is re-copied downstream, never edited in place there). Asked by wasmrt, 2026-10-24: 5.2 named the development drive by its LETTER, so no exact copy could avoid a machine-specific detail. Old: *…the `D:` drive symptom was diagnosed wrong three times.* **New, exact:** *…a symptom caused by the development drive's FILESYSTEM (exFAT) was diagnosed wrong three times.* — the rule's point is the layer (the filesystem), not the letter. Nothing else in the 28 ★ rules names a drive or a machine path (checked 2026-10-24). Re-stamp the copy's date when you re-copy. | **wasmrt ✅ 2026-10-24** (`a9c5870`, on GitHub `main`: the new 5.2 text, old wording gone — verified; it cites this letter as "H23", see above; since `cd8081f` as H24). **binaryang ✅ `87ad3a848 (was df4c7ffea)`, wazmrt ✅ `462e0e8`, wasmtk ✅ `4084d37c8b2`, rsxtk ✅ (verbatim re-copy `cf98ecd`) — all text-checked 2026-10-26; -c uncommitted. **-dotnet ✅ `3e58efc`, -dart ✅ `b8eebec`, -js ✅ `36aa661` (2026-10-26 night) — ✅ CLOSED: every addressee re-copied.** The ONE more re-copy for ★ 6.1 is tracked under C8 (done: -c, -dart, -dotnet, -js, -py, -v, -jvm, -zig; pending: binaryang, wasmrt, wazmrt, wasmtk, rsxtk; -go has no block)** |
| H22 | 2026-10-23 | every repo except wazmrt (which has it) and the frozen wabt-ts / binaryen-ts | 🔒 **Owner, 2026-10-23: record the privacy rule's PATH TEST in your own `working-rules.md` — the intent, so every repo judges a path the same way.** The test is **"is it machine-specific?", not "is it absolute?"** (full text: `../cmem/working-rules.md` § Records; first recorded in wazmrt `working-rules.md:186-188`). **Not public:** any path that records the owner's own machine layout — a user profile (`C:\Users\<name>\…`), the project tree (`D:\Programs\…`), other drives (`J:\…`), scoop / AppData installs, scratchpad or session ids. **Fine:** repo- or sibling-relative paths, env vars, placeholders, and a CONVENTION path that names nothing about one machine and works on any comparable host (e.g. `C:\zig-cache\<repo>` as a cache dir). A scan hit is a CANDIDATE, judged by that test — do not scrub convention paths. The other parts of the same rule, in one place: no secrets; one maintainer contact email allowed in a published package's registry manifest field and as the commit author/committer address (owner, 2026-10-26), nowhere else; private facts in a gitignored `cmem/local/`. Measured here 2026-10-23: only wazmrt records the path test; loader-go, -js, -jvm, -py, -rs, -dart, -v and -zig have no written privacy rule at all; binaryang, wasmtk, wasmrt, rsxtk, loader-c and -dotnet mention it only in purge records or index lines. A record-only change: nothing to rewrite. | **2026-10-26, verified: binaryang ✅ `407082a7b (was ade20a346)` (`working-rules.md:224`), wasmrt ✅ (`design-decisions.md:189`, dated 2026-10-24), rsxtk ✅ (`INDEX.md:19-20`), wasmtk ✅ `4084d37c8b2`, LeptonPad ✅ `797a351`. **Night: nine loaders ✅** (-js `36aa661`, -c `39050b1`, -dart `b8eebec`, -dotnet `3e58efc`, -zig `34050e1`, -py `dfdea92`, -v `da4d86a`, -jvm `dc8b111`, -rs `fc09e2a` — `machine-specific` found in each `cmem/working-rules.md`). **Open: loader-go, S3D, zailc, zilc** · ub-cosmic removed 2026-10-27 (owner) — moot · **✅ CLOSED 2026-11-08** — S3D, zailc, zilc verified 2026-10-28; loader-go `fd5582f` verified |
| H23 | 2026-10-23 | wasmrt | 🔒 **Owner, 2026-10-23: adopt wazmrt's behaviour carry-forward testing ("lets also make this a letter for wasmrt team on testing").** The problem it solves: a surface diff sees what a consumer can NAME, not what it can RELY ON. A release that starts REFUSING a module the last one accepted ("accepting less") changes no API, yet breaks a working consumer. **Three layers, complementary, not one broader than the other** (owner): **S1** asks whether a module is ACCEPTED, over a small per-feature corpus (one minimal module per feature; wazmrt's comes from its `cmem/probes/feature-matrix.ts`), under every preset and every single feature, validate-only, never run; it runs on every `test`. **S2** asks whether code RUNS correctly: per-file pass / fail / skip of your spec runner over wasmtk's `testsuite-main` (288 `.wast`), pinned to a wasmtk commit + file-list hash; a release-checklist step. **S3** is the wide net, local-only testing (owner: agreed for testing): wasmtk's 1,189 modules (332 MB, only 160 tracked in git, so not pinnable). 🔒 **Order (owner): S1 → S2 → S3, and STOP at the first that finds an issue until it is resolved.** "Resolved" includes INTENDED: a correct new refusal is resolved by a deliberate re-baseline in its own commit, with the major (pre-1.0: the minor your rule 6 allows, plus the Breaking Changes row) it demands. **Floor rule:** refused → accepted = minor; **accepted → refused = MAJOR**; a changed run result is classified by hand. **The measurement behind it (wazmrt, 2026-10-23):** its three tags rebuilt to their release exe sizes byte for byte; over wasmtk's 1,189 modules × `default` / `mvp` / `wasm1` / `wasm2`, `v1.0.2` → `v1.0.3` changed 1,549 verdicts, and the 24 accepted → refused rows (13 modules) were exactly the `mutable_global` rule-4 change wazmrt shipped as a patch. Nothing unexplained. S1 catches that class and S2 does not: no spec file's summary moved. **The check, not the conclusion:** wazmrt `cmem/probes/carry-forward.ts` builds each ref in a throwaway worktree and diffs consecutive binaries' verdicts. Port its idea to your binary and corpus, then invert it (replay a past release with a known refusal and watch it fire). **Three things it found that your design must answer:** (1) "run the module" is not "validate the module": wazmrt's CLI RUNS a `_start` module (511 of the 584 `.wasm`), so S1 needs a validate-only path; (2) wasmtk's module corpus cannot be pinned, only content-hashed; (3) a build-and-size gate attached to the build can turn a carry-forward build red for reasons unrelated to the binary under test (wazmrt's static lib embeds the cache path). **Where wasmrt differs, so this is not copied blind:** you have 17 tags (latest `v0.9.0`) and Rust integration tests in `tests/` that CAN run against new `src/`, so your rule 3 may already apply as written, and the carry-forward ADDS behaviour that tests do not encode. You are pre-1.0 (`0.9.0`), so your rule 6 governs the floor. Your `--features` vocabulary is v10 of the contract, so S1's presets are whatever your CLI actually accepts; do not borrow wazmrt's list. wazmrt's design: `cmem/releasing.md` → "Rule 3 as behaviour carried forward". Record in your own memory which stages you adopt and how; nothing is written into your tree from here. | ✅ closed 2026-10-26 — wasmrt `scripts/carry-forward.ts`, `scripts/behaviour-s2.ts`, `crates/wasmrt-core/tests/behaviour.rs` exist (verified); floor PATCH since 2.0.0 |
| H21 | 2026-10-23 | wazmrt (and every repo that quotes a sibling's commit id) | **A sibling rewrote its history, so the commit ids you quote from it are OLD.** wasmrt rewrote its whole history on 2026-10-23 (H19, drive paths only); the old → new map is `../wasmrt/cmem/history-map-2026-10-23.md` (217 commits, 17 tags). Measured here 2026-10-23 with `git grep` over every repo: **only wazmrt quotes old wasmrt ids** — 4 ids at 9 places: `7ce0dcd2` → `c9c447f3` (`interop.md:1207`, `:1226`, `:1249` — the §5 #6 attribution record), `ab13ba975` → `ff99f6f1` (`interop.md:896`, `:1230`; `roadmap.md:997`), `51254b9cf` → `4e3de996` (`interop.md:314`; `roadmap.md:1036`), `3c49845dd` → `da17c367` (`interop.md:519`). `interop.md` is the shared contract, so wasmrt's own copy needs the same ids — agree the change through the contract, as usual. Suggested form: keep the old id in brackets once ("`c9c447f3` (was `7ce0dcd2`)") so older records still resolve. **Standing rule for every repo**: a sibling's id is looked up in that sibling's history map before it is quoted; rewritten so far: loader-dotnet (`cmem/overview.md`), rsxtk (`cmem/overview.md` § History), wasmrt (`cmem/history-map-2026-10-23.md`), wazmrt (`cmem/history-map-2026-10-23.md`), wasmtk (local; its map comes with the push). | **wazmrt ✅ addressed 2026-10-23** — contract **v31** (`0327fea`): wasmrt's ids are its post-rewrite ids, no row's meaning changes; verified here: none of the four old ids remains in wazmrt. wazmrt has since rewritten its OWN history too (map `wazmrt/cmem/history-map-2026-10-23.md`). **✅ closed 2026-10-26**: wasmrt's `interop.md` is byte-identical (SHA-256) to wazmrt's v40 at `bd97ae2`; v41 is a new item (C7) |
| H20 | 2026-10-22 | every repo that publishes through a trusted-publishing (OIDC) policy | **After the move to `synapticforge1`, check each registry's trusted-publishing policy before the next release** (from loader-dotnet `cmem/overview.md:156-177`, 2026-10-22). Failure seen: nuget.org 0.1.1 → `Token exchange failed (HTTP 401) … No matching trust policy`. Cause: a policy is LOCKED to the GitHub repository and owner **IDs** at its first successful publish; the transfer changed the owner ID (user → org), and editing the policy's owner field cannot change a locked ID. Fix: create a NEW policy for owner `synapticforge1` (+ repo, workflow file), set the publisher user to whoever creates it, delete the old one, re-run the publish (with skip-duplicate). Known to have published fine AFTER the move (2026-10-21/22): binaryang JSR + npm (1.13.3, 1.14.0), loader-dart pub.dev 0.2.1, loader-dotnet NuGet 0.1.1 (after the new policy). Check, per registry, before your next release: loader-js (JSR + npm), loader-py (PyPI), loader-rs and wasmrt (crates.io), loader-jvm (Maven Central, if tokenless). **wasmtk**: the same will apply to its JSR link when it moves (H17). Record in your own memory which publishing path you use and whether it pins owner/repository IDs. The policy change itself is the owner's (registry account). | **wazmrt: not applicable** (`fd95e77`; verified here: no `.github/` workflow and no registry manifest — it publishes to no registry, so it has no trusted-publishing policy). **2026-10-26: wasmtk ✅** (3.0.0 published from the org with provenance 2026-10-24; JSR's provenance for pre-purge commits is the owner's), **binaryang ✅** (`fa5437d34 (was 299dd6c9b)`), **wasmrt ✅** (`releasing.md:241`), **rsxtk n/a**, **loader-dart ✅ / -dotnet ✅ / -py ✅** (released after the move). **Night: -js ✅ recorded `36aa661` (JSR + npm from the org, 1.1.2 published today), -jvm ✅ (token-based; 0.2.0–0.3.0 published from the org), -rs ✅ (token-based; 0.2.0 published), -py (1.1.1 published from the org — record UNMEASURED). Open: S3D (JSR link, owner)** · **✅ CLOSED 2026-11-05**: S3D's JSR link is by repository id (its answer) and 1.1.0–1.1.7 published from the org, JSR and npm (APIs read); loader-py's Trusted Publisher re-registered for the org 2026-10-21 (its `overview.md:40`) |
| H19 | 2026-10-22 | every repo except universalWasmLoader-dotnet (done) — frozen wabt-ts / binaryen-ts only on the owner's word | 🔒 **Owner: purge personal information from git history, as loader-dotnet did — "a necessary thing for security"; the other projects follow.** Template: loader-dotnet `cmem/overview.md:150-164` (find with `git grep` over every commit; `git filter-branch`; verify zero hits in every tree, message and header; force-push **with lease**; prune; record the old→new hash map). What to purge: (a) personal drive paths and tracked tool settings (letter H18's list); (b) ~~the owner's personal address as author/committer → noreply~~ **WITHDRAWN 2026-10-26 (owner): the maintainer contact email is the one official exception and it covers commit author/committer metadata too** — the address on existing commits stays, no `user.email` change is required, and a purge rewrites PATHS (and any other personal information), not the address. Repos that already rewrote it to noreply (-dotnet, rsxtk, wazmrt, wasmtk, -c) leave it as it is. **Cross-repo hazards this letter exists for:** (1) **binaryang, wabt-ts, binaryen-ts carry upstream wabt/binaryen history** with hundreds of third-party contributors — rewrite ONLY the owner's address (a mailmap-style match), never "all emails"; upstream authorship is theirs and already public. (2) **Every ref:** branches AND tags (`--tag-name-filter cat -- --all`; binaryang 375 branches / 21 tags, wasmtk 77 / 77, wasmrt 17 tags, loader-js 10). (3) **Published releases keep the OLD hash forever** — JSR/npm provenance (Rekor), crates.io `.cargo_vcs_info.json`, NuGet SourceLink; nothing can change them. Record the map tag by tag. (4) **Keep every TAGGED tree byte-identical** — change metadata only on tagged commits; loader-go especially: Go's checksum DB hashes the module CONTENT, so a changed tagged tree breaks `go get` for every user (its trees have no path hits — rewrite email only). (5) **Hashes cross repos**: wasmtk's `f50c8e4` is the H7 fixture stamp in loader-js `tests/fixtures.json` and loader-dart's copy; this workspace's letters cite dozens of shas. **Order:** wasmtk first, BEFORE pushing its 131 unpushed commits (one push, already clean), then loader-js re-stamps fixtures from a PUSHED commit (closes drift X8), then the ports copy them; the workspace updates its citations from each repo's published map. (6) **Other clones re-push the old history**: wasmtk's `upstream/binaryang`, wabt-ts's nested clones, scratch copies — re-clone after; never push from an old clone. (7) **GitHub still serves old commits by hash** until its GC, and forks/PR refs keep them; a full purge is a GitHub Support request (owner). (8) No host Python: `git filter-repo` needs Python — use `filter-branch` as -dotnet did, or pixi's Python. (9) Run H16's `gc --prune=now` + `maintenance.strategy gc` right after (the prune is part of the purge). (10) When recording the purge, do not write the personal address — "the owner's personal address". (11) **Leave the maintainer contact email in package manifests alone** (owner exception, 2026-10-23, working-rules § Records): a publishing project's registry maintainer/author field may carry one contact email — present today in loader-py `pyproject.toml` and loader-jvm `build.gradle.kts`; purge commit METADATA, not that field. rsxtk's `Cargo.toml` carries one too, and rsxtk DOES publish (crates.io `rsxtk`, 34 versions — corrected 2026-10-23 from "publishes nowhere", caught by wasmtk), so it is allowed. | **wasmtk: purged locally 2026-10-23** (verified here: 0 of 154 local refs carry the personal address; local `user.email` is noreply; local `main` 707 commits, unrelated to `origin/main`'s 574 pre-purge) — **awaiting the owner's force-push**; wasmtk's `next-work.md` L4 still reads "needs the owner's go-ahead" (its record to update). loader-dotnet ✅. **wasmrt: email rewrite waived by the owner 2026-10-23** (working-rules § Records exception; wasmrt `roadmap.md:246-253`); **wasmrt ✅ path purge done 2026-10-23** (owner: "fix the old drive paths in the git history"; verified here: pushed — local = `origin/main` `cff2f7d`; no drive path in any commit of any ref; tags moved, e.g. `v0.9.0` → `bc1f7ca115fc`; map `wasmrt/cmem/history-map-2026-10-23.md`; crates.io 0.2.0–0.9.0 keep naming the old ids; wazmrt quotes old ids — letter H21). **wazmrt ✅ done 2026-10-23** (`dff030f`, its own history map in `cmem/history-map-2026-10-23.md`; verified here: pushed — local = `origin/main` `1e37ec0`; 0 commits on any ref with the personal address; `user.email` noreply; no drive path in any commit; 4 old wasmrt ids remapped for H21). **rsxtk ✅ done 2026-10-23** (owner: "it is ok to change the files"; verified here: pushed — local = `origin/main` `c677f7d`; no ref, local or remote, carries the personal address; no drive path in any commit; `user.email` noreply; `Cargo.toml` `authors` kept as the allowed maintainer contact; `target/` removed from history too, so the tag `rsxtk_v0.4.0`'s tree changed — an owner-approved exception to "tagged trees byte-identical"; old→new map in `rsxtk/cmem/overview.md:93-`, e.g. `87ad0e0`→`de62a6d`; GitHub's read-only `refs/pull/1/head` still reaches the old history — the owner is handling it with the rsxtk session, 2026-10-23). **2026-10-26: wasmtk force-pushed 2026-10-23 and purged a SECOND time 2026-10-26 (one binary; 745 commits, 148 refs; map `history-purge-2026-10-26.md`; C11); binaryen-ts ✅ purged and pushed (`e5b486ccd`; 34 of 39 tags immutable — owner: leave); loader-c ✅ (per its record). Open: loader-dart; binaryang's binary blobs (owner); LeptonPad (local rewrite done, force-push = owner, its roadmap 19); zailc, zilc (H26)** |
| H18 | 2026-10-22 | wazmrt, wasmtk, wasmrt, binaryang, universalWasmLoader-dart | 🔒 **Personal drive paths are personal information and must not be public** (owner clarification, 2026-10-22; `../cmem/working-rules.md` § Records): ANY absolute path on the owner's machines — `D:\Programs\…`, `C:\Users\…`, scoop/AppData paths — not only user-named ones. Measured here with `git grep` on each repo's **`origin/main`** (so already public): **wazmrt** `.claude/settings.local.json` is TRACKED and holds `C:/Users/<name>/scoop/…` and AppData paths — untrack it and gitignore `.claude/settings.local.json` (loader-dotnet did the same, `7b08f43`); `cmem/design-decisions.md:1025`. **wasmtk** `cmem/legacy-claude-archive.md:852,893` (`C:\Users\<name>\TMP\…`), `cmem/roadmap.md:1123`, `cmem/vision.md:178`, and **seven (not eight — corrected 2026-10-23) `tests/module/bindgen_fixtures/*_host.ts`** that import `file:///D:/Programs/…` — also a portability defect (they cannot run on another machine): use `new URL("./…", import.meta.url)`. **wasmrt** `cmem/loaders.md:27`, `cmem/roadmap.md:1323`, `cmem/testing.md:1236`, `docs/port/07-loaders-api.md:3`. **binaryang** `scripts/spec-prepare.ts:74` (a hard-coded default corpus path — take it from an env var or a sibling-relative path; your `local/environment.md` already holds the real one). **loader-dart** `CLAUDE.md:27`. Fix: replace with repo- or sibling-relative paths, env vars, or placeholders (`<repo-root>`); real paths go in your gitignored `cmem/local/`. Re-run the scan before committing (pattern in working-rules § Records). The old text stays in git history: **the owner has decided to purge it (2026-10-22) — do it under letter H19**, together with the author-email purge, not separately. | **wazmrt ✅ done 2026-10-23** (`fd95e77`; verified: `.claude/` untracked, no drive path in any commit after its purge) · **wasmtk ✅ done 2026-10-23** (its `next-work.md` L3: the fix is in the GENERATOR `tests/bindgen_tests.ts`, which rewrote the runners with absolute `toFileUrl(...)` on every run; there are **seven** `*_host.ts`, not the eight this letter said; `bindgen_tests` 142/142, inverted; memory lines fixed; scan zero hits outside `upstream/`). loader-dotnet ✅. **wasmrt ✅** (2026-10-23 purge). **2026-10-26: REOPENED by BINARIES in binaryang (five `benches/**/*.wasm`, fixed at HEAD `b52551f37 (was 9e44e5af9)`) and wasmtk (`fib-zig_mod.wasm` DWARF, fixed `4084d37c8b2`, history purged again) — every earlier scan was `-I`; the rule now says scan binaries too (working-rules § Records). Open: loader-dart `CLAUDE.md:27` (still the real path at HEAD, measured); binaryang's old blobs (owner)** · **✅ CLOSED 2026-10-30**: loader-dart and binaryang `origin/main` clean with `-a`; binaryang's blobs purged by its second rewrite (C26), all 16 historical benchmark blobs read clean |
| H17 | 2026-10-22 | wasmtk | **GitHub org move — the last repo to move (✅ moved 2026-10-23).** Every sibling's `origin` is now `synapticforge1/<repo>` except yours (`jrmarcum/wasmtk`) and the frozen pair (canonical table: `../cmem/projects.md` § "Where each project lives"). (1) Two stale clone URLs for binaryang, which moved: `scripts/upstream-link.ts:52` and `cmem/workflow.md:17` say `github.com/jrmarcum/binaryang.git` → `synapticforge1/binaryang` (GitHub redirects today; do not rely on it). (2) Your own move is an owner call; when it happens, these links to you change with it — loader-js `VISION.md`, `scripts/regen-fixtures.ts`, `tests/fixtures.json` (the H7 stamp), loader-dart `test/fixtures/fixtures.json`, your `scripts/publish.ts`; rsxtk waits on it for its own stale URLs. Push `main` (131 commits ahead) first, so the H7 stamp `f50c8e4` becomes fetchable at the new location (drift X8). **(3, added 2026-10-23, to the OTHER repos)** now that wasmtk has moved, their links to `github.com/jrmarcum/wasmtk` are stale (GitHub redirects meanwhile): loader-js `VISION.md:4`, `scripts/regen-fixtures.ts:80`; loader-jvm `VISION.md:4`, `cmem/overview.md:46`; loader-rs `README.md:6,249,251`; loader-c `README.md:4` → `synapticforge1/wasmtk`. The `fixtures.json:5` stamps (-js, -dotnet, -dart) change at the re-stamp; binaryang's `PROVENANCE.md:8` is history. | **wasmtk ✅ (1) and (2) done 2026-10-23**: moved to `synapticforge1/wasmtk` (verified: `origin` + `ls-remote`), binaryang clone URLs fixed, no `github.com/jrmarcum` left in its tracked files (wasmtk `next-work.md` L2, L6). wasmtk's force-push done 2026-10-23 (and again 2026-10-26). **Part (3) ✅ closed 2026-10-26 (night)**: -js `36aa661`, -jvm `7da1658`, -rs `fc09e2a`, -c `39050b1` — `git grep github.com/jrmarcum/` empty in -js/-jvm/-rs (measured), -c keeps two history lines; -go's six are its v0.1.0 module-path history (deliberate, Go proxy) |
| H16 | 2026-10-22 | **wasmtk, wazmrt**; then every loader except -zig | **`.git` is growing on `D:` (exFAT) — apply binaryang's durable fix.** Measured here 2026-10-22 (`git count-objects -vH`): wasmtk **126 packs / 2.90 GiB**, wazmrt **61 packs / 120 MiB**; neither has `maintenance.strategy` set. Cause (binaryang `cmem/local/environment.md`, 2026-09-16): git's detached geometric maintenance cannot replace packfiles on exFAT, so rolled-up packs accumulate (`renaming pack … File exists`, `geometric-repack failed`). Fix, in your own session, with the owner's OK: `git stash list` (note anything) → `git gc --prune=now` → `git fsck --connectivity-only` → **`git config --local maintenance.strategy gc`** → `git count-objects -vH` shows 1–2 packs; one probe commit shows no repack error. It is per clone (`.git/config`). Record it in your private `cmem/local/environment.md`. wasmtk: do it AFTER pushing `main` (131 unpushed commits) or at least after a `git branch` / `git stash list` check — `gc` keeps everything reachable, but look first. Loaders: same two commands while still small (only -zig has it). Already done: binaryang, wasmrt, loader-zig. Not addressed to the frozen wabt-ts / binaryen-ts (owner call, `open-work.md`). | **rsxtk ✅ 2026-10-23** (verified: `maintenance.strategy gc`, 1 pack / 2.93 MiB, after its purge). wasmrt already had it (1 pack / 1.87 MiB after its purge, 2026-10-23). **wazmrt ✅ 2026-10-23** (verified: `maintenance.strategy gc`, 1 pack / 2.50 MiB, from 61 packs). **wasmtk ✅** (1 pack, `maintenance.strategy gc`, 2026-10-23) · **binaryen-ts ✅ 2026-10-26** (owner; 89 packs / 1.71 GiB → 1 / 144.6 MiB, with its purge) · **open 2026-10-26 (measured `git config --local`): loader-go, -js, -jvm, -py, -rs, -dotnet, -dart, -v; S3D, ub-cosmic, zailc (none); LeptonPad and zilc on their own recipes (P7)** · **Night: all ten loaders ✅ (`maintenance.strategy gc` read in each, 1 pack each); wabt-ts retired. Open: S3D, ub-cosmic, zailc; P7** · 2026-10-27: S3D and zailc answered (ledger H26 cell); ub-cosmic removed (owner) — moot · **✅ CLOSED 2026-10-28**: `maintenance.strategy gc` in all 19 repos, 1–2 packs each (measured); P7 converged |
