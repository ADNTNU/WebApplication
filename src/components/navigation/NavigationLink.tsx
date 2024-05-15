'use client';

import { Typography } from '@mui/material';
import Link from '@components/navigation/Link';
import { ComponentProps } from 'react';
import { LinkProps } from '@/internationalization/navigation';

const navigationLinkStyles: ComponentProps<typeof Typography>['sx'] = {
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
};

type NavigationLinkProps = Omit<ComponentProps<typeof Typography> & LinkProps, 'ref'>;

export default function NavigationLink({ children, sx, variant, ...rest }: NavigationLinkProps) {
  const sxWithDefaults = {
    ...navigationLinkStyles,
    ...sx,
  };

  return (
    <Typography component={Link} sx={sxWithDefaults} variant={variant || 'h6'} {...rest}>
      {children}
    </Typography>
  );
}
