# Fontes e rastreabilidade

Páginas indicam o marcador "PDF PAGINA N" do texto extraído de cada livro, não a numeração impressa.

Livros:

- Goodliffe: Pete Goodliffe, *Como ser um Programador Melhor* (tradução de *Becoming a Better Programmer*, Novatec).
- Fowler: Martin Fowler, *Refatoração* (edição em português).

## Regras atribuídas aos livros

| Regra/ponto da skill | Livro | Capítulo/seção | Páginas (PDF) | Citação curta (opcional) |
|---|---|---|---|---|
| Caracterizar o bug primeiro: reduzir ao menor conjunto de passos de reprodução, separar detalhes externos | Goodliffe | Cap. 10, Caça aos bugs | 119 | "Reduza o bug ao conjunto mais simples possível de passos para reproduzi-lo. Isso é vital." |
| Focar um único problema (não misturar duas falhas relacionadas) | Goodliffe | Cap. 10 | 119-120 | |
| Determinar se é repetível: frequência, configuração, tipo de máquina, periféricos | Goodliffe | Cap. 10 | 120 | |
| Com passos de reprodução definidos, a maior parte da batalha está vencida | Goodliffe | Cap. 10 | 120 | |
| Dois fatores definem a dificuldade: como reproduzir e o intervalo entre a causa e a percepção; a maioria dos bugs cai em minutos se abordada com método | Goodliffe | Cap. 10 | 119 | |
| Relato ambíguo: trabalhar com quem o gerou para reproduzir de forma confiável e saber quando está resolvido | Goodliffe | Cap. 21, relatórios de falha | 264 | |
| Priorizar falhas com gerentes, especialistas de produto e clientes; não mergulhar em cada uma sem critério | Goodliffe | Cap. 21 | 263 | |
| Teste de unidade reproduzível é harness de depuração mais fácil que o sistema completo | Goodliffe | Cap. 10 | 122 | |
| Armadilhas: asserções, verificação de invariantes e logs entre ponto correto e ponto inválido | Goodliffe | Cap. 10 | 120 | |
| Asserções e logs (mesmo simples) são ferramentas eficazes; manter, sem poluir com logging inútil | Goodliffe | Cap. 10 | 120-121 | |
| Divisão binária do espaço do problema (log n em vez de n); combinar com armadilhas | Goodliffe | Cap. 10 | 121 | "Faça divisões binárias nos espaços dos problemas para obter resultados mais rápidos." |
| Arqueologia no controle de versões: achar ponto sem o bug e avançar, por bisseção, até a mudança culpada | Goodliffe | Cap. 10 | 121-122 | |
| `git bisect` automatiza a divisão binária (nota de rodapé) | Goodliffe | Cap. 10, nota 3 | 130 | |
| Commits pequenos, frequentes e atômicos facilitam achar a mudança que causou a falha | Goodliffe | Cap. 10; Cap. 20, Controle eficiente de versões | 122; 244-245 | |
| Não misturar mudança de layout e de funcionalidade no mesmo commit | Goodliffe | Cap. 20 | 245 | |
| Olhar a mudança entre a última execução verde dos testes e o código atual; testes executados com frequência encurtam a busca | Fowler | Cap. 2, Testes; Cap. 4, Escrevendo testes | 91; 127 | |
| Suíte de testes como detector de bugs que reduz o tempo para achá-los; a maior parte do tempo do programador vai para depuração | Fowler | Cap. 4 | 126-127 | |
| Remover o que não contribui: desabilitar threads, desconectar acoplamentos indiretos, pular blocos; se o bug persiste, o palpite estava certo | Goodliffe | Cap. 10 | 124 | |
| Bug difícil tratado como método científico: hipótese, experimentos, execução, validação da teoria | Goodliffe | Cap. 14, Desenvolvimento de software é... uma ciência | 193 | |
| Desenvolvimento não é baseado em tentativa e erro nem em juntar pedaços aleatórios até parecer funcionar | Goodliffe | Cap. 14 | 192 | |
| Debugger: passo a passo, observar variáveis, breakpoints condicionais, alterar valores; usar nos momentos adequados | Goodliffe | Cap. 10 | 123-124 | |
| Excesso de confiança no debugger leva a focar no micro e perder o macro | Goodliffe | Cap. 10 | 123 | |
| Escrever antes da correção um teste que ilustre o problema; exige disciplina; evita o retorno do bug | Goodliffe | Cap. 10 | 122-123 | |
| Para corrigir bug de produção, escrever antes um teste de unidade que falha e mostra a causa; pode revelar outras falhas; depois adicioná-lo à suíte | Goodliffe | Cap. 11, É hora de testar | 139 | |
| Ao receber o relato de um bug, começar por um teste que o evidencie; perguntar que lacunas da suíte ele revela | Fowler | Cap. 4 | 143 | "Ao receber o relatório de um bug, comece escrevendo um teste de unidade que exponha o bug." |
| Código não testado é terreno fértil de bugs; sem teste cobrindo a parte, não se pode confiar que funcione | Goodliffe | Cap. 10 | 122 | "Um código não testado é um campo de reprodução de bugs." |
| Testes no processo de build para que falhas não sejam ignoradas; testes commitados junto com o código | Goodliffe | Cap. 11 | 140 | |
| Corrigir a causa raiz, não o sintoma; esparadrapo adiciona imperfeição e não torna o código simples | Goodliffe | Cap. 16, Mantenha a simplicidade | 211-212 | "Aplique correções de bugs à causa-raiz, e não nos locais em que os sintomas se manifestam." |
| Correção apropriada pode exigir ajustar APIs, refatorar lógica ou rever suposições que não se sustentam | Goodliffe | Cap. 16 | 211 | |
| Suposições implícitas reduzem a simplicidade; explicitar as de design | Goodliffe | Cap. 16 | 212 | |
| Não se apressar após corrigir: problemas relacionados, padrão repetido em outros pontos, reforçar o sistema | Goodliffe | Cap. 10 | 125-126 | |
| Anotar as áreas com mais falhas (hot spots) e considerar reescrita, revisão profunda ou mais testes | Goodliffe | Cap. 10 | 126 | |
| Corrigir bugs o mais rápido possível; "problema conhecido" leva à síndrome da janela quebrada e mascara causas de outros bugs | Goodliffe | Cap. 10 | 124-125 | |
| Verificar depois da correção que a falha não regrediu (falha corrigida é conferida novamente) | Goodliffe | Cap. 21 | 263 | |
| Estratégias oblíquas: pausa e afastar-se do teclado; explicar o problema a outra pessoa ou ao "patinho de borracha" | Goodliffe | Cap. 10 | 125 | |
| Bugs não reproduzíveis: registrar fatores contribuintes e buscar padrões; tirar conclusões e registrar mais dados | Goodliffe | Cap. 10 | 126 | |
| Bugs não reproduzíveis: mais logs e asserções em versões beta ou oficiais para coletar dados em campo; soak tests automatizados | Goodliffe | Cap. 10 | 126-127 | |
| Fontes de intermitência: threads (debugger e logging alteram o tempo; build de debug difere do release; "Heisenbugs"), rede, velocidade de armazenamento perto de timeouts, corrupção de memória, estado global e singletons | Goodliffe | Cap. 10 | 127-128 | |
| Para corrupção de memória, arqueologia do controle de versões costuma ser o caminho mais fácil | Goodliffe | Cap. 10 | 128 | |
| Erros de funções chamadas, exceções que vazam recurso ou deixam estado inválido, concorrência e encerramento são fontes de bugs | Goodliffe | Cap. 9, Espere pelo inesperado | 111-113 | "O “inesperado” não é o incomum. É o material com que os bugs são feitos." (p. 113) |
| Erro ignorado produz código frágil com falhas difíceis de identificar; `catch` vazio engole erros | Goodliffe | Cap. 8, Não ignore esse erro! | 107 | |
| Registrar o erro em log não basta se ninguém lê o log | Goodliffe | Cap. 8 | 108 | |
| Prevenção: design, revisões, pares, testes (TDD), asserções, programação defensiva, cobertura | Goodliffe | Cap. 10 | 118 | |
| Não escrever código "esperto": depurar é mais difícil que escrever | Goodliffe | Cap. 10 | 118 | |
| Passos pequenos; em caso de bug, desfazer o último passo e dar passos menores (no contexto de refatoração) | Fowler | Cap. 5, Apresentação do catálogo | 146 | |
| Cada refatoração é uma pequena alteração; se a falha não for achada, restaurar a última versão em funcionamento do controle de versões | Fowler | Cap. 2, Testes | 90 | |

