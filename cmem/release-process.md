# release-process.md — the release workflow, step by step

**Written 2026-11-10 by binaryang, on the owner's word** ("write that work flow to the workspace for
js/ts projects and ask the workspace to adjust it for other projects"; the owner reviewed the step
list in binaryang's session first). **§§ 1–4: JavaScript / TypeScript projects publishing to JSR
and/or npm** (binaryang's text). **§§ 5–8 (workspace, 2026-11-10, ledger C44; owner: "write up
each projects release process. we need it to be semi-uniform"): the uniform shape every project
follows (§ 5), what each ecosystem puts in each slot (§ 6), every project measured against it
(§ 7), and the owner's open decisions (§ 8).** Letter **H33** tells each repo what to converge.

**Reference implementation:** binaryang — `../../binaryang/cmem/publishing.md` (the pattern at its
top, every release recorded newest first), `../../binaryang/scripts/release/`,
`../../binaryang/.github/workflows/publish.yml`. Measured end to end on GitHub with **3.0.2
(2026-11-09, publish.yml run 42712133150: all five jobs green, JSR Rekor `3771557608`, npm SLSA
provenance)**. A number here is a claim with a date: re-derive before relying on it.

Related workspace records: [layout-and-packaging.md](layout-and-packaging.md) (CI shape,
versioning, the compatibility gate's rules 1–5), [working-rules.md](working-rules.md) (Tooling
rule 9: no `gh`), [best-practices.md](best-practices.md).

## 1. Standing rules (every language)

1. **Nothing is published, pushed or tagged without the owner's word.** The manifest's version
   line (and every file that mirrors it) ARMS a release, so a bump is never a side effect of work.
2. **Merge first, bump in its own commit afterwards.** A merge can be reverted; a publish cannot
   (JSR and npm versions are immutable, and npm never reuses a number, even an unpublished one).
   Merging and releasing never share a trigger.
3. **Never publish from a workstation.** Only the tag-triggered workflow publishes, so every
   version carries provenance; a local publish uploads WITHOUT it, and that version can never be
   fixed. The local release script must have no publish call site at all.
4. **Provenance is read back, not assumed.** A green publish run is not proof: JSR skips
   attestation non-fatally. The evidence is JSR's `rekorLogId` and npm's attestation, read after
   the publish; the workflow fails its job when either is absent.
5. **Every release is recorded** in the repo's `cmem/` (binaryang: `publishing.md` § X.Y.Z,
   newest first), with the run ids, the registry read-backs and what was checked as a user.

## 2. The steps (JS / TS, JSR and npm)

1. **Owner: the go** — e.g. "Release 3.0.2".
2. **Release notes on a branch.** `CHANGELOG.md` § X.Y.Z on `release/X.Y.Z`; the gate on the
   committed tree; merge into `main` with `--no-ff`. The version is still the RELEASED one.
3. **Push `main` UNBUMPED.** CI and auto-tag green; auto-tag does nothing (the current version's tag
   already exists).
4. **The fresh-clone gate.** Clone the pushed commit from GitHub into an empty folder and run the
   CI half of the gate there — the tree that will ship, not the working copy.
5. **The consumer check** (workspace letter H6, rule 3). Run each consumer's suite against the
   UNPUBLISHED build, or record why it is skipped: only when nothing a consumer imports or
   produces changed, or when the consumer pins an exact older version (then read its call sites and
   file what will reach it in [workspace-correspondence.md](workspace-correspondence.md)). A red
   consumer suite blocks a patch or a minor.
6. **Preconditions.** No `vX.Y.Z` tag on origin (`git ls-remote --tags`); neither registry has
   X.Y.Z, npm counting an unpublished number as used.
7. **Owner: the level.** `bun run bump patch|minor|major`, which enforces the compatibility FLOOR:
   - refuses unless the committed `api-surface.json` is this tree's surface;
   - prints the floor the surface diff since the last tag demands (removed / changed → major,
     added → minor) and refuses a lower level;
   - for a patch or a minor, runs the PREVIOUS release's tests against this tree (accepted
     differences listed in `tests/accepted-changes.json`, never silently);
   - then `version_sync` green, and `surface:check` with the version set to the target — undo the
     bump if it fails. **No help or usage text names a version of the package** (it reads as a
     surface change at the bump that reaches it — binaryang 1.16.0 and 3.0.0).
