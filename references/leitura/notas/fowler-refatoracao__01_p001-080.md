# Notas: Fowler, Refatoração (2ª ed., Novatec 2019, JS) — bloco 01, PDF p.1-80

Obs.: "impr." (número impresso) não aparece nas páginas do bloco; só o marcador PDF PAGINA N. Todas as páginas citadas abaixo são PDF.

### Front matter: capa, copyright, dedicatória (PDF p.1-4)
Capa/folha de rosto (p.2: "Refatoração - Aperfeiçoando o design de códigos existentes", 2ª ed., Martin Fowler com contribuições de Kent Beck, Novatec), copyright/tradução (p.3), dedicatória (p.4). p.1 vazia.
Relevância: todos os artefatos: NENHUMA.
Decisão sugerida: descartar (metadado; só útil para referência bibliográfica: tradução Lúcia A. Kinoshita, original Addison-Wesley 2019).

### Sumário (PDF p.5-9) — registro estrutural, sem detalhar
Estrutura do livro (útil para planejar os próximos blocos):
- Cap.1 Refatoração: primeiro exemplo. Cap.2 Princípios da refatoração. Cap.3 "Maus cheiros" no código. Cap.4 Escrevendo testes. Cap.5 Apresentação do catálogo. Cap.6-12 catálogo.
- Cap.3 lista 24 smells (nomes PT, p.5-6): Nome misterioso; Código duplicado; Função longa; Lista longa de parâmetros; Dados globais; Dados mutáveis; Alteração divergente; Cirurgia com rifle; Inveja de recursos; Agrupamentos de dados; Obsessão por primitivos; Switches repetidos; Laços; Elemento ocioso; Generalidade especulativa; Campo temporário; Cadeias de mensagens; Intermediário; Trocas escusas; Classe grande; Classes alternativas com interfaces diferentes; Classe de dados; Herança recusada; Comentários.
- Cap.4: Importância de um código autotestável; Código de exemplo; Um teste inicial; Acrescente outro teste; Modificando o fixture; Sondando os limites; Muito além disso.
- Cap.5: Formato das refatorações; Escolha das refatorações.
- Cap.6 Primeiro conjunto (p.7): Extrair função; Internalizar função; Extrair variável; Internalizar variável; Mudar declaração de função; Encapsular variável; Renomear variável; Introduzir objeto de parâmetros; Combinar funções em classe; Combinar funções em transformação; Separar em fases.
- Cap.7 Encapsulamento (p.7): Encapsular registro; Encapsular coleção; Substituir primitivo por objeto; Substituir variável temporária por consulta; Extrair classe; Internalizar classe; Ocultar delegação; Remover intermediário; Substituir algoritmo.
- Cap.8 Movendo recursos (p.7): Mover função; Mover campo; Mover instruções para uma função; Mover instruções para os pontos de chamada; Substituir código internalizado por chamada de função; Deslocar instruções; Dividir laço; Substituir laço por pipeline; Remover código morto.
- Cap.9 Organizando dados (p.7-8): Separar variável; Renomear campo; Substituir variável derivada por consulta; Mudar referência para valor; Mudar valor para referência.
- Cap.10 Simplificando lógicas condicionais (p.8): Decompor condicional; Consolidar expressão condicional; Substituir condicional aninhada por cláusulas de guarda; Substituir condicional por polimorfismo; Introduzir caso especial; Introduzir asserção.
- Cap.11 Refatorando APIs (p.8): Separar consulta de modificador; Parametrizar função; Remover argumento de flag; Preservar objeto inteiro; Substituir parâmetro por consulta; Substituir consulta por parâmetro; Remover método de escrita; Substituir construtor por função de factory; Substituir função por comando; Substituir comando por função.
- Cap.12 Lidando com herança (p.8-9): Subir método; Subir campo; Subir corpo do construtor; Descer método; Descer campo; Substituir código de tipos por subclasses; Remover subclasse; Extrair superclasse; Condensar hierarquia; Substituir subclasse por delegação; Substituir superclasse por delegação. Depois: Bibliografia.
Relevância: refactoring-expert: ALTA (mapa do catálogo completo com nomes PT/EN para os blocos seguintes); api-design-expert: MÉDIA (Cap.11 é o capítulo de APIs, lista de 10 refatorações); testing-tdd-expert: MÉDIA (Cap.4); code-review-expert: ALTA (lista dos 24 smells).
Decisão sugerida: usar como índice de cobertura para conferir os blocos seguintes; nomes PT/EN em refactoring-expert/references/catalogo.md.

