import re

# Read the products.ts file
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Products that need to be changed to 'sandal'
products_to_fix = [
    ('Sandal Teplek', 'slipper', 'sandal'),
    ('Sandal Jepit Bikro 01', 'flipflop', 'sandal'),
    ('Sandal Jepit Bikro 03', 'flipflop', 'sandal'),
    ('Sandal Camos', 'casual', 'sandal'),
    ('Sandal AW001', 'casual', 'sandal'),
    ('Sandal AW002', 'casual', 'sandal'),
    ('Sandal AW003', 'casual', 'sandal'),
]

print("=" * 80)
print("FIXING PRODUCT TYPES")
print("=" * 80)

changes_made = 0

for product_name, old_type, new_type in products_to_fix:
    # Find the product block and change its type
    # Pattern: find the product with this name and change the type line
    pattern = rf"(name:\s*'{re.escape(product_name)}'.*?type:\s*)'{old_type}'"
    
    if re.search(pattern, content, re.DOTALL):
        content = re.sub(pattern, rf"\1'{new_type}'", content, flags=re.DOTALL)
        print(f"✓ {product_name:<35} {old_type} → {new_type}")
        changes_made += 1
    else:
        print(f"✗ {product_name:<35} NOT FOUND or already correct")

# Write the updated content
with open('app/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n" + "=" * 80)
print(f"SUMMARY: {changes_made} products updated")
print("=" * 80)

# Verify the changes
print("\nVerifying changes...")
pattern = r"name:\s*'([^']+)'.*?type:\s*'([^']+)'"
products = re.findall(pattern, content, re.DOTALL)

type_counts = {}
for name, ptype in products:
    type_counts[ptype] = type_counts.get(ptype, 0) + 1

print("\nFinal type distribution:")
for ptype, count in sorted(type_counts.items()):
    print(f"  {ptype:<15} : {count} products")
print(f"\nTotal products: {len(products)}")
print("=" * 80)
