# Registro de leitura (rascunho): codigo-limpo

Gerado por script a partir das notas dos leitores. Cada item: capítulo/seção, páginas (PDF), relevância avaliada e decisão sugerida. Revisão humana por amostragem pendente.

Seções registradas: 28


## Bloco 01_p001-080 (lido: PDF p.?)

- **Capa, Prefácio (James O. Coplien) (PDF p.1-6) [OCR: MÉDIA]**
  - Relevância: clean-code-expert: BAIXA (contexto/motivação); refactoring-expert: BAIXA; testing-tdd-expert: NENHUMA; code-review-expert: BAIXA (argumento para exigir consistência de estilo).
  - Decisão sugerida: descartar na maior parte; opcionalmente 1 linha de motivação em references do clean-code-expert.
- **Introdução e Agradecimentos (PDF p.7-10) [OCR: MÉDIA/RUIM nas figuras]**
  - Relevância: todos: NENHUMA/BAIXA. Decisão: descartar (p.10 agradecimentos e capa; p.7 figura ilegível).
  - Decisão sugerida: (não registrada)
- **Capítulo 1: Código Limpo (PDF p.11-25; impr. 1-15) [OCR: BOA no texto; MÉDIA nos boxes de citações de autores]**
  - Relevância: clean-code-expert: ALTA (fundamentos e Regra do Escoteiro); refactoring-expert: ALTA (regras de Beck/Jeffries, Boy Scout, custo da bagunça); testing-tdd-expert: MÉDIA (Thomas: sem testes não é limpo; primeira regra de Beck: testes passam); code-review-expert: MÉDIA (definições como critérios de revisão).
  - Decisão sugerida: usar em clean-code-expert (mentalidade: 4 regras de Beck, leitura 10:1, Boy Scout) e em references de refactoring-expert (custo da bagunça, ciclo da reescrita).
- **Capítulo 2: Nomes Significativos (PDF p.26-39; impr. 17-30) [OCR: MÉDIA; prosa BOA, código RUIM] (Tim Ottinger)**
  - Relevância: clean-code-expert: ALTA (catálogo completo de nomes); refactoring-expert: MÉDIA (Renomear como refatoração segura; contexto via extrair classe); testing-tdd-expert: NENHUMA; code-review-expert: ALTA (checklist de nomes).
  - Decisão sugerida: usar em clean-code-expert/references/nomes.md (catálogo) e em code-review-expert (checklist).
- **Capítulo 3: Funções (PDF p.40-58; impr. 31-50) [OCR: prosa BOA; código RUIM]**
  - Relevância: clean-code-expert: ALTA (núcleo de funções e tratamento de erro); refactoring-expert: ALTA (Extrair Método, substituir switch por polimorfismo, remover duplicação, caminho de rascunho para limpo com testes); testing-tdd-expert: MÉDIA (refinar com testes cobrindo o código; parâmetros dificultam testes); code-review-expert: ALTA (checklist: tamanho, nível de abstração, argumentos, flags, efeitos colaterais, CQS, códigos de erro).
  - Decisão sugerida: usar em clean-code-expert/references/funcoes.md (catálogo com números: 20 linhas, 150 colunas, 1-2 níveis, 0/1/2 args) e em refactoring-expert (switch->polimorfismo, extrair try/catch) e code-review-expert (smells de função).
- **Capítulo 4: Comentários (PDF p.59-80; impr. 53-74) [OCR: prosa BOA; código e listagens RUIM]**
  - Relevância: clean-code-expert: ALTA; refactoring-expert: ALTA (comentário -> extrair função/variável; remover código comentado; exemplo antes/depois de primos); testing-tdd-expert: BAIXA (exemplos de comentário em teste: intenção, alerta); code-review-expert: ALTA (catálogo de comentários ruins como checklist).
  - Decisão sugerida: usar em clean-code-expert/references/comentarios.md (bons x ruins) e code-review-expert.

### Auditoria da skill atual (trecho das notas)

Comparação com `skills/clean-code-expert/SKILL.md` (v1.0) e `references/before-after.md`. Avalio só o que este bloco permite (Cap.1 a 4). Capítulos 5 a 17 e G/H (formatação, objetos e estruturas de dados, tratamento de erros em profundidade, testes, classes, sistemas) não estão neste bloco; nada concluo sobre eles.

### (a) Afirmações da skill confirmadas neste bloco
- Nomes devem revelar intenção/propósito: p.27 (impr. 18).
- Evitar nomes genéricos em classes (manager, processor, data, info) e palavras vazias Info/Data: p.30 e p.34 (a lista do livro é Gerente, Processador, Dados, Info; ver (b) para util/helper/temp/obj/service).
- Funções devem fazer uma coisa; evitar função monstro: p.44 (impr. 35); função pequena (20 linhas): p.43.
- Mais de um nível de indentação é anti-padrão: p.44 (blocos de uma linha; indentação 1 ou 2).
- Comentários frequentemente escondem código ruim; primeiro melhore o código: p.60-61; exemplo employee.isEligibleForFullBenefits() em before-after.md nº6 confere com p.61.
- Comentário "// Incrementa contador" como proibido: consistente com "Comentários ruidosos/redundantes", p.70.
- Nunca manter código comentado; controle de versão existe para isso: p.74-75.
- Eliminar duplicação: p.55 (e p.20 Jeffries). A frase "identifique o padrão, extraia a abstração, centralize" é da skill, mas o espírito se apoia em p.20 e p.55.
- Separe lógica de negócio de tratamento de erro: p.53-54 (extrair try/catch, tratamento de erro é uma coisa).
- Preferir exceção a sinalizador/código de erro: p.53 (aplica-se a códigos como E_OK; "return -1/false" aproximam-se do mesmo problema).
- Código deve ser testável; testes ligados à limpeza: p.19 (Thomas), p.56 (refatorar com testes rodando).
- Boy Scout Rule: p.24 (impr. 14); exemplos da skill (renomear, remover duplicação, simplificar, extrair função) coincidem com os do livro.
- Regra Máxima ("escrito por alguém que se importa"): p.19 (atribuída a Michael Feathers; a skill não atribui).
- "Nunca sacrifique clareza em troca de soluções inteligentes": p.33 e p.34 (esperto x profissional; "Não dê uma de espertinho").
- Funções com muitos "passos" e seções em comentários (processOrder em before-after.md nº2): p.45 (seções dentro de funções indicam mais de uma coisa).
- Guard clauses/retorno antecipado: o termo não aparece, mas p.55-56 apoia múltiplos return/break/continue em funções pequenas, e p.44 apoia reduzir aninhamento.
- before-after.md nº1 (nomes): p.27 mesmo princípio (nome que revela propósito/unidade).

