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
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarButtons, setSnackBarButtons] = useState([]);

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
