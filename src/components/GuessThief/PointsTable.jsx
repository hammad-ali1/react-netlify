import { useEffect, useState } from "react";
import { Wrapper } from "../../styles/PointsTable.styles";

function PointsTable({ currentPoints, players }) {
  const [allPoints, setAllPoints] = useState([]);

  useEffect(() => {
    const gameResults = players.map((player) => {
      return { player, points: currentPoints[player._id] };
    });
    gameResults.sort((a, b) => b.points - a.points);
    setAllPoints(gameResults);
  }, [currentPoints, players]);
  return (
    <Wrapper>
      <div className="table">
        <div className="row">
          <div className="column header">User</div>
          <div className="column header">Points</div>
        </div>
        {allPoints.map((result, key) => (
          <div key={key} className="row">
            <div className="column">{`${result.player.username}`}</div>
            <div className="column">{`${result.points}`}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

export default PointsTable;
