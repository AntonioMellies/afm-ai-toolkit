# Notas de leitura: Testing Business Ideas (Bland e Osterwalder), bloco 05, PDF p.293-365

Convenção: página citada = "PDF PAGINA N". O número impresso é PDF-16 (ex.: PDF 293 = impr. 277; PDF 348 = impr. 332). Citações literais em inglês. Parágrafos e listas em paráfrase. Este bloco é o último do livro: cobre o fim da Seção 3 (experimentos de validação: Validation Survey, Wizard of Oz, Mock Sale, Letter of Intent, Pop-Up Store, Extreme Programming Spike), a Seção 4 (Mindset: 4.1 armadilhas, 4.2 liderar, 4.3 organizar), glossário, agradecimentos, bios, anúncios e índice.

Padrão de cada cartão de experimento (repete em todos): página de abertura com definição, selos de CUSTO / FORÇA DA EVIDÊNCIA / SETUP / RUN TIME / tipo (desirability, feasibility, viability) e CAPABILITIES; página OVERVIEW com checklist Prepare, Execute, Analyze; página DETAILS com Cost, Evidence, Capabilities, Setup Time, Run Time, Requirements; página PAIRINGS com "Before" e "After" (experimentos que combinam). Os selos de custo, setup, run time e força aparecem como ícones/barras: conteúdo visual não lido (ver checklist).

---

### Pairings do Presale (continuação do cartão do bloco anterior) (PDF p.293) [continua do bloco anterior]
Resumo: página de combinações do Presale (impr. 277). Lista quais experimentos vêm antes e depois.
Conceitos e regras:
- Antes do Presale: Online Ad (p.146) para gerar demanda com anúncios segmentados; Simple Landing Page (p.260) como veículo da pré-venda; Brochure (p.194) com preço como material da pré-venda [p.293].
- Depois do Presale: Wizard of Oz (p.284) cria o valor manualmente por trás dos panos; Single Feature MVP (p.240) entrega uma única funcionalidade; Concierge (p.248) entrega o valor manualmente a quem comprou [p.293].
O que este trecho NÃO diz: não explica o Presale em si (cartão está no bloco anterior); só os pareamentos.
Relevância: hypothesis-and-experiments: MÉDIA, dá encadeamento de experimentos (antes/depois). product-discovery-assistant: BAIXA.
Decisão sugerida: usar em hypothesis-and-experiments (tabela de sequências).

---

### Validation Survey (PDF p.294-299; impr. 278-283) EXPERIMENTO DE VALIDAÇÃO (categoria incerta: o cabeçalho extraído diz "VALIDATION / call to action", mas o índice a lista em interaction prototypes, p.364; ver Problemas)
Resumo: questionário fechado aplicado a uma amostra de clientes existentes sobre um tema específico. Serve para medir se clientes ficariam desapontados sem o produto (Sean Ellis) e se indicariam (NPS), e para validar o ranking de jobs, pains e gains do Customer Profile.
Conceitos e regras:
- Definição: questionário fechado para coletar informação de uma amostra de clientes sobre um tema [p.294]. Ideal para saber se clientes ficariam desapontados sem o produto ou se indicariam outros [p.294].
- Capacidades: Product / Marketing / Research [p.294, p.298].
- Ranking de jobs, pains e gains do Customer Profile (Value Proposition Canvas): a maioria das equipes chuta o ranking em workshop; a survey checa quão perto do mundo real está. Em ferramentas de survey faz-se uma caixa com a lista e outra para o ranking do cliente [p.295].
- Inspirado na Discovery Survey (p.122): após cada ranking, incluir pergunta aberta para jobs/pains/gains que faltaram ("What job/pain/gain do you wish we would have asked you about that wasn't on this list? Why?") [p.295].
- Outros tipos de validation survey (resposta fechada a uma pergunta única): CSAT, CES (consumer effort score), brand awareness [p.295].
- Sean Ellis Test: mede desejabilidade por escassez. Pergunta única com 3 respostas: muito, um pouco ou nada desapontado. Argumenta-se que não há product/market fit até atingir 40%. Se clientes são apáticos a perder o produto, há problema de desejabilidade; não faz sentido escalar antes do fit [p.296].
- Contexto do Sean Ellis: aplicar a quem experimentou o núcleo do produto pelo menos 2 vezes nas últimas 2 semanas. Aplicar logo após a primeira experiência gera dados enviesados (ainda não usou de verdade); aplicar a quem não usa há 6 meses é provável que já tenha saído e nem responda [p.296]. O fluxo do diagrama: clientes usaram o produto? mais de uma vez? recentemente? então pergunta [p.296; diagrama parcialmente legível].
- NPS: pergunta "How likely is it that you would recommend this product to a friend or colleague?" escala 0-10; detratores 0-6, passivos 7-8, promotores 9-10 (faixas rotuladas no diagrama; os limites numéricos exatos não estão no texto extraído, ver Problemas). Fórmula: % PROMOTERS - % DETRACTORS = NPS [p.297].
- Ordem entre testes: usar o NPS depois que o cliente respondeu o Sean Ellis; o cliente precisa ter completado algo significativo antes de recomendar. Evitar escalar com base em indicações hipotéticas de quem não ficaria desapontado se o produto sumisse [p.297].
- Evidência (p.298): Sean Ellis = % desapontado; mais de 40% desapontados é o score ideal antes de se preocupar com escala (senão se perde gente tão rápido quanto se ganha). NPS/referral = % likely to refer; "mais de 0%" é considerado bom, varia por indústria, buscar benchmarks do setor; NPS é evidência mais fraca que o Sean Ellis porque é situação hipotética de indicação. Ranking jobs/pains/gains = % de acurácia comparado ao Customer Profile; mirar 80%, porque errar aqui tem efeito cascata na estratégia; evidência fraca mas passo importante antes de testes mais envolventes [p.298].
- Evidência de survey em geral é "rather weak"; sugerir que o produto poderia sumir provoca resposta melhor [p.298].
- Custo baixo (já há canal; pop-up no site ou e-mail por gatilho); setup poucas horas ou 1 dia; run time 1-3 dias para milhares de respostas com bons canais, semanas se for difícil alcançar o público [p.298].
- Requisitos: material quantitativo para o cliente reagir (situação, preço ou funcionalidade); canal para cliente existente (site, e-mail, mala direta, folheto); saber segmentar e subsegmentar para reduzir ruído [p.298].
- Pareamentos (p.299): antes: Simple Landing Page (p.260), Single Feature MVP (p.240), Wizard of Oz (p.284) entregando valor repetidamente antes de perguntar; depois: Referral Program (p.172), Discovery Survey (p.122) se scores baixos, Customer Interviews (p.106) com quem pontuou baixo.
Citações curtas de prova:
- "How disappointed would you be if you could no longer use this product?" [p.296]
- "How likely is it that you would recommend this product to a friend or colleague?" [p.297]
- "% PROMOTERS - % DETRACTORS = NPS" [p.297]
O que este trecho NÃO diz: não dá tamanho mínimo de amostra; não define os cortes de detratores/passivos no texto corrido; não explica de onde vem "80%" nem o "0%"; o "40%" é apresentado como argumento ("it can be argued"), não regra absoluta.
Relevância: hypothesis-and-experiments: ALTA, critérios numéricos de sucesso (40%, 80%, >0%) e contexto de aplicação do Sean Ellis; product-discovery-assistant: MÉDIA, medir product/market fit e validar o Customer Profile.
Decisão sugerida: usar em hypothesis-and-experiments (biblioteca de experimentos + critérios de sucesso) e product-discovery-assistant (validação de PMF).

