import PageWrapper from '@/components/layout/PageWrapper';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import { Typography } from '@mui/material';
import { unstable_setRequestLocale } from 'next-intl/server';
import PageSection from '@/components/layout/PageSection';
import { Locale } from '@/i18n';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return await generateTranslatedMetadata({ locale, page: 'Privacy' });
}

export default function Privacy({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  return (
    <PageWrapper>
      <PageSection>
        <Typography variant="h1" component="h1" gutterBottom>
          Privacy policy
        </Typography>
      </PageSection>
    </PageWrapper>
  );
}
