import React from "react";
import { Link } from "react-router-dom";
import { Wrapper, Content } from "../../styles/MovieDB/BreadCrumb.styles";

function BreadCrumb({ movieTitle }) {
  return (
    <Wrapper>
      <Content>
        <Link to="/movie-db">
          <span>Home</span>
        </Link>
        <span>|</span>
        <span>{movieTitle}</span>
      </Content>
    </Wrapper>
  );
}

export default BreadCrumb;
