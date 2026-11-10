# Notas: Goodliffe, Como ser um Programador Melhor, bloco 01 (PDF p.1-77)

Convenções: "p." = PDF PAGINA do marcador. Números impressos de página NÃO aparecem no texto extraído (sem rodapé/cabeçalho), então não há "impr. M". Notas de rodapé do texto original aparecem no fim de cada capítulo.
Edição: Novatec 2015/2019, tradução de Becoming a Better Programmer (O'Reilly 2014). A tradução usa "idioms", "commit", "check-in", "build" sem traduzir.

## Páginas pré-textuais, sumário e introdução (PDF p.1-29)

### Capa, elogios, créditos, dedicatória (PDF p.1-11)
Material editorial (elogios de terceiros, ficha, ISBN). Sem conteúdo técnico. Decisão: descartar.

### Sumário (PDF p.12-22) [estrutura apenas]
Estrutura do livro (38 capítulos em 5 partes), útil para mapear os blocos seguintes:
- Cap.1 Importar-se com o código [p.12]
- Parte I "você.escreve(código);": Cap.2 Mantendo as aparências (layout, nomes, torne-se apresentável); Cap.3 Escreva menos código!; Cap.4 Melhore o código removendo-o; Cap.5 O fantasma de um código do passado; Cap.6 Percorrendo um caminho (código legado); Cap.7 Chafurdando na lama (código ruim); Cap.8 Não ignore esse erro!; Cap.9 Espere pelo inesperado; Cap.10 Caça aos bugs; Cap.11 É hora de testar; Cap.12 Lidando com a complexidade; Cap.13 Um conto de dois sistemas [p.12-15]
- Parte II "A prática leva à perfeição": Cap.14 Desenvolvimento de software é...; Cap.15 Jogando segundo as regras; Cap.16 Mantenha a simplicidade; Cap.17 Use o seu cérebro; Cap.18 Nada está gravado a ferro e fogo; Cap.19 Um estudo sobre reutilização de código; Cap.20 Controle eficiente de versões (commits atômicos, mensagens, branches); Cap.21 Marcando um gol (QA/build); Cap.22 O curioso caso do código congelado; Cap.23 Por favor, libere a versão [p.16-18]
- Parte III "Envolvendo-se pessoalmente": Cap.24 Viva para amar o aprendizado; Cap.25 Desenvolvedores orientados a testes; Cap.26 Aprecie o desafio; Cap.27 Evite a estagnação; Cap.28 O programador ético; Cap.29 Amor pelas linguagens; Cap.30 Postura dos programadores (inclui "a postura de debugging") [p.18-20]
- Parte IV "Conseguir que tudo seja feito": Cap.31 Mais inteligente, e não mais árduo; Cap.32 Estará pronto quando estiver pronto (decomposição, defina "pronto"); Cap.33 Dessa vez, eu consigo... [p.20-21]
- Parte V "Uma meta de pessoas": Cap.34 O poder das pessoas; Cap.35 Ser responsável; Cap.36 Fale!; Cap.37 Manifestos; Cap.38 Ode ao código; Epílogo [p.21-22]
Relevância: ver a tabela de mapeamento por capítulo no fim deste arquivo. Decisão: usar só como mapa para distribuir blocos.

### Introdução (PDF p.24-29)
Resumo: O livro se apresenta como um catálogo de técnicas, atitudes e idioms para programadores de qualquer nível, fruto de mais de quinze anos de experiência do autor; não pretende ser tratado completo. Capítulos curtos e independentes, cada um terminando com "Perguntas", "Veja também" e "Tente isto...", com "pontos-chave" em destaque [p.24-27].
Conceitos e regras:
- Ser ótimo programador exige mais que sintaxe e design básico: métodos de trabalho, atitudes, técnicas, idioms e habilidades sociais [p.24].
- Cinco partes: código; práticas; vida pessoal (aprender, ética, desafios, estagnação, bem-estar); entregar no prazo; pessoas [p.26-27].
- Para melhorar é preciso aplicar o que lê; ler só passando os olhos gera apenas informação [p.27-28].
- Sugere uso em mentoria (ler separado e depois discutir as perguntas) [p.28].
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: não traz regra técnica.
Relevância: todos os candidatos: NENHUMA (apenas a estrutura "Perguntas/Tente isto" pode inspirar o formato de checklists em reference files, [fora do livro] como ideia nossa).
Decisão sugerida: descartar.

---

### Capítulo 1: Importar-se com o código (PDF p.30-32)
Resumo: O autor afirma que a diferença entre programadores medíocres e excelentes é a atitude: querer escrever o melhor software possível dentro das pressões reais. Bom código exige esforço e se importar; traduz-se em condutas concretas listadas.
Conceitos e regras:
- Bom código não surge por sorte nem só por competência técnica; programadores muito técnicos podem escrever código difícil de ler, usar e modificar, e programadores humildes podem escrever código simples e elegante [p.30].
- Condutas de quem se importa [p.31-32]:
  - recusar hacks que "só parecem funcionar"; buscar código claramente correto, com bons testes que mostrem a correção;
  - escrever código que revele a intenção, seja manutenível e correto (executar todos os passos possíveis para determinar que o problema foi resolvido, em vez de só fazer parecer que funciona);
  - trabalhar bem com outros programadores, escrevendo código que os demais leiam, querendo que a equipe escreva o melhor software em vez de parecer o mais inteligente;
  - ao mexer em código, deixá-lo melhor (mais estruturado, mais testado, mais compreensível);
  - aprender continuamente linguagens, idioms e técnicas, mas aplicá-los só quando apropriado.
- Ter resposta emocional ao código (orgulho do bom, incômodo com o ruim) é saudável [p.32].
Citações curtas de prova:
- "Para escrever um bom código, você deve se importar com ele." [p.30]
- "a verdadeira diferença entre programadores medíocres e programadores excelentes é esta: atitude." [p.30]
O que este trecho NÃO diz: não dá técnicas; é capítulo de postura.
Relevância: clean-code-expert: BAIXA/MÉDIA (mentalidade principal: intenção revelada, deixar melhor, correção demonstrada por testes). testing-tdd-expert: BAIXA ("testes que mostrem que está correto"). code-review-expert: BAIXA. dev-practices: BAIXA. systematic-debugging: NENHUMA. git-workflow-expert: NENHUMA.
Decisão sugerida: usar só como frase de mentalidade em clean-code-expert / dev-practices; resto descartar.

---

### Capítulo 2: Mantendo as aparências (PDF p.35-47)
Resumo: Apresentação do código (layout e nomes) serve para revelar o propósito e evitar erros, não para estética; o autor pede para parar as guerras de estilo, seguir uma convenção comum e consistente e separar mudanças de formatação das mudanças de comportamento.
Conceitos e regras:
- Pare de brigar por layout; adote atitude saudável. Foco míope em layout atrapalha revisões: revisores rápidos/superficiais comentam só formatação e deixam passar falhas de design [p.35-36].
- Formatação boa = clara, consistente, quase invisível; revela o propósito; reduz esforço de manutenção [p.36].
- Layout previne erros: exemplo em C com `if` sem chaves e `exit(0)` indentado como se fosse parte do if, que na verdade sempre executa; o autor cita a vulnerabilidade "goto fail" da Apple (2014, SSL/TLS) como causada por esse tipo de erro de layout (nota de rodapé) [p.36-37, 47].
- Nomes enganosos geram bugs: exemplo artificial em que `bool numberOfGreenWidgets`, `string name` e `turnGreen()` (que atribui "yellow") são todos nomes errados [p.37].
- Layout inconsistente e nomes confusos são sinal de que a qualidade geral (design, testes) provavelmente também é baixa [p.37].
- Escreva para dois públicos: o compilador (indiferente) e, mais importante, humanos: você agora, você meses depois (ao preparar release), colegas que integram o trabalho, o mantenedor anos depois investigando bug em versão antiga [p.38].
- Código difícil de ler é difícil de trabalhar; "caixas" ASCII de comentário bonitas são difíceis de manter [p.38-39].
- Estrutura: escreva o código como prosa (funções = capítulos, linhas em branco separam "parágrafos", só onde há quebra natural); informação mais importante primeiro; APIs numa ordem sensata; em classes, público antes de privado e criação antes do uso; prefira blocos menores: se a função tem cinco "parágrafos", considere cinco funções bem nomeadas [p.39-41].
- Consistência: escolha um estilo e use consistentemente, de preferência o idiomático da linguagem e o das bibliotecas-padrão; use as convenções do restante da equipe, não o seu estilo; se não houver consistência, adote um guia de estilo curto, acordado por consenso, não imposto; em arquivo que não segue as convenções do projeto, use as do projeto; uniformize IDEs/editores (tamanho de tab, chaves, comentários, fim de linha), sobretudo em projetos multiplataforma [p.41].
- História de guerra: equipe adotou padrão de codificação mas um desenvolvedor insistiu em tabs enquanto os outros usavam 4 espaços; o resultado foi código difícil de editar e mal exibido no visualizador do controle de versões e na revisão de código online [p.41-42].
- Nomes: um nome descreve identidade, comportamento e uso; bom nome é descritivo, correto e idiomático; só se nomeia bem o que se entende; nomes de API pública são os mais difíceis de mudar depois de liberados [p.42-43].
  - Evite redundância e use o contexto: `WidgetList.numberOfWidgets()` vira `size()`; evite palavras redundantes (exemplo: classe `DataObject`) [p.43].
  - Seja claro: clareza antes de concisão (lê-se mais do que se digita); variável de uma letra aceitável só em contadores de loops curtos; evite notação húngara, acrônimos rebuscados e trocadilhos [p.43-44].
  - Seja idiomático: siga as convenções de capitalização da linguagem (ex.: macros em maiúsculas em C; iniciais maiúsculas para tipos) [p.44].
  - Seja preciso: não chame de `WidgetSet` algo que se comporta como array; nome impreciso gera suposições erradas [p.44].
- "Torne-se apresentável": ao arrumar código mal formatado, nunca altere apresentação e comportamento ao mesmo tempo; faça check-in da mudança de layout como passo separado; commits misturados confundem e mudanças de layout podem mascarar erros de funcionalidade [p.44].
- Estilo evolui com a experiência; reúna feedback e adapte [p.45].
- Ferramentas automáticas de reformatação (ou hook pré-commit): vale investigar, raramente vale usar, por serem simplistas demais para sutilezas da estrutura real (opinião do autor) [p.45].
- Conclusão: favoreça convenção comum mesmo que não seja a sua preferida, mas tenha opinião fundamentada sobre bom estilo [p.45].
- Perguntas finais relevantes (para debate): reformatar legado? valor de ferramentas de reformatação? [p.45-46]
Citações curtas de prova:
- "Jamais altere a apresentação e o comportamento ao mesmo tempo." [p.44]
- "Uma boa apresentação do código revela o seu propósito. Não é um empreendimento artístico." [p.36]
- "Pare de brigar por causa de layout de código." [p.36]
- "Lembre-se das pessoas para quem você está escrevendo o código: os outros." [p.38]
O que este trecho NÃO diz: não recomenda formatadores automáticos (desaconselha na prática); não define padrões de nomes além dos princípios; não fala de revisão de código além da observação sobre cegueira para layout.
Relevância para os artefatos candidatos:
- clean-code-expert: ALTA. Nomes (redundância/contexto, clareza, idiomático, precisão, nomes enganosos), estrutura "prosa", consistência, escrever para humanos.
- code-review-expert: MÉDIA/ALTA. Armadilha de revisar só layout e ignorar design; layout/nome enganoso como fonte de bugs; separar commits de formatação facilita revisão.
- git-workflow-expert: MÉDIA. Regra "formatação e comportamento em commits separados" (também repetida nos caps. 3 e 4).
- dev-practices: MÉDIA. Guia de estilo curto e por consenso; ambiente de editor uniforme; mesma convenção do time.
- testing-tdd-expert: NENHUMA. systematic-debugging: BAIXA (nomes enganosos e layout geram bugs).
Decisão sugerida: usar em clean-code-expert (nomes, layout), code-review-expert (cegueira de layout), git-workflow-expert (commit separado), dev-practices (convenção de equipe).

---

### Capítulo 3: Escreva menos código! (PDF p.48-62)
Resumo: Código desnecessário tem custo contínuo (manutenção, leitura, bugs). O capítulo cataloga as formas de código supérfluo e prescreve removê-las, deixando o código melhor do que estava, com mudanças de "organização" separadas das funcionais.
Conceitos e regras:
- Menos código pode significar mais software; escrever muito código não é produzir muito software; gerentes que medem progresso em linhas por dia são equivocados [p.48-49].
- Por que importa [p.49-50]: cada linha tem custo de manutenção crescente com a quantidade e a vida; mais código = mais a ler/entender, mais difícil de mudar, mais lugares para bugs; código duplicado multiplica bugs (corrige uma cópia e restam outras idênticas).
- Catálogo de código desnecessário:
  - Lógica oscilante: `if (x) return true; else return false;` vira `return x;`; `if (x == true)` vira `if (x)`; aninhados que viram `a && b`; `a || (!a && b)` vira `a || b`; aproveitar ordem de avaliação; "diga tudo claramente, porém de forma sucinta" [p.50-52].
  - Refatoração (quadro): só é refatoração se a transformação preserva o comportamento; melhoria que muda reação do programa (mesmo sutil) não é refatoração. Refatora-se para legibilidade, estrutura, manutenção e, mais comumente, para preparar acréscimo de funcionalidades. Exemplos: Extract Class, Extract Method, Rename Method, Pull Up/Pull Down. Exige disciplina e é muito facilitada por suíte de testes unitários que cubra o código, que prova que o comportamento foi preservado. Cita o livro de Fowler [p.52-53].
  - Duplicação: copiar e colar (agrava-se com pequenas mudanças); esconde a estrutura repetida e replica bugs; fatorar em função comum com parâmetros para as diferenças (DRY). Ressalva: DRY cria acoplamento entre os trechos (interface compartilhada); usar com responsabilidade, pois às vezes a duplicação é menos custosa [p.53]. Duplicação acidental: reinventar a roda / não usar biblioteca de terceiros existente (mais provável de estar correta e depurada) [p.53-54]. Duplicação em micro-nível: ifs repetidos com a mesma condição, loops que podem ser fundidos, condicionais redundantes (`if (foo) { if (foo && x)`) [p.54-55]. História de guerra: device driver com dois loops quase idênticos de 300 linhas, com correções de bug diferentes cada; fatorar numa só versão reduziu o espaço do problema pela metade para depurar [p.55].
  - Código morto: nunca executado/acessado, exemplos com `size == 0` seguido de loop sobre `size`, e `length == 0 return` seguido de teste `'\0'`. Outras manifestações: funções nunca chamadas, variáveis escritas e não lidas, parâmetros internos não usados, enums/structs/classes/interfaces não usados [p.55-56].
  - Comentários: bom código não precisa de pilhas de comentários; nomes e estrutura devem torná-lo claro; comentário que duplica o código é duplicação perigosa (muda um sem o outro); exemplos `++i; // incrementa i` e descrever o loop de soma; se um algoritmo precisa de comentário, extraia numa função bem nomeada; comentário explica o "porquê", só se não estiver claro. Padrões corporativos que obrigam comentário em tudo são criticados. Não comente código para removê-lo (falta de coragem/entendimento; remova de vez, o controle de versões o recupera). Não comente fim de blocos nem descreva para que o código era usado [p.56-58].
  - Verbosidade: `if (str) return strcmp(...)==0; else return false;` vira `return str && strcmp(...)==0;`; ternário para null-check; declarar variáveis no início do bloco (estilo C antigo) está ultrapassado: declare junto do uso e reduza variáveis intermediárias (`foo(fn1() ? 10 : 5, fn2())`) [p.58-59].
  - Design ruim: caminhos de comunicação desnecessários entre componentes (marshalling extra, mais risco de corrupção de dados); componentes que ficam redundantes ou mudam de uso e deixam código sem uso: substitua por um componente mais simples; considere bibliotecas prontas já no design [p.59-60].
  - Espaços em branco: não são o inimigo; mas vinte quebras de linha entre funções é demais; parênteses às vezes ajudam a clareza, às vezes atrapalham [p.60].
- O que fazer: assumir responsabilidade, não escrever código desnecessário, remover o que encontrar ao trabalhar; "regra dos escoteiros" (Robert Martin): deixar o acampamento mais limpo do que o encontrou [p.60-61].
- Regra de commit: mudanças de "organização" separadas das funcionais, para o histórico ficar claro e para saber se um bug veio da funcionalidade nova ou da melhoria estrutural [p.61].
- Perguntas do capítulo: concisão x incompreensibilidade; ternário; nível de diferença que justifica não fatorar duplicação; como achar código morto; comentários obrigatórios por padrão [p.61-62].
Citações curtas de prova:
- "Menos código pode significar mais software." [p.49]
- "Não copie seções de código. Fatore-as em uma função comum. Utilize parâmetros para expressar qualquer diferença." [p.53]
- "O código por si só diz o que e como. Um comentário deve explicar o porquê" [p.57]
- "Todos os dias, deixe o seu código um pouco melhor do que estava." [p.61]
- "Não remova códigos por meio de comentários." [p.57]
O que este trecho NÃO diz: não dá heurística numérica para quando aceitar duplicação (deixa como pergunta ao leitor); não menciona regra de três; não define limite de tamanho de função além de "prefira blocos menores" (cap.2).
Relevância para os artefatos candidatos:
- clean-code-expert: ALTA. Catálogo de simplificações (lógica oscilante, duplicação/DRY com ressalva de acoplamento, código morto, comentários, verbosidade), regra dos escoteiros, definição de refatoração.
- testing-tdd-expert: MÉDIA. Refatoração só é segura com suíte de testes unitários; comportamento preservado é a definição.
- code-review-expert: MÉDIA. Lista de sinais a procurar em revisão: lógica redundante, duplicação, código morto, comentários que repetem o código, código comentado.
- git-workflow-expert: MÉDIA. Commits de limpeza separados dos funcionais; código removido é recuperável do VCS (não deixar código comentado).
- dev-practices: BAIXA/MÉDIA. Medir progresso por linhas é equívoco; custo de manutenção por linha.
- systematic-debugging: BAIXA. Duplicação multiplica bugs; unificar loops reduziu o espaço de busca.
Decisão sugerida: usar em clean-code-expert (references de simplificação/duplicação/comentários), code-review-expert (checklist), testing-tdd-expert (refatoração exige testes), git-workflow-expert (separar limpeza).

---

### Capítulo 4: Melhore o código removendo-o (PDF p.63-71)
Resumo: Remover código desnecessário melhora o sistema. O autor explica por que código extra aparece (indulgência do programador e causas inevitáveis), qual o custo, como achar código morto e por que é seguro apagá-lo (VCS), em commit separado.
Conceitos e regras:
- História de guerra (YAGNI): equipe Agile/XP comprometida com YAGNI ("você não vai precisar disso") ainda acumulou código extra e hooks de extensão não usados que deixavam o produto lento; ao removê-los, o desempenho melhorou, o código simplificou e os testes unitários confirmaram que nada quebrou [p.63-64].
- Indulgência (causas evitáveis, cada uma com "dica") [p.64-65]: escrever por diversão (escreva código porque agrega valor); achar que será necessário no futuro (YAGNI, não escreva agora); "é pouco código" e mais fácil que voltar ao cliente (código extra sempre custa mais; o cliente é acessível e vira bola de neve); inventar requisitos não documentados (quem define requisitos é o cliente, não o programador). Isso ocorre mesmo com processo enxuto, bons desenvolvedores e verificações definidas [p.65].
- Causas inevitáveis de código morto [p.65-66]: funcionalidade removida da UI com backend mantido ("podemos precisar no futuro"); tipos/classes sem uso que permanecem (difícil perceber que se removeu a última referência; partes obsoletas de classes); funcionalidades legadas raramente removidas (remover dá má impressão; gera overhead perpétuo de testes); manutenção que torna trechos inalcançáveis (loop que não itera, bloco condicional nunca executado; pré-processador do C); código gerado por wizards de UI; valores de retorno nunca usados; código de debug necrosado (printouts, verificações de invariantes inativas).
- Custo [p.67]: manutenção (tempo e dinheiro); dificulta conhecer o projeto; classes com "um milhão de métodos" incentivam uso desleixado; builds mais lentos; refatorar/simplificar/otimizar fica mais difícil ("código zumbi").
- Como encontrar [p.67-68]: prestar atenção ao trabalhar e limpar ao terminar; revisões regulares de código ajudam; ferramentas que varrem código morto (e opções de warnings do compilador, nota p.71); IDEs com análise estática (linguagens tipadas) e "encontrar referências" para APIs públicas; instrumentar o produto para medir uso real de funcionalidades (também serve a decisões de negócio).
- Extração cirúrgica [p.68]: apagar código morto é seguro; é recuperável do VCS. Contra-argumento reconhecido: novatos não saberão que o código removido existe no VCS e podem reescrevê-lo (o autor responde que o mesmo ocorre se eles não perceberem código existente em outro lugar). Remover em um único passo/commit, sem misturar com funcionalidade; limpeza separada deixa o histórico claro e facilita ressuscitar código.
- Conclusão: código morto surge até nas melhores bases e não é falha; não agir ao encontrá-lo é falha. Ao escrever código novo, não altere a especificação nem acrescente funcionalidades "pequenas" que ninguém pediu [p.69].
- Perguntas: deixar código comentado ou apagar; risco de remover legado; percentual desnecessário no projeto [p.69].
- Veja também: caps. 3, 7, 12, 20 [p.69-70].
Citações curtas de prova:
- "É seguro remover códigos dos quais você possa precisar no futuro. É sempre possível recuperá-los do sistema de controle de versões." [p.68]
- "A limpeza do código sempre deve ser feita em commits separados das modificações funcionais." [p.68]
- "Remova códigos mortos sempre que for possível." [p.67]
- "Você pode aperfeiçoar um sistema adicionando um novo código. Você também pode melhorá-lo removendo códigos." [p.64]
O que este trecho NÃO diz: não prescreve ferramenta específica nem processo formal de depreciação; não dá critério para quando remover funcionalidade legada visível ao usuário (deixa como pergunta); a história do YAGNI não detalha o método de medição de desempenho.
Relevância para os artefatos candidatos:
- clean-code-expert: ALTA. YAGNI, catálogo de causas e custos de código morto, como detectá-lo.
- git-workflow-expert: MÉDIA/ALTA. Apagar em vez de comentar porque o VCS preserva; commit exclusivo de limpeza; histórico claro.
- code-review-expert: MÉDIA. Revisão como ponto para pegar código extra/não pedido, requisitos inventados, hooks "para o futuro".
- dev-practices: MÉDIA. YAGNI, cliente define requisitos, instrumentar uso para decidir remoção de funcionalidades.
- testing-tdd-expert: BAIXA. Testes unitários confirmaram a remoção segura; custo de testar funcionalidades mortas.
- systematic-debugging: NENHUMA.
Decisão sugerida: usar em clean-code-expert (YAGNI/código morto), git-workflow-expert (limpeza em commit separado, não comentar código), code-review-expert (sinais de código extra), dev-practices (YAGNI).

---

### Capítulo 5: O fantasma de um código do passado (PDF p.72-77) [continua no próximo bloco; o texto termina truncado no meio do exemplo `max` em PDF p.77]
Resumo: Reler o próprio código antigo revela a evolução de habilidades. O trecho disponível cobre atitude, apresentação, "estado da arte" (linguagem/bibliotecas evoluem e tornam o código anacrônico) e idioms (começo). As seções "Decisões de design" e "Bugs" e a "Conclusão" estão no bloco seguinte.
Conceitos e regras:
- O programador médio raramente mantém o próprio código por muito tempo (alta rotatividade); excelentes programadores se definem pela atitude em relação ao código que escrevem [p.72]. Rever código antigo mostra melhorias (ou não) das habilidades [p.73].
- Apresentação: estilos variam (exemplos C++: padrão da biblioteca-padrão, estilo Java, estilo C#); exemplo de lista de inicialização com vírgula como prefixo na linha seguinte (vantagens: mais fácil comentar/eliminar itens com macros ou comentários; desvantagens: menos comum, IDEs brigam com o estilo) [p.73-75]. Desde que um estilo seja usado de forma consistente, é preocupação trivial; estilos inconsistentes no projeto é que desaceleram qualquer um [p.75].
- Estado da arte: linguagens e bibliotecas evoluem e partes antigas ficam obsoletas; o código antigo parece desatualizado, e o leitor pode supor ignorância quando os recursos simplesmente não existiam. Exemplos: genéricos em C# (de `ArrayList` sem tipo para `List<string>` com erro de compilação ao inserir tipo errado); C++11 (threading na linguagem, lambdas, for por intervalo) tornando bibliotecas e códigos "trampolim" antigos redundantes [p.75-76].
- Idioms: a "melhor prática" de cada linguagem; é o que programadores experientes esperam ler, permitindo focar no design; normalmente formalizam padrões que evitam bugs comuns [p.76]. Exemplo: macro `max(a,b)` em C substituída por template C++ que corrigiu bugs sutis (avaliação dupla de `++a`) e depois pela `std::max` pronta (reinvenção da roda) [p.77, truncado em seguida].
Citações curtas de prova:
- "Rever o seu código antigo mostrará as melhorias (ou não) em suas habilidades de codificação." [p.73]
- "O estado da arte se transforma de modo muito mais rápido que o seu código." [p.76]
O que este trecho NÃO diz: as seções de design e bugs e a conclusão não aparecem neste bloco (truncado); não prescreve processo de modernização de código antigo (até onde lido).
Relevância para os artefatos candidatos:
- clean-code-expert: MÉDIA. Idioms da linguagem, usar a biblioteca-padrão em vez de reinventar, consistência de estilo, código que fica anacrônico.
- testing-tdd-expert, systematic-debugging, git-workflow-expert, code-review-expert, dev-practices: NENHUMA/BAIXA (macro `max` com dupla avaliação é um exemplo de bug sutil que idioms evitam, BAIXA para debugging).
Decisão sugerida: usar levemente em clean-code-expert (idioms, não reinventar a biblioteca); completar a leitura no bloco 02 antes de decidir sobre design/bugs.

---

## Tabela resumo de relevância (este bloco)

| Capítulo | testing-tdd | systematic-debugging | git-workflow | code-review | dev-practices | clean-code |
|---|---|---|---|---|---|---|
| 1 Importar-se | BAIXA | NENHUMA | NENHUMA | BAIXA | BAIXA | BAIXA/MÉDIA |
| 2 Aparências | NENHUMA | BAIXA | MÉDIA | MÉDIA/ALTA | MÉDIA | ALTA |
| 3 Menos código | MÉDIA | BAIXA | MÉDIA | MÉDIA | BAIXA/MÉDIA | ALTA |
| 4 Removendo | BAIXA | NENHUMA | MÉDIA/ALTA | MÉDIA | MÉDIA | ALTA |
| 5 Fantasma (parcial) | NENHUMA | BAIXA | NENHUMA | NENHUMA | NENHUMA | MÉDIA |

Achado de padrão repetido (caps. 2, 3, 4): a regra "separe mudanças de apresentação/limpeza das mudanças funcionais no controle de versões" aparece três vezes com a mesma justificativa (histórico claro; mudanças de layout mascaram erros; mais fácil achar a origem de bug e ressuscitar código removido).

## Checklist de cobertura
- Primeira página lida: 1
- Última página lida: 77 (último marcador do arquivo, conferido com Grep; o texto termina no meio do Cap.5, no exemplo da macro/função `max`)
- Páginas sem texto útil ou ilegíveis: p.1 (vazia); p.4-11 (elogios, dedicatória, créditos, ficha); p.23 (outras obras do autor); p.33 e p.47 (só notas de rodapé, as de p.47 sobre goto fail são úteis); p.71 (só nota de rodapé)
- Problemas de extração observados: ligaduras "fi/ff/fl" perdidas (ex.: "Goodli e", "e caz", "con gurado", "m"), palavras partidas; código com indentação achatada (chaves/recuos perdidos); aspas tipográficas em `‘\0’`; sem números impressos de página; elogios com rodapé corrompido ("B /P D/MIET/MIEEE"). Nada que afete o sentido das regras.
- Capítulos/seções cobertos integralmente: Sumário, Introdução, Cap.1, Cap.2, Cap.3, Cap.4
- Capítulos/seções que continuam em outro bloco: Cap.5 (do meio da seção "Idioms" em diante: resto de idioms, "Decisões de design", "Bugs", "Conclusão", Perguntas, Veja também, Tente isto)
