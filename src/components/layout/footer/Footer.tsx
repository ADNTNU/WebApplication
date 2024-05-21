import { Box, Typography } from '@mui/material';
import NavigationLink from '@components/navigation/NavigationLink';
import { useTranslations } from 'next-intl';
import { FooterContainer, FooterSection } from './FooterComponents';
// import ThemeSwitcher from './ThemeSwitcher';
import CssThemeSwitcher from '../CssThemeSwitcher';

// type FooterProps = {

// };

export default function Footer(/* props: FooterProps */) {
  // const {} = props;
  const t = useTranslations('nav');
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'background.paper',
        padding: '1rem',
        marginTop: '1rem',
      }}
      borderTop={2}
      borderColor="divider"
    >
      <FooterContainer>
        <FooterSection>
          {/* <ThemeSwitcher /> */}
          <CssThemeSwitcher />
        </FooterSection>
        <FooterSection />
        <FooterSection sx={{ textAlign: 'right' }}>
          <NavigationLink variant="body1" href="/privacy">
            {t('privacy')}
          </NavigationLink>
          <NavigationLink variant="body1" href="/about">
            {t('about')}
          </NavigationLink>
        </FooterSection>
      </FooterContainer>
      <FooterContainer>
        <Typography variant="caption">
          This website is a result of a university group project, performed in the course IDATA2301
          Web technologies, at NTNU. All the information provided here is a result of imagination.
          Any resemblance with real companies or products is a coincidence.
        </Typography>
      </FooterContainer>
    </Box>
  );
}
