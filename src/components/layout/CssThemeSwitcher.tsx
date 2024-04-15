'use client';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { commonTheme } from '@material/themes/theme';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SupportedColorScheme,
  useColorScheme,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function CssThemeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // for server-side rendering
    // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    return null;
  }

  return (
    <FormControl>
      <InputLabel id="theme-select-label">Theme</InputLabel>
      <Select
        value={mode}
        label="Theme"
        aria-label="Change theme"
        labelId="theme-select-label"
        disabled={!mounted}
      >
        <MenuItem
          key="Auto"
          value="system"
          onClick={() => {
            setMode(null);
          }}
        >
          Auto
        </MenuItem>
        {Object.keys(commonTheme.colorSchemes).map((k) => {
          const themeMode = k as SupportedColorScheme;
          return (
            <MenuItem
              key={themeMode}
              value={themeMode}
              onClick={() => {
                setMode(themeMode);
              }}
            >
              {capitalizeFirstLetter(k)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
