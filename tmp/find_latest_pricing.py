import os, time

now = time.time()
search_dirs = [
    r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91",
    r"c:\Vedansh\VV codes\Claude\10k hrs"
]

found = []
for sd in search_dirs:
    for root, dirs, files in os.walk(sd):
        for f in files:
            fp = os.path.join(root, f)
            try:
                mtime = os.path.getmtime(fp)
                if (now - mtime) < 1800: # 30 mins
                    found.append((mtime, fp, os.path.getsize(fp)))
            except:
                pass

found.sort(reverse=True)
for mtime, fp, sz in found[:20]:
    print(f"{time.ctime(mtime)} | {sz:10d} bytes | {fp}")
