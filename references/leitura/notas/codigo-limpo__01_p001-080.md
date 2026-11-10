# Notas: Código Limpo (R. C. Martin), bloco 01, PDF p.1-80

Fonte: `chunks/codigo-limpo__01_p001-080.txt` (lido integralmente, marcadores PDF PAGINA 1 a 80). Texto por OCR Tesseract. Convenção: "PDF p.N" = marcador; "impr. M" = número impresso visível. Deslocamento aproximado PDF->impr.: Cap.1 = -10 (PDF 12 = impr. 2); Cap.2 = -9 (PDF 27 = impr. 18); Cap.3 = -9 até PDF 55, depois -8 (PDF 57 = impr. 49); Cap.4 = -6 (PDF 60 = impr. 54; PDF 80 = impr. 74).

Observação geral de OCR: em várias frases do Cap.3 a palavra "abstração" foi perdida pelo OCR ("nível de ."). Onde o título/cabeçalho legível a confirma, usei; onde não, indico lacuna. Listagens de código estão muito corrompidas (identificadores trocados, "1" por "i", "(" por "{" etc.); parafraseio a lógica a partir do texto em prosa, não do código.

---

### Capa, Prefácio (James O. Coplien) (PDF p.1-6) [OCR: MÉDIA]
Resumo: Prefácio que defende o cuidado com pequenos detalhes de código usando metáforas (arquitetura, manutenção japonesa/5S, Lean). Argumenta que a maior parte do trabalho de software é manutenção e que estilo consistente e atenção a detalhes importam.
Conceitos e regras:
- Pequenas coisas importam; a atenção aos detalhes é fundamento de profissionalismo [p.2].
- Afirma que em software 80% ou mais do que se faz é "manutenção" [p.3].
- Os 5S descritos como analogia: organização (nomes adequados), arrumação (código onde se espera encontrá-lo; se não, refatore), limpeza (livrar-se de comentários e código comentado), padronização (estilo consistente na equipe), disciplina [p.3].
- Cita pesquisa na Bell Labs: estilo de endentação consistente era um dos indicadores estatisticamente mais significantes de baixa incidência de bugs [p.4-5].
- "Deixar o local mais limpo do que como o encontramos"; refatorar antes de verificar o código; refatoração como parte do "Pronto" é prática recomendada no Scrum [p.5].
Citações curtas de prova:
- "estilo consistente de endentação era um dos indicadores mais significantes estatisticamente da baixa incidência de bugs" [p.4-5, atravessa a quebra de página]
O que este trecho NÃO diz: não dá regras operacionais; o dado da Bell Labs é relatado de memória do prefaciador, sem número nem fonte além da menção.
Relevância: clean-code-expert: BAIXA (contexto/motivação); refactoring-expert: BAIXA; testing-tdd-expert: NENHUMA; code-review-expert: BAIXA (argumento para exigir consistência de estilo).
Decisão sugerida: descartar na maior parte; opcionalmente 1 linha de motivação em references do clean-code-expert.

### Introdução e Agradecimentos (PDF p.7-10) [OCR: MÉDIA/RUIM nas figuras]
Resumo: Explica a estrutura do livro em três partes (princípios/práticas, estudos de caso de limpeza, lista final de heurísticas e "odores") e que habilidade profissional exige conhecimento mais prática. Agradecimentos e nota sobre a imagem de capa sem conteúdo técnico.
Conceitos e regras:
- Parte 1: capítulos de princípios, padrões e práticas; Parte 2: estudos de caso de complexidade crescente; Parte 3: um capítulo com heurísticas e "odores" colhidos nos estudos [p.8].
- Cada alteração nos estudos de caso é anotada com referência a heurística entre colchetes (ex.: [H22]); há referência cruzada no fim do livro [p.8].
- A figura de "WTFs por minuto" como medida de qualidade de código aparece, mas o OCR da figura é ilegível [p.7].
O que NÃO diz: nenhuma regra de código.
Relevância: todos: NENHUMA/BAIXA. Decisão: descartar (p.10 agradecimentos e capa; p.7 figura ilegível).

---

