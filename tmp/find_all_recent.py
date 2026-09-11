import os, glob

dirs = [
    r"c:\Vedansh\VV codes\Claude\10k hrs\public",
    r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks",
    r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91"
]

for d in dirs:
    print("--- Directory:", d)
    if os.path.exists(d):
        for f in os.listdir(d):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                fp = os.path.join(d, f)
                print(f"  {f} ({os.path.getsize(fp)} bytes, mtime: {os.path.getmtime(fp)})")
