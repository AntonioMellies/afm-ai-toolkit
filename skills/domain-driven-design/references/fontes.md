# Fontes e Rastreabilidade (Domain-Driven Design)

Rastreabilidade das regras atribuídas ao livro nos arquivos `evans-*.md`. Livro: Eric Evans, *Domain-Driven Design: Tackling Complexity in the Heart of Software* (Addison-Wesley, 2003), lido no PDF em inglês e escrito aqui em português por paráfrase.

* **Páginas:** são as do marcador "PDF PAGINA N" do arquivo conferido, não a numeração impressa do livro.
* **Citações:** curtas (até 25 palavras), literais do texto em inglês, opcionais.
* O que não está nesta tabela e aparece nos arquivos como "convenção desta skill" não tem base no livro.
* As afirmações de `SKILL.md`, `tactical-design.md` e `event-storming.md` (versão 1.0) foram comparadas com o texto apenas nos pontos listados na seção final; não houve revisão linha a linha.

Abreviações: **CAL** = evans-camada-anticorrupcao-e-legado.md; **DES** = evans-destilacao-do-dominio.md; **EST** = evans-estrutura-em-larga-escala.md; **AGR** = evans-agregados-repositorios-fabricas.md.

---

## Integração entre contextos (CAL)

| Regra/ponto | Livro | Capítulo/seção | Págs. PDF | Citação curta |
|---|---|---|---|---|
| Duplicação de conceitos e falsos cognatos como sintomas de modelos misturados | Evans | 14, Recognizing Splinters | 301 | |
| Integração contínua só é essencial dentro do contexto | Evans | 14, Continuous Integration | 302-303 | |
| Context Map descreve a realidade atual; nomear contextos; não forçar nome de padrão; não mudar o mapa antes da realidade | Evans | 14, Context Map | 304-305, 311 | "Map the existing terrain. Take up transformations later." |
| Reuso de código entre contextos é um risco | Evans | 14, Context Map | 304 | "Code reuse between BOUNDED CONTEXTS is a hazard to be avoided." |
| Variáveis de escolha: controle, cooperação, grau de integração | Evans | 14, Relationships Between BC | 312 | |
| Shared Kernel: subconjunto compartilhado, mudança com consulta, testes de ambos, custo de coordenação e deploy | Evans | 14, Shared Kernel | 313-314, 317, 341 | "This explicitly shared stuff has special status, and shouldn't be changed without consultation with the other team." |
| Customer/Supplier: planejamento, testes de aceitação conjuntos na suíte do upstream, mesma gestão | Evans | 14, Customer/Supplier | 315-318 | "Establish a clear customer/supplier relationship between the two teams." |
| Conformist: aderir ao modelo do upstream; custo e quando vale; "seguir nem sempre é ruim" | Evans | 14, Conformist | 319-321, 339 | "Eliminate the complexity of translation between BOUNDED CONTEXTS by slavishly adhering to the model of the upstream team." |
| Anticorruption Layer: o problema (modelo novo corrompido; dados "primitivos" com significados diferentes) | Evans | 14, Anticorruption Layer | 322-323 | |
| ACL: camada isoladora na linguagem do próprio modelo, tradução nos dois sentidos | Evans | 14, Anticorruption Layer | 323 | "Create an isolating layer to provide clients with functionality in terms of their own domain model." |
| ACL: serviços, facade (no contexto do outro), adapter, translator sem estado | Evans | 14, Anticorruption Layer | 323-324 | |
| ACL: bidirecional, links de comunicação, refatorar o outro lado com testes, funcionalidades extras (auditoria), aproximar o modelo só seletivamente, virar Conformist | Evans | 14, Anticorruption Layer | 324-325 | |
| ACL entre subsistemas próprios com modelos distintos | Evans | 14, Anticorruption Layer | 325 | |
| Custo do isolamento (Grande Muralha); integração é sempre cara | Evans | 14, Anticorruption Layer | 326 | "Integration can be very valuable, but it is always expensive." |
| Separate Ways | Evans | 14, Separate Ways | 327-328, 338, 340 | "Integration is always expensive. Sometimes the benefit is small." |
| Open Host Service | Evans | 14, Open Host Service | 329 | "Define a protocol that gives access to your subsystem as a set of SERVICES." |
| Published Language; não congelar o modelo de um dos lados | Evans | 14, Published Language | 330-332 | "Use a well-documented shared language that can express the necessary domain information as a common medium of communication" |
| Guia de escolha: forças por contextos maiores ou menores; externos; sistema em projeto; uma equipe por contexto; jargões | Evans | 14, Choosing Your Model Context Strategy | 337-341 | |
| Testar pontos de contato entre contextos | Evans | 14, Testing at the Context Boundaries | 310 | |
| Projeto em andamento: mapear como está, apertar práticas, refatorar tradução para ACLs | Evans | 14, When Your Project Is Already Under Way | 341-342 | |
| Fusão de contextos (Separate Ways para Shared Kernel, depois integração contínua) | Evans | 14, Transformations | 343-345 | |
| Aposentar legado iteração por iteração com ACL | Evans | 14, Phasing Out a Legacy System | 345-346 | |
| De integrações ad hoc para Open Host Service e Published Language; não equiparar linguagem de troca ao modelo do host | Evans | 14, Transformations | 346 | |
| Não fragmentar contexto grande só por complexidade; considerar destilação e estrutura | Evans | 14 (final) | 347 | |
| Banco legado implica dois modelos coexistindo | Evans | 6, Designing Objects for Relational Databases | 144 | |

