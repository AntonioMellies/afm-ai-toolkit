# Opportunity Solution Tree (Torres)

Base: Teresa Torres, *Continuous Discovery Habits*, caps. 2, 3, 6, 7 e 8. Páginas e citações em `fontes.md`. Paráfrase do livro; o que não tem base está marcado como **convenção desta skill**. As figuras das árvores do livro não foram lidas; a descrição abaixo vem só do texto.

## 1. Estrutura correta

De cima para baixo, segundo o livro:

1. **Raiz: resultado desejado**, a necessidade de negócio que a equipe quer mover.
2. **Espaço de oportunidades**: necessidades, dores e desejos **do cliente** que, se atendidos, geram o resultado. Aqui há vários níveis (pai, filho, irmãs).
3. **Espaço de soluções**: abaixo das oportunidades, só para a oportunidade-alvo.
4. **Testes de suposição**: abaixo das soluções. O desenho desses testes fica na skill `hypothesis-and-experiments`, se instalada.

```
Resultado desejado (número)
├── Oportunidade A (momento 1 da experiência do cliente)
│   ├── Sub-oportunidade A1
│   └── Sub-oportunidade A2        ← folha: pode ser a oportunidade-alvo
│       ├── Solução (conjunto de 3 diversas)
│       │   └── Teste de suposição
├── Oportunidade B (momento 2)
│   └── ...
```

Diferenças em relação à versão anterior desta skill, que as explica ao usuário quando relevante:

- A skill mostrava oportunidades em **um único nível**. No livro elas se organizam em árvore, e as soluções só aparecem sob a folha escolhida.
- A skill ligava experimento direto à solução. No livro o teste é de **suposição**, e fica abaixo da solução.
- A skill derivava oportunidades do código. No livro elas vêm de histórias contadas por clientes e só entram na árvore se aparecerem em mais de uma entrevista (seção 3).

A forma da árvore orienta o próximo passo: espaço de oportunidades raso pede mais entrevistas; espalhado pede foco; poucas soluções para a oportunidade-alvo pedem ideação; poucos testes em andamento pedem mais testes. O trabalho também ocorre de baixo para cima: o resultado de um teste que falha leva a perguntar o que se entendeu errado do cliente e a revisar o mapa de oportunidades antes de novas soluções.

## 2. Resultado desejado (raiz)

- O livro descreve a raiz como a necessidade de negócio (cap. 2) e, no cap. 3, distingue três tipos de métrica: **resultado de negócio** (como o negócio progride), **resultado de produto** (como o produto move o negócio) e **traction metric** (uso de uma funcionalidade ou fluxo específico).
- Como regra geral, o livro recomenda dar à equipe um **resultado de produto**, que está sob seu controle, e preferir indicador antecedente (leading) a indicador atrasado (lagging).
- Traction metric só para equipes juniores ou para otimizar uma solução já sabida; nunca para descobrir soluções novas, pois prende a equipe a um output.
- Anti-padrões do livro: vários resultados ao mesmo tempo; trocar de resultado a cada trimestre; resultados individuais em vez de do trio; **escolher um output como resultado** (teste: questionar o impacto; o resultado deve ser um número); perseguir uma métrica sem monitorar métricas de saúde.
- A ligação entre resultado de produto e de negócio é uma teoria a testar (cap. 11), não um fato.

Convenção desta skill: ao registrar a raiz, escreva o tipo da métrica (negócio, produto ou traction), o número e o prazo, e avise o usuário quando for traction metric ou output disfarçado.

## 3. Oportunidade válida

Definição do livro: oportunidade = necessidade, dor ou desejo do cliente (o livro evita "problema" porque há produtos que atendem desejos).

**Inventário de três perguntas.** Para cada oportunidade vinda de um snapshot, só entra na árvore se as três respostas forem sim:

1. Está formulada como necessidade, dor ou desejo, e não como solução?
2. Apareceu em mais de uma entrevista, ou é exclusiva de um cliente?
3. Se atendida, gera o resultado desejado?

Testes complementares do livro:

- **Solução disfarçada:** pergunte se há mais de uma forma de atender a oportunidade. Se só há uma, é uma solução; procure a necessidade implícita. Ao ouvir um pedido de feature, o livro sugere perguntar o que aquela feature faria pelo cliente.
- **Sentimento não é oportunidade.** Registre a causa ("odeio digitar a senha a cada compra"), não "estou frustrado"; o sentimento é sinal de que há uma oportunidade por perto.
- **Visão da empresa:** "já ouvimos isso em entrevistas?" e "consigo imaginar um cliente dizendo isso?"
- **Específica:** temas, diretrizes de design e sentimentos vagos não servem ("isso é difícil" vira "digitar o nome do filme no controle é difícil").

Consequência para o Modo Análise: uma oportunidade inferida do código falha a pergunta 2 e a origem em entrevistas. Entra como hipótese, com plano para ouvi-la.

## 4. Estrutura da árvore

