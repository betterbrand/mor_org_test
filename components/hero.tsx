'use client'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import Lottie from 'react-lottie-player'

import orb from './animations/orb.json'
import { MorOutline } from './mor-outline'

export const Hero = () => {
  return (
    <Box as='section' minH='130px' position='relative' mt='-72px'>
      <Box py={{ base: '32', md: '52' }} position='relative' zIndex={1}>
        <Flex
          position='relative'
          maxW={{ base: 'xl', md: '7xl' }}
          mx='auto'
          px={{ base: '6', md: '8' }}
          color='white'
          alignItems='center'
        >
          <Stack>
            <Heading as='h1' size='3xl' fontWeight='extrabold'>
              Decentralized AI
            </Heading>
            <Text fontSize={{ md: '2xl' }} mt='4' maxW='lg'>
              The first peer-to-peer network for general purpose AI, powered by MOR
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} mt='10' spacing='4'>
              <Button
                as='a'
                px='8'
                size='lg'
                fontSize='md'
                fontWeight='bold'
                zIndex={4}
                href='https://dashboard.mor.org/#/capital?network=mainnet'
                rightIcon={<ArrowForwardIcon />}
              >
                Earn MOR
              </Button>
            </Stack>
          </Stack>
          <Box position='absolute' width='full' maxWidth='1200px' right='-25%'>
            <Box
              position='absolute'
              width='35%'
              height='35%'
              left='50%'
              top='50%'
              transform='translate(-50%, -50%)'
            >
              <MorOutline />
            </Box>
            <Lottie
              loop
              animationData={orb}
              play
              style={{
                width: '100%',
                height: 'auto',
                zIndex: 4,
              }}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
