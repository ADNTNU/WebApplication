import PageSection from '@components/layout/main/PageSection';
import PageWrapper from '@components/layout/main/PageWrapper';
import { Locale } from '@internationalization/i18n';
import { getTranslations } from 'next-intl/server';
import getLocationAutocompleteOptions from '@components/serverComponents/getLocationAutocomplete';
import NotFoundComponent from '@components/NotFound';

export default async function NotFound() {
  const t = await getTranslations('error');
  const locale = t('locale') as Locale;
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
