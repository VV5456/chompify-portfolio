import os
from PIL import Image

art_dir = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks"
for f in sorted(os.listdir(art_dir)):
    fp = os.path.join(art_dir, f)
    if os.path.isfile(fp):
        mtime = os.path.getmtime(fp)
        size = os.path.getsize(fp)
        print(f"{f:35s} | size: {size:10d} | mtime: {mtime}")
