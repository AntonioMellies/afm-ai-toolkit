# Discovery segundo Cagan

Base: Marty Cagan, *Inspired* (2ª ed.). Páginas (`p.N`, marcador "PDF PAGINA N"; a numeração impressa é a do PDF menos 20) e citações em `fontes.md`. Paráfrase em português; o que não tem base está marcado como **convenção desta skill**. Números do autor (seis clientes de referência, 10 a 20 iterações por semana, 40%, duas a três horas) são **propostas dele**, sem base empírica independente: apresente-os como "o livro propõe". As figuras do livro (p.36, p.47) não foram lidas; só o texto. Os capítulos de equipes, liderança, objetivos de time, cultura e escala (caps. 13 a 21, 29 a 31, 59 a 67) não foram usados; dos papéis, só o que está na seção 8.

**Cuidado com a palavra "oportunidade".** Em Cagan, *opportunity assessment* (cap. 35) é o enquadramento de **um trabalho** (objetivo, resultado-chave, problema, mercado). Em Torres, oportunidade é uma **necessidade, dor ou desejo do cliente** que vive na árvore. Não são o mesmo objeto; ao escrever para o usuário, diga qual dos dois está em uso.

## 1. Os quatro riscos como lente de diagnóstico

Para qualquer ideia, solução pedida ou item de backlog, o livro pede responder quatro perguntas **com evidência**, e não só com a opinião do PM (p.185):

| Risco | Pergunta do livro (paráfrase) | Quem valida e com quê (p.139, p.193-194) |
|---|---|---|
| Valor | O cliente compra ou escolhe usar? Em produto novo: compra ao preço necessário e troca do que usa hoje? Em feature: escolhe usar? | Clientes e usuários reais |
| Usabilidade | O usuário consegue descobrir como usar? | Designer, com usuários reais |
| Viabilidade técnica (*feasibility*) | Conseguimos construir, com o tempo, as habilidades e a tecnologia que temos? | Engenheiros, em discovery e não no planejamento da sprint |
| Viabilidade de negócio | A solução funciona para o negócio? | Stakeholders de cada área afetada |

Pontos de uso:

- **Não confunda os dois "viability".** Viabilidade técnica é construir; viabilidade de negócio é caber no modelo, na marca, na lei, nos canais e nos acordos (p.297, p.301). Pedido legal ou de marca é viabilidade de negócio, não técnica.
- **Viabilidade de negócio tem áreas.** O livro lista financeiro, desenvolvimento de negócios, marketing, vendas, jurídico e ético (p.196) e, no cap. 56, também sucesso do cliente, segurança e a direção da empresa (p.298-301). Lista comum, não fechada: toda empresa pode ter stakeholders próprios.
- **Ética é risco adicional**, não um quinto item da lista central (p.188-189). Quando houver risco ético significativo, procure soluções alternativas; leve o assunto à gestão com entendimento do negócio, sem policiar a organização.
- **Viés do time.** Equipes tendem a ir direto ao risco em que se sentem confortáveis, em geral escala, desempenho ou usabilidade, que são os mais fáceis; o risco de valor fica de lado (p.196). Ao diagnosticar, pergunte qual risco o pedido está evitando.
- **Valor primeiro.** O livro afirma que o risco mais comum e mais importante é o de valor, e que é nele que se gasta a maior parte do tempo de discovery (p.131, p.186, p.210). Sem valor central, usabilidade e desempenho não salvam (p.186).
- **Quando não validar.** Se PM, designer e líder técnico não veem risco significativo e não há divergência no time, o livro aceita ir direto à entrega, assumindo errar de vez em quando, em vez de testar toda suposição (p.196-197). **Esta skill é mais estrita por convenção**: pede registrar quem avaliou cada risco e por quê, antes de dispensar a validação. Diga a diferença ao usuário.
- **Onde os testes de cada risco são desenhados** é com a skill `hypothesis-and-experiments`; aqui só se escolhe qual risco atacar primeiro.

## 2. Discovery, delivery e backlog validado

