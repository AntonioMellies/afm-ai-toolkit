# Notas de leitura: The Right It (Alberto Savoia), bloco 02, seções 12-13

Fonte: `the-right-it__02_s012-013.txt` (AZW3 convertido, inglês). Cap. 5 "Pretotyping Tools" = s.12; cap. 6 "Analysis Tools" = s.13. Citações literais em inglês; paráfrases em português. Abreviações do livro: MEH = Market Engagement Hypothesis; YODA = Your Own DAta; OPD = Other People's Data; xyz (minúsculo) = hipótese "hipozoomada" testável.

---

## SEÇÃO 12 (cap. 5, "Pretotyping Tools")

### Abertura: o exemplo IBM speech-to-text e a origem do termo "pretotype" (s.12, ## 5, "The IBM Speech-to-Text Example", "Pretotyping")
Resumo: IBM queria validar a demanda por um computador de ditado antes de uma P&D longa e cara. Montou uma estação falsa sem teclado, com um digitador escondido na sala ao lado. Os usuários se impressionaram, mas após algumas horas desistiram (garganta, ruído, confidencialidade). O autor cunha "pretotype" para esse tipo de artefato e o distingue do protótipo.
Conceitos e regras:
- O experimento da IBM validou uma hipótese de mercado (o público-alvo usaria e gostaria?) sem construir a tecnologia; a tecnologia ainda era inviável na época. [s.12, "The IBM Speech-to-Text Example"]
- Quem testa precisa não saber que é simulação; se os usuários suspeitassem do digitador, agiriam diferente e o resultado seria distorcido. [s.12, "The IBM Speech-to-Text Example"]
- Muitos usuários que "em Thoughtland" diziam que comprariam mudaram de ideia após usar de fato por horas. [s.12, "The IBM Speech-to-Text Example"]
- Protótipos servem para responder se dá para construir, como construir, se funciona, tamanho/forma ideal. Pretotipos servem para validar, rápida e barateadamente, se a ideia vale a pena ser construída. São objetivos diferentes que pedem técnicas e vocabulário diferentes. [s.12, "Pretotyping"]
- A palavra "pretotype" implica cronograma em horas (no máximo dias) e orçamento raramente acima de poucas centenas de dólares; 6 meses e US$ 300 mil seria normal para protótipo, mas fora de propósito para pretotipo. [s.12, "Pretotyping"]
- Pretotipo vem de "pre-" (antes do protótipo) + "pretend" (fingir): combina "vem antes" e "fingir". [s.12, "Pretotyping"]
- Premissa do autor: ele colecionou fracassos de mercado "bem executados" (excluindo má execução em Launch/Operations), em que a Premissa da ideia estava errada (The Wrong It), e afirma que quase todos poderiam ter sido evitados por pretotipagem. Isso é afirmação do autor, em experiência e anedotas; ele próprio admite que a evidência é "OPD ou anedótica". [s.12, "In Search of Pretotypes"]
Citações curtas de prova:
- "designed primarily to validate, quickly and cheaply, if an idea is worth pursuing and building in the first place" [s.12, "Pretotyping"]
- "Don’t trust me. Test me!" [s.12, "In Search of Pretotypes"]
O que este trecho NÃO diz: não dá garantia de 100% ("No approach or set of tools can give you a 100 percent guarantee"); não apresenta estudo quantitativo da taxa de prevenção de fracassos.
Relevância: hypothesis-and-experiments: ALTA, define pretotipo vs protótipo e a motivação central (construir The Right It antes de construir It right). product-discovery-assistant: MÉDIA, enquadra "validar demanda antes de construir".
Decisão sugerida: usar em hypothesis-and-experiments (definição, distinção pretotipo x protótipo, perguntas que cada um responde).

### Mechanical Turk Pretotype + exemplo Fold4U (s.12, "The Mechanical Turk Pretotype", "Example: Fold4U")
Resumo: um humano escondido simula a função cara ou inexistente da tecnologia. No exemplo, o inventor Ivan queria US$ 50 mil e 6 meses para construir uma dobradora de roupas; a investidora Angela exige ver pessoas efetivamente pagando. Eles simulam a máquina com secadora velha adaptada e Ivan dobrando as roupas por uma porta traseira escondida.
Conceitos e regras:
- Use Mechanical Turk quando puder substituir tecnologia cara, complexa ou ainda não desenvolvida por um ser humano escondido executando a função. [s.12, "The Mechanical Turk Pretotype"]
- Sequência no exemplo: MEH (clientes de lavanderia pagariam US$ 2-3 extra) -> XYZ Hypothesis ("At least 50% of coin laundry customers will pay $2 to $4 (depending on location) per load...") -> "hypozoom" para xyz específico (50% dos clientes da lavanderia do Lenny colocarão roupa na máquina e pagarão US$ 2). [s.12, "Example: Fold4U"]
- A pesquisa prévia de Ivan (632 entrevistados, 421 dizendo que pagariam) é contrastada com comportamento real: 12% pagaram US$ 2; repetindo 2 semanas com preços e lavanderias diferentes (até US$ 1) o resultado mudou pouco. "Em Thoughtland" disseram que pagariam; quando precisou "skin in the game" (moedas), poucos fizeram. [s.12, "Example: Fold4U"]
- O resultado é registrado na forma: xyz hypothesis + YODA (ex.: "12% of Lenny’s coin laundry customers paid $2..."). [s.12, "Example: Fold4U"]
- Se o número real fica abaixo de 15% (vs. 50% do plano), Ivan terá de revisar muitos pressupostos; o autor diz "não necessariamente" que a ideia morre. [s.12, "Example: Fold4U"]
- Final alternativo (78% pagaram; média 62% após o efeito novidade cair): a novidade infla o engajamento inicial; olhe a média após estabilizar. YODA positivo também ajuda a captar investidores e a vender para clientes B2B. [s.12, "Example: Fold4U"]
- Custo do experimento: US$ 200 ao dono da lavanderia, uma secadora velha, gravação de ruído e sino. [s.12, "Example: Fold4U"]
- Duas vantagens declaradas: se YODA não valida, salva de falha provável; se valida, ajuda a recrutar parceiros, investidores e clientes. [s.12, "Example: Fold4U"]
Citações curtas de prova:
- "replace costly, complex, or yet-to-be-developed technology with a concealed human being" [s.12, "The Mechanical Turk Pretotype"]
- "when the time came to actually put some skin in the game" [s.12, "Example: Fold4U"]
O que este trecho NÃO diz: não define tamanho de amostra para o experimento (o experimento do Lenny não informa N); não diz que 12% é "falha" por regra geral, só contra a meta de 50% de Ivan.
Relevância: hypothesis-and-experiments: ALTA, Mechanical Turk (Wizard of Oz) e a cadeia MEH -> XYZ -> xyz com meta numérica antes do teste. product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments (catálogo de técnicas + exemplo de cadeia de hipóteses).

