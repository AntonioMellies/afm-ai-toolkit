# Notas: Software Architecture: The Hard Parts, bloco 06 (PDF p.386-462)

Convenção de páginas: "PDF p.N" é o marcador. Página impressa = PDF - 18 (ex.: PDF 386 = impr. 368). Edição lida em inglês no bloco (o trecho não está em português).

### Cap. 13 Contracts, continuação: Strict vs Loose Contracts (PDF p.386-393, impr. 368-375) [continua do bloco anterior]
Resumo: Contratos ficam num espectro de acoplamento. Contratos estritos (schema com tipos e campos obrigatórios) dão fidelidade e custam acoplamento forte; contratos frouxos (REST, GraphQL, pares nome-valor) dão desacoplamento e custam certeza/verificação. O livro propõe consumer-driven contracts (fitness function) para ter acoplamento frouxo com fidelidade governada.
Conceitos e regras:
- Contrato estrito = schema com propriedades, tipos e obrigatórios (exemplo JSON Schema com acct, cusip, shares, mínimo 100). [p.386]
- REST modela recursos (não endpoints de método), logo acrescentar informação ao recurso não quebra consumidores existentes. GraphQL é usado para dados agregados somente leitura, evitando chamadas de orquestração caras. [p.386]
- Exemplo Wishlist vs Profile: Wishlist só precisa do nome; cada consumidor define sua visão do contrato (Profile com 1 campo vs Profile completo). [p.386-387]
- Anti-padrão: incluir no contrato todos os campos "porque Wishlist pode precisar um dia" = stamp coupling; gera quebra desnecessária e coordenação quando campo irrelevante muda. Regra: contratos no nível "need to know" equilibram acoplamento semântico e fragilidade. [p.387]
- Extremo do espectro: pares nome-valor em JSON/YAML, sem metadado nem tipo; permite sistemas muito desacoplados, ao custo de certeza de contrato, verificação e mais lógica de aplicação. [p.387]
- Estritos, vantagens: fidelidade garantida (valores, tipos), versionados (suportam duas versões e evolução gradual), verificáveis em build (schema tooling), melhor documentação sem ambiguidade. [p.388]
- Estritos, desvantagens: acoplamento forte (mudou o contrato, os dois serviços mudam) e versionamento (sem estratégia de deprecação ou com versões demais vira pesadelo de integração). "Versioned" aparece nos dois lados. [p.388-389, Tabela 13-1]
- Frouxos, vantagens: altamente desacoplados; mais fáceis de evoluir (mas acoplamento semântico ainda exige coordenação entre interessados; a implementação não reduz acoplamento semântico). [p.389]
- Frouxos, desvantagens: gestão de contrato (nomes errados, pares ausentes, falhas que schema pegaria) e necessidade de fitness functions (consumer-driven contracts) para garantir informação suficiente. [p.389-390, Tabela 13-2]
- Em microsserviços: contrato estrito (RMI, gRPC) com mesma stack dá fidelidade mas viola a meta de serviços desacoplados; alternativa: cada serviço com sua própria representação de Customer (bounded context) trocando pares nome-valor, o que permite evolução interna agressiva e troca de plataforma sem afetar o outro; todas as plataformas produzem/consomem nome-valor (lingua franca). [p.390-391]
- Maior fraqueza do frouxo = fidelidade; mitigação: schema tools sobre JSON ou consumer-driven contract. [p.391]
- Consumer-driven contract: inverte push (provedor decide o que emite) para pull (o consumidor monta o contrato com o que precisa e entrega ao provedor, que o inclui no build e mantém o teste de contrato sempre verde). Vários consumidores com contratos sobrepostos; cada um estrito ou frouxo conforme precisar; roda em CI/CD do provedor. [p.391-392]
- CDC vantagens: acoplamento frouxo entre serviços; variabilidade de rigor (fitness functions podem checar o que schema não checa, ex.: faixas de valores, não só tipo numérico); evolvível. [p.392-393]
- CDC desvantagens: exige maturidade de engenharia (times que ignoram testes falhos ou atrasam execução deixam integração quebrada por mais tempo); dois mecanismos entrelaçados (nome-valor + CDC) em vez de um. Decisão depende de maturidade do time e desacoplamento (frouxo) vs complexidade+certeza (estrito). [p.393, Tabela 13-3]
Citações curtas de prova:
- "Keeping contracts at a “need to know” level strikes a balance between semantic coupling and necessary information" [p.387]
- "implementation cannot reduce semantic coupling" [p.389]
- "sometimes two simple interlocking mechanisms can solve the problem more simply" [p.393]
O que este trecho NÃO diz: não dá regra numérica de quando usar estrito vs frouxo; não trata versionamento de schema em detalhe (só cita estratégia de deprecação); não nomeia ferramentas de CDC.
Relevância para os artefatos candidatos: architecture-hard-parts-expert (contratos): ALTA, catálogo estrito/frouxo/CDC com vantagens e desvantagens por tabela; software-architecture: MÉDIA, regra de contrato por serviço.
Decisão sugerida: usar em architecture-hard-parts-expert (nova referência de contratos)

