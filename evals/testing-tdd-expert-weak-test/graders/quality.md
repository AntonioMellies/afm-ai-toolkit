---
type: llm
---

PASS if the answer explains that the test is weak (it only asserts non-null, does not verify the discount value or the boundary around 1000), proposes concrete test cases (below, above and exactly at the threshold with expected values) and mentions seeing the test fail when the behavior is wrong.
FAIL if it accepts the test as good because coverage is 100%.
