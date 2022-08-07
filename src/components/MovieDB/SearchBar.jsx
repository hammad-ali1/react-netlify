import React, { useEffect, useState, useRef } from "react";

//Icons
import SearchIcon from "@mui/icons-material/Search";

//Styles
import { Wrapper, Content } from "../../styles/MovieDB/SearchBar.styles";

const TIME_DELAY_OF_SEARCH = 2000;
function SearchBar({ setSearchTerm, searchTerm }) {
  //state
  const [state, setState] = useState(searchTerm);
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

  useEffect(() => {
    //if searach term is changed outside of the component. change the inside state too
    setState(searchTerm);
  }, [searchTerm]);
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
