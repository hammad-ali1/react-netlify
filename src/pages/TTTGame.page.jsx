import { Wrapper } from "../styles/TTTGame.styles";
import { SocketContext } from "../contexts/socket.context";
import { useContext, useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import TicTacToe from "../components/TicTacToe";

function TTTGame({ user, onlineUsers }) {
  const socket = useContext(SocketContext);
  const [marker, setMarker] = useState("X"); //the one who starts the room has the default marker of X
  const [roomId, setRoomId] = useState("ttt/" + socket.id);
  const [roomUsers, setRoomUsers] = useState([]);
  const [secondPlayer, setSecondPlayer] = useState(null);
  useEffect(() => {
    socket.emit("join-room", { roomId });
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

    return () => {
      socket.off("room-message");
      socket.off("room-invite");
      socket.off("refresh-room-users");
      socket.off("update-marker");
      if (roomId) socket.emit("leave-room", roomId);
    };
  }, [socket, roomId]);

  const invite = () => {
    if (secondPlayer) {
      socket.emit("room-invite", { socketId: secondPlayer.socketId, roomId });
      socket.emit("update-marker", {
        marker: "O",
        socketId: secondPlayer.socketId,
      });
    }
  };

  if (!user) {
    return <h1>You must be logged in to play this game</h1>;
  }
  return (
    <Wrapper>
      <Autocomplete
        disablePortal
        sx={{ marginBottom: "5px", width: "350px", margin: "auto" }}
        id="secondPlayer"
        options={onlineUsers}
        getOptionLabel={(option) => option.username}
        onChange={(event, newValue) => {
          setSecondPlayer(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Choose Player to Invite"
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            variant="outlined"
            // label="Choose Player To Invite"
          />
        )}
      />
      <div style={{ display: "flex", marginTop: "10px" }}>
        <button
          style={{ margin: "auto", width: "100px", height: "40px" }}
          className="invite-button"
          onClick={invite}
        >
          Invite
        </button>
      </div>

      <h2>Room Users</h2>
      <ul>
        {roomUsers.map((user, key) => (
          <li key={key}>{user.username}</li>
        ))}
      </ul>

      <TicTacToe
        playerName={user.username}
        socket={socket}
        roomId={roomId}
        marker={marker}
      />
    </Wrapper>
  );
}

export default TTTGame;