### Apresentação da primeira edição (Erich Gamma) (PDF p.10-11)
Resumo: prefácio de terceiros. Refatoração feita informalmente é arriscada; deve ser sistemática. O catálogo traz, para cada refatoração, motivação e mecanismo.
Conceitos e regras:
- Refatorar ad hoc é arriscado (pode introduzir bugs sutis e custar dias/semanas); por isso deve ser sistemática [p.10].
- Padrões de projeto oferecem alvos para refatorações, mas identificar o alvo é só parte; transformar o código até o alvo é outro desafio [p.10].
- Cada refatoração do catálogo descreve motivação e mecanismo; mesmo as "óbvias" (Extrair método, Mover campo) exigem conhecer o mecanismo para refatorar com disciplina [p.10-11].
- Aplicar as refatorações um passo pequeno de cada vez reduz o risco e a tensão; aumenta a confiança no código resultante [p.11].
Relevância: refactoring-expert: MÉDIA (justifica o formato motivação+mecanismo; disciplina de pequenos passos).
Decisão sugerida: descartar o restante; usar só a ideia "refatoração sistemática, passo a passo" como princípio.

### Prefácio (PDF p.12-17)
Resumo: história do consultor (Fowler) cujo projeto falhou por código complexo demais para depurar/ajustar, enquanto Kent Beck reiniciou o projeto com refatoração contínua. Define refatoração, descreve o conteúdo do livro e como lê-lo.
Conceitos e regras:
- Definição de refatoração: alterar a estrutura interna sem mudar o comportamento externo; maneira disciplinada de reorganizar, minimizando bugs; é melhorar o design depois que o código foi escrito [p.13].
- Inverte a visão tradicional de que o design vem antes e depois decai: partindo até de design caótico, pequenos passos simples (mover campo, extrair trecho de método, subir/descer em hierarquia) acumulam melhoria radical [p.14].
- Design deixa de ser todo prévio e passa a ser contínuo durante o desenvolvimento [p.14].
- Estrutura do livro: Cap.1 exemplo; Cap.2 princípios; Cap.3 smells (com Kent Beck); Cap.4 testes; restante = catálogo (não exaustivo, mas com as refatorações essenciais) [p.14-15].
- O catálogo serve de lembrete de como fazer a refatoração de modo seguro, passo a passo [p.15].
- Exemplos em JavaScript (escolhido pela legibilidade); técnicas valem para qualquer linguagem; refatorações específicas de JS (callbacks para promises, async/await) estão fora do escopo [p.15-16].
- Como ler: entender o que é = Cap.1; por que = Cap.1-2; onde refatorar = Cap.3; para refatorar de fato = Cap.1-4 e depois o catálogo como referência [p.17].
- Nomear as refatorações cria vocabulário comum (ex.: Extrair função, Separar em fases) e ajuda a escolher refatorações automatizadas [p.17].
- Origem: Ward Cunningham, Kent Beck (uso como base do desenvolvimento), Ralph Johnson, Bill Opdyke (tese), John Brant e Don Roberts (Refactoring Browser, Smalltalk) [p.17-18]. Kent Beck concebeu a ideia de Maus Cheiros [p.18].
- Refatorações automatizadas nas IDEs facilitam (ex.: renomear função muito usada com uma tecla) [p.18].
Citações curtas de prova:
- "Aperfeiçoar o design depois que ele foi escrito." [p.13]
O que este trecho NÃO diz: não lista as refatorações nem os smells (só os apresenta); agradecimentos (p.18-19) sem conteúdo técnico.
Relevância: refactoring-expert: MÉDIA (definição e filosofia); testing-tdd-expert: BAIXA; api-design-expert: NENHUMA; code-review-expert: BAIXA.
Decisão sugerida: usar a definição em refactoring-expert/SKILL.md (Mentalidade Principal); descartar história e agradecimentos.

