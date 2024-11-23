import { AspectRatio, Box, Card, CardBody, CardHeader, Flex, Link, Text } from '@chakra-ui/react'
import type * as contentful from 'contentful'
import moment from 'moment'
import { FaLocationPin } from 'react-icons/fa6'

import { type EventSkeleton } from './events-page'

import { type IEvent, type IEventFields } from '@/@types/generated/contentful'

type EventProps = {
  event: contentful.Entry<EventSkeleton, undefined, string> | IEvent
}

export const EventRow: React.FC<EventProps> = ({ event }) => {
  const { fields } = event
  const { title, link, image, date, location } = fields as IEventFields

  const month = moment(date).format('MMM')
  const day = moment(date).format('D')
  return (
    <Link isExternal href={link} _hover={{ textDecoration: 'none' }}>
      <Card
        display='flex'
        gap={4}
        px={{ base: 0, md: 6 }}
        py={{ base: 0, md: 4 }}
        flexDir='row'
        borderRadius='lg'
        alignItems='center'
        bg='transparent'
        _hover={{ bg: 'background.surface.raised.base' }}
        overflow='hidden'
      >
        <Card
          size='sm'
          variant='outline'
          borderColor='var(--primary-accent-muted)'
          bg='transparent'
          overflow='hidden'
          borderRadius='lg'
          width='65px'
          display={{ base: 'none', md: 'flex' }}
        >
          <CardHeader
            textTransform='uppercase'
            fontWeight='bold'
            color='text.link'
            fontSize='xs'
            py={1}
            bg='var(--primary-accent-muted)'
            textAlign='center'
          >
            {month}
          </CardHeader>
          <CardBody
            bg='background.surface.base'
            fontSize='2xl'
            fontWeight='semibold'
            textAlign='center'
            py={1}
          >
            {day}
          </CardBody>
        </Card>
        <AspectRatio ratio={1 / 1} maxWidth='100px' width='full'>
          <Box
            backgroundSize='cover'
            borderRadius='md'
            bgColor='background.surface.raised.base'
            bgImage={`url(${image?.fields?.file?.url as string})`}
          />
        </AspectRatio>
        <CardBody p={0}>
          <Text fontWeight='bold' fontSize={{ base: 'md', md: 'lg' }} mb={2}>
            {title}
          </Text>
          <Text color='text.subtle' fontSize={{ base: 'sm', md: 'md' }}>
            {moment(date).format('LLLL')}
          </Text>
          {location && (
            <Flex alignItems='center' gap={2} color='text.subtle' fontSize='sm' mt={2}>
              <FaLocationPin />
              <Text>{location}</Text>
            </Flex>
          )}
        </CardBody>
      </Card>
    </Link>
  )
}
