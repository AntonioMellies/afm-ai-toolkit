# Período de transição

Molde para mudar uma estrutura que outras aplicações já usam. Tudo aqui vem do livro (*Refactoring Databases*, Ambler e Sadalage), com a seção entre colchetes, exceto o que estiver marcado `[convenção desta skill]` ou `[fora do livro]`. Exemplos de SQL em `exemplos-por-banco.md`.

## Vocabulário

- **Período de transição** (também período de depreciação): tempo em que o esquema antigo e o novo são suportados em paralelo [s.28, s.589].
- **Scaffolding**: código simples e comum (em geral triggers) que mantém os dois esquemas coerentes até a remoção [s.49].
- O livro não usa o termo "expand-contract" nem "parallel change". `[convenção desta skill]` Usamos "expandir, sincronizar, migrar, contrair" como apelido do mesmo molde.

## Quando é necessário

- Banco com várias aplicações, algumas fora do seu controle, que não serão implantadas juntas [s.28, s.48].
- Banco de uma aplicação só: refatore banco e aplicação em paralelo e implante juntos [s.28]. Mesmo assim, o time pode precisar de alguns dias de convivência no ambiente de integração para os colegas ajustarem e retestarem o código [s.48].
- Refatorações que apenas estreitam valores aceitos (constraint de coluna, códigos padrão) não exigem transição, mas podem quebrar aplicações existentes [s.49].
- Refatorações que mudam a interface de procedures também têm transição: a versão antiga fica marcada com data de remoção e a nova coexiste [s.491-496].

## Premissas durante a transição [s.49]

- Algumas aplicações usam o esquema original, outras o novo.
- Cada aplicação precisa trabalhar com um dos dois, não com os dois.
- Todas precisam continuar funcionando.

Por isso o livro não conta com cada aplicação atualizar as duas estruturas: a sincronização é do banco [s.30].

## Molde passo a passo

Cada passo cita o livro onde o padrão aparece (Move Column, Rename Column, Replace Column e outros seguem o mesmo molde).

1. **Introduzir a estrutura nova** ao lado da antiga (coluna nova, tabela nova, view nova, procedure nova) [s.162, s.174, s.210]. Mantenha-a opcional (aceitando nulo) enquanto houver escritores antigos `[convenção desta skill]`.
2. **Marcar a antiga como depreciada, com data de remoção, nos próprios objetos**: o livro registra a data em comentário de esquema na coluna ou tabela e nos triggers temporários, e nos diagramas como data de remoção [s.49, s.54-60]. A mesma data vale para o esquema original, as colunas e o trigger [s.110].
3. **Criar o scaffolding**: triggers que sincronizam os dois lados em INSERT, UPDATE e, quando fizer sentido, DELETE [s.162, s.182-190]. Regras abaixo.
4. **Migrar os dados uma vez**: copiar da estrutura antiga para a nova, em geral sem transformação. Se os dados estão sujos, aplique antes as refatorações de qualidade de dados [s.147-151, s.171, s.214].
5. **Atualizar os programas** para a estrutura nova: SQL embutido, mapeamento do ORM, relatórios, ETL [s.65, s.179-180]. O livro mostra o mapeamento do ORM em três fases: só a propriedade antiga, as duas durante a transição, só a nova.
6. **Anunciar** a refatoração e a data de remoção às outras equipes [s.68].
7. **Esperar a data.** Ao final, remover a estrutura antiga e o scaffolding num script pós-transição com o mesmo identificador da refatoração, executado em ordem [s.62, s.82].
8. **Testar a remoção antes**: remover primeiro em QA ou pré-produção, retestar tudo, depois aplicar em produção, rodar a suíte e decidir entre seguir e fazer back out [s.82].

Ensaie todo o molde em cópia do banco com backup antes de tocar em produção, e peça autorização ao usuário para qualquer DDL ou DML em produção `[convenção desta skill]`.

## Regras do trigger de sincronização

