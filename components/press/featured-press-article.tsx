import { Card, CardBody, CardFooter, Flex, Link, Text } from '@chakra-ui/react'
import type * as contentful from 'contentful'
import moment from 'moment'

import { type PressArticleSkeleton } from './press-page'
import { PressThumbnail } from './press-thumbnail'

import { type IPressArticleFields } from '@/@types/generated/contentful'

type PressArticleProps = {
  item: contentful.Entry<PressArticleSkeleton, undefined, string>
}

export const FeaturedPressArticle: React.FC<PressArticleProps> = ({ item }) => {
  const { fields } = item
  const { title, description, publication, date, link } = fields as IPressArticleFields

  return (
    <Link href={link} _hover={{ textDecoration: 'none' }} isExternal>
      <Card
        flexDirection='column'
        height='100%'
        overflow='hidden'
        _hover={{ bg: 'background.surface.raised.hover' }}
      >
        <PressThumbnail fields={fields} />

        <Flex flexDirection='column' flex={1}>
          <CardBody>
            <Text fontWeight='bold' fontSize='lg'>
              {title}
            </Text>
            {description && <Text>{description}</Text>}
          </CardBody>
          {date && (
            <CardFooter color='text.subtle' justifyContent='space-between' alignItems='center'>
              <Text>{publication}</Text>
              <Text>{moment(date).format('LL')}</Text>
            </CardFooter>
          )}
        </Flex>
      </Card>
    </Link>
  )
}
