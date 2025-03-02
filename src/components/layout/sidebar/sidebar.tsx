import { NavLink } from "@/src/types";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

const drawerWidth = 240;
interface SidebarProps {
  open: boolean;
  toggleOpen: () => void;
  listLinks: NavLink[];
}
function Sidebar(props: SidebarProps) {
  const { open, toggleOpen, listLinks } = props;
  const drawerLinks = listLinks.map((link) => (
    <ListItem key={link.title}>
      <ListItemText primary={link.title} />
    </ListItem>
  ));

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={toggleOpen}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <div>
        <List>{drawerLinks}</List>
      </div>
    </Drawer>
  );
}

export default Sidebar;


