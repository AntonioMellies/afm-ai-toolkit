# Notas: Evans, Domain-Driven Design, bloco 01 (PDF p.1-75)

Observações gerais:
- O texto do PDF está em INGLÊS (apesar de "edição em português" no pedido). Os termos dos padrões aparecem em caixa alta (UBIQUITOUS LANGUAGE, MODEL-DRIVEN DESIGN, HANDS-ON MODELERS, LAYERED ARCHITECTURE). Notas em português, termos do livro mantidos em inglês.
- Não há numeração impressa de página visível no texto extraído (só "PDF PAGINA N"); nenhum "impr. M" anotado.
- Este bloco cobre front matter, Prefácio, Parte I inteira (Cap. 1, 2, 3) e o INÍCIO do Cap. 4 (Layered Architecture). NÃO há neste bloco: Entities/Value Objects/Aggregates/Repositories/Factories (Cap. 5-6), Bounded Context/Context Map/Anticorruption Layer (Cap. 14), Distillation/Core Domain (Cap. 15), Supple Design (Cap. 10). Eles aparecem só no sumário (p.3-6) e em referências cruzadas.

---

### Capa, sumário, copyright, elogios, dedicatória (PDF p.1-9)
Resumo: material de apresentação. O sumário (p.3-6) dá a estrutura completa do livro, útil para planejar os blocos seguintes.
Conceitos e regras (apenas estrutura, sem detalhar):
- Parte I: Putting the Domain Model to Work (Cap.1 Crunching Knowledge; Cap.2 Communication and the Use of Language; Cap.3 Binding Model and Implementation) [p.3-4]
- Parte II: Building Blocks (Cap.4 Isolating the Domain: Layered Architecture, Domain Layer, Smart UI "Anti-Pattern"; Cap.5 A Model Expressed in Software: Associations, Entities, Value Objects, Services, Modules; Cap.6 Life Cycle: Aggregates, Factories, Repositories; Cap.7 Extended Example: Cargo Shipping) [p.4]
- Parte III: Refactoring Toward Deeper Insight (Cap.8 Breakthrough; 9 Implicit Concepts; 10 Supple Design: Intention-Revealing Interfaces, Side-Effect-Free Functions, Assertions, Conceptual Contours, Standalone Classes, Closure of Operations, Declarative Design; 11 Analysis Patterns; 12 Design Patterns: Strategy, Composite; 13 Refactoring Toward Deeper Insight) [p.4-5]
- Parte IV: Strategic Design (Cap.14 Maintaining Model Integrity: Bounded Context, Continuous Integration, Context Map, Shared Kernel, Customer/Supplier, Conformist, Anticorruption Layer, Separate Ways, Open Host Service, Published Language, Unifying an Elephant; Cap.15 Distillation: Core Domain, Generic Subdomains, Domain Vision Statement, Highlighted Core, Cohesive Mechanisms, Segregated Core, Abstract Core; Cap.16 Large-Scale Structure: Evolving Order, System Metaphor, Responsibility Layers, Knowledge Level, Pluggable Component Framework; Cap.17 Bringing the Strategy Together) [p.5-6]
- Apêndice: The Use of Patterns in This Book; Glossário; Referências [p.6]
Citações curtas de prova: nenhuma.
O que este trecho NÃO diz: o sumário só lista títulos; não define nenhum padrão. Os elogios (Kent Beck, Ralph Johnson, etc.) são opinião, sem conteúdo técnico.
Relevância: domain-driven-design: BAIXA (mapa dos capítulos para organizar references/); clean-architecture-expert: NENHUMA; hard-parts: NENHUMA.
Decisão sugerida: usar o sumário só como índice de cobertura para os próximos blocos (confirma que os temas de v1.1 como Anticorruption Layer, Distillation, Context Map estão nos Cap. 14-15, fora deste bloco); descartar o resto.

### Prefácio de Martin Fowler (PDF p.10)
Resumo: Fowler situa o livro: a complexidade do software vem do domínio; um bom modelo controla essa complexidade; conceito e implementação não se separam; modelos poderosos evoluem ao longo do tempo (rejeita "design, depois build").
Conceitos e regras:
- O valor maior de um modelo de domínio é fornecer linguagem ubíqua que une especialistas de domínio e técnicos [p.10]
- Modelos de domínio não são "primeiro modelados, depois implementados"; as melhores ideias surgem após as primeiras versões [p.10]
Citações curtas de prova:
- "the greatest value of a domain model is that it provides a ubiquitous language that ties domain experts and technologists together" [p.10]
O que este trecho NÃO diz: não detalha técnicas.
Relevância: domain-driven-design: MÉDIA (frase de enquadramento para "Quando usar"/"Mentalidade"); demais: NENHUMA.
Decisão sugerida: usar como enquadramento no SKILL.md de domain-driven-design (1 linha); sem referência dedicada.

