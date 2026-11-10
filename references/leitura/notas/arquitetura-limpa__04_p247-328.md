# Notas: Arquitetura Limpa (Robert C. Martin), bloco 04, PDF p.247-328

Convenção: "p.N" = marcador "PDF PAGINA N". Números impressos de página não são visíveis no texto extraído (sem rodapé/cabeçalho), então não há "impr. M". Figuras não foram extraídas (só legendas e o texto que as descreve).

---

### Cap. 18 (final): Limites: traçando linhas, trecho "Cruzando limites" até Conclusão (PDF p.247-252) [continua do bloco anterior]
Resumo: Fecha o capítulo descrevendo as formas físicas de um limite arquitetural, da mais fraca (monolito) à mais forte (serviço). Em todas, a regra de dependência é a mesma: o código de alto nível não conhece o de baixo nível, que funciona como plug-in. O que muda é o custo de comunicação.
Conceitos e regras:
- Cruzando o limite contra o fluxo de controle: o cliente de alto nível chama o serviço de baixo nível via interface; as dependências de código-fonte apontam para o lado de alto nível, e a definição da estrutura de dados fica no lado que chama o limite [p.247]
- Monolito (ligação estática): mesmo assim o particionamento disciplinado ajuda times a trabalhar sem se atrapalhar e mantém o alto nível independente de detalhes; comunicação é chamada de função, barata e muito "agitada" (chatty) [p.247-248]
- Componentes de implantação (DLL, jar, Gem, biblioteca compartilhada): desacoplamento em nível de implantação, entregues em binário; mesmo espaço de endereço, comunicação ainda barata [p.248]
- Threads não são limites arquiteturais nem unidades de implementação, apenas organizam cronograma/ordem de execução [p.248-249]
- Processo local: limite físico mais forte, espaços de endereço distintos, comunicação por sockets, filas etc.; custo moderado (chamadas ao SO, serialização, troca de contexto), então a comunicação deve ser limitada. Código de alto nível não deve conter nomes, endereços físicos ou chaves de registro de processos de baixo nível; estes são plug-ins [p.249-250]
- Serviço: limite mais forte; assume que toda comunicação é pela rede, latência de décimos de ms a segundos, evitar comunicar quando possível; mesmas regras: serviços de baixo nível como plug-ins, sem conhecimento físico (ex.: URI) no código de alto nível [p.251]
- Quase todo sistema não monolítico mistura estratégias de limite; um serviço costuma ser fachada de processos locais; sobra uma mistura de limites "agitados" e de limites sensíveis a latência [p.251-252]
- Nota de rodapé: polimorfismo estático (genéricos/templates) pode gerenciar dependências em monolitos, mas não protege de recompilação/reimplantação como o polimorfismo dinâmico [p.252]
Citações curtas de prova:
- "Os processos de nível mais baixo devem ser plug-ins para os processos de nível mais alto" (paráfrase quase literal do texto) [p.250]
O que este trecho NÃO diz: não dá critério para escolher qual tipo de limite usar; não fala de camadas internas.
Relevância: clean-architecture-expert: MÉDIA, ancora que limite não é só "serviço" e que a Dependency Rule vale em qualquer nível de granularidade. testing-tdd-expert: NENHUMA. clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (references/boundaries.md, tabela dos tipos de limite e custo de comunicação).

---

### Cap. 19: Política e nível (PDF p.253-259)
Resumo: Um sistema é um conjunto de declarações de política. Políticas devem ser separadas e reagrupadas por razão/momento de mudança, formando um grafo acíclico dirigido de componentes onde as dependências apontam para o nível mais alto. "Nível" é a distância das entradas e saídas.
Conceitos e regras:
- Políticas que mudam pelas mesmas razões e nos mesmos momentos ficam no mesmo componente; as que mudam por razões/momentos diferentes ficam em componentes diferentes [p.254]
- Dependências relevantes são as de código-fonte em tempo de compilação (import, using, require) [p.254]
- Nível = distância das entradas/saídas; quanto mais longe, mais alto o nível; políticas que lidam com I/O são as de nível mais baixo [p.254-255]
- Fluxo de dados e dependências de código-fonte nem sempre apontam na mesma direção; queremos dependência desacoplada do fluxo de dados e acoplada ao nível [p.255]
- Contra-exemplo: `encrypt()` chamando `readChar`/`writeChar` diretamente faz a função de alto nível depender das de baixo nível [p.255-257]
- Melhor arquitetura: classe `Encrypt` com interfaces `CharReader`/`CharWriter` dentro do limite; Console* implementam; todas as dependências que cruzam o limite apontam para dentro [p.257]
- Políticas de nível alto mudam com menos frequência e por razões mais importantes; as de baixo nível mudam com frequência e urgência, mas por razões menos importantes (ex.: dispositivos de I/O mudam mais que o algoritmo) [p.258]
- Componentes de nível baixo são plug-ins dos de alto nível (Encryption não conhece IODevices; IODevices depende de Encryption) [p.258]
- Conclusão cita SRP, OCP, CCP, DIP, SDP e SAP como misturados na discussão, e pede ao leitor que os identifique [p.258-259]
Citações curtas de prova:
- "Queremos que as dependências de código-fonte sejam desacopladas do fluxo de dados e acopladas ao nível." [p.255]
O que este trecho NÃO diz: não define formalmente SDP/SAP/CCP aqui (só os cita); não usa "camadas", apenas níveis/componentes.
Relevância: clean-architecture-expert: ALTA, definição operacional de "nível" e critério de agrupamento de políticas; a skill não define por que "dentro" é mais alto. testing-tdd-expert: NENHUMA. clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (SKILL.md, princípio de nível/política; exemplo encrypt em references).

