import os

brain_dir = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91"
files = [f for f in os.listdir(brain_dir) if f.startswith("media")]
for f in files:
    fp = os.path.join(brain_dir, f)
    print(f"{os.path.getmtime(fp):.2f} | {f} | {os.path.getsize(fp)}")
