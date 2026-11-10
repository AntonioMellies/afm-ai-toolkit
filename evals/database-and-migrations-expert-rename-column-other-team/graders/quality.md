---
type: llm
---

PASS if the answer does NOT rename the column in a single step and instead keeps the old and new column side by side for a transition period (new column, synchronization such as a trigger or dual write, migrate the consumers) AND sets an explicit removal date or removal condition tied to the slowest consumer (the other team's deploy), AND removes the old column only in a later step after tests/consumers migrated.
FAIL if it issues ALTER TABLE ... RENAME COLUMN as the migration, or drops the old column in the same release, or never mentions the other team's slower deploy schedule as the thing that sizes the transition period.
