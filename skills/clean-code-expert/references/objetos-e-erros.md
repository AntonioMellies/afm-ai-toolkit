# Objetos, estruturas de dados, erros e limites

Resumo dos capítulos 6, 7 e 8 de *Código Limpo* e das heurísticas G36, G14 e G26, em paráfrase, com exemplos próprios. Páginas entre colchetes são marcadores PDF (veja fontes.md). Itens sem página são convenção desta skill.

## Parte 1: objetos e estruturas de dados (capítulo 6)

### Abstração de dados

- Variáveis privadas existem para que se possa mudar tipo e implementação. Adicionar métodos de leitura e escrita automaticamente expõe a implementação do mesmo jeito [p.98].
- Esconder a implementação não é colocar uma camada de acessores. É oferecer uma interface abstrata que permita manipular a essência dos dados sem conhecer a representação (a mesma ideia: pedir o percentual de combustível em vez de litros e capacidade) [p.99-100].
- Pense bastante em como representar os dados do objeto. A pior escolha é adicionar acessores sem refletir [p.100].

### Objeto ou estrutura de dados

| | Objeto | Estrutura de dados |
|---|---|---|
| Expõe | Operações | Dados |
| Esconde | Os dados | Nada |
| Fácil | Adicionar novos tipos sem tocar nas operações existentes | Adicionar novas operações sem tocar nas estruturas |
| Difícil | Adicionar novas operações (todas as classes mudam) | Adicionar novos tipos (todas as funções mudam) |

Fonte: [p.100-102]. A consequência prática: escolher conforme o eixo de mudança esperado. "Tudo é objeto" é um mito, e há momentos em que uma estrutura simples com procedimentos é a melhor escolha [p.102, 106].

### Lei de Demeter, corretamente

- Enunciado: um módulo não deve enxergar o interior dos objetos que manipula. Um método só deve chamar métodos do próprio objeto, de objetos que ele criou, de objetos recebidos por parâmetro e de objetos mantidos em variáveis de instância. Não chama métodos de objetos devolvidos por essas chamadas: fale com conhecidos, não com estranhos [p.102-103, 301].
- Cadeias longas de chamadas ("vagões de trem") costumam ser descuido. Mas dividir a cadeia em variáveis intermediárias não resolve, porque o chamador continua conhecendo a navegação [p.103].
- **Só vale para objetos.** Se os elementos da cadeia são estruturas de dados sem comportamento, elas expõem o interior por natureza e a lei não se aplica. Acessores confundem essa distinção [p.103].
- **A solução não é um método agregador no objeto.** Um método que devolve o dado profundo (por exemplo, um getter que já traz o caminho completo) leva a uma multiplicação de métodos e, no outro caminho, presume que o intermediário é estrutura de dados [p.104].
- **O que fazer:** perguntar o que o chamador vai fazer com o dado e mandar o objeto fazer isso. No exemplo do livro, o interesse real era criar um arquivo temporário, então o contexto passou a oferecer essa operação [p.104].

### Exemplo próprio

```java
// Antes: quem calcula conhece a navegação Pedido -> Cliente -> Endereço -> Cidade
BigDecimal freight(Order order, Tariff tariff) {
    String city = order.getCustomer().getAddress().getCity().getName();
    return tariff.priceFor(city);
}

// Tentativa que o livro rejeita: um método que só empacota a cadeia
String city = order.getCustomerAddressCityName();   // o objeto vira depósito de getters

// O que o livro pede: a pergunta é "qual o frete?", então o objeto responde
BigDecimal freight(Order order, Tariff tariff) {
    return order.shippingCost(tariff);   // Order sabe como chegar ao destino
}

// Caso em que a lei não se aplica: Destination é só dado (record sem comportamento)
String city = order.destination().city();
```

### Híbridos, DTO, bean e Active Record

- **Híbrido:** metade objeto (funções com sentido), metade estrutura (campos ou acessores públicos). É a pior combinação: dificulta tanto adicionar funções quanto tipos. Sinaliza modelo confuso. Evite [p.104].
- **DTO:** a forma ideal da estrutura de dados é uma classe com campos públicos e nenhuma função. Útil para banco, mensagens de rede e primeiros estágios de tradução de dados brutos [p.105].
- **Bean:** campos privados com getters e setters. O encapsulamento é aparente e em geral não traz vantagem [p.105]. Quando um framework exige acessores, use-os na estrutura de dados, sem fingir que é objeto [p.103].
- **Active Record:** estrutura de dados com métodos de navegação como salvar e buscar. O erro comum é pôr regras de negócio nela, o que cria um híbrido. Trate-a como estrutura e crie objetos separados com as regras, ocultando-a [p.106].
- **Feature Envy (G14):** método mais interessado nos dados de outra classe que nos da própria. Elimine, exceto quando mover o código acoplaria o domínio a algo que não lhe pertence, como o formato de um relatório [p.288-289].

