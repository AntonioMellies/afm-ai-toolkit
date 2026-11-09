# Registro de leitura (rascunho): gof

Gerado por script a partir das notas dos leitores. Cada item: capítulo/seção, páginas (PDF), relevância avaliada e decisão sugerida. Revisão humana por amostragem pendente.

Seções registradas: 50


## Bloco 01_p001-090 (lido: PDF p.1-90)

- **Elementos pré-textuais: capa, ficha, dedicatória, prefácio, apresentação (PDF p.1-8)**
  - Relevância: (A) BAIXA, só enquadramento; (B) NENHUMA.
  - Decisão sugerida: descartar (usar só o enquadramento de 'padrão = solução testada com custo de indireção').
- **Guia para os leitores, Sumário (PDF p.9-13) [SUMÁRIO: só estrutura]**
  - Relevância: (A) MÉDIA, o subconjunto "comum" serve de priorização do que cobrir primeiro; (B) NENHUMA.
  - Decisão sugerida: usar em (A) como lista de padrões prioritários.
- **Cap. 1 Introdução, 1.1 O que é um padrão de projeto? (PDF p.14-17, impr. 17-20)**
  - Relevância: (A) ALTA, define o formato de cada entrada (nome/problema/solução/consequências) e a ressalva de que padrões dependem da linguagem; (B) BAIXA.
  - Decisão sugerida: usar em (A) (modelo de entrada e aviso de dependência de linguagem).
- **1.2 Padrões de projeto no MVC de Smalltalk (PDF p.17-19, impr. 20-22)**
  - Relevância: (A) MÉDIA, exemplo canônico de Observer/Composite/Strategy; (B) BAIXA, MVC é separação UI/modelo, ecoa separação de camadas mas não é discutido nesses termos.
  - Decisão sugerida: usar em (A) só como "uso conhecido" em uma linha.
- **1.3 Descrevendo os padrões de projeto: gabarito de documentação (PDF p.19-21, impr. 22-24)**
  - Relevância: (A) ALTA, é o esqueleto recomendado para a referência (nome, categoria, intenção, aplicabilidade, consequências, relacionados); (B) NENHUMA.
  - Decisão sugerida: usar em (A) como template de entrada.
- **1.4 O catálogo de padrões de projeto: as 23 intenções (PDF p.21-22, impr. 24-25)**
  - Relevância: (A) ALTA, base do índice da referência; (B) BAIXA/MÉDIA, Facade, Adapter, Bridge, Mediator, Observer, Strategy, Abstract Factory e Factory Method são vizinhos da inversão de dependência e dos limites de camada, mas este trecho não faz essa ligação.
  - Decisão sugerida: usar em (A) (catálogo/índice); citar em (B) apenas Adapter, Facade, Abstract Factory/Factory Method como ferramentas de isolamento (ligação a validar nos blocos de cada padrão).
- **1.5 Organizando o catálogo: categorias e escopo (PDF p.22-24, impr. 25-27)**
  - Relevância: (A) ALTA, estrutura de organização da referência (categoria + escopo); (B) BAIXA.
  - Decisão sugerida: usar em (A) (organização por categoria e matriz de padrões relacionados).
- **1.6 Como os padrões solucionam problemas de projeto (PDF p.24-39, impr. 27-42)**
  - Relevância: (A) ALTA, os 2 princípios, as 8 causas de reformulação mapeadas a padrões e os sinais de "quando usar" são o núcleo de uma referência usável em refatoração (ex.: switch por tipo, explosão de subclasses, new de classe concreta espalhado); (B) MÉDIA, "programe para interface", acoplamento abstrato, dependência de plataforma/representação e framework/inversão de controle têm afinidade direta com a Dependency Rule, mas o livro não usa essa terminologia.
  - Decisão sugerida: usar em (A) (seção de princípios + tabela "causa de reformulação -> padrões"); usar em (B) como conexão de apoio (programar para interface, camadas, Abstract Factory/Bridge para isolar plataforma), citando o livro, sem atribuir ao GoF o vocabulário de Clean Architecture.
- **1.7 Como selecionar um padrão de projeto (PDF p.40-42, impr. 43-45)**
  - Relevância: (A) ALTA, a tabela "o que varia" e as 6 abordagens são a base de uma seção "como escolher"; (B) BAIXA.
  - Decisão sugerida: usar em (A).