### (b) Afirmações da skill NÃO suportadas ou contraditas neste bloco
- "Argumentos: ideal 0-2, aceitável 3, evite 4+" (SKILL.md, Funções Pequenas): contradita em parte. O livro (p.48) diz ideal zero, depois um, dois; "Sempre que possível devem-se evitar três parâmetros (tríade)"; mais de três exige motivo muito especial "mesmo assim não devem ser usados". Também p.50: "pense bastante antes de criar uma triade". Portanto "aceitável 3" não é do livro.
- "Se uma função exige explicação verbal com 'primeiro faz isso, depois faz aquilo', ela tem múltiplas responsabilidades": não é o critério do livro. O livro admite vários passos desde que um nível abaixo do nome (parágrafo TO; Listagem 3-3 tem "três passos" e ainda é "uma coisa", p.44-45). Critérios do livro: mesmo nível de abstração, seções internas, impossibilidade de extrair função com nome não-redundante. A heurística da skill pode gerar over-splitting (cf. p.45).
- "Evite else quando possível": não consta neste bloco; nenhuma passagem a apoia.
- "Booleanos... Evite: flag, status, check": não suportado neste bloco como regra de nomenclatura. O livro trata booleano como parâmetro (p.49-50, "Parâmetros lógicos") e cita is/has... só como prefixo de predicado JavaBean (p.34). O nome checkPassword é criticado por efeito colateral (p.51), não por prefixo "check".
- "Evitar sem contexto claro: temp, obj, util, helper, service": não suportado literalmente. O livro nomeia Gerente/Processador/Dados/Info para classes (p.34), e Object/Info/Data como palavras vazias (p.29-30); e também diz que nomes de solução (AccountVisitor, JobQueue) são adequados (p.35-36), o que relativiza "service".
- "Permitidos: regras de negócio complexas, decisões arquiteturais, limitações externas, workarounds documentados": lista própria da skill. Os comentários bons do livro são: legais, informativos, intenção, esclarecimento (código/biblioteca que não se pode alterar), alerta de consequências, TODO, destaque, Javadoc de API pública (p.61-65). "Regras de negócio" e "decisões arquiteturais" não aparecem; "workarounds" só indiretamente (alerta SimpleDateFormat, p.64).
- "Outro desenvolvedor conseguirá entender isso em 30 segundos?": critério inventado pela skill; o livro usa 3 minutos para comparar as Listagens 3-1 e 3-2 (p.41-42), e não propõe limite de tempo como regra.
- "Evite como sinalizadores de erro: return null; return false": neste bloco só se condena código de erro tipo enum E_OK (p.53-55) e booleano de sucesso em set() (p.52-53, comando-consulta). Null não é tratado aqui (não concluo).
- "Todo código deve ser escrito pensando em testes... given/when/then", "Dependências externas abstraídas": não suportado neste bloco (testes limpos/estrutura de teste não aparecem; capítulo de testes está em outro bloco). Parcial: p.19 e p.49 e p.56.
- "Lei de Demeter" (customer.getCompanyCityName()): não aparece neste bloco; não avalio.
- "Objetos ao invés de primitivos (Email, CPF, Money)": não aparece neste bloco. Apoio parcial só pela substituição de int[] por Cell (p.28) e Address (p.36).
- Exemplo before-after.md nº5 (Optional/orElseThrow): o bloco não trata null; só exceções vs códigos de erro (p.53).
- `Funções Pequenas`: skill não dá o número que o livro dá (20 linhas / 150 colunas); não é contradição, ver (c). A frase "Código é escrito para humanos. Computadores apenas o executam." não aparece neste bloco (temas próximos: p.23 "Somos Autores" e p.33 "clareza é fundamental").

### (c) Lacunas: conteúdo relevante deste bloco que a skill não cobre
Nomes (Cap.2):
- Pronunciáveis; buscáveis; tamanho do nome proporcional ao escopo; nomes de uma letra só em escopo minúsculo (p.30-32).
- Evitar codificações (notação húngara, prefixo m_, prefixo I em interface) (p.32-33).
- Evitar mapeamento mental; evitar l/O; evitar desinformação (accountList que não é List, hp/aix) (p.28-29, 33).
- Distinções significativas, sem números sequenciais e sem palavras vazias (a1/a2, ProductInfo/ProductData, NameString) (p.29-30).
- Classes = substantivos; métodos = verbos; get/set/is; factory estática no lugar de construtor sobrecarregado (p.34).
- Uma palavra por conceito; sem trocadilhos (add) (p.35).
- Domínio da solução x domínio do problema (p.35-36).
- Contexto significativo (extrair classe, ex.: Address, GuessStatisticsMessage) e não adicionar contexto desnecessário (prefixo GSD) (p.36-38).
- Renomear sem medo; o exemplo getThem -> getFlaggedCells -> Cell.isFlagged() (p.27-28), que a skill poderia usar como exemplo adicional.
Funções (Cap.3):
- Tamanho numérico (20 linhas, 150 colunas), blocos de uma linha, 1-2 níveis (p.43-44).
- Um nível de abstração por função, Regra Decrescente, parágrafos TO (p.44-46).
- Switch: aceitável uma vez, escondido em abstract factory com polimorfismo; violação de SRP/OCP (p.46-47).
- Nomes longos descritivos e consistência de fraseologia (p.48).
- Parâmetros: mônade (3 formas), booleanos (dividir em duas funções), díades e como convertê-las, tríades, parâmetros de saída (p.48-52).
- Efeitos colaterais e acoplamento temporal (checkPassword) (p.51-52).
- Separação comando-consulta (p.52-53).
- Extrair try/catch; "tratamento de erro é uma coisa só"; enum Error como chamariz de dependência (p.54-55).
- Programação estruturada: múltiplos return ok em funções pequenas; evitar goto (p.55-56).
- Processo: rascunho -> refino com testes (p.56). Útil para testing-tdd-expert e refactoring-expert.
Comentários (Cap.4):
- Catálogo completo de comentários bons e ruins (ver Cap.4 acima); a skill só tem 1 exemplo de ruim e 4 permitidos próprios (p.61-77).
- Comentários mentem/envelhecem; comentário impreciso é pior que nenhum (p.60); TODO deve ser varrido (p.65); comentário de chave de fechamento como sinal para reduzir função (p.73); autoria/histórico/código comentado vão para o controle de versão (p.69-70, 74-75); Javadoc em API pública sim, em código interno não (p.65, 77).
- Exemplo antes/depois GeneratePrimes -> PrimeGenerator (p.77-80) para references/before-after.md.
Cap.1:
- Regras de Beck/Jeffries (testes passam, sem duplicação, expressividade, mínimo de entidades) (p.20).
- Custo da bagunça e curva de produtividade; falso dilema prazo x qualidade (p.14-16).
- Leitura:escrita 10:1 (p.23); definições de código limpo (Stroustrup, Booch, Thomas, Feathers, Cunningham) (p.17-21); janelas quebradas (p.17).
- Aviso do próprio livro: é uma "escola" e algumas recomendações podem ser contraditórias com outras (p.22); a skill usa tom absoluto ("Rejeite soluções que...").
Para outros artefatos:
- refactoring-expert: Extrair Método e "mudar nome várias vezes" (p.20), substituição de switch por polimorfismo (p.46-47), refatorar com testes (p.56), Regra do Escoteiro (p.24).
- testing-tdd-expert: código sem testes não é limpo (p.19), regra 1 de Beck (p.20), difícil testar muitos argumentos (p.49), rascunho refinado com testes (p.56). Sem catálogo de testes limpos neste bloco.
- code-review-expert: catálogos de comentários ruins (p.65-77) e de nomes ruins (Cap.2) são checklists prontos.

