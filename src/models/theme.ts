import { ThemeOptions, Theme as MUITheme } from '@mui/material';

export type ThemeMode = 'Dark' | 'Light';
export type ThemeOptionsWithName = ThemeOptions & { name: ThemeMode };
export type Theme = { name: ThemeMode | 'Auto' | 'Default'; theme: MUITheme };
