# Notas: Fowler, Refatoração (2ª ed., JS), bloco 04 (PDF p.241-320)

Convenções: páginas = "PDF PAGINA N" do marcador. Número impresso do livro não está visível no texto extraído (não anotado). Nomes em português seguidos do original em inglês, como no livro. Todos os conceitos estão em paráfrase; código não foi reproduzido, só descrito.

Artefatos candidatos: (1) refactoring-expert, (2) testing-tdd-expert, (3) api-design-expert, (4) code-review-expert.

---

### Remover intermediário (Remove Middle Man) (PDF p.241-242) [continua do bloco anterior; só o final do exemplo]
Resumo: o trecho final mostra o exemplo: Person delega `manager` ao Department. Se muitas delegações simples se acumulam na classe, expõe-se o objeto delegado e os clientes passam a usá-lo diretamente.
Conceitos e regras:
- Mecânica ilustrada no exemplo: (1) criar um método de acesso ao objeto delegado (`department`); (2) migrar um cliente de cada vez para chamar o delegado diretamente; (3) quando todos migraram, remover o método de delegação da classe intermediária; repetir para outras delegações simples [p.241]
- Não há regra absoluta entre "ocultar delegado" e "remover intermediário": o contexto decide, e pessoas sensatas podem divergir. Algumas delegações podem ser mantidas por conveniência para o código cliente [p.241]
- Variação com refatoração automatizada: aplicar Encapsular variável (Encapsulate Variable) no campo delegado, de modo que o getter interno use o getter público, e depois Internalizar função (Inline Function) no método de delegação para substituir todas as chamadas de uma vez [p.241-242]
Citações curtas de prova: nenhuma.
O que este trecho NÃO diz: a motivação e o procedimento formal completo estão no bloco anterior (não neste).
Relevância: refactoring-expert: MÉDIA, complementa o par Ocultar delegado/Remover intermediário (Lei de Demeter tratada como julgamento); api-design-expert: BAIXA; testing-tdd-expert: NENHUMA; code-review-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert (references: mecânica de Remover intermediário, ao lado do bloco anterior).

---

### Substituir algoritmo (Substitute Algorithm) (PDF p.242-243)
Resumo: trocar o corpo de uma função por um algoritmo mais claro. O exemplo reescreve um laço com vários `if` em uma busca (`find`) sobre uma lista de candidatos com `includes`.
Conceitos e regras:
- Motivação: há várias maneiras de resolver o mesmo problema, e uma pode ser mais clara. Às vezes a refatoração decompõe algo complexo em partes simples; em outros casos é preciso remover o algoritmo inteiro e trocá-lo [p.243]
- Gatilhos: aprender mais sobre o problema e ver um jeito mais fácil; começar a usar uma biblioteca que duplica o código próprio; querer alterar o comportamento e perceber que um algoritmo diferente facilita a mudança [p.243]
- Pré-condição: decompor o método o máximo possível antes. Substituir um algoritmo grande e complexo é muito difícil; só simplificando antes a substituição fica controlada [p.243]
- Mecanismo: (1) organizar o código a ser substituído para que preencha uma função completa; (2) preparar testes usando somente essa função para capturar seu comportamento; (3) preparar o algoritmo alternativo; (4) executar verificações estáticas; (5) rodar testes comparando saída antiga e nova. Se iguais, terminou; se diferentes, usar o algoritmo antigo como comparação nos testes e na depuração [p.243]
Citações curtas de prova: nenhuma.
O que este trecho NÃO diz: não dá critérios de quando preferir substituir a refatorar em passos; o exemplo é mínimo.
Relevância: refactoring-expert: ALTA (entrada de catálogo com mecânica); testing-tdd-expert: MÉDIA (testes de caracterização da função inteira e comparação antigo vs. novo); api-design-expert: NENHUMA; code-review-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert (catálogo, mecânica); mencionar a técnica de comparar antigo vs. novo em testing-tdd-expert.

---

### Capítulo 8: Movendo recursos (PDF p.244-288) (introdução, p.244)
Resumo: o capítulo trata de mover elementos entre contextos: funções, campos, instruções; além de laços e código morto.
Conceitos e regras (índice do capítulo, p.244):
- Mover função (Move Function): move funções entre classes e módulos [p.244]
- Mover campo (Move Field): move campos [p.244]
- Mover instruções para uma função (Move Statements into Function) e Mover instruções para os pontos de chamada (Move Statements to Callers): movem instruções para dentro ou para fora de funções [p.244]
- Deslocar instruções (Slide Statements): move instruções dentro de uma função [p.244]
- Substituir código internalizado por chamada de função (Replace Inline Code with Function Call): remove duplicação reaproveitando função existente [p.244]
- Dividir laço (Split Loop): garante que cada laço faça uma só tarefa [p.244]
- Substituir laço por pipeline (Replace Loop with Pipeline): elimina o laço [p.244]
- Remover código morto (Remove Dead Code) [p.244]
Relevância: refactoring-expert: ALTA. Decisão: usar (catálogo).

---

