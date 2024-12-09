import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Input,
  Button,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axiosFetch from "../Utils/Axios";
import { getData } from "../Context/UserContext";
import useListenMessage from "./useListenMessage";

const Chats = () => {
  const { id } = useParams();
  const { user, onlineUser } = getData(); // Fetch logged-in user data
  const [inputValue, setInputValue] = useState("");
  const [IsDelete, setIsDelete] = useState(false);
  const [trigger ,setTrigger] = useState(true)
  const [To, setTo] = useState({});
  
  const {messages ,setMessages} = getData()

  const containerRef = useRef()

  useEffect(() => {
    axiosFetch
      .get(`message/mymessages/${id}`)
      .then((response) => {
        setMessages(response.data.sendMessage || []);
      })
      .catch((error) => {
        console.error("Error fetching messages: ", error);
      });
  }, [id, setMessages]);

  useListenMessage();

  useEffect(() => {
    if (containerRef.current) {
      
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]); // Run only once on component mount
  

  // Fetch receiver/user information for the chat header
  useEffect(() => {
    axiosFetch
      .get(`user/userdata/${id}`)
      .then((res) => {
        setTo(res.data.user);
      })
      .catch((err) => {
        console.error("Error fetching user details: ", err);
      });
  }, [id , trigger]);

  
  const handleSend = async () => {
    if (inputValue.trim()) {
      const messageData = {
        senderId: user._id,
        receiverId: id,
        message: inputValue,
      };

      try {
        // Send message to server
        const data = await axiosFetch.post(`message/sendmessage/${id}`, {
          message: inputValue,
        });
        setInputValue("");
        setMessages([...messages, data.data.data]);
      } catch (error) {
        console.error("Error sending message:", error);
        alert("error Try Again");
        setInputValue("");
      }
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axiosFetch.delete(`message/delete/${id}`);
      setIsDelete(false)
      setTrigger(!trigger)
    } catch (error) {
      console.error("Error deleting conversation: ", error);
    }
  };

  return (
    <Box
      maxW="500px"
      height={"90vh"}
      mx="auto"
      borderRadius="md"
      overflow="hidden"
    >
      {/* Chat Header */}
      <Box
        bg="gray.700"
        color="white"
        className="flex justify-between px-3 items-center"
      >
        <Box className="flex flex-row gap-3" py={2} px={4}>
          <Box>
            <Avatar
              src={To.avatar}
              size="md"
              _before={{
                pos: "absolute",
                content: '""',
                height: "10px",
                width: "10px",
                borderRadius: "100%",
                background: `${onlineUser.includes(To._id) ? "green" : "gray"}`,
                bottom: 0,
                right: 0,
              }}
            />
          </Box>
          <Box className="flex justify-center flex-col gap-0">
            <Text fontSize="lg">{To.fullName}</Text>
            <Text fontWeight={"light"} fontSize="xs">
              @{To.userName}
            </Text>
          </Box>
        </Box>
        <Menu>
          <MenuButton>:</MenuButton>
          <MenuList bg={"gray.900"}>
            <MenuItem
              onClick={() => {
                setIsDelete(true);
              }}
              bg={"gray.800"}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      {/* Chat Message Display */}
      <Box
        ref={containerRef}
        h={"80%"}
        bg="gray.900"
        p={4}
        overflowY="auto"
        display="flex"
        flexDirection="column"
        gap={4}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar for Webkit browsers
          },
          "&": {
            msOverflowStyle: "none", // Hides the scrollbar for Internet Explorer and Edge
            scrollbarWidth: "none", // Hides the scrollbar for Firefox
          },
        }}
      >
        {messages.length <= 0 ? (
          <Box textAlign="center" color="gray.400">
            Start a new conversation
          </Box>
        ) : (
          messages.map((msg) => (
            <Box
              key={msg._id}
              display="flex"
              flexDirection={msg.sender === user._id ? "row-reverse" : "row"}
              alignItems="center"
              gap={3}
            >
              <Avatar
                src={msg.sender === user._id ? user.avatar : To.avatar}
                size="sm"
              />
              <Box
                bg={msg.sender === user._id ? "blue.500" : "gray.300"}
                color={msg.sender === user._id ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="md"
                maxWidth="70%"
              >
                <Text>{msg.content}</Text>
                <Text fontSize="10px" mt={1}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Text>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Message Input */}
      <Box display="flex" gap={2} p={2} borderTop="1px solid #ccc">
        <Input
          flex="1"
          textColor={"wheat"}
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button colorScheme="blue" onClick={handleSend}>
          Send
        </Button>
      </Box>
      <Modal isOpen={IsDelete} onClose={() => setIsDelete(false)}>
        <ModalOverlay />
        <ModalContent>
          {/* Modal Header */}
          <ModalHeader textAlign="center" fontSize="lg" fontWeight="bold">
            Confirm Delete
          </ModalHeader>

          {/* Modal Body */}
          <ModalBody textAlign="center" color="gray.600" fontSize="md">
            Are you sure you want to delete this conversation? This action
            cannot be undone.
          </ModalBody>

          {/* Modal Footer */}
          <ModalFooter justifyContent="space-between">
            <Button
              onClick={() => setIsDelete(false)}
              colorScheme="gray"
              variant="outline"
              px={6}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              colorScheme="red"
              px={6}
              _hover={{ background: "red.600" }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Chats;
