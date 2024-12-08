import { Box, Center } from '@chakra-ui/react'
import React from 'react'

const Layout = ({children}) => {
  return (
    <Box bg={'gray.900'} className={'bg-no-repeat  bg-cover bg-center h-[100vh] max-w-[100%]'}>
        <Box as={Center} className='rounded-lg h-[100%] p-1 px-2 min-h-56'>
            {children}
        </Box>
    </Box>
  )
}

export default Layout