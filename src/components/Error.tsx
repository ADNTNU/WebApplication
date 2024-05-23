import { Box, Button, Stack, Typography } from '@mui/material';
import ButtonLink from './navigation/ButtonLink';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        my: 'auto',
      }}
    >
      <Stack sx={{ maxWidth: 600, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          {error.message}
        </Typography>
        <Stack direction="row" gap={2}>
          <Button onClick={reset}>Retry</Button>
          <ButtonLink href="/">Go to home page</ButtonLink>
        </Stack>
      </Stack>
    </Box>
  );
}
