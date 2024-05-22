import React from 'react';
import { Divider, Stack, TextField, Button } from '@mui/material';
import putTrip from '@serverActions/controlpanel/trip';
import { DataGrid, GridColDef, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid';

type TripProps = {
  token: string;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'initial-Flight', headerName: 'Initial flight', width: 150, editable: true },
  { field: 'active', headerName: 'Active', width: 150, editable: true },
];

function Trip(props: TripProps) {
  const { token } = props;
  return (
    <Stack direction="column">
      <form
        action={(formData) => {
          putTrip({
            data: {
              id: formData.get('id'),
              active: formData.get('active'),
            },
            token,
          });
        }}
      >
        <TextField label="id" id="id" name="id" type="number" />
        <TextField label="active" id="active" name="active" />
        <Button type="submit" variant="contained">
          {/* TODO: Change text in button */}
          Knapp for å sende formen
        </Button>
      </form>
    </Stack>
  );
}

export default Trip;
