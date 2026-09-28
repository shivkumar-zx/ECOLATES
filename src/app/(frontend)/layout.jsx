import '@/app/globals.css';
import ClientLayoutShell from '@/components/ClientLayoutShell';
import siteConfig from '@/data/site-config.json';

export const metadata = {
  title: siteConfig.seo.home.title,
  description: siteConfig.seo.home.description,
  keywords: siteConfig.seo.home.keywords,
  openGraph: {
    title: siteConfig.seo.home.title,
    description: siteConfig.seo.home.description,
    images: [{ url: siteConfig.seo.home.ogImage }],
  },
  icons: {
    icon: 'https://www.ecolates.com/wp-content/uploads/2022/12/cropped-ecolates-favicon-32x32.png',
  }
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
