import json

# Load products data
with open('products_data_updated.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Find YS products
ys_products = [p for p in products if 'ys' in p['Nama Produk'].lower()]

print(f"Found {len(ys_products)} YS products:\n")
for i, p in enumerate(ys_products, 1):
    print(f"{i}. {p['Nama Produk']}")

# Update product names - change "Sandal" to "Sepatu"
for product in products:
    if 'ys' in product['Nama Produk'].lower():
        old_name = product['Nama Produk']
        new_name = old_name.replace('Sandal', 'Sepatu')
        product['Nama Produk'] = new_name
        print(f"\n✓ Updated: {old_name} → {new_name}")

# Save updated data
with open('products_data_updated.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"\n✅ Updated products saved to products_data_updated.json")
