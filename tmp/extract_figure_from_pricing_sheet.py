import os
from PIL import Image

fp = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\artist_pricing_guide.png"
im = Image.open(fp).convert("RGBA")
w, h = im.size

# Let's inspect where the character figure illustration sits inside media__1789147574953.png
# Let's crop left half vs right half vs top/bottom
# Let's save 4 crops to see where the character figure is located exactly
c_top = im.crop((0, 0, w, int(h*0.5)))
c_bottom = im.crop((0, int(h*0.5), w, h))
c_left = im.crop((0, 0, int(w*0.5), h))
c_right = im.crop((int(w*0.5), 0, w, h))

c_top.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\guide_top.png")
c_bottom.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\guide_bottom.png")
c_left.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\guide_left.png")
c_right.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\guide_right.png")
print("Saved 4 crops of artist_pricing_guide.png")
