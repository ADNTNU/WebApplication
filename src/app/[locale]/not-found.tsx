'use client';

import PageSection from '@/components/layout/PageSection';
import PageWrapper from '@/components/layout/PageWrapper';
import ButtonLink from '@/components/navigation/ButtonLink';
import { Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('Error.404');

  return (
    <PageWrapper>
      <PageSection paddingY>
        <Stack textAlign="center">
          <Typography variant="h3">{t('description')}</Typography>
          <ButtonLink href="back">{t('backAction')}</ButtonLink>
          <ButtonLink href="/">{t('homeAction')}</ButtonLink>
        </Stack>
      </PageSection>
    </PageWrapper>
  );
}
