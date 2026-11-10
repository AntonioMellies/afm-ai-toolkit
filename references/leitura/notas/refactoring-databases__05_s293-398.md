# Notas: Refactoring Databases (Ambler e Sadalage), bloco 05, seções 293-398

Livro em inglês (EPUB convertido, texto de PDF paginado). Citações são literais em inglês; "impr. N" é o número de página impresso que aparece no fim/início de cada seção. Estrutura de cada refatoração do livro: Motivation, Potential Tradeoffs, Schema Update Mechanics, Data-Migration Mechanics, Access Program Update Mechanics. O bloco traz a parte final do Cap. 7 (Data Quality Refactorings) e quase todo o Cap. 8 (Referential Integrity Refactorings). A extração fragmenta o código SQL/PL-SQL em muitas seções minúsculas (cada linha de código virou um "SECAO"); não há conteúdo conceitual nessas fragmentações.

Convenção desta nota: `[fora do livro]` = tradução/observação minha a PostgreSQL/MySQL ou verificação de consistência, não está no texto. Estilo do livro: Oracle (ALTER TABLE ... MODIFY, SYSDATE, SQLLDR, códigos ORA, triggers PL/SQL).

## Catálogo enumerado (nome, 1 linha, seção)

Cap. 7 Data Quality (continuação):
- Drop Column Constraint: remove uma constraint de coluna (ex.: saldo positivo) para permitir novo caso de negócio [s.293, impr. 173]
- Drop Default Value: remove o default fornecido pelo banco, a aplicação passa a informar o valor [s.295-298, impr. 174-176]
- Drop Non-Nullable: permite null em coluna antes NOT NULL [s.298-300, impr. 177-179]
- Introduce Column Constraint: adiciona CHECK numa coluna existente [s.302-305, impr. 180-182]
- Introduce Common Format: uniformiza o formato dos valores de uma coluna (ex.: telefone) [s.306-309, impr. 183-185]
- Introduce Default Value: banco passa a prover valor default [s.311-314, impr. 186-188]
- Make Column Non-Nullable: adiciona NOT NULL [s.314-319, impr. 189-191]
- Move Data: move dados (tudo ou algumas colunas) para outra tabela existente [s.321-326, impr. 192-195]
- Replace Type Code With Property Flags: troca coluna de código de tipo por colunas booleanas [s.328-339, impr. 196-201]

Cap. 8 Referential Integrity (lista do capítulo em s.340, impr. 203): Add Foreign Key Constraint, Add Trigger For Calculated Column, Drop Foreign Key Constraint, Introduce Cascading Delete, Introduce Hard Delete, Introduce Soft Delete, Introduce Trigger For History.
- Add Foreign Key Constraint: impõe relacionamento no banco [s.342-351, impr. 204-208]
- Add Trigger For Calculated Column: trigger mantém coluna calculada atualizada [s.352-364, impr. 209-212]
- Drop Foreign Key Constraint: deixa de impor RI no banco [s.365-367, impr. 213-214]
- Introduce Cascading Delete: banco apaga filhos ao apagar o pai [s.368-380, impr. 215-218]
- Introduce Hard Delete: remove flag de exclusão lógica e apaga linhas de verdade [s.381-384, impr. 219-221]
- Introduce Soft Delete: adiciona flag de exclusão lógica [s.386-398, impr. 222-224; truncada no fim do bloco]
- Introduce Trigger For History: só citada (página 227), NÃO está neste bloco.

---

### Drop Column Constraint (fim) (PDF/EPUB s.293, impr. 173) [continua do bloco anterior]
Resumo: o trecho cobre só o final: contexto de uso, tradeoff, mecânica de schema/dados/programas. Motivação e início do texto estão no bloco anterior; só se vê que Apply Standard Type ou similar pode exigir dropar a constraint, refatorar a coluna e reaplicar via Introduce Column Constraint.
Conceitos e regras:
- Tradeoff: a lógica da constraint pode precisar ser reimplementada nas aplicações que ainda a exigem; implementada em vários lugares, corre-se o risco de divergência [s.293].
- Schema: um único ALTER TABLE ... DROP CONSTRAINT [s.293]. `[fora do livro]` PostgreSQL e MySQL 8.0.19+ aceitam DROP CONSTRAINT; MySQL antigo usa DROP CHECK.
- Dados: nada a migrar [s.293].
- Programas: remover o tratamento de erro que reagia à violação da constraint no banco [s.293].
Citações curtas de prova: nenhuma necessária.
O que NÃO diz: não traz a motivação completa neste bloco.
Relevância: database-and-migrations-expert: MÉDIA, exemplo de refatoração de passo único sem dados a migrar.
Decisão sugerida: usar em database-and-migrations-expert/references (catálogo de refatorações de qualidade de dados).

