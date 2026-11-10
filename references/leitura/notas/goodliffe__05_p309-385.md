# Notas: Goodliffe, "Como ser um Programador Melhor" - bloco 05 (PDF p.309-385)

Observação geral: o número impresso da página não aparece no texto extraído; só há os marcadores "PDF PAGINA N". Os números abaixo são todos de PDF. Páginas 322, 340, 384 e 385 estão em branco. Este bloco cobre os capítulos 25 a 32 e a abertura da Parte IV.

---

### Cap. 25 - Desenvolvedores orientados a testes (PDF p.309-315)
Resumo: apesar do título, o capítulo NÃO trata de testes de software nem de TDD. Usa a analogia de aprender a dirigir (exame de habilitação) para falar de competência consciente vs. inconsciente e do risco de complacência. Termina questionando se existiria um "exame de habilitação" para programadores.
Conceitos e regras:
- Com a experiência, tarefas de codificação viram instintivas (competência inconsciente, modelo de Quatro Estágios do cap. 24). [p.309]
- Perigo: o estado de competência pode levar à complacência; quem fica complacente comete erros tolos e potencialmente perigosos. Regra: codificar sempre com o cérebro totalmente engajado. [p.311-312]
- O autor observa que a maioria dos "desastres de codificação" vem de erro do programador (as falhas aparecem no programa, mas são provocadas por quem o escreveu). [p.311]
- Exame de habilitação (analogia): exige horas de prática real, reduz acidentes, dá confiança, faz o motorista considerar os outros usuários da via e conhecer os limites do equipamento. [p.312]
- Não existe equivalente direto para programadores; o autor duvida do valor de certificações (cita ironicamente certificação de scrum master). Sugere o modelo aprendiz-trabalhador-mestre. Tempo de casa não basta para virar mestre; habilidade avançada pode ser ortogonal à promoção. [p.313-314]
- É uma "experiência de raciocínio", sem conclusão prática além de: identificar quando passou de consciente para inconsciente e cuidar da desatenção. [p.314]
Citações curtas de prova:
- "Sempre codifique com o seu cérebro totalmente engajado para evitar erros tolos e potencialmente perigosos." [p.311-312] (trecho do PONTO-CHAVE; extração quebra a frase entre páginas)
- "Tempo de trabalho não é suficiente." [p.314]
O que este trecho NÃO diz: nada sobre testes unitários, TDD, cobertura ou testabilidade. O "teste" do título é o exame de habilitação, e a pergunta 6 faz só uma piada sobre testers como bonecos de crash test.
Relevância: testing-tdd-expert: NENHUMA, título enganoso; systematic-debugging: NENHUMA; git-workflow-expert: NENHUMA; code-review-expert: NENHUMA; dev-practices: BAIXA, só a ideia de vigiar a complacência; clean-code-expert: NENHUMA.
Decisão sugerida: descartar (nenhum conteúdo técnico utilizável). Cuidado para não citar este capítulo como fonte sobre TDD.

---

### Cap. 26 - Aprecie o desafio (PDF p.316-321)
Resumo: programadores motivados por desafios produzem melhor; tarefas repetitivas ("fábrica de linguiça") fazem a pessoa parar de aprender e de se importar. O autor lista riscos de perseguir só o que é divertido e propõe maneiras de buscar desafios com responsabilidade.
Conceitos e regras:
- Falta de desafio leva a deixar de prestar atenção, de aprender e de investir na qualidade do código. [p.316-317]
- Ressalvas (riscos de buscar só o interessante): é egoísmo deixar o enfadonho para os outros; mexer em sistema funcionando só pelo ajuste adiciona risco e mudança sem valor de negócio; projetos de estimação podem impedir de terminar trabalho "de verdade"; reescrever o que existe pode gerar código pior e com bugs. [p.318-319]
- Ações propostas: katas (exercício deliberado, depois descartar o código); projeto pessoal; campo amplo de interesses; reescrever algo conhecido em outra plataforma/paradigma e comparar; mudar de emprego se não é desafiado; grupos e conferências; ver o progresso revisando logs do controle de versões, diário ou lista de tarefas; fazer pausas; reinventar a roda como exercício (cuidando do uso prático). [p.319-320]
- Equilíbrio: tarefas enfadonhas do dia a dia devem ser compensadas por desafios, sendo responsável sobre usar ou descartar o código resultante. [p.319]
Citações curtas de prova:
- "Ninguém gosta de um programador estagnado. Muito menos você." [p.317]
O que este trecho NÃO diz: não dá técnica de engenharia; é conselho de carreira e motivação. Cita o log do controle de versões apenas como forma de enxergar o próprio progresso.
Relevância: testing-tdd-expert: NENHUMA; systematic-debugging: NENHUMA; git-workflow-expert: NENHUMA (só a menção de ler o log do VCS como termômetro de progresso, p.320); code-review-expert: NENHUMA; dev-practices: BAIXA, aviso de não refatorar/ajustar sistema estável sem valor de negócio (p.318); clean-code-expert: NENHUMA.
Decisão sugerida: descartar (motivação/carreira). Opcional: o aviso sobre mudanças sem valor de negócio em dev-practices.