8. **`bun run release`.** Its guards (clean tree, untracked files counted as dirty; a cold publish
   dry run with the slow-types check; a cold type check; the entry point run as a user does), then
   it commits `bump to vX.Y.Z` (the manifest and every mirrored version line, one shared file
   list) and pushes `main` AND the tag in ONE push, as a user — a tag pushed by
   `github-actions[bot]` cannot publish to JSR.
9. **The tag push publishes** — `publish.yml`, five jobs, the credential only where it is used:

- `checks`
  - token: none
  - what it runs: tag = manifest version; the surface floor (`--release-check`); type check; tests; publish
    dry run on the published file list; npm's state for this number
- `jsr`
  - token: `id-token`
  - what it runs: sparse checkout of the published files, nothing installed; skip if JSR has it; `deno
    publish` DIRECTLY (never through a task or wrapper — OIDC is lost in a subprocess); an `uploaded` output
    written BEFORE the upload; Rekor id read back
- `release`
  - token: `contents: write`
  - what it runs: wait for JSR to serve the version, then the GitHub Release page through the REST API (no
    `gh`)
- `npm-build`
  - token: none
  - what it runs: install, build, prove the package, `npm pack` → the tarball as an artifact
- `npm`
  - token: `id-token`
  - what it runs: the artifact only, nothing installed; npm 11 with `--ignore-scripts`; the tarball checked
    (this name, this version, no `scripts`, provenance on); skip if npm serves it; `npm publish <absolute path
    to .tgz>`; provenance read back

   Every action pinned to a commit hash. Jobs are queued per tag and never cancelled. **A failure
   after JSR's upload: "Re-run failed jobs"** — each job skips what is already published — never a
   new tag for the same code.
10. **Read back as a user.** The Rekor id on JSR and the attestation on npm; then
    `npx <npm-name>@X.Y.Z --version` and `deno run -A jsr:<jsr-name>@X.Y.Z --version`
    (`--minimum-dependency-age=0`, or Deno refuses a version under 24 hours old); spot-check what
    this release changed.
11. **Record it** (§ 1 rule 5) and update the repo's unreleased and open-work records.

## 3. Variants and the lessons that made them

- **A patch while `main` holds unreleased work** goes from a branch cut from the last tag:
  `release/X.Y.Z` from `vX.Y.(Z-1)`, fix, gate, bump on the branch, run the release guards by hand,
  push the branch and the TAG only — never `main`. Then merge the bumped branch into `main`, so
  `main` reads X.Y.Z and auto-tag does nothing. (binaryang 1.6.1)
- **Rehearse a changed release job before landing it** — the exact commands, in a fresh folder laid
  out as the runner's. binaryang's 3.0.0 and 3.0.1 each lost their npm publish to a defect reachable
  only on GitHub (a pack folder that did not exist; a relative tarball path npm read as a GitHub
  repo), and each cost a version: a re-run runs the TAG's workflow and scripts.
- **A tag publishes from ANY branch** — `push: tags: [v*]` has no branch constraint, so a `v*` tag
  pushed from a feature branch publishes at once.
- **A tag pushed before the repo's first branch push produces no workflow run at all** — push the
  branch first.
- **auto-tag asks only "does the tag exist?"** — deleting a tag re-arms that version, and a
  downgrade would tag too; there is no monotonicity check.
- **A dirty tree ships a bare version bump** (binaryen-ts 1.2.3 shipped as 1.2.2 under another
  number), which is why the guard counts untracked files.

## 4. What is JS/TS-specific, and what any language keeps (input to C44)

- **Common to every language:** § 1; steps 1–6 and 10–11; the owner's go and level; merge-first;
  the fresh-clone gate; the consumer check; publishing only from CI with provenance read back;
  the credential only in jobs that install nothing; the variants in § 3.
- **JS / TS only:** JSR and npm themselves, `deno publish` / `npm publish`, the `npm-build` / `npm`
  job pair, `--minimum-dependency-age`, the slow-types dry run.
