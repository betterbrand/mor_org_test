import {
  Box,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react'
import type * as contentful from 'contentful'
import { useEffect, useState } from 'react'

import { BlogAuthor } from './blog/author'
import { BlogImage } from './blog/image'
import { PageContainer } from './page-container'

import type { IBlogPostFields } from '@/@types/generated/contentful'
import ContentfulClient from '@/lib/contentfulClient'

type BlogPostSkeleton = contentful.EntrySkeletonType<IBlogPostFields, 'blogPost'>
type BlogPost = contentful.Entry<BlogPostSkeleton, undefined, string>

const LoadingSkeleton = () => {
  return (
    <Stack spacing='8' height='100%'>
      <Box overflow='hidden'>
        <Skeleton height='15rem'></Skeleton>
      </Box>
      <Stack spacing='3'>
        <Skeleton height='20px' />
        <SkeletonText noOfLines={3} />
      </Stack>
      <Flex flexDir='column' mt='auto' gap={2}>
        <Skeleton height='16px' />
        <Skeleton height='16px' />
      </Flex>
    </Stack>
  )
}

const LoadingSkeletons = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '12', lg: '8' }}>
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </SimpleGrid>
  )
}

async function getData() {
  const entries = await ContentfulClient.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    include: 10,
    limit: 3,
  })
  return {
    blogPosts: entries.items,
  }
}

export const LatestPosts = () => {
  const [data, setData] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData()
        setData(data.blogPosts)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    void fetchData()
  }, [])

  return (
    <Box bg='bg.surface'>
      <PageContainer>
        <Stack spacing={{ base: '12', md: '16' }}>
          <Stack direction='row' justify='space-between'>
            <Stack spacing={{ base: '4', md: '5' }}>
              <Heading size={{ base: 'lg', md: 'xl' }}>Latest updates</Heading>
            </Stack>
          </Stack>
          {isLoading ? (
            <LoadingSkeletons />
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '12', lg: '8' }}>
              {data.map(post => {
                return (
                  <Link
                    key={post.sys.id}
                    href={`/blog/${post.fields.slug as string}`}
                    _hover={{ textDecor: 'none' }}
                    role='group'
                  >
                    <Stack spacing='8' height='100%'>
                      <Box overflow='hidden'>
                        {post.fields.heroImage && (
                          <BlogImage
                            asset={post.fields.heroImage as contentful.Asset}
                            width='full'
                            height='15rem'
                            objectFit='cover'
                            transition='all 0.2s'
                            borderRadius={0}
                            _groupHover={{ transform: 'scale(1.05)' }}
                          />
                        )}
                      </Box>
                      <Stack spacing='3'>
                        <Heading size='sm'>{post.fields.title}</Heading>
                        <Text color='text.subtle'>{post.fields.excerpt}</Text>
                      </Stack>
                      <Flex flexDir='column' mt='auto'>
                        <BlogAuthor author={post.fields.author} createdAt={post.sys.createdAt} />
                      </Flex>
                    </Stack>
                  </Link>
                )
              })}
            </SimpleGrid>
          )}
        </Stack>
      </PageContainer>
    </Box>
  )
}
