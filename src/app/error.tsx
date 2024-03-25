'use client';

import ButtonLink from '@components/navigation/ButtonLink';
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Box>
      <Typography variant="h4">{error.message}</Typography>
      {/* <h1>{t('title')}</h1> */}
      <Button onClick={reset}>Retry</Button>
      <ButtonLink href="/">Go to home page</ButtonLink>
    </Box>
  );
}
