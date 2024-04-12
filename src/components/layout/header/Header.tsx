import { AppBar, Container, Stack } from '@mui/material';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import Link from '@components/navigation/Link';
import { useTranslations } from 'next-intl';
import MenuWrapper from './MenuWrapper';
import { mainLinks } from './links';
import HeaderWrapper from './HeaderWrapper';

// type HeaderProps = {

// };

export default function Header(/* props: HeaderProps */) {
  // const {} = props;
  const t = useTranslations('Nav');

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
          gap={3}
          alignItems="center"
          flexGrow={1}
          justifyContent="flex-start"
        >
          <Link href="/" width={40} height={40} aria-label={t('Action.goToHomePage')}>
            <LogoDevIcon
              color="primary"
              sx={{
                fontSize: 40,
              }}
            />
          </Link>
          <MenuWrapper mainLinks={internationalizedMainLinks} />
        </Stack>
      </Container>
    </HeaderWrapper>
  );
}