---

### Cap. 20: Regras de negócio (PDF p.260-267)
Resumo: Distingue Regras Cruciais de Negócio (existem mesmo sem automação) das regras específicas da aplicação. As primeiras, com seus Dados Cruciais, vivem em Entidades; as segundas, em Casos de Uso, que orquestram as Entidades e são específicos de uma aplicação.
Conceitos e regras:
- Regra crucial de negócio: gera ou economiza dinheiro mesmo se executada manualmente (ex.: juros de empréstimo); Dados Cruciais são os que ela exige; regra + dados formam uma Entidade [p.260-261]
- Entidade: objeto (ou módulo) que incorpora poucas regras cruciais operando sobre dados cruciais; sua interface são funções que implementam essas regras. Independente de banco, UI e frameworks; "puro negócio e nada mais". Não exige linguagem OO, só reunir dados e regras em um módulo separado [p.261-262]
- Caso de uso: regra de negócio específica da aplicação; só faz sentido como parte de um sistema automatizado. Especifica entrada, saída e passos de processamento [p.263]
- Exemplo: o banco exige confirmar contato e pontuação de crédito >= 500 antes da tela de estimativa de pagamento; isso é caso de uso, não entidade [p.263]
- Casos de uso controlam "a dança das Entidades": definem como e quando as regras cruciais são invocadas [p.264]
- Casos de uso não descrevem a UI; não se deve conseguir dizer, a partir deles, se é web, console ou serviço [p.264]
- Um caso de uso é um objeto com funções e com dados (entrada, saída, referências a Entidades) [p.265]
- Entidades não conhecem os casos de uso (DIP). Entidades são de nível mais alto porque generalizam e ficam longe de I/O; casos de uso são mais próximos de I/O de uma aplicação específica [p.265]
- Modelos de Request/Response: estruturas de dados simples, sem derivar de HttpRequest/HttpResponse nem depender de nada; o caso de uso não deve saber de HTML ou SQL [p.265-266]
- Não colocar referências a Entidades dentro dos modelos request/response, mesmo que compartilhem muitos dados: razões de mudança diferentes; violaria CCP e SRP e geraria "tramp data" e condicionais [p.266]
- Regras de negócio são o núcleo, devem ser o código mais independente e reutilizável; preocupações menores são plug-ins [p.266-267]
Citações curtas de prova:
- "Os casos de uso controlam a dança das Entidades." [p.264]
- "A Entidade é puro negócio e nada mais." [p.262]
O que este trecho NÃO diz: não menciona Aggregates, Value Objects, Repositórios nem Domain Services (vocabulário DDD); não diz onde ficam validações de formato de entrada.
Relevância: clean-architecture-expert: ALTA, distinção Entidade (regra crucial, reutilizável) versus Caso de Uso (regra específica da aplicação), e regra de request/response sem Entidades. testing-tdd-expert: BAIXA. clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (corrigir "use case não contém regra de negócio"; adicionar request/response models e a regra de não referenciar Entidades).

---

### Cap. 21: Arquitetura gritante (PDF p.268-272)
Resumo: A estrutura de topo do sistema deve revelar o domínio e os casos de uso (como a planta de uma casa ou biblioteca), não o framework. Frameworks são ferramentas; a arquitetura deve permitir adiar decisões e testar casos de uso sem framework.
Conceitos e regras:
- Teste prático: ao olhar diretórios e pacotes de topo, eles gritam "Sistema de Saúde/Contabilidade" ou "Rails/Spring/ASP"? [p.269]
- Arquitetura = estrutura que suporta os casos de uso (Jacobson); se é baseada em frameworks, não está baseada em casos de uso [p.269-270]
- Boa arquitetura adia decisões sobre framework, banco, servidor web; permite mudar de ideia; enfatiza casos de uso e os desacopla de preocupações periféricas [p.270]
- A web é mecanismo de entrega, um dispositivo de I/O, não impõe a arquitetura; deve ser possível entregar como console, web, thick client ou serviço sem mudar a arquitetura básica [p.270-271]
- Frameworks: ter ceticismo, perguntar o custo, como se proteger, e desenvolver estratégia para o framework não tomar conta da arquitetura [p.271]
- Arquitetura testável: testar todos os casos de uso sem servidor web nem banco; Entidades como objetos simples sem dependências de framework ou banco [p.272]
- Conclusão: novos programadores devem ver "sistema de assistência médica" ao abrir o repositório; MVC e afins são detalhes a decidir depois [p.272]
Citações curtas de prova:
- "Os frameworks são ferramentas à nossa disposição e não arquiteturas a que devemos nos resignar." [p.270]
- "A web é um mecanismo de entrega — um dispositivo IO" [p.271]
O que este trecho NÃO diz: não proíbe pastas por tipo técnico (controllers/, services/); o contraste apresentado é domínio versus nomes de framework (Rails, Spring/Hibernate, ASP). Não prescreve uma estrutura de pastas.
Relevância: clean-architecture-expert: ALTA (Screaming Architecture, adiar decisões, web como detalhe). testing-tdd-expert: MÉDIA (casos de uso testáveis sem framework). clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (manter seção; ajustar a justificativa da regra "nunca controllers/services").

---

