import { Box } from '@mui/material';
import { FooterContainer, FooterSection } from './FooterComponents';
import { useTranslations } from 'next-intl';
import NavigationLink from '@components/navigation/NavigationLink';

type FooterProps = {
  // TODO: Define the props for the footer
};

export default function Footer(props: FooterProps) {
  const {} = props;
  const t = useTranslations('Nav');
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
          <NavigationLink href={'/privacy'}>{t('privacy')}</NavigationLink>
        </FooterSection>
      </FooterContainer>
    </Box>
  );
}
