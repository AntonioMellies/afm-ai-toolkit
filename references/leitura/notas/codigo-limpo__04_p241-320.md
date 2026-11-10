# Notas de leitura: Código Limpo (Robert C. Martin), bloco 04, PDF p.241-320

Convenções: "PDF p.N" é o marcador `=== PDF PAGINA N ===`; "impr." é o número impresso quando visível. Mapeamento observado: PDF 241-247 = impr. 240-246; PDF 249-262 = impr. 248-261 (aprox.); PDF 281-309 = impr. 282-310 (PDF+1); PDF 311-320 = impr. 314-323 (PDF+3). Heurísticas citam o código do livro (C1, G5, N1, T1...) como aparece no texto.

Confiança do OCR geral: prosa BOA a MÉDIA; código-fonte RUIM (muito corrompido). O OCR perdeu a palavra "abstração" em vários trechos do cap. 17 (G5, G6, G34: aparece "para ." ou "nível de ."). Isso é lacuna de extração; não reconstruí o sentido além do que o contexto de G6/G34 já explicita.

---

### Cap. 14: Refinamento Sucessivo, parte final (PDF p.241-247, impr. 240-246) [continua do bloco anterior]
Confiança do OCR: RUIM nas listagens de código (ArgsTest, ArgsException, Args, p.241-246); BOA na prosa de p.246-247.
Resumo: Páginas finais do caso Args. Mostram as listagens finais de testes, ArgsException e Args e comentam que a maior parte das mudanças foi exclusão e movimentação de código. A conclusão defende que código que "funciona" não basta e que mantê-lo limpo desde o início é mais barato que limpar depois.
Conceitos e regras:
- Grande parte do bom design é particionamento: criar lugares apropriados para cada tipo de código; essa separação de preocupações facilita manutenção e compreensão [p.246].
- O autor reconhece que colocar a formatação de mensagens de erro em ArgsException é, a rigor, violação do SRP em Args, mas ser tolerável/necessário na prática: usuários não querem montar as mensagens e a conveniência de mensagens prontas "não é insignificante" (trade-off, não regra absoluta) [p.246].
- Os testes de ArgsException testam cada mensagem de erro por código de erro (padrão de teste: um teste por caso de erro) [p.242-243; legibilidade baixa por OCR].
- Código ruim degrada projeto mais que cronograma ruim ou requisito ruim ou dinâmica de equipe ruim; limpar depois é caro por dependências ocultas e intrincadas; limpar logo após sujar é fácil [p.247].
- Programadores que se satisfazem com "código funcionando" não agem de forma profissional [p.247].
- Solução proposta: manter o código o mais limpo e simples possível, nunca deixar começar a degradar [p.247].
Citações curtas de prova:
- "Mas um código ruim apodrece e degrada, tornando-se um peso que se leva a equipe consigo." [p.247]
- "Sendo assim, a solução é constantemente manter seu código o mais limpo e simples possível." [p.247]
O que este trecho NÃO diz: não detalha os passos intermediários do refinamento (estão no bloco anterior); a solução final fica "como exercício" [p.247]. O código das listagens está ilegível em muitos pontos; não se pode extrair regras de código a partir dele.
Relevância: clean-code-expert: MÉDIA (argumento de custo de código ruim, SRP vs conveniência); refactoring-expert: MÉDIA (refatorar cedo é mais barato); testing-tdd-expert: BAIXA; code-review-expert: BAIXA.
Decisão sugerida: usar o argumento "limpar cedo é barato" em clean-code-expert/refactoring-expert; descartar o código.

---

