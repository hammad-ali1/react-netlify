import React, { useState, useEffect } from "react";
//Styles
import { Wrapper } from "../../styles/MovieDB/MovieHome.styles";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../../config";
//Components

//Hook

//Image
function MovieHome() {
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);

  return <Wrapper>Start Here</Wrapper>;
}

export default MovieHome;
