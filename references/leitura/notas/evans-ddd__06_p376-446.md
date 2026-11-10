# Notas: Evans, Domain-Driven Design, bloco 06 (PDF p.376-446)

Observação geral: o texto do bloco está em INGLÊS (não em português), apesar de o livro ser a edição indicada. Termos de padrão aparecem em caixa alta (ex.: CORE DOMAIN). Não há número de página impresso visível nos rodapés; só o marcador "PDF PAGINA N" (impr. não disponível). Todas as páginas citadas abaixo são PDF p.N.

---

### Cap. 15 (final): exemplo do SEGREGATED CORE no sistema de carga, ABSTRACT CORE, Deep Models Distill, Choosing Refactoring Targets (PDF p.376-382) [continua do bloco anterior]
Resumo: Fecha o exemplo de segregação do CORE (Cargo/Customer Agreement/Handling Step) e apresenta o ABSTRACT CORE (fatiar horizontalmente por interfaces polimórficas fundamentais), a ideia de que modelos profundos destilam o essencial, e um critério para escolher onde refatorar primeiro.

Conceitos e regras:
- No exemplo, ao segregar o CORE, o Customer Agreement passou a restringir o Handling Step; segregar o CORE faz emergir insights de modelo (restrições de entrega ficam explícitas). [p.376]
- Decisão pragmática: o Customer Agreement é ligado direto ao Cargo (na reserva), em vez de navegar via Customer; isso simplifica os cenários principais ("histórias" sobre o modelo) e permite tirar Customer do CORE. [p.376-377]
- Customer sai do CORE porque, na entrega, a interação passa pelo acordo e o modelo básico de Customer é genérico. Leg poderia ficar no CORE; o autor se diz minimalista no CORE e mantém Leg fora por coesão com Transport Schedule/Routing Service/Location, mas moveria Leg para Delivery se muitas histórias o envolvessem. [p.377]
- Destilação muitas vezes exige refatorar as próprias classes para separar responsabilidades genéricas das específicas, e só depois segregar. [p.377]
- O pacote "Shipping" que sobra é só "o que sobrou"; refatorações seguintes dão MODULES significativos para os subdomínios não-CORE (um pacote CORE segregado, um GENERIC SUBDOMAIN, dois pacotes de apoio específicos). Pode exigir várias refatorações, não é de uma vez. [p.377-378]
- Reconhecer MODULES úteis é atividade de modelagem feita por desenvolvedores e especialistas juntos, parte do knowledge crunching. [p.378]
- ABSTRACT CORE: quando muitas interações entre subdomínios em MODULES separados forçam muitas referências entre MODULES (derrota o particionamento) ou indireção (obscurece), fatie "horizontalmente": fatore os conceitos mais fundamentais em classes/classes abstratas/interfaces que expressem a maior parte da interação entre componentes significativos, em um MODULE próprio; as classes especializadas ficam em MODULES por subdomínio e referenciam o ABSTRACT CORE, não umas às outras. [p.379-380]
- Só vale se as interfaces polimórficas correspondem a conceitos fundamentais do domínio; não é "truque técnico". [p.379]
- Extrair o ABSTRACT CORE não é mecânico: mover todas as classes muito referenciadas resultaria em "bagunça sem sentido"; exige entendimento profundo, é refatoração para insight mais profundo e costuma pedir redesenho considerável. [p.380]
- O ABSTRACT CORE deve ficar parecido com o documento de destilação (se este evoluiu), porém em código, mais rigoroso e completo. [p.380]
- Deep Models Distill: destilação também é refinar subdomínios, sobretudo o CORE, por refatoração contínua rumo a modelo profundo e design flexível (supple); modelo profundo reduz o essencial a elementos simples combináveis; no CORE DOMAIN um breakthrough pode mudar a trajetória do projeto. [p.381]
- Escolha de alvos de refatoração: rejeita (1) "comece em qualquer lugar" (impraticável salvo times de elite) e (2) "só onde dói" (trata sintomas, evita os piores nós). Regra: refatoração guiada por dor: verifique se a raiz envolve o CORE DOMAIN ou a relação CORE x elemento de apoio, e corrija isso primeiro; com liberdade, foque primeiro em fatorar melhor o CORE, melhorar a segregação do CORE e purificar subdomínios de apoio para GENERIC. [p.382]

Citações curtas de prova:
- "This is how to get the most bang for your refactoring buck." [p.382]
- "We are not looking for a technical trick here." [p.379]

O que este trecho NÃO diz: não dá passo a passo de implementação do ABSTRACT CORE em código nem critérios quantitativos; não trata de pacotes/módulos físicos além do exemplo; não define métricas para "dor".
Relevância para os artefatos candidatos:
- domain-driven-design: ALTA, destilação do domínio (SEGREGATED CORE com exemplo, ABSTRACT CORE, critério de onde refatorar primeiro).
- clean-architecture-expert: MÉDIA, ABSTRACT CORE como módulo de interfaces estáveis ao centro que os detalhes referenciam (analogia à regra de dependência; [fora do livro] a relação com Clean Architecture é minha ligação, o livro não a faz).
- architecture-hard-parts-expert: BAIXA, só indiretamente (acoplamento entre módulos).
Decisão sugerida: usar em domain-driven-design/references (destilação do domínio: exemplo trabalhado do SEGREGATED CORE com decisões e justificativas; seção ABSTRACT CORE com a advertência "não mecânico"; seção "por onde refatorar primeiro"). Para clean-architecture-expert, usar só como nota de analogia, claramente rotulada.

Onde o livro vai além de listas curtas: o raciocínio de por que Customer sai do CORE e Leg poderia ficar (julgamento depende das histórias que se quer contar); o aviso de que extrair ABSTRACT CORE automaticamente por frequência de referência gera lixo.

