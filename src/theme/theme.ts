"use client";

import { type Theme } from "@mui/material";
import {
  createTheme as createMUITheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import { BaseThemeOptions } from "./BaseThemeOptions";
import { DefaultPaletteOptions } from "./BaseThemeOptions/DefaultPaletteOptions";

const createTheme = (): Theme => {
  let theme = createMUITheme(BaseThemeOptions(DefaultPaletteOptions));
  theme = responsiveFontSizes(theme);

  return theme;
};

const theme = createTheme();
export default theme;
