import re

# Read the products.ts file
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

print("=" * 80)
print("CHANGING TYPE: 'casual' → 'sepatu'")
print("=" * 80)

# Count occurrences before
casual_count = len(re.findall(r"type:\s*'casual'", content))
print(f"\nFound {casual_count} products with type: 'casual'")

# Replace all instances of type: 'casual' with type: 'sepatu'
content = re.sub(r"type:\s*'casual'", "type: 'sepatu'", content)

# Verify the change
sepatu_count = len(re.findall(r"type:\s*'sepatu'", content))
casual_remaining = len(re.findall(r"type:\s*'casual'", content))

print(f"After replacement:")
print(f"  - type: 'sepatu': {sepatu_count} products")
print(f"  - type: 'casual': {casual_remaining} products (should be 0)")

# Write the updated content
with open('app/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✓ Updated app/data/products.ts")
print("=" * 80)

# List the products that were changed
print("\nProducts changed to type: 'sepatu':")
pattern = r"name:\s*'([^']+)'.*?type:\s*'sepatu'"
products = re.findall(pattern, content, re.DOTALL)
for i, name in enumerate(products, 1):
    print(f"  {i}. {name}")

print("\n" + "=" * 80)
print(f"SUMMARY: Changed {casual_count} products from 'casual' to 'sepatu'")
print("=" * 80)
