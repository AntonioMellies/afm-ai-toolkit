# Notas: Goodliffe, Como ser um Programador Melhor, bloco 06 (PDF p.386-458)

Observação geral: o bloco cobre o fim da Parte IV (cap. 33) e a Parte V "Uma meta de pessoas" (caps. 34 a 38), mais Epílogo, Sobre o autor, Colofão e anúncios de outros livros (p.445-458). Os números de página impressa não aparecem no texto extraído; só há os marcadores "PDF PAGINA N". Candidatos: (1) testing-tdd-expert; (2) systematic-debugging; (3) git-workflow-expert; (4) code-review-expert; (5) dev-practices; (6) clean-code-expert.

---

### Cap. 33 "Dessa vez, eu consigo..." (PDF p.386-392) [início do capítulo está neste bloco; fecha aqui]
Resumo: Narrativa de Jim, que passa o dia tentando corrigir sozinho um bug "nível 1" intermitente em produção, aplicando "pequenas correções" que apenas mascaram ou deslocam o problema. Julie o tira da tela, ele explica o problema em voz alta, percebe o que ignorava e resolve. O autor extrai lições sobre isolamento ("ilha deserta"), responsabilidade diante de outro programador e considerar mais de uma abordagem antes de começar.
Conceitos e regras:
- Cenário do bug: problema de integração intermitente, relacionado a tempo ou ordem de eventos entre vários módulos; testes de unidade do módulo de Jim passavam, mas o defeito estava na fronteira entre componentes (dispatcher de eventos, banco de dados, backend) [p.387-388].
- Pressão (relatórios de clientes crescendo, orgulho, ingenuidade de achar que levaria dez minutos) levou Jim a não pedir ajuda; o texto observa que a essa altura a equipe deveria ter restaurado uma versão boa conhecida para ganhar tempo de diagnóstico [p.387].
- Anti-padrão de depuração: partir de uma pré-concepção do problema e aplicar "esparadrapos" antes de detectar a falha de fato; cada correção apenas mascarava o bug ou o movia de lugar, como alisar uma bolha de ar sob papel de parede [p.388-389].
- Estar perto demais do problema: tentar tudo o que veio primeiro à cabeça sem ver o quadro geral; trabalhar à base de palpites e adrenalina quando as boas ideias acabam [p.388].
- Explicar o problema em voz alta a outra pessoa (que nem precisa falar) faz o próprio desenvolvedor perceber a peça ignorada; funciona até com um patinho de borracha (nota de rodapé cita Hunt e Thomas, The Pragmatic Programmer) [p.389-390, 393].
- Pausar, caminhar e descrever o que já foi descoberto renova o foco; Jim pediu a Julie que checasse seu progresso em dez minutos e depois revisasse a correção [p.389].
- Revisão da correção antes de disponibilizar; correção entregue no fim do dia em vez de varar a noite [p.389-390].
- Julie planeja pedir uma "pequena retrospectiva pessoal" ao fim do dia para Jim refletir sobre o ocorrido [p.389].
- Regra: nenhum desenvolvedor é uma ilha; cuidado com ficar excessivamente focado numa parte do problema [p.390].
- Mecanismos práticos para perceber que se está num "beco de codificação sem saída": definir limites de tempo curtos e prazos finais próximos, analisar o progresso ao longo do caminho, ser responsável diante de outra pessoa (programação em pares, revisão ou relato informal de progresso) [p.390].
- PONTO-CHAVE: ser responsável diante de outro programador e avaliar o progresso com ele regularmente [p.390].
- Nunca ser orgulhoso demais para pedir ajuda [p.390].
- Metáfora "Fique na base da montanha": problemas de design, decisões de codificação ou correções de bug parecem montanhas; correr direto para escalar costuma ser errado. Abordar com uma equipe, parar e planejar o caminho antes de subir, procurar rotas alternativas (pode já existir um caminho pronto). O primeiro caminho raramente é o melhor [p.390-391].
- PONTO-CHAVE: considerar mais de uma abordagem para solucionar o problema antes de começar [p.391].
- O desenvolvimento de software é mais um problema humano do que técnico; superar o instinto de resolver rápido de modo ineficiente [p.391].
- TENTE ISTO: antes da próxima tarefa de codificação, redigir um "plano de ataque" (resolver, diagnosticar, projetar, abordar) para não correr de cabeça sem consideração [p.392].
- Perguntas do autor: eficiência com a equipe, capacidade de pedir ajuda, frequência e tempo para perceber que se codifica até um beco sem saída, responsabilidade perante alguém, receio de parecer fraco ao compartilhar progresso [p.391].
- Referências cruzadas: Cap. 31 (Mais inteligente, não mais árduo), Cap. 17 (Use o seu cérebro), Cap. 35 (Ser responsável) [p.391-392].
Citações curtas de prova:
- "Jim estava perto demais do problema." [p.388]
- "Seja responsável diante de outro programador. Avalie o seu progresso junto a essa pessoa regularmente." [p.390]
- "Raramente, o seu primeiro caminho para resolver um problema será o melhor." [p.391]
O que este trecho NÃO diz: não apresenta método sistemático de depuração (reproduzir, isolar, bisseccionar, hipótese e teste); não fala de logs, debugger, bisect, testes de regressão para o bug nem de postmortem formal. Só implicitamente sugere reverter para versão boa conhecida, sem detalhar como. Não discute "testes de unidade insuficientes" como lição (apenas mostra que passavam enquanto o bug de integração existia).
Relevância para os artefatos candidatos:
- systematic-debugging: MÉDIA, postura (não mascarar sintomas, não partir de pré-concepção, explicar o problema em voz alta/rubber duck, pausa, pedir ajuda, limite de tempo, considerar mais de uma abordagem, reverter para versão boa para ganhar tempo); sem passos técnicos.
- code-review-expert: BAIXA, a correção foi revisada antes do deploy; menciona revisão como mecanismo de responsabilidade.
- dev-practices: MÉDIA, plano de ataque, timeboxes curtos, retrospectiva pessoal, pair programming/accountability, pedir ajuda sob pressão.
- testing-tdd-expert: BAIXA, apenas nota que testes unitários passavam mas havia falha de integração.
- git-workflow-expert: NENHUMA (a restauração de versão boa é só uma observação).
- clean-code-expert: NENHUMA.
Decisão sugerida: usar em systematic-debugging (seção de postura/anti-padrões: remendar sintomas, "ilha deserta", rubber duck, reverter versão boa, timebox) e em dev-practices (plano de ataque, accountability, retrospectiva pessoal).

