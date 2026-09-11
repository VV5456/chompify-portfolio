import os
from PIL import Image, ImageDraw, ImageFont

# Open attached image
fp = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91\media__1789154598074.png"
im = Image.open(fp).convert("RGBA")
w, h = im.size

# Let's create a transparent version where:
# Dark background becomes transparent or matches #F5F0E8 / #FAF7F2 studio parchment
# Linework becomes espresso #2C221E
# Lines & dots become terracotta #A35C42

datas = im.getdata()
new_data_light = [] # For light parchment background in Chompify theme
new_data_dark = []  # For dark espresso background

bg_r, bg_g, bg_b = 27, 31, 49

for r, g, b, a in datas:
    dist = abs(r - bg_r) + abs(g - bg_g) + abs(b - bg_b)
    if dist < 45:
        new_data_light.append((0, 0, 0, 0)) # transparent background
        new_data_dark.append((0, 0, 0, 0))
    else:
        # Check if line is gold/yellow vs white linework
        if b < 160: # gold marker line & diamond dot
            new_data_light.append((163, 92, 66, 255)) # Terracotta #A35C42
            new_data_dark.append((212, 140, 106, 255))
        else: # White mannequin figure linework
            new_data_light.append((44, 34, 30, 255)) # Dark espresso #2C221E
            new_data_dark.append((245, 240, 232, 255)) # Warm cream #F5F0E8

im_light = im.copy()
im_light.putdata(new_data_light)
im_light.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\coverage_guide_light.png")

im_dark = im.copy()
im_dark.putdata(new_data_dark)
im_dark.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\coverage_guide_dark.png")

print("Saved coverage_guide_light.png and coverage_guide_dark.png")
