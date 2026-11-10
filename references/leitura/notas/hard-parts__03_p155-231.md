# Notas: Software Architecture: The Hard Parts, bloco 03 (PDF p.155-231)

Convenção: "PDF p.N" = marcador do bloco. Número impresso = PDF - 18 (ex.: PDF 155 = impr. 137). Exemplos de código (SQL, JSON) apenas descritos, não reproduzidos. Notas feitas ANTES de consultar a skill.

---

### Cap. 6, Pulling Apart Operational Data: fim de "Data Decomposition Drivers" (PDF p.155-164, impr. 137-146) [continua do bloco anterior]
Resumo: Fecha os drivers de desintegração de dados (contrato como abstração do schema, gestão de conexões, escalabilidade, tolerância a falhas, quantum arquitetural, otimização de tipo de banco) e apresenta os dois drivers de integração (relacionamentos e transações).

Conceitos e regras:
- Bounded context de dados abstrai o schema: o contrato (JSON) entre Serviço D (dono do banco) e Serviço C tem nomes e tipos próprios (ex.: coluna DATE exposta como epoch numérico `exp_dt`). Mudanças de coluna/tipo no banco deixam de quebrar o consumidor. [p.155-156]
- Exemplo de remoção de coluna (EXPIRATION_DT): Serviço D precisa mudar (está no mesmo bounded context do banco), mas o contrato pode ficar igual por um tempo (data muito futura ou zero = não expira). O consumidor fica protegido de breaking changes. [p.156]
- Gestão de conexões: conexão é cara; em arquitetura distribuída cada instância de serviço tem seu pool, ao contrário do monólito em que o application server é dono do pool. [p.156]
- Sinal diagnóstico: esperas por conexão (connection waits) são o primeiro sinal de saturação; também aparecem como timeouts e circuit breakers disparados. Recomendação: olhar connection waits primeiro. [p.157]
- Exemplo numérico: monólito com 200 conexões vira 50 serviços x 10 conexões x mínimo 2 instâncias = 1.000; se metade escala a média de 5 instâncias, 1.700. [p.157]
- Connection quota: número máximo de conexões que cada serviço pode usar; serviço que atinge a cota espera. Duas abordagens: distribuição igual (simples, ineficiente; usada no início, quando não se conhece a demanda) e distribuição variável (eficiente, exige conhecer funcionalidade e escalabilidade de cada serviço). [p.157-158]
- Recomendação: começar com distribuição igual, criar fitness functions que meçam o uso concorrente de conexões por serviço, guardar as cotas em servidor de configuração externo para ajuste manual ou programático. [p.158]
- Tabelas 6-1 a 6-3 (banco com 100 conexões, 5 serviços): cota 20 cada; A usa max 5, C 15, E 14; B e D esgotam e têm waits; realocar de A/E para B/D (A 8, B 29, C 20, D 25, E 18) elimina as esperas. A análise vem de fitness functions contínuas com métricas em stream, que também mostram a folga entre uso máximo e cota. [p.158-159]
- Escalabilidade: o banco também precisa escalar quando os serviços escalam (conexões, throughput, capacidade). Tabela 6-4: com instâncias (A 2, B 3, C 3, D 2, E 4 = 14 instâncias) o uso total vai a 242 conexões para um banco de 100, ou seja 142 a mais que o disponível; resultado provável: waits, degradação e timeouts. [p.159-161]
- Separar dados em domínios ou banco por serviço reduz conexões e carga por banco, melhorando escalabilidade/performance. [p.161]
- Tolerância a falhas: banco compartilhado é SPOF; se cai, todos os serviços ficam inoperantes. Separar dados mantém partes do sistema operando (se Banco B cai, só os serviços B e C param no exemplo). [p.161-162]
- Quantum arquitetural (relembra Cap. 2): artefato implantável de forma independente com alta coesão funcional, alto acoplamento estático e acoplamento dinâmico síncrono. Como o banco compartilhado entra no quantum, serviços com características diferentes (A e B no exemplo) NÃO formam quantum separado enquanto dividirem o banco; separar os dados é necessário para formar quanta distintos. [p.162-164]
- Otimização de tipo de banco: um banco monolítico força todos os dados ao mesmo tipo; dados de referência chave-valor (códigos de país, produto, armazém) ficam melhor em key-value que em relacional. [p.164]

