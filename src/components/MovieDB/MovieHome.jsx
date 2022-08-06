import React, { useState, useEffect } from "react";
//API
import API from "../../api/movie.api";
//Styles
import { Wrapper } from "../../styles/MovieDB/MovieHome.styles";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../../config";
//Components
import HeroImage from "./HeroImage";
//Hooks
import { useHomeFetch } from "../../hooks/MovieDB/useHomeFetch";

//Image
function MovieHome() {
  const { state, loading, error } = useHomeFetch();
  console.log(state);
  return (
    <Wrapper>
      {state.results[0] && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      )}
    </Wrapper>
  );
}

export default MovieHome;
