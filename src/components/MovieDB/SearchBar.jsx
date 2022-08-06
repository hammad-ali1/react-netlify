import React, { useEffect, useState, useRef } from "react";

//Icons
import SearchIcon from "@mui/icons-material/Search";

//Styles
import { Wrapper, Content } from "../../styles/MovieDB/SearchBar.styles";

const TIME_DELAY_OF_SEARCH = 5000;
function SearchBar({ setSearchTerm }) {
  //state
  const [state, setState] = useState("");
  //refs
  const initialRender = useRef(true);
  //effects
  useEffect(() => {
    if (initialRender.current) {
      //don't setSearch Term on initial render
      initialRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, TIME_DELAY_OF_SEARCH);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);
  return (
    <Wrapper>
      <Content>
        <SearchIcon className="searchIcon" />
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