Citações curtas de prova:
- "Frequent connection waits ... is usually the first sign that the maximum number of database connections has been reached." [p.157] (trecho curto; paráfrase acima é a fonte principal)
- "Data sovereignty per service is the nirvana state for a distributed architecture." [p.177]

O que este trecho NÃO diz: não dá fórmula para dimensionar cotas além do exemplo; não lista o driver "change control" (está no bloco anterior; aqui só é citado como disintegrator em p.166); não define limiar de quando a saturação justifica separar.
Relevância: architecture-hard-parts-expert (catálogos de dados): ALTA, drivers com sinais mensuráveis; grupo software-architecture: MÉDIA, conecta dados a quantum e operação.
Decisão sugerida: usar em skill (catálogo de drivers de desintegração de dados, com sinais/métricas) e em references de dados.

### Data Integrators (PDF p.164-167, impr. 146-149)
Resumo: Os dois drivers que empurram a favor de manter dados juntos: relacionamentos entre tabelas (FKs, triggers, views, stored procedures) e transações ACID de unidade única de trabalho.

Conceitos e regras:
- Integradores respondem "quando devo juntar dados de volta" e dão o contrapeso aos desintegradores. [p.164]
- Data relationships: FKs, triggers, views e stored procedures acoplam tabelas; também há relação lógica sem artefato físico (ex.: tabela de ticket e tabela de status). Banco por serviço exigiria remover esses artefatos entre bounded contexts, o que o texto trata como cenário pouco viável se feito em bloco. [p.165-166]
- Artefatos dentro do mesmo bounded context/schema/banco podem ser preservados; os que cruzam schemas/bancos (FK, views) precisam ser removidos. [p.166]
- Trade-off explícito: change control (desintegrador) vs preservar FKs; tolerância a falhas (desintegrador) vs preservar views materializadas (integrador). A decisão de quebrar e a granularidade do schema resultante vêm dessa ponderação. [p.166]
- Transações: um serviço gravando várias tabelas no mesmo banco/schema faz ACID commit/rollback como unidade; com dados separados em schemas/bancos e chamadas remotas, essa unidade deixa de existir e podem ocorrer inserts commitados em um lado e não no outro (inconsistência). Remete a "Distributed Transactions" (impr. 263) e sagas transacionais no Cap. 12. [p.166-167]

Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: não traz solução para a transação distribuída (adiada ao Cap. 12); não dá critério quantitativo para pesar relacionamentos.
Relevância: architecture-hard-parts-expert: ALTA (integradores de dados e trade-offs nomeados); software-architecture: MÉDIA.
Decisão sugerida: usar em skill (dados: desintegradores x integradores).

### Sysops Squad Saga: Justifying Database Decomposition (PDF p.168-169, impr. 150-151)
Resumo: Diálogo em que Addison e Devon convencem Dana (arquiteta de dados) a decompor o banco usando evidências.
Conceitos e regras:
- Evidência 1: logs mostram ticketing travando quando relatórios operacionais rodam; relatórios usam threads paralelas que consomem todas as conexões. [p.168]
- Evidência 2: estimativa de pool por instância projeta cerca de 2.000 conexões adicionais para a escala de tickets, que um banco único não tem. [p.168]
- Evidência 3: disponibilidade; banco monolítico fora do ar derruba todos os serviços; silos de dados permitem que ticketing siga funcionando se o banco de survey cair; o personagem chama isso de quantum arquitetural. [p.169]
- Regra de Dana aceita pelo time: serviço não conecta a múltiplos bancos/schemas. [p.169]
- Objeção de FKs/views é respondida com "data domains" e o processo de cinco passos. [p.169]
O que NÃO diz: é narrativa; não generaliza além dos drivers já listados.
Relevância: baixa-média; exemplo de como montar justificativa com métricas. Decisão: usar só como exemplo de aplicação (opcional).

