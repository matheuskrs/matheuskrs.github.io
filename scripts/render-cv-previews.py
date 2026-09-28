"""Render the first page of each résumé PDF as a WebP preview.

Run again whenever a PDF in public/cv changes:
    python scripts/render-cv-previews.py
Requires PyMuPDF and Pillow.
"""
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PDFS = {
    'cv-pt-BR': 'Matheus_Rodrigues_Desenvolvedor.pdf',
    'cv-en-US': 'Matheus_Rodrigues_Developer_EN.pdf',
}
OUT = ROOT / 'src' / 'assets' / 'cv'
OUT.mkdir(parents=True, exist_ok=True)

for name, pdf in PDFS.items():
    with pymupdf.open(ROOT / 'public' / 'cv' / pdf) as doc:
        pix = doc[0].get_pixmap(dpi=160)
    image = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    target = OUT / f'{name}.webp'
    image.save(target, 'WEBP', quality=88, method=6)
    print(target.relative_to(ROOT), image.size)
