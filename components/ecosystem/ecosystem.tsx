import { SimpleGrid, Stack } from '@chakra-ui/react'
import type * as contentful from 'contentful'

import { RenderSections } from '../contentful/RenderSection'
import { PageHeader } from '../page-header'
import { FeaturedProject } from './featured-project'

import type { IPageFields, IProjectFields } from '@/@types/generated/contentful'
import { Project } from '@/components/ecosystem/project'
import { PageContainer } from '@/components/page-container'
import ContentfulClient from '@/lib/contentfulClient'

export type ProjectSkeleton = contentful.EntrySkeletonType<IProjectFields, 'project'>

async function getData() {
  const entries = await ContentfulClient.getEntries<ProjectSkeleton>({ content_type: 'project' })
  return {
    projects: entries.items,
  }
}

type EcosystemProps = {
  page: IPageFields
}

export const Ecosystem: React.FC<EcosystemProps> = async ({ page }) => {
  const data = await getData()

  const featuredProjects = data.projects.filter(project => project.fields.featured)
  const otherProjects = data.projects.filter(project => !project.fields.featured)

  return (
    <>
      <PageContainer>
        <Stack spacing='10' shouldWrapChildren>
          <PageHeader {...page} />

          <Stack spacing={4}>
            {featuredProjects.map(post => (
              <FeaturedProject key={post.sys.id} project={post} />
            ))}
            <SimpleGrid
              gridGap={4}
              gridTemplateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }}
            >
              {otherProjects.map(post => (
                <Project key={post.sys.id} project={post} />
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </PageContainer>
      {page.sections && <RenderSections sections={page.sections} />}
    </>
  )
}
