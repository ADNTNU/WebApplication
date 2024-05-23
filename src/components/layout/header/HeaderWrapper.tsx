'use client';

import useSearchFieldContext from '@hooks/context/useSearchFieldContext';
import { AppBar } from '@mui/material';
import { ReactNode } from 'react';

export default function HeaderWrapper({ children }: { children: ReactNode }) {
  const { obstructorRef } = useSearchFieldContext();

  return (
    <AppBar position="sticky" ref={obstructorRef} sx={{ flexGrow: 1 }}>
      {children}
    </AppBar>
  );
}
