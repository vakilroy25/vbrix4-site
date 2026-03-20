#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont

def create_gradient(width, height):
    """Create a gradient from electric blue to cyber purple at 135 degrees"""
    gradient_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    
    for i in range(width):
        for j in range(height):
            # Calculate position along diagonal (135 degrees)
            t = (i + (height - j)) / (width + height)
            
            # Interpolate between electric blue and cyber purple
            r = int(0x00 + t * (0xa8 - 0x00))
            g = int(0xd4 + t * (0x55 - 0xd4))
            b = int(0xff + t * (0xf7 - 0xff))
            
            gradient_img.putpixel((i, j), (r, g, b, 255))
    
    return gradient_img

def create_gradient_text(text, font, width=None, height=None):
    """Create gradient text with transparent background"""
    # Create temporary image to measure text
    temp = Image.new('RGBA', (1000, 300), (0, 0, 0, 0))
    temp_draw = ImageDraw.Draw(temp)
    bbox = temp_draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Use provided dimensions or fit to text
    if width is None:
        width = text_width + 40
    if height is None:
        height = text_height + 40
    
    # Position text
    x = (width - text_width) // 2
    y = (height - text_height) // 2 - bbox[1]
    
    # Create gradient
    gradient_img = create_gradient(width, height)
    
    # Create mask for text
    mask = Image.new('L', (width, height), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.text((x, y), text, font=font, fill=255)
    
    # Apply mask to gradient
    result = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    result.paste(gradient_img, (0, 0), mask)
    
    # Crop to remove excess transparent space
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)
    
    return result

# Load Liberation Mono Bold (option 6)
try:
    font_large = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf", 120)
    font_medium = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf", 80)
    print("✓ Loaded Liberation Mono Bold font\n")
except:
    print("✗ Could not load Liberation Mono Bold, using fallback")
    font_large = ImageFont.load_default()
    font_medium = ImageFont.load_default()

# 1. Text-only logo
print("Creating text-only logo...")
text_only = create_gradient_text("vBrix4", font_large)
text_only.save('/home/vakil/projects/vbrix4-site/vbrix4-text.png', 'PNG')
print("✓ vbrix4-text.png")

# 2. Vertical layout: Logo on top, text below
print("\nCreating vertical logo (logo on top, text below)...")
text_img = create_gradient_text("vBrix4", font_medium)

# Load the existing logo
logo_img = Image.open('/home/vakil/projects/vbrix4-site/public/logo.png')
# Resize logo to be prominent
logo_size = 300
logo_img = logo_img.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

# Calculate canvas size with smaller spacing
vertical_spacing = 15  # Closer spacing between logo and text
canvas_width = max(logo_img.width, text_img.width) + 40
canvas_height = logo_img.height + text_img.height + vertical_spacing + 30

# Create canvas
vertical = Image.new('RGBA', (canvas_width, canvas_height), (0, 0, 0, 0))

# Position logo at top center
logo_x = (canvas_width - logo_img.width) // 2
vertical.paste(logo_img, (logo_x, 15), logo_img)

# Position text below (closer to logo)
text_x = (canvas_width - text_img.width) // 2
text_y = logo_img.height + vertical_spacing
vertical.paste(text_img, (text_x, text_y), text_img)

vertical.save('/home/vakil/projects/vbrix4-site/vbrix4-vertical.png', 'PNG')
print("✓ vbrix4-vertical.png")

# 3. Horizontal layout: Logo on left, text on right (logo bigger)
print("\nCreating horizontal logo (logo on left, text on right)...")
text_img_h = create_gradient_text("vBrix4", font_medium)

# Load logo and make it bigger than text
logo_img_h = Image.open('/home/vakil/projects/vbrix4-site/public/logo.png')
# Resize logo to be 1.8x the text height for prominence
target_height = int(text_img_h.height * 1.8)
logo_aspect = logo_img_h.width / logo_img_h.height
logo_img_h = logo_img_h.resize((int(target_height * logo_aspect), target_height), Image.Resampling.LANCZOS)

# Calculate canvas size
spacing = 30
canvas_width_h = logo_img_h.width + text_img_h.width + spacing + 40
canvas_height_h = max(logo_img_h.height, text_img_h.height) + 40

# Create canvas
horizontal = Image.new('RGBA', (canvas_width_h, canvas_height_h), (0, 0, 0, 0))

# Position logo on left (centered vertically)
logo_y = (canvas_height_h - logo_img_h.height) // 2
horizontal.paste(logo_img_h, (20, logo_y), logo_img_h)

# Position text on right (centered vertically)
text_x_h = 20 + logo_img_h.width + spacing
text_y_h = (canvas_height_h - text_img_h.height) // 2
horizontal.paste(text_img_h, (text_x_h, text_y_h), text_img_h)

horizontal.save('/home/vakil/projects/vbrix4-site/vbrix4-horizontal.png', 'PNG')
print("✓ vbrix4-horizontal.png")

print("\n✅ All logos created successfully with Liberation Mono Bold!")
