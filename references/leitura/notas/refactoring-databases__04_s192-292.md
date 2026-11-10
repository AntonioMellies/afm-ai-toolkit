# Notas: Refactoring Databases (Ambler e Sadalage), bloco 04, seções 192-292

Formato EPUB convertido. Cada fragmento de código SQL/Java/Hibernate vem partido em várias seções (um comando por seção). Citações `[s.N]`; número impresso entre parênteses como "impr. M" quando visível no rodapé. Este bloco cobre o fim do cap. 6 (Structural Refactorings) e o início do cap. 7 (Data Quality Refactorings). Todos os exemplos do livro usam Oracle (PL/SQL) e Java/Hibernate; nada de código é reproduzido aqui.

## Padrão de cada refatoração (estrutura repetida pelo livro neste bloco)

Cada refatoração segue o mesmo molde: Motivation, Potential Tradeoffs, Schema Update Mechanics, Data-Migration Mechanics, Access Program Update Mechanics. As refatorações com transition period mostram o diagrama "Original Schema / Transition Period / Resulting Schema", com `drop date` anotado na coluna ou tabela velha e um trigger de sincronização com `event = insert | update | delete` e `drop date`. [s.197, s.209, s.216, s.227, s.235, s.243]

---

### Rename View (final) (impr. 118-120, s.192-196) [continua do bloco anterior]
Resumo: Só o fim da refatoração aparece aqui (passo 3 e as mecânicas de dados e de programas). Depois de criar a view com o nome novo, a view antiga é recriada em cima da nova, para não duplicar código.
Conceitos e regras:
- Passo 3, "redefine a view antiga": recriar `CustOrds` a partir de `CustomerOrders` (e não repetir a query), de modo que qualquer mudança futura (ex.: nova fonte de uma coluna) se propague sem trabalho extra. [s.192]
- A view nova recebe um comentário de rastreio com o nome antigo e a data de remoção (`dropdate`). [s.194]
- Data migration: não há dados a migrar. [s.195]
- Programas externos: trocar FROM/INTO em SQL embutido, ou o nome na representação, em abordagens guiadas por metadados. [s.195-196]
Citações curtas de prova:
- "There is no data to migrate for this database refactoring." [s.195]
O que este trecho NÃO diz: os passos 1 e 2 (criar a view nova, anunciar a depreciação) estão no bloco anterior; nenhuma estratégia de teste neste trecho.
Relevância: database-and-migrations-expert: MÉDIA, padrão "view antiga vira alias da nova" durante o transition period.
Decisão sugerida: usar em referência de renomeação (view/tabela/coluna) como exemplo de alias na transição.

---

### Replace LOB With Table (impr. 121-126, s.197-208)
Resumo: Troca uma coluna LOB (BLOB, VARCHAR grande ou XML) que guarda dado estruturado por uma tabela nova (ou colunas novas na mesma tabela). Exemplo: `Customer.MailingAddress` vira `CustomerAddress` (rua, cidade, estado, CEP).
Motivação: tratar partes do LOB como elementos de dados distintos; comum com XML guardado em uma só coluna para evitar "shredding". [s.197]
Trade-offs:
- Vantagem do LOB: obter a estrutura inteira de uma vez, útil quando o código já trabalha com a estrutura e o banco é só armazenamento. [s.197]
- Vantagem da tabela: acessar elementos individuais, abrir os dados a outras aplicações, reaproveitar dados já presentes no banco (menos redundância, menos erros de integridade). [s.197]
- Desvantagem: custo e complexidade de "shredding" para gravar e de remontar a estrutura ao ler. [s.197]
Passos de transição (schema): [s.197-198]
1. Determinar o esquema da tabela analisando o conteúdo do LOB; se a estrutura for complexa, usar LOBs menores ou aplicar a refatoração recursivamente.
2. Adicionar a tabela (inclui a chave da tabela original como FK).
3. Depreciar a coluna original (marcar para remoção no fim do período).
4. Adicionar um índice novo se necessário por desempenho.
5. Introduzir triggers de sincronização nos dois sentidos: em `Customer` (insert/update/delete, fazendo o shredding e gravando em `CustomerAddress`) e em `CustomerAddress` (insert/update, atualizando o LOB). [s.198-205; os eventos estão no diagrama, s.197]
6. No fim do período: remover triggers e coluna. [s.205]
Migração de dados: popular a tabela nova "fatiando" e copiando o LOB, mais a chave; se o LOB for NULL ou vazio, não criar linha. Pode ser feita por scripts SQL com funções de extração. [s.205-206]
Programas de acesso: [s.207]
1. Remover código de tradução (que fatiava o LOB ou montava o formato).
2. Adicionar código de tradução onde alguma aplicação ainda precise da estrutura exata; se várias precisarem, usar stored procedures ou uma biblioteca no banco, para reuso.
3. Escrever código que acesse a tabela nova.
Exemplo antes/depois: Java com SELECT do LOB e extração em código vira SELECT com join em `CustomerAddress`. [s.207-208]
Específico de produto: triggers PL/SQL Oracle com `:NEW`, predicados `updating/inserting/deleting`, `ALTER TABLE ... DROP COLUMN`. `[fora do livro]` PostgreSQL/MySQL têm sintaxe própria de trigger; o livro não cobre.
Testes de verificação: o trecho não descreve testes específicos para esta refatoração.
Citações curtas de prova:
- "The primary reason to replace a LOB with a table is because you need to treat parts of the LOB as distinct data elements." [s.197]
O que este trecho NÃO diz: como lidar com LOB inconsistente ou malformado durante o shredding; nem como lidar com concorrência entre os dois triggers (só mostra a ideia).
Relevância: database-and-migrations-expert: ALTA, exemplo completo de expand-contract com triggers bidirecionais, regra de "NULL/vazio não gera linha" e opção de biblioteca de tradução no banco.
Decisão sugerida: usar em catálogo de refatorações estruturais.

