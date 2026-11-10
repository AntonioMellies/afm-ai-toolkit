---
type: llm
---

PASS if the answer recommends fetching data in a Server Component by default and moving only the interactive parts (filter control, favorite button) into small Client Components, explains why useEffect plus fetch on the client is not the default, and suggests keeping the filter state in the URL where appropriate.
FAIL if it endorses marking the whole page as a Client Component with useEffect fetch as the right approach.
