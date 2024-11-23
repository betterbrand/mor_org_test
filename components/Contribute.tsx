/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Box, Button, Icon, SimpleGrid, Square, Stack, Text } from '@chakra-ui/react'
import { FaCode } from 'react-icons/fa6'
import { FiArrowRight } from 'react-icons/fi'
import { GrGroup } from 'react-icons/gr'
import { type IconType } from 'react-icons/lib'
import { PiComputerTower, PiCurrencyEth } from 'react-icons/pi'

import { PageContainer } from './page-container'

type Feature = {
  name: string
  description: string
  cta: string
  href: string
  icon: IconType
}

export const features: Feature[] = [
  {
    name: 'Builders',
    description:
      'Your passion and skills drive adoption of Morpheus. Build applications for end users, including smart agents, front-ends, dapps, tools, & receive MOR rewards.',
    icon: GrGroup,
    cta: 'I am a Builder',
    href: 'https://www.mor.builders/',
  },
  {
    name: 'Capital',
    description:
      "Your resources are essential to the network's growth. Provide stETH liquidity, earn yield, and receive MOR tokens for your crucial role in the ecosystem.",
    icon: PiCurrencyEth,
    cta: 'I can contribute capital',
    href: 'https://dashboard.mor.org/#/mainnet/capital',
  },
  {
    name: 'Code',
    description:
      'Your skills are the foundation of the Morpheus ecosystem. Contribute to the codebase, develop specialized agents, and stake MOR rewards based on the usage and impact of your work.',
    icon: FaCode,
    cta: 'I can contribute code',
    href: 'https://www.mor.software/',
  },

  {
    name: 'Compute',
    description:
      'Your hardware powers the Morpheus network. Supply compute resources, process user queries, and be rewarded in MOR based on demand and performance.',
    icon: PiComputerTower,
    cta: 'I can contribute compute',
    href: 'https://github.com/MorpheusAIs/Morpheus-Lumerin-Node/blob/main/docs/00-overview.md',
  },
]

export const Contribute = () => (
  <Box as='section' bg='bg.surface' className='collab-bg'>
    <PageContainer py={{ base: '16', md: '24' }}>
      <Stack spacing={{ base: '12', md: '16' }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} columnGap={8} rowGap={{ base: 10, md: 16 }}>
          {features.map(feature => (
            <Stack key={feature.name} spacing={{ base: '4', md: '5' }}>
              <Square
                size={{ base: '10', md: '12' }}
                bg='background.surface.raised.base'
                color='text.link'
                borderRadius='lg'
              >
                <Icon as={feature.icon} boxSize={{ base: '5', md: '6' }} />
              </Square>
              <Stack spacing={{ base: '1', md: '2' }} flex='1'>
                <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight='semibold'>
                  {feature.name}
                </Text>
                <Text color='text.subtle'>{feature.description}</Text>
              </Stack>
              <Button
                as='a'
                variant='link'
                color='text.link'
                rightIcon={<FiArrowRight />}
                alignSelf='start'
                href={feature.href}
              >
                {feature.cta}
              </Button>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </PageContainer>
  </Box>
)
