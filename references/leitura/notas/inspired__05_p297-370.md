# Inspired (Cagan, 2ª ed.) - bloco 05, PDF p.297-370 (impr. 277-349 + EULA)

Convenção: página impressa = PDF - 20 (ex.: PDF 297 = impr. 277). Citações literais em inglês; paráfrases em português.

### Cap. 56 Testing Business Viability (PDF p.297-302, impr. 277-282) [continua do bloco anterior]
Resumo: Uma solução amada pelos clientes e construível não basta; ela precisa funcionar para o negócio. O capítulo lista os stakeholders típicos, suas preocupações e como o PM testa viabilidade de negócio com cada um. Fecha distinguindo três formas de "mostrar o protótipo".
Conceitos e regras:
- Viabilidade de negócio exige: modelo de negócio viável (custo de produzir, comercializar e vender bem menor que a receita), cumprir leis dos países de venda, honrar acordos e parcerias, caber na promessa de marca da empresa [p.297].
- Ser "CEO do produto" é, segundo o autor, proteger receita, reputação, funcionários e clientes da empresa; é a parte que separa PMs bons dos ótimos e a que muitos PMs menos gostam [p.297-298].
- A lista de stakeholders é comum, mas toda empresa pode ter stakeholders próprios; não estar listado não significa que não seja crítico [p.298].
- Risco central: o time comercializa e entrega, e só depois descobre que viola uma restrição e não pode lançar. Quando isso ocorre "é do PM"; cabe ao PM entender cada restrição relevante e agir de forma positiva para trabalhar dentro dela [p.298].
- Marketing: cuida de habilitar vendas, marca/reputação, competitividade e diferenciação. Se a proposta pode afetar canal de vendas, grandes programas de marketing ou sair da "brand promise" (faixa do que os clientes esperam da empresa), mostrar protótipos ao marketing ANTES de construir e buscar soluções para as preocupações [p.298].
- Vendas: produtos de sucesso costumam ser desenhados em torno dos pontos fortes e limites do canal. Venda direta é cara e exige produto/preço de alto valor; se o produto exige habilidades diferentes das que a força de vendas tem, ela pode rejeitá-lo. Se a proposta foge do que o canal já provou vender, sentar com a liderança de vendas e mostrar antes de construir [p.299].
- Customer Success: entender se a empresa tem modelo high-touch ou low-touch e alinhar o produto; se a proposta muda isso, discutir com a liderança. Num modelo high-touch, essas pessoas são ótimas fontes de insights e para testar protótipos [p.299].
- Finance: restrições incluem poder arcar com construir, vender e operar; analytics/relatórios e relações com investidores também podem estar em finanças. Havendo questão de custo, modelar custos com alguém de finanças é crítico para mostrar à liderança que há abordagem viável [p.299-300].
- Legal: privacidade, compliance, propriedade intelectual, questões competitivas. Conversar cedo com jurídico sobre o que se propõe [p.300].
- Business Development: contratos com parceiros trazem compromissos e restrições; podem aleijar a competitividade ou ser grande vitória; entender o impacto no produto [p.300].
- Security: normalmente parte da engenharia, mas destacada; para qualquer coisa minimamente relacionada a segurança, levar o tech lead e conversar cedo com a liderança de segurança [p.300].
- CEO/COO/GM: provavelmente conhece e se preocupa com todas as restrições; se o PM não as conhece ou não tem plano, o executivo não confia no PM/time [p.301].
- Definição operacional: testar viabilidade de negócio é garantir que a solução proposta funciona dentro das restrições de cada área; os stakeholders impactados devem poder revisar a proposta e ter suas preocupações tratadas [p.301].
- Três técnicas distintas de "mostrar o protótipo" [p.301-302]:
  - User test: testar ideias com usuários/clientes reais; técnica qualitativa de usabilidade e valor; o usuário conduz ("drive"); objetivo: testar usabilidade e valor.
  - Product demo: vender o produto a prospects/clientes ou evangelizar internamente; ferramenta de venda/persuasão; geralmente roteirizada por product marketing; o PM conduz quando pedido (clientes de alto valor, execs); objetivo: mostrar o valor.
  - Walkthrough: mostrar o protótipo a um stakeholder para que ele veja e anote tudo que possa ser preocupação; PM geralmente conduz, mas o stakeholder pode mexer; objetivo: dar toda chance de o stakeholder achar um problema; não vender, não testar nele, não esconder nada.