---

### Cap. 16: Large-Scale Structure, introdução e Evolving Order (PDF p.383-387)
Resumo: Abre com o caso do simulador de comunicações por satélite que ganhou compreensibilidade ao impor camadas conceituais, e define "large-scale structure" como linguagem para entender o sistema em traços largos. EVOLVING ORDER diz que a estrutura deve evoluir com a aplicação, sem sobrerrestringir decisões de detalhe.

Conceitos e regras:
- História de abertura: muitos MODULES coerentes, mas sem visão do todo; solução foi impor uma estrutura de camadas conceituais (infraestrutura física, roteamento de pacotes etc.); MODULES e responsabilidades foram refatorados para não atravessar camadas; camadas, MODULES e objetos coevoluíram. As camadas não eram MODULES nem artefatos de código, e sim regras que restringem fronteiras e relações. [p.383-384]
- Problema: mesmo modular, o modelo grande pode ser complexo demais; modularidade não traz uniformidade; BOUNDED CONTEXTS evitam corrupção mas não mostram o todo; destilação ajuda mas não basta. Sem regras comuns surgem estilos e soluções distintas, especialistas isolados por módulo, e CONTINUOUS INTEGRATION se desfaz. [p.384]
- Definição: large-scale structure é um padrão de regras, ou papéis e relações, que abrange o sistema e permite entender o lugar de cada parte sem conhecer seus detalhes; pode ficar em um BOUNDED CONTEXT mas costuma abranger vários; complementa a destilação; normalmente não aparece em UML (anotação sobreposta). [p.385]
- Equipe pequena e modelo simples: MODULES bem nomeados + alguma destilação + coordenação informal bastam. Estrutura mal ajustada atrapalha seriamente. [p.385]
- EVOLVING ORDER: arquiteturas impostas antecipadamente viram camisa de força (devs "emburrecem" a aplicação para caber ou subvertem a estrutura); free-for-all também é ruim. O problema é a rigidez e a fonte das regras, não a existência delas. Regra: deixar a estrutura evoluir com a aplicação, possivelmente mudando de tipo, sem sobrerrestringir decisões de detalhe. [p.386]
- Estrutura favorece gerenciabilidade do todo sobre otimização de cada parte (há compromisso); bom encaixe elimina opções e dá atalhos consistentes. [p.386-387]
- Deve ser aplicável entre BOUNDED CONTEXTS (perde traços ligados a um modelo local, ganha CONCEPTUAL CONTOURS) e acomodar sistemas externos/legados. [p.387]
- Diferente do CONTEXT MAP, é OPCIONAL: impor quando custo-benefício favorece e há estrutura que se encaixa; mínimo possível ("Less is more"); exceções devem ser sinalizadas, e se ficarem numerosas, mudar ou descartar a estrutura. [p.387]
- O autor critica abordagens que decompõem o domínio por tarefa/caso de uso por enfraquecerem o paradigma OO; diz que a área é pouco explorada e apresenta 4 padrões. [p.387]

Citações curtas de prova:
- "Because an ill-fitting structure is worse than none, it is best not to shoot for comprehensiveness" [p.387]
- "The problem is not the existence of guiding rules, but rather the rigidity and source of those rules." [p.386]
- "A 'large-scale structure' is a language that lets you discuss and understand the system in broad strokes." [p.385]

O que este trecho NÃO diz: não prescreve uma estrutura padrão; não dá critério numérico para "quando a equipe é grande"; menciona J2EE só como exemplo de arquitetura técnica.
Relevância para os artefatos candidatos:
- domain-driven-design: ALTA, large-scale structure é tópico inteiro ausente/raso; regras de quando adotar e evoluir.
- clean-architecture-expert: MÉDIA, crítica a arquiteturas impostas que engessam o domínio; estrutura minimalista e evolutiva.
- architecture-hard-parts-expert: MÉDIA, argumento de trade-off (uniformidade x liberdade local) e de governança arquitetural evolutiva.
Decisão sugerida: usar em domain-driven-design/references (large-scale structure: quando usar, evolução, opcionalidade, sinal de descarte) e citar em architecture-hard-parts-expert como argumento de governança (equipe de arquitetura, ver Cap.17).

---

### System Metaphor (PDF p.388-389)
Resumo: Metáfora do sistema é uma estrutura de grande escala frouxa, vinda do XP; ilustrada pelo "firewall". Útil só quando surge uma analogia concreta que realmente guia o design; o livro reconhece que poucos projetos achariam metáforas úteis.

Conceitos e regras:
- Metáfora pode moldar o sistema; devs decidem de modo consistente com ela e ganham ponto de referência mais concreto que o modelo. Por ser só analogia, aplica-se em vários BOUNDED CONTEXTS. [p.388]
- Riscos: o design absorve aspectos indesejáveis da analogia; a analogia pode ser sedutora mas inadequada (o firewall gerou barreiras pouco seletivas e sem proteção interna). [p.388]
- Regra: adotar quando uma analogia concreta captura a imaginação da equipe e leva o pensamento em direção útil; absorvê-la na UBIQUITOUS LANGUAGE; reexaminar continuamente quanto a exagero/inadequação e abandonar se atrapalhar. [p.389]
- "Naive metaphor" (domínio como metáfora ingênua, termo do XP) deve ser aposentado: um modelo maduro não é ingênuo; "folha de pagamento é como linha de montagem" é que seria ingênuo. Em lugar de metáfora, a UBIQUITOUS LANGUAGE cumpre o papel no XP. [p.389]

Citações curtas de prova:
- "The term naive metaphor should be retired." [p.389]

O que este trecho NÃO diz: não dá critérios para escolher boa metáfora nem outros exemplos além do firewall e do contraexemplo da linha de montagem.
Relevância: domain-driven-design: MÉDIA (item de catálogo de large-scale structures, uma linha). clean-architecture-expert: NENHUMA. architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design/references (catálogo de estruturas de grande escala, breve, com os riscos); não expandir.

