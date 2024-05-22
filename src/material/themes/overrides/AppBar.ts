import { CssComponentReturn, CssOverridesProps } from './models';

export default function AppBar(theme: CssOverridesProps): CssComponentReturn {
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
