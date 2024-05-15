import { unstable_setRequestLocale } from 'next-intl/server';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import PageWrapper from '@components/layout/main/PageWrapper';
import PageSection from '@components/layout/main/PageSection';
import SearchHero from '@/components/landing/SearchHero';
import { Locale } from '@/internationalization/i18n';
import PopularDestinations from '@/components/locations/PopularDestinations';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { pick } from 'lodash';
import AboutUs from '@components/landing/AboutUs';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return generateTranslatedMetadata({ locale, page: 'Landing' });
}

export default function Landing({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <PageWrapper>
      <NextIntlClientProvider locale={locale} messages={pick(messages, 'common.trip')}>
        <PageSection sx={{ pb: 2 }}>
          <SearchHero />
        </PageSection>
        <PageSection sx={{ py: 2 }}>
          <NextIntlClientProvider
            locale={locale}
            messages={pick(messages, 'components.popularDestinations')}
          >
            <PopularDestinations />
          </NextIntlClientProvider>
        </PageSection>
      </NextIntlClientProvider>
      <PageSection sx={{ py: 2 }}>
        <AboutUs />
      </PageSection>
    </PageWrapper>
  );
}
