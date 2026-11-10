# Notas de leitura: Software Architecture: The Hard Parts (Ford, Richards, Sadalage, Dehghani), bloco 01, PDF p.1-77

Observações gerais: o texto do bloco está em inglês (não em português, apesar de o pedido citar "edição em português"). Convenção de páginas: [p.N] = "PDF PAGINA N". Numeração impressa: capítulos arábicos começam em PDF 19 = impr. 1 (impr. = PDF - 18); preâmbulo em romanos (PDF 13 = impr. xi). Todos os conceitos abaixo estão em paráfrase minha; citações são curtas e entre aspas.

---

### Capa, elogios, copyright (PDF p.1-6)
Material editorial (título, autores Neal Ford, Mark Richards, Pramod Sadalage, Zhamak Dehghani; O'Reilly, 1ª edição outubro 2021; blurbs). Sem conteúdo técnico. [p.1-6]
Decisão sugerida: descartar (sem conteúdo técnico).

### Sumário (PDF p.7-12) [estrutura apenas]
Estrutura do livro: Prefácio; Cap.1 sem "best practices" (ADRs, fitness functions, Sysops Squad); **Parte I, Pulling Things Apart**: Cap.2 acoplamento (quantum, estático/dinâmico), Cap.3 modularidade, Cap.4 decomposição (acoplamento aferente/eferente, abstração/instabilidade, distância da sequência principal, decomposição por componentes, tactical forking), Cap.5 padrões de decomposição por componentes (Identify and Size, Gather Common Domain, Flatten, Determine Dependencies, Create Component Domains, Create Domain Services), Cap.6 dados operacionais (drivers de decomposição: disintegrators/integrators; 5 passos para decompor dados; tipos de banco), Cap.7 granularidade de serviço (disintegrators: escopo/função, volatilidade de código, escalabilidade/throughput, tolerância a falhas, segurança, extensibilidade; integrators: transações de banco, workflow/coreografia, código compartilhado, relações de dados); **Parte II, Putting Things Back Together**: Cap.8 padrões de reuso (code replication, shared library, shared service, sidecar/service mesh), Cap.9 ownership de dados e transações distribuídas (single/common/joint ownership; técnicas table split, data domain, delegate, service consolidation; padrões de consistência eventual: background sync, orchestrated request-based, event-based), Cap.10 acesso a dados distribuído (interservice communication, column schema replication, replicated caching, data domain), Cap.11 workflows distribuídos (orquestração, coreografia, estado do workflow), Cap.12 sagas transacionais (8 padrões, máquinas de estado), Cap.13 contratos (estrito vs frouxo, stamp coupling), Cap.14 dados analíticos (warehouse, lake, data mesh), Cap.15 construa sua própria análise de trade-off; Apêndices A (conceitos), B (ADRs), C (trade-offs). [p.7-12]
Relevância: serve como mapa para os próximos blocos (catálogos de granularidade, dados, sagas, contratos); nenhum detalhe aqui.
Decisão sugerida: usar só como mapa de roteamento para os demais blocos.

### Prefácio e agradecimentos (PDF p.13-17; impr. xi-xv)
Prefácio: o livro nasce de exemplos difíceis separados durante o livro anterior (Fundamentals of Software Architecture); cada um sem solução fácil, só trade-offs. Primeira revelação: a importância crescente de dados nas decisões arquiteturais (quem acessa, quem escreve, separação entre dado analítico e operacional); por isso convidaram especialistas de dados. [p.13] O resto é convenções tipográficas, permissões, contato e agradecimentos [p.14-17]; sem conteúdo técnico.
Decisão sugerida: descartar, exceto a motivação "dados" já registrada acima.

---

### Cap.1 What Happens When There Are No "Best Practices"? (PDF p.19-39; impr. 1-21)
Resumo: problemas de arquitetura raramente têm solução genérica; o papel do arquiteto é avaliar objetivamente os trade-offs de cada lado e escolher o conjunto "menos pior". O capítulo apresenta a centralidade dos dados, ADRs, fitness functions, um vocabulário mínimo de definições e o caso Sysops Squad.

**1.1 Sem melhores práticas / least worst (p.19-21)**
Conceitos e regras:
- Arquitetos raramente encontram problemas comuns com resposta pronta online; cada situação combina ambiente e circunstâncias únicos ("todo problema é um floco de neve") [p.19]
- Silver bullets são raras (Brooks, "No Silver Bullet"); o trabalho real é determinar e avaliar objetivamente os trade-offs dos dois lados de uma decisão consequente [p.20]
- Os autores evitam falar em "melhor solução", porque "melhor" implicaria maximizar todos os fatores concorrentes; o conselho é buscar a combinação menos pior de trade-offs. Frequentemente nenhuma característica arquitetural brilha sozinha, mas o equilíbrio de todas promove o sucesso do projeto [p.20]
- "Hard" no título tem duplo sentido: difícil e sólido/fundacional (arquitetura é estrutural, design é mais fácil de mudar) [p.20]
- Definição jocosa citada: arquitetura é "o que é difícil mudar depois" [p.21]
- Conselho "atemporal": o livro foca em como decidir e pesar trade-offs, não em tecnologia; exemplos contemporâneos só dão contexto. Exemplo histórico: SOA orquestrada dominou por restrições da época (fusões de empresas, open source inviável politicamente); a virada para microsserviços veio quando Linux ficou operacionalmente gratuito (Puppet/Chef) e depois containers/Kubernetes. Lição: avaliar as restrições que tornaram um estilo dominante [p.21]
Citações curtas de prova:
- "Don't try to find the best design in software architecture; instead, strive for the least worst combination of trade-offs." [p.20]
- "software architecture is the stuff that's hard to change later" [p.21]

**1.2 Importância dos dados (p.22-23)**
- Dados vivem mais que sistemas; "toda arquitetura de software está a serviço dos dados" (paráfrase de afirmação do texto) [p.22]
- Instintos de arquitetos de dados por sistemas fortemente acoplados conflitam com arquiteturas distribuídas; é preciso garantir que o dado de negócio sobreviva à quebra do monólito [p.22]
- Por que microsserviços parecem mais difíceis que sistemas distribuídos de décadas atrás: antes o dado ficava em um único banco relacional; com bounded context (DDD) como limite de acoplamento de implementação, o dado passou a ser preocupação arquitetural, junto com transacionalidade [p.22]
- Distinção dado **operacional** (OLTP: vendas, transações, inventário; se parar, a organização não funciona por muito tempo; inserir/atualizar/apagar) vs **analítico** (cientistas de dados/analistas, previsões, tendências; tipicamente não transacional e frequentemente não relacional, podendo estar em grafo ou snapshots em formato diferente; não crítico para operação diária, mas para direção estratégica) [p.22-23]

**1.3 ADRs (p.23)**
- ADR: arquivo curto (1-2 páginas) descrevendo uma decisão arquitetural; popularizado por Michael Nygard; "adopt" no Technology Radar da Thoughtworks; escrito em texto, AsciiDoc, Markdown ou template de wiki [p.23]
- Formato usado no livro (todos assumidos como aprovados): título = frase nominal curta com a decisão; **Context** (1-2 frases do problema + lista de alternativas); **Decision** (a decisão com justificativa detalhada); **Consequences** (consequências após aplicar + trade-offs considerados). Todos os ADRs do livro listados no Apêndice B [p.23]
- Documentar a decisão é diferente de governar seu uso correto; governança pode ser automatizada com fitness functions [p.23]

**1.4 Fitness functions (p.24-31; impr. 6-13)**
- Governança arquitetural = qualquer supervisão organizada de aspectos do desenvolvimento; problema: como garantir que implementadores sigam o design. Análise histórica: XP/CI (feedback e automação), DevOps; a governança hoje ainda é um trabalho recorrente feito manualmente por papel caro (code reviews, comitês de revisão), com detalhes escapando [p.24-25]
- Definição (de Building Evolutionary Architectures, 2017): fitness function é qualquer mecanismo que faz uma avaliação objetiva de integridade de uma ou mais características de arquitetura [p.25]
  - "Qualquer mecanismo": bibliotecas de teste de estrutura, monitores (performance/escalabilidade), frameworks de chaos engineering (resiliência) [p.25]
  - "Avaliação objetiva": não dá para pedir "alta performance"; precisa de valor mensurável. Cuidado com **características compostas** (ex.: "agilidade" não é mensurável, mas decompõe-se em deployability, testability, cycle time); incapacidade de medir indica definição vaga demais [p.25]
  - Escopo **atômico** (uma característica isolada, ex.: ciclos entre componentes) vs **holístico** (combinação de características interligadas, ex.: segurança afeta performance; escalabilidade vs elasticidade) [p.25-26]
- Fitness function vs teste unitário: fitness functions validam características arquiteturais, não critérios de domínio. Pergunta de decisão: "é preciso conhecimento de domínio para executar este teste?" Sim = teste unit/funcional/aceitação; Não = fitness function. Ex.: elasticidade (independe do domínio) vs validar partes de um endereço (teste tradicional). Separação não é puramente binária [p.26]
- Exemplos de código (não reproduzidos): JDepend em teste JUnit que falha se houver ciclos de pacotes (anti-padrão de dependência cíclica → Big Ball of Mud; code review chega tarde demais); ArchUnit definindo camadas Controller/Service/Persistence e quem pode acessar quem; NetArchTest (.NET) proibindo Presentation de depender de Data. SonarQube cita-se como ferramenta que traz fitness functions prontas [p.27-29]
- Objetivo não implica estático: fitness functions **dinâmicas** retornam valor dependente de contexto (ex.: performance por usuário em função do nº de usuários concorrentes) [p.29]
- Podem ser **manuais** (ex.: advogado revisando mudança em código de informação legal sensível), via estágios manuais do pipeline; devem rodar o mais frequentemente possível, idealmente continuamente em CI; "on demand" é raro [p.29]
- Governança de empresa: caso Equifax (2017, vulnerabilidade do Apache Struts, patch disponível em março, varredura incompleta, patch aplicado em muitos sistemas só em julho). Mundo alternativo: security team com um "slot" no pipeline de cada time para inserir fitness functions (ex.: falhar o build se detectar framework/versão perigosa; também checagens mundanas como não guardar senha em banco). Pipelines reagem a mudança de código, schema, configuração de deploy e das próprias fitness functions [p.30]
- Benefícios: arquiteto volta a codar; vira especificação executável da arquitetura. Limites: não abusar, não formar "cabal" numa torre de marfim construindo conjunto complexo e interligado que frustra devs; é uma checklist executável de princípios **importantes mas não urgentes** (causa frequente de dívida técnica é "depois a gente corrige"); analogia com The Checklist Manifesto (Gawande) [p.30-31]
Citações curtas de prova:
- "Fitness functions validate architecture characteristics, not domain criteria; unit tests are the opposite." [p.26]
- "a validation that doesn't run can't validate anything" [p.29]

**1.5 Arquitetura vs design e definições (p.31-33; impr. 13-15)**
Os autores adotam definições deliberadamente simples ("verging on simplistic") [p.32]:
- **Service**: coleção coesa de funcionalidade implantada como executável independente; no vocabulário do Cap.2, parte de um architecture quantum [p.32]
- **Coupling**: dois artefatos estão acoplados se uma mudança em um pode exigir mudança no outro para manter o funcionamento correto [p.32]
- **Component**: bloco arquitetural que faz função de negócio ou infraestrutura, manifestado como pacote/namespace/diretório (ex.: Order History em app.business.order.history) [p.32]
- **Comunicação síncrona**: o chamador espera a resposta antes de continuar; **assíncrona**: não espera, podendo ser notificado depois por outro canal [p.32]
- **Coordenação orquestrada**: existe um serviço cuja responsabilidade primária é coordenar o workflow; **coreografada**: sem orquestrador, serviços compartilham a coordenação [p.32-33]
- **Atomicidade**: workflow atômico mantém estado consistente o tempo todo; o oposto é o espectro de consistência eventual (o texto remete ao "Chapter 6"; ver nota de extração) [p.33]
- **Contract**: termo amplo para a interface entre duas partes de software (chamadas de método/função, chamadas remotas, dependências...); onde duas partes se juntam há um contrato [p.33]
- "Segunda lei da arquitetura de software" (do livro anterior): por quê é mais importante que como; foco em arquitetura, não implementação [p.31]
Citação: "why is more important than how" [p.31]

**1.6 Sysops Squad Saga: introdução (p.33-39; impr. 15-21)**
- Cenário recorrente: Penultimate Electronics vende planos de suporte; técnicos (Sysops Squad) vão à casa/escritório do cliente. Usuários: Administrador, Cliente, Expert, Manager [p.33-34]
- Fluxos não-ticket (cadastro de experts, registro de clientes, cobrança mensal, relatórios) e fluxo de ticket (cliente abre ticket, sistema escolhe expert por skill/localização/área/disponibilidade, envia ao app móvel e SMS, notifica cliente, expert acessa knowledge base, marca completo, survey por e-mail) [p.34-35]
- Problema: monólito grande e antigo; tickets perdidos, expert errado, indisponibilidade, mudança arriscada e lenta, travamentos de 5 min a 2 h derrubando tudo; risco de encerrar a linha de negócio [p.35-36]
- Componentes existentes (18, namespaces ss.*): login, billing payment/history, customer notification/profile, expert profile, KB maintenance/search, reporting, ticket, ticket assign/notify/route, support contract, survey, survey notify/templates, user maintenance [p.36-37]
- Modelo de dados: um único schema, 3ª forma normal, poucas stored procedures/triggers, bastante views usadas sobretudo pelo componente Reporting; 25 tabelas aproximadamente (Customer, Billing, Contract, Payment, Survey*, Ticket*, Article/Tag/Keyword, Expert_Profile etc.) [p.37-39]
O que este trecho NÃO diz (Cap.1): não apresenta ainda nenhum catálogo de trade-offs nem passos de decomposição; a noção de quantum e os padrões de saga só aparecem no Cap.2; não define o que é "arquitetura" formalmente além da frase jocosa.
Relevância:
- architecture-hard-parts-expert: ALTA, least worst, ADR (formato oficial), fitness functions (atômica/holística, objetiva, vs teste unitário, manual/dinâmica, continuidade, limites de abuso), operacional vs analítico, definições-chave.
- software-architecture (grupo): MÉDIA, definições compartilhadas e a regra "dados são arquitetura".
Decisão sugerida: usar em architecture-hard-parts-expert (novo reference de fitness functions e glossário de definições; ajustar seção de ADR e de dados). Sysops Squad: descartar como conteúdo da skill (só útil como exemplo opcional).

---

### Parte I, Pulling Things Apart (intro) (PDF p.41-42; impr. 23-24)
Resumo: apresenta a divisão de acoplamento em estático e dinâmico (Meilir Page-Jones) e o plano da Parte I.
Conceitos:
- **Acoplamento estático**: como as partes (classes, componentes, serviços) estão ligadas: dependências, grau de acoplamento, pontos de conexão; em geral mensurável em tempo de compilação [p.41]
- **Acoplamento dinâmico**: como as partes se chamam: tipo de comunicação, informação trafegada, rigidez dos contratos [p.41]
- A Parte I trata da estrutura (acoplamento estático); Cap.2 escopo de estático/dinâmico; Cap.3 modularidade; Cap.4 avaliação de codebases; Cap.5 padrões de decomposição; Cap.6 impacto dos dados e reconciliação entre fronteiras de serviço e de dado; Cap.7 integrators e disintegrators, forças que encorajam serviço maior ou menor [p.41-42]
- A Parte II tratará de acoplamento dinâmico e padrões de comunicação (p.60)
O que NÃO diz: a definição de "estático" aqui (mensurável em compile time) é mais estreita que a do Cap.2 (dependências operacionais, p.46-47).
Relevância: architecture-hard-parts-expert: ALTA (corrige/refina a seção "Análise de Acoplamento"). Decisão: usar.

---

### Cap.2 Discerning Coupling in Software Architecture (PDF p.43-62; impr. 25-44)
Resumo: propõe um framework de três passos para trade-off analysis e introduz o architecture quantum, definido por deploy independente, alta coesão funcional e acoplamento estático alto + acoplamento dinâmico síncrono. Distingue acoplamento estático (como se "fia" para operar) de dinâmico (como se comunicam em runtime) e mostra que dinâmico é um espaço de três forças cuja combinação gera 8 padrões nomeados (as sagas do Cap.12).

**2.1 Por que as decisões em arquitetura distribuída são difíceis (p.43-45)**
- Conselho genérico de "desacople ao máximo" é inútil: sistemas totalmente desacoplados não se comunicam; acoplamento não é inerentemente ruim, a dose importa (citação de Paracelsus no texto) [p.44]
- Microsserviços finos trazem decoupling mas viram problemas de orquestração, transacionalidade e assincronia; não há guia universal para granularidade e comunicação [p.44]
- Por que microsserviços ficaram mais complexos que sistemas distribuídos anteriores: a filosofia de bounded context move o banco para dentro da fronteira do serviço, tornando transacionalidade uma preocupação arquitetural de primeira classe (antes, handlers ligavam-se a um único banco relacional que cuidava de integridade e transações) [p.44]
- ATAM é citado como método existente que carece de foco nos problemas diários [p.44-45]
- **Framework em 3 passos** [p.45]: (1) encontrar quais partes estão emaranhadas; (2) analisar como estão acopladas; (3) avaliar trade-offs determinando o impacto de mudança nos sistemas interdependentes. Definição de coupling: duas partes são acopladas se uma mudança em uma pode causar mudança na outra [p.45]
- Problema-guia do livro: como determinar tamanho e estilos de comunicação de microsserviços; serviços pequenos demais geram problemas transacionais e de orquestração, grandes demais geram problemas de escala e distribuição [p.45-46]
Citações:
- "Two parts of a software system are coupled if a change in one might cause a change in the other." [p.45]

**2.2 Architecture quantum (p.46-55)**
- Definição: artefato independentemente implantável, com alta coesão funcional, alto acoplamento estático e acoplamento dinâmico síncrono; exemplo comum: microsserviço bem formado dentro de um workflow [p.46]
- **Acoplamento estático**: como as dependências se resolvem via contratos; inclui sistema operacional, frameworks e bibliotecas (dependências transitivas) e qualquer requisito operacional necessário para o quantum operar [p.46]. **Dinâmico**: como os quanta se comunicam em runtime (síncrono/assíncrono); fitness functions desses aspectos devem ser contínuas, tipicamente via monitores [p.47]
- Diferença prática: estático = dependências operacionais (o serviço precisa do banco para funcionar); dinâmico = dependências de comunicação (chama outro serviço durante o workflow; nenhum dos dois exige o outro presente, exceto por esse workflow) [p.47]
Citação: "static coupling analyzes operational dependencies, and dynamic coupling analyzes communication dependencies." [p.47]
- **Deploy independente** [p.47-48]: monólito = um quantum por definição; serve de linguagem comum entre arquitetos, desenvolvedores e operações; representa a força "static coupling" na granularidade de serviços (cadência de release, serviços afetados, práticas de engenharia); força a incluir pontos de acoplamento comuns como bancos de dados (e UI): sistema com banco compartilhado falha o critério, a menos que o deploy do banco ande em lockstep com o da aplicação
- **Alta coesão funcional** [p.48]: proximidade de elementos relacionados; sobrepõe-se ao bounded context do DDD (comportamento e dados de um workflow de domínio); um monólito gigante é um quantum por deploy mas dificilmente funcionalmente coeso; quanto maior, menos provável. Coesão aqui trata de quão independente/acoplado um serviço é de outro, não de como interagem
- **Alto acoplamento estático** [p.48-49]: aspecto de contratos (REST/SOAP, assinaturas de método, IPs/URLs como pontos de acoplamento); contratos são "hard part" (Cap.13)
- Contagem de quanta por estilo [p.49-55]:
  - Qualquer monólito (um deploy, um banco) = 1 quantum [p.49-50]
  - **Service-based architecture** (definição do livro: UI separada, serviços remotos de grão grosso, banco monolítico) = 1 quantum por causa do banco único; alvo comum ao reestruturar monólitos, pois decompõe sem mexer em schemas e pontos de integração (Cap.5) [p.50]
  - **EDA mediada** = 1 quantum (banco e o Request Orchestrator); regra: qualquer ponto de acoplamento holístico necessário ao funcionamento forma um quantum em torno dele [p.51]
  - **EDA broker** (sem mediador) com banco relacional único = 1 quantum; pergunta do critério estático: "esta dependência é necessária para dar bootstrap neste serviço?"; mesmo serviços que não acessam o banco entram se dependem de serviços que acessam [p.51]
  - **EDA com dois data stores e sem dependências estáticas entre os conjuntos** = múltiplos quanta; cada um roda e opera em ambiente tipo produção, mesmo sem participar de todos os workflows [p.52]
  - Pontos estáticos incluem SO, data store, message broker, orquestração de containers etc., com os contratos mais estritos possíveis (dependências operacionais) [p.52]
  - **Microsserviços** podem formar um quantum por serviço (decoupling inclusive de dados); cada serviço (como bounded context) pode ter características arquiteturais próprias (escala, segurança...) [p.53-54]
  - **UI fortemente acoplada** reduz microsserviços a 1 quantum (a UI não opera se partes do backend não estão disponíveis; difícil dar características operacionais diferentes por serviço, especialmente com chamadas síncronas); mitigação: UI assíncrona e **micro-frontends** (cada serviço + seu componente de UI forma um quantum; a UI é um canvas e usa eventos) [p.54-55]
  - **Banco compartilhado entre dois sistemas** forma ponto de acoplamento e um único quantum [p.55-56]
- Uso prático: diagrama estático de quanta para entender arquitetura legada, ver o que será impactado por mudança e como desacoplar [p.55]
Citação: "any holistic coupling point necessary for the architecture to function forms an architecture quantum around it" [p.51]

**2.3 Acoplamento dinâmico de quantum: três forças (p.56-59)**
- O modo como serviços se chamam é um espaço multidimensional de decisão com três forças entrelaçadas [p.56]:
  - **Communication**: síncrona vs assíncrona [p.56]. Síncrona: o chamador bloqueia até receber valor/status (ex.: gRPC); assíncrona: chamador posta mensagem (usualmente fila), recebe ack de que será processada e volta ao trabalho; se precisa de resposta, receptor usa reply queue; filas são omitidas em diagramas por ruído, e é possível assíncrono sem filas [p.57]. Decisões de comunicação afetam sincronização, tratamento de erro, transacionalidade, escalabilidade e performance [p.58]
  - **Consistency**: atômica (tudo ou nada) em um extremo, vários graus de consistência eventual no outro; transações entre serviços estão entre os problemas mais difíceis, daí o conselho geral de evitar transações cross-service (Caps. 6, 9, 10, 12) [p.58]
  - **Coordination**: orquestração vs coreografia (Cap.11); workflows simples (um serviço respondendo) dispensam atenção; quanto mais complexo, maior a necessidade de coordenação [p.58]
- As forças não podem ser decididas isoladamente: cada escolha "gravita" sobre as outras. Ex.: transacionalidade é mais fácil em arquiteturas síncronas com mediação; escala maior é possível com sistemas assíncronos, coreografados e eventualmente consistentes [p.58]
- Podem ser plotadas num espaço 3D (Figura 2-13) para entender o balanço de forças de uma decisão [p.58-59]
- **Tabela 2-1: matriz das 8 combinações** (nome, comunicação / consistência / coordenação, acoplamento) [p.59]. A extração da tabela está desalinhada; a leitura abaixo segue a ordem e o código de 3 letras (s/a = sync/async; a/e = atomic/eventual; o/c = orchestrated/choreographed):
  - Epic Saga (sao): síncrono, atômico, orquestrado, acoplamento muito alto
  - Phone Tag Saga (sac): síncrono, atômico, coreografado, alto
  - Fairy Tale Saga (seo): síncrono, eventual, orquestrado, alto
  - Time Travel Saga (sec): síncrono, eventual, coreografado, médio
  - Fantasy Fiction Saga (aao): assíncrono, atômico, orquestrado, alto
  - Horror Story (aac): assíncrono, atômico, coreografado, médio
  - Parallel Saga (aeo): assíncrono, eventual, orquestrado, baixo
  - Anthology Saga (aec): assíncrono, eventual, coreografado, muito baixo
- O texto promete investigar cada dimensão isoladamente nos capítulos seguintes e reentrelaçá-las no Cap.12; a Parte I trata acoplamento estático (ownership de dados, transacionalidade, granularidade) e a Parte II acoplamento dinâmico [p.59-60]

**2.4 Sysops Squad Saga: Understanding Quanta (p.60-62)** (diálogo ilustrativo)
- Quantum = bounded context do DDD em termos arquiteturais, mas o livro não reutiliza "bounded context" para não sobrecarregar o termo; o quantum acrescenta os tipos de acoplamento [p.60]
- Teste do bootstrap: o que é necessário para construir/subir o serviço do zero? Java, Spring Boot, dezenas de libs (POM), Postgres, Docker, e o broker de eventos (a presença do broker é estática; chamar outro serviço via broker é dinâmico) [p.60-61]
- Uso defensivo: diagrama de acoplamento estático por serviço para análise de confiabilidade/mitigação de risco (se eu mudar isto, o que deve ser testado; como times impactam uns aos outros). Não existe ferramenta pronta; a equipe de plataforma constrói uma customizada usando manifests de container, POMs, dependências NPM e logs de observabilidade (grafo de chamadas) [p.61]
- Exemplo dinâmico: elasticidade; Ticketing opera a 10x a escala elástica de Assignment; chamada síncrona entre eles faz o workflow inteiro "atolar" no serviço mais lento; assíncrona com fila como buffer permite independência operacional. O quantum define o escopo das características arquiteturais; o tipo de chamada pode acoplar quanta temporariamente (performance, responsividade, escala) [p.61-62]
- Escalabilidade (muitos usuários concorrentes) vs elasticidade (rajada de requisições em curto tempo) [p.61]
O que este capítulo NÃO diz: não detalha cada saga (só nomes e níveis de acoplamento); não dá guia de quando preferir cada combinação; não explica por que cada célula tem aquele nível de acoplamento (promete cobrir no Cap.12); o texto cita "Chapter 6" para consistência eventual no glossário (p.33) mas depois remete aos Caps. 6, 9, 10, 12.
Relevância:
- architecture-hard-parts-expert: ALTA, base de "Análise de Acoplamento" (definições corretas), quantum, matriz 8 padrões, triângulo comunicação/consistência/coordenação, regras de contagem de quanta, critério do bootstrap.
- software-architecture (grupo): ALTA, usar quantum para fronteiras de decomposição e ligar a bounded context.
Decisão sugerida: usar em architecture-hard-parts-expert (novo reference `coupling-quantum.md` + tabela das 8 combinações) e citar no grupo software-architecture como etapa de diagnóstico estático/dinâmico.

---

### Cap.3 Architectural Modularity (PDF p.63-77) [continua no próximo bloco: Sysops Squad Saga "Creating a Business Case" começa em p.77]
Resumo: justifica a quebra de monólitos por drivers de negócio (speed-to-market e vantagem competitiva) e mapeia cinco características arquiteturais habilitadoras: manutenibilidade, testabilidade, deployabilidade, escalabilidade e disponibilidade/tolerância a falhas. Cada uma melhora com modularidade, mas degrada quando serviços se comunicam demais.

Conceitos e regras:
- Abertura narrativa: para convencer o negócio a financiar a decomposição é preciso (1) entender os benefícios da modularidade, (2) casá-los com os problemas reais, (3) analisar e documentar os trade-offs; "nada mais funciona" não é justificativa [p.63-64]
- Contexto de mudança: fusões/aquisições, concorrência, demanda, inovação (ML/IA) e mudanças técnicas (containers, cloud, DevOps, CD) pressionam a arquitetura, que deve mudar apesar de ser "fundacional"; monólitos esgotam recursos de máquina (analogia do copo d'água: adicionar outro copo igual não ajuda; dividir a água em dois copos dá capacidade; boa analogia para executivos) [p.65-66]
- **Drivers de modularidade**: não quebrar sem driver de negócio claro; primários: speed-to-market e vantagem competitiva [p.67]. Speed-to-market vem de agilidade arquitetural (capacidade de responder rápido a mudança), característica **composta** de manutenibilidade, testabilidade e deployabilidade; vantagem competitiva = speed-to-market + escalabilidade + disponibilidade/tolerância a falhas. Cinco características: disponibilidade (tolerância a falhas), escalabilidade, deployabilidade, testabilidade, manutenibilidade [p.67]
- Modularidade não implica arquitetura distribuída: manutenibilidade, testabilidade e deployabilidade também podem vir de **monólito modular** (componentes agrupados em domínios, "domain partitioned architecture") ou **microkernel** (plug-ins, escopo menor de teste/deploy) [p.68]
- **Manutenibilidade** (p.68-72): facilidade de adicionar/mudar/remover features e aplicar mudanças internas (patches, upgrades). Composta, difícil de definir objetivamente; menciona métrica ML (von Zitzewitz): nível de manutenibilidade de 0-100% em função do acoplamento entre componentes, com foco no acoplamento incoming; mais acoplamento incoming = menor manutenibilidade (a fórmula está corrompida na extração) [p.68-69]. Métricas típicas: acoplamento de componentes, coesão de componentes, complexidade ciclomática, tamanho de componente (statements), particionamento técnico vs de domínio [p.69]. Monólitos em camadas têm baixa manutenibilidade (particionamento técnico, acoplamento forte, coesão de domínio fraca); exemplo "data de expiração na wish list" exige coordenar UI, backend e banco; escopo da mudança é **nível de aplicação** em monólito em camadas, **nível de domínio** em service-based, **nível de função** em microsserviços; mais modularidade = mais manutenibilidade [p.69-72]
- **Testabilidade** (p.72-73): facilidade E completude de teste. Monólitos têm baixa testabilidade (regressão completa difícil, centenas/milhares de testes para mudança simples, falhas não relacionadas à mudança). Modularidade reduz o escopo, mas se os serviços se comunicam mais, o escopo de teste de uma mudança volta a incluir os outros e a testabilidade cai rapidamente [p.72-73]
- **Deployabilidade** (p.73-74): facilidade, frequência e risco de deploy. Monólitos: cerimônia (code freeze, mock deploys), risco, intervalos de semanas a meses. Também degrada à medida que serviços ficam menores e se comunicam mais; se microsserviços precisam ser implantados como conjunto em ordem específica, melhor voltar ao monólito (Matt Stine); resultado é o "big ball of distributed mud" [p.73-74]
- **Escalabilidade vs elasticidade** (p.74-77): escalabilidade = manter responsividade conforme a carga cresce gradualmente; elasticidade = responsividade durante picos instantâneos e erráticos (ex.: venda de ingressos de 20 a 3.000 usuários concorrentes em segundos). Elasticidade depende de MTTS (mean time to startup) baixo, obtido com serviços pequenos e de granularidade fina, mais plataformas/runtimes leves. Elasticidade é mais função de **granularidade** (tamanho da unidade de deploy); escalabilidade é mais função de **modularidade** (quebrar em unidades de deploy) [p.74-75]. Ratings do livro anterior: layered baixo em ambos; service-based melhora escalabilidade mais que elasticidade (serviços de domínio de grão grosso, MTTS longo; escala no nível de domínio); microsserviços maximizam ambos (escala em nível de função; MTTS excelente) [p.75]. Quanto mais serviços se comunicam para uma transação de negócio, pior para escalabilidade e elasticidade; manter comunicação síncrona mínima quando se exige alta escala/elasticidade [p.75]
- **Disponibilidade / tolerância a falhas** (p.76-77): definida aqui como capacidade de partes do sistema continuarem responsivas quando outras falham (ex.: pagamento cai por out-of-memory mas busca e pedidos continuam). Monólitos têm baixa tolerância; várias instâncias balanceadas mitigam mas são caras e ineficazes (um bug de programação existe nas duas instâncias). Modularidade isola falhas catastróficas por unidade de deploy (nível de domínio/função). **Ressalva**: se outros serviços dependem sincronamente de um serviço que falha, não há tolerância a falhas; por isso a comunicação assíncrona entre serviços é essencial [p.76-77]
- Início da Sysops Squad Saga do capítulo: casar problemas (mudanças lentas e quebrando, testes) com drivers; manutenibilidade e testabilidade como falhas centrais (>30% dos testes comentados ou obsoletos; falta teste em partes críticas; suíte inteira precisa rodar a cada mudança) [p.77]; continua no próximo bloco.
Citações curtas de prova:
- "Architects shouldn't break a system into smaller parts unless clear business drivers exist." [p.67]
- "please put them back in a monolith and save yourself some pain" [p.74]
O que este trecho NÃO diz: não oferece quantificação (custo/benefício) do business case; as notas de testabilidade/deployabilidade sobre "serviços pequenos demais" são qualitativas; a conclusão da Sysops Squad (o business case final) está no próximo bloco; os ratings de estrelas estão em figura (p.76), não em texto; o texto cita "Appendix B" para referências de modular monolith/microkernel.
Relevância:
- architecture-hard-parts-expert: ALTA, seção de "drivers de modularidade" e "quando NÃO quebrar" (cinco características, ressalvas por comunicação), business case de decomposição, monólito modular como alternativa legítima.
- software-architecture (grupo): ALTA, critérios de entrada antes de decompor um monólito.
Decisão sugerida: usar em architecture-hard-parts-expert (novo reference `modularity-drivers.md`) e no grupo software-architecture (gate "há driver de negócio?" antes de decompor).

---

## Auditoria da skill atual

Skill auditada: `architecture-hard-parts-expert` v1.0 (SKILL.md 184 linhas; references/adr-template.md; references/trade-off-table.md). Leitura feita DEPOIS das notas acima. Observação: o bloco cobre só Caps. 1-3 (e início da Sysops Squad do Cap.3); afirmações da skill sobre dados, granularidade detalhada, orquestração/coreografia, sagas e contratos só podem ser verificadas em blocos posteriores.

### (a) O que a skill afirma e o bloco confirma

- "Não existe arquitetura perfeita/silver bullet" e "Nunca responda: esta é a melhor solução"; princípio **Least Worst**: confirmado, o livro rejeita "melhor" porque implicaria maximizar todos os fatores, e propõe a combinação menos pior [p.20].
- Mentalidade "toda decisão cria restrições futuras / sem silver bullet": consistente com Brooks e com "toda mudança do ecossistema" [p.20-21]. (As frases "toda abstração possui um preço" etc. são da skill, não do livro.)
- "Dados geralmente vivem mais que sistemas": confirmado (Berners-Lee e texto) [p.22].
- Dados Operacionais (OLTP) priorizam integridade/disponibilidade vs Analíticos: a distinção operacional/analítico é confirmada [p.22-23]; o livro diz operacional = o que a empresa roda, se parar a organização não funciona por muito tempo [p.22].
- "Nunca assuma banco por serviço é sempre melhor": compatível com o livro, que descreve service-based architecture com banco único como escolha legítima quando se vê pouco valor na separação [p.50]; e microsserviços "podem" formar quanta próprios, não "devem" [p.53].
- Consistência forte vs eventual e o custo/ganho: o livro confirma que transacionalidade é mais fácil em arquiteturas síncronas com mediação e que maior escala vem de sistemas assíncronos/coreografados/eventuais [p.58]; e que transações cross-service são das coisas mais difíceis [p.58].
- Comunicação síncrona (custo: acoplamento temporal, propagação de falhas) vs assíncrona (desacoplamento, resiliência): confirmado em fault tolerance (dependência síncrona de serviço falho anula a tolerância) [p.77], elasticidade (chamada síncrona entre serviços de escala diferente atola o workflow) [p.61-62], escalabilidade [p.75].
- Orquestração vs coreografia como eixo de decisão: confirmado como uma das três forças de coordenação [p.56-58] e definido como conceito [p.32-33]. (Os custos específicos que a skill lista, ver (b).)
- ADR com Contexto, Decisão, Consequências: confirmado como formato do livro [p.23]; ADR deve ser curto e versionável em texto/Markdown [p.23]. A skill ainda acrescenta Status, Alternativas e Fitness Functions (extensões; ver (b)/(c)).
- Fitness Functions: "arquitetura não deve existir só em diagramas", validar dependências proibidas e ciclos entre módulos [p.27-29] (JDepend, ArchUnit, NetArchTest), latência/throughput/resiliência via monitores e chaos [p.25]; segurança via slot de pipeline [p.30]. Confirmado.
- "Pergunta obrigatória: como esta decisão será governada automaticamente?": coerente com a tese de que ADR documenta e fitness function governa [p.23].
- Acoplamento estático/dinâmico como duas dimensões a analisar antes de distribuir: confirmado [p.41, p.46-47].
- Forças de granularidade: "serviço pequeno/grande demais" é o problema-guia do livro; pequenos demais geram problemas transacionais e de orquestração, grandes demais problemas de escala e distribuição [p.45-46]. Confirma o questionamento, não os itens específicos das listas da skill (ver (b)).
- Dimensões da "Avaliação Obrigatória" (performance, escalabilidade, resiliência etc.): o livro trata escalabilidade, elasticidade, deployabilidade, testabilidade, manutenibilidade, tolerância a falhas como características a avaliar [p.67]. Confirmação parcial.
- Anti-padrões "microservices são sempre melhores": o livro confirma que modularidade não exige distribuição (monólito modular, microkernel) [p.68] e que o corte exige driver de negócio [p.67].
- "Assuma que requisitos, times, tecnologias mudarão": compatível com [p.65] (arquitetura precisa mudar continuamente) e [p.21] (ecossistema se substitui peça por peça).

### (b) O que a skill afirma e o bloco contradiz ou não suporta

- **Acoplamento estático = "uma mudança exige recompilar outra parte?" / dinâmico = "uma parte depende da outra para funcionar?"**: não corresponde à definição do livro. No Cap.2, estático = como as partes estão "fiadas"/dependências operacionais necessárias para o quantum subir (SO, frameworks, libs, banco, broker, orquestração de containers) e é medido pelo teste de bootstrap [p.46-47, p.51-52, p.60-61]; dinâmico = como se comunicam em runtime (sync/async, informação trafegada, rigidez do contrato) [p.41, p.47]. O livro diz que nenhum serviço precisa que o outro esteja presente para funcionar, exceto pelo workflow [p.47]. A frase "recompilar" aproxima só a introdução da Parte I ("mensurável em tempo de compilação", [p.41]). Além disso a skill lista "contratos, schemas compartilhados" como estático, o que é compatível, mas "REST, gRPC, filas, eventos" como dinâmico mistura a presença do broker (estática) com a chamada via broker (dinâmica) [p.61]. Recomendação: reescrever as duas perguntas.
- **Orquestração: custo "ponto central de falha, acoplamento"; Coreografia: "observabilidade difícil, troubleshooting complexo"**: o bloco só sustenta que o orquestrador é um ponto de acoplamento holístico que força um quantum único (EDA mediada) [p.51] e que a transacionalidade é mais fácil com mediação [p.58]. "Ponto central de falha", "visibilidade/governança" e "observabilidade difícil" não aparecem no bloco (esperados no Cap.11); não suportado aqui.
- **Assíncrona: custo "rastreabilidade, debug, consistência eventual"**: o bloco só liga assíncrono a consistência eventual como combinação possível e a ganhos de escala/tolerância a falhas; "rastreabilidade/debug" não está no bloco.
- **Consistência: "forte = menor escalabilidade, maior acoplamento; eventual = custo de reconciliação"**: parcialmente suportado (acoplamento muito alto em sao, muito baixo em aec, [p.59]); o livro não fala de "reconciliação" aqui.
- **Forças para divisão/unificação de granularidade** (deploy/escala independentes, autonomia de times, BC; vs transações frequentes, dados compartilhados, mudanças simultâneas, coordenação): lista autoral da skill; o bloco só adianta o conceito de integrators/disintegrators (p.42) e o dilema pequeno/grande (p.45-46) sem enumerar. "Autonomia de times" não aparece como driver no bloco (os drivers listados são speed-to-market e competitividade, via manutenibilidade, testabilidade, deployabilidade, escalabilidade, tolerância a falhas) [p.67]. Não contradiz, mas não é suportado.
- **ADR com campos "Justificativa" separada e "Status/Decisores/Fitness Functions" (template)**: o livro integra a justificativa dentro de Decision e não tem Status/Decisores/Alternativas como seções [p.23]; título é frase nominal curta, alternativas são listadas no Context [p.23]. Extensões legítimas, mas a skill não as sinaliza como adaptação; o livro assume todos os ADRs aprovados.
- **Trade-off table, exemplo "Monólito Modular vs Microservices"** (references/trade-off-table.md):
  - "Monólito Modular: Escalabilidade → Neutro; Resiliência → Neutro; Observabilidade ↓ Baixo" e "Microservices: Resiliência ↑ Alto (com circuit breaker); Observabilidade ↑ Alto; Velocidade de Entrega ↓ Baixo; Evolução ↑ Alto": o bloco diz que microsserviços maximizam escalabilidade/elasticidade [p.75] e que modularidade melhora velocidade de entrega (agilidade/speed-to-market) [p.67]; "Velocidade de Entrega ↓ Baixo" para microsserviços contraria a tese de agilidade (embora o livro avise que serviços que se comunicam demais perdem os ganhos, [p.72-74]). A resiliência de microsserviços só vale se não houver dependência síncrona [p.77]; a tabela cita circuit breaker, que não está no bloco. "Observabilidade ↑ Alto" é ambíguo (leitura: exigência de tracing?). Não suportado/ambíguo.
  - "Monólito Modular: Performance ↑ alto, Consistência ↑ Alto": plausível mas fora do bloco [fora do livro neste bloco].
  - O exemplo trata "Monólito Modular" como equivalente a monólito com um banco/um deploy; o bloco o trata como alternativa que dá manutenibilidade/testabilidade/deployabilidade [p.68] e que continua sendo 1 quantum.
- **"Antes de recomendar arquitetura distribuída, analise acoplamento"** é correto, mas a skill omite a ordem do livro (3 passos: emaranhado, acoplamento, impacto da mudança) [p.45].
- **Descrição da skill cita "Evolutionary Architecture" como competência**: o bloco só menciona o livro Building Evolutionary Architectures como origem do conceito de fitness function [p.25]; nada sobre práticas evolutivas em si. Não é contradição, é escopo não coberto aqui.
- **"Dados Analíticos (OLAP): priorize histórico, agregação, tendências"**: o livro usa "analítico" sem OLAP no bloco; diz que o dado analítico normalmente não é transacional e frequentemente não relacional (grafo, snapshots) e que não é crítico para operação diária mas para direção estratégica [p.23]. "Priorize histórico/agregação" não está no bloco (esperado no Cap.14). Rótulo OLAP não suportado.

### (c) O que o bloco traz e a skill não cobre

Conteúdo de ALTA relevância ausente na skill (candidatos a `references/` e a ajustes de SKILL.md):

1. **Framework de trade-off analysis em 3 passos** (encontrar o que está emaranhado; analisar acoplamento; avaliar impacto da mudança) e o conceito de **dimensões emaranhadas** [p.45]. A skill tem um framework de 4 passos próprio, sem este.
2. **Architecture quantum** (def., 3 critérios, regra "todo ponto de acoplamento holístico forma um quantum", teste do bootstrap, contagem por estilo: monólito, service-based, EDA mediada/broker, EDA com 2 data stores, microsserviços, UI acoplada, micro-frontends, banco compartilhado) [p.46-56]. Ferramenta de diagnóstico estático (diagrama de quanta, análise defensiva de impacto) [p.55, p.61]. Ausente.
3. **As três forças do acoplamento dinâmico (Communication, Consistency, Coordination)** e a **matriz de 8 combinações** com nomes e níveis de acoplamento (Epic sao muito alto ... Anthology aec muito baixo) [p.56-59]. A skill trata sync/async, forte/eventual e orquestração/coreografia como três seções independentes, sem a noção de que as escolhas se influenciam e formam um espaço 3D. Ausência relevante para o catálogo de sagas (Cap.12 em bloco posterior).
4. **Fitness functions em profundidade**: definição "mecanismo objetivo", escopo atômico vs holístico, características compostas (agilidade → mensuráveis), teste de decisão "precisa de conhecimento de domínio?", dinâmicas vs estáticas, manuais, execução contínua, slot de segurança no pipeline (Equifax), ferramentas (JDepend, ArchUnit, NetArchTest, SonarQube), e o limite "não abusar / checklist de importante-não-urgente" [p.24-31]. A skill tem ~6 linhas.
5. **Drivers de modularidade e business case de decomposição**: speed-to-market e vantagem competitiva; cinco características (manutenibilidade, testabilidade, deployabilidade, escalabilidade, disponibilidade/tolerância a falhas); agilidade como característica composta; escopo de mudança app/domínio/função; modularidade ≠ distribuição (monólito modular, microkernel); a degradação quando serviços se comunicam demais ("big ball of distributed mud"); escalabilidade vs elasticidade, MTTS, elasticidade ligada à granularidade e escalabilidade à modularidade; ressalva de tolerância a falhas com chamada síncrona; analogia do copo d'água [p.47-77]. A skill não tem gate "há driver de negócio para quebrar?".
5b. **Regra de entrada "não quebre sem driver de negócio claro"** [p.67] e o sinal de alerta de deploy em conjunto ordenado [p.74].
6. **Definições operacionais** (service, coupling, component, sync/async, orquestrado/coreografado, atômico, contract amplo) [p.32-33] e a "segunda lei": por quê > como [p.31]. A skill não tem glossário; sua definição de acoplamento é a pergunta "recompilar".
7. **Acoplamento não é inerentemente ruim; "desacoplar ao máximo" é conselho vazio** (Paracelsus: a dose faz o veneno) [p.44]. A skill diz "Acoplamento ↓ → Complexidade Operacional ↑" mas não explicita esta regra anti-dogma.
8. **Por que dados viraram preocupação arquitetural**: bounded context move o banco para dentro do serviço, transacionalidade vira questão arquitetural [p.22, p.44]; conselho de evitar transações cross-service [p.58].
9. **Contexto histórico como método** ("considere as restrições que tornaram um estilo dominante") [p.21].
10. **Ressalvas de testabilidade/deployabilidade/escalabilidade para serviços chatos** e a métrica de manutenibilidade (acoplamento incoming) e lista de métricas de componentes (acoplamento, coesão, complexidade ciclomática, tamanho, particionamento técnico vs domínio) [p.68-69].
11. **Service-based architecture** como passo intermediário e alvo comum de decomposição sem mexer em schemas [p.50]. A skill só cita "Monólito, Monólito Modular, Microservices, Event-Driven" (passo 2 do framework) e não contempla service-based.
12. **ADR do livro**: título como frase nominal, alternativas no Context, justificativa em Decision, ADRs de 1-2 páginas, apêndice de ADRs [p.23]. Útil para alinhar o template e documentar quais campos são extensões.
13. **Micro-frontends** como forma de preservar quanta múltiplos quando há UI [p.54-55] e a observação de que UI acoplada colapsa o quantum [p.54].
14. **Arquitetura vs design**: foco em decisões estruturais difíceis de mudar; separar "por quê" de "como" [p.20-21, p.31].

Mapeamento para os artefatos candidatos:
- `skills/architecture-hard-parts-expert/SKILL.md`: (i) reescrever "Análise de Acoplamento" com as definições do Cap.2 e o teste do bootstrap; (ii) adicionar o framework de 3 passos; (iii) acrescentar a tríade Communication/Consistency/Coordination e remeter à matriz de 8 combinações; (iv) adicionar gate de driver de negócio (Cap.3); (v) ampliar fitness functions (resumo de 1-3 linhas + reference). Atenção ao limite de 500 linhas (hoje 184): mover detalhe para references.
- Novos `references/` sugeridos: `coupling-quantum.md` (quantum, contagem por estilo, estático/dinâmico, matriz das 8 sagas com tabela de acoplamento), `fitness-functions.md` (escopo, tipos, ferramentas, limites), `modularity-drivers.md` (cinco características, ressalvas, business case, modular monolith/microkernel/service-based), `glossario.md` (definições p.32-33).
- `references/trade-off-table.md`: revisar o exemplo preenchido (Velocidade de Entrega e Resiliência de microsserviços; sinalizar que depende de comunicação assíncrona e de níveis de acoplamento).
- `references/adr-template.md`: sinalizar quais campos são extensões do formato do livro (Status, Decisores, Alternativas, Fitness Functions) e manter Contexto/Decisão/Consequências como núcleo.
- Grupo `software-architecture`: usar quantum e estático/dinâmico como etapa de diagnóstico; gate "driver de negócio" antes de decompor monólito; e roteamento para sagas/dados/contratos quando os blocos seguintes forem lidos (não inventar antes).

---

## Checklist de cobertura
- Primeira página lida: PDF 1 (impr. n/a, capa)
- Última página lida: PDF 77 (impr. 59), última página do arquivo conforme Grep (marcador "=== PDF PAGINA 77 ===" na linha 2592; arquivo com 2641 linhas)
- Páginas sem texto útil ou ilegíveis: PDF 2 e 18 (em branco), 40 (em branco); PDF 1-6, 13-17 sem conteúdo técnico; PDF 7-12 sumário
- Problemas de extração observados: (1) Tabela 2-1 (PDF 59) com colunas desalinhadas (leitura reconstruída pelo código sao/sac/...); (2) fórmula de manutenibilidade ML (PDF 69) corrompida (texto "ccoi uisptlhinegcloeuv‐‐" misturado); (3) figuras (1-1 a 3-9) não extraídas, incluindo as estrelas de scalability/elasticity (p.76) e os diagramas de quanta; (4) hifenização com "‐" e erros de digitação do original ("distibuted", "Atomicty"); (5) glossário (p.33) diz que consistência eventual é "covered in Chapter 6", mas o Cap.2 remete aos Caps. 6, 9, 10, 12; (6) o bloco está em inglês, apesar de o pedido citar edição em português
- Capítulos/seções cobertos integralmente: Prefácio, Cap.1 (todo), Introdução da Parte I, Cap.2 (todo, inclusive Sysops Squad Saga: Understanding Quanta), Cap.3 até "Availability/Fault Tolerance" inclusive
- Capítulos/seções que continuam em outro bloco: Cap.3 (Sysops Squad Saga: Creating a Business Case começa na PDF p.77 impr. 59 e continua no bloco seguinte)
