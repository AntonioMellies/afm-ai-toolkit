# Notas: Software Architecture: The Hard Parts, bloco 04 (PDF p.232-308)

Convenção: página impressa = PDF - 18 (ex.: PDF 232 = impr. 214). Citações em inglês, conforme o texto extraído.

### Sysops Squad Saga: Customer Registration Granularity (fim do Cap. 7) (PDF p.232-234, impr. 214-216) [continua do bloco anterior]
Resumo: Conversa final do Cap. 7. Cadastro de cliente exige tudo-ou-nada (perfil, cartão, senha, produtos); separar em serviços impediria a transação ACID. Segurança dos dados sensíveis é tratada por design (biblioteca de segurança) e não por arquitetura (deployment separado). Resultado: um serviço consolidado de cliente, registrado em ADR.
Conceitos e regras:
- Requisito de atomicidade (registro e cancelamento de cliente como uma única unidade de trabalho) é um driver de integração/consolidação: um único serviço suporta ACID, serviços separados não [p.232-233].
- Trade-off nomeado: transacionalidade versus segurança. Separar em serviços melhoraria o controle de acesso a dados sensíveis, mas não garante o all-or-nothing [p.232-234].
- Segurança pode ser resolvida por design (biblioteca customizada/criptografia, aplicada na camada de API e no service mesh como dupla checagem) em vez de arquitetura (separar unidades de deployment) [p.232-233].
- Consequências registradas no ADR: mudança em qualquer parte (perfil, cartão, senha, produtos) aumenta escopo de teste e risco de deploy; a funcionalidade escala como uma unidade [p.233].
- Modelo de ADR (Contexto / Decisão / Consequências) com trade-off explícito no fim [p.233-234].
- O arquiteto facilita a conversa em vez de controlá-la para negociar trade-offs [p.233].
Citações curtas de prova:
- "Customer registration and unsubscribe functionality requires a single atomic unit of work." [p.233]
O que este trecho NÃO diz: não generaliza uma regra "dados sensíveis nunca justificam serviço separado"; é decisão deste contexto.
Relevância: architecture-hard-parts-expert: MÉDIA, exemplo de integrador de granularidade (transação) vs desintegrador (segurança) e de ADR. software-architecture: BAIXA.
Decisão sugerida: usar em architecture-hard-parts-expert (exemplo no catálogo de granularidade/ADR), sem duplicar conteúdo do bloco anterior.

### PARTE II: Putting Things Back Together (PDF p.235, impr. 217)
Resumo: Abertura da Parte II. Parte I trata de estrutura; Parte II trata de comunicação: comunicação entre serviços, contratos, workflows distribuídos, transações distribuídas, propriedade de dados, acesso a dados, dados analíticos [p.235].
Conceitos e regras:
- Dividir o sistema obriga a "costurar" de volta; lista de temas da Parte II (comunicação, contratos, workflows, transações distribuídas, propriedade de dados, acesso a dados, dados analíticos) [p.235].
Relevância: architecture-hard-parts-expert: BAIXA, só enquadramento (estrutura vs comunicação).
Decisão sugerida: usar apenas como enquadramento do roteiro da skill.

### Cap. 8: Reuse Patterns (PDF p.237-265, impr. 219-247)
Resumo: Compara quatro técnicas de reuso de código em arquiteturas distribuídas (replicação, biblioteca compartilhada, serviço compartilhado, sidecar/service mesh), cada uma com tabela de trade-offs e "quando usar". Depois argumenta que o valor do reuso depende da taxa de mudança, não só da abstração. Contém três Sagas com ADRs.

Contexto/abertura (p.237-239):
- Em arquiteturas distribuídas, reuso é "parte difícil"; bordões como "reuse is abuse", "share nothing" e WET (contra DRY) existem, mas o reuso é inevitável e deve ser gerenciado [p.238-239].
- Quatro técnicas: replicação de código, biblioteca compartilhada, serviço compartilhado, sidecar em service mesh [p.239].

#### 1) Code Replication (p.239-241, impr. 221-223)
- Código compartilhado é copiado para cada serviço/repositório; popular no começo dos microsserviços (arquitetura "share nothing"); na prática desabandonou [p.239].
- Cautela extrema: bug ou mudança exige atualizar todos os serviços, difícil e demorado [p.239].
- Bom para código estático, one-off, que provavelmente nunca muda (ex.: anotação/atributo marcador de ServiceEntrypoint, sem funcionalidade, usado para colocar metadados do serviço: tipo, domínio, bounded context) [p.239-240].
- Também pode servir na migração de monólito: replicar uma classe utilitária estática (Utility.cs) para cada serviço e deixar cada um enxugar/evoluir, similar ao tactical forking do Cap. 3 [p.241].
- Recomendação: investigar outras técnicas antes de replicar [p.240].
- Tabela 8-1. Vantagens: preserva bounded context; sem compartilhamento de código. Desvantagens: difícil aplicar mudanças; inconsistência de código entre serviços; sem versionamento entre serviços [p.241].
- Quando usar: código simples, estático, one-off ou improvável de mudar por defeito/funcional [p.241].

#### 2) Shared Library (p.241-245, impr. 223-227)
- Artefato externo (JAR, DLL) ligado ao serviço em tempo de compilação [p.241].
- Forças opostas na granularidade: gestão de dependências vs controle de mudança [p.242].
  - Biblioteca grossa (coarse): dependências simples (cada serviço usa uma), mas qualquer mudança força todos os serviços a adotar (deprecação de versão), retestar e reimplantar, ampliando o escopo de teste [p.242].
  - Bibliotecas finas (por funcionalidade: segurança, formatadores, anotações, calculadoras): melhor controle de mudança e manutenção, mas a matriz de dependências vira "big ball of distributed mud" / monólito distribuído; exemplo de mudança em C7 afetando só Serviços D e E [p.243].
  - Escala o problema com o número de serviços (ex.: 200 serviços e 40 bibliotecas) [p.243].
  - Conselho: evitar bibliotecas grandes e preferir bibliotecas pequenas, particionadas por funcionalidade, favorecendo controle de mudança sobre gestão de dependências; isolar código estático (formatadores, autenticação/autorização) em bibliotecas próprias [p.243].