---

### Parte V "Uma meta de pessoas" (PDF p.394) [abertura de parte]
Resumo: Texto de abertura de uma página afirmando que desenvolvimento é atividade social e que melhorar exige trabalhar e aprender bem com outras pessoas.
Conceitos e regras:
- Desenvolvimento de software raramente é solitário; um bom programador trabalha bem com os demais [p.394].
O que este trecho NÃO diz: nada técnico.
Relevância: todos NENHUMA, exceto dev-practices BAIXA.
Decisão sugerida: descartar (introdução de parte).

---

### Cap. 34 "O poder das pessoas" (PDF p.395-400)
Resumo: O ambiente e as pessoas que nos cercam moldam nosso código e nós mesmos; o autor recomenda colocar-se deliberadamente ao lado de programadores excelentes e aprender com eles, em mentoria formal ou informal. Alerta para não confundir excelência com excesso de horas.
Conceitos e regras:
- Programação é desafio social: escrever código com e para outras pessoas, trabalhar com código alheio, entrar e sair de equipes, lidar com chefe e gerência. Livros citados: The Mythical Man Month e Peopleware (notas p.400) [p.395].
- PONTO-CHAVE: colocar-se intencionalmente ao lado de excelentes programadores [p.395].
- Somos produto do ambiente: conviver com desleixados estimula trabalho desleixado; conviver com apaixonados por bom código estimula o mesmo. Benefícios: entusiasmo, motivação, responsabilidade contagiantes [p.395-396].
- Ganha-se mais que conhecimento técnico: reforço de hábitos e atitudes, desafio nas áreas mais fracas, o que nem sempre é confortável [p.396].
- Ações: fazer design de código, programar e socializar com os melhores [p.396].
- Formalizar via programa de orientação (mentorship) com tempo reservado, ou informalmente: trabalhar nos mesmos projetos, mudar de emprego, ir a conferências, palestras e grupos de usuários [p.396-397].
- O que observar nos experts: como pensam e resolvem quebra-cabeças; como planejam um caminho até os problemas; atitude quando fica difícil; como sabem se devem insistir, pausar ou tentar outra abordagem; técnicas de codificação ainda desconhecidas [p.397].
- "Conheça seus experts": não imitar quem trabalha excessivamente todas as horas; isso costuma indicar falta de capacidade (não acerta na primeira e gasta horas para fazer o código "funcionar"); gerentes frequentemente confundem isso com heroísmo. Experts fazem parecer fácil e entregam no prazo [p.397].
- Efeito colateral: trabalhar com bons programadores torna mais provável trabalhar com bom código [p.398].
- Perguntas: como identificar quem é excelente, mudar de projeto ou equipe, hora de trocar de empresa [p.398]. TENTE ISTO: listar "heróis da codificação" e planejar como trabalhar com eles, pedir mentoria [p.398].
- Referências cruzadas: Cap. 26, 35, 36, 38 [p.398].
Citações curtas de prova:
- "Coloque-se intencionalmente ao lado de excelentes programadores." [p.395]
- "Os experts fazem com que pareça fácil e concluem uma tarefa no prazo." [p.397]
O que este trecho NÃO diz: não dá critérios objetivos para reconhecer um expert (deixa como pergunta); não detalha estrutura de programa de mentoria.
Relevância:
- dev-practices: MÉDIA-BAIXA, mentoria, ambiente de equipe, crítica ao heroísmo/horas extras como sinal de baixa competência.
- code-review-expert: NENHUMA. testing-tdd-expert: NENHUMA. systematic-debugging: NENHUMA. git-workflow-expert: NENHUMA. clean-code-expert: NENHUMA.
Decisão sugerida: usar apenas em dev-practices (seção cultura/mentoria, anti-padrão "herói das horas extras"); demais descartar.