### Cap. 15: Características Internas do JUnit (cabeçalho de página diz "Testes de Unidade") (PDF p.248-262, impr. 247-261)
Confiança do OCR: MÉDIA (prosa legível; código muito corrompido, com símbolos trocados; os passos de refatoração são compreensíveis pelo texto).
Resumo: Refatoração do módulo ComparisonCompactor do JUnit, que já era bom, aplicando a Regra de Escoteiro. O autor mostra a sequência incremental de pequenas mudanças (nomes, encapsulamento de condicionais, remoção de acoplamento temporal, remoção de código inútil) e admite que reverteu várias delas no final.
Conceitos e regras:
- Antes de mexer, avalia o código com testes que cobrem 100% (cada linha, cada if, cada for), o que dá confiança de que funciona [p.251 (impr. 250)].
- Regra de Escoteiro: mesmo código muito bom deve ser deixado mais limpo do que foi encontrado [p.253 (impr. 252)].
- Remover prefixo `f` das variáveis-membro; ambientes modernos tornam esse escopo redundante [N6 citado] [p.253].
- Encapsular condicional extraindo método que explicita a intenção (shouldNotCompact) [G28 citado] [p.254].
- Nomes de variáveis locais não devem colidir/confundir com membros (`this.expected`); desambiguar com compactExpected/compactActual [N4 citado] [p.254].
- Condicional negativa é mais difícil de entender; inverter o if [G29 citado] [p.254].
- Nome da função deve refletir o efeito: `compact` escondia o efeito colateral da verificação e retornava mensagem formatada; renomeada para formatCompactedComparison [N7 citado] [p.255].
- Função "compact..." não deve fazer nada além de compactar; dividir em funções com responsabilidade única [G30 citado] [p.255].
- Convenções consistentes: se duas linhas retornam valores e outras duas não, é inconsistência [G11 citado] [p.255].
- Acoplamento temporal oculto: findCommonSuffix dependia de prefixIndex calculado antes; primeiro passou-se prefixIndex como parâmetro, mas o autor achou isso arbitrário [G31, G32 citados] porque não explica a necessidade e outro programador poderia desfazer; solução final foi agrupar numa única função que chama prefix antes de qualquer outra coisa [p.256-257].
- Nome impreciso: `suffixIndex` era na verdade um comprimento começando em 1; mudar para suffixLength eliminou os "+1" estranhos, movendo "-1" para charFromEnd e `<=` para suffixOverlapsPrefix [p.257-259].
- Técnica para checar código suspeito: comentar os `if` aparentemente irrelevantes, rodar os testes; passaram, então removeu os ifs e simplificou compactString [p.259].
- Resultado final organizado em funções de análise primeiro e de síntese depois, em ordem topológica (declaração de cada função logo após seu uso) [p.262].
- Refatorar é iterativo, cheio de tentativa e erro; uma refatoração leva à outra e à reversão de decisões anteriores (ex.: reverteu métodos extraídos e a inversão do shouldNotBeCompacted) [p.262].
- Mesmo módulos excelentes têm o que melhorar; cada um tem o dever de deixar o código um pouco melhor [p.262].
Citações curtas de prova:
- "Refatorar é um processo iterativo cheio de tentativas e erros" [p.262] (trecho completo no texto: "...convergindo inevitavelmente em algo que consideramos digno de um profissional")
- "É um pouco mais difícil entender negativas do que afirmativas" [p.254]
O que este trecho NÃO diz: não apresenta uma lista fechada de refatorações do catálogo de Fowler; cada passo é justificado pela heurística do cap. 17. Em ComparisonCompactor o final ainda contém uma negação (shouldBeCompacted definido como `!shouldNotBeCompacted()`), então G29 não foi aplicada de forma radical (p.260, leitura do código com OCR ruim; confiança média).
Relevância: clean-code-expert: ALTA (nomes, condicionais, acoplamento temporal, Regra de Escoteiro, funções); refactoring-expert: ALTA (processo incremental com testes, reverter decisões, usar testes para validar remoção); testing-tdd-expert: MÉDIA (cobertura 100% como rede de segurança); code-review-expert: MÉDIA (exemplos de smells concretos).
Decisão sugerida: usar em clean-code-expert (exemplos de aplicação de G28/G29/N7/G31) e refactoring-expert (fluxo incremental com testes). Código das listagens: descartar.

---