---

## Bloco 02_p081-160 (lido: PDF p.?)

- **Capítulo 5: Formatação (PDF p.81-97; impr. 75-91)**
  - Relevância: clean-code-expert: ALTA (a skill atual não tem seção de formatação); code-review-expert: MÉDIA (critérios objetivos para revisão de estilo); refactoring-expert: BAIXA; testing-tdd-expert: NENHUMA.
  - Decisão sugerida: usar em clean-code-expert (nova reference `formatting.md`: metáfora do jornal, densidade/distância/ordenação vertical, limite horizontal 100-120, regra de equipe com formatter automático); breve menção em code-review-expert.
- **Capítulo 6: Objetos e Estruturas de Dados (PDF p.98-106; impr. 93-101)**
  - Relevância: clean-code-expert: ALTA (objetos vs estruturas, Demeter, híbridos); code-review-expert: ALTA (sinais de híbridos, train wrecks, Active Record com regra); refactoring-expert: MÉDIA (sai de train wreck para "tell, don't ask"); testing-tdd-expert: NENHUMA.
  - Decisão sugerida: usar em clean-code-expert (reference `objects-and-data-structures.md`) e corrigir o exemplo de Demeter da skill; sinais de revisão em code-review-expert.
- **Capítulo 7: Tratamento de Erro (PDF p.107-116; impr. 103-112) (por Michael Feathers)**
  - Relevância: clean-code-expert: ALTA (a skill tem seção curta); code-review-expert: ALTA (null, catch genérico, error codes); refactoring-expert: MÉDIA (Special Case, wrap de API); testing-tdd-expert: MÉDIA (try/catch com TDD, testes que forçam exceção).
  - Decisão sugerida: usar em clean-code-expert (reference `error-handling.md`) e code-review-expert; Special Case e try-first em refactoring/testing.
- **Capítulo 8: Limites (PDF p.117-123; impr. 113-119) (por James Grenning)**
  - Relevância: clean-code-expert: MÉDIA; testing-tdd-expert: ALTA (testes de aprendizagem, boundary tests, fakes); refactoring-expert: MÉDIA (wrap/Adapter de API externa); code-review-expert: MÉDIA (sinal: tipo de biblioteca vazando).
  - Decisão sugerida: usar em testing-tdd-expert (learning tests) e clean-code-expert (limites, ref `boundaries.md`).
- **Capítulo 9: Testes de Unidade (PDF p.124-135; impr. 121-132)**
  - Relevância: testing-tdd-expert: ALTA (quase todo o capítulo); clean-code-expert: ALTA (seção testes limpos da skill); code-review-expert: MÉDIA (critérios para revisar testes); refactoring-expert: MÉDIA (refatorar testes, rede de segurança).
  - Decisão sugerida: usar em testing-tdd-expert (três leis, F.I.R.S.T., construir-operar-verificar, DSL, padrão duplo, um conceito por teste) e referenciar na skill clean-code.
- **Capítulo 10: Classes (PDF p.136-151; impr. 133-148) (com Jeff Langr)**
  - Relevância: clean-code-expert: ALTA (a skill tem só um item de "classes gigantes"); refactoring-expert: ALTA (split por responsabilidade, refatorar em passos com testes, quando extrair classe); testing-tdd-expert: MÉDIA (DIP/stub, refatorar com suíte); code-review-expert: ALTA (teste de 25 palavras, nome Manager, coesão).
  - Decisão sugerida: usar em clean-code-expert (reference `classes.md`), refactoring-expert (passos incrementais com testes, SRP/OCP) e code-review-expert (checagens de classe).
- **Capítulo 11: Sistemas (PDF p.152-160; impr. 149-157) (por Dr. Kevin Dean Wampler) [continua no próximo bloco]**
  - Relevância: clean-code-expert: MÉDIA (separar construção e uso); testing-tdd-expert: MÉDIA (DI facilita testes); refactoring-expert: BAIXA; code-review-expert: MÉDIA (lazy init espalhado, new em lógica de negócio). Para clean-architecture-expert (fora do foco): ALTA.
  - Decisão sugerida: usar em clean-code-expert (`systems.md`: separar construção/uso, DI) ao final de integrar o bloco seguinte; sinais de revisão em code-review-expert.

### Auditoria da skill atual (trecho das notas)

Referência: `skills/clean-code-expert/SKILL.md` (v1.0) e `references/before-after.md`. Só avalio o que este bloco (Caps. 5-10 inteiros e Cap. 11 até p.160) permite.

### (a) Afirmações da skill confirmadas neste bloco
- "Tratamento de Erros: separe lógica de negócio de tratamento de erro" e usar exceção em vez de sinalizadores: Cap. 7, p.108-109 (algoritmo e tratamento "duas preocupações que estavam intrincadas... agora estão separadas") e p.116.
- "Evite como sinalizadores de erro: `return -1; return null; return false`": Cap. 7, p.108 (flag de erro ou código de retorno entopem o chamador) e p.114-115 (não retornar null).
- Before-after nº 5 (trocar retorno nulo por exceção `CustomerNotFoundException`): consistente com p.114-115 (lançar exceção ou objeto Special Case).
- Anti-padrão "funções ou classes gigantes com múltiplas responsabilidades": Cap. 10, p.137-140 (SRP, classes pequenas).
- Evitar nomes genéricos como `manager`, `processor`: Cap. 10, p.139 (Processador, Gerenciador, Super indicam acúmulo de responsabilidades) [a skill usa para nomes em geral; o livro aqui aplica a nomes de classes].
- "Dependências externas devem ser abstraídas; código de negócio deve rodar sem banco, fila, API ou framework": Cap. 10, p.150-151 (DIP, Portfolio com interface StockExchange e stub); Cap. 8, p.122-123 (limite limpo com Adapter/Fake); Cap. 11, p.153-154 (acoplar `new` concreto dificulta teste).
- Estrutura given/when/then: Cap. 9, p.133 (convenção "dado-quando-então" para legibilidade).
- "Todo código deve ser escrito pensando em testes": Cap. 9, p.135 (Timely: criar testes imediatamente antes do código de produção, senão o código pode ficar difícil de testar).
- "Separar responsabilidades / misturar responsabilidades em uma função" (anti-padrão): Cap. 11, p.154 (construção + uso viola SRP).
- Código de teste deve ser claro/limpo: Cap. 9, p.127 (a skill só diz "Testes Limpos" por given/when/then; o livro confirma o princípio e vai além).

