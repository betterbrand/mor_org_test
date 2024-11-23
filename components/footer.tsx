'use client'
import { Link } from '@chakra-ui/next-js'
import { Box, ButtonGroup, IconButton, Stack, Text } from '@chakra-ui/react'
import { FaDiscord, FaGithub, FaTelegram, FaXTwitter } from 'react-icons/fa6'

import { CoinMarketCap } from './Icons/CoinmarketCap'
import { LogoIcon } from './Icons/Logo'
import { PageContainer } from './page-container'

const socialLinks = [
  {
    icon: <FaTelegram />,
    label: 'Instagram',
    href: 'https://t.me/MorpheusAI',
  },
  {
    icon: <FaXTwitter />,
    label: 'Twitter',
    href: 'https://twitter.com/MorpheusAIs',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    href: 'https://github.com/MorpheusAIs/Docs',
  },
  {
    icon: <FaDiscord />,
    label: 'Discord',
    href: 'https://discord.gg/Dc26EFb6JK',
  },
  {
    icon: <CoinMarketCap />,
    label: 'Coinmarket Cap',
    href: 'https://coinmarketcap.com/currencies/morpheus/',
  },
]

export const Footer = () => (
  <Box className='footer-bg' bg='bg.accent.default' color='fg.accent.default'>
    <PageContainer as='footer' role='contentinfo' py={{ base: '12', md: '16' }}>
      <Stack spacing={{ base: '4', md: '5' }}>
        <Stack justify='space-between' direction='row' align='center'>
          <LogoIcon boxSize={14} />
          <ButtonGroup variant='tertiary.accent'>
            {socialLinks.map(link => (
              <IconButton
                key={link.label}
                icon={link.icon}
                aria-label={link.label}
                variant='ghost'
                as={Link}
                size='lg'
                isExternal
                href={link.href}
              />
            ))}
          </ButtonGroup>
        </Stack>
        <Text fontSize='sm' color='fg.accent.subtle'>
          Morpheus
        </Text>
      </Stack>
    </PageContainer>
  </Box>
)
