# Integração entre Contextos, Camada Anticorrupção e Sistemas Legados

Consulte ao desenhar ou revisar um Context Map, ao escolher como dois Bounded Contexts se relacionam ou ao integrar um sistema novo com legado ou sistemas externos.

Base: Eric Evans, *Domain-Driven Design*, cap. 14. As páginas citadas são as do PDF (veja [fontes.md](fontes.md)). Regras de Evans e convenções desta skill estão separadas: o que não tem página é convenção desta skill.

---

## Ponto de partida: mapear a realidade, não o ideal

* O Context Map descreve a situação **como ela é hoje**. Mapeie o terreno existente e só depois pense em transformações (p.305).
* Dê nome a cada Bounded Context e use esses nomes na linguagem da equipe. Diga "o modelo de Transporte mudou, vamos ajustar o tradutor do contexto de Reservas", não "o pessoal do fulano mudou" (p.311).
* Inclua no mapa os modelos implícitos de subsistemas que não são orientados a objetos (p.304).
* Se uma relação real não se encaixa em nenhum padrão, descreva-a como ela é. Não force o nome do padrão (p.305).
* Não mude o mapa antes de a mudança acontecer na realidade (p.305).
* As fronteiras tendem a seguir os contornos da organização das equipes e até a distância física entre elas (p.304).
* Em geral há uma equipe por Bounded Context. Uma equipe pode manter vários contextos, mas várias equipes dentro de um mesmo contexto é difícil (p.339).

### Sinais de que dois modelos estão misturados sem fronteira (p.301)

* **Conceitos duplicados:** dois elementos representam a mesma coisa e precisam ser atualizados nos dois lugares, divergindo com o tempo.
* **Falsos cognatos:** a mesma palavra (ou a mesma classe) significa coisas diferentes para quem usa. O livro ilustra com dois significados de "Charge" (cobrança ao cliente e pagamento a fornecedor) que corromperam código compartilhado (p.295).
* O alerta mais cedo costuma ser confusão de linguagem, antes de qualquer falha de código (p.301).

Dentro de **um** contexto, mantenha integração contínua: merges frequentes, testes automatizados e uso constante da linguagem ubíqua. Isso só é essencial dentro do contexto, não entre contextos vizinhos (p.302-303).

---

## Padrões de relacionamento entre contextos

Variáveis que decidem a escolha: nível de controle sobre o outro modelo, nível e tipo de cooperação entre as equipes e grau de integração de funcionalidades e dados (p.312). Reuso de código entre contextos é um risco a evitar; a integração passa por tradução (p.304).

