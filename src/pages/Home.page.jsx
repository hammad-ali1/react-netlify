import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { Wrapper } from "../styles/Home.styles";
//Context
import { UserContext, SocketContext } from "../context";
function Home({ setOnlineUsers }) {
  const [user] = useContext(UserContext);
  const [socket] = useContext(SocketContext);
  //hook for online users
  useEffect(() => {
    if (socket) {
      socket.on("new-users", (newUsers) => {
        newUsers = newUsers.filter((newUser) => newUser.socketId !== socket.id);
        console.log(newUsers);
        setOnlineUsers(newUsers);
      });
      // socket.on("open-main-snackbar", ({ message, buttons }) => {
      //   setSnackBarButtons(buttons);
      //   setSnackBarMessage(message);
      //   setOpenSnackBar(true);
      // });
    }
  }, [socket]);
  return (
    <Wrapper>
      {user && <h1>{`Hi ${user.username}`}</h1>}
      <ul>
        <Link style={{ textDecoration: "none" }} to={"/todo"}>
          <li>ToDo App</li>
        </Link>

        <Link style={{ textDecoration: "none" }} to={"/tttgame"}>
          <li>Tic Tac Toe</li>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/guess-thief"}>
          <li>Guess Thief</li>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/movie-db"}>
          <li>Movie DB</li>
        </Link>
      </ul>
    </Wrapper>
  );
}

export default Home;
