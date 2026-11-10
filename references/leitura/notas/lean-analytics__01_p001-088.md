# Notas: Lean Analytics (Croll e Yoskovitz, 2013), bloco 01, PDF p.1-88

Convenção de páginas: [p.N] = "PDF PAGINA N". Número impresso = PDF - 26 nos capítulos (ex.: PDF 29 = impr. 3; PDF 87 = impr. 61). Front matter usa algarismos romanos (PDF 19 = impr. xvii).

### Front matter: elogios, copyright, dedicatória, sumário (PDF p.1-18)
Páginas de capa em branco, blurbs, copyright, dedicatória. Sumário em p.15-17: Parte 1 "Stop Lying to Yourself" (cap. 1-4); Parte 2 "Finding the Right Metric for Right Now" (cap. 5-20: frameworks, OMTM, modelo de negócio, 6 modelos [e-commerce, SaaS, mobile app grátis, media site, UGC, marketplace de dois lados], estágios [Empathy, Stickiness, Virality, Revenue, Scale], modelo+estágio define a métrica); Parte 3 "Lines in the Sand" (cap. 21-28: "Am I Good Enough?", linhas de benchmark por modelo, "What to Do When You Don't Have a Baseline"); Parte 4 (cap. 29-31: enterprise, intrapreneurs, conclusão); apêndice e índice. Sem conteúdo técnico para extrair.
Relevância: product-metrics: BAIXA (só estrutura do livro; útil para mapear os capítulos dos blocos seguintes).
Decisão sugerida: descartar o conteúdo; usar o sumário só como mapa.

### Foreword (Eric Ries) (PDF p.19-20)
Resumo: Ries diz que métricas contábeis tradicionais aplicadas à incerteza da inovação são perigosas ("vanity metrics") e que é preciso uma nova disciplina, "innovation accounting". Elogia os benchmarks coletados pelos autores.
Conceitos e regras:
- Vanity metrics = números que fazem a gente se sentir bem mas enganam seriamente; evitá-las exige "innovation accounting". [p.19]
- Previsão exata exige histórico longo e estável; com produto realmente novo a previsão vira quase impossível, então é preciso outra forma de medir progresso. [p.20]
- Construir o produto errado "dentro do prazo e do orçamento" não é motivo de orgulho (paráfrase da crítica ao plano-como-régua). [p.20]
Citações curtas de prova:
- "We call them vanity metrics, the numbers that make you feel good but seriously mislead." [p.19]
O que este trecho NÃO diz: não define innovation accounting em passos; só a nomeia.
Relevância: product-metrics: MÉDIA, origem do termo "vanity metrics" e do enquadramento de innovation accounting.
Decisão sugerida: usar em product-metrics (contexto/definição breve).

### Preface (PDF p.21-26)
Resumo: Posiciona o livro como extensão do Lean Startup: Lean Startup estrutura o progresso e identifica o risco; Lean Analytics mede esse progresso. Descreve as 4 partes e as bases (customer development, Lean Startup, build-measure-learn).
Conceitos e regras:
- Lean Analytics foca o estágio "measure" do ciclo build→measure→learn; quanto mais rápido se percorre o ciclo, mais cedo se acha produto e mercado certos. [p.24]
- Definição de startup (Steve Blank): organização formada para buscar um modelo de negócio escalável e repetível. [p.24]
- Promessa do livro: descobrir modelo de negócio e estágio, achar o One Metric That Matters e traçar uma "line in the sand" para saber quando acelerar e quando frear. [p.22]
- Estrutura: Parte 1 = fundamentos e mentalidade "data-informed"; Parte 2 = 6 modelos e 5 estágios + OMTM; Parte 3 = baselines ("o que é normal"); Parte 4 = aplicação em organizações. [p.23]
- Lean não é ser barato ou pequeno, é eliminar desperdício e se mover rápido. [p.24]
- Innovation accounting (Ries) = construir o produto mínimo necessário e medir objetivamente o desempenho; Lean Analytics quantifica a inovação como "reality check" contínuo. [p.25]
Citações curtas de prova:
- "A startup is an organization formed to search for a scalable and repeatable business model." [p.24]
- "Don't sell what you can make; make what you can sell." [p.21]
O que este trecho NÃO diz: nenhuma métrica, número ou critério operacional; é apresentação.
Relevância: product-metrics: MÉDIA, enquadramento (startup = busca de modelo; Lean Analytics = fase measure).
Decisão sugerida: usar em product-metrics (parágrafo de contexto); descartar o resto.

### Parte 1 (abertura) e Cap. 1 "We're All Liars" (PDF p.27-34)
Resumo: Empreendedores precisam de um "reality distortion field", mas dados são o contrapeso. Caso Airbnb: hipótese testada com Concierge MVP e métrica-chave "shoots per month".
Conceitos e regras:
- Instinto é experimento; dados são a prova. [p.30]
- Concierge MVP: oferecer o valor prometido fazendo manualmente por trás; o risco testado é "as pessoas aceitam isso?", não "consigo construir o software?". Não escala, mas é rápido e barato. [p.32]
- Airbnb: fotos profissionais geraram 2 a 3 vezes mais reservas que a média do mercado no teste; a métrica acompanhada foi "shoots por mês" (já provado que mais fotos = mais reservas); ~5.000 shoots/mês em fev/2012; 20 fotógrafos em meados/fim de 2011. [p.32-33]
- Lição: ao achar uma ideia, decidir como testá-la rápido com investimento mínimo, definir antes como é o sucesso e o que fazer se o palpite estiver certo. [p.34]
- Pensamento Lean/analítico = fazer as perguntas certas e focar na métrica-chave que produz a mudança desejada. [p.34]
Citações curtas de prova:
- "Instincts are experiments. Data is proof." [p.30]
- "Define what success looks like beforehand, and know what you're going to do if your hunch is right." [p.34]
O que este trecho NÃO diz: não dá critérios numéricos de decisão (o "2 a 3 vezes" é resultado do caso, não limiar).
Relevância: product-metrics: MÉDIA, regra "definir sucesso antes do teste"; Concierge MVP como técnica de teste.
Decisão sugerida: usar em product-metrics (princípio de definir critério antes; exemplo curto).

