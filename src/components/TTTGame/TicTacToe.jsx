import { useEffect, useState } from "react";
import Board from "./Board";
import { Wrapper } from "../../styles/TicTacToe.styles";

function TicTacToe({ playerName, marker, socket, roomId }) {
  const [winner, setWinner] = useState(null);
  const [squares, setSquares] = useState([]);
  const [isTurn, setIsTurn] = useState(true);
  useEffect(() => {
    if (marker === "O") {
      setIsTurn(false);
    } else {
      setIsTurn(true);
    }

    socket.on("refresh-squares", ({ squares }) => {
      setSquares(squares);
      setIsTurn(true);
    });

    return () => {
      socket.off("refresh-squares");
    };
  }, [marker, socket]);

  const handleClick = (i) => {
    if (winner || squares[i] || !isTurn) {
      //if someone won or square is non empty. Do nothing
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = marker;
    setSquares(newSquares);
    setIsTurn(false);
    socket.emit("refresh-squares", { squares: newSquares, roomId });
    calculateWinner(squares);
  };
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(squares[a] === marker ? `${playerName} WON!!` : "You Lost!");
        return squares[a];
      }
    }
    return null;
  };
  return (
    <Wrapper>
      <div className="game">
        <div className="game-board">
          {isTurn ? (
            <h1 className="turn-info">{`${playerName}'s Turn`}</h1>
          ) : (
            <h1 className="turn-info">Wait For Your Turn</h1>
          )}

          <Board squares={squares} onClick={(i) => handleClick(i)} />
          {winner ? <h1>{`${winner}`}</h1> : <div></div>}
        </div>
      </div>
    </Wrapper>
  );
}

export default TicTacToe;
