# Notas de leitura: Lean Analytics (Croll e Yoskovitz), bloco 02, PDF p.89-176

Idioma do livro: inglês. Citações literais em inglês. Página = "PDF PAGINA N" do marcador. Número impresso = PDF − 26 (ex.: PDF p.89 = impr. 63; PDF p.176 = impr. 150). Todo o bloco pertence à Parte Dois, "Finding the Right Metric for Right Now" (capítulos 7 a 13). OMTM, estágios (cap. 14) e Lean Analytics Cycle NÃO aparecem neste bloco; só há remissões ao cap. 14 e ao cap. 27.

---

### Cap. 7: What Business Are You In? (PDF p.89-96, impr. 63-70)
Resumo: Como a empresa ganha dinheiro determina quais métricas importam. Os autores reduzem qualquer negócio a poucos blocos (modelo de limonada), propõem os cinco "knobs" de crescimento, alertam que nem todo usuário é bom e apresentam o "business model flipbook" (cinco dimensões combináveis), antes de apresentar seis modelos (caps. 8-13).
Conceitos e regras:
- O risco de longo prazo costuma estar ligado a como o negócio ganha dinheiro; muitas startups constroem produto e atraem audiência, poucas monetizam. Mesmo adiando a monetização, o modelo de negócio deve ser planejado cedo. [p.89]
- Para decidir quais métricas acompanhar, descreva o modelo de negócio de forma tão simples quanto uma barraca de limonada: ignore detalhes, pense nos grandes componentes (custos variáveis, custos únicos, custo horário, receita = preço x copos vendidos). [p.89-90]
- Crescimento vem de um dos Engines of Growth de Eric Ries (stickiness, virality, revenue); cada modelo precisa maximizar a "tração" desses motores. [p.90]
- Cinco "knobs" de crescimento (Sergio Zyman, CMO da Coca-Cola): more stuff (mais produtos/serviços que se sabe que o cliente quer), more people (usuários; melhor quando é parte integral do uso, ex. Dropbox, Skype), more often (stickiness, menos churn, uso repetido), more money (upsell, preço, cliques em anúncios, conteúdo criado, compras in-game), more efficiently (menor custo de entrega/suporte e de aquisição; menos anúncio pago, mais boca a boca). [p.90-91]
- Early on, stickiness tende a ser o knob-chave: sem early adopters achando o produto excelente, é improvável conseguir marketing viral bom. [p.91]
- Nem todo usuário é bom: alguns valem só no longo prazo (Evernote: freemium funciona em parte porque usuários viram pagantes, mas pode levar dois anos), alguns dão só marketing grátis, alguns são ruins (distraem, consomem recursos, enviam spam, sujam a análise). [p.91]
- Após picos de visibilidade, poucos visitantes engajam de fato (exemplo Yipit, "TechCrunched"). [p.91]
- Analytics serve para segmentar usuários reais de curiosos/"drive-by"/prejudiciais e então maximizar os reais e filtrar os ruins; ex. exigir cartão de crédito de início, ou não tentar reativar usuários há muito inativos. [p.92]
- O modelo de incentivo/pagamento deve combinar com o tipo de segmentação, o tempo para virar pagante, a facilidade de uso e o custo de um usuário "drive-by" adicional. Heurísticas: jogo usado uma vez ou e-commerce de item raro, cobre adiantado; SaaS com custo incremental baixo, freemium pode funcionar se separar engajados de casuais; comprador frequente, faça-o se sentir bem tratado. [p.92]
- Produtos de coleta passiva (Fitbit, Siri, Writethatname) dificultam detectar quem "saiu"; é mais fácil achar desengajados quando o uso é ativo. Fitbit tem cinco níveis de uso/segmentos; quem só usa o clipe sem sincronizar vale pouco além da compra inicial; previsão de receita depende de entender como cada segmento usa o produto. [p.92]
- Regra do livro: "Not all customers are good" e não cair em "customer counting"; otimizar para bons clientes e segmentar atividades pelo tipo de cliente que atraem. [p.93]
- Flipbook: modelo de negócio = o que se vende, como se entrega, como se adquire clientes, como se ganha dinheiro. Freemium é tática de marketing, SaaS é forma de entrega, anúncios são forma de coletar receita; não são "modelos de negócio". [p.93]
- Cinco dimensões do flipbook: acquisition channel (como as pessoas descobrem), selling tactic (como converter visitante em usuário ou usuário em cliente; pedir dinheiro ou criar escassez/exclusividade: limite de tempo, capacidade, remoção de anúncios, funcionalidade extra), revenue source (direta ou indireta: transações, assinaturas, consumo, anúncios, revenda de dados, doações...), product type (valor oferecido), delivery model (como chega ao cliente). [p.93-94]
- Startup Compass lista 12 modelos de receita: advertising, consulting, data, lead generation, licensing fee, listing fee, ownership/hardware, rental, sponsorship, subscription, transaction fee, virtual goods; e 13 modelos financeiros "fundamentais" (search, gaming, social network, new media, marketplace, video, commerce, rental, subscription, audio, lead generation, hardware, payments). [p.94-95]
- O flipbook estimula pensamento lateral: cada "virada de página" é um pivô (ex. Dropbox com entrega física, cobrança antecipada, publicidade paga). Há mais de 6.000 permutações; uma empresa pode combinar vários (Amazon). [p.95-96]
- Roteamento do livro: e-commerce (cap. 8), SaaS (9), app móvel com compras in-app (10), mídia com anúncios (11), UGC (12), marketplace de dois lados (13). Restaurante é transacional como e-commerce; contabilidade é recorrente como SaaS. [p.96]
- Exercício: escolher o modelo, listar todas as métricas daquele modelo, comparar com o que já se acompanha e registrar os valores atuais; se houver sobreposição de modelos, tomar métricas de cada um. [p.96]
Citações curtas de prova:
- "Freemium isn't a business model—it's a marketing tactic." [p.93]
- "Not all customers are good. Don't fall victim to customer counting." [p.93]
- "More often means stickiness (so people come back), reduced churn (so they don't leave), and repeated use" [p.91]
O que este trecho NÃO diz: não define OMTM nem estágios; não dá números de benchmark neste capítulo; a lista de "seis modelos" não é apresentada como exaustiva ("Some won't").
Relevância para os artefatos candidatos: product-metrics: ALTA, classificação do negócio antes de escolher métricas, cinco knobs, flipbook, distinção tática vs. modelo.
Decisão sugerida: usar em product-metrics (referência "modelos de negócio" e passo "identificar o modelo antes de escolher métricas").

---

