'use client';

import { Box, Button, Typography } from '@mui/material';
import ButtonLink from './navigation/ButtonLink';

// import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // const t = useTranslations('Error');

  return (
    <Box>
      <Typography variant="h4">{error.message}</Typography>
      {/* <h1>{t('title')}</h1> */}
      <Button onClick={reset}>Retry</Button>
      <ButtonLink href="/">Go to home page</ButtonLink>
    </Box>
  );
}
