---
type: llm
---

PASS if the answer says SHA-256 with a fixed salt is not adequate and recommends a dedicated password hashing algorithm (Argon2id, bcrypt or scrypt) with per-user salts and proper parameters, and warns against logging passwords or sensitive request bodies.
FAIL if it approves SHA-256 with a fixed salt or the logging of login bodies.
