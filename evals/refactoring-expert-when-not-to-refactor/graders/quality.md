---
type: llm
---

PASS if the answer weighs refactoring against the deadline and test coverage, recommends not doing a big refactoring without tests right before a release, and suggests an incremental alternative (refactor only the part about to change, add tests first, keep behavior changes and refactoring in separate commits).
FAIL if it endorses the big refactoring right before the release without discussing tests and risk.
