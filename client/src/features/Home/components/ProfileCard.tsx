import { Avatar, Flex, VStack, HStack, Box, Text, IconButton, Divider } from '@chakra-ui/react'
import { LiaUserCogSolid } from 'react-icons/lia'
import { BiBriefcase, BiMap } from 'react-icons/bi'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CardWrapper from 'components/CardWrapper'

const API_URL = process.env.REACT_APP_API_URL

const ProfileCard = () => {
  const navigate = useNavigate()
  const user = useSelector((state:any) => state?.auth?.user)
  const fullName = user ? `${user?.firstName} ${user?.lastName}` : '-'
  
  return (
    <CardWrapper>
      <VStack spacing={4}>
        <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'}>
          <HStack alignItems={'center'} spacing={2}>
            <Avatar name={fullName} src={`${API_URL}/assets/${user?.imgPath}`} />
            <Box>
              <Text fontSize={'xl'} fontWeight={500} lineHeight={1}>{fullName}</Text>
              <Text fontSize={'sm'} lineHeight={1} mt={'.5rem'}>{user?.friends ? user.friends.length : '0'} friends</Text>
            </Box>
          </HStack>
          
          <IconButton aria-label='Profil page' icon={<LiaUserCogSolid />} onClick={() => navigate(`/profile/${user?._id}`)} />
        </Flex>
        
        <Divider borderColor={'telegram.300'} />
        
        <VStack spacing={3} w={'100%'}>
          <Flex w={'100%'} alignItems={'center'} gap={'.75rem'}>
            <BiMap size={'1.5rem'} />
            {user?.address || '-'}
          </Flex>
          <Flex w={'100%'} alignItems={'center'} gap={'.75rem'}>
            <BiBriefcase size={'1.5rem'} />
            {user?.occupation || '-'}
          </Flex>
        </VStack>
        
        <Divider borderColor={'telegram.300'} />
        
        <VStack spacing={3} w={'100%'}>
          <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'} gap={'.75rem'}>
            <Text fontSize={'sm'}>Who's viewed your profile</Text>
            <Text fontWeight={500}>{user?.profileViews || '0'}</Text>
          </Flex>
          <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'} gap={'.75rem'}>
            <Text fontSize={'sm'}>Impressions of your profile</Text>
            <Text fontWeight={500}>{user?.impressions || '0'}</Text>
          </Flex>
        </VStack>
      </VStack>
    </CardWrapper>
  )
}

export default ProfileCard