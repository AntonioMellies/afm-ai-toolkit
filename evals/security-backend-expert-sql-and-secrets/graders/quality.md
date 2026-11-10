---
type: llm
---

PASS if the answer identifies SQL injection from string concatenation and recommends parameterized queries, identifies the hardcoded live secret and recommends moving it to a secret store or environment and rotating it, and also mentions that SELECT * returns more fields than needed or lack of authorization/limits.
FAIL if it misses the SQL injection or the hardcoded secret.
