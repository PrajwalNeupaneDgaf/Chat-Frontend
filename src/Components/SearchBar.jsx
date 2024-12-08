import { Box, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const navigate = useNavigate()
  const [searchText, setsearchText] = useState('')
  return (
    <Box className='border-2 overflow-hidden h-[10] relative border-solid border-[#0c0c0c] flex flex-row items-center rounded-md'>
        <Input
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key=='Enter'){
              if( searchText){
                navigate(`/searches/${searchText}`)
               }else{
                navigate(`/`)
               }
            }
          }}
         border={'none'}
         focusBorderColor='transparent'
         type='text' 
        placeholder='search by username'/>
      <Box onClick={()=>{
       if( searchText){
        navigate(`/searches/${searchText}`)
       }else{
        navigate(`/`)
       }
      }} className='bg-black bg-opacity-10 h-12 backdrop-blur-md w-16 flex justify-center items-center'>
      <BiSearch  size={'2rem'} className='cursor-pointer'/>
      </Box>
    </Box>
  )
}

export default SearchBar