---

### Responsibility Layers (PDF p.390-401)
Resumo: Quando o domínio tem estratificação natural (conceitos que mudam em ritmos/razões diferentes), definem-se camadas conceituais por grandes responsabilidades, usando layering relaxado, de modo que objetos, AGGREGATES e MODULES caibam cada um em uma camada. Longo exemplo no sistema de carga e um catálogo de camadas típicas (Potential/Capability, Operations, Decision Support, Policy, Commitment).

Conceitos e regras:
- Camadas: membros conhecem e usam serviços das camadas abaixo e são independentes das de cima. Layering ad hoc (só pela ordem de dependências) ajuda a rastrear dependências mas não dá insight de modelo (Fig. 16.2). Usar a variante RELAXED LAYERED SYSTEM (qualquer camada abaixo, não só a imediata). [p.390-391]
- Regra: olhar dependências conceituais e taxas/fontes de mudança; se há estratos naturais, expressá-los como responsabilidades amplas abstratas que contem a história do propósito do sistema; refatorar o modelo para que cada objeto/AGGREGATE/MODULE caiba em uma camada. [p.391]
- Exemplo de carga: camadas "Operations" (Cargo, Route Specification, Itinerary; ciclo de vida de uma entrega ativa) e "Capability" (Transit Leg: navios com capacidade). Teste: dá para falar de transport schedules sem carga, mas não de rastrear carga sem o transporte. [p.392-393]
- Customer: decisão de negócio, não técnica: se o cliente é transitório (encomenda de consumidor) fica em Operations; se há relacionamento de longo prazo e repeat business, fica na camada de potencial. [p.393]
- Efeito colateral: associação bidirecional Cargo-Customer viola camadas; substituída por consulta no Repository de Cargo (achar cargas por cliente). [p.393]
- Terceira camada "Decision Support" (Router é um SERVICE que ajuda a escolher rota; não reflete realidade, ajuda a mudar planos). O atributo "is preferred" do Transport Leg destoava (é política, não capacidade); foi refatorado para um Route Bias Policy explícito, deixando Transport Leg focado em capacidade. A estrutura empurrou o modelo para mais clareza. [p.394-395]
- Ferramentas: UML não tem notação de camadas; seria útil navegar/relatar classes por camada. [p.395]
- Efeito no design contínuo (HazMat): ideia natural (Cargo, de Operations, depender de HazMat Route Policy Service, de Decision Support) é proibida pela estrutura; solução: Router coleta as políticas aplicáveis antes de buscar rota e sua interface passa a receber objetos de que as políticas dependem. O autor admite que não é necessariamente melhor, mas consistência vale pequenos compromissos; se a estrutura forçar muitas escolhas esquisitas, avaliar, modificar ou descartar. [p.396-398]
- Critérios para boas camadas: Storytelling (comunicar prioridades do negócio; decisão de modelagem de negócio, não técnica), Conceptual dependency (conceitos superiores têm sentido sobre os inferiores; inferiores fazem sentido sozinhos), CONCEPTUAL CONTOURS (taxas/fontes de mudança distintas acomodam o "cisalhamento" entre camadas). [p.398]
- Catálogo de camadas recorrentes: [p.399-400]
  - Potential (Capability): o que PODE ser feito; recursos da organização, pessoas, contratos com fornecedores; destaque em negócios com grande capital fixo.
  - Operation: o que está sendo feito; reflete a realidade, não o desejo; objetos Operational referenciam/compõem Potential, nunca o contrário.
  - Decision Support: que ação tomar/que política definir; analisa a partir de camadas inferiores; muitas vezes implementada com data warehouse como BOUNDED CONTEXT em relação CUSTOMER/SUPPLIER com Operations; vantagem: camadas inferiores existem sem as superiores (introdução em fases).
  - Policy: regras e metas, passivas, restringem as outras camadas; interação sutil (política passada como argumento, ou padrão STRATEGY); funciona com Decision Support; pode usar rules engine sem virar outro contexto; se as regras usam modelo diferente dos objetos, ou a complexidade sobe ou os objetos ficam "emburrecidos".
  - Commitment: o que prometemos; natureza de Policy (direciona futuro) e de Operations (nasce e muda com a atividade); típico em serviços financeiros/seguros, onde Potential se funde a Operations (capacidade depende das operações atuais).
- Potential e Commitment não são mutuamente exclusivos. Manter simples: mais de quatro ou cinco camadas fica difícil; a estrutura deve ser "ferozmente destilada". Essas cinco não valem para todo domínio; em outros podem ser originais; usar intuição, começar e deixar a ordem evoluir. [p.401]
- Figuras 16.13/16.14 (fábrica e banco de investimento) mostram dependências conceituais e pontos de cisalhamento (só legendas no texto). [p.400]

Citações curtas de prova:
- "Choosing a large-scale structure is less a technical decision than a business modeling decision." [p.398]
- "The large-scale structure must be ferociously distilled." [p.401]
- "Operations ... must reflect the world as it is" (ideia; ver p.413 para o texto completo)

O que este trecho NÃO diz: não prescreve nomes fixos de camada para todo domínio; não dá regra mecânica para decidir camada de um objeto (depende de conhecimento do negócio); código do exemplo não aparece, só diagramas (não extraídos).
Relevância para os artefatos candidatos:
- domain-driven-design: ALTA, catálogo de camadas e exemplo trabalhado (Customer em Operations vs. Potential; "is preferred" → Route Bias Policy; HazMat).
- clean-architecture-expert: MÉDIA, camadas por responsabilidade de negócio (ortogonais às camadas técnicas) e dependência apenas para baixo.
- architecture-hard-parts-expert: BAIXA a MÉDIA, taxas de mudança como critério de fronteira (conecta a evolução e acoplamento); Decision Support como BOUNDED CONTEXT separado.
Decisão sugerida: usar em domain-driven-design/references (arquivo de large-scale structure com o exemplo de carga completo e catálogo Potential/Operation/Decision Support/Policy/Commitment com perguntas-guia "O que pode ser feito? O que está sendo feito? Que ação tomar? Quais regras? O que prometemos?").

