# Notas: Arquitetura Limpa (Robert C. Martin), bloco 03 (PDF p.165-246)

Observação geral: o texto extraído não mostra números impressos de página; todas as páginas abaixo são "PDF PAGINA N". Os capítulos 14 a 17 estão completos neste bloco; o capítulo 13 termina na p.165 (continua do bloco anterior) e o capítulo 18 começa na p.244 e é truncado na p.246 (continua no próximo).

### Cap. 13 (final): Coesão de componentes, conclusão (PDF p.165) [continua do bloco anterior]
Resumo: o trecho final discute como a estrutura de componentes muda com a maturidade do projeto e fecha o capítulo dizendo que coesão é mais complexa do que "um módulo faz uma só coisa".
Conceitos e regras:
- A estrutura de componentes de um projeto varia com o tempo e a maturidade; reflete mais o modo de desenvolvimento e uso do que a função real do sistema [p.165].
- Os três princípios de coesão (REP, CCP, CRP) descrevem uma coesão mais complexa que a antiga ideia "módulo = uma função"; ao agrupar classes é preciso equilibrar forças opostas de reutilização e desenvolvimento [p.165].
- Esse equilíbrio é dinâmico: o particionamento adequado hoje pode não servir no ano seguinte, à medida que o foco passa de desenvolvimento para reutilização [p.165].
Citações curtas de prova:
- "esse equilíbrio é quase sempre dinâmico" [p.165]
O que este trecho NÃO diz: não reexplica REP/CCP/CRP (estão no bloco anterior).
Relevância: clean-architecture-expert: MÉDIA, reforça que particionamento de componentes evolui. Decisão sugerida: usar como nota de contexto em referência de componentes.

### Cap. 14: Acoplamento de componentes (PDF p.166-193)
Resumo: três princípios (ADP, SDP, SAP) tratam das relações entre componentes, com métricas de estabilidade (I), abstração (A) e distância da Sequência Principal (D). A tensão central é entre capacidade de desenvolvimento e design lógico; a estrutura de componentes é um mapa de build e manutenção, não uma decomposição funcional.

**ADP: Princípio das Dependências Acíclicas (p.166-176)**
Conceitos e regras:
- Regra: não permitir ciclos no grafo de dependência dos componentes [p.166].
- Problema: "síndrome da manhã seguinte", em que o trabalho de um desenvolvedor quebra porque outro mudou algo do qual ele dependia; piora com o tamanho do projeto e da equipe [p.167].
- Duas soluções históricas: o "build semanal" e o ADP [p.167]. O build semanal isola desenvolvedores por 4 dias e integra na sexta; o custo de integração cresce, a integração começa a invadir sábados, o ciclo é encurtado/alongado e a equipe perde feedback rápido [p.167-168].
- Solução do ADP: particionar o ambiente em componentes liberáveis (releases numerados, publicados em diretório); cada equipe decide quando adotar um novo release; integração em pequenos incrementos [p.169-170].
- Para funcionar, a estrutura de dependências deve ser gerenciada e sem ciclos; o grafo é um DAG (grafo acíclico direcionado) [p.170].
- Exemplo (Fig. 14.1): liberar Presenters afeta quem depende dele (View, Main); liberar Main não afeta ninguém; testar Presenters exige só Interactors e Entities; o release do sistema inteiro ocorre de baixo para cima (Entities, depois Database e Interactors, depois Presenters/View/Controllers/Authorizer, por fim Main) [p.171].
- Efeito de um ciclo (Fig. 14.2): se User (Entities) passa a usar Permissions (Authorizer), Entities, Authorizer e Interactors viram na prática um único grande componente; Database precisa ser compatível com todos; testar Entities obriga a buildar Authorizer e Interactors [p.172-173].
- Ciclos dificultam isolar componentes, testes de unidade e liberação; problemas de build crescem geometricamente com o número de módulos; pode não haver ordem de build correta (problema em Java, que lê declarações de binários compilados) [p.173].
- Quebrar ciclo, mecanismo 1: aplicar DIP, criando interface em Entities com os métodos que User precisa e implementando-a em Authorizer, o que inverte a dependência [p.174].
- Quebrar ciclo, mecanismo 2: criar novo componente do qual ambos dependem e mover para ele as classes comuns (Fig. 14.4) [p.174].
- A segunda solução implica que a estrutura de componentes é volátil frente a mudanças de requisitos; a dependência deve ser monitorada continuamente por ciclos e, às vezes, isso significa criar novos componentes [p.175].
- Design top-down não serve para a estrutura de componentes: ela não é projetada primeiro, evolui com o sistema [p.175]. Diagramas de dependência de componentes pouco descrevem a função da aplicação; são um mapa de facilidade de build e manutenção, por isso não existem no início [p.176].
- Preocupação central dessa estrutura: isolar volatilidade; mudanças cosméticas na GUI ou em relatórios não devem afetar regras de negócio; o grafo é moldado pelos arquitetos para proteger componentes estáveis e de alto valor dos voláteis [p.176-177].
- Sequência de influências: SRP e CCP primeiro (agrupar o que muda junto); depois CRP quando surge reutilização; depois ADP quando surgem ciclos. Projetar a estrutura antes das classes provavelmente fracassaria (não se conhece fechamento comum nem reutilização, e surgem ciclos) [p.177].
Citações curtas de prova:
- "a estrutura de componentes não pode ser projetada de cima para baixo" (paráfrase próxima do texto) [p.175]
- "síndrome da manhã seguinte" [p.167]

