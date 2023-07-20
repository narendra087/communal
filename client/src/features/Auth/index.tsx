import { Box, Flex, Text } from '@chakra-ui/react'

import LoginForm from './components/LoginForm'

const AuthPage = () => {
  return (
    <>
      <Flex
        minH={'100vh'}
        p={'5rem'}
        m={'0 auto'}
        maxW={'1000px'}
        w={'100%'}
      >
        <Flex flexDirection={'row'} gap={'2rem'} w={'100%'}>
          <Flex justifyContent={'center'} flexDirection={'column'} flex={1}>
            <Text
              fontSize={'5xl'}
              color={'cyan.500'}
              fontWeight={700}
              letterSpacing={5}
            >COMMUNAL</Text>
            <Text fontSize={'2xl'}>
              Let the world hear your Story!
            </Text>
          </Flex>
          
          <LoginForm />
        </Flex>
      </Flex>
    </>
  )
}

export default AuthPage