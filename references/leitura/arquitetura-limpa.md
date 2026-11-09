# Registro de leitura (rascunho): arquitetura-limpa

Gerado por script a partir das notas dos leitores. Cada item: capítulo/seção, páginas (PDF), relevância avaliada e decisão sugerida. Revisão humana por amostragem pendente.

Seções registradas: 66


## Bloco 01_p001-082 (lido: PDF p.1-82)

- **Páginas pré-textuais: capa, copyright, créditos, dedicatória (PDF p.1-22)**
  - Relevância: (não registrada)
  - Decisão sugerida: descartar (sem conteúdo técnico).
- **Sumário (PDF p.23-28)**
  - Relevância: clean-architecture-expert: MÉDIA (mapa de capítulos para as próximas leituras); demais: NENHUMA.
  - Decisão sugerida: usar apenas como índice de orquestração dos blocos seguintes.
- **Prefácio de Kevlin Henney (PDF p.29-33)**
  - Relevância: clean-architecture-expert: MÉDIA (anti-padrão de generalidade especulativa, arquitetura como hipótese mensurável, custo da mudança como critério); clean-code-expert: BAIXA; testing-tdd-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (Mentalidade Principal / Anti-Padrões), como enquadramento breve.
- **Apresentação de Martin (PDF p.34-37)**
  - Relevância: clean-architecture-expert: BAIXA; demais: NENHUMA.
  - Decisão sugerida: descartar (autobiográfico); no máximo uma linha de enquadramento.
- **Agradecimentos e Sobre o Autor (PDF p.38-42)**
  - Relevância: (não registrada)
  - Decisão sugerida: descartar.
- **Parte I: Introdução (PDF p.43-45)**
  - Relevância: clean-architecture-expert: BAIXA; Decisão: descartar (motivacional).
  - Decisão sugerida: (não registrada)
- **Cap. 1: O que são Design e Arquitetura? (PDF p.46-56)**
  - Relevância: clean-architecture-expert: MÉDIA-ALTA (objetivo/critério de qualidade e argumento de custo, útil como "por quê"); testing-tdd-expert: MÉDIA (argumento "TDD não é mais lento", com a ressalva da amostra mínima); clean-code-expert: BAIXA.
  - Decisão sugerida: usar em clean-architecture-expert (Mentalidade Principal: objetivo = minimizar esforço humano; sinais de degradação por release) e, com ressalva, em testing-tdd-expert (citar como relato, não como prova).
- **Cap. 2: Um Conto de Dois Valores (PDF p.57-63)**
  - Relevância: clean-architecture-expert: ALTA (princípio-guia: arquitetura é o valor maior; escopo vs. forma; regra de priorização; papel do arquiteto); testing-tdd-expert: NENHUMA; clean-code-expert: BAIXA.
  - Decisão sugerida: usar em clean-architecture-expert (Mentalidade Principal e Regra Máxima; fluxo de priorização Eisenhower como argumento ao justificar investimento em estrutura).
- **Parte II: Paradigmas da Programação, abertura (PDF p.64-65)**
  - Relevância: clean-architecture-expert: BAIXA. Decisão: descartar além da definição.
  - Decisão sugerida: (não registrada)
- **Cap. 3: Panorama do Paradigma (PDF p.66-70)**
  - Relevância: clean-architecture-expert: MÉDIA (base conceitual: polimorfismo como mecanismo de limite; três preocupações arquiteturais); demais: BAIXA.
  - Decisão sugerida: usar em clean-architecture-expert como parágrafo curto de fundamentos (ou references/ de paradigmas), após ler Cap. 5 e 6.
- **Cap. 4: Programação Estruturada (PDF p.71-80)**
  - Relevância: testing-tdd-expert: MÉDIA (fundamento epistemológico: testes refutam, não provam; testabilidade como propriedade arquitetural; relaciona estrutura ao teste); clean-architecture-expert: MÉDIA (testabilidade como critério de módulos/componentes/serviços; decomposição funcional como prática); clean-code-expert: BAIXA.
  - Decisão sugerida: usar em testing-tdd-expert (Mentalidade Principal: teste como refutação, sem garantia de correção) e em clean-architecture-expert (testabilidade como critério arquitetural, citada brevemente).
