# Notas: Goodliffe, Como ser um Programador Melhor, bloco 04 (PDF p.232-308)

Observações gerais: o número impresso da página não aparece no texto extraído (impr. n/d). Todas as páginas são "PDF PAGINA N" do marcador. Os "PONTO-CHAVE" do livro aparecem como caixas; registrei-os como regras. Candidatos: (1) testing-tdd-expert; (2) systematic-debugging; (3) git-workflow-expert; (4) code-review-expert; (5) dev-practices; (6) clean-code-expert.

---

### [Capítulo sobre reutilização de código; título e início estão no bloco anterior] (PDF p.232-234) [continua do bloco anterior]
Resumo: o bloco pega o fim do capítulo, que trata de quatro "casos de reutilização". Aqui aparecem o fim do caso 1 (copiar código da Web), o caso 2 (projetar para reutilizar), o caso 3 (promover e refatorar) e o caso 4 (comprar/usar bibliotecas). A tese central é: não generalize antes da hora, compartilhe só quando houver segundo cliente real.
Conceitos e regras:
- Caso 1 (truncado, só a última pergunta e o ponto-chave): não copiar código achado na Web para o projeto sem inspecioná-lo com cuidado antes; a lista de perguntas de inspeção começa no bloco anterior (resta "Com que abrangência você o testou?") [p.232]
- Caso 2, projetar visando à reutilização: um biblioteca feita para ser usada em vários projetos é "usar" código, não "reutilizar"; projetar tudo para múltiplos usos desde o início gera software inchado, com APIs complexas que tentam atender todos os casos [p.232]
- Aplicar YAGNI (não implemente o que ainda não vai precisar): implementar o código mais simples que atenda os requisitos de agora, com a menor API apropriada; estender quando o segundo consumidor surgir [p.232]
- Consequência apontada: produzir o mínimo reduz risco de bugs e de APIs desnecessárias que terão de ser mantidas por anos; o segundo "uso" planejado frequentemente nunca vem, ou traz requisitos surpreendentemente diferentes [p.232]
- Caso 3, promover e refatorar: escrever seções pequenas, modulares e limpas; ao perceber que o código será usado em mais de um lugar, refatorar para uma biblioteca/arquivo compartilhado, movendo o código e estendendo a API o mínimo para o segundo usuário [p.233]
- Motivos para manter a mudança mínima nessa fase: o código existente funciona ("e você tem os testes para provar?"), toda alteração gratuita o afasta desse estado; um terceiro cliente pode chegar com requisitos levemente diferentes e forçar nova mudança da API [p.233]
- Caso 4, comprar ou reinventar a roda: avaliar economicamente construir, usar open source (se a licença permitir) ou comprar solução com suporte; comparar custos, qualidade provável, facilidade de integração e manutenção; desenvolvedores tendem a escrever tudo por exercício intelectual e desconfiança do desconhecido [p.233-234]
- Perguntas e "Tente isto": medir duplicação na base (copiar/colar entre funções); decidir quando duas seções diferem o bastante para não serem duplicação; sanitizar código copiado (nomes, layout, testes); comentar a fonte do código copiado; eliminar generalidade desnecessária mantendo só a interface essencial [p.234]
- Ligações citadas: Mantenha a simplicidade (cap. 16), Chafurdando na lama (cap. 7), Percorrendo um caminho (cap. 6): duplicação dificulta navegar a base [p.234]
Citações curtas de prova:
- "Não copie códigos encontrados na Web em seu projeto sem inspecioná-lo cuidadosamente antes." [p.232]
- "se você não vai precisar de algo (ainda), não implemente (ainda)." [p.232]
- "O código deve ser “compartilhado” porque será útil a vários clientes" [p.233] (continua: não porque queiram uma biblioteca elegante)
O que este trecho NÃO diz: não dá critério numérico para "duplicação aceitável" (é só pergunta); não detalha o caso 1 (começa no bloco anterior); não fala de regra dos três nem de "regra de ouro" de duplicação além de YAGNI e refatorar no segundo uso.
Relevância para os artefatos candidatos:
- clean-code-expert: MÉDIA, YAGNI, evitar generalização prematura, refatorar duplicação no segundo uso com mudança mínima.
- dev-practices: MÉDIA, decisão build vs buy (custo, qualidade, licença, manutenção).
- testing-tdd-expert: BAIXA, só a menção de que os testes dão segurança para refatorar o código existente.
- systematic-debugging, git-workflow-expert, code-review-expert: NENHUMA (code-review: BAIXA, "inspecionar código copiado" como item de revisão).
Decisão sugerida: usar em clean-code-expert (referência sobre duplicação/YAGNI/reuso, uma seção curta) e em dev-practices (build vs buy). Completar com o bloco anterior antes de citar o caso 1.

---

