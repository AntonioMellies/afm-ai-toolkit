# Testes de ideias de produto (Cagan, *Inspired*)

Base: Marty Cagan, *Inspired* (2ª ed.), caps. 33 e 41-55, mais caixas e capítulos citados abaixo. O livro descreve como o autor e os times que ele conhece testam ideias **durante a descoberta**, antes de construir. **Limiares, prazos e proporções são do autor** ("o livro propõe", "na experiência dele"), sem base empírica independente neste material. Páginas = PDF, em `fontes.md`. Este arquivo não cobre entrevistas de problema (ver `entrevistas-mom-test.md`), nem a árvore de oportunidades, nem a escrita do PRD (skills `product-discovery-assistant` e `prd-writer`, se instaladas), nem o cálculo de métricas (skill `product-metrics`).

## Os quatro riscos e a ordem típica

O livro trabalha com quatro perguntas: o cliente vai escolher usar ou comprar (valor), o usuário consegue usar (usabilidade), conseguimos construir (viabilidade técnica, *feasibility*) e a solução serve ao negócio (viabilidade de negócio). Não é a taxonomia do Bland e Osterwalder nem a da Torres; declare qual está usando (ver `hipoteses-e-suposicoes.md`).

- **Não há ordem prescrita**, mas o autor descreve a lógica que muitos times seguem: valor primeiro, porque sem valor o resto importa pouco; usabilidade e valor se avaliam com os mesmos usuários, ao mesmo tempo, porque a pessoa precisa conseguir usar para reconhecer o valor; depois a viabilidade técnica com os engenheiros; por último a de negócio, para não agitar a organização antes de ter confiança e para poder mostrar ao stakeholder o que funcionou com clientes.
- Em muita coisa, os quatro riscos são baixos e o time segue para a entrega. O trabalho de descoberta está onde a resposta não é clara.
- Viabilidade técnica entra na descoberta, não depois: engenheiros veem a ideia antes de decidir construir. Viabilidade de negócio inclui finanças, marketing, vendas, jurídico, desenvolvimento de negócios e executivos. Testar é deixar os stakeholders afetados revisarem a proposta e ter suas preocupações tratadas.
- Uma **iteração de descoberta** é testar ao menos uma ideia ou abordagem; o autor espera algo como 10 a 20 por semana de times competentes e uma ordem de grandeza menos esforço que uma iteração de entrega (regra prática dele).
- Espere que muitas ideias não funcionem; o motivo mais comum é valor.

## Tipos de protótipo e o que cada um testa

Todo protótipo deve custar ao menos uma ordem de grandeza menos tempo e esforço que o produto, e a fidelidade é a necessária ao propósito: subir só quando preciso, porque baixa é mais rápida e barata. Usar o tipo errado atrapalha.

| Tipo | Risco que enfrenta | Limite ou custo (segundo o autor) |
|---|---|---|
| Viabilidade | Técnico (algoritmo, desempenho, escala, tecnologia ou serviço novo para o time, dependência de outros times) | Código descartável, sem interface nem tratamento de erros, em geral um ou dois dias; a estimativa é dos engenheiros e a decisão de gastar o tempo é do PM; é trabalho de descoberta, não de entrega |
| De usuário, baixa fidelidade | Fluxo e informação | Não mostra efeito do visual nem de dados reais |
| De usuário, alta fidelidade | Usabilidade e base do teste de valor | É fachada: dados realistas, mas não vivos; **não prova que o produto venderá** |
| Com dados reais (*live-data*) | Evidência quantitativa de que a ideia funciona | Feito por engenheiros; o autor estima de 5% a 10% da produtização; hoje, de poucos dias a uma semana; não é produto entregável e o PM não decide que está "bom o bastante" |
| Híbrido (ex.: *Wizard of Oz*) | Aprender rápido com interface realista e trabalho manual por trás | Nunca com tráfego significativo; aprendizado sobretudo qualitativo |

Convenção desta skill: o protótipo de usuário **não substitui** o pretotipo de Savoia (dado com *skin in the game*); são complementares e usam critérios de evidência diferentes.

## Teste de usabilidade e, logo depois, de valor

Resumo do que o autor propõe para o teste qualitativo:

