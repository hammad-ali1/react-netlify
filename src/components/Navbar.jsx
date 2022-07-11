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

function Navbar({ value, setValue, links, baseUrl, title }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
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
                  value={value}
                  indicatorColor="primary"
                  onChange={(e, val) => setValue(val)}
                >
                  {links.map((link, index) => {
                    return (
                      <Tab
                        style={{
                          color: "white",
                          marginLeft: index === 0 && "auto",
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
