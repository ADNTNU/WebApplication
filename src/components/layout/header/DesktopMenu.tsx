import { Box, Stack } from '@mui/material';
import SearchField from '@components/search/searchField';
import { LocationOrAirportOption } from '@models/DTO/LocationOrAirport';
import LocaleSwitcher from '../LocaleSwitcher';
import Account from './Account';

type DesktopMenuProps = {
  // mainLinks: { href: MainLinkHref; label: string }[];
  locationAutocompleteOptions: LocationOrAirportOption[];
};

export default function DesktopMenu(props: DesktopMenuProps) {
  const { locationAutocompleteOptions } = props;
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" flexGrow={1} gap={2}>
      <Box flexGrow={1} display="flex">
        <Box margin="auto">
          <SearchField variant="header" locationAutocompleteOptions={locationAutocompleteOptions} />
        </Box>
      </Box>
      <Account iconSize={30} />
      <LocaleSwitcher iconSize={24} />
    </Stack>
  );
}
