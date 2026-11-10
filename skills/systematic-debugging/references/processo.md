# Processo de depuração passo a passo

Cada passo indica se vem do livro (rastreado em fontes.md) ou é convenção desta skill. Convenções são preferências de método, não regras do livro.

Ordem geral: ler a evidência, reproduzir, isolar, hipótese e experimento, teste que falha, correção da causa, verificação.

## 0. Ler a evidência que já existe (convenção desta skill)

Antes de mexer em qualquer coisa, junte o que foi observado: mensagem de erro completa, stack trace, logs do momento, versão e configuração, entrada que disparou a falha.

Leitura de stack trace em Java:

- Leia de cima para baixo: a primeira linha diz o tipo da exceção e a mensagem; as linhas seguintes são a pilha de chamadas, da mais recente para a mais antiga.
- Procure o primeiro frame que pertence ao seu código (não ao framework ou à biblioteca). Ele costuma ser o ponto de partida, mas não necessariamente a causa.
- Siga a cadeia de `Caused by:` até a última: a causa mais profunda é geralmente a mais informativa.
- Se a exceção foi relançada sem a causa original, ou se o log só traz `e.getMessage()`, a evidência foi perdida. Esse é um achado em si.
- Um `catch` que engole a exceção (bloco vazio, ou só um log sem contexto) esconde a pista. O livro lista falhas difíceis de identificar como consequência de erros ignorados, então procure esses pontos no caminho do problema.

Em outras linguagens a ideia é a mesma: identifique o primeiro frame seu, siga a cadeia de causas e confira se algum tratamento de erro descartou informação.

## 1. Reproduzir e caracterizar (livro)

O livro chama a caracterização do bug de primeira e mais importante tarefa. Dê a si mesmo o melhor material bruto possível:

1. Reduza ao conjunto mais simples de passos que reproduz o problema. Separe os detalhes externos que só distraem.
2. Confirme que você está focando um único problema. É fácil misturar duas falhas diferentes, mas relacionadas, em uma só.
3. Determine se é repetível. Com que frequência os passos mostram o problema? Depende da configuração do software, do tipo de máquina ou de dispositivos associados?

Ter um conjunto definido de passos de reprodução significa ter vencido a maior parte da batalha. O livro também aponta dois fatores que definem a dificuldade: como reproduzir e quanto tempo se passou entre a inserção da causa e a percepção do bug.

Se o relato de bug é ambíguo, trabalhe com quem o fez até que ambos entendam o problema, consigam reproduzi-lo de forma confiável e saibam quando ele está resolvido.

### O teste de unidade como harness de reprodução (livro)

Um teste de unidade simples e reproduzível é uma estrutura muito mais fácil de depurar do que o programa completo com uma série de ações manuais. Quando for possível, escreva um teste que demonstre o bug em vez de caçá-lo a partir do sistema completo em execução.

Verificação (convenção desta skill): rode o teste mais de uma vez e, se houver aleatoriedade, tempo ou concorrência, em condições diferentes. Um teste que falha só às vezes ainda não é uma reprodução confiável.

## 2. Isolar (livro, exceto onde indicado)

Objetivo: reduzir o espaço de busca com o menor número de experimentos.

### Armadilhas

Entre um ponto em que o sistema está correto (por exemplo, a inicialização) e um ponto em que o estado já é inválido, coloque armadilhas no caminho do código: asserções ou verificações das invariantes (os fatos que precisam valer para o estado estar correto) e saídas de diagnóstico. Elas melhoram o entendimento do código e cercam o bug. Asserções e logs, mesmo os mais simples, são ferramentas eficazes.

Nota de Java (convenção desta skill): a palavra-chave `assert` só tem efeito quando a JVM roda com assertivas habilitadas, então em uma investigação prefira uma verificação explícita:

```java
if (pedido.itens().isEmpty() && pedido.total() > 0) {
    throw new IllegalStateException(
        "invariante violada: pedido sem itens com total " + pedido.total());
}
```

Depois da correção, vale deixar armadilhas úteis, mas sem sujar o código com logging que gera ruído e esconde o que realmente acontece.

### Divisão binária

