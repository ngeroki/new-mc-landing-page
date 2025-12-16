import re

# Read the products.ts file
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Products to mark as bestsellers (those with existing images)
bestseller_ids = ['teplek', '7833', '7835', '8013', '9013', '9017', 'sanur', 
                  'bikro01', 'bikro03', 'eva', 'domino', '998', 'aw001', 
                  'aw002', 'aw003', '0912-32', '1618-3-2k', '1618-1-2l']

# Products to mark as new (recent additions)
new_ids = ['reyna', 'la04flat', 'mevia', 'shella', 'alza', 'devia', 
           'adv02', 'adv03', 'arnia', 'la01flat']

# Function to add tag to a product
def add_tag_to_product(content, product_id, tag_name):
    # Find the product block
    pattern = rf"({{[^}}]*id: '{product_id}'[^}}]*description: '[^']*',)(\s*}})"
    
    def replacer(match):
        product_block = match.group(1)
        closing = match.group(2)
        # Add the tag before the closing brace
        return f"{product_block}\n        {tag_name}: true,{closing}"
    
    return re.sub(pattern, replacer, content, flags=re.DOTALL)

# Add bestseller tags
for product_id in bestseller_ids:
    content = add_tag_to_product(content, product_id, 'isBestseller')
    print(f"✓ Added isBestseller to {product_id}")

# Add new tags
for product_id in new_ids:
    content = add_tag_to_product(content, product_id, 'isNew')
    print(f"✓ Added isNew to {product_id}")

# Save the updated file
with open('app/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✅ Updated products.ts with bestseller and new tags")
