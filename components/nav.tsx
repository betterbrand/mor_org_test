'use client'

import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import {
  Box,
  Button,
  Collapse,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'

import { LogoIcon } from './Icons/Logo'

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box position='sticky' zIndex='sticky'>
      <Flex
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: '6', md: '8' }}
        mx='auto'
        gap={6}
        align={'center'}
        maxW={{ base: 'xl', md: '7xl' }}
      >
        <Flex flex={1} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex justifyContent='center'>
          <Link href='/'>
            <LogoIcon boxSize={14} />
          </Link>
        </Flex>
        <Flex flex={1} justifyContent='flex-start' display={{ base: 'none', md: 'flex' }}>
          <DesktopNav />
        </Flex>
        <Stack justify={'flex-end'} alignItems='center' direction={'row'} spacing={4}>
          <Button
            size='md'
            as={Link}
            href='https://app.uniswap.org/explore/pools/arbitrum/0xE5Cf22EE4988d54141B77050967E1052Bd9c7F7A'
          >
            Buy MOR
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={navItem.isGrid ? 'bottom' : 'bottom-start'}>
            <PopoverTrigger>
              <Button
                as={Link}
                href={navItem.href ?? '#'}
                variant='ghost'
                fontWeight='medium'
                fontSize='md'
                color='white'
                iconSpacing={1}
                _hover={{ background: 'transparent' }}
                {...(navItem.children && { rightIcon: <ChevronDownIcon /> })}
              >
                {navItem.label}
              </Button>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg='green.900'
                color='white'
                borderWidth={1}
                borderColor='border.base'
                p={6}
                rounded={'xl'}
                minW={navItem.featured ? '960' : 'sm'}
              >
                <Flex w={'100%'} gap={6}>
                  {navItem.featured && (
                    <Box
                      w={368}
                      bg='#0C0C0C'
                      borderRadius='lg'
                      height={405}
                      rounded={'xl'}
                      overflow={'hidden'}
                    >
                      <Box w={'100%'} h={131} position={'relative'}>
                        <Image
                          src={'/mor-featured-nav-header.jpg'}
                          fill={true}
                          alt='mor image header'
                        />
                      </Box>
                      <Stack p={6}>
                        <Heading as='h2' size='xl' mb={4} color='green.300'>
                          {navItem.featured.title}
                        </Heading>
                        <Text>{navItem.featured.description}</Text>
                      </Stack>
                    </Box>
                  )}

                  {navItem.isGrid ? (
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                      {navItem.children.map(child => (
                        <GridItem w={268} key={child.label}>
                          <Heading as='h3' size='md' mb={2} display='flex' alignItems='center'>
                            {/* <Icon as={getIcon(child.label)} mr={2} /> */}
                            {child.label}
                          </Heading>
                          {child.children &&
                            child.children.map(subChild => (
                              <DesktopSubNav key={subChild.label} {...subChild} />
                            ))}
                        </GridItem>
                      ))}
                    </Grid>
                  ) : (
                    <Stack w={'100%'}>
                      {navItem.children.map(child => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  )}
                </Flex>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel, isExternal }: NavItem) => {
  return (
    <Box
      as='a'
      href={href}
      target={isExternal ? '_blank' : '_self'}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: 'background.surface.raised.base' }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text fontWeight={500}>{label}</Text>
          <Text fontSize={'sm'} opacity={'.7'}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  )
}

