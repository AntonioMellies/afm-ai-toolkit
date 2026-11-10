# Notas de leitura: Testing Business Ideas (Bland e Osterwalder), bloco 03, PDF p.147-219

Convenções: `[p.N]` = "PDF PAGINA N" do marcador. Número impresso = PDF - 16 (ex.: PDF p.147 = impr. 131; PDF p.168 = impr. 152). Os cross-references "p. NNN" nas tabelas de pareamento do livro usam a numeração IMPRESSA. Todas as páginas de experimento seguem o mesmo molde (capa com Cost / Evidence Strength / Setup Time / Run Time em ícones; página Overview com checklist Prepare/Execute/Analyze; página Details com Cost, Setup Time, Run Time, Evidence Strength, Capabilities, Requirements; página Before/After de pareamentos). As escalas de Cost, Evidence Strength, Setup Time e Run Time da capa são ícones gráficos: NÃO lidas (ver Problemas de extração). Só há texto narrativo sobre elas na página Details.

---

### Web Traffic Analysis (Discovery / Data Analysis) (PDF p.147-149, impr. 131-133) [continua do bloco anterior; a capa estava em p.146]
Resumo: Análise de métricas de um site existente (sessões, interações, abandono em cada etapa de um fluxo definido) para achar onde se perde o cliente. Mostra o "o quê", não o "porquê".
Conceitos e regras:
- Preparar: definir a área de foco e o evento do cliente a que se aplica (mais cadastros, downloads, compras), listar as etapas que levam ao evento, escolher a janela de tempo [p.147].
- Executar: rodar a análise no software de analytics sobre o caminho definido; anotar pontos de abandono e percentuais [p.147].
- Analisar: quais os maiores abandonos? Que experimentos rodar para melhorar esse número? [p.147]
- Evidência: nº de sessões (interações em um período, normalmente 30 min por usuário), nº de abandonos (percentual por etapa e se saiu do site), quantidade de atenção (tempo na página, cliques, heat map). É evidência "relativamente forte" porque mede comportamento, mas só diz o quê, não o porquê, até perguntar ao usuário [p.148].
- Run time longo (semanas a meses); não tomar decisões grandes e arriscadas com poucos dias de dados [p.148].
- Fatiar os dados por origem (ex.: clicou diferente quem veio de anúncio vs. e-mail) [p.148].
- Requisito: site existente com usuários ativos; tráfego via anúncios, mídia social, e-mail, boca a boca, fóruns [p.148].
- Pareamentos: antes = Simple Landing Page, Extreme Programming Spike, Single Feature MVP; depois = Split Testing (corrigir abandonos de forma incremental), Validation Survey (perguntar por quê a quem abandona), Customer Support Analysis [p.149].
Citações curtas de prova:
- "it is measuring what they do. You don't know why they are doing it until you ask them." [p.148]
O que este trecho NÃO diz: não dá limiares numéricos de "bom" para abandono; não ensina a escolher ferramenta além de "gratuita vs. paga".
Relevância: hypothesis-and-experiments: MÉDIA, catálogo de experimento de dados (nome, quando usar, força de evidência "comportamento, sem porquê"); product-discovery-assistant: BAIXA.
Decisão sugerida: usar em hypothesis-and-experiments (biblioteca de experimentos).

### Discussion Forums (Discovery / Data Analysis) (PDF p.150-153, impr. 134-137)
Resumo: Buscar em fóruns (internos ou de concorrentes) sinais de jobs, dores e ganhos não atendidos, incluindo gambiarras que clientes inventam.
Conceitos e regras:
- Ideal para achar necessidades não atendidas no seu produto ou no do concorrente; capabilities Research/Data [p.150].
- Preparar: escolher fóruns (internos vs. externos) e definir perguntas, p.ex. há evidência de que você não resolve jobs principais, não trata dores maiores, não cria ganhos, ou de que clientes criam workarounds? [p.151]
- Executar: buscar frases ligadas às perguntas, capturar telas/exportar, anotar urgência e tom das threads [p.151].
- Analisar: atualizar o Value Proposition Canvas; contatar por mensagem direta os autores para entrevista; se aceitarem, rodar experimentos para fechar a lacuna [p.151].
- Evidência: padrão de workarounds = forte (citado como análogo a "built a solution to solve the problem" de Steve Blank); padrão dos 3 principais pedidos de feature = relativamente fraco, pois é preciso testar o job/dor subjacente [p.152].
- Requer fóruns existentes; pode usar scraping (automatizar encurta run time) ou fazer manual (mais barato, mais lento) [p.152].
- Pareamentos: antes = Customer Support Analysis (p.142), Sales Force Feedback (p.138), Search Trend Analysis (p.126); depois = Customer Interviews (p.106), Web Traffic Analysis (p.130) [p.153].
Citações curtas de prova:
- "it's strong evidence if people are hacking together their own methods" [p.152]
O que este trecho NÃO diz: não define tamanho mínimo de amostra de threads; não trata viés de quem posta em fóruns.
Relevância: hypothesis-and-experiments: MÉDIA (força de evidência: workaround forte, feature request fraco); product-discovery-assistant: MÉDIA (técnica de descoberta de necessidades não atendidas sem entrevista).
Decisão sugerida: usar em hypothesis-and-experiments; regra "feature request é evidência fraca, workaround é forte" também em product-discovery-assistant.