### Capítulo 20: Controle eficiente de versões (PDF p.237-251)
Resumo: defende o uso obrigatório de um sistema de controle de versões (SCV) desde o início de qualquer projeto, descreve o que armazenar (tudo que recria o software, o mínimo possível), o layout do repositório e práticas de uso: commits atômicos e frequentes, boas mensagens, commits bem compostos, uso de branches e feature toggles.
Conceitos e regras:
- Vantagens de um bom SCV [p.237-238]: ponto central de cooperação; define o "estado da arte" (outras ferramentas como CI, sistemas de release e auditoria se ligam a ele); histórico/"máquina do tempo" com quem mudou o quê e por quê; backup centralizado; rede de proteção para experimentar e restaurar; ritmo de trabalho (faz, testa, check-in); linhas de desenvolvimento concorrentes; reversão de qualquer mudança.
- Regra de ouro: usar SCV desde o início de qualquer projeto, "sem mas nem porém"; até protótipos devem ter repositório próprio (ex. git init é rápido) [p.238]
- Regra de prata: usar bem o SCV, entendendo o funcionamento e as melhores práticas [p.244]
- História de guerra: equipe que trocava código por email semanal, sem backup, com conflitos resolvidos "por palpite" e perda catastrófica de fontes; consequência: código perdido várias vezes [p.239]
- Escolha da ferramenta: citada a evolução rcs, CVS, Subversion, Git/Mercurial; centralizado exige acesso ao servidor para operações não triviais, distribuído (peer-to-peer) permite fluxos melhores e trabalhar offline; recomenda sistema moderno, com suporte e convencional; Git tem curva de aprendizado mais acentuada [p.240]
- O que armazenar, resposta 1 (tudo que recria o software): código-fonte, documentação, arquivos de build (makefiles, config de IDE, scripts), arquivos de configuração, recursos (imagens, sons, mídia), arquivos de terceiros (bibliotecas, DLLs). Um checkout em máquina de build bem configurada deve dar uma árvore pronta para build [p.241]
- O que armazenar, resposta 2 (mínimo possível) [p.242-243]: não guardar config de IDE nem arquivos de cache (headers pré-compilados, ctags, preferências de usuário); não guardar artefatos gerados (objetos, bibliotecas, binários de build, nem fontes autogerados; exceção cuidadosa se forem muito difíceis/demorados de gerar); não guardar itens fora do projeto (instaladores de ferramentas, imagem de SO); não guardar relatórios de teste/bug (vão para o sistema de bugs); emails "interessantes" viram documentação estruturada; não guardar config pessoal (esquema de cores, visões da IDE, caminhos dos arquivos de build na sua máquina); não manter coisas "que talvez precise um dia" pois o histórico preserva o que for apagado.
- Nota de rodapé: nenhum sistema de build deve depender de locais fixos do computador; é design ruim [p.251, nota 3]
- Versões liberadas: algumas empresas guardam todas as releases num repositório separado (binários não devem ficar junto dos fontes); considerar arquivá-las numa estrutura estática de diretórios em servidor de arquivos, pois o SCV traz pouca vantagem para estruturas pouco dinâmicas [p.243]
- Layout do repositório [p.243-244]: estrutura de diretórios clara que revele o formato do código; README de nível superior; evitar duplicação de arquivos "a todo custo" (gera bugs como no código); código de terceiros separado em subdiretórios claramente identificados; configurar o repositório para ignorar arquivos inadequados (padrões de ignore) para evitar check-in acidental de config pessoal e derivados.
- Commits atômicos [p.244-245]: commits pequenos e frequentes; não acumular trabalho de uma semana, nem de um dia. Consequências do acúmulo: mais difícil rastrear mudanças (maiores, menos granulares); o resto do repositório pode ter mudado muito e o novo trabalho pode deixar de ser válido; mais conflitos de merge. Um commit atômico é coeso e coerente (uma mudança relacionada como um passo); se a mensagem diria "refatorando a estrutura interna e deixando o botão verde", são duas tarefas, então dois commits; não mudar layout do código e funcionalidade no mesmo commit; cada commit é um passo completo, sem trabalho pela metade.
- Mensagens de commit [p.245-246]: começar com resumo breve do que mudou, de preferência uma frase clara; depois, os motivos se importar a alguém; incluir número do bug ou outras referências; ser claro, sucinto, sem ambiguidade; aplicar DRY: não listar arquivos alterados (o SCV já registra); a primeira frase resume a mudança para permitir busca no histórico. O autor lista exemplos reais bons e ruins (mensagem vazia, "um desvio foi corrigido", desabafos), pedindo ao leitor que os julgue; ele não dá o gabarito [p.245-246].
- Compor bons commits [p.246]: não quebrar o build, testar contra a versão mais recente do repositório antes do check-in; ordem sempre: fazer alteração, verificar que o build compila contra a versão mais recente, verificar que o build funciona, check-in ("Nessa ordem. Sempre."), mesmo com pressa para pegar o ônibus; não apagar/remover arquivo sem saber que ninguém o usa (importante em projetos multiplataforma com vários builds); não deixar editores brigarem por caracteres de fim de linha.
- Branches [p.246-248]: permitem bifurcar o trabalho sem interferência e mesclar depois; usos: trabalho pessoal/experimentos arriscados, cooperação de equipe (áreas de integração/teste) e gerenciamento de releases. Casos sugeridos: encapsular revisões (uma funcionalidade por branch); desenvolvimento exploratório (vários branches para variantes, mesclar o melhor); mudanças grandes e demoradas que exigem muito QA e muitos check-ins (para não deixar os outros parados com árvore quebrada); correções individuais de bug (branch, testar, mesclar); separar desenvolvimento volátil de linhas estáveis de release (branches de release, cap. 23). Recomendação: "não tenha medo deles"; não poluir a linha principal com distrações que podem ser isoladas.
- Ressalva sobre branches [p.248]: nem sempre são a melhor técnica para concorrência; às vezes é melhor evitar esforços concorrentes quase invisíveis (com overhead de integração periódica) e preferir feature toggle na linha principal (rodapé: arquivo de configuração ou flags de pré-processador que habilitam/desabilitam funcionalidades) [p.248, p.251 nota 4].
- Código "habita" o SCV: com a maturidade, scripts de build/release se integram ao repositório e convenções são moldadas pela ferramenta; migrar entre SCVs é possível, mas confuso e com perdas, por isso escolher bem no início [p.248-249]
- Conclusão/uso amplo: SCV serve também para documentos (o próprio livro foi escrito em AsciiDoc no Git), para protótipos e para configurações pessoais do diretório home [p.249]
- Perguntas relevantes: GUI vs linha de comando; problemas de SCV distribuído vs centralizado; SCV dispensa backup do computador?; feature toggle vs branches concorrentes (qual tem menos overhead); ao perceber duas tarefas num só conjunto de mudanças, parar e separar ou commitar? [p.249-250] (o texto não dá respostas)
- Veja também: Melhore o código removendo-o (cap. 4: SCV permite apagar código com confiança), Por favor, libere a versão (cap. 23), O curioso caso do código congelado (cap. 22), Percorrendo um caminho (cap. 6: histórico do repositório ajuda a navegar e avaliar qualidade) [p.250-251]
- "Tente isto": avaliar se os próprios commits são frequentes, atômicos, pequenos e coerentes [p.251]
Citações curtas de prova:
- "use-o. Desde o início de qualquer projeto, empregue um sistema de controle de versões. Sem mas nem porém." [p.238]
- "Faça check-ins pequenos e frequentes de suas alterações." [p.244]
- "Não faça um check-in que abranja mais de uma alteração." [p.245]
- "fazer uma alteração, verificar se o build pode ser feito em relação à versão mais recente do repositório" (parafraseei a ordem; trecho literal parcial) [p.246]
- "Armazene o mínimo possível" (título da resposta dois) [p.241]
O que este trecho NÃO diz: não prescreve um modelo de branching nomeado (Git Flow, trunk-based); não menciona rebase, squash, pull request, revisão de código, convenção formal de mensagens (tipo "feat:/fix:"), nem tamanho máximo da primeira linha; não dá gabarito dos exemplos de mensagem; não trata assinatura, hooks nem proteção de branch; feature toggle é só citado, sem práticas.
Relevância para os artefatos candidatos:
- git-workflow-expert: ALTA, é o capítulo-fonte: commits atômicos, mensagens, o que versionar/ignorar, layout do repo, branches e feature toggle, ordem pré-check-in.
- dev-practices: MÉDIA, SCV como espinha dorsal, ritmo "faz, testa, check-in", disciplina de não quebrar o build.
- code-review-expert: BAIXA, commits pequenos e coesos facilitam verificação ("mais fácil verificar se estão corretos"); mensagem como contexto.
- testing-tdd-expert: BAIXA, "testar contra a versão mais recente antes do check-in".
- clean-code-expert: BAIXA, DRY aplicado a mensagens e a arquivos duplicados; separar refatoração de funcionalidade (também reforça git-workflow).
- systematic-debugging: BAIXA, histórico do SCV como "arqueologia" para achar quais mudanças compõem uma funcionalidade; reversão.
Decisão sugerida: usar em git-workflow-expert (principal, com tabela do que versionar/ignorar, regras de commit/mensagem/branch como references) e referenciar em dev-practices e code-review-expert (commits pequenos).