---

### Replace Column (impr. 126-130, s.209-215)
Resumo: Troca uma coluna não-chave por outra nova (ex.: `CustomerNumber` inteiro vira `CustomerID` char(12)). Para colunas que fazem parte de chave, o livro remete a Introduce Surrogate Key (p.85) e Replace Surrogate Key With Natural Key (p.135). [s.209]
Motivação: (1) o uso da coluna mudou e o tipo precisa mudar (ex.: identificador numérico passa a alfanumérico); (2) passo intermediário de outras refatorações, como fundir duas fontes de dados similares ou Consolidate Key Strategy, para garantir consistência de tipo e formato. [s.209-210]
Trade-offs: risco significativo de perda de informação ao copiar para a nova coluna, sobretudo quando os tipos diferem muito; CHAR para VARCHAR e NUMERIC para CHAR são simples, CHAR para NUMERIC é problemático se houver caracteres não numéricos. [s.210]
Passos de transição (schema): [s.210]
1. Introduzir a coluna nova (ADD COLUMN).
2. Depreciar a coluna original (marcar para remoção).
3. Introduzir trigger de sincronização que copie entre as colunas em qualquer alteração de linha; o exemplo preenche uma coluna quando a outra vem NULL, em insert/update.
4. Atualizar outras tabelas: se a coluna for parte de FK, substituir também nas outras e atualizar os índices.
5. No fim: DROP do trigger e da coluna antiga. [s.214]
Migração de dados: copiar inicialmente a coluna antiga na nova e manter sincronizadas durante o período (ex.: via stored procedures). Antes de aplicar, pode ser preciso aplicar refatorações de qualidade de dados para limpar a origem. [s.214]
Programas de acesso: o problema principal é adaptar ao novo tipo e formato; pode haver código de conversão ida e volta; a estratégia de longo prazo (mais cara) é reescrever todo o código para o novo formato. [s.214-215]
Específico de produto: comentários de coluna (COMMENT ON) e trigger Oracle. `[fora do livro]` o livro usa comentário no esquema para registrar a data de remoção.
Testes de verificação: não detalhados neste trecho, apenas o aviso de limpar dados antes.
Citações curtas de prova:
- "A significant risk when replacing a column is information loss when transferring the data to the replacement column." [s.210]
O que este trecho NÃO diz: como detectar linhas que não convertem antes da migração; o exemplo de trigger só sincroniza quando um dos lados é NULL (limitação do exemplo, o livro não discute).
Relevância: database-and-migrations-expert: ALTA, é a refatoração básica de expand-contract para mudar tipo de coluna.
Decisão sugerida: usar em referência do padrão expand-contract e nos riscos de conversão de tipo.

---

