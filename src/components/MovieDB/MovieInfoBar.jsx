import React from "react";
//Styles
import { Wrapper, Content } from "../../styles/MovieDB/MovieInfoBar.styles";
//Helpers
import { calcTime, convertMoney } from "../../helpers/MovieDB.helpers";
function MovieInfoBar({ time, budget, revenue }) {
  return (
    <Wrapper>
      <Content>
        <div className="column">
          <p>Running time: {calcTime(time)}</p>
        </div>
        <div className="column">
          <p>Budget: {convertMoney(budget)}</p>
        </div>
        <div className="column">
          <p>Revenue: {convertMoney(revenue)}</p>
        </div>
      </Content>
    </Wrapper>
  );
}

export default MovieInfoBar;
