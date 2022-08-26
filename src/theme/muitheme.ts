import { createTheme } from "@mui/material/styles";
import { purple, orange } from "@mui/material/colors";
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: purple,
  },
  //custom variables in theme
  status: {
    danger: orange[500],
  },
});
export default theme;
