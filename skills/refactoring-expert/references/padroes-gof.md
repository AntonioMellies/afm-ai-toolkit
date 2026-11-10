# Padrões de projeto como destino de refatorações

Os 23 padrões do catálogo de Gamma, Helm, Johnson e Vlissides (GoF), usados aqui só como possíveis destinos de uma refatoração, nunca como ponto de partida. Todos os 23 estavam legíveis nos trechos lidos; nenhum ficou como "não lido". Páginas (marcadores do PDF) em [fontes.md](fontes.md).

## Como usar

- O prefácio da primeira edição de Fowler diz que padrões oferecem alvos para refatorações, mas que identificar o alvo é só parte do problema: transformar o código até lá é outro desafio. Quem faz esse caminho com passos pequenos e testes é o catálogo de refatorações ([catalogo.md](catalogo.md)).
- O livro de Fowler também aponta uma obra sobre refatoração para padrões (Kerievsky) como leitura complementar.
- Regra desta skill: aplique um padrão quando o cheiro persistir depois das refatorações simples e a aplicabilidade abaixo descrever o seu caso. Sem cheiro, não há motivo para introduzir padrão (isso seria generalidade especulativa).
- Cada ligação abaixo é marcada por origem: **[Fowler]** (o texto de Fowler faz a ligação), **[GoF]** (o texto do GoF faz), **[convenção desta skill]** (ligação nossa, sem base no texto lido) ou **[sem ligação]** (nenhum dos dois trechos lidos relaciona o padrão a uma refatoração ou cheiro).
- Princípio geral que o GoF e Fowler compartilham: preferir composição de objetos à herança de classes ajuda a manter classes focadas, ao custo de mais objetos (GoF, p.32). Fowler lembra que isso significa uma mistura criteriosa, não evitar herança sempre (p.434-435).

## Padrões de criação

### Abstract Factory
- Intenção: oferecer uma interface para criar famílias de objetos relacionados sem que o cliente conheça as classes concretas.
- Aplicar quando: o sistema deve ser independente de como os produtos são criados; precisa ser configurado com uma família entre várias; os produtos da família devem ser usados juntos e isso precisa ser garantido; quer-se expor só interfaces de uma biblioteca de produtos.
- Ligação: [sem ligação].

### Builder
- Intenção: separar a construção de um objeto complexo da sua representação, de modo que o mesmo processo gere representações diferentes.
- Aplicar quando: o algoritmo de criação deve ser independente das partes e de como se montam; o processo precisa permitir representações diferentes.
- Ligação: [sem ligação].

### Factory Method
- Intenção: definir uma interface para criar um objeto, deixando as subclasses decidirem qual classe instanciar.
- Aplicar quando: a classe não pode antecipar qual classe criará; quer que subclasses especifiquem o que criam; delega a uma de várias subclasses auxiliares e quer localizar esse conhecimento.
- Ligação: [convenção desta skill] com Substituir construtor por função de factory e com o seletor de subclasse de Substituir código de tipos por subclasses. O texto de Fowler sobre a factory não cita o padrão.

### Prototype
- Intenção: criar objetos novos copiando uma instância protótipo, cujo tipo é especificado por quem cria.
- Aplicar quando: o sistema deve ser independente de como os produtos são criados e (as classes são definidas em tempo de execução, ou se quer evitar uma hierarquia de fábricas paralela à de produtos, ou as instâncias têm poucas combinações de estado e é mais simples clonar protótipos).
- Ligação: [sem ligação].

### Singleton
- Intenção: garantir uma única instância de uma classe, com ponto de acesso global.
- Aplicar quando: precisa haver exatamente uma instância acessível por um ponto conhecido; ou a instância única deve ser extensível por subclasses sem alterar os clientes.
- Ligação: [Fowler] aqui o sentido é inverso: Fowler cita singletons como forma de dados globais (cheiro Dados globais), cuja defesa é Encapsular variável e restringir escopo. Trate Singleton como candidato a refatoração, não como destino.

## Padrões estruturais

### Adapter
- Intenção: converter a interface de uma classe na interface que os clientes esperam, para que classes com interfaces incompatíveis colaborem.
- Aplicar quando: quer-se usar uma classe existente cuja interface não serve; quer-se uma classe reutilizável que coopere com classes imprevistas; (adaptador de objeto) é inviável criar subclasses para adaptar várias classes existentes.
- Ligação: [convenção desta skill] com o cheiro Classes alternativas com interfaces diferentes, quando alinhar as assinaturas não for possível ou desejável.

