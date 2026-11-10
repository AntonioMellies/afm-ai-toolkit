# Notas: Inspired (Marty Cagan, 2ª ed.), bloco 02, PDF p.75-148

Convenção: [p.N] = "PDF PAGINA N" do marcador. Número impresso = PDF - 20 (ex.: PDF p.75 = impr. 55; PDF p.128 = impr. 108). Citações em inglês, literais, curtas.

### Ch.11 (fim) The Product Designer: prototipação, teste com usuários, interação/visual, ausência de design (PDF p.75-78) [continua do bloco anterior]
Resumo. O designer de produto usa protótipos como principal tela de comunicação de ideias e testa com usuários toda semana. Cagan lista três situações em que o design está ausente (PM faz o design, PM só passa user stories de alto nível, PM faz wireframes e entrega o visual a outro designer) e propõe cinco chaves para a relação PM-designer.
Conceitos e regras:
- Lista de perguntas de design que abre a p.75 (continuação da lista do bloco anterior): como usuários interagem em momentos diferentes do dia; o que compete pela atenção; cliente de 1 mês vs. 1 ano; como motivar maior comprometimento; como criar momentos de gratificação; como o usuário compartilha a experiência; como o cliente recebe um serviço offline; qual a responsividade percebida. [p.75]
- Protótipos: muitas técnicas de teste de ideias dependem de protótipos, e a maioria é criada pelo designer; bons designers usam protótipos como canvas primário de comunicação, interna e externa, e dominam várias ferramentas, escolhendo a certa para a tarefa. [p.75]
- User testing: bons designers testam continuamente, incorporado à cadência semanal (não só quando o protótipo "está pronto"), o que valida/refina ideias e reduz o apego a elas. [p.75]
- User testing é mais amplo que usability testing: avalia também o valor da ideia ("os clientes vão usar ou comprar? se não, por quê?"). [p.75]
- Interaction design = modelos conceituais (ex.: fotos, álbuns, projetos), fluxos de tarefa e layout de controles; visual design = composição, tipografia, expressão da marca. Designers modernos têm alguma habilidade em ambos; em mobile os dois são intrinsecamente ligados. Dispositivos físicos exigem também industrial design. [p.76]
- Três situações de "ausência de design", todas tidas como sérias porque raramente dão bom resultado e não entregam o design holístico: (1) PM sem formação faz o design (entrega wireframes e engenheiros improvisam o visual); (2) PM entrega só user stories de alto nível e engenheiros têm de inventar o design; (3) PM faz a interação (wireframes) e um designer gráfico só faz o visual. [p.76-77]
- Design de qualidade é "table stakes" em produtos de consumo e diferencial competitivo em B2B; em B2B o usuário muitas vezes não é o comprador (por isso design ruim sobrevivia), e em produtos para pequenas empresas o usuário costuma ser o comprador. [p.77]
- Anti-padrão: tratar o design como agência interna (pedidos entram, resultados saem). Design deve ser membro de primeira classe do time, lado a lado com o PM; em times fortes o design informa a funcionalidade tanto quanto a funcionalidade dirige o design. [p.77-78]
- Cinco chaves da relação PM-designer: (1) designer sentado ao lado; (2) incluir o designer desde a concepção de cada ideia; (3) incluí-lo no maior número possível de interações com clientes/usuários; (4) resistir a dar suas próprias ideias de design, dando espaço para ele resolver; (5) encorajar iteração cedo e frequente, sem implicância com detalhes nas primeiras iterações, e explorar soluções alternativas, não só iterar numa abordagem. [p.78]
Citações curtas de prova:
- "They don’t just test when a prototype or idea is ready; they build testing into their weekly cadence" [p.75]
- "We need design—not just as a service to make our product beautiful—but to discover the right product." [p.78]
- "the design informs the functionality at least as much as the functionality drives the design" [p.78]
O que este trecho NÃO diz: não descreve como montar um protótipo, nem níveis de fidelidade, nem como conduzir um teste de usabilidade passo a passo; não define formato de especificação. A lista de perguntas de design é só enumerada, sem método.
Relevância: prd-writer: MÉDIA, a situação (2) e a regra "user stories de alto nível sem design empurram o design para engenheiros" qualificam o papel de uma spec; product-discovery-assistant: MÉDIA, designer co-descobre, testa semanalmente; hypothesis-and-experiments: MÉDIA, cadência semanal de testes e user testing avalia valor, não só usabilidade; product-metrics: NENHUMA.
Decisão sugerida: usar em product-discovery-assistant (papéis e cadência de teste) e como contexto em prd-writer (PRD não substitui o design colaborativo).

