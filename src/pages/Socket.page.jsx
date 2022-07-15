import { Wrapper } from "../styles/Home.styles";
import { SocketContext } from "../contexts/socket.context";
import { useContext, useEffect, useState } from "react";
import { getOnlineUsers } from "../api/sockets.api";

function Socket({ user }) {
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [roomId, setRoomId] = useState("something");
  // socket.emit("message", "hi");

  useEffect(() => {
    socket.on("refresh-users", (newUsers) => {
      setOnlineUsers(newUsers);
    });
    getOnlineUsers().then(setOnlineUsers);
    socket.on("room-msg", (msg) => {
      console.log(msg);
    });

    return () => {
      socket.off("room-msg");
      socket.off("refresh-users");
      socket.emit("leave-room", roomId);
    };
  }, [socket, roomId]);

  const startRoom = (roomName) => {
    setRoomId(roomName + user._id);
    socket.emit("create-room", { userId: user._id, roomName }, (result) => {
      console.log(result);
    });
  };

  const addUser = (roomName) => {
    const userId = document.getElementById("user").value;
    socket.emit("add-room-user", { userId, roomName }, (result) => {
      console.log(result);
    });
  };

  const sendMsg = () => {
    const msg = document.getElementById("msg").value;
    socket.emit("room-msg", { msg, roomId });
  };

  return (
    <Wrapper>
      <h2>All users</h2>
      <ul>
        {onlineUsers.map((user, key) => (
          <li key={key}>{user._id}</li>
        ))}
      </ul>
      <h2>Room Users</h2>
      <button onClick={() => startRoom("game")}>Create Room</button>
      <input type="text" id="user" />
      <button
        onClick={() => {
          addUser("game");
        }}
      >
        add user
      </button>

      <input type="text" id="msg" />
      <button onClick={sendMsg}>send msg</button>
    </Wrapper>
  );
}

export default Socket;
