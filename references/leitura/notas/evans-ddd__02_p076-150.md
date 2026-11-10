# Notas: Evans, Domain-Driven Design, bloco 02 (PDF p.76-150)

Observações gerais: o texto do bloco está em INGLÊS (a extração não é a tradução em português). Os termos de padrão aparecem em caixa alta (ENTITY, VALUE OBJECT, AGGREGATE, etc.). Os números impressos de página não são visíveis no bloco ("impr." não anotado); só há "[ Team LiB ]" como cabeçalho/rodapé de extração. Figuras (diagramas) não vêm no texto; só legendas.

Mapa do bloco: fim do Cap. 4 (p.76-82), Cap. 5 (p.83-115), Cap. 6 (p.116-145), Cap. 7 início (p.146-150).

---

### Cap. 4 (final): Relating the Layers / Architectural Frameworks (PDF p.76-77) [continua do bloco anterior]
Resumo: Fecha a discussão de LAYERED ARCHITECTURE. Explica como conectar as camadas sem perder o isolamento do domínio e como tratar frameworks arquiteturais.
Conceitos e regras:
- Dependências de projeto vão em uma só direção (camadas superiores usam as inferiores). Quando uma camada inferior precisa "falar para cima" além de responder a uma consulta, usam-se mecanismos como callbacks ou OBSERVERS. [p.76]
- Para ligar UI a aplicação/domínio, MVC é o "avô" dos padrões (Fowler 2002, Larman 1998: MODEL-VIEW SEPARATION, APPLICATION COORDINATOR). Qualquer abordagem serve desde que mantenha o domínio isolado, projetável sem pensar na UI. [p.76]
- A camada de infraestrutura normalmente NÃO inicia ação no domínio; por estar abaixo, não deve conhecer o domínio. Capacidades técnicas são em geral oferecidas como SERVICES. Exemplo: interface de envio de mensagens (e-mail, fax) na infra; a aplicação decide QUANDO enviar, não COMO. [p.76]
- Nem toda infraestrutura é SERVICE chamável: alguns componentes dão suporte direto às outras camadas (classe base abstrata para objetos de domínio, implementações de MVC). Esse "framework arquitetural" tem muito mais impacto no design. [p.76-77]
- Frameworks arquiteturais costumam exigir que as outras camadas sejam subclasses ou tenham assinaturas específicas. Os melhores resolvem problemas técnicos complexos deixando o desenvolvedor focar no modelo; os ruins impõem suposições que restringem o domínio ou deixam o desenvolvimento pesado. [p.77]
- Regra prática: usar o framework com foco no objetivo (implementação que expressa o modelo), mesmo que isso signifique não usar todos os recursos. Exemplo J2EE: "entity beans" para todos os objetos de domínio atrapalhou desempenho e ritmo; a prática atual é usar o framework para objetos de maior granularidade e objetos Java comuns para a maior parte da lógica de negócio. [p.77]
- Aplicar só os recursos mais valiosos reduz acoplamento com o framework e mantém objetos de negócio legíveis/expressivos. Cuidado com "camisa de força" de frameworks elaborados. [p.77]
Citações curtas de prova:
- "The best architectural frameworks solve complex technical problems while allowing the domain developer to concentrate on expressing a model." [p.77]
O que este trecho NÃO diz: não prescreve um estilo de camadas específico (hexagonal, onion); não define "Dependency Rule"; não fala de inversão de dependência explicitamente.
Relevância para os artefatos candidatos: domain-driven-design: MÉDIA, regra "framework a serviço do modelo / uso seletivo" e a infra como SERVICE sem conhecimento do domínio; clean-architecture-expert: MÉDIA, mesma ideia de infra abaixo do domínio e frameworks como detalhe (evidência de Evans, base para exemplos); architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (references de camadas/DDD tático) e como evidência de apoio em clean-architecture-expert.

---

### Cap. 4 (final): The Domain Layer Is Where the Model Lives (PDF p.78) [continua do bloco anterior]
Resumo: DDD exige que exista UMA camada específica, a do domínio; as demais divisões podem variar.
Conceitos e regras:
- O modelo de domínio é um conjunto de conceitos; a "camada de domínio" é sua manifestação (lógica de negócio e elementos de design diretamente relacionados). Em MODEL-DRIVEN DESIGN os construtos de software espelham os conceitos do modelo. [p.78]
- Não é prático obter essa correspondência com a lógica de domínio misturada a outras preocupações; isolar a implementação do domínio é pré-requisito de DDD. [p.78]
Citações curtas de prova:
- "Isolating the domain implementation is a prerequisite for domain-driven design." [p.78]
O que este trecho NÃO diz: não define quantas camadas nem nomes obrigatórios além do domínio.
Relevância: domain-driven-design: ALTA, justificativa do isolamento do domínio como pré-requisito; clean-architecture-expert: ALTA, argumento de base para a camada de entidades/domínio; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (reference de camadas e isolamento) e citar em clean-architecture-expert.

---

### Cap. 4 (final): The Smart UI "Anti-Pattern" (PDF p.79-81) [continua do bloco anterior]
Resumo: Evans apresenta SMART UI como um caminho alternativo, mutuamente exclusivo com DDD, legítimo para projetos simples com equipes pouco experientes. Serve para esclarecer QUANDO vale pagar o custo de isolar o domínio.
Conceitos e regras:
- Contexto em que SMART UI se aplica: funcionalidade simples, dominada por entrada/exibição de dados, poucas regras de negócio, equipe sem modeladores de objetos avançados. Tentar MODEL-DRIVEN DESIGN com camadas nesse cenário gera curva de aprendizado difícil, tarefas simples mais lentas e risco de cancelamento antes de entregar. [p.79]
- A receita do SMART UI: toda a lógica de negócio na UI, aplicação dividida em pequenas funções (cada uma uma UI), banco relacional como repositório de dados compartilhado, ferramentas visuais/4GL. [p.79]
- Vantagens listadas: produtividade alta e imediata em apps simples; devs menos capazes trabalham com pouco treino; protótipo ao usuário compensa falhas de análise; apps desacoplados entre si (prazos de módulos pequenos previsíveis); integração no nível de dados via relacional; 4GL funciona; manutenção localizada (refazer trechos incompreensíveis). [p.80]
- Desvantagens listadas: integração só pelo banco; sem reuso de comportamento nem abstração (regras duplicadas em cada operação); limite natural de prototipagem/iteração por falta de abstração (pouca margem para refatorar); complexidade "enterra" rápido e o caminho de crescimento é só mais apps simples, sem caminho gracioso para comportamento mais rico. [p.80]
- Erros comuns: adotar abordagem sofisticada sem compromisso de levá-la até o fim; montar infraestrutura complexa/ferramentas industriais para projeto que não precisa. Linguagens flexíveis (Java) são exagero para SMART UI e custam caro; usar linguagem geral não dá saída futura do SMART UI (só substituindo apps inteiros). Não "cobrir aposta". [p.80]
- Quem se compromete com MODEL-DRIVEN DESIGN deve projetar assim desde o início; mesmo começando com funcionalidade simples, os primeiros passos devem ter domínio isolado, senão o projeto provavelmente ficará preso em SMART UI. [p.80-81]
- Há soluções intermediárias: TRANSACTION SCRIPT (Fowler 2002) separa UI da aplicação mas sem modelo de objetos. Critério geral: se a arquitetura isola o código do domínio permitindo design coeso e fracamente acoplado ao resto, ela provavelmente sustenta DDD. [p.81]
- Aplicação complexa + compromisso com MODEL-DRIVEN DESIGN: conseguir os especialistas necessários e evitar SMART UI. [p.81]
Citações curtas de prova:
- "There is no reuse of behavior and no abstraction of the business problem." [p.80]
- "Complexity buries you quickly, so the growth path is strictly toward additional simple applications." [p.80]
- "Just using a flexible language doesn't create a flexible system, but it may well produce an expensive one." [p.80]
O que este trecho NÃO diz: não oferece critérios numéricos/limiares para "simples" vs "complexo"; não discute "anemic domain model" aqui (aparece só adiante, p.110); não trata microsserviços.
Relevância: domain-driven-design: ALTA, é critério de quando NÃO usar DDD (seção "quando usar/não usar" que a skill atual provavelmente não cobre com este grau de detalhe); clean-architecture-expert: MÉDIA, trade-off de custo de camadas para sistemas simples; architecture-hard-parts-expert: MÉDIA, é uma análise de trade-off (vantagens/desvantagens, custo de saída irreversível, "não cubra a aposta") que serve de exemplo de decisão arquitetural.
Decisão sugerida: usar em domain-driven-design (reference "quando aplicar DDD / Smart UI / alternativas: Transaction Script"); exemplo de trade-off em architecture-hard-parts-expert (opcional).

