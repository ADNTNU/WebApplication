import { Stack, Typography, TextField, Button, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid';
import postLocation from '@serverActions/controlpanel/location';
import useLocationSWR from './useLocationSWR';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'country', headerName: 'First name', width: 150, editable: true },
  { field: 'name', headerName: 'Last name', width: 150, editable: true },
];

type LocationProps = {
  token: string;
};

export default function Location(props: LocationProps) {
  const { token } = props;
  const { data, error } = useLocationSWR({ limit: 10, page: 1 });
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (data) {
      setLocations(
        data.map((location) => ({
          id: location.id,
          country: location.country,
          name: location.name,
        })),
      );
    }
  }, [data]);

  return (
    <Stack direction="column">
      <Typography variant="h4">Location settings</Typography>
      <Typography mb={4}>Here we can do that and that and so on...</Typography>

      <Typography variant="h4">Add a new Location</Typography>
      <Typography mb={2}>
        Here you can add a new Airport, with a set Location that is used in flights.
      </Typography>

      <Stack direction="row" gap={2} mb={4}>
        <form
          action={(formData) => {
            postLocation({
              data: {
                name: formData.get('name') as string,
                country: formData.get('country') as string,
              },
              token,
            });
          }}
        >
          {' '}
          <TextField label="country" />
          <TextField label="name" />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
          <Button type="submit" variant="contained">
            {/* TODO: Change text in button */}
            Knapp for å sende formen
          </Button>
        </form>
      </Stack>
      <Typography variant="h4">Edit or delete locations</Typography>
      <Typography mb={2}>
        Here you can add a new Airport, with a set Location that is used in flights.
      </Typography>

      <DataGrid
        rows={locations}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        // onRowSelectionModelChange={setSelectionModel}
        // processRowUpdate={handleProcessRowUpdate}
        disableRowSelectionOnClick
      />
    </Stack>
  );
}
