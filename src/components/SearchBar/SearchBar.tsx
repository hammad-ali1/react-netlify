import { useAppSelector } from "../../app/hooks";
import { selectSearchTerm } from "../SearchBar/searchSlice";

//Icons
import SearchIcon from "@mui/icons-material/Search";
//Styles
import { Wrapper, Content } from "./SearchBar.styles";
//Types
export type SearchBarProps = {
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
};
function SearchBar({ onChangeHandler }: SearchBarProps) {
  const searchTerm = useAppSelector((store) => selectSearchTerm(store));
  return (
    <Wrapper>
      <Content>
        <SearchIcon className="searchIcon" />
        <input
          type="text"
          placeholder="Search Teachers"
          onChange={onChangeHandler}
          value={searchTerm}
        />
      </Content>
    </Wrapper>
  );
}

export default SearchBar;