- **1.8 Como usar um padrão de projeto (PDF p.41-43, impr. 44-46)**
  - Relevância: (A) ALTA, guarda-corpo contra over-engineering e passos de aplicação (nomenclatura, ajuste de classes existentes); (B) MÉDIA, mesma lógica de não pagar indireção sem necessidade.
  - Decisão sugerida: usar em (A) (seção "quando NÃO usar" e passos); mencionar em (B).
- **Cap. 2 Estudo de caso: editor de documentos Lexi (PDF p.44-84, impr. 47-87)**
  - Relevância geral: (A) ALTA, exemplos motivadores de "problema -> padrão"; (B) BAIXA/MÉDIA (Abstract Factory e Bridge para portabilidade de plataforma tocam fronteira de dependência de plataforma).
  - Decisão sugerida: usar em (A) como exemplos curtos por padrão; descartar o detalhe de Lexi.
- **Parte II, Catálogo (PDF p.85) e Cap. 3 Padrões de criação: introdução (PDF p.86-90, impr. 91-95) [continua no próximo bloco]**
  - Relevância: (A) ALTA, comparação criação e o critério de escolha por forma de variação (subclasse, objeto parâmetro, builder, protótipo); (B) MÉDIA, Abstract Factory/Factory Method como instrumentos para criar objetos sem acoplar a classes concretas (relação com a composição do grafo de dependências, a validar).
  - Decisão sugerida: usar em (A); completar com bloco seguinte para os 5 padrões.

## Bloco 02_p091-180 (lido: PDF p.91-180)

- **Abstract Factory (PDF p.91-98; impr. 96-103) [começa no bloco anterior: faltam Intenção e cabeçalho/categoria na p.90; continua só até Padrões relacionados, que está completo aqui]**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em GoF reference (arquivo de padrões de criação).
- **Builder (PDF p.99-107; impr. 104-112)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em GoF reference.
- **Factory Method (PDF p.107-115; impr. 112-120)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em GoF reference.
- **Prototype (PDF p.116-125; impr. 121-130)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em GoF reference (resumido).
- **Singleton (PDF p.125-131; impr. 130-136)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em GoF reference, separando claramente "o que o livro diz" de comentário crítico externo.
- **Discussão sobre padrões de criação (PDF p.131-133; impr. 136-138)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em GoF reference.
- **Capítulo 4: visão geral dos Padrões Estruturais (PDF p.134-135; impr. 139-140)**
  - Relevância: GoF reference: MÉDIA (mapa dos estruturais). clean-architecture-expert: BAIXA.
  - Decisão sugerida: usar em GoF reference (introdução da seção de estruturais).
- **Adapter (PDF p.135-146; impr. 140-151)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em GoF reference e citar em clean-architecture-expert como mecanismo de implementação (com ressalva de origem).
- **Bridge (PDF p.146-155; impr. 151-160)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em GoF reference.
- **Composite (PDF p.155-165; impr. 160-170)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em GoF reference.
- **Decorator (PDF p.165-174; impr. 170-179)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em GoF reference.
- **Façade (PDF p.174-180; impr. 179-185) [continua no próximo bloco: Usos conhecidos termina na p.180 e falta a seção "Padrões relacionados"]**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em GoF reference e citar em clean-architecture-expert como ferramenta de estruturar limites entre subsistemas (atribuindo ao livro só o que está acima).

## Bloco 03_p181-270 (lido: PDF p.?)

- **Façade (final: Usos conhecidos e Padrões relacionados) (PDF p.181-182) [continua do bloco anterior; início do padrão não está neste bloco]**
  - Relevância: A (GoF ref): MÉDIA, para completar a ficha de Façade só junto do bloco anterior; diferença Façade x Mediator é útil. B (clean-architecture-expert): MÉDIA, fachada como fronteira de subsistema é afim a limites de camada, mas o livro não fala de camadas.
  - Decisão sugerida: usar a comparação Façade x Mediator x Abstract Factory na referência de padrões; ficha completa vem do bloco anterior.
- **FLYWEIGHT (PDF p.182-193; impr. 187-198)**
  - Relevância: A (GoF ref): ALTA para ficha de padrão (critérios de aplicação bem enumerados). B (clean-architecture-expert): BAIXA, é otimização de memória sem relação com camadas.
  - Decisão sugerida: usar em referência de padrões GoF (ficha completa, com os 5 critérios de aplicabilidade e o trade-off tempo x espaço); não citar em clean-architecture-expert.