### Prefácio do autor, "Contrasting Three Projects", "The Challenge of Complexity", "Design Versus Development Process", "Structure of This Book", "Who Should Read", "A Domain-Driven Team" (PDF p.12-20)
Resumo: Evans apresenta três projetos (um simples e rápido que ossificou em legado por falta de modelo/linguagem; um que acelerou iteração a iteração graças a modelo refinado em código; um que perdeu o modelo por separar modeladores de implementadores e por objetos de negócio sem rigor). Defende que a complexidade principal é do domínio, não técnica, e que o livro pressupõe desenvolvimento iterativo e relação próxima entre desenvolvedores e especialistas.
Conceitos e regras:
- Premissa dupla: o foco principal deve ser o domínio e a lógica de domínio; domínios complexos devem se basear em um modelo [p.14]
- Complexidade que sai do controle impede entender o software para alterá-lo com segurança; complexidade do domínio não tratada no design anula o valor de uma infraestrutura bem pensada [p.14]
- Dois pré-requisitos de processo: desenvolvimento iterativo e relação próxima entre desenvolvedores e especialistas durante toda a vida do projeto [p.15]
- Crítica ao uso ingênuo de XP: "simplest" é subjetivo; refatoração contínua sem princípios de design produz base difícil de mudar; medo de overengineering pode virar medo de qualquer design profundo; XP funciona melhor com bom senso de design [p.16]
- Estrutura do livro em 4 partes (modelo em uso; building blocks; refatorar para insight mais profundo; design estratégico = contexto, destilação e estrutura em larga escala) [p.17]
- Maiores ganhos quando o time inteiro adota: linguagem comum, implementação alinhada ao modelo, mapa de como os times se relacionam, foco nas features mais distintivas [p.20]
- Pontos de entrada de leitura recomendados: Parte I e Cap.1; núcleo seria Cap. 2, 3, 9 e 14 [p.19]
Citações curtas de prova:
- "the most significant complexity of many applications is not technical. It is in the domain itself" [p.14]
- "Domain-driven design is both a way of thinking and a set of priorities" [p.14]
O que este trecho NÃO diz: não define padrões táticos ou estratégicos; os três projetos são narrativa sem detalhes técnicos; não prescreve métricas de quando adotar DDD (só diz que projetos simples podem dispensar atenção a design, p.13).
Relevância: domain-driven-design: ALTA para a seção "Quando usar/Mentalidade" (quando o DDD compensa; pré-requisitos de processo; modos de falha dos 3 projetos como sinais de alerta); architecture-hard-parts: BAIXA (enquadramento); clean-architecture: BAIXA.
Decisão sugerida: usar em domain-driven-design (referência "quando-ddd-compensa" ou seção de pré-requisitos e anti-sinais: modelador separado do código, falta de linguagem comum, sucesso inicial simples que ossifica). O livro vai além de lista curta aqui ao dar os três cenários narrados como casos de falha/sucesso.

### Introdução à Parte I (PDF p.24-26)
Resumo: define modelo e domínio; o modelo de domínio não é um diagrama, é a ideia que ele comunica; modelar é como fazer cinema (seleção para um propósito), não buscar "realismo". Lista três usos do modelo e critica o foco de talentos técnicos em frameworks em vez do domínio.
Conceitos e regras:
- Modelo é uma simplificação consciente e estruturada do conhecimento; domínio é a área à qual o usuário aplica o programa [p.24]
- Modelo de domínio não é um diagrama específico nem o conhecimento solto na cabeça do especialista; é uma abstração rigorosa e seletiva dele. Diagrama, código bem escrito ou frase podem representá-lo [p.25]
- Modelagem não é fazer o modelo mais "realista" possível; escolhe-se o modelo pela utilidade [p.25]
- Três usos que determinam a escolha do modelo: (1) modelo e coração do design se moldam mutuamente; (2) modelo é espinha dorsal da linguagem de todos; (3) modelo é conhecimento destilado [p.25]
- O coração do software é resolver problemas do domínio do usuário; talentos técnicos tendem a ir para frameworks elaborados e deixar o domínio "para outros" [p.25-26]
Citações curtas de prova:
- "A domain model is not a particular diagram; it is the idea that the diagram is intended to convey." [p.25]
- "Complexity in the heart of software has to be tackled head-on. To do otherwise is to risk irrelevance." [p.26]
O que este trecho NÃO diz: não explica COMO modelar; a anedota de Monty Python (p.26) é só analogia.
Relevância: domain-driven-design: ALTA (definição de modelo e os três usos; base de "Mentalidade Principal"); clean-architecture-expert: BAIXA; hard-parts: NENHUMA.
Decisão sugerida: usar em domain-driven-design (SKILL.md, definição de modelo/três usos; reforçar que modelo != diagrama).

