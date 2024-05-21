import PageSection from '@components/layout/main/PageSection';
import PageWrapper from '@/components/layout/main/PageWrapper';
import LoginMenu from '@/components/login/LoginMenu';
import { Locale } from '@/internationalization/i18n';
import { unstable_setRequestLocale } from 'next-intl/server';
import getLocationAutocompleteOptions from '@components/serverComponents/getLocationAutocomplete';

export default async function Login({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const locationAutocompleteOptions = await getLocationAutocompleteOptions();
  return (
    <PageWrapper locationAutocompleteOptions={locationAutocompleteOptions}>
      <PageSection sx={{ mt: 2 }}>
        <LoginMenu />
      </PageSection>
    </PageWrapper>
  );
}