- Erros de iniciante: fazer walkthrough com prospect quando deveria ser demo; fazer demo durante um user test e depois perguntar ao usuário o que achou [p.302]. Ser claro sobre qual das três se está fazendo e dominar as três [p.302].
Citações curtas de prova:
- "The costs to produce, market and sell your product must be sufficiently less than the revenue your product generates." [p.297]
- "You are not trying to sell them anything, you're not trying to test on them, and you're definitely not trying to hide anything from them." [p.302]
- "we let the user drive" [p.301]
O que este trecho NÃO diz: não dá lista de perguntas por stakeholder, template, nem critério numérico de viabilidade; não define "modelo de negócio" além da regra custo < receita; não trata de unit economics, pricing ou métricas.
Relevância: prd-writer: MÉDIA, lista de stakeholders/restrições vira seção "restrições de negócio e aprovações" do PRD; product-discovery-assistant: ALTA, quarto risco (viabilidade de negócio) com stakeholders e momento de teste; hypothesis-and-experiments: MÉDIA, distinção user test x demo x walkthrough evita testes enviesados; product-metrics: BAIXA.
Decisão sugerida: usar em product-discovery-assistant (risco de viabilidade de negócio, stakeholders) e hypothesis-and-experiments (user test vs demo vs walkthrough).

### Cap. 57 Profile: Kate Arnold of Netflix (PDF p.303-305, impr. 283-285)
Resumo: História da PM do Netflix em 1999 (~300 mil clientes, quase falindo): teste de assinatura mensal ilimitada. Resolver o custo de estoque de lançamentos gerou fila, ratings e recomendação; billing reescrito; lançado em ~3 meses.
Conceitos e regras:
- Teste do modelo de assinatura mostrou apelo, mas criou problema de custo (clientes querem lançamentos, mais caros); o desafio de produto virou levar clientes a pedir mix de títulos caros e baratos, daí fila/ratings/recomendações como inovações movidas por tecnologia que viabilizaram o modelo de negócio [p.304].
- Lançaram sem o novo billing graças ao mês grátis de 30 dias [p.304-305]. PM trabalhou com fundadores, usuários, analytics, finanças, marketing e armazém [p.305].
- Anedota: tentaram vender a Blockbuster por US$ 50 milhões, recusado [p.305].
Citações curtas de prova:
- "Those were the technology-powered innovations that enabled the new, much more desirable business model." [p.304]
O que este trecho NÃO diz: não detalha método de teste, métricas, tamanho de amostra ou resultados numéricos do teste de assinatura.
Relevância: product-discovery-assistant: BAIXA (exemplo de viabilidade de negócio guiando solução); demais: NENHUMA.
Decisão sugerida: descartar (anedótico), no máximo exemplo.

### Parte "Transformation Techniques" Overview (PDF p.306, impr. 286)
Resumo: Mudar para técnicas modernas é difícil porque a mudança é cultural: de times mercenários, guiados por roadmap e por output, para times empoderados medidos por resultado de negócio, o que implica transferir poder da gestão para os indivíduos [p.306].
O que NÃO diz: sem plano de transformação aqui. Relevância: NENHUMA. Decisão: descartar.