Onde o livro vai além de listas curtas: o exemplo mostra uma decisão concreta rejeitada (Cargo -> HazMat Service) e a alternativa aceita (Router coleta políticas), com a admissão de trade-off; também a troca da associação bidirecional por query no Repository.

---

### Knowledge Level (PDF p.402-408)
Resumo: Padrão (de Fowler, Analysis Patterns) em que um grupo de objetos descreve e restringe o comportamento/estrutura de outro grupo, para sistemas configuráveis em instalação ou runtime. Mostrado em exemplo de folha de pagamento e previdência (Employee Type).

Conceitos e regras:
- Problema: papéis e relacionamentos entre ENTITIES variam por organização (ex.: "Director reporta a Vice President" vs. "Manager reporta a Senior Manager" vs. matriz). Aplicação com suposições fixas leva usuários a usar campos de forma desviada, a gambiarras e a migrações de dados difíceis depois. [p.402]
- Exemplo Parte 1: modelo antigo (hourly = plano X; salaried = plano Y) superconstringido; remover restrições deixa o modelo subconstringido (qualquer funcionário em qualquer plano, o faxineiro poderia mudar). Política da empresa ("office administrators são horistas com plano de benefício definido") torna "job title" um conceito explícito: Employee Type, que recebe o Retirement Plan e restringe Employees. Edição de Employee Type só por superuser; usuário comum de RH edita Employees e os aponta para outro tipo. [p.403-405]
- Nem totalmente estático, nem totalmente flexível; customizar por organização é impraticável porque a estrutura muda; adicionar opções aos objetos do modelo os torna pesados, objetos acabam com referências a vários tipos ou atributos usados de modos diferentes, ou classes duplicadas. [p.405]
- KNOWLEDGE LEVEL separa o aspecto "auto-definidor" e torna suas restrições explícitas; é aplicação ao domínio do padrão REFLECTION (base level x meta level; terminologia Fowler: Operations Level x Knowledge Level; POSA: Base x Meta). Não é "camada": dependências nos dois sentidos. [p.405-406]
- Não usar reflexão da linguagem para implementá-lo; deve ser feito de objetos comuns. Distinções: foca no domínio de aplicação e não busca generalidade total (como SPECIFICATION vs. predicado geral). [p.406]
- Regra: criar conjunto distinto de objetos que descrevem e restringem estrutura e comportamento do modelo básico; manter dois níveis, um concreto, outro com regras e conhecimento que usuário/superuser personaliza. [p.406]
- Custos: usar com parcimônia; a indireção obscurece; se o KNOWLEDGE LEVEL ficar complexo, usuários que o configuram precisarão de habilidades de programador de meta-nível e erros quebram a aplicação; migração de dados persiste (mudar estrutura do KNOWLEDGE LEVEL exige tratar objetos operacionais existentes); o projeto precisa ser robusto a configurações futuras. [p.406]
- Exemplo Parte 2: dev notou que o cluster de objetos de edição restrita era um KNOWLEDGE LEVEL implícito; vê-lo assim revelou frase imprecisa na linguagem ("Employee Type é atribuído a Retirement Plan ou a payroll") e que "payroll" estava implícito, misturado ao Employee Type; refatorou-se extraindo Payroll explícito, com Employee Type tendo Retirement Plan e Payroll. Sinais para reconhecer: restrições de acesso características e relação "coisa-coisa" (thing-thing). [p.407-408]
- Não é caso especial de RESPONSIBILITY LAYERS (dependências bidirecionais) e pode coexistir com outras estruturas como dimensão adicional. Como as outras, não é estritamente necessária e pode ser descartada. [p.408]

Citações curtas de prova:
- "[A KNOWLEDGE LEVEL is] a group of objects that describes how another group of objects should behave." [p.402]
- "Like all powerful ideas, REFLECTION and KNOWLEDGE LEVELS can be intoxicating." [p.406]

O que este trecho NÃO diz: não mostra implementação em código nem esquema de persistência/versionamento da configuração; migração só é mencionada como problema, sem estratégia.
Relevância para os artefatos candidatos:
- domain-driven-design: ALTA, padrão tático/estrutural ausente na skill; exemplo trabalhado simples e reutilizável (Employee Type).
- clean-architecture-expert: BAIXA a MÉDIA, configurabilidade no domínio sem reflexão de framework.
- architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design/references (padrão + exemplo Payroll/Pension + avisos de custo); incluir sinais de reconhecimento (acesso restrito, relação tipo-instância) e o conselho de uso parcimonioso.

---

### Pluggable Component Framework (PDF p.409-412)
Resumo: Estrutura restritiva para modelos muito maduros: destila-se um ABSTRACT CORE de interfaces e interações e criam-se frameworks onde implementações diversas são substituíveis; aplicações usam componentes só via essas interfaces. Exemplo: SEMATECH CIM Framework (manufatura de semicondutores) e analogia com o AIDS Memorial Quilt.

