# Fontes e rastreabilidade

Livro: *Código Limpo: Habilidades Práticas do Agile Software* (Robert C. Martin, com colaboradores nos capítulos 7, 8, 10, 11, 12, 13). Edição brasileira lida por OCR.

Convenções deste arquivo:

- "PDF" é o marcador de página do texto extraído (PDF PAGINA N). O número impresso no livro é diferente (em geral PDF menos 1 a 10, conforme o capítulo).
- A PDF 398 é uma página do capítulo 3 (Funções, "Objetos como parâmetros" e "Verbos e palavras-chave") que o OCR deslocou para o fim do arquivo, depois do epílogo.
- O OCR perdeu a palavra "abstração" em vários trechos de G5, G6 e G34. Onde a regra depende dela, a página legível do capítulo 3 (PDF 45) foi usada como confirmação e a lacuna foi registrada.
- Listagens de código do livro estão corrompidas e não foram usadas. Todo exemplo desta skill é original.
- A conclusão do capítulo 17 (PDF 309) está truncada no OCR. Só a frase legível foi usada.

## Parte 1: tabela de rastreabilidade

| Regra ou ponto da skill | Livro | Capítulo/seção | Páginas (PDF) | Citação curta |
|---|---|---|---|---|
| O livro é uma escola de pensamento, com recomendações que podem ser contraditórias com outras | Código Limpo | 1, Escolas de Pensamento | 22 | |
| Leitura domina a escrita; facilitar a leitura facilita a escrita | Código Limpo | 1, Somos Autores | 23 | "a taxa de tempo gasto na leitura v. na escrita é de 10x1." |
| Critério de Ward: cada rotina lida é como se esperava | Código Limpo | 1, definições de código limpo | 21 | |
| Código limpo parece escrito por alguém que se importou (Feathers) | Código Limpo | 1 | 19 | "Um código limpo sempre parece que foi escrito por alguém que se importava." |
| Quatro regras do projeto simples, em ordem de prioridade | Código Limpo | 12, Emergência | 169 | "Essas regras estão em ordem de relevância." |
| Regra do Escoteiro | Código Limpo | 1 | 24 | "Deixe a área do acampamento mais limpa do que como você" |
| Regra do Escoteiro aplicada em módulo já bom (a limpeza é pequena) | Código Limpo | 15 | 253, 262 | |
| Código ruim degrada o projeto e limpar cedo é barato | Código Limpo | 14, conclusão | 247 | |
| Nome revela propósito; nome que exige comentário falha | Código Limpo | 2 | 27 | "Se um nome requer um comentário, então ele não revela seu propósito." |
| Evitar desinformação, nomes quase iguais, l minúsculo e O maiúsculo | Código Limpo | 2 | 28-29 | |
| Distinções reais, sem números sequenciais nem palavras vazias (Info, Data, Object) | Código Limpo | 2 | 29-30 | |
| Nomes pronunciáveis e buscáveis; tamanho proporcional ao escopo | Código Limpo | 2 | 30-32 | "O tamanho de um nome deve ser proporcional ao tamanho do escopo." |
| Sem codificações (húngara, prefixo de membro, prefixo I) | Código Limpo | 2 | 32-33 | |
| Sem mapeamento mental; contador de uma letra só em escopo minúsculo | Código Limpo | 2 | 33 | |
| Classes são substantivos, métodos são verbos, get/set/is, fábricas estáticas | Código Limpo | 2 | 34 | |
| Clareza no lugar de humor | Código Limpo | 2 | 34 | "Opte por clareza no lugar de divertimento" |
| Uma palavra por conceito; sem trocadilhos | Código Limpo | 2 | 35 | "Escolha uma palavra por cada conceito abstrato e fique com ela" |
| Domínio da solução e depois do problema | Código Limpo | 2 | 35-36 | |
| Contexto por classe, não por prefixo; não exagerar o contexto | Código Limpo | 2 | 36-38 | |
| Renomear sem medo | Código Limpo | 2, conclusão | 38-39 | |
| Funções pequenas (autor sem pesquisa; cerca de 20 linhas, 150 colunas) | Código Limpo | 3, Pequenas | 43 | |
| Blocos de uma linha; indentação de um ou dois níveis | Código Limpo | 3, Blocos e Endentação | 44 | |
| Fazer uma coisa = passos um nível abaixo do nome; testes de seção e de extração | Código Limpo | 3, Faça Apenas uma Coisa | 44-45 | "AS FUNÇÕES DEVEM FAZER UMA COISA. DEVEM FAZÊ-LA BEM." |
| Um nível de abstração por função (G34 confirma) | Código Limpo | 3 e 17 (G34) | 45, 299-300 | |
| Regra Decrescente | Código Limpo | 3 | 46 | |
| Switch uma vez, escondido atrás de polimorfismo; SRP e OCP | Código Limpo | 3, Estrutura Switch; 17 (G23) | 46-47, 294 | |
| Nome longo descritivo vale mais que comentário; fraseologia consistente | Código Limpo | 3, Use Nomes Descritivos | 48 | "Um nome longo e descritivo é melhor do que um comentário extenso e descritivo." |
| Parâmetros: zero ideal, um, dois, evitar três, mais de três não usar | Código Limpo | 3, Parâmetros de Funções | 48 | |
| Parâmetros dificultam leitura e teste (combinações) | Código Limpo | 3 | 48-49 | |
| Formas mônades legítimas (pergunta, transformação, evento) | Código Limpo | 3 | 49 | |
| Parâmetro lógico indica duas coisas; dividir em duas funções | Código Limpo | 3, Parâmetros Lógicos; 17 (F3, G15) | 49-50, 283, 289-290 | "Passar um booleano para uma função certamente é uma prática horrível" |
| Díades e como convertê-las em mônades | Código Limpo | 3 | 50 | |
| Tríades: pensar bastante antes; uma tríade com tolerância de ponto flutuante é caso menos perigoso | Código Limpo | 3 | 50-51, 398 | |
| Agrupar parâmetros que andam juntos em um objeto com nome | Código Limpo | 3, Objetos como Parâmetros | 398 | |
| Varargs contam como um parâmetro de lista | Código Limpo | 3, Listas como Parâmetros | 398 | |
| Par verbo e substantivo; forma palavra-chave no nome | Código Limpo | 3, Verbos e Palavras-Chave | 398 | |
| Efeito colateral é mentira; acoplamento temporal | Código Limpo | 3, Evite Efeitos Colaterais; 17 (N7) | 51-52, 308 | "Efeitos colaterais são mentiras." |
| Parâmetros de saída | Código Limpo | 3; 17 (F2) | 52, 283 | |
| Separação comando-consulta | Código Limpo | 3 | 52-53 | |
| Exceções em vez de códigos de erro; enum de erros atrai dependência | Código Limpo | 3 | 53-55 | |
| Extrair try/catch; tratamento de erro é uma coisa só | Código Limpo | 3 | 54 | |
| Duplicação como raiz de males | Código Limpo | 3, Evite repetição; 17 (G5) | 55, 284-285 | |
| Múltiplos return são aceitáveis em funções pequenas | Código Limpo | 3, Programação estruturada | 55-56 | |
| Escrever funções por rascunho e refinamento com testes | Código Limpo | 3, Como escrever | 56 | |
| Comentário é fracasso de expressão; comentário impreciso é pior que nenhum | Código Limpo | 4 | 59-60 | "Comentários imprecisos são muito piores do que nenhum." |
| Limpar o código em vez de comentá-lo; explicar no código | Código Limpo | 4 | 60-61 | |
| Catálogo de comentários aceitáveis (legal, informativo, intenção, esclarecimento, alerta, TODO, destaque, API pública) | Código Limpo | 4, Comentários Bons | 61-65 | "o único comentário verdadeiramente bom é aquele em que você encontrou uma forma para não escrevê-lo." |
| Catálogo de comentários ruins | Código Limpo | 4, Comentários Ruins | 65-77 | |
| Código comentado deve ser apagado | Código Limpo | 4; 17 (C5) | 74-75, 282 | "Simplesmente exclua o código." |
| Comentários devem informar o que o código não consegue | Código Limpo | 17 (C3) | 281 | "Os comentários devem informar o que o código não consegue por si só." |
| Formatação serve à comunicação | Código Limpo | 5 | 82 | |
| Arquivos pequenos (estudo de sete projetos Java; não é regra fixa) | Código Limpo | 5, Formatação vertical | 82 | |
| Metáfora do jornal | Código Limpo | 5 | 83 | |
| Espaço, continuidade e distância vertical; afinidade conceitual; ordenação | Código Limpo | 5 | 83-90 | |
| Variáveis locais perto do uso; de instância em local conhecido | Código Limpo | 5 | 85-86 | |
| Limite horizontal (100 a 120; o autor adota 120) | Código Limpo | 5, Formatação horizontal | 90 | |
| Espaço horizontal, precedência, sem alinhamento, indentação, escopos minúsculos | Código Limpo | 5 | 91-95 | |
| Regra de equipe: um estilo, definido rápido e automatizado | Código Limpo | 5 | 95 | |
| Objetos escondem dados; estruturas de dados expõem dados | Código Limpo | 6 | 99-100 | |
| Anti-simetria objeto e estrutura de dados | Código Limpo | 6 | 100-102 | "Programadores experientes sabem que a ideia de que tudo é um objeto é um mito." |
| Lei de Demeter e quando se aplica | Código Limpo | 6; 17 (G36) | 102-103, 301 | "fale apenas com conhecidos, não com estranhos" |
| Getter composto não resolve; mande o objeto agir | Código Limpo | 6, Estruturas ocultas | 104 | |
| Híbridos | Código Limpo | 6 | 104 | "Eles são a pior coisa em ambas as condições. Evite criá-los." |
| DTO, bean e Active Record | Código Limpo | 6 | 105-106 | "A forma perfeita de uma estrutura de dados é uma classe com variáveis públicas e nenhuma função." |
| Exceções em vez de flags e códigos de retorno | Código Limpo | 7 | 108-109 | |
| Escrever try-catch-finally primeiro | Código Limpo | 7 | 109-110 | |
| Exceções não verificadas e o custo das verificadas | Código Limpo | 7 | 110-111 | |
| Contexto na exceção; classes de exceção pela necessidade do chamador | Código Limpo | 7 | 111-113 | |
| Empacotar APIs de terceiros | Código Limpo | 7 | 112-113 | "empacotar APIs de terceiros é a melhor prática que existe" |
| Special Case no lugar de null e de exceção no fluxo normal | Código Limpo | 7, Defina o fluxo normal | 113-114 | |
| Não retornar null; lista vazia | Código Limpo | 7 | 114-115 | |
| Não passar null | Código Limpo | 7 | 115-116 | |
| Limites: esconder a interface larga de terceiros | Código Limpo | 8 | 118-119 | |
| Testes de aprendizagem | Código Limpo | 8 | 119-122 | "Os testes de aprendizagem acabam não custando nada." |
| Interface desejada e Adapter para código que não existe | Código Limpo | 8 | 122-123 | |
| Depender de algo que se controla | Código Limpo | 8 | 123 | "É melhor depender de algo que você controle do que pegar algo que acabe controlando você." |
| Organização da classe; encapsulamento cede ao teste | Código Limpo | 10 | 137 | |
| Classes medidas por responsabilidades; teste das 25 palavras; nomes ambíguos | Código Limpo | 10 | 137-139 | "Com as classes é diferente. Contamos as responsabilidades" |
| SRP; muitas classes pequenas; função que vira classe | Código Limpo | 10 | 139-142 | |
| Coesão | Código Limpo | 10 | 141 | |
| Refatoração incremental protegida por testes | Código Limpo | 10 | 147 | |
| Organizar para mudar, OCP | Código Limpo | 10 | 148-150 | |
| DIP e isolamento de mudanças | Código Limpo | 10 | 150-151 | |
| Separar construção e uso; lazy espalhado; main; fábrica; injeção de dependência | Código Limpo | 11 | 153-156 | |
| Sistema não nasce correto de primeira; arquitetura cresce com separação de preocupações | Código Limpo | 11 | 156-157, 165 | |
| Adiar decisões; padrões com critério; DSL; coisa mais simples que funcione | Código Limpo | 11 | 165-167 | "Os sistemas também devem ser limpos." |
| Regra 1 do projeto simples: testes levam a projeto melhor | Código Limpo | 12 | 169 | "Criar testes leva a projetos melhores." |
| Duplicação (inclusive de implementação), Template Method | Código Limpo | 12 | 170-172 | "A repetição de código é o inimigo principal para um sistema bem desenvolvido." |
| Expressividade | Código Limpo | 12 | 172-173 | "Cuidar é um recurso precioso." |
| Poucas classes e métodos; contra dogmatismo | Código Limpo | 12 | 173 | |
| Concorrência como desacoplamento; mitos | Código Limpo | 13 | 175-176 | "Concorrência é uma estratégia de desacoplamento." |
| SRP e dados compartilhados, cópias, threads independentes | Código Limpo | 13 | 177-179 | |
| Biblioteca, modelos clássicos, dependências entre métodos, seções pequenas, desligamento | Código Limpo | 13 | 179-183 | |
| Testar código com threads | Código Limpo | 13 | 183-187 | |
| Concorrência: bloqueio no servidor, deadlock, teste multithread | Código Limpo | Apêndice A | 321-335 | |
| Catálogo de heurísticas C, E, F, G, J, N, T | Código Limpo | 17 | 281-309 | "Nomes em softwares são 90% responsáveis pela legibilidade do software." |
| Entender o algoritmo; passar nos testes não basta | Código Limpo | 17 (G21) | 292 | "Não estar certo do que faz o seu código é simplesmente preguiça." |
| A lista de heurísticas não substitui o juízo | Código Limpo | 17, conclusão | 309 | "Não se cria um código limpo seguindo uma série de regras." |
| Teste lento não é rodado | Código Limpo | 17 (T9) | 309 | "Um teste lento é um que não será rodado." |