### Sales Force Feedback (Discovery / Data Analysis) (PDF p.154-157, impr. 138-141)
Resumo: Extrair da força de vendas o que impede ou quase impediu vendas e que jobs/dores/ganhos o produto não cobre.
Conceitos e regras:
- Ideal para negócios com um grupo de pessoas que faz vendas; capabilities Sales/Research/Data [p.154].
- Preparar: definir perguntas (resolve jobs principais? trata dores maiores? cria ganhos?); em B2B complexo, segmentar perguntas por papéis: decision makers, economic buyers, recommenders, influencers; agendar sessões [p.155].
- Executar: discutir as perguntas, pedir evidências (ligações, dashboards, e-mails), agradecer [p.155].
- Analisar: atualizar o Value Proposition Canvas; identificar experimentos para melhorar o fit [p.155].
- Evidência "near miss": registrar quantas vendas quase se perderam e o que, segundo o cliente, "quase o impediu de comprar"; é evidência relativamente forte, mais forte que a maioria dos feedbacks porque o cliente acabou de converter [p.156].
- Pedidos de feature no processo de vendas são evidência relativamente fraca; testar o job/dor subjacente [p.156].
- Requer força de vendas engajada e dados (verbais ou em CRM) [p.156].
- Pareamentos: antes = Customer Interviews, Validation Survey (p.278), Expert Stakeholder Interviews (p.115); depois = Buy a Feature (p.226, convidar quem NÃO converteu), Split Test (p.270, versões da proposta de valor no processo de vendas) [p.157].
Citações curtas de prova:
- "a gold mine of relatively strong evidence" [p.156]
O que este trecho NÃO diz: não trata o viés do vendedor (relato de segunda mão); não dá métrica de near miss.
Relevância: hypothesis-and-experiments: MÉDIA (experimento de dados + regra de força de evidência); product-discovery-assistant: MÉDIA (papéis de compra B2B para segmentar perguntas).
Decisão sugerida: usar em hypothesis-and-experiments; papéis B2B como nota em product-discovery-assistant.

### Customer Support Analysis (Discovery / Data Analysis) (PDF p.158-161, impr. 142-145)
Resumo: Usar dados de suporte (ligações, e-mails, bugs/pedidos) e sessões com a equipe de suporte para ver jobs, dores e ganhos não atendidos.
Conceitos e regras:
- Ideal para negócios com base substancial de clientes; capabilities Sales/Marketing/Research/Data [p.158].
- Mesmo roteiro do Sales Force Feedback: definir perguntas, sessões com a equipe, pedir evidências, atualizar Value Proposition Canvas, identificar experimentos [p.159].
- Evidência: citações de clientes sobre jobs, dores e ganhos são relativamente FRACAS isoladamente, mas informam experimentos futuros; padrão dos 3 maiores pedidos de feature também fraco [p.160].
- Requisito: dados de suporte em volume, mais do que "conversas anedóticas e pontuais com um punhado de clientes" (paráfrase de [p.160]).
- Pareamentos: antes = Customer Interviews, Validation Survey, Expert Stakeholder Interviews; depois = Web Traffic Analysis, Sales Force Feedback (cruzar), Speed Boat (p.218, convidar clientes em vez de só apontarem o que falta) [p.161].
Citações curtas de prova:
- "relatively weak evidence on its own, but can be used to inform future experiments" [p.160]
O que este trecho NÃO diz: não define volume mínimo de tickets.
Relevância: hypothesis-and-experiments: MÉDIA; product-discovery-assistant: MÉDIA (fonte barata de sinal para melhorias em produto existente).
Decisão sugerida: usar em hypothesis-and-experiments.

### Online Ad (Discovery / Interest Discovery) (PDF p.162-167, impr. 146-151)
Resumo: Anúncio online que articula a proposta de valor para um segmento com chamada para ação simples; variantes push (mídia social, cliente já ciente do problema) e pull (anúncio de busca, cliente já procurando solução).
Conceitos e regras:
- Ideal para testar proposta de valor em escala; capabilities Design/Product/Marketing [p.162].
- Encontrar clientes-alvo online: pensar cedo (ao montar o Value Proposition Canvas) em lugares para achá-los; votar em equipe quais testar primeiro; adaptar abordagem ao estágio do cliente (modelo de Steve Blank: tem o problema / ciente do problema / procurando solução) [p.163].
- Social Media Ad (push): definir plataforma, público, duração, orçamento; escolher CPC; nome e logo; declaração de valor do Value Proposition Canvas; imagem; URL de destino em landing; monitorar diariamente gasto, impressões, CTR, comentários/compartilhamentos; se gasto alto com CTR muito baixo, pausar, iterar texto/imagem e relançar [p.164].
- Search Only Ad (pull): plataformas de busca, público, CPC, declaração de valor, versão curta como headline, URL de landing, submeter para aprovação, monitorar os mesmos indicadores, mesma regra de pausar/iterar [p.165].
- Evidência: nº de views únicas, nº de cliques, CTR (cliques / vezes exibido; varia por indústria, pesquisar a referência do setor). Clique em anúncio é evidência relativamente FRACA, mas necessário para testar canais; fica mais forte combinado com conversões em simple landing page [p.166].
- Evitar anúncios caros no início para não ficar "viciado" em aquisição paga e ter dificuldade de escalar depois [p.166].
- Setup: texto puro em minutos; com imagem, mais. Run time: aprovação 1-3 dias; rodar no mínimo uma semana [p.166].
- Requisito: destino (normalmente landing) coerente com a proposta de valor e com regras de destino da plataforma, senão o anúncio é rejeitado [p.166].
- Pareamentos: antes = Customer Interviews (copy), Product Box (p.214), Search Trend Analysis (p.126, palavras-chave), Simple Landing Page (p.260); depois = Social Media Campaign (p.168), Split Testing (p.270) [p.167].
Citações curtas de prova:
- "You don't want to get addicted to paid acquisition" [p.166]
O que este trecho NÃO diz: não dá CTR-alvo numérico (remete a benchmarks de indústria); não fixa orçamento.
Relevância: hypothesis-and-experiments: ALTA (experimento de interesse com critério de pausar, métricas, força "fraca, melhor com landing"); product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments (biblioteca).

