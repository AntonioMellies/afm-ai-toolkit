---
type: llm
---

PASS if the answer treats the intermittent failure as a bug to be understood (not just hidden), proposes concrete steps to isolate it (reproduce repeatedly, check ordering, shared state, time or concurrency dependencies, collect evidence from CI logs), and cautions that a blind retry hides the cause.
FAIL if it just endorses the retry or sleep as the fix without investigating the cause.
