import React from 'react'
import { Avatar, Flex, VStack, Box, Text, IconButton, Divider, Image, Button } from '@chakra-ui/react'
import { FiUserPlus, FiUserMinus, FiShare2 } from 'react-icons/fi'
import { BiHeart, BiSolidHeart, BiMessageDetail } from 'react-icons/bi'

import CardWrapper from 'components/CardWrapper'
import { useSelector } from 'react-redux'

interface IComponent {
  post: any
}

const API_URL = process.env.REACT_APP_API_URL

const PostCard = ({post}: IComponent) => {
  const user = useSelector((state:any) => state?.auth?.user)
  const fullName = `${post?.firstName} ${post?.lastName}`
  
  return (
    <CardWrapper>
      <VStack spacing={4}>
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
          <Flex gap={'.5rem'} alignItems={'center'}>
            <Avatar name={fullName} src={`${API_URL}/assets/${post?.userImgPath}`} />
            <Box>
              <Text fontWeight={500}>{fullName}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>{post?.address}</Text>
            </Box>
          </Flex>
          
          {(post?.userId !== user?._id) && <Box>
            <IconButton isRound aria-label='Add friends' icon={<FiUserPlus />} />
            {/* <IconButton isRound aria-label='Remove friends' icon={<FiUserMinus />} /> */}
          </Box>}
        </Flex>
        
        <Divider borderColor={'gray.300'} />
        
        <Box w={'100%'}>
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
        </Box>
        
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
          <Flex alignItems={'center'}>
            <Button fontWeight={'normal'} leftIcon={<BiHeart />}>{0}</Button>
            <Button fontWeight={'normal'} leftIcon={<BiMessageDetail />}>{post?.comments ? post.comments.length : 0}</Button>
          </Flex>
          <IconButton aria-label='Share' icon={<FiShare2 />} />
        </Flex>
      </VStack>
    </CardWrapper>
  )
}

export default PostCard