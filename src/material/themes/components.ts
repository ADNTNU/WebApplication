import { Theme, ThemeOptions, } from "@mui/material";

const components = (theme: Theme): ThemeOptions["components"] => {
  return {
    // MuiContainer: {
    //   styleOverrides: {
    //     maxWidthXl: {
    //       [theme.breakpoints.up("xl")]: {
    //         maxWidth: "1536px",
    //       },
    //     },
    //   },
    // },
  };
};

export default components;
