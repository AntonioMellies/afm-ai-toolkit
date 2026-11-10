# Notas - Goodliffe, Como ser um Programador Melhor - Bloco 03 (PDF p.155-231)

Observações gerais: o bloco começa no meio do Cap. 12 e termina truncado no início do Cap. 19 (p.231). Número impresso da página não aparece no texto extraído (impr. = não visível). Todos os "PONTO-CHAVE" são caixas de destaque do livro; são parafraseados aqui. Nenhum dos capítulos trata diretamente de TDD, depuração, git, code review como prática detalhada ou estimativas; as menções a testes, revisões e dívida técnica são laterais, dentro de argumentos sobre design/mudança.

---

### Cap. 12 - Lidando com a complexidade (PDF p.155-164) [continua do bloco anterior; o início do capítulo (até p.154) está no bloco anterior]
Resumo: usa a metáfora de "círculos" (componentes) e "linhas" (conexões) para explicar a complexidade do software. Parte da complexidade é necessária (tamanho), mas muita é desnecessária e vem de má estrutura e de pessoas sob pressão. Conclui que a causa maior é humana.
Conceitos e regras:
- Parte da complexidade é consequência natural do tamanho; é "necessária" e deve ser administrada. A complexidade desnecessária é a que causa dor (ex.: header C++ com milhares de linhas para uma única classe, muitas vezes gerado por wizards ou por falta de planejamento). [p.155]
- Tamanho em si não é o inimigo; remover código que cumpre requisitos é ser "simplista", não simples. O problema é como o código é estruturado e como o tamanho é distribuído. [p.156]
- Um design com poucas partes (3 classes gigantes) parece simples mas esconde um sistema muito complexo ("design simplista"). Melhor: subdividir em módulos/pacotes/componentes/classes menores, que facilitam compreensão e modificação (trabalha-se na menor parte relacionada à funcionalidade). [p.156-157]
- Preferir classes coesas que façam bem poucas tarefas, de preferência uma; cada responsabilidade deve estar em uma única parte do sistema, não espalhada. [p.157]
- Estudo de caso de redução: dois objetos enormes quase fundidos; removeu centenas de métodos "auxiliares" não utilizados, depois removeu métodos que apenas encaminhavam chamadas ao parceiro e fez os chamadores usarem o outro objeto; sobraram 2 métodos (um pertencia ao parceiro, outro virou função simples fora da classe). Passo seguinte seria decompor o círculo restante. [p.157-159]
- Linhas = acoplamento: menos conexões, design mais simples e menos rígido; sem nenhuma conexão não há sistema. Mais círculos e mais linhas, mais complexidade. A estrutura das conexões afeta a facilidade de trabalho. [p.159-160]
- A complexidade geralmente nasce de ciclos no grafo de dependências. Objetos codependentes são rígidos, difíceis de modificar, uma mudança em um exige mudança no outro, viram praticamente uma entidade. [p.160-161]
- Remédio: romper uma das ligações do ciclo, p. ex. introduzindo interfaces abstratas; isso melhora composição, flexibilidade e testabilidade (versões de teste dos componentes atrás das interfaces); usar interfaces bem nomeadas para tornar relacionamentos descritivos. [p.161]
- Antipadrão relatado: objeto-pai cria todos os filhos e cada filho recebe referência de volta ao pai, ficando acoplado a todos os irmãos ("distributed self", nome atribuído a Michael Feathers); engessa o sistema. [p.161-162]
- Os círculos e linhas não se criam sozinhos: quem os cria são as pessoas. A complexidade geralmente é acidental, produto da história: extensões sucessivas sem tempo de refatorar; "protótipo descartável" que vira produção. [p.162]
- Única forma de reduzir: assumir responsabilidade e evitar que pressões de trabalho forcem estruturas impossíveis de manter. [p.162]
- Conclusão: complexidade vem dos componentes, das conexões e, acima de tudo, das pessoas (e, em tom de piada, do padrão Singleton). [p.163]
- Pergunta/exercício: identificar maneiras em que introduziu complexidade desnecessária em código recente. [p.164]
Citações curtas de prova:
- "Dependências cíclicas, em geral, são os relacionamentos mais complexos a serem considerados." [p.161]
- "Isso é ser simplista em vez de ser simples" (sobre remover código necessário para reduzir complexidade) [p.156]
O que este trecho NÃO diz: não define métricas de complexidade, não dá procedimento passo a passo de refatoração além do caso de estudo, não explica DI nem SOLID por nome; Singleton só é citado de passagem, sem explicação.
Relevância para os artefatos candidatos: clean-code-expert: MÉDIA (coesão, acoplamento, remover código morto/encaminhadores, ciclos); testing-tdd-expert: BAIXA (interfaces abstratas favorecem testabilidade, uma linha); code-review-expert: BAIXA; dev-practices: BAIXA (pressão e protótipo que vira produção como causa); systematic-debugging: NENHUMA; git-workflow-expert: NENHUMA.
Decisão sugerida: usar em clean-code-expert (checklist de complexidade: ciclos, responsabilidade única, métodos-encaminhadores e código morto) e, secundariamente, em dev-practices (causa organizacional da complexidade); resto descartar.

