# Maus cheiros (code smells) e refatorações sugeridas

Os 24 maus cheiros do capítulo 3 de Fowler e Beck, agrupados por tema (a ordem do livro não é seguida). Para cada um: o sinal, as refatorações que o livro sugere (nomes definidos em [catalogo.md](catalogo.md)) e as ressalvas do próprio livro. Páginas de cada item em [fontes.md](fontes.md).

## Como usar um cheiro

- Um cheiro é um indício, não um veredito. Os autores afirmam que nenhum conjunto de métricas supera a intuição bem fundamentada e não dão limites numéricos (linhas, parâmetros, campos). O desenvolvedor calibra o próprio senso.
- Use esta lista para se orientar quando não souber qual refatoração aplicar: identifique o cheiro que está sentindo e consulte as refatorações sugeridas.
- Antes de qualquer transformação, confirme a rede de testes (veja o processo em `SKILL.md`).

## 1. Nomes e comunicação

**Nome misterioso**
- Sinal: nomes de funções, módulos, variáveis ou classes que não comunicam o que fazem nem como se usam. Dificuldade de achar um bom nome costuma revelar problema de design mais profundo.
- Refatorações: Mudar declaração de função (renomear função), Renomear variável, Renomear campo.
- Nota: os autores dizem que renomear talvez seja a refatoração mais comum que fazem e que um bom nome pode economizar horas de quebra-cabeça no futuro.

**Comentários**
- Sinal: comentário usado para explicar código ruim. O livro não condena comentários em si; condena o uso como desodorante.
- Refatorações: Extrair função (quando o comentário explica o que um bloco faz); Mudar declaração de função (quando a função já extraída ainda precisa de explicação); Introduzir asserção (para regras sobre o estado esperado).
- Ressalva: comentar é bom para registrar incerteza e o porquê de uma decisão. A regra prática do livro é refatorar primeiro, de modo que o comentário se torne supérfluo.

## 2. Duplicação e tamanho

**Código duplicado**
- Sinal: a mesma estrutura em mais de um lugar; o leitor compara as cópias e quem altera precisa achar todas.
- Refatorações: Extrair função; Deslocar instruções (aproximar trechos parecidos para facilitar a extração); Subir método (duplicata em subclasses de uma base comum).

**Função longa**
- Sinal: função difícil de entender. O que importa é a distância semântica entre o que a função faz e como faz, não o tamanho em si. Heurística do livro: sempre que sentir necessidade de comentar um trecho, escreva uma função nomeada pela intenção (vale até para uma linha).
- Refatorações: Extrair função (resolve na grande maioria dos casos). Se parâmetros e temporárias atrapalharem: Substituir variável temporária por consulta, Introduzir objeto de parâmetros, Preservar objeto inteiro e, em último caso, Substituir função por comando. Condicionais: Decompor condicional. Vários switches sobre a mesma condição: Substituir condicional por polimorfismo. Laços: extrair o laço; se for difícil nomear, ele provavelmente faz duas tarefas, então Dividir laço.
- Pista para achar o que extrair: comentários e blocos condicionais ou laços.

**Classe grande**
- Sinal: campos demais (e duplicação por perto); prefixos ou sufixos comuns em subconjuntos de campos; clientes que usam só um subconjunto da classe.
- Refatorações: Extrair classe; Extrair superclasse; Substituir código de tipos por subclasses. Também eliminar a redundância dentro da própria classe com extrações.

**Lista longa de parâmetros**
- Sinal: assinatura que confunde. Passar tudo por parâmetro nasceu para evitar dados globais, mas o excesso também atrapalha.
- Refatorações: Substituir parâmetro por consulta (parâmetro obtenível de outro); Preservar objeto inteiro; Introduzir objeto de parâmetros (dados que andam juntos); Remover argumento de flag; Combinar funções em classe (valores comuns viram campos).

**Elemento ocioso**
- Sinal: função cujo corpo diz o mesmo que o nome; classe com uma função simples; estrutura que não paga o próprio custo (esperava-se crescimento que não veio, ou a classe foi esvaziada por refatorações).
- Refatorações: Internalizar função; Internalizar classe; Condensar hierarquia.

**Generalidade especulativa**
- Sinal: ganchos e casos especiais para necessidades que ainda não existem ("um dia vamos precisar"). Se nada usa, atrapalha. Pista forte: os únicos usuários são casos de teste.
- Refatorações: Condensar hierarquia (classes abstratas que fazem pouco); Internalizar função e Internalizar classe (delegação desnecessária); Mudar declaração de função (parâmetros não usados); apagar o teste e aplicar Remover código morto.

## 3. Dados

**Dados globais**
- Sinal: dado modificável de qualquer ponto, sem rastro de quem alterou (variáveis globais, variáveis de classe, singletons). Mais perigoso quando mutável.
- Refatorações: Encapsular variável (sempre o primeiro passo), depois restringir o escopo a uma classe ou módulo.

**Dados mutáveis**
- Sinal: atualizações com efeitos inesperados; o risco cresce com o escopo.
- Refatorações: Encapsular variável; Separar variável (uma variável com dois papéis); Deslocar instruções e Extrair função (isolar o código sem efeito colateral); Separar consulta de modificador; Remover método de escrita; Substituir variável derivada por consulta (dado mutável que pode ser calculado); Combinar funções em classe ou em transformação (limitar quem atualiza); Mudar referência para valor (substituir a estrutura em vez de alterá-la no lugar).

