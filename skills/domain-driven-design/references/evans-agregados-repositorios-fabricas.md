# Agregados, Repositórios, Fábricas, Serviços, Módulos e Padrões de Projeto no Modelo

Complementa [tactical-design.md](tactical-design.md): traz só o que o texto de Evans acrescenta ao que a skill já diz (agregados pequenos protegendo invariantes, repositórios para raízes, fábricas com intenção de domínio, serviços só quando necessário). Consulte ao decidir fronteiras de agregado, onde mora a lógica de criação, como desenhar consultas, o que é serviço de domínio e como organizar módulos.

Base: Eric Evans, *Domain-Driven Design*, cap. 4 a 7 e 12. As páginas citadas são as do PDF (veja [fontes.md](fontes.md)). Trechos marcados "convenção desta skill" não têm base no livro.

---

## Agregados: regras e como achar a fronteira

**O problema que o padrão resolve:** o emaranhado de associações não dá limite claro para o efeito de uma mudança nem para o escopo de transação e de bloqueio. Bloqueios cautelosos demais fazem usuários se atrapalharem sem necessidade, e remendos de banco de dados desviam a atenção do modelo. O problema é de modelo: falta de fronteiras (p.118-119).

**Regras (p.119-121):**

* Cada agregado tem uma raiz e uma fronteira. A raiz é uma entidade específica; é a **única** parte a que objetos de fora podem manter referência. Objetos dentro da fronteira podem referenciar uns aos outros.
* A raiz tem identidade global e é responsável por verificar invariantes. Entidades internas têm identidade local, única só dentro do agregado.
* A raiz pode entregar referências a internos a outros objetos, mas só para uso **transitório** (dentro de uma operação). Pode entregar cópia de Objeto de Valor.
* Só raízes são obtidas por consulta direta ao banco; o resto se encontra por navegação.
* **Objetos dentro do agregado podem manter referências a outras raízes de agregado** (p.121).
* Uma remoção apaga tudo dentro da fronteira de uma vez.
* Ao confirmar uma mudança em qualquer objeto interno, todas as invariantes do agregado inteiro devem estar satisfeitas.
* **Invariantes entre agregados** não precisam estar sempre atualizadas: via processamento de eventos, em lote ou outro mecanismo, resolvem-se dentro de um prazo definido. As invariantes **dentro** do agregado valem ao fim de cada transação (p.120).

**Como achar a fronteira (o livro raciocina com perguntas do negócio, p.119, 124-125, 155):**

* **O que só existe por causa de quê?** No exemplo do carro, os pneus pertencem ao agregado do carro, pois ninguém consulta um pneu sozinho nem o acompanha fora do carro. Já o motor com número de série, quando rastreado independentemente, pode ser raiz própria (p.119).
* **Criação e remoção andam juntas?** Pedido e itens sim; peças do catálogo, não. O agregado impõe uma propriedade consistente com a prática do negócio (p.125).
* **Frequência e contenção:** no exemplo do pedido de compra, as peças são usadas em muitos pedidos (alta contenção) e mudam menos que os pedidos, e a mudança de preço não propaga necessariamente aos pedidos existentes. Solução: copiar o preço para o item. Assim a invariante pedido-itens (soma dentro do limite) é garantida, e a dependência com a peça fica frouxa, reduzindo a contenção e refletindo melhor o negócio (p.124-125).
* **Há acesso direto independente?** No exemplo da carga, o histórico de entrega não precisa de raiz própria (ninguém o consulta sem a carga). O evento de manuseio vira raiz própria porque a atividade de manuseio tem significado mesmo fora da carga (p.155).
* **A transação não deve ser travada por outro agregado:** registrar manuseios é operação que precisa ser rápida e sem contenção. Trocar a coleção do histórico por uma consulta permite inserir eventos sem envolver o agregado da carga. Não é mudança de modelo, é grau de liberdade dentro do mesmo modelo (p.163-164).
* Verifique cenários ao decidir (p.159). Ao copiar um agregado como protótipo, decida para cada parte interna: o histórico novo começa vazio, as referências a entidades de fora são mantidas e o identificador novo vem da mesma fonte de uma criação normal (p.159).

