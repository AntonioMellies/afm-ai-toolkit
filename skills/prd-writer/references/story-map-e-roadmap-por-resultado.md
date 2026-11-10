# Story map e roadmap por resultado

Base: *Inspired*, caps. 38 (p.213-214), 22 (p.131-133), 23 (p.135-140), 28 (p.159-161), 60 (p.313-314) e 64 (p.332-334). Páginas por regra em `fontes.md`. O que não tem página é **convenção desta skill**.

## Story map

### O que o livro diz
- Origem: a frustração com o backlog plano de user stories, que é só uma lista priorizada, sem contexto. Como uma story se encaixa no todo? O que significa priorizar nessa granularidade? Que conjunto forma um marco ou release? (p.213)
- Mapa em duas dimensões. Na **horizontal**, as grandes atividades do usuário, da esquerda para a direita, na ordem em que ele as faria ou em que você as descreveria a outra pessoa. Na **vertical**, nível de detalhe progressivo: cada atividade se desdobra em tarefas do usuário, e cada tarefa recebe stories; as tarefas críticas ficam mais acima que as opcionais (p.214).
- Visão holística num olhar e decisão de onde traçar a linha entre releases, cada um com seu objetivo. Cada story ganha contexto, e o time vê como o sistema deve crescer (p.214).
- Na discovery, o mapa enquadra os protótipos e é atualizado com o feedback deles, como reflexo vivo; ao fechar a discovery, as stories do mapa vão para o backlog do produto (p.214).
- Muitos times consideram protótipo de usuário de alta fidelidade e story map as suas técnicas principais (p.214).
- Em apoio: só com uma pilha de user stories é difícil ver o conjunto e se as peças se encaixam; o protótipo mostra o conjunto (p.172).

O story map **não elimina o backlog**: substitui a lista plana como forma de pensar e priorizar, e as stories seguem para o backlog no fim da discovery. O livro não dá formato de user story, não fala de estimativa e não descreve o mapa como substituto de um documento de requisitos.

### Como montar (convenção desta skill, a partir do que o livro descreve)
1. Peça ao usuário as atividades do usuário-alvo da avaliação de oportunidade (pergunta 4), na ordem de uso, com base em observação ou entrevistas **reais**. Sem isso, deixe as colunas como *sem dado* e liste a pesquisa que falta.
2. Para cada atividade, tarefas; para cada tarefa, stories. Ponha as críticas acima das opcionais.
3. Trace a linha do primeiro release de modo que ele tenha um objetivo que mapeie para o resultado-chave do time.
4. Ligue cada coluna ao ponto do protótipo que a mostra.
5. Formato da story é livre. Se o time já usa um padrão, mantenha. Qualquer modelo sugerido por esta skill é convenção.

Exemplo de esqueleto (conteúdo ilustra a forma e deve ser substituído por dados do usuário):

```
Atividade A (ordem 1) | Atividade B (ordem 2) | Atividade C (ordem 3)
  tarefa crítica A1   |   tarefa crítica B1   |   tarefa crítica C1
  tarefa opcional A2  |   tarefa opcional B2  |
-------------------------------- linha do release 1 --------------------------
  tarefa de release 2 ...
```

## Roadmap por resultado

