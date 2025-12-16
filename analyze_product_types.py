import re
import sys

# Set UTF-8 encoding for output
sys.stdout.reconfigure(encoding='utf-8')

# Read the products.ts file
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all products with name and type
pattern = r"name:\s*'([^']+)'.*?type:\s*'([^']+)'"
products = re.findall(pattern, content, re.DOTALL)

print("=" * 100)
print("PRODUCT TYPE ANALYSIS - CATEGORIZE BY NAME")
print("=" * 100)

# Categorize products based on name
sepatu_products = []
sandal_products = []
other_products = []

for name, current_type in products:
    if 'Sepatu' in name or 'sepatu' in name:
        sepatu_products.append((name, current_type))
    elif 'Sandal' in name or 'sandal' in name or 'Jepit' in name:
        sandal_products.append((name, current_type))
    else:
        other_products.append((name, current_type))

print(f"\nTOTAL PRODUCTS: {len(products)}")
print(f"Expected: 101")
print(f"Difference: {101 - len(products)}")

print("\n" + "=" * 100)
print("SEPATU PRODUCTS (should have type: 'casual')")
print("=" * 100)
print(f"Total: {len(sepatu_products)}\n")

wrong_type_sepatu = []
for name, current_type in sepatu_products:
    status = "OK" if current_type == 'casual' else "WRONG"
    if current_type != 'casual':
        wrong_type_sepatu.append((name, current_type))
    print(f"[{status}] {name:<40} Current type: {current_type}")

print("\n" + "=" * 100)
print("SANDAL PRODUCTS (should have type: 'sandal')")
print("=" * 100)
print(f"Total: {len(sandal_products)}\n")

wrong_type_sandal = []
# Check all sandal products for wrong types
for name, current_type in sandal_products:
    if current_type != 'sandal':
        wrong_type_sandal.append((name, current_type))

# Show first 20 sandal products
for name, current_type in sandal_products[:20]:
    status = "OK" if current_type == 'sandal' else "WRONG"
    print(f"[{status}] {name:<40} Current type: {current_type}")

if len(sandal_products) > 20:
    print(f"... and {len(sandal_products) - 20} more sandal products")

print("\n" + "=" * 100)
print("OTHER PRODUCTS (no 'Sandal' or 'Sepatu' in name)")
print("=" * 100)
print(f"Total: {len(other_products)}\n")
for name, current_type in other_products:
    print(f"  {name:<40} Current type: {current_type}")

print("\n" + "=" * 100)
print("SUMMARY OF ISSUES")
print("=" * 100)
print(f"Sepatu products with wrong type: {len(wrong_type_sepatu)}")
if wrong_type_sepatu:
    for name, current_type in wrong_type_sepatu:
        print(f"  - {name}: '{current_type}' -> should be 'casual'")

print(f"\nSandal products with wrong type: {len(wrong_type_sandal)}")
if wrong_type_sandal:
    for name, current_type in wrong_type_sandal:
        print(f"  - {name}: '{current_type}' -> should be 'sandal'")

print("\n" + "=" * 100)
print("CURRENT TYPE DISTRIBUTION")
print("=" * 100)

# Count by current type
type_counts = {}
for name, current_type in products:
    type_counts[current_type] = type_counts.get(current_type, 0) + 1

for type_name, count in sorted(type_counts.items()):
    print(f"{type_name:<15} : {count} products")

print(f"\nTotal: {sum(type_counts.values())} products")

print("\n" + "=" * 100)
print("EXPECTED TYPE DISTRIBUTION (after fix)")
print("=" * 100)
print(f"sandal          : {len(sandal_products)} products")
print(f"casual (Sepatu) : {len(sepatu_products)} products")
print(f"Total           : {len(sandal_products) + len(sepatu_products)} products")
print("=" * 100)

# Save results to file
with open('type_analysis_results.txt', 'w', encoding='utf-8') as f:
    f.write(f"Products needing type change:\n\n")
    f.write(f"SEPATU -> casual: {len(wrong_type_sepatu)}\n")
    for name, current_type in wrong_type_sepatu:
        f.write(f"  {name}: {current_type} -> casual\n")
    f.write(f"\nSANDAL -> sandal: {len(wrong_type_sandal)}\n")
    for name, current_type in wrong_type_sandal:
        f.write(f"  {name}: {current_type} -> sandal\n")

print("\nResults saved to: type_analysis_results.txt")
