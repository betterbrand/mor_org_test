import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react'

import { type IFaqFields } from '@/@types/generated/contentful'
import { ContentfulBody } from '@/components/contentful/ContentfulBody'

export const FaqAccordionItem = ({ faq }: { faq: IFaqFields }) => {
  return (
    <AccordionItem width='full' _last={{ borderBottomWidth: 0 }}>
      <AccordionButton
        py={4}
        _expanded={{ color: 'text.base' }}
        color='text.subtle'
        _hover={{ color: 'text.base' }}
      >
        <Box as='span' flex='1' textAlign='left'>
          <Heading as='h4' size='sm' letterSpacing='0.005em'>
            {faq?.question}
          </Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel py={4} className='body-text'>
        <ContentfulBody body={faq?.answer} />
      </AccordionPanel>
    </AccordionItem>
  )
}
