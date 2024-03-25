'use client';

import { I18nLink, LinkProps, pathnames } from '@/internationalization/navigation';
import { Button } from '@mui/material';
import { ComponentProps } from 'react';

type ButtonProps = Omit<ComponentProps<typeof Button>, 'href'>;
type ButtonLinkProps<Pathname extends keyof typeof pathnames> = ButtonProps & {
  href: LinkProps<Pathname>['href'] | 'back';
  locale?: LinkProps<Pathname>['locale'];
};

export default function ButtonLink<Pathname extends keyof typeof pathnames>({
  href,
  locale,
  ...rest
}: ButtonLinkProps<Pathname>) {
  return href === 'back' ? (
    <Button {...rest} onClick={() => window.history.back()} />
  ) : (
    <I18nLink href={href} locale={locale} passHref>
      <Button {...rest} />
    </I18nLink>
  );
}
