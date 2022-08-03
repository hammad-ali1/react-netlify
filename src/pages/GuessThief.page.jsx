import { SocketContext } from "../contexts/socket.context";
import { useContext, useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

import { Wrapper } from "../styles/GuessThief.styles";
import SimpleSnackbar from "../components/Snackbar";

import GuessThief from "../components/GuessThief/GuessThief";

function GuessThiefGame({ user, onlineUsers }) {
  const socket = useContext(SocketContext);
  const [roomId, setRoomId] = useState(
    "GuessThief/" + (socket ? socket.id : "")
  );
  const [roomUsers, setRoomUsers] = useState([]);
  const [start, setStart] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  useEffect(() => {
    if (socket) {
      socket.emit("join-room", { roomId });
      socket.on("start-GuessThief", () => {
        setStart(true);
      });
      socket.on("room-invite", ({ roomId }) => {
        setRoomId(roomId);
      });
      if (roomId) {
        socket.on("refresh-room-users", (newRoomUsers) => {
          console.log("Refreshing users");

          setRoomUsers(newRoomUsers);
        });
      }
    }

    return () => {
      if (socket) {
        socket.off("room-invite");
        socket.off("refresh-room-users");
        if (roomId) socket.emit("leave-room", roomId);
      }
    };
  }, [socket, roomId]);

  //handlers
  const handleStart = () => {
    if (roomUsers.length !== 4) {
      console.log(roomUsers);
      setOpenSnackBar(true);
    } else {
      roomUsers.forEach((roomUser) => {
        if (roomUser._id !== user._id)
          socket.emit("room-invite", { socketId: roomUser.socketId, roomId });
      });
      setStart(true);
      socket.emit("start-GuessThief", { roomId });
    }
  };

  if (!user || !socket) {
    return <h1>You must be logged in to play this game</h1>;
  }
  if (!start) {
    return (
      <Wrapper>
        <Autocomplete
          disablePortal
          multiple={true}
          sx={{ marginBottom: "5px", width: "350px", margin: "auto" }}
          id="secondPlayer"
          options={onlineUsers}
          getOptionLabel={(option) => option.username}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.socketId}>
                {option.username}
              </li>
            );
          }}
          onChange={(event, newValue) => {
            const owner = user;
            owner.socketId = socket.id;
            setRoomUsers([...newValue, owner]);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Choose 4 Players to Invite"
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
              variant="outlined"
              // label="Choose Player To Invite"
            />
          )}
        />

        <button onClick={handleStart}> Start Game </button>
        <SimpleSnackbar
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          message="You need to add 4 Players to play the game"
        />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <GuessThief players={roomUsers} roomId={roomId} user={user} />
    </Wrapper>
  );
}

export default GuessThiefGame;
