import os
from PIL import Image, ImageDraw, ImageFont

# Open attached reference image
fp = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91\media__1789154598074.png"
im = Image.open(fp).convert("RGBA")
w, h = im.size
print(f"Original size: {w}x{h}")

# Let's inspect where the 3 horizontal gold lines are vertically in Y pixels:
# Gold line pixel color has low blue component (b < 160)
lines_y = []
for y in range(h):
    gold_count = 0
    for x in range(int(w*0.5)):
        r, g, b, a = im.getpixel((x, y))
        dist_bg = abs(r - 27) + abs(g - 31) + abs(b - 49)
        if dist_bg > 45 and b < 160: # gold line
            gold_count += 1
    if gold_count > 5:
        lines_y.append(y)

print(f"Detected Y rows with gold lines: {lines_y}")

# Group Y rows into 3 distinct line clusters
clusters = []
if lines_y:
    curr = [lines_y[0]]
    for y in lines_y[1:]:
        if y - curr[-1] <= 3:
            curr.append(y)
        else:
            clusters.append(int(sum(curr)/len(curr)))
            curr = [y]
    clusters.append(int(sum(curr)/len(curr)))

print(f"3 line Y centers: {clusters}")
