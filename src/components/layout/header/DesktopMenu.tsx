'use client';

import { Box, Stack } from '@mui/material';
import OptionalSearchField from '@components/search/searchField/OptionalSearchField';
import LanguageSwitcher from '../LanguageSwitcher';

// type DesktopMenuProps = {
//   // mainLinks: { href: MainLinkHref; label: string }[];
// };

export default function DesktopMenu(/* props: DesktopMenuProps */) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" flexGrow={1}>
      <Box>
        <OptionalSearchField variant="landing" />
      </Box>
      <LanguageSwitcher iconSize={24} />
    </Stack>
  );
}