- **Cap. 5: Programação Orientada a Objetos (PDF p.81-82) [continua no próximo bloco]**
  - Relevância: clean-architecture-expert: ALTA (será continuação com polimorfismo e inversão de dependência no próximo bloco); neste bloco, só enquadramento.
  - Decisão sugerida: aguardar o bloco 02 para extrair o conteúdo; nada a usar deste fragmento além da crítica às definições de OO.

### Auditoria da skill atual (trecho das notas)



## Bloco 02_p083-164 (lido: PDF p.83-164)

- **Cap. 5 Programação Orientada a Objetos: encapsulamento e herança (PDF p.83-88) [continua do bloco anterior]**
  - Relevância: clean-architecture-expert: BAIXA (contexto histórico); testing-tdd-expert: NENHUMA; clean-code-expert: NENHUMA.
  - Decisão sugerida: descartar (histórico), exceto a nota de que encapsulamento fraco é característica das linguagens, não garantia.
- **Cap. 5 OO: polimorfismo, inversão de dependência (PDF p.88-99)**
  - Relevância: clean-architecture-expert: ALTA (mecanismo base de DIP, plug-in, UI/BD como plug-ins, fluxo de controle vs dependência de código-fonte); testing-tdd-expert: BAIXA (plug-in viabiliza substituir detalhes por doubles, mas o texto não diz isso); clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (references: princípio "fluxo de controle != direção de dependência" e plug-in).
- **Cap. 6 Programação Funcional (PDF p.100-108)**
  - Relevância: clean-architecture-expert: MÉDIA (segregar componentes mutáveis/imutáveis, event sourcing como opção); testing-tdd-expert: BAIXA (não menciona testabilidade de funções puras); clean-code-expert: NENHUMA/BAIXA.
  - Decisão sugerida: usar em clean-architecture-expert como nota curta em references (mutabilidade e concorrência como preocupação arquitetural); descartar detalhes de Clojure.
- **Parte III Princípios de Design: introdução aos princípios SOLID (PDF p.109-112)**
  - Relevância: clean-architecture-expert: ALTA (enquadramento SOLID e níveis: código, módulo, componente, arquitetura); clean-code-expert: BAIXA (autor distingue código limpo de SOLID); testing-tdd-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert.
- **Cap. 7 SRP: Princípio da Responsabilidade Única (PDF p.113-120)**
  - Relevância: clean-architecture-expert: ALTA (definição correta do SRP, sintomas, soluções); clean-code-expert: MÉDIA (distinção função-faz-uma-coisa vs SRP, duplicação acidental/DRY); testing-tdd-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (references/solid-arquitetura.md) e nota de distinção em clean-code-expert.
- **Cap. 8 OCP: Princípio Aberto/Fechado (PDF p.121-128)**
  - Relevância: clean-architecture-expert: ALTA (OCP em nível de componente, hierarquia de proteção, uso de SRP+DIP, interfaces para inverter e ocultar); testing-tdd-expert: NENHUMA; clean-code-expert: BAIXA.
  - Decisão sugerida: usar em clean-architecture-expert.
- **Cap. 9 LSP: Princípio de Substituição de Liskov (PDF p.129-134)**
  - Relevância: clean-architecture-expert: MÉDIA (substituibilidade de adaptadores/plug-ins e contratos de interface entre componentes); testing-tdd-expert: BAIXA; clean-code-expert: BAIXA.
  - Decisão sugerida: usar em clean-architecture-expert (checagem: se o chamador precisa de if por tipo/fornecedor, LSP violado).
- **Cap. 10 ISP: Princípio da Segregação de Interface (PDF p.135-138)**
  - Relevância: clean-architecture-expert: MÉDIA (acoplamento a framework/BD como violação de ISP em nível arquitetural); testing-tdd-expert: NENHUMA; clean-code-expert: BAIXA.
  - Decisão sugerida: usar em clean-architecture-expert.