---

### Cap. 4 (final): Other Kinds of Isolation (PDF p.82) [continua do bloco anterior]
Resumo: Aponta que há ameaças ao modelo além de infra e UI e antecipa capítulos posteriores.
Conceitos e regras:
- Outros componentes de domínio não integrados, e outras equipes com modelos diferentes do mesmo domínio, também corrompem o modelo; o Cap. 14 trata disso com BOUNDED CONTEXT e ANTICORRUPTION LAYER. [p.82]
- Um modelo muito complicado fica difícil por si só; o Cap. 15 (Distillation) trata de separar o essencial do periférico na camada de domínio. [p.82]
O que este trecho NÃO diz: não explica nenhum desses padrões, só os referencia.
Relevância: domain-driven-design: BAIXA (apenas ponteiro; o conteúdo real está nos Caps. 14 e 15 em outro bloco).
Decisão sugerida: descartar neste bloco (ver Caps. 14-15 em outros blocos).

---

### Cap. 5 (intro): A Model Expressed in Software (PDF p.83-84)
Resumo: Apresenta o capítulo: conectar modelo e implementação no nível de detalhe via associações, ENTITIES, VALUE OBJECTS, SERVICES, MODULES e paradigmas. Anuncia compromissos inevitáveis (ex.: banco relacional).
Conceitos e regras:
- A distinção ENTITY vs VALUE OBJECT: tem continuidade e identidade rastreadas ao longo de estados/implementações, ou é atributo que descreve algo? [p.83]
- Operações do domínio que são ações, não coisas, devem ser SERVICES em vez de forçadas em ENTITY/VALUE OBJECT. [p.83]
- MODULES: coesão alta e acoplamento baixo aplicados a conceitos, não só a métricas técnicas; MODULES fazem parte do modelo. [p.83]
O que este trecho NÃO diz: é só introdução; p.84 sem texto útil.
Relevância: domain-driven-design: MÉDIA (panorama).
Decisão sugerida: usar apenas como estrutura; o conteúdo está nas seções seguintes.

---

### Associations (PDF p.85-90)
Resumo: Toda associação navegável no modelo exige um mecanismo equivalente no software. Evans mostra três formas de simplificar associações e exemplifica com Brokerage Account em Java (referência direta) e em SQL (consulta), ambos coerentes com o mesmo modelo.
Conceitos e regras:
- Para cada associação traversável no modelo há um mecanismo de software com as mesmas propriedades (ponteiro de objeto, coleção, ou encapsulamento de consulta ao banco). Um-para-muitos pode ser coleção em variável de instância ou um acessor que consulta o banco; ambos refletem o mesmo modelo. [p.85]
- Muitos-para-muitos e bidirecionais são naturais no início da modelagem, mas complicam implementação/manutenção e comunicam pouco. Três formas de torná-las tratáveis: (1) impor direção de travessia; (2) adicionar qualificador (reduz multiplicidade); (3) eliminar associações não essenciais. [p.85]
- Associação bidirecional significa que os dois objetos só são compreendidos juntos; se os requisitos não exigem as duas direções, impor direção reduz interdependência. A direção costuma refletir viés do domínio. Exemplo: país -> presidente (unidirecional) mantém Person independente do conceito de "President". [p.85]
- Qualificador: um país tem um presidente por vez; qualificar por data reduz para um-para-um e embute uma regra importante no modelo ("quem era presidente em 1790?"). [p.86]
- Restringir direção de muitos-para-muitos reduz a implementação a um-para-muitos. Restringir de forma consistente dá significado às bidirecionais que sobram (a bidirecionalidade passa a ser semântica do domínio). [p.86]
- Exemplo Brokerage Account: Account com Customer e conjunto de Investments; versão Java com Set; versão relacional com SS_NUMBER e consultas. Qualificar Account->Investment por símbolo de ação (um investimento por ação) troca Set por Map e `getInvestment(symbol)`. Evans ressalva que a regra não vale para todo negócio (ex.: se lotes precisam ser rastreados). Constraints descobertas devem entrar no modelo e na implementação. [p.86-90]
- Nota do autor: o QueryService do exemplo é simples para explicar, não necessariamente bom design real. [p.88]
Citações curtas de prova:
- "For every traversable association in the model, there is a mechanism in the software with the same properties." [p.85]
- "It is important to constrain relationships as much as possible." [p.85]
O que este trecho NÃO diz: não fala de IDs entre agregados nem de carregamento lazy; o exemplo com SQL concatenado é ilustrativo (vulnerável a injeção, não comentado pelo autor) e não deve ser copiado.
Relevância: domain-driven-design: ALTA, três técnicas de simplificação de associações + exemplo trabalhado reaproveitável (com a ressalva do SQL concatenado); clean-architecture-expert: BAIXA; architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar em domain-driven-design (reference de DDD tático: associações), reescrevendo exemplo sem SQL concatenado.

---

