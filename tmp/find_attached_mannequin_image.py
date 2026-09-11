import os
import glob
from PIL import Image

brain_dir = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91"
png_files = sorted(glob.glob(os.path.join(brain_dir, "*.png")), key=os.path.getmtime, reverse=True)

for p in png_files[:10]:
    try:
        im = Image.open(p)
        print(f"{os.path.basename(p)}: {im.size}, mode={im.mode}")
    except Exception as e:
        pass