Conceitos e regras:
- Contexto: várias aplicações interoperando sobre as mesmas abstrações mas projetadas independentemente; traduções entre BOUNDED CONTEXTS limitam a integração; SHARED KERNEL inviável para equipes distantes. [p.409]
- Regra: destilar ABSTRACT CORE de interfaces e interações; framework que permite substituição livre de implementações; qualquer aplicação usa componentes estritamente pelas interfaces do ABSTRACT CORE. Várias BOUNDED CONTEXTS podem existir atrás das interfaces; pode-se usar PUBLISHED LANGUAGE para a interface de plug-in do hub. Componentes podem ser desenvolvidos num só contexto com CONTINUOUS INTEGRATION, ou compartilhar outro SHARED KERNEL. [p.409]
- Framework técnico só se resolve problema técnico essencial (distribuição, compartilhar componentes); a base é organização conceitual de responsabilidades, aplicável até num único programa Java. [p.409]
- Desvantagens: muito difícil de aplicar (precisão das interfaces, modelo profundo); opções limitadas para as aplicações; o ABSTRACT CORE não pode mudar sem mudar o protocolo de todos os componentes, congelando o refinamento contínuo do CORE. [p.409]
- Não deve ser a primeira nem a segunda estrutura de grande escala de um projeto; os melhores exemplos vieram depois de várias aplicações especializadas completas. Sucesso do padrão é "história mista". [p.410]
- SEMATECH CIM: consórcio definiu interfaces abstratas (comportamento e semântica) para conceitos do domínio de MES de semicondutores, e regras de protocolo para hospedar objetos que implementam subconjuntos delas; fornecedor de máquina implementa a interface Process Machine e seu componente deve conectar-se a qualquer aplicação CIM. Fortemente acoplado a CORBA para persistência, transações e eventos, mas o interesse é o padrão. [p.410-411]
- Quilt (analogia): poucas regras (nome, tamanho exato 3x6 pés, materiais duráveis) permitem milhares de contribuintes independentes; as regras focam na missão, nas características que viabilizam integração e no manuseio em seções maiores. [p.411-412]

Citações curtas de prova:
- "A PLUGGABLE COMPONENT FRAMEWORK should not be the first large-scale structure applied on a project, nor the second." [p.410]

O que este trecho NÃO diz: não detalha o protocolo do hub nem versionamento de interfaces; o exemplo de CIM é descrito em alto nível (figuras não extraídas).
Relevância para os artefatos candidatos:
- domain-driven-design: ALTA/MÉDIA, relação com SHARED KERNEL, PUBLISHED LANGUAGE e ABSTRACT CORE no context mapping.
- clean-architecture-expert: MÉDIA, plug-ins por interfaces estáveis e regra de que aplicações dependem só das interfaces; custo de congelar o núcleo.
- architecture-hard-parts-expert: MÉDIA, trade-off explícito (interoperabilidade x capacidade de evoluir o núcleo) e quando NÃO aplicar (cedo demais).
Decisão sugerida: usar em domain-driven-design/references (large-scale structure, com os custos) e como exemplo de trade-off em architecture-hard-parts-expert.

---

### How Restrictive Should a Structure Be? (PDF p.413)
Resumo: Mesmo dentro de um padrão, há escolha de quão restritivo ser; exemplo de comunicação entre camadas por eventos para evitar dependência bidirecional.

Conceitos e regras:
- Exemplo manufatura: Operations deve aceitar incondicionalmente a realidade (peça na máquina errada) e sinalizar para camada superior sem dependência de baixo para cima; tipicamente via eventos: objetos Operations geram eventos nas mudanças de estado; objetos de Policy ouvem; regra violada executa ação ou gera evento para camada acima. Exemplo bancário: valores de ativos mudam (Operations) -> limites de alocação (Policy) excedidos -> trader alertado. [p.413]
- Mais restrição: uniformidade e facilidade de interpretação; porém menos flexibilidade, e caminhos de comunicação específicos podem ser impraticáveis entre BOUNDED CONTEXTS em tecnologias heterogêneas. Resistir à tentação de construir frameworks que regimentem a implementação: a contribuição principal é coerência conceitual; cada regra estrutural deve facilitar o desenvolvimento. [p.413]

Citações curtas de prova:
- "Each structural rule should make development easier." [p.413]

O que este trecho NÃO diz: não especifica o mecanismo de eventos (sem barramento, sem garantias de entrega).
Relevância: domain-driven-design: MÉDIA (eventos para respeitar direção de dependência entre camadas). clean-architecture-expert: MÉDIA (inversão/sinalização para cima sem dependência). architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design/references (large-scale structure, subseção "quão restritivo").

---

### Refactoring Toward a Fitting Structure (PDF p.414-415)
Resumo: Estrutura útil só vem de entendimento profundo e iteração; é preciso refatorar para impô-la e mudá-la. Controle de custo: minimalismo, comunicação/autodisciplina, o fato de que reestruturar produz design supple, e destilação.

Conceitos e regras:
- Não é "retorno ao waterfall": a equipe deve repensar a estrutura sem medo durante todo o ciclo, sem se prender a estrutura concebida cedo. [p.414]
- Minimalismo: estrutura simples e leve, tratar só as preocupações mais sérias; no começo, estrutura frouxa (SYSTEM METAPHOR ou duas RESPONSIBILITY LAYERS). [p.414]
- Comunicação e autodisciplina: a equipe toda deve entender e seguir; terminologia e relações entram na UBIQUITOUS LANGUAGE; estruturas decaem porque não são explícitas no código nem cobertas por testes funcionais; conversas comuns não bastam. [p.414]
- Restructuring Yields Supple Design: cada mudança de estrutura pode exigir muito refatoramento, mas o autor observou que designs com estrutura são mais fáceis de transformar, mesmo trocando de tipo (metáfora -> camadas), ainda mais após duas estruturas anteriores; analogia com jaqueta de couro (afrouxa com o uso). Razões: entendimento do arranjo atual, disciplina que permeia o sistema, conhecimento embutido, eixos de mudança identificados. O autor diz não conseguir explicar totalmente. [p.414-415]
- Distillation Lightens the Load: remover mecanismos e GENERIC SUBDOMAINS do CORE reduz o que reestruturar; definir apoios para caber simples na estrutura (em camadas, GENERIC SUBDOMAIN em uma camada; em componentes, pertencer a um componente ou ser SHARED KERNEL entre eles); aplicar destilação à própria estrutura (camadas superficiais substituídas por abstrações mais profundas). [p.415]