### (b) Afirmações da skill NÃO suportadas ou contraditas neste bloco
- SKILL.md, seção "Lei de Demeter": `// Prefira customer.getCompanyCityName();`. O livro rejeita essa solução como regra geral: p.104 diz que a primeira opção (um método no objeto que devolve o dado profundo, tipo `ctxt.getAbsolutePathOfScratchDirectoryOption()`) "poderia levar a uma abundância de métodos no objeto" e a segunda "presume que ... retorna uma estrutura de dados". A recomendação é perguntar qual é a intenção e mandar o objeto fazer a ação (`ctxt.createScratchFileStream(...)`). Além disso, p.103 diz que a lei só se aplica se os elementos forem objetos; se forem estruturas de dados, "aqui não se aplica a lei". A skill apresenta como regra incondicional e com a solução "getter composto", o que é uma simplificação que contradiz parcialmente o texto.
- SKILL.md, "Objetos ao invés de Primitivos" (Email, CPF, Money...): este bloco não menciona Value Objects nem essa recomendação. NÃO SUPORTADO por este bloco (pode estar em outro bloco; não avalio). O Cap. 6 fala de abstração de dados, que é outro assunto.
- before-after.md nº 3 (guard clauses): o exemplo `if (subscription == null) return;` aceita null silenciosamente. O Cap. 7 (p.115-116) diz para evitar passar null por padrão e que verificar null só empurra o problema ("o que ele deve fazer?"); o exemplo contradiz o espírito (checar null no parâmetro) embora não seja a tese do exemplo. Tensão, não contradição direta.
- SKILL.md: "Argumentos: ideal 0–2, aceitável 3, evite 4+" e "Evite else quando possível", "Boy Scout Rule", "Comentários": não verificáveis neste bloco (ficam em outros capítulos); NÃO suportados aqui, não contraditos.
- SKILL.md: "Testes: ... Todo código deve ser escrito pensando em testes" é verdadeiro no espírito (p.135), mas a skill omite que o livro propõe TDD estrito (três leis) e que "um conceito por teste" é a regra, não "um assert" (p.134). Não há contradição; só incompletude, listada em (c).

### (c) Lacunas: conteúdo relevante deste bloco que a skill não cobre
Formatação (Cap. 5): a skill não tem nenhuma seção de formatação. Falta: metáfora do jornal, espaçamento e continuidade vertical, distância vertical (variáveis perto do uso, instâncias no topo, funções dependentes e chamadora acima), afinidade conceitual, ordenação vertical, limite horizontal (100-120 colunas; o autor usa 120), espaçamento horizontal e precedência, não alinhar declarações, endentação sempre (sem colapsar escopos), regra de equipe com formatter automático [p.82-95].
Objetos e estruturas de dados (Cap. 6): falta a anti-simetria (OO fácil para novos tipos, procedimental fácil para novas funções), abstração de dados vs getters/setters, híbridos, "tell, don't ask" via exemplo, train wrecks com condição de aplicabilidade da Lei de Demeter, DTO, Active Record sem regras de negócio [p.98-106].
Tratamento de erro (Cap. 7): faltam try-catch-finally primeiro com TDD, exceções não verificadas e o motivo (violação de OCP/encapsulamento), contexto nas exceções, classes de exceção definidas pela necessidade do chamador, wrappers de API de terceiros, padrão Special Case, retornar lista vazia, "não passe null" [p.108-116].
Limites (Cap. 8): falta todo o capítulo (wrapper em volta de Map/biblioteca, testes de aprendizagem, interface desejada + Adapter para código inexistente, Fake) [p.118-123]. Alta relevância para testing-tdd-expert.
Testes (Cap. 9): faltam três leis do TDD, testes como cidadãos de primeira classe, "os testes habilitam as -idades", construir-operar-verificar, DSL de teste, padrão duplo (eficiência pode ser sacrificada, clareza nunca), um conceito por teste/minimizar asserts, F.I.R.S.T. [p.125-135].
Classes (Cap. 10): faltam organização da classe, encapsulamento com exceção para testes, medir tamanho por responsabilidades, teste das ~25 palavras sem "se/e/ou/mas", SRP, coesão como sinal para dividir, extração de variáveis de instância como causa de perda de coesão, refatoração incremental protegida por testes (PrimePrinter), sinal de abertura de classe para aplicar OCP (Sql/UpdateSql), DIP com stub (Portfolio) [p.137-151].
Sistemas (Cap. 11, parcial): falta separar construção de uso (Main, factories, DI, problema de lazy initialization espalhada), crescimento gradual da arquitetura, EJB2 como contra-exemplo, preocupações transversais (início) [p.153-160]. O restante do capítulo está no próximo bloco.

---

## Bloco 03_p161-240 (lido: PDF p.?)

- **Cap. 11: Sistemas, parte final (PDF p.161-167, impr. 158-164) [continua do bloco anterior] (OCR: MÉDIA; prosa legível, código Java/XML RUIM)**
  - Relevância: clean-code-expert: MÉDIA (POJOs, não-invasividade e testabilidade da arquitetura); refactoring-expert: BAIXA; testing-tdd-expert: MÉDIA (POJOs testáveis; arquitetura "testável"); code-review-expert: BAIXA.
  - Decisão sugerida: usar em clean-code-expert/references (seção "Sistemas": domínio em POJOs, adiar decisões, sem BDUF, DSL para legibilidade). Código XML/Java do capítulo: descartar (ilegível e datado).
- **Cap. 12: Emergência (PDF p.168-173, impr. 165-170) (OCR: prosa BOA; trechos de código MÉDIA)**
  - Relevância: clean-code-expert: ALTA (4 regras, duplicação, expressividade, contrapeso contra excesso de classes); refactoring-expert: ALTA (testes como pré-condição, ordem das regras, extração de método, Template Method); testing-tdd-expert: ALTA (testabilidade guia o design; testes removem medo); code-review-expert: MÉDIA (critérios de revisão: duplicação, expressividade, dogmatismo).
  - Decisão sugerida: usar em clean-code-expert (SKILL.md: lista das 4 regras em ordem; references: duplicação e Template Method, ressalva anti-dogmatismo), refactoring-expert (ordem de prioridade e uso de testes como rede), testing-tdd-expert (regra 1), code-review-expert (checklist de expressividade/duplicação).
- **Cap. 13: Concorrência (PDF p.174-187, impr. 171-184) (OCR: prosa BOA/MÉDIA; código curto MÉDIA)**
  - Relevância: clean-code-expert: BAIXA/MÉDIA (SRP para concorrência, POJOs); refactoring-expert: BAIXA; testing-tdd-expert: ALTA para testes de código com threads (regras de teste, instrumentação, portabilidade); code-review-expert: MÉDIA (checklist: escopo de dados compartilhados, seções sincronizadas, dependência entre métodos sincronizados).
  - Decisão sugerida: usar em um reference de concorrência (nova skill/arquivo) e em testing-tdd-expert (estratégias de teste de threads); em code-review-expert como checklist de revisão de código concorrente. Detalhes Java 5: citar como exemplos, não como regra universal.
