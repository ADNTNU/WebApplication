'use client';

import PageSection from '@components/layout/main/PageSection';
import ButtonLink from '@/components/navigation/ButtonLink';
import { Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import PageWrapper from '@components/layout/main/PageWrapper';
import { Locale } from '@internationalization/i18n';

export default function NotFound() {
  const localeT = useTranslations('Error');
  const locale = localeT('locale') as Locale;
  const t = useTranslations('Error.404');

  return (
    <PageWrapper locale={locale}>
      <PageSection paddingY>
        <Stack textAlign="center">
          <Typography variant="h3">{t('description')}</Typography>
          <Button onClick={() => window.history.back()}>{t('backAction')}</Button>
          <ButtonLink href="/">{t('homeAction')}</ButtonLink>
        </Stack>
      </PageSection>
    </PageWrapper>
  );
}