- **Sem ciclos**: a atualização que o trigger faz do outro lado não pode disparar de volta a mesma atualização [s.103, s.190, s.244].
- No exemplo do livro, o trigger trata INSERT copiando um lado para o outro só quando o outro está nulo, e UPDATE comparando o valor novo com o antigo de cada coluna e propagando a que mudou [s.103-108].
- Dispare por qualquer mudança de linha nos dois lados [s.162]. Em Rename Table por nova tabela, sincronize INSERT, UPDATE e DELETE [s.182-190].
- Defina antes as regras de inserção e de deleção do que está sendo movido (o que acontece com a linha ou o valor correspondente) e reaproveite triggers de integridade referencial que já existam [s.162].
- Observação desta skill: o trigger do exemplo de Replace Column só preenche um lado quando o outro vem nulo (s.214). Ele não propaga uma alteração posterior de um lado que já tem valor. Não use esse exemplo como molde de UPDATE.
- Quem escreve em ambos os lados na mesma instrução precisa de uma regra de precedência `[convenção desta skill]`.

## Mecanismos de sincronização [s.93-95]

| Mecanismo | A favor | Contra |
|---|---|---|
| Trigger | tempo real | pode virar gargalo de desempenho; risco de ciclos e deadlocks; costuma duplicar dados |
| View atualizável | tempo real; não move dados fisicamente | alguns bancos não suportam view atualizável nem join em view atualizável; complexidade de criar e depois remover |
| Lote periódico | impacto em horário de pouca carga | grande risco para a integridade referencial; é preciso saber o que mudou; difícil decidir qual lado vale se ambos mudaram |

Experiência dos autores: trigger na grande maioria dos casos, view às vezes, lote raramente [s.93].

## Duração

- Típica: vários trimestres, até anos; por isso automatize o máximo, porque as pessoas mudam ao longo de anos e partes manuais são um risco [s.48].
- Considere as equipes lentas: há aplicações sem desenvolvimento ativo e outras com releases anuais [s.30].
- Escolha mais simples: um período padrão por categoria (o livro dá 2 anos para estrutural e 3 para arquitetural, como exemplos) [s.96]. Custo: vale o prazo mais longo mesmo para esquema pouco acessado. Mitigue removendo cedo o que ninguém usa ou negociando prazo menor [s.96].
- Negociar caso a caso com os donos dos sistemas é possível, mas os autores nunca viram funcionar na prática e recomendam simplicidade [s.98].
- Se os programas externos não podem ser atualizados: transição muito longa, com custo de desempenho e poluição do banco, ou não refatorar [s.66].
- O livro não oferece técnica para descobrir consumidores desconhecidos antes de remover. `[convenção desta skill]` Antes de remover, procure uso real no log de consultas ou nas permissões do banco, conforme o produto, e confirme com os times.

## Variantes do molde

- **Rename Table por view**: renomear a tabela e criar uma view com o nome antigo. Só serve se o banco suporta views atualizáveis [s.189].
- **Encapsulate Table With View**: fachada para refatorar depois; os programas não mudam [s.441-442].
- **Rename View**: crie a view nova e redefina a antiga a partir dela, para não duplicar a consulta; a nova leva comentário com o nome antigo e a data de remoção [s.191-194].
- **Introduce Surrogate Key**: os triggers preenchem as colunas de chave estrangeira nas tabelas filhas durante a transição, porque as aplicações ainda não foram atualizadas [s.134].
- **Relaxar NOT NULL por tempo limitado** durante a transição de uma aplicação e restaurar depois com Make Column Non-Nullable [s.298].
- **Procedures**: sobrecarga com as duas assinaturas, a antiga com data de remoção [s.493-496]. Reordenar parâmetros de mesmo tipo não admite transição (ver `riscos-e-armadilhas.md`).
- **Adicionar parâmetro**: acrescente no fim da lista, para não arriscar reordenação errada nas chamadas [s.492].
