import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import PageWrapper from '@/components/layout/PageWrapper';
import PageSection from '@/components/layout/PageSection';
import SearchHero from '@/components/landing/SearchHero';
import { Locale } from '@/i18n';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return await generateTranslatedMetadata({ locale, page: 'Landing' });
}

export default function Landing({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Landing');

  return (
    <PageWrapper locale={locale}>
      <PageSection>
        <SearchHero />
      </PageSection>
    </PageWrapper>
  );
}
