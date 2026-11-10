# Notas: Software Architecture: The Hard Parts, bloco 02 (PDF p.78-154)

Convenção: página = "PDF PAGINA N" do marcador; impr. = número impresso (PDF - 18 neste bloco, ex.: PDF 78 = impr. 60). Citações curtas, paráfrase nos demais pontos. Pseudocódigos/tabelas não reproduzidos.

### Cap. 3 (final): Sysops Squad Saga, Creating a Business Case (PDF p.78-80, impr. 60-62) [continua do bloco anterior]
Resumo: Fecha o capítulo de modularidade com a saga: os arquitetos ligam cada dor do negócio (manutenção, testes, deploy, disponibilidade, travamentos) a um driver de modularidade e registram um ADR de migração para arquitetura distribuída. Exemplo de ADR com Contexto/Decisão/Consequências onde as consequências incluem custos reais.
Conceitos e regras:
- Testabilidade e deployabilidade: num monólito deploy-se tudo mesmo para bug pequeno; releases mensais acumulam mudanças não testadas em conjunto; separar em serviços reduz escopo de teste e risco de deploy, permitindo deploy mais frequente e com menos cerimônia [p.78]. Um personagem lembra que parte do problema é pipeline de deploy, e que o pipeline também precisará mudar [p.78].
- Disponibilidade via tolerância a falhas: métricas mostraram que o que derruba o sistema é survey/relatórios, não o ticketing central; isolá-los em serviços separados mantém o núcleo no ar [p.78].
- Travamento tem duas causas identificadas: mais de 25 clientes simultâneos criando tickets, e relatórios operacionais rodando durante o dia; diagnóstico = problema de escalabilidade + carga no banco; solução = separar relatórios em sistema próprio e quebrar o banco monolítico [p.79].
- O ADR de migração liga cada decisão a uma característica (fault tolerance, scalability, agility, testability, deployability) [p.79].
- Consequências do ADR: atraso em features (devs ocupados na migração), custo adicional, pipeline com múltiplas unidades de deploy até ser adaptado, necessidade de quebrar o banco [p.80].
Citações curtas de prova:
- "whenever we have more than 25 customers creating tickets at the same time, the system freezes" [p.79]
O que este trecho NÃO diz: não apresenta método formal de business case nem números de custo ("cost estimates to be determined", p.80).
Relevância: architecture-hard-parts-expert: MÉDIA, exemplo de ADR com consequências negativas explícitas e vínculo driver-característica. software-architecture: BAIXA.
Decisão sugerida: usar como exemplo de ADR (forma: contexto, decisão ligada a característica, consequências negativas) em references de ADR.

