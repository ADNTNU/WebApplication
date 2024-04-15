import { Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import React from 'react'
import Button from '@mui/material/Button';

function SocialButton({ text = "Sign in with Google", Icon = GoogleIcon}) {
  return (
    <Button variant="outlined" startIcon={<Icon />}>
        {text}
    </Button>
  );
};

export default SocialButton