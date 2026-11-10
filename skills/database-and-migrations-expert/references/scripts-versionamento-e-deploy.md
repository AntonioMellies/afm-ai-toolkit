# Scripts, versionamento e deploy

Fonte: *Refactoring Databases* (Ambler e Sadalage), caps. 1, 3, 4 e 5, com a seção entre colchetes. O livro é de 2006 e não conhece as ferramentas de migração atuais; a tradução para elas está em `exemplos-por-banco.md` `[fora do livro]`.

## Um script pequeno por refatoração

- O livro implementa cada refatoração à mão em um script próprio, com número único e crescente (por exemplo, o número do build da aplicação) [s.60].
- Motivos para scripts pequenos [s.62]:
  - **Simplicidade**: se uma refatoração se revelar inviável (um programa importante não pode ser atualizado), é fácil não aplicá-la.
  - **Correção**: aplicar na ordem; refatorações dependem umas das outras (renomear uma coluna e semanas depois movê-la).
  - **Versionamento**: ambientes ficam em versões diferentes; para levar a integração da versão 161 à 163 basta aplicar a 162 e a 163 (o exemplo do livro: desenvolvimento 163, integração 161, QA 155, produção 134).
- Cada refatoração tem script de esquema e, quando necessário, script de dados com o mesmo identificador [s.63]. O exemplo do livro é uma cópia única com `UPDATE ... SET coluna = (subselect)`.
- Há ainda o script pós-transição (remover coluna e triggers), guardado com o mesmo identificador e executado em ordem depois do fim do período [s.62].
- Siga as convenções de nomes e documentação da organização no trecho alterado [s.63].
- Mudanças grandes (chave substituta comum a todas as tabelas, convenção de nomes) viram muitas pequenas [s.89].

## Como identificar cada refatoração [s.86-89]

O livro compara três esquemas [s.86-89]: número de build da aplicação (simples e liga a versão do banco à da aplicação, mas gera versões não contíguas e confunde quando várias aplicações usam o mesmo banco), data e hora (simples, mas o nome do arquivo fica desajeitado e é preciso associar ao build) e identificador único como GUID (ainda exige definir a ordem).

Recomendação do livro: um único time responsável, número de build; vários times evoluindo o mesmo banco, data e hora [s.86, s.89]. Com número de build em vários times, não se sabe quem veio antes; a alternativa é um identificador de time dentro do número [s.62, s.87].

Coordenação entre equipes: o livro conta o caso de duas equipes que aplicaram a mesma refatoração de códigos padrão na mesma coluna, com conjuntos diferentes; o conflito só apareceu na pré-produção. Ordenar não basta, é preciso uma estratégia de coordenação [s.89].

## Tabela de versão do esquema [s.62, s.90-93]

- O livro guarda a versão do esquema em uma tabela (DatabaseConfiguration) de uma linha e uma coluna, atualizada a cada refatoração aplicada, com a mesma estratégia de identificação das refatorações [s.90-93].
- Observação desta skill: essa tabela guarda só a versão atual. O livro não trata histórico das aplicadas, nem proteção contra aplicação fora de ordem. As tabelas de histórico das ferramentas atuais vão além disso `[fora do livro]`.
- Ambientes em versões diferentes recebem os scripts da versão atual em diante [s.62, s.75]. A figura do livro cita a versão 758 como ponto de partida da produção, que é a própria versão da produção; os demais casos usam versão mais um. Trate como inconsistência do livro [s.75].

## Ativos sob controle de mudança [s.20-22, s.66, s.68, s.99]

Coloque no repositório, de preferência o mesmo da aplicação (rastreia quem mudou e permite voltar):

- scripts DDL de criação, scripts de carga, extração e migração de dados;
- arquivos de modelo de dados e metadados de mapeamento objeto-relacional;
- dados de referência;
- definições de procedures, triggers e views, constraints de integridade, sequences e índices;
- dados de teste, scripts que os geram e scripts de teste.