### Cap. 4: Architectural Decomposition (PDF p.81-97, impr. 63-79)
Resumo: Modularidade é o "porquê", decomposição é o "como". Antipadrão Elephant Migration (comer o elefante aos poucos) leva a "distributed monolith". Duas abordagens eficazes: decomposição baseada em componentes e tactical forking; a escolha depende de a base de código ser decomponível e do quão estruturada é.
Conceitos e regras:
- Elephant Migration Anti-Pattern: extrair pedaços ad hoc (ex.: começar por knowledge base e survey por serem fáceis) gera abordagem não estruturada e "big ball of distributed mud"/monólito distribuído [p.82]. Os personagens também notam que extrair relatórios exige separar dados (ou banco de relatórios com data pumps) [p.81].
- Árvore de decisão (Fig. 4-1): (1) a base de código é decomponível? (2) se sim e for bagunça sem componentes definíveis -> tactical forking; se houver componentes bem ou fracamente definidos -> component-based decomposition [p.82-83]. Fator principal: quão bem estruturado está o código [p.82].
- Big Ball of Mud (Brian Foote, 1999): sem estrutura interna não há o que o arquiteto "decomponha por padrões"; pergunta-chave: a base é salvável? Nenhuma medida única decide; arquitetos usam métricas de acoplamento [p.83-84].
- Acoplamento aferente (Ca, conexões de entrada) e eferente (Ce, conexões de saída), de Yourdon/Constantine 1979. Exemplo: classe compartilhada Address num monólito; ao decompor é preciso saber quantas partes a usam [p.84].
- Abstractness A = soma(abstratos) / (soma(concretos) + soma(abstratos)); base com um main() e 10.000 linhas tem A perto de zero e é difícil de entender [p.85-86].
- Instability I = Ce / (Ce + Ca). Valor perto de 1 = muito instável (quebra ao mudar por alto acoplamento); perto de 0 pode ser estável (se maioria abstrato) ou rígido (se maioria concreto). Trade-off: alta estabilidade custa reuso, pois componentes autocontidos duplicam código. Olhar I e A juntos [p.86].
- Distance from the main sequence D = |A + I - 1|: quanto mais perto da linha, mais equilibrado. Canto superior direito = zona de inutilidade (abstrato demais); inferior esquerdo = zona de dor (implementação sem abstração, frágil). Se muitos componentes estão nas duas zonas, talvez não valha reparar a estrutura interna antes de decompor [p.87-88].
- Analogia: mover estrutura grande com fundação ruim é arriscado; melhorar estrutura interna facilita mover [p.88].
- Componente = bloco com papel/responsabilidade e conjunto de operações bem definidos, manifestado em namespace/diretório (ex.: penultimate/ss/ticket/assign -> penultimate.ss.ticket.assign) [p.89].
- Regra: ao quebrar monólito, construir serviços a partir de componentes, não de classes individuais [p.89].
- Component-based decomposition migra monólito para service-based architecture (serviços de domínio de grão grosso com toda a lógica do domínio) [p.90].
- Service-based como destino final ou degrau para microsserviços: (a) permite decidir quais domínios precisam de mais granularidade; (b) não exige quebrar o banco; (c) não exige automação operacional nem contêineres (mesmo artefato de deploy, EAR/WAR etc.); (d) é mudança técnica, geralmente sem envolver stakeholders de negócio nem mudar organização/ambientes [p.90].
- Tactical forking (nome de Fausto De La Torre): em vez de extrair (que arrasta dependências), clonar o monólito inteiro para cada time e deletar o que não precisa; deletar é verificável por compilação/teste simples [p.91-95].
- Passos: monólito com vários domínios -> clonar a base para cada time -> cada time apaga o que não é seu e refatora -> resultado: dois serviços de grão grosso [p.92-95].
- Trade-offs do tactical forking. Benefícios: começar já com pouca análise prévia; mais fácil deletar do que extrair. Desvantagens: muito código latente remanescente; serviços não ficam melhores que o monólito, só menores; inconsistências de nomes em código compartilhado dificultam achar e manter código comum [p.95-96].
- Saga (escolha): métricas A/I mostraram a maioria do código perto da main sequence, logo viável; escolheram component-based porque tactical forking duplica código (logging, segurança, persistência) e os problemas são manutenibilidade/testabilidade/confiabilidade [p.96-97].
- ADR da saga: razões = limites de componentes já definidos, menos código duplicado, em tactical forking é preciso definir fronteiras de serviço antes (quantos forks), em component-based os serviços emergem do agrupamento; consequências = demora mais, mas time colabora (tactical forking exigiria dividir times e mais coordenação) [p.97].
Citações curtas de prova:
- "Elephant Migration Anti-Pattern" [p.82]
- "the first step in an architecture decomposition effort is to first determine whether the codebase is even decomposable" [p.83]
- "build services from components, not individual classes" [p.89]
O que este trecho NÃO diz: não dá limiares numéricos para A, I ou D (apenas a ideia de distância); não define critérios quantitativos para "decomponível"; não traz o ciclo de vida de migração de dados (vem no cap. 6). A p.98 está em branco.
Relevância: architecture-hard-parts-expert: ALTA (catálogo de abordagens de decomposição, métricas de acoplamento, antipadrão Elephant). software-architecture: ALTA (roteamento "decompor monólito": decomponível? estruturado? -> forking vs componentes; service-based como degrau).
Decisão sugerida: usar em architecture-hard-parts-expert/references (decomposição: árvore de decisão, métricas, trade-offs de tactical forking) e como fluxo no grupo software-architecture.

### Cap. 5: Component-Based Decomposition Patterns (PDF p.99-148, impr. 81-130)
Resumo: Seis padrões aplicados em sequência para refatorar um monólito estruturado em componentes bem dimensionados, achatados, agrupados em domínios e depois extraídos como domain services (service-based). Cada padrão tem Descrição, Fitness Functions para governança e Saga Sysops Squad. Depois da migração, os padrões são usados individualmente na manutenção do monólito.
Conceitos e regras:
- Mapa dos seis padrões (ordem): Identify and Size Components; Gather Common Domain Components; Flatten Components; Determine Component Dependencies; Create Component Domains; Create Domain Services [p.100].
- Architecture stories: descrevem refatoração estrutural que atende um driver de negócio (formato "Como arquiteto, preciso desacoplar X para Y"); diferem de technical debt stories, que são limpeza para depois; architecture story é algo que precisa mudar rápido por característica ou necessidade de negócio [p.102].

