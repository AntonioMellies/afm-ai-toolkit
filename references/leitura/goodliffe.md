# Registro de leitura (rascunho): goodliffe

Gerado por script a partir das notas dos leitores. Cada item: capítulo/seção, páginas (PDF), relevância avaliada e decisão sugerida. Revisão humana por amostragem pendente.

Seções registradas: 50


## Bloco 01_p001-077 (lido: PDF p.1-77)

- **Capa, elogios, créditos, dedicatória (PDF p.1-11)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Sumário (PDF p.12-22) [estrutura apenas]**
  - Relevância: ver a tabela de mapeamento por capítulo no fim deste arquivo. Decisão: usar só como mapa para distribuir blocos.
  - Decisão sugerida: (não registrada)
- **Introdução (PDF p.24-29)**
  - Relevância: todos os candidatos: NENHUMA (apenas a estrutura "Perguntas/Tente isto" pode inspirar o formato de checklists em reference files, [fora do livro] como ideia nossa).
  - Decisão sugerida: descartar.
- **Capítulo 1: Importar-se com o código (PDF p.30-32)**
  - Relevância: clean-code-expert: BAIXA/MÉDIA (mentalidade principal: intenção revelada, deixar melhor, correção demonstrada por testes). testing-tdd-expert: BAIXA ("testes que mostrem que está correto"). code-review-expert: BAIXA. dev-practices: BAIXA. systematic-debugging: NENHUMA. git-workflow-expert: NENHUMA.
  - Decisão sugerida: usar só como frase de mentalidade em clean-code-expert / dev-practices; resto descartar.
- **Capítulo 2: Mantendo as aparências (PDF p.35-47)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em clean-code-expert (nomes, layout), code-review-expert (cegueira de layout), git-workflow-expert (commit separado), dev-practices (convenção de equipe).
- **Capítulo 3: Escreva menos código! (PDF p.48-62)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em clean-code-expert (references de simplificação/duplicação/comentários), code-review-expert (checklist), testing-tdd-expert (refatoração exige testes), git-workflow-expert (separar limpeza).
- **Capítulo 4: Melhore o código removendo-o (PDF p.63-71)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em clean-code-expert (YAGNI/código morto), git-workflow-expert (limpeza em commit separado, não comentar código), code-review-expert (sinais de código extra), dev-practices (YAGNI).
- **Capítulo 5: O fantasma de um código do passado (PDF p.72-77) [continua no próximo bloco; o texto termina truncado no meio do exemplo `max` em PDF p.77]**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar levemente em clean-code-expert (idioms, não reinventar a biblioteca); completar a leitura no bloco 02 antes de decidir sobre design/bugs.

## Bloco 02_p078-154 (lido: PDF p.78-154)

- **Cap. 5 (final): O fantasma de um código do passado (PDF p.78-80) [continua do bloco anterior; só o fim está aqui]**
  - Relevância: CLEAN: BAIXA (idioms/design evolutivo, sem regra operacional); REV: BAIXA (ideia de "revisar o próprio código"); DEBUG/TDD/GIT/PRAT: NENHUMA.
  - Decisão sugerida: descartar (só apoio de contexto para a regra "não refatore sem motivo", já coberta no cap. 7).
- **Cap. 6: Percorrendo um caminho (PDF p.83-93)**
  - Relevância:
  - Decisão sugerida: usar em dev-practices (checklist "como entrar em código desconhecido", primeiras mudanças seguras, README) e citar pontualmente em testing-tdd-expert (smoke test, teste que falha primeiro).
- **Cap. 7: Chafurdando na lama (PDF p.95-104)**
  - Relevância:
  - Decisão sugerida: usar em clean-code-expert (sinais, regra dos escoteiros, refatorar sob testes, estratégia de API-fachada) e dev-practices (decidir investimento e postura); extrair a regra "commit de layout separado do commit funcional" para git-workflow-expert; usar a postura "sem culpa" em code-review-expert.
