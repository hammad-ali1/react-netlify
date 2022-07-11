import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
function DrawerComponent({ links }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List component={Stack} direction="column">
          {links.map((link, index) => (
            <Link style={{ textDecoration: "none" }} to={link.href}>
              <ListItemButton
                onClick={() => setOpen(false)}
                key={index}
                divider
              >
                <ListItemIcon>
                  <ListItemText>{link.text}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
      <IconButton sx={{ marginLeft: "auto" }} onClick={() => setOpen(true)}>
        {" "}
        <MenuIcon style={{ color: "white" }} />
      </IconButton>
    </>
  );
}

export default DrawerComponent;
