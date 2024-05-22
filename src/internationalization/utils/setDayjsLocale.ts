import { Locale } from '@internationalization/i18n';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/en';

export default function setDayjsLocale(locale: Locale) {
  switch (locale) {
    case 'en':
      dayjs.locale('en');
      break;
    case 'nb':
      dayjs.locale('nb');
      break;
    default:
      // eslint-disable-next-line no-case-declarations
      const compileTimeCheck: never = locale;
      console.error(`Unhandled locale: ${compileTimeCheck}`);
      break;
  }

  return dayjs;
}
