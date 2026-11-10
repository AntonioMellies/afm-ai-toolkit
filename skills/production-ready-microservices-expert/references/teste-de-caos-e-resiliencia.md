# Tolerância a falhas e testes de resiliência

Material de apoio sobre como o livro de Susan J. Fowler encadeia a tolerância a falhas: eliminar pontos únicos de falha, listar cenários de falha, testar (código, carga, caos) e automatizar detecção e reparo. Páginas PDF entre parênteses; detalhes em `fontes.md`. O que não vem do livro está marcado como **convenção desta skill**.

## Quando usar

- Avaliar se um serviço sobrevive à perda de um componente ou de uma dependência.
- Montar o plano de testes de um serviço (o que testar, em que ordem, com que cuidado).
- Decidir o que automatizar na detecção e na mitigação de falhas.

## Ideia central

Falhas vão acontecer, e qualquer uma que possa acontecer acontecerá (p.139, 144). Mitigação planejada não basta: a única forma de saber se o serviço se recupera é forçá-lo a falhar (p.141, 157). E toda falha nova que o serviço sofrer deve entrar no conjunto de testes de resiliência para não voltar (p.141).

## Ordem usada pelo livro

### 1. Pontos únicos de falha (p.140, 142-144)

- Procure qualquer parte da arquitetura cuja queda derruba o serviço. O exemplo do livro: um único nó de fila/broker que enche, perde tarefas e, se for compartilhado, derruba outros serviços (p.142-143).
- Técnica que o livro recomenda: desenhar a arquitetura em um quadro e perguntar, parte por parte, "o que acontece se isto falhar?" (p.143).
- Se não der para eliminar (tecnologia imposta pela organização, por exemplo), mitigue as consequências (p.144).
- Um ponto de falha de um serviço costuma ser ponto de falha de toda a cadeia de dependência (p.143).

### 2. Inventário de cenários de falha (p.144-157)

Faça a lista a partir das camadas do ecossistema; o livro diz que as listas dele são exemplos, não completas (p.145).

- **Operacionais, em todas as camadas:** revisão de arquitetura insuficiente, revisão de código incompleta, processo de desenvolvimento fraco, deploy instável. Como o ecossistema evolui muito rápido, o livro defende revisões de arquitetura programadas, com especialistas de cada camada (p.146-148).
- **Hardware:** servidor, rack, datacenter ou provedor de nuvem; provisionamento; isolamento e abstração de recursos; configuração e gerenciamento de configuração; lacunas de monitoramento e logging por servidor; rede; indisponibilidades planejadas (p.148-150).
- **Comunicação e plataforma:** rede, DNS, firewall, RPC (canal único para tudo agrava; canais separados para RPC e health checks ajudam), mensageria sem alternativa, descoberta/registro/balanceamento, ferramentas de desenvolvimento, pipelines de teste/empacotamento/deploy, logging e monitoramento por serviço (p.150-153).
- **Dependências:** queda de serviço interno ou externo, biblioteca interna ou de terceiro, SLA não cumprido (a disponibilidade fim a fim é a do serviço multiplicada pela das dependências, p.154), timeouts, descontinuação ou desativação de endpoint ou serviço sem aviso (p.153-155). Dependência de terceiros: prefira estáveis e consolidadas e evite quando possível, ou ela vira ponto único de falha (p.154-155).
- **Internas:** boa parte dos incidentes é autoinfligida: revisão incompleta, pouca cobertura de teste, deploy ruim, tratamento inadequado de erros e exceções, falha de banco ou broker, limites de escala (p.155-157).

### 3. Teste de código (p.158-161)

O livro lista quatro tipos e os coloca na categoria de resiliência por conveniência (p.158). Ele diz que o teste de código não costuma ser contado como teste de resiliência.

- **Lint:** sintaxe e estilo (p.159).
- **Unidade:** componentes isolados. Só isso não basta para prever o comportamento em produção (p.159).
- **Integração:** componentes combinados funcionando juntos (p.159).
- **Fim a fim:** o que a arquitetura de microsserviços acrescenta. Testes que se comportam como tráfego real: acessam endpoints dos clientes, do próprio serviço e das dependências, leem do banco e detectam falhas no fluxo de requisição (p.160).
- Execução automatizada: unidade e integração rodam em ambiente externo logo após a revisão de código; se falham, a mudança não entra no pipeline de deploy como candidata a produção (p.160-161).

Observação de consistência: a visão geral do livro cita "regressão" entre os testes de código (p.75), enquanto o capítulo de falhas usa lint, unidade, integração e fim a fim (p.158-161). Esta skill segue a lista detalhada.

