# Notas: Código Limpo (R. C. Martin), bloco 03, PDF p.161-240

Convenção de página: "PDF N" = marcador do bloco. Número impresso = PDF - 3 (ex.: PDF 161 mostra "158" no cabeçalho), anotado como "impr. M" quando útil.
Capítulos no bloco: fim do Cap. 11 (Sistemas), Cap. 12 (Emergência), Cap. 13 (Concorrência), Cap. 14 (Refinamento Sucessivo, continua no próximo bloco).

---

### Cap. 11: Sistemas, parte final (PDF p.161-167, impr. 158-164) [continua do bloco anterior] (OCR: MÉDIA; prosa legível, código Java/XML RUIM)
Resumo: Fecha a discussão sobre separar preocupações transversais com proxies, frameworks de AOP puramente Java (Spring/JBoss) e AspectJ. Defende que, com lógica de domínio em POJOs desacoplados, a arquitetura pode crescer de forma incremental (sem BDUF), adiando decisões e usando padrões/DSLs só quando agregam valor. Conclui que "sistemas também devem ser limpos".
Conceitos e regras:
- Proxies Java (API de Proxy do JDK, bibliotecas de bytecode) exigem muito código e são complexos mesmo em casos simples; dificultam código limpo e não oferecem mecanismo de "partes" de execução em todo o sistema (POA de verdade) [PDF 161].
- Em frameworks de POA puramente Java (Spring, JBoss), a lógica de negócio é escrita em POJOs centrados no domínio, sem dependência de frameworks empresariais; por isso são mais simples e fáceis de testar, e facilitam implementar user stories corretamente e evoluí-las [PDF 161].
- Preocupações transversais (persistência, transações, segurança, cache, failover) entram por configuração declarativa (XML) ou APIs; o contêiner de injeção de dependência instancia e conecta os objetos. Cada "bean" é uma camada de DECORATOR aninhado ("Boneca Russa") em torno do POJO [PDF 162].
- O código da aplicação precisa de poucas linhas específicas do Spring para obter os objetos; assim fica quase totalmente desacoplado do framework, ao contrário do EJB2 [PDF 162].
- XML pode ser verboso, mas a "política" declarada é mais simples que a lógica de proxy/aspecto oculta gerada automaticamente; isso levou o EJB3 a adotar o modelo do Spring (XML e/ou anotações Java 5) [PDF 163].
- EJB3 com anotações é "muito mais limpo" que EJB2; detalhes de persistência ficam contidos nas anotações e, se mudam pouco, muitas equipes podem mantê-las; também dá para movê-las para descritores XML e deixar POJO puro [PDF 164].
- AspectJ: suporte de primeira classe a aspectos; a abordagem puramente Java do Spring/JBoss atende 80-90% dos casos, segundo o autor; AspectJ exige aprender ferramentas e linguagem novas [PDF 164].
- "Testar a arquitetura": se a lógica de domínio está em POJOs desacoplados de preocupações de arquitetura, dá para evoluir do simples ao sofisticado adotando tecnologias sob demanda. BDUF (Big Design Up Front) é considerado prejudicial: inibe adaptação por resistência psicológica a descartar esforço e porque a arquitetura escolhida contamina as ideias seguintes [PDF 164].
- Contraste com construção civil: lá BDUF é necessário porque mudança radical é impraticável; software pode ter mudança radical economicamente viável se a estrutura separa bem as preocupações [PDF 164-165].
- Começar com arquitetura simples e bem desacoplada, entregar user stories rapidamente e adicionar infraestrutura (cache, segurança, virtualização) conforme necessário. Isso não elimina planejamento: há expectativas de escopo, objetivos e estrutura geral, mas mantém-se a capacidade de mudar [PDF 165].
- APIs superdimensionadas (ex.: EJB2) comprometem a separação de preocupações; uma boa API deve ficar oculta na maior parte do tempo para a equipe focar nas user stories [PDF 165].
- Resumo do autor: arquitetura adequada = domínios modularizados de preocupações, cada um em POJOs, integrados por ferramentas de aspectos pouco invasivas; é testável como o código [PDF 165].
- Otimizar a tomada de decisões: modularidade descentraliza decisões; adiar decisões até o último momento responsável (mais informação, mais feedback) em vez de decisões prematuras [PDF 165].
- Usar padrões com sabedoria: equipes usavam EJB2 só por ser padrão e algumas ficaram obcecadas por padrões populares, perdendo o foco no valor para o cliente; padrões facilitam reuso, mas padronização pode demorar e desviar-se das necessidades reais [PDF 166].
- DSLs (linguagens específicas de domínio): minimizam a "distância de comunicação" entre o conceito do domínio e o código; código legível como prosa de especialista; menos risco de erro de tradução do domínio para implementação [PDF 166].
- Conclusão: arquitetura invasiva reduz agilidade e obscurece a lógica de domínio (bugs se escondem, perde-se produtividade e vantagens do TDD); usar POJOs e mecanismos de aspectos de forma não invasiva; "use a coisa mais simples que funcione" [PDF 166-167].
Citações curtas de prova:
- "Os sistemas também devem ser limpos." [PDF 166]
- "jamais se esqueça de usar a coisa mais simples que funcione" [PDF 167, quebra de linha no OCR]
O que este trecho NÃO diz: não trata de separar construção de uso (isso está antes de PDF 161, fora do bloco); não dá critérios práticos de quando usar AspectJ vs. Spring além do "80-90%"; os números/exemplos são de Java/Spring 2.5/EJB3 da época (código ilegível por OCR).
Relevância: clean-code-expert: MÉDIA (POJOs, não-invasividade e testabilidade da arquitetura); refactoring-expert: BAIXA; testing-tdd-expert: MÉDIA (POJOs testáveis; arquitetura "testável"); code-review-expert: BAIXA.
Decisão sugerida: usar em clean-code-expert/references (seção "Sistemas": domínio em POJOs, adiar decisões, sem BDUF, DSL para legibilidade). Código XML/Java do capítulo: descartar (ilegível e datado).

