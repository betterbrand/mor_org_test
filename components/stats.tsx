import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import { Box, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react'

import { stats } from '../static/stats'
import { PageContainer } from './page-container'
import { Stat } from './stat'

export const Stats = () => (
  <Box borderTopWidth={1} borderColor='border.subtle'>
    <PageContainer py={{ base: '16', md: '24' }}>
      <Stack spacing={{ base: '12', md: '16' }} alignItems='stretch'>
        <HStack justifyContent='space-between' spacing={6}>
          <Stack spacing={{ base: '4', md: '5' }} direction='column'>
            <Heading size={{ base: 'md', md: 'lg' }}>MOR Fair Launch</Heading>
            <Text color='text.subtle' textStyle={{ base: 'lg', md: 'xl' }}>
              The MOR token launch leverages a new fair launch model, the MOR20 Platform.{' '}
              <Link href='/MOR20' color='text.link'>
                Learn more about MOR20.{' '}
              </Link>
            </Text>
          </Stack>
          <Button
            display={{ base: 'none', md: 'flex' }}
            size='md'
            colorScheme='brand'
            as={Link}
            href='https://dashboard.mor.org'
            isExternal
            rightIcon={<ArrowForwardIcon />}
          >
            View Dashboard
          </Button>
        </HStack>
        <Stack spacing='8' direction={{ base: 'column', md: 'row' }}>
          {stats.map(stat => (
            <Stat key={stat.label} {...stat} />
          ))}
        </Stack>
      </Stack>
      <Button
        display={{ base: 'flex', md: 'none' }}
        size='md'
        width='full'
        mt={12}
        colorScheme='brand'
        as={Link}
        href='https://dashboard.mor.org'
        isExternal
        rightIcon={<ArrowForwardIcon />}
      >
        View Dashboard
      </Button>
    </PageContainer>
  </Box>
)
