import { Stack, Typography, TextField } from '@mui/material';
import React from 'react';

function airLine() {
  return (
    <Stack direction="column">
      <Typography variant="h3">Airline settings</Typography>
      <p>Information...</p>
      <Typography variant="h4">Add new airline</Typography>
      <p>Information...</p>
      <Stack direction="row">
        <TextField label="Airline" />
      </Stack>
    </Stack>
  );
}

export default airLine;
