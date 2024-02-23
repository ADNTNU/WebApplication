import { Locale, locales } from '@/i18n';
import { TranslatedPage, TranslatedPageProp } from '@models/TranslationTypes';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type GenerateTranslatedMetadataProps = {
  locale: string;
  page: TranslatedPage;
  metadata?: Metadata;
};

export default async function generateTranslatedMetadata({
  locale,
  page,
  metadata,
}: GenerateTranslatedMetadataProps) {
  if (!locales.includes(locale as Locale)) {
    return;
  }

  const pageNamespace = `Page.${page}` as `Page.${TranslatedPage}`;
  const t = await getTranslations({ locale, namespace: pageNamespace });

  const titleKey: TranslatedPageProp = 'title';
  const descriptionKey: TranslatedPageProp = 'description';

  const title = t(titleKey);
  const description = t(descriptionKey);

  return {
    ...metadata,
    ...(title && { title }),
    ...(description && { description }),
  };
}
