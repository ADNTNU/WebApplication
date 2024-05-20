import PageWrapper from '@components/layout/main/PageWrapper';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import { Typography } from '@mui/material';
import { unstable_setRequestLocale } from 'next-intl/server';
import PageSection from '@components/layout/main/PageSection';
import { Locale } from '@/internationalization/i18n';
import getLocationAutocompleteOptions from '@components/serverComponents/getLocationAutocomplete';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return generateTranslatedMetadata({ locale, page: 'Privacy' });
}

export default async function Privacy({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const locationAutocompleteOptions = await getLocationAutocompleteOptions();
  return (
    <PageWrapper locationAutocompleteOptions={locationAutocompleteOptions}>
      <PageSection>
        <Typography variant="h1" component="h1" gutterBottom>
          Privacy policy
        </Typography>
      </PageSection>
    </PageWrapper>
  );
}
