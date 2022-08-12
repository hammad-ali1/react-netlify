import { useEffect, useState } from "react";
import { Wrapper, Card } from "../../styles/RoleCard.styles";

//Types
type PropTypes = {
  title: string;
  points: number;
  img: string;
  player: User;
  showAll: boolean;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
  className: string;
};
function RoleCard({
  title,
  points,
  img,
  player,
  showAll,
  handleClick,
  className,
}: PropTypes) {
  useEffect(() => {
    if (title === "King" || title === "Queen") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [title]);
  const [show, setShow] = useState(showAll || false);
  return (
    <div className={className}>
      <Wrapper onClick={handleClick}>
        <Card show={showAll || show}>
          <h2 className="title">{title}</h2>
          <img alt="PIC HERE" src={img}></img>
          <div className="points">{`${points} pts`}</div>
        </Card>
        <div className="player-name">
          {player ? player.username : "No Player Assigned"}
        </div>
      </Wrapper>
    </div>
  );
}

export default RoleCard;
