import type * as contentful from 'contentful'
import { useEffect, useState } from 'react'

import { CardGridSection } from './sections/CardGridSection'

import { type ICardGridSection, type ICardGridSectionFields } from '@/@types/generated/contentful'
import ContentfulClient from '@/lib/contentfulClient'

type CardGridSectionSkeleton = contentful.EntrySkeletonType<
  ICardGridSectionFields,
  'cardGridSection'
>
type CardGridSection = contentful.Entry<CardGridSectionSkeleton, undefined, string>

async function getData() {
  const item = await ContentfulClient.getEntry<CardGridSectionSkeleton>('3SMah8tLgxaLbAqdeZCpD7', {
    include: 10,
  })
  return item
}

export const LatestPostsBlock = () => {
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

  return <CardGridSection section={data as ICardGridSection} />
}
