import json

# Load converted products
with open('converted_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Generate TypeScript file
ts_content = """// Product type definition
export type Product = {
    id: string;
    name: string;
    category: 'men' | 'women' | 'kids' | 'unisex';
    type: 'flipflop' | 'slipper' | 'casual' | 'sandal';
    image: string;
    lifestyleImage?: string;
    wholesalePrice: number;
    moq: number;
    sizeRun: string;
    highlights: string[];
    isBestseller?: boolean;
    isNew?: boolean;
    description: string;
};

// All products from Excel data (website.xlsx)
export const products: Product[] = [
"""

# Add each product
for i, product in enumerate(products):
    # Format the product object
    lifestyle = f"'{product['lifestyleImage']}'" if product['lifestyleImage'] else 'undefined'
    
    ts_content += f"""    {{
        id: '{product['id']}',
        name: '{product['name']}',
        category: '{product['category']}',
        type: '{product['type']}',
        image: '{product['image']}',
        lifestyleImage: {lifestyle},
        wholesalePrice: {product['wholesalePrice']},
        moq: {product['moq']},
        sizeRun: '{product['sizeRun']}',
        highlights: {json.dumps(product['highlights'])},
        description: '{product['description']}',
    }}"""
    
    if i < len(products) - 1:
        ts_content += ","
    
    ts_content += "\n"

ts_content += "];\n"

# Save to file
with open('app/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"✅ Generated products.ts with {len(products)} products")
print(f"   - Women: {len([p for p in products if p['category'] == 'women'])}")
print(f"   - Men: {len([p for p in products if p['category'] == 'men'])}")
print(f"   - Kids: {len([p for p in products if p['category'] == 'kids'])}")
print(f"   - Unisex: {len([p for p in products if p['category'] == 'unisex'])}")
