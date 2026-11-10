# Notas: Evans, Domain-Driven Design, bloco 05 (PDF p.301-375)

Observação geral: o texto do bloco está em INGLÊS (não em português), apesar de o livro ser descrito como edição em português. Nomes de padrões abaixo seguem o inglês do texto, com a tradução usual entre parênteses apenas como rótulo meu `[fora do livro]`. Números impressos de página não são visíveis (só "Team LiB" no cabeçalho); todas as páginas citadas são "PDF PAGINA".

Pontos de partida do bloco: continua o Cap. 14 (Maintaining Model Integrity) no meio de "Recognizing Splinters Within a BOUNDED CONTEXT" e termina no Cap. 15 (Distillation) dentro do exemplo de SEGREGATED CORE (Figura 15.3, cortada ao fim do bloco).

---

### Recognizing Splinters Within a BOUNDED CONTEXT (PDF p.301) [continua do bloco anterior]
Resumo: Sintomas de modelos diferentes misturados dentro de um mesmo contexto: interfaces que não encaixam, comportamento inesperado e, antes de tudo, confusão de linguagem. Os dois problemas são conceitos duplicados e falsos cognatos.
Conceitos e regras:
- Sinais de fragmentação (splinter): interfaces codificadas que não casam, comportamento inesperado; o alerta mais precoce costuma ser confusão na linguagem. CI com testes automatizados ajuda a pegar [p.301]
- Conceito duplicado: dois elementos de modelo (com implementações) representando o mesmo conceito; cada mudança tem de ser feita em dois lugares, a reanálise "na prática" não acontece, e surgem duas versões com regras e dados diferentes; a equipe aprende duas formas de fazer a mesma coisa e a sincronização [p.301]
- Falso cognato: duas pessoas usam o mesmo termo (ou objeto) achando que é a mesma coisa. Exemplo do livro: duas atividades de negócio chamadas "Charge". Pode ser sutil, quando duas definições tratam do mesmo aspecto com conceituações levemente diferentes. Efeitos: times pisando no código um do outro, bancos com contradições, confusão na comunicação [p.301]
- Ao detectar, a equipe decide: reunificar o modelo e reforçar processos, ou deixar divergir quando há bons motivos [p.301]
Citações curtas de prova:
- "the early warning is usually a confusion of language" [p.301]
O que este trecho NÃO diz: não dá técnica de detecção além de linguagem e testes; o exemplo "Charge" é só citado (o desenvolvimento está no bloco anterior).
Relevância para os artefatos candidatos: domain-driven-design: ALTA, sinais de bounded context vazando e dois riscos nomeados (duplicação e falso cognato) servem como checklist de revisão de modelo; clean-architecture-expert: BAIXA; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (reference de context mapping / revisão de integridade do modelo).

### Continuous Integration (PDF p.302-303)
Resumo: Dentro de um único Bounded Context o modelo tende a se fragmentar à medida que o time cresce (a partir de 3-4 pessoas já pode acontecer). A resposta é integrar frequentemente em dois níveis: conceitos (linguagem) e implementação (merge/build/test).
Conceitos e regras:
- Causas de fragmentação: desenvolvedor não entende a intenção de um objeto e o altera de modo a inutilizá-lo; não percebe que o conceito já existe e duplica; percebe, mas tem medo de mexer e duplica. Precisamos de comunicação e de redes de segurança contra o comportamento excessivamente cauteloso [p.302]
- CI atua em dois níveis: integração de conceitos (comunicação constante, sobretudo exercitar a linguagem ubíqua) e integração da implementação (processo sistemático merge/build/test) [p.302-303]
- Características de bons processos: merge/build reproduzível passo a passo; suítes de teste automatizadas; limite superior razoavelmente pequeno para a vida de mudanças não integradas [p.303]
- Metade quase nunca formalizada: o exercício constante da linguagem ubíqua nas discussões sobre modelo e aplicação [p.303]
- Frequência: a maioria dos projetos ágeis faz merge ao menos diário; ajustável ao ritmo de mudança, desde que o merge ocorra antes de o resto do time fazer muito trabalho incompatível [p.303]
- Em MODEL-DRIVEN DESIGN, integração de conceitos facilita a de implementação, e esta valida o modelo e expõe fragmentos [p.303]
- CI só é essencial dentro de um Bounded Context; vizinhos (incluindo tradução) não precisam do mesmo ritmo. Aplica-se a qualquer contexto maior que uma tarefa de duas pessoas [p.303]
Citações curtas de prova:
- "Relentlessly exercise the UBIQUITOUS LANGUAGE to hammer out a shared view of the model" [p.303]
O que este trecho NÃO diz: não prescreve ferramentas nem número exato de integrações além de "pelo menos diário" como prática comum; não fala de CI/CD de pipeline moderno.
Relevância: domain-driven-design: MÉDIA, define a disciplina que mantém um contexto íntegro (útil em seção de integridade do modelo); clean-architecture-expert: BAIXA; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (referência de context mapping, relações entre contextos).

### Context Map (PDF p.304-311)
Resumo: Um Bounded Context isolado não dá visão global. O Context Map nomeia todos os modelos em jogo, descreve pontos de contato e traduções, e reflete a realidade atual (não a desejada). Exemplo trabalhado: Booking vs. Network Traversal no sistema de transporte marítimo.
Conceitos e regras:
- Reuso de código entre Bounded Contexts é um risco a evitar; integração de funcionalidade e dados passa por tradução [p.304]
- Fronteiras tendem a seguir os contornos da organização de times; times que trabalham juntos compartilham contexto, times separados (ou que não conversam, ou em locais diferentes) divergem [p.304]
- Regra (Therefore): identificar cada modelo em jogo e definir seu contexto, inclusive modelos implícitos de subsistemas não orientados a objetos; dar nome a cada contexto e incorporar os nomes à linguagem ubíqua; descrever pontos de contato, com tradução explícita e destacando o que é compartilhado [p.304]
- Princípio: mapear o terreno existente primeiro, transformações depois; "não mude o mapa até a mudança na realidade estar feita" (paráfrase de p.305) [p.305]
- O mapa não tem forma obrigatória (diagrama, texto, conversa); precisa ser compartilhado, dar nome claro a cada contexto e deixar claros pontos de contato e sua natureza [p.305]
- Não forçar relações existentes nos nomes de padrões; descrever como são e migrar depois para relações mais padronizadas [p.305]
- Splinter emaranhado e inconsistente: "colocar um dragão no mapa", terminar de descrever tudo, depois tratar. Até haver mapa não ambíguo que coloque todo o trabalho em algum contexto, só corrigir contradições flagrantes [p.305]
- Exemplo (Figs 14.2-14.7): o Routing Service é um SERVICE com interface reveladora de intenção e funções sem efeito colateral (entra Route Specification, sai Itinerary, com asserção de que o itinerário satisfaz a especificação). O time de roteamento exigiu um modelo próprio de rede otimizada (legs como elementos de matriz) por desempenho e algoritmos conhecidos; criaram-se dois Bounded Contexts (Booking e Network Traversal) [p.306]
- Só foram necessárias duas traduções: Route Specification -> lista de códigos de local (origem, destino, e alfândega no meio se houver) e lista de Node IDs -> Itinerary (nós quebrados em pares partida/chegada via operationTypeCode, cada par vira um Leg, com mapeamento de atributos como vesselVoyageId, datas e códigos de local) [p.307-308]
- Tradução reversa pode ser ambígua (a rede aceita qualquer número de pontos intermediários, não só alfândega): algumas traduções são impossíveis, e só implementa-se a direção necessária [p.308]
- Um objeto tradutor bidirecional (Booking_TransportNetwork_Translator) é o único ponto que os dois times mantêm em conjunto; deve ser fácil de testar unitariamente e os times devem colaborar na suíte de testes. O Routing Service passa a delegar ao Translator e ao Network Traversal Service [p.309-310]
- Interface pequena entre contextos + SERVICE isola o Booking de mudanças no mundo do roteamento; testes automatizados na interface (alimentar Route Specifications e checar Itinerary) são o segredo da convivência: "trust, but verify" [p.310]
- Testar nos pontos de contato é particularmente importante: compensa subtilezas da tradução e a comunicação mais pobre nas fronteiras, e age como alerta precoce quando se depende de modelo que não se controla [p.310]
- Organização: (1) nomes para os contextos, que entrem na linguagem ubíqua; (2) todos sabem onde estão as fronteiras e reconhecem o contexto de qualquer código. Naturalmente segregar código de contextos distintos em MODULES, com convenção de nomes [p.310-311]
- Exemplo de fala: em vez de "o pessoal do George mudou", dizer "o modelo Transport Network mudou, vamos mudar o tradutor do contexto Booking" [p.311]
Citações curtas de prova:
- "Map the existing terrain. Take up transformations later." [p.305]
- "Put a dragon on the map and finish describing everything." [p.305]
- "Trust, but verify" [p.310]
O que este trecho NÃO diz: não define um formato de notação para o mapa (diz que qualquer um serve); não discute ferramentas; a Figura 14.8 e demais diagramas não aparecem em texto (só legendas). O código do exemplo aparece truncado/com erro de extração (um "]" sobrando na p.309).
Relevância: domain-driven-design: ALTA, exemplo trabalhado completo (tradução em duas direções, ambiguidade, testes de fronteira, regra de nomear contextos); clean-architecture-expert: MÉDIA, o tradutor e o service-interface ilustram limite entre contextos/portas; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (reference de context mapping em profundidade + exemplo trabalhado Booking/Network Traversal); parte dos testes de fronteira também em reference de camada anticorrupção.