### Cap. 22: Arquitetura limpa (PDF p.273-284)
Resumo: Unifica Hexagonal, DCI e BCE num diagrama de círculos concêntricos regido pela Regra da Dependência. Descreve as quatro camadas, como cruzar limites com inversão de dependência, que dados podem cruzar e um cenário web típico com Controller, Input/Output Boundary, Interactor, Presenter e ViewModel.
Conceitos e regras:
- Todas as arquiteturas citadas (Hexagonal/Ports and Adapters, DCI, BCE) visam separação de preocupações em camadas, com ao menos uma camada de regras de negócio e outra de UI/sistema [p.273-274]
- Características: independência de frameworks, testabilidade (regras sem UI, banco, servidor web), independência de UI, de banco e de qualquer agência externa [p.274-275]
- Regra da Dependência: dependências de código-fonte apontam só para dentro, na direção das políticas de nível mais alto. Nada declarado num círculo externo (funções, classes, variáveis) pode ser nomeado por código interno [p.275-276]
- Formatos de dados declarados no círculo externo, especialmente se gerados por framework, não devem ser usados no interno [p.276]
- Entidades: regras cruciais da empresa inteira, reutilizáveis por várias aplicações; para uma única aplicação, são seus objetos de negócio. Não devem ser afetadas por mudanças de navegação de página ou segurança nem por mudança operacional de uma aplicação específica [p.277]
- Casos de uso: regras específicas da aplicação; orquestram o fluxo de dados de/para as Entidades; isolados de banco, UI e frameworks; mudanças na operação da aplicação os afetam [p.278]
- Adaptadores de interface: convertem dados do formato dos casos de uso/entidades para o formato do agente externo e vice-versa. Todo MVC (apresentadores, visualizações, controladores) fica aqui; "modelos" são estruturas de dados passadas. Todo o SQL fica restrito a esta camada (partes ligadas ao banco); também há adaptador para serviços externos [p.279]
- Frameworks e drivers: camada mais externa (banco, framework web), basicamente código de ligação ("glue"); web e banco são detalhes mantidos fora [p.280]
- Quatro círculos são esquemáticos; pode haver mais, mas a Regra da Dependência sempre se aplica; para dentro, mais abstrato e de nível mais alto [p.280]
- Cruzar limites: fluxo de controle (controller -> caso de uso -> presenter) contraria a direção das dependências; resolve-se com DIP: o caso de uso chama uma interface (output port) no círculo interno e o presenter, no externo, a implementa. Mesma técnica serve para todos os limites [p.281]
- Dados que cruzam limites: estruturas simples/DTOs ou argumentos de função, nunca Entidades nem registros/linhas de banco; os dados devem estar na forma mais conveniente para o círculo interno [p.282]
- Cenário típico (Java web): Controller empacota dados em objeto simples e passa via InputBoundary ao UseCaseInteractor, que usa DataAccessInterface para persistir, constrói OutputData e passa via OutputBoundary ao Presenter [p.282-283]
- Presenter converte OutputData em ViewModel (Strings e flags; datas e moedas já formatadas; nomes de botões e flags de habilitação), deixando a View quase sem lógica [p.283-284]
- Conclusão: separar em camadas e obedecer a Regra torna o sistema intrinsecamente testável e permite trocar partes obsoletas (banco, framework web) com esforço mínimo [p.284]
Citações curtas de prova:
- "As dependências de código-fonte devem apontar apenas para dentro, na direção das políticas de nível mais alto." [p.275]
- "Não queremos trapacear nem transmitir objetos Entidade ou registros das bases de dados." [p.282]
- "A web é um detalhe. A base de dados é um detalhe." [p.280]
O que este trecho NÃO diz: não menciona Aggregates, Value Objects, Domain Events, CQRS, Repository (usa "gateway"/DataAccessInterface). Não diz em qual círculo fica a interface DataAccessInterface (a figura não foi extraída). Não mostra como mapear as quatro camadas em pastas.
Relevância: clean-architecture-expert: ALTA (núcleo). testing-tdd-expert: MÉDIA (testabilidade como consequência da Regra). clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (SKILL.md: quatro círculos + "podem ser mais"; references: fluxo Controller/Boundary/Interactor/Presenter/ViewModel; regra de dados cruzando limites).

---

### Cap. 23: Apresentadores e objetos Humble (PDF p.285-290)
Resumo: O padrão Humble Object separa comportamento difícil de testar (objeto humilde) do fácil de testar. Aplica-se a Presenter/View, gateways de banco, ORMs e service listeners; costuma haver um Humble Object junto a cada limite arquitetural.
Conceitos e regras:
- Humble Object: padrão de testes (origem em xUnit Patterns) que divide um comportamento em dois módulos, um humilde (difícil de testar, o mais simples possível) e um testável [p.286]
- GUI: View é o humble (move dados para a tela sem processá-los); Presenter é testável (formata dados da aplicação, p.ex. Date, Currency, em strings/flags no View Model) [p.286-287]
- Tudo que aparece na tela e a aplicação controla vira string, boolean ou enum no View Model [p.287]
- A separação em partes testáveis e não testáveis muitas vezes define um limite arquitetural; Presenter/View é um deles, há muitos outros [p.288]
- Gateways de banco: interfaces polimórficas com um método por operação CRUD necessária (ex.: método para sobrenomes de usuários logados após uma data). Sem SQL na camada de casos de uso; a implementação do gateway é o humble. Os interactors não são humildes (têm regras específicas da aplicação), mas são testáveis porque gateways podem ser substituídos por stubs/test doubles [p.288]
- ORM: "não existe" mapeamento objeto-relacional, pois objeto expõe comportamento e não dados; melhor chamar de "data mappers"; vivem na camada de banco, formando outro limite Humble entre gateways e o banco [p.289]
- Service listeners: dados carregados em estruturas simples e passados pelo limite; do lado de entrada, o listener formata em estrutura simples para a aplicação [p.289-290]
- Conclusão: perto de cada limite há provavelmente um Humble Object; a comunicação usa estruturas simples e o limite separa difícil de testar de fácil de testar [p.290]
Citações curtas de prova:
- "A Visualização é um objeto humble difícil de testar." [p.286]
- "não existe esse negócio de mapeamento ou objeto relacional (ORM)" [p.289]
O que este trecho NÃO diz: não fala de TDD, mocks vs stubs em detalhe, nem de frameworks de teste.
Relevância: clean-architecture-expert: ALTA (Presenter/View Model, gateways, ORM como detalhe de banco). testing-tdd-expert: ALTA (Humble Object, test doubles em gateways, onde cortar para testar). clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (references/presenters-and-humble-objects.md) e em testing-tdd-expert (padrão Humble Object).