### Cap. 8: Model One: E-commerce (PDF p.97-114, impr. 71-88)
Resumo: Visitante compra de varejista web. O funil clássico está desatualizado (busca, recomendação, segmentação, origem fora do site). O capítulo introduz o modo de e-commerce (acquisition/hybrid/loyalty) por taxa de recompra, lista as métricas-chave e defende receita por cliente/visitante (e lucro) acima de taxa de conversão isolada.
Conceitos e regras:
- Premissas modernas: maioria encontra produtos por busca (palavras-chave importam mais que funis de navegação), recomendação faz com que poucos vejam as mesmas páginas, otimização segmenta o tráfego com testes, compras começam fora do site (redes sociais, email, comunidades). [p.97-98]
- Preços podem ser definidos por mercado/concorrência ou algoritmicamente; exemplo de guerra de preços algorítmica que levou um livro a mais de US$23 milhões. [p.98]
- Taxa de recompra anual (Kevin Hillstrom, Mine That Data) = percentual de quem comprou no ano passado que compra neste ano. Três modos: [p.99-100]
  - Acquisition mode: menos de 40% de recompra; foco em novos clientes; programas de fidelidade não são bons investimentos de longo prazo; 70% dos e-commerces maduros caem aqui. [p.99]
  - Hybrid mode: 40-60%; mistura de novos e recorrentes; cliente médio compra 2 a 2,5 vezes por ano; Zappos é exemplo. [p.99]
  - Loyalty mode: 60% ou mais; foco em fidelidade e frequência; programas de fidelidade só funcionam com esse engajamento; apenas 10% dos e-commerces maduros chegam aqui; Amazon é exemplo. [p.99]
- Indicador antecipado: a taxa de recompra de 90 dias já indica o modo antes de um ano: 1% a 15% = acquisition; 15% a 30% = hybrid; acima de 30% = loyalty. [p.99-100]
- Hillstrom: nenhum modo é ruim; o crítico é o CEO saber em qual está. Em acquisition mode provavelmente não se consegue (e não se deve tentar) aumentar lealdade; sazonais em acquisition não devem forçar compras fora de época, e sim criar awareness durante o ano. É difícil mover a taxa anual de recompra mais que 10% (30% varia de 27% a 33%). Melhorar serviço (ex. devoluções grátis) ainda atrai novos clientes. [p.100]
- Em acquisition mode com uma só chance de extrair receita, precificação é crítica; estudo McKinsey de 1992 mostrou impacto desproporcional do preço no lucro operacional; estudo de 2003 sugeriu impacto menor (8%), ainda maior que outros esforços. [p.101]
- Exemplo de loja de luxo: métricas-chave listadas com definição curta: conversion rate (visitantes que compram), purchases per year (compras por cliente por ano), average shopping cart size, abandonment (começam e não terminam), cost of customer acquisition, revenue per customer (lifetime value), top keywords que trazem tráfego, top search terms (os que geram receita e os sem resultados), effectiveness of recommendation engines (probabilidade de adicionar recomendado ao carrinho), virality (boca a boca/compartilhamento por visitante), mailing list effectiveness (CTR e capacidade de fazer comprar). [p.101-102]
- Conversion rate: % de visitantes que compram; segmentar por demografia, texto, referência. Early on, pode importar mais que receita total (prova que alguém compra e dá email/dados). Risco de focar demais: depende do tipo de e-commerce (lealdade, aquisição ou híbrido). [p.103]
- Purchases per year: alta ou baixa conversão podem ser ambas bem-sucedidas, depende do tipo (caixões, uma por vida; mercado, várias por semana). A recompra em ciclo de 90 dias é bom leading indicator do tipo de site. [p.103]
- Shopping cart size: metade da equação; uma campanha pode gerar mais compradores e outra menos compradores gastando mais. Comparar receita total com a forma de aquisição; "profit is what really matters". Citação de Bill D'Alessandro: tratar CAC como custo fixo, então aumentar tamanho do pedido expande a margem. [p.103]
- Abandonment: no mínimo o oposto da conversão; mas deve ser analisado por etapa do funil (carrinho, envio, cobrança; às vezes site de terceiros: Kickstarter/Amazon, Eventbrite/PayPal); pode ser um campo de formulário específico (ex. pedir nacionalidade). [p.104]
- Cost of customer acquisition: somar custo de todos os canais (anúncios, social, listas, afiliados); agregado é fácil, por canal é mais complexo; ferramentas de analytics fazem isso. "E-commerce sites are simple math": ganhar mais vendendo do que gasta achando compradores e entregando. [p.104]
- Revenue per customer (lifetime value): importante em qualquer tipo; aumenta-se por mais conversão, carrinho maior e menos abandono; é métrica agregada e "good, single measure" da saúde do e-commerce. [p.104]
- Caso WineExpress (WiderFunnel): teste A/B de página; variação vencedora deu +41% de receita por visitante (conversão também subiu); vídeo acima da dobra e menos elementos distrativos. Lição: otimize receita por visitante ou CLV, não só taxa de conversão. Há risco explícito de a conversão subir enquanto o tamanho médio do pedido cai. [p.105-108]
- Busca no site: usuários que buscam e não acham, ou buscam e apertam voltar, sinalizam que falta o que querem; categorias muito buscadas sugerem mudar posicionamento ou home. Jason Billingsley: busca interna costuma responder por 5-15% da navegação. [p.108]
- Busca paga: valor da palavra-chave (não cara demais, mas com tráfego razoável); busca orgânica: conteúdo e texto com termos que os pagantes usam. [p.108]
- Recomendações: todas as abordagens se resumem a "quanto de receita adicional geram"; ao ajustar o motor, verificar se moveu a métrica na direção certa. [p.109]
- Virality: menor CAC e recomendação implícita mais alta. [p.109]
- Email: CTR = visitas da campanha / mensagens enviadas; análise sofisticada detalha onde falha (endereços inválidos) e o resultado final (compra); métrica de contribuição da campanha = receita adicional − custo da campanha − perda por descadastros; descadastros por email ruim podem superar o lucro. [p.109-110]
- Offline: frete alto reduz conversão; entrega pontual afeta satisfação e recompra; shipping time e stock availability. Billingsley: itens sem estoque derrubam vendas; rebaixar/esconder itens esgotados em listas e buscas; comparar share de estoque versus share de vendas por categoria. [p.111]
- Wrinkle assinatura: churn é mais fácil de medir mas mais abrupto (a receita simplesmente para); acompanhar taxa de expiração de pagamento, eficácia de campanhas de renovação e fatores de renovação; ver cap. 9. [p.113]
Citações curtas de prova:
- "I see too many leaders trying to increase loyalty." [p.100]
- "But don't get too caught up in top-line revenue; profit is what really matters." [p.103]
- "Revenue per customer is really an aggregate metric of other key numbers" [p.104]
Takeaway do livro (paráfrase): a métrica final é o produto de conversão, compras repetidas e tamanho da transação, isto é, receita por cliente. [p.113]
O que este trecho NÃO diz: não dá benchmark de taxa de conversão nem de abandono; os números de recompra (40/60%, 15/30%) são atribuídos a um consultor (Hillstrom), não derivados de dados do livro; a metodologia do estudo McKinsey não é descrita (a figura 8-1 é imagem não lida).
Relevância para os artefatos candidatos: product-metrics: ALTA, tabela de modos por recompra, métricas de e-commerce, armadilha conversão vs receita por visitante.
Decisão sugerida: usar em product-metrics (referência por modelo de negócio: e-commerce).