| Padrão | Use quando | Custo e risco | Págs. |
|---|---|---|---|
| **Shared Kernel** | Duas equipes com contextos separados compartilham um subconjunto explícito do modelo (e do código/esquema associado) porque integração contínua plena seria cara demais | O kernel não muda livremente: mudança exige consulta à outra equipe, e os testes de ambas precisam passar. Aumenta o custo de coordenação, inclusive de deploy. Difícil se as tecnologias forem diferentes | 313-314, 317, 341 |
| **Customer/Supplier** | Relação upstream/downstream em que o downstream não devolve quase nada ao upstream, e as duas equipes respondem à mesma gestão (ou a empresas com papéis reais de cliente e fornecedor) | O cliente tem prioridade, mas não é o único; demandas são negociadas e orçadas no planejamento. Exige testes de aceitação automatizados escritos em conjunto e rodados na suíte do upstream. Sem motivação do upstream, o padrão falha | 315-318 |
| **Conformist** | Upstream/downstream sem motivação do upstream para atender o downstream, e o valor de usar o upstream é grande, o estilo do modelo é compatível ou a interface é grande | Aderir ao modelo do upstream elimina a tradução e dá linguagem comum, mas limita o downstream ao que o upstream oferece mais extensões puramente aditivas. Emocionalmente pouco atraente. Se for escolhido, deve ser integral: só extensão, sem alterar o modelo existente | 319-321, 339 |
| **Anticorruption Layer (ACL)** | Integração indispensável com legado ou sistema externo cujo modelo é fraco ou incompatível, e que não se pode ou não se quer adotar | Pode virar um software complexo por si só. O isolamento é caro e precisa ser pesado contra o benefício | 322-326, 338-339 |
| **Separate Ways** | Dois conjuntos de funcionalidade sem relação indispensável: declare um contexto sem conexão com os outros | Fecha opções: se a integração se mostrar necessária depois, tradutores podem ser complexos. Duplicação de esforço e perda de linguagem comum | 327-328, 340 |
| **Open Host Service** | Um subsistema muito demandado por muitas integrações, descrevível como conjunto coeso de serviços | Desenhar um protocolo limpo para várias equipes é mais difícil; só compensa com muitas integrações. Os outros subsistemas ficam acoplados ao modelo do host. Casos idiossincráticos: tradutor pontual, mantendo o protocolo simples | 329 |
| **Published Language** | Dois modelos precisam trocar informação e nenhum deve virar a língua franca; use uma linguagem compartilhada, documentada e, se existir, já publicada (padrão da indústria) | Usar o modelo de um dos lados como meio de troca o congela e impede evolução. Exige documentação suficiente para interpretações independentes | 330-332, 346 |

### Como escolher entre eles

Comece sempre pela pergunta mais barata e vá subindo.

1. **A integração é mesmo necessária?** Considere primeiro Separate Ways. Ter funcionalidades relacionadas em um caso de uso não obriga a integrá-las; às vezes basta dar acesso fácil aos dois sistemas na interface (p.327, 338).
2. **Contexto externo ou legado essencial:** a escolha é entre Conformist e Anticorruption Layer. Em sistema novo de peso, é pouco prático aderir ao modelo do legado (por que construir um sistema novo então?). Conformist faz sentido para **extensões periféricas** de um sistema que continuará dominante, como ferramentas leves de apoio à decisão em planilha, especialmente quando a interface é grande (p.338-339).
3. **Interface pequena, ou legado muito mal projetado, ou funcionalidade mais ampla que uma extensão:** construa seu próprio contexto com camada de tradução ou ACL (p.339).
4. **Componente de prateleira com interface grande:** em geral vale seguir o modelo do componente (adaptadores só para ajustes de formato). Se ele vale a pena, há conhecimento destilado no seu desenho (p.320).
5. **Sistema em desenvolvimento por você:** um único contexto é plausível para menos de dez pessoas com funcionalidade muito inter-relacionada. Crescendo a equipe, procure um Shared Kernel e quebre em contextos com menos de dez pessoas; se todas as dependências entre dois vão em uma direção, use Customer/Supplier (p.339).
6. **Modelos que colidem por jargões ou necessidades diferentes:** pode valer manter contextos separados (Separate Ways, com tradução como único ponto de integração contínua). Pese a perda de linguagem comum e o risco de justificar modelos paroquiais sem valor (p.339-340).
7. **Interface com muitos integradores:** Open Host Service e, se possível, Published Language (p.329-330).

Forças que puxam para contextos **maiores:** fluxo mais fluido entre tarefas, um modelo coerente é mais fácil de entender que dois mais mapeamentos, tradução pode ser difícil ou impossível, linguagem compartilhada. Forças para **menores:** menos comunicação entre desenvolvedores, integração contínua mais fácil, modelos abstratos grandes pedem habilidades escassas, modelos distintos atendem necessidades e jargões especializados (p.337-338).

A decisão é de equipe ou acima, não só técnica: a política entre equipes muitas vezes determina a integração. Parta de um mapa realista, avalie e comunique o custo (p.337).

---

## Anticorruption Layer: como desenhar

