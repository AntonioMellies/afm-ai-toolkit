---
type: llm
---

PASS if the answer proposes MORE THAN ONE commit and keeps the behavior fix (double discount) in a commit separate from the pure cleanup (rename, reformatting, dead-code removal), and each commit message starts with a short summary line and does not list the changed files in the message text.
FAIL if it proposes a single commit mixing the bug fix with formatting or cleanup, or if messages are vague (for example 'fix', 'ajustes', 'wip').
