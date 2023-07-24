import React from 'react'
import { Box, BoxProps, useColorMode } from '@chakra-ui/react'

interface IComponents extends BoxProps {
  children: React.ReactElement
}

const CardWrapper = ({children, ...props}: IComponents) => {
  const mode = useColorMode()
  
  return (
    <Box
      padding={'1.5rem'}
      borderRadius={'.75rem'}
      bg={mode.colorMode === 'light' ? 'gray.100' : 'gray.900'}
      w={'100%'}
      {...props}
    >
      {children}
    </Box>
  )
}

export default CardWrapper