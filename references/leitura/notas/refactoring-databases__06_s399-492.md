# Notas de leitura: Refactoring Databases (Ambler & Sadalage), bloco 06, seções 399-492

Livro em inglês, EPUB convertido. Citações literais em inglês; paráfrases em português. Páginas impressas do livro anotadas como "impr." (o rodapé do texto as traz). Banco do livro: Oracle (PL/SQL, REF CURSOR, hints, triggers com REFERENCING OLD/NEW). Marcador `[fora do livro]` = tradução minha, não afirmada pelo texto.

Estrutura do bloco: s.399-401 fim de Introduce Soft Delete (cap. 8, Referential Integrity Refactorings); s.402-414 Introduce Trigger For History (fim do cap. 8); s.415-490 cap. 9 Architectural Refactorings; s.491-492 início do cap. 10 Method Refactorings (apenas 2 refatorações resumidas).

Observação geral de formato: cada refatoração segue o mesmo gabarito: Motivation, Potential Tradeoffs, Schema Update Mechanics, Data-Migration Mechanics, Access Program Update Mechanics (passos no banco, passos nos dados, passos nos programas externos).

---

### Introduce Soft Delete, trecho final (cap. 8) (s.399-401; impr. 225-227) [continua do bloco anterior]
Resumo: o trecho cobre apenas a parte final da refatoração (migração de dados e atualização dos programas). Motivação e passos de esquema ficaram no bloco anterior.
Conceitos e regras:
- Não há dados a migrar, mas a coluna de marca de exclusão (Customer.isDeleted) precisa receber um valor default em todas as linhas existentes, normalmente uma vez em lote por script. [s.399, impr. 225]
- Programas de leitura precisam passar a filtrar linhas marcadas como excluídas (acrescentar condição `isDeleted = FALSE` em todos os SELECT). [s.399]
- Três alternativas para não editar todas as consultas: (a) Encapsulate Table With View (view retorna só linhas não excluídas); (b) Add Read Method (filtro num único lugar); (c) mudar as consultas em cada programa. [s.399]
- Programas que excluem fisicamente passam a fazer UPDATE da marca em vez de DELETE; alternativa: trigger de delete que impede a exclusão e atualiza a marca. [s.399]
- O exemplo "depois" inclui o filtro `isDeleted` como parâmetro na leitura e troca DELETE por UPDATE. [s.401]
Citações curtas de prova:
- "you must change external programs accessing the data" [s.399]
O que este trecho NÃO diz: não traz motivação nem trade-offs (bloco anterior); não discute índices parciais, unicidade com linhas excluídas, nem expurgo posterior.
Relevância: database-and-migrations-expert: MÉDIA, mostra que soft delete exige alterar toda leitura e todo delete, com view/read method como mitigação.
Decisão sugerida: usar em database-and-migrations-expert (references de refatorações de integridade referencial, nota curta; consolidar com o bloco anterior).

---

### Introduce Trigger For History (cap. 8) (s.402-414; impr. 227-230)
Resumo: cria um trigger que grava mudanças de dados numa tabela de histórico, delegando a auditoria ao banco para que toda aplicação seja coberta.
Conceitos e regras:
- Motivação: delegar ao banco o rastreio de mudanças, de modo que qualquer aplicação que altere dados críticos tenha a mudança registrada/auditada. [s.402, impr. 227]
- Trade-off 1: desempenho; o trigger aumenta o tempo de atualização das linhas. [s.402]
- Trade-off 2: pode ser preciso alterar aplicações para passar contexto de usuário (quem fez a mudança), especialmente apps web/n-tier; alternativa é usar um valor default de usuário quando não informado. [s.402, s.414]
- Passos de esquema (impr. 227-228): (1) decidir quais ações registrar (insert/update/delete); (2) decidir quais colunas rastrear; (3) decidir como gravar: tabela genérica única para todo o banco ou uma tabela de histórico por tabela, sendo que a tabela única "não escala bem" e só serve a bancos pequenos; (4) criar a tabela de histórico (CREATE TABLE); (5) criar o(s) trigger(s). [s.402, s.404]
- Duas estratégias de trigger: guardar a imagem original da linha, ou comparar valores antes/depois e armazenar a descrição das mudanças. [s.404]
- Exemplo (Oracle): trigger AFTER INSERT OR UPDATE OR DELETE, FOR EACH ROW, com REFERENCING OLD/NEW, que chama um procedimento de criação de linha de histórico passando valor novo, valor antigo e usuário; comparação trata NULL explicitamente. [s.405-412] Específico de Oracle: `REFERENCING OLD AS OLD NEW AS NEW`, `NVL`, `User`, `CREATE OR REPLACE TRIGGER`. `[fora do livro]` em PostgreSQL seria função de trigger + `CREATE TRIGGER` com `OLD`/`NEW` e `current_user`; em MySQL, triggers por linha com `OLD`/`NEW` e `CURRENT_USER()`; o livro não trata isso.
- Migração de dados: normalmente nenhuma; se quiser rastrear inserções, pode-se criar uma linha de histórico para cada linha existente; sem coluna de data de criação, precisa-se gerar uma data (o mais fácil é a data atual). [s.412]
- Atualização dos programas: (1) parar a geração de histórico pela aplicação (achar e retrabalhar a lógica existente que já cria histórico); (2) atualizar a apresentação que exibia histórico gerado pela aplicação para usar a nova tabela; (3) fornecer contexto de usuário ao banco. [s.412, s.414]
- Transformação relacionada (fora da refatoração em si): adicionar colunas de auditoria às tabelas principais (UserCreated, CreationDate, UserLastModified, LastModifiedDate) via Introduce New Column; as de usuário podem ser chave estrangeira para tabela de usuários (Add Lookup Table). [s.414, impr. 230]
Citações curtas de prova:
- "The primary trade-off is performance related" [s.402, impr. 227]
- "The singletable approach will not scale very well" [s.404, impr. 228] (texto extraído com hífen colado)
O que este trecho NÃO diz: não trata histórico de esquema, retenção/expurgo do histórico, nem alternativas modernas (CDC, event sourcing, tabelas temporais). Não há teste de verificação explícito para esta refatoração.
Relevância: database-and-migrations-expert: MÉDIA, caso concreto de refatoração que move lógica da aplicação para o banco, com passos para dados e apps.
Decisão sugerida: usar em database-and-migrations-expert (catálogo, linha curta).