#### Padrão 1: Identify and Size Components (p.102-111, impr. 84-93)
- Objetivo: catalogar componentes e dimensioná-los; componentes grandes demais são mais acoplados, mais difíceis de virar serviços, menos modulares [p.102].
- Métrica de tamanho: total de statements por componente (soma de todos os arquivos do namespace/diretório); nº de arquivos, classes e LOC não servem porque cada programador projeta diferente [p.102-103]. Statement = ação completa terminada por ';' ou newline [p.102-103].
- Regra: tamanho de cada componente entre 1 e 2 desvios-padrão da média; percentual de código por componente deve ser razoavelmente uniforme [p.103].
- Inventário (Tabela 5-1): nome do componente (autodescritivo; "Ticket Manager" é nome vago e deve ser renomeado), namespace (consistente em toda a aplicação), percent (statements do componente / total), statements, files [p.103-104]. Files serve como pista: 18.409 statements em 2 arquivos sugere dividir em classes mais contextuais; um "Customer Wishlist" com 12.000 statements indica complexidade escondida [p.104].
- Para redimensionar componente grande: decomposição funcional ou orientada a domínio para achar subdomínios (ex.: Trouble Ticket com 22% -> Creation, Assignment, Routing, Completion); se não há subdomínios claros, deixar como está [p.104-105].
- Fitness functions (todas holísticas, no CI/CD): manter inventário de componentes (alerta sobre adicionados/removidos) [p.105]; nenhum componente acima de X% do código (ex.: limite 30% para app com 10 componentes, 10% para 50 componentes) [p.106]; nenhum componente além de N desvios-padrão da média (exemplo usa 3) [p.106-107].
- Saga: 82.931 statements no total; Reporting tinha 33% (27.765 statements, 162 arquivos); dividido em Reporting Shared + Ticket/Expert/Financial Reports (cada ~8-9%, shared 7%); Reporting passa a ser subdomínio, não componente [p.108-111].

#### Padrão 2: Gather Common Domain Components (p.112-117, impr. 94-99)
- Funcionalidade de domínio compartilhada (parte da lógica de negócio, comum a alguns processos: notificação, formatação, validação de dados) é distinta de infraestrutura compartilhada (operacional, comum a todos: logging, métricas, segurança) [p.112].
- Consolidar duplicações reduz serviços duplicados; diferenças sutis resolvem-se num único serviço ou biblioteca compartilhada [p.112].
- Pistas de duplicação: classe compartilhada entre componentes (ex.: SMTPConnection usada por 5 classes em namespaces diferentes), herança comum, nomes de componentes semelhantes (Ticket/Billing/Survey Auditing -> penultimate.ss.shared.audit) [p.112-113].
- Nem tudo vira serviço compartilhado: pode virar biblioteca compartilhada em tempo de compilação; prós/contras estão no cap. 8 [p.113].
- Governança majoritariamente manual (subjetiva). Fitness functions de apoio: achar nomes iguais em folhas de namespaces (com arquivo de exclusão para falsos positivos) [p.113-114]; achar arquivos de código comuns entre componentes (também com exclusões) [p.114-115].
- Saga: três componentes de notificação (Customer Notification, Ticket Notify, Survey Notify) foram consolidados em Notification (ss.notification); análise de acoplamento aferente antes (2+2+1 = 5) e depois (CA 5) mostrou que o acoplamento total de entrada não piorou; lição: sempre analisar acoplamento após consolidar, pois consolidar pode aumentar demais as dependências de um só componente [p.115-118].

