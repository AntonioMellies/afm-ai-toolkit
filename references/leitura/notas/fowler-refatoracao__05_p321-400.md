# Notas: Fowler, Refatoração (2ª ed., JS), bloco 05 (PDF p.321-400)

Observação geral: o texto não traz número de página impresso visível (sem rodapé/cabeçalho extraído); só os marcadores "PDF PAGINA N". Todas as páginas abaixo são PDF.
Cada refatoração do catálogo segue o formato: nome (EN), nome anterior/inversa quando há, trecho antes/depois, Motivação, Procedimento (o "mecanismo"), Exemplo. Todos os passos abaixo são paráfrase do texto.

---

### Substituir condicional aninhada por cláusulas de guarda (Replace Nested Conditional with Guard Clauses), final do exemplo (PDF p.321) [continua do bloco anterior]
Resumo: apenas o fim do segundo exemplo da refatoração (cálculo de adjustedCapital). Mostra a sequência de passos que transforma condicionais em guardas e elimina a variável de resultado de uso duplo.
Conceitos e regras:
- Quando a condição é complicada, faz em dois passos: primeiro acrescenta um "not" à condição, depois distribui a negação (inverte os operadores) para evitar um nó mental com vários nots [p.321]
- Duas guardas consecutivas com o mesmo resultado de retorno são unificadas com Consolidar expressão condicional (Consolidate Conditional Expression), resultando em uma só condição com "||" [p.321]
- A variável `result` tinha dois papéis (valor da guarda e cálculo final); ao eliminar o uso duplo ela some e o código fica com retorno direto. Fowler chama isso de "ganhar um morango" (marca de bônus nos exemplos) [p.321]
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: não traz a motivação nem o procedimento da refatoração (estão no bloco anterior).
Relevância: refactoring-expert: MÉDIA, ilustra a mecânica passo a passo (a entrada da refatoração está no bloco anterior); code-review-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert apenas como exemplo complementar; fonte principal é o bloco 04.

---

### Substituir condicional por polimorfismo (Replace Conditional with Polymorphism) (PDF p.322-339)
Resumo: troca uma lógica condicional complexa (switch por código de tipo, ou caso base com variações) por classes com métodos polimórficos. Três exemplos: pássaros (switch por tipo), e viagens de navio (rating) como "caso base com variação" via herança. Fowler alerta contra o exagero do polimorfismo.

Motivação [p.322-323]:
- Lógica condicional complexa é um dos elementos mais difíceis de entender; procura-se acrescentar estrutura a ela [p.322]
- Às vezes basta separar casos de alto nível na própria estrutura da condicional; classes e polimorfismo deixam a divisão mais explícita [p.323]
- Caso comum 1: conjunto de tipos que tratam a lógica de modo distinto (livros, música, comida), mais evidente quando várias funções têm `switch` sobre o mesmo código de tipo; criar uma classe por caso remove a duplicação do switch [p.323]
- Caso comum 2: lógica como "caso básico com variantes"; o caso básico (o mais comum ou o mais simples) vai para uma superclasse e cada variante em uma subclasse, expressa pela diferença em relação à base [p.323]
- Alerta: polimorfismo é suscetível a uso exagerado; Fowler discorda de quem diz que toda condicional deve virar polimorfismo; a maioria de suas condicionais continua sendo if/else e switch/case; usa polimorfismo quando a lógica é complexa e pode melhorar [p.323]

Procedimento (mecanismo) [p.323-324]:
1. Se não existirem classes para o comportamento polimórfico, criá-las junto com uma função de factory que devolva a instância correta.
2. Usar a função de factory no código chamador.
3. Mover a função condicional para a superclasse. Se a condicional não for uma função autocontida, aplicar Extrair função antes.
4. Escolher uma subclasse; criar nela um método que sobrescreva o da condicional; copiar o corpo daquele ramo para o método da subclasse e ajustá-lo.
5. Repetir para cada ramo da condicional.
6. Deixar um caso default no método da superclasse; se a superclasse deve ser abstrata, declarar o método abstrato ou lançar erro indicando que a responsabilidade é da subclasse.

Exemplo 1, pássaros (plumage e airSpeedVelocity) [p.324-329]:
- Duas funções com switch sobre `bird.type`; aplica Combinar funções em classe para criar a classe `Bird`, depois subclasses por tipo e uma função de factory `createBird` [p.325-326]
- Passa um ramo por vez para a subclasse; no método da superclasse põe um `throw` no ramo já movido ("porque sou paranoico") e testa a cada ramo [p.326-327]
- No fim as funções de nível mais alto são internalizadas, a superclasse mantém só o default [p.327-328]
- Observa que em JavaScript a superclasse não é estritamente necessária (basta implementar os métodos com mesmo nome), mas a mantém porque ajuda a explicar a relação das classes no domínio [p.329]
- O texto contém um typo do livro: 'NorweigianBlueParrot' na factory (p.326), corrigido depois (p.327-328). Registrar como erro do original, não como regra.

