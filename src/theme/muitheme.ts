import { createTheme } from "@mui/material/styles";
import { purple, orange } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme extends ThemeOptions {}
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status: {
      danger: string;
    };
    colors: {
      white: string;
    };
  }

  interface PaletteOptions {
    myColors: {
      white: string;
    };
  }
  interface Palette extends PaletteOptions {}
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: purple,
    background: { default: "#202124" },
    myColors: {
      white: "white",
    },
  },
  //custom variables in theme
  status: {
    danger: orange[500],
  },
  colors: {
    white: "white",
  },
});
export default theme;
