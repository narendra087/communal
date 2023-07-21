import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react'
import { BiEditAlt } from 'react-icons/bi'

import { Formik, Field } from 'formik'
import * as yup from 'yup'

import { useNavigate } from 'react-router-dom'
import Dropzone from 'react-dropzone'

import axios from 'axios'

interface IRegister {
  firstName: string
  lastName: string
  address: string
  occupation: string
  image: any
  email: string
  password: string
  confirmPassword: string
}

const registerChema = yup.object().shape({
  firstName: yup.string().min(2, 'This field must contain 2-50 characters').required('This field is required.'),
  lastName: yup.string().min(2, 'This field must contain 2-50 characters').required('This field is required.'),
  address: yup.string().required('This field is required.'),
  occupation: yup.string().required('This field is required.'),
  image: yup.string().required('This field is required.'),
  email: yup.string().email('Please enter valid email address.').required('This field is required.'),
  password: yup.string().min(8, 'This field must contain 8-16 characters').required('This field is required.'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Password doesn`t match'),
})

const initialValuesRegister: IRegister = {
  firstName: '',
  lastName: '',
  address: '',
  occupation: '',
  image: null,
  email: '',
  password: '',
  confirmPassword: '',
}

const API_URL = process.env.REACT_APP_API_URL

const RegisterForm = () => {
  const navigate = useNavigate()
  const toast = useToast()
  
  const handleRegisterUser = async(values: any, actions: any) => {
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('imgPath', values?.image?.name)
    
    try {
      await axios.post(API_URL + '/auth/register', formData)
      
      actions?.resetForm()
      toast({
        title: 'Account Created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
      navigate('#login')
    } catch (err) {
      toast({
        title: 'Account Creation Failed.',
        description: "Please try again later or you can contact our team.",
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
          onSubmit={(values, actions) => handleRegisterUser(values, actions)}
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
                <Dropzone
                  accept={{
                    'image/png': ['.png'],
                    'image/jpg': ['.jpg'],
                    'image/jpeg': ['.jpeg'],
                  }}
                  maxFiles={1}
                  onDrop={(acceptedFiles) => 
                    setFieldValue('image', acceptedFiles[0])
                  }
                >
                  {({getRootProps, getInputProps}) => (
                    <Box
                      {...getRootProps()}
                      border={'1px solid'}
                      borderColor={'telegram.500'}
                      p={'1rem'}
                      w={'100%'}
                      borderRadius={'.5rem'}
                      _hover={{
                        cursor:'pointer',
                      }}
                    >
                      <input {...getInputProps()} />
                      { !values.image ? (
                        <Text>Add Profile Picture</Text>
                      ) : (
                        <Flex alignItems={'center'} justifyContent={'space-between'}>
                          <Text>{values.image?.name}</Text>
                          <BiEditAlt />
                        </Flex>
                      )}
                    </Box>
                  )}
                </Dropzone>
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
                      placeholder='Enter your firstname'
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
                      placeholder='Enter your lastname'
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
                    placeholder='Enter your address'
                    maxLength={50}
                  />
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={!!errors.occupation && touched.occupation}>
                  <FormLabel htmlFor='occupation'>Occupation</FormLabel>
                  <Field
                    as={Input}
                    id='occupation'
                    name='occupation'
                    type='text'
                    variant='outline'
                    placeholder='Enter your occupation'
                    maxLength={50}
                  />
                  <FormErrorMessage>{errors.occupation}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor='email'>Email Address</FormLabel>
                  <Field
                    as={Input}
                    id='email'
                    name='email'
                    type='email'
                    variant='outline'
                    placeholder='Enter your email'
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
                    placeholder='Enter your password'
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
                    placeholder='Confirm your password'
                    maxLength={16}
                  />
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
                
                  <Button w={'100%'} mt={'1rem'} colorScheme='whatsapp' type='submit'>Register</Button>
                <Divider colorScheme='telegram' my={'1rem'} />
                
                <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'} gap={'1rem'}>
                  <Text flex={1}>Already have an account?</Text>
                  <Button
                    flex={1} w={'100%'}
                    colorScheme='telegram'
                    onClick={() => navigate('#login')}
                  >
                    Login
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

export default RegisterForm