import json

# Load the products data from JSON
with open('products_data.json', 'r', encoding='utf-8') as f:
    excel_products = json.load(f)

# Function to calculate MOQ from size range
def calculate_moq_from_size(size_range):
    """
    Calculate MOQ based on the number of sizes in the range.
    Example: 36-40 = 5 sizes (36, 37, 38, 39, 40) = MOQ 5
    """
    if not size_range or '-' not in str(size_range):
        return 5  # Default
    
    try:
        parts = str(size_range).split('-')
        start = int(parts[0].strip())
        end = int(parts[1].strip())
        moq = end - start + 1  # Number of sizes
        return moq
    except:
        return 5  # Default if parsing fails

# Update MOQ for all products
updated_count = 0
for product in excel_products:
    size_range = product['Ukuran']
    calculated_moq = calculate_moq_from_size(size_range)
    
    # Update the MOQ
    old_moq = product['MOQ']
    product['MOQ_Calculated'] = calculated_moq
    
    if calculated_moq != int(old_moq.split()[0]) if old_moq else 0:
        updated_count += 1
        print(f"Updated {product['Nama Produk']}: Size {size_range} -> MOQ {calculated_moq}")

# Special case: Update Sandal Teplek price
for product in excel_products:
    if product['Nama Produk'] == 'Sandal Teplek':
        product['Harga Grosir'] = 23000
        print(f"\n✓ Updated Sandal Teplek price to Rp 23,000")

# Save updated data
with open('products_data_updated.json', 'w', encoding='utf-8') as f:
    json.dump(excel_products, f, indent=2, ensure_ascii=False)

print(f"\n✅ Updated {updated_count} products with calculated MOQ")
print(f"✅ Saved to products_data_updated.json")