- Versionamento (p.243-245):
  - Sempre versionar: dá compatibilidade retroativa e agilidade (ex.: Validation.jar usado por 10 serviços; um serviço adota a nova versão sem afetar os outros 9) [p.243-244].
  - Versionar é complexo; os autores o chamam de nona falácia da computação distribuída ("versioning is simple") [p.244].
  - Complexidade 1: comunicar a mudança de versão (quem foi afetado, o que mudou); ferramentas como JFrog Artifactory ajudam mas não substituem a coordenação [p.244].
  - Complexidade 2: deprecação de versões antigas. Estratégia customizada por biblioteca (desejável porque as taxas de mudança variam; ex.: Security.jar manter 2-3 versões, Calculators.jar com mudança semanal manter ~10) vs global (simples, mas gera churn: retestar/reimplantar constantemente) [p.244-245].
  - Defeito grave ou breaking change invalida qualquer estratégia de deprecação: todos adotam a nova versão de uma vez; razão extra para manter bibliotecas finas e evitar "SharedStuff.jar" [p.245].
  - Evitar a versão LATEST na especificação da dependência: problemas em hotfix/deploy de emergência por incompatibilidade [p.245].
- Tabela 8-2. Vantagens: versionável; código compartilhado em tempo de compilação reduz erros de runtime; boa agilidade para mudanças de código compartilhado. Desvantagens: dependências difíceis de gerenciar; duplicação de código em bases heterogêneas; deprecação de versão difícil; comunicação de versão difícil [p.245].
- Quando usar: ambientes homogêneos com mudança de código compartilhado baixa a moderada; características operacionais (desempenho, escalabilidade, tolerância a falhas) não são afetadas; risco de quebrar outros serviços é baixo graças ao versionamento [p.245].

#### 3) Shared Service (p.246-252, impr. 228-234)
- Funcionalidade comum em serviço implantado separadamente, acessada em runtime; o código compartilhado deve ser por composição, não herança [p.246].
- Risco de mudança: mudança é de runtime e pode derrubar o sistema inteiro (espada de dois gumes), ao contrário de mudança em compilação [p.247].
- Versionamento de endpoint de API (app/1.0/..., 1.1...) tem problemas: clientes precisam apontar para a versão certa; quando criar nova versão é subjetivo (mensagem de erro? novo cálculo?); assume REST, mas há também mensageria e gRPC, dificultando a coordenação entre protocolos [p.248].
- Conclusão: mudanças em serviço compartilhado são de runtime e mais arriscadas; versionar é mais complexo que na biblioteca [p.248].
- Desempenho: chamada interserviço adiciona latência de rede e de segurança; gRPC e protocolos assíncronos (mensageria com fila de request e fila de reply com correlation ID) mitigam em parte [p.249].
- Escalabilidade: o serviço compartilhado precisa escalar junto com os consumidores [p.250].
- Tolerância a falhas: se o serviço compartilhado cai, os consumidores ficam inoperantes; instâncias múltiplas mitigam, mas é trade-off a considerar [p.250-251].
- Tabela 8-3. Vantagens: bom para alta volatilidade de código; sem duplicação em bases heterogêneas; preserva bounded context; sem compartilhamento estático de código. Desvantagens: versionamento difícil; desempenho (latência); tolerância a falhas/disponibilidade; escalabilidade/throughput; risco maior por mudanças em runtime [p.251].
- Quando usar: ambientes altamente poliglotas e quando a funcionalidade compartilhada muda com frequência; cuidar de efeitos colaterais de runtime [p.252].

#### 4) Sidecar e Service Mesh (p.252-259, impr. 234-241)
- Tensão duplicar vs acoplar: em microsserviços "duplicação é preferível a acoplamento" (cada serviço mantém sua representação de Customer, trocando dados em formato fraco como pares nome-valor JSON); em service-based a resposta tende a ser acoplar. "It depends" [p.252].
- Capacidades operacionais (monitoramento, logging, autenticação/autorização, circuit breakers, descoberta de serviço) pedem acoplamento alto e consistência; deixar cada time implementar causa caos e dificulta upgrades unificados e verificação [p.252].
- Padrão Sidecar baseado na arquitetura hexagonal (Cockburn, ports and adapters); diferença destacada: na hexagonal o banco é só mais um adaptador, enquanto o DDD sugere que esquemas de dados e transacionalidade fiquem no interior, como nos microsserviços ("fidelidade de dados") [p.253].
- Sidecar separa lógica de domínio da lógica técnica/operacional; a parte separável vira componente sidecar, de responsabilidade compartilhada entre times ou de um grupo central de infraestrutura; conectado por plano de serviço (service plane) [p.254-255].
- Se todo serviço inclui o sidecar (governado por fitness functions), forma-se o service mesh; permite dashboards, controle de escala etc. [p.255-256].
- Governança: o sidecar dá aos arquitetos corporativos restrição razoável sobre ambientes poliglotas (um sidecar por plataforma, necessário para unificar, p.ex., monitoramento) [p.255].
- Sidecar é um padrão de reuso ortogonal: trata um tipo específico de acoplamento (operacional) cortando contra as divisões de domínio [p.256].
- Quadro "Orthogonal Coupling": duas partes da arquitetura ortogonalmente acopladas têm propósitos distintos que ainda precisam se cruzar; reconhecer isso ajuda a achar pontos de interseção com menor entrelaçamento [p.256].
- Tabela 8-4. Vantagens: forma consistente de criar acoplamento isolado; coordenação consistente de infraestrutura; propriedade por time, centralizada ou combinada. Desvantagens: precisa implementar um sidecar por plataforma; o componente pode crescer/ficar complexo [p.257].
- Quando usar: espalhar uma preocupação transversal por toda a arquitetura distribuída (não só operacional, ver Cap. 14); equivalente arquitetural do padrão Decorator do GoF [p.257].

