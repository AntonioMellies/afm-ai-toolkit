# Notas: Software Architecture: The Hard Parts, bloco 05 (PDF p.309-385)

Convenção de páginas: "p.N" = PDF PAGINA N. Número impresso (impr.) = PDF - 18 (ex.: PDF 309 = impr. 291). Livro em inglês no texto extraído (o bloco não está em português). Paráfrases minhas; termos técnicos mantidos como no livro.

---

### Cap. 10 Distributed Data Access, parte final (PDF p.309-316) [continua do bloco anterior; termina em p.316]
Resumo: Fecha os padrões de acesso a dados que um serviço não possui. Cobre o final do padrão Replicated Caching (Wishlist/Catalog), o padrão Data Domain e a saga de decisão do Ticket Assignment, que escolhe cache replicado em memória para dados de perfil de especialistas e registra um ADR. O começo do capítulo (Interservice Communication, Column Schema Replication, início de Replicated Cache) está no bloco anterior.

Conceitos e regras:
- Replicated Caching: cada serviço consumidor mantém o dado em memória (cache replicado); o serviço dono atualiza e o produto de cache propaga a atualização. Elimina chamada entre serviços para leitura [p.309].
- Vantagens do cache replicado: responsividade, tolerância a falha, escalabilidade independente; se o serviço dono cair, o consumidor segue operando [p.309].
- Trade-off 1, dependência de startup: o dono do cache o popula, então ele precisa estar no ar quando a PRIMEIRA instância do consumidor sobe; instâncias seguintes copiam o cache de outra instância do consumidor; depois de populado, o dono pode cair e subir sem impacto [p.310].
- Trade-off 2, volume de dados: acima de algo como 500 MB a viabilidade cai rápido, porque cada instância tem seu próprio cache (ex.: 500 MB x 5 instâncias = 2,5 GB). O arquiteto deve calcular tamanho do cache x número de instâncias [p.310].
- Trade-off 3, taxa de atualização: o modelo normalmente não mantém sincronia total se o dado muda com muita frequência; ruim para dado volátil (ex.: contagem de estoque), bom para dado relativamente estático (descrição de produto) [p.310].
- Trade-off 4, configuração: serviços se descobrem por broadcast/lookup TCP/IP; faixa ampla demais atrasa o handshake; ambientes em nuvem e containers dificultam por causa de IPs dinâmicos [p.310].
- Tabela 10-3 (cache replicado). Vantagens: bom desempenho de acesso, sem problema de escala/vazão, boa tolerância a falha, dado consistente, propriedade do dado preservada. Desvantagens: configuração em cloud/container difícil, ruim para grandes volumes, ruim para alta taxa de atualização, dependência de startup inicial [p.311].
- Data Domain Pattern (acesso a dados): as tabelas necessárias a ambos os serviços ficam num schema compartilhado (mesmo padrão usado para propriedade conjunta no capítulo anterior). Cenário de uso: interserviço inviável (confiabilidade, latência), replicação de coluna inviável (precisa de alta consistência) e cache inviável (volume alto) [p.311].
- Benefícios do Data Domain: serviços totalmente desacoplados em disponibilidade, responsividade, vazão e escala; acesso por SQL join; consistência e integridade altas (foreign keys, views, stored procedures, triggers podem existir no domínio de dados; preservar esses artefatos é um dos motivos para o padrão) [p.312].
- Contrato = schema da tabela: não há contrato extra, o que é vantagem e também desvantagem. Contratos nos outros padrões formam camada de abstração sobre o schema; aqui forma-se um bounded context mais amplo, e várias serviços podem precisar mudar quando uma tabela muda [p.312].
- Segurança: um serviço pode ganhar acesso a todos os dados do domínio de dados, mais do que deveria; bounded context estrito com dono único limita isso via contrato [p.313].
- Tabela 10-4 (data domain). Vantagens: bom desempenho, sem problema de escala/vazão, sem problema de tolerância a falha, sem dependência de serviço, dado consistente. Desvantagens: bounded context mais amplo para gerir mudanças, governança de propriedade do dado, segurança de acesso [p.313].
- Saga Sysops, acesso a dados do Ticket Assignment: consolidação de serviços descartada (domínios diferentes); data domain descartado porque o Ticket Assignment já se conecta ao schema compartilhado de tickets e não pode conectar-se a dois schemas; sobram interservice e cache replicado [p.313].
- Dimensionamento no exemplo: 900 especialistas x ~1,3 KB = ~1200 KB; dado quase estático (skill, zonas, agenda padrão); máximo de 2 instâncias do User Management e 4 do Ticket Assignment; usar o MÁXIMO esperado de instâncias no cálculo [p.314].
- Método: análise de trade-offs "baseada em hipótese" (propor a opção e procurar negativos). Negativos achados: startup do dono antes do consumidor; risco de produto de cache desconhecido pelo time (POC, custo de licença, limitações de ambiente como zonas de disponibilidade e firewalls) [p.314-315].
- Contraponto de tolerância a falha: com chamada remota, queda do User Management derruba o Ticket Assignment; com cache populado, não [p.314].
- ADR do cache replicado: Contexto (opções: interserviço, cache, data domain), Decisão (cache replicado, dono único de escrita; data domain inviável por restrição de um schema e por domínios separados), Consequências (ao menos uma instância do dono rodando ao subir a primeira do consumidor; custo de licença) [p.315-316].

