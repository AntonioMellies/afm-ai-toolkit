# Notas: Evans, Domain-Driven Design (edição em português), bloco 04, PDF p.226-300

Observação geral: o texto do bloco está em INGLÊS (padrão em maiúsculas para nomes de padrões: SIDE-EFFECT-FREE FUNCTIONS, BOUNDED CONTEXT etc.), apesar de o livro ser descrito como edição em português. Nenhum número de página impresso é visível (só "[ Team LiB ]" e marcadores PDF). Figuras (UML) não foram extraídas; só legendas e código. Todas as páginas citadas abaixo são "PDF PAGINA N".

Artefatos candidatos: (1) domain-driven-design v1.1 (references/); (2) clean-architecture-expert; (3) architecture-hard-parts-expert.

---

### Cap. 10 (continuação): Supple Design. Side-Effect-Free Functions, exemplo Paint Mixing (PDF p.226-229) [continua do bloco anterior]
Resumo: Fecha o padrão SIDE-EFFECT-FREE FUNCTIONS e mostra a refatoração do exemplo de mistura de tintas: o cálculo de cor sai da classe Paint (ENTITY mutável) e vai para um VALUE OBJECT imutável (PigmentColor) cujo método devolve um novo objeto.
Conceitos e regras:
- Regra: colocar o máximo de lógica em funções sem efeito colateral observável; segregar comandos (que modificam estado) em operações bem simples que não devolvem informação de domínio; mover lógica complexa para VALUE OBJECTS quando houver conceito que caiba [p.226]
- Funções sem efeito colateral em VALUE OBJECTS imutáveis permitem combinar operações com segurança; com INTENTION-REVEALING INTERFACE o desenvolvedor usa sem entender a implementação [p.226]
- Paint é ENTITY (tem história); uma cor de pigmento é VALUE OBJECT: misturar gera nova PigmentColor, não altera a existente [p.227]
- Insight de linguagem: a cor de tinta mistura diferente da cor RGB de luz, então o nome precisa refletir ("Pigment Color", não "Color") [p.227]
- Ao extrair o dado (cor), o comportamento relacionado deve ir junto (mixedWith) [p.227-228]
- Resultado: o código de modificação em Paint fica mínimo; PigmentColor é fácil de testar e de compor [p.229]
Citações curtas de prova:
- "Strictly segregate commands (methods that result in modifications to observable state) into very simple operations" [p.226]
O que este trecho NÃO diz: não é CQRS (nível de classe/método, não de arquitetura); não trata de concorrência nem de persistência.
Relevância: domain-driven-design: ALTA (exemplo trabalhado concreto de VALUE OBJECT com função pura); clean-architecture-expert: MÉDIA (funções puras no núcleo, testabilidade); architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar em domain-driven-design/references (exemplo trabalhado, tático: VO + função sem efeito colateral). Paráfrase do exemplo, não copiar código.

### Assertions (PDF p.230-233)
Resumo: Mesmo com funções puras restam comandos com efeitos colaterais. ASSERTIONS (pós-condições, pré-condições, invariantes de classe e de AGREGADO), no espírito de "design by contract", tornam efeitos explícitos sem exigir leitura da implementação.
Conceitos e regras:
- Problema: com muita delegação, os efeitos são definidos só pela implementação; o único jeito de entender é rastrear a execução, o que destrói encapsulamento e abstração. Subclasses da mesma interface podem ter efeitos diferentes [p.230]
- Pós-condições descrevem o efeito/resultado garantido; pré-condições são a "letra miúda" para a garantia valer; invariantes de classe valem ao fim de qualquer operação; invariantes também podem ser declaradas para AGREGADOS inteiros, definindo regras de integridade com rigor [p.230]
- Asserções descrevem estado, não procedimento, logo são mais fáceis de analisar e de testar [p.230-231]
- Regra: declarar pós-condições de operações e invariantes de classes e AGREGADOS; se a linguagem não suporta, escrever testes unitários automatizados; ou documentar/diagramar conforme o estilo do projeto [p.230]
- Teste: setup coloca as pré-condições; após executar, verifica as pós-condições [p.231]
- Modelos devem fazer sentido para humanos (que interpolam e extrapolam conceitos), não só ser consistentes logicamente [p.231]
- Exemplo Paint (cont.): pós-condição "p1.volume aumenta; p2.volume inalterado" é contraintuitiva; zerar p2 violaria o requisito real (listar as tintas não misturadas ao final). A estranheza sinaliza conceito ausente. Solução: separar StockPaint e MixedPaint; MixedPaint tem um único comando (mixIn, que apenas adiciona a uma coleção) e o resto são funções puras (volume e cor recalculados); cor pode ser recomputada sempre por ser função pura de VO [p.231-232]
- Invariante do modelo novo: volume total não muda pela mistura (senso comum) [p.231-233]
Citações curtas de prova:
- "If you trust the guarantee of a post-condition, you don't have to worry about how a method works." [p.230]
- "Seek models with coherent sets of concepts" (trecho da regra, parafraseado: busque modelos coerentes que permitam inferir as asserções) [p.230]
O que este trecho NÃO diz: não prescreve ferramenta de contratos; fala de Meyer 1988 apenas como referência; não trata validação de entrada de UI.
Relevância: domain-driven-design: ALTA (invariantes de AGREGADO como asserções; testes como forma de expressá-las; exemplo em que a dificuldade de enunciar pós-condição revela conceito faltante); clean-architecture-expert: MÉDIA (invariantes no domínio, testes de caracterização); architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar em domain-driven-design/references (agregados/invariantes + exemplo trabalhado).

