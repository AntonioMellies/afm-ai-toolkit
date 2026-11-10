# Notas de leitura: Código Limpo (R. C. Martin), bloco 02, PDF p.81-160

Nota geral: "impr." = número impresso visível no cabeçalho/rodapé (a defasagem para o PDF varia: ~6 no Cap. 5, 5 no Cap. 6, 4 nos Caps. 7-8, 3 do Cap. 9 em diante). Referências a "[Gnn]" são códigos do catálogo de heurísticas do livro, que está em outro bloco (não lido aqui).

---

### Capítulo 5: Formatação (PDF p.81-97; impr. 75-91)
Confiança do OCR: MÉDIA (prosa legível; listagens de código muito corrompidas; figuras 5.1 e 5.2 ilegíveis nos números)

Resumo: A formatação é tratada como comunicação, a primeira obrigação do profissional; o autor propõe um conjunto simples de regras verticais e horizontais, que a equipe deve adotar de forma única e consistente. O estilo e a disciplina sobrevivem mesmo quando o código é reescrito.

Conceitos e regras:
- Objetivo: formatação serve à comunicação; a legibilidade de hoje afeta todas as mudanças futuras ("seu estilo e disciplina sobrevivem, mesmo que seu código não") [p.82, impr. 76]
- Código bem formatado transmite profissionalismo; código bagunçado sugere descuido em todo o projeto [p.81-82]
- Escolher regras simples, aplicá-las com consistência, de preferência com ferramenta automatizada [p.82]
- Tamanho de arquivo: estudo em 7 projetos Java (JUnit, FitNesse, TestNG, Time and Money, JDepend, Ant, Tomcat); sistemas significativos são possíveis com arquivos tipicamente ~200 linhas, teto de ~500; não é regra fixa, mas arquivos pequenos são mais fáceis de entender [p.82] (os valores exatos de cada projeto na figura estão ilegíveis; só o texto corrido é usado)
- Metáfora do jornal: nome simples que diga se estamos no módulo certo; conceitos e algoritmos de alto nível no topo; detalhes crescem para baixo [p.83]
- Espaçamento vertical: linhas em branco separam conceitos (pensamentos completos); sem elas a legibilidade se degrada [p.83-84]
- Continuidade vertical: linhas intimamente relacionadas ficam juntas; comentários inúteis entre declarações de variáveis quebram a associação [p.84-85]
- Distância vertical: conceitos intimamente relacionados ficam próximos; não separar em arquivos distintos sem razão forte; essa é uma razão para evitar variáveis protegidas [p.85]
- Declaração de variáveis locais: o mais próximo possível do uso; em funções muito pequenas, no topo da função; variáveis de controle de loop dentro da estrutura de iteração [p.85-86]
- Variáveis de instância: no início da classe, em local bem conhecido; o autor não vê motivo para escolher entre convenção Java (topo) e C++ (fim) além de ser um local previsível [p.86]
- Funções dependentes: a função que chama fica acima da chamada, e próximas verticalmente; dá fluxo natural e permite ler "de cima para baixo" [p.87-89]
- Constantes no nível apropriado: exemplo "FrontPage" passada de cima, não escondida em função de baixo nível [p.89, cita [G35]]
- Afinidade conceitual: quanto maior a afinidade (dependência direta, mesma convenção de nomes, variações da mesma tarefa), menor a distância vertical; vale mesmo sem chamada entre as funções (exemplo: família assertTrue/assertFalse do JUnit) [p.89]
- Ordenação vertical: dependências apontam para baixo (função chamada abaixo da chamadora); oposto das linguagens que exigem definição antes do uso (Pascal, C, C++) [p.89-90]
- Formatação horizontal: em 7 projetos as linhas ficam em torno de 45 caracteres, com declínio acima de 80; o autor aceita 100 ou 120 e considera passar disso "falta de cuidado"; seu limite pessoal é 120; recusa reduzir fonte para caber 200 colunas [p.90]
- Espaço horizontal: espaços em volta de operadores de atribuição; sem espaço entre nome de função e parêntese; espaço depois das vírgulas dos argumentos; usar espaçamento para destacar precedência de operadores (fatores sem espaço, termos com espaço) [p.91]. O texto avisa que ferramentas de reformatação costumam perder essa distinção sutil [p.91]
- Alinhamento horizontal de declarações/atribuições: o autor abandonou; enfatiza as coisas erradas; lista longa a alinhar indica que a classe é grande demais e deve ser dividida [p.92-93]
- Endentação: reflete a hierarquia de escopos; sem ela o código fica quase ininteligível; evitar colapsar if/while/funções curtas em uma linha [p.93-94]
- Escopos minúsculos (corpo de while/for vazio ou de uma linha): evitar; quando inevitável, recuar o ponto-e-vírgula em linha própria para ficar visível [p.95]
- Regra de equipes: a equipe escolhe um único estilo e todos o seguem; no FitNesse isso levou ~10 minutos e foi codificado no formatador da IDE [p.95]
- Listagem 5.6 (CodeAnalyzer) apresentada como exemplo das regras do autor; o código está em OCR ruim e não foi usado [p.96-97]

