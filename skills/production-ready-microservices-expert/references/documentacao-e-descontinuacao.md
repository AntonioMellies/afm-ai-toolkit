# Documentação, entendimento organizacional e descontinuação

Material de apoio com três assuntos que o livro de Susan J. Fowler trata como parte da prontidão para produção: documentação do serviço, entendimento do serviço pela organização e descontinuação/desativação, mais a posição do livro contra atribuir versões a microsserviços e endpoints. Páginas PDF entre parênteses; detalhes em `fontes.md`. O que não vem do livro está marcado como **convenção desta skill**.

## Quando usar

- Revisar se a documentação de um serviço permite operá-lo e integrá-lo sem perguntar a ninguém.
- Planejar revisão de arquitetura, auditoria de prontidão ou plano de adequação.
- Retirar um endpoint ou um serviço sem derrubar clientes.
- Decidir como lidar com mudança de contrato sem atribuir versões.

## Parte 1: documentação do serviço

### Princípios

- Objetivo: um repositório central de conhecimento com dois componentes, os fatos objetivos sobre o serviço e o entendimento organizacional de onde ele se encaixa (p.200).
- Local único, compartilhado e fácil de encontrar (p.201). README e comentários no código são necessários mas não são documentação pronta para produção, pois obrigam a vasculhar o código (p.201).
- Atualize a cada mudança significativa: novo endpoint, novo alerta com seu roteiro, nova dependência (p.202). Torne a atualização parte do ciclo de desenvolvimento; se for tarefa secundária, vira defasagem técnica (p.202).
- Linguagem clara, compreensível por qualquer desenvolvedor, gerente, gerente de produto ou executivo; sem jargão vazio e sem excesso técnico que ignore o que é exclusivo do serviço (p.203).
- Relação com disponibilidade: a falta de documentação e de entendimento reduz a velocidade e esconde pontos únicos de falha até virarem interrupção (p.80-81, 200).

### O que a documentação contém

Agrupado por finalidade (o livro lista nove elementos; aqui estão reorganizados):

- **Identidade e contexto:** descrição curta do papel do serviço no ecossistema e no negócio (p.203); contato da equipe (nomes, cargos) e quem está de plantão (p.205).
- **Arquitetura:** diagrama com componentes, endpoints, fluxo de requisições, dependências upstream e downstream e bancos ou caches (p.203-204). O diagrama ajuda a achar pontos de falha que o código esconde (p.204).
- **Operação:** roteiro de plantão com procedimentos gerais, um passo a passo por alerta e seção de solução de problemas (p.207-208); SLA e status de prontidão para produção (p.209).
- **Integração e desenvolvimento:** guia de bordo para novos desenvolvedores: configurar e iniciar o serviço, ciclo de desenvolvimento e pipeline de deploy, com comandos e exemplos (p.206).
- **Fluxos, endpoints e dependências:** descrição qualitativa dos tipos de requisição; lista de endpoints com nome, descrição e respostas, suficiente para outro time tratar o serviço como caixa-preta; dependências com endpoints usados, SLAs, alternativas, caches e backups, e links para a documentação e os painéis delas (p.206-207).
- **Referências e perguntas:** links para repositório, painel, RFC original e slides da última revisão de arquitetura (p.205); FAQ alimentada por perguntas que se repetem de outras equipes e da própria equipe (p.208-209).

O livro não exige um formato específico de contrato de API: pede lista de endpoints com descrição qualitativa (p.207). Usar OpenAPI é **convenção desta skill**.

## Parte 2: entendimento organizacional

O livro trabalha o entendimento em três níveis: desenvolvedor (responde com confiança sobre a prontidão do próprio serviço), equipe (sabe o estado de prontidão e o que falta) e organização (padrões de prontidão fazem parte do processo) (p.210-211).

- **Exercício do quadro branco:** pedir à equipe que desenhe a arquitetura revela entendimento incoerente entre as pessoas (p.80-81, 212).
- **Revisão de arquitetura programada:** reunião com desenvolvedores e engenheiros de confiabilidade que desenham e avaliam a arquitetura; deve revelar gargalos, pontos de falha, decisões ruins antigas e tecnologias para trocar; convide especialistas de outras equipes; produza diagrama atualizado e lista de projetos para a documentação e os planos do trimestre (p.212-213). O livro sugere alinhar a periodicidade ao ciclo de OKR e planejamento, por exemplo uma revisão antes de cada trimestre (p.213).
- **Auditoria de prontidão:** a equipe percorre uma checklist de requisitos e marca atendido ou não; a estrutura espelha os padrões adotados pela organização (p.213-214). O Apêndice A do livro serve de modelo (p.219-221).
- **Plano estratégico de prontidão:** para cada requisito não atendido, registrar detalhes de implementação, incidentes relacionados, ticket e responsável; integrar a OKRs e planejamento, de preferência junto com entrega de funcionalidades (p.214-215).
- **Avaliar antes da RFC e antes de receber tráfego:** o livro propõe avaliar um serviço novo contra os padrões antes de o projeto ser enviado a revisão (p.211).
- **Automatizar e dar nota:** se algo é feito à mão mais de uma vez, automatize; verificações automáticas dão uma nota de prontidão por serviço, que o livro sugere divulgar e usar para exigir nota mínima de serviços críticos e confinar deploys (p.216-217).

