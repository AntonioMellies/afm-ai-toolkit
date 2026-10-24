# Template: ADR — Architecture Decision Record

Use este template para registrar qualquer decisão arquitetural relevante. ADRs devem ser versionados junto com o código.

---

## Estrutura do Arquivo

Salve como: `docs/adr/ADR-NNN-titulo-da-decisao.md`

Exemplo: `docs/adr/ADR-001-usar-kafka-para-comunicacao-assincrona.md`

---

## Template

```markdown
# ADR-NNN: [Título da Decisão]

**Data:** YYYY-MM-DD
**Status:** [Proposta | Aceita | Substituída por ADR-NNN | Depreciada]
**Decisores:** [Times ou pessoas envolvidas]

---

## Contexto

[Descreva o problema, a situação atual e por que uma decisão precisa ser tomada.
Inclua restrições técnicas, de negócio ou organizacionais relevantes.]

## Alternativas Consideradas

### Opção 1: [Nome]
- Prós: 
- Contras: 

### Opção 2: [Nome]
- Prós: 
- Contras: 

### Opção 3: [Nome]
- Prós: 
- Contras: 

## Decisão

[Descreva qual opção foi escolhida e por quê. Seja direto.]

**Escolhemos [Opção X] porque [razão principal].**

## Consequências

### Positivas
- 

### Negativas (trade-offs aceitos)
- 

### Riscos
- 

## Fitness Functions

[Descreva como esta decisão será validada automaticamente em CI/CD ou em produção.]

- [ ] [Teste ou métrica que garante a decisão está sendo seguida]
```

---

## Exemplo Preenchido

```markdown
# ADR-001: Usar Kafka para comunicação assíncrona entre serviços

**Data:** 2024-03-15
**Status:** Aceita
**Decisores:** Time de Plataforma, Tech Leads de Checkout e Billing

---

## Contexto

O sistema de checkout precisa notificar o serviço de billing ao confirmar um pedido.
Atualmente isso é feito via chamada REST síncrona. O serviço de billing tem SLA de 99.5%
e quando indisponível derruba o fluxo de checkout. Precisamos desacoplar os dois serviços.

## Alternativas Consideradas

### Opção 1: Manter REST síncrono com retry
- Prós: simples, já implementado
- Contras: acoplamento temporal, billing derruba checkout

### Opção 2: Kafka (mensageria assíncrona)
- Prós: desacopla temporal, billing pode processar quando voltar
- Contras: consistência eventual, tracing mais complexo

### Opção 3: Outbox Pattern + polling
- Prós: garante entrega sem broker externo
- Contras: complexidade de implementação, latência maior

## Decisão

Escolhemos Kafka porque o desacoplamento temporal é o requisito mais crítico.
Billing não pode continuar bloqueando checkout.

## Consequências

### Positivas
- Checkout não é afetado por falhas no billing
- Billing pode processar mensagens em seu próprio ritmo

### Negativas (trade-offs aceitos)
- Consistência eventual entre checkout e billing
- Necessidade de tracing distribuído para rastrear eventos
- Operação de cluster Kafka

### Riscos
- Mensagens duplicadas precisam de idempotência no consumidor

## Fitness Functions

- [ ] Teste de integração: billing offline não deve falhar checkout
- [ ] Alerta: lag de consumer > 1000 mensagens dispara incidente
```