### Relationships Between BOUNDED CONTEXTS: introdução (PDF p.312)
Resumo: Padrões de relação servem de alvo de organização e de vocabulário para descrever o existente; variáveis centrais são controle sobre o outro modelo, tipo de cooperação entre times e grau de integração de funcionalidades e dados.
Conceitos e regras:
- Relação existente pode ser descrita pelo padrão mais próximo, com variações anotadas, e puxada gradualmente para ele a cada pequena mudança [p.312]
- Variáveis predominantes: nível de controle sobre o outro modelo; nível e tipo de cooperação entre times; grau de integração de features e dados [p.312]
- Mapa rápido: time afiado + produto bem integrado -> modelo unificado grande; usuários diferentes ou limite de coordenação -> SHARED KERNEL ou CUSTOMER/SUPPLIER; integração não essencial -> SEPARATE WAYS; legado/externos -> OPEN HOST SERVICE ou ANTICORRUPTION LAYER [p.312]
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: não lista Partnership (não aparece neste bloco; padrões do livro aqui são Shared Kernel, Customer/Supplier, Conformist, Anticorruption Layer, Separate Ways, Open Host Service, Published Language).
Relevância: domain-driven-design: ALTA, critério de escolha por três variáveis; clean-architecture-expert: BAIXA; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (context mapping em profundidade: tabela "quando usar cada relação").

### Shared Kernel (PDF p.313-314)
Resumo: Dois times concordam em compartilhar um subconjunto do modelo (e do código/esquema de banco associado), com status especial: não se muda sem consultar o outro time.
Conceitos e regras:
- Motivação: custo de CI total alto, falta de habilidade/organização política, ou time grande demais; times descoordenados gastam mais em tradução e retrofit do que gastariam com CI, duplicam esforço e perdem a linguagem comum [p.313]
- Regra: designar um subconjunto de modelo (com código e/ou desenho de banco) que ambos aceitam compartilhar; mudanças só com consulta; integrar com frequência, mas menos que a CI interna de cada time; rodar os testes de ambos nas integrações [p.313]
- Equilíbrio: o kernel muda com menos liberdade; suítes de teste integradas, pois todos os testes dos dois times precisam passar; usualmente cada time muda uma cópia e integra em intervalos (ex.: CI diária, merge do kernel semanal) [p.313-314]
- O kernel costuma ser o CORE DOMAIN, alguns GENERIC SUBDOMAINS, ou ambos, mas pode ser qualquer parte necessária a ambos. Objetivo: reduzir duplicação (sem eliminá-la, caso contrário seria um só contexto) e facilitar a integração [p.314]
- Analogia: em muitos projetos a camada de infraestrutura já é compartilhada entre times independentes [p.313]
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: não dá regra para versionar o kernel nem para tratar conflitos além de "consultar"; sem exemplo trabalhado próprio (o exemplo Yield Analysis o discute e descarta).
Relevância: domain-driven-design: ALTA, definição operacional completa; clean-architecture-expert: BAIXA; architecture-hard-parts-expert: MÉDIA, trade-off de acoplamento de código/dados compartilhados entre times (como alternativa a duplicação).
Decisão sugerida: usar em domain-driven-design (context mapping); mencionar em architecture-hard-parts-expert só se houver seção de código/dados compartilhados.

### Customer/Supplier Development Teams (PDF p.315-318)
Resumo: Quando um subsistema alimenta outro (dependência em uma direção), formaliza-se a relação upstream/downstream como cliente/fornecedor, com negociação de prioridades e testes de aceitação automatizados em conjunto.
Conceitos e regras:
- Contexto: downstream faz análise e devolve pouco ao upstream; usuários e ferramentas diferentes; tradução mais fácil por ser unidirecional [p.315]
- Problemas sem formalização: upstream travado se downstream tem poder de veto ou o processo de pedidos é pesado; upstream pode ter medo de quebrar o downstream; downstream fica refém das prioridades do upstream [p.315]
- Em XP, usar o planejamento de iteração: representantes do downstream atuam como clientes nas sessões de planejamento; resultado é plano com tarefas que o downstream mais precisa, ou adiadas por acordo explícito (sem expectativa de entrega) [p.315]
- Regra: estabelecer relação cliente/fornecedor claramente; negociar e orçar tarefas; desenvolver juntos testes de aceitação automatizados que validem a interface esperada e incluí-los na suíte do upstream (rodam na CI dele); downstream disponível para tirar dúvidas durante a iteração [p.316]
- Mudar esses testes implica comunicação com o outro time, pois mudar o teste é mudar a interface [p.316]
- Dois elementos cruciais: (1) a necessidade do cliente é prioridade (ainda que balanceada com outros clientes), em contraste com o "primo pobre" que mendiga; (2) suíte automatizada que libera o upstream para mudar sem medo e o downstream para não vigiar o upstream [p.316]
- Também ocorre entre empresas quando um cliente é muito importante para o fornecedor; formalizar ajuda porque custos/benefícios são mais difíceis de ver [p.316]
- Exemplo Yield Analysis vs Booking (p.316-318): análise de rendimento (data warehouse, modelos analíticos próprios) é downstream do Booking; dois contextos pela diferença de ferramentas e, principalmente, de modelo. SHARED KERNEL seria difícil com tecnologias diferentes e modelagem muito especializada. Downstream precisa de dados extras e estabilidade de esquema (ou aviso confiável de mudança, ou utilitário de exportação) [p.317]
- Condição de sucesso observada: gerentes dos dois times subordinados à mesma pessoa; funciona melhor sob mesma gerência ou entre empresas com papéis reais cliente/fornecedor; o sucesso depende muito do relacionamento pessoal entre os gerentes de projeto [p.317-318]
Citações curtas de prova:
- "the customer's needs are paramount" [p.316]
- "without tests, surprises will happen" [p.316]
O que este trecho NÃO diz: não trata contratos orientados ao consumidor (consumer-driven contracts) pelo nome, embora a ideia de testes de aceitação do downstream rodando no upstream seja análoga; não trata versionamento de API.
Relevância: domain-driven-design: ALTA, relação com condições de sucesso e anti-padrão "primo pobre"; clean-architecture-expert: BAIXA; architecture-hard-parts-expert: MÉDIA, testes de aceitação do consumidor rodando no produtor como mecanismo de contrato.
Decisão sugerida: usar em domain-driven-design (context mapping em profundidade).

### Conformist (PDF p.319-321)
Resumo: Quando o upstream não tem motivação para atender o downstream, cooperar (Customer/Supplier) é ingênuo. As opções são abandonar a dependência (Separate Ways), seguir servilmente o modelo upstream (Conformist) ou isolar-se com Anticorruption Layer.
Conceitos e regras:
- Cenários: times distantes na hierarquia, chefe indiferente, empresa externa para quem o cliente não importa, fornecedor mal gerido ou extinto [p.319]
- Promessas altruístas do upstream levam o downstream a planejar com base em features que nunca virão [p.319]
- Três caminhos: (1) abandonar o upstream, avaliando de forma realista (pode-se superestimar valor e subestimar custo); (2) se o design upstream é muito difícil (falta de encapsulamento, abstrações estranhas, paradigma inutilizável), modelo próprio com camada de tradução complexa (ver ANTICORRUPTION LAYER); (3) se a qualidade não é tão ruim e o estilo é compatível, desistir de modelo independente: CONFORMIST [p.319-320]
- Seguir nem sempre é ruim: com componente de prateleira de interface grande, normalmente conformar-se ao modelo implícito dele (adaptadores só para formato); o componente provavelmente embute conhecimento condensado e pode "arrastar para um design melhor". Interface pequena: tradução é viável; interface grande e integração significativa: normalmente seguir o líder [p.320]
- Regra: eliminar a complexidade de tradução aderindo ao modelo do upstream. Custos: restringe os designers, aprofunda a dependência, limita a aplicação às capacidades do upstream mais aprimoramentos puramente aditivos [p.320]
- Benefícios: integração muito mais simples e linguagem ubíqua compartilhada com o fornecedor, o que ajuda a obter informação dele [p.320]
- Emocionalmente pouco atraente, por isso se escolhe menos do que se deveria [p.320]
- Diferença para Shared Kernel: a estrutura (área igual, área estendida, área independente) é parecida, mas o Shared Kernel é colaboração coordenada, o Conformist é integração com quem não quer colaborar [p.320-321]
Citações curtas de prova:
- "slavishly adhering to the model of the upstream team" [p.320]
O que este trecho NÃO diz: não oferece critério numérico para decidir entre Conformist e ACL; "modelo implícito do componente" não é detalhado além do dito.
Relevância: domain-driven-design: ALTA, a árvore de decisão de três caminhos e a defesa do Conformist (que listas curtas costumam omitir); clean-architecture-expert: BAIXA; architecture-hard-parts-expert: MÉDIA, trade-off seguir vs. isolar com custo explícito.
Decisão sugerida: usar em domain-driven-design (context mapping em profundidade).