---

### Cap. 35 "Ser responsável" (PDF p.401-409)
Resumo: Usando a metáfora de correr com um amigo, o autor defende que a responsabilidade diante de outros programadores é o fator que mais melhora a qualidade do código. Propõe uma regra leve: todo código passa por dois pares de olhos antes de entrar no controle de versões, via programação em pares ou revisão informal um a um com check-ins pequenos.
Conceitos e regras:
- Sozinho, saber o que é bom (ex.: correr, código limpo) não basta; sob prazo e pressão cedemos a atalhos, remendos e correções rápidas. É preciso mecanismos no regime de desenvolvimento que nos afastem do design sem planejamento, soluções desleixadas e práticas pela metade [p.401-403].
- PONTO-CHAVE: ser responsável pela qualidade do trabalho diante de outros programadores melhora drasticamente a qualidade do código [p.403].
- Verificação a cada passo por outras pessoas, que garantam o melhor esforço e o padrão do projeto. Não deve ser burocrático, militarizado, ligado a salário; sistema leve e informal, sem formulários, sessões longas ou revisões formais, funciona melhor [p.403].
- Colocar-se na posição de ser responsável não é fraqueza; é forma de receber feedback e melhorar [p.404].
- Regra praticada na equipe do autor: todo código deve passar por dois pares de olhos antes de ir ao controle de versões; acordada entre pares (não imposta por gerente); compromisso profundo foi a chave [p.404].
- Como satisfazer: programação em pares e/ou revisão de código um a um, informal, mantendo cada check-in pequeno para o esquema ser administrável [p.404].
- Saber que alguém vai ler e comentar o código aumenta a chance de escrevê-lo bem (PONTO-CHAVE) [p.404-405]. Nota de rodapé: é um dos motivos pelos quais código aberto costuma ter mais qualidade que proprietário [p.409].
- Efeitos colaterais relatados: aprendizado mútuo, conhecimento compartilhado do sistema, mais responsabilidade pelo sistema, cooperação mais próxima, fluxo de trabalho mais agradável e produtivo [p.405].
- Definindo o padrão: perguntas a fazer sobre como a qualidade é julgada (funciona e basta; rápido e no prazo; bem escrito e fácil de manter; combinação), quem julga, quem deveria ser o árbitro, e sobre quais aspectos ser responsável (linhas de código, design, conduta e processo, modo de trabalhar com pessoas) [p.405-406].
- Próximos passos: concordar que responsabilidade é boa; encontrar alguém (de preferência acordo recíproco/equipe); implantar o esquema de dois pares de olhos para toda linha alterada, acrescentada ou removida; combinar o formato (pequenas reuniões, revisões no fim da semana, reuniões de design, pair programming, revisões de código); comprometer-se com um nível de qualidade e aceitar ser desafiado sem defensividade; esboçar padrões ou código de conduta da equipe sobre qualidade [p.406-407].
- Funciona melhor entre pares do que em relação de subordinação; requer coragem para aceitar críticas e tato para fazê-las [p.407].
- Referências cruzadas: Cap. 28, 34, 33, 15 (usar responsabilidade para que todos obedeçam as regras da equipe) [p.408]. TENTE ISTO: achar um colega para ser responsável, comprometer-se com um nível de qualidade, pedir que acompanhe seu código, tornar bidirecional [p.408].
Citações curtas de prova:
- "todo código deve passar por dois pares de olhos antes de ser inserido no sistema de controle de versões" [p.404]
- "Se você souber que outra pessoa irá ler e comentar o seu código, é mais provável que você vá escrever um código bom." [p.405]
- "mantendo cada check-in de alteração pequeno para permitir que o esquema fosse administrável" [p.404]
O que este trecho NÃO diz: não traz checklist de revisão, critérios do que olhar, métricas, tamanho máximo de commit, nem fluxo de pull request/branches; não fala de ferramentas de revisão. "Check-in pequeno" é citado apenas como facilitador da revisão.
Relevância:
- code-review-expert: ALTA (para o conteúdo do livro), fundamenta cultura de revisão: leve, informal, acordada pela equipe, mudanças pequenas, feedback com tato e sem defensividade, dois pares de olhos antes de integrar. Pouco operacional.
- git-workflow-expert: MÉDIA-BAIXA, regra "dois pares de olhos antes do controle de versões" e check-ins pequenos (princípio de integração).
- dev-practices: ALTA, accountability, definição de padrão de qualidade da equipe/código de conduta, pair programming, perguntas sobre quem julga qualidade e o que valorizar (funciona vs. rápido vs. manutenível).
- clean-code-expert: BAIXA, motivação para manter o padrão de qualidade.
- testing-tdd-expert: NENHUMA. systematic-debugging: NENHUMA.
Decisão sugerida: usar em code-review-expert (princípios/cultura: revisão leve, em pares, diffs pequenos, receber crítica sem defensividade, ser par bidirecional) e em dev-practices (acordo de qualidade da equipe e perguntas de benchmark); citar em git-workflow-expert apenas a regra de revisão antes de integrar e commits pequenos.