### Cap. 58 Discovery Sprint Technique (PDF p.307-310, impr. 287-290)
Resumo: Discovery sprint = time box de uma semana de trabalho de discovery para atacar um problema ou risco substancial. Baseia-se no livro Sprint (Knapp, Zeratsky, Kowitz, GV); também apresenta discovery coaches.
Conceitos e regras:
- Definição exata: "a one-week time box of product discovery work, designed to tackle a substantial problem or risk your product team is facing" [p.307, repetida p.308]. O autor prefere "discovery sprint" a "design sprint" porque o trabalho, bem feito, vai além de design [p.307].
- Útil como técnica de transformação, de planejamento de discovery ou de prototipação de discovery; bom para quem luta com o conceito de MVP [p.307].
- Em uma semana o time explora dezenas de ideias/abordagens visando um problema de negócio significativo, e sempre termina validando a solução potencial com usuários e clientes reais [p.308].
- Estrutura de 5 dias (segundo o livro Sprint, resumida): enquadrar o problema (mapear espaço do problema, escolher o problema e o cliente-alvo), seguir várias abordagens de solução, afunilar e detalhar, criar protótipo de usuário de alta fidelidade, testar com usuários-alvo reais observando reações [p.308]. Os dias nominais não são enumerados no texto.
- Quando recomendar discovery sprint: (1) algo grande, crítico e/ou difícil; (2) time aprendendo discovery; (3) tudo lento demais e o time precisa recalibrar a velocidade [p.309].
- Discovery coaches: ex-PMs ou ex-designers (ou líderes) de empresas de produto líderes; diferem de Agile coaches (que em geral só conhecem entrega: "Agile delivery coaches"). Trabalham ~1 semana com um time, cobrindo ciclos de ideação, protótipos e validação com clientes (reação), engenheiros (viabilidade) e stakeholders de negócio (se funciona para o negócio) [p.309-310]. Lean Startup coaches focam também modelo de negócio e estratégia de vendas/marketing; o autor defende que precisam ser fortes em produto [p.310].
Citações curtas de prova:
- "a one-week time box of product discovery work, designed to tackle a substantial problem or risk your product team is facing." [p.307]
- "You'll always end your week by validating your potential solution with real users and customers." [p.308]
O que este trecho NÃO diz: não detalha o passo a passo dos 5 dias (remete ao livro Sprint); não dá agenda, papéis, número de usuários a testar.
Relevância: product-discovery-assistant: MÉDIA, definição e gatilhos para sprint; hypothesis-and-experiments: MÉDIA, sprint termina sempre com teste com usuários reais e protótipo de alta fidelidade; prd-writer: BAIXA; product-metrics: NENHUMA.
Decisão sugerida: usar em product-discovery-assistant (quando propor discovery sprint) com a definição exata.

### Cap. 59 Pilot Team Technique (PDF p.311-312, impr. 291-292)
Resumo: Aplica a curva de adoção de tecnologia à organização; mudança total de uma vez desperta resistência de retardatários, então usar times-piloto voluntários.
Conceitos e regras:
- Pilot teams: lançar a mudança em parte limitada da organização; buscar um time voluntário; deixar rodar "usually a quarter or two" (um ou dois trimestres) [p.311].
- Sucesso medido comparando eficácia em entregar resultados de negócio: objetivos do piloto vs. outros times ou vs. o passado; comparação qualitativa dada a natureza do experimento [p.312].
- Condições para maximizar sucesso: pessoas abertas a novos modos, pessoas-chave co-locadas, time com controle de como trabalha e pouco dependente de times no modo antigo [p.312].
O que NÃO diz: sem métricas específicas, sem critério de sucesso numérico.
Relevância: todos os candidatos: BAIXA/NENHUMA (adoção organizacional). Decisão: descartar.

### Cap. 60 Weaning an Organization Off Roadmaps (PDF p.313-314, impr. 293-294)
Resumo: Para organizações viciadas em roadmap trimestral: manter o roadmap por 6 a 12 meses, mas sempre associar cada item ao resultado de negócio pretendido e mostrar o impacto depois do lançamento.
Conceitos e regras:
- Plano: continuar o processo de roadmap existente por seis a 12 meses; imediatamente, toda vez que citar um item de roadmap, lembrar o resultado de negócio que ele deve ajudar [p.313].
- Exemplo do livro: adicionar PayPal como meio de pagamento para aumentar conversão; mostrar sempre a taxa de conversão atual e o resultado esperado; após o lançamento, destacar o impacto na conversão [p.313-314].
- Se bom, celebrar; se não, enfatizar que a feature foi entregue mas o resultado não foi alcançado, apontar o que foi aprendido e dizer que há outras ideias para chegar ao resultado [p.314]. A transição pode levar até um ano [p.314].
- Por que stakeholders gostam de roadmaps: (1) visibilidade e garantia de que se trabalha nos itens mais importantes; (2) planejar o negócio e saber quando coisas críticas acontecerão [p.314].
- Alternativa moderna: times trabalham objetivos de negócio priorizados pelos líderes; resultados-chave compartilhados de forma transparente; compromissos de alta integridade quando datas de entrega críticas são necessárias [p.314].
Citações curtas de prova:
- "the result was not successful" (contexto: feature entregue sem o resultado esperado) [p.314]
- "high-integrity commitments when critical delivery dates are needed" [p.314]
O que NÃO diz: não define OKR formalmente aqui; não dá fórmula de impacto.
Relevância: product-metrics: MÉDIA, ligar feature a métrica de resultado (ex. conversão), medir antes/depois e declarar fracasso de resultado mesmo com entrega; prd-writer: MÉDIA, PRD deve declarar o resultado de negócio e a métrica-alvo atual vs esperada, não só a feature; hypothesis-and-experiments: BAIXA; product-discovery-assistant: BAIXA.
Decisão sugerida: usar em product-metrics e prd-writer (campo "resultado de negócio esperado + baseline").

