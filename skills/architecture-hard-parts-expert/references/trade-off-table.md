# Template: Tabela de Trade-off Arquitetural

Use este template para documentar a análise de qualquer decisão arquitetural antes de implementar.

---

## Decisão

**Problema:** [Descreva claramente o problema a ser resolvido]

**Contexto:** [Time, escala, restrições técnicas ou de negócio relevantes]

---

## Alternativas Avaliadas

### Alternativa 1: [Nome]

| Dimensão | Impacto | Observação |
|---|---|---|
| Complexidade | ↑ Alto / → Neutro / ↓ Baixo | |
| Escalabilidade | | |
| Performance | | |
| Consistência | | |
| Resiliência | | |
| Observabilidade | | |
| Custo Operacional | | |
| Velocidade de Entrega | | |
| Evolução Futura | | |

**Benefícios:**
- 

**Custos:**
- 

**Riscos:**
- 

---

### Alternativa 2: [Nome]

| Dimensão | Impacto | Observação |
|---|---|---|
| Complexidade | | |
| Escalabilidade | | |
| Performance | | |
| Consistência | | |
| Resiliência | | |
| Observabilidade | | |
| Custo Operacional | | |
| Velocidade de Entrega | | |
| Evolução Futura | | |

**Benefícios:**
- 

**Custos:**
- 

**Riscos:**
- 

---

## Exemplo Preenchido: Monólito vs. Microservices

### Alternativa 1: Monólito Modular

| Dimensão | Impacto | Observação |
|---|---|---|
| Complexidade | ↓ Baixo | Um processo, um banco, um deploy |
| Escalabilidade | → Neutro | Escala horizontal possível, mas tudo junto |
| Performance | ↑ Alto | Sem latência de rede entre módulos |
| Consistência | ↑ Alto | Transações ACID nativas |
| Resiliência | → Neutro | Falha de um módulo pode derrubar tudo |
| Observabilidade | ↓ Baixo | Logs e métricas centralizados, simples |
| Custo Operacional | ↓ Baixo | Um ambiente, um pipeline |
| Velocidade de Entrega | ↑ Alto | Sem overhead de contrato entre times |
| Evolução Futura | → Neutro | Pode migrar módulos para serviços depois |

### Alternativa 2: Microservices

| Dimensão | Impacto | Observação |
|---|---|---|
| Complexidade | ↑ Alto | Múltiplos repos, deploys, bancos, contratos |
| Escalabilidade | ↑ Alto | Escala independente por serviço |
| Performance | ↓ Baixo | Latência de rede entre serviços |
| Consistência | ↓ Baixo | Consistência eventual, sagas necessárias |
| Resiliência | ↑ Alto | Falha isolada por serviço (com circuit breaker) |
| Observabilidade | ↑ Alto | Tracing distribuído obrigatório |
| Custo Operacional | ↑ Alto | Múltiplos ambientes, pipelines, times |
| Velocidade de Entrega | ↓ Baixo | Overhead de contrato e coordenação entre times |
| Evolução Futura | ↑ Alto | Deploy e evolução independente por domínio |

---

## Recomendação

**Escolha:** [Nome da alternativa escolhida]

**Justificativa:** [Por que esta alternativa é a menos pior para o contexto descrito]

**Trade-offs aceitos:** [O que você está abrindo mão conscientemente]

**Condição de revisão:** [Quando esta decisão deve ser reavaliada]