Citações curtas de prova:
- "Without consistent adherence by the many people involved, structures have a tendency to decay." [p.414]

O que este trecho NÃO diz: não oferece técnica concreta de refatoração em larga escala (passos, ferramentas); a explicação do ganho de "suppleness" é declarada como parcialmente inexplicada.
Relevância: domain-driven-design: MÉDIA/ALTA (evolução da estrutura, DDD com legado/projeto em andamento). clean-architecture-expert: BAIXA/MÉDIA. architecture-hard-parts-expert: MÉDIA (evolução incremental e governança, risco de decaimento sem fitness checks [fora do livro: o livro não menciona verificação automática]).
Decisão sugerida: usar em domain-driven-design/references (evolução da estrutura; riscos de decaimento).

---

### Cap. 17: Bringing the Strategy Together (PDF p.416-427)
Resumo: Integra contexto, destilação e estrutura de grande escala; propõe um checklist de avaliação inicial; discute quem define a estratégia e lista seis essenciais para a tomada de decisão estratégica; alerta contra frameworks "para leigos" e contra planos mestres.

Conceitos e regras:
- Os três princípios estratégicos (contexto, destilação, estrutura) são complementares, não substitutos. [p.417]
- Estrutura x BOUNDED CONTEXTS: pode viver em um único contexto (aumenta o teto de complexidade mantida num contexto, nomes de camadas locais) ou organizar o CONTEXT MAP inteiro (mostrando papel de cada parte no todo). [p.417-418]
- Legado inconsistente com camadas: não precisa abandonar; reconhecer seu lugar real na estrutura; seus SERVICES podem estar restritos a poucas camadas; dizer em quais camadas ele cabe descreve seu escopo e papel; se acessado por FACADE, projetar cada SERVICE do FACADE para caber numa camada. Interior do legado como "massa indiferenciada" no exemplo; times podem ordenar seu contexto pelas mesmas camadas. [p.418-419]
- Cada BOUNDED CONTEXT é um namespace e pode ter estrutura própria, mas ir longe demais corrói o valor unificador da estrutura. [p.420]
- Estrutura x destilação: a estrutura ajuda a explicar relações dentro do CORE e entre GENERIC SUBDOMAINS; ela mesma pode ser parte do CORE (a distinção potencial/operações/política/decision support destila insight fundamental do negócio), útil quando o projeto é dividido em muitos contextos em que objetos do CORE não têm sentido em boa parte do projeto. [p.421]
- Assessment First: 1) desenhe um CONTEXT MAP (consistente ou ambíguo?); 2) observe o uso da linguagem (há UBIQUITOUS LANGUAGE? rica o bastante?); 3) o que é importante (CORE DOMAIN identificado? há DOMAIN VISION STATEMENT, dá para escrever?); 4) a tecnologia favorece ou atrapalha MODEL-DRIVEN DESIGN?; 5) os devs têm as habilidades técnicas?; 6) conhecem e se interessam pelo domínio? Não há respostas perfeitas; refinar CONTEXT MAP e vision statement com o tempo. [p.422]
- Quem define a estratégia: arquitetura entregue de cima costuma não funcionar. Estilos que dão valor: (a) Emergent Structure from Application Development: time autodisciplinado e bons comunicadores, EVOLVING ORDER; frequentemente um líder informal (muitas vezes o coach), desenvolvedor que mão na massa, árbitro e comunicador, não fonte única de ideias; entre equipes, comitê informal de representantes funciona com poucos times comprometidos, capacidades de design comparáveis e necessidades estruturais semelhantes. (b) Customer Focused Architecture Team: time de arquitetura como par das equipes de aplicação, harmonizando estruturas e fronteiras de contexto; colaboradores que descobrem padrões com os devs e "sujam as mãos". [p.423-424]
- Seis essenciais [p.425-427]:
  1. Decisões devem chegar à equipe inteira (menos autoridade formal, mais relação real dos devs com a estratégia; arquitetos de torre de marfim são ignorados).
  2. O processo deve absorver feedback (só quem está na equipe de aplicação tem a profundidade; estratégia exige envolvimento, não muito código; exemplo de time que rodiziava membros pelas equipes).
  3. O plano deve permitir evolução (decisões de topo cravadas em pedra tiram opções).
  4. Times de arquitetura não devem sugar os melhores (deixam apps com devs menos sofisticados; arquitetos sem conhecimento de domínio; ter designers fortes em todas as equipes, conhecimento de domínio em quem faz design estratégico; talvez arquitetura em tempo parcial).
  5. Design estratégico exige minimalismo e humildade (quase tudo atrapalha algo; entusiasmo leva a arquitetura sobreconstruída).
  6. Objetos são especialistas; desenvolvedores são generalistas (não separar designers que ignoram o negócio de especialistas que ignoram tecnologia).
- Frameworks técnicos: mesmos vieses (evolução, minimalismo, envolvimento) para que ajudem sem atrapalhar a expressividade do modelo; arquitetura que não segue isso será sufocante ou será contornada. "Don't write frameworks for dummies": distinguir encapsular detalhe técnico irrelevante (bom) de pré-empacotar assumindo que devs não sabem projetar (ruim); teste: perguntar aos projetistas do framework o que esperam do usuário (se há respeito, bom sinal). [p.427]
- Beware the Master Plan: cita Alexander (The Oregon Experiment): planos mestres falham por criar ordem "totalitária" em vez de orgânica, rígidos, ao mesmo tempo precisos demais no todo e pouco precisos nos detalhes, e alienam usuários; alternativa é um conjunto de princípios aplicados em crescimento gradual (piecemeal growth). [p.427-428]