### Link Tracking (Discovery / Interest Discovery) (PDF p.168-171, impr. 152-155)
Resumo: Link rastreável único com chamada para ação para medir cliques e comparar com o comportamento no destino.
Conceitos e regras:
- Ideal para ações do cliente quantitativas; capabilities Technology/Data [p.168].
- Preparar: onde colocar o link, CTA claro, analytics para views/cliques, destino pronto. Executar: publicar e rodar dias ou semanas. Analisar: calcular conversão do clique, comparar com comportamento no destino, refinar e fazer split test do texto do link [p.169].
- Evidência: views únicas e taxa de clique (o texto define como visualizações por cliques; a redação do livro parece invertida, tratar como cliques / views). Cliques são evidência de força MÉDIA: mostra o que fazem, não o porquê sem conversar [p.170].
- Run time em geral algumas semanas [p.170]. Sem CTA e proposta de valor claros não funciona [p.170].
- Pareamentos: antes = Customer Interviews (e-mails para follow-up), Online Ad, Simple Landing Page; depois = Split Test, Email Campaign [p.171].
Citações curtas de prova:
- "You'll learn what they do, but you won't know why unless you talk to them." [p.170]
O que este trecho NÃO diz: sem limiar de taxa de clique (remete a indústria).
Relevância: hypothesis-and-experiments: MÉDIA; product-discovery-assistant: BAIXA.
Decisão sugerida: usar em hypothesis-and-experiments.

### Feature Stub (Discovery / Interest Discovery) (PDF p.172-175, impr. 156-159)
Resumo: Teste curto de uma feature futura dentro de produto existente: apenas o início da experiência (botão) que, ao clicar, informa que ainda não está pronta; mede interesse por funil de cliques.
Conceitos e regras:
- Ideal para testar rapidamente desejabilidade de feature de oferta existente; NÃO ideal para funcionalidade crítica da missão [p.172].
- Preparar: decidir onde (na parte do fluxo em que o cliente mais precisa), definir duração/agenda, criar o stub com o mesmo estilo visual do produto, popup dizendo que não está pronta, link "learn more" (opcionalmente survey de interesse e cadastro de e-mail), integrar analytics, implementar feature toggle para ligar/desligar rápido ("very important step") [p.173].
- Executar: ligar o toggle, monitorar uso por hora, desligar ao fim da agenda. Analisar: calcular conversões e surveys, ver se atingem critérios de sucesso, rever com o time se a feature ainda vale a pena [p.173].
- Métricas e alvos: botão (clique/visualização única) alvo 15%; "learn more" alvo 5%; survey concluído alvo 3% [p.174]. (A redação do livro inverte numerador/denominador nas fórmulas; os alvos são o dado útil.)
- Evidência: views e cliques no botão são relativamente FRACOS mas sinalizam interesse; clicar em "learn more" e preencher survey são um pouco mais fortes que apenas fechar o popup [p.174].
- Run time nunca mais que 1-3 dias (cliente continua esperando que funcione, frustra) [p.174]. Setup de poucas horas; se demora mais, repensar a arquitetura para experimentos [p.174].
- Requisitos: produto com usuários ativos diários (precisa ser visto no contexto do produto), toggle funcionando antes de lançar, analytics [p.174].
- Pareamentos: antes = Buy a Feature (p.226), Customer Support Analysis, Discussion Forums; depois = Paper Prototype (p.182), Clickable Prototype (p.236) [p.175].
Citações curtas de prova:
- "Aim for a 15% conversion on button click." [p.174]
- "Feature Stubs should never be run for more than 1– 3 days." [p.174]
O que este trecho NÃO diz: não justifica os alvos 15%/5%/3% com dados; não diz tamanho de amostra mínimo.
Relevância: hypothesis-and-experiments: ALTA (critérios numéricos de sucesso, duração máxima, toggle); product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments (candidato a regra).

