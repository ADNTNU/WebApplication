import { AppBar, Container, Stack } from '@mui/material';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import Link from '@components/navigation/Link';
import NavigationLink from '@components/navigation/NavigationLink';
import { useTranslations } from 'next-intl';
import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from './MobileMenu';
import { Locale } from '@/i18n';
import LanguageSwitcher from './LanguageSwitcher';

type HeaderProps = {
  locale?: Locale;
};

export default function Header(props: HeaderProps) {
  const { locale } = props;
  const t = useTranslations('Nav');

  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="sticky">
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
          {/* TODO: Add internationalization to aria-label */}
          <Link href={'/'} width={40} height={40} aria-label="Go to home page">
            <LogoDevIcon
              color="primary"
              sx={{
                fontSize: 40,
              }}
            />
          </Link>
          <Stack direction="row" alignItems="center" justifyContent="space-between" flexGrow={1}>
            <Stack gap={1} alignItems="center" direction="row">
              <NavigationLink href={'/search'}>{t('search')}</NavigationLink>
            </Stack>
            <LanguageSwitcher locale={locale} />
          </Stack>
        </Stack>
        {/* Add login and internationalization buttons or drawer if mobile */}
        {/* {isMobile ? <MobileMenu /> : <DesktopMenu />} */}
      </Container>
    </AppBar>
  );
}
