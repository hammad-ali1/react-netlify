import React, { useState, useContext, useEffect } from "react";

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
import { Link, useNavigate } from "react-router-dom";
//apis
import { logout } from "../api/auth.api";
//Context
import { UserContext, SocketContext } from "../context";

//Types
export type NavLink = { text: string; href: string; action: () => void };
type PropTypes = { baseUrl: string; title: string };
function Navbar({ baseUrl, title }: PropTypes) {
  //Contexts
  const [user, setUser] = useContext(UserContext);
  const [socket, setSocket] = useContext(SocketContext);
  //States
  const [tabValue, setTabValue] = useState(0);
  const logInLinks = [
    { text: "Home", href: "/", action: () => {} },
    { text: "Sign Up", href: "/signup", action: () => {} },
    { text: "Log In", href: "/login", action: () => {} },
  ];
  const logOutLinks = [
    { text: "Home", href: "/", action: () => {} },
    {
      text: "Log Out",
      href: "/",
      action: () => {
        logout();
        setUser!(null);
        socket!.disconnect();
        setSocket!(null);
      },
    },
  ];
  const [links, setLinks] = useState(user ? logOutLinks : logInLinks);

  //Effects
  useEffect(() => {
    setTabValue(0);
  }, [links]);
  useEffect(() => {
    setLinks(user ? logOutLinks : logInLinks);
  }, [user]);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  //router navigator
  const navigate = useNavigate();

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
              <Link style={{ textDecoration: "none" }} to={baseUrl}>
                <Typography style={{ fontSize: "28px", color: "white" }}>
                  {title}
                </Typography>
              </Link>
              <DrawerComponent links={links} />
            </>
          ) : (
            <Grid sx={{ placeItems: "center" }} container spacing={1}>
              <Grid item xs={4}>
                <Link style={{ textDecoration: "none" }} to={baseUrl}>
                  <Typography style={{ fontSize: "28px", color: "white" }}>
                    {title}
                  </Typography>
                </Link>
              </Grid>
              <Grid xs={8} item={true}>
                <Tabs
                  value={tabValue}
                  indicatorColor="primary"
                  onChange={(e, val) => setTabValue(val)}
                >
                  {links.map((link, index) => {
                    return (
                      <Tab
                        style={{
                          color: "white",
                          marginLeft: index === 0 ? "auto" : "0px",
                        }}
                        key={index}
                        label={link.text}
                        onClick={() => {
                          if (link.action) link.action();
                          navigate(link.href, { replace: true });
                        }}
                      ></Tab>
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