### Cap. 13: Stamp Coupling (PDF p.394-397, impr. 376-379)
Resumo: Stamp coupling é passar uma grande estrutura entre serviços onde cada um usa só parte. Costuma ser anti-padrão acidental (contrato superespecificado, banda desperdiçada), mas é legítimo quando há documento padrão de indústria ou para gerenciar estado de workflow em coreografia.
Conceitos e regras:
- Definição: passar estrutura grande onde cada serviço lê/escreve só uma pequena parte; comum com formatos padrão de indústria em XML (ex.: padrão global de itinerário de viagem, cada sistema atualiza só sua seção). [p.394]
- Over-coupling: contrato estrito + stamp coupling (Wishlist acoplado ao Profile inteiro "para o futuro") produz fragilidade; mudar o campo state em Profile quebra Wishlist sem necessidade. [p.394]
- Largura de banda: falácia "bandwidth is infinite". Exemplo do livro: 2.000 req/s com payload de 500 KB = 1.000.000 KB/s; só o nome = 200 bytes por requisição (o texto escreve "200 bytes per second ... 400 KB", redação ambígua/inconsistente na extração). [p.395]
- Stamp coupling para workflow: em coreografia complexa (quando escalabilidade exige coreografia), o contrato carrega conhecimento de domínio e estado do workflow (status, estado transacional); cada serviço atualiza sua parte e repassa; no fim o receptor consulta o contrato para sucesso/falha/mensagens de erro. Se precisar consistência transacional, serviços retransmitem o contrato aos serviços já visitados para restaurar consistência atômica. [p.396]
- Esse uso aumenta acoplamento acima do nominal, mas o acoplamento semântico tem de ficar em algum lugar; coreografia melhora vazão e escalabilidade. [p.396]
- Tabela 13-4: vantagem = workflows complexos em soluções coreografadas; desvantagens = acoplamento alto (às vezes artificial) entre colaboradores e problemas de banda em alta escala. [p.397]
Citações curtas de prova:
- "stamp coupling ... an architect cannot reduce semantic coupling via implementation" (paráfrase próxima, p.396; não citado literalmente além disso)
O que este trecho NÃO diz: não dá limite de tamanho de payload; não prescreve alternativas como claim-check ou query sob demanda.
Relevância: architecture-hard-parts-expert (acoplamento/contratos/coreografia): ALTA; software-architecture: MÉDIA.
Decisão sugerida: usar em architecture-hard-parts-expert (referência de contratos)

### Saga Sysops Squad: Managing Ticketing Contracts + ADR (PDF p.397-398, impr. 379-380)
Resumo: No workflow de tickets, contratos orquestrador-Ticket Management e orquestrador-Ticket Assignment são estritos (alta coesão semântica, mudam juntos); Notification e Survey são frouxos (mudam devagar). O contrato com o app móvel dos experts é frouxo, porque a publicação em app store é lenta.
Conceitos e regras:
- Critério: estrito onde a informação é semanticamente muito acoplada e muda junta; frouxo onde muda devagar ou onde o canal de deploy é lento. [p.397]
- ADR "Loose Contract for Sysops Squad Expert Mobile Application": decisão de par nome-valor com mecanismo de extensão temporária; consequências: revisitar se a app store permitir deploy rápido; mais lógica de validação no orquestrador e no app. [p.398]
O que NÃO diz: não mostra o mecanismo de extensão.
Relevância: architecture-hard-parts-expert (exemplo de ADR com consequência de revisitar): MÉDIA; adr-template: BAIXA (já tem formato).
Decisão sugerida: usar como exemplo curto de critério de escolha de contrato (estrito vs frouxo por velocidade de mudança do consumidor).