### Cap. 16: Refatorando o SerialDate (PDF p.263-279, impr. 263-279)
Confiança do OCR: MÉDIA (prosa legível com erros pontuais; códigos dos enums/factory corrompidos mas o sentido é recuperável pelo texto adjacente).
Resumo: Revisão profissional da classe SerialDate (JCommon), renomeada para DayDate. Fluxo em duas fases: "primeiro, faça-a funcionar" (aumentar testes/cobertura, consertar bugs) e "então, torne-a certa" (refatorar de cima para baixo rodando todos os testes após cada alteração). Cada decisão é anotada com a heurística do cap. 17.
Conceitos e regras:
- Postura: revisão de código profissional é algo com que todos deveríamos nos sentir à vontade, como médicos, pilotos e advogados [p.264].
- Primeiro garantir testes: os testes existentes não testavam tudo; busca por "Encontrar Tarefas" mostrou método não usado (T1, F4); cobertura Clover era 91 de 185 instruções (~50%) [T2]; o autor escreveu testes próprios, chegando a 170 (92%) de 185 [p.264].
- Testes que falham expressam comportamento esperado; ficam comentados até corrigir; alguns eram "prepotência" do autor por comportamento óbvio (G2) [p.264-265].
- Testes revelaram bugs de condição de limite (G3, T5) em getFollowingDayOfWeek (`>` deveria ser `>=`) e em getNearestDayOfWeek; padrões de testes falhando (T7) e a linha nunca executada na cobertura (T8) indicaram algoritmo errado [p.265-266].
- Lançar IllegalArgumentException em vez de devolver string de erro fez testes passarem [p.266].
- Ordem: só depois de os testes passarem, "tornar certa". Após cada alteração rodaram-se todos os testes do JCommon [p.266].
- Comentários: histórico de alterações é resquício da década de 1960, deve sair (controle de versão) [C1]; comentários redundantes ou obsoletos/errados devem ser removidos [C2, C3] [p.266, 268, 270, 271]. Direitos autorais/licença permanecem [p.266].
- Múltiplas linguagens no mesmo arquivo (Java, português, Javadoc, HTML) dificultam [G1] [p.266].
- Nomes: "serial number" era termo incorreto (melhor "ordinal") [N1]; SerialDate expõe implementação num nível errado de abstração para classe abstrata [N2]; escolheu DayDate (Date e Day já eram muito usados) [p.266-267]. Nomes de enum matemáticos: DateInterval com CLOSED, CLOSED_LEFT, CLOSED_RIGHT, OPEN em vez de INCLUDE_NONE/FIRST/SECOND/BOTH [N3] [p.271]. Renomeações: toSerial para toOrdinal, getYYYY para getYear, compare para daysSince [p.274, 277-278].
- Herdar de classe de constantes (MonthConstants) é péssima ideia [J2]; substituir por enum Month; constantes int de dia/semana/intervalo viram enums (Day, WeekInMonth, DateInterval, WeekdayRange). Enums facilitam renomear e removem a checagem de erro de validade (isValidMonthCode) [J3, G5] [p.267, 270-271].
- serialVersionUID: o autor prefere deixar o compilador gerá-lo (preferiu depurar InvalidClassException a esquecer de atualizar); tratado como exemplo de segurança anulada [G4] [p.267-268]. Afirmação de preferência pessoal contrária a "todos os documentos".
- Constantes específicas da implementação sobem/descem de lugar: movidas para SpreadsheetDate [G6] [p.268, 270].
- Classe base não deve conhecer derivadas; usar ABSTRACT FACTORY (DayDateFactory) que também responde mínimo/máximo ano [G7] [p.268-270].
- Tabelas/campos/funções não usados: excluir [G9, G12]; campos privados quando há função equivalente [G8] [p.270-271]. Remover construtor padrão vazio e `final` em parâmetros/variáveis (opinião do autor contra Simmons; só em constantes) [G12] [p.271-272].
- Ifs duplicados no loop: unir [G5]; método de parse fora do lugar: mover para o enum Day; separar enum em arquivo próprio [G13] [p.272].
- Feature Envy: monthCodeToQuarter vai para enum Month como quarter() [G14] [p.273].
- Flag como parâmetro (monthCodeToString com flag): péssima ideia; separar em toString e toShortString [G15] [p.273].
- Código mais expressivo: isLeapYear com booleans nomeados [G16]; lastDayOfMonth usa tabela do enum Month, mover [G17] [p.274].
- Métodos estáticos que operam em dados da instância não devem ser estáticos [G18]; mas o autor hesita ao torná-los métodos de instância porque `date.addDays(5)` é ambíguo (muda ou retorna nova?) e renomeia para plusDays/plusMonths [N4, G20] [p.274-275].
- Variáveis temporárias explicativas [G19] e entender o algoritmo [G21] para simplificar getPreviousDayOfWeek/getFollowingDayOfWeek/getNearestDayOfWeek; consistência entre três funções similares [G11] [p.275-276].
- Dependência lógica vira física: criou método abstrato getDayOfWeekForOrdinalZero [G22] [p.277].
- switch feio é substituído movendo os casos para o enum (polimorfismo) [G23] [p.278].
- Métodos abstratos no topo da classe [G24]; número mágico 1 vira Month.JANUARY.toInt() / Day.SUNDAY.toInt() [G25]; extrair correctLastDayOfMonth para eliminar duplicação [G5] [p.278-279].
- Anedota: o autor refatorou weekInMonthToString com a IDE e depois deletou a função por só ser usada por testes (idem relativeToString); lição implícita: verificar se o código tem usuários antes de polir [p.276-277].
- Cobertura de DayDate caiu para 84,9% (45 de 53) porque a classe encolheu e as linhas não testadas eram triviais; o autor aceita não testá-las [p.279].
Citações curtas de prova:
- "Costuma ser uma péssima ideia para classes base enxergar seus derivados." [p.269]
- "Costuma ser uma péssima idéia passar uma flag como parâmetro de uma função" [p.273] (texto do OCR: "idéia")
- "Não estou certo por que o método ... foi criado" [p.264] (para ilustrar G2; trecho com erro de OCR no nome do método)
O que este trecho NÃO diz: não apresenta o código final completo aqui (Listagens B.7 a B.16 no apêndice, fora do bloco). Não justifica enums como regra para toda linguagem. Não afirma que Abstract Factory é sempre necessário, só para esse dilema. Não discute testes de caracterização com esse nome.
Relevância: clean-code-expert: ALTA (nomes, enums vs constantes, flags, comentários, estático/instância); refactoring-expert: ALTA (fluxo testes primeiro, Clover, rodar todos os testes a cada mudança, mover método, extract method, rename, explaining variable); testing-tdd-expert: ALTA (cobertura como guia, testes comentados expõem comportamento esperado, T1/T2/T5/T7/T8 em ação); code-review-expert: ALTA (modelo de revisão: cada achado ligado a heurística).
Decisão sugerida: usar em refactoring-expert (fluxo em duas fases e catálogo de movimentos), testing-tdd-expert (cobertura/bugs de limite) e code-review-expert (como relatar achados com heurística). Descartar o código.