---

### Cap. 36 "Fale!" (PDF p.410-423)
Resumo: O capítulo defende que programar é comunicar: com máquinas, com outros humanos (inclusive o você futuro) e com ferramentas, além de comunicação interpessoal por vários canais, em equipe e com o cliente. Dá orientações sobre clareza do código, comentários, linguagem e idioms consistentes, língua natural do código, escolha do canal, vocabulário, foco, reuniões diárias breves e conversa contínua com o cliente.
Conceitos e regras:
- Código como comunicação com a máquina: deve ser claro e não ambíguo para executar como pretendido; programadores desleixados não são explícitos; saber quais nuances se perdem na tradução (compilador/JIT) [p.410-411].
- Código como comunicação com humanos (colegas, revisores, mantenedor futuro, você mesmo meses depois): claro e sem ambiguidade para permitir manutenção [p.411-412].
- Programador de alto nível busca código que comunique claramente a intenção, transparente, que exponha algoritmos sem obscurecer a lógica e permita modificação fácil; código que não se revela vira gargalo, pois a mudança é a única constante [p.412].
- Código não deve ser conciso a ponto de ilegível, nem extenso ou trabalhoso, nem cheio de comentários; mais comentários não melhoram o código e podem sair de sincronia; código comunicativo dispensa comentários extras (PONTO-CHAVE) [p.412].
- Não ser "ardilosamente inteligente" com recursos avançados da linguagem que confundam mantenedores (depende do contexto/nível da equipe) [p.412].
- Usar uma linguagem que expresse naturalmente os conceitos modelados [p.412].
- Consistência: a equipe de uma seção de código deve usar a mesma linguagem; quem introduz outra linguagem precisa de bom motivo; mas multilinguagem é legítima em projetos grandes (backend em uma, clientes em outra; REST/JSON como a "linguagem" entre as partes) [p.413].
- Dialetos dentro da mesma linguagem (convenções de formatação, idioms como C++ moderno vs. C++ como C melhorado) criam barreiras [p.413].
- Língua natural do código: em equipes multinacionais, escolha consciente de escrever tudo em inglês (variáveis, comentários, classes, funções); evita ter de traduzir comentários e adivinhar se um nome é húngaro, erro ortográfico ou abreviação [p.413-414].
- PONTO-CHAVE: comunicação do código depende da linguagem de programação, dos idioms e da língua natural subjacente [p.414].
- Código é lido muito mais vezes do que escrito: otimizar para leitura, não para escrita; usar construção concisa só se for mais fácil para o leitor; adotar convenção de layout que revele a intenção, não a que exija poucas teclas [p.414].
- Código também "fala" com ferramentas (geradores de documentação, controle de versões, rastreadores de bugs, analisadores, editores e codificação de caracteres); às vezes se adicionam diretivas ou se ajusta formatação/estilo para elas; pergunta: como isso afeta a legibilidade? [p.414].
- Canais de comunicação (face a face, telefone, conferência, VoIP, email, mensagens instantâneas, videoconferência, carta, fax): escolher o canal conforme urgência e número de pessoas; não mandar email para algo urgente, não telefonar para algo não urgente (interrompe o fluxo alheio) (PONTO-CHAVE) [p.415-416].
- Vocabulário: projetos criam dialeto (termos do domínio, idioms de design, termos de processo como histórias de usuário, épicos, sprints); usar o vocabulário certo com as pessoas certas (cliente, CEO) [p.416].
- Linguagem corporal e atenção: não desviar atenção em conversas eletrônicas; autor prefere vídeo (força o foco, torna a conversa mais aberta) [p.416-417].
- Comunicação paralela: muitos canais ao mesmo tempo causam confusão (resposta na janela errada, risco de vazar informação confidencial); comunicação eficiente exige foco [p.417-418].
- Lei de Conway mencionada: o código se molda em torno da estrutura de comunicação das equipes; boa comunicação promove bom código (PONTO-CHAVE) [p.418].
- Comunicação saudável: respeito, confiança, amizade, sem motivos ocultos nem agressividade; deve fluir livremente, ser frequente, todos serem ouvidos [p.418-419].
- Consequências de equipes que não conversam: duplicação de código e de esforço, designs conflitantes na base de código, falhas na integração [p.419].
- Cadência: reunião semanal de progresso não basta; reuniões diárias breves (scrum/stand-up) compartilham progresso, levantam problemas e obstáculos sem atribuir culpa e dão visão clara do estado do projeto; mantê-las curtas e objetivas, sem estourar duração, para não virarem distração [p.419].
- Cliente: entender o que ele quer; usar a linguagem dele (não a sua) e vários exemplos compreensíveis (ex.: demos do sistema em construção); continuar conversando para checar se mudou algo e se as pressuposições atendem às expectativas [p.419-420].
- Outras formas: documentação, especificações, blogs, artigos [p.420].
- Conclusão: comunicação eficiente é clara, frequente, respeitosa, nos níveis corretos, usa o meio correto [p.420].
- Referências cruzadas: Cap. 2 (Mantendo as aparências, código como comunicação), Cap. 31 [p.421]. TENTE ISTO: observar por uma semana todas as formas de comunicação e definir duas ações práticas de melhoria [p.421].
Citações curtas de prova:
- "Mais comentários não tornam necessariamente o seu código melhor." [p.412]
- "ele deverá estar otimizado para a leitura, e não para a escrita." [p.414]
- "Uma boa comunicação promove um bom código." [p.418]
- "Domine as diferentes formas de se comunicar. Utilize o sistema apropriado para cada conversa." [p.416]
O que este trecho NÃO diz: não dá regras concretas de nomeação, tamanho de função ou tipos de comentário aceitáveis; não define quando um comentário é útil (só critica o excesso); não trata mensagens de commit nem descrição de PR/code review; não detalha formato de stand-up (perguntas padrão); não estima nem prioriza.
Relevância:
- clean-code-expert: MÉDIA, código como comunicação com humanos, otimizar para leitura, não ser "esperto" demais, comentários não substituem clareza e desatualizam, consistência de idioms/formatação, língua natural única nos identificadores. Reforça o que já existe; sem regras novas detalhadas.
- dev-practices: MÉDIA, escolher canal certo, stand-up diário breve, conversa contínua com cliente com demos e na linguagem dele, consequências de falta de comunicação (duplicação, designs conflitantes, falhas de integração), lei de Conway.
- code-review-expert: BAIXA, "código será lido por revisores"; legibilidade como critério.
- git-workflow-expert: BAIXA, menciona controle de versões apenas como ferramenta que consome o código.
- testing-tdd-expert: NENHUMA. systematic-debugging: NENHUMA.
Decisão sugerida: usar em dev-practices (comunicação de equipe: canais, stand-up, cliente, consequências) e como reforço pontual em clean-code-expert (código para leitura, comentários, consistência de idioms e idioma dos nomes); não criar artefato próprio.