Citações curtas de prova:
- "Importante demais para se ignorar e importante demais para ser tratada religiosamente." [p.82]
- "Os conceitos intimamente relacionados devem ficar juntos verticalmente [G10]." [p.85]
- "Mas ultrapassar isso provavelmente é apenas falta de cuidado." [p.90]
- "Uma equipe de desenvolvedores deve escolher um único estilo de formatação, e, então, todos os membros devem usá-lo." [p.95; trecho do pull-quote, OCR parcialmente confuso]

O que este trecho NÃO diz: não fixa um número obrigatório de linhas por arquivo (diz explicitamente que não deve ser regra fixa); não impõe chaves/tabulação específicos (isso é decisão da equipe); não trata de formatação em linguagens além de Java/C++/Pascal em termos de ordenação.
Relevância: clean-code-expert: ALTA (a skill atual não tem seção de formatação); code-review-expert: MÉDIA (critérios objetivos para revisão de estilo); refactoring-expert: BAIXA; testing-tdd-expert: NENHUMA.
Decisão sugerida: usar em clean-code-expert (nova reference `formatting.md`: metáfora do jornal, densidade/distância/ordenação vertical, limite horizontal 100-120, regra de equipe com formatter automático); breve menção em code-review-expert.

---

### Capítulo 6: Objetos e Estruturas de Dados (PDF p.98-106; impr. 93-101)
Confiança do OCR: MÉDIA (prosa legível com ruído; código corrompido mas a estrutura é compreensível)

Resumo: Objetos escondem dados e expõem comportamento; estruturas de dados expõem dados e quase não têm comportamento. Os dois são opostos complementares, cada um facilitando um tipo de mudança, e misturá-los gera híbridos ruins. Inclui a Lei de Demeter, DTOs e Active Record.