### Pinocchio Pretotype (PalmPilot, Smart Horn, Smart Speaker/HAL) (s.12, "The Pinocchio Pretotype", "You Say Proto, I Say Preto")
Resumo: um objeto não funcional (bloco de madeira, adesivos, lata de feijão) é usado "como se" funcionasse, por um tempo prolongado, para o próprio criador descobrir se, como e quanto usaria. Jeff Hawkins usou um bloco de madeira por semanas; o autor usou uma lata de feijão chamada "HAL".
Conceitos e regras:
- Objetivo do Pinocchio: testar se, como e com que frequência alguém usaria, não se dá para construir. Hawkins registrou, por exemplo, carregar o aparelho 95% do tempo, ~12 usos/dia e distribuição de usos (agenda 55%, contatos 25%, to-do 15%, notas 5%). [s.12, "The Pinocchio Pretotype"]
- Estrutura do caso PalmPilot citada como "princípios do pretotipo": reconhecer que o erro anterior (GRiDPad) foi construir The Wrong It e não construir It wrong; comprometer-se a construir The Right It antes de It right; coletar YODA de primeira mão para guiar o design. [s.12, "The Pinocchio Pretotype"]
- Fingir é parte essencial: maquetes não funcionais são comuns, mas usá-las como se funcionassem, por tempo longo, é raro. [s.12, "The Pinocchio Pretotype"]
- Limite reconhecido: amostra de um (o próprio criador) não basta para o mercado; é o primeiro teste (se nem o inventor usaria, falha cedo). [s.12, "The Pinocchio Pretotype"]
- Perguntas que pretotipos respondem: usaria? como, quanto, quando? outros comprariam? quanto pagariam? Isso leva à pergunta "Should we build it?". Perguntas de protótipo (dá para construir? funciona? tamanho/custo?) costumam ter resposta positiva, na visão do autor. [s.12, "You Say Proto, I Say Preto"]
- Smart Horn: adesivos no volante simulam 4 botões por 2 semanas; versão melhorada com botões contadores; convencer família/amigos a fingir junto. [s.12, "Example: Smart Horn"]
- Smart Speaker: a lata de feijão revelou necessidades (3 dispositivos, botão "Stop Listening", modo sussurro); o autor afirma que isso o convenceu em uma semana. Evidência é autorrelatada e anedótica. [s.12, "Example: Smart Speaker, or Voice-Controlled Assistant"]
Citações curtas de prova:
- "Remember, pretending is an important part of pretotyping." [s.12, "The Pinocchio Pretotype"]
O que este trecho NÃO diz: não oferece método de amostragem para além do criador; a "validação" do autor com HAL é de uma pessoa só.
Relevância: hypothesis-and-experiments: ALTA, técnica Pinocchio (uso próprio simulado) e a lista de perguntas pretotipo vs protótipo. product-discovery-assistant: MÉDIA, "usar você mesmo antes de pedir a terceiros".
Decisão sugerida: usar em hypothesis-and-experiments.

