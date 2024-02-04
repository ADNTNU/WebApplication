import { Container, Typography } from "@mui/material";
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import ButtonLink from "@/components/ButtonLink";
import { generateTranslatedMetadata } from "@/utils/translatedMetadata";
import { Locale, locales } from "@/i18n";

export async function generateMetadata({
  params: {locale}
} : { params: {locale: string}; }) {
  return await generateTranslatedMetadata({locale, page: 'Landing'});
}

export default function Landing({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Landing');

  return (
    <Container 
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Next.js with Material-UI
      </Typography>
      <Typography>
        You are on the {t('test')} page.
      </Typography>
      <ButtonLink variant="contained" href="/search">
        Go to Search
      </ButtonLink>
    </Container>
  );
}