Conceitos e regras:
- Variáveis privadas existem para permitir mudar tipo/implementação; adicionar getters/setters automaticamente expõe a implementação [p.98]
- Abstração de dados: ocultar implementação não é só pôr getters/setters; é expor interfaces abstratas que deixam manipular a essência sem conhecer a implementação (exemplos Point cartesiano/polar, Vehicle com percentual de combustível vs litros/capacidade) [p.99-100]
- Preferir expressar dados de forma abstrata; pensar bastante em como representar; "a pior opção é adicionar levianamente" getters/setters [p.100]
- Anti-simetria data/objeto: objetos usam abstrações e expõem funções; estruturas de dados expõem dados sem funções significativas [p.100]
- Código procedimental (estruturas de dados + funções externas) facilita adicionar novas funções sem mexer nas estruturas, mas dificulta adicionar novas estruturas; código OO facilita adicionar novas classes sem mudar funções, mas dificulta adicionar novas funções [p.101-102]
- "Tudo é um objeto" é descrito como mito; às vezes é melhor estrutura de dados simples com procedimentos; escolher conforme o eixo de mudança esperado [p.102, 106]
- Lei de Demeter: um módulo não deve enxergar o interior dos objetos que manipula; método f de classe C só chama métodos de C, de objeto criado por f, de objeto passado como parâmetro a f, e de objeto em variável de instância de C; não chamar métodos de objetos retornados por essas chamadas ("fale com conhecidos, não com estranhos") [p.102-103]
- Carrinhos de trem (cadeias de chamadas): considerados descuidados, geralmente devem ser evitados [G36]; dividir em variáveis intermediárias ainda pode violar a lei [p.103]
- A violação só existe se os elementos forem objetos; se forem estruturas de dados, a lei não se aplica (expõem seu interior naturalmente). O uso de getters confunde essa distinção; frameworks de beans exigem acessores em estruturas simples [p.103]
- Híbridos (metade objeto, metade estrutura): têm funções significativas e também variáveis/acessores públicos; dificultam adicionar funções e estruturas; "a pior coisa em ambas as condições"; sinal de modelo confuso [p.104]
- Solução para estruturas ocultas: se são objetos, mandar o objeto fazer algo (ex.: pedir ao contexto para criar o arquivo temporário) em vez de perguntar sua estrutura interna; descobrir o que se quer fazer com o dado (o exemplo mostra que a intenção era criar um arquivo de rascunho) [p.104]
- Observação lateral: mistura de níveis de detalhe (pontos, barras, extensões, objetos File) é confusa [G34][G6] [p.104]
- Rodapé: o padrão de uso de dados de outro objeto é às vezes chamado de "Feature Envy" no livro de refatoração (OCR: "Feature Emvv") [p.104, nota 4]
- DTO: forma perfeita de estrutura de dados = classe com variáveis públicas e nenhuma função; úteis para banco de dados, mensagens de socket, primeiros estágios de tradução de dados brutos [p.105]
- Bean (privado + getter/setter): "encapsulamento aparente", geralmente sem vantagem real [p.105]
- Active Record: DTO com métodos de navegação (save, find); o erro comum é pôr regras de negócio neles, criando híbrido; solução: tratar como estrutura de dados e criar objetos separados com as regras que ocultem o Active Record interno [p.106]
- Conclusão: bons desenvolvedores escolhem a abordagem sem preconceito conforme o que precisam mudar [p.106]

Citações curtas de prova:
- "Os objetos usam abstrações para esconder seus dados, e expõem as funções que operam em tais dados." [p.100]
- "Programadores experientes sabem que a ideia de que tudo é um objeto é um mito." [p.102]
- "fale apenas com conhecidos, não com estranhos" [p.103]
- "Eles são a pior coisa em ambas as condições. Evite criá-los." [p.104]

O que este trecho NÃO diz: não menciona Value Objects nem recomenda trocar primitivos (String/Double) por tipos de domínio; não recomenda criar getters encadeados agregadores como solução para Demeter (na verdade critica essa saída: "abundância de métodos"); não condena DTOs, apenas Active Records com regras de negócio e híbridos.
Relevância: clean-code-expert: ALTA (objetos vs estruturas, Demeter, híbridos); code-review-expert: ALTA (sinais de híbridos, train wrecks, Active Record com regra); refactoring-expert: MÉDIA (sai de train wreck para "tell, don't ask"); testing-tdd-expert: NENHUMA.
Decisão sugerida: usar em clean-code-expert (reference `objects-and-data-structures.md`) e corrigir o exemplo de Demeter da skill; sinais de revisão em code-review-expert.

---

### Capítulo 7: Tratamento de Erro (PDF p.107-116; impr. 103-112) (por Michael Feathers)
Confiança do OCR: BOA (prosa e código curto razoavelmente legíveis; alguns nomes de variáveis corrompidos)

Resumo: Tratamento de erro é necessário mas não pode obscurecer a lógica. O capítulo defende exceções no lugar de códigos de retorno, escopo try/catch/finally escrito primeiro com TDD, contexto nas exceções, wrappers de APIs de terceiros, Special Case para fluxo normal, e nunca retornar nem passar null.

