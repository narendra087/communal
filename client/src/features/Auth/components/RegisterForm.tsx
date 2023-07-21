import React, { useState } from 'react'
import { Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react'

import { Formik, Field } from 'formik'
import * as yup from 'yup'

import { useNavigate } from 'react-router-dom'

interface IRegister {
  firstName: string
  lastName: string
  address: string
  email: string
  password: string
  confirmPassword: string
}

const registerChema = yup.object().shape({
  firstName: yup.string().min(2, 'This field must contain 2-50 characters').required('This field is required.'),
  lastName: yup.string().min(2, 'This field must contain 2-50 characters').required('This field is required.'),
  address: yup.string().required('This field is required.'),
  email: yup.string().email('Please enter valid email address.').required('This field is required.'),
  password: yup.string().min(8, 'This field must contain 8-16 characters').required('This field is required.'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Password doesn`t match'),
})

const initialValuesRegister: IRegister = {
  firstName: '',
  lastName: '',
  address: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const RegisterForm = () => {
  const navigate = useNavigate()
  
  const handleFormSubmit = async(values: IRegister, actions: any) => {
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
          initialValues={initialValuesRegister}
          validationSchema={registerChema}
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
                <HStack spacing={4} align={'flex-start'}>
                  <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                    <FormLabel htmlFor='firstName'>Firstname</FormLabel>
                    <Field
                      as={Input}
                      id='firstName'
                      name='firstName'
                      type='text'
                      variant='outline'
                      maxLength={50}
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                    <FormLabel htmlFor='lastName'>Lastname</FormLabel>
                    <Field
                      as={Input}
                      id='lastName'
                      name='lastName'
                      type='text'
                      variant='outline'
                      maxLength={50}
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  </FormControl>
                </HStack>
                
                <FormControl isInvalid={!!errors.address && touched.address}>
                  <FormLabel htmlFor='address'>Address</FormLabel>
                  <Field
                    as={Input}
                    id='address'
                    name='address'
                    type='text'
                    variant='outline'
                    maxLength={50}
                  />
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor='email'>Email Address</FormLabel>
                  <Field
                    as={Input}
                    id='email'
                    name='email'
                    type='email'
                    variant='outline'
                    maxLength={50}
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
                    maxLength={16}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                  <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                  <Field
                    as={Input}
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    variant='outline'
                    maxLength={16}
                  />
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
                
                  <Button w={'100%'} mt={'1rem'} colorScheme='whatsapp' type='submit'>Register</Button>
                <Divider colorScheme='telegram' my={'1rem'} />
                
                <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'} gap={'1rem'}>
                  <Text flex={1}>Already have an account?</Text>
                  <Button flex={1} w={'100%'}  colorScheme='telegram'>Login</Button>
                </Flex>
              </VStack>
            </form>
          )}
        </Formik>
      </Flex>
    </Flex>
  )
}

export default RegisterForm