### Capítulo 1: Código Limpo (PDF p.11-25; impr. 1-15) [OCR: BOA no texto; MÉDIA nos boxes de citações de autores]
Resumo: Argumenta que código sempre existirá, que código ruim destrói produtividade e empresas, que a culpa é dos programadores (profissionais) e não de gerentes/prazos, e que só código limpo permite ir rápido. Reúne definições de código limpo de vários autores e fecha com a Regra do Escoteiro.
Conceitos e regras:
- Código nunca desaparecerá: especificar requisitos com detalhe suficiente para a máquina executar é programar [p.12].
- Código ruim leva produtos e empresas à ruína; causa comum: pressa e "arrumar depois" [p.13].
- Custo da bagunça: cada mudança quebra duas ou três outras partes; produtividade tende assintoticamente a zero; adicionar pessoas piora (Figura 1.1, produtividade x tempo) [p.14].
- "Grande Replanejamento": reescrita em paralelo ao sistema antigo pode durar anos e repetir o ciclo [p.15].
- Responsabilidade: os programadores são responsáveis pela bagunça; devem dizer a verdade a gerentes e proteger o código tão apaixonadamente quanto gerentes protegem prazos (analogia do médico que não deixa de lavar as mãos) [p.15-16].
- Principal dilema: a falsa crença de que fazer bagunça cumpre o prazo; a única forma de ir mais rápido é manter o código limpo [p.16].
- Escrever código limpo exige "sensibilidade ao código" e disciplina em muitas pequenas técnicas; distinguir bom de ruim não basta para saber escrever [p.16-17].
- Definições de código limpo, por autor (paráfrase):
  - Stroustrup: elegante e eficiente; lógica direta; tratamento de erro completo seguindo estratégia clara; desempenho próximo do ótimo para não incentivar otimizações sorrateiras; faz bem apenas uma coisa; metáfora das janelas quebradas (Thomas/Hunt) para degradação [p.17-18].
  - Booch: simples e direto, legível como prosa, abstrações claras e linhas de controle objetivas [p.18].
  - Dave Thomas: pode ser lido e melhorado por outros; tem testes de unidade e de aceitação; nomes significativos; uma só maneira de fazer cada tarefa; poucas dependências explícitas; API mínima e clara. O autor conclui que código sem testes não é limpo [p.19].
  - Feathers: parece ter sido escrito por alguém que se importava; nada óbvio a melhorar [p.19-20].
  - Ron Jeffries: regras de código simples (Beck), em ordem de prioridade: todos os testes passam; sem duplicação; expressa todas as ideias de projeto; minimiza número de entidades (classes, métodos, funções). Foco principal em duplicação (sinal de ideia mal representada) e em expressividade (renomear várias vezes; dividir objeto/método que faz mais de uma tarefa; usar Extrair Método); criar abstrações simples cedo (ex.: busca em coleção encapsulada) [p.20].
  - Ward Cunningham: cada rotina lida é como você esperava; código belo faz parecer que a linguagem foi feita para o problema [p.21].
- Escolas de pensamento: o livro apresenta a "escola" do autor/Object Mentor; não é verdade única; muitas recomendações podem ser contraditórias com outras escolas [p.22].
- Somos autores: proporção leitura:escrita de 10 para 1; para escrever rápido, torne o código fácil de ler [p.23].
- Regra do Escoteiro: deixar o código mais limpo do que encontrou; exemplos: renomear variável, dividir função um pouco grande, eliminar repetição, reduzir if aninhado [p.24].
- Menciona SRP, OCP e DIP como princípios referenciados esporadicamente no livro [p.24].
Citações curtas de prova:
- "Um código limpo sempre parece que foi escrito por alguém que se importava." [p.19, Feathers]
- "Um código, sem testes, não está limpo." [p.19, autor comentando Thomas]
- "Deixe a área do acampamento mais limpa do que como você a encontrou." [p.24] (OCR: "à encontrou")
- "a taxa de tempo gasto na leitura v. na escrita é de 10x1." [p.23]
O que este trecho NÃO diz: não define limites numéricos nem técnicas concretas; o "10x1" vem de uma anedota de reprodução de sessão de edição, não de estudo citado. A "lei de LeBlanc" aparece no texto como "Nunca é tarde" (OCR/tradução; não completo por conhecimento prévio) [p.13].
Relevância: clean-code-expert: ALTA (fundamentos e Regra do Escoteiro); refactoring-expert: ALTA (regras de Beck/Jeffries, Boy Scout, custo da bagunça); testing-tdd-expert: MÉDIA (Thomas: sem testes não é limpo; primeira regra de Beck: testes passam); code-review-expert: MÉDIA (definições como critérios de revisão).
Decisão sugerida: usar em clean-code-expert (mentalidade: 4 regras de Beck, leitura 10:1, Boy Scout) e em references de refactoring-expert (custo da bagunça, ciclo da reescrita).

---