### Variação: 404 Test e "Endless Meetings" (PDF p.176-177, impr. 160-161)
Resumo: Variante mais rápida e mais arriscada do Feature Stub: nada atrás do botão; conta-se o número de erros 404 gerados. Árvore de decisão: se a feature é crítica à missão, ou não é preciso ir muito, muito rápido, usar Feature Stub; senão pode usar 404 test; se crítica e precisa de velocidade, "Don't do it".
Conceitos e regras:
- Trade-off: testa algo o mais rápido possível em escala, mas passa a impressão de produto quebrado; rodar por no máximo poucas horas [p.176].
- Árvore: "Is it a mission critical feature?" / "Do you need to go really, really fast?" com saídas Feature Stub, 404 test ou "Don't do it" (a leitura exata das setas é gráfica; aqui só os rótulos de texto) [p.177].
- Teste rápido substitui reuniões intermináveis baseadas em opinião; o objetivo é progredir, não estar certo (sucesso ou fracasso gera dados que destravam a conversa) [p.177].
Citações curtas de prova:
- "do not run it for more than a few hours" [p.176]
- "Making progress is far more important than being correct" [p.177]
O que este trecho NÃO diz: não explica como mapear cada ramo da árvore (diagrama não lido por inteiro).
Relevância: hypothesis-and-experiments: ALTA (ordem/velocidade vs. risco; regra de quando NÃO usar 404 test); product-discovery-assistant: BAIXA.
Decisão sugerida: usar em hypothesis-and-experiments.

### Email Campaign (Discovery / Interest Discovery) (PDF p.178-183, impr. 162-167)
Resumo: Série de e-mails em período definido para um segmento; mede abertura, clique, resposta. Inclui estudo de caso Product Hunt.
Conceitos e regras:
- Ideal para testar rápido proposta de valor com um segmento; NÃO ideal para substituir contato presencial [p.178].
- Preparar: definir meta, criar série de "drip emails" que entregam valor aos poucos, enviar testes internos. Executar: rodar e responder a quem responde. Analisar: quais e-mails performam melhor; que conteúdo gera mais aberturas, cliques, respostas; recapitular com o time [p.179].
- Evidência: opens, clicks, bounces, unsubscribes; força MÉDIA; taxas variam por indústria (usar benchmarks do setor). O livro define "open rate" como cliques únicos / aberturas únicas, o que parece erro de redação; não adotar sem checar [p.180].
- Requisitos: lista de assinantes (de mídia social, signup no site, blog, boca a boca, fóruns) e uma META de campanha antes de criar: gerar tráfego/conversão, onboarding, construir confiança, aprender necessidades, reengajar clientes [p.180].
- Pareamentos: antes = Simple Landing Page, Social Media Campaign; depois = Link Tracking (p.152), Split Testing (p.270), Concierge (p.248), com Explainer Video (e-mail como "moeda" para assistir) [p.181].
- Estudo de caso Product Hunt: hipótese (pessoas de produto entrariam em comunidade para compartilhar/descobrir produtos), experimento de 20 minutos via e-mail em ferramenta de link-sharing, evidência em 2 semanas (mais de 200 assinantes, 30 contribuidores), ação: transformar o comportamento em plataforma [p.182-183].
Citações curtas de prova:
- "Email campaigns need a goal, otherwise you can't be confident that it's helping you make progress." [p.180]
O que este trecho NÃO diz: não dá taxas-alvo de abertura/clique; o caso Product Hunt não tem critério de sucesso numérico definido previamente.
Relevância: hypothesis-and-experiments: MÉDIA (experimento + exemplo hipótese/experimento/evidência/insight/ação); product-discovery-assistant: BAIXA.
Decisão sugerida: usar em hypothesis-and-experiments; o formato do caso (Hypothesis / Experiment / Evidence / Insights / Actions) como modelo de registro.

### Social Media Campaign (Discovery / Interest Discovery) (PDF p.184-187, impr. 168-171)
Resumo: Mensagens em mídia social por semanas/meses para gerar interesse; engajamento é fraco, conversão é forte.
Conceitos e regras:
- Ideal para adquirir clientes, lealdade e vendas; capabilities Design/Marketing [p.184].
- Preparar: meta, plataformas, calendário e conteúdo; executar: postar e responder; analisar: quais posts/plataformas geram mais compartilhamentos, cliques, comentários, conversões [p.185].
- Evidência: views, compartilhamentos, comentários (engajamento = evidência FRACA; comentários dão insights qualitativos); cliques (CTR); conversões = evidência FORTE e mostra qual plataforma serve melhor [p.186]. (Fórmula de CTR escrita invertida no livro.)
- Custo: moderado se feito internamente; pode subir ($5k a $20k por mês) se pagar pessoas para gerir/criar [p.186]. Run time: semanas a meses [p.186]. Requer conteúdo e plano antes de começar [p.186].
- Pareamentos: antes = Explainer Video, Simple Landing Page; depois = Concierge (entregar manualmente a quem converteu) [p.187].
Citações curtas de prova:
- "Conversions are strong evidence" [p.186]
O que este trecho NÃO diz: sem metas numéricas.
Relevância: hypothesis-and-experiments: MÉDIA (hierarquia engajamento fraco < conversão forte); product-discovery-assistant: BAIXA.
Decisão sugerida: usar em hypothesis-and-experiments.