---

### Wizard of Oz (PDF p.300-303; impr. 284-287) EXPERIMENTO DE VALIDAÇÃO / SIMULATION
Resumo: criar a experiência do cliente e entregar valor manualmente, com pessoas em vez de só tecnologia; ao contrário do Concierge, as pessoas não ficam visíveis ao cliente. Serve para aprender de primeira mão os passos de criar, capturar e entregar valor.
Conceitos e regras:
- Ideal para aprender manualmente os passos necessários; NÃO ideal para escalar produto ou negócio [p.300]. Capacidades: Design / Product / Technology / Legal / Marketing [p.300, p.302].
- "Linha na areia" para automação: se levar 15 minutos para criar o valor manualmente, perguntar: (1) quantos pedidos dá para atender manualmente por dia; (2) custo para entregar cada um (cost structure); (3) o máximo que clientes pagam (revenue streams); (4) em que volume automatizar fica mais barato. Só escalar quando o limite for ultrapassado; quem nunca o atinge deve reavaliar a estratégia [p.301].
- Checklist (p.301). Prepare: planejar os passos de criar o produto manualmente; criar quadro para rastrear pedidos e passos; testar internamente primeiro; integrar e verificar web analytics. Execute: receber pedidos; conduzir; atualizar o quadro por pedido, documentando quanto tempo cada tarefa levou; coletar satisfação por entrevistas e surveys. Analyze: revisar feedback de satisfação; revisar métricas do quadro (tempo de conclusão, onde houve atrasos, quantos compraram); usar achados para melhorar o próximo experimento e decidir onde automatizar.
- Evidência: satisfação do cliente (citações e feedback após receber o resultado; forte porque pergunta após valor entregue, não situação hipotética); nº de compras (pagamento é evidência forte mesmo com entrega manual); tempo para completar o processo (muito forte, conhecimento de primeira mão) [p.302].
- Lead time = tempo total do pedido do cliente até a entrega; cycle time = tempo trabalhando no pedido, sem o tempo ocioso na fila [p.302].
- Custo baixo se pequeno e simples; sobe se escalar ou complicar. Setup maior que outras técnicas de prototipagem rápida (planejar todos os passos e adquirir clientes). Run time de dias a semanas, geralmente mais que outras técnicas rápidas [p.302].
- Requisito: tempo (principal) e uma "cortina digital" para esconder as pessoas (comumente landing page ou interface digital onde o cliente pede e recebe) [p.302].
- Pareamentos (p.303): antes: Feature Stub (p.156) como funil, Brochure (p.194) com CTA, Simple Landing Page (p.260); depois: Mash-Up (p.244) para automatizar passos manuais com tecnologia existente, Referral Program (p.172), Crowdfunding (p.266) para financiar a automação.
Citações curtas de prova:
- "Unlike Concierge, the people involved aren't visible to the customer." [p.300]
- "Lead time is the total time measured from customer request to when the order was delivered." [p.302]
O que este trecho NÃO diz: não define um valor numérico fixo para a linha na areia (usa o exemplo de 15 minutos só como ilustração); não dá número de clientes recomendado.
Relevância: hypothesis-and-experiments: ALTA (diferença Wizard of Oz vs Concierge, métricas de evidência, pareamentos). product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments.

---

