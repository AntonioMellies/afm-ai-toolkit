# Catálogo de refatorações (mecânica resumida)

As refatorações dos capítulos 6 a 12 de Fowler, com nome em português e em inglês, quando usar e os passos em paráfrase. Os passos são do livro, condensados; as páginas ficam em [fontes.md](fontes.md). A organização por objetivo (e não a ordem do livro) e os exemplos em Java são desta skill.

## Como ler

- Formato do livro: nome (com aliases), esboço, motivação (incluindo quando não aplicar), procedimento e exemplo. Aqui ficam só motivação e procedimento.
- O procedimento do livro usa passos mínimos com teste após cada um. Na prática dá-se passos maiores quando a situação é simples, mas, ao aparecer um erro, desfaz-se o último passo e volta-se a passos menores: quanto mais complicada a situação, menores devem ser os passos.
- Toda refatoração tem uma inversa lógica. O livro lista só as que valem a pena; internalizar é frequentemente o caminho para reorganizar (juntar com Internalizar e separar com Extrair).
- "Testar" em cada passo significa executar a suíte automatizada (ou o subconjunto rápido que cobre o trecho). Sem isso, não é refatoração segura.
- Nos exemplos, a sintaxe Java é original desta skill; quando uma construção Java é usada como equivalente do que o livro descreve em JavaScript (por exemplo `record`, `stream`), isso é convenção desta skill.

Índice por objetivo:
1. [Extrair, internalizar e nomear](#1-extrair-internalizar-e-nomear)
2. [Dados e encapsulamento](#2-dados-e-encapsulamento)
3. [Agrupar e separar responsabilidades](#3-agrupar-e-separar-responsabilidades)
4. [Mover](#4-mover)
5. [Laços e código morto](#5-laços-e-código-morto)
6. [Condicionais](#6-condicionais)
7. [APIs: assinaturas, consultas, construtores e comandos](#7-apis-assinaturas-consultas-construtores-e-comandos)
8. [Herança](#8-herança)

---

## 1. Extrair, internalizar e nomear

### Extrair função (Extract Function)
Aliases: Extrair método. Inversa: Internalizar função.
- Quando: um trecho exige esforço para entender o que faz. O critério é separar intenção de implementação, não tamanho nem reutilização. Funções de uma linha valem se o nome revelar melhor o propósito. Comentário antes do trecho costuma sugerir o nome.
- Quando não: se não surge nenhum nome melhor que o código, não extraia. Dá para extrair, tentar e internalizar de volta se não ajudou.
- Passos:
  1. Crie a função com nome pelo propósito (o que, não como).
  2. Copie o trecho para ela.
  3. Procure variáveis locais do escopo original usadas no trecho: leituras viram parâmetros; variável usada só no trecho, mas declarada fora, tem a declaração movida; variável reatribuída, se for uma só, vira retorno da função extraída. Com várias atribuições, desista e antes aplique Separar variável ou Substituir variável temporária por consulta.
  4. Compile, troque o trecho pela chamada, teste.
  5. Procure trechos iguais ou parecidos que possam usar a nova função (Substituir código internalizado por chamada de função).
- Mais de um valor a devolver: prefira escolher outro trecho; senão devolva um registro.

```java
// antes
double fee = parcel.weightKg() * 4.5;
if (parcel.destination().isRemote()) {   // taxa de região remota
    fee += 12.0;
}
// depois
double fee = weightFee(parcel) + remoteSurcharge(parcel);
```

### Internalizar função (Inline Function)
Inversa: Extrair função.
- Quando: o corpo é tão claro quanto o nome; excesso de delegação simples; um grupo de funções mal fatoradas que você quer juntar para reextrair.
- Passos: 1) confirme que não é método polimórfico sobrescrito; 2) ache todas as chamadas; 3) troque cada chamada pelo corpo, testando (pode ser gradual); 4) remova a definição.

### Extrair variável (Extract Variable)
Alias: Introduzir variável explicativa. Inversa: Internalizar variável.
- Quando: expressão complexa que ganha clareza com nome; também dá gancho para depurar. Se o nome faz sentido além da função, considere promovê-lo a função (em classe, Extrair função é fácil).
- Passos: 1) garanta que a expressão não tem efeitos colaterais; 2) declare variável imutável com a expressão; 3) troque a expressão pela variável (cada ocorrência, testando); 4) teste.

### Internalizar variável (Inline Variable)
Inversa: Extrair variável.
- Quando: o nome não diz mais que a expressão, ou a variável atrapalha outra refatoração ao redor.
- Passos: 1) confirme que o lado direito não tem efeito colateral; 2) torne a variável imutável (prova que há uma só atribuição) e teste; 3) troque referência por referência pela expressão, testando; 4) remova a declaração.

