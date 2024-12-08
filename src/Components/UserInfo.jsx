import { Avatar, Box } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({data}) => {

    const navigate = useNavigate()

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
                        navigate(`/messages/${item._id}`)
                    }}
                    className="bg-black rounded-lg w-80 cursor-pointer bg-opacity-25 py-3"
                    key={item._id}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    mb={4}
                >
                    <Avatar src={item.avatar} />
                    <Box>
                        <Box fontWeight="bold">{item.fullName}</Box>
                        <Box fontSize="sm" color="gray.500">
                            @{item.userName}
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default UserInfo;