### Capítulo 2: Nomes Significativos (PDF p.26-39; impr. 17-30) [OCR: MÉDIA; prosa BOA, código RUIM] (Tim Ottinger)
Resumo: Catálogo de regras para bons nomes: revelar propósito, evitar desinformação, distinções reais, pronunciáveis, buscáveis, sem codificações, sem mapeamento mental, convenções por tipo de elemento, uma palavra por conceito, contexto adequado, sem contexto excessivo.
Conceitos e regras (cada item com página):
- Use nomes que revelem seu propósito: nome deve dizer por que existe, o que faz e como é usado; se requer comentário, não revela propósito. Exemplo: `d` com comentário "tempo decorrido em dias" vs nomes como elapsedTimeInDays / daysSinceCreation [p.27]. Exemplo getThem (índice 0, valor 4 sem significado) refatorado para getFlaggedCells com constantes e depois classe Cell com isFlagged(); a complexidade não muda, só o grau de explicitude [p.27-28].
- Evite informações erradas: nomes que remetem a outro significado (hp, aix, sco são plataformas Unix); não chamar de accountList algo que não é List; cuidado com nomes muito parecidos entre módulos; evitar "l" minúsculo e "O" maiúsculo como nomes (parecem 1 e 0) [p.28-29].
- Faça distinções significativas: não alterar nomes só para satisfazer o compilador (erro de grafia intencional, números sequenciais a1/a2); copyChars(a1,a2) melhora com source/destination; palavras vazias (Info, Data, "variable", "table") em nomes de classes não distinguem: ProductInfo vs ProductData; Customer vs CustomerObject; getActiveAccount/getActiveAccounts/getActiveAccountInfo sem como escolher; NameString não é melhor que Name [p.29-30].
- Use nomes pronunciáveis: programação é atividade social; exemplo genymdhms vs generationTimestamp; DtaRcrd102 vs Customer [p.30-31].
- Use nomes passíveis de busca: letras e números soltos são difíceis de buscar (MAX_CLASSES_PER_STUDENT é fácil, "7" não); "e" é péssimo para busca; nome de uma só letra só como variável local em método pequeno; tamanho do nome proporcional ao tamanho do escopo; exemplo com WORK_DAYS_PER_WEEK e NUMBER_OF_TASKS [p.31-32].
- Evite codificações: notação húngara, prefixos de membro (m_), prefixo "I" em interface; em linguagens modernas, tipos e IDEs tornam isso obstáculo e dificultam renomear/ler. Preferência do autor: não enfeitar interface (ShapeFactory) e, se precisar codificar, codificar a implementação (ShapeFactoryImp ou CShapeFactory) [p.32-33].
- Evite mapeamento mental: leitor não deve traduzir nomes; contador "i", "j", "k" aceitável (nunca "l") em escopo muito pequeno; profissional entende que clareza é fundamental [p.33].
- Nomes de classes: substantivos (Cliente, Conta, AnaliseEndereco); evitar Gerente, Processador, Dados, Info; não verbo [p.34].
- Nomes de métodos: verbos (postarPagamento, excluirPagina, salvar); acessores/mutadores/predicados com get/set/is conforme padrão JavaBean; para construtores sobrecarregados, usar métodos factory estáticos com nomes que descrevam os parâmetros (Complex.FromRealNumber(23.0)) e tornar os construtores privados [p.34].
- Não dê uma de espertinho: evite humor/gírias (HolyHandGrenade vs DeleteItems); "opte por clareza no lugar de divertimento" [p.34].
- Selecione uma palavra por conceito: não misturar fetch/retrieve/get entre classes; o mesmo para controller/manager/driver; léxico consistente; nomes devem ficar sozinhos (IDE não mostra seus comentários) [p.35].
- Não faça trocadilhos: mesma palavra para ideias diferentes (ex.: add para somar/concatenar vs add para inserir em coleção; usar insert/append no segundo caso) [p.35].
- Use nomes do domínio da solução (termos de informática, algoritmos, padrões: AccountVisitor, JobQueue) e, na falta, do domínio do problema (para perguntar a um especialista) [p.35-36].
- Adicione contexto significativo: poucos nomes são significativos sozinhos; colocar em classes/funções/namespaces bem nomeados; prefixo (addrState) como último recurso; melhor solução é classe Address. Listagens 2-1/2-2: função com três variáveis (number, verb, pluralModifier) e if/else grande vira classe GuessStatisticsMessage com funções menores; contexto melhor também clarifica o algoritmo [p.36-38].
- Não adicione contexto desnecessário: não prefixar todas as classes de um app com sigla (ex.: GSD); nomes curtos são melhores se claros; accountAddress/customerAddress são bons como instâncias de Address, ruins como nomes de classe [p.38].
- Conclusão: bons nomes exigem habilidade de descrição e cultura compartilhada; não ter medo de renomear; usar ferramentas de refatoração [p.38-39].
Citações curtas de prova:
- "Se um nome requer um comentário, então ele não revela seu propósito." [p.27]
- "O tamanho de um nome deve ser proporcional ao tamanho do escopo." [p.31]
- "Opte por clareza no lugar de divertimento" [p.34] (OCR: "Opte por clareza no lugar de divertimento,")
- "Escolha uma palavra por cada conceito abstrato e fique com ela" [p.35]
O que este trecho NÃO diz: não menciona nomes de booleanos (isActive/canCancel) como regra de estilo; só cita o prefixo is para predicados JavaBean (p.34). Não proíbe explicitamente util/helper/temp/obj/service; só cita Gerente/Processador/Dados/Info como a evitar em nomes de classe (p.34) e Info/Data/Object como palavras vazias (p.29-30).
Relevância: clean-code-expert: ALTA (catálogo completo de nomes); refactoring-expert: MÉDIA (Renomear como refatoração segura; contexto via extrair classe); testing-tdd-expert: NENHUMA; code-review-expert: ALTA (checklist de nomes).
Decisão sugerida: usar em clean-code-expert/references/nomes.md (catálogo) e em code-review-expert (checklist).

---

