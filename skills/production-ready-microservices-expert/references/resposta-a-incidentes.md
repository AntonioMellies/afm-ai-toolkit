# Resposta a incidentes, runbooks e plantão

Material de apoio sobre como o livro de Susan J. Fowler organiza a resposta a incidentes e interrupções: categorização, cinco estágios, análise pós-incidente (autópsia no livro, "postmortem" aqui), roteiros de plantão (runbooks) e turnos de plantão. Páginas PDF entre parênteses; detalhes em `fontes.md`. O que não vem do livro está marcado como **convenção desta skill**.

Vocabulário: "autópsia" = postmortem; "roteiro de plantão" = runbook; "interrupção" = outage.

## Quando usar

- Definir ou revisar o processo de incidentes de um time ou de uma organização.
- Escrever um postmortem ou o runbook de um alerta.
- Montar escala de plantão ou decidir quais alertas devem existir.

## Por que importa: disponibilidade e custo de cada minuto

- Disponibilidade = tempo de funcionamento correto dividido por (funcionamento + indisponibilidade) (p.66). Cada minuto fora do ar pesa contra o SLA e costuma ter custo financeiro fácil de calcular (p.170-171).
- A notação dos noves traduz percentuais em downtime tolerado (p.67-68):

| Disponibilidade | Por ano | Por mês |
|---|---|---|
| 99% | 3,65 dias | 7,20 horas |
| 99,9% | 8,76 horas | 43,8 minutos |
| 99,99% | 52,56 minutos | 4,38 minutos |
| 99,999% | 5,26 minutos | 25,9 segundos |

- O livro usa SLA como medida; **não** define SLO nem error budget. Se usar esses termos, é convenção desta skill.
- A disponibilidade de um serviço depende da disponibilidade das dependências: o livro dá a conta como a própria disponibilidade multiplicada pela das dependências downstream (p.154).

## Categorização (p.171-173)

Nem toda falha é emergência para todos: com centenas ou milhares de serviços há dezenas ou centenas de falhas por semana (p.171).

1. **Categorize os serviços** por criticidade para o negócio. Não precisa ser perfeito no início. Serviços críticos têm prioridade máxima; os demais, menor conforme a distância dos críticos. Camadas de infraestrutura usadas por serviços críticos são sempre prioridade máxima (p.171-172). Isso também ajuda na disputa por recursos de engenharia e hardware (p.171).
2. **Categorize cada incidente em dois eixos** (p.172-173):
   - **Gravidade:** deriva da criticidade do serviço afetado e do impacto no negócio.
   - **Escopo:** alto (afeta todo o negócio ou um recurso externo, como a interface do usuário), médio (o próprio serviço ou ele e alguns clientes) ou baixo (efeitos não percebidos por clientes, negócio ou usuários externos).
   - Os exemplos do livro usam gravidade numerada, descrita como "quatro níveis (0 a 4)", sendo 0 o mais grave. O texto diz quatro níveis mas a faixa tem cinco valores; registramos como está escrito e recomendamos que cada organização defina sua própria escala e a escreva.
   - Exemplos do livro: queda total de datacenter = gravidade 0, escopo alto; serviço crítico fora por trinta minutos afetando um cliente = gravidade 0, escopo médio; ferramenta interna de geração de modelos fora por horas = gravidade 3, escopo baixo (p.173).

## Os cinco estágios da resposta (p.173-177)

O processo padrão da indústria tem três passos (triagem, mitigação, resolução). Para microsserviços, o livro acrescenta coordenação e acompanhamento (p.174).

1. **Avaliação.** O desenvolvedor de plantão que recebeu o alerta faz a triagem e define gravidade e escopo (p.174).
2. **Coordenação e comunicação.** Poucos plantonistas resolvem tudo sozinhos; envolva outras equipes e tenha canais claros de comunicação para incidentes de alta gravidade e alto escopo (p.175). Registre a comunicação do incidente por três razões: ajuda a diagnosticar (quem faz o quê, o que já foi descartado), avisa serviços dependentes para que se protejam e fornece o material do postmortem (p.175).
3. **Mitigação.** Reduzir o impacto em clientes, negócio e o que mais for afetado. "Mitigação não é o mesmo que resolução": só está mitigado quando a disponibilidade do serviço e dos clientes não está mais comprometida (p.175-176).
4. **Resolução.** Corrigir a causa raiz. O "relógio" do SLA para na mitigação: contam contra o SLA o tempo de detecção (TTD) e o de mitigação (TTM); o tempo de resolução (TTR) raramente pesa (p.176).
5. **Acompanhamento.** Escrever o postmortem, compartilhar e analisar incidentes graves e produzir uma lista de ações para devolver o serviço a um estado pronto para produção (p.176).

