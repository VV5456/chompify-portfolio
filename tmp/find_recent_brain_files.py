import os, time

brain_dir = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91"
now = time.time()
for root, dirs, files in os.walk(brain_dir):
    for f in files:
        fp = os.path.join(root, f)
        mtime = os.path.getmtime(fp)
        if (now - mtime) < 1800:
            print(f"{time.ctime(mtime)} | {os.path.getsize(fp)} | {f} | {fp}")