---

### Cap. 17: Odores e Heurísticas (PDF p.280-309, impr. 281-310) [conclusão truncada; continua no próximo bloco ou foi cortada]
Confiança do OCR: BOA na prosa; MÉDIA nos exemplos de código; o OCR perdeu a palavra "abstração" em G5, G6, G34 e outras.
Resumo: Catálogo de smells e heurísticas compilado pelo autor ao refatorar programas, organizado em Comentários (C), Ambiente (E), Funções (F), Geral (G), Java (J), Nomes (N) e Testes (T). Lista para ler de cima para baixo e usar como referência, com remissões ao Apêndice C [p.281].
Obs.: a lista afirma ter origem em Fowler (Refatoração) mais itens próprios [p.280]. Todas as afirmações abaixo são do texto.

#### Comentários (PDF p.281-282)
- C1 Informações inapropriadas: histórico de mudanças, autoria, data, número de tarefa não pertencem a comentários; usar controle de versão/rastreador. Comentários só com dados técnicos sobre o código [p.281].
- C2 Comentário obsoleto: velho, irrelevante, incorreto; atualizar ou apagar logo [p.281].
- C3 Comentário redundante: descreve o que já se descreve (ex.: `i++; // incrementa i`, Javadoc que só repete a assinatura). Regra: comentários devem informar o que o código não consegue por si só [p.281].
- C4 Comentário mal escrito: se vale escrever, escrever bem; gramática, sem óbvio, breve [p.282].
- C5 Código como comentário: abominação; excluir, o controle de versão lembra [p.282].
Citações: "Os comentários devem informar o que o código não consegue por si só." [p.281]; "Colocar códigos em comentários é uma abominação." [p.282].

#### Ambiente (PDF p.282)
- E1 Build exige mais de uma etapa: deve ser uma operação simples e única (um comando para obter o código, outro para construir) [p.282].
- E2 Testes exigem mais de uma etapa: rodar todos com um comando/clique; rápido, fácil e óbvio [p.282].

