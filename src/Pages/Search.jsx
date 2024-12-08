import React from 'react'

import SearchSide from '../Components/SearchSide'
import BluredBox from '../Layout/BluredBox'
import { Box } from '@chakra-ui/react'
import SearchUser from '../Components/SearchUser'

const Search = () => {
  return (
    <BluredBox p={['0','1rem','2rem','2rem']}>
    <Box minW={'21rem'}  className='grid' gridTemplateColumns={['1fr','1fr','1fr','1fr 1fr']}>
       <Box w={'100%'} borderRight={'1px solid white'}>
          <SearchUser/>
       </Box>
       <Box borderLeft={'1px solid wheat'}  display={['none','none','none','block']}>
           <SearchSide/>
       </Box>
    </Box>
 </BluredBox>
  )
}

export default Search