### Cap.1 Refatoração: primeiro exemplo (PDF p.20-70)
Resumo: exemplo único e extenso: função `statement` que gera a conta de uma companhia de teatro (peças tragédia/comédia, valor por plateia, créditos por volume). Mostra, passo a passo, decomposição em funções, separação em duas fases e introdução de uma calculadora polimórfica, sempre com compilar-testar-commit a cada passo minúsculo. Exemplo é de código JS; o que importa para as skills é o processo e as regras.

Situação inicial (p.21-23): uma função única com switch por tipo de peça, acumuladores (`totalAmount`, `volumeCredits`), variável `format` temporária, comentários, mistura cálculo e formatação. Saída de teste: strings de texto da conta.

Conceitos e regras de processo:
- Quando refatorar: o código "tolerável" não precisa ser refatorado se não vai mudar; a necessidade surge quando há mudança a fazer (nova saída HTML; novos tipos de peça) [p.23-25]. Sistema mal estruturado é difícil de alterar: difícil identificar o que mudar e como interage, logo mais bugs [p.23].
- Regra de ouro (refatoração preparatória): se a funcionalidade nova é difícil de acrescentar porque o código não está estruturado, refatore antes para facilitar, e então acrescente [p.23-24].
- Copiar e colar a função (`htmlStatement`) é rejeitado: duplicação obriga a manter dois lugares consistentes; ameaça em programa de vida longa [p.24].
- Primeiro passo SEMPRE: garantir um conjunto robusto de testes para a seção de código; testes devem ser autoverificáveis (verde/vermelho, comparação com valores de referência verificados manualmente) e rápidos [p.25].
- Testes como detector de bugs: escrever o mesmo duas vezes (código e teste) exige errar de modo consistente nos dois para enganar; custo do teste se paga com menos depuração [p.25-26].
- Teste após cada mudança; erro fica restrito a uma pequena modificação, fácil de localizar; muitas mudanças de uma vez geram depuração complexa. "A essência do processo: pequenas modificações e teste após cada uma" [p.29].
- Commit local após cada refatoração bem-sucedida, para poder voltar a um estado funcional; depois agrupar em commits mais significativos antes de enviar ao repositório compartilhado [p.29].
- Se um teste falha e o problema não é visível/corrigível de imediato: reverter ao último bom commit e refazer em passos menores [p.43]. Diante de dificuldade, a primeira reação é dar passos menores [p.43].
- Persistir o insight no código: a compreensão está na mente (armazenagem volátil); refatorar transfere essa compreensão para o código (ex.: extrair função com nome que diz o que faz) [p.27, p.69].
- Convenções de nomes do autor: valor de retorno de função se chama `result`; parâmetros incluem o nome do tipo com artigo indefinido (`aPerformance`) em linguagem dinamicamente tipada [p.30-31].
- Nomear é importante e difícil: use o melhor nome do momento e renomeie depois; segunda passada costuma revelar o nome certo; nomes bons evitam ler o corpo [p.40]. Nome temporário aleatório (`appleSauce`) quando o nome ideal colide com variável existente [p.44].
- Remover comentários enganosos/desnecessários após extrair a função [p.37] (relação com smell Comentários).
- Preferir tratar dados como imutáveis; copiar o registro (`Object.assign({}, ...)`, cópia rasa) em vez de modificar a entrada [p.50].
- Variáveis temporárias criam muitos nomes de escopo local e complicam extrações; remova-as antes de extrair (Replace Temp with Query / Inline Variable) [p.32, p.35, p.38].
- Desempenho: repetir cálculo/laço após a refatoração raramente importa; programadores avaliam mal o desempenho real; é mais fácil otimizar código bem fatorado; conselho: ignorar desempenho durante a refatoração e ajustar depois, mesmo que implique desfazer alguma refatoração [p.35, p.42-43].
- Código maior pode ser melhor: o código cresceu de 44 para 70 linhas (sem contar HTML), mas separou cálculo de layout e eliminou duplicação; "concisão é a alma da perspicácia, mas clareza é a alma de um software capaz de evoluir" [p.57].
- Regra do acampamento: deixe a base de código mais saudável do que encontrou; nunca será perfeita, mas deve ficar melhor [p.57]. Equilibrar refatorações possíveis com acréscimo de funcionalidade [p.57].
- Teste de bom código: facilidade com que pode ser alterado; código óbvio, onde se localiza e altera rápido sem introduzir erros [p.69].
- Ritmo: passos minúsculos, cada um deixando código funcionando; é mais rápido porque o código nunca quebra e os passos se combinam em mudanças grandes [p.70].
- Ao refatorar, a estrutura de dados intermediária permite ignorar o código de formatação e testar a estrutura intermediária (sugere acrescentar testes para ela) [p.58].