- São duas atividades paralelas e contínuas de um time multifuncional: discovery define o produto a construir (sobretudo PM e designer), delivery entrega o produto com qualidade de produção (sobretudo engenharia). Engenheiros ajudam diariamente em discovery; PM e designer ajudam em delivery, esclarecendo o comportamento esperado (p.46).
- Discovery trata os riscos antes de escrever uma linha de software de produção; a **saída é um backlog de produto validado** (p.47), não um documento de requisitos.
- O modelo que o livro critica é o de ideias, caso de negócio, roadmap, **requisitos**, design, construção, teste e implantação em sequência (p.36-37). Nele, os requisitos (user stories ou especificação funcional) são escritos para dizer a designers e engenheiros o que construir **antes** de qualquer validação, e o risco fica todo no fim (p.40). O livro não diz que toda especificação deva desaparecer: diz que requisitos escritos antes de validar os riscos são o problema.
- Premissas do livro para ideias: pelo menos metade não funciona (bons times assumem três quartos) e as que funcionam pedem várias iterações até entregar o resultado de negócio, o *time to money* (p.39, p.131-132). Consequência prática: um caso de negócio com receita e prazo, antes da solução, é chute (p.38).
- Ideia de discovery é barata: uma iteração de discovery deve custar pelo menos uma ordem de grandeza menos que uma de entrega, e o livro cita 10 a 20 iterações por semana em times competentes (p.190); o MVP, para ele, deve ser protótipo e não produto (p.50). O desenho dos testes fica com `hypothesis-and-experiments`.
- Para especificar o que entrou no backlog validado, use a skill `prd-writer`, se estiver instalada. Sem ela: registre objetivo, problema do cliente, mercado-alvo, o estado de evidência dos quatro riscos e o que ainda não foi validado, e nada de solução como se fosse certa (convenção desta skill).

## 3. Valor antes do modelo de negócio

- Em produto novo ou negócio novo, o livro apresenta o *startup canvas* para expor cedo os riscos de proposta de valor, receita, canais, custo e métrica (p.207-208). Avisa que times gastam tempo demais nele e adiam descobrir uma solução que as pessoas queiram comprar (p.208).
- Cagan considera o risco de valor (no canvas, "solution risk") o maior da maioria dos esforços; preço, canais e custos são riscos reais, mas o autor os chama de quase acadêmicos nesta fase (p.209-210). Resolva primeiro o risco de valor; não otimize preço, ferramentas de vendas ou custos antes de ter um produto realmente valioso (p.210).
- Paridade de funcionalidades não basta para fazer alguém trocar: a solução precisa ser demonstravelmente e substancialmente melhor (p.65, p.210).
- Em produto existente a maior parte do canvas só se repete; use as técnicas de enquadramento menores (p.208).

## 4. Enquadramento: *opportunity assessment* e irmãs

Por tamanho do esforço (p.197): *opportunity assessment* para a maioria dos trabalhos (da otimização ao projeto médio); *customer letter* para projetos ou iniciativas maiores com vários objetivos; *startup canvas* para produto ou negócio novo. Podem ser combinadas.

**Opportunity assessment (cap. 35, p.199-201).** Quatro perguntas que o PM responde, em poucos minutos, antes de começar discovery, e compartilha com o time e os stakeholders:

1. Qual objetivo de negócio este trabalho atende? (deve mapear para um objetivo atribuído ao time)
2. Como saberemos que deu certo? (resultado-chave; defina o "quanto é suficiente" no início; deve mapear para um resultado-chave do time)
3. Que problema isto resolve para o cliente? (mesmo trabalho interno deve ligar-se ao benefício do cliente final)
4. Qual o mercado-alvo? (persona, mercado específico ou *job to be done*; tentar agradar a todos termina em não agradar a ninguém)

O livro as trata como o mínimo, não como documento. Exceção que ele admite: um pedido estratégico da liderança (como apoiar uma parceria), quando raro; dê o contexto e as quatro perguntas ainda podem servir (p.201).

**Problema, não solução (p.197-198).** Pessoas, inclusive stakeholders e o próprio PM, falam em soluções; o trabalho é achar o problema por trás do pedido. As soluções iniciais, na maioria das vezes, não resolvem o problema de forma que sustente um negócio. Roadmaps típicos são listas de soluções.

**Customer letter (cap. 36, p.204-205).** Texto imaginário de lançamento (comunicado ou carta de um cliente feliz) que força falar do benefício em vez de listar funcionalidades. Serve para enquadrar e evangelizar; **não valida demanda**, porque o leitor são colegas, não clientes reais (p.204).

**Story map (cap. 38, p.214).** Citado só como técnica de planejamento: mapa de atividades do usuário na horizontal e detalhe na vertical, que dá contexto a user stories; ao fim da discovery as stories do mapa vão para o backlog. Detalhes de especificação ficam com `prd-writer`.

