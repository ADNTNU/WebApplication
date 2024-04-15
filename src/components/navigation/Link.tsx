'use client';

import { Link as MUILink } from '@mui/material';
import { I18nLink, pathnames, LinkProps as I18nLinkProps } from '@internationalization/navigation';
import { ComponentProps } from 'react';

type LinkProps<Pathname extends keyof typeof pathnames> = I18nLinkProps<Pathname> &
  Omit<ComponentProps<typeof MUILink>, 'href'>;

export default function Link<Pathname extends keyof typeof pathnames>(props: LinkProps<Pathname>) {
  const { children, ...rest } = props;

  return (
    <MUILink component={I18nLink} {...rest}>
      {children}
    </MUILink>
  );
}
