import { red } from '@mui/material/colors';
import { ThemeOptionsWithName } from '@models/theme';

const darkThemeOptions: ThemeOptionsWithName = {
  name: 'Dark',
  palette: {
    primary: {
      light: '#bEbEFF',
      main: '#8E8EcF',
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
      primary: 'rgba(255, 255, 255, 0.9)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.38)',
    },
    action: {
      active: 'rgba(255, 255, 255, 0.54)',
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(255, 255, 255, 0.08)',
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
    background: {
      default: '#3c3c3c',
      paper: '#404040',
    },
    mode: 'dark',
  },
};

export default darkThemeOptions;