- **Cap. 8: Não ignore esse erro! (PDF p.105-110)**
  - Relevância:
  - Decisão sugerida: usar em clean-code-expert (seção de erros: catálogo de canais de erro e consequências) e em code-review-expert (checklist: catch vazio, retorno ignorado, log sem destinatário).
- **Cap. 9: Espere pelo inesperado (PDF p.111-114)**
  - Relevância:
  - Decisão sugerida: usar em code-review-expert (perguntas de revisão: erro, concorrência, encerramento) e em clean-code-expert (robustez); referência menor em systematic-debugging.
- **Cap. 10: Caça aos bugs (PDF p.116-131)**
  - Relevância:
  - Decisão sugerida: usar em systematic-debugging como fonte principal (fluxo: caracterizar, reduzir, armadilhas, bisseção, VCS, teste de reprodução, pós-correção; seção de bugs intermitentes); usar em testing-tdd-expert a regra "teste que falha antes de corrigir bug"; git-workflow-expert: commits atômicos + bisect.
- **Cap. 11: É hora de testar (PDF p.132-153)**
  - Relevância:
  - Decisão sugerida: usar como fonte principal de testing-tdd-expert (ciclo, taxonomia, catálogo de bons/maus testes, AAA, nomes, doubles); regra "teste de regressão antes da correção" também em systematic-debugging; testabilidade/injeção como apoio em clean-code-expert.
- **Cap. 12: Lidando com a complexidade (PDF p.154) [continua no próximo bloco]**
  - Relevância: CLEAN: BAIXA no que está aqui (reavaliar quando o resto chegar no bloco 03); demais: NENHUMA.
  - Decisão sugerida: aguardar o bloco seguinte; nada a usar daqui.

## Bloco 03_p155-231 (lido: PDF p.155-231)

- **Cap. 12 - Lidando com a complexidade (PDF p.155-164) [continua do bloco anterior; o início do capítulo (até p.154) está no bloco anterior]**
  - Relevância para os artefatos candidatos: clean-code-expert: MÉDIA (coesão, acoplamento, remover código morto/encaminhadores, ciclos); testing-tdd-expert: BAIXA (interfaces abstratas favorecem testabilidade, uma linha); code-review-expert: BAIXA; dev-practices: BAIXA (pressão e protótipo que vira produção como causa); systematic-debugging: NENHUMA; git-workflow-expert: NENHUMA.
  - Decisão sugerida: usar em clean-code-expert (checklist de complexidade: ciclos, responsabilidade única, métodos-encaminhadores e código morto) e, secundariamente, em dev-practices (causa organizacional da complexidade); resto descartar.
- **Cap. 13 - Um conto de dois sistemas (PDF p.166-184)**
  - Relevância para os artefatos candidatos: dev-practices: ALTA (dívida técnica visível e agendada, YAGNI/adiar decisões, prazo adequado, pressão de entrega vs qualidade, propriedade coletiva, regras de equipe desde o início); testing-tdd-expert: MÉDIA (argumento de que testes automatizados permitem mudar arquitetura e forçam coesão/baixo acoplamento; sem técnica de TDD); code-review-expert: BAIXA-MÉDIA (revisão/pareamento como mecanismo que rejeita mudança que não se encaixa no design; sem prática detalhada); clean-code-expert: MÉDIA (coesão/acoplamento, duplicação, consistência de nomes/estilo); systematic-debugging: BAIXA (só: sem coesão, achar onde corrigir bug é pesadelo); git-workflow-expert: NENHUMA (cita só check-in e CI no cap. 18; nada aqui).
  - Decisão sugerida: usar em dev-practices (seções de dívida técnica, YAGNI/adiar decisões, relação entre prazo e design, consequências de arquitetura ruim fora do código) e em testing-tdd-expert (rationale: testes como rede de segurança e pressão de design); coesão/acoplamento em clean-code-expert; descartar o restante narrativo.
