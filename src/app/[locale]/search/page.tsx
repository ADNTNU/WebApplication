import ButtonLink from "@/components/ButtonLink";
import { generateTranslatedMetadata } from "@/utils/translatedMetadata";
import { Container, Typography } from "@mui/material";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params: {locale}
} : { params: {locale: string}; }) {
  return await generateTranslatedMetadata({locale, page: 'Search'});
}

export default function Search({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
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
        Search
      </Typography>
      <Typography>
        This is an example project using Next.js with Material-UI.
      </Typography>
      <ButtonLink variant="contained" href="/">
        Go to Home
      </ButtonLink>
    </Container>
  );
}