- **PROXY (PDF p.193-202; impr. 198-207)**
  - Relevância: A (GoF ref): ALTA, catálogo de 4 tipos e distinção de Decorator/Adapter. B (clean-architecture-expert): MÉDIA, proxy remoto/de proteção ajuda a esconder fronteiras de acesso/infra atrás de uma interface do núcleo (inferência minha; livro não fala de camadas) [fora do livro].
  - Decisão sugerida: usar em referência de padrões GoF; em clean-architecture-expert só mencionar de passagem, se for o caso.
- **Discussão sobre padrões estruturais (PDF p.202-204; impr. 207-209) [encerra o Capítulo 4]**
  - Relevância: A (GoF ref): ALTA, tabela "como distinguir padrões parecidos" é ótima para a skill. B: BAIXA/MÉDIA, Adapter vs Bridge toca em portas/adaptadores, mas o livro não usa essa linguagem.
  - Decisão sugerida: usar em referência de padrões GoF (seção "diferenças entre padrões parecidos").
- **Capítulo 5 PADRÕES COMPORTAMENTAIS: introdução (PDF p.206-207; impr. 211-212) [capítulo continua no próximo bloco]**
  - Relevância: A: MÉDIA, como introdução/taxonomia da categoria. B: BAIXA.
  - Decisão sugerida: usar a taxonomia (classe x objeto) na referência de padrões.
- **CHAIN OF RESPONSIBILITY (PDF p.207-216; impr. 212-221)**
  - Relevância: A (GoF ref): ALTA, ficha completa. B (clean-architecture-expert): MÉDIA, bom para tratadores de erro/validações encadeadas atrás de uma interface (inferência) [fora do livro].
  - Decisão sugerida: usar em referência de padrões GoF.
- **COMMAND (PDF p.217-226; impr. 222-231)**
  - Relevância: A (GoF ref): ALTA, ficha completa com desfazer/log/transações. B (clean-architecture-expert): MÉDIA-ALTA, comando como objeto de solicitação desacopla invocador (UI/controller) de executor (receptor), alinhado à ideia de Use Case/Interactor (inferência) [fora do livro].
  - Decisão sugerida: usar em referência de padrões GoF; mencionar em clean-architecture-expert como ponte para use cases só com marca de inferência.
- **INTERPRETER (PDF p.226-238; impr. 231-243)**
  - Relevância: A (GoF ref): MÉDIA, padrão de nicho, mas critérios de aplicabilidade são claros. B: BAIXA.
  - Decisão sugerida: usar em referência de padrões GoF (ficha curta); não em clean-architecture-expert.
- **ITERATOR (PDF p.239-252; impr. 244-257)**
  - Relevância: A (GoF ref): MÉDIA-ALTA, ficha completa (interno x externo, robustez). B: BAIXA, mas o princípio "não expor a representação interna do agregado" ecoa encapsulamento de Aggregate (inferência) [fora do livro].
  - Decisão sugerida: usar em referência de padrões GoF.
- **MEDIATOR (PDF p.252-261; impr. 257-266)**
  - Relevância: A (GoF ref): ALTA, boa ficha com trade-off explícito (risco de "God object"). B (clean-architecture-expert): MÉDIA, coordenação entre componentes sem referência direta, afim a reduzir acoplamento (inferência) [fora do livro].
  - Decisão sugerida: usar em referência de padrões GoF (ficha + alerta de mediador monolítico).
- **MEMENTO (PDF p.261-269; impr. 266-274)**
  - Relevância: A (GoF ref): ALTA, ficha completa. B (clean-architecture-expert): BAIXA/MÉDIA, encapsulamento de estado do originador, sem ligação direta com camadas.
  - Decisão sugerida: usar em referência de padrões GoF.
- **OBSERVER (PDF p.269-270; impr. 274-275) [continua no próximo bloco; só intenção, motivação, aplicabilidade e início da estrutura estão aqui]**
  - Relevância: A (GoF ref): ALTA (fichas completas só com o próximo bloco). B (clean-architecture-expert): MÉDIA, inversão de dependência por notificação (subject não conhece observers), por inferência [fora do livro].
  - Decisão sugerida: aguardar o bloco seguinte e unificar a ficha de Observer.

## Bloco 04_p271-360 (lido: PDF p.?)

- **OBSERVER (Observador) - comportamental de objetos (PDF p.271-279; impr. 276-284) [COMEÇA no bloco anterior; aqui: Participantes, Colaborações, Consequências, Implementação, Usos conhecidos, Relacionados]**
  - Relevância: refactoring-expert/referência GoF: ALTA (consequências e armadilhas bem catalogadas: cascata, ordem de notificação, consistência). clean-architecture-expert: ALTA (acoplamento abstrato permite subject de camada inferior notificar camada superior sem violar camadas, p.272; análogo ao uso de interfaces/ports e eventos).
  - Decisão sugerida: usar em referência de padrões GoF (completar Intenção/Aplicabilidade com o bloco anterior); citar a regra de camadas em clean-architecture-expert.
