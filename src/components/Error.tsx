import { Button, Typography } from '@mui/material';
import ButtonLink from './navigation/ButtonLink';
import PageSection from './layout/main/PageSection';
import PageWrapper from './layout/main/PageWrapper';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageWrapper disableHeader disableFooter rootProps={{ display: 'flex', alignItems: 'center' }}>
      <PageSection>
        <Typography variant="h4" component="h1">
          {error.message}
        </Typography>
        <Button onClick={reset}>Retry</Button>
        <ButtonLink href="/">Go to home page</ButtonLink>
      </PageSection>
    </PageWrapper>
  );
}
