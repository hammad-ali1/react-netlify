import React from "react";

//Styles
import { Wrapper } from "../../styles/MovieDB/LoadButton.styles";

function LoadButton({ text, callback }) {
  return (
    <Wrapper type="button" onClick={callback}>
      {text}
    </Wrapper>
  );
}

export default LoadButton;