### Anticorruption Layer (PDF p.322-326)
Resumo: Camada isolante que oferece ao sistema novo a funcionalidade do outro em termos do próprio modelo, traduzindo nos dois sentidos, sem exigir (ou quase) modificações no sistema legado. Estruturada como Services + Adapters + Translators + Facade, mais comunicação.
Conceitos e regras:
- Problema: integrações grandes podem sobrecarregar a intenção do modelo novo e fazê-lo ficar parecido com o outro modelo, de forma ad hoc; modelos legados são geralmente fracos. Não evitar toda integração: substituir todo o legado de uma vez é demais e integrar é uma forma valiosa de reuso [p.322]
- Armadilha: achar que se trafega "dado primitivo" de significado inequívoco; normalmente errado, pois o significado muda conforme a associação dos dados em cada sistema. Interface de baixo nível tira o poder do modelo do outro sistema de explicar e restringir os dados e joga a interpretação no sistema novo [p.322-323]
- Regra: criar camada isolante que dê aos clientes funcionalidade nos termos do próprio modelo, falando com o outro sistema pela interface existente, traduzindo nas duas direções [p.323]
- ACL não é mecanismo de transporte de mensagens entre sistemas: é tradução de objetos e ações conceituais de um modelo/protocolo para outro. Questões técnicas de comunicação são separadas [p.323]
- Interface pública da ACL: normalmente um conjunto de SERVICES (às vezes uma ENTITY). Oportunidade de reabstrair o outro sistema consistente com o nosso modelo; pode fazer sentido vários services, cada um com responsabilidade coerente, em vez de um componente único [p.323]
- Implementação: combinação de FACADES, ADAPTERS (de Gamma et al.) e translators, mais comunicação [p.323]
- FACADE: interface alternativa mais simples para o subsistema; escrita estritamente de acordo com o modelo do sistema outro (não cria um terceiro modelo); pertence ao Bounded Context do outro sistema, apenas apresenta uma face mais amigável [p.323-324]
- ADAPTER: wrapper que converte a mensagem para o protocolo entendido pelo implementador e converte a resposta; aqui se escolhe a interface adaptada e o adaptado nem sempre é objeto; ênfase na tradução entre modelos. Para cada SERVICE, um ADAPTER que suporta a interface do service e sabe fazer pedidos equivalentes ao outro sistema ou à sua facade [p.324]
- TRANSLATOR: a conversão de objetos/dados conceituais é tarefa distinta e complexa, posta em objeto próprio; pode ser leve, instanciado quando preciso, sem estado, sem necessidade de distribuição [p.324]
- Considerações: ACL pode ser bidirecional (services nos dois lados, adapters próprios, mesmos tradutores com traduções simétricas); onde colocar links de comunicação (entre facade e outro subsistema, entre adapter e facade, ou ACL toda morando junto ao outro subsistema) é decisão de implantação, sem relevância conceitual [p.324-325]
- Se tem acesso ao outro subsistema, um pouco de refatoração lá (interfaces mais explícitas, começando por testes automatizados) pode facilitar [p.325]
- Quando a integração é extensa e a tradução custa muito, pode ser necessário aproximar seletivamente o modelo próprio do externo, com cuidado para não comprometer a integridade; se esse for o caminho natural para a maior parte, considerar Conformist [p.325]
- Se o outro sistema é simples ou tem interface limpa, pode dispensar a facade; funcionalidade específica da relação pode ir na ACL (ex.: trilha de auditoria do uso do sistema externo, logs de depuração das chamadas) [p.325]
- ACL também serve entre subsistemas próprios baseados em modelos diferentes, por exemplo contextos que foram para SEPARATE WAYS mas ainda precisam de alguma integração; aí se tem controle dos dois lados e a tradução costuma ser simples [p.325]
- Exemplo "Legacy Booking Application": primeira versão mínima monta o shipment e passa ao legado por camada de tradução para booking e suporte; a ACL recebe objetos de shipment, converte, pede booking ao legado, captura a confirmação e traduz para o objeto de confirmação do design novo. Isolamento permite desenvolver o novo quase independente do velho, com investimento significativo em tradução; a cada release o sistema novo assume mais funções ou só agrega valor [p.325]
- Conto "A Cautionary Tale" (Grande Muralha): isolamento tem custo alto (a muralha faliu ao menos uma dinastia); balancear benefícios de isolamento e custo; às vezes é hora de ser pragmático e ajustar o modelo para casar melhor com os estrangeiros. Toda integração tem custo (CI total, Shared Kernel/Customer-Supplier, Conformist, ACL), então garanta que ela é mesmo necessária [p.326]
Citações curtas de prova:
- "Create an isolating layer to provide clients with functionality in terms of their own domain model." [p.323]
- "The FACADE belongs in the BOUNDED CONTEXT of the other system." [p.324]
- "Integration can be very valuable, but it is always expensive." [p.326]
O que este trecho NÃO diz: não dá código de ACL (só o esquema Figura 14.8, ausente em texto); não discute eventos/mensageria assíncrona nem versionamento; o livro usa "Adapter/Facade" no sentido GoF e deixa explícito que adapta o termo.
Relevância: domain-driven-design: ALTA, é a melhor fonte para uma reference de camada anticorrupção (estrutura Services/Adapters/Translators/Facade, onde colocar a comunicação, bidirecional, quando dispensar a facade, funções extras como auditoria); clean-architecture-expert: ALTA, tradução de modelo na fronteira e proteção do domínio contra dependência externa (portas/adaptadores) alinha com Dependency Rule; architecture-hard-parts-expert: MÉDIA, custo-benefício do isolamento (Grande Muralha) e migração gradual do legado.
Decisão sugerida: usar em domain-driven-design (nova reference anticorruption-layer.md) e em clean-architecture-expert (referência cruzada sobre limites e tradução); trade-off em architecture-hard-parts-expert opcional.

### Separate Ways (PDF p.327-328)
Resumo: Integração é sempre cara; se duas funcionalidades não têm relação indispensável, declare contextos sem conexão e deixe cada um achar soluções simples e especializadas.
Conceitos e regras:
- Integração força compromissos: o modelo simples e especializado dá lugar a um modelo mais abstrato que atenda todos os casos; às vezes tecnologia muito diferente seria fácil mas é difícil integrar; às vezes um time é difícil de colaborar [p.327]
- Se as partes não chamam funcionalidades uma da outra, não interagem sobre objetos tocados por ambas e não compartilham dados, a integração, mesmo via camada de tradução, pode ser desnecessária. Estar relacionado num caso de uso não obriga a integrar [p.327]
- Regra: declarar um Bounded Context sem conexão com os outros; funcionalidades ainda podem ser organizadas em middleware ou UI, mas sem lógica compartilhada e com o mínimo (preferencialmente nenhuma) transferência de dados via tradução [p.327]
- Exemplo "An Insurance Project Slims Down": time de sistema integrado de sinistros ficou travado um ano (paralisia de análise e grande investimento em infraestrutura). Nova gerente pediu levantamento, cortou o difícil e pouco importante, e percebeu que algumas funções (acesso a bases existentes, relatório exportado como HTML na intranet, consulta especializada em pacote padrão) não precisavam integração, só ser lançadas do mesmo menu. Entregaram-se pequenos aplicativos quase da noite para o dia; depois o time voltou a se paralisar e o único legado foram esses apps separados [p.328]
- Custo: Separate Ways fecha opções; é difícil unir modelos que se desenvolveram em isolamento total, e se a integração for necessária haverá camadas de tradução possivelmente complexas [p.328]
Citações curtas de prova:
- "Just because features are related in a use case does not mean they must be integrated." [p.327]
O que este trecho NÃO diz: não apresenta Separate Ways como "autonomia de microsserviços"; é a opção de não integrar de forma alguma.
Relevância: domain-driven-design: ALTA, contrapeso a over-integração, com exemplo; clean-architecture-expert: NENHUMA; architecture-hard-parts-expert: MÉDIA, argumento de custo de integração e do preço de duplicar.
Decisão sugerida: usar em domain-driven-design (context mapping em profundidade).

### Open Host Service (PDF p.329)
Resumo: Quando um subsistema é muito demandado, fazer um tradutor por integração não escala; definir um protocolo aberto como conjunto de SERVICES.
Conceitos e regras:
- Com integração pontual, um tradutor por sistema externo evita corrupção a custo mínimo; com muitas integrações a manutenção piora e o time repete trabalho [p.329]
- Só compensa quando o subsistema pode ser descrito como conjunto coeso de services e há muitas integrações; projetar protocolo limpo para vários times é bem mais difícil. Pode ser a diferença entre modo de manutenção e desenvolvimento contínuo [p.329]
- Regra: definir protocolo que dê acesso ao subsistema como conjunto de services, abri-lo a todos que precisam e expandi-lo para novos requisitos, exceto em necessidades idiossincráticas de um único time, que ganham tradutor pontual para manter o protocolo simples e coerente [p.329]
- Implica vocabulário de modelo compartilhado: os outros sistemas ficam acoplados ao modelo do host e precisam aprender seu dialeto; um PUBLISHED LANGUAGE conhecido pode reduzir acoplamento [p.329]
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: não detalha estilo de API (REST, RPC), versionamento ou contratos.
Relevância: domain-driven-design: ALTA, critério de quando justificar (muitos integradores, services coesos) e custo (acoplamento ao dialeto do host); clean-architecture-expert: BAIXA; architecture-hard-parts-expert: MÉDIA, trade-off protocolo comum vs. tradutores sob medida.
Decisão sugerida: usar em domain-driven-design (context mapping em profundidade).

