import { Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "16px 0",
        marginTop: "auto",
        backgroundColor: "#f1f1f1",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2025 My App. All rights reserved.
      </Typography>
    </footer>
  );
}

export default Footer;