### Process @ Scale, Overview (PDF p.315-316, impr. 295-296)
Resumo: Empresas grandes ficam avessas a risco e institucionalizam processos; processos que governam produção de produto podem parar a inovação (ex.: "Agile at Scale" de consultorias). Não precisa ser assim; as técnicas do livro visam manter a capacidade de inovar [p.315-316].
Relevância: NENHUMA/BAIXA. Decisão: descartar.

### Cap. 61 Managing Stakeholders (PDF p.317-324, impr. 297-304)
Resumo: Define stakeholder, responsabilidades do PM e técnicas: 1:1 com stakeholders, mostrar solução em discovery (não depois de construída), usar protótipo de alta fidelidade em vez de apresentações, trocar opinião por dados. Inclui o quadro "Devolving from Good to Bad" (anti-padrão de contratação).
Conceitos e regras:
- Teste prático de stakeholder: tem poder de veto ou pode de outro modo impedir o lançamento [p.318]. Quem só tem ideias/opiniões faz parte da "comunidade" e é mais uma fonte de input [p.317-318].
- Grupo típico: equipe executiva (CEO e líderes de marketing, vendas, tecnologia); parceiros de negócio; finanças; jurídico; compliance; business development [p.318]. Startups têm poucos stakeholders; grandes empresas têm mais, para proteger ativos [p.318].
- Responsabilidade do PM: entender considerações e restrições dos stakeholders e trazer esse conhecimento ao time; senão se constrói algo que funciona para o cliente mas não pode ser implantado na reunião de revisão, e a empresa perde confiança no time [p.318-319].
- Além disso, convencer cada stakeholder, com sinceridade, de que o PM entende as questões e se compromete com soluções que funcionem para cliente e para o stakeholder; sem essa confiança, o stakeholder escala ou tenta controlar [p.319].
- Sucesso: stakeholders respeitam, confiam que o PM entende suas preocupações, o mantêm informado de decisões, e dão espaço para soluções melhores, mesmo diferentes do que imaginavam [p.319]. Pré-requisito: PM competente com profundo entendimento de clientes, analytics, tecnologia, indústria e negócio; demonstra-se compartilhando abertamente o que aprende [p.319].
- Técnica-chave: tempo 1:1 com stakeholders-chave; ouvir; explicar que quanto melhor entender as restrições, melhores as soluções; fazer muitas perguntas [p.320].
- Erro comum 1: mostrar a solução depois de construída, gerando frustração e retrabalho; comprometer-se a mostrar soluções AOS stakeholders chave durante discovery, antes de colocar no backlog [p.320]. Na discovery se garante: valiosa e usável (clientes), viável (engenheiros) e apoiada pelos stakeholders [p.320].
- Erro comum 2: opinião do PM vs. do stakeholder (o stakeholder costuma ganhar por senioridade). Mudar o jogo rodando rapidamente um teste e coletando evidência; mover de opiniões para dados; compartilhar o que aprende; pode ser que nenhuma opinião estivesse certa [p.320].
- Custo de tempo: cerca de duas a três horas por semana, meia hora com cada stakeholder-chave; sugestão: almoço ou café semanal com os mais envolvidos [p.320].
- Anti-padrão: reunião de grupo com todos os stakeholders e apresentação PowerPoint para testar viabilidade. Problema 1: apresentações são ambíguas; advogado precisa ver telas, páginas e textos reais; marketing quer ver o design real; segurança precisa ver exatamente o que o produto tenta fazer [p.320-321]. Problema 2: grupo não é fórum para projetar bons produtos (design por comitê) [p.321].
- Regra forte: não confiar em aprovação de nada que não seja protótipo de usuário de alta fidelidade; execs que concordam com apresentação e depois se chocam ao ver o produto real [p.321]. Fazer reuniões privadas, uma a uma, mostrando o protótipo de alta fidelidade e dando chance de levantar preocupações [p.321].
- Alguns stakeholders não entendem o que é o papel de produto ou se sentem ameaçados; explicar o papel [p.321].
- Quadro "Devolving from Good to Bad" (PDF p.321-324): anti-padrão em empresas de crescimento que contratam líderes seniores de empresas de marca que pararam de inovar; eles trazem processos e contratam gente igual. Dois antídotos: cultura de produto muito forte e intencional, estabelecida; e deixar explícito na entrevista/onboarding [p.323-324]. O problema é menos "empresa grande" e mais "empresa não forte em produto" [p.323].
Citações curtas de prova:
- "One practical test of whether a person is considered a stakeholder is whether or not they have veto power" [p.318] (texto: "...veto power, or can otherwise prevent your work from launching")
- "Presentations are notoriously terrible for testing business viability." (texto: "presentations are notoriously terrible for testing business viability") [p.321]
- "Move the discussion from opinions to data." [p.320]
- "I plead with product managers in larger companies to not trust a sign-off on anything other than a high-fidelity prototype." [p.321]
O que este trecho NÃO diz: não oferece matriz poder/interesse nem RACI; não diz que PRD/documento é proibido, apenas que apresentação (slides) é ambígua e não serve para sign-off; não fornece roteiro de pauta da conversa 1:1.
Relevância: prd-writer: ALTA, sign-off só sobre protótipo de alta fidelidade, não slides; stakeholders com poder de veto; preview na discovery antes do backlog; product-discovery-assistant: ALTA, risco de viabilidade de negócio, 1:1 com stakeholders, dados em vez de opinião; hypothesis-and-experiments: MÉDIA, resolver impasse de opinião com teste rápido; product-metrics: NENHUMA.
Decisão sugerida: usar em prd-writer (fluxo de aprovação) e product-discovery-assistant (mapa de stakeholders e viabilidade).

