import { Components, CssVarsTheme, Theme } from '@mui/material';
import { AppBar, CssAppBar } from './AppBar';

const overrides = (theme: Theme) => {
  return Object.assign(AppBar(theme) /* , MuiCssBaseline(theme) */);
};

export default overrides;

export type CssOverridesProps = CssVarsTheme & Omit<Theme, 'applyStyles' | 'palette'>;
export type CssComponentReturn = Components<CssVarsTheme & Omit<Theme, 'components' | 'palette'>>;

export const cssOverrides = (theme: CssOverridesProps): CssComponentReturn => {
  return Object.assign(CssAppBar(theme) /* , MuiCssBaseline() */);
};
