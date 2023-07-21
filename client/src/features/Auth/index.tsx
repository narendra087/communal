import { Flex, Text } from '@chakra-ui/react'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { useLocation } from 'react-router-dom'

const AuthPage = () => {
  const { hash } = useLocation()
  
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
            <Text fontWeight={500}>{hash === '#register' ? 'Join our' : 'Welcome to'}</Text>
            <Text
              fontSize={'5xl'}
              color={'telegram.500'}
              fontWeight={700}
              letterSpacing={5}
              lineHeight={1}
            >COMMUNAL</Text>
            <Text fontSize={'xl'} mt={'.5rem'}>
              Let the world hear your story!
            </Text>
          </Flex>
          
          { hash === '#register' ?
            <RegisterForm /> : <LoginForm />
          }
        </Flex>
      </Flex>
    </>
  )
}

export default AuthPage