---

### Cap. 9, abertura: Architectural Refactorings (s.415; impr. 231)
Resumo: define refatorações arquiteturais como mudanças que melhoram a forma como programas externos interagem com o banco. Lista os 12 itens do capítulo.
Catálogo (nome, 1 linha, seção):
- Add CRUD Methods: criar 4 stored procedures de create/read/update/delete de uma entidade e restringir o acesso às tabelas. [s.416-422]
- Add Mirror Table: duplicar exatamente uma tabela em outro banco, com estratégia de sincronização. [s.423-435]
- Add Read Method: stored procedure de leitura por critérios. [s.436-440]
- Encapsulate Table With View: renomear a tabela e criar view com o nome original. [s.441-442]
- Introduce Calculation Method: função que faz um cálculo dentro do banco. [s.443-446]
- Introduce Index: novo índice único ou não único. [s.447-453]
- Introduce Read-Only Table: tabela somente leitura derivada de tabelas existentes. [s.453-469]
- Migrate Method From Database: levar método do banco para a aplicação. [s.470-473]
- Migrate Method To Database: levar lógica da aplicação para o banco. [s.474-477]
- Replace Method(s) With View: trocar procedure/função por view. [s.477-480]
- Replace View With Method(s): trocar view por procedure/função. [s.481-485]
- Use Official Data Source: usar a fonte oficial de uma entidade. [s.486-490]
Relevância: database-and-migrations-expert: ALTA, taxonomia de categorias (arquitetural) para o catálogo.
Decisão sugerida: usar em database-and-migrations-expert (references/catalogo-refatoracoes).

---

### Add CRUD Methods (s.416-422; impr. 232-235)
Resumo: introduz quatro stored procedures (create, read, update, delete) para uma entidade de negócio; depois o acesso às tabelas fonte fica restrito a elas e a administradores.
Conceitos e regras:
- Motivações: encapsular o acesso a dados (o livro diz que é menos eficaz que frameworks de persistência); desacoplar aplicação das tabelas (mudar tabelas sem mudar código de aplicação); implementar controle de acesso por entidade (SAC), útil quando a entidade vive em várias tabelas e o SAC por tabela/coluna fica complicado. [s.416-417, impr. 232-233]
- Benefício central: refatorações de esquema posteriores (Rename Table, Move Column, Split Column) exigem alterar só os métodos CRUD, desde que nenhum outro programa acesse as tabelas diretamente. [s.417, impr. 233]
- Trade-offs: métodos são específicos de fornecedor (Oracle não é facilmente portável para Sybase); sem garantia de portabilidade entre versões do mesmo produto (aumenta custo de upgrade); falta de flexibilidade (acessar parte da entidade, ou dados que cruzam entidades para relatórios; alternativa: Add Read Method). [s.417]
- Passos: (1) identificar a entidade e os dados fonte; (2) escrever ao menos 4 procedures (criar, ler pela chave primária, atualizar, excluir); leituras por outros critérios via Add Read Method; (3) testar as procedures, com abordagem TDD. [s.417-418, impr. 234-235]
- Convenção de nomes: usar um padrão único (CreateCustomer/ReadCustomer/UpdateCustomer/DeleteCustomer ou CustomerCreate/...), "escolha um e mantenha". [s.421]
- Dados: nada a migrar. [s.422]
- Programas: achar todos os pontos que usam a entidade e trocar SQL embutido por chamada à procedure; pode ser preciso aplicar para várias entidades ao mesmo tempo (potencialmente mudança grande); programas podem precisar de subconjuntos diferentes dos dados. [s.422, impr. 236]
- Específico de Oracle no exemplo: package com REF CURSOR, `prepareCall` com `OracleTypes.CURSOR`. `[fora do livro]` em PostgreSQL seriam funções/procedures; em MySQL stored procedures; o livro não trata.
Citações curtas de prova:
- "Choose one approach and stick to it." [s.421, impr. 234]
O que este trecho NÃO diz: não compara com ORM/repositórios além da menção a frameworks de persistência; não trata versionamento de procedures nem transition period para esta refatoração (não há prazo de remoção, pois não se remove nada).
Relevância: database-and-migrations-expert: MÉDIA, camada de encapsulamento que facilita refatorar esquema depois; trade-offs claros.
Decisão sugerida: usar em database-and-migrations-expert (catálogo e seção "isolar acesso antes de refatorar").