const MobileNav = () => {
  return (
    <Stack bg='background.surface.overlay.base' p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem: React.FC<NavItem> = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggle()
  }

  return (
    <Stack spacing={0} onClick={children ? handleToggle : undefined}>
      <Flex
        py={2}
        as={href ? 'a' : 'button'}
        {...(href ? { href } : {})}
        justifyContent='space-between'
        alignItems='center'
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition='all .25s ease-in-out'
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle='solid'
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align='start'
        >
          {children &&
            children.map(child =>
              child.children ? (
                <Box key={child.label} onClick={e => e.stopPropagation()}>
                  <MobileNavItem {...child} />
                </Box>
              ) : (
                <Box
                  as='a'
                  key={child.label}
                  py={2}
                  href={child.href}
                  // eslint-disable-next-line
                  onClick={(e: any) => e.stopPropagation()}
                >
                  {child.label}
                </Box>
              ),
            )}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: NavItem[]
  href?: string
  isExternal?: boolean
  isGrid?: boolean
  featured?: {
    title: string
    description?: string
  }
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'About Morpheus',
    children: [
      {
        label: 'About',
        href: '/about',
      },
      {
        label: 'MOR Token',
        href: '/mor-token',
      },
      {
        label: 'MOR Fair Launch',
        href: '/fair-launch',
      },
      {
        label: 'MOR20 Platform',
        href: '/MOR20',
      },
      {
        label: 'Morpheus Router',
        href: 'https://github.com/MorpheusAIs/Docs/blob/main/!KEYDOCS README FIRST!/Compute Providers/Morpheus Lumerin Model.md',
        isExternal: true,
      },
      {
        label: 'Whitepaper',
        href: '/whitepaper',
      },
      {
        label: 'Protection Fund',
        href: 'https://github.com/MorpheusAIs/Docs/blob/main/!KEYDOCS README FIRST!/Protection Fund Details.md',
        isExternal: true,
      },
    ],
  },
  {
    label: 'Ecosystem',
    href: '/ecosystem',
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Blog',
        href: '/blog',
      },
      {
        label: 'Media',
        href: '/media',
      },
      {
        label: 'Events',
        href: '/events',
      },
      {
        label: 'Docs',
        href: 'https://github.com/MorpheusAIs/Docs',
        isExternal: true,
      },
      {
        label: 'FAQs',
        href: '/faqs',
      },
      {
        label: 'Desktop Client',
        href: 'https://github.com/MorpheusAIs/moragents',
        isExternal: true,
      },
    ],
  },
  {
    label: 'Dashboards',
    isGrid: true,
    featured: {
      title: 'Dashboards',
      description:
        'Created by the community these dashboards make it easy to contribute to Morpheus or access Capital, Code, & Compute as a Builder.',
    },
    children: [
      {
        label: 'Capital',
        children: [
          {
            label: 'Deposit, Stake, Claim',
            subLabel: 'Manage your MOR tokens and rewards.',
            href: 'https://dashboard.mor.org/',
            isExternal: true,
          },
          {
            label: 'MOR20 Smart Contract Factory',
            subLabel: 'Create and deploy MOR20 tokens.',
            href: 'https://morpheus-dev.206.189.243.3.nip.io/#/mor20-ecosystem?network=testnet',
            isExternal: true,
          },
        ],
      },
      {
        label: 'Compute',
        children: [
          {
            label: 'Testnet Stats',
            subLabel: 'View real-time network performance metrics.',
            href: 'https://nirmaan-morpheous-dashboard.pages.dev/',
            isExternal: true,
          },
          {
            label: 'Register Compute Provider',
            subLabel: 'Contribute your computing resources.',
            href: 'https://github.com/MorpheusAIs/Morpheus-Lumerin-Node/blob/main/docs/00-overview.md',
            isExternal: true,
          },
        ],
      },
      {
        label: 'Code',
        children: [
          {
            label: 'Claim Rewards',
            subLabel: 'Access and claim your coding rewards for your contributions.',
            href: 'https://morlord.com/',
            isExternal: true,
          },
          {
            label: 'Register as Developer',
            subLabel: 'Join our developer community.',
            href: 'https://www.mor.software/',
            isExternal: true,
          },
        ],
      },
      {
        label: 'Builders',
        children: [
          {
            label: 'List your project',
            subLabel: 'Register your project to earn rewards',
            href: 'https://www.mor.builders/',
            isExternal: true,
          },
          {
            label: 'MOR Rewards & Staking',
            subLabel: 'Manage builder rewards and stakes',
            href: 'https://github.com/MorpheusAIs/Docs/blob/main/!KEYDOCS%20README%20FIRST!/FAQs%20%26%20Guides/Guides/MOR/Testnet/Builders%20Contract%20Testnet%20Guide.md',
            isExternal: true,
          },
        ],
      },
    ],
  },
]
