import React from 'react'
import { Avatar, Flex, VStack, Box, Text, IconButton, Divider, Image, Button } from '@chakra-ui/react'
import { FiUserPlus, FiUserMinus, FiShare2 } from 'react-icons/fi'
import { BiHeart, BiSolidHeart, BiMessageDetail } from 'react-icons/bi'

import CardWrapper from 'components/CardWrapper'
import PersonCard from 'components/PersonCard'

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
        <PersonCard
          personId={post?.userId}
          name={fullName}
          image={post?.userImgPath}
          address={post?.address}
        />
        
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
          <Flex alignItems={'center'} gap={'.5rem'}>
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