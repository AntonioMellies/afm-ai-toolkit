# Biblioteca de experimentos (Bland e Osterwalder)

Lista só o que o texto lido do *Testing Business Ideas* descreve. Os ícones de custo, tempo e força de cada cartão e os gráficos de dispersão são visuais e **não foram lidos**: não use esta tabela para dizer "custa X" ou "dura Y" além do que está escrito. As subcategorias do livro (exploração, análise de dados, descoberta de interesse, protótipos de discussão, preferência e priorização, protótipos de interação, chamada para ação, simulação) vieram de extração de layout ambígua e por isso não são usadas aqui. Páginas em `fontes.md`.

Todos os números abaixo são **alvos propostos pelo livro** ou exemplos, não leis. Para uma técnica que a tabela não cobre, procure o cartão no livro antes de recomendar.

## Como escolher

Três perguntas (livro): que tipo de hipótese (desejabilidade, exequibilidade, viabilidade)? Quanto já se sabe (menos incerteza exige evidência mais forte; incerteza alta, experimento barato e rápido mesmo que fraco)? Qual a urgência (tempo e dinheiro até a próxima decisão)? Quatro regras: barato e rápido no começo; vários experimentos para a mesma hipótese; escolher o de evidência mais forte dentro das restrições; reduzir a incerteza antes de construir. Faixas do cartão no livro: tempo de preparo e de execução de 1-3 horas a 3+ meses; custo de abaixo de US$ 500 a US$ 20.000+.

Discovery (testar premissas básicas e corrigir o rumo) aceita evidência fraca; Validation (confirmar com evidência forte que a ideia provavelmente funciona) exige evidência forte. Sequências por tipo de negócio existem no livro, mas a ordem das setas dos diagramas não foi lida; use como "membros", não como ordem.

Para cada experimento abaixo, o formato final do cartão é o de `forca-da-evidencia.md`: hipótese, métrica, critério definido antes.

## Discovery (evidência em geral fraca; serve para achar a direção)

| Experimento | Quando serve | Sinal de evidência (como o livro o classifica) | Armadilha ou requisito |
|---|---|---|---|
| Customer Interview | Insights qualitativos sobre encaixe entre proposta e segmento; ponto de partida para preço | Fraca (é o que dizem). Meta do livro: 80% de acerto no ranking de jobs, pains e gains (8 de 10) | Segmento estreito antes de entrevistar; não vender; escriba e entrevistador; 15 a 20 entrevistas; debrief. Detalhes em `entrevistas-mom-test.md` |
| Partner and Supplier Interviews | Hipóteses de exequibilidade com parceiros-chave | Bids de parceiros são evidência forte de interesse, mas não são contrato; o que dizem poder entregar é relativamente forte "desde que confira" | Detalhes ainda a acordar antes de contrato |
| Expert Stakeholder Interviews | Apoio interno de atores-chave | Moderadamente forte; fica mais forte com ações | Dizer não é agir |
| A Day in the Life | Observar o cliente no mundo real | Fraca, mas mais forte que laboratório (é comportamento) | Não interagir durante a observação; consentimento; só depois perguntar o porquê |
| Discovery Survey | Descobrir proposta e jobs, pains e gains com perguntas abertas | O que dizem; o livro espera o mesmo padrão aparecendo por volta da quinta resposta de um cliente-alvo parecido | Supor resposta de 10 a 20% para dimensionar o envio; perguntas sem tom negativo |
| Search Trend Analysis | Dimensionar o **problema** (não o mercado) por volume de busca | Pode ser mais forte que métodos qualitativos pequenos, se bem feita | Não serve para nicho, B2B ou público offline; o livro não dá limiar |
| Web Traffic Analysis | Achar onde o cliente abandona um fluxo | Mostra o quê, não o porquê; relativamente forte por ser comportamento | Não decidir grande com poucos dias de dados; perguntar o porquê depois |
| Discussion Forums | Necessidades não atendidas e gambiarras | Gambiarra do cliente é forte; pedido de feature é fraco | Testar o job ou dor por trás do pedido |
| Sales Force Feedback | O que quase impediu a venda | *Near miss* é relativamente forte (acabou de converter) | Segmentar por papel (decisor, comprador, recomendador, influenciador) em B2B |
| Customer Support Analysis | Jobs e dores a partir de suporte | Citações isoladas são fracas | Exige volume de dados, não conversas pontuais |
| Online Ad | Testar proposta de valor em escala com chamada para ação | Clique é relativamente fraco; mais forte combinado com conversão numa landing page | Rodar ao menos uma semana, iterar texto e imagem; destino coerente com a promessa; não depender de aquisição paga cedo |
| Link Tracking | Comparar cliques com o que a pessoa faz no destino | Média; mostra o quê | Fórmula de taxa impressa no livro parece invertida; usar cliques divididos por visualizações |
| Feature Stub | Interesse numa funcionalidade futura dentro de produto com usuários ativos | Botão e cliques são fracos mas sinalizam interesse; alvos do livro: 15% no botão, 5% em *learn more*, 3% no survey | Só de 1 a 3 dias; interruptor para desligar já testado; não para funcionalidade crítica da missão |
| 404 Test | Variante mais rápida e arriscada do *feature stub* | Contagem de erros | No máximo horas; custa a imagem de produto quebrado |
| Email Campaign | Reação de um segmento a uma proposta | Média; taxas variam por setor | Definir uma meta antes de criar a campanha |
| Social Media Campaign | Interesse e canal | Engajamento fraco; conversão forte | Tratar curtidas e comentários como qualitativo |
| Referral Program | Crescimento orgânico | Advocate que aceita e compartilha é relativamente forte; amigo que converte é forte, mas age por incentivo. Alvos do livro: 15-20% de advocates que compartilham, 50-80% de cliques de amigos, 5-15% de conversão | Só com clientes já apaixonados; semanas a meses |
| Paper Prototype, Storyboard, Data Sheet, Brochure, Explainer Video, 3D Print | Discutir uma solução com clientes ou parceiros em baixa fidelidade | Em geral fraca (laboratório, suspensão de descrença); no *Brochure* o livro propõe 15% ou mais de chamada para ação como sinal forte; em vídeo, cliques valem mais que visualizações | Baixa fidelidade antes do 3D Print; qualidade ruim gera falso negativo; segmento definido antes do *storyboard* |
| Boomerang | Achar necessidades não atendidas num produto concorrente que clientes já usam | Conclusão de tarefas em produto existente é relativamente forte; citações, fracas | Não reembalar o produto do concorrente como se fosse seu |
| Pretend to Own | Ver se a solução cabe no cotidiano com réplica não funcional | Engajamento próprio é relativamente fraco | Limitar o tempo de criação |
| Product Box, Speed Boat, Card Sorting, Buy a Feature | Priorizar com clientes (jobs, pains, features) | Fraca (laboratório); informa experimentos de ação | Não dar feedback nem tentar resolver durante a dinâmica |

