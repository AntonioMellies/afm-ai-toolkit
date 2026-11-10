---
type: llm
---

PASS if the answer criticizes over-mocking (mocking the domain object itself, tests coupled to implementation), recommends testing behavior with real domain objects and mocking only boundaries, and suggests adding some integration-level test for the repository or payment boundary.
FAIL if it recommends adding more mocks or leaves the strategy unchanged.
