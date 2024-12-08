import { Box } from '@chakra-ui/react'
import React from 'react'
import { LuLogOut } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { getData } from '../Context/UserContext'

const Logout = () => {
  const navigate = useNavigate()
  const {setUser}=getData()
  return (
    <Box className='flex items-start mt-1 p-2 '>
            <LuLogOut onClick={()=>{
              localStorage.removeItem('token')
              setUser(null)
              navigate('/login')
            }} size={'1.2rem'} className='cursor-pointer'/>        
    </Box>
  )
}

export default Logout