---

### Cap. 13 - Um conto de dois sistemas (PDF p.166-184)
Resumo: compara dois projetos reais parecidos (Metrópole Confusa, sem design, e Cidade do Design, com design leve e disciplina) e mostra as consequências da arquitetura ruim e da boa, dentro e fora do código. Ênfase em coesão/acoplamento, design incremental, testes, dívida técnica visível e relação entre estrutura da equipe e do código.
Conceitos e regras:
Metrópole Confusa (arquitetura ruim):
- Causa: startup pressionada a lançar versões rapidamente, código reunido em "arrancadas malucas", crescimento "orgânico" sem arquitetura; protótipos separados juntados em vez de descartados; conflitos de personalidade geraram "impérios" de módulos. [p.167-172]
- Ponto-chave do autor: estrutura de empresa pobre e processos de desenvolvimento não saudáveis refletem-se em arquitetura de software pobre. [p.168]
- Incompreensibilidade: sistema difícil de entender e modificar; design ruim induz mais design ruim, pois o caminho mais fácil era sempre adotado e funcionalidades eram jogadas onde causassem menos dor. Regra: manter a qualidade do design. [p.168]
- Falta de coesão: componentes sem função única; difícil saber por que um componente existe e onde uma funcionalidade foi implementada; correção de bugs virou pesadelo, com qualidade e confiabilidade afetadas; funcionalidades e dados no lugar errado; "serviços essenciais" simulados por módulos externos. [p.169]
- Definições do boxe: coesão forte = funcionalidades relacionadas reunidas, módulo com função claramente definida (coesão fraca indica má decomposição); acoplamento baixo = poucas conexões de/para os módulos (chamadas, web services, tipos de dados, dados compartilhados); bom design limita as linhas de comunicação ao absolutamente necessário. [p.169-170]
- Acoplamento desnecessário: sem camadas, dependências bidirecionais, A acessa a parte interna de B e B tem chamadas fixas para A, sem núcleo central; não dava para criar esqueleto do sistema sem todos os componentes; mudança em um se propagava; impossível testes de unidade e de integração por componente; testar nunca foi prioridade. Regra: alto acoplamento resulta em código impossível de testar. [p.170-171]
- Problemas no nível do código: sem padrões de codificação, convenção de nomes, nem sistema de build comum (fitas adesivas, shell scripts, Perl, makefiles, projetos Visual Studio); duplicação generalizada (algoritmos, estruturas de dados, comunicação externa, caching reimplementados várias vezes, cada cópia com bugs próprios). [p.171]
- Efeitos além do código: alta rotatividade, estresse e medo de planejar funcionalidades; ciclo de desenvolvimento lento e imprevisível; suporte com dificuldade de entender diferenças de comportamento entre versões; protocolo de controle externo refletia a arquitetura (ruim, instável); atrito entre dev, marketing, vendas e produção. Ponto-chave: consequências não ficam restritas ao código; afetam pessoas, equipes, processos e cronogramas. [p.172-173]
- Irrecuperável: reescrita proibitivamente cara; a equipe passou a aplicar gambiarras, espiral descendente (código ruim, moral baixo, ciclos mais longos), problemas financeiros. Lista de resultados: baixa qualidade, pouco lançamento, inflexibilidade, problemas de código, estresse/rotatividade, política interna, fracasso da empresa. [p.173-174]
Cidade do Design (arquitetura boa):
- Equipe pequena, sem rivalidade; visão clara do produto e requisitos; direção inicial de design "não grande, só suficiente"; áreas funcionais demarcadas e preocupações centrais (ex.: modelo de threading) esquematizadas. [p.174-175]
- Decisões iniciais de manutenção: estrutura de arquivos de alto nível, nomenclatura, estilo "doméstico" com idioms comuns, framework de testes de unidade, infraestrutura de suporte. [p.175]
- Design e implementação feitos em pares ou cuidadosamente revisados. [p.175]
- Localização de funcionalidades: sempre claro onde o código novo pertence e onde achar o existente; às vezes o lugar certo era mais trabalhoso que o conveniente, mas compensava depois. Arquitetura é template e mapa. [p.175-176]
- Consistência: toda decisão tomada no contexto do design; resultado: sem duplicação, padrões e idioms de interface familiares, sem durações de vida de objeto incomuns nem gestão de recursos estranha. Pontos-chave: design claro gera consistência e reduz duplicação. [p.176]
- Arquitetura expansível: design tratado como maleável e refatorável ("nada gravado a ferro e fogo"), ágil; para poder mudar, manter simples; resistir a mudanças que comprometam a simplicidade. [p.177]
- YAGNI: projetar só o importante e adiar o resto até conhecer requisitos reais; projetar o que não se conhece é uma das piores tarefas; "pia da cozinha" no design é desperdício e bagagem cujo custo cresce ao longo da vida do projeto. Regra: adie decisões de design até que sejam necessárias; não adivinhe. [p.177-178]
- Qualidade mantida por processos definidos desde o início: programação em pares; revisões de código/design para o que não fosse em par; testes de unidade para todas as partes. Mudança que não se encaixasse no design era rejeitada; desenvolvedores sentiam-se donos do design e responsáveis. [p.178]
- Dívida técnica: sob prazo, atalhos foram tomados (para fazer funcionar rápido ou evitar mudanças de alto risco perto do release), mas eram marcados como débitos técnicos, com revisão futura agendada, mantidos visíveis. [p.178-179]
- Boxe "Débito técnico" (termo atribuído a Ward Cunningham): metáfora de empréstimo; pode permitir entregar algo agora, mas deve ser pago, e quanto mais demora mais juros; no longo prazo, qualidade menor significa prazos maiores; dívida pode ser refatoração adiada, ajustes de design, adiar atualização de bibliotecas/toolchain, racionalização de logging/debugging; não é só "fazer algo ruim": distinguir escolha pragmática de descuidada; manter visível, não deixar acumular, pagar cedo. [p.179-180]
- Testes moldam o design: unit tests no código, integração e aceitação no sistema; permitiram mudanças radicais tarde (modelo de threading, interface do pipeline de dados) sem quebrar o restante; mudanças grandes ficaram raras ao longo do tempo (platô estável). Ponto-chave: boa suíte automatizada permite alterações fundamentais de arquitetura com risco mínimo. [p.180]
- Testes forçam boa estrutura: cada componente tem de poder ser construído isolado num teste; garante coesão interna, baixo acoplamento, interface planejada, API significativa e consistente. Ponto-chave: faça unit tests e projete visando à testabilidade. [p.180-181]
- Prazo "nem muito longo nem muito curto" (Cachinhos Dourados): tempo demais gera magnum opus que nunca fica pronto; pouco demais impede design que valha a pena. Ponto-chave: bom planejamento do projeto gera designs superiores; aloque tempo suficiente. [p.181]
- Resultado humano: código coerente e fácil de entender, novatos produtivos, rotatividade muito baixa; ninguém dono de área (qualquer dev trabalha em qualquer ponto; todos escrevem código de alta qualidade); Lei de Conway (nota de rodapé: estrutura do código segue a da equipe; ex. 4 grupos, compilador de 4 passos) operando "de forma inversa": equipe coesa, software coeso. Ponto-chave: organização da equipe afeta o código e, com o tempo, a arquitetura afeta como a equipe trabalha. [p.181-182, 186]
- Fatores de boa arquitetura (lista final): design prévio intencional (nem menos nem mais que o necessário); qualidade/experiência dos designers; design visível durante o desenvolvimento; equipe que assume responsabilidade; não ter medo de mudar o design; pessoas certas e tamanho adequado de equipe com relações saudáveis; decisões de design no momento certo, adiando as que não dá para tomar; bom gerenciamento de projeto com prazos adequados. [p.182-183]
- Exercício: descrever o projeto atual a um estranho, apontar orgulhos e pontos a melhorar, comemorar o que vai bem. [p.184]
Citações curtas de prova:
- "Um design ruim resulta em mais designs ruins." [p.168]
- "Um alto acoplamento resulta em um código impossível de ser testado." [p.171]
- "Adie as decisões de design até que seja necessário tomá-las." [p.178]
- "Os testes nos deram a capacidade de alterar o design." [p.180]
O que este trecho NÃO diz: não explica como escrever testes de unidade nem TDD (test-first não é mencionado); não prescreve modelo de revisão de código (formato, checklist) nem pareamento em detalhe; não fala de branches, commits ou releases; não dá método de cálculo/gestão de dívida técnica além da metáfora e de marcá-la e agendá-la; o benefício do YAGNI é argumentado, sem exemplo de código.
Relevância para os artefatos candidatos: dev-practices: ALTA (dívida técnica visível e agendada, YAGNI/adiar decisões, prazo adequado, pressão de entrega vs qualidade, propriedade coletiva, regras de equipe desde o início); testing-tdd-expert: MÉDIA (argumento de que testes automatizados permitem mudar arquitetura e forçam coesão/baixo acoplamento; sem técnica de TDD); code-review-expert: BAIXA-MÉDIA (revisão/pareamento como mecanismo que rejeita mudança que não se encaixa no design; sem prática detalhada); clean-code-expert: MÉDIA (coesão/acoplamento, duplicação, consistência de nomes/estilo); systematic-debugging: BAIXA (só: sem coesão, achar onde corrigir bug é pesadelo); git-workflow-expert: NENHUMA (cita só check-in e CI no cap. 18; nada aqui).
Decisão sugerida: usar em dev-practices (seções de dívida técnica, YAGNI/adiar decisões, relação entre prazo e design, consequências de arquitetura ruim fora do código) e em testing-tdd-expert (rationale: testes como rede de segurança e pressão de design); coesão/acoplamento em clean-code-expert; descartar o restante narrativo.

