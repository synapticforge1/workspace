# platforms.md — platform facts common to every project

🔒 **Owner, 2026-11-17** (review standard, [review-process.md](review-process.md) § 12; letter H37).
This file holds only what is true for EVERY project. Each repo's own support matrix and platform
notes are in ITS `cmem/platforms.md`; machine names and paths are in `cmem/local/`, never here.

## The six platform IDs

`win-x64`, `win-arm64`, `mac-x64`, `mac-arm64`, `linux-x64`, `linux-arm64`.

🔒 **64-bit only** (owner, 2026-11-17: "we are on 64 bit only"). The six IDs are the whole list of
HOST platforms: no 32-bit x86 (i386 / i686) and no 32-bit ARM (armv7 / armhf) build is made,
tested or claimed, and none needs a `none` row. This is about the machine a tool RUNS on — the
WebAssembly the tools read and write (`wasm32`, `wasm64`) is their subject matter, not a host
platform, and is unaffected.

One spelling per architecture: **x64** = x86_64 = amd64; **arm64** = aarch64. Each project records
its own toolchain's target name beside the ID (e.g. `aarch64-unknown-linux-gnu` for Rust,
`linux/arm64` for Go).

## Status values (a project's matrix)

| status | meaning |
| --- | --- |
| `shipped` | a build is published and tested natively |
| `tested` | tested here, no platform-specific build published |
| `emulated` | the x86_64 build is tested under the OS's emulation |
| `runtime` | (TypeScript projects) covered by the runtime: no platform-specific code outside `host`, and `host` passed for this OS |
| `pending` | supported, not yet verified for the current release (no machine yet, or its add-platform run has not happened) |
| `none` | not supported, with a one-line reason |

## Test-machine roles (roles only — never a machine name)

| role | covers natively |
| --- | --- |
| dev machine | `win-x64`; `linux-x64` through WSL — **Ubuntu only** (owner, 2026-11-17) |
| Intel Mac + Parallels 26 guests | `mac-x64`, `win-x64`, `linux-x64` — **a series of Linux distros** (owner, 2026-11-17) |
| arm64 Mac + Parallels 27 guests | `mac-arm64`, `win-arm64`, `linux-arm64` |

The two Macs are the owner's to set up (open-work.md). Until a role exists, the platforms only it
covers are `pending`.

**`linux-x64` is one platform ID with a DISTRO axis.** WSL proves Ubuntu only; the other distros
are trialled as Parallels guests on the Intel Mac. A project lists the distros it was tested on in
the SECOND table of its `cmem/platforms.md` (review-process.md § 12: further axes), one row per
distro — distro and version, libc (glibc version, or musl), status, tested on (role). A result
line for `linux-x64` names the distro it ran on. Why distros differ enough to test: the libc
(glibc versions; musl on Alpine), the default toolchain and package versions, the filesystem and
its defaults, and what is installed out of the box.

🔒 **The Linux baseline: every distro version in STANDARD vendor support today, 64-bit** (owner,
2026-11-17: "The idea is to cover all of the version still in support to date"; "distros that are
… currently within the standard support zone from today"; "alpine is on the list and musl will be
used for it"). Paid extended support (ELS, ESM, LTSS) does not count.

- **glibc baseline: 2.28.** (The owner first said 2.34 "for maximum compatibilty"; the goal above
  needs lower.) The oldest glibc still in standard support on 2026-11-17 is **RHEL 8 and its
  rebuilds (Rocky, Alma, Oracle 8): glibc 2.28, maintenance support to 2029-05-31** — read
  2026-11-17 from secondary sources (Red Hat's errata show the `glibc-2.28` line; the date from
  lifecycle trackers), so re-derive from the vendor's page before quoting. Below it, nothing is in
  standard support: Amazon Linux 2 (2.26) ended 2026-06-30; Ubuntu 20.04 (2.31) left standard
  support 2025-04; Debian 11 (2.31) ended LTS 2026-08-31. **The baseline moves UP when the oldest
  supported distro retires** — re-derived at each release, never lowered silently.
- **Every Linux build that links glibc targets 2.28:** it starts on any distro with glibc 2.28 or
  newer and uses no newer symbol. How a project holds it is its toolchain's (recorded in its
  `cmem/platforms.md`, the setting tagged in code): Zig `-target x86_64-linux-gnu.2.28` /
  `aarch64-linux-gnu.2.28`; Rust and C against a 2.28 sysroot (or Zig as the linker). A pure-source
  artifact (a JS / TS package, a Go module without cgo) is unaffected and says so.