**Ao refinar o modelo, a tensão é soltar pontos de alta contenção e apertar invariantes estritas** (p.119). O livro não fixa um tamanho "pequeno" como regra; fixa o critério acima.

**Entidade ou Valor depende de quem pergunta:** "Endereço" é Valor numa loja de correspondência, mas Entidade para a companhia de energia que precisa saber se dois moradores pedem o mesmo ponto de serviço (p.98). Objetos de Valor devem formar um todo conceitual (rua, cidade e CEP juntos, não soltos na pessoa) (p.99).

**Imutabilidade de Valor:** projete como imutável quando puder (p.101). Há exceções por desempenho (muda com frequência, criação cara, pouco compartilhamento), e Valor mutável **não pode ser compartilhado** (p.101). Associações bidirecionais entre dois Valores não fazem sentido; se parecerem necessárias, talvez haja uma identidade não reconhecida (p.102).

**Identidade:** a definição vem do domínio, não de ferramenta. Chave natural, identificador gerado ou externo, cada um com custos (p.94-95). Procure por que dois objetos são "a mesma coisa" para o negócio (p.95).

---

## Fábricas

**Quando criar (p.127-128):** a criação de um objeto ou agregado inteiro fica complicada ou revela demais da estrutura interna. Deixar o cliente montar acopla-o às classes concretas e vaza regras; se o cliente for da camada de aplicação, responsabilidades vazam do domínio. A fábrica **não** precisa corresponder a nada no modelo, mas é parte do design do domínio (p.128).

**Dois requisitos (p.129):** cada método de criação é atômico e impõe todas as invariantes (só produz objeto consistente; para agregado, cria o agregado todo); e a fábrica é abstraída ao tipo desejado, não à classe concreta. Se não for possível criar corretamente, lance exceção ou outro mecanismo que impeça retorno impróprio.

**Onde colocar (p.129-131):** método-fábrica na raiz do agregado para acrescentar elementos internos; método-fábrica em objeto que tem relação estreita com o produto (mesmo que não o possua, como uma conta de corretora que cria ordens de negociação, pois tem dados e regras dominantes); fábrica ou serviço autônomo quando não há hospedeiro natural. Fábrica autônoma costuma produzir um agregado inteiro e devolver a raiz. Respeite as regras de acesso do agregado.

**Quando um construtor basta (p.131):** a classe é o próprio tipo (sem hierarquia ou uso polimórfico); o cliente se importa com a implementação (por exemplo, escolhe uma Strategy); todos os atributos estão disponíveis ao cliente sem criação aninhada; a construção é simples. Construtor público segue as mesmas regras de uma fábrica (atômico, invariantes satisfeitas). Evite construtores chamando construtores de outras classes. O limiar para um método-fábrica pequeno não é alto; o autor considera as fábricas subutilizadas (p.131).

**Interface (p.132):** passe tudo para criar um produto completo em uma interação. Decida e padronize o que acontece na falha (exceção ou nulo). A fábrica fica acoplada aos argumentos: prefira parâmetros de camada inferior ou objetos já ligados ao produto e use tipos abstratos.

**Onde mora a lógica de invariante (p.132-133):** a fábrica pode delegar ao produto, e isso costuma ser melhor. Mas fábricas conhecem a estrutura do produto e, às vezes, vale colocar ali invariantes que nunca se aplicam depois da criação (como regras de atribuição de identidade, ou de Valores completamente imutáveis), deixando o produto mais simples. É especialmente atraente para regras de agregado; é pouco atraente em método-fábrica ligado a outros objetos de domínio.

**Entidade x Valor (p.133):** fábricas de Valor recebem a descrição completa do produto. Fábricas de Entidade tendem a receber só os atributos essenciais para um agregado válido; identidade: se o programa a atribui, a fábrica é um bom lugar para controlá-la; se vem de fora, entra como argumento.

**Reconstituição (p.133):** reconstituir objeto armazenado difere da criação em dois pontos: não gera novo identificador (preserva a continuidade) e trata violação de invariante de forma mais flexível, pois o objeto já existe e é preciso uma estratégia de reparo.