### Referral Program (Discovery / Interest Discovery) (PDF p.188-191, impr. 172-175)
Resumo: Testar crescimento orgânico via códigos de indicação dados a defensores (advocates) para amigos.
Conceitos e regras:
- Ideal para testar como escalar organicamente; capabilities Design/Product/Marketing [p.188].
- Preparar: meta de conversão, escolher advocates, criar códigos únicos com analytics; executar: entregar códigos e rodar por várias semanas; analisar: advocate share rate, friend click-through rate, friend conversion rate, comparar com a meta, refinar com split test [p.189].
- Métricas e alvos: advocate share rate (advocates que receberam código / os que compartilharam) alvo 15%-20%; friend click-through rate alvo 50%-80% (varia por canal); friend conversion rate alvo 5%-15% [p.190]. (Fórmulas escritas com numerador/denominador trocados no livro; os alvos são o dado útil.)
- Evidência: advocates aceitarem e compartilharem é relativamente forte; amigos que convertem é forte, mas resta ver se ficam ao longo do tempo (agem por incentivo) [p.190].
- Requisito: clientes apaixonados; avaliar isso antes de distribuir códigos; dar códigos a quem provavelmente indicará bem [p.190]. Custo: descontos para ambos os lados; run time: semanas a meses [p.190].
- Pareamentos: antes = Link Tracking, Simple Landing Page, Email Campaign; depois = Split Test (descontos e mídias), Social Media Campaign [p.191].
Citações curtas de prova:
- "Target 15% – 20%." [p.190]
- "Friends accepting the referral code and converting is strong evidence." [p.190]
O que este trecho NÃO diz: não justifica os intervalos-alvo.
Relevância: hypothesis-and-experiments: MÉDIA (critérios numéricos e funil de 3 taxas); product-discovery-assistant: BAIXA.
Decisão sugerida: usar em hypothesis-and-experiments.

### 3D Print (Discovery / Discussion Prototypes) (PDF p.192-197, impr. 176-181)
Resumo: Protótipo físico impresso em 3D para discutir com clientes; evidência fraca; só depois de testes de baixa fidelidade. Inclui caso NSA/CubeSat.
Conceitos e regras:
- Ideal para iterar rápido soluções físicas; capabilities Design/Technology [p.192].
- Preparar: reunir evidências anteriores de baixa fidelidade, modelar em 3D, imprimir, recrutar clientes. Executar: uma pessoa entrevista, outra anota citações, jobs, dores, ganhos e linguagem corporal; perguntar se pode contatar com soluções de maior fidelidade. Analisar: rever com o time, atualizar Value Proposition Canvas, iterar [p.193].
- Evidência relativamente FRACA: o cliente precisa suspender a descrença e imaginar o uso; feedback não implica fazer todas as mudanças pedidas [p.194].
- Requisito: ter testado antes experimentos mais rápidos e de menor fidelidade (ex.: protótipos em papel diante de clientes); não comprar impressora, alugar tempo em maker spaces [p.194].
- Pareamentos: antes = Paper Prototype, Pretend to Own (p.208), Life-Sized Prototype (p.254); depois = Storyboard (p.186), versão de maior fidelidade; paralelos: Customer Interviews, Partner & Supplier Interviews (p.114) [p.195].
- Caso NSA CubeSat: hipótese de que stakeholders internos autorizariam o projeto se vissem a necessidade; experimento: mockup impresso em 3D em tamanho real; evidência: viram que o produto certificado não cabia; ação: projeto financiado [p.196-197].
Citações curtas de prova:
- "they need to suspend belief and imagine using it in real world scenarios" [p.194]
O que este trecho NÃO diz: não dá métricas numéricas.
Relevância: hypothesis-and-experiments: BAIXA-MÉDIA (princípio de subir fidelidade gradualmente); product-discovery-assistant: BAIXA (produto físico).
Decisão sugerida: usar em hypothesis-and-experiments só a regra de ordem (baixa fidelidade antes de alta).

### Paper Prototype (Discovery / Discussion Prototypes) (PDF p.198-201, impr. 182-185)
Resumo: Interface esboçada em papel, manipulada por uma pessoa que simula as reações do software, para testar o conceito rápido.
Conceitos e regras:
- Ideal para testar conceito rapidamente; NÃO substitui teste de usabilidade adequado [p.198].
- Preparar: objetivos, público (de preferência quem já tem contexto, não "frio"), roteiro, esboços, teste interno, agendar. Executar: explicar que é exercício de feedback, um entrevista e outro anota, agradecer. Analisar: colar protótipos e notas na parede; onde travaram/confundiram, o que os empolgou; usar para o próximo experimento de maior fidelidade [p.199].
- Métricas: taxa e tempo de conclusão de tarefas (evidência não necessariamente forte, mostra onde o cliente confunde); citações sobre valor e utilidade (fracas, úteis para experimentos de maior fidelidade) [p.200].
- Custo muito baixo; setup horas a dias; run time dias a uma semana; achar clientes leva mais tempo que criar [p.200].
- Pareamentos: antes = Customer Interviews, Card Sorting (p.222), Boomerang (p.204); depois = Clickable Prototype (p.236), Storyboarding (p.186), Explainer Video (p.200) [p.201].
Citações curtas de prova:
- "Manual task completion is not necessarily strong evidence" [p.200]
O que este trecho NÃO diz: sem critério numérico de sucesso de tarefa.
Relevância: hypothesis-and-experiments: MÉDIA; product-discovery-assistant: BAIXA.
Decisão sugerida: usar em hypothesis-and-experiments (catálogo).

