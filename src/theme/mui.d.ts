declare module "@mui" {
  declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
      login: true;
    }

    interface ButtonPropsColorOverrides {
      error: true;
      darkGray: true;
      dark: true;
    }
  }

  declare module "@mui/material/SvgIcon" {
    interface SvgIconPropsColorOverrides {
      inactive: true;
      dark: true;
    }
  }

  interface PaletteColor {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
  }

  // those are custom colors that's how you add them
  declare module "@mui/material/styles" {
    interface Palette {
      inactive: PaletteColor;
      light: PaletteColor;
      dark: PaletteColor;
      darkGray: PaletteColor;
      lightGray: PaletteColor;
    }
    interface PaletteOptions {
      inactive: PaletteColor;
      light: PaletteColor;
      dark: PaletteColor;
      darkGray: PaletteColor;
      lightGray: PaletteColor;
    }
  }

  declare module "@mui/material/styles" {
    interface TypeText {
      darkGray: string;
      success: string;
      light: string;
      info: string;
    }
  }
  declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
      light: true;
    }
  }
}
