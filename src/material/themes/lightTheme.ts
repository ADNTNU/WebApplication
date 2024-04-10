import { ThemeOptionsWithName } from '@/models/Theme';

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
      // default: '#FFFFFF',
      // paper: '#E9E9E9',
    },
    mode: 'light',
  },
};

export default lightThemeOptions;
