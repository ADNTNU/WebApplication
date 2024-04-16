import React from 'react';
import { Link, Button, Stack, TextField } from '@mui/material';
import NavigationLink from '@components/navigation/NavigationLink';

function LoginField() {
  return (
    <Stack direction="column" spacing={1}>
      <TextField required id="outlined-basic" label="Email" variant="outlined" />
      <TextField required id="outlined-basic" label="Password" variant="outlined" type="Password" />
      <Stack direction="row" spacing={2}>
        <NavigationLink href={'/signup'}>Signup</NavigationLink>
        <Link href="#">Forgot Password?</Link>
      </Stack>
      <Button variant="contained" color="primary">
        Login
      </Button>
    </Stack>
  );
}

export default LoginField;
