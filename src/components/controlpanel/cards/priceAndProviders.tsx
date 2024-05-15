import { Stack, Typography, TextField, Autocomplete, Divider } from '@mui/material';
import React from 'react';

const top100Films = [
  { label: 'Google', id: 1994 },
  { label: 'Norwegian', id: 1972 },
  { label: 'SAS', id: 1974 },
];

function priceAndProviders() {
  return (
    <Stack>
      <Typography variant="h3">Providers</Typography>
      <p>Infor about the providers</p>
      <Stack>
        <TextField label="Providers"></TextField>
      </Stack>

      <Divider></Divider>

      <Typography variant="h3">Prices</Typography>
      <p>Info about the price</p>
      <Stack direction="row" gap={2}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Providers" />}
        />
        <TextField label="Price"></TextField>
      </Stack>
    </Stack>
  );
}

export default priceAndProviders;
