import React, { useState, useEffect } from 'react';
import { Button, Snackbar, Alert, Divider, Stack, Typography, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid';
import useUserSWR from './useUserSWR';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'email', headerName: 'Email', width: 200, editable: true },
  { field: 'roles', headerName: 'Roles', width: 130 }, // Assuming you want to display roles
  // Add more columns as needed
];

const initialRows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, role: 'ROLE_ADMIN' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

type userProps = {
  token?: string;
};

function user(props: userProps) {
  const { token } = props;
  const { data, error } = useUserSWR({ limit: 10, page: 1 });
  const [users, setUsers] = useState([]);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (data) {
      setUsers(
        data.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roles: user.roles.map((role) => role.name).join(', '),
        })),
      );
    }
  }, [data]);

  const handleProcessRowUpdate = (newRow: GridRowParams) => {
    console.log(`User Updated: ID ${newRow.id}, Data:`, newRow);
    setSnackbarMessage('User updated successfully');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    return newRow;
  };

  const handleDeleteUsers = () => {
    console.log(selectionModel);
    if (selectionModel.length === 0) {
      setSnackbarMessage('No users selected for deletion.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    const newUsers = users.filter((user) => !selectionModel.includes(user.id));
    setUsers(newUsers);
    setSnackbarMessage('User deleted successfully');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Stack direction="column">
      <Typography variant="h2">User actions</Typography>
      <p>Here we can add, edit and remove users</p>
      <Typography variant="h4">Add new user</Typography>
      <Stack direction="row">
        <TextField label="First name"></TextField>
        <TextField label="Last name"></TextField>
        <TextField label="email"></TextField>
        <TextField label="password"></TextField>
      </Stack>
      <Typography variant="h4">Edit / Remove exsisting user</Typography>
      <DataGrid
        rows={users}
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
        processRowUpdate={handleProcessRowUpdate}
        disableRowSelectionOnClick
      />
      <Button variant="contained" onClick={handleDeleteUsers}>
        Delete Selected Users
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default user;