Conceitos e regras:
- Tratamento de erro que "domina" o código, a ponto de não se ver o que ele faz, está errado [p.107]
- Usar exceções em vez de retornar códigos/flags: códigos entopem o chamador, que pode esquecer de verificar; com exceções, o algoritmo e o tratamento de erro ficam separados e estudáveis de forma independente [p.108-109]
- Escrever primeiro a estrutura try-catch-finally: o try define um escopo semelhante a transação; o catch deve deixar o programa em estado consistente; começar por um teste que força a exceção, depois implementar, depois refatorar (ex.: restringir de Exception para FileNotFoundException) [p.109-111]
- Usar exceções não verificadas (unchecked): exceções verificadas violam o Princípio Aberto-Fechado e quebram o encapsulamento (mudança em nível baixo força alterar assinaturas em cascata); podem ser úteis em bibliotecas críticas, mas no desenvolvimento de aplicativos "os custos superam as vantagens"; cita que C#, C++, Python e Ruby não as têm [p.110-111]
- Fornecer contexto com a exceção: mensagem informativa com a operação que falhou e o tipo da falha; stack trace não diz a intenção da operação [p.111]
- Definir classes de exceção em função de como serão capturadas (necessidade do chamador), não por origem/tipo; exemplo de try/catch repetitivo em chamada a API de terceiros reduzido por um wrapper que traduz várias exceções para um tipo comum [p.111-112]
- Empacotar (wrap) APIs de terceiros é "a melhor prática": minimiza dependências, facilita mocks nos testes, evita ficar preso ao modelo do fornecedor [p.112-113]
- Geralmente uma classe de exceção por área basta; informações na exceção distinguem erros; classes diferentes só se for preciso capturar uma e deixar passar a outra [p.113]
- Definir o fluxo normal: padrão Special Case (de Fowler): em vez de try/catch para "sem despesas de refeição", retornar um objeto especial (PerDiemMealExpenses) que devolve o valor padrão; o cliente não trata o caso especial [p.113-114]
- Não retornar null: cria trabalho para os chamadores; basta esquecer uma verificação para falhar (NullPointerException); em vez disso lançar exceção ou retornar objeto Special Case; embrulhar métodos de terceiros que retornem null; para coleções, retornar lista vazia (Collections.emptyList()) [p.114-115]
- Não passar null: pior que retornar; lançar InvalidArgumentException ou usar assert não resolve de fato (ainda há erro em tempo de execução e o que o handler faria?); a abordagem lógica é proibir passagem de null por padrão [p.115-116]
- Conclusão: limpo e robusto não são conflitantes se o tratamento de erro for uma preocupação separada [p.116]

Citações curtas de prova:
- "O código de chamada fica mais limpo e sua lógica não fica ofuscada pelo tratamento de erro." [p.108]
- "Os blocos try são como transações." [p.109; OCR: "os blocos try são como transações"]
- "empacotar APIs de terceiros é a melhor prática que existe" [p.112]
- "Retornar null dos métodos é ruim, mas passar null para eles é pior." [p.115; OCR com "nul1"]

O que este trecho NÃO diz: não recomenda Optional/Result types (é livro baseado em Java 5-ish); não afirma que todo erro deve virar exceção (o Special Case mostra o contrário); não cobre logging estruturado, retries, circuit breaker; o argumento contra exceções verificadas é restrito a "desenvolvimento geral de aplicativo", não a bibliotecas críticas.
Relevância: clean-code-expert: ALTA (a skill tem seção curta); code-review-expert: ALTA (null, catch genérico, error codes); refactoring-expert: MÉDIA (Special Case, wrap de API); testing-tdd-expert: MÉDIA (try/catch com TDD, testes que forçam exceção).
Decisão sugerida: usar em clean-code-expert (reference `error-handling.md`) e code-review-expert; Special Case e try-first em refactoring/testing.

---

### Capítulo 8: Limites (PDF p.117-123; impr. 113-119) (por James Grenning)
Confiança do OCR: BOA (código parcialmente corrompido)

Resumo: Como integrar código de terceiros ou ainda inexistente sem espalhar suas particularidades pelo sistema: encapsular a interface limite, explorar APIs com testes de aprendizagem e definir interfaces desejadas com Adapter.