### Cap. 2 "How to Keep Score": o que é uma métrica boa (PDF p.35-39) [núcleo ALTA]
Resumo: Lista critérios de "good metric", o argumento para razões/taxas, o teste "o que farei diferente?", métricas em pares, e as cinco dicotomias de métricas.
Conceitos e regras:
- Em startup, o propósito da análise é achar produto e mercado certos antes do dinheiro acabar; as métricas-chave não são óbvias porque ainda não se sabe bem em que negócio se está. [p.35]
- Critérios de good metric (regras de bolso para "um número que dirige as mudanças buscadas"): (1) comparativa (contra outros períodos, grupos de usuários ou concorrentes; "aumento de conversão vs. semana passada" é mais útil que "2% de conversão"); (2) compreensível (se ninguém lembra e discute, é difícil virar mudança de cultura); (3) razão ou taxa; (4) muda o comportamento (critério "de longe o mais importante"). [p.35-36]
- Por que razões são boas: (a) mais fáceis de agir (velocidade vs. distância percorrida); (b) inerentemente comparativas (valor de hoje vs. média do mês mostra pico vs. tendência); (c) comparam fatores em tensão (ex.: distância / multas; free vs. pago: combinar numa métrica para não aumentar receita às custas de crescimento). [p.36]
- Teste central: "o que você fará diferente com base nas mudanças da métrica?" [p.36]
- Duas famílias que mudam comportamento: métricas "accounting" (ex.: receita diária; devem tornar previsões mais precisas e mostrar se resultados convergem para o plano; base de innovation accounting) e métricas "experimental" (resultado de teste; otimizam produto, preço, mercado). [p.36-37]
- Para experimentais: combinar ANTES de coletar qual mudança de comportamento o resultado causará (exemplos do livro: se o site rosa gera mais receita, adota-se rosa; se mais da metade diz que não pagaria por uma feature, não construir; se o MVP curado não aumenta o tamanho do pedido em 30%, tentar outra coisa). [p.37]
- Traçar uma "line in the sand" impõe disciplina. [p.37]
- Falsas métricas (Seth Godin): atrelar a métrica ao comportamento desejado. Exemplos: vendedor de carro pedindo nota 5 na pesquisa de satisfação (mais esforço para pedir a nota que para entregar a experiência); executivo de vendas que vinculou comissão a número de negócios no pipeline em vez de negócios fechados ou margem, gerando excesso de leads ruins que levaram dois trimestres para limpar. [p.37]
- Se a métrica não está ligada a uma meta e não muda o comportamento, é perda de tempo e pode levar a se iludir que está tudo bem. [p.37-38]
- Métricas vêm em pares: conversão (%) + time-to-purchase (tempo para comprar) informam o fluxo de caixa; viral coefficient + viral cycle time determinam a taxa de adoção. Por trás do par há uma métrica fundamental (receita, caixa, adoção). [p.38]
- Cinco dimensões a ter em mente ao escolher métricas: qualitativa vs. quantitativa; vanity vs. actionable; exploratória vs. de reporte; leading vs. lagging; correlacionada vs. causal (definições abaixo). [p.38]
- KPI = métrica específica que dirige o negócio; cada setor tem os seus (restaurante: covers por noite; investidor: retorno; mídia: cliques em anúncio). [p.39]
Citações curtas de prova:
- "A good metric changes the way you behave." [p.36]
- "what will you do differently based on changes in the metric?" [p.36]
- "A good metric is a ratio or a rate." [p.36]
- "A good metric is comparative." [p.35]
O que este trecho NÃO diz: não dá fórmula nem escore para aprovar uma métrica; os quatro critérios são "rules of thumb". Não lista aqui "explicável/ rápido" etc. além dos citados (a lista no texto é: comparativa, compreensível, razão/taxa, muda o comportamento).
Relevância: product-metrics: ALTA, definição exata de métrica boa, teste "o que farei diferente", razões, pares de métricas, métricas falsas.
Decisão sugerida: usar em product-metrics (seção "Critérios de métrica boa" e "Pares de métricas").

