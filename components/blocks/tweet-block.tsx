'use client'
import { Box, Center } from '@chakra-ui/react'
import { Tweet } from 'react-twitter-widgets'

import { type ITweetFields } from '@/@types/generated/contentful'

const getTweetIdFromUrl = (url: string): string | null => {
  const regex = /^https:\/\/x\.com\/[a-zA-Z0-9_]+\/status\/(\d+)$/
  const match = url.match(regex)
  return match ? match[1] : null
}

type TweetBlocKProps = {
  item: ITweetFields
}
export const TweetBlock: React.FC<TweetBlocKProps> = ({ item }) => {
  const { tweetUrl } = item
  const tweetId = getTweetIdFromUrl(tweetUrl)

  if (!tweetId) return null

  return (
    <Center width='full' bg='background.surface.raised.base' p={6}>
      <Box width='full' maxWidth='500px' borderRadius='lg' overflow='hidden'>
        <Tweet tweetId={tweetId} />
      </Box>
    </Center>
  )
}
