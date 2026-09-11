import os
from PIL import Image

fp = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91\media__1789147574953.png"
im = Image.open(fp)
w, h = im.size
print(f"media__1789147574953.png size: {w}x{h}")

# Save full copy to public/artworks/artist_pricing_guide.png
im.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\artist_pricing_guide.png")
print("Saved to public/artworks/artist_pricing_guide.png")