### Mudar declaração de função (Change Function Declaration)
Aliases: Renomear função, Adicionar parâmetro, Remover parâmetro, Modificar assinatura.
- Quando: o nome da função é a parte mais importante da junção entre módulos; renomeie assim que entender um nome melhor. Os parâmetros definem o contexto de uso (um parâmetro mais específico torna a função mais reutilizável e reduz acoplamento). Não há resposta única para "objeto ou valor"; por isso é preciso dominar a mudança.
- Procedimento simples (todas as chamadas alcançáveis de uma vez): 1) se remover parâmetro, confirme que o corpo não o usa; 2) altere a declaração; 3) atualize todas as chamadas; 4) teste. Separe renomear de alterar parâmetros em passos distintos.
- Procedimento de migração (muitas chamadas, método polimórfico, API publicada, mudança complicada): 1) refatore o corpo se precisar; 2) extraia o corpo para uma nova função (nome temporário fácil de procurar se o nome coincidir); 3) acrescente parâmetros novos à nova função; 4) teste; 5) internalize a função antiga; 6) restaure o nome final, se usou nome temporário.
- API publicada: pare após criar a nova função, marque a antiga como obsoleta e remova só quando todos os clientes migrarem (às vezes nunca).

```java
@Deprecated
double calc(Loan loan) { return lateFee(loan); }   // encaminha para o novo nome

double lateFee(Loan loan) { /* corpo extraído */ }
```

### Renomear variável (Rename Variable)
- Quando: o nome importa mais quanto maior o alcance. Campos persistentes pedem mais cuidado; variáveis de lambdas curtas podem ser breves.
- Passos: 1) se a variável é ampla, Encapsular variável; 2) altere todas as referências (se houver uso por outra base de código, é variável publicada e não dá); se imutável, copie para o novo nome e migre aos poucos; 3) teste.

### Substituir variável temporária por consulta (Replace Temp with Query)
- Quando: ao dividir função grande, transformar a temporária em função evita passar parâmetros às extrações e define fronteira clara; elimina duplicação do cálculo. Funciona melhor dentro de classe.
- Só vale para variável calculada uma vez e depois só lida, cujo cálculo dê o mesmo resultado mais tarde (não serve para "snapshots").
- Passos: 1) verifique que é definida antes do uso e que o cálculo é estável; 2) torne-a somente leitura se puder e teste; 3) extraia a atribuição para uma função (sem efeitos colaterais; se tiver, Separar consulta de modificador); 4) teste; 5) Internalizar variável.

### Substituir código internalizado por chamada de função (Replace Inline Code with Function Call)
- Quando: um trecho faz o que uma função existente já faz (inclusive de biblioteca). Exceção: se a semelhança é coincidência e mudar a função não deveria mudar este trecho. O nome da função deve fazer sentido no ponto de uso; se não fizer, o nome é ruim ou o propósito é outro.
- Passos: troque o trecho pela chamada e teste.

---

## 2. Dados e encapsulamento

### Encapsular variável (Encapsulate Variable)
Aliases: Autoencapsular campo, Encapsular campo.
- Quando: dados são mais difíceis de mover que funções (não há como deixar um encaminhador). Quanto maior o alcance, mais importante. Dá ponto único para validar, monitorar e reagir a mudanças. Para dados imutáveis importa bem menos. Ao tocar numa variável ampla em código legado, aproveite para encapsulá-la.
- Passos: 1) crie funções de leitura e escrita; 2) compile; 3) troque cada referência por chamada, testando a cada uma; 4) restrinja a visibilidade (se não der, renomeie a variável para achar referências restantes); 5) teste; 6) se o valor é registro, considere Encapsular registro.

### Encapsular registro (Encapsulate Record)
- Quando: registro mutável com campos expostos mistura o que é armazenado com o que é calculado; um objeto esconde essa diferença e permite renomear com período de transição. Para valor imutável, basta manter os campos e enriquecer.
- Passos: 1) Encapsular variável na variável do registro (nomes fáceis de procurar); 2) troque o conteúdo por uma classe simples que guarda o registro e oferece acesso ao registro bruto; 3) teste; 4) crie funções que devolvam o objeto, migre os clientes (priorize quem atualiza dados), criando métodos de acesso por campo; 5) remova o acesso ao registro bruto; 6) se os campos forem estruturas, aplique recursivamente (registro, coleção).

### Encapsular coleção (Encapsulate Collection)
- Quando: o getter devolve a coleção real e os clientes a alteram sem a classe saber. Opções do livro: métodos `add`/`remove` na classe mais getter que devolve cópia ou proxy somente leitura (Java facilita o proxy somente leitura). Escolha um padrão e use em toda a base, por consistência. O livro desaconselha esconder toda a coleção atrás de métodos especiais.
- Passos: 1) Encapsular variável, se preciso; 2) acrescente adicionar/remover (e Remover método de escrita no setter da coleção, ou faça o setter copiar); 3) compile; 4) mude os clientes que alteravam a coleção para usar os novos métodos, testando; 5) faça o getter devolver proxy somente leitura ou cópia; 6) teste.

```java
public List<Loan> loans() { return Collections.unmodifiableList(loans); }
public void addLoan(Loan loan) { loans.add(loan); }
```

### Substituir primitivo por objeto (Replace Primitive with Object)
Aliases: Substituir dado por objeto, Substituir código de tipos por classe.
- Quando: um dado simples ganha comportamento (formatação, comparação, validação) ou a lógica sobre ele começa a se duplicar. Comece com uma classe quase só encapsuladora; ela vira o lugar do comportamento. O livro vê isto como uma das refatorações mais importantes.
- Passos: 1) Encapsular variável; 2) crie uma classe de valor com construtor e getter; 3) compile; 4) faça o setter criar a instância e armazená-la; o getter devolve o getter da nova classe; 5) teste; 6) considere renomear os acessos e decidir entre valor ou referência.

