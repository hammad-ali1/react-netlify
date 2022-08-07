import React from "react";
import { useParams } from "react-router-dom";
//Styles
import { Wrapper } from "../../styles/MovieDB/Movie.styles";

//Hook
import { useMovieFetch } from "../../hooks/MovieDB/useMovieFetch";

//Image
import NO_IMAGE from "../../images/no_image.jpg";
function Movie() {
  const { movieId } = useParams();
  const { state: movie, loading, error } = useMovieFetch(movieId);
  return <Wrapper>Movie</Wrapper>;
}

export default Movie;
