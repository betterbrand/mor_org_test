import { type Metadata } from 'next'

const APP_NAME = 'Morpheus'
const APP_DEFAULT_TITLE = 'Morpheus'
const APP_DESCRIPTION =
  'Morpheus is designed to incentivize the first open-source peer-to-peer network of personal general-purpose AI, powered by the MOR token.'
const APP_TITLE_TEMPLATE = '%s - Morpheus'
const OG_IMAGE_URL = new URL('https://mor.org/og-image.png')
const TWITTER_OG_IMAGE_URL = new URL('https://mor.org/og-image.png')
const APP_URL = new URL('https://mor.org')

type MetadataParams = {
  title?: string | undefined
  description?: string | undefined
  ogImageUrl?: string | undefined
  robots?: string | undefined
}

export const pageMetadata = ({
  title,
  description,
  ogImageUrl,
  robots,
}: MetadataParams): Metadata => ({
  applicationName: APP_NAME,
  robots,
  title: {
    default: title || APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: description || APP_DESCRIPTION,
  manifest: '/manifest.json',
  metadataBase: APP_URL,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: title || APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: description || APP_DESCRIPTION,
    images: [
      {
        url: ogImageUrl || OG_IMAGE_URL,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: {
      default: title || APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: description || APP_DESCRIPTION,
    images: [{ url: ogImageUrl || TWITTER_OG_IMAGE_URL }],
  },
})