Conceitos e regras:
- Tensão natural: fornecedores querem ampla aplicabilidade; usuários querem interface focada [p.118]
- Exemplo java.util.Map: interface ampla (clear(), etc.) e casts espalhados; mesmo com generics, expor Map em todo o sistema significa muitos pontos de mudança; solução: classe Sensors que esconde o Map e faz o cast internamente, com regras de negócio na própria classe [p.118-119]
- Não é preciso encapsular todo uso de Map; recomenda-se não passar Map (ou qualquer interface de limite) pelo sistema, mantendo-a numa classe/família e evitando retorná-la ou recebê-la em APIs públicas [p.119]
- Testes de aprendizagem (termo atribuído a Jim Newkirk): em vez de experimentar a API direto no código de produção, escrever testes que exploram o que se quer saber da API; exemplo log4j com passos de tentativa e erro virando uma suíte de testes [p.119-121]
- Testes de aprendizagem "custam nada" (você tinha que aprender mesmo) e dão retorno: na troca de versão, rodar a suíte revela incompatibilidades [p.121-122]
- Definir limite claro com testes externos que usam a interface como o código faria; sem eles, a tendência é ficar tempo demais na versão antiga [p.122]
- Código que ainda não existe: definir a interface que gostaríamos de ter (Transmitter), codar contra ela, e depois criar um Adapter para a API real; também gera seam para testar com um FakeTransmitter [p.122-123]
- Limites limpos: pouquíssimos pontos referenciam código externo; "é melhor depender de algo que você controle do que pegar algo que acabe controlando você" [p.123]

Citações curtas de prova:
- "Os testes de aprendizagem acabam não custando nada." [p.121]
- "É melhor depender de algo que você controle do que pegar algo que acabe controlando você." [p.123]

O que este trecho NÃO diz: não mostra que testar terceiros é obrigação ("não é tarefa nossa testá-los", p.119) e sim que escrever testes de aprendizagem é vantajoso; não discute versionamento/contratos de API formais.
Relevância: clean-code-expert: MÉDIA; testing-tdd-expert: ALTA (testes de aprendizagem, boundary tests, fakes); refactoring-expert: MÉDIA (wrap/Adapter de API externa); code-review-expert: MÉDIA (sinal: tipo de biblioteca vazando).
Decisão sugerida: usar em testing-tdd-expert (learning tests) e clean-code-expert (limites, ref `boundaries.md`).

---

### Capítulo 9: Testes de Unidade (PDF p.124-135; impr. 121-132)
Confiança do OCR: BOA (prosa); código de teste MÉDIA

Resumo: Testes são tão importantes quanto o código de produção e devem ser mantidos limpos; legibilidade é o critério maior. O capítulo apresenta as três leis do TDD, a estrutura construir-operar-verificar, uma DSL de testes, o "padrão duplo", uma asserção/um conceito por teste e F.I.R.S.T.

Conceitos e regras:
- As três leis do TDD: (1) não escrever código de produção sem um teste de unidade falhando; (2) não escrever mais de um teste do que o necessário para falhar (e não compilar é falhar); (3) não escrever mais código de produção do que o necessário para passar no teste que falha. Cria um ciclo de ~30 segundos [p.125-126]
- História de equipe que deixou os testes "rápidos e porcos": custo de manutenção dos testes sobe, são descartados, bugs aumentam, medo de limpar o código, produção degrada. Moral: código de teste é tão importante quanto o de produção; deve ter raciocínio, planejamento e cuidado [p.126-127]
- Testes habilitam as "-idades" (flexibilidade, manutenibilidade, reutilização): sem testes, todo mudança gera medo; com alta cobertura o medo some e se pode melhorar arquitetura/modelo [p.127]
- Testes limpos: "legibilidade, legibilidade e legibilidade"; num teste dizer muito com o mínimo de expressões [p.127]
- Exemplo de refatoração (Listagens 9.1 -> 9.2): remover duplicação e detalhes irrelevantes; o teste fica no padrão CONSTRUIR-OPERAR-VERIFICAR (build-operate-check), três partes claramente divididas [p.127-129]
- Linguagem de teste específica de domínio: criar funções/utilitários sobre as APIs de produção; evolui por refatoração contínua do código de teste [p.130]
- Padrão duplo: código de teste pode violar restrições de eficiência (memória/CPU) válidas na produção, mas nunca de clareza (exemplo: getState com concatenação de String num sistema embarcado, e string "HBchL" onde maiúscula=ligado) [p.130-132]
- Uma confirmação (assert) por teste: boa orientação; usar convenção dado-quando-então (given-when-then) com funções como givenPages/whenRequestIsIssued/thenResponseShouldBeXML; custo: duplicação; o autor não tem receio de mais de uma asserção, a regra prática é minimizar o número de asserções [p.132-134]
- Um único conceito por teste: dividir testes que verificam várias coisas (exemplo addMonths com três cenários), pois "não são as confirmações múltiplas que causam o problema, é o fato de que há mais de um conceito"; ao explicitar o dado/quando/então aparece um teste faltando (28 de fevereiro + 1 mês) [p.133-134]
- F.I.R.S.T.: Fast (rápidos, senão ninguém roda e o código degrada), Independent (sem depender de ordem ou de um teste preparar o próximo), Repeatable (qualquer ambiente, inclusive sem rede), Self-validating (saída booleana, sem ler log nem comparar arquivos), Timely (escritos imediatamente antes do código de produção; senão pode ficar difícil de testar) [p.134-135]
- Conclusão: o livro diria que merece livro inteiro; manter testes limpos; se os testes degradam, o código também [p.135]