### Mover função (Move Function) (PDF p.244-254) [anteriormente: Mover método / Move Method]
Resumo: mover uma função para o contexto (classe, módulo, função aninhada) onde ela se encaixa melhor, por modularidade e encapsulamento. A decisão raramente é fácil, e quanto mais difícil, menos importante tende a ser.
Conceitos e regras:
- Motivação: o coração do bom design é a modularidade, isto é, poder fazer a maioria das mudanças entendendo só uma parte pequena. É preciso agrupar elementos relacionados e deixar as ligações fáceis de achar. Como o entendimento evolui, é preciso mover elementos para refletir isso [p.245]
- Gatilho clássico: a função referencia mais elementos de outro contexto do que do atual. Movê-la para perto deles melhora o encapsulamento e reduz dependência de detalhes do módulo [p.245]
- Outros gatilhos: onde estão as chamadas ou onde será chamada na próxima melhoria; auxiliar aninhada que merece visibilidade própria; método mais usável em outra classe [p.245]
- Para decidir: olhar o contexto atual e o candidato; quem chama a função, o que ela chama, que dados usa. Frequentemente é preciso um novo contexto, criado com Combinar funções em classe (Combine Functions into Class) ou Extrair classe (Extract Class) [p.245-246]
- Postura: tente a função num contexto, sabendo que aprenderá se ela cabe; se não, mova depois [p.246]
- Mecanismo: (1) analisar todos os elementos usados pela função no contexto atual e ver se devem ir junto; se uma função chamada também deve ir, movê-la antes (em grupos, começar pela de menor dependência); se só a função de alto nível chama as subfunções, internalizá-las, mover e extrair de novo no destino; (2) verificar se é método polimórfico (considerar superclasses e subclasses); (3) copiar a função para o contexto final e adaptar (elementos do contexto original viram parâmetros ou referência ao contexto; muitas vezes renomear); (4) análise estática; (5) decidir como referenciar a função final a partir do contexto original; (6) transformar a original em função de delegação; (7) testar; (8) considerar Internalizar função na original. A delegação pode ficar indefinidamente, mas se o chamador acessa facilmente a função final, é melhor remover o intermediário [p.246-247]
- Exemplo 1 (função aninhada para o nível mais alto): copiar com nome temporário (ex.: prefixo `top_`) para distinguir; análise estática aponta símbolos indefinidos (passar `points` como parâmetro; mover junto as auxiliares `distance` e `radians`, antes aninhando-as para o linter/testes acusarem problemas, depois copiando); corpo original passa a chamar a copia (momento crucial de rodar testes); remover a original se tiver poucas chamadas locais; escolher o melhor nome para a função de nível mais alto (aqui `totalDistance`), usando Internalizar variável para evitar encobrimento. Se precisar manter a variável, renomeá-la (ex.: `totalDistanceCache`). Mover as auxiliares para o nível mais alto; o autor desconfia de funções aninhadas porque criam inter-relações ocultas entre dados, e em JS o sistema de módulos é a melhor ferramenta para controlar visibilidade [p.247-252]
- Exemplo 2 (entre classes): `overdraftCharge` de Account para AccountType porque diferentes tipos de conta terão algoritmos diferentes. Verificar o que ele usa (`daysOverdrawn` fica na conta, pois varia por conta); copiar o corpo para o destino; adaptar chamadas (`isPremium` vira chamada em `this`; `daysOverdrawn` passa como valor ou a conta inteira se muitos dados forem necessários); original vira delegação, depois pode ser internalizada [p.252-254]
Citações curtas de prova:
- "O coração de um bom design de software é a sua modularidade" [p.245]
- "quanto mais difícil for essa escolha, em geral menos importante ela será" [p.246]
O que este trecho NÃO diz: não oferece regra mecânica de coesão para decidir o destino; apenas heurísticas.
Relevância: refactoring-expert: ALTA (mecânica completa + heurísticas); testing-tdd-expert: MÉDIA (linter/análise estática e testes como feedback a cada passo da cópia); api-design-expert: MÉDIA (função/classe de delegação como ponte de migração); code-review-expert: MÉDIA (função que usa mais dados de outro contexto = sinal de mover, "inveja de recursos" no sentido da heurística do p.245, nome do smell não aparece aqui).
Decisão sugerida: usar em refactoring-expert (catálogo, mecânica, heurísticas de decisão).

---

### Mover campo (Move Field) (PDF p.254-260)
Resumo: mover um campo para a estrutura/objeto onde ele pertence. Parte da ideia de que estruturas de dados certas deixam o código simples e as erradas geram código só para lidar com dados ruins.
Conceitos e regras:
- Motivação: a força de um programa está nas estruturas de dados; erros de design inicial são normais porque se aprende sobre o domínio durante a programação; ao perceber que a estrutura está errada, corrigir é essencial, senão confunde o raciocínio e complica o código [p.254-255]
- Sinais de que um campo deve mudar de lugar: (a) sempre se passa um campo de um registro junto com outro registro para uma função; (b) mudança num registro obriga a mudar um campo de outro; (c) o mesmo campo é atualizado em várias estruturas, devendo ser atualizado uma só vez [p.255]
- Em geral Mover campo é parte de mudanças maiores. Depois de mover, pode ser melhor que clientes acessem pelo objeto final; às vezes é preciso refatorar padrões de uso antes de mover [p.255]
- Vale para classes e objetos; com classes é mais fácil porque os métodos de acesso encapsulam os dados e os clientes continuam funcionando; com registros simples é possível, mas mais complicado [p.256]
- Mecanismo: (1) garantir que o campo original está encapsulado; (2) testar; (3) criar campo (e acessores) no destino; (4) verificações estáticas; (5) garantir que existe referência do objeto original ao final (campo/método existente, método novo, ou campo novo, possivelmente temporário); (6) adaptar os acessores para usar o campo final (se o campo final é compartilhado, primeiro atualizar o setter para escrever em ambos e usar Introduzir asserção (Introduce Assertion) para detectar inconsistência, depois finalizar); (7) testar; (8) remover o campo original; (9) testar [p.256]
- Exemplo (taxa de desconto de Customer para CustomerContract): encapsular o campo (usa método `_setDiscountRate`, não setter público); adicionar campo e acessores no contrato; ao trocar os acessores o teste acusou erro porque o setter era chamado antes de criar o contrato no construtor, então voltou-se atrás e usou-se Deslocar instruções para reordenar; testou e trocou os acessores para o contrato [p.257-258]
- Registro simples: criar funções de acesso e migrar leituras/escritas; se imutável, pode atualizar os dois campos e migrar leituras gradualmente; preferir antes Encapsular registro (Encapsulate Record) para virar classe [p.258-259]
- Exemplo (para objeto compartilhado): taxa de juros da conta passa a vir do tipo de conta. Se contas do mesmo tipo já têm a mesma taxa, o comportamento observável não muda; se alguma tiver taxa diferente, deixa de ser refatoração. Verificar o banco de dados e/ou usar asserção no construtor, ou logar o problema, rodar por um tempo no sistema, e só então remover a atualização por conta [p.259-260]
Citações curtas de prova:
- "estruturas de dados ruins resultam em muito código cuja tarefa é apenas lidar com dados ruins" [p.255] (paráfrase próxima; texto: "Contudo, estruturas de dados ruins resultam em muito código cuja tarefa é apenas lidar com dados ruins.")
O que este trecho NÃO diz: não trata bancos de dados/migrações de dados persistidos a fundo, só menciona verificar o banco.
Relevância: refactoring-expert: ALTA; testing-tdd-expert: MÉDIA (asserção como verificação de invariante, testes que revelam ordem de inicialização); api-design-expert: MÉDIA (acessores encapsulando mudança de estrutura; clientes continuam funcionando); code-review-expert: ALTA (sinais de campo no lugar errado: campos passados juntos, mudança em cascata, atualização duplicada).
Decisão sugerida: usar em refactoring-expert (mecânica + sinais); sinais de campo mal colocado em code-review-expert; asserção como rede de segurança em testing-tdd-expert.

