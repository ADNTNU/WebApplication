import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import SocialButton from './SocialButton';
import LoginFields from './LoginField';

function LoginMenu() {
  return (
    <Stack
      gap={1}
      alignItems="center"
      width="100%"
      sx={{
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h3" component="h1">
        Login
      </Typography>
      <Stack
        gap={2}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Stack gap={1} direction="column">
          <SocialButton />
          <SocialButton text="Sign in with Apple" Icon={AppleIcon} />
        </Stack>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        />
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{
            display: { xs: 'block', sm: 'none' },
          }}
        />
        <Stack gap={2}>
          <LoginFields />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LoginMenu;
