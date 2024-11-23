import { Container, Stack } from '@chakra-ui/react'

import { BlogList } from '@/components/blog/blog-list'
import { BlogPageHeader } from '@/components/blog/header'
import { PageContainer } from '@/components/page-container'

export default function Blog() {
  return (
    <PageContainer>
      <Container>
        <Stack spacing='10' shouldWrapChildren>
          <BlogPageHeader />
        </Stack>
      </Container>
      <BlogList />
    </PageContainer>
  )
}
