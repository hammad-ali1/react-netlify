import React, { useState } from "react";

//Icons
import SearchIcon from "@mui/icons-material/Search";

//Styles
import { Wrapper, Content } from "../../styles/MovieDB/SearchBar.styles";

function SearchBar({ setSearchTerm }) {
  const [state, setState] = useState("");
  return (
    <Wrapper>
      <Content>
        <SearchIcon />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={(event) => setState(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
}

export default SearchBar;
