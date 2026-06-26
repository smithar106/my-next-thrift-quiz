import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'My Next Thrift — Find Pieces That Feel Like You',
    template: '%s | My Next Thrift',
  },
  description:
    'React to 5 things. We figure out your thrift eye — and find the secondhand pieces that belong to you. Takes under 60 seconds.',
  keywords: [
    'thrift style quiz',
    'what is my thrift aesthetic',
    'thrift archetype quiz',
    'secondhand fashion quiz',
    'what kind of thrifter am i',
    'thrift personality quiz',
    'find my thrift style',
    'thrift fashion identity',
  ],
  openGraph: {
    title: 'My Next Thrift — Find Pieces That Feel Like You',
    description:
      'React to 5 things. We figure out your thrift eye and find the secondhand pieces that belong to you.',
    siteName: 'My Next Thrift',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Next Thrift — Find Pieces That Feel Like You',
    description:
      'React to 5 things. We figure out your thrift eye and find the secondhand pieces that belong to you.',
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
