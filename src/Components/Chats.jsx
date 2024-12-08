import React, { useEffect, useState } from "react";
import { Box, Input, Button, Avatar, Text, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axiosFetch from "../Utils/Axios";
import { getData } from "../Context/UserContext";

const Chats = () => {
  const [messages, setMessages] = useState([ ]);



  const [inputValue, setInputValue] = useState("");
  const [To, setTo] = useState({});
  const {id} = useParams()

  const {user} = getData()

useEffect(()=>{
  axiosFetch.get(`message/mymessages/${id}`)
  .then((response) => {
    console.log(response.data.messages)
    const data = response.data.messages
    setMessages(data)
    })
    .catch((error) => {
      console.error(error);
      });
},[inputValue])

useEffect(()=>{
  axiosFetch.get(`user/userdata/${id}`)
  .then(res=>{
    setTo(res.data.user)
  }).catch(err=>{
    console.log(err)
  })
},[])

  const handleSend = () => {
    if(inputValue){
      axiosFetch.post(`message/sendmessage/${id}`,{message:inputValue})
      .then(res => {
        console.log(res.data)
        })
        .catch(err => {
          console.log(err)
          })
    }
    setInputValue("");
  };

  const handleDelete = ()=>{
    axiosFetch.delete(`message/delete/${id}`)
    .then(res => {
      })
      .catch(err => {
        console.log(err)
        })

  }

  return (
    <Box maxW="500px" height={'90vh'} mx="auto"  borderRadius="md" overflow="hidden">
      {/* Chat Header */}
     <Box bg="gray.700" color="white" className="flex justify-between px-3 items-center">
     <Box className="flex flex-row gap-3"  py={2} px={4} >
       <Box >
        <Avatar src={To.avatar} size="md"/>
       </Box>
       <Box className="flex justify-center flex-col gap-0">
        <Text fontSize="lg">{To.fullName}</Text>
        <Text fontWeight={'light'} fontSize="xs">@{To.userName}</Text>
       </Box>
      </Box>
      <Menu >
        <MenuButton>:</MenuButton>
       <MenuList bg={'gray.900'}>
       <MenuItem onClick={handleDelete} bg={'gray.800'}>
          Delete
        </MenuItem>
       </MenuList>
      </Menu>
     </Box>

      {/* Chat Messages */}
      <Box
        h={'80%'}
        bg="gray.900"
        p={4}
        overflowY="auto"
        display="flex"
        flexDirection="column"
        gap={4}
        sx={{
          '&::-webkit-scrollbar': {
              display: 'none', // Hides the scrollbar for Webkit browsers
          },
          '&': {
              msOverflowStyle: 'none', // Hides the scrollbar for Internet Explorer and Edge
              scrollbarWidth: 'none', // Hides the scrollbar for Firefox
          },
      }}
      >
       <Box className="text-white text-center">
       {
          messages.length<=0?"Start a new Conversation!!!":''
        }
       </Box>
        {messages?.map((msg) => (
          <Box
            key={msg._id}
            display="flex"
            flexDirection={msg.sender === user._id ? "row-reverse" : "row"}
            alignItems="center"
            gap={3}
          >
            <Avatar src={msg.sender ===  user._id? user.avatar:To.avatar} size="sm" />
            <Box
              bg={msg.sender === "You" ? "gray.600" : "gray.300"}
              color={msg.sender === "You" ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="md"
              maxWidth="70%"
            >
              <Text>{msg.content}</Text>
              <Text fontSize="xs" mt={1} textAlign="right">
                {msg.timestamp}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Chat Input */}
      <Box display="flex" gap={2} p={2} borderTop="1px solid #ccc">
        <Input
          flex="1"
          placeholder="Type a message..."
          textColor={'wheat'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button colorScheme="blue" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chats;