### Cap. 2 (cont.): Qualitativa/quantitativa, vanity vs. real, as oito vanity metrics (PDF p.39-41) [ALTA]
Resumo: Distingue dado qualitativo (por quê) de quantitativo (o quê/quanto) e define vanity metric pelo teste de ação. Dá catálogo de oito vanity metrics e o exemplo "total signups" -> "% de usuários ativos".
Conceitos e regras:
- Quantitativo responde "o que" e "quanto"; qualitativo responde "por quê"; no início se busca dado qualitativo (entrevistas, "get out of the building") e é preciso preparar perguntas sem enviesar o entrevistado. [p.39]
- Vanity metric: dado sobre o qual você não consegue agir; se só massageia o ego, não ajuda. Teste: "O que farei diferente com esta informação?" Se não souber responder, provavelmente não vale se preocupar; se não sabe quais métricas mudariam o comportamento da organização, não é data-driven. [p.39-40]
- Escada do exemplo: "total signups" (vanity: só sobe, nada diz do que usuários fazem) < "total active users" (um pouco melhor, ainda vanity, sobe com o tempo, depende de boa definição de "ativo") < "percent of users who are active" (a actionable: mede engajamento, deve mudar quando o produto muda). [p.40]
- "Number of users acquired over a specific time period" é actionable para comparar canais (ex.: Facebook semana 1, reddit semana 2, AdWords semana 3, LinkedIn semana 4); segmentar por tempo é impreciso; melhor rodar as quatro campanhas em paralelo e agrupar usuários em segmentos (resposta em 1 semana e controla sazonalidade). [p.40]
- Métrica acionável não diz o que fazer, apenas que você faz algo com base nos dados. [p.40]
- Catálogo "Eight Vanity Metrics": (1) número de hits (conte pessoas); (2) page views (só ok se o modelo depende de page views, ex.: inventário de display); (3) número de visitas (uma pessoa 100 vezes ou 100 pessoas 1 vez?); (4) visitantes únicos (só mostra quem viu a home, não o que fizeram); (5) seguidores/amigos/likes (concurso de popularidade até medir quantos agem quando solicitados); (6) tempo no site/número de páginas (substituto ruim de engajamento, a menos que o negócio dependa disso; muito tempo em páginas de suporte é provavelmente ruim); (7) e-mails coletados (testar quantos abrem e agem); (8) número de downloads (pode afetar ranking em lojas; medir ativações, criação de contas ou outra ação). [p.40-41]
Citações curtas de prova:
- "If you have a piece of data on which you cannot act, it's a vanity metric." [p.39]
- "Whenever you look at a metric, ask yourself, 'What will I do differently based on this information?'" [p.39]
- "The real metric of interest—the actionable one—is 'percent of users who are active.'" [p.40]
O que este trecho NÃO diz: não define "usuário ativo" universalmente (diz apenas que depende de boa definição); não dá limiar numérico de atividade neste ponto.
Relevância: product-metrics: ALTA, definição operacional de vanity vs. actionable e catálogo de 8 vanity metrics com a correção sugerida.
Decisão sugerida: usar em product-metrics (tabela "vanity -> alternativa acionável").

### Cap. 2 (cont.): Exploratórias vs. reporting e caso Circle of Moms (PDF p.41-44) [MÉDIA]
Resumo: Usa o quadrante de Rumsfeld (known/unknown) para separar métricas de reporte (contabilidade e experimentos; "known unknowns") de exploratórias ("unknown unknowns", mais relevantes em startup). Caso Circle of Friends -> Circle of Moms.
Conceitos e regras:
- "Known unknowns" = postura de reporte (contar dinheiro, usuários; medir resultado de experimento). "Unknown unknowns" = explorar para descobrir algo novo; no início da startup são o que mais importa. [p.42-43]
- Analytics atua nos quatro quadrantes: checar fatos e premissas, testar intuições (hipótese -> evidência), alimentar planilhas/boards, achar a pepita de oportunidade. [p.42]
- Caso Circle of Friends: 10 milhões de usuários em meados de 2008, mas menos de 20% dos círculos tinham alguma atividade após a criação; análise exploratória no banco achou o segmento "mães" com engajamento muito maior (mensagens 50% mais longas, 115% mais chance de anexar foto, 110% de conversa em thread, amigos convidados 50% mais propensos a engajar, 75% mais cliques em notificações, 180% em news feed, 60% de aceitar convites); pivot em jun/2008, lançamento do Circle of Moms em out/2008; 4,5 milhões de usuários engajados em 2009. [p.43-44]
- Lição: existe massa crítica de engajamento para uma comunidade decolar; melhor engajamento fervoroso em mercado menor e endereçável; "virality requires focus". [p.44]
Citações curtas de prova:
- "In the early stages of your startup, the unknown unknowns matter most" [p.43]
O que este trecho NÃO diz: não prescreve técnica estatística para a exploração; os percentuais são do caso, não benchmarks.
Relevância: product-metrics: MÉDIA, métricas exploratórias vs. reporte e exemplo de segmentação para achar mercado.
Decisão sugerida: usar em product-metrics (uma linha sobre exploratória vs. reporte); caso opcional.

### Cap. 2 (cont.): Leading vs. lagging e correlacionada vs. causal (PDF p.44-47) [ALTA]
Resumo: Define leading/lagging com exemplos; explica que leading indicators exigem análise de coortes e histórico; define correlação vs. causalidade e como provar causalidade.
Conceitos e regras:
- Leading metric tenta prever o futuro (ex.: número de prospects no funil prevê novos clientes); lagging explica o passado (ex.: churn; quando coletado, é tarde, "porta do estábulo fechada depois que os cavalos saíram"). Ambos podem ser acionáveis; leading reduz o ciclo. [p.44-46]
- No início, com poucos dados, meça lagging primeiro; para leading funcionar é preciso análise de coortes e comparação de grupos ao longo do tempo. [p.45]
- Exemplos de leading para churn: volume de reclamações (chamadas de suporte por dia; no início, reclamações em 90 dias). Cancelamento de conta e devoluções são lagging. [p.45]
- Em B2B enterprise: bookings trimestrais = lagging para vendas; novos leads qualificados = leading; mas é preciso conhecer taxa de conversão e duração do ciclo de vendas para estimar o fechamento. Uma lagging de um grupo pode ser leading de outro (bookings: lagging p/ vendas, leading p/ finanças sobre receita). [p.45-46]
- Correlação: duas métricas variam juntas; causalidade: uma causa a outra. Exemplos de armadilha: pneus de inverno x menos acidentes (verão tem mais acidentes por outros fatores); sorvete x afogamentos (ambos causados pelo verão). [p.46]
- Achar correlação é bom (prediz); achar a causa permite mudar o resultado. Causalidade raramente é 1 para 1; várias métricas independentes "explicam" parte da variável dependente; mesmo causalidade parcial tem valor. [p.46]
- Como provar causalidade: achar a correlação e então rodar um experimento controlando as demais variáveis e medindo a diferença. Difícil porque nenhum usuário é idêntico e muitas vezes não se consegue amostra estatisticamente significativa controlada. [p.46]
- Com amostra muito grande dá para testar sem controlar todas as variáveis (Google testando cor de link; Microsoft medindo efeito de latência); startup média deve rodar testes simples, com poucas variáveis, e comparar o efeito no negócio. [p.47]
Citações curtas de prova:
- "Leading metrics give you a predictive understanding of the future; lagging metrics explain the past." [p.38]
- "correlation is good. Causality is great." [p.47]
- "You prove causality by finding a correlation, then running an experiment in which you control the other variables" [p.46]
O que este trecho NÃO diz: não dá fórmula de tamanho de amostra nem teste de significância; não define "statistically significant" numericamente.
Relevância: product-metrics: ALTA, definições e armadilhas (correlação x causalidade, lagging early, leading precisa de coortes).
Decisão sugerida: usar em product-metrics (seção "Armadilhas: correlação vs. causalidade; leading vs. lagging").

