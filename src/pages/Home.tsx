import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
//Components
import SearchBar from "../components/SearchBar/SearchBar";

function Home() {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  return (
    <div>
      <SearchBar />
      {searchTerm}
    </div>
  );
}

export default Home;
