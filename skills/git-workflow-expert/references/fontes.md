# Fontes: rastreabilidade da skill git-workflow-expert

Livro: Pete Goodliffe, *Como ser um Programador Melhor* (Novatec; tradução de *Becoming a Better Programmer*, O'Reilly). Páginas = marcador "PDF PAGINA N" do texto extraído.

## Escopo do livro para esta skill

O livro trata de **controle de versões em geral** (cap. 20). Cita o Git apenas como exemplo de ferramenta (p.240, nota na p.251, p.249) e não ensina comandos, fluxo de PR nem formato de mensagem além do conteúdo geral. Itens que o livro não sustenta (formato de mensagem, PR, segredos, regras de segurança com histórico, comandos) estão marcados "convenção desta skill" na tabela da seção 2.

## 1. Regras atribuídas ao livro

| Regra/ponto da skill | Livro | Capítulo/seção | Páginas (PDF) | Citação curta |
|---|---|---|---|---|
| Usar controle de versões desde o início; rede de proteção, histórico, reversão | Goodliffe | Cap. 20, "Controle eficiente de versões" | 237-239 | "use-o" (regra de ouro, p.238) |
| Ritmo: fazer parte do trabalho, testar, commitar | Goodliffe | Cap. 20, vantagens | 238 | — |
| Commits pequenos e frequentes; riscos de acumular (rastrear, repositório mudou, conflitos) | Goodliffe | Cap. 20, "Faça commits atômicos" | 244 | "Faça check-ins pequenos e frequentes de suas alterações." |
| Commit atômico é coeso e completo; mensagem com "e" indica dois commits; não misturar layout e funcionalidade; não commitar pela metade | Goodliffe | Cap. 20, "Faça commits atômicos" | 244-245 | — |
| Mensagem: resumo breve na primeira frase, depois motivo, referência a bug; clara e sem ambiguidade; não listar arquivos (DRY); resumo facilita pesquisa | Goodliffe | Cap. 20, "Enviando as mensagens corretas" | 245 | — |
| Mensagens ruins reais (vazia, vaga) como contraexemplo | Goodliffe | Cap. 20 | 245-246 | — |
| Sequência antes do commit: alterar, atualizar contra o repositório, conferir build, commitar; não quebrar build; não remover arquivo em uso; fim de linha | Goodliffe | Cap. 20, "Componha bons commits" | 246 | — |
| Não misturar apresentação e comportamento; commitar em passos separados | Goodliffe | Cap. 2, "Torne-se apresentável" | 44 | "Jamais altere a apresentação e o comportamento ao mesmo tempo." |
| Limpeza/remoção de código morto em commits separados; remover é seguro porque o histórico guarda | Goodliffe | Cap. 4, "Extração cirúrgica" | 68 | — |
| Código confuso: uma alteração de cada vez; commitar reorganização de layout antes da mudança funcional; revisar com olhos extras se não houver testes; VCS como rede de proteção | Goodliffe | Cap. 7, "Chafurdando na lama" | 100-101 | "Faça uma alteração de cada vez." |
| Commits pequenos e atômicos ajudam a achar a mudança que causou um bug (arqueologia de software) | Goodliffe | Cap. 10, "Caça aos bugs" | 121-122 | — |
| O que versionar: tudo necessário para recriar o software (fontes, docs, build, config, recursos, terceiros) | Goodliffe | Cap. 20, "Armazenando os itens corretos" | 240-241 | — |
| O que não versionar: configuração de IDE e cache, artefatos gerados, instaladores, relatórios de teste/bug, e-mails, config pessoal, itens "para um dia"; exceção cuidadosa para gerados caros | Goodliffe | Cap. 20, "armazene o mínimo possível" | 241-243 | "armazene o mínimo possível" (p.243, ponto-chave) |
| Layout do repositório: estrutura clara, README no topo, sem duplicação, terceiros separados, ignorar arquivos inadequados | Goodliffe | Cap. 20, "Layout do repositório" | 243-244 | — |
| Branches: usos (funcionalidade, experimento, mudança grande, bug, release); não ter medo; não poluir a linha principal | Goodliffe | Cap. 20, "Branches" | 246-248 | "Não tenha medo deles." |
| Branches nem sempre são a melhor opção; alternativa: feature toggle na linha principal | Goodliffe | Cap. 20, "Branches" e nota 4 | 248, 251 | — |
| Evitar trabalho concorrente excessivo (metas conflitantes) | Goodliffe | Cap. 22, "Branches são apropriados" | 274 | — |
| Revisão: todo código passa por dois pares de olhos antes de entrar no VCS; programação em par ou revisão informal um a um; check-ins pequenos para ser administrável | Goodliffe | Cap. 35, "Fazendo com que dê certo" | 404 | — |
| Revisão leve, sem formulários nem sessões longas; entre pares, não subordinação; aceitar crítica sem defensiva, com tato | Goodliffe | Cap. 35, "Código++", "Os próximos passos", "Conclusão" | 403, 406-407 | — |
| Saber que alguém lerá o código melhora a qualidade | Goodliffe | Cap. 35 | 405 | — |
| Revisões de código em porções pequenas e compreensíveis | Goodliffe | Cap. 31, "Evitando erros" | 372 | — |
| Teste antes de entregar; adicionar teste que demonstre falha reportada | Goodliffe | Cap. 21, "Teste o seu trabalho antes" | 260 | — |
| Integração contínua: servidor que faz checkout e build do código mais recente, com testes | Goodliffe | Cap. 18, "Ferramentas para fazer alterações" | 227 | — |
| Release: não gerar a partir do diretório local; checkout limpo de uma tag; sem edição manual; tag reflete o nome da versão | Goodliffe | Cap. 23, passos 2 e 3 | 282-283, 286-287 | "Jamais reutilize partes antigas de um build de software." (p.287) |
| Build automatizado em um passo, com script versionado junto do código; rodar em CI | Goodliffe | Cap. 23, passo 3 | 287-288 | — |
| Registrar como a versão foi gerada; guardar log de build; obter exatamente o mesmo código | Goodliffe | Cap. 23, "Parte do processo" e passo 5 | 284-285, 288 | — |
| Notas de versão: o que mudou e áreas a testar; mensagens de commit podem não servir a clientes; número de versão único | Goodliffe | Cap. 21 e Cap. 23, passo 4 | 261, 288 | — |
| Testar os artefatos finais (smoke test) antes de distribuir | Goodliffe | Cap. 23, passo 5 | 288-289 | "Jamais disponibilize um software sem testar os artefatos finais." |
| Branch de release: estável, vida curta, trabalho na linha principal e mesclagem após teste; revisão, teste focado e análise de risco das mudanças; não precisa existir se a linha principal estiver sempre pronta | Goodliffe | Cap. 22 e Cap. 23 | 273-274, 285-287 | — |
| Meta de ter código permanentemente pronto para release | Goodliffe | Cap. 22, "Anticongelamento" | 277-278 | — |

## 2. Convenções desta skill (sem base no livro)

| Ponto | Observação |
|---|---|
| Formato da mensagem (modo imperativo, tamanho, linha em branco, rodapé), prefixos de projeto | Preferência prática. O livro só trata do conteúdo (seção 1). |
| Modelo de descrição de PR | O livro não trata de pull requests. Itens mínimos e opcionais. |
| Checklist de revisão de PR | Adaptação dos itens do livro (seção 1) ao formato de PR. |
| Nunca versionar segredos (senhas, tokens, chaves) | Não consta no texto lido. Regra de segurança. |
| Segurança com histórico: não reescrever histórico compartilhado, não forçar push, preferir reversão, confirmar operações destrutivas, não contornar verificações | Não consta no livro. O livro destaca apenas a possibilidade de reverter mudanças (p.238). |
| Comandos citados (`git revert`, `git status`, `git log --oneline`, `git diff --staged`) | Uso comum do Git, sem base no livro. |
| Um branch por tarefa, nome curto, apagar após mesclar; branches de vida curta com trazer a linha principal com frequência | Preferência prática. |
| Só executar commit, push ou merge quando a pessoa pedir | Regra de conduta para agentes. |

## 3. Pontos que o livro não cobre

Estratégia específica de merge (rebase, squash, merge commit), nomes de branch, fluxos nomeados, tamanho de PR em linhas, formato de mensagem, descrição de PR, segredos, regras de proteção de branch. A skill não atribui nada disso ao livro.

## 4. Verificação

Todas as páginas acima foram conferidas no texto dos blocos 01, 02, 03, 04, 05 e 06 do livro. Observação: os números de página impressos não aparecem no texto extraído; só os marcadores "PDF PAGINA N". Citações literais curtas foram conferidas contra o texto.
