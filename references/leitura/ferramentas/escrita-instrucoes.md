# Instruções de escrita de skill a partir de livros (Fase 1)

Você escreve (ou atualiza) UMA skill do repositório `C:\Users\Antonio Neto\Documents\Other Projects\afm-ai-toolkit`. Trabalhe SOMENTE nos arquivos da skill indicada no seu prompt (e crie o arquivo de fontes). Não edite README, AGENTS.md, manifests, grupos nem outras skills; o orquestrador faz isso. Não faça git add/commit.

## Antes de escrever
1. Leia `AGENTS.md` (regras do repo), `templates/skill/` e UMA skill existente curta como exemplo de estilo (`skills/clean-code-expert/SKILL.md`).
2. Leia no TEXTO ORIGINAL (arquivos `chunks/*.txt` em `C:\Users\ANTONI~1\AppData\Local\Temp\claude\d023d403ec4a025c\d35afb88-668d-4810-a6e5-36291cf05c7a\scratchpad\chunks\`, marcados `=== PDF PAGINA N ===`) os trechos que você vai usar. As notas em `...\scratchpad\notes\` são só um mapa para achar onde está cada assunto; NUNCA escreva uma regra que você não tenha conferido no texto do bloco. Use Read com offset/limit ou Grep para localizar e depois leia a página inteira.
3. Proibido usar conhecimento próprio sobre o livro para completar lacunas. Se algo não está no texto lido, não entra (ou entra marcado "convenção desta skill", sem atribuir ao livro).

## Regras de conteúdo (evidência: SkillsBench — skills curtas e focadas superam documentação exaustiva)
- `SKILL.md` curto e acionável: alvo ≤ 200 linhas (limite duro 450). Detalhes, catálogos e fichas vão para `references/` (um nível, todo arquivo listado em `## Referências`, todo link existente).
- Siga o formato obrigatório do AGENTS.md (frontmatter com name = nome da pasta, description ≤ 1024 caracteres com "Use quando…", metadata author "Antonio Mellies" e version "1.0" para skill nova; se for atualização, suba a version como o prompt indicar). Seções: Quando usar, Mentalidade Principal, seções específicas, Referências, Anti-Padrões, Comportamento Esperado, Regra Máxima.
- Neutralidade: nada de comandos de barra, nomes de tools internas nem nomes de agentes/ferramentas. Escreva em português, com acentuação correta. Exemplos de código em Java por padrão (coerência com as demais skills); se a skill pedir outras linguagens, vá para `references/exemplos-<lang>.md` e só com construções de que você tenha certeza.
- Direitos autorais: PARÁFRASE. Citação literal só curta (≤ 25 palavras), entre aspas, com página, e só em `references/fontes.md`. Nunca copie parágrafos, listas completas na ordem do livro nem código do livro.
- O `SKILL.md` deve orientar o raciocínio do desenvolvedor (por que, quando, como verificar), não só entregar resposta; exigir verificação externa (testes, execução) onde fizer sentido.
- Separe sempre: (a) regras do livro (com página em fontes.md); (b) "convenções desta skill" (preferências sem base no livro), marcadas como tal.

## Arquivo de rastreabilidade obrigatório
`skills/<nome>/references/fontes.md`: tabela com colunas Regra/ponto da skill | Livro | Capítulo/seção | Páginas (PDF) | Citação curta (opcional, ≤25 palavras). TODA regra atribuída a livro precisa de linha aqui. Páginas = marcador "PDF PAGINA N" do bloco.

## Entrega
- Valide: `wc -l skills/<nome>/SKILL.md` ≤ 450 (alvo ≤ 200); confira que name = pasta; que cada link de references existe; sem `: ` não citado quebrando o YAML na description; rode `agentskills validate skills/<nome>` se o comando existir (se não existir, diga isso e não tente instalar).
- Relatório final (≤ 200 palavras): arquivos criados, regras que você deixou de fora por falta de base, qualquer citação que não conseguiu conferir, e o que o orquestrador precisa ajustar (grupo, README).