## Parte 2: tratamento de erro (capítulo 7)

- O tratamento de erro não pode obscurecer a lógica. Se o leitor não vê o que o código faz por causa dele, está errado [p.107].
- **Exceções em vez de flags e códigos de retorno.** Códigos entopem o chamador, que deve verificá-los e pode esquecer. Com exceção, algoritmo e tratamento ficam separados e podem ser estudados cada um por si [p.108-109, 53-55].
- **Comece pela estrutura try-catch-finally.** O bloco try define um escopo parecido com transação; o catch deixa o programa em estado consistente. Escreva primeiro o teste que força a exceção e depois o código [p.109-110].
- **Exceções não verificadas.** O custo das verificadas (assinaturas alteradas em cascata, quebra de encapsulamento, violação do OCP) supera o benefício no desenvolvimento de aplicações. Pode haver exceção em bibliotecas críticas [p.110-111]. Isso vale para linguagens que têm esse conceito.
- **Dê contexto à exceção.** Mensagem com a operação que falhou e o tipo da falha; o stack trace sozinho não diz a intenção [p.111].
- **Classes de exceção pela necessidade do chamador**, não pela origem. Se o tratamento é igual para vários erros, um tipo comum basta. Use classes diferentes só se for preciso capturar uma e deixar passar outra [p.111-113].
- **Empacote APIs de terceiros.** Minimiza dependências, facilita simulação em testes e evita ficar preso ao modelo do fornecedor [p.112-113].
- **Defina o fluxo normal com Special Case.** Em vez de try/catch para uma situação esperada, devolva um objeto que representa o caso especial e responde com o valor padrão. O cliente não trata o caso [p.113-114].
- **Não retorne null.** Cria trabalho para todos os chamadores; basta esquecer uma checagem. Lance exceção ou devolva um objeto de caso especial; para coleções, devolva lista vazia. Para métodos de terceiros que devolvem null, empacote [p.114-115].
- **Não passe null.** É pior que retornar. Lançar exceção de argumento inválido ou usar asserção não resolve de fato, porque o erro continua em tempo de execução. A abordagem lógica é proibir null como argumento por padrão [p.115-116].
- Código limpo e robusto não são objetivos conflitantes quando o tratamento de erro é uma preocupação separada [p.116].
- A skill adiciona (convenção): `Optional` e tipos de resultado são alternativas modernas ao null que o livro não cobre; use-os quando a linguagem os favorecer, mantendo o mesmo princípio de não empurrar a checagem para todos os chamadores.

### Exemplo próprio

```java
// Antes: código de retorno que o chamador precisa lembrar de checar
int status = ledger.debit(account, amount);
if (status == 0) { notifier.send(account); }
else if (status == 1) { log.warn("insuficiente"); }
else { log.error("falhou"); }

// Depois: a falha é uma exceção com contexto; o fluxo normal fica limpo
void debit(Account account, Money amount) {
    ledger.debit(account, amount);     // lança InsufficientFundsException(account, amount)
    notifier.send(account);
}

// Special Case: cliente sem plano não obriga ninguém a tratar null
Plan plan = plans.forCustomer(customer);   // devolve Plan.NONE em vez de null
Money fee = plan.monthlyFee();             // Plan.NONE.monthlyFee() devolve zero
```

## Parte 3: limites com código de terceiros (capítulo 8)

- Há tensão natural: o fornecedor quer interface ampla, o usuário quer interface focada [p.118].
- Uma interface larga (uma coleção genérica, por exemplo) espalhada pelo sistema dá muitos pontos de mudança e deixa o chamador fazer o que não devia. Esconda-a dentro de uma classe que oferece só as operações de que o aplicativo precisa e converta tipos ali. Não é preciso encapsular todo uso; o que se evita é passá-la por todo o sistema e expô-la em APIs públicas [p.118-119].
- **Testes de aprendizagem.** Em vez de experimentar a biblioteca no código de produção, escreva testes que exploram o que você quer saber sobre ela. O custo é quase zero (você teria de aprender de qualquer jeito) e eles avisam quando uma nova versão muda o comportamento [p.119-122]. Não é tarefa nossa testar terceiros, mas é útil saber como se comportam [p.119].
- **Código que ainda não existe.** Defina a interface que você gostaria de ter, programe contra ela e adapte depois à API real com um Adapter. Isso também dá um ponto de substituição para testes [p.122-123].
- Limites limpos têm poucos pontos que referenciam o código externo. É melhor depender de algo que você controla do que de algo que passe a controlar você [p.123].
- Sinais de revisão (convenção desta skill): tipo da biblioteca aparecendo em muitas assinaturas; conversões e tratamento de exceção do fornecedor repetidos; nenhuma classe própria em volta do cliente externo.

Note: a escolha entre empacotar tudo ou usar a biblioteca diretamente é de custo e risco; o livro pede cautela e não proíbe uso direto.
