"use client";
// import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import breakpoints from './breakpoints';

const theme = createTheme({
  palette: {
    // primary: {
    //   light: '#5f5d84',
    //   main: '#1a174f',
    //   dark: '#121037',
    // },
    // secondary: {
    //   light: '#c2c2ff',
    //   main: '#a8a8ff',
    //   dark: '#7676b3',
    // },
    // error: {
    //   light: '#FFA8A8',
    //   main: red.A400,
    // },
    // warning: {
    //   light: '#ffb74d',
    //   main: '#ffa726',
    //   dark: '#f57c00',
    // },
    // info: {
    //   main: '#9c27b0',
    // },
    // success: {
    //   main: '#43a047',
    // },
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
      default: '#f5f5fc',
      paper: '#f2f2f9',
    },
    mode: 'light',
  },
  breakpoints: {
    ...breakpoints,
  },
});

export default theme;
