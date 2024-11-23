import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { type IPage, type IPageFields } from '@/@types/generated/contentful'
import { ContentfulBody } from '@/components/contentful/ContentfulBody'
import { RenderSections } from '@/components/contentful/RenderSection'
import { Ecosystem } from '@/components/ecosystem/ecosystem'
import { EventsPage } from '@/components/events/events-page'
import { FaqPage } from '@/components/faq/faq-page'
import { PageContainer } from '@/components/page-container'
import { PageHeader } from '@/components/page-header'
import { PressPage } from '@/components/press/press-page'
import ContentfulClient from '@/lib/contentfulClient'

export async function generateStaticParams() {
  const entries = await ContentfulClient.getEntries({ content_type: 'page', include: 10 })
  const pages = entries.items.map(item => ({
    id: item.fields.slug,
  }))

  return pages
}

async function getPage(params: { id: string }) {
  const entry = await ContentfulClient.getEntries({
    content_type: 'page',
    'fields.slug': params.id,
    include: 10,
  })

  return entry.items[0] as IPage
}

type PageProps = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = (await getPage(params))?.fields as IPageFields | undefined

  if (!page) return {}

  return {
    title: page.pageName,
  }
}

export default async function LegalPage({ params }: PageProps) {
  const page = (await getPage(params))?.fields as IPageFields | undefined

  if (!page) return notFound()

  switch (page.slug) {
    case 'ecosystem':
      return <Ecosystem page={page} />
    case 'faqs':
      return <FaqPage page={page} />
    case 'events':
      return <EventsPage page={page} />
    case 'media':
      return <PressPage page={page} />
    default:
      return (
        <>
          <PageContainer pb={0}>
            <PageHeader {...page} />
            {page.body && <ContentfulBody body={page.body} />}
          </PageContainer>
          {page.sections && <RenderSections sections={page.sections} />}
        </>
      )
  }
}