---

### Mover instruções para uma função (Move Statements into Function) (PDF p.260-264) [inversa de Mover instruções para os pontos de chamada]
Resumo: se o mesmo código aparece sempre junto de uma chamada de função, funda-o na função para remover duplicação.
Conceitos e regras:
- Motivação: remover duplicação é uma das melhores regras gerais; mudanças futuras ficam em um só lugar. Se o código precisar variar depois, pode-se movê-lo de volta com a refatoração inversa [p.261]
- Mover só quando as instruções fazem sentido como parte da função chamada. Se não fizerem, mas devem ser chamadas juntas, usar Extrair função (Extract Function) nas instruções + chamada (mesmo processo sem os passos de internalizar e renomear) [p.261-262]
- Mecanismo: (1) se o código repetido não está adjacente à chamada, Deslocar instruções para aproximá-lo; (2) se a função final só é chamada pela original, recortar/colar, testar e terminar; (3) senão, Extrair função em um ponto de chamada englobando a chamada da função final e as instruções a mover, com nome provisório fácil de buscar; (4) converter os demais pontos de chamada, testando após cada um; (5) Internalizar função na função original dentro da nova; (6) Renomear função para o nome original ou um melhor [p.262]
- Exemplo (HTML de foto): título repetido antes de duas chamadas de `emitPhotoData`; nome provisório `zznew`; conversão de chamadas uma a uma; internalização; renomear de volta; ajuste dos nomes de parâmetros [p.262-264]
Citações curtas de prova:
- "Remover duplicação é uma das melhores regras gerais de um código saudável." [p.261]
O que este trecho NÃO diz: como decidir se as instruções pertencem semanticamente à função além de "fazer sentido como parte dela".
Relevância: refactoring-expert: ALTA; testing-tdd-expert: BAIXA (testar a cada conversão); api-design-expert: BAIXA; code-review-expert: MÉDIA (código duplicado em volta de chamadas).
Decisão sugerida: usar em refactoring-expert (catálogo, mecânica, truque do nome provisório buscável).

---

### Mover instruções para os pontos de chamada (Move Statements to Callers) (PDF p.264-270) [inversa da anterior]
Resumo: tirar da função um comportamento que passou a variar entre chamadores, devolvendo-o aos pontos de chamada.
Conceitos e regras:
- Motivação: abstrações têm fronteiras que se deslocam quando o software muda; uma unidade coesa pode virar mistura de duas ou mais funcionalidades; gatilho típico: comportamento comum que deve variar em algumas chamadas [p.265]
- Usar Deslocar instruções para levar o comportamento variável ao início ou fim da função, depois mover aos chamadores. Funciona bem para mudanças pequenas; se a fronteira precisa ser redefinida por inteiro, melhor Internalizar função e depois deslocar e extrair novas funções [p.265-266]
- Mecanismo: (1) caso simples (uma ou duas chamadas, função simples): recortar a primeira/última linha e colar nos chamadores, testar; (2) senão, Extrair função nas instruções que NÃO se quer mover, com nome temporário buscável (se for método sobrescrito, extrair em todas as classes até o que resta ser idêntico, e remover os das subclasses); (3) Internalizar função na original; (4) Mudar declaração de função (Change Function Declaration) na extraída para o nome original (ou melhor) [p.266]
- Exemplo: `listRecentPhotos` deve renderizar a localização de modo diferente de `renderPerson`; extrai-se `zztmp` com título e data, internaliza-se `emitPhotoData` em cada chamador (testando entre elas), apaga-se a função externa e renomeia-se `zztmp` de volta [p.266-270]
- O nome temporário deve ser fácil de procurar, não necessariamente significativo; testar na fronteira da chamada [p.268]
Citações curtas de prova: nenhuma.
O que este trecho NÃO diz: como identificar o limite entre "comum" e "variável" além do exemplo.
Relevância: refactoring-expert: ALTA; testing-tdd-expert: BAIXA; api-design-expert: MÉDIA (função pública cujo contrato muda: ajustar fronteira chamador/chamado); code-review-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert (catálogo, mecânica).

---

### Substituir código internalizado por chamada de função (Replace Inline Code with Function Call) (PDF p.270-271)
Resumo: se existe função que faz o que um trecho inline faz, trocar pelo chamado.
Conceitos e regras:
- Motivação: funções nomeadas explicam o propósito (o quê) em vez do funcionamento; evitam duplicação; mudança na implementação é feita num só lugar [p.271]
- Exceção: quando a semelhança é coincidência, isto é, não se espera que o inline mude se a função mudar. O guia é o nome da função: um bom nome deve fazer sentido no local. Se não faz, ou o nome é ruim (Renomear função) ou o propósito difere e não deve chamar [p.271]
- Particularmente satisfatório com funções de biblioteca [p.271]
- Mecanismo: (1) trocar o código inline por chamada; (2) testar [p.271]
- Exemplo do cabeçalho: laço que marca flag se encontrar "MA" vira `includes` [p.270-271]
Citações curtas de prova: nenhuma.
O que este trecho NÃO diz: não discute como detectar o código equivalente (busca, ferramentas).
Relevância: refactoring-expert: ALTA (curta); code-review-expert: MÉDIA (reinvenção de função existente/biblioteca, com o teste do nome para evitar falsa duplicação); demais: NENHUMA.
Decisão sugerida: usar em refactoring-expert e como critério em code-review-expert.

---

