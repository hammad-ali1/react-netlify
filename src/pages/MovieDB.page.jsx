import MovieHome from "../components/MovieDB/MovieHome";
import { Routes, Route } from "react-router-dom";

//Components
import Movie from "../components/MovieDB/Movie";
function MovieDB() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MovieHome />} />
        <Route path="/movie" element={<Movie />} />
      </Routes>
    </>
  );
}

export default MovieDB;
