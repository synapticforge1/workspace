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
- A USB drive is attached to ONE system at a time: the Mac, or one Parallels guest, not both.
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
- **Sign-ins:** GitHub (git over HTTPS) and the assistant — neither travels with the drive.
- **Linux guests:** glibc at or above the 2.28 baseline, and one Alpine guest for the musl builds
  ([platforms.md](platforms.md)).

## What stays behind on the dev machine

- The WSL distribution (zilc's and zailc's Linux work areas), the session scratch folders, the
  assistant's per-project memory folders and the session transcripts. Each project pulls what it
  needs from those into its own folder BEFORE the drive leaves (Tooling rule 15).
- Build caches and installed tools: rebuilt or reinstalled, never copied.

## After a platform run

- The result line goes in that release's entry in the project's `cmem/release.md` and its matrix in
  `cmem/platforms.md` (review-process.md § 12): version, commit, date, platform ID, suite counts.
- Record the machine by ROLE only (Intel Mac, arm64 Mac, a Parallels guest on one of them).