---

### Capítulo 21: Marcando um gol (relação desenvolvimento x QA) (PDF p.252-267)
Resumo: argumenta que dev e QA são aliados, não rivais, e que o desenvolvimento não é um encanamento linear. Dá práticas para entregar builds ao QA com respeito, para receber relatórios de falha sem ofensa e para integrar QA cedo, ao ponto de a qualidade ser de todos.
Conceitos e regras:
- Papel do QA [p.253-254]: garantir que o software atenda à especificação, funcione em todas as plataformas/configurações suportadas e que não haja regressão no build; QA deve participar da especificação, do design/construção (para testabilidade), dos testes e do release final (garantir que o testado é o que foi liberado).
- Modelo "encanamento" (cascata) é errado como visão linear; reforça atrito, enquanto devemos manter comunicação constante em vez de "despejar" software no fim [p.254-255]
- Falsa dicotomia [p.255-257]: separação artificial (gerentes distintos, locais distintos, recrutamento/rotatividade e incentivos diferentes, ex. bônus só para dev que conclui rápido) gera rivalidade; estereótipo "dev cria, QA quebra"; QA não acha bugs para atrapalhar, mas para melhorar o produto; "Estamos todos do mesmo lado".
- Lei de Conway e saúde das equipes: interações pouco saudáveis resultam em código pouco saudável; vale também para equipes entrelaçadas em geral [p.257]
- Testes unitários não bastam: o código pode corresponder à intenção do desenvolvedor sem refletir o que o software deveria fazer; testes cobrem entradas previstas, e nem todos os casos de uso/abuso foram previstos; QA é bom em pensar neles; testes unitários servem como prova responsável de que o código é bom o bastante antes de entregar ao QA [p.258-259]
- Entregar build ao QA [p.259-262]: processo harmonioso de build e entrega; tratar como ato cuidadoso, não jogar código desleixado "por cima da cerca"; não maquiar sintomas de bugs óbvios esperando que o QA não perceba a causa; não é batalha. Diretrizes:
  - Testar o trabalho antes: suíte de testes unitários regular detecta regressões e evita erros tolos; mesmo com testes, testar a nova funcionalidade e pensar em modos de falha/uso indevido, não só o caso simples; a suíte é só tão boa quanto sua qualidade e os devs são responsáveis por ela; ao QA reportar falha, adicionar testes unitários que demonstrem o problema para que não reapareça [p.260]
  - Ter propósito ao liberar: dizer como se espera que a versão funcione; descrever o que foi/não foi implementado, o que se sabe que funciona ou não; nas release notes, junto do build de forma não ambígua; versão/build com número único e notas com o mesmo número; indicar o que mudou e quais áreas exigem mais testes [p.260-261]
  - "Mais pressa, menos velocidade": nunca apressar um build (atalhos, conferências puladas); se sente como estudante entregando lição às pressas, pare e pense; disparar execução cara de testes multiplataforma só quando um conjunto combinado de funcionalidades/correções estiver pronto [p.261-262]
  - Automatizar: um único script que faz checkout, build, testes unitários, instaladores/implantação em servidor de testes e atualiza o build com as release notes; elimina erro humano e regressões [p.262]
  - Respeitar: entregar algo estável e liberável, não o último build não testado [p.262]
