import PageWrapper from '@components/layout/main/PageWrapper';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import PageSection from '@components/layout/main/PageSection';
import { Locale } from '@/internationalization/i18n';
import SearchFilterSection from '@components/search/searchFilters/SearchFilterChips';
import SearchFilterProvider from '@components/search/searchFilters/SearchFilterProvider';
import { NextIntlClientProvider } from 'next-intl';
import { Filters, defaultFilters } from '@components/search/searchFilters/filters';
import { pick } from 'lodash';
import FilterDrawer from '@components/search/searchFilters/FilterDrawer';
import FilterList from '@components/search/searchFilters/FilterList';
import getLocationAutocompleteOptions from '@components/serverComponents/getLocationAutocomplete';
import { SearchQuery } from '@models/Search';
import SearchResultsQueryParser from '@components/search/searchResults/SearchResultsQueryParser';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return generateTranslatedMetadata({ locale, page: 'Search' });
}

export default async function Search({
  params: { locale },
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: SearchQuery;
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('components.search.filters');
  const messages = await getMessages();
  const locationAutocompleteOptions = await getLocationAutocompleteOptions();

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
      <FilterDrawer filterList={<FilterList filterTranslations={filterTranslations} />} />
      <PageWrapper locationAutocompleteOptions={locationAutocompleteOptions}>
        <PageSection sx={{ py: 2 }}>
          <NextIntlClientProvider messages={pick(messages, 'common.trip')}>
            <SearchFilterSection />
          </NextIntlClientProvider>
        </PageSection>
        <PageSection /*  sx={{ mt: 2 }} */>
          <NextIntlClientProvider messages={pick(messages, 'common.trip', 'actions')}>
            <SearchResultsQueryParser
              {...searchParams}
              locationAutocompleteOptions={locationAutocompleteOptions}
            />
          </NextIntlClientProvider>
        </PageSection>
      </PageWrapper>
    </SearchFilterProvider>
  );
}