#### Funções (PDF p.283)
- F1 Parâmetros em excesso: nenhum é melhor, depois um, dois, três; mais que isso é questionável e deve ser evitado com preconceito [p.283].
- F2 Parâmetros de saída: inesperados; se a função deve alterar estado, alterar o do objeto em que é chamada [p.283].
- F3 Parâmetros lógicos (booleanos): declaram que a função faz mais de uma coisa; eliminar [p.283].
- F4 Função morta: descartar métodos nunca chamados; o controle de versão lembra [p.283].

#### Geral (PDF p.283-299, G1-G36)
- G1 Múltiplas linguagens em um arquivo-fonte: ideal é uma só; minimizar quantidade e uso de linguagens extras [p.283].
- G2 Comportamento óbvio não implementado (Princípio da Menor Surpresa): ex. stringToDay deveria aceitar nome, abreviações comuns e ignorar caixa; quebrar isso faz leitores perderem a confiança e terem de ler todos os detalhes [p.283-284].
- G3 Comportamento incorreto nos limites: não confiar em intuição; tratar cada condição de limite e criar teste para cada [p.284].
- G4 Seguranças anuladas: desligar avisos do compilador/testes é arriscado (analogia com Chernobyl); inclui controle manual de serialVersionUID como risco [p.284].
- G5 Duplicação: "uma das regras mais importantes"; blocos idênticos viram métodos; switch/if-else repetidos viram polimorfismo; algoritmos parecidos viram TEMPLATE METHOD ou STRATEGY; a maioria dos padrões de projeto são formas de eliminar duplicação; DRY (Thomas/Hunt), "uma vez e apenas uma" (Beck) [p.284-285]. Transformar duplicação em abstração aumenta o vocabulário do projeto (palavra "abstração" ausente no OCR; leitura por contexto: "elevar o nível de [abstração]" inferido, marcado como baixa certeza).
- G6 Código no nível errado de abstração: conceitos de nível alto na classe base, detalhes nas derivadas; ex. `percentFull()` em interface Stack no nível errado (mover para BoundedStack; retornar zero seria mentir); vale também para arquivos, módulos, componentes [p.285-286].
- G7 Classes base dependem de derivadas: suspeitar; base não deve enxergar derivadas; exceção: conjunto fixo de derivadas (máquinas de estado), mas então são fortemente acopladas; permite implantar componentes independentes [p.286].
- G8 Informações excessivas: interfaces pequenas, poucos métodos, poucas variáveis; esconder dados, utilitários, constantes e temporárias; limitar protegidos [p.286].
- G9 Código morto: nunca executado (ifs impossíveis, catch que não ocorre, utilitários nunca chamados, cases impossíveis); apodrece; excluir [p.286-287].
- G10 Separação vertical: variáveis locais imediatamente acima do primeiro uso; funções privadas imediatamente abaixo do primeiro uso [p.287].
- G11 Inconsistência: mesma forma para coisas semelhantes (mesmo nome de variável response; processVerificationRequest/processDeletionRequest) [p.287].
- G12 Entulho: construtor vazio, variáveis não usadas, funções nunca chamadas, comentários sem informação [p.287].
- G13 Acoplamento artificial: coisas independentes não devem ser acopladas (enums genéricos dentro de classes específicas; funções estáticas gerais em classes específicas); não jogar no lugar mais conveniente [p.287-288].
- G14 Feature Envy (smell de Fowler): método mais interessado em outra classe; eliminar, pois expõe internos; exceção: reportHours usa HourlyEmployee mas não se deve mover o formato para a classe de domínio (acoplaria o domínio ao formato do relatório) [p.288-289].
- G15 Parâmetros seletores (booleanos, enums, inteiros): agrupam várias funções numa; exemplo calculateWeeklyPay(boolean overtime) deveria virar funções straightPay() e overTimePay() [p.289-290].
- G16 Propósito obscuro: expressões contínuas, notação húngara, números mágicos; exemplo m_otCalc impenetrável [p.290].
- G17 Responsabilidade mal posicionada: colocar código onde o leitor espera (PI junto à trigonometria; OVERTIME_RATE em HourlyPayCalculator); usar nomes de função para decidir (getTotalHours vs saveTimeCard; computeRunningTotalOfHours no timecard se for por desempenho) [p.290].
- G18 Modo estático inadequado: Math.max é bom estático; função que pode precisar de polimorfismo (calculatePay) não deve ser estática; na dúvida, não estático [p.290-291].
- G19 Variáveis descritivas/explicativas: separar cálculos em valores intermediários com nomes; ex. match.group(1)/(2) viram key/value; mais variáveis explicativas costuma ser melhor [p.291].
- G20 Nomes de função devem dizer o que fazem: `date.add(5)` ambíguo (dias? semanas? muta?); addDaysTo/increaseByDays se muta; daysLater se devolve nova data; se precisa olhar a implementação, trocar o nome [p.291-292].
- G21 Entenda o algoritmo: não basta passar nos testes; refatorar até ser óbvio que funciona; "não estar certo do que faz o seu código é simplesmente preguiça" [p.292].
- G22 Torne dependências lógicas em físicas: ex. HourlyReporter assumia PAGE_SIZE=55 do formatter; criar getMaxPageSize() no formatter e chamá-lo [p.292-293].
- G23 Prefira polimorfismo a if/else ou switch/case: switch é frequentemente a "força bruta" óbvia; regra do "UM SWITCH": no máximo um switch por tipo de seleção, usado para criar objetos polimórficos; reconhece que no cap. 6 switch pode ser adequado quando funções são mais voláteis que tipos [p.294].
- G24 Siga convenções padrão: padrão de equipe baseado nas normas do mercado; basta o código servir de exemplo; chaves onde forem, desde que todos concordem [p.294].
- G25 Substitua números mágicos por constantes nomeadas: 86.400 vira SECONDS_PER_DAY; exceções: constantes autoexplicativas em fórmulas claras (5280.0 em feet/mile, `* 8`, `* Math.PI * 2`); pi deve usar Math.PI (risco de erros); "número mágico" vale para qualquer token cujo valor não é autoexplicativo (ex.: 7777 e "John Doe" em teste viram HOURLY_EMPLOYEE_ID/NAME) [p.294-295].
- G26 Seja preciso: não usar ponto flutuante para moeda (usar inteiros, melhor ainda uma classe Money com inteiros); verificar null se a função retorna null; checar unicidade do registro; usar locks; List em vez de ArrayList; evitar protegido por padrão [p.295].
- G27 Estrutura acima de convenção: classes base com métodos abstratos forçam implementação, switch com enum bem nomeado depende de convenção [p.296].
- G28 Encapsule as condicionais: `if (shouldBeDeleted(timer))` melhor que `if (timer.hasExpired() && !timer.isRecurrent())` [p.296].
- G29 Evite condicionais negativas: `if (buffer.shouldCompact())` melhor que `if (!buffer.shouldNotCompact())` [p.296].
- G30 Funções devem fazer uma coisa só: pay() fazia iterar, verificar e pagar; dividir em pay/payIfNecessary/calculateAndDeliverPay [p.296-297].
- G31 Acoplamentos temporais ocultos: encadear (bucket brigade) para que a ordem seja imposta pelos parâmetros/retornos; complexidade sintática extra expõe a complexidade temporal real [p.297-298].
- G32 Não seja arbitrário: estrutura deve ter razão visível; exemplo VariableExpandingWidgetRoot aninhada em AliasLinkWidget sem necessidade; classes públicas usadas por outras ficam no nível de pacote [p.298].
- G33 Encapsule condições de limite: `level + 1` aparecendo duas vezes vira nextLevel [p.298-299].
- G34 Funções devem descer apenas um nível de abstração: instruções no mesmo nível, um abaixo do nome da função; exemplo HrRule render misturando tamanho da régua e sintaxe HTML refatorado com HtmlTag; separar níveis é das refatorações mais importantes e mais difíceis; ao dividir, descobrem-se níveis ofuscados [p.299-300].
- G35 Mantenha dados configuráveis em níveis altos: constantes padrão (DEFAULT_PORT etc.) no topo, passadas para baixo [p.300-301].
- G36 Evite navegação transitiva (Lei de Demeter / "código tímido"): a.getB().getC().doSomething() torna estruturas rígidas; colaboradores imediatos oferecem os serviços [p.301].

