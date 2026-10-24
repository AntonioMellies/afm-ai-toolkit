# Fluxos Combinados — Product Strategy

Cada fluxo lista as etapas, a skill responsável, o que a etapa recebe e o que entrega para a próxima. Pule etapas cujo entregável já exista e esteja válido.

## Da ideia ao MVP

| # | Skill | Recebe | Entrega |
|---|---|---|---|
| 1 | `product-discovery-assistant` | Ideia, contexto, restrições (Modo Discovery do Zero) | Positioning Statement, Matriz CSD, Top 3-5 oportunidades, roteiro de entrevistas, POL Probes |
| 2 | `domain-driven-design` | Oportunidades priorizadas | Linguagem Ubíqua, atores, processos e Eventos de Domínio do MVP, Core Domain |
| 3 | `designer-system-material-3-enterprise-ux` | Processos e termos da etapa 2 | Fluxos principais, telas do MVP com estados, wireframes e métricas de UX |

Volte à etapa 1 se a etapa 2 revelar suposições não validadas sobre o processo de negócio.

## Evolução de produto existente

1. `product-discovery-assistant` — Modo Análise: Mapa de Capacidades, Matriz CSD, Opportunity Solution Tree e RICE.
2. `domain-driven-design` — para as oportunidades do topo: quais conceitos, regras e contextos mudam; termos novos ou conflitantes.
3. `designer-system-material-3-enterprise-ux` — Review Mode das telas afetadas e especificação das mudanças de fluxo.

## Validação de hipótese com protótipo

1. `product-discovery-assistant` — formular a hipótese (problema → hipótese → métrica de sucesso) e escolher o POL Probe.
2. `designer-system-material-3-enterprise-ux` — protótipo mínimo suficiente para o teste (wireframe ou fluxo), usando os termos do domínio.
3. `product-discovery-assistant` — roteiro de teste no estilo Mom Test e critério de decisão (seguir, ajustar, abandonar).

## PRD completo

| Seção do PRD | Skill |
|---|---|
| Problema, público, evidências, métricas de sucesso, priorização | `product-discovery-assistant` |
| Glossário, regras de negócio, processos e eventos | `domain-driven-design` |
| Fluxos principais, telas, estados e critérios de UX | `designer-system-material-3-enterprise-ux` |
| Questões em aberto e próximas validações | Consolidação das três |

## Checklist de handoff entre skills

Antes de passar para a próxima etapa, confirme:

- [ ] Cada oportunidade tem evidência e métrica de sucesso
- [ ] Os termos usados na etapa seguinte são os da Linguagem Ubíqua
- [ ] Suposições ainda não validadas estão marcadas como tal
- [ ] O escopo da próxima etapa se limita às oportunidades priorizadas
- [ ] Conflitos com etapas anteriores foram explicitados e decididos
