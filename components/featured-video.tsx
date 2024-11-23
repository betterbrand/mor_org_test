import { Box } from '@chakra-ui/react'
import type * as contentful from 'contentful'
import { useEffect, useState } from 'react'

import { type CardGridSection } from './sections/CardGridSection'
import { TwoColumnSection } from './sections/TwoColumnSection'

import { type ITwoColumnSection, type ITwoColumnSectionFields } from '@/@types/generated/contentful'
import ContentfulClient from '@/lib/contentfulClient'

type CardGridSectionSkeleton = contentful.EntrySkeletonType<
  ITwoColumnSectionFields,
  'twoColumnSection'
>
type CardGridSection = contentful.Entry<CardGridSectionSkeleton, undefined, string>

async function getData() {
  const item = await ContentfulClient.getEntry<CardGridSectionSkeleton>('4pCH29rA9PmSojlci4vRDE', {
    include: 10,
  })
  return item
}

export const FeaturedVideo = () => {
  const [data, setData] = useState<CardGridSection>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData()
        setData(data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    void fetchData()
  }, [])

  if (isLoading) return

  return (
    <Box borderTopWidth={1} borderColor='border.subtle'>
      <TwoColumnSection section={data as ITwoColumnSection} />
    </Box>
  )
}
