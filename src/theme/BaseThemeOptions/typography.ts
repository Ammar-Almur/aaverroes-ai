import { type Palette } from "@mui/material";
import { type TypographyOptions } from "@mui/material/styles/createTypography";

export const typography = ():
  | TypographyOptions
  | ((palette: Palette) => TypographyOptions)
  | undefined => {
  return {
    fontFamily: "var(--font-roboto)",

    button: {
      fontSize: "14px",
    },

    h1: {
      fontSize: 45,
      fontWeight: "bold",
    },
    h2: {
      fontSize: 40,
      fontWeight: "bold",
    },
    h3: {
      fontSize: 37,
      fontWeight: "bold",
    },
    h4: {
      fontSize: 26,
      fontWeight: "bold",
    },
    h5: {
      fontSize: 23,
      fontWeight: "bold",
    },
    h6: {
      fontSize: 16,
      fontWeight: "bold",
    },

    subtitle1: {
      fontSize: 14,
      fontWeight: "bold",
    },
    subtitle2: {
      fontSize: 12,
      fontWeight: "bold",
    },

    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 12,
    },

    caption: {
      fontSize: 12,
    },
  };
};
