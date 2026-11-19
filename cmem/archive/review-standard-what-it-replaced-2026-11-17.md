| Existing rule | Change |
| --- | --- |
| Owner commands "review", "security review", "hardening review" | "review" now runs all five required classes. "basic review", "licensing review", "privacy review" and "efficiency review" are added for a single class. |
| The seven security surfaces | Replaced by the security item list (§ 7). Malformed input and resources move to hardening, licence reading leaves the dependency item, privacy becomes the privacy review. |
| "Until a round's reviewers find nothing" | Kept. Every round after the first is a re-review scoped to the previous findings and the fix changes. |
| "Fresh reviewers given the code, never the author's conclusions" | Kept for the first review. A re-reviewer also receives the original issues, the main agent's fixes and its reasoning. |
| "3–4 reviewers per round" | Replaced by one agent per class for the first review and a new agent per class for each re-review. |
| The tiers nest; efficiency last (2026-11-13) | Replaced: five separate classes in a fixed order; efficiency optional and FIRST. |
| Release gate: two record paragraphs (security, hardening) checked by the release script | Replaced. The release tooling runs the five required reviews locally and proceeds when nothing comes back. The record paragraphs and the CI check of them are removed, and **CI only publishes**. |