- **Cap. 11 DIP: Princípio da Inversão de Dependência (PDF p.139-144)**
  - Relevância: clean-architecture-expert: ALTA (regras práticas do DIP, distinção estável/volátil, Abstract Factory, main como componente sujo, anúncio da Dependency Rule); testing-tdd-expert: BAIXA (não trata de testes); clean-code-expert: BAIXA.
  - Decisão sugerida: usar em clean-architecture-expert.
- **Parte IV Princípios dos Componentes: introdução (PDF p.145)**
  - Relevância: clean-architecture-expert: BAIXA. Decisão: descartar (introdução).
  - Decisão sugerida: (não registrada)
- **Cap. 12 Componentes (PDF p.146-155)**
  - Relevância: clean-architecture-expert: MÉDIA (definição de componente como unidade de implantação e base da independência de deploy); testing-tdd-expert: NENHUMA; clean-code-expert: NENHUMA.
  - Decisão sugerida: usar só a definição (p.146-147) em clean-architecture-expert; descartar a história de relocação/ligação.
- **Cap. 13 Coesão de Componentes (PDF p.156-164) [continua no próximo bloco: o texto termina truncado na p.164, no meio do parágrafo sobre a evolução do projeto no diagrama de tensão]**
  - Relevância: clean-architecture-expert: ALTA (critérios de agrupamento em componentes, tensão REP/CCP/CRP, evolução conforme maturidade); testing-tdd-expert: NENHUMA; clean-code-expert: BAIXA.
  - Decisão sugerida: usar em clean-architecture-expert (references: princípios de componentes), completando com o próximo bloco.

### Auditoria da skill atual (trecho das notas)

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

## Bloco 03_p165-246 (lido: PDF p.165-246)

- **Cap. 13 (final): Coesão de componentes, conclusão (PDF p.165) [continua do bloco anterior]**
  - Relevância: clean-architecture-expert: MÉDIA, reforça que particionamento de componentes evolui. Decisão sugerida: usar como nota de contexto em referência de componentes.
  - Decisão sugerida: (não registrada)
- **Cap. 14: Acoplamento de componentes (PDF p.166-193)**
  - Relevância: clean-architecture-expert: ALTA (princípios de componentes ADP/SDP/SAP, métricas I/A/D, como quebrar ciclos); testing-tdd-expert: MÉDIA (ciclos inviabilizam teste de unidade isolado, p.172-173); clean-code-expert: BAIXA.
  - Decisão sugerida: usar em clean-architecture-expert/references (novo arquivo de princípios de componentes e métricas) e criar checklist de revisão de dependências entre módulos.
- **Cap. 15: O que é arquitetura? (PDF p.195-210)**
  - Relevância: clean-architecture-expert: ALTA (definição, política x detalhes, adiar decisões); testing-tdd-expert: BAIXA; clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (mentalidade e referência de "arquitetura como adiamento de decisões").
- **Cap. 16: Independência (PDF p.211-224)**
  - Relevância: clean-architecture-expert: ALTA (camadas x fatias verticais, duplicação falsa, view model, modos de desacoplamento monolito-primeiro); software-architecture / architecture-hard-parts-expert: MÉDIA (trade-off de serviços prematuros); testing-tdd-expert: BAIXA; clean-code-expert: BAIXA (duplicação acidental nuança o DRY).
  - Decisão sugerida: usar em clean-architecture-expert (nova seção sobre desacoplamento vertical/horizontal, duplicação verdadeira x acidental e modos de desacoplamento); sugerir a software-architecture a regra "não começar por serviços".
- **Cap. 17: Fronteiras, estabelecendo limites (PDF p.225-243)**
  - Relevância: clean-architecture-expert: ALTA (limites, direção das setas, banco e UI como plug-ins, decisões prematuras, interface do repositório no lado do domínio); testing-tdd-expert: MÉDIA (Mock/InMemory antes do banco, testes rápidos, p.231-234); architecture-hard-parts / software-architecture: MÉDIA (casos P e W como anti-exemplos de decisão prematura); clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (limites, plug-in, adiar decisões, estratégia de dublês e implementação em memória) e em testing-tdd-expert (estratégia de testes sem banco).