### Decomposing Monolithic Data: data domain e o processo de cinco passos (PDF p.169-179, impr. 151-161)
Resumo: Técnica evolutiva e iterativa, feita com o time de banco de dados, usando "data domain" como veículo para migrar tabelas a schemas separados e depois a servidores físicos separados.

Conceitos e regras:
- Data domain: coleção de artefatos de banco acoplados (tabelas, views, FKs, triggers) relacionados a um domínio e usados juntos em escopo funcional limitado. Conceito arquitetural; schema é a construção de banco que o contém; relação usual 1:1, mas pode ser 1:N ao combinar domínios muito acoplados (texto passa a tratar como sinônimos). [p.170-175]
- Tabela 6-5: Sysops Squad com seis data domains: Customer, Survey, Payment, Profile, Knowledge Base, Ticketing (ex.: billing, contract, payment_method, payment em Payment). [p.170]
- Metáfora da bola de futebol: cada hexágono é um data domain; dentro dele preservam-se dependências; as que cruzam hexágonos (linhas pontilhadas) devem ser removidas na extração. [p.171]
- Cross-domain dependencies a remover: FKs, views, triggers, functions, stored procedures entre domínios; usar os padrões de refatoração de "Refactoring Databases" (Ambler/Sadalage) para fazê-lo com segurança. [p.172]
- Exemplo: view v_customer_contract fazia join com tabela customer de outro domínio; remove-se o join e a coluna customer_name; o serviço Payment passa a chamar o serviço Customer para obter o nome. Regra: serviço não fala com múltiplos data domains, o que vale também para views. [p.172-173]
- Passo 1: analisar o banco e criar data domains. Ponto de partida é o estilo "shared database integration" (Hohpe/Woolf) em que todos os serviços acessam todos os dados, acoplamento forte que dificulta mudança. [p.174]
- Passo 2: atribuir tabelas a data domains/schemas. Mover tabela (ex.: ALTER SCHEMA ... TRANSFER). Se tabelas de domínios diferentes são muito acopladas, domínios devem ser combinados formando bounded context maior com múltiplos serviços donos (Cap. 9). Alternativa: synonyms (como symlinks) para evitar cross-schema query direta, porém ainda exigem permissão de leitura/escrita; são pontos de acoplamento transitórios que movem a integração do banco para a aplicação e facilitam análise de dependência para separação posterior. [p.174-176]
- Passo 3: separar conexões; cada serviço conecta somente ao schema do seu domínio, com leitura/escrita só nas suas tabelas; synonyms são removidos; o acesso a dados de outros domínios é via serviço dono do domínio. É o passo mais difícil (todo acesso cross-schema resolvido no nível de serviço). Resulta em "data sovereignty per service". [p.176-177]
  - Benefícios: mudar schema sem afetar outros domínios; cada serviço escolhe o tipo de banco mais adequado. [p.177]
  - Desvantagens: performance quando serviços precisam de grandes volumes de dados de outros; integridade referencial não mantida no banco (risco de qualidade de dados); todo código de banco (procedures, functions) que toca tabelas de outros domínios vai para a camada de serviço. [p.177]
- Passo 4: mover schemas para servidores físicos separados; sem isso há um único quantum com efeitos adversos em escalabilidade, tolerância a falhas e performance. Duas opções: backup/restore (normalmente requer downtime) ou replicação (sem downtime, mas mais trabalho de montagem e coordenação). [p.177-178]
- Passo 5: virar as conexões para os servidores independentes e remover os schemas do servidor antigo. Depois disso é possível otimizar disponibilidade/escala por servidor e escolher o tipo de banco mais adequado (poliglota). [p.179]

Citações curtas de prova:
- "When data from other domains is needed, do not reach into their databases. Instead, access it using the service that owns the data domain." [p.177]
- "Data sovereignty per service is the nirvana state for a distributed architecture." [p.177]