1. **Cadência.** No mínimo duas a três horas de entrevistas por semana e dois a três testes qualitativos de valor por semana (números do autor).
2. **Sequência.** Entrevista curta (problema, solução atual, o que faria trocar), depois teste de usabilidade e, **imediatamente após**, o teste de valor. Sem a usabilidade antes, o teste de valor vira *focus group*: a pessoa fala hipoteticamente.
3. **Quem.** PM e designer em todos os testes (o PM não delega nem terceiriza); idealmente um engenheiro, em rodízio. Alguém conduz e outro anota; debrief depois.
4. **Protótipo.** Em geral de alta fidelidade, porque o realismo importa para valor. Defina antes as tarefas principais.
5. **Condução (usabilidade).** Diga que o protótipo é que passa ou falha, não a pessoa; veja se entende pela página inicial o que o produto faz; mantenha-a em modo de uso, não de crítica; observe o que faz mais do que o que diz; fique em silêncio, repita o que vê ("papagaio") e devolva perguntas em vez de ajudar. Não peça narração contínua.
6. **Leitura por tarefa.** Três casos: conseguiu sem ajuda, teve dificuldade mas conseguiu, desistiu. Só registre "desistiu" quando você acredita que a pessoa abandonaria o produto por um concorrente.
7. **Síntese.** Corrija o protótipo assim que achar o problema; não é preciso manter o teste idêntico, porque o objetivo é aprender, não provar. Resumo curto por e-mail depois de cada sujeito ou rodada, não relatório longo.

### Valor sem gentileza

As pessoas são gentis, então os testes de valor do autor pedem algo à pessoa. Eles não somam pontos nem formam escala; use como perguntas de desenho:

- **Dinheiro:** ver se a pessoa tiraria o cartão e pediria para comprar, sem coletar o cartão; em produto B2B caro, uma carta de intenção não vinculante.
- **Reputação:** probabilidade de recomendar (por exemplo, de 0 a 10), compartilhar em rede social, informar o e-mail de chefe ou amigos (sem salvar).
- **Tempo:** aceitar reservar tempo significativo (principalmente B2B).
- **Acesso:** pedir as credenciais do produto atual com a justificativa de uma ferramenta de migração, só para ver se trocaria já, sem querer de fato a credencial.

Dinheiro, reputação e tempo correspondem às moedas do Fitzpatrick; acesso é acréscimo do autor. O livro **não dá limiar** de quantas pessoas devem aceitar. Se duas pessoas reagem de forma muito diferente, descubra por quê (tipos de cliente, de usuário, solução atual) e, se não conseguir interesse ou usabilidade suficiente, o autor arquiva a ideia e vê isso como custo evitado, não como fracasso.

Aprovação verbal sobre protótipo de alta fidelidade, mesmo de 10 ou 15 pessoas, **não valida valor**: o autor aponta isso como erro comum de iniciantes.

Convenção desta skill (ética): a "compra" sem cobrança e o pedido de credenciais simulam compromisso. O autor diz que não guarda os e-mails nem quer a credencial de fato; a revelação da simulação ao final e a recusa sem constrangimento são convenção desta skill, na linha do princípio de Bland e Osterwalder de experimentar *com* os clientes, não *sobre* eles.

## Testes de demanda

Servem a produto inteiro ou a uma funcionalidade, para evitar construir o que ninguém quer.

- **Fake door (funcionalidade).** Coloque o botão ou item de menu onde acredita que ficaria. Ao clicar, a pessoa vai a uma página que diz que a empresa estuda a possibilidade, procura clientes para conversar e permite se voluntariar (e-mail ou telefone). **Crítico:** nenhum sinal visível de teste antes do clique. Dado: comparar o clique com a expectativa ou com outras funcionalidades; depois, conversar com os voluntários.
- **Landing page (produto).** Monte a página do funil da nova oferta como num lançamento real; no chamado para ação, em vez do teste gratuito, a página explica o estudo e convida a conversar.
- Pode mostrar a todos (startup inicial) ou a uma pequena porcentagem ou região (empresa grande). O ganho é evidência de demanda e uma lista de pessoas dispostas a falar.
- **Sem alvo de conversão.** O livro lido não dá taxa-alvo, amostra nem duração; defina o critério antes (passo 4 do fluxo). Os alvos do Bland e Osterwalder (15%, 5%, 3%; 10% a 15%) são de outro autor e não se aplicam a este procedimento.
- O próprio autor diz que, na prática, demanda costuma não ser o problema: o difícil é a pessoa experimentar e não se empolgar o bastante para trocar, o que cabe aos testes de valor.

## Testes quantitativos de valor

O autor usa tráfego real limitado, no protótipo com dados reais, e escolhe a técnica conforme tráfego, tempo e tolerância a risco. Pode haver significância estatística (muito tráfego) ou "evidência útil" mais fraca para uma decisão informada; o livro não dá fórmula nem tamanho de amostra.

| Técnica | Como o autor descreve | Limite |
|---|---|---|
| Teste A/B de descoberta | Produto atual para 99% e protótipo para 1% ou menos, monitorado de perto; o usuário não sabe qual versão vê, e o dado é muito preditivo. É diferente do A/B de otimização (chamada para ação, cor de botão, em geral 50:50) | Exige tráfego |
| Somente por convite | Convida-se um conjunto de usuários, avisando que é versão experimental (adesão voluntária); usado por empresa avessa a risco ou com pouco tráfego | Menos preditivo (quem adere é mais pioneiro); se não usam, só se sabe que não usam: siga com teste qualitativo |
| Programa de clientes de descoberta | Variação do convite com clientes que já aceitaram testar versões e têm relacionamento; em B2B é a técnica principal do autor para coletar uso real, comparando com a base | Mesmo limite do convite |

