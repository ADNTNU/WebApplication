import { Box, Drawer, IconButton, Stack } from '@mui/material';
import Link from '@components/navigation/Link';
import MenuIcon from '@mui/icons-material/Menu';
import SearchField from '@components/search/searchField';
import { LocationOrAirportOption } from '@models/DTO/LocationOrAirport';
import { InputMap } from '@components/search/searchField/inputs';
import CloseIcon from '@mui/icons-material/Close';
import { MainLinkHref } from './links';
import LocaleSwitcher from '../LocaleSwitcher';
import Account from './Account';

type MobileMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  mainLinks?: { href: MainLinkHref; label: string }[];
  locationAutocompleteOptions: LocationOrAirportOption[];
  inputs: InputMap;
};

export default function MobileMenu(props: MobileMenuProps) {
  const { open, setOpen, mainLinks, locationAutocompleteOptions, inputs } = props;

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" flexGrow={1} gap={2}>
      <Box flexGrow={1} display="flex">
        <SearchField
          variant="header"
          locationAutocompleteOptions={locationAutocompleteOptions}
          inputs={inputs}
        />
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
            <Stack direction="row" justifyContent="flex-end">
              <IconButton onClick={onClose}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <LocaleSwitcher
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
              <Account iconSize={30} />
            </Stack>
          </Stack>
          <Stack gap={2}>
            {mainLinks?.length
              ? mainLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))
              : null}
          </Stack>
        </Box>
      </Drawer>
    </Stack>
  );
}
