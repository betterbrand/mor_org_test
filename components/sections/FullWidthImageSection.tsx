import { Box, Image } from '@chakra-ui/react'

import { PageContainer } from '../page-container'

import {
  type IFullWidthImageSection,
  type IFullWidthImageSectionFields,
} from '@/@types/generated/contentful'

type FullWidthImageSectionProps = {
  section: IFullWidthImageSection
}

export const FullWidthImageSection: React.FC<FullWidthImageSectionProps> = ({ section }) => {
  const { fields } = section
  const { image } = fields as IFullWidthImageSectionFields
  if (!image) return null
  return (
    <Box>
      <PageContainer py={{ base: '16', md: '24' }}>
        <Image
          src={image?.fields?.file?.url as string}
          width='full'
          height='auto'
          alt={(image?.fields?.description as string) ?? ''}
        />
      </PageContainer>
    </Box>
  )
}
