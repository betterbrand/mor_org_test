import { Stack } from '@chakra-ui/react'

import { ContentfulBody } from '../contentful/ContentfulBody'
import { PageHeader } from '../page-header'

import type { IPageFields } from '@/@types/generated/contentful'
import { PageContainer } from '@/components/page-container'

type PagePageProps = {
  page: IPageFields
}

export const FaqPage: React.FC<PagePageProps> = ({ page }) => {
  return (
    <PageContainer
      gap={12}
      display='flex'
      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent='center'
      alignItems='flex-start'
      flex={1}
      pt={{ base: 8, md: 24 }}
    >
      <PageHeader
        {...page}
        stackProps={{ mx: 0, flex: 1, alignItems: 'flex-start', position: 'sticky', top: '72px' }}
      />
      <Stack spacing={8} mb={12} maxWidth='container.md' width='full'>
        {page.body && <ContentfulBody body={page.body} />}
      </Stack>
    </PageContainer>
  )
}
