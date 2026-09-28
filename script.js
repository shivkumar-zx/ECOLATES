/**
 * ECOLATES - Interactive Commercial Tableware Logic
 * - Two-Tier Navigation & Quick Search Bar
 * - Shop by Food Type Shortcuts
 * - Interactive Size & Dimension Finder
 * - Top Selling & Catalog Filtering
 * - Free B2B Sample Kit Evaluation Box
 * - Interactive Lab Commercial Stress Test Experience
 * - Live Eco-Impact Calculator
 * - Quick Specs Modal
 * - FAQ Accordion
 * - B2B RFQ Submission
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. PRODUCT SPECIFICATION DATABASE
  // ==========================================
  const productDatabase = {
    p1: {
      title: '10-Inch 3-Compartment Round Plate',
      category: 'Dinnerware Series',
      sku: 'ECL-PLT-3CP-10',
      price: '₹2.85',
      moq: '5,000 units',
      specs: 'Diameter: 254mm | Depth: 25mm | Weight: 21g',
      features: [
        'Segmented design keeps liquid gravies & dry rice separated',
        'Certified microwave and oven safe up to 120°C for 25 mins',
        'Zero plastic wax coating; backyard home compostable in 90 days',
        'Rigid rim lip prevents sagging during high-volume buffet service'
      ]
    },
    p2: {
      title: '9-Inch Round Single Cavity Plate',
      category: 'Dinnerware Series',
      sku: 'ECL-PLT-RND-09',
      price: '₹2.10',
      moq: '5,000 units',
      specs: 'Diameter: 228mm | Depth: 20mm | Weight: 16g',
      features: [
        'Classic ergonomic fluted border for single-handed grip',
        'Hot oil, gravy, and grease proof with zero chemical additives',
        'Freezer safe down to -20°C without cracking or brittleness',
        'Compact stackable carton packing for busy restaurant kitchens'
      ]
    },
    p3: {
      title: '5-Compartment Heavy Thali Tray with Lid',
      category: 'Bento & Thali Trays',
      sku: 'ECL-TRY-5CP-01',
      price: '₹4.40',
      moq: '3,000 units',
      specs: 'Dimensions: 300 x 240 x 35mm | Weight: 38g',
      features: [
        'Engineered for Indian corporate thalis & wedding feast menus',
        'Dedicated cavities for 2 gravies, rice, rotis, dessert & salad',
        'Optional anti-fog crystal clear snap-fit lid or bagasse lid',
        'Reinforced center divider bars eliminate tray sagging'
      ]
    },
    p4: {
      title: '750ml Clamshell Hinged Food Box',
      category: 'Delivery Packaging',
      sku: 'ECL-CLM-750',
      price: '₹3.60',
      moq: '5,000 units',
      specs: 'Volume: 750ml | 150 x 150 x 75mm | Weight: 28g',
      features: [
        'Dual interlocking tab latch stops motorcycle delivery leaks',
        'Breathable bagasse plant fibers prevent soggy fries and burgers',
        'Superior thermal retention keeps meals hot 30% longer than plastic',
        'Fits burgers, pasta, rice bowls, and artisan bakery items'
      ]
    },
    p5: {
      title: '250ml Round Gravy & Soup Bowl',
      category: 'Bowls & Soup Cups',
      sku: 'ECL-BWL-250',
      price: '₹1.35',
      moq: '6,000 units',
      specs: 'Diameter: 115mm | Depth: 45mm | Weight: 11g',
      features: [
        'Thermoformed rim engineered to fit tight leak-proof lids',
        'Handles boiling hot sambar, curries, and soups with zero odor',
        '100% upcycled agricultural sugarcane fiber',
        'Approved by FSSAI for high-fat and spicy food contact'
      ]
    },
    p6: {
      title: 'Bagasse & Birchwood Cutlery Kit',
      category: 'Eco Cutlery',
      sku: 'ECL-CTL-KIT',
      price: '₹0.95',
      moq: '10,000 sets',
      specs: '160mm Heavy Spoon + Fork + 2-Ply Kraft Napkin',
      features: [
        'Smooth polished finish with zero splintering or wooden taste',
        'High tensile rigidity cuts through dense meats and paneer',
        'Packaged in plastic-free recyclable kraft paper wrapper',
        'FSC certified sustainable forestry sourcing'
      ]
    }
  };

  // ==========================================
  // 2. LIVE SEARCH & QUICK SEARCH PILLS
  // ==========================================
  const liveSearchInput = document.getElementById('liveSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const quickPills = document.querySelectorAll('.quick-pill');

  function filterCatalogBySearch(query) {
    const term = query.toLowerCase().trim();
    const items = document.querySelectorAll('.catalog-product-item');

    items.forEach(card => {
      const title = card.querySelector('.prod-title').textContent.toLowerCase();
      const desc = card.querySelector('.prod-desc').textContent.toLowerCase();
      if (!term || title.includes(term) || desc.includes(term)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    if (clearSearchBtn) {
      clearSearchBtn.style.display = term ? 'block' : 'none';
    }
  }

  if (liveSearchInput) {
    liveSearchInput.addEventListener('input', (e) => {
      filterCatalogBySearch(e.target.value);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      liveSearchInput.value = '';
      filterCatalogBySearch('');
      liveSearchInput.focus();
    });
  }

  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const q = pill.dataset.query;
      if (liveSearchInput) {
        liveSearchInput.value = q;
        filterCatalogBySearch(q);
        const catalogSec = document.getElementById('products');
        if (catalogSec) catalogSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // 3. SHOP BY FOOD TYPE TRIGGER
  // ==========================================
  window.filterByFoodCategory = (category) => {
    const targetBtn = document.querySelector(`.filter-btn[data-category="${category}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
    const catalogSec = document.getElementById('products');
    if (catalogSec) {
      catalogSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ==========================================
  // 4. INTERACTIVE SIZE & DIMENSION FINDER
  // ==========================================
  const dimensionData = {
    p1: {
      sku: 'ECL-PLT-3CP-10',
      title: '10-Inch 3-Compartment Round Plate',
      desc: 'Deep 25mm partitioned cavities. The ideal solution for corporate lunch catering, weddings, and traditional Indian meals with multiple curries.',
      size: '254 mm (10")',
      depth: '25 mm',
      pack: '500 pcs / Carton',
      weight: '21 grams',
      svg: `
        <svg viewBox="0 0 240 240" fill="none">
          <circle cx="120" cy="120" r="95" fill="#f0fbf4" stroke="#52b788" stroke-width="4"/>
          <circle cx="120" cy="120" r="75" fill="#ffffff" stroke="#b7e4c7" stroke-width="2"/>
          <line x1="50" y1="120" x2="190" y2="120" stroke="#52b788" stroke-width="3"/>
          <line x1="120" y1="120" x2="120" y2="195" stroke="#52b788" stroke-width="3"/>
          <line x1="15" y1="120" x2="225" y2="120" stroke="#1b4332" stroke-width="1.5" stroke-dasharray="4 4"/>
          <text x="120" y="35" text-anchor="middle" font-size="12" font-weight="700" fill="#2d6a4f">254mm (10-Inch Diameter)</text>
        </svg>
      `
    },
    p2: {
      sku: 'ECL-PLT-RND-09',
      title: '9-Inch Round Single Cavity Plate',
      desc: 'Ergonomic fluted border prevents finger slippage. Perfect for buffets, cocktail parties, main-course dinners, and wedding catering.',
      size: '228 mm (9")',
      depth: '20 mm',
      pack: '1,000 pcs / Carton',
      weight: '16 grams',
      svg: `
        <svg viewBox="0 0 240 240" fill="none">
          <circle cx="120" cy="120" r="88" fill="#f0fbf4" stroke="#52b788" stroke-width="4"/>
          <circle cx="120" cy="120" r="68" fill="#ffffff" stroke="#b7e4c7" stroke-width="2"/>
          <circle cx="120" cy="120" r="50" fill="#e8f7ee"/>
          <line x1="20" y1="120" x2="220" y2="120" stroke="#1b4332" stroke-width="1.5" stroke-dasharray="4 4"/>
          <text x="120" y="38" text-anchor="middle" font-size="12" font-weight="700" fill="#2d6a4f">228mm (9-Inch Diameter)</text>
        </svg>
      `
    },
    p3: {
      sku: 'ECL-TRY-5CP-01',
      title: '5-Compartment Heavy Thali Tray with Lid',
      desc: 'Designed for corporate box meals, hospital cafeterias, and multi-dish Indian feasts. Houses rice, rotis, 2 gravies, sweet & salad without spilling.',
      size: '300 x 240 mm',
      depth: '35 mm',
      pack: '250 sets / Carton',
      weight: '38 grams',
      svg: `
        <svg viewBox="0 0 240 240" fill="none">
          <rect x="25" y="45" width="190" height="150" rx="14" fill="#f0fbf4" stroke="#52b788" stroke-width="3"/>
          <rect x="38" y="58" width="70" height="65" rx="6" fill="#ffffff" stroke="#b7e4c7"/>
          <rect x="125" y="58" width="75" height="65" rx="6" fill="#ffffff" stroke="#b7e4c7"/>
          <rect x="38" y="135" width="45" height="45" rx="4" fill="#ffffff" stroke="#b7e4c7"/>
          <rect x="95" y="135" width="50" height="45" rx="4" fill="#ffffff" stroke="#b7e4c7"/>
          <rect x="155" y="135" width="45" height="45" rx="4" fill="#ffffff" stroke="#b7e4c7"/>
          <text x="120" y="35" text-anchor="middle" font-size="12" font-weight="700" fill="#2d6a4f">300mm x 240mm Thali</text>
        </svg>
      `
    },
    p4: {
      sku: 'ECL-CLM-750',
      title: '750ml Clamshell Hinged Food Box',
      desc: 'Dual interlocking tab latch prevents motorcycle delivery spills. Natural breathable plant micro-pores allow steam venting without liquid leakage.',
      size: '150 x 150 mm',
      depth: '75 mm (Closed)',
      pack: '500 pcs / Carton',
      weight: '28 grams',
      svg: `
        <svg viewBox="0 0 240 240" fill="none">
          <rect x="45" y="55" width="150" height="130" rx="18" fill="#f0fbf4" stroke="#52b788" stroke-width="3.5"/>
          <line x1="45" y1="120" x2="195" y2="120" stroke="#74c69d" stroke-width="2" stroke-dasharray="4 4"/>
          <rect x="105" y="170" width="30" height="16" rx="4" fill="#52b788"/>
          <text x="120" y="40" text-anchor="middle" font-size="12" font-weight="700" fill="#2d6a4f">150x150mm • 750ml</text>
        </svg>
      `
    },
    p5: {
      sku: 'ECL-BWL-250',
      title: '250ml Round Gravy & Soup Bowl',
      desc: 'Withstands boiling hot sambar, curries, and soups with zero chemical smell or softening. Fits snug leak-proof lids for safe takeaway delivery.',
      size: '115 mm Top Dia',
      depth: '45 mm',
      pack: '6,000 pcs / Carton',
      weight: '11 grams',
      svg: `
        <svg viewBox="0 0 240 240" fill="none">
          <ellipse cx="120" cy="100" rx="75" ry="36" fill="#ffffff" stroke="#52b788" stroke-width="3"/>
          <ellipse cx="120" cy="96" rx="60" ry="24" fill="#f0fbf4"/>
          <path d="M55 102 C65 170 175 170 185 102" fill="#e8f7ee" stroke="#52b788" stroke-width="3"/>
          <text x="120" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#2d6a4f">115mm Dia • 250ml</text>
        </svg>
      `
    }
  };

  const dimBtns = document.querySelectorAll('.dim-btn');
  const dimDiagram = document.getElementById('dimDiagram');
  const dimTitle = document.getElementById('dimTitle');
  const dimDesc = document.getElementById('dimDesc');
  const dimSize = document.getElementById('dimSize');
  const dimDepth = document.getElementById('dimDepth');
  const dimPack = document.getElementById('dimPack');
  const dimWeight = document.getElementById('dimWeight');
  const dimBadge = document.querySelector('.dim-badge');

  dimBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dimBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.dataset.dim;
      const data = dimensionData[key];
      if (!data) return;

      if (dimDiagram) dimDiagram.innerHTML = data.svg;
      if (dimTitle) dimTitle.textContent = data.title;
      if (dimDesc) dimDesc.textContent = data.desc;
      if (dimSize) dimSize.textContent = data.size;
      if (dimDepth) dimDepth.textContent = data.depth;
      if (dimPack) dimPack.textContent = data.pack;
      if (dimWeight) dimWeight.textContent = data.weight;
      if (dimBadge) dimBadge.textContent = 'Selected SKU: ' + data.sku;

      // Update button actions in dimension panel
      const addSampleBtn = document.querySelector('.dim-actions-row .add-sample-btn');
      const quoteBtn = document.querySelector('.dim-actions-row .open-rfq-modal');
      if (addSampleBtn) {
        addSampleBtn.dataset.name = data.title;
        addSampleBtn.dataset.sku = data.sku;
      }
      if (quoteBtn) {
        quoteBtn.dataset.product = data.title;
      }
    });
  });

  // ==========================================
  // 5. CATALOG CATEGORY FILTER TABS
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const catalogCards = document.querySelectorAll('.catalog-product-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.category;
      catalogCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Mega menu sublinks click trigger
  document.querySelectorAll('.mega-sublink').forEach(link => {
    link.addEventListener('click', () => {
      const filter = link.dataset.filter;
      const targetBtn = document.querySelector(`.filter-btn[data-category="${filter}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });

  // ==========================================
  // 6. FREE SAMPLE EVALUATION KIT CART DRAWER
  // ==========================================
  let sampleCart = [];
  const cartTrigger = document.getElementById('cartTrigger');
  const sidebarSampleBtn = document.getElementById('sidebarSampleBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  const cartItemsList = document.getElementById('cartItemsList');
  const emptyCartMsg = document.getElementById('emptyCartMsg');
  const cartFooter = document.getElementById('cartFooter');
  const cartCount = document.getElementById('cartCount');
  const proceedSampleCheckout = document.getElementById('proceedSampleCheckout');

  function openCartDrawer() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }

  if (cartTrigger) cartTrigger.addEventListener('click', openCartDrawer);
  if (sidebarSampleBtn) sidebarSampleBtn.addEventListener('click', openCartDrawer);
  if (cartClose) cartClose.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

  function updateCartUI() {
    if (cartCount) cartCount.textContent = sampleCart.length;

    if (sampleCart.length === 0) {
      emptyCartMsg.style.display = 'block';
      cartFooter.style.display = 'none';
      cartItemsList.innerHTML = '';
      cartItemsList.appendChild(emptyCartMsg);
    } else {
      emptyCartMsg.style.display = 'none';
      cartFooter.style.display = 'block';
      cartItemsList.innerHTML = '';

      sampleCart.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'sample-item-row';
        row.innerHTML = `
          <div>
            <strong style="display:block; font-size: 0.86rem; color: #1b4332;">${item.name}</strong>
            <small style="font-size: 0.72rem; color: #7a9485;">SKU: ${item.sku} • 1 Evaluation Unit</small>
          </div>
          <button class="remove-sample-btn" data-index="${index}" style="background:none; border:none; color:#dc2626; cursor:pointer; font-size:1.1rem;" title="Remove sample">✕</button>
        `;
        cartItemsList.appendChild(row);
      });

      document.querySelectorAll('.remove-sample-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.index);
          sampleCart.splice(idx, 1);
          updateCartUI();
        });
      });
    }
  }

  // Bind all "+ Sample" buttons
  document.querySelectorAll('.add-sample-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const sku = btn.dataset.sku;

      const exists = sampleCart.some(item => item.sku === sku);
      if (!exists) {
        sampleCart.push({ name, sku });
        updateCartUI();

        const originalText = btn.textContent;
        btn.textContent = '✓ Added';
        btn.style.background = '#2d6a4f';
        btn.style.color = '#ffffff';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 1400);

        openCartDrawer();
      } else {
        openCartDrawer();
      }
    });
  });

  // ==========================================
  // 6.5. BIG SAMPLE CHECKOUT MODAL & LEFT BAR
  // ==========================================
  const sampleCheckoutModal = document.getElementById('sampleCheckoutModal');
  const closeSampleCheckoutModal = document.getElementById('closeSampleCheckoutModal');
  const checkoutSampleList = document.getElementById('checkoutSampleList');
  const expressSampleForm = document.getElementById('expressSampleForm');
  const checkoutSuccessView = document.getElementById('checkoutSuccessView');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const leftSampleBtn = document.getElementById('leftSampleBtn');
  const leftBadgeCount = document.getElementById('leftBadgeCount');
  const leftCatalogBtn = document.getElementById('leftCatalogBtn');

  function openBigSampleCheckoutModal() {
    if (!sampleCheckoutModal) return;
    
    // Populate items
    if (checkoutSampleList) {
      checkoutSampleList.innerHTML = '';
      const itemsToDisplay = sampleCart.length > 0 ? sampleCart : [
        { name: '10-Inch 3-Compartment Round Plate', sku: 'ECL-PLT-3CP-10' },
        { name: '5-Compartment Heavy Thali Tray with Lid', sku: 'ECL-TRY-5CP-01' },
        { name: '750ml Clamshell Hinged Food Box', sku: 'ECL-CLM-750' },
        { name: '250ml Round Gravy & Soup Bowl', sku: 'ECL-BWL-250' }
      ];

      itemsToDisplay.forEach(item => {
        const div = document.createElement('div');
        div.style.cssText = 'display:flex; justify-content:space-between; align-items:center; background:#ffffff; border:1px solid #b7e4c7; padding:10px 14px; border-radius:10px;';
        div.innerHTML = `
          <div>
            <div style="font-weight:700; font-size:0.88rem; color:#1b4332;">${item.name}</div>
            <div style="font-size:0.75rem; color:#52b788; font-weight:600;">SKU: ${item.sku} • 1 Test Unit</div>
          </div>
          <span style="font-size:0.75rem; font-weight:800; color:#2d6a4f; background:#e8f7ee; padding:3px 8px; border-radius:12px;">FREE</span>
        `;
        checkoutSampleList.appendChild(div);
      });
    }

    if (expressSampleForm) expressSampleForm.style.display = 'flex';
    if (checkoutSuccessView) checkoutSuccessView.style.display = 'none';
    sampleCheckoutModal.classList.add('open');
  }

  function closeBigSampleCheckoutModal() {
    if (sampleCheckoutModal) sampleCheckoutModal.classList.remove('open');
  }

  if (proceedSampleCheckout) {
    proceedSampleCheckout.addEventListener('click', () => {
      closeCartDrawer();
      openBigSampleCheckoutModal();
    });
  }

  if (leftSampleBtn) {
    leftSampleBtn.addEventListener('click', openBigSampleCheckoutModal);
  }

  if (closeSampleCheckoutModal) {
    closeSampleCheckoutModal.addEventListener('click', closeBigSampleCheckoutModal);
  }

  if (sampleCheckoutModal) {
    sampleCheckoutModal.addEventListener('click', (e) => {
      if (e.target === sampleCheckoutModal) closeBigSampleCheckoutModal();
    });
  }

  if (expressSampleForm) {
    expressSampleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = expressSampleForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<span>Booking Express Dispatch...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        expressSampleForm.style.display = 'none';
        if (checkoutSuccessView) checkoutSuccessView.style.display = 'block';
        submitBtn.innerHTML = '<span>Confirm & Dispatch Free Sample Kit →</span>';
        submitBtn.disabled = false;
        // Clear cart
        sampleCart = [];
        updateCartUI();
        if (leftBadgeCount) leftBadgeCount.textContent = '0';
      }, 800);
    });
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
      closeBigSampleCheckoutModal();
    });
  }

  if (leftCatalogBtn) {
    leftCatalogBtn.addEventListener('click', () => {
      alert('📄 Ecolates 2026 Master Wholesale Catalog & Rate Card (PDF) initiated. Opening document preview...');
      window.open('https://www.ecolates.com/', '_blank');
    });
  }

  // Update leftBadgeCount when cart updates
  const originalUpdateCartUI = updateCartUI;
  updateCartUI = function() {
    originalUpdateCartUI();
    if (leftBadgeCount) leftBadgeCount.textContent = sampleCart.length;
  };

  // ==========================================
  // 7. INTERACTIVE LAB STRESS TESTING SWITCHER
  // ==========================================
  const labData = {
    curry: {
      heading: 'Hot Gravy & Curry Immersion (120°C)',
      status: '✓ 100% Zero Leakage Passed',
      temp: '120°C Hot Oil Resistant',
      desc: 'Tested with boiling sambar, butter chicken gravy, and oil-rich curries for 4 continuous hours. The natural interwoven sugarcane fibers create an impermeable barrier that stops oil penetration and prevents bottom sogginess.',
      points: [
        'Water Resistance: > 4 Hours without softening',
        'Oil Resistance: Zero grease seepage or staining',
        'Chemical Leaching: 0.00% (Certified by CIPET)'
      ],
      svg: `
        <svg viewBox="0 0 280 200" fill="none" class="lab-svg-graphic">
          <ellipse cx="140" cy="150" rx="100" ry="25" fill="#52b788" fill-opacity="0.18"/>
          <circle cx="140" cy="100" r="70" fill="#ffffff" stroke="#c3e6cb" stroke-width="3"/>
          <circle cx="140" cy="100" r="55" fill="#f0fbf4"/>
          <circle cx="140" cy="100" r="42" fill="#e76f51" fill-opacity="0.25"/>
          <path d="M125 75 Q140 60 155 75 Q170 90 140 120 Q110 90 125 75Z" fill="#e76f51"/>
          <path d="M120 45 Q125 35 120 25" stroke="#52b788" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M140 40 Q145 30 140 20" stroke="#52b788" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M160 45 Q165 35 160 25" stroke="#52b788" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      `
    },
    microwave: {
      heading: 'Microwave & Oven Reheating Stability',
      status: '✓ Zero Warping or Fumes',
      temp: '-20°C to 120°C Safe',
      desc: 'Reheated in commercial 1000W microwaves for up to 25 minutes. Unlike plastic and styrofoam which melt or release toxic styrene gases, pure sugarcane pulp remains sturdy, odorless, and completely food-safe.',
      points: [
        'Microwave Safe: Up to 120°C for 25 mins',
        'Freezer Safe: Down to -20°C without cracking',
        'Toxic Fumes / VOCs: 0% emitted'
      ],
      svg: `
        <svg viewBox="0 0 280 200" fill="none" class="lab-svg-graphic">
          <rect x="50" y="30" width="180" height="130" rx="14" fill="#ffffff" stroke="#52b788" stroke-width="3"/>
          <rect x="65" y="45" width="115" height="100" rx="8" fill="#e8f7ee"/>
          <circle cx="205" cy="70" r="14" fill="#d8f3dc"/>
          <line x1="205" y1="95" x2="205" y2="125" stroke="#2d6a4f" stroke-width="2.5"/>
          <ellipse cx="122" cy="110" rx="35" ry="12" fill="#ffffff" stroke="#b7e4c7" stroke-width="2"/>
          <path d="M110 80 Q122 70 135 80" stroke="#52b788" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    },
    delivery: {
      heading: '45-Min Motorcycle Delivery Shake & Spill Test',
      status: '✓ Dual-Lock Anti-Spill Confirmed',
      temp: 'Zero Delivery Leakage',
      desc: 'Tested on active 15km delivery routes over uneven roads and speed breakers. Our clamshell dual-tab latch and precision tray snap rims keep gravies securely contained with zero lid pop-offs.',
      points: [
        'Vibration Tolerance: Dual interlocking secure tabs',
        'Ventilation: Natural breathability stops soggy fries',
        'Drop Test: Survives 1-meter kitchen floor drop'
      ],
      svg: `
        <svg viewBox="0 0 280 200" fill="none" class="lab-svg-graphic">
          <rect x="70" y="55" width="140" height="95" rx="16" fill="#ffffff" stroke="#52b788" stroke-width="3"/>
          <line x1="70" y1="100" x2="210" y2="100" stroke="#74c69d" stroke-dasharray="3 3"/>
          <rect x="125" y="130" width="30" height="16" rx="4" fill="#2d6a4f"/>
          <path d="M40 70 Q50 65 40 60" stroke="#52b788" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M35 100 Q45 95 35 90" stroke="#52b788" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M40 130 Q50 125 40 120" stroke="#52b788" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      `
    },
    compost: {
      heading: '90-Day Natural Soil Composting Cycle',
      status: '✓ ASTM D6400 Certified',
      temp: '100% Home & Industrial Compostable',
      desc: 'Degradation starts within 30 days and completes within 60 to 90 days in normal soil or compost piles. Turns 100% into rich organic humus fertilizer, releasing zero microplastics or toxic residues into the earth.',
      points: [
        'Home Compostable: 60 - 90 Days in natural soil',
        'Industrial Compostable: Certified under ASTM D6868',
        'Soil Enrichment: Leaves nutrient-rich organic humus'
      ],
      svg: `
        <svg viewBox="0 0 280 200" fill="none" class="lab-svg-graphic">
          <ellipse cx="140" cy="155" rx="110" ry="25" fill="#52b788" fill-opacity="0.2"/>
          <path d="M50 155 Q140 100 230 155 Z" fill="#7f5539" fill-opacity="0.25"/>
          <path d="M140 130 V75" stroke="#2d6a4f" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M140 95 C120 75 105 90 140 110" fill="#52b788"/>
          <path d="M140 85 C160 65 175 80 140 100" fill="#74c69d"/>
        </svg>
      `
    }
  };

  const labTabBtns = document.querySelectorAll('.lab-tab-btn');
  const labIllustration = document.getElementById('labIllustration');
  const labTestHeading = document.getElementById('labTestHeading');
  const labTestDesc = document.getElementById('labTestDesc');
  const labTextCol = document.getElementById('labTextCol');

  labTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      labTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const testKey = btn.dataset.test;
      const data = labData[testKey];
      if (!data) return;

      if (labIllustration) labIllustration.innerHTML = data.svg;
      if (labTestHeading) labTestHeading.textContent = data.heading;
      if (labTestDesc) labTestDesc.textContent = data.desc;

      const statusEl = labTextCol.querySelector('.status-pill');
      const tempEl = labTextCol.querySelector('.temp-badge');
      const pointsEl = labTextCol.querySelector('.lab-spec-points');

      if (statusEl) statusEl.textContent = data.status;
      if (tempEl) tempEl.textContent = data.temp;
      if (pointsEl) {
        pointsEl.innerHTML = data.points.map(p => `<div><strong>${p.split(':')[0]}:</strong> ${p.split(':')[1]}</div>`).join('');
      }
    });
  });

  // ==========================================
  // 8. LIVE ECO-IMPACT CALCULATOR
  // ==========================================
  const orderSlider = document.getElementById('orderSlider');
  const calcSliderVal = document.getElementById('calcSliderVal');
  const plasticSavedEl = document.getElementById('plasticSaved');
  const co2OffsetEl = document.getElementById('co2Offset');
  const compostYieldEl = document.getElementById('compostYield');

  if (orderSlider) {
    orderSlider.addEventListener('input', (e) => {
      const units = parseInt(e.target.value);
      if (calcSliderVal) calcSliderVal.textContent = units.toLocaleString() + ' units';

      const plasticKg = Math.round(units * 0.025);
      const co2Kg = Math.round(units * 0.06);
      const compostKg = Math.round(units * 0.035);

      if (plasticSavedEl) plasticSavedEl.textContent = plasticKg.toLocaleString() + ' kg';
      if (co2OffsetEl) co2OffsetEl.textContent = co2Kg.toLocaleString() + ' kg';
      if (compostYieldEl) compostYieldEl.textContent = compostKg.toLocaleString() + ' kg';
    });
  }

  // ==========================================
  // 9. QUICK SPECS MODAL
  // ==========================================
  const quickViewModal = document.getElementById('quickViewModal');
  const closeQuickView = document.getElementById('closeQuickView');
  const modalProductDetails = document.getElementById('modalProductDetails');

  document.querySelectorAll('.quick-view-btn, .quick-view-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const data = productDatabase[id];
      if (!data) return;

      modalProductDetails.innerHTML = `
        <div style="background: #eef9f2; border: 1.5px solid #b7e4c7; border-radius: 16px; padding: 30px; display: flex; align-items: center; justify-content: center;">
          <div style="font-size: 5rem;">🍽️</div>
        </div>
        <div>
          <span style="font-size: 0.72rem; font-weight: 700; color: #52b788; text-transform: uppercase;">${data.category}</span>
          <h2 style="font-size: 1.45rem; margin: 4px 0 8px; color: #1b4332;">${data.title}</h2>
          <div style="font-size: 0.8rem; color: #7a9485; margin-bottom: 12px;">SKU: ${data.sku} • Standard MOQ: ${data.moq}</div>
          <div style="font-size: 1.35rem; font-weight: 800; color: #2d6a4f; margin-bottom: 14px;">
            ${data.price} <small style="font-size: 0.78rem; font-weight: 500; color: #486153;">/ unit (Wholesale Tier 1)</small>
          </div>
          <div style="font-size: 0.85rem; color: #486153; margin-bottom: 12px;"><strong>Specifications:</strong> ${data.specs}</div>
          <ul style="margin: 0 0 20px 18px; font-size: 0.82rem; color: #182a20; line-height: 1.55;">
            ${data.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary-green" onclick="window.requestSpecificQuote('${data.title}')">
              Request Wholesale Quote
            </button>
            <button class="btn btn-light-green-outline" onclick="window.addSampleDirectly('${data.title}', '${data.sku}')">
              + Free Sample
            </button>
          </div>
        </div>
      `;

      quickViewModal.classList.add('open');
    });
  });

  if (closeQuickView) {
    closeQuickView.addEventListener('click', () => {
      quickViewModal.classList.remove('open');
    });
  }

  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) {
        quickViewModal.classList.remove('open');
      }
    });
  }

  window.requestSpecificQuote = (title) => {
    quickViewModal.classList.remove('open');
    const rfq = document.getElementById('bulkEnquiry');
    if (rfq) {
      rfq.scrollIntoView({ behavior: 'smooth' });
      const notes = document.getElementById('notes');
      if (notes) notes.value = `Looking for wholesale factory quote on: ${title}.`;
    }
  };

  window.addSampleDirectly = (name, sku) => {
    const exists = sampleCart.some(item => item.sku === sku);
    if (!exists) {
      sampleCart.push({ name, sku });
      updateCartUI();
    }
    quickViewModal.classList.remove('open');
    openCartDrawer();
  };

  // Open RFQ modal from product buttons
  document.querySelectorAll('.open-rfq-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const prodName = btn.dataset.product;
      const rfq = document.getElementById('bulkEnquiry');
      if (rfq) {
        rfq.scrollIntoView({ behavior: 'smooth' });
        const notes = document.getElementById('notes');
        if (notes) notes.value = `Requesting wholesale quotation for: ${prodName}.`;
      }
    });
  });

  // ==========================================
  // 10. FAQS ACCORDION
  // ==========================================
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-question-btn');
    btn.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      faqCards.forEach(c => c.classList.remove('active'));
      if (!isActive) {
        card.classList.add('active');
      }
    });
  });

  // ==========================================
  // 11. B2B RFQ FORM SUBMISSION
  // ==========================================
  const rfqForm = document.getElementById('rfqForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = rfqForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<span>Processing RFQ...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        rfqForm.style.display = 'none';
        formSuccessMessage.style.display = 'block';
      }, 700);
    });
  }

  // Back to Top button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile navigation menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navTier = document.querySelector('.header-nav-tier');
  if (mobileMenuToggle && navTier) {
    mobileMenuToggle.addEventListener('click', () => {
      if (navTier.style.display === 'block') {
        navTier.style.display = '';
      } else {
        navTier.style.display = 'block';
        navTier.style.padding = '14px';
        const navList = navTier.querySelector('.clean-nav-list');
        if (navList) {
          navList.style.flexDirection = 'column';
          navList.style.alignItems = 'flex-start';
          navList.style.gap = '10px';
        }
      }
    });
  }

  // ==========================================
  // 12. 360° CAM STUDIO ANGLE CONTROLS
  // ==========================================
  const camAngleBtns = document.querySelectorAll('.cam-angle-btn');
  const camModelCanvas = document.getElementById('camModelCanvas');
  const camAddSampleBtn = document.getElementById('camAddSampleBtn');

  if (camAngleBtns && camModelCanvas) {
    camAngleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        camAngleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const angle = btn.dataset.angle;
        camModelCanvas.className = 'cam-model-canvas angle-' + angle;
      });
    });
  }

  if (camAddSampleBtn) {
    camAddSampleBtn.addEventListener('click', () => {
      window.addSampleDirectly('10-Inch 3-Compartment Round Plate', 'ECL-PLT-3CP-10');
      openBigSampleCheckoutModal();
    });
  }

});