Sequência de refatorações do exemplo, com mecânica observada (usar como "receita" ilustrativa):

(a) Extrair função (Extract Function) do switch -> `amountFor` [p.26-29]. Passos descritos: identificar o trecho que representa um comportamento; observar variáveis que saem de escopo (aqui `perf`, `play`, `thisAmount`); as lidas e não modificadas viram parâmetros; a variável modificada é inicializada dentro da função extraída e devolvida; chamar a função no lugar; compilar-testar-commit; depois renomear variáveis internas (`thisAmount`->`result`, `perf`->`aPerformance`), um nome por vez com teste [p.27-31]. Extração é refatoração comum de ser automatizada pelas IDEs [p.30].
(b) Substituir variável temporária por consulta (Replace Temp with Query) para `play` [p.32-33]: extrair o lado direito da atribuição em função (`playFor`); testar; Internalizar variável (Inline Variable) para trocar todas as ocorrências por chamadas; testar; então Mudar declaração de função para remover o parâmetro `play` de `amountFor`, em dois passos (primeiro usar a nova função dentro, depois remover o parâmetro) [p.33-35]. Observação sobre desempenho (chama 3x em vez de 1x) [p.35].
(c) Inline Variable em `thisAmount` (atribuída uma vez) [p.35-36].
(d) Extrair `volumeCreditsFor` [p.36-38]: acumulador vira "sombra" inicializada na função extraída e devolvida; renomear variáveis um por um.
(e) Remover variável `format`: substituir variável de função por função declarada (o autor afirma não ter nomeado essa refatoração no catálogo por ser simples e rara) e renomear para `usd` via Mudar declaração de função; mover a divisão por 100 para dentro (dinheiro em centavos inteiros evita ponto flutuante; a função de formatação cuida da divisão) [p.38-40].
(f) Remover acumulador `volumeCredits`, em 4 passos pequenos, cada um com compilar-testar-commit [p.40-43]: 1) Dividir laço (Split Loop) para isolar a acumulação; 2) Deslocar instruções (Slide Statements) para aproximar a declaração da variável do laço; 3) Extrair função (`totalVolumeCredits`); 4) Internalizar variável. Mesma sequência para `totalAmount` (função extraída com nome temporário, depois renomeada) [p.43-45].
(g) Status: `statement` ficou com 7 linhas, só orquestra exibição; cálculos em funções auxiliares aninhadas [p.45-47].
(h) Separar em fases (Split Phase) cálculo vs. formatação [p.47-54]: 1) Extrair função de toda a fase 2 (`renderPlainText`); 2) criar objeto de dados intermediário (`statementData`) e passá-lo como argumento; 3) mover um dado de cada vez para o intermediário (cliente, apresentações) e remover parâmetros desnecessários de `renderPlainText`; 4) "enriquecer" cada apresentação (`enrichPerformance`, cópia rasa) com play, amount, volumeCredits, movendo as funções (Mover função) de render para a fase 1; 5) mover os totais; 6) Substituir laço por pipeline (`reduce`) [p.53]; 7) extrair a fase 1 em `createStatementData`, mover para arquivo próprio [p.53-54]. Resultado: `htmlStatement` escrito sem duplicar cálculos [p.54-55]. Preferir passar parâmetros explícitos às funções de total em vez de usar variável do escopo [p.53].
(i) Calculadora polimórfica [p.58-68]: motivo = novos tipos de peça mudariam condicionais nos cálculos; condicional "tende a se enfraquecer" com novas alterações a menos que reforçada por estrutura da linguagem [p.58]. Plano: Substituir condicional por polimorfismo, exigindo antes uma hierarquia [p.58-59]. Passos: 1) criar classe `PerformanceCalculator` (recebe performance e play) [p.60-61]; 2) Mover função (passo a passo): copiar a lógica para o novo contexto, adaptar (`aPerformance`->`this.performance`, `playFor`->`this.play`), "compilar" para pegar erros de sintaxe, transformar a função original em delegação para a nova, compilar-testar-commit, depois Internalizar função (Inline Function) no chamador [p.61-63]; repetir para `volumeCredits` [p.63]; 3) Substituir código de tipos por subclasses: trocar construtor por função de factory (Replace Constructor with Factory Function), pois construtores JS não devolvem subclasses; criar `TragedyCalculator`/`ComedyCalculator` e a função de criação escolhe pela tipo [p.63-64]; 4) Substituir condicional por polimorfismo: mover o caso de tragédia para a subclasse (opcional: lançar erro "paranoico" no caso original para provar que foi sobrescrito), depois comédia; deixar na superclasse um "lápide" (`throw new Error('subclass responsibility')`) [p.64-66]; 5) para `volumeCredits`, deixar o caso mais comum na superclasse como default e sobrescrever só as variações (comédia chama `super` e soma) [p.66].
(j) Insight sobre quando usar subclasses: a verificação do tipo saiu de duas funções para um único ponto (`createPerformanceCalculator`); quanto mais funções dependem do mesmo polimorfismo, mais vale a abordagem; adicionar tipo = nova subclasse + registrar na função de criação [p.68]. Alternativa: devolver a própria calculadora em vez de copiar dados para estrutura intermediária (depende de quem consome) [p.68].
(k) Balanço (p.69): 3 etapas principais: decomposição em funções aninhadas; Split Phase; calculadora polimórfica. Sequência comum: ler código, obter insight, usar refatoração para passar o insight para o código, o que facilita novos insights (ciclo de feedback positivo) [p.69]. As primeiras etapas visam principalmente entender o código [p.69].