### Cap. 14 Managing Analytical Data: Previous Approaches (PDF p.399-407, impr. 381-389)
Resumo: Dados analíticos têm propósito diferente dos operacionais. O Data Warehouse e o Data Lake falham por separar dados do contexto de domínio (particionamento técnico). O livro apresenta Data Mesh como resposta para arquiteturas distribuídas.
Conceitos e regras:
- Contexto: aplicações cliente/servidor permitiram usar dados históricos para analytics; o problema central é que formato e esquema operacionais não servem (ou não permitem) consultas analíticas pesadas (agregações caras em relacional sob carga). [p.399-400]
- Data Warehouse, características: dados extraídos de várias fontes; transformados para esquema único (Star Schema, desnormalizado); carregados por replicação ou ferramentas ETL (mudança de schema operacional precisa ser replicada, coordenação difícil); análise feita no warehouse; usado por analistas de dados; saída em BI/dashboards; interface SQL-like. [p.400-401]
- Star Schema: fatos (dados quantificáveis; ex. Sysops Squad: tarifa horária, tempo de reparo, distância ao cliente) e dimensões (atributos descritivos: especialidades, nomes, lojas); desnormalizado de propósito; costuma ficar muito complexo. [p.402]
- Warehouse como exemplo de particionamento técnico: perde o particionamento de domínio, que precisa ser recriado nas consultas; exige especialistas. [p.402]
- Falhas do Data Warehouse: fragilidade de integração (transformar no ingest acopla schema à semântica do domínio); partição extrema do conhecimento de domínio (arquitetos, devs, DBAs e cientistas de dados precisam coordenar mudanças); complexidade (projeto separado, acoplado aos domínios); funcionalidade limitada vs custo (a maioria falhou por não entregar valor proporcional); sincronização cria gargalos operacionais e organizacionais; contratos operacional vs analítico diferem e o pipeline acumula transformação e ingestão (fragilidade). [p.402-403]
- Tabela 14-1: vantagens = consolidação centralizada, silo analítico dedicado isolado; desvantagens = partição extrema de conhecimento, fragilidade de integração, complexidade, funcionalidade limitada. [p.403]
- Data Lake: inverte "transformar e carregar" para "carregar e transformar"; mantém modelo centralizado e pipelines; dados brutos/nativos, transformação sob demanda (reativa); melhor para ML que prefere dado semi-bruto; usado por cientistas de dados que descobrem e agregam. [p.404-405]
- Limitações do Data Lake: dificuldade de descobrir ativos (relações de dados evaporam); PII e dados sensíveis (dados despejados sem contexto podem ser combinados para violar privacidade; especialistas de domínio precisam reanalisar); ainda particionado tecnicamente (ingestão/transformação/carga/serving); continua com fragilidade e acoplamento de pipelines; qualidade/integridade empurradas para pipelines downstream; batch pode gerar dados defasados. [p.405-407]
- Tabela 14-2: vantagens = menos estruturado que warehouse, menos transformação antecipada, melhor para arquiteturas distribuídas; desvantagens = relações difíceis de entender, transformações ad hoc. [p.406]
Citações curtas de prova:
- "the design pendulum swung to the opposite pole" [p.404]
O que este trecho NÃO diz: não dá critérios quantitativos para escolher warehouse vs lake; não cobre lakehouse ou ELT moderno.
Relevância: architecture-hard-parts-expert (dados analíticos): ALTA, a skill atual só cobre dados operacionais?, a verificar na auditoria; software-architecture: MÉDIA.
Decisão sugerida: usar em architecture-hard-parts-expert (nova referência de dados analíticos)

### Cap. 14: The Data Mesh e Data Product Quantum (PDF p.407-412, impr. 389-394)
Resumo: Data mesh (Dehghani e outros) é abordagem sociotécnica descentralizada para dados analíticos, alinhada a domínios de negócio. A peça arquitetural é o Data Product Quantum (DPQ), um adjunto do serviço, operacionalmente independente e fortemente acoplado a ele.
Conceitos e regras:
- Origem: derivou de decoupling por domínio em microsserviços, service mesh e sidecars; separação operacional/analítico é um acoplamento ortogonal (como no Sidecar). [p.407]
- Quatro princípios: (1) propriedade de dados pelo domínio (sem lake/warehouse central nem time de dados dedicado); (2) dados como produto (papéis e métricas organizacionais; introduz o data product quantum: descobrível, compreensível, no tempo, seguro, de qualidade); (3) plataforma de dados self-service (criação declarativa de produtos, descoberta, linhagem, grafos de conhecimento); (4) governança federada computacional (políticas automatizadas e embutidas como código em cada produto de dados, executadas por sidecar fornecido pela plataforma no ponto de acesso: leitura/escrita). [p.407-408]
- DPQ: código + dados adjacentes ao serviço (que tem comportamento e dados transacionais); interface com a parte analítica. [p.408-409]
- Tipos de DPQ: source-aligned (nativo; dados analíticos em nome do quantum cooperante, tipicamente um microsserviço); agregado (agrega de múltiplas entradas, síncrono ou assíncrono); fit-for-purpose (sob medida: relatórios, BI, ML). [p.409-410]
- Cooperative quantum: quantum operacionalmente separado, comunica-se com o cooperante por mensageria assíncrona e consistência eventual, com contrato forte com o cooperante e mais frouxo com o quantum analítico. [p.411]
- Quantum analítico tem acoplamento estático com os DPQs de que depende; pode chamar síncrono (ex.: interface SQL) ou assíncrono. [p.411]
- Acoplamento estático/dinâmico: DPQ e sua comunicação fazem parte do acoplamento estático do quantum (ex.: message broker disponível). Dinamicamente, o sidecar de dados deve usar padrão assíncrono com consistência eventual: Parallel Saga(aeo) ou Anthology Saga(aec); nunca exigir transacionalidade entre operacional e analítico; comunicação com o data plane geralmente assíncrona para não afetar características operacionais. [p.411]
- Tabela 14-3: vantagens = adequado a microsserviços, segue princípios modernos, ótimo desacoplamento operacional/analítico, contratos bem formados permitem evolução frouxa; desvantagens = exige coordenação de contrato com o DPQ, exige comunicação assíncrona e consistência eventual. [p.412]
- Quando usar: melhor com microsserviços de transacionalidade bem contida e isolamento; difícil quando dados operacionais e analíticos precisam ficar sincronizados o tempo todo; times de domínio decidem quantidade, cadência, qualidade e transparência dos dados. [p.412]
Citações curtas de prova:
- "a data sidecar should never include a transactional requirement to keep operational and analytical data in sync" (paráfrase quase literal, p.411)
- "Data mesh is a sociotechnical approach to sharing, accessing, and managing analytical data in a decentralized fashion." [p.407]
O que este trecho NÃO diz: não detalha implementação do sidecar nem ferramentas; remete ao livro Data Mesh de Dehghani para o assunto completo; os rótulos "(aeo)" e "(aec)" dos sagas vêm de capítulo anterior.
Relevância: architecture-hard-parts-expert (dados analíticos, DPQ, quantum): ALTA; software-architecture: ALTA (decisão de dados analíticos em decomposição de plataforma).
Decisão sugerida: usar em architecture-hard-parts-expert (nova referência de dados analíticos) e citar no grupo software-architecture

