import React from "react";

//Styles
import { Wrapper } from "../../styles/MovieDB/Button.styles";

function LoadButton({ text = "Button", callback, icon }) {
  return (
    <Wrapper type="button" onClick={callback}>
      {icon && <span className="icon">{icon}</span>}
      <span>{text}</span>
    </Wrapper>
  );
}

export default LoadButton;