### Capítulo 3: Funções (PDF p.40-58; impr. 31-50) [OCR: prosa BOA; código RUIM]
Resumo: Mostra uma função longa do FitNesse (Listagem 3-1) reduzida a poucas linhas através de extração, renomeação e reestruturação, e deriva regras: funções pequenas, fazer uma coisa, um nível de abstração, poucos parâmetros, sem efeitos colaterais, exceções em vez de códigos de erro, sem duplicação.
Conceitos e regras:
- Primeira regra: funções devem ser pequenas; segunda: menores ainda. Autor afirma não ter pesquisa que justifique e baseia-se em 4 décadas de experiência; hoje no máximo cerca de 20 linhas; linhas não devem passar de ~150 caracteres [p.43]. Funções de 2 a 4 linhas no exemplo de Kent Beck (Sparkle) [p.43].
- Blocos dentro de if/else/while devem ter uma linha (provavelmente uma chamada); endentação de no máximo um ou dois níveis [p.44].
- Faça apenas uma coisa: "AS FUNÇÕES DEVEM FAZER UMA COISA. DEVEM FAZÊ-LA BEM. DEVEM FAZER APENAS ELA." Critério: a função faz uma coisa se só executa passos um nível abaixo do nome da função (parágrafo "TO ..."); outro teste: não conseguir extrair outra função cujo nome não seja mera reformulação da implementação; seções dentro da função (declarações, inicializações, seleção) indicam mais de uma coisa [p.44-45].
- Um nível de abstração por função: misturar conceitos altos (getHtml), intermediários (PathParser.render) e baixos (.append("\n")) gera confusão e atrai mais detalhes ("janelas quebradas") [p.45].
- Regra Decrescente (stepdown): ler código de cima para baixo como narrativa; cada função seguida pelas do nível seguinte [p.46].
- Switch: difícil fazer pequeno e que faça uma coisa; aceitável apenas se aparece uma vez, para criar objetos polimórficos, escondido atrás de herança/abstract factory. Listagem 3-4 (calculatePay com switch no tipo de funcionário) viola: tamanho, mais de uma coisa, SRP, OCP, e proliferação de funções com mesma estrutura (isPayday, deliverPay) [p.46-47]. Texto da Listagem 3-5 (Employee/Factory) está incompleto no extrato; só aparece a classe abstrata [p.47].
- Nomes descritivos: nomes longos são melhores que curto e enigmático e melhores que comentário longo; tentar vários nomes; consistência de fraseologia (includeSetupPages, includeSuiteSetupPage...); buscar nome melhora o design [p.48].
- Número de parâmetros: ideal zero; depois um (mônade), dois (díade); evitar três (tríade); mais de três exige motivo muito especial e "mesmo assim não devem ser usados" [p.48]. Argumentos são difíceis de ler (nível de abstração diferente do nome) e de testar (combinações) [p.48-49].
- Parâmetros de saída são mais difíceis de entender do que de entrada [p.49, 52]. Formas mônades comuns: perguntar sobre o argumento (fileExists), transformá-lo e devolvê-lo (fileOpen), ou evento (passwordAttemptFailedNtimes); evitar outras formas, e se a função transforma a entrada, devolver o valor transformado [p.49].
- Parâmetros lógicos (booleanos) são feios: mostram que a função faz mais de uma coisa; dividir em duas (renderForSuite/renderForSingleTest) [p.49-50].
- Díades: mais difíceis que mônades; aceitáveis quando são componentes de um único valor (Point(0,0)); problemáticas quando a ordem não é natural (assertEquals(expected, actual)); formas de reduzir: tornar método membro do objeto, campo da classe, ou extrair classe (FieldWriter) [p.50].
- Tríades: bem mais difíceis; "pense bastante antes"; assertEquals(message, expected, actual) como exemplo de pausa/ignorar [p.50]. Há uma possível sugestão de embutir nomes dos parâmetros no nome da função (assertExpectedEqualsActual) que aparece cortada no início da p.51 (impr. 43); o trecho anterior (que provavelmente introduzia objetos como argumentos/listas/verbos-chave) NÃO está visível no extrato; não afirmo seu conteúdo.
- Efeitos colaterais são mentiras: Listagem 3-6 checkPassword inicializa a sessão quando a senha confere; cria acoplamento temporal; solução seria deixar o nome explícito (checkPasswordAndInitializeSession), embora viole "uma coisa" [p.51-52].
- Parâmetros de saída: appendFooter(s) ambíguo; preferir report.appendFooter(); alterar o estado do objeto dono da função [p.52].
- Separação comando-consulta: ou altera estado ou responde; exemplo set(attribute, value) retornando boolean confunde em `if (set(...))`; alternativa attributeExists + setAttribute [p.52-53].
- Prefira exceções a códigos de erro: códigos de erro violam levemente a separação comando-consulta e geram if aninhados; exceções permitem separar o tratamento de erro [p.53].
- Extraia blocos try/catch para funções próprias (delete chama deletePageAndAllReferences e logError); função que trata erro só faz isso: try deve ser a primeira instrução e nada após catch/finally [p.54].
- Error.java (enum de códigos de erro) é "chamariz à dependência": mudar o enum obriga recompilar/redistribuir tudo e leva a reutilizar códigos antigos; com exceções, novas exceções derivam de uma classe sem recompilar tudo [p.54-55].
- Evite repetição: Listagem 3-1 repete um algoritmo quatro vezes (SetUp, SuiteSetUp, TearDown, SuiteTearDown); duplicação custa quatro modificações e quatro chances de erro; "pode ser a raiz de todo o mal no software" (paráfrase de texto legível) [p.55].
- Programação estruturada (uma entrada e uma saída, sem break/continue/goto): com funções pequenas, múltiplos return/break/continue não causam problemas e podem ser mais expressivos; goto só faz sentido em funções grandes, evitar [p.55-56].
- Como escrever: começa-se com rascunho longo e feio, com testes de unidade cobrindo cada linha; refina-se dividindo, renomeando, eliminando duplicação com testes passando; as regras não são aplicadas desde o início [p.56].
- Conclusão: funções são os verbos e classes os substantivos da linguagem do sistema; o objetivo é contar a história do sistema [p.56].
- Listagem 3-7 (SetupTeardownIncluder): versão final refatorada, com várias funções privadas pequenas; extrato legível só no nível de estrutura (código corrompido) [p.57-58].
Citações curtas de prova:
- "AS FUNÇÕES DEVEM FAZER UMA COISA. DEVEM FAZÊ-LA BEM." [p.44]
- "Efeitos colaterais são mentiras." [p.51]
- "Um nome longo e descritivo é melhor do que um comentário extenso e descritivo." [p.48]
- "A quantidade ideal de parâmetros para uma função é zero (nulo)." [p.48]
- "Passar um booleano para uma função certamente é uma prática horrível" [p.49]
O que este trecho NÃO diz: não dá regra "guard clauses" nem "evite else" por esses nomes; não trata classes (Cap.10) nem retorno de null. Não há pesquisa que sustente tamanhos; o autor declara isso expressamente [p.43]. A afirmação "aceitável 3 parâmetros" NÃO aparece: o livro diz evitar três.
Relevância: clean-code-expert: ALTA (núcleo de funções e tratamento de erro); refactoring-expert: ALTA (Extrair Método, substituir switch por polimorfismo, remover duplicação, caminho de rascunho para limpo com testes); testing-tdd-expert: MÉDIA (refinar com testes cobrindo o código; parâmetros dificultam testes); code-review-expert: ALTA (checklist: tamanho, nível de abstração, argumentos, flags, efeitos colaterais, CQS, códigos de erro).
Decisão sugerida: usar em clean-code-expert/references/funcoes.md (catálogo com números: 20 linhas, 150 colunas, 1-2 níveis, 0/1/2 args) e em refactoring-expert (switch->polimorfismo, extrair try/catch) e code-review-expert (smells de função).

