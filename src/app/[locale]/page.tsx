import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import generateTranslatedMetadata from '@/utils/translatedMetadata';
import PageWrapper from '@/components/layout/PageWrapper';
import PageSection from '@/components/layout/PageSection';
import SearchHero from '@/components/landing/SearchHero';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return await generateTranslatedMetadata({ locale, page: 'Landing' });
}

export default function Landing({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Landing');

  return (
    <PageWrapper>
      <PageSection>
        <SearchHero />
      </PageSection>
    </PageWrapper>
  );
}
