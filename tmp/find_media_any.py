import os

brain_root = r"C:\Users\vedan\.gemini\antigravity\brain"
for root, dirs, files in os.walk(brain_root):
    for f in files:
        if "media" in f.lower() or "pricing" in f.lower() or "figure" in f.lower():
            fp = os.path.join(root, f)
            print(f"{f} -> {fp}")
