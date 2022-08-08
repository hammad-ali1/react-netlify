import React from "react";

//Styles
import { Wrapper, Image } from "../../styles/MovieDB/Actor.styles";

//Types
type PropTypes = {
  name: string;
  character: string;
  imageUrl: string;
};
function Actor({ name, character, imageUrl }: PropTypes) {
  return (
    <Wrapper>
      <Image className="image" src={imageUrl} alt="actor-thumb" />
      <div className="details">
        <h3>{name}</h3>
        <p>{character}</p>
      </div>
    </Wrapper>
  );
}

export default Actor;