- **Cap. 14 - Desenvolvimento de software é... (PDF p.188-198)**
  - Relevância para os artefatos candidatos: dev-practices: MÉDIA (humildade, zeladoria/manutenção como obrigação, disciplina e cultura de equipe, perguntas de autoavaliação); systematic-debugging: BAIXA-MÉDIA (uma frase: tratar bug complicado como método científico, hipótese-experimento-validação); testing-tdd-expert: BAIXA (rigor: unit/integration/system, automatizados); clean-code-expert: BAIXA (simplicidade, remover código morto); code-review-expert: NENHUMA; git-workflow-expert: NENHUMA (só menção de controle de versões como fluxo de cooperação).
  - Decisão sugerida: usar pontualmente em dev-practices (postura: humildade, zeladoria, cultura) e uma linha em systematic-debugging (método hipótese/experimento); resto descartar (filosófico).
- **Cap. 15 - Jogando segundo as regras (PDF p.201-205)**
  - Relevância para os artefatos candidatos: dev-practices: MÉDIA (acordos de equipe explícitos, cultura de codificação, regras de processo curtas, revisar regras periodicamente); code-review-expert: BAIXA (menciona "todo código revisado antes do check-in" como exemplo de regra); git-workflow-expert: BAIXA (check-in como exemplo, nada sobre fluxo); clean-code-expert: BAIXA (padrão de codificação); testing-tdd-expert: NENHUMA; systematic-debugging: BAIXA (exemplo de regra: bug report com passos de reprodução, uma linha).
  - Decisão sugerida: usar em dev-practices (working agreements explícitos e revisáveis); descartar o restante.
- **Cap. 16 - Mantenha a simplicidade (PDF p.207-215)**
  - Relevância para os artefatos candidatos: clean-code-expert: ALTA (simplicidade vs simplismo, indireção desnecessária, consistência de estilo, suposições explícitas, YAGNI/DRY, otimização prematura, API que evita mau uso); systematic-debugging: MÉDIA (corrigir causa-raiz e não sintoma; remendo adiciona complexidade); dev-practices: BAIXA-MÉDIA ("não tenho tempo para refatorar" como origem da complexidade; escrever só o necessário); code-review-expert: BAIXA (revisão pulada citada como causa de complexidade; critérios de consistência e obscuridade proposital úteis a um revisor); testing-tdd-expert: NENHUMA; git-workflow-expert: NENHUMA.
  - Decisão sugerida: usar em clean-code-expert (princípios de simplicidade; seção de otimização; suposições) e em systematic-debugging (regra: tratar causa-raiz, não sintoma, e checar suposições inválidas); consistência como critério em code-review-expert.
- **Cap. 17 - Use o seu cérebro (PDF p.216-219)**
  - Relevância para os artefatos candidatos: dev-practices: MÉDIA (postura: pensar antes, alternativas, autonomia para criticar, responsabilidade); clean-code-expert: BAIXA-MÉDIA (evitar complexidade acidental, algoritmo sofisticado quando array basta); code-review-expert: BAIXA (revisões de design/código e pareamento citados como defesa contra descuido); systematic-debugging: NENHUMA; testing-tdd-expert: NENHUMA; git-workflow-expert: NENHUMA.
  - Decisão sugerida: usar em dev-practices (postura e responsabilidade); descartar o restante.