---

### Cap. 9: Model Two: SaaS (PDF p.115-128, impr. 89-102)
Resumo: SaaS vive de assinatura (às vezes por consumo), tiers e freemium; o custo marginal é baixo. Métricas seguem o ciclo de vida (atenção, inscrição, stickiness, conversão, receita, CAC, viralidade, upsell, uptime, churn, LTV). Foca-se primeiro no maior risco, engajamento e churn, e há uma discussão detalhada sobre como calcular churn sem enganar-se.
Conceitos e regras:
- Métricas-chave com definição: Attention (eficácia em atrair visitantes), Enrollment (visitantes que viram usuários gratuitos/trial), Stickiness (quanto os clientes usam), Conversion (usuários que pagam e quantos migram para tier superior), Revenue per customer (em um período), Customer acquisition cost (custo de um usuário pagante), Virality (probabilidade de convidar outros e em quanto tempo), Upselling (o que aumenta o gasto e com que frequência), Uptime and reliability (reclamações, escalações, quedas), Churn (usuários/clientes que saem em um período), Lifetime value (valor do cliente "do berço ao túmulo"). [p.116-117]
- Método: descrever o ciclo de vida do cliente para achar as métricas que movem o negócio; usar Lean Startup para identificar o aspecto mais arriscado e melhorar a métrica que o representa. [p.117]
- Armadilha de ordem: nem sempre dá para medir a métrica do risco (sem usuários não há conversão; sem pagantes convidando, não há virality; stickiness com poucas pessoas é difícil se o serviço precisa de massa crítica). É preciso saber onde está o risco e otimizar "just enough", na ordem certa, para que o risco seja quantificável. [p.117]
- Para SaaS, o foco típico é stickiness (raramente há segunda chance de primeira impressão); só se precisa de conversão/atenção suficientes para testar stickiness; os primeiros usuários podem vir de boca a boca, venda direta ou redes sociais, sem campanha automatizada. [p.117]
- Caso Backupify: sequência de métrica por estágio (visitantes do site, depois trials, depois conversões de trial para pago, agora MRR). Início de 2010: pagava US$243 por cliente que pagava US$39/ano ("horrible economics"); backup não é viral; pivô de consumidor para empresas. CLV:CAC de 5-6x (a cada dólar investido, retornam de US$5 a US$6), em parte por churn baixo e lock-in. "CLV and CAC are the two essential metrics for a subscription business." CEO: MRR provavelmente será a métrica principal até US$10M de ARR; monitora churn, mas foca em customer acquisition payback em meses, alvo de 12 meses ou menos por canal; payback é um número único que embute eficiência de marketing, receita por cliente, fluxo de caixa e churn. [p.118-119]
- Resumos do caso: começar por receita sem ignorar custos (lucratividade é a chave do crescimento); hora de escalar quando o motor pago funciona, isto é, CAC é fração pequena do CLV; SaaS prospera com MRR. Lição: a progressão de métricas vai de "alguém se importa?" a "isso escala?"; ao olhar métricas sofisticadas pode-se descobrir um modelo inviável; às vezes se precisa de novo mercado, não novo produto. [p.119]
- Engajamento: a métrica máxima é o uso diário; se o produto não é de uso diário, estabelecer baseline demora mais e o ciclo de aprendizado é mais longo. Evernote: só ~1% dos usuários viram pagantes (40 milhões de usuários), pagantes tendem a ser usuários diários; usuários levam meses ou anos para pagar; o foco é engajamento antes de conversão. [p.119-120]
- Produtos que não são diários (Expensify, Balsamiq; registro de casamento, dentista, impostos): definir barra alta de engajamento apropriada (semanal ou mensal) e medir contra ela ("lines in the sand"). [p.120]
- Early adopters: encontrar o subconjunto viciado, descobrir o que têm em comum, refocar e crescer ("claim your beachhead"); cuidado: early adopters podem não refletir o mainstream (Google Wave; "crossing the chasm" de Geoffrey Moore); também há menos volume de dados nesse estágio. [p.120-121]
- Engajamento: olhar padrões de uso, não só frequência (o que fazem, quanto tempo, quais features, voltaram sozinhos ou por email). Duas análises: segmentar quem faz o que se quer vs. quem não faz para achar diferenças e então atingir esse segmento; testar mudança em subconjunto (ou, se isso causar atrito, comparar coorte posterior à mudança com anterior). [p.121]
- Churn = percentual de pessoas que abandonam o serviço ao longo do tempo; escolher um período (semana, mês, trimestre) e usá-lo em todas as métricas. Em freemium/trial, medir churn separadamente para usuários (não pagantes) e clientes (pagantes). [p.121]
- Definição recomendada: usuário inativo = não fez login em 90 dias (ou menos); ainda assim pode ser reativado com mudança relevante (Path) ou conteúdo diário (Memolane). Pagantes churnam ao cancelar, parar de pagar ou voltar ao plano gratuito. [p.122]
- Fórmula simples (Steven Noble, Shopify): churn = número de churns no período / número de clientes no início do período. Exemplo: 26 perdidos / 1.035 pagantes no início de fevereiro = 2,5%; com 2,5% mensal, o cliente médio fica ~40 meses (100/2,5), base do LTV (40 meses x receita mensal média por usuário). [p.122-123]
- Tabela 9-1 (freemium): usuários novos crescem 20%/mês, 30% usam ao menos uma vez no mês seguinte ao cadastro ("active"), 2% convertem em pagantes. [p.123]
- Complicações: churns acontecem ao longo do período, mas clientes no início são um instantâneo, então a conta simples engana com crescimento variável ou rápido. Correção parcial: denominador = média entre início e fim do período; mas com hockey stick (100 no início, 10.000 no fim) a média assume 5.050 no meio, o que é falso, pois a maioria dos clientes novos e dos churns ocorre no fim do período. [p.123]
- Pior: definir churn como "não voltou em 30 dias" compara perdas do mês passado com ganhos deste mês, é indicador defasado (lagging); quando se descobre o problema, já é o mês seguinte. [p.123]
- Duas simplificações: medir churn por coorte (comparar novos e churnados pela data em que viraram usuários) ou medir churn por dia ("the shorter the time period you measure, the less that changes... will distort things"). [p.123-124]
- Caso ClearFit: assinatura de US$99/mês por vaga confundiu clientes (preço baixo em relação aos job boards, tipicamente mais de US$300, gerou ceticismo; uso esporádico); mudou para taxa por vaga de US$350 por 30 dias; vendas triplicaram e a receita aumentou dez vezes; 30% de crescimento mensal de receita. Lição: o problema era preço e mensagem, não o modelo; "People don't do subscriptions for haircuts, hamburgers, and hiring"; teste preços qualitativa e quantitativamente; não assuma que preço baixo é a resposta; preço faz parte do "produto". [p.125-126]
- Wrinkles: freemium, free trial (converte em assinatura se não cancelar), paid-only (controla custo, previsível, indica valor de imediato; freemium ensina uso e gera boa vontade); tiers de preço exigem upsell constante e complicam previsão. Assinatura favorece planejamento financeiro, mas nem sempre combina com a proposta de valor ou o jeito do cliente pagar. [p.126-127]
- Takeaways do livro: freemium é tática de venda, usar com cuidado; "in SaaS, churn is everything"; medir engajamento muito antes de virar cliente e atividade do cliente muito antes de sumir; SaaS não é sinônimo de assinatura. [p.127]
Citações curtas de prova:
- "CLV and CAC are the two essential metrics for a subscription business." [p.118]
- "In SaaS, churn is everything." [p.127]
- "in an always-connected world, 90 days is an eternity." [p.122]
- "The ultimate metric for engagement is daily use." [p.119]
- "People don't do subscriptions for haircuts, hamburgers, and hiring." [p.125]
O que este trecho NÃO diz: não dá benchmark de churn "bom" além do exemplo de 2,5%/mês (apresentado como ilustração); a tabela 9-1 veio embaralhada pela extração, apenas a conta de fevereiro está legível no texto; o limiar de CLV:CAC "saudável" aparece só como exemplo (5-6x "excelente") e o payback de 12 meses é a meta de um CEO, não regra geral; "CAC pequena fração do CLV" não vem com número.
Relevância para os artefatos candidatos: product-metrics: ALTA, definições SaaS, churn com armadilhas de cálculo, payback, engajamento.
Decisão sugerida: usar em product-metrics (fórmulas e armadilhas de churn; lista de métricas SaaS; CLV/CAC).

