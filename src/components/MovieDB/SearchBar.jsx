import React from "react";

//Icons
import SearchIcon from "@mui/icons-material/Search";

//Styles
import { Wrapper, Content } from "../../styles/MovieDB/SearchBar.styles";

function SearchBar({ setSearchTerm }) {
  return (
    <Wrapper>
      <Content>
        <SearchIcon />
        <input type="text" placeholder="Search Movie" />
      </Content>
    </Wrapper>
  );
}

export default SearchBar;
