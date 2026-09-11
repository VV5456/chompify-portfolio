import os
from PIL import Image

fp = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\A1DFF15B-55C6-48D4-9898-802A8C26E8DE.jpg"
im = Image.open(fp)
w, h = im.size
print(f"Image width: {w}, height: {h}")

# Let's inspect where the character figure is located by creating crops or transparent cutout
# Let's save a preview of left half and right half to see where the figure is
left_half = im.crop((0, 0, int(w*0.5), h))
right_half = im.crop((int(w*0.5), 0, w, h))

left_half.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\pricing_left.png")
right_half.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\pricing_right.png")
print("Saved left and right half crops")
