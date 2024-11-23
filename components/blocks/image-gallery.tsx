'use client'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { Box, Image } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'

import { type IImageGalleryFields } from '@/@types/generated/contentful'

type ImageGalleryProps = {
  item: IImageGalleryFields
}
export const ImageGallery: React.FC<ImageGalleryProps> = ({ item }) => {
  const { images } = item
  return (
    <Box py={6}>
      <Carousel dynamicHeight emulateTouch showThumbs={false}>
        {images?.map(image => (
          <div key={image.sys.id}>
            <Image
              cursor='grab'
              alt={image.fields.description as string}
              src={image.fields.file?.url as string}
            />
          </div>
        ))}
      </Carousel>
    </Box>
  )
}