---

### Cap. 10: Model Three: Free Mobile App (PDF p.129-138, impr. 103-112)
Resumo: App gratuito com receita de compras in-app e anúncios. A loja de apps limita iterações e a visibilidade na loja pesa muito. As métricas-chave são downloads, CAC, launch rate, usuários ativos (DAU/MAU), % que pagam, tempo até primeira compra, ARPU/ARPPU, ratings, viralidade, churn e CLV.
Conceitos e regras:
- Gatekeeper da app store limita iteração e A/B testing/deploy contínuo; contornos: alimentar conteúdo online sem upgrade do app, validar MVP primeiro no Android, ou usar mercado secundário menor (App Store canadense). [p.129-130]
- Formas de monetização: conteúdo baixável, flair/customização, vantagens, economia de tempo, eliminação de timers, upsell para versão paga, anúncios in-game. [p.130]
- Métricas-chave com definição: Downloads (e posicionamento/ratings na loja), CAC (de usuário e de pagante), Launch rate (baixaram, abriram e criaram conta), Percent of active users/players (DAU, MAU), Percentage of users who pay (quantos já pagaram algo), Time to first purchase (após ativação), Monthly ARPU (compras + anúncios assistidos) e ARPPU (por usuário pagante), Ratings click-through, Virality (quantos outros um usuário convida em média), Churn (desinstalou ou não abre há certo período), CLV. [p.131-132]
- Installation volume: dinâmica da loja pesa mais que quase tudo; destaque na loja eleva muito o volume. Números citados (Distimo): app já no top 100 que é destacado sobe em média 42 posições no Android, 27 no App Store do iPad e 15 no iPhone; Flurry 2012: top 25 do iPhone ≈ 15% da receita total e o restante do top 100 ≈ 17%; destaque na home da App Store rende rotineiramente centuplicação de tráfego (referência citada em nota). [p.132]
- ARPU = receita / número de usuários ativos (ou jogadores), normalmente mensal; inflar o número de ativos reduz o ARPU, então a métrica força a definir realisticamente o que é "engajado". [p.133]
- CLV de jogo: dá para medir pelas médias pós-churn, mas como demora meses/anos, é mais fácil estimar como em SaaS. [p.133]
- Exemplo numérico do livro (jogo gratuito): ~12.300 downloads no mês; 96% abrem e conectam; 30% viram "engajados" (jogam em três dias distintos); cada engajado gera US$3,20/mês; downloads do mês geram cerca de US$11.339 (o livro diz "about"; a conta direta dá ~US$11.335, diferença atribuível a "just over 12,300"); churn de 15%/mês, logo vida média = 1/0,15 = 6,67 meses; receita mensal total ≈ US$75.500; CLV do jogador = ARPU x vida = US$21,33. Com custo de aquisição de um engajado dá para calcular contribuição, ROI de anúncios e tempo de recuperação do investimento. [p.133-134]
- Tensão natural entre metas (tornar o jogo divertido para reduzir churn vs. extrair dinheiro/ARPU); evitar o "money grab"; métricas de jogabilidade (nem fácil nem difícil demais, ninguém travado) e engajamento. [p.133-135]
- Percentual que paga: separar quem nunca paga das "whales"; fazer segmentação e coortes (campanha que traz quem compra mais, repetir); oferecer algo barato a quem ainda não comprou; convencer pagante a pagar mais move pouco o ARPU (poucos pagam) mas muda a receita; tratar pagantes como base separada (comportamento, churn, receita). [p.135]
- Churn: Keith Katz recomenda medir em 1 dia, 1 semana e 1 mês, pois razões diferem (1 dia: tutorial ruim/não engaja; 1 semana: jogo sem profundidade; 1 mês: planejamento de updates ruim). [p.135]
- Wooga: itera semanalmente; escolhe uma métrica-chave por update (ex. retenção), identifica táticas, mede rigorosamente; Jens Begemann revisa 128 pontos de dados por dia. [p.137]
- Wrinkle: anúncios do tipo "promoted download" levam o usuário a sair do app, podendo aumentar churn e reduzir engajamento; medir o impacto de cada fonte de receita no comportamento subsequente. [p.137]
- Takeaway: a maior parte do dinheiro vem de poucos usuários; segmentá-los; métrica-chave ARPU, mas acompanhar também ARPPU. [p.137]
Citações curtas de prova:
- "Track churn at 1 day, 1 week, and 1 month, because users leave at different times for different reasons." [p.135]
- "Most of the money comes from a small number of users" [p.137]
O que este trecho NÃO diz: não dá benchmarks de retenção, % de pagantes ou ARPU (só o exemplo ilustrativo); a Figura 10-1 (fórmulas) e 10-2 são imagens não lidas; a página 128 e 138 estão vazias (separadores).
Relevância para os artefatos candidatos: product-metrics: MÉDIA-ALTA, definições de ARPU/ARPPU/DAU/MAU, churn em 1d/1w/1m, exemplo de cálculo de CLV.
Decisão sugerida: usar em product-metrics (referência modelo mobile/consumo), com o exemplo numérico como ilustração.

