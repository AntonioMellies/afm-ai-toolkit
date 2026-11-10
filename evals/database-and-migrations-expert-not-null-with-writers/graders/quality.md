---
type: llm
---

PASS if the sequence handles the writers that omit status BEFORE enforcing NOT NULL (introduces a default value first), cleans the existing NULL rows using a value that is agreed with stakeholders/owners (not silently invented), notes that adding a default does not fix rows that already exist, and only then applies NOT NULL; it keeps or removes the default as a later, deliberate step.
FAIL if it goes straight to ALTER COLUMN SET NOT NULL, or updates the NULLs with an arbitrary value without saying it needs to be agreed, or ignores the two services that insert without status.
