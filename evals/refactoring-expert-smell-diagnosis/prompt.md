---
max_turns: 8
allowed_tools: [Skill]
runs: 1
---

Olha esse código: a classe Order tem os métodos getCustomer().getAddress().getCity() chamados em 15 lugares diferentes, e a classe ReportGenerator tem um switch sobre order.getType() repetido em 4 métodos, e usa 6 parâmetros booleanos soltos em generate(). O que está errado e qual refatoração aplico em cada caso?
