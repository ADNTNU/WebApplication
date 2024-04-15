import { Locale } from '@internationalization/i18n';

export default function getDateTimeFromLocale(locale: Locale) {
  switch (locale) {
    case 'en':
      return 'en-US';
    case 'nb':
      return 'nb-NO';
    default:
      // eslint-disable-next-line no-case-declarations
      const compileTimeCheck: never = locale;
      throw new Error(`Unsupported locale: ${compileTimeCheck}`);
  }
}
