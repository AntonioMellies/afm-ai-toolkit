# Fontes e rastreabilidade

Livros usados:
- **Fowler**: Martin Fowler, *Refatoração: aperfeiçoando o design de códigos existentes*, 2ª ed., Novatec, 2019 (com contribuições de Kent Beck; o capítulo 3 é de Beck e Fowler).
- **GoF**: Gamma, Helm, Johnson e Vlissides, *Padrões de Projeto: soluções reutilizáveis de software orientado a objetos*.

Convenções desta tabela:
- Páginas são os marcadores "PDF PAGINA N" do texto lido, nunca os números impressos (no GoF, o número impresso é cerca de 5 acima do marcador).
- Para títulos que caem na virada de página, o intervalo cobre motivação e procedimento e pode variar em uma página.
- Citações literais curtas (até 25 palavras) só aparecem aqui. Todo o restante da skill é paráfrase.
- Tudo o que não aparece nesta tabela é convenção desta skill (ver o fim do arquivo).

## 1. Princípios e processo (SKILL.md)

| Regra ou ponto da skill | Livro | Capítulo/seção | Páginas (PDF) | Citação curta |
|---|---|---|---|---|
| Definição de refatoração (substantivo e verbo); limpeza genérica não é refatoração | Fowler | Cap. 2, Definindo a refatoração | 71-72 | "uma modificação feita na estrutura interna do software para deixá-lo mais fácil de compreender e menos custoso para alterar" |
| Passos pequenos que preservam comportamento; código quebrado por dias não é refatoração; passos minúsculos são mais rápidos | Fowler | Cap. 2 | 72 | "pode ter certeza de que essa pessoa não estava refatorando" |
| Comportamento observável flexível; bugs existentes permanecem | Fowler | Cap. 2 | 72 | |
| Diferença entre refatoração e otimização de desempenho | Fowler | Cap. 2 | 72-73 | |
| Dois chapéus (funcionalidade, refatoração) | Fowler | Cap. 2, Dois chapéus | 73 | |
| Motivos para refatorar: design, compreensão, bugs, velocidade; Hipótese da Estamina no Design | Fowler | Cap. 2, Por que devemos refatorar? | 73-77 | |
| Regra dos Três | Fowler | Cap. 2, Quando refatorar | 78 | |
| Refatoração preparatória (inclui parametrizar em vez de copiar; correção de bug) | Fowler | Cap. 2 | 78-79 | |
| Refatoração para compreensão | Fowler | Cap. 2 | 79-80 | |
| Refatoração para coleta de lixo; deixar o local mais limpo | Fowler | Cap. 2 | 80 | |
| Refatoração oportunista, não planejada; planejada deve ser rara; "faça a mudança ser fácil" | Fowler | Cap. 2 | 80-81 | "faça a mudança ser fácil (aviso: isso pode ser difícil), e então faça a fácil mudança" |
| Separar commits de refatoração e funcionalidade não é princípio evidente | Fowler | Cap. 2 | 81-82 | |
| Refatoração de longo prazo; Branch By Abstraction | Fowler | Cap. 2 | 82 | |
| Refatorar em code review, ao lado do autor | Fowler | Cap. 2 | 82-83 | |
| O que dizer ao gerente; pouca refatoração é mais comum que excesso | Fowler | Cap. 2 | 83-84, 86 | |
| Quando não refatorar (código que não precisa mudar; reescrever vs refatorar) | Fowler | Cap. 2 | 84-85 | |
| Trade-off de refatorar vs só acrescentar; quando tender a refatorar | Fowler | Cap. 2, Problemas com a refatoração | 85-86 | |
| Justificativa puramente econômica, não "código limpo" | Fowler | Cap. 2 | 86 | "uma questão puramente econômica" |
| Interface publicada e dono do código: manter declaração antiga como passagem, obsoleta | Fowler | Cap. 2, Dono do código | 87-88 | |
| Branches longos, conflitos semânticos, integração contínua | Fowler | Cap. 2, Branches | 88-90 | |
| Refatoração exige testes rápidos e abrangentes; voltar à última versão boa; refatorações automatizadas seguras como alternativa | Fowler | Cap. 2, Testes | 90-91 | |
| Código legado: pontos de junção, não limpar tudo de uma vez | Fowler | Cap. 2, Código legado | 92-93 | |
| Mudança em paralelo (expandir e contrair) em banco de dados | Fowler | Cap. 2, Bancos de dados | 93-94 | |
| Flexibilidade especulativa não é grátis; Yagni | Fowler | Cap. 2 | 94-96 | |
| Desempenho: medir com profiler, passos pequenos, desfazer se não melhorar | Fowler | Cap. 2, Refatoração e desempenho | 97-101 | "faça medições de desempenho, não especule" |
| Primeiro passo: testes robustos autoverificáveis | Fowler | Cap. 1 | 25 | |
| Teste após cada mudança; commit local frequente | Fowler | Cap. 1 | 29 | |
| Se um teste falha sem solução imediata, voltar ao último bom commit e usar passos menores | Fowler | Cap. 1 | 43 | |
| Regra do acampamento; perfeição inatingível | Fowler | Cap. 1 | 57 | |
| Nunca refatorar com barra vermelha; voltar ao verde | Fowler | Cap. 4 | 135 | "Nunca refatore com uma barra vermelha" |
| Padrão para testar código existente (valor provisório, injetar falha) | Fowler | Cap. 4 | 136 | |
| Bug reportado: primeiro escreva o teste que o expõe | Fowler | Cap. 4 | 143 | |
| Formato do catálogo e passos pequenos ("quanto mais complicada, menores") | Fowler | Cap. 5 | 145-146 | |
| Padrões de projeto como alvo de refatorações | Fowler | Apresentação da 1ª edição | 10 | |
| Obra sobre refatoração para padrões (Kerievsky) | Fowler | Cap. 2, Indo além | 106 | |