O que este trecho NÃO diz: não trata dados compartilhados em leitura (padrões de acesso a dados entre domínios estão no Cap. 10, fora deste bloco); não trata sequência de migração de código vs dados (Cap. 4/5 em outros blocos); não define critérios para escolher backup/restore vs replicação além de downtime x esforço.
Relevância: architecture-hard-parts-expert (catálogo de dados, passos de decomposição): ALTA. Grupo software-architecture: MÉDIA.
Decisão sugerida: usar em references de dados da skill (processo de cinco passos com riscos por passo).

### Selecting a Database Type (PDF p.179-197, impr. 161-179)
Resumo: Catálogo de oito tipos de banco avaliados por estrelas (figuras, não extraídas em texto) em sete características, com texto descritivo por característica. O texto avisa o "paradoxo da escolha" e que cada produto otimiza certos trade-offs.

Conceitos e regras:
- Sete características de avaliação: facilidade de aprendizado; facilidade de modelagem; escalabilidade/throughput; disponibilidade/tolerância a partição; consistência (ACID vs BASE/eventual, tunável); suporte de linguagens/maturidade/SQL/comunidade; prioridade leitura/escrita. Mais estrelas = melhor/mais fácil. [p.179-180]
- Relacional: ACID e SQL; muito fácil de aprender; modelagem flexível (key-value, document, graph-like; dificuldade em grafo de profundidade arbitrária); escala verticalmente, replicação e failover complexos; favorece consistência sobre disponibilidade/partição; leitura e escrita balanceáveis pelo modelo; nem todo caso precisa de ACID (ex.: survey com schema flexível). Produtos: MySQL, Oracle, SQL Server, PostgreSQL. [p.181-182]
- Box "Aggregate orientation": preferência por operar sobre dados relacionados de estrutura complexa (conceito do DDD). Benefícios: fácil distribuição em cluster, melhor leitura/escrita (menos joins), menos impedance mismatch. Desvantagens: difícil acertar e mudar fronteiras de agregado; difícil analisar entre agregados. [p.183]
- Key-value: hash table; só get/put/delete por chave; banco ignora o conteúdo; sem join/where/order by; mudar o agregado implica reescrever os dados; chave deve ser conhecida fora do banco (session_id, user_id, order_id); lookup rápido, alta escala; consistência/partição tunáveis por consulta (quorum all/one/quorum); trade-off consistência x latência; bom para sessão e cache de preferências; não assumir que todos key-value são iguais. Produtos: Riak KV, DynamoDB, Redis. [p.183-185]
- Box "Sharding": partição horizontal em servidores/nós distintos por chave de shard (partição = mesmo servidor). [p.185]
- Document: JSON/XML; banco entende a estrutura e indexa vários atributos; fácil aprendizado; modelagem de agregados (orders, tickets) mais tolerante porque partes são consultáveis/indexáveis; escala fácil, mas índices complexos reduzem escala e sharding exige chave de shard; alguns suportam ACID dentro de coleção com casos de borda; favorece leitura; os mais populares dos NoSQL. [p.185-187]
- Box "Schema-less": dados sempre têm schema, implícito ou em outro lugar; a aplicação precisa tratar múltiplas versões; dizer que NoSQL é totalmente schema-less é enganoso. [p.187]
- Column family: pares nome-valor por linha, linhas com colunas variáveis; difícil de aprender; row key exige várias iterações; altamente escalável (leitura e escrita horizontal); replicação padrão 3; consistência tunável (ex.: ANY vs ALL); ideal para alto volume de escrita e dados esparsos. Produtos: Cassandra, Scylla. [p.187-189]
- Graph: nós e arestas explícitas com direção significativa; curva de aprendizado íngreme; modelagem difícil (tendência inicial a pôr propriedades em relações); leitura escala por réplicas, escrita limitada pela dificuldade de shard; travessia rápida; muitos suportam ACID (Neo4j); melhor para leitura; trocar tipo de relação é caro (visitar os dois nós, criar nova aresta, remover a antiga). [p.189-191]
- NewSQL: SQL + ACID com sharding automático e escala horizontal, múltiplos nós ativos; aprendizado fácil, mas atenção ao design de sharding; alta disponibilidade (ex.: CockroachDB); consistência forte. [p.191-193]
- Cloud native: Snowflake, Redshift, Datomic, CosmosDB; reduzem carga operacional, transparência de custo, sem investimento inicial; escala simples, trade-off tipicamente é preço; Datomic usa fatos atômicos imutáveis e Clojure; Snowflake/Redshift geared a data warehouse; Redshift em uma única AZ requer múltiplos clusters para HA; curva de aprendizado varia e exige conta cloud. [p.193-195]
- Time-series: dado com timestamp, append-only, quase nunca update/delete; boa prática: uma informação por tag (ticket_status=Open, ticket_id=... em vez de campo composto); escala conforme produto (TimescaleDB em PostgreSQL; InfluxDB com nós meta/dados); consistência tunável ou ACID se usa storage relacional; favorece leitura; não é banco de uso geral. [p.195-196]
- Tabela 6-6: tipo -> produtos (Relacional: PostgreSQL, Oracle, SQL Server; Key-value: Riak KV, DynamoDB, Redis; Document: MongoDB, Couchbase, DocumentDB; Column family: Cassandra, Scylla, SimpleDB; Graph: Neo4j, Infinite Graph, TigerGraph; NewSQL: VoltDB, ClustrixDB, SingleStore; Cloud native: Snowflake, Datomic, Redshift; Time-series: InfluxDB, kdb+, Timestream). [p.196-197]

