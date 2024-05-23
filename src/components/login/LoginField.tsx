'use client';

import { Button, Stack, TextField } from '@mui/material';
import Link from '@components/navigation/Link';
import { signIn, signOut, useSession } from 'next-auth/react';

function LoginFields() {
  const { data: session } = useSession();

  if (session?.expires && parseInt(session.expires, 10) < Date.now()) {
    signOut();
  }

  return (
    <form
      action={async (formData) => {
        await signIn('signin', {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        });
      }}
    >
      <Stack direction="column" gap={1}>
        <TextField required name="email" id="email" label="Email" variant="outlined" type="email" />
        <TextField
          required
          name="password"
          id="password"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Stack direction="row" gap={1}>
          <Link href="/signup">Signup</Link>
          <Link href="/">Forgot Password?</Link>
        </Stack>
        <Button variant="contained" color="primary" aria-label="login" type="submit">
          Login
        </Button>
      </Stack>
    </form>
  );
}

export default LoginFields;
