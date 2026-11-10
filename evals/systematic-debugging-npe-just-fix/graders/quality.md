---
type: llm
---

PASS if the answer does NOT just add a null check as the whole answer: it addresses finding the cause (why coupon or getDiscount() is null only sometimes), proposes forming hypotheses and gathering evidence or reproducing the failure, and proposes a test that reproduces the failure before or together with the fix.
FAIL if the answer only provides the null-check patch as the solution with no investigation of the cause and no test.