Citações curtas de prova:
- "everything in software architecture is a trade-off" (primeira lei, citada do outro livro) [p.309] (paráfrase fiel; texto: "everything in software architecture is a trade-off")
- "the table schema becomes the contract" [p.312]

O que este trecho NÃO diz: não explica interservice communication nem column schema replication (bloco anterior); não dá número exato de limite de volume além de "such as exceeding 500 MB"; não nomeia produtos de cache.
Relevância: architecture-hard-parts-expert: ALTA, catálogo de padrões de acesso a dados com trade-offs e critérios numéricos; software-architecture (grupo): MÉDIA, escolha de padrão de dados na decomposição.
Decisão sugerida: usar em architecture-hard-parts-expert (novo references/dados-acesso-distribuido.md: 4 padrões, sinais de escolha, tabelas de trade-off, método de dimensionamento do cache).

---

### Cap. 11 Managing Distributed Workflows (PDF p.317-339)
Resumo: Trata da terceira força de acoplamento dinâmico, a coordenação: orquestração (orquestrador por workflow) versus coreografia (sem coordenador). Mostra que o caminho feliz engana e que erros mudam o custo de cada estilo, introduz acoplamento semântico vs. de implementação, três formas de gerir estado em coreografia e fecha com a saga Sysops que escolhe orquestração para o fluxo principal de ticket.

Conceitos e regras:
- Três forças de acoplamento dinâmico (Cap. 2): comunicação, consistência e coordenação; este capítulo cobre coordenação [p.318]. Coordenação = combinar dois ou mais serviços para realizar um trabalho de domínio [p.318].
- Dois padrões fundamentais: orquestração (tem orquestrador) e coreografia (não tem) [p.318].
- Orquestrador (também chamado mediador): gerencia estado do workflow, comportamento opcional, tratamento de erro, notificação; geralmente não contém comportamento de domínio fora do workflow que media [p.319]. Em microsserviços, um orquestrador POR workflow, não um global tipo ESB, porque o global cria ponto de acoplamento indesejável [p.319-320].
- Exemplo de pedido (Penultimate Electronics): placement síncrono, payment síncrono (dependência de tempo), fulfillment assíncrono (sem dependência estrita de tempo), e-mail assíncrono [p.320].
- Erro no caminho: pagamento recusado (orquestrador notifica e-mail e atualiza estado do pedido) e backorder (orquestrador estorna pagamento e atualiza pedido) [p.321-323]. Observação: mesmo nos erros elaborados, o orquestrador não exigiu novos caminhos de comunicação além dos do fluxo normal [p.323].
- Vantagens da orquestração: workflow centralizado, tratamento de erro, recuperabilidade (retry), gestão de estado consultável [p.323].
- Desvantagens da orquestração: responsividade (gargalo no mediador), tolerância a falha (ponto único de falha, mitigável com redundância e mais complexidade), escalabilidade (mais pontos de coordenação, menos paralelismo), acoplamento de serviço (mais acoplamento entre orquestrador e componentes) [p.323-324]. Tabela 11-1 resume [p.324].
- Coreografia: sem coordenação central; o pedido segue por cadeia de responsabilidade (Order -> Payment -> Fulfillment -> Email) com mensagens assíncronas [p.324].
- À primeira vista parece mais simples; a dificuldade está nas condições de borda e erro [p.324]. Pagamento rejeitado: um novo link de comunicação (Payment avisa Email e Order) [p.325]. Backorder: serviços já executaram etapas e cada um tem sua transação (padrão Anthology Saga), então precisam emitir mensagens compensatórias entre si; cada cenário de erro adiciona links de comunicação que o caminho feliz não tinha [p.326-327].
- Acoplamento semântico: o acoplamento inerente ao problema de domínio (ex.: atribuir ticket exige casar skills, agenda e local). O arquiteto não consegue reduzi-lo; a escolha de implementação (acoplamento de implementação) só pode mantê-lo ou piorá-lo [p.327].
- Particionamento técnico vs. por domínio: num monólito em camadas, um conceito como Catalog Checkout fica "espalhado" pelas camadas; no modular por domínio, fica no componente e no banco correspondentes; a implementação deve espelhar a semântica do workflow [p.327-329]. Camadas técnicas podem se justificar por economia (ex.: pool de conexões), mas a lição da última década é modelar a semântica do workflow o mais próximo possível da implementação [p.329].
- Relação: quanto mais passos no workflow, mais caminhos de erro/opcionais surgem [p.329].
- Gestão de estado em coreografia (3 opções) [p.329-332]:
  - Front Controller: o primeiro serviço da cadeia guarda o estado do workflow; outros serviços precisam consultá-lo/atualizá-lo; vantagem: pseudo-orquestrador, consulta de estado trivial; desvantagem: mais estado e complexidade no serviço de domínio, mais comunicação, pior desempenho e escala (Tabela 11-2) [p.329-330].
  - Stateless choreography: nenhum estado transitório; o estado é reconstruído consultando cada serviço; vantagem: alto desempenho e escala, extremamente desacoplado; desvantagem: estado montado na hora, complexidade sobe rápido em workflows complexos (Tabela 11-3) [p.331].
  - Stamp coupling: o estado do workflow viaja no contrato da mensagem, cada serviço atualiza sua parte; vantagem: sem front controller, sem consulta a dono de estado; desvantagem: contratos maiores, não dá consulta de status just-in-time (Tabela 11-4) [p.331-332]. Detalhe em "Stamp Coupling for Workflow Management", p.378 impr. (fora deste bloco; o bloco termina antes).