- **Cap. 18 - Nada está gravado a ferro e fogo (PDF p.221-228)**
  - Relevância para os artefatos candidatos: clean-code-expert: MÉDIA-ALTA (projetar para mudança, separar função que faz duas coisas, evitar efeitos colaterais, explicitar o implícito, refatorar em passos pequenos, remover código ruim/duplicado); testing-tdd-expert: MÉDIA (testes automatizados como rede de segurança, testar a seção antes de mudar, CI executando testes; sem técnica TDD); dev-practices: MÉDIA-ALTA (propriedade coletiva do código, dívida significativa vira item de cronograma, refatoração aceita pela equipe, escolher batalhas, cultura sem medo); code-review-expert: BAIXA-MÉDIA (revisões e pares como rede de proteção; não ser dono; opinião de todos vale; errar não é crime); git-workflow-expert: BAIXA (CI/build no servidor e possibilidade de restaurar estado funcional; nada sobre branches/commits); systematic-debugging: BAIXA (mapear/rastrear código e achar efeitos colaterais surpreendentes, uma frase).
  - Decisão sugerida: usar em dev-practices (atitudes de equipe, dívida no cronograma, propriedade coletiva), clean-code-expert (design para mudança, pequenos passos) e testing-tdd-expert (testes como rede de segurança e CI); mencionar CI/revert em git-workflow-expert apenas como apoio.
- **Cap. 19 - Um estudo sobre reutilização de código (PDF p.230-231) [continua no próximo bloco; trecho truncado ao fim de p.231]**
  - Relevância para os artefatos candidatos: clean-code-expert: MÉDIA (DRY, duplicação por copy-paste e seu custo em bugs; ressalva do acoplamento do excesso de DRY); code-review-expert: BAIXA-MÉDIA (checklist ao revisar código colado da Internet: correção, atualidade, licença); dev-practices: BAIXA; git-workflow-expert: NENHUMA (só "faça commit" na narrativa); testing-tdd-expert: NENHUMA; systematic-debugging: NENHUMA.
  - Decisão sugerida: aguardar o próximo bloco para consolidar; usar em clean-code-expert (duplicação) e, como item de checklist, em code-review-expert (código de origem externa).

## Bloco 04_p232-308 (lido: PDF p.232-308)

- **[Capítulo sobre reutilização de código; título e início estão no bloco anterior] (PDF p.232-234) [continua do bloco anterior]**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em clean-code-expert (referência sobre duplicação/YAGNI/reuso, uma seção curta) e em dev-practices (build vs buy). Completar com o bloco anterior antes de citar o caso 1.
- **Capítulo 20: Controle eficiente de versões (PDF p.237-251)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em git-workflow-expert (principal, com tabela do que versionar/ignorar, regras de commit/mensagem/branch como references) e referenciar em dev-practices e code-review-expert (commits pequenos).
- **Capítulo 21: Marcando um gol (relação desenvolvimento x QA) (PDF p.252-267)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em dev-practices (entrega ao QA, notas de release, atitude ao receber bug report, qualidade coletiva) e, pontualmente, em testing-tdd-expert (limite dos testes unitários, teste de regressão por bug, caminho feliz); em systematic-debugging só a postura de reprodução confiável.
- **Capítulo 22: O curioso caso do código congelado (PDF p.269-280)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em git-workflow-expert (branch de release e fluxo de promoção de mudanças) e dev-practices (tipos de congelamento, triagem, dívida técnica em congelamento); cruzar com o cap. 23.
- **Capítulo 23: Por favor, libere a versão (PDF p.281-291)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em git-workflow-expert (releases/tags/branches) e dev-practices (checklist de processo de release); cruza com production-ready-microservices-expert existente (deploy/rollback), mas este capítulo é de nível básico.
- **PARTE III: Envolvendo-se pessoalmente (PDF p.294)**
  - Relevância para os artefatos candidatos: todos NENHUMA.
  - Decisão sugerida: descartar.
- **Capítulo 24: Viva para amar o aprendizado (PDF p.295-307)**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: descartar para skills técnicas; opcionalmente uma linha de Dreyfus em dev-practices/code-review (mentoria).

## Bloco 05_p309-385 (lido: PDF p.309-385)

- **Cap. 25 - Desenvolvedores orientados a testes (PDF p.309-315)**
  - Relevância: testing-tdd-expert: NENHUMA, título enganoso; systematic-debugging: NENHUMA; git-workflow-expert: NENHUMA; code-review-expert: NENHUMA; dev-practices: BAIXA, só a ideia de vigiar a complacência; clean-code-expert: NENHUMA.
  - Decisão sugerida: descartar (nenhum conteúdo técnico utilizável). Cuidado para não citar este capítulo como fonte sobre TDD.
