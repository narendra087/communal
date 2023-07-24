import React, { useState } from 'react'
import { Flex, VStack, Text, IconButton, Divider, Image, Button, Avatar, Input, Center, Box } from '@chakra-ui/react'
import { FiShare2, FiSend } from 'react-icons/fi'
import { BiHeart, BiSolidHeart, BiMessageDetail } from 'react-icons/bi'

import CardWrapper from 'components/CardWrapper'
import PersonCard from 'components/PersonCard'

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { UPDATE_POST } from 'stores/slices/authSlice'

interface IComponent {
  post: any
}

const API_URL = process.env.REACT_APP_API_URL

const PostCard = ({post}: IComponent) => {
  const dispatch = useDispatch()
  const user = useSelector((state:any) => state?.auth?.user)
  const token = useSelector((state:any) => state?.auth?.token)
  
  const [isComments, setIsComments] = useState(false)
  const [comment, setComment] = useState('')
  
  const fullName = `${post?.firstName} ${post?.lastName}`
  const isLiked = Boolean(post?.likes[user?._id])
  const likeCount = Object.keys(post?.likes || {}).length
  
  const updateLike = async() => {
    try {
      const res = await axios.patch(API_URL + `/posts/${post?._id}/like`, JSON.stringify({userId: user?._id}), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      
      dispatch(UPDATE_POST({post: res.data}))
    } catch (error) {
      console.log(error)
    }
  }
  
  const postComment = async() => {
    const payload = {
      userId: user?._id,
      comment,
    }
    
    try {
      const res = await axios.patch(API_URL + `/posts/${post?._id}/comment`, JSON.stringify(payload), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      
      setComment('')
      dispatch(UPDATE_POST({post: res.data}))
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <CardWrapper>
      <VStack spacing={4}>
        <PersonCard
          personId={post?.userId}
          name={fullName}
          image={post?.userImgPath}
          address={post?.address}
        />
        
        <Divider />
        
        <Flex w={'100%'} flexDirection={'column'} gap={'.5rem'}>
          <Text>{post?.description}</Text>
          {post?.postImgPath ? (
            <Image
              src={`${API_URL}/assets/${post.postImgPath}`}
              objectFit={'cover'}
              w={'100%'}
              borderRadius={'.5rem'}
            />
          ) : (
            null
          )}
        </Flex>
        
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
          <Flex alignItems={'center'} gap={'.5rem'}>
            <Button
              onClick={() => updateLike()}
              fontWeight={'normal'}
              leftIcon={isLiked ? <BiSolidHeart color='#0088CC' /> : <BiHeart />}
            >{likeCount}</Button>
            <Button
              fontWeight={'normal'}
              leftIcon={<BiMessageDetail />}
              onClick={() => setIsComments(!isComments)}
              variant={isComments ? 'outline' : undefined}
              borderColor={isComments ? 'telegram.500' : undefined}
              color={isComments ? 'telegram.500' : undefined}
            >{post?.comments ? post.comments.length : 0}</Button>
          </Flex>
          <IconButton aria-label='Share' icon={<FiShare2 />} />
        </Flex>
        
        { isComments && (
          <VStack w={'100%'} spacing={4}>
            <Divider />
            <Flex alignItems={'center'} gap={'1rem'} w={'100%'}>
              <Avatar size={'sm'} name={user?.firstName + ' ' + user?.lastName} src={`${API_URL}/assets/${user?.imgPath}`} />
              <Input
                placeholder='Comment this story ...'
                variant={'outlined'}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <IconButton
                isDisabled={!comment}
                aria-label='Send comment'
                icon={<FiSend />}
                onClick={() => postComment()}
              />
            </Flex>
            <Divider />
            {post?.comments.length ? (
              <VStack spacing={2} divider={<Divider />} w={'100%'}>
                { post?.comments.map((dt:any, i:number) => (
                  <Flex key={`${post?._id}-${i}`} w={'100%'} gap={'1rem'} alignItems={'start'}>
                    <Avatar size={'sm'} name={dt?.name} src={`${API_URL}/assets/${dt?.imgPath}`} />
                    <Box>
                      <Text fontWeight={500}>{dt?.name}</Text>
                      <Text>{dt?.comment || '-'}</Text>
                    </Box>
                  </Flex>
                ))}
              </VStack>
            ) : (
              <Center color={'gray.500'}>No Comment yet.</Center>
            )}
          </VStack>
        )}
      </VStack>
    </CardWrapper>
  )
}

export default PostCard