---

### Cap. 24: Limites parciais (PDF p.291-295)
Resumo: Limites completos são caros (interfaces recíprocas, estruturas Input/Output, componentes independentes). Quando o arquiteto acha que talvez precise de um, pode reservar o lugar com um limite parcial, aceitando o risco de ele degradar.
Conceitos e regras:
- Limite completo exige interfaces Boundary recíprocas, estruturas de dados Input/Output e gestão de dependências para componentes compiláveis e implantáveis separadamente, tanto para criar quanto para manter [p.291]
- O design antecipatório conflita com o YAGNI, mas às vezes o arquiteto pensa "talvez sim" e faz um limite parcial [p.292]
- Pule o último passo: faz-se todo o trabalho dos componentes separados (interfaces, estruturas I/O) mas compila-se e implanta-se como um só; evita gestão de versões e releases. Exemplo: servidor web do FitNesse separável do wiki; com o tempo a separação enfraqueceu e as dependências cruzaram na direção errada [p.292-293]
- Limite unidimensional: padrão Strategy (ServiceBoundary implementada por ServiceImpl); reserva a inversão de dependência, mas sem interfaces recíprocas só a disciplina evita o "backchannel" [p.293-294]
- Fachada (Facade): sacrifica até a inversão de dependência; o cliente tem dependência transitiva de todas as classes de serviço, é forçado a recompilar em linguagens estáticas e backchannels são fáceis [p.294-295]
- Cada abordagem tem custo/benefício e pode degradar se o limite completo nunca vier; cabe ao arquiteto decidir onde pode haver limite e se será total ou parcial [p.295]
Citações curtas de prova:
- "Os limites arquiteturais completamente desenvolvidos são caros." [p.291]
O que este trecho NÃO diz: não dá critério numérico para escolher; diz que são só três exemplos entre muitos.
Relevância: clean-architecture-expert: ALTA (a skill manda sempre usar interfaces e Ports & Adapters, sem discutir custo nem limite parcial). testing-tdd-expert: BAIXA. clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (references/boundaries.md: custo, três formas parciais, risco de degradação).

---

### Cap. 25: Camadas e limites (PDF p.296-305)
Resumo: Com o jogo Hunt the Wumpus como modelo, mostra que há mais limites do que "UI, regras, banco": cada eixo de mudança (idioma, meio de entrega, persistência, rede, política de jogador) pode ser um limite potencial. A API do limite pertence ao componente que a usa. Cabe ao arquiteto ponderar custo e decidir continuamente.
Conceitos e regras:
- Pensar só em UI/regras/banco serve para sistemas simples; a maioria usa mais componentes [p.296]
- Exemplo: UI texto desacoplada das regras do jogo por API independente de idioma; persistência atrás de API; dependências segundo a Regra [p.297-298]
- Cada eixo de mudança independente (idioma versus mecanismo de entrega do texto: janela, SMS, chat) pode definir um limite arquitetural potencial [p.298-299]
- A API de cada limite é definida e pertence ao usuário (componente de nível mais alto) e não ao implementador [p.299-300]
- Diagrama simplificado: todas as setas (dependências de código-fonte) apontam para cima, GameRules no topo (políticas de nível mais alto); o fluxo de dados se divide em dois (comunicação com usuário, persistência) que se encontram em GameRules [p.300-301]; com rede, divide-se em três; "Central Transform" no rodapé 3 [p.301, 305]
- Os fluxos nem sempre convergem em um só componente: dentro de GameRules há política mecânica do mapa (MoveManagement) e política mais alta sobre vida do jogador (PlayerManagement), que recebe eventos (FoundFood, FellInPit) [p.302]
- Versão multiplayer: MoveManagement local e PlayerManagement em servidor com API de microsserviço torna aquele um limite totalmente desenvolvido [p.303]
- Moral: limites estão em todo lugar; implementá-los totalmente é caro e ignorá-los custa muito caro depois, mesmo com bons testes e refatoração [p.304]
- YAGNI tem sabedoria (excesso de engenharia costuma ser pior que a falta), mas às vezes o limite só é percebido quando custo e risco já são altos [p.304]
- Decisão não é única: observar a evolução, atentar a atrito por falta de limite, reavaliar com frequência e implementar o limite no ponto de inflexão em que custo de implementar < custo de ignorar [p.305]
- Rodapé: não se deveria aplicar arquitetura limpa a algo tão trivial quanto o jogo (cerca de 200 linhas); é só um modelo para sistema maior [p.305]
Citações curtas de prova:
- "A API é definida e pertencente ao usuário e não ao implementador." [p.299]
- "Você precisa adivinhar — com inteligência." [p.305]
O que este trecho NÃO diz: não oferece heurística quantitativa; não prescreve microsserviços.
Relevância: clean-architecture-expert: ALTA (propriedade da interface pelo lado de nível alto, limites por eixo de mudança, decisão de custo/inflexão, e aviso de que nem tudo precisa da arquitetura completa). testing-tdd-expert: BAIXA. clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (references/boundaries.md; contrapeso ao "sempre aplicar").

