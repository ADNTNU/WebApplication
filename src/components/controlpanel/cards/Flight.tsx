import { Stack, TextField, Autocomplete } from '@mui/material';
import React from 'react';

const top100Films = [
  { label: 'Norway', id: 1994 },
  { label: 'London', id: 1972 },
  { label: 'New York', id: 1974 },
];

type FlightProps = {
  token: string;
};

export default function Flight(props: FlightProps) {
  const { token } = props;
  return (
    <Stack gap={2}>
      <TextField label="name" />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Departure" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Arrival" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Airline" />}
      />
      <TextField label="Departure date w time" />
      <TextField label="Arrival date w time" />
    </Stack>
  );
}
