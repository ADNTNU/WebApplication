import { Theme } from '@mui/material/styles';
import { CssComponentReturn, CssOverridesProps } from '.';

export function AppBar(theme: Theme) {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
          height: 75,
        },
      },
    },
  };
}

export function CssAppBar(theme: CssOverridesProps): CssComponentReturn {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.vars.palette.background.default,
          height: 75,
        },
      },
    },
  };
}
