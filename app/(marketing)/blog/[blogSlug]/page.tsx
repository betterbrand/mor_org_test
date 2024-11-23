import { AspectRatio, Container, Heading, HStack, Stack } from '@chakra-ui/react'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type ReactNode } from 'react'

import { type IBlogPost, type IBlogPostFields } from '@/@types/generated/contentful'
import { BlogAuthor } from '@/components/blog/author'
import { BlogImage } from '@/components/blog/image'
import { ContentfulBody } from '@/components/contentful/ContentfulBody'
import ContentfulClient from '@/lib/contentfulClient'
import { pageMetadata } from '@/lib/metaData'

type Props = {
  params: { blogSlug: string }
}

async function getBlogPost(slug: string) {
  const entries = await ContentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.slug[match]': slug.toLowerCase(),
  })

  return {
    page: entries.items[0] as IBlogPost,
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await getBlogPost(params.blogSlug)

  if (!page) return notFound()

  const fields = page.fields as IBlogPostFields

  return pageMetadata({
    title: fields.title.trim(),
    description: fields.excerpt,
    ...(fields.heroImage && {
      ogImageUrl: `https://${fields.heroImage?.fields?.file?.url as string}`,
    }),
  })
}

export default async function Blog({ params: { blogSlug } }: { params: { blogSlug: string } }) {
  const { page } = await getBlogPost(blogSlug)
  const fields = page.fields as IBlogPostFields

  if (!page) return <></>

  return (
    <Container py={{ base: '16', md: '24' }} maxWidth='container.lg'>
      <Stack spacing='10' shouldWrapChildren>
        <Stack alignItems='center' spacing={4}>
          <Heading
            size='xs'
            fontWeight='semibold'
            textAlign='center'
            fontSize={{ base: '2xl', lg: '4xl' }}
            lineHeight='normal'
            maxWidth='container.md'
          >
            {fields.title as ReactNode}
          </Heading>
          <BlogAuthor author={fields.author} createdAt={fields.publishDate ?? page.sys.createdAt} />
        </Stack>
        <Stack spacing='6'>
          <AspectRatio ratio={16 / 9}>
            {fields.heroImage && <BlogImage asset={fields.heroImage} />}
          </AspectRatio>
          <HStack spacing='3'></HStack>
          <Stack spacing='3'>
            <Stack spacing='1'></Stack>
          </Stack>
        </Stack>
        <Container maxWidth='container.md' className='body-text'>
          <ContentfulBody body={fields.body} />
        </Container>
      </Stack>
    </Container>
  )
}
