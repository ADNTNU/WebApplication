import GoogleIcon from '@mui/icons-material/Google';
import React from 'react';
import Button from '@mui/material/Button';

type SocialButtonProps = {
  text?: string;
  Icon?: React.ElementType;
};

export default function SocialButton({
  text = 'Sign in with Google',
  Icon = GoogleIcon,
}: SocialButtonProps) {
  return (
    <Button variant="outlined" startIcon={<Icon />}>
      {text}
    </Button>
  );
}