Citações curtas de prova:
- "Objects are specialists; developers are generalists" (título de essencial) [p.426]
- "Strategic design requires minimalism and humility" (título) [p.426]
- "Whatever the system, be less concerned with the authority bestowed by management than with the actual relationship the developers have with the strategy." [p.425]

O que este trecho NÃO diz: não oferece processo passo a passo de adoção (ordem 1º/2º/3º além do assessment); não detalha o nome das camadas aplicadas ao legado; a lista de atividades do "lead architect" prometida na p.424 é interrompida pela extração/quebra de página (ver Problemas de extração).
Relevância para os artefatos candidatos:
- domain-driven-design: ALTA, checklist Assessment First (seis perguntas), estrutura x CONTEXT MAP, legado em camadas via FACADE, quem define estratégia.
- clean-architecture-expert: BAIXA/MÉDIA, "don't write frameworks for dummies" e frameworks que não interferem no modelo de domínio.
- architecture-hard-parts-expert: ALTA/MÉDIA, governança arquitetural: arquitetos ivory tower vs. arquitetura como parceira, seis essenciais, master plan vs. crescimento incremental.
Decisão sugerida: usar em domain-driven-design/references (assessment first; como a estrutura se combina com Context Map e com legado; DDD com legado) e em architecture-hard-parts-expert (governança arquitetural: seis essenciais, estilos de liderança, master plan).

Onde o livro vai além de listas curtas: o checklist de seis perguntas inclui perguntas sobre equipe e tecnologia (itens 4-6), não só domínio; cada essencial tem justificativa e anedota.

---

### Conclusão, Epilogues, Looking Forward (PDF p.429-434)
Resumo: Narrativas de cinco projetos antigos do autor: PCB (sucesso técnico, empresa morreu), software de empréstimos (prosperou, mudou equipe, continua evoluindo 7 anos depois), utilitário com ABSTRACT CORE (UBIQUITOUS LANGUAGE sobreviveu à passagem de equipe; depois foi transformado em modelo mais profundo), sistema de transporte marítimo (cultura resistiu a iteração; modelo desconectado da implementação após problemas de performance), Evant (design supple permitiu escalar em um verão). "Looking Forward" defende que criar bom software é atividade de aprendizado e pensamento.

Conceitos e regras:
- Projeto de transporte: liderança comprometida com DDD, mas sem cultura de desenvolvimento que o suportasse; times com habilidades de design muito diferentes; cultura resistente a desenvolvimento iterativo, release interno tardio, problemas expostos tarde; problemas de performance no banco levaram a mudar o código e não o modelo ("tarde demais"), enfraquecendo a ligação com o modelo; ciclo implementação-modelagem nunca fechado; talvez um CONTEXT MAP teria ajudado, dado o relacionamento caótico entre saídas dos times; ainda assim a linguagem do CORE ajudou a unir o sistema. [p.432]
- Lição do utilitário: pacote de entrega com suíte de testes e documento de destilação ajudou a nova equipe; a UBIQUITOUS LANGUAGE sobreviveu; depois, novos requisitos levaram a transformar o modelo (momento propício a breakthrough quando há conhecimento de domínio acumulado); sucesso do design não é estasia. [p.431]
- Evant: cultura de design forte, modelos cada vez mais profundos e designs supples; quatro devs escalaram para bilhões de elementos de planejamento. [p.432-433]
- Características de um projeto DDD: prioridade em entender o domínio e incorporá-lo ao software; consciência do uso da linguagem; insatisfação com a qualidade do modelo porque continuam aprendendo; refinamento contínuo como oportunidade e modelo mal ajustado como risco; levam a sério a habilidade de design. [p.433]
- Looking Forward: tarefa é aprendizado e pensamento; ferramentas que ajudam a pensar são boas; automatizar o que deve ser produto de pensamento é "ingênuo e contraproducente". [p.434]

Citações curtas de prova:
- "A natural part of MODEL-DRIVEN DESIGN is the feedback from implementation problems to changes in the model" [p.432]
- "Take a system people depend on, make it opaque, and it will live forever as untouchable legacy." [p.431]

O que este trecho NÃO diz: sem dados quantitativos nem detalhes do modelo dos projetos; "Epilogues" são anedotas, não regras.
Relevância: domain-driven-design: MÉDIA (sinais de falha/sucesso, anti-padrão: fechar o loop implementação-modelo; handoff com testes e documento de destilação). clean-architecture-expert: BAIXA. architecture-hard-parts-expert: BAIXA/MÉDIA (o caso do transporte como estudo de falha de governança/iteração).
Decisão sugerida: usar em domain-driven-design/references (anti-padrões/sinais de saúde, 3-5 linhas) como casos curtos; descartar o restante (narrativa).

---

### Apêndice "The Use of Patterns in This Book", Glossário, Referências, Créditos (PDF p.435-446)
Resumo: Apêndice justifica o uso de padrões (linguagem econômica de design, analogia com cômodos/Peugeot x Honda) e descreve o formato de padrão (nome, contexto, problema, "Therefore:", consequências, contexto resultante). Glossário, referências bibliográficas e créditos de fotos.