- **Cap. 18: Anatomia do limite (PDF p.244-246) [continua no próximo bloco]**
  - Relevância: clean-architecture-expert: ALTA (cruzamento de limite e inversão por polimorfismo), a completar no próximo bloco.
  - Decisão sugerida: usar em clean-architecture-expert, junto com o bloco seguinte.

### Auditoria da skill atual (trecho das notas)



## Bloco 04_p247-328 (lido: PDF p.247-328)

- **Cap. 18 (final): Limites: traçando linhas, trecho "Cruzando limites" até Conclusão (PDF p.247-252) [continua do bloco anterior]**
  - Relevância: clean-architecture-expert: MÉDIA, ancora que limite não é só "serviço" e que a Dependency Rule vale em qualquer nível de granularidade. testing-tdd-expert: NENHUMA. clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (references/boundaries.md, tabela dos tipos de limite e custo de comunicação).
- **Cap. 19: Política e nível (PDF p.253-259)**
  - Relevância: clean-architecture-expert: ALTA, definição operacional de "nível" e critério de agrupamento de políticas; a skill não define por que "dentro" é mais alto. testing-tdd-expert: NENHUMA. clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (SKILL.md, princípio de nível/política; exemplo encrypt em references).
- **Cap. 20: Regras de negócio (PDF p.260-267)**
  - Relevância: clean-architecture-expert: ALTA, distinção Entidade (regra crucial, reutilizável) versus Caso de Uso (regra específica da aplicação), e regra de request/response sem Entidades. testing-tdd-expert: BAIXA. clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (corrigir "use case não contém regra de negócio"; adicionar request/response models e a regra de não referenciar Entidades).
- **Cap. 21: Arquitetura gritante (PDF p.268-272)**
  - Relevância: clean-architecture-expert: ALTA (Screaming Architecture, adiar decisões, web como detalhe). testing-tdd-expert: MÉDIA (casos de uso testáveis sem framework). clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (manter seção; ajustar a justificativa da regra "nunca controllers/services").
- **Cap. 22: Arquitetura limpa (PDF p.273-284)**
  - Relevância: clean-architecture-expert: ALTA (núcleo). testing-tdd-expert: MÉDIA (testabilidade como consequência da Regra). clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (SKILL.md: quatro círculos + "podem ser mais"; references: fluxo Controller/Boundary/Interactor/Presenter/ViewModel; regra de dados cruzando limites).
- **Cap. 23: Apresentadores e objetos Humble (PDF p.285-290)**
  - Relevância: clean-architecture-expert: ALTA (Presenter/View Model, gateways, ORM como detalhe de banco). testing-tdd-expert: ALTA (Humble Object, test doubles em gateways, onde cortar para testar). clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (references/presenters-and-humble-objects.md) e em testing-tdd-expert (padrão Humble Object).
- **Cap. 24: Limites parciais (PDF p.291-295)**
  - Relevância: clean-architecture-expert: ALTA (a skill manda sempre usar interfaces e Ports & Adapters, sem discutir custo nem limite parcial). testing-tdd-expert: BAIXA. clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (references/boundaries.md: custo, três formas parciais, risco de degradação).
- **Cap. 25: Camadas e limites (PDF p.296-305)**
  - Relevância: clean-architecture-expert: ALTA (propriedade da interface pelo lado de nível alto, limites por eixo de mudança, decisão de custo/inflexão, e aviso de que nem tudo precisa da arquitetura completa). testing-tdd-expert: BAIXA. clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (references/boundaries.md; contrapeso ao "sempre aplicar").
- **Cap. 26: O componente Main (PDF p.306-311)**
  - Relevância: clean-architecture-expert: ALTA (a skill só tem `infrastructure/configuration/` sem o conceito de Main/plug-in). testing-tdd-expert: MÉDIA (Main de teste como configuração alternativa). clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (seção sobre Main/composition root).
- **Cap. 27: Serviços: grandes e pequenos (PDF p.312-322)**
  - Relevância: clean-architecture-expert: MÉDIA (a skill tem seção de sistemas distribuídos sem este contrapeso). software-architecture/architecture-hard-parts-expert: ALTA [fora da lista de candidatos, mas relevante]. testing-tdd-expert: NENHUMA. clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (aviso: serviço não é arquitetura; arquitetura interna por componentes) e sinalizar ao orquestrador para a skill de grupo/hard-parts.
