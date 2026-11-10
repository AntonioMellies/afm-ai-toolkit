# Catálogo de refatorações

Índice por categoria das refatorações descritas no livro (*Refactoring Databases*, Ambler e Sadalage). Cada linha traz o nome do livro, o que faz, o risco principal e a seção `[s.N]`. Só entra aqui o que está no texto lido; o código do livro (Oracle, PL/SQL, Java, Hibernate) não é reproduzido.

Estrutura fixa de cada refatoração no livro: motivação, trade-offs, mecânica do esquema, mecânica da migração de dados e mecânica de atualização dos programas [s.1]. Use as três mecânicas como roteiro do seu plano.

Seis categorias [s.33]: estrutural, qualidade de dados, integridade referencial, arquitetural, de método e transformação (esta última muda a semântica; as demais não) [s.31, s.552]. O próprio livro diz que o rótulo importa menos que a utilidade prática [s.31].

## Estruturais (cap. 6) [s.102]

- **Drop Column** [s.111-116]: remove coluna. Risco: dados valiosos (preserve em tabela temporária se o negócio exigir) e demora em tabela grande. Em transição, só comente a coluna com a data e dropa depois.
- **Drop Table** [s.117-118]: remove tabela. Risco: perda de dados; não remova enquanto o dado for necessário e sem alternativa. Renomear antes de dropar é uma via; remova as FKs que apontam para a tabela.
- **Drop View** [s.119-120]: remove view. Risco: view usada para controle de acesso exige nova estratégia de segurança antes.
- **Introduce Calculated Column** [s.121-131]: coluna derivada de outras tabelas, por desempenho. Risco: sair de sincronia; o trigger é mais seguro que a lógica nas aplicações porque a regra fica num lugar [s.122]. Popule o valor inicial uma vez.
- **Introduce Surrogate Key** [s.132-140]: troca chave natural por substituta. Risco: excesso de zelo (não use onde a chave natural é estável); propagar para as tabelas filhas; manter a chave natural como alternativa única.
- **Merge Columns** [s.141-144]: junta colunas da mesma tabela. Risco: perda de precisão ou separação que tinha motivo; o uso dos dados decide.
- **Merge Tables** [s.145-160]: junta tabelas. Risco: a separação pode ser intencional (ex.: segurança); colunas novas ficam nulas para programas antigos, use default.
- **Move Column** [s.161-172]: move coluna para outra tabela existente. Risco: joins a mais; defina regras de inserção e deleção antes dos triggers. O exemplo do livro move um valor 1:1 para 1:N sem explicar a distribuição; não o use para semântica de saldo.
- **Rename Column** [s.173-180]: coluna nova, trigger, cópia, remoção; renomeie colunas de FK relacionadas.
- **Rename Table** [s.181-190]: por nova tabela com dois triggers, ou renomear e criar view com o nome antigo (só com view atualizável).
- **Rename View** [s.191-196]: view nova, antiga redefinida sobre a nova, remoção na data.
- **Replace LOB With Table** [s.197-208]: dado estruturado guardado em LOB vira tabela. Risco: custo de fatiar na escrita e remontar na leitura; LOB nulo ou vazio não gera linha.
- **Replace Column** [s.209-215]: troca coluna não chave, em geral mudando tipo ou formato. Risco: perda de informação na cópia.
- **Replace One-To-Many With Associative Table** [s.216-226]: Risco: construir demais se a associação não vai virar N para N; mais joins.
- **Replace Surrogate Key With Natural Key** [s.227-234]: inverso de Introduce Surrogate Key. Risco: mais complexidade no acesso; atualize uma tabela por vez.
- **Split Column** [s.235-242]: divide uma coluna em várias. Risco: se o uso era o mesmo, será preciso Merge Columns.
- **Split Table** [s.243-254]: divide tabela verticalmente (horizontalmente por Move Data). Exige trigger sem ciclos; na prática vira Introduce New Table, vários Move Column e talvez Introduce Index [s.89].

## Qualidade de dados (cap. 7) [s.255-257]

Problemas comuns [s.257]: constraints quebradas (dropar e reintroduzir refletindo os dados melhorados), views com valores fixos no WHERE, stored procedures acopladas aos valores, e atualização dos dados. Atualizar travando tudo dá consistência mas pode bloquear escrita com milhões de linhas; atualizar por subconjuntos mantém disponibilidade com inconsistência temporária entre linhas.

- **Add Lookup Table** [s.258-264]: tabela de consulta para uma coluna. Popule com os valores distintos, inspecione e normalize a grafia antes de criar a FK.
- **Apply Standard Codes** [s.265-269]: um conjunto padrão de códigos, uma coluna por vez. Risco: códigos embutidos em aplicações, FKs e testes.
- **Apply Standard Type** [s.270-284]: tipo consistente com colunas similares. O novo tipo deve comportar todos os dados.
- **Consolidate Key Strategy** [s.285-290]: uma estratégia de chave por entidade. Mantenha a unicidade nas chaves depreciadas; use a chave oficial nos joins.
- **Drop Column Constraint** [s.291-293]: sem dados a migrar; retire dos programas o tratamento da violação.
- **Drop Default Value** [s.295-298]: antes, as aplicações precisam informar o valor; se alguma depende do default, ajuste-a ou desista.
- **Drop Non-Nullable** [s.298-300]: relaxar NOT NULL, inclusive como passo temporário de outra refatoração; leitores passam a tratar nulo.
- **Introduce Column Constraint** [s.302-305]: CHECK em coluna existente. Rode um relatório de violações em lote fora do pico e corrija a fonte antes.
- **Introduce Common Format** [s.306-309]: formato único, uma coluna por vez. Atualize dados e geradores de teste.
- **Introduce Default Value** [s.311-314]: não corrige linhas existentes; revise código que dava significado ao nulo.
- **Make Column Non-Nullable** [s.314-319]: limpe os nulos antes; tratar as novas exceções nas aplicações.
- **Move Data** [s.321-326]: move dados entre tabelas. Risco: travar dados durante o movimento; para volume use exportação e importação.
- **Replace Type Code With Property Flags** [s.328-339]: código de tipo vira colunas booleanas, com trigger e data de remoção.