### Entities (a.k.a. Reference Objects) (PDF p.91-96)
Resumo: ENTITY é o objeto definido por identidade contínua ao longo do ciclo de vida (e através de várias representações), não pelos atributos. Evans cobre como modelar ENTITIES enxutas e como projetar a operação de identidade.
Conceitos e regras:
- Definição: objeto definido por um fio de continuidade e identidade; pode precisar ser casado com outro mesmo com atributos diferentes, e distinguido de outro mesmo com atributos iguais; erro de identidade causa corrupção de dados. [p.92]
- A identidade pode atravessar formas diferentes (objeto em memória, linha de banco, extrato em outro sistema, ator do mundo real). Cliente que liga: é o devedor? é o que o vendedor Jack atende? Atributos podem divergir (atualização de endereço em propagação). [p.92]
- ENTITY do modelo não é "entity bean" Java; a maioria das ENTITIES é implementada como objetos comuns. [p.92, nota 1]
- Identidade automática da linguagem (==) compara posição de memória e é frágil: nova instância a cada leitura do banco ou transmissão na rede. A identidade tem de ser definida pelo modelo, não delegada à linguagem. [p.92, 94]
- Exemplo bancário: dois depósitos idênticos no mesmo dia são ENTITIES distintas; o valor monetário (money) é VALUE sem identidade. O número do cheque serve de identificador para conciliação. [p.93]
- Identidade não é intrínseca à coisa: é um significado sobreposto por utilidade. Exemplo do estádio: com assento marcado, o assento é ENTITY (número identifica); em admissão geral não é ENTITY e associar assentos específicos a ingressos seria erro. [p.93]
- Regra (Therefore): quando o objeto é distinguido pela identidade, torná-la primária na definição; manter a classe simples e focada em continuidade e identidade; definir operação que garanta resultado único; o identificador pode vir de fora ou ser arbitrário criado pelo sistema, mas deve corresponder às distinções do modelo. [p.93]
- Modelar ENTITIES: manter enxutas; deixar só características intrínsecas (as que identificam ou são usadas para achar/casar), comportamento essencial e atributos que ele exige; mover o resto para outros objetos associados (outras ENTITIES ou VALUE OBJECTS). ENTITIES tendem a cumprir responsabilidades coordenando os objetos que possuem. Ex.: phone/address ficam em Customer só se servem para casar; se há vários telefones por finalidade, ficam em Sales Contact. [p.93-94]
- Projeto da identidade: o atributo identificador deve ser único no sistema, mesmo distribuído e arquivado. Opções: (a) chave natural por combinação de atributos (ex.: jornal = nome + cidade + data, mas cuidado com edições extras e mudanças de nome); (b) símbolo (número/string) único por classe, imutável, preservado ao achatar no banco e reconstruir; (c) ID gerado pelo sistema (unicidade difícil em concorrência/distribuição; o autor diz que técnicas estão fora do escopo); (d) ID externo (ex.: nº da previdência dos EUA em hospitais) com ressalvas (nem todos têm, privacidade); (e) telefone como ID informal (compartilhável, muda, é reatribuído). [p.94-95]
- IDs gerados podem ser invisíveis ao usuário (agenda com dois contatos de mesmo nome) ou relevantes (número de rastreamento, código de confirmação). [p.95]
- Quando o ID é externo, usuários ficam responsáveis por fornecê-lo único e o sistema precisa dar ferramentas para exceções. Atribuir IDs especiais (ex.: número de passageiro frequente) e usar telefone/CPF-like só para casar e verificar. [p.95]
- Questão conceitual central: o que significa dois objetos serem a mesma coisa? IDs/operações de comparação que não correspondem a uma distinção significativa do domínio só confundem. Por isso atribuição de identidade muitas vezes envolve decisão humana (conciliação de extratos sugere pares, usuário decide). [p.95-96]
Citações curtas de prova:
- "The model must define what it means to be the same thing." [p.93]
- "Identity is not intrinsic to a thing in the world; it is a meaning superimposed because it is useful." [p.93]
- "Mistaken identity can lead to data corruption." [p.92]
O que este trecho NÃO diz: não recomenda UUID/ULID nem estratégia de geração distribuída (explicitamente fora do escopo); não discute igualdade/equals implementação em código.
Relevância: domain-driven-design: ALTA, critérios de decisão (quando algo é ENTITY, exemplos assento/depósito/cliente, opções de identificador com armadilhas) para enriquecer a skill rasa; clean-architecture-expert: MÉDIA, ENTITY como núcleo da camada de domínio; architecture-hard-parts-expert: BAIXA (ID global em sistemas distribuídos, só tangencial).
Decisão sugerida: usar em domain-driven-design (reference DDD tático: Entidades e identidade, com exemplos do estádio e do depósito).

---

### Value Objects (PDF p.97-102)
Resumo: VALUE OBJECT descreve uma característica sem identidade conceitual; deve ser imutável e tratado como um todo conceitual. A ausência de identidade abre liberdade de copiar/compartilhar e otimizar.
Conceitos e regras:
- Atribuir identidade a tudo adiciona custo de rastreamento, impede otimizações, exige análise e "emba­ralha" o modelo ao deixar tudo igual. Fazer distinções para aplicar tratamento especial só onde necessário. [p.97]
- VALUE OBJECT: elemento do design em que importa o que é, não quem/qual. Pode ser rico (cores que se combinam por algoritmos complexos), pode ser composto de outros VALUES (janela = estilo + altura + largura + regras), pode referenciar ENTITIES (Route que liga duas cidades por uma rodovia ainda é VALUE). Frequentemente passado como parâmetro, transitório, e usado como atributo de ENTITIES (nome da pessoa). [p.98]
- Depende de quem pergunta: "Address" é VALUE (loja de encomendas), ENTITY (correio com hierarquia de zonas; companhia elétrica que precisa saber que colegas de casa são o mesmo ponto de serviço); ou o modelo pode ter ENTITY "dwelling" com atributo Address como VALUE. [p.98]
- Regra (Therefore): se só importam os atributos, classificar como VALUE OBJECT; fazê-lo expressar o significado dos atributos e dar funcionalidade relacionada; tratar como imutável; sem identidade; evitar a complexidade de manter ENTITIES. [p.98]
- Atributos formam um todo conceitual (WHOLE VALUE, Ward Cunningham): rua, cidade e CEP juntos como Address, não soltos em Person. [p.99]
- Compartilhamento exige imutabilidade (senão mudar o nome de uma pessoa mudaria o da outra). Ao passar atributos para outro objeto, passar objeto imutável ou cópia, para que o dono não tenha invariantes violadas. [p.99]
- Desempenho: FLYWEIGHT (um objeto "tomada" compartilhado 100 vezes). Cópia vs compartilhamento depende do ambiente: cópias entopem a memória; compartilhar em sistema distribuído exige mensagens de volta ao objeto. Compartilhar só quando: economizar espaço/objetos no banco é crítico, comunicação é barata (servidor centralizado), e o objeto é estritamente imutável. [p.100]
- Imutabilidade: mudança vira substituição completa; gestão de ciclo de vida simples; com VALUE imutável os desenvolvedores decidem copiar/compartilhar por razões puramente técnicas. A falta de suporte da linguagem para declarar distinções (ENTITY, imutável) exige disciplina, nomes e documentação. [p.100]
- Exceções para mutabilidade (só se o VALUE não for compartilhado): muda com frequência; criação/remoção cara; substituição prejudicaria clustering; pouco compartilhamento. Mesmo assim, projetar como imutável quando possível. [p.101]
- Exemplo de ajuste de banco: copiar o VALUE em vez de referenciá-lo permite armazená-lo na mesma página do dono (desnormalização); no relacional, colocar o VALUE na tabela da ENTITY dona; em sistema distribuído, passar cópia inteira em vez de referência remota. [p.101]
- Associações com VALUE OBJECTS: bidirecional entre dois VALUES não faz sentido (sem identidade não há "o mesmo objeto apontando de volta"); se parecer necessária, reconsiderar se não há uma identidade não reconhecida. [p.102]
Citações curtas de prova:
- "We care only about the attributes of an element of the model" (síntese do critério) é parafraseado; literal: "Tracking the identity of ENTITIES is essential, but attaching identity to other objects can hurt system performance" [p.97]
- "If a VALUE's implementation is to be mutable, then it must not be shared." [p.101]
O que este trecho NÃO diz: não fala de equals/hashCode, nem de validação no construtor; "imutável" é tratado em termos de design, não de sintaxe de linguagem. Não cita Money pattern por nome além de "money object".
Relevância: domain-driven-design: ALTA, critérios "quem pergunta" (Address), WHOLE VALUE, regras de compartilhamento/mutabilidade, exemplos; clean-architecture-expert: MÉDIA (VALUE OBJECT na camada de entidades); architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (reference Value Objects, com o exemplo Address por contexto, que também ilustra dependência de bounded context).

---

