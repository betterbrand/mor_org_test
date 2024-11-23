import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Tag,
  Text,
} from '@chakra-ui/react'
import type * as contentful from 'contentful'

import { type ProjectSkeleton } from './ecosystem'

import { type IProjectFields } from '@/@types/generated/contentful'

type ProjectProps = {
  project: contentful.Entry<ProjectSkeleton, undefined, string>
}

export const Project: React.FC<ProjectProps> = ({ project }) => {
  const { fields } = project
  const { name, description, image, url, category } = fields as IProjectFields
  return (
    <Card>
      <CardHeader display='flex' gap={4} alignItems='center'>
        {image && <Avatar name={name} borderRadius='lg' src={image?.fields.file?.url as string} />}
        <Text fontWeight='bold' fontSize='lg'>
          {name}
        </Text>
      </CardHeader>
      {description && (
        <CardBody>
          <Text>{description}</Text>
        </CardBody>
      )}
      <CardFooter justifyContent='space-between' alignItems='center'>
        <Button as={Link} href={url} isExternal>
          Visit
        </Button>
        {category && <Tag>{category}</Tag>}
      </CardFooter>
    </Card>
  )
}
