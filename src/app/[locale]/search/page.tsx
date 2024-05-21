import PageWrapper from '@components/layout/main/PageWrapper';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import { unstable_setRequestLocale } from 'next-intl/server';
import PageSection from '@components/layout/main/PageSection';
import { Locale } from '@/internationalization/i18n';
import { SearchResults } from '@components/search/searchResults';
import SearchFilters from '@components/search/searchFilters/SearchFilters';
import SearchFilterProvider from '@components/search/searchFilters/SearchFilterProvider';
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl';
import { Filters, defaultFilters } from '@components/search/searchFilters/filters';
import { pick } from 'lodash';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return generateTranslatedMetadata({ locale, page: 'Search' });
}

export default function Search({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('components.search.filters');
  const messages = useMessages();

  const filterTranslations: { [key in keyof Filters]: string } = Object.keys(defaultFilters).reduce(
    (acc, key) => {
      const filterKey = key as keyof Filters;
      acc[filterKey] = t(filterKey);
      return acc;
    },
    {} as { [key in keyof Filters]: string },
  );

  return (
    <SearchFilterProvider filterTranslations={filterTranslations}>
      <PageWrapper>
        <PageSection sx={{ py: 2 }}>
          <NextIntlClientProvider messages={pick(messages, 'common.trip')}>
            <SearchFilters />
          </NextIntlClientProvider>
        </PageSection>
        <PageSection /*  sx={{ mt: 2 }} */>
          <SearchResults />
        </PageSection>
      </PageWrapper>
    </SearchFilterProvider>
  );
}
