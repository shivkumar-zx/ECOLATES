'use client';

import React, { useState, useContext } from 'react';
import productsData from '@/data/products.json';
import { SampleContext } from '@/components/ClientLayoutShell';

export default function HomePage() {
  const { addSample, openModal } = useContext(SampleContext);
  const [activeCategory, setActiveCategory] = useState('all');
  const [camAngle, setCamAngle] = useState('top');
  const [camProductId, setCamProductId] = useState(1679); // Default 6oz Soup Bowl
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [bundleSlide, setBundleSlide] = useState(0);
  const [bestSellerSlide, setBestSellerSlide] = useState(0);
  const [industrySlide, setIndustrySlide] = useState(0);
  const [impactVolume, setImpactVolume] = useState(50000);
  const [customBundle, setCustomBundle] = useState({
    plates: 500,
    bowls: 500,
    trays: 250,
    clamshells: 500,
    cutlery: 500
  });
  const [rfqData, setRfqData] = useState({
    name: '',
    brand: '',
    phone: '',
    volume: '10000',
    notes: ''
  });

  // 5 Real Products with Multiple Angle Photos for 360° Inspection Studio
  const camProducts = [
    {
      id: 1679,
      title: '6oz (180ml) Bagasse Soup Bowl',
      category: 'Bowls',
      specs: { diameter: '116 mm', height: '45 mm', weight: '5.0 g', load: '180 ml', ctn: '1,000 pcs', thermal: '-20°C to 120°C' },
      desc: 'Engineered for piping hot soups, gravies, and desserts. Ultra-compressed agro-fiber walls prevent outer sogginess and thermal warping.',
      images: {
        top: 'https://www.ecolates.com/wp-content/uploads/2023/02/bagasse-bio-degradable-12oz-cereal-bowls-top-view.jpg',
        iso: 'https://www.ecolates.com/wp-content/uploads/2023/02/bagasse-bio-degradable-12oz-cereal-bowls.jpg',
        bottom: 'https://www.ecolates.com/wp-content/uploads/2023/02/bagasse-bio-degradable-12oz-cereal-bowls-bottom-view.jpg',
        thermal: 'https://www.ecolates.com/wp-content/uploads/2023/02/bagasse-bio-degradable-12oz-cereal-bowls-front-view.jpg'
      },
      fullProduct: productsData.find(p => p.id === 1679) || productsData[0]
    },
    {
      id: 1674,
      title: '9″ 3-Compartment Square Plate',
      category: 'Plates',
      specs: { diameter: '228 × 228 mm (9″)', height: '24 mm', weight: '15.0 g', load: '850 g', ctn: '500 pcs', thermal: '-20°C to 120°C' },
      desc: 'Partitioned heavy plate keeping gravies and dry sides isolated. Wide-rim border prevents table drips and holds heavy portions without sagging.',
      images: {
        top: 'https://www.ecolates.com/wp-content/uploads/2023/11/3-compartment-square-plates.jpg',
        iso: 'https://www.ecolates.com/wp-content/uploads/2023/11/3-compartment-square-plates-Photoroom.jpg',
        bottom: 'https://www.ecolates.com/wp-content/uploads/2023/11/3-compartment-square-plates.jpg',
        thermal: 'https://www.ecolates.com/wp-content/uploads/2023/11/3-compartment-square-plates-Photoroom.jpg'
      },
      fullProduct: productsData.find(p => p.id === 1674) || productsData[1]
    },
    {
      id: 2820,
      title: '5-Compartment Heavy Thali Bento Tray',
      category: 'Trays',
      specs: { diameter: '290 × 230 mm', height: '32 mm', weight: '22.0 g', load: '1.4 kg', ctn: '250 pcs', thermal: '-20°C to 120°C' },
      desc: 'Full commercial thali dining solution with dedicated compartments for curries, dal, rice, roti, and sweets. Stackable with snap-fit lids.',
      images: {
        top: 'https://www.ecolates.com/wp-content/uploads/2023/02/sugarcane-bagasse-round-bowl-top-view.jpg',
        iso: 'https://www.ecolates.com/wp-content/uploads/2023/02/sugarcane-bagasse-round-bowl.jpg',
        bottom: 'https://www.ecolates.com/wp-content/uploads/2023/02/sugarcane-bagasse-round-bowl-bottom-view.jpg',
        thermal: 'https://www.ecolates.com/wp-content/uploads/2023/02/sugarcane-bagasse-round-bowl-front-view.jpg'
      },
      fullProduct: productsData.find(p => p.id === 2820) || productsData[2]
    },
    {
      id: 2800,
      title: '6x6″ Square Hinged Clamshell Box',
      category: 'Containers',
      specs: { diameter: '152 × 152 mm (6x6″)', height: '75 mm', weight: '18.0 g', load: '650 ml', ctn: '500 pcs', thermal: '-20°C to 120°C' },
      desc: 'Secure snap-tab hinged lock keeps burgers, fries, and curries hot and intact during motorcycle delivery transits without plastic liners.',
      images: {
        top: 'https://www.ecolates.com/wp-content/uploads/2023/02/square-bagasse-food-container-with-lid-top-view.jpg',
        iso: 'https://www.ecolates.com/wp-content/uploads/2023/02/9-inch-square-bagasse-food-container-with-lid.jpg',
        bottom: 'https://www.ecolates.com/wp-content/uploads/2023/02/square-bagasse-food-container-with-lid-bottom-view.jpg',
        thermal: 'https://www.ecolates.com/wp-content/uploads/2023/02/square-bagasse-food-container-with-lid-front-view.jpg'
      },
      fullProduct: productsData.find(p => p.categorySlug === 'containers') || productsData[3]
    },
    {
      id: 752,
      title: '12″ 4-Compartment Round Plate',
      category: 'Plates',
      specs: { diameter: '304 mm (12″)', height: '28 mm', weight: '24.0 g', load: '1.6 kg', ctn: '250 pcs', thermal: '-20°C to 120°C' },
      desc: 'Extra-large banquet buffet plate engineered for grand Indian weddings and festive feasts. Unyielding rim firmness even under wet gravies.',
      images: {
        top: 'https://www.ecolates.com/wp-content/uploads/2023/02/8-oz-small-sugarcane-bagasse-bowl-bottom-view.jpg',
        iso: 'https://www.ecolates.com/wp-content/uploads/2023/02/8-oz-small-sugarcane-bagasse-bowl.jpg',
        bottom: 'https://www.ecolates.com/wp-content/uploads/2023/02/8-oz-small-sugarcane-bagasse-bowl-height-width-view.jpg',
        thermal: 'https://www.ecolates.com/wp-content/uploads/2023/02/8-oz-small-sugarcane-bagasse-bowl-front-view.jpg'
      },
      fullProduct: productsData.find(p => p.id === 752) || productsData[4]
    }
  ];

  const currentCamProduct = camProducts.find(cp => cp.id === camProductId) || camProducts[0];

  // Filter products for top showcase
  const filteredProducts = activeCategory === 'all'
    ? productsData
    : productsData.filter(p => p.categorySlug === activeCategory);

  // Top Bestsellers (Real products guaranteed for slider)
  const bestSellers = productsData.filter(p => p.bestseller || [1679, 2877, 2820, 1674, 752, 2800, 750, 753].includes(p.id));

  // Key products for bundles & industries
  const pSoupBowl = productsData.find(p => p.slug === 'product-1679') || productsData[0];
  const pPavBhaji = productsData.find(p => p.slug === 'product-1674') || productsData[1];
  const pMealTray = productsData.find(p => p.slug === 'product-2820') || productsData[2];
  const pRoundPlate = productsData.find(p => p.slug === 'product-752') || productsData[3];
  const pSquarePlate = productsData.find(p => p.slug === 'product-2877') || productsData[4];
  const pContainer = productsData.find(p => p.categorySlug === 'containers') || productsData[5];

  const handleRfqSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Wholesale RFQ',
          ...rfqData
        })
      });
      setRfqSubmitted(true);
    } catch (err) {
      setRfqSubmitted(true);
    }
  };

  const starterBundles = [
    {
      id: 'b1',
      title: 'Cloud Kitchen & Delivery Starter Bundle',
      tag: '🛵 500 Orders / Week',
      savings: 'Save 15% vs Individual SKUs',
      desc: 'Complete delivery solution engineered for zero curry spills and crisp fries during 45-minute bike transits.',
      items: [
        '500 pcs × 6x6" Square Hinged Clamshells',
        '500 pcs × 6oz (180ml) Gravy Bowls with Lids',
        '500 sets × Birchwood Spoon, Fork & Napkin'
      ],
      products: [pContainer, pSoupBowl],
      price: '₹4,850',
      regularPrice: '₹5,700'
    },
    {
      id: 'b2',
      title: 'Corporate Cafeteria & Thali Meal Bundle',
      tag: '🏢 High-Volume Lunch Service',
      savings: 'Save 18% Enterprise Tier',
      desc: 'Compartmentalized heavy trays keeping curries, rice, and rotis separate. Eliminates cafeteria washing costs.',
      items: [
        '1,000 pcs × 5-Compartment Heavy Thali Trays',
        '1,000 pcs × Crystal Clear Snap-Fit Lids',
        '1,000 pcs × 2-Ply Recycled Kraft Napkins'
      ],
      products: [pMealTray, pSoupBowl],
      price: '₹8,900',
      regularPrice: '₹10,850'
    },
    {
      id: 'b3',
      title: 'Luxury Wedding & Banquet Catering Bundle',
      tag: '🏨 1,000 Guests Catering Pack',
      savings: 'Save 20% Banquet Rate',
      desc: 'Elegant bright white dinnerware that holds heavy buffet portions without sagging or leaking oils.',
      items: [
        '1,000 pcs × 10" 3-Compartment Round Plates',
        '1,000 pcs × 7" Appetizer & Sweet Plates',
        '1,000 pcs × 250ml Curry & Dal Bowls'
      ],
      products: [pPavBhaji, pRoundPlate],
      price: '₹7,200',
      regularPrice: '₹9,000'
    },
    {
      id: 'b4',
      title: 'QSR Cafe, Bakery & Street Food Bundle',
      tag: '☕ Quick-Serve & Cafe Pack',
      savings: 'Save 16% Cafe Rate',
      desc: 'Compact aesthetic tableware for artisanal burgers, sandwiches, pastries, noodles, and hot beverages.',
      items: [
        '750 pcs × 9x6" Clamshell Sandwich & Burger Boxes',
        '750 pcs × 6" Square Dessert & Snack Plates',
        '750 pcs × 8oz (230ml) Hot Gravy & Soup Bowls',
        '750 pcs × Birchwood Compostable Forks'
      ],
      products: [pSquarePlate, pContainer],
      price: '₹5,400',
      regularPrice: '₹6,450'
    }
  ];

  // Custom Bundle Builder Calculations & Handlers
  const customTotalItems = customBundle.plates + customBundle.bowls + customBundle.trays + customBundle.clamshells + customBundle.cutlery;
  const customTotalCartons = Math.ceil(customBundle.plates / 500) + Math.ceil(customBundle.bowls / 1000) + Math.ceil(customBundle.trays / 250) + Math.ceil(customBundle.clamshells / 500) + Math.ceil(customBundle.cutlery / 1000);
  const customRawPrice = Math.round(
    (customBundle.plates * 2.85) +
    (customBundle.bowls * 1.85) +
    (customBundle.trays * 5.20) +
    (customBundle.clamshells * 4.90) +
    (customBundle.cutlery * 0.95)
  );
  const customSavings = Math.round(customRawPrice * 0.15);
  const customEstPrice = customRawPrice - customSavings;

  const updateCustomBundle = (key, delta) => {
    setCustomBundle(prev => {
      const newVal = Math.max(0, (prev[key] || 0) + delta);
      return { ...prev, [key]: newVal };
    });
  };

  const orderCustomBundleRFQ = () => {
    const summary = `Custom Built Bundle: ${customBundle.plates} Plates, ${customBundle.bowls} Bowls, ${customBundle.trays} Meal Trays, ${customBundle.clamshells} Clamshells, ${customBundle.cutlery} Cutlery sets. Total ${customTotalItems} pcs (~₹${customEstPrice.toLocaleString()}).`;
    setRfqData(prev => ({
      ...prev,
      volume: customTotalItems.toString(),
      notes: summary
    }));
    const rfqEl = document.getElementById('bulkEnquiry');
    if (rfqEl) {
      rfqEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addCustomBundleToSamples = () => {
    if (customBundle.plates > 0 && pRoundPlate) addSample(pRoundPlate);
    if (customBundle.bowls > 0 && pSoupBowl) addSample(pSoupBowl);
    if (customBundle.trays > 0 && pMealTray) addSample(pMealTray);
    if (customBundle.clamshells > 0 && pContainer) addSample(pContainer);
  };

  const industries = [
    {
      icon: '🛵',
      title: 'Cloud Kitchens & Delivery',
      desc: 'Zomato & Swiggy transit-tested clamshells and bowls with dual-lock lids that prevent motorcycle delivery spills.',
      bestProduct: 'Hinged Clamshells & Soup Bowls',
      featuredProducts: [pContainer, pSoupBowl]
    },
    {
      icon: '🏢',
      title: 'Corporate Cafeterias & IT Parks',
      desc: 'Partitioned 5-compartment thalis for employee lunches. 100% compostable, eliminating commercial dishwashing costs.',
      bestProduct: '5-CP & 6-CP Heavy Thali Trays',
      featuredProducts: [pMealTray, pPavBhaji]
    },
    {
      icon: '🏨',
      title: 'Hotels, Banquets & Weddings',
      desc: 'Pristine bright white plates with fluted borders that support heavy meal portions without bending or sogginess.',
      bestProduct: '9", 10", 12" Dinner Plates',
      featuredProducts: [pRoundPlate, pSquarePlate]
    },
    {
      icon: '☕',
      title: 'QSR Chains, Cafes & Bakeries',
      desc: 'Chic dessert plates and snack containers with greaseproof barriers for burgers, pizzas, pastas, and pastries.',
      bestProduct: '6" Snack Plates & 6x6" Boxes',
      featuredProducts: [pSquarePlate, pSoupBowl]
    },
    {
      icon: '🏥',
      title: 'Hospitals & Healthcare Facilities',
      desc: 'Sterile, single-use food packaging certified for hygiene, eliminating bacterial cross-contamination in patient meals.',
      bestProduct: 'Meal Trays with Sealed Lids',
      featuredProducts: [pMealTray, pContainer]
    },
    {
      icon: '✈️',
      title: 'Railways & Airline In-Flight Catering',
      desc: 'Ultra-lightweight, compact nesting tableware that saves onboard cargo weight and simplifies waste management.',
      bestProduct: 'Compact Bento Meal Boxes',
      featuredProducts: [pContainer, pPavBhaji]
    }
  ];

  return (
    <div>
      
      {/* 1. HERO BANNER WITH VISIBLE SUGARCANE BOTANICAL GRAPHICS */}
      <section className="section-container bg-light-green-tint" style={{ padding: '52px 0 58px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative Sugarcane Stalk Watermark Silhouette */}
        <div style={{ position: 'absolute', right: '-40px', bottom: '-20px', width: '360px', height: '360px', opacity: 0.12, pointerEvents: 'none' }}>
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path d="M100 200 C95 140 105 80 100 0" stroke="#1b4332" strokeWidth="8" strokeLinecap="round"/>
            <path d="M96 160 C70 140 50 110 40 70" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round"/>
            <path d="M104 130 C130 110 150 80 160 40" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round"/>
            <path d="M97 90 C75 80 60 55 55 20" stroke="#52b788" strokeWidth="3" strokeLinecap="round"/>
            <path d="M103 60 C125 50 140 30 145 5" stroke="#52b788" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '40px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          
          <div>
            <div className="light-green-tag" style={{ marginBottom: '14px', background: '#2d6a4f', color: '#ffffff' }}>
              🌾 100% Pure Sugarcane Bagasse Agro-Waste Upcycling
            </div>
            <h1 style={{ fontSize: '2.8rem', color: '#1b4332', lineHeight: '1.15', marginBottom: '16px' }}>
              Direct-from-Manufacturer <span style={{ color: '#2d6a4f', textDecoration: 'underline decoration-2' }}>Sugarcane Bagasse</span> Tableware & Food Packaging.
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#486153', lineHeight: '1.6', marginBottom: '24px' }}>
              Engineered from residual sugarcane stalks after juice extraction. 100% plastic-free, toxin-free, microwave-safe (-20°C to +120°C), and turns into nutrient-rich compost in 90 days.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="#featuredShowcase" className="btn btn-primary-green btn-lg">
                <span>Explore Commercial Products ↓</span>
              </a>
              <a href="#camStudio" className="btn btn-light-green-outline btn-lg" style={{ background: '#ffffff' }}>
                <span>🔍 360° Cam Inspection</span>
              </a>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '28px', fontSize: '0.84rem', fontWeight: '700', color: '#2d6a4f' }}>
              <div>✓ 100% Sugarcane Bagasse</div>
              <div>✓ Pan-India Air Courier</div>
              <div>✓ ISO 22000 & PFAS Free</div>
            </div>
          </div>

          {/* Hero Visual Card with Real Sugarcane Range */}
          <div style={{ background: '#ffffff', border: '2px solid #b7e4c7', borderRadius: '24px', padding: '30px', boxShadow: '0 16px 40px rgba(45, 106, 79, 0.12)', textAlign: 'center' }}>
            <div style={{ background: '#f0fbf4', borderRadius: '18px', padding: '24px', marginBottom: '18px', border: '1px solid #ddecde' }}>
              <img 
                src="https://www.ecolates.com/wp-content/uploads/2022/12/product-dishes.webp" 
                alt="Ecolates Sugarcane Tableware Range"
                style={{ width: '100%', maxHeight: '240px', objectFit: 'contain', margin: '0 auto' }}
              />
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#52b788', textTransform: 'uppercase' }}>Zero Wood • 100% Agro Waste</span>
            <h3 style={{ fontSize: '1.35rem', color: '#1b4332', margin: '4px 0 6px' }}>Zero Plastic. 100% Soil Compostable.</h3>
            <p style={{ fontSize: '0.85rem', color: '#486153', marginBottom: '14px' }}>Freezer safe down to -20°C. Reheatable in ovens and microwaves up to 120°C with zero chemical smell.</p>
            <div style={{ display: 'inline-block', background: '#d8f3dc', color: '#1b4332', padding: '5px 16px', borderRadius: '999px', fontSize: '0.76rem', fontWeight: '800' }}>
              Factory Direct Wholesale: Save 20-30%
            </div>
          </div>

        </div>
      </section>

      {/* SUGARCANE AGRO-WASTE TO TABLEWARE LIFECYCLE STRIP */}
      <div style={{ background: '#ffffff', borderBottom: '1.5px solid #ddecde', padding: '20px 0', boxShadow: '0 4px 16px rgba(45, 106, 79, 0.04)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#e8f7ee', border: '1px solid #b7e4c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
              🌾
            </div>
            <div>
              <strong style={{ fontSize: '0.88rem', color: '#1b4332', display: 'block' }}>1. Sugarcane Harvest</strong>
              <small style={{ color: '#486153', fontSize: '0.74rem' }}>Upcycling residual stalks (Zero Trees Cut)</small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#e8f7ee', border: '1px solid #b7e4c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
              ⚙️
            </div>
            <div>
              <strong style={{ fontSize: '0.88rem', color: '#1b4332', display: 'block' }}>2. High-Purity Pulping</strong>
              <small style={{ color: '#486153', fontSize: '0.74rem' }}>Unbleached natural bagasse agro-fiber</small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#e8f7ee', border: '1px solid #b7e4c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
              🏭
            </div>
            <div>
              <strong style={{ fontSize: '0.88rem', color: '#1b4332', display: 'block' }}>3. 300-Ton Hydraulic Press</strong>
              <small style={{ color: '#486153', fontSize: '0.74rem' }}>120°C oil-leak proof rigid thermo-molding</small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#e8f7ee', border: '1px solid #b7e4c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
              🍃
            </div>
            <div>
              <strong style={{ fontSize: '0.88rem', color: '#1b4332', display: 'block' }}>4. 100% Soil Return</strong>
              <small style={{ color: '#486153', fontSize: '0.74rem' }}>Decomposes into compost within 90 days</small>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP PROMINENT PRODUCT SHOWCASE */}
      <section className="section-container bg-white" id="featuredShowcase">
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <div>
              <span className="light-green-tag">Direct Catalog Access</span>
              <h2 className="main-section-title">Commercial Tableware & Packaging Products</h2>
              <p className="section-desc" style={{ margin: 0 }}>
                Showing certified commercial bagasse tableware manufactured directly in our certified facility.
              </p>
            </div>
            
            {/* Category Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', background: '#f0fbf4', padding: '6px', borderRadius: '999px', border: '1px solid #b7e4c7' }}>
              <button 
                type="button" 
                onClick={() => setActiveCategory('all')} 
                style={{ border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', background: activeCategory === 'all' ? '#2d6a4f' : 'transparent', color: activeCategory === 'all' ? '#ffffff' : '#2d6a4f' }}
              >
                All Products
              </button>
              <button 
                type="button" 
                onClick={() => setActiveCategory('plates')} 
                style={{ border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', background: activeCategory === 'plates' ? '#2d6a4f' : 'transparent', color: activeCategory === 'plates' ? '#ffffff' : '#2d6a4f' }}
              >
                🍽️ Plates
              </button>
              <button 
                type="button" 
                onClick={() => setActiveCategory('trays')} 
                style={{ border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', background: activeCategory === 'trays' ? '#2d6a4f' : 'transparent', color: activeCategory === 'trays' ? '#ffffff' : '#2d6a4f' }}
              >
                🍱 Bento & Thali Trays
              </button>
              <button 
                type="button" 
                onClick={() => setActiveCategory('containers')} 
                style={{ border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', background: activeCategory === 'containers' ? '#2d6a4f' : 'transparent', color: activeCategory === 'containers' ? '#ffffff' : '#2d6a4f' }}
              >
                📦 Clamshells
              </button>
              <button 
                type="button" 
                onClick={() => setActiveCategory('bowls')} 
                style={{ border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', background: activeCategory === 'bowls' ? '#2d6a4f' : 'transparent', color: activeCategory === 'bowls' ? '#ffffff' : '#2d6a4f' }}
              >
                🍲 Bowls
              </button>
            </div>
          </div>

          {/* Product Cards Grid with real images from ecolates.com */}
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className="product-card">
                
                <a href={`/products/${p.slug}`} className="card-img-wrap">
                  <img src={p.featuredImage} alt={p.title} loading="lazy" />
                </a>

                <div className="product-card-body">
                  <span className="product-cat-tag">{p.category}</span>
                  <a href={`/products/${p.slug}`}>
                    <h3 className="product-card-title">{p.title}</h3>
                  </a>
                  <p className="product-card-desc">{p.shortDescription}</p>

                  <div className="product-meta-pills">
                    <span className="meta-pill">MOQ: {p.moq}</span>
                    <span className="meta-pill">-20°C to 120°C</span>
                  </div>

                  <div className="product-card-footer">
                    <div className="card-price-col">
                      <span className="card-price-sub">Factory Rate</span>
                      <span className="card-price-val">{p.price}</span>
                    </div>

                    <div className="card-actions-row">
                      <button 
                        type="button" 
                        onClick={() => addSample(p)}
                        className="btn btn-light-green-outline"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        title="Add free evaluation piece to sample box"
                      >
                        + Sample
                      </button>
                      <a 
                        href={`/products/${p.slug}`}
                        className="btn btn-primary-green"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        Specs →
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. NEW SECTION: BEST SELLING COMMERCIAL PRODUCTS (REQUESTED BY USER) */}
      <section className="section-container bg-light-green-tint" id="bestSellers">
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <span className="light-green-tag">🔥 Commercial Best-Sellers</span>
              <h2 className="main-section-title">Highest Volume B2B Products</h2>
              <p className="section-desc" style={{ margin: 0 }}>
                Top-selling SKUs ordered by over 650+ restaurant chains, corporate caterers, and luxury banquets.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {bestSellers.length > 4 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setBestSellerSlide(prev => Math.max(0, prev - 1))}
                    disabled={bestSellerSlide === 0}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: bestSellerSlide === 0 ? '#e2ece5' : '#ffffff',
                      color: bestSellerSlide === 0 ? '#9cb5a5' : '#1b4332',
                      border: '1.5px solid #b7e4c7',
                      cursor: bestSellerSlide === 0 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                      transition: 'all 0.2s'
                    }}
                    title="Previous Slide"
                    aria-label="Previous Slide"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBestSellerSlide(prev => Math.min(bestSellers.length - 4, prev + 1))}
                    disabled={bestSellerSlide >= bestSellers.length - 4}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: bestSellerSlide >= bestSellers.length - 4 ? '#e2ece5' : '#2d6a4f',
                      color: bestSellerSlide >= bestSellers.length - 4 ? '#9cb5a5' : '#ffffff',
                      border: '1.5px solid #2d6a4f',
                      cursor: bestSellerSlide >= bestSellers.length - 4 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                      transition: 'all 0.2s'
                    }}
                    title="Next Slide"
                    aria-label="Next Slide"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              )}
              <a href="/products" className="btn btn-light-green-outline" style={{ fontWeight: 700 }}>
                View Full Catalog →
              </a>
            </div>
          </div>

          {bestSellers.length > 4 ? (
            <div style={{ overflow: 'hidden', padding: '6px 2px 14px' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '24px', 
                  transform: `translateX(calc(-${bestSellerSlide} * (25% + 6px)))`, 
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform'
                }}
              >
                {bestSellers.map((p, index) => (
                  <div 
                    key={p.id} 
                    className="product-card" 
                    style={{ 
                      flex: '0 0 calc(25% - 18px)', 
                      minWidth: '260px',
                      border: '2px solid #52b788',
                      boxShadow: '0 4px 16px rgba(45, 106, 79, 0.08)'
                    }}
                  >
                    
                    {/* Bestseller Badge */}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#2d6a4f', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', zIndex: 2 }}>
                      #{index + 1} Best Seller
                    </div>

                    <a href={`/products/${p.slug}`} className="card-img-wrap">
                      <img src={p.featuredImage} alt={p.title} loading="lazy" />
                    </a>

                    <div className="product-card-body">
                      <span className="product-cat-tag">{p.category}</span>
                      <a href={`/products/${p.slug}`}>
                        <h3 className="product-card-title">{p.title}</h3>
                      </a>
                      
                      <div className="product-meta-pills" style={{ marginTop: '8px' }}>
                        <span className="meta-pill">Standard MOQ: {p.moq}</span>
                        <span className="meta-pill">-20°C to 120°C</span>
                      </div>

                      <div className="product-card-footer">
                        <div className="card-price-col">
                          <span className="card-price-sub">Factory Rate</span>
                          <span className="card-price-val">{p.price}</span>
                        </div>

                        <div className="card-actions-row">
                          <button
                            type="button"
                            onClick={() => addSample(p)}
                            className="btn btn-light-green-outline"
                            style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                          >
                            + Sample
                          </button>
                          <a 
                            href={`/products/${p.slug}`} 
                            className="btn btn-primary-green" 
                            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                          >
                            Details →
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Slider Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '22px' }}>
                {Array.from({ length: bestSellers.length - 3 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setBestSellerSlide(i)}
                    style={{
                      width: bestSellerSlide === i ? '28px' : '9px',
                      height: '9px',
                      borderRadius: '5px',
                      background: bestSellerSlide === i ? '#2d6a4f' : '#b7e4c7',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    title={`Slide to position ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {bestSellers.map((p, index) => (
                <div key={p.id} className="product-card" style={{ border: '2px solid #52b788' }}>
                  
                  {/* Bestseller Badge */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#2d6a4f', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', zIndex: 2 }}>
                    #{index + 1} Best Seller
                  </div>

                  <a href={`/products/${p.slug}`} className="card-img-wrap">
                    <img src={p.featuredImage} alt={p.title} loading="lazy" />
                  </a>

                  <div className="product-card-body">
                    <span className="product-cat-tag">{p.category}</span>
                    <a href={`/products/${p.slug}`}>
                      <h3 className="product-card-title">{p.title}</h3>
                    </a>
                    
                    <div className="product-meta-pills" style={{ marginTop: '8px' }}>
                      <span className="meta-pill">Standard MOQ: {p.moq}</span>
                      <span className="meta-pill">-20°C to 120°C</span>
                    </div>

                    <div className="product-card-footer">
                      <div className="card-price-col">
                        <span className="card-price-sub">Factory Rate</span>
                        <span className="card-price-val">{p.price}</span>
                      </div>

                      <div className="card-actions-row">
                        <button
                          type="button"
                          onClick={() => addSample(p)}
                          className="btn btn-light-green-outline"
                          style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                        >
                          + Sample
                        </button>
                        <a 
                          href={`/products/${p.slug}`} 
                          className="btn btn-primary-green" 
                          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        >
                          Details →
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 4. CURATED STARTER TABLEWARE BUNDLES (WITH BIG SUGARCANE BACKGROUND & INTERACTIVE SLIDER) */}
      <section 
        className="section-container" 
        id="curatedBundles"
        style={{
          position: 'relative',
          backgroundImage: "linear-gradient(180deg, rgba(8, 28, 16, 0.90) 0%, rgba(14, 45, 26, 0.86) 50%, rgba(8, 28, 16, 0.94) 100%), url('/images/sugarcane_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#ffffff',
          padding: '76px 0 84px',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          
          <div className="text-center" style={{ marginBottom: '32px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(82, 183, 136, 0.22)', 
              border: '1.5px solid #52b788', 
              padding: '6px 18px', 
              borderRadius: '999px', 
              fontSize: '0.82rem', 
              fontWeight: 800, 
              color: '#d8f3dc', 
              textTransform: 'uppercase', 
              letterSpacing: '0.8px', 
              marginBottom: '14px',
              backdropFilter: 'blur(8px)'
            }}>
              🌾 100% Farm-Harvested Sugarcane Bagasse Agro-Fiber
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Curated Starter Tableware Bundles
            </h2>
            <p style={{ color: '#d8f3dc', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
              Turnkey commercial packs combining plates, bowls, clamshells, and cutlery for specific food service models. Direct factory supply saves up to 20% vs buying individual items.
            </p>
          </div>

          {/* Interactive Slider Navigation & Selector Controls */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '14px', 
            marginBottom: '28px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '12px 20px'
          }}>
            {/* Quick Bundle Selector Tabs (4 Curated Packs + 1 Custom Builder) */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {starterBundles.map((b, idx) => {
                const isActive = bundleSlide === idx;
                const packNames = ['Cloud Kitchen', 'Corporate Cafeteria', 'Banquet Catering', 'QSR Cafe & Bakery'];
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBundleSlide(idx)}
                    style={{
                      padding: '9px 16px',
                      borderRadius: '999px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isActive ? '2px solid #52b788' : '1px solid rgba(255,255,255,0.22)',
                      background: isActive ? '#52b788' : 'rgba(255,255,255,0.12)',
                      color: isActive ? '#0d2818' : '#ffffff',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{b.tag.split(' ')[0]}</span>
                    <span>Pack {idx + 1}: {packNames[idx] || b.title.split(' ')[0]}</span>
                  </button>
                );
              })}

              {/* 5th Tab: Custom Build For Yourself */}
              <button
                type="button"
                onClick={() => setBundleSlide(4)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  border: bundleSlide === 4 ? '2px solid #52b788' : '1px solid rgba(255,215,0,0.4)',
                  background: bundleSlide === 4 ? '#52b788' : 'rgba(255,215,0,0.15)',
                  color: bundleSlide === 4 ? '#0d2818' : '#ffd166',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>🛠️</span>
                <span>Build Your Own Bundle</span>
              </button>
            </div>

            {/* Slider Arrow Controls & Counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#d8f3dc' }}>
                {bundleSlide === 4 ? 'Custom Mix (5 of 5)' : `Pack ${bundleSlide + 1} of 4`}
              </span>
              <button
                type="button"
                onClick={() => setBundleSlide(prev => (prev === 0 ? 4 : prev - 1))}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: 'none',
                  color: '#1b4332',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                title="Previous Bundle"
                aria-label="Previous Bundle"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setBundleSlide(prev => (prev === 4 ? 0 : prev + 1))}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#52b788',
                  border: 'none',
                  color: '#0d2818',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                title="Next Bundle"
                aria-label="Next Bundle"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Active Featured Bundle Spotlight Card (Full Width - Zero Cut-off) */}
          {bundleSlide === 4 ? (
            /* INTERACTIVE CUSTOM BUNDLE BUILDER (USER CAN BUILD FOR THEMSELVES) */
            <div 
              style={{ 
                background: 'rgba(255, 255, 255, 0.98)', 
                border: '2.5px solid #52b788', 
                borderRadius: '26px', 
                padding: '36px', 
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                position: 'relative',
                color: '#182a20',
                display: 'grid',
                gridTemplateColumns: '1.25fr 0.75fr',
                gap: '36px',
                alignItems: 'start'
              }}
            >
              {/* Left Side: Interactive Configurator Steppers */}
              <div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#15803d', background: '#dcfce7', padding: '6px 14px', borderRadius: '999px', border: '1px solid #b7e4c7' }}>
                    🛠️ Interactive Custom Tableware Configurator
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2d6a4f', background: '#f0fbf4', padding: '5px 12px', borderRadius: '8px', border: '1px solid #b7e4c7' }}>
                    Save 15% Direct Manufacturer Bundle Tier
                  </span>
                </div>

                <h3 style={{ fontSize: '1.75rem', color: '#1b4332', marginBottom: '8px', fontWeight: 800, lineHeight: '1.3' }}>
                  Build Your Custom Commercial Tableware Bundle
                </h3>
                <p style={{ color: '#486153', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '22px' }}>
                  Adjust exact unit requirements for your business model. Bulk consolidated freight, factory wholesale tiered pricing, and microwave-safe durability guaranteed.
                </p>

                {/* Steppers List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  
                  {/* Stepper 1: Plates */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f7fbf8', padding: '12px 18px', borderRadius: '14px', border: '1px solid #ddecde' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#1b4332', fontSize: '0.92rem' }}>🍽️ Sugarcane Dinner & Compartment Plates</div>
                      <div style={{ fontSize: '0.78rem', color: '#52b788', fontWeight: 600 }}>10" 3-CP / 12" Round • ₹2.85/pc</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => updateCustomBundle('plates', -250)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #b7e4c7', background: '#fff', color: '#1b4332', fontWeight: 800, cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '70px', textAlign: 'center', fontWeight: 800, color: '#1b4332', fontSize: '0.95rem' }}>
                        {customBundle.plates} pcs
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCustomBundle('plates', 250)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #2d6a4f', background: '#2d6a4f', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Stepper 2: Bowls */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f7fbf8', padding: '12px 18px', borderRadius: '14px', border: '1px solid #ddecde' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#1b4332', fontSize: '0.92rem' }}>🥣 Hot Gravy & Soup Bowls (with Lids)</div>
                      <div style={{ fontSize: '0.78rem', color: '#52b788', fontWeight: 600 }}>180ml 6oz / 250ml 8oz • ₹1.85/pc</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => updateCustomBundle('bowls', -250)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #b7e4c7', background: '#fff', color: '#1b4332', fontWeight: 800, cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '70px', textAlign: 'center', fontWeight: 800, color: '#1b4332', fontSize: '0.95rem' }}>
                        {customBundle.bowls} pcs
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCustomBundle('bowls', 250)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #2d6a4f', background: '#2d6a4f', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Stepper 3: Bento Trays */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f7fbf8', padding: '12px 18px', borderRadius: '14px', border: '1px solid #ddecde' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#1b4332', fontSize: '0.92rem' }}>🍱 5 & 6-Compartment Heavy Thali Bento Trays</div>
                      <div style={{ fontSize: '0.78rem', color: '#52b788', fontWeight: 600 }}>Zero Sagging with Curries • ₹5.20/pc</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => updateCustomBundle('trays', -250)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #b7e4c7', background: '#fff', color: '#1b4332', fontWeight: 800, cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '70px', textAlign: 'center', fontWeight: 800, color: '#1b4332', fontSize: '0.95rem' }}>
                        {customBundle.trays} pcs
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCustomBundle('trays', 250)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #2d6a4f', background: '#2d6a4f', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Stepper 4: Clamshells */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f7fbf8', padding: '12px 18px', borderRadius: '14px', border: '1px solid #ddecde' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#1b4332', fontSize: '0.92rem' }}>📦 Hinged Clamshell Burger & Delivery Boxes</div>
                      <div style={{ fontSize: '0.78rem', color: '#52b788', fontWeight: 600 }}>6x6" / 9x6" Dual-Lock Snap • ₹4.90/pc</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => updateCustomBundle('clamshells', -250)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #b7e4c7', background: '#fff', color: '#1b4332', fontWeight: 800, cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '70px', textAlign: 'center', fontWeight: 800, color: '#1b4332', fontSize: '0.95rem' }}>
                        {customBundle.clamshells} pcs
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCustomBundle('clamshells', 250)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #2d6a4f', background: '#2d6a4f', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Stepper 5: Cutlery */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f7fbf8', padding: '12px 18px', borderRadius: '14px', border: '1px solid #ddecde' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#1b4332', fontSize: '0.92rem' }}>🍴 Birchwood Compostable Cutlery Sets</div>
                      <div style={{ fontSize: '0.78rem', color: '#52b788', fontWeight: 600 }}>160mm Heavy-Duty Spoon & Fork • ₹0.95/pc</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => updateCustomBundle('cutlery', -250)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #b7e4c7', background: '#fff', color: '#1b4332', fontWeight: 800, cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '70px', textAlign: 'center', fontWeight: 800, color: '#1b4332', fontSize: '0.95rem' }}>
                        {customBundle.cutlery} pcs
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCustomBundle('cutlery', 250)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #2d6a4f', background: '#2d6a4f', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>

                {/* Bottom Action Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '18px', borderTop: '1px solid #ddecde' }}>
                  <div>
                    <span style={{ fontSize: '0.82rem', color: '#7a9485', textDecoration: 'line-through', display: 'block' }}>
                      Catalog MRP: ₹{customRawPrice.toLocaleString()}
                    </span>
                    <div style={{ fontSize: '1.95rem', fontWeight: 900, color: '#2d6a4f', lineHeight: '1' }}>
                      ₹{customEstPrice.toLocaleString()}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#52b788', fontWeight: 700 }}>
                      *Includes 15% Custom Bundle Discount. Direct Factory Freight.
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button 
                      type="button" 
                      onClick={addCustomBundleToSamples}
                      className="btn btn-light-green-outline"
                      style={{ padding: '12px 18px', fontSize: '0.86rem', fontWeight: 800 }}
                      title="Add free evaluation samples of chosen products"
                    >
                      📦 Add Mix to Sample Box
                    </button>
                    <button 
                      type="button"
                      onClick={orderCustomBundleRFQ}
                      className="btn btn-primary-green" 
                      style={{ padding: '12px 22px', fontSize: '0.88rem', fontWeight: 800 }}
                    >
                      ⚡ Order Custom Bundle RFQ
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Side: Live Consolidation Summary */}
              <div style={{ background: '#f0fbf4', borderRadius: '20px', padding: '24px', border: '1.5px solid #b7e4c7' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1b4332', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
                  Consolidated Shipment Metrics:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #ddecde' }}>
                    <span style={{ fontSize: '0.74rem', color: '#666', display: 'block' }}>Total Tableware</span>
                    <strong style={{ fontSize: '1.25rem', color: '#1b4332' }}>{customTotalItems.toLocaleString()}</strong>
                    <span style={{ fontSize: '0.72rem', color: '#52b788', display: 'block' }}>Pieces Selected</span>
                  </div>

                  <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #ddecde' }}>
                    <span style={{ fontSize: '0.74rem', color: '#666', display: 'block' }}>Corrugated Cases</span>
                    <strong style={{ fontSize: '1.25rem', color: '#1b4332' }}>{customTotalCartons}</strong>
                    <span style={{ fontSize: '0.72rem', color: '#52b788', display: 'block' }}>Master Cartons</span>
                  </div>

                  <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #ddecde' }}>
                    <span style={{ fontSize: '0.74rem', color: '#666', display: 'block' }}>Pallet Footprint</span>
                    <strong style={{ fontSize: '1.25rem', color: '#1b4332' }}>{Math.max(1, Math.ceil(customTotalCartons / 24))}</strong>
                    <span style={{ fontSize: '0.72rem', color: '#52b788', display: 'block' }}>LTL Standard Pallet</span>
                  </div>

                  <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #ddecde' }}>
                    <span style={{ fontSize: '0.74rem', color: '#666', display: 'block' }}>Bundle Savings</span>
                    <strong style={{ fontSize: '1.25rem', color: '#16a34a' }}>₹{customSavings.toLocaleString()}</strong>
                    <span style={{ fontSize: '0.72rem', color: '#16a34a', display: 'block' }}>15% Discount</span>
                  </div>
                </div>

                {/* Selected Products Quick List */}
                <div style={{ background: '#ffffff', borderRadius: '14px', padding: '16px', border: '1px solid #ddecde', marginBottom: '18px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1b4332', marginBottom: '10px' }}>
                    Selected Bundle Mix:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#2d6a4f' }}>
                    {customBundle.plates > 0 && <div>✓ <strong>{customBundle.plates} pcs</strong> × 10" / 12" Dinner Plates</div>}
                    {customBundle.bowls > 0 && <div>✓ <strong>{customBundle.bowls} pcs</strong> × Hot Gravy & Soup Bowls</div>}
                    {customBundle.trays > 0 && <div>✓ <strong>{customBundle.trays} pcs</strong> × 5-CP Bento Meal Trays</div>}
                    {customBundle.clamshells > 0 && <div>✓ <strong>{customBundle.clamshells} pcs</strong> × Hinged Clamshell Boxes</div>}
                    {customBundle.cutlery > 0 && <div>✓ <strong>{customBundle.cutlery} pcs</strong> × Birchwood Cutlery Sets</div>}
                    {customTotalItems === 0 && <div style={{ color: '#ef4444' }}>Please select at least 1 category above.</div>}
                  </div>
                </div>

                {/* Sugarcane Certification Pill */}
                <div style={{ background: '#ffffff', borderRadius: '12px', padding: '12px', border: '1px dashed #52b788', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    🌾 100% Sugarcane Bagasse Agro-Fiber
                  </div>
                  <p style={{ fontSize: '0.74rem', color: '#486153', margin: '4px 0 0' }}>
                    Microwave Safe (120°C) • Freezer Safe (-20°C) • 90-Day Soil Compostable
                  </p>
                </div>
              </div>

            </div>
          ) : (
            /* PRE-CURATED BUNDLE SPOTLIGHT CARD (Pack 1 to 4) */
            (() => {
              const b = starterBundles[bundleSlide] || starterBundles[0];
              return (
                <div 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.98)', 
                    border: '2px solid #52b788', 
                    borderRadius: '26px', 
                    padding: '36px', 
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                    position: 'relative',
                    color: '#182a20',
                    display: 'grid',
                    gridTemplateColumns: '1.15fr 0.85fr',
                    gap: '36px',
                    alignItems: 'center'
                  }}
                >
                  {/* Left Side: Bundle Info & Checklist */}
                  <div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#15803d', background: '#dcfce7', padding: '6px 14px', borderRadius: '999px', border: '1px solid #b7e4c7' }}>
                        {b.tag}
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2d6a4f', background: '#f0fbf4', padding: '5px 12px', borderRadius: '8px', border: '1px solid #b7e4c7' }}>
                        {b.savings}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.75rem', color: '#1b4332', marginBottom: '12px', fontWeight: 800, lineHeight: '1.3' }}>
                      {b.title}
                    </h3>
                    <p style={{ color: '#486153', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '22px' }}>
                      {b.desc}
                    </p>

                    <div style={{ background: '#f7fbf8', border: '1px solid #ddecde', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#1b4332', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Included Commercial Specifications:
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#2d6a4f', fontWeight: 600 }}>
                        {b.items.map((item, i) => (
                          <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '18px', borderTop: '1px solid #ddecde' }}>
                      <div>
                        <span style={{ fontSize: '0.82rem', color: '#7a9485', textDecoration: 'line-through', display: 'block' }}>Regular: {b.regularPrice}</span>
                        <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#2d6a4f', lineHeight: '1' }}>{b.price}</div>
                        <span style={{ fontSize: '0.72rem', color: '#52b788', fontWeight: 700 }}>*Taxes extra. Bulk freight door delivery.</span>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {b.products && b.products[0] && (
                          <button 
                            type="button" 
                            onClick={() => addSample(b.products[0])}
                            className="btn btn-light-green-outline"
                            style={{ padding: '12px 18px', fontSize: '0.86rem', fontWeight: 800 }}
                            title="Add items to evaluation sample box"
                          >
                            📦 Add to Sample Box
                          </button>
                        )}
                        <a href="#bulkEnquiry" className="btn btn-primary-green" style={{ padding: '12px 22px', fontSize: '0.88rem', fontWeight: 800 }}>
                          ⚡ Order Bundle RFQ
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Visual Product Breakdown & Agricultural Fiber Guarantee */}
                  <div style={{ background: '#f0fbf4', borderRadius: '20px', padding: '24px', border: '1.5px solid #b7e4c7' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1b4332', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
                      Included Factory Products ({b.products ? b.products.length : 0}):
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                      {b.products && b.products.map((prod, pIdx) => prod && (
                        <a 
                          key={pIdx} 
                          href={`/products/${prod.slug}`} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            background: '#ffffff', 
                            padding: '12px 14px', 
                            borderRadius: '14px', 
                            border: '1px solid #ddecde', 
                            textDecoration: 'none',
                            boxShadow: '0 2px 8px rgba(45, 106, 79, 0.04)',
                            transition: 'transform 0.15s, border-color 0.15s'
                          }}
                          title={`View ${prod.title}`}
                        >
                          <img 
                            src={prod.featuredImage} 
                            alt={prod.title} 
                            style={{ width: '56px', height: '56px', objectFit: 'contain', background: '#fff', borderRadius: '10px', padding: '4px', border: '1px solid #e2ece5', flexShrink: 0 }} 
                          />
                          <div style={{ overflow: 'hidden', flex: 1 }}>
                            <strong style={{ display: 'block', fontSize: '0.86rem', color: '#1b4332', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {prod.title}
                            </strong>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' }}>
                              <span style={{ fontSize: '0.78rem', color: '#2d6a4f', fontWeight: 800 }}>{prod.price}/pc</span>
                              <span style={{ fontSize: '0.72rem', color: '#52b788', background: '#e8f7ee', padding: '2px 6px', borderRadius: '4px' }}>In Stock</span>
                            </div>
                          </div>
                          <span style={{ color: '#2d6a4f', fontSize: '0.84rem', fontWeight: 800 }}>→</span>
                        </a>
                      ))}
                    </div>

                    {/* Sugarcane Certification Pill */}
                    <div style={{ background: '#ffffff', borderRadius: '12px', padding: '12px', border: '1px dashed #52b788', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        🌾 100% Sugarcane Bagasse Agro-Fiber
                      </div>
                      <p style={{ fontSize: '0.74rem', color: '#486153', margin: '4px 0 0' }}>
                        Microwave Safe (120°C) • Freezer Safe (-20°C) • 90-Day Soil Compostable
                      </p>
                    </div>
                  </div>

                </div>
              );
            })()
          )}

          {/* Quick Click Thumbnail Cards to Switch Bundles Directly (4 Curated Packs + 1 Custom Builder) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: '24px' }}>
            {starterBundles.map((b, idx) => {
              const isActive = bundleSlide === idx;
              const packTitles = ['Cloud Kitchen', 'Corporate Thali', 'Banquet Catering', 'QSR Cafe & Bakery'];
              return (
                <div 
                  key={b.id}
                  onClick={() => setBundleSlide(idx)}
                  style={{
                    background: isActive ? 'rgba(82, 183, 136, 0.32)' : 'rgba(255, 255, 255, 0.12)',
                    border: isActive ? '2px solid #52b788' : '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '18px',
                    padding: '16px 18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0 8px 20px rgba(0, 0, 0, 0.25)' : 'none'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d8f3dc' }}>{b.tag}</span>
                    <h4 style={{ fontSize: '0.92rem', color: '#ffffff', margin: '3px 0 0', fontWeight: 700 }}>
                      Pack {idx + 1}: {packTitles[idx]}
                    </h4>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#52b788' }}>{b.price}</div>
                    <span style={{ fontSize: '0.7rem', color: isActive ? '#a7f3d0' : 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                      {isActive ? '● Active' : 'Select →'}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* 5th Thumbnail Card: Custom Builder */}
            <div 
              onClick={() => setBundleSlide(4)}
              style={{
                background: bundleSlide === 4 ? 'rgba(82, 183, 136, 0.35)' : 'rgba(255, 215, 0, 0.12)',
                border: bundleSlide === 4 ? '2px solid #52b788' : '1px solid rgba(255, 215, 0, 0.35)',
                borderRadius: '18px',
                padding: '16px 18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s',
                boxShadow: bundleSlide === 4 ? '0 8px 20px rgba(0, 0, 0, 0.25)' : 'none'
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ffd166' }}>🛠️ Custom Mix</span>
                <h4 style={{ fontSize: '0.92rem', color: '#ffffff', margin: '3px 0 0', fontWeight: 700 }}>
                  Build Your Own Bundle
                </h4>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#52b788' }}>
                  ₹{customEstPrice.toLocaleString()}
                </div>
                <span style={{ fontSize: '0.7rem', color: bundleSlide === 4 ? '#a7f3d0' : '#ffd166', fontWeight: 600 }}>
                  {bundleSlide === 4 ? '● Active Config' : 'Configure →'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. WHICH INDUSTRY CAN USE ECOLATES TABLEWARE? (WITH BIG SUGARCANE BACKGROUND & SLIDER) */}
      <section 
        className="section-container" 
        id="industrySolutions"
        style={{
          position: 'relative',
          backgroundImage: "linear-gradient(135deg, rgba(240, 251, 244, 0.92) 0%, rgba(225, 245, 230, 0.94) 100%), url('/images/sugarcane_stalks.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '76px 0 84px',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          
          <div className="text-center" style={{ marginBottom: '32px' }}>
            <span className="light-green-tag">🌱 Sugarcane Bagasse Industry Matcher</span>
            <h2 className="main-section-title">Which Industry Can Use Ecolates Tableware?</h2>
            <p className="section-desc">
              Custom-engineered sugarcane bagasse solutions tailored to the operational demands of 6 distinct food service sectors.
            </p>
          </div>

          {/* Industry Category Filter / Slide Tabs */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '12px', 
            marginBottom: '26px',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(10px)',
            padding: '12px 18px',
            borderRadius: '20px',
            border: '1.5px solid #b7e4c7'
          }}>
            {/* Quick Industry Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {industries.map((ind, idx) => {
                const isActive = industrySlide === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setIndustrySlide(idx)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '999px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isActive ? '2px solid #2d6a4f' : '1px solid #ddecde',
                      background: isActive ? '#2d6a4f' : '#ffffff',
                      color: isActive ? '#ffffff' : '#1b4332',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{ind.icon}</span>
                    <span>{ind.title.split('&')[0].trim()}</span>
                  </button>
                );
              })}
            </div>

            {/* Slider Arrow Controls & Counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#1b4332' }}>
                Industry {industrySlide + 1} of {industries.length}
              </span>
              <button
                type="button"
                onClick={() => setIndustrySlide(prev => (prev === 0 ? industries.length - 1 : prev - 1))}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '1.5px solid #b7e4c7',
                  color: '#1b4332',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(45, 106, 79, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                title="Previous Industry"
                aria-label="Previous Industry"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIndustrySlide(prev => (prev === industries.length - 1 ? 0 : prev + 1))}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#2d6a4f',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(45, 106, 79, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                title="Next Industry"
                aria-label="Next Industry"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Featured Industry Spotlight Showcase Card (Full Width - Zero Cut-off) */}
          {(() => {
            const ind = industries[industrySlide];
            return (
              <div
                style={{
                  background: '#ffffff',
                  border: '2px solid #52b788',
                  borderRadius: '24px',
                  padding: '34px',
                  boxShadow: '0 14px 34px rgba(45, 106, 79, 0.10)',
                  marginBottom: '26px',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '32px',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#f0fbf4', border: '1.5px solid #b7e4c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                      {ind.icon}
                    </div>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Industry Sector #{industrySlide + 1}
                      </span>
                      <h3 style={{ fontSize: '1.65rem', color: '#1b4332', lineHeight: '1.25', margin: '2px 0 0', fontWeight: 800 }}>
                        {ind.title}
                      </h3>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.96rem', color: '#486153', lineHeight: '1.6', marginBottom: '20px' }}>
                    {ind.desc}
                  </p>

                  <div style={{ background: '#f7faf8', padding: '14px 18px', borderRadius: '14px', border: '1px solid #ddecde', marginBottom: '22px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1b4332', marginBottom: '4px' }}>
                      Operational Solved Advantages:
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#2d6a4f', display: 'flex', gap: '14px', flexWrap: 'wrap', fontWeight: 600 }}>
                      <span>✓ 100% Oil & Water Proof</span>
                      <span>✓ No Chemical Odors</span>
                      <span>✓ Heavy Stacking Strength</span>
                      <span>✓ Zero Dishwashing Overhead</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a href="#bulkEnquiry" className="btn btn-primary-green" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                      Request Industry RFQ Rate
                    </a>
                    <a href="/certifications" className="btn btn-light-green-outline" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
                      View Food-Safe Lab Tests
                    </a>
                  </div>
                </div>

                {/* Recommended SKUs for this industry */}
                <div style={{ background: '#f0fbf4', border: '1.5px solid #b7e4c7', borderRadius: '20px', padding: '22px' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1b4332', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                    Recommended SKUs for {ind.title.split('&')[0].trim()}:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {ind.featuredProducts && ind.featuredProducts.map((prod, pIdx) => prod && (
                      <div 
                        key={pIdx}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: '10px 12px', borderRadius: '12px', border: '1px solid #ddecde' }}
                      >
                        <a 
                          href={`/products/${prod.slug}`}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flex: 1, overflow: 'hidden' }}
                        >
                          <img 
                            src={prod.featuredImage} 
                            alt={prod.title} 
                            style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '8px', background: '#fff', border: '1px solid #eef5f0', flexShrink: 0 }} 
                          />
                          <div style={{ overflow: 'hidden' }}>
                            <strong style={{ display: 'block', fontSize: '0.82rem', color: '#1b4332', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {prod.title}
                            </strong>
                            <span style={{ fontSize: '0.74rem', color: '#2d6a4f', fontWeight: 700 }}>{prod.price}/pc</span>
                          </div>
                        </a>
                        <button
                          type="button"
                          onClick={() => addSample(prod)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            background: '#e8f7ee',
                            border: '1px solid #b7e4c7',
                            color: '#15803d',
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            flexShrink: 0,
                            marginLeft: '8px'
                          }}
                          title="Add to sample box"
                        >
                          + Sample
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })()}

          {/* 6 Industry Mini-Cards Slider Strip (Clickable to switch instantly, no cut off) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(6, 1fr)', 
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '8px'
          }}>
            {industries.map((ind, i) => {
              const isActive = industrySlide === i;
              return (
                <div 
                  key={i} 
                  onClick={() => setIndustrySlide(i)}
                  style={{ 
                    background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.75)', 
                    border: isActive ? '2px solid #2d6a4f' : '1.5px solid #ddecde', 
                    borderRadius: '16px', 
                    padding: '16px 12px',
                    boxShadow: isActive ? '0 6px 18px rgba(45, 106, 79, 0.12)' : '0 2px 6px rgba(45, 106, 79, 0.04)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    minWidth: '150px'
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>{ind.icon}</div>
                  <h5 style={{ fontSize: '0.84rem', color: '#1b4332', lineHeight: '1.25', margin: '0 0 4px', fontWeight: 800 }}>
                    {ind.title.split('&')[0].trim()}
                  </h5>
                  <span style={{ fontSize: '0.7rem', color: isActive ? '#15803d' : '#7a9485', fontWeight: 700 }}>
                    {isActive ? '● Selected' : 'View →'}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. ENVIRONMENTAL IMPACT & PLANET SAVINGS SECTION (#planetSavings) */}
      <section className="section-container" id="planetSavings" style={{ background: '#f4fbf6', borderTop: '1px solid #ddecde', borderBottom: '1px solid #ddecde', padding: '64px 0 74px' }}>
        <div className="container">
          
          {/* Header */}
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="light-green-tag" style={{ background: '#e8f7ee', color: '#15803d', border: '1px solid #b7e4c7', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800 }}>
              🌍 Agro-Waste Circular Economy & Planet Protection
            </span>
            <h2 className="main-section-title" style={{ fontSize: '2.4rem', color: '#1b4332', margin: '14px 0 10px', fontWeight: 900 }}>
              How Choosing Ecolates Protects Our Planet & Saves Trees
            </h2>
            <p className="section-desc" style={{ maxWidth: '820px', margin: '0 auto', color: '#486153', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Every single Ecolates plate, bowl, and tray is manufactured from <strong>100% renewable sugarcane bagasse</strong> — the fibrous agricultural plant residue left after sugar extraction. By switching away from virgin paper and petrochemical plastics, your business directly stops deforestation and eliminates tons of landfill waste.
            </p>
          </div>

          {/* Interactive Planet Savings Calculator */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #b7e4c7',
            borderRadius: '26px',
            padding: '36px 32px',
            boxShadow: '0 16px 40px rgba(45, 106, 79, 0.08)',
            marginBottom: '46px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#15803d', letterSpacing: '0.08em' }}>
                  Interactive ESG Impact Estimator
                </span>
                <h3 style={{ fontSize: '1.45rem', color: '#1b4332', margin: '4px 0 0', fontWeight: 800 }}>
                  Calculate Your Environmental Savings by Switching to Bagasse
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#486153', fontWeight: 700 }}>Quick Presets:</span>
                {[10000, 25000, 50000, 100000, 250000, 500000].map(vol => (
                  <button
                    key={vol}
                    type="button"
                    onClick={() => setImpactVolume(vol)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: impactVolume === vol ? '1.5px solid #2d6a4f' : '1px solid #ddecde',
                      background: impactVolume === vol ? '#2d6a4f' : '#f7faf8',
                      color: impactVolume === vol ? '#ffffff' : '#1b4332',
                      fontSize: '0.78rem',
                      fontWeight: impactVolume === vol ? 800 : 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {vol >= 1000 ? `${vol / 1000}k` : vol} pcs
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Control Bar */}
            <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '16px', padding: '18px 22px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.86rem', color: '#1b4332', fontWeight: 700 }}>
                  Annual Tableware Order Quantity:
                </span>
                <span style={{ fontSize: '1.25rem', color: '#1b4332', fontWeight: 900, background: '#e8f7ee', padding: '4px 14px', borderRadius: '8px', border: '1px solid #b7e4c7' }}>
                  {impactVolume.toLocaleString('en-IN')} Units / Year
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={impactVolume}
                onChange={e => setImpactVolume(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2d6a4f', cursor: 'pointer', height: '6px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#7a9485', marginTop: '6px' }}>
                <span>5,000 pcs (Local Bistro / Cafe)</span>
                <span>50,000 pcs (Catering / Cloud Kitchen)</span>
                <span>500,000 pcs (Hospitality Chain / Pan-India)</span>
              </div>
            </div>

            {/* 4 Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
              
              {/* Stat 1: Trees Saved */}
              <div style={{ background: 'linear-gradient(135deg, #f0fbf4 0%, #e8f7ee 100%)', border: '1.5px solid #b7e4c7', borderRadius: '18px', padding: '22px 18px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ffffff', border: '1px solid #b7e4c7', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                  🌲
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#1b4332', lineHeight: '1.1', marginBottom: '4px' }}>
                  {Math.max(1, Math.round(impactVolume / 1500)).toLocaleString('en-IN')} Trees
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#15803d', marginBottom: '6px' }}>
                  Saved From Clear-Cutting
                </div>
                <p style={{ fontSize: '0.76rem', color: '#486153', lineHeight: '1.45', margin: 0 }}>
                  Virgin paper plates destroy forest timber. Sugarcane bagasse uses 100% upcycled agro-residue stalks with <strong>0 trees cut</strong>.
                </p>
              </div>

              {/* Stat 2: Plastic Diverted */}
              <div style={{ background: 'linear-gradient(135deg, #f0fbf4 0%, #e8f7ee 100%)', border: '1.5px solid #b7e4c7', borderRadius: '18px', padding: '22px 18px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ffffff', border: '1px solid #b7e4c7', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                  🚯
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#1b4332', lineHeight: '1.1', marginBottom: '4px' }}>
                  {Math.round(impactVolume * 0.022).toLocaleString('en-IN')} kg
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#15803d', marginBottom: '6px' }}>
                  Plastic & Foam Diverted
                </div>
                <p style={{ fontSize: '0.76rem', color: '#486153', lineHeight: '1.45', margin: 0 }}>
                  Prevents non-degradable thermocol and toxic plastic polymer liners from choking marine habitats and overflowing urban landfills.
                </p>
              </div>

              {/* Stat 3: CO2 Emissions Reduced */}
              <div style={{ background: 'linear-gradient(135deg, #f0fbf4 0%, #e8f7ee 100%)', border: '1.5px solid #b7e4c7', borderRadius: '18px', padding: '22px 18px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ffffff', border: '1px solid #b7e4c7', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                  ☁️
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#1b4332', lineHeight: '1.1', marginBottom: '4px' }}>
                  {Math.round(impactVolume * 0.048).toLocaleString('en-IN')} kg
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#15803d', marginBottom: '6px' }}>
                  CO₂e Emissions Prevented
                </div>
                <p style={{ fontSize: '0.76rem', color: '#486153', lineHeight: '1.45', margin: 0 }}>
                  Bagasse tableware has a <strong>72% lower carbon footprint</strong> than petrochemical plastics, cutting your company's Scope-3 emissions.
                </p>
              </div>

              {/* Stat 4: Organic Plant Soil Generated */}
              <div style={{ background: 'linear-gradient(135deg, #f0fbf4 0%, #e8f7ee 100%)', border: '1.5px solid #b7e4c7', borderRadius: '18px', padding: '22px 18px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ffffff', border: '1px solid #b7e4c7', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                  🌱
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#1b4332', lineHeight: '1.1', marginBottom: '4px' }}>
                  {Math.round(impactVolume * 0.02).toLocaleString('en-IN')} kg
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#15803d', marginBottom: '6px' }}>
                  Soil Compost Created
                </div>
                <p style={{ fontSize: '0.76rem', color: '#486153', lineHeight: '1.45', margin: 0 }}>
                  Naturally decomposes within <strong>60 to 90 days</strong>, returning mineral-rich plant nutrients back to the soil for the next crop cycle.
                </p>
              </div>

            </div>
          </div>

          {/* 4-Stage Closed-Loop Plant Cycle */}
          <div style={{ marginBottom: '46px' }}>
            <div className="text-center" style={{ marginBottom: '26px' }}>
              <span className="light-green-tag">100% Circular Agricultural Flow</span>
              <h3 style={{ fontSize: '1.75rem', color: '#1b4332', margin: '6px 0 6px', fontWeight: 800 }}>
                The Closed-Loop Plant Journey: From Sugarcane Farm to Compost
              </h3>
              <p style={{ color: '#486153', fontSize: '0.92rem', maxWidth: '640px', margin: '0 auto' }}>
                How Ecolates transforms agricultural crop byproducts into food-grade commercial tableware without harming nature.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
              
              <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '20px', padding: '24px 20px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#e8f7ee', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900 }}>
                    1
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#15803d', fontWeight: 800, background: '#e8f7ee', padding: '3px 8px', borderRadius: '6px' }}>Agro-Waste</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', color: '#1b4332', marginBottom: '8px', fontWeight: 800 }}>
                  🌾 Sugarcane Juice Extraction
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#486153', lineHeight: '1.55', margin: 0 }}>
                  Farmers harvest sugarcane for sugar & juice. The discarded dry fibrous residue (bagasse) is gathered rather than burned in open fields, preventing toxic smoke and seasonal smog.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '20px', padding: '24px 20px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#e8f7ee', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900 }}>
                    2
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#15803d', fontWeight: 800, background: '#e8f7ee', padding: '3px 8px', borderRadius: '6px' }}>Zero Trees</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', color: '#1b4332', marginBottom: '8px', fontWeight: 800 }}>
                  ⚙️ 300-Ton Hydraulic Tooling
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#486153', lineHeight: '1.55', margin: 0 }}>
                  Agro-fibers are pulped with pure water, steam-sterilized, and pressed at 160°C under 300 tons of pressure. Zero wood trees are cut, 0% chlorine bleach, and 100% PFAS-free.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '20px', padding: '24px 20px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#e8f7ee', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900 }}>
                    3
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#15803d', fontWeight: 800, background: '#e8f7ee', padding: '3px 8px', borderRadius: '6px' }}>Commercial Dine</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', color: '#1b4332', marginBottom: '8px', fontWeight: 800 }}>
                  🍽️ Heavy Commercial Meal Service
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#486153', lineHeight: '1.55', margin: 0 }}>
                  Unrivaled structural firmness holding heavy Indian curries, hot gravies, and soups. Microwave safe up to 120°C and freezer proof down to -20°C without getting soggy.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '20px', padding: '24px 20px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#e8f7ee', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900 }}>
                    4
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#15803d', fontWeight: 800, background: '#e8f7ee', padding: '3px 8px', borderRadius: '6px' }}>60-90 Days</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', color: '#1b4332', marginBottom: '8px', fontWeight: 800 }}>
                  🪴 Decomposes into Soil Nutrient
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#486153', lineHeight: '1.55', margin: 0 }}>
                  After dining disposal, the tableware decomposes naturally in backyard or municipal compost piles into rich organic humus in 60-90 days, fertilizing new plant and crop growth.
                </p>
              </div>

            </div>
          </div>

          {/* Side-by-Side Comparison & Official Graphic Banner */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #ddecde',
            borderRadius: '24px',
            padding: '36px',
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '36px',
            alignItems: 'center',
            boxShadow: '0 8px 24px rgba(45, 106, 79, 0.05)'
          }}>
            <div>
              <span className="light-green-tag">Direct Environmental Comparison</span>
              <h3 style={{ fontSize: '1.65rem', color: '#1b4332', margin: '8px 0 16px', fontWeight: 800 }}>
                Sugarcane Bagasse vs Plastic & Paper
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', padding: '10px 14px', background: '#f7faf8', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 800, color: '#1b4332' }}>
                  <span>Metric</span>
                  <span style={{ color: '#15803d' }}>Ecolates Bagasse</span>
                  <span style={{ color: '#b91c1c' }}>Plastic / Thermocol</span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', padding: '10px 14px', borderBottom: '1px solid #edf2ee', fontSize: '0.82rem' }}>
                  <strong style={{ color: '#1b4332' }}>Forest Trees Cut Down</strong>
                  <span style={{ color: '#15803d', fontWeight: 700 }}>✓ Zero (100% Agro-Residue)</span>
                  <span style={{ color: '#dc2626' }}>Paper uses virgin forest timber</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', padding: '10px 14px', borderBottom: '1px solid #edf2ee', fontSize: '0.82rem' }}>
                  <strong style={{ color: '#1b4332' }}>Decomposition Speed</strong>
                  <span style={{ color: '#15803d', fontWeight: 700 }}>✓ 60 to 90 Days in Soil</span>
                  <span style={{ color: '#dc2626' }}>450 - 1,000+ Years in Landfill</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', padding: '10px 14px', borderBottom: '1px solid #edf2ee', fontSize: '0.82rem' }}>
                  <strong style={{ color: '#1b4332' }}>Microplastics & Toxins</strong>
                  <span style={{ color: '#15803d', fontWeight: 700 }}>✓ 0% Toxic Leaching</span>
                  <span style={{ color: '#dc2626' }}>High microplastic contamination</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', padding: '10px 14px', fontSize: '0.82rem' }}>
                  <strong style={{ color: '#1b4332' }}>Microwave Safe (120°C)</strong>
                  <span style={{ color: '#15803d', fontWeight: 700 }}>✓ Safe & Leak-Resistant</span>
                  <span style={{ color: '#dc2626' }}>Melts & releases dioxins</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', marginTop: '26px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="btn btn-primary-green"
                  style={{ padding: '11px 22px', fontSize: '0.9rem', fontWeight: 800 }}
                >
                  📦 Order Free Evaluation Sample Box
                </button>
                <a
                  href="#bulkEnquiry"
                  className="btn btn-light-green-outline"
                  style={{ padding: '11px 20px', fontSize: '0.9rem', fontWeight: 700, background: '#ffffff' }}
                >
                  ⚡ Get Factory RFQ for Your Volume
                </a>
              </div>
            </div>

            <div style={{ textAlign: 'center', background: '#f7faf8', borderRadius: '18px', padding: '24px', border: '1px solid #b7e4c7' }}>
              <img
                src="https://www.ecolates.com/wp-content/uploads/2022/12/planet-help-1024x535.png"
                alt="How Ecolates Tableware Protects the Planet"
                style={{ width: '100%', maxHeight: '240px', objectFit: 'contain', marginBottom: '14px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', background: '#e8f7ee', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontWeight: 700, border: '1px solid #b7e4c7' }}>
                  🌱 100% Home Compostable
                </span>
                <span style={{ fontSize: '0.72rem', background: '#e8f7ee', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontWeight: 700, border: '1px solid #b7e4c7' }}>
                  🌲 Zero Trees Cut Down
                </span>
                <span style={{ fontSize: '0.72rem', background: '#e8f7ee', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontWeight: 700, border: '1px solid #b7e4c7' }}>
                  🛡️ Certified PFAS Free
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. 360° INTERACTIVE PRODUCT CAMERA STUDIO (#camStudio) */}
      <section className="section-container bg-white" id="camStudio">
        <div className="container">
          
          <div className="text-center" style={{ marginBottom: '28px' }}>
            <span className="light-green-tag">Virtual 360° Inspection Studio</span>
            <h2 className="main-section-title">Interactive Product Camera & Quality Inspection</h2>
            <p className="section-desc">
              Select different products below to inspect multi-angle real photographs, structural ribs, rim rigidity, and 120°C hot oil simulation.
            </p>
          </div>

          {/* Product Selector Tabs Bar */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {camProducts.map((cp) => {
              const isSelected = camProductId === cp.id;
              return (
                <button
                  key={cp.id}
                  type="button"
                  onClick={() => setCamProductId(cp.id)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '999px',
                    border: isSelected ? '2px solid #2d6a4f' : '1px solid #b7e4c7',
                    background: isSelected ? '#2d6a4f' : '#f0fbf4',
                    color: isSelected ? '#ffffff' : '#1b4332',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 12px rgba(45, 106, 79, 0.2)' : 'none',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cp.title}
                </button>
              );
            })}
          </div>

          {/* Interactive Inspection Stage & Spec Details */}
          <div style={{ marginTop: '20px', background: '#ffffff', border: '1.5px solid #b7e4c7', borderRadius: '24px', padding: '36px', display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '36px', alignItems: 'center', boxShadow: '0 8px 30px rgba(45, 106, 79, 0.08)' }}>
            
            {/* Virtual Stage with Real Product Photography */}
            <div style={{ background: camAngle === 'thermal' ? 'radial-gradient(circle, #fef2f2 0%, #fee2e2 100%)' : 'radial-gradient(circle, #f0fbf4 0%, #e2f4e8 100%)', border: '1.5px solid #b7e4c7', borderRadius: '20px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px', position: 'relative', overflow: 'hidden', transition: 'background 0.3s ease' }}>
              
              <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255,255,255,0.95)', border: '1px solid #b7e4c7', padding: '4px 12px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 800, color: '#2d6a4f' }}>
                🟢 {currentCamProduct.title} ({currentCamProduct.category})
              </div>

              {camAngle === 'thermal' && (
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#dc2626', color: '#fff', padding: '4px 10px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 800 }}>
                  🔥 120°C Thermal Pass
                </div>
              )}

              {/* Product Photo Stage */}
              <div style={{ width: '280px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                <img 
                  src={currentCamProduct.images[camAngle] || currentCamProduct.images.iso} 
                  alt={currentCamProduct.title}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: camAngle === 'thermal' ? 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.75)) contrast(1.15)' : 'drop-shadow(0 8px 16px rgba(45, 106, 79, 0.12))',
                    transform: camAngle === 'iso' ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              {/* Angle Controls */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '18px', background: '#ffffff', padding: '6px', borderRadius: '999px', border: '1px solid #b7e4c7', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button 
                  type="button" 
                  onClick={() => setCamAngle('top')} 
                  style={{ border: 'none', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', background: camAngle === 'top' ? '#2d6a4f' : 'transparent', color: camAngle === 'top' ? '#fff' : '#486153' }}
                >
                  🔍 Top View
                </button>
                <button 
                  type="button" 
                  onClick={() => setCamAngle('iso')} 
                  style={{ border: 'none', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', background: camAngle === 'iso' ? '#2d6a4f' : 'transparent', color: camAngle === 'iso' ? '#fff' : '#486153' }}
                >
                  🔄 45° 3D Angle
                </button>
                <button 
                  type="button" 
                  onClick={() => setCamAngle('bottom')} 
                  style={{ border: 'none', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', background: camAngle === 'bottom' ? '#2d6a4f' : 'transparent', color: camAngle === 'bottom' ? '#fff' : '#486153' }}
                >
                  📐 Bottom Fluting
                </button>
                <button 
                  type="button" 
                  onClick={() => setCamAngle('thermal')} 
                  style={{ border: 'none', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', background: camAngle === 'thermal' ? '#dc2626' : 'transparent', color: camAngle === 'thermal' ? '#fff' : '#486153' }}
                >
                  🔥 120°C Thermal Cam
                </button>
              </div>
            </div>

            {/* Spec Details */}
            <div>
              <span className="light-green-tag">Lab Verified Specifications</span>
              <h3 style={{ fontSize: '1.7rem', color: '#1b4332', margin: '8px 0 12px' }}>
                {currentCamProduct.title}
              </h3>
              <p style={{ color: '#486153', lineHeight: '1.6', marginBottom: '18px', fontSize: '0.94rem' }}>
                {currentCamProduct.desc}
              </p>

              {/* Parameter Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
                <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', color: '#7a9485', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Dimensions</span>
                  <strong style={{ fontSize: '0.86rem', color: '#1b4332' }}>{currentCamProduct.specs.diameter}</strong>
                </div>
                <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', color: '#7a9485', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Piece Weight</span>
                  <strong style={{ fontSize: '0.86rem', color: '#1b4332' }}>{currentCamProduct.specs.weight}</strong>
                </div>
                <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', color: '#7a9485', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Case Pack</span>
                  <strong style={{ fontSize: '0.86rem', color: '#1b4332' }}>{currentCamProduct.specs.ctn}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', fontSize: '0.88rem' }}>
                <div><span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span> <strong>Zero Grease Leaks:</strong> Heavy oil barrier resists hot curries & oils for &gt; 4 hours.</div>
                <div><span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span> <strong>Microwave Proof:</strong> 100% safe up to 120°C for reheating without softening or toxins.</div>
                <div><span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span> <strong>Rigid Agro-Pulp:</strong> Will not buckle or bend when carried with heavy portions.</div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => addSample(currentCamProduct.fullProduct)}
                  className="btn btn-primary-green"
                  style={{ flexGrow: 1, justifyContent: 'center' }}
                >
                  + Add to Free Sample Kit Box
                </button>

                <a 
                  href={`/products/${currentCamProduct.fullProduct?.slug || 'product-1679'}`} 
                  className="btn btn-light-green-outline"
                  style={{ padding: '10px 16px' }}
                >
                  Full Specs →
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. 6-POINT COMMERCIAL QUALITY & COMPLIANCE CHECKLIST (#productChecks) */}
      <section className="section-container bg-light-green-tint" id="productChecks">
        <div className="container">
          
          <div className="text-center">
            <span className="light-green-tag">100% Quality Assurance</span>
            <h2 className="main-section-title">6-Point Factory Quality & Compliance Checklist</h2>
            <p className="section-desc">Every production batch of Ecolates tableware is rigorously tested against extreme kitchen conditions before dispatch.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '36px' }}>
            
            <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '18px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '1.8rem' }}>🍲</div>
                <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>✓ 100% PASSED</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#1b4332' }}>1. Hot Oil & Gravy Seep Barrier</h4>
              <p style={{ fontSize: '0.85rem', color: '#486153', lineHeight: '1.5' }}>Tested with boiling vegetable oil and spicy curries at 120°C for 4 consecutive hours. Zero sogginess or grease marks.</p>
            </div>

            <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '18px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '1.8rem' }}>⚡</div>
                <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>✓ 100% PASSED</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#1b4332' }}>2. Microwave & Deep Freeze Stability</h4>
              <p style={{ fontSize: '0.85rem', color: '#486153', lineHeight: '1.5' }}>Endures sudden thermal shocks from -20°C commercial blast chillers directly into 120°C commercial microwaves without cracking.</p>
            </div>

            <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '18px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '1.8rem' }}>🛡️</div>
                <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>✓ CERTIFIED</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#1b4332' }}>3. Zero PFAS, Bleach & Toxins</h4>
              <p style={{ fontSize: '0.85rem', color: '#486153', lineHeight: '1.5' }}>100% chlorine-free mechanical pulping. Tested for zero perfluorinated chemicals (PFAS), heavy metals, or plasticizers.</p>
            </div>

            <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '18px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '1.8rem' }}>🏋️</div>
                <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>✓ 100% PASSED</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#1b4332' }}>4. Structural Rim Deflection Rigidity</h4>
              <p style={{ fontSize: '0.85rem', color: '#486153', lineHeight: '1.5' }}>Rigid interlocking sugarcane fibers withstand over 1.25kg of dense food weight without rim bending or folding.</p>
            </div>

            <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '18px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '1.8rem' }}>🏍️</div>
                <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>✓ 100% PASSED</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#1b4332' }}>5. Delivery Spill-Proof Locking Seal</h4>
              <p style={{ fontSize: '0.85rem', color: '#486153', lineHeight: '1.5' }}>Thermoformed rim contours lock tight with recyclable PLA and bagasse snap lids. Tested for motorcycle delivery vibrations.</p>
            </div>

            <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '18px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '1.8rem' }}>🌱</div>
                <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px' }}>✓ VERIFIED</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#1b4332' }}>6. 90-Day Natural Soil Compostability</h4>
              <p style={{ fontSize: '0.85rem', color: '#486153', lineHeight: '1.5' }}>Naturally decomposes into nutrient-rich organic compost within 60-90 days in home soil or commercial composting facilities.</p>
            </div>

          </div>

        </div>
      </section>

      {/* 8. DIRECT FACTORY WHOLESALE RFQ PORTAL (#bulkEnquiry) */}
      <section className="section-container bg-white" id="bulkEnquiry">
        <div className="container" style={{ maxWidth: '840px' }}>
          
          <div className="text-center" style={{ marginBottom: '28px' }}>
            <span className="light-green-tag">Direct Factory Supply</span>
            <h2 className="main-section-title">Wholesale Trade Quotation Request</h2>
            <p className="section-desc">Tiered bulk pricing for restaurant chains, catering companies, and packaging distributors.</p>
          </div>

          <div style={{ background: '#ffffff', border: '2px solid #b7e4c7', borderRadius: '24px', padding: '36px', boxShadow: '0 12px 30px rgba(45, 106, 79, 0.1)' }}>
            {rfqSubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📋</div>
                <h3 style={{ fontSize: '1.6rem', color: '#1b4332', marginBottom: '8px' }}>Wholesale RFQ Received!</h3>
                <p style={{ color: '#486153', marginBottom: '18px' }}>
                  Our corporate sales representative will review your required volume and deliver official manufacturer price tiers via WhatsApp / Email within 4 business hours.
                </p>
                <button type="button" onClick={() => setRfqSubmitted(false)} className="btn btn-primary-green">
                  Submit Another RFQ
                </button>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: '#182a20' }}>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Chef Sanjay Kapoor" 
                      value={rfqData.name}
                      onChange={(e) => setRfqData({...rfqData, name: e.target.value})}
                      style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #ddecde', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: '#182a20' }}>Business / Brand Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Spice Route Cloud Kitchen" 
                      value={rfqData.brand}
                      onChange={(e) => setRfqData({...rfqData, brand: e.target.value})}
                      style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #ddecde', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: '#182a20' }}>WhatsApp Mobile Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 98765 00000" 
                      value={rfqData.phone}
                      onChange={(e) => setRfqData({...rfqData, phone: e.target.value})}
                      style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #ddecde', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: '#182a20' }}>Expected Monthly Volume</label>
                    <select 
                      value={rfqData.volume}
                      onChange={(e) => setRfqData({...rfqData, volume: e.target.value})}
                      style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #ddecde', borderRadius: '8px', outline: 'none', background: '#fff' }}
                    >
                      <option value="5000">5,000 to 10,000 units (Trial MOQ)</option>
                      <option value="25000">25,000 to 50,000 units (Restaurant Tier)</option>
                      <option value="100000">100,000+ units (Wholesale / Distributor Tier)</option>
                      <option value="container">Full Container Load (FCL Export)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: '#182a20' }}>Required Products or Custom Moulding Requirements</label>
                  <textarea 
                    rows={3}
                    placeholder="List specific plate diameters, compartment trays, or delivery boxes required..." 
                    value={rfqData.notes}
                    onChange={(e) => setRfqData({...rfqData, notes: e.target.value})}
                    style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #ddecde', borderRadius: '8px', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary-green btn-block btn-lg">
                  Submit Wholesale RFQ for Factory Rates →
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