#### Padrão 3: Flatten Components (p.119-129, impr. 101-111)
- Quando o namespace de um componente é estendido (mais um nó), o anterior deixa de ser componente e vira subdomínio; componente = nó folha (leaf node) do namespace/diretório [p.120].
- Termos: componente (classes em namespace folha com funcionalidade específica); root namespace (nó que foi estendido, também chamado subdomínio); orphaned classes (classes em root namespace, sem componente definível) [p.121].
- Motivo: se ss.survey e ss.survey.templates coexistem, não se sabe se viram um serviço ou dois [p.120].
- Duas formas de achatar: mover o código dos filhos para cima (ss.survey.templates -> ss.survey) ou aplicar decomposição funcional/DDD nas classes órfãs criando novos componentes (ex.: survey.create e survey.process) [p.122-123].
- Código compartilhado órfão em root namespace vai para novo componente folha; recomendação: usar um nome único e inexistente no domínio (.sharedcode, .commoncode) para permitir métricas [p.123-124].
- Métricas de código compartilhado: % de statements em namespaces .sharedcode (ex.: 45% do código sugere que a migração gerará bibliotecas compartilhadas demais e pesadelo de manutenção) e nº de componentes .sharedcode (indica quantas bibliotecas/serviços compartilhados surgirão) [p.124].
- Fitness function: nenhum código em root namespace (alerta de classes órfãs), útil sobretudo durante manutenção paralela à migração [p.125].
- Saga: ss.ticket (45 classes órfãs) dividido em Ticket Shared, Ticket Maintenance, Ticket Completion (Assign e Route mantidos, por complexidade e mudança frequente); ss.survey.templates fundido em ss.survey (raramente muda, simples) [p.125-128].

#### Padrão 4: Determine Component Dependencies (p.129-138, impr. 111-120)
- Perguntas centrais: é viável quebrar? qual o esforço aproximado? será reescrita ou refatoração? [p.129]. Anedota do CIO: golfball, basketball ou airliner [p.130].
- Foco em dependências entre componentes (não entre classes dentro de um componente): dependência existe quando classe de um namespace usa classe de outro; gera Ce no que usa e Ca no usado [p.130-131].
- Interpretação por diagrama de dependências: poucas dependências = golf ball (viável; refatoração); muitas = basketball (talvez viável; mistura de refatorar e reescrever); excesso = airliner (inviável; reescrita total) [p.131-134].
- Visualizações funcionam como "radar" do acoplamento e mostram como seria a matriz de dependências dos serviços; times que pulam para microsserviços sem essa análise sofrem [p.134].
- Analisar Ca, Ce e CT (acoplamento total = Ca + Ce) [p.134]. Quebrar um componente pode reduzir acoplamento: ex. componente A com Ca 20 em que 14 usam só pouca parte; dividir em A1 (14) e A2 (6) [p.134].
- Fitness functions: nenhum componente com mais de N dependências totais (exemplo: 15 considerado relativamente alto; pode ser só entrada, só saída ou ambos); "componente X não deve depender de Y" com ArchUnit, uma função por restrição [p.135-136].
- Saga: diagrama inicial mostrou muitas dependências; Notification era o mais dependido; Ticketing e Reporting tinham muitas internas por causa dos componentes shared (que virarão bibliotecas); filtrando shared, dependências mínimas, aplicação viável [p.136-138].

#### Padrão 5: Create Component Domains (p.138-144, impr. 120-126)
- Relação serviço-componente tende a ser um-para-muitos; objetivo: agrupar componentes em domínios para formar domain services de grão grosso [p.138-139].
- Namespace hierárquico representa domínio (2o nó), subdomínio (3o) e componente (folha) (ex.: ss.customer.billing.payment) [p.139]. Aplicações antigas pré-DDD precisam refatorar namespaces (ex.: ss.billing.payment -> ss.customer.billing.payment) [p.139-140].
- Fitness function: namespaces sob a raiz restritos a uma lista de domínios (ArchUnit) para impedir domínios criados inadvertidamente [p.140-141].
- Saga: com o product owner definiram cinco domínios: Ticketing (inclui survey e KB), Reporting, Customer (perfil, billing, support contract), Admin (usuários, especialistas), Shared (login, notification); validar o agrupamento mostra necessidade de colaboração com stakeholders de negócio, que seria maior se sobrassem componentes sem domínio [p.141]. Renomear ss.expert.profile para ss.admin.experts para evitar subdomínio Expert desnecessário [p.144]. (Tabela 5-18 contém um typo "aa.shared.login" na extração/original; reportado como está.)

