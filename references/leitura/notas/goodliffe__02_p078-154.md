# Notas: Goodliffe, Como ser um Programador Melhor, bloco 02 (PDF p.78-154)

Observação geral: o texto do bloco não mostra números de página impressos (rodapé/cabeçalho ausente na extração); todas as páginas abaixo são "PDF PAGINA N". Os candidatos são abreviados: TDD = testing-tdd-expert; DEBUG = systematic-debugging; GIT = git-workflow-expert; REV = code-review-expert; PRAT = dev-practices; CLEAN = clean-code-expert.

---

### Cap. 5 (final): O fantasma de um código do passado (PDF p.78-80) [continua do bloco anterior; só o fim está aqui]
Resumo: o trecho fecha a lista de coisas que você enxerga ao rever código antigo (idioms, decisões de design, bugs) e conclui que revisitar código velho equivale a uma revisão de código feita em si mesmo. Concluir que "não está perfeito" não obriga a mexer nele.
Conceitos e regras:
- Idioms: com o tempo a linguagem ganha recursos (ex.: lambdas) e o código idiomático de hoje difere do de antes; código antigo que reimplementa à mão o que existe pronto (exemplo de max feito manualmente, truncado no início da p.78) parece estranho depois [p.78]
- Decisões de design: ao evoluir, você percebe acoplamento desnecessário, API menos limpa, gerenciamento de recursos jogado para o cliente, algoritmo simplista, reimplementação do que a biblioteca já oferece [p.78]
- Bugs: depois de ser "mordido" por certos tipos de bug, você passa a enxergar bugs potenciais em código velho; é o "sexto sentido do programador" [p.78-79]
- Revisitar código antigo = fazer code review de si mesmo; vale um passeio rápido pelos trabalhos antigos [p.79]
- Regra de não mexer: "se não está com problemas, não corrija"; código não apodrece sozinho, só se o mundo ao redor muda (compilador, linguagem, biblioteca de terceiros, pressuposição quebrada por mudança em outro lugar) [p.79]
- Estranhar o próprio código antigo é sinal de aprendizado [p.79]
- Perguntas finais: quanto o código antigo destoa do moderno; quais idioms de hoje evitam erros [p.80]
Citações curtas de prova:
- "se não estiver com problemas, não corrija. O código não apodrece, a menos que o mundo em volta dele mude." [p.79]
O que este trecho NÃO diz: não dá método de revisão nem checklist; só o final do capítulo está no bloco (a parte de formatação/estilo está no bloco anterior).
Relevância: CLEAN: BAIXA (idioms/design evolutivo, sem regra operacional); REV: BAIXA (ideia de "revisar o próprio código"); DEBUG/TDD/GIT/PRAT: NENHUMA.
Decisão sugerida: descartar (só apoio de contexto para a regra "não refatore sem motivo", já coberta no cap. 7).

---

