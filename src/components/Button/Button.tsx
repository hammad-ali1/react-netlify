//Styles
import { Wrapper } from "./Button.styles";

//Types
type PropTypes = {
  text: string;
  callback: () => void;
  icon?: any;
};
function Button({ text = "Button", callback, icon }: PropTypes) {
  return <Wrapper onClick={callback}>{text}</Wrapper>;
}

export default Button;