### Conceptual Contours (PDF p.234-238)
Resumo: Como decidir o grão (granularidade) das unidades? Não há receita; alinhar a decomposição aos "contornos conceituais" do domínio, observados pelos eixos de mudança e estabilidade ao longo de refatorações sucessivas.
Conceitos e regras:
- Problemas dos dois extremos: monolito embute funcionalidade (duplicação, interface não diz tudo, conceitos misturados); granularidade excessiva complica o cliente e pode perder o conceito (metade de um átomo de urânio não é urânio) [p.234]
- Coesão alta e acoplamento baixo valem em todas as escalas (método, classe, MÓDULO, estrutura de larga escala), mas devem ser temperados pela intuição do domínio: "isto é expediente do código atual ou eco de um contorno do domínio?" [p.234]
- Unidade conceitualmente significativa: se "somar" tem sentido no domínio, implemente nesse nível; cada objeto deve ser um "WHOLE VALUE" (Ward Cunningham) [p.234]
- Agrupar o que não precisa ser dissecado: usuários do app de tintas combinam tintas completas, não pigmentos soltos; um químico de tintas exigiria outro modelo [p.234-235]
- Regra: decompor operações, interfaces, classes e AGREGADOS em unidades coesas; observar eixos de mudança/estabilidade; alinhar o modelo aos aspectos consistentes do domínio [p.235]
- Resultado típico de refatoração, difícil de obter de saída; emerge de refatoração rumo a insight do domínio, não de refatoração puramente técnica [p.235]
- Indicador de ajuste do modelo: refatorações sucessivas ficam localizadas; requisito que força mudança extensa na decomposição é sinal de entendimento do domínio a refinar [p.235]
- Exemplo (accruals de empréstimo): schedules viraram hierarquia de classes (por tipo de taxa/juros) e pagamentos de taxa e juros foram unificados numa classe Payment. Mudança previsível (novo schedule) ficou fácil; mudança imprevista (regras de pagamento adiantado/atrasado, iguais para juros e taxas) encaixou sem duplicar. A facilidade veio do alinhamento ao domínio, não de antecipação nem de versatilidade genérica [p.235-238]
Citações curtas de prova:
- "Half of a uranium atom is not uranium." [p.234]
- "it isn't just grain size that counts, but just where the grain runs." [p.234]
O que este trecho NÃO diz: não dá critério numérico de tamanho; não relaciona contornos a microsserviços (nenhuma menção a serviços distribuídos).
Relevância: domain-driven-design: ALTA (critério para granularidade de agregados/objetos, sinal de "bom ajuste"); clean-architecture-expert: MÉDIA (coesão por conceito, não por camada técnica); architecture-hard-parts-expert: BAIXA (conceito paralelo a granularidade, mas aqui é de objetos; qualquer ligação a serviços seria inferência [fora do livro]).
Decisão sugerida: usar em domain-driven-design/references (modelagem tática, granularidade) e, de leve, em exemplo trabalhado.

### Standalone Classes (PDF p.239-240)
Resumo: Dependências (associações, tipos de argumentos, retornos) pesam no entendimento; conceitos implícitos pesam tanto quanto referências explícitas. Meta: eliminar dependências não essenciais, chegando a zero onde possível.
Conceitos e regras:
- Cada associação, tipo de argumento e retorno é dependência; o custo "explode" com a quantidade [p.239]
- MÓDULOS e AGREGADOS servem para limitar a teia de interdependências, mas mesmo dentro de um MÓDULO é preciso controle quase "fanático" [p.239]
- Primitivos e bibliotecas básicas não contam como carga; conceitos que eles representam, sim (três ints de cor escondiam o conceito Pigment Color; extraí-lo não aumentou dependências, só as explicitou) [p.239]
- "Toda dependência é suspeita até provar ser básica ao conceito" [p.239, paráfrase]
- Dependências dentro do mesmo módulo são menos danosas que fora; pares naturalmente acoplados podem ter várias operações que esclarecem a relação; o objetivo é eliminar as não essenciais [p.240]
- Fatorar as computações mais intrincadas em classes autônomas, por exemplo VALUE OBJECTS mantidos pelas classes mais conectadas [p.240]
- Eliminar dependências não significa empobrecer o modelo reduzindo tudo a primitivos [p.240]
Citações curtas de prova:
- "Every dependency is suspect until proven basic to the concept behind the object." [p.239]
O que este trecho NÃO diz: não menciona injeção de dependência nem inversão de dependência; "dependência" aqui é conceitual (associações/tipos), não de pacotes.
Relevância: domain-driven-design: ALTA (VO como classe autônoma, carga cognitiva); clean-architecture-expert: MÉDIA (acoplamento mínimo do núcleo; conceito afim, sem citar Dependency Rule); architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar em domain-driven-design/references (tático) e citar como evidência em clean-architecture-expert (acoplamento conceitual) com cuidado de neutralidade.

