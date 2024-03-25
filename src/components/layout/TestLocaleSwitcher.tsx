import { I18nLink } from '@internationalization/navigation';
import { locales } from '@internationalization/i18n';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
  const locale = useLocale();
  return (
    <I18nLink href="/" locale={locales.find((l) => l !== locale)}>
      Toggle locale
    </I18nLink>
  );
}