### Cap. 62 Communicating Product Learnings (PDF p.325-326, impr. 305-306)
Resumo: Em escala, compartilhar aprendizados é mais difícil e mais importante. Técnica: head of product, em all-hands a cada uma ou duas semanas, dedica 15 a 30 minutos aos grandes aprendizados da discovery.
Conceitos e regras:
- Apenas grandes aprendizados (o que funcionou, o que não funcionou, o que os times planejam tentar na semana seguinte), rápido; não é cada PM apresentando por 1-2 horas, nem repetição de sprint reviews [p.325].
- Propósitos: compartilhar aprendizados, sobretudo quando não saíram como esperado (a plateia pode ter insight); manter times atualizados e líderes informados; focar em grandes aprendizados e não experimentação menor sem impacto em cliente/negócio; cultura de experimentos rápidos contínuos; transparência e generosidade do produto, que não existe "para servir o negócio" mas para resolver problemas de clientes de forma que funcione para o negócio [p.326].
Citações curtas de prova:
- "to solve problems for our customers in ways that work for our business" [p.326]
O que NÃO diz: sem template de relato de aprendizado.
Relevância: hypothesis-and-experiments: BAIXA/MÉDIA (comunicar aprendizados relevantes, não minúcias); product-metrics: BAIXA. Decisão: opcional, uma regra curta.