- **Cap. 14: Refinamento Sucessivo (PDF p.188-240, impr. 185-237) [continua no próximo bloco] (OCR: prosa BOA; código Java RUIM, quase todo corrompido)**
  - Relevância: clean-code-expert: ALTA (processo "sujo e depois limpar", nomes redundantes, parâmetros demais, tratamento de erros em classe própria, polimorfismo no lugar de if/else); refactoring-expert: ALTA (passos pequenos com testes, mudança paralela antes de remover o antigo, migração incremental, parar de adicionar feature e refatorar); testing-tdd-expert: ALTA (testes unitários + aceitação como rede, lição de rodar ambos, teste-primeiro ao adicionar double); code-review-expert: MÉDIA (sinais de que a bagunça cresce: variáveis demais, cadeias de tipo, tratamento de erro misturado).
  - Decisão sugerida: usar em refactoring-expert (receita passo a passo "mudança paralela, migrar, apagar", critério de parada e rede de testes) e testing-tdd-expert (acompanhar com testes de aceitação além dos unitários); em clean-code-expert (princípio de refinamento sucessivo, tratamento de erros isolado). Não copiar listagens de código (ilegíveis e de direitos autorais).

### Auditoria da skill atual (trecho das notas)

Referência avaliada: `skills/clean-code-expert/SKILL.md` e `references/before-after.md`. Só se avaliam afirmações que este bloco (Cap. 11 final, 12, 13, 14 parcial) permite verificar.

### (a) Afirmações da skill confirmadas neste bloco
- "Eliminar Duplicação": identificar o padrão, extrair a abstração e centralizar o comportamento. Confirmado: duplicação é "o inimigo principal"; extrair `replaceImage` e usar Template Method [PDF 170-172].
- Anti-padrão "Contenham lógica duplicada" [PDF 170].
- Nomes que revelam intenção; funções e classes pequenas fáceis de nomear/entender. Confirmado em Expressividade: "bons nomes", classes e funções pequenas [PDF 172-173].
- "Todo código deve ser escrito pensando em testes / código de negócio deve rodar sem banco, fila, API ou framework." Consistente com: sistemas testáveis levam a SRP, DIP, injeção de dependência; POJOs sem dependência de framework; código sem thread testado fora do ambiente de threads [PDF 161, 169, 183-184].
- Boy Scout Rule (melhorar um pouco sempre): o espírito aparece em "a cada linha nova... parar e refletir; limpar e rodar os testes" [PDF 169] e no refinamento incremental [PDF 195, 207-208]. O nome "Boy Scout" não aparece neste bloco.
- "Separe lógica de negócio de tratamento de erro": o Cap. 14 isola exceções/códigos de erro em `ArgsException` e considera o código de exceção "horrível" dentro de `Args` [PDF 236-239]; o Cap. 11 separa preocupações transversais da lógica de domínio [PDF 161-165].
- "Sejam difíceis de testar por acoplamento com infraestrutura" como anti-padrão: confirmado por acoplamento forte dificultar testes [PDF 169].
- Testes como documentação: não está na skill, mas o given/when/then só é compatível com "testes bem escritos são expressivos" [PDF 173]; a estrutura given/when/then em si NÃO aparece (ver b).

### (b) Afirmações da skill NÃO suportadas ou contraditas neste bloco
- Nenhuma contradição direta encontrada. Pontos que este bloco não permite confirmar (não suportados aqui; podem estar em outros blocos):
  - Estrutura "given/when/then" para nomes de testes: os testes de `Args` usam nomes como `testSimpleDoublePresent`, `testMissingStringArgument` (estilo `test...`) e padrão `try/fail/catch` [PDF 234-240]. Não há menção a given/when/then.
  - "Evite else": o código refatorado final mantém cadeias `if ... else if` em `parseSchemaElement` [PDF 234]. O livro, neste bloco, só elimina a cadeia `if/else` de tipos em `setArgument` (por polimorfismo) [PDF 228-233]; não formula regra geral contra `else`.
  - "Argumentos: ideal 0-2, aceitável 3, evite 4+" e "Guard Clauses": não aparecem como regra aqui. Há só indícios: preferir passar um parâmetro em vez de dois por "sujar o código" [PDF 227] e `if (m == null) return false;` antes do `try` [PDF 228].
  - "Lei de Demeter", "Objetos ao invés de primitivos" (`Email`, `CPF`), "Funções fazem apenas uma coisa", "Comentários escondem código ruim", "retornar null/-1/false é ruim": sem suporte nem contradição neste bloco. Observação: o código do livro neste bloco retorna `false`/0/"" por padrão em `getBoolean/getInt/getString` quando não há argumento (o autor usa esse comportamento como garantido pelos testes de aceitação [PDF 219-220]); o bloco não discute isso como smell.
- Tensão (nuance, não contradição): a skill recomenda dividir em funções como `validateCustomer(); calculateDiscount(); ...` e lista "funções ou classes gigantes" como anti-padrão sem contrapeso; o Cap. 12 PDF 173 diz que a regra 4 (minimizar classes/métodos) existe porque dividir demais gera "estruturas minúsculas" e dogmatismo.

### (c) Lacunas: conteúdo relevante deste bloco que a skill não cobre
- As quatro regras do Projeto Simples (Kent Beck) em ordem de prioridade (testes, sem duplicação, expressividade, minimizar classes/métodos) [PDF 169-173]. A skill só cobre duplicação e testabilidade, sem ordem de prioridade.
- Contrapeso anti-dogmatismo: evitar interface para cada classe e divisão obrigatória dados/comportamento; regra 4 tem a menor prioridade [PDF 173]. A skill só avisa contra classes grandes.
- Formas de duplicação: duplicação de implementação (`isEmpty` via `size`), semelhança quase idêntica a ser aproximada, "pequena reutilização" que revela SRP, Template Method para duplicação de alto nível [PDF 170-172].
- Expressividade além de nomes: nomenclatura padrão (nomes de padrões), testes como documentação, "tentar", "cuidar" do código [PDF 172-173].
- Refatoração segura: testes como pré-condição, passos pequenos, manter sistema operante, mudança paralela (novo mapa ao lado dos três antigos), migrar e só então remover, consertar quebras imediatamente, parar de adicionar features quando a bagunça cresce, "criar sujo e depois limpar" [PDF 169, 195, 207-221, 230]. A skill não tem nenhum fluxo de refatoração.
- Testes de aceitação além dos unitários e a lição de rodar ambos [PDF 207-208, 219-220]; teste antes de adicionar novo tipo [PDF 234].
- Polimorfismo no lugar de cadeia de tipos (if/else por tipo) e uma `interface` pequena para estender [PDF 228-234].
- Tratamento de erros: concentrar exceções e códigos/mensagens em classe própria de exceção [PDF 236-239]; a skill só diz "throw new XException vs retornar -1/null/false".
- Nomes: nome de variável muito longo e redundante que "bagunça a função" foi encurtado (`am`) [PDF 209], mostrando que clareza pode exigir nome curto em escopo pequeno; a skill só fala em nomes genéricos.
- Sistemas: POJOs para a lógica de domínio, injeção de dependência, aspectos, evitar BDUF, adiar decisões, DSL, usar padrões com sabedoria [PDF 161-166]. A skill não tem seção de sistemas (e hoje essas ideias cruzam com clean-architecture-expert).
- Concorrência inteira: SRP de concorrência, limitar dados compartilhados, cópias, threads independentes, seções sincronizadas mínimas, dependência entre métodos sincronizados, desligamento, testes com instrumentação/jiggle, portabilidade/ajuste, plataformas diferentes [PDF 175-187]. A skill não cobre.
- Heurística de revisão: sinais da bagunça crescente (muitas variáveis de instância, strings mágicas como "TILT", try/catch amontoados, cadeia de tipos) [PDF 201].

