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
        height: { xs: 350, md: 450 },
        width: '100%',
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
          filter: 'brightness(0.75)' /* blur(0.25px)', */,
        }}
        sizes="max-width: 1200px) 100vw, 1200px"
      />
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
    </Paper>
  );
}