---

### Cap. 27 - Evite a estagnação (PDF p.323-328)
Resumo: a zona de conforto leva à obsolescência. O autor pede decisão consciente e repetida de investir nas próprias habilidades e lista mudanças concretas para sair da zona de conforto.
Conceitos e regras:
- Perguntas-teste de estagnação: quando aprendeu algo novo, foi forçado além da capacidade, ficou desconfortável, descobriu algo que o encantou. [p.323]
- Preservar habilidades exige esforço e risco (até passar vexame); é decisão a tomar repetidamente. [p.324]
- Mudanças sugeridas: trocar ferramentas, linguagem, sistema operacional, editor; aprender atalhos de teclado e reduzir o uso do mouse; estudar um assunto novo (matemática, algoritmos de ordenação); projeto de estimação em código aberto; trabalhar em parte desconhecida do projeto; atividades fora da programação (idioma, blog, exercício, sono). [p.324-325]
- Segurança no emprego: avaliar se está no emprego certo; ficar tempo demais como "expert local" é confortável e perigoso. [p.326]
O que este trecho NÃO diz: nada de prática técnica de engenharia.
Relevância: todos os artefatos candidatos: NENHUMA. dev-practices: BAIXA.
Decisão sugerida: descartar (carreira/motivação).

---

### Cap. 28 - O programador ético (PDF p.329-339)
Resumo: mapeia a ética do programador em quatro frentes: código, questões legais, pessoas (colegas, gerente, empregador) e si mesmo. As regras sobre "atitude em relação ao código" e sobre relatar problemas cedo são as aproveitáveis. Fecha com um "juramento de Hipocódigo" de uma frase.
Conceitos e regras (código):
- Não escrever código propositalmente difícil de ler nem "inteligente" para se tornar indispensável; a segurança no emprego vem de talento e integridade. [p.330]
- Não "corrigir" bug com band-aid/remendo rápido que esconde o problema e deixa a porta aberta para variantes. O programador ético encontra o bug, entende-o e aplica correção apropriada, sólida e testada. [p.331]
- Exceção pragmática: perto de um prazo inegociável, uma correção rápida temporária pode ser aceitável, mas deve-se registrar uma nova tarefa para monitorar o "débito técnico" e pagá-lo logo após a entrega; o band-aid não deve contaminar o código além do necessário. [p.331]
- Trabalhar da melhor maneira possível: usar testes automatizados, programação em pares e/ou revisão de código para achar erros e melhorar designs. [p.331]
Conceitos e regras (legal):
- Honrar licenças (ex.: não usar código GPL em código proprietário quando a licença não permite); dar créditos/atribuição ao código reutilizado; não levar código do empregador anterior; não usar software pirata; não invadir sistemas (avisar administradores se o acesso for possível). [p.331-332]
Conceitos e regras (pessoas):
- Boas atitudes em relação ao código são boas atitudes em relação a outros programadores. [p.333]
- Não criar software que piore a vida de outros (vírus, malware, ilegal); dilemas (finanças, militar) ficam como questão filosófica para o leitor. [p.333-334]
- Colegas: falar bem de todos, sem fofoca; ouvir todos; ser honesto e não fingir concordar; discordância construtiva melhora decisões de design; calibrar o nível de debate de cada pessoa; não discriminar. [p.334]
- Gerente: não aceitar crédito alheio; não inflar estimativa para ficar à vontade; relatar problemas assim que perceber, sem esconder más notícias (quanto antes, mais fácil planejar); registrar bugs no sistema de rastreamento em vez de fingir que não viu; não fingir habilidade que não tem; não se comprometer com tarefa que não conseguirá terminar só por interesse; avisar cedo se uma tarefa vai demorar bem mais que o esperado. [p.335-336]
- Empregador: não vazar informação confidencial; não vender trabalho feito a outra empresa; atividade ilegal deve ser levantada ou denunciada. [p.336]
- Você: manter-se atualizado em boas práticas; não se esgotar com horas extras (programador cansado comete erros por descuido). [p.336-337]
Citações curtas de prova:
- "O programador ético assume a responsabilidade pela qualidade do produto sempre." [p.335]
- "Um programador cansado não é útil a ninguém. Não trabalhe demais." [p.337]
- "Não se torne “indispensável” escrevendo um código ilegível ou desnecessariamente “inteligente”." [p.330]
O que este trecho NÃO diz: não descreve processo de depuração, nem passos de root cause; "encontre, entenda, corrija" é uma frase, não um método. Não dá política concreta de dívida técnica, só pede para registrá-la e pagá-la logo. Os trechos sobre ACM/BSI são só citados, sem conteúdo.
Relevância: testing-tdd-expert: BAIXA, testes automatizados citados como ferramenta de qualidade (p.331); systematic-debugging: MÉDIA, princípio de não aplicar remendo que esconde o bug, entender antes de corrigir, correção testada (p.331); git-workflow-expert: NENHUMA (cita só "faz check-in", em outro capítulo); code-review-expert: BAIXA, revisão de código e pair programming citados como práticas (p.331); dev-practices: MÉDIA, relatar problemas e atrasos cedo, não inflar estimativa, registrar bugs, registrar dívida técnica de correção temporária, evitar burnout (p.331, 335-337); clean-code-expert: BAIXA, não escrever código ilegível/"esperto" para garantir emprego (p.330).
Decisão sugerida: usar em systematic-debugging (regra anti-band-aid, p.331) e dev-practices (comunicação de riscos/atrasos, dívida técnica registrada, limites de jornada). Descartar as partes legais/filosóficas.