---

### Cap. 26: O componente Main (PDF p.306-311)
Resumo: Main é o componente mais sujo e de mais baixo nível: ponto de entrada, cria factories, strategies e utilitários globais e entrega o controle ao alto nível. É um plug-in da aplicação, podendo haver vários (dev, teste, produção, por cliente).
Conceitos e regras:
- Todo sistema tem ao menos um componente que cria, coordena e supervisiona os demais [p.306]
- Main é o detalhe final, a política de nível mais baixo; nada além do SO depende dele; cria factories/strategies/utilitários globais e passa o controle à parte abstrata de alto nível [p.306-307]
- Dependências devem ser injetadas por framework de Injeção de Dependência em Main; depois ele as distribui normalmente, sem o framework [p.307]
- Exemplo (Wumpus): Main carrega as strings que o corpo do código não deve conhecer, usa uma factory passando o nome da classe de uma fachada mais suja, cria o fluxo de entrada, contém o laço principal, interpreta comandos simples e delega o processamento; também cria o mapa [p.307-310] (código omitido nestas notas)
- Pensar em Main como plug-in por trás de um limite: facilita a configuração; pode-se ter um Main por ambiente, país, local ou cliente [p.310-311]
Citações curtas de prova:
- "Pense em Main como o mais sujo dos componentes sujos." [p.307]
O que este trecho NÃO diz: não prescreve framework de DI específico, nem fala de composition root pelo nome.
Relevância: clean-architecture-expert: ALTA (a skill só tem `infrastructure/configuration/` sem o conceito de Main/plug-in). testing-tdd-expert: MÉDIA (Main de teste como configuração alternativa). clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (seção sobre Main/composition root).

---

### Cap. 27: Serviços: grandes e pequenos (PDF p.312-322)
Resumo: Serviços (SOA, microsserviços) não são, por si, arquitetura. A arquitetura é definida por limites e pela Regra da Dependência. Os dois supostos benefícios (desacoplamento forte, desenvolvimento/implantação independentes) são parcialmente falácias, ilustradas pelo "problema do gato" em preocupações transversais, resolvido com design orientado a objetos/componentes dentro dos serviços.
Conceitos e regras:
- Serviços só separam comportamentos e são pouco mais que chamadas de função caras; têm importância arquitetural só se houver limites que separam política de alto nível de detalhes e obedeçam à Regra; podem trazer benefícios mesmo sem isso [p.312-313]
- Falácia do desacoplamento: serviços são desacoplados no nível de variáveis, mas ainda acoplados por recursos compartilhados e fortemente pelos dados trocados (novo campo exige mudar cada serviço que o usa); interfaces de serviço não são mais formais que interfaces de função [p.314]
- Falácia do desenvolvimento/implantação independentes: grandes sistemas já foram feitos com monolitos e componentes; e, se há acoplamento por dado ou comportamento, desenvolvimento, implantação e operação precisam ser coordenados [p.314-315]
- Problema do gato: no agregador de táxis (TaxiUI, TaxiFinder, TaxiSelector, TaxiDispatcher), a feature de entrega de gatos exige mudar todos os serviços; é o problema das preocupações transversais, que afeta qualquer sistema com decomposição funcional [p.315-318]
- Solução com objetos: usar SOLID para criar classes estendidas polimorficamente; componentes novos (Rides, Kittens) sobrescrevem classes abstratas (Template Method ou Strategy), seguem a Regra da Dependência, são criados por factories sob controle da UI; só a TaxiUI muda e um novo jar/Gem/DLL é carregado dinamicamente [p.318-319]
- Serviços baseados em componentes: cada serviço com design interno em componentes, novas features como novas classes derivadas (conforme OCP) sem reimplantar o serviço [p.319-320]
- Limites arquiteturais não ficam entre os serviços, mas atravessam os serviços dividindo-os em componentes; serviços devem ter arquitetura interna de componentes conforme a Regra da Dependência [p.321]
- Conclusão: serviço pode ser um único componente cercado por limite, ou vários componentes; em casos raros (ou nem tanto, segundo nota do autor) clientes e serviços são tão acoplados que não têm significância arquitetural [p.321-322]
- Nota: com microsserviços e times pequenos, o número de microsserviços tende ao número de programadores [p.316 rodapé 1, p.322]
Citações curtas de prova:
- "os serviços, por si só, não definem uma arquitetura." [p.313]
- "a experiência sugere o contrário" (sobre o acoplamento ser raro) [p.322, nota 2]
O que este trecho NÃO diz: não condena serviços/microsserviços nem dá critério de granularidade; não trata Sagas, Outbox, consistência de dados, observabilidade ou resiliência.
Relevância: clean-architecture-expert: MÉDIA (a skill tem seção de sistemas distribuídos sem este contrapeso). software-architecture/architecture-hard-parts-expert: ALTA [fora da lista de candidatos, mas relevante]. testing-tdd-expert: NENHUMA. clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (aviso: serviço não é arquitetura; arquitetura interna por componentes) e sinalizar ao orquestrador para a skill de grupo/hard-parts.