**Fábrica x Repositório (p.142-143):** a fábrica cria objetos novos; o repositório encontra objetos antigos. Se o repositório reconstitui, delega a criação a uma fábrica. Evite "buscar ou criar" em uma só chamada: o que parece conveniência esconde a distinção entre objeto novo e existente que costuma importar ao domínio, e muitos casos somem ao distinguir Entidades de Valores (p.143).

---

## Repositórios

**Por que existem:** sem eles, o cliente lida com tecnologia (SQL, tabelas, linhas) em vez de conceitos do modelo. Os desenvolvedores passam a tratar objetos como contêineres de dados, contornam agregados e encapsulamento, e regras de domínio acabam em consultas ou se perdem (p.136).

**O que fazem (p.137-138):** dão a ilusão de uma coleção em memória de todos os objetos de um tipo, com adicionar e remover (que encapsulam a inserção e remoção reais) e métodos de consulta que devolvem objetos totalmente instanciados. Consultas podem devolver também contagens e somas intencionais do modelo.

**Escopo:** crie repositórios **só para raízes de agregado que realmente precisam de acesso direto**. Objetos internos só por navegação a partir da raiz (p.136-138). Acesso global a Valores é raro e, se você precisar procurar um Valor persistente, considere se não é uma Entidade com identidade ainda não reconhecida (p.137).

**Vantagens citadas (p.138):** modelo simples para obter objetos persistentes e gerenciar seu ciclo de vida; desacoplamento do desenho de aplicação e domínio da tecnologia de persistência, de múltiplas estratégias de banco e até de múltiplas fontes de dados; comunicam decisões sobre o acesso aos objetos; permitem uma implementação falsa em memória para testes.

**Consultas (p.138-139):** a forma mais simples são consultas fixas com parâmetros (por identidade, por atributo, por faixa, até cálculos dentro da responsabilidade do repositório). Em projetos com muita consulta, um framework com consultas flexíveis baseadas em Specification (conceito do cap. 9) permite descrever o que se quer sem se preocupar com como obter. Mesmo com consultas flexíveis, permita consultas fixas especializadas; frameworks que não permitem isso distorcem o domínio ou são contornados (p.139).

**Implementação (p.140-142):**

* O ideal é ocultar a mecânica do cliente, **mas não do desenvolvedor**: um relato do livro mostra uma consulta "todos os objetos" que carregou o banco inteiro na memória e só deu problema em produção, porque os dados de teste eram poucos (p.140). Convenção desta skill: teste repositórios com volume realista.
* Abstraia o tipo: um repositório "contém" todas as instâncias de um tipo, o que não implica um por classe; o tipo pode ser superclasse, interface ou classe concreta (p.141).
* **Deixe o controle de transação ao cliente.** O repositório insere e remove, mas em geral não faz commit, porque o cliente tem o contexto da unidade de trabalho (p.141).
* Antes de implementar, veja o que o framework arquitetural já oferece; não lute contra o framework: preserve os fundamentos do DDD e abra mão dos detalhes quando ele for antagônico (p.141).

**Banco relacional como armazenamento dos objetos (p.144-145):**

* Três casos: banco principalmente repositório dos objetos; banco projetado para outro sistema; banco do próprio sistema mas com outros papéis.
* Se o banco é só o armazenamento dos objetos, aceite algumas limitações do modelo para manter o mapeamento simples; não deixe os modelos divergirem muito, mesmo com ferramentas de mapeamento poderosas. Isso não exige uma tabela por objeto: algum agregado e composição são possíveis, desde que o mapeamento seja transparente.
* Processos fora do sistema de objetos **não devem** acessar esse armazenamento: podem violar invariantes e travar o modelo de dados contra refatoração.
* Banco herdado de outro sistema: dois modelos de domínio coexistem (veja [evans-camada-anticorrupcao-e-legado.md](evans-camada-anticorrupcao-e-legado.md)).
* A linguagem ubíqua ajuda a unir objetos e tabelas: nomes e associações devem corresponder meticulosamente (p.145). Separar o esquema do modelo é uma opção legítima se for consciente (p.145).

---

## Serviços

