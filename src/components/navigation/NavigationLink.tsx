import { Typography } from '@mui/material';
import Link from '@components/navigation/Link';
import { ComponentProps } from 'react';
import { LinkProps, pathnames } from '@/internationalization/navigation';

export const navigationLinkStyles: ComponentProps<typeof Typography>['sx'] = {
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
};

type NavigationLinkProps<Pathname extends keyof typeof pathnames> = ComponentProps<
  typeof Typography
> &
  LinkProps<Pathname>;

export default function NavigationLink<Pathname extends keyof typeof pathnames>({
  children,
  sx,
  variant,
  ...rest
}: NavigationLinkProps<Pathname>) {
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
