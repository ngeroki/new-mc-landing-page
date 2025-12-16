import re

# Read the products.ts file
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def categorize_by_size(size_run):
    """
    Categorize products based on size range:
    - Men: Usually starts from 38+ (38-42, 39-44, 40-44, 40-45, etc.)
    - Women: Usually 35-40 or 36-40, 36-41
    - Kids: Usually 30-34 or smaller ranges
    """
    match = re.search(r'(\d+)', size_run)
    if not match:
        return None
    
    start_size = int(match.group(1))
    
    if start_size <= 34:
        return 'kids'
    elif start_size >= 35 and start_size <= 37:
        return 'women'
    elif start_size >= 38:
        return 'men'
    else:
        return None

# Track changes
changes = []
products_updated = 0

# Split content into products
product_blocks = content.split('    {')

# Process each product block
new_blocks = [product_blocks[0]]  # Keep the header

for i, block in enumerate(product_blocks[1:], 1):
    # Extract current category and size run
    category_match = re.search(r"category:\s*'([^']+)'", block)
    size_match = re.search(r"sizeRun:\s*'([^']+)'", block)
    name_match = re.search(r"name:\s*'([^']+)'", block)
    
    if category_match and size_match:
        current_category = category_match.group(1)
        size_run = size_match.group(1)
        product_name = name_match.group(1) if name_match else f"Product {i}"
        
        # Determine correct category based on size
        correct_category = categorize_by_size(size_run)
        
        if correct_category and current_category != correct_category:
            # Update the category
            block = re.sub(
                r"category:\s*'[^']+'",
                f"category: '{correct_category}'",
                block
            )
            changes.append({
                'name': product_name,
                'size': size_run,
                'old_category': current_category,
                'new_category': correct_category
            })
            products_updated += 1
    
    new_blocks.append(block)

# Reconstruct the file
new_content = '    {'.join(new_blocks)

# Write the updated content
with open('app/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

# Print summary
print("=" * 80)
print("PRODUCT CATEGORY UPDATE SUMMARY")
print("=" * 80)
print(f"\nTotal products updated: {products_updated}")
print("\nDetailed changes:")
print("-" * 80)
print(f"{'Product Name':<30} {'Size':<10} {'Old Cat':<10} {'New Cat':<10}")
print("-" * 80)

for change in changes:
    print(f"{change['name']:<30} {change['size']:<10} {change['old_category']:<10} {change['new_category']:<10}")

print("\n" + "=" * 80)
print("✓ Products have been recategorized based on size ranges!")
print("=" * 80)

# Save change log
import json
with open('category_update_log.json', 'w', encoding='utf-8') as f:
    json.dump({
        'total_updated': products_updated,
        'changes': changes
    }, f, indent=2, ensure_ascii=False)

print("\n✓ Change log saved to: category_update_log.json")