Citações curtas de prova:
- "Antes de começar a refatorar, certifique-se de que você tenha um conjunto de testes robusto. Esses testes devem ser conferidos automaticamente." [p.25]
- "A refatoração altera os programas em passos pequenos, de modo que, se você cometer um erro, será fácil localizar o bug." [p.29]
- "sempre deixe a base de código mais saudável do que estava quando você a encontrou" [p.57]
- "O verdadeiro teste para um bom código é a facilidade com que ele pode ser alterado." [p.69]
- "Qualquer tolo consegue escrever códigos que um computador possa entender." (completa na p.31: bons programadores escrevem código que humanos entendem) [p.31]

O que este trecho NÃO diz: não é o catálogo formal; os mecanismos de Extrair função, Mover função, Separar em fases etc. aparecem aqui só de forma narrativa (os passos formais estão nos Cap.6-8, em outros blocos). Não discute testes de unidade em profundidade (Cap.4). O exemplo é em JS com aninhamento de funções e classes ES2015; detalhes de sintaxe não são universais. Código do exemplo não deve ser copiado para as skills.
Relevância para os artefatos candidatos:
- refactoring-expert: ALTA — ritmo (teste->mudança mínima->teste->commit), regras de reversão, sequência Extract/Inline/Split Loop/Slide/Split Phase/Replace Conditional with Polymorphism, quando refatorar (preparatória), regra do acampamento.
- testing-tdd-expert: ALTA — testes autoverificáveis como pré-requisito, rede de segurança, testes rápidos, comparação com valores de referência verificados; sugestão de testar a estrutura de dados intermediária.
- api-design-expert: BAIXA — só menções a Mudar declaração de função em dois passos e à factory; sem tratamento de APIs.
- code-review-expert: MÉDIA — critérios implícitos (função longa, temporárias, duplicação, comentários desnecessários, condicional por tipo) e o critério "facilidade de alterar".
Decisão sugerida: usar em refactoring-expert (workflow e exemplo resumido de sequência de refatorações, em references/processo.md) e testing-tdd-expert (pré-requisito de testes); apenas resumo de 1 linha em code-review-expert.

### Cap.2 Princípios da refatoração (PDF p.71-80) [continua no próximo bloco: seções sobre quando refatorar, problemas, Yagni, desempenho etc. a partir da p.80]
Resumo: define refatoração (substantivo e verbo), a metáfora dos dois chapéus, justifica refatorar (design, compreensão, bugs, velocidade) e começa a tratar de quando refatorar (Regra dos Três, preparatória, para compreensão, coleta de lixo, planejada vs oportunista). O texto do bloco termina no meio da frase em "Refatorações planejadas e oportunistas" (p.80).

