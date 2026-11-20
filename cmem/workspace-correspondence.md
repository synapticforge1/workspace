# workspace-correspondence.md: every OPEN item between the projects, one line each

Last verified: 2026-11-19. Every project reads this file before starting new work, then opens only the
items addressed to it. One file per item, in [letters/](letters/). Closed items:
[archive/correspondence-closed.md](archive/correspondence-closed.md).

## Rules

- Any project may add an item: write `letters/<ID>.md` and add its line below, in the same session.
- IDs: workspace letters take the next `H` number, everything else the next `C` number.
  Re-read this file and the closed list immediately before choosing one.
- The recipient ANSWERS by appending one bullet under `## Answers` in the item's file:
  `- **<repo>, <date>:** <what was done, the commit, the check>`. It does not change the status.
- Only the item's CREATOR verifies and closes it: it sets `Status: closed <date>, <why>` in the file,
  moves the file to `archive/letters/` and its line to `archive/correspondence-closed.md`.
- A line here stays under 200 characters; an item file stays under 25 KB — when one grows past
  that, its oldest answers move to `archive/letters/<ID>-answers.md`.
- Everything before 2026-11-19 is in the archive, verbatim:
  [archive/workspace-correspondence-to-2026-11-19.md](archive/workspace-correspondence-to-2026-11-19.md)
  and [archive/handoffs-to-2026-11-19.md](archive/handoffs-to-2026-11-19.md). Search them by item ID.

## Open items

- **H6** · 2026-09-20 · workspace → every repo (left: wasmtk H6.5b) · SemVer and the compatibility gate; the ★ block; memory layout · [letters/H6.md](letters/H6.md)
- **H10** · 2026-09-20 · workspace → wasmrt, wazmrt, wasmtk · Generated copies of the shared definitions D1 / D2 / D3, with a diff check · [letters/H10.md](letters/H10.md)
- **H12** · 2026-09-20 · workspace → wasmtk, binaryang · wasic moves to binaryang's ./ts2wasm; modularization · [letters/H12.md](letters/H12.md)
- **H19** · 2026-10-22 · workspace → every repo except loader-dotnet · Purge personal information from git history · [letters/H19.md](letters/H19.md)
- **C5** · 2026-10-26 · wasmrt → workspace · wasmrt's notes to verify and fold in · [letters/C5.md](letters/C5.md)
- **C15** · 2026-10-26 · loader-dart → workspace · loader-dart's notes to verify and close · [letters/C15.md](letters/C15.md)
- **C18** · 2026-10-26 · loader-jvm → workspace · loader-jvm's notes to verify and close · [letters/C18.md](letters/C18.md)
- **C29** · 2026-11-07 · loader-js (SPEC owner) → the nine other loaders · Re-align to SPEC 4.0.0 · [letters/C29.md](letters/C29.md)
- **C30** · 2026-11-07 · S3D-ReportCompiler → every repo with a release workflow · Three release-workflow findings from S3D's third review · [letters/C30.md](letters/C30.md)
- **C34** · 2026-11-08 · S3D-ReportCompiler → every JSR / npm publisher · Release-path findings from S3D's fifth review · [letters/C34.md](letters/C34.md)
- **C36** · 2026-11-08 · loader-jvm → workspace, loader-js · loader-jvm's notes: C29 done, 0.4.0 · [letters/C36.md](letters/C36.md)
- **C37** · 2026-11-08 · loader-zig → workspace, loader-js · loader-zig's notes: Zig 0.17.1 measured, C29 · [letters/C37.md](letters/C37.md)
- **H33** · 2026-11-10 · workspace → every repo that releases · The uniform release process (U1–U12) · [letters/H33.md](letters/H33.md)
- **H34** · 2026-11-10 · workspace → every project · The owner's words: commit, push, release · [letters/H34.md](letters/H34.md)
- **C46** · 2026-11-12 · S3D-ReportCompiler → workspace · S3D's review process for every project · [letters/C46.md](letters/C46.md)
- **C47** · 2026-11-13 · loader-js (SPEC owner) → loader-dotnet, -go, -zig, -v · loader-js's answers to the ports' readings of SPEC 4.0.0 · [letters/C47.md](letters/C47.md)
- **H37** · 2026-11-17 · workspace → every project · The final review standard · [letters/H37.md](letters/H37.md)
- **H38** · 2026-11-17 · workspace → the 18 active repositories and LeptonPad · The project memory guide · [letters/H38.md](letters/H38.md)
- **H39** · 2026-11-19 · workspace → binaryang, wasmtk, S3D, LeptonPad, loader-js · The TypeScript projects test per engine; host.ts · [letters/H39.md](letters/H39.md)
- **H40** · 2026-11-19 · workspace → the nine other loaders · Three testing tiers for the loaders · [letters/H40.md](letters/H40.md)
- **H41** · 2026-11-19 · workspace → every project · Correspondence is now one file per item · [letters/H41.md](letters/H41.md)
- **H42** · 2026-11-19 · workspace → every project · The workspace memory moved into the `workspace` repo · [letters/H42.md](letters/H42.md)
- **H43** · 2026-11-19 · workspace → every project · Scratch space is bounded and cleaned by its session · [letters/H43.md](letters/H43.md)