- Ao receber relatório de falha [p.262-264]: "Os testes só revelam problemas que os devs adicionaram" (a falha é sua); QA deve fornecer relatórios precisos e confiáveis num sistema estruturado (tracker, planilha ou backlog), desde que haja um sistema claro de registro de mudança de estado; não levar para o lado pessoal; resposta profissional é "obrigado, vou dar uma olhada"; ficar feliz de ter sido o QA e não o cliente; preocupar-se se há tantos relatórios que não se sabe por onde começar (sinal de problema básico); não mergulhar em cada falha de imediato, a menos que trivial: priorizar com gerentes, especialistas de produto e clientes; se o relatório for ambíguo, trabalhar com o autor para entender, reproduzir de forma confiável e saber quando está resolvido; assumir responsabilidade pelo produto inteiro, mesmo por bugs de decisões de design alheias ou de código de outros.
- Diferenças entre testadores e devs [p.264-265]: testadores têm mentalidade e habilidades próprias; pensam mais como usuário e dão feedback sobre qualidade percebida; devs focam no "caminho feliz" (entradas válidas, recursos sobrando, chamadas de sistema funcionando) e ignoram classes de entradas inválidas; não achar que QA é composto de "desenvolvedores fracassados".
- Peças do quebra-cabeça [p.265-266]: não ver testes como a "última atividade" da cascata (após 90% pode haver mais 90% de esforço, e o tempo de teste é imprevisível se começar tarde); envolver QA cedo para que as especificações sejam testáveis e o software o mais testável possível antes da primeira linha de código; a qualidade é responsabilidade de todos, não só do QA.
- Perguntas [p.266]: proximidade com QA, maior impedimento à qualidade, saúde do release, quem é "culpado", habilidades de teste e metodologia antes de check-in, falhas tolas recentes, o que adicionar além de testes unitários.
- Veja também: É hora de testar (cap. 11: testes automatizados unitários, integração, sistema), O poder das pessoas (cap. 34), Por favor, libere a versão (cap. 23) [p.267]
Citações curtas de prova:
- "Os testes somente irão revelar problemas que os desenvolvedores de software adicionaram ao sistema" [p.262]
- "Não leve os relatórios de falha para o lado pessoal. Eles não são um insulto pessoal!" [p.263]
- "Jamais apresse a criação de um build. Você cometerá erros." [p.261]
- "A equipe de QA não é a única dona nem a guardiã da “qualidade”. A responsabilidade é de todos." [p.266]
- "Tome cuidado para não promover uma separação artificial entre os esforços de desenvolvimento e de testes." [p.256]
O que este trecho NÃO diz: não ensina técnicas de teste (partição, valores-limite, exploratório), nem TDD, nem como escrever bom relatório de bug (apenas que o QA deve ser preciso e confiável); não define critérios de pronto; não fornece template de release notes além dos itens listados.
Relevância para os artefatos candidatos:
- testing-tdd-expert: MÉDIA, limites dos testes unitários (só cobrem o que o dev previu), adicionar teste de regressão para cada bug reportado, testar antes de entregar e pensar em casos de abuso; sem técnica de TDD em si.
- dev-practices: ALTA, relação dev x QA, notas de release, build automatizado, não apressar, priorização de bugs com stakeholders, responsabilidade coletiva pela qualidade, testes cedo para especificação testável.
- systematic-debugging: BAIXA, postura diante de relatório de bug (reproduzir de forma confiável, saber quando está resolvido, não maquiar sintomas); sem método de depuração.
- code-review-expert: BAIXA, sem relação direta (apenas "testar o trabalho antes de passar adiante").
- git-workflow-expert: BAIXA, build numerado/release notes ligados ao release (ver cap. 23).
- clean-code-expert: NENHUMA.
Decisão sugerida: usar em dev-practices (entrega ao QA, notas de release, atitude ao receber bug report, qualidade coletiva) e, pontualmente, em testing-tdd-expert (limite dos testes unitários, teste de regressão por bug, caminho feliz); em systematic-debugging só a postura de reprodução confiável.

