import { Box, Button, Heading, Link, Stack, Text } from '@chakra-ui/react'

import { PageContainer } from '../page-container'

import { type ICtaSection, type ICtaSectionFields } from '@/@types/generated/contentful'

type TwoColumnSectionProps = {
  section: ICtaSection
}

export const CtaSection: React.FC<TwoColumnSectionProps> = ({ section }) => {
  const { fields } = section
  const {
    title,
    body,
    primaryButtonText,
    primaryButtonLink,
    primaryIsExternal,
    secondaryButtonText,
    secondaryButtonLink,
    secondaryIsExternal,
  } = fields as ICtaSectionFields
  return (
    <Box>
      <PageContainer py={{ base: '16', md: '24' }}>
        <Box
          bg='background.surface.raised.base'
          boxShadow='sm'
          borderRadius='xl'
          px={{ base: '6', lg: '16' }}
          py={{ base: '10', lg: '16' }}
        >
          <Stack spacing='8' direction={{ base: 'column', lg: 'row' }} justify='space-between'>
            <Stack spacing='4' maxW='2xl'>
              <Heading size='lg'>{title}</Heading>
              <Text color='text.subtle' fontSize={{ base: 'lg', lg: 'xl' }}>
                {body}
              </Text>
            </Stack>
            <Stack
              spacing='3'
              direction={{ base: 'column', sm: 'row' }}
              justify={{ base: 'start' }}
            >
              {secondaryButtonLink && (
                <Button
                  variant='outline'
                  borderColor='border.base'
                  size='lg'
                  as={Link}
                  href={secondaryButtonLink}
                  isExternal={secondaryIsExternal}
                >
                  {secondaryButtonText}
                </Button>
              )}
              <Button size='lg' as={Link} href={primaryButtonLink} isExternal={primaryIsExternal}>
                {primaryButtonText}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </PageContainer>
    </Box>
  )
}