---

### Capítulo 4: Comentários (PDF p.59-80; impr. 53-74) [OCR: prosa BOA; código e listagens RUIM]
Resumo: Comentários são, no máximo, um mal necessário e compensam falha em se expressar no código; mentem com o tempo. Cataloga comentários bons (poucos) e ruins (a maioria) e termina com exemplo de módulo de primos limpo (GeneratePrimes -> PrimeGenerator) com apenas dois comentários.
Conceitos e regras:
- Epígrafe: não comente código ruim, reescreva-o (Kernighan e Plauger) [p.59]. Comentários são "mal necessário"; seu uso adequado é compensar nosso fracasso em nos expressar no código [p.59-60].
- Comentários mentem porque programadores não conseguem mantê-los atualizados; quanto mais antigo e distante do código, maior a chance de estar errado; comentário impreciso é pior do que nenhum; só o código diz a verdade [p.60].
- Comentários não compensam código ruim; limpe o código em vez de comentá-lo [p.60-61]. Explique-se no código: exemplo de condição com flags e idade comentada vs função employee.isEligibleForFullBenefits() [p.61].
- Comentários bons (cada um com restrição):
  - Legais (copyright, licença): referenciar licença externa em vez de colar termos completos [p.61].
  - Informativos: ex.: retorno de método abstrato; melhor usar nome (responderBeingTested); regex com formato de data melhor se estivesse em classe própria [p.62].
  - Explicação da intenção: por que se decidiu algo (ex.: compareTo, teste de concorrência com 25000 threads) [p.62-63].
  - Esclarecimento: traduzir argumentos/retornos obscuros de biblioteca padrão ou código não alterável; risco de estar incorreto [p.63].
  - Alerta sobre consequências: ex.: teste lento, SimpleDateFormat não é thread-safe; hoje usar @Ignore com explicação [p.64].
  - TODO: tarefas pendentes; não justificam deixar código ruim; varrer e eliminar regularmente [p.64-65].
  - Destaque: ressalta importância de algo aparentemente irrelevante (ex.: trim) [p.65].
  - Javadocs em APIs públicas: bons, mas podem enganar como qualquer comentário [p.65].