Motivo: equipes que não faziam isso tinham dificuldade de achar a versão certa do modelo ou do script na hora de implantar [s.99]. A possibilidade de voltar atrás importa porque uma mudança como renomear uma coluna pode se mostrar cara demais depois de quebrar dezenas de programas [s.20].

## Sandboxes e promoção [s.22, s.39, s.72-73]

- Cada desenvolvedor trabalha em um sandbox físico próprio, com cópia do código e do banco; quando satisfeito, promove ao ambiente de integração do projeto, testa e entrega ao resto do time [s.22].
- Cadeia lógica: desenvolvimento, integração do projeto, demo, teste ou QA, pré-produção, produção [s.22-23]. Quanto mais perto da produção, mais rígido o portão: um erro na integração afeta só o time, na pré-produção pode derrubar outros sistemas, em produção afeta clientes [s.72].
- Em cada ambiente: construir a aplicação, rodar os scripts de mudança do banco, rodar a regressão; se falhar, corrija no sandbox do desenvolvedor, reimplante e retreste [s.73].
- Promover à integração várias vezes ao dia é comum; implantar em demo e, idealmente, em pré-produção uma vez por iteração. Motivo: executar os scripts regularmente melhora e valida a instalação antes da produção [s.73].
- Tenha como montar um ambiente de banco com facilidade: um script de instalação que aplica o DDL inicial e os scripts de mudança aplicáveis e depois roda a regressão para confirmar que a instalação deu certo [s.98-99].

## Pacotes, janelas e deploy

- **Pacote por release**: as refatorações do período se acumulam numa pilha, que é congelada no fim do release como o pacote de mudanças [s.75-76]. Cada refatoração é tratada como uma transação própria: DDL, migração de dados e mudanças no código que acessa aquela parte [s.73, s.75]. Não é obrigatório aplicar tudo a todos os ambientes (o livro cogita levar a produção só até uma versão intermediária) [s.75].
- **Janela de deploy**: momento permitido para implantar em produção; agende em janelas definidas e coordene com as outras equipes que implantam na mesma janela [s.76, s.79].
- **Sequência de deploy** [s.79-82]: backup; regressão anterior; implantar aplicações; implantar refatorações do banco; regressão atual; back out se necessário; anunciar.
  - O backup permite voltar a um estado conhecido, o que é difícil em bancos grandes. Refatorações pequenas são fáceis de desfazer individualmente, vantagem que se perde quanto mais se espera, porque outras passam a depender delas [s.79].
  - Se a regressão anterior falhar, aborte e investigue [s.79].
  - **Back out no livro**: voltar aplicações e esquemas às versões anteriores e restaurar o banco do backup. O trecho lido não descreve scripts "down" para desfazer cada refatoração [s.80]. Num deploy complexo, implante em incrementos e teste cada um, o que é mais complexo mas evita que uma parte problemática derrube tudo [s.80, s.82].
  - Os testes de regressão não podem ter efeitos colaterais na produção [s.79-80].
- **Remover o esquema obsoleto** é um deploy à parte: datas fixas (por exemplo, trimestrais) em que períodos de transição podem terminar, remoções agrupadas e aplicadas de uma vez, testadas antes em QA ou pré-produção [s.82].

## Anunciar [s.68-69]

- Avise o time cedo (por exemplo, na reunião diária) e, no multiaplicação, as outras equipes, sobretudo ao promover para pré-produção.
- Atualize as notas de versão do banco, listando cada refatoração em ordem, e o modelo físico de dados.
- Não publique modelos antes de o esquema estabilizar.

## Convenção desta skill (fora do livro)

- Antes de qualquer script ir para produção, rode-o do zero numa cópia recente com backup, com a suíte de regressão antes e depois.
- Não edite um script que já foi aplicado em algum ambiente; corrija com um script novo `[convenção desta skill]`.
- O agente não executa DDL nem DML em produção sem autorização expressa do usuário; entregue os scripts, o plano de ensaio e o plano de back out, e peça a confirmação.
