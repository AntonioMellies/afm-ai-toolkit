# Métricas por modelo de negócio

Fonte: *Lean Analytics* (Croll e Yoskovitz, 2013); páginas (p.N) são marcadores PDF, veja `fontes.md`. O livro foi escrito sobre startups web e móveis do período 2010 a 2012. Os números que aparecem são exemplos de casos, falas de consultores e investidores ou regras de bolso, e o livro mesmo diz que o "normal" muda quando um modelo amadurece (p.299-300). Nenhum vale como benchmark universal. Esta skill não reproduz as tabelas que a extração embaralhou, como a matriz modelo por estágio do capítulo 20.

## 0. Como classificar o negócio (p.89-96)

- Descreva o modelo tão simples quanto uma barraca de limonada: ignore detalhes e pense nos grandes blocos (p.90).
- Um modelo é o que você vende, como entrega, como adquire clientes e como ganha dinheiro. **Freemium é tática de marketing, SaaS é forma de entrega e anúncios são forma de cobrar receita**; nenhum dos três é "modelo de negócio" por si (p.93).
- Cinco "botões" de crescimento (Zyman, p.90-91): mais produtos, mais pessoas, mais frequência, mais dinheiro, mais eficiência. No início, a frequência (stickiness) costuma ser o botão principal, porque sem early adopters achando o produto excelente é improvável ter bom marketing viral (p.91).
- **Nem todo usuário é bom (p.91-93):** alguns valem só no longo prazo, alguns só dão divulgação, alguns prejudicam (consomem recursos, mandam spam, sujam a análise). Segmente usuários reais dos curiosos e de passagem, e otimize para os bons clientes. O livro avisa para não cair em contar clientes.
- O modelo de incentivo precisa combinar com a segmentação, o tempo para virar pagante, a facilidade de uso e o custo de mais um usuário de passagem (p.92). Produtos que coletam dados passivamente dificultam saber quem "saiu".
- O livro trata seis modelos: e-commerce, SaaS, app móvel gratuito, site de mídia, conteúdo gerado por usuário (UGC) e marketplace de dois lados. Se houver sobreposição, use as métricas de cada um (p.96). Restaurante é transacional como e-commerce; contabilidade é recorrente como SaaS.

## 1. E-commerce (p.97-104)

**Métricas que o livro lista (p.101-102):** taxa de conversão, compras por cliente por ano, tamanho médio do carrinho, abandono, custo de aquisição, receita por cliente (valor do tempo de vida), principais palavras-chave e termos de busca (inclusive os sem resultado), eficácia do mecanismo de recomendação, viralidade e eficácia da lista de e-mails.

**Modo do negócio pela taxa de recompra (p.99-100).** O consultor Kevin Hillstrom calcula a taxa anual de recompra, isto é, quantos dos compradores do ano passado compram neste ano. Segundo ele:
- abaixo de 40%: modo aquisição (foco em novos clientes; programas de fidelidade não são bons investimentos de longo prazo; ele diz que 70% dos e-commerces maduros ficam aqui);
- de 40 a 60%: modo híbrido (o cliente médio compra 2 a 2,5 vezes por ano);
- 60% ou mais: modo fidelidade (ele diz que só 10% dos maduros chegam aqui).
Antes de um ano, a taxa de recompra em 90 dias dá um indicador antecipado, segundo a mesma fonte: 1 a 15% sugere aquisição, 15 a 30% híbrido e mais de 30% fidelidade. São faixas de um consultor, que o livro repassa; não são resultado de dados do livro. O ponto do autor: nenhum modo é ruim, mas o dirigente precisa saber em qual está, e em modo aquisição provavelmente não se consegue (e não se deve tentar) aumentar a fidelidade. O mesmo consultor diz que é difícil mover a taxa anual de recompra mais que 10%.