---

### Cap. 28: O limite Teste (PDF p.323-328)
Resumo: Testes são parte do sistema e fazem parte da arquitetura: são o círculo mais externo, dependem de tudo e nada depende deles. Se mal integrados ao design, ficam frágeis e tornam o sistema rígido. A solução é projetar para testabilidade e criar uma API de teste que desacople a estrutura dos testes da estrutura da aplicação.
Conceitos e regras:
- Testes participam da arquitetura como as demais partes [p.323]
- Do ponto de vista arquitetural, todos os testes são equivalentes (TDD, FitNesse, Cucumber, SpecFlow, JBehave); o livro não entra no debate de tipos de teste [p.324]
- Testes seguem a Regra da Dependência: são detalhados, concretos e dependem do código testado; são o círculo mais externo; são implantáveis independentemente (em sistemas de teste) e o componente mais isolado, sem usuário dependendo deles [p.324]
- Acham-se por vezes "fora do design" por isso; isso é "catastrófico": testes mal integrados são frágeis e tornam o sistema rígido [p.325]
- Problema dos Testes Frágeis: mudança em componente comum quebra centenas ou milhares de testes; exemplo: testes que verificam regras de negócio via GUI, partindo do login e navegando; mudança de página/navegação quebra muitos testes; desenvolvedores hesitam em mudar (sistema rígido) [p.325-326]
- Solução: incluir testabilidade no design; primeira regra do design de software, "não depender de coisas voláteis"; GUIs são voláteis; projetar para testar regras de negócio sem GUI [p.326]
- API de Teste: API específica com "superpoderes" (contornar segurança, recursos caros como bancos, forçar estados testáveis); superconjunto das interações e adaptadores de interface usados pela UI; objetivo é desacoplar a estrutura dos testes da estrutura da aplicação [p.326]
- Acoplamento estrutural: uma classe de teste por classe de produção e um método de teste por método de produção é um acoplamento profundo à estrutura; mudanças de produção quebram muitos testes. A API de teste esconde a estrutura da aplicação para que produção e testes evoluam separadamente, pois testes tendem a ficar mais concretos e produção mais abstrata [p.327]
- Segurança: se os superpoderes da API de teste forem perigosos em produção, mantê-los em componente separado e implantável de forma independente [p.327-328]
- Conclusão: testes que não são projetados como parte do sistema tendem a ser frágeis e acabam descartados na manutenção [p.328]
Citações curtas de prova:
- "A primeira regra do design de software [...] é sempre a mesma: não dependa de coisas voláteis." [p.326]
- "Isso é conhecido como o Problema dos Testes Frágeis." [p.325]
- "o objetivo é desacoplar a estrutura dos testes da estrutura da aplicação." [p.326]
O que este trecho NÃO diz: não prescreve TDD, nem proporção de tipos de teste (pirâmide), nem mocks versus fakes, nem exemplo de código da API de teste.
Relevância: testing-tdd-expert: ALTA (testes frágeis, acoplamento estrutural 1:1 classe/método, API de teste, não testar regras via GUI). clean-architecture-expert: ALTA (testes como círculo externo, testes por camada: regras sem GUI/DB). clean-code-expert: NENHUMA.
Decisão sugerida: usar em testing-tdd-expert (critérios de desenho de testes) e em clean-architecture-expert (seção de testes por camada).

---

## Checklist de cobertura
- Primeira página lida: 247
- Última página lida: 328 (confirmado por Grep do último marcador: linha 2410, "=== PDF PAGINA 328 ===")
- Páginas sem texto útil ou ilegíveis: nenhuma totalmente vazia; as p.252, 259, 267, 305 são só rodapés/fechamento curtos; as figuras (18.2, 19.1-19.3, 20.1-20.2, 22.1-22.2, 24.1-24.2, 25.1-25.7, 27.1-27.4) não foram extraídas
- Problemas de extração observados: ligaduras "fi/ff" em formas como "ﬁ"; legendas de figuras fundidas ao parágrafo seguinte (p.258, 298, 299, 304); trechos em caixa-alta contínua nos boxes (p.297, 301-302, 306-307, 310-311); código Java de Main (p.307-310) com quebras de linha comprometidas; "Hunt the Wumpus" e "Cruzando os fluxos"/"Dividindo os fluxos" aparecem como sidebars em caixa-alta; a bibliografia/índice não aparecem neste bloco
- Capítulos/seções cobertos integralmente: 19, 20, 21, 22, 23, 24, 25, 26, 27, 28
- Capítulos/seções que continuam de outro bloco: 18 (começa antes da p.247, em "Cruzando limites contra o fluxo de controle")
- Capítulos/seções que continuam em outro bloco: nenhum (o Cap. 28 termina na p.328 com a Conclusão; o próximo capítulo não aparece)

---

## Auditoria da skill atual

Skill auditada: `skills/clean-architecture-expert/SKILL.md` (186 linhas) + `references/hexagonal-structure.md` + `references/use-case-example.md`. A skill foi lida depois de concluídas as notas acima.