---

### Cap. 37 "Manifestos" (PDF p.424-430)
Resumo: Capítulo satírico-pragmático sobre a proliferação de manifestos de desenvolvimento. Recomenda conhecer os principais, formar opinião própria, adotar o que for sensato e não tratá-los como dogma; encerra com o "manifesto" pessoal do autor.
Conceitos e regras:
- Crítica: manifestos geram facções e disputas de exegese, politizando até princípios básicos de codificação; o "manifesto genérico" satírico zomba de manifestos vagos e dogmáticos [p.424-427].
- Manifestos citados: Agile Manifesto (2001, protesto contra processos pesados e ineficientes), Craftsmanship Manifesto (resposta à perda de importância das práticas técnicas e da responsabilidade por bom código em círculos Agile), manifesto GNU, Refactoring Manifesto, Hacker Manifesto [p.427].
- PONTO-CHAVE: conhecer metodologias, tendências, manifestos e modismos [p.427].
- Um manifesto equivale aos padrões de codificação: diretrizes úteis, ideais e orientação para boas práticas; não são "Único Caminho Verdadeiro" (PONTO-CHAVE: aderir ao que parecer sensato, sem seguir cegamente nem dogmaticamente) [p.428].
- Abordagem pragmática: aprender, compreender as visões, usar o que funciona, manter-se atualizado, avaliar de mente aberta; manifestos são úteis quando incentivam conversa e não doutrina [p.428].
- Manifesto pessoal do autor (amostra, "não gravado a ferro e fogo"): importe-se com o código; dê poder à sua equipe; mantenha a simplicidade; use o seu cérebro; nada está gravado a ferro e fogo; aprenda constantemente; procure melhorar constantemente (você, equipe, código); gere sempre valor pensando no longo prazo [p.429].
- Referências cruzadas: Cap. 24, Cap. 15; TENTE ISTO: ler os manifestos e definir o seu [p.429-430].
Citações curtas de prova:
- "Subscreva-se aos manifestos de desenvolvimento que pareçam ser sensatos. Porém não os siga cegamente" [p.428]
- "Importe-se com o código." [p.429]
O que este trecho NÃO diz: não resume o conteúdo dos manifestos citados (só os nomeia/contextualiza em uma frase cada); não oferece práticas técnicas.
Relevância:
- dev-practices: BAIXA-MÉDIA, postura anti-dogma sobre processos e práticas; lista curta de valores do autor.
- clean-code-expert: BAIXA (princípio "mantenha a simplicidade").
- Demais: NENHUMA.
Decisão sugerida: descartar na maior parte; no máximo uma linha em dev-practices ("não trate práticas/metodologias como dogma, adote o que funciona").

