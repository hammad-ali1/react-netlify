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
    <Wrapper>
      <Content>
        <Thumb
          image={
            movie.poster_path
              ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
              : NO_IMAGE
          }
          clickable={false}
        />
        <Text></Text>
      </Content>
    </Wrapper>
  );
}

export default MovieInfo;