### Closure of Operations (PDF p.241-242)
Resumo: Definir, quando couber, operações cujo tipo de retorno é o mesmo dos argumentos (e do implementador), reduzindo dependências sem perder interface rica; típico de VALUE OBJECTS.
Conceitos e regras:
- Regra: operação com retorno do mesmo tipo do(s) argumento(s); se o objeto tem estado usado no cálculo, ele conta como argumento [p.241]
- Mais comum em VALUE OBJECTS; ENTITIES raramente resultam de cálculo (exceção: "supervisor" de Employee devolve Employee) [p.241]
- Pode ser fechada sobre um tipo abstrato [p.241]
- Fechamento parcial (argumento igual ao receptor, retorno diferente, ou vice-versa) ainda ajuda se o tipo extra é primitivo/da biblioteca [p.241-242]
- Exemplo "select" do Smalltalk (retorna coleção do mesmo tipo, argumento é bloco) vs. Iterator em Java: operações encadeáveis como filtros, sem conceito extra [p.242]
- Padrão exige habilidade de design avançada; um punhado de desenvolvedores confusos pode inviabilizar o MODEL-DRIVEN DESIGN [p.242]
Citações curtas de prova:
- "A closed operation provides a high-level interface without introducing any dependency on other concepts." [p.241]
O que este trecho NÃO diz: não trata de programação funcional moderna (menciona Smalltalk/Java/XSLT); não afirma que toda operação deva ser fechada ("where it fits").
Relevância: domain-driven-design: MÉDIA-ALTA (catálogo de padrões de design supple: precisa estar na skill); clean-architecture-expert: BAIXA; architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar em domain-driven-design/references (tático, VO).

### Declarative Design e Domain-Specific Languages (PDF p.244-246)
Resumo: Design declarativo (especificação executável, geração de código, regras) promete rigor mas costuma falhar na prática; o valor está em frameworks estreitos que automatizam partes tediosas e em estilo supple que se aproxima do declarativo.
Conceitos e regras:
- Motivação: asserções não são garantia em código escrito à mão; muito boilerplate obscurece o modelo [p.244]
- Armadilhas citadas: linguagem de declaração pouco expressiva + framework que dificulta extensão; geração de código que mistura gerado e manuscrito, tornando regeneração destrutiva; o resultado frequente é "emburrecer" modelo e aplicação [p.244]
- Motores de regras: "control predicates" para performance introduzem efeitos colaterais; reordenar regras pode quebrar resultados [p.244]
- Abordagens declarativas são corrompidas quando desenvolvedores as contornam (sistema difícil/restritivo demais) [p.244]
- Maior valor visto: framework estreito que automatiza algo tedioso e propenso a erro (persistência, mapeamento objeto-relacional) deixando liberdade total de design [p.244]
- DSL: máxima conexão com a UBIQUITOUS LANGUAGE, mas exige que o desenvolvedor altere gramática e bibliotecas; avaliar habilidades atuais e futuras da equipe; perde a unidade de linguagem única; difícil refatorar código cliente quando o modelo muda [p.245]
- Pode ser mais útil em modelos muito maduros, com código cliente de outra equipe; risco de dividir em construtores de framework "técnicos" e construtores de aplicação "sem habilidade técnica" [p.245]
- Um design com INTENTION-REVEALING INTERFACES, funções sem efeito colateral e asserções já está "à beira" do declarativo [p.246]
Citações curtas de prova:
- "the dumbing-down of the model and application" (consequência de frameworks declarativos limitantes) [p.244]
O que este trecho NÃO diz: não trata de DSLs internas/fluentes modernas nem de low-code; dá exemplo de Scheme apenas como curiosidade (o texto repete o parágrafo do Scheme duas vezes, erro de extração/edição).
Relevância: domain-driven-design: BAIXA-MÉDIA (aviso útil sobre MDD tooling/geração de código); clean-architecture-expert: BAIXA (mencionar persistência/ORM como automação "estreita" aceitável); architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar apenas em nota breve em domain-driven-design/references (limites do design declarativo); descartar o restante.

### Extending Specifications in a Declarative Style (PDF p.246-253)
Resumo: Estende SPECIFICATION com combinação lógica (AND, OR, NOT), implementação COMPOSITE, alternativa com baixa contagem de objetos, e SUBSUMPTION (comparar duas specs).
Conceitos e regras:
- SPECIFICATION é um predicado; predicados combinam com AND/OR/NOT; essas operações são fechadas sobre predicados (CLOSURE OF OPERATIONS) [p.246]
- Criar interface/abstração única Specification (isSatisfiedBy) e estender com and/or/not [p.246-247]
- Exemplo do armazém químico: ventilated.and(armored); either = ventilatedType1.or(ventilatedType2); cheap = ventilated.not().and(armored.not()) [p.247]
- Implementação simples: AbstractSpecification + AndSpecification, OrSpecification, NotSpecification (COMPOSITE) [p.248]
- Implementação é livre, o essencial é um modelo fiel ao domínio; "não tenha medo de implementar só o AND" se só ele for necessário; usar o padrão não significa construir recursos não necessários; podem ser adicionados depois [p.249]
- Alternativa: codificar a expressão lógica numa pilha/array interpretada em runtime, com operadores como FLYWEIGHT; vantagens: poucos objetos, memória eficiente; desvantagem: exige desenvolvedores mais sofisticados. Motivo: banco de objetos com overhead por objeto gerou milhões de objetos finos, o que "foi um erro" do autor [p.249-250]
- SUBSUMPTION: operação subsumes(Specification) permite comparar especificações (A subsume B se tudo que satisfaz A satisfaz B); equivale a implicação lógica; caso de uso: listar tipos de químicos cujas regras ficaram mais rigorosas, algo que validar o inventário atual não responde [p.250-251]
- Prova geral de implicação é difícil; casos especiais são fáceis: specs parametrizadas definem sua própria regra (ex.: idade mínima 18 subsume 16) [p.251-252]
- Interface prática: isSatisfiedBy + and + subsumes; só com AND, subsunção é comparar conjuntos de folhas (superconjunto) [p.252]
- Com OR e NOT a prova fica muito mais complicada; escolher: abrir mão de alguns operadores ou da subsunção [p.252]
Citações curtas de prova:
- "Don't be afraid to implement only AND, if that is all you need." [p.249]
- "The same pattern and model can underlie very different implementations." [p.250]
O que este trecho NÃO diz: não trata de Specification como filtro de consulta em repositório (isso é de capítulo anterior, Cap. 9, fora do bloco); o código do livro tem pequenos erros de extração/sintaxe (ex. instanceof).
Relevância: domain-driven-design: ALTA (Specification composta com exemplo, trade-offs de implementação, YAGNI); clean-architecture-expert: BAIXA; architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar em domain-driven-design/references (padrões táticos; exemplo trabalhado: Specification AND/OR/NOT).

