# Notas: Arquitetura Limpa (Robert C. Martin), bloco 02, PDF p.83-164

Obs: o número impresso da página não aparece no texto extraído; todas as páginas abaixo são "PDF PAGINA".

### Cap. 5 Programação Orientada a Objetos: encapsulamento e herança (PDF p.83-88) [continua do bloco anterior]
Resumo. Martin examina os três atributos atribuídos à OO (encapsulamento, herança, polimorfismo) e argumenta que a OO não os inventou; o encapsulamento até piorou com o C++. Para o arquiteto, o valor real da OO está no polimorfismo.
Conceitos e regras:
- Em C era possível encapsulamento perfeito (header com struct declarada e funções; campos só no .c) [p.83].
- C++ quebrou esse encapsulamento: o compilador exige as variáveis-membro no header, então clientes "sabem" dos campos e mudar nomes força recompilação; public/private/protected seriam um hack parcial [p.84].
- Java e C# aboliram a divisão header/implementação, enfraquecendo mais; muitas linguagens OO (Smalltalk, Python, JS, Lua, Ruby) têm pouco ou nenhum encapsulamento forçado [p.84-85].
- Herança já existia em C por mascaramento de estruturas (NamedPoint com os mesmos primeiros campos de Point, com cast); OO só tornou isso mais conveniente (upcast implícito); herança múltipla é bem mais difícil sem OO [p.85-88].
- Veredito do autor: OO "não ganha ponto" por encapsulamento e merece talvez "meio ponto" por herança [p.88].
Citações curtas de prova:
- "a OO não ganha nenhum ponto pelo encapsulamento e merece, talvez, meio ponto pela herança" [p.88]
O que este trecho NÃO diz: não diz que encapsulamento/herança sejam inúteis, só que não são exclusivos da OO. Não trata de composição vs herança como guia de design.
Relevância: clean-architecture-expert: BAIXA (contexto histórico); testing-tdd-expert: NENHUMA; clean-code-expert: NENHUMA.
Decisão sugerida: descartar (histórico), exceto a nota de que encapsulamento fraco é característica das linguagens, não garantia.

