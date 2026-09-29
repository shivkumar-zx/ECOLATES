import React from 'react';

export const metadata = {
  title: 'About Us | India’s Premier Sugarcane Bagasse Tableware Manufacturer | Ecolates',
  description: 'Learn about Ecolates, our leadership team, our high-capacity eco tableware manufacturing facilities, and our mission to replace single-use plastics with pure sugarcane agro-waste tableware.',
  keywords: 'about ecolates, sugarcane tableware factory, bagasse manufacturers india, eco friendly disposable plates'
};

export default function AboutPage() {
  const leadership = [
    {
      name: 'Sanjay Lakhani & Nayan Lakhani',
      role: 'Founders & Directors',
      image: 'https://www.ecolates.com/wp-content/uploads/2022/12/sanjay-lakhani.jpeg',
      bio: 'Pioneered Ecolates with a vision to build a circular economy for agro-waste by transforming sugarcane bagasse into high-performance commercial tableware.'
    },
    {
      name: 'Animesh Patel',
      role: 'Head of Operations & Supply Chain',
      image: 'https://www.ecolates.com/wp-content/uploads/2023/04/Ecolates_animesh-patel.jpg',
      bio: 'Oversees large-scale production, precision mold tooling, quality engineering, and pan-India dispatch logistics.'
    },
    {
      name: 'Rishit Lakhani',
      role: 'Business Development & Global Trade',
      image: 'https://www.ecolates.com/wp-content/uploads/2023/04/Ecolates-rishit_lakhani.jpg',
      bio: 'Drives international distribution partnerships across Middle East, Europe, and North America for certified compostable packaging.'
    },
    {
      name: 'Dipak Patel',
      role: 'Plant Engineering & Technical Quality',
      image: 'https://www.ecolates.com/wp-content/uploads/2023/04/Dipak-patel.jpeg.jpg',
      bio: 'Manages hydraulic pressing lines, heat resistance formulations, and laboratory food safety compliance.'
    }
  ];

  return (
    <div style={{ padding: '36px 0 80px' }}>
      <div className="container">
        
        {/* Hero Banner */}
        <div style={{ background: '#f0fbf4', border: '1.5px solid #b7e4c7', borderRadius: '28px', padding: '48px', marginBottom: '48px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
            <span className="light-green-tag">About Ecolates India</span>
            <h1 style={{ fontSize: '2.8rem', color: '#1b4332', margin: '12px 0 16px', lineHeight: '1.2' }}>
              Transforming Agricultural Waste into High-Performance Commercial Tableware
            </h1>
            <p style={{ color: '#486153', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '24px' }}>
              Ecolates was founded by food service industry veterans in India and abroad with a simple conviction: commercial dining should never cost the Earth. We manufacture 100% biodegradable and home-compostable sugarcane bagasse tableware at industrial scale.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="/products" className="btn btn-primary-green btn-lg">Explore Full Catalog →</a>
              <a href="/certifications" className="btn btn-light-green-outline btn-lg" style={{ background: '#fff' }}>View Lab Certifications</a>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '56px' }}>
          <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 16px rgba(45, 106, 79, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e8f7ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '14px' }}>
              🌱
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#1b4332', marginBottom: '8px' }}>100% Biodegradable</h3>
            <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Made from pure sugarcane stalk fiber that breaks down into nutrient-rich compost in 60-90 days. Zero microplastics.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 16px rgba(45, 106, 79, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e8f7ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '14px' }}>
              🚫
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#1b4332', marginBottom: '8px' }}>0% Single-Use Plastic</h3>
            <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Replaces polystyrene foam (thermocol) and toxic plastic liners with renewable, natural plant polymer barriers.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 16px rgba(45, 106, 79, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e8f7ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '14px' }}>
              🏭
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#1b4332', marginBottom: '8px' }}>Never Under-Stocked!</h3>
            <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Over 500,000 pieces maintained across central warehouses in India. Ready for same-day fleet or ocean container loading.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '18px', padding: '24px', boxShadow: '0 4px 16px rgba(45, 106, 79, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e8f7ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '14px' }}>
              🛡️
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#1b4332', marginBottom: '8px' }}>Zero PFAS Leaching</h3>
            <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Independently verified in international testing laboratories. Free from endocrine-disrupting chemicals and toxic bleaches.
            </p>
          </div>
        </div>

        {/* Manufacturing & Plant Capabilities */}
        <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '24px', padding: '40px', marginBottom: '56px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <span className="light-green-tag">Advanced Manufacturing Hub</span>
            <h2 style={{ fontSize: '2.1rem', color: '#1b4332', margin: '8px 0 16px' }}>
              Engineered with 300-Ton Hydraulic Compression
            </h2>
            <p style={{ color: '#486153', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '16px' }}>
              Unlike fragile paper plates or thin plastic clamshells, our tableware is manufactured using high-pressure thermocompression tooling. This gives our plates, meal trays, and soup bowls unmatched structural firmness.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: '#1b4332' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#52b788', fontWeight: 'bold' }}>✓</span> <strong>Microwave Tolerant:</strong> Reheat food up to 120°C without melting or off-flavors.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#52b788', fontWeight: 'bold' }}>✓</span> <strong>Freezer Proof:</strong> Withstands deep chillers at -20°C without brittleness.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#52b788', fontWeight: 'bold' }}>✓</span> <strong>Hot Oil & Gravy Resistant:</strong> Tested with boiling curries, gravies, and oils for over 4 hours.
              </li>
            </ul>
          </div>

          <div style={{ textAlign: 'center', background: '#f7faf8', borderRadius: '20px', padding: '24px', border: '1px solid #b7e4c7' }}>
            <img 
              src="https://www.ecolates.com/wp-content/uploads/2022/12/planet-help-1024x535.png" 
              alt="How our products help the planet" 
              style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
            />
          </div>
        </div>

        {/* Leadership Team */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="light-green-tag">Leadership & Vision</span>
            <h2 style={{ fontSize: '2.2rem', color: '#1b4332', margin: '8px 0 8px' }}>The People Behind Ecolates</h2>
            <p style={{ color: '#486153', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              Decades of culinary, industrial manufacturing, and global trade experience dedicated to clean tableware solutions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {leadership.map((leader, idx) => (
              <div key={idx} style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(45, 106, 79, 0.05)', textAlign: 'center' }}>
                <div style={{ height: '240px', background: '#f7faf8', overflow: 'hidden' }}>
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                  />
                </div>
                <div style={{ padding: '20px' }}>
                  <h4 style={{ fontSize: '1.15rem', color: '#1b4332', marginBottom: '4px' }}>{leader.name}</h4>
                  <span style={{ fontSize: '0.78rem', color: '#2d6a4f', fontWeight: 700, display: 'block', marginBottom: '10px' }}>{leader.role}</span>
                  <p style={{ fontSize: '0.82rem', color: '#486153', lineHeight: '1.5' }}>{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
