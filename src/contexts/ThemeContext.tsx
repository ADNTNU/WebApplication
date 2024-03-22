'use client';

import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { useMediaQuery } from '@mui/material';
import { Theme } from '@models/theme';

export const useDarkTheme = () => {
  const isDarkModePreffered = useMediaQuery('(prefers-color-scheme: dark)');

  return isDarkModePreffered;
};

export type ThemeProps = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>> | (() => Theme);
  mutate: () => void;
};

export const ThemeContext = createContext<ThemeProps>({} as ThemeProps);
export const useThemeContext = () => useContext(ThemeContext);