- **Cap. 28: O limite Teste (PDF p.323-328)**
  - Relevância: testing-tdd-expert: ALTA (testes frágeis, acoplamento estrutural 1:1 classe/método, API de teste, não testar regras via GUI). clean-architecture-expert: ALTA (testes como círculo externo, testes por camada: regras sem GUI/DB). clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em testing-tdd-expert (critérios de desenho de testes) e em clean-architecture-expert (seção de testes por camada).

### Auditoria da skill atual (trecho das notas)

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

## Bloco 05_p329-410 (lido: PDF p.329-410)

- **Cap. 29 - Arquitetura Limpa Embarcada (PDF p.329-351)**
  - Relevância para os artefatos candidatos: clean-architecture-expert: MÉDIA, reforça "hardware/SO/processador são detalhes" e abstração por interface/linha de junção; testing-tdd-expert: MÉDIA, testabilidade fora do alvo como critério arquitetural, gargalo do alvo; clean-code-expert: BAIXA, DRY/#ifdef é periférico.
  - Decisão sugerida: usar em clean-architecture-expert (referência curta "detalhes: hardware, SO, processador" e critério "testável fora do ambiente-alvo"); pouco ou nada para testing-tdd-expert além do critério de seam.
- **Parte VI - Detalhes (divisória, PDF p.352)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Cap. 30 - A Base de Dados é um Detalhe (PDF p.353-361)**
  - Relevância: clean-architecture-expert: ALTA, regra "banco é detalhe; modelo de dados importa; não vazar linhas/tabelas/ORM para casos de uso e regras"; testing-tdd-expert: BAIXA; clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (referência sobre detalhes: banco, com regra sobre objetos de ORM vazando).
- **Cap. 31 - A Web é um Detalhe (PDF p.362-367)**
  - Relevância: clean-architecture-expert: ALTA, UI/web como detalhe e limite via dados de entrada/saída do caso de uso; testing-tdd-expert: BAIXA; clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (referência "detalhes", seção web/UI).
- **Cap. 32 - Frameworks são Detalhes (PDF p.368-372)**
  - Relevância: clean-architecture-expert: ALTA, regra de não deixar framework entrar em Entidades/casos de uso, DI no Main; testing-tdd-expert: NENHUMA; clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (referência sobre detalhes e checklist "anotações de framework nos objetos de domínio").
- **Cap. 33 - Estudo de Caso: Vendas de Vídeo (PDF p.373-379)**
  - Relevância: clean-architecture-expert: ALTA, exemplo de partição por ator + Regra de Dependência, componentes como unidades de implantação, flexibilidade de empacotamento; testing-tdd-expert: NENHUMA; clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (exemplo de decomposição por ator e opções de empacotamento).
- **Cap. 34 - O Capítulo Perdido (PDF p.380-403) (contribuição de Simon Brown; texto em primeira pessoa e diz "Uncle Bob disse", ou seja, outro autor; a autoria não é declarada nas páginas do bloco)**
  - Relevância: clean-architecture-expert: ALTA, estrutura de pastas/pacotes, uso do compilador (visibilidade) e árvores/módulos de build para impor a Dependency Rule, antipadrão périphérique, camadas relaxadas; testing-tdd-expert: BAIXA, apenas observação de que enforcement automático é melhor que disciplina; clean-code-expert: MÉDIA, o excesso de public e o encapsulamento por visibilidade.
  - Decisão sugerida: usar em clean-architecture-expert (nova referência "estrutura de código e enforcement" com os quatro estilos e o uso do compilador); citar em clean-code-expert apenas como encapsulamento/visibilidade mínima.
- **Parte VII - Apêndice (PDF p.404) e Apêndice A - Arquitetura Arqueologia (PDF p.405-410) [continua no próximo bloco]**
  - Relevância: clean-architecture-expert: BAIXA; demais: NENHUMA.
  - Decisão sugerida: descartar neste bloco (revisar a continuação no bloco seguinte).

