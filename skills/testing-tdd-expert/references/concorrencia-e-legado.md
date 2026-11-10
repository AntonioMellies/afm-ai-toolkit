# Testes de código concorrente e de código legado

Páginas das fontes em [fontes.md](fontes.md).

## Código concorrente

Ponto de partida (Martin): testes não garantem que o código está correto, só reduzem o risco, e com várias threads sobre dados compartilhados tudo fica bem mais complexo. Um teste de concorrência que **passa** não prova que não há condição de corrida: ou o código está certo, ou o teste não expõe o problema.

Práticas, agrupadas por objetivo:

1. **Separe a lógica das threads.** Mantenha a lógica de negócio em classes simples que não conhecem threads e teste-as sem concorrência. Primeiro faça o código funcionar sem threads; não procure ao mesmo tempo bugs que não são de thread e bugs de thread. O código que enxerga threads deve ser pequeno e centralizado, e é só ele que precisa de teste concorrente.
2. **Trate falha intermitente como problema de concorrência.** Falhas que "não deveriam acontecer" e aparecem uma vez em milhares de execuções são sintoma, não raio cósmico. Registre as condições em que ocorreram e investigue.
3. **Torne o código configurável para teste.** Número de threads e de iterações ajustáveis; colaboradores artificiais que respondem rápido, devagar ou de forma variável; execução com uma ou várias threads.
4. **Aumente a chance de expor o defeito.** Rode com mais threads que processadores ou núcleos para provocar trocas de contexto. Rode em todas as plataformas de destino, repetida e continuamente, e com carga variada na máquina, pois sistemas operacionais tratam threads de formas diferentes.
5. **Force variações de escalonamento em teste (nunca em produção).** Insira pausas, cessões de vez ou mudanças de prioridade em pontos estratégicos, manualmente (em trecho suspeito) ou por instrumentação automática, por exemplo uma chamada auxiliar que em teste escolhe aleatoriamente entre não fazer nada, dormir ou ceder, e em produção não faz nada. Isso torna mais provável que um caminho defeituoso apareça. Se o código falha depois da inserção, a falha já existia.
6. **Testes ajustáveis em execução contínua ("Monte Carlo").** Faça testes parametrizáveis e rode-os várias vezes no servidor de integração contínua com parâmetros aleatórios; registre os parâmetros de cada falha.
7. **Conheça os limites.** O exemplo do apêndice de Martin (incremento sem sincronização) mostra um teste que tenta provar a falha e só "passa" ao expor o defeito; expô-lo pode exigir uma quantidade enorme de iterações e depende da máquina, do sistema operacional e da JVM. Instrumentação automática melhora muito a taxa de detecção, mas não elimina o risco.

### Exemplo (convenção desta skill, não é código do livro)

Teste de estresse em Java com largada simultânea. Ele pode **reprovar** quando há defeito, mas passar não prova ausência de corrida.

```java
@Test
void contadorNaoPerdeIncrementosSobConcorrencia() throws Exception {
    int threads = 8;
    int incrementosPorThread = 10_000;
    Contador contador = new Contador();
    ExecutorService pool = Executors.newFixedThreadPool(threads);
    CountDownLatch largada = new CountDownLatch(1);
    List<Future<?>> tarefas = new ArrayList<>();

    for (int i = 0; i < threads; i++) {
        tarefas.add(pool.submit(() -> {
            largada.await();
            for (int j = 0; j < incrementosPorThread; j++) {
                contador.incrementar();
            }
            return null;
        }));
    }
    largada.countDown();
    for (Future<?> tarefa : tarefas) {
        tarefa.get(10, TimeUnit.SECONDS);
    }
    pool.shutdown();

    assertEquals(threads * incrementosPorThread, contador.valor());
}
```

Ao revisar um teste assim, confirme que ele realmente falha contra uma versão sem sincronização do contador (rode várias vezes) e use o limite de tempo (`get` com timeout) para detectar bloqueio, não para mascarar lentidão. Em Go, rode a suíte também com o detector de condições de corrida (`go test -race`).

## Código legado sem testes

O que os livros afirmam:

- Um legado costuma ser complexo, com testes precários e escrito por outra pessoa. Refatorá-lo sem testes não é seguro, e adicionar testes costuma ser difícil, porque o sistema raramente foi projetado para ser testado (Fowler).
- Não há solução simples. A orientação é encontrar **linhas de junção** (seams, de Feathers) no programa onde seja possível inserir testes. Criar essas junções envolve refatorar sem testes: é arriscado e necessário, e refatorações automáticas seguras ajudam. Fowler admite que é difícil e que por isso defende código autotestável desde o início.
- Também existem refatorações comprovadamente seguras, específicas de linguagem, usadas em bases com pouca cobertura. Fowler não as detalha; use apenas as que a ferramenta do ambiente garante preservar comportamento.
- Goodliffe: ao mexer em código confuso, faça uma alteração por vez, preserve o comportamento (ferramentas confiáveis ou revisão cuidadosa) e considere escrever antes testes que capturem os comportamentos importantes. Cuidado ao substituir tudo: a confusão de casos especiais pode conter comportamento que existe por um motivo.
- Mesmo com testes, Fowler não propõe limpar um legado inteiro de uma vez; melhore a seção cada vez que passar por ela, mais nas áreas visitadas com frequência.
- Ao receber um bug no legado, o melhor ponto de partida é um teste simples que falha e reproduz o problema, depois corrigido sem quebrar os demais.

Procedimento sugerido (convenção desta skill, combinando as fontes):

1. Descubra como rodar a suíte existente e rode-a; confirme com um teste de uma linha que falha que ela não está sendo ignorada.
2. Identifique o comportamento que será alterado e a junção mais próxima para testá-lo.
3. Escreva testes que fixam o comportamento atual (na literatura costumam ser chamados de testes de caracterização; esse nome não vem dos livros desta biblioteca). Siga o padrão: valor esperado provisório, rodar, substituir pelo valor obtido, injetar falha, remover. Registre que o valor é o comportamento atual, não uma especificação.
4. Só então faça a mudança, em passos pequenos, rodando a suíte a cada passo.
5. Se um comportamento fixado parecer um bug, não o corrija no mesmo passo: levante a pergunta de domínio e decida em separado.

## Testes de aprendizagem (código de terceiros e fronteiras)

Em vez de experimentar uma biblioteca nova direto no código de produção, escreva testes que exploram o que você quer saber sobre a API, do jeito que seu código a usará. O conhecimento fica registrado e o custo é baixo. Ao atualizar a dependência, rode esses testes: se a API mudou de forma incompatível, você descobre de imediato. Eles também definem uma fronteira clara que facilita migrar para outra biblioteca. Não é preciso testar a biblioteca inteira, só o uso que você faz.
