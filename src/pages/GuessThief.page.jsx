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
  const [roomUsers, setRoomUsers] = useState([]);
  const [playersToInvite, setPlayersToInvite] = useState([]);
  const [start, setStart] = useState(false); //set players for starting the game
  const [finish, setFinish] = useState(false); //finsih the game
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isRoomFull, setIsRoomFull] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.emit("join-room", { roomId });
      socket.on("start-GuessThief", () => {
        setStart(true);
      });
      socket.on("play-again-GuessThief", () => {
        setRoomUsers([]);
        setFinish(false);
        setStart(false);
        setIsRoomFull(false);
        socket.emit("clean-room", { roomId });
        socket.emit("join-room", { roomId });
      });
      socket.on("finish-game", () => {
        setFinish(true);
      });
    }
    return () => {
      if (socket) {
        socket.off("start-GuessThief");
        socket.off("play-again-GuessThief");
        socket.off("finish-game");

        socket.emit("leave-room", roomId);
      }
    };
  }, [socket, roomId]);
  useEffect(() => {
    if (socket) {
      socket.on("update-roomid", ({ roomId }) => {
        console.log("updating room id");
        setRoomId(roomId);
      });

      socket.on("room-invite-reject", ({ msg }) => {
        console.log(msg);
        setMainSnackBarMessage(msg);
        setOpenMainSnackBar(true);
        setMainSnackBarButtons([]);
      });

      if (roomId) {
        socket.on("refresh-room-users", (newRoomUsers) => {
          console.log("Refreshing users");
          console.log(newRoomUsers);

          if (newRoomUsers.length === 4) {
            socket.emit("start-GuessThief", { roomId });
            setIsRoomFull(true);
          }

          setRoomUsers(newRoomUsers);
        });
      }
    }

    return () => {
      if (socket) {
        socket.off("update-roomid");
        socket.off("room-invite-reject");

        if (roomId) {
          if (start) {
            socket.emit("open-snackbar", {
              roomId,
              message: `${user.username} got afraid and chickened out 😒. Here are the final results`,
            });
            // socket.emit("finish-game", { roomId });
          }

          socket.off("refresh-room-users");
        }
      }
    };
  }, [
    socket,
    roomId,
    start,
    setMainSnackBarMessage,
    user.username,
    setOpenMainSnackBar,
    setMainSnackBarButtons,
  ]);

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
    }
  };
  const handlePlayAgain = () => {
    socket.emit("play-again-GuessThief", { roomId });
  };
  if (!user || !socket) {
    return <h1>You must be logged in to play this game</h1>;
  }

  return (
    <Wrapper>
      {!start && (
        <>
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
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Choose 4 Players to Invite"
                sx={{ backgroundColor: "white", borderRadius: "5px" }}
                variant="outlined"
              />
            )}
          />
          <button onClick={handleStart}> Start Game </button>
          <SimpleSnackbar
            open={openSnackBar}
            setOpen={setOpenSnackBar}
            message="You need to add 4 Players to play the game"
          />
        </>
      )}
      <GuessThief
        players={roomUsers}
        roomId={roomId}
        user={user}
        start={start}
        handlePlayAgain={handlePlayAgain}
        finish={finish}
        isRoomFull={isRoomFull}
      />
    </Wrapper>
  );
}

export default GuessThiefGame;
