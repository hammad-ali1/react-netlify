import React, { useState, useEffect } from "react";
//API
import API from "../../api/movie.api";
//Styles
import { Wrapper } from "../../styles/MovieDB/MovieHome.styles";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../../config";
//Components

//Hooks
import { useHomeFetch } from "../../hooks/MovieDB/useHomeFetch";

//Image
function MovieHome() {
  const { state, loading, error } = useHomeFetch();
  console.log(state);
  return <Wrapper>Start Here</Wrapper>;
}

export default MovieHome;