### Mock Sale (PDF p.304-309; impr. 288-293) EXPERIMENTO DE VALIDAÇÃO / SIMULATION
Resumo: apresentar uma venda do produto sem processar pagamento. Ideal para determinar diferentes pontos de preço. Inclui o case Buffer.
Conceitos e regras:
- Ideal para testar preços [p.304]. Capacidades: Design / Sales / Finance [p.304, p.306].
- Duas variações no checklist (p.305). Online com cadastro de e-mail: criar landing simples; inserir opções de preço; ao clicar numa opção, mostrar pop-up "we're not ready yet" com formulário de e-mail; verificar analytics; publicar; gerar tráfego; analisar visualizações das opções, cliques numa opção, cadastros de e-mail, abandono no funil e conversão por fonte de tráfego; usar achados para calibrar Value Proposition e preço; conexão: opções de preço vêm do revenue stream do Business Model Canvas. Varejo offline: criar protótipo físico de alta fidelidade; avisar gerentes e equipe; posicionar o protótipo na prateleira; observar e documentar quem vê, pega e põe na cesta; antes ou no momento da compra, interceptar e explicar que o produto não está disponível; coletar contato e feedback (por que pegou em vez de outros); compensar com vale-presente; analisar quantos viram, puseram na cesta, quiseram comprar, deixaram contato.
- Evidências e taxas (p.306): nº de visualizações únicas e nº de cliques de compra; taxa de conversão de compra; cadastros de e-mail após clique de compra (relativamente forte, mas menos que submissão de pagamento); submissão de dados de pagamento = evidência "very strong". Os textos de fórmula no PDF dizem "visualizações dividido por cliques" (e por e-mails, e por pagamentos), que está invertido em relação a uma taxa de conversão; ver Problemas. Cliques de compra: relativamente forte, não tanto quanto e-mail e pagamento [p.306].
- Não perguntar quanto pagariam: clientes são notoriamente ruins nisso; apresentar um ou vários preços para reagirem. Preço ridiculamente baixo gera falsos positivos em algo que você não conseguirá entregar; pensar na estrutura de custos antes [p.306].
- Setup horas a dias; run time dias ou semanas; público específico e tempo para considerar a compra [p.306]. Requisito: estratégia de preço.
- Pareamentos (p.307): antes: Online Ad (p.146), Simple Landing Page (p.260), Brochure (p.194) com preço; depois: Customer Interviews (p.106) com quem mostrou interesse, Single Feature MVP (p.240), Email Campaign (p.162).
Case Buffer (PDF p.308-309; impr. 292-293), Joel Gascoigne:
- Hipótese: pessoas pagariam mensalidade para agendar posts no Twitter. Ele precisava saber de viabilidade, não só e-mail sem preço [p.309].
- Experimento: botão "Plans and Pricing" na landing; três planos: Free = $0 (1 tweet/dia, 5 na fila), Standard = $5/mês (10/dia, 50 na fila), Max = $20/mês (ilimitado); ao escolher, aparecia cadastro de e-mail dizendo que ainda não estava pronto; analytics por opção [p.309].
- Evidência: o plano de $5/mês gerou mais cadastros que $0 e $20 [p.309]. Insight: ponto ideal de cerca de 5 tweets/dia, incômodo suficiente para pagar $5 [p.309]. Ação: construir o app, usou o aprendizado para definir preços e processou pagamentos manualmente no início [p.309]. Hoje MRR de US$1,54 milhão (dado do livro) [p.309].
Citações curtas de prova:
- "Customers are notoriously bad at answering that question." [p.306]
- "Payment info submissions are very strong evidence." [p.306]
O que este trecho NÃO diz: não dá limiar de conversão que valide um preço; não explica como escolher os preços testados além de "pensar na estrutura de custos".
Relevância: hypothesis-and-experiments: ALTA (degraus de força da evidência: clique, e-mail, pagamento; regra de não perguntar preço; case). product-discovery-assistant: MÉDIA (testar disposição a pagar).
Decisão sugerida: usar em hypothesis-and-experiments.

---

### Letter of Intent (LOI) (PDF p.310-315; impr. 294-299) EXPERIMENTO DE VALIDAÇÃO / SIMULATION
Resumo: contrato curto, simples e não vinculante. Indicado para parceiros-chave e clientes B2B; não para B2C. Inclui o case Thrive Smart Systems.
Conceitos e regras:
- Ideal para avaliar parceiros-chave e segmentos B2B; não ideal para B2C [p.310]. Capacidades: Product / Technology / Legal / Finance [p.310, p.312].
- Checklist (p.311). Prepare: definir o público (preferencialmente quem já conhece o negócio); pesquisar o formato de LOI adequado (cliente B2B vs parceiro-chave B2B); criar template. Execute: mostrar a LOI; uma pessoa conduz a conversa e outra anota citações, jobs, pains, gains e linguagem corporal. Analyze: revisar notas com o time; quantas enviadas, vistas, assinadas; fazer follow-up com quem assinou. Modelo básico de LOI (não vinculante, com campo para termos) mostrado [p.311].
- Evidência: nº de LOIs enviadas, vistas e assinadas; taxa de aceitação (o texto escreve "sent divided by signed", inverso do usual; ver Problemas). Assinatura é não vinculante, mas mais forte que as pessoas apenas dizerem que parceirariam ou comprariam. Feedback qualitativo de clientes e parceiros é fraco, bom para insights qualitativos [p.312].
- Custo baixo (1-2 páginas; template gratuito ou advogado). Setup horas a 1 dia (se envolver jurídico). Run time curto: aceitam ou não [p.312].
- Requisito: warm leads (entendimento básico da proposta de valor). Não recomendam enviar LOI por e-mail frio (conversão dismal); ter a LOI pronta em conversas agendadas, para apresentar durante ou logo depois [p.312]. Para B2B, saber falar claramente da proposta de valor e da estrutura de preços; para parceiros, descrever em detalhe a atividade ou recurso-chave [p.312].
- Pareamentos (p.313): antes: Partner & Supplier Interviews (p.114), Customer Interviews (p.106); depois: Single Feature MVP (p.240), Presales (p.274), Life-sized Prototype (p.254).
Case Thrive Smart Systems (PDF p.314-315; impr. 298-299), irrigação sem fio, Seth Bangerter e Grant Rowberry:
- Hipótese: gerar US$25.000 na fase de teste com 20 LOIs [p.315]. Experimento: pedir a clientes interessados (paisagistas) que escrevessem uma LOI com quantas unidades comprariam; depois criaram um template (letter of intent form) [p.315].
- Evidência: mais de US$50.000 em receita projetada, sem anúncios, só pedindo para preencher o formulário [p.315].
- Insight: o que as pessoas dizem que comprariam é muito maior que o que escrevem: quem disse 1000 escreveu 300; quem disse 100 escreveu 15-20; "pôr no papel" dá mais skin in the game mesmo sendo não vinculante [p.315]. Ação: refinaram em dois tipos: "pledge of purchase" (compra do produto final) e "testing agreement" (participar do beta) [p.315].
Citações curtas de prova:
- "Short, written contract that is simple to read and not legally binding." [p.310]
- "it would be poor form to cold email your LOIs" [p.312, trecho "It would be poor form to cold email your LOIs to people"]
O que este trecho NÃO diz: não dá taxa-alvo de assinatura; não indica quando a LOI "valida" a hipótese além do exemplo da Thrive (20 LOIs = $25 mil).
Relevância: hypothesis-and-experiments: ALTA (experimento B2B, regra de warm leads, discrepância declarado vs escrito). product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments.

---

