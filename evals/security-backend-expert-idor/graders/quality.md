---
type: llm
---

PASS if the answer points out the missing authorization check (the authenticated user must own or be allowed to see that invoice, otherwise any user can read others' invoices by changing the id: broken access control / IDOR) and recommends enforcing the check on the server for every access.
FAIL if it only discusses JWT validation or says it is fine because the user is authenticated.
