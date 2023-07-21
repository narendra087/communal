import React, { useState } from 'react'
import { Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from '@chakra-ui/react'

import { Formik, Field } from 'formik'
import * as yup from 'yup'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

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

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleFormSubmit = async(values: ILogin, actions: any) => {
    console.log(values, actions)
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
          onSubmit={(values, actions) => handleFormSubmit(values, actions)}
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
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                
                <Button w={'100%'} mt={'1rem'} colorScheme='telegram' type='submit'>Login</Button>
                <Divider colorScheme='telegram' my={'1rem'} />
                
                <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'} gap={'1rem'}>
                  <Text flex={1}>Doesn't have an account?</Text>
                  <Button flex={1} w={'100%'} m={'0 auto'} colorScheme='whatsapp'>Register</Button>
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