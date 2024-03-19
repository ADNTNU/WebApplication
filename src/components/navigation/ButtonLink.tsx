'use client';

import { Link, LinkProps, pathnames } from '@/navigation';
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
    <a>
      <Button {...rest} onClick={() => window.history.back()} />
    </a>
  ) : (
    <Link href={href} locale={locale} passHref>
      <Button {...rest} />
    </Link>
  );
}
