# Notas de leitura: Código Limpo (R. C. Martin), bloco 05, PDF p.321-398

Observação geral: este bloco é o final do livro (fim do Apêndice A, Apêndice B, Apêndice C, Epílogo), mais uma página solta (p.398) que pertence ao Capítulo 3 (Funções). Quase não há prosa sobre Clean Code: o grosso é código-fonte (muito corrompido por OCR). Offset PDF para número impresso: aproximadamente PDF-3 (impr. 324 = PDF 321) no Apêndice A; PDF-0/+4 irregular no Apêndice B (impr. 346 = PDF 342; impr. 398 = PDF 394).

---

### Apêndice A: Concorrência II (fim) (PDF p.321-335, impr. 324-338) [continua do bloco anterior]
Confiança do OCR: prosa MÉDIA a BOA; código-fonte RUIM (identificadores e símbolos corrompidos).
Resumo: Fecha a discussão sobre concorrência: compara bloqueio otimista (CAS) e sincronização, mostra que classes "seguras para threads" não garantem operações compostas seguras, compara bloqueio baseado no cliente vs. no servidor, calcula ganho de vazão com múltiplas threads, descreve deadlock (4 condições e como quebrar cada uma) e discute como testar código multithread.
Conceitos e regras:
- `synchronized` sempre adquire bloqueio (análogo a bloqueio pessimista), mesmo sem disputa; a versão sem bloqueio (CAS) assume baixa colisão, detecta conflito e tenta de novo, e quase sempre custa menos, mesmo sob contenção moderada/alta [p.321]
- Há classes não seguras para threads por natureza; o texto lista SimpleDateFormat, conexões de banco, contêineres de java.util e servlets [p.321]
- Mesmo em coleções com métodos individuais seguros, qualquer operação que chame mais de um método não é segura (exemplo: verificar containsKey e depois put em HashTable) [p.321-322]
- Três saídas para operações compostas: (1) bloquear a coleção no cliente e exigir que todos façam o mesmo; (2) bloqueio no servidor, embrulhando a coleção num ADAPTER com API nova (putIfAbsent); (3) usar coleções seguras de java.util.concurrent (ex.: ConcurrentHashMap.putIfAbsent) [p.322]
- "Dependências entre métodos podem danificar o código concorrente": no exemplo do IntegerIterator, hasNext() e next() são cada um sincronizado, mas o cliente usa os dois; duas threads podem ver hasNext()=true e uma delas estourar no fim da iteração. Bug sutil, só ocorre na última iteração e aparece tarde, em produção [p.322-323]
- Três opções diante disso: aceitar a falha, bloqueio no cliente, bloqueio no servidor. Aceitar a falha (capturar e ignorar a exceção) é chamado de "desleixado" [p.323-324]
- Bloqueio no cliente: cada cliente envolve o par hasNext/next num bloco synchronized no iterator; duplica código (viola DRY), mas pode ser necessário com terceiros não seguros; é arriscado porque todo programador precisa lembrar de bloquear (anedota de 1971 sobre buffer circular dessincronizado num sistema de contabilidade, causado por um único uso sem bloqueio) [p.324-325]
- Bloqueio no servidor: alterar a API para uma operação atômica (getNextOrNull que devolve null no fim); o cliente passa a testar null em vez de hasNext [p.325-326]
- Motivos para preferir bloqueio no servidor (lista de 5): reduz código repetido; permite melhor desempenho (pode trocar por versão não segura em cenário single-thread); reduz possibilidade de erro (esquecer de bloquear); força uma única diretriz num local; reduz o escopo de variáveis compartilhadas e os locais onde procurar o erro [p.326]
- Se não for dono do código do servidor: usar ADAPTER que adiciona o bloqueio e a API atômica; "ou, melhor ainda", coleções seguras com interfaces estendidas [p.326]
- Vazão (throughput): exemplo de ler URLs e analisar páginas; manter o bloco `synchronized` pequeno, só a seção crítica; sincronizar o mínimo possível [p.326-327]
- Contas do exemplo: 1 s de E/S e 0,5 s de processamento por página; thread única custa 1,5 s x N (13 páginas, ~19,5 s); com várias threads a análise (CPU) se sobrepõe à leitura (E/S) e o texto afirma ganho de 3x [p.327-328]. (Os valores vêm de figuras ilegíveis; confiar só no texto corrido.)
- Deadlock: exemplo com dois pools (conexões de banco e conexões MQ) e duas operações (criar e atualizar) que adquirem recursos em ordem oposta; sintoma difícil de reproduzir; inserir depuração altera o timing e esconde o problema por meses [p.328-329]
- Quatro condições necessárias: exclusão mútua, bloqueio e espera, sem preempção, espera circular; basta eliminar uma [p.329-330]
- Como quebrar cada condição: exclusão mútua (recursos que aceitam uso simultâneo, p.ex. AtomicInteger; aumentar recursos até igualar o número de threads; checar se todos estão livres antes de usar); bloqueio e espera (recusar-se a esperar: liberar tudo e recomeçar, com risco de starvation e livelock); sem preempção (permitir que uma thread peça o recurso a outra; gerenciar pedidos é traiçoeiro); espera circular (ordem global de aquisição de recursos, a mais comum; limites: ordem de aquisição pode não bater com ordem de uso, e às vezes a ordem não é possível) [p.330-332]
- Isolar a parte relacionada a threads para permitir sincronização e experimentos é apontado como forma poderosa de aprender qual estratégia escolher [p.332]
- Testar multithread: exemplo ClassWithThreadingProblem (nextId++ sem sincronização); o teste cria duas threads e repete muitas vezes até expor a falha; mesmo assim falha raramente (algo como 1 em 10 execuções com 1.000.000 de iterações, segundo o texto) e depende de máquina, SO e JVM [p.332-334]
- Ideias para expor falhas: teste de Monte Carlo (testes ajustáveis, rodados repetidamente em servidor de integração contínua com parâmetros aleatórios, registrando as condições da falha); rodar em cada plataforma final, repetida e constantemente; rodar em máquina com carga/processos variados [p.334]
- Mesmo assim, os problemas mais raros (1 em um bilhão) continuam difíceis de achar [p.335]
- Ferramenta citada: ConTest (IBM), que instrumenta classes para tornar mais provável a falha de código não seguro; o texto diz que a taxa de falha passou de 1 em 10 milhões de iterações para 1 em 30 [p.335]
- Conclusão: capítulo é visão breve; indica o livro de Doug Lea sobre concorrência em Java para aprofundar [p.335]
Citações curtas de prova:
- "Em geral, deve-se dar preferência ao bloqueio baseando-se no servidor" [p.326]
- "E sempre melhor sincronizar o menos possível" [p.327] (OCR: "E" no lugar de "É")
- "Todas essas quatro condições devem existir para que ocorra um deadlock." [p.330]
- "Essa é o método mais comum para evitar um deadlock." [p.331] (erro de gênero do original/OCR)
O que este trecho NÃO diz: não trata de concorrência em termos de clean code de forma geral (princípios do capítulo 13 estão em bloco anterior); não dá receita de testes unitários determinísticos para threads; valores numéricos das figuras A.1-A.3 estão ilegíveis.
Relevância para os artefatos candidatos: clean-code-expert: MÉDIA (sem seção de concorrência na skill; mas o assunto é parte do livro); code-review-expert: MÉDIA (checklist de revisão: operações compostas em coleções seguras, bloqueio no servidor, escopo de synchronized); testing-tdd-expert: MÉDIA (estratégias para expor bugs de threads, limites de testes não determinísticos); refactoring-expert: BAIXA.
Decisão sugerida: usar em references/ de clean-code-expert (concorrência) ou como checklist em code-review-expert; resumir sem copiar código.