---

### Cap. 11: Model Four: Media Site (PDF p.139-149, impr. 113-123)
Resumo: Receita vem de anúncios (sponsorship, display, pay-per-click, afiliados). A métrica depende de inventário (page views) x taxa x CTR; audiência e engajamento importam mais que tráfego bruto; há tensão conteúdo x anúncios e "churn tax".
Conceitos e regras:
- Media sites se importam com CTR/taxas de exibição (receita real) e também com tempo no site, páginas vistas e visitantes únicos (inventário e alcance). [p.139]
- Exemplo do site esportivo (20.000 únicos, 12 sessões/mês, 11 páginas/visita, 17 min/visita): minutos mensais = 4.080.000; page views (inventário) = 2.640.000. [p.140]
  - Sponsorship: contrato de US$4.000/mês, 1 banner. [p.140]
  - Display: US$2 por mil views, 1 banner por página: 2.640.000 x 2 / 1.000 = US$5.280. [p.140-141]
  - Click-through: 2 anúncios por página = 5.280.000 exibidos; 0,80% de clique = 42.240 cliques; US$0,37 por clique = US$15.628,80. [p.141]
  - Afiliados: 1 anúncio por página; 1,20% de clique = 31.680; conversão 4,30% = 1.362,24 (o livro mantém decimais); venda média US$43,50; vendas do afiliado US$59.257,44; 10% para o site = US$5.925,74. [p.142]
  - (Soma dos quatro itens US$30.834,54 não aparece no texto lido; é cálculo deste leitor.)
- Afiliado depende de vários funis (o que trouxe o visitante, o clique, a compra em site de terceiro); frequentemente o operador não sabe o que o visitante comprou, só recebe cheque; afiliado pode ganhar sobre a compra inteira (vantagem da Amazon). [p.142]
- Usar muito espaço de tela com anúncios prejudica a qualidade e o retorno do leitor; sponsorship/display têm preço negociado e dependem de reputação; PPC/afiliado vêm de leilão. [p.142-143]
- Os autores admitem que muitas "vanity metrics" avisadas antes são relevantes para media sites, pois eles ganham de popularidade. [p.143]
- Métricas: Audience and churn, Ad inventory (impressões monetizáveis), Ad rates (às vezes custo por engajamento), Click-through rates, Content/advertising balance. [p.143]
- Audience: unique visitors/mês, mas engajamento importa mais que tráfego; saber quantos visitantes se perde e quantos se ganha. Churn de audiência = (novos visitantes de primeira vez) − (variação de únicos sobre o mês anterior); os novos "compensam" a perda do mês anterior (Tabela 11-6: ex. Abril: +2.000 de crescimento, mas churn de 1.000; campanha eficaz pode mascarar churn). Nota: o texto diz "subtracting the number of unique first-time visitors from the change", mas os números da tabela (fev: 1.200 novos, +1.000 de variação, churn 200) correspondem a novos − variação; tabela veio embaralhada pela extração. [p.143-144]
- "Churn tax": testar layouts com menos anúncios por segmento de visitantes para saber o custo em churn de ter conteúdo comercial e comparar com a receita de anúncios. [p.144]
- Inventory = total de page views únicas no período; estimar por visitantes x páginas por visita (Tabela 11-7, ex. 3.000 x 11 = 33.000); depende do layout e do número de elementos de anúncio por página. [p.144-145]
- Padrão sessions-to-clicks: de 100 cliques de busca, cerca de 95 pousam no site; razão sessões/cliques é indicador de desempenho/confiabilidade; refazer o site da Shopzilla para ser rápido trouxe 3-4% mais visitantes, mas a razão piorou quando o site voltou a ficar lento. [p.145]
- Ad rates: dependem do conteúdo/palavra-chave (media) ou da demografia (rede social). [p.146]
- Trade-off conteúdo x anúncio: muitos anúncios = conteúdo ruim e menos lealdade; conteúdo escrito para palavras-chave lucrativas parece forçado; testar layouts por receita x churn e texto por valor de conteúdo x valor de anúncio; segmentar por autor, tópico, layout. [p.146]
- Wrinkles: afiliado oculto (Pinterest reescrevendo URLs via Skimlinks, polêmica; complica o modelo); ruído de fundo (anúncios em branco tiveram CTR ≈ 0,08%, comparável a algumas campanhas pagas; respondentes se dividiam entre curiosidade e clique acidental; se a receita é pouco acima do ruído, investigue); ad blockers (reduzem inventário e bagunçam analytics); paywalls (de doações a cota mensal de artigos a assinatura total) criam trade-off anúncio x assinatura e um novo funil. [p.148-149]
Citações curtas de prova:
- "engagement is much more important than traffic" [p.143]
- "Many of the vanity metrics we've warned you about earlier are actually relevant to media sites" [p.143]
O que este trecho NÃO diz: não dá benchmarks de CTR (só o exemplo 0,80% e o ruído 0,08% de teste ARF 2012); Fig. 11-1 e 11-2 são imagens não lidas; tabelas 11-6 e 11-7 vieram embaralhadas.
Relevância para os artefatos candidatos: product-metrics: MÉDIA, modelo mídia/anúncios, churn de audiência, fórmulas de inventário e receita.
Decisão sugerida: usar em product-metrics, seção breve (fórmulas de receita por tipo de anúncio; caveat de vanity metrics).

---