### Cap. 1: Crunching Knowledge (PDF p.27-39)
Resumo: caso do software de projeto de placas de circuito impresso (PCB), em que o autor, sem conhecer eletrônica, constrói o modelo junto com os especialistas por diálogos, diagramas de cenário e um protótipo simples guiado por testes. Depois formaliza os ingredientes da modelagem eficaz, o "knowledge crunching", aprendizado contínuo, design rico em conhecimento (exemplo do overbooking) e modelos profundos (exemplo de transferência de responsabilidade no transporte de carga).
Conceitos e regras:
- Processo narrado (p.27-31): perguntar pelos relatórios que os especialistas pedem (aparece "net"), desenhar diagramas de interação de objetos para percorrer cenários, corrigir terminologia juntos (ex.: "component instance" vs. "ref-des"), limitar o foco a uma feature ("probe simulation") para dirigir a exploração, descartar o que não é usado por ela (a Topology saiu do modelo), e só então codar um protótipo SEM infraestrutura (sem persistência e sem UI) para concentrar-se no comportamento [p.28-31]
- O protótipo concreto tornou as discussões mais interativas porque os especialistas viam o modelo virar software e davam feedback [p.31]
- Cinco ingredientes da modelagem eficaz: (1) vincular modelo e implementação; (2) cultivar linguagem baseada no modelo; (3) desenvolver modelo rico em conhecimento (objetos com comportamento e regras, não só schema de dados); (4) destilar o modelo (incluir o importante e também descartar conceitos que não provam utilidade); (5) brainstorming e experimentação (o ouvido detecta rápido se uma expressão do modelo é natural ou desajeitada) [p.32]
- Knowledge crunching é colaboração de desenvolvedores e especialistas, tipicamente liderada pelos desenvolvedores; fontes: especialistas, usuários de sistemas existentes, experiência prévia com legado/projeto similar, documentos, conversa, protótipos [p.33]
- Por que cascata falha: conhecimento flui só em uma direção (negócio -> analista -> programador), sem feedback; por que iteração sem abstração também falha: aprende-se o que a aplicação deve fazer, não os princípios por trás, e features poderosas não surgem como corolários [p.33]
- Abstração só entre técnicos, sem especialistas, gera conceitos ingênuos [p.33]
- Modelos nunca são perfeitos, evoluem; devem ser práticos e rigorosos o bastante para tornar a aplicação simples de implementar e entender [p.34]
- Projetos "vazam conhecimento" (pessoas saem, reorganizações, terceirização entrega código sem conhecimento); times produtivos praticam aprendizado contínuo, inclusive do domínio específico [p.35]
- Os especialistas não são conscientes de quanto raciocínio e senso comum usam; o software não preenche lacunas por senso comum; conhecimento crunching esclarece, reconcilia ou tira de escopo regras contraditórias [p.36]
- Exemplo "Extracting a Hidden Concept" (overbooking): "Allow 10% overbooking" vira guard clause `maxBooking = capacity * 1.1` dentro de `makeBooking`. Problemas: o especialista não consegue ler a regra no código; difícil ligar o texto do requisito ao código. Solução: extrair a regra para uma classe `OverbookingPolicy` com `isAllowed(cargo, voyage)`, que o autor reconhece como STRATEGY/policy usada aqui para capturar o conceito, mesmo sem necessidade de trocar regras [p.36-38]
- Ressalva do autor: não aplicar design tão elaborado a todo detalhe; o foco é no que importa (remete ao Cap. 15) [p.38]
- Benefícios do design explícito: todos entendem overbooking como regra de negócio distinta; programadores podem mostrar artefatos (até código) inteligíveis aos especialistas, fechando o loop de feedback [p.38]
- Modelos profundos: modelos úteis raramente ficam na superfície; no projeto de contêineres, após meses a visão mudou de "mover contêineres de lugar a lugar" para "transferência de responsabilidade sobre a carga entre entidades" (documentos legais como bill of lading, liberação de pagamentos), sem eliminar o objeto Itinerary mas mudando profundamente o modelo [p.39]
Citações curtas de prova:
- "Knowledge crunching is not a solitary activity." [p.33]
- "Now an important business rule is hidden as a guard clause in an application method." [p.37]
- "The model wasn't just a data schema; it was integral to solving a complex problem." [p.32]
- "Knowledge crunching is an exploration, and you can't know where you will end up." [p.39]
O que este trecho NÃO diz: não dá passos formais/checklist de knowledge crunching (é narrativa); não define Entity/VALUE OBJECT/Aggregate aqui; não mostra o refactoring completo para o modelo profundo de transferência de responsabilidade (só o resumo; Cap. 8-9 aprofundam, fora do bloco); a decisão de quando uma policy vale a pena é só indicada (Cap. 15).
Relevância: domain-driven-design: ALTA (processo de knowledge crunching passo a passo, 5 ingredientes, exemplo trabalhado de extração de conceito oculto com Policy/Strategy, exemplo de modelo profundo; boa matéria-prima para o "exemplo trabalhado" de v1.1); clean-architecture-expert: BAIXA (regra de negócio escondida em método de aplicação, vai ao Cap. 4); architecture-hard-parts: NENHUMA.
Decisão sugerida: usar em domain-driven-design (referências: processo de descoberta/knowledge crunching; exemplo trabalhado "overbooking" antes/depois, citando que a regra do 10% sai da guard clause e vira conceito nomeado). Onde o livro vai além de listas: o exemplo é completo (diálogo, código antes/depois, motivos), algo que listas curtas não capturam.