---

### Cap. 38 "Ode ao código" (PDF p.432-435)
Resumo: Poema humorístico sobre Geraldo, que tenta limpar o código sozinho (regra do escoteiro, refatoração) enquanto colegas continuam desleixados, e acaba preso após atitudes violentas (ficção, não recomendação). A parte em prosa dá conselhos para trabalhar em equipes com pessoas que pioram o código: promover práticas de responsabilidade sem culpar, dar o exemplo e não absorver maus hábitos.
Conceitos e regras:
- Lição do poema: limpar sozinho enquanto o resto da equipe ignora a "regra para codificação" não funciona; é preciso compromisso de todos os programadores; o foco deve ser a equipe e não só o código; a lei de Conway é citada (software resulta da equipe). A violência é apresentada como sátira com moral "pense antes de reagir" [p.432-434].
- Comentário sobre a regra dos escoteiros (deixar o código melhor do que encontrou) citada como o plano de Geraldo para corrigir bugs e arrumar ao redor; sem desenvolver a regra além do poema [p.432].
- PONTO-CHAVE: a parte complicada do desenvolvimento muitas vezes são as pessoas, não os aspectos técnicos [p.434].
- Reação a colegas que pioram o código sem perceber: introduzir práticas que promovam responsabilidade pelo código e mostrem, sem atribuir culpa, como trabalhar de forma eficiente: programação em pares, programas de mentoria, reuniões de revisão de design e similares [p.434].
- Dar o exemplo; não cair na armadilha de maus hábitos nem tomar atalhos porque todos tomam [p.434].
- PONTO-CHAVE: cercado de quem não se importa com o código, manter atitudes saudáveis e evitar absorver más práticas por osmose [p.435].
- Mudar uma cultura de codificação não é simples nem rápido, mas é possível [p.435].
- Perguntas: saúde da equipe, como reconhecer desempenho aquém, se o desleixo é proposital ou por não enxergar como melhorar, como evitar adotar práticas desleixadas [p.435]. TENTE ISTO: verificar se adquiriu algum mau hábito recente [p.435]. Referências cruzadas: Cap. 1, 28, 7 [p.435].
Citações curtas de prova:
- "Com frequência, a parte complicada do desenvolvimento de software não está nos aspectos técnicos do código; está relacionada às pessoas." [p.434]
- "Tome cuidado para não absorver práticas ruins por osmose." [p.435]
O que este trecho NÃO diz: não detalha a regra do escoteiro nem técnicas de refatoração; não traz passos para mudar cultura de equipe, nem como conduzir code review difícil.
Relevância:
- dev-practices: MÉDIA-BAIXA, como agir em equipe com baixa qualidade: práticas sem culpa, exemplo próprio, mudança cultural gradual.
- code-review-expert: BAIXA, menção a reuniões de revisão de design como prática de responsabilidade sem culpa.
- clean-code-expert: BAIXA, apenas citação da regra do escoteiro no poema.
- Demais: NENHUMA.
Decisão sugerida: usar apenas em dev-practices (cultura/equipe com qualidade desigual); descartar o poema.

