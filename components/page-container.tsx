import { Container, type ContainerProps } from '@chakra-ui/react'

export const PageContainer: React.FC<ContainerProps> = props => {
  return (
    <Container
      maxW={{ base: 'xl', md: '7xl' }}
      mx='auto'
      px={{ base: '6', md: '8' }}
      py={{ base: '16', md: '24' }}
      {...props}
    />
  )
}