### Auditoria da skill atual (trecho das notas)

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

## Bloco 06_p411-489 (lido: PDF p.411-489)

- **Apêndice A: Supervisor de contabilidade, ASC/Varian 620/f (PDF p.411-414) [continua do bloco anterior]**
  - Relevância: clean-architecture-expert: MÉDIA (exemplo concreto de fluxo de controle x direção de dependência); testing-tdd-expert: NENHUMA; clean-code-expert: NENHUMA.
  - Decisão sugerida: usar como exemplo ilustrativo em clean-architecture-expert (references), opcional.
- **Laser Trim / Teradyne Applied Systems (PDF p.414-419)**
  - Relevância: clean-architecture-expert: BAIXA/MÉDIA (anti-exemplo: ter camadas não é ter limites; vazamento no DSL).
  - Decisão sugerida: anti-padrão curto, opcional.
- **Monitoramento de alumínio fundido, OMC (PDF p.419-421)**
  - Relevância: todas NENHUMA. Decisão: descartar.
  - Decisão sugerida: (não registrada)
- **4-TEL (PDF p.421-427)**
  - Relevância: clean-architecture-expert: MÉDIA (origem de plug-in/independência de deploy e limites como DSL de mensagens); testing-tdd-expert: NENHUMA.
  - Decisão sugerida: usar como exemplo opcional de "limite que permite implantação independente".
- **SAC: Computador da Área de Serviço (PDF p.427-433)**
  - Relevância: clean-architecture-expert: ALTA (anti-padrões concretos: detalhes de dispositivo/UI espalhados; custo da mudança; reescrita paralela); clean-code-expert: BAIXA (menciona "código limpo", mas sem critérios); testing-tdd-expert: NENHUMA (não há menção de testes).
  - Decisão sugerida: usar em clean-architecture-expert como anti-padrões/lições (isolar dispositivo; reescrita total arriscada).
- **Linguagem C, BOSS, pCCU (PDF p.433-440)**
  - Relevância: clean-architecture-expert: BAIXA/MÉDIA (custo de adiar limites óbvios; atender necessidade real com solução mínima).
  - Decisão sugerida: opcional; no máximo uma linha.
- **DLU/DRU (PDF p.440-442)**
  - Relevância: clean-architecture-expert: BAIXA (contrapeso ao dogmatismo: o que importa é atender a necessidade). Decisão: opcional/descartar.
  - Decisão sugerida: (não registrada)
- **VRS: Voice Response System (PDF p.443-446)**
  - Relevância: clean-architecture-expert: ALTA (caso real de custo de acoplar banco/fornecedor ao negócio; evidência para "banco é detalhe"); testing-tdd-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert como exemplo/justificativa.
- **O Recepcionista Eletrônico (ER) (PDF p.446-449)**
  - Relevância: clean-architecture-expert: BAIXA. Decisão: descartar ou nota curta.
  - Decisão sugerida: (não registrada)
- **CDS: Craft Dispatch System (PDF p.449-452)**
  - Relevância: clean-architecture-expert: BAIXA (OCP via configuração externa; exemplo de extensão sem modificação).
  - Decisão sugerida: opcional.
- **Clear Communications (PDF p.452-454)**
  - Relevância: clean-code-expert: BAIXA (anti-exemplo de função gigante, mas sem diretrizes). Decisão: descartar.
  - Decisão sugerida: (não registrada)
- **Origem do SOLID e Uncle Bob (PDF p.454-458)**
  - Relevância: clean-architecture-expert: BAIXA (proveniência do SOLID, apenas como nota histórica).
  - Decisão sugerida: (não registrada)
- **ROSE (Rational) (PDF p.457-460)**
  - Relevância: clean-architecture-expert: ALTA (contraexemplo da Dependency Rule; aviso contra over-engineering; BD como detalhe; dimensionamento da arquitetura); testing-tdd-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (anti-padrões: dependências seguindo fluxo de controle; overengineering; framework de persistência intrusivo; adequar arquitetura ao tamanho do problema).