Exemplo 2, polimorfismo para variação (rating de viagens) [p.329-339]:
- Herança aqui NÃO é generalização de livro didático; Fowler diz que "provavelmente não é a mais comum nem a melhor maneira" de usar herança; o outro uso é objeto semelhante a outro mas com variações [p.329]
- Situação: a mesma condicional "viagem à China e capitão já esteve na China" aparece em dois lugares (`captainHistoryRisk` e `voyageProfitFactor`); isolar essa variante é útil se houver mais lógica especial vindo [p.330-331]
- Passos: Combinar funções em classe (`Rating`), subclasse vazia `ExperiencedChinaRating`, factory `createRating` que escolhe a variante, chamador passa a usar a factory [p.332-333]
- Mover a variação de `captainHistoryRisk` para a subclasse usando `super` + ajuste [p.333-334]
- Para `voyageProfitFactor`, a variação está no meio de uma condicional com caminho alternativo; usa Extrair função em todo o bloco condicional (cria `voyageAndHistoryLengthFactor`) e então sobrescreve na subclasse [p.334-335]
- Um nome com "And" "exala muito mau cheiro": indica duas modificações distintas; separa com Extrair função (`historyLengthFactor`), Mover instruções para os pontos de chamada e Renomear função (`voyageLengthFactor`) [p.335-337]
- Ajuste final: o "+3" da China foi movido para `voyageProfitFactor` da subclasse via `super.voyageProfitFactor + 3`, por não fazer sentido dentro do fator de duração [p.338]
- Resultado: classe base sem complicação da China; a subclasse se lê como um conjunto de variações em relação à base [p.338-339]
- Introduzir método só para ser sobrescrito é comum nesse tipo de herança, mas um método grosseiro "encobre em vez de revelar" (paráfrase de p.336)

Citações curtas de prova:
- "Um nome de função com um “And” exala muito mau cheiro" [p.335]
- "ele é suscetível a um uso exagerado" (sobre o polimorfismo) [p.323]
O que este trecho NÃO diz: não define critério numérico para quando usar polimorfismo; não discute alternativas como tabela de despacho/estratégia; não trata herança versus composição.
Relevância: refactoring-expert: ALTA, mecânica completa passo a passo mais dois exemplos (switch por tipo e caso base com variação) e o alerta de exagero; code-review-expert: MÉDIA, sinal "mesmo switch repetido em várias funções" e nome com "And"; testing-tdd-expert: MÉDIA, ritmo "um ramo, compila e testa" e throw como rede de segurança; api-design-expert: NENHUMA.
Decisão sugerida: usar em refactoring-expert/references (ficha da refatoração com procedimento e os dois usos: por tipo e caso base+variação); critério do "And" e do exagero também como regra.

---

### Introduzir caso especial (Introduce Special Case) (PDF p.340-353)
Anteriormente: Introduzir objeto nulo (Introduce Null Object). Resumo: quando muitos clientes de uma estrutura verificam o mesmo valor especial e reagem do mesmo jeito, cria-se um elemento de caso especial que concentra o comportamento comum, substituindo as verificações por chamadas simples.

Motivação [p.340-341]:
- Código duplicado comum: muitos usuários de uma estrutura de dados checam um valor específico e a maioria faz o mesmo; leva essa reação para um único lugar [p.340]
- Padrão Caso Especial (Special Case): cria um elemento para o caso especial com todo o comportamento comum [p.340]
- Formas: objeto literal com valores preenchidos (se só lê dados); objeto especial com métodos (se há comportamento); pode ser devolvido por uma classe-envoltório ou inserido por uma transformação [p.340]
- Objeto Nulo é um caso especial de Caso Especial [p.341]

Procedimento (mecanismo) [p.341]: parte de um contêiner com uma propriedade (o "subject") que clientes comparam com um valor especial.
1. Adicionar no subject uma propriedade de verificação de caso especial, devolvendo falso.
2. Criar o objeto de caso especial só com essa propriedade, devolvendo verdadeiro.
3. Extrair função no código de comparação com o caso especial; garantir que todos os clientes usem a nova função.
4. Introduzir o novo caso especial no código (devolvendo-o de uma chamada de função ou via função de transformação).
5. Mudar o corpo da função de comparação para usar a propriedade de verificação.
6. Testar.
7. Usar Combinar funções em classe ou Combinar funções em transformação para mover o comportamento comum do caso especial para o novo elemento (requisições simples com valores fixos podem ser registro literal).
8. Usar Internalizar função na função de comparação onde ainda for necessária.

Exemplo 1, classe (Site/Customer/UnknownCustomer) [p.342-347]:
- Cliente desconhecido é a string "unknown"; quatro clientes tratam o mesmo caso ("occupant" de nome, plano básico, atrasos zero) [p.342-343]
- Adiciona `isUnknown` (false) em Customer e classe `UnknownCustomer` (true). `UnknownCustomer` NÃO é subclasse de Customer: em JS, pelas regras de subclasse e tipagem dinâmica, é melhor não ser [p.343]
- Técnica-chave: trocar tudo de uma vez é arriscado; usa Extrair função na comparação (`isUnknown(arg)`) para poder migrar os clientes um a um, testando a cada mudança [p.343-344]
- Coloca na função uma armadilha (throw para valor inesperado) para flagrar erros durante a refatoração [p.344]
- Só depois que todos os clientes usam `isUnknown(...)` muda `Site.customer` para devolver o `UnknownCustomer`, e altera `isUnknown` para checar o novo tipo [p.344]
- Depois move comportamento: `name` devolve "occupant"; `billingPlan` leitura devolve o plano básico, escrita (setter) é aceita e ignorada; elimina os condicionais dos clientes [p.345-346]
- Objetos de caso especial são objetos de valor e devem ser imutáveis, mesmo que os substituídos não sejam [p.346]
- Se o caso especial precisa devolver objetos relacionados, em geral eles também são casos especiais (ex.: `NullPaymentHistory` com 0 semanas de atraso) [p.346]
- Haverá exceções: um cliente que quer tratamento diferente (ex.: "unknown occupant"); mantém a verificação, usando `aCustomer.isUnknown` (internalização de isUnknown) [p.346]
- Quando todos os clientes estiverem migrados, `isUnknown` global vira código morto: Remover código morto [p.347]

