# Template: Matriz CSD + Opportunity Solution Tree

Duas partes com status diferente:

- **Matriz CSD (Certezas, Suposições, Dúvidas): convenção desta skill.** Não vem dos livros lidos. Serve para organizar o que se sabe e o que se supõe antes de ouvir clientes.
- **Opportunity Solution Tree: estrutura de Torres** (*Continuous Discovery Habits*), com oportunidades em vários níveis. Critérios e páginas em `opportunity-solution-tree-torres.md`.

## Contexto do Produto

**Nome:** _______________
**Cliente-alvo:** _______________
**Origem das informações:** entrevistas reais / dados / apenas código e documentos (marque uma)

---

## Matriz CSD (convenção)

### Certezas
*O que sabemos por dado ou evidência citável?*

| # | Afirmação | Fonte da evidência (obrigatória) |
|---|-----------|----------------------------------|
| 1 | | |

### Suposições
*O que assumimos como verdadeiro sem ter validado com clientes?*

| # | Suposição | Risco se estiver errada | Como seria testada |
|---|-----------|-------------------------|--------------------|
| 1 | | Alto / Médio / Baixo | |

### Dúvidas
*O que não sabemos e precisamos descobrir?*

| # | Dúvida | Como investigar |
|---|--------|-----------------|
| 1 | | |

---

## Resultado desejado (raiz da árvore)

**Resultado:** _______________ (escrito como número)
**Tipo de métrica:** negócio / produto / traction metric
**Meta e prazo:** _______________
**Teste de output:** se a equipe entregar isso e nada mudar para o cliente, o resultado melhorou? Se a resposta for "sim", é um output, não um resultado.

---

## Inventário de oportunidades

Uma linha por oportunidade candidata. Entra na árvore só se as três respostas forem sim.

| Oportunidade (palavras do cliente) | É necessidade, dor ou desejo, e não solução? | Em quantas entrevistas apareceu? | Se atendida, gera o resultado? | Fonte |
|---|---|---|---|---|
| | | | | |

Oportunidades inferidas do código ou de opinião interna ficam numa lista à parte, como **hipóteses**, com o plano para ouvi-las.

---

## Opportunity Solution Tree

```
RESULTADO DESEJADO: _______________  (tipo: ___ | meta: ___ | prazo: ___)
│
├── OPORTUNIDADE A (momento 1 da experiência do cliente): _______________
│   ├── Sub-oportunidade A1: _______________
│   └── Sub-oportunidade A2: _______________
│
├── OPORTUNIDADE B (momento 2): _______________
│   └── Sub-oportunidade B1: _______________
│       └── Sub-oportunidade B1a  ← folha: candidata a oportunidade-alvo
│
└── OPORTUNIDADE C (momento 3): _______________
```

Regras: ramos de topo = momentos distintos e sem sobreposição; nenhuma oportunidade com dois pais; sem cadeias verticais de um filho só; soluções só abaixo da oportunidade-alvo.

---

## Oportunidade-alvo (uma por vez)

Escolhida comparando irmãs, do topo até uma folha, com as quatro lentes (comparação subjetiva, sem nota):

| Lente | O que a comparação indicou | Dados usados |
|-------|----------------------------|--------------|
| Tamanho (quantos clientes e com que frequência) | | |
| Mercado | | |
| Empresa | | |
| Cliente (importância e satisfação atual) | | |

**Oportunidade-alvo:** _______________
**Por que esta, neste momento:** _______________
**Quem discordou e por quê:** _______________
**Decisão reversível até:** _______________ (a decisão é revista a cada aprendizado novo)

---

## Soluções e testes (abaixo da oportunidade-alvo)

**Conjunto de ideias:** de 15 a 20 geradas; as que não atendem a oportunidade-alvo saem; ficam três diversas, cada uma com um defensor (proposta do livro).

| Ideia | Defensor | Suposições mais importantes e menos conhecidas | Teste (ver `hypothesis-and-experiments`) |
|-------|----------|--------------------------------------------------|-----------------------------------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
