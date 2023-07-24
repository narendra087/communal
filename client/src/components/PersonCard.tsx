import React from 'react'
import { Avatar, Box, Flex, Text, IconButton, Tooltip, Link } from '@chakra-ui/react'
import { FiUserPlus, FiUserMinus } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SET_FRIENDS } from 'stores/slices/authSlice'

interface IComponent {
  personId: string,
  name: string,
  image: string,
  address: string,
}

const API_URL = process.env.REACT_APP_API_URL

const PersonCard = ({ personId, name, image, address }: IComponent) => {
  const user = useSelector((state:any) => state?.auth?.user)
  const token = useSelector((state:any) => state?.auth?.token)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const isFriend  = user?.friends.find((friend:any) => friend?._id === personId)
  
  const updateFriend = async() => {
    try {
      const res = await axios.patch(API_URL + `/users/${user?._id}/${personId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      dispatch(SET_FRIENDS({friends: res.data}))
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
      <Flex gap={'.5rem'} alignItems={'center'}>
        <Avatar name={name} src={`${API_URL}/assets/${image}`} />
        <Box>
          <Link
            href={`/profile/${personId}`}
            fontWeight={500}
          >{name}</Link>
          <Text fontSize={'sm'} color={'gray.500'}>{address}</Text>
        </Box>
      </Flex>
      
      {(personId !== user?._id) &&
        <Box>
          <Tooltip label={isFriend ? 'Unfriend' : 'Add friend'}>
            <IconButton
              isRound aria-label='Add friends'
              icon={!isFriend ? <FiUserPlus /> : <FiUserMinus />}
              onClick={() => updateFriend()}
              variant={'solid'}
            />
          </Tooltip>
        </Box>
      }
    </Flex>
  )
}

export default PersonCard