Exemplo 2, objeto literal [p.347-349]: se só há leitura, o caso especial pode ser literal (`createUnknownCustomer` devolve registro com isUnknown, name, billingPlan, paymentHistory aninhado). Se usar literal, deve ser imutável (freeze); Fowler prefere classe em geral [p.349].

Exemplo 3, transformação sobre registro [p.349-353]: entrada é registro simples; cria `enrichSite` (começa como cópia profunda `_.cloneDeep`), adiciona `isUnknown` em cada cliente (true no caso especial, false nos demais), mantém o teste antigo ("unknown") junto ao novo para funcionar com sites crus e enriquecidos, e vai movendo name, billingPlan, paymentHistory para o caso especial com Combinar funções em transformação, testando a cada passo [p.350-353].

Citações curtas de prova:
- "Objeto Nulo (Null Object) é um caso especial de Caso Especial (Special Case)" [p.341]
- "Objetos de casos especiais são objetos de valor e, desse modo, devem ser sempre imutáveis" [p.346]
O que este trecho NÃO diz: não cobre tratamento de null/undefined nativo em detalhes nem Option/Maybe; não define limite de quantos clientes justificam o padrão.
Relevância: refactoring-expert: ALTA, mecânica completa e técnica de migração incremental (extrair a comparação, armadilha de valor inesperado); code-review-expert: MÉDIA, sinal "mesmo teste de valor especial espalhado por vários clientes com a mesma reação"; testing-tdd-expert: BAIXA, armadilha e teste a cada passo; api-design-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert/references (ficha da refatoração + técnica "extrair a comparação para migrar em pequenos passos").

---

### Introduzir asserção (Introduce Assertion) (PDF p.353-356)
Resumo: tornar explícitos pressupostos implícitos do código com asserções, que servem como comunicação ao leitor e ajuda de depuração. Asserção nunca altera o comportamento.
Conceitos e regras:
- Asserção é uma condicional que se supõe sempre verdadeira; falha indica erro do programador; outras partes do sistema nunca devem verificar falhas de asserção [p.354]
- Deve-se escrever de modo que o programa funcione igual mesmo que todas as asserções sejam removidas (algumas linguagens permitem desativá-las por flag de compilação) [p.354]
- Valor de comunicação: diz ao leitor o estado esperado naquele ponto; Fowler tende a mantê-las após corrigir o bug; código autotestável (testes de unidade localizados) reduz sua importância para depurar, mas não como comunicação [p.354]
- Procedimento: ao notar que uma condição deve ser verdadeira, adicionar asserção que a confirme (único passo); preserva o comportamento [p.354-355]
- Exemplo (desconto do cliente): converte o ternário em if-else para poder inserir a asserção; depois prefere colocá-la no setter, pois se falhar o problema a resolver é como o valor chegou ao campo [p.355-356]
- Perigo do excesso: não usar para tudo que se acredita verdadeiro, só para o que deve ser verdadeiro; duplicação dessas condições é problema (muda com frequência), então remover duplicação, em geral com Extrair função [p.356]
- Só para erros de programador: dado de fonte externa exige verificação de primeira classe do programa, não asserção, a menos que haja confiança na fonte [p.356]
Citações curtas de prova:
- "As asserções são o último recurso para ajudar a rastrear bugs" [p.356]
O que este trecho NÃO diz: não detalha bibliotecas/ferramentas de assert em JS nem estratégia de desativar em produção além da menção à flag de compilação.
Relevância: refactoring-expert: MÉDIA, ficha curta da refatoração; testing-tdd-expert: MÉDIA, relação asserções x código autotestável, asserção no setter; code-review-expert: MÉDIA, critério asserção (erro de programador) versus validação de entrada externa; api-design-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert (ficha) e em testing-tdd-expert/code-review-expert apenas como regra "asserção para erro de programador, validação para dado externo".

---

