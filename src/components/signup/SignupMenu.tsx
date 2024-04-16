import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import SocialButton from '@/components/login/SocialButton';
import AppleIcon from '@mui/icons-material/Apple';
import SignupField from '@components/signup/SignupField';

function SignupMenu() {
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
      <Typography variant="h2">Signup</Typography>
      <Stack direction="row" spacing={4} gap={2}>
        <Stack direction="column" spacing={2}>
          <SocialButton text="Signup with google" />
          <SocialButton text="Signup with apple" Icon={AppleIcon} />
        </Stack>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Stack direction="column" spacing={2}>
          <SignupField></SignupField>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default SignupMenu;
