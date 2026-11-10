---
max_turns: 8
allowed_tools: [Skill]
runs: 3
---

Escreva a mensagem de commit para esta mudança. Arquivos alterados: src/billing/InvoiceService.java, src/billing/InvoiceRepository.java, test/billing/InvoiceServiceTest.java. O que mudou: faturas com valor zero estavam sendo enviadas ao cliente por e-mail; agora são ignoradas no envio. Motivo: clientes reclamaram de e-mails com fatura de R$ 0,00. Bug #482.