### Apêndice A: Tutorial: Exemplos com códigos completos (PDF p.336-340, impr. 339-343)
Confiança do OCR: RUIM (só código).
Resumo: Listagens de um cliente/servidor sem threads (Server, ClientTest, MessageUtils) e a mudança para a versão com threads, que consiste em mover o processamento da mensagem para um Runnable executado em nova Thread. O texto introdutório diz que alterar o servidor para threads é "simplesmente uma mudança no processamento da mensagem" [p.340].
Conceitos e regras:
- Versão threaded: `process(final Socket)` cria um Runnable com a lógica e inicia uma Thread por conexão [p.340]
O que este trecho NÃO diz: não há explicação de projeto além da frase acima; código quase ilegível.
Relevância: todos os artefatos: BAIXA.
Decisão sugerida: descartar (código corrompido, sem prosa).

### Apêndice B: org.jfree.date.SerialDate (PDF p.341-394, impr. 345-398)
Confiança do OCR: RUIM (listagens, comentários Javadoc parcialmente legíveis; muitos números e símbolos trocados). Não há prosa explicativa do autor neste bloco; a motivação das mudanças NÃO está no texto lido, só o código antes/depois.
Resumo: Sequência de listagens: B-1 SerialDate original (p.341-357), B-2 SerialDateTest (p.358-363), B-3 MonthConstants (p.363-364), B-4 BobsSerialDateTest (p.364-372), B-5 SpreadsheetDate original (p.372-380), B-6 RelativeDayOfWeekRule (p.380-383), e a versão final refatorada: B-7 DayDate, B-8 Month, B-9 Day, B-10 DateInterval, B-11 WeekInMonth, B-12 WeekdayRange, B-13 DateUtil, B-14 DayDateFactory, B-15 SpreadsheetDateFactory, B-16 SpreadsheetDate final (p.384-394).
Observações factuais sobre o código (sem interpretar intenção do autor):
- Original (B-1): cabeçalho com licença e longo histórico de mudanças (p.341-342); Javadoc em praticamente todo membro, incluindo constantes ("Useful constant for Monday...") [p.343-344]; dias, meses e semanas representados por constantes `int` (MONDAY, JANUARY, FIRST_WEEK_IN_MONTH, INCLUDE_BOTH, PRECEDING...) [p.342-344]; validação com `switch` (isValidWeekdayCode, isValidMonthCode) [p.345-346]; comentários "Need to find a better approach." em weekdayCodeToString e relativeToString [p.345, 353]; stringToMonthCode/stringToWeekdayCode devolvem -1 quando não conseguem converter (a doc de stringToMonthCode diz isso) [p.348, 345]; métodos estáticos e de instância duplicados (getPreviousDayOfWeek estático e de instância) [p.351, 357]; isInRange com encadeamento if/else if sobre INCLUDE_* [p.378-379]
- Testes (B-2/B-4): SerialDateTests original tem comentários admitindo dependência de locale ("this test will fail if the default locale doesn't use English... devise a better test!") [p.360-361]; BobsSerialDateTest cobre exaustivamente todos os meses/dias, formas de grafia ("Mon", "monday", "MONDAY"), anos bissextos, limites, e usa `fail("... should throw exception")` dentro de try/catch para exceções esperadas [p.364-372]. Há linhas de asserts comentadas com marca tipo "//todo" (OCR: "fitodo") [p.366, 370-371]
- Versão final: `getMonth()` devolve `Month` e não int (enum) [p.384]; enums Month, Day, DateInterval (cada constante implementa `isIn` de forma própria), WeekInMonth, WeekdayRange [p.386-389]; DayDate sem quase nenhum Javadoc por método, só comentário de classe, que inclui a linha de que Robert C. Martin fez muita refatoração [p.384-386]; plusMonths decomposto em variáveis nomeadas (thisMonthAsOrdinal, resultYear...) [p.384]; getNearestDayOfWeek com variáveis nomeadas (offsetToThisWeeksTarget, offsetToFutureTarget, offsetToPreviousTarget) [p.385]; DateUtil.isLeapYear com booleanos nomeados (fourth, hundredth, fourHundredth) [p.389]; criação de instâncias via DayDateFactory abstrata (makeDate sobrecarregado) com SpreadsheetDateFactory concreta [p.390-391]; Month.parse e Day.parse lançam IllegalArgumentException em vez de devolver -1 [p.387-388]; SpreadsheetDate final valida no construtor e lança IllegalArgumentException [p.392]; métodos privados com nomes descritivos (huntForMonthContaining, daysBeforeThisMonth, huntForYearContaining, firstOrdinalOfYear) [p.393]; uso de if/else em alguns métodos finais (ex.: getNearestDayOfWeek, lastDayOfMonth) [p.385, 389]
Conceitos e regras: nenhum enunciado em prosa neste bloco; só código como evidência.
Citações curtas de prova:
- "Sauthor Robert CC, Martin did à lot 07 refactoring." [p.384] (OCR corrompido; leia-se como linha do cabeçalho de DayDate)
O que este trecho NÃO diz: não explica por que cada mudança foi feita, nem lista a sequência de passos de refatoração nem os testes/regras seguidos (isso estaria no capítulo 16, em outro bloco); não há "smells" nomeados aqui.
Relevância para os artefatos candidatos: refactoring-expert: MÉDIA (exemplo de estado final: enums no lugar de constantes int, factory, variáveis explicativas, remoção de Javadoc redundante; mas sem rationale, usar só junto ao capítulo 16); clean-code-expert: MÉDIA (exemplos concretos para references/before-after.md, só após confirmar no capítulo 16); testing-tdd-expert: BAIXA a MÉDIA (testes exaustivos de borda em B-4); code-review-expert: BAIXA.
Decisão sugerida: usar apenas como inspiração de exemplos curtos reescritos (nunca copiar listagens) e ligar ao bloco do capítulo 16; descartar o restante.

