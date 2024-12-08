import React, { useEffect, useState } from 'react'
import Logout from './Logout'
import UserInfo from './UserInfo'
import SearchBar from './SearchBar'
import Me from './Me'
import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import axiosFetch from '../Utils/Axios'

const SearchUser = () => {
   const {query} = useParams()
   const [data, setdata] = useState([])
   useEffect(()=>{
      axiosFetch.get(`user/search/${query}`)
      .then(res => {
         setdata(res.data)
         })
         .catch(err => console.log(err))
         
   },[query])
  return (
    <Box className='text-white flex flex-col items-center justify-between h-full'>
    <Box className='flex flex-row justify-between w-full items-center pt-3'>
        <Box>
            <Me/>
        </Box>
        <Box>
           <SearchBar/>
        </Box>
    </Box>
    <Box>
       <UserInfo data={data} />
    </Box>
    <Box className='w-full px-5'>
       <Logout />
    </Box>
</Box>
  )
}

export default SearchUser