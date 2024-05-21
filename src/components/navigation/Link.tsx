'use client';

import { Link as MUILink } from '@mui/material';
import { LinkProps as I18nLinkProps, I18nLink } from '@internationalization/navigation';
import { ComponentProps } from 'react';

type LinkProps = I18nLinkProps & Omit<ComponentProps<typeof MUILink>, 'href'>;

export default function Link(props: LinkProps) {
  const { children, ...rest } = props;

  return (
    <MUILink component={I18nLink} {...rest}>
      {children}
    </MUILink>
  );
}