### Ch.12 The Engineers (PDF p.79-82)
Resumo. Relação PM-engenharia é a mais importante do PM. O PM traz dados, dor do cliente e restrições de negócio e discute soluções; não diz "como construir". Descreve o papel de tech lead na descoberta.
Conceitos e regras:
- O PM deve conversar diretamente com engenheiros todo dia útil, em dois tipos de conversa: (a) pedir ideias/input sobre itens em descoberta; (b) responder perguntas de esclarecimento sobre itens em entrega. [p.80]
- Compartilhar abertamente: dor dos clientes, dados e restrições de negócio; levar o problema e discutir soluções potenciais. [p.80]
- Engenheiros não gostam que o PM especifique "como" construir (analogia: PMs não gostam que executivos especifiquem o que construir); dar o máximo de latitude para a melhor solução. [p.80-81]
- Moral dos engenheiros é função do PM: "missionários e não mercenários", envolvendo-os na dor do cliente e nos problemas de negócio. [p.81]
- Tech lead: além do conhecimento do que é possível, tem responsabilidade explícita de ajudar PM e designer a descobrir uma boa solução. Nem todo engenheiro precisa participar da descoberta, mas é inaceitável um time em que nenhum queira. PM e designer trabalham mais de perto com o tech lead. [p.81-82]
- Recomenda ao PM adquirir letramento de programação para colaborar melhor e entender "a arte do possível". [p.80]
Citações curtas de prova:
- "feel like missionaries and not mercenaries" [p.81]
- "you’re soliciting their ideas and input for the items you’re working on in discovery" [p.80]
O que este trecho NÃO diz: não diz como escrever requisitos para engenheiros nem formato de user story; não trata de estimativa nem de risco de viabilidade em detalhe (isso vem em capítulos de descoberta, não neste bloco).
Relevância: prd-writer: MÉDIA, PM descreve problema/contexto, não prescreve a implementação; product-discovery-assistant: MÉDIA, engenheiros participam da descoberta (viabilidade) e tech lead tem responsabilidade explícita; hypothesis-and-experiments: BAIXA; product-metrics: NENHUMA.
Decisão sugerida: usar em product-discovery-assistant (papéis); em prd-writer, regra de não prescrever "como".

### Ch.13 Product Marketing Managers (PDF p.83-85)
Resumo. PMM não é dedicado a um só time; representa o mercado: posicionamento, mensagem, plano go-to-market. Importante em discovery, delivery e go-to-market. Sem PMM, essa responsabilidade cai no PM.
Conceitos e regras:
- Parte de "funciona para o negócio" inclui: mercado grande o bastante, diferenciação frente a concorrentes, aquisição/engajamento de clientes com custo eficaz, canais e capacidades go-to-market. [p.83-84]
- Definição de posicionamento no texto: a posição de mercado que o produto deve ocupar (distinta da mensagem: ativos digitais/conteúdo, ferramentas de venda e treinamento). [p.84]
- Em vendas diretas ou por canal, declarar posicionamento é trabalho significativo e crítico; sem PMM cai no PM e pode virar full-time. [p.84]
- Em vendas diretas ao consumidor, marketing tende a focar cliques e marca em detrimento de uma posição de mercado diferenciada. [p.84]
- Papel do PMM em descoberta: garantir sinal de uma amostra suficientemente ampla do mercado; depois, mensagem e plano go-to-market com base nos primeiros sinais. [p.85]
- Modelo moderno vs. antigo: no antigo o PMM definia o produto e o PM só trabalhava com engenharia para entregar; o livro descreve o modelo moderno, em que o PM segue responsável pelo sucesso do produto. [p.85]
Citações curtas de prova:
- "Modern product marketing managers represent the market to the product team" [p.84] (trecho aproximado; no texto aparece na caixa lateral e no corpo: "represent the market to the product team—the positioning, the messaging, and a winning go-to-market plan")
O que este trecho NÃO diz: não traz template de positioning statement, nem de plano GTM, nem métricas de marketing.
Relevância: product-discovery-assistant: MÉDIA, as dimensões de viabilidade de negócio (mercado, diferenciação, aquisição, canais) e distinção posicionamento vs. mensagem; prd-writer: BAIXA; hypothesis-and-experiments: BAIXA; product-metrics: BAIXA (custo de aquisição citado só como critério).
Decisão sugerida: usar em product-discovery-assistant (itens de viabilidade de negócio) como referência secundária.

### Ch.14 The Supporting Roles (PDF p.87-89)
Resumo. User researchers, data analysts e test automation engineers apoiam o time. Pesquisa e aprendizado devem ser compartilhados, não delegados com relatório.
Conceitos e regras:
- Dois tipos de aprendizado rápido contínuo na descoberta: qualitativo e quantitativo. [p.88]
- Pesquisa qualitativa: generativa (entender os problemas a resolver) vs. evaluativa (avaliar quão bem as soluções resolvem o problema). [p.88]
- User researchers ajudam a achar os usuários certos, desenhar os testes e extrair o máximo de cada interação; o aprendizado deve ser compartilhado: o PM precisa presenciar os insights, não delegar e receber relatório. Sem researcher, o designer assume. [p.88]
- Data analysts: ajudam a coletar analytics certo, gerir restrições de privacidade de dados, analisar dados, planejar testes com dados reais (live-data tests) e interpretar resultados. Sem analista, a responsabilidade cai no PM, que precisa mergulhar nos dados. [p.88-89]
- Test automation engineers substituíram o QA manual; divisão comum: engenheiros fazem testes unitários, test automation engineers fazem testes de nível mais alto. Inaceitável: sem test engineers e sem testes dos engenheiros, esperar que o PM faça o teste de qualidade; o PM faz acceptance testing, mas isso está longe de "liberar com confiança". [p.89]
Citações curtas de prova:
- "the learning must be shared learning" [p.88]
- "that’s a far cry from being able to release with confidence" [p.89]
O que este trecho NÃO diz: não detalha técnicas de entrevista, desenho de teste A/B nem métricas; "live-data tests" aparecem apenas nomeados aqui.
Relevância: hypothesis-and-experiments: MÉDIA, distinção generativa/evaluativa, qualitativo/quantitativo, "live-data tests" nomeados; product-discovery-assistant: MÉDIA, aprendizado compartilhado, não delegar pesquisa; product-metrics: BAIXA, papel do analista; prd-writer: NENHUMA.
Decisão sugerida: usar em hypothesis-and-experiments/product-discovery-assistant (regra do aprendizado compartilhado e classificação generativa vs. evaluativa).

