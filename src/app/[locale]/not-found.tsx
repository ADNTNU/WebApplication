import PageSection from '@components/layout/main/PageSection';
import PageWrapper from '@components/layout/main/PageWrapper';
import { getTranslations } from 'next-intl/server';
import getLocationAutocompleteOptions from '@components/serverComponents/getLocationAutocomplete';
import NotFoundComponent from '@components/NotFound';
import { Locale } from '@internationalization/i18n';

export default async function NotFound() {
  const localeT = await getTranslations('locale');
  const locale = localeT('value') as Locale;
  const t = await getTranslations('error');
  const description = t('404.description');
  const actionT = await getTranslations('nav.actions');
  const goBackToLastPage = actionT('goBackToLastPage');
  const goToHomePage = actionT('goToHomePage');
  const locationAutocompleteOptions = await getLocationAutocompleteOptions();

  return (
    <PageWrapper
      locale={locale}
      locationAutocompleteOptions={locationAutocompleteOptions}
      rootProps={{ sx: { display: 'flex', flexDirection: 'column', height: '100%' } }}
      mainProps={{
        sx: { display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' },
      }}
    >
      <PageSection>
        <NotFoundComponent
          description={description}
          goBackToLastPage={goBackToLastPage}
          goToHomePage={goToHomePage}
          hasLocale
        />
      </PageSection>
    </PageWrapper>
  );
}
