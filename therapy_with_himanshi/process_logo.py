import os
import re
import base64
from PIL import Image, ImageOps
import io

def make_transparent(input_path, output_path, threshold=225):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # Check if the pixel is near-white
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            # Make transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved transparent PNG to {output_path}")

# Check files in attached_assets
assets_dir = "attached_assets"
for fname in os.listdir(assets_dir):
    if "logo" in fname.lower() or "manzar" in fname.lower():
        print(f"Found candidate asset: {fname}")

# Extract base64 image from client/src/assets/Manzar_cropped.svg if present
svg_path = "client/src/assets/Manzar_cropped.svg"
with open(svg_path, "r", encoding="utf-8") as f:
    svg_text = f.read()

match = re.search(r'data:image/png;base64,([A-Za-z0-9+/=]+)', svg_text)
if match:
    raw_b64 = match.group(1)
    img_data = base64.b64decode(raw_b64)
    img = Image.open(io.BytesIO(img_data)).convert("RGBA")
    
    # Process transparency
    datas = img.getdata()
    new_data = []
    for item in datas:
        # Near white threshold
        if item[0] >= 225 and item[1] >= 225 and item[2] >= 225:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Crop transparent borders (autocrop)
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    out_png_path = "client/src/assets/Manzar_logo_transparent.png"
    img.save(out_png_path, "PNG")
    print(f"Extracted and saved transparent logo to {out_png_path}, size: {img.size}")