Citações curtas de prova:
- "Os códigos de testes são tão importantes quanto o código de produção." [p.127]
- "O que torna um teste limpo? Três coisas: legibilidade. legibilidade e legibilidade." [p.127]
- "Há coisa que você talvez jamais faça num ambiente de produção que esteja perfeitamente bem em um ambiente de teste." [p.132]
- "a melhor regra seja minimizar o número de confirmações por conceito e testar apenas um conceito por função de teste" [p.134]

O que este trecho NÃO diz: não obriga uma asserção por teste (o autor cede explicitamente); não define metas de cobertura numéricas; não cobre mocks vs stubs (aparece apenas no Cap. 10-11 em tratamento de DIP e em teste com stub); a nomenclatura given/when/then é citada como convenção, sem "Arrange-Act-Assert" no texto.
Relevância: testing-tdd-expert: ALTA (quase todo o capítulo); clean-code-expert: ALTA (seção testes limpos da skill); code-review-expert: MÉDIA (critérios para revisar testes); refactoring-expert: MÉDIA (refatorar testes, rede de segurança).
Decisão sugerida: usar em testing-tdd-expert (três leis, F.I.R.S.T., construir-operar-verificar, DSL, padrão duplo, um conceito por teste) e referenciar na skill clean-code.

---

### Capítulo 10: Classes (PDF p.136-151; impr. 133-148) (com Jeff Langr)
Confiança do OCR: BOA (prosa); código das listagens 10.1, 10.5 corrompido, 10.6 a 10.10 compreensível em estrutura

Resumo: Classes devem ser pequenas, medidas por responsabilidades (não por linhas), coesas e organizadas para mudar com baixo risco. Apresenta SRP, coesão, OCP e DIP com exemplos (SuperDashboard, PrintPrimes refatorado, Sql, Portfolio/StockExchange).

Conceitos e regras:
- Organização: constantes públicas/estáticas primeiro, depois estáticas privadas, instâncias privadas; funções públicas depois, seguidas das privadas chamadas por elas (regra de cima para baixo, "artigo de jornal") [p.137]
- Encapsulamento: manter privado, mas "o teste tem prioridade": tornar protected/package se um teste precisar; perder encapsulamento é último recurso [p.137]
- Classes pequenas: primeira regra pequenas, segunda menores ainda; mede-se por responsabilidades, não linhas; uma classe com poucos métodos (5) ainda pode ter muitas responsabilidades [p.137-139]
- O nome da classe deve descrever suas responsabilidades; nomes ambíguos como Processador, Gerenciador, Super indicam acúmulo de responsabilidades; se não se acha um nome conciso, provavelmente está grande [p.139]
- Teste das ~25 palavras: descrever a classe em cerca de 25 palavras sem usar "se", "e", "ou", "mas"; o "e" na descrição indica excesso de responsabilidades [p.139]
- SRP: uma classe deve ter um, e apenas um, motivo para mudar; extrair Version da SuperDashboard; SRP é dos mais simples e dos mais ignorados; "fazer funcionar" e "tornar limpo" são coisas diferentes, e muitos param quando funciona [p.139-140]
- Muitas classes pequenas não são mais complicadas que poucas grandes (analogia das gavetas/caixa de ferramentas): cada classe com uma responsabilidade, um motivo de mudança, colaborando com poucas outras [p.140-141]
- Coesão: poucas variáveis de instância; cada método deve usar uma ou mais delas; quanto mais variáveis um método usa, mais coeso; classes totalmente coesas não são nem possíveis nem aconselháveis, mas alta coesão é desejada (Stack como exemplo) [p.141]
- Funções pequenas podem fazer proliferar variáveis de instância usadas por poucos métodos; quando isso ocorre há outra classe tentando sair; dividir quando a coesão cai [p.141-142]
- Exemplo PrintPrimes: função única gigante e aninhada refatorada em PrimePrinter (ambiente de execução), RowColumnPagePrinter (formatação de páginas) e PrimeGenerator (algoritmo de primos); o programa refatorado ficou maior (de ~1 para quase 3 páginas) por nomes descritivos, declarações de função/classe como forma de documentação e espaçamento [p.142-147]
- Refatoração incremental: não foi reescrito; criou-se suíte de testes com o comportamento exato, depois mudanças pequenas uma por vez, rodando os testes a cada passo [p.147]
- Organizar para mudar: classe Sql com vários tipos de instrução e métodos privados que só servem a um tipo viola SRP; "o indício principal para agir deve ser a alteração do sistema": se não vai mudar, deixe em paz; ao precisar abrir a classe, considerar consertar o projeto; sinal horizontal: métodos privados que só se relacionam a um subconjunto [p.148]
- Solução: hierarquia (Sql abstrata com CreateSql, SelectSql, InsertSql etc.) + utilitários (Where, ColumnList); código simples por classe, testável isoladamente, e novo UpdateSql sem alterar existentes; suporta SRP e OCP (abertas para extensão, fechadas para alteração) [p.148-150]
- Isolar de mudanças: depender de abstrações; exemplo Portfolio depende da interface StockExchange em vez de TokyoStockExchange; teste usa FixedStockExchangeStub; DIP: classes dependem de abstrações, não de detalhes concretos; desacoplamento melhora testabilidade, flexibilidade, reuso [p.150-151]