### Cap. 12: Model Five: User-Generated Content (PDF p.151-161, impr. 125-135)
Resumo: Em UGC (Facebook, reddit, Twitter, Wikipedia), o objetivo é uma comunidade engajada que cria conteúdo; o funil é de engajamento (lurkers, votantes, comentaristas, postadores, criadores de grupos) e não de compra; receita (anúncios, doações) é incidental ao núcleo do negócio.
Conceitos e regras:
- Conteúdo inclui posts, uploads, votos, comentários, sinalização de spam; métrica central é quantidade de conteúdo bom vs. ruim e % de lurkers vs. criadores. [p.151]
- Funil de engajamento: ordenar os degraus por valor crescente para o negócio; passos não são mutuamente exclusivos; objetivo é mover o máximo de usuários para tiers mais valiosos (reddit: lurking, voting, commenting, subscribing, submitting links, creating subreddits). Analogia com upsell de SaaS: por coorte, quanto tempo leva para subir de estágio. [p.151-155]
- Métricas: número de visitantes engajados (frequência de retorno e permanência), content creation (% que interage), engagement funnel changes, value of created content, content sharing/virality, notification effectiveness. [p.153]
- Engajamento por recência: day-to-week ratio (quantos dos visitantes de hoje estiveram aqui antes na semana); média de dias desde a última visita, excluindo usuários além de um corte (ex. 30 dias), para churnados não distorcerem; para contas: dias desde o último post, votos por dia. [p.153]
- Participação varia; sites de consumo passivo (Wikipedia, YouTube) usam sinais passivos (clickstream, tempo na página) como proxy de avaliação. Estudo Rubicon sobre taxas de participação (figura não lida). [p.154]
- Problema ovo e galinha: UGC precisa de conteúdo para atrair usuários e de usuários para criar conteúdo; pode semear (Wikimedia, que migrou de especialistas para comunidade). No início importam taxa de criação e de cadastro; depois, se conteúdo bom sobe e se há comentários. [p.154-155]
- Método: tabela de funil por coorte/mês (Tabela 12-1: únicos, recorrentes, contas ativas, votantes ativos, novos membros, comentaristas, postadores, criadores de grupo); calcular taxas de conversão de cada etapa por mês (Tabela 12-2) e depois a variação relativa entre meses dessas taxas (Tabela 12-3), para ver o que melhora ou piora após mudanças ("make changes and keep score"). Exemplo: em março uma fração menor de visitantes voltou, mas mais gente comentou/postou. Tabelas 12-2/12-3 chegaram embaralhadas. [p.155-157]
- Eventualmente chega-se a um funil "normal" com percentuais estáveis; UGC tem uma curva de potência (poucos criam a maior parte do conteúdo); exemplos de taxas ideais de funil são remetidos ao cap. 27 (fora deste bloco). Takeaway fala numa divisão 80/20. [p.157, 161]
- Valor do conteúdo: depende do modelo (únicos que o veem, page views, afiliado); medir por coorte ou segmento de tráfego para decidir onde investir em aquisição (ex. Circle of Friends/Circle of Moms). Nota: "unique visitors" é vanity para crescimento do site, mas útil como nota de valor de um conteúdo individual. [p.157-158]
- Compartilhamento: crítico em sites "unwalled garden"; menos em "walled garden" (Facebook); muito compartilhamento ocorre por email e RSS (Tynt estima até 80% por email); rastrear para saber se a virality sustenta o negócio, se uma visita veio de um compartilhamento, e se considerar paywall. [p.158]
- Notificações: eficácia medida como entregas de email (mensagens enviadas e % que geram o resultado), por email, SMS ou app; essenciais para trazer usuários de volta. [p.158-159]
- Wrinkle: criação passiva de conteúdo (check-ins ambientes, carteiras digitais, NFC) vai misturar ruído às medidas de compartilhamento (usuário engajado ou esqueceu de desligar?). [p.160-161]
- Takeaways: engajamento é tudo; prevenção de fraude dá muito trabalho em UGC. [p.161]
Citações curtas de prova:
- "UGC sites have a power curve of content creation" [p.157]
O que este trecho NÃO diz: não dá percentuais de benchmark do funil de engajamento (remete ao cap. 27); Figs. 12-1 a 12-4 são imagens não lidas e os rótulos das tabelas vieram embaralhados.
Relevância para os artefatos candidatos: product-metrics: MÉDIA, funil de engajamento, método de variação relativa de conversões por coorte, day-to-week ratio.
Decisão sugerida: usar em product-metrics (modelo UGC; método de análise do funil de engajamento).

---

