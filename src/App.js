import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//styles
import { GlobalStyle } from "./GlobalStyle";
//components
import Navbar from "./components/Navbar";
//pages
import SignUp from "./pages/signUp.page";
import LogIn from "./pages/logIn.page";
import Home from "./pages/Home.page";
import Todo from "./pages/Todo.page";
import Socket from "./pages/Socket.page";
import TTTGame from "./pages/TTTGame.page";
//apis
import { getUser, logout } from "./api/auth.api";
import axios from "axios";
//contexts
import socketio from "socket.io-client";
import { SERVER_URL } from "./config";

import { SocketContext } from "./contexts/socket.context";

function App() {
  //states
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [navLinks, setNavLinks] = useState([]);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  //hooks
  //hook for online users
  useEffect(() => {
    if (socket)
      socket.on("new-users", (newUsers) => {
        setOnlineUsers(newUsers);
      });
  }, [socket]);
  //hook for fetching user from token
  useEffect(() => {
    setToken(localStorage.getItem("authtoken"));
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getUser().then((user) => {
        setUser(user);
        const socket = socketio.connect(SERVER_URL, {
          auth: { token },
        });
        setSocket(socket);
      });
    } else {
      setUser(null);
    }
  }, [token]);

  //hook for setting up navbar links
  useEffect(() => {
    if (user) {
      const newLinks = [
        { text: "Home", href: "/" },
        {
          text: "Log Out",
          href: "/",
          action: () => {
            logout();
            setToken("");
          },
        },
      ];
      setNavLinks(newLinks);
      setTabValue(0);
    } else {
      const newLinks = [
        { text: "Home", href: "/" },
        { text: "Sign Up", href: "/signup" },
        { text: "Log In", href: "/login" },
      ];
      setNavLinks(newLinks);
      setTabValue(0);
    }
  }, [user]);

  //return statement
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Navbar
          value={tabValue}
          setValue={setTabValue}
          links={navLinks}
          baseUrl="/"
          title="React Projects"
        />
        {user && <h1>{`Welcome ${user.username}`}</h1>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp setToken={setToken} />} />
          <Route path="/login" element={<LogIn setToken={setToken} />} />
          <Route path="/todo" element={<Todo user={user} />} />
          <Route
            path="/socket"
            element={<Socket onlineUsers={onlineUsers} user={user} />}
          />
          <Route
            path="/tttgame"
            element={<TTTGame onlineUsers={onlineUsers} user={user} />}
          />
        </Routes>
        <GlobalStyle />
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
