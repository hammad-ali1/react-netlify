import { useState } from "react";
import { Wrapper, Card } from "../../styles/RoleCard.styles";

function RoleCard({ title, points, img }) {
  const [show, setShow] = useState(false);

  return (
    <Wrapper onClick={() => setShow(!show)}>
      <Card show={show}>
        <h2 className="title">{title}</h2>
        <img alt="PIC HERE" src={img}></img>
        <div className="points">{`${points} pts`}</div>
      </Card>
    </Wrapper>
  );
}

export default RoleCard;
