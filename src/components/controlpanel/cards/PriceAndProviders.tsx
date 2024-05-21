import { Stack, Typography, TextField, Autocomplete, Divider } from '@mui/material';
import React from 'react';

const top100Films = [
  { label: 'Google', id: 1994 },
  { label: 'Norwegian', id: 1972 },
  { label: 'SAS', id: 1974 },
];

type PriceAndProvidersProps = {
  token: string;
};

export default function PriceAndProviders(props: PriceAndProvidersProps) {
  const { token } = props;
  return (
    <Stack direction="column">
      <Typography variant="h4">Providers</Typography>
      <Typography mb={4}>Infor about the providers</Typography>

      <Typography variant="h4">Add new Provider</Typography>
      <Typography mb={2}>Add a new Provider</Typography>

      <Stack mb={4}>
        <TextField label="Providers" />
      </Stack>

      <Typography variant="h4">Edit or delete Provider</Typography>
      <Typography mb={2}>Add a new Provider</Typography>

      {/* TODO: Remove or make use of this empty Stack */}
      <Stack mb={4}></Stack>

      <Typography variant="h3">Prices</Typography>
      <Typography mb={4}>Info about the price</Typography>

      <Typography variant="h4">Add new price</Typography>
      <Typography mb={2}>Add a new Provider</Typography>

      <Stack direction="row" gap={2}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Providers" />}
        />
        <TextField label="Price" />
      </Stack>
    </Stack>
  );
}
