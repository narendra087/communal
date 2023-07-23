import React, { useState } from 'react'
import { Avatar, Box, Textarea, Button, Divider, Flex, HStack, Text, VStack, IconButton, Tooltip, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { FiImage  } from 'react-icons/fi'
import Dropzone from 'react-dropzone'

import { useDispatch, useSelector } from 'react-redux'
import { SET_POSTS } from 'stores/slices/authSlice'

import CardWrapper from 'components/CardWrapper'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const PostFormCard = () => {
  const dispatch = useDispatch()
  const user = useSelector((state:any) => state?.auth?.user)
  const token = useSelector((state:any) => state?.auth?.token)
  
  const [withImage, setWithImage] = useState(false)
  
  const [story, setStory] = useState('')
  const [image, setImage] = useState<File | undefined>()
  
  const toggleImage = (value: boolean) => {
    if (!value) {
      setImage(undefined)
    }
    setWithImage(value)
  }
  
  const handleUploadImage = (images: File[]) => {
    const renamedImages = images.map((file) => (
      new File([file], `${new Date().getTime()}_${file.name}`, {type: file.type})
    ))
    setImage(renamedImages[0])
  }
  
  const handlePost = async() => {
    const formData = new FormData()
    formData.append('userId', user?._id)
    formData.append('description', story)
    if (image) {
      formData.append('postImgPath', image.name)
      formData.append('image', image)
    }
    
    try {
      const res = await axios.post(API_URL + '/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      dispatch(SET_POSTS({posts: res.data}))
      setImage(undefined)
      if (image) {
        toggleImage(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <CardWrapper>
      <VStack spacing={4}>
        <Flex alignItems={'start'} gap={'1rem'} w={'100%'}>
          <Avatar size={'sm'} name={user?.firstName + ' ' + user?.lastName} src={`${API_URL}/assets/${user?.imgPath}`} />
          <FormControl>
            <Textarea
              placeholder='Spill your story...'
              size={'lg'}
              variant={'outlined'}
              resize={'none'}
              onChange={(e) => setStory(e.target.value)}
              value={story}
            />
          </FormControl>
        </Flex>
        
        {withImage && <Box w={'100%'}>
          <Dropzone
            accept={{
              'image/png': ['.png'],
              'image/jpg': ['.jpg'],
              'image/jpeg': ['.jpeg'],
            }}
            maxFiles={1}
            onDrop={(acceptedFiles) => handleUploadImage(acceptedFiles)}
          >
            {({getRootProps, getInputProps}) => (
              <Box
                {...getRootProps()}
                border={'1px dashed'}
                borderColor={'telegram.500'}
                p={'1rem'}
                w={'100%'}
                borderRadius={'.5rem'}
                _hover={{
                  cursor:'pointer',
                }}
              >
                <input {...getInputProps()} />
                { !image ? (
                  <Text color={'gray.500'}>Choose or drop your image here...</Text>
                ) : (
                  <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <Text>{image?.name}</Text>
                  </Flex>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>}
        
        <Divider borderColor={'telegram.300'} />
        
        <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'} gap={'1rem'}>
          <Flex w={'100%'} alignItems={'center'} gap={'.5rem'}>
            <Text>Add to your story : </Text>
            <Tooltip hasArrow label='Image'>
              <IconButton
                aria-label='Add Image'
                icon={<FiImage />}
                variant={withImage ? 'outline' : 'ghost'}
                onClick={() => toggleImage(false)}
                colorScheme={withImage ? 'telegram' : undefined}
                p={0}
                isRound
              />
            </Tooltip>
          </Flex>
          <Flex w={'100%'} alignItems={'center'} justifyContent={'flex-end'}>
            <Button
              colorScheme='telegram'
              onClick={handlePost}
              isDisabled={!story && !image}
            >Send</Button>
          </Flex>
        </Flex>
      </VStack>
    </CardWrapper>
  )
}

export default PostFormCard