### Cap. 2 (cont.): Moving Targets e caso HighScore House (PDF p.47-49) [ALTA/MÉDIA]
Resumo: A meta inicial é uma linha na areia, não gravada em pedra; pode-se mudar a definição de métrica-chave se for honesto e justificável com dado qualitativo. Caso HighScore House ("usuário ativo").
Conceitos e regras:
- Ajustar metas e a definição de métricas-chave é aceitável desde que seja honesto, reconheça o que muda para o negócio e não seja apenas baixar expectativa para continuar apesar das evidências. [p.47]
- A diferença entre o que se assume e o que usuários fazem pode ser enorme (Flickr: jogo multiplayer que virou upload de fotos). [p.47]
- HighScore House: linha na areia inicial = pais e filhos usam o app 4 vezes por semana cada para a família ser "ativa"; após ~1 mês, % de famílias ativas ficou abaixo; experimentos (fluxo de cadastro, e-mails diários, e-mails transacionais) deram melhora incremental; o CEO ligou para dezenas de pais (churned e pouco ativos) e descobriu que famílias usando 1 ou 2 vezes por semana já obtinham valor; a equipe redefiniu o limiar de "ativo". [p.48-49]
- Sem a linha inicial não haveria benchmark para aprender; a combinação de dado quantitativo e qualitativo foi a chave. [p.49]
- Regra: faça suposições iniciais e metas, mas "não experimente até a exaustão"; baixar a barra só se refletir como segmentos específicos de clientes de fato usam o produto, não "para passar por cima dela" ("isso é trapaça"). [p.49]
Citações curtas de prova:
- "Lower the bar if necessary, but not for the sake of getting over it: that's just cheating." [p.49]
- "You're chasing a moving target" [p.47]
O que este trecho NÃO diz: não oferece número padrão de "usuário ativo"; o 4x/semana é do caso, não benchmark.
Relevância: product-metrics: ALTA, regra de quando é legítimo redefinir uma meta/métrica.
Decisão sugerida: usar em product-metrics (regra: justificar qualitativamente a mudança de limiar).

### Cap. 2 (cont.): Segmentos, coortes, A/B, multivariada e Lean Analytics Cycle (PDF p.50-55) [ALTA]
Resumo: Define segmento, coorte, estudos longitudinais vs. transversais, A/B e multivariada; ilustra com tabelas de coortes (extração das tabelas 2-1 a 2-3 está embaralhada). Apresenta o Lean Analytics Cycle (figura, sem texto) e o resumo do capítulo.
Conceitos e regras:
- Segmento = grupo que compartilha uma característica comum (ex.: usuários de Firefox, clientes que reservam, passageiros de primeira classe); compare segmentos; se um segmento tem desempenho anômalo, investigar o porquê (ex.: Firefox com menos compras; muitos engajados da Austrália: pesquisar e tentar replicar em outros mercados). [p.50]
- Coorte = grupo de usuários que começou junto, analisado ao longo do ciclo de vida; comparar coortes mostra se métricas melhoram com o tempo. Segmentação e coortes valem para qualquer setor. [p.50]
- Exemplo das tabelas (e-commerce, 1.000 novos clientes por mês): a média geral de receita por cliente fica estática (~US$4-5), mas por coorte os clientes que chegam no mês 5 gastam ~US$9 no 1o mês, quase o dobro do mês 1 (US$5), e a queda após o 1o mês é o que precisa ser atacado. Por mês de uso: médias US$7,00; 5,00; 3,00; 1,00; 0,50 nos meses 1 a 5 [valores da linha "Averages", p.52; atribuição exata de células por coorte ilegível, ver problemas de extração]. [p.51-52]
- Lição: misturar clientes velhos e novos esconde o padrão; "coorte" alinha pelo ciclo de vida do cliente; aplica-se a receita, churn, boca a boca viral, custo de suporte etc. A métrica a focar no exemplo: queda de vendas após o 1o mês. [p.52]
- Estudo longitudinal = coortes ao longo da vida natural; transversal (cross-sectional) = grupos diferentes recebem experiências diferentes ao mesmo tempo (ex.: link azul vs. verde). A/B testing = variar um atributo mantendo o resto igual. [p.52]
- Exemplo de A/B: Picatic trocou o CTA de "Get started free" para "Try it out free" e a taxa de cliques subiu 376% em 10 dias. [p.53]
- Só grandes propriedades (Bing, Google) têm tráfego para testar um fator isolado rápido; com mais coisas a testar do que tráfego, usar análise multivariada (análise estatística de quais fatores correlacionam com melhoria da métrica-chave) em vez de testes sequenciais, que atrasam o aprendizado. [p.53]
- Lean Analytics Cycle: encontrar uma métrica significativa e rodar experimentos para melhorá-la até ser "boa o bastante" para passar ao próximo problema ou estágio; eventualmente um modelo sustentável, repetível e crescente que depois se escala. (Fig. 2-3 é imagem; só o texto de entorno foi lido.) [p.53-54]
- Resumo/exercício: listar as 3 a 5 métricas acompanhadas diariamente e checar: quantas são boas, quantas usadas para decisão, quais eliminar, quais novas considerar. [p.55]
Citações curtas de prova:
- "Testing is at the heart of Lean Analytics." [p.50]
- "Each group of users is a cohort—participants in an experiment across their lifecycle." [p.50]
- "Much of Lean Analytics is about finding a meaningful metric, then running experiments to improve it" [p.53]
O que este trecho NÃO diz: não dá tamanho de amostra, nível de significância nem duração mínima de teste. O 376% é resultado de um caso, não benchmark. Passos do ciclo (figura 2-3) não estão no texto extraído.
Relevância: product-metrics: ALTA, definições de segmento/coorte/A-B/multivariada, Lean Analytics Cycle (somente descrição textual), armadilha da média agregada.
Decisão sugerida: usar em product-metrics (seção coortes vs. médias agregadas; Lean Analytics Cycle em 1-2 linhas).

