import { Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack, useToast } from '@chakra-ui/react'

import { Formik, Field } from 'formik'
import * as yup from 'yup'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'

import { SET_LOGIN } from 'stores/slices/authSlice'

interface ILogin {
  email: string,
  password: string
}

const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email address.').required('This field is required.'),
  password: yup.string().required('This field is required.'),
})

const initialValuesLogin: ILogin = {
  email: '',
  password: '',
}

const API_URL = process.env.REACT_APP_API_URL

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  
  const handleLoginUser = async(values: any, actions: any) => {
    try {
      const res = await axios.post(API_URL + '/auth/login', values)
      
      dispatch(
        SET_LOGIN({
          user: res.data.user,
          token: res.data.token,
        })
      )
      actions?.resetForm()
      navigate('/home')
    } catch (err) {
      toast({
        title: 'Login Failed.',
        description: "Please check your email and password.",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }
  
  return (
    <Flex
      flex={1}
      alignItems={'center'}
      py={'2rem'}
      w={'100%'}
    >
      <Flex
        borderRadius={'.5rem'}
        border={'1px solid'}
        borderColor={'telegram.500'}
        flexDirection={'column'}
        p={'2rem'}
        w={'100%'}
        h={'max-content'}
      >
        <Formik
          onSubmit={(values, actions) => handleLoginUser(values, actions)}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm
          }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align={'flex-start'}>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor='email'>Email Address</FormLabel>
                  <Field
                    as={Input}
                    id='email'
                    name='email'
                    type='email'
                    variant='outline'
                    placeholder='Enter your email'
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Field
                    as={Input}
                    id='password'
                    name='password'
                    type='password'
                    variant='outline'
                    placeholder='Enter your password'
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                
                <Button w={'100%'} mt={'1rem'} colorScheme='telegram' type='submit'>Login</Button>
                <Divider borderColor={'gray.300'} my={'1rem'} />
                
                <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'} gap={'1rem'}>
                  <Text flex={1}>Doesn't have an account?</Text>
                  <Button
                    flex={1}
                    w={'100%'}
                    m={'0 auto'}
                    colorScheme='whatsapp'
                    onClick={() => navigate('#register')}
                  >
                    Register
                  </Button>
                </Flex>
              </VStack>
            </form>
          )}
        </Formik>
      </Flex>
    </Flex>
  )
}

export default LoginForm