### Ch.15 Profile: Jane Manning of Google (AdWords) (PDF p.91-93)
Resumo. Caso narrativo: Jane entrevistou cada objetor (vendas, engenharia) para entender preocupações, advogou uma solução, e levou o AdWords ao ar. Ilustra superar objeções técnicas e de negócio.
Conceitos e regras:
- Ela sentou com cada pessoa para entender as preocupações específicas (desconforto com anúncios, canibalização, infelicidade do usuário) antes de defender uma solução. [p.92]
- Solução: anúncios AdWords ao lado dos resultados (não confundir com anúncios vendidos por vendedores no topo) e ranking por preço por impressão multiplicado pelo desempenho (CTR), para que anúncios mais relevantes subam. [p.92]
- Jane "led the product discovery work and wrote the first spec for AdWords", depois trabalhou lado a lado com engenheiros. [p.93]
Citações curtas de prova:
- "led the product discovery work and wrote the first spec for AdWords" [p.93] (trecho de texto com leve quebra de extração)
O que este trecho NÃO diz: não mostra o conteúdo da spec, nem formato, nem quando foi escrita relativa à descoberta; é caso, não método.
Relevância: prd-writer: BAIXA, só menciona que houve uma "first spec" após a descoberta; product-discovery-assistant: BAIXA, exemplo de mapeamento de objeções de stakeholders; demais: NENHUMA.
Decisão sugerida: descartar como regra (usar no máximo como exemplo ilustrativo de stakeholders).

### Part Two (fim): People @ Scale, Ch.16 The Role of Leadership (PDF p.94-98)
Resumo. Liderança recruta, desenvolve e retém talento e mantém a "holistic view of product" (conectar os pontos entre times). Três elementos: liderança de produto, de design e de tecnologia.
Conceitos e regras:
- Holistic view: três elementos: (1) líderes de product management (VP/diretores ou principal product manager) garantem visão do sistema do ponto de vista de negócio (visão, estratégia, funcionalidade, regras e lógica de negócio) e resolvem conflitos entre times; (2) líderes de product design garantem experiência consistente em todo o sistema; ao menos uma pessoa revisa tudo o que o usuário vê; (3) líderes de tecnologia (CTO/VP eng + arquitetos) revisam arquitetura e têm estratégia para dívida técnica. [p.96-97]
- Sinais de ausência: produto parece feito por meia dúzia de agências (falta head of design/principal designer); projetos travam porque PMs não entendem implicações e perguntam aos devs como o sistema funciona (falta principal PM); software espaguete e mudanças simples lentas (dívida técnica). [p.97-98]
- Cagan diz nunca ter visto dar certo a tentativa de documentar o sistema inteiro para substituir esses papéis; a resposta definitiva vive no código-fonte (a resposta atual, não a justificativa ou história). [p.98]
Citações curtas de prova:
- "the definitive answer always lives in the source code itself" [p.98]
O que este trecho NÃO diz: não é guia de documentação de produto; apenas argumenta que documentação total do sistema não substitui papéis. Não fala de PRD.
Relevância: prd-writer: BAIXA/MÉDIA como contra-ponto (documentar tudo não funciona; código é fonte definitiva do estado atual, não da justificativa); demais: NENHUMA.
Decisão sugerida: descartar para skills, exceto nota em prd-writer: PRD não deve tentar ser documentação completa do sistema (registrar racionale/história é o que o código não guarda: inferência minha a partir da frase "not usually the rationale or the history" [p.98]).

### Ch.17 The Head of Product Role (PDF p.99-105)
Resumo. Competências do líder de produto (VP product): desenvolvimento de time, visão e estratégia de produto, execução, cultura de produto, mais experiência e química. Também o papel de Group Product Manager (GPM).
Conceitos e regras:
- Quatro competências: (1) team development, (2) product vision, (3) execution, (4) product culture; depois experiência e chemistry. [p.100-103]
- Cultura de produto forte: entender que testar e aprender continuamente e rápido; errar para aprender, mas rápido e mitigando riscos; inovação contínua; colaboração real; respeito a designers/engenheiros; poder de um time motivado. [p.102-103]
- Execução inclui ser especialista em planejamento de produto moderno, customer discovery, product discovery e processo de desenvolvimento. [p.102]
- GPM: híbrido, contribuidor individual + gestor de 1 a 3 PMs ("player-coach"); diretor de product management tem 3 a 10 PMs reportando. Exemplo: marketplace com ~10 times em três grupos (plataforma, comprador, vendedor). [p.103-105]
Citações curtas de prova:
- "continuous and rapid testing and learning" [p.102]
O que este trecho NÃO diz: não dá técnicas de descoberta nem templates; é sobre organização e carreira.
Relevância: todos os artefatos: NENHUMA/BAIXA (contexto organizacional); product-discovery-assistant: BAIXA (definição de cultura de produto: testar e aprender rápido).
Decisão sugerida: descartar.