### Deslocar instruções (Slide Statements) (PDF p.272-277) [anteriormente: Consolidar fragmentos condicionais duplicados]
Resumo: aproximar código relacionado (declaração perto do uso; acessos à mesma estrutura juntos), geralmente como passo preparatório de Extrair função. A questão central é se o deslocamento interfere no comportamento.
Conceitos e regras:
- Motivação: código é mais fácil de entender com elementos relacionados juntos; o autor declara a variável logo antes do primeiro uso; frequentemente desloca como preparação para Extrair função, que exige o código junto [p.272]
- Mecanismo: (1) identificar a posição final e analisar as instruções entre origem e destino quanto a interferência; abandonar se houver; (2) recortar e colar; (3) testar; se falhar, tentar passos menores (passar por menos código ou reduzir o fragmento) [p.273]
- Regras de interferência: um fragmento não pode ir antes da declaração de elemento que ele referencia; não pode ir adiante além de elemento que o referencie; não pode passar por instrução que modifica elemento que ele referencia; se ele modifica um elemento, não pode passar por outro que referencie o elemento modificado [p.273]
- Declarações sem efeitos colaterais e que não referenciam outras variáveis podem ser movidas com segurança até a primeira linha que as referencia. Código sem efeitos colaterais pode ser reordenado livremente; por isso programadores inteligentes preferem código livre de efeitos colaterais [p.274]
- Como saber que uma chamada não tem efeitos colaterais? Teria que olhar dentro dela e de tudo que ela chama. O autor segue Separação entre Comandos e Consultas (Command-Query Separation): função que devolve valor é livre de efeitos colaterais, mas só pode ter certeza porque conhece a base de código; em base desconhecida deve ser mais cauteloso [p.274-275]
- Regra simples: não deslocar um fragmento sobre outro se algum dado referenciado por ambos é modificado por um deles. Exceção: operações comutativas como duas somas na mesma variável. Julgar exige entender as operações e como se compõem [p.275]
- Estado mutável dá trabalho; antes de deslocar, aplicar Separar variável (Split Variable) em `charge` no exemplo [p.275]
- Com estruturas complexas é difícil ter certeza da interferência, então os testes são essenciais: deslocar, rodar, ver se algo falha. Se os testes não forem confiáveis, ser mais cauteloso ou melhorá-los antes [p.275-276]
- Falha de teste após deslocar: fazer deslocamentos menores, ou concluir que não vale a pena e trabalhar em outra coisa antes [p.276]
- Exemplo com 13 linhas de preço/desconto: linha 7 (`let discount`) desce para perto do uso; linha 2 pode descer; linha 11 não pode ir ao final por causa da linha 12; linha 13 não pode subir porque a 12 modifica estado que ela lê; linha 8 pode passar por 9-11 [p.274-275]
- Com condicionais: instruções idênticas nos dois ramos podem ser deslocadas para fora (remove duplicação); o inverso (deslocar para dentro) as repete em cada ramo [p.276]
- Leitura complementar: refatoração quase idêntica chamada Trocar instruções (Swap Statement), só para fragmentos de uma instrução; o autor usa fragmentos maiores, e só desce a uma instrução quando tem dificuldades; em código confuso, passos menores são mais fáceis [p.277]
Citações curtas de prova:
- "Um código é mais fácil de entender quando elementos relacionados aparecem juntos." [p.272]
O que este trecho NÃO diz: não dá lista de efeitos colaterais além dos exemplos de variáveis locais; não fala de concorrência.
Relevância: refactoring-expert: ALTA (regras de interferência = critério de segurança); testing-tdd-expert: ALTA (testes como detector de interferência; melhorar testes antes se não confiáveis; passos menores quando falha); api-design-expert: NENHUMA; code-review-expert: MÉDIA (efeitos colaterais ocultos, CQS como critério de legibilidade).
Decisão sugerida: usar em refactoring-expert (mecânica e regras de interferência) e testing-tdd-expert (papel dos testes nesse tipo de passo).

---

### Dividir laço (Split Loop) (PDF p.277-280)
Resumo: separar um laço que faz duas tarefas em dois laços, cada um com uma tarefa; costuma preceder Extrair função.
Conceitos e regras:
- Motivação: se o laço faz duas coisas, quem modifica precisa entender ambas; separando, só entende o comportamento que vai mudar. Laço de um valor só pode simplesmente retorná-lo; laços multitarefa devolvem estruturas ou preenchem variáveis locais [p.278]
- Objeção de desempenho: muitos desconfortam por rodar o laço duas vezes; separar refatoração de otimização (Cap. 2, seção Refatoração e desempenho, p.87 do livro). Depois de claro, otimiza-se; se o laço for gargalo, é fácil reunir. Raramente é gargalo, e dividir muitas vezes permite otimizações melhores [p.278]
- Mecanismo: (1) copiar o laço; (2) identificar e eliminar efeitos colaterais duplicados; (3) testar; depois considerar Extrair função em cada laço [p.278]
- Exemplo: laço calcula menor idade e salário total; copiar, remover do primeiro o cálculo da idade e do segundo o do salário (código sem efeito colateral poderia ficar por enquanto); Deslocar instruções para agrupar declaração com seu laço; Extrair função duas vezes; depois Substituir laço por pipeline (`reduce`) para o total e Substituir algoritmo para menor idade (`Math.min` com `map`) [p.279-280]
- O ponto principal da refatoração é a preparação que ela permite (extrair os laços), não o que faz sozinha [p.279-280]
Citações curtas de prova:
- "devemos separar a refatoração da otimização" [p.278]
O que este trecho NÃO diz: não dá números/medidas de desempenho; o comentário sobre gargalo é qualitativo.
Relevância: refactoring-expert: ALTA; code-review-expert: ALTA (laço com duas responsabilidades é sinal revisável; argumento contra objeção de "dois laços = lento"); testing-tdd-expert: BAIXA; api-design-expert: NENHUMA.
Decisão sugerida: usar em refactoring-expert (catálogo, mecânica, resposta à objeção de desempenho) e como critério em code-review-expert.

---

### Substituir laço por pipeline (Replace Loop with Pipeline) (PDF p.281-286)
Resumo: trocar laço por cadeia de operações de coleção (`filter`, `map`, `slice`, etc.), lida de cima para baixo.
Conceitos e regras:
- Motivação: pipelines de coleção (Collection Pipelines) descrevem o processamento como série de operações, cada uma consumindo e gerando coleção; mais comuns: `map` (transforma cada elemento) e `filter` (seleciona subconjunto). A lógica fica mais fácil de entender lendo de cima para baixo [p.281]
- Mecanismo: (1) criar nova variável para a coleção do laço (pode ser cópia simples); (2) de cima para baixo, para cada porção de comportamento do laço, substituir por uma operação do pipeline na derivação da variável, testando após cada mudança; (3) quando todo o comportamento sair do laço, removê-lo; se houver acumulador, atribuir o resultado do pipeline a ele [p.281-282]
- Exemplo (CSV de escritórios, filtrar a Índia e devolver cidade e telefone): variável `loopItems`; o trecho que ignora a primeira linha vira `slice(1)` e permite apagar a variável de controle `firstLine`; linhas vazias viram `filter`; `map` para quebrar a linha em campos; `filter` para o país; `map` para o formato de saída; o laço restante só empurra para o acumulador e é removido; depois internalizar `result`, renomear variáveis do lambda (`fields`) e alinhar em formato de tabela; manteve `lines` porque o nome explica [p.282-286]
- Dica de estilo: ponto e vírgula final em linha própria [p.284]
- Leitura complementar: artigo do autor "Refactoring with Loops and Collection Pipelines" [p.286]
Citações curtas de prova:
- "posso então ler de cima para baixo e ver como os objetos fluem pelo pipeline" [p.281]
O que este trecho NÃO diz: não trata laços com saída antecipada, efeitos colaterais ou desempenho de pipelines; só mostra um exemplo.
Relevância: refactoring-expert: ALTA; code-review-expert: MÉDIA (laços "loops" como sinal; variável de controle apagável); testing-tdd-expert: BAIXA; api-design-expert: NENHUMA.
Decisão sugerida: usar em refactoring-expert (catálogo, mecânica).