---

### Cap. 12: Emergência (PDF p.168-173, impr. 165-170) (OCR: prosa BOA; trechos de código MÉDIA)
Resumo: Apresenta as quatro regras do "Projeto Simples" de Kent Beck, em ordem de prioridade: rodar todos os testes, sem duplicação, expressar a intenção do programador, minimizar classes e métodos. Testes dão segurança para refatorar; as demais regras guiam a refatoração.
Conceitos e regras:
- Quatro regras, em ordem de relevância: (1) efetuar todos os testes; (2) sem duplicação de código; (3) expressar o propósito do programador; (4) minimizar número de classes e métodos [PDF 169].
- Regra 1: o sistema deve funcionar como esperado; um sistema que não pode ser verificado não deveria ser implementado. Tornar o sistema testável empurra para classes pequenas e de propósito único (SRP) e, com acoplamento forte dificultando testes, para DIP, injeção de dependência e interfaces; "criar testes leva a projetos melhores" [PDF 169].
- Regras 2-4 = refatoração: com testes, refatora-se gradualmente; a cada linha nova, parar e avaliar se prejudicou o projeto; se sim, limpar e rodar os testes. Testes removem o medo de quebrar ao limpar. Na refatoração aplica-se qualquer princípio de bom design (coesão, acoplamento, separar preocupações, reduzir classes/funções, melhores nomes) [PDF 169].
- Duplicação é "o inimigo principal"; representa trabalho, risco e complexidade extras. Formas: linhas idênticas; linhas semelhantes (aproximá-las para refatorar); duplicação de implementação (ex.: `isEmpty()` implementado em termos de `size()` em vez de ter contador/booleano separado) [PDF 170].
- Eliminar duplicação mesmo pequena: exemplo de `scaleToOneDimension` e `rotate` que repetiam dispose/gc/atribuição da imagem; extração de `replaceImage(...)` [PDF 170-171].
- Extrair semelhança em nível baixo revela violações do SRP, permite mover o método extraído para outra classe (mais visibilidade) e gera "pequena reutilização" que pode reduzir muito a complexidade [PDF 171].
- TEMPLATE METHOD é técnica comum para remover duplicação de alto nível: exemplo `VacationPolicy` com `accrueUSDivisionVacation` e `accrueEUDivisionVacation` quase iguais exceto cálculo do mínimo legal; solução: `accrueVacation()` na classe abstrata chama passos, subclasses preenchem o "buraco" (`alterForLegalMinimums`) [PDF 171-172].
- Expressividade: maior custo de software está na manutenção; código deve expressar claramente o propósito; mais claro = menos tempo de outros para entender, menos defeitos e menor custo. Meios: bons nomes (não se surpreender ao descobrir o que classe/função faz); classes e funções pequenas (fáceis de nomear e entender); nomenclatura padrão (nomes de padrões como COMMAND ou VISITOR em nomes de classes); testes de unidade bem escritos (funcionam como documentação, dão rápido entendimento da classe) [PDF 172-173].
- "A forma mais importante de ser expressivo é tentar": não passar ao próximo problema logo que funciona; o próximo leitor provavelmente será você; cuidar do que se criou (nomes melhores, dividir funções grandes) [PDF 173].
- Regra 4 (poucas classes e métodos): cuidado com exagero nos próprios princípios (duplicação, expressividade, SRP) que gera "estruturas minúsculas". Muitas classes/métodos podem vir de dogmatismo (interface para cada classe; separar sempre dados e comportamento em classes distintas); adotar abordagem pragmática. É a regra de menor prioridade: testes, eliminar duplicação e expressar-se vêm antes [PDF 173].
- Conclusão: as práticas não substituem experiência, mas condensam décadas e ajudam a aderir a bons princípios que levariam anos para aprender [PDF 173].
Citações curtas de prova:
- "A repetição de código é o inimigo principal para um sistema bem desenvolvido." [PDF 170]
- "Criar testes leva a projetos melhores." [PDF 169]
- "Cuidar é um recurso precioso." [PDF 173]
- "Essas regras estão em ordem de relevância." [PDF 169]
O que este trecho NÃO diz: não dá limites numéricos de tamanho de função/classe; não lista code smells (isso é outro capítulo); o exemplo de Template Method está em código OCR corrompido (a descrição textual é legível).
Relevância: clean-code-expert: ALTA (4 regras, duplicação, expressividade, contrapeso contra excesso de classes); refactoring-expert: ALTA (testes como pré-condição, ordem das regras, extração de método, Template Method); testing-tdd-expert: ALTA (testabilidade guia o design; testes removem medo); code-review-expert: MÉDIA (critérios de revisão: duplicação, expressividade, dogmatismo).
Decisão sugerida: usar em clean-code-expert (SKILL.md: lista das 4 regras em ordem; references: duplicação e Template Method, ressalva anti-dogmatismo), refactoring-expert (ordem de prioridade e uso de testes como rede), testing-tdd-expert (regra 1), code-review-expert (checklist de expressividade/duplicação).

