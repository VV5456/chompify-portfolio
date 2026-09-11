import os
from PIL import Image

fp = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\A1DFF15B-55C6-48D4-9898-802A8C26E8DE.jpg"
im = Image.open(fp)
w, h = im.size

# Let's crop different regions to isolate just the character figure illustration (without the pricing text in the image)
# E.g. left 40%, right 60%, top/bottom
crop1 = im.crop((0, 0, int(w*0.45), h))
crop2 = im.crop((int(w*0.45), 0, w, h))

crop1.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\pricing_fig_left.png")
crop2.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\pricing_fig_right.png")
print(f"Crop 1 size: {crop1.size}, Crop 2 size: {crop2.size}")
