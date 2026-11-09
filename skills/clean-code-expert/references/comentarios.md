# Comentários

Resumo do capítulo 4 de *Código Limpo* e dos itens C1 a C5 do capítulo 17, em paráfrase. Entradas agrupadas por finalidade (a ordem não segue o livro). Páginas entre colchetes são marcadores PDF (veja fontes.md).

## Postura do livro

- O comentário compensa a nossa incapacidade de nos expressar em código. É, no máximo, um mal necessário e não algo a celebrar [p.59-60].
- Comentários envelhecem e se afastam do código que descreviam. Um comentário impreciso é pior que nenhum, e a verdade só está no código [p.60].
- Comentar código ruim não o conserta: limpe-o. Muitas vezes basta criar uma função ou variável cujo nome diga o que o comentário diria [p.60-61, 72-73].
- Mesmo os comentários aceitáveis têm restrições. O único comentário realmente bom é o que se tornou desnecessário porque o código se explica [p.61].

Ordem de ação sugerida (derivada do livro): (1) tente expressar no código; (2) se ainda faltar o porquê, escreva um comentário bom, curto e correto; (3) revise-o sempre que alterar o código vizinho.

## Comentários que o livro aceita (com a restrição de cada um)

| Tipo | Quando vale | Restrição | Página |
|---|---|---|---|
| Legal | Direitos autorais e licença exigidos pela organização | Referenciar a licença externa em vez de colar os termos | 61 |
| Informativo | Dado básico que o nome não carrega (formato esperado de um padrão de texto, valor devolvido por método abstrato) | Se um nome melhor ou uma classe dedicada resolver, o comentário some | 62 |
| Explicação da intenção | O porquê de uma decisão, mesmo que o leitor discorde da solução | Deve explicar a razão, não repetir a mecânica | 62-63 |
| Esclarecimento | Traduzir argumento ou retorno obscuro de biblioteca padrão ou de código que não se pode alterar | Alto risco de ficar errado; conferir | 63 |
| Alerta de consequências | Avisar que algo é lento, não é seguro para uso concorrente ou foi desligado por um motivo | Preferir os mecanismos da ferramenta de testes, com texto explicativo | 64 |
| TODO | Tarefa pendente que não pode ser feita agora | Não justifica deixar código ruim; varrer e eliminar com regularidade | 64-65 |
| Destaque | Realçar a importância de algo que parece irrelevante | Usar com parcimônia | 65 |
| Javadoc de API pública | Biblioteca ou API que terceiros vão usar | Pode mentir como qualquer comentário; aplicar o resto das regras | 65 |

O que o livro não lista como categoria: "regra de negócio complexa" e "decisão arquitetural". Uma regra de negócio cuja razão não é óbvia cabe em "explicação da intenção". Decisões arquiteturais e trade-offs costumam merecer registro fora do arquivo de código (convenção desta skill), e o comentário aponta para ele em vez de reproduzi-lo.

## Comentários que o livro condena

### Ruído e redundância

- **Redundante:** repete o que o código já diz e é menos preciso que ele [p.66-67, 281].
- **Ruidoso:** diz o óbvio ou desabafa; o leitor aprende a ignorá-lo e ele passa a mentir. O desabafo costuma ser sinal de uma extração de função que não foi feita [p.70-72].
- **Cabeçalho de função** em função curta e bem nomeada [p.76].
- **Javadoc em código não público:** formalidade que só acrescenta entulho [p.77].
- **Imperativo:** regra de que toda função ou variável tenha documentação gera lixo e mentira [p.69].
- **Ruído assustador:** documentação copiada e colada com erro mostra que ninguém lê o comentário [p.72].
- **Marcador de posição:** raro; só vale se o benefício for claro e se for usado esporadicamente [p.73].
- **Comentário na chave de fechamento:** sinal de que a função deveria ser menor [p.73-74].

### Enganoso ou obscuro

- **Enganador:** afirma algo sutilmente diferente do que o código faz [p.69].
- **Murmúrio:** comentário vago que obriga a investigar outros módulos para ser entendido [p.65-66].
- **Conexão nada óbvia:** o comentário precisa ele mesmo de explicação [p.76].
- **Informação não local:** descreve outra parte do sistema (um valor padrão definido longe dali) [p.75].
- **Informação excessiva:** histórico e discussões que o leitor não precisa [p.76].
- **HTML em comentário:** a ferramenta de documentação deve cuidar da marcação, não o programador [p.75].

### Metadados e código morto

- **Histórico de mudanças no topo do arquivo, créditos e autoria:** pertencem ao controle de versão e ao rastreador de tarefas (C1) [p.69-70, 74, 281].
- **Código comentado:** apague. O controle de versão lembra, e ninguém tem coragem de apagar o que está comentado [p.74-75, 282].

## Checagem rápida para revisão

1. O comentário diz algo que o código não consegue dizer? Se não, remova (C3).
2. Ele poderia virar nome de função ou de variável? Se sim, extraia (p.72-73).
3. Está perto do código que descreve e correto hoje? Se não, atualize ou apague (C2).
4. É metadado ou código morto? Mova para a ferramenta certa ou apague (C1, C5).
5. Está bem escrito: breve, gramatical, sem o óbvio (C4)?

## Exemplo próprio

```java
// Antes: o comentário compensa um nome e uma condição obscuros
// verifica se o cliente pode receber frete grátis
if (c.getTier() >= 3 && c.getTotal() > 200) { ... }

// Depois: o código diz a mesma coisa e o comentário some
if (customer.qualifiesForFreeShipping()) { ... }

// Comentário que se mantém: explica um porquê que o código não mostra
// A API do parceiro arredonda para cima; por isso comparamos em centavos.
```
