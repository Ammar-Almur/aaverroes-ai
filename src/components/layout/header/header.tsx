import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: "inherit",
        color: "inherit",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "12px",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          My App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