### O que o livro diz
- O livro define roadmap como lista priorizada de features e projetos, e diz que os roadmaps típicos são causa raiz de grande parte do desperdício e dos esforços falhos (p.128-129). O problema não é a lista de ideias, mas o documento chamado roadmap: seja qual for o aviso que se ponha, as pessoas na empresa o leem como compromisso (p.133).
- Duas verdades incômodas: pelo menos metade das ideias não funciona, e as que funcionam costumam precisar de várias iterações para entregar o valor esperado (*time to money*) (p.131-132). Roadmap como lista de soluções não sabe se cada uma resolve o problema (p.198).
- A alternativa precisa atender, pelo menos tão bem quanto o roadmap, a dois propósitos: trabalhar primeiro nos itens de maior valor de negócio e permitir compromissos de data quando necessários (p.135-136).
- Contexto para o time: visão e estratégia de produto e objetivos de negócio. O objetivo diz o que o time deve alcançar e como o resultado será medido; o time descobre a melhor forma (p.136).
- Um **roadmap por resultado** enuncia cada item como o problema de negócio a resolver, e não como a feature ou o projeto. O autor o considera essencialmente equivalente a um sistema de objetivos como o OKR: muda o formato mais que o conteúdo. O risco é pôr data em todo item, em vez de só nos que têm restrição real de data, com efeito cultural e de motivação (p.138).
- A feature entregue não encerra o trabalho: ela deve resolver o problema medido pelos resultados-chave; senão o time tenta outra abordagem (p.137).

### Como o livro propõe migrar (cap. 60)
Manter o processo de roadmap existente por seis a doze meses (o livro propõe, é conselho do autor, não medição), mas toda vez que citar um item lembrar do **resultado de negócio** que ele deve ajudar. Exemplo do livro: adicionar um meio de pagamento para aumentar a conversão; mostrar sempre a taxa de conversão atual e o resultado esperado; após o lançamento, destacar o impacto na conversão. Se foi bom, celebrar; se não, dizer que a feature foi entregue mas o resultado não foi alcançado, apontar o que se aprendeu e que há outras ideias para chegar ao resultado (p.313-314). A transição pode levar até um ano (p.314).

### Tabela de item de roadmap (convenção desta skill)

| Item | Problema de negócio | Resultado-chave | Hoje (baseline) | Meta | Data | Impacto reportado |
|---|---|---|---|---|---|---|
| texto | problema, não feature | métrica | valor medido | valor alvo | só se houver restrição real | preenchido após o lançamento |

Regras de preenchimento:
- **Hoje** e **Meta** vêm do usuário. Sem medição, *sem baseline*; não estime.
- **Data** em branco por padrão. Preencha apenas com restrição real (contrato, evento, regulação) e registre qual (p.138).
- **Impacto reportado** é preenchido depois do lançamento, com o número medido, mesmo se o resultado não veio (p.314). Um item sem impacto relatado não está concluído.
- A solução (a feature ou o protótipo) fica em campo à parte, abaixo do problema. Se o usuário só fornece a feature, pergunte o problema.

## Compromissos de data

O livro admite que às vezes é preciso comprometer uma data, e diz minimizar esses casos (p.133). Fazer isso de forma *de alta integridade* tem este sentido no livro:

- A causa raiz do sofrimento com compromissos é que eles são feitos **cedo demais**, antes de saber se dá para entregar e se o que se entrega resolve o problema do cliente (p.139).
- O combinado: o time pede um pouco de tempo de discovery para validar a solução com clientes (valor e usabilidade), engenheiros (viabilidade técnica) e stakeholders (viabilidade de negócio); depois da discovery, compromete data e entregável, e os resultados esperados (p.139-140).
- Os delivery managers são a chave para a data, porque acompanham dependências e disponibilidade do time: duas semanas de construção não valem se o time só pode começar em um mês (p.139).
- Resultado-chave que é compromisso de alta integridade é binário e deve ser marcado como tal (p.160).

Na especificação: se o usuário quer uma data para algo ainda sem validação, registre *compromisso de data antes da discovery* como risco e proponha o combinado acima. Não escreva uma data como se fosse validada.

## Sinais de time ruim que afetam a especificação (cap. 64)

Maus times colhem requisitos de vendas, clientes e stakeholders; pedem serviços por documentos; mostram protótipos aos engenheiros só no planejamento da sprint, para estimar; tratam análise de uso como opcional; comemoram quando finalmente lançam algo em vez de quando atingem impacto relevante nos resultados (p.332-334). Use como checagem do rascunho: a especificação descreve algum desses comportamentos? Reescreva.