#### Java (PDF p.301-304)
- J1 Evite longas listas de import usando wildcards (import package.*): argumenta que wildcard não cria dependência real; admite conflitos de nome raros [p.301-302]. Afirmação específica de Java e controversa em convenções atuais [fora do livro]; só registrar como tal.
- J2 Não herde constantes (interface de constantes); usar import estático [p.302-303].
- J3 Constantes versus enum: usar enum, que tem métodos e campos (ex.: HourlyPayGrade com rate() por constante) em vez de `public static final int` [p.303-304].

#### Nomes (PDF p.304-308)
- N1 Escolha nomes descritivos: reavaliar com frequência; nomes são 90% da legibilidade; exemplo x()/q/z/kk de pontuação de boliche reescrito como score(), isStrike, nextTwoBallsForStrike; bons nomes deixam inferir implementação de isStrike [p.304-305].
- N2 Escolha nomes no nível apropriado de abstração: Modem.dial(phoneNumber) vs connect(connectionLocator)/getConnectedLocator [p.306].
- N3 Use nomenclatura padrão onde possível: nomes de padrões (Decorator), convenções da plataforma (toString) e a linguagem ubíqua do projeto (Evans) [p.306-307].
- N4 Nomes não ambíguos: doRename com renamePage dentro; melhor renamePageAndOptionallyAllReferences (longo é aceitável se chamado em um só lugar) [p.307].
- N5 Use nomes longos para escopos grandes: `i`/`j` bons em escopo de cinco linhas; nomes curtos perdem sentido em distância [p.307].
- N6 Evite codificações: sem prefixos m_/f, sem notação húngara, sem prefixo de subsistema [p.307-308].
- N7 Nomes devem descrever efeitos colaterais: getOos que cria o stream deveria ser createOrReturnOos [p.308].
Citação: "Nomes em softwares são 90% responsáveis pela legibilidade do software." [p.304]

