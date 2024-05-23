'use client';

import { ReactNode } from 'react';
import CssVarsProvider from '@material/themes/CssVarsProvider';
import getInitColorSchemeScript from '@mui/system/cssVars/getInitColorSchemeScript';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Locale } from '@internationalization/i18n';
import setDayjsLocale from '@internationalization/utils/setDayjsLocale';

export default function FlightFinderCssVarsProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  setDayjsLocale(locale);
  return (
    <>
      {getInitColorSchemeScript({
        // These properties are normally set when importing from @mui/material,
        // but we have to set manually because we are importing from @mui/system.
        attribute: 'data-mui-color-scheme',
        modeStorageKey: 'mui-mode',
        colorSchemeStorageKey: 'mui-color-scheme',
        // All options that you pass to CssVarsProvider you should also pass here.
        defaultMode: 'system',
      })}
      <CssVarsProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
          {children}
        </LocalizationProvider>
      </CssVarsProvider>
    </>
  );
}
