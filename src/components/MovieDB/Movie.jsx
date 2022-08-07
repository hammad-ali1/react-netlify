import React from "react";
import { useParams } from "react-router-dom";
//Styles
import { Wrapper } from "../../styles/MovieDB/Movie.styles";
//Components
import BreadCrumb from "./BreadCrumb";
import Grid from "./Grid";
import Spinner from "../Spinner";
//Hook
import { useMovieFetch } from "../../hooks/MovieDB/useMovieFetch";

//Image
import NO_IMAGE from "../../images/no_image.jpg";
function Movie() {
  const { movieId } = useParams();
  const { state: movie, loading, error } = useMovieFetch(movieId);
  if (loading) return <Spinner />;
  return (
    <Wrapper>
      <BreadCrumb movieTitle={movie.original_title} />
    </Wrapper>
  );
}

export default Movie;
