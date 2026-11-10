# Template: Priorização RICE de Itens de Entrega

## Status: convenção desta skill

O RICE **não vem dos livros lidos** (Torres, Osterwalder). Escopo desta página:

- **Use** para ordenar **itens de entrega** (soluções ou entregas já definidas) quando o usuário pede uma ordem de execução.
- **Não use** para escolher a oportunidade-alvo. Para isso, Torres propõe comparar oportunidades irmãs nível a nível com quatro lentes (tamanho, mercado, empresa, cliente), de forma subjetiva e informada por dados; ela diz explicitamente para **não pontuar cada oportunidade por fator nem fazer stack-rank** como se faz com features (`opportunity-solution-tree-torres.md`).
- Torres também não propõe pontuar as ideias de uma oportunidade: o conjunto de três ideias é comparado por testes de suposição.

Se o usuário pedir RICE sobre oportunidades, explique essa diferença, ofereça a comparação por lentes e, se ele insistir, entregue o RICE rotulado como convenção, não como método do livro.

## Fórmula (convenção)

**Score RICE = (Reach × Impact × Confidence) / Effort**

| Parâmetro | O que medir | Escala (convenção desta skill) |
|-----------|-------------|--------------------------------|
| **Reach** | Quantos clientes o item afeta por período, com a fonte | Número estimado, com origem |
| **Impact** | Efeito no resultado desejado por cliente | 3 massivo / 2 alto / 1 médio / 0,5 baixo / 0,25 mínimo |
| **Confidence** | Confiança na estimativa | 100% alta / 80% média / 50% baixa; abaixo disso, aposta |
| **Effort** | Pessoa-semanas de trabalho total | Número estimado pelo time que entrega |

A confiança deve refletir a **evidência** que sustenta a estimativa (entrevistas, dados). Estimativas sem fonte recebem confiança baixa. As escalas acima são propostas desta skill, sem base empírica independente.

---

## Planilha de priorização

| # | Item de entrega (solução) | Oportunidade que atende | Reach | Impact | Confidence | Effort | Score | Evidência |
|---|---------------------------|-------------------------|-------|--------|------------|--------|-------|-----------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

---

## Exemplo ilustrativo (números inventados, só para mostrar o cálculo)

| # | Item de entrega (solução) | Oportunidade que atende | Reach | Impact | Confidence | Effort | Score |
|---|---------------------------|-------------------------|-------|--------|------------|--------|-------|
| 1 | Notificação de prazo vencido | "Eu me esqueço de prazos que passam" | 2000 | 2 | 0,8 | 2 | 1600 |
| 2 | Painel de métricas | "Não sei como meu time está indo" | 500 | 3 | 0,5 | 8 | 93,75 |
| 3 | Exportação para CSV | "Preciso levar os dados para outra ferramenta" | 1200 | 1 | 0,9 | 1 | 1080 |

Cada linha é uma **solução** ligada a uma oportunidade expressa pelo cliente. Notificações, painel e exportação não são oportunidades: são respostas a elas.

---

## Critérios de desempate (convenção)

Quando dois itens têm score parecido, priorize o que:

1. Valida uma suposição crítica
2. Desbloqueia outros itens
3. É reversível
4. Gera mais aprendizado

---

## Resultado da rodada

**Itens priorizados:**

1. _______________ (Score: ___)
2. _______________ (Score: ___)
3. _______________ (Score: ___)

**Itens adiados e motivo:**

- _______________ → _______________
