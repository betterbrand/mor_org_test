import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import type * as contentful from 'contentful'
import moment from 'moment'
import { FaLocationPin } from 'react-icons/fa6'

import { type EventSkeleton } from './events-page'

import { type IEvent, type IEventFields } from '@/@types/generated/contentful'

type EventProps = {
  event: contentful.Entry<EventSkeleton, undefined, string> | IEvent
}

export const EventCard: React.FC<EventProps> = ({ event }) => {
  const { fields } = event
  const { title, link, image, date, location } = fields as IEventFields

  return (
    <Link href={link} _hover={{ textDecoration: 'none' }} isExternal>
      <Card height='100%' overflow='hidden' _hover={{ bg: 'background.surface.raised.hover' }}>
        {image && (
          <Box
            position='relative'
            bgImage={`url(${image?.fields?.file?.url as string})`}
            backgroundPosition='center center'
            backgroundSize='cover'
            width='100%'
            maxWidth={{ base: '100%', md: '400px' }}
          >
            <AspectRatio width='100%' ratio={16 / 9} backdropFilter='blur(20px)'>
              <Image
                style={{ objectFit: 'contain' }}
                src={image?.fields?.file?.url as string}
                alt={title}
              />
            </AspectRatio>
          </Box>
        )}

        <CardBody>
          <Text fontWeight='bold' fontSize={{ base: 'md', md: 'lg' }} mb={2}>
            {title}
          </Text>
          <Text color='text.subtle' fontSize={{ base: 'sm', md: 'md' }}>
            {moment(date).format('LLLL')}
          </Text>
        </CardBody>
        <CardFooter>
          {location && (
            <Flex alignItems='center' gap={2} color='text.subtle' fontSize='sm' mt='auto'>
              <FaLocationPin />
              <Text>{location}</Text>
            </Flex>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
