import { useState, useEffect, useCallback } from "react";
import API from "../../api/movie.api";

export const useMovieFetch = (movieId) => {
  //States
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //Callbacks
  const fetchMovie = useCallback(async (movieId) => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);
      //Get directors
      const directors = credits.crew.filter(
        (crewMember) => crewMember.job === "Director"
      );

      //setState
      setState({ ...movie, actors: credits.cast, directors });
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  }, []);

  //Effects
  useEffect(() => {
    fetchMovie(movieId);
  }, [movieId, fetchMovie]);

  //return statement of hook
  return { state, loading, error };
};