#### Testes (PDF p.308-309)
- T1 Testes insuficientes: testar tudo que pode falhar; insuficientes enquanto houver condições/cálculos não explorados [p.308].
- T2 Use uma ferramenta de cobertura: mostra lacunas; IDEs marcam linhas cobertas/não cobertas [p.308].
- T3 Não pule testes triviais: valor de documentação maior que o custo [p.308].
- T4 Um teste ignorado é uma questão sobre uma ambiguidade: expressar dúvida de requisito como teste comentado/@Ignore [p.308-309].
- T5 Teste as condições de limite [p.309].
- T6 Teste abundantemente bugs próximos: bugs se reúnem [p.309].
- T7 Padrões de falhas são reveladores: ordenar casos logicamente expõe padrões [p.309].
- T8 Padrões de cobertura são reveladores: código executado ou não dá dicas [p.309].
- T9 Testes devem ser rápidos: teste lento não será rodado [p.309].
Citação: "Um teste lento é um que não será rodado." [p.309]
O que este trecho NÃO diz: o OCR cortou o fim da Conclusão do cap. 17 (a página termina em "Você não se torna um especialista na arte de softwares", p.309); não sei como a frase termina e não a reconstruí. Não cobre FIRST, TDD, Arrange-Act-Assert nem given/when/then. Não diz "evite else" nem "use guard clauses". Não tem lista de smells de Fowler por nome além de Feature Envy (G14).
Relevância: clean-code-expert: ALTA (principal fonte de regras); refactoring-expert: ALTA (smells G/F/C/N como gatilhos de refatoração); testing-tdd-expert: ALTA (T1-T9, E2); code-review-expert: ALTA (checklist de smells com códigos).
Decisão sugerida: criar references (ex.: smells-heuristicas.md) com o catálogo C/E/F/G/J/N/T em paráfrase; usar em clean-code-expert, refactoring-expert, testing-tdd-expert (T1-T9, E2) e code-review-expert (checklist). J1 é específico de Java: sinalizar ou descartar.

---