### Cap. 3 "Deciding What to Do with Your Life" (PDF p.57-62) [BAIXA/MÉDIA]
Resumo: Apresenta o Lean Canvas (9 caixas) e os três critérios de Bud Caddell (gosta de fazer, é bom, pode ser pago) para decidir em que trabalhar.
Conceitos e regras:
- Lean Canvas (Ash Maurya) = plano de negócio de uma página, 9 caixas, usado para achar áreas de maior risco: 1 Problem, 2 Customer segments, 3 Unique value proposition, 4 Solution, 5 Channels, 6 Revenue streams, 7 Cost structure, 8 Metrics, 9 Unfair advantage. [p.58-59]
- Intersecção de demanda (produto), habilidade (fazer) e desejo (importar-se); os três rings de Bud: se gosta e é bom mas não é pago, aprender a monetizar; se é bom e pago mas não gosta, aprender a dizer não; se gosta e é pago mas não é bom, aprender a fazer bem. [p.59-60]
- Ganhar dinheiro é "de longe o mais importante" dos três critérios, porque os outros dois dependem do fundador; é preciso extrair dinheiro suficiente pelo valor entregue, sem gastar muito na aquisição, e com processo escalável independente do fundador. [p.61]
- Três perguntas fundamentais: há um problema que vale resolver? A solução é a certa? Eu realmente quero resolvê-lo? [p.62]
Citações curtas de prova:
- "Markets that don't exist don't care how smart you are." [p.57]
O que este trecho NÃO diz: não traz métricas nem números (as métricas por caixa do canvas estão no cap. 5, Tabela 5-2).
Relevância: product-metrics: BAIXA, só a lista de 9 caixas (a caixa "Metrics"); product-discovery-assistant (fora dos candidatos deste bloco): possível.
Decisão sugerida: descartar para product-metrics, salvo menção a Lean Canvas.

### Cap. 4 "Data-Driven Versus Data-Informed" (PDF p.63-67) [ALTA nos 10 pitfalls]
Resumo: Alerta contra otimização cega (máximos locais) e dá o padrão "How to Think Like a Data Scientist" com 10 armadilhas de dados (Monica Rogati). Reconcilia visão grande com Lean.
Conceitos e regras:
- Otimização guiada só por dados alcança máximos locais e pode ter consequências indesejadas (Orbitz/Mac; Omniture: o software aprendeu que imagens de mulheres pouco vestidas geravam mais cliques, em prejuízo da marca; curadores humanos fornecem as imagens para testar). "Humans do inspiration; machines do validation." [p.63-64]
- Analogia do triciclo: dados otimizam o sistema conhecido; humanos acham um sistema novo ("quatro rodas seria melhor"). "Change favors local maxima; innovation favors global disruption." [p.64]
- Dado quantitativo é ótimo para testar hipóteses, mas ruim para gerar novas sem introspecção humana. [p.65]
- Dez armadilhas (Rogati): (1) assumir que os dados estão limpos (ex.: bug que gera 30% de nulos; "tantos usuários no CEP 90210?"); (2) não normalizar (lista de destinos de casamento vira lista de aeroportos movimentados); (3) excluir outliers (21 pessoas com mais de mil usos/dia são fãs ou bots; ignorar é erro); (4) incluir outliers (bons qualitativamente, mas ruins para modelo geral, ex.: "you may also like"); (5) ignorar sazonalidade (hora do dia, dia da semana, mês; "intern" no junho); (6) ignorar o tamanho ao reportar crescimento ("seu pai se cadastrando dobra a base"); (7) data vomit (dashboard sem saber onde olhar); (8) métricas que "gritam lobo" (alertas com limiar sensível demais viram ignorados); (9) "Not Collected Here" (cruzar com dados externos, ex.: CEPs com muitos restaurantes de sushi); (10) focar em ruído (vemos padrões onde não há; deixar vanity metrics de lado e olhar o quadro geral). [p.65-66]
- Conciliar visão e MVP: Lean Startup é o processo para chegar à visão; "não estão construindo um produto, estão construindo uma ferramenta para aprender que produto construir"; "Be Lean. Don't be small."; sem visão grande a empresa fica suscetível a influências externas. [p.66-67]
Citações curtas de prova:
- "Humans do inspiration; machines do validation." [p.64]
- "Ultimately, quantitative data is great for testing hypotheses, but it's lousy for generating new ones" [p.65]
- "Change favors local maxima; innovation favors global disruption." [p.64]
- "Be Lean. Don't be small." [p.67]
O que este trecho NÃO diz: não dá técnicas de limpeza, normalização ou limiares de outlier/alerta; as armadilhas são enumeradas sem procedimento.
Relevância: product-metrics: ALTA, as 10 armadilhas de análise de dados e o limite de "data-driven" (máximos locais) são regras específicas.
Decisão sugerida: usar em product-metrics (checklist de armadilhas; regra "dados testam hipóteses, humanos as geram").

