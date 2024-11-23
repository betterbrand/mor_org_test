import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import type * as contentful from 'contentful'
import moment from 'moment'

import { ContentfulBody } from '../contentful/ContentfulBody'
import { FeaturedPressArticle } from './featured-press-article'
import { PressArticle } from './press-article'

import type { IPageFields, IPressArticleFields } from '@/@types/generated/contentful'
import { PageContainer } from '@/components/page-container'
import ContentfulClient from '@/lib/contentfulClient'

export type PressArticleSkeleton = contentful.EntrySkeletonType<IPressArticleFields, 'pressArticle'>

async function getData() {
  const entries = await ContentfulClient.getEntries<PressArticleSkeleton>({
    content_type: 'pressArticle',
  })
  return {
    pressItems: entries.items,
  }
}

type PressPageProps = {
  page: IPageFields
}

export const PressPage: React.FC<PressPageProps> = async ({ page }) => {
  const data = await getData()

  const sortedPressItems = data.pressItems.sort((a, b) =>
    moment(b.fields.date).diff(moment(a.fields.date)),
  )

  const featuredPressItems = sortedPressItems.filter(item => item.fields.featured)
  const otherPressItems = sortedPressItems.filter(item => !item.fields.featured)

  return (
    <PageContainer>
      <Stack spacing='10' shouldWrapChildren>
        <Stack alignItems='center' textAlign='center'>
          <Heading as='h1' size='xl'>
            {page.pageName}
          </Heading>
          {page.introduction && (
            <Text color='text.subtle' fontSize={{ base: 'lg', md: 'xl' }}>
              {page.introduction}
            </Text>
          )}
          {page.body && <ContentfulBody body={page.body} />}
        </Stack>
        <Stack spacing={4}>
          {featuredPressItems.map(post => (
            <FeaturedPressArticle key={post.sys.id} item={post} />
          ))}
          <SimpleGrid
            gridGap={4}
            gridTemplateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }}
          >
            {otherPressItems.map(post => (
              <PressArticle key={post.sys.id} item={post} />
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </PageContainer>
  )
}