### Fake Door Pretotype (Kevin Kelly, Heigen/jogos, Antonia, Sandy, ética) (s.12, "The Fake Door Pretotype", "Example: Antonia’s Antique Bookstore", "Example: A Guide to Squirrel Watching", "More on the Ethics of Fake Door Pretotypes")
Resumo: coloca-se uma "porta da frente" (anúncio, site, brochura, fachada) para fingir que o produto existe e conta-se quem bate. Se pouca gente bate, volta-se à prancheta. Exemplos: anúncio de catálogo de guias de viagem a US$ 1 (Kevin Kelly, ~US$ 200), anúncios de jogos concorrentes, placa em loja vazia, landing page de livro com botão "Buy Now".
Conceitos e regras:
- Nome vem de Jess Lee (Polyvore). Se não houver interesse suficiente, revisar ideias e hipóteses. [s.12, "The Fake Door Pretotype"]
- Comparação de várias ideias: publicar anúncio para cada jogo e comparar respostas (127, 15, 255, 3). A opinião pessoal ("torcia por Tapeworm") perde para dados. Priorizar a de maior resposta e investir mais em anúncios dela. [s.12, "The Fake Door Pretotype"]
- Compensar quem bateu na porta (cupom, jogo grátis) para torná-lo win-win. [s.12, "The Fake Door Pretotype"]
- Antonia: MEH = pelo menos 0,5% (1 em 200) dos passantes por dia visitarão a loja; custo US$ 22 + algumas horas; observa passantes, quantos notam a placa, quantos param e batem, quantas batidas, perfil. Resultado: 3 batidas em 4.000 passantes (<0,1%) e 0 em 5.000. Conclusão do autor: não abandonar a ideia, mas revisar a MEH e o plano (publicidade; talvez online). [s.12, "Example: Antonia’s Antique Bookstore"]
- Sandy (livro): domínio (US$ 10), site gratuito, botão "Buy Now for $20" que leva à mensagem de "ainda não pronto" e formulário de email; anúncio de US$ 60; mede CAC = gasto em anúncios / cliques em "Buy" (ex.: US$ 60 / 15 cliques = ~US$ 4, vs. US$ 20 de preço); custo total ~US$ 100 e poucas horas. Se 1 ou 2 cliques, revisar marketing ou MEH. [s.12, "Example: A Guide to Squirrel Watching"]
- Ética: o autor admite "pequeno engano"; não usar com categorias como dispositivos/serviços médicos; usar "com extrema consciência" para todos. Soluções: ser transparente e recompensar quem bateu (ex.: vale-presente de US$ 10, brinde), ou usar o Facade. Argumento: comparado ao custo de falhar (Antonia endividada em US$ 100 mil; Sandy com 50 caixas de livros), o inconveniente é desprezível. [s.12, "More on the Ethics of Fake Door Pretotypes"]
- Contraponto Thoughtland: Antonia com survey na esquina (77% dizem que amariam) projeta US$ 14 mil/mês, assina lease e falha; atribui a viés de confirmação e ao ignorar "naysayers". [s.12, "More on the Ethics of Fake Door Pretotypes"]
Citações curtas de prova:
- "data beats opinions" [s.12, "The Fake Door Pretotype"]
- "putting up a front door (e.g., an ad, a website, a brochure, a physical storefront) to help you pretend that the product or service exists" [s.12, "The Fake Door Pretotype"]
O que este trecho NÃO diz: não dá limiar universal de "bom" CTR ou CAC; os limiares (0,5%, US$ 4) são do exemplo. Não diz que a Fake Door é sempre aceitável eticamente.
Relevância: hypothesis-and-experiments: ALTA, Fake Door, métrica de interesse (batidas/cliques), CAC, comparação entre alternativas, ética e compensação. product-discovery-assistant: ALTA, teste de demanda barato.
Decisão sugerida: usar em hypothesis-and-experiments (catálogo, passos, ressalvas éticas).

### Facade Pretotype (CarsDirect, Antonia revisitada) (s.12, "The Facade Pretotype")
Resumo: como o Fake Door, mas quem bate na porta é atendido e recebe algo real. Bill Gross colocou o site CarsDirect no ar numa quarta-feira à noite, recebeu 4 pedidos na manhã seguinte, desligou o site e só então construiu a empresa.
Conceitos e regras:
- Diferença central: Fake Door entrega desculpa ("indisponível"); Facade entrega o produto/serviço (manualmente, com perda). [s.12, "The Facade Pretotype"]
- Quando escolher Facade em vez do Fake Door mais barato: (1) Fake Door seria antiético ou ilegal (ex.: fingir cura de doença); (2) aprende-se mais (processo, papelada financeira e legal, back-end da venda); (3) cheques reais convencem investidores mais que contagem de cliques. [s.12, "The Facade Pretotype"]
- Antonia revisitada: alugar o espaço por poucos dias, estantes com livros que ela já tem, atender e perguntar o tipo de livro e a faixa de preço (ex.: edição de US$ 200); capta tipo de cliente, livros procurados, preço aceitável. [s.12, "Example: Antonia’s Antique Bookstore Revisited"]
Citações curtas de prova:
- "when potential customers knock on that door or click that “Buy” button, someone answers and something happens" [s.12, "The Facade Pretotype"]
O que este trecho NÃO diz: não trata de como escalar entregas manuais nem de riscos legais além de citar "ilegal" em categorias como cura de doença.
Relevância: hypothesis-and-experiments: ALTA, segunda técnica de fachada com entrega real. product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments.

