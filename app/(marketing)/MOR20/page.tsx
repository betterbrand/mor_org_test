'use client'

import '../../formik.css'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Heading,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react'
import Script from 'next/script'
import { FaDiscord } from 'react-icons/fa'
import { FaCoins, FaGithub } from 'react-icons/fa6'

export default function Home() {
  return (
    <Container maxWidth='container.md'>
      <Script src='https://f.convertkit.com/ckjs/ck.5.js' />
      <Stack gap={12} my={24}>
        <Heading textAlign='center'>
          With over 100K+ staked ETH, Morpheus has proven a new Fair Launch model
        </Heading>
        <Text fontSize='lg' textAlign='center' whiteSpace='pre-line'>
          The MOR Token leverages the new MOR20 Fair Launch Platform, which ensures perfect
          alignment between capital, coders, and ecosystem projects.
        </Text>
        <Card
          borderWidth={1}
          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.50')}
          backdropFilter='blur(10px)'
        >
          <CardBody display='flex' flexDir='column' fontSize='sm' gap={4}>
            <Text fontSize='lg'>
              The Morpheus community built a developer preview, launched, and became the 6th largest
              wallet of stETH with 100,000 ETH ($300M) contributed in less than 60 days with zero
              pre-mine, VC capital, or influencer shilling.
            </Text>
            <Text fontSize='lg'>
              Enter your email below and developers can walk you through how MOR20 can help you
              launch your project.
            </Text>
            <Button
              as={Link}
              isExternal
              leftIcon={<FaDiscord />}
              href='https://discord.com/channels/1151741790408429580/1228219372317966409'
            >
              Join The Community
            </Button>
            <Button
              as={Link}
              isExternal
              leftIcon={<FaGithub />}
              href='https://github.com/MorpheusAIs/MOR20'
            >
              Github repository
            </Button>
            <Button
              as={Link}
              isExternal
              leftIcon={<FaCoins />}
              href='https://morpheus-dev.206.189.243.3.nip.io/#/mor20-ecosystem?network=testnet'
            >
              Create Your MOR20 Token Now
            </Button>
          </CardBody>
          <CardFooter flexDir='column'>
            <Heading as='h4' size='sm'>
              MOR20 TL;DR
            </Heading>
            <UnorderedList spacing={4} my={4}>
              <ListItem>
                Any project inside or even outside the context of Web3 & AI, can use MOR20 to
                bootstrap their project with the push of a button.
              </ListItem>
              <ListItem>
                The use the MOR20 Smart Contracts to collect stETH in order to provide Automated
                Recurring Revenue (ARR) to the project is a compelling new framework
              </ListItem>
              <ListItem>
                Easily create a fair launch for projects, fair price discovery mechanism and access
                the large network effect of the Morpheus community.
              </ListItem>
              <ListItem>
                This model can be extended to many software as a service projects as a means of
                building recurring revenue / payments from users via yield.
              </ListItem>
              <ListItem>
                stETH is currently generating about 3.5% yield APR. Of that 3.5%, the MOR20 platform
                keeps 0.35% with the remaining 3.15% yield flowing to the MOR20 project.
              </ListItem>
              <ListItem>
                This yield collected is added to the Morpheus Protocol Liquidity and provides on
                going support for further Dashboards, Smart Contract development and audits.
              </ListItem>
              <ListItem>
                This adds to the Network Effect of Morpheus when it comes to bootstraping new
                projects, growing liquidity for all MOR20 Smart Contract users.
              </ListItem>
            </UnorderedList>
            <Link
              mt={4}
              isExternal
              href='https://github.com/MorpheusAIs/Docs/blob/main/!KEYDOCS%20README%20FIRST!/Capital%20Providers%2C%20MOR20%2C%20TCM/Techno%20Capital%20Machine%20(TCM).md'
            >
              Read more about the MOR20 Fair Launch Platform here
            </Link>
          </CardFooter>
        </Card>
      </Stack>
    </Container>
  )
}
