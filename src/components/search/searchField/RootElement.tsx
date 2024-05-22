import { Paper } from '@mui/material';
import { ReactNode, RefObject } from 'react';

type RootElementProps = {
  variant: 'header' | 'landing';
  active: boolean;
  shown: boolean;
  zIndexOffset: number;
  obstructedRef?: RefObject<HTMLDivElement>;
  children: ReactNode;
};

export default function RootElement(props: RootElementProps) {
  const { variant, active, shown, zIndexOffset, obstructedRef, children } = props;
  return (
    <Paper
      elevation={variant === 'landing' ? 2 : undefined}
      ref={variant !== 'header' ? obstructedRef : undefined}
      sx={{
        zIndex:
          active && shown
            ? (theme) => {
                return theme.zIndex.appBar + zIndexOffset;
              }
            : undefined,
        position: 'relative',
        left: shown ? undefined : '-10000px',
        display: 'flex',
        borderRadius: 5,
        mx: 'auto',
      }}
    >
      {children}
    </Paper>
  );
}