Citações curtas de prova:
- "the data always has a schema even if it's implicit or defined elsewhere." [p.187]
- "Hence, assuming that all key-value stores are the same is a mistake." [p.185]

O que este trecho NÃO diz: as estrelas das figuras 6-25 a 6-33 não foram extraídas (só o texto); portanto notas por tipo são qualitativas. Produtos/versões refletem o livro, podem estar datados [fora do livro: avaliar atualidade]. Não oferece regra de decisão única, só trade-offs por característica.
Relevância: architecture-hard-parts-expert (catálogo de dados): ALTA para trade-offs por tipo; software-architecture: MÉDIA.
Decisão sugerida: usar em references da skill (matriz resumida por tipo de banco x característica), sem reproduzir estrelas inexistentes.

### Sysops Squad Saga: Polyglot Databases + ADR (PDF p.197-202, impr. 179-184)
Resumo: Conflito entre Dana (manter relacional) e devs/UI (document DB para survey); resolvido com justificativa de negócio e análise de duas modelagens de agregado.
Conceitos e regras:
- Dana não aceita novo tipo de banco sem justificativa sólida; o time concorda que parte do problema do monólito era dev e banco não trabalharem juntos, e resolve colaborar. [p.197]
- Justificativa de negócio vem do product owner: surveys mudam com frequência e mudanças simples levam dias (relacional pesa no UI e no banco); marketing quer flexibilidade e resposta mais rápida. [p.198]
- Duas modelagens em document DB: agregado único com perguntas embutidas (um get recupera tudo, simples para UI, perguntas duplicadas entre surveys) vs agregados separados com referências (reuso de perguntas, mais difícil de renderizar/recuperar). [p.199-202]
- Decisão: agregado único, aceitando duplicação (só cinco tipos de survey, mudanças são principalmente adicionar/remover perguntas). [p.202]
- ADR: contexto (survey em relacional, cinco tipos), decisão (document DB), justificativa (flexibilidade e prazo de mudança, UI mais simples), consequências (mudar pergunta comum exige alterar vários documentos; funcionalidade de survey precisa ser desligada durante a migração). [p.202]
O que NÃO diz: não avalia consistência/transações do survey.
Relevância: ALTA como modelo de ADR com consequências reais e como exemplo de escolha de modelo de agregado; MÉDIA para os demais.
Decisão sugerida: usar em exemplo de ADR (references).

---

