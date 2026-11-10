# Riscos e armadilhas

Armadilhas que um modelo sem o livro tende a errar, cada uma com a seção de *Refactoring Databases* (Ambler e Sadalage). O que for observação desta skill vem marcado. Para o molde de mudança, veja `periodo-de-transicao.md`.

## Perda de dados e de informação

- **Dropar de imediato**: em banco com várias aplicações, a coluna antiga fica em paralelo durante a transição; a remoção só vem depois de testes suficientes [s.29, s.30, s.82].
- **Troca de tipo ou de coluna**: o maior risco é perder informação na cópia. CHAR para VARCHAR e NUMERIC para CHAR são simples; CHAR para NUMERIC é problemático se houver caracteres não numéricos [s.210]. O tipo novo deve comportar todos os dados [s.273]; um tipo numérico não comporta um código postal internacional com letras [s.271]. Limpe a origem antes com refatorações de qualidade de dados [s.214].
- **Merge e Split**: juntar colunas ou tabelas pode perder precisão ou desfazer uma separação que tinha motivo (isolar dados críticos, por exemplo); dividir com base em um uso que na verdade era o mesmo obriga a juntar depois. O uso dos dados decide [s.142, s.146, s.236, s.244].
- **Drop Column e Drop Table apagam dados**: preserve em tabela temporária ou arquivo se o negócio exigir; não remova tabela cujo dado ainda é necessário e sem alternativa [s.113, s.118].
- **Hard delete**: arquive as linhas marcadas antes de apagar, para poder reverter, e trate antes o que as referencia [s.383].
- **Backup**: faça antes do deploy; em bancos grandes é difícil, e a facilidade de desfazer refatorações pequenas se perde quanto mais se espera [s.79].

## Sincronização

- **Triggers bidirecionais não podem ciclar**: a atualização do outro lado não pode disparar de volta a mesma atualização [s.103, s.190, s.244]. Propague só quando o valor mudou.
- **Custos do trigger**: possível gargalo, ciclos, deadlocks e dados duplicados [s.95]. Se a lógica é complexa ou envolve várias tabelas, há muita regra de negócio escondida no trigger; se ele falha, a transação inteira falha [s.354].
- **Exemplo do livro que só preenche um lado quando o outro é nulo** (Replace Column, s.214): não propaga alteração posterior de um lado que já tem valor. Observação desta skill.
- **Dados obsoletos em cópias**: espelhos e tabelas somente leitura derivadas ficam desatualizados quando fonte ou cópia mudam, e o risco cresce com mais cópias [s.424, s.454]. Prefira a replicação do produto a solução própria [s.426]. Mostre ao usuário a data da última atualização [s.469]. Atualizar a cópia pela aplicação só funciona se todas as aplicações que escrevem são conhecidas, e arrisca gravar duas vezes [s.455-456].
- **Sincronização em lote** tem enorme potencial de problemas de integridade referencial e conflito quando os dois lados mudam [s.95].
- **Fonte oficial em outro banco**: se a semântica difere, a conversão nos dois sentidos raramente é um para um, e o acesso direto exige tratar transações entre bancos [s.488-489].

## Rotinas e interfaces

- **Reorder Parameters com mesmo tipo**: não há transição possível, porque não dá para sobrecarregar a assinatura; o chamador não atualizado roda com os valores trocados, um defeito difícil de achar sem bons testes. Com tipos diferentes o chamador quebra e é fácil de achar [s.495]. Prefira criar um nome novo a reordenar `[convenção desta skill]`.
- **Procedure por view, ou o contrário**: os códigos de erro do banco mudam; retrabalhe o tratamento de erro [s.480, s.484].
- **Unificar lógica entre banco e aplicações**: as implementações podem divergir por regra antiga ou por razão válida (variações por região); decida qual vale, negociando com os interessados [s.446, s.476].

## Constraints, defaults, índices