Em vez de percorrer cada passo, ache o início e o fim da cadeia de eventos, divida o espaço do problema ao meio e descubra se o ponto central está bom ou ruim. Repita. O custo cresce com o logaritmo do tamanho, não linearmente. Combine com armadilhas: cada armadilha no ponto central responde "bom" ou "ruim".

### Arqueologia no controle de versões

Ache um ponto no passado em que o bug não existia e, com o caso de teste reproduzível em mãos, avance para achar a mudança que provocou a falha, de novo por divisão binária. Achada a mudança, a causa costuma ser óbvia. Commits pequenos, frequentes e atômicos (cada commit uma mudança coesa e completa) tornam essa busca muito mais produtiva. O livro cita que o `git bisect` automatiza essa divisão binária.

Uso típico (convenção desta skill):

```text
git bisect start
git bisect bad                 # a versão atual tem o bug
git bisect good <commit-ou-tag-sem-o-bug>
# rode o teste de reprodução em cada ponto e marque: git bisect good | git bisect bad
git bisect run <comando-que-retorna-0-se-ok>   # automatiza a marcação
git bisect reset               # ao terminar, volta ao estado original
```

O comando de `bisect run` deve ser o teste que reproduz o bug: retorna sucesso quando o bug não existe e falha quando existe.

### Último estado conhecido bom

Com testes executados com frequência, quando um teste falha basta olhar a mudança feita entre a última execução verde e o código atual: são poucas linhas, e a origem do bug está nelas (Fowler, cap. 2 e 4). Rodar a suíte em passos pequenos é uma forma de bisseção contínua.

### Remover o que não contribui

Com o problema reproduzível, remova tudo que não parece contribuir: desabilite threads que não deveriam estar envolvidas, desconecte fisicamente acoplamentos indiretos (mensagens, notificadores e listeners), mesmo que você ache que são benignos, e pule ou comente blocos no caminho do erro. Se o bug continua, o palpite sobre o isolamento estava certo e o espaço do problema diminuiu.

## 3. Hipótese e experimento

O livro descreve a caça a bugs complicados como o uso de algo semelhante ao método científico: formular uma hipótese, definir experimentos, executá-los e validar a teoria. O formato abaixo é convenção desta skill.

1. **Hipótese**: uma afirmação que pode ser falsa. "O total fica negativo porque o desconto não é limitado ao subtotal." Evite "tem algo errado no cálculo".
2. **Predição**: o que você verá se ela for verdadeira e o que verá se for falsa. "Com subtotal 500 e cupom 800, o total sai -300; com cupom 400, sai 100."
3. **Experimento**: a menor ação que distingue os dois cenários (um teste, um log pontual, um breakpoint condicional). Mude uma variável por vez.
4. **Resultado**: o que foi observado, literal (saída colada, não resumida).
5. **Conclusão**: hipótese confirmada, refutada ou inconclusiva. Se refutada, escolha a próxima com base no que o resultado revelou.

Hipóteses com as predições registradas evitam o viés de achar que o resultado "bate" depois de visto. Registre na tabela descrita no SKILL.md.

### Debugger (livro)

O debugger é uma ferramenta central: executar passo a passo, observar variáveis, definir breakpoints condicionais (por exemplo, "parar se x > y") e alterar valores durante a execução para testar caminhos. O livro defende conhecer bem a ferramenta e usá-la nos momentos adequados, mas avisa que depender demais dele, caminhando por linhas sem pensar, desvia o foco do todo para o detalhe. Formule a hipótese antes de abrir o debugger: o breakpoint existe para testá-la.

## 4. O teste que falha (livro)

Quando a causa for determinada, escreva um teste simples que a ilustre claramente e adicione-o à suíte antes de corrigir o código. O livro reconhece que isso exige disciplina, porque a vontade natural é corrigir rápido; o teste prova depois que a correção funcionou e impede que o bug volte. O livro de refatoração dá o mesmo hábito: ao receber o relatório de um bug, comece por um teste que o evidencie e pergunte o que ele revela sobre outras lacunas da suíte.

Verificações (convenção desta skill):

- O teste falha, e falha pela razão descrita na hipótese (confira a mensagem de falha, não só o status).
- O teste é o mais estreito possível: protege o comportamento do bug, não um detalhe de implementação.

## 5. Corrigir a causa raiz (livro)

