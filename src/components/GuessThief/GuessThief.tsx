import { useCallback, useContext, useEffect, useRef, useState } from "react";
import RoleCard from "./RoleCard";
import PointsTable, { Points } from "./PointsTable";
import SimpleSnackbar from "../Snackbar";
//Context
import { UserContext, SocketContext } from "../../context";
// import { SocketContext } from "../../contexts/socket.context";
//Types
type Card = {
  points: number;
  title: string;
  player: User;
  img: string;
};

const defaultCards: Card[] = [
  {
    points: 1000,
    title: "King",
    player: {} as User,
    img: "./images/king.webp",
  },
  {
    points: 500,
    title: "Queen",
    player: {} as User,
    img: "./images/queen.webp",
  },

  {
    points: 300,
    title: "Soldier",
    player: {} as User,
    img: "./images/soldier.jpg",
  },
  {
    points: 0,
    title: "Thief",
    player: {} as User,
    img: "./images/thief.jpg",
  },
];

// const roundLimt = 2;
function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

type PropTypes = {
  players: User[];
  roomId: string;
  handlePlayAgain: () => void;
  finish: boolean;
  start: boolean;
  isRoomFull: boolean;
  roundLimit: number;
};

function GuessThief({
  players,
  roomId,
  handlePlayAgain,
  finish,
  start,
  isRoomFull,
  roundLimit,
}: PropTypes) {
  const [socket] = useContext(SocketContext);
  const [user] = useContext(UserContext);
  console.log(user);
  //useStates
  const [cards, setCards] = useState(defaultCards);
  const [currentRole, setCurrentRole] = useState<Card>({} as Card);
  const [points, setPoints] = useState<Points>({} as Points);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  //useRefs
  const clickAllowed = useRef(true);
  const timer = useRef<any>(null);

  //useCallbacks
  const shuffleCards = useCallback(() => {
    if (!socket) return;
    if (players.length === 4) {
      const shuffledPlayers = [...players];
      shuffleArray(shuffledPlayers);

      setCards((cards) => {
        const newCards = [...cards];
        shuffleArray(newCards);

        newCards.forEach((card, index) => {
          card.player = shuffledPlayers[index];
          // if (card.player._id === user._id) setCurrentRole(card);
        });
        socket.emit("refresh-cards", { roomId, newCards });
        return newCards;
      });
    }
  }, [players, socket, roomId]);

  const resetPoints = useCallback(() => {
    const newPoints: Points = { round: 1 };
    players.forEach((player) => (newPoints[player._id] = 0));
    setPoints(newPoints);
  }, [players]);
  //useEffects
  useEffect(() => {
    if (isRoomFull && socket) {
      resetPoints();
      shuffleCards();
    }
  }, [isRoomFull, shuffleCards, resetPoints, socket]); //setting up points
  useEffect(() => {
    if (!socket || !user) return;
    if (socket) {
      socket.on("refresh-cards", ({ newCards }: { newCards: Card[] }) => {
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
    }
    return () => {
      if (socket) {
        socket.off("refresh-cards");
        socket.off("update-points");
        socket.off("show-cards");
        socket.off("open-snackbar");
      }
    };
  }, [socket, user, roomId]);

  useEffect(() => {
    console.log(currentRole);
  }, [currentRole]);
  useEffect(() => {
    console.log(points);
  }, [points]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!socket || !user) return;
    const divElement = event.target as HTMLElement;
    if (currentRole.title !== "Queen" || !clickAllowed.current) return; //if not queen or click not allowed
    clickAllowed.current = false; //disallow further clicks
    const newPoints: Points = { ...points, round: points.round + 1 };
    cards.forEach((card) => {
      if (card.title === "Queen" && !divElement.innerText.includes("Thief"))
        //if wrong card was choosen update queen points to 0
        newPoints[card.player._id] = 0 + points[card.player._id];
      else if (
        card.title === "Thief" &&
        !divElement.innerText.includes("Thief")
      )
        // if wrong card was choosen give thief queen's point
        newPoints[card.player._id] =
          defaultCards[1].points + points[card.player._id];
      else newPoints[card.player._id] = card.points + points[card.player._id];
    });
    if (divElement.innerText.includes("Thief")) {
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
      console.log("ROund limit in timeout function is  " + roundLimit);
      if (points.round >= roundLimit) {
        socket.emit("finish-game", { roomId });
      } else {
        clickAllowed.current = true;
        shuffleCards();
      }
    }, 5000);
  };
  const [showAll, setShowAll] = useState(false);

  const renderCards = () => {
    if (!user) return;
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
        handleClick={handleClick}
        showAll={showAll}
      />
    ));
  };

  if (!user) {
    return <div>LOG IN</div>;
  }
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
