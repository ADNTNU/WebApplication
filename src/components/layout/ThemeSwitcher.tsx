'use client';

import { useThemeContext } from '@/contexts/ThemeContext';
import { themes } from '@/material/themes/theme';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function ThemeSwitcher() {
  const { theme, mutate } = useThemeContext();
  return (
    <FormControl>
      <InputLabel id="theme-select-label">Theme</InputLabel>
      <Select
        value={theme.name}
        label="Theme"
        aria-label="Change theme"
        labelId="theme-select-label"
      >
        <MenuItem
          key="Auto"
          value="Auto"
          onClick={() => {
            localStorage.removeItem('theme');
            mutate();
          }}
        >
          Auto
        </MenuItem>
        {Object.keys(themes).map((k) => (
          <MenuItem
            key={k}
            value={k}
            onClick={() => {
              localStorage.setItem('theme', k);
              mutate();
            }}
          >
            {k}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