### Storyboard (Discovery / Discussion Prototypes) (PDF p.202-205, impr. 186-189)
Resumo: Ilustrações em sequência para visualizar a experiência; usado com clientes para brainstorm de cenários de proposta de valor.
Conceitos e regras:
- Preparar: materiais (papel, poster, canetas, post-its), sala, segmento e proposta de valor definidos, convidados. Executar: o time brainstorma 8-12 propostas de valor alternativas, esboça storyboards em poster, anota citações e jobs/dores/ganhos por cenário, ilustrador transforma cada cenário em uma ilustração. Analisar: rever notas, atualizar Value Proposition Canvas, usar esboços em entrevistas [p.203].
- Evidência: top 3 jobs/dores/ganhos ranqueados e temas; ilustrações são evidência relativamente FRACA (ambiente de laboratório), mas informam experimentos de maior fidelidade focados em ação [p.204].
- Requisito: segmento específico definido, senão fica amplo demais [p.204]. Run time: algumas horas [p.204].
- Pareamentos: antes = Product Box (p.214), Boomerang (p.204); depois = Paper Prototype, Explainer Video (animar as ilustrações), Customer Interviews; Social Media Campaign para recrutar [p.205].
Citações curtas de prova:
- "brainstorm 8 –12 alternative value propositions" [p.203]
O que este trecho NÃO diz: não explica como escolher entre os cenários além de ranquear jobs/dores/ganhos.
Relevância: hypothesis-and-experiments: BAIXA-MÉDIA; product-discovery-assistant: MÉDIA (gerar 8-12 alternativas antes de convergir).
Decisão sugerida: usar em hypothesis-and-experiments; a regra "8-12 alternativas" como dica em product-discovery-assistant.

### Data Sheet (Discovery / Discussion Prototypes) (PDF p.206-209, impr. 190-193)
Resumo: Folha de uma página com especificações da proposta de valor para testar com clientes e parceiros-chave.
Conceitos e regras:
- Ideal para destilar especificações; capabilities Design/Technology/Marketing [p.206].
- Conexões com os canvases: título = proposta de valor do Value Map; incluir produto/serviço; detalhar especificações; incluir os 3 principais gain creators e os 3 principais pain relievers do Value Map [p.207].
- Executar: mostrar a clientes e parceiros, um entrevista e outro anota; perguntar se pode contatar com solução de maior fidelidade ou oportunidade de compra [p.207].
- Evidência: feedback de clientes e parceiros, fraco mas bom qualitativamente [p.208]. Run time cerca de 15 minutos por teste; setup horas a um dia [p.208].
- Pareamentos: antes = Product Box, Paper Prototype; depois = 3D Print, Presale (p.274), Simple Landing Page; paralelos: Customer Interviews, Partner & Supplier Interviews [p.209].
Citações curtas de prova:
- "Feedback is weak but generally good for qualitative insights." [p.208]
O que este trecho NÃO diz: sem métricas.
Relevância: hypothesis-and-experiments: BAIXA; product-discovery-assistant: BAIXA.
Decisão sugerida: usar em hypothesis-and-experiments só no catálogo (1 linha).

### Brochure (Discovery / Discussion Prototypes) (PDF p.210-215, impr. 194-199)
Resumo: Brochura física mock para testar proposta de valor presencialmente com clientes difíceis de achar online. Inclui caso American Family Insurance.
Conceitos e regras:
- Ideal para clientes difíceis de achar online; capabilities Marketing/Research [p.210].
- Conexões: proposta de valor e solução do Value Map (solução abaixo da proposta de valor), 3 principais dores votadas do Customer Profile dentro da brochura [p.211].
- Executar: mostrar, um entrevista e outro anota, contar quantos viram e quantos aceitaram, orientar a contatar para saber mais ou comprar; analisar: acompanhar quantos entram em contato [p.211].
- Métricas: nº de views, de brochuras levadas, de entrevistas, de contatos; conversão por e-mail e telefone (pessoas que receberam / quem agiu). Sinal forte: 15% ou mais na conversão de call-to-action quando o segmento é muito específico [p.212].
- Distinção: contato por iniciativa do cliente é diferente de deixar e-mail em landing page (maior esforço, sinal melhor) [p.212].
- Risco: baixa qualidade visual/copy pode gerar FALSOS NEGATIVOS (não acreditam que a proposta é real) [p.212].
- Requisito: plano de aquisição (conferências, meetups, eventos, cafés, lojas, porta a porta) [p.212]. Setup 1-2 dias (1-2 semanas sem habilidade); teste ~15 min [p.212].
- Pareamentos: antes = Customer Interviews, Buy a Feature (p.226), Product Box (p.214); depois = Concierge (p.248), Validation Survey (p.278), Presale (p.274) [p.213].
- Caso American Family (Farm and Ranch): hipótese de que agricultores querem novo tipo de proteção de risco; experimento: brochuras físicas em feira agrícola no Missouri, meta de 20% dos agricultores-alvo ligar/enviar e-mail; evidência: 15% converteram; insights: segmentar (dores de pecuaristas maiores que dos milho), alternativa atual (empréstimo bancário, arriscado), bancos interessados como canal; ação: focar em pecuaristas e repetir com segmento mais restrito [p.214-215].
Citações curtas de prova:
- "you may get false negatives in your testing" [p.212]
- "you should look for a strong signal of 15% or more" [p.212]
O que este trecho NÃO diz: o caso mostra meta 20% e resultado 15% sem explicar como a conclusão foi tirada ("15% target" aparece sob evidência; a meta fixada era 20%); o livro não resolve a aparente tensão com o sinal forte de 15% (leitura ambígua, registrada como tal).
Relevância: hypothesis-and-experiments: ALTA (meta numérica definida antes, resultado vs. meta, segmentação como ação, falso negativo por baixa qualidade); product-discovery-assistant: MÉDIA.
Decisão sugerida: usar em hypothesis-and-experiments (candidato a regra: risco de falso negativo por baixa fidelidade; definir meta antes).