### Bridge
- Intenção: desacoplar uma abstração da sua implementação para que variem de forma independente.
- Aplicar quando: não se quer vínculo permanente entre abstração e implementação (por exemplo, escolha em tempo de execução); ambas precisam ser estendidas por subclasses; mudanças na implementação não podem afetar clientes; há proliferação de classes por combinações.
- Ligação: [convenção desta skill] com Extrair classe e Substituir subclasse por delegação, quando um eixo de herança precisa virar delegação.

### Composite
- Intenção: compor objetos em árvores que representam hierarquias parte-todo e permitir tratar objetos individuais e composições de modo uniforme.
- Aplicar quando: há hierarquia parte-todo e os clientes devem ignorar a diferença entre composição e objeto individual.
- Ligação: [sem ligação].

### Decorator
- Intenção: acrescentar responsabilidades a um objeto dinamicamente, como alternativa flexível às subclasses.
- Aplicar quando: é preciso adicionar responsabilidades a objetos individuais, de forma transparente e removível; ou a extensão por subclasses é impraticável (explosão de combinações ou classe indisponível para herança).
- Ligação: [convenção desta skill] com Substituir subclasse por delegação, quando há mais de um eixo de variação.

### Façade
- Intenção: oferecer uma interface unificada e de mais alto nível para um conjunto de interfaces de um subsistema.
- Aplicar quando: quer-se uma interface simples para subsistema complexo; há muitas dependências entre clientes e classes de implementação; quer-se estruturar subsistemas em camadas.
- Ligação: [convenção desta skill] com Ocultar delegação e o cheiro Cadeias de mensagens (o cliente passa a conversar só com a fachada).

### Flyweight
- Intenção: compartilhar objetos de granularidade fina para suportar muitos deles com eficiência.
- Aplicar quando: todas valem: muitos objetos, custo de armazenamento alto, estado majoritariamente externalizável, poucos grupos de objetos compartilhados após remover estado extrínseco, e a aplicação não depende da identidade dos objetos.
- Ligação: [sem ligação]. É uma otimização; trate fora do fluxo de refatoração (medir antes, conforme o capítulo 2 de Fowler).

### Proxy
- Intenção: fornecer um substituto ou marcador de outro objeto para controlar o acesso a ele.
- Aplicar quando: é preciso uma referência mais sofisticada que um ponteiro simples: proxy remoto, virtual (criação sob demanda), de proteção (direitos de acesso) ou referência inteligente (contagem, carga preguiçosa, verificação de bloqueio).
- Ligação: [sem ligação] ao padrão. Observação: Fowler usa a ideia de proxy somente leitura (cita Java) como uma das formas de Encapsular coleção.

## Padrões comportamentais

### Chain of Responsibility
- Intenção: evitar acoplar o remetente de uma solicitação ao receptor, dando a mais de um objeto a chance de tratá-la, encadeados até que um trate.
- Aplicar quando: mais de um objeto pode tratar e o tratador não é conhecido de antemão; quer-se emitir a solicitação sem nomear o receptor; o conjunto de tratadores deve ser definido dinamicamente.
- Ligação: [sem ligação].

### Command
- Intenção: encapsular uma solicitação como objeto, permitindo parametrizar clientes, enfileirar, registrar e desfazer operações.
- Aplicar quando: quer-se parametrizar objetos por uma ação (substituto orientado a objetos de callbacks); enfileirar ou executar solicitações em momentos diferentes; suportar desfazer; manter log reaplicável; estruturar sistema em torno de operações de alto nível (transações).
- Ligação: [Fowler] Substituir função por comando usa o padrão Command. O livro adverte que prefere a função na maioria das vezes e só usa comando quando precisa do que a função simples não oferece. A volta é Substituir comando por função.

### Interpreter
- Intenção: dada uma linguagem, definir uma representação da sua gramática e um interpretador que a usa.
- Aplicar quando: há uma linguagem a interpretar cujas sentenças são árvores sintáticas; funciona melhor com gramática simples e quando eficiência não é crítica.
- Ligação: [sem ligação].