### Ch.18 The Head of Technology Role (PDF p.107-110)
Resumo. Seis responsabilidades do CTO, em ordem de prioridade, com como cada uma é medida; destaca dívida técnica como principal obstáculo à entrega e a participação de engenheiros seniores na descoberta.
Conceitos e regras (seis responsabilidades, em ordem):
- Organization (excelente organização; medida por planos de desenvolvimento, retenção, avaliação dos gerentes pela empresa) [p.108]; Leadership (representa tecnologia na direção estratégica, M&A, build/buy/partner) [p.108]; Delivery (entregar com rapidez, confiabilidade e repetibilidade; medidas: consistência e frequência de releases, qualidade/confiabilidade do software; principal obstáculo: dívida técnica) [p.109]; Architecture (funcionalidade, escalabilidade, confiabilidade, segurança, desempenho; medida: interrupções que afetam clientes por causa de infraestrutura/arquitetura) [p.109]; Discovery (engenheiros e arquitetos sêniores participando ativamente da descoberta; medir duração e cobertura da participação e frequência das inovações creditadas a engenheiros) [p.109-110]; Evangelism (porta-voz de engenharia; medido por programa de relações com universidades/recrutamento e eventos por ano) [p.110].
- CIO como chefe da organização de tecnologia é bandeira vermelha para as patologias do cap. 6. [p.108]
Citações curtas de prova:
- "If your engineers and architects are only being used to write software, then you are only getting a fraction of the value" [p.109]
O que este trecho NÃO diz: as métricas do CTO são de gestão de engenharia, não métricas de produto; não definem DORA nem similares.
Relevância: product-metrics: BAIXA (métricas de entrega/qualidade da organização, não do produto); product-discovery-assistant: BAIXA (engenheiros na descoberta, medir participação); demais: NENHUMA.
Decisão sugerida: descartar (no máximo nota de que participação de engenharia na descoberta é medida de saúde do processo).

### Ch.19 The Delivery Manager Role (PDF p.111-112)
Resumo. Delivery manager remove impedimentos e acompanha dependências, liberando o PM do trabalho de project management.
Conceitos e regras:
- Missão: remover obstáculos (impedimentos) do time, incluindo dependências com outros times e funções não-produto; normalmente também Scrum Master. Não é o program manager no sentido antigo. [p.111-112]
- Sem delivery managers, o trabalho recai em PM e engineering managers; viável em organização pequena, mas fica cada vez mais importante a partir de 5 a 10 times de produto. [p.112]
Citações curtas de prova:
- "removing obstacles that get in the way" [p.111] (frase: "helping the team to get stuff live faster, not by cracking the whip but by removing obstacles")
O que este trecho NÃO diz: não discute planejamento ou estimativa em detalhe.
Relevância: todos: BAIXA/NENHUMA (relacionado indiretamente a compromissos de data, ver Ch.23).
Decisão sugerida: descartar.

### Ch.20 Principles of Structuring Product Teams + Autonomy @ Scale (PDF p.113-122)
Resumo. Não há receita para dividir o produto entre times; há dez princípios e um trade-off autonomia vs. alavancagem da fundação. Falta de contexto (visão + objetivos) é a causa mais provável de más decisões dos times.
Conceitos e regras (dez princípios):
1. Alinhamento com estratégia de investimento (times não devem ser só reflexo do histórico; three horizons ou portfólio) [p.114]; 2. Minimizar dependências (monitorar continuamente) [p.114]; 3. Ownership e autonomia (missionários, não mercenários) [p.114-115]; 4. Maximizar alavancagem (serviços compartilhados criam dependências) [p.115]; 5. Visão e estratégia de produto [p.115]; 6. Tamanho do time: mínimo dois engenheiros + um PM (e um designer se houver tecnologia voltada ao usuário); abaixo disso é massa crítica insuficiente; um PM e um designer dificilmente mantêm ocupados mais de ~10-12 engenheiros; cada time tem um, e apenas um, PM [p.115]; 7. Alinhamento com arquitetura (em muitas organizações é o princípio principal; sinais de ignorá-la: luta constante contra a arquitetura, interdependências desproporcionais, lentidão e baixa sensação de empoderamento; times de plataforma/serviços comuns precisam de PMs técnicos, "platform product managers") [p.115-116]; 8. Alinhamento com usuário/cliente (ex.: compradores vs. vendedores) [p.116-117]; 9. Alinhamento com o negócio/unidades de negócio, normalmente depois dos outros fatores [p.117]; 10. Estrutura é alvo móvel (revisar a cada ano ou so) [p.117].
- Autonomia vs. alavancagem: fatores a considerar: nível de habilidade do time (A, B, C), importância da velocidade, importância da integração, fonte de inovação (fundação vs. solução), tamanho/localização da empresa, cultura, maturidade da tecnologia, importância para o negócio, nível de accountability. [p.119-121]
- Contexto crítico para o time: (1) a visão de produto geral; (2) os objetivos de negócio específicos atribuídos a cada time; a liderança fornece isso e não diz como resolver os problemas; é aí que está a autonomia. [p.122]
- Duas queixas típicas de falta de autonomia: time ainda não é confiável para a gestão; ou time quer mudar algo que a liderança tratava como fundação (ex.: ferramenta de gestão de configuração padronizada). [p.118]
Citações curtas de prova:
- "there is no recipe" [p.114] (texto: "I always explain to them that there is no recipe")
- "nothing is said about how to actually solve the problems they are assigned" [p.122]
O que este trecho NÃO diz: não descreve Team Topologies nem critérios quantitativos além do tamanho do time; nenhuma técnica de descoberta.
Relevância: product-discovery-assistant: BAIXA/MÉDIA (contexto de times: visão + objetivos de negócio por time; um PM por time); prd-writer: BAIXA; hypothesis-and-experiments: NENHUMA; product-metrics: NENHUMA.
Decisão sugerida: descartar para as skills de produto; manter a regra "contexto = visão + objetivos de negócio, sem prescrever a solução" em product-discovery-assistant.

