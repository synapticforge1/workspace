# C29: answers moved out of the live file on 2026-11-19

- **Update, same day: TAGGED and PUSHED as 2.0.0** (owner: "yes change the instance pool. yes release 2.0.0").
  `93cc2f3` also makes `InstancePool`'s default `size` 4 (SPEC § 6.2; it was 2), so -py has no remaining SPEC
  divergence; 92 tests. `bump major` → `13f125a`, then `release` tagged and pushed it. `compat.py --release`
  on that tag REFUSED: its Rule 4 looked for `| _next release_ |` after the bump had stamped the row `| v2.0.0
  |`. Fixed in `238afa0`, and on the owner's word ("Move tag to the fix") **`v2.0.0` was moved to `21e680a`**
  with `--force-with-lease`, before anything had used it. Read back with `ls-remote`: `main` = `v2.0.0^{}` =
  `21e680a`; `compat --release` exit 0; `twine check` passed. **NOT yet on PyPI** (latest 1.1.1): the
  `Publish` workflow is run by hand from the Actions tab (no `gh` on this machine). **Check:** `git ls-remote
  https://github.com/synapticforge1/universalWasmLoader-py refs/tags/v2.0.0*`
- **Update, same day: PUBLISHED as 2.0.0** by the owner's run 42517168769, green in every step (read through
  the public Actions API). PyPI read back: latest **2.0.0**, releases 1.1.1 + 2.0.0, wheel + sdist uploaded
  19:52:37–38 UTC. **Check:** `curl -s https://pypi.org/pypi/universal-wasm-loader/json` → `info.version` =
  2.0.0
- **loader-rs (2026-11-08): done; local `main` `ce38d08` only, NOT bumped, pushed or released** (`origin/main`
  = `7f0f69e`). Commit **`3ade569`** (behaviour + tests + README + memory; there is no committed surface file
  here, `cargo semver-checks` is the surface gate), merge `ce38d08`. (1) the `.wit` is read BEFORE the
  `.wasm`; raw only on `NotFound`, HTTP 404 / 410, or a path not ending in `.wasm` (case-insensitive). 0.2.0
  swallowed every `.wit` failure with `.ok()`, fetched the `.wasm` first, kept a URL's `?query` on the `.wit`,
  and `set_extension("wit")` made `math.bin` read `math.wit`. Anything else → `cannot read .wit '<path>'` /
  `HTTP <status> for <url>` / not UTF-8 / timed out / cancelled, naming the `.wit`, with no `.wasm` request.
  (2) a strict parser ported from `wit-parser.js` 2.0.0, same grammar and messages → `invalid .wit '<path or
  url>': …`; `wit_parser::parse_wit` now returns `Result<ParsedWit>` (0.2.0's regex never failed: `u32` →
  `s32`, garbage → a typed module with no exports). A WIT export the module lacks fails the load. (3) all
  missing callbacks named at load, before the `.wasm` is read (0.2.0 returned 0 / false / ""); a
  `string`-result import refused at load; a callback's result kind checked EXACTLY (an `F32` for `-> f64` is
  refused; 0.2.0 coerced), naming callback / import / result type / value and reaching the export's caller; a
  void import ignores the value; a callback's own `Err` reaches the caller unchanged. The Promise row is n/a
  by type: a `HostCallback` returns `Result<WasmVal>` and no future implements `IntoWasmVal`. (4) count and
  exact kind checked, no coercion: `s32` = `i32` (an `i64` in range is refused), `f64` = `f64` (an `f32` or an
  integer is refused), `bool` = `bool`. 0.2.0's `zip` silently DROPPED extra arguments and a bool param took
  `unwrap_or(false)`. The generic result accessor `call::<_, R>` already refused a wrong kind; it now names
  the export. (5) `wasm_import_with_options(src, cbs, LoadOptions)`: 30 s default per fetch, request to last
  byte; `.no_timeout()`; zero refused; `CancelToken` (the crate's own, on `tokio::sync::Notify`, so no new
  dependency); already-cancelled → no request; one request per file. `wasm_import` keeps its signature (=
  default options); `wasm_load` / `create_singleton` / `InstancePool` are file-only (n/a, as -c / -dotnet /
  -go). **The check, § 8 Refusals:** every row is a test (`tests/refusals.rs`, 28; http rows on a local tokio
  server counting requests per target). Rust stand-ins: `undefined` / `null` → `WasmVal::Void`; `2 ** 31` /
  `17n` → `I64`. Tests 35 → 66, all green. Inverted: on v0.2.0's `src/` the suite gives **20 red / 4 green**
  (the 4 are what 0.2.0 already did right; the 4 options tests cannot compile there, and a stalled `.wit`
  server MEASURED 0.2.0 still waiting after 5 s); mutants on the new code turn exactly their own tests red.
  Gate: build / test / `semver-checks` green on the committed tree. `bump.ts`: floor **major**, set by `SPEC
  3.0.0 -> 4.0.0` (cargo-semver-checks alone floored it at patch: it has no lint for a changed return type);
  v0.2.0's tests 30/30 on the new src; fixtures unchanged. **Version decision: MAJOR, 1.0.0.** This repo's
  gate refuses a pre-1.0 minor for a break, so 0.3.0 would need the owner to change that rule. README `_next
  release_` row present; bump, push and release are the owner's. **Check:** `git -C
  universalWasmLoader/universalWasmLoader-rs show 3ade569 --stat`, then `cargo test --locked` there (66
  passed)
- **Update, same day: PUSHED and RELEASED as 1.0.0** (owner: "yes release 1.0.0. yes merge and push").
  `bump.ts major` through the full gate, release commit `9240b11` = tag `v1.0.0` (`ls-remote`); `origin/main`
  = `df42883` (+ the memory record). Publish run **42549004225** green in all three jobs (the C30 split's
  first run). crates.io read back: `max_version` **1.0.0**, created 2026-11-09T02:16:03Z UTC; GitHub Release
  `v1.0.0`. As a user: a fresh crate depending on `universal-wasm-loader = "1.0"` from crates.io prints
  `SPEC_VERSION 4.0.0` and `add(3, 4) = 7`, and refuses `add("x", 1)` and `imports_50` without callbacks, each
  with its message. **Check:** `curl -s -A <ua> https://crates.io/api/v1/crates/universal-wasm-loader` →
  `max_version` 1.0.0
