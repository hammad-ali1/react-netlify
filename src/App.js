import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

//styles
import { GlobalStyle } from "./GlobalStyle";
//components
import Navbar from "./components/Navbar";
//pages
import SignUp from "./pages/signUp.page";
import LogIn from "./pages/logIn.page";
import Home from "./pages/Home.page";
import Todo from "./pages/Todo.page";
//apis
import { getUser, logout } from "./api/auth.api";
import axios from "axios";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

function App() {
  //states
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [navLinks, setNavLinks] = useState([]);

  //hooks
  //hook for fetching user from token
  useEffect(() => {
    setToken(localStorage.getItem("authtoken"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (token) {
      getUser().then((user) => setUser(user));
    } else {
      setUser(null);
    }
  }, [token, setToken]);

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
      </Routes>

      <GlobalStyle />
    </Router>
  );
}

export default App;
