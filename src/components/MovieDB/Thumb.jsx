import React from "react";
import { Link, useLocation } from "react-router-dom";

//styles
import { Image } from "../../styles/MovieDB/Thumb.styles";
function Thumb({ image, movieId, clickable }) {
  const currentLocation = useLocation().pathname;
  return (
    <div>
      {clickable ? (
        <Link to={`${currentLocation}/movie/${movieId}`}>
          <Image src={image} alt="movie-thumb"></Image>
        </Link>
      ) : (
        <Image src={image} alt="movie-thumb"></Image>
      )}
    </div>
  );
}

export default Thumb;
