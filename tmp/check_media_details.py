import os
from PIL import Image

brain_dir = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91"
for f in sorted(os.listdir(brain_dir)):
    if f.startswith("media"):
        fp = os.path.join(brain_dir, f)
        im = Image.open(fp)
        print(f"File: {f}")
        print(f"  Path: {fp}")
        print(f"  Dimensions: {im.size[0]} x {im.size[1]}")
        print(f"  Mode: {im.mode}")

art_dir = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks"
for f in sorted(os.listdir(art_dir)):
    fp = os.path.join(art_dir, f)
    im = Image.open(fp)
    print(f"Artwork File: {f}")
    print(f"  Dimensions: {im.size[0]} x {im.size[1]}")
