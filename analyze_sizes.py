import json
import re

# Read the products.ts file
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract size ranges from the file
size_pattern = r"sizeRun:\s*'([^']+)'"
sizes = re.findall(size_pattern, content)

# Categorization logic based on size ranges
def categorize_by_size(size_run):
    """
    Categorize products based on size range:
    - Men: Usually starts from 38+ (38-42, 39-44, 40-44, 40-45, etc.)
    - Women: Usually 35-40 or 36-40, 36-41
    - Kids: Usually 30-34 or smaller ranges
    """
    # Extract first number from size range
    match = re.search(r'(\d+)', size_run)
    if not match:
        return 'unknown'
    
    start_size = int(match.group(1))
    
    # Kids: size starts at 34 or below
    if start_size <= 34:
        return 'kids'
    # Women: size starts at 35-37
    elif start_size >= 35 and start_size <= 37:
        return 'women'
    # Men: size starts at 38 or above
    elif start_size >= 38:
        return 'men'
    else:
        return 'unknown'

# Analyze all size ranges
size_analysis = {}
for size in set(sizes):
    category = categorize_by_size(size)
    if size not in size_analysis:
        size_analysis[size] = {
            'category': category,
            'count': sizes.count(size)
        }

# Sort by starting size
sorted_sizes = sorted(size_analysis.items(), key=lambda x: int(re.search(r'(\d+)', x[0]).group(1)))

print("=" * 80)
print("SIZE RANGE ANALYSIS AND CATEGORIZATION")
print("=" * 80)
print(f"\n{'Size Range':<15} {'Suggested Category':<20} {'Count':<10}")
print("-" * 80)

for size_run, info in sorted_sizes:
    print(f"{size_run:<15} {info['category']:<20} {info['count']:<10}")

print("\n" + "=" * 80)
print("CATEGORIZATION RULES:")
print("=" * 80)
print("• Kids:  Size starts at ≤34 (e.g., 30-34)")
print("• Women: Size starts at 35-37 (e.g., 36-40, 36-41)")
print("• Men:   Size starts at ≥38 (e.g., 38-42, 39-44, 40-45)")
print("=" * 80)

# Save analysis to file
with open('size_categorization_analysis.json', 'w', encoding='utf-8') as f:
    json.dump({
        'analysis': dict(sorted_sizes),
        'rules': {
            'kids': 'Size starts at ≤34',
            'women': 'Size starts at 35-37',
            'men': 'Size starts at ≥38'
        }
    }, f, indent=2, ensure_ascii=False)

print("\n✓ Analysis saved to: size_categorization_analysis.json")