---

### Cap. 14 - Desenvolvimento de software é... (PDF p.188-198)
Resumo: discute o desenvolvimento por meio de várias metáforas (arte, ciência, esporte, brincadeira de criança, obrigação/zeladoria) e termina avisando que nenhuma metáfora é perfeita. Cada seção termina com perguntas de autoavaliação.
Conceitos e regras:
- Premissa: boa característica de programadores excelentes é importar-se com o software e como o escrevem; escrever o código certo da maneira certa (analogia do "creme de letrinhas" feito do jeito trapaceiro, adequado no máximo para protótipo, não para fabricação em larga escala). [p.188-189]
- Arte: criativo (imaginação, visão do código antes de criá-lo), estético (elegância, beleza, equilíbrio, forma além da função), mecânico (ferramentas, processos), baseado em equipe. Programador deve ter bom gosto e senso estético. Michelangelo: removeu o que sobrava; analogia com reduzir complexidade até o código belo. Pergunta: minha ideia de "bonito" é a única? [p.189-191]
- Ciência: rigoroso (código correto para entradas válidas e resposta apropriada a inválidas; testado, medido, verificado; testes de unidade, integração e sistema, de preferência automatizados), sistemático (nada de tentativa e erro, juntar componentes aleatórios até parecer funcionar; planejar, projetar, orçar), esclarecedor (esforço analítico, em especial ao caçar bugs complicados: formular hipótese, definir experimentos, executá-los e validar a teoria). Ponto-chave: bom desenvolvimento não é codificação cowboy; é planejado, avaliado e preciso. Citação de Einstein sobre mover-se na direção oposta à complexidade. [p.191-193]
- Esporte: trabalho em equipe, disciplina (treino; só assistir não melhora; é preciso jogar), regras/cultura da equipe (processos, rituais, fluxos de ferramentas, ex. sistema de controle de versões como ponto de cooperação). Contraste entre time infantil (todos correm atrás da bola, sem passes) e time de elite (responsabilidades claras, visão compartilhada). [p.193-195]
- Brincadeira de criança: aprendizado com humildade (ponto-chave: bons programadores admitem que não sabem tudo; crítica a quem lê um livro e se acha expert), simplicidade (perguntar "por quê?" sempre; código simples, não simplório), diversão. [p.195-196]
- Obrigação: trabalho tedioso de burro de carga faz parte; "zelador" de software faz limpeza (assumir tarefas desagradáveis no prazo e sem desestruturar o código), trabalha em segundo plano, faz manutenção (remover código morto, corrigir código quebrado, refatorar/reimplementar trabalho inadequado). [p.197]
- Excesso de metáforas: nenhuma é perfeita; cuidado com falsas deduções por comparações ruins. [p.198]
Citações curtas de prova:
- "Um bom desenvolvimento de software não é uma codificação cowboy" [p.193]
- "Bons programadores trabalham com humildade." (paráfrase do ponto-chave; texto: admitem que não sabem tudo) [p.195-196]
O que este trecho NÃO diz: não dá técnicas de depuração (só descreve a analogia com método científico em uma frase); não define processo de testes; não especifica regras de equipe concretas (isso vem no cap. 15).
Relevância para os artefatos candidatos: dev-practices: MÉDIA (humildade, zeladoria/manutenção como obrigação, disciplina e cultura de equipe, perguntas de autoavaliação); systematic-debugging: BAIXA-MÉDIA (uma frase: tratar bug complicado como método científico, hipótese-experimento-validação); testing-tdd-expert: BAIXA (rigor: unit/integration/system, automatizados); clean-code-expert: BAIXA (simplicidade, remover código morto); code-review-expert: NENHUMA; git-workflow-expert: NENHUMA (só menção de controle de versões como fluxo de cooperação).
Decisão sugerida: usar pontualmente em dev-practices (postura: humildade, zeladoria, cultura) e uma linha em systematic-debugging (método hipótese/experimento); resto descartar (filosófico).

