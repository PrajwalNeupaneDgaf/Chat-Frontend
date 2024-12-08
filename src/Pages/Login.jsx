import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BluredBox from "../Layout/BluredBox";
import axiosFetch from "../Utils/Axios";

const Login = ({trigger ,setTrigger}) => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate()

  const toast = useToast();

  const handleLogin = async () => {
    setloading(true);
    try {
      if (!userName) {
        toast({
          title: "Error",
          description: "Please enter your username",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setloading(false);
        return;
      }
      if (password.length < 8) {
        toast({
          title: "Error",
          description: "Password must be at least 8 characters",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      const data = {
        userName,
        password,
      };
      const response = await axiosFetch.post('user/login',data)
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Login successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
        localStorage.setItem('token',response.data.token)
        setTrigger(!trigger)
          navigate('/')    
      }
     
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error?.response.data.error ||"Invalid username or password",
        status: "error",
        isClosable:true,
        duration:1000,
      })
    } finally {
      setloading(false);
    }
  };
  return (
    <BluredBox className={'flex items-center justify-center'}>
      <Box className="pr-8">
        <Box>
          <Heading className="text-white text-center mb-6" size="md">
            Login
          </Heading>
        </Box>
        <FormControl
          className="grid  items-center justify-center gap-y-2 text-[#e9c5c5]"
          gridTemplateColumns={".8fr 1fr"}
        >
          <FormLabel textAlign={"center"} htmlFor="userName">
            Username
          </FormLabel>
          <Input
            id="userName"
            value={userName}
            onChange={(e) => {
              setuserName(e.target.value);
            }}
            type="text"
            placeholder="Enter your username"
          />

          <FormLabel textAlign={"center"} htmlFor="psd">
            Password
          </FormLabel>
          <Input
            id="psd"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            placeholder="Enter your Password"
          />
        </FormControl>
        <Box
          width={"100%"}
          className="flex flex-col text-white items-center justify-center py-4 "
        >
          <p>
            Don't have an account?{" "}
            <Link to={"/register"}>
              <strong>Signup</strong>
            </Link>
          </p>
          <Button
            onClick={handleLogin}
            disabled={loading}
            colorScheme="blue"
            className="w-60 mt-5"
          >
            {loading ? <Spinner size={"md"} /> : "Login"}
          </Button>
        </Box>
      </Box>
    </BluredBox>
  );
};

export default Login;