### Replace One-To-Many With Associative Table (impr. 131-134, s.216-226)
Resumo: Troca a associação um-para-muitos (FK em `Policy.CustomerPOID`) por tabela associativa `Holds` (PK composta pelas duas chaves), preparando evolução para muitos-para-muitos.
Motivação: a associação 1-N costuma evoluir para N-N (exemplo: empregado com um gerente passando a ter vários numa estrutura matricial); 1-N é subconjunto de N-N, então a tabela nova implementa a situação atual e já suporta a futura. Também serve para guardar informação da própria relação que não pertence a nenhuma das duas tabelas. [s.216]
Trade-offs: overbuilding se a associação não deve evoluir para N-N; aumenta joins, piora desempenho e dificulta entender o esquema. [s.216]
Passos de transição (schema): [s.216]
1. Adicionar a tabela associativa (PKs combinadas); se alguma tabela não tiver PK, o livro sugere Introduce Surrogate Key.
2. Depreciar a coluna original `Policy.CustomerPOID`.
3. Adicionar índice novo via Introduce Index (p.248).
4. Triggers de sincronização: em `Policy` (insert/update/delete populam `Holds`) e em `Holds` (verifica que `Policy.CustomerPOID` esteja preenchida).
5. No fim: remover triggers e coluna. O script de remoção no trecho aparece truncado/inconsistente: a última linha extraída refere `ALTER TABLE customer DROP COLUMN balance`, que não combina com o exemplo (possível erro do livro ou da extração; não usar). [s.224-225]
Convenção de nomes: nomear a tabela associativa como a associação original (`Holds`) ou concatenar as duas tabelas (`CustomerPolicy`). [s.225]
Migração de dados: copiar `Policy.CustomerPOID` e `Policy.PolicyID` para `Holds` com um INSERT ... SELECT simples. [s.225]
Programas de acesso: [s.225]
1. Remover escritas na FK antiga e passar a gravar em `Holds`.
2. Refazer os joins (SQL embutido ou metadados).
3. Refazer recuperações que navegam de `Policy` para `Customer`.
Exemplo antes/depois: join de duas tabelas vira join de três, via `Holds`. [s.226]
Citações curtas de prova:
- "You are overbuilding your database schema when you use an associative table to implement a one-to-many association." [s.216]
O que este trecho NÃO diz: como evitar duplicata ou conflito entre os dois triggers; testes específicos.
Relevância: database-and-migrations-expert: MÉDIA, ilustra critério "não fazer overbuilding" e migração de relacionamentos; ALTA como exemplo de trade-off.
Decisão sugerida: usar em catálogo estrutural com o alerta de overbuilding.

---

### Replace Surrogate Key With Natural Key (impr. 135-139, s.227-234)
Resumo: Remove uma chave substituta e usa uma chave natural existente (oposto de Introduce Surrogate Key, p.85). Exemplo: `State.StatePOID` é substituída por `State.StateCode`.
Motivação: reduzir o overhead de manter a coluna substituta; apoiar Consolidate Key Strategy (primeiro trocar a substituta pela natural "oficial"); remover chaves que não eram necessárias (índices sem uso pioram o desempenho). [s.227-228]
Trade-offs: surrogate e natural têm lugar. Com chaves naturais cada aplicação acessa cada tabela de modo próprio (uma coluna numérica, uma de caractere ou várias colunas); com estratégia consistente de surrogate o acesso é uniforme. Portanto trocar para natural pode aumentar a complexidade do código de acesso; a vantagem é simplificar o esquema. [s.228]
Passos de transição (schema): [s.228-229]
1. Identificar as colunas da nova PK; devem ser únicas por linha.
2. Adicionar índice se não existir.
3. Depreciar a coluna original (`StatePOID`).
4. Atualizar tabelas acopladas: remover as colunas que correspondem à chave antiga (Drop Column, p.172) e adicionar as da chave nova se não existirem; atualizar os índices. Se a chave é usada em muitas tabelas, considerar atualizar uma tabela por vez.
5. Atualizar e possivelmente adicionar triggers de integridade referencial; o exemplo cria um trigger BEFORE INSERT em `Address` que obtém `StateCode` a partir de `StatePOID` e adiciona uma FK nova. [s.229-232]
6. No fim: derrubar a FK antiga, derrubar a PK velha, tornar `StateCode` NOT NULL, recriar a PK em `StateCode`, e derrubar o trigger. [s.232]
Migração de dados: nenhuma. [s.232]
Programas de acesso: remover código que gera a chave substituta (pode nem ser mais necessário); refazer joins e recuperações com a chave nova; os mapeamentos Hibernate deixam de gerar o POID e passam a referenciar a coluna natural. [s.232-234]
Específico de produto: `MODIFY ... NOT NULL` é sintaxe Oracle. `[fora do livro]` o equivalente varia por banco.
Citações curtas de prova:
- "Thus, by replacing a surrogate key with a natural key, you potentially increase the complexity of the code that accesses your database." [s.228]
O que este trecho NÃO diz: como tratar chaves naturais que mudam de valor no tempo; o livro só exige unicidade.
Relevância: database-and-migrations-expert: ALTA, mostra que trocar PK é a operação mais acoplada (FKs, índices, triggers de RI) e que se faz tabela por tabela.
Decisão sugerida: usar em referência de chaves e de refatorações de alto acoplamento.

