import { Box, Heading, SimpleGrid, Stack } from '@chakra-ui/react'

import { ContentfulBody } from '../contentful/ContentfulBody'
import { PageContainer } from '../page-container'

import { type ITwoColumnSection, type ITwoColumnSectionFields } from '@/@types/generated/contentful'

type TwoColumnSectionProps = {
  section: ITwoColumnSection
}

export const TwoColumnSection: React.FC<TwoColumnSectionProps> = ({ section }) => {
  const { fields } = section
  const { title, subtitle, body } = fields as ITwoColumnSectionFields
  return (
    <Box>
      <PageContainer py={{ base: '16', md: '24' }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, md: 12 }}>
          <Stack spacing={{ base: 0, md: '6' }} maxWidth='32rem'>
            <Stack spacing='2'>
              <Heading as='h1' size={{ base: 'md', md: 'xl' }}>
                {title}
              </Heading>
              {subtitle && (
                <Heading fontWeight='medium' size={{ base: 'md', md: 'xl' }} color='text.link'>
                  {subtitle}
                </Heading>
              )}
            </Stack>
          </Stack>
          <Box fontSize='lg' className='body-text'>
            <ContentfulBody body={body} />
          </Box>
        </SimpleGrid>
      </PageContainer>
    </Box>
  )
}
