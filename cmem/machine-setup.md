# machine-setup.md: setting up another machine for the platform checks

Last verified: 2026-11-27, on the Windows dev machine, before the project drive moves to the test
machines (owner: "I am taking the project drive home to start the multiple platform checks").
Machine names, paths and setting values are in `cmem/local/environment.md`, never here.

## The project drive

- The projects and this workspace sit on one external drive, formatted **exFAT**. Windows, macOS
  and Linux all read and write it.
- exFAT has **no symbolic links, no hard links and no executable-file flag**, and it is
  case-insensitive. A build that needs any of those does not run from the drive.
- Every repository's own `.git/config` already says `core.filemode=false`, `core.symlinks=false`
  and `core.ignorecase=true` (measured 2026-11-27, all 20). Those travel with the drive, so git
  does not report every file as changed on macOS or Linux.
- No repository tracks a symbolic link. One tracks an executable file (loader-jvm's Gradle
  wrapper): a plain copy off the drive loses that flag; a `git clone` from the drive keeps it.
- Known on this drive: `bun install` cannot write its lock file there (use `--frozen-lockfile`);
  git maintenance uses the `gc` strategy in each repo; Rust and Zig builds are kept off it.
- The drive's letter or mount point differs per machine. Notes and scripts use paths relative to
  the repository or to the workspace folder; a hard-coded drive letter is a defect.
- A USB drive is attached to ONE system at a time: the Mac, or one guest VM, not both.
  Eject it before unplugging — exFAT has no journal, and an unclean removal can lose recent writes.

## macOS leaves files on an exFAT drive

- Finder and other tools write `.DS_Store` and `._<name>` companion files, and the drive root gets
  `.Spotlight-V100`, `.fseventsd` and `.Trashes`. Only binaryang and S3D-ReportCompiler ignore
  `.DS_Store` today.
- Set ONE global ignore file on each Mac (`git config --global core.excludesFile <file>`) holding
  `.DS_Store` and `._*`, so no repository needs editing. `dot_clean <folder>` removes the
  companions; turning Spotlight off for the drive stops the index folders.

## Work on a copy, not on the drive

- For anything that builds (Rust, Zig, C, the JVM, .NET, package installs): `git clone` the
  repository FROM THE DRIVE onto the test machine's own disk, work there, and push back to the
  drive's copy or to GitHub. A clone carries the tracked files and every branch.
- A clone does NOT carry what git ignores: each project's `cmem/local/`, `cmem/review-issues.md`,
  local environment files, stashes, and vendored downloads. Copy those by hand when a check needs
  them, or read them from the drive.
- Branches that exist only on the drive (many are unpushed) are fetched with
  `git fetch <drive path> '+refs/heads/*:refs/remotes/drive/*'`.
- Reading notes and running pure TypeScript checks straight from the drive is fine.

## Networking the test machines

Set up 2026-11-27 (owner and workspace). Names, addresses and accounts are in `cmem/local/environment.md`.

- **The drive stays on ONE machine (the arm64 Mac); the other machines reach it over SSH.** Nobody
  needs it plugged in, since every machine works on its own clone anyway.
- **On each Mac, once:** Sharing → **Remote Login** on, limited to the owner's account, with **Allow
  full disk access for remote users** on (otherwise SSH cannot read an external drive and has no
  prompt to answer). Energy → **prevent automatic sleeping** and **wake for network access**. The
  firewall can stay on; Remote Login opens SSH by itself.
