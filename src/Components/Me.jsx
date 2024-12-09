import { Avatar, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosFetch from '../Utils/Axios';

const Me = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosFetch('user/me')
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Error fetching user data:', err));
  }, []);

  return (
    <Box
      className="flex flex-row gap-1 cursor-default justify-center items-center"
      display="flex"
      flexDirection="row"
      gap="1"
      alignItems="center"
      justifyContent="center"
    >
      <Avatar
        onClick={() => navigate('/')}
        src={user?.avatar || '/default-avatar.png'}
        size="md"
        cursor="pointer"
      />
      <Box fontSize="xs" textAlign="center">
        {user?.fullName || 'Loading...'}
      </Box>
    </Box>
  );
};

export default Me;
