# Fontes e rastreabilidade

Todas as páginas são os marcadores "PDF PAGINA N" do texto extraído dos livros. Nos livros de Martin, o número impresso no cabeçalho costuma ser cerca de 3 menor; nos demais, use a página do PDF. A prosa de Martin vem de OCR e o código dele está corrompido, então nenhuma regra desta skill depende de código dele. Citações têm no máximo 25 palavras e foram conferidas contra o texto extraído (nos trechos de Goodliffe, a extração perdeu algumas ligaduras de letras, por isso as citações evitam essas palavras).

Livros usados:
- **Martin**: Robert C. Martin, *Código Limpo* (edição em português).
- **Fowler**: Martin Fowler, *Refatoração* (edição em português, 2ª ed.).
- **Goodliffe**: Pete Goodliffe, *Como ser um programador melhor*.

## Regras atribuídas a livros

| Regra ou ponto da skill | Livro | Capítulo ou seção | Páginas (PDF) | Citação curta |
|---|---|---|---|---|
| Três leis do TDD: sem código de produção antes de um teste que falha; sem mais teste do que o necessário para falhar (não compilar é falhar); sem mais código de produção do que o necessário para passar; ciclo de cerca de trinta segundos | Martin | Cap. 9, As três leis do TDD | 125-126 | (sem citação: o texto das leis tem erro de OCR) |
| Testes e código de produção são escritos juntos, os testes poucos segundos à frente | Martin | Cap. 9 | 126 | |
| Teste sujo é equivalente ou pior que não ter teste; o custo de manter testes ruins leva ao abandono da suíte e à degradação do código | Martin | Cap. 9, Como manter os testes limpos | 126 | |
| Código de teste é tão importante quanto o de produção | Martin | Cap. 9 | 127 | "Os códigos de testes são tão importantes quanto o código de produção." |
| Testes eliminam o medo de alterar o código e habilitam a flexibilidade | Martin | Cap. 9, Os testes habilitam as "-idades" | 127 | "Se você tiver testes, não terá medo de alterar o código!" |
| Teste limpo é legível; muito dito com poucas expressões | Martin | Cap. 9, Testes limpos | 127 | "Três coisas: legibilidade, legibilidade e legibilidade." |
| Construir-operar-verificar; remover detalhes irrelevantes dos testes; linguagem de teste específica ao domínio que nasce da refatoração dos testes | Martin | Cap. 9, Testes limpos e Linguagem de testes | 129-130 | |
| Padrão duplo: o código de teste pode abrir mão de eficiência de memória e CPU, nunca de clareza | Martin | Cap. 9, Um padrão duplo | 130-132 | |
| Minimizar asserções por teste; um único conceito por função de teste (dado-quando-então) | Martin | Cap. 9, Uma confirmação por teste; Um único conceito por teste | 132-134 | "Talvez a melhor regra seja que desejamos um único conceito em cada função de teste." |
| F.I.R.S.T.: rápido, independente, repetível, autovalidado, pontual | Martin | Cap. 9, F.I.R.S.T. | 134-135 | "Quando os testes rodam devagar, você não desejará executá-los com frequência." |
| Pontualidade: testes criados imediatamente antes do código; criados depois podem fazê-lo ficar difícil de testar | Martin | Cap. 9, F.I.R.S.T. (Pontualidade) | 135 | |
| Perder o encapsulamento para testar é último recurso; primeiro buscar manter a privacidade | Martin | Cap. 10, Encapsulamento | 137 | "Perder o encapsulamento sempre é o último recurso" |
| Testes de aprendizagem: explorar uma API de terceiros com testes que a usam como o aplicativo usaria; o custo é baixo | Martin | Cap. 8, Explorando e aprendendo sobre limites | 119-121 | "Os testes de aprendizagem acabam não custando nada." |
| Testes de aprendizagem avisam quando uma nova versão do pacote muda o comportamento; definem fronteira que facilita migrar | Martin | Cap. 8 | 122 | |
| Manter a interface de terceiros dentro de uma classe própria, sem passá-la por todo o sistema | Martin | Cap. 8, Limites (exemplo da interface Map) | 119 | |
| Regra 1 do projeto simples: executar todos os testes; sistema que não pode ser testado não pode ser verificado; testabilidade leva a classes pequenas e menor acoplamento | Martin (de Kent Beck) | Cap. 12, Regra 1 | 169 | "Os sistemas que não podem ser testados não podem ser verificados." |
| Com testes é possível refatorar sem receio; após cada limpeza, rodar os testes | Martin | Cap. 12, Regras 2 a 4 | 169 | |
| T1: testar tudo que pode falhar; condições sem teste mostram insuficiência | Martin | Cap. 17, T1 | 308 | "Os testes são insuficientes enquanto houver condições que não tenham sido exploradas pelos testes" |
| T2: ferramenta de cobertura mostra lacunas (por exemplo, if e catch sem verificação) | Martin | Cap. 17, T2 | 308 | |
| T3: não pular testes triviais (valor de documentação maior que o custo) | Martin | Cap. 17, T3 | 308 | |
| T4: teste ignorado como pergunta sobre ambiguidade do requisito | Martin | Cap. 17, T4 | 308-309 | |
| T5: atenção às condições de limite | Martin | Cap. 17, T5 | 309 | |
| T6: bugs tendem a se agrupar; testar a fundo a função com bug | Martin | Cap. 17, T6 | 309 | "Bugs tendem a se reunir." |
| T7 e T8: padrões de falhas e de cobertura ajudam a diagnosticar | Martin | Cap. 17, T7 e T8 | 309 | |
| T9: teste lento deixa de ser executado | Martin | Cap. 17, T9 | 309 | "Um teste lento é um que não será rodado." |
| Testes não garantem correção de código com threads, mas reduzem o risco | Martin | Cap. 13, Teste de código com threads | 183 | |
| Não ignorar falha como caso isolado; tratar falha intermitente como questão de threads | Martin | Cap. 13 | 183 | "Não ignore falhas de sistema como se fossem casos isolados." |
| Fazer o código funcionar sem threads; isolar a lógica em classes que não conhecem threads | Martin | Cap. 13 | 183-184, 187 | |
| Código com threads portátil e ajustável: várias configurações, colaboradores artificiais, número de iterações | Martin | Cap. 13 | 184 | |
| Rodar com mais threads que processadores; rodar em diferentes plataformas, cedo e com frequência | Martin | Cap. 13 | 184-185 | |
| Forçar variações de escalonamento em teste (manual ou automatizado); não deixar em produção; se falhar após inserir, a falha já existia | Martin | Cap. 13, Altere seu código para testar e forçar falhas | 185-187 | |
| Teste que tenta expor falha de concorrência: pode exigir iterações enormes e depende de máquina, sistema operacional e JVM; Monte Carlo, plataformas finais, carga variada, ferramenta de instrumentação | Martin | Apêndice A, Teste de código multithread | 332-335 | |
| Passar muitas vezes significa código correto ou testes inadequados | Martin | Apêndice A | 334 | |
| Código autotestável: testes automatizados que verificam os próprios resultados | Fowler | Cap. 4, Importância de um código autotestável | 127 | "Garanta que os testes sejam totalmente automatizados e que verifiquem os próprios resultados." |
| Rodar testes com frequência torna o bug evidente em minutos; suíte é detector de bugs | Fowler | Cap. 4 | 127 | |
| Escrever o teste antes: pensar no que fazer, focar na interface, saber quando terminou; ciclo de teste que falha, código, refatoração; Fowler pratica e recomenda | Fowler | Cap. 4 | 128 | |
| Ver todo teste falhar ao menos uma vez, injetando falha temporária no código | Fowler | Cap. 4, Um teste inicial | 133-134 | "Sempre garanta que um teste falhará quando deve falhar." |
| Executar testes a cada poucos minutos e todos ao menos uma vez por dia | Fowler | Cap. 4 | 134 | |
| Nunca refatorar com barra vermelha; voltar ao verde desfazendo mudanças até o último ponto passando | Fowler | Cap. 4 | 135 | "Nunca refatore com uma barra vermelha" |
| Testes orientados a risco; não testar acessores simples; testes em excesso levam a escrever poucos | Fowler | Cap. 4, Acrescente outro teste | 135 | |
| Incompleto e executado vale mais que completo e não executado | Fowler | Cap. 4 | 136 | "É melhor escrever e executar testes incompletos do que não executar testes completos." |
| Padrão para testar código existente: valor esperado provisório, trocar pelo valor produzido, injetar falha, remover | Fowler | Cap. 4 | 136 | |
| Duplicação em testes é suspeita; fixture compartilhado mutável gera testes não determinísticos que dependem da ordem; usar setup que cria fixture novo; compartilhar só se imutável ou muito caro | Fowler | Cap. 4 | 136-137 | |
| Fases: configurar-exercitar-verificar (dado-quando-então, preparar-agir-verificar); fase implícita de desmontagem | Fowler | Cap. 4, Modificando o fixture | 138-139 | |
| Uma verificação por teste como regra geral, aceitando verificações intimamente ligadas | Fowler | Cap. 4 | 139 | |
| Testar limites: coleção vazia, zeros, negativos, texto vazio; pensar como inimigo do código; testes de borda levantam perguntas de domínio | Fowler | Cap. 4, Sondando os limites | 139-141 | |
| Diferença entre falha de verificação e erro (exceção em fase anterior) | Fowler | Cap. 4 | 141 | |
| Validação em fronteira externa deve ser testada; entre módulos confiáveis, validação excessiva duplica verificações; asserções já são uma forma de teste | Fowler | Cap. 4 | 141-142 | |
| Lei dos retornos decrescentes; concentrar testes onde há risco e complexidade | Fowler | Cap. 4 | 142 | |
| Testes de unidade são a espinha dorsal; existem testes de integração e outros; testabilidade é critério de arquitetura | Fowler | Cap. 4, Muito além disso | 143 | |
| Bug reportado: escrever primeiro um teste que o exponha; perguntar que lacuna ele revela; refatorar também os testes | Fowler | Cap. 4 | 143 | "Ao receber o relatório de um bug, comece escrevendo um teste de unidade que exponha o bug." |
| Cobertura só identifica código não testado, não avalia a qualidade; a medida é a confiança de que um defeito faria algum teste falhar; excesso de testes é raro | Fowler | Cap. 4 | 143-144 | "qual é o seu nível de confiança de que, caso alguém introduza um defeito no código, algum teste falhará?" |
| Refatoração não altera o comportamento observável; precisa de suíte abrangente e rápida; mudança pequena e testes frequentes localizam o erro; restaurar a última versão boa | Fowler | Cap. 2, Testes | 90-91 | |
| Refatorações automatizadas seguras como alternativa quando faltam testes; existe estilo de refatorações comprovadamente seguras para bases com pouca cobertura (não detalhado) | Fowler | Cap. 2, Testes | 91 | |
| Legado sem testes: não é seguro refatorar; difícil adicionar testes; linhas de junção (Feathers); criar junções é refatoração sem testes, risco necessário; sem atalhos | Fowler | Cap. 2, Código legado | 92 | |
| Melhorar o legado em partes, mais nas áreas visitadas com frequência | Fowler | Cap. 2, Código legado | 92-93 | |
| Ciclo TDD de quatro passos (teste que falha, implementação simples, organizar/refatorar, repetir), chamado vermelho-verde-refatorar; mantra de não escrever produção sem teste que falha | Goodliffe | Cap. 11, Quando os testes devem ser escritos | 138-139 | "não escreva nenhum código de produção a menos que você tenha um teste em falha" |
| Goodliffe não exige teste-primeiro: aceita escrever durante ou logo depois do código; quanto mais tarde, menos eficiente o teste | Goodliffe | Cap. 11 | 138-139 | "Escreva testes à medida que escrever o código em teste." |
| Bug: escrever antes um teste de unidade que falha e mostra a causa; adicioná-lo à suíte | Goodliffe | Cap. 11 e Cap. 10 | 139, 122-123 | |
| Ciclo de feedback curto; testes no menor escopo dão o feedback mais rápido; suíte automatizada como canário contra regressão | Goodliffe | Cap. 11 | 133-134 | |
| Tipos de teste (unidade isolada sem banco, rede ou arquivos; integração; sistema); testes de desenvolvimento não substituem QA exploratório | Goodliffe | Cap. 11 | 136-137, 141 | |
| Testes no processo de build para não serem ignorados; testes de integração e sistema lentos podem ficar só no servidor de CI | Goodliffe | Cap. 11, Quando executar os testes | 140-141 | |
| Testar o que é importante, inclusive requisitos de desempenho; cobertura é métrica ruim como meta | Goodliffe | Cap. 11, O que deve ser testado | 141 | "essa tende a ser uma métrica terrível para ter como meta" |
| Se a suíte não exercita uma parte, não se pode acreditar que ela funcione; usar ferramenta de cobertura | Goodliffe | Cap. 10, Teste, teste, teste | 122 | "se sua suíte de testes não exercitar essa parte, você não poderá acreditar que ela funcione" |
| Características de bom teste (conciso, mantível, rápido, atualizado, sem configuração prévia, independente, testa o código real) | Goodliffe | Cap. 11, Bons testes | 142-143 | |
| Catálogo de testes mal feitos (intermitentes, ilegíveis, longos, vários aspectos, por função em vez de comportamento, de terceiros, triviais, caixa-branca, só em uma máquina) | Goodliffe | Cap. 11 | 143-144 | |
| Preparar-agir-verificar; uma verificação alvo em teste de unidade; cada caso novo é novo método; nomes de teste como frases; testes de unidade sem duplicação | Goodliffe | Cap. 11 | 144-146 | |
| Testes por comportamento, não por método; casos normais, de falha e de limite | Goodliffe | Cap. 11, A estrutura dos testes | 145-146 | |
| Manter os testes; não comentar teste que falha por mudança de comportamento; relato de testes removidos que apontavam problema real | Goodliffe | Cap. 11, Faça a manutenção dos testes | 146-147 | "Faça a manutenção de sua suíte de testes e ouça-a quando ela falar com você." |
| Sem estado global nem singletons; colaboradores pelo construtor; interfaces mínimas; código testável tem melhor design | Goodliffe | Cap. 11, Nenhum código é uma ilha | 148-149 | "Variáveis globais e objetos singleton são um anátema do teste" |
| Dublês (dummy, stub, mock); excesso de mock é cheiro e pode indicar estrutura ruim do código testado | Goodliffe | Cap. 11 | 149-150 | |
| Testes mostram a presença de bugs, não a ausência; revisar código de teste como o de produção | Goodliffe | Cap. 11, Conclusão | 150 | |
| Em código desconhecido: ver se há testes, o que cobrem e se rodam; começar bug por um teste simples que falha | Goodliffe | Cap. 6, Testes | 86-87 | |
| Teste de uma linha que falha como teste de fumaça para provar que a suíte não está sendo ignorada | Goodliffe | Cap. 6, Teste antes | 91 | "Esse teste de fumaça (smoke test) prova que os testes não estão sendo ativamente ignorados." |
| Refatoração exige disciplina e é facilitada por suíte de testes de unidade; prova que o comportamento foi preservado | Goodliffe | Cap. 3, Refatoração (quadro) | 52 | |
| Ao ajustar código confuso: uma alteração por vez; preservar comportamento; considerar escrever antes testes que capturem comportamentos importantes; cuidado com substituir tudo (casos especiais guardam comportamento); Feathers | Goodliffe | Cap. 7, Fazendo ajustes | 100-101 | |
| Testes de unidade permitem mudar o design com segurança e forçam boa estrutura | Goodliffe | Cap. 13, Os testes moldam o design | 180 | |

