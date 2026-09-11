import os
from PIL import Image

fp = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91\media__1789147574953.png"
im = Image.open(fp)
print(f"Image format: {im.format}, size: {im.size}, mode: {im.mode}")

# Save a smaller preview if needed or inspect region
preview = im.resize((540, 678))
preview.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\pricing_reference_preview.png")
print("Saved preview to public/pricing_reference_preview.png")
