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
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('components.themeSwitcher');

  const label = t('theme');
  const darkName = t('dark');
  const lightName = t('light');

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
      <InputLabel id="theme-select-label">{label}</InputLabel>
      <Select
        value={mode}
        label={label}
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
          let name: string = themeMode;
          if (themeMode === 'dark') {
            name = darkName;
          } else if (themeMode === 'light') {
            name = lightName;
          }
          return (
            <MenuItem
              key={themeMode}
              value={themeMode}
              onClick={() => {
                setMode(themeMode);
              }}
            >
              {capitalizeFirstLetter(name)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