### Parte 2 (abertura) (PDF p.69)
Abertura de parte: promete foco, modelos de negócio e estágios. Sem conteúdo técnico. Relevância: BAIXA. Decisão: descartar.

### Cap. 5 "Analytics Frameworks" (PDF p.71-80) [ALTA]
Resumo: Revisa frameworks existentes (Pirate Metrics, Engines of Growth, Lean Canvas, Startup Growth Pyramid, Long Funnel) e introduz os cinco estágios e "gates" do Lean Analytics: Empathy, Stickiness, Virality, Revenue, Scale.
Conceitos e regras:
- Pirate Metrics (Dave McClure, AARRR): acquisition, activation, retention, revenue, referral; os cinco não seguem ordem estrita (pode-se indicar antes de pagar, voltar várias vezes antes de se cadastrar). Tabela 5-1 (relevantes, função): Acquisition = gerar atenção, orgânica e inorgânica (tráfego, menções, custo por clique, resultados de busca, custo de aquisição, open rate); Activation = transformar visitantes em usuários inscritos (inscrições, cadastros, onboarding concluído, uso ao menos uma vez, assinaturas); Retention = fazer voltar (engajamento, tempo desde a última visita, uso diário e mensal, churn); Revenue = resultados de negócio conforme o modelo (CLV, taxa de conversão, tamanho do carrinho, receita por clique); Referral = convites virais (convites enviados, viral coefficient, viral cycle time). [p.71-72] (a extração da Tabela 5-1 está embaralhada; o mapeamento acima é a leitura mais coerente)
- Engines of Growth (Eric Ries): (a) Sticky: KPI fundamental = retenção de clientes; também churn e frequência de uso, tempo desde a última visita, taxas de abertura/clique de e-mails que trazem usuário de volta; (b) Viral: métrica-chave = viral coefficient (novos usuários que cada usuário traz); crescimento exige coeficiente > 1, mas é preciso descontar churn e perda; também medir as ações do ciclo (conectar e-mail, convidar, receber, agir) e o viral cycle time; (c) Paid: normalmente prematuro ligar antes de saber que o produto é sticky e viral; sustentável = ganhar mais por cliente que o custo de aquisição, de forma consistente; receita só vira "engine" quando parte volta à aquisição; os dois botões são CLV e CAC, mais time to customer breakeven (tempo para recuperar o CAC) por causa de fluxo de caixa e taxa de crescimento. [p.73-74]
- Exemplo de virality: "se cada usuário traz mais 1,5, a base cresce até saturar" (com ressalva de que churn e concorrentes impedem crescimento infinito). [p.73]
- Lean Canvas na prática: usar continuamente, cada caixa como "pass/fail" (se o experimento falha não se avança à próxima caixa); a caixa "Key metrics" não tem experimento mas registra as métricas principais. Tabela 5-2 (métricas por caixa): Problem = respondentes que têm a necessidade / que sabem que a têm; Solution = respondentes que testam o MVP, engajamento, churn, features mais/menos usadas, pessoas dispostas a pagar; Unique value proposition = feedback, ratings independentes, análise de sentimento, descrições nas palavras do cliente, pesquisas; Customer segments = facilidade de achar grupos de prospects, segmentos de palavra-chave, tráfego de funil por fonte; Channels = leads e clientes por canal, viral coefficient e ciclo, NPS, open rate, margem de afiliados, CTR, PageRank, alcance; Unfair advantage = entendimento da UVP, patentes, brand equity, barreiras de entrada, novos entrantes, exclusividade; Revenue streams = CLV, ARPU, conversão, tamanho do carrinho, CTR; Cost structure = custos fixos, CAC, custo de atender o enésimo cliente, custos de suporte, custo de palavras-chave. (atribuição linha a linha da tabela é inferida da ordem; extração embaralhada.) [p.74-76]
- Sean Ellis Startup Growth Pyramid: foca o que fazer após product/market fit; teste de PMF: pergunta "Como você se sentiria se não pudesse mais usar este produto?"; se 40% ou mais dizem "very disappointed", há fit e é hora de escalar. [p.76]
- Long Funnel: o funil hoje vai além do site (redes sociais, afiliados, comparadores, fatores offline e online; várias visitas hesitantes antes da conversão); mede-se injetando um sinal de rastreio no início (ex.: URLs personalizadas para proponentes). Exemplo do site do livro: seguidores de Julien Smith preenchiam menos a pesquisa que os de Eric Ries/Avinash Kaushik, exceto visitantes recorrentes. [p.77-78]
- Lean Analytics Stages and Gates: cinco estágios (Empathy, Stickiness, Virality, Revenue, Scale); para passar de um ao próximo é preciso atingir metas ("gating metrics"). A maior parte do livro é estruturada por esses estágios. Fig. 5-5 (alinhamento com outros frameworks) é imagem não lida. [p.79]
- Classificação dos frameworks: Pirate Metrics e Long Funnel focam em adquirir/converter; Engines of Growth e Growth Pyramid focam em quando/como crescer; Lean Canvas mapeia componentes do modelo. [p.80]
Citações curtas de prova:
- "if 40% of people (or more) say they'd be very disappointed to lose the service, you've found a fit" [p.76]
- "Growth comes from a viral coefficient of greater than one" [p.73]
- "It's usually premature to turn this engine on before you know that your product is sticky and viral." [p.74]
- "The five stages we identified are Empathy, Stickiness, Virality, Revenue, and Scale." [p.79]
O que este trecho NÃO diz: neste bloco não aparecem as métricas-gate de cada estágio nem os números de cada um (virão nos cap. 14-19); não detalha como medir CLV/CAC (aparecem só como "knobs"). A figura 5-5 e figuras 5-1/5-2 não estão no texto.
Relevância: product-metrics: ALTA, AARRR com métricas por etapa, três engines com KPIs, limiar de 40% de Sean Ellis, nomes e ordem dos 5 estágios.
Decisão sugerida: usar em product-metrics (referência de frameworks; estágios; teste 40%).

