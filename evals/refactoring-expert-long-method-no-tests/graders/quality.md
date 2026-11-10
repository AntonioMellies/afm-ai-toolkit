---
type: llm
---

PASS if the answer says to establish a safety net of tests (characterization tests) before refactoring, proposes small incremental steps (for example extract function) running the tests after each step, and advises against rewriting everything in one go.
FAIL if it rewrites or recommends rewriting the whole method at once without tests or without small verified steps.