- **Cap. 26 - Aprecie o desafio (PDF p.316-321)**
  - Relevância: testing-tdd-expert: NENHUMA; systematic-debugging: NENHUMA; git-workflow-expert: NENHUMA (só a menção de ler o log do VCS como termômetro de progresso, p.320); code-review-expert: NENHUMA; dev-practices: BAIXA, aviso de não refatorar/ajustar sistema estável sem valor de negócio (p.318); clean-code-expert: NENHUMA.
  - Decisão sugerida: descartar (motivação/carreira). Opcional: o aviso sobre mudanças sem valor de negócio em dev-practices.
- **Cap. 27 - Evite a estagnação (PDF p.323-328)**
  - Relevância: todos os artefatos candidatos: NENHUMA. dev-practices: BAIXA.
  - Decisão sugerida: descartar (carreira/motivação).
- **Cap. 28 - O programador ético (PDF p.329-339)**
  - Relevância: testing-tdd-expert: BAIXA, testes automatizados citados como ferramenta de qualidade (p.331); systematic-debugging: MÉDIA, princípio de não aplicar remendo que esconde o bug, entender antes de corrigir, correção testada (p.331); git-workflow-expert: NENHUMA (cita só "faz check-in", em outro capítulo); code-review-expert: BAIXA, revisão de código e pair programming citados como práticas (p.331); dev-practices: MÉDIA, relatar problemas e atrasos cedo, não inflar estimativa, registrar bugs, registrar dívida técnica de correção temporária, evitar burnout (p.331, 335-337); clean-code-expert: BAIXA, não escrever código ilegível/"esperto" para garantir emprego (p.330).
  - Decisão sugerida: usar em systematic-debugging (regra anti-band-aid, p.331) e dev-practices (comunicação de riscos/atrasos, dívida técnica registrada, limites de jornada). Descartar as partes legais/filosóficas.
- **Cap. 29 - Amor pelas linguagens (PDF p.341-351)**
  - Relevância: testing-tdd-expert: NENHUMA; systematic-debugging: NENHUMA; git-workflow-expert: NENHUMA; code-review-expert: NENHUMA; dev-practices: BAIXA; clean-code-expert: BAIXA, código como comunicação e uso dos idioms da linguagem (p.347-348).
  - Decisão sugerida: usar em clean-code-expert apenas como reforço (seguir idioms da linguagem; código comunica intenção). Resto descartar.
- **Cap. 30 - Postura dos programadores (PDF p.352-363)**
  - Relevância: systematic-debugging: NENHUMA (a "postura de debugging" é piada física, não mental); demais candidatos: NENHUMA.
  - Decisão sugerida: descartar (ergonomia/humor).
- **Parte IV - Conseguir que tudo seja feito (abertura) (PDF p.364)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Cap. 31 - Mais inteligente, e não mais árduo (PDF p.365-375)**
  - Relevância: testing-tdd-expert: MÉDIA, testar o uso e não cada método, focar onde há risco, escrever testes cedo junto com o código ou antes, rodar com frequência, exceção para protótipos (p.368, 370-372); systematic-debugging: BAIXA, achar erros cedo (p.372); git-workflow-expert: BAIXA, integração frequente em pequenas porções (p.370) e VCS eficiente para reverter experimentos (p.368); code-review-expert: MÉDIA, revisar porções pequenas e compreensíveis, discutir o design cedo (p.372); dev-practices: ALTA, priorizar, yak shaving, uma tarefa por vez, só o necessário/Pareto, protótipo com timebox, automação, reutilização/NIH, evitar burnout (p.367-373); clean-code-expert: BAIXA, KISS e código pequeno (p.370).
  - Decisão sugerida: usar em dev-practices (núcleo: priorização, timebox de spikes, yak shaving, automação, reutilizar, só o necessário); em testing-tdd-expert (foco do teste no uso/risco, escrever cedo, exceção para protótipo); em code-review-expert (revisões pequenas); em git-workflow-expert (integração frequente em pequenas porções, como justificativa).