- Vantagens da coreografia: responsividade (menos gargalos), escalabilidade, tolerância a falha (sem orquestrador único), desacoplamento [p.332]. Desvantagens: workflow distribuído (sem dono), gestão de estado, tratamento de erro (serviços precisam saber mais do workflow), recuperabilidade [p.332]. Tabela 11-5 [p.333].
- Escolha: quanto maior a complexidade do workflow, mais cresce a necessidade de orquestrador (Fig. 11-14); quanto mais complexidade semântica, mais útil o orquestrador [p.333-334]. Ponto ideal da coreografia: workflows que exigem responsividade e escala e não têm erros complexos, ou têm raros [p.334]. Orquestração é melhor para workflows complexos com bordas e erros [p.334].
- Mapeamento a sagas: coreografia aparece em Phone Tag, Time Travel e Anthology; combinada com outras forças pode levar ao Horror Story. Orquestração em Epic, Fairy Tale, Fantasy Fiction e Parallel [p.334].
- Saga Sysops, fluxo primário de ticket: 4 serviços (Ticket Management, Ticket Assignment, Notification, Survey). Critérios usados: controle do workflow (tickets perdidos/mal roteados), consulta de estado (ambos conseguem: consulta por serviço ou stamp coupling; "não é jogo de soma zero"), tratamento de erro (cancelamento, reatribuição, perda de conexão do especialista; orquestração favorecida) [p.335-338]. Frase de Logan: workflow complexo precisa ficar em algum lugar, no orquestrador ou espalhado pelos serviços [p.338].
- ADR "Use Orchestration for Primary Ticket Workflow": contexto (rastrear mensagens perdidas, bom tratamento de erro, status do ticket); decisão orquestração; consequência (possível problema de escalabilidade em torno de um orquestrador único, reavaliar se requisitos mudarem) [p.339].
- Também: "never say never"/evitar absolutos em arquitetura, exceto ao falar de absolutos (fala de personagem) [p.317]. Coreografia "sempre" por desacoplamento é rejeitada [p.317].
- Extração: tabelas 11-6, 11-7 e 11-8 saíram sem as marcas de qual coluna recebe cada item; pelo texto da saga, controle de workflow e tratamento de erro favorecem orquestração e consulta de estado empata [p.337-338].

Citações curtas de prova:
- "An architect can never reduce semantic coupling via implementation, but they can make it worse." [p.329]
- "Always is a tricky term in software architecture." [p.317]
- "the sweet spot for choreography lies with workflows that need responsiveness and scalability" [p.334] (trecho fiel, parcial)

O que este trecho NÃO diz: não define critério numérico para "workflow complexo"; não trata ferramentas (Camunda, Step Functions, etc.); não detalha stamp coupling (está no Cap. 13, fora do bloco); a Tabela 11-6/7/8 perdeu a estrutura na extração.
Relevância: architecture-hard-parts-expert: ALTA, orquestração vs. coreografia com critérios, estado em coreografia e acoplamento semântico; software-architecture (grupo): ALTA, decisão de fluxo entre serviços na decomposição.
Decisão sugerida: usar em architecture-hard-parts-expert (references/orquestracao-vs-coreografia.md) e mencionar no grupo software-architecture como roteamento ("workflow entre serviços" -> hard-parts).

---

### Cap. 12 Transactional Sagas (PDF p.340-382) [p.340 em branco]
Resumo: Apresenta a matriz de oito padrões de saga formados por comunicação (síncrona/assíncrona) x consistência (atômica/eventual) x coordenação (orquestrada/coreografada), com nome temático e superescrito (sao, sac, seo, sec, aao, aac, aeo, aec). Avalia cada padrão por acoplamento, complexidade, responsividade/disponibilidade e escala/elasticidade, depois descreve gestão de estado com máquina de estados, técnicas de governança de sagas e uma saga Sysops sobre compensações.

Conceitos e regras:
- Origem: saga é anterior a microsserviços (limitar escopo de locks em bancos distribuídos; paper da ACM de 1987). Definição de Richardson: sequência de transações locais em que cada atualização publica um evento que dispara a próxima; em falha, emite atualizações compensatórias [p.341-342]. Este é apenas 1 dos 8 tipos [p.342]. Como transações distribuídas não têm atomicidade, o interessante são os erros [p.342].
- Superescrito: letras das três dimensões em ordem alfabética (comunicação, consistência, coordenação); serve de mnemônico, não de teste de memorização [p.342].
- Diagramas isomórficos: representação genérica dos serviços; mostram apenas o que diferencia cada padrão [p.343].
- Tabela 12-1 (matriz) [p.342]:
  - Epic Saga(sao): síncrona, atômica, orquestrada.
  - Phone Tag Saga(sac): síncrona, atômica, coreografada.
  - Fairy Tale Saga(seo): síncrona, eventual, orquestrada.
  - Time Travel Saga(sec): síncrona, eventual, coreografada.
  - Fantasy Fiction Saga(aao): assíncrona, atômica, orquestrada.
  - Horror Story(aac): assíncrona, atômica, coreografada.
  - Parallel Saga(aeo): assíncrona, eventual, orquestrada.
  - Anthology Saga(aec): assíncrona, eventual, coreografada.
