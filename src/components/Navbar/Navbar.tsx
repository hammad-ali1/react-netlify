import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DrawerComponent from "./Drawer";
import LogoImage from "../../assets/logo.png";

//Redux
import { useAppDispatch } from "../../app/hooks";
import { setSearchTerm } from "../SearchBar/searchSlice";
//Types
export type NavLink = {
  text: string;
  onClickHandler: () => void;
};

type PropTypes = { homePath?: string; title: string; navLinks: NavLink[] };
function Navbar({ homePath, title, navLinks }: PropTypes) {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const handleLogoClick = () => {
    dispatch(setSearchTerm(""));
    navigator("/", { replace: true });
  };
  //States
  const [tabValue, setTabValue] = useState(0);

  //Effects
  useEffect(() => {
    setTabValue(0);
  }, [navLinks]);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background:
            "linear-gradient(90deg, rgba(4,4,4,1) 0%, rgba(57,61,61,1) 51%, rgba(4,4,4,1) 100%)",
        }}
      >
        <Toolbar>
          {isSmall ? (
            <>
              <img
                onClick={handleLogoClick}
                src={LogoImage}
                alt="logo"
                style={{ width: "50px", margin: "0" }}
              />
              <DrawerComponent links={navLinks} />
            </>
          ) : (
            <Grid sx={{ placeItems: "center" }} container spacing={1}>
              <Grid item xs={4}>
                <img
                  onClick={handleLogoClick}
                  src={LogoImage}
                  alt="logo"
                  style={{ width: "100px", margin: "0" }}
                />
              </Grid>
              <Grid xs={8} item={true}>
                <Tabs
                  sx={{ placeContent: "flex-end" }}
                  value={tabValue}
                  indicatorColor="primary"
                  onChange={(e, val) => setTabValue(val)}
                >
                  {navLinks.map((link, index) => {
                    return (
                      <Tab
                        key={index}
                        label={link.text}
                        className="textColor"
                        sx={index === 0 ? { marginLeft: "auto" } : {}}
                        onClick={link.onClickHandler}
                      />
                    );
                  })}
                </Tabs>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
