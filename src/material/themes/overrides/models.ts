import { Components, CssVarsTheme, Theme } from '@mui/material';

export type CssOverridesProps = CssVarsTheme & Omit<Theme, 'applyStyles' | 'palette'>;
export type CssComponentReturn = Components<CssVarsTheme & Omit<Theme, 'components' | 'palette'>>;
