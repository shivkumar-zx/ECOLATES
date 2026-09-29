import React from 'react';

export const metadata = {
  title: 'Lab Certifications & Compliance Reports | Ecolates',
  description: 'Download verified lab test reports and quality certificates for Ecolates sugarcane tableware including ISO 22000:2018, PFAS-free test results, leak & strength reports, and food contact safety.',
  keywords: 'ecolates certifications, pfas free tableware, iso 22000 certificate, compostable food container lab reports'
};

export default function CertificationsPage() {
  const certs = [
    {
      title: 'ISO 22000:2018 FSMS Certificate',
      subtitle: 'Food Safety Management System Standards',
      authority: 'Assurance Quality Certification LLC',
      scope: 'Manufacturing, packaging, and export of biodegradable sugarcane bagasse tableware.',
      image: 'https://www.ecolates.com/wp-content/webp-express/webp-images/uploads/2024/05/Ecolates-ISO-22000-2018-Certificate-724x1024.jpg.webp',
      pdfLink: 'https://www.ecolates.com/wp-content/uploads/2024/05/Ecolates-ISO-22000-2018-Certificate-.pdf',
      status: 'Active & Verified',
      date: 'Valid till 2027'
    },
    {
      title: 'PFAS-Free Lab Verification (2024)',
      subtitle: 'Zero Organic Fluorine & Harmful Forever Chemicals',
      authority: 'Accredited Chemical Testing Laboratory',
      scope: 'Verified < 50 ppm total fluorine, complying with US EPA & European Reach regulations for food contact.',
      image: 'https://www.ecolates.com/wp-content/webp-express/webp-images/uploads/2024/05/Ecolates-PFAS-Free-Test-Report-2024-724x1024.jpg.webp',
      pdfLink: 'https://www.ecolates.com/wp-content/uploads/2024/05/Ecolates-PFAS-Free-Test-Report-2024.pdf',
      status: 'Zero PFAS Certified',
      date: 'Tested 2024'
    },
    {
      title: 'Hot Oil & Liquid Leak Strength Report (2024)',
      subtitle: 'Grease Resistance & Boiling Temperature Endurance',
      authority: 'Standard Food Container Strength Testing',
      scope: 'Withstands boiling soup (100°C) and hot culinary oils (120°C) for over 4 hours with 0 leak-through.',
      image: 'https://www.ecolates.com/wp-content/webp-express/webp-images/uploads/2024/05/Ecolates-Leak-and-Strength-Test-Report-2024-724x1024.jpg.webp',
      pdfLink: 'https://www.ecolates.com/wp-content/uploads/2024/05/Ecolates-Leak-and-Strength-Test-Report-2024.pdf',
      status: 'Passed All Tiers',
      date: 'Tested 2024'
    },
    {
      title: 'FSMS 1st Surveillance Audit Certificate',
      subtitle: 'International Standards Food Safety Hygiene Audit',
      authority: 'Accredited Board of Conformity',
      scope: 'Comprehensive audit of manufacturing facility hygiene, water filtration, and clean-room handling.',
      image: 'https://www.ecolates.com/wp-content/webp-express/webp-images/uploads/2024/09/ECOLATES-INDIA-PRIVATE-LIMITED-SCAN-COPY-1_page-0001.jpg.webp',
      pdfLink: 'https://www.ecolates.com/wp-content/uploads/2024/09/ECOLATES-INDIA-PRIVATE-LIMITED-1st-SURVEILLANCE-FSMS-1.pdf',
      status: 'Conforming Grade A',
      date: 'Audited 2024'
    }
  ];

  return (
    <div style={{ padding: '36px 0 80px' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <span className="light-green-tag">Lab Verified Compliance</span>
          <h1 style={{ fontSize: '2.6rem', color: '#1b4332', margin: '12px 0 14px' }}>
            Official Lab Test Reports & Quality Certifications
          </h1>
          <p style={{ color: '#486153', fontSize: '1.05rem', lineHeight: '1.6' }}>
            We guarantee 100% transparency. Download authentic PDF lab test reports, chemical analysis documents, and international manufacturing certifications for your compliance records.
          </p>
        </div>

        {/* 4 Big Certificate Cards */}
        <div className="grid-2-responsive" style={{ marginBottom: '60px' }}>
          {certs.map((c, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: '#ffffff', 
                border: '1.5px solid #ddecde', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                boxShadow: '0 8px 30px rgba(45, 106, 79, 0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image Preview */}
              <div style={{ background: '#f7faf8', padding: '24px', textAlign: 'center', borderBottom: '1.5px solid #ddecde' }}>
                <a href={c.pdfLink} target="_blank" rel="noopener noreferrer" title="Click to view full certificate PDF">
                  <img 
                    src={c.image} 
                    alt={c.title} 
                    style={{ maxHeight: '340px', maxWidth: '100%', margin: '0 auto', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', objectFit: 'contain' }}
                  />
                </a>
              </div>

              {/* Card Body */}
              <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.74rem', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', border: '1px solid #86efac' }}>
                    ✓ {c.status}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#7a9485', fontWeight: 600 }}>{c.date}</span>
                </div>

                <h3 style={{ fontSize: '1.35rem', color: '#1b4332', margin: '4px 0 6px' }}>{c.title}</h3>
                <span style={{ fontSize: '0.85rem', color: '#2d6a4f', fontWeight: 700, display: 'block', marginBottom: '10px' }}>{c.subtitle}</span>
                
                <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '14px', flexGrow: 1 }}>
                  {c.scope}
                </p>

                <div style={{ fontSize: '0.8rem', color: '#7a9485', marginBottom: '16px' }}>
                  <strong>Audited By:</strong> {c.authority}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <a 
                    href={c.pdfLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary-green"
                    style={{ flexGrow: 1, justifyContent: 'center' }}
                  >
                    Download Official PDF Report
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Compliance Summary Strip */}
        <div style={{ background: '#f0fbf4', border: '1.5px solid #b7e4c7', borderRadius: '24px', padding: '36px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.6rem', color: '#1b4332', marginBottom: '12px' }}>
            Export Compliant for Middle East, Europe & Americas
          </h3>
          <p style={{ color: '#486153', maxWidth: '700px', margin: '0 auto 20px', fontSize: '0.96rem' }}>
            We provide full documentation packs including Phytosanitary Certificates, Certificates of Origin, Bill of Lading, and Material Safety Data Sheets (MSDS) for ocean freight containers.
          </p>
          <a href="/#bulkEnquiry" className="btn btn-primary-green btn-lg">
            Request Export Documentation & FCL Quote
          </a>
        </div>

      </div>
    </div>
  );
}
