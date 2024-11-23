import { Accordion, Card } from '@chakra-ui/react'

import { FaqAccordionItem } from '../faq-accordion-item'
import { FaqSectionTitle } from '../faq-section-title'

import { type IAccordionFields, type IFaqFields } from '@/@types/generated/contentful'

type AccordionProps = {
  item: IAccordionFields
}
export const AccordionBlock: React.FC<AccordionProps> = ({ item }) => {
  const { title, accordionItems } = item
  return (
    <Card
      borderRadius='xl'
      bg='background.surface.raised.base'
      borderWidth={1}
      borderColor='whiteAlpha.50'
      boxShadow='var(--shadow)'
    >
      <Accordion width='full' borderColor='whiteAlpha.50'>
        {/* Render section title */}
        <FaqSectionTitle title={title} />

        {/* Iterate over each item in the group */}
        {accordionItems &&
          accordionItems.map((item, itemIdx) => (
            // Render the item based on its type
            <FaqAccordionItem key={itemIdx} faq={item.fields as IFaqFields} />
          ))}
      </Accordion>
    </Card>
  )
}
