import sys, os, re

# uso: python -I consolidate.py <notes_dir> <out_dir>
notes, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)

books = {}
for fn in sorted(os.listdir(notes)):
    if not fn.endswith(".md"):
        continue
    book = fn.split("__")[0]
    books.setdefault(book, []).append(fn)

for book, files in books.items():
    lines = [f"# Registro de leitura (rascunho): {book}\n"]
    lines.append("Gerado por script a partir das notas dos leitores. Cada item: capítulo/seção, páginas (PDF), relevância avaliada e decisão sugerida. Revisão humana por amostragem pendente.\n")
    n_sec = 0
    for fn in files:
        text = open(os.path.join(notes, fn), encoding="utf-8").read()
        cov = re.search(r"Primeira página lida:\s*(\d+).*?Última página lida:\s*(\d+)", text, re.S)
        rng = f"{cov.group(1)}-{cov.group(2)}" if cov else "?"
        lines.append(f"\n## Bloco {fn[:-3].split('__')[1]} (lido: {rng}; p.=PDF, s.=seção do ebook)\n")
        # divide por secoes '### '
        parts = re.split(r"\n(?=### )", text)
        for part in parts:
            if not part.startswith("### "):
                continue
            title = part.splitlines()[0][4:].strip()
            if re.match(r"\([abc]\)", title):
                continue  # subtitulos da secao de auditoria, tratados a parte
            rel = re.search(r"^Relev[âa]ncia[^\n]*", part, re.M)
            dec = re.search(r"^Decis[ãa]o sugerida[^\n]*", part, re.M)
            n_sec += 1
            lines.append(f"- **{title}**")
            lines.append(f"  - {rel.group(0) if rel else 'Relevância: (não registrada)'}")
            lines.append(f"  - {dec.group(0) if dec else 'Decisão sugerida: (não registrada)'}")
        # auditoria, se existir
        aud = re.search(r"## Auditoria da skill atual(.*?)(?=\n## |\Z)", text, re.S)
        if aud:
            lines.append("\n### Auditoria da skill atual (trecho das notas)\n")
            lines.append(aud.group(1).strip())
    lines.insert(2, f"Seções registradas: {n_sec}\n")
    open(os.path.join(out, book + ".md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print(f"{book}: {n_sec} secoes, {sum(os.path.getsize(os.path.join(notes, f)) for f in files)//1024} KB de notas")
