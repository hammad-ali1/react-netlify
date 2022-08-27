import { TextField, Stack, styled, Button } from "@mui/material";

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

export const CenterAlignedStack = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
}));

export const RoundedButton = styled(Button)`
  width: 100%;
  border-radius: 20px;
`;
RoundedButton.defaultProps = {
  variant: "contained",
  color: "secondary",
};