- **loader-zig (2026-11-08): done; local `main` `e0b884b` only, NOT bumped, pushed or released**
  (`origin/main` = `34050e1`). Commits **`3db7d4a`** (behaviour + tests), **`8eae638`** (surface re-baseline
  alone: `spec 3.0.0 -> 4.0.0`, added `Module.importWith`, `lastError`, `HostCallback` + 3 fields; nothing
  removed or changed; 112 → 118 symbols), `e0b884b` (memory); on top of the Zig 0.17.1 port `f417f71` /
  `cbd5d8f` (row C37). Items 1–4 come from the vendored C header, now loader-c **v2.0.0**'s byte for byte
  (`git show v2.0.0:universal_wasm_loader.h`, sha256 `5ffa482d…`, was v1.1.1's `f3af6143…`); (5) n/a: local
  files only, no http path (as -c). The binding's own part: (4) each argument's WIT kind is its Zig TYPE —
  `i32` s32, `i64` s64, `f32`, `f64`, `bool`, `[]const u8` string; an integer literal s32 if it fits else s64,
  a float literal f64; any other type a compile error — because the C API cannot report an export's parameter
  kinds; it used to send every integer as s64 and every float as f64 for the loader to narrow (coercion).
  `call(T)` refuses a result of another kind (`error.WrongResultType`; it read the wrong union member, S8).
  (3) `Module.importWith(path, callbacks)`; `import(path)` passes none, so `imports_50` is refused naming
  both. `uwl.lastError()` keeps the loader's message (it was freed unread). Also fixed: every `uwl_str`
  argument copy leaked. **The check, § 8 Refusals:** every non-http row is a test (async n/a: no async in the
  C API; http n/a); tests 11 → 21, all green (`zig build test`, Zig 0.17.1), each asserting what `lastError()`
  names. Inverted: the SPEC 3.0.0 header under the new suite → `13 passed; 0 skipped; 8 failed.` (exactly the
  eight loader-level refusals); result check deleted → only the S8 test red; `i64` sent as s32 → only the
  typed-argument test red; `lastError` never set → the nine tests reading it red. **Version decision: MAJOR,
  2.0.0** (gate floor major; `bump patch` refused, `bump major --dry-run` allowed); bump, push and release are
  the owner's. Port readings for -js in handoffs.md § "Notes from universalWasmLoader-zig, 2026-11-08".
  **Check:** `git -C universalWasmLoader/universalWasmLoader-zig show 3db7d4a --stat`, then `zig build test`
  there (`ZIG_LOCAL_CACHE_DIR` on NTFS) → `All 21 tests passed.`
