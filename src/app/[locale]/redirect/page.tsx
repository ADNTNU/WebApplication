import PageSection from '@components/layout/main/PageSection';
import PageWrapper from '@components/layout/main/PageWrapper';
import BackButton from '@components/navigation/BackButton';
import getLocationAutocompleteOptions from '@components/serverComponents/getLocationAutocomplete';
import { Locale } from '@internationalization/i18n';
import { Paper, Stack, Typography } from '@mui/material';
import generateTranslatedMetadata from '@utils/translatedMetadata';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return generateTranslatedMetadata({ locale, page: 'Redirect' });
}

export default async function Redirect({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const locationAutocompleteOptions = await getLocationAutocompleteOptions();
  const t = await getTranslations('components.redirect');
  const actionT = await getTranslations('nav.actions');
  return (
    <PageWrapper
      locationAutocompleteOptions={locationAutocompleteOptions}
      rootProps={{ sx: { display: 'flex', flexDirection: 'column', height: '100%' } }}
      mainProps={{
        sx: { display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' },
      }}
    >
      <PageSection>
        <Stack component={Paper} borderRadius={2} padding={3} gap={1}>
          <Typography variant="h4" component="h1">
            {t('title')}
          </Typography>
          <Typography>{t('description')}</Typography>
          <BackButton>{actionT('goBackToLastPage')}</BackButton>
        </Stack>
      </PageSection>
    </PageWrapper>
  );
}