```java
record Isbn(String value) {           // record: convenção desta skill
    Isbn { if (!value.matches("\\d{13}")) throw new IllegalArgumentException("ISBN inválido"); }
}
```

### Separar variável (Split Variable)
Aliases: Separar variável temporária, Remover atribuições a parâmetros.
- Quando: uma variável (que não seja de laço nem acumuladora) recebe valor mais de uma vez; isso indica mais de uma responsabilidade. Uma variável por responsabilidade.
- Passos: 1) renomeie na declaração e na primeira atribuição (se as atribuições seguintes são do tipo `i = i + algo`, é acumuladora: não separe); 2) torne-a imutável, se possível; 3) mude as referências até a segunda atribuição; 4) teste; 5) repita em etapas até a última atribuição.

### Renomear campo (Rename Field)
- Quando: nomes de campo em estruturas largamente usadas são cruciais para entender o sistema. Vale também para getters e setters de classe.
- Passos: 1) se o escopo é limitado, renomeie os acessos e teste; 2) senão, Encapsular registro; 3) renomeie o campo privado e ajuste os métodos internos; 4) teste; 5) mude o construtor, se usar o nome (Mudar declaração de função); 6) renomeie os métodos de acesso.

### Substituir variável derivada por consulta (Replace Derived Variable with Query)
- Quando: dado mutável que pode ser calculado a partir de outro. O cálculo esclarece o significado e não fica desatualizado. Exceção razoável: dado original imutável e resultado imutável.
- Passos: 1) identifique todos os pontos de atualização (Separar variável se necessário); 2) crie a função de cálculo; 3) Introduzir asserção para garantir que variável e cálculo coincidem em cada leitura (com Encapsular variável para ter onde pôr a asserção); 4) teste; 5) troque as leituras pela função; 6) teste; 7) Remover código morto na declaração e nas atualizações.

### Remover método de escrita (Remove Setting Method)
- Quando: o campo não deve mudar depois da construção. Casos comuns: construtor que usa o setter; script de criação com sequência de setters.
- Passos: 1) se o valor não vem no construtor, acrescente-o (Mudar declaração de função) e chame o setter no construtor (adicione todos os valores de uma vez se forem vários); 2) remova chamadas externas ao setter usando o construtor, testando; se for objeto de referência compartilhado atualizado, abandone; 3) internalize o setter e deixe o campo imutável se possível; 4) teste.

### Mudar referência para valor (Change Reference to Value)
Inversa: Mudar valor para referência.
- Quando: o objeto interno é tratado como valor (substitui-se por outro em vez de alterá-lo), o que o torna imutável e fácil de replicar, bom em sistemas distribuídos e concorrentes. Não faça se o objeto precisa ser compartilhado e as mudanças devem aparecer para todos.
- Passos: 1) verifique que a classe é ou pode se tornar imutável; 2) Remover método de escrita em cada setter; 3) forneça igualdade baseada em valor (e hash, onde se aplica).

### Mudar valor para referência (Change Value to Reference)
Inversa: Mudar referência para valor.
- Quando: várias cópias dos mesmos dados lógicos precisam ser atualizadas juntas; esquecer uma gera inconsistência. Se nunca há atualização, as cópias são aceitáveis.
- Passos: 1) crie um repositório das instâncias (se não houver); 2) garanta que o construtor consiga consultar a instância certa; 3) mude os construtores para obter o objeto do repositório, testando a cada mudança.

---

## 3. Agrupar e separar responsabilidades

### Introduzir objeto de parâmetros (Introduce Parameter Object)
- Quando: os mesmos dados viajam juntos em várias funções. A estrutura explicita a relação, reduz parâmetros e abre caminho para mover o comportamento comum para ela (o ganho maior). Prefira classe, de preferência objeto de valor.
- Passos: 1) crie a estrutura (se não houver); 2) teste; 3) acrescente um parâmetro para ela com Mudar declaração de função; 4) adapte cada chamada; 5) para cada elemento, passe a usar o da estrutura e remova o parâmetro original, testando.

```java
// antes: readings(LocalDate from, LocalDate to), total(LocalDate from, LocalDate to) ...
record DateRange(LocalDate start, LocalDate end) {   // record: convenção desta skill
    boolean contains(LocalDate d) { return !d.isBefore(start) && !d.isAfter(end); }
}
// depois: readings(DateRange range), total(DateRange range)
```

### Combinar funções em classe (Combine Functions into Class)
- Quando: um grupo de funções opera sobre o mesmo corpo de dados (em geral passado como argumento). A classe explicita o contexto comum, encurta chamadas e permite repassar o objeto. Vantagem sobre a transformação: se os dados originais mudam, as derivações continuam consistentes. O livro prefere classe a função aninhada (aninhadas são difíceis de testar).
- Passos: 1) Encapsular registro nos dados comuns (use Introduzir objeto de parâmetros se ainda não estiverem agrupados); 2) Mover função de cada função para a classe, removendo argumentos que são membros; 3) extraia e mova também a lógica que manipula os dados.