## 2. Maus cheiros (smells.md)

Todos em Fowler, Cap. 3 (Beck e Fowler). Ordem de apresentação do capítulo: pp. 107-125; introdução e ausência de métricas: pp. 107-108.

| Cheiro | Páginas (PDF) | Observação |
|---|---|---|
| Nome misterioso | 108 | Cita Mudar declaração de função, Renomear variável, Renomear campo |
| Código duplicado | 108-109 | |
| Função longa | 109-111 | Heurística do comentário, "distância semântica" |
| Lista longa de parâmetros | 111 | |
| Dados globais | 111-112 | |
| Dados mutáveis | 112-113 | |
| Alteração divergente | 114 | |
| Cirurgia com rifle | 114-115 | Tática de internalizar antes |
| Inveja de recursos | 115-116 | Exceções Strategy, Visitor, Self Delegation (p.116) |
| Agrupamentos de dados | 116-117 | Teste de apagar um dado |
| Obsessão por primitivos | 117 | |
| Switches repetidos | 118 | |
| Laços | 118-119 | |
| Elemento ocioso | 119 | |
| Generalidade especulativa | 119-120 | |
| Campo temporário | 120 | |
| Cadeias de mensagens | 120-121 | |
| Intermediário | 121 | |
| Trocas escusas | 121-122 | |
| Classe grande | 122 | |
| Classes alternativas com interfaces diferentes | 122-123 | |
| Classe de dados | 123 | Exceção do registro de resultado imutável |
| Herança recusada | 123-124 | |
| Comentários | 124-125 | "Quando sentir necessidade de escrever um comentário, experimente refatorar o código antes" (p.125) |

## 3. Catálogo de refatorações (catalogo.md)

Fowler, capítulos 6 a 12, motivação e procedimento. Nomes PT e EN conforme o índice e os títulos. Os exemplos de código do catálogo desta skill são originais.

| Refatoração | Capítulo | Páginas (PDF) |
|---|---|---|
| Extrair função | 6 | 149-152 |
| Internalizar função | 6 | 159-160 |
| Extrair variável | 6 | 162-164 |
| Internalizar variável | 6 | 167-168 |
| Mudar declaração de função (procedimentos simples e de migração) | 6 | 168-172 |
| Encapsular variável | 6 | 177-179 |
| Renomear variável | 6 | 182-183 |
| Introduzir objeto de parâmetros | 6 | 185-186 |
| Combinar funções em classe | 6 | 190-191 |
| Combinar funções em transformação | 6 | 195-196 |
| Separar em fases | 6 | 200-202 |
| Encapsular registro | 7 | 208-210 |
| Encapsular coleção (inclui proxy somente leitura em Java, p.218) | 7 | 217-219 |
| Substituir primitivo por objeto | 7 | 222-223 |
| Substituir variável temporária por consulta | 7 | 226-228 |
| Extrair classe | 7 | 230-232 |
| Internalizar classe | 7 | 234-235 |
| Ocultar delegação | 7 | 237-238 |
| Remover intermediário | 7 | 239-240 |
| Substituir algoritmo | 7 | 242-243 |
| Mover função | 8 | 244-247 |
| Mover campo | 8 | 254-256 |
| Mover instruções para uma função | 8 | 261-262 |
| Mover instruções para os pontos de chamada | 8 | 265-266 |
| Substituir código internalizado por chamada de função | 8 | 270-271 |
| Deslocar instruções | 8 | 272-273 |
| Dividir laço | 8 | 277-278 |
| Substituir laço por pipeline | 8 | 281-282 |
| Remover código morto | 8 | 286-287 |
| Separar variável | 9 | 289-290 |
| Renomear campo | 9 | 293-295 |
| Substituir variável derivada por consulta | 9 | 297-299 |
| Mudar referência para valor | 9 | 301-303 |
| Mudar valor para referência | 9 | 305-307 |
| Decompor condicional | 10 | 310-312 |
| Consolidar expressão condicional | 10 | 313-315 |
| Substituir condicional aninhada por cláusulas de guarda | 10 | 317-318 |
| Substituir condicional por polimorfismo | 10 | 322-324 |
| Introduzir caso especial | 10 | 340-341 |
| Introduzir asserção | 10 | 353-355 |
| Separar consulta de modificador | 11 | 358-359 |
| Parametrizar função | 11 | 361-362 |
| Remover argumento de flag | 11 | 365-367 |
| Preservar objeto inteiro | 11 | 370-372 |
| Substituir parâmetro por consulta | 11 | 375-377 |
| Substituir consulta por parâmetro | 11 | 379-381 |
| Remover método de escrita | 11 | 383-385 |
| Substituir construtor por função de factory | 11 | 386-387 |
| Substituir função por comando (usa o padrão Command, p.390) | 11 | 389-391 |
| Substituir comando por função | 11 | 396-397 |
| Subir método (cita Formar método de template, p.403) | 12 | 401-403 |
| Subir campo | 12 | 405-406 |
| Subir corpo do construtor | 12 | 407-408 |
| Descer método | 12 | 410-412 |
| Descer campo | 12 | 412-413 |
| Substituir código de tipos por subclasses (incorpora State/Strategy, p.413) | 12 | 413-415 |
| Remover subclasse | 12 | 421-422 |
| Extrair superclasse | 12 | 427-428 |
| Condensar hierarquia | 12 | 432-433 |
| Substituir subclasse por delegação (State e Strategy, p.435) | 12 | 433-436 |
| Substituir superclasse por delegação | 12 | 453-455 |

