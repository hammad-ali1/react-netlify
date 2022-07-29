import { SocketContext } from "../contexts/socket.context";
import { useContext, useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

import { Wrapper } from "../styles/GuessThief.styles";
import SimpleSnackbar from "../components/Snackbar";
import RoleCard from "../components/GuessThief/RoleCard";

const defaultCards = [
  {
    points: 500,
    title: "Queen",
    player: false,
    img: "img",
  },
  {
    points: 1000,
    title: "King",
    player: false,
    img: "img",
  },
  {
    points: 300,
    title: "Soldier",
    player: false,
    img: "img",
  },
  {
    points: 0,
    title: "Thief",
    player: false,
    img: "img",
  },
];
function GuessThief({ user, onlineUsers }) {
  const socket = useContext(SocketContext);
  const [roomId, setRoomId] = useState("GuessThief/" + socket.id);
  const [roomUsers, setRoomUsers] = useState([]);
  const [start, setStart] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [cards, setCards] = useState(defaultCards);
  useEffect(() => {
    socket.emit("join-room", { roomId });
    socket.on("room-invite", ({ roomId }) => {
      setRoomId(roomId);
    });
    if (roomId) {
      socket.on("refresh-room-users", (newRoomUsers) => {
        console.log("Refreshing users");
        setRoomUsers(newRoomUsers);
      });
    }
    return () => {
      socket.off("room-invite");
      socket.off("refresh-room-users");
      if (roomId) socket.emit("leave-room", roomId);
    };
  }, [socket, roomId]);

  //handlers
  const handleStart = () => {
    if (roomUsers.length !== 2) {
      console.log(roomUsers);
      setOpenSnackBar(true);
    } else {
      setStart(true);
    }
  };
  const handleReset = () => {
    setRoomUsers([]);
    setStart(false);
  };
  if (!user) {
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
          onChange={(event, newValue) => {
            setRoomUsers([...newValue, user]);
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
      <button onClick={handleReset}>Reset</button>
      <div className="cards">
        {cards.map((card) => (
          <RoleCard title={card.title} points={card.points} img={card.img} />
        ))}
      </div>
    </Wrapper>
  );
}

export default GuessThief;
