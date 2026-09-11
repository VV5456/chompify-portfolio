import os
from PIL import Image

art_dir = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks"
for f in sorted(os.listdir(art_dir)):
    if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        fp = os.path.join(art_dir, f)
        try:
            im = Image.open(fp)
            print(f"{f:35s} -> {im.size[0]}x{im.size[1]} ({os.path.getsize(fp)} bytes)")
        except Exception as e:
            print(f"{f:35s} -> Error: {e}")