- **Alpine: a musl build.** Alpine uses musl, not glibc, so a project that ships Linux binaries
  ships a second, musl build (`…-linux-musl`, statically linked where the toolchain allows) for
  it; it is its own row in the distro table. Alpine branches in support today, from trackers:
  3.23 (to 2027-11-01) and 3.24 (to 2028-06-01), musl 1.2.5 — confirm 3.22's status on
  alpinelinux.org/releases.
- **A gate, not a hope:** the built glibc binary's highest required `GLIBC_` symbol version is
  read (`objdump -T` / `readelf --version-info`) and the gate fails above 2.28; the musl binary
  is checked to need no glibc at all.
- **The distro table's floor:** at least one trialled distro IS at glibc 2.28 (a RHEL 8 rebuild),
  so the baseline is run, not inferred; plus one Alpine row for the musl build. The rest of the
  list is the owner's to pick.

## For now: every release says what it was tested on (owner, 2026-11-19)

🔒 **Owner, 2026-11-19:** "provide a 'tested on ?? OS and ?? platform' for now until a release is made for all
others. I do not want to hinder development by waiting on the other testing. At least for now."

- **A release is never held for a platform that has no test run yet.** It goes out when the reviews
  are clean and the full suite passes on the platform(s) it WAS run on.
- **Every release states it:** a line `Tested on: <OS and version> (<platform ID>)` — one per
  platform actually run, naming the distro for Linux — on the GitHub Release page, in the
  release's `cmem/release.md` entry, and in the README's platform section. Nothing is claimed for
  a platform that was not run: in the matrix it is `pending`, and the page says "other platforms:
  not yet tested".
- **The other platforms are added later** by the add-platform step below, when their machines
  exist; no date is set. This is the interim rule ("at least for now") — the owner revisits it
  when the test machines are in place.

## The TypeScript projects: test per engine, not per platform (owner, 2026-11-19)

🔒 **Owner, 2026-11-19:** "Let's make the changes for the typescript projects I noted, that way we
do not over test something" — **binaryang, wasmtk, S3D-ReportCompiler, LeptonPad, and
universalWasmLoader-js** (owner, same day: "yes for host.ts, and yes for loader-js"). Native projects
are per-platform by nature and stay on the full matrix.

- **What they compute is tested per ENGINE, on one machine.** The runtimes hide the OS and the CPU
  for pure TypeScript, and a `.wasm` module is the same bytes everywhere. So the suites run once
  per engine the project supports — V8 (Node, Deno), JavaScriptCore (Bun); for LeptonPad the
  browser engines — not once per platform. No separate arm64 run.
