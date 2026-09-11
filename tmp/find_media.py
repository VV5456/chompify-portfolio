import os

brain_dir = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91"
for fname in os.listdir(brain_dir):
    if fname.startswith("media__"):
        full_path = os.path.join(brain_dir, fname)
        mtime = os.path.getmtime(full_path)
        print(f"{fname} -> {full_path} (mtime: {mtime})")