### Capítulo 11, Refatorando APIs: introdução (PDF p.357-358)
Resumo: módulos e funções são blocos de construção; APIs são as junções. APIs fáceis de entender e usar são importantes e difíceis, exigindo refatoração à medida que se aprende.
Conceitos e regras:
- Boa API separa claramente funções que atualizam dados das que apenas leem; usa Separar consulta de modificador quando estiverem combinadas [p.357]
- Funções que variam só por um valor: Parametrizar função; parâmetro que na verdade sinaliza comportamento diferente: Remover argumento de flag [p.357]
- Estruturas desempacotadas ao passar entre funções: Preservar objeto inteiro; revisar o que vai como parâmetro e o que a função resolve sozinha com Substituir parâmetro por consulta e Substituir consulta por parâmetro [p.357]
- Prefere objetos o mais imutáveis possível: Remover método de escrita; quando chamada precisa de mais flexibilidade que construtor: Substituir construtor por função de factory [p.357]
- Duas últimas tratam de funções complexas com muitos dados: Substituir função por comando (facilita Extrair função) e Substituir comando por função (voltar ao simples quando o comando deixa de ser necessário) [p.357-358]
O que este trecho NÃO diz: não traz critérios de versionamento, depreciação, compatibilidade ou APIs públicas/HTTP; "API" aqui é interface de funções/módulos/classes.
Relevância: api-design-expert: MÉDIA, mapa de refatorações de interface de função/classe (não cobre APIs remotas); refactoring-expert: ALTA, índice do capítulo.
Decisão sugerida: usar em refactoring-expert (índice de refatorações de API) e em api-design-expert com cautela, restrito a design de assinaturas.

---

### Separar consulta de modificador (Separate Query from Modifier) (PDF p.358-361)
Resumo: separa uma função que devolve valor e também causa efeito colateral em duas: consulta pura e modificador.
Motivação [p.358-359]:
- Função que dá um valor sem efeitos colaterais observáveis é valiosa: pode ser chamada quantas vezes quiser, movida dentro de funções e é mais fácil de testar [p.358]
- Regra: toda função que devolve valor não deveria ter efeitos colaterais observáveis (separação comando-consulta, command-query separation); Fowler não defende pureza de 100%, mas a segue na maioria das vezes [p.359]
- "Observável": cachear o resultado de uma consulta em um campo muda o estado interno mas não é observável, então não conta [p.359]
Procedimento (mecanismo) [p.359]:
1. Copiar a função e nomeá-la como consulta (o nome da variável que recebe o resultado dá pista).
2. Eliminar qualquer efeito colateral da nova consulta.
3. Executar verificações estáticas.
4. Localizar cada chamada do original; se usar o valor de retorno, trocar por chamada à consulta e inserir em seguida a chamada ao original; testar a cada mudança.
5. Remover os valores de retorno do original.
6. Testar.
Depois, normalmente há duplicação entre consulta e modificador, a remover (no exemplo, com Substituir algoritmo, fazendo o modificador usar a consulta) [p.359, 361].
Exemplo (alertForMiscreant/findMiscreant): cria `findMiscreant` sem os alarmes, chamadores passam a chamar consulta e depois o modificador; modificador vira "se achou vilão, dispara alarmes" [p.359-361].
Citações curtas de prova:
- "qualquer função que devolva um valor não deve ter efeitos colaterais observáveis" [p.359]
O que este trecho NÃO diz: não trata concorrência/atomicidade quando consulta e modificador precisam acontecer juntos (ex.: pop de pilha, "test-and-set").
Relevância: api-design-expert: ALTA, regra comando-consulta e mecânica de separação; refactoring-expert: ALTA; code-review-expert: MÉDIA, sinal "nome com 'And'/getXAndDoY, função que lê e altera"; testing-tdd-expert: BAIXA, consultas puras são mais fáceis de testar.
Decisão sugerida: usar em api-design-expert e refactoring-expert/references.

---

### Parametrizar função (Parameterize Function) (PDF p.361-365)
Anteriormente: Parametrizar método (Parameterize Method). Resumo: duas funções com lógica parecida e literais diferentes viram uma função com parâmetro.
Motivação: remove duplicação e a função fica mais útil em outros lugares com outros valores [p.362].
Procedimento (mecanismo) [p.362]:
1. Selecionar uma das funções similares.
2. Mudar declaração de função para acrescentar os literais que virarão parâmetros.
3. Em cada chamada, acrescentar o valor literal.
4. Testar.
5. Alterar o corpo para usar os novos parâmetros, testando a cada mudança.
6. Para cada função similar, substituir a chamada pela da função parametrizada, testando a cada mudança; se a parametrizada não servir a uma delas, adaptá-la antes de seguir.
Exemplo: aumento de 10%/5% vira `raise(aPerson, factor)` [p.362-363]. Exemplo de faixas de consumo (bottomBand/middleBand/topBand): começa pela faixa do meio (a mais complexa, com dois literais), vira `withinBand(usage, bottom, top)`; faixa inferior usa 0..100, superior usa `Infinity`; mantém a guarda inicial mesmo desnecessária logicamente porque documenta o tratamento do caso [p.363-365].
Dica de método: ao parametrizar funções relacionadas, partir de uma delas com "um olho nas demais"; em intervalos, começar pelo do meio [p.363].
O que este trecho NÃO diz: não traz limite para quantos parâmetros são aceitáveis.
Relevância: refactoring-expert: ALTA (ficha completa); code-review-expert: MÉDIA, sinal de funções quase idênticas que só diferem em literais; api-design-expert: MÉDIA.
Decisão sugerida: usar em refactoring-expert/references.

---