### Cap. 2: Communication and the Use of Language (PDF p.40-55)
Resumo: padrão UBIQUITOUS LANGUAGE: usar o modelo como espinha dorsal de uma linguagem única na fala, nos diagramas, nos documentos e no código; mudança na linguagem é mudança no modelo. Cobre falar o modelo em voz alta, "one team, one language" (sem blindar especialistas), papel e limites de UML e documentos, e modelos explicativos.
Conceitos e regras:
- Problema: línguas fraturadas (jargão do especialista vs. termos técnicos; falas diferentes das do código). Tradução entre os dois lados "emburrece" o knowledge crunching, esconde cismas (pessoas usam termos de forma diferente sem saber) e leva a refatoração destrutiva [p.41]
- Vocabulário da UBIQUITOUS LANGUAGE: nomes de classes e operações principais, termos para regras explícitas no modelo, termos de organizações de alto nível (CONTEXT MAPS, estruturas em larga escala), nomes dos padrões aplicados [p.42]
- Pressão do uso persistente da linguagem expõe fraquezas do modelo; lacunas viram novas palavras; mudanças na linguagem devem levar a atualizar diagramas e a renomear classes/métodos, ou mudar comportamento, quando o significado muda [p.42]
- Formulação "Therefore" (resumida): usar o modelo como espinha dorsal da linguagem em toda comunicação e no código; experimentar expressões alternativas (que refletem modelos alternativos); refatorar nomes para conformar ao novo modelo; reconhecer que mudar a linguagem é mudar o modelo; especialistas devem objetar a termos inadequados, desenvolvedores devem vigiar ambiguidade [p.42-43]
- A UBIQUITOUS LANGUAGE pressupõe um só modelo em jogo; a coexistência de vários modelos/línguas é tratada no Cap. 14 (Bounded Contexts), que é o carrier dos aspectos de design que não aparecem no código [p.43]
- Exemplo "Cargo Router" (p.43-45): dois diálogos paralelos. No primeiro (abstração mínima) o desenvolvedor fala de linhas de tabela, flag booleano e "customs clearance point"; no segundo, com `Route Specification`, `Itinerary` e `Routing Service`, a conversa fica mais curta e precisa: "mudar algo na Route Specification => verifica se o Itinerary ainda a satisfaz; se não, o Routing Service regenera". Mostra que objetos nomeados permitem discutir intenção de negócio em vez de atributos e procedimentos [p.43-45]
- "Modeling out loud": explorar o modelo falando; três versões de uma mesma frase (vaga/técnica; completa mas verbosa; concisa: "A Routing Service finds an Itinerary that satisfies a Route Specification"); arestas ásperas são fáceis de ouvir. Experimentar com linguagem é o mais negligenciado entre as formas de pensar (linguagem, visual, análise metódica, "feel" do código) [p.46-47]
- "One Team, One Language": não blindar especialistas do modelo ("abstrato demais", "não entendem objetos"). Se especialistas sofisticados não entendem o modelo, algo está errado com o modelo. Precisão da linguagem expõe contradições e vagueza no pensamento dos especialistas; cenários passo a passo servem de teste informal; especialistas podem escrever casos de uso e especificar testes de aceitação na linguagem do modelo [p.48]
- Requisitos "independentes do design"? Toda linguagem tem um modelo por trás; o modelo costuma derivar do jargão do especialista, "limpo" com definições mais afiadas; requisitos evoluem e devem ser reenquadrados na linguagem refinada [p.48]
- Pluralidade de linguagens é necessária, mas a divisão nunca deve ser entre especialistas e desenvolvedores; dialetos são extensões, não vocabulários alternativos para o mesmo domínio que reflitam modelos distintos [p.48-49]
- Documentos e diagramas: UML bom para relações entre objetos, razoável para interações, mas não transmite o significado dos conceitos nem o que os objetos devem fazer. Diagramas simples (3-5 objetos) ancoram discussão; diagramas completos sobrecarregam e ainda deixam de fora comportamento e restrições [p.50]
- Experiência do autor: geração de código a partir de UML foi contraproducente; se UML vira linguagem de implementação, o diagrama vira só outra visão do programa e se perde o "modelo" [p.50]
- Preferência: em vez de diagrama anotado com texto, escrever documento de texto ilustrado com diagramas seletivos e simplificados; o modelo não é o diagrama; o código guarda o detalhe [p.51]
- Dois critérios para documentos: (a) complementar código e fala (não duplicar o que o código já faz bem: detalhe; documentos devem iluminar significado, estrutura em larga escala, elementos centrais); (b) trabalhar para viver e manter-se atuais: teste prático = os termos do documento aparecem nas conversas e no código? Se a UBIQUITOUS LANGUAGE mudou e o documento ficou para trás, arquivá-lo como histórico [p.51-52]
- Com a linguagem do modelo, requisitos viram cenários dentro do modelo e especificações podem ser mais simples [p.52]
- "Executable bedrock": código e testes são a base mais confiável, mas nome de método pode ser ambíguo ou desatualizado; é preciso disciplina para que o código também "diga" a coisa certa; remete a declarative design (Cap. 10) [p.53]
- Modelos explicativos: um modelo único deve embasar implementação, design e comunicação (ter modelos separados para esses fins é um risco), mas modelos explicativos podem existir como ajuda didática, mais amplos em escopo e preferencialmente sem UML para evitar falsa correspondência; todos devem estar conscientes da distinção. Exemplo: rota de carga como linhas de operação portuária / carga em armazém / carga no navio [p.54-55]
Citações curtas de prova:
- "Recognize that a change in the UBIQUITOUS LANGUAGE is a change to the model." [p.42]
- "Translation blunts communication and makes knowledge crunching anemic." [p.41]
- "If sophisticated domain experts don't understand the model, there is something wrong with the model." [p.48]
- "Always remember that the model is not the diagram." [p.51]
O que este trecho NÃO diz: não dá formato de glossário (não há template de glossário); não prescreve ferramentas; não trata de Event Storming (não aparece no bloco); não detalha como lidar com termos diferentes em contextos distintos (só remete ao Cap. 14).
Relevância: domain-driven-design: ALTA (UBIQUITOUS LANGUAGE completa: definição, vocabulário, como evoluir, testes de saúde, o antipadrão de tradução, regra de que linguagem e modelo mudam juntos, critérios de documentação, exemplo dos dois diálogos); clean-architecture-expert: BAIXA (nomes que revelam intenção; teste de documento vivo); architecture-hard-parts: NENHUMA.
Decisão sugerida: usar em domain-driven-design (referência dedicada "linguagem-ubiqua": sinais de linguagem fraturada, procedimento "modeling out loud", teste de aderência de documentos, exemplo Cargo Router em duas versões). Onde o livro vai além de lista curta: os dois diálogos paralelos e as três versões da mesma frase são exemplos de aplicação prontos para virar exemplo trabalhado.

