import { AspectRatio, Box, Image, Tag } from '@chakra-ui/react'

import { isYoutubeLink, PressVideo } from './press-video'

import { type IPressArticleFields } from '@/@types/generated/contentful'

type PressThumbnailProps = {
  fields: IPressArticleFields
}

export const PressThumbnail: React.FC<PressThumbnailProps> = ({ fields }) => {
  const { image, mediaType, link } = fields

  if (isYoutubeLink(link)) {
    return <PressVideo url={link} />
  }
  return (
    <Box position='relative' width='100%'>
      {mediaType && (
        <Tag
          position='absolute'
          right='16px'
          top='16px'
          zIndex={4}
          bg='rgba(255,255,255,.01)'
          fontWeight='semibold'
          backdropFilter='blur(100px)'
        >
          {mediaType}
        </Tag>
      )}
      {image && (
        <AspectRatio width='100%' ratio={16 / 9}>
          <Image
            src={image?.fields.file?.url as string}
            alt={image?.fields.description as string}
          />
        </AspectRatio>
      )}
    </Box>
  )
}