---

### Cap. 13: Concorrência (PDF p.174-187, impr. 171-184) (OCR: prosa BOA/MÉDIA; código curto MÉDIA)
Resumo: Concorrência é estratégia de desacoplamento (o quê vs. quando), útil para estrutura e vazão, mas difícil de acertar. O capítulo lista mitos, princípios de defesa (SRP, escopo mínimo de dados, cópias, threads independentes), uso da biblioteca, modelos de execução clássicos, e estratégias específicas para testar código com threads.
Conceitos e regras:
- Código concorrente limpo é difícil; código multithread pode parecer bom mas falhar em nível mais baixo, só sob carga [PDF 175].
- Por que concorrência: desacopla "o quê" de "quando"; melhora estrutura e vazão; exemplos: servlets, agregador de sites com E/S lenta, atendimento de vários usuários, processamento paralelo de séries de dados [PDF 175-176].
- Mitos: concorrência sempre melhora desempenho (falso; só quando há muito tempo de espera divisível); o projeto não muda (falso); não é preciso entender concorrência com contêiner Web/EJB (falso) [PDF 176]. Afirmações corretas: adiciona overhead e código; correção é complexa mesmo em problemas simples; bugs de concorrência geralmente não se repetem e são descartados como casos isolados; costuma exigir mudança de estratégia de projeto [PDF 176].
- Exemplo `getNextId()` com `++lastIdUsed` compartilhado entre duas threads: três resultados possíveis, incluindo ambas receberem o mesmo valor. O texto afirma 12.870 caminhos de execução possíveis para duas threads no método e 2.704.156 se o campo passar de int para long [PDF 177] (números como estão no texto; não verificados fora do livro).
- SRP aplicado: código de concorrência tem ciclo próprio de mudança e desafios próprios; "mantenha seu código voltado para a concorrência separado do resto do código" [PDF 177-178].
- Limitar escopo dos dados: restringir seções críticas `synchronized`; mais lugares que alteram dado compartilhado = mais chance de esquecer proteção, duplicar esforço (viola DRY) e dificultar achar falhas; encapsular dados e limitar acesso [PDF 178].
- Usar cópias dos dados (somente-leitura ou copiar, processar em threads e unir resultados numa só thread); custo de criação/GC provavelmente compensa se evita sincronização (vale medir) [PDF 178].
- Threads o mais independentes possível: cada thread com dados de fonte não compartilhada em variáveis locais (ex.: servlets recebem tudo por parâmetros de doGet/doPost); dividir dados em subsistemas independentes [PDF 178-179].
- Conheça a biblioteca (Java 5): coleções thread-safe (`java.util.concurrent`, ex.: ConcurrentHashMap), framework Executor, soluções non-blocking, atenção a classes de biblioteca que não são thread-safe; ReentrantLock, Semaphore, CountDownLatch; revisar `java.util.concurrent`, `.atomic`, `.locks` [PDF 179].
- Definições: Bound Resources, Mutual Exclusion, Starvation, Deadlock, Livelock [PDF 180].
- Modelos clássicos: Producer-Consumer, Readers-Writers, Dining Philosophers; a maioria dos problemas de concorrência seria variação desses três; "aprenda esses algoritmos básicos" [PDF 180-181].
- Dependências entre métodos sincronizados causam bugs sutis; recomenda evitar usar mais de um método num objeto compartilhado; se necessário, três opções: bloqueio no cliente, bloqueio no servidor (método que bloqueia e chama todos), servidor extra (intermediário) [PDF 181-182].
- Manter seções sincronizadas pequenas: bloqueios causam atraso e overhead; proteger seções críticas mas o mínimo possível; estender a sincronização além do mínimo aumenta conflito e prejudica desempenho [PDF 182].
- Desligamento correto é difícil (deadlock de pai esperando filhas; par producer/consumer que impede sinal de término); pensar no desligamento cedo, vai levar mais tempo que o esperado [PDF 182-183].
- Testes de código com threads (recomendações): tratar falhas falsas como questões de threads, não ignorar como "casos isolados"; primeiro fazer o código sem thread funcionar (POJOs chamados pelas threads, testáveis fora do ambiente com threads); código com threads portátil (uma/várias threads, objetos artificiais rápidos/lentos/variáveis, número de iterações configurável); ajustável (permitir mudar número de threads, até em execução; considerar autoajuste); rodar com mais threads que processadores; rodar em diferentes plataformas (autor relata diferença de comportamento entre OS X e Windows XP em VM, 2007); instrumentar o código para forçar falhas [PDF 183-185].
- Instrumentação manual (inserir `wait`, `sleep`, `yield`, `priority`, exemplo com `Thread.yield()` em método sincronizado) tem problemas: achar locais manualmente, não saber qual chamada, atrasa produção, é "tiro no escuro" [PDF 185-186].
- Instrumentação automatizada: ThreadJigglePoint com duas implementações (produção: vazia; teste: aleatoriamente dorme/cede/prossegue), via AOP, CGLIB ou ASM; rodar milhares de vezes; ConTest (IBM) mencionado [PDF 186-187].
- Conclusão: seguir SRP dividindo em POJOs que enxergam threads vs. que as ignoram; manter pequeno e focado o código que usa threads; conhecer biblioteca e algoritmos; bloquear só o necessário; evitar chamar seção bloqueada de outra; reduzir objetos e escopo compartilhados; alterar modelos dos objetos compartilhados para acomodar clientes; testabilidade "que vem com as Três Leis do TDD" implica portabilidade [PDF 187].
Citações curtas de prova:
- "Concorrência é uma estratégia de desacoplamento." [PDF 175]
- "Escrever programas concorrentes limpos é difícil, muito." [PDF 175]
- "Mantenha seu código voltado para a concorrência separado do resto do código" [PDF 178, OCR traz nota de rodapé colada]
- "Não ignore falhas de sistema como se fossem casos isolados." [PDF 183]
O que este trecho NÃO diz: o tutorial aprofundado fica no Apêndice (remetido a "Concorrência II", impr. p.317, fora do bloco); não cobre modelos fora de Java (async/await, actors, etc.); não dá critérios quantitativos para "pequeno".
Relevância: clean-code-expert: BAIXA/MÉDIA (SRP para concorrência, POJOs); refactoring-expert: BAIXA; testing-tdd-expert: ALTA para testes de código com threads (regras de teste, instrumentação, portabilidade); code-review-expert: MÉDIA (checklist: escopo de dados compartilhados, seções sincronizadas, dependência entre métodos sincronizados).
Decisão sugerida: usar em um reference de concorrência (nova skill/arquivo) e em testing-tdd-expert (estratégias de teste de threads); em code-review-expert como checklist de revisão de código concorrente. Detalhes Java 5: citar como exemplos, não como regra universal.