### Published Language (PDF p.330-332)
Resumo: Linguagem documentada e compartilhada como meio comum de comunicação entre contextos, em vez de traduzir direto entre modelos de domínio complexos ou subdocumentados. Exemplos: DB2/Btrieve (contra-exemplo e correção) e Chemical Markup Language (CML).
Conceitos e regras:
- Motivos: traduzir direto de/para modelos existentes pode ser difícil (complexos, mal fatorados, sem documentação); se um deles for usado como interlíngua, fica congelado e não evolui; entre empresas não é realista nem desejável adotar o modelo de domínio do outro [p.330]
- Open Host usa protocolo padronizado e pode empregar modelo de interchange mesmo que não seja usado internamente; "publicar" significa deixar a linguagem acessível à comunidade e suficientemente documentada para permitir interpretações independentes compatíveis [p.330]
- Regra: usar uma linguagem compartilhada bem documentada que expresse a informação necessária do domínio como meio comum, traduzindo para dentro e para fora dela [p.330]
- Não precisa criar do zero; pode haver padrão pronto. A linguagem publicada pode ser de outro domínio (ex.: o conjunto de SQL/protocolos do DB2 é uma linguagem publicada, firmemente especificada e documentada) [p.331]
- Caso contado (Smalltalk + DB2 -> Btrieve): o autor reutilizou abstrações de persistência internas e sem especificação do cliente; deu certo, mas custou muito descobrir requisitos, não permitiu reuso e aprofundou o modelo de persistência do cliente. Melhor teria sido identificar o subconjunto do DB2 usado e emulá-lo, documentando simplesmente pelo subconjunto [p.330-331]
- Exemplo CML: modelos diversos de estrutura química dificultavam troca de dados; CML (dialeto de XML, mantido por grupo de academia e indústria) permitiu ferramentas novas (ex.: JUMBO Browser) que antes não valeriam a pena. Ganho duplo por usar XML ("meta-linguagem publicada"): curva de aprendizado menor, parsers prontos, bibliografia [p.331]
Citações curtas de prova:
- "Use a well-documented shared language that can express the necessary domain information as a common medium of communication" [p.330]
O que este trecho NÃO diz: sem menção a JSON, schemas modernos, OpenAPI ou eventos; as referências tecnológicas (XML/DTD, Btrieve, DB2) são datadas. Trecho CML em XML omitido por não ser útil.
Relevância: domain-driven-design: ALTA, justificativa para linguagem de intercâmbio estável separada do modelo interno e checklist de passos (em Transformations); clean-architecture-expert: BAIXA; architecture-hard-parts-expert: MÉDIA, contratos de dados/protocolos compartilhados (acoplamento de contrato).
Decisão sugerida: usar em domain-driven-design (context mapping em profundidade).

### Unifying an Elephant (PDF p.333-336)
Resumo: Parábola dos cegos e do elefante para explicar contextos múltiplos e a unificação de modelos. Reconhecer a incompletude da percepção e definir contextos já resolve muito; unificação plena quase sempre cria um modelo novo e passa por um modelo cru (parte-todo) antes de um modelo profundo.
Conceitos e regras:
- Se não há integração necessária, não importa que os modelos não estejam unificados; se há alguma, basta reconhecer que discordam para não falar em paralelo sem saber [p.334]
- Escala de integração (Figs 14.9-14.12): quatro contextos sem integração, integração mínima (por exemplo, localização do elefante), um contexto com integração crua (parte-todo), um contexto com modelo mais profundo [p.334-335]
- Unificar vários modelos quase sempre exige criar um novo modelo; ninguém abandona o seu para adotar o de outro [p.334]
- Mais fácil quando os modelos descrevem partes diferentes do todo; mais difícil quando descrevem a mesma parte de formas diferentes (cobra vs. mangueira de incêndio): exige nova abstração que une propriedades úteis e descarta implicações impróprias [p.335]
- A unificação bem-sucedida depende de minimalismo: melhor perder uma capacidade do que ter uma característica incorreta ("o 'a menos' provavelmente importa mais que o 'a mais'") [p.335]
- Modelo unificado não precisa estar maduro na primeira versão; pode começar cru e ser aprofundado por novos requisitos e entendimento. Novos requisitos podem forçar o aprofundamento (se o elefante anda, a teoria da "árvore" cai e surge o conceito de "pernas") [p.335-336]
- Reconhecer modelos em choque é "encarar a realidade"; definir o contexto em que cada um vale mantém a integridade de cada um e mostra as implicações de cada interface [p.336]
Citações curtas de prova:
- "Unifying multiple models almost always means creating a new model." [p.334]
O que este trecho NÃO diz: é uma analogia; não traz critérios mensuráveis de quando unificar.
Relevância: domain-driven-design: MÉDIA, bom exemplo didático do continuum de integração e de fusão de modelos (para exemplo trabalhado); clean-architecture-expert: NENHUMA; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (exemplo resumido em 3-4 linhas na reference de context mapping); não copiar o poema (direitos autorais e relevância).

### Choosing Your Model Context Strategy (PDF p.337-342)
Resumo: Guia de decisão sobre fronteiras e relações entre contextos: decisões de time ou superiores, forças para contextos maiores ou menores, tratamento de sistemas externos, sistema em desenho, necessidades especiais, implantação, trade-off geral e como agir em projetos já em andamento.
Conceitos e regras:
- Decisões sobre contextos e relações são de time (ou acima), e muitas envolvem acordos além do time; no mérito, ponderar valor de ação independente vs. integração direta e rica; na prática, política e estrutura de reporte decidem; avaliar e comunicar o custo e mitigar [p.337]
- Viés do mapa: estamos dentro do contexto principal; ter consciência desse viés [p.337]
- Forças a favor de contextos MAIORES: fluxo suave entre tarefas do usuário com modelo unificado; mais fácil entender um modelo que dois mais mapeamentos; tradução pode ser difícil/impossível; linguagem compartilhada comunica melhor [p.337-338]
- Forças a favor de contextos MENORES: menos overhead de comunicação; CI mais fácil com times/código menores; contextos grandes pedem modelos abstratos versáteis que exigem habilidades escassas; modelos distintos atendem necessidades especiais e jargões de grupos de usuários (dialetos da linguagem ubíqua) [p.338]
- Integração profunda de funcionalidade entre contextos é impraticável; limitada ao que um modelo consegue expressar rigorosamente nos termos do outro; faz sentido com interface pequena [p.338]
- Sistemas externos: começar pelas decisões fáceis. Não assuma que um sistema externo é um Bounded Context (definido por intenção de unificar o modelo); verifique se há CI informal; é comum encontrar contradições semânticas em legados [p.338]
- Relação com externos: (1) considerar SEPARATE WAYS (basta acesso fácil do usuário aos dois sistemas?); se integração é essencial: (2) CONFORMIST ou (3) ANTICORRUPTION LAYER. Ser conformist é pouco divertido; em sistema novo grande raramente é prático (por que construir algo novo?); pode ser apropriado para extensões periféricas de um sistema dominante (ex.: ferramentas de apoio à decisão em Excel) [p.338-339]
- Se for Conformist, faça com convicção: só extensão, sem modificar o modelo existente; ainda cabe bom design tornando explícito o modelo por trás do sistema, desde que respeite o modelo antigo [p.339]
- Quando a funcionalidade é mais que extensão, a interface é pequena, ou o outro sistema é mal desenhado: contexto próprio, com tradução ou ACL [p.339]
- Sistema em desenho: um único contexto para time com menos de dez pessoas e funcionalidades muito inter-relacionadas; times maiores: procurar SHARED KERNEL e contextos independentes com menos de dez pessoas cada; dependências em uma direção: CUSTOMER/SUPPLIER; mentalidades muito diferentes (necessidades, conhecimento de fundo ou estrutura gerencial): SEPARATE WAYS, com camada de tradução mantida em conjunto pelos dois times como único ponto de CI (diferente do externo, onde a ACL acomoda o outro como está) [p.339]
- Em geral, um time por Bounded Context; um time pode manter vários contextos, mas é difícil vários times num só [p.339]
- Necessidades especiais com modelos distintos: jargões locais podem ser precisos; padronizar exige treinamento e análise e pode servir pior. Custos: perda de linguagem compartilhada, overhead de integração, duplicação de esforço. Maior risco: virar argumento contra mudança e justificativa para modelo paroquial; avaliar o valor do jargão. Às vezes emerge um modelo profundo que unifica as linguagens, mas só mais tarde (se emergir): não dá para planejar [p.339-340]
- Se a integração é extensa, custo de tradução sobe; coordenação pontual (modificar um objeto de tradução complicada) até Shared Kernel pode facilitar [p.340]
- Implantação: a estratégia de contextos afeta o deploy; Customer/Supplier exige lançar versões testadas juntas (código e migrações de dados); em sistema distribuído, manter camadas de tradução entre contextos no mesmo processo evita várias versões coexistindo; mesmo dentro de um contexto, migração de dados lenta e atualização não instantânea geram duas versões convivendo [p.340]
- Feedback: viabilidade do deploy deve realimentar as fronteiras; com camada de tradução, um contexto pode ser atualizado desde que a nova tradução preserve a interface para o outro; SHARED KERNEL impõe muito mais coordenação (também de deploy); SEPARATE WAYS simplifica [p.341]
- Trade-off: integração suave de funcionalidade vs. esforço de coordenação/comunicação; ação independente vs. comunicação mais suave; unificação mais ambiciosa exige controle sobre o design dos subsistemas (Fig. 14.13, sem texto) [p.341]
- Projeto já em andamento: primeiro definir os contextos como são hoje (crucial); depois apertar práticas (melhorar CI dentro dos contextos, refatorar código de tradução solto para dentro das ACLs, nomear os contextos e inclui-los na linguagem ubíqua); só então considerar mudar fronteiras e relações, em pequenos passos, escolhidos pragmaticamente para dar mais valor com menos esforço e disrupção [p.341-342]
Citações curtas de prova:
- "The CONTEXT MAP must reflect the true practice of the teams, not the ideal organization" [p.341] (citação reduzida/parafraseada do original; conferir antes de usar como literal)
- "Generally speaking, there is a correspondence of one team per BOUNDED CONTEXT." [p.339]
O que este trecho NÃO diz: o "menos de dez pessoas" é indicação, não regra; não há matriz de decisão formal (a Fig. 14.13 sobre "demandas relativas" dos padrões está só como legenda).
Relevância: domain-driven-design: ALTA, as listas de forças a favor de contextos maiores/menores, a árvore de escolha por tipo de sistema e o roteiro de "projeto já em andamento" são o mais acionável para context mapping e DDD com legado; clean-architecture-expert: BAIXA; architecture-hard-parts-expert: ALTA, é análise de trade-off de granularidade e acoplamento entre times/deploy (decomposição, deploy coordenado, versões coexistindo).
Decisão sugerida: usar em domain-driven-design (reference context-mapping e reference ddd-com-legado); usar trade-offs de granularidade/deploy em architecture-hard-parts-expert (granularidade de serviços e relação time-contexto, Lei de Conway implícita, mas Conway não é nomeada no texto).