### Saga Sysops Squad: Data Mesh + ADR (PDF p.412-415, impr. 394-397)
Resumo: Cada novo serviço tem DPQ mantido pelo time do domínio; plataforma de data mesh fornece capacidades self-service e monitora; governança federada (donos de produtos de dados + segurança, jurídico, risco, compliance + donos da plataforma) padroniza contratos, transporte assíncrono, controle de acesso. Cria-se um Experts Supply DPQ agregando Tickets DPQ, User Maintenance DPQ (snapshots diários) e Survey DPQ (log) para recomendações de supply por ML.
Conceitos e regras:
- Dados incompletos num período distorcem tendências: melhor nenhum dado do que dado incompleto (dia pode ser isentado). [p.414-415]
- ADR "Complete day's data or none": fontes entregam snapshot completo diário ou nada; contratos frouxos entre feeds e o DPQ agregador; consequência: se muitos dias forem isentados, a precisão cai. Fitness functions: (1) snapshot diário completo: checar timestamps das mensagens; lacuna maior que 1 minuto marca o dia como isento; (2) CDC fitness function entre Ticket DPQ e Expert Supply DPQ para evolução interna não quebrar o consumidor. [p.415]
O que NÃO diz: o limite de 1 minuto é específico do exemplo (volume típico), não regra geral.
Relevância: architecture-hard-parts-expert (exemplo de ADR com fitness function): MÉDIA.
Decisão sugerida: usar como exemplo no catálogo de dados analíticos / ADR com fitness function.

### Cap. 15 Build Your Own Trade-Off Analysis: abertura e processo (PDF p.417-421, impr. 399-403)
Resumo: Retrospectiva do projeto (saga) e proposta de método para o leitor construir sua análise de trade-offs, estendendo o processo de três passos do Cap. 2.
Conceitos e regras:
- Soluções genéricas raramente existem; a análise do Cap. 2 é ponto de partida, não exaustiva; adicione colunas para elementos específicos do seu problema. [p.418]
- Processo de três passos: (1) achar quais partes estão emaranhadas; (2) analisar como estão acopladas; (3) avaliar trade-offs pelo impacto da mudança nos sistemas interdependentes. [p.418]
- Disciplina para sustentar: tabelas de trade-off para toda decisão, ADRs, colaboração entre times; "isso é arquitetura", não processo extra. [p.418]
- Definição simples de acoplamento: se alguém muda X, isso pode forçar Y a mudar? [p.419]
- Diagrama de acoplamento estático de um microsserviço reúne: SO/contêiner; dependências transitivas (frameworks, bibliotecas); dependências de persistência (bancos, busca, nuvem); pontos de integração necessários ao bootstrap; infraestrutura de mensageria. Não inclui quanta cujo único acoplamento é comunicação de workflow (AssignTicket e ManageTicket são estaticamente independentes mas dinamicamente acoplados). Times com ambientes automatizados podem gerar essa documentação no build. [p.419]
- Os autores chegaram às três dimensões de acoplamento dinâmico (comunicação, consistência, coordenação) olhando centenas de exemplos distribuídos; ressalta design iterativo e montar topologias de exemplo para matriz de trade-offs. [p.419-420]
- Analisar pontos de acoplamento: modelar combinações de forma leve, pular inviáveis; escolher forças de trade-off (no livro: acoplamento, complexidade, responsividade/disponibilidade, escala/elasticidade); avaliar cada padrão isoladamente e só depois comparar. [p.420]
- Tabela 15-2 (comparação consolidada dos padrões de saga). Texto extraído está embaralhado; só registro as observações: correlação inversa entre nível de acoplamento e escala/elasticidade; acoplamento mais alto reduz responsividade/disponibilidade (mais serviços no workflow, mais chance de falha). Valores por célula não são confiáveis nesta extração. [p.421]
- Passo 3: fixar primeiro a dimensão fundamental (ex.: síncrono vs assíncrono), que limita escolhas seguintes; iterar nas decisões subsequentes até restar só design. [p.421-422]
Citações curtas de prova:
- "if someone changes X, will it possibly force Y to change?" [p.419]
- "everything in software architecture is a trade-off" [p.421]
O que este trecho NÃO diz: não dá lista de forças padrão além das usadas pelos autores.
Relevância: architecture-hard-parts-expert (método de análise de trade-offs): ALTA; software-architecture: MÉDIA.
Decisão sugerida: usar em architecture-hard-parts-expert (método e trade-off-table)

