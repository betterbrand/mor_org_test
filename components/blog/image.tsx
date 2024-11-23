import { Image, type ImageProps, Skeleton } from '@chakra-ui/react'
import type * as contentful from 'contentful'
import { type FC } from 'react'

type BlogImageProps = {
  asset: contentful.Asset
} & ImageProps

export const BlogImage: FC<BlogImageProps> = ({ asset, ...rest }) => {
  if (!asset.fields.file || !asset.fields.file.url) return
  return (
    <Image
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      alt={asset.fields.title}
      borderRadius='xl'
      fallback={<Skeleton />}
      objectFit='cover'
      objectPosition='top'
      src={asset.fields.file.url as string}
      {...rest}
    />
  )
}
