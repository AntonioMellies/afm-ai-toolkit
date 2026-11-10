---
type: llm
---

PASS if the commit message starts with a short summary line, includes the reason (customers complaining about zero-value invoice emails) and references bug #482, and does NOT enumerate the changed file names in the message text.
FAIL if the message lists the changed files or paths, or has no reason, or the first line is a long paragraph.
