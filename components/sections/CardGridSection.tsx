import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'

import { CardBlock } from '../blocks/card-block'
import { BlogPost } from '../blog/post'
import { EventCard } from '../events/event-card'
import { PageContainer } from '../page-container'
import { PressArticle } from '../press/press-article'

import {
  type IBlogPost,
  type ICardFields,
  type ICardGridSection,
  type ICardGridSectionFields,
  type IEvent,
  type IPressArticle,
} from '@/@types/generated/contentful'

type CardGridSection = {
  section: ICardGridSection
}

export const CardGridSection: React.FC<CardGridSection> = ({ section }) => {
  const { fields } = section
  const { title, cards, subtitle } = fields as ICardGridSectionFields
  return (
    <Box as='section' borderTopWidth={1} borderColor='border.subtle'>
      <PageContainer>
        <Stack spacing={{ base: '12', md: '8' }}>
          <Stack spacing={{ base: '4', md: '5' }} textAlign='center' align='center'>
            <Heading size={{ base: 'md', md: 'lg' }}>{title}</Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color='text.subtle' maxW='3xl'>
              {subtitle}
            </Text>
          </Stack>
          <Box>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
              {cards.map(item => {
                switch (item.sys.contentType.sys.id) {
                  case 'card':
                    return <CardBlock key={item.sys.id} item={item.fields as ICardFields} />
                  case 'blogPost':
                    return <BlogPost key={item.sys.id} post={item as IBlogPost} />
                  case 'event':
                    return <EventCard key={item.sys.id} event={item as IEvent} />
                  case 'pressArticle':
                    return <PressArticle key={item.sys.id} item={item as IPressArticle} />
                  default:
                    return <></>
                }
              })}
            </SimpleGrid>
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  )
}