### Services (PDF p.103-106)
Resumo: SERVICE é uma operação do domínio que não pertence naturalmente a uma ENTITY/VALUE, oferecida como interface sem estado. Evans distingue serviços de domínio, de aplicação e de infraestrutura com o exemplo de transferência de fundos.
Conceitos e regras:
- Algumas operações importantes do domínio não têm lar natural em ENTITY/VALUE. Forçá-las distorce o objeto ou cria objetos artificiais ("doers" tipo *Manager* sem estado nem significado de domínio). O erro mais comum, porém, é desistir cedo demais de encaixar o comportamento num objeto e escorregar para programação procedural. [p.103]
- Um SERVICE é definido pelo que faz pelo cliente; nomeado por atividade (verbo), com nome da UBIQUITOUS LANGUAGE; parâmetros e resultados são objetos de domínio. Usar com critério para não esvaziar ENTITIES e VALUES. [p.104]
- Três características de um bom SERVICE: (1) a operação relaciona-se a conceito de domínio que não é parte natural de ENTITY/VALUE; (2) interface definida em termos de elementos do modelo; (3) sem estado (qualquer instância serve a qualquer cliente; pode ter efeitos colaterais em informação global, mas não guarda estado próprio que afete seu comportamento). [p.104]
- Particionar serviços por camada: infraestrutura (envio de notificação, sem significado de negócio), aplicação (ordena notificar; exporta transações para planilha: formato de arquivo não tem sentido no domínio bancário), domínio (transferência de fundos: tem nome na linguagem bancária e regras de crédito/débito). Verificar se saldo abaixo do limite é responsabilidade da conta (não precisa de SERVICE). Transferência não cabe em Account porque envolve duas contas e regras globais. [p.104-105]
- Esquema do exemplo (tabela): Application "Funds Transfer App Service" digere a entrada (ex.: XML), envia mensagem ao serviço de domínio, ouve confirmação e decide notificar via serviço de infra; Domain "Funds Transfer Domain Service" interage com Account e Ledger, faz débitos/créditos e retorna o resultado; Infrastructure "Send Notification Service" envia e-mail/carta. [p.105]
- Serviços externos (redes interbancárias) podem ser embrulhados em FACADE que recebe entradas em termos do modelo e devolve p.ex. um Funds Transfer; mesmo assim cumprem a responsabilidade de domínio. [p.105]
- Granularidade: serviços de média granularidade e sem estado são mais fáceis de reusar e evitam mensagens ineficientes de objetos finos em sistemas distribuídos; objetos finos vazam conhecimento do domínio para a camada de aplicação, onde a coordenação acontece; serviços de domínio ajudam a manter a linha entre camadas. Favorece simplicidade de interface sobre controle/versatilidade do cliente. [p.105-106]
- Acesso: o meio de publicação importa menos que a decisão de design; um objeto "doer" ou um SINGLETON simples pode implementar a interface; convenções de código deixam claro que não são objetos de domínio; arquiteturas elaboradas (J2EE, CORBA) só com necessidade real de distribuição. [p.106]
Citações curtas de prova:
- "Sometimes, it just isn't a thing." [p.103]
- "Technical SERVICES should lack any business meaning at all." [p.105]
O que este trecho NÃO diz: não define "application service" por termos formais além do exemplo; não cita use cases nem CQRS; a tabela de partição é por exemplo, não regra geral.
Relevância: domain-driven-design: ALTA, três tipos de serviço com exemplo trabalhado (funds transfer) e critério de 3 características; clean-architecture-expert: ALTA, fronteira application service vs domain service vs infra (Use Cases/Interactors); architecture-hard-parts-expert: BAIXA (só granularidade em sistemas distribuídos, tangencial).
Decisão sugerida: usar em domain-driven-design (reference Services e partição por camada) e em clean-architecture-expert (mapeamento application/domain service).

---

### Modules (a.k.a. Packages) (PDF p.107-111)
Resumo: MODULES existem principalmente contra a sobrecarga cognitiva e devem ser parte do modelo, contando a história do domínio. Evans critica pacotes ditados por infraestrutura (camadas técnicas que despedaçam objetos conceituais).
Conceitos e regras:
- MODULES dão duas visões: detalhe interno sem se afogar no todo, ou relações entre módulos sem detalhes. Coesão alta e acoplamento baixo valem para conceitos, não só para código; há limite do que uma pessoa pensa de uma vez (baixo acoplamento) e fragmentos incoerentes são tão difíceis quanto sopa indiferenciada (alta coesão). [p.107]
- Módulos e objetos devem coevoluir, mas raramente o fazem: módulos escolhidos cedo e depois objetos mudam dentro dos limites; refatorar módulos é mais caro e disruptivo (afeta comunicação da equipe e ferramentas de controle de versão). Módulos devem poder tornar-se sutis e abstratos com o entendimento. [p.107, 108]
- Módulos são mecanismo de comunicação: o nome do módulo entra na UBIQUITOUS LANGUAGE ("vamos falar do módulo 'customer'"). Se o modelo é uma história, módulos são capítulos. [p.107-108]
- Regra (Therefore): escolher módulos que contam a história do sistema e contêm conjunto coeso de conceitos; se o acoplamento não for baixo, mudar o modelo para desembaraçar conceitos ou buscar conceito esquecido que sirva de base de módulo; baixo acoplamento no sentido de conceitos entendíveis independentemente. Em conflito, preferir clareza conceitual mesmo com mais referências entre módulos. [p.108]
- Convenção Java: importar pacotes inteiros (`import pacote.*`) comunica a dependência entre módulos e reduz esforço de renomear, apesar de misturar escalas; se uma classe depende de classe específica de outro pacote sem dependência conceitual entre módulos, reconsiderar posição da classe ou os módulos. [p.108-109]
- Armadilha de empacotamento guiado por infraestrutura: separar camadas de UI/infra do domínio em pacotes diferentes é útil; mas frameworks que espalham um objeto de domínio em vários objetos em pacotes separados (EJB entity bean para dados + session bean para lógica) quebram a coesão e a ligação modelo-design. Relato de projeto com quatro camadas por objeto conceitual (persistência, comportamento intrínseco, funcionalidade da aplicação, interface pública) em pacotes por camada: poucos módulos, ninguém refatorava, difícil achar dados e comportamento de uma classe conceitual, resultado foi modelo de domínio anêmico (acesso ao banco + alguns SERVICES). [p.109-110]
- Duas motivações legítimas por trás desses esquemas: divisão lógica de preocupações (persistência vs negócio) e distribuição de camadas em servidores; mas o custo para o desenvolvimento não é reconhecido e quase nunca há deploy distribuído real ("flexibilidade para caso precise"). [p.110]
- Dois custos: o código deixa de revelar o modelo; e a capacidade mental de "costurar" partições é limitada e o framework a consome. Orientação: mínimo de regras técnicas essenciais (ex.: separar persistência complexa pode ajudar); a menos que haja intenção real de distribuir, manter todo o código de um objeto conceitual no mesmo módulo, se possível no mesmo objeto. [p.110]
- Usar empacotamento para separar a camada de domínio do resto; no demais, liberdade para organizar objetos de domínio conforme o modelo. Exceção: código gerado de design declarativo (Cap. 10) pode ir num pacote à parte. [p.110-111]
- Fecho do capítulo: a correspondência entre modelo e implementação passa por ENTITIES, VALUE OBJECTS, associações, alguns SERVICES de domínio e MODULES; resistir a adicionar aos objetos de domínio o que não se relaciona a seus conceitos. Rules engines etc. são meios para MODEL-DRIVEN DESIGN, não alternativas. [p.111]
Citações curtas de prova:
- "If your model is telling a story, the MODULES are chapters." [p.107]
- "it is best to go with the conceptual clarity, even if it means more references between MODULES" [p.108]
- "Unless there is a real intention to distribute code on different servers, keep all the code that implements a single conceptual object in the same MODULE" [p.110]
O que este trecho NÃO diz: não prescreve "package by feature vs package by layer" por nome, embora a orientação (módulos por conceito do domínio) aponte para o primeiro; não fala de monorepo/microsserviços.
Relevância: domain-driven-design: ALTA, módulos como parte do modelo + antipadrão do empacotamento por camada técnica (com relato do projeto de quatro camadas); clean-architecture-expert: ALTA, argumenta contra estruturação por camada técnica que fragmenta o conceito e produz modelo anêmico (impacta "package by feature" vs "by layer"); architecture-hard-parts-expert: MÉDIA, mostra custo oculto de flexibilidade especulativa ("distribuir caso precise").
Decisão sugerida: usar em domain-driven-design (reference de módulos/empacotamento) e clean-architecture-expert (estrutura de pastas/pacotes); anedota do projeto de quatro camadas como exemplo trabalhado de anti-padrão.

