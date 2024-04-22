'use client';

import PageSection from '@components/layout/main/PageSection';
import ButtonLink from '@/components/navigation/ButtonLink';
import { Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import PageWrapper from '@components/layout/main/PageWrapper';
import { Locale } from '@internationalization/i18n';

export default function NotFound() {
  const t = useTranslations('error');
  const locale = t('locale') as Locale;
  const description = t('404.description');
  const actionT = useTranslations('nav.actions');
  const goBackToLastPage = actionT('goBackToLastPage');
  const goToHomePage = actionT('goToHomePage');

  return (
    <PageWrapper locale={locale}>
      <PageSection paddingY>
        <Stack textAlign="center">
          <Typography variant="h3">{description}</Typography>
          <Button onClick={() => window.history.back()}>{goBackToLastPage}</Button>
          <ButtonLink href="/">{goToHomePage}</ButtonLink>
        </Stack>
      </PageSection>
    </PageWrapper>
  );
}
