import { Wrapper } from "../styles/AddButton.styles";

function AddButton({ onClick, min, max }) {
  return (
    <Wrapper>
      <button onClick={onClick}>+</button>
    </Wrapper>
  );
}

export default AddButton;
