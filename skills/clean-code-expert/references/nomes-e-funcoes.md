# Nomes e funções

Resumo detalhado dos capítulos 2 e 3 de *Código Limpo*, em paráfrase, com exemplos próprios. Páginas entre colchetes são marcadores PDF (veja fontes.md). Itens sem página são convenção desta skill.

## Parte 1: nomes

### Princípios

- O nome responde por que existe, o que faz e como se usa. Se precisa de comentário para isso, não cumpre o papel [p.27].
- O custo de pensar em um bom nome é menor que o de ler um ruim muitas vezes. Renomear é parte normal do trabalho, e as ferramentas de refatoração de código tornam isso barato [p.27, 38-39].
- A simplicidade do código pode não mudar ao renomear, mas ele fica explícito. Dar nome a índices e valores mágicos, e depois trocar o vetor por uma classe pequena com um método que diz a pergunta, elimina o conhecimento escondido [p.27-28].

### Catálogo de regras

| Regra | Em uma linha | Página |
|---|---|---|
| Revelar propósito | Nome diz intenção e, quando couber, unidade (dias, segundos) | 27 |
| Sem desinformação | Não chamar de lista o que não é lista; evitar abreviações que lembram outra coisa; cuidado com nomes quase iguais em módulos diferentes; nunca usar `l` minúsculo nem `O` maiúsculo como nome | 28-29 |
| Distinções reais | Se dois nomes precisam existir, o significado deve diferir; nada de `a1`, `a2` nem de erro de grafia proposital | 29-30 |
| Sem palavras vazias | Sufixos como Info, Data, Object, Variable, Table, NameString não distinguem nada | 29-30 |
| Pronunciáveis | Programar é atividade social; nome impronunciável não se discute em voz alta | 30-31 |
| Buscáveis | Constante nomeada se acha; o número solto, não. Uma letra só em escopo pequeno | 31-32 |
| Tamanho proporcional ao escopo | Nome curto cabe em escopo de poucas linhas; escopo grande pede nome preciso | 31, 307 |
| Sem codificações | Nada de notação húngara, prefixo de membro nem prefixo de subsistema. Para interface e implementação, o livro prefere não enfeitar a interface e, se for preciso marcar algo, marcar a implementação | 32-33, 307-308 |
| Sem mapeamento mental | O leitor não deve traduzir. Contador `i`, `j`, `k` só em escopo minúsculo | 33 |
| Classes são substantivos | Evitar Gerente, Processador, Dados e Info no nome de classe | 34 |
| Métodos são verbos | Acessores e predicados com get, set e is | 34 |
| Fábrica com nome | Em vez de construtores sobrecarregados, métodos estáticos cujo nome descreve os parâmetros, com construtores privados | 34 |
| Sem gracinha | Humor e gíria só funcionam para quem conhece a piada | 34 |
| Uma palavra por conceito | Não alternar buscar, obter, recuperar entre classes; o léxico consistente poupa pesquisa | 35 |
| Sem trocadilho | Não usar a mesma palavra com dois sentidos (somar valores e inserir em coleção) | 35 |
| Domínio da solução | Termos de computação, de padrões e de algoritmos são bem-vindos | 35-36 |
| Domínio do problema | Quando não houver termo técnico, usar o do negócio, que se pode perguntar a um especialista | 36 |
| Contexto significativo | Colocar o nome em classe, função ou namespace que o explique; prefixo é último recurso; classe própria é melhor (um endereço em vez de vários campos com prefixo) | 36-38 |
| Contexto na medida | Prefixar tudo com a sigla do produto atrapalha a busca e o autocompletar | 38 |
| Descrever o efeito | Nome diz o que a função faz, inclusive o efeito colateral | 291-292, 308 |
| Nível de abstração do nome | O nome reflete a abstração da classe, não a implementação | 306 |
| Nomenclatura padrão | Nomes de padrões e convenções da plataforma e da equipe | 306-307 |
| Sem ambiguidade | Duas funções com nomes vagos parecidos não se distinguem; nome longo compensa se usado em um lugar só | 307 |

Citação central: nomes respondem por grande parte da legibilidade [p.304].

### Convenções desta skill sobre nomes

- Predicados booleanos em forma de pergunta (`isActive`, `hasPermission`, `canCancel`) em vez de `flag` ou `status`. O livro só cita o prefixo `is` de predicado [p.34]. Esta forma é preferência, não regra do livro.
- Palavras genéricas como `temp`, `obj`, `helper`, `util` e `service` pedem uma pergunta ("o que isto é?"), mas o livro não as proíbe e elogia nomes técnicos de padrões e estruturas [p.35-36].

### Exemplo próprio

```java
// Antes: o leitor não sabe o que é a lista nem o que 2 significa
List<int[]> pick(List<int[]> l) {
    List<int[]> r = new ArrayList<>();
    for (int[] x : l) if (x[1] == 2) r.add(x);
    return r;
}

// Depois: contexto e propósito explícitos
List<Seat> reservedSeats(List<Seat> seats) {
    List<Seat> reserved = new ArrayList<>();
    for (Seat seat : seats) if (seat.isReserved()) reserved.add(seat);
    return reserved;
}
```

## Parte 2: funções

### Tamanho e forma

- As funções devem ser pequenas, e menores que isso. O autor declara não ter pesquisa; baseia-se em décadas de prática. Como referência, cerca de 20 linhas e linhas de no máximo cerca de 150 caracteres [p.43].
- Blocos de if, else e while com uma linha, em geral uma chamada. A indentação fica em um ou dois níveis [p.44].
- A leitura segue de cima para baixo, como uma série de parágrafos que descem um nível de abstração por vez (Regra Decrescente) [p.46].

