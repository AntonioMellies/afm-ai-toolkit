import sys, os, re, unicodedata

# uso: python -I check_quotes.py <chunks_dir> <notes_dir> [prefixo]
chunks, notes = sys.argv[1], sys.argv[2]
prefix = sys.argv[3] if len(sys.argv) > 3 else ""

def norm(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return s.strip()

QUOTE = re.compile(r"[\"“«]([^\"”»\n]{20,300})[\"”»]\s*\[p\.\s*\d+")
tot_all = ok_all = 0
for fn in sorted(os.listdir(notes)):
    if not fn.endswith(".md") or not fn.startswith(prefix):
        continue
    src = os.path.join(chunks, fn[:-3] + ".txt")
    if not os.path.exists(src):
        print(f"SEM-BLOCO {fn}")
        continue
    # texto do bloco sem marcadores, com hifenizacao de fim de linha removida
    text = open(src, encoding="utf-8").read()
    text = re.sub(r"-\s*\n\s*", "", text)
    ntext = norm(text)
    body = open(os.path.join(notes, fn), encoding="utf-8").read()
    qs = QUOTE.findall(body)
    # considera so citacoes com >= 5 palavras
    qs = [q for q in qs if len(q.split()) >= 5]
    miss = []
    ok = 0
    for q in qs:
        # separa trechos com reticencias
        parts = [p for p in re.split(r"\.\.\.|…|\[\.\.\.\]", q) if len(p.split()) >= 4]
        if not parts:
            continue
        if all(norm(p) in ntext for p in parts):
            ok += 1
        else:
            miss.append(q)
    tot = ok + len(miss)
    tot_all += tot
    ok_all += ok
    long_q = [q for q in qs if len(q.split()) > 30]
    print(f"{fn}: {ok}/{tot} citacoes encontradas no bloco; >30 palavras: {len(long_q)}")
    for m in miss[:4]:
        print(f"    NAO ACHADA: {m[:110]}")
print(f"TOTAL: {ok_all}/{tot_all}")
