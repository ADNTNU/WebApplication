import PageWrapper from '@components/layout/main/PageWrapper';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import { Typography } from '@mui/material';
import { unstable_setRequestLocale } from 'next-intl/server';
import PageSection from '@components/layout/main/PageSection';
import { Locale } from '@/internationalization/i18n';
import getLocationAutocompleteOptions from '@components/serverComponents/getLocationAutocomplete';

export async function generateMetadata({
  params: { locale, tripId },
}: {
  params: { locale: Locale; tripId: string };
}) {
  return generateTranslatedMetadata({ locale, page: 'Trip', titleProps: { tripId } });
}

export default async function Trip({
  params: { locale, tripId },
}: {
  params: { locale: Locale; tripId: string };
}) {
  unstable_setRequestLocale(locale);
  const locationAutocompleteOptions = await getLocationAutocompleteOptions();
  return (
    <PageWrapper locationAutocompleteOptions={locationAutocompleteOptions}>
      <PageSection>
        <Typography variant="h1" component="h1" gutterBottom>
          Trip {tripId}
        </Typography>
      </PageSection>
    </PageWrapper>
  );
}
