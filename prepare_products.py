import json
import re
import html
import os

with open('ecolates_products.json', 'r', encoding='utf-8') as f:
    raw_products = json.load(f)

def clean_title(title):
    t = re.sub(r'<br\s*/?>', ' ', title)
    t = html.unescape(t)
    t = t.replace('&#8243;', '"').replace('&#215;', 'x').replace('&#038;', '&')
    t = re.sub(r'\s+', ' ', t).strip()
    return t

def map_category(cat_name, title):
    c_lower = (cat_name + ' ' + title).lower()
    if 'tray' in c_lower or 'thali' in c_lower or 'lunch' in c_lower:
        return 'Bento & Thali Trays', 'trays'
    elif 'plate' in c_lower or 'pav bhaji' in c_lower:
        return 'Plates & Platters', 'plates'
    elif 'clamshell' in c_lower or 'box' in c_lower or 'container' in c_lower:
        return 'Delivery Containers', 'containers'
    elif 'bowl' in c_lower:
        return 'Bowls & Cups', 'bowls'
    else:
        return 'Dinnerware Series', 'plates'

clean_products = []
for idx, p in enumerate(raw_products):
    title = clean_title(p.get('name', ''))
    raw_cat = p.get('categories', ['General'])[0] if p.get('categories') else 'General'
    cat_label, cat_slug = map_category(raw_cat, title)
    
    # Generate clean slug
    slug = p.get('slug')
    if not slug:
        slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')

    # Price estimation based on category
    if cat_slug == 'bowls':
        price = '₹1.35'
        moq = '6,000 pcs'
        weight = '11g'
    elif cat_slug == 'trays':
        price = '₹4.40'
        moq = '3,000 pcs'
        weight = '38g'
    elif cat_slug == 'containers':
        price = '₹3.60'
        moq = '5,000 pcs'
        weight = '28g'
    else:
        price = '₹2.85'
        moq = '5,000 pcs'
        weight = '21g'

    images = p.get('images', [])
    featured_img = images[0] if images else 'https://www.ecolates.com/wp-content/uploads/2022/12/product-dishes.webp'

    # Clean description
    desc = p.get('description', '')
    if not desc or len(desc) < 30:
        desc = f"Manufactured from 100% natural sugarcane bagasse agricultural residue. Engineered for high-volume commercial food service, hotels, and cloud kitchen deliveries. Microwave safe up to 120°C and 100% biodegradable in 90 days."

    clean_products.append({
        'id': p.get('id', idx + 1),
        'title': title,
        'slug': slug,
        'sku': f"ECL-{slug.upper()[:12].replace('-', '')}",
        'category': cat_label,
        'categorySlug': cat_slug,
        'price': price,
        'moq': moq,
        'weight': weight,
        'description': desc,
        'shortDescription': p.get('short_description') or desc[:140] + '...',
        'images': images if images else [featured_img],
        'featuredImage': featured_img,
        'isTopSelling': idx < 8, # Top 8 products featured in top showcase
        'inStock': True,
        'specs': {
            'material': '100% Sugarcane Bagasse Agro-Pulp',
            'thermalResistance': '-20°C to +120°C (Microwave & Freezer Safe)',
            'shelfLife': '24 Months in dry warehouse',
            'compostability': '60-90 Days in natural soil / commercial compost',
            'certifications': 'ISO 9001:2015, BPI, EN 13432, US FDA 21 CFR 176.170'
        },
        'features': [
            '100% Plastic-free, bleach-free & PFAS chemical free',
            'Rigid leak-proof rim prevents sagging under heavy gravies',
            'Microwave safe up to 120°C for fast meal reheating',
            'Home soil compostable within 90 days without toxic residue'
        ]
    })

os.makedirs('src/data', exist_ok=True)

with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(clean_products, f, indent=2, ensure_ascii=False)

