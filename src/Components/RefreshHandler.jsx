import React, { useEffect, useState } from "react";
import axiosFetch from "../Utils/Axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getData } from "../Context/UserContext";
import { Button, Spinner } from "@chakra-ui/react";

const RefreshHandler = ({ children ,trigger }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const path = useLocation();
  const navigate = useNavigate();
  const { setUser } = getData();

  useEffect(() => {
    const isAuthPage = path.pathname === "/login" || path.pathname === "/register";

    if (!isAuthPage) {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false); // Ensure loading stops even if no token exists
        navigate("/login");
        return;
      }

      axiosFetch
        .get("user/me")
        .then((response) => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
          navigate("/login");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const token = localStorage.getItem('token')
      if (token) {
        axiosFetch
        .get("user/me")
        .then((response) => {
          setUser(response.data);
          setIsAuthenticated(true);
          navigate('/')

        })
        .catch(() => {
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
        } 
      setIsLoading(false); // No loading if it's an auth page
    }
  }, [path.pathname ,trigger]);

  return isLoading ? (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <Spinner size={"lg"} />
    </div>
  ) : (
    <>{children}</>
  );
};

export default RefreshHandler;
