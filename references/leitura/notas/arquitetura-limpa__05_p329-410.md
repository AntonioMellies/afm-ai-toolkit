# Notas: Arquitetura Limpa (Robert C. Martin), bloco 05, PDF p.329-410

Observação geral: o texto não traz números de página impressos legíveis; só os marcadores PDF. Os capítulos aparecem com o número impresso no topo (ex.: "29", "30").

### Cap. 29 - Arquitetura Limpa Embarcada (PDF p.329-351)
Resumo. O autor, partindo de uma frase de Doug Schmidt, redefine "firmware" como código cuja vida útil é limitada pela dependência de hardware (não pelo local de armazenamento). Defende estruturar software embarcado em camadas (software / firmware / hardware) com abstrações (HAL, PAL, OSAL) para que o código de negócio seja testável fora do alvo e sobreviva à troca de hardware, processador e SO. Fecha com compilação condicional como violação de DRY.
Conceitos e regras:
- Firmware, no sentido do autor, não é o que está em ROM: é código preso à evolução do hardware e difícil de mudar por causa disso [p.331]
- Software não embarcado também "escreve firmware": SQL enterrado no código, dependências de plataforma espalhadas, lógica de negócio não separada da API Android [p.331]
- Exemplo de legado: o código do produto antigo era a única especificação do novo; TDM misturada à lógica de chamadas; o produto inteiro virou firmware [p.332]
- Exemplo: o despachador de mensagens residia no mesmo arquivo do código que fala com o hardware UART, impedindo que virasse software de vida longa [p.332-333]
- Três atividades de Kent Beck citadas: fazer funcionar, arrumar (refatorar para entendimento), aumentar a velocidade (desempenho "necessário") [p.333-334]
- "Teste de App-tidão": quem só se preocupa em fazer o app funcionar presta desserviço ao produto e ao empregador; vale para embarcado e não embarcado [p.334]
- Exemplo de arquivo único de sistema embarcado com funções misturadas (lógica de domínio, config de plataforma, botão On/Off, persistência em flash, uma função cujo nome não condiz com o que faz) e dependência de toolchain/microprocessador; só testável no alvo [p.334-336]
- Gargalo do hardware-alvo: se o código só pode ser testado no alvo, o desenvolvimento atrasa; o hardware pode não existir ainda ou ter defeitos [p.336-337]
- "Uma arquitetura limpa embarcada é uma arquitetura embarcada testável" [p.338]
- Três camadas: software, firmware, hardware; hardware deve ser separado do resto; misturar software e firmware é antipadrão: mudanças ficam perigosas, exigem teste de regressão total do sistema; sem testes automatizados externos o resto é teste manual [p.339-340]
- O limite software/firmware é mais difuso que o limite código/hardware; consolidá-lo é trabalho do desenvolvedor; seu nome é HAL (Hardware Abstraction Layer) [p.340-341]
- A API da HAL é feita sob medida para o software que está acima dela (ex.: pares nome/valor em vez de bytes em flash); a implementação flash é detalhe escondido [p.341]
- Subir o nível de abstração: de Led_TurnOn(5) (hardware) para Indicate_LowBattery() (produto); a HAL expressa serviços que a aplicação precisa; camadas podem conter camadas (padrão "fractal") [p.341-342]
- Regra: não revele detalhes de hardware ao usuário da HAL; uma HAL boa oferece linha de junção / pontos de substituição para teste fora do alvo [p.342]
- O processador é um detalhe: extensões proprietárias de C (palavras-chave, variáveis globais de registradores) deixam o código de ser C e o prendem a um compilador/processador; limitar o número de arquivos que conhecem as extensões [p.342-343]
- Exemplo acmetypes.h: não usar o header de tipos do fornecedor diretamente; usar stdint.h padrão e, se faltar no alvo, escrever um stdint.h próprio que inclui o header do fornecedor só nas builds-alvo [p.343-344]
- Todo o software deve ser independente do processador; nem todo firmware pode ser [p.344]
- Exemplo say_hi(): código com registradores (IE, SBUF0, TI_0) e literal binário 0b11000000 não é C legal [p.345-346]
- Arquitetura limpa embarcada usa acesso direto a registradores em pouquíssimos lugares, confinados ao firmware; quem os conhece vira firmware; isolar com PAL (Processor Abstraction Layer), o que permite testar o firmware acima da PAL fora do alvo [p.346]
- O SO é um detalhe: em bare-metal a HAL pode bastar; com RTOS/Linux/Windows embarcado é preciso proteger-se de dependências de SO [p.346-347]
- Riscos de depender diretamente do RTOS: fornecedor comprado, royalties, qualidade, capacidades insuficientes; a mudança seria semântica, não só sintática [p.347]
- OSAL (Operating System Abstraction Layer) isola o software do SO; trocar de RTOS passa a ser escrever um novo OSAL compatível, em vez de alterar código complexo existente [p.347-348]
- A OSAL concentra a duplicação ligada ao SO, pode padronizar estrutura das aplicações (ex.: transmissão de mensagens em vez de cada thread montar seu modelo de concorrência) e fornece pontos de teste fora do alvo e fora do SO [p.348]
- Programar para interfaces e substituibilidade: camadas surgem de programar em interfaces; ex.: printf próprio com a mesma interface do padrão [p.349]
- Regra prática em C: headers como definição de interface, contendo só declarações de função, nomes de constantes e estruturas necessárias às funções; não colocar estruturas/constantes/typedefs só de implementação; limitar visibilidade dos detalhes, supondo que mudarão [p.349-350]
- Código embarcado é testável dentro das camadas porque módulos interagem por interfaces; cada interface é linha de junção/ponto de substituição [p.350]
- Compilação condicional (#ifdef BOARD_V2 milhares de vezes) viola DRY; com HAL, o tipo de hardware vira detalhe sob ela e se liga por linkador ou vinculação em tempo de execução, sem #ifdef [p.350]
Citações curtas de prova:
- "Embora o software não sofra desgastes, ele pode ser destruído internamente por dependências não gerenciadas de firmware e hardware." [p.330] (frase do autor estendendo a de Doug)
- "Uma arquitetura limpa embarcada é uma arquitetura embarcada testável" [p.338] (texto em caixa alta no original)
- "NÃO REVELE DETALHES DE HARDWARE PARA O USUÁRIO DA HAL" [p.342]
O que este trecho NÃO diz: não apresenta código de HAL/OSAL completo nem testes concretos (TDD embarcado, mocks, test doubles não são mencionados); não discute RTOS específicos; não dá número de camadas obrigatório; não menciona "Dependency Rule" por nome neste capítulo (usa "interfaces", "substituibilidade", "detalhe").
Relevância para os artefatos candidatos: clean-architecture-expert: MÉDIA, reforça "hardware/SO/processador são detalhes" e abstração por interface/linha de junção; testing-tdd-expert: MÉDIA, testabilidade fora do alvo como critério arquitetural, gargalo do alvo; clean-code-expert: BAIXA, DRY/#ifdef é periférico.
Decisão sugerida: usar em clean-architecture-expert (referência curta "detalhes: hardware, SO, processador" e critério "testável fora do ambiente-alvo"); pouco ou nada para testing-tdd-expert além do critério de seam.

### Parte VI - Detalhes (divisória, PDF p.352)
Apenas título da parte. Sem conteúdo.

### Cap. 30 - A Base de Dados é um Detalhe (PDF p.353-361)
Resumo. A base de dados, como software/mecanismo de acesso, é irrelevante arquiteturalmente (analogia da maçaneta numa casa); o modelo de dados, ao contrário, é significativo. O RDBMS é dominante por causa do disco lento, e se não houvesse disco os dados seriam organizados em estruturas de RAM. Desempenho de armazenamento é preocupação de baixo nível encapsulável.
Conceitos e regras:
- Base de dados é "não entidade" arquitetural; distinguir base de dados (utilidade/mecanismo) de modelo de dados (significativo) [p.353-354]
- Boa arquitetura não deixa mecanismos de baixo nível poluírem a arquitetura do sistema [p.354]
- Modelo relacional (Codd, 1970) é elegante e robusto, mas ainda é só tecnologia, logo detalhe [p.354]
- Casos de uso não devem saber da estrutura tabular; esse conhecimento fica nas funções utilitárias do círculo mais externo [p.354]
- Frameworks de acesso que expõem linhas/tabelas como objetos para o sistema são erro arquitetural: acoplam casos de uso, regras de negócio e até a UI ao modelo relacional [p.355]
- Por que a predominância dos RDBMS: discos giratórios são lentos (busca de faixa, rotação, setor 4K); exigem índices, caches e consultas otimizadas, logo um sistema de gestão de dados [p.355-356]
- Sistemas de arquivos são baseados em documentos (bons para recuperar por nome); bancos são baseados em conteúdo (bons para achar registros por conteúdo, ruins para documentos opacos) [p.356]
- Se tudo estivesse em RAM, os dados seriam organizados em listas, árvores, tabelas hash, pilhas, filas, acessados por ponteiros/referências; na prática já se reorganiza em RAM o que veio do banco [p.357]
- A base de dados é um "balde de bits" de longo prazo; arquiteturalmente nem é preciso reconhecer a existência do disco [p.357-358]
- Desempenho é preocupação real, mas totalmente encapsulável e separável das regras de negócio [p.358]
- Anedota: startup de gestão de rede T1 com arquivos de acesso aleatório; o mercado exigiu RDBMS; lição do autor: devia ter colocado o RDBMS à parte, com canal de acesso limitado e seguro, mantendo os arquivos no centro; a exigência era de marketing, não de engenharia [p.358-361]
Citações curtas de prova:
- "Os dados são significantes. A base de dados é um detalhe." [p.361]
- "a base de dados não é o modelo de dados" [p.354] (trecho curto reformulado do original)
O que este trecho NÃO diz: não proíbe usar banco relacional; não trata de repositórios, Gateways, ORM por nome, nem de transações/consistência; a anedota admite que o cliente exigiu RDBMS e que o autor "estava errado" nesse ponto comercial.
Relevância: clean-architecture-expert: ALTA, regra "banco é detalhe; modelo de dados importa; não vazar linhas/tabelas/ORM para casos de uso e regras"; testing-tdd-expert: BAIXA; clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (referência sobre detalhes: banco, com regra sobre objetos de ORM vazando).

### Cap. 31 - A Web é um Detalhe (PDF p.362-367)
Resumo. A web é só mais uma oscilação do pêndulo entre centralizar e distribuir poder computacional; a GUI é detalhe e a web é uma GUI, logo detalhe. A web deve ficar atrás de um limite, tratada como dispositivo de IO, e o limite abstraível está nos casos de uso (dados de entrada completos, dados de saída).
Conceitos e regras:
- A web não mudou nada; oscilações históricas (mainframe/terminais, cliente-servidor, applets, Ajax, Node) são questões de curto prazo que o arquiteto afasta do núcleo das regras de negócio [p.363-364]
- Histórias da empresa Q (GUI de desktop imitando navegador e depois revertida) e empresa A (OS do telefone mudando a aparência de todos os apps) para argumentar por isolar regras de negócio da UI [p.364-365]
- "A GUI é um detalhe. A web é uma GUI. Então a web é um detalhe"; colocar esses detalhes atrás de limites que os separem da lógica de negócio [p.365]
- A web é um dispositivo de IO; independência de dispositivo é lição dos anos 60 [p.366]
- Contraponto honesto: a "dança" navegador/aplicação é específica e abstraí-la como dispositivos Unix parece quase impossível [p.366]
- Mas há outro limite abstraível: cada caso de uso tem dados de entrada, processamento e dados de saída; a partir de certo ponto da interação a entrada está completa e o caso de uso executa; entrada e saída vão em estruturas de dados [p.366-367]
- Tal abstração é difícil e exige várias iterações, mas é possível [p.367]
Citações curtas de prova:
- "a GUI é um detalhe. A web é uma GUI. Então a web é um detalhe." [p.365]
- "a WEB é um dispositivo IO" [p.366] (no original em caixa mista com WEB em maiúsculas)
O que este trecho NÃO diz: não detalha Presenters/ViewModels, Humble Object nem o desenho do limite web; não discute SPA, REST ou frameworks web específicos.
Relevância: clean-architecture-expert: ALTA, UI/web como detalhe e limite via dados de entrada/saída do caso de uso; testing-tdd-expert: BAIXA; clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (referência "detalhes", seção web/UI).

### Cap. 32 - Frameworks são Detalhes (PDF p.368-372)
Resumo. Frameworks não são arquiteturas. O relacionamento com o autor do framework é assimétrico ("casamento unidirecional"): você assume o risco. Solução: usar o framework sem se acoplar, mantendo-o nos círculos externos, com proxies/plug-ins e confinando injeção de dependência ao Main.
Conceitos e regras:
- Autores de framework resolvem os problemas deles e de seus pares, não os do leitor [p.369]
- Compromisso assimétrico: o framework recomenda herdar de suas classes base e acoplar objetos de negócio a ele; para o autor isso não é risco e dificulta o desacoplamento [p.369-370]
- Riscos: frameworks tendem a violar a Regra de Dependência ao pedir herança nas Entidades; o produto pode superar o framework; o framework pode evoluir numa direção inútil, com versões forçadas e recursos removidos; pode surgir framework melhor [p.370-371]
- Solução: usar mas não se acoplar; tratá-lo como detalhe dos círculos externos; se pedir herança nos objetos de negócio, recusar e derivar proxies mantidos em componentes plug-in das regras de negócio [p.371]
- Exemplo Spring: bom para injeção de dependência, mas sem anotações @Autowired espalhadas nos objetos de negócio; injetar no componente Main, que pode conhecer Spring por ser o componente mais sujo e de baixo nível [p.371-372]
- Alguns frameworks são inevitáveis (STL em C++, biblioteca padrão Java); deve ser decisão consciente, de longo prazo [p.372]
- Conclusão: manter o framework atrás de um limite arquitetural o máximo de tempo possível ("namorar" antes de casar) [p.372]
Citações curtas de prova:
- "Não case com o framework!" [p.371]
- "Frameworks tendem a violar a Regra de Dependência." [p.370]
O que este trecho NÃO diz: não proíbe usar frameworks; não descreve como montar proxies em detalhe; não trata ORM/JPA por nome.
Relevância: clean-architecture-expert: ALTA, regra de não deixar framework entrar em Entidades/casos de uso, DI no Main; testing-tdd-expert: NENHUMA; clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (referência sobre detalhes e checklist "anotações de framework nos objetos de domínio").

### Cap. 33 - Estudo de Caso: Vendas de Vídeo (PDF p.373-379)
Resumo. Estudo de caso curto (site de vídeos com indivíduos e empresas) que parte de atores e casos de uso, deriva atores como fontes de mudança (SRP) e propõe uma arquitetura de componentes com limites, aplicando a Regra de Dependência e o Princípio Aberto/Fechado.
Conceitos e regras:
- Atores: espectador, comprador, autor, administrador; casos de uso pontilhados são abstratos (ex.: Ver Catálogo, do qual Espectador e Comprador herdam); a notação é do próprio autor [p.374-376]
- De acordo com o SRP, os quatro atores são as quatro fontes primárias de mudança; o sistema deve ser particionado de modo que mudança de um ator não afete os outros [p.375]
- Casos de uso não exaustivos (omitiu login/logout para controlar tamanho) [p.375-376]
- Arquitetura de componente preliminar: visualizações, apresentadores, interações (interactors), controladores, divididos por ator, separados por limites arquiteturais (linhas duplas) [p.376]
- Cada componente é um jar/dll em potencial; o autor dividiria a compilação mas manteria o direito de combinar em menos artefatos (ex.: cinco jars por tipo; ou views+presenters juntos; ou apenas dois jars) conforme necessidade de implantação independente [p.377-378]
- Fluxo de controle: controlador, interação, apresentador, visualização; mas a maioria das setas de dependência aponta contra esse fluxo porque a Regra de Dependência faz todas as dependências cruzarem limites rumo à política de nível mais alto [p.378]
- Relações "usa" seguem o fluxo de controle; herança aponta contra ele, via Princípio Aberto/Fechado, para impedir que mudanças em detalhes subam para políticas [p.378-379]
- Duas dimensões de separação: atores (SRP, razões diferentes de mudança) e Regra de Dependência (níveis de política, ritmos diferentes de mudança); permite misturar e combinar o agrupamento em produtos implantáveis [p.379]
Citações curtas de prova:
- "separar os componentes que mudam por razões diferentes e em ritmos diferentes" [p.379]
O que este trecho NÃO diz: não mostra código; não detalha o modelo de dados nem as entidades do estudo de caso; as figuras (33.1, 33.2) não estão no texto extraído, só suas legendas e descrições.
Relevância: clean-architecture-expert: ALTA, exemplo de partição por ator + Regra de Dependência, componentes como unidades de implantação, flexibilidade de empacotamento; testing-tdd-expert: NENHUMA; clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (exemplo de decomposição por ator e opções de empacotamento).

### Cap. 34 - O Capítulo Perdido (PDF p.380-403) (contribuição de Simon Brown; texto em primeira pessoa e diz "Uncle Bob disse", ou seja, outro autor; a autoria não é declarada nas páginas do bloco)
Resumo. Compara quatro formas de organizar código para um caso de uso "ver pedidos" (pacote por camada, por recurso, portas e adaptadores, por componente), mostra que o uso excessivo de public as iguala sintaticamente e que o compilador (modificadores de acesso) deve impor a arquitetura. Discute também outras formas de desacoplamento (módulos, árvores de código-fonte separadas) e o antipadrão "périphérique".
Conceitos e regras:
- Pacote por camada: fatiamento horizontal técnico (web, serviço, repositório); pacotes com dependências para baixo; boa para começar (Fowler), mas não escala para "três baldes grandes" e não diz nada do domínio de negócio (dois domínios diferentes ficam parecidos) [p.381-383]
- Tipos do exemplo: OrdersController, OrdersService/OrdersServiceImpl, OrdersRepository/JdbcOrdersRepository [p.382]
- Pacote por recurso: fatia vertical por conceito de domínio/raiz agregada (DDD); a organização de topo "grita" o domínio e facilita achar todo o código de um caso de uso; o autor acha que nenhuma das duas é ótima [p.383-384]
- Portas e adaptadores (hexagonal, "limites, controladores, entidades"): domínio "dentro", infraestrutura "fora"; regra principal: o fora depende do dentro, nunca o contrário; renomear OrdersRepository como Orders (linguagem ubíqua do DDD para o que está dentro) [p.385-386]
- Pacote por componente: abordagem híbrida; agrupa lógica de negócio e persistência de um componente de granularidade grossa em um pacote, com UI separada fora; um único ponto de entrada (OrdersComponent); a separação lógica de negócio/persistência é detalhe interno do componente [p.392-394]
- Definição de componente do autor do capítulo (modelo C4): agrupamento de funcionalidade relacionada atrás de uma interface limpa, dentro de um ambiente de execução; difere da definição de Martin (unidade de implantação); componente em jar separado é ortogonal [p.392-394]
- Componentes bem definidos em monólito são um degrau rumo a microsserviços [p.394]
- Camadas estritas só dependem da camada adjacente; o grafo acíclico pode esconder atalhos; arquitetura em camadas relaxada (controlador acessa repositório pulando o serviço) pode ser aceitável em CQRS, mas arriscada se a lógica de negócio garante acesso autorizado [p.388-390]
- Enforcement: disciplina e code review falham sob prazo; análise estática (NDepend, Structure101, Checkstyle) roda após a compilação e tem laço de feedback longo; preferência: usar o compilador [p.391-392]
- Uso indiscriminado de public: pacotes viram só pastas; as quatro abordagens ficam sintaticamente idênticas (Fig. 34.7) [p.395-396]
- Com modificadores adequados: só as interfaces com dependências de entrada de outros pacotes precisam ser públicas; implementações podem ser package-private e injetadas em runtime; em pacote por componente só OrdersComponent é público e o compilador impõe a regra (em .NET, internal exige um assembly por componente) [p.397-398]
- Pacote por recurso tem a ressalva de que nada fora do pacote acessa dados de pedidos sem passar pelo controlador [p.397]
- Aplica-se a monólito de uma única árvore de código; recomenda apoiar-se no compilador em vez de autodisciplina/pós-compilação [p.399]
- Outros desacoplamentos: OSGi e módulos Java 9 permitem distinguir tipos public de tipos "publicados" [p.399]
- Árvores de código-fonte separadas (módulos/projetos em Maven, Gradle, MSBuild): domínio sem dependência de web/persistência; ideal repetir por componente, mas na prática há custos de desempenho, complexidade, manutenção [p.399-400]
- Versão simples: duas árvores (domínio "dentro", infraestrutura "fora"), com dependência de compilação da infraestrutura para o domínio [p.400]
- Antipadrão "périphérique" de portas e adaptadores: com infraestrutura em uma só árvore, o controlador web pode chamar o repositório diretamente sem passar pelo domínio, especialmente se faltarem modificadores de acesso [p.401]
- Conclusão: design com boas intenções pode ser destruído pela estratégia de implementação; considerar mapeamento para código, organização, desacoplamento em runtime e compilação, tamanho/habilidade da equipe, restrições, acoplamento em modelos de dados; ser pragmático e deixar opções abertas [p.401-402]
Citações curtas de prova:
- "O diabo está nos detalhes da implementação." [p.402]
- "gosto de usar o compilador para fazer valer minha arquitetura, se possível" [p.392] (fala do autor do capítulo)
- "uma arquitetura em camadas não fala nada sobre o domínio do negócio" [p.383]
O que este trecho NÃO diz: não prescreve uma das quatro opções como obrigatória (opina por pacote por componente, mas pede pragmatismo); não trata de testes por camada; as figuras 34.1 a 34.9 não estão no texto, só legendas; não discute C#/Python/Go além de internal em .NET.
Relevância: clean-architecture-expert: ALTA, estrutura de pastas/pacotes, uso do compilador (visibilidade) e árvores/módulos de build para impor a Dependency Rule, antipadrão périphérique, camadas relaxadas; testing-tdd-expert: BAIXA, apenas observação de que enforcement automático é melhor que disciplina; clean-code-expert: MÉDIA, o excesso de public e o encapsulamento por visibilidade.
Decisão sugerida: usar em clean-architecture-expert (nova referência "estrutura de código e enforcement" com os quatro estilos e o uso do compilador); citar em clean-code-expert apenas como encapsulamento/visibilidade mínima.

### Parte VII - Apêndice (PDF p.404) e Apêndice A - Arquitetura Arqueologia (PDF p.405-410) [continua no próximo bloco]
Resumo. Apêndice autobiográfico: percurso de 45 anos de projetos desde 1970. No trecho aqui lido só aparece o primeiro projeto (sistema de contabilidade Union em um GE Datanet 30, sem SO nem sistema de arquivos, em assembler em 16K). Conteúdo histórico, sem regras arquiteturais explícitas neste trecho. O texto é truncado no meio de frase (termina em "O consultor de" na p.410).
Conceitos e regras:
- Contexto: máquina com 16K x 18 bits, 7 drives de fita, disco de cerca de 20 MB, sem SO e sem sistema de arquivos; o programador escrevia o próprio driver de disco [p.406-410]
- O sistema tinha três tipos de registro (Agentes, Empregadores, Membros) com CRUD e operações de postagem [p.410]
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: ainda não chega a lições arquiteturais; ver próximo bloco.
Relevância: clean-architecture-expert: BAIXA; demais: NENHUMA.
Decisão sugerida: descartar neste bloco (revisar a continuação no bloco seguinte).

## Checklist de cobertura
- Primeira página lida: 329
- Última página lida: 410 (confirmada por grep: último marcador "=== PDF PAGINA 410 ===")
- Páginas sem texto útil ou ilegíveis: p.352 (só divisória da Parte VI), p.404 (só divisória do Apêndice); figuras sem texto (29.1-29.6, 33.1-33.2, 34.1-34.9, A.1-A.5) aparecem só como legendas
- Problemas de extração observados: legendas de figuras coladas ao texto; títulos em caixa alta quebrados em linhas (ex.: "TESTE DE APP-TIDÃO", "PACOTE POR CAMADA"); ligaduras "fi" no formato "ﬁ"; parágrafo de abertura de seções às vezes fundido com o título; nota 66 em vez de 6 (p.402); "ele pode" cortado no fim de p.337 ("É"); trecho do p.410 truncado; nenhum número de página impresso visível
- Capítulos/seções cobertos integralmente: 29, 30, 31, 32, 33, 34
- Capítulos/seções que continuam em outro bloco: Apêndice A (começa em p.405, termina além de p.410); o Cap. 29 começa no p.329 (primeira página do bloco, sem "continua do bloco anterior": o texto de abertura está inteiro)

## Auditoria da skill atual
Skill auditada: `clean-architecture-expert` v1.0 (SKILL.md, references/hexagonal-structure.md, references/use-case-example.md), lida DEPOIS das notas acima. Páginas são "PDF PAGINA". Só se afirma aqui o que o bloco p.329-410 diz; o resto vai marcado [fora do livro] ou "não suportado pelo bloco" (o que não está neste bloco pode estar em outro bloco do livro).

### (a) O que a skill afirma e o bloco confirma
- "Banco de dados é um detalhe": confirmado, cap. 30 inteiro; base de dados é mecanismo de baixo nível, não elemento arquitetural [p.353-354, 361]. Citação: "Os dados são significantes. A base de dados é um detalhe." [p.361]
- "Frameworks são detalhes de implementação, não devem influenciar o domínio": confirmado, tratar o framework como detalhe dos círculos externos e não deixá-lo entrar nos círculos internos [p.371]. Frameworks tendem a violar a Regra de Dependência ao pedir herança nas Entidades [p.370].
- Anti-padrão "anotações de framework em entidades de domínio": suportado por analogia. O bloco condena herdar de classes base do framework e espalhar `@Autowired` nos objetos de negócio, que "não devem saber do Spring" [p.371]. `@Entity`/`@Column` (JPA) não aparecem no bloco.
- Dependency Rule, dependências apontam para dentro: todas as dependências cruzam os limites em uma direção, rumo aos componentes de política de nível mais alto [p.378]; em portas e adaptadores, o "fora" depende do "dentro", nunca o contrário [p.386].
- Hexagonal/Ports and Adapters: dentro (domínio) e fora (UI, banco, integrações) [p.385-386]; domínio em árvore de código própria, sem dependência de web e persistência [p.399-400].
- Repositório como interface ligada ao domínio, implementação fora: `OrdersRepository`/`Orders` é interface; `JdbcOrdersRepository` é a implementação [p.382, 386, 399-400].
- Pacotes que revelam o negócio (Screaming Architecture) e rejeição de `controllers/services/repositories`: "pacote por camada" não diz nada do domínio, dois negócios diferentes ficam "sinistramente similares" [p.383]; pacote por recurso faz a organização "gritar" o domínio [p.384].
- Testabilidade sem a infraestrutura: o princípio aparece no embarcado, onde o código deve ser testável fora do hardware-alvo e fora do SO, e cada interface é ponto de substituição [p.338, 342, 348, 350]. Confirma a ideia, não o exemplo de banco/API/mensageria.
- Interfaces para abstrações externas: programar para interfaces e substituibilidade [p.349-350]; HAL e OSAL como camadas de abstração [p.341, 347-348].
- Casos de uso como centro e identificação de ator, entrada e saída: casos de uso se descrevem por dados de entrada, processamento e dados de saída [p.366]; atores guiam o particionamento [p.375]; o estudo de caso começa por atores e casos de uso [p.374].
- Lógica de negócio não vai em controller: o bloco mostra o controlador contornando a camada de negócio (camadas relaxadas) como risco, sobretudo quando essa lógica garante acesso autorizado a registros [p.389-390]. Confirma parcialmente.
- Linguagem do negócio nos nomes do domínio: dentro do domínio nomeia-se pela linguagem ubíqua do DDD (`Orders`, não `OrdersRepository`) [p.386].
- SRP/OCP como base: SRP por ator [p.375, 379], OCP para manter a direção das dependências [p.378].

### (b) O que a skill afirma e o bloco contradiz ou não suporta
- Tensão: a árvore principal do SKILL.md (`src/domain|application|adapters|infrastructure`) é organização por camada no topo, que o bloco diz não revelar o domínio e não ser "ótima" [p.383-384]. A própria skill pede pacotes de topo por negócio (checkout/billing); o `hexagonal-structure.md` coloca o contexto `subscriptions` acima das camadas. O bloco só mostra trade-offs e não decide; a skill não explicita a hierarquia (contexto primeiro, camadas dentro).
- Não suportado: a cadeia "Infrastructure → Adapters → Application → Domain" e a separação em quatro camadas. O bloco usa apenas "dentro/fora" [p.385-386], três árvores (domínio, web, persistência) ou duas (domínio, infraestrutura) [p.399-400]. Os nomes das camadas vêm de outro ponto do livro ou [fora do livro]; este bloco não os traz.
- Não suportado: "`infrastructure` pode depender de qualquer camada" (tabela do hexagonal-structure.md). O bloco só afirma que a infraestrutura depende do domínio; o antipadrão périphérique mostra o risco de infraestrutura chamando infraestrutura sem passar pelo domínio [p.401].
- Não suportado neste bloco: Domain Events, Value Objects, Aggregates como obrigação, Sagas, Outbox, Retry, Circuit Breaker, Integration Events, "preferir eventos assíncronos". "Raízes agregadas" aparece só como critério do pacote por recurso [p.383]. (Podem estar em outro bloco.)
- Não suportado: "Sempre aplicar SOLID" e "Hexagonal sempre que houver integração externa". O bloco pede pragmatismo, opções abertas e ajuste a tamanho/habilidade da equipe e orçamento [p.402]; reconhece custo de desempenho, complexidade e manutenção da divisão ideal em árvores [p.400]. O tom absoluto ("Sempre/Nunca/Rejeite") é mais rígido que o do bloco.
- Nuance: "Nunca priorize frameworks" soa absoluto; o bloco admite casos inevitáveis (STL, biblioteca padrão) e pede que o casamento seja decisão consciente [p.372].
- Não suportado: "Dependam de frameworks para executar casos de uso em testes" como anti-padrão; o bloco não fala de testes de caso de uso com framework.
- Lacuna frente ao exemplo: o SKILL.md e o `hexagonal-structure.md` põem a configuração de DI em `infrastructure/configuration` (`SubscriptionBeanConfig`); o bloco recomenda confinar a injeção de dependência do framework ao componente Main, "o mais sujo" [p.371-372]. Não é contradição; a skill não menciona Main.
- Nomes: a skill usa o sufixo `Repository` na interface de domínio (`SubscriptionRepository`); o bloco, para o interior do domínio, prefere o nome na linguagem do domínio (`Orders`) [p.386]. Divergência de convenção, não de regra.
- A "Regra Máxima" da skill (citação sobre desenvolver corretamente) [fora do livro, não aparece no bloco]; o bloco recomenda pragmatismo [p.402].
- Risco não tratado: SKILL.md e hexagonal-structure.md põem `adapters/inbound`, `adapters/outbound` e `infrastructure` sem mecanismo de imposição; o bloco alerta que, sem modificadores de acesso ou árvores separadas, a regra é burlável (périphérique, camadas relaxadas) [p.389-391, 401].

### (c) O que o bloco traz e a skill não cobre
1. Imposição da arquitetura pelo compilador [p.391-392, 395-399]: disciplina e code review falham sob prazo; análise estática (NDepend, Structure101, Checkstyle) roda após o build, com feedback longo e falível; visibilidade restrita (package-private; só interfaces com dependência de entrada são públicas; implementações injetadas em runtime); `internal` em .NET exige um assembly por componente; módulos Java 9/OSGi distinguem tipos `public` de "publicados"; excesso de `public` reduz pacotes a pastas e iguala as quatro abordagens (Fig. 34.7). Citação: "gosto de usar o compilador para fazer valer minha arquitetura, se possível" [p.392]. Candidato: nova referência em clean-architecture-expert; encapsulamento mínimo também em clean-code-expert.
2. Quatro estilos de organização de código com trade-offs: pacote por camada, por recurso, portas e adaptadores, por componente [p.381-398]; camadas estritas vs relaxadas e a exceção legítima do CQRS [p.388-390]; ressalva do pacote por recurso (acesso só via controlador) [p.397].
3. Árvores de código-fonte e módulos de build (Maven, Gradle, MSBuild): três árvores (domínio, web, persistência) ou duas (dentro/fora), custos práticos [p.399-400]; antipadrão "périphérique de portas e adaptadores" [p.401].
4. Pacote por componente e definição C4 de componente (contêiner, componente, classe), ortogonal a ser jar [p.392-394]; componentes de monólito como degrau rumo a microsserviços [p.394].
5. Modelo de dados vs base de dados: o modelo é significativo, a base não [p.354, 361]; não passar linhas/tabelas como objetos aos casos de uso e regras (erro arquitetural) [p.355]; desempenho de armazenamento encapsulável [p.358]; por que o RDBMS domina (disco lento) e o que fazer se o mercado exigir um (à parte, com canal de acesso limitado) [p.355-360]. A skill só diz "banco é detalhe".
6. Web/GUI como detalhe e dispositivo de IO; limite abstraível nos dados de entrada completos e de saída do caso de uso; abstração difícil, várias iterações [p.365-367]; pêndulo centralizar/distribuir como razão para isolar [p.363-364].
7. Frameworks: relação assimétrica ("casamento unidirecional"), riscos (violar a Regra de Dependência, superar o framework, evolução indesejada, troca), solução com proxies/plug-ins nos círculos externos, DI confinada ao Main, frameworks inevitáveis como decisão consciente [p.369-372].
8. Estudo de caso: atores como fontes de mudança (SRP) e partição por ator; casos de uso abstratos; setas de herança contra o fluxo de controle por OCP; duas dimensões de separação (razões de mudança = atores; ritmos de mudança = níveis de política); componentes reagrupáveis em jars/dlls conforme a implantação [p.375-379].
9. Arquitetura limpa embarcada: firmware = código preso ao hardware; HAL, PAL, OSAL; HAL com API sob medida para o software (Indicate_LowBattery() em vez de Led_TurnOn(5)); seams para testar fora do alvo; headers como interfaces; `stdint.h` contra tipos do fornecedor; `#ifdef` repetido viola DRY [p.329-350]. Também o "teste de App-tidão" e as três atividades de Beck [p.333-334]. Relevância baixa para a skill geral; MÉDIA se ganhar uma seção "detalhes: hardware, SO, processador".
10. Critério de decisão pragmático: manter opções abertas, considerar tamanho e habilidade da equipe, restrições de tempo/orçamento, e atentar ao acoplamento em modelos de dados [p.402].
- testing-tdd-expert: o bloco traz só o critério "testável fora do ambiente-alvo / seams" [p.338, 342, 348, 350] e a crítica a depender só de disciplina para impor regras [p.391]; não há prática de TDD, mocks ou pirâmide de testes. Relevância BAIXA.
- clean-code-expert: o bloco não cobre o Código Limpo (nomes, funções); só encapsulamento por visibilidade [p.395-398] e DRY de `#ifdef` [p.350]. Relevância BAIXA.