### Pop-Up Store (PDF p.316-321; impr. 300-305) EXPERIMENTO DE VALIDAÇÃO / SIMULATION
Resumo: loja temporária para testar interação presencial e compra real. Não ideal para B2B (preferir estande em conferência). Inclui o case Topology Eyewear.
Conceitos e regras:
- Ideal para interações face a face e ver se realmente compram; não ideal para B2B [p.316]. Capacidades: Design / Product / Legal / Sales / Marketing [p.316, p.318].
- Checklist (p.317). Prepare: achar local; contrato de aluguel, licenças, permissões e seguro; desenhar a experiência; planejar a logística; divulgar as datas. Execute: abrir, coletar evidência, fechar. Analyze: o que empolgou e o que deixou céticos; quantas interações significativas (e-mails coletados, mock sales, presales ou vendas); iterar a experiência antes de outro pop-up.
- Evidência (p.318): fraca mas boa para qualitativo: visitas, cadastros de e-mail, taxa de conversão visitante-e-mail, citações; forte: presales, mock sales, vendas, taxa de conversão de quem se dispôs a pagar ou pagou.
- Custo maior que experimentos de baixa fidelidade (aluguel e divulgação); reduzir pedindo espaço extra a um lojista. Setup dias a semanas. Run time curto (horas a dias): aprender rápido, sintetizar e seguir [p.318].
- Requisito: tráfego. Criar buzz com anúncios online, redes sociais, e-mail e boca a boca [p.318].
- Pareamentos (p.319): antes: Online Ads (p.146), Customer Interviews (p.106) na rua, Social Media Campaign (p.168); depois: Presales (p.274), Mock Sales (p.288), Concierge (p.248).
Case Topology Eyewear (PDF p.320-321; impr. 304-305): óculos sob medida via app de realidade aumentada.
- Hipótese: muita gente se identifica com óculos mal ajustados e aceitaria a abordagem de alta tecnologia [p.321]. Experimento: alugaram uma loja parcialmente vazia na Union Street (San Francisco) por uma sexta-feira, sob o nome temporário Alchemy Eyewear; o marketing abordou desconhecidos na rua; na loja, perguntavam primeiro sobre problemas e anotavam as palavras do cliente, depois apresentavam a solução, demonstravam o app e pediam e-mail [p.321].
- Evidência: em 2 horas venderam 4 pares a cerca de US$400 em média; conversões de e-mail pequenas demais para significado absoluto, mas úteis para ver onde estava a maior queda [p.321].
- Insight: valor maior foi qualitativo: pessoas eram "symptom aware" mas não "problem aware" (diziam não ter problema de ajuste, mas sim que o óculos escorrega ou aperta); isso guiou mensagens de marketing por anos [p.321]. Ação: usar a voz do cliente no propósito e branding; rodaram mais pop-ups testando proposta de valor, posicionamento e marketing; mais de mil clientes face a face [p.321].
Citações curtas de prova:
- "symptom aware" but not "problem aware" [p.321]
O que este trecho NÃO diz: não dá limiar de vendas ou conversão para considerar o pop-up bem-sucedido.
Relevância: hypothesis-and-experiments: MÉDIA/ALTA (catálogo + exemplo de insight qualitativo vs quantitativo). product-discovery-assistant: MÉDIA (distinção symptom aware vs problem aware).
Decisão sugerida: usar em hypothesis-and-experiments; considerar o insight "symptom aware" em product-discovery-assistant.

---

### Extreme Programming Spike (PDF p.322-325; impr. 306-309) EXPERIMENTO DE VALIDAÇÃO / SIMULATION
Resumo: programa simples para explorar soluções técnicas ou de design (termo vem de escalada e ferrovias). Avalia rapidamente viabilidade (feasibility), geralmente software. Não serve para escalar (geralmente descartado e refeito).
Conceitos e regras:
- Ideal para avaliar rapidamente se a solução é viável; não ideal para escalar [p.322]. Capacidades: Product / Technology / Data [p.322, p.324].
- Checklist (p.323). Prepare: definir critérios de aceitação; definir o time box; planejar início e fim. Execute: escrever código para atingir os critérios; considerar fortemente programação em par. Analyze: compartilhar desempenho, nível de complexidade e saídas; decidir se critérios foram atendidos; usar o aprendizado para build, borrow or buy.
- Evidência (p.324): critérios de aceitação cumpridos (o código fez a tarefa e gerou a saída?); recomendação da equipe (curva de aprendizado e se serve ao propósito, e um sinal do próximo passo). Evidência forte: código representativo da solução maior.
- Custo relativamente baixo vs construir tudo para só depois descobrir inviabilidade. Setup cerca de 1 dia (pesquisar métodos disponíveis, quem já tem expertise). Run time de 1 dia a 2 semanas, agressivamente em time box; sem isso vira pesquisa sem fim [p.324].
- Pareamentos (p.325): antes: Partner & Supplier Interviews (p.114), Data Sheet (p.190), Boomerang (p.204) para estudar como concorrentes funcionam e que stack usam; depois: Single Feature MVP (p.240).
Citações curtas de prova:
- "It's a necessary task to stop and perform so that you can feasibly continue to make progress." [p.322]
- "These can turn into never-ending research projects if left unchecked." [p.324]
O que este trecho NÃO diz: não detalha como escrever critérios de aceitação.
Relevância: hypothesis-and-experiments: MÉDIA (único experimento de feasibility do bloco, com time box e critério de aceitação definidos antes). product-discovery-assistant: BAIXA.
Decisão sugerida: usar em hypothesis-and-experiments.

---

### Divisor da Seção 4 e abertura "Mindset" (PDF p.326-329; impr. 310-313)
Resumo: páginas de divisória. A p.326-327 são título gráfico ("Mindset"); p.328 traz citação de Vinod Khosla; p.329 abre a seção 4.1 "Avoid Experiment Pitfalls".
Conceitos e regras:
- Citação de Khosla: quanto mais sucesso no passado, menos criticamente se examinam as próprias suposições [p.328].
Citações curtas de prova:
- "The more success you've had in the past, the less critically you examine your own assumptions." [p.328]
Relevância: hypothesis-and-experiments: BAIXA. product-discovery-assistant: BAIXA.
Decisão sugerida: descartar (divisória); a citação pode fundamentar o viés de confirmação.