Ao encontrar um bug existem dois caminhos: remendar o ponto onde o sintoma aparece ou retrabalhar o código para acomodar uma correção apropriada, mesmo que isso exija ajustar APIs, refatorar lógica ou revisar suposições que não se sustentam. O livro adota o segundo como meta, e diz que correções de sintoma não resultam em código simples. Suposições invisíveis no código também reduzem a simplicidade: explicite as que fazem parte do design.

Convenção desta skill: separe os commits. A correção e o teste vão juntos; refatorações maiores e mudanças de formatação ficam em commits separados (o livro apoia commits atômicos e não misturar mudança de layout com funcionalidade).

## 6. Verificar e não se apressar

1. O teste novo passa e a suíte inteira passa. O livro defende que os testes rodem no processo de build, de modo que falha de teste não possa ser ignorada.
2. Os passos de reprodução do passo 1 deixaram de falhar no cenário real (não só no teste).
3. Quem relatou confirma que está resolvido, quando isso for possível.
4. Pare um instante: há problemas relacionados na mesma seção? O padrão se repete em outras partes? Dá para reforçar o sistema com o que você aprendeu?
5. Anote as áreas que concentram mais falhas. Se isso consumir muito tempo, vale uma reescrita, uma revisão profunda ou mais testes de unidade ali.
6. Corrija bugs assim que possível. Deixá-los como "conhecidos" normaliza comportamento errado e dificulta achar a causa dos demais.

## 7. Bugs que não reproduzem ou são intermitentes (livro)

Sem passos de reprodução confiáveis:

- Registre os fatores presentes a cada ocorrência; com o tempo aparece um padrão. A cada informação nova, tire conclusões e decida que dado registrar a mais.
- Considere acrescentar logs e asserções em versões beta ou oficiais, para coletar informação em campo.
- Se o problema for premente, defina uma suíte que rode por longos períodos (soak test) simulando o uso de forma representativa, para antecipar a "temporada de caça".

Pistas de onde olhar primeiro, como lista de suspeitos para gerar hipóteses (não como regra):

| Suspeito | Por que gera intermitência | Como testar a hipótese (convenção desta skill) |
|---|---|---|
| Concorrência | A ordem de execução das threads varia; o debugger ou o log muda o tempo e pode esconder o bug (o livro chama de Heisenbug); build de debug e de release podem se comportar de forma diferente | Reproduzir sob carga ou repetição, usar detector de corrida da linguagem, rodar com a configuração de produção |
| Rede | Pode ficar lenta ou travar a qualquer momento; é descuido presumir que acessos remotos sempre funcionam | Injetar latência ou falha; checar timeouts, retentativas e tratamento de erro |
| Velocidade de armazenamento | Disco ou banco lento muda o comportamento, sobretudo perto do limite de um timeout | Medir tempos reais; testar com lentidão artificial |
| Corrupção de memória | Escritas fora de limites causam efeitos estranhos e não reproduzíveis | O livro diz que a arqueologia do controle de versões costuma ser o caminho mais fácil |
| Estado global e singletons | Qualquer parte do código pode alterar o estado; fica difícil prever e raciocinar | Isolar o estado por teste; localizar quem o escreve |

Fatores de caminho infeliz que geram bugs (livro, Cap. 9): erros de funções chamadas que foram ignorados, exceções que vazam recurso ou deixam estado inválido, interações entre threads e o encerramento do sistema (objeto usando outro já destruído, callbacks para objetos descartados). O livro resume que o inesperado é o material de que os bugs são feitos.

## 8. Estratégias oblíquas (livro)

- Pausa: pare e afaste-se do teclado; use a pausa para reconsiderar a descrição do problema e a estrutura do código antes de voltar.
- Explicar a outra pessoa (ou a um objeto sobre a mesa): descrever o problema com frequência o resolve durante a explicação.

Útil quando a mesma linha de investigação consumiu horas sem evidência nova. Combine com a decisão de escalar descrita no SKILL.md.

## 9. Prevenção (livro, resumo)

O livro lembra que evitar a criação de bugs é melhor que depurar: design pensado, revisões de código, programação em pares, testes automatizados (incluindo TDD), asserções, programação defensiva e ferramentas de cobertura. Também recomenda não escrever código "esperto", porque depurar é mais difícil que escrever e código maximamente esperto está fora do alcance de quem o escreveu para depurar.
