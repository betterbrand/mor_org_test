'use client'
import { Box, Flex, SimpleGrid, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import type * as contentful from 'contentful'
import { useEffect, useState } from 'react'

import { BlogPost } from './post'

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
  })
  return {
    blogPosts: entries.items,
  }
}

export const BlogList = () => {
  const [data, setData] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const featuredBlogPosts = data.filter(item => item.fields.featured)
  const otherBlogPosts = data.filter(item => !item.fields.featured)

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
    <>
      {featuredBlogPosts.map(post => (
        <BlogPost key={post.sys.id} post={post} />
      ))}
      <Stack spacing={16} mx='auto' mt={8}>
        {isLoading ? (
          <LoadingSkeletons />
        ) : (
          <SimpleGrid
            gridGap={4}
            gridTemplateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }}
          >
            {otherBlogPosts.map(post => (
              <BlogPost key={post.sys.id} post={post} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </>
  )
}