---

### Modeling Paradigms (PDF p.112-115)
Resumo: Discute por que o paradigma de objetos predomina e como misturar paradigmas não-objeto (regras, workflow, relacional) sem abandonar MODEL-DRIVEN DESIGN.
Conceitos e regras:
- Objetos predominam por equilíbrio entre simplicidade e sofisticação (não técnicos acompanham diagramas), maturidade de ferramentas e da comunidade; paradigma esotérico pode perder a UBIQUITOUS LANGUAGE. [p.112]
- Anedota: projeto dos anos 1990 com banco de dados orientado a objetos em larga escala: infraestrutura não escalava, armazenar objetos de granularidade fina era caro, e partes do modelo tinham tantas interdependências que havia contenção com poucas transações concorrentes. Lição: limitar a teia de relacionamentos e desacoplar agregados fortemente inter-relacionados; meses perdidos. [p.112-113]
- Domínios muito matemáticos ou dominados por raciocínio lógico global não se encaixam bem em objetos; um modelo de domínio não precisa ser orientado a objetos (ex.: Prolog com regras e fatos). [p.113-114]
- Misturar paradigmas: se o paradigma alternativo domina, considerar trocar de plataforma; se poucos elementos são anômalos, conviver com alguns objetos estranhos; se a interdependência é pequena, encapsular subsistema (ex.: cálculo matemático chamado por objeto). Rules engines e workflow engines surgem desse motivo; é difícil manter um modelo coerente entre paradigmas. [p.114]
- Rules engines: o paradigma de objetos não tem semântica específica para regras globais; mas resultado comum é aplicação "fraturada em duas" (dados em objetos + processador de regras ad hoc sem ligação ao modelo). Buscar um único modelo para ambos; sem ambiente integrado, destilar um modelo de conceitos fundamentais e usar a UBIQUITOUS LANGUAGE para ligar. [p.114-115]
- Quatro regras práticas: não lutar contra o paradigma de implementação; apoiar-se na ubiquitous language; não ficar preso a UML (desenho simples em outro estilo ou descrição em português é melhor que adaptação tortuosa); ser cético (talvez regras possam ser objetos; vários paradigmas complicam muito). Esgotar as opções do paradigma dominante antes de misturar. [p.115]
- Banco relacional é caso especial (guarda a forma persistente dos próprios objetos); Cap. 6 trata. [p.115]
Citações curtas de prova:
- "Don't get hung up on UML." [p.115]
- "Be skeptical. Is the tool really pulling its weight?" [p.115]
O que este trecho NÃO diz: não trata paradigma funcional (o texto é dos anos 2000) nem event sourcing; datado (J2EE, OODB).
Relevância: domain-driven-design: MÉDIA, regras de ouro para mistura de paradigmas e quando evitar rules engine (nota de contexto; DDD funcional/event sourcing [fora do livro]); clean-architecture-expert: BAIXA; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar parcialmente em domain-driven-design (heurísticas "não lute contra o paradigma", "seja cético com ferramentas"); descartar o histórico de OODB, exceto a lição de granularidade/contenção como ponte para agregados.

---

### Cap. 6 (intro): The Life Cycle of a Domain Object (PDF p.116-117)
Resumo: Objetos de vida longa têm interdependências e invariantes; dois desafios: manter integridade ao longo do ciclo e impedir que a gestão do ciclo afogue o modelo. Três padrões: AGGREGATES, FACTORIES, REPOSITORIES.
Conceitos e regras:
- AGGREGATES definem propriedade e fronteiras (integridade em todas as fases); FACTORIES criam e reconstituem objetos complexos/agregados mantendo a estrutura interna encapsulada; REPOSITORIES cuidam do meio e do fim do ciclo (encontrar/recuperar objetos persistentes). [p.116-117]
- REPOSITORIES e FACTORIES não vêm do domínio, mas têm papéis significativos no design de domínio. AGGREGATES marcam o escopo em que invariantes são mantidas em cada fase; FACTORIES e REPOSITORIES operam sobre AGGREGATES. [p.117]
Relevância: domain-driven-design: MÉDIA (estrutura do capítulo).
Decisão sugerida: usar apenas como ordem de apresentação.

---