### Combinar funções em transformação (Combine Functions into Transform)
- Quando: dados derivados calculados em vários lugares; uma função de transformação reúne todos em campos do registro de saída. Alternativa a Combinar funções em classe; a classe é melhor se os dados originais forem atualizados (a transformação guarda derivados e pode ficar inconsistente).
- Passos: 1) crie a função que recebe o registro e devolve o mesmo conteúdo (em geral cópia profunda; vale um teste de que o original não é alterado); 2) mova a lógica para criar um campo novo no registro e mude o cliente (Extrair função antes se complexa); 3) teste; 4) repita para as demais.

### Separar em fases (Split Phase)
- Quando: um trecho trata dois assuntos diferentes. A melhor pista é quando etapas usam conjuntos distintos de dados e funções. Separe em duas fases sequenciais ligadas por estrutura de dados intermediária (cada uma pode ser entendida sem a outra).
- Passos: 1) extraia a segunda fase em função; 2) teste; 3) introduza a estrutura intermediária como argumento da função extraída; 4) teste; 5) para cada parâmetro da segunda fase que a primeira também usa, mova-o para a estrutura intermediária, testando; se um parâmetro não deve ser usado pela segunda fase, extraia o resultado de cada uso para um campo e use Mover instruções para os pontos de chamada; 6) Extrair função na primeira fase, devolvendo a estrutura (pode ser um objeto de transformação).

```java
record ParsedLine(String sku, int quantity) {}
ParsedLine parse(String line) { /* fase 1 */ }
double price(ParsedLine l, Map<String, Double> prices) { /* fase 2 */ }
```

### Extrair classe (Extract Class)
Inversa: Internalizar classe.
- Quando: classe cresceu. Sinais: subconjunto de dados e de métodos que formam um conjunto; dados que mudam juntos; teste de remoção (o que deixaria de fazer sentido se eu tirasse isto?); subtipagem que afeta só alguns recursos.
- Passos: 1) decida a divisão; 2) crie a nova classe e, se preciso, renomeie a original; 3) ligue a original à nova na construção; 4) Mover campo, um a um, testando; 5) Mover função, começando pelos métodos de nível mais baixo (os que são chamados, não os que chamam), testando; 6) revise as interfaces, remova o que sobrou e ajuste nomes; 7) decida se a nova classe é exposta (considere torná-la objeto de valor).

### Internalizar classe (Inline Class)
Inversa: Extrair classe.
- Quando: a classe quase não faz mais nada (esvaziada por refatorações), ou como passo para refazer a divisão: junte as classes e extraia de novo.
- Passos: 1) na classe de destino, crie funções que delegam para todas as públicas da original; 2) troque as referências, testando; 3) mova funções e dados até esvaziar a original; 4) apague-a.

### Ocultar delegação (Hide Delegate)
Inversa: Remover intermediário.
- Quando: o cliente conhece o objeto delegado do servidor; se a interface dele mudar, as mudanças chegam a todos os clientes. Um método de delegação no servidor limita a propagação.
- Passos: 1) crie no servidor um método simples de delegação para cada método do delegado usado; 2) adapte os clientes, testando; 3) se ninguém mais precisa do acesso ao delegado, remova o acessador; 4) teste.

### Remover intermediário (Remove Middle Man)
Inversa: Ocultar delegação.
- Quando: a cada novo recurso do delegado é preciso criar encaminhamento no servidor; a classe virou só intermediária. O nível certo de ocultação muda com o tempo; ajuste conforme necessário.
- Passos: 1) crie um getter para o delegado; 2) troque cada uso do método de delegação por encadeamento, testando; 3) apague o método de delegação quando não restar chamada. Com ferramenta automatizada: Encapsular variável no campo do delegado e Internalizar função nos métodos.

---

## 4. Mover

### Mover função (Move Function)
Alias: Mover método.
- Quando: a modularidade melhora se a função vive junto do que ela usa. Motivos: a função referencia mais elementos de outro contexto; ela é chamada de outro lugar; é auxiliar com valor próprio. A decisão raramente é fácil; quanto mais difícil, menos importante, e dá para mover depois.
- Passos: 1) examine o que a função usa no contexto atual e se deve ir junto (mova antes as chamadas de menor dependência; se só a função de alto nível chama as subfunções, internalize, mova e reextraia); 2) verifique se é polimórfica; 3) copie para o destino e adapte (parâmetros ou referência ao contexto original, nome apropriado); 4) compile; 5) defina como referenciar o destino; 6) transforme a original em delegação; 7) teste; 8) considere Internalizar função na original (ela pode ficar para sempre, mas se os chamadores alcançam o destino, remova o intermediário).

### Mover campo (Move Field)
- Quando: estruturas de dados ruins geram código que só lida com dados ruins. Sinais: um campo sempre passa junto com outro registro; mudar um registro obriga a mudar um campo de outro; o mesmo campo atualizado em várias estruturas.
- Passos: 1) garanta que o campo original está encapsulado; 2) teste; 3) crie campo e acessadores no destino; 4) compile; 5) garanta referência do objeto original ao final; 6) adapte os acessadores para usar o campo final (se compartilhado, atualize ambos e use Introduzir asserção para detectar inconsistência antes de finalizar); 7) teste; 8) remova o campo original; 9) teste.

