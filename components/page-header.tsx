import { Heading, Stack, type StackProps, Text } from '@chakra-ui/react'

import { type IPageFields } from '@/@types/generated/contentful'

type PageHeaderProps = {
  stackProps?: StackProps
} & IPageFields

export const PageHeader: React.FC<PageHeaderProps> = ({ pageName, introduction, stackProps }) => {
  return (
    <Stack alignItems='center' textAlign='center' maxWidth='42rem' mx='auto' {...stackProps}>
      <Heading as='h1' size='xl'>
        {pageName}
      </Heading>
      {introduction && (
        <Text fontSize='lg' lineHeight='2rem' color='text.subtle'>
          {introduction}
        </Text>
      )}
    </Stack>
  )
}