### Cap. 15: Trade-Off Techniques (PDF p.422-433, impr. 404-415)
Resumo: Coleção de técnicas práticas: análise qualitativa, listas MECE, armadilha de contexto, modelagem de cenários de domínio, conclusão objetiva para stakeholders e evitar evangelismo.
Conceitos e regras:
- Qualitativo vs quantitativo: tabelas são qualitativas porque duas arquiteturas sempre diferem demais para comparação numérica; análise estatística sobre muitos exemplos sustenta o qualitativo; treinar análise qualitativa pois raramente há análise quantitativa verdadeira. [p.422]
- MECE (mutuamente exclusivos, coletivamente exaustivos): comparar coisas da mesma categoria (não fila simples vs ESB inteiro) e cobrir o espaço (não esquecer Kafka ao avaliar filas de alto desempenho); reavaliar ao decidir com impacto de longo prazo pois surgem capacidades novas. [p.422-423]
- Armadilha do "out-of-context": avaliar generico (biblioteca compartilhada vs serviço compartilhado) pode favorecer uma opção até o contexto específico mudar os critérios; achar o contexto estreito reduz opções e simplifica; usar design iterativo e jogos "what-if" qualitativos. [p.423-425]
- Modelar casos de domínio relevantes: exemplo serviço único de pagamento vs serviço por tipo de pagamento; cenário 1 (atualizar processamento de cartão) e 2 (adicionar pontos de recompensa) favorecem serviços separados (manutenção, testabilidade, deploy, extensibilidade; custo: código duplicado para evitar acoplamento estático); cenário 3 (workflow com múltiplos tipos) exige orquestrador, pior desempenho e consistência. Conclusão: trade-off real = desempenho+consistência de dados (serviço único) vs extensibilidade+agilidade (serviços separados). Integradores/desintegradores do Cap. 7 são forças genéricas; cenários dão nuance. [p.426-428]
- Preferir a conclusão objetiva (bottom line) a evidência esmagadora: reduzir a poucos pontos-chave, em termos de domínio. Exemplo: sync vs async no processamento de cartão: pergunta ao stakeholder = garantia de que a aprovação começa imediatamente vs responsividade e tolerância a falhas (sync: cliente espera, rejeitado se orquestrador cai; async: sem espera, sem garantia de início). [p.428-429, Tabela 15-3]
- Evitar snake oil e evangelismo: pedir avaliação honesta de bom e ruim; cuidado com ferramenta que promete capacidades chocantes; usar análise de cenários. Exemplo: sistema com um tópico pub/sub para broadcast de mudanças, adicionar bid history. Problemas do tópico único: (a) contratos diferentes por consumidor (contrato único grande = stamp coupling para workflow, ponto de acoplamento acidental); (b) segurança/PII (todos os consumidores veem tudo); (c) características operacionais distintas (monitorar profundidade de fila e autoscaling por consumidor impossível com tópico único). Filas ponto a ponto: contratos heterogêneos, segurança no contrato produtor-consumidor, monitoramento/escala independentes; mas também não é perfeito. [p.430-432]
- Tabela 15-4: ponto a ponto = contratos heterogêneos, controle de acesso/dados mais granular, perfis operacionais por consumidor; pub/sub = extensibilidade (fácil adicionar consumidores). Decidir consultando operações, arquitetos corporativos, analistas de negócio. [p.432-433]
- Não ser forçado a defender lado oposto: caso monorepo vs trunk-based; o arquiteto exigiu trade-off real, aceitou tentar monorepo com métricas e fitness functions que impedem acoplamento acidental entre projetos por proximidade de repositório. [p.433]
- Papel do arquiteto: árbitro objetivo dos trade-offs, não caçador de balas de prata. [p.433]
Citações curtas de prova:
- "Don’t allow others to force you into evangelizing something—bring it back to trade-offs." [p.433]
- "semantic coupling can only be increased via implementation, never decreased" (formulação do livro em p.427: "semantic coupling can only be increased via implementation, never decreased")
O que este trecho NÃO diz: não oferece modelo numérico de decisão; as figuras 15-3/15-4 (matriz biblioteca vs serviço) não estão legíveis no texto.
Relevância: architecture-hard-parts-expert (método, anti-vieses, comunicação com stakeholders): ALTA; software-architecture: MÉDIA.
Decisão sugerida: usar em architecture-hard-parts-expert (nova referência de técnicas de análise de trade-offs)