### Cap. 3: Binding Model and Implementation (PDF p.57-69)
Resumo: padrão MODEL-DRIVEN DESIGN: um único modelo serve a análise e ao design, e o código o expressa de forma literal; padrão HANDS-ON MODELERS: quem modela precisa programar. Inclui exemplo PCB "procedural para model-driven" (scripts de arquivos vs. objetos Bus/Net) e o caso Internet Explorer Favorites mostrando o custo de modelos sobrepostos para o usuário.
Conceitos e regras:
- Dois casos de falha com o mesmo resultado: (1) modelo de análise detalhado e "correto" (parede de diagrama) que não virou unidades armazenáveis com integridade transacional, levando a design ad hoc; (2) reescrita sem modelo que acumulou capacidades sem abstração. Ambos terminaram inchados, difíceis de entender e impossíveis de manter [p.57]
- Problemas do modelo de análise separado do design: feito sem considerar o design, impraticável; conhecimento perdido quando a codificação começa; abandonado logo depois, retrabalho com modelagem menos disciplinada; gestão pode retirar acesso a especialistas ao tratar análise como processo separado [p.59]
- MODEL-DRIVEN DESIGN descarta a dicotomia análise/design e busca um único modelo que sirva a ambos. Se o modelo não é prático para implementar, buscar outro; se não expressa fielmente conceitos do domínio, buscar outro: processo único e iterativo [p.59]
- Formulação "Therefore" (resumida): refletir o modelo no software de forma literal, de modo que o mapeamento seja óbvio; revisitar o modelo para que seja implementado mais naturalmente; derivar terminologia do design e atribuição básica de responsabilidades do modelo; mudança no código pode ser mudança no modelo e se propaga pelo projeto [p.60]
- Só um modelo por parte do sistema, em todos os aspectos do desenvolvimento (do código à análise de requisitos); pode haver modelos diferentes em subsistemas (Cap. 14) [p.60]
- É preciso um paradigma de modelagem com suporte de ferramentas: OO é o principal usado no livro; Prolog (lógica) é bom ajuste; linguagens puramente procedurais (C) têm aplicabilidade limitada, pois o programa é uma série de manipulações técnicas de dados, que não capturam o aspecto ativo do domínio [p.61-62]
- Exemplo PCB, design mecanicista (p.63-64): scripts que ordenam um arquivo de lista de nets por nome e aplicam regras de "bus" por casamento de padrão de nome; o conceito "bus" é inferido por ordenação e string match, nunca tratado explicitamente; dezenas de scripts, cada formato novo exige recomeçar, e testar só dá por comparação de arquivos de ponta a ponta
- Exemplo PCB, model-driven (p.64-66): classes `AbstractNet`, `Net`, `Bus`; regra atribuída ao `Bus` vale para suas `Net`; serviços `Net List Import`/`Net Rule Export`; `Net Repository`, `Bus Repository`, `Inferred Bus Factory` (infere buses pelo nome); teste unitário do comportamento central sem depender de convenção de nomes; uma façade (`assignBusRule`) serve UI ou leitura de arquivo. Escala melhor (20+ operações reais) e permite restrições na combinação de regras. O autor avisa que tal design não surge em um passo: exige várias iterações de refatoração e knowledge crunching [p.64-66]
- "Letting the bones show": quando o modelo da UI diverge do modelo de implementação, surgem confusão e bugs (exemplo: Favorites do IE são arquivos com nome de arquivo; erro de nome ilegal, remoção silenciosa de caracteres). Duas saídas: expor o modelo real ao usuário (o usuário aproveita o que sabe do sistema de arquivos) ou armazenar de outra forma com regras próprias, mas sempre um modelo só. Alterar dados silenciosamente é inaceitável na maioria das aplicações [p.67]
- HANDS-ON MODELERS: a metáfora de manufatura (engenheiros projetam, menos qualificados montam) prejudica projetos, pois software é todo design; separar modelagem de implementação quebra o MODEL-DRIVEN DESIGN. Caso real: modelador proibido de programar, perda de detalhes na passagem, feedback demorado (um aspecto ineficiente na plataforma só chegou meses depois), e o modelo virou só estrutura de dados. Especializações de papel são aceitáveis, o problema é separar modelagem e implementação [p.68-69]
- Formulação "Therefore" (resumida): qualquer pessoa técnica que contribui ao modelo deve tocar o código; quem altera código deve aprender a expressar o modelo; todo desenvolvedor deve participar da discussão do modelo e ter contato com especialistas [p.69]
- Grandes projetos ainda precisam de líderes técnicos; Parte IV (design estratégico) discute como definir seus papéis [p.69]
Citações curtas de prova:
- "Programmers are modelers, whether anyone likes it or not." [p.69]
- "software development is all design" [p.68]
- "Design a portion of the software system to reflect the domain model in a very literal way, so that mapping is obvious." [p.60]
- "Quietly changing data is completely unacceptable in most applications." [p.67]
O que este trecho NÃO diz: o código Java do exemplo PCB é ilustrativo e usa coleções sem genéricos (padrão da época); não define Entity/Value Object/Repository/Factory (apenas os usa como nomes no exemplo); não dá critério de quando um subsistema justifica modelo próprio.
Relevância: domain-driven-design: ALTA (MODEL-DRIVEN DESIGN, HANDS-ON MODELERS, modelo único, exemplo trabalhado PCB procedural vs. model-driven, aviso sobre modelo de análise paralelo); clean-architecture-expert: MÉDIA (separação entre modelo de domínio e UI/infra aparece como motivação; "Façade" e services/repositórios no exemplo; ligação com independência de tecnologia); architecture-hard-parts: BAIXA (custo da separação arquiteto/implementador, feedback atrasado).
Decisão sugerida: usar em domain-driven-design (referências: "model-driven-design e modelagem mão na massa", exemplo trabalhado PCB/bus; anti-padrões: modelo de análise separado, arquiteto de torre de marfim, UI com ilusão de modelo diferente). Considerar mencionar HANDS-ON MODELERS em clean-architecture-expert/architecture-hard-parts como anti-padrão de governança (arquiteto sem código).