---

### Add Mirror Table (s.423-435; impr. 236-240)
Resumo: cria em outro banco uma cópia exata de uma tabela, mantida por uma estratégia de sincronização.
Conceitos e regras:
- Motivações: melhorar desempenho de consulta (tabela remota lenta, cópia local); criar dado redundante para reduzir dependência de outros bancos quando caem ou entram em manutenção; substituir leituras redundantes à base remota por uma réplica local. [s.423, impr. 236]
- Risco principal: dado obsoleto (stale), pois fonte ou espelho podem ser atualizados; cresce com mais espelhos; exige estratégia de sincronização. [s.424, impr. 237]
- Passos de esquema: (1) decidir a localização; (2) criar a tabela espelho (CREATE TABLE); (3) escolher estratégia de sincronização (tempo real quando usuários precisam de dado atualizado); (4) se permitir atualização no espelho, prover sincronização do espelho para a origem (espelho atualizável = peer-to-peer ou master/slave, conforme o texto). [s.424]
- Dados: copiar inicialmente todos os dados relevantes e depois aplicar a estratégia. [s.425]
- Três estratégias de sincronização: (1) refresh periódico por job agendado, que deve lidar com mudanças nas duas tabelas e atualizar nos dois sentidos; melhor para data warehouses/data marts; (2) replicação do banco (multimaster); recomenda-se usar o recurso do produto em vez de solução própria quando existir; (3) triggers nas duas tabelas, com lógica própria, útil para objetos complexos, com custo de escrever todos os triggers. [s.426, impr. 238]
- Programas: apontar as consultas para o banco local em vez do remoto; pode-se ter propriedades de conexão alternativas. [s.435, impr. 239-240]
- Específico de produto: `COMMENT ON` para marcar a tabela como espelho; triggers Oracle. `[fora do livro]` em PostgreSQL, replicação lógica/foreign data wrappers; em MySQL, replicação nativa; o livro não trata.
Citações curtas de prova:
- "it is advisable to use this feature over using custom-coded solutions" [s.426, impr. 238]
O que este trecho NÃO diz: não trata resolução de conflitos de escrita bilateral nem atraso de replicação com números; não define como detectar dado obsoleto.
Relevância: database-and-migrations-expert: BAIXA/MÉDIA, relevante só para cenários multi-banco e cuidados com sistemas externos.
Decisão sugerida: usar em database-and-migrations-expert (catálogo, linha curta, foco em stale data e preferir replicação nativa).

---

### Add Read Method (s.436-440; impr. 240-242)
Resumo: cria stored procedure para ler zero ou mais entidades segundo critérios definidos, substituindo SELECTs espalhados.
Conceitos e regras:
- Motivação: encapsular a lógica de recuperação e padronizar a busca por entidade. [s.436]
- Aplicada para apoiar Introduce Soft Delete e Introduce Hard Delete: como a forma de excluir muda, encapsular a leitura em procedure permite ajustar o filtro em um único lugar. [s.436, impr. 240]
- Trade-offs: procedures dependem de fornecedor (menos portabilidade) e podem piorar o desempenho se mal escritas; em conjunto com Add CRUD Methods facilita refatorar o esquema. [s.437, impr. 241]
- Passos: (1) identificar os dados (podem vir de várias tabelas); (2) identificar os critérios (podem ou não envolver a chave primária); (3) escrever e testar a procedure; recomenda suíte de regressão "100 por cento" para stored procedures e TDD. [s.437, impr. 241]
- Dados: nada a migrar. Programas: achar todos os pontos de leitura e trocar por chamada; pode ser preciso aplicar várias vezes, uma para cada conjunto de dados que os programas precisam. [s.440, impr. 243]
Citações curtas de prova:
- "We are firm believers in writing a full, 100 percent regression test suite for your stored procedures." [s.437, impr. 241]
O que este trecho NÃO diz: não define como medir a cobertura de 100% nem ferramentas de teste.
Relevância: database-and-migrations-expert: MÉDIA, testes de procedures e encapsulamento de leitura antes de mudar semântica de exclusão.
Decisão sugerida: usar em database-and-migrations-expert (testes de banco, catálogo).

---

