import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import Me from './Me'
import UserInfo from './UserInfo'
import Logout from './Logout'
import axiosFetch from '../Utils/Axios'

const Users = () => {
  const [data, setdata] = useState([])
  useEffect(()=>{
    axiosFetch('message/getmychatlist')
    .then(res => {
      console.log(res.data.chatList)
      setdata(res.data.chatList)
      })
      .catch(err=>{
        console.log(err)
      })
      
  },[])
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
           <UserInfo  data = {data}/>
        </Box>
        <Box className='w-full px-5'>
           <Logout />
        </Box>
    </Box>
  )
}

export default Users