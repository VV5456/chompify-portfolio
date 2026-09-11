import os
from PIL import Image

fp = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\A1DFF15B-55C6-48D4-9898-802A8C26E8DE.jpg"
im = Image.open(fp).convert("RGBA")
w, h = im.size

# Let's save both full artwork transparent and cropped character figure artwork transparent!
# Let's create a transparent PNG of the character illustration so it integrates seamlessly into the Chompify editorial pricing design!
bg_r, bg_g, bg_b = 245, 240, 232 # typical parchment/cream or light bg

datas = im.getdata()
new_data = []
for item in datas:
    r, g, b, a = item
    # calculate distance to background tone
    if r > 220 and g > 215 and b > 200:
        new_data.append((r, g, b, 0))
    else:
        new_data.append((r, g, b, 255))

im.putdata(new_data)
im.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\pricing_character_full.png")
print("Saved full transparent pricing image to public/artworks/pricing_character_full.png")
