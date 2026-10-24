# Fluxos Combinados — Frontend & Design System

Cada fluxo lista as etapas, a skill responsável, o que a etapa recebe e o que entrega para a próxima. Pule etapas cujo entregável já exista e esteja válido.

## Design System novo

| # | Skill | Recebe | Entrega |
|---|---|---|---|
| 1 | `designer-system-material-3` | Marca, plataformas, público | Tokens de referência, sistema e componente (cor, tipografia, forma, elevação, espaçamento, motion), temas claro/escuro, mapa de componentes |
| 2 | `designer-system-material-3-enterprise-ux` (se corporativo) | Tokens da etapa 1 | Camadas Brand → Product → Theme → Tenant, tokens de densidade, padrões de tabela, filtro, formulário e CRUD |
| 3 | `clean-code-expert` | Tokens e componentes definidos | Estrutura do código do Design System, nomes semânticos, componentes pequenos e testáveis |

## Tela de ponta a ponta

1. Especificação da tela:
   - Produto corporativo → `designer-system-material-3-enterprise-ux` (Screen Generation Mode: objetivo, usuários, layout canônico, componentes, estados, tokens, wireframe)
   - Produto geral → `designer-system-material-3` (SYSTEM DESIGN MODE)
2. `designer-system-material-3` — completar tokens e componentes que a tela exige e ainda não existem no Design System.
3. `clean-code-expert` — implementação: componentes com uma responsabilidade, nomes que revelam intenção, estados tratados explicitamente, testes.

## Revisão de frontend

| # | Skill | Foco | Saída |
|---|---|---|---|
| 1 | `designer-system-material-3` | REVIEW MODE e DESIGN CRITIQUE MODE | Scores de conformidade M3, acessibilidade, tokens |
| 2 | `designer-system-material-3-enterprise-ux` (se corporativo) | Review Mode enterprise | Produtividade, densidade, estados, Enterprise Readiness |
| 3 | `clean-code-expert` | Código dos componentes | Refatorações de nomes, tamanho, duplicação e tratamento de erros |

Consolide as saídas em uma lista única ordenada por impacto (acessibilidade > fluxo/produtividade > consistência de tokens > código).

## Implementação enterprise

1. `designer-system-material-3-enterprise-ux` — layout canônico (List-Detail, Supporting Panel, Three-Pane), tabela, filtros, drawers, todos os estados (loading, empty, error, success, permission denied) e atalhos de teclado.
2. `clean-code-expert` — componentes pequenos (tabela, filtro, drawer separados), lógica de estado isolada da apresentação, testes dos estados.

## Checklist de handoff entre skills

Antes de passar para a próxima etapa, confirme:

- [ ] Todo valor visual da etapa está expresso como token semântico
- [ ] Todos os estados de UI foram especificados
- [ ] Requisitos de acessibilidade (contraste, teclado, ARIA) estão explícitos
- [ ] Breakpoints relevantes foram definidos
- [ ] Conflitos com etapas anteriores foram explicitados e decididos
