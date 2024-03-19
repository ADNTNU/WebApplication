import { Locale, locales } from '@/i18n';
import { TranslatedPage, TranslatedPageProp } from '@models/TranslationTypes';
import { Metadata } from 'next';
import { TranslationValues } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type GenerateTranslatedMetadataProps = {
  locale: string;
  page: TranslatedPage;
  metadata?: Metadata;
  titleProps?: TranslationValues;
  descriptionProps?: TranslationValues;
};

export default async function generateTranslatedMetadata({
  locale,
  page,
  metadata,
  titleProps,
  descriptionProps,
}: GenerateTranslatedMetadataProps) {
  if (!locales.includes(locale as Locale)) {
    return;
  }

  const pageNamespace = `Page.${page}` as `Page.${TranslatedPage}`;
  const t = await getTranslations({ locale, namespace: pageNamespace });
  const defaultTranslation = await getTranslations({ locale, namespace: 'Page.Landing' });

  const titleKey: TranslatedPageProp = 'title';
  const descriptionKey: TranslatedPageProp = 'description';

  let title = t(titleKey, titleProps);
  let description = t(descriptionKey, descriptionProps);

  if (!title) {
    title = defaultTranslation(titleKey, titleProps);
  }
  if (!description) {
    description = defaultTranslation(descriptionKey, descriptionProps);
  }

  return {
    ...metadata,
    ...(title && { title }),
    ...(description && { description }),
  };
}