Citações curtas de prova:
- "Com as funções medimos o tamanho contando as linhas físicas. Com as classes é diferente. Contamos as responsabilidades." [p.137]
- "Devemos também poder escrever com cerca de 25 palavras uma breve descrição da classe, sem usar as palavras 'se', 'e', 'ou' ou 'mas'." [p.139]
- "Fazer um software funcionar e torná-lo limpo são duas coisas bem diferentes." [p.140]
- "As classes devem ser abertas para expansão, mas fechadas para alteração." [p.150]

O que este trecho NÃO diz: não dá um limite numérico de linhas/métodos por classe; não obriga dividir classe que está "logicamente completa" e estável; não trata herança vs composição de forma geral; não cobre LSP/ISP.
Relevância: clean-code-expert: ALTA (a skill tem só um item de "classes gigantes"); refactoring-expert: ALTA (split por responsabilidade, refatorar em passos com testes, quando extrair classe); testing-tdd-expert: MÉDIA (DIP/stub, refatorar com suíte); code-review-expert: ALTA (teste de 25 palavras, nome Manager, coesão).
Decisão sugerida: usar em clean-code-expert (reference `classes.md`), refactoring-expert (passos incrementais com testes, SRP/OCP) e code-review-expert (checagens de classe).

---

### Capítulo 11: Sistemas (PDF p.152-160; impr. 149-157) (por Dr. Kevin Dean Wampler) [continua no próximo bloco]
Confiança do OCR: BOA (prosa); listagens EJB2 e Proxy corrompidas

Resumo (parcial: o capítulo continua depois da p.160): separação entre construção e uso do sistema (Main, factories, injeção de dependência) e a ideia de que a arquitetura pode crescer gradualmente se houver separação de preocupações, com EJB2 como contra-exemplo e o início da discussão de aspectos/proxies.

