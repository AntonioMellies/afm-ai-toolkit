# Classes, sistemas e projeto simples

Resumo dos capítulos 10, 11 e 12 de *Código Limpo*, em paráfrase. Páginas entre colchetes são marcadores PDF (veja fontes.md). Itens sem página são convenção desta skill.

## Parte 1: classes (capítulo 10)

### Organização e encapsulamento

- Ordem na classe: constantes públicas e estáticas, estáticas privadas, instâncias privadas, depois funções públicas, cada uma seguida das privadas que ela chama (leitura de cima para baixo) [p.137].
- O livro prefere manter tudo privado, mas dá prioridade ao teste: se um teste no mesmo pacote precisa acessar, o membro pode ficar protegido ou visível no pacote. Antes disso, procure um jeito de manter a privacidade; perder encapsulamento é último recurso [p.137].

### Pequenas, medidas por responsabilidades

- A primeira regra é que classes sejam pequenas e a segunda é que sejam menores ainda, mas o critério não é contar linhas: contam-se as responsabilidades. Uma classe com poucos métodos ainda pode ter responsabilidades demais [p.137-139].
- O nome descreve as responsabilidades. Nome ambíguo (Processador, Gerenciador, Super) é sinal de acúmulo. Se não sai um nome conciso, provavelmente a classe está grande [p.139].
- **Teste das 25 palavras:** descrever a classe em cerca de 25 palavras, sem "se", "e", "ou" e "mas". O primeiro "e" costuma apontar uma segunda responsabilidade [p.139].
- **SRP:** uma classe deve ter um, e só um, motivo para mudar. Identificar responsabilidades ajuda a descobrir abstrações melhores. É um dos princípios mais simples e mais ignorados, porque muita gente para quando o código funciona e não volta para limpá-lo [p.139-140].
- Muitas classes pequenas não são mais complicadas que poucas grandes: a diferença é organizar as ferramentas em gavetas rotuladas. Cada classe tem uma responsabilidade, um motivo de mudança e poucas colaboradoras [p.140-141].

### Coesão

- Poucas variáveis de instância, e cada método usa uma ou mais delas. Quanto mais variáveis um método usa, mais coeso ele é para a classe. Classes totalmente coesas nem sempre são possíveis nem aconselháveis, mas alta coesão é o alvo [p.141].
- Funções pequenas podem fazer variáveis virarem campos só para serem compartilhadas. Quando poucas funções usam um grupo de campos, há outra classe tentando sair. Divida quando a coesão cair [p.141-142].
- O exemplo do livro (um programa de números primos) saiu de uma função única, aninhada e acoplada para três classes com responsabilidades separadas. O programa ficou maior por causa dos nomes descritivos, das declarações que funcionam como documentação e do espaçamento. A mudança foi feita com testes cobrindo o comportamento e passos pequenos, sem reescrever do zero [p.142-147].

### Organizar para mudar

- O sinal principal para agir é a mudança do sistema. Uma classe logicamente completa e estável pode ficar em paz. Quando for preciso abri-la, considere melhorar o projeto [p.148].
- Indício horizontal: métodos privados que só se relacionam com um subconjunto das responsabilidades [p.148].
- Resultado de dividir por tipo de operação: cada classe fica simples, testável isoladamente, e uma nova operação vira uma nova classe sem tocar nas existentes. Isso sustenta o SRP e o OCP (aberto para extensão, fechado para alteração) [p.148-150].
- **DIP:** classes dependem de abstrações, não de detalhes concretos. O exemplo: uma carteira de ações que recebe uma interface de bolsa em vez de usar diretamente a API de uma bolsa. O teste usa uma implementação fixa. O isolamento melhora a testabilidade, a flexibilidade e o reúso [p.150-151].

## Parte 2: sistemas (capítulo 11)

- **Separe construção e uso.** Criar objetos e ligar dependências é uma preocupação diferente da lógica de execução. A construção fica no ponto de entrada (ou em módulos que ele chama) e o resto assume objetos prontos. Quando a aplicação precisa criar objetos sob demanda, usa-se uma fábrica abstrata: a aplicação controla quando, mas não como [p.153-155].
- **Inicialização preguiçosa espalhada** (criar na primeira vez que se usa) tem vantagens, mas cria dependência concreta, exige testar todos os caminhos e mistura construção com uso. Uma ocorrência não é grave; o problema é a estratégia de configuração ficar espalhada [p.153-154].
- **Injeção de dependência** é a inversão de controle aplicada à dependência: a classe fica passiva e recebe o que precisa por construtor ou setter. Busca ativa em um registro é apenas injeção parcial [p.155-156].
- **O sistema não nasce correto de primeira.** Implemente o necessário hoje e refatore e expanda amanhã. No nível de código, TDD, refatoração e código limpo viabilizam isso; no nível de sistema, a arquitetura pode crescer se separar bem as preocupações [p.156-157, 165].
- **Lógica de domínio em objetos simples**, sem dependência de frameworks empresariais, é mais fácil de testar e de evoluir. Preocupações transversais (persistência, transações, segurança) entram de forma pouco invasiva. O livro usa EJB2 como contraexemplo, de acordo com o contexto da época [p.157-165].
- **Evite o grande projeto antecipado.** Decisões podem esperar até o último momento responsável, quando há mais informação [p.164-165].
- **Padrões com critério.** Usar padrão só pelo prestígio desvia do valor para o cliente [p.166].
- **Linguagens específicas de domínio** reduzem a distância entre o conceito do negócio e o código e o risco de tradução [p.166].
- **Conclusão:** sistemas também devem ser limpos; arquitetura invasiva reduz agilidade e esconde a lógica de domínio; use a coisa mais simples que funcione [p.166-167].
- Para decisões de arquitetura mais amplas, outras skills do repositório cobrem camadas e limites; esta aqui trata só da separação de construção e uso e da simplicidade.

## Parte 3: projeto simples (capítulo 12)

Quatro regras, **em ordem de prioridade** [p.169]:

1. **Passe em todos os testes.** Um sistema que não pode ser verificado não deveria ser implementado. Tornar o sistema testável empurra para classes pequenas e de propósito único e, quando há acoplamento forte, para injeção de dependência e interfaces. Criar testes leva a projetos melhores [p.169].
2. **Sem duplicação.** É o inimigo principal. Inclui linhas idênticas, linhas semelhantes (aproxime-as para depois refatorar) e duplicação de implementação (uma operação definida em termos da outra, em vez de dois mecanismos independentes). Extrair uma semelhança minúscula já pode revelar violações do SRP e gerar pequena reutilização. O padrão Template Method elimina duplicação de algoritmo em alto nível [p.170-172].
3. **Expresse a intenção.** O maior custo está na manutenção. Expressividade vem de bons nomes, funções e classes pequenas, nomenclatura padrão (nomes de padrões nos nomes de classes) e testes bem escritos, que servem de documentação. A forma mais importante de ser expressivo é tentar: não passe ao próximo problema quando só funcionou. Cuidar é um recurso precioso [p.172-173].
4. **Minimize classes e métodos**, com a menor prioridade. Cuidado com exageros dos princípios anteriores: interface para toda classe e separação obrigatória entre dados e comportamento são dogmatismo. Seja pragmático [p.173].

As regras 2 a 4 são a fase de refatoração: com os testes verdes, a cada linha nova pare e avalie se o projeto piorou; se sim, limpe e rode os testes [p.169].

Uso prático desta ordem em revisão: quando duas regras conflitam (por exemplo, dividir mais para ficar expressivo versus manter poucas classes), a de menor número vence.