### Ch.21 Profile: Lea Hickman of Adobe (PDF p.123-126)
Resumo. Caso da transição do Creative Suite (licença, ~US$2 bi/ano; metade da receita da Adobe) para Creative Cloud (assinatura), com protótipos e comunicação contínua para alinhar executivos e times.
Conceitos e regras:
- Visão do "novo todo maior que a soma das partes"; protótipos convincentes feitos com o então CTO para mobilizar executivos e times; "não existe comunicação demais"; fluxo contínuo de protótipos. [p.125]
- Preocupações por função: finanças (receita), engenharia (de trem de releases de 2 anos para entrega contínua; mais responsabilidade por disponibilidade), vendas (canal para relação direta), emocional (possuir vs. alugar). [p.124]
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: não explica como os protótipos foram feitos nem mede o efeito deles além dos números finais.
Relevância: todos: BAIXA (protótipo como ferramenta de alinhamento/visão, não como teste).
Decisão sugerida: descartar.

### Part III abertura e "Product Roadmaps: Overview" (PDF p.127-129)
Resumo. Pergunta central: o que o time deve trabalhar? Roadmap típico é lista priorizada de features e projetos (output); o tema do livro é outcome, não output.
Conceitos e regras:
- Definição do livro: roadmap = lista priorizada de features e projetos que o time foi pedido a fazer; trimestral, 3 meses rolantes ou anual; vindo da gestão (stakeholder-driven) ou do PM; normalmente sem bugs/otimizações, com iniciativas multi-time e datas ou janelas. [p.128]
- Motivos legítimos da gestão: trabalhar primeiro no de maior valor; planejar (marketing, contratação de vendas, dependências com parceiros). [p.129]
- Tese: roadmaps típicos são a causa raiz da maior parte do desperdício e de esforços falhos. [p.129]
Citações curtas de prova:
- "Typical roadmaps are the root cause of most waste and failed efforts in product organizations." [p.129]
O que este trecho NÃO diz: ainda não apresenta a alternativa (vem no Ch.23); não é guia de como montar roadmap.
Relevância: prd-writer: BAIXA; product-discovery-assistant: MÉDIA (outcome vs. output); product-metrics: BAIXA.
Decisão sugerida: usar em product-discovery-assistant (definição outcome vs. output).

### Ch.22 The Problems with Product Roadmaps (PDF p.131-133)
Resumo. Duas "verdades inconvenientes" explicam por que roadmaps dão maus resultados; times fortes atacam riscos rápido, via descoberta.
Conceitos e regras:
- Primeira verdade inconveniente: pelo menos metade das ideias de produto não vai funcionar. [p.131]
- Quatro razões (os quatro riscos de produto, nomeados por modo de falha): (a) valor: clientes não ficam tão animados quanto nós (o caso mais comum); (b) usabilidade: o cliente quer, mas é complicado demais; (c) viabilidade (feasibility): é bem mais complexo de construir do que se pensava, tempo/custo inviáveis; (d) viabilidade de negócio (business viability): restrições legais, financeiras ou de negócio impedem o lançamento. [p.131-132]
- Segunda verdade: mesmo as ideias valiosas, usáveis, viáveis (feasible) e viáveis para o negócio normalmente exigem várias iterações para entregar o valor esperado ("time to money"). [p.132]
- Times fracos seguem o roadmap mês após mês, culpam o stakeholder quando falha e agendam outra iteração ou redesenho; times fortes aceitam as verdades e atacam riscos rapidamente, qualquer que seja a origem da ideia, iterando rápido. [p.132]
- Product discovery = o que resolve isso; Cagan o considera a competência central mais importante da organização de produto. [p.132]
- Prototipar e testar ideias com usuários, clientes, engenheiros e stakeholders em horas e dias, não semanas e meses, muda a dinâmica e os resultados. [p.132]
- O problema do roadmap não é a lista de ideias, mas o documento chamado "roadmap": qualquer lista nele é lida como compromisso, mesmo com disclaimers. [p.132-133]
- Às vezes é preciso comprometer data; deve-se minimizar e fazer "high-integrity commitment"; o essencial é resolver o problema, não só entregar a feature. [p.133]
Citações curtas de prova:
- "at least half of our product ideas are just not going to work" [p.131]
- "no matter how many disclaimers you put on it, people across the company will interpret the items as a commitment" [p.133] (citação com 22 palavras; extração tem quebras)
- "product discovery as the most important core competency of a product organization" [p.132]
O que este trecho NÃO diz: não define "quatro riscos" como um framework nomeado nem usa a palavra "risks" para a lista de valor/usabilidade/viabilidade/viabilidade de negócio neste trecho (descreve as quatro razões de falha, com os termos em parênteses: "the value isn’t there", "the usability isn’t there", "the feasibility isn’t there", "the business viability isn’t there"); não dá probabilidades por tipo além de "at least half" e "most common" para valor; não explica técnicas de teste aqui.
Relevância: product-discovery-assistant: ALTA (os quatro modos de falha, a premissa "metade falha", discovery como competência central); hypothesis-and-experiments: ALTA (premissa: testar em horas/dias com usuários, clientes, engenheiros e stakeholders; cada um valida um risco); prd-writer: MÉDIA (um PRD não deve ser lido como compromisso; separar ideias de compromissos); product-metrics: MÉDIA ("time to money" como conceito).
Decisão sugerida: usar em product-discovery-assistant e hypothesis-and-experiments (quatro riscos mapeados a quem valida: ver p.139); em prd-writer, aviso sobre PRD/roadmap virando compromisso.

