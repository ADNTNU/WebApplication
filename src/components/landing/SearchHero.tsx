'use client';

import SearchField from '@components/search/searchField';
import useSearchFieldContext from '@hooks/context/useSearchFieldContext';
import { Box, Paper } from '@mui/material';
import Image from 'next/image';
import heroBackgroud from '@images/hero-background.jpg';

export default function SearchHero() {
  const { obstructedRef } = useSearchFieldContext();
  return (
    <Paper
      sx={{
        backgroundColor: 'background.paper',
        height: 450,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        src={heroBackgroud}
        alt="Hero Background"
        fill
        style={{
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          background: 'rgba(0, 0, 0, 0.15)',
          height: '100%',
          width: '100%',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <SearchField obstructedRef={obstructedRef} variant="landing" />
        </Box>
      </Box>
    </Paper>
  );
}
