# handoffs.md: how letters between the workspace and the projects work

Last verified: 2026-11-19. The letters themselves are one file each in [letters/](letters/), listed in
[workspace-correspondence.md](workspace-correspondence.md).

- **A pull, never a push.** Nothing is written into a repo from the workspace, unless the owner
  directs that specific write. A repo's session reads the open items addressed to it and acts
  under its own rules.
- **A letter says what to CHECK, not only what to conclude:** the measurement, the file and line,
  the command that reproduces it, so the recipient re-derives it on its own tree.
- **The recipient answers in the item's file** (one bullet, with its commit and its check).
  The creator verifies on the recipient's `origin/main` and closes.
- **Verify without fetching:** compare a repo's local `origin/main` with `git ls-remote origin`;
  read registries through their public APIs; never `gh` (working-rules.md, Tooling rule 9).
- **History:** every letter, sweep narrative and refresh note written before 2026-11-19 is in
  [archive/handoffs-to-2026-11-19.md](archive/handoffs-to-2026-11-19.md), verbatim. Search it by letter ID.