## Observações sobre as fontes

- **Goodliffe e TDD.** O Cap. 11 de Goodliffe (PDF p.132-153) ensina o ciclo de teste antes (p.138-139) e o chama de vermelho-verde-refatorar, mas de forma moderada: não exige o teste antes e aceita testar durante ou logo depois do código. O Cap. 25, "Desenvolvedores orientados a testes" (p.309-315), apesar do título, não trata de testes nem de TDD: usa a analogia de aprender a dirigir para falar de competência. O bloco 06 (p.386-458) só traz uma anedota de bug de integração em que testes de unidade passavam (Cap. 33), sem regra utilizável. Por isso o ciclo vermelho-verde-refatorar nesta skill tem base em Martin (p.125), Fowler (p.128) e Goodliffe (p.138-139), e não é convenção.
- **Divergências entre fontes resolvidas por convenção da skill.** Testes triviais: Martin (T3) recomenda não pulá-los; Fowler (p.135) e Goodliffe (p.143) desaconselham testar acessores simples. Rigor do teste antes: Martin e Fowler são mais estritos, Goodliffe aceita testar durante ou logo depois. Código de terceiros: Goodliffe (p.143) dispensa testá-lo sem motivo; Martin (p.119-122) propõe testes de aprendizagem. Eles se conciliam, porque os testes de aprendizagem verificam o uso que se faz da API e a mudança de versão, e não a biblioteca inteira. Cobertura: Martin (T2) recomenda a ferramenta, Goodliffe (p.141) e Fowler (p.143-144) rejeitam a métrica como meta; a síntese é "use para achar lacunas, nunca como objetivo". Número de asserções: Martin (p.132-134) minimiza por conceito; Fowler (p.139) aceita verificações intimamente ligadas.
- **Termos que não vêm dos livros lidos.** "Teste de caracterização" e "pirâmide de testes" não aparecem nos trechos lidos; a skill usa o primeiro apenas como nome de uso corrente, marcado como convenção. "Linhas de junção" (seams) é termo de Feathers, citado por Fowler (p.92).
- **Não usado por depender de texto corrompido.** Os trechos de código de Martin (listagens dos capítulos 8, 9 e 13 e do Apêndice A) estão muito corrompidos pelo OCR; os exemplos da skill são originais.