---

### Cap. 29 - Amor pelas linguagens (PDF p.341-351)
Resumo: defende conhecer várias linguagens e paradigmas e, ao mesmo tempo, aprofundar-se em uma ou duas, usando a metáfora do casamento (amor/respeito, compromisso, comunicação, paciência, valores compartilhados). Metáfora extensa; pouca regra prática.
Conceitos e regras:
- Não ser "cavalinho de circo" de um truque só; aprender linguagens com idiomas e paradigmas diferentes (funcionais, lógicas, de especificação formal, assembly, "mortas") amplia a paleta de soluções e melhora o código. [p.341-343]
- Dificilmente se é proficiente em todas; focar em uma ou duas para não ser "pau para toda obra". [p.343-344]
- Compromisso com os idiomas da linguagem: para escrever o melhor código nela, adotar seus estilos e idioms em vez de se impor sobre ela. [p.347]
- Comunicação: o código comunica o propósito do programa a pessoas e à máquina; deve ser claro, conciso, não ambíguo e correto. Bons programadores falam, escrevem, codificam, ouvem e leem bem. [p.348]
- Paciência: dominar uma linguagem leva tempo. [p.348-349]
- Conhecer pontos fortes e fracos das ferramentas e conviver com eles, em vez de trocar de linguagem ao primeiro atrito. [p.345, 350]
Citações curtas de prova:
- "Para escrever o melhor código em uma linguagem, você deve se comprometer com seus estilos e os idioms em vez de se impor sobre ela." [p.347] (parafraseado do PONTO-CHAVE; texto original um pouco mais longo)
- "O ato da programação tem tudo a ver com comunicação." [p.348]
O que este trecho NÃO diz: não lista regras de código limpo; exemplos de C++ (templates, herança múltipla/diamante, new/delete) são só ilustração do atrito com a linguagem.
Relevância: testing-tdd-expert: NENHUMA; systematic-debugging: NENHUMA; git-workflow-expert: NENHUMA; code-review-expert: NENHUMA; dev-practices: BAIXA; clean-code-expert: BAIXA, código como comunicação e uso dos idioms da linguagem (p.347-348).
Decisão sugerida: usar em clean-code-expert apenas como reforço (seguir idioms da linguagem; código comunica intenção). Resto descartar.

---