### Encapsulate Table With View (s.441-442; impr. 243-244)
Resumo: renomeia a tabela existente e cria uma view com o nome original, de modo que programas continuem funcionando sem mudança.
Conceitos e regras:
- Duas motivações: (1) criar uma fachada em torno de tabela que será refatorada depois (ex.: antes de Rename Column ou Drop Column), reduzindo o acoplamento direto; (2) implementar estratégia de controle de acesso: restringir a tabela e conceder acesso a uma ou mais views. [s.441, impr. 243]
- Limite: só funciona se o banco oferecer o mesmo nível de acesso por view que por tabela; se a tabela é atualizada por programas externos, o banco precisa suportar views atualizáveis; senão, usar Add CRUD Methods. [s.441, impr. 243]
- Passos de esquema: (1) renomear a tabela (ex.: Customer para TCustomer) com `ALTER TABLE ... RENAME TO`; se o produto não suportar, criar nova tabela, copiar dados e eliminar a original (ver Rename Table); (2) criar a view com o nome original selecionando da tabela renomeada. [s.442, impr. 244]
- Dados: nada a migrar. Programas: nenhuma mudança, pois a view tem a mesma estrutura. [s.442]
- Observação de uso: Introduce Soft Delete (s.399), Use Official Data Source (s.489) e Introduce Read-Only Table (s.455) citam esta refatoração como técnica de apoio.
- `[fora do livro]` em PostgreSQL e MySQL `ALTER TABLE ... RENAME TO` existe (PostgreSQL) / `RENAME TABLE` (MySQL); views simples são atualizáveis em ambos, com condições; o livro não trata.
Citações curtas de prova:
- "From the point of view of the external programs that access the table, nothing has really changed." [s.442, impr. 244]
O que este trecho NÃO diz: não menciona riscos de planos de execução, permissões herdadas, triggers/FKs apontando para a tabela renomeada, nem o impacto em bloqueios durante o RENAME.
Relevância: database-and-migrations-expert: ALTA, técnica de passo preparatório antes de renomear/remover colunas, compatível com expand-contract.
Decisão sugerida: usar em database-and-migrations-expert (receita "fachada por view antes de refatorar").

---

### Introduce Calculation Method (s.443-446; impr. 245-248)
Resumo: cria uma função no banco que implementa um cálculo sobre dados armazenados, reutilizável por aplicações e procedures.
Conceitos e regras:
- Motivações: melhorar desempenho (calcular perto dos dados e devolver só a resposta, sem trafegar dados pela rede); ter cálculo comum e reutilizável; apoiar Introduce Calculated Column; substituir uma coluna calculada (depois remover a coluna com Drop Column). [s.443, impr. 245]
- Trade-off: lógica demais no banco pode virar gargalo de desempenho se ele não foi arquitetado para a carga; garantir escalabilidade ou limitar a funcionalidade. [s.444, impr. 247]
- Passos: escrever e testar a função; refatorar procedures existentes que implementavam a lógica para chamá-la. [s.444]
- Dados: nada. Programas: achar onde o cálculo é implementado e trocar por chamada. Podem existir implementações ligeiramente diferentes (regra mudou com o tempo sem atualizar a aplicação, ou há razão válida); é preciso negociar mudanças com as partes interessadas. [s.446, impr. 248]
Citações curtas de prova:
- "you need to negotiate any changes with the appropriate project stakeholders" [s.446, impr. 248]
O que este trecho NÃO diz: não aborda determinismo/volatilidade de funções nem uso de funções em consultas (impacto em índices).
Relevância: database-and-migrations-expert: BAIXA, mais sobre lógica no banco que sobre migração; o alerta de divergência entre implementações é útil.
Decisão sugerida: usar em database-and-migrations-expert (catálogo, linha curta).

---

### Introduce Index (s.447-453; impr. 249-251)
Resumo: cria índice único ou não único para melhorar leituras, ou para suportar chave primária/estrangeira em Consolidate Key Strategy.
Conceitos e regras:
- Motivação: ganhar desempenho de leitura; também criar chave primária ou apoiar FK ao aplicar Consolidate Key Strategy. [s.447, impr. 249]
- Trade-offs: índices demais pioram update/insert/delete; um índice único pode ser impossível porque os dados existentes têm duplicatas, e elas precisam ser removidas antes. [s.447]
- Passos de esquema: (1) decidir tipo (único x não único), conforme regras de negócio (SSN e número de cliente podem ser únicos; telefone provavelmente não); (2) criar o índice (CREATE INDEX); (3) prover mais espaço em disco. [s.447-448, impr. 249-250]
- Dados: não há migração, mas é preciso verificar duplicatas antes de criar índice único (consulta com GROUP BY ... HAVING COUNT > 1); duplicatas devem ser corrigidas (o livro usa tabela temporária e Update Data) ou optar por índice não único. [s.448-450, impr. 250]
- Programas: (1) analisar dependências; (2) programas devem tratar as exceções lançadas pelo banco em caso de valores duplicados; (3) alterar consultas para usar o índice, inclusive com hints em produtos que permitem (exemplo Oracle `/*+ INDEX(...) */`). [s.452, impr. 251]
- O exemplo do livro nomeia o índice único `Customer_Name_UNQ` sobre SocialSecurityNumber (inconsistência de nome no exemplo; observado, não corrigido).
- `[fora do livro]` em PostgreSQL/MySQL, criar índice em tabela grande pode bloquear escrita, e há opções de criação concorrente em PostgreSQL; o livro não trata isso. Hints de índice são específicos de produto.
Citações curtas de prova:
- "Too many indexes on a table will degrade performance when you update, insert into, or delete from the table." [s.447, impr. 249]
O que este trecho NÃO diz: não trata criação online/concorrente, bloqueios, índices parciais/compostos, ordem de colunas, nem como decidir quais índices criar (análise de planos).
Relevância: database-and-migrations-expert: MÉDIA, a regra "verificar duplicatas antes de índice único" e "apps devem tratar exceções de violação" é concreta.
Decisão sugerida: usar em database-and-migrations-expert (checklist de índice único).

