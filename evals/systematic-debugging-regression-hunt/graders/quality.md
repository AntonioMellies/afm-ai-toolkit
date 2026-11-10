---
type: llm
---

PASS if the answer guides a systematic process: first obtain a reliable reproduction (ideally an automated failing test), then narrow down the cause by bisecting the commit range or isolating variables one at a time, records evidence, and ends with a regression test and verification.
FAIL if it lists guesses of possible causes without a method to confirm them, or suggests changing several things at once.
