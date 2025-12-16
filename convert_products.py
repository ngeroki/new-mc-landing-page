import json
import os
from pathlib import Path

# Load the products data from JSON
with open('products_data.json', 'r', encoding='utf-8') as f:
    excel_products = json.load(f)

# Get list of existing image folders
mcpolo_path = Path('public/mcpolo')
existing_folders = [d.name for d in mcpolo_path.iterdir() if d.is_dir()]

print(f"Found {len(existing_folders)} image folders")
print(f"Found {len(excel_products)} products in Excel")

# Function to normalize product names for matching
def normalize_name(name):
    if not name:
        return ""
    # Remove "Sandal" prefix, convert to lowercase, remove spaces and special chars
    name = name.lower().replace('sandal', '').strip()
    name = name.replace(' ', '').replace('-', '').replace('_', '')
    return name

# Function to find matching image folder
def find_image_folder(product_name, folders):
    normalized_product = normalize_name(product_name)
    
    # Try exact match first
    for folder in folders:
        if normalize_name(folder) == normalized_product:
            return folder
    
    # Try partial match
    for folder in folders:
        normalized_folder = normalize_name(folder)
        if normalized_product in normalized_folder or normalized_folder in normalized_product:
            return folder
    
    return None

# Function to determine category from Gender field
def get_category(gender, size_note):
    if gender == 'Perempuan':
        return 'women'
    elif gender == 'Laki-Laki':
        return 'men'
    elif gender == 'Anak-anak':
        return 'kids'
    else:
        # Check size notes for unisex determination
        if size_note and 'unisex' in size_note.lower():
            return 'unisex'
        return 'unisex'

# Function to determine product type
def get_product_type(name):
    name_lower = name.lower()
    if 'jepit' in name_lower or 'bikro' in name_lower:
        return 'flipflop'
    elif 'selop' in name_lower or 'teplek' in name_lower:
        return 'slipper'
    elif any(x in name_lower for x in ['aw', 'camos', 'casual']):
        return 'casual'
    else:
        return 'sandal'

# Create TypeScript product entries
matched_count = 0
unmatched_products = []

ts_products = []

for product in excel_products:
    product_name = product['Nama Produk']
    image_folder = find_image_folder(product_name, existing_folders)
    
    if image_folder:
        matched_count += 1
        image_path = f'/mcpolo/{image_folder}/{image_folder}-01.jpg'
        lifestyle_path = f'/mcpolo/{image_folder}/{image_folder}-Lifestyle-01.png'
    else:
        unmatched_products.append(product_name)
        # Use placeholder
        image_path = '/images/placeholder-sandal.jpg'
        lifestyle_path = None
    
    # Generate product ID from name
    product_id = normalize_name(product_name)
    if not product_id:
        product_id = f"product-{product['No']}"
    
    category = get_category(product['Gender'], product.get('Catatan Ukuran'))
    product_type = get_product_type(product_name)
    
    # Extract MOQ number
    moq_str = product['MOQ']
    moq = int(moq_str.split()[0]) if moq_str else 5
    
    # Build the TypeScript object
    ts_product = {
        'id': product_id,
        'name': product_name,
        'category': category,
        'type': product_type,
        'image': image_path,
        'lifestyleImage': lifestyle_path if lifestyle_path else None,
        'wholesalePrice': product['Harga Grosir'],
        'moq': moq,
        'sizeRun': product['Ukuran'],
        'highlights': ['Kualitas Premium', 'Cocok untuk Toko Daerah', 'Stok Stabil'],
        'description': f"{product_name} dengan ukuran {product['Ukuran']}. MOQ {product['MOQ']}."
    }
    
    ts_products.append(ts_product)

print(f"\nMatched {matched_count} products with existing images")
print(f"Unmatched: {len(unmatched_products)} products")
if unmatched_products:
    print("\nUnmatched products:")
    for name in unmatched_products[:10]:
        print(f"  - {name}")
    if len(unmatched_products) > 10:
        print(f"  ... and {len(unmatched_products) - 10} more")

# Save to JSON for review
with open('converted_products.json', 'w', encoding='utf-8') as f:
    json.dump(ts_products, f, indent=2, ensure_ascii=False)

print(f"\nConverted products saved to converted_products.json")
print(f"Total products: {len(ts_products)}")