**O problema que ela resolve:** quando o novo sistema precisa se adaptar à semântica do outro, o modelo novo acaba corrompido, adaptado ad hoc. Os dados parecem primitivos e de significado óbvio, mas costumam não ter o mesmo significado nos dois lados; interface de baixo nível tira do outro sistema o poder de explicar e restringir os dados e joga a interpretação sobre o sistema novo (p.322-323).

**O que ela é e o que não é:** uma camada isoladora que oferece funcionalidade nos termos do **seu** modelo e fala com o outro sistema pela interface existente, exigindo pouca ou nenhuma mudança nele, traduzindo nos dois sentidos. Não é um mecanismo de transporte de mensagens; é tradução de objetos e ações conceituais entre modelos e protocolos (p.323).

**Estrutura sugerida (p.323-324):**

* **Interface pública como serviços**, às vezes como entidade, na linguagem do seu modelo. Pode ser melhor expor vários serviços, cada um com responsabilidade coerente, do que um único componente que represente o sistema externo.
* **Facade:** interface mais simples para o subsistema externo, escrita estritamente de acordo com o modelo **dele**. Ela pertence ao contexto do outro sistema. Se o outro lado for simples ou limpo, a facade pode ser dispensada.
* **Adapter:** para cada serviço que você define, um adapter que sabe fazer as requisições equivalentes ao outro sistema (ou à sua facade).
* **Translator:** a conversão de objetos e dados fica em objeto à parte do adapter. Pode ser leve, sem estado, e nasce junto com o adapter que atende.

**Outras decisões:**

* Normalmente seu sistema inicia a ação, mas a ACL pode ser bidirecional, com serviços e adapters nos dois lados e tradutores simétricos (p.324).
* Onde ficam os links de comunicação (entre facade e outro sistema, entre adapter e facade, ou a ACL inteira junto do outro sistema) é decisão pragmática de implantação, sem efeito no papel conceitual (p.324-325).
* Se tiver acesso ao outro sistema, um pouco de refatoração nele pode facilitar, em especial interfaces mais explícitas para o que você usa, começando por testes automatizados (p.325).
* Funcionalidade específica da relação pode morar na ACL, como trilha de auditoria do uso do sistema externo ou logs de depuração das chamadas (p.325).
* Quando a integração é muito extensa e a tradução fica cara, pode ser necessário aproximar o seu modelo do externo, com muito cuidado e só seletivamente. Se isso parecer a solução natural para boa parte do problema importante, considere virar Conformist e eliminar a tradução (p.325).
* ACL também cabe entre subsistemas seus que usam modelos diferentes, e entre contextos que seguiram Separate Ways mas ainda precisam de integração funcional (p.325).

**Teste nas fronteiras:** pontos de contato com outros contextos merecem testes automatizados, porque compensam a sutileza da tradução e a comunicação mais pobre nesses pontos. No exemplo do livro, o serviço de roteamento tem interface pequena, de funções sem efeito colateral, o que torna fácil testá-la com uma suíte automatizada (p.310). No Customer/Supplier, os testes de aceitação do downstream rodam na suíte do upstream (p.316).

**Custo:** o livro usa a Grande Muralha (fronteira útil, mas imensamente cara) para lembrar que estratégias de isolamento devem ser pesadas contra o custo. Há momento de ser pragmático e fazer revisões pontuais no modelo para que ele se encaixe melhor no estrangeiro (p.326).

### Esboço ilustrativo em Java (convenção desta skill, não é código do livro)

```java
// Interface na linguagem do SEU modelo
public interface ConsultaFiscal {
    SituacaoFiscal consultar(Documento documento);
}

// Adapter: conhece COMO pedir ao sistema legado
class ConsultaFiscalLegado implements ConsultaFiscal {
    private final ClienteLegado legado;          // facade do legado, no modelo DELE
    private final TradutorFiscal tradutor;       // sem estado

    public SituacaoFiscal consultar(Documento documento) {
        var resposta = legado.buscarRegistro(tradutor.paraChaveLegada(documento));
        return tradutor.paraSituacao(resposta);  // o modelo do legado não vaza
    }
}
```

