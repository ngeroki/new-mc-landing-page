import json

# Load products
with open('converted_products_final.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Find products with placeholder images
placeholder_products = [p for p in products if 'placeholder' in p['image']]

print(f"Total products: {len(products)}")
print(f"Products with placeholder images: {len(placeholder_products)}")
print(f"Products with real images: {len(products) - len(placeholder_products)}")

print("\n" + "="*60)
print("AFFECTED PRODUCTS (using placeholder):")
print("="*60)

for i, p in enumerate(placeholder_products, 1):
    print(f"{i}. {p['name']}")
    print(f"   ID: {p['id']}")
    print(f"   Category: {p['category']}")
    print(f"   Price: Rp {p['wholesalePrice']:,}")
    print()

# Save list to file
with open('products_without_images.txt', 'w', encoding='utf-8') as f:
    f.write("Products Without Images\n")
    f.write("="*60 + "\n\n")
    for i, p in enumerate(placeholder_products, 1):
        f.write(f"{i}. {p['name']} (ID: {p['id']})\n")

print(f"\nList saved to products_without_images.txt")