- Comentários ruins (catálogo, 1 linha cada):
  - Murmúrio: comentário vago que obriga a investigar outros módulos (catch vazio com texto sobre padrões) [p.65-66].
  - Redundantes: mais lentos de ler que o código e menos precisos (Listagem 4-1; Tomcat 4-2) [p.66-68].
  - Enganadores: afirmam algo sutilmente errado (o método não retorna assim que closed fica true) [p.69].
  - Imperativos: regra de que toda função/variável tenha Javadoc gera lixo (Listagem 4-3) [p.69].
  - Longos/diários (log de mudanças no topo do arquivo): desnecessários com controle de versão [p.69-70].
  - Ruidosos (óbvio, "Construtor padrão", "Dia do mês"): aprende-se a ignorá-los e passam a mentir; o desabafo no catch (4-4) deveria virar refatoração (4-5) [p.70-72].
  - Ruídos assustadores: Javadocs com erro de copiar/colar [p.72].
  - Evite comentário se é possível usar função/variável (exemplo module/subsystem) [p.72-73].
  - Marcadores de posição: usar raramente [p.73].
  - Comentários ao lado de chaves de fechamento: sinal para reduzir a função (Listagem 4-6) [p.73-74].
  - Créditos e autoria: usar controle de versão [p.74].
  - Código comentado: "poucas práticas são tão condenáveis"; outros não têm coragem de apagar; apague, o controle de versão lembra [p.74-75].
  - Comentários HTML: responsabilidade da ferramenta de documentação, não do programador [p.75].
  - Informações não-locais (descrevem outra parte do sistema, ex.: porta padrão) [p.75].
  - Informações excessivas (histórico/RFC desnecessário) [p.76].
  - Conexões nada óbvias (comentário que precisa ser explicado, ex.: bytes de filtragem e "+ 260") [p.76].
  - Cabeçalhos de funções: função curta bem nomeada dispensa [p.76].
  - Javadocs em código não público: "maldição" [p.77].
- Exemplo GeneratePrimes (comentado, uma função com seções) vs PrimeGenerator (funções pequenas e nomeadas: uncrossIntegersUpToMaxValue, crossOutMultiples, putUncrossedIntegersIntoResult etc.). Mantém dois comentários: o do cabeçalho (redundante, mas ajuda) e o que explica a raiz quadrada como limite; o autor também se questiona se a otimização vale o esforço de entendimento [p.77-80].
Citações curtas de prova:
- "Comentários são sempre fracassos." [p.60]
- "Comentários imprecisos são muito piores do que nenhum." [p.60]
- "o único comentário verdadeiramente bom é aquele em que você encontrou uma forma para não escrevê-lo." [p.61]
- "Simplesmente exclua o código." [p.75]
- "Só se pode encontrar a verdade em um lugar: no código." [p.60]
O que este trecho NÃO diz: não proíbe todo comentário (lista casos aceitáveis); não diz que as quatro categorias da skill (regras de negócio complexas, decisões arquiteturais, limitações externas, workarounds) são as permitidas. Não discute formatação (Cap.5 em outro bloco).
Relevância: clean-code-expert: ALTA; refactoring-expert: ALTA (comentário -> extrair função/variável; remover código comentado; exemplo antes/depois de primos); testing-tdd-expert: BAIXA (exemplos de comentário em teste: intenção, alerta); code-review-expert: ALTA (catálogo de comentários ruins como checklist).
Decisão sugerida: usar em clean-code-expert/references/comentarios.md (bons x ruins) e code-review-expert.

---

## Auditoria da skill atual

Comparação com `skills/clean-code-expert/SKILL.md` (v1.0) e `references/before-after.md`. Avalio só o que este bloco permite (Cap.1 a 4). Capítulos 5 a 17 e G/H (formatação, objetos e estruturas de dados, tratamento de erros em profundidade, testes, classes, sistemas) não estão neste bloco; nada concluo sobre eles.

### (a) Afirmações da skill confirmadas neste bloco
- Nomes devem revelar intenção/propósito: p.27 (impr. 18).
- Evitar nomes genéricos em classes (manager, processor, data, info) e palavras vazias Info/Data: p.30 e p.34 (a lista do livro é Gerente, Processador, Dados, Info; ver (b) para util/helper/temp/obj/service).
- Funções devem fazer uma coisa; evitar função monstro: p.44 (impr. 35); função pequena (20 linhas): p.43.
- Mais de um nível de indentação é anti-padrão: p.44 (blocos de uma linha; indentação 1 ou 2).
- Comentários frequentemente escondem código ruim; primeiro melhore o código: p.60-61; exemplo employee.isEligibleForFullBenefits() em before-after.md nº6 confere com p.61.
- Comentário "// Incrementa contador" como proibido: consistente com "Comentários ruidosos/redundantes", p.70.
- Nunca manter código comentado; controle de versão existe para isso: p.74-75.
- Eliminar duplicação: p.55 (e p.20 Jeffries). A frase "identifique o padrão, extraia a abstração, centralize" é da skill, mas o espírito se apoia em p.20 e p.55.
- Separe lógica de negócio de tratamento de erro: p.53-54 (extrair try/catch, tratamento de erro é uma coisa).
- Preferir exceção a sinalizador/código de erro: p.53 (aplica-se a códigos como E_OK; "return -1/false" aproximam-se do mesmo problema).
- Código deve ser testável; testes ligados à limpeza: p.19 (Thomas), p.56 (refatorar com testes rodando).
- Boy Scout Rule: p.24 (impr. 14); exemplos da skill (renomear, remover duplicação, simplificar, extrair função) coincidem com os do livro.
- Regra Máxima ("escrito por alguém que se importa"): p.19 (atribuída a Michael Feathers; a skill não atribui).
- "Nunca sacrifique clareza em troca de soluções inteligentes": p.33 e p.34 (esperto x profissional; "Não dê uma de espertinho").
- Funções com muitos "passos" e seções em comentários (processOrder em before-after.md nº2): p.45 (seções dentro de funções indicam mais de uma coisa).
- Guard clauses/retorno antecipado: o termo não aparece, mas p.55-56 apoia múltiplos return/break/continue em funções pequenas, e p.44 apoia reduzir aninhamento.
- before-after.md nº1 (nomes): p.27 mesmo princípio (nome que revela propósito/unidade).