#### Padrão 6: Create Domain Services (p.144-148, impr. 126-130)
- Domínios bem formados são extraídos para serviços de domínio separados = service-based architecture; topologia básica: UI acessando remotamente serviços de domínio de grão grosso com um único banco compartilhado [p.144-145]. Outras topologias existem (quebrar UI, quebrar banco, API gateway) [p.144].
- Vantagem de passar por aqui: aprender sobre cada domínio e decidir se vira microsserviços ou fica grosso; erro comum é começar fino demais e arcar com todos os custos de microsserviços (decomposição de dados, workflows distribuídos, transações distribuídas, automação operacional, contêineres) sem necessidade [p.145].
- Conselho: só aplicar o padrão depois que todos os domínios de componentes estiverem identificados e refatorados, senão serviços já migrados precisam ser modificados de novo (ex.: mover Survey para Ticket depois de Ticket service existir) [p.146].
- Fitness function: todos os componentes de um domain service começam com o mesmo namespace (ArchUnit); evita que o serviço vire um monólito sem estrutura [p.147].
- Saga: migração componente a componente, com UI passando a acessar remotamente; resultado: serviços separados por domínio [p.147-148].
- Resumo: migrações "seat-of-the-pants" raramente dão certo; próximos passos: decompor dados (cap. 6) e quebrar domain services em microsserviços (cap. 7) conforme necessário [p.148].
Citações curtas de prova:
- "Components that are too large relative to other components are generally more coupled" [p.102]
- "make sure source code files reside only in leaf node namespaces or directories" [p.123]
- "Too many teams make the mistake of starting out too fine-grained" [p.145]
- "seat-of-the-pants" migration efforts "rarely produce positive results" [p.148]
O que este trecho NÃO diz: não oferece limiares universais (30%/10%/15 dependências são exemplos "dependendo do tamanho"); não cobre extração de dados, comunicação entre os serviços nem sagas; o padrão presume código razoavelmente estruturado e linguagem com namespaces/diretórios; fitness functions em ArchUnit são exemplos em Java (pseudocódigo para outras). Não justifica por que seis passos nessa ordem além da dependência lógica.
Relevância: architecture-hard-parts-expert: ALTA (catálogo dos 6 padrões, métricas de dimensionamento, fitness functions de governança, shared domain vs infra, shared lib vs serviço). software-architecture: ALTA (fluxo "decompor monólito" passo a passo com perguntas de viabilidade golfball/basketball/airliner). clean-architecture/DDD (outras skills): MÉDIA, mapeamento namespace -> domínio/subdomínio/componente.
Decisão sugerida: usar em architecture-hard-parts-expert/references/decomposicao-componentes (novo arquivo com os 6 padrões, métricas e fitness functions) e como etapa do fluxo do grupo software-architecture; exemplos de saga só como ilustração breve.

### Cap. 6: Pulling Apart Operational Data (PDF p.149-154, impr. 131-136) [continua no próximo bloco]
Resumo: Abre o capítulo de decomposição de dados: quebrar banco é mais difícil que quebrar código; apresenta drivers de desintegração (e menciona integradores) e começa com o primeiro driver, controle de mudanças, ligado a bounded context. O bloco termina no meio do tema bounded context/abstração do banco (p.154).
Conceitos e regras:
- Dados são o ativo mais importante e muito acoplados à funcionalidade, então o risco é maior e as costuras são difíceis de achar [p.150].
- Alguns estilos (microsserviços) exigem dados separados (cada serviço dono dos seus dados, bounded context); service-based permite banco compartilhado [p.150].
- Analogias código -> dados: componentes -> data domains; classes -> tabelas; acoplamento entre classes -> chaves estrangeiras, views, triggers, stored procedures [p.150].
- O capítulo promete: drivers, técnicas iterativas, tipos de banco (relacional, grafo, documento, chave-valor, colunar, NewSQL, cloud native) e trade-offs [p.150].
- Data disintegrators (justificam quebrar) vs data integrators (justificam manter junto); equilíbrio entre eles define granularidade de dados [p.150-151].
- Seis disintegrators com a pergunta-guia [p.151]: Change control (quantos serviços são afetados por mudança numa tabela); Connection management (o banco aguenta as conexões de vários serviços); Scalability (o banco escala para a demanda dos serviços); Fault tolerance (quantos serviços caem com queda/manutenção do banco); Architectural quanta (banco único compartilhado me força a um quantum indesejado); Database type optimization (posso otimizar usando vários tipos de banco).
- Change control em detalhe: mudanças que quebram (dropar/renomear tabela ou coluna, mudar tipo) quebram SQL e serviços; adicionar tabelas/colunas geralmente não. Com banco compartilhado, todos os serviços afetados devem ser atualizados, testados e implantados juntos; o perigo real é esquecer um serviço, que fica inoperante em produção até ser redeployado (exemplos de 42 e 400 serviços) [p.152-153]. Mitigação tradicional: análise de impacto e testes de regressão agressivos [p.153].
- Bounded context (de Evans) reduz o problema: código, lógica, estruturas e dados encapsulados num contexto; mudança fica isolada aos serviços do contexto [p.153]. "Dono" do dado = serviço que escreve nele (não só lê); ownership detalhado no cap. 9 [p.153].
- Serviço que precisa de dado de outro contexto não acessa o banco dele diretamente: pede ao serviço dono (técnicas no cap. 10) [p.154].
- Abstração do banco por contrato: o dado enviado (JSON, XML, objeto) pode ter contrato diferente do esquema do banco; mudança quebradora de tabela impacta só o serviço dono, não necessariamente o contrato com quem consome [p.154].
Citações curtas de prova:
- "Breaking apart a database is hard" [p.150]
O que este trecho NÃO diz: conteúdo sobre os outros cinco disintegrators (connection management, scalability, fault tolerance, quanta, database type) está apenas listado aqui; detalhes e os data integrators continuam no próximo bloco; o processo de cinco passos (data domains) apenas é mencionado na saga (p.149), sem detalhes; tipos de banco só anunciados.
Relevância: architecture-hard-parts-expert: ALTA (catálogo de data disintegrators/integrators, change control, contrato como abstração do esquema, ownership = quem escreve). software-architecture: MÉDIA.
Decisão sugerida: usar em architecture-hard-parts-expert/references (dados: drivers de desintegração) quando combinado com o próximo bloco.