### Drop Default Value (impr. 174-176; s.295-298)
Resumo: remover default do banco quando a aplicação já fornece o valor. Passo único de schema, sem migração, mas exige que a aplicação passe a informar o valor.
Conceitos e regras:
- Motivação: depois de Introduce Default Value para o banco preencher, quando a aplicação passa a prover o dado, não se quer mais o default persistido pelo banco [s.295].
- Tradeoff 1: efeitos colaterais; aplicações podem assumir que o banco preenche e agora recebem null em linhas novas [s.296].
- Tradeoff 2: é preciso melhorar o tratamento de exceção de programas externos; se a coluna é NOT NULL e ninguém informa valor, o banco lança exceção inesperada [s.296].
- Schema: modificar a coluna para remover o default (no Oracle, `MODIFY ... DEFAULT NULL`; o livro diz que default null equivale a nenhum default) [s.296]. `[fora do livro]` PostgreSQL: ALTER COLUMN ... DROP DEFAULT; MySQL: ALTER COLUMN ... DROP DEFAULT.
- Dados: nada a migrar [s.296].
- Programas: se alguma aplicação depende do default, ou adiciona validação/valor explícito (o exemplo passa a incluir Status no INSERT) ou desiste da refatoração (back out) [s.296-298].
- Transition period no diagrama: default marcado com "final date" [s.295].
Citações curtas de prova:
- "From a database point of view, a default value of null is the same as having no default value" [s.296, impr. 175]
O que NÃO diz: não prescreve como descobrir todos os consumidores que dependem do default.
Relevância: database-and-migrations-expert: ALTA (parcial), ordem: primeiro atualizar apps, depois remover default.
Decisão sugerida: usar em database-and-migrations-expert/references (catálogo + passos de transição).

### Drop Non-Nullable (impr. 177-179; s.298-300)
Resumo: torna uma coluna NOT NULL em nullable, por mudança de processo de negócio ou como estado temporário durante transição de outra refatoração.
Conceitos e regras:
- Motivo 1: processo mudou e partes da entidade são persistidas em momentos diferentes [s.298].
- Motivo 2: durante transition period, uma aplicação em refatoração não consegue fornecer o valor; relaxa-se a constraint por tempo limitado e depois se reverte com Make Column Non-Nullable [s.298].
- Tradeoff: toda aplicação que lê a coluna precisa aceitar null (ignorar ou assumir default inteligente); considerar Introduce Default Value [s.298-300].
- Schema: único ALTER TABLE ... MODIFY ... NULL; o exemplo agenda o comando na data final (`--On 2007-06-14`) [s.300]. `[fora do livro]` PostgreSQL: ALTER COLUMN DROP NOT NULL; MySQL: MODIFY com a definição completa da coluna sem NOT NULL.
- Dados: nada a migrar [s.300].
- Programas: adicionar checagem de null onde a coluna é lida; remover código que tratava exceção de null que o banco não lança mais [s.300].
Citações curtas de prova:
- "you want to change the non-nullable constraint for a limited amount of time during the transition phase" [s.298, impr. 177]
O que NÃO diz: não trata dados que ficarão nulos de forma permanente nem relatórios existentes.
Relevância: database-and-migrations-expert: ALTA, uso explícito como passo temporário de expand/contract (relaxar NOT NULL e depois reverter).
Decisão sugerida: usar em database-and-migrations-expert/references.

### Introduce Column Constraint (impr. 180-182; s.302-305)
Resumo: adicionar CHECK a coluna existente para garantir que todas as aplicações gravem dados válidos. O difícil é o dado legado que viola a regra e a existência de regras diferentes por aplicação.
Conceitos e regras:
- Para NOT NULL usar Make Column Non-Nullable; para integridade referencial usar Add Foreign Key [s.302].
- Motivação: constraints de coluna implementam regras simples e comuns de validação [s.302].
- Tradeoff: nem sempre existe constraint verdadeiramente comum; cada aplicação pode ter sua versão (exemplo das cores permitidas, cor extra para uma aplicação); mesmo no melhor caso, haverá dados existentes que violam [s.302-303].
- Estratégia sugerida: script que percorre as tabelas e reporta violações, rodado em lote fora do horário de pico [s.303].
- Também usado para reintroduzir constraint após Apply Standard Codes ou Apply Standard Type [s.303].
- Schema: ADD CONSTRAINT nome CHECK (...) em ALTER TABLE; constraint com nome (Check_Credit_Limit) [s.303].
- Dados: definir com stakeholders o que fazer com os valores que não conformam e corrigir a fonte antes; usar Update Data (p.310) [s.303].
- Programas: achar todo ponto de INSERT/UPDATE na tabela e adicionar tratamento da exceção do banco (exemplo trata o código ORA 2290) [s.305]. `[fora do livro]` o código de erro é específico do Oracle; PostgreSQL usa SQLSTATE 23514 (check_violation).
Citações curtas de prova:
- "individual applications have good reasons for doing things a certain way" [s.303, impr. 181]
O que NÃO diz: não menciona adicionar a constraint sem validar dados antigos (tipo NOT VALID); isso seria `[fora do livro]` (PostgreSQL tem ADD CONSTRAINT ... NOT VALID + VALIDATE CONSTRAINT).
Relevância: database-and-migrations-expert: ALTA, regra "limpar dados antes de apertar constraint" e "reportar violações em lote antes".
Decisão sugerida: usar em database-and-migrations-expert.