- **STATE (Estado) - comportamental de objetos (PDF p.279-287; impr. 284-292)**
  - Relevância: refactoring-expert/referência GoF: ALTA (sinal "condicional grande repetido sobre enum de estado em várias operações" e o alvo State, com trade-offs explícitos: mais classes versus transições explícitas e atômicas). clean-architecture-expert: BAIXA (aplica-se dentro de entidades/casos de uso, não ao desenho de camadas).
  - Decisão sugerida: usar em referência de padrões GoF com o sinal (aplicabilidade 2) e a alternativa por tabela como contraponto.
- **STRATEGY (Estratégia) - comportamental de objetos (PDF p.287-295; impr. 292-300)**
  - Relevância: refactoring-expert/referência GoF: ALTA (sinal "condicionais de seleção de comportamento"; alternativa a subclassificar; trade-offs). clean-architecture-expert: MÉDIA (Context depende da abstração Strategy; algoritmos/políticas trocáveis; o livro não cita Dependency Rule).
  - Decisão sugerida: usar em referência de padrões GoF; ligar Strategy x Template Method como contraste herança versus delegação.
- **TEMPLATE METHOD (Método Template) - comportamental de classes (PDF p.296-300; impr. 301-305)**
  - Relevância: refactoring-expert/referência GoF: ALTA (é o único padrão que o livro descreve explicitamente como alvo de refatoração: passos identificar diferenças, extrair operações, substituir por template method; p.297). clean-architecture-expert: MÉDIA (inversão de controle "Hollywood", framework chama o código do usuário; não trata Dependency Rule).
  - Decisão sugerida: usar em referência de padrões GoF; usar o roteiro "refatorar para generalizar" como receita.
- **VISITOR (Visitante) - comportamental de objetos (PDF p.300-313; impr. 305-318)**
  - Relevância: refactoring-expert/referência GoF: ALTA (critério claro: estável vs. mutável como eixo de decisão; risco de quebra de encapsulamento). clean-architecture-expert: MÉDIA (o eixo "o que muda mais" lembra critérios de separação de responsabilidades e OCP, mas o livro não usa esses termos; operações sobre entidades/AST fora das entidades).
  - Decisão sugerida: usar em referência de padrões GoF, com a regra de decisão (elementos estáveis + operações novas).
- **Discussão sobre padrões comportamentais (PDF p.313-317; impr. 318-322)**
  - Relevância: refactoring-expert/referência GoF: ALTA (matriz de escolha entre padrões concorrentes: Observer x Mediator; Command/Observer/Mediator/Chain). clean-architecture-expert: MÉDIA (desacoplamento emissor-receptor e comunicação entre camadas).
  - Decisão sugerida: usar em referência de padrões GoF numa seção "como escolher entre padrões parecidos".
- **Cap. 6, Conclusão (PDF p.318-325)**
  - Relevância: refactoring-expert: ALTA (justificativa do livro para padrões como alvo de refatoração, ciclo expansão/consolidação, "padrões como estruturas resultantes da refatoração"; ponto de partida para o princípio "refatorar PARA padrão, quando o problema aparece"). clean-architecture-expert: BAIXA (só vocabulário comum e reuso de caixa preta/composição).
  - Decisão sugerida: usar em refactoring-expert (seção sobre quando/por que refatorar para padrões e ciclo de vida); descartar história e comunidade.
- **Apêndice A, Glossário (PDF p.326-328; impr. 331-333)**
  - Relevância: refactoring-expert: BAIXA; clean-architecture-expert: BAIXA.
  - Decisão sugerida: descartar (exceto como confirmação de terminologia).
- **Apêndice B, Guia para notação (PDF p.329-333; impr. 335-339)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Apêndice C, Classes fundamentais (PDF p.334-339; impr. 341-346)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Referências bibliográficas (PDF p.340-344; impr. 347-351)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Índice remissivo (PDF p.345-356; impr. 353-364)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Resumo do catálogo (contracapa, PDF p.357-358) - intenções em uma linha**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Mapa de relacionamentos entre padrões (PDF p.359-360, contracapa)**
  - Relevância: BAIXA; decisão: descartar o diagrama (usar relacionamentos textuais).
  - Decisão sugerida: (não registrada)