## 4. Padrões de projeto (padroes-gof.md)

| Ponto | Livro | Seção | Páginas (PDF) |
|---|---|---|---|
| Nome e intenção dos 23 padrões (paráfrase) | GoF | 1.4, O catálogo de padrões de projeto | 21-22 |
| Classificação por finalidade e escopo | GoF | 1.5 | 22-23 |
| Composição de objetos em vez de herança | GoF | Cap. 1 | 32 |
| Aplicabilidade: Abstract Factory | GoF | Cap. 3 | 92 |
| Aplicabilidade: Builder | GoF | Cap. 3 | 100 |
| Aplicabilidade: Factory Method | GoF | Cap. 3 | 108 |
| Aplicabilidade: Prototype | GoF | Cap. 3 | 117 |
| Aplicabilidade: Singleton | GoF | Cap. 3 | 125 |
| Aplicabilidade: Adapter | GoF | Cap. 4 | 137 |
| Aplicabilidade: Bridge | GoF | Cap. 4 | 147-148 |
| Aplicabilidade: Composite | GoF | Cap. 4 | 156 |
| Aplicabilidade: Decorator | GoF | Cap. 4 | 167 |
| Aplicabilidade: Façade | GoF | Cap. 4 | 175-176 |
| Aplicabilidade: Flyweight | GoF | Cap. 4 | 184-185 |
| Aplicabilidade: Proxy | GoF | Cap. 4 | 195 |
| Aplicabilidade: Chain of Responsibility | GoF | Cap. 5 | 209 |
| Aplicabilidade: Command | GoF | Cap. 5 | 219-220 |
| Aplicabilidade: Interpreter | GoF | Cap. 5 | 228-229 |
| Aplicabilidade: Iterator | GoF | Cap. 5 | 240 |
| Aplicabilidade: Mediator | GoF | Cap. 5 | 255 |
| Aplicabilidade: Memento | GoF | Cap. 5 | 263 |
| Aplicabilidade: Observer | GoF | Cap. 5 | 270 |
| Aplicabilidade: State (condicionais grandes sobre o estado) | GoF | Cap. 5 | 280 |
| Aplicabilidade: Strategy (múltiplas condicionais) | GoF | Cap. 5 | 288-289 |
| Aplicabilidade: Template Method ("refatorar para generalizar") | GoF | Cap. 5 | 297 |
| Aplicabilidade: Visitor | GoF | Cap. 5 | 302-303 |
| Singleton como forma de dados globais | Fowler | Cap. 3 | 112 |
| Strategy e Visitor como exceção a Inveja de recursos | Fowler | Cap. 3 | 116 |
| Prefira composição: mistura criteriosa; State/Strategy | Fowler | Cap. 12 | 434-435 |

## 5. Convenções desta skill (sem base direta nos livros)

- Agrupamento temático de cheiros e refatorações, tabela-resumo smell para refatoração (os itens vêm do livro; a organização é nossa).
- Laço de processo em SKILL.md (a ordem dos passos recombina regras das seções 1), roteiro de conversa e fronteiras com outras skills.
- Exemplos em Java e o uso de `record`, `stream` e `Collections.unmodifiableList`, e a recomendação de revisar a rede de testes antes de refatorar legado conforme o resumo.
- Ligações de padrões GoF marcadas "convenção desta skill" em padroes-gof.md (Factory Method, Adapter, Bridge, Decorator, Façade, Mediator, e a nomeação de Switches repetidos e Código duplicado como cheiros descritos pelos sintomas de State, Strategy e Template Method).
- Classificação "[sem ligação]" quando nenhum dos textos lidos relaciona o padrão a uma refatoração.