### Introduce Common Format (impr. 183-185; s.306-309)
Resumo: padroniza o formato dos valores numa coluna (exemplo: telefone) para simplificar o código das aplicações; é aplicado coluna a coluna.
Conceitos e regras:
- Motivação: dados em formatos diferentes obrigam todos os programas a tratar todos os formatos; formato comum reduz validação e simplifica exibição (armazena 1234567890, exibe formatado) [s.306]. Também conformar com padrão corporativo, p. ex. após Use Official Data Source [s.306].
- Tradeoff: padronizar pode ser difícil quando há muitos formatos na mesma coluna (ex.: 15); o código de conversão frequentemente já existe nos programas externos [s.306-308].
- Schema (sem DDL): identificar o formato oficial aceito pelos stakeholders; aplicar uma coluna por vez, "smaller refactorings are always easier to implement and then deploy" [s.308].
- Dados: (1) descobrir os formatos existentes com um SELECT; (2) escrever a conversão em SQL DML, linguagem de aplicação ou ETL; SQL simples para poucas linhas; para muitas linhas ou tabelas transacionais, usar Update Data (p.310) [s.308-309]. Pode encapsular em stored procedure (exemplo FormatPhoneNumber) [s.309].
- Programas: examinar (1) código de limpeza, (2) validação, (3) exibição, (4) dados de teste e geradores, incluindo casos de teste de formato inadequado [s.309].
Citações curtas de prova:
- "You apply Introduce Common Format one column at a time" [s.308, impr. 184]
O que NÃO diz: não trata a perda de informação (por exemplo, extensões de telefone) nem reversibilidade da conversão.
Relevância: database-and-migrations-expert: MÉDIA, migração de dados em passos pequenos; lembrete de atualizar dados de teste.
Decisão sugerida: usar em database-and-migrations-expert/references.

### Introduce Default Value (impr. 186-188; s.311-314)
Resumo: banco passa a prover default em coluna existente; útil sobretudo como passo preparatório para tornar a coluna NOT NULL.
Conceitos e regras:
- Motivação: INSERTs antigos podem não preencher a coluna (coluna nova, ou aplicação não precisa dela); útil antes de Make Column Non-Nullable [s.311].
- Tradeoffs: (1) achar um default verdadeiro é difícil, aplicações diferentes têm defaults diferentes, é preciso negociar com stakeholders; (2) efeitos colaterais: aplicações que davam significado a null; (3) contexto confuso quando a coluna não é usada pela aplicação [s.311-312].
- Schema: passo único com ALTER TABLE ... MODIFY ... DEFAULT; data efetiva opcional documentada com COMMENT ON [s.312].
- Dados: linhas existentes com null ou valores inválidos não são atualizadas por adicionar default; inspecionar valores distintos e, se for o caso, rodar script de atualização [s.312].
- Programas (aparência enganosa): (1) invariantes quebradas pelo novo valor, (2) código que aplicava o default programaticamente passa a ser supérfluo e deve ser removido, (3) código que assume outro default (o novo nunca dispara a lógica); analisar as aplicações antes de introduzir o default [s.312-314].
Citações curtas de prova:
- "appearances can be deceiving" [s.312, impr. 187]
O que NÃO diz: não trata defaults dinâmicos (funções) nem custo de ADD COLUMN com default em tabelas grandes.
Relevância: database-and-migrations-expert: ALTA, par com Make Column Non-Nullable (ordem: default, backfill, NOT NULL).
Decisão sugerida: usar em database-and-migrations-expert.

### Make Column Non-Nullable (impr. 189-191; s.314-319)
Resumo: adiciona NOT NULL para impor a regra no banco e remover checagens repetidas nas aplicações. Exige limpar nulos existentes e que todas as aplicações forneçam o valor.
Conceitos e regras:
- Motivos: impor regra de negócio no nível do banco; remover lógica repetida de checagem de null nas aplicações [s.314].
- Tradeoff: todo programa que grava na tabela deve fornecer valor; programas que assumem nullable falharão; técnica útil: atribuir default via Introduce Default Value [s.314].
- Schema: ALTER TABLE ... MODIFY ... NOT NULL [s.317]. Nota de estilo: não marcar `<<nullable>>` em diagramas, pois colunas fora da PK são nullable por padrão [s.317].
- Dados: não se pode tornar NOT NULL com linhas nulas; verificar com contagem e substituir nulos por valor apropriado; no exemplo escolheram '???' "chosen carefully by stakeholders" porque o dado é crítico [s.317-319].
- Programas: refatorar todos os que alteram a linha para fornecer valor; tratar novas exceções; se não se sabe onde a coluna é usada, usar Introduce Default Value como estratégia provisória e depois, "after sufficient time", aplicar Drop Default Value (indica melhoria de desempenho) [s.319].
Citações curtas de prova:
- "you cannot make a column non-nullable if there are existing rows with a null value in the column" [s.317, impr. 190]
O que NÃO diz: não aborda locks/tempo de ALTER em tabelas grandes.
Relevância: database-and-migrations-expert: ALTA, sequência concreta (default, limpar nulos, NOT NULL, depois remover default).
Decisão sugerida: usar em database-and-migrations-expert (exemplo expand/contract).
Observação `[fora do livro]`: a consulta de verificação do livro usa COUNT(FirstName) com WHERE FirstName IS NULL, que retornaria 0 porque COUNT(coluna) ignora nulos; o correto seria COUNT(*). Não repetir esse padrão.