### Cap. 6 "The Discipline of One Metric That Matters" (PDF p.81-88) [ALTA]
Resumo: Define o OMTM como o único número em foco para o estágio atual; justifica com quatro razões; mostra que se deve fixar uma meta (line in the sand) com duas fontes legítimas de número; e explica o "squeeze toy".
Conceitos e regras:
- Foco: em qualquer momento há uma métrica a ser cuidada acima de todas; foco não é miopia (não é uma só métrica da ideia à venda da empresa). Ries recomenda focar em um engine por vez (ex.: tornar sticky, depois viral, depois receita). [p.81]
- Definição: OMTM é o único número em que você está completamente focado acima de tudo para o estágio atual (ex.: CLV não é significativo ao validar problema, mas pode ser o foco perto de product/market fit). [p.82]
- Sempre se acompanham várias métricas: as importantes são KPIs (reportadas diariamente); outras são arquivadas para uso futuro. "Capture tudo, mas foque no que é importante." [p.82]
- Caso Moz: milhões de visitantes (vanity), mas a métrica que importa é Net Adds = novos assinantes pagos (de trial ou direto) menos cancelamentos; relacionadas: Total Paying, New Free Trials Yesterday, 7-Day Net Add Average; Brad Feld sugeriu rastrear menos KPIs porque não se afetam dezenas de KPIs simultaneamente e "dados demais" geram tempo perdido em reporte sem ação. [p.82-83]
- OMTM é mais importante no início; depois, com escala, haverá mais métricas e equipe para delegar (operações: uptime/latência; call center: tempo em espera). [p.83]
- Teste usado pelos autores (Year One Labs) para avaliar times: sinal de problema se o time não sabe qual é o OMTM, se é a métrica errada para o estágio, se tem várias, ou se não sabe o valor atual. [p.84]
- O OMTM muda com o estágio (aquisição: canais/conversão signup->usuário ativo; retenção: churn, com experimentos de preço, features, suporte), às vezes rapidamente. [p.84]
- Quatro razões para usar o OMTM: (1) responde à pergunta mais importante (a área de maior risco); (2) força a traçar uma line in the sand e ter metas claras; (3) foca a empresa toda (exibir em dashboards/TVs; "data puking" de Kaushik é ruim); (4) inspira cultura de experimentação (falhas planejadas e metódicas são aprendizado e não se punem; evita "big-F Failure"). [p.84-85]
- Caso Solare (restaurante): razão custo de pessoal / receita bruta do dia anterior; acima de 30% é ruim; 24% é "about right"; abaixo de 20% risco de atender mal; razão é simples, imediata, acionável, comparável e fundamental. Segunda métrica leading: reservas às 17h com razão 5 para 1 (50 reservas ≈ 250 covers) em Solare; não vale para o restaurante estrelado (1 para 1) nem para fast food sem reservas. [p.85-86]
- Line in the sand: escolher a métrica não basta; defina o número-alvo (ex.: quantos novos clientes por semana, por canal, justificam dobrar a aposta em aquisição). Sem número, é difícil saber o que fazer após o experimento; fracasso total ou sucesso enorme são óbvios; o difícil é o meio ("big fat middle"). [p.86-87]
- Duas respostas certas para "o que é sucesso": (1) vem do modelo de negócio (ex.: precisa de 10% dos usuários na versão paga para bater metas, então esse é o número); (2) quando o modelo ainda não diz, olhar o que é normal/ideal: baseline do setor, ponto de partida na ausência de outra informação (benchmarks nas Partes 3). [p.87]
- Squeeze toy: otimizar o OMTM espreme a métrica e revela o próximo ponto de atenção (ex.: maximizou matrículas na academia -> agora custo por cliente; aumentou tráfego -> agora conversão; coffee shop com movimento -> agora compras múltiplas). Espere que o OMTM mude. [p.87-88]
- Exercício: escolher dentre as métricas boas a "que você não viveria sem"; a empresa toda poderia trabalhar só nela? O que quebraria? Dá para traçar line in the sand? [p.88]
Citações curtas de prova:
- "at any given time, there's one metric you should care about above all else." [p.81]
- "The OMTM is the one number you're completely focused on above everything else for your current stage." [p.82]
- "There are two right answers to the question of what success looks like." [p.87]
- "Capture everything, but focus on what's important." [p.82]
- "squeezing it in one place makes it bulge out in another." [p.87]
O que este trecho NÃO diz: não lista aqui qual é o OMTM para cada modelo/estágio (virá em cap. 8-20); os números do Solare (30%, 24%, 20%, 5:1) são de um restaurante, não benchmarks de software. Não define limite quantitativo de quantos KPIs são "poucos".
Relevância: product-metrics: ALTA, definição de OMTM, sinais de falha, 4 razões, line in the sand (2 fontes), squeeze toy.
Decisão sugerida: usar em product-metrics (seção OMTM e "linha na areia"; regra de quando o OMTM muda).

