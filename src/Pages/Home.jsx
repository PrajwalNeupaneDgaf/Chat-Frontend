import React from 'react'
import BluredBox from '../Layout/BluredBox'
import { Box } from '@chakra-ui/react'
import WelcomeUser from '../Components/WelcomeUser'
import Users from '../Components/Users'


const Home = () => {
  return (
    <BluredBox p={['0','1rem','2rem','2rem']}>
       <Box minW={'21rem'}  className='grid' gridTemplateColumns={['1fr','1fr','1fr','1fr 1fr']}>
          <Box w={'100%'} borderRight={'1px solid white'}>
             <Users/>
          </Box>
          <Box borderLeft={'1px solid wheat'}  display={['none','none','none','block']}>
              <WelcomeUser/>
          </Box>
       </Box>
    </BluredBox>
  )
}

export default Home