### Move Data (impr. 192-195; s.321-326)
Resumo: move dados (tabela inteira ou algumas colunas) para outra tabela existente; é passo auxiliar de várias outras refatorações.
Conceitos e regras:
- Quando aplicar: renomear coluna (introduz nova, move, remove a original com Drop Column); Split Table vertical; split horizontal (ex.: clientes europeus para outra tabela, primeiro passo de herança no banco); Split Column; Merge Tables/Columns; consolidar dados sem mudança estrutural; mover antes de Drop Table/Drop Column se o dado ainda é necessário [s.322-323].
- Tradeoff: mover milhões de linhas é complicado; provavelmente trava dados durante a movimentação, afetando desempenho e disponibilidade [s.323].
- Schema (perguntas a responder): quais dados e dependências (a linha correspondente na outra tabela é apagada, zerada ou mantida? move linha ou colunas?); destino (outra tabela? há transformação?); ao mover linhas, as tabelas dependentes com FK devem passar a referenciar o destino [s.325].
- Dados: poucos dados, script de INSERT...SELECT e depois remoção da origem; grandes volumes, abordagem mais sofisticada (exportar/importar, utilitários como o SQLLDR do Oracle ou bulk loader) [s.325]. O exemplo copia Status para CustomerStatusHistory com data efetiva e depois zera Customer.Status [s.325].
- Programas: se o Move Data decorre de outra refatoração, os apps já deveriam estar atualizados; se é reorganização, SELECTs devem ler da nova fonte (o exemplo troca getStatus por consulta ao histórico, com exceção se não houver registro) [s.325-326].
Citações curtas de prova:
- "you will likely want to lock the data during the move" [s.323, impr. 194]
O que NÃO diz: não descreve cópia em lotes sem lock, backfill online nem verificação de contagens/checksum após a movimentação.
Relevância: database-and-migrations-expert: ALTA, é o passo de "migrar dados" dentro de renomear/split/merge e do transition period.
Decisão sugerida: usar em database-and-migrations-expert.
Observação `[fora do livro]`: o exemplo faz a data efetiva com SYSDATE e o programa filtra EffectiveDate < TRUNC(SYSDATE), o que excluiria a linha movida hoje; é um detalhe do exemplo, não regra.

### Replace Type Code With Property Flags (impr. 196-201; s.328-339)
Resumo: troca uma coluna de código de tipo por colunas booleanas (uma por tipo) na mesma tabela, com período de transição em que um trigger sincroniza as colunas antigas e novas.
Conceitos e regras:
- Motivações: (1) desnormalizar por desempenho (comparar booleanos é mais rápido que strings); (2) simplificar seleções quando tipos não são mutuamente exclusivos (evita valores combinados como "HomeAndBusiness"); (3) desacoplar aplicações dos valores do código [s.328-329].
- Tradeoff: cada novo tipo exige mudança de estrutura (nova coluna); tabelas com muitas colunas ficam mais difíceis de entender; joins ficam maiores; por outro lado, adicionar coluna é fácil e independente das demais [s.329].
- Passos de schema: (1) identificar a coluna de tipo e todas as instâncias de tipo; (2) introduzir as colunas flag via Introduce New Column (p.301); (3) remover a coluna de tipo com Drop Column depois que tudo foi convertido [s.331].
- Transition period: colunas antiga e novas coexistem, com trigger BEFORE INSERT OR UPDATE (SynchronizeAccountTypeColumns) preenchendo flags a partir do tipo; na data final, dropar a coluna de tipo e o trigger [s.331-336]. Colunas marcadas com comentário "Replaces AccountType of ..." [s.331].
- Dados: scripts via Update Data (p.310) para setar flag TRUE onde o tipo corresponde e FALSE nos demais; trigger mantém consistência durante a transição [s.336-338].
- Programas: (1) SQL que lê/grava passa de `AccountType = 'X'` para `isX = TRUE`, inclusive inserts/updates; (2) código da aplicação que compara tipo (ex.: Address.Type = 'Home') passa a usar a flag [s.338-339].
- Nota de produto: nem todo banco tem BOOLEAN nativo; no Oracle usa-se NUMBER(1) com 1/0 [s.328]. `[fora do livro]` PostgreSQL tem boolean nativo; MySQL usa TINYINT(1)/BOOLEAN como alias.
Citações curtas de prova:
- "with property flag columns, the applications are merely coupled to the names of the columns" [s.329, impr. 197]
O que NÃO diz: não discute o caminho inverso (flags para enum/tabela de lookup) neste trecho, nem índices nas flags.
Relevância: database-and-migrations-expert: ALTA, exemplo completo de transição com trigger de sincronização e data de remoção.
Decisão sugerida: usar em database-and-migrations-expert (exemplo de transition period com trigger).
Observação `[fora do livro]`: o UPDATE "SET flag = FALSE WHERE flag != TRUE" não atinge linhas com flag NULL (NULL != TRUE é desconhecido); um backfill robusto trata NULL explicitamente. O trigger do livro também só preenche flag quando ela é null.

