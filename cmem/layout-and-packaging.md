# layout-and-packaging.md — repo skeleton, licensing, CI, versioning, publishing

Compiled 2026-09-20. Where the siblings disagree, the disagreement is named and a floor is stated.

## Repo skeleton (the common shape)

```
<repo>/
  README.md              public, user-facing; NOT memory. Logo centered at top where one exists.
  LICENSE                full MIT text FIRST (JSR fingerprints by content hash), pointer after
  LICENSE-MIT  LICENSE-APACHE  NOTICE(.md)      the triad; NOTICE carries upstream obligations
  CLAUDE.md              gitignored pointer (< 5 KB); or absent when cmem/INDEX.md opens as the pointer
  cmem/                  committed memory; cmem/local/ gitignored
  main.ts | src/main.rs | src/main.zig          one CLI dispatcher at the root of its language's tree
  src/                   library; origin-prefixed namespaces where two histories share a tree
  tests/                 mirrors src/; generated .wasm/.wat/.wit that pair 1:1 with a .ts are untracked
  scripts/               gates (check-*.ts), release/ (bump, publish, version, release-guard), reports as .md
  upstream/              gitignored clones of the upstream C++ / the reference impl; never a submodule
  benches/ | bench/      benchmarks
  third_party/LICENSES.md  adoption checklist + component ledger (runtimes)
  .github/workflows/     ci.yml (gates), publish.yml (tag → publish), auto-tag.yml (Deno repos)
  .gitattributes         * text=auto eol=lf first; *.wasm *.bin *.jar binary; *.sh *.wat *.wast eol=lf explicit
  .gitignore             anchored patterns: /upstream/ /cmem/local/ /CLAUDE.md /.claude/
  .editorconfig          LF, utf-8; *.wat/*.wast never whitespace-trimmed (bytes feed a digest)
```

- **Generated test artifacts are untracked**; input fixtures are re-included with `!` lines.
  Committing them broke GitHub's 1,000-files-per-directory cap. [wasmtk]
- **`.claude/settings.local.json` is gitignored** — an allowlist from one machine must never
  pre-approve commands on someone else's checkout.