### Ch.23 The Alternative to Roadmaps (PDF p.135-140)
Resumo. Alternativa: dar ao time contexto (visão e estratégia + objetivos de negócio mensuráveis) e deixar o time descobrir a solução; datas só via "compromissos de alta integridade" feitos depois da descoberta.
Conceitos e regras:
- Dois propósitos do roadmap que qualquer alternativa deve atender pelo menos tão bem: (1) garantir trabalho nos itens de maior valor de negócio; (2) compromissos de data quando necessários. [p.135-136]
- Contexto de negócio do time: (1) visão e estratégia de produto; (2) objetivos de negócio (específicos e priorizados por time). [p.136]
- Objetivo de negócio: dizer ao time o que precisa alcançar e como o resultado será medido, e deixar o time descobrir como. Exemplo no livro: onboarding de novo cliente hoje leva 30 dias; precisa cair para 3 horas ou menos; objetivo: "Dramatically reduce the time it takes for a new customer to go live"; resultado-chave mensurável: "Average new customer onboarding time less than three hours". [p.136]
- Responsabilidade da gestão: dar a cada time os objetivos de negócio; priorizar resultados de negócio, não ideias de produto (ironia: às vezes é preciso convencer a gestão a focar resultados). [p.137]
- Três benefícios: motivação (missionário vs. mercenário); time não está "quite" só por entregar a feature, ela tem de resolver o problema medido pelos key results, senão tenta outra abordagem; reconhece que a abordagem inicial muitas vezes falha, em vez de fingir o contrário. [p.137]
- Outcome-based roadmap: cada item enunciado como problema de negócio a resolver. Cagan considera essencialmente equivalente a um sistema baseado em objetivos como OKR (diferem no formato mais que no conteúdo). Risco: pôr data em todo item em vez de só nos que têm restrição real de data, com implicações culturais/motivacionais. [p.137-138]
- High-integrity commitments: causa-raiz do sofrimento com compromissos é que são feitos cedo demais, antes de saber se dá para entregar e se o que se entrega resolve o problema do cliente. Compromisso entre as partes: o time pede um pouco de tempo de descoberta para validar a solução com clientes (valor e usabilidade), engenheiros (viabilidade) e stakeholders (viabilidade para o negócio); depois da descoberta compromete data e entregável (e os resultados de negócio esperados). [p.138-140]
- Delivery managers são chave para determinar datas de compromisso, pois acompanham dependências e disponibilidade do time (ex.: engenheiros acham 2 semanas, mas o time só pode começar em um mês). [p.139]
- Em ambiente de software sob encomenda dá para iterar até o cliente se satisfazer ou desistir; em empresa de produto isso não funciona. [p.138]
Citações curtas de prova:
- "It is all about outcome rather than output." [p.137]
- "Average new customer onboarding time less than three hours." [p.136]
- "the root cause of all this grief about commitments is when these commitments are made. They are made too early." [p.139] (extração; ~19 palavras)
O que este trecho NÃO diz: não explica como escrever OKR (formato completo, pontuação, número de KRs); não define metas numéricas padrão; não ensina a estimar nem a fazer tracking de key results (virão em capítulos seguintes, fora deste bloco); não define formalmente "high-integrity commitment" além do mecanismo descrito acima (compromisso feito após descoberta).
Relevância: product-metrics: ALTA (objetivo de negócio com resultado-chave mensurável; outcome vs. output; "time to money"); hypothesis-and-experiments: ALTA (descoberta antes de compromisso, validação por tipo de parte); product-discovery-assistant: ALTA (contexto = visão + objetivos de negócio, quem valida o quê); prd-writer: MÉDIA (PRD deve ancorar em objetivo de negócio mensurável e declarar o que não é compromisso até a descoberta).
Decisão sugerida: usar em product-discovery-assistant, product-metrics, hypothesis-and-experiments e prd-writer (ver Candidatos a regra).

