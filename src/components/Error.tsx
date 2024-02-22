'use client';

import PageWrapper from './layout/PageWrapper';
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
    <PageWrapper>
      <div>
        <h1>{error.message}</h1>
        {/* <h1>{t('title')}</h1>
      <button onClick={reset}>{t('retry')}</button> */}
        <button onClick={reset}>Retry</button>
        <ButtonLink href="/">Go to home page</ButtonLink>
      </div>
    </PageWrapper>
  );
}