### Introdução à Parte II (PDF p.70-71)
Resumo: apresenta os blocos do design dirigido a modelo como uma "pattern language"; o estilo segue "responsibility-driven design" (Wirfs-Brock) e "design by contract" (Meyer). Diz que conhecer os fundamentos permite comprometer sem descarrilar quando a realidade de um projeto exige.
Conceitos e regras:
- Isolar o design de domínio do resto esclarece a ligação com o modelo; definir elementos conforme certas distinções afia seus significados; seguir padrões comprovados produz modelos práticos de implementar [p.70]
- O design do livro segue responsibility-driven design e design by contract [p.70]
- O mapa de navegação da pattern language é imagem (não extraída) [p.70]
Citações curtas de prova: nenhuma.
O que este trecho NÃO diz: não lista os padrões no texto; o diagrama do mapa não veio na extração.
Relevância: domain-driven-design: BAIXA; clean-architecture-expert: BAIXA; hard-parts: NENHUMA.
Decisão sugerida: descartar (usar no máximo a referência a responsibility-driven design/design by contract como fontes).

### Cap. 4: Isolating the Domain, abertura e Layered Architecture (PDF p.72-75) [continua no próximo bloco]
Resumo: o código que resolve problemas do domínio é pequeno mas desproporcionalmente importante; precisa ser isolado dos demais conceitos técnicos. Padrão LAYERED ARCHITECTURE com quatro camadas (UI, Application, Domain, Infrastructure), regra de dependência para baixo e exemplo de transferência bancária em camadas (a descrição do exemplo é cortada no fim do bloco).
Conceitos e regras:
- Motivação: um único gesto do usuário (escolher destino de carga) envolve desenhar widget, consultar BD, validar a entrada, associar cidade à carga e gravar; só uma parte é negócio [p.73]
- Quando o código de domínio se difunde em UI, scripts de BD e comportamento de widgets, fica difícil enxergar e raciocinar; mudanças superficiais de UI podem alterar lógica de negócio; para mudar regra é preciso rastrear UI e BD; objetos de modelo coerentes ficam impraticáveis; teste automatizado fica incômodo [p.73]
- Princípio de camadas: elemento de uma camada depende só de elementos da mesma camada ou das "abaixo"; comunicação para cima via mecanismo indireto (explicado depois, fora do bloco) [p.74]
- Quatro camadas conceituais [p.74] (nota de extração: a tabela do PDF saiu com as descrições deslocadas; reconstituí pelo conteúdo de cada texto):
  - User Interface/Presentation: mostra informação e interpreta comandos do usuário (o ator pode ser outro sistema)
  - Application: define os trabalhos do software e dirige os objetos de domínio; é mantida fina, não contém regras de negócio nem conhecimento, apenas coordena e delega; não tem estado que reflita a situação de negócio, mas pode ter estado de progresso de uma tarefa
  - Domain (Model): representa conceitos, situação e regras do negócio; o estado da situação de negócio é controlado e usado aqui, mesmo que o armazenamento seja delegado à infraestrutura; é o coração do software de negócio
  - Infrastructure: capacidades técnicas genéricas (mensageria para a aplicação, persistência para o domínio, widgets para a UI) e pode sustentar o padrão de interações entre as camadas por meio de um framework arquitetural