**Quando existe:** há operações de domínio importantes que não têm lar natural numa Entidade ou Valor (muitas são atividades, não coisas). O erro mais comum, porém, é desistir cedo demais de encaixar o comportamento no objeto certo, deslizando para o estilo procedural (p.103).

**Três características de um bom serviço (p.104):** a operação corresponde a um conceito de domínio que não é parte natural de uma Entidade ou Valor; a interface é definida em termos de outros elementos do modelo; a operação não tem estado. O nome vem da linguagem ubíqua, em geral um verbo, e parâmetros e resultados são objetos de domínio (p.104).

**Cuidado:** "doers" nomeados "Manager" e afins são serviços disfarçados de objetos de modelo, sem significado além da operação (p.103). Serviços não devem despir Entidades e Valores de todo o comportamento (p.104).

**Camadas (p.104-105):** serviços puramente técnicos (envio de e-mail) ficam na infraestrutura e não têm significado de negócio. O serviço de aplicação orquestra (por exemplo, decide enviar a notificação). Transferência de fundos tem significado na linguagem bancária e embute regra de negócio, então é serviço de **domínio**; exportar transações para planilha não tem regra de negócio, então é serviço de **aplicação**. Quando uma regra cabe naturalmente a uma Entidade (como verificar o limite de saldo na conta), não precisa de serviço (p.104).

**Granularidade (p.105-106):** serviços sem estado de granularidade média encapsulam funcionalidade atrás de interface simples, facilitam reuso e evitam troca excessiva de mensagens; e a introdução criteriosa de serviços de domínio evita que conhecimento do domínio escorra para a aplicação ou interface, onde se perde (p.106). Como se acessa o serviço importa menos que a decisão de separar a responsabilidade.

---

## Módulos

* A motivação principal é a **sobrecarga cognitiva**: dão duas visões do modelo (detalhe interno ou relações entre módulos) (p.107).
* Os módulos do domínio devem ser parte significativa do modelo, **contando a história do domínio** em escala maior; os nomes entram na linguagem ubíqua (p.107-108).
* Baixo acoplamento e alta coesão valem para **conceitos**, não só para código. Quando houver conflito, vá com a clareza conceitual, mesmo com mais referências entre módulos ou efeitos de ondulação (p.107-108).
* Se o acoplamento persiste, mude o modelo para desembaraçar os conceitos ou procure um conceito esquecido que una os elementos (p.108).
* Módulos costumam ficar congelados no primeiro agrupamento enquanto o modelo evolui; a reorganização é cara mas necessária (p.107-108).
* Particionar **por padrão** (todas as fábricas num pacote, todos os repositórios noutro) conta a história do que o desenvolvedor lia, não a do domínio (p.165-166).
* **Cuidado com empacotamento guiado por infraestrutura (p.109-111):** separar camadas técnicas fisicamente (UI e infraestrutura fora do pacote do domínio) é útil. Mas esquemas de camadas que espalham os dados e a lógica de **um** objeto conceitual em vários pacotes tiram a coesão e a legibilidade do modelo; no caso relatado, resultaram em modelo de domínio anêmico. A menos que haja intenção real de distribuir em servidores, mantenha o código de um objeto conceitual no mesmo módulo, se não no mesmo objeto. Use empacotamento para separar a camada de domínio do resto e deixe o mais livre possível o restante. Exceção: código gerado de um design declarativo pode ficar em pacote separado (p.110-111).
* **Módulo não é Bounded Context:** os módulos organizam elementos dentro de um modelo e não comunicam intenção de separar contextos; namespaces separados dentro de um contexto dificultam notar a fragmentação acidental (p.299).

---

## Camadas e a direção das dependências

O texto de Evans sobre isolamento do domínio (p.73-77) é mais sutil que a regra "o domínio não depende da infraestrutura". Registre exatamente o que ele diz:

