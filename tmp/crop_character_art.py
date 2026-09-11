import os
from PIL import Image

fp = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\artist_pricing_guide.png"
im = Image.open(fp).convert("RGBA")
w, h = im.size

# Let's inspect pixels across rows to find where text ends and character illustration is
# Usually character figure is on the left side or right side of the pricing guide
# Let's crop the character figure area
# If character figure is on the left side: (0, 0, int(w*0.5), h)
# Let's also create a clean transparent PNG of the character illustration from the pricing sheet!
datas = im.getdata()
new_data = []

# Detect background color near corner (0,0)
bg_r, bg_g, bg_b, _ = im.getpixel((5, 5))
print(f"Pricing sheet background color: ({bg_r}, {bg_g}, {bg_b})")

for item in datas:
    r, g, b, a = item
    dist = abs(r - bg_r) + abs(g - bg_g) + abs(b - bg_b)
    if dist < 40:
        new_data.append((r, g, b, 0))
    elif dist < 80:
        alpha = int(((dist - 40) / 40.0) * 255)
        new_data.append((r, g, b, alpha))
    else:
        new_data.append((r, g, b, 255))

im_trans = im.copy()
im_trans.putdata(new_data)
im_trans.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\pricing_character.png")
print("Saved pricing_character.png with transparency")
