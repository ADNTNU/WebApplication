'use client';

import { ReactNode } from 'react';
import CssVarsProvider from '@material/themes/CssVarsProvider';
import getInitColorSchemeScript from '@mui/system/cssVars/getInitColorSchemeScript';

export default function FlightFinderCssVarsProvider({ children }: { children: ReactNode }) {
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
      <CssVarsProvider>{children}</CssVarsProvider>
    </>
  );
}