Conceitos e regras:
- Definição (substantivo): modificação na estrutura interna do software para torná-lo mais fácil de compreender e menos custoso de alterar, sem mudar o comportamento observável [p.71]. Definição (verbo): reestruturar software aplicando série de refatorações sem alterar comportamento observável [p.71].
- Refatoração não é "qualquer limpeza": é aplicação de pequenos passos que preservam o comportamento; o código não fica muito tempo quebrado e pode-se parar a qualquer momento [p.71-72]. Se o código ficou quebrado por dias, não estava refatorando [p.72].
- "Reestruturação" é o termo genérico para qualquer reorganização; refatoração é um tipo particular [p.72].
- Passos minúsculos são mais rápidos: combinam-se bem e não há tempo gasto com depuração [p.72].
- "Comportamento observável" é deliberadamente flexível: o código deve fazer o mesmo, mas desempenho/pilha de chamadas podem mudar; interfaces de módulos podem mudar (Mudar declaração de função, Mover função); bugs existentes devem permanecer (pode-se corrigir bugs latentes) [p.72].
- Diferença para otimização de desempenho: ambas mantêm funcionalidade; refatoração busca clareza/facilidade de alteração (pode deixar mais rápido ou lento); otimização busca só velocidade, aceitando código mais difícil [p.72-73].
- Dois chapéus (Kent Beck): acrescentar funcionalidade (não alterar código existente; progresso medido por novos testes passando) vs. refatorar (não adicionar funcionalidade, não adicionar testes salvo caso esquecido; alterar testes só para acomodar mudança de interface). Alternar de chapéu com consciência de qual está em uso [p.73].
- Por que refatorar [p.73-77]:
  - Melhora o design: sem refatoração o design decai com mudanças de curto prazo; perda de estrutura é cumulativa; eliminar duplicação (código diz tudo uma vez, só uma vez) é aspecto central; menos código facilita modificar corretamente (não esquecer o ponto "gêmeo") [p.73-74].
  - Torna o software mais fácil de entender: o leitor mais importante é o futuro desenvolvedor (frequentemente o próprio autor); colocar no código o que se precisaria lembrar [p.74-75].
  - Ajuda a encontrar bugs: ao esclarecer a estrutura, evidenciam-se pressupostos e bugs [p.75]. Citação de Kent Beck sobre bons hábitos [p.75].
  - Ajuda a programar mais rápido: equipes sem qualidade interna ficam lentas (remendos sobre remendos, "arqueologia"); boa modularidade reduz o que se precisa entender e a depuração [p.75-76]. Hipótese da Estamina no Design (Design Stamina Hypothesis): investir em bom design interno permite avançar mais rápido por mais tempo; o autor admite ser hipótese, não provada [p.77]. Há um pseudográfico (não extraído) que compara as duas trajetórias [p.76, imagem perdida na extração].
  - Refatoração muda o quadro "design antes do código": dá para melhorar o design de código existente, então o design evolui com o tempo; como é difícil fazer bom design antecipado, refatoração é essencial [p.77].
- Quando refatorar [p.77-80]:
  - Regra dos Três (Don Roberts): 1ª vez faz; 2ª vez similar, tolera duplicação com desconforto; 3ª vez, refatora [p.78].
  - Refatoração preparatória: melhor hora é logo antes de acrescentar funcionalidade; em vez de copiar função e trocar valores literais, aplicar Parametrizar função; analogia da rodovia (Jessica Kerr) [p.78]. Também ao corrigir bug: unificar trechos copiados ou separar atualização de consulta para facilitar a correção e reduzir novos bugs na área [p.78-79].
  - Refatoração para compreensão: sempre que precisar pensar para entender o código, perguntar se dá para refatorar para que a compreensão seja imediata; renomear variáveis, dividir função longa; transfere a compreensão da mente para o código e permite ver detalhes de design antes invisíveis (Ralph Johnson: limpar a sujeira da janela) [p.79-80].
  - Refatoração para coleta de lixo: ao perceber que o código faz certo de modo ruim (lógica confusa, funções quase idênticas a unificar por parametrização): se simples, fazer já; se mais trabalhoso, anotar e corrigir após a tarefa imediata; mesmo se demorar horas, deixar o código um pouco melhor a cada passagem; tarefa longa pode levar meses sem que o código fique quebrado [p.80].
  - Planejada vs oportunista: preparatória, compreensão e lixo são oportunistas (parte do fluxo ao acrescentar funcionalidade/corrigir bug); refatoração não é atividade separada, não se reserva tempo no plano para ela (o texto continua no próximo bloco) [p.80].