---

### Cap. 15 - Jogando segundo as regras (PDF p.201-205)
Resumo: argumenta que equipes precisam de regras próprias, simples e explícitas que definam sua cultura de codificação, e apresenta as três regras da equipe do autor. Regras também podem mudar.
Conceitos e regras:
- Existem muitas regras no desenvolvimento: padrões de código, processos, ferramentas e fluxos obrigatórios, etiqueta, sintaxe, padrões de projeto, regulamentações do domínio (ex.: financeiro, saúde). Elas ajudam a coordenar o trabalho. [p.201-202]
- Equipes devem ter regras próprias, simples, que possam ser entregues a novos membros para que entrem logo no jogo e que descrevam uma cultura de codificação, não só processos. [p.203]
- As três regras da equipe do autor: mantenha a simplicidade; use o seu cérebro; nada está gravado a ferro e fogo. Impressas em cartazes; guiam decisões difíceis e discussões; são breves de propósito e exigem responsabilidade do desenvolvedor para serem interpretadas. Detalhadas nos caps. 16, 17, 18. [p.203-204]
- Pergunta/regras de exemplo citadas como possíveis regras de processo: presença na reunião diária às 10h; todo código deve ser revisado antes do check-in; todo relatório de bug deve ter passos claros de reprodução antes de ir para um desenvolvedor. [p.204] (são exemplos hipotéticos dados pelo autor, não prescrições)
- Ponto-chave: não dependa de regras vagas e não escritas; torne explícitas as regras implícitas e assuma o controle da cultura de codificação. Regras também não são gravadas a ferro e fogo; podem ser refeitas conforme a equipe aprende. [p.204-205]
- Exercício: formular e afixar as regras de desenvolvimento da equipe. [p.205]
Citações curtas de prova:
- "Torne explícitas as regras implícitas e assuma o controle de sua cultura de codificação." (trecho do ponto-chave, ~14 palavras) [p.204]
O que este trecho NÃO diz: não lista um conjunto padrão de regras de equipe; não detalha como obter consenso (remete aos caps. 35 e 37); não explica como aplicar/fiscalizar regras.
Relevância para os artefatos candidatos: dev-practices: MÉDIA (acordos de equipe explícitos, cultura de codificação, regras de processo curtas, revisar regras periodicamente); code-review-expert: BAIXA (menciona "todo código revisado antes do check-in" como exemplo de regra); git-workflow-expert: BAIXA (check-in como exemplo, nada sobre fluxo); clean-code-expert: BAIXA (padrão de codificação); testing-tdd-expert: NENHUMA; systematic-debugging: BAIXA (exemplo de regra: bug report com passos de reprodução, uma linha).
Decisão sugerida: usar em dev-practices (working agreements explícitos e revisáveis); descartar o restante.