### (b) Afirmações da skill NÃO suportadas ou contraditas neste bloco
- "Argumentos: ideal 0-2, aceitável 3, evite 4+" (SKILL.md, Funções Pequenas): contradita em parte. O livro (p.48) diz ideal zero, depois um, dois; "Sempre que possível devem-se evitar três parâmetros (tríade)"; mais de três exige motivo muito especial "mesmo assim não devem ser usados". Também p.50: "pense bastante antes de criar uma triade". Portanto "aceitável 3" não é do livro.
- "Se uma função exige explicação verbal com 'primeiro faz isso, depois faz aquilo', ela tem múltiplas responsabilidades": não é o critério do livro. O livro admite vários passos desde que um nível abaixo do nome (parágrafo TO; Listagem 3-3 tem "três passos" e ainda é "uma coisa", p.44-45). Critérios do livro: mesmo nível de abstração, seções internas, impossibilidade de extrair função com nome não-redundante. A heurística da skill pode gerar over-splitting (cf. p.45).
- "Evite else quando possível": não consta neste bloco; nenhuma passagem a apoia.
- "Booleanos... Evite: flag, status, check": não suportado neste bloco como regra de nomenclatura. O livro trata booleano como parâmetro (p.49-50, "Parâmetros lógicos") e cita is/has... só como prefixo de predicado JavaBean (p.34). O nome checkPassword é criticado por efeito colateral (p.51), não por prefixo "check".
- "Evitar sem contexto claro: temp, obj, util, helper, service": não suportado literalmente. O livro nomeia Gerente/Processador/Dados/Info para classes (p.34), e Object/Info/Data como palavras vazias (p.29-30); e também diz que nomes de solução (AccountVisitor, JobQueue) são adequados (p.35-36), o que relativiza "service".
- "Permitidos: regras de negócio complexas, decisões arquiteturais, limitações externas, workarounds documentados": lista própria da skill. Os comentários bons do livro são: legais, informativos, intenção, esclarecimento (código/biblioteca que não se pode alterar), alerta de consequências, TODO, destaque, Javadoc de API pública (p.61-65). "Regras de negócio" e "decisões arquiteturais" não aparecem; "workarounds" só indiretamente (alerta SimpleDateFormat, p.64).
- "Outro desenvolvedor conseguirá entender isso em 30 segundos?": critério inventado pela skill; o livro usa 3 minutos para comparar as Listagens 3-1 e 3-2 (p.41-42), e não propõe limite de tempo como regra.
- "Evite como sinalizadores de erro: return null; return false": neste bloco só se condena código de erro tipo enum E_OK (p.53-55) e booleano de sucesso em set() (p.52-53, comando-consulta). Null não é tratado aqui (não concluo).
- "Todo código deve ser escrito pensando em testes... given/when/then", "Dependências externas abstraídas": não suportado neste bloco (testes limpos/estrutura de teste não aparecem; capítulo de testes está em outro bloco). Parcial: p.19 e p.49 e p.56.
- "Lei de Demeter" (customer.getCompanyCityName()): não aparece neste bloco; não avalio.
- "Objetos ao invés de primitivos (Email, CPF, Money)": não aparece neste bloco. Apoio parcial só pela substituição de int[] por Cell (p.28) e Address (p.36).
- Exemplo before-after.md nº5 (Optional/orElseThrow): o bloco não trata null; só exceções vs códigos de erro (p.53).
- `Funções Pequenas`: skill não dá o número que o livro dá (20 linhas / 150 colunas); não é contradição, ver (c). A frase "Código é escrito para humanos. Computadores apenas o executam." não aparece neste bloco (temas próximos: p.23 "Somos Autores" e p.33 "clareza é fundamental").