---

### Split Column (impr. 140-144, s.235-242)
Resumo: Divide uma coluna em uma ou mais colunas da mesma tabela (exemplo: `Customer.Name` em `FirstName`, `MiddleName`, `LastName`).
Observação: se alguma coluna nova precisar aparecer em outra tabela, aplicar primeiro Split Column e depois Move Column (p.103). [s.235]
Motivação: (1) necessidade de dado mais fino; (2) a coluna tem vários usos (exemplo: `Account.Status` virou também tipo de conta) e é preciso separar para evitar bugs de uso duplo. [s.235-236]
Trade-offs: pode duplicar dados; se a divisão se basear em uso que na verdade é o mesmo, será preciso aplicar Merge Columns; o uso da coluna deve decidir se ela é dividida. [s.236]
Passos de transição (schema): [s.236]
1. Introduzir as colunas novas (opcional: dá para reaproveitar colunas existentes).
2. Introduzir trigger de sincronização invocado por qualquer mudança nas colunas.
3. Marcar a coluna antiga com data de remoção por comentário.
4. No fim: DROP da coluna antiga e do trigger. [s.240]
Motivo apontado: muitas aplicações duplicam o código que fatia a coluna, fonte de bugs. [s.236]
Migração de dados: copiar a coluna antiga nas novas com funções de extração (`getFirstName` etc.), uma única vez; durante a coexistência, o trigger mantém sincronizado. [s.240]
Programas de acesso: remover código que fatiava; atualizar validação (algumas validações só existiam porque a coluna não era dividida); refatorar a UI para usar o dado fino. [s.241]
Citações curtas de prova:
- "The usage of a column should determine whether it should be split." [s.236]
O que este trecho NÃO diz: como tratar nomes que não seguem o padrão (formato inesperado); as funções de extração não são mostradas. O exemplo "before" tem um erro evidente (`getMiddleName` usado para o sobrenome) [s.241], aparentemente do livro.
Relevância: database-and-migrations-expert: ALTA, split com sincronização e backfill único.
Decisão sugerida: usar em catálogo estrutural.

---

### Split Table (impr. 145-149, s.243-254)
Resumo: Divide verticalmente (por colunas) uma tabela em uma ou mais (exemplo: `Address` com `StateCode` e `StateName` vira `Address` e `State`). Para dividir horizontalmente (por linhas), aplicar Move Data (p.192). Se o destino for tabela existente, na prática é Move Column (p.103). [s.243]
Motivação: [s.243-244]
- Desempenho: separar colunas pesadas ou raras (ex.: foto, salário) das colunas centrais, acelerando leituras que não precisam delas.
- Restringir acesso: colocar colunas sensíveis em tabela própria com regras de controle de acesso.
- Reduzir grupos repetidos (1NF): ex.: cinco avaliações guardadas na linha do empregado viram tabela `EmployeeEvaluation`.
Trade-offs: se a divisão se baseia em uso que na verdade é o mesmo, será preciso Merge Tables (p.96); o uso da tabela deve decidir. [s.244]
Passos de transição (schema): [s.244-252]
1. Criar a(s) tabela(s) nova(s) (opcional se existir destino, caso em que se aplica Move Column repetidamente).
2. Introduzir trigger(s) de sincronização acionados por qualquer mudança nas tabelas; o livro exige implementar de modo que não haja ciclos.
3. O exemplo usa dois triggers: um em `Address` (cria ou encontra `State`) e outro em `State` (propaga mudanças de nome de estado para todos os `Address`).
4. No fim: DROP da coluna `StateName` e dos dois triggers. [s.252]
Migração de dados: copiar as colunas originais para a tabela nova; o exemplo faz INSERT ... SELECT com GROUP BY para obter códigos únicos e ignora linhas com valores NULL. [s.252-253]
Programas de acesso: introduzir metadados da tabela nova e alterar os da antiga (frameworks baseados em metadados); atualizar SQL embutido com join na tabela nova, o que pode reduzir ligeiramente o desempenho; refatorar a UI. [s.253]
Citações curtas de prova:
- "You need to implement the trigger so that cycles do not occur." [s.244]
O que este trecho NÃO diz: como particionar sem perda quando as linhas originais têm inconsistência entre código e nome do estado (o GROUP BY do exemplo assume consistência).
Relevância: database-and-migrations-expert: ALTA, caso de triggers bidirecionais e o aviso sobre ciclos.
Decisão sugerida: usar em referência de triggers de sincronização (regra anti-ciclo).

