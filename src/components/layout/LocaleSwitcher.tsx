'use client';

import { Locale, locales } from '@/internationalization/i18n';
import { useRouter, usePathname } from '@/internationalization/navigation';
import { Box, Button, IconButton, Menu, MenuItem, PopoverOrigin } from '@mui/material';
import { useState, MouseEvent, useEffect, useTransition } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import LocaleFlag from './LocaleFlag';

type LocaleSwitcherProps = {
  iconSize?: number;
  menuIconSize?: number;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
};

export default function LocaleSwitcher(props: LocaleSwitcherProps) {
  const { iconSize, menuIconSize, anchorOrigin, transformOrigin } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const [mounted, setMounted] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleClick = (l: Locale) => () => {
    setAnchorEl(null);
    if (l === locale) {
      return;
    }
    startTransition(() => {
      // TODO: Discuss if we should use `router.push` or `router.replace`
      router.push(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params, query: Object.fromEntries(searchParams.entries()) },
        { locale: l },
      );
    });
  };

  const localeFlagReturn = LocaleFlag({
    locale: locale || 'en',
    flagProps: {
      style: {
        borderRadius: iconSize ? iconSize / 2 : 15,
      },
      width: iconSize,
      height: iconSize,
    },
  });

  const localeFlag = localeFlagReturn ? localeFlagReturn.flag : null;

  return (
    <>
      <Box>
        <Button
          onClick={handleClick}
          disabled={isPending && !mounted}
          id="locale-switcher-button"
          aria-label="Locale switcher"
          aria-controls="locale-menu"
          aria-haspopup="menu"
          aria-expanded={open ? 'true' : 'false'}
        >
          {localeFlag}
          <ExpandMoreIcon
            sx={{
              width: iconSize,
              height: iconSize,
            }}
          />
        </Button>
      </Box>
      <Menu
        id="locale-menu"
        aria-label="Locale switcher menu"
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
        {locales.map((l) => {
          const flag = LocaleFlag({
            locale: l,
            flagProps: {
              style: {
                borderRadius: iconSize ? iconSize / 2 : 15,
              },
            },
          });

          if (!flag) {
            return null;
          }

          return (
            <MenuItem
              onClick={handleLocaleClick(l)}
              aria-label={`Switch to ${l}`}
              disabled={isPending}
              key={l}
              sx={{ gap: 1 }}
              selected={l === locale}
            >
              <IconButton
                sx={{ width: menuIconSize || 24, height: menuIconSize || 24, padding: 0 }}
              >
                {flag.flag}
              </IconButton>
              {flag.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