- **Nested reference clones** (`wabt-ts/binaryen-ts/`, `wabt-ts/wasmtk/` — gone with wabt-ts's retirement
  2026-10-26; archived as tars in binaryang's private `cmem/local/predecessors/`) are stale snapshots that
  grep will hit; treat as the "stale artifact read as a live signal" class.

## Licensing

- **Triad**: `LICENSE` (full MIT, no markdown decoration, first content), `LICENSE-MIT`,
  `LICENSE-APACHE`, `NOTICE`. The ported repos inherit BOTH upstreams' Apache-2.0 §4 obligations:
  NOTICE plus per-file headers ("Ported from WebAssembly/wabt … Copyright 2016 WebAssembly Community
  Group participants" vs "Copyright (c) 2026 Jon Marcum … MIT").
- **SPDX**: JSR manifests say `"license": "MIT"` — **JSR rejects `"MIT OR Apache-2.0"`** and rejects
  pointer-only LICENSE files (both predecessors hit it). Cargo and Zig manifests say
  `MIT OR Apache-2.0`. Loader ports are MIT-only; -go and -dotnet were corrected away from the
  compound expression because no Apache text existed. -c's vcpkg port declares
  `MIT AND Apache-2.0 WITH LLVM-exception` because it bundles the wasmtime binary.
- **Copyright line varies** (`2026 Jon Marcum` vs `2024 J.R. Marcum`); pick one.
- **Third-party code**: "looking at" is free; copying or porting needs the Adoption Checklist and a
  Component Ledger entry first (`third_party/LICENSES.md`). A compliant repository is not a
  compliant distribution — check what the build installs.
- **JSR doc score 100** needs JSDoc on every export and `@module` with an explicit description on
  every entrypoint; `{@link}` and `@example` are not type-checked; `deno doc --lint` is NOT a
  coverage check — parse `deno doc --json`.

## CI shape

- **`ci.yml` (Deno repos)**: fmt --check → lint → check → naming gate → portability gate → test →
  baseline → `deno publish --dry-run --allow-dirty` → reported-not-gated metrics with `|| true` (a
  collision count gated would reward renaming). binaryang adds a runtime matrix (Deno, Node 22.18,
  Node 24, Bun 1.4) that prints a `wat2wasm` sha256 so all legs agree.
- **`publish.yml`**: on `v*` tag (+ dispatch): verify tag == manifest version → check → test → "Check
  OIDC availability" (a prerequisite diagnostic only; it gave ten releases of false assurance) →
  `deno publish` DIRECTLY (a subprocess wrapper breaks OIDC; no `--allow-slow-types` unless a dynamic
  npm import forces it; no token) → the GitHub Release (REST API from a Bun step with
  `GITHUB_TOKEN` — 🔒 no `gh`, even in CI, owner 2026-11-08, working-rules § Tooling 9; was
  `gh release create`) → **provenance verification LAST**: poll
  `rekorLogId` cache-busted (`Cache-Control: no-cache`, `?cb=`), fail loudly. `updatedAt` seconds
  after `createdAt` is the tell.
- **`auto-tag.yml`**: on push to `main`, tag `v<manifest version>` if absent. **The bot can tag but
  cannot publish** (`actorNotScopeMember`: `github-actions[bot]` is not a JSR scope member) until a
  fine-grained `RELEASE_PAT` from a scope member exists. binaryang closed this as NOT NEEDED (owner
  2026-09-29, `publishing.md:20`): its release pattern pushes the tag itself (8 of 8 unaided), and
  the auto-tag → dispatch path is reached only by a bumped `main` pushed without its tag, which
  fails loudly.
- **Actions pinned to major tags** (`checkout@v4`/`v6`, `setup-deno@v2`); setup-deno floating `v2.x`
  was tested against a pin and the pin was ruled out.
- **Trusted publishing survives a repo transfer only if re-created** (loader-dotnet, 2026-10-22):
  nuget.org locks a policy to the GitHub repository and owner IDs at its first successful publish,
  so after the move to `synapticforge1` the 0.1.1 publish failed `Token exchange failed (HTTP 401)`
  until a NEW policy for the org was created. Check every registry's OIDC policy after a transfer,
  before the next release (letter H20).
- **Loader ports: workflows are `run:`-only** — the org policy permitted only `jrmarcum`-owned
  actions (recorded before the move to `synapticforge1`; whether the new org carries the same
  Actions policy is UNMEASURED — re-check before relying on it, P5); a third-party `uses:` gives `startup_failure` and a release that looks published on
  GitHub but reaches no registry (js v1.0.6). Checkout is `git clone --depth=1 --branch <tag>`; the
  workflow file AT THE TAGGED COMMIT is what runs. ⚠️ -c, -go and -dotnet use third-party `uses:`
  and -dotnet reportedly published through it — **whether the policy is org-wide is unmeasured**.
- **Token-free publishing preferred**: JSR OIDC, PyPI Trusted Publishing behind a protected `pypi`
  environment, NuGet Trusted Publishing. jvm (Maven token + GPG) and rs (`CARGO_REGISTRY_TOKEN`)
  still hold secrets. Never paste a token into a script (py rotated one).
- **Runtimes**: wasmrt has only `release.yml` (tag → CHANGELOG section → GitHub release; crates.io
  manual); wazmrt has no CI — every gate is a `zig build` step run by hand.

## Versioning — the one place the repos genuinely disagree

- wasmtk
  - scheme: odometer: minor/patch single-digit, carry left (`1.9.9` → `2.0.0`); `bump.ts` refuses multi-digit
  - meaning of a number: **no compatibility meaning**; a break is marked by a deliberate major bump AND the
    README Breaking Changes table
- binaryang
  - scheme: sub-version capped at 9, `bump` has no minor mode; minors set by hand
  - meaning of a number: removing an export is breaking → minor; never yank; signpost releases
- wasmrt
  - scheme: port-progress ladder; patch single-digit; `1.0.0` = conformance clear-out; API promise starts at
    1.0
  - meaning of a number: version = what genuinely runs and passes its gate, never maturity
- wazmrt
  - scheme: `+0.0.1` per shipped track; breaking → next major immediately; `abi_version` separate
  - meaning of a number: breaking = C ABI, root surface, CLI contract, or "accepting less"
- loaders
  - scheme: independent of SPEC version (SPEC §9); all over the place (0.1.0 … 1.1.0)
  - meaning of a number: semver-ish

**🔒 Decided (owner, 2026-09-20), superseding the table above for every repo: plain Semantic
Versioning 2.0.0, no digit cap, no carry.** The owner's reason: it "pulls all of the repos
together", and it is what every registry the ecosystem publishes to requires (JSR: the `version`
field "must be a valid SemVer version"; crates.io, npm, pub.dev, NuGet, Go modules, Zig `.zon`;
PyPI's PEP 440 accepts the same shape). Two earlier drafts of this decision on the same day were
odometers (single-digit, then two-digit, with carry); both were retired because a carry into a new
major tells every caret consumer "this broke" when it did not.

| release contains                                  | bump     | resets       |
| ------------------------------------------------- | -------- | ------------ |
| bug fixes only, nothing added, nothing broken     | `+0.0.1` | —            |
| new capability, backward compatible               | `+0.1.0` | patch → 0    |
| anything backward-incompatible (BREAKING)         | `+1.0.0` | minor, patch → 0 |

- **Components are unbounded integers.** `1.9.9` is followed by `1.9.10` or `1.10.0`; never by
  `2.0.0` unless something broke. Nothing ever rolls upward. (wasmtk shipped `1.11.12` before the
  odometer was imposed; multi-digit versions already exist on JSR under its name.)
- **Breaking** means what wazmrt already lists: a public API or ABI surface, a CLI contract, a
  removed export (binaryang's "minor" reading is retired), or "accepting less" even when correct.
- **The major IS the break signal.** Consumers' carets (`deno add` writes `^x.y.z`; Deno resolves
  it as "updates that do not change the leftmost non-zero digit") flow through minors and patches
  and stop only at a real break. The README `### ⚠️ Breaking Changes` table stays as the
  migration guide, no longer as a disambiguator.
- **`0.y.z` repos** (wasmrt 0.9.0, rsxtk 0.5.0 — crates.io 2026-10-23, most loaders 0.1.x): SemVer says "anything MAY
  change"; a caret on `0.4.4` accepts only `0.4.x`, so a `0.x` minor bump is treated as breaking
  by consumers. That is correct pre-1.0 behaviour. A repo's API promise begins at `1.0.0`, which is
  what wasmrt's memory already says.
- **Retired by this decision**: wasmtk's "numbers carry no compatibility meaning" and its odometer
  (`bump.ts` cap at 9, carry); binaryang's "sub-version capped at 9" and "bump has no minor mode";
  wazmrt's `+0.0.1`-per-track odometer; wasmrt's "patch stays single-digit". Bump scripts take
  `patch` | `minor` | `major`, reset lower components, and refuse anything else. A version line is
  a claim; the script is the gate.

### 🔒 The compatibility gate — binding on every bump mechanism (owner, 2026-09-20)

"Backward compatible" is a gate result, never a judgment made at bump time. A bump script that does
not run this gate is not a bump script. A goal with no gate is a preference (best-practices 2.3).

**Rule 1 — every repo commits a SURFACE SNAPSHOT.** The surface is the list of what consumers can
depend on, produced by a tool, not by hand, and checked in as a file the gate diffs:

| repo kind                     | surface file is generated from                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| Deno package                  | the `exports` map + every symbol and signature in `deno doc --json` (the exports map is a third surface grep cannot see) |
| Rust crate                    | the `pub` API as rustdoc sees it (`cargo public-api` / `cargo semver-checks` baseline)             |
| C ABI                         | the header, plus `abi_version` and the feature-enum order (newest LAST; C integers are frozen)     |
| CLI                           | flags, positional shapes, exit codes, and any output text a script may parse (golden `--help`; the interop contract rows for the runtimes) |
| produced artifacts            | text a consumer parses (binaryang's WAT → wasmtk), the `.wit` sidecar the loaders parse, fixture `.wasm` bytes |
| loaders                       | `SPEC.md` and the reference fixture suite, unmodified                                              |

**Rule 2 — the diff computes the FLOOR, and the script refuses a bump below it.**

| surface diff shows                                          | minimum bump |
| ----------------------------------------------------------- | ------------ |
| nothing removed, nothing changed, nothing added             | patch        |
| something added; nothing removed or changed                 | minor        |
| anything removed, renamed, retyped, narrowed, or "accepting less" even when correct | major |

`bump.ts` / `bump_version.ts` / `version_agreement.zig` / `bump.sh` run the diff, print the floor
with the symbols that set it, and exit non-zero on `bump patch` when the floor is minor or major.
CI repeats the check on the tagged commit: manifest version vs last tag vs surface diff; disagreement
fails the publish. Rust repos use `cargo semver-checks` as the diff; it exists for exactly this.

**Rule 3 — names are not behaviour; two behaviour checks run in the release gate.**
wabt-ts T13.47: an import-surface diff showed 0 of 72 symbols missing while 12 of 28 bridge tests
failed.

- The PREVIOUS tag's `tests/` must pass against the NEW `src/` for a patch or minor bump. A test
  that must change is a surface change; classify it before bumping.
- Every producer's release checklist names its consumers and runs their suites against the
  unpublished build before publishing (wasmtk already does this for binaryang through
  `upstream/binaryang` and the `wasmtk-upstream` guard; the loaders' fixture suite does it for
  wasmtk's bindgen; binaryang's `direct-behaviour` does it for its own two paths). A consumer
  suite red on a patch or minor bump is a release blocker, not a note.

**Rule 4 — deprecate before you remove.** A removal or rename is first published with a
`@deprecated` tag (or the language's equivalent, plus a kept alias) for at least one minor
release. The README `### ⚠️ Breaking Changes` row is written when the deprecation lands, with the
migration, not when the removal does. Removal then requires the major the floor demands.

**Rule 5 — an intended surface change re-baselines in its OWN commit** stating the reason, before
the bump commit (binaryang's existing rule for its byte baseline, generalized). The bump commit
never touches the snapshot.

**Rule 6 — pre-1.0 repos run the same gate.** A `0.y.z` repo's floor still prints; the script
allows a minor where the floor says major (SemVer permits it pre-1.0), but the Breaking Changes
row is still mandatory. The repo's API promise begins at `1.0.0`, when the exemption ends.

**Invert it before trusting it.** Each repo proves its gate fails on purpose: remove an export,
run `bump patch`, watch it refuse for the right reason (best-practices 2.1).

- **Breaking changes** get their own `### ⚠️ Breaking Changes` table above Feature Status in the
  README (`| Version | What changed | How to migrate |`), `_next release_` while unreleased.
- **README roadmap rows are grouped by PHASE**, placed beneath the phase row they belong to with the
  date in the Phase column; `⏳` rows last. Appending dated rows to the end made them invisible.
- **CHANGELOG** (where kept) is user-facing, leads with impact, and says plainly when nothing moved.

## Pins and dependencies

- **First-party backends are EXACT-pinned**, no caret: wasmtk → `jsr:@jrmarcum/binaryang@1.13.0`
  (2026-10-20) through three specifiers (`/compat/wabt`, `/compat/binaryen`, `/wasm-validate`)
  that must move together; never the
  bare package (56 colliding type names). Any bump runs the full gate and the wast gate goes red by
  design (gained coverage).
- **Import aliases must not shadow a resolvable package** (`binaryen` → `binaryen-backend`).
- **`minimumDependencyAge`**: binaryang `"0"` (waived: all deps own-scope + `@std`); wasmtk `PT1M`
  (owner 2026-08-25; a stale `PT1H` bullet contradicts it). Only ISO-8601 durations parse.
- **Engine pins in loaders are majors with a recorded reason** (wasmtime 28 in -rs because
  `unwrap_f32` semantics changed; wasmtime 40 in rsxtk because 42+ needs NASM+cmake via `aws-lc-sys` —
  `Cargo.toml` says `"40.0.1"`, which Cargo reads as `^40.0.1`, and `Cargo.lock` holds **40.0.4**, measured
  2026-10-23; the major is the pin, the lockfile the exact version).
- **Runtimes have zero third-party dependencies** (wasmrt, wazmrt) — the first invariant of the
  size contest.

## Portability layers (TypeScript repos)

Written when the TS repos built on Deno. As of 2026-10-22: binaryang builds on Bun + Node (Bun
migration B1–B7 closed 2026-10-13; `deno.json` deleted; Deno only for `deno publish` to JSR, one
`deno doc` test and `comparison/`; CI runtime matrix Deno, Node 22.18/22/24/26, Bun 1.4.0;
Node 24 is the authoritative test run); wasmtk is mid-exit (`wasmtk/cmem/deno-exit-plan.md`: P5
scripts on Bun 2026-10-21, product P0–P4 not moved); universalWasmLoader-js is on Bun with Deno kept
for JSR publish and one CI test leg. The `deno doc --json` surface rules below still hold where JSR
is published.

- **Library** = web-standard APIs only; no `Deno.*`, no `node:*`. **CLI, interop, `main.ts`** may
  use `node:*`, never `Deno.*`. All I/O in wasmtk through an `rt.*` shim. Both greps exclude JSDoc
  ("a portability check that cries wolf gets disabled").
- **Runtime floors** carry a reason and a review date: Deno 2.x; Node ≥ 22.18.0 (not-EOL policy;
  `import.meta.main` backported there; next move 2027-04-30); **Bun ≥ the latest installed Bun —
  1.4.4 on 2026-11-09** (🔒 owner, 2026-11-09: "the minimum supported version will be updated to the
  latest version currently installed"; Tooling rule 10, letter H31; was binaryang's ≥ 1.4.0, set at
  the Zig→Rust rewrite boundary as "an exception with its reason attached"); browsers, library only. wasmtk writes its Deno floor at the next release,
  then holds.
- **Naming rule** (CI-enforced in binaryang): bare `binaryen` / `wabt` in a path only under
  `compat/` or `interop/`; the `-ts` suffix marks the port; subpaths qualified when both sides have
  the thing, bare when only one does; no `./ir` root subpath.
- **Promotion is provable**: a module leaves a namespaced tree only when nothing on the other side
  still imports it — the import graph answers, not an assertion.

## Per-language notes

- **Rust (wasmrt)**: workspace, edition 2024, `rust-version` pinned, `#![forbid(unsafe_code)]` with
  one justified `allow` at the FFI boundary; release profile `opt-level="z"`, LTO, `codegen-units=1`,
  strip, `panic="abort"`; `crt-static` on `x86_64-pc-windows-gnullvm` (removes `libunwind.dll`);
  **no `rlib` in the cdylib crate** (it defeated LTO dead-code elimination: −62 %); clippy clean;
  Miri gate on the capi crate; `CARGO_TARGET_DIR` on NTFS.
- **Zig (wazmrt)**: every gate is a `build.zig` step (`test`, `test-safe`, `test-shipped`,
  `test-security` where a SKIP is a FAILURE, `size` with EXACT ceilings auto-attached to
  `ReleaseSmall`, `capi-smoke` generated from the header, `conformance` with an EMPTY baseline);
  `-Dwat`/`-Dwasi` combos; standalone check = copy to an empty dir with PATH cut and `objdump -p`
  showing only ntdll/KERNEL32; never ship the `.pdb`.
- **C ABI (both runtimes)**: wasmtime-SHAPED, own names (`wasmrt_*` / `wazmrt_*`, deliberately
  different), checked value handles carrying store identity, caller-based host callbacks,
  `abi_version` pinned by a test, newest feature enum member LAST (C integers frozen), a test parses
  the header to keep three spellings of the feature list in step.
- **Loaders**: fixtures are `wasmtk modc` outputs copied from `-js/tests/`, never hand-edited;
  version = the manifest line only; bump → tag → CI publishes; three paired scripts
  (`bump-version` / `release` / `publish`) in py/v/zig; `.gitattributes` for `*.sh`, `*.yml`,
  `gradlew` where Linux runners execute them.
