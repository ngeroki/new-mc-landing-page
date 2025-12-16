import json
import os
from pathlib import Path

# Load the updated products data
with open('products_data_updated.json', 'r', encoding='utf-8') as f:
    excel_products = json.load(f)

# Get list of existing image folders
mcpolo_path = Path('public/mcpolo')
existing_folders = [d.name for d in mcpolo_path.iterdir() if d.is_dir()]

# Function to normalize product names for matching
def normalize_name(name):
    if not name:
        return ""
    name = name.lower().replace('sandal', '').strip()
    name = name.replace(' ', '').replace('-', '').replace('_', '')
    return name

# Function to find matching image folder
def find_image_folder(product_name, folders):
    normalized_product = normalize_name(product_name)
    
    for folder in folders:
        if normalize_name(folder) == normalized_product:
            return folder
    
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

# Function to calculate MOQ from size range
def calculate_moq_from_size(size_range):
    if not size_range or '-' not in str(size_range):
        return 5
    
    try:
        parts = str(size_range).split('-')
        start = int(parts[0].strip())
        end = int(parts[1].strip())
        moq = end - start + 1
        return moq
    except:
        return 5

# Create TypeScript product entries
ts_products = []

for product in excel_products:
    product_name = product['Nama Produk']
    image_folder = find_image_folder(product_name, existing_folders)
    
    if image_folder:
        image_path = f'/mcpolo/{image_folder}/{image_folder}-01.jpg'
        lifestyle_path = f'/mcpolo/{image_folder}/{image_folder}-Lifestyle-01.png'
    else:
        image_path = '/images/placeholder-sandal.jpg'
        lifestyle_path = None
    
    product_id = normalize_name(product_name)
    if not product_id:
        product_id = f"product-{product['No']}"
    
    category = get_category(product['Gender'], product.get('Catatan Ukuran'))
    product_type = get_product_type(product_name)
    
    # Calculate MOQ from size range
    moq = calculate_moq_from_size(product['Ukuran'])
    
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
        'description': f"{product_name} dengan ukuran {product['Ukuran']}. MOQ {moq} Pcs."
    }
    
    ts_products.append(ts_product)

# Save to JSON
with open('converted_products_final.json', 'w', encoding='utf-8') as f:
    json.dump(ts_products, f, indent=2, ensure_ascii=False)

print(f"✅ Converted {len(ts_products)} products with updated MOQ")
print(f"   Saved to converted_products_final.json")
