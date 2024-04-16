'use client';

import { IconButton as MUIIconButton } from '@mui/material';
import { pathnames, LinkProps as I18nLinkProps, I18nLink } from '@internationalization/navigation';
import { ComponentProps } from 'react';

type LinkProps<Pathname extends keyof typeof pathnames> = I18nLinkProps<Pathname> &
  Omit<ComponentProps<typeof MUIIconButton>, 'href'>;

export default function IconButton<Pathname extends keyof typeof pathnames>(
  props: LinkProps<Pathname>,
) {
  const { children, ...rest } = props;

  return (
    <MUIIconButton component={I18nLink} {...rest}>
      {children}
    </MUIIconButton>
  );
}