## Validation (evidência forte, custo e prazo maiores)

| Experimento | Quando serve | Sinal de evidência | Armadilha ou requisito |
|---|---|---|---|
| Clickable Prototype | Testar o conceito de uma ideia digital com fidelidade maior que papel | Percentual de conclusão de tarefas e tempo; o livro diz que não é evidência necessariamente forte, mas um pouco mais forte que papel | Não substitui teste de usabilidade adequado; mostra onde o cliente se confunde |
| Single Feature MVP | Entregar de verdade a única funcionalidade que testa a suposição | Compras, satisfação após o valor entregue e custo de entrega são evidência forte | Ter rodado testes de menor fidelidade antes |
| Mash-Up | MVP costurando serviços existentes | Satisfação e compras, forte; custo de montar como indicador de viabilidade | Idem |
| Concierge | Entrega manual, visível ao cliente | Satisfação, compras e tempo de conclusão (muito forte) | Separar *lead time* (do pedido à entrega) de *cycle time* (trabalho efetivo); não serve para escalar |
| Wizard of Oz | Mesma entrega manual, mas escondida atrás de uma interface | Satisfação, compras e tempo de conclusão | Definir antes a "linha na areia" (pedidos por dia manuais, custo por pedido, volume em que automatizar compensa) |
| Life-Sized Prototype | Réplica em escala real de espaço ou serviço | Dados de pagamento numa venda simulada são muito fortes; citações e e-mails são fracos | Só com muita evidência de que a solução é necessária |
| Simple Landing Page | Ver se a proposta ressoa com um segmento | E-mail é evidência fraca (qualquer um dá). Propostas do livro: 10% a 15% de conversão de e-mail para validação inicial, cerca de 100 visitantes únicos por dia | Derivar do Value Map e do top 3 do Customer Profile; sem depoimento falso nem "esgotado" falso; Fitzpatrick desconfia da conversão como validação (ver `forca-da-evidencia.md`) |
| Crowdfunding | Dinheiro como voto | Pledges são evidência muito forte; visualizações e comentários, fracos. Propostas: 6% dos pledges por tráfego direto, 2% por anúncios segmentados, de 30 a 60 dias | Não prova exequibilidade técnica; qualidade profissional necessária |
| Split Test | Comparar controle A e variante B | Evidência moderada (o cliente não sabe que participa) | Definir amostra e confiança antes (o livro cita no mínimo 80%, ideal 98%); não parar cedo; não rodar muitos ao mesmo tempo |
| Presale | Venda real antes de existir (cobrada no envio) | Compras são evidência forte; abandono de checkout é forte, embora mau sinal | Ter capacidade de cumprir; diferente de *mock sale* |
| Validation Survey | Medir desapontamento (Sean Ellis), indicação (NPS) e acerto do ranking de jobs, pains e gains | O livro propõe mais de 40% de desapontados antes de escalar (o texto não diz se conta só "muito desapontado") e admite que isso é discutível; NPS é mais fraco que Sean Ellis | Só com quem usou o núcleo do produto duas ou mais vezes nas últimas duas semanas |
| Mock Sale | Testar preços sem cobrar | Clique de compra, e-mail e envio de dados de pagamento, nessa ordem crescente de força | Não perguntar "quanto pagaria"; apresentar preços; preço absurdamente baixo gera falso positivo |
| Letter of Intent | Compromisso não vinculante de parceiros ou clientes B2B | Assinada é mais forte que apenas dizer | Só com contatos aquecidos; não para B2C; esperar que o dito supere o escrito |
| Pop-Up Store | Interação presencial e compra real | Presales e vendas são fortes; e-mails e citações, fracos mas úteis | Não para B2B; valor está no qualitativo |
| Extreme Programming Spike | Hipótese de exequibilidade técnica em software | Critérios de aceitação cumpridos e recomendação do time | Definir critério e *time box* antes (de um dia a duas semanas); código geralmente se descarta |

## Quando um experimento não cabe

- O experimento precisa de público que a equipe não alcança: encurte o caminho (primeiro conversas, depois canal) em vez de forçar um teste em escala.
- O custo de construir é pequeno comparado ao de testar: o livro de Torres admite parar de testar e construir.
- Não há como rodar sem ferir quem participa (saúde, finanças, regulado): trate o aspecto ético antes. O TBI pede experimentar *com* os clientes, não *sobre* eles, e evitar vaporware. Em setores regulados o livro sugere isolar as áreas de risco extremo e testar o resto.