### Cap. 6: Percorrendo um caminho (PDF p.83-93)
Resumo: como um recém-chegado (ou qualquer um) aprende rápido uma base de código grande: pedir ajuda a quem conhece, ler "pistas" do projeto (build, testes, estrutura, docs, arquitetura), e aprender mexendo, começando por mudanças pequenas e seguras. Fecha com perguntas e remissões.
Conceitos e regras:
- Objetivos ao abordar código grande: onde começar, o que cada seção faz, qualidade, navegação, idioms (para as mudanças se encaixarem), onde está cada funcionalidade e seus bugs, relação com testes e docs [p.83-84]
- Aprender rápido para não fazer primeiras mudanças embaraçosas, nem duplicar trabalho, nem quebrar outras partes [p.84]
- Seu melhor caminho é ser guiado por quem conhece o terreno: perguntar, programar em par, ter alterações revisadas [p.84]
- Etiqueta ao pedir ajuda: educação e gratidão; perguntas sensatas; pesquisar antes; retribuir informações; perguntas idiotas em excesso reduzem a ajuda quando ela for realmente necessária [p.84-85]
- Fóruns e listas de e-mail (projetos open source) como alternativa [p.84]
- Pista 1, obter o código-fonte: ideal é um único checkout em qualquer diretório; paths fixos no código atrapalham gerar versões diferentes; ver se há servidor de CI e resultados de testes publicados [p.85]
- Pista 2, facilidade de build: build difícil costuma indicar código difícil; perguntas: ferramentas incomuns? build do zero documentado? direto do controle de versões ou com ajustes manuais? um passo só ou vários? dá para compilar só uma parte? build de release igual ao de dev? build "silencioso" ou cheio de warnings que escondem problemas? [p.85-86]
- Build saudável roda em um passo, sem intervenção manual (nota: um passo automatizado permite colocá-lo em CI) [p.86, nota p.94]
- Pista 3, testes: existem? que parte cobrem? rodam automaticamente? com que frequência? cobertura? são reais ou stubs para "parecer" cobertura? Relação quase universal: código com boa suíte tende a ser bem fatorado e bem projetado; testes servem de trilha pela interface e padrões de uso [p.86]
- Ponto de partida para corrigir bug: adicionar um teste de unidade simples que falha e então corrigir sem quebrar os outros [p.86-87]
- Pista 4, estrutura de arquivos: diretórios refletem camadas/subsistemas? terceiros separados do código do projeto? [p.87]
- Pista 5, documentação: existe, está boa e atualizada? (Javadoc, Doxygen etc.) [p.87]
- Pista 6, análise estática: ferramentas de navegação e geração de diagramas de classe/fluxo [p.87]
- Pista 7, requisitos: especificações originais tendem a ter pouca relação com o produto final (opinião do autor) mas são históricas; wiki com conceitos comuns [p.87]
- Pista 8, dependências: frameworks/bibliotecas; ter noção do que oferecem e onde procurar; desconfiar de coleções/primitivas de thread caseiras em vez da biblioteca padrão, que é mais robusta e testada [p.87-88]
- Pista 9, qualidade: ler comentários, código morto comentado, consistência de estilo [p.88]
- Pista 10, arquitetura: identificar camadas, banco/esquema, GUI, I/O, rede; a arquitetura real costuma diferir do design ideal, confie no código e não na documentação [p.88]
- Arqueologia de software: logs do controle de versões e "blame" para ver origem e evolução, quantas pessoas passaram e quantas continuam [p.88-89]
- Aprender fazendo: ler leva só até certo ponto; não paralisar por falta de confiança; modificar o código é a melhor forma de conhecê-lo e aprender com os erros [p.89]
- O que modificar primeiro: onde há benefício imediato e risco mínimo; um bug pequeno, repetível e de baixo risco em vez de um bug intermitente enorme [p.89-90]
- Rodar validadores/linters (Lint, Fortify, Cppcheck, FxCop, ReSharper), reabilitar avisos do compilador desligados e corrigi-los: mudança não funcional que percorre o código e revela o zelo dos autores [p.90]
- Estudar um trecho pequeno, criticar, refatorar, nomear variáveis, quebrar trechos grandes em funções pequenas e bem nomeadas [p.90]
- Cuidado: escrever é mais fácil que ler; muitos dizem "está feio" e reescrevem em vez de entender, o que gera mudança desnecessária, tempo perdido e novos bugs [p.90-91]
- Teste antes de mexer: descobrir como adicionar um teste e rodar a suíte; truque do teste de uma linha que falha (smoke test) para provar que a suíte não está sendo ignorada [p.91]
- Organizar a casa: pequenas melhorias de UI, arrumar a hierarquia de diretórios para casar com o IDE/projeto [p.91]
- Documentar o que achar: criar README de como começar, pedir revisão a um veterano; manter diagrama de camadas atualizado; procurar introduzir interfaces para separar sem alterar funcionalidade [p.91-92]
- Perguntas finais: ferramentas de investigação; como adicionar código novo a sistema pouco entendido (criar um "firewall" em volta do código existente); o que facilita o onboarding; se o tempo que você ficará no código muda o esforço (correção "rápida e suja") [p.92]
Citações curtas de prova:
- "Um build saudável é executado em um só passo, sem intervenção manual durante o processo." [p.86]
- "Com frequência, a verdadeira arquitetura de um sistema difere do design ideal. Sempre confie no código, e não na documentação." [p.88]
- "A melhor maneira de conhecer um código é modificando-o." [p.89]
- "escrever código é mais fácil que lê-lo." [p.90]
O que este trecho NÃO diz: não explica como escrever bons testes, nem fluxo de branch/commit; "blame" e logs são citados só de passagem.
Relevância:
- PRAT: ALTA (onboarding em base desconhecida, checklist de pistas, etiqueta de pedir ajuda, README/diagrama, primeiras tarefas de baixo risco)
- TDD: MÉDIA (teste falhando como ponto de partida; smoke test para confirmar que a suíte roda; testes como mapa da interface)
- CLEAN: MÉDIA (qualidade de código, warnings, código morto, nomes, funções pequenas)
- DEBUG: BAIXA (começar por bug pequeno e reproduzível)
- GIT: BAIXA (arqueologia/blame, um checkout único)
- REV: BAIXA (ter alterações revisadas por veterano)
Decisão sugerida: usar em dev-practices (checklist "como entrar em código desconhecido", primeiras mudanças seguras, README) e citar pontualmente em testing-tdd-expert (smoke test, teste que falha primeiro).

---