- **NOT NULL com nulos existentes** não é aceito pelo banco: substitua os nulos por valor escolhido com os interessados, ou introduza default primeiro [s.314, s.317-319]. O default não atualiza linhas existentes e pode quebrar código que dava significado ao nulo [s.312].
- **Drop Default Value** expõe aplicações que dependiam dele: elas passam a enviar nulo ou falhar com exceção inesperada [s.296].
- **Add Foreign Key**: dados órfãos e valores ausentes na tabela de referência impedem a constraint. Compare contagens, confira os valores distintos, corrija por script ou à mão e só adicione linhas de referência que alguém precise [s.347-349]. FK custa desempenho e impõe ordem de operações [s.342-343]. Dar nome à constraint torna a mensagem de erro clara [s.343].
- **Índice único**: duplicatas existentes impedem; ache com `GROUP BY ... HAVING COUNT > 1` e corrija ou use índice não único. Índices demais degradam escrita [s.447-450].
- **Não presuma que todas as aplicações têm as mesmas regras**: constraint, default, cascade ou formato comum podem mudar o comportamento de quem ninguém consultou [s.303, s.311, s.380].
- **Toda mudança de constraint ou FK** pede revisão do tratamento de exceção: adicionar para as novas, remover para as retiradas [s.293, s.305, s.351, s.367].
- **Cascade**: exclusão em massa acidental (apagar uma divisão pode apagar milhares de funcionários), deadlock e duplicidade com o ORM [s.368-370].
- **Soft delete**: todo SELECT precisa filtrar e todo DELETE vira UPDATE; para não editar tudo, use view ou método de leitura [s.399].
- **Introduce Surrogate Key** onde a chave natural é estável é excesso de zelo [s.132]. Ao trocar chaves, atualize uma tabela por vez e mantenha a unicidade nas chaves depreciadas [s.228, s.287].

## Bloqueios e volume

- Atualizar dados travando as linhas afeta desempenho e disponibilidade; o livro opõe travar tudo (consistente, risco de bloqueio longo) a travar por subconjuntos (disponível, inconsistência temporária) [s.257].
- Mover milhões de linhas provavelmente trava os dados no movimento; para volume use exportação e importação ou carga em massa [s.323, s.325].
- Drop Column em tabela grande pode demorar e deixar a tabela indisponível para atualização [s.111].
- O livro não trata locks de DDL em PostgreSQL ou MySQL. Qualquer afirmação sobre isso é `[fora do livro]`; veja `exemplos-por-banco.md`.

## Quem acessa o banco

- **SELECT \* e leitura posicional** quebram ao dropar ou inserir coluna; o livro desaconselha `SELECT *` na aplicação [s.115]. Introduce Column no meio da tabela quebra acesso por posição, e programas COBOL ligados a DB2 quebram sem novo bind [s.31].
- **Dados de referência usados por nome ou por ID** em views e no código (`NOT IN`, enums, filtros por nome) quebram quando o dado muda [s.556-557, s.575-581].
- **Views dependentes** podem quebrar com a mudança, e uma view usada como controle de acesso exige estratégia de segurança nova antes de ser dropada [s.108, s.119].
- **Colunas de FK nomeadas por convenção** em outras tabelas ficam inconsistentes se só uma for renomeada [s.109-110].
- **Cálculos divergentes** entre aplicações ao criar coluna ou método calculado: pode ser defeito ou caso diferente; negocie o algoritmo [s.130, s.446].
- **Dados de teste e geradores** também mudam quando muda o formato ou o tipo [s.268, s.309].

## Processo e pessoas

- **Duas equipes, mesma coluna**: coordene [s.89].
- **Os desafios políticos costumam superar os técnicos** quando é preciso atualizar outros sistemas; alguém tem de assumir a responsabilidade e o custo [s.65].
- **Sem verba para atualizar programas externos**: transição enorme ou não refatorar [s.66].
- **Testes com efeito colateral na produção**: cuide para que a regressão pós-deploy não altere dados reais [s.79-80].
- **Lacuna do livro**: ele não diz como descobrir quem ainda usa a coluna antes de removê-la [s.82]. `[convenção desta skill]` Peça logs de consulta ou permissões e confirme com os times.

## Erros do próprio livro (não copie)

Observações desta skill sobre o texto lido; os exemplos do livro são ilustrativos:

- A contagem de nulos usa `COUNT(coluna)` com `IS NULL`, que dá sempre zero; use `COUNT(*)` [s.317-318].
- O backfill de flag com `!= TRUE` não atinge linhas com flag nulo; trate o nulo explicitamente [s.336-338].
- O exemplo de Move Column copia um saldo único para todas as contas do cliente e depois soma [s.171-172].
- Datas de remoção divergem entre texto, comentário e script em vários exemplos (por exemplo s.112, s.173-179, s.271-281).
- O script de remoção de Replace One-To-Many cita um `DROP COLUMN balance` sem relação com o exemplo [s.225].
- Operadores `&&` e `||` nos exemplos de método parecem pseudocódigo, não PL/SQL válido [s.497-551].
