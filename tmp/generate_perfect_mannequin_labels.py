import os
from PIL import Image, ImageDraw, ImageFont

# Load attached reference image
fp = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91\media__1789154598074.png"
im = Image.open(fp).convert("RGBA")
w, h = im.size # 195 x 360

# Let's create a higher-resolution canvas (width = 400, height = 500)
# to give generous room on the left side of the pointer lines for the labels!
canvas_w = 420
canvas_h = 520

# Scale original mannequin to height ~ 460
scale = 460.0 / h
new_w = int(w * scale)
new_h = int(h * scale)

im_scaled = im.resize((new_w, new_h), Image.Resampling.LANCZOS)

# Create transparent output canvas
out = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

# Paste scaled mannequin on the right side of the canvas
# so the left ~ 160px is dedicated to the labels!
offset_x = canvas_w - new_w - 20
offset_y = (canvas_h - new_h) // 2

# Transform colors of scaled mannequin for light parchment background:
# Navy background -> Transparent
# Linework -> Espresso #2C221E
# Lines/Dots -> Terracotta #A35C42

datas = im_scaled.getdata()
new_pixels = []
bg_r, bg_g, bg_b = 27, 31, 49

for r, g, b, a in datas:
    dist = abs(r - bg_r) + abs(g - bg_g) + abs(b - bg_b)
    if dist < 50:
        new_pixels.append((0, 0, 0, 0))
    else:
        if b < 160: # Gold pointer line & dot
            new_pixels.append((163, 92, 66, 255)) # Terracotta
        else: # Mannequin figure linework
            new_pixels.append((44, 34, 30, 255)) # Dark espresso

im_scaled.putdata(new_pixels)

# Now draw extended horizontal indicator lines from mannequin to left labels!
draw = ImageDraw.Draw(im_scaled)

# Save converted mannequin image
im_scaled.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\coverage_guide_mannequin_clean.png")

# Now let's create a combined canvas image where labels sit on the left!
# 3 Y positions in scaled image:
y1 = int(76 * scale) # Headshots ~ 97px
y2 = int(170 * scale) # Half-Body ~ 217px
y3 = int(317 * scale) # Full-Body ~ 405px

print(f"Scaled line Y centers: y1={y1}, y2={y2}, y3={y3}")

# Draw extended pointer lines to the left
draw_out = ImageDraw.Draw(out)
out.paste(im_scaled, (offset_x, offset_y), im_scaled)

# Load font if available or use default
try:
    font = ImageFont.truetype("arial.ttf", 14)
    font_bold = ImageFont.truetype("arialbd.ttf", 13)
except:
    font = ImageFont.load_default()
    font_bold = font

# Extend indicator lines from mannequin line start (around offset_x + 10) to left margin (around 120)
# And place text labels on the left of each line!
labels = [
    ("HEADSHOTS", offset_y + y1),
    ("HALF-BODY", offset_y + y2),
    ("FULL-BODY", offset_y + y3)
]

for text, line_y in labels:
    # Draw line from x=110 to x=offset_x + 10
    draw_out.line([(100, line_y), (offset_x + 15, line_y)], fill=(163, 92, 66, 255), width=2)
    # Draw small diamond at left end
    draw_out.polygon([(95, line_y), (100, line_y-4), (105, line_y), (100, line_y+4)], fill=(163, 92, 66, 255))
    # Draw text on left
    draw_out.text((10, line_y - 8), text, fill=(163, 92, 66, 255), font=font_bold)

out.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\coverage_guide_left_labels.png")
print("Saved coverage_guide_left_labels.png")
