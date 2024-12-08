import { Box, Center } from '@chakra-ui/react'
import React from 'react'

const BluredBox = ({children,className , p}) => {
  return (
   <Box className={`h-[100vh] pt-2 ${className}`}>
     <Center className={`backdrop-blur-md bg-black bg-opacity-10 rounded-md`}>
        {children}
    </Center>
   </Box>
  )
}

export default BluredBox