## Destilação (DES)

| Regra/ponto | Livro | Capítulo/seção | Págs. PDF | Citação curta |
|---|---|---|---|---|
| Cinco benefícios da destilação estratégica | Evans | 15, abertura | 348 | |
| Core Domain: definição; tendência de alocar mal os melhores desenvolvedores | Evans | 15, Core Domain | 350-351 | |
| Core: reduzir, aplicar melhores talentos, manter resto genérico, priorizar refatoração do Core | Evans | 15, Core Domain | 351 | "Boil the model down. Find the CORE DOMAIN" |
| Core depende do ponto de vista e evolui | Evans | 15, Core Domain, Choosing the Core | 351-352 | |
| Equipe do Core: longo prazo, com especialistas; mentor sim, externo de curto prazo não | Evans | 15, Who Does the Work? | 352 | |
| Core dificilmente é comprável; três leituras de um framework restritivo | Evans | 15, Who Does the Work? | 352-353 | "it is unlikely that the CORE DOMAIN can be purchased." |
| Escalada de técnicas de destilação | Evans | 15, An Escalation of Distillations | 354 | |
| Generic Subdomains: quando e como; prioridade menor, sem traço de especialidade | Evans | 15, Generic Subdomains | 355 | "Leave no trace of your specialties in them." |
| Quatro opções (pronta, modelo publicado, terceirizada, interna) | Evans | 15, Generic Subdomains | 355-358 | |
| Subdomínio genérico é o lugar de projetistas externos; menor confidencialidade | Evans | 15, Generic Subdomains | 358 | |
| Exemplo dos dois projetos de fuso horário | Evans | 15, A Tale of Two Time Zones | 358-360 | |
| Genérico não significa reutilizável | Evans | 15, Generic Doesn't Mean Reusable | 360 | |
| Primeiro corte do sistema deve se basear no Core (risco) | Evans | 15, Project Risk Management | 360 | |
| Domain Vision Statement: quando, como (cerca de uma página), exemplos de o que entra e não entra | Evans | 15, Domain Vision Statement | 362-363 | "Write a short description (about one page) of the CORE DOMAIN and the value it will bring" |
| Highlighted Core: distillation document (3 a 7 páginas), riscos | Evans | 15, Highlighted Core | 365-366 | "Write a very brief document (three to seven sparse pages) that describes the CORE DOMAIN" |
| Flagged Core; documento como ferramenta de processo | Evans | 15, Highlighted Core | 366-367 | |
| Cohesive Mechanisms: quando, como, modelo propõe e mecanismo dispõe | Evans | 15, Cohesive Mechanisms | 369-370 | "A model proposes; a COHESIVE MECHANISM disposes." |
| Mecanismo no Core (exceção) e ciclo completo | Evans | 15, Cohesive Mechanisms | 370-371 | |
| Segregated Core: passos, custos, decisão de equipe | Evans | 15, Segregated Core | 373-374 | "Factor all generic or supporting elements into other objects and place them into other packages" |
| Exemplo do Core de transporte de cargas (pacote Delivery) | Evans | 15, Segregating the Core of a Cargo Shipping Model | 374-378 | |
| Abstract Core: quando, condição, como, aviso | Evans | 15, Abstract Core | 379-380 | "This is a valuable technique only when the polymorphic interfaces correspond to fundamental concepts in the domain." |
| Modelos profundos destilam; alvos de refatoração | Evans | 15, Deep Models Distill; Choosing Refactoring Targets | 381-382 | |

