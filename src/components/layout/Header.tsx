import { AppBar, Container, Stack } from '@mui/material';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import Link from '@components/navigation/Link';
import NavigationLink from '@components/navigation/NavigationLink';
import { useTranslations } from 'next-intl';
import ThemeSwitcher from './ThemeSwitcher';

type HeaderProps = {
  // TODO: Define the props for the header
};

export default function Header(props: HeaderProps) {
  const {} = props;
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
          <Stack direction="row" flexGrow={1} alignItems="center" justifyContent="space-between">
            <Stack gap={2} alignItems="center" direction="row">
              <NavigationLink href={'/search'}>{t('search')}</NavigationLink>
            </Stack>
            <ThemeSwitcher />
          </Stack>
        </Stack>
        {/* Add login and internationalization buttons or drawer if mobile */}
        {/* {isMobile ? <MobileMenu /> : <DesktopMenu />} */}
      </Container>
    </AppBar>
  );
}
