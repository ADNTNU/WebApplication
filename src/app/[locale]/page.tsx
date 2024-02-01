import { Container, Typography } from "@mui/material";
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';
import ButtonLink from "@/components/ButtonLink";

export async function generateMetadata({
  params: {locale}
} : { params: {locale: string}; }) {
  const t = await getTranslations({locale, namespace: 'Page.Landing'});

  return {
    title: t('title')
  };
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