---

### Cap. 16 - Mantenha a simplicidade (PDF p.207-215)
Resumo: distingue simplicidade (difícil, exige esforço) de código simplista (incorreto). Enumera propriedades de designs simples, a regra de corrigir bugs na causa-raiz, o cuidado com suposições, otimização prematura e "suficientemente simples".
Conceitos e regras:
- Dois tipos de simplicidade: o errado (atalhos, varrer complexidade para baixo do tapete, ignorar casos difíceis) gera código simplista, que é incorreto: só cobre o caso principal, ignora condições de erro e entradas improváveis, é remendado com mais código simplista, acabando numa confusão. Simplicidade nunca é desculpa para código incorreto; projetar código simples exige esforço. [p.207-208]
- Sinal de design simples: descrito rápida e claramente (uma frase ou diagrama), fácil de conceituar. [p.208]
- Simples de usar: pouca carga cognitiva, recursos avançados revelados gradualmente. [p.208-209]
- Evita usos indevidos: complexidade fica oculta atrás de API simples; exemplo: interface que não devolve objetos alocados dinamicamente que o usuário deva apagar (o usuário esquece, gera leak/falha). Design simples pode ter complexidade interna extra para apresentar API mais simples. [p.209]
- Tamanho: o menor número possível de componentes, "e não menores". [p.209]
- Caminhos mais curtos: reduzir níveis de indireção (cadeias longas de chamadas, getters, encaminhamento, camadas de abstração); manter funcionalidade e dados próximos de onde são necessários; evitar herança, ligação dinâmica e polimorfismo desnecessários (bons quando usados na hora certa, mas geram complexidade se cegos). [p.209-210]
- Estabilidade: design simples é melhorado e estendido sem grande reescrita; retrabalho contínuo da mesma seção indica requisitos muito voláteis ou design não simples; interfaces simples tendem a ser estáveis, mas não devem virar camisa de força. [p.210]
- Linhas de código simples: fácil de ler e entender; consistência (estilo, nomenclatura, abordagens de design, formato de arquivos) gera simplicidade; variação grande produz código obscuro. Não escrever código obscuro por segurança de emprego, para impressionar, nem para testar recurso novo da linguagem; preferir implementação clara em estilo comum. [p.210-211]
- Bug: duas abordagens. (a) Remendar o sintoma (esparadrapo) adiciona nova imperfeição sem tratar o problema subjacente; (b) retrabalhar o código para acomodar a correção mantendo simplicidade (ajustar APIs, refatorar lógica, repensar suposições inválidas). A segunda é a meta. Ponto-chave: aplique correções de bugs à causa-raiz, não onde os sintomas se manifestam. [p.211-212]
- Suposições: suposições "simplificadoras" inválidas viram lógica complicada; código simples não faz suposições desnecessárias (sobre requisitos, domínio, leitor, ambiente de execução, toolchain); evite suposições implícitas; mas suposições explícitas (restrições e contexto) podem aumentar a simplicidade. [p.212]
- Otimização prematura: otimizar em geral estraçalha uma implementação legível e a torna menos simples; implementar claro primeiro, otimizar só quando necessário; usar ordenação simples/padrão até precisar de algo mais esperto; implementação mais simples e medir se precisa ser mais rápida; programadores otimizam o que acham lento, mas gargalos costumam estar em outro lugar. [p.212-213]
- Suficientemente simples: não simplificar demais (solução tem de resolver o problema); escrever só o código necessário (não pilhas de código "que serão úteis"; menos código, menos bugs); não generalizar solução para problemas irrelevantes. Ponto-chave: escreva somente a quantidade de código necessária. [p.213]
- Conclusão: o caminho para a complexidade é marcado por mudanças apressadas, padrões abandonados, correção com esparadrapo, "revisão de código que deixou de ser feita", "não tenho tempo para refatorar". Relação com máximas: YAGNI (suficiência), DRY (tamanho do código), alta coesão/baixo acoplamento (simplicidade de design). [p.213-214]
- Exercício: verificar se as modificações de código contribuem para a simplicidade; evitar adicionar complexidade. [p.215]
Citações curtas de prova:
- "Um código simplista é um código incorreto." [p.207]
- "Aplique correções de bugs à causa-raiz, e não nos locais em que os sintomas se manifestam." [p.211-212]
- "A consistência leva à clareza." [p.211]
- "Implemente um código claro inicialmente. Torne-o complexo somente quando for necessário." [p.212]
O que este trecho NÃO diz: não define métricas de simplicidade; não ensina a achar a causa-raiz (não descreve técnica de depuração); não traz exemplos de código; não explica como medir desempenho antes de otimizar (só diz "avalie").
Relevância para os artefatos candidatos: clean-code-expert: ALTA (simplicidade vs simplismo, indireção desnecessária, consistência de estilo, suposições explícitas, YAGNI/DRY, otimização prematura, API que evita mau uso); systematic-debugging: MÉDIA (corrigir causa-raiz e não sintoma; remendo adiciona complexidade); dev-practices: BAIXA-MÉDIA ("não tenho tempo para refatorar" como origem da complexidade; escrever só o necessário); code-review-expert: BAIXA (revisão pulada citada como causa de complexidade; critérios de consistência e obscuridade proposital úteis a um revisor); testing-tdd-expert: NENHUMA; git-workflow-expert: NENHUMA.
Decisão sugerida: usar em clean-code-expert (princípios de simplicidade; seção de otimização; suposições) e em systematic-debugging (regra: tratar causa-raiz, não sintoma, e checar suposições inválidas); consistência como critério em code-review-expert.