### Explainer Video (Discovery / Discussion Prototypes) (PDF p.216-219, impr. 200-203) [pareamentos terminam em p.219; resto continua no próximo bloco se houver]
Resumo: Vídeo curto que explica a ideia; precisa de tráfego e CTA; evidência baseada em views, compartilhamentos, cliques e comentários.
Conceitos e regras:
- Ideal para explicar a proposta de valor em escala; capabilities Design/Product/Technology [p.216].
- Estrutura do roteiro (conexões): abrir com a dor principal do Customer Profile; introduzir a solução (Value Map) para a dor; ilustrar o ganho do Customer Profile; fechar com CTA [p.217].
- Executar: publicar, gerar tráfego, interagir com comentários; analisar: views e shares, CTR, conversão de quem chega ao destino; é comum ter versões diferentes por cliente-alvo e plataforma [p.217].
- Evidência: views únicas e shares = FRACA; cliques = mais forte; comentários = fraca (qualitativo) [p.218]. Run time longo (semanas a meses), vídeo viral é exceção [p.218].
- Requisito: tráfego (anúncios, mídia social, e-mail, tráfego existente, boca a boca, fóruns) [p.218].
- Pareamentos: antes = Data Sheet, Storyboarding; depois = Email Campaign, Pretend to Own (p.208), Simple Landing Page, Card Sorting (p.222) [p.219].
Citações curtas de prova:
- "Views and shares are relatively weak evidence." [p.218]
O que este trecho NÃO diz: sem meta numérica de CTR.
Relevância: hypothesis-and-experiments: MÉDIA; product-discovery-assistant: BAIXA.
Decisão sugerida: usar em hypothesis-and-experiments (catálogo).

---

## Catálogo de experimentos deste bloco (nome, 1 linha, página)
- Web Traffic Analysis: análise de analytics para achar abandono no fluxo; mostra o quê, não o porquê [p.147-149]
- Discussion Forums: buscar jobs/dores/ganhos e workarounds em fóruns [p.150-153]
- Sales Force Feedback: extrair near misses e pedidos da força de vendas [p.154-157]
- Customer Support Analysis: minerar dados de suporte por jobs/dores/ganhos [p.158-161]
- Online Ad (Social Media Ad push, Search Only Ad pull): anúncio com CTA e landing [p.162-167]
- Link Tracking: link único rastreável com CTA [p.168-171]
- Feature Stub: botão de feature não pronta, alvos 15%/5%/3%, 1-3 dias [p.172-175]
- 404 Test: variante do stub sem nada atrás; só horas; parece produto quebrado [p.176-177]
- Email Campaign: série drip com meta; opens/clicks/respostas [p.178-183]
- Social Media Campaign: conteúdo agendado; conversão forte, engajamento fraco [p.184-187]
- Referral Program: códigos para advocates; alvos 15-20%, 50-80%, 5-15% [p.188-191]
- 3D Print: protótipo físico impresso; fraco; depois de baixa fidelidade [p.192-197]
- Paper Prototype: esboços em papel manipulados por pessoa; tarefas [p.198-201]
- Storyboard: ilustrações em sequência; 8-12 alternativas de proposta de valor [p.202-205]
- Data Sheet: folha de especificações para clientes/parceiros; 15 min por teste [p.206-209]
- Brochure: folheto físico presencial; sinal forte 15%+; risco de falso negativo [p.210-215]
- Explainer Video: vídeo com CTA; views/shares fracos, cliques mais fortes [p.216-219]
- Casos de estudo (Hypothesis/Experiment/Evidence/Insights/Actions): Product Hunt (Email Campaign) [p.182-183], NSA CubeSat (3D Print) [p.196-197], American Family Farm and Ranch (Brochure) [p.214-215]

