import React, { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";

//styles
import { Image } from "../../styles/MovieDB/Thumb.styles";

//Types
type PropTypes = {
  image: string;
  movieId?: number;
  clickable: boolean;
};
function Thumb({ image, movieId, clickable }: PropsWithChildren<PropTypes>) {
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
