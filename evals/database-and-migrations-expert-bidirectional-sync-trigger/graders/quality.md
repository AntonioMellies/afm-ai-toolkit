---
type: llm
---

PASS if the triggers are protected against firing each other in a loop (for example only propagating when the value actually changed, or a recursion guard) AND the plan includes a removal date or condition for the old column and the triggers AND mentions that sync triggers are temporary scaffolding.
FAIL if the two triggers can re-trigger each other without any guard, or the triggers are left permanently with no plan to remove them.
