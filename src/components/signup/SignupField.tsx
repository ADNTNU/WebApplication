'use client';

import Link from '@components/navigation/Link';
import { Button, TextField, Stack } from '@mui/material';
import { signIn } from 'next-auth/react';
import React from 'react';

function SignupFields() {
  return (
    <form
      action={(formData) => {
        signIn('register', {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          firstName: formData.get('first-name') as string,
          lastName: formData.get('last-name') as string,
        });
      }}
    >
      <Stack direction="column" gap={1}>
        <TextField
          required
          name="first-name"
          id="first-name"
          label="First Name"
          variant="outlined"
        />
        <TextField required name="last-name" id="last-name" label="Last Name" variant="outlined" />
        <TextField required name="email" id="email" label="Email" variant="outlined" />
        <TextField
          required
          name="password"
          id="password"
          label="Password"
          variant="outlined"
          type="Password"
        />
        <Link href="/login">Already got an account?</Link>
        <Button variant="contained" color="primary" type="submit">
          Signup
        </Button>
      </Stack>
    </form>
  );
}

export default SignupFields;
