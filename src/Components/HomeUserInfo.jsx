import { Avatar, Box } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../Context/UserContext';

const HomeUserInfo = ({data}) => {

    const navigate = useNavigate()

    const {onlineUser} = getData()

    return (
        <Box
            h="75vh"
            overflowY="auto"
            p={4}
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
         {
            data.length<=0?'No Users Here ':''
        }
            {data?.map((item) => (
                <Box
                    onClick={()=>{
                        navigate(`/messages/${item.user._id}`)
                    }}
                    className="bg-black rounded-lg w-80 cursor-pointer bg-opacity-25 py-3"
                    key={item.user._id}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    mb={4}
                >
                    <Avatar pos={'relative'} src={item.user.avatar} _before={{
                        pos:"absolute",
                        content:'""',
                        height:'10px',
                        width:'10px',
                        borderRadius:'100%',
                        background:`${onlineUser.includes(item.user._id)?'green':'gray'}`,
                        bottom:0,
                        right:0
                    }}/>
                    <Box>
                        <Box fontWeight="bold">{item.user.fullName}</Box>
                        <Box fontSize="sm" color="gray.500">
                           {item.latestMessage.content}
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default HomeUserInfo;
