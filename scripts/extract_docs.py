from docx import Document
from pathlib import Path

paths = [
    r"C:\Users\anoth\Desktop\Finance_App_Implementation_Plan.docx",
    r"C:\Users\anoth\Desktop\Advanced_Finance_App_System_Design_Part1.docx",
    r"C:\Users\anoth\Desktop\Advanced_Finance_App_System_Design_Part2.docx",
]

out_dir = Path("docs_extracted")
out_dir.mkdir(exist_ok=True)

summary = []
for p in paths:
    src = Path(p)
    if not src.exists():
        print(f"MISSING: {src}")
        continue
    doc = Document(str(src))
    texts = [para.text for para in doc.paragraphs if para.text and para.text.strip()]
    out_file = out_dir / (src.stem + ".txt")
    out_file.write_text("\n\n".join(texts), encoding="utf-8")
    print(f"WROTE: {out_file}")
    # find lines mentioning Phase P0
    matches = [t for t in texts if any(k in t.lower() for k in ["p0","phase 0","phase p0","phase0"]) ]
    summary.append((src.name, len(texts), len(matches)))
    if matches:
        print(f"Matches in {src.name}:")
        for m in matches[:10]:
            print(" - ", m[:200])

print("\nSUMMARY:")
for name, paras, hits in summary:
    print(f"{name}: {paras} paragraphs, {hits} P0 hits")
