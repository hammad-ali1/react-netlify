import MovieHome from "../components/MovieDB/MovieHome";
import { Routes, Route } from "react-router-dom";

//Components
import Movie from "../components/MovieDB/Movie";
import PageNotFound from "../components/PageNotFound";
function MovieDB() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MovieHome />} />
        <Route path="/movie/:movieId" element={<Movie />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default MovieDB;