## Parte 3: descontinuação e desativação

### Definições (p.233-234)

- **Descontinuação:** o serviço ou os endpoints deixam de ser mantidos pela equipe e deixam de ser recomendados para uso pelos clientes.
- **Desativação:** o serviço ou os endpoints são retirados e deixam de estar disponíveis para os clientes.

### O que o livro diz sobre o procedimento (p.108-109)

- É uma causa de instabilidade esquecida e ignorada. A descontinuação de endpoints é mais comum que a de serviços inteiros, porque endpoints mudam quando recursos são adicionados ou removidos (p.108).
- É mais um problema sociológico que técnico, o que o torna mais difícil de tratar (p.108).
- Passos: avisar todos os clientes e orientar como lidar com a perda; se houver substituto, ajudar os clientes a migrar para os novos endpoints; no caso de endpoint, informar o novo ou orientar sobre a perda definitiva (p.108-109).
- Monitorar de perto antes de desligar: verificar se ainda chegam requisições ao serviço ou endpoint antigo (p.109).
- Consequência de fazer mal: dependências somem de repente e causam a maior instabilidade e falta de confiabilidade, mesmo quando outra equipe previu a falha (p.109). Serviços esquecidos sem supervisão têm falhas despercebidas e demoram a ser consertados; "desativados em vez de abandonados" (p.109).
- Falhas de dependência por descontinuação ou desativação sem comunicação aos clientes estão na lista de cenários de falha do livro (p.154-155).
- Verificação: existem procedimentos funcionando para desativar um serviço e para descontinuar endpoints? (p.111-112, 224).

O livro **não** descreve prazos, número de ciclos de aviso, formato de comunicação nem mecanismos como respostas de aviso ou chaves de funcionalidade. Qualquer detalhe além dos passos acima é convenção desta skill.

## Parte 4: não atribuir versões a microsserviços e endpoints

- Posição do livro: microsserviço não é biblioteca (não é carregado na compilação ou na execução) e sim aplicação independente; como o desenvolvimento é acelerado, atribuir versões vira pesadelo organizacional, com equipes clientes incorporando versões específicas, obsoletas e sem manutenção, no próprio código (p.40-41). Versionar endpoints de API é outro antipadrão pelas mesmas razões (p.41).
- Corolário para dependências internas: não atribuir versões a bibliotecas e serviços internos nem se prender a versões específicas, pois leva a erros, a falhas graves e ao uso de versões instáveis, não confiáveis e às vezes inseguras (p.154).
- Consequência para operação: sem versão precisa do serviço para citar num problema, os logs precisam ser bons o bastante para reconstruir o estado do serviço no momento da falha (p.78, 186).
- O livro usa "versão" também para versão da build e ponto de rollback (p.168, 219). A recusa é a de clientes se prenderem a versões; não é uma recusa a identificar artefatos de build ou a voltar à última versão estável.

**Síntese desta skill (não é do livro):** o livro não apresenta explicitamente "não versionar" e "descontinuar com monitoramento" como um único método, mas os dois se complementam: se não há versões em paralelo, a mudança incompatível precisa chegar por aviso aos clientes, migração assistida e observação de uso residual antes de remover o endpoint antigo (p.108-109). Quem quiser coexistência de versões, chaves de funcionalidade ou outro mecanismo deve tratar isso como decisão própria, justificada, e não como recomendação do livro.

## Perguntas de verificação

- A documentação está em local central e foi atualizada na última mudança significativa?
- Um desenvolvedor de outra equipe consegue usar o serviço como caixa-preta só com a documentação?
- Cada alerta tem runbook na documentação? Os contatos e o plantão estão atuais?
- Quando foi a última revisão de arquitetura? Saiu um diagrama novo e uma lista de projetos?
- Há auditoria, plano de adequação com responsáveis e, se possível, verificação automatizada?
- Para o endpoint ou serviço a retirar: quem são os clientes, foram avisados, quem ainda chama, e o desligamento só ocorre com tráfego residual zero ou aceito?
