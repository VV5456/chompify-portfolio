import os
from PIL import Image

# Read the pricing image
fp = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\A1DFF15B-55C6-48D4-9898-802A8C26E8DE.jpg"
im = Image.open(fp).convert("RGBA")
w, h = im.size

# Let's check the left half where the character illustration sits in A1DFF15B
# Crop character illustration box
char_box = im.crop((0, 0, int(w*0.5), h))

# Remove background (cream/off-white tone)
datas = char_box.getdata()
newData = []
for item in datas:
    r, g, b, a = item
    # Background distance check for cream #F5F0E8 / off-white
    if r > 215 and g > 205 and b > 190:
        # Fade to transparent smoothly
        alpha = max(0, 255 - int(((r + g + b) / 3.0 - 200) * 4))
        newData.append((r, g, b, alpha))
    else:
        newData.append((r, g, b, 255))

char_box.putdata(newData)

# Find bounding box of figure
bbox = char_box.getbbox()
if bbox:
    char_box = char_box.crop(bbox)

char_box.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\pricing_character.png")
print(f"Saved clean character cutout to public/artworks/pricing_character.png. Size: {char_box.size}")
