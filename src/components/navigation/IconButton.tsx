'use client';

import { IconButton as MUIIconButton } from '@mui/material';
import { LinkProps as I18nLinkProps, I18nLink } from '@internationalization/navigation';
import { ComponentProps } from 'react';

type LinkProps = I18nLinkProps & Omit<ComponentProps<typeof MUIIconButton>, 'href'>;

export default function IconButton(props: LinkProps) {
  const { children, ...rest } = props;

  return (
    <MUIIconButton component={I18nLink} {...rest}>
      {children}
    </MUIIconButton>
  );
}