---

## Bloco 04_p241-320 (lido: PDF p.241-320)

- **Cap. 14: Refinamento Sucessivo, parte final (PDF p.241-247, impr. 240-246) [continua do bloco anterior]**
  - Relevância: clean-code-expert: MÉDIA (argumento de custo de código ruim, SRP vs conveniência); refactoring-expert: MÉDIA (refatorar cedo é mais barato); testing-tdd-expert: BAIXA; code-review-expert: BAIXA.
  - Decisão sugerida: usar o argumento "limpar cedo é barato" em clean-code-expert/refactoring-expert; descartar o código.
- **Cap. 15: Características Internas do JUnit (cabeçalho de página diz "Testes de Unidade") (PDF p.248-262, impr. 247-261)**
  - Relevância: clean-code-expert: ALTA (nomes, condicionais, acoplamento temporal, Regra de Escoteiro, funções); refactoring-expert: ALTA (processo incremental com testes, reverter decisões, usar testes para validar remoção); testing-tdd-expert: MÉDIA (cobertura 100% como rede de segurança); code-review-expert: MÉDIA (exemplos de smells concretos).
  - Decisão sugerida: usar em clean-code-expert (exemplos de aplicação de G28/G29/N7/G31) e refactoring-expert (fluxo incremental com testes). Código das listagens: descartar.
- **Cap. 16: Refatorando o SerialDate (PDF p.263-279, impr. 263-279)**
  - Relevância: clean-code-expert: ALTA (nomes, enums vs constantes, flags, comentários, estático/instância); refactoring-expert: ALTA (fluxo testes primeiro, Clover, rodar todos os testes a cada mudança, mover método, extract method, rename, explaining variable); testing-tdd-expert: ALTA (cobertura como guia, testes comentados expõem comportamento esperado, T1/T2/T5/T7/T8 em ação); code-review-expert: ALTA (modelo de revisão: cada achado ligado a heurística).
  - Decisão sugerida: usar em refactoring-expert (fluxo em duas fases e catálogo de movimentos), testing-tdd-expert (cobertura/bugs de limite) e code-review-expert (como relatar achados com heurística). Descartar o código.
- **Cap. 17: Odores e Heurísticas (PDF p.280-309, impr. 281-310) [conclusão truncada; continua no próximo bloco ou foi cortada]**
  - Relevância: clean-code-expert: ALTA (principal fonte de regras); refactoring-expert: ALTA (smells G/F/C/N como gatilhos de refatoração); testing-tdd-expert: ALTA (T1-T9, E2); code-review-expert: ALTA (checklist de smells com códigos).
  - Decisão sugerida: criar references (ex.: smells-heuristicas.md) com o catálogo C/E/F/G/J/N/T em paráfrase; usar em clean-code-expert, refactoring-expert, testing-tdd-expert (T1-T9, E2) e code-review-expert (checklist). J1 é específico de Java: sinalizar ou descartar.
- **Apêndice A: Concorrência II (PDF p.310-320, impr. 313-323) [continua no próximo bloco]**
  - Relevância: clean-code-expert: BAIXA a MÉDIA (SRP aplicado a concorrência, apenas ponte para classes/sistemas); refactoring-expert: BAIXA; testing-tdd-expert: BAIXA (separar threads para testar o resto); code-review-expert: BAIXA.
  - Decisão sugerida: descartar em geral; no máximo uma linha em clean-code-expert/skill de concorrência ("isolar gerenciamento de threads em um lugar").

### Auditoria da skill atual (trecho das notas)

Skill avaliada: `skills/clean-code-expert/SKILL.md` (v1.0) e `references/before-after.md`. Páginas são PDF p. com impr. quando útil.

### (a) Afirmações da skill confirmadas neste bloco
- "Funções devem fazer apenas uma coisa" / dividir quando há "primeiro faz isso, depois aquilo": confirmado por G30 e pelo exemplo pay() em 3 funções (PDF p.296-297). O exemplo de before-after.md n.2 (processOrder em validate/apply/save/notify) é coerente com G30/G34.
- "Argumentos: ideal 0-2, aceitável 3, evite 4+": F1 diz nenhum é melhor, depois um, dois e três; mais que isso questionável, evitar (PDF p.283). Compatível. (O agrupamento em Request/Command/DTO não é citado neste bloco.)
- "Lei de Demeter, evite navegação profunda": G36 (PDF p.301), com a sugestão de colaboradores imediatos oferecerem o serviço.
- "Comentários frequentemente escondem código ruim; proibido `counter++; // incrementa`": C3 usa o exemplo `i++; // incrementa i` e diz comentário deve informar o que o código não consegue sozinho (PDF p.281). Regra "comentário óbvio é proibido" confirmada.
- "Nunca mantenha métodos não utilizados, classes abandonadas, código comentado; controle de versão existe": F4, G9, G12, C5 (PDF p.282-283, 286-287).
- "Eliminar duplicação: identificar padrão, extrair abstração, centralizar": G5 (PDF p.284-285), que inclusive vincula a polimorfismo/Template Method/Strategy.
- "Tratamento de erros: lançar exceção em vez de retornar -1/null/false": Cap. 16 troca retorno de string/código de erro por IllegalArgumentException (PDF p.266, 271).
- "Objetos em vez de primitivos" (parcial): G26 recomenda classe Money com inteiros em vez de ponto flutuante (nota 11, PDF p.295); Cap. 16 e J3 substituem int por enum (PDF p.267, 270-271, 303). Os exemplos Email/CPF não aparecem aqui.
- "Boy Scout Rule: deixar o código melhor que encontrou": PDF p.253, 262, 279 (cap. 15 e 16 terminam com a Regra de Escoteiro). A skill diz que "melhorar um nome, remover duplicação..." já conta; o livro diz "um pouco mais limpo" (PDF p.262).
- Nomes devem revelar intenção/contexto: N1, N2, N4, N7 (PDF p.304-308), N1 com a frase de 90% da legibilidade.
- "Código de negócio deve rodar sem banco, fila, API ou framework / dependências abstraídas": apenas apoio indireto: PDF p.313 diz que separar o gerenciamento de threads facilita testar as outras responsabilidades. Não confirma a afirmação geral.
- Anti-padrão "funções ou classes gigantes com múltiplas responsabilidades": SRP aplicado em ArgsException (PDF p.246) e em servidor concorrente (PDF p.312-313).