## Integridade referencial (cap. 8) [s.340]

- **Add Foreign Key Constraint** [s.342-351]: sanear antes; imediata ou diferida; nomear; índice opcional; tratar exceções.
- **Add Trigger For Calculated Column** [s.352-364]: falha do trigger derruba a transação; fonte na mesma tabela pode impedir o trigger; carga inicial por script.
- **Drop Foreign Key Constraint** [s.365-367]: troca qualidade por desempenho; cada aplicação passa a garantir a integridade.
- **Introduce Cascading Delete** [s.368-380]: risco de exclusão em massa acidental, deadlock e duplicidade com o ORM.
- **Introduce Hard Delete** [s.381-384]: apague de verdade; arquive antes para poder reverter e trate as referências.
- **Introduce Soft Delete** [s.386-401]: flag de exclusão; todo SELECT passa a filtrar e todo DELETE vira UPDATE; o livro prefere trigger a lógica na aplicação.
- **Introduce Trigger For History** [s.402-414]: auditoria no banco; custo de desempenho; uma tabela de histórico por tabela (a única não escala); contexto de usuário.

## Arquiteturais (cap. 9) [s.415]

- **Add CRUD Methods** [s.416-422]: quatro procedures por entidade; depois mudanças de esquema afetam só elas. Risco: acoplamento ao fornecedor e menos flexibilidade.
- **Add Mirror Table** [s.423-435]: cópia em outro banco. Risco: dado obsoleto; prefira a replicação nativa a solução própria.
- **Add Read Method** [s.436-440]: procedure de leitura; centraliza o filtro (útil para soft e hard delete). O livro defende regressão completa das procedures.
- **Encapsulate Table With View** [s.441-442]: renomeia a tabela e cria view com o nome antigo; só com view atualizável, senão use CRUD.
- **Introduce Calculation Method** [s.443-446]: função de cálculo no banco. Aplicações podem calcular de formas diferentes; negocie a regra.
- **Introduce Index** [s.447-453]: índices demais pioram escrita; índice único exige checar duplicatas; programas tratam a exceção.
- **Introduce Read-Only Table** [s.453-469]: tabela derivada. Risco: dado obsoleto; mostre a data da última atualização.
- **Migrate Method From Database / To Database** [s.470-477]: leva lógica entre banco e aplicação; compare implementações divergentes antes de unificar.
- **Replace Method(s) With View / Replace View With Method(s)** [s.477-485]: os códigos de erro do banco mudam.
- **Use Official Data Source** [s.486-490]: use a fonte oficial; se a semântica difere, a conversão nos dois sentidos raramente é um para um.

## De método (cap. 10) [s.491]

- Que mudam a interface [s.491-496]: Add Parameter, Parameterize Method, Remove Parameter, Rename Method, Reorder Parameters, Replace Parameter with Explicit Methods. Exigem transição com a versão antiga marcada com data.
- Internas [s.497-551]: Consolidate Conditional Expression, Decompose Conditional, Extract Method, Introduce Variable, Remove Control Flag, Remove Middle Man, Rename Parameter, Replace Literal with Table Lookup, Replace Nested Conditional with Guard Clauses, Split Temporary Variable, Substitute Algorithm. Não mudam a interface, então não pedem transição [s.497]. São refatorações de código genéricas; para o método geral, veja a skill `refactoring-expert`, se instalada. Destaque do livro: constantes de negócio em tabela lida por função, em vez de literal na procedure [s.535]; simplifique antes de trocar um algoritmo [s.551].

## Transformações (cap. 11) [s.552]

Mudam a semântica ao adicionar funcionalidade.

- **Insert Data** [s.553-558]: dados de referência. Revise consumidores que listam IDs (`NOT IN`) ou enumeram valores no código.
- **Introduce New Column** [s.559-561]: coluna anulável primeiro, preenchimento depois, e só então default, NOT NULL ou FK em passos separados. Confirme que a coluna não existe em outro lugar.
- **Introduce New Table** [s.562-564]: confira se algo equivalente já existe; muitas vezes é melhor refatorar a tabela existente.
- **Introduce View** [s.565-573]: encapsula acesso e elimina SQL duplicado; aumenta o acoplamento ao esquema.
- **Update Data** [s.574-581]: cinco perguntas antes (origem, aprovação dos interessados, quais linhas, quais colunas, dependências); atualize só e todas as linhas certas; dado de referência alterado por nome exige corrigir views e código que filtram pelo nome antigo.

## Cheiros do esquema [s.34-35]

Sinais de que vale olhar: coluna multiuso, tabela multiuso, dado redundante, tabela com colunas demais, tabela com linhas demais, colunas "inteligentes" (posições do valor codificam conceitos) e medo de mudar. Cheiro não é defeito: olhe, pense e refatore se fizer sentido [s.35].