### Cap. 5 OO: polimorfismo, inversão de dependência (PDF p.88-99)
Resumo. Polimorfismo é ponteiro para função disciplinado pela linguagem (exemplo UNIX FILE/getchar, vtable do C++). Isso torna segura a arquitetura de plug-in e permite inverter qualquer dependência de código-fonte, dando ao arquiteto controle total da direção das dependências.
Conceitos e regras:
- Polimorfismo existia em C via tabela de ponteiros para função (struct FILE com open, close, read, write, seek); vtable de C++ é a mesma ideia; OO elimina as convenções manuais perigosas e "impõe disciplina na transferência indireta de controle" [p.88-91].
- Exemplo copy: como o programa não depende do código dos drivers IO, novos dispositivos entram sem mudar nem recompilar o programa; dispositivos IO viram plug-ins; a lição dos anos 1950 foi tornar programas independentes de dispositivo [p.92-94].
- Arquitetura de plug-in já existia nos SOs, mas poucos a aplicavam em seus programas por causa do perigo dos ponteiros; OO permite usá-la em qualquer lugar [p.94].
- Sem polimorfismo, dependências de código-fonte seguem o fluxo de controle (main -> alto -> médio -> baixo; #include/import/using) [p.94-96, Fig. 5.1].
- Com polimorfismo, uma interface entre chamador e chamado faz a dependência de código-fonte (herança/implementação) apontar contra o fluxo de controle: inversão de dependência. Em tempo de execução a interface "não existe" como desvio; HL1 chama F() em ML1 [p.96, Fig. 5.2].
- Qualquer dependência de código-fonte, em qualquer ponto, pode ser invertida inserindo uma interface; o arquiteto não fica preso ao fluxo de controle [p.96-97].
- Aplicação: banco de dados e UI dependem das regras de negócio (plug-ins), e o código das regras nunca menciona UI ou BD; cada um compila em componente separado (jar, DLL, gem); regras de negócio implantáveis sem UI/BD [p.97-98, Fig. 5.3].
- Implantação independente: mudou o fonte de um componente, só ele é reimplantado; módulos implantáveis independentemente podem ser desenvolvidos independentemente por equipes diferentes [p.98].
- Conclusão: para o arquiteto, OO é controle absoluto, via polimorfismo, sobre cada dependência de código-fonte, permitindo políticas de alto nível independentes de detalhes de baixo nível [p.98].
Citações curtas de prova:
- "Isso se chama inversão de dependência, e suas implicações para o arquiteto de software são profundas." [p.96]
- "Isso se chama implantação independente." [p.98]
- "a OO impõe disciplina na transferência indireta de controle" [p.91]
O que este trecho NÃO diz: não descreve ainda a Regra da Dependência nem camadas (Entidades/Casos de Uso/Adaptadores/Frameworks); não fala de DTO nem de como dados cruzam a fronteira.
Relevância: clean-architecture-expert: ALTA (mecanismo base de DIP, plug-in, UI/BD como plug-ins, fluxo de controle vs dependência de código-fonte); testing-tdd-expert: BAIXA (plug-in viabiliza substituir detalhes por doubles, mas o texto não diz isso); clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (references: princípio "fluxo de controle != direção de dependência" e plug-in).

### Cap. 6 Programação Funcional (PDF p.100-108)
Resumo. Compara Java (variável mutável de laço) com Clojure (nenhuma variável muda). Argumento arquitetural: condições de corrida, deadlock e atualização concorrente decorrem de variáveis mutáveis. Propõe segregar mutabilidade e, no limite, event sourcing.
Conceitos e regras:
- Paradigma baseado no cálculo-lambda de Alonzo Church (anos 1930) [p.100]. Exemplo dos quadrados dos 25 primeiros inteiros em Java vs Clojure; listas infinitas avaliadas sob demanda [p.101-102].
- Variáveis em linguagens funcionais não variam; todas as race conditions, deadlocks e problemas de atualização concorrente vêm de variáveis mutáveis; arquiteto deve perguntar se a imutabilidade é praticável (sim com armazenamento/processamento infinitos; com concessões, na prática) [p.102-103].
- Segregação de mutabilidade: dividir a aplicação/serviços em componentes imutáveis (puramente funcionais) e mutáveis; os imutáveis se comunicam com os mutáveis; proteger o estado mutável com memória transacional (atom/swap! em Clojure, compare-e-troca com retry) [p.104-105, Fig. 6.1].
- atom não protege totalmente quando há várias variáveis dependentes; nesses casos facilities mais elaboradas [p.105].
- Boa estrutura: segregar componentes que mudam variáveis dos que não mudam; destinar o máximo de processamento a componentes imutáveis e empurrar código para fora dos mutáveis [p.105-106].
- Event sourcing: guardar transações, não estado (exemplo saldo bancário calculado somando transações); atalho: salvar estado periodicamente (ex. à meia-noite); nada é deletado/atualizado, logo a aplicação é "CR" e não CRUD, sem atualização concorrente; analogia com sistema de controle de versão [p.106-107].
- Resumo dos paradigmas: estruturada = disciplina sobre transferência direta de controle; OO = indireta; funcional = sobre atribuição de variáveis. Cada um tirou algo; nenhum acrescentou poder; "o que aprendemos foi o que não fazer". Software = sequência, seleção, iteração e indireção [p.107-108].
Citações curtas de prova:
- "variáveis em linguagens funcionais não variam" [p.103]
- "A programação funcional é a disciplina imposta sobre atribuição de variáveis." [p.108]
- "nossas aplicações não são CRUD; são apenas CR" [p.107]
O que este trecho NÃO diz: não prescreve adotar event sourcing como padrão; apresenta como possibilidade condicionada a armazenamento/processamento suficientes. Não aborda CQRS nem projeção de eventos em detalhe.
Relevância: clean-architecture-expert: MÉDIA (segregar componentes mutáveis/imutáveis, event sourcing como opção); testing-tdd-expert: BAIXA (não menciona testabilidade de funções puras); clean-code-expert: NENHUMA/BAIXA.
Decisão sugerida: usar em clean-architecture-expert como nota curta em references (mutabilidade e concorrência como preocupação arquitetural); descartar detalhes de Clojure.

### Parte III Princípios de Design: introdução aos princípios SOLID (PDF p.109-112)
Resumo. SOLID organiza funções e dados em classes e como se interconectam; "classe" é só agrupamento acoplado de dados e funções, vale para qualquer paradigma. Alvo: estruturas de nível médio.
Conceitos e regras:
- Tijolos bem feitos (código limpo) não bastam; pode-se bagunçar com tijolos bons [p.109].
- Objetivo: estruturas de nível médio que tolerem mudanças, sejam fáceis de entender e sirvam de base a componentes reutilizáveis em vários sistemas; "nível médio" = nível de módulo, logo acima do código; depois vêm princípios de componentes e de arquitetura de alto nível [p.110].
- Resumos: SRP (cada módulo uma, e só uma, razão para mudar, ligado à lei de Conway), OCP (mudar comportamento adicionando código, não alterando), LSP (partes intercambiáveis aderem a um contrato), ISP (não depender do que não usa), DIP (política de alto nível não depende de detalhes; detalhes dependem das políticas) [p.111-112].
- O capítulo avisa que não ensina SOLID em profundidade; trata das implicações arquiteturais [p.112].
Citações curtas de prova:
- "Uma classe é apenas um agrupamento acoplado de funções e dados." [p.109]
O que este trecho NÃO diz: não define DIP como "injeção de dependência"; não lista code smells.
Relevância: clean-architecture-expert: ALTA (enquadramento SOLID e níveis: código, módulo, componente, arquitetura); clean-code-expert: BAIXA (autor distingue código limpo de SOLID); testing-tdd-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert.

### Cap. 7 SRP: Princípio da Responsabilidade Única (PDF p.113-120)
Resumo. SRP não significa "um módulo faz uma coisa" (isso vale para funções, mas não é o SRP). A versão final: um módulo responde a um, e apenas um, ator. Sintomas: duplicação acidental e fusões (merges) conflitantes.
Conceitos e regras:
- O princípio "uma função faz uma coisa" existe, mas não é o SRP [p.114].
- Formulações: "uma única razão para mudar" -> "um único usuário/stakeholder" -> "um único ator" (grupo que exige a mesma mudança) [p.114].
- Módulo = arquivo-fonte ou conjunto coeso de funções e estruturas de dados; coesão é a força que amarra o código a um único ator [p.114-115].
- Sintoma 1, duplicação acidental: Employee com calculatePay (contabilidade/CFO), reportHours (RH/COO), save (DBAs/CTO); função compartilhada regularHours() faz mudança pedida por um ator corromper relatório do outro, com prejuízo de milhões [p.115-117].
- Sintoma 2, fusões: dois desenvolvedores/equipes mudando a mesma classe por razões diferentes colidem; qualquer fonte editada por vários por razões diferentes é sintoma [p.117-118].
- Soluções: separar dados das funções (EmployeeData sem métodos + uma classe por ator, sem se conhecerem); Facade (EmployeeFacade) para reduzir o custo de instanciar três classes; ou manter o método mais importante na Employee original, usada como Facade para as menores [p.118-119].
- Cada classe resultante contém uma família de métodos (privados incluídos) que forma um escopo [p.119].
- O SRP reaparece em nível de componente como CCP e, em nível arquitetural, como Eixo da Mudança que cria Limites Arquiteturais [p.120].
Citações curtas de prova:
- "Um módulo deve ser responsável por um, e apenas um, ator." [p.114]
- "Coesão é a força que amarra o código responsável a um único ator." [p.115]
O que este trecho NÃO diz: não diz que todo método deve ficar em classe própria (explicitamente rejeita essa objeção); não fornece método para identificar atores além dos exemplos.
Relevância: clean-architecture-expert: ALTA (definição correta do SRP, sintomas, soluções); clean-code-expert: MÉDIA (distinção função-faz-uma-coisa vs SRP, duplicação acidental/DRY); testing-tdd-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (references/solid-arquitetura.md) e nota de distinção em clean-code-expert.

### Cap. 8 OCP: Princípio Aberto/Fechado (PDF p.121-128)
Resumo. Artefato aberto para extensão, fechado para modificação. Em nível arquitetural: separar por razões de mudança (SRP), organizar dependências (DIP) em componentes unidirecionais, protegendo os de nível mais alto.
Conceitos e regras:
- Definição de Meyer (1988); comportamento extensível sem alterar o artefato [p.121-122]. Se extensões simples forçam mudanças massivas, é falha arquitetural [p.122].
- Experimento mental: resumo financeiro em web vs relatório impresso P&B; boa arquitetura reduz o código a mudar ao mínimo, idealmente zero [p.122-123].
- Passos: (1) SRP: separar cálculo dos dados relatáveis (analisador) de apresentação (web e impressa); (2) DIP: organizar dependências de código-fonte para que mudar uma responsabilidade não mude a outra [p.123, Fig. 8.1].
- Particionar processos em classes e classes em componentes (Controlador, Interface, Base de Dados, Apresentadores, Visualizações); toda seta é dependência de código-fonte; cada fronteira é cruzada em um só sentido; setas apontam para o componente a ser protegido; "para A ser protegido de mudanças em B, B deve depender de A" [p.124-125, Fig. 8.2-8.3].
- Hierarquia de proteção por "nível": o componente com as regras de negócio (chamado "Interface" no texto traduzido, ver problemas de extração) é o mais protegido por conter as políticas de maior nível; Visualizações são as menos protegidas [p.126].
- Arquitetos separam a funcionalidade pelo como, por que e quando da mudança, e a organizam em hierarquia de componentes protegendo os de nível mais alto [p.126].
- Interfaces como FinancialDataGateway e FinancialReportPresenter existem para inverter dependências; FinancialReportRequester oculta informação para evitar dependências transitivas do Controlador em FinancialEntities [p.127].
- Dependências transitivas violam o princípio geral de não depender de coisas que não usa diretamente (retomado em ISP e CRP) [p.127].
Citações curtas de prova:
- "para que componente A seja protegido das mudanças no componente B, o componente B deve depender do componente A" [p.125, legenda Fig. 8.3]
- "Uma boa arquitetura de software deve reduzir a quantidade de código a ser mudado para o mínimo possível." [p.123]
O que este trecho NÃO diz: não promete fechamento total (isso só é dito no cap. 13, p.160); não usa o termo Regra da Dependência.
Relevância: clean-architecture-expert: ALTA (OCP em nível de componente, hierarquia de proteção, uso de SRP+DIP, interfaces para inverter e ocultar); testing-tdd-expert: NENHUMA; clean-code-expert: BAIXA.
Decisão sugerida: usar em clean-architecture-expert.

### Cap. 9 LSP: Princípio de Substituição de Liskov (PDF p.129-134)
Resumo. Definição de subtipo de Liskov (1988) e extensão: LSP vale para interfaces e implementações em qualquer forma (interface Java, classes Ruby, serviços REST). Violação em nível arquitetural gera mecanismos extras.
Conceitos e regras:
- Propriedade de substituição: programas definidos em termos de T não mudam de comportamento se objetos de S substituem T [p.129].
- Exemplo conforme: License com PersonalLicense/BusinessLicense; Billing não depende de subtipo [p.130].
- Violação clássica: Square/Rectangle, pois largura e altura de Rectangle são independentes; assert(r.area()==10) falha com Square; defesa exigiria if no usuário, logo tipos não substituíveis [p.130-131].
- LSP evoluiu de guia de herança para princípio amplo de interfaces e implementações; vale para interface Java, classes Ruby com mesmas assinaturas e serviços com mesma interface REST [p.131-132].
- Exemplo de violação arquitetural: agregador de táxis com URI de despacho no cadastro do motorista; Acme usa "dest" em vez de "destination"; solução ruim é um if em "acme.com"; solução razoável é módulo de criação de comandos dirigido por tabela de configuração indexada por URI, mas implica mecanismo complexo extra [p.132-134].
- Conclusão: LSP deve ser estendido ao nível da arquitetura; uma violação simples de substituibilidade contamina a arquitetura com mecanismos extras [p.134].
Citações curtas de prova:
- "O LSP pode, e deve, ser estendido ao nível da arquitetura." [p.134]
O que este trecho NÃO diz: não lista regras de variância (pré/pós-condições, invariantes); não fala de testes de contrato.
Relevância: clean-architecture-expert: MÉDIA (substituibilidade de adaptadores/plug-ins e contratos de interface entre componentes); testing-tdd-expert: BAIXA; clean-code-expert: BAIXA.
Decisão sugerida: usar em clean-architecture-expert (checagem: se o chamador precisa de if por tipo/fornecedor, LSP violado).

### Cap. 10 ISP: Princípio da Segregação de Interface (PDF p.135-138)
Resumo. Evitar depender de elementos que não usa; em código, evita recompilação/reimplantação desnecessária; em arquitetura, evita acoplar o sistema a frameworks com recursos extras.
Conceitos e regras:
- Exemplo OPS com op1/op2/op3 e User1/2/3: segregar em interfaces U1Ops etc. para que mudança em op2 não force User1 a recompilar [p.136, Fig. 10.1-10.2].
- Dependência de linguagem: em linguagens estáticas, import/use/include criam as dependências; em dinâmicas (Ruby, Python) não, daí mais flexíveis e menos acopladas; isso pode sugerir que ISP seja questão de linguagem [p.136-137].
- Nível arquitetural: sistema S depende do framework F, que depende do banco D; recursos de D não usados por F/S ainda podem forçar reimplantação e falhas em cascata [p.137-138, Fig. 10.3].
- Lição: depender de algo com itens desnecessários causa problemas inesperados [p.138].
Citações curtas de prova:
- "depender de algo que contém itens desnecessários pode causar problemas inesperados" [p.138]
O que este trecho NÃO diz: não prescreve interfaces de um método só; não discute interfaces de repositório granulares.
Relevância: clean-architecture-expert: MÉDIA (acoplamento a framework/BD como violação de ISP em nível arquitetural); testing-tdd-expert: NENHUMA; clean-code-expert: BAIXA.
Decisão sugerida: usar em clean-architecture-expert.

### Cap. 11 DIP: Princípio da Inversão de Dependência (PDF p.139-144)
Resumo. Sistemas flexíveis têm dependências de código-fonte apenas para abstrações. Regras práticas e Abstract Factory; violações concentradas em componente concreto (main). Anuncia a Regra da Dependência.
Conceitos e regras:
- Imports/use/include devem referir só módulos com abstrações (interfaces, classes abstratas); em linguagens dinâmicas, módulo concreto = módulo onde as funções chamadas são implementadas [p.139-140].
- Impraticável como regra absoluta: aceita-se dependência de concretos estáveis (ex. java.lang.String, SO, facilidades de plataforma); evitar dependência de concretos voláteis, aqueles em desenvolvimento ativo e mudança frequente [p.140].
- Interfaces são menos voláteis que implementações; bons arquitetos reduzem a volatilidade das interfaces ("Design de Software 101") [p.140-141].
- Quatro práticas: (1) não se refira a classes concretas voláteis, refira-se a interfaces abstratas (restringe criação de objetos e leva a Abstract Factories); (2) não derive de classes concretas voláteis (herança é o relacionamento mais rígido em linguagens estáticas); (3) não sobrescreva funções concretas (override herda as dependências; converta em abstrata com várias implementações); (4) nunca mencione o nome de algo concreto e volátil [p.141-142].
- Criação de objetos concretos exige dependência de código-fonte na definição; usar Abstract Factory (Application -> ServiceFactory -> ServiceFactoryImpl instancia ConcreteImpl como Service) [p.142-143, Fig. 11.1].
- A linha curva é um limite arquitetural separando abstrato de concreto; todas as dependências cruzam apontando para o lado abstrato; o componente abstrato contém regras de negócio de alto nível, o concreto contém detalhes; fluxo de controle cruza na direção oposta [p.143].
- O componente concreto viola o DIP (comum); violações não somem, mas podem ser reunidas em poucos componentes concretos isolados, frequentemente o main, que instancia a fábrica concreta e a coloca numa variável global do tipo abstrato [p.143-144].
- O DIP será o princípio organizador mais visível; a linha curva representará limites arquiteturais; cruzá-la sempre rumo ao mais abstrato é a "Regra da Dependência" [p.144].
Citações curtas de prova:
- "Nunca mencione o nome de algo que seja concreto e volátil." [p.142]
- "as violações do DIP não podem ser removidas completamente, mas é possível reuni-las em um número menor de componentes concretos" [p.144, parafraseado de texto em caixa-alta]
O que este trecho NÃO diz: não menciona contêineres de injeção de dependência; não define a Regra da Dependência com os círculos concêntricos (só a anuncia).
Relevância: clean-architecture-expert: ALTA (regras práticas do DIP, distinção estável/volátil, Abstract Factory, main como componente sujo, anúncio da Dependency Rule); testing-tdd-expert: BAIXA (não trata de testes); clean-code-expert: BAIXA.
Decisão sugerida: usar em clean-architecture-expert.

### Parte IV Princípios dos Componentes: introdução (PDF p.145)
Resumo. Se SOLID organiza tijolos em paredes e salas, princípios de componentes organizam salas em prédios. Sistemas grandes são feitos de componentes menores.
O que este trecho NÃO diz: nada além da introdução.
Relevância: clean-architecture-expert: BAIXA. Decisão: descartar (introdução).

### Cap. 12 Componentes (PDF p.146-155)
Resumo. Componentes são unidades de implantação (jar, gem, DLL, agregações de binários ou fontes). História: da carga em endereço fixo, passando por binários relocáveis, linking loader e linker, até a ligação em tempo de carga que permitiu a arquitetura de plug-in de componentes.
Conceitos e regras:
- Componente é o menor artefato implantável (jar, gem, DLL, .war, .exe); bem projetados retêm a capacidade de implantação independente e, portanto, desenvolvimento independente, mesmo reunidos num executável único [p.146-147].
- História: programas não relocáveis (diretiva origin, exemplo PDP-8) [p.147-148]; bibliotecas em fonte, compiladas junto; compilação lenta levou a compilar biblioteca à parte em endereço fixo [p.149]; fragmentação de memória [p.150-151]; binários relocáveis e carregador de ligações [p.151-152]; separação linker/loader em fases [p.152]; anos 80, ligação de centenas de milhares de linhas de código voltou a levar uma hora [p.153]; lei de Murphy do tamanho de programas vs Moore; nos anos 90, ligação em segundos, Active-X, bibliotecas compartilhadas, .jar, nascimento da arquitetura de plugin de componente [p.153-154].
- Hoje plug-ins como jars/DLLs (ex. mods de Minecraft, Resharper no Visual Studio) [p.154]. Conclusão: levou 50 anos para plugin de componente ser o padrão típico [p.154-155].
Citações curtas de prova:
- "Componentes são unidades de implantação." [p.146]
- "Os programas tendem a crescer até preencherem todo o tempo disponível para compilação e ligação." [p.153]
O que este trecho NÃO diz: não relaciona ainda componentes a limites arquiteturais ou à Regra da Dependência; não trata de módulos Maven/npm.
Relevância: clean-architecture-expert: MÉDIA (definição de componente como unidade de implantação e base da independência de deploy); testing-tdd-expert: NENHUMA; clean-code-expert: NENHUMA.
Decisão sugerida: usar só a definição (p.146-147) em clean-architecture-expert; descartar a história de relocação/ligação.

### Cap. 13 Coesão de Componentes (PDF p.156-164) [continua no próximo bloco: o texto termina truncado na p.164, no meio do parágrafo sobre a evolução do projeto no diagrama de tensão]
Resumo. Três princípios decidem quais classes pertencem a quais componentes: REP, CCP, CRP. Eles estão em tensão e o arquiteto escolhe posição no triângulo conforme a maturidade do projeto.
Conceitos e regras:
- REP (Equivalência Reúso/Release): a granularidade do reúso é a granularidade do release; reutilizar exige rastreamento por release com número de versão e notas; classes de um componente devem formar um grupo coeso com tema/propósito, liberáveis em conjunto; o autor admite que o conselho "faz sentido" é fraco, mas violações são fáceis de detectar; o CCP e o CRP o restringem de forma negativa [p.157-159].
- CCP (Fechamento Comum): reúna classes que mudam pelas mesmas razões e ao mesmo tempo; separe as que mudam em momentos/razões diferentes; é o SRP para componentes; na maioria das aplicações manutenção pesa mais que reúso; mudanças concentradas num componente reduzem release, revalidação, reimplantação; classes fortemente ligadas que sempre mudam juntas pertencem ao mesmo componente [p.159].
- Relação com OCP: 100% de fechamento é impossível, então deve ser estratégico, fechando para os tipos de mudança mais comuns esperados ou já observados; o CCP agrupa classes fechadas para as mesmas mudanças [p.160].
- Frase-síntese SRP/CCP: reúna o que muda junto pelas mesmas razões, separe o que muda em tempos e razões diferentes [p.161].
- CRP (Reúso Comum): não force usuários a dependerem do que não precisam; classes reutilizadas juntas ficam juntas (ex. container e iteradores); classes sem forte ligação não devem ficar juntas; depender de um componente é depender de todo ele (mesmo usando uma classe, mudança força recompilação/revalidação/reimplantação) [p.161-162].
- CRP é versão genérica do ISP (ISP: classes com métodos não usados; CRP: componentes com classes não usadas); síntese: não dependa de coisas que você não precisa [p.162-163].
- Tensão: REP e CCP são inclusivos (aumentam componentes), CRP é excludente (diminui). Focar só em REP+CRP faz muitos componentes serem impactados por mudança simples; focar CCP+REP causa releases desnecessários. No início do projeto o CCP pesa mais que o REP (desenvolvimento > reúso); projetos tendem a começar no lado direito do triângulo (sacrificando só o reúso) e se deslocar com a maturidade [p.163-164, Fig. 13.1].
Citações curtas de prova:
- "A granularidade do reúso é a granularidade do release." [p.157]
- "Não dependa de coisas que você não precisa." [p.163]
- "Na maioria das aplicações, a manutenção é mais importante do que a reutilização." [p.159]
O que este trecho NÃO diz: não dá critérios numéricos; o desfecho do diagrama de tensão (para onde o projeto migra com a maturidade) fica truncado na p.164 e continua no próximo bloco. Não fala de coesão de módulos no sentido de métricas (LCOM).
Relevância: clean-architecture-expert: ALTA (critérios de agrupamento em componentes, tensão REP/CCP/CRP, evolução conforme maturidade); testing-tdd-expert: NENHUMA; clean-code-expert: BAIXA.
Decisão sugerida: usar em clean-architecture-expert (references: princípios de componentes), completando com o próximo bloco.

## Checklist de cobertura
- Primeira página lida: 83
- Última página lida: 164 (82 marcadores, conferidos por contagem e pelo Grep das p.160-164)
- Páginas sem texto útil ou ilegíveis: p.93 e p.95 têm apenas 1-2 linhas (restos de parágrafo); p.99 contém só notas de rodapé; figuras (5.1-5.3, 6.1, 7.1-7.5, 8.1-8.3, 9.1-9.2, 10.1-10.3, 11.1, 12.1-12.2, 13.1) não têm conteúdo extraído, só legendas.
- Problemas de extração observados: trechos de código em C/C++ com quebras de linha perdidas (p.83-90); o texto em caixa-alta em p.126-128, 137, 140-144 (seções "Controle direcional", "Ocultando informações", "Conclusão", "Fábricas", etc.) está colado a títulos, com texto de seção misturado ao título; nomes de componentes foram traduzidos de forma confusa ("Interface" no cap. 8 parece designar o componente que contém as regras de negócio; no original em inglês isso seria provavelmente "Interactor", [fora do livro], não confirmado pelo texto); "Fechamento Comum" com erro de grafia no título (p.159 "PRINCPLE"); inconsistências FinancialGateway/FinancialDataGateway (p.125); "2008" e "20008" na p.148-149 são octais com subscrito perdido; p.107 menciona "meia-noite" corretamente. Tabela de despacho p.134 com colunas desalinhadas. Última página (164) truncada.
- Capítulos/seções cobertos integralmente: cap. 7, 8, 9, 10, 11, 12, introdução da Parte III e da Parte IV.
- Capítulos/seções que continuam de outro bloco: cap. 5 (começa antes da p.83), na parte de encapsulamento.
- Capítulos/seções que continuam em outro bloco: cap. 13 (diagrama de tensão, p.164, termina truncado).

## Auditoria da skill atual
Fonte auditada: skills/clean-architecture-expert/SKILL.md (v1.0), references/hexagonal-structure.md, references/use-case-example.md. Páginas = PDF PAGINA do bloco 02 (p.83-164). Só o que está neste bloco conta como suporte; o resto da skill está marcado [fora do livro neste bloco], o que não significa erro, apenas que este bloco não o sustenta (pode estar em outro bloco).

### (a) A skill afirma e o bloco confirma
- "Dependency Rule: dependências apontam para dentro; Domain não depende de Infrastructure/BD/APIs": o bloco mostra a UI e o BD dependendo das regras de negócio, com o código das regras nunca mencionando UI ou BD [p.97-98, Fig. 5.3]; e anuncia a "Regra da Dependência" como dependências cruzando o limite rumo ao lado mais abstrato [p.144]. Ressalva em (b): o critério do livro neste bloco é abstrato/nível de política, não camadas concêntricas.
- "Framework e banco de dados são detalhes": UI e BD tratados como plug-ins das regras de negócio [p.97]; detalhes de baixo nível ficam em módulos de plug-in, independentes da política de alto nível [p.98]; acoplar o sistema a um framework que embute um BD específico expõe S a mudanças e falhas de D [p.137-138]. O bloco não diz literalmente "BD é detalhe".
- "Usar interfaces para abstrações externas; repositório como interface do lado do domínio e implementação fora": DIP exige dependências de código-fonte só para abstrações [p.139-140]; FinancialDataGateway existe para inverter a dependência que iria da regra de negócio para o BD [p.127]; a implementação aponta para a abstração [p.125].
- "Proteger as regras de negócio": o componente com as regras contém as políticas de nível mais alto e é o mais protegido; os periféricos são menos protegidos [p.126].
- "Aplicar SOLID": os cinco princípios são apresentados e aplicados em nível arquitetural [p.109-144]. A skill só cita SOLID de forma genérica (ver c).
- "Lógica de negócio fora de controllers/DTOs" (apoio indireto): o cap. 8 separa o cálculo dos dados relatáveis da apresentação e do controlador por razões de mudança diferentes (SRP) [p.123-124, Fig. 8.1-8.2]. Não fala de DTO.
- Tabela de camadas de hexagonal-structure.md (adapters dependem de application, application de domain): coerente com "para A ser protegido de B, B deve depender de A" [p.125, legenda Fig. 8.3] e com o controlador sendo protegido de mudanças nos apresentadores [p.125-126].
- "Infrastructure/configuração como lugar das implementações concretas": o componente concreto (frequentemente main) reúne as violações do DIP e instancia a fábrica concreta [p.143-144]; compatível com `configuration/` em infrastructure.
- Sequência "Negócio -> Casos de Uso -> Entidades -> Persistência": compatível com o BD dependendo das regras de negócio [p.97]; a ordem Casos de Uso -> Entidades não é tratada neste bloco.

### (b) A skill afirma e o bloco contradiz ou não suporta
Contradição ou tensão (com página):
- Absolutos da skill ("Nunca acoplar...", "Sempre usar interfaces para abstrações externas", "Nunca misturar domínio e infraestrutura"): o bloco diz que tratar o DIP como regra absoluta é impraticável e que se toleram concretos estáveis (ex. java.lang.String, SO, facilidades de plataforma); o alvo é evitar concretos voláteis [p.140]. Também diz que as violações do DIP não somem, mas devem ser reunidas em poucos componentes concretos como o main [p.143-144]. Sugestão: qualificar as regras da skill por estável vs volátil.
- Critério da Dependency Rule: a skill a define por camadas fixas (Infrastructure -> Adapters -> Application -> Domain). O bloco só a define como rumo ao mais abstrato / de nível mais alto [p.143-144, p.126]; as camadas nomeadas pela skill não aparecem neste bloco.
- Tabela de hexagonal-structure.md, "infrastructure pode depender de: Qualquer camada": o bloco admite que o componente concreto dependa do abstrato e que cada fronteira seja cruzada em um só sentido [p.125, p.143]. "Qualquer camada" é permissivo demais frente a isso.
- Controller depende direto da classe concreta do caso de uso (use-case-example.md): no exemplo do livro, o controlador fala com o componente de regras por uma interface (FinancialReportRequester) para não saber demais dos detalhes e evitar dependências transitivas [p.127]. O livro sugere interface de entrada; a skill não.
- Termo "Ator" ("identifique: Ator, Objetivo, Entrada, Saída"): no bloco, "ator" é o grupo de pessoas que exige a mesma mudança e define o SRP [p.114]; na skill é o usuário do caso de uso. Não é contradição, mas pode confundir quem cruza as duas fontes.
- "Casos de Uso são o centro do sistema": este bloco dá o centro às regras de negócio/políticas de nível mais alto [p.126]; não menciona Casos de Uso. Não suportado aqui.

Não suportado por este bloco (podem estar em outros blocos; [fora do livro neste bloco] até confirmação):
- Entities, Value Objects, Aggregates, Domain Events, Domain Services, DDD.
- Arquitetura Hexagonal, Ports & Adapters, Screaming Architecture, pacotes por contexto de negócio vs por tipo técnico.
- Sagas, Outbox, Retry, Circuit Breaker, sistemas distribuídos e microsserviços.
- Estrutura de pastas domain/application/adapters/infrastructure.
- Testabilidade ("casos de uso testáveis sem banco/API/mensageria"): o bloco não menciona testes nem TDD; o plug-in é descrito para dispositivos IO, UI e BD [p.92-98], sem dizer que isso viabiliza testes.
- Anti-padrões específicos (@Entity/@Column em entidade, repositório injetado em entidade, modelar por tabelas).
- Frase da Regra Máxima ("A única forma de desenvolver software rapidamente..."): não aparece em p.83-164.
- "Como será alterada daqui a 1 ano?" etc.: só apoio parcial na ideia de reduzir o código a mudar ao mínimo [p.123] e de proteção por hierarquia [p.126].

### (c) O que o bloco traz e a skill não cobre
1. Fluxo de controle versus direção da dependência de código-fonte como essência da inversão; a interface existe só no código-fonte; qualquer dependência pode ser invertida [p.94-97, Fig. 5.1-5.2]. ALTA. clean-architecture-expert: novo reference de dependências e plug-ins; a skill só diz "dependências apontam para dentro", sem o mecanismo.
2. Arquitetura de plug-in: UI e BD como plug-ins; regras de negócio em componente separado, implantável e desenvolvido de forma independente [p.92-94, p.97-98]. ALTA. clean-architecture-expert.
3. SRP corretamente definido: um módulo, um ator (grupo que pede a mudança); distinção de "função faz uma coisa"; sintomas (duplicação acidental, fusões) e soluções (dados separados, Facade) [p.113-119]. ALTA. clean-architecture-expert; nota em clean-code-expert para a distinção com funções e duplicação acidental [p.114, p.116-117]. A skill cita SOLID mas não define nenhum princípio.
4. OCP arquitetural: SRP + DIP, particionar em componentes, setas unidirecionais, hierarquia de proteção por nível, interfaces que invertem e que ocultam (Requester) para evitar dependências transitivas [p.122-127]. ALTA. clean-architecture-expert.
5. LSP em nível de arquitetura (interfaces, REST); sinal de violação: chamador precisa de if por fornecedor e surgem mecanismos extras de configuração [p.131-134]. MÉDIA. clean-architecture-expert (checklist de revisão).
6. ISP/CRP arquiteturais: não depender de framework/componente com itens não usados; depender de um componente é depender de todo ele [p.136-138, p.161-163]. MÉDIA. clean-architecture-expert.
7. Regras práticas do DIP: não referir concretos voláteis; não derivar de concretos voláteis; não sobrescrever funções concretas; nunca mencionar nome de concreto volátil; Abstract Factory; main como componente concreto; estável vs volátil [p.139-144]. ALTA. clean-architecture-expert.
8. Limite arquitetural (linha curva separando abstrato de concreto, dependências cruzando no mesmo sentido, controle no sentido oposto) e SRP como Eixo da Mudança que gera limites [p.120, p.143-144]. ALTA. clean-architecture-expert; a skill não define "limite".
9. Componente como unidade de implantação e as regras de coesão REP/CCP/CRP, com diagrama de tensão e evolução por maturidade (no início o CCP pesa mais que o REP) [p.146-147, p.156-164]. ALTA. clean-architecture-expert; o fim do diagrama está no bloco seguinte. A skill não trata de componentes.
10. Fechamento estratégico: 100% de fechamento é inatingível; fechar para as mudanças mais prováveis [p.160]. MÉDIA. clean-architecture-expert.
11. Mutabilidade e concorrência como preocupação arquitetural: segregar componentes mutáveis e imutáveis; memória transacional; event sourcing como opção (guardar transações, não estado) [p.103-107]. MÉDIA. clean-architecture-expert; a skill cita "Event Driven" só como domain/integration events. Cuidado: o livro apresenta event sourcing como possibilidade condicionada [p.106-107], não como padrão preferido.
12. Paradigmas restringem, não adicionam poder; software é sequência, seleção, iteração e indireção [p.107-108]. BAIXA. Descartar ou nota de contexto.
13. SOLID por níveis (módulo -> componente -> arquitetura) e advertência de que tijolos bons não evitam bagunça arquitetural [p.109-110]. MÉDIA. clean-architecture-expert.
14. testing-tdd-expert: o bloco não traz material sobre testes por camada ou TDD (NENHUMA/BAIXA). Só há o pré-requisito estrutural de independência de detalhes [p.92-98], sem menção a testes.
15. clean-code-expert: o bloco separa código limpo (tijolos) dos princípios SOLID [p.109]; apenas a distinção SRP vs "função faz uma coisa" [p.114] é aproveitável.

Resumo operacional (a partir deste bloco apenas): (1) acrescentar reference de SOLID arquitetural (SRP por ator, OCP/hierarquia de proteção, LSP, ISP, DIP com regras práticas); (2) acrescentar o mecanismo "fluxo de controle vs dependência" e plug-in; (3) acrescentar reference de princípios de componentes (REP, CCP, CRP e tensão); (4) qualificar os "Sempre/Nunca" pela distinção estável/volátil; (5) considerar interface de entrada entre controller e caso de uso no exemplo; (6) revisar a tabela "infrastructure pode depender de qualquer camada"; (7) esclarecer o termo "Ator" para não colidir com o do SRP. Itens de testabilidade, DDD e hexagonal da skill exigem verificação em outros blocos do livro.
