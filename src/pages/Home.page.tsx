import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
//Styles
import { Wrapper } from "../styles/Home.styles";

import HorizontalScroll from "../components/MovieDB/HorizontalScroll";
//Context
import {
  UserContext,
  SocketContext,
  UserContextType,
  SocketContextType,
} from "../context";

//Types
type HomeProps = {
  setOnlineUsers: React.Dispatch<React.SetStateAction<User[]>>;
};
function Home({ setOnlineUsers }: HomeProps) {
  //Context hooks
  const [user] = useContext<UserContextType>(UserContext);
  const [socket] = useContext<SocketContextType>(SocketContext);

  //Effects
  //hook for online users
  useEffect(() => {
    if (socket) {
      socket.on("new-users", (newUsers: User[]) => {
        newUsers = newUsers.filter((newUser) => newUser.socketId !== socket.id);
        console.log(newUsers);
        setOnlineUsers(newUsers);
      });
    }
  }, [socket, setOnlineUsers]);

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
      <HorizontalScroll />
    </Wrapper>
  );
}

export default Home;