---

### Chapter 7: Data Quality Refactorings, introdução (impr. 151-152, s.255-257)
Resumo: Refatorações de qualidade de dados melhoram a consistência e o uso dos valores armazenados. Lista de nomes do capítulo: [s.255]
- Add Lookup Table: cria tabela de consulta para coluna existente.
- Apply Standard Codes: padroniza valores de código.
- Apply Standard Type: padroniza o tipo de dado.
- Consolidate Key Strategy: uma só estratégia de chave por entidade.
- Drop Column Constraint: remove constraint de coluna.
- Drop Default Value: remove valor default.
- Drop Non-Nullable Constraint: remove NOT NULL.
- Introduce Column Constraint: adiciona constraint.
- Introduce Common Format: formato comum para dados.
- Introduce Default Value: adiciona default.
- Make Column Non-Nullable: torna não-nula.
- Move Data: move dados entre tabelas.
- Replace Type Code With Property Flags: troca código de tipo por flags.
(Apenas os nomes aparecem; os cinco últimos além de Drop Column Constraint ficam para blocos seguintes.)
Problemas comuns a todas (as quatro tarefas obrigatórias): [s.257]
1. Consertar constraints quebradas: aplicar Drop Column Constraint (p.172) e depois Introduce Column Constraint (p.180) refletindo os dados melhorados.
2. Consertar views quebradas: views costumam ter valores fixos em WHERE; achar rodando a suíte de testes e procurando definições de view que referenciem as colunas.
3. Consertar stored procedures quebradas: variáveis, parâmetros, retornos e SQL podem estar acoplados aos valores; esperar que testes existentes revelem problemas de lógica, senão procurar código que acesse as colunas.
4. Atualizar os dados: travar linhas afeta desempenho e disponibilidade. Duas estratégias: (a) travar tudo e atualizar de uma vez (consistência, mas risco de degradação com milhões de linhas, bloqueando escritas); (b) travar subconjuntos, até uma linha por vez (aplicações continuam trabalhando, mas há inconsistência temporária entre linhas com valor antigo e novo).
Citações curtas de prova:
- "You will likely want to lock the source data rows during the update, affecting performance and availability of the data for the application(s)." [s.257]
O que este trecho NÃO diz: como particionar a atualização em lotes na prática, tamanhos de lote ou janela de manutenção; só descreve as duas estratégias.
Relevância: database-and-migrations-expert: ALTA, checklist de impacto (constraints, views, procedures) e trade-off de backfill em bloco versus em lotes.
Decisão sugerida: usar em referência de data migration e backfill.

---

### Add Lookup Table (impr. 153-156, s.258-264)
Resumo: Cria uma tabela de consulta para uma coluna existente (ex.: `State` para `Address.State`).
Motivação: [s.258]
- Introduzir integridade referencial.
- Oferecer lista de códigos no banco em vez de enumeração em cada aplicação (a tabela costuma ser cacheada em memória).
- Substituir uma constraint de coluna quando os valores crescem a ponto de ser mais fácil manter em tabela.
- Guardar descrições dos códigos.
Trade-offs: (1) população de dados exige acordo sobre a semântica dos valores existentes (ex.: 50 estados dos EUA versus incluir territórios; pode exigir duas tabelas ou uma tabela com validação na aplicação); (2) a FK traz impacto de desempenho (ver Add Foreign Key Constraint, p.204). [s.260]
Passos (schema): [s.260-262]
1. Determinar a estrutura da tabela.
2. Criar a tabela.
3. Determinar os dados do lookup (considerar Insert Data, p.296).
4. Introduzir a restrição referencial via Add Foreign Key.
Migração de dados: o modo mais fácil de popular é copiar os valores distintos da coluna de origem; inspecionar as linhas resultantes para não introduzir valores inválidos, corrigindo origem e lookup; descrições costumam ser preenchidas à mão (script ou utilitário de administração); alternativa: carregar de arquivo externo. O exemplo normaliza maiúsculas (ex.: TX em vez de Tx, tx ou Texas) antes de aplicar a FK. [s.262]
Programas de acesso: passar a ler os valores da tabela nova em vez de coleção codificada; cache funciona bem porque os valores raramente mudam; ao adicionar FK, programas externos precisam tratar exceções lançadas pelo banco. [s.262-264]
Citações curtas de prova:
- "The easiest way to populate State.State is to copy the unique values from Address.State." [s.262]
O que este trecho NÃO diz: a ordem entre limpar dados e criar a FK é implícita no exemplo (limpa antes de FK), não detalhada em regra; não há período de transição com trigger (não há coluna depreciada).
Relevância: database-and-migrations-expert: ALTA, limpeza e validação dos dados antes de adicionar FK; vale como "não criar a constraint antes de limpar".
Decisão sugerida: usar em catálogo de refatorações de qualidade de dados.

