import { Box, Button, type ContainerProps, Heading, Link, Stack, Text } from '@chakra-ui/react'

import { PageContainer } from './page-container'

import { type ICtaSectionFields } from '@/@types/generated/contentful'

export type CTABlockProps = {
  fields: ICtaSectionFields
  containerProps?: ContainerProps
}

export const CTABlock: React.FC<CTABlockProps> = ({ fields, containerProps }) => {
  const {
    title,
    body,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryIsExternal,
    primaryButtonLink,
    primaryButtonText,
    primaryIsExternal,
  } = fields
  return (
    <Box>
      <PageContainer py={{ base: '16', md: '24' }} {...containerProps}>
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