- Ratings: as tabelas 12-2 a 12-9 saíram embaralhadas na extração (rótulos e valores em colunas intercaladas). Os valores abaixo foram DECODIFICADOS pela ordem das linhas (7 valores: comunicação, consistência, coordenação, acoplamento, complexidade, responsividade/disponibilidade, escala/elasticidade) e conferidos contra o texto dos padrões. Tratar como leitura reconstruída, não literal.

| Padrão | Acoplamento | Complexidade | Responsividade/disp. | Escala/elasticidade | Página |
|---|---|---|---|---|---|
| Epic(sao) | Muito alto | Baixa | Baixa | Muito baixa | 347 |
| Phone Tag(sac) | Alto | Alta | Baixa | Baixa | 351 |
| Fairy Tale(seo) | Alto | Muito baixa | Média | Alta | 354 |
| Time Travel(sec) | Médio | Baixa | Média | Alta | 357 |
| Fantasy Fiction(aao) | Alto (texto diz "extremamente alto") | Alta | Baixa | Baixa | 360 |
| Horror Story(aac) | Médio | Muito alta | Baixa | Média | 363 |
| Parallel(aeo) | Baixo | Baixa | Alta | Alta | 366 |
| Anthology(aec) | Muito baixo | Alta | Alta (texto: "high"; tabela lida como muito alta) | Muito alta | 369 |
Nota de incerteza: para Anthology a decodificação dá responsividade "High" e escala "Very high" pela ordem das linhas; o texto diz "high" para ambos os pontos e "highest" para escala [p.369]. Para Fantasy Fiction há divergência texto (extremamente alto) vs. tabela decodificada (alto) [p.360].

