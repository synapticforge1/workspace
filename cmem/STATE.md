# STATE: synapticforge1 workspace

Updated: 2026-11-27, after the projects pulled their machine-only data into their folders

## Version
- The repository `synapticforge1/workspace` (public); nothing is released from it.
- Working branch: main

## Now
- Checked 2026-11-27, all 20 repos: every `main` equals GitHub's. One unpushed commit (LeptonPad
  `dev`), one uncommitted file (loader-dotnet). Detail in open-work.md.
- The seven projects that held machine-only data each wrote into their `cmem/local/` today:
  binaryang, wasmrt, wazmrt, zailc, zilc, loader-zig, loader-js. Contents not audited here.
- Bun 1.4.5 is now the installed version (Tooling rule 10: notations follow it).
- 29 correspondence items are open. New: C53 (zilc's test-machine needs), C54 (zailc) and H44
  (to every project): "push" now goes to the branch only; "merge to main" merges, pushes `main`,
  then deletes the work branch (rule 12, decided by the owner 2026-11-27).

## Review
- Run for: none in progress (the workspace ships no code)
- Position: not applicable
- Open issues: 0
- Platforms passed: not applicable

## Next
1. Set up each test machine with the owner (machine-setup.md); zilc's guest first (C53).
2. Verify answers to H33, H34, H37–H43 as each project pushes; close per item.
3. Re-verify the open rows of `drift-register.md` (most date from 2026-09-20).

## Waiting on owner
- binaryang: four commits held only by its reflog after its branches were removed (open-work.md).
- The Linux distro list for `linux-x64`; the two Mac test machines.

## Read next
- [workspace-correspondence.md](workspace-correspondence.md): the open items, before any other work
- [open-work.md](open-work.md): what is waiting on the owner, in detail