- **Exame de Registro de Arquitetos (ETS/NCARB) (PDF p.460-463)**
  - Relevância: clean-architecture-expert: ALTA/MÉDIA (reutilização só vem de uso real em várias aplicações; plug-in e Regra da Dependência em exemplo concreto; reuse/release equivalence não é citado aqui); clean-code-expert: NENHUMA.
  - Decisão sugerida: usar em clean-architecture-expert (anti-padrão: framework reutilizável especulativo; política no núcleo, aplicações como plug-ins).
- **Conclusão do apêndice e notas de rodapé (PDF p.463-465)**
  - Relevância: NENHUMA. Decisão: descartar.
  - Decisão sugerida: (não registrada)
- **Páginas de propaganda de outros livros (PDF p.467-489)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Recomendações (somente com base no bloco)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)

### Auditoria da skill atual (trecho das notas)

Escopo: `skills/clean-architecture-expert/SKILL.md` (v1.0) e `references/hexagonal-structure.md`, `references/use-case-example.md`. Este bloco (PDF p.411-489) é só o final do Apêndice A (memórias do autor); quase nada dele é normativo. Os itens abaixo comparam as afirmações da skill apenas com o que está no texto do bloco. O que não está no bloco é marcado [fora do livro].

### (a) O que a skill afirma e o bloco confirma
- "Banco de dados é um detalhe" / desacoplar de framework e banco: confirmado pelo caso VRS. SQL embutido e chamadas de API do fornecedor espalhados pelo código; com o produto UNIFY cancelado, três meses de troca fracassaram por acoplamento forte [p.445-446]. Lição do autor: bases de dados são detalhes a isolar do propósito de negócio [p.446]. Também ROSE: o banco orientado a objetos virou framework "grande, lento, intrusivo e caro" [p.459].
- "Frameworks são detalhes; nunca devem influenciar o domínio" e "Nunca priorizar frameworks, modismos": apoio indireto no mesmo caso (modismo do banco OO, p.458-459) e na aversão do autor ao acoplamento forte com software de terceiros [p.446].
- Dependency Rule, dependências apontam para a política de alto nível: o autor aplica explicitamente a Regra da Dependência ao framework de GUI e às vinhetas (plug-ins; política de alto nível no framework) [p.463]; e diagnostica o oposto na ROSE (dependências na direção do fluxo de controle, não da política) como contribuinte da morte do produto [p.458-459].
- "Nunca misturar domínio e infraestrutura": no SAC, controle de modem e UI espalhados pelas regras de negócio geraram o hack de tradução de bits [p.429-430]; lição: isolar hardware das regras de negócio e usar interfaces abstratas [p.430].
- Interfaces para dependências externas e inversão de dependência: no supervisor de 1971, a interface polimórfica invertia a dependência e o supervisor não sabia nada das aplicações além do ponto inicial [p.414].
- Manutenibilidade / custo futuro: SAC com código de despacho "oficialmente rígido" [p.428] (anedota, não métrica).
- Ports & Adapters / limites para integração externa: o 4-TEL mostra limite SAC/COLT limpo, com pacotes curtos tipo DSL [p.422] (confirmação fraca; o bloco não nomeia Ports & Adapters).

### (b) O que a skill afirma e o bloco contradiz ou não suporta
- A skill exige camadas completas (domain/application/adapters/infrastructure), Hexagonal "sempre que houver integração externa", DDD, Sagas, Outbox, sem contrapeso de proporcionalidade. O bloco diz que o maior erro da ROSE foi o excesso de arquitetura e que a arquitetura deve se adaptar ao tamanho do problema [p.459-460]. Não é contradição direta, mas a skill não suporta esse limite (lacuna de calibragem).
- Taxonomia "Infrastructure -> Adapters -> Application -> Domain", com `infrastructure` podendo depender de "Qualquer camada": o bloco não descreve camadas nem diretórios; não suporta nem contradiz. Os nomes das camadas são [fora do livro] em relação a este bloco.
- "Casos de Uso são o centro do sistema" e o modelo ator/objetivo/entrada/saída: o bloco não menciona casos de uso. Não suportado aqui.
- Screaming Architecture, DDD (Aggregates, Value Objects), Domain Events, Sagas, Outbox, Circuit Breaker: ausentes do bloco [fora do livro].
- "Regra Máxima: a única forma de desenvolver software rapidamente é desenvolvê-lo corretamente": a frase não aparece no bloco. O bloco traz startup que codificava sem arquitetura ("Só código, droga!", p.454), mas atribui o fracasso comercial ao mercado desinteressado [p.454], não à falta de arquitetura. Nem suporta nem contradiz.
- "Código testável sem banco, API ou mensageria" e "Testabilidade... se não, arquitetura incorreta": o bloco não menciona testes; não suporta.
- A skill enuncia a regra como "dependências apontam para dentro" e lista camadas. O bloco ressalva que a ROSE tinha regra de dependência estrita entre camadas, mas não a do livro [p.458-459]: ter camadas com dependências controladas não basta (ver c1).

