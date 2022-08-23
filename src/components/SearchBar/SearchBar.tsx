import { useDispatch } from "react-redux";
import { setSearchTerm } from "./searchSlice";

function SearchBar() {
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="text"
        onChange={(event) => dispatch(setSearchTerm(event.target.value))}
      />
    </div>
  );
}

export default SearchBar;