### Epílogo da saga (PDF p.434, impr. 416)
Resumo: Reforça que não se pode confiar em conselho genérico; testar objetivamente transforma análise qualitativa em quantitativa ("testing is the engineering rigor of software development").
Relevância: architecture-hard-parts-expert: BAIXA (reforça mentalidade: isolar dimensões, modelar e testar). Decisão: descartar ou usar só como frase de reforço.

### Apêndices A, B, C (PDF p.435-441, impr. 417-423)
Resumo: Apêndice A: referências cruzadas ao livro Fundamentals of Software Architecture (complexidade ciclomática, acoplamento e coesão de componentes, partição técnica vs de domínio, layered, service-based, microservices). Apêndice B: lista de 13 ADRs da saga com páginas. Apêndice C: lista de todas as tabelas/figuras de trade-off do livro.
Conceitos úteis para catálogo (só nomes e páginas impressas): ADRs: migrar para arquitetura distribuída (61), decomposição baseada em componentes (79), document DB para survey (184), serviço consolidado de assignment e routing (211), serviço consolidado de customer (215), sidecar para acoplamento operacional (241), shared library para lógica comum do banco de tickets (247), propriedade única de tabela por bounded context (280), Survey Service é dono da tabela survey (281), cache replicado em memória para perfil de expert (297), orquestração para workflow primário de tickets (321), contrato frouxo para app móvel (380). [p.437]
Tabelas de trade-off (Apêndice C) cobrem: bancos de dados por tipo (Fig. 6-25 a 6-33), técnicas de reuso de código (Tab. 8-1 a 8-4: replicação, biblioteca compartilhada, serviço compartilhado, sidecar/service mesh), propriedade conjunta (9-1 a 9-4: split de tabela, data domain, delegate, consolidação), padrões de consistência eventual (9-5 a 9-7: sincronização em background, request-based orquestrado, baseado em eventos), acesso a dados distribuído (10-1 a 10-4: comunicação interserviço, replicação de coluna, cache replicado, data domain), orquestração/coreografia (11-1 a 11-8), gestão de estado/transações distribuídas (12-11, 12-12), contratos (13-1 a 13-4), dados analíticos (14-1 a 14-3), consolidado de sagas e técnicas do Cap. 15 (15-2 a 15-4). [p.439-441]
Relevância: architecture-hard-parts-expert: MÉDIA, serve de mapa do conteúdo do livro para checar cobertura da skill; Decisão: usar só como checklist de cobertura.

### Índice remissivo (PDF p.443-459, impr. 425-441)
Registrado como índice: sem detalhamento. Utilidade: confirma a lista de padrões e termos do livro (ex.: Epic, Phone Tag, Fairy Tale, Time Travel, Fantasy Fiction, Horror Story, Parallel, Anthology Sagas; ACID/BASE; connection management; shared library/service/sidecar; tactical forking; component-based decomposition; Identify and Size Components, Gather Common Domain Components, Flatten Components, Determine Component Dependencies, Create Component Domains, Create Domain Services; fitness functions; granularity disintegrators/integrators). Páginas impressas a consultar nos outros blocos. Observação: o índice cita "granularity ... disintegrators (code volatility, extensibility, fault tolerance, scalability and throughput, security, service scope and function)" e "integrators (data relationships, database transactions, shared code, workflow and choreography)" [p.451-452] e "LATEST caution for versioning" [p.452].

### Sobre os autores, colofão e propaganda (PDF p.460-462)
Autores: Neal Ford, Mark Richards, Pramod Sadalage, Zhamak Dehghani. Colofão e página de propaganda da O'Reilly: descartar. Páginas 416, 436, 438 e 442 vazias.