### Cap. 7: Chafurdando na lama (PDF p.95-104)
Resumo: como lidar com código ruim ("areia movediça"): avaliar de forma realista e sem julgamento pessoal, decidir se vale investir (depende do tempo que você ficará nele e da frequência com que ele muda), e quando mexer, fazer pequenas melhorias progressivas, uma alteração por vez, protegido por testes e controle de versões.
Conceitos e regras:
- Catálogo de sinais de código ruim citados [p.95-96]: gotos/zigue-zague que escondem o algoritmo; layout pobre e nomes descuidados; acoplamento forte e baixa coesão; má fatoração (UI misturada com lógica de baixo nível); duplicação (mesmo bug em vários lugares); abuso de OO (herança por motivos inapropriados); código escrito no estilo de outra linguagem; comportamento instável (mudança num ponto quebra módulo aparentemente não relacionado); uso ruim de threads (intermitente, difícil de reproduzir)
- Esteja preparado para código ruim e tenha ferramentas para lidar com ele [p.96]
- Avalie com realismo: o código pode ter estigma ("ninguém quer mexer"), ou apenas não estar no estilo que você prefere. Não julgue código/autores sem investigar, não torne pessoal; poucos escrevem código ruim de propósito; código perfeito não existe, nem o seu [p.96-97]
- Benchmarks de avaliação [p.97-98]: APIs externas claras? tipos bem escolhidos e nomeados? layout organizado e consistente (não basta isso)? estrutura de objetos cooperantes simples ou fluxo de controle imprevisível? fácil localizar onde um efeito é gerado?
- Arqueologia no controle de versões para avaliar: idade, quanto mais velho que o projeto, quantas pessoas, última modificação, colaborador recente a quem perguntar, quantos bugs corrigidos ali (muitas correções indicam código pobre) [p.98]
- Plano de ataque: corrigir? fazer o mínimo e sair? substituir por completo? Resposta depende dos planos futuros: quanto tempo você trabalhará nessa seção; não tente reescrita completa sem tempo [p.98-99]
- Frequência histórica de modificação prediz o futuro; se funcionou anos sem ajustes e é improvável mudar, talvez não valha organizar. "Escolha suas batalhas" [p.99]
- Regra dos escoteiros (atribuída a Robert Martin): sempre deixe o código melhor do que encontrou; melhorias pequenas: layout inconsistente, nome ruim, condicional complexa simplificada, método longo dividido em subfunções bem nomeadas [p.99-100]
- Regra principal: faça alterações lentamente e com cuidado, uma de cada vez [p.100]
- Não misture mudança de layout com mudança funcional: reorganize o layout, faça commit, só então a mudança funcional (preferível manter o layout existente a menos que atrapalhe) [p.100]
- Garantir que a "organização" preserve comportamento: ferramentas automatizadas confiáveis, ou revisão cuidadosa e olhos extras; refatoração = técnicas conhecidas de melhoria de estrutura; só é eficiente com testes de unidade sólidos; como código confuso costuma não ter testes, considere escrever testes que capturem comportamentos importantes primeiro [p.100]
- Ajustar as APIs que encapsulam o código sem mexer na lógica interna: corrigir nomes, tipos de parâmetro, ordem; introduzir uma nova interface externa desejada, implementada sobre a API existente; retrabalhar o interior depois [p.100-101]
- Tenha coragem: o controle de versões é a rede de proteção, dá para voltar no tempo [p.101]
- Substituir tudo às vezes vale, mas há risco: remendos e hacks podem conter funcionalidade aprendida por "experiência amarga"; ignorar esses comportamentos sutis é arriscado [p.101]
- Referência ao livro Trabalho eficaz com código legado (Michael Feathers) para introduzir pontos de teste com segurança [p.101]
- História de guerra do contêiner: refatoração interna preservando uma API horrível produziu algo artificial e difícil de estender; a solução veio de simplificar o uso (remover requisitos estranhos), o que simplificou API e classe. Lição: às vezes pensar mais amplo para a melhoria certa [p.101-102]
- Sem atribuir culpa: autores podem não conhecer refatoração, ter estado sob pressão e feito atalhos (que raramente fazem chegar mais rápido) [p.102]
- Trate como oportunidade e lição: como evitar repetir esses erros? Avalie sua atitude: você sempre sabe mais que o autor original? Exemplo: júnior "refatorou" código de veterano (commit "código refatorado para melhorar a organização"), removeu funcionalidades, e o autor reverteu [p.103]
- Perguntas: vantagens de separar mudanças de layout e de código; quantas vezes o código era realmente ruim e não só "diferente do seu gosto" [p.103]
Citações curtas de prova:
- "Faça alterações no código lentamente e com cuidado. Faça uma alteração de cada vez." [p.100]
- "Siga a regra dos escoteiros. Sempre que mexer em um código, deixe-o melhor do que estava." [p.99]
- "Escolha suas batalhas." [p.99]
- "Não é preciso sair atribuindo culpa por um código “ruim”." [p.102]
O que este trecho NÃO diz: não lista técnicas de refatoração específicas nem padrões de seams (remete a Feathers); não dá critério numérico para decidir reescrever.
Relevância:
- CLEAN: ALTA (catálogo de sinais de código ruim, regra dos escoteiros, melhorias pequenas, refatorar sob testes, nomes, condicionais, métodos longos)
- PRAT: ALTA (decisão de quando investir em limpeza, escolher batalhas, não culpar pessoas, uma mudança por vez)
- GIT: MÉDIA (commit separado para layout antes de mudança funcional; VCS como rede de proteção; log/blame como arqueologia)
- TDD: MÉDIA (escrever testes de caracterização antes de refatorar código sem testes)
- REV: MÉDIA (revisão cuidadosa/olhos extras quando não há ferramenta de refatoração; atitude de não culpar; caso do júnior)
- DEBUG: BAIXA (threads intermitentes e comportamento instável como sinais)
Decisão sugerida: usar em clean-code-expert (sinais, regra dos escoteiros, refatorar sob testes, estratégia de API-fachada) e dev-practices (decidir investimento e postura); extrair a regra "commit de layout separado do commit funcional" para git-workflow-expert; usar a postura "sem culpa" em code-review-expert.

---