Conceitos e regras:
- Sistemas devem separar a inicialização (criação de objetos e ligação de dependências) da lógica em tempo de execução [p.153]
- Inicialização tardia (lazy) como exemplo típico: traz benefícios (inicialização mais rápida, nunca retorna null) mas cria dependência codificada, dificulta testes (necessidade de test double/mock; testar todos os caminhos) e viola SRP; muitas instâncias dessa expressão espalham a estratégia de configuração, com pouca modularidade [p.153-154]
- Separação do Main: construção em main (ou módulos chamados por ele), o resto assume objetos já construídos; dependências apontam para longe de main [p.154-155]
- Factories (Abstract Factory): quando a aplicação precisa criar objetos, ela controla quando mas não como (ex.: LineItem em OrderProcessing) [p.154-155]
- Injeção de Dependência (DI) = Inversão de Controle aplicada a dependências; JNDI lookup é DI parcial (o objeto ainda determina ativamente a dependência); DI verdadeira: classe passiva, recebe via construtor ou setters; Spring citado como exemplo de contêiner; lazy ainda é possível com DI [p.155-156]
- "É mito dizer que podemos conseguir um sistema 'correto de primeira'": implementar os fatos de hoje, refatorar e expandir amanhã; TDD, refatoração e código limpo fazem isso funcionar no nível de código; no nível de sistema a arquitetura pode crescer gradualmente se houver separação de preocupações [p.156-157]
- Contra-exemplo EJB2 (Entity Bean): lógica de negócio fortemente acoplada ao container, muitos métodos de ciclo de vida, dificulta teste unitário e reuso, beans não herdam, DTOs redundantes [p.157-159]
- Preocupações transversais (persistência, transações, segurança): atravessam os limites dos objetos; EJB "antecipa" a Programação Orientada a Aspectos; aspectos especificam pontos onde comportamento é alterado de forma não invasiva [p.159]
- Proxies Java (JDK): bons para casos simples (empacotar chamadas de métodos); só funcionam com interfaces; para classes é preciso bibliotecas de bytecode (CGLIB, ASM, Javassist); a Listagem 11.3 (proxy de persistência de Bank) começa em p.159-160 [p.159-160]
- Texto termina na p.160 no meio da listagem 11.3 (BankProxyHandler); o restante (Spring AOP, AspectJ, TDD de arquitetura, otimização de decisões, DSLs) está no próximo bloco e NÃO foi lido [p.160]

Citações curtas de prova:
- "Os sistemas de software devem separar o processo de inicialização [...] da lógica em tempo de execução que vem após a inicialização." [p.153; reticências minhas]
- "É mito dizer que podemos conseguir um sistema 'correto de primeira'." [p.156]

O que este trecho NÃO diz: ainda não chega às seções sobre os princípios de design emergente, DSLs e "otimize a tomada de decisões" (fora deste bloco); não desaconselha o uso de lazy initialization em si, apenas seu uso espalhado e misturado.
Relevância: clean-code-expert: MÉDIA (separar construção e uso); testing-tdd-expert: MÉDIA (DI facilita testes); refactoring-expert: BAIXA; code-review-expert: MÉDIA (lazy init espalhado, new em lógica de negócio). Para clean-architecture-expert (fora do foco): ALTA.
Decisão sugerida: usar em clean-code-expert (`systems.md`: separar construção/uso, DI) ao final de integrar o bloco seguinte; sinais de revisão em code-review-expert.

---

## Auditoria da skill atual

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

## Checklist de cobertura
- Primeira página lida: PDF 81
- Última página lida: PDF 160 (conferido por Grep: 80 marcadores `=== PDF PAGINA`, último é 160; o arquivo termina no meio da Listagem 11-3)
- Páginas sem texto útil ou ilegíveis: p.81 (abertura do capítulo 5, só ruído de ilustração + 1 parágrafo); p.98, p.107, p.117, p.124, p.136, p.152 (aberturas de capítulo, só um parágrafo introdutório legível); Figuras 5.1 e 5.2 (números ilegíveis); Listagens 5.2, 5.6, 6.5-6.6 parcialmente; Listagem 10.1 e 10.5 muito corrompidas
- Problemas de extração observados: código-fonte muito corrompido (chaves viram `(`, `|`, `1`; `l` vira `1`; nomes de método quebrados como "Fageonsa"); legendas e imagens decorativas viram ruído; tabela/figura de Map (p.118) legível parcialmente; palavra "tipos genéricos" e símbolos `<>` com erros; numeração impressa em cabeçalho misturada ao texto; algumas palavras de títulos faltando (ex.: "uma questão de ! Uma classe", p.99: palavra perdida, não reconstruída)
- Capítulos/seções cobertos integralmente: Cap. 5 (inteiro), Cap. 6 (inteiro), Cap. 7 (inteiro), Cap. 8 (inteiro), Cap. 9 (inteiro), Cap. 10 (inteiro)
- Capítulos/seções que continuam em outro bloco: Cap. 11 Sistemas (continua após a p.160; a listagem 11.3 do Proxy JDK está truncada)
