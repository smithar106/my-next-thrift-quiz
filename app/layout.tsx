import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Find Your Thrift Archetype — My Next Thrift',
  description:
    'Take the 5-step quiz and discover your thrift identity. Are you an Archive Hunter, a Hidden Gem Collector, or something else entirely?',
  openGraph: {
    title: 'Find Your Thrift Archetype — My Next Thrift',
    description: 'Discover your thrift identity in 5 steps.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0A0A0A] text-white min-h-screen font-[var(--font-inter),system-ui,sans-serif]">
        {children}
      </body>
    </html>
  )
}