### Angles of Attack e Shares Math (PDF p.254-262)
Resumo: Duas estratégias para tornar um design supple (extrair subdomínios; usar formalismos estabelecidos, como matemática/contabilidade) e um exemplo longo de integração dos padrões (distribuição proporcional de pagamentos em empréstimo sindicalizado).
Conceitos e regras:
- Não se torna um sistema enorme supple de uma vez; escolher alvos [p.254]
- Carve Off Subdomains: separar matemática especializada, regras de transição de estado como pequeno modelo/framework declarável; cada passo deixa o resto menor e mais claro; melhor ter grande impacto numa área que espalhar esforço; ligação com Cap. 15 sobre gestão de subdomínios [p.254]
- Draw on Established Formalisms: contabilidade, matemática, lógica de predicados; "Specialized math is clean, combinable by clear rules" (paráfrase) [p.254]
- Exemplo Shares Math, passos [p.254-262]:
  1. Design inicial: Loan com mapa de shares; método que calcula a distribuição e modifica o empréstimo ao mesmo tempo [p.255]
  2. Separar comando de função sem efeito colateral: calculatePrincipalPaymentShares (consulta) e applyPrincipalPaymentShares (comando) [p.256-257]
  3. Granularidade ainda grossa (applyDrawdown, calculateFeePaymentShares só multiplicariam código) [p.257]
  4. Tornar conceito implícito explícito: shares são partes de um todo, regras são de grupos, não de uma share; nasce Share Pie, ENTITY local ao AGREGADO Loan [p.257]
  5. Cascata de insights: Share Pie como VALUE OBJECT imutável (sem increase/decrease); operações fechadas plus/minus; prorated (parcialmente fechada) [p.258-259]
  6. Asserções expressas nos métodos (todo = soma das partes; diferença entre pies = diferença share a share; proporção pro rata) [p.259-260]
  7. Loan reduz a: calculatePrincipalPaymentDistribution = shares.prorated(valor); applyPrincipalPayment = shares.minus(pagamento); drawdown = shares.plus; Facility também usa prorated; desvio do acordo original = real minus (prorated do Facility sobre o valor do Loan) [p.260-261]
- Por que ficou supple: lógica complexa em VOs com funções puras (pode-se usar plus/minus/prorated livremente em cálculos intermediários e análises que antes só existiam na hora da distribuição); comandos simples e caracterizados por asserções; conceitos desacoplados (Share Pie interage fortemente só com Share); formalismo familiar (aritmética) é fácil de aprender e não induz ao erro [p.261-262]
- O design supple destila os métodos centrais de Loan e Facility (liga ao CORE DOMAIN, Cap. 15) [p.262]
Citações curtas de prova:
- "It is more useful to make a big impact on one area, making a part of the design really supple, than to spread your efforts thin." [p.254]
O que este trecho NÃO diz: não aborda arredondamento/dinheiro (usa double no exemplo; o livro não discute precisão aqui); código do exemplo está parcialmente corrompido na extração (símbolos como "–").
Relevância: domain-driven-design: ALTA (melhor exemplo trabalhado do bloco: passos de refatoração com antes/depois, ligação entre VO, agregado e CORE DOMAIN); clean-architecture-expert: MÉDIA (separar cálculo puro de aplicação de efeitos); architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar em domain-driven-design/references como exemplo trabalhado principal (descrever em passos, em paráfrase, sem colar código).