### Cap. 7, Service Granularity (PDF p.203-231, impr. 185-213) [cap. continua no próximo bloco; trecho termina no meio da saga de customer registration]
Resumo: Distingue modularidade (dividir em partes) de granularidade (tamanho das partes) e propõe decidir granularidade equilibrando seis desintegradores contra quatro integradores, com métricas objetivas e conversa de trade-off com o negócio.

Conceitos e regras:
- Abertura (saga): time dividido (Taylen quer tudo fino "micro = pequeno"; Logan diz que nem tudo precisa ser microsserviço); a chave é remover opinião e gut feeling usando desintegradores/integradores. Single-responsibility é subjetivo (exemplo: notificação = 1 ou 3 serviços?). [p.203-204]
- Modularidade = quebrar o sistema em partes; granularidade = tamanho das partes; a maioria dos problemas de sistemas distribuídos é de granularidade. Granularidade não é número de classes ou linhas de código, mas o que o serviço faz. [p.205]
- Métricas: número de statements (mais objetivo que classes ou LOC) e número de interfaces/operações públicas expostas; ainda com alguma subjetividade. [p.205]
- Erro comum: focar só em desintegradores e ignorar integradores; granularidade certa é equilíbrio entre as duas forças. [p.205]

**Seis desintegradores (quando quebrar)** [p.206]:
1. Service scope and function (escopo/coesão): o serviço faz coisas demais sem relação? Duas dimensões: coesão e tamanho (statements e/ou entrypoints públicos). Exemplo: Notification (SMS, email, carta) já tem coesão relativamente forte, então escopo sozinho não justifica dividir; Customer (perfil + preferências + comentários) tem coesão fraca, candidato a dividir em três. Ligado ao SRP de Robert Martin, mas SRP é subjetivo; LCOM mede coesão, mas segue subjetivo para serviços. [p.207-209]
2. Code volatility (volatilidade, "volatility-based decomposition"): medir frequência de mudanças via controle de versão. Exemplo: SMS e email mudam a cada ~6 meses, carta semanalmente: separar Postal Letter isola testes/risco de deploy e evita indisponibilidade de SMS/email durante deploys. [p.209-210]
3. Scalability and throughput: exemplo SMS 220.000/min, email 500/min, carta 1/min; num único serviço, email e carta escalam à toa pelo SMS (custo e MTTS); separar em três. [p.210-211]
4. Fault tolerance: crash fatal (ex.: out-of-memory) no email derruba todo o serviço; separar protege. [p.211]
   - Regra do "leftover": ao quebrar, verificar se o restante forma coesão forte e nome auto-descritivo. Exemplo: dividir só email deixaria "Other/Non-Email/SMS-Letter Service" (nomes ruins); a divisão em Email, SMS, Letter tem bons nomes; serviço difícil de nomear sugere fazer coisas demais. [p.211-213]
5. Security: proteger dados (ex.: PCI) por schema/banco não basta, também é preciso proteger o acesso à funcionalidade; separar operações de cartão de crédito do perfil restringe o acesso a um serviço de propósito único. [p.213-214]
6. Extensibility: capacidade de adicionar funcionalidade conforme o contexto cresce (ex.: payment com cartão, gift card, PayPal, depois reward points, store credit, ApplePay). Separar por método reduz escopo de teste e risco de deploy. Conselho: aplicar só se a expansão é planejada/desejada/parte do domínio; esperar um padrão confirmado antes de usar como justificativa principal (notificação provavelmente não se expande; pagamento sim). [p.214-215]

