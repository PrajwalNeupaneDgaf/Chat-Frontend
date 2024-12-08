import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Messages from "./Pages/Messages";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Layout from "./Layout/Layout";
import Search from "./Pages/Search";
import UserContext from "./Context/UserContext";
import { useState } from "react";
import RefreshHandler from "./Components/RefreshHandler";


function App() {

  const [trigger ,setTrigger]=useState(true)


  return (
    <UserContext>
      <Router>
        <Layout>
        <RefreshHandler trigger={trigger}>
          <Routes>
            <Route
              path="/"
              element={
                
                  <Home />
               
              }
            />
            <Route
              path="/messages/:id"
              element={
               
                  <Messages />
               
              }
            />
            <Route
              path="/searches/:query"
              element={
                  <Search />
              }
            />
            <Route path="/login" element={<Login trigger={trigger} setTrigger={setTrigger}/>} />
            <Route path="/register" element={<Register trigger={trigger} setTrigger={setTrigger} />} />
          </Routes>
          </RefreshHandler>
        </Layout>
      </Router>
    </UserContext>
  );
}

export default App;
