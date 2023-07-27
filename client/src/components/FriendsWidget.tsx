import React from 'react'
import { VStack, Text, Divider, Center } from '@chakra-ui/react'

import CardWrapper from 'components/CardWrapper'
import PersonCard from 'components/PersonCard'

import { useSelector } from 'react-redux'

const FriendsWidget = () => {
  const friends = useSelector((state:any) => state?.auth?.user?.friends || [])
  
  const renderFriend = () => {
    return (
      <VStack spacing={4}>
        { friends.map((friend:any, index:number) => {
          const { _id, address, imgPath, firstName, lastName  } = friend
          const fullName = `${firstName} ${lastName}`
          return (
            <PersonCard
              key={_id + '_' + index}
              personId={_id}
              address={address}
              image={imgPath}
              name={fullName}
            />
          )
        })}
      </VStack>
    )
  }
  
  return (
    <CardWrapper>
      <>
        <Text fontWeight={500}>Friend List</Text>
        <Divider my={'1rem'} />
        { friends && friends.length ? (
          renderFriend()
        ) : (
          <Center color={'gray.500'} fontSize={'sm'}>You don't have friends yet.</Center>
        )}
        
      </>
    </CardWrapper>
  )
}

export default FriendsWidget