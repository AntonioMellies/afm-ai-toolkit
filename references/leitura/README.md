# Registro de leitura das fontes (Passo 0)

Evidência de que o conteúdo dos livros de `references/books/` foi lido no arquivo original, capítulo a capítulo, antes de qualquer artefato ser criado a partir deles. **Estado: rascunho, revisão humana por amostragem pendente.**

## Como foi feito

1. Texto extraído de cada PDF com `pdftotext -layout`, dividido em blocos de ~80 páginas com marcadores `=== PDF PAGINA N ===` (`ferramentas/split.py`).
2. Cada bloco lido integralmente por um leitor independente, seguindo `ferramentas/leitura-instrucoes.md`: só o que está no texto, paráfrase com página, citações literais de até 25 palavras, marcação `[fora do livro]` para o que não está no texto.
3. Para os livros que já alimentam skills (Hard Parts, Arquitetura Limpa, Susan Fowler), cada bloco inclui a seção "Auditoria da skill atual" (afirmações confirmadas, não suportadas e lacunas).
4. Checagem automática das citações contra o texto do bloco (`ferramentas/check_quotes.py`).
5. Registro compacto por livro, gerado das notas (`ferramentas/consolidate.py`).

Páginas citadas são as do PDF (`PDF p.N`). A extração não traz a numeração impressa, exceto onde as notas indicam "impr.".

## Cobertura

| Livro | Idioma do PDF | Blocos lidos | Registro | Notas completas |
|---|---|---|---|---|
| Evans, *Domain-Driven Design* | inglês | 6 de 6 | [evans-ddd.md](evans-ddd.md) | `notas/evans-ddd__*.md` |
| Fowler, *Refatoração* | português | 6 de 6 | [fowler-refatoracao.md](fowler-refatoracao.md) | `notas/fowler-refatoracao__*.md` |
| Gamma et al., *Padrões de Projetos* | português | 4 de 4 | [gof.md](gof.md) | `notas/gof__*.md` |
| Goodliffe, *Como ser um Programador Melhor* | português | 6 de 6 | [goodliffe.md](goodliffe.md) | `notas/goodliffe__*.md` |
| Ford/Richards et al., *Software Architecture: The Hard Parts* | inglês | 6 de 6 | [hard-parts.md](hard-parts.md) | `notas/hard-parts__*.md` |
| Martin, *Arquitetura Limpa* | português | 6 de 6 | [arquitetura-limpa.md](arquitetura-limpa.md) | `notas/arquitetura-limpa__*.md` |
| Susan Fowler, *Microsserviços Prontos para a Produção* | português | 3 de 3 | [susan-fowler.md](susan-fowler.md) | `notas/susan-fowler__*.md` |
| Martin, *Código Limpo* | português (PDF escaneado, lido por OCR) | 5 de 5 | [codigo-limpo.md](codigo-limpo.md) | `notas/codigo-limpo__*.md` |

## Verificação das citações

| Conjunto | Citações no formato `"…" [p.N]` | Achadas literalmente no bloco |
|---|---|---|
| Evans, Fowler, GoF, Goodliffe | 356 | 329 (92%) |
| Hard Parts, Arquitetura Limpa, Susan Fowler | 198 | 167 (84%) |
| Código Limpo (OCR) | 65 | 60 (92%) |

As ausentes têm três causas conhecidas: (a) o PDF perde ligaduras `fi`/`fl` (`modi cações`) e o leitor corrigiu o texto; (b) paráfrases entre aspas, sobretudo em português sobre texto em inglês; (c) quebras de linha e aspas curvas. As causas (a) foram confirmadas em amostra. **Nenhuma citação ausente pode sustentar regra de skill sem conferência manual no PDF.** O Hard Parts tem a pior taxa (41 de 59).

## OCR do Código Limpo

O PDF é escaneado (sem texto extraível). O texto foi obtido com Tesseract 5.4 (idioma `por`, 250 dpi, PyMuPDF para renderizar) via `ferramentas/ocr.py`, fora do repositório. A prosa é legível; o código-fonte dos listados está muito corrompido e **não deve ser usado**. Páginas citadas são as do PDF. O leitor marcou a confiança do OCR (BOA, MÉDIA, RUIM) em cada capítulo; regras que dependem de texto ilegível foram descartadas.

## Problemas conhecidos

- Figuras, diagramas e muitas tabelas não foram extraídos; só legendas e texto.
- Indentação de código se perdeu; código dos exemplos não deve ser copiado das notas.
- Alguns capítulos continuam de um bloco no outro; o registro marca "continua".
- As notas completas (`notas/`) são material de trabalho local, fora do git (veja `.gitignore`); os registros por livro, versionados, são o índice. Citações só de trecho curto, com página.
- Leitura feita por modelo: os registros são rascunhos que o usuário revisa por amostragem antes de virarem base de skill.

## Achados que já alteram o plano

- Susan Fowler **não** trata de segurança; segurança backend fica sem base local (só OWASP, externa).
- Fowler cap. 11 trata de interface de código, não de API HTTP; Susan Fowler recomenda **não** versionar APIs de endpoint (p.40-41), o que contradiz `production-ready-microservices-expert/references/production-checklist.md` (linha de "versionamento de API"). `api-design-expert` não tem base local.
- O exemplo de log da skill de produção expõe `customerId`; o livro pede higiene de logs (Susan Fowler p.187).
- As skills `clean-architecture-expert` e `architecture-hard-parts-expert` misturam regras do livro com preferências próprias (Event Driven por padrão, Sagas, Outbox, "least worst", "sempre/nunca"), sem respaldo nos blocos lidos. A árvore de pacotes por camada contraria Arquitetura Limpa p.383-384.
- Evans cobre estrutura em larga escala, destilação do domínio, camada anticorrupção e DDD com legado, ausentes ou rasos em `domain-driven-design`.
