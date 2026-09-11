import os
from PIL import Image

brain_dir = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91"
for f in os.listdir(brain_dir):
    if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        fp = os.path.join(brain_dir, f)
        try:
            im = Image.open(fp)
            print(f"BRAIN: {f:45s} -> {im.size}")
        except:
            pass

art_dir = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks"
for f in os.listdir(art_dir):
    if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        fp = os.path.join(art_dir, f)
        try:
            im = Image.open(fp)
            print(f"ARTWORK: {f:45s} -> {im.size}")
        except:
            pass