### Remover argumento de flag (Remove Flag Argument) (PDF p.365-370)
Anteriormente: Substituir parâmetro por métodos explícitos (Replace Parameter with Explicit Methods). Resumo: troca parâmetro que seleciona o comportamento por funções explícitas.
Motivação [p.366-367]:
- Argumento de flag é o argumento que quem chama usa para indicar a lógica a executar (booleano, enum ou string) [p.366]
- Complica entender quais chamadas existem e como fazê-las; flags booleanas são piores porque a chamada não diz o que `true` significa; função explícita é mais clara [p.366]
- Critério do que é flag: quem chama define o valor com literal (não com dado fluindo pelo programa) e a função usa o argumento para controlar fluxo (não como dado repassado a outras funções) [p.366]
- Beneficia também ferramentas (análise de código distingue as lógicas) [p.367]
- Mais de uma flag pode justificar mantê-las (evitar explosão de funções), mas é sinal de que a função faz tarefas demais; buscar funções simples composáveis [p.367]
Procedimento (mecanismo) [p.367]:
1. Criar uma função explícita para cada valor do parâmetro.
2. Se a função principal tem condicional clara de despacho, usar Decompor condicional para criar as explícitas; senão, criar funções que a encapsulem.
3. Para cada chamada com valor literal, trocar pela função explícita.
Exemplo (deliveryDate com isRush): decompõe em `rushDeliveryDate` e `regularDeliveryDate`, troca chamadas e remove `deliveryDate` [p.367-369]. Se todas as chamadas passam um booleano vindo de dado (ex.: `determineIfRush`), não há problema com a assinatura [p.369]. Se há chamadas mistas (literal e dado), aplica a refatoração só às literais e mantém a função original [p.369]. Quando o parâmetro é usado de forma entrelaçada e difícil de elevar à condicional de topo, cria funções-encapsulamento (aplicação parcial) sobre a original e, se ninguém usar o parâmetro como dado, restringe a visibilidade ou renomeia a original (ex.: sufixo "HelperOnly") [p.369-370].
Citações curtas de prova:
- "Flags booleanas são piores ainda, pois elas não informam seu significado para o leitor" [p.366]
O que este trecho NÃO diz: não aborda parâmetros opcionais/objetos de opções nem linguagens com argumentos nomeados.
Relevância: api-design-expert: ALTA (definição precisa de flag e como remover); code-review-expert: ALTA, é um mau cheiro de assinatura com critério objetivo; refactoring-expert: ALTA.
Decisão sugerida: usar em api-design-expert, code-review-expert (critério) e refactoring-expert/references (mecânica).

---

### Preservar objeto inteiro (Preserve Whole Object) (PDF p.370-375)
Resumo: em vez de extrair valores de um registro e passá-los separados, passa-se o registro inteiro e a função deriva o que precisa.
Motivação [p.370-371]:
- Mais resistente a mudanças (se a função precisar de mais dados, a lista de parâmetros não muda); lista de parâmetros menor; evita duplicar lógica que manipula os dados parciais e que pode ser movida para o objeto completo [p.371]
- Quando NÃO fazer: se não se quer que a função chamada dependa do objeto completo (tipicamente módulos distintos) [p.371]
- Extrair vários valores de um objeto só para aplicar lógica é mau cheiro (Inveja de recursos, Feature Envy, referido ao Cap. 3, p.101 do livro), sinal de que a lógica deve ir para o próprio objeto [p.371]
- Comum depois de Introduzir objeto de parâmetros; vários trechos usando o mesmo subconjunto de um objeto podem indicar Extrair classe; objeto que chama outro com vários dos seus próprios dados pode passar `this` [p.371]
Procedimento (mecanismo) [p.371-372]:
1. Criar uma função vazia com os parâmetros desejados.
2. Nomeá-la de forma fácil de pesquisar (prefixo temporário, ex.: `xxNEW...`) para substituir no final.
3. Preencher o corpo chamando a função antiga, mapeando novos parâmetros para os antigos.
4. Executar verificações estáticas.
5. Adaptar cada chamada para usar a nova função, testando a cada mudança; código que derivava o parâmetro pode virar código morto (Remover código morto).
6. Após todas as chamadas, Internalizar função na função original.
7. Renomear a nova função (e suas chamadas), removendo o prefixo.
Exemplo (HeatingPlan.withinRange com low/high vs. range completo) [p.372-373]; o prefixo transforma o rename final em substituição global simples mesmo sem suporte robusto no editor [p.373].
Variação [p.374-375]: compor a nova função só com refatorações: Extrair variável (separar chamada da condicional; extrair o parâmetro de entrada) e Extrair função para criar a nova; Mover função se estiver em outra classe; conveniente com ferramentas de refatoração robustas.
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: não trata o acoplamento de módulo em profundidade além de citar a exceção.
Relevância: refactoring-expert: ALTA (ficha + variação por extração); api-design-expert: ALTA, regra de assinatura e a exceção de dependência; code-review-expert: MÉDIA, Inveja de recursos/lista longa de parâmetros.
Decisão sugerida: usar em refactoring-expert/references e api-design-expert. A técnica geral "nova função com prefixo pesquisável, chamar a antiga, migrar chamadas, internalizar, renomear" é reutilizável (é o padrão de migração de assinatura).

---