### Cap. 11: Applying Analysis Patterns (PDF p.263-274)
Resumo: Padrões de análise (Fowler) são pontos de partida para modelos, não soluções prontas. Dois exemplos fictícios: modelar juros com Contas/Lançamentos e entender o batch noturno com Posting Rules. Conclusão: usar como conhecimento a explorar, preservando o significado dos termos.
Conceitos e regras:
- Padrões de análise, segundo Fowler: grupos de conceitos que representam construção comum em modelagem de negócio; úteis por trazer experiência de implementação; discuti-los fora do contexto de design abre o "abismo análise/design" antitético ao MODEL-DRIVEN DESIGN [p.263]
- Modelo contábil básico: Account com Entries (lançamentos nunca removidos, saldo é o efeito combinado; pode ser calculado ou em cache, encapsulado); conservação (partida dobrada: todo crédito tem débito) só em sistema fechado [p.265-266]
- Diálogo desenvolvedores-especialista: Transaction não servia (pagamentos podem vir dias depois; ligar um acúmulo a um pagamento era artificial); o termo "accrual" (reconhecer despesa/receita no momento em que ocorre, independentemente do dinheiro mudar de mãos) foi adicionado à linguagem e simplificou o modelo; o especialista queria ver tudo numa Account (accruals, pagamentos, saldo) [p.267-268]
- Refinamentos durante a codificação: Entry especializada em Payment e Accrual (responsabilidades diferentes e conceitos importantes); sem distinção conceitual entre juros e taxas, mas o ORM e o padrão de tabelas legíveis obrigaram subclasses concretas por tabela (compromisso de infraestrutura) [p.268-269]
- Lição: fazer compromissos calculados sem sair do MODEL-DRIVEN DESIGN [p.269]
- Resultado: lógica mais complexa em funções sem efeito colateral; comando restante simples e caracterizado por asserções [p.269]
- Padrões de análise ajudam a achar "pontos cegos": partes do programa (o batch noturno) que parecem código de aplicação mas contêm lógica de domínio [p.269]
- Posting Rules: regra explícita que, disparada por novo Entry numa conta de entrada, calcula e insere Entry numa conta de saída (ex.: imposto estimado de 30% sobre salário); três modos de disparo: eager firing, account-based firing, posting-rule-based firing; incorporar os modos à UBIQUITOUS LANGUAGE é tão importante quanto as classes; cada conjunto de regras precisa de um único ponto de início e responsável por identificar entradas [p.270-271]
- No exemplo: o batch ganha um Posting Service (FACADE para API do sistema contábil legado, apresentado como SERVICE com INTENTION-REVEALING INTERFACE), regra escolhe o ledger com base no tipo (juros/taxa) e na "asset class"; o batch passa a só iterar Assets enviando mensagens e comitando; complexidade vai para a camada de domínio [p.271-272]
- Desvios do livro-fonte: não usaram "Method" (sempre valor integral); Asset (não a Account) acessa as regras via SINGLETON por ser quem conhece a natureza das contas e o ponto de entrada do script; desconforto conceitual registrado, com esperança de refatorar depois [p.272-273]
- Uso de padrões de análise: leads valiosos e vocabulário limpo; raramente "a resposta"; ao usar termo de padrão conhecido, manter o conceito básico, ou renomear se o modelo divergir; a linguagem ubíqua ganha ao incluir termos amplamente entendidos [p.274]
- Padrão de análise não é reuso de código por framework: é um kit de fragmentos de modelo que ilumina decisões críticas e consequências a jusante [p.274]
Citações curtas de prova:
- "an analysis is a kit of model fragments" (paráfrase próxima: modelo/framework é todo funcional, análise é kit de fragmentos) [p.274]
- "Analysis patterns are not technological solutions; they are guides to help you work out a model" (trecho curto) [p.263]
O que este trecho NÃO diz: não é catálogo de padrões de Fowler (só amostra de Account/Entry/Transaction/Posting Rule); histórias são "em grande parte fictícias" (p.269); não há event sourcing aqui, embora "Entries nunca removidos" lembre um log (relação seria inferência [fora do livro]).
Relevância: domain-driven-design: ALTA (exemplo trabalhado completo com diálogo dev/especialista, linguagem ubíqua, e passagem de lógica "escondida em batch/script" para domínio; também DDD com sistema legado via Posting Service/FACADE); clean-architecture-expert: MÉDIA (script fino sobre camada de domínio; SERVICE/FACADE como fachada ao legado); architecture-hard-parts-expert: BAIXA (compromissos calculados entre modelo e infraestrutura).
Decisão sugerida: usar em domain-driven-design/references (exemplo trabalhado + DDD com legado em nota: FACADE/SERVICE sobre API legada); citar em clean-architecture-expert apenas o ponto "batch fino sobre domínio".

### Cap. 12: Relating Design Patterns to the Model. Strategy, Composite, Flyweight (PDF p.275-285)
Resumo: Alguns design patterns do GoF podem ser padrões de domínio quando correspondem a conceitos do domínio, não apenas a soluções técnicas. Strategy e Composite servem de exemplos; Flyweight é contraexemplo.
Conceitos e regras:
- Padrão de design só vira padrão de domínio se disser algo sobre o domínio conceitual; precisa ser lido em dois níveis: padrão técnico no código e padrão conceitual no modelo [p.275]
- STRATEGY (Policy): fatorar a parte variável de um processo em um objeto "strategy" no modelo; separar a regra do comportamento que ela governa; como padrão de domínio, enfatiza expressar um conceito (processo/política) além de trocar algoritmos [p.276]
- Exemplo Route-Finding: Routing Service com opção "mais rápido/mais barato" gera condicionais em todo cálculo; extrair Leg Magnitude Policy como parâmetro permite serviço incondicional, combinações e outros critérios (ex.: preferir transporte próprio), e torna a regra de escolha explícita e testável [p.277-278]
- Consequências do padrão original continuam valendo (cliente conhece estratégias; muitas instâncias, mitigável com estratégias sem estado compartilhadas) [p.278]
- COMPOSITE: usar quando há hierarquia todo-parte real e uma abstração sob a qual as partes são do mesmo tipo conceitual; sem isso, comportamento duplicado por nível, aninhamento rígido, clientes lidam com várias interfaces, recursão complicada; regra: tipo abstrato único; contêineres agregam informação de seus conteúdos; folhas implementam com seus próprios valores; clientes não distinguem; "simetria rigorosa" é a chave [p.279-280]
- Exemplo Route: experts veem rota como cinco segmentos lógicos (com "door legs" diferentes); modelo explícito perde uniformidade de processamento; COMPOSITE (rota feita de rotas, até o trecho individual) a recupera; diagrama de classes diz menos, a montagem aparece em diagramas de instância e código mais simples [p.280-283]
- Aplicar o padrão só quando necessário (antes de precisar de segmentos, estava bem sem Composite) [p.284]
- FLYWEIGHT: bom para VALUE OBJECTS repetidos, mas é opção de implementação sem correspondência com o domínio (não serve a ENTITIES); contrasta com COMPOSITE, aplicável ao modelo e à implementação [p.285]
- Nota: o Routing Service será retomado no Cap. 14 com implementação totalmente diferente (mesma interface) [p.278]
Citações curtas de prova:
- "The only requirement is that the pattern should say something about the conceptual domain" (trecho, sem o final) [p.285]
O que este trecho NÃO diz: não lista quais outros GoF servem; não cobre Factory/Facade aqui (Facade aparece só no Cap. 11).
Relevância: domain-driven-design: ALTA (Strategy/Composite com exemplos de domínio; critério "padrão técnico vs. padrão de domínio"); clean-architecture-expert: MÉDIA (Strategy como regra explícita no núcleo); architecture-hard-parts-expert: NENHUMA.
Decisão sugerida: usar em domain-driven-design/references (exemplos trabalhados: política de rota, composite de rotas).

