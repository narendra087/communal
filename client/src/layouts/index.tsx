import { Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import NavigationBar from './NavigationBar'

const Layout = () => {
  return (
    <>
      <NavigationBar />
      <Box
        minH={'calc(100vh - 4rem)'}
        p={'2rem'}
      >
        <Outlet />
      </Box>
    </>
  )
}

export default Layout