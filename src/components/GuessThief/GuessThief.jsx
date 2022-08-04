import { SocketContext } from "../../contexts/socket.context";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import RoleCard from "./RoleCard";
import PointsTable from "./PointsTable";
import SimpleSnackbar from "../../components/Snackbar";

const defaultCards = [
  {
    points: 1000,
    title: "King",
    player: false,
    img: "./images/king.webp",
  },
  {
    points: 500,
    title: "Queen",
    player: false,
    img: "./images/queen.webp",
  },

  {
    points: 300,
    title: "Soldier",
    player: false,
    img: "./images/soldier.jpg",
  },
  {
    points: 0,
    title: "Thief",
    player: false,
    img: "./images/thief.jpg",
  },
];

const roundLimt = 5;
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function GuessThief({
  players,
  roomId,
  user,
  handlePlayAgain,
  finish,
  start,
  isRoomFull,
}) {
  const { socket } = useContext(SocketContext);
  //useStates
  const [cards, setCards] = useState(defaultCards);
  const [currentRole, setCurrentRole] = useState(null);
  const [points, setPoints] = useState({});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  //useRefs
  const clickAllowed = useRef(true);
  const timer = useRef(null);

  //useCallbacks
  const shuffleCards = useCallback(() => {
    const shuffledPlayers = [...players];
    shuffleArray(shuffledPlayers);
    const newCards = [...cards];
    shuffleArray(newCards);
    newCards.forEach((card, index) => {
      card.player = shuffledPlayers[index];
      // if (card.player._id === user._id) setCurrentRole(card);
    });
    setCards(newCards);
    socket.emit("refresh-cards", { roomId, newCards });
  }, [cards, players, socket, roomId]);

  const resetPoints = useCallback(() => {
    const newPoints = { round: 1 };
    players.forEach((player) => (newPoints[player._id] = 0));
    setPoints(newPoints);
  }, [players]);
  //useEffectes
  useEffect(() => {
    if (isRoomFull) {
      resetPoints();
      shuffleCards();
    }
  }, [isRoomFull, shuffleCards, resetPoints]); //setting up points
  useEffect(() => {
    if (socket) {
      socket.on("refresh-cards", ({ newCards }) => {
        setShowAll(false);
        setCards(newCards);
        newCards.forEach((card) => {
          if (card.player._id === user._id) setCurrentRole(card);
        });
      });

      socket.on("update-points", ({ newPoints }) => {
        setPoints(newPoints);
      });
      socket.on("show-cards", ({ show }) => {
        setShowAll(show);
      });

      socket.on("open-snackbar", ({ message }) => {
        console.log(message);
        setSnackBarMessage(message);
        setOpenSnackBar(true);
      });

      socket.on("room-user-left", () => {
        console.log("user left");
        socket.emit("finish-game", { roomId });
      });
    }
  }, [socket, user, roomId]);

  useEffect(() => {
    console.log(currentRole);
  }, [currentRole]);
  useEffect(() => {
    console.log(points);
  }, [points]);

  const handleClick = (event) => {
    if (currentRole.title !== "Queen" || !clickAllowed.current) return; //if not queen or click not allowed
    clickAllowed.current = false; //disallow further clicks
    const newPoints = { ...points, round: points.round + 1 };
    cards.forEach((card) => {
      if (card.title === "Queen" && !event.target.innerText.includes("Thief"))
        //if wrong card was choosen update queen points to 0
        newPoints[card.player._id] = 0 + points[card.player._id];
      else if (
        card.title === "Thief" &&
        !event.target.innerText.includes("Thief")
      )
        // if wrong card was choosen give thief queen's point
        newPoints[card.player._id] =
          defaultCards[1].points + points[card.player._id];
      else newPoints[card.player._id] = card.points + points[card.player._id];
    });

    if (event.target.innerText.includes("Thief")) {
      socket.emit("open-snackbar", {
        message: `${user.username} choose correct Thief 😎`,
        roomId,
      });
    } else {
      socket.emit("open-snackbar", {
        message: `${user.username} choose wrong Thief 😭`,
        roomId,
      });
    }
    socket.emit("update-points", { newPoints, roomId });
    socket.emit("show-cards", { show: true, roomId });
    if (timer.current) clearInterval(timer.current);
    timer.current = setTimeout(() => {
      console.log("Timeout function");

      clickAllowed.current = true;
      shuffleCards();
      if (points.round === roundLimt) socket.emit("finish-game", { roomId });
    }, 5000);
  };
  const [showAll, setShowAll] = useState(false);

  const renderCards = () => {
    let mainCard = cards.findIndex((card) => card.player._id === user._id);
    mainCard = mainCard === -1 ? 0 : mainCard;
    const newCards = [...cards];
    [newCards[mainCard], newCards[0]] = [newCards[0], newCards[mainCard]]; //swap main card with first card
    console.log(newCards);
    return newCards.map((card, key) => (
      <RoleCard
        className={key === 0 ? "main" : "others"}
        key={key}
        title={card.title}
        points={card.points}
        img={card.img}
        player={card.player}
        currentRole={currentRole}
        handleClick={handleClick}
        showAll={showAll}
      />
    ));
  };

  if (!start) {
    return <></>;
  }
  if (finish) {
    return (
      <>
        <button
          onClick={
            handlePlayAgain
            //   () => {
            //   socket.emit("play-again-GuessThief", { roomId });
            //   shuffleCards();
            // }
          }
        >
          Play Again
        </button>
        <PointsTable players={players} currentPoints={points} />
        <SimpleSnackbar
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          message={snackBarMessage}
        />
      </>
    );
  }
  return (
    <>
      <h2 className="round">{`Round ${points.round}`}</h2>
      {currentRole && currentRole.title === "Queen" && (
        <div className="role">
          You are Queen. Choose The Thief among the hidden cards
        </div>
      )}
      {currentRole && currentRole.title === "King" && (
        <div className="role">You are King</div>
      )}
      {currentRole && currentRole.title === "Thief" && (
        <div className="role">You are the Thief</div>
      )}
      {currentRole && currentRole.title === "Soldier" && (
        <div className="role">You are Soldier</div>
      )}

      <div className="cards">{renderCards()}</div>
      <PointsTable players={players} currentPoints={points} />
      <SimpleSnackbar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={snackBarMessage}
      />
    </>
  );
}

export default GuessThief;
