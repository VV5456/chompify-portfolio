import os
from PIL import Image

fp = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\A1DFF15B-55C6-48D4-9898-802A8C26E8DE.jpg"
im = Image.open(fp)
w, h = im.size
print(f"Original A1DFF15B size: {w}x{h}")

# Let's save 3 vertical slices: left 33%, center 33%, right 33%
slice_left = im.crop((0, 0, int(w*0.35), h))
slice_center = im.crop((int(w*0.35), 0, int(w*0.7), h))
slice_right = im.crop((int(w*0.7), 0, w, h))

slice_left.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\slice_left.png")
slice_center.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\slice_center.png")
slice_right.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\slice_right.png")
print("Saved 3 vertical slices")
