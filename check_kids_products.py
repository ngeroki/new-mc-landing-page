import re

# Read the products.ts file
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all kids products and check their flags
pattern = r"\{[^}]*category:\s*'kids'[^}]*\}"
kids_products = re.findall(pattern, content, re.DOTALL)

print("=" * 80)
print("KIDS PRODUCTS ANALYSIS")
print("=" * 80)
print(f"\nTotal kids products: {len(kids_products)}\n")

for i, product in enumerate(kids_products, 1):
    # Extract name
    name_match = re.search(r"name:\s*'([^']+)'", product)
    name = name_match.group(1) if name_match else "Unknown"
    
    # Check for flags
    has_bestseller = 'isBestseller: true' in product
    has_new = 'isNew: true' in product
    
    flags = []
    if has_bestseller:
        flags.append("BESTSELLER")
    if has_new:
        flags.append("NEW")
    
    flag_str = ", ".join(flags) if flags else "No flags"
    
    print(f"{i}. {name:<40} [{flag_str}]")

print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)

# Count flags
bestseller_count = sum(1 for p in kids_products if 'isBestseller: true' in p)
new_count = sum(1 for p in kids_products if 'isNew: true' in p)

print(f"Kids products with isBestseller: {bestseller_count}")
print(f"Kids products with isNew: {new_count}")
print(f"Kids products without any flags: {len(kids_products) - bestseller_count - new_count}")

if bestseller_count == 0 and new_count == 0:
    print("\n⚠️  WARNING: No kids products have bestseller or new flags!")
    print("   The 'Sandal Anak' section on homepage will show 'No Items Found'")

print("=" * 80)
