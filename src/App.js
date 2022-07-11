import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//components
import Navbar from "./components/Navbar";
//pages
import SignUp from "./pages/signUp.page";
import LogIn from "./pages/logIn.page";
import Home from "./pages/Home.page";
//apis
import { getUser, logout } from "./api/auth.api";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  useEffect(() => {
    console.log("Updating axios header");
    setToken(localStorage.getItem("authtoken"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (token) {
      getUser().then((user) => setUser(user));
    } else {
      setUser(null);
    }
  }, [token, setToken]);

  let navLinks = [
    { text: "Home", href: "/" },
    { text: "Sign Up", href: "/signup" },
    { text: "Log In", href: "/login" },
  ];
  if (user) {
    navLinks = navLinks.filter(
      (link) => !(link.text === "Sign Up" || link.text === "Log In")
    );
    navLinks.push({
      text: "Log Out",
      href: "/",
      action: () => {
        logout();
        setToken("");
      },
    });
    // setTabValue(0);
  }
  return (
    <Router>
      <Navbar
        value={tabValue}
        setValue={setTabValue}
        links={navLinks}
        baseUrl="/"
        title="Hammad's Projects"
      />
      {user && <h1>{`Welcome ${user.username}`}</h1>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp setToken={setToken} />} />
        <Route path="/login" element={<LogIn setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