### Cap. 8: Não ignore esse erro! (PDF p.105-110)
Resumo: nunca ignore erros possíveis nem deixe o tratamento "para depois"; cada mecanismo de sinalização (código de retorno, efeito colateral, exceção) tem armadilhas; ignorar erros gera código frágil, inseguro e com interfaces ruins; desculpas comuns são refutadas ou contrapostas.
Conceitos e regras:
- Parábola da perna fraturada: ignorar a dor e continuar piora o dano; vale para erros [p.105-106]
- Sempre verifique e trate erros, por mais improvável que pareçam; ignorar não economiza tempo, armazena problemas [p.105-106]
- Códigos de retorno: fáceis de ignorar, nada no código enfatiza o problema; alternativas mais expressivas: tupla, tipo opcional (boost::optional, Nullable<T>), Maybe/Option/Either em linguagens funcionais, em vez de valor mágico [p.106]
- Efeitos colaterais (errno): global fácil de ignorar, difícil de usar, problemático com várias threads; outros canais secundários (função de checar estado, objeto que vira "inválido") [p.106-107]
- Exceções: mais estruturadas e não ignoráveis em princípio, mas há `catch (...) {}` que engole erros (ao menos evidencia algo duvidoso); críticas: ocultam o caminho do erro e podem vazar recursos ou violar o contrato da função; exigem disciplina e idioms da linguagem [p.107]
- Consequências de não tratar [p.107-108]: código frágil (falhas difíceis de achar); código inseguro (crackers exploram tratamento pobre de erros); estrutura ruim (se tratar erros é tedioso em toda parte, a interface provavelmente é ruim; expresse-os melhor)
- Exponha as condições de erro nas interfaces; não finja que serviços sempre funcionam; programadores devem saber dos erros de programação, usuários dos erros de uso [p.108]
- Não basta registrar em log e esperar que alguém veja; perguntar quem lê o log e quem agirá; se encerrar o programa não é opção, sinalize o problema de forma discreta porém óbvia [p.108]
- Desculpas comuns listadas [p.108-109]: polui o fluxo normal; trabalho extra com prazo; "essa chamada nunca falha" (printf, malloc); é só programa de brincar; a linguagem não incentiva (filosofia Erlang "deixe falhar", sistemas projetados para tolerar processos que falham)
- Perguntas: como garantir que erros de níveis baixos não sejam ignorados (código e processo); exceções são mais seguras?; misturar códigos de erro e exceções; técnicas de teste que revelem tratamento inadequado [p.109]
- Tente isto: auditar condições de erro sem tratamento no código mais mexido e comparar com código pouco mantido [p.109-110]
Citações curtas de prova:
- "Não ignore possíveis erros em seu código. Não adie o tratamento de erros para “mais tarde”" [p.106]
- "Use as exceções de forma adequada e disciplinada." [p.107]
- "Os programadores devem ter ciência dos erros de programação. Os usuários devem ter ciência dos erros de uso." [p.108]
O que este trecho NÃO diz: não detalha como projetar exceções (hierarquias, checked vs unchecked) nem estratégia de logging; exceção "fora do escopo" segundo o próprio autor [p.107].
Relevância:
- CLEAN: ALTA (tratamento de erros: retornos tipados vs. códigos mágicos, não engolir exceções, erros como parte da interface)
- REV: MÉDIA (itens de checklist: erros ignorados, catch vazio, log sem dono)
- TDD: BAIXA (pergunta sobre testes que exponham erros mal tratados)
- DEBUG: BAIXA (erros engolidos geram falhas difíceis de achar)
- PRAT: BAIXA (desculpas de prazo)
Decisão sugerida: usar em clean-code-expert (seção de erros: catálogo de canais de erro e consequências) e em code-review-expert (checklist: catch vazio, retorno ignorado, log sem destinatário).

---

### Cap. 9: Espere pelo inesperado (PDF p.111-114)
Resumo: ao escrever código, considere todos os caminhos de execução, não só o "feliz": erros de chamadas, concorrência e encerramento. Isso deve ser pensado cedo, pois não se adiciona depois.
Conceitos e regras:
- Programadores "ignoralistas": não consideram situações incomuns; a cada passo considere todas as ocorrências incomuns, por mais improvável que pareçam [p.111]
- Erros em qualquer função chamada: (a) código de erro: verifique, nunca ignore; (b) exceção: garanta que seu código lida com a propagação sem vazar recursos nem deixar o programa em estado inválido; (c) função que falha silenciosamente sem fazer o que se espera [p.111-112]
- Considere erros recuperáveis (escreva recuperação) e irrecuperáveis (faça o melhor possível, não ignore); use o tratamento idiomático da linguagem (ex.: Erlang "deixe falhar") [p.112]
- Threading: interleavings difíceis de enumerar e reproduzir; entenda concorrência básica, desacople threads, use troca de mensagens rápida e confiável entre contextos sem condições de corrida nem bloqueios desnecessários [p.112]
- Encerramento: pouca atenção ao fim do ciclo de vida; parar sem vazar recursos, travar ou falhar; difícil em multithread; não deixar objeto usando outro já destruído; não enfileirar callbacks de threads para objetos já descartados [p.112-113]
- O "inesperado" não é incomum; é o material dos bugs; pensar cedo, pois correção não vem como pós-pensamento [p.113]
- Perguntas: quando é aceitável relaxar o rigor; cenários surpreendentes [p.113-114]
- Tente isto: auditar a última seção de código em que trabalhou quanto ao cuidado com erros e interações incomuns [p.114]
- Remissões: cap.8, cap.7, cap.10 (bugs como consequência de casos não tratados), cap.11 (testes para enumerar/monitorar condições inesperadas) [p.114]
Citações curtas de prova:
- "Considere todos os caminhos em potencial do código enquanto o estiver escrevendo." [p.113]
- "O “inesperado” não é o incomum. É o material com que os bugs são feitos." [p.113]
O que este trecho NÃO diz: não oferece técnicas concretas de concorrência nem lista de casos de borda; apenas orienta a pensar neles.
Relevância:
- CLEAN: MÉDIA (robustez, tratamento de erros, vazamento de recursos)
- REV: MÉDIA (checklist de caminhos de erro, concorrência e encerramento)
- DEBUG: MÉDIA (a maioria dos bugs vem de condições não consideradas)
- TDD: BAIXA (incluir casos de teste para cenários improváveis, via remissão)
- PRAT/GIT: NENHUMA
Decisão sugerida: usar em code-review-expert (perguntas de revisão: erro, concorrência, encerramento) e em clean-code-expert (robustez); referência menor em systematic-debugging.