### Cap. 63 Profile: Camille Hearst of Apple (PDF p.327-328, impr. 307-308)
Resumo: PM do iTunes; integração com American Idol: cuidado para a tendência de vendas do iTunes não influenciar a votação, persona-alvo, facilitar acesso ao iTunes. Exemplo de solução criativa para problema difícil [p.328]. Relevância: NENHUMA. Descartar.

### Parte V The Right Culture (PDF p.329-330) e Cap. 64 Good Product Team/Bad Product Team (PDF p.331-334, impr. 311-314)
Resumo: Lista de contrastes entre times bons e ruins. Muitos pontos tocam discovery, protótipos e métricas.
Conceitos e regras (bons vs. ruins, paráfrase):
- Bons times perseguem visão com paixão de "missionários"; ruins são "mercenários" [p.332].
- Bons: ideias vêm de visão/objetivos, observação do sofrimento do cliente, análise de dados de uso e aplicação de nova tecnologia. Ruins: "gather requirements" de vendas e clientes [p.332].
- Bons conhecem stakeholders e suas restrições e inventam soluções que funcionam dentro delas. Ruins: coletam requisitos de stakeholders [p.332].
- Bons dominam técnicas para testar ideias rapidamente; ruins fazem reuniões para gerar roadmaps priorizados [p.332].
- Bons têm produto, design e engenharia lado a lado; ruins em silos, pedidos por documentos e reuniões de agendamento [p.332].
- Bons testam novas ideias protegendo receita e marca; ruins esperam permissão para rodar teste [p.333].
- Bons garantem que engenheiros tenham tempo de experimentar os protótipos da discovery todos os dias; ruins mostram protótipos a engenheiros no sprint planning para estimar [p.333].
- Bons falam com usuários/clientes toda semana; ruins acham que são o cliente [p.333].
- Bons sabem que muitas ideias favoritas não funcionam e as que funcionam exigem várias iterações; ruins só constroem o roadmap e se satisfazem com datas e qualidade [p.333].
- Velocidade vem de técnicas certas e não de trabalho forçado [p.333].
- Bons fazem compromissos de alta integridade após avaliar o pedido e garantir solução viável para cliente e negócio [p.333].
- Bons instrumentam o trabalho para entender uso imediatamente e ajustar; ruins tratam analytics/relatórios como "nice to have" [p.333].
- Bons integram e liberam continuamente, releases menores; ruins testam manualmente no fim [p.333-334].
- Bons obcecam por clientes de referência; ruins por concorrentes [p.334].
- Bons comemoram impacto significativo nos resultados de negócio; ruins comemoram quando finalmente lançam algo [p.334].
Citações curtas de prova:
- "Bad teams gather requirements from sales and customers." [p.332]
- "Good teams instrument their work so they can immediately understand how their product is being used" [p.333]
- "Bad teams celebrate when they finally release something." [p.334]
- "Bad teams show the prototypes to the engineers during sprint planning so they can estimate." [p.333]
O que NÃO diz: não prescreve formato de especificação; só contrasta "requisitos" como mau sinal e "documentos" como forma de silos.
Relevância: prd-writer: ALTA, requisitos coletados de vendas/clientes/stakeholders e pedidos via documentos são marcas de time ruim; protótipo na discovery, não só em sprint planning; product-metrics: MÉDIA, instrumentação como obrigatória, celebrar impacto e não entrega; product-discovery-assistant: ALTA, contato semanal com clientes, engenheiros na discovery; hypothesis-and-experiments: MÉDIA, ideias favoritas falham e exigem iterações.
Decisão sugerida: usar como antipadrões em prd-writer e product-discovery-assistant.