- Alguns projetos não separam nitidamente UI e aplicação, e outros têm várias camadas de infraestrutura; o que habilita o MODEL-DRIVEN DESIGN é a separação decisiva da camada de domínio [p.74]
- "Therefore" (resumido): concentrar todo o código do modelo em uma camada isolada de UI, aplicação e infraestrutura; objetos de domínio livres de exibir-se, armazenar-se, gerenciar tarefas da aplicação; assim o modelo pode evoluir e se tornar rico [p.74-75]
- Benefícios: camadas isoladas custam menos para manter porque evoluem em ritmos e por motivos diferentes; a separação também ajuda no deploy distribuído, permitindo alocar camadas em servidores/clientes distintos [p.75]
- Exemplo de abertura (p.75): funcionalidade de transferência de fundos; a regra "toda crédito tem débito correspondente" mora na camada de DOMÍNIO, não na de aplicação; a aplicação não faz suposições sobre a origem do pedido. O texto do exemplo é cortado no fim do bloco (a Figura 4.1 e o resto do exemplo estão no próximo bloco)
Citações curtas de prova:
- "any element of a layer depends only on other elements in the same layer or on elements of the layers 'beneath' it" [p.74]
- "it is the crucial separation of the domain layer that enables MODEL-DRIVEN DESIGN" [p.74] (extração: texto original em caixa alta no termo)
O que este trecho NÃO diz: neste bloco não aparece ainda o "Smart UI anti-pattern", o mecanismo de comunicação para cima (observers/callbacks), a inversão de dependência da infraestrutura, nem a discussão de "other kinds of isolation" (isso vem no próximo bloco, conforme o sumário p.4). Não menciona Hexagonal/Clean Architecture; a regra de dependência é "para baixo" (domínio depende da infraestrutura "abaixo"), diferente da versão posterior de Clean Architecture em que a infraestrutura depende do domínio. Atenção a essa diferença ao comparar skills.
Relevância: clean-architecture-expert: ALTA (quatro camadas, papel fino da camada de aplicação, regra de negócio no domínio, motivos de isolamento; base canônica para a seção de camadas); domain-driven-design: ALTA (Layered Architecture é a pré-condição do MODEL-DRIVEN DESIGN; tática); architecture-hard-parts: BAIXA (menção a deploy distribuído por camadas).
Decisão sugerida: usar em domain-driven-design (referência de design tático: camadas e onde cada regra mora) e em clean-architecture-expert (citar Evans como origem da separação das 4 camadas e da camada de aplicação fina; registrar a diferença de direção de dependência). Concluir a leitura no próximo bloco antes de fechar a regra.

