import { Button, TextField, Stack } from '@mui/material';
import React from 'react';
import NavigationLink from '@components/navigation/NavigationLink';

function SignupField() {
  return (
    <Stack direction="column" spacing={1}>
      <TextField required id="outlined-basic" label="First Name" variant="outlined" />
      <TextField required id="outlined-basic" label="Last Name" variant="outlined" />
      <TextField required id="outlined-basic" label="Email" variant="outlined" />
      <TextField required id="outlined-basic" label="Password" variant="outlined" type="Password" />
      <NavigationLink href={'/login'}>Already got an account?</NavigationLink>
      <Button variant="contained" color="primary">
        Signup
      </Button>
    </Stack>
  );
}

export default SignupField;