## Estrutura em larga escala (EST)

| Regra/ponto | Livro | Capítulo/seção | Págs. PDF | Citação curta |
|---|---|---|---|---|
| O problema e a definição de estrutura em larga escala | Evans | 16, abertura | 383-385 | |
| Estrutura é opcional; mal ajustada é pior que nenhuma; "menos é mais"; exceções sinalizadas | Evans | 16, Evolving Order | 387 | "Unlike the CONTEXT MAP, a large-scale structure is optional." |
| Evolving Order: deixar a estrutura evoluir | Evans | 16, Evolving Order | 386 | "Let this conceptual large-scale structure evolve with the application, possibly changing to a completely different type of structure along the way." |
| System Metaphor: quando, como, cuidados, XP | Evans | 16, System Metaphor | 388-389 | |
| Responsibility Layers: definição, relaxed layered system, refatorar objetos para caber em uma camada | Evans | 16, Responsibility Layers | 390-391 | |
| Critérios de boas camadas (história, dependência conceitual, contornos) | Evans | 16, Choosing Appropriate Layers | 398 | |
| Camadas recorrentes (Potential, Operation, Decision Support, Policy, Commitment) | Evans | 16, Choosing Appropriate Layers | 398-400 | |
| Limite de quatro ou cinco camadas | Evans | 16, Choosing Appropriate Layers | 401 | "going beyond four or possibly five becomes unwieldy." |
| Efeito da estrutura em decisões de design (exemplo HazMat); reavaliar se for desajeitado | Evans | 16, How Does This Structure Affect Ongoing Design? | 396-398 | |
| Knowledge Level: quando, como, custos, relação com layers | Evans | 16, Knowledge Level | 402-408 | "This pattern should be used sparingly." |
| Pluggable Component Framework: quando, como, desvantagens | Evans | 16, Pluggable Component Framework | 409-410 | |
| Pluggable não deve ser a primeira nem a segunda estrutura | Evans | 16, Pluggable Component Framework | 410 | "A PLUGGABLE COMPONENT FRAMEWORK should not be the first large-scale structure applied on a project, nor the second." |
| Quão restritiva deve ser a estrutura | Evans | 16, How Restrictive Should a Structure Be? | 413 | |
| Minimalismo, comunicação, estruturas facilitam transformar, destilação alivia | Evans | 16, Refactoring Toward a Fitting Structure | 414-415 | |
| Combinar estrutura com contextos e destilação | Evans | 17, Combining Large-Scale Structures... | 417-421 | |
| Avaliação inicial (seis perguntas) | Evans | 17, Assessment First | 422 | |
| Quem define a estratégia; seis essenciais; planos mestres | Evans | 17, Who Sets the Strategy? | 423-428 | |

## Agregados, fábricas, repositórios, serviços, módulos, camadas e padrões de projeto (AGR)

