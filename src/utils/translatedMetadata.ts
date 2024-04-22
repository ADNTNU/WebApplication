import { Locale, locales } from '@/internationalization/i18n';
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

  const pageNamespace = `page.${page}` as `page.${TranslatedPage}`;
  const t = await getTranslations({ locale, namespace: pageNamespace });
  const defaultTranslation = await getTranslations({ locale, namespace: 'page.Landing' });

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