### Ch.24 (início) Product Vision and Product Strategy (PDF p.141-147; capítulo continua no próximo bloco)
Resumo. Visão = futuro que se quer criar (2 a 5 anos; 5 a 10 para hardware), peça persuasiva, não spec. Estratégia = sequência de produtos/releases rumo à visão, preferencialmente organizada por product/market fits, um mercado-alvo por vez. Priorização de mercados por TAM, GTM, TTM.
Conceitos e regras:
- Visão não é a missão da empresa (missão não diz como); visão não é spec; é peça persuasiva (storyboard, narrativa/white paper ou "visiontype", um tipo especial de protótipo). Propósito: comunicar e inspirar times, stakeholders, investidores, parceiros e eventualmente clientes. Pode-se testar um pouco a visão, mas não é o mesmo que testar soluções específicas na descoberta; comprar a visão é um salto de fé. [p.143-144]
- Estratégia de produto: a sequência de produtos ou releases no caminho à visão; evitar um esforço gigante de múltiplos anos que tenta agradar a todos. Estruturar em uma série de product/market fits (vertical por vertical em B2B; persona por persona em consumo; ou geografia; ou marcos lógicos). Exemplo de marcos no livro: primeiro avaliações e reviews para desenvolvedores de e-commerce, depois base de sentimento de consumidor, depois recomendações. [p.144-145]
- Benefício principal: focar o trabalho em um único mercado-alvo por vez; objetivo: o menor produto entregável que torne esses clientes bem-sucedidos; ideias para outros mercados ficam para depois. Alinha produto com vendas/marketing: vender onde há product/market fit demonstrado (normalmente via clientes de referência). [p.145-146]
- Cada organização tem uma visão de produto (não uma visão por time); em empresas muito grandes, cada unidade de negócio tem a sua. A visão deve ser inspiradora e a estratégia focada. Vision vs. strategy análogo a liderança vs. gestão. [p.146]
- Priorização de mercados: três entradas críticas: (1) tamanho (TAM), (2) distribuição/go-to-market (GTM; mercado maior que exija novo canal de vendas tende a perder para um menor que use canais existentes), (3) estimativa grosseira de tempo (TTM). Sugere que head of product, head of technology e head of product marketing definam juntos. [p.146-147]
Citações curtas de prova:
- "the vision is not in any sense a spec" [p.143]
- "the product strategy is our sequence of products or releases we plan to deliver on the path to realizing the product vision" [p.144] (frase literal em trecho: "The product strategy is our sequence of products or releases we plan to deliver on the path to realizing the product vision.", 24 palavras)
- "the product vision should be inspiring, and the product strategy should be focused" [p.146]
O que este trecho NÃO diz: não explica como medir product/market fit; não dá fórmula de priorização ponderada de mercados (só nomeia TAM, GTM, TTM e diz que outros fatores podem importar); não descreve como construir uma visiontype nem como estruturar uma narrativa de visão; o capítulo continua no próximo bloco.
Relevância: product-discovery-assistant: ALTA (visão vs. estratégia, um mercado por vez, TAM/GTM/TTM); prd-writer: MÉDIA (visão "não é spec"; PRD deriva da estratégia, foco em um mercado por vez, "menor produto entregável"); product-metrics: BAIXA (TAM, GTM, TTM como critérios de priorização); hypothesis-and-experiments: BAIXA (visão só se testa um pouco).
Decisão sugerida: usar em product-discovery-assistant (e como ancoragem de contexto em prd-writer).

## Candidatos a regra

