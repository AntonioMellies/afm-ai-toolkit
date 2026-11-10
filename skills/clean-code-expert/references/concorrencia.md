# Concorrência

Resumo do capítulo 13 e do apêndice A de *Código Limpo*, em paráfrase, só do trecho legível por OCR. Os exemplos do livro são de Java 5; trate-os como ilustração e não como regra de plataforma. Páginas entre colchetes são marcadores PDF (veja fontes.md). Estratégia de testes de threads fica com a skill de testes, se instalada.

## Ponto de partida

- Concorrência separa o que é executado de quando é executado. Pode melhorar estrutura e vazão, mas escrever código concorrente limpo é difícil [p.175-176].
- Mitos desfeitos pelo livro: concorrência nem sempre melhora desempenho (só quando há espera que possa ser dividida); o projeto muda; entender concorrência continua necessário mesmo com contêiner. Concorrência acrescenta custo e código, é complexa mesmo em problemas simples, seus bugs raramente se repetem e costuma pedir outra estratégia de projeto [p.176].
- Um incremento simples em um campo compartilhado entre duas threads pode produzir resultados diferentes, inclusive dar o mesmo valor às duas [p.177].

## Princípios de defesa

| Princípio | Em uma linha | Página |
|---|---|---|
| SRP | Código de concorrência tem ciclo de mudança e desafios próprios; mantenha-o separado do resto | 177-178 |
| Limite o escopo dos dados | Quanto mais lugares alteram dado compartilhado, maior a chance de esquecer proteção, duplicar esforço e dificultar achar falha | 178 |
| Use cópias | Copiar ou usar dados somente leitura pode compensar o custo, se evita sincronização; vale medir | 178 |
| Threads independentes | Cada thread com seus dados em variáveis locais; dividir dados em subsistemas independentes | 178-179 |
| Conheça a biblioteca | Use coleções e utilitários seguros para threads da plataforma e conheça seus limites | 179 |
| Conheça os modelos | Produtor e consumidor, leitores e escritores, filósofos jantando cobrem a maioria dos problemas | 180-181 |
| Evite vários métodos em objeto compartilhado | Dependências entre métodos sincronizados causam bugs sutis | 181-182 |
| Mantenha pequenas as seções sincronizadas | Bloqueios custam atraso e trabalho; sincronize o mínimo, não o máximo | 182, 327 |
| Planeje o desligamento cedo | Encerrar corretamente é difícil e leva mais tempo que o esperado | 182-183 |

## Dependência entre métodos (apêndice A)

- Coleções com métodos individuais seguros não são seguras para operações compostas (verificar e depois inserir) [p.321-322].
- Três saídas: bloquear no cliente, bloquear no servidor (criar uma operação atômica) ou usar coleções que já oferecem a operação composta [p.322, 182].
- Bloqueio no cliente duplica código, é arriscado porque todo cliente precisa lembrar e pode falhar uma vez entre centenas. O livro recomenda em geral o bloqueio no servidor [p.324-326].
- Motivos do bloqueio no servidor: menos código repetido, melhor desempenho, menos chance de erro, uma única diretriz e menor escopo de variáveis compartilhadas. Se não se controla o servidor, use um Adapter que adicione o bloqueio [p.326].

## Deadlock (apêndice A)

- Exige quatro condições ao mesmo tempo: exclusão mútua, bloqueio e espera, ausência de preempção e espera circular. Quebrar uma delas basta [p.329-330].
- Formas de quebrar: ampliar recursos ou aceitar uso simultâneo; recusar-se a esperar (com risco de espera indefinida e livelock); permitir que uma thread peça o recurso a outra; ordenar globalmente a aquisição de recursos, o método mais comum e que tem limites (a ordem de aquisição pode não coincidir com a de uso, e às vezes a ordem não é possível) [p.330-332].
- Inserir depuração pode esconder o deadlock por semanas, porque altera o tempo de execução [p.329].

## Testar código com threads (resumo)

- Trate falhas intermitentes como falhas de threads, não como casos isolados [p.183].
- Faça primeiro o código sem threads funcionar: objetos simples chamados pelas threads, testáveis fora do ambiente de threads [p.183-184].
- Deixe o código com threads portátil e ajustável; rode com mais threads que processadores, em cada plataforma de destino, e com instrumentação que force trocas de contexto [p.184-187, 334-335].
- O livro admite que mesmo assim os defeitos mais raros continuam difíceis de achar [p.335].

## Em revisão

Sinais: estado compartilhado mutável sem dono; sincronização espalhada pelo código de negócio; chamada de uma seção bloqueada dentro de outra; seção crítica maior que o necessário; ordem de aquisição de recursos não definida; desligamento não pensado. Conclusão do livro: divida o sistema em objetos que enxergam threads e objetos que as ignoram e mantenha o primeiro grupo pequeno e focado [p.187].
