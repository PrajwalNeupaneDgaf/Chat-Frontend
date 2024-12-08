import { Box, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { getData } from '../Context/UserContext'

const SearchSide = () => {
  const {user} = getData()
  return (
    <Box className='flex flex-col w-[300px] gap-5 items-center align-middle justify-center h-full p-5 text-[#c9d7e4]'>
    <Heading size={'md'}>
      Welcome User {user.fullName} 👋 To search Page
    </Heading>
    <Heading size={'sm'}>
      Dear {user.userName} your Search Results are there You Can kindly click there and start the chatting .
    </Heading>
  </Box>
  )
}

export default SearchSide