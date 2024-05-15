import { ThemeOptionsWithName } from '@/models/Theme';

const lightThemeOptions: ThemeOptionsWithName = {
  name: 'Light',
  palette: {
    primary: {
      light: '#8AA4F9',
      main: '#446DF6',
      dark: '#2958F5',
    },
    secondary: {
      light: '#ABD7FF',
      main: '#88c7ff',
      dark: '#5F8BB2',
    },
    error: {
      light: '#FF8A80',
      main: '#FF5252',
      dark: '#E04848',
    },
    text: {
      // primary: 'rgba(0, 0, 0, 0.87)',
      // secondary: 'rgba(0, 0, 0, 0.7)',
      // disabled: 'rgba(0, 0, 0, 0.38)',
    },
    action: {
      // active: 'rgba(0, 0, 0, 0.54)',
      // hover: 'rgba(0, 0, 0, 0.04)',
      // selected: 'rgba(0, 0, 0, 0.08)',
      // disabled: 'rgba(0, 0, 0, 0.26)',
      // disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    background: {
      // default: '#FFFFFF',
      // paper: '#E9E9E9',
    },
    mode: 'light',
  },
};

export default lightThemeOptions;
