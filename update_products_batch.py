"""
Script to update product data according to the requirements:
1. Change AW001, AW002, AW003 from sandal to sepatu
2. Add new product variants (8013-L, BO8-1-L, BO8-1-P, 1618 variants)
3. Update sizes and MOQs
4. Update lifestyle images for products with new photos
"""

import re

# Read the current products.ts file
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Change AW001, AW002, AW003 from 'sandal' to 'sepatu'
print("Step 1: Changing AW001, AW002, AW003 to sepatu...")
content = re.sub(
    r"(id: 'aw001',\s+name: ')Sandal( AW001')",
    r"\1Sepatu\2",
    content
)
content = re.sub(
    r"(id: 'aw002',\s+name: ')Sandal( AW002')",
    r"\1Sepatu\2",
    content
)
content = re.sub(
    r"(id: 'aw003',\s+name: ')Sandal( AW003')",
    r"\1Sepatu\2",
    content
)

# Change type from sandal to sepatu for AW products
content = re.sub(
    r"(id: 'aw001',.*?type: )'sandal'",
    r"\1'sepatu'",
    content,
    flags=re.DOTALL
)
content = re.sub(
    r"(id: 'aw002',.*?type: )'sandal'",
    r"\1'sepatu'",
    content,
    flags=re.DOTALL
)
content = re.sub(
    r"(id: 'aw003',.*?type: )'sandal'",
    r"\1'sepatu'",
    content,
    flags=re.DOTALL
)

# 2. Update sizes and MOQs
print("Step 2: Updating sizes and MOQs...")

# DH 01: 36-41 MOQ 6 → 36-40 MOQ 5
content = re.sub(
    r"(id: 'dh01',.*?moq: )6(,\s+sizeRun: )'36-41'",
    r"\g<1>5\g<2>'36-40'",
    content,
    flags=re.DOTALL
)
content = re.sub(
    r"(id: 'dh01',.*?description: 'Sandal DH 01 dengan ukuran )36-41\. MOQ 6",
    r"\g<1>36-40. MOQ 5",
    content,
    flags=re.DOTALL
)

# DH 02: 36-41 MOQ 6 → 36-40 MOQ 5
content = re.sub(
    r"(id: 'dh02',.*?moq: )6(,\s+sizeRun: )'36-41'",
    r"\g<1>5\g<2>'36-40'",
    content,
    flags=re.DOTALL
)
content = re.sub(
    r"(id: 'dh02',.*?description: 'Sandal DH 02 dengan ukuran )36-41\. MOQ 6",
    r"\g<1>36-40. MOQ 5",
    content,
    flags=re.DOTALL
)

# MT 01: 36-41 MOQ 6 → 36-40 MOQ 5
content = re.sub(
    r"(id: 'mt01',.*?moq: )6(,\s+sizeRun: )'36-41'",
    r"\g<1>5\g<2>'36-40'",
    content,
    flags=re.DOTALL
)
content = re.sub(
    r"(id: 'mt01',.*?description: 'Sandal MT 01 dengan ukuran )36-41\. MOQ 6",
    r"\g<1>36-40. MOQ 5",
    content,
    flags=re.DOTALL
)

# 998-1-5: 39-43 → 38-42
content = re.sub(
    r"(id: '99815',.*?sizeRun: )'39-43'",
    r"\g<1>'38-42'",
    content,
    flags=re.DOTALL
)
content = re.sub(
    r"(id: '99815',.*?description: 'Sandal 998-1-5 dengan ukuran )39-43",
    r"\g<1>38-42",
    content,
    flags=re.DOTALL
)

# Camos: 38-43 MOQ 6 → 38-42
content = re.sub(
    r"(id: 'camos',.*?sizeRun: )'38-43'",
    r"\g<1>'38-42'",
    content,
    flags=re.DOTALL
)
content = re.sub(
    r"(id: 'camos',.*?moq: )6",
    r"\g<1>5",
    content,
    flags=re.DOTALL
)
content = re.sub(
    r"(id: 'camos',.*?description: 'Sandal Camos dengan ukuran )38-43\. MOQ 6",
    r"\g<1>38-42. MOQ 5",
    content,
    flags=re.DOTALL
)

# YS 18: 39-40 MOQ 2 → 39-43 MOQ 5
content = re.sub(
    r"(id: 'sepatuys18',.*?moq: )2(,\s+sizeRun: )'39-40'",
    r"\g<1>5\g<2>'39-43'",
    content,
    flags=re.DOTALL
)
content = re.sub(
    r"(id: 'sepatuys18',.*?description: 'Sepatu YS 18 dengan ukuran )39-40\. MOQ 2",
    r"\g<1>39-43. MOQ 5",
    content,
    flags=re.DOTALL
)

# 3. Update lifestyle images for products with new photos
print("Step 3: Updating lifestyle images...")

# 9017: Update lifestyle image
content = re.sub(
    r"(id: '9017',.*?lifestyleImage: )'/mcpolo/9017/9017-Lifestyle-01\.png'",
    r"\1'/mcpolo/9017/Gemini_Generated_Image_g9lsvrg9lsvrg9ls.png'",
    content,
    flags=re.DOTALL
)

# Erya FM 540-A: Update lifestyle image
content = re.sub(
    r"(id: 'eryafm540a',.*?lifestyleImage: )'/mcpolo/erya fm 540-a/erya fm 540-a-Lifestyle-01\.png'",
    r"\1'/mcpolo/erya fm 540-a/Gemini_Generated_Image_5c9ij5c9ij5c9ij5.png'",
    content,
    flags=re.DOTALL
)

# Write the updated content back
with open('app/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Basic updates completed!")
print("\nNext: Adding new product variants...")