### Apêndice A: Concorrência II (PDF p.310-320, impr. 313-323) [continua no próximo bloco]
Confiança do OCR: MÉDIA (prosa legível; bytecode e tabelas com colunas quebradas).
Resumo: Apêndice de Brett L. Schuchert estendendo o cap. Concorrência. Mostra um cliente/servidor, como a adição de threads melhora a vazão e piora a estrutura (responsabilidades misturadas), e analisa a quantidade de caminhos de execução e a não atomicidade de `++`.
Conceitos e regras:
- Exemplo cliente/servidor com teste de desempenho com timeout (10.000 ms); antes de adicionar threads, descobrir se o gargalo é E/S ou processador; threads ajudam em E/S, não em código limitado por CPU [p.311-312].
- Servidor com thread por requisição "é ingênuo": sem limite de threads; mistura responsabilidades (conexão, processamento, política de threads, desligamento) e níveis de abstração na função process [p.312-313].
- Concorrência e SRP: o gerenciamento de threads deve ficar em poucos locais bem controlados, e código que gerencia threads deve só fazer isso; separar facilita testar as outras responsabilidades sem threads; ClientScheduler como interface com ThreadPerRequestScheduler, trocável por ExecutorClientScheduler [p.313-314].
- Um simples `return ++lastIdUsed` com duas threads pode dar três resultados, inclusive duas threads recebendo o mesmo valor; a contagem de caminhos para N instruções de bytecode em T threads é (NT)!/(N!)^T, que dá 12.870 para 8 instruções e 2 threads; com long, 2.704.156 [p.314-316].
- `synchronized` reduz para N! caminhos no caso geral [p.316].
- `++` não é atômico (leitura, soma, escrita em bytecode); atribuição de valor de 64 bits não é garantidamente atômica pela especificação da JVM [p.316-319].
- Necessário saber: onde há valores/objetos compartilhados, qual código causa leitura/atualização concorrente e como evitar [p.319].
- Framework Executor (Java 5): pool de threads, futures, Callable; "mais limpo, fácil de acompanhar e menor" [p.319-320]. Atomic* (AtomicInteger) como alternativa sem bloqueio, com desempenho quase sempre superior (CAS, parágrafo cortado no fim do bloco) [p.320].
Citações curtas de prova:
- "tudo relacionado à threads está num único local, em clientScheduler." [p.313]
O que este trecho NÃO diz: o bloco termina no meio da explicação do CAS (p.320); não cobre testes de código concorrente aqui (trechos posteriores do apêndice estão fora do bloco). Conteúdo muito específico de Java 5.
Relevância: clean-code-expert: BAIXA a MÉDIA (SRP aplicado a concorrência, apenas ponte para classes/sistemas); refactoring-expert: BAIXA; testing-tdd-expert: BAIXA (separar threads para testar o resto); code-review-expert: BAIXA.
Decisão sugerida: descartar em geral; no máximo uma linha em clean-code-expert/skill de concorrência ("isolar gerenciamento de threads em um lugar").

---

## Auditoria da skill atual
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

## Checklist de cobertura
- Primeira página lida: 241
- Última página lida: 320 (confirmado por grep: último marcador `=== PDF PAGINA 320 ===`, linha 3467 de 3511)
- Páginas sem texto útil ou ilegíveis: 248 (abertura de capítulo, quase só ruído), 263 e 280 (aberturas de capítulo, ruído parcial), 1007 (linha de "página em branco" após p.262), listagens de código das p.241-246, 249-262 (muito corrompidas)
- Problemas de extração observados: código-fonte muito corrompido (identificadores, parênteses trocados por `|`, `1`, `l`); palavra "abstração" ausente em G5/G6/G34 e outras ("nível de ."); fim da Conclusão do cap. 17 truncado em p.309 ("Você não se torna um especialista na arte de softwares"); fim do bloco corta o parágrafo sobre CAS em p.320; tabelas de bytecode com colunas quebradas; cabeçalho do cap. 15 diz "Testes de Unidade" embora o título seja "Características Internas do JUnit"; algumas referências cruzadas de página do livro ficam inconsistentes com a numeração do PDF.
- Capítulos/seções cobertos integralmente: Cap. 15 (JUnit); Cap. 16 (SerialDate); Cap. 17 (Odores e Heurísticas) exceto o fim da Conclusão
- Capítulos/seções que continuam em outro bloco: Cap. 14 (começa no bloco anterior, termina em PDF p.247); Cap. 17 Conclusão (truncada em p.309); Apêndice A Concorrência II (começa em PDF p.310 e continua após p.320)