## Checklist de cobertura
- Primeira página lida: 78
- Última página lida: 154 (confirmado por Grep: último marcador "=== PDF PAGINA 154 ===")
- Páginas sem texto útil ou ilegíveis: 98 (em branco). Figuras (4-1 a 4-4, 5-1 a 5-22, 6-1 a 6-5) só aparecem como legendas; seu conteúdo visual não foi extraído.
- Problemas de extração observados: tabelas com colunas embaralhadas (Tabelas 5-1 a 5-18); equações de desvio-padrão/média corrompidas (p.106-107); indentação de pseudocódigo perdida e um parêntese/chaves inconsistentes no Exemplo 5-8 (p.135); typo "aa.shared.login" (p.144) e "seceive" (p.128) provavelmente do original; hifenização no meio de palavras.
- Capítulos/seções cobertos integralmente: Cap. 4 (todo), Cap. 5 (todo), final do Cap. 3 (saga do business case).
- Capítulos/seções que continuam em outro bloco: Cap. 3 (início no bloco anterior); Cap. 6 (continua no próximo bloco, parou em bounded context/abstração do banco, p.154).

## Auditoria da skill atual
Material lido: skills/architecture-hard-parts-expert/SKILL.md (185 linhas), references/adr-template.md, references/trade-off-table.md; e as menções à skill em skills/software-architecture/SKILL.md (fluxo "Decomposição de monólito", linha 61: domain-driven-design -> architecture-hard-parts-expert -> clean-architecture-expert -> production-ready-microservices-expert).

### (a) O que a skill afirma e o bloco confirma
- Princípio "toda decisão tem custo / escolher o menos pior": o bloco mostra trade-offs explícitos em cada abordagem (tactical forking: começa rápido, mas código latente e duplicado, p.95-96; service-based: degrau sem quebrar banco, p.90) e ADRs com consequências negativas (p.80, p.97). Confirma o espírito, mas a expressão "menos pior" não aparece no bloco.
- Acoplamento (Ca/Ce) como insumo antes de recomendar arquitetura distribuída: confirmado pelo bloco, com métricas concretas (p.84, 86, 134) e diagramas de dependência para estimar viabilidade (p.131-134). A skill só nomeia acoplamento estático/dinâmico; o bloco é sobre acoplamento estrutural entre componentes (estático) e o confirma como fator decisivo (p.134).
- Forças que favorecem unificação/divisão na granularidade: o bloco confirma que a granularidade deve ser decidida com cuidado e que começar fino demais traz custos de microsserviços sem necessidade (p.145) e que componentes grandes são mais acoplados e menos modulares (p.102). Citação: "Too many teams make the mistake of starting out too fine-grained" [p.145].
- Dados: "dados geralmente vivem mais que sistemas" não é afirmado, mas o bloco confirma que dados são o ativo mais importante e quebrá-los é mais arriscado e mais difícil que quebrar código (p.150). "Nunca assuma banco por serviço é sempre melhor": consistente com o bloco, que diz que microsserviços exigem dados separados mas service-based admite banco compartilhado (p.150) e traz integradores vs desintegradores (p.150-151).
- Fitness Functions e a pergunta "como será governada automaticamente?": fortemente confirmado; o bloco dá uma fitness function por padrão de decomposição (p.105-107, 113-115, 125, 135-136, 140-141, 147), incluindo ArchUnit (p.136, 141, 147). A skill lista só categorias genéricas ("dependências proibidas, ciclos, limites entre bounded contexts", linha 135 do SKILL.md); dependências proibidas e limites de domínio são exatamente os exemplos ArchUnit do bloco.
- ADR (Contexto/Decisão/Consequências): o bloco usa esse formato nas sagas (p.79-80, p.97), confirmando a estrutura. O template da skill acrescenta Alternativas, Status e Fitness Functions, que o bloco não mostra, mas não contradiz.
- Bounded context e dados: o bloco confirma que bounded contexts em torno de serviços e seus dados controlam mudanças (p.153), alinhado com o uso de "limites entre contextos" na skill.
- Evolutionary architecture: o bloco endossa migração incremental e controlada (p.148) e fitness functions durante manutenção concorrente à migração (p.125), compatível com "assuma que requisitos e volume mudarão".