---

### Cap. 10: Caça aos bugs (PDF p.116-131)
Resumo: capítulo central de depuração. Debugging custa muito, prevenir é melhor, e quando o bug aparece deve-se investigá-lo metodicamente: caracterizar e reproduzir, armadilhas (asserções/logs), divisão binária, arqueologia de VCS, testes, ferramentas, remoção de código, estratégias oblíquas, e abordagem para bugs não reproduzíveis.
Conceitos e regras:
- Contexto: programadores passam muito tempo depurando; custo citado: US$ 312 bilhões/ano em salários segundo pesquisa da Judge Business School (Cambridge) [p.117]; custos adicionais: atrasos, projetos cancelados, reputação, correção pós-lançamento [p.117]
- Prevenção: um grama de prevenção vale um quilo de cura; práticas citadas: design bem pensado, code reviews, programação em par, estratégia de testes com TDD e suítes automatizadas, asserções, programação defensiva, ferramentas de cobertura [p.117-118]
- Não escreva código "esperto": Kernighan (debugging é duas vezes mais difícil que escrever, então código maximamente esperto não pode ser depurado por você); Fowler (escrever código que humanos entendem) [p.118]
- A maioria dos bugs é achada em minutos se abordada com método; os poucos difíceis consomem a maior parte do tempo [p.119]
- Dois fatores definem a dificuldade: como reproduzir e o intervalo entre a inserção da causa e a percepção do bug [p.119]
- Primeiro passo, caracterizar o bug [p.119-120]: reduzir ao menor conjunto de passos de reprodução (vital); isolar detalhes externos; focar em um único problema (não misturar duas falhas relacionadas); determinar se é repetível: frequência, dependência de configuração, tipo de máquina, periféricos. Ter um conjunto definido de passos de reprodução = maior parte da batalha [p.120]
- Coloque armadilhas: entre um ponto sabidamente correto e um ponto com estado inválido, adicione asserções/testes de invariantes e printouts de diagnóstico; elas aprofundam o entendimento e cercam o bug; asserções e logs (até printf) são ferramentas eficazes [p.120]
- Pode-se manter logs de diagnóstico e asserções após a correção, mas sem sujar o código com logging inútil que gera ruído [p.121]
- Divisão binária: achar início e fim da cadeia de eventos, dividir o espaço do problema ao meio, ver se o ponto central está bom ou ruim, repetir; tempo O(log n) em vez de O(n); combine com armadilhas [p.121]
- Arqueologia de software: achar ponto no passado sem o bug, e com um caso de teste reproduzível, avançar (binariamente) para achar a mudança que causou a falha; a causa costuma ficar óbvia; argumento por check-ins pequenos, frequentes e atômicos em vez de commits massivos; nota: `git bisect` automatiza a divisão binária [p.121-122, nota p.130]
- Testes: suíte de testes como "canário"; um teste de unidade reproduzível é estrutura de debug bem mais fácil que o programa completo com ações manuais; escreva um teste de unidade que demonstre o bug em vez de caçar a partir do sistema completo [p.122]
- Cobertura de código: regra geral "se a suíte não exercita essa parte, você não pode acreditar que ela funcione"; "código não testado é um campo de reprodução de bugs" [p.122]
- Ao achar a causa: escreva primeiro um teste simples que ilustre o problema, adicione à suíte antes de corrigir, use-o para provar a correção; exige disciplina, pois dá vontade de corrigir logo; o teste evita regressão [p.122-123]
- Ferramentas afiadas: conhecê-las antes da emergência (verificadores de memória como Electric Fence, Valgrind); não usar martelo pneumático para quebrar noz [p.123]
- Debugger: entrar em programa em execução, passo a passo, observar variáveis, breakpoints condicionais ("break if x > y"), alterar valores em execução, alguns permitem voltar passos; use IDE e considere alternativas melhores; o desprezo pelo debugger é infundado, mas confiar demais nele (passo a passo sem pensar) leva a focar no micro em vez do macro; use-o nos momentos adequados [p.123-124]
- Remover código para excluí-lo da análise: com o problema reproduzível, remova o que não contribui; desabilite threads não envolvidas; desconecte fisicamente acoplamentos indiretos (mensagens, notificador-listener) mesmo achando que são benignos; se o bug persiste, o palpite estava certo; pule/comente blocos no caminho do erro [p.124]
- Limpeza evita infecção: corrija bugs o mais rápido possível; não classifique como "problema conhecido"; síndrome da janela quebrada: bugs persistentes normalizam comportamento ruim e mascaram causas de outros bugs; exemplo de projeto em que cada relatório exigia achar dez outros problemas antes de reproduzir o original [p.124-125]
- Estratégias oblíquas [p.125]: fazer pausa e afastar-se do teclado; explicar o problema para outra pessoa ou para o "patinho de borracha" (Hunt e Thomas)
- Não se apresse após corrigir: verificar problemas relacionados na mesma seção, se o padrão se repete em outras seções, se dá para reforçar o sistema; anotar quais partes concentram mais falhas (hot spots), que podem pedir reescrita, revisão profunda ou mais testes de unidade [p.125-126]
- Bugs não reproduzíveis [p.126-127]: manter registro dos fatores que contribuem e buscar padrões; tirar conclusões e registrar mais dados; adicionar mais logs e asserções em betas/oficiais para coletar informação em campo; soak tests automatizados de longa duração com comportamento representativo
- Pistas para bugs intermitentes [p.127-128]: código em threads (interleavings, comportamento muda sob debugger, logging pode mascarar, build debug vs release; chamados Heisenbugs); interação com a rede (lenta, trava; não presumir sucesso em armazenamento remoto); velocidade variável de armazenamento (discos/bancos lentos perto de limiares de timeout); corrupção de memória (pilha/heap sobrescrita; arqueologia costuma ser o caminho mais fácil); variáveis globais/singletons (estado global alterado por qualquer um, difícil raciocinar)
- Perguntas: parcela do tempo gasta com debugging; novas linhas vs. ajustes; efeito de ter suíte de testes; software sem bugs é meta realista [p.128]
- Tente isto: próxima vez, abordagem metódica com armadilhas, divisão binária e ferramentas [p.129]
Citações curtas de prova:
- "Reduza o bug ao conjunto mais simples possível de passos para reproduzi-lo. Isso é vital." [p.119]
- "Faça divisões binárias nos espaços dos problemas para obter resultados mais rápidos." [p.121]
- "Um código não testado é um campo de reprodução de bugs." [p.122]
- "Corrija os bugs o mais rápido que puder." [p.124]
- "se sua suíte de testes não exercitar essa parte, você não poderá acreditar que ela funcione" [p.122]
O que este trecho NÃO diz: não dá protocolo formal tipo "hipótese, experimento, conclusão" com nome; não cobre depuração de produção/observabilidade além de "logs e asserções em campo"; não detalha uso de ferramentas específicas além de nomeá-las.
Relevância:
- DEBUG: ALTA (todo o capítulo: caracterizar e reproduzir, armadilhas, bisseção, remoção, pausa/patinho, bugs intermitentes e suas causas prováveis, pós-correção)
- TDD: ALTA (teste que reproduz o bug antes da correção, suíte como canário, cobertura como indicador de confiança)
- GIT: MÉDIA (arqueologia/bisect, commits pequenos e atômicos para facilitar bisseção)
- PRAT: MÉDIA (corrigir bugs cedo, janela quebrada, anotar hot spots, parar e pensar)
- REV: BAIXA (code review como prevenção)
- CLEAN: BAIXA (evitar código "esperto", logging útil sem ruído)
Decisão sugerida: usar em systematic-debugging como fonte principal (fluxo: caracterizar, reduzir, armadilhas, bisseção, VCS, teste de reprodução, pós-correção; seção de bugs intermitentes); usar em testing-tdd-expert a regra "teste que falha antes de corrigir bug"; git-workflow-expert: commits atômicos + bisect.