**Conversão não basta (p.103-104).** A conversão é metade da equação; a outra metade é o tamanho do carrinho. Uma campanha pode trazer mais compradores e outra menos compradores que gastam mais. O livro lembra que o lucro é o que importa, e não só a receita bruta. Cedo, a conversão pode importar mais que a receita total, porque prova que alguém compra, mas o risco é focar demais nela, já que depende do tipo de negócio. Convenção desta skill: ao otimizar a conversão, acompanhe junto o tamanho do pedido, para não subir uma às custas da outra.

**Abandono (p.104):** na forma mais simples é o oposto da conversão, mas analise-o por etapa do funil (carrinho, envio, cobrança, às vezes um site de terceiros); pode ser um campo específico de formulário.

**Taxas históricas citadas (p.299):** o livro lembra que a conversão típica de e-commerce já foi de 1 a 3%, com varejistas de ponta entre 7 e 15%, e que isso mudou quando a Web virou o canal padrão. Trate como ilustração histórica.

## 2. SaaS (p.115-127, p.331-334)

**Métricas do ciclo de vida (p.116-117):** atenção, inscrição (enrollment), stickiness, conversão (inclusive troca para plano superior), receita por cliente, CAC, viralidade, upsell, disponibilidade e confiabilidade, churn e CLV. Método do livro: descreva o ciclo de vida do cliente, identifique o aspecto mais arriscado e melhore a métrica que o representa.

**Armadilha de ordem (p.117):** nem sempre dá para medir a métrica do risco (sem usuários não há conversão para medir). Saiba onde está o risco e otimize "o suficiente" nas etapas anteriores para que ele fique mensurável. Para SaaS, o foco típico é stickiness, porque raramente há segunda chance de primeira impressão.

**Engajamento (p.119-121):** a métrica máxima é o uso diário. Se o produto não é de uso diário (agenda de dentista, impostos, registro de casamento), defina uma barra de engajamento semanal ou mensal adequada e meça contra ela. Procure padrões de uso, e não só frequência de login; segmente quem faz o que você quer de quem não faz; teste a mudança num subconjunto, ou compare coortes (p.121). Os primeiros usuários podem não refletir o mainstream (p.120).

**Churn:** definição, cálculo e armadilhas em `formulas-e-exemplos.md`. O livro diz que em freemium ou trial é preciso medir separadamente o churn de usuários e de clientes (p.121).

**CLV e CAC (p.118-119, p.311-312):** o caso Backupify chama CLV e CAC de as duas métricas essenciais de um negócio de assinatura. Informa uma relação de 5 a 6 vezes entre CLV e CAC e um alvo de payback de 12 meses ou menos por canal; ambos são números de uma empresa, não regra. A regra de bolso geral do livro é que o CAC fique abaixo de um terço do valor total que o cliente traz, e o próprio texto diz que não é uma regra rígida, embora citada amplamente, e que o CLV e o CAC calculados provavelmente estão errados (o churn pesa mais no CLV e é indicador defasado). Se o custo de entregar o serviço é alto, pode ser preciso uma fração menor.

**Benchmarks que o livro repassa, com a fonte (p.302, p.331-334):** churn mensal abaixo de 5% antes de escalar (um investidor), com caminho para menos de 2% para escalar muito (outro investidor); os melhores SaaS entre 1,5 e 3% ao mês; no primeiro período de cobrança pode chegar a 50% se o assinante for surpreendido; média do projeto Startup Genome de 12 a 19% ao mês, descrita pelo livro como longe do suficiente. A meta do caso OfficeDrop foi abaixo de 4%, com a observação de que acima de 5% não haveria negócio com crescimento de margem bruta positiva; é o julgamento daquela empresa. Produtos com muito lock-in (backup, fotos) tendem a ter churn menor, e setores com baixo custo de troca, bem maior (p.334).

**Preço e formato de cobrança (p.125):** o caso ClearFit trocou US$99 por mês por vaga por US$350 por vaga por 30 dias e viu as vendas triplicarem e a receita crescer dez vezes. O livro diz que o preço baixo e a assinatura mensal confundiam os clientes. É um caso; use-o como lembrete de que preço e formato de cobrança também são hipóteses a testar, e não como regra.

## 3. App móvel gratuito (p.129-135)