- Epic Saga(sao): saga "tradicional" (orquestrada), imita comportamento de monólito (origem 0,0,0 do espaço 3D); familiar a quem vem de sistemas transacionais [p.343]. Transações distribuídas limitam escolha de bancos e têm modos de falha "legendários"; padrão reconhece recorrência, não solucionabilidade [p.345]. Usa transação compensatória (reverte escrita de outro serviço: desfaz update, reinsere linha apagada, apaga linha inserida) [p.345]. Mediador monitora sucesso e emite compensações em falha [p.346]. É o padrão mais acoplado da lista; sincronia reduz a complexidade (sem race conditions/deadlocks nas chamadas); orquestrador gargala; se qualquer serviço estiver indisponível ou houver erro irrecuperável, falha [p.347]. Muitos arquitetos o adotam por familiaridade ou exigência de stakeholders; "transações distribuídas são melhor evitadas se possível" [p.346-347].
- Phone Tag(sac): troca orquestração por coreografia mantendo atomicidade; o primeiro serviço vira ponto de coordenação (front controller); em erro, cada serviço envia compensações de volta pela cadeia [p.348-349]. Serviços ganham lógica de workflow; em workflows complexos o front controller fica tão complexo quanto um mediador [p.349]. Caminho feliz pode ser mais rápido que no Epic; erros ficam mais lentos (cada serviço desenrola a cadeia) e aumentam acoplamento [p.349-350]. Usado em workflows simples que pedem mais escala, com impacto de desempenho [p.349]. Combinação rara (quem escolhe coreografia normalmente escolhe assíncrono); justificativa possível: sincronia garante que cada serviço conclui antes do próximo, eliminando race conditions; se erros são fáceis ou os serviços usam idempotência e retry, ganha paralelismo [p.350]. Complexidade cresce linearmente com a complexidade semântica; alternativa: stamp coupling [p.350]. "Em geral, reduzir acoplamento aumenta escala" [p.350].
- Fairy Tale(seo): relaxa atomicidade; cada serviço gerencia sua transação; orquestrador cuida de requisição, resposta e erro, podendo emitir compensações sem exigir transação ativa [p.351-352]. Permite, por exemplo, guardar uma mudança até o serviço voltar [p.352]. Equilíbrio bom de trade-offs, comum em microsserviços [p.353]. Acoplamento alto (síncrono + orquestrado) mas sem o pior fator, transacionalidade [p.353]. Melhor responsividade porque o mediador guarda menos estado sensível a tempo [p.354].
- Time Travel(sec): síncrona, eventual, coreografada; implementa Chain of Responsibility ou Pipes and Filters; qualquer workflow de passos unidirecionais [p.356]. Nome vem do desacoplamento temporal: consistência gradual no tempo [p.356]. Serve a workflows "fire and forget" (ingestão de dados, transações em lote) de alto throughput [p.356]. Cada serviço trata erro e coordenação; erro complexo gera overhead e piora responsividade [p.357]. É "rampa de acesso" ao Anthology: mais fácil de raciocinar e depurar que assíncrono; se a escala bastar, não é preciso a versão mais complexa [p.357].
- Fantasy Fiction(aao): como o Epic, mas assíncrona; assincronia aumenta a complexidade do mediador, que precisa rastrear múltiplas transações pendentes (exemplo Alpha, Beta, Gamma, onde Gamma depende do resultado pendente de Alpha) e traz deadlocks e race conditions [p.358-359]. Escala alta é "praticamente impossível" em sistemas transacionais mesmo com assincronia [p.360]. Descrito como mais popular do que deveria, por tentativa de ganhar desempenho mantendo transacionalidade; melhor opção geralmente é Parallel Saga [p.360].
- Horror Story(aac): atomicidade com os dois estilos mais soltos (assíncrono + coreografado); cada serviço rastreia informação de desfazer de múltiplas transações pendentes, possivelmente fora de ordem; exemplo Alpha/Beta com falha em Alpha obriga a reverter a ordem de execução [p.361-362]. Acoplamento não é o pior (o pior é o Epic), mas complexidade é a pior de todas; escala melhor que padrões com mediador [p.362-363]. Origem típica: arquiteto parte do Epic, vê lentidão e adota assincronia e coreografia sem considerar dimensões entrelaçadas; assincronia isolada melhora desempenho, mas não isolada [p.363]. Alternativa recomendada: Anthology [p.362].
- Parallel(aeo): orquestrada, assíncrona, eventual; indicada para workflows complexos com alta escala [p.364-366]. Mediador envia mensagens assíncronas de compensação (retry, sincronização de dados) [p.365]. Custo: mais carga no mediador para resolver erros; assincronia traz race conditions, deadlocks, confiabilidade de fila [p.365]. Isolar transações no nível de domínio permite escalar por conceito de domínio (serviços públicos com mais escala; back office com mais segurança) [p.366].
- Anthology(aec): oposto do Epic; menos acoplado; mensageria assíncrona sem orquestração; cada serviço mantém integridade transacional e carrega mais contexto de workflow (erro, coordenação) [p.367]. Melhor para workflows simples e quase lineares de alto throughput; para workflows complexos ou críticos a coordenação é "proibitivamente" difícil [p.368]. Stamp coupling pode carregar estado do workflow [p.368]. Exemplo: Pipes and Filters [p.369].
- Dois modos de gerir saga: transações atômicas com compensação, ou gestão de estado com consistência eventual [p.369].
- State management e eventual consistency: máquinas de estados finitos para conhecer o estado atual da saga e corrigir o erro depois por retry ou ação corretiva automática/manual [p.369]. Exemplo (Fairy Tale, conclusão de ticket): Survey indisponível, então o estado vira NO_SURVEY, resposta de sucesso ao especialista, e o Ticket Orchestrator tenta de novo e, se falhar, escala a um supervisor [p.370]. O usuário final não precisa se preocupar com o survey [p.370].
- Saga state machine: estado inicial, estados de transição e ação por transição [p.370]. Exemplo ticket: START, CREATED, ASSIGNED, ACCEPTED, COMPLETED/REASSIGN, CLOSED/NO_SURVEY; descrição estado a estado [p.371-373]. Tabela 12-10 lista estado inicial, estado de transição e ação, e serve para desenvolvedores implementarem gatilhos e condições de erro no orquestrador (ou nos serviços, se coreografia) [p.373]. A extração mostra a tabela com colunas desalinhadas; transições: START->CREATED, CREATED->ASSIGNED, ASSIGNED->ACCEPTED, ACCEPTED->COMPLETED, ACCEPTED->REASSIGN, REASSIGN->ASSIGNED, COMPLETED->CLOSED, COMPLETED->NO_SURVEY, NO_SURVEY->CLOSED [p.373].
- Regra: independente da técnica de erro, o estado da transação distribuída deve ser conhecido e gerenciado; a escolha entre compensação e estado depende do contexto e da análise responsividade x consistência [p.373].
- Tabela 12-11 (estado vs. atômico com compensação): vantagens: boa responsividade, menos impacto no usuário em erros; desvantagens: dado pode ficar fora de sincronia em erros, consistência eventual pode demorar [p.374].
- Técnicas de gestão de sagas: transações distribuídas não são "plug and play" nem se compram como gerenciadores ACID; devem ser projetadas, codificadas e mantidas [p.374]. Técnica: anotações (Java) / atributos (C#) sem funcionalidade, só para documentar e associar serviços a sagas (enum Transaction com NEW_TICKET, CANCEL_TICKET etc.), marcando entrypoints de serviço [p.374-375]. Benefício: define escopo de teste e impacto quando um serviço da saga muda [p.375]. Ferramenta de CLI que varre o código lista serviços de uma saga (ex.: NEW_TICKET envolve Ticket, Assignment, Routing, Survey) [p.376]. Isso é governança automatizável.
- Saga Sysops, Epic Saga e compensações [p.376-382]. Problemas das atualizações compensatórias:
  - Sem isolamento: outros serviços podem agir sobre o dado antes da compensação (ex.: Analytics já processou o ticket concluído que depois foi revertido); isso é "efeito colateral"; pode exigir mensagem de "ignore" com lógica complexa e ações downstream ("turtles all the way down") [p.378-379].
  - Falha da compensação: assumir que sempre funciona é erro; se a compensação falha, o ticket fica "concluído" e a resposta ao usuário é confusa [p.379-380].
  - Responsividade: em erro, o usuário espera todas as correções antes de receber resposta; assíncrono (Parallel/Anthology) ajuda, mas em geral atômico com compensação tem pior responsividade [p.380-381].
  - Acoplamento semântico do usuário final: o especialista é acoplado ao processo de negócio (survey) sem necessidade [p.378].
- Tabela 12-12 (atômico distribuído com compensação): vantagens: todos os dados restaurados ao estado anterior; permite retry e reinício. Desvantagens: sem isolamento, efeitos colaterais na compensação, compensação pode falhar, má responsividade ao usuário [p.381].
- Outros desafios: um serviço não faz rollback; travar ou não travar serviços participantes (travar garante validade mas destrói desempenho e escala; não travar permite requisições dependentes do resultado ainda não resolvido, pior com assíncrono) [p.381].
- Transações forçam participantes a sincronizar; fáceis em monólito com banco relacional, então são usadas em excesso; muito do mundo real não é transacional (referência ao ensaio "Starbucks Does Not Use Two-Phase Commit"); "quanto maior o escopo, pior" [p.381-382].
- Alternativa realista à Epic: Fairy Tale ou Parallel, com consistência eventual e gestão de estado; o erro é tratado nos bastidores e a responsividade melhora; se houver necessidade de atomicidade, investigar esses padrões como alternativas [p.382].

Citações curtas de prova:
- "the pattern is recognition of only commonality, not solvability" [p.345] (parcial: texto "the pattern is recognition of only commonality, not solvability")
- "Distributed transactions present a host of difficulties and thus are best avoided if possible." [p.347]
- "In general, reducing coupling increases scale." [p.350]
- "they must be designed, coded, and maintained by developers and architects" [p.374]
- "Much of the real world isn't transactional" [p.382]

O que este trecho NÃO diz: não apresenta Outbox, 2PC/XA, Event Sourcing, CQRS, idempotency keys como técnica detalhada; não dá uma árvore de decisão formal para escolher entre os oito padrões (só descrições e ratings); não mede números reais de desempenho; os ratings dependem de decodificação da tabela embaralhada.
Relevância: architecture-hard-parts-expert: ALTA, catálogo de sagas (matriz 8, ratings, anti-padrões Horror/Fantasy Fiction, compensação x estado, máquina de estados, anotações de saga); software-architecture (grupo): ALTA, regra "evite transação distribuída; prefira Fairy Tale/Parallel".
Decisão sugerida: usar em architecture-hard-parts-expert (references/sagas-transacionais.md com matriz, ratings reconstruídos, gatilhos de escolha e checklist de compensação); incluir regra de governança (anotações + CLI) em fitness functions.

---

### Cap. 13 Contracts (PDF p.383-385) [continua no próximo bloco]
Resumo: Começa o capítulo sobre contratos como força transversal (ortogonal) a comunicação, consistência e coordenação. Define "contrato" no sentido do livro e inicia o espectro estrito-solto. O bloco termina no Exemplo 13-1 (JSON estrito), sem o restante.

Conceitos e regras:
- Contratos são um fator constante que atravessa e afeta quase toda decisão, como uma dimensão adicional ortogonal às três do espaço 3D (analogia com o tempo) [p.383].
- Definição do livro (hard parts contract): formato usado por partes de uma arquitetura para transmitir informação ou dependências [p.384]. Abrange tudo que "amarra" partes: dependências transitivas de frameworks e bibliotecas, pontos de integração internos e externos, caches e qualquer comunicação entre partes [p.384].
- Escolha de tipo de contrato (estrito ou solto) vem antes de escolher implementação; "gRPC para tudo" é implementação, não arquitetura (fala de Addison); verificar com fitness functions [p.383].
- Contratos ficam num espectro de estrito a solto (Fig. 13-2) [p.385]. Contrato estrito exige aderência a nomes, tipos, ordem e demais detalhes; o mais estrito é chamada remota como RMI (imita chamada de método); formatos tipo RPC, e gRPC por padrão estrito [p.385].
- Arquitetos gostam de contratos estritos por imitarem chamadas internas, mas criam fragilidade (brittleness) de integração; algo que muda com frequência e é usado por muitas partes causa problemas (regra do Cap. 8); contratos são a "cola" e quanto mais mudam, mais ondulações em outros serviços; usar estrito só quando vantajoso [p.385].
- Mesmo JSON, formato "solto", aceita schema para torná-lo estrito (Exemplo 13-1, cortado no bloco) [p.385].

Citações curtas de prova:
- "The format used by parts of an architecture to convey information or dependencies." [p.384]

O que este trecho NÃO diz: não traz o espectro completo (a figura não foi extraída), nem consumer-driven contracts, versionamento, stamp coupling vs. outras estratégias, nem trade-offs de contrato solto (começam depois de p.385).
Relevância: architecture-hard-parts-expert: MÉDIA neste bloco (ALTA quando o capítulo completo chegar), definição ampla de contrato e brittleness; software-architecture (grupo): BAIXA agora.
Decisão sugerida: aguardar o próximo bloco para consolidar; já usar a definição de contrato e a regra "contrato estrito só quando vantajoso" em architecture-hard-parts-expert.

---

## Auditoria da skill atual

Skill auditada: C:\Users\Antonio Neto\Documents\Other Projects\afm-ai-toolkit\skills\architecture-hard-parts-expert\SKILL.md (versão 1.0, 185 linhas) e references/adr-template.md, references/trade-off-table.md. Escopo: apenas o que este bloco (cap. 10 final, 11, 12, início do 13) permite confirmar ou refutar.

### (a) Afirmações da skill que o bloco confirma
- "Toda decisão gera benefícios e custos" / "Toda vantagem possui um custo" / regra máxima de trade-off: o bloco repete que tudo em arquitetura é trade-off e que quem acha que não há trade-off ainda não o identificou [p.309]; cada padrão de dados e de saga vem com tabela de vantagens e desvantagens [p.311, 313, 324, 333, 374, 381].
- Anti-padrão "rejeite afirmações absolutas": o bloco rejeita "sempre usar coreografia" e diz para nunca usar absolutos em arquitetura [p.317].
- Comunicação: "Síncrona custa acoplamento temporal, propagação de falhas": Epic Saga falha se qualquer serviço estiver indisponível [p.347]; "Assíncrona custa debug/consistência": assincronia traz race conditions, deadlocks, confiabilidade de filas [p.359, 365].
- Consistência forte: "custo menor escalabilidade, maior acoplamento": atomicidade é a restrição de maior acoplamento; transação distribui escala e responsividade ruins [p.347, 360, 363]. Consistência eventual "custo de reconciliação": dado fora de sincronia e demora (Tabela 12-11) [p.374].
- Orquestração "custo ponto central de falha, acoplamento": confirmado literalmente (single point of failure, acoplamento orquestrador-serviços) [p.323-324]. Orquestração dá "visibilidade, governança, controle": estado consultável, workflow centralizado, tratamento de erro [p.323].
- Coreografia "autonomia, desacoplamento": confirmado (desacoplamento, escala, tolerância a falha) [p.332]; "troubleshooting complexo": suportado por tratamento de erro, recuperabilidade e estado mais difíceis [p.332].
- "Acoplamento estático/dinâmico" como par de análise: o bloco usa "static and dynamic quantum coupling" e coloca contratos como tema de ambos [p.384]; coordenação, comunicação e consistência como as três dimensões do acoplamento dinâmico [p.318].
- "Dados: nunca assuma banco por serviço é sempre melhor": o padrão Data Domain mostra caso legítimo de schema compartilhado, com vantagens (consistência, integridade, join SQL) e custos (bounded context amplo, segurança) [p.311-313]. A saga mostra o critério oposto, onde ele foi descartado por restrição concreta [p.313, 315].
- Granularidade: "forças que favorecem unificação" inclui compartilhamento intenso de dados e coordenação; o bloco cita consolidação de serviços como opção que foi descartada por serem domínios diferentes [p.313].
- ADR com Contexto, Decisão, Consequências: formato dos ADRs do bloco [p.315-316, 321]. Consequências registram custo (licença, escalabilidade) [p.316, 321].
- Hipótese/least worst: método de "hipótese e busca de negativos" na saga de dados (equivalente a "menos pior") [p.314].
- Fitness functions / governança automática: o bloco mostra governança por anotações e ferramenta de varredura de código [p.374-376] e menciona fitness functions para validar implementação de contratos [p.383].

### (b) Afirmações da skill que o bloco contradiz ou não suporta
- "Acoplamento ↓ → Complexidade Operacional ↑" (resumo de trade-off): suporte parcial. O bloco mostra acoplamento baixo com complexidade alta no Anthology e no Parallel ... (Anthology: acoplamento muito baixo, complexidade alta [p.368-369]), mas NÃO de forma geral: Fairy Tale tem acoplamento alto e complexidade muito baixa; Time Travel acoplamento médio e complexidade baixa; Parallel acoplamento baixo e complexidade baixa (ratings reconstruídos, p.354, 357, 366). Logo a regra "menos acoplamento = mais complexidade" é uma generalização que o bloco não sustenta; o livro diz que depende da combinação de forças [p.363].
- "Consistência Forte → Disponibilidade ↓": o bloco sustenta queda de responsividade, disponibilidade e escala em padrões atômicos [p.347, 360, 363], mas usa "disponibilidade" junto com responsividade; não discute CAP.
- "Dado analítico/operacional OLTP vs OLAP": nada neste bloco sobre isso (não suportado aqui, pode estar em outro bloco).
- "Coreografia custa observabilidade difícil": o bloco não usa "observabilidade"; os custos nomeados são workflow distribuído, estado, erro e recuperabilidade [p.332]. Afirmação não suportada textualmente (suportada por inferência).
- "Orquestração: coordenador central" tratada como binária (orquestração x coreografia): o bloco mostra híbridos (Front Controller como pseudo-orquestrador, stamp coupling, orquestrador sem estado, orquestrador por workflow) [p.311-313, 319-320, 329-332]. A skill omite isso, o que a deixa incompleta, não incorreta.
- Estrutura "Benefícios, Trade-offs, Riscos, Alternativas, Recomendação" e a regra "nunca responda 'esta é a melhor solução'": o bloco concorda com o espírito, mas o ADR do livro NÃO tem seção "Justificativa" separada como no template da skill (o livro tem Contexto, Decisão com justificativa embutida, Consequências) [p.315-316, 321]. É diferença de formato, não contradição.
- "Evolutionary Architecture: nunca otimize só para o cenário atual": o bloco mostra o oposto como prática aceita em ADR (aceitar gargalo do orquestrador único e reavaliar se escala mudar) [p.321], e dimensionamento com base em máximos esperados [p.314]. Não contradiz; indica que decisão consciente com gatilho de revisão é válida. O template da skill já tem "Condição de revisão" na trade-off-table, o que é compatível.
- Exemplo preenchido do ADR (Kafka) e da trade-off-table (monólito vs. microsserviços): não são suportáveis nem refutáveis por este bloco (exemplos próprios da skill).
- Linha de resumo da skill "Orquestração custo acoplamento" vs. "Coreografia autonomia": sem contradição, mas a skill não ensina o critério de escolha que o bloco dá (complexidade do workflow, frequência de erro, necessidade de escala) [p.333-334]; ver (c).

### (c) O que o bloco traz e a skill não cobre
1. **Catálogo de padrões de acesso a dados** (cap. 10): Replicated Caching (limite de volume ~500 MB x instâncias, ruim para alta taxa de atualização, dependência de startup, configuração em cloud) e Data Domain, com tabelas de trade-off [p.309-313]. A skill só fala de dados em termos de OLTP/OLAP e "banco por serviço". Falta catálogo (interservice, column schema replication, replicated cache, data domain) e a regra de dimensionamento do cache [p.310, 314].
2. **Acoplamento dinâmico em três dimensões** (comunicação, consistência, coordenação) e **acoplamento semântico vs. de implementação** [p.318, 327-329]. A skill tem "acoplamento dinâmico" só como "dependência em runtime"; não nomeia as três forças nem a regra de que implementação não reduz acoplamento semântico.
3. **Matriz dos 8 padrões de saga** com nomes, superescritos e ratings (acoplamento, complexidade, responsividade, escala) [p.342-369]. A skill não menciona sagas. Inclui os anti-padrões Horror Story(aac) e Fantasy Fiction(aao) e o caminho de escolha (Epic -> preferir Fairy Tale ou Parallel; Time Travel como rampa de acesso ao Anthology) [p.346, 357, 360, 362, 382].
4. **Compensação**: lista de riscos de atualizações compensatórias (sem isolamento, efeitos colaterais, falha de compensação, responsividade, travar ou não participantes) e a alternativa de **gestão de estado com máquina de estados** (NO_SURVEY) [p.369-373, 378-382]. Ausente da skill.
5. **Orquestração vs. coreografia com critérios de escolha**, orquestrador por workflow (não global/ESB), e **três modelos de estado em coreografia** (Front Controller, stateless, stamp coupling) com tabelas [p.319-320, 329-334]. A skill só tem duas linhas genéricas.
6. **Governança de sagas por anotações/atributos e CLI de varredura** [p.374-376]: técnica concreta para a seção de fitness functions da skill (que hoje lista só categorias genéricas: dependências proibidas, ciclos, latência).
7. **Definição de contrato** (formato usado por partes para transmitir informação ou dependências) e espectro estrito-solto com brittleness [p.384-385]. A skill cita "contratos" só como exemplo de acoplamento estático. O capítulo 13 continua no próximo bloco.
8. **Método da saga**: tabelas de trade-offs por critério do problema (workflow control, state query, error handling) e ADR com consequências de escala [p.337-339]; também a ideia de modelar workflow completo com diagramas antes de decidir [p.376].
9. **Instruções para o grupo software-architecture**: o grupo já orquestra hard-parts; este bloco sugere rotear "workflow entre serviços, saga, consistência, acesso a dados entre serviços" para architecture-hard-parts-expert e sinalizar que clean-architecture (camadas) e DDD (bounded context amplo no Data Domain) são consultados em conjunto. Não verifiquei o SKILL.md do grupo [fora do escopo da auditoria, não lido].

### Sugestões de artefato (resumo)
- Novo `references/sagas-transacionais.md` (matriz 8 padrões + ratings reconstruídos com aviso + regras de escolha + riscos de compensação + exemplo de máquina de estados).
- Novo `references/orquestracao-vs-coreografia.md` (critérios, estado em coreografia, acoplamento semântico).
- Novo `references/acesso-a-dados-distribuido.md` (4 padrões, limites de cache, trade-offs).
- Ajustes no SKILL.md: seção "Acoplamento" com as três forças dinâmicas; Workflow com ponteiro para as referências; fitness function de saga por anotações; manter ≤ 500 linhas e listar os novos arquivos em "Referências"; subir `version` e manifests de plugin.
- Cuidado de neutralidade (AGENTS.md): exemplos de código em Java/C# como "anotações/atributos", sem nome de ferramenta; nomes de padrões (Epic, Fairy Tale...) são do livro e devem ser citados como tal.

---

## Checklist de cobertura
- Primeira página lida: PDF 309
- Última página lida: PDF 385 (confirmado por Grep: último marcador "=== PDF PAGINA 385 ===", linha 2351; arquivo termina logo após o Exemplo 13-1 ser anunciado)
- Páginas sem texto útil ou ilegíveis: PDF 340 (em branco, entre o fim do cap. 11 e o início do cap. 12); figuras (10-7, 10-8, 11-1 a 11-16, 12-2 a 12-24, 13-1, 13-2) não extraídas, só legendas
- Problemas de extração observados: tabelas 11-1, 11-6, 11-7, 11-8 sem estrutura de colunas; tabelas 12-2 a 12-9 com rótulos e valores intercalados (decodificadas na seção Cap. 12 com ressalva); Tabela 12-10 com colunas parcialmente alinhadas; "TCI/IP" no original p.310 (erro do livro/extração para TCP/IP); trecho de código Java com chaves e parênteses quebrados em p.375 (Example 12-3); texto do livro em inglês
- Capítulos/seções cobertos integralmente: Cap. 11 (p.317-339); Cap. 12 (p.341-382); Cap. 10 final (p.309-316) a partir do meio do Replicated Caching
- Capítulos/seções que continuam em outro bloco: Cap. 10 (começo no bloco anterior); Cap. 13 Contracts (começa em p.383, termina antes do Exemplo 13-1 e segue no próximo bloco; inclui "Stamp Coupling for Workflow Management" citado como impr. p.378)
