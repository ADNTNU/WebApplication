'use client';

import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import ButtonLink from './navigation/ButtonLink';

type NotFoundProps = {
  description: string;
  goBackToLastPage: string;
  goToHomePage: string;
  hasLocale?: boolean;
};

export default function NotFound(props: NotFoundProps) {
  const { description, goBackToLastPage, goToHomePage, hasLocale = false } = props;

  return (
    <Stack textAlign="center">
      <Typography variant="h3">{description}</Typography>
      <Button onClick={() => window.history.back()}>{goBackToLastPage}</Button>
      {hasLocale ? (
        <ButtonLink href="/">{goToHomePage}</ButtonLink>
      ) : (
        <Link href="/">{goToHomePage}</Link>
      )}
    </Stack>
  );
}
