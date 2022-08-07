import React from "react";

//Styles
import { Wrapper, Image } from "../../styles/MovieDB/Actor.styles";

function Actor({ name, character, imageUrl }) {
  return (
    <Wrapper>
      <Image src={imageUrl} alt="actor-thumb" />
      <div className="details">
        <h3>{name}</h3>
        <p>{character}</p>
      </div>
    </Wrapper>
  );
}

export default Actor;