### (a) O que a skill afirma e o bloco confirma
- Dependency Rule: dependências apontam para dentro, nada interno conhece nomes/formatos de círculos externos (skill: "dependências apontam para dentro"; "Application → Framework proibido") [p.275-276]
- "Arquitetura é mais importante que tecnologia" e "frameworks são detalhes de implementação": frameworks são ferramentas, não arquiteturas; adiar decisões de framework/banco [p.270-271, 280]
- "Banco de dados é um detalhe": a web e o banco são detalhes e ficam na camada mais externa [p.280]
- Casos de uso como centro do sistema e arquitetura que revela o negócio (Screaming Architecture): estrutura de topo deve gritar o domínio, a arquitetura suporta os casos de uso [p.269-270, 272]
- Testabilidade sem banco/API/UI: regras e casos de uso testáveis sem servidor web ou banco [p.272, 274, 284]; "Se não → arquitetura incorreta" é coerente com a ideia de testabilidade como atributo da boa arquitetura [p.288]
- Entidades sem frameworks nem persistência; `@Entity` em entidade de domínio como anti-padrão: a Entidade é independente de banco, UI e frameworks [p.262, 277], e ORMs pertencem à camada de banco como data mappers [p.289]; a separação de `Subscription` e `SubscriptionJpaEntity` na referência hexagonal é coerente com isso
- Lógica de negócio não fica em controller: controllers/presenters/views são adaptadores de interface, e as regras estão em Entidades e casos de uso [p.279, 263-265]
- SQL isolado fora do núcleo: "todo o SQL deverá ser restrito" à camada de adaptadores/banco; casos de uso não têm SQL, usam interfaces de gateway [p.279, 288]
- Interfaces para abstrações externas / inversão de dependência para o fluxo de controle cruzar o limite: caso de uso depende de interface; implementação no círculo externo [p.281, 288]; os dois pontos do exemplo (`SubscriptionRepository`, `EventPublisher` como interfaces) seguem esse mecanismo
- Hexagonal (Ports and Adapters) como uma das arquiteturas que a Clean Architecture integra [p.273-274]
- Caso de uso como unidade de análise com entrada, saída e regras (skill: "Ator, Objetivo, Entrada, Saída e Regras") [p.263: entrada, saída, passos de processamento; "Ator" não aparece explicitamente neste bloco]
- Domínio não depende de infraestrutura; domínio independente (tabela "domain: Nada externo") [p.277-278]
- Entidade com regra do negócio dentro dela (método `cancel()` na entidade) é compatível com "regras + dados num mesmo módulo" [p.261-262]
- Independência de UI: a mesma regra serve web, console, serviço [p.271, 274]

### (b) O que a skill afirma e o bloco contradiz ou não suporta
Contradições:
1. "Application: orquestra; não contém regra de negócio" (SKILL.md, comentário no exemplo) e "O use case apenas orquestra: não contém lógica de negócio" (use-case-example.md, "O que observar"): o livro diz o contrário para regras específicas da aplicação. O caso de uso contém "regras de negócio específicas da aplicação" e controla a dança das Entidades; o que ele não contém são as regras cruciais (que ficam nas Entidades) [p.263-264, 278]. Isso também torna incoerente a lista de anti-padrões ("lógica em services genéricos") se aplicada à camada de casos de uso como um todo. Correção sugerida: distinguir regra crucial (Entidade) de regra específica da aplicação (caso de uso).
2. "Hexagonal Architecture: usar Ports & Adapters sempre que houver integração externa" e "Sempre: usar interfaces para abstrações externas": o livro mostra que limites completos são caros de criar e manter e que o arquiteto deve ponderar custo e momento, podendo usar limites parciais ou ignorar o limite; o certo é decidir no ponto de inflexão [p.291-295, 304-305]. "Sempre" não é suportado.
3. "Nunca priorize ... otimizações prematuras" e a ausência de qualquer tensão com YAGNI: o livro reconhece o YAGNI mas também diz que a falta de limite custa muito se descoberta tarde [p.304]; a skill só cobre um lado.

