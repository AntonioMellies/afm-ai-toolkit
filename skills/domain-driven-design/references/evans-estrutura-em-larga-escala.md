# Estrutura em Larga Escala

Consulte quando um modelo grande, já dividido em módulos e contextos, ainda é difícil de entender como um todo, ou quando equipes independentes tomam decisões de design incoerentes entre si.

Base: Eric Evans, *Domain-Driven Design*, cap. 16 e 17. As páginas citadas são as do PDF (veja [fontes.md](fontes.md)). Trechos marcados "convenção desta skill" não têm base no livro.

---

## Quando aplicar (e quando não)

**O problema:** mesmo com módulos, um modelo grande pode ser complicado demais para ser entendido; módulos dividem o desenho em pedaços, mas podem ser muitos e não trazem uniformidade. Bounded Contexts evitam corrupção, mas não ajudam a ver o sistema inteiro. A destilação foca o Core, mas ainda é preciso entender os elementos de apoio (p.384). Sem regras de coordenação, surgem estilos e soluções distintas para o mesmo problema, o conhecimento de uma parte não se transfere a outra, e o contexto se fragmenta (p.384).

**O que é:** uma linguagem para discutir e entender o sistema em linhas gerais, com conceitos ou regras de alto nível que estabelecem um padrão de design para o sistema todo e ajudam a coordenar trabalho independente. Pode ficar dentro de um contexto, mas geralmente atravessa vários (p.385).

**Quando NÃO aplicar (p.385-387):**

* Em equipe pequena e modelo não muito complicado, módulos bem nomeados, alguma destilação e coordenação informal bastam (p.385).
* A estrutura é **opcional**, ao contrário do Context Map. Só deve ser imposta quando custo e benefício a favorecem e quando se encontra uma estrutura que clareie muito o sistema sem forçar restrições antinaturais (p.387).
* Uma estrutura que não se encaixa é pior do que nenhuma. Não busque abrangência: encontre o conjunto mínimo que resolve os problemas que surgiram. "Menos é mais" (p.387).
* Se as exceções à estrutura se tornam numerosas, mude-a ou descarte-a. Poucas exceções são aceitáveis desde que sinalizadas (p.387).
* Se a estrutura força muitas escolhas de design desajeitadas, avalie, modifique ou descarte (p.398).
* Evans observa que abordagens que quebram o domínio por tarefa da aplicação ou por caso de uso enfraquecem o paradigma de objetos, e que esta área ainda é pouco desenvolvida (p.387).

---

## Evolving Order (p.386-387)

**Ideia:** deixe a estrutura conceitual evoluir com a aplicação, podendo até mudar para um tipo completamente diferente, sem restringir demais as decisões detalhadas de modelo e design (p.386).

**Por quê:** impor uma estrutura grande de antemão tende a ser cara, porque você quase certamente achará uma estrutura mais adequada depois e a estrutura prescrita pode impedir rotas que clareariam o modelo. O problema não é haver regras, e sim a rigidez e a origem delas: regras que realmente se ajustam empurram o desenvolvimento na direção certa (p.386). Arquiteturas que congelam muitas decisões iniciais viram camisa de força; desenvolvedores acabam emburrecendo a aplicação para caber na estrutura ou a subvertem (p.386).

**Como na prática (p.414-415):**

* **Minimalismo:** mantenha a estrutura simples e leve; trate as preocupações mais sérias e deixe o resto caso a caso. No início, uma estrutura frouxa como uma metáfora de sistema ou duas camadas de responsabilidade já ajuda (p.414).
* **Comunicação e autodisciplina:** a equipe toda deve seguir a estrutura; termos e relações entram na linguagem ubíqua. Sem isso a estrutura decai, pois não é explícita no código e os testes funcionais não dependem dela (p.414).
* Um desenho com estrutura costuma ser mais fácil de transformar do que um sem ela, mesmo ao trocar de um tipo de estrutura para outro (p.415).
* Destilação reduz o trabalho de reestruturar: elementos genéricos e mecanismos fora do Core podem ser definidos para caber simplesmente na estrutura (p.415).

**Quem define (p.423-427):** estrutura que emerge da equipe de aplicação, com alguém "árbitro e comunicador" que continua sendo desenvolvedor, ou uma equipe de arquitetura que age como par e trabalha junto às equipes. Seis condições para decisões estratégicas: decisões chegam a toda a equipe; o processo absorve feedback; o plano permite evolução; equipes de arquitetura não devem drenar os melhores desenvolvedores; minimalismo e humildade; objetos são especialistas, desenvolvedores são generalistas. Evite "frameworks para leigos" e planos mestres rígidos (p.425-428).

---

## System Metaphor (p.388-389)

**Quando:** surge uma analogia concreta que capta a imaginação da equipe e leva o raciocínio a uma direção útil; ela dá referência compartilhada, em geral mais concreta que o modelo (p.388-389).

**Como:** organize o design em torno da metáfora e absorva-a na linguagem ubíqua. Ela deve facilitar a comunicação e guiar o desenvolvimento, aumentando a consistência entre partes e até entre contextos, já que, sendo analogia, modelos diferentes a mapeiam de forma aproximada (p.388-389).

