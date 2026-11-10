# Catálogo de odores e heurísticas

Base do checklist de code review. Cada item traz o código do livro (capítulo 17 de *Código Limpo*), o nome, uma linha em paráfrase e a página (marcador PDF, veja fontes.md). O livro avisa que a lista não é completa e que não se cria código limpo seguindo uma série de regras [p.309]: use-a para dar nome ao incômodo, não como pontuação.

## Como usar em revisão

1. Para cada achado, cite o código (por exemplo, G30), o local, a evidência no código e uma sugestão pequena.
2. Priorize pela ordem do projeto simples: falta de teste e de verificação, depois duplicação, depois expressividade, depois excesso de classes (veja classes-e-sistemas.md).
3. Não aplique heurística por reflexo. Quando duas se opõem, explique a escolha (por exemplo, G29 contra um retorno antecipado).
4. Distinga o que é regra do livro do que é preferência da equipe (G24, G11).

## Comentários (C)

| Código | Nome | Em uma linha | Página |
|---|---|---|---|
| C1 | Informação inapropriada | Histórico, autoria, data e número de tarefa pertencem a ferramentas de registro, não ao comentário | 281 |
| C2 | Comentário obsoleto | Velho ou incorreto: atualize ou apague logo | 281 |
| C3 | Comentário redundante | Descreve o que o código já diz, inclusive documentação que repete a assinatura | 281 |
| C4 | Comentário mal escrito | Se vale escrever, cuide de gramática, brevidade e do que não é óbvio | 282 |
| C5 | Código como comentário | Apague; o controle de versão guarda | 282 |

## Ambiente (E)

| Código | Nome | Em uma linha | Página |
|---|---|---|---|
| E1 | Construir exige várias etapas | Obter e construir o projeto devem ser comandos simples e únicos | 282 |
| E2 | Testes exigem várias etapas | Todos os testes de unidade rodam com um comando, de forma rápida e óbvia | 282 |

## Funções (F)

| Código | Nome | Em uma linha | Página |
|---|---|---|---|
| F1 | Parâmetros em excesso | Nenhum é melhor; até três; acima disso é questionável e deve ser evitado | 283 |
| F2 | Parâmetros de saída | Surpreendem o leitor; mude o estado do objeto dono do método | 283 |
| F3 | Parâmetros lógicos | Um booleano mostra que a função faz duas coisas; elimine | 283 |
| F4 | Função morta | Método que ninguém chama deve ser removido | 283 |

## Geral (G)

| Código | Nome | Em uma linha | Página |
|---|---|---|---|
| G1 | Várias linguagens em um arquivo | O ideal é uma só; reduza a quantidade e o uso das extras | 283 |
| G2 | Comportamento óbvio não implementado | Quebra o princípio da menor surpresa; o leitor perde a confiança no nome | 283-284 |
| G3 | Comportamento incorreto nos limites | Não confie na intuição; trate cada condição de limite e teste-a | 284 |
| G4 | Seguranças anuladas | Desligar avisos, testes ou controles automáticos para facilitar o momento cobra depois | 284 |
| G5 | Duplicação | Regra das mais importantes; troque por função, polimorfismo, Template Method ou Strategy | 284-285 |
| G6 | Código no nível errado de abstração | Conceito de alto nível na base, detalhe nas derivadas; nunca disfarce com valor falso | 285-286 |
| G7 | Base depende das derivadas | A classe base não deve conhecer as derivadas, salvo conjunto fixo e fortemente acoplado | 286 |
| G8 | Informação excessiva | Interfaces pequenas; esconda dados, utilitários, constantes e protegidos | 286 |
| G9 | Código morto | Nunca executado (condição impossível, catch que não ocorre); apodrece, exclua | 286-287 |
| G10 | Separação vertical | Variável local logo acima do primeiro uso; função privada logo abaixo | 287 |
| G11 | Inconsistência | Faça do mesmo jeito o que é parecido (nomes, formas) | 287 |
| G12 | Entulho | Construtor vazio, variável sem uso, função não chamada, comentário sem informação | 287 |
| G13 | Acoplamento artificial | Não coloque coisa geral em lugar específico só por conveniência | 287-288 |
| G14 | Feature Envy | Método interessado em outra classe; elimine, exceto quando mover acoplaria o domínio a um formato | 288-289 |
| G15 | Parâmetros seletores | Booleano, enum ou inteiro que escolhe comportamento: divida em funções | 289-290 |
| G16 | Propósito obscuro | Expressões comprimidas, notação húngara e números mágicos escondem a intenção | 290 |
| G17 | Responsabilidade mal posicionada | Coloque o código onde o leitor espera; o nome das funções ajuda a decidir | 290 |
| G18 | Estático inadequado | Prefira não estático; estático só se nunca precisar de polimorfismo | 290-291 |
| G19 | Variáveis explicativas | Separe cálculos em valores intermediários com nome | 291 |
| G20 | Nome de função não diz o que faz | Se é preciso ler a implementação para saber, troque o nome | 291-292 |
| G21 | Entenda o algoritmo | Passar nos testes não basta; refatore até ser óbvio que está certo | 292 |
| G22 | Dependência lógica em física | Não suponha fatos de outro módulo; peça a ele explicitamente | 292-293 |
| G23 | Polimorfismo em vez de if/else ou switch | No máximo um switch por tipo de seleção, para criar objetos polimórficos | 294 |
| G24 | Convenções padrão | A equipe segue um padrão baseado nas normas do mercado e todos o respeitam | 294 |
| G25 | Números mágicos | Constantes nomeadas, salvo valores autoexplicativos em fórmulas claras; vale para qualquer token opaco | 294-295 |
| G26 | Seja preciso | Decida com exatidão: dinheiro sem ponto flutuante, checar null, unicidade, bloqueio, tipo menos específico | 295 |
| G27 | Estrutura acima de convenção | Classe base com método abstrato força o que a convenção só sugere | 296 |
| G28 | Encapsule condicionais | Extraia função que diga o propósito da condição | 296 |
| G29 | Evite condicionais negativas | A forma afirmativa é mais fácil de entender | 296 |
| G30 | Funções fazem uma coisa | Divida funções com várias seções de operações | 296-297 |
| G31 | Acoplamento temporal oculto | Exponha a ordem exigida encadeando resultados nos parâmetros | 297-298 |
| G32 | Não seja arbitrário | A estrutura deve ter motivo visível; senão será alterada ao gosto | 298 |
| G33 | Encapsule condições de limite | Um valor como "nível mais um" ganha nome em vez de espalhar +1 e -1 | 298-299 |
| G34 | Descer um nível de abstração | Passos no mesmo nível, um abaixo do nome; separar níveis é das refatorações mais difíceis | 299-300, 45 |
| G35 | Dados configuráveis em alto nível | Valor padrão conhecido no topo, passado para baixo | 300-301 |
| G36 | Navegação transitiva | Fale com colaboradores imediatos, não com o mapa do sistema (Demeter) | 301 |

