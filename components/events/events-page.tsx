import { Heading, Stack } from '@chakra-ui/react'
import type * as contentful from 'contentful'
import moment from 'moment'

import { PageHeader } from '../page-header'
import { EventRow } from './event-row'

import type { IEventFields, IPageFields } from '@/@types/generated/contentful'
import { PageContainer } from '@/components/page-container'
import ContentfulClient from '@/lib/contentfulClient'

export type EventSkeleton = contentful.EntrySkeletonType<IEventFields, 'event'>

async function getData() {
  const entries = await ContentfulClient.getEntries<EventSkeleton>({
    content_type: 'event',
    include: 4,
  })
  return {
    events: entries.items,
  }
}

type EcosystemProps = {
  page: IPageFields
}

export const EventsPage: React.FC<EcosystemProps> = async ({ page }) => {
  const data = await getData()

  const currentDate = moment() // Current date

  const sortedEvents = data.events.sort((a, b) => moment(b.fields.date).diff(moment(a.fields.date)))

  const upcomingEvents = sortedEvents.filter(event => moment(event.fields.date) > currentDate)
  const pastEvents = sortedEvents.filter(event => moment(event.fields.date) < currentDate)

  return (
    <PageContainer>
      <Stack spacing='10' shouldWrapChildren>
        <PageHeader {...page} />

        <Stack maxWidth='650px' mx='auto' spacing={8}>
          <Stack gap={4} mt={4}>
            <Heading as='h2' size={{ base: 'sm', md: 'md' }} px={{ base: 0, md: 6 }}>
              Upcoming Events
            </Heading>
            {upcomingEvents.map(post => (
              <EventRow key={post.sys.id} event={post} />
            ))}
          </Stack>

          <Stack gap={4} mt={4}>
            <Heading as='h2' size={{ base: 'sm', md: 'md' }} px={{ base: 0, md: 6 }}>
              Past Events
            </Heading>
            {pastEvents.map(post => (
              <EventRow key={post.sys.id} event={post} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </PageContainer>
  )
}
