import { SocketContext } from "../contexts/socket.context";
import { useContext, useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

import { Wrapper } from "../styles/GuessThief.styles";
import SimpleSnackbar from "../components/Snackbar";

import GuessThief from "../components/GuessThief/GuessThief";

function GuessThiefGame({ user, onlineUsers }) {
  const {
    socket,
    setOpenSnackBar: setOpenMainSnackBar,
    setSnackBarMessage: setMainSnackBarMessage,
    setSnackBarButtons: setMainSnackBarButtons,
  } = useContext(SocketContext);

  const [roomId, setRoomId] = useState(
    "GuessThief/" + (socket ? socket.id : "")
  );
  const [roomUsers, setRoomUsers] = useState([user]);
  const [playersToInvite, setPlayersToInvite] = useState([]);
  const [start, setStart] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [inviteRejected, setInviteRejected] = useState(false);
  useEffect(() => {
    if (socket) {
      socket.emit("join-room", { roomId });
      socket.on("start-GuessThief", () => {
        setStart(true);
      });
      socket.on("update-roomid", ({ roomId }) => {
        console.log("updating room id");
        setRoomId(roomId);
      });

      socket.on("room-invite-reject", ({ msg }) => {
        console.log(msg);
        setMainSnackBarMessage(msg);
        setOpenMainSnackBar(true);
        setMainSnackBarButtons([]);
        // setInviteRejected(true);
      });
      // socket.on("room-invite", ({ roomId }) => {
      //   setRoomId(roomId);
      // });
      if (roomId) {
        socket.on("refresh-room-users", (newRoomUsers) => {
          console.log("Refreshing users");
          console.log(newRoomUsers);
          setRoomUsers(newRoomUsers);
          if (newRoomUsers.length === 4) {
            setStart(true);
            socket.emit("start-GuessThief", { roomId });
          }
        });
      }
    }

    return () => {
      if (socket) {
        // socket.off("room-invite");
        socket.off("update-roomid");
        socket.off("refresh-room-users");
        if (roomId) socket.emit("leave-room", roomId);
      }
    };
  }, [socket, roomId]);

  //handlers
  const handleStart = () => {
    if (playersToInvite.length !== 3) {
      setOpenSnackBar(true);
    } else {
      playersToInvite.forEach((playerToInvite) => {
        // socket.emit("room-invite", {
        //   socketId: playerToInvite.socketId,
        //   roomId,
        // });
        socket.emit("open-main-snackbar", {
          roomId: playerToInvite.socketId,
          message: `${user.username} is inviting you to play GuessThief`,
          buttons: [
            {
              type: "room-invite-accept",
              text: "accept",
              roomId,
              variant: "contained",
            },
            {
              type: "room-invite-reject",
              text: "reject",
              roomId,
            },
          ],
        });
      });

      // setStart(true);
      // socket.emit("start-GuessThief", { roomId });
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
            setPlayersToInvite(newValue);
            // setRoomUsers([...newValue, owner]);
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