### Aggregates (PDF p.118-125)
Resumo: Resolve o problema de limites e consistência em modelos muito interligados e acessados concorrentemente definindo AGGREGATES com raiz e fronteira, com regras rigorosas (sistema de David Siegel, não publicado). Há exemplo trabalhado de Purchase Order com locking que culmina na decisão de modelagem.
Conceitos e regras:
- Problema: deletar uma Person: e o Address (compartilhado)? Sem limite claro, mudança não tem escopo; em acesso concorrente é preciso impedir alterações simultâneas de objetos interdependentes; locks cautelosos demais fazem usuários interferirem sem necessidade. Soluções ad hoc (locks, testes) desviam o foco do modelo ("hacking and hoping"). A raiz do problema está no modelo: falta de fronteiras. [p.118-119]
- Entender o domínio inclui frequência de mudança entre instâncias; é preciso deixar pontos de alta contenção mais soltos e invariantes estritas mais apertadas. [p.119]
- Definição: AGGREGATE é um agrupamento de objetos associados tratado como unidade para mudanças de dados; tem raiz (uma ENTITY específica) e fronteira. Só a raiz pode ser referenciada por objetos externos; objetos internos podem referenciar uns aos outros; ENTITIES internas têm identidade local, distinguível só dentro do AGGREGATE. [p.119]
- Exemplo do carro: Car é raiz (identidade global via VIN); pneus são ENTITIES com identidade local (rodízio, desgaste) porque ninguém consulta pneu e depois descobre o carro; consulta-se o carro e pede-se referência transitória aos pneus. Motor com número de série pode ser raiz de outro AGGREGATE em outras aplicações (a decisão depende do uso). [p.119]
- Invariantes: regras de consistência que devem ser mantidas a cada mudança. Regras que atravessam AGGREGATES não são esperadas atualizadas o tempo todo: resolvem-se por eventos, processamento em lote ou outros mecanismos dentro de um prazo; invariantes DENTRO do AGGREGATE são impostas ao fim de cada transação. [p.120]
- Regras de implementação: (1) a raiz tem identidade global e responde por checar invariantes; internas têm identidade local; (2) nada fora da fronteira mantém referência a algo interno exceto à raiz; a raiz pode entregar referências internas de uso transitório (não retê-las); pode entregar CÓPIA de VALUE OBJECT; (3) corolário: só raízes podem ser obtidas por consulta direta ao banco, o resto por travessia; (4) objetos internos podem referenciar outras raízes de AGGREGATE; (5) delete remove tudo dentro da fronteira de uma vez; (6) ao commit de qualquer mudança interna, todas as invariantes do AGGREGATE inteiro devem estar satisfeitas. [p.120-121]
- Regra (Therefore): agrupar ENTITIES e VALUE OBJECTS em AGGREGATES, escolher uma raiz, controlar todo acesso pelo raiz, referências externas só à raiz, referências transitórias só para uso em uma operação; assim a raiz não é "surpreendida" por mudanças internas. Um framework que declare agregados e aplique o locking ajuda; sem isso é preciso disciplina da equipe. [p.121]
- Exemplo Purchase Order (PO): invariante "soma dos itens não pode exceder o limite do PO". Três problemas: imposição de invariante, gestão de mudança (onde parar ao deletar/arquivar PO; preço da peça em momentos diferentes), contenção no banco. [p.121-122]
- Passo a passo: (a) lock por objeto editado (George no item 001, Amanda em outro item do mesmo PO): ambos salvam e o PO viola o limite sem ninguém saber; (b) lock no PO inteiro previne a violação, bom se o trabalho é espalhado entre muitos POs, pesado se várias pessoas editam itens de um PO grande; (c) lock também na Part (peça): contenção alta nas peças e depois DEADLOCK entre três usuários. [p.122-124]
- Melhoria por conhecimento do negócio: peças são usadas em muitos POs (alta contenção); mudam menos que POs; mudança de preço NÃO precisa propagar para POs existentes (depende do status; POs entregues arquivados mantêm preços da época). Solução: copiar o preço para o Line Item; o PO e seus itens formam AGGREGATE com invariante garantida; mudar preço de peça não afeta itens imediatamente; consistência ampla pode ser tratada de outro jeito (fila diária de itens com preço desatualizado para o usuário atualizar ou isentar), pois não é invariante a impor sempre. [p.125]
- Resultado: dependência Line Item -> Part afrouxada (evita contenção, reflete o negócio) e PO <-> itens apertada (garante a regra); criação/remoção de PO e itens estão naturalmente ligadas, as de Part são independentes. [p.125]
Citações curtas de prova:
- "An AGGREGATE is a cluster of associated objects that we treat as a unit for the purpose of data changes." [p.119]
- "Any rule that spans AGGREGATES will not be expected to be up-to-date at all times." [p.120]
- "We need to find a model that leaves high-contention points looser and strict invariants tighter." [p.119]
- "only AGGREGATE roots can be obtained directly with database queries." [p.121]
O que este trecho NÃO diz: não menciona "um agregado por transação" explicitamente (apenas "scope for a transaction"); não dá tamanho máximo/heurística de agregados pequenos; não trata referência entre agregados por ID (só diz que internos podem referenciar outras raízes); eventos citados só como mecanismo de consistência eventual, sem detalhar. Não há versionamento otimista aqui. Qualquer "regra de ouro" popular (design de agregados pequenos, ref. por ID) é [fora do livro] neste bloco.
Relevância: domain-driven-design: ALTA, é o catálogo de regras de agregado + exemplo trabalhado PO com locking/deadlock e decisão por conhecimento de negócio (exatamente o "exemplo trabalhado" que faltava); architecture-hard-parts-expert: ALTA/MÉDIA, ilustra trade-off consistência forte intra-agregado vs eventual entre agregados, contenção vs integridade, ligação com granularidade de dados; clean-architecture-expert: MÉDIA, agregado como unidade transacional que o repositório persiste.
Decisão sugerida: usar em domain-driven-design (reference "agregados, repositórios e fábricas": regras + exemplo PO) e referenciar em architecture-hard-parts-expert (consistência por fronteira de agregado).

---

### Factories (PDF p.127-134)
Resumo: Criação complexa de objetos/AGGREGATES não deve ficar nos próprios objetos nem no cliente. FACTORIES encapsulam criação e reconstituição, garantindo invariantes.
Conceitos e regras:
- Analogia do motor: montar e funcionar são trabalhos distintos; o objeto não deve ter a responsabilidade da própria criação. Deixar o cliente montar viola encapsulamento, acopla o cliente (muitas vezes na camada de aplicação) às classes concretas e vaza responsabilidades para fora do domínio. [p.127-128]
- Criação complexa é responsabilidade da camada de domínio, mas não dos objetos que expressam o modelo; FACTORIES são elementos que não correspondem a nada no modelo mas fazem parte do design do domínio. Exceção: quando a criação é marco do domínio (ex.: abrir uma conta bancária). [p.128]
- Regra (Therefore): mover a criação de objetos/AGGREGATES complexos para objeto separado; interface que encapsula a montagem e não exige referência às classes concretas; criar AGGREGATES inteiros de uma vez impondo invariantes. [p.129]
- Dois requisitos: (1) cada método de criação é atômico e impõe todas as invariantes (só produz objeto consistente; para ENTITY = AGGREGATE inteiro com invariantes satisfeitas, opcionais depois; para VALUE imutável = todos atributos finais; se pedido inválido, exceção ou mecanismo que impeça retorno inválido); (2) abstração para o tipo desejado, não a classe concreta. [p.129]
- Onde colocar: FACTORY METHOD na raiz do AGGREGATE para adicionar elementos internos (raiz garante integridade). FACTORY METHOD em objeto que "gera" outro sem ser dono: exemplo Brokerage Account cria Trade Order (fora do mesmo AGGREGATE, pois interage com aplicação de execução); a conta tem dados e regras que governam as negociações; esconde hierarquia Buy/Sell Order. FACTORY acoplada ao produto: só em objeto com relação natural; senão FACTORY/SERVICE dedicado, que normalmente produz AGGREGATE inteiro devolvendo a raiz. Cuidado com referências só transitórias de fora do AGGREGATE. [p.129-131]
- Quando basta construtor: classe é o tipo (sem hierarquia/polimorfismo); cliente se importa com a implementação (escolher STRATEGY); todos os atributos disponíveis ao cliente sem criação aninhada; construção não complicada; construtor público segue as mesmas regras (atômico, invariantes). Evitar construtores chamando construtores de outras classes; construtores "bem simples"; o limiar para um pequeno FACTORY METHOD não é alto. Exemplo: coleções Java criadas por construtor (defensável por desempenho/pouco número de classes). [p.131-132]
- Interface: cada operação atômica (passar tudo que é preciso numa interação; decidir política de falha: exceção ou null, de forma consistente); FACTORY acopla-se a seus argumentos: preferir parâmetros de camada inferior ou objetos já ligados ao produto no modelo (ex.: Catalog Part para Purchase Order Item); usar tipos abstratos nos argumentos. [p.132]
- Invariantes: FACTORY garante, mas pensar duas vezes antes de tirar regras do objeto; delegar ao produto é muitas vezes melhor. Em alguns casos a lógica na FACTORY deixa o produto limpo (regras de AGGREGATE que atravessam objetos; regras que só se aplicam na criação, como as da identidade imutável ou VALUES imutáveis). Pouco atraente em FACTORY METHODS de outros objetos de domínio. [p.132-133]
- ENTITY vs VALUE FACTORY: VALUE sai completo (descrição total); ENTITY recebe só atributos essenciais para AGGREGATE válido; atribuição de identidade (externa vs gerada; FACTORY sabe o que pedir à sequência do banco). [p.133]
- Reconstituição: FACTORY para reconstituir difere em dois pontos: não atribui novo ID (identificadores entram como parâmetros) e trata violação de invariante com mais flexibilidade (o objeto já existe; precisa de estratégia de reparo) em vez de simplesmente recusar. Ferramentas de mapeamento podem prover parte disso. [p.133-134]
Citações curtas de prova:
- "A FACTORY should only be able to produce an object in a consistent state." [p.129]
- "Avoid calling constructors within constructors of other classes. Constructors should be dead simple." [p.131]
O que este trecho NÃO diz: não prescreve builder para tudo; não cobre injeção de dependência nem containers de IoC; reconstituição via "reflection/ORM" apenas citada genericamente.
Relevância: domain-driven-design: ALTA, requisitos de FACTORY, onde colocá-la, quando bastar construtor, criação vs reconstituição; clean-architecture-expert: MÉDIA, criação de entidades/agregados na camada de domínio sem acoplar casos de uso aos detalhes; architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar em domain-driven-design (reference agregados/repositórios/fábricas).

