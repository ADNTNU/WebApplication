import { Locale } from "@internationalization/i18n";
import { GB, NO } from "country-flag-icons/react/1x1";
import { ComponentProps } from "react";

type LocaleFlagProps = {
  locale: Locale;
  flagProps?: ComponentProps<typeof GB>;
};

type LocaleFlagReturn = {
      flag: JSX.Element;
      name: string;
    }| undefined;

export function LocaleFlag(props: LocaleFlagProps): LocaleFlagReturn {
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