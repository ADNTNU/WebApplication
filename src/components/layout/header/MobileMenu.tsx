import { Box, Drawer, IconButton, Stack } from '@mui/material';
import Link from '@components/navigation/Link';
import MenuIcon from '@mui/icons-material/Menu';
import OptionalSearchField from '@components/search/searchField/OptionalSearchField';
import { MainLinkHref } from './links';
import LanguageSwitcher from '../LanguageSwitcher';

type MobileMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  mainLinks: { href: MainLinkHref; label: string }[];
};

export default function MobileMenu(props: MobileMenuProps) {
  const { open, setOpen, mainLinks } = props;

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" flexGrow={1}>
      <Box>
        <OptionalSearchField variant="landing" />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>
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
            padding: '1rem',
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Stack gap={2}>
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </Stack>
          <LanguageSwitcher
            iconSize={24}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          />
        </Box>
      </Drawer>
    </Stack>
  );
}
