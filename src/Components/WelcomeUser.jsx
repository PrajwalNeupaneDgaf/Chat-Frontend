import { Box, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { getData } from '../Context/UserContext'

const WelcomeUser = () => {
  const {user} = getData()
  return (
    <Box className='flex flex-col w-[300px] gap-5 items-center align-middle justify-center h-full p-5 text-[#c9d7e4]'>
      <Heading size={'md'}>
        Welcome User {user?.fullName} 👋
      </Heading>
      <Heading size={'sm'}>
        Dear {user?.userName} you can search other user or Click on Chat to Start The Chat From The List.
      </Heading>
    </Box>
  )
}

export default WelcomeUser