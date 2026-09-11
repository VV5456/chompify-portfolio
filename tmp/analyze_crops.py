import os
from PIL import Image

fp = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\A1DFF15B-55C6-48D4-9898-802A8C26E8DE.jpg"
im = Image.open(fp)

# Let's inspect 4 quadrants: Top-Left, Top-Right, Bottom-Left, Bottom-Right
w, h = im.size
tl = im.crop((0, 0, int(w*0.5), int(h*0.5)))
tr = im.crop((int(w*0.5), 0, w, int(h*0.5)))
bl = im.crop((0, int(h*0.5), int(w*0.5), h))
br = im.crop((int(w*0.5), int(h*0.5), w, h))

tl.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\pricing_tl.png")
tr.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\pricing_tr.png")
bl.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\pricing_bl.png")
br.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\pricing_br.png")
print("Saved 4 quadrant crops")