**SDP: Princípio das Dependências Estáveis (p.177-184)**
Conceitos e regras:
- Regra: dependa na direção da estabilidade [p.177]. Um componente difícil de mudar não deve depender de componente esperado como volátil, senão o volátil também fica difícil de mudar; uma dependência adicionada por outra pessoa pode tornar rígido um módulo projetado para ser flexível sem alterar uma linha dele [p.177-178].
- Estabilidade = quantidade de trabalho necessária para mudar (analogia da moeda em pé x mesa), não frequência de mudança [p.178-179]. Forma segura de tornar um componente estável: muitos dependerem dele; ele é então "responsável" e, se não depende de nada, "independente" [p.179]. Um componente que ninguém usa e que depende de vários é "irresponsável" e "dependente" (instável) [p.179].
- Métricas: Fan-in (classes de fora que dependem de classes do componente), Fan-out (classes de dentro que dependem de classes de fora), I = Fan-out / (Fan-in + Fan-out), variando de 0 (estabilidade máxima) a 1 (instabilidade máxima) [p.180]. Exemplo: Cc com Fan-in 3 e Fan-out 1 tem I = 1/4 [p.181]. Em C++ conta-se #include; em Java, import e nomes qualificados; é mais fácil com uma classe por arquivo [p.181].
- SDP formal: a métrica I de um componente deve ser maior que a dos componentes de que ele depende; I deve diminuir na direção da dependência [p.182].
- Nem todos os componentes devem ser estáveis (sistema imutável); o desejável é ter instáveis no topo dependendo de estáveis abaixo; convenção: instáveis no topo do diagrama, de modo que qualquer seta para cima viola SDP (e ADP) [p.182].
- Violação (Fig. 14.9): Stable passa a depender de Flexible; correção por DIP: criar interface (US) em componente separado (UServer, I = 0) implementada por C em Flexible; ambos dependem de UServer e as dependências fluem para I decrescente [p.183-184].
- Componentes abstratos (só interfaces, sem código executável) são comuns e necessários em linguagens estaticamente tipadas (Java, C#); em linguagens dinâmicas (Ruby, Python) não existem, e as estruturas de dependência são mais simples porque inversão não exige declarar interfaces [p.184].
Extração: o texto usa "UService" e "UServer" para o mesmo componente (inconsistência do original ou da extração) [p.184].

**SAP: Princípio de Abstrações Estáveis (p.184-192)**
Conceitos e regras:
- Regra: um componente deve ser tão abstrato quanto estável [p.184]. Políticas de alto nível e decisões arquiteturais devem ficar em componentes estáveis (I = 0); componentes instáveis (I = 1) contêm só código volátil [p.184-185].
- Para que componentes estáveis não engessem a arquitetura, eles devem ser abstratos (OCP: estender sem modificar); estável implica interfaces e classes abstratas; instável deve ser concreto [p.185-186].
- SAP + SDP = DIP aplicado a componentes: dependências apontam na direção da abstração. Diferença: DIP trata classes (abstrata ou não), SAP/SDP permitem componente parcialmente abstrato e parcialmente estável [p.186].
- Métrica A = Na / Nc (classes abstratas e interfaces sobre total de classes), de 0 a 1 [p.186-187].
- Gráfico A (vertical) x I (horizontal): pontos "bons" em (0,1) abstrato e estável e (1,0) concreto e instável; classe abstrata que deriva de outra abstrata tem dependência e perde estabilidade máxima [p.187-188].
- Zona da Dor: perto de (0,0), estável e concreto, rígido; exemplos: esquema de banco de dados (volátil, concreto, muito referenciado) e bibliotecas de utilitários concretas; só é problemática se o componente for volátil (String não é volátil, logo inofensivo); a volatilidade é um terceiro eixo [p.188-189].
- Zona da Inutilidade: perto de (1,1), abstração máxima sem dependentes; detrito, tipicamente classes abstratas que ninguém implementou [p.189].
- Sequência Principal: linha de (1,0) a (0,1); componentes ali não são "abstratos demais" nem "instáveis demais"; extremidades são as posições mais recomendadas, e os demais devem ficar sobre ou perto da linha [p.190].
- D = |A + I - 1|, de 0 (na sequência) a 1 (máxima distância); componentes com D longe de zero devem ser reexaminados e reestruturados [p.190-191]. Análise estatística: média e variância de D devem ficar próximas de zero; variância define "limites de controle" para outliers (Fig. 14.14, Z = 1); gráfico de D por release com limite de controle (exemplo D = 0.1, componente Payroll, release R2.1) [p.191-192].
- Ressalva do autor: métrica "não é um deus", mede contra padrão arbitrário e imperfeito [p.192].
Extração: fórmulas de divisão aparecem com vírgula ("Fan-out , (Fan-in + Fan-out)"); "Fan-out 7 0" e "Fan-in 7 0" significam > 0; a figura de zonas aparece citada como "Figura 11.13" no texto e é 14.13 [p.180,181,188].
Nota de rodapé: o autor antes chamava Fan-in/Fan-out de Ca/Ce (aferente/eferente) e D de D' [p.193].
O que este trecho NÃO diz: não dá limiares numéricos além do exemplo D = 0.1; não indica ferramentas de medição; não liga essas métricas a camadas da arquitetura limpa (isso vem em outros capítulos).
Relevância: clean-architecture-expert: ALTA (princípios de componentes ADP/SDP/SAP, métricas I/A/D, como quebrar ciclos); testing-tdd-expert: MÉDIA (ciclos inviabilizam teste de unidade isolado, p.172-173); clean-code-expert: BAIXA.
Decisão sugerida: usar em clean-architecture-expert/references (novo arquivo de princípios de componentes e métricas) e criar checklist de revisão de dependências entre módulos.

### Cap. 15: O que é arquitetura? (PDF p.195-210)
Resumo: define arquitetura como a forma dada ao sistema (componentes, organização, comunicação) para facilitar desenvolvimento, implantação, operação e manutenção, deixando o máximo de opções abertas pelo máximo de tempo. Separa política (regras de negócio, valor real) de detalhes (IO, banco, web, frameworks) e ilustra com duas histórias antigas do autor.
Conceitos e regras:
- Um arquiteto continua programador e vivencia os problemas que cria para os demais [p.196].
- Definição: arquitetura é a forma dada ao sistema pelos criadores, na divisão em componentes, na organização e na comunicação entre eles; o propósito é facilitar desenvolvimento, implantação, operação e manutenção; a estratégia é deixar o máximo de opções abertas, pelo máximo de tempo [p.196].
- Arquitetura pouco influencia o funcionamento; seu papel no comportamento é "passivo e estético"; o propósito primário é suportar o ciclo de vida, minimizando o custo de vida útil e não maximizando a produtividade do programador [p.197].
- Desenvolvimento: equipe pequena pode seguir monolítico sem componentes definidos (e por isso muitos sistemas nascem sem arquitetura); cinco equipes de sete exigem componentes bem definidos com interfaces estáveis, tendendo a um componente por equipe, o que não é ótimo para implantação, operação e manutenção [p.197-198].
- Implantação: objetivo é implantar com uma única ação; estratégia de deployment raramente é considerada no início; exemplo de microsserviços escolhidos cedo que ficam difíceis de implantar (muitas conexões, tempo de inicialização); alternativa: menos serviços, híbrido de serviços e componentes in-process [p.198-199].
- Operação: impacto da arquitetura é menos dramático; dificuldades operacionais quase sempre se resolvem com mais hardware (hardware barato, pessoas caras); a arquitetura deve revelar a operação, elevando casos de uso, recursos e comportamentos a entidades de primeira classe [p.199-200].
- Manutenção: é o aspecto mais caro; custo primário é exploração e risco; separar em componentes isolados por interfaces estáveis identifica caminhos para novos recursos e reduz risco de quebra [p.200-201].
- Software tem dois valores: comportamento e estrutura; o segundo é maior porque torna o software "soft" [p.201].
- Todo sistema se decompõe em política (regras e procedimentos de negócio, onde está o valor) e detalhes (IO, banco, web, servidores, frameworks, protocolos, que não afetam o comportamento da política); o objetivo do arquiteto é uma forma que torne os detalhes irrelevantes e permita adiar decisões [p.201-202].
- Exemplos do que adiar: banco de dados, servidor web, REST, frameworks de microsserviços/SOA, framework de injeção de dependência; adiar dá mais informação, permite experimentar vários bancos/frameworks [p.202-203].
- Se a decisão já foi tomada por outros, o bom arquiteto age como se pudesse ser adiada ou mudada; "maximizar o número de decisões não feitas" [p.203].
- História de independência de dispositivo (anos 60): código ligado direto a leitoras/furadoras de cartão teve que ser reescrito para fita magnética; o sistema operacional passou a abstrair dispositivos em registros de unidade; mesmo programa lia/escrevia cartões ou fita [p.203-206]. Autor associa isso ao nascimento do Princípio Aberto/Fechado [p.206].
- Mala direta (fim dos 60): programas escritos sobre abstrações IO permitiram trocar impressora de linha por fita magnética e imprimir em impressoras offline, dando grande valor; a forma do programa separou política (formatar nome e endereços) de detalhe (dispositivo) [p.206-207].
- Endereçamento físico (anos 70): código com cilindro/cabeça/setor espalhado nas regras de negócio impediria trocar de disco; solução: tratar o disco como array linear de setores e uma rotina de conversão; política de alto nível agnóstica à estrutura física do disco [p.208-209].
- Conclusão: bons arquitetos separam os detalhes da política e desacoplam tanto que a política não tem conhecimento dos detalhes nem depende deles [p.209-210].
Citações curtas de prova:
- "A estratégia por trás dessa facilitação é deixar o máximo possível de opções abertas, pelo máximo de tempo possível." [p.196] (22 palavras)
- "Um bom arquiteto deve maximizar o número de decisões não feitas." [p.203]
- "A arquitetura deve revelar a operação." [p.200]
O que este trecho NÃO diz: não prescreve as camadas concretas (isso vem em capítulos posteriores); afirma que a arquitetura influencia pouco o comportamento (tese discutível, mas é a do autor).
Relevância: clean-architecture-expert: ALTA (definição, política x detalhes, adiar decisões); testing-tdd-expert: BAIXA; clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (mentalidade e referência de "arquitetura como adiamento de decisões").

### Cap. 16: Independência (PDF p.211-224)
Resumo: uma boa arquitetura suporta casos de uso, operação, desenvolvimento e implantação, equilibrando-os ao deixar opções abertas. Desacopla camadas horizontais e casos de uso verticais, trata duplicação falsa e discute modos de desacoplamento (fonte, implantação, serviço).
Conceitos e regras:
- Casos de uso: a primeira prioridade; a arquitetura deve expor a intenção do sistema, de modo que um sistema de carrinho "pareça" carrinho de compras, com comportamentos como elementos de primeira classe (classes, funções ou módulos proeminentes e bem nomeados) [p.212]. Remete ao Cap. 21 (Arquitetura Gritante) [p.212].
- Operação: a arquitetura deve suportar a taxa de transferência e o tempo de resposta exigidos; opções: array de serviços, threads leves, poucos processos, ou monolito; um sistema dependente da estrutura monolítica não migra facilmente para múltiplos processos/serviços, enquanto componentes isolados que não supõem o meio de comunicação adaptam-se ao espectro threads/processos/serviços [p.212-213].
- Desenvolvimento: lei de Conway (estrutura do sistema copia a estrutura de comunicação da organização); com muitas equipes, particionar em componentes independentemente desenvolvíveis e bem isolados [p.213-214].
- Implantação: objetivo é "implantação imediata" sem dúzias de scripts, ajustes de propriedades ou criação manual de diretórios; viabilizada por particionamento e isolamento, incluindo componentes principais (main) que ligam o sistema [p.214].
- Equilibrar tudo isso é difícil porque casos de uso, restrições operacionais, estrutura de equipe e requisitos mudam; princípios baratos ajudam a particionar em componentes isolados e manter opções abertas [p.215].
- Desacoplando camadas: aplicar SRP e CCP, separando o que muda por razões diferentes: UI, regras de negócio específicas da aplicação (ex.: validação de campos de entrada), regras de negócio independentes da aplicação/do domínio (ex.: juros de conta, contagem de inventário), banco/linguagem de consulta/esquema [p.215-217]. Resultado: camadas horizontais desacopladas [p.216-217].
- Desacoplando casos de uso: casos de uso (ex.: addOrder x deleteOrder) mudam em ritmos diferentes; são fatias verticais finas que cruzam todas as camadas; separar UI, regras e banco por caso de uso permite adicionar casos sem interferir nos antigos [p.217].
- Modo de desacoplamento serve à operação: componentes que rodam em servidores separados não podem depender do mesmo espaço de endereço, devem ser serviços que se comunicam por rede; o autor não defende SoA/microsserviços como melhor arquitetura, só que às vezes é preciso chegar ao nível de serviço [p.218-219].
- Desenvolvimento independente: se camadas e casos de uso estão desacoplados, as equipes podem se organizar por recursos, componentes ou camadas; implantação independente: adicionar caso de uso tão simples quanto adicionar um jar ou serviço [p.219].
- Duplicação: verdadeira (toda mudança numa instância exige a mesma nas réplicas) x falsa/acidental (evoluem por caminhos e ritmos diferentes); telas similares de casos de uso distintos provavelmente são duplicação acidental; resistir à "eliminação automática da duplicação" e verificar se é real [p.220-221].
- Entre camadas: passar o registro de banco direto à UI em vez de criar um modelo de visão (view model) é tentação de duplicação acidental; criar o modelo de visão custa pouco e mantém camadas desacopladas [p.221].
- Três modos de desacoplamento: nível de fonte (módulos de código no mesmo espaço de endereço, chamadas de função, monolito; ex.: Ruby Gems) [p.221]; nível de implementação/implantação (unidades implantáveis como jar, DLL, Gem, bibliotecas compartilhadas; componentes podem estar em processos distintos com IPC, sockets, memória compartilhada) [p.221-222]; nível de serviço (só estruturas de dados por pacotes de rede, cada unidade independente de mudanças binárias e de fonte) [p.222].
- O melhor modo é difícil de definir cedo e muda com a maturidade; "desacoplar no nível de serviço por padrão" é caro, estimula granulação grossa e desperdiça esforço em fronteiras desnecessárias [p.222-223].
- Abordagem preferida do autor: começar desacoplando no nível de fonte, mover para implantação se surgirem problemas e promover a serviços unidades selecionadas conforme problemas de desenvolvimento, implantação e operação crescem; manter componentes no mesmo espaço de endereço pelo maior tempo possível [p.223]. Demandas podem diminuir e permitir a reversão [p.224].
- Uma boa arquitetura deve permitir nascer como monolito, crescer para unidades independentes/serviços e voltar ao monolito, protegendo a maior parte do código dessas mudanças; o modo de desacoplamento é opção a manter aberta e provavelmente mudará [p.224].
Citações curtas de prova:
- "Resista à tentação de cometer o pecado da eliminação automática da duplicação." [p.220-221] (11 palavras)
- "Uma boa arquitetura faz com que o sistema seja fácil de mudar, de todas as formas necessárias, ao deixar as opções abertas." [p.215]
O que este trecho NÃO diz: não prescreve quando exatamente promover a serviço, nem lista sinais objetivos; não detalha como organizar pastas por caso de uso (cap. 21).
Relevância: clean-architecture-expert: ALTA (camadas x fatias verticais, duplicação falsa, view model, modos de desacoplamento monolito-primeiro); software-architecture / architecture-hard-parts-expert: MÉDIA (trade-off de serviços prematuros); testing-tdd-expert: BAIXA; clean-code-expert: BAIXA (duplicação acidental nuança o DRY).
Decisão sugerida: usar em clean-architecture-expert (nova seção sobre desacoplamento vertical/horizontal, duplicação verdadeira x acidental e modos de desacoplamento); sugerir a software-architecture a regra "não começar por serviços".

### Cap. 17: Fronteiras, estabelecendo limites (PDF p.225-243)
Resumo: arquitetura é a arte de traçar fronteiras para adiar decisões prematuras (framework, banco, web, DI) e impedir que contaminem o núcleo. Histórias de fracasso (empresas P e W) e sucesso (FitNesse), regra de onde traçar limites e o modelo de arquitetura plug-in.
Conceitos e regras:
- Fronteiras separam elementos de software e impedem que um lado conheça o outro; algumas são definidas antes de qualquer código [p.225]. O que prejudica minimizar recursos humanos é o acoplamento, em especial a decisões prematuras; decisões prematuras são as que não têm relação com os requisitos de negócio (casos de uso): framework, banco, servidor web, bibliotecas utilitárias, injeção de dependência [p.226].
- Empresa P: arquitetura de três camadas distribuída decidida cedo, com cada objeto de domínio em três instâncias, serialização e mensagens entre camadas; adicionar um campo exigia mudar três executáveis, quatro mensagens e oito handlers; nunca vendeu um sistema que exigisse fazenda de servidores, e tudo rodava em um único servidor. Nota: três camadas é topologia, não arquitetura, e é o tipo de decisão que a boa arquitetura adia [p.226-228, nota p.243].
- Empresa W: "Arquiteto" impôs arquitetura orientada a serviços com serviços para objetos de domínio (ServiceRegistry, ContactService, mensagens CreateContact/UpdateContact com dúzias de campos); testar exigia subir todos os serviços, message bus e servidor BPEL, com delays de propagação; acoplamento entre serviços e WSDLs a cada recurso novo. O erro foi a adoção prematura de um conjunto massivo de serviços de objetos de domínio, não os serviços em si [p.229-230].
- FitNesse (sucesso): regra "Baixe e Vá"; escreveram o próprio servidor web simples para adiar a escolha de framework web [p.230-231]. Decidiram evitar pensar no banco: interface WikiPage com métodos de acesso, MockWikiPage por três meses, depois InMemoryPage por cerca de um ano, depois FileSystemWikiPage; decisão pelo MySQL foi adiada até deixar de existir; um cliente depois escreveu MySqlWikiPage em um dia; a opção acabou removida por falta de uso [p.231-233].
- Benefícios relatados: 18 meses sem problemas de esquema, consulta, senha, conexão; testes rápidos por não haver banco; capacidade de mudar de direção sem impedir a rota original [p.233-234].
- Onde traçar limites: entre coisas que importam e coisas que não importam: GUI x regras de negócio, banco x GUI, banco x regras de negócio [p.234]. O banco é ferramenta que as regras usam indiretamente; regras precisam saber só que há funções para buscar e salvar dados, logo o banco fica atrás de uma interface [p.234-235].
- Direção do limite (Fig. 17.1-17.3): BusinessRules usa DatabaseInterface; DatabaseAccess implementa; a interface vive no componente BusinessRules e a implementação em Database; a seta de dependência aponta de Database para BusinessRules; Database contém o código de tradução que conhece as regras; assim BusinessRules aceita Oracle, MySQL, Couch, Datomic ou arquivos [p.235-238].
- IO é irrelevante: a GUI não é o sistema; o modelo (regras) existiria sem interface (exemplo do videogame); GUI depende de BusinessRules e pode ser substituída por qualquer interface [p.238-239]. O componente menos relevante depende do mais relevante [p.238].
- Arquitetura plug-in: UI e banco tratados como plug-ins das regras centrais; permite múltiplas UIs (web, cliente/servidor, console) e bancos (SQL, NoSQL, arquivos); trocas podem não ser triviais (ex.: rever comunicações regras-UI ao mudar de web para cliente/servidor), mas a estrutura as torna viáveis [p.239-240].
- Argumento do plug-in (ReSharper x Visual Studio): relação assimétrica, o ReSharper depende do Visual Studio; deseja-se a mesma assimetria entre módulos, com regras de negócio imunes a mudanças de página web ou esquema; plug-ins criam firewalls contra propagação de mudanças [p.241-242].
- Critério para limites: onde há um eixo de mudança, ou seja, componentes de cada lado mudam em ritmos e por razões diferentes; "isso é o SRP de novo"; GUI e regras mudam em momentos distintos; regras e frameworks de DI também [p.242].
- Conclusão: particionar em núcleo de regras e plug-ins; setas apontando em uma única direção, na direção do negócio central; aplicação de DIP e SAP: dependências dos detalhes de baixo nível para as abstrações de alto nível [p.242-243].
Citações curtas de prova:
- "Estabeleça limites entre coisas que importam e coisas que não importam." [p.234]
- "IO é irrelevante." (paráfrase do texto "IO3 é irrelevante") [p.238]
- "Os limites devem ser estabelecidos onde houver um eixo de mudanças." [p.242]
O que este trecho NÃO diz: não apresenta ainda o diagrama de camadas concêntricas nem a Dependency Rule nomeada; não define Casos de Uso/Entidades como camadas; não trata de como passar dados pela fronteira (começa no cap. 18, truncado).
Relevância: clean-architecture-expert: ALTA (limites, direção das setas, banco e UI como plug-ins, decisões prematuras, interface do repositório no lado do domínio); testing-tdd-expert: MÉDIA (Mock/InMemory antes do banco, testes rápidos, p.231-234); architecture-hard-parts / software-architecture: MÉDIA (casos P e W como anti-exemplos de decisão prematura); clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (limites, plug-in, adiar decisões, estratégia de dublês e implementação em memória) e em testing-tdd-expert (estratégia de testes sem banco).

### Cap. 18: Anatomia do limite (PDF p.244-246) [continua no próximo bloco]
Resumo: começa a descrever as formas de limite e como o cruzamento é, em tempo de execução, uma chamada de função com dados; o ponto crítico são as dependências de código-fonte. Trecho truncado na p.246 no meio da Figura 18.1 e do caso de dependência invertida.
Conceitos e regras:
- Arquitetura é definida por componentes e pelos limites que os separam [p.244].
- Em tempo de execução, cruzar limite é uma função de um lado chamando função do outro e passando dados; o essencial é gerenciar dependências de código-fonte, porque mudança num módulo pode forçar mudança, recompilação ou reimplantação de outros; limites constroem firewalls contra isso [p.244-245].
- O "temido monolito": limite mais simples e comum, sem representação física restrita; separação disciplinada de funções e dados em um único processador e espaço de endereço (desacoplamento em nível de fonte); implantação como um único executável (C/C++ estático, jar executável, binários .NET em um .EXE); limites existem e importam mesmo invisíveis, pela capacidade de desenvolver e montar componentes independentemente [p.245].
- Essas arquiteturas dependem de polimorfismo dinâmico para tratar dependências internas; esta é uma razão da importância da OO; sem ela, restaria o uso arriscado de ponteiros para funções, e muitos arquitetos abririam mão do particionamento [p.245-246].
- Cruzamento mais simples: cliente de nível baixo chama serviço de nível alto; dependência em tempo de execução e de compilação apontam na mesma direção, para o componente de nível mais alto; a definição de Data fica do lado chamado [p.246].
- Quando um cliente de alto nível precisa invocar um serviço de baixo nível, usa-se polimorfismo dinâmico para inverter a dependência contra o fluxo de controle (frase truncada no fim do bloco) [p.246].
O que este trecho NÃO diz: ainda não cobre limites de processo, de serviço, threads nem comunicação local, que vêm no bloco seguinte.
Relevância: clean-architecture-expert: ALTA (cruzamento de limite e inversão por polimorfismo), a completar no próximo bloco.
Decisão sugerida: usar em clean-architecture-expert, junto com o bloco seguinte.

## Checklist de cobertura
- Primeira página lida: 165
- Última página lida: 246 (confirmada: último marcador `=== PDF PAGINA 246 ===`)
- Páginas sem texto útil ou ilegíveis: p.193 (apenas notas de rodapé; registradas), p.194 (apenas título da Parte V "Arquitetura"), p.210 e p.211 curtas (fim do cap. 15 e abertura do cap. 16), p.231 e p.243 parcialmente notas de rodapé.
- Problemas de extração observados: títulos de caixas em MAIÚSCULAS com quebras de linha extras; divisão "/" rendida como vírgula nas fórmulas (I, A); ">" rendido como "7" ("Fan-out 7 0"); referência "Figura 11.13" que deve ser 14.13; "UService"/"UServer" alternando; ligaduras "ﬁ" mantidas; figuras não disponíveis (só legendas).
- Capítulos/seções cobertos integralmente: 14 (Acoplamento de componentes), 15 (O que é arquitetura?), 16 (Independência), 17 (Fronteiras), parte V (abertura).
- Capítulos/seções que continuam em outro bloco: 13 (início está no bloco anterior; aqui só o final), 18 (continua no próximo).

## Auditoria da skill atual
