import { Stack } from '@mui/material';
import SearchField from '@components/search/searchField';
import { LocationOrAirportOption } from '@models/DTO/LocationOrAirport';
import { InputMap } from '@components/search/searchField/inputs';
import LocaleSwitcher from '../LocaleSwitcher';
import Account from './Account';

type DesktopMenuProps = {
  // mainLinks: { href: MainLinkHref; label: string }[];
  locationAutocompleteOptions: LocationOrAirportOption[];
  inputs: InputMap;
};

export default function DesktopMenu(props: DesktopMenuProps) {
  const { locationAutocompleteOptions, inputs } = props;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexGrow={1}
      gap={4}
      boxSizing="border-box"
    >
      <SearchField
        variant="header"
        locationAutocompleteOptions={locationAutocompleteOptions}
        inputs={inputs}
      />
      <Stack direction="row" alignItems="center" gap={2}>
        <Account iconSize={30} />
        <LocaleSwitcher iconSize={24} />
      </Stack>
    </Stack>
  );
}
