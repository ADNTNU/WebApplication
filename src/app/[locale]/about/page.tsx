import PageWrapper from '@components/layout/main/PageWrapper';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import { Stack, Typography } from '@mui/material';
import { unstable_setRequestLocale } from 'next-intl/server';
import PageSection from '@components/layout/main/PageSection';
import { Locale } from '@/internationalization/i18n';
import getLocationAutocompleteOptions from '@components/serverComponents/getLocationAutocomplete';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return generateTranslatedMetadata({ locale, page: 'About' });
}

export default async function About({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const locationAutocompleteOptions = await getLocationAutocompleteOptions();
  return (
    <PageWrapper locationAutocompleteOptions={locationAutocompleteOptions}>
      <PageSection sx={{ pt: 2 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About us
        </Typography>
        <Stack gap={1}>
          <Typography>
            Welcome to Flight Finder, where your journey into the skies begins with the perfect
            flight option tailored to your needs. At Flight Finder, we&apos;ve taken to the skies,
            transforming the flight booking experience by aggregating real-time prices and schedules
            from a plethora of trusted airline partners. No more endless tab-switching to hunt down
            the best deal – our platform brings all the information to you in a single, streamlined
            experience.
          </Typography>
          <Typography>
            Our commitment goes beyond simply offering a vast array of flight options; we are
            dedicated to ensuring transparency, efficiency, and an exhilarating booking experience.
            Our user-friendly interface allows you to effortlessly compare flights, ensuring you
            find the perfect match for your travel preferences and budget. Farewell to the hidden
            fees and complex booking procedures – welcome to a smooth flight booking journey.
          </Typography>
          <Typography>
            Flight Finder is not just about finding flights; it&apos;s about commencing your travel
            adventure on the right note. Our platform is crafted to infuse a sense of excitement
            into the planning process. From last-minute getaways to well-planned business trips, we
            ensure you have all the choices at your fingertips. Our services are designed to bring
            you closer to the world, one flight at a time.
          </Typography>
          <Typography>
            Join Flight Finder and elevate your travel planning to new heights. Whether you&apos;re
            chasing the Northern Lights, jetting off to a tropical paradise, or heading to a
            bustling city for a conference, every flight booked with us is a promise of discovery
            and reliability. With Flight Finder, set off on every journey with confidence and let
            your travel aspirations take flight.
          </Typography>
        </Stack>
      </PageSection>
    </PageWrapper>
  );
}