### Cap. 8, abertura: Referential Integrity Refactorings (impr. 203; s.340)
Resumo: define o grupo como mudanças que garantem que a linha referenciada exista em outra tabela e/ou que linhas não mais necessárias sejam removidas adequadamente; lista as 7 refatorações.
Conceitos e regras:
- Definição: "ensure that a referenced row exists within another table and/or that ensures that a row that is no longer needed is removed appropriately" (parafraseado acima) [s.340].
Citações curtas de prova: nenhuma.
O que NÃO diz: nada além da lista.
Relevância: database-and-migrations-expert: MÉDIA, taxonomia/categoria.
Decisão sugerida: usar em database-and-migrations-expert/references (categorias).

### Add Foreign Key Constraint (impr. 204-208; s.342-351)
Resumo: cria FK para o banco impor dependência de dados. Tem 3 passos de schema e quatro passos de saneamento de dados, mais impactos no código das aplicações.
Conceitos e regras:
- Motivação: impor integridade referencial no banco, importante quando várias aplicações acessam o mesmo banco porque não se pode contar com todas impondo as regras de forma consistente [s.342].
- Tradeoffs: FK reduz desempenho (verifica existência da linha pai a cada alteração); impõe ordem de inserts/updates/deletes, a aplicação ou camada de persistência precisa conhecer as dependências de tabelas; muitos bancos permitem checagem no commit, o que facilita [s.342-343].
- Schema, passo 1, estratégia de checagem: imediata (falha rápido, força pensar na ordem das operações) versus diferida (checada no commit; permite ordem livre e gravação em lote de objetos "sujos"; mas há degradação de desempenho no commit em tabelas com milhões de linhas) [s.343].
- Passo 2: criar a constraint com ALTER TABLE ... ADD CONSTRAINT, nome segundo convenção de nomes, para clareza e boa mensagem de erro (exemplo FK_Account_AccountStatus; versão diferida usa INITIALLY DEFERRED) [s.343, 345-347]. `[fora do livro]` PostgreSQL: DEFERRABLE INITIALLY DEFERRED; MySQL/InnoDB não suporta checagem diferida.
- Passo 3 (opcional): índice na chave referenciada (Introduce Index, p.248); melhora checagem, piora insert/update/delete da tabela referenciada [s.343].
- Dados (4 passos): (1) garantir que linhas referenciadas existem (comparar contagem da tabela com a contagem do join); (2) garantir que a tabela de lookup contém todas as linhas necessárias (comparar listas de valores distintos; para valores válidos de negócio ausentes de ambas as listas, falar com stakeholders, ou melhor, adicioná-los apenas quando alguém realmente precisar); (3) garantir que a coluna FK da tabela origem só tenha valores válidos, corrigindo por script (default) ou manualmente; (4) opcionalmente introduzir default na coluna FK [s.347-349]. Exemplo: atualiza para 'DORMANT' status inexistente e para 'NEW' status nulo [s.348-349].
- Programas: (1) RI duplicada, que deve ser removida; (2) RI diferente, que exige reconsiderar a FK (sem consenso) ou retrabalhar o código; (3) RI inexistente (aplicações nem conhecem a regra); todas devem tratar as exceções do banco (exemplo trata ORA 2291, pai não encontrado, e 2292, pai apagado com filhos) [s.349-351]. `[fora do livro]` PostgreSQL: SQLSTATE 23503 (foreign_key_violation).
Citações curtas de prova:
- "you cannot count on them enforcing data-integrity rules consistently" [s.342, impr. 204]
- "the database returns an exception when the first foreign key constraint fails" [s.343, impr. 205]
O que NÃO diz: não descreve criação de FK sem bloquear a tabela nem validar depois; não discute FK entre bancos/serviços distintos.
Relevância: database-and-migrations-expert: ALTA, sequência segura (sanear dados antes, nomear constraint, indexar, tratar exceções).
Decisão sugerida: usar em database-and-migrations-expert.

