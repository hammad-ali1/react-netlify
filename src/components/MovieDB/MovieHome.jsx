import React, { useState, useEffect } from "react";

//Styles
import { Wrapper } from "../../styles/MovieDB/MovieHome.styles";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../../config";
//Components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
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
      <Grid header="Popular Movies">
        {state.results.map((movie) => (
          <Thumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                : "NoImage"
            }
            movieId={movie.id}
          >
            {movie.title}
          </Thumb>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default MovieHome;