---

### Remover código morto (Remove Dead Code) (PDF p.286-288)
Resumo: apagar código não usado; o controle de versões garante recuperação.
Conceitos e regras:
- Motivação: código não usado não pesa em desempenho, mas dificulta entender o software; não avisa que pode ser ignorado, e o leitor perde tempo entendendo e se pergunta por que alterá-lo não muda o resultado [p.287]
- Apague o que não é mais usado; a preocupação com "talvez precise depois" é resolvida pelo controle de versões. Pode-se deixar comentário citando a versão da remoção, mas o autor não se lembra da última vez que fez isso nem se arrependeu de não fazer [p.287]
- Comentar código morto era hábito de quando não havia VCS conveniente; hoje não é necessário [p.287]
- Mecanismo: (1) se o código pode ser referenciado de fora (ex.: função completa), buscar chamadas; (2) remover; (3) testar [p.287-288]
Citações curtas de prova:
- "Quando um código deixa de ser usado, devemos apagá-lo." [p.287]
O que este trecho NÃO diz: não trata detecção automática de código morto nem APIs públicas cujos usos externos são desconhecidos.
Relevância: refactoring-expert: ALTA (curta); code-review-expert: ALTA (código comentado/morto deve ser apontado); api-design-expert: BAIXA; testing-tdd-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert e code-review-expert.

---

### Capítulo 9: Organizando dados (PDF p.289-309) (introdução, p.289)
Resumo: refatorações focadas em estruturas de dados. Valor usado para propósitos distintos gera confusão e bugs.
Conceitos e regras (mapa do capítulo, p.289):
- Separar variável (Split Variable) para valor com vários propósitos; Renomear variável (Rename Variable) porque nomes certos são importantes e difíceis; Substituir variável derivada por consulta (Replace Derived Variable with Query) para eliminar a variável; Mudar referência para valor (Change Reference to Value) e Mudar valor para referência (Change Value to Reference) para alternar entre os estilos, pois confusão entre referência e valor é fonte comum de problemas [p.289]
Decisão sugerida: usar em refactoring-expert (catálogo).

---

### Separar variável (Split Variable) (PDF p.289-293) [anteriormente: Remover atribuições a parâmetros; Separar variável temporária]
Resumo: variável atribuída várias vezes com responsabilidades diferentes deve virar várias variáveis, uma por responsabilidade.
Conceitos e regras:
- Motivação: variáveis de laço e acumuladoras são legítimas com várias atribuições. Variáveis que guardam resultado de código extenso para referência futura devem receber valor só uma vez; se recebem mais, têm mais de uma responsabilidade no método; usar uma variável para duas tarefas confunde o leitor [p.290]
- Mecanismo: (1) renomear a variável na declaração e na primeira atribuição (se as atribuições seguintes forem da forma `i = i + algo`, é acumuladora, não separar); (2) se possível, declarar a nova como imutável; (3) mudar todas as referências até a segunda atribuição; (4) testar; (5) repetir em etapas até a última atribuição [p.290]
- Exemplo (distância percorrida por um haggis): `acc` guarda a aceleração inicial e depois a aceleração das duas forças; separam-se em `primaryAcceleration` (const) e `secondaryAcceleration` (const). Dica: editor que destaca todas as ocorrências de um símbolo ajuda [p.291-292]
- Exemplo com parâmetro de entrada atribuído: `inputValue` é entrada e resultado. Introduzir cópia local (`originalInputValue`), depois Renomear variável duas vezes, ficando o parâmetro como `inputValue` e a local como `result`; a segunda linha continua usando `inputValue` como fonte, porque conceitualmente a modificação é baseada no valor de entrada original [p.292-293]
Citações curtas de prova: nenhuma.
O que este trecho NÃO diz: não há regra para quando o acumulador pode legitimamente ser dividido.
Relevância: refactoring-expert: ALTA; code-review-expert: ALTA (variável reutilizada com dois propósitos; reatribuição de parâmetro); testing-tdd-expert: BAIXA; api-design-expert: NENHUMA.
Decisão sugerida: usar em refactoring-expert (mecânica) e code-review-expert (critério).

---

### Renomear campo (Rename Field) (PDF p.293-297)
Resumo: renomear campos de registros ou getters/setters de classes; para dados amplamente usados, faz-se de forma gradual encapsulando antes.
Conceitos e regras:
- Motivação: nomes são importantes e estruturas de dados são a chave para entender o programa. O autor cita Fred Brooks (mostre-me suas tabelas e raramente precisarei de seus fluxogramas). O entendimento melhora com o trabalho e deve ser incorporado ao programa; getters e setters formam o campo efetivo para os usuários da classe [p.294]
- Mecanismo: (1) se o registro tem escopo limitado, renomear todos os acessos e testar, sem o resto; (2) se não encapsulado, aplicar Encapsular registro (Encapsulate Record); (3) renomear o campo privado e ajustar métodos internos; (4) testar; (5) se o construtor usa o nome, Mudar declaração de função; (6) Renomear função nos acessores [p.294-295]
- Exemplo (`name` para `title` em Organization): encapsular o registro numa classe; separar o campo interno dos dados de entrada para tratá-los independentemente; o construtor passa a aceitar `title` ou `name` (título tem precedência); migrar chamadores um a um; remover suporte ao `name`; renomear os acessores. Passos menores dão menos erros por passo, e o autor desistiu da fantasia de nunca errar [p.295-297]
- Se a estrutura é usada só localmente, renomear todas as propriedades de uma vez, sem encapsular; se os testes falharem, usar o procedimento gradual [p.297]
- Com estrutura imutável: copiar o valor para o novo nome, migrar usuários e remover o antigo; duplicar dados mutáveis é receita para desastre, por isso dados imutáveis são populares [p.297]
Citações curtas de prova:
- "Passos menores significam menos erros a cada passo" [p.295] (texto: "Passos menores significam menos erros a cada passo – portanto, menos trabalho.")
O que este trecho NÃO diz: não aborda renomear campos persistidos em banco ou em APIs externas versionadas.
Relevância: refactoring-expert: ALTA; api-design-expert: ALTA (migração gradual de nome com aceitação de ambos os nomes no construtor, depois remoção do antigo = padrão de depreciação/compatibilidade); testing-tdd-expert: MÉDIA (testes decidem se usa procedimento gradual); code-review-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert (mecânica) e api-design-expert (migração com período de coexistência de nomes). Observação: o livro aplica a ideia em código interno, não a APIs públicas versionadas [fora do livro: generalização].

