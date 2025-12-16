import re

# Read the products.ts file
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract products with name, category, and size
pattern = r"name:\s*'([^']+)'.*?category:\s*'([^']+)'.*?sizeRun:\s*'([^']+)'"
products = re.findall(pattern, content, re.DOTALL)

print("=" * 100)
print("PRODUCT CATEGORIZATION VERIFICATION")
print("=" * 100)

# Check for miscategorized products
print("\n1. CHECKING MEN'S PRODUCTS (should have size starting ≥38):")
print("-" * 100)
men_issues = []
for name, category, size in products:
    if category == 'men':
        start_size = int(re.search(r'(\d+)', size).group(1))
        status = "✓" if start_size >= 38 else "✗ ISSUE"
        if start_size < 38:
            men_issues.append((name, size))
        print(f"{status} {name:<40} Size: {size}")

print("\n2. CHECKING WOMEN'S PRODUCTS (should have size starting 35-37):")
print("-" * 100)
women_issues = []
for name, category, size in products:
    if category == 'women':
        start_size = int(re.search(r'(\d+)', size).group(1))
        status = "✓" if 35 <= start_size <= 37 else "✗ ISSUE"
        if not (35 <= start_size <= 37):
            women_issues.append((name, size))
        if status == "✗ ISSUE":
            print(f"{status} {name:<40} Size: {size}")

print(f"\n   Total women's products: {sum(1 for _, cat, _ in products if cat == 'women')}")
print(f"   Issues found: {len(women_issues)}")

print("\n3. CHECKING KIDS' PRODUCTS (should have size starting ≤34):")
print("-" * 100)
kids_issues = []
for name, category, size in products:
    if category == 'kids':
        start_size = int(re.search(r'(\d+)', size).group(1))
        status = "✓" if start_size <= 34 else "✗ ISSUE"
        if start_size > 34:
            kids_issues.append((name, size))
        print(f"{status} {name:<40} Size: {size}")

print("\n" + "=" * 100)
print("SUMMARY:")
print("=" * 100)
print(f"Total products: {len(products)}")
print(f"Men's products: {sum(1 for _, cat, _ in products if cat == 'men')}")
print(f"Women's products: {sum(1 for _, cat, _ in products if cat == 'women')}")
print(f"Kids' products: {sum(1 for _, cat, _ in products if cat == 'kids')}")
print(f"\nMiscategorization issues found: {len(men_issues) + len(women_issues) + len(kids_issues)}")

if men_issues:
    print("\nMen's products that need recategorization:")
    for name, size in men_issues:
        print(f"  - {name} (Size: {size})")

if women_issues:
    print("\nWomen's products that need recategorization:")
    for name, size in women_issues:
        print(f"  - {name} (Size: {size})")

if kids_issues:
    print("\nKids' products that need recategorization:")
    for name, size in kids_issues:
        print(f"  - {name} (Size: {size})")

print("=" * 100)
