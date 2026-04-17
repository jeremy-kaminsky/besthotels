import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default: 'Best Hotels', template: '%s — Best Hotels' },
  description: 'Discover the world\'s most extraordinary hotels and resorts through firsthand photography, drone footage, and editorial reviews.',
  metadataBase: new URL('https://explorebesthotels.com'),
  openGraph: {
    siteName: 'Best Hotels',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