---

### Substituir variável derivada por consulta (Replace Derived Variable with Query) (PDF p.297-301)
Resumo: eliminar variáveis mutáveis que podem ser calculadas dos dados originais, trocando-as por cálculo.
Conceitos e regras:
- Motivação: dados mutáveis são uma das maiores fontes de problemas (acoplam partes do código, efeitos em cascata). Minimizar escopo; remover variável fácil de calcular. O cálculo esclarece o significado e protege contra corrupção por esquecer de atualizar [p.298]
- Exceção razoável: dado original imutável e resultado forçado imutável; transformações que criam novas estruturas podem ficar. Há dualidade entre objeto com propriedades calculadas e funções de transformação; o objeto é melhor se os dados originais mudam e é preciso gerir o ciclo de vida dos derivados [p.298]
- Mecanismo: (1) identificar todos os pontos de atualização da variável (se preciso Separar variável para separá-los); (2) criar função que calcule o valor; (3) Introduzir asserção para garantir que variável e cálculo coincidem a cada uso (Encapsular variável se precisar de um lar para a asserção); (4) testar; (5) substituir leituras por chamada à função; (6) testar; (7) Remover código morto na declaração e atualizações [p.298-299]
- Exemplo (ProductionPlan): `_production` é duplicado de `_adjustments` (duplicação de dados, não só de código); adicionar `calculatedProduction` via `reduce`, asserção no getter, rodar testes, devolver o cálculo, internalizar, remover a atualização do acumulador [p.299-300]
- Exemplo com mais de uma origem (valor inicial de produção não zero): a asserção anterior falharia; aplicar Separar variável em `_initialProduction` e `_productionAccumulator`; asserção sobre o acumulador; o autor tenderia a manter a propriedade calculada sem internalizar [p.300-301]
Citações curtas de prova:
- "Uma das maiores fontes de problemas em software são os dados mutáveis." [p.298]
O que este trecho NÃO diz: não trata custo de recomputar (desempenho) nem caching.
Relevância: refactoring-expert: ALTA; testing-tdd-expert: MÉDIA (asserção + testes para validar a hipótese antes de substituir); code-review-expert: ALTA (estado duplicado/derivado mantido manualmente); api-design-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert (mecânica) e code-review-expert (critério); asserção como técnica em testing-tdd-expert.

---

### Mudar referência para valor (Change Reference to Value) (PDF p.301-305) [inversa de Mudar valor para referência]
Resumo: tratar um objeto aninhado como valor imutável (substituído por inteiro ao mudar) em vez de referência atualizada in-place; vira Objeto de Valor (Value Object).
Conceitos e regras:
- Motivação: objeto interno como referência = atualiza propriedade e mantém o objeto; como valor = substitui por novo. Objetos de valor são mais fáceis de raciocinar, por serem imutáveis; podem ser passados e replicados sem se preocupar com mudanças ocultas ou com ligações de memória; convenientes em sistemas distribuídos e concorrentes [p.302]
- Quando NÃO fazer: se o objeto deve ser compartilhado e qualquer mudança deve ser visível a todos os colaboradores, ele precisa ser referência [p.302-303]
- Mecanismo: (1) verificar se a classe é imutável ou pode se tornar; (2) para cada setter, Remover método de escrita (Remove Setting Method); (3) fornecer método de igualdade baseado em valor usando os campos (sobrescrever também hash onde o ambiente exigir) [p.303]
- Exemplo (TelephoneNumber em Person): resultado de Extrair classe, com só uma referência; adicionar campos ao construtor (Mudar declaração de função), trocar cada setter da Person por criar um novo TelephoneNumber; escrever `equals` próprio (JS não tem suporte da linguagem); teste cria dois objetos independentes iguais e compara; se usado por mais clientes, mesmo procedimento mas com mais clientes a ajustar; testar também números diferentes, não-telefone e nulos [p.303-305]
- Em Ruby sobrescreve-se `==`; em Java `Object.equals()` e `hashCode()`; sobrescrever igualdade geralmente exige hash coerente para coleções hash [p.305]
Citações curtas de prova:
- "O teste de cidadania para um objeto de valor é ver se ele usa uma igualdade baseada em valor." [p.304] (texto: "O teste de cidadania para um objeto de valor é ver se ele usa uma igualdade baseada em valor.")
O que este trecho NÃO diz: não trata VOs com muitos campos ou custo de alocação.
Relevância: refactoring-expert: ALTA; code-review-expert: MÉDIA (objeto compartilhado mutável vs. valor imutável); api-design-expert: MÉDIA (imutabilidade como propriedade de contratos; passar dado imutável sem medo); testing-tdd-expert: MÉDIA (teste de igualdade por valor, casos nulos/outros tipos); domain-driven-design não é candidato aqui, mas o texto cita Objeto de Valor.
Decisão sugerida: usar em refactoring-expert (mecânica); testes de equals em testing-tdd-expert (nota breve).

---