### Add Trigger For Calculated Column (impr. 209-212; s.352-364)
Resumo: introduz triggers que mantêm atualizada uma coluna calculada (possivelmente criada por Introduce Calculated Column, p.81) sempre que os dados-fonte mudam.
Conceitos e regras:
- Motivação: garantir atualização correta da coluna calculada pelo banco, sem exigir isso de todas as aplicações [s.352].
- Tradeoffs: lógica complexa ou dados em várias tabelas põe muita regra de negócio no trigger, risco de inconsistência com a lógica das aplicações; falha do trigger faz a transação inteira falhar (efeito colateral percebido como indesejável); se os dados-fonte estão na mesma tabela, muitos bancos não permitem trigger para isso [s.354].
- Passos de schema: (1) determinar se triggers servem (convenção UML "/" indica calculado; fonte na mesma tabela provavelmente impossibilita); (2) identificar dados-fonte; (3) identificar a tabela que contém a coluna (a entidade de negócio que ela melhor descreve); (4) adicionar a coluna se não existe (Introduce New Column, p.301); (5) adicionar triggers em cada tabela que contém dados-fonte (aqui Account e InsurancePolicy) [s.354-355].
- Dados: nenhum a migrar de fato, mas a coluna deve ser populada uma vez em lote por script (no exemplo, soma de saldos e valores de apólices por cliente) [s.361-362].
- Programas: localizar onde a conta é feita nas aplicações e trocar por leitura da coluna; calculos diferentes entre aplicações (bug ou situação distinta) exigem negociar com o negócio [s.364].
Citações curtas de prova:
- "If the trigger fails, the transaction fails, too" [s.354, impr. 211]
O que NÃO diz: alternativas atuais (colunas geradas, views materializadas) não aparecem no trecho `[fora do livro]`.
Relevância: database-and-migrations-expert: MÉDIA, trade-offs de lógica em trigger; cuidado com carga inicial.
Decisão sugerida: usar em database-and-migrations-expert/references (lógica no banco).
Observação `[fora do livro]`: o SQL de carga do livro tem inconsistências (usa Policy.Balance e Policy sem alias para InsurancePolicy.Value); tratar o código como ilustrativo. Os dois triggers do exemplo chamam o mesmo procedimento, e os nomes dos triggers divergem entre texto e figura.

### Drop Foreign Key Constraint (impr. 213-214; s.365-367)
Resumo: tira a imposição de FK no banco; troca integridade por desempenho ou por flexibilidade quando as regras variam entre aplicações.
Conceitos e regras:
- Motivação: custo de desempenho de impor RI não é mais sustentável e/ou as regras variam por aplicação [s.365].
- Tradeoff central: desempenho versus qualidade; sem a FK, aplicações que não validam podem gravar dados inválidos [s.365].
- Schema: DROP CONSTRAINT ou DISABLE CONSTRAINT; a segunda mantém o relacionamento documentado mesmo sem imposição, e é a opção recomendada pelos autores [s.365-367]. `[fora do livro]` PostgreSQL não tem DISABLE CONSTRAINT para FK (só desabilitar triggers); MySQL idem, só via foreign_key_checks de sessão; então a documentação precisa ir em comentário/modelo.
- Dados: nada a migrar [s.367].
- Programas: cada aplicação precisa garantir a RI (verificar existência da linha referenciada; se a tabela é pequena, cache em memória; estar pronta para inserir a linha) e retrabalhar o tratamento de exceções que o banco não lança mais [s.367].
Citações curtas de prova:
- "The fundamental tradeoff is performance versus quality" [s.365, impr. 214]
O que NÃO diz: não oferece alternativas como FK diferida ou índice para recuperar desempenho antes de dropar.
Relevância: database-and-migrations-expert: MÉDIA, trade-off explícito e documentação da constraint desativada.
Decisão sugerida: usar em database-and-migrations-expert/references.

### Introduce Cascading Delete (impr. 215-218; s.368-380)
Resumo: o banco apaga automaticamente os filhos ao apagar o pai, via trigger ou FK com DELETE CASCADE. Alternativa: anular a referência nos filhos (só se a FK aceita null), que pode gerar muitos órfãos.
Conceitos e regras:
- Motivação: preservar RI apagando linhas relacionadas junto com o pai [s.368].
- Tradeoffs: (1) deadlock se houver dependências cíclicas (bancos modernos detectam e desfazem a transação); (2) exclusão em massa acidental (apagar uma divisão pode apagar milhares de funcionários); (3) funcionalidade duplicada com frameworks de persistência (Hibernate, Toplink) que já gerenciam relacionamentos [s.368-370].
- Passos: (1) identificar o que apagar (recursivo; aplicar a um conjunto de tabelas por vez, implementar e testar totalmente antes do próximo, "small changes are easier"); (2) escolher mecanismo, trigger ou FK com DELETE CASCADE (nem todo produto suporta); (3) implementar [s.370].
- Trigger: controle fino sobre o que é apagado; custo é escrever código e risco de deadlock entre triggers [s.370].
- DELETE CASCADE: não exige código novo; exige ter FKs definidas (pode ser enorme se não há nenhuma, pois equivale a Add Foreign Key em quase todo relacionamento); difícil de depurar [s.370-371].
- Dados: nada a migrar [s.378].
- Programas: remover o código de aplicação que apagava filhos; cuidado porque algumas aplicações apagam os filhos e outras não, o cascade muda o comportamento da segunda (talvez para melhor): "should not assume that all applications implement the same RI rules"; tratar novos erros do banco; em ORM, ajustar o mapeamento (opção cascade) [s.378-380].
Citações curtas de prova:
- "you should not assume that all applications implement the same RI rules" [s.380, impr. 218]
O que NÃO diz: não compara cascade com soft delete nem com restrição à exclusão (RESTRICT); não trata auditoria dos apagados.
Relevância: database-and-migrations-expert: ALTA (parcial), riscos de mass deletion e mudança de comportamento oculta para outras aplicações.
Decisão sugerida: usar em database-and-migrations-expert.

