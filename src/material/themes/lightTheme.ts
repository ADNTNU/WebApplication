import { red } from '@mui/material/colors';
import { ThemeOptionsWithName } from '@models/theme';

const lightThemeOptions: ThemeOptionsWithName = {
  name: 'Light',
  palette: {
    primary: {
      light: '#6E6EAF',
      main: '#31308D',
      dark: '#222162',
    },
    secondary: {
      light: '#ABD7FF',
      main: '#88c7ff',
      dark: '#5F8BB2',
    },
    error: {
      light: '#FFA8A8',
      main: red.A400,
    },
    warning: {
      light: '#ffb74d',
      main: '#ffa726',
      dark: '#f57c00',
    },
    info: {
      main: '#9c27b0',
    },
    success: {
      main: '#43a047',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.7)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    background: {
      default: '#FDFDFD',
      paper: '#FFFFFF',
    },
    mode: 'light',
  },
};

export default lightThemeOptions;