---

## Síntese para os artefatos candidatos (bloco 01)

Onde este bloco ajuda a v1.1 de domain-driven-design:
- Já cobertos de forma útil neste bloco: linguagem ubíqua em profundidade; knowledge crunching; MODEL-DRIVEN DESIGN; HANDS-ON MODELERS; documentação viva; modelos explicativos; camadas (início).
- NÃO cobertos aqui (aguardam blocos seguintes): camada anticorruptiva, destilação do domínio (Core/Generic Subdomains/Domain Vision Statement/etc.), context mapping em profundidade, agregados/repositórios/fábricas, DDD com legado. Só aparecem no sumário (p.5) e em remissões (Cap. 14 e 15 citados nas p.38, 42-43, 60).
- Exemplos trabalhados com material pronto: (a) Overbooking: regra escondida em guard clause -> OverbookingPolicy (p.36-38); (b) Cargo Router: dois diálogos e Route Specification/Itinerary/Routing Service (p.43-46); (c) PCB bus: script procedural vs. objetos Net/Bus/Repository/Factory/Service com teste (p.62-66); (d) Modelo profundo de transferência de responsabilidade na carga (p.39); (e) IE Favorites como falha de modelos sobrepostos (p.67).

Onde o livro vai além de listas curtas (para a skill "rasa"):
- A linguagem ubíqua não é "glossário": é prática com testes de saúde (documentos cujos termos não aparecem em fala e código estão mortos), e vale também para UI/usuário (p.42, 52, 67).
- Modelo único: explícita rejeição do modelo de análise separado, com os motivos (p.59) e o custo da separação de papéis (p.68).
- Policy/Strategy no domínio é justificada por captar um conceito de negócio, mesmo sem variação de regras (p.37), com a ressalva de não aplicar a todo detalhe (p.38).
- Protótipo sem persistência e UI para focar o comportamento (p.31).
- Quando o DDD não é necessário: software simples pode ser feito com pouca atenção a design; o problema vem quando precisa evoluir (p.13).

Relevância geral do bloco para o clean-architecture-expert: apenas p.73-75 (camadas) e p.59-60/67 (modelo vs. implementação/UI). Para o architecture-hard-parts: praticamente nenhuma (trade-offs de arquitetura distribuída não aparecem), exceto observações de governança sobre o papel de arquitetos sem prática (p.68-69).

## Checklist de cobertura
- Primeira página lida: 1
- Última página lida: 75 (confirmado por Grep: último marcador "=== PDF PAGINA 75 ===" na linha 2815; arquivo termina na linha 2843)
- Páginas sem texto útil ou ilegíveis: 11, 18, 21, 56 (vazias, só marcador "[ Team LiB ]" ou em branco); p.2 é continuação da sinopse; p.7-9 copyright/elogios (sem conteúdo técnico)
- Problemas de extração observados: (1) todo o texto está em inglês, não em português; (2) a tabela das quatro camadas (p.74) saiu com as descrições deslocadas em relação aos nomes das camadas; (3) todas as figuras e diagramas (Figuras 1.1-1.10, 2.1-2.5, 3.1-3.3, 4.1) foram omitidas; o conteúdo das figuras não está disponível; (4) hifenização quebrada em algumas palavras ("over-came", "frame-works", "in-sight"); (5) sem números impressos de página; (6) a p.49 cita "Chapter 12, Maintaining Model Integrity", provável erro do livro (o capítulo correto é o 14, como em p.43 e no sumário); (7) a seção do teste unitário e do código Java perde indentação/chaves
- Capítulos/seções cobertos integralmente: Front matter, Prefácio, Parte I (intro, Cap. 1, Cap. 2, Cap. 3), intro da Parte II
- Capítulos/seções que continuam em outro bloco: Cap. 4 (Isolating the Domain): continua em p.76+ (Layered Architecture, exemplo de banking, Domain Layer, Smart UI "Anti-Pattern", Other Kinds of Isolation)