### Introduce Hard Delete (impr. 219-221; s.381-384)
Resumo: remove a coluna de exclusão lógica e passa a apagar fisicamente; é o inverso de Introduce Soft Delete.
Conceitos e regras:
- Motivação: reduzir o tamanho das tabelas, melhorar desempenho, simplificar consultas que não precisam mais filtrar linhas apagadas [s.381].
- Tradeoff: perda de dados históricos; mitigável com Introduce Trigger For History (p.227) [s.381].
- Transition period: coluna isDeleted e trigger SoftDeleteCustomer com "drop date" [s.381].
- Schema: remover a coluna (Drop Column, p.72) e o código que a atualiza (normalmente trigger; às vezes aplicação; default que a inicializa cai junto com a coluna) [s.383].
- Dados: apagar as linhas marcadas como excluídas, após tratar (atualizar ou apagar) tudo que referencia essas linhas; script em lote; considerar arquivar as linhas antes para poder desfazer a refatoração [s.383].
- Programas: SELECTs deixam de referenciar a coluna; o código de exclusão lógica (UPDATE flag) passa a DELETE [s.383-384].
Citações curtas de prova:
- "consider archiving all the rows marked for deletion so that you can back out of this refactoring if need be" [s.383, impr. 220]
O que NÃO diz: não trata ordem de remoção quando há FKs apontando para as linhas; só manda tratar referências antes.
Relevância: database-and-migrations-expert: ALTA (parcial), regra "arquivar antes de apagar para poder reverter".
Decisão sugerida: usar em database-and-migrations-expert.

### Introduce Soft Delete (impr. 222-224; s.386-398) [TRUNCADA no fim do bloco]
Resumo: adiciona flag de exclusão lógica para preservar dados históricos. Custa espaço, desempenho de consulta e complexidade de código. O bloco termina dentro do código do trigger (Oracle PL/SQL), antes das seções Data-Migration e Access Program Update.
Conceitos e regras:
- Motivação: preservar todos os dados da aplicação, tipicamente por histórico [s.386].
- Tradeoff: desempenho pode piorar por (1) armazenar todas as linhas marcadas, mais disco e consultas mais lentas; (2) aplicações têm de distinguir apagadas de não apagadas, mais trabalho e complexidade [s.386].
- Passos de schema: (1) introduzir a coluna identificadora (Introduce New Column), booleana (TRUE quando apagada) ou data/hora da exclusão, sem permitir NULL (Make Column Non-Nullable); (2) decidir quem atualiza a flag, aplicação ou trigger; os autores preferem trigger por ser simples e evitar o risco de aplicações não atualizarem corretamente; (3) desenvolver o código de exclusão (TRUE ou data/hora atual); (4) desenvolver o código de inserção (FALSE, ou uma data predeterminada como 1 de janeiro de 5000 para timestamp), via Introduce Default Value ou trigger [s.387].
- Exemplo Oracle: coluna BOOLEAN com default FALSE; três triggers (BEFORE DELETE limpa um array de pacote, BEFORE DELETE FOR EACH ROW guarda a linha, AFTER DELETE reinsere a linha com isDeleted = TRUE) [s.387-398]. Isso é um truque para contornar a restrição de tabela "mutating" do Oracle `[fora do livro]`; PostgreSQL/MySQL usariam regra/trigger BEFORE DELETE que faz UPDATE e cancela o DELETE, ou lógica na aplicação.
Citações curtas de prova:
- "We prefer the trigger-based approach because it is simple and it avoids the risk that the applications will not update the column properly." [s.387, impr. 223]
O que NÃO diz (neste bloco): migração de dados, mudança em programas (por exemplo, filtrar isDeleted em todas as consultas) e eventual índice parcial/unicidade com linhas apagadas; essas seções ficaram fora do bloco ou não existem no trecho lido. Observação: o texto do trigger no livro referencia deleteCustomer.oldvals em vez do pacote SoftDeleteCustomerPKG (inconsistência do original).
Relevância: database-and-migrations-expert: ALTA (parcial), passos e trade-offs de soft delete; fecha a seção no próximo bloco.
Decisão sugerida: usar em database-and-migrations-expert; completar com o bloco seguinte.

---

## Candidatos a regra

