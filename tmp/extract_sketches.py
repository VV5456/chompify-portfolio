import os
from PIL import Image

src_path = r"C:\Users\vedan\.gemini\antigravity\brain\338b9f5c-4515-41c1-ae91-c8123140ad91\media__1789147574953.png"
out_dir = r"c:\Vedansh\VV codes\Claude\10k hrs\public\sketches"

os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path).convert("RGBA")
width, height = img.size

boxes = {
    "grimoire_dagger": (0.02, 0.02, 0.48, 0.33),
    "ornate_sword": (0.50, 0.02, 0.75, 0.49),
    "crescent_blade": (0.70, 0.04, 0.98, 0.48),
    "antique_key": (0.01, 0.32, 0.16, 0.52),
    "cracked_mirror": (0.16, 0.33, 0.48, 0.58),
    "celestial_clouds": (0.48, 0.48, 0.98, 0.72),
    "candlestick": (0.03, 0.56, 0.28, 0.90),
    "feathered_wings": (0.26, 0.65, 0.58, 0.94),
    "floral_flourish": (0.58, 0.73, 0.98, 0.98),
}

def process_element_clean(cropped):
    # Convert to RGBA
    cropped = cropped.convert("RGBA")
    pixels = cropped.load()
    w, h = cropped.size

    for x in range(w):
        for y in range(h):
            r, g, b, a = pixels[x, y]
            # Convert to grayscale brightness
            brightness = 0.299 * r + 0.587 * g + 0.114 * b

            # Threshold for line art: anything brighter than 175 is background
            if brightness > 175:
                pixels[x, y] = (0, 0, 0, 0)
            else:
                # Calculate line opacity based on pencil line intensity
                opacity = int(min(255, (175 - brightness) * 2.5))
                # Dark rich espresso line tint (#4A3324) matching the brand palette
                pixels[x, y] = (74, 51, 36, opacity)

    # Autocrop transparent edges
    bbox = cropped.getbbox()
    if bbox:
        cropped = cropped.crop(bbox)
    return cropped

for name, (x1, y1, x2, y2) in boxes.items():
    box_px = (int(x1 * width), int(y1 * height), int(x2 * width), int(y2 * height))
    cropped = img.crop(box_px)
    processed = process_element_clean(cropped)
    save_path = os.path.join(out_dir, f"{name}.png")
    processed.save(save_path)
    print(f"Saved clean transparent {name}.png ({processed.size[0]}x{processed.size[1]})")

print("All elements re-extracted with 100% clean transparent backgrounds!")
