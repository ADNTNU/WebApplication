'use client';

import { Locale, locales } from '@/i18n';
import { useRouter, usePathname } from '@/navigation';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { NO, GB } from 'country-flag-icons/react/1x1';
import { useState, MouseEvent, ComponentProps } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'next/navigation';

type LocaleFlagProps = {
  locale?: Locale;
  flagProps?: ComponentProps<typeof GB>;
};

type LocaleFlagReturn =
  | {
      flag: JSX.Element;
      name: string;
    }
  | undefined;

function LocaleFlag(props: LocaleFlagProps): LocaleFlagReturn {
  const { locale, flagProps } = props;

  switch (locale) {
    case 'en':
      return { flag: <GB {...flagProps} />, name: 'English' };
    case 'nb':
      return { flag: <NO {...flagProps} />, name: 'Norsk bokmål' };
    default:
      console.warn(`Unsupported locale: ${locale}`);
      const compileTimeCheck: undefined = locale;
      return compileTimeCheck;
  }
}

type LanguageSwitcherProps = {
  locale?: Locale;
  iconSize?: number;
  menuIconSize?: number;
};

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
  const { locale, iconSize, menuIconSize } = props;

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocaleClick = (l: Locale) => () => {
    setAnchorEl(null);
    if (l === locale) {
      return;
    }
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: l },
    );
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
      <Button onClick={handleClick}>
        {localeFlag}
        <ExpandMoreIcon
          sx={{
            width: iconSize,
            height: iconSize,
          }}
        />
      </Button>
      <Menu
        // aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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
