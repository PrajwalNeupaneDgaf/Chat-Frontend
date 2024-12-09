import React, { useEffect } from 'react'
import { getData } from '../Context/UserContext'

const useListenMessage = () => {
    const {Socket ,messages ,setMessages} = getData()

    useEffect(()=>{
        Socket?.on('Message',(data)=>{
            console.log(data)
            setMessages([...messages ,data])
        })
        return ()=> Socket?.off('Message')
    },[Socket])
 
   
}

export default useListenMessage