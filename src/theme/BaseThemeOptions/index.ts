import {
  createTheme,
  type PaletteOptions,
  type ThemeOptions,
} from "@mui/material/styles";

import { typography as _typography } from "./typography";

export const BaseThemeOptions = (
  _palette: PaletteOptions | undefined
): ThemeOptions => {
  /**
   * Description
   * - this line is to make the sure of the  `palette`, `typography` options in case one of it miss something
   */
  const { palette, typography } = createTheme({
    typography: _typography(),
    palette: _palette,
  });

  return {
    palette,
    typography,
  };
};
