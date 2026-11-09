---
type: llm
---

PASS if the answer starts from test cases (valid CPF, invalid check digits, repeated digits such as 111.111.111-11, formatting with dots and dash, null or empty input) before or together with the implementation, and states that the tests must be run and seen failing/passing rather than claiming they pass.
FAIL if it only delivers the implementation without test cases, or claims all tests pass without running them.
