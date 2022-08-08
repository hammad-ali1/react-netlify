import React from 'react';
import { Routes, Route } from "react-router-dom";

//Components
import Movie from "../components/MovieDB/Movie";
import MovieHome from "../components/MovieDB/MovieHome";
import PageNotFound from "../components/PageNotFound";
import TMDBAtribution from "../components/MovieDB/TMDBAttribution";

function MovieDB() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Routes>
        <Route path="/" element={<MovieHome />} />
        <Route path="/movie/:movieId" element={<Movie />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <TMDBAtribution />
    </div>
  );
}

export default MovieDB;
