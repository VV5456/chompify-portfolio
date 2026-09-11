import os

brain_dir = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91"
for root, dirs, files in os.walk(brain_dir):
    for f in files:
        if f.startswith("media"):
            fp = os.path.join(root, f)
            print(f"{f} -> {fp}")