1. Ordem para tornar coluna NOT NULL: introduzir default, limpar nulos existentes (com valor escolhido pelos stakeholders), aplicar NOT NULL; o default pode ficar como medida provisória e ser removido depois de tempo suficiente. [s.314, s.317-319] "One technique we have found useful is to assign a default value using Introduce Default Value" [s.314].
2. Antes de Add Foreign Key: reconciliar dados (contagem da tabela versus contagem do join; listas de valores distintos); corrigir órfãos por script ou manualmente; só acrescentar linhas de lookup quando alguém precisar delas. [s.347-349] "wait until they actually need the data rows and then add them at that time" [s.347].
3. Escolher entre checagem de FK imediata e diferida: imediata falha rápido e força ordem; diferida dá liberdade de ordem e lote mas custa no commit. [s.343].
4. Dar nome às constraints seguindo convenção, para erros claros. [s.343] "named according to your database naming conventions" [s.343].
5. Desabilitar em vez de dropar uma FK mantém documentação (recomendação dos autores, específica de Oracle). [s.367] "We recommend the second approach" [s.367].
6. Não presumir que todas as aplicações têm a mesma regra de RI/constraint/default; cada mudança de constraint, default ou cascade pode alterar o comportamento de apps que ninguém consultou. [s.303, s.311, s.349, s.380].
7. Aplicar refatoração de dados uma coluna/um conjunto de tabelas por vez, implementar e testar antes da próxima. [s.308, s.370] "smaller refactorings are always easier to implement and then deploy into production" [s.308].
8. Limpar/relatar violações de constraint por script em lote antes de introduzir a constraint, fora do horário de pico. [s.303].
9. Transition period com trigger de sincronização entre estrutura antiga e nova, com data final (drop date) para remover coluna e trigger. [s.331-336, Figura 7.13].
10. Relaxar NOT NULL temporariamente durante transição de uma aplicação e restaurar depois com Make Column Non-Nullable. [s.298] "for a limited amount of time during the transition phase" [s.298].
11. Antes de Introduce Hard Delete, tratar dados que referenciam as linhas marcadas e arquivar as removidas para poder desfazer. [s.383].
12. Cascade: avisar para mass deletion acidental e duplicidade com ORM; preferir aplicar por conjuntos de tabelas; escolher trigger (controle fino) ou DELETE CASCADE (sem código, mas difícil de depurar). [s.368-371].
13. Mover dados em volume: lock durante a movimentação afeta disponibilidade; usar exportação/importação ou bulk loader em vez de um único script. [s.323, s.325].
14. Atualizar dados de teste e geradores de dados de teste quando muda o formato de dados, e acrescentar casos de teste para formatos inadequados. [s.309].
15. Toda mudança de constraint/FK exige revisar tratamento de exceção nas aplicações (adicionar para novas constraints, remover para constraints removidas). [s.293, s.300, s.305, s.351, s.367].
16. Coluna calculada por trigger: falha do trigger derruba a transação; carga inicial em lote; trigger em cada tabela-fonte; fonte na mesma tabela pode impedir trigger. [s.354, s.361].
17. Soft delete: preferir trigger a lógica na aplicação para manter a flag; flag não nula; para timestamp usar data sentinela no insert. [s.387].

## Checklist de cobertura
- Primeira seção lida: 293
- Última seção lida: 398
- Seções sem texto útil ou ilegíveis: muitas seções são só cabeçalhos de página ("## CHAPTER 7", "## DATA QUALITY REFACTORINGS", "## CHAPTER 8", "## REFERENTIAL INTEGRITY REFACTORINGS") ou uma única linha de código fragmentada (s.294, 297, 299, 301, 304, 307, 310, 313, 315, 316, 320, 324, 327, 330, 332-334, 341, 344-347, 350, 353, 355-360, 363, 366, 369, 372-377, 379, 382, 385, 388-398).
- Problemas de extração observados: código SQL/PL-SQL fragmentado em seções de uma linha; texto de rodapé de licença repetido (ignorado); legendas dos diagramas e rótulos de margem ("Drop Default Value", "Introduce Column Constraint" etc.) misturados no corpo; diagramas UML não lidos (apenas rótulos soltos), logo as figuras 7.5 a 8.6 só estão representadas pelos rótulos; título do bloco chapter-level incorreto ("Refactoring Databases...") em todas as seções; alguns trechos de código do livro têm erros de digitação ou inconsistências de nome (anotados nas observações).
- Capítulos/seções cobertos integralmente: Drop Default Value, Drop Non-Nullable, Introduce Column Constraint, Introduce Common Format, Introduce Default Value, Make Column Non-Nullable, Move Data, Replace Type Code With Property Flags, Cap. 8 abertura, Add Foreign Key Constraint, Add Trigger For Calculated Column, Drop Foreign Key Constraint, Introduce Cascading Delete, Introduce Hard Delete.
- Capítulos/seções que continuam em outro bloco: Drop Column Constraint (início no bloco anterior); Introduce Soft Delete (truncada em s.398 dentro do código do trigger; faltam Data-Migration e Access Program Update); Introduce Trigger For History (página 227) segue no bloco seguinte.