- **Backlog plano de oportunidades** é difícil de priorizar: elas têm formas e tamanhos diferentes e se sobrepõem. A árvore substitui a lista.
- **Pai e filho** = subconjunto (o filho é um dos motivos do pai). **Irmãs** = semelhantes por terem o mesmo pai, mas distintas, de modo que se pode atender uma sem a outra.
- **Ramos de topo distintos:** use os momentos do experience map do cliente (um nó por ramo) ou, sem mapa sólido, desenhe cada história, rotule os momentos e costure os recorrentes. Os momentos não podem se sobrepor.
- **Nenhuma oportunidade com dois pais:** se couber em dois ramos, está ampla demais; divida uma por momento.
- **Cadeia vertical** (pai com um filho que tem um filho): ou são a mesma coisa reformulada, ou faltam irmãs; explore o pai nas próximas entrevistas.
- **Um ramo por vez:** agrupe similares; se forem irmãs, procure ou crie o pai (pode ser implícito); se forem iguais, funda. Repita até ligar ao topo do ramo.
- **Estrutura suficiente:** a primeira árvore feita em 30 minutos e dada como pronta provavelmente é rasa; buscar a árvore perfeita por horas também é erro. A estrutura é refeita ao longo do tempo.

## 5. Escolha da oportunidade-alvo

O livro defende uma **oportunidade-alvo por vez** (limitar trabalho em andamento) e rejeita a pergunta sim ou não ("devemos perseguir esta?"), que favorece viés de confirmação e ignora custo de oportunidade.

Procedimento do livro:

1. Compare entre si as oportunidades de topo e escolha a líder; os demais ramos saem da avaliação.
2. Repita com os filhos da líder, até chegar a uma oportunidade **sem filhos** (folha). Folha não significa fácil.
3. Em cada conjunto de irmãs, use quatro lentes: **tamanho** (quantos clientes e com que frequência, em estimativa grosseira e relativa), **mercado** (table stakes ou diferenciador, tendências), **empresa** (visão, missão, objetivos, valores, clima político, forças e fraquezas) e **cliente** (importância e satisfação com as soluções atuais).
4. Faça uma comparação subjetiva informada por dados para cada lente. **Não pontue por fator nem faça stack-rank**: o livro diz que isso trata um problema mal estruturado como bem estruturado, cria a ilusão de uma resposta certa e faz a equipe parar de pensar. Pode não haver vencedor claro; a equipe debate e decide para este momento.
5. Trate a decisão como **reversível** (compromete só os próximos dias ou semanas de discovery). O livro propõe limitar a decisão a uma ou duas horas, no máximo um ou dois dias. Erros listados: adiar por mais dados, usar um só conjunto de lentes, partir de uma conclusão e usar as lentes só para justificá-la.

**RICE** não aparece nos trechos lidos de Torres. O que ela rejeita é a pontuação por fator e o stack-rank de **oportunidades**. Nesta skill o RICE é **convenção**, restrito a itens de entrega (ver `rice-prioritization-template.md`).

## 6. Da oportunidade-alvo às soluções

- O livro propõe gerar, para a oportunidade-alvo, de 15 a 20 ideias, alternando geração individual e compartilhamento (indivíduos sozinhos superam grupos em quantidade e originalidade; a primeira ideia raramente é a melhor).
- Descarte as ideias que não resolvem a oportunidade-alvo (resolver em parte vale). Depois, voto por pontos com três votos por pessoa, com um único critério: quão bem a ideia atende a oportunidade-alvo. Fique com **três ideias** diversas, cada uma com um defensor.
- Não use o voto para escolher uma ideia só: o conjunto de três segue para testes de suposição, em que se compara qual entrega melhor a oportunidade.
- Suposições: o livro ordena as suposições de cada ideia por quanto se sabe (eixo da evidência) e por importância para o sucesso, em posições relativas e rápidas (até dez minutos por ideia, segundo a autora), e começa pelas duas ou três mais importantes e menos conhecidas. Esse trabalho é da skill `hypothesis-and-experiments`; aqui só se registra o encadeamento.

Os números (15-20 ideias, três votos, dez minutos, uma ou duas horas) são **propostas da autora**, sem base empírica independente citada no trecho lido.

## 7. Erros comuns (resumo)

| Erro | Correção |
|------|----------|
| Oportunidade vinda só do código ou de opinião interna | Marcar como hipótese; ouvir clientes |
| Oportunidade que é solução, sentimento ou tema | Reformular para a causa, específica, com mais de uma forma de atender |
| Raiz que é um output | Reescrever como mudança de comportamento medida em número |
| Lista plana ranqueada por nota | Estruturar por momentos, comparar irmãs, usar as quatro lentes |
| Escolher uma oportunidade com filhos | Descer até uma folha |
| Soluções sem oportunidade-alvo clara | Voltar à árvore antes de ideação |
| Árvore feita uma vez | Revisitar com frequência, a cada aprendizado novo |