- **binaryang only (a repo adopts them, or records why not):** `api-surface.json` and the floor in
  `bump`, previous-release tests, `tests/accepted-changes.json`, the five-job split as built.
- **For each other ecosystem the workspace should name:** its registry and trusted-publishing
  mechanism (PyPI, NuGet, crates.io, Maven Central, pub.dev …), what replaces the provenance
  read-back, what replaces the surface floor (e.g. `cargo semver-checks`), and the repo that is
  its reference implementation. → **§§ 5–7 below.**

## 5. The uniform shape (every project, every language)

**Semi-uniform:** every project has the same twelve slots, in this order, under these names; what
fills a slot is the ecosystem's (§ 6). A slot a project cannot fill is written down in its
`cmem/` with the reason (§ 7 lists today's). § 1's rules hold throughout.

**Local — the owner's machine, the release tooling, never the hand:**

- **U1 The go and the level** come from the owner. The level is an ARGUMENT — no tool defaults to
  `patch`. 🔒 **Its first step: the release tooling runs the review set** — the five required
  reviews (basic, hardening, licensing, security, privacy) and every scripted gate, LOCALLY, the
  full suite once on every supported platform; the release proceeds when a re-review comes back
  empty (owner, 2026-11-17; [review-process.md](review-process.md) § 9, letter H37 — replaces the
  2026-11-12 "two reviews recorded in `cmem/release.md`" check).
- **U2 Merge first.** Release notes merged into `main`; the bump is its own commit, made by the
  tooling (`bump to vX.Y.Z`), never folded into other work.
- **U3 The bump tool** refuses a dirty tree (untracked files count); refuses a stale surface
  snapshot; computes the FLOOR from the surface diff since the last tag (removed / changed →
  major, added → minor) with the ecosystem's tool (§ 6) and refuses a lower level; for a patch or
  a minor runs the PREVIOUS release's tests against this tree; syncs every version line.
- **U4 The release script** (one command): guards — clean tree (untracked count), on `main` and
  equal to `origin/main`, the tag absent locally and on origin, the registry without this version,
  a cold gate / dry run; then it pushes `main` (with the bump commit) as a user and reads it back
  with `git ls-remote`. **It makes and pushes NO tag** — CI tags (U6). Never `git tag -f`, never
  a forced tag push: a published tag never moves.

**CI — 🔒 the owner's order (2026-11-10): "the CI to check first, then push the tag, and then
create the release page from the tag, then publish the package to the registry for the project in
that order."** Top-level `permissions: {}`; each job holds only its own permission:

- **U5 `checks` FIRST — 🔒 amended 2026-11-17: the TESTS run locally, not on GitHub** ("Every
  gate, the test suites included, runs locally and is not repeated on GitHub"; "CI only
  publishes" — review-process.md § 10, § 13). What CI still checks belongs to publishing
  (`contents: read`, token-less clone): HEAD = `github.sha`; tag = manifest version; "is this a
  release?" (the manifest version has no tag yet); the publish dry run where the registry has
  one. The test, surface-floor and previous-tag steps leave the workflow and run in U1's local
  review set. Each repo removes its workflow's test steps under letter H37.
  🔒 **Confirmed by the owner, 2026-11-17:** "your read is correct on the local review and the CI
  steps. We want the CI to verify the version, then tag, create the release page and publish, and
  skip any version already published."
- **U6 `tag`** — only when U5 is green on THAT commit, and only for a new version: CI creates the
  annotated tag `vX.Y.Z` on `github.sha` (`contents: write`) and reads it back (peels to the
  commit). ⚠️ A tag pushed with the job's `GITHUB_TOKEN` starts NO new workflow run, so U7–U8 run
  in the same run (`needs:`) or via `workflow_call` — never by waiting for a tag-push trigger
  (zailc's `auto-tag.yml` → `publish.yml` already does this). For JSR: binaryang's § 2 step 8 had
  recorded that a tag pushed by `github-actions[bot]` could not publish to JSR — **answered by
  measurement 2026-11-10/11:** binaryang 3.0.3 / 3.0.4, S3D 1.4.0 / 1.5.0 and loader-js 2.0.3 were
  all tagged by `github-actions[bot]` and published to JSR from the same run (OIDC is the run's).
- **U7 `release` — the GitHub Release page FROM the tag** (`contents: write` only): H32's order —
  tag peels to `github.sha`, an existing page is done, `POST` with `generate_release_notes` (the
  registry link on top, naming the version about to be published), read back, peel again; a 30 s
  limit on every request (best-practices 7.21). No `gh`. **The page is made ON THE TAG: no
  `release/<tag>` branch is written and no `target_commitish` is sent** (owner, 2026-11-10: "We
  should be releasing on version tag and creating a release page at that time" — ledger C45;
  branches already on GitHub stay, nothing old is rewritten). **One exception to "an existing
  page is done" (owner, 2026-11-17): the add-platform step** appends a later platform's result
  line — and its build, where the project ships one per platform — to the existing page
  ([review-process.md](review-process.md) § 12); it never rewrites the page or moves the tag. Made BEFORE the publish, by the owner's
  order — so a failed publish leaves a page for an unpublished version until U12's re-run.
- **U8 `publish` LAST** — only the publishing credential (OIDC trusted publishing where the
  registry offers it, else ONE secret in ONE step); installs nothing (takes `checks`' or a build
  job's artifact); **skips if the registry already serves this version** (re-run safe); then
  **reads back, fatal:** the registry's provenance / attestation or its nearest equivalent (§ 6),
  and the version served — the job FAILS when absent. A green run is not proof. For a git-tag
  ecosystem (Go proxy, VPM, `zig fetch`, vcpkg registry) U6's tag IS the publish, and U8 is the
  warm-up and install-as-a-user read-back (U10) done in CI.
- **U9 Pins:** every action pinned to a commit hash, or no `uses:` at all; every downloaded tool
  (Bun 1.4.4 — Tooling rule 10 —, a language toolchain) pinned by version AND sha256; a
  `concurrency` group per tag that never cancels.

**After:**

- **U10 Read back as a user:** install the released version from the registry in a scratch folder
  and run it (`npx`, `deno run jsr:`, `cargo install`, `pip install`, `go list -m`, `zig fetch`,
  `v install`, `vcpkg install` in registry mode …).
- **U11 Record it — 🔒 ONE place in every project (owner, 2026-11-10): `cmem/release.md` §
  "Release History", newest first,** one entry per version with **a summary of what changed in
  it**, plus the run id, the read-backs and what was checked as a user. Each repo moves its
  existing release records there (binaryang's `publishing.md`, `releasing.md` files, `overview.md`
  release bullets, `roadmap.md` tables …) and leaves a pointer where they were.
- **U12 Failure:** "Re-run failed jobs" (each job skips what is done) — never a new tag for the
  same code, never a moved tag. Rehearse a CHANGED release job before landing it (best-practices
  7.22).

## 6. Per ecosystem — what fills U3, U8 and U10

- **JSR + npm**
  - repos: binaryang, S3D, loader-js; wasmtk (JSR only)
  - U8 credential (target): OIDC both (`deno publish` direct; npm 11 trusted publishing)
  - U8 read-back: JSR `rekorLogId`; npm `dist.attestations.provenance`
  - U3 floor tool: `api-surface.json` diff
  - reference: **binaryang** (§ 2); loader-js equally strict in CI
- **crates.io**
  - repos: wasmrt, rsxtk, loader-rs
  - U8 credential (target): crates.io **trusted publishing (OIDC)** — today a token secret (rsxtk, -rs) or the
    owner's `cargo login` (wasmrt)
  - U8 read-back: no attestation exists: `GET /api/v1/crates/<name>/<version>` answers 200 (rsxtk, -rs poll
    it, fatal)
  - U3 floor tool: `cargo semver-checks` (+ `cargo public-api`, wasmrt)
  - reference: **loader-rs**
- **PyPI**
  - repos: loader-py
  - U8 credential (target): Trusted Publishing (OIDC mint)
  - U8 read-back: PEP 740 attestation via PyPI's integrity API — not produced today
  - U3 floor tool: `api-surface.json` + `compat.py`
  - reference: **loader-py**
- **NuGet**
  - repos: loader-dotnet
  - U8 credential (target): Trusted Publishing (`NuGet/login` OIDC)
  - U8 read-back: nuget.org serves the version and its repository signature
  - U3 floor tool: `PublicAPI.*.txt`
  - reference: **loader-dotnet**
- **Maven Central**
  - repos: loader-jvm
  - U8 credential (target): Portal token + in-memory GPG (Central has no OIDC)
  - U8 read-back: POM, jar and `.asc` answer 200 on `repo1`, signatures verify
  - U3 floor tool: Kotlin binary-compatibility `api/`
  - reference: **loader-jvm**
- **pub.dev**
  - repos: loader-dart
  - U8 credential (target): pub.dev **OIDC automated publishing** — today a credentials secret
  - U8 read-back: the API serves the version
  - U3 floor tool: `api-surface.json` via `compat.dart`
  - reference: **loader-dart**
- **Go proxy**
  - repos: loader-go
  - U8 credential (target): none — CI's tag (U6, after checks) is the release
  - U8 read-back: `go list -m <mod>@vX.Y.Z` through `proxy.golang.org` + its `sum.golang.org` line
  - U3 floor tool: `api-surface.txt` from `go/ast`
  - reference: **loader-go**
- **git-tag registries**
  - repos: loader-c (own vcpkg registry), loader-v (VPM), loader-zig (`zig fetch` of the tag), zailc (Release
    assets + build attestation)
  - U8 credential (target): none — CI's tag (U6, after checks) IS the publish (§ 8 D1); zailc's assets upload
    in U8
  - U8 read-back: U10 done IN CI: `vcpkg install` in registry mode, `v install`, `zig fetch` hash, attestation
    verify
  - U3 floor tool: each repo's surface tool
  - reference: **loader-zig**
- **no registry**
  - repos: LeptonPad (deploys `main` through its host), wazmrt, zilc (tags only)
  - U8 credential (target): —
  - U8 read-back: the live check (LeptonPad)
  - U3 floor tool: wazmrt `zig build surface`; zilc none (its version scheme encodes no compatibility)
  - reference: —

## 7. Every project against § 5

Each repo's own `cmem/release.md` is the authority for how it releases. The cards measured on
2026-11-10 (what each repo met and its "To converge" list), and the 2026-11-12 progress note, are in
[archive/release-process-project-cards-2026-11-10.md](archive/release-process-project-cards-2026-11-10.md).

## 8. The owner's decisions (2026-11-10)

- **D1 — the order, every project:** "we want the CI to check first, then push the tag, and then
  create the release page from the tag, then publish the package to the registry for the project
  in that order." → § 5 U4–U8. **This changes every card in § 7:** no project tags locally any
  more (U4 pushes `main` only); every workflow becomes checks on `main` → CI tag → page → publish.
  For the git-tag ecosystems it also ends the workstation-publish problem: CI's tag (after checks)
  is the publish. LeptonPad deploys from `main` through its host, so its deploy is not a CI step —
  its card records how the order maps (checks → tag → page; the deploy follows `main`).
- **D2 — crates.io:** "yes it should be per the release flow not on my machine." wasmrt's
  `cargo publish` moves into CI's U8; wasmrt, rsxtk and loader-rs use crates.io trusted publishing
  (OIDC) and retire their token secrets.
- **D3 — the record:** "releases should be recorded in one place in every project; … release.md
  should be the file name with the newest first in the 'Release History' with a summary of what
  changed in each one." → U11: `cmem/release.md` § "Release History".

**What the order supersedes in §§ 2–3 (binaryang's JS/TS text):** step 8's "pushes `main` AND the
tag in ONE push, as a user" and step 9's "the tag push publishes" — the release script now pushes
`main` only and CI tags; step 9's job table reorders to checks → tag → `release` → `jsr` / `npm`.
binaryang re-measures the JSR bot-tag limit first (U6 ⚠️). The § 7 cards below were measured
BEFORE D1–D3; where a card says "one atomic push of `main` and the tag" or "the page after the
publish", D1 replaces it.
