import { Box, Paper } from '@mui/material';
import { ReactNode, RefObject } from 'react';

type RootElementProps = {
  variant: 'dialog' | 'header' | 'landing';
  active: boolean;
  shown: boolean;
  zIndexOffset: number;
  obstructedRef?: RefObject<HTMLDivElement>;
  children: ReactNode;
  compact: boolean;
};

export default function RootElement(props: RootElementProps) {
  const { variant, active, shown, zIndexOffset, obstructedRef, children, compact } = props;
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
        flexGrow: 1,
      }}
    >
      <Box
        role={shown ? 'search' : undefined}
        sx={{
          zIndex: active && shown ? (theme) => theme.zIndex.appBar + zIndexOffset : undefined,
          flexGrow: 1,
          flexShrink: 1,
          mx: 'auto',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          borderRadius: 5,
          flexDirection: variant === 'header' && compact ? 'row' : { xs: 'column', md: 'row' },
          justifyContent: 'center',
          border: '1px solid',
          borderColor: (theme) => (active && shown ? 'primary.main' : theme.palette.divider),
          // Fixes a bug where the background color is darker in the header
          // backgroundColor: (theme) => alpha(theme.palette.background.paper, 1),
          transition: 'opacity 0.2s ease-in-out',
          ...(!shown
            ? {
                opacity: 0,
              }
            : {
                opacity: 1,
              }),
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}
