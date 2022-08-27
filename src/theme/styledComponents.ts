import { TextField, Stack, styled, Button, Box } from "@mui/material";

export const BorderLessTextInput = styled(TextField)`
  border-radius: 50px;
  background-color: ${(props) => props.theme.palette.grey[500]};
  & .MuiOutlinedInput-input {
    font-size: 1.2rem;
    color: ${(props) => props.theme.palette.grey[900]};
  }
  & .MuiOutlinedInput-root {
    & > fieldset {
      border: none;
    }
  }
`;

export const RoundedButton = styled(Button)`
  width: 100%;
  border-radius: 20px;
`;
RoundedButton.defaultProps = {
  variant: "contained",
  color: "secondary",
};

export const ColoredStack = styled(Stack)`
  background-color: ${(props) => props.theme.palette.secondary.dark};
  padding: 10px;
`;

export const Thumb = styled(Box)`
  max-width: 200px;
  min-width: 80px;
  & > * {
    width: 100%;
    border-radius: 10px;
  }
`;

export const HoverEffect = styled(Box)`
  transition: all 1s;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