### Substituir parâmetro por consulta (Replace Parameter with Query) (PDF p.375-379)
Anteriormente: Substituir parâmetro por método. Inversa de: Substituir consulta por parâmetro.
Motivação [p.376-377]:
- A lista de parâmetros deve sintetizar os pontos de variabilidade da função; parâmetro que a função pode determinar facilmente é duplicação e carga desnecessária para o chamador [p.376]
- O limite é a palavra "facilmente": remover o parâmetro transfere a responsabilidade de determinar o valor para o corpo da função, só vale se for apropriada à função [p.376]
- Evitar quando a remoção introduz dependência indesejada no corpo da função (acessar elemento que se prefere desconhecido) [p.377]
- Caso mais seguro: o valor é determinável por consulta a outro parâmetro da lista [p.377]
- Atenção à transparência referencial (mesmos parâmetros, mesmo resultado): não trocar parâmetro por acesso a variável global mutável [p.377]
Procedimento (mecanismo) [p.377]:
1. Se necessário, Extrair função no cálculo do parâmetro.
2. Substituir as referências ao parâmetro no corpo pela expressão que o gera, testando a cada mudança.
3. Mudar declaração de função para remover o parâmetro.
Exemplo (Order.discountedPrice com discountLevel): depois de Substituir variável temporária por consulta (getter `discountLevel`), o parâmetro fica desnecessário; troca referências e remove o parâmetro [p.377-379]. Fowler diz que usa isso com frequência depois de outras refatorações que tornam o parâmetro dispensável [p.377].
O que este trecho NÃO diz: não dá critério além de "facilmente"/dependência/transparência referencial.
Relevância: api-design-expert: ALTA (critérios de quando um parâmetro deve existir); refactoring-expert: ALTA; code-review-expert: MÉDIA (parâmetro derivável de outro).
Decisão sugerida: usar em api-design-expert e refactoring-expert/references, junto com a inversa.

---

### Substituir consulta por parâmetro (Replace Query with Parameter) (PDF p.379-383)
Inversa de: Substituir parâmetro por consulta.
Motivação [p.379-380]:
- Corpo de função refere algo no escopo que incomoda (variável global, elemento de módulo que será movido); troca a referência interna por parâmetro, transferindo a resolução ao chamador [p.379]
- Geralmente é para mudar dependências: a função final deixa de depender do elemento parametrizado [p.380]
- Tensão: converter tudo em parâmetros gera listas longas e repetitivas; compartilhar muito escopo gera acoplamento alto; decisão não é certa nem imutável, por isso a refatoração (e sua inversa) precisa ser dominada [p.380]
- Ganho: transparência referencial (mesmos parâmetros, mesmo resultado); padrão comum é módulos de funções puras envolvidos por lógica que cuida de E/S e elementos variáveis, o que facilita testes e compreensão [p.380]
- Custo: força o chamador a descobrir como fornecer o valor, complicando a vida dele; Fowler tende a projetar interfaces que facilitem a vida dos clientes [p.380]
Procedimento (mecanismo) [p.380-381]:
1. Extrair variável no código da consulta, separando-o do restante do corpo.
2. Extrair função com o código do corpo que não é a consulta.
3. Dar à nova função nome fácil de pesquisar para renomear depois.
4. Internalizar variável para eliminar a variável criada.
5. Internalizar função na função original.
6. Renomear a nova função com o nome da original.
Exemplo (HeatingPlan.targetTemperature dependente do `thermostat` global): extrai `selectedTemperature`, extrai `xxNEWtargetTemperature(selectedTemperature)`, internaliza variável e a função original, renomeia [p.381-383]. Fowler nota que o código chamador fica mais complicado (preço da redução de acoplamento) mas a classe imutável HeatingPlan passa a ter método referencialmente transparente, mais fácil de testar e entender [p.383]. Em JavaScript não se garante imutabilidade de classe, mas escrever a classe sinalizando e incentivando imutabilidade costuma bastar [p.383].
Citações curtas de prova:
- "É o preço a ser pago pela redução de acoplamento." [p.383]
O que este trecho NÃO diz: não trata injeção de dependência como alternativa nomeada.
Relevância: api-design-expert: ALTA (trade-off acoplamento x ônus do chamador; funções puras); testing-tdd-expert: MÉDIA, funções referencialmente transparentes são mais fáceis de testar; refactoring-expert: ALTA; code-review-expert: BAIXA.
Decisão sugerida: usar em api-design-expert, refactoring-expert/references; ponto de testabilidade em testing-tdd-expert.

---

### Remover método de escrita (Remove Setting Method) (PDF p.383-386)
Resumo: elimina o setter de um campo que não deve mudar após a criação, tornando-o imutável.
Motivação [p.384-385]:
- Setter sinaliza que o campo pode mudar; se não deve mudar após a criação, não oferecer setter e definir só no construtor deixa a intenção clara e geralmente elimina a possibilidade de mudança [p.384]
- Casos comuns: pessoas usam sempre o accessor mesmo no construtor (uma única chamada ao setter no construtor); ou clientes usam "script de criação" (construtor seguido de sequência de setters) e depois não se espera mudança [p.384]
Procedimento (mecanismo) [p.384-385]:
1. Se o valor não é fornecido ao construtor, usar Mudar declaração de função para adicioná-lo e chamar o setter no construtor (se for remover vários setters, adicionar todos os valores no construtor de uma vez).
2. Remover cada chamada ao setter fora do construtor, usando o novo valor do construtor; testar a cada mudança.
3. Se não for possível trocar a chamada ao setter por criar novo objeto (atualização de objeto de referência compartilhado), abandonar a refatoração.
4. Internalizar função no setter; se possível tornar o campo imutável.
5. Testar.
Exemplo (Person com id): id entra no construtor; scripts de criação são ajustados; setter de id é internalizado [p.385-386].
O que este trecho NÃO diz: não aborda imutabilidade profunda (freeze) nem objetos de valor em geral neste ponto.
Relevância: api-design-expert: ALTA (intenção de imutabilidade expressa na interface); refactoring-expert: ALTA; code-review-expert: MÉDIA (setter desnecessário, script de criação).
Decisão sugerida: usar em refactoring-expert/references e api-design-expert (imutabilidade por construção).

