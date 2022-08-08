import React from "react";
import { useParams } from "react-router-dom";
//Styles
import { Wrapper } from "../../styles/MovieDB/Movie.styles";
//Components
import BreadCrumb from "./BreadCrumb";
import Grid from "./Grid";
import Spinner from "../Spinner";
import Actor from "./Actor";
//Hook
import { useMovieFetch } from "../../hooks/MovieDB/useMovieFetch";

//Image
import NO_IMAGE from "../../images/no_image.jpg";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
//Types
function Movie() {
  const { movieId } = useParams();
  const parsedMovieId: number = parseInt(movieId!);
  const { state: movie, loading, error } = useMovieFetch(parsedMovieId);
  if (loading) return <Spinner />;
  return (
    <Wrapper>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? IMAGE_BASE_URL + POSTER_SIZE + actor.profile_path
                : NO_IMAGE
            }
          />
        ))}
      </Grid>
    </Wrapper>
  );
}

export default Movie;
