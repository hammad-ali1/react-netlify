import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//styles
import { GlobalStyle } from "./GlobalStyle";
//components
import Navbar from "./components/Navbar";
import SimpleSnackbar from "./components/Snackbar";

//pages
import SignUp from "./pages/signUp.page";
import LogIn from "./pages/logIn.page";
import Home from "./pages/Home.page";
import Todo from "./pages/Todo.page";
import TTTGame from "./pages/TTTGame.page";
import GuessThiefGame from "./pages/GuessThief.page";
import MovieDB from "./pages/MovieDB.page.tsx";
//apis
import { logout } from "./api/auth.api";

//Context
import { UserProvider, SocketProvider } from "./context";

import { SocketContext } from "./contexts/socket.context";

function App() {
  //states
  // const [token, setToken] = useState(null);

  // const [navLinks, setNavLinks] = useState([]);
  // const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarButtons, setSnackBarButtons] = useState([]);

  //hooks

  //hook for fetching user from token
  // useEffect(() => {
  //   setToken(localStorage.getItem("authtoken"));
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     const socket = socketio.connect(SERVER_URL, {
  //       auth: { token },
  //     });
  //     setSocket(socket);
  // getUser().then((user) => {
  // const socket = socketio.connect(SERVER_URL, {
  //   auth: { token },
  // });
  // setSocket(socket);
  // });
  //   }
  // }, [token]);

  //hook for setting up navbar links
  // useEffect(() => {
  //   if (false) {
  //     const newLinks = [
  //       { text: "Home", href: "/" },
  //       {
  //         text: "Log Out",
  //         href: "/",
  //         action: () => {
  //           logout();
  //           // setToken("");
  //           // socket.disconnect();
  //         },
  //       },
  //     ];
  //     setNavLinks(newLinks);
  //     setTabValue(0);
  //   } else {
  //     const newLinks = [
  //       { text: "Home", href: "/" },
  //       { text: "Sign Up", href: "/signup" },
  //       { text: "Log In", href: "/login" },
  //     ];
  //     setNavLinks(newLinks);
  //     setTabValue(0);
  //   }
  // }, []);

  //return statement
  return (
    <SocketContext.Provider
      value={{
        setSnackBarMessage,
        setSnackBarButtons,
        setOpenSnackBar,
      }}
    >
      <Router>
        <UserProvider>
          <SocketProvider>
            <Navbar baseUrl="/" title="React Projects" />
            {/* {user && <h1>{`Welcome ${user.username}`}</h1>} */}
            <Routes>
              <Route
                path="/"
                element={<Home setOnlineUsers={setOnlineUsers} />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/todo" element={<Todo />} />

              <Route
                path="/tttgame"
                element={<TTTGame onlineUsers={onlineUsers} />}
              />
              <Route
                path="/guess-thief"
                element={<GuessThiefGame onlineUsers={onlineUsers} />}
              />
              <Route path="/movie-db/*" element={<MovieDB />} />
            </Routes>
            <SimpleSnackbar
              buttons={snackBarButtons}
              message={snackBarMessage}
              open={openSnackBar}
              setOpen={setOpenSnackBar}
              // user={user}
            />
            <GlobalStyle />
          </SocketProvider>
        </UserProvider>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
