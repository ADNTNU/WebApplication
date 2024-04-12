'use client';

import useSearchFieldContext from '@hooks/context/useSearchFieldContext';
import { AppBar } from '@mui/material';
import { ReactNode, useRef } from 'react';

export default function HeaderWrapper({ children }: { children: ReactNode }) {
  const { obstructorRef } = useSearchFieldContext();

  return (
    <AppBar position="sticky" ref={obstructorRef}>
      {children}
    </AppBar>
  );
}