---

### Cap. 11: É hora de testar (PDF p.132-153)
Resumo: defende testes de desenvolvimento automatizados, escritos pelos próprios programadores, no nível mais baixo possível, para encurtar o ciclo de feedback. Cobre tipos de teste, quando escrever e rodar, o que testar, características de bons e maus testes, estrutura (arrange-act-assert), nomes, manutenção, frameworks, isolamento e test doubles.
Conceitos e regras:
- TDD é polêmico (religião, única forma, ideia impraticável, desperdício); o capítulo busca uma abordagem saudável; "confusão sobre o que é teste de unidade" [p.132]
- Por que testar: você testa de qualquer jeito; sem testar, problemas aparecem no QA ou, pior, com o cliente [p.132]
- Ciclo de feedback (do mais lento ao mais rápido): campo/usuário; QA em candidatos a release; testes de desenvolvimento manuais/harness; testes de unidade em classes/funções (feedback mais rápido); quanto menor o ciclo, mais cedo se muda o design e mais confiança; problema achado cedo é mais barato porque o código ainda está na cabeça [p.133-134]
- Testes manuais são trabalhosos e lentos; automatize; testes viram "pool" que roda continuamente como canário contra regressões funcionais [p.134]
- Escrevemos código para testar código (SUT = system under test); confiança vale o que valem os testes; estudos citados (Janzen e Saiedian) mostram que estratégia sólida reduz defeitos; suíte ruim (frágil, difícil, código rígido) é argumento contra testes ruins, não contra testes [p.135]
- Quem escreve: os próprios programadores (a função de "engenheiro de testes de unidade" é considerada menos eficiente); testes em todos os níveis, mas programadores precisam do escopo mais baixo [p.135]
- Tipos de teste [p.136-137]: de unidade (menor unidade em isolamento, sem banco/rede/sistema de arquivos; frameworks xUnit ou só assert); de integração (unidades em conjunto, mesmos frameworks, escopo maior; muitos "unitários" são de integração); de sistema/end-to-end (especificação de toda a funcionalidade, critérios de aceitação; via API pública ou Selenium; testes subcutâneos abaixo da UI; suíte lenta, setup caro)
- Estilos: mentalidade voltada a unidade (mais unitários que integração, mais integração que sistema) ou a sistema (inverso); todos os tipos devem existir num projeto maduro [p.137]
- Quando escrever: TDD implica testes antes, mas há dois temas (orientar design por feedback dos testes vs. escrever antes religiosamente); quanto mais tarde, menos eficazes (esquece comportamento, casos limítrofes, ou nem escreve) [p.137-138]
- Ciclo TDD (XP; mantra: não escreva código de produção sem um teste falhando) [p.138-139]: 1) escolher próxima funcionalidade e escrever teste (falha); 2) implementar do modo mais simples até passar, rodando a suíte várias vezes; 3) organizar/refatorar sob a proteção da suíte (parte normalmente menosprezada); 4) repetir. Também chamado vermelho-verde-refatorar
- Mesmo sem teste-primeiro, escreva testes durante ou imediatamente depois; testes orientam o design (usabilidade da API), evitam regressão e documentam uso [p.139]
- Mesmo sem infraestrutura de testes de sistema, assuma a responsabilidade com testes de unidade; se a estrutura for ruim, a tentativa de escrever o teste conduz a uma estrutura melhor (nota 2) [p.139, nota p.152-153]
- Bug no código de produção: escrever antes um teste de unidade que falha e mostra a causa (pode revelar falhas relacionadas), depois corrigir e adicionar o teste à suíte [p.139]
- Quando executar: commitar produção e teste juntos; testes rodam no servidor de build/CI; unidade rodam com frequência nas máquinas dos desenvolvedores; preferência do autor: incluir testes no processo de build/compilação/execução para que falha de teste falhe o build e não possam ser ignorados; isso também força testes pequenos e rápidos [p.140]
- Integração e sistema podem rodar só no CI se demorarem [p.140-141]
- Testes automatizados não substituem QA humano exploratório; eles evitam que o QA perca tempo com erros simples [p.141]
- O que testar: tudo que é importante; requisitos; se desempenho é requisito (ex.: servidor deve responder em certo tempo), teste-o; cobertura de código é métrica terrível como meta; foque nos comportamentos e características mais relevantes [p.141]
- Bons testes exigem prática; é melhor começar do que ficar paralisado; testes ruins são passivo (lentos, difíceis de ler, quebram em massa); quanto mais lentos, menos rodados e menos feedback; exemplo de suíte herdada com métodos de centenas de linhas [p.142]
- Características de um bom teste [p.142-143]: conciso com nome claro (ex.: "lista nova está vazia"); fácil de manter (escrever, ler, modificar); rápido; atualizado; roda sem configuração prévia da máquina (sem paths/banco); independente de outros testes e de estado externo ou compartilhado; testa o código de produção real (não uma cópia desatualizada, nem comportamento especial de teste no SUT)
- Descrições de testes mal feitos [p.143-144]: intermitentes (threads, tempo, dependência externa, ordem de execução, estado compartilhado); feios/difíceis de ler; longos demais (SUT mal isolável); vários aspectos num único caso; atacam a API função por função em vez de comportamentos; testam código de terceiros sem razão; escondem a falta de teste do comportamento principal sob muitos testes triviais (classe provavelmente grande demais); detalhes sem sentido (getters/setters); dependem de conhecimento de caixa-branca da implementação; funcionam só em uma máquina
- Cheiro de teste pode indicar código ruim em teste, que deve orientar o design [p.144]
- Estrutura arrange-act-assert (preparar, agir, verificar); na verificação normalmente uma única asserção, várias sugerem mais de um caso de teste; cada novo caso vira novo método; exemplo em Java com @Test (toUpperCase) [p.144-145]
- Nomes de testes: claros, lidos como frases; se é difícil nomear, o requisito é ambíguo ou há vários aspectos; não precisa da palavra "test" quando há atributo; evitar "deve" e redundância; nomes são especificações, cada um um fato; convenções próprias, nomes mais longos e underscores são aceitáveis (ex.: strings_can_be_capitalised) [p.145]
- Estrutura da suíte: cobrir casos normais, casos de falha comuns e valores-limite (vazios, zeros); cobrir requisitos com sistema/integração e todo o código com unidade é louvável mas custoso [p.145-146]
- Não duplique testes: cada caso verifica um fato uma vez (ex.: pré-condição após construção verificada no primeiro teste não precisa repetir) [p.146]
- Erro comum: um teste por método da classe; raramente útil porque um método não é testável isoladamente; escreva testes por comportamento [p.146]
- Manutenção: teste é tão importante quanto produção; se confuso, limpe e refatore; não comente testes que falham por mudança de comportamento e fuja; caso real do colega que removeu testes "que pararam" e eram os que indicavam um problema fundamental no código novo [p.146-147]
- Frameworks: xUnit (SUnit de Kent Beck, JUnit, NUnit, CppUnit) moldam o estilo; podem ser não idiomáticos (C++; Catch como alternativa); começar com `main` e asserts; não ter UI/passo separado para testes: integrá-los ao build com feedback instantâneo; para sistema, ferramentas como Fit e Cucumber definem testes de forma mais humana, permitindo não programadores participarem [p.147-148]
- Isolamento: contratos duas vias (interface fornecida e esperada); sem estado global compartilhado nem singletons; colaboradores como parâmetros do construtor ("parametrizar de cima"); depender de interfaces mínimas e não de classes completas; permite implementações alternativas em teste; código testável resulta em melhor design [p.148-149]
- Test doubles [p.149-150]: dummies (preenchem parâmetros, não são chamados); stubs (respostas predefinidas, podem registrar chamadas); mocks (criados a partir de interface, com expectativas e verificação posterior; mais fáceis em linguagens com reflexão); excesso de mocks ("mock mania") é cheiro e pode indicar estrutura ruim do SUT
- Conclusão: testes ajudam a escrever, manter e documentar, mas não resolvem tudo; Dijkstra: testes mostram presença de bugs, não ausência; suíte só vale o que valem seus testes, e o código de teste deve ser revisado tão cuidadosamente quanto o de produção; se vale escrever, vale testar; automatize execução; reduza o ciclo de feedback [p.150-151]
- Perguntas: estilos de teste; testar antes ou logo depois; engenheiro dedicado a testes unitários; por que QA escreve pouco código de teste; como introduzir TDD em base sem testes; investigar behaviour-driven development [p.151]
Citações curtas de prova:
- "Para melhorar o nosso desenvolvimento de software, devemos ter um feedback rápido e conhecer os problemas assim que eles surgirem." [p.134]
- "Escreva testes à medida que escrever o código em teste." [p.139]
- "Variáveis globais e objetos singleton são um anátema do teste confiável." [p.148]
- "Fatorar o seu código para torná-lo “testável” resulta em um melhor design do código." [p.149]
- "se o código for importante o suficiente para ser escrito, ele será importante o suficiente para ser testado" [p.150-151]
O que este trecho NÃO diz: não aprofunda BDD (só pergunta), nem pirâmide de testes como termo, nem estratégia de dados de teste, testes de contrato ou property-based; não dá meta numérica de cobertura (só desaconselha como meta); não mostra mais que um exemplo curto de código.
Relevância:
- TDD: ALTA (ciclo vermelho-verde-refatorar, tipos de teste, quando escrever/rodar, características de bom teste, lista de testes ruins, AAA, nomes, isolamento, doubles, manutenção da suíte)
- DEBUG: MÉDIA (teste falhando que reproduz o bug antes de corrigir)
- CLEAN: MÉDIA (testabilidade como design, nomes, singletons/globais, dependências injetadas, evitar duplicação em testes)
- PRAT: MÉDIA (testes no build, CI, QA exploratório complementar, cobertura não como meta)
- REV: BAIXA (revisar código de teste como produção)
- GIT: BAIXA (commitar teste junto com produção)
Decisão sugerida: usar como fonte principal de testing-tdd-expert (ciclo, taxonomia, catálogo de bons/maus testes, AAA, nomes, doubles); regra "teste de regressão antes da correção" também em systematic-debugging; testabilidade/injeção como apoio em clean-code-expert.