---

### Capítulo 22: O curioso caso do código congelado (PDF p.269-280)
Resumo: critica o termo "congelamento de código" por ser metáfora enganosa, pois o código nunca fica imutável. Reinterpreta-o como desaceleração disciplinada das mudanças rumo ao release, distingue três formas de "congelamento", explica o papel do branch de release e oferece formas de evitar o congelamento com entrega contínua.
Conceitos e regras:
- Definição: período entre um ponto de "término" e a data de release (RTM); "término" varia (funcionalidades completas mas não testadas, primeiro alfa/beta, candidato a release) [p.269-270]. Nesse período se faz regressão final exaustiva; "congelado" é figurativo: se algo for descoberto, precisa ser corrigido [p.270-271]
- Nova regra de jogo [p.271-272]: mudanças não são aplicadas às cegas; mesmo as que valem a pena exigem consenso criterioso e revisão cuidadosa; só entram mudanças estritamente necessárias; só problemas "show-stopper" (impedem o release) são tratados; problemas de baixa prioridade vão para a fila da próxima versão, pesando riscos; nenhum trabalho em novas funcionalidades e nenhum bug "corrigido" sem acordo prévio, porque até o conserto mais simples pode ter efeitos colaterais inesperados. É "desaceleração bem intencional", redução consciente da taxa de mudança.
- Opinião do autor: criar instalador/artefatos finais (arte, textos) durante o congelamento está errado; ao entrar em congelamento, tudo deveria estar pronto para o teste final [p.272]
- Três formas [p.272-273]: congelamento de funcionalidade (só commits de correção de bug; evita "deslizamento de funcionalidade" perto do prazo); congelamento do código (só problemas que realmente façam o show parar; o autor diz que precisa de nome melhor); congelamento "hard" (nenhuma alteração; equivale a trazer desfibriladores, na prática só quando o software já foi lançado).
- Branches [p.273-274]: ao declarar o congelamento criar um branch de release, deixando a linha principal livre. Boa prática: nenhum trabalho de código direto no branch de release; manter estável, sem mudanças especulativas; o trabalho é feito em branch mais flexível (p. ex. linha principal), cada correção é testada e conferida lá, e só então mesclada ao branch de release; o código flui em direção a pontos de estabilidade ("promovemos" conjuntos de mudanças segundo a qualidade comprovada). Mudanças no branch congelado recebem tratamento rigoroso: revisadas cuidadosamente, teste focado, análise de risco (diferenças bem compreendidas, riscos atenuados) e priorização (adequação à versão). Sem branch de release, todos os devs teriam de parar; trabalhar em paralelo é arriscado e pode gerar metas conflitantes, por isso evitar concorrência quando possível.
- Falso sentimento de confiança: o termo é dito a gerentes para dar impressão de estabilidade; manter avaliação realista do estado do projeto; não manter rigidez quando mudanças são necessárias [p.274-275]
- Duração [p.275]: depende da complexidade, exigências de teste (pessoas e recursos, plataforma separada), escopo das mudanças (influencia o teste de regressão) e recursos disponíveis; "um período típico dura duas semanas"; cuidado com Pareto (últimos 20% se expandem para 80% do tempo): só declarar congelamento quando tudo estiver concluído, não quando faltarem "algumas coisinhas".
- Expectativas [p.275-276]: espere encontrar bugs que não poderá corrigir porque não valem o risco; é comum (e não errado) lançar software que se sabe poder ser melhor; espere acumular dívida técnica durante o congelamento (remendos "papel sobre fissuras"), tratá-la como dívida e planejar pagá-la nos ciclos seguintes ao release; se uma mudança tiver implicações sérias, considere descongelar, adiar o release e reiniciar o congelamento e o ciclo de testes, sem exagerar nisso; congelamento longo indica base de código não estável o bastante [p.276].
- Fim [p.276-277]: no RTM a linha está realmente congelada: fechar e arquivar o branch de release; mudanças vão para outra linha de código; este é o único congelamento verdadeiro.
- Anticongelamento [p.277-278]: evitar o congelamento com entrega contínua (todo build em estado implantável), boa estrutura de testes automatizados com cobertura (código, integração, aspectos voltados ao usuário), bons critérios de aceitação (cita Cucumber), reduzir o período de testes reduzindo escopo/tamanho do projeto, e um fluxo de release simples e confiável sem intervenção humana. Releases semanais/diárias são possíveis, exigindo mais disciplina de codificação sempre, e não só no congelamento. Facilita para web services/entrega online (correção online antes de muitos usuários notarem), mas não é desculpa para soltar código sem testes.
- Perguntas [p.279]: se há congelamento formal e com que rigor; como garantir que mudanças no congelamento são seguras; qualidade do build é de uma pessoa ou da equipe; como reduzir o tempo até atingir o ponto de congelamento.
- Veja também: caps. 23 e 20 (branch de release no SCV) [p.279]. Rodapé: dívida técnica (Fowler) [p.280]
Citações curtas de prova:
- "“Congelamento de código” é um termo que pode confundir. O código jamais permanece imutável, mesmo que você queira." [p.271]
- "Crie um branch ou você terá problemas." [p.274]
- "Durante o congelamento de código, você contrairá débitos técnicos." [p.276]
- "Tenha como meta ter um código que jamais seja “congelado”" [p.278]
- "Um período típico de congelamento dura duas semanas." [p.275]
O que este trecho NÃO diz: não detalha como fazer cherry-pick/merge nem como nomear branches; não define severidade/prioridade de bugs além de "show-stopper"; não dá números de cobertura de testes nem métricas de entrega contínua; o "duas semanas" é típico, não regra.
Relevância para os artefatos candidatos:
- git-workflow-expert: ALTA, branch de release estável, fluxo de correções (feature -> principal -> release), fechar/arquivar branch, alternativa de entrega contínua sem congelamento.
- dev-practices: ALTA, congelamento de funcionalidade/código, triagem de bugs "show-stopper", risco de correções tardias, dívida técnica consciente, duração, Pareto/prontidão antes de entrar em congelamento.
- code-review-expert: MÉDIA, mudanças no branch congelado devem ser "cuidadosamente revisadas" e analisadas quanto ao risco.
- testing-tdd-expert: MÉDIA, teste de regressão final, testes automatizados/critérios de aceitação como pré-requisito para dispensar congelamento.
- systematic-debugging: BAIXA, aviso de que até a correção mais simples pode ter efeito colateral; decisão de não corrigir.
- clean-code-expert: NENHUMA.
Decisão sugerida: usar em git-workflow-expert (branch de release e fluxo de promoção de mudanças) e dev-practices (tipos de congelamento, triagem, dívida técnica em congelamento); cruzar com o cap. 23.

