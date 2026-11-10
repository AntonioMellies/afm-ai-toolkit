# Formatação

Resumo do capítulo 5 de *Código Limpo*, em paráfrase. Páginas entre colchetes são marcadores PDF (veja fontes.md). As observações sobre formatadores automáticos que não são do livro estão marcadas como convenção desta skill.

## Por que formatar

A formatação é comunicação, e comunicar é a primeira obrigação do profissional. O estilo e a legibilidade influenciam todas as mudanças futuras e sobrevivem mesmo quando o código original é reescrito. Código bagunçado sugere descuido em todo o projeto. O livro pede que a formatação seja levada a sério, mas sem dogmatismo [p.81-82].

## Regra de equipe

- Escolher um conjunto simples de regras e aplicá-lo de forma consistente. A equipe adota um único estilo e todos o seguem, mesmo quando não é o preferido de cada um [p.82, 95].
- Definir o estilo é rápido: o autor relata dez minutos para fixar chaves, indentação e nomeação, e depois codificar as regras no formatador do ambiente de desenvolvimento [p.95].
- Convenção desta skill: ferramenta automática de formatação e de verificação de estilo no processo de integração evita discussão em revisão. O livro só diz que seria bom ter uma ferramenta que aplique as regras [p.82].
- Se as regras da equipe divergirem das desta página, vence a regra da equipe (G24) [p.294].

## Formatação vertical

| Tema | Orientação | Página |
|---|---|---|
| Tamanho do arquivo | Em sete projetos Java estudados, sistemas relevantes foram feitos com arquivos típicos de cerca de 200 linhas e limite em torno de 500. Não é regra fixa, mas arquivos pequenos são mais fáceis de entender | 82 |
| Metáfora do jornal | Nome simples que diga se é o módulo certo; conceitos e algoritmos de alto nível no topo; detalhes crescendo para baixo | 83 |
| Espaço vertical | Linha em branco separa pensamentos completos (conceitos) | 83-84 |
| Continuidade | Linhas intimamente relacionadas ficam juntas; comentário inútil entre declarações quebra a associação | 84-85 |
| Distância | Conceitos próximos ficam próximos; não separar em arquivos distintos sem razão forte (um dos motivos para evitar membros protegidos) | 85 |
| Variáveis locais | O mais perto possível do uso; em função pequena, no topo; variável de controle de laço dentro da estrutura do laço | 85-86 |
| Variáveis de instância | No início da classe, em local conhecido por todos; o livro não vê razão para escolher entre a convenção do topo e a do fim | 86 |
| Funções dependentes | Quem chama fica acima de quem é chamado e perto dele | 87-89 |
| Constantes | No nível em que fazem sentido, passadas para baixo, não escondidas em função de baixo nível | 89, 300-301 |
| Afinidade conceitual | Funções com a mesma convenção de nomes e variações da mesma tarefa ficam juntas, mesmo sem se chamarem | 89 |
| Ordenação | Dependências apontam para baixo, do conceito maior ao menor | 89-90 |

Em listas de heurísticas isso aparece como G10: variável local logo acima do primeiro uso e função privada logo abaixo do primeiro uso [p.287].

## Formatação horizontal

| Tema | Orientação | Página |
|---|---|---|
| Largura | No estudo, as linhas ficam em torno de 45 caracteres e rareiam acima de 80. O autor aceita 100 ou 120, considera passar disso falta de cuidado e usa 120 como limite pessoal. Recusa diminuir a fonte para caber 200 colunas | 90 |
| Espaço horizontal | Espaço em torno do operador de atribuição; sem espaço entre nome da função e parêntese; espaço depois das vírgulas dos argumentos | 91 |
| Precedência | Fatores sem espaço e termos com espaço mostram a prioridade dos operadores. Formatadores automáticos costumam apagar essa sutileza | 91 |
| Alinhamento | O autor abandonou o alinhamento de declarações e atribuições: enfatiza as coisas erradas. Uma lista longa que pede alinhamento indica classe grande demais | 92-93 |
| Indentação | Reflete a hierarquia de escopos; sem ela o código é quase ininteligível. Evitar colapsar if, while e funções curtas em uma linha | 93-94 |
| Escopos minúsculos | Evitar corpo vazio ou de uma linha em laços; se for inevitável, deixar o ponto e vírgula visível em linha própria | 95 |

## O que o livro não diz

- Não fixa número obrigatório de linhas por arquivo.
- Não impõe estilo de chaves nem largura de indentação: isso é decisão da equipe.
- Não trata formatação fora de Java, C++ e Pascal em termos de ordenação das funções.

## Exemplo próprio

```java
// Antes: sem separação, declarações longe do uso
class Report {
    private final Repo repo; private int pages;
    void print() { int total = 0; for (Row r : repo.rows()) { total += r.value(); }
        System.out.println(total); pages++; }
}

// Depois: conceitos separados, variável perto do uso, escopos visíveis
class Report {
    private final Repo repo;
    private int pages;

    void print() {
        int total = 0;
        for (Row row : repo.rows()) {
            total += row.value();
        }

        System.out.println(total);
        pages++;
    }
}
```