Não suportado / tensão (o bloco não dá base ou dá base parcial):
4. "Nunca: controllers/ services/ repositories/ entities/ (pacotes por tipo técnico)": o livro contrasta o tema do domínio com nomes de framework (Rails, Spring/Hibernate, ASP) [p.269], não proíbe explicitamente pastas por tipo técnico. A regra da skill é uma extrapolação razoável do espírito, mas não é afirmação do livro. Além disso, a "Estrutura Arquitetural" principal da skill é `src/domain|application|adapters|infrastructure` (por camada técnica) e só a referência hexagonal põe o contexto de negócio no topo; a skill diz as duas coisas sem explicar que a estrutura de topo é a que deve gritar.
5. Estrutura com `domain/repositories/` (interface de repositório dentro do domínio): o livro fala em "gateways de banco" entre os interactors e o banco, com interfaces polimórficas por operação CRUD necessária à aplicação, implementadas na camada de banco [p.288]; a figura 22.2 (DataAccessInterface) não foi extraída, então o bloco não permite afirmar se a interface fica na camada de entidades ou de casos de uso. O nome "Repository" (DDD) e a colocação em `domain/` não são suportados por este bloco. Gateway orientado a necessidade do caso de uso (ex.: método com nome de consulta específico) difere do repositório genérico `findById/save`.
6. Entidade com `validateOwnership(requestingCustomer)` (use-case-example.md): verificar se o usuário autenticado é dono do recurso é uma regra de acesso/segurança da aplicação. O livro diz que Entidades não devem ser afetadas por mudanças de segurança ou navegação e que regras específicas da aplicação ficam em casos de uso [p.263, 277-278]. Não é contradição direta (a propriedade pode ser regra do negócio), mas é uma tensão que a skill não examina.
7. Command com tipos de domínio (`SubscriptionId`, `CustomerId` em `CancelSubscriptionCommand`): o livro exige request/response como estruturas simples, sem dependências e sem referências a Entidades [p.265-266]. Value Objects não são Entidades, então não é violação clara, mas a skill não afirma nem justifica a regra de modelo de request independente.
8. "Entities, Value Objects, Domain Services, Domain Events, Aggregates", "commands/queries" (CQRS), "Event Driven: preferir Domain Events e Integration Events", "Sistemas Distribuídos: eventos assíncronos, Sagas, Outbox, Retry, Circuit Breaker, idempotência, observabilidade": nada disso aparece no bloco. O livro usa "Entidade" no sentido de regra crucial da empresa/aplicação (Jacobson), sem Aggregates ou Value Objects [p.261, 277]. Sem suporte neste bloco (podem ter base em outros livros, ver skills `domain-driven-design`, `architecture-hard-parts-expert`).
9. Anti-padrão "Injetem repositórios ou serviços de infraestrutura em entidades": o bloco apoia o espírito (entidade independente de banco) [p.262, 277], mas não aborda explicitamente injeção.
10. "Regra Máxima: 'A única forma de desenvolver software rapidamente é desenvolvê-lo corretamente.'": nada no bloco 247-328 sustenta ou atribui essa frase.
11. "Permitido: Infrastructure → Adapters → Application → Domain" como cadeia linear de 4 camadas e tabela "infrastructure: pode depender de qualquer camada": o livro tem 4 círculos "esquemáticos", com Frameworks e Drivers como código de ligação, e diz que pode haver mais ou menos [p.280]; o mapeamento exato de nomes da skill (domain/application/adapters/infrastructure) não está no bloco. A separação `adapters/outbound` x `infrastructure/persistence` é interpretação da skill.
12. "Domínio não conhece: HTTP" e exemplo de controller Spring com `@AuthenticationPrincipal` na camada adapters: compatível, porém o livro diz que dados específicos de framework (formatos) não devem entrar no círculo interno [p.276, 282]; a skill acerta ao converter em Command no controller, só não enuncia a regra.

### (c) O que o bloco traz e a skill não cobre
Alta prioridade para clean-architecture-expert:
- Definição de "nível" como distância das entradas e saídas, e política agrupada por razão de mudança, formando um DAG de componentes [p.254-255, 258]
- Fluxo de controle versus dependência de código: a inversão que faz a dependência contrariar o fluxo (output port implementado pelo presenter) [p.247, 281]
- Input Boundary / Output Boundary / Interactor / Presenter / ViewModel (cenário típico) e Presenter formatando datas, moedas e flags, deixando a View humilde [p.282-284, 286-287]. O exemplo da skill devolve void e não tem porta de saída nem presenter
- Regras sobre dados que cruzam limites: estruturas simples, nunca Entidades nem linhas de banco; no formato mais conveniente para o círculo interno [p.282]; request/response não referenciam Entidades (CCP/SRP, tramp data) [p.266]
- Entidade = regra crucial da empresa, reutilizável entre aplicações; caso de uso = regra específica da aplicação; por que Entidades são de nível mais alto [p.261-265, 277]
- Padrão Humble Object e gateways de banco, ORM como "data mapper" no limite de banco, service listeners [p.286-290]
- Custo dos limites e limites parciais (pule o último passo, Strategy, Facade), com o risco de degradação (FitNesse) e o critério do ponto de inflexão [p.291-295, 304-305]
- Limites por eixo de mudança (Wumpus: idioma, meio de entrega, persistência, rede, política de jogador) e a API pertence a quem usa, não a quem implementa [p.297-303]
- Componente Main: sujo, de baixo nível, plug-in, um por configuração, ponto onde o framework de DI atua [p.306-311]
- Forma física dos limites (monolito, componentes de implantação, processo local, serviço) e custos de comunicação [p.247-252]
- Serviços não são arquitetura; falácias de desacoplamento e de independência; problema do gato (preocupações transversais); serviços com arquitetura interna de componentes [p.312-322]
- Quatro círculos como esquema (pode haver mais) [p.280]
- Web como dispositivo de I/O; ceticismo diante de frameworks; "estratégia para evitar que o framework tome conta da arquitetura" [p.270-271]

Alta prioridade para testing-tdd-expert (se for criada):
- Humble Object como técnica de design para testabilidade [p.286-290]
- Testes como parte da arquitetura e círculo mais externo; todos os tipos de teste são arquiteturalmente equivalentes [p.323-324]
- Problema dos Testes Frágeis e efeito de tornar o sistema rígido [p.325-326]
- "Não dependa de coisas voláteis": não verificar regras de negócio pela GUI [p.326]
- API de Teste (superpoderes, superconjunto das interações/adaptadores da UI) e componente separado por segurança [p.326-328]
- Acoplamento estrutural (um teste por classe/método de produção) e evolução independente de testes e produção [p.327]
- Gateways substituíveis por stubs/test doubles para testar interactors [p.288]

Para clean-code-expert: nada do bloco; o livro (Arquitetura Limpa) cobre princípios de projeto e arquitetura, não práticas de código limpo.

Itens fora de escopo da lista, mas relevantes ao orquestrador: a seção de serviços/microsserviços (cap. 27) é contrapeso para `architecture-hard-parts-expert`, `software-architecture` e `production-ready-microservices-expert`; a skill de grupo `software-architecture` cita essas skills.