# Create site-config.json for the Admin Dashboard
site_config = {
    "siteName": "Ecolates",
    "siteTagline": "Pure Sugarcane Bagasse Tableware & Packaging",
    "contact": {
        "phone": "+91 98765 43210",
        "whatsapp": "+91 98765 43210",
        "email": "sales@ecolates.com",
        "factoryAddress": "Industrial Growth Centre, Phase-II, Manufacturing Hub, India"
    },
    "seo": {
        "home": {
            "title": "Ecolates | Sustainable Sugarcane Bagasse Tableware & Food Packaging",
            "description": "Leading manufacturer of 100% biodegradable and compostable sugarcane bagasse plates, bowls, food containers, and meal trays in India. Direct factory wholesale B2B supply.",
            "keywords": "bagasse plates, sugarcane tableware manufacturer, biodegradable food containers, compostable bowls, wholesale tableware India",
            "ogImage": "https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg"
        },
        "products": {
            "title": "Commercial Product Catalog | Ecolates Bagasse Tableware",
            "description": "Browse our full range of certified sugarcane bagasse plates, meal trays, hinged clamshell containers, and gravy bowls. Direct factory prices.",
            "keywords": "bagasse product catalog, sugarcane packaging list, disposable food trays wholesale",
            "ogImage": "https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg"
        },
        "quality": {
            "title": "Lab Certifications & 6-Point Quality Assurance | Ecolates",
            "description": "Review ISO 9001, BPI, and EN 13432 lab certifications. 120°C oil leak test, microwave shock, and PFAS-free test results.",
            "keywords": "bagasse test reports, food safety certifications, BPI certified tableware",
            "ogImage": "https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg"
        },
        "custom": {
            "title": "Custom Brand Logo Debossing & OEM Tooling | Ecolates",
            "description": "Deboss your restaurant or hotel brand logo directly into natural sugarcane bagasse plates and container lids. Rapid 21-day tooling.",
            "keywords": "custom branded plates, logo embossed tableware, OEM bagasse manufacturer",
            "ogImage": "https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg"
        },
        "contact": {
            "title": "Wholesale Trade RFQ & Factory Inquiries | Ecolates",
            "description": "Request factory wholesale price tiers or order a complimentary evaluation sample box delivered to your kitchen.",
            "keywords": "wholesale bagasse quote, tableware distributor inquiry, sample kit request",
            "ogImage": "https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg"
        }
    },
    "bannerAnnouncement": "🌱 100% Sugarcane Bagasse — Zero Trees Cut Down • Free B2B Evaluation Sample Kits Delivered Pan-India • MOQ 5,000 Units"
}

with open('src/data/site-config.json', 'w', encoding='utf-8') as f:
    json.dump(site_config, f, indent=2, ensure_ascii=False)

# Initialize sample inquiries storage
with open('src/data/inquiries.json', 'w', encoding='utf-8') as f:
    json.dump([
        {
            "id": "INQ-1001",
            "date": "2026-09-28",
            "type": "Sample Kit",
            "name": "Chef Vikram Oberoi",
            "company": "The Spice Pavilion Cloud Kitchens",
            "phone": "+91 98111 22334",
            "city": "Mumbai",
            "items": ["10-Inch 3-Compartment Plate", "5-Compartment Heavy Thali", "750ml Clamshell Box"],
            "status": "Dispatched"
        },
        {
            "id": "INQ-1002",
            "date": "2026-09-28",
            "type": "Wholesale RFQ",
            "name": "Rahul Verma",
            "company": "Grand Royal Caterers & Banquets",
            "phone": "+91 98222 33445",
            "city": "New Delhi",
            "items": ["9-Inch Round Dinner Plate", "250ml Curry Bowl"],
            "status": "Quote Sent"
        }
    ], f, indent=2, ensure_ascii=False)

print(f"Successfully processed {len(clean_products)} products into src/data/products.json!")
print("Successfully generated src/data/site-config.json and src/data/inquiries.json!")