---

### Cap. 17 - Use o seu cérebro (PDF p.216-219)
Resumo: segunda regra da equipe; defende pensar antes de codificar, evitar código "estúpido" e descuidado, admitir erros e ter coragem/autonomia para criticar e melhorar o código.
Conceitos e regras:
- Não seja estúpido: gênios também fazem código tolo; vontade de criar algoritmo/estrutura de dados engenhosa pode obscurecer que um array simples bastaria; pressa e pressão de entrega geram código abaixo do padrão. Ponto-chave: pare e pense. [p.216-217]
- Admita erros: ninguém escreve código perfeito; ao perceber código/design ruim, admitir, voltar atrás e adotar abordagem melhor; exige coragem; "limpe a sua sujeira". [p.217]
- Evite o descuido (piloto automático): programar seguindo os dedos, preso no problema imediato sem ver o quadro geral nem o código ao redor, leva a código extenso, complexo, incorreto, com bugs e casos não tratados. Antes de cada tarefa: parar, dar um passo atrás, considerar alternativas em vez de adotar o primeiro plano que surgiu. [p.217-218]
- Estratégias de responsabilidade: revisões de design antes de abrir o editor; programação em pares; revisões de código. [p.218]
- Você tem permissão para pensar: não seja autômato preenchendo lacunas do design alheio ou apenas seguindo estruturas e idioms existentes; tome decisões conscientes sobre formato e estrutura; seja dono do código; se os padrões existentes forem questionáveis, considere alterá-los; avalie se agora é o momento de refatorar; se achar código cheio de esparadrapos, não adicione outro quando um ajuste radical for necessário; você pode avaliar o código criticamente; defenda o que melhora o código. [p.218-219]
- Pergunta: critérios para decidir entre retrabalhar código ruim ou marcá-lo pragmaticamente como dívida técnica (a pergunta é feita, sem resposta no texto). [p.219]
- Exercício: escolher duas técnicas para focar melhor e evitar código estúpido. [p.219]
Citações curtas de prova:
- "Pare e pense. Não escreva códigos estúpidos." [p.217]
- "Admita seus erros e as decisões ruins de codificação. Aprenda com eles." [p.217]
- "Tenha coragem de usar o seu cérebro." [p.219]
O que este trecho NÃO diz: não oferece checklist para decidir quando refatorar ou quando deixar dívida (apenas pergunta); não detalha como conduzir revisões ou pareamento; não define "descuido" com sinais concretos (pergunta 3 pede ao leitor).
Relevância para os artefatos candidatos: dev-practices: MÉDIA (postura: pensar antes, alternativas, autonomia para criticar, responsabilidade); clean-code-expert: BAIXA-MÉDIA (evitar complexidade acidental, algoritmo sofisticado quando array basta); code-review-expert: BAIXA (revisões de design/código e pareamento citados como defesa contra descuido); systematic-debugging: NENHUMA; testing-tdd-expert: NENHUMA; git-workflow-expert: NENHUMA.
Decisão sugerida: usar em dev-practices (postura e responsabilidade); descartar o restante.

---

