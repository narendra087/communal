import {
  useColorMode,
  useColorModeValue,
  Box,
  Flex,
  Stack,
  Button,
  Menu,
  MenuButton,
  Avatar,
  Center,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { BiMoon, BiSun } from 'react-icons/bi'

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_LOGOUT } from 'stores/slices/authSlice';

const NavigationBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state:any) => state?.auth?.user)
  
  const logoutHandler = () => {
    console.log('logout')
    dispatch(SET_LOGOUT())
    
    navigate('/')
  }
  
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} maxH={'4rem'}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Text fontWeight={700} fontSize={'xl'}>COMMUNAL</Text>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <BiMoon /> : <BiSun />}
            </Button>

            {user && <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </Center>
                <br />
                <Center>
                  <p>{user?.firstName} {user?.lastName}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem onClick={() => logoutHandler()}>Logout</MenuItem>
              </MenuList>
            </Menu>}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}

export default NavigationBar