---

### Introduce Read-Only Table (s.453-469; impr. 251-257)
Resumo: cria tabela somente leitura derivada de tabelas existentes, populada em tempo real ou em lote.
Conceitos e regras:
- Motivações: desempenho (evitar joins lentos); sumarizar dados para relatórios; criar redundância local de fontes remotas; substituir leituras repetidas (ou usar view nova, Introduce View); segurança (usuários consultam mas não alteram); legibilidade de bancos muito normalizados (tabelas desnormalizadas comuns facilitam a navegação). [s.453-454, impr. 251-252]
- Risco principal: dado obsoleto; usuários precisam entender a atualidade da cópia e a volatilidade da fonte. [s.454, impr. 253]
- Passos: criar a tabela (estrutura decidida de antemão); escolher estratégia de população: tempo real quando usuários exigem dado atual, o join é simples e a tabela resultante é pequena; lote quando o tempo real não serve. [s.454, impr. 252-253]
- Como impor somente leitura (4 formas): confiar nos desenvolvedores e marcar por comentário; triggers que lançam erro em insert/update/delete; restringir via controle de acesso; Encapsulate Table With View com view somente leitura. [s.455, impr. 254]
- Estratégias de população (4): (1) refresh periódico por job (total ou incremental; o tempo de refresh deve ser menor que o intervalo; adequado a data warehouse onde dado obsoleto é tolerável); (2) materialized views (o banco mantém; limite: quando o SQL da view é complexo, o produto tende a não suportar sincronização automática); (3) triggers nas tabelas fonte (sincronização em uma só direção); (4) atualização em tempo real pela aplicação (só funciona se todas as aplicações que escrevem são conhecidas; risco de escrever duas vezes e gerar duplicação e bugs). [s.455-456, impr. 254-255]
- Dados: copiar inicialmente os dados fonte e depois aplicar a estratégia. [s.456]
- Programas: usar a nova tabela somente para leitura; se for integração com outra aplicação, mantê-la atualizada; trocar acessos às tabelas fonte pelo novo; exibir ao usuário a coluna LastUpdatedTime; se relatórios em lote exigirem dado atual, o job precisa antes atualizar a tabela e depois rodar o relatório. [s.469, impr. 257]
- Específico de produto: materialized views (Oracle, também em PostgreSQL `[fora do livro]`; MySQL não tem nativo `[fora do livro]`).
Citações curtas de prova:
- "The primary challenge with introducing a read-only table is "stale data,"" [s.454, impr. 253] (aspas do original; trecho com aspas internas, abreviado)
O que este trecho NÃO diz: não dá limites numéricos de atraso aceitável; não trata consistência entre refresh parcial e leitores concorrentes.
Relevância: database-and-migrations-expert: MÉDIA, trade-off de desnormalização/derivação e estratégias de sincronização, útil para "tabelas derivadas".
Decisão sugerida: usar em database-and-migrations-expert (catálogo e nota sobre dado obsoleto).

---