## 5. Discovery sprint (cap. 58)

- Definição: janela de **uma semana** de trabalho de discovery para atacar um problema ou risco substancial; o time explora dezenas de ideias e **sempre termina validando** a solução potencial com usuários e clientes reais (p.307-308).
- O livro resume o formato (enquadrar o problema, seguir várias abordagens, afunilar, protótipo de usuário de alta fidelidade, testar com usuários-alvo) e remete ao livro *Sprint* para o passo a passo (p.308-309). Esta skill não reproduz a agenda dos cinco dias.
- Quando propor (p.309): algo grande, crítico ou difícil; time aprendendo discovery; ritmo lento demais, para recalibrar velocidade.

## 6. Customer discovery program (cap. 39)

Técnica para esforços grandes (produto ou negócio novo, novo mercado ou geografia, redesenho), nunca para feature ou projeto pequeno (p.217). Desenvolve, em paralelo ao produto, um conjunto de **clientes de referência**.

- **Cliente de referência**, segundo o livro: cliente real, com o produto em produção, que pagou de verdade e aceita contar voluntariamente aos outros que gosta do produto (p.216).
- **Números que o livro propõe (B2B):** seis referências, num único mercado-alvo (vertical, segmento ou país); recrutar de seis a oito; no máximo oito participantes, com um programa de acesso antecipado à parte para os demais; não lançar no mercado antes das seis referências (p.218-220). O próprio autor diz que seis não é significância estatística: serve para dar confiança (p.218).
- **Quem recrutar:** quem sente a dor e está quase desesperado por solução (se houvesse outra, já teria comprado); filtre quem só se interessa pela tecnologia; exija pessoas e tempo para trabalhar de perto e testar protótipos (p.219).
- **O objetivo é um produto geral**, não a soma do que os seis pedem: o PM busca uma única solução que sirva bem aos seis (p.220). O autor prefere não cobrar adiantado, para não virar projeto sob encomenda (p.220).
- **Teste de realidade da demanda:** se há dificuldade real de recrutar até quatro ou cinco clientes, o problema provavelmente não é importante e será difícil vender (p.221).
- **Variações:** plataforma e API (resultado: aplicações de referência), ferramentas internas (seis a oito usuários influentes) e consumo (de 10 a 50 consumidores, além de testes mais amplos com quem nunca viu o produto) (p.222).
- **O que a técnica não faz:** não descobre o produto necessário; dá acesso direto ao mercado-alvo, onde estão as ideias (p.223). O livro a chama de seu melhor indicador antecedente de sucesso (p.217) e, entre as técnicas de planejamento, a que recomendaria se só pudesse uma (p.211).
- **Product/market fit** é definido pelo livro como o menor produto real que atende às necessidades de um mercado específico (p.48). Para B2B, o autor declara o fit de um mercado ao alcançar as seis referências (p.224). Para consumo, cita a pesquisa de Sean Ellis (mais de 40% "muito desapontados" indica boa chance de fit, com ressalvas de amostra, p.224); a leitura dessa evidência fica com `hypothesis-and-experiments` e `product-metrics`.

## 7. Visão, estratégia e resultados (só o que o texto sustenta)

- **Visão** (cap. 24): o futuro que se quer criar, em geral de dois a cinco anos (cinco a dez em hardware); não é a missão da empresa nem uma especificação, é uma peça persuasiva (p.143-144). **Estratégia:** a sequência de produtos ou releases rumo à visão, de preferência organizada em uma série de *product/market fits*, **um mercado-alvo por vez**; ideias para outros mercados ficam guardadas (p.144-145).
- **Priorizar mercados** (p.146-147): três entradas que o livro usa, sem fórmula: tamanho de mercado (TAM), distribuição (GTM, canal de vendas novo pesa contra um mercado maior) e uma estimativa grosseira de tempo (TTM). Servem para ordenar **mercados**, não oportunidades do cliente (veja a seção 9).
- **Princípios de visão** (cap. 25) usados aqui: apaixonar-se pelo problema e não pela solução (p.149-150); diferenciar *vision pivot* (sinal de organização fraca) de *discovery pivot* (ajustar o caminho, legítimo) (p.150). Os demais princípios são de comunicação e inspiração e foram descartados.
- **OKR** (cap. 28), como o livro o usa: objetivos qualitativos; resultados-chave quantitativos que medem **resultado de negócio**, não saída ou tarefa; de um a três objetivos com de um a três resultados-chave é o típico; o time propõe os resultados-chave dos objetivos que recebe (p.159-161). A escala de pontuação e os compromissos de alta integridade do capítulo ficam fora desta skill.

