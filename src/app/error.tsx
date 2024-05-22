'use client';

import { Box, Button, Typography } from '@mui/material';
import ButtonLink from '@components/navigation/ButtonLink';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box>
      <Typography variant="h4" component="h1">
        {error.message}
      </Typography>
      <Button onClick={reset}>Retry</Button>
      <ButtonLink href="/">Go to home page</ButtonLink>
    </Box>
  );
}