---

### Cap. 14: Refinamento Sucessivo (PDF p.188-240, impr. 185-237) [continua no próximo bloco] (OCR: prosa BOA; código Java RUIM, quase todo corrompido)
Resumo: Estudo de caso do analisador de argumentos de linha de comando `Args`. O autor mostra primeiro a versão final limpa, depois o "rascunho" bagunçado e a refatoração em passos minúsculos, sempre mantendo testes verdes, até chegar a uma estrutura com uma interface `ArgumentMarshaler` e derivados, e ao isolamento do tratamento de erros em `ArgsException`. O bloco termina no meio do Listagem 14-13 (testes de `Args`), antes do fim do capítulo.
Conceitos e regras:
- Premissa: código limpo não sai pronto; "para criar um código limpo é preciso criar primeiro um sujo e então limpá-lo"; analogia com rascunhos de redação; programar como arte e refinamento constante [PDF 195].
- Deixar o programa "que funciona" como está e passar adiante é, segundo o autor, "suicídio profissional" [PDF 195].
- Versão final (Listagem 14-2) é apresentada com uso simples (schema "l,p#,d*", `getBoolean/getInt/getString`; `ArgsException` com `errorMessage`) e comentário de que dá para ler de cima para baixo sem saltar; autor pede ao leitor atenção a nomes, tamanho de funções e formato; extensibilidade: novo tipo exige um derivado de `ArgumentMarshaler`, um `getXXX` e um `case` em `parseSchemaElement`, mais código/mensagem de erro [PDF 189-195].
- Observação do autor: Java é prolixo por ser estaticamente tipada; em Ruby/Python/Smalltalk o programa ficaria bem menor (nota de rodapé) [PDF 195].
- O rascunho (14-8) "funciona" mas é "uma zona": muitas variáveis de instância, strings estranhas ("TILT"), `HashSet`/`TreeSet`, blocos try/catch amontoados [PDF 196-201].
- A bagunça cresceu gradualmente: versão só com booleanos (14-9) era compacta e simples, mas já continha "sementes" da bagunça; ao adicionar String (14-10) e depois Integer a coisa fugiu do controle [PDF 201-207].
- Regra de parada: ao perceber que adicionar mais dois tipos pioraria muito, o autor "parou" de adicionar recursos e começou a refatorar; cada tipo exigia código em três pontos (parse do schema, conversão de strings da linha de comando, `getXXX`); "muitos tipos diferentes, todos com métodos similares" sugeriu uma classe, o `ArgumentMarshaler` [PDF 207].
- Incrementalismo: uma das melhores maneiras de arruinar um programa é fazer mudanças estruturais excessivas "visando uma melhoria"; usar a doutrina do TDD de manter o sistema sempre operante; exige conjunto de testes automatizados que possa ser rodado quando quiser. Autor mantinha testes de unidade (JUnit) e de aceitação (FitNesse, páginas wiki) [PDF 207-208].
- Passos pequenos observados (sempre rodando testes): adicionar o esqueleto de `ArgumentMarshaler` no fim da classe; trocar o HashMap de booleanos para guardar o marshaler (mudança mínima) e consertar rapidamente os testes que quebram (um null check mudou de lugar: removeu `falseIfNull`, extraiu variável `am`, renomeou para nome curto porque o nome longo era "redundante e bagunçava a função"); mover comportamento de boolean, depois string, depois int para a classe base e então "empurrar" hierarquia abaixo para derivados via método abstrato `set`/`get`; remover variáveis/funções não usadas da base; introduzir um novo `Map<Character, ArgumentMarshaler>` em paralelo aos três antigos, migrar método a método e só então apagar os três maps; trocar `isBooleanArg(char)` por checagem de tipo e depois encurtar; integrar tratamento de exceção em `setArgument` [PDF 208-221].
- Episódio de lição sobre testes (PDF 220): uma alteração usando `ClassCastException` foi necessária porque os testes de aceitação do FitNesse garantiam que chamar `getBoolean` em parâmetro não booleano retornasse falso, mas os testes de unidade não cobriam; o autor só rodava os de unidade até então. Nota de rodapé: adicionou um teste de unidade que invoca todos os testes do FitNesse "a fim de evitar surpresas" (legível, mas trecho parcialmente corrompido) [PDF 219-220].
- Após a primeira refatoração (14-12) o autor avalia: "um pouco frustrante": estrutura melhorou, mas ainda restavam variáveis no início, uma "estrutura case de tipos" em `setArgument` e funções `set` horríveis, mais o tratamento de erros [PDF 227]. Texto marca esses pontos com códigos de catálogo de smells ([G23] no case de tipos, [F1] ao passar duas variáveis como parâmetros que "suja o código", [N5] no encurtamento de nome); o significado dos códigos está em outro capítulo/bloco e não é explicado aqui [PDF 209, 227].
- Solução para evitar passar `args` e `currentArgument`: converter o array em lista e passar um `Iterator` para as funções `set` (dez passos com testes após cada) [PDF 227-228].
- Remover o `if/else` por tipo: primeiro tirar a condição de erro de dentro da cadeia (`if (m == null) return false;` antes do `try`); passar `Iterator` a `setBooleanArg` mesmo que não use, porque `setIntArg`/`setStringArg` precisarão; criar `set(Iterator<String>)` abstrato em `ArgumentMarshaler` e implementá-lo em cada derivado; reduzir a cadeia a `m.set(currentArgument)`; transformar `ArgumentMarshaler` em interface [PDF 228-234].
- "Refatorar é como resolver o cubo de Rubik": muitos passos pequenos, cada um habilita o próximo; é normal inserir e remover as coisas de novo (ex.: tratamento de exceção) [PDF 230].
- Demonstração de extensibilidade ao final: adicionar tipo `double` com teste primeiro (`testSimpleDoublePresent`), depois o ramo em `parseSchemaElement`, classe `DoubleArgumentMarshaler`, novo `ErrorCode` e `getDouble`; testes passam sem problemas; depois testes de erro (`testInvalidDouble`, `testMissingDouble`) "por questão de finalização" [PDF 234-236].
- Tratamento de erros: o autor considera o código de exceção "horrível" e que não pertence à classe `Args`; exceções (ex.: `ParseException`, que "não cabe a nós") são unificadas em `ArgsException` em módulo próprio, com `ErrorCode`, e o suporte de mensagens de erro migra para lá; "cerca de 30 pequenos passos" com testes entre cada (OCR mostra "30") [PDF 236-238].
- Início da Listagem 14-13 (`ArgsTest`): testes de unidade para schema vazio, argumento inesperado, schema com caractere não letra, formato inválido, booleano/string presentes, string faltando, espaços no formato; usam `try/fail/catch` com asserts sobre código de erro e id do argumento; a listagem é cortada em PDF 240 [PDF 239-240].
Citações curtas de prova:
- "Para criar um código limpo, é preciso criar primeiro um “sujo” e, então limpá-lo." [PDF 195]
- "Refatorar é como resolver o cubo de Rubik." [PDF 230]
- "O incrementalismo exige que eu conserte isso rapidamente antes de fazer qualquer outra alteração." [PDF 209]
- "Portanto, eu parei" [PDF 207; autor para de adicionar recursos para refatorar]
O que este trecho NÃO diz: o capítulo termina após este bloco (restam o fim da Listagem 14-13 e as listagens finais 14-14 a 14-16 e conclusões; não concluir sobre o resto do capítulo); não define aqui o catálogo de smells citado entre colchetes; quase todo código está ilegível por OCR, então detalhes de implementação (nomes de métodos exatos, assinaturas) não são confiáveis; a leitura é descritiva do processo, não uma lista de regras gerais.
Relevância: clean-code-expert: ALTA (processo "sujo e depois limpar", nomes redundantes, parâmetros demais, tratamento de erros em classe própria, polimorfismo no lugar de if/else); refactoring-expert: ALTA (passos pequenos com testes, mudança paralela antes de remover o antigo, migração incremental, parar de adicionar feature e refatorar); testing-tdd-expert: ALTA (testes unitários + aceitação como rede, lição de rodar ambos, teste-primeiro ao adicionar double); code-review-expert: MÉDIA (sinais de que a bagunça cresce: variáveis demais, cadeias de tipo, tratamento de erro misturado).
Decisão sugerida: usar em refactoring-expert (receita passo a passo "mudança paralela, migrar, apagar", critério de parada e rede de testes) e testing-tdd-expert (acompanhar com testes de aceitação além dos unitários); em clean-code-expert (princípio de refinamento sucessivo, tratamento de erros isolado). Não copiar listagens de código (ilegíveis e de direitos autorais).

