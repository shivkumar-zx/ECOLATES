import urllib.request
import json
import html
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

url = 'https://www.ecolates.com/wp-json/wc/store/v1/products?per_page=100'
req = urllib.request.Request(url, headers=headers)

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))

print(f"Total products scraped: {len(data)}")

products = []
for p in data:
    images = [img['src'] for img in p.get('images', [])]
    cats = [html.unescape(c['name']) for c in p.get('categories', [])]
    name = html.unescape(p.get('name', ''))
    # Clean HTML from description
    raw_desc = html.unescape(p.get('description', ''))
    clean_desc = re.sub(r'<[^>]+>', ' ', raw_desc).strip()
    clean_desc = re.sub(r'\s+', ' ', clean_desc)

    raw_short = html.unescape(p.get('short_description', ''))
    clean_short = re.sub(r'<[^>]+>', ' ', raw_short).strip()
    clean_short = re.sub(r'\s+', ' ', clean_short)

    slug = p.get('slug') or f"product-{p.get('id')}"
    sku = p.get('sku') or f"ECL-{str(slug).upper()[:10]}"

    products.append({
        'id': p.get('id'),
        'name': name,
        'slug': slug,
        'sku': sku,
        'category': cats[0] if cats else 'Tableware',
        'categories': cats,
        'short_description': clean_short or clean_desc[:120] + '...',
        'description': clean_desc,
        'raw_description': raw_desc,
        'images': images,
        'featured_image': images[0] if images else '',
        'permalink': p.get('permalink')
    })
    cat_str = cats[0] if cats else 'General'
    cat_clean = cat_str.encode('ascii', 'ignore').decode()
    name_clean = name.encode('ascii', 'ignore').decode()
    print(f"[{cat_clean}] {name_clean} - {len(images)} images")

with open('ecolates_products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("\nSuccessfully saved all products and images to ecolates_products.json!")
