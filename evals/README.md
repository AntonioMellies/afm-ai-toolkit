# Avaliações das skills

Casos no formato de `claude plugin eval` (Claude Code 2.1.269 ou superior): cada pasta `evals/<skill>-<cenário>/` tem `prompt.md` e `graders/` (uma rubrica `llm` com PASS/FAIL concretos e um indicador `tool_used` que mostra se a skill foi acionada). Cada caso roda com o plugin e sem ele (baseline); `Δ` é a diferença.

```bash
claude plugin eval . --case "git-workflow-expert-*" --ablation with-without --trust-plugin --no-publish
```

Os resultados vão para `evals/results/` (ignorado pelo git). As execuções chamam o modelo com a sua conta e custam dinheiro (cerca de US$ 0,6 a 1,6 por skill nas rodadas abaixo).

## Resultado da rodada de 2026-11-09

Modelo do agente: padrão do Claude Code; juiz: sonnet. Casos de 1 execução por braço, exceto os marcados com 3.

| Skill | Casos | Δ médio | Leitura |
|---|---|---|---|
| `git-workflow-expert` | 5 | +0,20 | Ganho nos casos de regra específica da skill: mensagem de commit sem lista de arquivos (3 execuções: 1,00 com, 0,33 sem); amend em branch publicada (0,33 com, 0,00 sem) |
| `systematic-debugging` | 4 | +0,17 | Ganho em "teste que reproduz antes da correção" (3 execuções: 0,67 com, 0,00 sem). Em `npe-just-fix` (usuário exige só o patch) a skill não foi acionada e os dois braços falharam |
| `testing-tdd-expert` | 4 | +0,08 | `test-first-feature` (3 execuções): 0,33 com, 0,00 sem; a skill quase não é acionada quando o pedido é só "implemente" |
| `refactoring-expert` | 4 | +0,08 | Ganho só em `one-step-at-a-time` (3 execuções: 0,67 com, 0,33 sem) |
| `clean-code-expert` | 4 | 0,00 | Sem diferença |
| `security-backend-expert` | 3 | 0,00 | Sem diferença |
| `domain-driven-design` | 3 | 0,00 | Sem diferença |
| `production-ready-microservices-expert` | 3 | 0,00 | Sem diferença |
| `frontend-implementation` | 3 | 0,00 | Sem diferença |

## Como ler estes números

- **Efeito teto.** Nos casos de conhecimento geral (IDOR, injeção de SQL, agregado grande, Server Component), o modelo sem plugin já acerta tudo. Esses casos não mostram benefício das skills e não mostram prejuízo.
- **Onde há ganho**, ele aparece quando a skill impõe uma regra que o comportamento padrão não segue (mensagem de commit sem listar arquivos, teste antes da correção, passos pequenos com testes). Amostra pequena: 3 execuções por braço e juiz automático, então é indício, não prova.
- **Ativação.** O indicador `skill-fired` mostra que a skill nem sempre é acionada, sobretudo quando o pedido do usuário é direto ("só me dê o patch", "implemente"). Quando não é acionada, o resultado é igual ao baseline.
- O critério do plano era cortar ou reduzir a `references/` a skill que não supera o baseline. Seis das nove skills ficaram em Δ ≈ 0 nestes casos. Elas foram mantidas porque (a) o conteúdo vem do texto dos livros ou das páginas oficiais, com rastreabilidade em `references/fontes.md`, e (b) os casos usados mediram conhecimento geral, não a regra específica de cada skill. Se a decisão for pelo corte, `security-backend-expert`, `domain-driven-design`, `production-ready-microservices-expert` (v1.1) e `frontend-implementation` são as candidatas, nessa ordem de evidência fraca.

## Rodada 2 (2026-11-10): produto, estratégia, métricas e banco de dados

Modelo do agente: padrão do Claude Code; juiz: sonnet; **3 execuções por braço**; 26 casos, cada rubrica testa uma regra específica de um livro. Custo total cerca de US$ 27.

| Skill | Casos | Com skill | Sem skill | Δ médio | Leitura |
|---|---|---|---|---|---|
| `prd-writer` | 4 | 1,00 | 0,25 | +0,75 | Sem a skill, o modelo escreve o PRD tradicional (requisitos e user stories, roadmap de features e datas); só empata em "não inventar evidência" |
| `product-metrics` | 4 | 1,00 | 0,50 | +0,50 | Ganho em churn definido com períodos misturados (1,00 contra 0,33) e em KPIs de vaidade no estágio inicial (1,00 contra 0,00); empate em "5% de churn é bom?" |
| `database-and-migrations-expert` | 4 | 0,92 | 0,58 | +0,33 | Ganho na sequência NOT NULL (1,00 contra 0,33) e no renomear coluna com outro time (0,67 contra 0,33); empate nos gatilhos de sincronização |
| `market-competitive-analysis` | 5 | 1,00 | 0,67 | +0,33 | Ganho claro em "o que teria que ser verdade" (1,00 contra 0,00); empate em visão como estratégia e em mercado-alvo |
| `hypothesis-and-experiments` | 5 | 1,00 | 0,73 | +0,27 | Ganho em recusar entrevistas simuladas (1,00 contra 0,00) e em critério de sucesso em número absoluto (1,00 contra 0,67); empate em elogio, experimento único e aprovação verbal |
| `product-discovery-assistant` (v1.2) | 4 | 0,75 | 0,75 | 0,00 | Sem ganho. No caso de não pontuar oportunidades a skill é acionada mas entrega a tabela RICE mesmo assim (0,00 nos dois braços) |

**Como ler.**

- **Efeito teto.** Onde os dois braços ficam em 1,00 o modelo já sabe a regra; o caso não mostra benefício. Os ganhos aparecem onde a skill impõe uma regra do livro que o comportamento padrão não segue.
- **Amostra pequena.** 3 execuções e juiz automático: é indício, não prova.
- **`references/` não foi lido nos casos.** Os casos liberam só a ferramenta de acionar skills, sem leitura de arquivos. Em várias respostas a skill avisou que não conseguiu abrir os arquivos de `references/` e usou o conhecimento geral do tema. Os números medem, portanto, o `SKILL.md` e não o conjunto da skill; o valor dos arquivos de referência não foi medido.
- **Casos ajustados depois de ver o resultado.** Em `product-discovery-assistant`, o prompt de `no-scoring-of-opportunities` prometia 12 oportunidades que não vieram, e a rubrica de `opportunity-has-many-solutions` exigia gerar soluções que o prompt não pedia. Corrigi os dois e rodei de novo; os números da tabela já usam as versões corrigidas. Isso reduz a confiança nessas duas rubricas.
- **Falha real de `product-discovery-assistant`.** Mesmo acionada, ela produz a tabela RICE quando o usuário pede ranking das 12 oportunidades, em vez de propor a comparação entre oportunidades irmãs que Torres descreve. A regra está no texto da skill e não se sobrepõe ao pedido direto. Corrigir isso é trabalho pendente.
- **Decisão de corte.** Pelo critério do repositório (AGENTS.md, passo 10), a skill que não supera o baseline vira `references/`. `product-discovery-assistant` não superou o baseline nestes quatro casos; os demais casos dela já existiam antes e não foram reavaliados nesta rodada. Essa decisão é sua.
