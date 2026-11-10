---
type: llm
---

PASS if the answer explains that hiding the chain behind a composite getter does not really solve the coupling and the object still exposes its structure, and recommends telling the object to do the work (tell, don't ask) or rethinking what the caller really needs; it may note the law mainly applies to objects, not data structures.
FAIL if it simply approves the composite getter as the right application of the Law of Demeter.