### Cap. 18 - Nada está gravado a ferro e fogo (PDF p.221-228)
Resumo: terceira regra; critica a ideia de código intocável (por medo) e defende mudanças corajosas mas seguras, apoiadas por testes automatizados, integração contínua, refatoração, propriedade coletiva e pequenos passos.
Conceitos e regras:
- Código "embalsamado": depois de escrito ou lançado, o código vira sagrado por medo (de errar, de introduzir falhas, de trabalho extra, de custo da mudança). Ponto-chave: código "inalterável" apodrece. [p.221-222]
- Sintomas de rigidez: autores originais saem e ninguém entende o núcleo crítico; devs evitam o núcleo e acrescentam módulos satélites nas bordas para ter previsibilidade; APIs originais mantidas porque muitas equipes/serviços dependem delas. [p.222]
- Nenhum código é sagrado ou perfeito; requisitos mudam, a v2.4 pode exigir estrutura interna diferente da v1.6, sempre aparecem novos bugs. Código que vira camisa de força: luta-se contra o software. [p.222]
- Mudanças sem medo: o medo é sensato (mudança descuidada = codificação cowboy). Reconciliar com: aprender práticas que aumentam a segurança; saber o que torna o software fácil de modificar; fazer melhorias diárias; adotar atitudes saudáveis; e, acima de tudo, fazer a mudança: sempre é possível restaurar o código a um estado funcional e tentar de novo, desde que a mudança tenha apoio de testes e inspeções suficientes antes de ir para produção. [p.223]
- Atitudes de equipe: corrigir código incorreto, perigoso, ruim, duplicado ou desagradável não é desvio nem perda de tempo, é esperado; refatoração incentivada e tarefas podem demorar mais por isso; ninguém é dono de código (evitar feudalismo, que reduz a taxa de mudanças); errar não é crime e ter o código melhorado por outro não é sinal de fraqueza; nenhuma opinião vale mais que outra (experiência não vira posse); esperar mudanças; confiar na rede de proteção da responsabilidade: revisões, programação em pares, testes de unidade e de integração automatizados e boa interação QA/dev. [p.223-225]
- Ponto-chave: "bom código" não é problema dos outros; é sua responsabilidade. [p.224]
- Analogia do turista/vilarejo: às vezes é melhor voltar a um local sólido (levar o código a uma "rodovia local") e depois seguir viagem mais rápido, em vez de afundar no lamaçal; importante aprender a mapear e rastrear o código e achar efeitos colaterais surpreendentes. [p.225-226]
- Projete visando a mudanças: código que revela forma e propósito; simplicidade, clareza, consistência; evitar efeitos colaterais (frágeis diante de mudanças); se uma função faz duas tarefas, separá-la em duas; tornar explícito o implícito; evitar acoplamento rígido e complexidade desnecessária. [p.226]
- Estratégia contra base rígida: melhorar lentamente, dia após dia, em passos seguros por partes (linhas e estrutura); ponto-chave: normalmente é melhor uma série de ajustes frequentes, pequenos e testáveis do que uma alteração abrangente. Não lutar com toda a base de uma só vez; identificar uma seção limitada com a qual se deva interagir e concentrar-se nela. [p.226]
- Ferramentas: suíte automatizada de testes dá feedback rápido e confiável sobre quebras; considerar introduzir testes verificáveis para as seções escolhidas antes de alterar (para evitar erros); ponto-chave: testes automatizados são rede de segurança inestimável. Integração contínua como espinha dorsal: servidor que faz checkout e build contínuos da versão mais recente, com testes automatizados também executados no servidor de build; erros de build são descobertos rapidamente. [p.226-227]
- Escolha suas batalhas: nem tudo pode ser corrigido agora; dívida técnica significativa deve entrar no plano do projeto e no cronograma como item de trabalho, em vez de ser esquecida; evitar uma seção do código por medo é contraproducente; código inalterado é peso. [p.227]
- Perguntas/exercício: atributos que tornam o software fácil de alterar; balancear ausência de dono com experiência; quanto do código é rígido (não usado, saudável, ou evitado por ser ruim); ferramentas apoiam mudanças?; identificar código em que ninguém quer mexer e descobrir como melhorá-lo. [p.228]
Citações curtas de prova:
- "Para modificar um código, é preciso ter coragem e habilidade. Não seja descuidado." [p.223]
- "Normalmente, é melhor fazer uma série de ajustes frequentes, pequenos e testáveis" [p.226]
- "Os testes automatizados representam uma estrutura de segurança de valor inestimável" [p.227]
- "Se você encontrar uma função que faça duas tarefas, separe-a em duas partes." [p.226]
O que este trecho NÃO diz: não explica como escrever testes de caracterização para código legado (só sugere "teste verificável" nas seções escolhidas); não descreve técnicas de refatoração por nome nem passos (remete ao cap. 7); não detalha CI além de uma frase; não aborda branches, commits pequenos ou revert por nome (só diz que é possível restaurar o código a um estado funcional).
Relevância para os artefatos candidatos: clean-code-expert: MÉDIA-ALTA (projetar para mudança, separar função que faz duas coisas, evitar efeitos colaterais, explicitar o implícito, refatorar em passos pequenos, remover código ruim/duplicado); testing-tdd-expert: MÉDIA (testes automatizados como rede de segurança, testar a seção antes de mudar, CI executando testes; sem técnica TDD); dev-practices: MÉDIA-ALTA (propriedade coletiva do código, dívida significativa vira item de cronograma, refatoração aceita pela equipe, escolher batalhas, cultura sem medo); code-review-expert: BAIXA-MÉDIA (revisões e pares como rede de proteção; não ser dono; opinião de todos vale; errar não é crime); git-workflow-expert: BAIXA (CI/build no servidor e possibilidade de restaurar estado funcional; nada sobre branches/commits); systematic-debugging: BAIXA (mapear/rastrear código e achar efeitos colaterais surpreendentes, uma frase).
Decisão sugerida: usar em dev-practices (atitudes de equipe, dívida no cronograma, propriedade coletiva), clean-code-expert (design para mudança, pequenos passos) e testing-tdd-expert (testes como rede de segurança e CI); mencionar CI/revert em git-workflow-expert apenas como apoio.