### Mudar valor para referência (Change Value to Reference) (PDF p.305-309) [inversa da anterior]
Resumo: quando várias cópias do mesmo dado lógico precisam ser atualizadas, trocar por um único objeto compartilhado obtido de um repositório.
Conceitos e regras:
- Motivação: com valor, cada pedido tem cópia do cliente; com referência, há uma só estrutura. Se nunca se atualiza o cliente, ambos servem (cópias podem confundir, e memória raramente é problema). A dificuldade surge ao atualizar: é preciso achar todas as cópias, e esquecer uma gera inconsistência. Então é frequentemente válido mudar para uma única referência. Requer um repositório para acessar os objetos; cria-se o objeto de uma entidade uma só vez e obtém-se do repositório nos demais lugares [p.306]
- Mecanismo: (1) criar repositório de instâncias (se não houver); (2) garantir que o construtor tenha como consultar a instância correta; (3) modificar construtores para obter o objeto do repositório; testar a cada mudança [p.306-307]
- Exemplo (Order e Customer): cada Order cria um Customer novo; repositório com `registerCustomer` (cria só se não existe) e `findCustomer` usando um Map; construtor de Order passa a usar `registerCustomer(data.customer)`; mudanças no cliente ficam sincronizadas entre pedidos [p.307-308]
- Alternativa: carregar a lista de clientes antes e associar ao ler pedidos; ID ausente do repositório sinaliza erro [p.308]
- Problema: o construtor fica acoplado a repositório global; globais são como remédio forte (bom em dose pequena, veneno em excesso); se preocupa, passar o repositório como parâmetro do construtor [p.308-309]
- Em muitos casos o repositório já existe e basta usá-lo [p.308]
Citações curtas de prova: nenhuma (usar paráfrase).
O que este trecho NÃO diz: não trata sincronização de concorrência no repositório, nem ciclo de vida/cache.
Relevância: refactoring-expert: ALTA; code-review-expert: MÉDIA (cópias duplicadas da mesma entidade, global acoplado); api-design-expert: BAIXA; testing-tdd-expert: BAIXA (injeção do repositório ajuda testabilidade, mas o livro não diz isso aqui).
Decisão sugerida: usar em refactoring-expert (mecânica).

---

### Capítulo 10: Simplificando lógicas condicionais (PDF p.310-320) (introdução, p.310) [continua no próximo bloco]
Resumo: boa parte do poder e da complexidade dos programas está nas condicionais; a refatoração as simplifica.
Conceitos e regras (mapa do capítulo, p.310):
- Decompor condicional (Decompose Conditional) para condicionais complicadas [p.310]
- Consolidar expressão condicional (Consolidate Conditional Expression) para esclarecer combinações lógicas [p.310]
- Substituir condicional aninhada por cláusulas de guarda (Replace Nested Conditional with Guard Clauses) para verificações prévias antes do processamento principal [p.310]
- Substituir condicional por polimorfismo (Replace Conditional with Polymorphism) quando várias condições usam a mesma lógica de alternância [p.310] (detalhe no próximo bloco)
- Introduzir caso especial (Introduce Special Case), também chamada Introduzir objeto nulo (Introduce Null Object), para remover duplicação de tratamento de casos especiais como nulos [p.310] (próximo bloco)
- Introduzir asserção (Introduce Assertion) para informar e conferir o estado do programa [p.310] (próximo bloco)
Decisão sugerida: usar em refactoring-expert (catálogo).

---

### Decompor condicional (Decompose Conditional) (PDF p.310-313)
Resumo: extrair a condição e cada ramo de uma condicional complexa para funções com nomes que expressam a intenção.
Conceitos e regras:
- Motivação: lógica condicional complexa é uma das fontes mais comuns de complexidade; função longa já é difícil, e as condições pioram. O código mostra o que acontece, mas encobre por que acontece [p.311]
- Decompor e substituir cada porção por chamada de função nomeada pela intenção; enfatiza a condição e o motivo da ramificação. É um caso particular de Extrair função, mas relevante o bastante para destaque [p.311-312]
- Mecanismo: aplicar Extrair função à condição e a cada ramo da condicional [p.312]
- Exemplo (preço de verão vs. regular): extrair `summer()`, `summerCharge()`, `regularCharge()`; depois reformatar como ternário (`charge = summer() ? summerCharge() : regularCharge()`) [p.312-313]
Citações curtas de prova:
- "me dizer o que acontece, mas facilmente encobrir por que acontece" [p.311] (fragmento literal; sujeito: o código, nas verificações e nas ações)
O que este trecho NÃO diz: não define limiar de complexidade para decompor.
Relevância: refactoring-expert: ALTA; code-review-expert: ALTA (condicional complexa sem nome de intenção); clean-code relacionado, mas fora dos candidatos; testing-tdd-expert/api-design-expert: NENHUMA.
Decisão sugerida: usar em refactoring-expert (mecânica) e code-review-expert.

---

### Consolidar expressão condicional (Consolidate Conditional Expression) (PDF p.313-316)
Resumo: juntar verificações com o mesmo resultado numa só expressão (or para sequência, and para ifs aninhados), preparando para Extrair função.
Conceitos e regras:
- Motivação: (1) mostra que se faz uma única verificação que combina outras, pois uma sequência passa a impressão de verificações separadas que só por acaso estão próximas; (2) prepara Extrair função, trocando "o que faço" por "por que faço" [p.314]
- Quando NÃO: se as verificações são realmente independentes e não devem ser pensadas como uma só [p.314]
- Mecanismo: (1) garantir que nenhuma condicional tem efeito colateral (se tiver, usar Separar consulta de modificador (Separate Query from Modifier) antes); (2) combinar duas condicionais com operador lógico (sequências com or, ifs aninhados com and); (3) testar; (4) repetir até uma só condição; (5) considerar Extrair função na condição resultante [p.314-315]
- Exemplo (`disabilityAmount`): três retornos de 0 viram um `or` e então `isNotEligableForDisability()` [p.315-316]
- Exemplo com and: if aninhado (`onVacation` e `seniority > 10`) vira condição `&&`. Se há mistura de and/or e fica confuso, extrair função [p.316]
Citações curtas de prova: nenhuma.
O que este trecho NÃO diz: não trata ordem de avaliação/curto-circuito explicitamente.
Relevância: refactoring-expert: ALTA; code-review-expert: MÉDIA (sequência de guardas com mesmo resultado); testing-tdd-expert: NENHUMA; api-design-expert: NENHUMA.
Decisão sugerida: usar em refactoring-expert.

---