### Apêndice C: Referência Cruzada das Heurísticas (PDF p.395-396, impr. ~399-400)
Confiança do OCR: RUIM (tabela quase ilegível).
Resumo: Tabela que cruza cada "odor"/heurística (códigos tipo G..., N..., etc.) com as páginas do livro onde é citada (formato "16-279, 17-297"). O texto de abertura diz que é uma referência cruzada de "odores" e heurísticas [p.395].
Conceitos e regras: os códigos das heurísticas e quais páginas apontam não são recuperáveis com segurança; só aparecem fragmentos como "16-279, 16-286, 17-297" sem rótulo legível. Não reconstruir por conhecimento prévio.
O que este trecho NÃO diz: não contém as descrições das heurísticas (estão no capítulo 17, outro bloco).
Relevância: todos: BAIXA (índice).
Decisão sugerida: descartar neste bloco; usar o capítulo 17 original.

### Epílogo (PDF p.397)
Confiança do OCR: BOA.
Resumo: Relato pessoal do autor: em 2005 (conferência Agile, Denver) recebeu uma pulseira verde "Obcecado por testes"; desde que aprendeu TDD com Kent Beck em 1999 ficou obcecado por desenvolvimento dirigido a testes; a pulseira virou um lembrete moral do compromisso de escrever código limpo.
Conceitos e regras:
- A pulseira funciona como lembrete constante do compromisso de criar código limpo; tirá-la seria trair a ética profissional [p.397]
Citações curtas de prova:
- "Obcecado por testes" [p.397]
O que este trecho NÃO diz: não prescreve práticas de TDD nem regras técnicas.
Relevância: testing-tdd-expert: BAIXA (só contexto motivacional); clean-code-expert: BAIXA (a "Regra Máxima"/mentalidade de cuidado da skill é compatível em espírito, mas o texto não fala em "alguém que se importa").
Decisão sugerida: descartar (anedota).