---

### Capítulo 23: Por favor, libere a versão (PDF p.281-291)
Resumo: tratar a criação de versão como processo disciplinado, "simples, repetível e confiável", e não como apertar "build" na IDE. Descreve 5 passos (iniciar, preparar, gerar, empacotar, implantar), o uso de branches de release e tags, builds automatizados em servidor de CI e a recomendação de criar o processo de release cedo e exercitá-lo com frequência.
Conceitos e regras:
- Histórias de erro por gerar release a partir do diretório de trabalho local [p.282-283]: (a) alterações não commitadas, sem registro do que foi incluído, depuração tornou-se adivinhação; (b) diretório desatualizado em relação ao HEAD, funcionalidades faltando, e ainda aplicaram tag de release no HEAD, gerando confusão; (c) release de código fora do SCV, sem backup, proveniência desconhecida e ambiente de build desconhecido; o computador quebrou e tudo foi perdido ("Fim de jogo"). Uma versão a partir de diretório local é um "build", não um release.
- Requisitos ao gerar release [p.284-285]: poder obter do SCV exatamente o código que a gerou (única forma concreta de provar quais bugs foram corrigidos e de corrigir bug crítico, p. ex., na versão 1.02 com cinco anos); registrar exatamente como foi gerada (flags de otimização do compilador, CPU-alvo, etc.); armazenar o log de build.
- Passo 1, iniciar: concordar que é hora; release formal difere de build de teste do dev e nunca sai de diretório de trabalho existente; acordar nome e tipo (ex.: "5.06 Beta1", "1.2 Candidato à versão") [p.285]
- Passo 2, preparar: determinar exatamente qual código compõe a versão (normalmente o estado do branch de release; raramente gerar direto do tronco/master); branch de release é imagem estável, enquanto o desenvolvimento instável continua no tronco; trabalho testado do tronco é mesclado ao branch de release; se há testes unitários e CI na linha principal, rodá-los também no branch de release; branches de release devem ter vida curta; aplicar tag no SCV com nome refletindo o nome da versão [p.285-286]
- Caixa "Branches de release" [p.286-287]: criados para marcar ponto de estabilidade (oposto de um branch comum), permitem o "congelamento"; QA faz regressão sem que o gol mude; correções importantes do tronco podem ser mescladas ao branch de release com muito cuidado e consentimento dos interessados; branch de release não é mesclado de volta ao tronco; todo desenvolvimento acontece no tronco, é testado e mesclado para o branch; processo bom nem sempre exige branch de release: se a linha principal estiver sempre liberável (desenvolvimento rigoroso e testes automatizados sólidos), pode-se ignorar esse ritual.
- Passo 3, gerar: fazer checkout de cópia virgem da base com a tag correspondente; nunca reutilizar checkout existente (alterações locais não commitadas e arquivos não rastreados afetam o build); sempre aplicar tag e depois fazer checkout pela tag; não editar arquivos manualmente durante o build; build automatizado de um único passo/script (com linguagem de scripting), com a mecânica de build versionada junto do código; script de build funciona como documentação não ambígua, e facilita rodar em servidor de CI; melhores releases saem direto do CI sem passar por mãos humanas; implantar builds em CI para garantir a saúde e gerar versões formais do mesmo sistema [p.287-288]
- Passo 4, empacotar: release notes com diferenças em relação à versão anterior (novas funcionalidades e bugs corrigidos; podem ser extraídas dos logs do SCV, embora mensagens de commit possam não ser as melhores para clientes); empacotar (imagem de instalação, ISO) como parte do script automatizado [p.288]
- Passo 5, implantar: armazenar artefatos e log de build em servidor de arquivos compartilhado; testar a versão final (teste de fumaça inicial dos instaladores em todas as plataformas suportadas, depois testes apropriados: scripts internos para releases de teste, beta com externos selecionados, regressão final em candidatos oficiais); "uma versão não deverá ser distribuída até que tenha sido totalmente verificada"; distribuir (site, emails, imprensa, mídia física); para servidor ativo (devops): implantar código, atualizar componentes e armazenamento (migrações de esquema de banco), reiniciar com mínimo de downtime, com fallback sensato em caso de falha, sendo automação a chave [p.288-289]
- Liberar cedo e com frequência [p.289-290]: um dos piores pecados é só pensar no release no final; mesmo com a filosofia do "último momento responsável" (Poppendieck), o momento responsável para criar o processo de release é bem mais cedo do que se espera; criar o processo automatizado cedo e usar diariamente (ou mais) para provar robustez; expõe suposições nocivas do código (caminhos fixos, bibliotecas instaladas na máquina); "depure o build como qualquer outro software"; alguns definem o processo de release como a primeira tarefa de um projeto.
- Perguntas [p.290-291]: quando iniciar release; repetibilidade/confiabilidade do build; pior falha de release; builds intermitentes (máquina do dev ou CI); responsabilidade pelo processo (uma pessoa ou todos).
- "Tente isto": revisar o processo de build/release e, se não for um único script, implementá-lo agora [p.291]
Citações curtas de prova:
- "Gerar versões de software exige disciplina e planejamento." [p.283]
- "Sempre gere o build de seu software a partir de um checkout recente, feito do zero." [p.287]
- "Jamais disponibilize um software sem testar os artefatos finais." [p.288]
- "Implante seus builds em um servidor de CI para garantir a sua saúde." [p.288]
- "simples", "repetível", "confiável" (os três atributos de um bom processo de release) [p.284]
O que este trecho NÃO diz: não prescreve ferramenta de CI/CD, versionamento semântico, changelog formal nem estratégia de rollback detalhada além de "fallback sensato"; não detalha blue/green ou canary; devops é só citado.
Relevância para os artefatos candidatos:
- git-workflow-expert: ALTA, tag antes de release, checkout limpo por tag, branches de release de vida curta, merge só do tronco para o release, log de build, nomes de tag = nome da versão.
- dev-practices: ALTA, processo de release de 5 passos, automação em um script, CI, smoke test, release notes, criar cedo.
- testing-tdd-expert: MÉDIA, smoke test dos artefatos finais, regressão em candidato a release, rodar testes unitários/CI também no branch de release.
- systematic-debugging: BAIXA, reprodutibilidade (poder reconstruir o código exato; sem isso, depuração é adivinhação).
- code-review-expert, clean-code-expert: NENHUMA.
Decisão sugerida: usar em git-workflow-expert (releases/tags/branches) e dev-practices (checklist de processo de release); cruza com production-ready-microservices-expert existente (deploy/rollback), mas este capítulo é de nível básico.