**Quatro integradores (quando juntar ou não quebrar)** [p.215; a lista aparece parcialmente embaralhada na extração, com "Shared code" e "Data relationships" sob "Workflow"; confirmado nos detalhes e nas Tabelas 7-3]:
1. Database transactions: se é necessária transação ACID entre as operações, os serviços devem ficar juntos. Exemplo: Customer Profile Service + Password Service separados dão melhor controle de acesso a senha (por serviço), mas o registro (inserir perfil, commit, chamar Password que insere e commita) perde ACID; falha no segundo deixa inconsistência e exige tratamento complexo e sujeito a erro (remete a sagas, impr. 324). Se ACID é requisito de negócio, consolidar. [p.216-218]
2. Workflow and choreography (comunicação leste-oeste): 
   - Tolerância a falhas: com chamadas síncronas encadeadas, falha de um serviço (C) derruba os dependentes transitivos; se os serviços dependem uns dos outros, a tolerância a falha prometida pelo desintegrador não se realiza e convém manter juntos. [p.218-219]
   - Performance: cliente quebrado em 5 serviços; tela que exige 5 hops com 300 ms de latência de rede e segurança por requisição = 1.500 ms extras; consolidar remove a latência (Cap. 11 oferece orquestração como alternativa). [p.219]
   - Regra prática: contar a proporção de requisições que exigem workflow entre serviços: 30% com workflow e 70% atômicas, pode manter separado; invertido, considerar juntar. Considerar também a criticidade: se uma requisição crítica e sensível a tempo está nos 30%, pode valer juntar mesmo assim. Backend sem usuário esperando tem mais folga. [p.220]
   - Confiabilidade/integridade: cadastro de cliente passando por 5 serviços, A, B, C commitam e D falha; dados parciais podem já ter sido lidos ou publicados; precisa de transações compensatórias ou estado marcado para reiniciar (sagas). Se integridade/consistência é crítica, considerar juntar. [p.220-221]
3. Shared code: lib compartilhada (JAR, GEM, DLL) ligada em tempo de compilação. Código de infraestrutura transversal (logging, auditoria, autenticação, autorização, monitoramento) não é motivo para juntar. Critérios para considerar como integrador: (a) código compartilhado de domínio com percentual alto (exemplo: mais de 40% da base conjunta; juntar no mesmo serviço, sobretudo se muda muito); (b) mudanças frequentes no código compartilhado exigem mudanças coordenadas (versionamento só adia); (c) defeitos/regras de negócio que não podem ser versionados e precisam ser aplicados a todos os serviços ao mesmo tempo, se frequentes. [p.221-223]
4. Data relationships: mapear função x tabela (owner = escrita; access = leitura) (Tabela 7-1). Se, após quebrar, serviços B e C precisam cada um acessar dados da tabela do outro em toda operação, o bounded context proíbe leitura direta (mudança de coluna quebraria o outro), logo haveria comunicação bidirecional constante; consolidar B e C evita latência, falha e problemas de escalabilidade. É o integrador com menos trade-offs, porque reorganizar relacionamentos entre tabelas raramente é viável. [p.223-225]

- Tabelas 7-2 e 7-3 (síntese): Desintegradores: escopo (serviços de propósito único e coesos), volatilidade (agilidade: menos teste e risco de deploy), escalabilidade (menor custo, melhor responsividade), tolerância a falhas (melhor uptime), acesso de segurança (melhor controle), extensibilidade (agilidade ao adicionar). Integradores: transações (integridade e consistência), workflow (tolerância a falhas, performance e confiabilidade), código compartilhado (manutenibilidade), relacionamentos de dados (integridade e correção). [p.226]
- Como usar: formular declarações de trade-off com driver X vs driver Y e discuti-las com product owner/patrocinador. Três exemplos: (1) isolar volatilidade vs manter transação, patrocinador prefere integridade, mantém serviço único; (2) manter transação vs segurança de dados sensíveis, CIO prioriza segurança, serviços separados mitigando consistência; (3) extensibilidade de pagamento vs responsividade, patrocinador espera só 2-3 novos métodos, prioriza responsividade. [p.226-227]