### Mover instruções para uma função (Move Statements into Function)
Inversa: Mover instruções para os pontos de chamada.
- Quando: o mesmo código aparece em toda chamada de uma função; combine-o na função (menos duplicação). Se elas não fazem sentido como parte da função, extraia junto com a chamada.
- Passos: 1) aproxime o código repetido da chamada (Deslocar instruções); 2) se só uma função chama a final, recorte e cole e pronto; 3) senão, extraia em um ponto de chamada a chamada e as instruções, com nome provisório fácil de procurar; 4) converta as demais chamadas, testando; 5) internalize a função original na nova; 6) renomeie para o nome original ou melhor.

### Mover instruções para os pontos de chamada (Move Statements to Callers)
Inversa: Mover instruções para uma função.
- Quando: um comportamento comum precisa variar em algumas chamadas; leve o que varia para fora. Para mudança grande de fronteira, internalize e redefina por deslocamento e extração.
- Passos: 1) caso simples (uma ou duas chamadas, função simples): recorte a primeira linha e cole nos pontos de chamada; 2) senão, extraia o que NÃO será movido, com nome provisório (se método sobrescrito, extraia em todas as classes); 3) internalize a função original; 4) renomeie a extraída para o nome original ou melhor.

### Deslocar instruções (Slide Statements)
Alias: Consolidar fragmentos condicionais duplicados.
- Quando: código relacionado deve ficar junto (por exemplo, declarar a variável perto do primeiro uso). Muitas vezes é preparação para Extrair função.
- Passos: 1) escolha a posição final e verifique interferência: o fragmento não pode passar antes da declaração do que referencia, nem além de quem o referencia, nem por instrução que altere algo que ele referencie, nem (se ele modifica algo) por quem referencie o que foi modificado; 2) corte e cole; 3) teste. Se falhar, divida em passos menores.

### Substituir algoritmo (Substitute Algorithm)
- Quando: há um jeito mais claro de fazer a mesma coisa, ou uma biblioteca duplica o seu código. Decomponha o máximo antes: substituir algoritmo grande é difícil.
- Passos: 1) isole o código numa função completa; 2) escreva testes só dessa função; 3) prepare o algoritmo alternativo; 4) compile; 5) compare as saídas dos dois; se divergirem, use o antigo como referência para depurar.

---

## 5. Laços e código morto

### Dividir laço (Split Loop)
- Quando: um laço faz duas tarefas só porque pode. Separar permite entender apenas o que se vai alterar e facilita extrair funções que devolvem um valor. Desconforto com percorrer duas vezes: separe refatoração de otimização (otimize depois, se for gargalo, e então é fácil reunir de novo).
- Passos: 1) copie o laço; 2) elimine os efeitos colaterais duplicados; 3) teste; 4) considere Extrair função em cada laço.

### Substituir laço por pipeline (Replace Loop with Pipeline)
- Quando: o ambiente tem operações de coleção (mapear, filtrar). Leia de cima para baixo como os objetos fluem.
- Passos: 1) crie uma variável para a coleção do laço (pode ser cópia simples); 2) de cima para baixo, troque cada pedaço de comportamento do laço por uma operação de pipeline, testando; 3) quando o laço estiver vazio, remova-o (se houver acumulador, receba nele o resultado).

```java
// antes
List<String> names = new ArrayList<>();
for (Member m : members) { if (m.isActive()) names.add(m.name()); }
// depois (Streams são o equivalente Java: convenção desta skill)
List<String> names = members.stream().filter(Member::isActive).map(Member::name).toList();
```

### Remover código morto (Remove Dead Code)
- Quando: código não usado continua custando a quem lê. Apague; o controle de versões guarda a história. Comentar código morto é hábito obsoleto.
- Passos: 1) se pode ser referenciado de fora (função inteira), procure chamadas; 2) remova; 3) teste.

---

## 6. Condicionais

### Decompor condicional (Decompose Conditional)
- Quando: lógica condicional complexa. O código dos testes e dos ramos diz o que acontece, mas esconde o porquê. Dê nome à condição e a cada ramo.
- Passos: Extrair função na condição e em cada ramo.

### Consolidar expressão condicional (Consolidate Conditional Expression)
- Quando: várias verificações diferentes levam à mesma ação; mostre que é uma só verificação e prepare para extrair a condição. Não faça se as verificações são realmente independentes.
- Passos: 1) garanta que nenhuma tem efeito colateral (senão, Separar consulta de modificador antes); 2) combine duas condições com operador lógico (sequências com `||`, ifs aninhados com `&&`); 3) teste; 4) repita; 5) considere Extrair função na condição resultante.

### Substituir condicional aninhada por cláusulas de guarda (Replace Nested Conditional with Guard Clauses)
- Quando: se os dois ramos são comportamento normal, use if/else; se um ramo é incomum, verifique e retorne cedo (cláusula de guarda), dizendo ao leitor que aquilo não é o essencial. Ponto único de saída não é regra útil: vale o que for mais claro.
- Passos: 1) transforme a condição mais externa em guarda; 2) teste; 3) repita; 4) se as guardas devolvem o mesmo resultado, Consolidar expressão condicional.

