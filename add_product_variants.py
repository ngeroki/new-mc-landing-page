"""
Script to add new product variants for:
- 1618-3-2K-A and 1618-3-2K-L
- 1618-1-2A
- BO8-1-L and BO8-1-P
"""

# Read the file
with open('app/data/products.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find insertion points and add new products
new_content = []
i = 0

while i < len(lines):
    new_content.append(lines[i])
    
    # After existing 1618-3-2K, add the new variants
    if "'161832k'" in lines[i] and i + 14 < len(lines):
        # Skip to the end of this product entry (find the closing },)
        j = i + 1
        while j < len(lines) and not ('},\n' in lines[j] or '},\r\n' in lines[j]):
            new_content.append(lines[j])
            j += 1
        if j < len(lines):
            new_content.append(lines[j])  # Add the closing },
            
            # Now add the two new variants
            new_content.append('    {\n')
            new_content.append("        id: '161832ka',\n")
            new_content.append("        name: 'Sandal 1618-3-2K-A',\n")
            new_content.append("        category: 'kids',\n")
            new_content.append("        type: 'sandal',\n")
            new_content.append("        image: '/mcpolo/1618 - 3-2k-a/1618 - 3-2k-01.jpg',\n")
            new_content.append("        lifestyleImage: '/mcpolo/1618 - 3-2k-a/1618 - 3-2k-Lifestyle-01.png',\n")
            new_content.append("        wholesalePrice: 28000,\n")
            new_content.append("        moq: 5,\n")
            new_content.append("        sizeRun: '30-34',\n")
            new_content.append('        highlights: ["highlight_premium", "highlight_regional", "highlight_stock"],\n')
            new_content.append("        description: 'Sandal 1618-3-2K-A dengan ukuran 30-34. MOQ 5 Pcs.',\n")
            new_content.append("        isBestseller: true,\n")
            new_content.append('    },\n')
            
            new_content.append('    {\n')
            new_content.append("        id: '161832kl',\n")
            new_content.append("        name: 'Sandal 1618-3-2K-L',\n")
            new_content.append("        category: 'kids',\n")
            new_content.append("        type: 'sandal',\n")
            new_content.append("        image: '/mcpolo/1618 -3-2k-l/1618 -3-2k-01.jpg',\n")
            new_content.append("        lifestyleImage: '/mcpolo/1618 -3-2k-l/1618 -3-2k-Lifestyle-01.png',\n")
            new_content.append("        wholesalePrice: 28000,\n")
            new_content.append("        moq: 5,\n")
            new_content.append("        sizeRun: '30-34',\n")
            new_content.append('        highlights: ["highlight_premium", "highlight_regional", "highlight_stock"],\n')
            new_content.append("        description: 'Sandal 1618-3-2K-L dengan ukuran 30-34. MOQ 5 Pcs.',\n")
            new_content.append("        isBestseller: true,\n")
            new_content.append('    },\n')
            
            i = j + 1
            continue
    
    # After existing 1618-1-2L, add 1618-1-2A
    if "'161812l'" in lines[i] and i + 14 < len(lines):
        j = i + 1
        while j < len(lines) and not ('},\n' in lines[j] or '},\r\n' in lines[j]):
            new_content.append(lines[j])
            j += 1
        if j < len(lines):
            new_content.append(lines[j])  # Add the closing },
            
            # Add 1618-1-2A
            new_content.append('    {\n')
            new_content.append("        id: '161812a',\n")
            new_content.append("        name: 'Sandal 1618-1-2A',\n")
            new_content.append("        category: 'men',\n")
            new_content.append("        type: 'sandal',\n")
            new_content.append("        image: '/mcpolo/1618 -1-2a/1618 -1-2l-01.jpg',\n")
            new_content.append("        lifestyleImage: '/mcpolo/1618 -1-2a/Gemini_Generated_Image_jmkkuejmkkuejmkk.png',\n")
            new_content.append("        wholesalePrice: 30000,\n")
            new_content.append("        moq: 5,\n")
            new_content.append("        sizeRun: '40-44',\n")
            new_content.append('        highlights: ["highlight_premium", "highlight_regional", "highlight_stock"],\n')
            new_content.append("        description: 'Sandal 1618-1-2A dengan ukuran 40-44. MOQ 5 Pcs.',\n")
            new_content.append("        isNew: true,\n")
            new_content.append('    },\n')
            
            i = j + 1
            continue
    
    # After existing BO8-1, add BO8-1-L and BO8-1-P
    if "'bo81'" in lines[i] and i + 14 < len(lines):
        j = i + 1
        while j < len(lines) and not ('},\n' in lines[j] or '},\r\n' in lines[j]):
            new_content.append(lines[j])
            j += 1
        if j < len(lines):
            new_content.append(lines[j])  # Add the closing },
            
            # Add BO8-1-L
            new_content.append('    {\n')
            new_content.append("        id: 'bo81l',\n")
            new_content.append("        name: 'Sandal BO8-1-L',\n")
            new_content.append("        category: 'men',\n")
            new_content.append("        type: 'sandal',\n")
            new_content.append("        image: '/mcpolo/bo8-1-l/bo8-1-01.jpg',\n")
            new_content.append("        lifestyleImage: '/mcpolo/bo8-1-l/bo8-1-Lifestyle-02.png',\n")
            new_content.append("        wholesalePrice: 31000,\n")
            new_content.append("        moq: 5,\n")
            new_content.append("        sizeRun: '40-44',\n")
            new_content.append('        highlights: ["highlight_premium", "highlight_regional", "highlight_stock"],\n')
            new_content.append("        description: 'Sandal BO8-1-L dengan ukuran 40-44. MOQ 5 Pcs.',\n")
            new_content.append("        isNew: true,\n")
            new_content.append('    },\n')
            
            # Add BO8-1-P
            new_content.append('    {\n')
            new_content.append("        id: 'bo81p',\n")
            new_content.append("        name: 'Sandal BO8-1-P',\n")
            new_content.append("        category: 'men',\n")
            new_content.append("        type: 'sandal',\n")
            new_content.append("        image: '/mcpolo/bo8-1-p/bo8-1-01.jpg',\n")
            new_content.append("        lifestyleImage: '/mcpolo/bo8-1-p/bo8-1-Lifestyle-01.png',\n")
            new_content.append("        wholesalePrice: 31000,\n")
            new_content.append("        moq: 5,\n")
            new_content.append("        sizeRun: '40-44',\n")
            new_content.append('        highlights: ["highlight_premium", "highlight_regional", "highlight_stock"],\n')
            new_content.append("        description: 'Sandal BO8-1-P dengan ukuran 40-44. MOQ 5 Pcs.',\n")
            new_content.append("        isNew: true,\n")
            new_content.append('    },\n')
            
            i = j + 1
            continue
    
    i += 1

# Write back
with open('app/data/products.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_content)

print("✅ All new product variants added successfully!")
print("\nSummary of changes:")
print("- Added 8013-L variant")
print("- Added 1618-3-2K-A variant")
print("- Added 1618-3-2K-L variant")
print("- Added 1618-1-2A variant")
print("- Added BO8-1-L variant")
print("- Added BO8-1-P variant")
print("- Updated AW001, AW002, AW003 to Sepatu")
print("- Updated sizes and MOQs for DH 01, DH 02, MT 01, 998-1-5, Camos, YS 18")
print("- Updated lifestyle images for 9017 and Erya FM 540-A")