### (b) O que a skill afirma e o bloco contradiz ou não suporta
- "Framework de Decisão" lista "Monólito, Monólito Modular, Microservices, Event-Driven" como alternativas: o bloco trata o caminho monólito -> service-based -> microsserviços e não trata "monólito modular" nem event-driven. Não contradiz, mas o bloco acrescenta service-based como alternativa/degrau e a skill o omite (não é contradição, é lacuna; ver (c)).
- Tabela de trade-off (references/trade-off-table.md) classifica "Evolução Futura" de "Monólito Modular" como "Neutro: pode migrar módulos para serviços depois": o bloco só sustenta isso condicionalmente: migração exige base estruturada (componentes bem definidos, baixo acoplamento) e nada na skill diz como verificar; sem componentes definíveis o bloco indica tactical forking ou até reescrita (p.82-83, 134). Marcar como suposição não suportada sem a verificação de decomponibilidade.
- Exemplo da tabela: "Observabilidade: Microservices ↑ Alto" e "Monólito Observabilidade ↓ Baixo" usa a seta com sentido ambíguo (alto = bom?) e o bloco não trata observabilidade; também "Performance monólito ↑" vs "Resiliência" não são tratados no bloco. Não suportado pelo bloco (não há contradição, mas as setas não têm semântica consistente: "Complexidade ↓ Baixo" é bom, "Observabilidade ↓ Baixo" parece ruim).
- "Princípio do Least Worst" com a equação "Acoplamento ↓ -> Complexidade Operacional ↑": o bloco apoia parcialmente (microsserviços trazem decomposição de dados, workflows distribuídos, transações distribuídas, automação, contêineres: p.145), mas o enunciado "nunca maximize apenas uma característica" não está no bloco.
- "Nunca responda: esta é a melhor solução" e "Estrutura Obrigatória de Resposta" são estilo da skill; o bloco nunca prescreve formato de resposta. Os autores usam "depende" (p.82) e dão recomendações firmes em alguns pontos (ex.: "considerar service-based primeiro como degrau", p.90; "build services from components, not individual classes", p.89; "não aplique Create Domain Services antes de todos os domínios estarem refatorados", p.146), o que mostra que o tom da skill ("Nunca...") é mais absoluto que o livro nesses pontos. Risco de contradição: a skill rejeita qualquer afirmação absoluta, enquanto o livro estabelece regras fortes de método.
- "Rejeite afirmações absolutas como 'DDD é obrigatório'": o bloco não afirma isso, mas recomenda DDD/decomposição funcional para redimensionar componentes e agrupar domínios (p.104, 122, 139); não contradiz.
- "Orquestração vs coreografia", "consistência forte vs eventual", "síncrona vs assíncrona": não aparecem neste bloco (serão de capítulos posteriores); o bloco não confirma nem contradiz. Seção "Comunicação" e "Consistência" da skill não têm suporte neste bloco.
- Fluxo "Decomposição de monólito" do grupo software-architecture (domain-driven-design -> hard-parts -> clean-architecture -> production): não contradito, mas a ordem pressupõe que decompor começa por contextos DDD; o bloco começa por (1) verificar decomponibilidade com métricas, (2) escolher forking vs componentes, (3) seis padrões de componentes antes de definir domínios (domínios saem do agrupamento de componentes validado com o product owner, p.141) e só então dados (cap. 6). A ordem de roteamento do grupo não cobre esses passos.

