import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import SocialButton from '@/components/login/SocialButton';
import AppleIcon from '@mui/icons-material/Apple';
import SignupFields from '@components/signup/SignupField';

function SignupMenu() {
  return (
    <Stack
      gap={2}
      alignItems="center"
      width="100%"
      sx={{
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h3" component="h1">
        Signup
      </Typography>
      <Stack
        gap={2}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Stack direction="column" gap={1}>
          <SocialButton text="Sign up with google" />
          <SocialButton text="Sign up with apple" Icon={AppleIcon} />
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
        <SignupFields />
      </Stack>
    </Stack>
  );
}

export default SignupMenu;
