'use client';

import { Link as MUILink } from '@mui/material';
import { Link as I18nLink, Pathname } from '@/navigation';
import { ComponentProps } from 'react';

type LinkProps = Omit<ComponentProps<typeof MUILink>, 'href'> & {
  href: Pathname;
  locale?: ComponentProps<typeof I18nLink>['locale'];
};

export default function Link(props: LinkProps) {
  const { children, ...rest } = props;

  return (
    <MUILink component={I18nLink} {...rest}>
      {children}
    </MUILink>
  );
}