## Parte 2: auditoria da versão 1.0 da skill

Legenda de veredito: **sustenta** (livro confirma, mantido), **não sustenta** (sem base no texto; removido ou marcado como convenção desta skill), **contradiz** (o livro diz o oposto ou algo diferente; corrigido), **não confirmado** (texto ilegível ou ausente; mantido com marca).

| Item da v1.0 | Veredito | Ação na v1.1 | Páginas |
|---|---|---|---|
| "Código é escrito para humanos. Computadores apenas o executam." | não sustenta literalmente | Trocado pela razão 10 para 1 entre leitura e escrita | 23 |
| "Outro desenvolvedor entenderá em 30 segundos?" | não sustenta (o livro usa 3 minutos só para comparar duas listagens, sem regra) | Removido; pergunta reescrita com o critério de Ward (rotina como esperado) | 21, 42 |
| "Eu precisaria explicar em uma reunião?" | não sustenta | Mantido como pergunta de apoio, marcada como convenção | |
| Evitar `data`, `info`, `temp`, `obj`, `manager`, `helper`, `util`, `processor`, `service` | contradiz em parte e não sustenta em parte: o livro cita Info, Data, Object, Gerente, Processador, Dados e Super; elogia nomes do domínio da solução | Lista reduzida à do livro; `temp`, `helper`, `util`, `service` removidos | 29-30, 34, 35-36, 139 |
| Booleanos: `isActive`, `hasPermission`, `canCancel` em vez de `flag`, `status`, `check` | não sustenta como regra; o livro só cita o prefixo `is` de predicado | Marcado como convenção; acrescentada a regra do livro sobre booleano como parâmetro | 34, 49-50, 283, 289-290 |
| Função faz uma coisa; "primeiro faz isso, depois aquilo" indica várias responsabilidades | contradiz: vários passos um nível abaixo do nome contam como uma coisa só | Critério trocado pelos três testes do livro | 44-45, 299-300 |
| Exemplo `validateCustomer(); calculateDiscount(); ...` | sustenta o espírito (G30), mas a divisão excessiva tem contrapeso | Mantido, com contrapeso da regra 4 | 296-297, 173 |
| "Evite `processOrder()` com centenas de linhas" | sustenta; o livro dá cerca de 20 linhas como experiência do autor, sem pesquisa | Número acrescentado com a ressalva | 43 |
| Argumentos "ideal 0-2, aceitável 3, evite 4+" | contradiz: ideal zero, depois um e dois; evitar três; F1 tolera até três e questiona mais | Corrigido | 48, 50-51, 283 |
| Encapsular em `Request`, `Command`, `DTO` ou `Value Object` | sustenta só o princípio de agrupar parâmetros que formam um conceito; os rótulos não são do livro | Princípio com página; rótulos como convenção | 398 |
| Guard Clauses em vez de aninhamento profundo | não sustenta como técnica nomeada; o livro aceita vários return em funções pequenas e pede um ou dois níveis | Convenção desta skill, com a tensão com G29 explicitada | 44, 55-56, 296 |
| "Evite else quando possível" | não sustenta; o livro usa if/else e pede evitar condição negativa | Removido; substituído por G28 e G29 | 296, 305 |
| Lei de Demeter com `customer.getCompanyCityName()` | contradiz: o livro rejeita o método agregador e só aplica a lei a objetos | Corrigido em objetos-e-erros.md e no exemplo próprio | 103-104, 301 |
| Comentários escondem código ruim; primeiro melhore o código | sustenta | Mantido | 60-61 |
| Comentários permitidos: regras de negócio, decisões arquiteturais, limitações externas, workarounds | não sustenta como lista; o livro tem catálogo próprio (intenção, esclarecimento de API que não se pode mudar, alerta de consequência, etc.) | Substituída pelo catálogo do livro | 61-65 |
| Proibido comentar o óbvio (`counter++`) | sustenta (redundante e ruidoso; C3) | Mantido | 70, 281 |
| Avaliar `Email`, `CPF`, `Money`, `Address`, `PhoneNumber` em vez de primitivos | não sustenta com esses nomes nem como Value Object; apoio parcial em Cell, Address, Point, Money (nota de G26) e enum | Convenção desta skill com as bases parciais citadas | 28, 36, 295, 303, 398 |
| Eliminar duplicação: padrão, abstração, centralizar | sustenta | Mantido, com formas de duplicação do livro | 55, 170-172, 284-285 |
| Nunca manter método não usado, classe abandonada ou código comentado | sustenta (F4, G9, G12, C5) | Mantido | 282-283, 286-287 |
| Flags desativadas como código morto | não confirmado literalmente | Removido o termo "flags desativadas" | |
| Separar lógica de negócio de tratamento de erro | sustenta | Mantido | 54, 108-109 |
| Lançar exceção e não retornar `-1`, `null`, `false` | sustenta em parte: o livro condena códigos de erro e null; admite Special Case e lista vazia | Corrigido com nuance | 53-55, 108, 113-115 |
| Todo código pensado para testes; dependências abstraídas | sustenta no espírito (regra 1 de Beck, DIP, limites) | Reescrito como pressão de projeto em classes-e-sistemas.md; seção "Testes Limpos" removida | 122-123, 150-151, 169 |
| given/when/then | sustenta apenas como convenção de nomes de teste citada pelo livro, e testes estão fora do escopo | Removido; teste fica com a skill de testes se instalada | 133 |
| Boy Scout Rule | sustenta | Mantido, com citação | 24, 253, 262 |
| Anti-padrões em tom absoluto ("Rejeite") | contradiz o aviso do livro de que é uma escola | Suavizado | 22 |
| Regra Máxima ("escrito por alguém que se importa") | sustenta; é de Feathers | Atribuída | 19 |
| Nunca sacrificar clareza por esperteza | sustenta | Mantido | 33-34 |
| Muitos níveis de indentação como anti-padrão | sustenta (um ou dois níveis) | Mantido com o número | 44 |
| before-after 1 (nomes) | sustenta | Mantido | 27 |
| before-after 2 (`processOrder` dividido) | sustenta, mas o código de depois navegava `order.getCustomer().getEmail()` (G36) | Reescrito | 301, 104 |
| before-after 3 (guard clauses com checagem de null) | contradiz em parte: o livro manda não passar null e evitar condição negativa | Reescrito sem null e com condição encapsulada | 115-116, 296 |
| before-after 4 (Value Object) | não sustenta o rótulo; sustenta agrupar parâmetros | Marcado como convenção | 398 |
| before-after 5 (`orElseThrow`) | sustenta o princípio (exceção ou caso especial); `Optional` não é do livro | Nota acrescentada | 114-115 |
| before-after 7 e 8 (novos: switch por polimorfismo, efeito colateral no nome) | sustenta (G23, capítulo 3, N7); exemplos originais | Acrescentados | 46-47, 51-52, 294, 308 |
| before-after 6 (condição inline) | contradiz G28 | Condição extraída em método | 61, 296 |

## Parte 3: o que ficou fora e por quê

- Testes (capítulo 9, T1 a T9 só catalogados em heuristicas.md, F.I.R.S.T., três leis do TDD): escopo da skill de testes.
- Mecânica de refatoração e capítulos 14 a 16 (Args, JUnit, SerialDate): escopo da skill de refatoração. Do capítulo 15 só foi usada a Regra do Escoteiro.
- Exemplos de código e listagens do livro: ilegíveis por OCR e protegidos por direitos autorais.
- Detalhes de EJB, proxies e AOP do capítulo 11: datados; mantida só a ideia (separar preocupações, POJO, adiar decisões).
- Apêndice B (código de SerialDate), Apêndice C (tabela cruzada) e epílogo: sem prosa utilizável ou ilegíveis.
