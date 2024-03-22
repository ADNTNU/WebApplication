import PageWrapper from '@/components/layout/PageWrapper';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import { Typography } from '@mui/material';
import { unstable_setRequestLocale } from 'next-intl/server';
import PageSection from '@/components/layout/PageSection';
import { Locale } from '@/i18n';

export async function generateMetadata({
  params: { locale, tripId },
}: {
  params: { locale: Locale; tripId: string };
}) {
  return await generateTranslatedMetadata({ locale, page: 'Trip', titleProps: { tripId } });
}

export default async function Trip({
  params: { locale, tripId },
}: {
  params: { locale: Locale; tripId: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <PageWrapper>
      <PageSection>
        <Typography variant="h1" component="h1" gutterBottom>
          Trip {tripId}
        </Typography>
      </PageSection>
    </PageWrapper>
  );
}
