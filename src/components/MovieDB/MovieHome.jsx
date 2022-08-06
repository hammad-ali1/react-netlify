import React, { useState, useEffect } from "react";
//API
import API from "../../api/movie.api";
//Styles
import { Wrapper } from "../../styles/MovieDB/MovieHome.styles";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../../config";
//Components

//Hook

//Image
function MovieHome() {
  //states
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //effects
  //initial render
  useEffect(() => {
    fetchMovies(1);
  }, []);
  //functions
  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setState((prevState) => ({
        ...movies,
        results:
          page > 1
            ? [...prevState.results, ...movies.results]
            : [...movies.results],
      }));
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  return <Wrapper>Start Here</Wrapper>;
}

export default MovieHome;
