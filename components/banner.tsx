'use client'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Link, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

import { Countdown } from './countdown'
import { PageContainer } from './page-container'

export const Banner = () => (
  <Box as='section' bg='background.primary' zIndex='sticky' position='relative'>
    <Box bg='bg.surface'>
      <PageContainer py='3'>
        <HStack spacing={{ base: '3', md: '4' }} justify={{ base: 'start', md: 'center' }}>
          <Countdown
            beforeLabel={<Text>MOR Token Launch in</Text>}
            afterLabel={
              <Button
                as={Link}
                variant='link'
                size='md'
                rightIcon={<ArrowForwardIcon />}
                href='/fair-launch'
                fontWeight='bold'
              >
                MOR Fair Launch
              </Button>
            }
            endComponent={
              <Text>
                MOR Reward Staking Is Live{' '}
                <Button
                  as={Link}
                  variant='link'
                  size='md'
                  rightIcon={<ArrowForwardIcon />}
                  href='https://dashboard.mor.org/#/capital?network=mainnet '
                  fontWeight='bold'
                >
                  Start staking
                </Button>
              </Text>
            }
            endTime={dayjs.utc('2024-05-08 12:00:00', 'YYYY-MM-DD HH:mm:ss')}
          />
        </HStack>
      </PageContainer>
    </Box>
  </Box>
)
