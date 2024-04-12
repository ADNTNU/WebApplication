'use client';

import { Box, Stack } from '@mui/material';
import LanguageSwitcher from '../LanguageSwitcher';
import OptionalSearchField from '@components/search/searchField/OptionalSearchField';

type DesktopMenuProps = {
  // mainLinks: { href: MainLinkHref; label: string }[];
};

export default function DesktopMenu(props: DesktopMenuProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" flexGrow={1}>
      <Box>
        <OptionalSearchField variant="landing" />
      </Box>
      <LanguageSwitcher iconSize={24} />
    </Stack>
  );
}
