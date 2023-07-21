import React from 'react'
import { Box, useColorMode } from '@chakra-ui/react'

interface IComponents {
  children: React.ReactElement
}

const CardWrapper = ({children}: IComponents) => {
  const mode = useColorMode()
  console.log(mode)
  
  return (
    <Box
      padding={'1.5rem'}
      borderRadius={'.75rem'}
      bg={mode.colorMode === 'light' ? 'gray.100' : 'gray.900'}
    >
      {children}
    </Box>
  )
}

export default CardWrapper