### Cap. 30 - Postura dos programadores (PDF p.352-363)
Resumo: capítulo humorístico sobre ergonomia. Parte séria: postura sentada, pausas, vista cansada. Parte cômica: "posturas" de debugging, aflição, cochilo, "intervenção do chefe", diversão e banheiro. Figuras 30.1 a 30.8 não aparecem no texto extraído.
Conceitos e regras (parte séria):
- Olhos na altura do topo da tela, monitor a cerca de 45-60 cm, joelhos um pouco abaixo dos quadris, cotovelos a ~90 graus, teclado na altura do cotovelo, pés no chão, pulsos retos, apoio lombar. [p.353-354]
- Mudar de posição, fazer pausas e caminhar, desfocar a vista, evitar reflexos, exames de vista regulares, mesa em pé, cadeira ajustável, hidratação, horas razoáveis e sono. [p.354, 360-361]
Parte cômica:
- "A postura de debugging" (p.355-356) é uma piada: inclinar-se, apoiar a cabeça nas mãos, suspirar. NÃO contém método de depuração.
O que este trecho NÃO diz: nada sobre técnica de depuração, só humor. As demais "posturas" (cochilo, chefe, banheiro) são sátira.
Citação curta: "Você só tem um corpo: cuide dele." [p.361]
Relevância: systematic-debugging: NENHUMA (a "postura de debugging" é piada física, não mental); demais candidatos: NENHUMA.
Decisão sugerida: descartar (ergonomia/humor).

---

### Parte IV - Conseguir que tudo seja feito (abertura) (PDF p.364)
Página de abertura da Parte IV; só diz que os próximos capítulos tratam de fazer tudo ser concluído sob pressão de prazos e demandas. Sem conteúdo técnico.

---

### Cap. 31 - Mais inteligente, e não mais árduo (PDF p.365-375)
Resumo: abre com uma anedota (usar a ferramenta certa para desenhar uma seta arredondada em dez segundos, após uma hora perdida no Photoshop) e lista "táticas de batalha" para trabalhar de modo mais inteligente: reutilizar, delegar, fazer só o necessário, prototipar rápido, priorizar, uma tarefa de cada vez, manter código pequeno, não adiar tarefas difíceis, automatizar, achar erros cedo, comunicar-se, evitar burnout, escolher bem as ferramentas.
Conceitos e regras:
- Reutilize sabiamente: usar biblioteca existente em vez de escrever (e testar e depurar) o próprio código; superar a síndrome do "não inventado aqui"; criar uma fachada em torno do código alheio se for preciso integrá-lo. [p.367]
- Passar o problema a quem já sabe resolvê-lo, se isso economiza tempo. [p.367]
- Fazer somente o necessário: refatoração e testes unitários são valiosos, mas em protótipo pequeno ou código descartável podem ser adiados. [p.367-368]
- Testes: evitar a abordagem inflexível "testar todos os métodos"; exemplo dado: não testar todo getter e setter da API. Focar os testes no uso (e não nos métodos) e nos lugares onde se esperam mais problemas; "escolha suas batalhas de testes". [p.368]
- Solução rápida: diante de várias opções de design, fazer protótipo descartável em tempo limitado (estilo Pomodoro, com timer difícil de ignorar) e parar quando acabar; usar controle de versões eficiente para voltar atrás rapidamente. [p.368]
- Priorizar: fazer primeiro o mais urgente ou de maior valor; cuidado com yak shaving (tarefa simples depende de outra, que depende de outra...). Agrupar e-mails, papelada e telefonemas em horários predeterminados, com lista de pendências. [p.368-369]
- Verificar se a tarefa é realmente necessária agora; evitar a versão "Rolls-Royce"; citado princípio de Pareto (80% do benefício podem vir de 20% da implementação). [p.369]
- Uma tarefa de cada vez: trabalhar duas em paralelo faz ambas saírem mal; terminar uma e passar à próxima. [p.369-370]
- Manter código e design pequenos e simples (KISS); requisitos futuros não são previsíveis, então é melhor deixar o código maleável do que implementar todas as funcionalidades futuras no dia 1. [p.370]
- Não adiar problemas: começar cedo as tarefas difíceis (ex.: integração de código); integrar porções pequenas com frequência em vez de juntar três funcionalidades grandes após um ano. "Se for difícil, faça com mais frequência." [p.370-371]
- Testes unitários: escrever agora, junto do código (ou antes); esperar o código "funcionar" torna os testes mais difíceis e menos produtivos. [p.370-371]
- Automatizar: se for fazer mais de uma vez, crie um script; um comando para o build em vez de 15 comandos e cliques ajuda a equipe e os novatos; preferir fluxos com texto simples ou arquivos intermediários estruturados (JSON, XML) e ferramentas com interface de linha de comando. [p.371]
- Evitar erros: mostrar o produto a clientes cedo e com frequência; discutir o design com outras pessoas; fazer revisões de código em porções pequenas e compreensíveis, não grandes e densas; rodar testes unitários desde o início e com frequência. [p.372]
- Comunicar-se: fazer as perguntas certas para entender sem ambiguidade; saber conduzir reuniões produtivas. [p.372]
- Evitar burnout: deixar claro quando se vai além da obrigação, para que não se espere isso sempre; "Projetos saudáveis não exigem excessos de horas extras". [p.372]
- Ferramentas: buscar novas, mas favorecer as testadas e comprovadas, pelo conhecimento acumulado online. [p.373]
Citações curtas de prova:
- "Se você executar algo com frequência, faça o computador fazê-lo por você. Automatize usando um script." [p.371]
- "Foque seus testes no uso, e não nos métodos" [p.368]
- "Se for difícil, faça com mais frequência." [p.371]
- "Faça revisões de código em porções pequenas e compreensíveis de trabalho, e não em partes grandes e densas." [p.372]
- "Escolha suas batalhas de testes." [p.368]
O que este trecho NÃO diz: não explica TDD (red-green-refactor), nem como medir cobertura, nem convenções de commit/branch. A menção a controle de versões é uma linha ("voltar atrás rapidamente"). Não define o que é "revisão pequena" em números. Não dá regra de quando testar getters; só dá o exemplo de que não faz sentido testar todos.
Relevância: testing-tdd-expert: MÉDIA, testar o uso e não cada método, focar onde há risco, escrever testes cedo junto com o código ou antes, rodar com frequência, exceção para protótipos (p.368, 370-372); systematic-debugging: BAIXA, achar erros cedo (p.372); git-workflow-expert: BAIXA, integração frequente em pequenas porções (p.370) e VCS eficiente para reverter experimentos (p.368); code-review-expert: MÉDIA, revisar porções pequenas e compreensíveis, discutir o design cedo (p.372); dev-practices: ALTA, priorizar, yak shaving, uma tarefa por vez, só o necessário/Pareto, protótipo com timebox, automação, reutilização/NIH, evitar burnout (p.367-373); clean-code-expert: BAIXA, KISS e código pequeno (p.370).
Decisão sugerida: usar em dev-practices (núcleo: priorização, timebox de spikes, yak shaving, automação, reutilizar, só o necessário); em testing-tdd-expert (foco do teste no uso/risco, escrever cedo, exceção para protótipo); em code-review-expert (revisões pequenas); em git-workflow-expert (integração frequente em pequenas porções, como justificativa).

