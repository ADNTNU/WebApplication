'use client';

import { Locale, locales } from '@/internationalization/i18n';
import { useRouter, usePathname } from '@/internationalization/navigation';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { NO, GB } from 'country-flag-icons/react/1x1';
import { useState, MouseEvent, ComponentProps, useEffect, useTransition } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';

type LocaleFlagProps = {
  locale: Locale;
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
      // eslint-disable-next-line no-case-declarations
      const compileTimeCheck: never = locale;
      throw new Error(`Unknown locale: ${compileTimeCheck}`);
  }
}

type LanguageSwitcherProps = {
  iconSize?: number;
  menuIconSize?: number;
};

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
  const { iconSize, menuIconSize } = props;

  const router = useRouter();
  const pathname = usePathname();
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

  // if (!mounted) {
  //   // for server-side rendering
  //   // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  //   return null;
  // }

  const handleLocaleClick = (l: Locale) => () => {
    setAnchorEl(null);
    if (l === locale) {
      return;
    }
    startTransition(() => {
      // TODO: Discuss if we should use `router.push` or `router.replace`
      // @ts-expect-error -- Always valid params
      router.prefetch({ pathname, params }, { locale: l });
      router.push(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
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
      <Button onClick={handleClick} disabled={isPending && !mounted}>
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