#### Sysops Squad Saga: Common Infrastructure Logic (p.257-260, impr. 239-242)
- Logging duplicado entre biblioteca compartilhada e serviço motiva a discussão; o time está implantando service mesh com sidecar mantido por um time de infraestrutura compartilhada, com pipeline que testa o sidecar com fitness functions [p.257-258].
- Regra: sidecar só para acoplamento operacional (logging, monitoramento, descoberta de serviço, autenticação/autorização, "encanamento" sem responsabilidade de domínio). Não colocar classes de domínio (Address, Customer) no sidecar [p.258].
- Colocar classe de domínio no sidecar cria ponto de acoplamento: se um time muda, todos os que dependem precisam coordenar; contratos tratam isso. Pôr uma biblioteca no sidecar é decisão de arquiteto com análise de trade-off (não há resposta indiscutível) [p.258-259].
- Trade-off para utilitário compartilhado: quantos times precisam (benefício: não precisa ligar por dependência) vs sobrecarga em todo serviço, inclusive os que não usam (sidecar cresce). Heurística dita na saga: se menos da metade dos times usa, provavelmente não vale (exemplo JSONtoXML: 5 de 16-17 times, fica fora) [p.259].
- ADR: sidecar para acoplamento operacional (monitoramento, logging, descoberta, autenticação, autorização); time de infraestrutura é dono; consequência: não adicionar classes de domínio; bibliotecas operacionais entram se houver demanda suficiente [p.259-260].

#### Code Reuse: When Does It Add Value? (p.260-262, impr. 242-244)
- Reuso é uma das abstrações mais abusadas; organizações o tratam como meta louvável sem avaliar trade-offs [p.260].
- Lição da SOA orquestrada do início do século XX: maximizar reuso levou, no exemplo da seguradora, a centralizar a visão de Customer em um único serviço [p.260-261].
- Dois motivos pelos quais o Customer service centralizado é desastre: (1) a entidade precisa ser complexa o bastante para qualquer domínio e fica difícil de usar para coisas simples; (2) cria fragilidade: mudança no ponto único pode "ondular" por todos os domínios [p.261].
- Reuso tem dois aspectos: abstração (como se descobrem candidatos) e taxa de mudança (que determina utilidade e valor) [p.261].
- O que se reusa com sucesso (SO, frameworks open source) distingue-se pela baixa taxa de mudança e cadência de atualização conhecida; capacidades de domínio internas ou frameworks técnicos de mudança rápida são péssimos alvos de acoplamento [p.261-262].
- Reuso via plataformas: para cada capacidade de domínio distinta, constrói-se uma plataforma com API bem definida que esconde detalhes; API pode ser pouco acoplada permitindo mudança interna agressiva, mas não protege contra mudança de semântica da informação trocada; encapsulamento e contratos limitam a quebra (remete ao Cap. 13) [p.262].
Citações curtas de prova:
- "Reuse is derived via abstraction but operationalized by slow rate of change." [p.262]
- "Duplication is preferable to coupling." [p.252]
- "versioning is simple" (citado como a nona falácia da computação distribuída) [p.244]
O que este trecho NÃO diz: não dá limiar numérico geral para bibliotecas (200 serviços e 40 bibliotecas é só ilustração); a heurística "menos da metade dos times" aparece só na fala de um personagem da saga, não como regra do texto principal; não detalha como implementar o service mesh.
Relevância: architecture-hard-parts-expert: ALTA, catálogo de técnicas de reuso (replicação, biblioteca, serviço, sidecar) com trade-offs, versionamento/deprecação, regra "reuso = abstração + baixa taxa de mudança", acoplamento ortogonal. software-architecture: ALTA para decisão de reuso entre serviços e governança por fitness functions; MÉDIA para sidecar/operacional com production-ready-microservices-expert.
Decisão sugerida: usar em architecture-hard-parts-expert (novo references/ de reuso; acoplamento ortogonal no catálogo de acoplamento); mencionar no grupo software-architecture como roteamento "reuso/compartilhamento de código entre serviços".

#### Sysops Squad Saga: Shared Domain Functionality (p.262-265, impr. 244-247)
- Caso: três serviços de ticket (Creation, Assignment, Completion) compartilham lógica de banco; opção A: serviço de dados compartilhado (camada de abstração de banco); opção B: biblioteca compartilhada [p.262-263].
- Método: abordagem baseada em hipótese ("vamos hipotetizar que a solução é o serviço") e discussão de trade-offs em vez de opinião [p.263].
- Contra serviço de dados: latência por query, dependência de disponibilidade (inclusive o serviço customer-facing), risco de mudança em runtime exigindo reteste de todos, coordenação de escala. A favor: abstração de dados, pool de conexões centralizado (pouco relevante com 3 serviços), controle de mudança sem redeploy [p.264].
- Verificou-se no histórico do repositório que o código muda pouco, reforçando a biblioteca (evidência empírica de taxa de mudança) [p.265].
- ADR: biblioteca compartilhada para lógica de banco de ticket; melhora desempenho, escalabilidade e tolerância a falhas; versionar quando for apropriado; consequência: mudanças exigem testar/implantar os serviços; cada instância gerencia seu pool de conexões [p.265].
Relevância: architecture-hard-parts-expert: MÉDIA, exemplo aplicado da decisão biblioteca vs serviço guiada por taxa de mudança medida no histórico do repositório; método de hipótese.
Decisão sugerida: usar como exemplo na referência de reuso.

---

### PARTE II, Cap. 9: Data Ownership and Distributed Transactions (PDF p.267-300, impr. 249-282)
Resumo: Mostra como atribuir propriedade de tabelas a serviços (cenários single, common, joint e quatro técnicas para joint), explica transações ACID versus distribuídas (BASE) e apresenta três padrões de consistência eventual com seus trade-offs.