### O que é "uma coisa"

O livro dá três testes, todos no capítulo 3 [p.44-45] e em G30 e G34 [p.296-300]:

1. Todos os passos estão um nível de abstração abaixo do nome da função. Uma função pode ter vários passos e ainda fazer uma coisa, desde que eles apenas decomponham o nome.
2. Se existem seções dentro da função (declarações, inicialização, seleção), ela faz mais de uma coisa.
3. Se dá para extrair outra função cujo nome não é só uma reformulação do código extraído, ainda havia mais de uma coisa. Quando não dá, parar.

Misturar conceito de alto nível, detalhe intermediário e detalhe de baixo nível na mesma função confunde o leitor e convida mais detalhes [p.45].

Contrapeso: dividir sem critério gera estruturas minúsculas e dogmatismo. A regra de minimizar classes e métodos tem a menor prioridade das quatro regras do projeto simples [p.173]. Veja classes-e-sistemas.md.

### Switch e condicionais

- Switch é difícil de manter pequeno e de fazer uma coisa só. O livro o aceita uma vez, para criar objetos polimórficos, escondido atrás de herança; fora disso, cada switch é suspeito [p.46-47, 294].
- Encapsular a condição em uma função que diz o propósito [p.296]. Preferir a forma afirmativa à negativa [p.296].
- Múltiplos `return` não prejudicam funções pequenas e podem ser mais expressivos que uma única saída [p.55-56]. Retorno antecipado como técnica nomeada (guard clause) é convenção desta skill: reduz aninhamento, mas tende a gerar condições negativas, que o livro pede para evitar [p.296]. Prefira a que ficar mais clara.

### Parâmetros

| Quantidade | Orientação do livro | Página |
|---|---|---|
| Zero | Ideal | 48 |
| Um | Aceitável; formas legítimas: perguntar sobre o argumento, transformá-lo e devolver, ou evento | 48-49 |
| Dois | Mais difícil que um; aceitável quando são componentes de um só valor (um ponto); a ordem sem convenção natural é fonte de erro | 50 |
| Três | Evitar sempre que possível; pensar bastante antes. Uma tríade como a que compara decimais com tolerância é caso menos perigoso | 48, 50-51, 398 |
| Mais de três | Exige motivo muito especial e mesmo assim não deve ser usado | 48 |

O catálogo de heurísticas (F1) é um pouco mais tolerante: nenhum é melhor, depois um, dois e três, e acima disso é questionável [p.283]. A regra desta skill é a do capítulo 3: zero a dois como alvo, três como exceção justificada.

Outras regras de parâmetros:

- Argumentos exigem conceito do leitor e multiplicam casos de teste [p.48-49].
- Parâmetro de saída surpreende o leitor; altere o estado do objeto dono do método ou devolva o valor transformado [p.49, 52].
- Parâmetro booleano denuncia função com duas coisas; divida em duas funções. O mesmo vale para parâmetro seletor (enum ou inteiro que escolhe o comportamento) [p.49-50, 289-290].
- Díades podem virar mônades: método do objeto, campo da classe ou classe nova que recebe o dado no construtor [p.50].
- Variáveis passadas juntas costumam ser um conceito que merece nome: agrupe em um objeto. Isso não é trapaça [p.398].
- Argumentos variáveis tratados igualmente contam como um parâmetro de lista [p.398].
- O nome e o parâmetro de um método de um argumento formam um par verbo e substantivo; a forma palavra-chave embute o papel do argumento no nome [p.398].
- Nomes de funções: longos e descritivos valem mais que curtos e enigmáticos; usar a mesma fraseologia em funções de um módulo [p.48].

### Efeitos colaterais e comandos

- Efeito colateral escondido é uma mentira do nome. Ele cria acoplamento temporal: a função só pode ser chamada em certos momentos. Se for inevitável, o nome precisa dizer [p.51-52, 297-298].
- Separação comando-consulta: a função altera o estado ou responde, não os dois. Um método que altera e devolve sucesso gera chamadas ambíguas em condições [p.52-53].
- Prefira exceções a códigos de erro, extraia o try/catch para uma função própria e deixe que a função que trata erro só trate erro [p.53-54]. Detalhes em objetos-e-erros.md.
- Duplicação é a raiz de muitos males; o exemplo do livro eliminou um algoritmo repetido quatro vezes [p.55].

### Como chegar lá

Funções boas costumam começar longas e feias. O autor escreve com testes cobrindo cada linha e então divide, renomeia e remove duplicação, sempre com os testes passando. As regras não são aplicadas desde o início [p.56]. A mecânica dessa limpeza fica para a skill de refatoração, se instalada.

### Exemplo próprio

```java
// Mistura níveis: regra de negócio, detalhe de formatação e persistência
void closeInvoice(Invoice invoice) {
    BigDecimal total = BigDecimal.ZERO;
    for (Line line : invoice.lines()) total = total.add(line.amount());
    invoice.setTotal(total.setScale(2, RoundingMode.HALF_UP));
    invoice.setStatus("C");
    invoiceTable.updateStatus(invoice.id(), "C");
}

// Cada passo está um nível abaixo do nome
void closeInvoice(Invoice invoice) {
    invoice.close();
    invoices.save(invoice);
}
```