### Substituir condicional aninhada por cláusulas de guarda (Replace Nested Conditional with Guard Clauses) (PDF p.316-320) [continua no próximo bloco: o exemplo "invertendo condições" é truncado no fim de p.320]
Resumo: usar retornos antecipados (guardas) para casos incomuns, deixando o fluxo principal evidente; if/else só quando ambos os ramos são comportamento normal.
Conceitos e regras:
- Motivação: condicionais têm dois estilos: ambos os ramos normais, ou um normal e outro incomum. Os propósitos devem estar evidentes. Se ambos normais, if/else; se a condição é incomum, verificar e retornar [p.317]
- If-then-else dá pesos iguais aos ramos; a guarda diz "essa não é a parte essencial desta função; se ocorrer, faça algo e saia" [p.317-318]
- Ponto único de saída: o autor encontra isso com quem aprendeu que deveria haver um só ponto de entrada e um só de saída. Entrada única é garantida pelas linguagens modernas; saída única não é regra realmente útil. Clareza é o princípio: se for mais claro com uma saída, use; senão, não [p.318]
- Mecanismo: (1) selecionar a condição mais externa e convertê-la em guarda; (2) testar; (3) repetir; (4) se todas as guardas devolvem o mesmo resultado, usar Consolidar expressão condicional [p.318]
- Exemplo (`payAmount`): funcionário separado/aposentado vira guardas sucessivas, passo pequeno por passo, testando; a variável `result` fica sem uso e é removida; "um morango extra" ao remover variável mutável [p.318-320]
- Exemplo "invertendo as condições" (sugerido por Joshua Kerievsky): para guardar, inverte-se a condição (`capital <= 0` retorna resultado); o texto do bloco termina no meio desta sequência, no fim de p.320 [p.320]
Citações curtas de prova:
- "A clareza é o princípio fundamental: se o método for mais claro tendo um único ponto de saída, use um ponto de saída" [p.318] (texto: "A clareza é o princípio fundamental: se o método for mais claro tendo um único ponto de saída, use um ponto de saída; caso contrário, não faça isso.")
- "essa não é a parte essencial desta função; se ela ocorrer, faça algo e saia" [p.318]
O que este trecho NÃO diz: o final do exemplo invertido (continua em p.321, próximo bloco).
Relevância: refactoring-expert: ALTA; code-review-expert: ALTA (aninhamento profundo mascarando o fluxo principal; mito do ponto único de saída); clean-code relacionado; testing-tdd-expert: NENHUMA; api-design-expert: NENHUMA.
Decisão sugerida: usar em refactoring-expert (mecânica, critério if/else vs. guarda) e code-review-expert.

---

## Síntese de relevância por artefato

- refactoring-expert: ALTA. Fornece mecânica passo a passo de: Substituir algoritmo; Mover função; Mover campo; Mover instruções para função / para chamadores; Substituir código internalizado por chamada; Deslocar instruções; Dividir laço; Substituir laço por pipeline; Remover código morto; Separar variável; Renomear campo; Substituir variável derivada por consulta; Mudar referência para valor; Mudar valor para referência; Decompor condicional; Consolidar expressão condicional; Substituir condicional aninhada por cláusulas de guarda. Também as regras de interferência para Deslocar instruções (p.273) e o padrão recorrente "nome provisório buscável" (zznew, zztmp, `top_`) para extrair/internalizar/renomear.
- testing-tdd-expert: MÉDIA. Testar a cada passo; testes como detector de interferência ao deslocar (p.275-276); melhorar testes antes se não confiáveis (p.276); testes de caracterização + comparação antigo/novo em Substituir algoritmo (p.243); asserção como rede de segurança em Mover campo e Substituir variável derivada (p.260, 299); passos menores quando teste falha (p.276, 295). Nenhum conteúdo sobre TDD em si neste bloco.
- api-design-expert: BAIXA a MÉDIA. Migração gradual de nome (aceitar ambos no construtor, migrar chamadores, remover o antigo; p.296); função de delegação como ponte e remoção posterior (p.246-247); VO imutável (p.302). Não há tratamento de APIs públicas/versionadas.
- code-review-expert: MÉDIA/ALTA como critérios de "sinais" (não há aqui seção de maus cheiros): campo no lugar errado (p.255); variável com duas responsabilidades (p.290); estado derivado mantido à mão (p.298); laço com duas tarefas (p.278); código morto/comentado (p.287); condicional complexa/aninhada/ sequência de mesma saída (p.311, 314, 317); inline que duplica função existente (p.271); mito de saída única (p.318). Nomes de maus cheiros do catálogo do Cap. 3 não aparecem neste bloco.

## Checklist de cobertura
- Primeira página lida: 241
- Última página lida: 320 (conferido com Grep: último marcador "=== PDF PAGINA 320 ===" na linha 3580; arquivo tem 3629 linhas, lido até o fim)
- Páginas sem texto útil ou ilegíveis: p.288 tem apenas o último passo ("Teste.") da mecânica de Remover código morto; p.309 só tem a nota de tradução sobre haggis (rodapé do Cap. 9).
- Problemas de extração observados: indentação e quebras de linha do código perdidas; diagramas de "antes/depois" de cada refatoração aparecem como blocos de código sem rótulos de antes/depois; algumas linhas de código partidas (ex.: p.242 laço do `foundPerson`); texto de código com erros herdados do livro/extração: `retreiveOrder` (p.272-274), `isNotEligableForDisability` (p.314-316), `const record = line;.split(",")` (p.284), `let result;` ainda presente após o passo que diz removê-la (p.320), "Guard Claus" cortado em p.310; "Ao revisar ... Joshua Kerievsky" começa em p.320. Marcadores de lista (■) e sub-itens estão sem distinção hierárquica, então a hierarquia dos passos foi inferida do contexto.
- Capítulos/seções cobertos integralmente: Substituir algoritmo; Mover função; Mover campo; Mover instruções para uma função; Mover instruções para os pontos de chamada; Substituir código internalizado por chamada de função; Deslocar instruções; Dividir laço; Substituir laço por pipeline; Remover código morto; Separar variável; Renomear campo; Substituir variável derivada por consulta; Mudar referência para valor; Mudar valor para referência; Decompor condicional; Consolidar expressão condicional; introduções dos Cap. 8, 9 e 10.
- Capítulos/seções que continuam em outro bloco: Remover intermediário (começa no bloco anterior; aqui só o fim, p.241-242); Substituir condicional aninhada por cláusulas de guarda (exemplo "invertendo as condições" truncado no fim de p.320); Cap. 10 continua (Substituir condicional por polimorfismo, Introduzir caso especial, Introduzir asserção etc., citados apenas na introdução).