### (c) O que o bloco traz e a skill não cobre
1. Camadas controladas não bastam: a ROSE tinha camadas verdadeiras e dependências estritas, mas voltadas ao fluxo de controle (GUI > representação > regras > banco), o que contribuiu para a morte do produto [p.457-459]. Acréscimo sugerido: no teste de Dependency Rule, verificar a direção em relação à política, não só a existência de camadas.
2. Excesso de arquitetura / dimensionamento: camadas extras com sobrecarga de comunicação reduziram a produtividade; adaptar a arquitetura ao tamanho do problema [p.459-460]. A skill não tem regra de proporcionalidade.
3. Fluxo de controle x direção de dependência: no supervisor de 1971, um limite tem dependência normal (mesma direção do fluxo) e outro invertida (polimorfismo por endereço fixo) [p.414]. A skill só enuncia a regra.
4. Custo de adiar limites óbvios ("armadilha do cronograma") e solução mínima que atende o caso real (pCCU em cerca de uma semana) [p.438-440].
5. Reescrita total paralela como risco: equipe de redesign dificilmente alcança a equipe grande que mantém o sistema antigo; o "Time Tigre" falhou [p.430-431]. Bifurcação de código por região (EUA/Reino Unido) com reintegração falhando três vezes [p.431-433]. A skill cobre refatoração de legado só de forma genérica.
6. Frameworks reutilizáveis: para criar um reutilizável é preciso antes criar um utilizável, junto de várias aplicações; o primeiro framework de 45.000 linhas não serviu às novas [p.462-463]. Vinhetas como plug-ins, política de alto nível no framework [p.463]. A skill não trata reuso nem plug-ins.
7. Independência de deploy por indireção: arquitetura de plug-in via vetores [p.425-426]; máquina de estado externalizada como extensão sem modificar código (OCP) [p.450-451]. A skill não cobre plug-in nem OCP por configuração.
8. Limites como mensagens/DSL curtas entre processos [p.422]; serviços independentemente implantáveis (ER), com ressalva do autor de que não era "limpa" por não ser plug-in [p.448].
9. Casos concretos de acoplamento como evidência: SQL embutido e API de fornecedor espalhada (VRS) [p.445]; hack de tradução no nível de bits em vez de interface abstrata (SAC) [p.429-430]; chamadas cíclicas MOP/camada utilitária [p.418]. A skill veda anotações/SQL no domínio em termos gerais, sem esses casos.
10. Dois estilos diferentes igualmente eficazes (pipeline de filas x tarefa por terminal) [p.442]: contrapeso a dogmatismo.
11. Origem do SOLID citada de passagem (debates na Netnews) [p.455]; nada sobre o conteúdo dos princípios.
12. Testes por camada, componentes, fronteiras parciais, Humble Object etc.: [fora do bloco]; não foram usados.

### Recomendações (somente com base no bloco)
- clean-architecture-expert: acrescentar uma referência curta de "proporcionalidade e armadilhas de campo" com c1, c2, c5, c6 e c9, citando o apêndice; incrementar versão e revisar grupos que citam a skill (backend-engineering, software-architecture).
- testing-tdd-expert: nada neste bloco.
- clean-code-expert: nada utilizável (menções a "código limpo" são anedóticas, p.428; função de 3000 linhas, p.453).
