import { Card, CardBody, CardFooter, Link, Text } from '@chakra-ui/react'
import type * as contentful from 'contentful'
import moment from 'moment'

import { type PressArticleSkeleton } from './press-page'
import { PressThumbnail } from './press-thumbnail'

import { type IPressArticle, type IPressArticleFields } from '@/@types/generated/contentful'

type PressArticleProps = {
  item: contentful.Entry<PressArticleSkeleton, undefined, string> | IPressArticle
}

export const PressArticle: React.FC<PressArticleProps> = ({ item }) => {
  const { fields } = item
  const { title, description, publication, date, link } = fields as IPressArticleFields
  return (
    <Link href={link} _hover={{ textDecoration: 'none' }} isExternal>
      <Card height='100%' overflow='hidden' _hover={{ bg: 'background.surface.raised.hover' }}>
        <PressThumbnail fields={fields as IPressArticleFields} />

        <CardBody>
          <Text fontWeight='bold' fontSize='lg'>
            {title}
          </Text>
          {description && <Text>{description}</Text>}
        </CardBody>
        {date && (
          <CardFooter color='text.subtle' justifyContent='space-between' alignItems='center'>
            <Text mb={0}>{publication}</Text>
            <Text mb={0}>{moment(date).format('LL')}</Text>
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}
