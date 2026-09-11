import os
from PIL import Image

fp = r"c:\Vedansh\VV codes\Claude\10k hrs\public\artworks\A1DFF15B-55C6-48D4-9898-802A8C26E8DE.jpg"
if os.path.exists(fp):
    im = Image.open(fp)
    print(f"A1DFF file size: {im.size}, mode: {im.mode}, bytes: {os.path.getsize(fp)}")
    # Save a preview
    prev = im.resize((600, 800))
    prev.save(r"c:\Vedansh\VV codes\Claude\10k hrs\public\pricing_a1dff_preview.png")
    print("Saved preview to public/pricing_a1dff_preview.png")
else:
    print("File does not exist")
