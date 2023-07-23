import { Flex, Box } from '@chakra-ui/react'

import ProfileCard from './components/ProfileCard'
import PostFormCard from './components/PostFormCard'

const HomePage = () => {
  return (
    <Flex gap={4}>
      <Box flex={1}>
        <ProfileCard />
      </Box>
      <Box flex={2}>
        <PostFormCard />
      </Box>
      <Box flex={1}></Box>
    </Flex>
  )
}

export default HomePage