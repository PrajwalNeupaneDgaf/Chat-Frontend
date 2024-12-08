import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Spinner, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BluredBox from '../Layout/BluredBox'
import axiosFetch from '../Utils/Axios'

const Register = ({trigger ,setTrigger}) => {
  const [gender, setgender] = useState('male')
  const [name, setname] = useState('')
  const [userName, setuserName] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [loading, setloading] = useState(false)
  const [posOfBox, setposOfBox] = useState('left-0')

  const toast = useToast()

  const navigate = useNavigate()

  const handleSignup =  (e)=>{
    e.preventDefault()
    setloading(true)
    if(password!==confirmPassword){
      toast({
        title:'error in Password',
        description: "Confirm Password Didn't Match With Password",
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
      setloading(false)
      return
    }
    if(password.length <8){
      toast({
        title: 'error in Password',
        description: "Password should be at least 8 characters long ",
        status: 'error',
        duration: 1000,
        isClosable: true,
    })
    setloading(false)
    return
  }
  if(userName.includes(' ')){
    toast({
      title: 'error in Username',
      description: "Username should not contain spaces ",
      status: 'error',
      duration: 1000,
      isClosable: true,
      })
      setloading(false)
      return
    }
  const data = {
    fullName:name,
    userName,
    password,
    confirmPassword,
    gender,
  }
  axiosFetch.post('user/register',data)
  .then(res=>{
    console.log(res.data)
    localStorage.setItem('token',res.data.token)
    toast({
      title: 'Success',
      description: "User Registered Successfully",
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
    setTrigger(!trigger)   
      navigate('/')

  }).catch(err=>{
    console.log(err)
    toast({
      title: 'Error',
      description: err?.response.data.error|| "Registration Failed",
      status: 'error',
      duration: 1000,
      isClosable: true,
      })
  })
  setloading(false)
  }

  const changeGender = ()=>{
    if(gender=='male'){
      setposOfBox('left-[57%]')
      setgender('female')
    }else{
      setposOfBox('left-0')
      setgender('male')
    }
  }
  return (
    <BluredBox className={'flex items-center justify-center'}>
   <Box className='pr-8'>
      <Box>
        <Heading className='text-white text-center mb-6' size='md'>Signup</Heading>
      </Box>
      <FormControl className='grid  items-center justify-center gap-y-2 text-[#e9c5c5]' gridTemplateColumns={'.8fr 1fr'}> 
        <FormLabel textAlign={'center'} htmlFor='name'>Name</FormLabel>
        <Input id='name' value={name} onChange={(e)=>{
          setname(e.target.value)
        }} type='text' placeholder='Enter your Name' />

        <FormLabel textAlign={'center'} htmlFor='userName'>Username</FormLabel>
        <Input id='userName' value={userName} onChange={(e)=>{
          setuserName(e.target.value)
        }} type='text' placeholder='Enter your username' />

        <FormLabel textAlign={'center'} htmlFor='psd'>Password</FormLabel>
        <Input id='psd' value={password} onChange={(e)=>{
          setpassword(e.target.value)
        }} type='password' placeholder='Enter your Password' />

        <FormLabel textAlign={'center'} htmlFor='c_psd'>Confirm Password</FormLabel>
        <Input id='c_psd' type='password' value={confirmPassword} onChange={(e)=>{
          setconfirmPassword(e.target.value)
        }} placeholder='Re-Enter Your Password' />

        <FormLabel textAlign={'center'} htmlFor='gender'>Gender</FormLabel>
        <Box className='w-[100%] h-12 relative'>
          <Box 
          onClick={changeGender} 
          _readOnly={true} 
          transition={'ease .7s'}
          className={`flex w-[40%] absolute rounded-lg items-center cursor-pointer backdrop-blur-lg bg-[#1f97a0b0] h-[100%] justify-between px-5 ${posOfBox}`}>
         {gender}
          </Box>
        </Box>
      </FormControl>
      <Box width={'100%'} className='flex flex-col items-center text-white justify-center py-4 '>
      <p>
          Have an account? <Link to={'/login'}><strong>Login</strong></Link>
        </p>
          <Button disabled={loading} onClick={handleSignup} colorScheme='blue' className='w-60 mt-4'>
            {
              loading ? <Spinner size='sm' /> : <strong>Signup</strong>
            }
          </Button>
        </Box>
    
   </Box>  
   </BluredBox>
  )
}

export default Register