### Cap. 13: Refactoring Toward Deeper Insight (PDF p.286-292)
Resumo: Ampliação do conceito de refatoração: não só micro-refatoração de código, mas busca por modelo mais profundo; três focos, formas de iniciar, equipes de exploração, quando refatorar, e crises como oportunidade.
Conceitos e regras:
- Três focos: viver no domínio; olhar as coisas de outra forma; manter diálogo ininterrupto com especialistas [p.286]
- Início: problema no código cuja raiz é o modelo (conceito ausente, relação errada), mas também quando o código parece limpo e a linguagem do modelo destoa dos especialistas ou novos requisitos não encaixam [p.287]
- Exploration Teams: 4 a 5 pessoas (iniciadores, bons modeladores, quem conhece a área, especialista quando há sutileza) fazem brainstorming de 30 a 90 minutos, desenhando UML e simulando cenários; podem dormir sobre o assunto e reunir de novo; chaves: auto-organização, escopo e sono (duas ou três reuniões curtas espaçadas; se travar, reduzir escopo), exercitar a UBIQUITOUS LANGUAGE [p.288]
- Prior Art: livros sobre o domínio, padrões de análise, padrões de projeto, formalismos (aritmética, lógica de predicados) como entrada do knowledge crunching [p.289]
- Design para desenvolvedores: design supple comunica intenção, antecipa efeitos, limita sobrecarga mental reduzindo dependências e efeitos colaterais; granularidade fina só onde mais crítico para usuários [p.290]
- Timing: não esperar justificativa completa; o custo de manter design ruim é difícil de ver; refatorar quando (a) o design não expressa o entendimento atual do domínio, (b) conceitos importantes estão implícitos e dá para explicitar, (c) há oportunidade de tornar parte importante mais supple; limites: não refatorar na véspera de release; não introduzir "supple design" só por virtuosismo; não impor "modelo profundo" que não convença o especialista; "não seja absoluto" [p.291]
- Crise como oportunidade: modelo evolui em equilíbrio pontuado; insight de ruptura costuma parecer crise (modelo claramente inadequado) e sinaliza novo nível de entendimento [p.292]
Citações curtas de prova:
- "If you wait until you can make a complete justification for a change, you've waited too long." [p.291]
- "Don't refactor the day before a release." [p.291]
O que este trecho NÃO diz: sem catálogo de refatorações de código (isso é de Fowler, outra obra); sem métricas.
Relevância: domain-driven-design: ALTA (processo: quando e como refatorar o modelo, mini-sessões de exploração; critérios de gatilho); clean-architecture-expert: BAIXA; architecture-hard-parts-expert: BAIXA (decidir sob incerteza, sem análise formal de custo).
Decisão sugerida: usar em domain-driven-design/references (processo de refinamento do modelo / DDD com código existente). Pode ser tópico de "gatilhos de refatoração para modelo mais profundo".

### Parte IV: Strategic Design, introdução (PDF p.293-294)
Resumo: Apresenta três temas de escala: contexto (BOUNDED CONTEXT), destilação (CORE DOMAIN) e estrutura de larga escala (RESPONSIBILITY LAYERS, EVOLVING ORDER). Só introdução, sem regras detalhadas.
Conceitos e regras:
- Modelo monolítico e abrangente é pesado, com duplicações e contradições; um conjunto de subsistemas colados por interfaces ad hoc não resolve problemas de empresa e gera inconsistências em cada integração; meio-termo: estratégia de design sistemática e evolutiva [p.293]
- Contexto é o menos óbvio e o mais fundamental: o modelo deve ser consistente sem definições contraditórias; definir BOUNDED CONTEXT e relação entre contextos evita "bastardizar" o modelo [p.293]
- Distillation: dar destaque ao que agrega valor e é especial (CORE DOMAIN); componentes de apoio são críticos mas devem ser postos em perspectiva [p.293]
- Estrutura de larga escala: exemplos apenas (não catálogo): RESPONSIBILITY LAYERS; novas estruturas via EVOLVING ORDER [p.293-294]
- Decisões estratégicas são de equipe/inter-equipe, "onde design e política se encontram"; cada decisão deve ter impacto direto no desenvolvimento do sistema [p.293]
Citações curtas de prova:
- "Context, the least obvious of the principles, is actually the most fundamental." [p.293]
O que este trecho NÃO diz: não define CORE DOMAIN, GENERIC SUBDOMAIN, DOMAIN VISION STATEMENT etc.; só os cita (a destilação detalhada está fora deste bloco).
Relevância: domain-driven-design: MÉDIA (enquadramento do que a skill deve cobrir no design estratégico; ordem de importância); clean-architecture-expert: NENHUMA; architecture-hard-parts-expert: MÉDIA-BAIXA (tensão entre modelo único gigante e subsistemas com interfaces ad hoc, útil como motivação).
Decisão sugerida: usar em domain-driven-design/references (visão geral estratégica); detalhes de destilação virão de outros blocos.