### (b) Afirmações da skill NÃO suportadas ou contraditas neste bloco
- "Evite else quando possível" e "Guard Clauses em vez de aninhamento profundo" (SKILL.md seções Estrutura e Legibilidade): nada neste bloco defende isso. No cap. 15 o autor escreve deliberadamente um if/else positivo (`if (canBeCompacted()) {...} else {...}`, PDF p.254) para evitar condição negativa (G29, PDF p.296: "if (buffer.shouldCompact())" melhor que "if (!buffer.shouldNotCompact())"). Os exemplos da skill (`if (!isValid()) return;`, before-after.md n.3 com `!subscription.isActive()` e `!subscription.canBeCancelled()`) usam negações, em tensão com G29. Não é contradição direta (guard clause é outro assunto), mas a skill apresenta como regra algo que este bloco não suporta.
- "Booleanos devem responder perguntas: isActive/hasPermission/canCancel; evite flag/status/check" (SKILL.md Nomes): nada disto no bloco. Em sentido oposto, F3/G15 condenam booleano como argumento (PDF p.283, 289-290), assunto que a skill não trata.
- "Evitar sem contexto claro: data, info, temp, obj, manager, helper, util, processor, service": lista não aparece no bloco; N1 só exige nomes descritivos (PDF p.304).
- "Todo código deve ser escrito pensando em testes" e "estrutura given/when/then" (nomes givenX/whenY/thenZ): o bloco não cobre. As listagens de testes usam nomenclatura testXxx (PDF p.241-250). Não é contradição, só sem suporte.
- "Comentários Permitidos: regras de negócio complexas, decisões arquiteturais, limitações externas, workarounds documentados": este bloco só diz que comentários devem informar o que o código não consegue (C3) e que informações como histórico/autoria vão para controle de versão (C1); a lista de permitidos da skill não é do livro neste bloco.
- before-after.md n.6 mantém `customer.isActive() && customer.hasAdminRole()` inline no if. G28 (PDF p.296) recomenda extrair função que explique o propósito da condicional (ex.: shouldBeDeleted(timer)). Exemplo da skill não aplica G28.
- before-after.md n.5 (`orElseThrow`) e n.4 (record Email): código moderno específico de Java; o livro (Java 5 era) não os cobre; não suportado nem contradito.
- Regra "Funções pequenas / processOrder com centenas de linhas": não há número de linhas neste bloco.

### (c) Lacunas: conteúdo relevante deste bloco que a skill não cobre
- Catálogo de smells/heurísticas: Comentários C1-C5 (só C3/C5 parcialmente cobertos), Ambiente E1-E2 (build e testes em um comando), Funções F2 (parâmetros de saída) e F3 (parâmetros lógicos/seletores G15), Geral G1-G36, Java J1-J3, Nomes N1-N7, Testes T1-T9. A skill cobre menos de um terço.
- Nomes: nível apropriado de abstração (N2, Modem.dial vs connect), nomenclatura padrão/ linguagem do projeto (N3), ambiguidade (N4), nome proporcional ao escopo (N5), sem codificações/prefixos húngaros (N6), nomes que descrevem efeitos colaterais (N7, createOrReturnOos).
- Funções: descer um único nível de abstração (G34), encapsular condicionais (G28), evitar negativas (G29), acoplamento temporal oculto (G31, "bucket brigade"), encapsular condições de limite (G33), variáveis explicativas (G19), nomes que dizem o que fazem (G20), propósito obscuro (G16), responsabilidade mal posicionada (G17), entender o algoritmo (G21), dependências lógicas viram físicas (G22).
- Objetos e dados: Feature Envy e seu contraexemplo (G14), estático inadequado (G18), acoplamento artificial (G13), informações excessivas/interfaces mínimas (G8), classes base não conhecem derivadas e nível errado de abstração (G6, G7), enum em vez de constantes int (J3) e não herdar constantes (J2).
- Estrutura acima de convenção (G27), polimorfismo em vez de if/switch com regra "UM SWITCH" (G23), números mágicos com exceções (G25), precisão (G26: dinheiro, null, concorrência), configuração em nível alto (G35), não ser arbitrário (G32), separação vertical (G10), inconsistência (G11), entulho (G12), seguranças anuladas (G4), comportamento óbvio não implementado (G2), múltiplas linguagens em um arquivo (G1).
- Testes: T1-T9 (cobertura, ferramenta de cobertura, testes triviais, teste ignorado como pergunta sobre requisito, limites, bugs próximos, padrões de falha e de cobertura, testes rápidos) e E2. A skill só fala de testabilidade e given/when/then.
- Processo de refatoração (refactoring-expert): cap. 15 e 16 mostram fluxo "primeiro faça funcionar com testes e cobertura, depois torne certo", rodar todos os testes a cada mudança, usar testes e cobertura para achar bugs de limite, técnica de comentar código suspeito e rodar testes para provar que é desnecessário, reverter decisões anteriores é normal, não polir código que ninguém usa (verificar usuários antes). A skill não tem nenhum fluxo de refatoração.
- Revisão de código (code-review-expert): cap. 16 como modelo de revisão profissional em que cada achado é amarrado a uma heurística nomeada; o catálogo com códigos é um checklist pronto.
- Argumento de custo: código ruim degrada o projeto mais que cronograma/requisito/dinâmica ruim, limpar depois é caro (PDF p.247). Falta justificativa econômica.
- Concorrência (apêndice, baixa prioridade): isolar gerenciamento de threads (SRP), `++` não atômico, Executor/Atomic*.
- Observação: para a skill que diz "Aplicar Guard Clauses" e "Evite else", nenhum trecho deste bloco apoia; avaliar em outros blocos antes de concluir.

---

## Bloco 05_p321-398 (lido: PDF p.?)

- **Apêndice A: Concorrência II (fim) (PDF p.321-335, impr. 324-338) [continua do bloco anterior]**
  - Relevância para os artefatos candidatos: clean-code-expert: MÉDIA (sem seção de concorrência na skill; mas o assunto é parte do livro); code-review-expert: MÉDIA (checklist de revisão: operações compostas em coleções seguras, bloqueio no servidor, escopo de synchronized); testing-tdd-expert: MÉDIA (estratégias para expor bugs de threads, limites de testes não determinísticos); refactoring-expert: BAIXA.
  - Decisão sugerida: usar em references/ de clean-code-expert (concorrência) ou como checklist em code-review-expert; resumir sem copiar código.
- **Apêndice A: Tutorial: Exemplos com códigos completos (PDF p.336-340, impr. 339-343)**
  - Relevância: todos os artefatos: BAIXA.
  - Decisão sugerida: descartar (código corrompido, sem prosa).