---

### Cap. 12: Lidando com a complexidade (PDF p.154) [continua no próximo bloco]
Resumo (só o início): afirma que complexidade é batalha diária; é fácil escrever algo complicado quando falta atenção, planejamento, ou quando casos limítrofes fazem um algoritmo simples virar um labirinto. O autor anuncia que a complexidade vem de três fontes principais, mas o bloco termina antes de enumerá-las ("círculos, linhas, pessoas" é o que aparece, sem desenvolvimento).
Conceitos e regras:
- Complexidade nasce de falta de atenção, falta de planejamento e acúmulo de casos limítrofes [p.154]
- Citação de abertura de Dijkstra sobre simplicidade exigir trabalho árduo [p.154]
Citações curtas de prova:
- "A complexidade é uma batalha contra a qual todos nós devemos lutar diariamente." [p.154]
O que este trecho NÃO diz: as três fontes de complexidade, qualquer técnica de redução (estão no bloco seguinte).
Relevância: CLEAN: BAIXA no que está aqui (reavaliar quando o resto chegar no bloco 03); demais: NENHUMA.
Decisão sugerida: aguardar o bloco seguinte; nada a usar daqui.

---

## Checklist de cobertura
- Primeira página lida: 78
- Última página lida: 154 (último marcador do arquivo; conferido por listagem de marcadores "=== PDF PAGINA")
- Páginas sem texto útil ou ilegíveis: 81 e 82 (vazias, provavelmente página em branco/abertura), 115 (vazia), 94 (só nota de rodapé), 104, 110, 129-131, 152-153 (principalmente notas de rodapé/finais de capítulo)
- Problemas de extração observados: ligaduras "fi", "fl", "ff" e "ti" perdidas ("e ciente", "con ança", "signi ca"); algumas palavras partidas; números de página impressos ausentes (só PDF p.N); parte do código do exemplo de Cap.5 truncada no início (p.78); algumas quebras de lista desalinhadas; a nota 1 do Cap.7 aparece na p.104 e as do Cap.10 em p.130-131
- Capítulos/seções cobertos integralmente: Cap.6, Cap.7, Cap.8, Cap.9, Cap.10, Cap.11
- Capítulos/seções que continuam em outro bloco: Cap.5 (início está no bloco anterior; aqui só p.78-80), Cap.12 (começa na p.154 e continua no bloco seguinte)
