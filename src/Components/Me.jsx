import { Avatar, Box, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getData } from '../Context/UserContext'
import axiosFetch from '../Utils/Axios'
import {useNavigate} from 'react-router-dom'

const Me = () => {
const navigate = useNavigate()
  const [ user, setUser ] = useState()
  useEffect(()=>{
    axiosFetch('user/me')
    .then(res => setUser(res.data))
    .catch(err => console.log(err))
  },[])
  return (
    <Box className='flex flex-row gap-1 cursor-default justify-center items-center'>
        <Avatar onClick={()=>{
      navigate('/')
    }
        } src={user?.avatar} className='h-32 w-32' >
            
        </Avatar>
        <Box className='text-xs'>
            {user?.fullName}
        </Box>
    </Box>
  )
}

export default Me
