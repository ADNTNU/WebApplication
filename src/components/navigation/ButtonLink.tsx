'use client';

import { I18nLink, LinkProps, pathnames } from '@/internationalization/navigation';
import { Button } from '@mui/material';
import { ComponentProps } from 'react';

type ButtonLinkProps<Pathname extends keyof typeof pathnames> = LinkProps<Pathname> &
  Omit<ComponentProps<typeof Button>, 'href'>;

export default function ButtonLink<Pathname extends keyof typeof pathnames>(
  props: ButtonLinkProps<Pathname>,
) {
  const { href, locale, ...rest } = props;
  return href === 'back' ? (
    <Button {...rest} onClick={() => window.history.back()} />
  ) : (
    <I18nLink href={href} locale={locale} passHref>
      <Button {...rest} />
    </I18nLink>
  );
}
