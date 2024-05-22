import { Stack, Typography, TextField, Button, Divider, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridRowModel, GridRowSelectionModel } from '@mui/x-data-grid';
import postLocation, { putLocation, deleteLocation } from '@serverActions/controlpanel/location';
import useLocationSWR from './useLocationSWR';
import { Location as LocationType } from '@models/Location';
import { PutLocation } from '@models/DTO/Location';

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
  { field: 'country', headerName: 'Country', width: 150, editable: true },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
];

const handleProcessRowUpdate = async (newRow: GridRowModel, token: string) => {
  console.log(`User Updated: ID ${newRow.id}, Name ${newRow.name} Data:`, newRow);

  try {
    const updatedLocation: PutLocation = {
      id: newRow.id as string,
      name: newRow.name as string,
      country: newRow.country as string,
      image: 'Needs to be added',
    };
    console.log('Updated Location:', updatedLocation);

    await putLocation({
      data: updatedLocation,
      token,
    });
    console.log('Location updated successfully');
  } catch (error) {
    console.error('Failed to update location', error);
    throw new Error('Update failed'); // Handle this error appropriately in your UI
  }
  return newRow;
};

type LocationProps = {
  token: string;
};

export default function Location(props: LocationProps) {
  const { token } = props;
  const { data } = useLocationSWR({ limit: 10, page: 1 });
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);

  const handleDeleteLocations = async () => {
    if (selectionModel.length === 0) {
      console.log('No locations selected for deletion.');
      return;
    }

    // Optional: Confirm dialog before deletion
    const confirm = window.confirm('Are you sure you want to delete these locations?');
    if (!confirm) return;

    try {
      // Assuming deleteLocation sends a DELETE request to your server
      await Promise.all(
        selectionModel.map((locationId) =>
          deleteLocation({
            token,
            data: { id: locationId.toString() }, // Ensure the id is converted to string if necessary
          }),
        ),
      );

      // Update local state to remove deleted locations
      const remainingLocations = locations.filter(
        (location) => !selectionModel.includes(location.id),
      );
      setLocations(remainingLocations);
      setSelectionModel([]); // Clear selection after deletion
      console.log('Locations deleted successfully');
    } catch (error) {
      console.error('Failed to delete locations', error);
    }
  };

  useEffect(() => {
    if (data) {
      setLocations(
        data.map((location) => ({
          id: location.id,
          country: location.country,
          name: location.name,
          image: location.image,
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
            // try {
            postLocation({
              data: {
                name: formData.get('name') as string,
                country: formData.get('country') as string,
                image: 'URL',
              },
              token,
            });
            // } catch (error) {

            // }
          }}
        >
          {' '}
          <TextField label="country" id="country" name="country" />
          <TextField label="name" id="name" name="name" />
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
        onRowSelectionModelChange={setSelectionModel}
        processRowUpdate={(newRow: GridRowModel) => handleProcessRowUpdate(newRow, token)}
        disableRowSelectionOnClick
        onProcessRowUpdateError={(error) => console.error('Process row update failed:', error)}
      />
      <Button variant="contained" onClick={handleDeleteLocations}>
        Delete Selected Locations
      </Button>
    </Stack>
  );
}
