import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import SocialButton from './SocialButton';
import LoginField from './LoginField';

function LoginMenu() {
  return (
    <Stack
      spacing={2}
      gap={1}
      direction="column"
      alignItems="center"
      width="100%"
      sx={{
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h2">Login</Typography>

      <Stack direction="row" spacing={4} gap={2}>
        <Stack spacing={2} direction="column">
          <SocialButton text="Sign in with Apple" Icon={AppleIcon} />
          <SocialButton />
        </Stack>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Stack spacing={2}>
          <LoginField />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LoginMenu;