### Transformations (PDF p.343-347)
Resumo: Receitas passo a passo para mudanças difíceis nas fronteiras: fundir contextos em etapas (Separate Ways -> Shared Kernel -> CI plena), descomissionar sistema legado e formalizar Open Host Service com Published Language. Fechamento: não fragmente um contexto grande só por ele ser complexo.
Conceitos e regras:
- Dividir contextos é fácil; fundir ou mudar relações é difícil. As mudanças são grandes demais para uma refatoração ou até uma iteração, por isso são planos em passos [p.343]
- Fusão SEPARATE WAYS -> SHARED KERNEL (7 passos): (1) avaliar situação inicial, confirmar que cada contexto é internamente unificado; (2) montar o processo (como compartilhar código, convenção de módulos, integração ao menos semanal, suíte de testes antes de compartilhar qualquer código); (3) escolher pequeno subdomínio duplicado nos dois contextos, fora do CORE (genérico ou não crítico), de preferência já traduzido; (4) formar grupo de 2 a 4 desenvolvedores dos dois times para definir o modelo compartilhado do subdomínio (sinônimos, mapeamento de termos) e testes básicos; (5) desenvolvedores de qualquer time implementam e, se há problema, reconvocam o grupo; (6) cada time integra com o novo kernel; (7) remover traduções que não são mais necessárias. Repetir os passos 3-7 nas iterações seguintes; só depois subdomínios mais complexos ou do CORE [p.343-344]
- Se modelos adotaram jargão de comunidades diferentes, adiar a fusão até haver modelo profundo que supere os dois [p.344]
- Três formas de fundir: escolher um modelo e refatorar o outro contexto; escolher peça a peça (cuidado com colcha de retalhos); achar um novo modelo mais profundo [p.343]
- Alternativa sem integração: se um modelo é claramente preferido, transferir sistematicamente a responsabilidade dos subdomínios para o contexto favorecido (refatorando aplicações para chamar o modelo preferido), eliminando redundância sem overhead contínuo; pode levar a uma fusão de fato [p.344]
- Fusão SHARED KERNEL -> CONTINUOUS INTEGRATION (6 passos): (1) processos de CI (propriedade coletiva do código, integração frequente) em cada time e harmonizados; (2) circular pessoas entre os times; (3) destilar cada modelo individualmente (cap. 15); (4) fundir o CORE no kernel, possivelmente com camadas de tradução temporárias; fase de alto overhead, fazê-la rápido e com prioridade sobre novas features, sem exagerar na carga; (5) aumentar a integração para diária e depois contínua; (6) ao chegar perto de englobar tudo, ter um time grande ou dois menores com base de código comum e troca frequente de membros [p.344-345]
- Fundir modelos do CORE: manter um e modificar o outro, ou criar um novo modelo e adaptar ambos; se atendem usuários diferentes, pode ser necessário um modelo mais profundo, difícil, e não se pode mais ter múltiplos dialetos; cuidado para não perder a capacidade de atender necessidades especializadas [p.345]
- Descomissionar legado (caso comum: legado de uso diário + sistemas modernos conversando via ACL): definir estratégia de testes (testes unitários automatizados para o novo; algumas organizações rodam novo e velho em paralelo). Por iteração: (1) identificar funcionalidade do legado que cabe numa iteração em um dos sistemas favorecidos; (2) identificar acréscimos necessários na ACL; (3) implementar; (4) implantar. Quando em produção: (5) remover partes desnecessárias da ACL; (6) considerar extirpar módulos legados sem uso (nem sempre prático). Repetir; a ACL encolhe e incha. Migrar primeiro as funções que resultam em ACLs menores, mas outros fatores costumam dominar [p.345-346]
- Funcionalidades podem precisar de várias iterações para ficar prontas, mas planejadas em unidades pequenas; muitas vezes se implanta em releases maiores (treinamento de usuários, período paralelo) [p.345-346]
- Ironia: quanto melhor projetado o legado, mais fácil desativar; software mal projetado é difícil de desmontar aos poucos; pode-se ignorar partes sem uso até desligar tudo [p.346]
- OPEN HOST SERVICE -> PUBLISHED LANGUAGE (7 passos): (1) se há linguagem padrão da indústria, avaliar e usar se possível; (2) senão, afiar o CORE DOMAIN do sistema host; (3) usar o CORE como base de uma linguagem de intercâmbio em paradigma padrão (ex.: XML); (4) publicar para todos os envolvidos; (5) se há nova arquitetura, publicar também; (6) construir camadas de tradução por sistema colaborador; (7) trocar. Depois disso, novos colaboradores entram com pouca disrupção [p.346]
- A linguagem publicada tem de ser estável e o modelo do host precisa de liberdade para refatorar: não igualar linguagem de intercâmbio e modelo do host; manter próximos reduz tradução (pode até tornar o host conformista), mas reserve o direito de divergir [p.346]
- Fechamento: contextos servem a consistência lógica, mas são mal usados quando só fragmentam um modelo grande que parece complexo; fragmentar perde oportunidades. Examine a decisão; se não é possível manter junto organizacional ou politicamente, redesenhar fronteiras que se possa manter; se o contexto grande atende necessidades de integração e é viável, quebrá-lo pode não ser a melhor resposta; antes, considerar destilação e estrutura em larga escala [p.346-347]
Citações curtas de prova:
- "Generally speaking, breaking up CONTEXTS is pretty easy, but merging them or changing the relationships between them is challenging." [p.343]
- "do not equate the interchange language and the model of the host" (trecho reduzido; no original é uma frase maior) [p.346]
O que este trecho NÃO diz: não é um playbook para "strangler fig" por nome (nem usa esse termo); o roteiro de legado é descrito por iterações curtas, sem mencionar roteamento de tráfego; não fala de migração de dados em detalhe.
Relevância: domain-driven-design: ALTA, os três roteiros passo a passo são o material de "DDD com legado" e de evolução de context map; architecture-hard-parts-expert: ALTA, descomissionamento incremental, custo de fusão de contextos/serviços e estabilidade de contratos; clean-architecture-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (nova reference ddd-com-legado.md com os três roteiros e a ACL encolhendo/inchando); usar em architecture-hard-parts-expert (migração/descomissionamento incremental; fundir vs. separar).

### Chapter 15 Distillation: abertura (PDF p.348-349)
Resumo: Mesmo isolado pela arquitetura em camadas, o domínio de um sistema grande pode ser ingerenciável. Destilação extrai a essência (CORE DOMAIN); subprodutos (GENERIC SUBDOMAINS, COHESIVE MECHANISMS) também ganham valor.
Conceitos e regras:
- Cinco benefícios da destilação estratégica: ajuda todos a entender o desenho geral; facilita a comunicação ao identificar um núcleo de tamanho manejável para a linguagem ubíqua; guia refatoração; foca o trabalho nas áreas de maior valor; guia terceirização, uso de componentes de prateleira e alocação de pessoas [p.348]
- A Figura 15.1 é um mapa de navegação dos padrões (sem texto) [p.349]
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: não define ainda CORE DOMAIN (isso vem em seguida); epígrafe de Maxwell é decorativa.
Relevância: domain-driven-design: ALTA, a lista de 5 benefícios justifica a destilação; clean-architecture-expert: NENHUMA; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (reference de destilação do domínio).