---

### PARTE III: Envolvendo-se pessoalmente (PDF p.294)
Resumo: página de abertura da parte III: anuncia capítulos sobre aprender a aprender, comportamento ético, desafios para evitar estagnação e bem-estar físico.
Conceitos e regras: apenas apresentação; não há regras práticas.
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: nenhum conteúdo técnico.
Relevância para os artefatos candidatos: todos NENHUMA.
Decisão sugerida: descartar.

---

### Capítulo 24: Viva para amar o aprendizado (PDF p.295-307)
Resumo: incentiva o aprendizado contínuo e deliberado, sugere o que aprender, técnicas de aprendizado, o modelo Dreyfus de aquisição de habilidade, o "portfólio de conhecimento", ensinar e fazer como formas de aprender.
Conceitos e regras:
- Aprendizado contínuo é responsabilidade própria (não do empregador ou da escola); aprender a gostar de aprender [p.295, p.306]
- Escolher o que aprender: alvo nos "desconhecidos conhecidos" ou explorar "desconhecidos desconhecidos"; escolher algo do seu interesse e que traga benefícios [p.296]
- Áreas sugeridas [p.296-298]: nova tecnologia (linguagem além do "Hello, World", biblioteca, framework, editor/IDE, ferramentas de documentação/teste, sistema de build, de monitoração de problemas, de controle de versões, SO); habilidades técnicas (ler código desconhecido, escrever documentação técnica, arquitetura); trabalhar com pessoas (liderança, comunicação); novo domínio de problema; aprender a aprender (mapas mentais, leitura dinâmica); algo totalmente diferente (língua, instrumento, ciência, arte, filosofia).
- Aprender a aprender [p.298-300]: formação acadêmica estreita; ampliar referências; estilo depende de personalidade (o autor cita "lado direito/esquerdo do cérebro", mas a nota de rodapé reconhece que nenhum estudo científico comprovou essa distinção [p.308]); usar várias mídias (escrita, falada, visual) e combiná-las; feedback entre sentidos (música, rabiscar, mexer em objeto, falar em voz alta, modelar com blocos/cartões CRC, meditação); fazer anotações enquanto aprende, mesmo que descarte depois; atitude positiva melhora a retenção, enquanto estresse e falta de sono pioram.
- Quatro estágios da competência (caixa) [p.300-301]: incompetência consciente, competência consciente, competência inconsciente, incompetência inconsciente (a posição perigosa: não saber que não sabe; ponto cego).
- Modelo Dreyfus (cinco níveis, por habilidade) [p.301-304]: novato (quer resultados rápidos, segue regras sem discernimento), iniciante avançado (limitado, não sabe o que fazer quando algo dá errado; não separa o irrelevante), competente (tem modelo mental, planeja de forma metódica, percebe limites das regras), proficiente (vê o quadro geral, interpreta máximas, aplica padrões de projeto com critério, conhecimento tácito), expert (intuição, vê a resposta sem articular). Utilidade: saber onde você está; a maioria é competente e isso basta (equipe só de experts seria pesada); ajustar a interação com colegas conforme o nível (dar regras simples, explicar máximas ou deixar que agreguem ao entendimento); aplica-se por habilidade; mantém humildade.
- Portfólio de conhecimento (Pragmatic Programmers) [p.304-305]: tratar o conhecimento como carteira de investimentos; equilibrar risco e retorno (assuntos seguros e conhecidos, e apostas de maior risco/dividendo); retirar itens para abrir espaço; gerir conscientemente.
- Ensinar para aprender (blog, palestra, mentoria); ensinar expõe limites do conhecimento; se não souber, dizer "não sei, mas vou procurar" [p.305]
- Fazer para aprender (Confúcio): aplicar imediatamente, projeto de estimação, código de exemplo, errar e experimentar [p.305-306]
- Perguntas e "Tente isto": tomar iniciativa e formular plano de estudo; achar tempo sob pressão [p.306-307]
Citações curtas de prova:
- "Ensine um assunto para aprendê-lo bem." [p.305]
- "Faça anotações enquanto estiver aprendendo. Mesmo que você vá jogá-las fora." [p.300]
- "Administre conscientemente o seu portfólio de conhecimentos." [p.305]
O que este trecho NÃO diz: nada de técnica de engenharia (testes, depuração, git, revisão); o modelo Dreyfus é citado de forma resumida (e a fonte original é citada em rodapé).
Relevância para os artefatos candidatos:
- dev-practices: BAIXA, aprendizado contínuo e Dreyfus para adaptar a forma de trabalhar/mentorar colegas (potencial para code review mentoria).
- code-review-expert: BAIXA, adaptar o feedback ao nível do colega (Dreyfus: regras para novato, máximas para proficiente) é uma inferência minha, o texto fala de "interação" em equipe em geral [fora do livro quanto à aplicação a code review].
- testing-tdd-expert, systematic-debugging, git-workflow-expert, clean-code-expert: NENHUMA.
Decisão sugerida: descartar para skills técnicas; opcionalmente uma linha de Dreyfus em dev-practices/code-review (mentoria).

---

## Checklist de cobertura
- Primeira página lida: 232
- Última página lida: 308 (confirmado por Grep: último marcador "=== PDF PAGINA 308 ===")
- Páginas sem texto útil ou ilegíveis: 235, 236 (vazias), 292 e 293 (293 só notas de rodapé do cap. 23), 268 (só continuação de nota), 280, 308 (apenas rodapés)
- Problemas de extração observados: ligaduras "fi/fl/ti" perdidas (ex.: "cientes", "de ne", "con ito", "veri car", "signi ca"), o que afeta palavras; "Controle e ciente de versões" é "Controle eficiente de versões"; erro "warterfall"; número impresso de página não visível; início do capítulo de reutilização (p.231 e anteriores) fora do bloco, então o título do capítulo está ausente; frases truncadas por quebras de página.
- Capítulos/seções cobertos integralmente: 20, 21, 22, 23, 24 (e abertura da Parte III)
- Capítulos/seções que continuam em outro bloco: capítulo de reutilização de código (início no bloco anterior, caso 1 incompleto)
