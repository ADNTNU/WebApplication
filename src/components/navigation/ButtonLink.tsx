'use client';

import { I18nLink, LinkProps } from '@/internationalization/navigation';
import { Button } from '@mui/material';
import { ComponentProps } from 'react';

type ButtonLinkProps = LinkProps & Omit<ComponentProps<typeof Button>, 'href'>;

export default function ButtonLink(props: ButtonLinkProps) {
  const { href, locale, ...rest } = props;
  return (
    // @ts-expect-error - Validation passed to parent
    <I18nLink href={href} locale={locale} passHref>
      <Button {...rest} />
    </I18nLink>
  );
}
