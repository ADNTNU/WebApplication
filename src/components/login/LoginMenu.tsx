import React from 'react'
import { Divider, Stack, Typography } from '@mui/material';
import SocialButton from './SocialButton';

function LoginMenu() {
  return (
    <Stack spacing={2}>
      <Typography variant='h2'>Login form</Typography>
      <Stack direction="row">
        <SocialButton></SocialButton>
        <div>Data 2</div>
      </Stack>
    </Stack>
  );
};

export default LoginMenu