## Convenções desta skill (sem base direta nos livros)

- Teste primeiro para comportamento novo e correção de bug; escrever na mesma mudança e forçar o vermelho quando o código já existe.
- Não escrever teste dedicado para acessor sem lógica; regra, conversão ou estado derivado já não é trivial.
- Não misturar mudança de comportamento e refatoração na mesma etapa.
- Procedimento para legado (passos 1 a 5 de `concorrencia-e-legado.md`) e uso do nome "teste de caracterização".
- Exemplo de teste de estresse com largada simultânea e a recomendação de confirmar que ele falha contra a versão sem sincronização.
- Regras para agentes de IA: nunca declarar "testes passam" sem executar; mostrar a saída; relatar o escopo; não enfraquecer teste; não "corrigir" falha intermitente com repetição ou pausa sem diagnóstico; rodar a suíte inteira antes de concluir; não testar o mock. Ancoragens em livros: ver o teste falhar (Fowler p.133-134), teste de fumaça (Goodliffe p.91), não comentar nem remover teste que falha (Goodliffe p.146-147), não ignorar falha intermitente (Martin p.183), testes autovalidados (Martin p.134).
- Exemplos em Go, Vitest/Jest e pytest (`exemplos-go-node-python.md`). O exemplo em Go foi compilado e executado com sucesso; os demais não foram executados nesta fase.

## Base externa (não lida nos PDFs desta biblioteca)

Estas referências são citadas como respaldo para as regras para agentes de IA. Não foram lidas aqui; a skill reproduz apenas a afirmação geral, sem números, métodos ou autores.

| Referência | Uso na skill |
|---|---|
| TDFlow, arXiv 2510.23761 | Sustenta que o feedback da execução de testes melhora a correção de agentes de código |
| Reflexion, arXiv 2303.11366 | Sustenta que o feedback da execução (inclusive de testes) melhora o desempenho de agentes |
| "Large Language Models Cannot Self-Correct Reasoning Yet", arXiv 2310.01798 | Sustenta que modelos de linguagem não se autocorrigem de forma confiável sem feedback externo; por isso a skill exige executar e mostrar a saída em vez de "revisar e achar certo" |