---

### Substituir construtor por função de factory (Replace Constructor with Factory Function) (PDF p.386-388)
Anteriormente: Substituir construtor por método de factory.
Motivação [p.386-387]: construtores têm limitações: em Java devem devolver instância da própria classe (impede devolver subclasse ou proxy conforme ambiente/parâmetros); nome fixo (não se escolhe nome mais claro); geralmente exigem operador especial (`new`), difícil em contextos que esperam funções comuns. A função de factory não tem essas limitações; provavelmente chama o construtor, mas pode ser trocada por outro código [p.386-387].
Procedimento (mecanismo) [p.387]:
1. Criar função de factory cujo corpo chama o construtor.
2. Substituir cada chamada ao construtor pela função de factory, testando a cada mudança.
3. Limitar a visibilidade do construtor o máximo possível.
Exemplo (Employee com typeCode): `createEmployee(name, typeCode)`; para o código de tipo literal 'E', cria `createEngineer(name)` com o tipo no nome, porque passar um código como string literal é mau cheiro [p.387-388].
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: não relaciona explicitamente com Substituir código de tipo por subclasses (que não aparece neste bloco).
Relevância: api-design-expert: ALTA (nomear criação, flexibilidade de retorno); refactoring-expert: ALTA; code-review-expert: BAIXA ("código de tipo como string literal" é citado como cheiro).
Decisão sugerida: usar em refactoring-expert/references e api-design-expert.

---

### Substituir função por comando (Replace Function with Command) (PDF p.388-396)
Anteriormente: Substituir método por objeto de método (Replace Method with Method Object). Inversa de: Substituir comando por função.
Motivação [p.389-390]:
- Às vezes convém encapsular uma função em seu próprio objeto ("objeto de comando"), construído em torno de um único método cuja requisição e execução é o propósito do objeto [p.389]
- Dá mais flexibilidade: operações complementares (desfazer), métodos para construir parâmetros (ciclo de vida mais rico), personalização por herança e hooks; em linguagens sem funções de primeira classe oferece boa parte disso; e permite dividir função complexa com métodos e campos, chamando-os diretamente em testes e depuração [p.390]
- Custo de complexidade: dada a opção entre função de primeira classe e comando, Fowler escolhe a função em 95% das vezes; comando só se precisar de recurso que o simples não dá [p.390]
- Terminologia: "comando" aqui = objeto de comando (padrão Command do GoF); no princípio comando-consulta, "comando" é método que modifica estado e Fowler evita esse uso, preferindo "modificador"/"mutator" [p.390]
Procedimento (mecanismo) [p.390-391]:
1. Criar uma classe vazia para a função, com nome baseado nela.
2. Usar Mover função para movê-la para a classe; manter a original como função de encaminhamento até o fim; seguir a convenção de nome de comando da linguagem (senão "execute" ou "call").
3. Considerar criar um campo para cada argumento e movê-los para o construtor.
Exemplo (score de aplicação de seguro) [p.391-396]: move a função para `Scorer.execute`, passa os parâmetros um a um para o construtor (prefere execute sem parâmetros; útil se comandos tiverem ciclo de vida complexo ou forem enfileirados misturados) [p.392]; em seguida converte variáveis locais em campos, uma por vez (Fowler admite que essa refatoração simples não tem entrada no catálogo) [p.394]; com o estado no objeto, aplica Extrair função (`scoreSmoking`) sem briga com escopos de variáveis [p.395]. Nota: em JS, funções aninhadas seriam alternativa razoável; ele prefere comando por familiaridade e por poder testar e depurar chamadas das subfunções [p.396].
Citações curtas de prova:
- "optarei pela função em 95% das vezes" [p.390]
O que este trecho NÃO diz: não mostra o fim da decomposição da função inteira (o exemplo para na extração de uma parte).
Relevância: refactoring-expert: ALTA (técnica para quebrar função longa com muitas variáveis locais + critério para preferir função); testing-tdd-expert: BAIXA, possibilidade de testar subfunções do comando; api-design-expert: BAIXA; code-review-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert/references (ficha + técnica "variáveis locais para campos para destravar Extrair função").

---