Nota de OCR: nos itens G5, G6 e G34 o texto extraído perdeu a palavra "abstração" em algumas frases; o sentido de G34 foi conferido com o capítulo 3 [p.45].

## Java (J)

| Código | Nome | Em uma linha | Página |
|---|---|---|---|
| J1 | Imports com curinga | O livro defende importar pacote inteiro em vez de longas listas; é questão específica de Java, siga a convenção da equipe (G24) | 301-302 |
| J2 | Herdar constantes | Não use herança para ganhar acesso a constantes; importe-as de forma estática | 302-303 |
| J3 | Constante ou enum | Use enum em vez de inteiros constantes; enum carrega métodos e campos | 303-304 |

## Nomes (N)

| Código | Nome | Em uma linha | Página |
|---|---|---|---|
| N1 | Nomes descritivos | Escolha com calma e reavalie; nomes concentram a maior parte da legibilidade | 304-305 |
| N2 | Nível apropriado de abstração | Nome reflete o conceito, não a implementação (conectar em vez de discar) | 306 |
| N3 | Nomenclatura padrão | Use nomes de padrões, convenções da plataforma e a linguagem do projeto | 306-307 |
| N4 | Nomes não ambíguos | Dois nomes vagos e parecidos não distinguem as tarefas; nome longo compensa em uso local | 307 |
| N5 | Nomes longos para escopos grandes | Curto serve a escopo pequeno; escopo grande pede nome preciso | 307 |
| N6 | Evite codificações | Sem prefixos de tipo, de escopo ou de subsistema | 307-308 |
| N7 | Nomes descrevem efeitos colaterais | O nome diz tudo o que a função faz, inclusive criar o que não existe | 308 |

## Testes (T)

Catalogados aqui só por completude. A estratégia de testes fica com a skill de testes, se instalada.

| Código | Nome | Em uma linha | Página |
|---|---|---|---|
| T1 | Testes insuficientes | Teste tudo o que pode falhar; "parece bom" não é critério | 308 |
| T2 | Use ferramenta de cobertura | Ela mostra as lacunas e os corpos de if e catch não verificados | 308 |
| T3 | Não pule testes triviais | São baratos e valem como documentação | 308 |
| T4 | Teste ignorado é pergunta | Dúvida de requisito pode virar teste desativado e explícito | 308-309 |
| T5 | Teste as condições de limite | A parte central do algoritmo se entende; os limites costumam errar | 309 |
| T6 | Teste bugs vizinhos | Bugs se agrupam; ao achar um, teste a função com exaustão | 309 |
| T7 | Padrões de falha revelam | Casos ordenados logicamente expõem o padrão de quem falha | 309 |
| T8 | Padrões de cobertura revelam | O que foi ou não executado dá pistas da falha | 309 |
| T9 | Testes devem ser rápidos | Teste lento não será rodado | 309 |
