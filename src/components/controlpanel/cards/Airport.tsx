import { Stack, Typography, TextField, MenuItem, Autocomplete } from '@mui/material';
import React from 'react';

const top100Films = [
  { label: 'Norway', id: 1994 },
  { label: 'London', id: 1972 },
  { label: 'New York', id: 1974 },
];

type AirportProps = {
  token: string;
};

export default function Airport(props: AirportProps) {
  const { token } = props;
  return (
    <Stack direction="column">
      <Typography variant="h3">Airport settings</Typography>
      <p>Here we can do that and that and so on...</p>
      <Typography variant="h3">Add a new Airport</Typography>
      <p>Here you can add a new Airport, with a set Location that is used in flights.</p>
      <Stack direction="row" gap={2}>
        <TextField label="name" />
        <TextField label="code" />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Locations" />}
        />
      </Stack>
    </Stack>
  );
}