### Cap. 13: Model Six: Two-Sided Marketplaces (PDF p.163-176, impr. 137-150) [continua: PDF p.176 termina com a Figura 13-1; próximos conteúdos no bloco seguinte]
Resumo: Marketplace ganha quando comprador e vendedor concluem a transação. Definição estreita do livro; o desafio é atrair dois lados (foco em quem tem o dinheiro: compradores). Métricas por categorias (buyer, seller, transactions), com linhas na areia, razões e taxas, e atenção à satisfação das transações e à fraude.
Conceitos e regras:
- Definição estreita de two-sided marketplace usada no livro: vendedor lista e promove; dono do marketplace tem postura "hands off" nas transações; comprador e vendedor têm interesses concorrentes (por isso sites de namoro são excluídos). [p.164]
- Quebrar o ovo e a galinha: focar em quem tem o dinheiro (geralmente compradores), pois "se há quem queira gastar, é fácil achar quem queira ganhar". [p.164]
- Caso DuProprio: 17.000 imóveis, ~5 milhões de visitas/mês; taxa única de ~US$900 por anúncio; no início, o único KPI era o número de placas nos gramados e imóveis listados; depois visitor-to-listing (saúde do marketplace); depois list-to-sold e preço médio de pacote; regra de bolso inicial "1.000 visitas = 1 assinatura" ("rudimentary conversion rate"); hoje o maior número é o sold-to-list ratio: "if the property doesn't sell, we don't have a business". Compra-se contra dados do mercado imobiliário (CMHC e CREA) região por região. Apenas ≤5% dos visitantes criam conta de comprador. [p.165-167]
- Lições do caso: no início, cresce-se o inventário à mão ("do things that don't scale"); taxa por listagem/transação pode ser melhor que comissão; site estático e curado pode bastar para provar um marketplace de ticket alto e baixa rotatividade; volume de vendas e receita é "the only metric that matters". [p.167]
- Lição de analytics: começar com o marketplace mínimo que prova demanda, oferta e vontade de transacionar; depois monetizar; as métricas dependem de tamanho e frequência da transação, mas o fundamento é receita por transações. [p.168]
- Semear um lado: lado vendedor (rastrear Craigslist, pedir listagens), lado comprador (fórum, redes sociais), inventário artificial (vender você mesmo), ex. Uber em Seattle pagando US$30/hora a motoristas e só depois mudando para comissão quando a demanda bastava; Amazon começou com livros e depois abriu marketplace; Salesforce criou CRM e depois app exchange; "both companies first created demand". [p.168]
- A métrica de saúde da estratégia de semeadura: Uber (quanto motoristas ganhariam em comissão, inventário, tempo de coleta; migrar quando sustentável, com margem de erro razoável); Amazon (compradores de livros retidos e confortáveis, depois tentar novas categorias). [p.169]
- Primeiro passo e primeira métrica: capacidade de criar oferta (inventário) ou audiência (demanda). [p.169]
- Josh Breinlinger: três categorias de métricas: atividade do comprador, atividade do vendedor, transações; modelar primeiro o lado comprador e depois a oferta (inventário total); alerta: contagens de compradores/vendedores/inventário podem ser "infladas" ajustando algoritmos sem melhorar a experiência; focar em atividade de marketplace explícita (lances, mensagens, listagens, candidaturas). [p.169]
- Depois de juntar os dois lados: número e qualidade de listagens, % de buscas com ao menos um item, métricas específicas, vendas e receita; entender o que torna uma listagem desejável; fraude e ofertas ruins. [p.169]
- Exemplo (consoles usados): definem-se "linhas na areia": comprador = ao menos uma compra; comprador engajado = buscou nos últimos 30 dias; vendedor inativo = sem nova listagem nos últimos 30 dias; listagem inativa = não aparece nos resultados de busca ao menos cinco vezes por semana. Razões acompanhadas: visitor/seller, engaged buyer/active seller, engaged buyer/active listing, média de listagens por vendedor, % vendedores ativos, % listagens ativas. Os próprios autores admitem que contagens simples quebram "our rule that good metrics are ratios or rates". [p.170-171]
- Funil de compra: buscas totais, buscas com >1 resultado, cliques para listagens, compras, inventário restante, transações satisfeitas, % satisfeitas, receita, tamanho médio da transação (Tabela 13-5). Medir transações satisfeitas porque pico de insatisfação sugere ganho de curto prazo com dor de longo prazo (reputação, reembolsos). Tabela 13-8 (funil de maio): 55.372 buscas = 100%; 44.853 com resultado = 81,00%; 15.520 cliques = 28,03%; 931 compras = 1,68%; 921 satisfeitas = 1,66% (rótulos embaralhados na extração). [p.171, 175]
- Qualidade: buscas por comprador por dia, novas listagens por dia, tamanho médio dos resultados, listagens sinalizadas e %, vendedores/compradores avaliados abaixo de 3/5 (Tabela 13-6, embaralhada). [p.172]
- Lista de métricas: buyer and seller growth (taxa de adição, por visitantes retornantes), inventory growth (listagens por vendedor e completude), search effectiveness (buscas vs. inventário), conversion funnels, ratings and signs of fraud, pricing metrics (leilão: vendedores definindo preço alto demais ou deixando dinheiro na mesa). [p.172-173]
- Taxa de adição de compradores e vendedores é crucial cedo; linha na areia: inventário comparável ao de concorrentes; ou, em mercado único, inventário suficiente para que as buscas retornem um ou mais resultados válidos. Acompanhar a variação ao longo do tempo (crescendo: onboardar vendedores para que listem rápido; estagnando: gastar para achar vendedores ou subir listagens por vendedor e conversão). [p.173]
- "Long-term, you can always buy supply, but you can't buy demand." "When it comes to sustainable competitive advantage, demand beats supply." [p.173]
- Inventário: listagens por vendedor e completude; se o mercado satura (maioria dos vendedores já cadastrados), o crescimento vem de mais listagens e de sua eficácia. [p.174]
- Buscas: contar buscas sem resultado (venda perdida); termos de busca sem resultado revelam demanda (ex. "Nintendo" sugere categoria); razão busca/listagem clicada é etapa do funil. [p.174]
- Ratings/flags: sinalização por usuários; aumento brusco de listagens sinalizadas indica fraude; queda em notas indica problema de expectativa; começar por essas métricas e depois investigar (bug técnico, usuário malicioso, etc.). [p.175-176]
Citações curtas de prova:
- "Long-term, you can always buy supply, but you can't buy demand." [p.173]
- "If the property doesn't sell, we don't have a business." [p.167]
- "it breaks our rule that good metrics are ratios or rates" [p.171]
O que este trecho NÃO diz: não dá benchmarks de razão comprador/vendedor, conversão ou fraude (todos os números são do exemplo fictício dos consoles); Figura 13-1 não lida; muitas tabelas (13-1, 13-2, 13-6, 13-7, 13-9) chegaram com colunas embaralhadas, não confie nos valores célula a célula.
Relevância para os artefatos candidatos: product-metrics: ALTA para marketplaces, definição estreita, ordem de foco (demanda primeiro), linhas na areia concretas, métrica de satisfação.
Decisão sugerida: usar em product-metrics (referência marketplace).

---

## Candidatos a regra

Procedimentos, critérios, escalas, fórmulas e armadilhas aplicáveis por um agente (todas páginas = PDF):

