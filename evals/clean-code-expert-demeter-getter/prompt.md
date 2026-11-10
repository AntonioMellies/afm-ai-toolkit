---
max_turns: 8
allowed_tools: [Skill]
runs: 1
---

Para respeitar a Lei de Demeter eu criei customer.getCompanyCityName() que internamente faz getCompany().getAddress().getCity().getName(). Isso resolve? Está seguindo Clean Code?
