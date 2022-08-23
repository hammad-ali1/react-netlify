import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
//Components
import SearchBar from "../components/SearchBar/SearchBar";
import SearchResults from "../components/SearchResults";
import {
  selectSearchTerm,
  setSearchTerm,
} from "../components/SearchBar/searchSlice";

import useSearchFetch from "../hooks/useSearchFetch";

function Home() {
  const searchTerm = useAppSelector((store) => selectSearchTerm(store));
  const dispatch = useAppDispatch();

  const { employees } = useSearchFetch();
  useEffect(() => {
    console.log(employees);
  }, [employees]);
  return (
    <div>
      <SearchBar
        onChangeHandler={(event) => {
          dispatch(setSearchTerm(event.target.value));
        }}
      />
      {searchTerm}
      <Routes>
        <Route
          path="/search"
          element={
            <SearchResults
              employees={{ results: employees.results.slice(0, 20) }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Home;