### Core Domain (PDF p.350-353)
Resumo: Em sistemas grandes o essencial do modelo, o ativo de negócio, fica obscurecido; é preciso identificá-lo, deixá-lo pequeno e destinar a ele os melhores desenvolvedores. Inclui história do sistema de empréstimos sindicalizados e discussão sobre comprar versus construir.
Conceitos e regras:
- Sistema difícil de entender é difícil de mudar: força especialização, reduz transferência de conhecimento, perde flexibilidade e gera duplicação [p.350]
- Risco extra: partes do desenho não serão igualmente refinadas; desenvolvedores escassos e hábeis gravitam para infraestrutura técnica ou problemas bem definidos que não exigem conhecimento especializado do domínio (currículo e interesse), deixando o núcleo diferenciador para menos qualificados, que montam esquema com DBAs e codificam feature a feature sem poder conceitual [p.350]
- Consequência: aplicação que nunca faz coisas convincentes para o usuário, não importa a infra [p.351]
- História do sistema de empréstimos sindicalizados: talentos em camadas de mapeamento de banco e mensageria, modelo de negócio com desenvolvedores novos em objetos; única exceção fez um modelo de comentários genérico e elegante (periférico) enquanto o módulo crítico "loan" virava um emaranhado quase fatal [p.351]
- Definição: partes do modelo distintivas e centrais para os objetivos das aplicações formam o CORE DOMAIN, onde mais valor deve ser adicionado [p.351]
- Regra: reduzir o modelo; encontrar o CORE e distingui-lo facilmente do apoio; tornar o CORE pequeno; melhores talentos no CORE e recrutar de acordo; esforço para modelo profundo e design flexível (supple); justificar o investimento em outras partes pelo apoio ao CORE [p.351]
- Decisões fáceis: segredo competitivo = CORE; entre duas refatorações desejáveis, escolher a que mais afeta o CORE primeiro [p.351]
- A escolha do CORE depende do ponto de vista: modelo de dinheiro é genérico para a maioria dos apps, mas em um app de câmbio uma parte mais elaborada seria CORE (e mesmo ali parte é genérica). Exemplos: transporte marítimo (consolidação de cargas, transferência de responsabilidade, roteamento), banco de investimento (sindicalização de ativos) [p.352]
- Core do app de um é componente genérico de outro; a definição do CORE evolui com iterações e o que parece central pode virar apoio [p.352]
- Quem faz o trabalho: quebrar o ciclo vicioso juntando desenvolvedores fortes com compromisso de longo prazo e especialistas de domínio; design de domínio é trabalho interessante quando levado a sério; contratar consultoria curta para o miolo costuma não funcionar (conhecimento vaza), mas mentor ensinando o time é valioso [p.352]
- Improvável comprar o CORE: frameworks de modelos setoriais (SEMATECH CIM, IBM San Francisco) não deram resultados convincentes, exceto talvez como linguagens publicadas; o maior valor do software sob medida vem do controle total do CORE. Se um framework restringe mais que fornecer abstrações e liberar do genérico: (1) perde-se um ativo, recue de frameworks restritivos no CORE; (2) a área não é tão central, redesenhe o CORE; (3) não há necessidades especiais no CORE, considere comprar software e integrar [p.352-353]
Citações curtas de prova:
- "Boil the model down. Find the CORE DOMAIN" [p.351]
- "No shortcuts. No magic bullets." [p.353]
O que este trecho NÃO diz: não dá método passo a passo para descobrir o CORE além de exemplos, do ponto de vista e do vision statement; sem a terminologia "supporting subdomain" no texto deste bloco (usa "supporting" em sentido geral).
Relevância: domain-driven-design: ALTA, definição e quatro implicações práticas (talento, recrutamento, comprar/construir, priorização de refatoração); clean-architecture-expert: BAIXA; architecture-hard-parts-expert: MÉDIA, argumento build vs buy baseado em valor diferenciador e risco de investir no genérico.
Decisão sugerida: usar em domain-driven-design (reference destilacao-do-dominio.md); trecho build-vs-buy opcionalmente em architecture-hard-parts-expert.

### An Escalation of Distillations (PDF p.354)
Resumo: Os padrões de destilação podem ser aplicados em qualquer ordem, mas se ordenam por quanto alteram o design.
Conceitos e regras (da menos para a mais invasiva):
- DOMAIN VISION STATEMENT: comunica conceitos e valor com investimento mínimo [p.354]
- HIGHLIGHTED CORE: melhora comunicação e decisão com pouca ou nenhuma modificação do design [p.354]
- GENERIC SUBDOMAINS e COHESIVE MECHANISMS: refatoração e reempacotamento mais agressivos; liberam o CORE [p.354]
- SEGREGATED CORE: reempacota para tornar o CORE visível no código [p.354]
- ABSTRACT CORE: o mais ambicioso, exige reorganização extensa do modelo (descrito fora deste bloco) [p.354]
O que este trecho NÃO diz: o ABSTRACT CORE não é detalhado neste bloco.
Relevância: domain-driven-design: ALTA, escala de investimento (de baixo para alto custo) é um roteiro prático; clean-architecture-expert: NENHUMA; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (destilação do domínio, tabela por nível de investimento).

### Generic Subdomains (PDF p.355-360)
Resumo: Subdomínios coesos que não são o motivo do projeto devem ser modelados genericamente, em módulos separados, sem traço de especialidades, com menor prioridade e outras opções de aquisição.
Conceitos e regras:
- Exemplos de genéricos: organograma (qualquer empresa), contabilidade geral (recebíveis, livro de despesas), datas e fusos horários (dois projetos usaram melhores devs por semanas nisso) [p.355]
- Regra: identificar subdomínios coesos que não são a motivação do projeto; fatorar modelos genéricos em MODULES separados e "não deixar traço de suas especialidades neles"; prioridade menor que o CORE; evitar alocar desenvolvedores do núcleo (pouco conhecimento de domínio ganho); considerar soluções de prateleira ou modelos publicados [p.355]
- Opção 1, solução de prateleira: vantagens (menos código, manutenção externalizada, maior maturidade); desvantagens (tempo de avaliação, qualidade incerta, superdimensionamento, elementos estrangeiros dificilmente se integram e podem ser outro contexto, dependências de plataforma/compilador). Sucessos: workflow externo com API hooks e pacote de log de erros. Quanto mais genérico e destilado, maior a chance de servir [p.355-356]
- Opção 2, design/modelo publicado: vantagens (maduro, reflete vários insights, documentação instantânea); desvantagem (pode não servir ou ser exagerado). Fontes citadas: Analysis Patterns (Fowler 1996); formalismos rigorosos como contabilidade e física. Não é preciso implementar tudo, apenas um subconjunto consistente [p.356-357]
- Opção 3, implementação terceirizada: vantagens (libera o time core, cresce sem aumentar o time permanentemente, força desenho orientado a interface e mantém o subdomínio genérico); desvantagens (ainda exige tempo do time core para interface e padrões, overhead de reinternalizar o código, qualidade variável). Testes unitários do contratado e testes de aceitação especificados ou escritos pelo contratante dão qualidade e facilitam a reintegração; combina bem com modelo publicado [p.357]
- Opção 4, implementação interna: vantagens (integração fácil, só o necessário, contratados temporários); desvantagens (manutenção e treinamento contínuos, custo subestimado) [p.357-358]
- Genéricos são o lugar para experiência de design externa e confidencialidade importa menos, e reduzem a carga de treinamento de quem não vai aprofundar o domínio [p.358]
- Exemplo "A Tale of Two Time Zones": no projeto de agendamento de carga marítima, o core já estava maduro, os requisitos eram claros e fuso era crítico; sem solução de prateleira, um programador temporário adaptou o banco de fusos do BSD Unix e escreveu rotina de importação. No projeto de seguradora, desenvolvedores de longo prazo projetaram a priori um modelo geral de fusos sem requisitos claros nem aplicação que o usasse, o que nunca foi comprovado, e o core ficou negligenciado; bastaria guardar hora local com fuso (dados da América do Norte, dados de referência). Ambos acertaram em segregar o modelo genérico do core; modelo específico de fusos de shipping/seguro acoplaria o core a detalhes irrelevantes e o módulo de fusos à necessidade de entender o core [p.358-360]
- "Generic Doesn't Mean Reusable": não se preocupar com reutilização do código; modelo reutilizado (publicado) vale mais; implementar só a parte necessária, mas ser estrito em ficar dentro do conceito genérico. Custos de misturar elementos do setor: dificulta evolução futura; esses conceitos pertencem ao CORE ou a subdomínios mais especializados e mais valiosos [p.360]
- "Project Risk Management": começar um sistema ponta a ponta com um subdomínio genérico periférico (mais fácil de analisar) derrota a gestão de risco; risco de modelagem de domínio é facilmente subestimado (complexidade imprevista, falta de acesso a especialistas, lacunas de habilidades); salvo equipe provada e domínio familiar, o primeiro corte deve se basear em parte do CORE, por mais simples [p.360-361]
Citações curtas de prova:
- "Leave no trace of your specialties in them." [p.355]
- "the first-cut system should be based on some part of the CORE DOMAIN, however simple" [p.360]
- "you should specifically not concern yourself with the reusability of that code" [p.360]
O que este trecho NÃO diz: não usa o termo "supporting subdomain" como categoria própria; só core, generic (e "supporting" de modo geral). Não detalha dimensionamento de pessoas nem como medir o "valor" do core.
Relevância: domain-driven-design: ALTA, as quatro opções de aquisição com vantagens/desvantagens e o caso dos dois fusos são de grande valor didático; clean-architecture-expert: BAIXA; architecture-hard-parts-expert: MÉDIA, build vs buy/outsource como trade-off com prós e contras explícitos e risco de começar pelo genérico.
Decisão sugerida: usar em domain-driven-design (destilação do domínio: tabela das 4 opções e exemplo dos fusos); build-vs-buy opcional em architecture-hard-parts-expert.

