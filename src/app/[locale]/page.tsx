import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import PageWrapper from '@components/layout/main/PageWrapper';
import PageSection from '@components/layout/main/PageSection';
import SearchHero from '@/components/landing/SearchHero';
import { Locale } from '@/internationalization/i18n';
import PopularDestinations from '@/components/locations/PopularDestinations';
import { NextIntlClientProvider } from 'next-intl';
import { pick } from 'lodash';
import AboutUs from '@components/landing/AboutUs';
import getLocationAutocompleteOptions from '@components/serverComponents/getLocationAutocomplete';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return generateTranslatedMetadata({ locale, page: 'Landing' });
}

export default async function Landing({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const locationAutocompleteOptions = await getLocationAutocompleteOptions();

  return (
    <PageWrapper locationAutocompleteOptions={locationAutocompleteOptions}>
      <PageSection sx={{ pb: 2 }}>
        <NextIntlClientProvider locale={locale} messages={pick(messages, 'common.trip')}>
          <SearchHero locationAutocompleteOptions={locationAutocompleteOptions} />
        </NextIntlClientProvider>
      </PageSection>
      <NextIntlClientProvider
        locale={locale}
        messages={pick(messages, 'components.popularDestinations', 'common.trip')}
      >
        <PopularDestinations pageSectionProps={{ sx: { py: 2 } }} />
      </NextIntlClientProvider>
      <PageSection sx={{ py: 2 }}>
        <AboutUs />
      </PageSection>
    </PageWrapper>
  );
}
