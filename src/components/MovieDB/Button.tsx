import React from "react";

//Styles
import { Wrapper } from "../../styles/MovieDB/Button.styles";

//Types
type PropTypes = {
  text: string;
  callback: () => void;
  icon?: any;
};
function LoadButton({ text = "Button", callback, icon }: PropTypes) {
  return (
    <Wrapper type="button" onClick={callback}>
      {icon && <span className="icon">{icon}</span>}
      <span>{text}</span>
    </Wrapper>
  );
}

export default LoadButton;