### Domain Vision Statement (PDF p.362-363)
Resumo: Documento curto (cerca de uma página) que descreve o CORE DOMAIN e seu valor, escrito cedo e revisado, para orientar alocação de recursos, escolhas de modelagem e educação do time.
Conceitos e regras:
- Motivação: no início o modelo nem existe; depois é preciso explicar valor sem estudo profundo do modelo; aspectos críticos podem se espalhar por vários Bounded Contexts que, por definição, não mostram um foco comum [p.362]
- Diferente do vision statement gerencial que é abandonado após o financiamento: foca na natureza do modelo de domínio e seu valor para a empresa; mostra como o modelo equilibra interesses diversos [p.362]
- Regra: descrever o CORE DOMAIN e a proposta de valor em cerca de uma página; ignorar o que não distingue este modelo de outros; mostrar como serve a interesses diversos; manter estreito; escrever cedo e revisar [p.362]
- Pode ser compartilhado com não técnicos, gerência e clientes (exceto informação proprietária) [p.362]
- Exemplos do que entra e do que não entra: no Airline Booking System entram prioridades de passageiro, estratégias de reserva balanceadas por políticas, modelo de passageiro refletindo o relacionamento com clientes recorrentes, papéis de usuários, busca eficiente de rota/assento e integração com outros sistemas de reservas; ficam fora UI enxuta, XML para acesso, cache de logo, confirmação visual em 5 segundos e framework de segurança. Em automação de fábrica de semicondutores entra representar o estado de materiais e equipamento para trilha de auditoria e roteamento automatizado, excluindo recursos humanos, com download de receitas e estado compreensível para gerentes; ficam fora servlet web, tecnologias padrão e servidor dedicado [p.363]
- Falta ponte entre a declaração de alto nível e o detalhe de código/modelo [p.363]
Citações curtas de prova:
- "Write a short description (about one page) of the CORE DOMAIN and the value it will bring" [p.362]
O que este trecho NÃO diz: o exemplo do shipping (vision statement real) só aparece no final do bloco, no exemplo do SEGREGATED CORE. Não há template formal.
Relevância: domain-driven-design: ALTA, exemplos contrastando "faz parte" vs "importante mas não faz parte" são ótimos para exemplo trabalhado; clean-architecture-expert: NENHUMA; architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar em domain-driven-design (destilação do domínio, com exemplo curto de vision statement).

### Highlighted Core (PDF p.365-367)
Resumo: Quando só o vision statement não basta e a separação física do CORE não é viável, tornar o CORE fácil de ver por meios leves: documento de destilação (3-7 páginas esparsas) ou marcação dos elementos do CORE no repositório do modelo.
Conceitos e regras:
- Cada pessoa interpreta o CORE de forma diferente, até a mesma pessoa de um dia para outro; filtrar mentalmente consome concentração [p.365]
- Marcar o CORE é reflexo sobre o modelo, não parte dele; qualquer técnica que torne fácil saber o que é CORE serve [p.365]
- Documento de destilação: lista dos objetos conceituais essenciais, diagramas focados nos relacionamentos críticos, percursos de interações fundamentais; não é documento de design completo, é ponto de entrada mínimo que delineia o CORE e sugere onde olhar. Regra: 3 a 7 páginas esparsas descrevendo o CORE e as interações principais [p.365-366]
- Riscos: não ser mantido, não ser lido, multiplicar fontes de informação. Mitigação: minimalismo absoluto, foco em abstrações centrais e interações (envelhecem mais devagar), escrito para ser entendido por não técnicos [p.366]
- CORE sinalizado (Flagged Core): marcar elementos do CORE no repositório primário do modelo, sem tentar explicar seu papel; no caso contado (modelo de domínio de 200 páginas comprado de consórcio, em seguradora), em vez de refatorar (a gerência veneraria o documento) o autor, com um analista de negócio, marcou as seções essenciais, criou uma navegação do modelo mostrando o CORE e seu relacionamento com o apoio, e um protótipo simples demonstrou funcionalidades. Em UML dá para usar estereótipo; só com código, comentários (Javadoc) ou ferramenta do ambiente [p.366-367]
- Documento de destilação como ferramenta de processo (XP): mudanças que obrigam a atualizar o documento sinalizam alteração relevante do CORE (elementos, relacionamentos ou fronteira) e exigem consulta e comunicação com todo o time e nova versão do documento; mudanças fora do CORE ou de detalhes ausentes do documento podem ser integradas sem consulta [p.367]
Citações curtas de prova:
- "Make it effortless for a developer to know what is in or out of the CORE." [p.367]
- "Two pounds of recyclable paper was turned into a business asset by a few page tabs and some yellow highlighter." [p.367]
O que este trecho NÃO diz: não dá formato do documento além de tamanho e conteúdo; a página 364 está vazia (só cabeçalho).
Relevância: domain-driven-design: ALTA, técnica pronta (distillation document + core flagging + uso como gatilho de consulta); clean-architecture-expert: NENHUMA; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (destilação do domínio).

### Cohesive Mechanisms (PDF p.369-371)
Resumo: Quando a complexidade computacional inflaciona o design e o "como" encobre o "o quê", extrair a parte conceitualmente coesa do mecanismo para um framework leve com interface reveladora de intenção. Inclui exemplo do organograma como grafo e o retorno posterior ao design integrado.
Conceitos e regras:
- Sintoma: grande número de métodos algorítmicos obscurece os métodos que expressam o problema; é indício de problema no modelo; primeiro buscar um modelo que simplifique o cálculo; às vezes parte do mecanismo é coerente em si. Não é uma "calculadora" genérica que aceita tudo [p.369]
- Regra: separar um mecanismo conceitualmente coesivo em framework leve separado, atentar a formalismos e categorias de algoritmos documentados; expor com INTENTION-REVEALING INTERFACE; os demais elementos do domínio expressam o problema (o quê) e delegam a solução (o como); deixa o CORE menor, mais declarativo [p.369]
- Reconhecer algoritmo/formalismo padrão leva a conceitos estudados, confiança e menos tentativa e erro; mais fácil encontrar do que modelos publicados para subdomínios; senão criar algo estreito, focado na computação, sem misturar o modelo expressivo. Divisão de responsabilidades: o modelo formula o fato/regra/problema, o mecanismo resolve [p.369]
- Exemplo organograma: perguntas "quem na cadeia de comando pode aprovar isto?" levaram ao formalismo de grafo; subcontratado implementou framework de travessia de grafo com terminologia padrão e subconjunto necessário, interface reveladora de intenção; o modelo de organização passou a declarar pessoas como nós e relações como arestas. Sem separar: modelo acoplado a um método de solução e muito mais complicado; separado: estilo declarativo, código de grafo isolado e testável [p.369-370]
- Outro exemplo: framework para construir SPECIFICATION objects com comparação e combinação, usado pelo CORE e subdomínios genéricos [p.370]
- Generic Subdomain vs. Cohesive Mechanism: o subdomínio genérico é um modelo expressivo de um aspecto do domínio (só menos central); o mecanismo não representa o domínio, resolve um problema computacional posto pelos modelos. "Um modelo propõe, um mecanismo dispõe." Na prática a distinção não é pura no início; refatorações sucessivas levam a mecanismo mais puro ou a subdomínio genérico com conceitos novos [p.370]
- Quando um mecanismo é parte do CORE: quando é proprietário e central ao valor (ex.: algoritmo de agendamento de logística, algoritmos de risco de um banco de investimento, tão restritos que nem todos os desenvolvedores do CORE os viam). Aprofundamento posterior depende de custo-benefício (dificuldade do novo design, dificuldade do atual, ganho para o tipo de pessoa, e se há ideia de que forma o modelo teria) [p.370-371]
- Exemplo "Full Circle": um ano depois, outros desenvolvedores reabsorveram o mecanismo no organograma (comportamento de nó na superclasse das entidades organizacionais, mecanismo encapsulado dentro delas), por considerarem a separação cara (mais objetos, pacote extra), mantendo a interface pública declarativa. Os círculos completos não voltam ao ponto de partida: costumam deixar modelo mais profundo [p.371]
- Destilando para estilo declarativo: mecanismos são mais úteis com interface reveladora de intenção, asserções e funções sem efeito colateral; recompensa excepcional quando parte do CORE alcança modelo profundo e design flexível e o código cliente fica declarativo, "como palavras viram frases" [p.371]
Citações curtas de prova:
- "A model proposes; a COHESIVE MECHANISM disposes." [p.370]
O que este trecho NÃO diz: a seção Cohesive Mechanisms do cap. 10 (Specification, Intention-Revealing Interfaces) é só referenciada; não explica o padrão Strategy ou injeção de dependência.
Relevância: domain-driven-design: ALTA, diferença Generic Subdomain x Cohesive Mechanism e o exemplo "volta ao início" com aprendizado de pragmatismo; clean-architecture-expert: MÉDIA, separação "o quê" vs "como" e isolamento de algoritmo em módulo testável; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (destilação do domínio, com o exemplo do organograma/grafo); referência cruzada opcional em clean-architecture-expert.

