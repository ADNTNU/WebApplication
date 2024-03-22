import PageWrapper from '@/components/layout/PageWrapper';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import { unstable_setRequestLocale } from 'next-intl/server';
import PageSection from '@/components/layout/PageSection';
import { Locale } from '@/i18n';
import SearchResults from '@/components/search/SearchResults';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return await generateTranslatedMetadata({ locale, page: 'Search' });
}

export default function Search({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  return (
    <PageWrapper>
      <PageSection sx={{ mt: 2 }}>
        <SearchResults></SearchResults>
      </PageSection>
    </PageWrapper>
  );
}
