# Fluxos Combinados — Backend Engineering

Cada fluxo lista as etapas, a skill responsável, o que a etapa recebe e o que entrega para a próxima. Pule etapas cujo entregável já exista e esteja válido.

## Nova feature

| # | Skill | Recebe | Entrega |
|---|---|---|---|
| 1 | `domain-driven-design` | Pedido de negócio, termos usados pelos especialistas | Termos da Linguagem Ubíqua, Agregado afetado, invariantes, Eventos de Domínio |
| 2 | `clean-architecture-expert` | Modelo da etapa 1 | Caso de Uso (ator, objetivo, entrada, saída, regras), camadas, portas necessárias |
| 3 | `clean-code-expert` | Caso de Uso e estrutura da etapa 2 | Implementação legível, testes given/when/then, tratamento de erros |
| 4 | `production-ready-microservices-expert` | Código e integrações da etapa 3 | Logs, métricas, tracing, health checks, resiliência e estratégia de rollback da feature |

## Revisão de serviço

| # | Skill | Foco | Saída |
|---|---|---|---|
| 1 | `production-ready-microservices-expert` | Checklist de Produção e Perguntas Obrigatórias | Riscos operacionais priorizados |
| 2 | `clean-architecture-expert` | Dependency Rule, acoplamento, testabilidade | Violações de camada e acoplamentos com framework/infra |
| 3 | `domain-driven-design` | Modo de Revisão | Anemia do modelo, agregados gigantes, linguagem inconsistente |
| 4 | `clean-code-expert` | Nomes, funções, duplicação, erros | Lista de refatorações pontuais |

Consolide as quatro saídas em uma lista única ordenada por impacto (risco em produção > integridade do domínio > estrutura > legibilidade).

## Refatoração de legado

1. `domain-driven-design` — extrair a Linguagem Ubíqua do código e das pessoas; identificar conceitos ocultos e regras espalhadas.
2. `clean-architecture-expert` — definir a estrutura-alvo e isolar o domínio atrás de portas, em passos pequenos e reversíveis.
3. `clean-code-expert` — aplicar a Boy Scout Rule em cada passo: renomear, extrair funções, remover código morto, cobrir com testes antes de mover.
4. `production-ready-microservices-expert` (opcional) — garantir que métricas e logs permitam comparar o comportamento antes e depois.

## Serviço novo para produção

1. `production-ready-microservices-expert` — projetar operação, observabilidade, alertas, recuperação, escalabilidade e deploy antes do código.
2. `clean-architecture-expert` — estrutura do serviço com adapters para observabilidade e integrações.
3. `clean-code-expert` — implementação e testes.
4. `production-ready-microservices-expert` — validar o Checklist de Produção completo antes de liberar.

## Checklist de handoff entre skills

Antes de passar para a próxima etapa, confirme:

- [ ] O entregável da etapa está explícito (lista, tabela, código ou decisão)
- [ ] Termos do domínio usados na etapa seguinte são os da Linguagem Ubíqua
- [ ] Premissas e dúvidas abertas foram registradas
- [ ] Conflitos com etapas anteriores foram explicitados e decididos
