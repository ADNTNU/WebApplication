import { Container, Stack } from '@mui/material';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl';
import IconButton from '@components/navigation/IconButton';
import { pick } from 'lodash';
import MenuWrapper from './MenuWrapper';
import { mainLinks } from './links';
import HeaderWrapper from './HeaderWrapper';

// type HeaderProps = {

// };

export default function Header(/* props: HeaderProps */) {
  // const {} = props;
  const t = useTranslations('Nav');
  const messages = useMessages();

  const internationalizedMainLinks = mainLinks.map((link) => ({
    href: link.href,
    label: t(link.i18nNS),
  }));

  return (
    <HeaderWrapper>
      <Container
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          height: '100%',
        }}
      >
        <Stack
          component="nav"
          flexDirection="row"
          gap={2}
          alignItems="center"
          flexGrow={1}
          justifyContent="flex-start"
        >
          <IconButton href="/" aria-label={t('Action.goToHomePage')} disableRipple>
            <LogoDevIcon color="primary" fontSize="large" />
          </IconButton>
          <NextIntlClientProvider messages={pick(messages, 'Flights')}>
            <MenuWrapper mainLinks={internationalizedMainLinks} />
          </NextIntlClientProvider>
        </Stack>
      </Container>
    </HeaderWrapper>
  );
}
