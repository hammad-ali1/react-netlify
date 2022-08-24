import { useState, useEffect } from "react";

import {
  AppBar,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DrawerComponent from "./Drawer";
import { Link } from "react-router-dom";

//Types
export type NavLink = {
  text: string;
  onClickHandler: () => void;
};

type PropTypes = { homePath?: string; title: string; navLinks: NavLink[] };
function Navbar({ homePath, title, navLinks }: PropTypes) {
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
              <Link to={homePath ? homePath : "/"}>
                <Typography>{title}</Typography>
              </Link>
              <DrawerComponent links={navLinks} />
            </>
          ) : (
            <Grid sx={{ placeItems: "center" }} container spacing={1}>
              <Grid item xs={4}>
                <Link to={homePath ? homePath : "/"}>
                  <Typography>{title}</Typography>
                </Link>
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
