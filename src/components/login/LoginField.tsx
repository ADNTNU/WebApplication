import React from 'react'
import { Button, Stack, TextField } from '@mui/material'

function LoginField() {
  return (
    <Stack direction="column" spacing={1}>
        <TextField required id="outlined-basic" label="Email" variant="outlined" />
        <TextField required id="outlined-basic" label="Password" variant="outlined" />
        <Stack direction="row">
            <div>link1</div>
            <div>link2</div>
        </Stack>
        <Button>Login</Button>
    </Stack>
  );
};

export default LoginField