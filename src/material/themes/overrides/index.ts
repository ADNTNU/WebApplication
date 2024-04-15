import { Theme } from '@mui/material';
import { AppBar, CssAppBar } from './AppBar';
import { CssComponentReturn, CssOverridesProps } from './models';

const overrides = (theme: Theme) => {
  return Object.assign(AppBar(theme) /* , MuiCssBaseline(theme) */);
};

export default overrides;

export const cssOverrides = (theme: CssOverridesProps): CssComponentReturn => {
  return Object.assign(CssAppBar(theme) /* , MuiCssBaseline() */);
};
