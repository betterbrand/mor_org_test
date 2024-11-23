import { Card, CardBody, CardFooter, CardHeader, Heading, Link } from '@chakra-ui/react'
import { useMemo } from 'react'

import { ContentfulBody } from '../contentful/ContentfulBody'

import { type ICardFields } from '@/@types/generated/contentful'

type AccordionProps = {
  item: ICardFields
}
export const CardBlock: React.FC<AccordionProps> = ({ item }) => {
  const { cardHeader, cardBody, cardFooter, url, isExternal } = item
  const cardContent = useMemo(() => {
    return (
      <Card
        borderRadius='xl'
        bg='background.surface.raised.base'
        borderWidth={1}
        borderColor='whiteAlpha.50'
        boxShadow='var(--shadow)'
        mb={6}
        {...(url
          ? {
              _hover: {
                backgroundColor: 'background.surface.raised.hover',
              },
            }
          : {})}
      >
        {cardHeader && (
          <CardHeader>
            <Heading as='h3' size={{ base: 'sm', md: 'md' }}>
              {cardHeader}
            </Heading>
          </CardHeader>
        )}
        {cardBody && (
          <CardBody>
            <ContentfulBody body={cardBody} />
          </CardBody>
        )}
        {cardFooter && (
          <CardFooter>
            <ContentfulBody body={cardFooter} />
          </CardFooter>
        )}
      </Card>
    )
  }, [cardBody, cardFooter, cardHeader, url])
  return url ? (
    <Link href={url} _hover={{ textDecoration: 'none' }} isExternal={isExternal as boolean}>
      {cardContent}
    </Link>
  ) : (
    <>{cardContent}</>
  )
}
