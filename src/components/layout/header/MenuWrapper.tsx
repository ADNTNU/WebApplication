'use client';

import { useMediaQuery } from '@mui/material';
import { Breakpoint, useTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import { MainLinkHref } from './links';

type MenuWrapperProps = {
  downBreakpoint?: Breakpoint;
  mainLinks: { href: MainLinkHref; label: string }[];
};

export default function MenuWrapper(props: MenuWrapperProps) {
  const { downBreakpoint, mainLinks } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(downBreakpoint || 'md'));

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return isMobile ? (
    <MobileMenu open={open} setOpen={setOpen} mainLinks={mainLinks} />
  ) : (
    <DesktopMenu />
  );
}