### Capítulo 3: Funções, página solta (PDF p.398, impr. 42) [fora de ordem: continua de bloco anterior e o fim não está neste bloco]
Confiança do OCR: MÉDIA (texto legível, poucos erros). A página aparece depois do Epílogo, provavelmente página repetida/deslocada na extração. Começa no meio de um assunto (fala de "tríade" e assertEquals) e termina truncada no meio de "Verbos e Palavras-Chave".
Resumo: Parte final de "Argumentos": objetos como parâmetros, listas (varargs) como parâmetros, e início de "Verbos e palavras-chave" para nomes de funções.
Conceitos e regras:
- Uma tríade (3 argumentos) como assertEquals(1.0, amount, .001) é descrita como "não tão perigosa assim", ainda que precise ser lida duas vezes; vale como dica de que igualdade de ponto flutuante é relativa [p.398] (início truncado, contexto anterior não está no bloco)
- Quando a função parece precisar de mais de dois ou três parâmetros, provavelmente alguns podem ser agrupados numa classe própria; exemplo: makeCircle(x, y, radius) vs. makeCircle(Point center, radius) [p.398]
- Reduzir parâmetros criando objetos pode parecer trapaça, mas não é: variáveis passadas juntas (x e y) tendem a ser parte de um conceito que merece nome próprio [p.398]
- Argumentos variáveis tratados igualmente equivalem a um único parâmetro de lista; String.format é de fato uma díade; funções com varargs podem ser mônades, díades ou tríades, e seria um erro passar mais parâmetros do que isso [p.398]
- Nome de função e parâmetro de uma mônade devem formar um par verbo/substantivo (write(name)); melhor ainda o formato palavra-chave, p.ex. writeField(name), que diz que o parâmetro é um campo [p.398] (a explicação da forma palavra-chave está cortada)
Citações curtas de prova:
- "Reduzir o número de parâmetros através da criação de objetos a partir deles pode parecer uma trapaça, mas não é." [p.398]
- "seria um erro passar mais parâmetros do que isso" [p.398]
O que este trecho NÃO diz: não dá o intervalo numérico completo "0-2 ideal" nem define explicitamente mônade/díade/tríade (a definição estaria antes, fora do bloco); não fala de "DTO", "Request", "Command" nem "Value Object".
Relevância: clean-code-expert: ALTA (argumentos e nomes de funções); refactoring-expert: MÉDIA (Introduce Parameter Object, sem usar o nome); code-review-expert: MÉDIA.
Decisão sugerida: usar em clean-code-expert (seção Funções); confirmar o texto completo no bloco do capítulo 3.