### Cap. 14: Maintaining Model Integrity, abertura (PDF p.295-296)
Resumo: História do objeto Charge (equipes de cobrança e de pagamento a fornecedores reaproveitaram o mesmo objeto com modelos diferentes, gerando falha no relatório de impostos) e argumento de que unificação total do modelo da empresa é inviável; é preciso decidir conscientemente o que unificar e o que deixar divergir.
Conceitos e regras:
- Unificação: consistência interna do modelo (termos com um só significado, sem regras contraditórias) [p.295]
- Causa da falha do exemplo: dois modelos diferentes (cobrar clientes vs. pagar fornecedores) sem perceber nem processo para detectar; a solução final foi criar CustomerCharge e SupplierCharge, e "voltaram a fazer tudo como antes" [p.295]
- Alternativas conscientes: construir modelo comum com suíte de testes automatizados, ou concordar em modelos separados com "mãos fora do código do outro"; ambos começam por acordo explícito sobre fronteiras [p.295]
- Unificação total de um sistema grande não é viável nem econômica; é preciso escolher onde permitir divergência e onde manter unificação estrita, por decisões conscientes e processos específicos [p.295-296]
- Riscos de tentar um único modelo para tudo: (1) substituir legado demais de uma vez; (2) projetos grandes atolam em custo de coordenação; (3) aplicações especializadas ficam com modelos que não as atendem e colocam comportamento em outro lugar; (4) tentar agradar a todos gera opções complexas que dificultam o uso [p.296]
- Divergência de modelos vem tanto de fragmentação política e prioridades gerenciais quanto de técnica, e da organização das equipes/processo [p.296]
- Mapa do capítulo: BOUNDED CONTEXT (aplicabilidade de cada modelo), CONTEXT MAP (visão global), CONTINUOUS INTEGRATION (mantém unidade dentro do contexto), depois estratégias de relacionamento: SHARED KERNEL até SEPARATE WAYS (a figura 14.1 é mapa de navegação, não extraído) [p.296]
Citações curtas de prova:
- "Total unification of the domain model for a large system will not be feasible or cost-effective." [p.296]
O que este trecho NÃO diz: aqui só se nomeia SHARED KERNEL e SEPARATE WAYS; não define CUSTOMER/SUPPLIER, CONFORMIST, ANTICORRUPTION LAYER, OPEN HOST SERVICE, PUBLISHED LANGUAGE (outros blocos).
Relevância: domain-driven-design: ALTA (narrativa e justificativa de por que contexts; riscos do modelo único; conexão com times); clean-architecture-expert: NENHUMA; architecture-hard-parts-expert: MÉDIA (argumentos de custo de coordenação, política organizacional e compromisso consciente de divergência, em paralelo ao tema de granularidade e acoplamento organizacional [fora do livro: sem citar serviços]).
Decisão sugerida: usar em domain-driven-design/references (context mapping em profundidade: motivação/riscos); possível citação indireta em architecture-hard-parts-expert apenas como análogo organizacional.

### Bounded Context (PDF p.298-300) [continua no próximo bloco]
Resumo: Define BOUNDED CONTEXT como fronteira explícita de um modelo (equipe, partes do app, código e esquema de banco). Distingue de MODULE. Exemplo "Booking Context" mostra como delimitar o que está dentro e fora, inclusive legado e equipes vizinhas.
Conceitos e regras:
- Contextos múltiplos existem em qualquer projeto grande; mesmo uma única equipe pode ter modelos conflitantes (lapsos de comunicação, código antigo reflete concepção anterior); integrar com sistema externo envolve não só conversão de formato de dados (dimensão mecânica) mas diferença de modelos [p.298]
- A falha aparece no código que não funciona, mas nasce na organização das equipes e interação; por isso olhar projeto e produtos finais (código, esquemas) [p.298-299]
- Contexto do modelo: condições que devem valer para os termos terem significado específico [p.299]
- Regra: definir explicitamente o contexto; fronteiras em termos de organização de equipe, uso em partes da aplicação e manifestações físicas (bases de código, esquemas de banco); manter o modelo estritamente consistente dentro, sem se distrair com o fora [p.299]
- Dentro do contexto, mantém o modelo puro e potente; outros contextos têm outros termos, conceitos, regras e dialetos da UBIQUITOUS LANGUAGE; integração entre fronteiras envolve tradução, que se analisa explicitamente [p.299]
- BOUNDED CONTEXTS não são MODULES: módulos organizam elementos dentro de um modelo e seus namespaces separados podem até dificultar enxergar fragmentação acidental do modelo [p.299]
- Exemplo Booking [p.299-300]:
  - App de reserva (consumidor primário do modelo) está dentro
  - Sistema legado de rastreio de cargas está fora; decisão inicial de o novo modelo divergir do legado; tradução é responsabilidade da equipe do legado, não dirigida pelo modelo, faz parte da fronteira (tema do CONTEXT MAP); é bom estar fora do contexto, pois pedir que a equipe do legado use o modelo seria irreal
  - Esquema de banco, controlado pela equipe do modelo, com mapeamento O/R direto, está dentro
  - Equipe de agendamento de viagens: iniciada junto, compartilha objetos informalmente, não está no mesmo contexto; risco porque não se veem como modelos separados; recomenda-se parar de compartilhar código até definir a relação (SHARED KERNEL possível)
