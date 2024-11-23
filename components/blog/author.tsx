import { Box, Flex, Text } from '@chakra-ui/react'
import moment from 'moment'
import { type FC } from 'react'

import { type IAuthor } from '@/@types/generated/contentful'

type BlogAuthorProps = {
  author?: IAuthor
  createdAt: string
}

/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
export const BlogAuthor: FC<BlogAuthorProps> = ({ author, createdAt }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const authorName = author?.fields.name || '' // eslint-disable-line @typescript-eslint/no-unsafe-assignment

  return (
    <Flex alignItems='center' gap={4}>
      <Box lineHeight='1.25rem'>
        <Text fontSize='sm' color='default' fontWeight='semibold'>
          {authorName}
        </Text>
        <Text fontSize='sm' color='text.subtle'>
          {moment(createdAt).format('LL')}
        </Text>
      </Box>
    </Flex>
  )
}
