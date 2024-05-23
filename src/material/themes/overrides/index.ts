import AppBar from './AppBar';
import MuiCssBaseline from './MuiCssBaseline';
import { CssComponentReturn, CssOverridesProps } from './models';
import '@mui/material/Slider';

const overrides = (theme: CssOverridesProps): CssComponentReturn => {
  return Object.assign(AppBar(theme), MuiCssBaseline());
};

export default overrides;
