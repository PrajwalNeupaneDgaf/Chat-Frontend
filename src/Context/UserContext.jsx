import React, { createContext, useContext, useState } from 'react'


const UserContexts = createContext()

const UserContext = ({children}) => {
  const [user ,setUser] = useState()
  return (
        <UserContexts.Provider value={{
          user ,setUser
        }}>
           { children}
        </UserContexts.Provider>
  )
}

export default UserContext

export const getData = ()=>{
    return useContext(UserContexts)
}