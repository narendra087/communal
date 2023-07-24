import React, { useState } from 'react'
import { Avatar, Box, Textarea, Button, Divider, Flex, HStack, Text, VStack, IconButton, Tooltip, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { FiImage, FiTrash } from 'react-icons/fi'
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
      setStory('')
      if (withImage) {
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
          <Textarea
            placeholder='Spill your story...'
            size={'lg'}
            variant={'outlined'}
            resize={'none'}
            onChange={(e) => setStory(e.target.value)}
            value={story}
          />
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
              <Flex gap={'1rem'} alignItems={'center'}>
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
                
                {image && (
                  <IconButton
                    colorScheme='red'
                    aria-label='Remove image'
                    icon={<FiTrash />}
                    onClick={() => setImage(undefined)}
                  />
                )}
              </Flex>
            )}
          </Dropzone>
        </Box>}
        
        <Divider />
        
        <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'} gap={'1rem'}>
          <Flex w={'100%'} alignItems={'center'} gap={'.5rem'}>
            <Text>Add to your story : </Text>
            <Tooltip hasArrow label='Image'>
              <IconButton
                aria-label='Add Image'
                icon={<FiImage />}
                variant={withImage ? 'outline' : 'ghost'}
                onClick={() => toggleImage(!withImage)}
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
            >POST</Button>
          </Flex>
        </Flex>
      </VStack>
    </CardWrapper>
  )
}

export default PostFormCard