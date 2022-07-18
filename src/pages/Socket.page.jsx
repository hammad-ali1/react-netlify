import { Wrapper } from "../styles/Home.styles";
import { SocketContext } from "../contexts/socket.context";
import { useContext, useEffect, useState } from "react";

import TicTacToe from "../components/TicTacToe";

function Socket({ user, onlineUsers }) {
  const socket = useContext(SocketContext);
  const [marker, setMarker] = useState("X"); //the one who starts the room has the default marker of X
  const [roomId, setRoomId] = useState(null);
  const [roomUsers, setRoomUsers] = useState([]);
  useEffect(() => {
    socket.on("room-message", (msg) => {
      console.log(msg);
    });
    socket.on("room-invite", ({ roomId }) => {
      setRoomId(roomId);
    });
    socket.on("update-marker", ({ marker }) => {
      setMarker(marker);
    });
    if (roomId) {
      socket.on("refresh-room-users", (newRoomUsers) => {
        console.log("Refreshing users");
        setRoomUsers(newRoomUsers);
      });
    }

    const cleanup = () => {
      socket.off("room-message");
      socket.off("room-invite");
      socket.off("refresh-room-users");
      socket.off("update-marker");
      if (roomId) socket.emit("leave-room", roomId);
    };
    // const handleTabClose = (event, socket, roomId) => {
    //   event.preventDefault();
    //   if (roomId) socket.emit("leave-room", roomId);

    //   console.log("beforeunload event triggered");
    //   console.log(socket);
    //   console.log(roomId);

    //   return (event.returnValue = "Are you sure you want to exit?");
    // };

    // window.addEventListener("beforeunload", (event) => {
    //   handleTabClose(event, socket, roomId);
    // });

    return () => {
      // // window.removeEventListener("beforeunload", cleanup);
      // window.removeEventListener("beforeunload", handleTabClose);
      cleanup();
    };
  }, [socket, roomId]);

  const startRoom = (roomId) => {
    setRoomId(roomId + socket.id);
    socket.emit("join-room", { roomId: roomId + socket.id }, (result) => {
      console.log(result);
    });
  };

  const sendMsg = () => {
    const msg = document.getElementById("msg").value;

    socket.emit("room-message", { msg, roomId });
  };

  const invite = () => {
    const user = document.getElementById("user").value;
    socket.emit("room-invite", { socketId: user, roomId });
    socket.emit("update-marker", { marker: "O", socketId: user });
  };
  return (
    <Wrapper>
      <h2>All users</h2>
      <ul>
        {onlineUsers.map((user, key) => (
          <li key={key}>
            {user.socketId} {user.username}
          </li>
        ))}
      </ul>
      <h2>Room Users</h2>
      <ul>
        {roomUsers.map((user, key) => (
          <li key={key}>
            {user.socketId} {user.username}
          </li>
        ))}
      </ul>
      <button onClick={() => startRoom("game")}>Create Room</button>
      <input type="text" id="user" />
      <button onClick={invite}>Invite</button>
      <input type="text" id="msg" />
      <button onClick={sendMsg}>send msg</button>
      <TicTacToe
        playerName={user.username}
        socket={socket}
        roomId={roomId}
        marker={marker}
      />
    </Wrapper>
  );
}

export default Socket;
