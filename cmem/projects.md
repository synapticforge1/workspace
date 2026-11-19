# projects.md — the map (as of 2026-10-26)

Every figure here was read from the repo's own memory and git log on 2026-10-22 (read-only sweep)
and **refreshed 2026-10-26** (every repo's git state; the four repo notes verified) — a dated
claim either way. The "memory layout" column is still the 2026-09-20 reading unless dated.

## Where each project lives — the canonical reference (measured 2026-10-22)

The GitHub organization is **`synapticforge1`** (`https://github.com/synapticforge1/<repo>`); the
moves ran 2026-10-20 → 2026-10-22. Measured from each clone's `origin` and each manifest. **Cite
this table instead of writing a URL anywhere else in this memory.** Registry names are NOT GitHub
locations and did not all move: a JSR scope is a JSR account (`@jrmarcum` stays), a Maven Central
namespace is tied to the account that verified it.

- binaryang
  - GitHub (`origin`): synapticforge1/binaryang
  - registry / package name: JSR `@jrmarcum/binaryang`; npm `@synapticforge1/binaryang`
  - left to do: — (**2.2.2** published 2026-10-28 by the workflow, provenance on both — the `delegate` fix,
    upstream wabt's mismatch words; H20 recorded `fa5437d34 (was 299dd6c9b)`). **History rewritten a SECOND
    time 2026-10-28** (five benchmark modules' DWARF paths; 383 commits from 2026-10-13 on and 14 tags have
    new ids — tag map `binaryang/cmem/publishing.md` § "The second purge"; ids quoted here translated
    2026-10-30, C26). `origin/main` `62b546e2a`; local `main` 4 ahead (2026-11-05, unpushed memory commits)
- wasmtk
  - GitHub (`origin`): synapticforge1/wasmtk (moved 2026-10-23; JSR linked to the org)
  - registry / package name: JSR `@jrmarcum/wasmtk`
  - left to do: ✅ force-pushed 2026-10-23, purged AGAIN 2026-10-26 (one binary; map
    `history-purge-2026-10-26.md`); **3.0.0 published from the org with provenance 2026-10-24** (H20 ✅). Left:
    JSR's provenance names pre-purge commits (owner: "I will fix the jsr")
- wasmrt
  - GitHub (`origin`): synapticforge1/wasmrt
  - registry / package name: crates.io **2.0.0** (`wasmrt`, `wasmrt-core`; released 2026-10-24)
  - left to do: history rewritten 2026-10-23 for drive paths (commit email kept, owner) — old ids →
    `wasmrt/cmem/history-map-2026-10-23.md`; `Cargo.toml` `repository` = `synapticforge1/wasmrt`
- wazmrt
  - GitHub (`origin`): synapticforge1/wazmrt
  - registry / package name: none (git; tags `v1.0.1`–`v5.0.0`)
  - left to do: —
- rsxtk
  - GitHub (`origin`): synapticforge1/rsxtk
  - registry / package name: **crates.io `rsxtk`** (35 versions, default **0.5.0**, first 2026-01-06 —
    crates.io API, re-measured 2026-10-26)
  - left to do: —
- ~~wabt-ts, binaryen-ts~~
  - GitHub (`origin`): **RETIRED 2026-10-26 (owner)**: the GitHub repos (then under `synapticforge1/…`) are
    deleted by the owner; the workspace folders were removed the same evening after every local and GitHub ref
    was checked against binaryang's bundles (`cmem/local/predecessors/`: `*-all-refs.bundle`,
    `github-*-mirror.bundle`, 39 tags each, plus two nested-clone tars)
  - registry / package name: JSR `@jrmarcum/wabt-ts` (32 versions) and `@jrmarcum/binaryen-ts` (39): **every
    version yanked, 1.5.1 included; both packages archived** (binaryang measured JSR's API 2026-10-28,
    `dd56376bd (was 3e0f7bc1a)`; owner: "no longer live with accessible versions" — an exact-version import
    still downloads, JSR keeps yanked versions)
  - left to do: — (done; no sibling pins either package — measured 2026-10-26 over every manifest and lock)
- loader-js
  - GitHub (`origin`): synapticforge1/universalWasmLoader-js
  - registry / package name: JSR `@jrmarcum/universal-wasm-loader`; npm
    `@synapticforge1/universal-wasm-loader`
  - left to do: —
- loader-rs
  - GitHub (`origin`): synapticforge1/universalWasmLoader-rs
  - registry / package name: crates.io `universal-wasm-loader`
  - left to do: —
- loader-py
  - GitHub (`origin`): synapticforge1/universalWasmLoader-py
  - registry / package name: PyPI `universal-wasm-loader`
  - left to do: —
- loader-go
  - GitHub (`origin`): synapticforge1/universalWasmLoader-go
  - registry / package name: Go module `github.com/synapticforge1/universalWasmLoader-go` (v0.2.0+; v0.1.0
    under `jrmarcum`, breaking change recorded)
  - left to do: —
- loader-jvm
  - GitHub (`origin`): synapticforge1/universalWasmLoader-jvm
  - registry / package name: Maven Central `io.github.jrmarcum:universal-wasm-loader-jvm` (**0.3.0**,
    2026-10-26)
  - left to do: 🔒 decided 2026-10-26: the groupId and package name STAY (Central Portal namespace is
    account-bound; L6 closed)
- loader-dotnet
  - GitHub (`origin`): synapticforge1/universalWasmLoader-dotnet
  - registry / package name: NuGet `UniversalWasmLoader`
  - left to do: —
- loader-dart
  - GitHub (`origin`): synapticforge1/universalWasmLoader-dart
  - registry / package name: pub.dev `universal_wasm_loader`
  - left to do: —
- loader-c
  - GitHub (`origin`): synapticforge1/universalWasmLoader-c
  - registry / package name: vcpkg registry port
  - left to do: —
- loader-v
  - GitHub (`origin`): synapticforge1/universalWasmLoader-v
  - registry / package name: VPM `synapticforge1.uwl`
  - left to do: —
- loader-zig
  - GitHub (`origin`): synapticforge1/universalWasmLoader-zig
  - registry / package name: git (`build.zig.zon` `.universal_wasm_loader`)
  - left to do: —
- lisp-wat_interpreter
  - GitHub (`origin`): none — not a git repo
  - registry / package name: none
  - left to do: —
- **LeptonPad** (added to the review 2026-10-26)
  - GitHub (`origin`): **synapticforge1/LeptonPad** (`origin` reset 2026-10-26, read 2026-10-28; private)
  - registry / package name: none (proprietary PWA at leptonpad.com; deploys from `main` through its host,
    re-pointed 2026-10-26)
  - left to do: —
- **S3D-ReportCompiler**
  - GitHub (`origin`): **synapticforge1/S3D-ReportCompiler** (`origin` reset 2026-10-26, read 2026-10-30)
  - registry / package name: JSR `@jrmarcum/s3d-reportcompiler` **and, since 2026-10-28, npm
    `@synapticforge1/s3d-reportcompiler`** (with a `bin`: global command, `npx`); **1.1.0 – 1.1.5 released
    2026-10-28** (tags read; npm from 1.1.4 via OIDC only, after a one-time bootstrap token; `publish.yml`
    publishes nothing unless CI passed on the tagged commit — S3D's records); 1.0.4 was 2026-08-12
  - left to do: JSR's GitHub link already names the org (S3D's `meta.json`) — nothing left
- ~~**ub-cosmic**~~
  - GitHub (`origin`): **REMOVED 2026-10-27** (owner): workspace folder and the `synapticforge1/ub-cosmic`
    GitHub repo deleted
  - registry / package name: GHCR images / Artifact Hub listing: not part of the repo — whether they still
    exist is unmeasured (owner's)
  - left to do: —
- **zailc**
  - GitHub (`origin`): synapticforge1/zailc (moved 2026-10-22; `origin` right)
  - registry / package name: none yet (release gate `closed`; 0.1.0 unreleased)
  - left to do: —
- **zilc**
  - GitHub (`origin`): **synapticforge1/zilc** (`origin` reset 2026-10-27, read 2026-10-28)
  - registry / package name: git tags `v0.15.2-0.686.1` (2026-10-05), **`v0.15.2-0.687.1` (2026-10-27)**; no
    registry, no GitHub Release object (owner: the tag's page is enough)
  - left to do: —

**Maintainer contact email** (owner exception, 2026-10-23, working-rules § Records): allowed in the
registry's maintainer/author manifest field for every project above with a registry entry; never
elsewhere. Present 2026-10-23 in loader-py (`pyproject.toml`), loader-jvm (`build.gradle.kts`) and
rsxtk (`Cargo.toml` — rsxtk publishes to crates.io, so it is allowed). The other publishing
projects have none today — adding one is optional.

Remaining `github.com/jrmarcum/…` text in the repos' tracked files (`git grep`, 2026-10-23), now
that wasmtk has moved too: **stale links to the old wasmtk URL** — loader-js `VISION.md:4`,
`scripts/regen-fixtures.ts:80`; loader-jvm `VISION.md:4`, `cmem/overview.md:46`; loader-rs
`README.md:6,249,251`; loader-c `README.md:4` (letter H17, part 3; GitHub redirects meanwhile); the
H7 fixture stamps (loader-js / -dotnet / -dart `fixtures.json:5`), which the post-push re-stamp
replaces anyway; binaryang `tests/wabt-ts/wasmtk/PROVENANCE.md:8` (a provenance record — history,
leave it); deliberate history (loader-go README + CHANGELOG, loader-c and loader-jvm `overview.md`).
(wasmrt's `Cargo.toml` `repository` was fixed 2026-10-23.)

## The pillars

```
                 ┌──────────── producers ────────────┐
   TypeScript ──▶ wasmtk (wasic) ──┐                  │   Go: TinyGo   Zig: zig   Rust: rsxtk
                                   ▼                  │
                    binaryang (assemble / optimize; wabt-ts + binaryen-ts merged)
                                   │  P1 core module + sidecar .wit
                                   ▼
        ┌──────────── consumers ──────────────────────────────────────────────┐
        │ universalWasmLoader-{js,rs,py,go,jvm,dotnet,dart,c,v,zig}  (SPEC 4.0.0) │
        │ rsxtk (run .rs/.wasm/.wat)     wasmtk run / dync_cross_runtime tests   │
        └────────────────────────────────────────────────────────────────────┘
                                   ▲
                 runtimes contesting the slot: wasmrt (Rust)  vs  wazmrt (Zig)
                 (today every consumer runs on wasmtime / wazero / Chicory / host WebAssembly)
```

## The repos

Where each project STANDS is in that project's own `cmem/STATE.md` (memory-guide.md); this file
keeps only what does not change from week to week. The per-repo history table that was here, with
every release up to 2026-11-19, is in [archive/projects-to-2026-11-19.md](archive/projects-to-2026-11-19.md).

## Relationships that matter

- **The five repos added 2026-10-26** (LeptonPad, S3D-ReportCompiler, ub-cosmic — removed
  2026-10-27 — zailc, zilc) are
  not WebAssembly projects; they are under the review because they share the owner, the floor and
  the machine. Ties to the rest: **LeptonPad → wasmtk** (`build:wasm` compiles its solver with
  `wasmtk modc`, unpinned — S7; also the `modc` producer path's only application consumer);
  **zilc ⇄ zailc** (🔒 owner 2026-11-05, C28, refining the 2026-10-27 split of C22/C24: **zilc** is
  the upstream-faithful Fil-C on Linux x86_64 and its pure-Zig build on Zig 0.15.2; **zailc** is a
  CLEAN SLATE in Zig 0.17.1 that takes none of zilc's code — it READS zilc as its reference corpus,
  translating zilc's tests and examples and matching zilc's recorded results; zailc also owns the
  zail language and every other platform. zilc's tests, examples and results are therefore another
  repo's dependency. Superseded: "zailc builds on zilc's work" and "nothing in zilc changes for it"); **zilc/zailc ⇄ wazmrt**
  share Zig, the exFAT `ZIG_LOCAL_CACHE_DIR` lesson, and memory conventions copied from wazmrt;
  ~~ub-cosmic ← wasmtk~~ copied its `cmem/` layout (2026-07-13; removed 2026-10-27). The machine lessons they add —
  SentinelOne quarantines native output built by Fil-C/cosmo on the Windows host (run in WSL
  only), and Zig 0.15.2 lives off PATH at `C:\zig\0.15.2` — are in `local/environment.md`.

- **The long-run shape (owner, 2026-09-20)**: binaryang becomes the home of the whole TS ⇄ wasm
  toolchain — parser, assembler, optimizer, `wasm2ts`, and `ts2wasm` (today's `wasic`, once
  mature; `wasic` is then retired from wasmtk) — and wasmtk becomes thinner: orchestration,
  producers for other languages, the corpus, the loaders' fixtures.
  Rows I2, I10, I11 in [divergences.md](divergences.md).
- **binaryang ⇄ wasmtk** is the tightest coupling: wasmtk parses binaryang's OUTPUT TEXT, so the pin
  is exact (two specifiers, one version, move together); wasmtk co-develops against a gitignored
  `upstream/binaryang` clone whose build installs as `wasmtk-upstream` so no gate can pick it up.
  The 2026-09-20 pause ended when binaryang shipped 1.6.0–1.8.1; since then binaryang released
  nine minors in 24 days (1.6.0 on 2026-09-28 → 1.14.0 on 2026-10-22), then 1.15.0, 1.16.1, 2.0.0,
  2.1.0, 2.2.0 (2026-10-24) and 2.2.1 (2026-10-26); **wasmtk pins 2.2.0** (2026-10-24) and since
  2026-10-26 runs `wasmbundle` on binaryang's `bundle()` (H11 closed) — its open question to
  binaryang (ledger C12): is `Module._inner` + `bundle()` a stable contract across minors?
- **wasmtk → runtimes**: wasmtk owns the vendored spec testsuite (`tests/module/wasm_wast/testsuite-main`,
  synced 2026-08-20). wasmrt and wazmrt reference it by path, read-only. An owner-directed patch to
  `proposals/threads/` was authored in a wasmrt session, left uncommitted in wasmtk's tree, and
  committed by wasmtk narrower than drafted — so the two runtimes' corpora now differ by that patch.
- **wasmrt ⇄ wazmrt**: port → oracle (frozen 2026-07-27) → oracle retired (2026-08-11) → competitors.
  The only binding document between them is `interop.md` (wazmrt holds the pen, **contract v41 as
  of 2026-10-26**; wasmrt's copy is **byte-identical through v40** — SHA-256 checked 2026-10-26 — with
  v41 pending its mirror, C7; **release lockstep ENDED at v33**, owner 2026-10-23). Scope: CLI
  options and security checks only. Contest: smallest and fastest binary; conformance at zero
  failed / zero skipped / zero unrun (both at 64,603 / 0 / 0 and 64,092 / 0 / 0 on their own counts,
  2026-10-24/26).
- **runtimes → consumers**: no consumer runs on either runtime today. wasmtk executes through
  `WebAssembly.instantiate`; rsxtk, -rs, -py, -dotnet, -c/-v/-zig run on wasmtime; -go on wazero;
  -jvm on Chicory; -js/-dart on the host engine. **The slot the runtimes compete for does not exist
  yet** (wazmrt's own finding). Cheapest foothold recorded: add a runtime to wasmtk's
  `dync_cross_runtime` RUNTIMES list; rsxtk via the `wasmrt-core` rlib (never measured).
- **wasmtk → loaders**: the WIT naming triad and Canonical ABI conventions are set by `wasic`/`bindgen`;
  the loaders' fixtures are `wasmtk modc` outputs copied from `-js/tests/`. The contract is
  `-js/SPEC.md` 3.0.0 with §10 (producer model + WASI shim). See [contracts.md](contracts.md).
- **rsxtk**: wasmtk delegates all Rust producing to it ("do NOT reimplement via cargo"); wasmrt is to
  become its default engine. rsxtk records both (`overview.md` § "Where it sits in the workspace",
  `design-decisions.md` § "The wasmrt switch"; verified 2026-10-26 — the earlier "nothing inside
  rsxtk records either fact" is retired).
- **Predecessors**: wabt-ts and binaryen-ts were FROZEN (owner, 2026-09-02; "reference only, never
  officially deleted", 2026-09-20) and are **RETIRED 2026-10-26** (owner: remove them from the
  workspace and the GitHub org, yank the JSR versions — every one, 1.5.1 included, measured
  2026-10-28). The 2026-09-20
  "never deleted" line is superseded. Their memory is summarized in binaryang's `cmem/wabt-ts.md`
  and `cmem/binaryen-ts.md`; the full wings are `git show 9758fc736:cmem/<wing>/` in binaryang;
  their complete git histories are bundles in binaryang's private `cmem/local/predecessors/`.
- **Loader engines** (🔒 owner 2026-09-20): wazero is the default for `-go` because it is native
  Go; all ten loaders need real tests in the end, `-v` and `-zig` included. The loaders receive the
  first-party runtime only after rsxtk and wasmtk have surfaced whatever issues there are.

## Where memory conventions came from

`wazmrt` pioneered `best-practices.md` (METHOD not findings) → wasmtk adopted it 2026-08-24 with
`[wazmrt]`/`[wasmtk]` tags → wabt-ts and binaryen-ts adopted it 2026-08-21/24 → binaryang merged both
by topic 2026-08-25 and added the cleanup policy ("git is the archive", 2026-09-14). wasmtk set the
`cmem/` = single home + gitignored pointer `CLAUDE.md` policy on 2026-05-31; the loaders copied the
INDEX boilerplate on 2026-06-09 but not the pointer-file discipline. Three rules wasmtk attributes to
wazmrt ("CPU time before theorising", "reachable before bisecting", "background suite kills the
shell") do not exist in wazmrt under those words; they are wasmtk's own.