---

### Cap. 32 - Estará pronto quando estiver pronto (PDF p.376-383)
Resumo: todo programador deve saber o que significa "pronto" e quão perto está dele; sem isso, trabalha demais, deixa tarefas incompletas, poleia o que não importa e faz hora extra. A solução do autor é decompor a tarefa em partes pequenas e definir critérios de "pronto" claros, visíveis e atingíveis, usando testes escritos em código como definição.
Conceitos e regras:
- Consequências de não saber quando terminar: fazer mais trabalho do que o necessário; deixar tarefas realmente incompletas (voltar depois para descobrir o que falta, mais lento e difícil); polir partes erradas; horas extras e falta de sono. [p.377-378]
- Decomposição: dividir tarefas grandes em tarefas menores e bem compreendidas para medir o progresso com mais precisão; se for preciso detalhar várias vezes, é sinal de tarefa com granularidade alta demais; se a decomposição não for feita antes para estimar, será feita depois de forma menos focada. Saber sempre qual é a menor unidade em que se está trabalhando. [p.378-379]
- Definir "pronto": saber o que é "sucesso" antes de começar; "se você não puder dizer quando uma tarefa estará pronta, não a comece"; se ainda não se sabe, a primeira tarefa é determinar o critério (muitas vezes definido pelo dono do produto, designer, cliente ou usuário final). Trabalho pela metade volta como bugs, retrabalho ou produto instável. [p.379-380]
- Critérios de "pronto" devem ser: Claros (específicos, sem ambiguidade, listando funcionalidades, APIs, falhas a corrigir; atualizar se surgirem novos fatos; ligar a requisitos ou histórias de usuário e documentar a ligação); Visíveis (todas as partes interessadas conhecem e concordam, inclusive gerente, clientes, equipes seguintes e testadores); Atingíveis (meta inalcançável, como 100% de cobertura em ambiente com poucos testes, é inútil). [p.380-381]
- O que considerar: quantidade de código a completar (em funcionalidades, APIs ou histórias); quanto do design está pronto; se algum documento/relatório é necessário. [p.381]
- Em tarefas de codificação, usar um conjunto de testes não ambíguo para mostrar quando todo o código necessário foi implementado ("use testes escritos no código para definir quando ele está completo e funcionando"). [p.381]
- Outras perguntas: onde o código será disponibilizado (ex.: controle de versões); onde será implantado (ativo em servidor ou entregue para a equipe de implantação); aspectos econômicos de "pronto" (ex.: escalar para 10 mil usuários simultâneos, não apenas 10); como sinalizar que está pronto e quem assina embaixo (check-in, relatório do projeto, fatura). [p.381-382]
- "Simplesmente faça": trabalhar até "pronto" e parar; parar quando o código for bom o suficiente (não necessariamente perfeito); não polir ainda código que talvez seja refatorado no futuro; aviso: não é desculpa para escrever código ruim. Ter um único objetivo específico ajuda o foco. [p.382]
Citações curtas de prova:
- "Se você não puder dizer quando uma tarefa estará pronta, não a comece." [p.380]
- "Use testes escritos no código para definir quando ele está completo e funcionando." [p.381]
- "Não trabalhe mais do que o necessário. Trabalhe até estar “pronto”. Então pare." [p.382]
- "Divida tarefas grandes em uma série de tarefas menores e bem compreendidas." [p.379]
O que este trecho NÃO diz: não apresenta checklist formal de Definition of Done nem lista de itens padrão (build verde, review, docs). As perguntas sobre local de entrega/implantação são prompts de reflexão, não regras fixas. Não ensina técnicas de estimativa; as perguntas finais sobre precisão de estimativas ficam em aberto. Não explica como escrever os testes de aceitação.
Relevância: testing-tdd-expert: MÉDIA, testes escritos como definição executável de "pronto" (p.381), 100% de cobertura não realista como meta (p.381); systematic-debugging: NENHUMA; git-workflow-expert: BAIXA, "onde o código será disponibilizado (VCS)" e check-in como sinal de pronto (p.381-382); code-review-expert: BAIXA, "quem assina embaixo", testadores/QA como partes do acordo de pronto (p.380-382); dev-practices: ALTA, definição de "pronto" (claro/visível/atingível), decomposição de tarefas, consequências de não definir, parar no "bom o suficiente" (p.377-382); clean-code-expert: NENHUMA (só o aviso de não escrever código ruim, p.382).
Decisão sugerida: usar em dev-practices (núcleo da seção "definição de pronto" e decomposição de tarefas); em testing-tdd-expert (testes como critério de pronto, meta de cobertura atingível).