### YouTube Pretotype (Google Glass, Smart Horn, pollution sensor, FeeBird, retorno sobre pretotipagem) (s.12, "The YouTube Pretotype", "Return on Pretotyping Investment")
Resumo: vídeos mostram o produto ainda inexistente. O vídeo sozinho não é pretotipo; precisa ser combinado com um mecanismo que gere YODA com skin in the game. Google Glass: vídeo + programa Explorer (tweet #IfIHadGlass, US$ 1.500, viagem própria a um escritório do Google para ajuste e treinamento) gerou comprometimento real, mas depois a maioria deixou de usar, e o projeto foi cancelado.
Conceitos e regras:
- Visualizações, "joinhas" e comentários não contam como dados. É preciso transformar o vídeo em experimento que gere YODA (cadastro de email, pré-pedido, dinheiro). [s.12, "The YouTube Pretotype"; "Example: FeeBird"]
- Lição Google Glass: interesse e comprometimento inicial são necessários, mas não suficientes; produtos de uso repetido exigem medir engajamento contínuo após o entusiasmo inicial. A combinação vídeo + Explorer permitiu medir o que acontece depois. [s.12, "Example: Google Glass Explorer Edition"]
- Combinar com Pinocchio (Smart Horn: vídeo com botões fictícios e sons editados, oferecendo pré-pedido ou email). [s.12, "Example: The Smart Horn Revisited"]
- Vídeos permitem testar histórias/cenários de marketing (ex.: pais em cidades poluídas para o sensor de poluição). [s.12, "Example: The Portable Pollution Sensor Revisited"]
- Para software: simular o app em PowerPoint/Keynote com slides animados e narração (FeeBird, telas feitas em ~10 min; menos de 1 hora para várias telas). Depois, site dedicado ou apresentação a bird-watchers coletando skin in the game. [s.12, "Example: FeeBird"]
- Retorno sobre pretotipagem (FeeBird): 10 horas e US$ 100 vs. ~10 semanas (~400 h de engenharia, milhares de dólares) para descobrir o mesmo (0 skin in the game após 2.000 views e uma apresentação vaiada). [s.12, "Return on Pretotyping Investment"]
- Mesmo reconhecendo que construir o app é "SMOP" (pequeno problema de programação), o custo de construir é não nulo, então valide antes. [s.12, "Example: FeeBird"]
Citações curtas de prova:
- "metrics like views or thumbs-ups don’t count as data" [s.12, "The YouTube Pretotype"]
- "Test a little before you invest a lot." [s.12, "Return on Pretotyping Investment"]
- "initial levels of interest and commitment are necessary, but not sufficient to determine if a product is The Right It" [s.12, "Example: Google Glass Explorer Edition"]
O que este trecho NÃO diz: não dá fórmula para o "retorno" além do exemplo numérico; os números do FeeBird são hipotéticos ("Let’s assume").
Relevância: hypothesis-and-experiments: ALTA, YouTube/vídeo + skin in the game, e a ressalva de que interesse inicial não prova uso contínuo. product-discovery-assistant: ALTA.
Decisão sugerida: usar em hypothesis-and-experiments (técnica + armadilha do "interesse inicial").

### One-Night Stand Pretotype (Virgin, Airbnb, Tesla pop-up) (s.12, "The One-Night Stand Pretotype", "Test a Little Before You Invest a Lot")
Resumo: oferta pontual e de curta duração, sem compromisso longo, só o tempo necessário para coletar dados suficientes. Exemplos: Virgin (quadro-negro, US$ 39, voo fretado), Airbnb (3 colchões de ar, US$ 80 cada, 1 noite + café da manhã), showroom pop-up da Tesla (contêineres, depósito de US$ 5.000).
Conceitos e regras:
- Duração pode ser de horas a alguns meses; é o necessário para coletar dados e decidir; "se quer 100 pontos de dados e consegue em um dia, faça em um dia". [s.12, "The One-Night Stand Pretotype"]
- Aplica "teste um pouco antes de investir muito" à dimensão do tempo: valide a XYZ de longo prazo com xyz de curto prazo antes de assumir leases e compromissos longos. [s.12, "Test a Little Before You Invest a Lot"]
- Tesla: dados de concessionárias de luxo existentes são OPD e não dizem se é bom local para Tesla; combinar showroom pop-up com One-Night Stand e xyz (ex.: pelo menos 0,5% dos visitantes do showroom de Beverly Hills deixarão depósito para o Model S); a métrica é "bom local para Tesla", não "para carro de luxo". Distinguir "tire kickers" de compradores sérios via depósito. [s.12, "Example: Tesla’s Pop-Up Showroom"]
- Airbnb: clientes "arriscaram a pele" ao dormir na casa de estranhos; o autor diz que sua opinião em Thoughtland seria "nunca daria certo". [s.12, "Example: Airbnb"]
- Autocrítica do autor: assinava leases longos sem validação, apenas com opiniões. [s.12, "Test a Little Before You Invest a Lot"]
Citações curtas de prova:
- "validate your long-term XYZ Hypothesis with a short-term xyz experiment" [s.12, "Test a Little Before You Invest a Lot"]
O que este trecho NÃO diz: os relatos de Virgin e Airbnb são resumidos pelo autor de memória e narrativa popular; não traz fontes.
Relevância: hypothesis-and-experiments: ALTA, técnica One-Night Stand e a regra XYZ longa -> xyz curta. product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments.

### Infiltrator Pretotype (Walhub/Wälhub na IKEA) (s.12, "The Infiltrator Pretotype")
Resumo: coloca-se um produto (pequeno lote ou unidade) dentro do canal de venda de terceiros para ver se compram. Justin Porcano colocou Wälhubs na IKEA com camisa de funcionário e etiquetas falsas; clientes levaram ao caixa e acabaram ganhando de graça.
Conceitos e regras:
- Mede interesse real em contexto de compra real (loja física ou online), com skin in the game ("colocar na sacola esperando pagar"). [s.12, "Example: Walhub"]
- Exemplo de YODA: duração de 1 hora; 240 passaram, 12 pegaram (5%), 3 tentaram comprar (1,25%). Nota: números são ilustrativos ("an example of the kind of YODA Justin might have collected"). [s.12, "Example: Walhub"]
- Aprendizados citados por Justin: eficácia da embalagem, preço, melhores locais dentro da loja. [s.12, "Example: Walhub"]
- Alternativa sem risco legal: pagar (ex.: US$ 100) lojistas independentes para expor por algumas semanas; na versão online, usar varejista com tráfego e público certo, oferecendo a receita das vendas ou um aluguel. Preferir negócios pequenos a grandes corporações. [s.12, "Example: Walhub"]
- Observar reações presenciais dá informação qualitativa (ex.: olhar o preço, assobiar e devolver sugere preço alto). [s.12, "Example: Walhub"]
- Risco: o autor reconhece que se pego pode haver problemas; recomenda a versão legal. [s.12, "Example: Walhub"]
Citações curtas de prova:
- "customers putting a Wälhub in their bag expecting to pay for it is as good as it gets" [s.12, "Example: Walhub"]
O que este trecho NÃO diz: não aprova a versão com disfarce como prática recomendada; a recomendação é negociar com lojista.
Relevância: hypothesis-and-experiments: ALTA, técnica Infiltrator e métricas de funil de loja (viu, pegou, tentou comprar). product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments (apenas a versão legal/negociada).

### Relabel Pretotype (Second-Day Sushi, livro 100000000 Programming Jokes) (s.12, "The Relabel Pretotype", "Example: Second-Day Sushi", "Example: Book Covers")
Resumo: muda-se o rótulo de um produto existente para fingir que é um produto novo. Second-Day Sushi: rótulos "1/2 Off" em metade das caixas de sushi em um café. Book Covers: capa falsa em livro existente numa livraria.
Conceitos e regras:
- Fluxo explícito: XYZ -> "hypozoom" -> xyz concreto -> "pretostorming" (brainstorm de formas de pretotipar) -> técnica. [s.12, "Example: Second-Day Sushi"]
- XYZ do sushi: "At least 20% of packaged-sushi eaters will try Second-Day Sushi if it’s half the price of regular packaged sushi." Hypozoom: 20% dos alunos que compram sushi no Coupa Café no almoço de hoje. [s.12, "Example: Second-Day Sushi"]
- Resultado do exemplo: era difícil achar quem aceitasse (o autor não dá números aqui; números hipotéticos aparecem no cap. 6). [s.12, "Example: Second-Day Sushi"]
- Combinar técnicas (Relabel + Infiltrator) reduz custo e tempo: aproveita produto, embalagem, clientela e infraestrutura existentes. [s.12, "Example: Second-Day Sushi"]
- "Say it with numbers": traduzir "a maioria dos programadores comprará" para número; "most" virou "at least 50%", o que o dono da ideia achou otimista; XYZ final: pelo menos 5% dos programadores comprarão o livro por US$ 9,95; xyz: pelo menos 25% dos programadores que veem a capa na prateleira de uma livraria específica pegarão para examinar. Premissa de proxy: se 25% pegam, é plausível que 1 em 5 compre. [s.12, "Example: Book Covers"]
- Após o interesse, revelar o teste, pedir desculpa, dar brinde ou coletar email (skin in the game); confirmar também online. [s.12, "Example: Book Covers"]
Citações curtas de prova:
- "By putting a different label on a product, you can pretend that it’s something other than what it is" [s.12, "The Relabel Pretotype"]
- "Time to “say it with numbers.”" [s.12, "Example: Book Covers"]
O que este trecho NÃO diz: a taxa de conversão "25% pega -> 5% compra" é hipótese do autor, não regra geral; o resultado do sushi não é quantificado nesta seção.
Relevância: hypothesis-and-experiments: ALTA, Relabel, "say it with numbers" e a cadeia XYZ -> xyz com métrica proxy. product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments.

### Variações e combinações: Live Demo, Morsel (Andy Weir), e requisitos de um pretotipo (s.12, "Pretotyping Variations and Combinations", "What Makes a Pretotype a Pretotype")
Resumo: lista de técnicas não é exaustiva; combine e invente. Live Demo: demonstração presencial seguida de captura de email de domínio verificável (stanford.edu) com desconto. Morsel: dar trechos gratuitos de uma obra e pedir skin in the game por mais (Andy Weir/The Martian, 30 mil cópias em 3 meses a 99 centavos).
Conceitos e regras:
- Live Demo xyz: "10% of Stanford students going to the campus bookstore at lunchtime today who stop to watch a three-minute demonstration... will give us their stanford.edu email address". Exigir email real (não descartável). Opção mais forte: cobrar US$ 1 na hora, com reembolso se necessário. Não precisa de app funcional para a demonstração. [s.12, "Example: The Live Demo Pretotype"]
- Morsel: engajamento recorrente (leitores voltando semanalmente, editando e checando fatos) é skin in the game; preço mínimo de 99 centavos foi um mínimo de skin in the game. [s.12, "Example: The Morsel Pretotype"]
- Três requisitos para ser pretotipo: (1) produzir YODA com skin in the game; (2) poder ser implementado rapidamente; (3) poder ser implementado barato. [s.12, "What Makes a Pretotype a Pretotype"]
- Perguntas em aberto que levam ao cap. 6: como escolher pretotipos, quantos experimentos, quanto dado coletar, quando parar. [s.12, "What Makes a Pretotype a Pretotype"]
Citações curtas de prova:
- "A pretotype must produce YODA with skin in the game." [s.12, "What Makes a Pretotype a Pretotype"]
- "A pretotype can be implemented quickly." [s.12, "What Makes a Pretotype a Pretotype"]
- "A pretotype can be implemented cheaply." [s.12, "What Makes a Pretotype a Pretotype"]
O que este trecho NÃO diz: não define "quick" e "cheap" com limites numéricos exatos (apenas "horas, no máximo dias" e "poucas centenas de dólares" em outro trecho).
Relevância: hypothesis-and-experiments: ALTA, critério de três requisitos; Live Demo e Morsel como técnicas. product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments (critério de aceitação do pretotipo).

---

## SEÇÃO 13 (cap. 6, "Analysis Tools")

### Skin-in-the-Game Caliper (Tortell-o-matic, Team A vs Team B) (s.13, ## 6, "The Skin-in-the-Game Caliper")
Resumo: "skin in the game" = ter algo de valor em risco (dinheiro, tempo, reputação). Empreendedores já têm muita; o mercado-alvo precisa colocar a sua antes de você colocar demais. O Caliper atribui pontos a tipos de resposta do mercado, de 0 (opinião) a pontos proporcionais a dinheiro. Duas equipes comparadas: a que tem só visualizações/joinhas pontua 0; a que tem emails validados e pedidos pontua muito.
Conceitos e regras:
- Antes de colocar muita skin própria, obtenha alguma skin do mercado-alvo. Sem skin, as pessoas são "meros espectadores". [s.13, "The Skin-in-the-Game Caliper"]
- Tabela do Caliper (exemplo do Tortell-o-matic, personalizável): opinião (de especialista ou não) = 0; encorajamento ou desencorajamento = 0; email/telefone descartável ou falso = 0; comentários/likes em redes sociais = 0; surveys, enquetes, entrevistas = 0; email validado com entendimento explícito de uso para atualizações do produto = 1; telefone validado com entendimento explícito de contato = 10; compromisso de tempo = 1 ponto/minuto (ex.: demo de 30 min = 30); depósito em dinheiro = 1 ponto/US$ (ex.: US$ 50 na lista de espera = 50); pedido = 1 ponto/US$ (ex.: US$ 250 por uma das 10 primeiras unidades = 250). [s.13, "Example: The Tortell-o-matic"]
- "Validado" = conta real que a pessoa checa e usa, entregue conscientemente para receber informação sobre o produto específico. [s.13, "The Skin-in-the-Game Caliper"]
- Telefone vale 10x email porque as pessoas protegem ao menos uma ordem de grandeza mais o telefone. [s.13, "The Skin-in-the-Game Caliper"]
- Opinião de especialista também vale 0: exemplos do livro (Edsel da Ford, Google Wave e Google Buzz, rejeições de Harry Potter). [s.13, "The Skin-in-the-Game Caliper"]
- Não busque precisão falsa (email = 0,4; telefone = 3,7); pense em ordens de grandeza (1, 10, 100); a separação entre zero (sem skin) e skin importa mais que o valor exato; seja honesto e razoável nos pesos relativos. Ajuste moeda e mercado. [s.13, "The Skin-in-the-Game Caliper"]
- Team A (140 mil views, 20 mil thumbs-ups, 100 thumbs-down, comentários) = 0 pontos e nem informa tempo/gasto. Team B: US$ 400 em anúncios -> 8.000 vídeos assistidos inteiros (0 pontos; mas custo ~US$ 0,05/view) -> 120 emails, 40 não confirmados, 80 válidos (80 pontos; ~US$ 5/email) -> 20 pedidos a US$ 125 (50% de desconto de early adopter) = 2.500 pontos. [s.13, "Example: A Tale of Two Teams"]
- Contexto importa: dados devem vir com custo e condições (quanto se gastou para obter), não só números absolutos. "Qualidade supera quantidade." [s.13, "Example: A Tale of Two Teams"]
- Observação: o autor ainda quer "mais alguns experimentos" para a Team B; é "um começo promissor", não prova. [s.13, "Example: A Tale of Two Teams"]
Citações curtas de prova:
- "Not opinions, not predictions, but skin!" [s.13, "The Skin-in-the-Game Caliper"]
- "No skin = no points." [s.13, "The Skin-in-the-Game Caliper"]
- "$1 counts for 1 skin-in-the-game point." [s.13, "The Skin-in-the-Game Caliper"]
- "Quality of data beats quantity of data" [s.13, "Example: A Tale of Two Teams"]
O que este trecho NÃO diz: os pesos (1/10/1 por min/1 por US$) são "convenção do autor" baseada em "experiência e intuição", não derivados empiricamente; não há limiar mínimo de pontos para "validar" uma ideia; não trata tempo (minuto) como equivalente universal a dinheiro.
Relevância: hypothesis-and-experiments: ALTA, tabela de pontuação de evidência e distinção "dado com skin" x "opinião/métrica de vaidade". product-discovery-assistant: ALTA, critério para classificar evidência de discovery (entrevistas e surveys = 0).
Decisão sugerida: usar em hypothesis-and-experiments (tabela do Caliper e regras de uso); referenciar em product-discovery-assistant.

### The TRI Meter (The Right It Meter) e mapeamento de resultados (s.13, "The TRI Meter", "Example: Second-Day Sushi")
Resumo: escala visual de 5 categorias de probabilidade de a ideia ser The Right It (Very Unlikely 10%, Unlikely 30%?, 50/50, Likely, Very Likely 90%). Cada experimento é uma "seta"; o ponto de partida é a seta preta "Law of Market Failure" apontando para Very Unlikely.
Nota de extração: o texto só dá os extremos "10%" e "90%" e diz "broad 20% increments"; os valores intermediários (30, 50, 70) são inferência aritmética, não escritos. A figura da escala não está no texto.
Conceitos e regras:
- Apenas 5 categorias de propósito: mais categorias sugeririam precisão e certeza que os experimentos não dão. [s.13, "The TRI Meter"]
- Presunção inicial de "culpa": ideia é considerada The Wrong It até haver evidência suficiente (analogia ao tribunal); ônus da prova é de quem propõe. "Exceptional claims require sufficient evidence to support the exception." Só YODA com skin in the game é admitida. [s.13, "The TRI Meter"]
- Pergunta para mapear cada experimento: "Se a ideia for ter sucesso (executada com competência), quão provável seria este experimento produzir este resultado?" Equivale a: se a MEH é verdadeira, quão provável é este dado? [s.13, "The TRI Meter"]
- Guia de mapeamento: dados excedem significativamente a hipótese = Very Likely; atingem ou excedem um pouco = Likely; ficam um pouco abaixo = Unlikely; ficam muito abaixo = Very Unlikely; ambíguos, potencialmente corrompidos ou difíceis de interpretar = 50/50 ou descartar. [s.13, "The TRI Meter"]
- Exemplo sushi (hipótese 20% de 40 caixas = 8 caixas): A 0 caixas (0%) = Very Unlikely; B 2 (5%) = Very Unlikely; C 6 (15%) = Unlikely; D 8 (20%) = Likely (atende o mínimo); E 16 (40%) = Very Likely; F 2 (5%) com artigo no jornal sobre risco de peixe cru = 50/50 ou descartar; G 30 (75%) com grupo de 130 estudantes japoneses visitando = descartar por ser situação atípica. Cuidado para não se enganar com resultados favoráveis. [s.13, "Example: Second-Day Sushi"]
- Nota de consistência: a tabela diz 130 "Japanese students visiting the campus", o texto da análise fala em "high-school students on a college tour from Japan"; o texto fala em "20% = 8 boxes", coerente com 40 caixas. [s.13, "Example: Second-Day Sushi"]
Citações curtas de prova:
- "If our MEH is true, how likely is it that this pretotyping experiment would generate this data?" [s.13, "The TRI Meter"]
- "Exceptional claims require sufficient evidence to support the exception." [s.13, "The TRI Meter"]
O que este trecho NÃO diz: não é um cálculo estatístico (sem p-valor, intervalos de confiança ou fórmula bayesiana); a conversão de "dados vs hipótese" para a seta é julgamento do usuário; não define quantos pontos percentuais abaixo é "um pouco" vs "muito".
Relevância: hypothesis-and-experiments: ALTA, escala de interpretação e tratamento de dados contaminados. product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments.

### How Much Data Do You Need? (s.13, "How Much Data Do You Need?")
Resumo: um único experimento nunca basta, por mais conclusivo que pareça, pois fatores desconhecidos podem distorcer. A quantidade de experimentos deve ser proporcional ao investimento e às consequências de falha.
Conceitos e regras:
- Analogias do autor: casar após um primeiro encontro; contratar com uma única pergunta; arqueiro novato que acerta o alvo no primeiro tiro. [s.13, "How Much Data Do You Need?"]
- Fatores: quanto pretende investir; quanto pode perder; quanta certeza precisa; se os resultados até agora são conclusivos ou não. [s.13, "How Much Data Do You Need?"]
- Regra prática: no mínimo 3 a 5 experimentos; mais se envolver risco significativo (largar o emprego, "apostar a empresa") ou grande investimento. [s.13, "How Much Data Do You Need?"]
- Precisa-se de vários experimentos que validem várias hipóteses xyz. [s.13, "How Much Data Do You Need?"]
Citações curtas de prova:
- "a bare minimum of three to five experiments" [s.13, "How Much Data Do You Need?"]
- "commensurate with the investment and the consequences of failure" [s.13, "How Much Data Do You Need?"]
O que este trecho NÃO diz: "3 a 5" é regra de bolso do autor, sem base estatística; não indica o tamanho de amostra por experimento.
Relevância: hypothesis-and-experiments: ALTA, regra de bolso do número de experimentos. product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments (marcar como convenção do livro).

### Interpreting the TRI Meter: rodadas 1-5 (s.13, "Interpreting the TRI Meter")
Resumo: narrativa de iteração: primeiras setas costumam cair em Very Unlikely; ajustar a ideia (Ideias 2-4), chegar a Likely, e na Ideia 5 confirmar com um segundo conjunto de experimentos. Total do exemplo: 12 experimentos em 5 versões da ideia em cerca de duas semanas.
Conceitos e regras:
- Cenário mais comum: depois de dois experimentos, a primeira versão da ideia mostra baixa probabilidade ("punched in the face"); isso não deve desmotivar; é melhor saber cedo e barato. [s.13, "Round 1: Punched in the Face"]
- Opção após o resultado ruim: rodar mais experimentos da mesma ideia, mas o curso mais lógico é voltar à prancheta e ajustar a ideia com o que aprendeu. [s.13, "Round 1: Punched in the Face"]
- Variações subsequentes saem da zona Very Unlikely; o progresso é medido ao longo das versões (ideia 4 = primeiro Likely). [s.13, "Rounds 2–4: We Take Some, We Give Some"]
- Na versão 5, três setas Likely/Very Likely ainda podem não bastar contra a Law of Market Failure se o investimento for grande; roda-se mais três experimentos para confirmar; o autor trata isso como forte evidência, não certeza. [s.13, "Round 5: We Land a Few Good Punches"]
- Pressuposto: experimentos bem desenhados/executados e interpretação justa. [s.13, "Round 5: We Land a Few Good Punches"]
- Regra final: só setas de experimentos próprios e cuidadosamente desenhados são permitidas; sem opiniões e sem OPD. [s.13, "Interpreting the TRI Meter"]
- Os experimentos com pretotipagem levariam não mais que algumas semanas, menos que um business plan baseado em OPD. (afirmação do autor) [s.13, "Round 5: We Land a Few Good Punches"]
Citações curtas de prova:
- "Your arrows must consist of only YODA with skin in the game." [s.13, "Interpreting the TRI Meter"]
O que este trecho NÃO diz: as figuras (TRI Meters das rodadas) são imagens não lidas; o texto não indica um critério numérico para "parar" (ex.: quantas setas Likely) além de "3 de Likely/Very Likely e depois confirmação"; o bloco termina neste ponto (a seção pode continuar no bloco seguinte).
Relevância: hypothesis-and-experiments: ALTA, ciclo iterar -> testar -> mapear; critério de confirmação com segunda bateria. product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments (ciclo de iteração e pivot de ideia).

---

## Candidatos a regra (procedimentos, critérios, escalas, armadilhas)

1. Pretotipo = YODA com skin in the game + rápido + barato; senão é protótipo/mock-up. [s.12, "What Makes a Pretotype a Pretotype"] "A pretotype must produce YODA with skin in the game."
2. Protótipo responde "dá para construir?"; pretotipo responde "devemos construir?". [s.12, "You Say Proto, I Say Preto"] "Should we build it?"
3. Cadeia: MEH -> XYZ -> hypozoom em xyz -> pretostorming -> experimento; sempre com número ("say it with numbers"). [s.12, "Example: Second-Day Sushi"; "Example: Book Covers"] "Time to “say it with numbers.”" Armadilha: "a maioria" vira "pelo menos 50%", que costuma ser otimista demais.
4. Fixe a meta numérica antes de rodar o experimento; compare resultado com a meta. [s.12, "Example: Fold4U"] "At least 50% of Lenny’s coin laundry customers will put their clothes in a Fold4U machine and pay $2 to have them folded."
5. Escolha de técnica por situação: Mechanical Turk (função cara escondida por humano), Pinocchio (objeto falso usado como real por semanas), Fake Door (interesse via fachada), Facade (fachada que entrega de verdade), YouTube (vídeo + coleta de skin), One-Night Stand (oferta curta), Infiltrator (canal alheio), Relabel (rótulo novo em produto existente), Live Demo, Morsel. [s.12, seções homônimas]
6. Vídeo/views/likes não são dados; precisa de uma ação com custo (email validado, pré-pedido, dinheiro). [s.12, "The YouTube Pretotype"] "metrics like views or thumbs-ups don’t count as data"
7. Interesse inicial não prova uso recorrente; produtos de uso repetido exigem medir retenção após o efeito novidade (Google Glass; Fold4U 78% -> 62%). [s.12, "Example: Google Glass Explorer Edition"] "necessary, but not sufficient"
8. Fake Door: métricas = passantes, notaram, bateram, quantas batidas, perfil; online = CAC = gasto em anúncios / cliques em Buy. Compensar participantes; não usar em saúde. [s.12, "Example: Antonia’s Antique Bookstore"; "Example: A Guide to Squirrel Watching"; "More on the Ethics of Fake Door Pretotypes"]
9. Facade em vez de Fake Door quando houver razão ética/legal, ou para aprender o processo operacional e obter prova mais forte para investidores. [s.12, "The Facade Pretotype"]
10. Dados de terceiros (OPD, ex.: concessionárias de luxo) não respondem sobre o seu produto; teste local e específico. [s.12, "Example: Tesla’s Pop-Up Showroom"]
11. Caliper: opiniões, likes, comentários, surveys, entrevistas, emails falsos = 0; email validado = 1; telefone validado = 10; tempo = 1 ponto/min; dinheiro (depósito ou pedido) = 1 ponto/US$; use ordens de grandeza, não precisão falsa. [s.13, "Example: The Tortell-o-matic"; "The Skin-in-the-Game Caliper"] "No skin = no points."
12. Opinião de especialista também vale zero. [s.13, "The Skin-in-the-Game Caliper"]
13. Apresentar dados com contexto de custo e conversão em funil (gasto -> views -> emails validados -> pedidos), não números brutos. [s.13, "Example: A Tale of Two Teams"] "Quality of data beats quantity of data"
14. TRI Meter: 5 categorias; presunção inicial = Very Unlikely (Law of Market Failure); mapear cada experimento perguntando "se a MEH é verdadeira, quão provável este dado?"; resultado >> hipótese = Very Likely, >= = Likely, um pouco abaixo = Unlikely, muito abaixo = Very Unlikely, ambíguo/contaminado = 50/50 ou descartar. [s.13, "The TRI Meter"]
15. Descartar ou rebaixar a 50/50 experimentos contaminados, inclusive os favoráveis (atenção ao viés de confirmação). [s.13, "Example: Second-Day Sushi"] "we have to be careful not to fool ourselves"
16. Mínimo de 3 a 5 experimentos, mais se o risco/investimento for alto; um único experimento nunca basta. [s.13, "How Much Data Do You Need?"] "a bare minimum of three to five experiments"
17. Após resultado ruim: ajustar a ideia com o que aprendeu e retestar; após resultados positivos em grande investimento, rodar novo conjunto de experimentos para confirmar. [s.13, "Round 1: Punched in the Face"; "Round 5: We Land a Few Good Punches"]
18. Só dados de experimentos próprios e bem desenhados entram no TRI Meter; sem opiniões e sem OPD. [s.13, "Interpreting the TRI Meter"] "Your arrows must consist of only YODA with skin in the game."

Limitações a registrar nas skills: todos os números de exemplo (US$ 20, 15%, 0,5%, 25%/5% etc.) são hipóteses ilustrativas do autor, não padrões; os pesos do Caliper e a escala do TRI são "convenções do autor", não evidência empírica independente; o livro apresenta pretotipagem como eficaz com base em experiência e anedotas (admitido).

## Checklist de cobertura
- Primeira seção lida: 12
- Última seção lida: 13
- Páginas sem texto útil ou ilegíveis: não se aplica (ebook sem páginas)
- Problemas de extração observados: tabelas do Caliper e da tabela de resultados do sushi vieram linearizadas (colunas em linhas separadas) mas legíveis; figuras (diagrama do TRI Meter, setas, rodadas 1-5, fotos do PalmPilot/Alexa/mock-ups FeeBird, esquema "o que o usuário pensa vs. o que ocorre") são imagens não lidas e não foram descritas; os valores intermediários do TRI Meter (30/50/70%) não aparecem no texto; asteriscos (*) indicam notas de rodapé não presentes no bloco. Marcadores de seção só trazem "The Right It" como título; usei o `## ` e o texto-título imediatamente seguinte ("5 / Pretotyping Tools" e "6 / Analysis Tools") e os subtítulos em linha própria.
- Capítulos/seções cobertos integralmente: s.12 (cap. 5 inteiro, até a ponte para o cap. 6); s.13 até o fim do bloco (Skin-in-the-Game Caliper, TRI Meter, How Much Data, Interpreting the TRI Meter até a Round 5 e a regra final)
- Capítulos/seções que continuam em outro bloco: s.13 (cap. 6) termina no bloco sem conclusão de capítulo; possivelmente continua no bloco seguinte.