### Cap. 65 Top Reasons for Loss of Innovation (PDF p.335-338, impr. 315-317)
Resumo: "Consistent innovation" = capacidade do time de repetidamente agregar valor ao negócio [p.335]. Perder inovação em escala não é inevitável (Amazon, Google, Facebook, Netflix). Dez atributos ausentes [p.335-337]:
1. Customer-centric culture (contato direto e frequente com clientes) [p.335-336].
2. Compelling product vision (visão original realizada/fundadores saíram; CEO ou VP Product precisa preencher) [p.336].
3. Focused product strategy: "tentar agradar a todos de uma vez" é caminho para falhar; estratégia deve explicitar sequência lógica e intencional de mercados-alvo [p.336].
4. Strong product managers [p.336].
5. Stable product teams (aprender espaço, tecnologias e dor do cliente) [p.336].
6. Engineers in discovery: desde o início e expostos diretamente à dor do cliente [p.336].
7. Corporate courage: "the riskiest strategy of all is to stop taking risks" [p.337].
8. Empowered product teams: empowerment = resolver os problemas de negócio atribuídos do melhor modo; regressão a roadmaps de features perde isso [p.337].
9. Product mindset (servir clientes de modo que atenda ao negócio) vs. IT mindset (servir ao negócio) [p.337].
10. Time to innovate: times consumidos por keep the lights on (bugs, capacidades para outras áreas, dívida técnica) [p.337].
Conclusão: lista descreve cultura de inovação consistente, mais cultura que processo [p.337].
Citações curtas de prova:
- "the riskiest strategy of all is to stop taking risks" [p.337]
- "One of the surest paths to product failure is to try to please everyone at once." [p.336]
O que NÃO diz: sem métricas de inovação nem diagnóstico quantitativo.
Relevância: product-discovery-assistant: MÉDIA (estratégia focada, engenheiros na discovery, tempo para inovar); prd-writer: BAIXA; product-metrics: NENHUMA. Decisão: usar parcialmente (checagem de saúde do time).

### Cap. 66 Top Reasons for Loss of Velocity (PDF p.339-341, impr. 319-321)
Resumo: Dez causas de lentidão [p.339-341]:
1. Technical debt (arquitetura não permite evolução rápida; ataque contínuo) [p.339].
2. Lack of strong product managers (time de mercenários) [p.339].
3. Lack of delivery management (remover impedimentos, crescem de forma não linear) [p.340].
4. Infrequent release cycles: liberar "no less frequently than every two weeks"; times muito bons liberam várias vezes por dia; exige automação de testes e de release [p.340].
5. Lack of product vision and strategy [p.340].
6. Lack of co-located, durable product teams (terceirização piora) [p.340].
7. Not including engineers early enough in discovery (alternativas mais rápidas de implementar) [p.340].
8. Not utilizing product design in discovery (design em paralelo à construção atrasa e piora) [p.340].
9. Changing priorities [p.341].
10. A consensus culture [p.341].
Citações curtas de prova:
- "Your team should release no less frequently than every two weeks" [p.340]
O que NÃO diz: sem medidas de velocity (story points etc.).
Relevância: product-discovery-assistant: MÉDIA (engenharia e design em discovery); product-metrics: BAIXA (frequência de release ao menos quinzenal como sinal); prd-writer: BAIXA. Decisão: opcional.

### Cap. 67 Establishing a Strong Product Culture (PDF p.343-346, impr. 323-326)
Resumo: Cultura de produto em duas dimensões: inovação (discovery) e execução (delivery) [p.343].
Cultura de inovação (7): experimentação (testes, muitos falham, aceitável); mentes abertas; empoderamento; tecnologia; times com saber de negócio e cliente (inclui desenvolvedores); diversidade de skills; técnicas de discovery (ideias testadas rápida e seguramente, protegendo marca, receita, clientes e colegas) [p.344].
Cultura de execução (8): urgência; compromissos de alta integridade; empoderamento; accountability (consequências sobretudo de reputação); colaboração; resultados ("is the focus on output or is the focus on results?"); reconhecimento [p.344-345].
Poucas empresas são fortes nas duas (Amazon exemplo); muitas boas em execução e fracas em inovação; "depressing number" ruins em ambas [p.345-346]. Sugere autoavaliação nas duas dimensões [p.346].
O que NÃO diz: não dá escala de pontuação nem questionário.
Relevância: todos os candidatos: BAIXA, contexto cultural. Decisão: descartar ou nota de contexto.

### Agradecimentos, Sobre o autor, Learning More, Índice, EULA (PDF p.347-370)
Estrutura apenas: Acknowledgments (p.347-348, impr. 327-328); About the Author (p.349-350, impr. 329-330); Learning More (p.351, impr. 331; cita svpg.com/examples e recommended-reading, sem conteúdo no livro); Index (PDF p.353-369, impr. 333?-349); EULA Wiley (p.370). Páginas 330, 338, 342, 352 em branco. No índice, entradas observadas: A/B testing p.266; Analytics for quantitative value testing p.267-270; Walkthrough p.282; Wizard of Oz prototype p.240; Waterfall process p.15-21 (não aprofundei; só estrutura).
Relevância: NENHUMA. Decisão: descartar.

