import React, { useState } from 'react'
import { Avatar, Flex, VStack, Box, Text, IconButton, Divider, Image, Button } from '@chakra-ui/react'
import { FiUserPlus, FiUserMinus, FiShare2 } from 'react-icons/fi'
import { BiHeart, BiSolidHeart, BiMessageDetail } from 'react-icons/bi'

import CardWrapper from 'components/CardWrapper'
import PersonCard from 'components/PersonCard'

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { SET_POSTS, UPDATE_POST } from 'stores/slices/authSlice'

interface IComponent {
  post: any
}

const API_URL = process.env.REACT_APP_API_URL

const PostCard = ({post}: IComponent) => {
  const dispatch = useDispatch()
  const user = useSelector((state:any) => state?.auth?.user)
  const token = useSelector((state:any) => state?.auth?.token)
  
  const [isComments, setIsComments] = useState(false)
  
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
  
  return (
    <CardWrapper>
      <VStack spacing={4}>
        <PersonCard
          personId={post?.userId}
          name={fullName}
          image={post?.userImgPath}
          address={post?.address}
        />
        
        <Divider borderColor={'gray.300'} />
        
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
      </VStack>
    </CardWrapper>
  )
}

export default PostCard