1. **Quatro modos de falha de uma ideia de produto, com nomes exatos: valor, usabilidade, viabilidade (feasibility), viabilidade de negócio (business viability).** [p.131-132] "the value isn’t there" / "the usability isn’t there" / "the feasibility isn’t there" / "the business viability isn’t there" (p.131-132). Aplicação: ao analisar uma ideia, perguntar sobre cada um; o modelo sem o livro pode confundir "feasibility" (construir com tempo/custo viáveis) com "viability" (restrições legais, financeiras ou de negócio). Valor é citado como o caso mais comum.
2. **Premissa: "pelo menos metade" das ideias não funciona; e as que funcionam levam várias iterações (time to money).** [p.131-132] "at least half of our product ideas are just not going to work" (p.131). Plano de descoberta deve assumir falha provável e iteração.
3. **Quem valida o quê (mapa de validação), pelo texto sobre compromissos:** valor e usabilidade com clientes; viabilidade (feasibility) com engenheiros; viabilidade de negócio com stakeholders. [p.139] "validate that solution with customers to ensure it has the necessary value and usability, with engineers to ensure its feasibility, and with our stakeholders to ensure it is viable for our business" (p.139, citação resumida em paráfrase aqui; literal tem >25 palavras).
4. **Testar em horas e dias, não semanas e meses, com usuários, clientes, engenheiros e stakeholders.** [p.132] "prototype and test ideas with users, customers, engineers, and business stakeholders in hours and days" (p.132, trecho literal ~15 palavras).
5. **Cadência de testes de usuário semanal, incorporada à rotina, e não só quando o protótipo está pronto.** [p.75] "they build testing into their weekly cadence" (p.75). User testing avalia valor ("Will customers use or buy the product and, if not, why not?") além de usabilidade (p.75).
6. **Pesquisa qualitativa: generativa (entender problemas) vs. evaluativa (avaliar soluções); aprendizado deve ser compartilhado, o PM presencia os insights em vez de receber relatório.** [p.88]
7. **Dados: o analista planeja "live-data tests"; sem analista o PM mergulha nos dados.** [p.88-89] (apenas nomeado aqui).
8. **Roadmap vira compromisso, independentemente de disclaimers: não apresentar lista de ideias/features num documento que se pareça com roadmap sem separar o que é compromisso.** [p.132-133] "no matter how many disclaimers you put on it, people across the company will interpret the items as a commitment" (p.133). Aplicação em PRD/plano: não colocar data em item sem restrição real de data.
9. **Objetivo de negócio = resultado a alcançar + como será medido; o time descobre a solução.** [p.136] Exemplo: "Average new customer onboarding time less than three hours." (p.136; hoje 30 dias; meta 3 horas ou menos). Objetivo qualitativo ("reduzir drasticamente o tempo para um novo cliente entrar em produção") + key result numérico mensurável.
10. **Outcome-based roadmap ≈ OKR (diferem em formato, não em conteúdo); armadilha: datas em todos os itens.** [p.138]
11. **High-integrity commitment: só comprometer data/entregável depois da descoberta (que valida valor, usabilidade, viabilidade e viabilidade de negócio), e com o delivery manager verificando disponibilidade e dependências do time.** [p.139-140] "They are made too early." (p.139).
12. **A feature entregue não encerra o trabalho: precisa resolver o problema de negócio medido pelos key results; senão tentar outra abordagem.** [p.137]
13. **Visão não é spec: peça persuasiva (storyboard, narrativa/white paper, visiontype); 2 a 5 anos (5 a 10 para hardware); ≠ missão.** [p.143-144] "the vision is not in any sense a spec" (p.143).
14. **Estratégia de produto = sequência de produtos/releases; foco em um mercado-alvo por vez; "smallest actual deliverable product that makes these ... customers successful".** [p.144-145] Armadilha: um release gigante que tenta agradar a todos ("trying to please everybody at once will almost certainly please nobody", p.144).
15. **Priorização de mercados: TAM, GTM, TTM (ordem dada no livro); mercado maior com canal novo perde para menor com canal existente; decisão conjunta de head of product, head of technology, head of product marketing.** [p.146-147]
16. **Contexto mínimo para um time empoderado: visão de produto + objetivos de negócio por time; a liderança não diz como resolver.** [p.122] "nothing is said about how to actually solve the problems they are assigned" (p.122).
17. **Anti-padrão de especificação: PM entrega só user stories de alto nível a engenheiros sem design, que acabam inventando o design.** [p.76] Também: PM fazendo wireframes e passando o visual a outro designer [p.76-77]. (O livro lista como problemas; não prescreve um formato alternativo neste bloco.)
18. **PM não prescreve o "como" aos engenheiros; compartilha dor do cliente, dados e restrições do negócio e dá latitude.** [p.80-81]
19. **Time mínimo: 2 engenheiros + 1 PM (+ designer se há interface); 1 e apenas 1 PM por time; ~10-12 engenheiros é o limite que um PM + designer conseguem manter ocupados.** [p.115] (Contexto organizacional; usar com cautela, é regra de estrutura de time.)
20. **Posicionamento (market position) ≠ mensagem (assets, ferramentas de venda, treinamento); "funciona para o negócio" inclui mercado, diferenciação, aquisição eficaz em custo, canais.** [p.83-84]

## Checklist de cobertura
- Primeira página lida: 75
- Última página lida: 148 (confirmado por Grep: último marcador "=== PDF PAGINA 148 ===" na linha 2810, vazia)
- Páginas sem texto útil ou ilegíveis: 86, 90, 106, 130, 134, 142, 148 (vazias, provavelmente páginas em branco ou de abertura de parte). Não são OCR; sem aviso de conteúdo visual perdido.
- Problemas de extração observados: caixas de citação lateral (pull quotes) aparecem entrelaçadas com o texto do corpo nas linhas (ex.: p.77, 84, 93, 125, 139, 145-146); algumas citações marcadas acima têm leve ajuste por essa intercalação, indicado como "trecho". A numeração impressa (rodapé/cabeçalho) = PDF - 20. Seções "(continued)" de caixas laterais (ex.: p.81-82, 103-105, 117-122, 138-140, 146-147) interrompem o fluxo mas o conteúdo é contínuo. Sem tabelas ou figuras com conteúdo perdido neste bloco.
- Capítulos/seções cobertos integralmente: Ch.12-23 (12 Engineers, 13 Product Marketing, 14 Supporting Roles, 15 Jane Manning, People @ Scale, 16 Leadership, 17 Head of Product, 18 Head of Technology, 19 Delivery Manager, 20 Structuring Teams/Autonomy @ Scale, 21 Lea Hickman, Part III abertura, Roadmaps overview, 22 Problems with Roadmaps, 23 Alternative to Roadmaps)
- Capítulos/seções que continuam em outro bloco: Ch.11 The Product Designer (começou no bloco anterior; fim em p.75-78 aqui); Ch.24 Product Vision and Product Strategy (começa em p.143, continua no próximo bloco após "Prioritizing Markets", p.147).
