import os
from PIL import Image

brain_dir = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91"
for f in sorted(os.listdir(brain_dir)):
    if f.startswith("media"):
        fp = os.path.join(brain_dir, f)
        try:
            im = Image.open(fp)
            print(f"{f} -> Size: {im.size} | Mode: {im.mode} | Bytes: {os.path.getsize(fp)}")
        except Exception as e:
            print(f"{f} -> Error: {e}")
