import { TextField, Stack, styled } from "@mui/material";

export const BorderLessTextInput = styled(TextField)`
  border-radius: 50px;
  background-color: ${(props) => props.theme.palette.grey[500]};
  & .MuiOutlinedInput-input {
    font-size: 1.2rem;
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