#### Assigning Data Ownership (p.267-281)
- Regra prática: o serviço que faz operações de escrita em uma tabela é o dono dela; vale bem para dono único, complica com propriedade conjunta e comum [p.268].
- Regra de saga: um serviço pode se conectar ao mesmo esquema que outros, mas não a vários bancos/esquemas (regra de Dana), por isso o serviço de User Maintenance não pode escrever em outro banco [p.267-268] (regra local do caso, não do texto geral do livro).
- Três cenários: single, common, joint [p.269].
- Ordem recomendada: resolver primeiro os casos de single ownership para limpar o terreno [p.270].
- **Single ownership**: apenas um serviço escreve; ele é o dono, mesmo que outros leiam (ex.: Wishlist Service com tabela Wishlist) [p.269]. Técnica de diagrama: a tabela dentro do bounded context do serviço [p.269].
- **Common ownership**: a maioria ou todos os serviços escrevem na mesma tabela (ex.: Audit, com potencialmente centenas ou milhares de serviços) [p.270]. Colocar a tabela em banco/esquema compartilhado reintroduz os problemas do Cap. 6 (controle de mudança, starvation de conexões, escalabilidade, tolerância a falhas) [p.270]. Técnica: serviço dono dedicado único; os outros enviam dados a ele. Sem retorno necessário: fila persistente assíncrona fire-and-forget (persistência garante entrega em falha do serviço ou broker). Se precisar retorno (número de confirmação, chave): REST, gRPC ou request-reply [p.270-271]. Leitura de dados comuns que não possui: técnicas do Cap. 10 [p.271].
- **Joint ownership**: poucos serviços do mesmo domínio escrevem na mesma tabela (ex.: Product, escrita por Catalog e Inventory) [p.271-272]. Quatro técnicas [p.272]:
  1. **Table split**: dividir a tabela em várias (cria Inventory com product_id e inv_cnt, copia dados, remove a coluna de Product; exemplo em DDL) [p.272-273]. Converte para single ownership; exige comunicação entre serviços ao criar/remover produto para manter consistência [p.273]. Perguntas: síncrono ou assíncrono? o que fazer se o outro serviço estiver indisponível? É o trade-off disponibilidade vs consistência (CAP: com partição de rede só um dos dois) [p.273-274]. Se o Catalog precisa de confirmação, síncrono (consistência, menos desempenho); sem confirmação, fire-and-forget (desempenho, menos consistência) [p.274]. Tabela 9-1: vantagens: preserva bounded context, propriedade única; desvantagens: tabelas precisam ser alteradas, possíveis problemas de consistência, sem transação ACID entre atualizações, sincronização difícil, pode haver replicação de dados [p.274].
  2. **Data domain**: serviços compartilham o esquema/banco, formando um bounded context mais amplo; no diagrama a tabela fica fora do contexto de cada serviço [p.274-275]. Resolve desempenho, disponibilidade e consistência; serviços independentes entre si [p.275]. Alerta: ao escolher, reavaliar por que são serviços separados (escala, tolerância a falhas, throughput, isolar volatilidade de código, ver Cap. 7) [p.275]. Problemas: mudanças de esquema exigem coordenação entre serviços (esforço, escopo de teste, risco de deploy); governar quem escreve o quê exige regras adicionais [p.275-276]. Tabela 9-2: vantagens: bom desempenho de acesso, sem problemas de escala/throughput, dados consistentes, sem dependência de serviço; desvantagens: mudanças de esquema afetam mais serviços, maior escopo de teste, governança de propriedade de escrita, maior risco de deploy [p.276].
  3. **Delegate**: um serviço é o único dono (delegate); os outros pedem atualizações a ele [p.276]. Duas opções de escolha do delegate: *primary domain priority* (dono é o serviço que faz a maior parte do CRUD da entidade principal; no exemplo, Catalog) e *operational characteristics priority* (dono é o serviço com maiores exigências operacionais; no exemplo, Inventory, pois atualiza com muita frequência e permite acesso direto ao banco) [p.276-278]. Comunicação síncrona (espera, consistência) ou assíncrona (mais rápido, consistência eventual e sem garantia de que a atualização ocorreu, impactando integridade) [p.277]. Recomendação dos autores: geralmente a opção domain priority, usando cache replicado em memória ou distribuído para mitigar desempenho/tolerância a falhas, porque o serviço Inventory não deve gerenciar atividade de banco/erro de dados estáticos de produto [p.278]. Desvantagens: alto acoplamento entre serviços, ausência de transação atômica para escritas de não donos, latência, baixa tolerância a falhas; mais adequado a escritas que não exigem atomicidade e toleram consistência eventual via assíncrono [p.278]. Tabela 9-3: vantagens: propriedade única, bom controle de mudança de esquema, abstrai estruturas de dados; desvantagens: acoplamento alto, baixo desempenho para escritas de não donos, sem transação atômica, baixa tolerância a falhas para não donos [p.279].
  4. **Service consolidation**: unir os serviços donos em um só, voltando a single ownership [p.279]. Resolve dependência e desempenho; mas grão mais grosso aumenta escopo de teste e risco de deploy, reduz tolerância a falhas (tudo falha junto) e a escalabilidade passa a ser uniforme [p.279-280]. Tabela 9-4: vantagens: preserva transações atômicas, bom desempenho geral; desvantagens: escalabilidade mais grossa, menos tolerância a falhas, maior risco de deploy, maior escopo de teste [p.280].
- Resumo do exemplo: Wishlist single owner; Audit com novo Audit Service e fila persistente assíncrona; Product com delegate (Catalog dono, Inventory envia pedidos) [p.280].
- Depois de atribuir, validar a propriedade analisando workflows de negócio e requisitos transacionais [p.280].
Citações curtas de prova:
- "The general rule of thumb for data ownership is that the service that performs write operations to a table is the owner of that table." [p.268]
O que este trecho NÃO diz: não dá critério numérico para "poucos" vs "maioria" de serviços escritores; não descreve como migrar dados entre esquemas além do DDL de exemplo; a escolha final da técnica joint no exemplo (delegate) é ilustrativa.
Relevância: architecture-hard-parts-expert: ALTA, catálogo de propriedade de dados (3 cenários, 4 técnicas com tabelas de trade-off). software-architecture: ALTA (decomposição de dados e ownership).
Decisão sugerida: usar em architecture-hard-parts-expert (novo references/ de propriedade e acesso a dados); incluir no grupo software-architecture o roteamento para ownership/acesso a dados.