---

## Checklist de cobertura
- Primeira página lida: 309
- Última página lida: 385 (marcador final; páginas 384 e 385 vazias)
- Páginas sem texto útil ou ilegíveis: 322, 328 (só notas de rodapé do cap. 27), 340, 363 (só nota de rodapé), 375 (só notas de rodapé), 384, 385; figuras 30.1 a 30.8 do cap. 30 ausentes do texto
- Problemas de extração observados: ligaduras perdidas (ex.: "fi", "fl", "ffi" somem: "codi cação", "e ciente", "de nição", "uxo"); letras faltando nas palavras com ligadura; número impresso da página não aparece; PONTO-CHAVE e citações podem estar divididos entre páginas. Citações acima foram restauradas das ligaduras.
- Capítulos/seções cobertos integralmente: 25, 26, 27, 28, 29, 30, abertura da Parte IV, 31, 32
- Capítulos/seções que continuam em outro bloco: nenhum (o cap. 32 termina em PDF p.383; o próximo capítulo, 33, começará no bloco seguinte)

## Resumo de relevância (para o orquestrador)
- ALTA: cap. 31 e cap. 32 para dev-practices.
- MÉDIA: cap. 31 e 32 para testing-tdd-expert; cap. 31 para code-review-expert; cap. 28 para systematic-debugging e dev-practices.
- Cap. 25 ("Desenvolvedores orientados a testes") NÃO é sobre testes de software: descartar.
- Cap. 30 ("postura de debugging") é piada de ergonomia: sem conteúdo de depuração.
- Nenhum capítulo do bloco traz conteúdo substantivo de git-workflow-expert.
