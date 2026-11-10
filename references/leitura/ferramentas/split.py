import sys, os, re

# uso: python -I split.py <txt_dir> <out_dir> <paginas_por_bloco>
txt_dir, out_dir, per = sys.argv[1], sys.argv[2], int(sys.argv[3])
os.makedirs(out_dir, exist_ok=True)
index = []
for name in sorted(os.listdir(txt_dir)):
    if not name.endswith(".txt"):
        continue
    book = name[:-4]
    with open(os.path.join(txt_dir, name), encoding="utf-8") as f:
        pages = f.read().split("\f")
    if pages and not pages[-1].strip():
        pages = pages[:-1]
    total = len(pages)
    n_chunks = max(1, round(total / per))
    size = -(-total // n_chunks)
    for i in range(n_chunks):
        a, b = i * size, min(total, (i + 1) * size)
        if a >= b:
            break
        fn = f"{book}__{i+1:02d}_p{a+1:03d}-{b:03d}.txt"
        with open(os.path.join(out_dir, fn), "w", encoding="utf-8") as out:
            for p in range(a, b):
                # espacos de layout colapsados para economizar tokens, sem perder texto
                body = re.sub(r"[ \t]{3,}", "  ", pages[p])
                out.write(f"\n=== PDF PAGINA {p+1} ===\n{body}\n")
        index.append((fn, a + 1, b, os.path.getsize(os.path.join(out_dir, fn))))
for fn, a, b, sz in index:
    print(f"{fn}  paginas {a}-{b}  {sz//1024} KB")
