'use client';

import { Locale, locales } from '@/i18n';
import { useRouter, usePathname } from '@/navigation';
import { IconButton, Menu, MenuItem, SvgIcon } from '@mui/material';
import { NO, GB } from 'country-flag-icons/react/1x1';
import { useState, MouseEvent, ComponentProps } from 'react';

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
  iconProps?: ComponentProps<typeof IconButton>;
  iconSize?: number;
};

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
  const { locale, iconProps, iconSize } = props;

  const router = useRouter();
  const pathname = usePathname();

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

    router.push(pathname, { locale: l });
  };

  const { sx: iconSx, ...restIconProps } = iconProps || {};

  const iconButtonSxWithSize = iconSize
    ? {
        ...iconSx,
        width: iconSize,
        height: iconSize,
      }
    : iconSx;

  const localeFlagReturn = LocaleFlag({
    locale: locale,
    flagProps: {
      style: {
        borderRadius: iconSize ? iconSize / 2 : 15,
      },
    },
  });

  const localeFlag = localeFlagReturn ? localeFlagReturn.flag : null;

  return (
    <>
      <IconButton onClick={handleClick} sx={iconButtonSxWithSize} {...restIconProps}>
        {localeFlag}
      </IconButton>
      <Menu
        // aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
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
              <IconButton sx={iconButtonSxWithSize} {...restIconProps}>
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