Verificação sugerida (convenção desta skill): nenhum tipo do legado aparece fora da camada; testes de contrato da camada rodam sem o legado real (com resposta gravada) e uma vez contra o real; cada novo conceito do legado que aparecer no seu modelo é sinal de vazamento.

---

## Aplicando com sistema legado

1. **Mapeie como está:** defina os contextos pelo modo como as equipes trabalham hoje e descreva as relações reais. Depois aperte as práticas: melhore a integração contínua dentro dos contextos, refatore código de tradução espalhado para dentro de ACLs e nomeie os contextos (p.341).
2. **Não assuma que o legado é um contexto:** um Bounded Context pressupõe intenção de unificar o modelo. Verifique se o legado tem integração minimamente coordenada; não é raro encontrar contradições semânticas entre partes do mesmo sistema (p.338).
3. **Evite substituir todo o legado de uma vez.** O autor viu projetos que tentaram e diz que é demais para assumir de uma só vez; integrar com sistemas existentes é uma forma valiosa de reuso (p.322). Como primeira versão, uma aplicação mínima pode montar a operação e passar ao legado por uma ACL para o restante; a cada versão o sistema novo assume mais funções ou só agrega valor sem substituir, e dá para operar o conjunto durante toda a transição (p.325).
4. **Aposentar o legado, iteração por iteração (p.345-346):** defina a estratégia de testes antes (às vezes rodando novo e antigo em paralelo); em cada iteração identifique funcionalidade do legado que cabe numa iteração, identifique o que precisa mudar na ACL, implemente, implante. Depois de operando, remova o que sobrou desnecessário da ACL e considere extirpar módulos do legado (nem sempre prático). A ACL encolhe e incha ao longo do processo. Migre primeiro as funções que levam a ACLs menores, mas outros fatores costumam dominar. Quanto melhor o legado, mais fácil de aposentar.
5. **Banco de dados legado:** quando os dados vêm de um sistema que nunca foi pensado como repositório de objetos, há dois modelos de domínio coexistindo; pode fazer sentido adotar o modelo implícito do outro sistema ou manter o seu totalmente distinto (p.144).
6. **Fundir contextos (p.343-345):** Separate Ways para Shared Kernel antes de qualquer fusão total. Passos: avaliar se cada contexto é internamente unificado, montar processo e testes do kernel antes de compartilhar código, começar por um subdomínio pequeno e fora do Core Domain, formar grupo de dois a quatro desenvolvedores das duas equipes para o modelo compartilhado, implementar, integrar e remover tradução desnecessária. Do Shared Kernel para integração contínua plena é mais longo: circular pessoas entre as equipes, destilar cada modelo, só então fundir o Core Domain e aumentar a frequência de integração.
7. **De integrações ad hoc para Open Host Service e Published Language (p.346):** use um padrão da indústria se existir; senão, afine o Core Domain do host e use-o como base da linguagem de troca; publique a linguagem a todos os envolvidos; construa tradutores por colaborador; troque. Não equipare a linguagem de troca ao modelo do host, para poder continuar refatorando o modelo do host; manter os dois próximos reduz tradução.
8. **Antes de quebrar um contexto grande por achar o modelo complexo demais:** fragmentar perde oportunidades de integração. Considere destilação e estrutura em larga escala antes (p.347; veja [evans-destilacao-do-dominio.md](evans-destilacao-do-dominio.md) e [evans-estrutura-em-larga-escala.md](evans-estrutura-em-larga-escala.md)).

---

## O que o texto de Evans não contém

* **Partnership** e **Big Ball of Mud** não aparecem como padrões no texto de Evans conferido para esta skill. Se forem usados, atribua-os a outras fontes e marque como convenção.
* CQRS e Event Sourcing também não aparecem. Evans trata a integração como tradução entre modelos.
