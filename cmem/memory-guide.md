# memory-guide.md — the project memory guide (cmem)

🔒 **Owner, 2026-11-17: "Project memory guide (cmem)".** This file is that document, in its words.
It applies to each project's `cmem/` folder. The size check is [`../tools/check-cmem.ts`](../tools/check-cmem.ts)
(the owner's script, verbatim); each project copies it to `scripts/check-cmem.ts`. Letter **H38**.

## What this changes and why

Each project's `cmem` folder is reorganized so that an agent learns where the project stands from
one small file, and opens anything else only when its task needs it. This cuts what every session
reads at its start and gives the main agent and its sub-agents the same picture of the project.

The tracked notes in the 18 active repositories were measured on 2026-11-17:

- **Four projects are too big to read.** wasmtk, wazmrt and binaryang hold 1.7 to 1.8 MB of notes
  each, and wasmrt 1.2 MB — roughly 300,000 to 450,000 tokens per project.
- **Single files are the size of a session.** The largest are 356 to 384 KB, about 90,000 tokens
  each. Of 241 note files, 74 are over 25 KB and 38 are over 50 KB.
- **The file read every session has grown.** wasmtk's `INDEX.md` is 34 KB, about 8,500 tokens, with
  one row over 5,400 characters. The loaders' indexes are 3.5 to 6 KB.
- **Open and closed work are mixed.** Roadmaps and known-issue files of 220 to 360 KB hold finished
  items beside current ones.
- **Some lines are very long.** About 2,600 lines exceed 200 characters and about 1,060 exceed 400,
  so a search hit or a line-range read pulls in kilobytes.

## Target layout

Every project keeps the same small set of live files, and everything finished moves to an archive
that agents do not read unless asked. Existing file names are kept where a project already has them.

| File or folder | Tracked | What it holds | Who reads it |
| --- | --- | --- | --- |
| `CLAUDE.md` (repository root) | No | A pointer to `cmem/STATE.md` and `cmem/INDEX.md`, nothing else | Loaded automatically |
| `cmem/STATE.md` | Yes | Where the project stands now | Every agent, every session |
| `cmem/INDEX.md` | Yes | A router: one line per file saying when to read it | The main agent, every session |
| `cmem/working-rules.md` | Yes | The standing rules, in the present tense | The main agent, when it starts work |
| `cmem/open-work.md` | Yes | Open items only: roadmap entries and known issues not yet done | When choosing or doing work |
| `cmem/design-decisions.md` | Yes | Decisions and the reasons for them, including how a rule changed | When a task touches a decision |
| `cmem/review-process.md` | Yes | The project's slots in the review standard | During a review |
| Topic files | Yes | One subject each: architecture, testing, release, platforms and so on | Only when the task names the subject |
| `cmem/review-issues.md` | No | Open review issues, per the review standard | During a review |
| `cmem/archive/` | Yes | Closed items and superseded notes, grouped by release | Nobody, unless asked |
| `cmem/local/` | No | Machine facts and backups | Never given to a reviewer |

Working artifacts such as probe outputs and review mutants are not memory. They move out of `cmem`
into a folder of their own.

## Limits

Four limits apply to the live notes, and the size check enforces them. They are starting values,
and a project may record a different value with its reason in `working-rules.md`.

| What | Limit | Why |
| --- | --- | --- |
| `INDEX.md` | 3 KB | It is read every session, so it holds routes and no content |
| `STATE.md` | 60 lines | It is read by every agent, including each reviewer |
| Any other live note | 25 KB | About 6,000 tokens, which an agent can read whole when it needs the subject |
| Any line outside a code block | 200 characters | A search hit or a line-range read returns the fact and not a page |

Files under `cmem/archive/` and `cmem/local/` have no limits, because no agent reads them whole.

## STATE.md

`STATE.md` answers one question: where does this project stand right now? Copy this template and
keep the four headings marked required (`## Now`, `## Review`, `## Next`, `## Waiting on owner`),
because the size check looks for them.

```
# STATE: <project name>

Updated: YYYY-MM-DD, at the end of the session

## Version
- Released: X.Y.Z on YYYY-MM-DD
- Working branch: <name>

## Now
- <what is in progress, one line each, five lines at most>

## Review
- Run for: vX.Y.Z, or "none in progress"
- Position: <class>, <first review | fix | re-review N | full suite>
- Open issues: <a count per class, never the issues themselves>
- Platforms passed: <platform IDs>

## Next
1. <the next item>
2. <five items at most>

## Waiting on owner
- <a decision or answer the work is blocked on, or "nothing">

## Read next
- <topic file>: <why this session needs it>
```

Four rules keep it useful:

- **Rewrite it, never append to it.** It describes the present. What happened goes in the topic
  file or the archive.
- **Update it at the end of every session**, and whenever the review position changes.
- **No issue content.** The file is tracked and the repositories are public, so it carries counts
  only. The issues stay in `cmem/review-issues.md`.
- **No machine facts.** Paths, machine names and addresses stay in `cmem/local/`, under the privacy
  rule.

## INDEX.md

`INDEX.md` is a router and nothing else: one line per file, saying when to open it. Rules, policy,
history and status do not belong in it.

```
# INDEX: <project name>

Read STATE.md first. Open another file only when the task matches its line.

- [working-rules.md](working-rules.md): before the first commit or command of a session
- [open-work.md](open-work.md): when choosing the next item or picking one up
- [design-decisions.md](design-decisions.md): when a change touches the ABI, the CLI or a recorded decision
- [testing.md](testing.md): before running or adding tests; holds the impact map
- [release.md](release.md): only when releasing
- [review-process.md](review-process.md): only during a review
- [architecture.md](architecture.md): when working in an unfamiliar part of the code
- [archive/](archive/): do not read unless the owner asks about past work
```

Each line stays under 120 characters. If a file needs more than one line to explain when to read
it, the file covers too many subjects and should be split.

## Writing rules

Six rules keep a note cheap to find and cheap to read.

- **One subject per file, with a summary at the top.** The first lines say what the file covers and
  the date it was last verified, so an agent can stop reading there.
- **One fact per line.** Keep prose lines near 120 characters and no line over 200. Keep table rows
  short and put the detail in a list under the table.
- **Give every tracked item a stable ID.** An agent then searches for the ID and reads the ten
  lines around it. wasmtk's ledger row IDs already work this way.
- **State the rule, not its history.** Rule files give the current rule in the present tense. Dated
  corrections and the account of how a rule changed go in `design-decisions.md`.
- **Open and closed never share a file.** When an item is done, its row moves to `cmem/archive/`,
  in a file named for the release that closed it. Keep the ID, so existing references still resolve.
- **Do not restate another file.** Link to it. A project's notes link to the workspace standard and
  do not copy it.

## Session routine

The main agent reads two files at the start of a session and updates one at the end. Sub-agents
read less.

**Main agent, at the start:**

1. Read `cmem/STATE.md`.
2. Read `cmem/INDEX.md`.
3. Read the workspace correspondence rows addressed to this project, as today.
4. Open only the topic files that `STATE.md` lists under "Read next" or that the task matches in
   the index.

**Main agent, at the end:**

1. Rewrite `cmem/STATE.md`.
2. Move every item closed this session from the live files to `cmem/archive/`.
3. Record new decisions in `design-decisions.md` and new rules in `working-rules.md`.
4. Run the size check, and fix anything it reports before the session ends.

**Sub-agents:**

- A reviewer receives its class brief from the main agent, which names the files in scope, and
  reads `cmem/STATE.md`. It does not browse `cmem`.
- A re-reviewer also receives the issues and fixes, as the review standard says.
- Any other sub-agent receives the task and the exact files it needs. The main agent chooses those
  files from the index, so the sub-agent never has to.

## Migration

An existing project moves to this layout in seven steps, in this order. Steps 1 to 3 give most of
the saving and can be done in one session.

- [ ] 1. **Write `STATE.md`** from the template, using the current open-work and release notes.
- [ ] 2. **Cut `INDEX.md` down to a router.** Move its rules to `working-rules.md` and its history
  to `design-decisions.md`, and leave one line per file.
- [ ] 3. **Point `CLAUDE.md` at the two files.** It names `cmem/STATE.md` and `cmem/INDEX.md` and
  holds nothing else.
- [ ] 4. **Move closed items to `cmem/archive/`.** Take finished rows out of roadmaps, known-issue
  files and ledgers, grouped by release, keeping their IDs. Move legacy and superseded notes there
  too.
- [ ] 5. **Split the files still over 25 KB** by component or subject, give each a summary at the
  top, and add a line for each to the index.
- [ ] 6. **Wrap or split lines over 200 characters**, starting with the files read most often.
- [ ] 7. **Add the size check to `scripts/`** and run it at the end of every session.

Moving a row changes nothing in git history, and references to an archived row's ID still resolve
by search. Open review issues move to `cmem/review-issues.md` and not to the archive, as the review
standard says.

Where two projects hold the same file, such as `interop.md` in wazmrt and wasmrt, both copies can
stay so that each project remains self-contained. Name one project as the owner of the file, so
that edits are made there and copied across.

## Size check

One script with no dependencies that fails when any limit is exceeded:
[`../tools/check-cmem.ts`](../tools/check-cmem.ts). A project saves it as `scripts/check-cmem.ts`
and runs `bun scripts/check-cmem.ts` from the repository root; `--summary` prints only the counts.
Tested by the owner on 2026-11-17 with Bun 1.4.4 and Node 22 against all 18 repositories, and
against a sample folder that passes and one that fails. It has not been run under Deno.

Run against the repositories as they stand, every project lacks `STATE.md` and every `INDEX.md` is
over 3 KB. The owner's table (tracked notes, 2026-11-17) shows how much of steps 5 and 6 each
project has ahead of it:

| Project | Files over 25 KB | Lines over 200 characters |
| --- | --- | --- |
| wasmtk | 16 | 721 |
| binaryang | 19 | 582 |
| wazmrt | 11 | 362 |
| wasmrt | 9 | 278 |
| zilc | 8 | 211 |
| S3D-ReportCompiler | 5 | 143 |
| zailc | 2 | 126 |
| universalWasmLoader-js | 0 | 51 |
| universalWasmLoader-zig | 0 | 17 |
| universalWasmLoader-c | 1 | 14 |
| universalWasmLoader-dart | 0 | 13 |
| universalWasmLoader-rs | 0 | 10 |
| universalWasmLoader-jvm | 0 | 9 |
| rsxtk | 0 | 8 |
| universalWasmLoader-dotnet | 1 | 8 |
| universalWasmLoader-py | 0 | 8 |
| universalWasmLoader-v | 1 | 8 |
| universalWasmLoader-go | 0 | 3 |

The loaders and rsxtk can reach a passing check in one session. The seven larger projects need the
archive and split steps first.

## Workspace notes (not part of the owner's document)

- **Re-run by the workspace, 2026-11-17, on each WORKING TREE** (so uncommitted and unpushed notes
  count): the script ran on all 18 and agreed with the owner's table for 15. Higher here: S3D
  (10 files, 835 lines — its 40 unpushed commits), zilc (9 files, 459 lines — uncommitted work),
  wasmtk (726 lines). Each repo re-runs it on its own tree before starting.
- **The platform matrix** lives in `cmem/platforms.md`, a topic file (owner's later decision the
  same day — review-process.md § 12); the project's `review-process.md` points to it.
- **`cmem/release.md`** stays a live file ("Release History", newest first); when it nears 25 KB
  its oldest entries move to `cmem/archive/` like any closed item.
- **Open questions put to the owner, 2026-11-17** (open-work.md): the ★ best-practices copies;
  LeptonPad; the workspace's own `cmem/`.