## Checklist de cobertura
- Primeira página lida: 386
- Última página lida: 462
- Páginas sem texto útil ou ilegíveis: 416, 436, 438, 442 (vazias); 460-462 (autores, colofão, propaganda)
- Problemas de extração observados: tabelas (13-1, 13-2, 14-1 etc.) com colunas embaralhadas; Tabela 15-2 (comparação das sagas) ilegível por célula; figuras sem texto (13-3 a 13-9, 14-1 a 14-4, 15-1 a 15-12) não extraídas; exemplo de banda na p.395 com unidades inconsistentes ("200 bytes per second... 400 KB"); aspas tipográficas em JSON; o bloco está em inglês (não na edição em português).
- Capítulos/seções cobertos integralmente: Cap. 14, Cap. 15, Apêndices A-C, Índice
- Capítulos/seções que continuam em outro bloco: Cap. 13 Contracts (começa antes da p.386, no bloco anterior; aqui cobre o restante a partir de Strict vs Loose Contracts)

## Auditoria da skill atual

Skill auditada: skills/architecture-hard-parts-expert/SKILL.md (184 linhas, v1.0), references/adr-template.md e references/trade-off-table.md. Só é possível confirmar ou contradizer o que o bloco 06 cobre (Cap. 13 parcial, 14, 15, apêndices, índice). Páginas = PDF (impr. = PDF - 18).

### (a) O que a skill afirma e o bloco confirma
- Sem silver bullet nem solução perfeita: o bloco diz que soluções genéricas raramente existem e que o arquiteto deve ser árbitro de trade-offs, não evangelista. [p.418, p.430, p.433]
- "Least worst": aparece só como entrada de índice ("least worst combination"), sem texto. [p.458]
- Todo trade-off tem lado ruim ("nothing in software architecture is all good"). [p.430]
- Listar alternativas comparáveis e completas: o bloco formaliza isso como lista MECE. [p.422-423]
- Analisar por dimensões (complexidade, escala, resiliência): o Cap. 15 faz o mesmo com forças próprias (acoplamento, complexidade, responsividade/disponibilidade, escala/elasticidade). [p.420]
- Existem acoplamento estático e dinâmico: confirmado (estático = diagrama estrutural do quantum; dinâmico = comunicação/workflow). [p.419]
- Consistência eventual vs atômica com custo de coordenação/reconciliação: usado em DPQ e em stamp coupling para workflow. [p.396, p.411]
- Síncrono vs assíncrono com custos: exemplo com tabela (garantia de início da aprovação vs responsividade e tolerância a falhas). [p.429]
- Orquestração vs coreografia: orquestrador tende a piorar desempenho e consistência; coreografia melhora vazão e escala. [p.396, p.427]
- ADRs e fitness functions como governança: ADRs do bloco com contexto, decisão, consequências; CDC descrito como fitness function; fitness functions contra acoplamento acidental em monorepo. [p.398, p.415, p.392, p.433]
- Dados operacionais e analíticos têm propósitos diferentes. [p.381, p.399-400]
- Condição de revisão no ADR: o ADR do app móvel traz "revisitar se a app store permitir deploy mais rápido" (equivale ao campo "Condição de revisão" do trade-off-table). [p.398]
- Rejeitar absolutos ("X resolve tudo"): alinhado ao alerta contra snake oil e evangelismo. [p.430]
- Requisitos e tecnologia mudam, evolução iterativa: o bloco defende design iterativo e reavaliar quando surge capacidade nova. [p.420, p.423]

### (b) O que a skill afirma e o bloco contradiz ou não suporta
- Acoplamento estático ("uma mudança exige recompilar outra parte?"; imports, bibliotecas, contratos, schemas): o bloco define acoplamento como "se X muda, força Y a mudar?" e lista, para o estático, SO/contêiner, dependências transitivas, persistência, pontos de integração de bootstrap e infraestrutura de mensageria. [p.419] A pergunta de recompilar é mais estreita; contratos aparecem no bloco como espectro próprio (estrito/frouxo).
- A skill põe filas, eventos, REST e gRPC só no dinâmico. O bloco põe a disponibilidade do broker/service plane no acoplamento ESTÁTICO e deixa no dinâmico o padrão de comunicação, consistência e coordenação. [p.411, p.419]
- Estrutura obrigatória de 5 blocos em toda resposta: tensão com o conselho de reduzir a poucos pontos-chave ("bottom line") para stakeholders não técnicos. [p.428-429] Não é contradição estrita.
- "Avaliação obrigatória" com 8 dimensões fixas: o bloco manda adicionar colunas específicas do problema e manter a decisão no contexto estreito. [p.418, p.423-425] Lista fixa não é suportada como regra.
- Setas "Consistência ↑ → Disponibilidade ↓" e "Acoplamento ↓ → Complexidade Operacional ↑": o bloco suporta só parcialmente (correlação inversa acoplamento x escala e acoplamento x responsividade/disponibilidade; contrato frouxo exige CDC e maturidade). [p.393, p.421] Consistência x disponibilidade não aparece neste bloco.
- Orquestração "custo: ponto central de falha": o bloco não usa essa formulação; cita impacto em desempenho e consistência. [p.427] Pode estar em outro bloco.
- Dados analíticos resumidos a "histórico, agregação, tendências": o bloco não contradiz, mas mostra que o caminho centralizado (warehouse/lake) falha por particionamento técnico, fragilidade de pipeline e PII. [p.402-407]
- ADR do SKILL.md (Contexto, Decisão, Justificativa, Consequências) não traz fitness functions nem condição de revisão; o bloco traz ambos nos ADRs. [p.398, p.415] O adr-template.md já inclui Fitness Functions, então o resumo do SKILL.md está defasado em relação ao template.
- Anti-padrões como "Banco por serviço é obrigatório": nada neste bloco os suporta ou contradiz.

