import { Typography } from '@mui/material';
import Link from '@components/navigation/Link';
import { ComponentProps } from 'react';

export const navigationLinkStyles: ComponentProps<typeof Typography>['sx'] = {
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
};

type NavigationLinkProps = ComponentProps<typeof Link> & ComponentProps<typeof Typography>;

export default function NavigationLink(props: NavigationLinkProps) {
  const { children, sx, variant, ...rest } = props;

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
