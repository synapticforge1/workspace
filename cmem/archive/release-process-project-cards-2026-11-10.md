## 7. Every project against § 5 (measured 2026-11-10 at each `origin/main`; zailc at local `main`)

Each card: **destination · last release · trigger**, then what meets § 5, then **To converge**
(the slots it misses — letter H33 sends each repo its own list). Sources: each repo's workflows,
scripts and `cmem/` release records; a cited line is a claim with a date.

**Progress, 2026-11-12** (ledger H33 has the per-repo detail): **released in the owner's order —
CI-made tag and page, registry read back:** binaryang, S3D, loader-js, rsxtk, loader-rs (crates.io
trusted publishing), loader-py (PEP 740), loader-jvm, loader-dart (pub.dev OIDC), loader-go,
loader-v, loader-zig, LeptonPad (deploy is the host's). **Adopted, no release yet:** wasmtk,
loader-c. **Not started:** wasmrt (still publishes from the workstation — D2), wazmrt, zilc,
zailc, loader-dotnet. The cards below are the 2026-11-10 measurement; a converged repo's own
`cmem/release.md` is now its authority.

**binaryang** — JSR `@jrmarcum/binaryang` + npm `@synapticforge1/binaryang` · 3.0.2 (2026-11-09) ·
tag `v*` + auto-tag. The reference: U1–U12 as § 2. **To converge:** U11 file name only (keeps
`publishing.md` — fine, pointer in INDEX).

**wasmtk** — JSR `@jrmarcum/wasmtk` · 3.0.0 (2026-10-24) · tag `v*`. Meets: U3 floor (refuses a
stale surface and a lower level), U8 Rekor read-back fatal; locally (`ce8af1ef`, unpushed) U8 /
U7 split with the page in H32's order. **To converge:** push `ce8af1ef` (H30, H32); U3 previous-tag
tests (`check_prev_tests.ts` is manual, ~25 min — run from `bump` or record why not); U4
`scripts/publish.ts` has no guards, `tag -f`, two pushes; U5 CI runs no tests / type check / dry
run before `deno publish`; U8 explicit skip-if-JSR-has-it; U7 write `release/<tag>` AFTER the
existing-page check; U9 actions unpinned, Bun via `setup-bun` without sha256; U10 `deno run
jsr:…@X --version` not recorded; H6.5b consumer suites (owner's go-ahead).

**S3D-ReportCompiler** — JSR `@jrmarcum/s3d-reportcompiler` + npm `@synapticforge1/s3d-reportcompiler`
· 1.3.0 (2026-11-07) · tag `v*` + dispatch (npm recovery). Meets: U3 (`compat.ts gate`), U5
(CI green on the tag's SHA required), U7 order, U9 actions SHA-pinned, per-tag concurrency; strong
local read-back (`verify-release`). **To converge:** U1 `bump` defaults to patch; U4 untracked
files not counted, `push --force` of the tag, two pushes, no cold dry run; U8 the `publish` job
checks out and installs (`bun install --ignore-scripts`) beside `id-token`, and REFUSES rather than
skips when JSR has the version; U8 Rekor read only in `jsr-score` (warns), npm provenance not read
in CI — make both fatal in CI; U7 no per-request time limit (`github-api.ts` `call()`); U9 Bun via
`setup-bun` without sha256, Deno floats `v2.x`; no `CHANGELOG.md`.

**universalWasmLoader-js** — JSR `@jrmarcum/universal-wasm-loader` + npm
`@synapticforge1/universal-wasm-loader` · 2.0.2 (2026-11-09) · tag `v*` + dispatch. Meets: U5–U9
fully (no `uses:`, every tool sha256-pinned, both read-backs fatal, skip-if-published both,
page in H32's order). **To converge:** U1 `bump` defaults to patch; U4 `scripts/publish.ts` has no
guards, commits whatever is staged, `tag -f`, two pushes; U8 the `jsr` job installs
(`--ignore-scripts`) beside `id-token`, the `npm` job rebuilds `dist` (digest-checked) instead of
taking an artifact; no `CHANGELOG.md`.

**LeptonPad** — no registry; the host deploys `main` (leptonpad.com) · v2.15.4 (2026-11-09) · tag
`vX.Y.Z` → page only. Meets: U4 best guards of all (one atomic push of `main` + `dev` + tag, undo
on rejection — under D1 the tag moves to CI after its checks; the deploy follows `main`), U7 order + 30 s, U9 no `uses:`, Bun sha256-pinned. **To converge:** U2 / U3 no
bump tool (the version is hand-edited; an app has no surface floor — record that); U5 CI runs no
gate (the gate is local `verify`); U9 its container base image by tag, not digest; U11 v2.15.4's live
check and first `release.yml` run not yet recorded.

**wasmrt** — crates.io `wasmrt-core`, `wasmrt-capi`, `wasmrt` (one version) · 2.0.1 (2026-11-09) ·
tag `v*` → checks + page. Meets: U3 strongest floor (`cargo public-api` + `cargo semver-checks` +
behaviour carry-forward), U7 order + 30 s (body = the CHANGELOG section, by choice). **To
converge:** U8 **publishes from the workstation** (`cargo publish` ×3 after `cargo login`) — move
to a CI `publish` job, trusted publishing, the three crates in order, skip-if-published (§ 8 D2);
U8 poll each crate's version endpoint, fatal; U7 the page before the publish already matches
D1's order; U3 previous-tag tests not wired; U4 no release script (owner tags and pushes by hand); U9
actions unpinned, Bun via `setup-bun` without sha256.

**rsxtk** — crates.io `rsxtk` · 0.5.1 (2026-11-09; tags `rsxtk_v*`) · tag `rsxtk_v*`. Meets: U5–U9
(three jobs, secret in one step, skip-if-published, version-endpoint read-back fatal, no `uses:`,
Bun sha256-pinned, page in order). **To converge:** U3 no bump tool or floor (no `pub` API today —
`--help` golden as its surface, as planned); U4 no release script (two pushes by hand); U8 token →
trusted publishing (D2).

**universalWasmLoader-rs** — crates.io `universal-wasm-loader` · 1.0.4 (2026-11-09) · tag `v*`.
Meets: U3 (`cargo semver-checks` floor, previous-tag tests in `.compat/`, SPEC check), U5–U9 as
rsxtk. **To converge:** U4 `release.ts` has no clean-tree guard, pushes twice and pushes the
current branch, not `main`; U5 previous-tag tests and the SPEC check run only in `bump`, not CI;
U8 token → trusted publishing (D2).

**universalWasmLoader-py** — PyPI `universal-wasm-loader` · 2.0.3 (2026-11-09) · tag `v*` +
dispatch. Meets: U3 (clean tree, floor, previous-tag tests, commits the bump), U5, U8 (OIDC mint,
per-file skip), U7 order + 30 s total, U9 artifact actions SHA-pinned, pixi sha256-pinned.
**To converge:** rule 3 / U8 — delete the LOCAL publish path (`scripts/publish.py` `twine upload`,
`pixi run publish`, release.py's fallback hint); U8 produce and read back PEP 740 attestations;
U4 push `main` only — CI tags (D1);  stale record lines
(`overview.md` "latest published 2.0.0", "TWO JOBS").

**universalWasmLoader-dotnet** — NuGet `UniversalWasmLoader` · 0.2.3 (2026-11-09) · tag `v*` +
dispatch. Meets: U3 (`compat.ts bump`: clean tree, floor, previous-tag tests), U5, U8 (trusted
publishing, `--skip-duplicate`), U7 order + 30 s (assets attached), U9 SHA-pinned, Bun sha256.
**To converge:** U4 no release script (commit, tag, push by hand); U8 read back in CI (version
served + repository signature); U11 records are oldest first, and `overview.md` still says the
workflow "runs on a published GitHub Release".

**universalWasmLoader-jvm** — Maven Central `io.github.jrmarcum:universal-wasm-loader-jvm` · 0.4.2
(2026-11-09) · tag `v*` + dispatch. Meets: U3 floor + previous-tag tests (`compat.main.kts`), U5,
U7 order + 30 s, U9 no `uses:`, JDK / kotlinc / Gradle sha256-pinned. **To converge:** U3 `bump`
has no clean-tree check and does not commit; U4 `./gradlew release` FORCE-moves and pushes the tag
only, with no guards — replace with a guarded script; U8 skip-if-Central-has-it (a re-run fails
today); U8 read back POM / jar / `.asc` in CI; U11 records oldest first.

**universalWasmLoader-dart** — pub.dev `universal_wasm_loader` · 0.3.2 (2026-11-09) · tag `v*`.
Meets: U3 floor + previous-tag tests, U5, U8 skip (`pub-has`), U7 order + 30 s, U9 no `uses:`.
**To converge:** U8 credentials secret → pub.dev OIDC (its "reusable workflow forbidden" premise
looks stale — loader-py's notes say hash-pinned actions are accepted); U4 `release.dart` has no
clean-tree guard, `tag -f`, two pushes; U3 `bump` no clean-tree check; U5 browser tests
non-blocking; U9 Dart SDK from apt `stable`, unpinned; U8 no read-back.

**universalWasmLoader-go** — Go proxy `github.com/synapticforge1/universalWasmLoader-go` · v0.3.3
(2026-11-09) · tag `v*`. Meets: U3 (clean tree, floor, previous-tag tests), U5, U7 order + 30 s,
U9 no `uses:`, Go and Bun sha256-pinned. **To converge:** U4 no release script (commit, tag, two
pushes by hand); U8 / U10 warm and read the proxy + sumdb in CI (`go list -m …@vX.Y.Z`), not by
hand.

**universalWasmLoader-c** — its own vcpkg git registry (port `universal-wasm-loader-c`) · v2.1.1
(2026-11-09) · push + tag `v*` + dispatch. Meets: U3 (`make bump`: clean tree, floor, previous-tag
tests, pins), U5 (pins, tree, tag = version, surface, `compat --release`, 3-OS overlay install),
U7 order + 30 s, Bun sha256 in `release`. **To converge:** U4 no release script — the `versions/`
git-tree and baseline are hand-edited and the tag pushed by hand, separately (generate both in a
guarded script that pushes `main`; CI tags, D1); U10 CI installs via overlay ports, never through the registry +
baseline a user uses — add a registry-mode install; U9 actions unpinned (`checkout@v4`,
`setup-bun@v2`, `setup-zig@v2`), vcpkg cloned at HEAD; no `concurrency`. D1 applies.

**universalWasmLoader-v** — VPM `synapticforge1.uwl` · v2.0.2 (2026-11-09) · push + tag `v*`.
Meets: U3, U4 most guards and an `ls-remote` read-back, U5 (Windows), U7 order + 30 s, U9 no
`uses:`, sha256 pins. **To converge:** U4 push `main` only — CI tags (D1); U5 check the version
in CI; U10 `v install` in CI. **Measure:** whether VPM users receive any push to `main` (`v
update` pulls the repo) — if so, `main` itself is a release channel and U5 must pass before it.

**universalWasmLoader-zig** — `zig fetch` of the tag tarball (`universal_wasm_loader`) · v2.1.1
(2026-11-09) · push + tag `v*`. Meets: U3, U4 guards + read-back, U5 (HEAD, tag = version, exact
test output), U7 order + 30 s with tests, U9 no `uses:`, sha256 pins. **The git-tag reference.**
**To converge:** U4 push `main` only — CI tags (D1); U10 `zig fetch` + hash in CI; stale records
("Current state — v2.1.0", "No CI."); the `zig-package` topic (owner, web UI).

**wazmrt** — no registry (consumers build from source) · v5.0.0 (2026-10-24) · no CI. Meets: U3
(`zig build surface` floor + S1–S3 behaviour checks). **To converge:** U2 / U4 the bump is four
hand edits and the tag is hand-made — a bump tool and a guarded release script; U5 / U7 a
tag-triggered workflow (checks, then the page — H32); U11 per-version blocks exist.

**zilc** — no registry; tags only · `v0.15.2-0.687.1` (2026-10-27) · no CI. Its version
(`<Zig>-<Fil-C>.<N>`) deliberately encodes no compatibility, so U3's floor does not apply — record
that. **To converge:** U4 a guarded release script (five hand edits today); U5 / U7 a
tag-triggered workflow for checks and the page (H32; Linux-only, so `ubuntu-latest`); U10 none.

**zailc** — GitHub Release assets (`zailc-vX.Y.Z-x86_64-linux-musl.tar.gz`, `SHA256SUMS`) with build
provenance · never released (gate closed; version `0.1.0`, owner's 0.0.1 recorded unpushed) ·
`auto-tag.yml` on `main` → `publish.yml`. Meets: U3 (surface floor in `bump.ts`), attestation
produced. **To converge before 0.0.1:** H30 (`gh release create` at `publish.yml:138`, `:141`);
U7 page in H32's order with the re-run-safe checks; U8 split — the build and `contents: write`
share one job; U8 read the attestation back (`gh attestation verify` is out — use the REST
attestations API); U9 actions to SHAs, Bun 1.4.3 → 1.4.4 by sha256 (H31); U4 no release script
(pushing `main` releases via auto-tag — a recorded difference).

**lisp-wat_interpreter** — orphan, never released; out of scope until the owner says otherwise.