#### Distributed Transactions (p.281-285, impr. 263-267)
- ACID: atomicidade (tudo ou nada, mesmo com vários updates), consistência (sem violar restrições, ex.: chave estrangeira), isolamento (dados não commitados invisíveis a outros), durabilidade (commit é permanente apesar de falhas) [p.282]. Sem entender ACID o arquiteto não consegue analisar trade-offs de transação distribuída [p.281].
- ACID pode existir dentro de cada serviço (se o banco suportar); mas se o pedido de negócio abrange vários serviços, vira transação distribuída [p.283].
- Em transação distribuída: atomicidade está ligada ao serviço, não ao pedido de negócio; consistência perde (dados fora de sincronia, restrições relacionais como FK não se aplicam); isolamento perde (dado commitado por um serviço fica visível antes do fim do processo); durabilidade só por serviço [p.284].
- No lugar de ACID, BASE: basic availability (todos os serviços esperados disponíveis; assíncrono ajuda desacoplar mas alonga a consistência), soft state (processo em andamento, estado do pedido incompleto ou desconhecido, difícil de determinar com fluxo assíncrono), eventual consistency (com tempo suficiente tudo sincroniza) [p.285].
- Arquiteturas distribuídas aceitam consistência eventual em troca de desempenho, escalabilidade, elasticidade, tolerância a falhas e disponibilidade [p.285].
Citações curtas de prova:
- "In a distributed transaction, atomicity is bound to the service, not the business request" [p.284] (frase truncada por mim; no texto "...(such as customer registration)")
Relevância: architecture-hard-parts-expert: ALTA, definição ACID vs BASE por propriedade, base para decidir sagas.
Decisão sugerida: usar na referência de transações distribuídas.

#### Eventual Consistency Patterns (p.285-297, impr. 267-279)
Cenário-guia: cliente 123 cancela a assinatura; Profile Service remove perfil e confirma, mas Contract e Billing ainda têm dados [p.286].
1. **Background synchronization** (p.287-290): processo externo (batch noturno ou periódico) verifica fontes e sincroniza; costuma ter o maior tempo até consistência; adequado quando a sincronia imediata não importa (ex.: unsubscribe) [p.287]. Precisa saber o que mudou (stream de eventos, trigger, delta entre tabelas) e conhecer todas as tabelas envolvidas [p.287]. Boa responsividade [p.287]. Maior desvantagem: acopla todas as fontes de dados, quebra bounded contexts (o processo precisa de escrita nas tabelas de cada serviço, propriedade compartilhada); mudanças estruturais precisam ser coordenadas com o processo; lógica de negócio duplicada (exemplo: dados mantidos 3 meses com remove_date; a regra vive nos serviços e também no batch) [p.288-289]. Não serve para arquiteturas que exigem bounded contexts fortes (microsserviços); útil em sistemas fechados, heterogêneos, que não se comunicam (ex.: sistema de pedidos de empreiteiro e sistema de faturamento) [p.289]. Tabela 9-5: vantagens: serviços desacoplados, boa responsividade; desvantagens: acoplamento de fonte de dados, implementação complexa, quebra bounded contexts, lógica de negócio possivelmente duplicada, consistência lenta [p.290].
2. **Orchestrated request-based** (p.290-295): toda a transação distribuída é processada durante a requisição (usuário esperando) por um orquestrador (serviço existente ou novo) que conhece o processo, os participantes, multicast, tratamento de erro e propriedade de contrato [p.290]. Orquestrador como papel de um serviço primário sobrecarrega e acopla (acoplamento forte e dependências síncronas); os autores preferem um serviço de orquestração dedicado [p.290-291]. No exemplo: orquestrador chama o perfil de forma síncrona e depois Contract e Billing em paralelo; resposta em 2s [p.292]. Trade-off 1: favorece consistência sobre responsividade (saltos de rede extras; perfil síncrono primeiro por tratamento de erro: se falhar por cobrança pendente, nada a desfazer nos outros) [p.292-293]. Trade-off 2: tratamento de erro complexo; se perfil e contrato commitaram e billing falha, opções: retentar, compensar, avisar o cliente e reparar depois, ignorar [p.293]. Como não há outro mecanismo de correção neste padrão, na prática resta a transação compensatória (reinserir cliente, restaurar remove_date), o que exige que o orquestrador tenha todos os dados e que não haja efeitos colaterais [p.293]. Falha durante a compensação deixa dados fora de sincronia sem ninguém para reparar, tipicamente com intervenção humana; detalhes de compensação e sagas no capítulo de Transactional Saga Patterns [p.294]. Tabela 9-6: vantagens: serviços desacoplados, consistência rápida (timeliness), requisição de negócio atômica; desvantagens: responsividade mais lenta, tratamento de erro complexo, normalmente exige transações compensatórias [p.295].
3. **Event-based** (p.295-297): eventos ou comandos publicados em tópico/stream por pub/sub assíncrono; os serviços escutam e reagem; um dos padrões mais populares e confiáveis [p.295]. Tempo de consistência normalmente curto (paralelo e desacoplado); boa responsividade; serviços muito desacoplados [p.295]. Requisito de confiabilidade: em pub/sub com tópicos, assinantes duráveis (durable subscribers) para não perder mensagens; com streaming (Kafka), o broker deve persistir a mensagem por tempo razoável [p.296]. Principal trade-off: tratamento de erro; se o serviço falha ao processar, o broker tenta N vezes e envia para dead letter queue (DLQ) para um processo automatizado tentar reparar, senão humano [p.296-297]. Tabela 9-7: vantagens: serviços desacoplados, consistência em tempo hábil, resposta rápida; desvantagem: tratamento de erro complexo [p.297].
- Texto indica que os três padrões estão listados em ordem; os autores não dão fórmula de escolha além dos trade-offs [p.285].
Citações curtas de prova:
- "the main trade-off of this pattern is error handling." [p.296]
O que este trecho NÃO diz: não detalha saga patterns (adiado para capítulo posterior, "Transactional Saga Patterns" na impr. p.324); não cobre outbox nem idempotência neste trecho.
Relevância: architecture-hard-parts-expert: ALTA, três padrões de consistência eventual com trade-offs, que complementam o catálogo de sagas. software-architecture: ALTA.
Decisão sugerida: usar em architecture-hard-parts-expert (referência de dados/transações distribuídas).