**Cuidados:**

* Toda metáfora é inexata. Reexamine continuamente quanto a exagero ou inadequação e esteja pronto para largá-la (p.389). O exemplo do "firewall" mostra clareza útil e também limitações que a metáfora trouxe (p.388).
* Poucos projetos encontram metáforas realmente úteis, e há quem tente forçá-las onde são contraproducentes (p.388).
* Não é essencial: numa prática de XP, a linguagem ubíqua pode cumprir o papel da metáfora do sistema (p.389). O livro recomenda aposentar o termo "metáfora ingênua" para o próprio modelo de domínio (p.389).

---

## Responsibility Layers (p.390-401)

**Não confundir** com a arquitetura em camadas técnicas (interface, aplicação, domínio, infraestrutura). Aqui as camadas são grandes responsabilidades do **domínio**.

**Quando:** o domínio tem estratificação natural: conceitos e atividades que ocorrem sobre um fundo de outros elementos que mudam de forma independente e em ritmos diferentes (p.390). Camadas ad hoc, só pela ordem de dependências, não dão insight de modelo nem guiam decisões (p.390).

**Como:**

* Olhe as dependências conceituais e as taxas e fontes de mudança de cada parte. Se houver estratos naturais, defina-os como responsabilidades abstratas e amplas que contem a história do propósito do sistema.
* Refatore para que a responsabilidade de cada objeto, agregado e módulo caiba em uma camada (p.391).
* Use a variante "relaxed layered system": componentes podem acessar qualquer camada inferior, não só a imediatamente abaixo (p.391).
* Camadas superiores conhecem e usam as inferiores; as inferiores são independentes das superiores (p.390). Uma associação bidirecional que viole a ordem vira consulta (p.393).
* Para um sinal que sobe (por exemplo, exceção operacional que a camada de política precisa tratar), um mecanismo de eventos evita dependência bidirecional (p.413).

**Critérios de boas camadas (p.398):** contam a história das prioridades do negócio (decisão de modelagem de negócio, não técnica); conceitos superiores fazem sentido sobre os inferiores, e os inferiores fazem sentido sozinhos; acomodam diferentes taxas e fontes de mudança (conceptual contours).

**Camadas recorrentes em famílias de domínios (p.399-400):**

| Camada | Pergunta | Observação |
|---|---|---|
| Potential (ou Capability) | O que **poderíamos** fazer? | Recursos e contratos. Objetos de Operations podem referenciá-la; o contrário não |
| Operations | O que **está sendo** feito? | Reflete a realidade, não o desejo |
| Decision Support | Que ação tomar? | Análise sobre as camadas inferiores; pode virar contexto próprio com Customer/Supplier |
| Policy | Quais são as regras e metas? | Passiva, restringe as outras camadas; pode ser passada como argumento ou usar Strategy |
| Commitment | O que prometemos? | Típica de seguros e finanças; mistura traços de Policy e Operations |

Nem todo domínio tem essas camadas; em negócios cuja capacidade é determinada pelas operações correntes (finanças, seguros) o Potential tende a se fundir a Operations (p.400). Mais de quatro ou, no máximo, cinco camadas torna-se pesado e perde o efeito de contar a história. A estrutura deve ser "ferozmente destilada" (p.401).

**Efeito no design contínuo (p.396-398):** no exemplo, dar à `Carga` (Operations) a responsabilidade de aplicar uma política de rota para cargas perigosas (Decision Support) violaria a estrutura; a alternativa foi o roteador coletar as políticas. Não é necessariamente um design melhor, mas decisões consistentes tornam o conjunto mais compreensível. Se muitas escolhas ficarem desajeitadas, a estrutura deve ser reavaliada (p.398).

---

## Knowledge Level (p.402-408)

**Quando:** os papéis e relacionamentos entre entidades precisam mudar na instalação ou em tempo de execução, sob regras mais amplas, e o modelo precisa ser plástico na mão do usuário mas restrito (p.402). Os sintomas de um modelo que não comporta isso: usuários reaproveitando campos para fins não previstos, comportamentos que "disparam errado", mapeamentos complicados entre o que fazem e o que o software faz, e migração de dados dolorosa depois (p.402). O exemplo de folha de pagamento e pensão mostra que tanto modelo super-restrito quanto sub-restrito falham (p.403-405).

**Como:** crie um conjunto distinto de objetos que descrevem e restringem a estrutura e o comportamento do modelo básico, mantendo dois níveis separados: um concreto (operacional) e outro que reflete regras e conhecimento que um usuário ou superusuário pode personalizar (p.406). Objetos comuns do domínio, não os mecanismos de reflexão da linguagem (p.406). Não busca generalidade total: um conjunto especializado de restrições costuma ser mais útil que um framework geral (p.406).

**Sinais de que já existe um nível implícito:** restrições de edição por perfil e relações do tipo "coisa-coisa", como a de um tipo de funcionário que impõe comportamento a funcionários (p.407-408).