| Regra/ponto | Livro | Capítulo/seção | Págs. PDF | Citação curta |
|---|---|---|---|---|
| O problema do emaranhado de associações; falta de fronteira | Evans | 6, Aggregates | 118-119 | |
| Raiz e fronteira; única referência externa à raiz; identidade local x global; internos só para uso transitório | Evans | 6, Aggregates | 119-120 | |
| Só raízes por consulta direta; remoção de todo o agregado; invariantes do agregado ao confirmar | Evans | 6, Aggregates | 121 | |
| Objetos internos podem referenciar outras raízes de agregado | Evans | 6, Aggregates | 121 | "Objects within the AGGREGATE can hold references to other AGGREGATE roots." |
| Invariantes entre agregados resolvidas depois (eventos, lote) | Evans | 6, Aggregates | 120 | "Any rule that spans AGGREGATES will not be expected to be up-to-date at all times." |
| Exemplo do pedido de compra: contenção, copiar preço, fronteira consistente com o negócio | Evans | 6, Aggregates | 121-125 | |
| Fronteiras no exemplo da carga; histórico dentro, evento de manuseio como raiz | Evans | 7, Aggregate Boundaries | 155 | |
| Substituir coleção por consulta para evitar contenção; graus de liberdade | Evans | 7, Pause for Refactoring | 163-164 | |
| Cópia de agregado como protótipo | Evans | 7, Walking Through Scenarios | 159 | |
| Seleção de repositórios: só raízes e segundo os requisitos | Evans | 7, Selecting Repositories | 157 | |
| Entidade ou Valor depende do contexto (exemplo do endereço) | Evans | 5, Value Objects | 98 | |
| Valores formam todo conceitual | Evans | 5, Value Objects | 99 | |
| Valor imutável quando possível; mutável não compartilhado | Evans | 5, Value Objects | 101 | "Whether you will be sharing or not, design VALUE OBJECTS as immutable when you can." |
| Associações bidirecionais entre Valores | Evans | 5, Value Objects | 102 | |
| Identidade vem do domínio; chave natural ou gerada | Evans | 5, Entities | 94-95 | |
| Fábrica: quando criar; cliente montando vaza regra | Evans | 6, Factories | 127-128 | "When creation of an object, or an entire AGGREGATE, becomes complicated or reveals too much of the internal structure, FACTORIES provide encapsulation." |
| Dois requisitos da fábrica (atômica; abstração do tipo) | Evans | 6, Factories | 129 | "Create entire AGGREGATES as a piece, enforcing their invariants." |
| Onde colocar a fábrica | Evans | 6, Choosing Factories and Their Sites | 129-131 | |
| Quando o construtor basta | Evans | 6, When a Constructor Is All You Need | 131-132 | "Avoid calling constructors within constructors of other classes. Constructors should be dead simple." |
| Interface e lógica de invariante na fábrica | Evans | 6, Designing the Interface; Where Does Invariant Logic Go? | 132-133 | |
| Fábricas de Entidade x Valor; reconstituição | Evans | 6, Entity Factories...; Reconstituting Stored Objects | 133 | |
| Fábrica cria, repositório encontra; evitar "buscar ou criar" | Evans | 6, The Relationship with Factories | 142-143 | "The FACTORY makes new objects; the REPOSITORY finds old objects." |
| Repositório: o problema (cliente lida com tecnologia) e a solução (coleção em memória) | Evans | 6, Repositories | 136-138 | |
| Repositórios só para raízes que precisam de acesso direto | Evans | 6, Repositories | 138 | "Provide REPOSITORIES only for AGGREGATE roots that actually need direct access." |
| Vantagens do repositório (desacoplar persistência, testes com falso em memória) | Evans | 6, Repositories | 138 | "They decouple application and domain design from persistence technology, multiple database strategies, or even multiple data sources." |
| Consultas fixas e baseadas em Specification | Evans | 6, Querying a Repository | 138-139 | |
| Implementação: cliente ignora, desenvolvedor não; um tipo, não uma classe; frameworks | Evans | 6, Implementing a Repository; Working Within Your Frameworks | 139-142 | |
| Controle de transação fica com o cliente | Evans | 6, Implementing a Repository | 141 | "Leave transaction control to the client." |
| Banco relacional como armazenamento de objetos | Evans | 6, Designing Objects for Relational Databases | 144-145 | "Processes outside the object system should not access such an object store." |
| Serviço: quando; três características; verbo; sem estado | Evans | 5, Services | 103-104 | |
| Serviços por camada (técnico, aplicação, domínio) e exemplo de transferência | Evans | 5, Services and the Isolated Domain Layer | 104-105 | |
| Granularidade e acesso a serviços | Evans | 5, Services | 105-106 | |
| Módulos: sobrecarga cognitiva; contar a história; nomes na linguagem ubíqua | Evans | 5, Modules | 107-108 | |
| Preferir clareza conceitual a métricas técnicas | Evans | 5, Modules | 108 | "when there has to be a trade-off, it is best to go with the conceptual clarity" |
| Empacotamento guiado por infraestrutura gera modelo anêmico; manter código do objeto conceitual no mesmo módulo | Evans | 5, The Pitfalls of Infrastructure-Driven Packaging | 109-111 | "keep all the code that implements a single conceptual object in the same MODULE" |
| Particionar por padrão não conta a história do domínio | Evans | 7, Modules in the Shipping Model | 165-166 | |
| Módulos não são Bounded Contexts | Evans | 14, Bounded Context | 299 | |
| Quatro camadas e regra de dependência para baixo | Evans | 4, Layered Architecture | 74 | "any element of a layer depends only on other elements in the same layer or on elements of the layers "beneath" it." |
| Isolar o código do domínio de UI, aplicação e infraestrutura | Evans | 4, Layered Architecture | 74-75 | "Concentrate all the code related to the domain model in one layer and isolate it from the user interface, application, and infrastructure code." |
| Infraestrutura abaixo do domínio; não inicia ação no domínio; serviços técnicos | Evans | 4, Relating the Layers | 76 | "The infrastructure layer usually does not initiate action in the domain layer." |
| Frameworks arquiteturais: usar seletivamente | Evans | 4, Architectural Frameworks | 77 | |
| Isolar o domínio é pré-requisito | Evans | 4, The Domain Layer Is Where the Model Lives | 78 | |
| Smart UI como alternativa excludente | Evans | 4, The Smart UI "Anti-Pattern" | 79-81 | |
| Padrões de projeto só alguns servem como padrões de domínio | Evans | 12, abertura | 275 | |
| Strategy (Policy) no domínio | Evans | 12, Strategy | 276-278 | |
| Composite no domínio | Evans | 12, Composite | 279-284 | |
| Aplicar padrão só quando necessário | Evans | 12, Composite | 284 | "A design pattern should be applied only when it is needed." |
| Flyweight não é padrão de domínio; critério geral | Evans | 12, Why Not Flyweight? | 285 | "the pattern should say something about the conceptual domain, not just be a technical solution to a technical problem." |