**Métricas (p.131-132):** downloads (e posição e avaliações na loja), CAC de usuário e de pagante, taxa de lançamento (baixou, abriu, criou conta), percentual de usuários ativos (DAU, MAU), percentual que paga, tempo até a primeira compra, ARPU mensal e ARPPU, avaliações, viralidade, churn e CLV.

- **ARPU:** receita dividida pelo número de usuários ativos, em geral por mês. Inflar o número de ativos reduz o ARPU, o que força a definir de forma realista o que é "engajado" (p.133). No exemplo do livro, engajado é quem usa o aplicativo em três dias distintos.
- **Quem paga (p.135):** há quem nunca pague e quem gaste muito (as "baleias"); meça a porcentagem que paga, com segmentação e coortes, e trate os pagantes como uma base separada (comportamento, churn, receita). Convencer quem já paga a pagar mais move pouco o ARPU, mas pode mudar a receita.
- **Churn em três janelas (p.135):** medir em um dia, uma semana e um mês, porque os usuários saem em momentos diferentes por motivos diferentes (tutorial ruim no primeiro dia, falta de profundidade na primeira semana, planejamento de atualizações no primeiro mês, segundo o especialista citado).
- **Tensão natural entre metas (p.133-134):** tornar o jogo divertido para reduzir churn contra extrair dinheiro por usuário.
- A loja de aplicativos pesa muito no volume de instalações (p.132); o livro cita estatísticas de destaque de 2012 que não são reproduzidas aqui.

## 4. Site de mídia (p.143-144)

Foco em audiência, inventário de anúncios, taxas de anúncio, taxa de clique e equilíbrio entre conteúdo e anúncios (p.143). O livro admite que várias vanity metrics são relevantes aqui, porque o site ganha com popularidade, mas diz que engajamento importa mais que tráfego (p.143). Ele sugere testar layouts com menos anúncios por segmento para medir o custo, em churn, de ter conteúdo comercial (a "churn tax", p.144). O fluxo de cálculo de receita por tipo de anúncio e o churn de audiência do capítulo não foram usados, porque a tabela do churn de audiência diverge do texto na extração.

## 5. Conteúdo gerado por usuário, UGC (p.151-157, p.358-362)

- O foco é uma comunidade engajada que cria conteúdo; a receita (anúncios, doações) é incidental ao negócio central (p.151-152). A métrica gira em torno da quantidade de conteúdo bom contra ruim e do percentual de quem só observa contra quem cria.
- **Funil de engajamento (p.152-155):** ordene os degraus por valor crescente para o seu negócio (no exemplo do reddit: observar, votar, comentar, assinar, postar, criar comunidades). Os degraus não são mutuamente exclusivos. O objetivo é mover mais gente para os degraus mais valiosos, e por coorte dá para ver quanto tempo leva para subir de degrau, de forma parecida com o upsell de SaaS.
- **Método (p.155-157):** monte o funil por mês ou coorte, calcule a conversão entre degraus, depois a variação relativa mês a mês dessas taxas, para ver o que melhora ou piora depois de mudanças. As tabelas dessas páginas saíram embaralhadas; use apenas o método.
- **Recência (p.153):** a razão dia-semana (quantos dos visitantes de hoje estiveram aqui antes na semana) e os dias médios desde a última visita, excluindo quem passou de um corte (o livro exemplifica com 30 dias) para que os já saídos não distorçam.
- **Ovo e galinha (p.154-155):** o UGC precisa de conteúdo para atrair usuários e de usuários para criar conteúdo; no início importam a taxa de criação de conteúdo e a de cadastro.
- **Valores citados como regra de bolso (p.358, p.362):** o livro cita 17 minutos por dia no site como indicador forte de stickiness, em redes sociais e UGC, com base em empresas que ele consultou (de uma aceleradora), no reddit e em estudos de Pinterest (14 min), Tumblr (21) e Facebook (cerca de uma hora). Também apresenta uma estimativa dos autores para a participação: 25% só observam, 60 a 70% fazem o que é fácil e central, 5 a 15% criam, e desses, 80% do conteúdo vem de um grupo pequeno. Os próprios autores chamam de estimativa, e o capítulo 28 descreve os benchmarks do livro, entre eles os 17 minutos, como rudimentares (p.373).

