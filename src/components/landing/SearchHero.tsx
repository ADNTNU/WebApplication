'use client';

import SearchField from '@components/search/searchField';
import useSearchFieldContext from '@hooks/context/useSearchFieldContext';
import { Paper } from '@mui/material';

export default function SearchHero() {
  const { obstructedRef } = useSearchFieldContext();
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        padding: 4,
        py: 20,
      }}
    >
      <SearchField obstructedRef={obstructedRef} variant="landing" />
    </Paper>
  );
}
