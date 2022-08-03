import { SocketContext } from "../../contexts/socket.context";
import { useContext, useEffect, useRef, useState } from "react";
import RoleCard from "./RoleCard";
import PointsTable from "./PointsTable";

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

function GuessThief({ players, roomId, user }) {
  const socket = useContext(SocketContext);

  const [cards, setCards] = useState(defaultCards);
  const [currentRole, setCurrentRole] = useState(null);
  const [points, setPoints] = useState({});
  const [finish, setFinish] = useState(false);
  const clickAllowed = useRef(true);
  const timer = useRef(null);
  useEffect(() => {
    resetPoints();
    shuffleCards();
    return () => {
      socket.emit("finish-game", { roomId });
    };
  }, []); //setting up points
  useEffect(() => {
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
    socket.on("play-again-GuessThief", () => {
      resetPoints();
      setFinish(false);
    });
    socket.on("finish-game", () => {
      setFinish(true);
    });
    socket.on("room-user-left", () => {
      console.log("user left");
      socket.emit("finish-game", { roomId });
    });
  }, [socket, user]);

  useEffect(() => {
    console.log(currentRole);
  }, [currentRole]);
  useEffect(() => {
    console.log(points);
  }, [points]);

  const shuffleCards = () => {
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
  };

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

    // setPoints(newPoints);
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
  const resetPoints = () => {
    const newPoints = { round: 1 };
    players.forEach((player) => (newPoints[player._id] = 0));
    setPoints(newPoints);
  };
  if (finish) {
    return (
      <>
        <button
          onClick={() => {
            socket.emit("play-again-GuessThief", { roomId });
            shuffleCards();
          }}
        >
          Play Again
        </button>
        <PointsTable players={players} currentPoints={points} />
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
    </>
  );
}

export default GuessThief;
