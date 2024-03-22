import ButtonLink from '@/components/navigation/ButtonLink';
import PageWrapper from '@/components/layout/PageWrapper';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import { Typography } from '@mui/material';
import { unstable_setRequestLocale } from 'next-intl/server';
import PageSection from '@/components/layout/PageSection';
import { Locale } from '@/i18n';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return await generateTranslatedMetadata({ locale, page: 'Search' });
}

export default function Search({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  return (
    <PageWrapper locale={locale}>
      <PageSection>
        <Typography variant="h1" component="h1" gutterBottom>
          Search
        </Typography>
        <Typography>This is an example project using Next.js with Material-UI.</Typography>
        <ButtonLink variant="contained" href="/">
          Go to Home
        </ButtonLink>
      </PageSection>
    </PageWrapper>
  );
}
