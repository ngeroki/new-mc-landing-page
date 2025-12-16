import re

# Read the file
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Create mapping from Indonesian text to keys
highlight_map = {
    'Kualitas Premium': 'highlight_premium',
    'Cocok untuk Toko Daerah': 'highlight_regional',
    'Stok Stabil': 'highlight_stock',
    'Bahan Tahan Lama': 'highlight_durable',
    'Desain Nyaman': 'highlight_comfortable',
    'Desain Trendy': 'highlight_trendy',
    'Ringan': 'highlight_lightweight',
    'Tahan Air': 'highlight_waterproof',
    'Sol Anti Selip': 'highlight_antislip'
}

# Replace each highlight text with key
for indo_text, key in highlight_map.items():
    content = content.replace(f'"{indo_text}"', f'"{key}"')

# Write back
with open('app/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated highlights to use translation keys')