## Candidatos a regra (aplicáveis por um agente, com citação literal)
1. Evidência de comportamento mede o quê, não o porquê; combinar com pergunta ao usuário (Web Traffic Analysis -> Validation Survey/Customer Interviews). "You don't know why they are doing it until you ask them." [p.148]
2. Pedido de feature é evidência fraca; testar o job/dor subjacente. "Feature requests are relatively weak evidence" [p.152, repetido p.156, p.160]
3. Workaround de clientes é evidência forte. "it's strong evidence if people are hacking together their own methods" [p.152]
4. Near miss (quase não comprou, mas comprou) é evidência relativamente forte porque acabou de converter [p.156].
5. Dados de suporte em volume, não conversas anedóticas, para análise valer. "should consist of more than one-off, anecdotal conversations" [p.160]
6. Não tomar decisões grandes e arriscadas com poucos dias de dados de tráfego [p.148].
7. Feature Stub: alvos 15% (botão), 5% (learn more), 3% (survey); duração máxima 1-3 dias; toggle obrigatório; só produto com usuários ativos diários; não para funcionalidade crítica da missão. "Aim for a 15% conversion on button click." [p.174]
8. 404 Test: no máximo horas; custa a percepção de produto quebrado. "do not run it for more than a few hours" [p.176]
9. Teste rápido para sair de debate de opinião; "Making progress is far more important than being correct" [p.177].
10. Anúncios: pausar, iterar texto/imagem e relançar se gasto alto com CTR baixo; rodar pelo menos uma semana; evitar dependência de aquisição paga cedo [p.164-166].
11. Hierarquia de força de evidência em canais: cliques/views/engajamento = fraca; conversão = forte; clique combinado com conversão em landing = mais forte [p.166, p.186].
12. Email Campaign precisa de uma meta antes de criar. "Create a goal before putting in the effort to create the email campaign." [p.180]
13. Referral: alvos 15-20% advocate share, 50-80% friend CTR, 5-15% friend conversion; testar só com clientes já apaixonados [p.190].
14. Brochure: sinal forte 15%+ de CTA; qualidade ruim causa falso negativo; contato por iniciativa do cliente é sinal melhor que e-mail em landing [p.212].
15. Brochure/caso: definir meta antes (20%), comparar com resultado (15%), segmentar o nicho e repetir [p.214-215].
16. Protótipos: começar em baixa fidelidade antes de 3D print/high fi. "make sure you've spent time testing faster, lower fidelity experiments" (paráfrase do texto em [p.194]).
17. Storyboard: brainstorm de 8-12 propostas de valor alternativas antes de esboçar [p.203]; segmento definido antes [p.204].
18. Cada experimento termina com atualização do Value Proposition Canvas e escolha do próximo experimento (pareamento Before/After em cada cartão) [p.151, p.155, p.159, p.193, p.199].
19. B2B: segmentar perguntas por papéis decision makers, economic buyers, recommenders, influencers [p.155].
20. Formato de registro de caso: Hypothesis / Experiment / Evidence / Insights / Actions [p.182-183, p.196-197, p.214-215].

## Checklist de cobertura
- Primeira página lida: 147
- Última página lida: 219
- Páginas sem texto útil ou ilegíveis: p.176 e p.177 (diagrama da árvore de decisão do 404 Test, só rótulos em texto); capas dos experimentos (p.150, 154, 158, 162, 168, 172, 178, 184, 188, 192, 198, 202, 206, 210, 216) têm texto curto e escalas em ícones; p.182, 196, 214 (abertura de estudos de caso) com pouco texto
- Problemas de extração observados: (a) escalas de Cost, Evidence Strength, Setup Time, Run Time das capas e o rótulo D/F/V (Desirability/Feasibility/Viability) são ícones gráficos: conteúdo visual não lido, não registrei nenhuma classificação de ícone; (b) o diagrama "Seeking a solution / Aware of the problem / Have the problem" (Steve Blank) em p.163 só tem rótulos; (c) página Details em duas colunas intercaladas: as linhas se misturam, a associação métrica-texto foi reconstruída pelo contexto e é a principal fonte de risco de erro; (d) fórmulas de taxa no livro aparecem com numerador/denominador invertidos (feature stub, CTR de link/social/e-mail/referral, "open rate"); registrei apenas os alvos numéricos; (e) "Target 5% –1  5%" corrigido para 5%-15%; (f) pareamentos referenciam páginas IMPRESSAS (PDF - 16); (g) caso Brochure: alvo 20% vs. resultado 15% sob "Evidence", ambiguidade registrada; (h) caso 3D Print: parte do texto de hipótese ("The NSA team believed that…") está truncado na extração
- Capítulos/seções cobertos integralmente: Discussion Forums, Sales Force Feedback, Customer Support Analysis, Online Ad, Link Tracking, Feature Stub (+ 404 Test), Email Campaign (+ Product Hunt), Social Media Campaign, Referral Program, 3D Print (+ NSA), Paper Prototype, Storyboard, Data Sheet, Brochure (+ American Family)
- Capítulos/seções que continuam em outro bloco: Web Traffic Analysis (início na p.146, bloco anterior); Explainer Video (termina com pareamentos em p.219 impr. 203, completo neste bloco)