---

## Auditoria da skill atual

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

## Checklist de cobertura
- Primeira página lida: PDF 161 (impr. 158)
- Última página lida: PDF 240 (impr. 237) (confirmado por Grep: último marcador `=== PDF PAGINA 240 ===` na linha 3780; arquivo tem 3828 linhas, todas lidas)
- Páginas sem texto útil ou ilegíveis: PDF 168 (abertura do Cap. 12) e PDF 174 (abertura do Cap. 13) e PDF 188 (abertura do Cap. 14) têm ruído de OCR nas ilustrações de abertura; PDF 167 é bibliografia do Cap. 11; bibliografia do Cap. 12 em PDF 173 (apenas estrutura: [XPE], [GOF]); código em PDF 161-164, 170-172, 185-186, 189-240 muito corrompido.
- Problemas de extração observados: caracteres trocados (`l`/`1`/`!`, `{`→`(`/`|`), acentos e hifenização, nomes de identificadores quebrados (ex.: `ArgumentMarshaler` com variações), rodapés de nota colados no texto (ex.: nota [8] em PDF 178; nota 17 em PDF 164 com linha desfigurada), números de página impressos misturados ao cabeçalho, mensagens de erro do código traduzidas parcialmente nas últimas listagens, páginas do Cap. 13 com tabelas de definições em colunas.
- Capítulos/seções cobertos integralmente: Cap. 12 (Emergência) completo; Cap. 13 (Concorrência) completo.
- Capítulos/seções que continuam em outro bloco: Cap. 11 (Sistemas) começa antes de PDF 161 (parte inicial no bloco anterior; aqui só do exemplo de proxy do JDK até a bibliografia); Cap. 14 (Refinamento Sucessivo) continua após PDF 240 (Listagem 14-13 interrompida; faltam listagens 14-14 a 14-16 e conclusão do capítulo).