### (c) O que o bloco traz e a skill não cobre
Contratos (a skill não menciona):
- Espectro estrito/frouxo/CDC com vantagens e desvantagens (Tabelas 13-1, 13-2, 13-3); REST/GraphQL como mais frouxos; nome-valor como extremo. [p.386-393]
- Regra "need to know"; stamp coupling como anti-padrão acidental (fragilidade, falácia da banda infinita) e como técnica legítima para estado de workflow em coreografia (Tabela 13-4). [p.387, p.394-397]
- Critério de escolha por velocidade de mudança e canal de deploy (app store). [p.397-398]
- Acoplamento semântico não se reduz por implementação. [p.389, p.396, p.427]
- CDC (push vs pull) como fitness function; verifica o que schema não verifica (faixas de valores); exige maturidade. [p.391-393]

Dados analíticos (a skill só cita OLTP/OLAP):
- Data Warehouse (ETL, Star Schema, fatos/dimensões, falhas) e Data Lake (carregar e depois transformar; falhas de descoberta, PII, partição técnica, defasagem), Tabelas 14-1 e 14-2. [p.399-407]
- Data Mesh: 4 princípios, Data Product Quantum (source-aligned, agregado, fit-for-purpose), cooperative quantum, assíncrono + eventual, nunca transacional operacional/analítico, Tabela 14-3, quando usar. [p.407-412]
- Exemplo de ADR com fitness functions ("dia completo ou nenhum"; CDC entre DPQs). [p.414-415]

Método de análise própria (a skill tem só um framework genérico de 4 passos):
- Três passos, diagrama de acoplamento estático, fixar primeiro a dimensão fundamental e iterar. [p.418-422]
- Qualitativo vs quantitativo, MECE, armadilha do out-of-context, cenários de domínio, bottom line, anti-evangelismo (monorepo vs trunk-based). [p.422-433]
- Exemplo pub/sub único vs filas ponto a ponto (contratos por consumidor, segurança/PII, perfil operacional), Tabela 15-4. [p.430-433]
- Correlação inversa acoplamento x escala e acoplamento x disponibilidade entre padrões de saga. [p.421] Valores da Tabela 15-2 ilegíveis na extração.

Outros:
- Architecture quantum como unidade de análise: ausente na skill. [p.411, p.419]
- Apêndices B e C: mapa de ADRs e tabelas de trade-off do livro, úteis para checar cobertura. [p.437, p.439-441]
- Índice sugere catálogos ausentes na skill (verificar em outros blocos): 8 padrões de saga, ACID vs BASE, disintegradores/integradores de granularidade, propriedade conjunta de dados, acesso a dados distribuído, reuso de código. [p.450-459]

### Recomendações de melhoria (derivadas só deste bloco)
1. Criar references/contratos.md (estrito/frouxo/CDC/stamp coupling, need-to-know, critério de escolha, banda) e resumo de 2-3 linhas no SKILL.md.
2. Criar references/dados-analiticos.md (warehouse, lake, mesh, DPQ, regra assíncrono/eventual, quando usar, ADR com fitness function).
3. Criar references/metodo-trade-off.md (3 passos, MECE, out-of-context, cenários, bottom line, anti-evangelismo) e permitir dimensões sob medida no trade-off-table.md.
4. Corrigir no SKILL.md a separação estático (infraestrutura necessária, incl. broker) vs dinâmico (comunicação, consistência, coordenação) e introduzir quantum.
5. Alinhar o ADR do SKILL.md ao template (fitness functions e condição de revisão).
6. Acrescentar modo de resposta "bottom line" para stakeholders não técnicos.
7. Grupo software-architecture: rotear plataformas com dados analíticos para a nova referência, combinando com DDD estratégico (domínio dono do dado) e produção; apenas como sugestão, sem copiar conteúdo.
8. Manter SKILL.md abaixo de 500 linhas (hoje 184), listar novas referências em ## Referências e incrementar version da skill e dos três manifests.