## Convenções desta skill (sem base direta no livro)

Estas escolhas são preferências de método. Não atribua ao livro.

- Ordem dos passos como "reproduzir, isolar, hipótese, experimento, teste que falha, correção, verificação" em sete etapas numeradas (cada elemento tem base no livro; o encadeamento exato é desta skill).
- Escrever a hipótese com a predição (o que se vê se verdadeira e se falsa) antes do experimento.
- Mudar uma variável por experimento (o livro apoia foco em um problema por vez e passos pequenos, mas não formula a regra assim).
- Tabela de registro de evidência (hipótese, predição, experimento, resultado, conclusão) e o registro do ambiente e do comando exato de reprodução.
- Limite de tempo para decidir escalar e o dossiê entregue ao escalar.
- Leitura de stack trace em Java (primeiro frame próprio, cadeia de `Caused by`, perda de causa ao relançar).
- Notas de Java sobre `assert` e verificações explícitas, comandos de `git bisect`, e tudo em `exemplos-polyglot.md`.
- Exigir execução real (teste, programa, debugger ou log) antes de afirmar causa ou correção, e verificar que o teste novo falha pelo motivo descrito.
- Separar a correção da causa de refatorações maiores em commits distintos.
- Comportamento esperado da skill como mentor (hipóteses com predição, pedir a saída do experimento, explicar a causa antes do patch).
- O exemplo Java do pedido e do cupom é original e ilustrativo.

## Base externa, não lida nos PDFs

Estas bases justificam o desenho da skill e não foram verificadas contra o texto original pelo autor desta skill. Não há números, títulos ou detalhes além do identificador.

- arXiv 2310.01798: base externa, não lida nos PDFs. Fundamenta a exigência de verificação externa (execução, teste) na skill, porque modelos de linguagem não se autocorrigem de forma confiável sem feedback externo.
- Anthropic, janeiro de 2026: base externa, não lida nos PDFs. Fundamenta o desenho em que a skill conduz o desenvolvedor por hipóteses e evidências em vez de entregar o patch, porque delegar a depuração à IA prejudica o aprendizado de quem desenvolve.

## O que ficou de fora

- Ferramentas de memória para C e C++ citadas no livro (Cap. 10, p. 123): fora do escopo das linguagens da skill.
- Custo econômico da depuração e histórias pessoais do autor (Cap. 10, p. 117): não orientam a prática.
- Cap. 17 (Use o seu cérebro): não foi usado como base de regra.
- Cap. 15, p. 204: a exigência de passos de reprodução em relatos de bug aparece apenas como exemplo hipotético de regra de equipe, não como recomendação do autor, por isso não foi usada.