---

### 4.1 Avoid Experiment Pitfalls (PDF p.329-332; impr. 313-316)
Resumo: oito armadilhas comuns ao testar ideias de negócio, cada uma com sintoma e contramedidas. Importante para evitar maus hábitos.
Conceitos e regras (armadilha, definição, contramedidas listadas) [p.330-331]:
- Time Trap (não dedicar tempo suficiente): quem não investe tempo não tem bons resultados e subestima o esforço de conduzir vários experimentos. Contramedidas: reservar tempo dedicado toda semana para testar, aprender e adaptar; definir metas semanais de aprendizado sobre as hipóteses; visualizar o trabalho para ver o que está travado [p.330].
- Analysis Paralysis (pensar demais em vez de testar e adaptar): time box na análise; diferenciar decisões reversíveis (agir rápido) e irreversíveis (mais tempo); evitar debates de opinião e fazer debates baseados em evidência seguidos de decisões [p.330].
- Incomparable Data/Evidence (dados bagunçados e não comparáveis): times são desleixados na definição exata de hipótese, experimento e métricas, e não testam o mesmo segmento ou contextos muito diferentes. Contramedidas: usar o Test Card; explicitar sujeito do teste, contexto do experimento e métricas precisas; garantir que todos envolvidos na execução participem do desenho [p.330].
- Weak Data/Evidence (medir só o que as pessoas dizem, não o que fazem): satisfazem-se com surveys e entrevistas sem ir a situações reais. Contramedidas: não acreditar apenas no que as pessoas dizem; rodar experimentos de call to action; gerar evidência o mais próximo possível da situação real; vários experimentos por hipótese [p.331].
- Confirmation Bias (acreditar só em evidência que concorda): descartam ou minimizam evidência contrária pela ilusão de estar certo. Contramedidas: envolver outros na síntese dos dados; criar hipóteses concorrentes para desafiar crenças; aumentar a força da evidência conforme diminui a incerteza [p.331].
- Too Few Experiments (só um experimento para a hipótese mais importante): poucos times percebem quantos experimentos precisam para validar; decidem hipóteses importantes com um experimento de evidência fraca. Contramedidas: vários experimentos para hipóteses importantes; diferenciar evidência fraca e forte [p.331].
- Failure to Learn and Adapt (não analisar a evidência para gerar insights e ação): times se aprofundam tanto em testar que esquecem o objetivo: decidir, com base em evidência e insights, avançar de ideia para negócio. Contramedidas: reservar tempo para sintetizar, gerar insights e adaptar; navegar entre processo detalhado de teste e visão geral (quais padrões relevantes estou observando?); criar rituais para manter os olhos no prêmio (perguntar se há progresso da ideia ao negócio) [p.331].
- Outsource Testing (terceirizar o que você deveria fazer e aprender): testar é iterar rápido entre testar, aprender e adaptar; uma agência não toma decisões rápidas por você, risco de desperdiçar tempo e energia. Contramedidas: deslocar recursos reservados para agência para membros internos; formar um time de testadores profissionais [p.331].
Citações curtas de prova:
- "Only measure what people say, not what they do." [p.331, rótulo de Weak Data/Evidence]
- "Time box your analysis work." [p.330]
- "Create competing hypotheses to challenge your beliefs." [p.331, texto do checklist: "Create competing hypotheses to challenge your beliefs"]
- p.332: citação de Cher Wang (HTC) sobre humildade e continuar aprendendo e observando.
O que este trecho NÃO diz: não quantifica "quantos experimentos" são suficientes nem o tempo semanal recomendado.
Relevância: hypothesis-and-experiments: ALTA (checklist de armadilhas: dados incomparáveis, evidência fraca, viés de confirmação, poucos experimentos; mapeia diretamente em regras de qualidade). product-discovery-assistant: ALTA (viés de confirmação, hipóteses concorrentes, não terceirizar).
Decisão sugerida: usar em hypothesis-and-experiments (regras anti-armadilha, checklist de revisão de um experimento) e product-discovery-assistant (ritual de síntese e viés).

---

### 4.2 Lead Through Experimentation (PDF p.333-338; impr. 317-322)
Resumo: papel da liderança para criar cultura de experimentação: linguagem, facilitação, "strong opinions, weakly held", ambiente habilitador e perguntas em vez de respostas.
Conceitos e regras:
- Melhorar modelos de negócio existentes (p.334): atenção à linguagem e ao tom, pois uso excessivo das próprias palavras desempodera times, que ficam esperando ser designados. Preferir "We, Us, Our" ("How would you achieve this business outcome?", "Can you think of 2-3 additional experiments?") a "I, Me, Mine" ("Deliver this feature by release date", "This is the only experiment we should run"). Accountability = dar conta de como experimentam e progridem rumo a resultados de negócio; features são outputs, não outcomes. Facilitação: recomendam cursos; usar facilitação para selecionar vários experimentos, com a evidência decidindo [p.334].
- Inventar novos modelos (p.335): "strong opinions, weakly held" (Paul Saffo): tem-se uma hipótese e fica-se aberto a provar errado, para não cair em vieses cognitivos. Frases boas: "What is your learning goal?", "What obstacles can I remove to help you make progress?", "How else might we approach this problem?", "What learning has surprised you so far?". Frases ruins: "I don't trust the data.", "I still think it's a good idea and we should build it anyway.", "You need to talk to 1,000 customers before it means anything.", "This has to be a $15 million dollar business by the end of next year." Chegar a revisão com respostas e ignorar dados contrários desfaz a cultura [p.335].
- Passos que líderes podem dar (p.336): criar ambiente habilitador (tempo e recursos para testar iterativamente, abolir business plans, processos e métricas de teste diferentes dos de execução, dar autonomia); evidência vence opinião (experiência passada pode impedir ver o futuro; empurrar o time a fazer o caso com evidência); remover obstáculos e abrir portas (acesso a clientes, marca, PI e especialistas; poucas equipes têm acesso fácil a clientes); perguntar em vez de dar respostas (questionar experimentos, evidências, insights e padrões).
- Criar mais líderes (p.337): ficar meio passo à frente do time (pensar onde quer chegar e olhar para trás); entender o contexto antes de aconselhar (deixar terminar de falar, perguntar para esclarecer, não interromper); dizer "I don't know" e seguir com "How would you approach this?" ou "What do you think we should do?".
Citações curtas de prova:
- "Allow your intuition to guide you to a conclusion, no matter how imperfect" [p.335, Paul Saffo]
- "A bad system will beat a good person every time." [p.338, W. Edwards Deming]
- "features are important, they are outputs, not outcomes." [p.334]
O que este trecho NÃO diz: não dá frequência dos ritos de liderança nem métricas para medir cultura.
Relevância: hypothesis-and-experiments: BAIXA/MÉDIA (princípio "evidence trumps opinion" e frases de revisão). product-discovery-assistant: MÉDIA (linguagem de facilitação, perguntas-modelo para o usuário, "strong opinions, weakly held").
Decisão sugerida: usar parcialmente em product-discovery-assistant (perguntas de coaching); em hypothesis-and-experiments só o princípio "evidência prevalece sobre opinião".

