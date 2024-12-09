import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'


const UserContexts = createContext()

const UserContext = ({children}) => {
  const [user ,setUser] = useState()
  const [onlineUser ,setonlineUser] = useState([])
  const [messages ,setMessages] = useState([])
  const [Socket ,setSocket] = useState(null)

  useEffect(()=>{
    const socket = io("https://chat-backend-6m3t.onrender.com",{
      query:{
        id:user?._id
      }
    })

    setSocket(socket)

    socket.on('getOnlineUsers',(users)=>{
      setonlineUser(users)
    })

    return ()=>socket.close()
  },[user])
  return (
        <UserContexts.Provider value={{
          user ,setUser,Socket,onlineUser,messages ,setMessages
        }}>
           { children}
        </UserContexts.Provider>
  )
}

export default UserContext

export const getData = ()=>{
    return useContext(UserContexts)
}