### Migrate Method From Database (s.470-473; impr. 257-260)
Resumo: move um método (procedure, função ou trigger) do banco para as aplicações que o chamam.
Conceitos e regras:
- Motivações (4): suportar variação (a lógica já não é igual entre aplicações); portabilidade (linguagens de método são específicas do fornecedor); escalabilidade (escalar por servidores de aplicação em vez do banco, se o método é gargalo); manutenibilidade (ferramentas de Java/C#/VB mais sofisticadas e menos exigência de habilidades combinadas). [s.470-471, impr. 257-259]
- Trade-offs: menor reuso (banco relacional é um "mínimo denominador comum" acessível por qualquer tecnologia) e possível queda de desempenho se o método processa muitos dados que teriam de ser transmitidos. [s.471, impr. 259]
- Passos de esquema: marcar o método para remoção e removê-lo fisicamente depois do período de transição (exemplo: data de remoção em 2 dez 2007). Nesse exemplo, a decisão foi tomada porque só uma aplicação usava a lógica, o tráfego de rede seria o mesmo e se queria manutenibilidade. [s.470-472]
- Dados: nada. Programas: desenvolver e testar o método na aplicação; buscar no código as invocações do método e trocar pela chamada nova; o nome pode mudar para seguir a convenção da linguagem. [s.472]
Citações curtas de prova:
- "Relational databases are a lowest common denominator technology." [s.471, impr. 259]
O que este trecho NÃO diz: não explica como detectar chamadores desconhecidos (relatórios, scripts, outros sistemas) antes de remover.
Relevância: database-and-migrations-expert: MÉDIA, exemplo de transition period aplicado a métodos (marcar, esperar, remover).
Decisão sugerida: usar em database-and-migrations-expert (catálogo; padrão de transição).

---

### Migrate Method To Database (s.474-477; impr. 261-265)
Resumo: leva lógica implementada em aplicações para o banco como stored procedure.
Conceitos e regras:
- Motivações (3): reuso (qualquer tecnologia acessa o banco); escalabilidade (se a arquitetura corporativa escala pelo banco/grid); desempenho (processamento próximo aos dados, menos dados na rede). [s.474-475, impr. 261-263]
- Trade-off: menor portabilidade; o livro diz que isso é "exagerado por puristas", pois trocar de fornecedor é raro. [s.475, impr. 263]
- Passos de esquema: desenvolver e testar a procedure; no exemplo, duas aplicações com nomes diferentes (IdentifyDefaultedCustomers e ListCustomersThatDefaulted) são substituídas por GetDefaultedCustomers no banco; as versões antigas têm data de remoção. [s.475]
- Dados: nada. Programas: remover a lógica das aplicações e invocar a procedure; o jeito mais fácil é chamar a procedure de dentro do método existente da aplicação. [s.475]
- Armadilha: aplicações podem ter implementado a lógica de modos diferentes (nomes, decomposição, ou regras desatualizadas/validamente diferentes, ex.: dias de férias por país/estado/cidade). Decidir entre deixar as versões como estão, corrigir as das aplicações ou escrever a(s) procedure(s) com a versão correta. [s.476, impr. 263]
Citações curtas de prova:
- "This problem is often overblown by purists" [s.475, impr. 263]
O que este trecho NÃO diz: não trata versionamento de procedures nem testes de equivalência entre implementações antigas e nova.
Relevância: database-and-migrations-expert: BAIXA/MÉDIA, a lição sobre implementações divergentes vale para unificar lógica.
Decisão sugerida: usar em database-and-migrations-expert (catálogo, linha curta).

---

### Replace Method(s) With View (s.477-480; impr. 265-268)
Resumo: cria uma view baseada em métodos existentes e, após o período de transição, remove as procedures.
Conceitos e regras:
- Motivações (3): facilidade de uso (ferramentas de relatório trabalham melhor com views); menor manutenção (views são mais fáceis de manter, segundo "muitas pessoas"); portabilidade (views podem seguir SQL padrão). [s.477, impr. 265]
- Trade-offs: só se aplica a métodos simples que uma view consiga expressar; reduz flexibilidade arquitetural; se o banco não suporta views atualizáveis, só se substituem métodos de leitura; desempenho e escalabilidade raramente mudam, pois o trabalho continua no banco. [s.478, impr. 267]
- Passos de esquema: criar a view (Introduce View), marcar o método para remoção, removê-lo após o período de transição com `DROP PROCEDURE` (exemplo com data de remoção 14 jun 2007; o comando de remoção fica comentado com "rode depois da data"). [s.478-480]
- Dados: nada. Programas: trocar chamadas da procedure por SELECT na view; os códigos de erro do banco mudam, então pode ser preciso retrabalhar o tratamento de erro. [s.480, impr. 268]
Citações curtas de prova:
- "The error codes thrown by the database will change when using a view" [s.480, impr. 268]
O que este trecho NÃO diz: não trata parametrização (view não recebe parâmetros) além do filtro WHERE no exemplo.
Relevância: database-and-migrations-expert: MÉDIA, exemplo do ciclo "criar novo, marcar com data de remoção, remover após transição", e atenção a mudança de códigos de erro.
Decisão sugerida: usar em database-and-migrations-expert (catálogo; exemplo de deprecação com data).

---

### Replace View With Method(s) (s.481-485; impr. 269-271)
Resumo: substitui uma view por procedure/função (ou triggers), para suportar lógica mais complexa ou atualização.
Conceitos e regras:
- Motivações (2): métodos permitem lógica mais complexa que views; métodos podem atualizar tabelas, enquanto alguns bancos não suportam views atualizáveis ou limitam a uma tabela. [s.481, impr. 269]
- Trade-offs: ferramentas de relatório costumam não funcionar bem com métodos; menor portabilidade; manutenibilidade pode cair (preferência pessoal); desempenho e escalabilidade raramente mudam. [s.481]
- Passos: introduzir os métodos; marcar a view para remoção; remover depois do período de transição com Drop View (exemplo: data 14 mar 2007). [s.481-484, impr. 270]
- Dados: nada. Programas: mudar para os métodos; códigos de erro mudam. [s.484-485]
Citações curtas de prova:
- "methods can update data tables" [s.481, impr. 269]
O que este trecho NÃO diz: não aborda permissões/GRANTs na troca.
Relevância: database-and-migrations-expert: BAIXA, simétrica à anterior.
Decisão sugerida: usar em database-and-migrations-expert (junto com Replace Method(s) With View, em uma linha).

---

### Use Official Data Source (s.486-490; impr. 271-276)
Resumo: passa a usar a fonte oficial de uma entidade (ex.: banco de CRM) em vez de uma cópia local, por acesso direto ou por replicação.
Conceitos e regras:
- Motivação: usar a versão correta do dado; dados em vários lugares geram risco de inconsistência e indisponibilidade; exemplo: aplicação grava novo cliente que não chega ao CRM e outras aplicações não o veem. [s.486-487, impr. 271-272]
- Trade-offs: custo de refatorar todas as referências à tabela local; se a estratégia de chave da fonte oficial difere, aplicar antes Consolidate Key Strategy; semântica e atualidade podem diferir, exigindo Apply Standard Codes, Apply Standard Type e Introduce Common Format. [s.487-488, impr. 272-273]
- Passos de esquema (5): (1) identificar a fonte oficial (pode estar fora do seu controle e pode haver várias; negociar com stakeholders e donos da fonte); (2) escolher a estratégia: acesso direto ou replicação (a replicação escala melhor quando a fonte está em outro banco, pois a aplicação fica acoplada a um só banco); (3) acesso direto: pode exigir outra conexão, serviço web ou transação, e a aplicação precisa lidar com transações entre bancos distintos; (4) replicação: replicar as tabelas necessárias; tabelas atualizáveis exigem multimaster; não deve ser preciso mudar a aplicação se esquema e semântica forem iguais; (5) remover tabelas locais que não são mais usadas com Drop Table (no acesso direto). [s.488-489, impr. 273-274]
- Dados: nada a migrar se a semântica for igual; se não for, considerar desistir da refatoração, replicar convertendo valores nos dois sentidos, ou adaptar as aplicações à semântica oficial; sem semântica parecida, a replicação provavelmente não funciona. [s.489, impr. 274]
- Programas: acesso direto troca a conexão (exemplo: usar conexão crmDB); com replicação, criar scripts de replicação; se o esquema local difere, ou se adota o esquema oficial ou se converte dados nos dois sentidos (difícil, mapeamentos raramente um para um), ou substitui-se as tabelas locais pelas oficiais com Encapsulate Table With View para manter o "esquema antigo", com a mesma lógica de conversão nas views. [s.489, impr. 274]
Citações curtas de prova:
- "you must be able to handle transactions across different databases" [s.488, impr. 274]
O que este trecho NÃO diz: não trata consistência eventual ou compensações (saga); não fala de APIs como alternativa a acesso direto a outro banco, além de "web service".
Relevância: database-and-migrations-expert: MÉDIA, cuidados com sistemas externos e fonte única da verdade; alerta de que a conversão bidirecional raramente funciona.
Decisão sugerida: usar em database-and-migrations-expert (cuidados com sistemas externos, catálogo).

---

### Cap. 10, Method Refactorings, abertura e Interface Changing (s.491-492; impr. 277-279) [continua no próximo bloco]
Resumo: o capítulo trata de refatorações de código em stored procedures, funções e triggers (chamados "methods"). O livro remete ao livro Refactoring (Fowler 1999) para descrições detalhadas. Dividem-se em refatorações que mudam a interface (exigem refatorar programas externos) e as que mudam só o interior do método (não exigem).
Conceitos e regras:
- Duas categorias: as que mudam a interface oferecida a programas externos (ex.: Add Parameter) e as que modificam só o interior (ex.: Consolidate Conditional Expression). A distinção importa porque só as primeiras exigem refatorar programas externos. [s.491, impr. 277]
- Toda refatoração que muda a interface inclui um período de transição; parte da refatoração é retrabalhar a versão original para invocar a nova, e depois do período a versão antiga é removida (o texto diz "invoked accordingly"; a frase é ambígua na extração). [s.491, impr. 277]
- Add Parameter: adiciona parâmetro a método existente (ex.: MiddleName como terceiro parâmetro de ReadCustomer). O mais seguro é adicionar ao final da lista, para não arriscar reordenar errado nas invocações; se a ordem depois parecer errada, usar Reorder Parameters. Mantém-se a assinatura antiga durante a transição, com data de remoção (14 jun 2007 no exemplo). [s.492, impr. 278]
- Parameterize Method: quando vários métodos fazem basicamente o mesmo (ex.: GetAmericanCustomers/GetCanadianCustomers/GetBrazilianCustomers), substituí-los por um único com parâmetro (GetCustomerByCountry); menos código, fácil acrescentar países. [s.492, impr. 278]
Citações curtas de prova:
- "refactorings that change the interface will require external programs to be refactored" [s.491, impr. 277]
O que este trecho NÃO diz: o bloco termina após Parameterize Method (ver figura 10.1 truncada); o restante do catálogo de método fica para o próximo bloco. As figuras (diagramas UML) não têm texto além das legendas.
Relevância: database-and-migrations-expert: ALTA, regra de que mudança de interface precisa de período de transição com versão antiga delegando à nova; adicionar parâmetro no fim.
Decisão sugerida: usar em database-and-migrations-expert (transition period para procedures).

---

## Candidatos a regra (procedimentos, critérios e armadilhas aplicáveis por um agente)

1. Fachada por view antes de refatorar esquema: renomear a tabela e criar view com o nome antigo; programas não mudam. Só vale se o banco tem views atualizáveis; senão usar métodos CRUD. "From the point of view of the external programs that access the table, nothing has really changed." [s.442]
2. Cada refatoração é descrita em três frentes: esquema, migração de dados e atualização de programas de acesso. Um plano de migração deve cobrir as três. [s.416-422 etc.]
3. Refatorações com mudança de interface (inclusive métodos) têm período de transição: manter a antiga marcada com data de remoção, delegando à nova, e só remover após o prazo. Exemplos com datas de drop (Add Parameter, Replace Method(s) With View, Replace View With Method(s), Migrate Method From/To Database). [s.470, s.477, s.481, s.491-492]
4. Adicionar parâmetro: acrescentar no fim da lista para evitar reordenação incorreta nas invocações; usar overload/versão antiga durante a transição. "The safest way to add a parameter is to add it to the end of parameter list" [s.492]
5. Índice único: antes de criar, consultar duplicatas (GROUP BY ... HAVING COUNT > 1), corrigir ou optar por índice não único; programas devem tratar exceções por violação; planejar espaço em disco; índices demais pioram escrita. [s.447-452]
6. Soft delete: marcar dados existentes com valor default em lote; todo SELECT filtra a marca; todo DELETE vira UPDATE; para evitar mudar todas as consultas, usar view ou método de leitura (ou trigger que bloqueia o delete). [s.399]
7. Encapsular leitura/exclusão em procedure ou view antes de mudar a semântica de exclusão, para alterar o filtro em um único lugar. "it is much easier to implement these two refactorings because the requisite retrieval logic only needs to be reworked in one place" (paráfrase do texto em s.436; não é citação literal).
8. Cópias de dados (espelho, tabela somente leitura): o risco central é dado obsoleto; escolher sincronização conforme a necessidade de atualidade; preferir replicação nativa do produto a solução própria; mostrar ao usuário LastUpdatedTime; refresh deve terminar antes do próximo intervalo. [s.424, s.426, s.454-456, s.469]
9. Fonte oficial única: se a semântica difere, conversão bidirecional "raramente é um para um"; considerar desistir, adotar a semântica oficial, ou fachada por view; acesso direto a outro banco exige tratar transações entre bancos. [s.488-489]
10. Mover lógica entre banco e aplicação: antes de unificar, comparar as implementações divergentes (regras antigas, variações por região) e decidir explicitamente qual versão vale, negociando com stakeholders. [s.446, s.476]
11. Testes de banco: stored procedures com suíte de regressão completa, preferencialmente TDD (escrever teste antes do código da procedure). "We are firm believers in writing a full, 100 percent regression test suite for your stored procedures." [s.437]
12. Trocar procedure por view (ou o contrário) muda os códigos de erro do banco; retrabalhar o tratamento de erro nos programas. [s.480, s.484]
13. Auditoria por trigger: decidir ações e colunas, uma tabela de histórico por tabela (tabela única não escala), tratar NULL na comparação, fornecer contexto de usuário às aplicações, e remover a geração de histórico que a aplicação já fazia. [s.402-414]

## Checklist de cobertura
- Primeira seção lida: 399
- Última seção lida: 492
- Seções sem texto útil ou ilegíveis: s.400, 403, 413 são só cabeçalhos repetidos ("CHAPTER 8" etc.); s.406-411, 427-435, 438-439, 457-468, 478-479, 482-483 são fragmentos de código (SQL/PL-SQL) quebrados em várias seções.
- Problemas de extração observados: o código aparece fragmentado em muitas seções pequenas, com títulos de rodapé/cabeçalho ("Introduce Trigger For History", "Add Mirror Table") intercalados no meio das frases e rótulos de margem; pequenas quebras de palavra (ex.: "singletable", "readonly"); aspas e travessões convertidos (“ ” ––). Figuras UML (diagramas de esquema) só vêm como rótulos soltos; seu conteúdo visual não foi lido e não é descrito. Rodapés de licença ("Prepared for ...") são ruído. Número impresso da página aparece junto aos cabeçalhos, anotado como "impr.". A figura 10.1 e Parameterize Method (fig. 10.2) estão truncadas no fim do bloco.
- Capítulos/seções cobertos integralmente: Introduce Trigger For History; todo o cap. 9 (12 refatorações: Add CRUD Methods, Add Mirror Table, Add Read Method, Encapsulate Table With View, Introduce Calculation Method, Introduce Index, Introduce Read-Only Table, Migrate Method From Database, Migrate Method To Database, Replace Method(s) With View, Replace View With Method(s), Use Official Data Source).
- Capítulos/seções que continuam em outro bloco: Introduce Soft Delete (o início, motivação e esquema, está no bloco anterior); cap. 10 Method Refactorings (apenas Add Parameter e Parameterize Method vistos; o restante continua no próximo bloco).