#### Sysops Squad Saga: Data Ownership for Ticket Processing (p.297-300, impr. 279-282)
- ADR: Single Table Ownership for Bounded Contexts. Quando só um serviço escreve, ele é dono; serviços com acesso só de leitura não podem acessar diretamente o banco/esquema do outro bounded context; consequência: desempenho e tolerância a falhas podem sofrer para leitura entre contextos [p.298].
- Joint ownership no caso da tabela Survey (Ticket Completion e Survey escrevem). Table split inviável pela estrutura da tabela; data domain inviável porque Ticket Completion já está no domínio de dados de ticket e um serviço não pode se conectar a vários esquemas; juntar tabelas no esquema de ticket levaria de volta ao banco monolítico [p.298-299].
- Solução: delegate; o Survey Service é dono único da tabela e recebe os dados necessários no payload da mensagem que o Ticket Completion já envia para disparar a pesquisa [p.299-300].
- Consequência: criação do registro de survey deixa de fazer parte do processo de conclusão do ticket e vira atividade separada do Survey Service [p.300].
Relevância: architecture-hard-parts-expert: MÉDIA, exemplo aplicado de delegate via payload do evento, com ADR e consequências.
Decisão sugerida: usar como exemplo.

---

### Cap. 10: Distributed Data Access (PDF p.301-308, impr. 283-290) [continua no próximo bloco]
Resumo: Aborda como um serviço lê dados que não possui. Quatro padrões: Interservice Communication, Column Schema Replication, Replicated Caching e Data Domain; este bloco cobre os três primeiros (o Replicated Caching é interrompido na p.308) e termina antes do exemplo completo e do Data Domain.
Conceitos e regras:
- Contexto: em monólitos com um banco, joins SQL resolvem leitura; ao separar em esquemas/bancos por serviço, leitura vira parte difícil [p.302]. Exemplo-guia: Wishlist Service precisa de item_desc, que pertence ao Catalog Service [p.302].
- Saga (p.301-302): leituras frequentes de expert profile pelo algoritmo de atribuição; trocar REST por mensageria não resolve (continua esperando resposta); fica claro que precisa de alternativa a chamada remota [p.301-302].
- **Interservice Communication** (p.303-304): o mais comum; o serviço pede ao dono via protocolo remoto. Problemas: latência de rede (~30-300 ms), de segurança (~20-400 ms) e de dados (chamada extra ao banco ~10-50 ms); o total pode chegar a cerca de 1 s [p.303-304]. Acoplamento semântico e estático: se Catalog cai, Wishlist cai; escala acompanha [p.304]. Tabela 10-1: vantagens: simplicidade, sem problema de volume de dados; desvantagens: latência (rede, dados, segurança), escalabilidade/throughput, sem tolerância a falhas (disponibilidade), exige contratos entre serviços [p.304]. (Os números de latência são estimativas dos autores.)
- **Column Schema Replication** (p.305-306): colunas replicadas nas tabelas do consumidor (item_desc na tabela Wishlist) [p.305]. Problemas: sincronização e consistência (Catalog avisa quando produto é criado/removido/descrição muda, em geral por filas, tópicos ou stream; assíncrono preferido salvo necessidade de sincronia transacional imediata) e governança de propriedade (outros serviços podem alterar o dado replicado) [p.305]. Vantagens: leitura imediata, joins simples, melhor desempenho, tolerância a falhas e escalabilidade [p.306]. Os autores desaconselham em geral para o exemplo Wishlist/Catalog; considerar em agregação de dados, relatórios ou quando outros padrões não servem por grande volume, alta responsividade ou alta tolerância a falhas [p.306]. Tabela 10-2: vantagens: bom desempenho, sem problemas de escala/throughput, sem problemas de tolerância a falhas, sem dependências de serviço; desvantagens: problemas de consistência, de propriedade, e sincronização necessária [p.306].
- **Replicated Caching** (começa p.306-308, continua no próximo bloco): cache em memória replicado em cada serviço e continuamente sincronizado, não só para responsividade mas também para compartilhar dados [p.306]. Comparação: cache em memória único (cada serviço com o seu, sem sincronização, não serve para compartilhar dados) [p.307]; cache distribuído (servidor externo): desvantagens: a dependência só muda para o servidor de cache (sem ganho em tolerância a falhas), outros serviços podem atualizar e quebrar o bounded context de propriedade, latência de rede extra [p.307]. Cache replicado: sem dependência de cache externo, atualização propagada de forma assíncrona entre instâncias; nem todo produto suporta (exemplos: Hazelcast, Apache Ignite, Oracle Coherence) [p.308]. No exemplo: Catalog Service dono do cache de descrições (único que modifica) e Wishlist com réplica somente leitura [p.308]. O trecho termina nesta página; o restante (trade-offs, quando usar, Data Domain) está no bloco seguinte.
Citações curtas de prova:
- "the Interservice Communication pattern is by far the most common pattern for accessing data in a distributed system" (parafraseado: "by far the most common pattern") [p.303]
O que este trecho NÃO diz: neste bloco não aparecem os limites de tamanho de dados/taxa de atualização do cache replicado, a tabela 10-3, nem o padrão Data Domain de acesso.
Relevância: architecture-hard-parts-expert: ALTA, catálogo de padrões de acesso a dados entre contextos com trade-offs. software-architecture: ALTA.
Decisão sugerida: usar em architecture-hard-parts-expert (referência de dados); completar com bloco seguinte.

