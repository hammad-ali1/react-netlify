import React from "react";

//styles
import { Image } from "../../styles/MovieDB/Thumb.styles";
function Thumb({ image, movieId, clickable }) {
  return (
    <div>
      <Image src={image} alt="movie-thumb"></Image>;
    </div>
  );
}

export default Thumb;