## Candidatos a regra (regras específicas do livro, para product-metrics)
1. Teste da métrica boa: perguntar "o que farei diferente com base em mudanças desta métrica?"; sem resposta = vanity. Critérios: comparativa, compreensível, razão/taxa, muda o comportamento. [p.36, p.39] "A good metric changes the way you behave." [p.36]
2. Combinar antes da coleta qual decisão cada resultado dispara (rosa vs. outro; >50% dizem que não pagam -> não construir; MVP curado que não eleva ticket em 30% -> outra coisa). [p.37] "Agree on what that change will be before you collect the data" [p.37]
3. Escada total signups -> total active users -> % de usuários ativos; só a última é acionável. [p.40] "The real metric of interest—the actionable one—is 'percent of users who are active.'" [p.40]
4. Catálogo das 8 vanity metrics (hits, page views, visitas, uniques, followers/likes, tempo no site, e-mails coletados, downloads) e a alternativa de cada uma (contar pessoas, ativações, abertura/ação etc.). [p.40-41] "Number of downloads... downloads alone don't lead to real value." (parafraseado; ver p.41)
5. Métricas em pares (conversão + time-to-purchase; viral coefficient + viral cycle time). [p.38] "metrics often come in pairs" [p.38]
6. Lagging primeiro quando há pouco dado; leading exige coortes e histórico; leading B2B exige também taxa de conversão e duração do ciclo de vendas. [p.45] "measure lagging metrics at first" [p.45]
7. Correlação não implica causa; provar causalidade = correlação + experimento controlado; causalidade raramente 100%. [p.46] "correlation is good. Causality is great." [p.47]
8. Média agregada esconde tendência; usar coortes alinhadas pelo ciclo de vida (mês de uso) para ver melhora de coortes novas. [p.51-52]
9. Redefinir meta só se justificável por dado qualitativo/segmento real, nunca só para atingir a meta. [p.49] "Lower the bar if necessary, but not for the sake of getting over it" [p.49]
10. Dez armadilhas de análise (dados sujos, não normalizar, outliers, sazonalidade, crescimento sem tamanho, data vomit, alertas que gritam lobo, Not Collected Here, ruído). [p.65-66] "Data vomit. A dashboard isn't much use if you don't know where to look." [p.66]
11. Dados otimizam máximos locais; humanos geram hipóteses novas. [p.64] "Change favors local maxima; innovation favors global disruption." [p.64]
12. Teste de product/market fit de Sean Ellis: >=40% "very disappointed" se não pudessem mais usar. [p.76] "if 40% of people (or more) say they'd be very disappointed" [p.76]
13. Viral: crescimento exige coeficiente viral > 1, descontando churn; medir cada ação do ciclo e o viral cycle time. [p.73-74] "Growth comes from a viral coefficient of greater than one" [p.73]
14. Paid engine só depois de sticky e viral; sustentabilidade = ganhar mais por cliente que CAC; medir time to customer breakeven por causa do caixa. [p.74] "usually premature to turn this engine on" [p.74]
15. OMTM: uma métrica por estágio atual; muda com o estágio; sinais de falha do time (não sabe qual é, errada p/ estágio, várias, não sabe o valor atual). [p.82, p.84] "if they had several metrics, or if they didn't know what the current value was" [p.84]
16. Meta numérica: duas fontes legítimas (derivada do modelo de negócio ou do baseline do setor); o difícil é o "meio gordo" do resultado. [p.87] "There are two right answers to the question of what success looks like." [p.87]
17. Cinco estágios em ordem: Empathy, Stickiness, Virality, Revenue, Scale; passagem de um ao próximo condicionada a metas "gating". [p.79] "The five stages we identified are Empathy, Stickiness, Virality, Revenue, and Scale." [p.79]
18. Operar com um engine por vez (sticky -> viral -> paid) e não ligar todos ao mesmo tempo. [p.81] (paráfrase de Ries; ver p.81)
19. Razão de custo de pessoal/receita no Solare como exemplo de métrica combinada de duas variáveis controláveis: simples, imediata, acionável, comparável, fundamental. [p.85] "The ratio works because it's:" [p.85] (cinco atributos listados em p.85)
20. Quase todos os benchmarks numéricos do livro (Parte 3) NÃO estão neste bloco; os únicos números "regra" aqui são 40% (Ellis) e coeficiente viral > 1; os demais (4x/semana, 376%, 30% de ticket, 24% de staff cost, 5:1 reservas, mães +50%...) são exemplos de casos, não baselines.

## Checklist de cobertura
- Primeira página lida: 1
- Última página lida: 88
- Páginas sem texto útil ou ilegíveis: PDF 1, 2, 10, 14, 18, 28, 56, 68, 70 vazias (sem texto); PDF 3-9 são só blurbs; PDF 12-13 copyright e dedicatória; PDF 15-17 sumário.
- Problemas de extração observados: Tabelas 2-1, 2-2 e 2-3 (coortes, p.51-52) e Tabelas 5-1 e 5-2 (p.72, p.75-76) saíram com colunas e linhas embaralhadas; reconstruí só o que era coerente e marquei como inferido. Figuras sem texto (não lidas): P-1 build-measure-learn (p.24), 1-1 gráfico Airbnb (p.33), 2-1 quadrante de Rumsfeld (p.42), 2-2 segmentos/coortes/A-B/multivariada (p.53), 2-3 Lean Analytics Cycle (p.54), 3-1 Lean Canvas (p.58), 3-2 diagrama de Bud Caddell (p.60), 5-1 Pirate Metrics (p.72), 5-2 Growth Pyramid (p.76), 5-3 e 5-4 Google Analytics (p.77-78), 5-5 alinhamento de frameworks e estágios/gates (p.79). Não há marcador [OCR]. Pequenos erros de hifenização/ligadura ("Hawken", "Gmail") não afetaram o conteúdo.
- Capítulos/seções cobertos integralmente: Foreword, Preface, Cap. 1, Cap. 2, Cap. 3, Cap. 4, Cap. 5, Cap. 6 (inclusive o exercício final p.88).
- Capítulos/seções que continuam em outro bloco: nenhum capítulo cortado; Cap. 7 em diante (modelos de negócio, estágios, benchmarks) começam no próximo bloco (PDF p.89+).