Sysops Squad Saga: Ticket Assignment Granularity (PDF p.227-230):
- Taylen defende separar assignment (algoritmos complexos, mudam 2-3x/mês, volatilidade) de routing; Skyler/Addison: assignment e routing são fortemente acoplados (rota imediata; se roteamento falha, escolhe outro especialista), separar exigiria coordenação constante. Addison pergunta a tradeoff: isolar assignment por change control vs juntar por performance, tratamento de erro e controle de workflow. Resultado: serviço único, com três componentes arquiteturais (assignment, routing, shared code) delimitados por namespaces para preservar o isolamento de código. [p.227-229]
- ADR "Consolidated Service for Ticket Assignment and Routing": contexto; decisão serviço único; justificativas (fortemente acopladas, mesma escala sem back-pressure, tolerância a falhas não é driver pois são dependentes, separar exigiria workflow com performance/falha/confiabilidade); consequência: mudanças frequentes no algoritmo exigem testar e implantar as duas funções, mais escopo de teste e risco de deploy. [p.229-230]
- Lição: quando o desintegrador (volatilidade) perde para integradores, dá para mitigar com modularidade interna (namespaces/componentes) dentro de um serviço. [p.229]

Sysops Squad Saga: Customer Registration Granularity (PDF p.230-231, início): cadastro exige perfil, cartão (cobrança mensal), senha/pergunta de segurança, produtos cobertos; três opções (um Customer Service; quatro serviços Profile/Credit Card/Password/Supported Product; dois: Profile com produtos + Customer Secure com cartão e senha, proposta de Skyler pela experiência com PCI/PII). Reunião com Parker e Sam (segurança) começa; o bloco termina aqui, sem a resolução. [p.230-231]

Citações curtas de prova:
- "modularity concerns breaking up systems into separate parts ..., whereas granularity deals with the size of those separate parts." [p.205]
- "Granularity is not defined by the number of classes or lines of code in a service, but rather what the service does" [p.205]
- "always check to see if strong cohesion can be formed with the 'leftover' functionality." [p.213]
- "The secret of arriving at the appropriate level of granularity for a service is achieving an equilibrium between these two opposing forces." [p.205]

O que este trecho NÃO diz: não traz ponderação numérica entre drivers (nenhuma fórmula/pontuação); os limites 30/70 e 40% são regras práticas ilustrativas ("good rule of thumb", "for example"); a resolução do caso de registro de cliente não está no bloco; o capítulo 8 (reuso de código) e o 9-12 (dados compartilhados, orquestração, sagas) são só referenciados. A divisão "Passwords vs Profile" sob segurança aparece como trade-off, sem veredito aqui.
Relevância: architecture-hard-parts-expert (catálogos de granularidade): ALTA; software-architecture: ALTA (decomposição, trade-off com negócio).
Decisão sugerida: usar em skill (catálogo de 6 desintegradores x 4 integradores com perguntas-guia, métricas, regra do leftover, formato de trade-off statement) e em references de granularidade; usar ADRs como exemplos.

---

## Checklist de cobertura
- Primeira página lida: 155
- Última página lida: 231 (77 marcadores, todos presentes; último marcador do arquivo é 231)
- Páginas sem texto útil ou ilegíveis: nenhuma ilegível; as estrelas de avaliação das Figuras 6-25 a 6-33 e todos os diagramas (Figuras 6-5 a 6-24, 7-1 a 7-19) são imagens, sem texto extraído
- Problemas de extração observados: tabelas desalinhadas (Tabela 6-4: linha A perde coluna "Max used", mostra "85"; total de 242 e valores de B/C/D/E ok); lista de integradores em p.215 com itens embaralhados ("Shared code" e "Database relationships" dentro do item Workflow); "Tables 7-3" refere-se à Tabela 7-3; figura 6-30 referida como 6-29 no texto de p.190; erros de grafia ("Erik Evans", "disruptor"); código SQL/JSON presente mas não reproduzido
- Capítulos/seções cobertos integralmente: Cap. 6 de "bounded context contract" até o fim (incluindo Sysops Squad Saga: Polyglot Databases); Cap. 7 de início até Ticket Assignment Granularity
- Capítulos/seções que continuam em outro bloco: início do Cap. 6 (drivers anteriores, p.<155) vem do bloco anterior; Cap. 7 continua após p.231 (Customer Registration Granularity, saga e provável ADR)

---

## Auditoria da skill atual