- **One module, the file `host.ts`, in each project** (name confirmed by the owner) (owner: "one module named the same per project …
  That way all of the OS/platform specifics lives in one place"). Every call that touches the
  system goes through it: opening and writing files (never over an input, never half-written),
  temp files, paths, environment, starting other programs. A scripted gate fails when any file
  outside `host` imports the runtime's file, path or process APIs.
- **An on-demand self-check is part of `host`** (owner): a command (`--self-check`) that tries
  `host`'s operations on the machine it runs on and reports what fails. It runs only when asked —
  never on its own, and it cleans up what it writes.
- **OS-specific testing concerns `host` alone.** Its tests run on an OS when that OS's machine is
  at hand, and need running again only when `host` or the pinned runtime changes; a release that
  changed neither carries the last result forward. Nothing waits for it (the "Tested on" rule
  above): an OS not yet run is `pending`, and there the tool is checked when it is met — by the
  self-check.
- **Matrix status `runtime`** (a sixth value, for these projects): no platform-specific code
  outside `host`, so the platform is covered by the runtime and by `host`'s result for its OS —
  what the arm64 rows say.
- **Per project:** **binaryang** — the library per engine; its CLI's file and path handling is
  `host`. **wasmtk** — mostly CLI: files and the compilers it starts are `host` (its existing I/O
  layer is the start of it). **S3D-ReportCompiler** — `host` for reading the input and writing the
  output (the zip is read in memory by its own code: not OS-dependent); while a report can still
  go to Chrome, that route stays OS-dependent (the browser, the system's fonts) and is tested on
  each OS it is claimed for; once the native renderer with its bundled fonts draws everything, the
  same report gives the same PDF everywhere, checked by comparing the reference reports' digests
  across OSes. **LeptonPad** — the app per browser engine; its server side runs on Linux only. **universalWasmLoader-js** — the loader's logic per engine
  (the engine's own WebAssembly runs the module); reading a `.wasm` / `.wit` from disk or over the
  network is `host.ts`.

## Three testing tiers — which one a project is in (owner, 2026-11-19)

🔒 **Owner, 2026-11-19: "I agree. This limits the added testing for each to what is required."**
What decides a project's tier is the ENGINE under it, not whether it ships as source. Read from
each loader's manifest on 2026-11-19.

- **1 — per engine**
  - projects: binaryang, wasmtk, S3D-ReportCompiler, LeptonPad, loader-js; **loader-dart** (web-first; only
    `web` — the browser's engine), **loader-jvm** (Chicory, pure Java, no native code), **loader-go** (wazero,
    pure Go, no cgo)
  - why: pure code on a managed runtime; the runtime hides the OS
  - what is tested: the suite once per engine on one machine; every OS call in one host module; OS testing of
    that module only (section above)
- **2 — one platform + a smoke check**
  - projects: **loader-py** (`wasmtime` wheels), **loader-dotnet** (`Wasmtime` NuGet, native per runtime ID),
    **loader-rs** (`wasmtime` crate)
  - why: the loader's own code has nothing OS-specific, but its engine is a NATIVE library per platform
  - what is tested: the full suite on one platform; on each other platform an install-and-run SMOKE check —
    install the package as a user does, load one module, call one export
- **3 — the full matrix**
  - projects: wasmrt, wazmrt, rsxtk, zilc, zailc; **loader-c, loader-v, loader-zig** (link wasmtime's C
    library, built per platform)
  - why: native by nature
  - what is tested: the full suite on every platform in the matrix, with the distro table and the glibc / musl
    builds

- **The host module is named in each language's own way**, one per project: `host.ts`,
  `host.dart`, `Host.kt`, `host.go` — same role, same gate (no other file calls the language's
  file, path, network or process APIs), same on-demand self-check.
- **loader-go, one caveat:** wazero generates machine code differently for x64 and arm64, so ONE
  run per processor type is worth having when an arm64 machine is at hand — not one per OS.
- **Tier 2's smoke check** answers the one thing that can differ per platform there: is the
  engine's native library available for it, and does it load. A platform where it is not
  available is `none` in the matrix, with that as its reason.
- **Nothing waits** on a tier's later platforms (the "Tested on" rule above): what was not run is
  `pending`.

## What can be added to a release afterwards

A published version is never changed; a platform is ADDED to it by an add-platform run at the
released tag (review-process.md § 12).

| destination | a later platform's build can be added to the same version? |
| --- | --- |
| GitHub Release page | yes — further assets and an appended result line |
| PyPI | yes — a further platform file (wheel) for the same version |
| npm, JSR, crates.io, NuGet, Maven Central, pub.dev | no — the version is frozen; only the result line is added (page and `cmem/release.md`) |
| Go proxy, VPM, `zig fetch`, vcpkg registry (the tag is the release) | nothing to add — source only; the result line is added |

A failure in an add-platform run is a finding: fixed, re-reviewed, and released as a new patch.

## Each project's platforms file, and adding platforms after a release

(Moved here from review-process.md § 12 on 2026-11-19, unchanged.)

**`cmem/platforms.md` — what it holds, and what it does not** (owner, 2026-11-17):

- **The support matrix** (above), then **a section per platform ID, only where there is something
  to say**: each note names the quirk, the setting that handles it, WHERE that setting lives in the
  code (file and name), and why it is needed.
- **The settings themselves stay in the code and build files, never in `cmem/`.** Every
  platform-specific setting in code carries a comment with its platform ID (`win-arm64`, …), so a
  search for the ID finds every setting for that platform, and a scripted gate can check that the
  notes and the code agree.
- **Open platform issues** go in the gitignored `cmem/review-issues.md` (§ 10), tagged with the
  platform ID; what a FIXED issue taught moves into that platform's section here.
- **Machine names and paths** stay in `cmem/local/`. **Facts true for every project** (a Parallels
  quirk, how Windows on arm64 emulates x64) are in the workspace's [platforms.md](platforms.md), not
  repeated per repo.
- A platform's section becomes a file of its own (`cmem/platform-<id>.md`) only when it outgrows
  about a hundred lines.

**For now (owner, 2026-11-19):** "provide a 'tested on ?? OS and ?? platform' for now until a release is made
for all others. I do not want to hinder development by waiting on the other testing. At least for now." So no
release waits on a platform without a test run; each
release carries a `Tested on: <OS and version> (<platform ID>)` line per platform actually run
(page, `cmem/release.md` entry, README), and claims nothing for the others — workspace
[platforms.md](platforms.md).

**The TypeScript projects (owner, 2026-11-19)** — binaryang, wasmtk, S3D-ReportCompiler, LeptonPad
— test what they compute per ENGINE, not per platform; every OS call lives in one module named
`host`, with an on-demand self-check; OS-specific testing concerns `host` alone. § 9 step 5's
"every supported platform" means, for them, every supported engine plus `host` on the OSes at
hand — workspace [platforms.md](platforms.md).

**Three testing tiers (owner, 2026-11-19)** — tier 1 per engine (the TypeScript projects and
loader-dart, -jvm, -go), tier 2 the full suite on one platform plus an install-and-run smoke check
on the others (loader-py, -dotnet, -rs), tier 3 the full matrix (the native projects and loader-c,
-v, -zig) — workspace [platforms.md](platforms.md).

**Release now, add platforms later** (owner, 2026-11-17: "Can we release a specific version for a
platform and then add to it on the release page?" — agreed):

- **A release goes out once the reviews are clean and the full suite passes on every platform that
  has a machine TODAY.** The release page, the release's `cmem/release.md` entry and the matrix list
  those platforms as verified and the rest as `pending`. § 9 step 5's "every supported platform"
  means every supported platform that can be run today.
- **Add-platform step** (when a machine becomes available): run the full suite on that platform AT
  THE RELEASED TAG; append its result line to the release's entry and to the release page; attach
  that platform's build to the page if the project ships one per platform (a registry that freezes
  a version — npm, crates.io, NuGet, Maven Central, pub.dev — gets nothing new; PyPI accepts a
  further platform file). This is the ONE case in which an existing Release page is written to
  (release-process.md U7's "an existing page is done" otherwise stands): it appends, never
  rewrites, and never moves the tag.
- **A failure there is a finding** (§ 9): it is fixed and re-reviewed, and reaches users as a new
  PATCH release — a published version is never changed.

## Notes common to every project

(Add a note here only when it is true for every project and was MEASURED — with its date and the
repo that measured it. Nothing yet.)
