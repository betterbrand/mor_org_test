'use client'
import React from 'react'

import { CardGridSection } from '../sections/CardGridSection'
import { CtaSection } from '../sections/CtaSection'
import { FullWidthImageSection } from '../sections/FullWidthImageSection'
import { TwoColumnSection } from '../sections/TwoColumnSection'

import {
  type ICardGridSection,
  type ICtaSection,
  type IFullWidthImageSection,
  type IPageFields,
  type ITwoColumnSection,
} from '@/@types/generated/contentful'

type RenderSectionsProps = {
  sections: IPageFields['sections']
}

type RenderSectionProps = {
  section: ICardGridSection | ITwoColumnSection | ICtaSection | IFullWidthImageSection
}

const RenderSection: React.FC<RenderSectionProps> = ({ section }) => {
  // this isn't right but the typing is wrong
  switch (section?.sys?.contentType?.sys?.id) {
    case 'cardGridSection':
      return <CardGridSection section={section as ICardGridSection} />
    case 'twoColumnSection':
      return <TwoColumnSection section={section as ITwoColumnSection} />
    case 'ctaSection':
      return <CtaSection section={section as ICtaSection} />
    case 'fullWidthImageSection':
      return <FullWidthImageSection section={section as IFullWidthImageSection} />
    default:
      return <></>
  }
}

export const RenderSections: React.FC<RenderSectionsProps> = ({ sections }) => {
  return <>{sections?.map(section => <RenderSection key={section?.sys?.id} section={section} />)}</>
}
