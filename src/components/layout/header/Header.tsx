import { Container, Stack } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl';
import IconButton from '@components/navigation/IconButton';
import { pick } from 'lodash';
import { Locale } from '@internationalization/i18n';
import { LocationOrAirportOption } from '@models/DTO/LocationOrAirport';
import { getTranslatedInputs } from '@components/search/searchField/inputs';
import MenuWrapper from './MenuWrapper';
// import { mainLinks } from './links';
import HeaderWrapper from './HeaderWrapper';

type HeaderProps = {
  locale?: Locale;
  locationAutocompleteOptions: LocationOrAirportOption[];
};

export default function Header(props: HeaderProps) {
  const { locale, locationAutocompleteOptions } = props;
  const t = useTranslations('nav');
  const searchFieldT = useTranslations('components.searchField');
  const translatedInputs = getTranslatedInputs(searchFieldT);
  const messages = useMessages();

  const internationalizedMainLinks = undefined;
  // const internationalizedMainLinks = mainLinks.map((link) => {
  //   return {
  //       href: link.href,
  //       label: t(link.i18nNS),
  //     }})
  //   : [];

  return (
    <HeaderWrapper>
      <Container
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          width: '100%',
        }}
      >
        <Stack
          component="nav"
          flexDirection="row"
          gap={4}
          alignItems="center"
          width="100%"
          justifyContent="flex-start"
        >
          <IconButton href="/" aria-label={t('actions.goToHomePage')} disableRipple>
            <FlightIcon color="primary" fontSize="large" />
          </IconButton>
          <NextIntlClientProvider locale={locale} messages={pick(messages, 'common.trip')}>
            <MenuWrapper
              mainLinks={internationalizedMainLinks}
              locationAutocompleteOptions={locationAutocompleteOptions}
              inputs={translatedInputs}
            />
          </NextIntlClientProvider>
        </Stack>
      </Container>
    </HeaderWrapper>
  );
}
