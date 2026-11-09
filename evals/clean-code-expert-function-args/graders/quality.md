---
type: llm
---

PASS if the answer says the function has too many arguments (and boolean flag arguments are a smell), recommends grouping related data into an object and splitting the flag-driven behavior, in line with keeping the argument count very low (ideally zero to two, avoiding three or more).
FAIL if it says that up to 3 arguments is always fine and does not address the flags.
