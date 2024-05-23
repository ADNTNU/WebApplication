'use client';

import { Button } from '@mui/material';
import { ReactNode } from 'react';

type BackButtonProps = {
  children: ReactNode;
};

export default function BackButton(props: BackButtonProps) {
  const { children } = props;
  return (
    <Button
      onClick={() => {
        window.history.back();
      }}
    >
      {children}
    </Button>
  );
}
