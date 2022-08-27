import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
//Components
import SearchBar from "../components/SearchBar/SearchBar";
import SearchResults from "../components/SearchResults/SearchResults";
import HomeItems from "../components/HomeItems/HomeItems";
import { setSearchTerm } from "../components/SearchBar/searchSlice";
import useSearchFetch from "../hooks/useSearchFetch";

function Home() {
  const dispatch = useAppDispatch();
  const { employees, loading } = useSearchFetch();
  return (
    <div>
      <SearchBar
        onChangeHandler={(event) => {
          dispatch(setSearchTerm(event.target.value));
        }}
      />
      <Routes>
        <Route path="/" element={<HomeItems />} />
        <Route
          path="search"
          element={
            <SearchResults
              loading={loading}
              employees={{ results: employees.results.slice(0, 20) }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Home;
