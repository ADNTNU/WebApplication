import { Link, Pathname } from '@/navigation';
import { Button } from '@mui/material';
import { ComponentProps } from 'react';
import { Locale } from '@/i18n';

type ButtonLinkProps = Omit<ComponentProps<typeof Button>, 'href'> & {
  href: Pathname | 'back';
  locale?: Locale;
};

export default function ButtonLink(props: ButtonLinkProps) {
  const { href, locale, ...rest } = props;

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