**Agrupamentos de dados**
- Sinal: os mesmos três ou quatro dados juntos como campos ou parâmetros em vários lugares. Teste do livro: se você apagar um deles, os outros ainda fazem sentido? Se não, há um objeto pedindo para nascer.
- Refatorações: Extrair classe (nos campos), depois Introduzir objeto de parâmetros ou Preservar objeto inteiro (nas assinaturas).
- Nota: preferir classe a registro simples, porque a classe atrai comportamento (vira alvo de Mover função quando surgir Inveja de recursos).

**Obsessão por primitivos**
- Sinal: tipos primitivos onde o domínio pede tipos próprios (dinheiro, coordenadas, intervalos, unidades; telefone como texto; comparações soltas com limites).
- Refatorações: Substituir primitivo por objeto; se for um código de tipo que controla condicional, Substituir código de tipos por subclasses seguido de Substituir condicional por polimorfismo; grupos de primitivos juntos, Extrair classe e Introduzir objeto de parâmetros.

**Campo temporário**
- Sinal: campo preenchido só em certas circunstâncias; o leitor espera que o objeto use todos os campos.
- Refatorações: Extrair classe (para os campos órfãos); Mover função (levar o código que os usa); Introduzir caso especial (classe alternativa para quando os campos não valem).

**Classe de dados**
- Sinal: só campos e leitores/escritores, manipulada em excesso por outras classes. Em geral indica comportamento no lugar errado.
- Refatorações: Encapsular registro (se houver campos públicos); Remover método de escrita (campos que não devem mudar); Mover função, ou Extrair função e mover.
- Exceção do livro: registro de resultado imutável, como o dado intermediário gerado por Separar em fases, não precisa de encapsulamento.

## 4. Responsabilidade e acoplamento (onde cada código mora)

**Alteração divergente**
- Sinal: um módulo muda de formas diferentes por motivos diferentes (por exemplo, mexer nele ao trocar de banco de dados e também ao incluir um novo instrumento financeiro). Os contextos devem ir para módulos separados.
- Refatorações: Separar em fases (se os aspectos formam uma sequência); Mover função (se há idas e vindas); Extrair função antes de mover (se estão misturados na mesma função); Extrair classe (para formalizar a separação em classes).

**Cirurgia com rifle**
- Sinal: o oposto do anterior; cada mudança exige muitas pequenas edições em várias classes, e é fácil esquecer uma.
- Refatorações: Mover função e Mover campo (reunir num módulo); Combinar funções em classe; Combinar funções em transformação; Separar em fases.
- Tática do livro: internalizar primeiro (Internalizar função, Internalizar classe) para juntar a lógica espalhada, aceitando um resultado temporariamente grande, e depois extrair de forma melhor.

**Inveja de recursos**
- Sinal: função que conversa mais com outro módulo do que com o seu (por exemplo, vários métodos de leitura de outro objeto para calcular um valor).
- Refatorações: Mover função; se só parte da função tem inveja, Extrair função e depois mover. Heurística: coloque a função no módulo que tem a maior parte dos dados que ela usa.
- Exceções do livro: Strategy, Visitor e Self Delegation violam a regra de propósito para isolar o comportamento que varia. Regra geral: colocar junto o que muda junto.

**Cadeias de mensagens**
- Sinal: o cliente navega de objeto em objeto e fica acoplado à estrutura do caminho.
- Refatorações: Ocultar delegação (em qualquer ponto da cadeia, com o risco de criar intermediários). Alternativa melhor: ver para que o objeto final é usado, Extrair função desse uso e Mover função para dentro da cadeia; se vários clientes percorrem o mesmo caminho, adicionar um método.
- Ressalva: os autores pedem moderação; nem toda cadeia é um problema.

**Intermediário**
- Sinal: metade dos métodos de uma classe só delega para outra.
- Refatorações: Remover intermediário; Internalizar função (poucos métodos simples); Substituir superclasse por delegação ou Substituir subclasse por delegação (quando há comportamento adicional, para o intermediário virar o objeto real).

**Trocas escusas**
- Sinal: módulos que trocam dados demais, com acoplamento escondido.
- Refatorações: Mover função e Mover campo (reduzir a necessidade de conversa); um terceiro módulo para o interesse comum; Ocultar delegação; em herança, Substituir subclasse por delegação ou Substituir superclasse por delegação.

## 5. Condicionais e laços

**Switches repetidos**
- Sinal: a mesma lógica condicional (switch ou cascata de if/else) em vários lugares; cada nova variante obriga a achar e atualizar todos.
- Refatoração: Substituir condicional por polimorfismo.
- Ressalva: os autores não são contra condicionais. O foco mudou de "todo switch" para o switch repetido.

**Laços**
- Sinal: laço onde uma operação de pipeline (filtrar, mapear) mostraria melhor os elementos envolvidos e o que se faz com eles.
- Refatoração: Substituir laço por pipeline.

## 6. Herança e interfaces

**Herança recusada**
- Sinal: subclasse que não quer ou não precisa de parte do que herda.
- Refatorações: a receita tradicional é criar uma classe irmã e usar Descer método e Descer campo; para recusa da interface da superclasse, Substituir subclasse por delegação ou Substituir superclasse por delegação.
- Ressalva forte do livro: os autores usam subclasses para reutilizar comportamento e, na maioria das vezes, o cheiro é sutil demais para valer a limpeza. Só aja se estiver causando confusão. Recusar a interface (não só a implementação) é o caso grave.

**Classes alternativas com interfaces diferentes**
- Sinal: classes que deveriam ser intercambiáveis, mas têm interfaces diferentes.
- Refatorações: Mudar declaração de função (alinhar assinaturas); Mover função até os protocolos coincidirem; Extrair superclasse se sobrar duplicação.