### Segregated Core (PDF p.373-375) [continua no próximo bloco (a Figura 15.3 e o restante do exemplo seguem após a p.375)]
Resumo: Refatorar para separar os conceitos do CORE de elementos de apoio (inclusive os mal definidos), em módulos próprios, mesmo quebrando agrupamentos coesos existentes. Custos e decisão de equipe discutidos; exemplo de transporte de carga começa pelo vision statement.
Conceitos e regras:
- Problema: elementos parcialmente CORE, parcialmente apoio; CORE acoplado a genéricos; coesão do CORE fraca ou invisível [p.373]
- Regra: refatorar o modelo para separar conceitos do CORE de jogadores de apoio (inclusive mal definidos), reforçar a coesão do CORE e reduzir o acoplamento com outro código; fatorar tudo o que é genérico ou de apoio para outros objetos e pacotes, mesmo separando elementos muito acoplados [p.373]
- É o mesmo princípio dos GENERIC SUBDOMAINS pelo outro lado; o resíduo pode ficar onde estava ou ser agrupado por classes proeminentes, e aos poucos virar genéricos [p.373]
- Passos: (1) identificar subdomínio CORE (talvez do documento de destilação); (2) mover classes relacionadas para um novo MODULE nomeado pelo conceito; (3) refatorar para cortar dados e funcionalidade que não expressam diretamente o conceito, movendo para outras classes/pacotes sem perfeccionismo e tornando explícitas as referências do CORE para fora; (4) simplificar e tornar comunicativas as relações do módulo e minimizar relacionamentos com outros (objetivo contínuo); (5) repetir com outro subdomínio CORE até completar [p.373-374]
- Custos: relações com classes não-CORE fortemente acopladas podem ficar mais obscuras ou complicadas; um módulo coeso pode ser quebrado para evidenciar a coesão do CORE, ganho líquido porque o maior valor agregado vem dos aspectos específicos da empresa; muito trabalho; pode absorver desenvolvedores em mudanças por todo o sistema [p.374]
- Quando fazer: Bounded Context grande e crítico em que a parte essencial está obscurecida por muita capacidade de apoio [p.374]
- Decisão de equipe evolutiva: o time inteiro precisa migrar junto e usar a mesma definição de CORE, sem congelá-la; novos insights são compartilhados continuamente, mas nenhuma pessoa ou dupla age unilateralmente; processo de decisão (consenso ou diretiva do líder) tem de ser ágil [p.374]
- Exemplo "Cargo Shipping": o modelo básico está simplificado (a Fig. 15.2 não está em texto); para achar a essência, começar do "resultado final" (preços e faturas) seria tentador, mas deve-se consultar o vision statement (trecho citado: aumentar visibilidade de operações e dar ferramentas para atender requisitos do cliente de modo mais rápido e confiável). App para operadores de linha de frente, não vendas, então questões de dinheiro ficam em papel de apoio (pacote Billing já existente); o foco é manuseio da carga e entrega conforme os requisitos do cliente; classes diretamente envolvidas são extraídas para um novo pacote Delivery (Fig. 15.3) [p.374-375]
Citações curtas de prova:
- "Refactor the model to separate the CORE concepts from supporting players" [p.373]
- "The challenge is to constrain everyone to use the same definition of the CORE while not freezing that decision." [p.374]
O que este trecho NÃO diz: o bloco termina antes da conclusão do exemplo (Figura 15.3 só tem legenda); o texto não discute ABSTRACT CORE (apenas citado), nem ferramentas de enforcement de dependências entre módulos.
Relevância: domain-driven-design: ALTA, receita de 5 passos + custos + quando aplicar + exemplo que usa o vision statement para escolher o core; clean-architecture-expert: MÉDIA, módulo de core com dependências explícitas e poucas se alinha à separação de núcleo e detalhes; architecture-hard-parts-expert: BAIXA.
Decisão sugerida: usar em domain-driven-design (destilação do domínio, nível "Segregated Core" com receita e exemplo); concluir o exemplo com o próximo bloco.

---

## Onde o livro vai além de listas curtas (para a skill atual, rasa em exemplos)
- Context Map: o livro adiciona critérios operacionais (3 variáveis: controle, cooperação, integração), "dragão no mapa", regra de não mudar o mapa antes da realidade, nomes de contextos na linguagem ubíqua e uma frase-modelo de comunicação [p.304-312].
- Exemplo trabalhado completo Booking vs Network Traversal: duas traduções mínimas (não é preciso mapear tudo), ambiguidade na tradução reversa, um tradutor mantido pelos dois times e testes de fronteira [p.306-310].
- Anticorruption Layer: estrutura Services + Adapter + Translator + Facade, onde ficam facade/adapter/transporte, versão bidirecional, quando dispensar a facade, funções extras (auditoria, trace), ACL entre sistemas próprios e custo (Grande Muralha) [p.322-326].
- Conformist com fundamentos: quando seguir é melhor que traduzir; diferença para Shared Kernel pelo processo de decisão, não pela estrutura [p.320].
- Condições de sucesso de Customer/Supplier (mesmo chefe, testes de aceitação do cliente na suíte do fornecedor) e o anti-padrão "primo pobre" [p.316-318].
- Roteiros passo a passo: Separate Ways -> Shared Kernel (7 passos), Shared Kernel -> CI (6 passos), descomissionamento de legado (6 passos por iteração) e Open Host -> Published Language (7 passos) [p.343-346].
- Destilação: escala de investimento (vision statement -> highlighted core -> genéricos/mecanismos -> segregated core -> abstract core), 4 opções de aquisição de genéricos com prós/contras, caso dos fusos horários, "Generic Doesn't Mean Reusable", risco de começar pelo genérico, quem trabalha no core e por que comprar o core é raro [p.350-361].

## Sugestão de mapeamento para o artefato (1) domain-driven-design v1.1
- references/camada-anticorrupcao.md: p.322-326 (+ testes de fronteira p.310; legado p.325).
- references/destilacao-do-dominio.md: p.348-361, 362-367, 369-371, 373-375 (escala, core, genéricos, vision statement, highlighted core, mecanismos, segregated core).
- references/context-mapping.md: p.301-312 (splinters, CI, mapa) e relações p.313-331, estratégia p.337-342.
- references/ddd-com-legado.md: p.338-339 (externos), p.345-346 (descomissionamento), p.341-342 (projeto em andamento), p.322-326.
- Exemplo trabalhado: Booking/Network Traversal (p.306-310), time zones (p.358-360), organograma/grafo (p.369-371), Yield Analysis x Booking (p.316-318).
- Agregados, repositórios e fábricas: NÃO tratados neste bloco (cap. 5-6, em outro bloco).

## Checklist de cobertura
- Primeira página lida: 301
- Última página lida: 375 (confirmado por grep: último marcador "=== PDF PAGINA 375 ===" na linha 2896; arquivo tem 2920 linhas, todas lidas)
- Páginas sem texto útil ou ilegíveis: p.364 (somente cabeçalho "Team LiB"); p.368 (idem); figuras 14.2-14.13, 15.1-15.3 aparecem só como legendas (sem conteúdo)
- Problemas de extração observados: texto em inglês; setas "->" (transformações) perdidas, aparecem como espaço (títulos "SEPARATE WAYS SHARED KERNEL" etc. e traduções Route Specification List of location codes); tabelas e dois blocos (p.363, p.359) com colunas misturadas; código de exemplo com "]" extra (p.309) e texto "5." duplicado na quebra de página (p.343-344, 373-374); espaço faltando em palavras ("situaions", "Infact", "in-dependent"); trecho CML omitido por ser dado
- Capítulos/seções cobertos integralmente: Continuous Integration; Context Map (com exemplo e subseções de testes e documentação); intro e todas as relações do cap. 14 (Shared Kernel, Customer/Supplier, Conformist, ACL, Separate Ways, Open Host Service, Published Language); Unifying an Elephant; Choosing Your Model Context Strategy; Transformations; Core Domain; An Escalation of Distillations; Generic Subdomains; Domain Vision Statement; Highlighted Core; Cohesive Mechanisms
- Capítulos/seções que continuam em outro bloco: início da seção "Recognizing Splinters" (começa no bloco anterior); Segregated Core (exemplo de carga marítima continua após p.375: Figura 15.3 e demais); Abstract Core e Large-Scale Structure do cap. 16 em blocos seguintes