Em empresa avessa a risco, o autor aponta o A/B com 1% ou menos como em geral suficiente e, quando precisa ser ainda mais conservador, o teste só por convite ou clientes do programa sob NDA, com implantação gradual e avaliação do impacto sobre clientes e equipes. Dado quantitativo diz o que acontece e **não o porquê**; o porquê vem do teste qualitativo.

## Product/market fit, como o livro o descreve

Sem definição objetiva única: o autor lista sinais (clientes mais felizes, menor *churn*, ciclos de venda mais curtos, crescimento orgânico rápido) e diz que o limiar de cada um é difícil de definir.

- **Teste de Sean Ellis (versão do autor).** Pesquise quem é do mercado-alvo, usou o produto recentemente, ao menos algumas vezes, e que pela analítica chegou ao valor central. Pergunta: como se sentiria se não pudesse mais usar o produto, com quatro respostas ("muito desapontado", "um pouco", "indiferente", "não é mais relevante porque não uso mais"). **Regra prática do autor:** mais de 40% de "muito desapontado" indica boa chance de ajuste ao mercado. O autor admite muitas ressalvas conforme o produto e o tamanho da amostra, e prefere o teste para consumo.
- **Seis clientes de referência** em um mercado-alvo específico: para produtos B2B, o autor costuma declarar o ajuste ao mercado nesse ponto. Também é critério do autor, não de outros livros deste material.
- O ajuste não encerra o trabalho no produto.

Não misture com os 40% do *Testing Business Ideas*: o texto de lá tem outra população e outra ressalva (ver `forca-da-evidencia.md`). Para métricas além do teste, use a skill `product-metrics`.

## Analítica e instrumentação por funcionalidade

- Para toda funcionalidade nova, instrumente ao menos o uso básico; o autor diz que, sem isso, nem lançaria. Pergunte primeiro o que precisa saber do uso, depois instrumente, depois crie relatórios.
- Planeje a instrumentação do que será testado (inclusive do protótipo com dados reais, só nos casos testados) antes do experimento, para saber logo se funciona e se há efeito não pretendido.
- Anonimize e agregue os dados; nada identificável.
- Analítica serve para entender comportamento (inclusive a diferença entre o que dizem e o que fazem), medir progresso por objetivo de negócio, provar se ideias funcionam (A/B) e informar decisões. As sete famílias de métrica do autor estão na skill `product-metrics`, que é onde ficam.

## Três modos de mostrar o protótipo

Não confunda; deixe claro qual está fazendo:

| Modo | Para quê | Quem conduz |
|---|---|---|
| Teste com usuário | Testar usabilidade e valor (qualitativo) | A pessoa testada |
| Demo de produto | Vender ou evangelizar; mostrar valor | O PM (ou o marketing de produto, roteirizado) |
| *Walkthrough* | Dar ao stakeholder toda chance de achar um problema | Em geral o PM; o stakeholder pode mexer |

No *walkthrough* não se vende, não se testa e não se esconde nada. Erros de iniciante apontados pelo autor: fazer *walkthrough* com prospect quando deveria ser demo; fazer demo durante um teste com usuário e depois perguntar o que a pessoa achou.

## Semana de descoberta e fechamento do ciclo

- Uma *discovery sprint* é um bloco de uma semana de descoberta para atacar um problema ou risco grande, e sempre termina validando a solução com usuários e clientes reais. O livro resume a estrutura de cinco dias do livro *Sprint* (enquadrar o problema, várias abordagens, afunilar, protótipo de usuário de alta fidelidade, testar) e remete a ele para o detalhe.
- Resultado, não entrega: se a funcionalidade foi ao ar e o resultado esperado não veio, o autor pede dizer que o resultado não foi bem-sucedido, apontar o que se aprendeu e que há outras ideias. Convenção desta skill: registre essa leitura no passo "Decida" com a métrica do cartão de teste.

## O que o livro não dá (não preencher)

Tamanho de amostra de testes qualitativos ou de demanda, taxa-alvo de fake door, duração dos testes quantitativos, critério estatístico, método para sintetizar, quantas pessoas devem "puxar o cartão". Quando faltar, o critério vem da própria pessoa, definido antes do teste (passo 4).

## Perguntas para o usuário

- "Qual dos quatro riscos este teste ataca, e qual deles você tratou antes?"
- "A pessoa vai usar o protótipo antes de falar de valor? O que ela dá ao final (dinheiro, reputação, tempo, acesso) além de dizer que gostou?"
- "O que você exibe para a pessoa antes do clique do fake door? Algo denuncia que é teste?"
- "Qual é o critério de sucesso e quantas pessoas ou cliques o formam, definidos antes?"
- "Este momento é teste com usuário, demo ou *walkthrough*?"