1. Identificar o modelo de negócio antes de escolher métricas; as seis categorias do livro: e-commerce, SaaS, app móvel gratuito, mídia, UGC, marketplace de dois lados. [p.96] "If you're running an e-commerce business where you sell things to customers, turn to Chapter 8." [p.96]
2. Não confundir tática/forma com modelo: freemium é tática de marketing; SaaS é forma de entrega; anúncios são forma de receita. [p.93] "Freemium isn't a business model—it's a marketing tactic." [p.93]
3. Descrever o negócio em blocos grossos (receita, custos, risco) estilo "limonada" antes de métricas. [p.90] (sem citação literal curta; ideia em paráfrase).
4. Cinco knobs de crescimento (more stuff, people, often, money, efficiently); early on, stickiness costuma ser o knob a priorizar. [p.90-91] "Early on, stickiness tends to be a key knob on which to focus" [p.91]
5. Segmentar usuários valiosos de "drive-by"; não "customer counting". [p.92-93] "Not all customers are good." [p.93]
6. E-commerce: calcular taxa de recompra anual e classificar: <40% acquisition, 40-60% hybrid, >=60% loyalty; proxy de 90 dias: 1-15% acquisition, 15-30% hybrid, >30% loyalty; não tentar forçar fidelidade em acquisition mode. [p.99-100] "If less than 40% of last year's buyers will buy this year" [p.99]
7. E-commerce: otimizar receita por visitante/CLV, não só conversão; conversão pode subir com carrinho menor. [p.105-108] "You want high revenue per visitor, or high customer lifetime value (CLV)" [p.108]
8. E-commerce: métrica final = conversão x compras repetidas x tamanho da transação = receita por cliente; atenção ao lucro, não só à receita. [p.103, 113] "profit is what really matters" [p.103]
9. E-commerce: abandono por etapa do funil, não só agregado. [p.104] "It's important to analyze it for each step" [p.104]
10. E-commerce: campanha de email = receita adicional − custo − perda por descadastros; CTR = visitas / mensagens enviadas. [p.110] "the added revenue from the campaign, minus the cost of the campaign and the loss due to unsubscribes" [p.110]
11. SaaS: focar no maior risco, mas "just enough" de otimização das etapas anteriores para tornar o risco mensurável; stickiness primeiro, em geral. [p.117] "they seldom get a second chance to make a first impression" [p.117]
12. SaaS: CLV e CAC como métricas essenciais de assinatura; hora de escalar quando CAC é pequena fração do CLV; payback do CAC em meses (meta citada: <=12 meses por canal); MRR como foco até ~US$10M de ARR (opinião do CEO do caso). [p.118-119] "CLV and CAC are the two essential metrics for a subscription business." [p.118]
13. SaaS: churn = churns no período / clientes no início do período; usuário inativo = sem login em 90 dias (ou menos); vida média = 1/churn; LTV = vida x receita mensal média por usuário; separar churn de usuários e de clientes. [p.121-123] "defining an inactive user as someone who hasn't logged in within 90 days (or less)" [p.122]
14. Churn: armadilhas do cálculo simples com crescimento rápido (denominador instantâneo; média início/fim também falha; definir churn como "30 dias sem voltar" gera indicador defasado); mitigação: churn por coorte ou churn diário. [p.123-124] "The shorter the time period you measure, the less that changes during that specific period will distort things." [p.124]
15. Engajamento: métrica definitiva = uso diário; para produtos não diários, definir a barra (semanal/mensal) apropriada e medir contra ela; olhar padrões de uso, não só frequência de login. [p.119-121] "The ultimate metric for engagement is daily use." [p.119]
16. Para decidir se uma mudança funcionou: testar em um subconjunto e comparar; se não der, comparar coortes posteriores e anteriores à mudança. [p.121] "compare the cohort of users who joined after the feature was added to those who came before" [p.121]
17. Early adopters podem não refletir o mainstream; "claim your beachhead" mas cuidado com o chasm. [p.120-121] "Their needs might not reflect those of the bigger, more lucrative mainstream." [p.120]
18. Preço faz parte do produto; testar qualitativa e quantitativamente; preço baixo pode sinalizar baixo valor; nem todo SaaS deve ser assinatura (ClearFit: de US$99/mês para US$350 por vaga, vendas x3, receita x10). [p.125-126]
19. Mobile: ARPU = receita / usuários ativos (período mensal tipicamente); definir "engajado" de forma realista (ex. jogou em três dias distintos); CLV = ARPU x (1/churn); medir ARPPU e pagantes separadamente (whales). [p.131-135] "Treat your paying users as a separate customer base" [p.135]
20. Mobile: churn em 1 dia, 1 semana, 1 mês, cada um com causa diferente. [p.135] ver citação acima.
21. Mobile: uma métrica-chave por atualização; medir; adaptar (Wooga). [p.137] "It picks a key metric to focus on for an update" [p.137]
22. Mídia: receita = inventário (page views) x taxa x CTR; sessões = únicos x sessões por mês; inventário = únicos x páginas/visita; "churn tax" de anúncios por teste de layout; teste ARF: CTR de anúncio em branco ~0,08% como ruído de fundo. [p.140-148]
23. Mídia: churn de audiência = novos visitantes de primeira vez − variação de únicos; campanhas eficazes podem mascarar churn. [p.144]
24. UGC: ordenar degraus do funil de engajamento por valor para o negócio; calcular conversão de cada degrau por mês/coorte e a variação relativa mensal; day-to-week ratio; média de dias desde a última visita com corte (ex. 30 dias). [p.153-157]
25. UGC: unique visitors é vanity para crescimento do site, mas válido para valor de um conteúdo individual. [p.157, nota de rodapé] "Earlier we warned that the number of unique visitors was a vanity metric" [p.157]
26. Marketplace: modelar compradores primeiro; usar atividade explícita (lances, mensagens, listagens, candidaturas) em vez de contagens infláveis; "you can't buy demand"; semear o lado certo; migrar do mercado artificial para o sustentável quando as métricas de sustentabilidade forem atingidas (Uber). [p.164, 168-169, 173]
27. Marketplace: definir linhas na areia explícitas (comprador = 1+ compra; engajado = buscou nos últimos 30 dias; vendedor inativo = sem nova listagem em 30 dias; listagem inativa = menos de 5 aparições em busca por semana); preferir razões/taxas a contagens; medir satisfação das transações, buscas sem resultado, % listagens sinalizadas (aumento brusco = fraude), notas abaixo de 3/5. [p.170-176] "Drawing a line in the sand, we decide someone is a buyer if she's made at least one purchase" [p.170]
28. Para todos os modelos: a métrica de cada estágio muda; sequência de perguntas: "alguém se importa?" até "isso escala?". [p.119] Backupify: visitantes, depois trials, depois conversões para pago, depois MRR. [p.118]

## Checklist de cobertura
- Primeira página lida: 89
- Última página lida: 176 (conferido por Grep: último marcador é "=== PDF PAGINA 176 ===", linha 3496)
- Páginas sem texto útil ou ilegíveis: PDF p.128, 138, 150, 162 (em branco, separadores de capítulo)
- Problemas de extração observados: tabelas 9-1, 11-6, 11-7, 12-2, 12-3, 13-1, 13-2, 13-6, 13-7, 13-9 e partes de 13-5/13-8 saíram com colunas e rótulos embaralhados (valores célula a célula não confiáveis); figuras (7-1, 7-2, 8-1 a 8-5, 9-1, 10-1, 10-2, 11-1, 11-2, 12-1 a 12-4, 13-1) são imagens e NÃO foram lidas (inclusive Fig. 8-1, o impacto do preço no lucro, e Fig. 10-1, as fórmulas do app); notas de rodapé com URLs não verificadas; hifenização "Writethatname", "Affilate" etc. preservadas como no texto.
- Capítulos/seções cobertos integralmente: caps. 7, 8, 9, 10, 11, 12 (do início ao fim); cap. 13 até o fim do texto disponível no bloco (PDF p.176, antes das Key Takeaways).
- Capítulos/seções que continuam em outro bloco: cap. 13 (a partir da Figura 13-1: wrinkles, Key Takeaways e o cap. 14); este bloco começa no início do cap. 7 e continua a partir do bloco anterior (p.1-88) sem continuação de capítulo.
