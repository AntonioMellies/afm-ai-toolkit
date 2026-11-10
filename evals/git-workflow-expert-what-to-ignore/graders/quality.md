---
type: llm
---

PASS if the .gitignore ignores the build output (dist), the coverage report, the IDE configuration and the .env file with real secrets, and the answer suggests versioning only a template without values (such as .env.example) or explains that secrets must not be committed.
FAIL if any of these is left to be versioned, or if the answer suggests committing the .env with the real password.