### (c) O que o bloco traz e a skill não cobre
Todos os itens abaixo estão ausentes do SKILL.md e dos dois references:
1. Decomposição de monólito (cap. 4-5), nada disso na skill:
   - Antipadrão Elephant Migration / monólito distribuído (p.82).
   - Árvore de decisão: decomponível? -> estruturado? -> tactical forking vs component-based decomposition (p.82-83).
   - Verificação de decomponibilidade: Big Ball of Mud, Ca/Ce, Abstractness, Instability, Distance from the Main Sequence, zonas de dor e inutilidade (p.83-88).
   - Tactical forking (passos, benefícios, desvantagens: p.91-96).
   - Service-based architecture como destino ou degrau, com 4 motivos (p.90, p.145).
   - Seis padrões component-based: Identify and Size, Gather Common Domain, Flatten, Determine Dependencies, Create Component Domains, Create Domain Services (p.100-148), com ordem e advertência de não extrair antes de refatorar todos os domínios (p.146).
2. Métricas e heurísticas quantitativas: tamanho por statements, percentual, 1-2 desvios-padrão (p.102-103); limiares de exemplo (30% para 10 componentes, 10% para 50; 3 desvios; 15 dependências totais; p.106-107, 135); % de código .sharedcode (45% como alerta) e contagem de componentes shared (p.124); golfball/basketball/airliner (p.130-134).
3. Fitness functions concretas para decomposição, em catálogo de 9 (inventário, % máximo, desvios-padrão, nomes folha repetidos, código comum, nada em root namespace, máximo de dependências, proibição X->Y, domínios permitidos, namespace único por serviço; p.105-147) com uso de ArchUnit. A skill só tem o conceito.
4. Shared domain vs shared infrastructure; shared library vs shared service (p.112-113) e a necessidade de re-medir acoplamento após consolidar (p.117).
5. Artefatos de processo: architecture stories (diferença para technical debt stories: p.102); uso de saga/ADR com consequências incluindo custo e atraso (p.80, p.97); alinhar business case a drivers (testability, deployability, fault tolerance, scalability: p.78-79).
6. Dados (início do cap. 6): analogia componente->data domain, classe->tabela, acoplamento->FK/view/trigger/stored procedure (p.150); catálogo de seis data disintegrators com perguntas-guia e o conceito de data integrators (p.151); change control (mudanças quebradoras vs aditivas, serviços esquecidos, p.152-153); definição de "dono" = quem escreve (p.153); acesso a dado de outro contexto via serviço dono e contrato diferente do esquema (abstração, p.154). A skill diz só "avalie volume, consistência, autonomia, reporting, regulatório" e não tem integrators/disintegrators, quanta, nem ownership.
7. Architectural quanta aparece como driver (p.151); a skill não usa o conceito. (Definição formal provavelmente em bloco anterior; não confirmada neste bloco.)
8. Seleção de tipo de banco (relacional, grafo, documento, chave-valor, colunar, NewSQL, cloud native) é anunciada (p.150) mas o conteúdo está no próximo bloco.

Candidatos de melhoria sugeridos (ordem de valor):
- Novo references em architecture-hard-parts-expert: decomposicao-monolito.md (árvore de decisão, métricas, tactical forking, service-based como degrau, 6 padrões, fitness functions, architecture stories). Atualizar SKILL.md com 1-3 linhas e link; respeitar limite de 500 linhas (SKILL.md está em 185).
- Novo references: dados-drivers-decomposicao.md (disintegrators/integrators, change control, bounded context por escrita) após ler o próximo bloco.
- Atualizar o grupo software-architecture: fluxo de decomposição de monólito com etapas (decomponível? -> escolha forking/componentes -> padrões -> domínios -> dados) e roteamento de palavras-chave ("big ball of mud", "tactical forking", "service-based", "distribuído monolito").
- Ajustar references/trade-off-table.md: dar semântica às setas (bom/ruim) e acrescentar service-based como alternativa e a pré-condição de decomponibilidade.
- Neutralidade: ArchUnit é biblioteca Java, não nome de ferramenta de IA; pode ser citada.
- ADR: adicionar exemplo com consequências de custo/atraso e vínculo a drivers (p.79-80).