---

## Divergências encontradas entre a skill atual e o Evans

Comparação da versão 1.0 de `SKILL.md`, `references/tactical-design.md` e `references/event-storming.md` com o texto lido (PDF p.1-446, blocos 01 a 06). "Não sustentada" significa que o livro, nos trechos lidos, não diz isso (pode vir de outra fonte); "contradiz" significa que o livro diz algo diferente. As correções não foram aplicadas no `SKILL.md`; ficam como registro.

| # | Afirmação da skill | O que o livro diz | Situação | Págs. |
|---|---|---|---|---|
| 1 | Agregados: "referencie outros agregados apenas por identidade" (`SKILL.md`, `tactical-design.md`) | Objetos dentro de um agregado **podem manter referências a outras raízes de agregado**; o que se restringe é o acesso de fora a elementos internos (só pela raiz). "Por identidade" não aparece. Evans discute trocar associação por consulta como decisão de projeto (contenção, desempenho), não como regra | **Não sustentada** (convenção de outras fontes); tratar como "convenção desta skill" | 120-121, 136, 153, 163-164 |
| 2 | Agregados: "limites de consistência pequenos", "manter agregados pequenos" | O livro não fixa tamanho. O critério é: o que só existe por causa da raiz, criação e remoção conjuntas, frequência de mudança, contenção, invariantes que precisam ser fortes e as que podem ser eventuais. Nos exemplos, o agregado reúne o que só existe por causa da raiz | **Não sustentada** como regra literal; o critério do livro é mais rico | 119-125, 155, 163-164 |
| 3 | Objetos de Valor "imutáveis" (absoluto) e "prefira-os sempre que possível" | Projete como imutável **quando puder**; há exceções por desempenho (mutáveis, mas então **não compartilhados**). Preferir Valor a Entidade é coerente com evitar identidade desnecessária, mas o livro não diz "sempre que possível" | **Parcialmente sustentada** (falta a ressalva) | 97-98, 101 |
| 4 | Subdomínios em "Core, Supporting e Generic Domain" | Os padrões nomeados são **Core Domain** e **Generic Subdomains**. "Supporting" aparece só como papel informal de elementos de apoio, não como categoria. Para subdomínio genérico, o livro lista quatro opções (pronta, modelo publicado, terceirizada, interna) e adverte que soluções prontas costumam não valer o trabalho; "genérico" não significa reutilizável | **Terminologia não sustentada** ("Supporting Domain"); a descrição de Generic como "comprar, terceirizar ou reutilizar" é incompleta, e "reutilizar" pede nuance: o livro manda não projetar para reuso de código; o reuso valioso é o do modelo (modelo publicado) | 351-360 |
| 5 | Context Map lista **Partnership** | Não existe no texto de Evans (zero ocorrências nos seis blocos). Os padrões do livro são Shared Kernel, Customer/Supplier, Conformist, Anticorruption Layer, Separate Ways, Open Host Service e Published Language. O "Big Ball of Mud" mencionado no pedido também **não aparece** no texto lido | **Não sustentada** (Partnership e Big Ball of Mud vêm de fontes posteriores) | 312-332 |
| 6 | Eventos de Domínio como padrão tático (`SKILL.md`, `tactical-design.md`) e Event Storming (`event-storming.md`) | "Domain event" e "event storming" não aparecem em nenhum dos seis blocos. Eventos são citados apenas como mecanismo para resolver invariantes entre agregados e como sinal entre camadas (Operations para Policy) | **Não sustentada** (técnicas posteriores ao livro); não atribuir ao Evans | 120, 413 |
| 7 | "Factories e Repositories: expressam intenções do domínio e **ocultam persistência**" | A fábrica encapsula criação e reconstituição; **persistência é responsabilidade do repositório**. Evans separa as duas e diz que isso tira da fábrica toda responsabilidade de persistência | **Imprecisa**: o trecho vale só para Repository | 128-134, 142 |
| 8 | Factories: "utilize quando a criação possuir regras de negócio, exigir validações, for complexa" | Quando a criação é complicada **ou revela demais da estrutura interna**; e há cinco condições em que o construtor simples é melhor. Também diz que o limiar para uma fábrica pequena não é alto | **Parcialmente sustentada** | 127, 131 |
| 9 | "Evite a mentalidade de um repositório por tabela" | Repositórios só para raízes com acesso direto; tipo abstrato, não uma classe por repositório; mapeamento tabela-objeto simples é recomendado quando o banco é só repositório dos objetos | **Sustentada** (com a nuance sobre mapeamento simples, p.144-145) | 138, 141, 144-145 |
| 10 | Serviços de Domínio "só quando o comportamento não pertence a Entidade ou Valor" e anti-padrão de nomes como "Manager" | Sustentado. O livro adiciona: o serviço deve ser sem estado, nomeado como verbo da linguagem ubíqua e distinto de serviços de aplicação e de infraestrutura. "Manager" é citado como sintoma de serviço disfarçado | **Sustentada** | 103-105 |
| 11 | Anti-padrão "Modelo de Domínio Anêmico" | O termo aparece uma vez, como consequência de empacotamento guiado por infraestrutura; o livro não o define como anti-padrão separado | **Sustentada de forma indireta** | 110 |
| 12 | **"O domínio não depende da infraestrutura"** (afirmação conferida a pedido; o `SKILL.md` do DDD não a escreve literalmente, e a ideia aparece em `clean-architecture-expert`; no DDD o mais próximo é "ocultam persistência" e "tecnologia deve surgir do entendimento do domínio") | Ver detalhe abaixo | **Não sustentada como regra de direção de dependência; sustentada como regra de isolamento de código** | 73-78, 138 |
| 13 | Event Storming, "Descoberta de Conhecimento", Modo de Revisão | Conceitos como linguagem ubíqua, conceitos implícitos, refatoração rumo a insight são do livro (cap. 1 a 3, 8, 9, 13); não conferidos linha a linha aqui | **Fora do escopo desta passagem** | |