## Candidatos a regra

1. Viabilidade de negócio como quarto risco, testado ANTES de construir com cada stakeholder impactado: marketing, vendas, customer success, finance, legal, business development, security, CEO/GM; se pega depois, "é do PM" [p.298, p.301]. Citação: "Testing business viability means making sure that the product solution that your team is proposing will work within the constraints of each of these areas." (literal, p.301).
2. Definição operacional de stakeholder: quem tem poder de veto ou pode impedir o lançamento; os demais são "comunidade" [p.318]. Citação: "whether or not they have veto power, or can otherwise prevent your work from launching" [p.318].
3. Sign-off apenas sobre protótipo de alta fidelidade, nunca sobre apresentação; reuniões 1:1, não em grupo [p.321]. Citação: "I plead with product managers in larger companies to not trust a sign-off on anything other than a high-fidelity prototype." [p.321]
4. Mostrar a solução a stakeholders-chave durante discovery, antes de entrar no backlog [p.320]. Citação: "commit to previewing your solutions during discovery with the key stakeholders before you put this work on the product backlog" (próximo do original, p.320).
5. Impasse de opinião PM vs. stakeholder resolve-se com teste rápido e evidência [p.320]. Citação: "Move the discussion from opinions to data." [p.320]
6. Três modos de mostrar protótipo (user test: usuário dirige, qualitativo, valor/usabilidade; demo: PM dirige, persuadir; walkthrough: stakeholder, achar problemas, sem vender nem testar nem esconder); nunca fazer demo dentro de user test [p.301-302].
7. Cadência de stakeholders: ~2 a 3 horas por semana, ~30 min com cada stakeholder-chave [p.320].
8. Roadmap: ao citar um item, declarar o resultado de negócio, baseline atual e meta; após lançar, reportar o impacto e dizer explicitamente se o resultado não foi atingido apesar de ter sido entregue [p.313-314]. Citação: "the result was not successful" [p.314] (frase em contexto: feature entregue sem resultado).
9. Discovery sprint: 1 semana, termina sempre com validação com usuários/clientes reais e protótipo de alta fidelidade; indicar quando o problema é grande/crítico, o time é novo em discovery ou a velocidade está baixa [p.307-309].
10. Sinais de time ruim relevantes a PRD: coletar requisitos de vendas/clientes/stakeholders; mostrar protótipo a engenheiros só no sprint planning; analytics como nice to have; celebrar release em vez de impacto [p.332-334].
11. Releases ao menos a cada duas semanas [p.340].
12. Time-piloto: um a dois trimestres, voluntários, co-locados, autonomia; comparação qualitativa com outros times ou com o passado [p.311-312].

## Checklist de cobertura
- Primeira página lida: 297
- Última página lida: 370
- Páginas sem texto útil ou ilegíveis: 330, 338, 342, 352 (em branco); 370 (EULA); índice p.353-369 só estrutura (li o início e o fim, o restante registrado como índice sem detalhar)
- Problemas de extração observados: texto em duas colunas misturado nas pull quotes e em listas (ex.: p.298, 312, 336, 340); ligaduras "ﬁ" em títulos (Proﬁle, Netﬂix); ordem de linhas do índice embaralhada; o índice não foi lido linha a linha (instrução: só estrutura). Sem conteúdo visual não lido além de eventuais figuras não presentes no texto.
- Capítulos/seções cobertos integralmente: 56 (fim), 57, Transformation Techniques overview, 58, 59, 60, Process @ Scale overview, 61 (com quadro Devolving from Good to Bad), 62, 63, Parte V, 64, 65, 66, 67, Acknowledgments, About the Author, Learning More
- Capítulos/seções que continuam em outro bloco: nenhum (último bloco; Cap. 56 começa em PDF p.297, impr. 277, neste bloco)
