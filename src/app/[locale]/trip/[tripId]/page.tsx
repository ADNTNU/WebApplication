import PageWrapper from '@components/layout/main/PageWrapper';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import PageSection from '@components/layout/main/PageSection';
import { Locale } from '@/internationalization/i18n';
import getLocationAutocompleteOptions from '@components/serverComponents/getLocationAutocomplete';
import { apiRoutes } from '@/apiRoutes';
import { Trip as TripType } from '@models/Trip';
import TripSection from '@components/TripDetails/TripSection';
import { pick } from 'lodash';
import { NextIntlClientProvider } from 'next-intl';

export async function generateMetadata({
  params: { locale, tripId },
}: {
  params: { locale: Locale; tripId: string };
}) {
  return generateTranslatedMetadata({ locale, page: 'Trip', titleProps: { tripId } });
}

async function getTrip(tripId: string) {
  const res = await fetch(apiRoutes.trip(tripId));

  if (!res.ok) {
    throw new Error('Failed to fetch trip');
  }

  const trip = await res.json();

  // console.log('trip', trip);
  return trip;
}

export default async function Trip({
  params: { locale, tripId },
}: {
  params: { locale: Locale; tripId: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const locationAutocompleteOptions = await getLocationAutocompleteOptions();
  const trip: TripType = await getTrip(tripId);
  return (
    <PageWrapper locationAutocompleteOptions={locationAutocompleteOptions}>
      <PageSection sx={{ paddingY: 2 }}>
        <NextIntlClientProvider messages={pick(messages, 'common.trip', 'actions')}>
          <TripSection trip={trip} />
        </NextIntlClientProvider>
      </PageSection>
    </PageWrapper>
  );
}