```java
double refund(Booking b) {
    if (b.isCancelled() || b.isUsed()) return 0;          // guardas consolidadas
    if (b.daysUntilTrip() < 2) return b.price() * 0.5;
    return b.price();
}
```

### Substituir condicional por polimorfismo (Replace Conditional with Polymorphism)
- Quando: lógica condicional complexa que se divide em casos de alto nível, sobretudo vários switches sobre um mesmo código de tipo; ou um caso base com variantes (base na superclasse, variantes nas subclasses). Não troque todo if/switch por polimorfismo.
- Passos: 1) se não há classes para o comportamento polimórfico, crie-as e uma função de factory que devolva a instância certa; 2) use a factory nos chamadores; 3) mova a função condicional para a superclasse (extraia antes, se não for autocontida); 4) em uma subclasse, sobrescreva o método e copie o ramo correspondente; 5) repita por ramo; 6) deixe um default na superclasse, ou torne o método abstrato ou lance erro para indicar responsabilidade da subclasse.

```java
// antes: dois métodos com switch sobre channel (EMAIL, SMS, PUSH)
interface Channel { double cost(Message m); String render(Message m); }
final class SmsChannel implements Channel { /* só as regras de SMS */ }
// factory: Channel Channels.of(String code)
```

### Introduzir caso especial (Introduce Special Case)
Alias: Introduzir objeto nulo. O livro trata Objeto Nulo como um caso particular de Caso Especial.
- Quando: muitos clientes testam o mesmo valor especial e reagem do mesmo modo. Leve a reação para um único objeto (valores fixos como literal, ou objeto com métodos).
- Passos (o "assunto" é a propriedade comparada): 1) acrescente ao assunto uma propriedade que diz se é o caso especial, devolvendo falso; 2) crie o objeto do caso especial só com essa propriedade, devolvendo verdadeiro; 3) extraia a comparação para uma função e faça todos os clientes usarem; 4) introduza o caso especial (devolvido por função ou por transformação); 5) mude o corpo da comparação para usar a propriedade; 6) teste; 7) mova o comportamento comum para o caso especial (Combinar funções em classe ou em transformação); 8) internalize a função de comparação onde ainda for necessária.

```java
// antes: if (member == null) { name = "visitante"; plan = Plan.FREE; } em vários lugares
final class AnonymousMember extends Member {
    @Override boolean isAnonymous() { return true; }
    @Override String name() { return "visitante"; }
    @Override Plan plan() { return Plan.FREE; }
}
```

### Introduzir asserção (Introduce Assertion)
- Quando: um trecho só funciona se certa condição for verdadeira. Em vez de comentar o pressuposto, escreva uma asserção: ela comunica o estado esperado e ajuda a depurar. Falha de asserção é erro do programador; o sistema deve funcionar igual com todas removidas. Não é validação de entrada externa.
- Passos: ao perceber que uma condição deve ser verdadeira, acrescente a asserção. Como não altera o comportamento, preserva a execução.

---

## 7. APIs: assinaturas, consultas, construtores e comandos

### Separar consulta de modificador (Separate Query from Modifier)
- Quando: a função devolve valor e também tem efeito colateral observável. Função sem efeito colateral é valiosa (chamável quantas vezes quiser, movível, testável). Regra do livro: quem devolve valor não deve ter efeito colateral observável, seguida na maioria das vezes, sem pureza absoluta. Cache interno não é efeito observável.
- Passos: 1) copie a função com nome de consulta (o nome da variável que recebe o resultado ajuda); 2) elimine os efeitos colaterais da cópia; 3) compile; 4) em cada chamada que usa o retorno, chame a consulta e depois o original; teste a cada mudança; 5) remova o retorno do original; 6) teste. Depois, remova duplicação entre os dois.

### Parametrizar função (Parameterize Function)
- Quando: duas funções com lógica muito parecida e literais diferentes. Também como refatoração preparatória (em vez de copiar e trocar valores).
- Passos: 1) escolha uma das funções; 2) Mudar declaração de função para acrescentar os literais como parâmetros; 3) em cada chamada, passe o literal; 4) teste; 5) ajuste o corpo para usar os parâmetros, testando; 6) troque as chamadas das funções parecidas, adaptando a parametrizada se algum caso não couber.

### Remover argumento de flag (Remove Flag Argument)
Alias: Substituir parâmetro por métodos explícitos.
- Quando: quem chama passa um literal (booleano, enumerado ou texto) apenas para escolher a lógica, e a função usa o argumento no fluxo de controle. Isso esconde as diferenças entre chamadas; booleanos nem dizem o que `true` significa. Não é flag se o valor vem de dados do programa. Mais de uma flag pode indicar função fazendo demais.
- Passos: 1) crie uma função explícita por valor do parâmetro (se há condicional clara, use Decompor condicional; senão crie encapsuladoras); 2) troque cada chamada com literal pela função explícita.

