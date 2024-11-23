import { Stack, Text } from '@chakra-ui/react'

interface StatProps {
  label: string
  description: string
  value: string
  cta: string
}

export const Stat = (props: StatProps) => {
  const { label, value } = props
  return (
    <Stack spacing='3' flex='1'>
      <Text fontSize={{ base: '5xl', md: '6xl' }} color='text.link' fontWeight='semibold'>
        {value}
      </Text>
      <Stack spacing='5'>
        <Stack>
          <Text fontSize='lg' fontWeight='semibold'>
            {label}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  )
}
