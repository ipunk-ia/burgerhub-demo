import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Burger Hub | Halal Smash Burgers in Toledo, OH',
  description: 'Smash. Stack. Devour. Halal smash burgers, hand-pressed daily. Best street-food energy on Secor Road, Toledo, Ohio. Order now!',
  keywords: 'halal burgers, smash burgers, Toledo OH food, halal street food, Burger Hub, Secor Road restaurants',
  openGraph: {
    title: 'Burger Hub | Halal Smash Burgers',
    description: 'Smash. Stack. Devour. Halal smash burgers, hand-pressed daily on Secor Road.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Burger Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Burger Hub | Halal Smash Burgers',
    description: 'Smash. Stack. Devour. Halal smash burgers, hand-pressed daily on Secor Road.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // LocalBusiness Schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Burger Hub",
    "image": "https://example.com/burger-hub-logo.jpg",
    "description": "Halal smash burgers, hand-pressed daily. Bold, appetite-driven, street-food energy.",
    "servesCuisine": "Burgers, American, Halal",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Secor Road",
      "addressLocality": "Toledo",
      "addressRegion": "OH",
      "addressCountry": "US"
    },
    "telephone": "+1-555-0198",
    "url": "https://burgerhubtoledo.com",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "11:00",
        "closes": "22:00"
      }
    ]
  };

  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable} ${dmMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-[#0F0F0F] text-[#F5F0E8] font-sans antialiased overflow-x-hidden">
        {/* Grain overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        {children}
      </body>
    </html>
  );
}