Citações curtas de prova:
- "Se alguém disser que seu código apresentava falhas durante alguns dias enquanto estava refatorando, pode ter certeza de que essa pessoa não estava refatorando." [p.72]
- "Refatoração (substantivo): uma modificação feita na estrutura interna do software para deixá-lo mais fácil de compreender e menos custoso para alterar" [p.71] (trecho curto)
- "na primeira vez que fizer algo, você simplesmente faz" [p.78] (Regra dos Três)
O que este trecho NÃO diz: não chega a "quando NÃO refatorar", problemas com refatoração, Yagni, desempenho como seção, origens, ferramentas automatizadas (estão a partir da p.80/próximo bloco). A seção "Refatorações planejadas e oportunistas" está truncada pelo corte do bloco (termina na p.80 no meio do parágrafo).
Relevância para os artefatos candidatos:
- refactoring-expert: ALTA — definição precisa, dois chapéus, tipos de refatoração oportunista, regra dos três, distinção refatoração vs reestruturação vs otimização, motivação.
- testing-tdd-expert: MÉDIA — chapéu de refatorar não adiciona testes nem muda comportamento; testes só mudam por mudança de interface.
- api-design-expert: BAIXA — só nota de que interfaces de módulos mudam como consequência de refatorações (Mudar declaração de função, Mover função).
- code-review-expert: MÉDIA — motivos de design (duplicação, legibilidade) como critério; refatoração para compreensão/lixo como feedback de revisão.
Decisão sugerida: usar em refactoring-expert/SKILL.md (definição, dois chapéus, quando refatorar) e references/principios.md; testing-tdd-expert: só a regra dos dois chapéus em 1-2 linhas.

---
## Catálogos neste bloco
Este bloco NÃO contém o catálogo de smells (Cap.3) nem as refatorações formalizadas (Cap.5-12), apenas:
- Lista de nomes no Sumário (acima, p.5-9).
- Aplicações narrativas das refatorações: Extract Function (p.26-30), Replace Temp with Query (p.32-33), Inline Variable (p.33, 35, 42), Change Function Declaration (p.33-34, 39-40, 61), Split Loop (p.40), Slide Statements (p.41), Split Phase (p.47-54), Move Function (p.50-51, 61-63), Replace Loop with Pipeline (p.53), Replace Type Code with Subclasses / Replace Constructor with Factory Function (p.63-64), Replace Conditional with Polymorphism (p.64-66), Parameterize Function (menção p.78). Mecânicas formais "Mecanismo" aguardam o bloco que cobre Cap.6-12.

## Checklist de cobertura
- Primeira página lida: 1
- Última página lida: 80 (último marcador `=== PDF PAGINA 80 ===` confirmado por Grep; arquivo termina na linha 3586, no meio da frase "a maior parte delas")
- Páginas sem texto útil ou ilegíveis: p.1 (vazia); p.3 (copyright); p.4 (dedicatória)
- Problemas de extração observados: indentação do código perdida (listagens com espaços uniformes); aspas/crases e `${` quebrados em um trecho (p.37, linha com `{format(...)}` sem `$`); pseudográfico da p.76 ausente (figura); caixas de texto (margens) intercaladas ao corpo; marcador "function statement…" em itálico aparece como texto simples; um "função aninhada de statement" tem lacunas pontuais ("nesse , mas") na p.28. Nenhum número impresso de página visível no bloco.
- Capítulos/seções cobertos integralmente: Sumário, Apresentação da 1ª ed., Prefácio, Cap.1 inteiro (p.20-70), Cap.2 de p.71 até a seção "Refatorações planejadas e oportunistas" (início).
- Capítulos/seções que continuam em outro bloco: Cap.2, a partir de "Refatorações planejadas e oportunistas" (p.80; truncado) e demais seções (problemas com refatoração, arquitetura e Yagni, processo de desenvolvimento, desempenho, origens, automação).