---

### Repositories (PDF p.135-143)
Resumo: REPOSITORY dá ao cliente a ilusão de uma coleção em memória de raízes de AGGREGATE, escondendo a mecânica de consulta e persistência e mantendo o foco no modelo.
Conceitos e regras:
- Três maneiras de obter referência: criar, atravessar associação, ou consultar o banco por atributos. Anedota: equipe tentou só criação+travessia em banco de objetos e gerou o emaranhado que se queria evitar. Busca vs associação é decisão de design (desacoplamento da busca vs coesão da associação; ex.: Customer guarda Orders ou busca por Customer ID). [p.135-136]
- Reconstituição ≠ criação: recuperar um Customer do banco não é um novo cliente. [p.136]
- Problema: quando o código cliente monta SQL, passa por serviço de consulta, extrai dados de linhas e chama construtor/FACTORY, o foco no modelo se perde; objetos viram contêineres de dados; tentação de burlar AGGREGATES e encapsulamento; regras de domínio migram para queries; complexidade da infra faz o time "emburrecer" a camada de domínio. [p.136]
- Escopo restrito: não é preciso acesso por consulta para transientes (VALUES), para o que se encontra por travessia (endereço da Person), nem para objetos internos de AGGREGATE (só por travessia a partir da raiz). VALUES persistentes costumam ser achados por travessia; busca global de VALUE geralmente é sem sentido (equivale a criar nova instância); exceções: itinerários salvos associados ao usuário, enumerações. Se precisa buscar VALUE existente, considerar que é uma ENTITY com identidade não reconhecida. [p.136-137]
- Definição (Therefore): para cada tipo que precisa de acesso global, criar objeto que dê a ilusão de coleção em memória de todos os objetos daquele tipo; interface global conhecida; métodos para adicionar e remover (encapsulam inserção/remoção); métodos de seleção por critérios que retornam objetos totalmente instanciados; REPOSITORIES só para raízes de AGGREGATE que realmente precisam de acesso direto. [p.137-138]
- Vantagens: modelo simples para obter objetos persistentes e gerir ciclo de vida; desacopla aplicação/domínio da tecnologia de persistência, de múltiplas estratégias de banco ou fontes; comunica decisões de acesso; permite implementação fictícia em memória para testes. [p.138]
- Consultas: o mais simples são consultas hard-coded com parâmetros (por ID, atributo, faixa de datas, cálculos como contagem/soma). Em projetos com muita consulta, framework mais flexível; abordagem apta: consultas baseadas em SPECIFICATION (cliente descreve o que quer sem se preocupar com como; Cap. 9). Mesmo assim permitir consultas hard-coded especializadas; frameworks que não permitem isso distorcem o design ou são burlados. [p.138-139]
- Anedota (Kyle Brown): consulta "all objects" instanciando tudo para sumarizar levou a falta de memória em produção; não apareceu em teste por pouca massa de dados. Lição: o desenvolvedor precisa entender as implicações do comportamento encapsulado. [p.140]
- Implementação: esconde o motor do cliente (não do desenvolvedor do cliente); mesmo código cliente para banco de objetos, relacional ou memória. Preocupações: abstrair o tipo (não precisa um REPOSITORY por classe; pode ser superclasse, interface ou classe concreta, sujeito a limitações polimórficas do banco); aproveitar o desacoplamento (otimizar, cache, trocar estratégia, dummy em memória para testes); deixar controle de transação ao cliente (o REPOSITORY insere/remove mas normalmente não faz commit, pois o cliente tem o contexto da unit of work). [p.140-141]
- Frameworks: avaliar a infra antes; "don't fight your frameworks"; buscar afinidades entre conceitos DDD e o framework e abrir mão de detalhes quando o framework é antagônico (ex.: tentar vestir o EJB Home como REPOSITORY). Se há liberdade, escolher frameworks harmônicos. [p.141-142]
- Relação com FACTORY: FACTORY faz objetos novos, REPOSITORY encontra os antigos; o REPOSITORY pode delegar a reconstituição a uma FACTORY; o produto novo é adicionado ao REPOSITORY pelo cliente, que sabe que é novo. Evitar "find or create": conveniência pequena que borra a diferença entre objeto novo e existente (importante no domínio); muitos casos somem ao distinguir ENTITY de VALUE. [p.142-143]
Citações curtas de prova:
- "Provide REPOSITORIES only for AGGREGATE roots that actually need direct access." [p.138]
- "The FACTORY makes new objects; the REPOSITORY finds old objects." [p.142]
- "Leave transaction control to the client." [p.141]
- "In general, don't fight your frameworks." [p.141]
O que este trecho NÃO diz: não prescreve a interface (Repository como porta/interface no domínio com implementação na infra) em termos de Dependency Inversion explicitamente; não fala de Unit of Work por nome além de "units of work"; não discute CQRS ou read models para consultas de relatório (queries com cálculos sumarizados são tratadas como cabíveis no REPOSITORY).
Relevância: domain-driven-design: ALTA, definição, quando existir, query hard-coded vs SPECIFICATION, não commitar, não "find or create"; clean-architecture-expert: ALTA, repositório como abstração que desacopla domínio da persistência, testes com versão em memória; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (reference agregados/repositórios/fábricas) e em clean-architecture-expert (portas de persistência).

---

### Designing Objects for Relational Databases (PDF p.144-145)
Resumo: Como lidar com o descompasso objeto-relacional por três cenários e uma regra de "simples diretidão".
Conceitos e regras:
- Três casos: banco é principalmente repositório dos objetos; banco foi desenhado para outro sistema; banco é desenhado para este sistema mas serve a outros papéis. [p.144]
- Banco como armazém dos objetos: aceitar limitações no modelo para manter o mapeamento simples; permitir desnormalização seletiva; evitar dois modelos sobrepostos; mapeamento transparente e inspecionável (não necessariamente 1 objeto/1 tabela). Não deixar modelo de dados e de objetos divergirem muito, mesmo com ferramentas poderosas; sacrificar riqueza de relacionamentos e normalização se simplifica o mapeamento. Processos externos ao sistema de objetos não devem acessar esse armazém (violam invariantes, travam o modelo de dados contra refatoração). [p.144]
- Dados de legado/sistema externo: coexistem dois modelos de domínio; pode-se conformar ao modelo do outro sistema ou fazer modelo totalmente distinto (Cap. 14). Desempenho também pode exigir desvios. [p.144-145]
- Caso comum: uma linha da tabela contém um objeto (talvez com subsidiários do AGGREGATE); chave estrangeira vira referência a outra ENTITY; a UBIQUITOUS LANGUAGE deve ligar objetos e tabelas (nomes e associações correspondendo meticulosamente). Refatoração raramente atinge o design relacional; migração de dados desencoraja mudança; divergência leva à perda de transparência. [p.145]
- Esquema propositalmente distinto do modelo de objetos pode ser válido (outros softwares usam o banco, banco muda pouco), mas é frequentemente tomado sem querer por falta de manter o banco atual; se for escolha consciente, resulta em esquema limpo. [p.145]
Citações curtas de prova:
- "Processes outside the object system should not access such an object store." [p.144]
- "simple directness is best" [p.145]
O que este trecho NÃO diz: não menciona ORMs específicos nem event sourcing nem banco por serviço.
Relevância: domain-driven-design: MÉDIA, orientações para persistência e legado (liga a "DDD com legado" via Cap. 14); clean-architecture-expert: MÉDIA, tensão modelo de domínio vs esquema de banco; architecture-hard-parts-expert: BAIXA/MÉDIA, acesso de terceiros ao armazém (integração via banco) como acoplamento que trava refatoração.
Decisão sugerida: usar em domain-driven-design (reference persistência/legado) com nota para clean-architecture-expert.

