import os
from PIL import Image, ImageChops

fp = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\A1DFF15B-55C6-48D4-9898-802A8C26E8DE.jpg"
im = Image.open(fp).convert("RGBA")
w, h = im.size

# Let's inspect background color at corners
bg_sample = im.getpixel((10, 10))
print(f"Background sample pixel at (10, 10): {bg_sample}")

# Let's inspect bounding box of non-background pixels or character figure
# Let's write a clean background removal / transparency script if background is beige/white
# Let's save a full transparent copy as public/pricing_character.png
datas = im.getdata()
newData = []

# Background color tolerance check
r_bg, g_bg, b_bg, _ = bg_sample

for item in datas:
    r, g, b, a = item
    # check distance from bg color
    dist = abs(r - r_bg) + abs(g - g_bg) + abs(b - b_bg)
    if dist < 45: # background
        newData.append((r, g, b, 0)) # transparent
    elif dist < 90: # soft edge alpha blend
        alpha = int(((dist - 45) / 45.0) * 255)
        newData.append((r, g, b, alpha))
    else:
        newData.append((r, g, b, 255))

im.putdata(newData)

# Find bounding box of non-zero alpha
bbox = im.getbbox()
print(f"Bounding box of content: {bbox}")

# Crop to content if needed or save full artwork
im_cropped = im.crop(bbox) if bbox else im
im_cropped.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\pricing_character.png")
print("Saved transparent character illustration to public/artworks/pricing_character.png")