* Quatro camadas conceituais: interface de usuário, aplicação (define as tarefas e dirige os objetos de domínio; fina; sem regras de negócio), domínio (conceitos, situação e regras do negócio; o coração do software) e infraestrutura (capacidades técnicas genéricas, como mensagens e persistência) (p.74).
* Regra de camadas: um elemento depende só de elementos da própria camada ou das camadas **abaixo**. Comunicação para cima passa por mecanismo indireto (callbacks, Observer) (p.74, 76). Na ordem do livro, a infraestrutura fica **abaixo** do domínio.
* O que ele pede: concentrar o código relacionado ao modelo numa camada e **isolá-lo do código de interface, aplicação e infraestrutura**, para que os objetos de domínio fiquem livres da responsabilidade de se exibir, se armazenar e gerenciar tarefas da aplicação (p.74-75).
* A infraestrutura costuma não iniciar ação na camada de domínio e, estando abaixo dela, não deve ter conhecimento específico do domínio que serve (p.76). As capacidades técnicas costumam ser oferecidas como serviços chamados pelas camadas de aplicação e domínio (p.76).
* Frameworks arquiteturais mais intrusivos podem exigir que o domínio seja subclasse de classe do framework; Evans aceita isso como fato, mas recomenda usar só os recursos mais valiosos, para manter objetos de negócio legíveis (p.77).
* O domínio ser isolado é pré-requisito do design guiado por modelo (p.78). Dirigir dependências "para dentro", inversão de dependência e portas e adaptadores **não aparecem** no texto lido; essas ideias vêm de outras fontes.
* Evans também descreve o **Smart UI** como alternativa legítima, mas mutuamente exclusiva com DDD, para projetos simples dominados por entrada e exibição de dados e com poucas regras (p.79-81). Ao escolher DDD, o domínio precisa ser isolado desde o início (p.80-81).

Decorrência prática (convenção desta skill): se o time quer a regra de dependência para dentro, ela vem de Clean Architecture e Arquitetura Hexagonal (veja a skill `clean-architecture-expert`), não de Evans.

---

## Padrões de projeto como padrões de domínio (cap. 12)

* Só **alguns** padrões do catálogo de projeto servem como padrões de domínio, e exigem olhar em dois níveis: técnico, no código, e conceitual, no modelo (p.275). O critério: o padrão deve dizer algo sobre o domínio conceitual, não ser apenas solução técnica para problema técnico (p.285).
* **Strategy (Policy):** quando há processos legítimos alternativos, a complexidade de escolher se soma à dos próprios processos. Fatore a parte variável em um objeto estratégia do modelo, separando a regra do comportamento que ela governa. No domínio, o foco é expressar um conceito (um processo ou regra de política), mais que a troca de algoritmos. No exemplo, o serviço de roteamento recebe a política de magnitude do trecho (mais rápido, mais barato ou combinações) como argumento, sem condicionais espalhados, o que também facilita testar. Estratégias sem estado podem ser compartilhadas (p.276-278).
* **Composite:** quando um todo é composto de partes do mesmo tipo conceitual, aninhadas em profundidade variável. Antes de aplicar, a primeira pergunta é se existe de fato uma hierarquia todo-parte e se há uma abstração sob a qual todas as partes são do mesmo tipo. Implemente a mesma interface em contêineres e folhas, que agregam informação dos conteúdos. No exemplo, uma rota composta de rotas (p.279-283).
* **Flyweight:** exemplo de padrão **sem** correspondência com o modelo; é opção de implementação para Valores, não para Entidades (p.285).
* **Aplique só quando necessário:** no exemplo do Composite, antes de surgirem os segmentos e trechos distintos, o time ia bem sem ele (p.284).
* Facade e Adapter aparecem na camada anticorrupção (p.323-324), e Prototype na cópia de agregados (p.159).

---

## Verificação sugerida (convenção desta skill)

* Para cada agregado, liste as invariantes que ele protege e responda por que cada elemento interno só é acessado pela raiz. Se uma invariante cruza agregados, defina o prazo de consistência.
* Existe alguma consulta que pegue elemento interno de agregado direto no repositório? Se sim, ou a raiz está errada ou falta navegar pela raiz.
* Existe construtor chamando construtor de outra classe, ou cliente de aplicação montando agregado? Pede fábrica.
* Algum serviço nomeado "Manager" tem estado ou nenhum significado de domínio?
* Os módulos têm nomes que o especialista de negócio reconheceria?