---

### Apply Standard Codes (impr. 157-161, s.265-269)
Resumo: Aplica um conjunto padrão de valores de código a uma coluna para conformar com colunas similares (exemplo: `Country.Code` com USA e `Address.CountryCode` com US viram um só padrão, "US"/"CA" na figura).
Motivação: limpar dados (mesmo significado com códigos diferentes impede joins corretos); suportar integridade referencial; preparar Add Lookup Table; conformar a padrões corporativos (ligado a Use Official Data Source, p.271); reduzir complexidade de código. [s.265]
Trade-offs: códigos são usados em muitos lugares (FKs de várias tabelas precisam ser padronizadas junto) e podem estar embutidos em aplicações (ex.: `USA` num lugar e `US` em outro), exigindo muitas atualizações. [s.266]
Passos (schema): [s.266]
1. Identificar os valores padrão ("oficiais"), aceitos pelos stakeholders.
2. Identificar as tabelas onde o código é guardado (pode exigir várias iterações); a refatoração se aplica uma coluna por vez.
3. Atualizar stored procedures que usam os valores antigos.
Migração: poucos registros, script UPDATE simples; grandes volumes ou código em tabelas transacionais: usar Update Data (p.310). [s.266-268]
Programas de acesso a examinar: WHERE codificado; código de validação; "lookup constructs" (constantes, enums, coleções); código de teste (dados de teste e lógica de geração de dados). [s.268]
Citações curtas de prova:
- "Note that this refactoring is applied a single column at a time" [s.266]
O que este trecho NÃO diz: não prevê coluna nova nem trigger de sincronização; o exemplo atualiza o código in place, sem período de convivência dos dois valores.
Relevância: database-and-migrations-expert: MÉDIA, lembra de procurar valores codificados em procedures, validação, enums e testes; contraste com expand-contract.
Decisão sugerida: usar em checklist de impacto de mudança de valores.

---

### Apply Standard Type (impr. 162-168, s.270-284)
Resumo: Garante que o tipo de dado de uma coluna seja consistente com colunas similares (exemplo: telefones passam a inteiro em `Branch`, `Employee`; `Customer.PhoneNumber` já era inteiro).
Motivação: permitir FK entre colunas (ex.: ZipCode VARCHAR versus NUMERIC); preparar Add Lookup Table; conformar a padrões (Use Official Data Source); reduzir código (ex.: um método de validação de telefone compartilhado). [s.271]
Trade-offs: a coluna é referenciada em muitos lugares; a conversão pode ser impossível (ex.: NUMERIC não comporta código postal internacional com letras como "R2D 2C3"). [s.271-273]
Passos (schema): [s.273]
1. Identificar o tipo "oficial"; deve comportar todos os dados existentes e os programas externos precisam conseguir tratá-lo (linguagens antigas às vezes não processam tipos novos).
2. Identificar as tabelas com colunas a mudar (várias iterações); aplicado uma coluna por vez, mas pode-se agrupar quando as colunas estão na mesma tabela.
3. Adicionar coluna nova com Introduce New Column (p.301) e manter as duas durante a transição com trigger de sincronização.
4. Backfill inicial por UPDATE com função de formatação; no fim, DROP das colunas antigas e dos triggers. [s.281-283]
Inconsistência de datas no exemplo do livro: o comentário usa 2007-03-27 [s.273], a figura 14 de março [s.271] e o script de remoção diz 23 de março [s.281]. Tratar como erro do livro.
Migração: poucas linhas, script simples; grande volume ou conversão complicada: Update Data (p.310). [s.283]
Programas de acesso: [s.283]
1. Mudar o tipo das variáveis da aplicação.
2. Atualizar o código que grava, apaga e lê a coluna (ex.: `getString` vira `getLong`).
3. Atualizar lógica de negócio (comparações como `'XXX-XXXX'` viram `XXXXXXX`).
Citações curtas de prova:
- "This data type must handle all existing data and external access programs must be able to handle it." [s.273]
O que este trecho NÃO diz: o exemplo converte telefone para inteiro; o livro não discute os problemas disso (zeros à esquerda, formatação), apenas formata via função; não adotar como recomendação.
Relevância: database-and-migrations-expert: ALTA, mudança de tipo via coluna nova + trigger + backfill + remoção; aviso de que o novo tipo precisa suportar todos os dados.
Decisão sugerida: usar em referência de mudança de tipo de coluna.