---

### Epílogo (PDF p.437-441)
Resumo: Paródia de abertura de "O Guia do Mochileiro" seguida de uma conclusão: conhecimento técnico de nada vale sem a atitude certa; a atitude (analogia com os eixos de uma aeronave: ângulo de aproximação) determina se o código será bom e se será agradável trabalhar com você.
Conceitos e regras:
- Atitude (desejo e paixão por um bom trabalho) separa programadores excepcionais dos meramente adequados e supera a habilidade técnica; conhecer uma linguagem a fundo não garante código manutenível [p.439].
- Com a atitude errada se anda quilômetros na direção errada; a atitude deve ser monitorada continuamente, como um piloto faz na decolagem e no pouso [p.439-440].
- PONTO-CHAVE: a atitude determina como você progride como programador [p.440].
- Importar-se com bom código; aprender sempre (design, codificação, cooperação); trabalhar com engenheiros que desafiem; ser diligente, consciencioso e profissional; apreciar a melhoria [p.440].
- TENTE ISTO: reler o livro meses depois, responder de novo às perguntas, praticar as técnicas deliberadamente [p.440].
Citações curtas de prova:
- "A atitude supera a habilidade técnica" [p.439]
O que este trecho NÃO diz: nenhuma técnica prática.
Relevância: todos NENHUMA; dev-practices BAIXA.
Decisão sugerida: descartar (ou uma frase de abertura sobre atitude/mentalidade).

