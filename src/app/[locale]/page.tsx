import { unstable_setRequestLocale } from 'next-intl/server';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import PageWrapper from '@components/layout/main/PageWrapper';
import PageSection from '@components/layout/main/PageSection';
import SearchHero from '@/components/landing/SearchHero';
import { Locale } from '@/internationalization/i18n';
import PopularDestinations from '@/components/locations/PopularDestinations';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return generateTranslatedMetadata({ locale, page: 'Landing' });
}

export default function Landing({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <PageWrapper>
      <PageSection>
        <SearchHero />
      </PageSection>
      <PageSection sx={{ py: 1 }}>
        <PopularDestinations />
      </PageSection>
    </PageWrapper>
  );
}