### Substituir comando por função (Replace Command with Function) (PDF p.396-400)
Inversa de: Substituir função por comando.
Motivação [p.396-397]: objetos de comando são eficazes para processamentos complexos (métodos separados com estado compartilhado, chamadas diferentes, dados em etapas), mas têm custo; na maioria das vezes só se quer chamar a função; se ela não é complexa, o comando não vale o problema e vira função comum [p.397].
Procedimento (mecanismo) [p.397]:
1. Extrair função na criação do comando e na chamada ao método de execução (a nova função substituirá o comando).
2. Para cada método chamado pelo execute, Internalizar função; se o auxiliar devolve valor, Extrair variável na chamada antes e depois Internalizar função.
3. Mudar declaração de função para colocar todos os parâmetros do construtor no método execute.
4. Para cada campo, trocar referências no execute pelo parâmetro, testando a cada mudança.
5. Internalizar a chamada do construtor e do execute no ponto de chamada (a função que substitui).
6. Testar.
7. Remover código morto na classe de comando.
Exemplo (ChargeCalculator) [p.397-400]: extrai `charge(customer, usage, provider)`; extrai variável `baseCharge` e internaliza o getter auxiliar; move parâmetros do construtor para `charge`; mantém a atribuição de campos no construtor de propósito, pois assim um teste falha se esquecer de trocar um uso de campo por parâmetro (e se não falhar, considerar novo teste) [p.399-400]; internaliza construtor e chamada na função de topo; classe vira código morto, removida [p.400].
Citações curtas de prova:
- "se um teste não falhar, devo considerar o acréscimo de um novo teste" [p.400]
O que este trecho NÃO diz: não dá critério além de "função não muito complexa".
Relevância: refactoring-expert: ALTA (ficha); testing-tdd-expert: MÉDIA, uso dos testes como rede (deixar o campo para o teste falhar; lacuna de teste → novo teste); api-design-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert/references; truque do teste que falha em testing-tdd-expert (exemplo de "teste como detector de passo esquecido").

---

## Catálogo consolidado deste bloco (nome, 1 linha, página)
- Substituir condicional aninhada por cláusulas de guarda (fim do exemplo): guardas em dois passos, consolidar condições de mesmo retorno, eliminar variável de resultado dupla [p.321]
- Substituir condicional por polimorfismo: classes/subclasses com factory para switch por tipo ou caso base+variação [p.322-339]
- Introduzir caso especial (ex-Introduzir objeto nulo): objeto/literal/transformação que concentra o comportamento do valor especial [p.340-353]
- Introduzir asserção: explicita pressupostos como condição que deve ser sempre verdadeira [p.353-356]
- Separar consulta de modificador: duas funções, consulta sem efeito colateral e modificador [p.358-361]
- Parametrizar função (ex-Parametrizar método): uma função com parâmetro no lugar de duas com literais diferentes [p.361-365]
- Remover argumento de flag (ex-Substituir parâmetro por métodos explícitos): funções explícitas no lugar de parâmetro que seleciona fluxo [p.365-370]
- Preservar objeto inteiro: passar o registro todo em vez de valores extraídos [p.370-375]
- Substituir parâmetro por consulta (ex-Substituir parâmetro por método): função determina o valor sozinha [p.375-379]
- Substituir consulta por parâmetro: referência interna vira parâmetro, reduzindo acoplamento e ganhando transparência referencial [p.379-383]
- Remover método de escrita: campo definido só no construtor [p.383-386]
- Substituir construtor por função de factory (ex-método de factory): factory com nome claro e retorno flexível [p.386-388]
- Substituir função por comando (ex-método por objeto de método): função em objeto de comando para decompor e ampliar ciclo de vida [p.388-396]
- Substituir comando por função: volta ao simples quando o comando não compensa [p.396-400]

## Técnicas transversais observadas (úteis para o refactoring-expert)
- Migração de assinatura/valor em passos pequenos: criar nova função com nome pesquisável (prefixo `xxNEW`), delegar à antiga, migrar chamadas uma a uma testando, internalizar a antiga, renomear [p.371-373, 380-382]
- Extrair a comparação/ponto de mudança em uma função para poder migrar clientes um a um e só então trocar a representação [p.343-344]
- Armadilha (throw/erro) para valor inesperado ou ramo já movido, para flagrar erros durante a refatoração [p.327, 344]
- Mover estado de variáveis locais para campos antes de Extrair função em função longa [p.394-395]
- Nome com "And" e método grosseiro só para sobrescrita indicam duas responsabilidades [p.335-336]

## Checklist de cobertura
- Primeira página lida: 321
- Última página lida: 400 (último marcador do arquivo confirmado por grep, linha 3964)
- Páginas sem texto útil ou ilegíveis: nenhuma; p.321 começa no meio de uma refatoração (final do exemplo de guardas)
- Problemas de extração observados: indentação e quebras de linha irregulares no código; títulos de seção intercalados com "antes/depois" em colunas desordenadas (ex.: p.322, 340, 353, 357-358, 365, 370, 375-376, 379, 383-384, 386, 388-389, 396); linhas em branco soltas; typo do original 'NorweigianBlueParrot' (p.326); "En seguida" (p.349); sem número impresso de página visível
- Capítulos/seções cobertos integralmente: Substituir condicional por polimorfismo; Introduzir caso especial; Introduzir asserção; Capítulo 11 (introdução) e as 11 refatorações de API até Substituir comando por função (que termina em p.400)
- Capítulos/seções que continuam em outro bloco: Substituir condicional aninhada por cláusulas de guarda (início no bloco anterior, só o fim do exemplo aqui). O Capítulo 11 termina com Substituir comando por função (p.400); a sequência seguinte (Capítulo 12, herança) começará no próximo bloco. Aviso: o índice do cap. 11 (p.357-358) cita refatorações do catálogo que NÃO estão detalhadas neste bloco (Mudar declaração de função, Introduzir objeto de parâmetros etc. estão em capítulos anteriores)
