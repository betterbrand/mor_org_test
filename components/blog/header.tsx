import { Box, Heading, Stack } from '@chakra-ui/react'

export const BlogPageHeader = () => {
  return (
    <Box pt='8' pb='16'>
      <Stack spacing={{ base: '8', md: '10' }} align='center'>
        <Stack spacing={{ base: '4', md: '6' }} textAlign='center'>
          <Stack spacing='4'>
            <Heading size={{ base: 'md', md: 'lg' }}>Blog</Heading>
          </Stack>
        </Stack>

        {/* <Stack
          as='form'
          onSubmit={e => {
            e.preventDefault()
          }}
          direction={{ base: 'column', md: 'row' }}
          spacing='4'
          justify='center'
        >
          <Stack maxW={{ md: 'lg' }} flex='1'>
            <Input
              size='xl'
              type='email'
              required
              placeholder='Enter your email'
              autoComplete='false'
            />
            <Text fontSize='sm' textAlign={{ base: 'center', md: 'start' }} color='fg.subtle'>
              We care about your data in our privacy policy
            </Text>
          </Stack>
          <Button size='xl' colorScheme='blue' type='submit'>
            Subscribe
          </Button>
        </Stack> */}
      </Stack>
    </Box>
  )
}
