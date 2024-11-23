/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Link,
  OrderedList,
  Text,
} from '@chakra-ui/react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  type Block,
  BLOCKS,
  type Document,
  type Inline,
  INLINES,
  MARKS,
  type Text as TextType,
} from '@contentful/rich-text-types'
import React, { type FC, type ReactNode } from 'react'

import { AccordionBlock } from '../blocks/accordion-block'
import { CardBlock } from '../blocks/card-block'
import { ImageGallery } from '../blocks/image-gallery'
import { TweetBlock } from '../blocks/tweet-block'
import { PressArticle } from '../press/press-article'

const isText = (node: TextType | Inline | Block): node is TextType => {
  return (node as TextType).nodeType === 'text'
}

const videoFormats = ['wav', 'mp3', 'mp4', 'mpg', 'wmv', '.avi']
const isVideo = (source: string) => {
  const src = source.toLowerCase()

  return videoFormats.some(ext => src.endsWith(ext))
}

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <Text as='b'>{text}</Text>,
    [MARKS.ITALIC]: (text: ReactNode) => <Text as='i'>{text}</Text>,
    [MARKS.UNDERLINE]: (text: ReactNode) => <Text as='u'>{text}</Text>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => (
      <Text as='p'>{children}</Text>
    ),
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode) => (
      <Heading as='h1' mb={6} fontWeight={400} size={{ base: '2xl', md: '3xl' }}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => (
      <Heading as='h2' mb={6} fontWeight={400} size={{ base: 'xl', md: '2xl' }}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => (
      <Heading as='h3' mb={6} fontWeight={400} size={{ base: 'lg', md: 'xl' }}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_4]: (node: Block | Inline, children: ReactNode) => (
      <Heading as='h4' mb={6} fontWeight={400} lineHeight='2rem' size={{ base: 'md', md: 'lg' }}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_5]: (node: Block | Inline, children: ReactNode) => (
      <Heading as='h5' mb={6} fontWeight={600} size={{ base: 'sm', md: 'md' }}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_6]: (node: Block | Inline, children: ReactNode) => (
      <Heading as='h6' mb={6} fontWeight={600} size={{ base: 'xs', md: 'xs' }}>
        {children}
      </Heading>
    ),
    [BLOCKS.QUOTE]: (node: Block | Inline, children: ReactNode) => (
      <Card mb={6} bg='transparent' borderLeftWidth={5} borderColor='border.base' borderRadius={0}>
        <CardBody>{children}</CardBody>
      </Card>
    ),
    [INLINES.HYPERLINK]: (node: Block | Inline) => {
      const {
        content,
        data: { uri },
      } = node
      const title = isText(content[0]) ? content[0].value : ''

      return (
        <Link
          href={uri as string}
          target='_blank'
          rel='noopener noreferrer'
          textDecoration='underline'
          color='text.link'
        >
          {title}
        </Link>
      )
    },
    'embedded-asset-block': (node: Block | Inline) => {
      const {
        data: {
          target: { fields },
        },
      } = node

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const altText = (fields?.title as string) || ''
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      const url = decodeURIComponent(fields?.file?.url)
      const imageSrc = url.startsWith('//') ? `https:${url}` : url

      if (isVideo(imageSrc)) {
        return (
          <video controls>
            <source src={imageSrc} type='video/mp4' />
          </video>
        )
      } else {
        return (
          <Box my={6}>
            <Link href={imageSrc} target='_blank'>
              <Image src={imageSrc} alt={altText} transition='all 0.2s' m='0 auto' />
            </Link>
          </Box>
        )
      }
    },
    'ordered-list': (node: Block | Inline, children: ReactNode) => {
      return (
        <OrderedList ml={8} spacing='4'>
          {children}
        </OrderedList>
      )
    },
    'unordered-list': (node: Block | Inline, children: ReactNode) => {
      return (
        <OrderedList ml={8} spacing='4'>
          {children}
        </OrderedList>
      )
    },
    [INLINES.EMBEDDED_ENTRY]: (node: Block | Inline) => {
      if (node.data.target.sys.contentType.sys.id === 'button') {
        return (
          <Button as={Link} href={node.data.target.fields.link}>
            {node.data.target.fields.buttonText}
          </Button>
        )
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
      if (node.data.target.sys.contentType.sys.id === 'button') {
        return (
          <Button
            as={Link}
            href={node.data.target.fields.link}
            isExternal={node.data.target.fields.isExternal}
          >
            {node.data.target.fields.buttonText}
          </Button>
        )
      }
      if (node.data.target.sys.contentType.sys.id === 'accordion') {
        return (
          <Box mb={4}>
            <AccordionBlock item={node.data.target.fields} />
          </Box>
        )
      }
      if (node.data.target.sys.contentType.sys.id === 'card') {
        return (
          <Box mb={4}>
            <CardBlock item={node.data.target.fields} />
          </Box>
        )
      }
      if (node.data.target.sys.contentType.sys.id === 'pressArticle') {
        return (
          <Box mb={4}>
            <PressArticle item={node.data.target} />
          </Box>
        )
      }
      if (node.data.target.sys.contentType.sys.id === 'tweet') {
        return (
          <Box mb={4}>
            <TweetBlock item={node.data.target.fields} />
          </Box>
        )
      }
      if (node.data.target.sys.contentType.sys.id === 'imageGallery') {
        return (
          <Box mb={4}>
            <ImageGallery item={node.data.target.fields} />
          </Box>
        )
      }
    },
  },
  renderText: (text: string) => text.replace('!', '?'),
}

type ContentfulBodyProps = {
  body: Document
}

export const ContentfulBody: FC<ContentfulBodyProps> = ({ body }) =>
  documentToReactComponents(body, options)
