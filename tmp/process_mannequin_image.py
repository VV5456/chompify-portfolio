import os
from PIL import Image

fp = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91\media__1789154598074.png"
im = Image.open(fp).convert("RGBA")
w, h = im.size
print(f"Mannequin image size: {w}x{h}")

# Save raw copy in public/artworks/mannequin_guide_raw.png
im.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\mannequin_guide_raw.png")

# Let's create an inverted version (dark linework on light parchment background)
# Background color of attached image is dark navy ~ (27, 31, 49)
# Linework is light ~ (240, 240, 240) and lines are gold ~ (230, 190, 120)

out_light = Image.new("RGBA", (w, h), (0, 0, 0, 0))
datas = im.getdata()

bg_r, bg_g, bg_b = 27, 31, 49

new_data_trans = []
new_data_espresso = [] # linework converted to dark espresso for light mode

for r, g, b, a in datas:
    # distance to background navy
    dist = abs(r - bg_r) + abs(g - bg_g) + abs(b - bg_b)
    if dist < 45:
        new_data_trans.append((0, 0, 0, 0))
        new_data_espresso.append((0, 0, 0, 0))
    else:
        # It's linework or gold indicator line
        new_data_trans.append((r, g, b, 255))
        # For espresso linework on light background:
        # map light linework (240,240,240) to dark espresso (44, 34, 30)
        # map gold lines (230,190,120) to terracotta primary (163, 92, 66)
        if b < 160: # gold/yellow line
            new_data_espresso.append((163, 92, 66, 255)) # terracotta #A35C42
        else:
            new_data_espresso.append((44, 34, 30, 255)) # espresso #2C221E

im_trans = im.copy()
im_trans.putdata(new_data_trans)
im_trans.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\mannequin_trans.png")

im_espresso = im.copy()
im_espresso.putdata(new_data_espresso)
im_espresso.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\mannequin_espresso.png")

print("Saved mannequin_trans.png and mannequin_espresso.png")