## 6. Marketplace de dois lados (p.169-174)

- **Comece pelo lado do dinheiro.** Um investidor que o livro cita recomenda modelar primeiro os compradores e depois a oferta (estoque total), porque é fácil achar quem queira ganhar dinheiro e difícil achar quem queira gastar (p.169). No longo prazo, a oferta se compra, e a demanda não (p.173).
- **Três categorias (p.169):** atividade do comprador, atividade do vendedor e transações.
- **Cuidado com contagens infláveis (p.169):** números de compradores, vendedores e estoque podem ser inflados ajustando algoritmos sem melhorar a experiência; foque em atividade explícita (lances, mensagens, listagens, candidaturas).
- **Definições como linha na areia (p.170-171, exemplo de consoles usados):** comprador é quem fez ao menos uma compra; comprador engajado buscou algo nos últimos 30 dias; vendedor inativo não listou nada novo em 30 dias; listagem inativa aparece menos de cinco vezes por semana nos resultados de busca. Com isso se acompanham razões, como comprador engajado por vendedor ativo e por listagem ativa. O livro reconhece que contagens simples quebram a regra de que boas métricas são razões ou taxas (p.171). Os valores das tabelas do exemplo são fictícios e não foram usados.
- **Funil de compra (p.171):** buscas, buscas com resultado, cliques em listagens, compras, transações satisfeitas e percentual de satisfeitas, receita e tamanho médio da transação.
- **Outras métricas (p.172-174):** taxa de adição de compradores e vendedores (linha na areia inicial: estoque comparável ao dos concorrentes, ou, num mercado único, o bastante para que as buscas retornem ao menos um resultado válido); listagens por vendedor e completude; buscas sem resultado (venda perdida) e termos sem resultado (revelam demanda); avaliações e sinais de fraude; em leilões, se vendedores definem preços altos demais ou deixam dinheiro na mesa.

## 7. B2B e enterprise (p.379-396)

- **Pesquisa de cliente é censo, e não amostra (p.380-381).** Com poucos clientes de ticket alto, você fala com quase todos; "não há padrões, há clientes". Não dá para testar numa amostra estatisticamente significativa e descartar o teste se falhar, porque você perde clientes.
- **Quem compra não é quem usa (p.381).** Compradores têm de justificar com business case; o contato pode ser defensor enquanto outra pessoa na empresa é detratora.
- **O risco principal tende a mudar (p.389):** em B2C, "alguém vai se importar?"; em enterprise, "vai integrar?".
- **Métricas que o livro destaca (p.390-396):** facilidade de marcar reuniões e obter feedback; pipeline de versões iniciais, betas e provas de conceito, com as etapas do funil e a conversão de cada uma documentadas antes de contratar mais vendedores; custos de integração e customização (indicam se você tem uma startup ou uma consultoria padronizada); engajamento (cuidado, "tempo desde o último uso" engana porque o usuário é pago para usar; obtenha baselines do cliente antes da implantação); desatrelamento de clientes-âncora; suporte por cliente; escolhas discretas em grupos de usuários (descartar uma de duas opções, e não dar nota de 1 a 10); sucesso do discurso de venda antes de colocar canais; uso de API por cliente como barreira de saída.
- **Segmentação A/B/C (p.392-393):** um executivo citado separa clientes grandes e com muito desconto (A), de baixa manutenção e parceiros (B) e problemáticos (C). O livro cita, de estudo secundário, que em muitos B2B os 20% melhores clientes geram 150 a 300% do lucro e os 10% piores reduzem 50 a 200%. Dado de segunda mão, não conferido aqui.
- Escalar uma venda enterprise pode levar de 5 a 10 anos, segundo uma estimativa citada (p.390). O livro conclui que o modelo Lean continua valendo: achar a parte mais arriscada, quantificar e mitigar rápido (p.396).