### (c) Lacunas: conteúdo relevante deste bloco que a skill não cobre
Nomes (Cap.2):
- Pronunciáveis; buscáveis; tamanho do nome proporcional ao escopo; nomes de uma letra só em escopo minúsculo (p.30-32).
- Evitar codificações (notação húngara, prefixo m_, prefixo I em interface) (p.32-33).
- Evitar mapeamento mental; evitar l/O; evitar desinformação (accountList que não é List, hp/aix) (p.28-29, 33).
- Distinções significativas, sem números sequenciais e sem palavras vazias (a1/a2, ProductInfo/ProductData, NameString) (p.29-30).
- Classes = substantivos; métodos = verbos; get/set/is; factory estática no lugar de construtor sobrecarregado (p.34).
- Uma palavra por conceito; sem trocadilhos (add) (p.35).
- Domínio da solução x domínio do problema (p.35-36).
- Contexto significativo (extrair classe, ex.: Address, GuessStatisticsMessage) e não adicionar contexto desnecessário (prefixo GSD) (p.36-38).
- Renomear sem medo; o exemplo getThem -> getFlaggedCells -> Cell.isFlagged() (p.27-28), que a skill poderia usar como exemplo adicional.
Funções (Cap.3):
- Tamanho numérico (20 linhas, 150 colunas), blocos de uma linha, 1-2 níveis (p.43-44).
- Um nível de abstração por função, Regra Decrescente, parágrafos TO (p.44-46).
- Switch: aceitável uma vez, escondido em abstract factory com polimorfismo; violação de SRP/OCP (p.46-47).
- Nomes longos descritivos e consistência de fraseologia (p.48).
- Parâmetros: mônade (3 formas), booleanos (dividir em duas funções), díades e como convertê-las, tríades, parâmetros de saída (p.48-52).
- Efeitos colaterais e acoplamento temporal (checkPassword) (p.51-52).
- Separação comando-consulta (p.52-53).
- Extrair try/catch; "tratamento de erro é uma coisa só"; enum Error como chamariz de dependência (p.54-55).
- Programação estruturada: múltiplos return ok em funções pequenas; evitar goto (p.55-56).
- Processo: rascunho -> refino com testes (p.56). Útil para testing-tdd-expert e refactoring-expert.
Comentários (Cap.4):
- Catálogo completo de comentários bons e ruins (ver Cap.4 acima); a skill só tem 1 exemplo de ruim e 4 permitidos próprios (p.61-77).
- Comentários mentem/envelhecem; comentário impreciso é pior que nenhum (p.60); TODO deve ser varrido (p.65); comentário de chave de fechamento como sinal para reduzir função (p.73); autoria/histórico/código comentado vão para o controle de versão (p.69-70, 74-75); Javadoc em API pública sim, em código interno não (p.65, 77).
- Exemplo antes/depois GeneratePrimes -> PrimeGenerator (p.77-80) para references/before-after.md.
Cap.1:
- Regras de Beck/Jeffries (testes passam, sem duplicação, expressividade, mínimo de entidades) (p.20).
- Custo da bagunça e curva de produtividade; falso dilema prazo x qualidade (p.14-16).
- Leitura:escrita 10:1 (p.23); definições de código limpo (Stroustrup, Booch, Thomas, Feathers, Cunningham) (p.17-21); janelas quebradas (p.17).
- Aviso do próprio livro: é uma "escola" e algumas recomendações podem ser contraditórias com outras (p.22); a skill usa tom absoluto ("Rejeite soluções que...").
Para outros artefatos:
- refactoring-expert: Extrair Método e "mudar nome várias vezes" (p.20), substituição de switch por polimorfismo (p.46-47), refatorar com testes (p.56), Regra do Escoteiro (p.24).
- testing-tdd-expert: código sem testes não é limpo (p.19), regra 1 de Beck (p.20), difícil testar muitos argumentos (p.49), rascunho refinado com testes (p.56). Sem catálogo de testes limpos neste bloco.
- code-review-expert: catálogos de comentários ruins (p.65-77) e de nomes ruins (Cap.2) são checklists prontos.

---

## Checklist de cobertura
- Primeira página lida: PDF 1
- Última página lida: PDF 80 (confirmado por grep: último marcador "=== PDF PAGINA 80 ===" na linha 3699, arquivo com 3743 linhas)
- Páginas sem texto útil ou ilegíveis: PDF p.1 (capa), p.7 (figura WTFs/min ilegível; só legenda), p.10 (nota de capa), p.9 (agradecimentos). Boxes das citações de autores (p.17-21) com texto de ilustração misturado, mas o texto das citações é legível.
- Problemas de extração observados: código-fonte quase todo corrompido (Listagens 2-1, 2-2, 3-1, 3-2, 3-3, 3-4, 3-5, 3-6, 3-7, 4-1 a 4-8); palavra "abstração" frequentemente omitida em Cap.3; texto cortado entre PDF p.50 e p.51 (provável perda da seção sobre objetos como argumentos/listas/verbos-chave); Listagem 3-5 (Employee factory) incompleta; remissões a heurísticas entre colchetes (ex.: "[G34]", "[623]") possivelmente corrompidas (não reconstruídas); rodapés/notas misturados no fim de páginas; números de página e cabeçalhos "Capítulo N: ..." misturados no texto.
- Capítulos/seções cobertos integralmente: Prefácio, Introdução (estrutura), Cap.1, Cap.2, Cap.3 (exceto o trecho perdido citado), Cap.4 (a bibliografia final [KP78] fecha o capítulo no PDF p.80).
- Capítulos/seções que continuam em outro bloco: nenhum capítulo cortado ao meio; o Cap.5 (Formatação) começa após PDF p.80. Referências a outros capítulos: Cap.3 menciona Listagem 4.7 (p.77) e heurística G34/G23.
