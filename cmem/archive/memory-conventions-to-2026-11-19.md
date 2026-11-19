# memory-conventions.md — how `cmem/` is kept

The siblings share one convention on paper and six variants in practice. This file states the
convention, with the measured anti-pattern beside each rule. Sizes were read on 2026-09-20.

🔒 **Owner decision, 2026-09-20: this is the ONE policy for every repo, and binaryang's cleanup
policy is the standard.** Each repo conforms in a docs commit under its own git rules
([open-work.md](open-work.md) lists them).

🔒 **Open book (owner, 2026-09-20):** every repo's memory is committed and complete enough that
anyone wanting to use the tools can investigate that repo on its own. The convergent method rules
are canonical in the workspace [best-practices.md](best-practices.md) AND duplicated into every
repo's `best-practices.md` under a stamp **`Copied from synapticforge1/cmem/best-practices.md on
<date>`** (🔒 owner, 2026-10-26: the stamp names the folder as it is now — it read
`wasmExamples/cmem/best-practices.md` until then; letter H27 asks the nine repos with a block to
re-stamp at their next re-copy); a change is made here and re-copied, never edited in place
downstream. The only things
that never travel are personal information, secret keys and passwords — those are a security
matter and live in the gitignored `local/`, or nowhere.

## The pull line every pointer carries

Each repo's `CLAUDE.md` pointer includes: *"At session start, read `../cmem/handoffs.md` for
letters addressed to this repo"* (`../../cmem/` for the loaders). That is how the workspace
reviewer reaches a repo without writing into it. 🔒 Added to all fifteen repos on 2026-09-20 by
owner direction ("so that it becomes standardized"): in the pointer `CLAUDE.md` where one exists,
at the top of `cmem/INDEX.md` in binaryang and wazmrt, which have none. The tracked files (wasmrt,
wazmrt, binaryang, the loaders) carry the line uncommitted until each repo's next commit.

## The two layers

1. **`CLAUDE.md` at the repo root is a POINTER**: under about 5 KB, auto-loaded, holds only what is
   needed to start correctly (what the repo is, the triggers, the three things that bite
   immediately, the current-state line). It is gitignored in repos that are cloned and worked on
   elsewhere. It never holds authoritative knowledge.
   - Good: wasmtk 4.7 KB, universalWasmLoader-py/-v/-zig (~1.5 KB).
   - Anti-pattern: wasmrt 48 KB, git-tracked, with a 300-line "keep this line current" status
     narrative — a third copy of INDEX and roadmap that drifts against both. Also the seven loader
     ports whose tracked `CLAUDE.md` bodies still describe the repo as "pre-implementation" or the
     2.x ABI, under a banner saying cmem is the source of truth.
   - Acceptable variant: no `CLAUDE.md` at all when `cmem/INDEX.md` opens with the pointer role
     (wazmrt).
2. **`cmem/` is the single home for ALL project memory**, committed, portable, one topic file per
   domain, with an `INDEX.md` that stays one line per file.
   - Good: binaryang INDEX 17 KB (policy + tables), wasmtk INDEX 13.7 KB.
   - Anti-pattern: wasmrt INDEX 141 KB and wazmrt INDEX 182 KB — 500–800 lines of dated state above
     the policy section, and "one-line pointer" table cells that are 400-character changelogs. Both
     files say "keep files small" in their own header.
   - Bootstrap cost (pointer + INDEX) should stay under about 10 KB. wasmtk measured 9.5 KB by design.

## File roles (the vocabulary the siblings converged on)

| file                 | holds                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `INDEX.md`           | policy, triggers, one line per file, reading order. No status narrative.                                 |
| `open-work.md` / `next-work.md` | the ONE list of what is outstanding; only open items; each points at its record. The status line lives here and nowhere else. |
| `working-rules.md` / `workflow.md` | the checklist: git, gate, tooling, boundaries. Rules, not lessons.                              |
| `best-practices.md`  | METHOD, not findings: one bold rule + the incident that paid for it + origin tag + citation. Post-mortems stay in their home file. |
| `design-decisions.md` / `divergences.md` | invariants and classified rows that must not be silently reverted; kept in full, forever. |
| `testing.md`         | how to run every gate, what each can see, the impact map, dated counts with their blind spots.           |
| `known-issues.md` / `compiler-bugs.md` | the live defect log: root cause, fix, regression test, "surfaces when".                   |
| `publishing.md` / `releasing.md` | the release process, what arms it, what is irreversible, provenance evidence.                 |
| `handoffs.md` / `interop.md` | correspondence with siblings; drafts here, hand over; the contract with its version.               |
| `licensing.md`       | why the triad, upstream obligations, the adoption checklist pointer.                                     |
| `project.md` / `overview.md` / `vision.md` / `architecture.md` | what it is, decided, and why.                                       |
| `local/`             | gitignored: machine facts only.                                                                          |

Small repos (the loader ports) may collapse to `INDEX.md` + `overview.md`; that is fine as long as
the INDEX does not promise "one file per domain" it does not have.

## Rules for the content

- **Working memory, not an archive; git is the archive** (binaryang, owner 2026-09-14). Completed
  work is SUMMARIZED: what landed, its commits and tags, where its substance now lives, any lesson
  found nowhere else, and a `git show <commit>:<path>` pointer to the text it replaces. **A summary
  without a commit pointer is a loss.** Kept in full: decisions and reasons, DESIGN rows, recurring
  lessons (rule + one instance), conditional risks with their trigger, baselines, corrections of
  re-derivable wrong beliefs. Dropped: narratives, superseded counts, retellings, completed runbooks.
  **Check it, do not assert it**: snapshot every hash, identifier and ratio before cutting; prove
  each still resolves afterwards; invert that check.
- **Superseded text is summarized, not kept in place.** wazmrt and wasmrt keep struck paragraphs
  and reversed decisions beside their reversal "as the record"; today that reads as live
  contradiction in at least eight places (see [drift-register.md](drift-register.md)). Keep the
  correction as one dated line with the commit; the old paragraph is one `git show` away.
- **The status narrative exists once.** Not in `CLAUDE.md`, not in INDEX, not in the roadmap and the
  overview too. Three copies drift by the end of the day they were written (wasmrt: three
  different unit-test counts and three different binary sizes on the same date).
- **Correct while summarizing.** A summary that carries a stale claim forward is worse than the full
  text, because it looks current.
- **"Update the project memory" means AUDIT for stale live claims**, not edit the files you touched:
  grep the OLD values, classify each hit as live or dated, re-read "by design" and "out of scope"
  lines when a track closes. When two files disagree, measure; do not pick the newer.
- **A backlog decays silently — sweep HEADINGS as well as bullets.** Three stale open items in two
  days, one a RED item about a shipped feature, because the extractor read only bullets.
- **Absolute dates; every number carries its measurement date.**
- **Never write a bare phase number** when two histories are in one tree ("Phase 8" means opposite
  things in wabt-ts and binaryen-ts).
- **Nothing private in a committed file**; `local/` is gitignored and absent in a clone. 🔒 The
  full rule (what counts as a secret or personal information, the pre-commit scan, rotate-don't-
  delete): [working-rules.md](working-rules.md) § Records (owner, 2026-10-22).
- **Retargeting a reference is part of removing a doc.** Code, tests, scripts and sibling memories
  cite `cmem` by path and by `§` heading; grep them all before renaming or deleting.
- **Never run a formatter on `cmem/`** (`deno fmt` rewrapped 862 lines around a 10-line edit).
- **Never gitignore `cmem/` itself.** universalWasmLoader-go and -dotnet do, while their INDEX still
  says memory "travels with the repo". Pick one policy; the portable one is the point.

## Rules for `best-practices.md`

- **A rule is a bold sentence; the incident is one clause; the origin is a tag** `[repo]` or
  `[repo-a + repo-b]` when both paid for it independently, `[repo-a → repo-b]` when imported.
  ★ marks a rule two repos derived without reading each other — "both origin stories are the
  evidence; choosing a survivor discards the strongest thing about it" (binaryang).
- **Adopted rules are cheap insurance, and are marked as adopted** (binaryen-ts). wabt-ts's
  counter-rule ("an unearned rule is noise") is answered by its own history: the borrowed `try_table`
  story sat unread until wabt-ts paid for the same off-by-one. Adopt with the tag; add the local
  incident when it arrives; drop a rule nobody has cited in a year.
- **Section numbers are stable and never reused.** wasmrt has `§3.11`, `§3.12`, `§1.7`, `§4.4` and
  `§4.5` each twice with different content, because late rules were numbered by topic and appended
  by date. Append with the next free number in the section and keep a one-line index at the top.
- **A rule that has been broken five times by its own author is a tooling problem, not an attention
  problem.** Encode it as a mechanism (a file-writing tool, a guard script, a gate), not as a
  louder paragraph.
- **Attribute honestly.** wasmtk credits wazmrt with three rules wazmrt never wrote. An attribution
  is a claim like any other.

## Triggers — the standard set

Every repo's INDEX defines "update the project memory" and "look for code issues"; the runtimes add
"coordinate" and "evaluate a reference project"; wasmtk adds the regression gate and the two tooling
hard rules; wasmrt adds "reflect a shipped stage". The workspace INDEX carries the union. A repo may
specialize a trigger (the -v/-zig loaders specialize the audit to FFI hazards) but not drop one.

## Glyph legend (none of the siblings defines one; usage inferred and unified)

| glyph | meaning                                                            |
| ----- | ------------------------------------------------------------------ |
| 🔒    | owner decision or invariant; do not silently revert. 🔒🔒 absolute |
| 🎓    | a generalizable lesson (points at best-practices)                  |
| ⚠️    | trap; ⚠️⚠️ live hazard                                              |
| 🔴    | open, serious defect or finding                                    |
| 🟡    | open, not serious                                                  |
| ✅ ⏳ ⬜ ❌ | done / pending or planned / unverified / failed                |
| 🚦    | a decision gate or handoff pointer                                 |
| 🤝    | sent to or agreed with a sibling                                   |
| 📎    | an annex of measured evidence                                      |
| 🏁    | a bake-off row: value + date + configuration, never a checkbox     |
| 🗓️    | an owner call not yet made                                         |
| 🆕 🔁 | newest entry / superseded-and-corrected                            |
