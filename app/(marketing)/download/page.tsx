'use client'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { FaApple, FaLinux, FaWindows } from 'react-icons/fa'
import rehypeMathjax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { MemoizedReactMarkdown } from '@/components/markdown/memorized-react-markdown'

const releaseBody = `
**After connecting Morpheus to your Meta Mask, you can test it by taking basic actions such as:**
 - "What is my balance?" 
 - "What is my address?" 
 - "Send ETH to Ethereum
   Address"

Morpheus doesn't have a connection to a block explorer or price oracles yet, so it can't answer general transactions questions. It just answers the above examples based on info from the Meta Mask wallet you connect.
Warnings:
- Review all transactions before approving them. The LLM makes mistakes, you have human wisdom.
- Seriously, double check all actions in the Meta Mask interface before sending money.
- This is an experimental release and the ETH Smart Agent may try and send your money into a black hole. 
- Gas costs are high on Ethereum. Consider testing out 0.0.6 using the Sepolia testnet or Arbitrum.

### Linux: There are now two linux builds (RPM and DEB)
https://storage.googleapis.com/get-morpheus/Morpheus-0.0.6-rpm.zip
sha fa811b823f80c6afc537b608edff99feb1bc68451c0bba9d22f7abedf5e66c0a
https://storage.googleapis.com/get-morpheus/Morpheus-0.0.6-deb.zip
sha 04044442119e4ab296ffa6c5d3ae297b178197b4855e42dcbd8a4634e2d8d8ad 

### Mac OS: For Intel & Apple M Series Silicon Chips
https://storage.googleapis.com/get-morpheus/morpheus-0.0.6-x64.dmg
004948f4dcc3702ea41f6050d0d3a86db2198e1ebfd599aca20a9a6cdefcd8e3  morpheus-0.0.6-x64.dmg
https://storage.googleapis.com/get-morpheus/morpheus-0.0.6-arm64.dmg
2179c229c8f1acca5b8c3e9a813d75f5a42b971c8aff555ad30f0a8ada9dbb1c  morpheus-0.0.6-arm64.dmg

### Windows:
https://storage.googleapis.com/get-morpheus/morpheus-0.0.6_x86_64_win.zip
Sha: 37cb37a7a8443da87541fb1896d9f23112fecff650e3cfc053d51938a1e326a3`

const downloads = [
  {
    icon: <FaApple />,
    name: 'Apple',
    files: [
      {
        name: 'Intel',
        link: 'https://storage.googleapis.com/get-morpheus/morpheus-0.0.6-x64.dmg',
        has: '004948f4dcc3702ea41f6050d0d3a86db2198e1ebfd599aca20a9a6cdefcd8e3 morpheus-0.0.6-x64.dmg',
      },
      {
        name: 'Apple Silicon',
        link: 'https://storage.googleapis.com/get-morpheus/morpheus-0.0.6-arm64.dmg',
        hash: '2179c229c8f1acca5b8c3e9a813d75f5a42b971c8aff555ad30f0a8ada9dbb1c morpheus-0.0.6-arm64.dmg',
      },
    ],
  },
  {
    icon: <FaLinux />,
    name: 'Linux',
    files: [
      {
        name: 'RPM',
        link: 'https://storage.googleapis.com/get-morpheus/Morpheus-0.0.6-rpm.zip',
        hash: 'sha fa811b823f80c6afc537b608edff99feb1bc68451c0bba9d22f7abedf5e66c0a',
      },
      {
        name: 'DEB',
        link: 'https://storage.googleapis.com/get-morpheus/Morpheus-0.0.6-deb.zip',
        hash: 'sha 04044442119e4ab296ffa6c5d3ae297b178197b4855e42dcbd8a4634e2d8d8ad',
      },
    ],
  },
  {
    icon: <FaWindows />,
    name: 'Windows',
    files: [
      {
        name: 'Download',
        link: 'https://storage.googleapis.com/get-morpheus/morpheus-0.0.6_x86_64_win.zip',
        hash: 'Sha: 37cb37a7a8443da87541fb1896d9f23112fecff650e3cfc053d51938a1e326a3',
      },
    ],
  },
]

export default function Home() {
  return (
    <Container maxWidth='container.md'>
      <Stack gap={12} mt={24}>
        <Heading textAlign='center'>Download Morpheus</Heading>
        <Card
          borderWidth={1}
          borderColor='border.base'
          bg='background.surface.raised.base'
          backdropFilter='blur(10px)'
        >
          <CardHeader gap={4} display='flex' flexDir='column'>
            <Heading as='h2' size='md'>
              Morpheus 0.0.6 Version Release Notes: Mac + Linux + Windows Installs
            </Heading>
            <Text>
              This is the first version of Morpheus that brings together an open source LLM
              (defaults to Llama2) + connecting a user’s Metamask wallet + executing on chain
              transactions via a ETH focused Smart Agent.
            </Text>
            <Text>Pick any of the supported platforms to install Morpheus.</Text>
          </CardHeader>
          <CardBody display='flex' flexDir={{ base: 'column', md: 'row' }} gap={2} flexWrap='wrap'>
            {downloads.map(download => {
              return (
                <Card variant='outline' flex={1} key={download.name} bg='whiteAlpha.50'>
                  <CardBody>
                    {download.icon}
                    {download.name}
                  </CardBody>
                  <CardBody display='flex' flexDir='column' justifyContent='flex-start' gap={2}>
                    {download.files.map(file => (
                      <Button key={file.hash} as={Link} href={file.link} isExternal>
                        {file.name}
                      </Button>
                    ))}
                  </CardBody>
                </Card>
              )
            })}
          </CardBody>
          <CardFooter flexDir='column' gap={2}>
            <MemoizedReactMarkdown
              className='prose dark:prose-invert flex-1'
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeMathjax]}
              components={{
                a({ children, href }) {
                  return (
                    <Link href={href} isExternal color='text.link'>
                      {children}
                    </Link>
                  )
                },
                h1({ children }) {
                  return (
                    <Heading as='h1' mb={4}>
                      {children}
                    </Heading>
                  )
                },
                h2({ children }) {
                  return (
                    <Heading as='h2' fontSize='lg' mb={4}>
                      {children}
                    </Heading>
                  )
                },
                h3({ children }) {
                  return (
                    <Heading as='h3' fontSize='mg' mb={4}>
                      {children}
                    </Heading>
                  )
                },
                p({ children }) {
                  return <Text mb={4}>{children}</Text>
                },
                ul({ children }) {
                  return <UnorderedList mb={4}>{children}</UnorderedList>
                },
                table({ children }) {
                  return (
                    <table className='border-collapse border border-black px-3 py-1 dark:border-white'>
                      {children}
                    </table>
                  )
                },
                th({ children }) {
                  return (
                    <th className='break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white'>
                      {children}
                    </th>
                  )
                },
                td({ children }) {
                  return (
                    <td className='break-words border border-black px-3 py-1 dark:border-white'>
                      {children}
                    </td>
                  )
                },
              }}
            >
              {releaseBody}
            </MemoizedReactMarkdown>
          </CardFooter>
        </Card>
      </Stack>
    </Container>
  )
}