---

### Cap. 19 - Um estudo sobre reutilização de código (PDF p.230-231) [continua no próximo bloco; trecho truncado ao fim de p.231]
Resumo (parcial): ceticismo em relação à "reutilização" como bala de prata; discute os "casos de reutilização", começando por copiar e colar e por código copiado da Internet. A lista de critérios de avaliação está cortada ao fim do bloco (termina no terceiro item).
Conceitos e regras:
- Caso 1, copiar e colar: é duplicação mais que reutilização; "pirataria de código"; viola DRY; se um fragmento está repetido 516 vezes (exemplo do autor) e tem bug, é difícil achar e corrigir todas as ocorrências. [p.230]
- Contraponto reconhecido: copiar e colar entre projetos "faz o trabalho" e evita o acoplamento desnecessário que um código excessivamente DRY pode sofrer; mesmo assim é um mau negócio. [p.231]
- Ponto-chave: evite codificar copiando e colando; fatore a lógica em funções compartilhadas e bibliotecas comuns. [p.231]
- Código copiado da Internet (fóruns, blogs): perigoso inserir sem avaliação crítica. Perguntas prévias listadas: o código está totalmente correto, trata erros ou é só ilustrativo (tratamento de erros é frequentemente "exercício para o leitor"), está livre de bugs?; é a melhor maneira, ou é exemplo desatualizado/anacrônico?; você tem direito de incluí-lo, há licença aplicável? [p.231] (texto continua no bloco seguinte, possivelmente com mais itens)
Citações curtas de prova:
- "Lembre-se do mantra DRY: Do not Repeat Yourself (Não se repita)." [p.230]
- "Fatore sua lógica em funções compartilhadas e bibliotecas comuns, em vez de sofrer com códigos (e bugs) duplicados." [p.231]
O que este trecho NÃO diz (neste bloco): os demais casos de reutilização e a estratégia recomendada não aparecem aqui; capítulo incompleto.
Relevância para os artefatos candidatos: clean-code-expert: MÉDIA (DRY, duplicação por copy-paste e seu custo em bugs; ressalva do acoplamento do excesso de DRY); code-review-expert: BAIXA-MÉDIA (checklist ao revisar código colado da Internet: correção, atualidade, licença); dev-practices: BAIXA; git-workflow-expert: NENHUMA (só "faça commit" na narrativa); testing-tdd-expert: NENHUMA; systematic-debugging: NENHUMA.
Decisão sugerida: aguardar o próximo bloco para consolidar; usar em clean-code-expert (duplicação) e, como item de checklist, em code-review-expert (código de origem externa).

---

## Páginas de transição / partes
- p.187: abertura da Parte II "A prática leva à perfeição" (introdução da parte: práticas, técnicas e regras para bom código e cooperação em equipe; sem conteúdo técnico).
- p.165, 185, 199, 206, 220, 229: páginas em branco/sem texto; p.186, 200: apenas notas de rodapé (N.T. YAGNI; N.T. "craft"; nota Conway; nota sobre Knuth na p.215).

## Síntese de relevância do bloco (para o orquestrador)
- Capítulos mais úteis: 13 (dívida técnica, YAGNI, testes moldam design), 16 (simplicidade, causa-raiz), 18 (mudança segura, CI, propriedade coletiva).
- Nada deste bloco sustenta, por si só, uma skill de TDD, de git workflow ou de code review; o livro aqui só dá argumentos de apoio (testes como rede de segurança, revisões/pareamento como controle de qualidade, CI).
- systematic-debugging: do bloco, só a regra "corrija a causa-raiz, não o sintoma" (cap. 16) e a menção ao método científico (cap. 14).

## Checklist de cobertura
- Primeira página lida: 155
- Última página lida: 231 (confirmado por Grep: último marcador "=== PDF PAGINA 231 ===", linha 2566; arquivo termina na linha 2607)
- Páginas sem texto útil ou ilegíveis: 165, 185, 199, 206, 220, 229 (vazias); 186, 200 (só notas de rodapé)
- Problemas de extração observados: ligaduras "fi/ff/ti" perdidas (ex.: "su ciente", "con ável", "de nição", "uxos"), que não afetam o sentido; imagens/diagramas dos círculos e linhas (cap. 12) não extraídos; número impresso das páginas não aparece. Notas de rodapé aparecem em páginas separadas (186, 200, 215).
- Capítulos/seções cobertos integralmente: 13, 14, 15, 16, 17, 18; Cap. 12 coberto da p.155 até o fim (sem o início)
- Capítulos/seções que continuam em outro bloco: Cap. 12 (início antes de p.155, vem do bloco anterior); Cap. 19 (continua após p.231)
