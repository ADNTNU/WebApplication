import { Theme } from '@mui/material';
import AppBar from './AppBar';

const overrides = (theme: Theme) => {
  return Object.assign(AppBar(theme) /* , MuiCssBaseline(theme) */);
};

export default overrides;
