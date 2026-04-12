import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import Script from 'next/script'

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID

export const metadata: Metadata = {
  title: {
    default: 'Seed Oil Calculator — What Is Your Inflammation Risk?',
    template: '%s | Seed Oil Calculator',
  },
  description:
    'Find out how much seed oil you are really eating and what your omega-6:omega-3 ratio is. Free calculator based on USDA food data and published nutrition science. Takes 2 minutes.',
  keywords: [
    'seed oil calculator',
    'omega-6 omega-3 ratio calculator',
    'inflammation risk score',
    'how much seed oil am I eating',
    'seed oils and inflammation',
    'omega-6 intake calculator',
    'best cooking oil for inflammation',
    'are seed oils bad',
    'how to reduce seed oils',
  ],
  metadataBase: new URL('https://seedoilcalculator.com'),
  openGraph: {
    type: 'website',
    title: 'What Is Your Inflammation Risk? Free Seed Oil Calculator',
    description:
      'Calculate your omega-6:omega-3 ratio in 2 minutes. Find out if your diet is dangerously imbalanced — and what to do about it.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  verification: {
    google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE',
    other: { 'msvalidate.01': 'REPLACE_WITH_BING_CODE' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafaf9' }}>
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