---

### 4.3 Organize for Experimentation (PDF p.339-343; impr. 323-327)
Resumo: critica silos funcionais e o financiamento anual; propõe times multifuncionais pequenos e dedicados, financiamento incremental no estilo capital de risco, e um comitê de investimento.
Conceitos e regras:
- Silos vs. times multifuncionais (p.340): organização por função funciona se problema e solução são conhecidos e nada muda; como raramente se sabe a solução, times pequenos, dedicados e multifuncionais adaptam-se mais rápido e podem superar grandes times por projeto em silos [p.340].
- Financiamento (p.341): orçamento anual "big bang" limita agilidade e incentiva gastar tudo no fim do ciclo; limita "at-bats": melhor várias tacadas de "base hit" que uma só de home run. Comparativo ilustrado: capital de risco (8-12 anos, 20-30 startups, hands-off) vs. financiamento de inovação interno (1-3 anos, 5-10 startups internas, hands-on).
- Portfólio de inovação (p.342): investir incrementalmente e dobrar a aposta nas bem-sucedidas, aumentando chances de achar um "unicórnio". Tabela por estágio, conforme texto extraído (colunas Seed, Launch, Growth; alinhamento de células exige conferência visual): Funding menos de US$50.000 / US$50.000-500.000 / US$500.000+; tamanho do time 1-3 / 2-5 / 5+; tempo por membro 20-40% / 40-80% / 100%; nº de projetos alto / médio / baixo; objetivos: entendimento do cliente, contexto e disposição a pagar / interesse comprovado e indícios de rentabilidade / modelo comprovado em escala limitada; KPIs: market size, customer evidence, problem/solution fit, opportunity size, business model fit / evidência da Value Proposition, financeira, de feasibility / product/market fit, aquisição e retenção. Mix de temas de experimento (Desirability, Feasibility, Viability) com faixas percentuais por estágio (ex.: 50-80% desirability no início, 0-10%, 10-30%, 30-50%, 10-40%, 20-50%, 10-30%, 40-50%, 20-50%); mapeamento célula a célula é ambíguo na extração [p.342].
- Comitê de investimento (p.343): 3-5 membros; considerar membro externo ou entrepreneur in residence (EIR); membros com autoridade de decisão sobre aprovação e orçamento; perfil empreendedor, dispostos a desafiar o status quo. Decisões de investimento ocorrem nas Stakeholder Review Ceremony (p.80 do livro); revisões mensais, mas investimento tipicamente a cada 3-6 meses. Acordo de trabalho: chegar no horário; decidir na reunião (times não saem sem saber se podem avançar); deixar o ego na porta, ouvir evidência. O comitê revisita obstáculos de tempo, multitasking, financiamento, suporte, acesso e direção.
Citações curtas de prova:
- "Annual funding also limits your at-bats" [p.341, no texto: "Annual funding also limits your at-bats, in that..."]
O que este trecho NÃO diz: o conteúdo de células da tabela de portfólio não está inequivocamente alinhado no texto extraído; não define critério numérico de passagem de Seed para Launch.
Relevância: hypothesis-and-experiments: BAIXA (contexto organizacional; os KPIs por estágio e a mistura desirability/feasibility/viability por estágio poderiam inspirar a ordem de experimentos, mas a tabela está truncada). product-discovery-assistant: BAIXA.
Decisão sugerida: descartar o grosso (organizacional); possível referência à ideia de objetivos e KPIs por estágio, mas só após conferir a tabela no PDF.

---

### Divisor "Afterword" (PDF p.344-345; impr. 328-329)
Páginas gráficas com títulos ("After...", "rword"); sem conteúdo. Descartar.

---

### Glossário (PDF p.346-348; impr. 330-332)
Resumo: definições curtas de termos do livro; só estrutura listada, com alguns termos úteis.
Termos presentes (alfabético): Action; Affinity sorting; Assumption; Assumptions mapping; Business Model; B2B; B2C; Business Model Canvas; Call to action (CTA); Conversion; CSAT; Customer development; Customer gains; Customer insight; Customer pains; Customer Profile; Daily Standup; Desirability; Distributed team; Dot voting; Environment map; Ethnography; Evidence; Experiment; Feasibility; Fidelity; Fit; Gain creators; Hypothesis; Iterative approach; Ideation; Jobs to be done; KPIs; Lean Startup; Learning Card; Metrics; Minimum Viable Product (MVP); Pain Relievers; Products and Services; Progress Board; Prototyping; Solopreneur; Stakeholder; Team Map; Test Card; Time Box; Validate; Value Map; Value Proposition; Value Proposition Canvas; Value Proposition Design; Viability [p.346-348].
Definições do livro úteis para os artefatos (paráfrase):
- Action: próximo passo, decisão informada de abandonar, pivotar, iterar ou continuar testando [p.346].
- Assumption: algo que se acredita ser verdade sem evidência; Assumptions mapping: exercício em que suposições de desirability, viability e feasibility são escritas e depois decididas [p.346].
- Hypothesis: crença de estratégia, modelo de negócio ou proposta de valor que precisa ser verdadeira para a ideia funcionar, ainda não validada [p.347].
- Evidence: dado gerado de experimento ou coletado em campo que prova ou refuta hipótese, insight ou crença [p.347].
- Experiment: procedimento que valida ou invalida uma hipótese e gera evidência, reduzindo risco e incerteza [p.347].
- Desirability / Feasibility / Viability: clientes querem? dá para construir (recursos e infraestrutura)? dá lucro (mais receita que custo)? [p.347, p.348].
- Fidelity: grau em que o protótipo reproduz o produto ou serviço [p.347].
- MVP: modelo de proposta de valor desenhado especificamente para validar ou invalidar uma ou mais hipóteses [p.348].
- Test Card: ferramenta estratégica para desenhar e estruturar pesquisa e experimentos; Learning Card: captura insights de pesquisa e experimentos [p.348].
- Time Box: período fixo para concluir uma tarefa (vem de Agile) [p.348].
- Fit: quando os elementos do Value Map atendem jobs, pains e gains relevantes e um número substancial de clientes "contrata" a proposta [p.347].
Citações curtas de prova:
- "informed decision to abandon, pivot, iterate, or continue testing" [p.346]
O que este trecho NÃO diz: o glossário não define evidence strength nem a escala; não define "pivot" nem "persevere" em separado.
Relevância: hypothesis-and-experiments: MÉDIA (definições de referência e do vocabulário). product-discovery-assistant: MÉDIA.
Decisão sugerida: usar para alinhar terminologia nas skills.