---

### Cap. 7: Using the Language: An Extended Example (PDF p.146-150) [continua no próximo bloco]
Resumo: Abre o exemplo trabalhado do sistema de transporte de carga (cargo shipping), que aplica os padrões do Part II. No bloco só aparecem o modelo inicial e o isolamento do domínio com três classes de aplicação.
Conceitos e regras:
- Requisitos: rastrear manuseios-chave da carga; reservar carga antecipadamente (booking); enviar faturas automaticamente quando a carga atinge certo ponto. [p.147]
- Modelo inicial (diagrama não extraído): Cargo com Customers em papéis distintos; Delivery Specification (meta de entrega: no mínimo destino e data de chegada; segue SPECIFICATION, Cap. 9); Carrier Movement (viagem de um Carrier de uma Location a outra); Handling Event (ação discreta, ex.: carregar no navio, liberar na alfândega; poderia virar hierarquia); Delivery History (o que realmente aconteceu; calcula localização atual pela última carga/descarga e destino do movimento; entrega bem-sucedida termina com histórico que satisfaz a especificação). [p.147-148]
- Três vantagens de extrair Delivery Specification de Cargo: evita poluir Cargo com o significado detalhado dos atributos; facilita suprimir detalhe nos diagramas; modelo mais expressivo (meio de entrega indeterminado, mas a meta é explícita). [p.148]
- Role (shipper, receiver, payer): só um Customer por papel por Cargo, logo associação many-to-one qualificada; Role pode ser string ou classe se houver comportamento. [p.148]
- Isolando o domínio (LAYERED ARCHITECTURE): três classes de aplicação: Tracking Query (acessa manuseio passado e presente de uma Cargo), Booking Application (registra nova Cargo e prepara o sistema), Incident Logging Application (registra cada manuseio, alimentando a Tracking Query). São coordenadores e não devem calcular as respostas; isso é trabalho do domínio. [p.150]
- Nota: o exemplo começa de um modelo relativamente maduro e as mudanças são motivadas apenas por conectar modelo à implementação (na prática, refina-se também por novo insight do domínio; Part III trata da descoberta). [p.147, 148-149]
Citações curtas de prova:
- "These application classes are coordinators. They should not work out the answers to the questions they ask." [p.150]
O que este trecho NÃO diz: o capítulo continua no próximo bloco (aplicar ENTITIES/VALUES, AGGREGATES, REPOSITORIES, FACTORIES ao modelo, refatoração, etc.); diagramas não vêm no texto.
Relevância: domain-driven-design: ALTA, base do "exemplo trabalhado" ponta a ponta (cargo shipping), a ser completada com o próximo bloco; clean-architecture-expert: MÉDIA (application layer como coordenador); architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar em domain-driven-design (reference com exemplo trabalhado; ler junto com blocos seguintes).

---

## Onde o livro vai além de listas curtas (para a skill domain-driven-design v1.1)
- Três técnicas explícitas para simplificar associações (direção, qualificador, eliminação) com exemplo Java/SQL, mostrando que a mesma associação do modelo tem implementações distintas [p.85-90].
- Critério "quem pergunta" para Address como ENTITY ou VALUE em três contextos (loja, correio, companhia elétrica) [p.98]; exemplo do assento de estádio (assento marcado vs admissão geral) [p.93]: a classificação depende do contexto e do uso.
- Opções e armadilhas de identificadores (chave natural, ID gerado, ID externo, telefone, nº de documento) [p.94-95].
- Regras de compartilhamento/mutabilidade de VALUE OBJECTS e FLYWEIGHT, desnormalização no banco [p.99-101].
- Três tipos de SERVICE (infra, aplicação, domínio) com tabela trabalhada de funds transfer [p.104-105].
- Relato de projeto com quatro camadas por objeto resultando em modelo anêmico (empacotamento por infraestrutura) [p.109-110].
- Exemplo Purchase Order: sequência de locks (item, PO, PO+peça, deadlock) até a decisão de modelagem (copiar preço no item, consistência eventual entre PO e Part) [p.121-125].
- Requisitos de FACTORY, locais de FACTORY METHOD (raiz do agregado, objeto "genitor" como Brokerage Account/Trade Order), quando só construtor, reconstituição vs criação [p.128-134].
- REPOSITORY: o que NÃO entra (VALUES transitórios, internos de agregado), hard-coded vs SPECIFICATION, não commitar, não "find or create", anedota "all objects" [p.136-143].
- Smart UI: lista de vantagens/desvantagens como critério de quando NÃO usar DDD [p.79-81].

## Ressalvas de fidelidade
- Código Java/SQL no livro usa concatenação de strings em SQL (p.88-90); não reproduzir como boa prática.
- Referências a J2EE/entity beans/CORBA/4GL são datadas; extrair o princípio, não a tecnologia.
- O que o livro NÃO dá neste bloco (marcar [fora do livro] se a skill incluir): "um agregado por transação", agregados pequenos, referência entre agregados por ID, domain events detalhados, CQRS/event sourcing, UUID.

## Checklist de cobertura
- Primeira página lida: 76
- Última página lida: 150 (último marcador "=== PDF PAGINA 150 ===" conferido por Grep)
- Páginas sem texto útil ou ilegíveis: 84 (só "[ Team LiB ]"), 126 (só "[ Team LiB ]"); páginas de figura têm apenas as legendas (ex.: 86, 87, 94, 99, 119-125, 128-134, 137-142).
- Problemas de extração observados: texto em inglês; figuras e diagramas ausentes (legendas apenas); tabelas de BD do exemplo Brokerage (p.87-88) quebradas; frases fragmentadas por quebra de página (p.89-90, 123-124, 124-125); marcadores soltos como "1." no fim de página (p.121, 124); seção "Smart UI" com formatação de bullets quebrada; rodapés "[ Team LiB ]". Números impressos de página não identificáveis.
- Capítulos/seções cobertos integralmente: final do Cap. 4 (Relating the Layers até Other Kinds of Isolation), Cap. 5 inteiro (Associations, Entities, Value Objects, Services, Modules, Modeling Paradigms), Cap. 6 inteiro (Aggregates, Factories, Repositories, Designing Objects for Relational Databases).
- Capítulos/seções que continuam em outro bloco: Cap. 4 (início em bloco anterior); Cap. 7 (Using the Language: An Extended Example) continua no próximo bloco a partir de p.150.
