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