---

### Agradecimentos, autores, créditos, anúncios (PDF p.349-355; impr. 333-339)
Estrutura apenas: p.349 e p.351 só número de página; p.350 Acknowledgments de David J. Bland (agradecimento à família, a Alex Osterwalder, à equipe Strategyzer, e lista de influências: Eric Ries, Steve Blank, Jeff Gothelf, Josh Seiden, Giff Constable, Janice Fraser, Jason Fraser, Ash Maurya, Laura Klein, Christina Wodtke, Brant Cooper, Patrick Vlaskovits, Kate Rutter, Tendayi Viki, Barry O'Reilly, Melissa Perri, Jeff Patton, Sam McAfee, Teresa Torres, Marty Cagan, Sean Ellis, Tristan Kromer, Tom Looy, Kent Beck) [p.350]; p.352 biografias de David Bland, Alex Osterwalder e Alan Smith; p.353 créditos de design e ilustração; p.354-355 anúncios da Strategyzer (Cloud Academy, biblioteca de experimentos, growth). Sem conteúdo técnico.
Relevância: NENHUMA (exceto a lista de influências, que pode indicar fontes do método; [fora do livro] sem confirmar quem influenciou o quê).
Decisão sugerida: descartar.

---

### Índice remissivo (PDF p.356-364; impr. 340-348)
Estrutura apenas. Útil como mapa de páginas impressas do livro (impr. = PDF-16). Mapeamento por categoria (do índice, p.356-364):
- Experimentos de descoberta (discovery) impr. 101-229: Exploração (104-125): Customer Interviews 106-113, Partner & Supplier Interviews 114, Expert Stakeholder Interviews 115, A Day in the Life 116-121, Discovery Survey 122-125. Análise de dados (126-145): Search Trend Analysis 126-129, Web Traffic Analysis 130-133, Discussion Forums 134-137, Sales Force Feedback 138-141, Customer Support Analysis 142-145. Interest discovery (146-175): Online Ads 146-151, Link Tracking 152-155, Feature Stub 156-159, 404 test 160-161, Email Campaigns 162-167, Social Media Campaigns 168-171, Referral Programs 172-175. Discussion prototypes (162-213 conforme índice): 3D print 176-181, Paper Prototypes 182-185, Storyboards 186-189, Data Sheets 190-193, Brochures 194-199, Explainer Videos 200-203, Boomerang 204-207, Pretend to Own 208-213. Preferência e priorização (218-229): Product Box 214-217, Speed Boat 218-221, Card Sorting 222-225, Buy a Feature 226-229 [p.358, p.356-362].
- Experimentos de validação (impr. 231-309): Interaction prototypes (234-259, 278-283): Clickable prototypes 236-239, Single Feature MVP 240-243, Mash-Up 244-247, Concierge 248-253, Life-sized prototypes 254-259, Validation surveys 278-283. Call to action (260-277): Simple landing page 260-265, Crowdfunding 266-269, Split Test 270-273, Presale 274-277. Simulation (284-309): Wizard of Oz 284-287, Mock sale 288-293, Letter of intent 294-299, Pop-up store 300-305, Extreme Programming Spike 306-309 [p.364].
- Seções-guia do livro (índice): Hypothesize 27-39 (Assumptions Mapping 36-39), Experiment 41-47, Learn 49-57 (Learning Cards 54-55, confidence levels 56-57), Decide 59-63, Manage 65-87 (ceremonies 67-81, principles of experiment flow 82-85, ethics 86), selecting experiments 91-93, sequences 98-99, mindset 313-327 [p.356-364].
- Entradas relevantes: sequências de experimentos por tipo de empresa (B2B hardware/serviços/software; B2C serviços/software; B2B com B2C; empresas altamente regulamentadas) em impr. 98-99 [p.356, p.358]; decisões "kill", "persevere", "pivot" em impr. 61 e 80 [p.358, p.361-362]; riscos por tipo: desirability, feasibility, viability, e hipóteses de market, financial, infrastructure risk em impr. 34-35 [p.356, p.360]; tipos de evidência e confidence level em impr. 52-53, 56-57 [p.359].
O que este trecho NÃO diz: o índice não traz conteúdo, só localizações; as notas dos capítulos anteriores já cobrem impr. 1-277.
Relevância: hypothesis-and-experiments: BAIXA, só como mapa (conferir cobertura dos blocos 1-4). product-discovery-assistant: NENHUMA.
Decisão sugerida: descartar o texto; usar o mapa de páginas para checar se algum experimento do catálogo ficou sem nota nos blocos anteriores.

---

### Licença (PDF p.365; impr. n/a)
Wiley END USER LICENSE AGREEMENT, remissão ao EULA. Descartar.

---

## Catálogo de experimentos deste bloco (nome, 1 linha, página)
- Validation Survey: survey fechada a clientes existentes; Sean Ellis (40% muito desapontado), NPS, ranking de jobs/pains/gains (meta 80% de acurácia) [p.294-298].
- Wizard of Oz: entrega manual escondida atrás de uma interface; define linha na areia para automação [p.300-302].
- Mock Sale: mostra preço(s) sem cobrar; mede cliques, e-mail e pagamento [p.304-306].
- Letter of Intent: contrato curto não vinculante, para B2B e parceiros, com leads quentes [p.310-312].
- Pop-Up Store: loja temporária para interação e vendas reais, não para B2B [p.316-318].
- Extreme Programming Spike: programa descartável para testar viabilidade técnica, com time box e critérios de aceitação [p.322-324].
- Cases: Buffer (Mock Sale) [p.308-309]; Thrive Smart Systems (LOI) [p.314-315]; Topology Eyewear (Pop-Up Store) [p.320-321].

## Candidatos a regra
1. Sean Ellis só vale com usuário que passou pelo núcleo do produto 2+ vezes nas últimas 2 semanas; nem logo após a 1ª experiência, nem 6 meses sem uso. "How disappointed would you be if you could no longer use this product?" [p.296]. Meta: ao menos 40% "muito desapontado" antes de escalar [p.296, p.298].
2. Ordem: rodar NPS depois do Sean Ellis; não confiar em indicação de quem não ficaria desapontado [p.297]. "Use the NPS after they've answered the Sean Ellis test." [p.297]
3. Validar o ranking de jobs/pains/gains com meta de 80% de acurácia, com pergunta aberta final para o que faltou [p.295, p.298].
4. Mock sale: não perguntar "quanto pagaria"; apresentar preços. Escada de força: clique de compra, e-mail, informação de pagamento (muito forte). "Customers are notoriously bad at answering that question." [p.306]
5. Cuidado com preço ridiculamente baixo em mock sale: gera falso positivo; pensar na estrutura de custos antes [p.306].
6. Wizard of Oz: definir a linha na areia (pedidos/dia manuais, custo por pedido, máximo que pagam, volume em que automatizar compensa); se nunca atingir, reavaliar a estratégia [p.301].
7. Registrar lead time (pedido até entrega) e cycle time (trabalho efetivo, sem espera) em Wizard of Oz [p.302].
8. LOI só com warm leads, ligada a conversas agendadas; evitar e-mail frio; B2B e parceiros, não B2C [p.310, p.312]. Esperar que o declarado seja bem maior que o escrito (1000 dito, 300 escrito) [p.315].
9. Spike: definir critérios de aceitação e time box antes; 1 dia a 2 semanas; sem isso vira pesquisa infinita [p.323-324].
10. Pop-up: valor principal está no qualitativo; separar "symptom aware" de "problem aware" [p.321]; conversão baixa serve para localizar onde há queda no funil [p.321].
11. Pitfalls: usar Test Card com sujeito de teste, contexto e métricas precisas para evitar dados incomparáveis [p.330]; vários experimentos por hipótese importante e diferenciar evidência fraca e forte [p.331]; hipóteses concorrentes contra viés de confirmação [p.331]; time box de análise e distinção decisão reversível vs irreversível [p.330]; não terceirizar testes [p.331].
12. Diferenciar decisões reversíveis (agir rápido) e irreversíveis (mais tempo) [p.330].
13. Ao conduzir revisões: evidência vence opinião; frases a evitar ("I don't trust the data.", "You need to talk to 1,000 customers before it means anything.") [p.335-336].
14. Pareamentos antes/depois por experimento (ver cada seção) formam sequências sugeridas: por exemplo Landing Page/Online Ad/Brochure antes de Presale ou Mock Sale; Customer Interviews depois de Mock Sale e Validation Survey de score baixo [p.293, p.299, p.307].

## Checklist de cobertura
- Primeira página lida: 293
- Última página lida: 365
- Páginas sem texto útil ou ilegíveis: 326, 327 (só fragmentos do título "Mind/dset"), 329 (título 4.1 truncado), 333, 339, 344, 345 ("After/rword", fragmentos), 349, 351 (só número); 365 (licença Wiley).
- Problemas de extração observados: (a) cabeçalhos de categoria truncados ou colados ("VALIDATION / call to actionEvalidation" na p.294; categoria exata da Validation Survey no livro incerta no texto); (b) fórmulas de taxa na p.306 (Mock Sale) e p.312 (LOI) aparecem com numerador e denominador trocados em relação ao uso comum ("views divided by clicks"; "LOIs sent divided by LOIs signed"); registrado como no texto, provável erro do livro ou da extração, não corrigi; (c) texto em colunas misturadas (p.296, p.298, p.302, p.306, p.309, p.335-336, p.357-364): fluxo de leitura intercalado, interpretado por contexto; (d) tabela de portfólio de inovação (p.342) com células desalinhadas, não dá para mapear valores a colunas com segurança; (e) NPS: limites exatos de detratores, passivos e promotores não estão em texto corrido (só rótulos no diagrama).
- Conteúdo visual não lido: ícones de custo, setup time, run time e barra de força da evidência de cada cartão (p.294, 300, 304, 310, 316, 322); diagramas de fluxo do Sean Ellis e do NPS (p.296-297, apenas rótulos); caixas "Overview" (apenas texto, sem ilustrações); ilustrações dos casos Buffer, Thrive e Topology; amostra visual de LOI (apenas o texto); diagramas de silos vs. times multifuncionais (p.340); infográfico de capital de risco vs. financiamento interno (p.341); tabela do portfólio de inovação (p.342); ícones na página de créditos (p.353).
- Capítulos/seções cobertos integralmente: Validation Survey (a partir da p.294, resto), Wizard of Oz, Mock Sale (com case Buffer), Letter of Intent (com case Thrive), Pop-Up Store (com case Topology), Extreme Programming Spike, Seção 4 (4.1, 4.2, 4.3), Glossário, Agradecimentos, bios, créditos, índice remissivo, licença.
- Capítulos/seções que continuam em outro bloco: apenas o início deste bloco, a página de pareamentos do Presale (p.293), continua o cartão do Presale iniciado em bloco anterior. Este é o último bloco do livro.
