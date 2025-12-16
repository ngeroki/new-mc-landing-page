import json
from pathlib import Path

# Load products
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace placeholder path with an existing image
# Use the product-women.jpg as placeholder for women's products
old_placeholder = "'/images/placeholder-sandal.jpg'"
new_placeholder = "'/images/product-women.jpg'"

# Count replacements
count = content.count(old_placeholder)
print(f"Found {count} instances of placeholder image path")

# Replace
content = content.replace(old_placeholder, new_placeholder)

# Save
with open('app/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Updated {count} placeholder image paths to use /images/product-women.jpg")
print("   This is a temporary fix until actual product images are added")
