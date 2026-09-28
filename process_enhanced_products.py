import json
import re
from bs4 import BeautifulSoup

with open('ecolates_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

enhanced = []

for p in products:
    sd = p.get('short_description', '')
    rd = p.get('raw_description', '') or ''
    desc = p.get('description', '') or ''
    
    # 1. Clean HTML in raw_description by converting relative /wp-content/ to https://www.ecolates.com/wp-content/
    fixed_rd = rd.replace('src="/wp-content/', 'src="https://www.ecolates.com/wp-content/')
    fixed_rd = fixed_rd.replace('href="/wp-content/', 'href="https://www.ecolates.com/wp-content/')
    fixed_rd = fixed_rd.replace('href="/sugarcane-bagasse-products', 'href="/products')
    
    # Parse HTML with BeautifulSoup to extract visual feature blocks
    soup = BeautifulSoup(fixed_rd, 'html.parser')
    
    # Extract feature cards with images (e.g. image-block)
    visual_features = []
    for block in soup.find_all('div', class_='image-block'):
        img = block.find('img')
        img_url = img.get('src') if img else ''
        h2 = block.find(['h2', 'h3', 'h4'])
        title = h2.get_text().strip() if h2 else ''
        p_tag = block.find_all('p')
        # take the text paragraph
        text = ''
        for pt in p_tag:
            t = pt.get_text().strip()
            if t and t != title:
                text = t
                break
        if not text and block.get_text():
            text = block.get_text().replace(title, '').strip()
        
        if title or img_url:
            visual_features.append({
                'title': title,
                'image': img_url,
                'text': text
            })
            
    # Extract certifications badges
    cert_badges = []
    for cert_div in soup.find_all('div', class_='certifications'):
        for col in cert_div.find_all('div', class_='col1'):
            img = col.find('img')
            img_url = img.get('src') if img else ''
            h3 = col.find(['h3', 'h4'])
            title = ' '.join(h3.get_text().split()) if h3 else ''
            p_tag = col.find('p', recursive=False) or col.find_all('p')[-1] if col.find_all('p') else None
            text = p_tag.get_text().strip() if p_tag and p_tag.get_text().strip() != title else ''
            if title or img_url:
                cert_badges.append({
                    'title': title,
                    'image': img_url,
                    'description': text
                })
                
    # Extract template section (hero showcase with text and side image)
    template_hero = None
    flex = soup.find('div', class_='flex-container')
    if flex and not ('border-none' in flex.get('class', [])):
        tt = flex.find('div', class_='template-text')
        ti = flex.find('div', class_='template-image')
        img = ti.find('img') if ti else None
        if tt and img:
            template_hero = {
                'text': tt.get_text().strip(),
                'image': img.get('src', '')
            }

    # Extract clean product overview text
    clean_overview = ''
    overview_match = re.search(r'Product Overview\s*(.*?)(?:Product Specification|$)', sd, re.DOTALL | re.I)
    if overview_match:
        clean_overview = overview_match.group(1).strip()
    else:
        # Fallback to initial paragraph of description
        lines = [l.strip() for l in desc.split('.') if len(l.strip()) > 30 and not l.strip().startswith('{')]
        clean_overview = '. '.join(lines[:3]) + '.' if lines else desc[:200]

    # Extract structured packaging specs
    parsed_specs = {}
    
    # Search in both short_description and description
    combined_text = sd + ' ' + desc
    
    m = re.search(r'Qty Per Case\s*[:\-]?\s*([\d,]+)', combined_text, re.I)
    if m: parsed_specs['qtyPerCase'] = m.group(1).replace(',', '')
    
    m = re.search(r'Wt/Item\s*(?:Gram)?\s*[:\-]?\s*([\d.]+\s*(?:gram|g)?)', combined_text, re.I)
    if m: parsed_specs['itemWeight'] = m.group(1)
    
    m = re.search(r'Packing\s*[:\-]?\s*([\d\s×xX]+)', combined_text, re.I)
    if m: parsed_specs['packing'] = m.group(1).strip()
    
    m = re.search(r'Case Net Weight\s*[:\-]?\s*([\d.]+\s*(?:kg|g)?)', combined_text, re.I)
    if m: parsed_specs['caseNetWeight'] = m.group(1)
    
    m = re.search(r'Case Gross Weight\s*[:\-]?\s*([\d.]+\s*(?:kg|g)?)', combined_text, re.I)
    if m: parsed_specs['caseGrossWeight'] = m.group(1)
    
    m = re.search(r'Case Dimensions \(cm\)\s*[:\-]?\s*([\d.\s×xX]+)', combined_text, re.I)
    if m: parsed_specs['dimensionsCm'] = m.group(1).strip()
    
    m = re.search(r'Case Dimensions \(Inch\)\s*[:\-]?\s*([0-9.”"″\s×xX]+)', combined_text, re.I)
    if m: parsed_specs['dimensionsInch'] = m.group(1).strip()
    
    m = re.search(r'CBM Per Case\s*[:\-]?\s*([\d.]+)', combined_text, re.I)
    if m: parsed_specs['cbmPerCase'] = m.group(1)
    
    m = re.search(r'Total Quantity per 40ft Container\s*[:\-]?\s*([\d,]+)', combined_text, re.I)
    if m: parsed_specs['container40ftQty'] = m.group(1).replace(',', '')

    # Clean short description for card / header display:
    # Remove the whole "Product Specification..." dump from short_description
    clean_short_desc = re.sub(r'Product Specification.*$', '', sd, flags=re.DOTALL | re.I).strip()
    clean_short_desc = re.sub(r'Product Overview', '', clean_short_desc, flags=re.I).strip()
    if len(clean_short_desc) > 280:
        clean_short_desc = clean_short_desc[:277] + '...'
    if not clean_short_desc:
        clean_short_desc = p.get('name', '') + ' crafted from 100% natural sugarcane bagasse fiber. Fully compostable, freezer safe, microwave safe and oil-resistant.'

    # Clean product title (remove HTML tags like <br />)
    clean_title = re.sub(r'<[^>]+>', ' ', p.get('name', '')).strip()
    clean_title = ' '.join(clean_title.split())

    # Build enhanced item
    item = {
        'id': p.get('id'),
        'slug': p.get('slug'),
        'sku': p.get('sku'),
        'title': clean_title,
        'category': p.get('category'),
        'categorySlug': 'trays' if 'tray' in p.get('category', '').lower() else 'bowls' if 'bowl' in p.get('category', '').lower() else 'plates' if 'plate' in p.get('category', '').lower() else 'compartment' if 'compartment' in p.get('category', '').lower() else 'containers',
        'price': '₹2.85' if 'bowl' in clean_title.lower() else '₹3.40' if 'plate' in clean_title.lower() else '₹4.90',
        'moq': int(parsed_specs.get('qtyPerCase', 1000)) * 2,
        'featuredImage': p.get('featured_image'),
        'images': p.get('images', [p.get('featured_image')]),
        'shortDescription': clean_short_desc,
        'overview': clean_overview,
        'parsedSpecs': parsed_specs,
        'visualFeatures': visual_features,
        'certBadges': cert_badges,
        'templateHero': template_hero,
        'rawDescriptionHtml': fixed_rd,
        'isTopShowcase': True,
        'bestseller': p.get('id') in [1679, 2877, 2820, 1674, 752]
    }
    enhanced.append(item)

with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(enhanced, f, indent=2, ensure_ascii=False)

print(f"Successfully processed {len(enhanced)} enhanced products!")
