import React from 'react'
import BluredBox from '../Layout/BluredBox'
import { Box } from '@chakra-ui/react'
import Users from '../Components/Users'
import WelcomeUser from '../Components/WelcomeUser'
import Chats from '../Components/Chats'

const Messages = () => {
  return (
    <BluredBox p={['0','1rem','2rem','2rem']}>
       <Box minW={'21rem'}  className='grid' gridTemplateColumns={['1fr','1fr','1fr','1fr 1fr']}>
          <Box display={['none','none','none','block']} w={'100%'} borderRight={'1px solid white'}>
             <Users/>
          </Box>
          <Box className='h-full' borderLeft={'1px solid wheat'}  >
             <Chats/>
          </Box>
       </Box>
    </BluredBox>
  )
}

export default Messages