## 8. Papéis: só os critérios acionáveis

- **PM.** Responde pelo que entra no backlog; o difícil é garantir que valha a pena, e engenheiros e designers esperam ver evidência (p.63). Traz conhecimento de cliente, de dados, de negócio e stakeholders, e de mercado (p.66); a análise de dados não é delegável a um analista (p.64). Convencer cada stakeholder de que se entendem suas restrições é parte do trabalho (p.65). Não prescreve o "como" aos engenheiros e dá latitude (p.80-81). Dois modos de falha nomeados: escalar toda decisão ao CEO e reunir stakeholders para brigar (p.61). Em empresas de produto, PM e *product owner* devem ser a mesma pessoa; o papel de PO é um subconjunto do de PM (p.70).
- **Designer.** Parceiro pleno do PM em discovery, sentado ao lado, incluído desde a concepção da ideia e em contatos com clientes, sem receber ideias de design prontas; testa com usuários toda semana, e o teste avalia valor, não só usabilidade (p.73-78). O livro lista como problema grave o PM entregar só user stories de alto nível, forçando os engenheiros a inventar o design (p.76).
- **Engenheiro.** Conversa direta com o PM todo dia útil (ideias em discovery, esclarecimentos em delivery) (p.80). O líder técnico tem responsabilidade explícita de ajudar a achar a solução; nem todo engenheiro precisa participar de discovery, mas não é aceitável que nenhum queira (p.81-82). O primeiro contato do desenvolvedor com a ideia não deve ser o planejamento da sprint (p.188).
- Descartados por falta de critério acionável para discovery: composição, tamanho, localização e hierarquia dos times, marketing de produto e papéis de apoio, liderança, delivery manager e cultura.

## 9. Divergências lado a lado (sem fundir)

As colunas de Torres e Osterwalder citam apenas o que já está registrado em `fontes.md`.

| Tema | Cagan | Torres / Osterwalder |
|---|---|---|
| Palavra "oportunidade" | Enquadramento de um trabalho: objetivo, resultado-chave, problema, mercado (p.199) | Necessidade, dor ou desejo do cliente, nó da árvore (Torres p.24-25) |
| Priorização | Prioriza mercados com TAM, GTM e TTM, em decisão conjunta de liderança (p.146-147) | Compara oportunidades irmãs com quatro lentes, sem pontuar nem fazer stack-rank (Torres p.100-103) |
| Medida de sucesso | Objetivos e resultados-chave de negócio; um a três de cada (p.159-160) | Um resultado de produto sob o controle do trio, preferindo indicador antecedente; evitar vários resultados ao mesmo tempo (Torres p.40, p.47-48) |
| Quem decide | O PM responde pelo que o time vai construir (p.63); não é chefe de ninguém (p.55) | A escolha da oportunidade-alvo é debatida e decidida pela equipe (Torres p.102); o trio entrevista junto (Torres p.76-77) |
| Entrevistas | Mínimo de duas a três horas por semana; designer conduz, PM anota, engenheiro observa (p.232-233) | Entrevistar toda semana; o trio junto, ninguém como única voz do cliente (Torres p.72, p.76-77) |
| Falar da solução | Após obter as respostas-chave, aproveitar a entrevista para testar ideias de produto (p.233) | Não mencionar a solução cedo demais (Osterwalder p.266) |
| Quanto validar | Sem risco significativo ou divergência, ir à entrega e aceitar errar às vezes (p.196-197) | Mapear suposições e testar as duas ou três mais importantes e menos conhecidas (Torres p.131-132) |
| Ajuste ao mercado | Menor produto real que atende um mercado; B2B: seis referências (p.48, p.224) | Três tipos de *fit* (problema-solução, produto-mercado, modelo de negócio) (Osterwalder p.117-118) |
| Vocabulário | "Apaixone-se pelo problema" (p.149-150) | Evita "problema" por haver produtos que atendem desejos (Torres p.24-25) |

Quando o usuário trouxer a mistura, aplique a lente de quem ele citou e diga qual está usando. Esta skill mantém a estrutura de oportunidades de Torres e usa Cagan para o diagnóstico de riscos, o enquadramento do trabalho e as técnicas de planejamento.
