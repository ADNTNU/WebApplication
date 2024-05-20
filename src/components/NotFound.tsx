'use client';

import { Button, Stack, Typography } from '@mui/material';
import ButtonLink from './navigation/ButtonLink';

type NotFoundProps = {
  description: string;
  goBackToLastPage: string;
  goToHomePage: string;
};

export default function NotFound(props: NotFoundProps) {
  const { description, goBackToLastPage, goToHomePage } = props;

  return (
    <Stack textAlign="center">
      <Typography variant="h3">{description}</Typography>
      <Button onClick={() => window.history.back()}>{goBackToLastPage}</Button>
      <ButtonLink href="/">{goToHomePage}</ButtonLink>
    </Stack>
  );
}
