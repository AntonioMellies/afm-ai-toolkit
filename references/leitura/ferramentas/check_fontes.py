"""Confere citações curtas de skills/*/references/fontes.md contra o texto extraído dos livros.

Uso: python -I check_fontes.py <chunks_dir> <skills_dir> [skill ...]
Procura cada citação entre aspas (>= 4 palavras) em TODOS os blocos (normalizando acentos,
caixa e pontuação, e removendo hifenização de fim de linha). Citações sem acento perdido
por OCR/ligaduras aparecem como NÃO ACHADA e exigem conferência manual no PDF.
Citações de fontes externas (sites) não são conferidas aqui."""
import os, re, sys, unicodedata

chunks, skills = sys.argv[1], sys.argv[2]
only = set(sys.argv[3:])


def norm(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c)).lower()
    s = s.replace("ﬁ", "fi").replace("ﬂ", "fl").replace("ﬀ", "ff").replace("ﬃ", "ffi")
    return re.sub(r"[^a-z0-9]+", " ", s).strip()


corpus = {}
for fn in os.listdir(chunks):
    if fn.endswith(".txt"):
        t = open(os.path.join(chunks, fn), encoding="utf-8").read()
        t = re.sub(r"-\s*\n\s*", "", t)
        corpus[fn] = norm(t)
big = " ".join(corpus.values())
# O PDF perde ligaduras (fi, fl): comparação tolerante removendo-as dos dois lados.
big_lig = re.sub(r"f[il]", "", big)

QUOTE = re.compile(r"[\"“«]([^\"”»\n]{15,400})[\"”»]")
total = ok = 0
for skill in sorted(os.listdir(skills)):
    if only and skill not in only:
        continue
    refs = os.path.join(skills, skill, "references")
    if not os.path.isdir(refs):
        continue
    for fn in sorted(os.listdir(refs)):
        if not (fn.startswith("fontes") or "evans" in fn.lower() or fn.endswith(".md")):
            continue
        path = os.path.join(refs, fn)
        body = open(path, encoding="utf-8").read()
        if fn != "fontes.md":
            continue
        missing = []
        for line in body.splitlines():
            if not line.startswith("|"):
                continue
            if re.search(r"https?://|base externa", line, re.I):
                continue
            for q in QUOTE.findall(line):
                if len(q.split()) < 4:
                    continue
                parts = [p for p in re.split(r"\.\.\.|…|\[\.\.\.\]", q) if len(p.split()) >= 3]
                total += 1
                if all(norm(p) in big or re.sub(r"f[il]", "", norm(p)) in big_lig for p in parts):
                    ok += 1
                else:
                    missing.append(q)
        print(f"{skill}/{fn}: {len(missing)} não achadas")
        for m in missing:
            print(f"    NÃO ACHADA: {m[:140]}")
print(f"TOTAL: {ok}/{total}")