---

## Checklist de cobertura
- Primeira página lida: 232
- Última página lida: 308 (77 marcadores "=== PDF PAGINA", de 232 a 308 inclusive, confere)
- Páginas sem texto útil ou ilegíveis: 236 (em branco), 266 (em branco); 234 só tem o final do ADR; figuras sem texto extraído (todas as Figuras 8-x, 9-x, 10-x)
- Problemas de extração observados: tabelas em colunas achatadas (Tabelas 8-1 a 10-2; a Tabela 9-7 saiu com título misturado ao cabeçalho "Disadvantages"); hifenização/ligaduras ("verses", "prop-" etc.); typos do original (ex.: "Discount calendar", "The Wishlist must rely"); p.249-250 sem rótulos de itens de figura; título da Seção do ADR de customer no final da p.233 corta e continua na p.234
- Capítulos/seções cobertos integralmente: fim do Cap. 7 (Saga Customer Registration, a partir da p.232), abertura da Parte II, Cap. 8 inteiro, Cap. 9 inteiro
- Capítulos/seções que continuam em outro bloco: Cap. 7 começa em bloco anterior; Cap. 10 continua no próximo (Replicated Caching a partir da p.308 e Data Domain pattern + saga)

---

## Auditoria da skill atual

Escopo auditado: `skills/architecture-hard-parts-expert/SKILL.md` (185 linhas, versão "1.0"), `references/adr-template.md` e `references/trade-off-table.md`. Comparação feita apenas contra o bloco PDF p.232-308; o que o bloco não cobre não é julgado como erro. O grupo `software-architecture` não foi lido nesta auditoria.

### (a) O que a skill afirma e o bloco confirma
- Toda decisão tem custo e nada é gratuito (Mentalidade Principal): praticamente cada técnica do bloco vem com tabela de vantagens/desvantagens (Tabelas 8-1 a 10-2) [p.241, 245, 251, 257, 274, 276, 279, 280, 290, 295, 297, 304, 306]. A personagem arquiteta insiste em analisar trade-offs em vez de opiniões: "It's not about opinions" [p.263].
- "Depende do contexto" / rejeitar absolutos (Anti-Padrões): duplicar vs acoplar muda conforme o estilo (microsserviços tendem a duplicar; service-based tende a acoplar, "It depends!") [p.252]; reuso não é virtude absoluta [p.260].
- Granularidade, forças de unificação (transações, dados compartilhados): requisito de transação atômica levou a manter um serviço de cliente único [p.232-233]; consolidar serviços preserva transações atômicas [p.280]. Forças de divisão (escalabilidade, tolerância a falhas, throughput, volatilidade de código) aparecem na nota sobre reavaliar por que existem serviços separados ao usar data domain [p.275].
- Dados, não assumir "banco por serviço é sempre melhor": o bloco admite compartilhar esquema (data domain) e consolidar serviços como soluções legítimas, com custos [p.274-276, 279-280].
- Consistência forte vs eventual com custos: ACID vs BASE por propriedade [p.282-285]; custo da consistência eventual é tratamento de erros complexo [p.293, 296]; arquiteturas distribuídas trocam consistência por desempenho, escala e disponibilidade [p.285].
- Comunicação síncrona (custo: acoplamento, propagação de falhas) e assíncrona (custo: consistência eventual): latência, disponibilidade e escala ligadas à chamada interserviço [p.303-304]; síncrono dá consistência, assíncrono dá desempenho e consistência eventual [p.274, 277].
- Orquestração (custo de acoplamento): o padrão orquestrado favorece consistência sobre responsividade; designar um serviço de negócio como orquestrador o sobrecarrega e acopla [p.291-292]. Parcial: "ponto central de falha" não aparece literalmente.
- Coreografia (autonomia, desacoplamento; custo em troubleshooting): o padrão event-based é altamente desacoplado, com tratamento de erro como principal trade-off [p.295-297]; o estado em andamento é difícil de determinar em fluxos assíncronos [p.285]. Parcial: o bloco não usa o termo "coreografia".
- Acoplamento estático/dinâmico: o bloco fala de acoplamento "semântico e estático" na chamada interserviço [p.304] e de "static code sharing" na tabela do serviço compartilhado [p.251]. Parcial: só o lado estático, sem a dicotomia como categoria.
- ADR com Contexto, Decisão, Consequências: os quatro ADRs do bloco seguem essa forma, com o trade-off no fim [p.233-234, 259-260, 265, 298-300]; o trade-off é explicitado ("transactionality versus security") [p.233].
- Fitness functions para governança: sidecar "governado por fitness functions" e pipeline que testa o sidecar com elas [p.255, 258].
- Transações distribuídas perdem consistência/atomicidade por pedido [p.284] e normalmente exigem compensação [p.295]; sagas são remetidas a capítulo posterior [p.294]. Isso dá respaldo à linha "Consistência baixa, sagas necessárias" do exemplo de microsserviços no `trade-off-table.md`.