---

### Consolidate Key Strategy (impr. 168-172, s.285-290)
Resumo: Escolhe uma única estratégia de chave para uma entidade e a aplica em todo o banco (exemplo: `Policy` com `PolicyOID` substituta e `PolicyNumber` alternativa passa a usar só `PolicyOID`; `PolicyNotes` troca a FK `PolicyNumber` por `PolicyOID`).
Motivação: melhorar desempenho (menos índices para manter em insert/update/delete); conformar a padrões corporativos (Use Official Data Source); melhorar consistência de código (várias chaves geram várias formas de acesso à tabela). [s.286-287]
Trade-offs: difícil: além do esquema de `Policy`, é preciso atualizar toda tabela com FK que não siga a estratégia (via Replace Column, p.126); pode não haver chave "palatável", e então se aplica Introduce Surrogate Key (p.85) ou Introduce Index (p.248). [s.287]
Passos (schema): [s.287-289]
1. Identificar a chave correta (idealmente a do padrão corporativo).
2. Atualizar o esquema da tabela de origem: o mais simples é usar a PK atual e parar de usar as alternativas, derrubando os índices que as suportavam; vale também se a escolhida for uma alternativa; se nenhuma serve, Introduce Surrogate Key.
3. Depreciar as chaves indesejadas (marcar que deixam de ser chave após o período); o livro nota que pode valer manter a restrição de unicidade nelas.
4. Adicionar índice se não existir para a chave oficial.
Fase de depreciação do exemplo: `PolicyNotes` ganha a coluna `PolicyOID`, a PK nova passa a (`PolicyOID`, `NoteNumber`), e depois do período são removidos `PolicyNotes.PolicyNumber` e o índice da chave alternativa. [s.289]
Observação: o texto do exemplo diz "adds the PolicyNotes.PolicyNumber column" onde o código adiciona `PolicyOID` (erro de redação do livro). [s.289]
Migração de dados: tabelas com FK para a entidade devem implementar FK pela chave oficial; copiar o valor de `Policy.PolicyOID` para `PolicyNotes.PolicyOID` via UPDATE ligado pela chave antiga. [s.289]
Programas de acesso: garantir que SQL use a coluna da chave oficial no WHERE e nos joins, por desempenho; exemplo troca o join por `PolicyNumber` para join por `PolicyOID`. [s.290]
Citações curtas de prova:
- "Note that you may want to retain the uniqueness constraint on these columns, even though you are not going to use them as keys anymore." [s.287]
O que este trecho NÃO diz: ordem de criação da nova PK em tabelas grandes ou custo de recriar índices; nenhum teste descrito.
Relevância: database-and-migrations-expert: ALTA, mudança de chave com propagação nas FKs; "manter unicidade na chave alternativa depreciada".
Decisão sugerida: usar em referência de chaves.

---

### Drop Column Constraint (início) (impr. 172-, s.291-292) [continua no próximo bloco]
Resumo (parcial): Remove uma constraint de coluna (exemplo: `Account.Balance >= 0`, constraint nomeada). Durante o período de transição o diagrama marca a constraint com `final date`. Para remover constraint de integridade referencial, usar Drop Foreign Key Constraint (p.213). [s.292]
Motivação: (1) a constraint não vale mais por mudança de regra de negócio (ex.: coluna restrita a "US" e "Canada" e agora negócios internacionais); (2) vale só para um subconjunto das aplicações, então sai do banco comum e fica nas aplicações que precisam; efeito colateral: possível pequena melhora de desempenho; (3) a coluna foi refatorada, texto cortado em "Apply Standard Codes (page 157) or Apply..." e continua no próximo bloco. [s.292]
O que este trecho NÃO diz: passos, trade-offs, migração e programas de acesso: ficam no próximo bloco.
Relevância: database-and-migrations-expert: MÉDIA, só o início.
Decisão sugerida: ler complemento no próximo bloco antes de usar.

---

## Resumo do catálogo deste bloco (nome, 1 linha, seção)

Cap. 6 (restante): Rename View (fim, s.192-196); Replace LOB With Table (s.197-208); Replace Column (s.209-215); Replace One-To-Many With Associative Table (s.216-226); Replace Surrogate Key With Natural Key (s.227-234); Split Column (s.235-242); Split Table (s.243-254).
Cap. 7: lista de nomes (s.255); problemas comuns (s.257); Add Lookup Table (s.258-264); Apply Standard Codes (s.265-269); Apply Standard Type (s.271-284); Consolidate Key Strategy (s.286-290); Drop Column Constraint (início, s.292).

