import './globals.css'

import { ColorModeScript } from '@chakra-ui/react'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'

import { Providers } from './providers'
import { config } from './theme'

const inter = Inter({ subsets: ['latin'] })

const TITLE = 'Morpheus'
const DESCRIPTION =
  'Morpheus is designed to incentivize the first open-source peer-to-peer network of personal general-purpose AI, powered by the MOR token.'
const APP_TITLE_TEMPLATE = '%s - Morpheus'
const OG_IMAGE_URL = new URL('https://mor.org/og-image.png')
const APP_URL = new URL('https://mor.org')

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: APP_URL,
  openGraph: {
    type: 'website',
    title: {
      default: TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: {
      default: TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ColorModeScript initialColorMode={config.initialColorMode} />
        <GoogleAnalytics gaId='G-ZYG4SQYXW9' />
        <Suspense>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  )
}