### Preservar objeto inteiro (Preserve Whole Object)
- Quando: valores derivados de um registro são extraídos e passados para a função. Passar o objeto resiste a mudanças futuras e encurta a lista. Não faça se criar dependência indesejada entre módulos. Extrair vários valores só para uma lógica é Inveja de recursos.
- Passos: 1) crie função vazia com os parâmetros desejados e nome fácil de procurar; 2) o corpo chama a antiga mapeando parâmetros; 3) compile; 4) adapte cada chamada, testando; 5) remova código de derivação que sobrou (Remover código morto); 6) internalize a antiga; 7) renomeie a nova e suas chamadas.

### Substituir parâmetro por consulta (Replace Parameter with Query)
Inversa: Substituir consulta por parâmetro.
- Quando: a chamada passa um valor que a função pode determinar facilmente sozinha (o caso mais seguro: obtido de outro parâmetro). Evite se criar dependência indesejada ou fizer perder transparência referencial (por exemplo, acessar estado global mutável).
- Passos: 1) se precisar, extraia o cálculo do parâmetro; 2) troque as referências ao parâmetro no corpo pela expressão, testando; 3) Mudar declaração de função para remover o parâmetro.

### Substituir consulta por parâmetro (Replace Query with Parameter)
Inversa: Substituir parâmetro por consulta.
- Quando: o corpo referencia algo (global, elemento que se quer mover) que se quer remover da função; quem chama passa a fornecer o valor. Ajuda a tornar partes do programa mais puras (módulos de funções puras cercados por lógica de E/S). Custo: complica o chamador.
- Passos: 1) Extrair variável na consulta; 2) extraia o resto do corpo (sem a consulta) em nova função com nome fácil de procurar; 3) Internalizar variável; 4) internalize a função original; 5) renomeie a nova para o nome original.

### Substituir construtor por função de factory (Replace Constructor with Factory Function)
Alias: Substituir construtor por método de factory.
- Quando: o construtor limita (deve devolver a classe exata, nome fixo, exige `new`). A factory pode devolver subclasse ou proxy e ter nome melhor.
- Passos: 1) crie a factory chamando o construtor; 2) troque cada chamada de construtor pela factory, testando; 3) restrinja a visibilidade do construtor.

### Substituir função por comando (Replace Function with Command)
Inversa: Substituir comando por função.
- Quando: função complexa com muitos dados e variáveis locais que dificultam extrair; um objeto de comando permite dividi-la em métodos com estado compartilhado, desfazer, ganchos e construção de parâmetros em etapas. O livro diz que prefere a função em 95% das vezes. Comando aqui é o objeto do padrão Command (Padrões de Projeto), não o sentido de "modificador".
- Passos: 1) crie uma classe vazia com nome baseado na função; 2) Mover função para ela (a original fica como encaminhadora até o fim; método de execução com nome convencional, como `execute`); 3) considere um campo por argumento e passe-os ao construtor.

### Substituir comando por função (Replace Command with Function)
Inversa: Substituir função por comando.
- Quando: o comando é simples e só é chamado como função; o objeto passou a custar mais que vale.
- Passos: 1) Extrair função na criação do comando e na chamada de execução; 2) internalize cada método auxiliar chamado pela execução (Extrair variável antes se devolverem valor); 3) leve os parâmetros do construtor para o método de execução; 4) troque as referências a campos por parâmetros, testando; 5) internalize construtor e execução no ponto de chamada; 6) teste; 7) Remover código morto na classe de comando.

---

## 8. Herança

### Subir método (Pull Up Method)
Inversa: Descer método.
- Quando: métodos duplicados em subclasses. Procure as diferenças (revelam comportamentos sem teste). Se só diferem por parâmetros, Parametrizar função antes. Se o corpo usa recursos só da subclasse, suba-os antes. Fluxo parecido com detalhes diferentes: Formar método de template (Form Template Method, citado no livro).
- Passos: 1) deixe os corpos idênticos; 2) verifique que tudo que o corpo referencia é acessível da superclasse; 3) alinhe assinaturas (Mudar declaração de função); 4) crie o método na superclasse com o corpo de um deles; 5) compile; 6) apague de uma subclasse, teste; 7) continue até remover de todas.

### Subir campo (Pull Up Field)
Inversa: Descer campo.
- Quando: subclasses com campos duplicados (nomes às vezes diferentes); confirme pelo uso. Reduz declaração duplicada e permite subir o comportamento que os usa.
- Passos: 1) verifique que são usados do mesmo modo; 2) renomeie para o mesmo nome (Renomear campo); 3) crie o campo na superclasse, acessível às subclasses; 4) apague das subclasses; 5) teste.

### Subir corpo do construtor (Pull Up Constructor Body)
- Quando: construtores têm código comum; eles têm regras especiais de ordem, então a abordagem difere de Subir método. Se confundir, considere Substituir construtor por função de factory.
- Passos: 1) defina construtor na superclasse e chame-o das subclasses; 2) Deslocar instruções para as comuns ficarem logo após a chamada a `super`; 3) mova o código comum para a superclasse, passando via `super` os parâmetros necessários; 4) teste; 5) o que não puder subir para o início: Extrair função e Subir método.