### Detalhe: "o domínio não depende da infraestrutura" (Evans, p.73-78)

O que o livro diz, exatamente:

1. **Regra de camadas (p.74):** "any element of a layer depends only on other elements in the same layer or on elements of the layers 'beneath' it". Na ordem do livro, as camadas são interface, aplicação, **domínio** e **infraestrutura**, com a infraestrutura **abaixo** do domínio. Por essa regra, o domínio **pode** depender da infraestrutura. Comunicação para cima (da camada de baixo para a de cima) passa por mecanismo indireto como callbacks ou Observer (p.74, 76).
2. **O que ele pede (p.74-75):** concentrar todo o código relativo ao modelo em uma camada e **isolá-lo** do código de interface, aplicação e infraestrutura, de modo que os objetos de domínio fiquem livres da responsabilidade de se exibir e de se armazenar. A persistência "para o domínio" é fornecida pela infraestrutura, mas os detalhes técnicos de armazenamento são delegados a ela (p.74).
3. **Infraestrutura (p.76):** "usually does not initiate action in the domain layer"; estando abaixo, não deve ter conhecimento específico do domínio. Os recursos técnicos costumam ser oferecidos como **serviços** que a aplicação e o domínio chamam.
4. **Repositório (p.138-141):** o repositório "desacopla o design de aplicação e domínio da tecnologia de persistência" e delega a infraestrutura; permite um substituto em memória para testes. O texto não diz onde fica a interface do repositório nem fala de inversão de dependência.
5. **Frameworks (p.77):** o código de domínio pode ter de herdar de classes de um framework arquitetural; Evans recomenda usar poucos recursos, mas não condena a dependência em si.
6. **Ausências:** "dependency inversion", "hexagonal" e "ports and adapters" não aparecem nos seis blocos.

Conclusão: Evans exige **isolamento** (o código do modelo não se mistura com UI, aplicação e acesso a dados; a infraestrutura não conhece o domínio). Ele **não** formula a regra "as dependências do código apontam para dentro / o domínio não importa nada de infraestrutura", típica de Clean Architecture e Arquitetura Hexagonal. Se a skill ou outras skills do repositório afirmarem essa regra, atribuí-la a essas fontes, não ao Evans.

### Lacunas do livro que a skill ainda não cobre (candidatas a futura passagem)

Specification (cap. 9), Intention-Revealing Interfaces, Side-Effect-Free Functions, Assertions, Conceptual Contours, Standalone Classes, Closure of Operations e Declarative Design (cap. 10), Analysis Patterns (cap. 11), conceitos implícitos (cap. 9), breakthrough (cap. 8). Constam das notas de auditoria, mas **não** foram reescritos nesta atualização.