**Custos e cautelas:** usar com moderação. A indireção traz obscuridade; se o nível ficar complexo, o comportamento fica difícil de entender; o usuário que configura passa a precisar de habilidade de programador de metanível; erros de configuração quebram a aplicação; migrar dados quando a estrutura muda continua exigindo análise; o projeto precisa ser robusto para cenários futuros de configuração (p.406). Aplicado com critério nos pontos em que a customização é crucial, resolve problemas muito difíceis de outra forma (p.406-407).

**Relação com outras estruturas:** não é caso especial de Responsibility Layers, pois as dependências vão nos dois sentidos. Pode coexistir com a maioria das estruturas, dando outra dimensão de organização (p.408).

---

## Pluggable Component Framework (p.409-412)

**Quando:** um modelo muito maduro, profundo e destilado, tipicamente depois que várias aplicações já foram implementadas no mesmo domínio. Aplicações projetadas de forma independente, mas baseadas nas mesmas abstrações, precisam interoperar, e Shared Kernel não é viável entre equipes que não trabalham próximas (p.409).

**Como:** destile um Abstract Core de interfaces e interações e crie um framework em que implementações diversas dessas interfaces sejam substituíveis; qualquer aplicação pode usar os componentes desde que opere estritamente pelas interfaces do núcleo abstrato. Normalmente há um hub central; vários Bounded Contexts podem ficar atrás das interfaces dos componentes (p.409). O framework técnico só é necessário se resolver um problema técnico essencial como distribuição (p.409). Pode haver Published Language para o plug-in do hub (p.409).

**Quando NÃO:**

* É um padrão muito difícil de aplicar: exige precisão nas interfaces e modelo profundo o bastante para capturar o comportamento necessário no Abstract Core (p.409).
* Limita as opções das aplicações: não se pode mudar o Abstract Core sem mudar o protocolo de todos os componentes, e o refinamento contínuo do Core "congela" (p.409).
* **Não deve ser a primeira estrutura em larga escala do projeto, nem a segunda.** Os melhores exemplos vieram depois do desenvolvimento completo de várias aplicações especializadas (p.410). O próprio livro descreve o histórico de sucesso desses frameworks como misto (p.410).

---

## Quão restritiva deve ser a estrutura (p.413)

Estruturas variam da muito frouxa (metáfora) à restritiva (componentes plugáveis); mesmo dentro de um padrão há escolha. Mais restrição aumenta uniformidade e interpretabilidade, mas tira flexibilidade e pode ser impraticável entre contextos de tecnologias diferentes. A maior contribuição é a coerência conceitual e o insight sobre o domínio. Cada regra estrutural deve facilitar o desenvolvimento; resista à tentação de construir frameworks e regimentar a implementação (p.413).

---

## Combinando com contextos, destilação e estratégia (cap. 17)

* Estrutura em larga escala, Bounded Contexts e destilação são complementares, não substitutos. A estrutura pode ficar dentro de um contexto (aumentando o teto de complexidade) ou organizar o Context Map inteiro (p.417-418).
* Um legado cuja organização contradiz a estrutura desejada não obriga a abandonar as camadas: reconheça o lugar real dele na estrutura; os serviços da facade podem ser desenhados para caber cada um em uma camada (p.418-419).
* Usar estruturas distintas em contextos vizinhos é possível, mas exagerar corrói o valor da estrutura como conceito unificador (p.420).
* A estrutura ajuda a explicar as relações dentro do Core e entre subdomínios genéricos, e pode ela mesma ser parte do Core, como a distinção entre Potential, Operations, Policy e Decision Support (p.421).

**Avaliação inicial antes de qualquer estratégia (p.422):**

1. Dá para desenhar um Context Map consistente? Há situações ambíguas?
2. Existe linguagem ubíqua e ela é rica o bastante?
3. O Core Domain está identificado? Há Domain Vision Statement? Dá para escrever um?
4. A tecnologia do projeto favorece ou prejudica o design guiado por modelo?
5. A equipe tem as habilidades técnicas necessárias?
6. Os desenvolvedores conhecem e se interessam pelo domínio?

Veja [evans-camada-anticorrupcao-e-legado.md](evans-camada-anticorrupcao-e-legado.md) e [evans-destilacao-do-dominio.md](evans-destilacao-do-dominio.md) para os dois primeiros eixos.

---

## Resumo de decisão

| Estrutura | Custo/rigidez | Indicada quando |
|---|---|---|
| System Metaphor | Muito baixa | Aparece uma analogia que funciona; reexamine sempre |
| Responsibility Layers | Média | Estratificação natural com ritmos de mudança diferentes; máximo de 4 a 5 camadas |
| Knowledge Level | Média, com custo de indireção | Configuração por usuário de papéis e relações; usar com parcimônia |
| Pluggable Component Framework | Alta | Modelo maduro, várias aplicações já existentes; nunca como primeira ou segunda estrutura |

Verificação sugerida (convenção desta skill): alguém novo consegue dizer em uma frase qual é a estrutura e onde um novo conceito vai entrar? A estrutura teve exceções sinalizadas? Há registro de quando ela foi reavaliada?