## Candidatos a regra

1. Em toda refatoração com período de transição: depreciar a coluna/tabela velha com data de remoção anotada (comentário e diagrama), manter as duas e sincronizar com trigger durante o período, e só então remover coluna e trigger. Citação: "Introduce a synchronization trigger." (passo da refatoração Replace Column, em forma de lista) [s.210]. Dica: o diagrama `drop date`/`event = insert | update` [s.197].
2. Triggers de sincronização bidirecionais devem evitar ciclos. "You need to implement the trigger so that cycles do not occur." [s.244]
3. Ao substituir coluna, o maior risco é perda de informação na conversão; limpar a origem antes, com refatorações de qualidade de dados. "A significant risk when replacing a column is information loss when transferring the data to the replacement column." [s.210]
4. Ao padronizar o tipo, o novo tipo deve comportar todos os dados existentes e ser tratável por todos os programas. "This data type must handle all existing data and external access programs must be able to handle it." [s.273]
5. Dividir coluna ou tabela só se o uso real for distinto; se o uso for igual, será preciso o refactoring inverso (Merge Columns/Merge Tables). "The usage of a column should determine whether it should be split." [s.236]
6. Trocar chave primária: atualizar tabelas acopladas, de preferência uma por vez quando há muitas, e atualizar triggers de RI e índices. "When StatePOID is used in many tables, you may want to consider updating the tables one at a time" (trecho do passo 4, texto citado parcialmente; ver s.228).
7. Não fazer overbuilding: associativa só se a associação tende a ser N-N. "You are overbuilding your database schema when you use an associative table to implement a one-to-many association." [s.216]
8. Refatorações de qualidade de dados (cap. 7) exigem checar constraints, views, stored procedures e dados em atualizações; escolher entre travar tudo (consistência, risco de bloqueio longo) ou lotes/linhas (disponibilidade, inconsistência temporária). [s.257]
9. Antes de criar FK em lookup: popular com valores distintos, inspecionar e limpar valores inválidos ou com grafia diferente (TX, Tx, tx, Texas) e só então aplicar a restrição. [s.262]
10. Volume grande de atualização: o livro remete a Update Data (p.310) em vez de script simples. [s.266, s.283]
11. Programas externos a procurar em mudança de valor/tipo/chave: SQL embutido, validação, constantes/enums, código de teste e dados de teste, stored procedures, mapeamentos de framework (Hibernate). [s.268, s.283, s.233]
12. Consolidar chaves: manter unicidade nas chaves alternativas depreciadas; atualizar SQL para usar a chave oficial em WHERE/joins por desempenho. [s.287, s.290]

## Checklist de cobertura
- Primeira seção lida: 192
- Última seção lida: 292
- Páginas sem texto útil ou ilegíveis: s.193-195 e s.198-205, s.211-214, s.217-225, s.230-232, s.237-240, s.245-252, s.261-262, s.274-281 são fragmentos de código de uma ou poucas linhas (um comando por seção, cabeçalho "## " falso); li tudo mas só registrei o propósito do código.
- Problemas de extração observados: (a) diagramas UML (figuras 6.13 a 6.18, 7.1 a 7.5) vêm como texto solto e embaralhado; usei só as informações legíveis (nomes de triggers, drop dates, eventos); (b) marcas de cópia/licença ("Licensed by ... Dave Stockmann", "893742") entremeadas no texto, ignoradas; (c) palavras do cabeçalho de página ("Replace Column", "Split Table") intercaladas no meio de parágrafos; (d) s.225 contém comando sem relação com o exemplo (DROP COLUMN balance em customer), provável erro do livro ou da extração; (e) inconsistências de datas e nomes no livro (s.273/271/281; s.289 texto versus código; s.241 getMiddleName usado para sobrenome).
- Capítulos/seções cobertos integralmente: Replace LOB With Table, Replace Column, Replace One-To-Many With Associative Table, Replace Surrogate Key With Natural Key, Split Column, Split Table, introdução do cap. 7, Add Lookup Table, Apply Standard Codes, Apply Standard Type, Consolidate Key Strategy.
- Capítulos/seções que continuam em outro bloco: Rename View (início no bloco anterior, passos 1 e 2); Drop Column Constraint (continua no próximo bloco; Drop Default Value, Drop Non-Nullable Constraint, Introduce Column Constraint, Introduce Common Format, Introduce Default Value, Make Column Non-Nullable, Move Data, Replace Type Code With Property Flags ainda não aparecem).