### Descer método (Push Down Method)
Inversa: Subir método.
- Quando: o método só serve a uma subclasse (ou a poucas). Só dá se o chamador souber que lida com aquela subclasse; senão, Substituir condicional por polimorfismo com um comportamento neutro na superclasse.
- Passos: 1) copie para cada subclasse que precisa; 2) remova da superclasse; 3) teste; 4) remova das subclasses que não precisam; 5) teste.

### Descer campo (Push Down Field)
Inversa: Subir campo.
- Quando: o campo só é usado por uma subclasse (ou poucas).
- Passos: 1) declare nas subclasses que precisam; 2) remova da superclasse; 3) teste; 4) remova das que não precisam; 5) teste.

### Substituir código de tipos por subclasses (Replace Type Code with Subclasses)
Incorpora: Substituir enumeração pelo padrão State/Strategy e Extrair subclasse. Inversa: Remover subclasse.
- Quando: o código de tipo comanda comportamento condicional (aplique depois Substituir condicional por polimorfismo) ou há campos e métodos válidos só para certos valores (Descer campo). Subclasses diretas são mais simples, mas não servem se o tipo for mutável ou se a herança já for usada para outro eixo; nesse caso, Substituir primitivo por objeto no tipo e subclasses nele.
- Passos: 1) autoencapsule o campo do código de tipo; 2) escolha um valor, crie a subclasse que sobrescreve o getter devolvendo o literal; 3) crie a lógica seletora (herança direta: factory via Substituir construtor por função de factory; indireta: no construtor); 4) teste; 5) repita por valor; 6) remova o campo do código; 7) Descer método e Substituir condicional por polimorfismo nos métodos que usam o código, e então remova os acessadores.

### Remover subclasse (Remove Subclass)
Inversa: Substituir código de tipos por subclasses.
- Quando: a subclasse faz tão pouco que não paga o custo de entendê-la (variação que migrou ou subclasse criada para algo que não veio). Troque por um campo na superclasse.
- Passos: 1) Substituir construtor por função de factory no construtor da subclasse (a decisão de qual subclasse criar vai para a factory da superclasse); 2) extraia testes de tipo da subclasse e mova para a superclasse; 3) crie um campo de tipo; 4) faça os métodos usarem o campo; 5) apague a subclasse; 6) teste. Em grupo, encapsule todas antes e depois remova uma a uma.

### Extrair superclasse (Extract Superclass)
- Quando: duas classes fazem tarefas parecidas; herança permite reunir semelhanças. Alternativa: Extrair classe (delegação). O livro costuma preferir Extrair superclasse primeiro por ser mais simples, sabendo que Substituir superclasse por delegação existe se for preciso.
- Passos: 1) crie superclasse vazia e faça as originais herdarem dela (ajuste construtores, se necessário); 2) teste; 3) Subir corpo do construtor, Subir método e Subir campo, um a um; 4) olhe os métodos restantes: partes comuns viram Extrair função e Subir método; 5) revise os clientes e considere usar a interface da superclasse.

### Condensar hierarquia (Collapse Hierarchy)
- Quando: classe e superclasse já não diferem o bastante para ficar separadas.
- Passos: 1) escolha qual classe remover (pelo nome que fizer mais sentido); 2) use Subir/Descer campo/método para levar tudo para uma só; 3) ajuste referências à removida; 4) remova a classe vazia; 5) teste.

### Substituir subclasse por delegação (Replace Subclass with Delegate)
- Quando: a herança é um recurso que só se usa uma vez (um único eixo de variação) e cria acoplamento íntimo entre as classes. A delegação permite variar por vários motivos e dá interface clara. Pense nisto como trocar subclasses pelos padrões State e Strategy (estruturalmente iguais). O livro usa herança primeiro e migra para delegação quando aparecem problemas.
- Passos (resumo): 1) factory se há muitas chamadas aos construtores; 2) crie a classe de delegação (com dados específicos e referência para trás); 3) acrescente na superclasse um campo para o delegado e inicialize na criação; 4) mova métodos um a um para o delegado (Mover função), mantendo na subclasse o código que delega; 5) se o método tem chamadas externas, mova o código de delegação para a superclasse protegido por verificação de presença; senão, Remover código morto; se houver mais de uma subclasse com duplicação, Extrair superclasse; 6) teste a cada método; 7) repita; 8) troque as chamadas aos construtores das subclasses pelo da superclasse; 9) apague a subclasse.

### Substituir superclasse por delegação (Replace Superclass with Delegate)
Alias: Substituir herança por delegação.
- Quando: as funções da superclasse não fazem sentido na subclasse (exemplo clássico: pilha como subclasse de lista), ou a instância da subclasse não é, em todos os usos, uma instância válida da superclasse (o "homônimo entre tipo e instância"). Também quando o acoplamento da herança faz a subclasse quebrar por mudanças na superclasse. Se as condições semânticas valem, herança continua simples e eficaz: use primeiro e migre se virar problema.
- Passos: 1) crie na subclasse um campo que referencia um objeto da antiga superclasse e inicialize-o; 2) para cada elemento da superclasse, crie função na subclasse que encaminha ao delegado, testando por grupo consistente (pares get/set só após ambos); 3) com tudo encaminhado, remova a ligação de herança.