---

### Sobre o autor, Colofão (PDF p.442-443)
Páginas de metadados (biografia do autor, colofão do animal da capa). Sem conteúdo técnico. Decisão: descartar.

### Anúncios de outros livros da editora (PDF p.445-458)
Páginas de divulgação: Programação em Baixo Nível (p.445-446), Padrões para Kubernetes (p.448-449), Candlestick (p.451-452), Avaliando Empresas, Investindo em Ações (p.454-455), Manual de Análise Técnica (p.457-458). Não fazem parte do livro. Decisão: descartar.

---

## Resumo de relevância por artefato (bloco inteiro)
- systematic-debugging: MÉDIA apenas no cap. 33 (postura, não há método técnico); NENHUMA nos demais.
- testing-tdd-expert: NENHUMA (cap. 33 só observa que testes de unidade passavam enquanto havia bug de integração).
- git-workflow-expert: BAIXA (cap. 35: duas revisões antes de entrar no controle de versões; check-ins pequenos).
- code-review-expert: ALTA no cap. 35 (cultura de revisão leve, em pares, mudanças pequenas, aceitar crítica); BAIXA em 33, 36, 38.
- dev-practices: ALTA no cap. 35; MÉDIA em 33, 36; BAIXA em 34, 37, 38.
- clean-code-expert: MÉDIA no cap. 36 (código como comunicação, legibilidade, comentários, consistência); sem regras novas.

## Checklist de cobertura
- Primeira página lida: 386
- Última página lida: 458 (o arquivo tem 73 marcadores "=== PDF PAGINA", cobrindo 386 a 458)
- Páginas sem texto útil ou ilegíveis: p.399, 422, 431, 436, 444, 447, 450, 453, 456 (vazias na extração); p.393, 400, 409, 423, 441 só têm notas de rodapé.
- Problemas de extração observados: ligaduras "fi/fl/ff/ti" perdidas nas palavras (ex.: "identi car", "uxo", "e ciente", "pro ssão", "Goodli e"); isso não altera o sentido. Números impressos de página não aparecem; sem "impr. M". Inclui o marcador `<ASSUNTO_PREFERIDO>` no manifesto genérico (p.426), é do texto original. Notas de rodapé de cap. 33, 34, 35 e 36 aparecem em páginas separadas no fim de cada capítulo.
- Capítulos/seções cobertos integralmente: 33 (a partir da abertura, p.386), Parte V (abertura), 34, 35, 36, 37, 38, Epílogo, Sobre o autor, Colofão. Anúncios p.445-458 (não fazem parte do livro).
- Capítulos/seções que continuam em outro bloco: nenhum no fim do bloco (o livro termina aqui). O cap. 33 começa neste bloco (p.386) e não há indicação de continuidade do anterior; o início do bloco anterior deve terminar antes.
