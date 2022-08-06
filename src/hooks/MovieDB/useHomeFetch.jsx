import { useState, useEffect } from "react";
//API
import API from "../../api/movie.api";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};
export const useMovieFetch = () => {
  //states
  const [state, setState] = useState(initialState);
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

  //return states
  return { state, loading, error };
};
