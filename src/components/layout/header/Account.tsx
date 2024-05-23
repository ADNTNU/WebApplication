'use client';

import Link from '@components/navigation/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem, PopoverOrigin } from '@mui/material';
import { Box } from '@mui/system';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState, MouseEvent } from 'react';

type AccountProps = {
  iconSize?: number;
  // menuIconSize?: number;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
};

export default function Account(props: AccountProps) {
  const { iconSize, anchorOrigin, transformOrigin } = props;
  const { data: session } = useSession();

  const [mounted, setMounted] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (!session) {
      signIn();
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Box>
        <IconButton
          onClick={handleClick}
          disabled={!mounted}
          id="account-button"
          aria-label="Account"
          aria-controls="account-menu"
          aria-haspopup="menu"
          aria-expanded={open ? 'true' : 'false'}
        >
          <AccountCircleIcon sx={{ fontSize: iconSize }} />
        </IconButton>
      </Box>
      <Menu
        id="account-menu"
        aria-label="Account menu"
        aria-labelledby="locale-switcher-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={
          anchorOrigin || {
            vertical: 'bottom',
            horizontal: 'right',
          }
        }
        transformOrigin={
          transformOrigin || {
            vertical: 'top',
            horizontal: 'right',
          }
        }
      >
        <MenuItem {...{ component: Link, href: '/controlpanel' }} aria-label="Controlpanel">
          Controlpanel
        </MenuItem>
        <MenuItem onClick={() => signOut()} aria-label="Sign out" sx={{ gap: 1 }}>
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
}
