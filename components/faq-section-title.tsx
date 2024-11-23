import { Heading } from '@chakra-ui/react'

export const FaqSectionTitle = ({ title }: { title: string }) => {
  return (
    <Heading
      as='h2'
      color='text.subtle'
      size={{ base: 'xs', md: 'sm' }}
      px={4}
      py={4}
      textTransform='uppercase'
      letterSpacing='0.027em'
    >
      {title}
    </Heading>
  )
}
