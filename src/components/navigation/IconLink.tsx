'use client';
import { Pathname, useRouter } from '@/navigation';
import { IconButton } from '@mui/material';
import { ComponentProps } from 'react';
import { Locale } from '@/i18n';

type IconLinkProps = Omit<ComponentProps<typeof IconButton>, 'href'> & {
  href: Pathname;
  locale?: Locale;
};

export default function IconLink(props: IconLinkProps) {
  const { href, locale, ...rest } = props;
  const router = useRouter();

  return <IconButton {...rest} onClick={() => router.push(href, { locale })} />;
}
