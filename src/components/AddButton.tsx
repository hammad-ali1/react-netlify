import { Wrapper } from "../styles/AddButton.styles";

//Types
type PropTypes = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  min: string;
  max: string;
};
function AddButton({ onClick, min, max }: PropTypes) {
  return (
    <Wrapper>
      <button onClick={onClick}>+</button>
    </Wrapper>
  );
}

export default AddButton;