### (b) O que a skill afirma e o bloco contradiz ou não suporta
- `trade-off-table.md`, exemplo, Microservices: "Resiliência alto, falha isolada por serviço (com circuit breaker)". O bloco mostra o oposto quando há dependência síncrona: serviço compartilhado derruba os consumidores [p.250-251] e a interservice communication tem "No fault tolerance" na tabela [p.304]. Tensão relevante: o ganho de resiliência depende de como os serviços se acoplam; sugerir qualificar.
- Mesmo exemplo, Microservices: "Observabilidade alto, tracing distribuído obrigatório". O bloco não trata observabilidade como vantagem; o ponto relacionado é a dificuldade de saber o estado de transações assíncronas (soft state) [p.285]. Não suportado.
- Mesmo exemplo: ratings de performance, custo operacional e velocidade de entrega entre monólito e microsserviços [fora do livro]; o bloco só trata custos pontuais de rede e latência [p.303-304].
- SKILL.md: "Dados geralmente vivem mais que sistemas" [fora do livro].
- SKILL.md: OLTP vs OLAP: o bloco só lista "dados analíticos" como tema da Parte II [p.235]; sem detalhe aqui.
- SKILL.md: "Princípio do Least Worst": a expressão não aparece neste bloco; o texto fala em trade-offs e "It depends" [p.252, 263]. Não suportado neste bloco (pode estar em bloco anterior; não verificável aqui).
- SKILL.md: forças de divisão "autonomia de times": não aparece neste bloco.
- SKILL.md: Evolutionary Architecture: nenhuma menção neste bloco.
- `adr-template.md`: seção "Fitness Functions" no ADR e o exemplo com Outbox Pattern, idempotência e lag de consumer: o bloco não traz outbox nem idempotência (cita durable subscribers, persistent queues e DLQ [p.271, 296-297]). Os ADRs do bloco não têm seção de fitness functions, status ou decisores, e as alternativas ficam no Contexto [p.233, 259, 265, 298]. Não é contradição; o template é mais elaborado que o modelo do livro.
- SKILL.md tem "Justificativa" como campo separado; nos ADRs do bloco ela está dentro da Decisão [p.233, 265, 299]. Diferença de forma, sem contradição.
- A regra "um serviço não pode conectar a vários esquemas" [p.268, 298] é regra local de uma personagem (Dana) na saga; a skill não a afirma e ela não deve ser promovida a regra geral.

### (c) O que o bloco traz e a skill não cobre
ALTA (catálogos com tabela de trade-off, adequados para novos `references/`):
1. Reuso de código em sistemas distribuídos (Cap. 8): 4 técnicas (replicação, biblioteca compartilhada, serviço compartilhado, sidecar/service mesh), cada uma com vantagens, desvantagens e "quando usar" [p.239-257]. A skill não tem nada sobre reuso.
   - Regra central: reuso nasce por abstração e se operacionaliza por baixa taxa de mudança; SO e frameworks externos são bons alvos, capacidades de domínio internas e frameworks técnicos voláteis não [p.261-262]. Exemplo da seguradora: Customer centralizado cria complexidade e fragilidade [p.261].
   - Granularidade de biblioteca: dependência vs controle de mudança; preferir bibliotecas pequenas por funcionalidade [p.242-243].
   - Versionamento: sempre versionar, comunicar versões, deprecação customizada vs global, nunca usar LATEST, breaking change anula a política [p.243-245]; "versioning is simple" como nona falácia [p.244].
   - Serviço compartilhado: risco de runtime, versionamento de endpoint e subjetividade, latência, escala, falha; bom para código volátil e ambientes poliglotas [p.247-252].
   - Sidecar/service mesh: só acoplamento operacional, não classes de domínio; governado por fitness functions; trade-off de tamanho (heurística de uma personagem: menos da metade dos times, provavelmente não vale) [p.252-259].
   - Acoplamento ortogonal (operacional vs domínio) [p.256]; duplicação vs acoplamento conforme o estilo [p.252].
   - Método: hipótese e verificação da taxa real de mudança no histórico do repositório [p.263-265].
2. Propriedade de dados (Cap. 9): regra "quem escreve é dono"; cenários single/common/joint; resolver single primeiro; common: serviço dono dedicado com fila persistente fire-and-forget ou REST/gRPC/request-reply; joint: table split, data domain, delegate (primary domain priority vs operational characteristics priority), service consolidation, cada um com tabela; diagramar a tabela dentro ou fora do bounded context [p.268-280]. A skill só diz que banco por serviço não é sempre melhor.
3. Transações distribuídas: ACID propriedade por propriedade e como cada uma falha entre serviços; BASE (basic availability, soft state, eventual consistency) [p.281-285]. A skill apenas contrapõe consistência forte e eventual.
4. Três padrões de consistência eventual com tabelas: background synchronization (quebra bounded context, lógica duplicada), orquestrado request-based (4 opções de erro, compensação, falha na compensação exige humano), event-based (durable subscribers, DLQ) [p.285-297]. A skill lista orquestração vs coreografia, sem DLQ, compensação ou assinantes duráveis.
5. Acesso a dados entre contextos (Cap. 10, parcial): Interservice Communication (latências de rede, segurança e dados; estimativas dos autores), Column Schema Replication, Replicated Caching (comparação com cache único e distribuído) [p.301-308]. O padrão Data Domain de acesso e os trade-offs do cache replicado ficam para o bloco seguinte.

MÉDIA:
6. Design vs arquitetura: segurança pode ser resolvida por design em vez de quebrar em unidades de deployment [p.233].
7. Facilitar a negociação em vez de controlá-la [p.233]; hipótese como método de decisão [p.263].
8. ADRs do livro com consequências concretas (consolidação, sidecar, biblioteca vs serviço, single table, delegate com payload) [p.233-234, 259-260, 265, 298-300], úteis como exemplos além do exemplo Kafka da skill.
9. Reavaliar por que existem serviços separados ao adotar data domain (volta ao Cap. 7) [p.275].
10. Cache replicado ou distribuído como mitigador do delegate [p.278].

### Decisão sugerida
- `architecture-hard-parts-expert`: SKILL.md tem 185 linhas, com folga até ~450. Acrescentar seções curtas (1-3 linhas) e criar em `references/` arquivos como `reuso-de-codigo.md`, `propriedade-de-dados.md`, `consistencia-eventual.md` e `acesso-a-dados.md`, listados em `## Referências`. Manter no SKILL.md a regra "abstração + baixa taxa de mudança" e o roteamento.
- `trade-off-table.md`: qualificar as linhas de Resiliência e Observabilidade do exemplo (item b).
- Grupo `software-architecture`: acrescentar roteamento para reuso/compartilhamento de código, propriedade de dados, transação distribuída e acesso a dados, apontando para `architecture-hard-parts-expert` (grupo não lido aqui; conferir).
- Completar após o bloco seguinte (Data Domain de acesso, cache replicado, contratos, workflows, sagas) antes de fechar as referências.