- Ganho: para quem está dentro, clareza (mesmo modelo, atenção a fraturas); para quem está fora, liberdade; e percepção do risco de compartilhamento informal, exigindo decisão custo/benefício e processos [p.300]
- Fronteiras exigem atenção; CONTEXT MAP mostra o território; vários padrões definem tipos de relação; CONTINUOUS INTEGRATION preserva a unidade interna [p.300]
Citações curtas de prova:
- "Keep the model strictly consistent within these bounds, but don't be distracted or confused by issues outside." [p.299]
- "They are not in the same CONTEXT and should stop trying to share code until some changes are made." [p.300]
O que este trecho NÃO diz: não explica como identificar splinters (próxima seção, fora do bloco); não detalha padrões de integração (ACL etc.); não faz mapeamento para microsserviços; p.297 está em branco.
Relevância: domain-driven-design: ALTA (BOUNDED CONTEXT com critérios de delimitação, exemplo trabalhado de delimitar com legado e equipes, diferença de MODULE, ACL como motivação [fora do livro neste bloco: ACL é de outro trecho]); clean-architecture-expert: BAIXA (módulos vs. contextos, só como esclarecimento); architecture-hard-parts-expert: MÉDIA (fronteira alinhada a time e a esquema de dados, custo/benefício de compartilhar).
Decisão sugerida: usar em domain-driven-design/references (context mapping em profundidade e DDD com legado: o exemplo Booking como caso trabalhado).

---

## Onde o livro vai além de listas curtas (para a skill atual, rasa em exemplos)
- Exemplo Paint Mixing em 3 etapas (p.226-233): VO com função pura, asserções que revelam conceito ausente, divisão StockPaint/MixedPaint.
- Shares Math (p.254-262): sete passos de refatoração com antes/depois, incluindo cascata de insights ("Share Pie vira VO").
- Specification composta (p.246-253): operações lógicas, implementação COMPOSITE, alternativa por pilha/FLYWEIGHT, subsunção com limite (só AND).
- Contornos conceituais com exemplo de accruals (p.235-238): como previsível e imprevisível mudanças revelam bom ajuste.
- Diálogo desenvolvedor-especialista sobre contas e accruals e Posting Rules (p.265-273): mostra linguagem ubíqua nascendo, termos mal usados corrigidos e compromissos com ORM e Singleton.
- Strategy e Composite com exemplos de transporte (p.276-284); critério "padrão técnico vs. padrão de domínio".
- Cap. 14 abertura e Booking Context (p.295-300): história do Charge, riscos de modelo único, delimitação inclusive para legado e equipe vizinha.
- Quando refatorar o modelo, exploration teams e limites (p.287-292).

## Resumo de relevância por artefato
- domain-driven-design (references/): ALTA em quase tudo; sugestão de arquivos: tático/exemplos (paint, shares math, specification, strategy/composite), contornos e granularidade, asserções/invariantes de agregado, processo de refatoração para insight, context mapping (motivação, riscos, Booking como caso com legado).
- clean-architecture-expert: MÉDIA em funções puras, dependências conceituais, batch fino sobre domínio, FACADE/SERVICE como porta para legado; BAIXA nos demais. Evitar ancorar a skill neste livro para Dependency Rule (não aparece aqui).
- architecture-hard-parts-expert: BAIXA a MÉDIA; apenas Cap. 14 (custo de unificar, política e organização, decisões conscientes) e compromissos calculados com infraestrutura.

## Checklist de cobertura
- Primeira página lida: 226
- Última página lida: 300 (conferido: último marcador do arquivo é "PDF PAGINA 300"; 75 marcadores contados no total)
- Páginas sem texto útil ou ilegíveis: p.297 (em branco, só "[ Team LiB ]"); p.243 e p.253 quase vazias (fim de seção/quadro Sócrates)
- Problemas de extração observados: figuras UML ausentes (só legendas); símbolos lógicos (seta de implicação) perdidos; trechos de código com quebras, "–" no lugar de "-" e erros de sintaxe do original (ex. instanceof); parágrafo do Scheme duplicado (p.245); marcadores "[ Team LiB ]"; numeração impressa não visível; texto em inglês, não em português
- Capítulos/seções cobertos integralmente: Supple Design (final: Side-Effect-Free Functions, Assertions, Conceptual Contours, Standalone Classes, Closure of Operations, Declarative Design, Extending Specifications, Angles of Attack, Shares Math), Cap. 11, Cap. 12, Cap. 13, introdução da Parte IV, abertura do Cap. 14
- Capítulos/seções que continuam em outro bloco: Cap. 10 começa antes de p.226 (Side-Effect-Free Functions inicia no bloco anterior); Cap. 14 continua após p.300 (Bounded Context termina com "Recognizing Splinters"; CONTEXT MAP, CONTINUOUS INTEGRATION, SHARED KERNEL etc. no próximo bloco)
