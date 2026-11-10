# O que é um bom teste

Consulte este arquivo ao escrever ou revisar testes. Páginas das fontes em [fontes.md](fontes.md).

## F.I.R.S.T. (Martin)

| Letra | Significado | Pergunta de revisão |
|---|---|---|
| F (Fast) | Rápido | A suíte roda tão depressa que ninguém evita executá-la? Teste lento deixa de ser rodado e os problemas aparecem tarde. |
| I (Independent) | Independente | Posso rodar qualquer teste sozinho e em qualquer ordem? Um teste que depende de outro causa efeito dominó e esconde defeitos. |
| R (Repeatable) | Repetível | Roda em qualquer ambiente, inclusive sem rede? Se só roda num ambiente, sempre haverá desculpa para a falha. |
| S (Self-validating) | Autovalidado | A saída é aprovado ou reprovado, sem eu ler log ou comparar arquivos? |
| T (Timely) | Pontual | Foi escrito junto com o código (imediatamente antes)? Escrito depois, o código tende a ficar difícil de testar. |

## Sinais de teste ruim

Agrupados por causa (síntese das fontes, não a lista original de nenhum livro).

**Não confiável**
- Às vezes passa, às vezes falha: causas comuns são threads, tempo, dependência externa, ordem de execução e estado compartilhado.
- Funciona só em uma máquina, ou precisa de configuração prévia (caminhos, banco).
- Testa uma cópia desatualizada do código de produção, ou o código de produção tem comportamento especial para teste. Nesses casos não se está testando o código real.
- Fixture mutável compartilhado entre testes.

**Difícil de ler e manter**
- Longo demais: sinal de que a unidade não é bem isolável.
- Vários conceitos em um teste; nome que não diz qual fato é verificado.
- Cheio de detalhes de montagem que não importam para o objetivo do teste.
- Duplicação entre testes (cada fato deve ser verificado uma vez; se a pré-condição foi verificada no primeiro teste, os outros podem supô-la).

**Verifica a coisa errada**
- Um teste por método da classe, em vez de por comportamento.
- Muitos testes de detalhes triviais escondendo que o comportamento principal não é testado (a classe provavelmente é grande demais).
- Testa código de terceiros sem motivo para desconfiar dele.
- Depende da implementação interna: não dá para mudar a implementação sem alterar os testes.
- Excesso de mock: teste cheio de dublês complexos é difícil de entender e de manter, e pode indicar estrutura ruim do código testado.

## Estrutura e nomes

- Três partes: preparar (construir), agir (operar), verificar. Em testes de unidade costuma haver uma única verificação alvo; se precisar de várias, talvez sejam vários casos.
- Cada novo caso de entrada vira um novo método de teste, não um acréscimo ao anterior.
- Nome como afirmação sobre o comportamento ("lista nova está vazia"), sem a palavra "teste" quando o framework já marca o método, sem "deve" nem redundância. Nomes de teste podem ter convenção própria (mais longos, com sublinhado).
- Se as chamadas de montagem se repetem, crie funções auxiliares com nomes do domínio (uma pequena linguagem de teste). Ela surge de refatorar testes ruidosos, não de planejamento prévio.
- Em teste, uma notação compacta é aceitável se for aprendida uma vez e facilitar a leitura (Martin mostra uma sequência de letras maiúsculas e minúsculas para estados ligado/desligado). Use com parcimônia e documente.

## Fixtures

- Crie um fixture novo antes de cada teste (setup por teste). O isolamento e o desmonte implícito saem de graça.
- Compartilhar fixture só se for imutável ou muito caro de criar; neste caso garanta explicitamente que nenhum teste o altera.
- Um conjunto de testes sobre o mesmo fixture padrão facilita conhecer os dados; o bloco de setup avisa ao leitor qual é o ponto de partida.

## Isolamento, dublês e testabilidade

- Teste de unidade: uma unidade isolada, sem acesso a banco, rede ou sistema de arquivos. Se envolve várias unidades, é teste de integração, e tudo bem, desde que você saiba o que está testando.
- A unidade conversa com o mundo por dois contratos: a interface que oferece e as que espera. Não deve depender de estado global compartilhado nem de singletons.
- Passe colaboradores pelo construtor e dependa de interfaces mínimas, não de classes inteiras; isso abre espaço para implementações de teste.
- Dublês: *dummy* só preenche parâmetro; *stub* devolve respostas prontas (e pode registrar chamadas); *mock* tem expectativas verificadas depois. Use mock com critério: se a maior parte do teste é montar mocks, reveja o design do código testado.
- Se o código é difícil de testar, tentar escrever o teste mostra a estrutura que falta: componentes pequenos, de propósito único, com baixo acoplamento.

## Manutenção da suíte

- Teste quebrado por mudança de comportamento: atualize-o conscientemente, após conferir o requisito. Comentá-lo e seguir em frente esconde o problema.
- Revise o código de teste com o mesmo cuidado do código de produção: a suíte só vale o que valem os testes nela.
- Inclua os testes no processo de build para que falha de teste falhe o build e não possa ser ignorada; isso também mantém os testes pequenos e rápidos.
