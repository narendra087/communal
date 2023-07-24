import { useEffect } from 'react'
import { Flex, Box, VStack, Divider } from '@chakra-ui/react'

import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { SET_POSTS } from 'stores/slices/authSlice'

import ProfileCard from './components/ProfileCard'
import PostFormCard from './components/PostFormCard'
import PostCard from './components/PostCard'

const API_URL = process.env.REACT_APP_API_URL

const HomePage = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state:any) => state?.auth?.posts)
  const token = useSelector((state:any) => state?.auth?.token)
  
  useEffect(() => {
    getPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getPosts = async() => {
    try {
      const res = await axios.get(API_URL + '/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(SET_POSTS({posts: res.data}))
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Flex gap={4} alignItems={'start'}>
      <Box flex={1}>
        <ProfileCard />
      </Box>
      <VStack flex={2} spacing={4}>
        <PostFormCard />
        <Divider borderColor={'gray.300'} />
        {
          posts?.map((post:any, index:number) => (
            <PostCard post={post} key={post?._id || index} />
          ))
        }
      </VStack>
      <Box flex={1}></Box>
    </Flex>
  )
}

export default HomePage