## Postmortem (p.176-177)

Conteúdo mínimo, agrupado:

- **Resumo e linha do tempo detalhada.**
- **Dados:** TTD, TTM, TTR, downtime total, usuários afetados, gráficos relevantes.
- **Análise:** causa raiz, como o incidente poderia ter sido evitado e como evitar interrupções parecidas.
- **Ações:** lista do que falta fazer para o serviço voltar a estar pronto para produção.

Escreva sem culpar pessoas: nomear culpados sufoca o aprendizado e o compartilhamento (p.177). Compartilhe os incidentes entre equipes; o livro viu desenvolvedores corrigirem seus próprios serviços logo após reuniões de análise (p.177).

## Alertas que sustentam a resposta (p.79, 190-194)

- Detecção é papel dos alertas; ninguém deve precisar olhar o painel para descobrir um incidente (p.190).
- Cada métrica principal gera alerta, inclusive quando a métrica deixa de ser vista (p.191).
- Três limiares por métrica: normal, advertência e crítico. O de advertência deve disparar antes da interrupção; o crítico reflete onde há dano real; todos altos o bastante para evitar ruído e baixos o bastante para pegar problema real (p.191). Sem histórico, use testes de carga para estimar (p.192).
- Alerta não acionável deve ser removido, reatribuído ou transformado em acionável. Alertar sobre dependências só se houver ação possível (p.192). "Um alerta não acionável não é um alerta útil" (p.79).
- Alerta que aparece mais de uma vez e tem mitigação simples deve ser automatizado, e o livro conclui que assim o serviço não sofre o mesmo problema duas vezes (p.194).
- Os valores numéricos do livro são só o esquema dos três níveis; limiares como "5% de erro" ou "p95 > 2 s" são ilustrações desta skill, não do livro.

## Roteiro de plantão (runbook) (p.193, 207-208)

- Todo alerta conhecido tem instruções passo a passo de triagem, mitigação e resolução, guardadas na documentação central do serviço (p.79, 193, 207).
- Dois tipos: roteiros compartilhados de servidor e infraestrutura, e roteiros específicos do serviço (p.193).
- Estrutura por alerta: nome, descrição do alerta, descrição do problema, passos de triagem/mitigação/resolução, gravidade, se indica interrupção e como comunicar (p.207-208).
- Comece o roteiro com requisitos e procedimentos gerais do plantão e inclua uma seção geral de solução de problemas e depuração para falhas inéditas (p.207-208).
- Escreva de modo que um desenvolvedor sonolento entenda de madrugada (p.208).

## Plantão (p.194-195)

- Em ecossistemas de microsserviços, os próprios desenvolvedores ficam de plantão pelos seus serviços (p.194). Equipes de confiabilidade só assumem quando o serviço é estável e confiável, o que o livro diz ser raro (p.194).
- Para evitar esgotamento: pelo menos duas pessoas por turno, turnos de no máximo uma semana, intervalos de pelo menos um mês (p.195).
- A escala é pública e fácil de achar; o procedimento de plantão é padronizado na organização e novos integrantes são orientados (p.195).

## Perguntas de verificação

- Existe categorização de serviços e de incidentes (gravidade e escopo) escrita?
- Quem avalia, quem coordena e onde fica o registro de comunicação?
- Todo alerta tem runbook? Algum alerta não acionável continua ativo?
- O último incidente grave teve postmortem sem culpados, com ações acompanhadas?
- A escala respeita o mínimo de pessoas e o intervalo entre turnos?

## Convenções desta skill (sem base no livro)

- Exigir que runbooks sejam testados (por exemplo, em exercícios) antes de confiar neles. O livro não fala em testar runbooks.
- Limiares numéricos de exemplo e qualquer uso de SLO ou error budget.
