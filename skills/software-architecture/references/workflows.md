# Fluxos Combinados — Software Architecture

Cada fluxo lista as etapas, a skill responsável, o que a etapa recebe e o que entrega para a próxima. Pule etapas cujo entregável já exista e esteja válido.

## Decomposição de monólito

| # | Skill | Recebe | Entrega |
|---|---|---|---|
| 1 | `domain-driven-design` | Monólito atual, processos de negócio, times | Subdomínios classificados, Bounded Contexts, Context Map |
| 2 | `architecture-hard-parts-expert` | Contextos da etapa 1 | Granularidade dos serviços, estratégia de dados, consistência, comunicação e workflow; ADR por decisão |
| 3 | `clean-architecture-expert` | Serviços/módulos da etapa 2 | Estrutura interna de cada parte, portas para integrações |
| 4 | `production-ready-microservices-expert` | Topologia final | Requisitos de observabilidade, resiliência, deploy e rollback; riscos de operação |

Considere o Monólito Modular como alternativa obrigatória na etapa 2 antes de recomendar microsserviços.

## Sistema distribuído do zero

1. `domain-driven-design` — descoberta do domínio, Linguagem Ubíqua, Bounded Contexts e Context Map.
2. `architecture-hard-parts-expert` — Framework de Decisão Arquitetural para topologia, dados e comunicação; ADRs e Fitness Functions.
3. `production-ready-microservices-expert` — projetar operação, observabilidade e escalabilidade da topologia escolhida.
4. `clean-architecture-expert` — estrutura padrão dos serviços.

## Revisão de arquitetura

| # | Skill | Foco | Saída |
|---|---|---|---|
| 1 | `domain-driven-design` | Modo de Revisão: contextos, relacionamentos, integridade do modelo | Limites mal definidos e vazamentos de contexto |
| 2 | `architecture-hard-parts-expert` | Avaliação Obrigatória das 8 dimensões, acoplamento, dados | Trade-offs atuais e decisões sem ADR |
| 3 | `production-ready-microservices-expert` | Checklist de Produção por serviço crítico | Riscos operacionais |
| 4 | `clean-architecture-expert` | Amostra de serviços representativos | Violações da Dependency Rule recorrentes |

Consolide as saídas em uma lista única ordenada por custo de reversão (estruturais primeiro, locais depois).

## Evolução arquitetural

1. `architecture-hard-parts-expert` — descrever a mudança de contexto (requisitos, times, volume), reavaliar as alternativas e registrar ADR; definir Fitness Functions que protegem a decisão.
2. `domain-driven-design` — verificar se a mudança altera subdomínios, contextos ou relacionamentos.
3. `production-ready-microservices-expert` — avaliar impacto em operação, escala e deploy; plano de migração com rollback.

## Checklist de handoff entre skills

Antes de passar para a próxima etapa, confirme:

- [ ] O entregável da etapa está explícito (mapa, tabela, ADR ou decisão)
- [ ] Toda decisão estrutural tem trade-offs e alternativas registrados
- [ ] Os nomes de contextos e serviços seguem a Linguagem Ubíqua
- [ ] Premissas sobre volume, times e prazos foram registradas
- [ ] Conflitos com etapas anteriores foram explicitados e decididos
