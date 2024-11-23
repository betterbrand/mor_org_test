import * as contentful from 'contentful'

const isPreview = process.env.VERCEL_ENV === 'preview'
const accessToken = isPreview
  ? process.env.NEXT_PUBLIC_PREVIEW_CONTENTFUL_TOKEN
  : process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN

const contentfulClient = contentful.createClient({
  accessToken: accessToken || '',
  host: isPreview ? 'preview.contentful.com' : undefined,
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
})

export default contentfulClient