---

## Auditoria da skill atual

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

## Checklist de cobertura
- Primeira página lida: PDF 321
- Última página lida: PDF 398 (último marcador "=== PDF PAGINA 398 ===" confirmado por grep; arquivo de 5023 linhas lido inteiro)
- Páginas sem texto útil ou ilegíveis: p.336-340 (código do tutorial), p.341-394 (listagens; só comentários parcialmente legíveis), p.395-396 (tabela do Apêndice C ilegível), figuras A.1-A.3 em p.328 e diagrama de deadlock em p.330
- Problemas de extração observados: identificadores e símbolos de código corrompidos (parênteses/chaves trocados por "|", "(", "1", "f"); cabeçalhos "Listagem" mistura inglês/português ("Listing B-1 (continuação)"); números de linha das listagens com erros; página 398 pertence ao Capítulo 3 mas aparece após o Epílogo (provável duplicata/deslocamento da extração); texto de página 332-335 com acentos e gêneros trocados
- Capítulos/seções cobertos integralmente: Apêndice B (listagens), Apêndice C, Epílogo, Tutorial do Apêndice A
- Capítulos/seções que continuam em outro bloco: Apêndice A (começo está no bloco anterior; o texto deste bloco cobre p.321-335, impr. 324-338); página 398 é meio do Capítulo 3 (início e fim em outros blocos)
