import { Box, Drawer } from '@mui/material';
import Link from '@components/navigation/Link';
import { useTranslations } from 'next-intl';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu(props: MobileMenuProps) {
  const { open, onClose } = props;

  const t = useTranslations('Nav');
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          maxWidth: '300px',
          padding: '1rem',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <Link href={'/'}>{t('home')}</Link>
        <Link href={'/about'}>{t('about')}</Link>
      </Box>
    </Drawer>
  );
}
