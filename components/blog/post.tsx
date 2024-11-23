import { AspectRatio, Box, Card, CardBody, CardFooter, Image, Link, Text } from '@chakra-ui/react'
import type * as contentful from 'contentful'

import { BlogAuthor } from './author'

import type { IBlogPost, IBlogPostFields } from '@/@types/generated/contentful'

type BlogPostSkeleton = contentful.EntrySkeletonType<IBlogPostFields, 'blogPost'>

interface BlogPostProps {
  post: contentful.Entry<BlogPostSkeleton, undefined, string> | IBlogPost
}

export const BlogPost = (props: BlogPostProps) => {
  const { post } = props
  const { heroImage, slug, title, author, excerpt, publishDate } = post.fields as IBlogPostFields

  return (
    <Link role='group' href={`/blog/${slug}`} _hover={{ textDecoration: 'none' }}>
      <Card overflow='hidden' height='100%' _hover={{ bg: 'background.surface.raised.hover' }}>
        {heroImage && (
          <Box position='relative' width='100%'>
            <AspectRatio width='100%' ratio={16 / 9}>
              <Image src={heroImage?.fields?.file?.url as string} alt={title} />
            </AspectRatio>
          </Box>
        )}
        <CardBody>
          <Text fontWeight='bold' fontSize='lg'>
            {title}
          </Text>
          <Text>{excerpt}</Text>
        </CardBody>
        <CardFooter>
          <BlogAuthor author={author} createdAt={publishDate ?? post.sys.createdAt} />
        </CardFooter>
      </Card>
    </Link>
  )
}
