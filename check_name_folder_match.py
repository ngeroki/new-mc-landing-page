"""
Script to find mismatches between product names and folder names
"""

import os
import re

# Get all folder names from mcpolo directory
mcpolo_path = 'public/mcpolo'
mcpolo_terlaris_path = 'public/mcpolo-terlaris'

folders = []
if os.path.exists(mcpolo_path):
    folders.extend([f for f in os.listdir(mcpolo_path) if os.path.isdir(os.path.join(mcpolo_path, f))])

if os.path.exists(mcpolo_terlaris_path):
    folders.extend([f for f in os.listdir(mcpolo_terlaris_path) if os.path.isdir(os.path.join(mcpolo_terlaris_path, f))])

# Read products.ts
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract product entries
product_pattern = r"{\s+id:\s+'([^']+)',\s+name:\s+'([^']+)',.*?image:\s+'([^']+)',"
matches = re.findall(product_pattern, content, re.DOTALL)

mismatches = []

for product_id, product_name, image_path in matches:
    # Extract folder name from image path
    folder_match = re.search(r'/mcpolo(?:-terlaris)?/([^/]+)/', image_path)
    if folder_match:
        folder_name = folder_match.group(1)
        
        # Clean product name for comparison
        clean_name = product_name.replace('Sandal ', '').replace('Sepatu ', '').replace('Sanda ', '').strip()
        
        # Compare (case-insensitive, ignore spaces and dashes)
        name_normalized = clean_name.lower().replace(' ', '').replace('-', '')
        folder_normalized = folder_name.lower().replace(' ', '').replace('-', '')
        
        if name_normalized != folder_normalized:
            mismatches.append({
                'id': product_id,
                'product_name': product_name,
                'clean_name': clean_name,
                'folder_name': folder_name,
                'image_path': image_path
            })

# Write to file
with open('name_folder_mismatches.txt', 'w', encoding='utf-8') as f:
    f.write("=" * 80 + "\n")
    f.write("PRODUCT NAME vs FOLDER NAME MISMATCHES\n")
    f.write("=" * 80 + "\n\n")
    
    if mismatches:
        f.write(f"Found {len(mismatches)} mismatches:\n\n")
        for i, mismatch in enumerate(mismatches, 1):
            f.write(f"{i}. Product ID: {mismatch['id']}\n")
            f.write(f"   Product Name: {mismatch['product_name']}\n")
            f.write(f"   Clean Name: {mismatch['clean_name']}\n")
            f.write(f"   Folder Name: {mismatch['folder_name']}\n")
            f.write(f"   Image Path: {mismatch['image_path']}\n")
            f.write("\n")
    else:
        f.write("✅ No mismatches found! All product names match their folder names.\n")
    
    f.write("=" * 80 + "\n")
    f.write(f"Total products checked: {len(matches)}\n")
    f.write(f"Total mismatches: {len(mismatches)}\n")
    f.write("=" * 80 + "\n")

print(f"✅ Analysis complete! Found {len(mismatches)} mismatches out of {len(matches)} products.")
print(f"Results saved to: name_folder_mismatches.txt")
