import '@/app/globals.css';
import ClientLayoutShell from '@/components/ClientLayoutShell';
import { getPageSeo } from '@/lib/payloadData';

export async function generateMetadata() {
  const seo = await getPageSeo('home');
  return {
    title: {
      template: '%s',
      default: seo.title || 'Ecolates | Sustainable Sugarcane Bagasse Tableware & Food Packaging',
    },
    description:
      seo.description ||
      'Leading manufacturer of 100% biodegradable and compostable sugarcane bagasse plates, bowls, food containers, and meal trays in India. Direct factory wholesale B2B supply.',
    keywords:
      seo.keywords ||
      'bagasse plates, sugarcane tableware manufacturer, biodegradable food containers, compostable bowls, wholesale tableware India',
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: [{ url: seo.ogImage || 'https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg' }],
    },
    icons: {
      icon: 'https://www.ecolates.com/wp-content/uploads/2022/12/cropped-ecolates-favicon-32x32.png',
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function FrontendLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <ClientLayoutShell>
          {children}
        </ClientLayoutShell>
      </body>
    </html>
  );
}
