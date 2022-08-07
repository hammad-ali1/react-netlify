import React from "react";

//Styles
import { Wrapper, Content, Text } from "../../styles/MovieDB/MovieInfo.styles";

//Components
import Thumb from "./Thumb";

//Config
import { POSTER_SIZE, IMAGE_BASE_URL } from "../../config";

//Image
import NO_IMAGE from "../../images/no_image.jpg";

function MovieInfo({ movie }) {
  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumb
          image={
            movie.poster_path
              ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
              : NO_IMAGE
          }
          clickable={false}
        />
        <Text>
          <h1>{movie.title}</h1>
          <h3>PLOT</h3>
          <p>{movie.overview}</p>

          <div className="rating-directors">
            <div>
              <h3>RATING</h3>
              <div className="score">
                {Number.parseFloat(movie.vote_average).toFixed(1)}
              </div>
            </div>
            <div className="director">
              <h3>DIRECTOR</h3>
              {movie.directors.map((director) => (
                <p key={director.credit_id}>{director.name} </p>
              ))}
            </div>
          </div>
        </Text>
      </Content>
    </Wrapper>
  );
}

export default MovieInfo;