### Iterator
- Intenção: acessar sequencialmente os elementos de um agregado sem expor sua representação.
- Aplicar quando: acessar o conteúdo sem expor a representação interna; suportar múltiplos percursos; oferecer interface uniforme para estruturas diferentes.
- Ligação: [sem ligação]. (Fowler trata laços como cheiro e propõe pipelines de coleção, que é outra abordagem, não este padrão.)

### Mediator
- Intenção: encapsular como um conjunto de objetos interage, evitando que se refiram uns aos outros diretamente.
- Aplicar quando: objetos se comunicam de modo bem definido, porém complexo e desestruturado; um objeto é difícil de reutilizar por referenciar muitos outros; comportamento distribuído deveria ser customizável sem excesso de subclasses.
- Ligação: [convenção desta skill] com o cheiro Trocas escusas (Fowler sugere, entre outras saídas, um terceiro módulo para o interesse comum).

### Memento
- Intenção: sem violar o encapsulamento, capturar e externalizar o estado interno de um objeto para restaurá-lo depois.
- Aplicar quando: é preciso salvar um instantâneo do estado para restaurar; obter o estado diretamente exporia a implementação.
- Ligação: [sem ligação].

### Observer
- Intenção: definir dependência um-para-muitos para que, ao mudar o estado de um objeto, os dependentes sejam notificados e atualizados.
- Aplicar quando: a abstração tem dois aspectos dependentes; a mudança em um objeto exige mudar outros em número desconhecido; um objeto deve notificar outros sem conhecê-los.
- Ligação: [sem ligação].

### State
- Intenção: permitir que um objeto altere seu comportamento quando seu estado interno muda, como se mudasse de classe.
- Aplicar quando: o comportamento depende do estado e muda em tempo de execução; ou as operações têm condicionais grandes sobre o estado (em geral constantes enumeradas), repetindo a mesma estrutura em várias operações; o padrão põe cada ramo em uma classe.
- Ligação: [Fowler] Substituir código de tipos por subclasses incorpora Substituir enumeração pelo padrão State/Strategy, e Substituir subclasse por delegação pode ser vista como trocar subclasses por State ou Strategy. [GoF] o sintoma descrito (mesma condicional em várias operações) é o cheiro Switches repetidos, mas dar esse nome é [convenção desta skill].

### Strategy
- Intenção: definir uma família de algoritmos, encapsular cada um e torná-los intercambiáveis, variando independentemente dos clientes.
- Aplicar quando: classes relacionadas diferem só no comportamento; é preciso variantes de um algoritmo; o algoritmo usa dados que o cliente não deve conhecer; a classe tem múltiplas condicionais que escolhem comportamentos (mover os ramos para classes Strategy).
- Ligação: [Fowler] Strategy (junto com Visitor) é citado como exceção à regra "colocar a função onde estão os dados" do cheiro Inveja de recursos, porque isola o comportamento que varia ao custo de mais indireção; também aparece em Substituir código de tipos por subclasses e Substituir subclasse por delegação. [GoF] o sintoma de múltiplas condicionais é, por convenção desta skill, o cheiro Switches repetidos.

### Template Method
- Intenção: definir o esqueleto de um algoritmo numa operação, deixando alguns passos para as subclasses, sem mudar a estrutura.
- Aplicar quando: implementar uma vez as partes invariantes e deixar as variáveis às subclasses; fatorar comportamento comum entre subclasses para evitar duplicação; controlar extensões por operações "gancho". O próprio GoF descreve a aplicação como "refatorar para generalizar": identificar diferenças, separá-las em novas operações e substituir o código por um método-template.
- Ligação: [Fowler] Subir método cita Formar método de template (Form Template Method) quando dois métodos têm fluxo geral parecido mas detalhes diferentes. [GoF] a descrição de refatorar para generalizar aproxima o padrão do cheiro Código duplicado em subclasses (marcação do cheiro por convenção desta skill).

### Visitor
- Intenção: representar uma operação sobre os elementos de uma estrutura de objetos, permitindo definir novas operações sem alterar as classes dos elementos.
- Aplicar quando: a estrutura tem muitas classes com interfaces diferentes e as operações dependem da classe concreta; muitas operações não relacionadas poluiriam as classes; as classes da estrutura raramente mudam, mas se querem novas operações com frequência (se as classes mudam muito, melhor pôr as operações nelas).
- Ligação: [Fowler] citado com Strategy como exceção à regra do cheiro Inveja de recursos.