Conceitos e regras:
- Padrões fornecem vocabulário para "discussão econômica" do domínio e evitam designs idiossincráticos; "tudo é objeto" não restringe o suficiente. Nomes de padrões devem virar termos da linguagem da equipe. [p.435-436]
- Formato do padrão: ilustração, contexto, problema, "Therefore:" com resumo da solução, consequências/implementação/exemplos, contexto resultante. [p.437]
- Glossário (definições curtas, úteis para a skill) [p.438-443]: AGGREGATE (cluster tratado como unidade para mudanças; referências externas só à raiz; regras de consistência dentro das fronteiras); BOUNDED CONTEXT (aplicabilidade delimitada de um modelo; clareza sobre o que deve ser consistente e o que pode evoluir independente); CONTEXT MAP (representação dos contextos e das relações reais entre eles); CORE DOMAIN (parte distintiva, central aos objetivos do usuário, que diferencia e dá valor); deep model (expressão incisiva das preocupações dos especialistas, descarta aspectos superficiais e interpretações ingênuas); distillation; domain expert (não é qualquer usuário); ENTITY (identidade e continuidade, não atributos); FACTORY; function (sem efeitos colaterais observáveis); immutable; implicit concept; INTENTION-REVEALING INTERFACE; invariant; large-scale structure; LAYERED ARCHITECTURE; life cycle; model; MODEL-DRIVEN DESIGN; REPOSITORY (emula coleção); SERVICE (operação sem estado encapsulado); STANDALONE CLASS; stateless; strategic design (decisões de modelagem/design que valem para grandes partes e são decididas no nível de equipe); supple design; UBIQUITOUS LANGUAGE; unification (consistência interna: cada termo não ambíguo e nenhuma regra contraditória); VALUE OBJECT; WHOLE VALUE.
- Referências (p.444-445): lista bibliográfica (Alexander, Buschmann POSA, Fowler Analysis Patterns/Refactoring/PoEAA, Gamma, Beck, Wirfs-Brock etc.). Créditos de fotos (p.446). Sem conteúdo técnico.

Citações curtas de prova:
- "A cluster of associated objects that are treated as a unit for the purpose of data changes." (AGGREGATE) [p.438]

O que este trecho NÃO diz: o glossário não traz TRADEOFFS nem exemplos; não define ANTICORRUPTION LAYER, SHARED KERNEL, SPECIFICATION, etc. neste bloco (estão em outros blocos).
Relevância: domain-driven-design: MÉDIA (glossário: servir de base de definições curtas e fiéis; "unification"; "strategic design"). clean-architecture-expert / architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (glossário no references, com definições em paráfrase própria); descartar referências bibliográficas/créditos (sem conteúdo técnico) e o texto de analogia Peugeot (exceto a ideia "linguagem de padrões = vocabulário econômico").

---

## Resumo de aprendizados para as melhorias da skill domain-driven-design (v1.1)
- Camada anticorrupção: neste bloco só aparece indiretamente (FACADE sobre legado, p.418-419; "SERVICES do legado cabem em poucas camadas"; Decision Support em contexto separado CUSTOMER/SUPPLIER, p.399). Sem texto do padrão ANTICORRUPTION LAYER neste bloco [outro bloco].
- Destilação do domínio: alta cobertura (SEGREGATED CORE exemplo, ABSTRACT CORE, Deep Models Distill, Choosing Refactoring Targets).
- Context mapping em profundidade: estrutura de grande escala organizando o CONTEXT MAP, legado em camadas (p.417-420), checklist Assessment First (p.422).
- Agregados/repositórios/fábricas: só indireto (Repository com query para substituir associação bidirecional, p.393; AGGREGATE do Cargo contém Route Specification e Itinerary, p.393; definições de glossário p.438-442).
- DDD com legado: p.418-419; p.432 (projeto de transporte, fossilização em legado e CONFORM do novo dev).
- Exemplo trabalhado: Shipping (SEGREGATED CORE + Responsibility Layers + HazMat) e Employee Payroll/Pension (Knowledge Level).
- Onde o livro vai além de listas curtas: (1) raciocínio de trade-off nas decisões de exemplo (Customer fora do CORE; Leg ficar ou sair; Router coleta políticas), (2) condições e riscos de cada large-scale structure, (3) checklist de avaliação inicial e seis essenciais de governança, (4) critérios de escolha de camadas (storytelling, dependência conceitual, CONCEPTUAL CONTOURS).

## Checklist de cobertura
- Primeira página lida: 376
- Última página lida: 446 (confirmado por Grep: 71 marcadores "=== PDF PAGINA", primeiro 376, último 446)
- Páginas sem texto útil ou ilegíveis: p.429 (só sumário da Conclusão), p.444-445 (referências bibliográficas), p.446 (créditos de fotos); p.411-412 contêm trecho do site do AIDS Quilt (analogia, baixo valor).
- Problemas de extração observados: (a) texto está em inglês; (b) todas as figuras/diagramas UML ausentes (só legendas "Figure 16.x"), de modo que parte dos exemplos (Fig. 15.x, 16.3-16.25) só pode ser reconstruída pela prosa; (c) frase em p.424 "lista a seguir" é cortada (a lista de atividades do arquiteto líder é substituída pelo título da seção seguinte, "Six Essentials", p.425), então a lista prometida não está no texto; (d) frase duplicada em p.406 (parágrafo "KNOWLEDGE LEVEL provides two useful distinctions" repetido) e frase da p.405 "either Retirement Plan or either payroll" possível erro de extração/original; (e) rodapés "[ Team LiB ]" e sem numeração impressa de página; (f) hifenização "unam-biguous" (p.443).
- Capítulos/seções cobertos integralmente: fim do Cap.15 (a partir do exemplo), Abstract Core, Deep Models Distill, Choosing Refactoring Targets, Cap.16 inteiro, Cap.17 inteiro, Epilogues, Looking Forward, Apêndice, Glossário, Referências, Créditos.
- Capítulos/seções que continuam em outro bloco: início do Cap.15 (Distillation, Segregated Core, Generic Subdomains etc. antes da p.376) vem do bloco anterior; este bloco termina o livro (sem continuação).