- **Keys:** each Mac has its own `ed25519` key, no passphrase, authorised on the other Mac, with a
  host alias in `~/.ssh/config`. The first install on a new machine is `ssh-copy-id <alias>`, run by
  the owner (it asks that machine's password). Undo: delete the key's line from `authorized_keys`.
- **The session on the arm64 Mac runs the other machines' setup over SSH.** Guests (UTM on the Intel Mac, Parallels on the arm64 Mac) are
  reached by hopping through their host Mac (`ProxyJump`).
- **Drive-only branches over the network:**
  `git fetch <alias>:<drive path>/<repo> '+refs/heads/*:refs/remotes/drive/*'`.
- **A Thunderbolt cable joins the two Macs** (Thunderbolt Bridge), straight Mac to Mac, never through
  a dock. Measured 2026-11-27: 832 MB/s over SSH, against under 4 MB/s on Wi-Fi. Each Mac's bridge
  has a fixed private address with NO router set (System Settings → Network → Thunderbolt Bridge →
  TCP/IP → Manually), so only Mac-to-Mac traffic uses the cable and the internet stays on Wi-Fi.
  The self-assigned 169.254 addresses are not used: they can change. Each SSH alias tries the
  cable address first (`Match … exec "nc -z …"`) and falls back to Wi-Fi, with `HostKeyAlias` so
  both routes check the same host key.
- **Screen Sharing (VNC) shows the Intel Mac's desktop on the arm64 Mac**, so the dock never moves.
  Turned on over SSH: `sudo launchctl enable system/com.apple.screensharing` and `sudo launchctl
  bootstrap system /System/Library/LaunchDaemons/com.apple.screensharing.plist` (`ssh -t`, the Intel
  Mac's password), THEN add the account to its access list — enabled this way the list exists and is
  EMPTY, so every login is refused: `sudo dseditgroup -o edit -a <account> -t user
  com.apple.access_screensharing`. Connect with Finder → Connect to Server → `vnc://<cable address>`. Standard mode only:
  High Performance needs Apple silicon at both ends. Without a monitor attached, a headless Mac may
  offer a low resolution; an HDMI dummy plug fixes that.
- **Never run git over the SMB share of the exFAT drive** (locking and permissions); SMB is for
  reading notes only.
- **A non-interactive SSH shell does not read the login profile.** Tools installed by Homebrew or
  per-user installers are not on its `PATH`: add their folders in the command, or set `PATH` in
  `~/.zshenv`.
- Verified 2026-11-27: SSH both ways; the Intel Mac read `workspace/cmem/STATE.md` on the drive
  over SSH.

## What each test machine needs set once

- **git identity:** `user.name` and `user.email` — most repositories rely on the machine-wide
  value; the commit address must be the maintainer address the privacy rule allows.
- **Line endings:** `core.autocrlf=input` and `core.eol=lf` machine-wide (Windows guests above
  all; macOS and Linux default to LF already). Every project but this workspace also carries a
  `.gitattributes`.
- **`safe.directory`** for the drive's folders where the system mounts the drive as another user
  (Linux guests; Windows already has it).
- **Build output off the drive:** point Cargo's `target-dir` and Zig's cache at the machine's own
  disk if a build is ever started from the drive.
- **Toolchains**, at the versions the dev machine uses: Bun (the latest installed — Tooling rule
  10), Node LTS lines, Deno, Rust (nightly, with the wasm targets), Zig (0.17.1; zilc pins
  0.15.2), Go, the JDK, Kotlin, .NET, Dart, V, pixi, and the oracles (wabt, wasm-tools, wasmtime).
  The dev machine's exact list is in `cmem/local/environment.md`.
- **On an Intel Mac, no Homebrew** (its installer refused, 2026-11-27). Every toolchain installs
  user-level from its own release archive into `~/tools` (links in `~/tools/bin`, `PATH` and
  `JAVA_HOME` in `~/.zshenv`); no admin password is needed. Measured gaps for Intel Macs
  (2026-11-28): **Temurin 27 ships no Intel Mac build**, so the JDK there is Azul Zulu at the same
  version (a JVM result names the vendor); **wabt ships no Intel Mac build**, so it is built from
  its release tag with CMake's own archive. The script used is in `cmem/local/environment.md`.
- **Sign-ins:** GitHub (git over HTTPS) and the assistant — neither travels with the drive.
- **Linux guests:** glibc at or above the 2.28 baseline, and one Alpine guest for the musl builds
  ([platforms.md](platforms.md)).

## What a project needs beyond the common setup

One entry per project that told the workspace, with the letter that holds the detail.

- **zilc** (letter C53, verified against its `origin/main` on 2026-11-27): an **x86_64 Linux guest
  on the Intel Mac** — its checks run Fil-C's x86_64 `minilute` and every zilc tool refuses to
  start outside Linux; `linux-x64` is its only platform. Not macOS, and not an arm64 Linux guest.
  - Check first: `uname -m` prints `x86_64`.
  - Setup, once: install Bun, clone zilc onto the guest's own disk, run `bun tools/p1/setup-wsl.ts`
    (the name says WSL; it runs on any Linux). It installs Zig 0.15.2, the Fil-C 0.687 release and
    patchelf, each checked against a recorded sha256. Bun per zilc's `tools/README.md` step 1 (the
    npm `.tgz`, so no `unzip` and no root).
  - **Then fetch Fil-C's source package by hand** (measured 2026-11-28 on the UTM guest): `.filc`
    in `build.zig.zon` is LAZY and `check-stages.ts` reads Zig's cache without building, so on a
    fresh machine it fails at once with `ENOENT … ~/.cache/zig/p/<hash>/filc/tests`. Run zilc's
    Zig 0.15.2 `zig fetch <the .filc url>` and check that the hash it prints equals
    `build.zig.zon`'s; leave that cache where it is.
  - Needs network access to GitHub and several GB of downloads.
  - Done when `bun tools/sarcasm/check-stages.ts` prints `OK: every stage equal to upstream's`.
  - zilc is pushing its local-only branches to GitHub (owner, 2026-11-27), so the guest fetches
    them from there. Its unfinished checkpoint reaches the guest only once it is committed to
    the work branch — uncommitted files are not pushed. (2026-11-28: GitHub has
    `wip/cp10-partial`.)
  - Status 2026-11-28: guest up (Ubuntu 26.04.1 x86_64, glibc 2.43), setup tool exit 0, the
    `zig fetch` running; the stage check not yet passed.

## What stays behind on the dev machine

- The WSL distribution (zilc's and zailc's Linux work areas), the session scratch folders, the
  assistant's per-project memory folders and the session transcripts. Each project pulls what it
  needs from those into its own folder BEFORE the drive leaves (Tooling rule 15).
- Build caches and installed tools: rebuilt or reinstalled, never copied.

## After a platform run

- The result line goes in that release's entry in the project's `cmem/release.md` and its matrix in
  `cmem/platforms.md` (review-process.md § 12): version, commit, date, platform ID, suite counts.
- Record the machine by ROLE only (Intel Mac, arm64 Mac, a UTM guest on the Intel Mac, a Parallels guest on the arm64 Mac).