- **Cap. 32 - Estará pronto quando estiver pronto (PDF p.376-383)**
  - Relevância: testing-tdd-expert: MÉDIA, testes escritos como definição executável de "pronto" (p.381), 100% de cobertura não realista como meta (p.381); systematic-debugging: NENHUMA; git-workflow-expert: BAIXA, "onde o código será disponibilizado (VCS)" e check-in como sinal de pronto (p.381-382); code-review-expert: BAIXA, "quem assina embaixo", testadores/QA como partes do acordo de pronto (p.380-382); dev-practices: ALTA, definição de "pronto" (claro/visível/atingível), decomposição de tarefas, consequências de não definir, parar no "bom o suficiente" (p.377-382); clean-code-expert: NENHUMA (só o aviso de não escrever código ruim, p.382).
  - Decisão sugerida: usar em dev-practices (núcleo da seção "definição de pronto" e decomposição de tarefas); em testing-tdd-expert (testes como critério de pronto, meta de cobertura atingível).

## Bloco 06_p386-458 (lido: PDF p.386-458)

- **Cap. 33 "Dessa vez, eu consigo..." (PDF p.386-392) [início do capítulo está neste bloco; fecha aqui]**
  - Relevância para os artefatos candidatos:
  - Decisão sugerida: usar em systematic-debugging (seção de postura/anti-padrões: remendar sintomas, "ilha deserta", rubber duck, reverter versão boa, timebox) e em dev-practices (plano de ataque, accountability, retrospectiva pessoal).
- **Parte V "Uma meta de pessoas" (PDF p.394) [abertura de parte]**
  - Relevância: todos NENHUMA, exceto dev-practices BAIXA.
  - Decisão sugerida: descartar (introdução de parte).
- **Cap. 34 "O poder das pessoas" (PDF p.395-400)**
  - Relevância:
  - Decisão sugerida: usar apenas em dev-practices (seção cultura/mentoria, anti-padrão "herói das horas extras"); demais descartar.
- **Cap. 35 "Ser responsável" (PDF p.401-409)**
  - Relevância:
  - Decisão sugerida: usar em code-review-expert (princípios/cultura: revisão leve, em pares, diffs pequenos, receber crítica sem defensividade, ser par bidirecional) e em dev-practices (acordo de qualidade da equipe e perguntas de benchmark); citar em git-workflow-expert apenas a regra de revisão antes de integrar e commits pequenos.
- **Cap. 36 "Fale!" (PDF p.410-423)**
  - Relevância:
  - Decisão sugerida: usar em dev-practices (comunicação de equipe: canais, stand-up, cliente, consequências) e como reforço pontual em clean-code-expert (código para leitura, comentários, consistência de idioms e idioma dos nomes); não criar artefato próprio.
- **Cap. 37 "Manifestos" (PDF p.424-430)**
  - Relevância:
  - Decisão sugerida: descartar na maior parte; no máximo uma linha em dev-practices ("não trate práticas/metodologias como dogma, adote o que funciona").
- **Cap. 38 "Ode ao código" (PDF p.432-435)**
  - Relevância:
  - Decisão sugerida: usar apenas em dev-practices (cultura/equipe com qualidade desigual); descartar o poema.
- **Epílogo (PDF p.437-441)**
  - Relevância: todos NENHUMA; dev-practices BAIXA.
  - Decisão sugerida: descartar (ou uma frase de abertura sobre atitude/mentalidade).
- **Sobre o autor, Colofão (PDF p.442-443)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Anúncios de outros livros da editora (PDF p.445-458)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