- **Apêndice B: org.jfree.date.SerialDate (PDF p.341-394, impr. 345-398)**
  - Relevância para os artefatos candidatos: refactoring-expert: MÉDIA (exemplo de estado final: enums no lugar de constantes int, factory, variáveis explicativas, remoção de Javadoc redundante; mas sem rationale, usar só junto ao capítulo 16); clean-code-expert: MÉDIA (exemplos concretos para references/before-after.md, só após confirmar no capítulo 16); testing-tdd-expert: BAIXA a MÉDIA (testes exaustivos de borda em B-4); code-review-expert: BAIXA.
  - Decisão sugerida: usar apenas como inspiração de exemplos curtos reescritos (nunca copiar listagens) e ligar ao bloco do capítulo 16; descartar o restante.
- **Apêndice C: Referência Cruzada das Heurísticas (PDF p.395-396, impr. ~399-400)**
  - Relevância: todos: BAIXA (índice).
  - Decisão sugerida: descartar neste bloco; usar o capítulo 17 original.
- **Epílogo (PDF p.397)**
  - Relevância: testing-tdd-expert: BAIXA (só contexto motivacional); clean-code-expert: BAIXA (a "Regra Máxima"/mentalidade de cuidado da skill é compatível em espírito, mas o texto não fala em "alguém que se importa").
  - Decisão sugerida: descartar (anedota).
- **Capítulo 3: Funções, página solta (PDF p.398, impr. 42) [fora de ordem: continua de bloco anterior e o fim não está neste bloco]**
  - Relevância: clean-code-expert: ALTA (argumentos e nomes de funções); refactoring-expert: MÉDIA (Introduce Parameter Object, sem usar o nome); code-review-expert: MÉDIA.
  - Decisão sugerida: usar em clean-code-expert (seção Funções); confirmar o texto completo no bloco do capítulo 3.

### Auditoria da skill atual (trecho das notas)

Skill auditada: skills\clean-code-expert\SKILL.md (v1.0) e references\before-after.md. Este bloco é pobre em conteúdo de Clean Code (só uma página do capítulo 3, código do Apêndice B sem prosa, concorrência, epílogo); por isso poucas afirmações podem ser avaliadas.

### (a) Afirmações da skill confirmadas neste bloco
- "Quando necessário, encapsule em Request, Command, DTO ou Value Object" (argumentos): suporte parcial. O livro diz que, com mais de dois ou três parâmetros, deve-se agrupá-los em classe própria quando formam um conceito (makeCircle(Point center, double radius)) [p.398]. Os nomes Request/Command/DTO/Value Object são da skill, não do trecho.
- "Argumentos: ... evite 4+" (teto de 3): compatível com "seria um erro passar mais parâmetros do que isso" (tríade como máximo, mesmo com varargs) [p.398]. O "ideal 0-2, aceitável 3" não é confirmável nesta página (início truncado).
- "Nomes devem revelar intenção": compatível com a recomendação de par verbo/substantivo e forma palavra-chave (writeField(name)) [p.398]. Confirma o espírito, não a lista de nomes a evitar.
- "Eliminar duplicação" (DRY): o bloqueio no cliente é criticado por "violar DRY" e o bloqueio no servidor é preferido por "reduzir códigos repetidos" [p.324, p.326].
- "Objetos ao invés de primitivos" e "exceções ao invés de -1": consistentes com o código final do Apêndice B (enums Month/Day no lugar de ints [p.384, 386-388]; Month.parse/Day.parse lançam IllegalArgumentException, enquanto o original devolvia -1 [p.348, 364, 387-388]). Evidência apenas de código; este bloco não traz texto explicando o porquê.

### (b) Afirmações da skill NÃO suportadas ou contraditas neste bloco
- "Evite else quando possível": o código final refatorado que o livro mostra ainda usa if/else em métodos como getNearestDayOfWeek e lastDayOfMonth [p.385: "if (offsetToFutureTarget > 3) return ... else return ..."; p.389: "if (month == Month.FEBRUARY && isLeapYear(year)) return ... else return ..."]. Não contradiz a skill ("quando possível"), mas o livro neste bloco não adota a regra como dogma; evitar apresentá-la como regra do livro.
- "Guard Clauses em vez de aninhamento profundo": nenhuma afirmação sobre isso neste bloco (código usa ifs de validação com throw no início do construtor [p.392], mas sem texto). Não é suportável a partir daqui.
- "Argumentos: ideal 0-2, aceitável 3": o trecho disponível chama a tríade de "nem tão perigosa assim" [p.398] e sugere agrupar quando se passa de 2-3; a skill chama 3 de "aceitável" sem ressalva. Diferença de tom, não contradição conclusiva (página truncada).
- Nenhuma das demais afirmações (Lei de Demeter, comentários permitidos/proibidos, given/when/then, Boy Scout Rule, testes sem infraestrutura) pode ser avaliada com este bloco. O before-after.md (6 exemplos) também não é confirmável aqui, exceto por semelhança de espírito.
- Observação: o livro (listagem B-4) mantém asserts comentados com "//todo" [p.366, 370-371]; é parte de um exemplo de código, não conselho, e não contradiz a regra da skill sobre código comentado.

### (c) Lacunas: conteúdo relevante deste bloco que a skill não cobre
- Concorrência limpa (Apêndice A): a skill não tem seção alguma. Faltam: operações compostas em coleções seguras não são atômicas [p.321-322]; preferir bloqueio no servidor com API atômica (getNextOrNull) ao bloqueio no cliente [p.325-326, 326]; ADAPTER para adicionar bloqueio em código de terceiros [p.326]; manter seções críticas pequenas [p.327]; as 4 condições do deadlock e formas de quebrar cada uma (ordem global de aquisição como o método mais comum) [p.329-332]; classes não seguras para threads [p.321]; estratégias de teste (Monte Carlo, rodar em todas as plataformas, carga variada, ferramenta de instrumentação como ConTest) [p.334-335].
- Funções com argumentos: parâmetro objeto como "conceito que merece nome", listas/varargs contam como um único parâmetro (monad/dyad/triad), pares verbo/substantivo e forma palavra-chave nos nomes de função [p.398]. A skill só cita encapsular em DTO/Value Object e não menciona varargs nem a forma palavra-chave.
- Material de refatoração (Apêndice B): enums com comportamento (DateInterval com `isIn` por constante) no lugar de constantes int + if/else [p.378-379 vs. p.388]; fábrica abstrata para criar instâncias [p.390-391]; variáveis intermediárias nomeadas para explicar aritmética (isLeapYear com fourth/hundredth/fourHundredth [p.389]; plusMonths [p.384]); métodos privados de busca com nomes descritivos [p.393]; remoção de Javadoc redundante em favor de nomes. Nada disso está em before-after.md (que só tem 6 exemplos simples). Todas as observações são de código; o porquê precisa vir do capítulo 16.
- Testes: BobsSerialDateTest como exemplo de teste exaustivo de bordas e de exceção esperada via try/fail/catch [p.364-372]; testes que dependem de locale são marcados como frágeis no próprio comentário do teste original [p.360-361]. A skill não tem orientação sobre bordas/exaustividade nem sobre dependência de ambiente em testes.
- Epílogo: o compromisso explícito com TDD/testes como parte da ética profissional [p.397]; a skill cita testabilidade mas não TDD.