### 4. Teste de carga (p.161-165)

- Objetivo: ver como o serviço se comporta sob uma carga específica de tráfego e achar gargalos que só aparecem no limite (p.161-162).
- A carga de teste vem das escalas qualitativa e quantitativa (RPS, QPS ou TPS) (p.162, 165). Pode ser usado ao contrário: para descobrir as escalas, os gargalos, os requisitos de recursos e as necessidades de capacidade (p.162-163).
- Execute em cada estágio do pipeline. Em staging para testar o próprio teste; mas staging não é produção, então é preciso testar em produção também (p.163-164).
- Em staging parcial, cuidado para o teste não prejudicar serviços de produção; em staging total, cuidado com a fidelidade dos resultados se não houver paridade de servidores (p.163).
- Em produção: avise todas as dependências de plantão, tenha mecanismo automatizado para interromper o teste rápido e só retome depois de corrigir os limites descobertos (p.164). "Nunca assuma que as dependências downstream podem tratar a carga" que você vai enviar (p.164).
- Ideal: ferramenta de autosserviço, programada, registrada em log e divulgada internamente; testes em horário de baixo tráfego, nunca no pico (p.165). Em casos extremos, o livro admite bloquear deploys de serviço que vai mal no teste de carga (p.165).

### 5. Teste de caos (p.166-168)

- É o tipo de teste de resiliência mais importante: forçar falhas em produção, de forma programada e de forma aleatória, para cada cenário identificado (p.158, 166). As falhas programadas treinam a equipe; as aleatórias testam o improviso (p.166).
- Controle: o software de caos precisa de permissões adequadas e cada evento deve ser registrado, para investigar se o serviço não se recuperar ou se o teste sair do controle (p.166-167).
- O livro prefere oferecer o teste de caos como serviço central, com pacote geral obrigatório e espaço para cada equipe criar testes próprios; repetir até a confiança de que as falhas inevitáveis serão suportadas (p.167).
- Tipos de experimento citados: tirar do ar o endpoint de uma dependência, cortar o tráfego para uma dependência, introduzir latência entre partes do ecossistema (clientes, dependências, bancos compartilhados, processamento distribuído), cortar tráfego de um datacenter ou região e derrubar um servidor aleatório (p.167-168).
- Vale para nuvem e para hardware próprio; os modos de falha são parecidos (p.167).

**Convenção desta skill** (não é do livro): antes de iniciar caos em produção, confirme que existem monitoramento com alertas, rollback automatizado e registro dos experimentos. O livro exige controle e logs (p.166-167) e automação de reparo (p.168-170), mas não formula essa lista como pré-requisito.

### 6. Detecção e reparo automatizados (p.168-170)

- Objetivo: reduzir o impacto para os usuários (clientes do serviço, sejam outros serviços ou usuários finais) (p.168).
- Se a falha pode ter vindo de um deploy, a mitigação mais eficaz é voltar à última versão estável. O mesmo vale para configuração: trate como código, implante em liberações sucessivas e permita voltar ao último conjunto estável (p.168-169).
- Alternativa estável: enviar para outro endpoint ou serviço, enfileirar ou salvar requisições enquanto a dependência está fora, ou redirecionar tráfego para outro datacenter (p.169). O livro diz que redirecionar tráfego quase sempre é a opção mais inteligente porque é fácil e reduz o impacto na hora (p.169).
- Detecção por monitoramento, não por pessoas: humanos são ruins em detectar falhas e o reparo manual vira ponto de falha. O livro dá o exemplo de reverter sozinho quando health checks falham ou métricas principais cruzam limiares de advertência ou crítico após um deploy (p.169-170).

## Perguntas de verificação

- Existe lista atualizada de pontos únicos de falha e de cenários por camada, com o que fazer em cada um?
- Cada tipo de teste (lint, unidade, integração, fim a fim, carga, caos) existe, roda automatizado e tem evidência recente?
- A última falha em produção virou teste?
- Os testes de carga e de caos têm aviso às dependências, registro e parada rápida?
- Rollback e redirecionamento de tráfego acontecem sem passo manual?

## Convenções desta skill (sem base no livro)

- A lista de pré-requisitos para iniciar caos em produção.
- Os padrões timeout, retry com backoff exponencial, bulkhead e idempotência não aparecem como prática no livro lido (timeouts só como cenário de falha, p.154-155). Se usados, trate como boas práticas da skill, e não como requisito do livro.
